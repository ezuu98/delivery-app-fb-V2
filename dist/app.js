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
var Sx = { exports: {} }, zh = {}, Rx = { exports: {} }, xd = { exports: {} };
xd.exports;
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
    var m = "18.3.1", g = Symbol.for("react.element"), b = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), j = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), ee = Symbol.for("react.lazy"), me = Symbol.for("react.offscreen"), oe = Symbol.iterator, ue = "@@iterator";
    function G(p) {
      if (p === null || typeof p != "object")
        return null;
      var N = oe && p[oe] || p[ue];
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
    }, U = {}, ie = null;
    function J(p) {
      ie = p;
    }
    U.setExtraStackFrame = function(p) {
      ie = p;
    }, U.getCurrentStack = null, U.getStackAddendum = function() {
      var p = "";
      ie && (p += ie);
      var N = U.getCurrentStack;
      return N && (p += N() || ""), p;
    };
    var K = !1, le = !1, we = !1, q = !1, ye = !1, Ne = {
      ReactCurrentDispatcher: P,
      ReactCurrentBatchConfig: $,
      ReactCurrentOwner: F
    };
    Ne.ReactDebugCurrentFrame = U, Ne.ReactCurrentActQueue = te;
    function Y(p) {
      {
        for (var N = arguments.length, A = new Array(N > 1 ? N - 1 : 0), z = 1; z < N; z++)
          A[z - 1] = arguments[z];
        de("warn", p, A);
      }
    }
    function W(p) {
      {
        for (var N = arguments.length, A = new Array(N > 1 ? N - 1 : 0), z = 1; z < N; z++)
          A[z - 1] = arguments[z];
        de("error", p, A);
      }
    }
    function de(p, N, A) {
      {
        var z = Ne.ReactDebugCurrentFrame, re = z.getStackAddendum();
        re !== "" && (N += "%s", A = A.concat([re]));
        var _e = A.map(function(Se) {
          return String(Se);
        });
        _e.unshift("Warning: " + N), Function.prototype.apply.call(console[p], console, _e);
      }
    }
    var Ve = {};
    function He(p, N) {
      {
        var A = p.constructor, z = A && (A.displayName || A.name) || "ReactClass", re = z + "." + N;
        if (Ve[re])
          return;
        W("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", N, z), Ve[re] = !0;
      }
    }
    var ot = {
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
    }, Pe = Object.assign, et = {};
    Object.freeze(et);
    function ut(p, N, A) {
      this.props = p, this.context = N, this.refs = et, this.updater = A || ot;
    }
    ut.prototype.isReactComponent = {}, ut.prototype.setState = function(p, N) {
      if (typeof p != "object" && typeof p != "function" && p != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, p, N, "setState");
    }, ut.prototype.forceUpdate = function(p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    };
    {
      var bn = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Qt = function(p, N) {
        Object.defineProperty(ut.prototype, p, {
          get: function() {
            Y("%s(...) is deprecated in plain JavaScript React classes. %s", N[0], N[1]);
          }
        });
      };
      for (var Lt in bn)
        bn.hasOwnProperty(Lt) && Qt(Lt, bn[Lt]);
    }
    function kn() {
    }
    kn.prototype = ut.prototype;
    function Xt(p, N, A) {
      this.props = p, this.context = N, this.refs = et, this.updater = A || ot;
    }
    var Jt = Xt.prototype = new kn();
    Jt.constructor = Xt, Pe(Jt, ut.prototype), Jt.isPureReactComponent = !0;
    function Zt() {
      var p = {
        current: null
      };
      return Object.seal(p), p;
    }
    var Q = Array.isArray;
    function Be(p) {
      return Q(p);
    }
    function ct(p) {
      {
        var N = typeof Symbol == "function" && Symbol.toStringTag, A = N && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return A;
      }
    }
    function tt(p) {
      try {
        return yt(p), !1;
      } catch {
        return !0;
      }
    }
    function yt(p) {
      return "" + p;
    }
    function ft(p) {
      if (tt(p))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ct(p)), yt(p);
    }
    function kt(p, N, A) {
      var z = p.displayName;
      if (z)
        return z;
      var re = N.displayName || N.name || "";
      return re !== "" ? A + "(" + re + ")" : A;
    }
    function Et(p) {
      return p.displayName || "Context";
    }
    function wt(p) {
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
            return Et(N) + ".Consumer";
          case R:
            var A = p;
            return Et(A._context) + ".Provider";
          case M:
            return kt(p, p.render, "ForwardRef");
          case k:
            var z = p.displayName || null;
            return z !== null ? z : wt(p.type) || "Memo";
          case ee: {
            var re = p, _e = re._payload, Se = re._init;
            try {
              return wt(Se(_e));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Yt = Object.prototype.hasOwnProperty, Ut = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Bt, Tn, Ft;
    Ft = {};
    function $t(p) {
      if (Yt.call(p, "ref")) {
        var N = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function dn(p) {
      if (Yt.call(p, "key")) {
        var N = Object.getOwnPropertyDescriptor(p, "key").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function ea(p, N) {
      var A = function() {
        Bt || (Bt = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(p, "key", {
        get: A,
        configurable: !0
      });
    }
    function qn(p, N) {
      var A = function() {
        Tn || (Tn = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(p, "ref", {
        get: A,
        configurable: !0
      });
    }
    function se(p) {
      if (typeof p.ref == "string" && F.current && p.__self && F.current.stateNode !== p.__self) {
        var N = wt(F.current.type);
        Ft[N] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N, p.ref), Ft[N] = !0);
      }
    }
    var xe = function(p, N, A, z, re, _e, Se) {
      var Ue = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: p,
        key: N,
        ref: A,
        props: Se,
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
        value: re
      }), Object.freeze && (Object.freeze(Ue.props), Object.freeze(Ue)), Ue;
    };
    function ae(p, N, A) {
      var z, re = {}, _e = null, Se = null, Ue = null, Qe = null;
      if (N != null) {
        $t(N) && (Se = N.ref, se(N)), dn(N) && (ft(N.key), _e = "" + N.key), Ue = N.__self === void 0 ? null : N.__self, Qe = N.__source === void 0 ? null : N.__source;
        for (z in N)
          Yt.call(N, z) && !Ut.hasOwnProperty(z) && (re[z] = N[z]);
      }
      var pt = arguments.length - 2;
      if (pt === 1)
        re.children = A;
      else if (pt > 1) {
        for (var St = Array(pt), Rt = 0; Rt < pt; Rt++)
          St[Rt] = arguments[Rt + 2];
        Object.freeze && Object.freeze(St), re.children = St;
      }
      if (p && p.defaultProps) {
        var Ge = p.defaultProps;
        for (z in Ge)
          re[z] === void 0 && (re[z] = Ge[z]);
      }
      if (_e || Se) {
        var Vt = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
        _e && ea(re, Vt), Se && qn(re, Vt);
      }
      return xe(p, _e, Se, Ue, Qe, F.current, re);
    }
    function qe(p, N) {
      var A = xe(p.type, N, p.ref, p._self, p._source, p._owner, p.props);
      return A;
    }
    function dt(p, N, A) {
      if (p == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + p + ".");
      var z, re = Pe({}, p.props), _e = p.key, Se = p.ref, Ue = p._self, Qe = p._source, pt = p._owner;
      if (N != null) {
        $t(N) && (Se = N.ref, pt = F.current), dn(N) && (ft(N.key), _e = "" + N.key);
        var St;
        p.type && p.type.defaultProps && (St = p.type.defaultProps);
        for (z in N)
          Yt.call(N, z) && !Ut.hasOwnProperty(z) && (N[z] === void 0 && St !== void 0 ? re[z] = St[z] : re[z] = N[z]);
      }
      var Rt = arguments.length - 2;
      if (Rt === 1)
        re.children = A;
      else if (Rt > 1) {
        for (var Ge = Array(Rt), Vt = 0; Vt < Rt; Vt++)
          Ge[Vt] = arguments[Vt + 2];
        re.children = Ge;
      }
      return xe(p.type, _e, Se, Ue, Qe, pt, re);
    }
    function Nt(p) {
      return typeof p == "object" && p !== null && p.$$typeof === g;
    }
    var gt = ".", fn = ":";
    function _t(p) {
      var N = /[=:]/g, A = {
        "=": "=0",
        ":": "=2"
      }, z = p.replace(N, function(re) {
        return A[re];
      });
      return "$" + z;
    }
    var bt = !1, Ot = /\/+/g;
    function ta(p) {
      return p.replace(Ot, "$&/");
    }
    function na(p, N) {
      return typeof p == "object" && p !== null && p.key != null ? (ft(p.key), _t("" + p.key)) : N.toString(36);
    }
    function Gn(p, N, A, z, re) {
      var _e = typeof p;
      (_e === "undefined" || _e === "boolean") && (p = null);
      var Se = !1;
      if (p === null)
        Se = !0;
      else
        switch (_e) {
          case "string":
          case "number":
            Se = !0;
            break;
          case "object":
            switch (p.$$typeof) {
              case g:
              case b:
                Se = !0;
            }
        }
      if (Se) {
        var Ue = p, Qe = re(Ue), pt = z === "" ? gt + na(Ue, 0) : z;
        if (Be(Qe)) {
          var St = "";
          pt != null && (St = ta(pt) + "/"), Gn(Qe, N, St, "", function(Md) {
            return Md;
          });
        } else Qe != null && (Nt(Qe) && (Qe.key && (!Ue || Ue.key !== Qe.key) && ft(Qe.key), Qe = qe(
          Qe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          A + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Qe.key && (!Ue || Ue.key !== Qe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ta("" + Qe.key) + "/"
          ) : "") + pt
        )), N.push(Qe));
        return 1;
      }
      var Rt, Ge, Vt = 0, qt = z === "" ? gt : z + fn;
      if (Be(p))
        for (var Ei = 0; Ei < p.length; Ei++)
          Rt = p[Ei], Ge = qt + na(Rt, Ei), Vt += Gn(Rt, N, A, Ge, re);
      else {
        var xo = G(p);
        if (typeof xo == "function") {
          var fr = p;
          xo === fr.entries && (bt || Y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), bt = !0);
          for (var Eo = xo.call(fr), So, Od = 0; !(So = Eo.next()).done; )
            Rt = So.value, Ge = qt + na(Rt, Od++), Vt += Gn(Rt, N, A, Ge, re);
        } else if (_e === "object") {
          var vu = String(p);
          throw new Error("Objects are not valid as a React child (found: " + (vu === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : vu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return Vt;
    }
    function Da(p, N, A) {
      if (p == null)
        return p;
      var z = [], re = 0;
      return Gn(p, z, "", "", function(_e) {
        return N.call(A, _e, re++);
      }), z;
    }
    function Zi(p) {
      var N = 0;
      return Da(p, function() {
        N++;
      }), N;
    }
    function ur(p, N, A) {
      Da(p, function() {
        N.apply(this, arguments);
      }, A);
    }
    function pa(p) {
      return Da(p, function(N) {
        return N;
      }) || [];
    }
    function el(p) {
      if (!Nt(p))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return p;
    }
    function pi(p) {
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
      var A = !1, z = !1, re = !1;
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
            set: function(Se) {
              N.Provider = Se;
            }
          },
          _currentValue: {
            get: function() {
              return N._currentValue;
            },
            set: function(Se) {
              N._currentValue = Se;
            }
          },
          _currentValue2: {
            get: function() {
              return N._currentValue2;
            },
            set: function(Se) {
              N._currentValue2 = Se;
            }
          },
          _threadCount: {
            get: function() {
              return N._threadCount;
            },
            set: function(Se) {
              N._threadCount = Se;
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
            set: function(Se) {
              re || (Y("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Se), re = !0);
            }
          }
        }), N.Consumer = _e;
      }
      return N._currentRenderer = null, N._currentRenderer2 = null, N;
    }
    var Ca = -1, ma = 0, aa = 1, qa = 2;
    function mi(p) {
      if (p._status === Ca) {
        var N = p._result, A = N();
        if (A.then(function(_e) {
          if (p._status === ma || p._status === Ca) {
            var Se = p;
            Se._status = aa, Se._result = _e;
          }
        }, function(_e) {
          if (p._status === ma || p._status === Ca) {
            var Se = p;
            Se._status = qa, Se._result = _e;
          }
        }), p._status === Ca) {
          var z = p;
          z._status = ma, z._result = A;
        }
      }
      if (p._status === aa) {
        var re = p._result;
        return re === void 0 && W(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, re), "default" in re || W(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, re), re.default;
      } else
        throw p._result;
    }
    function E(p) {
      var N = {
        // We use these fields to store the result.
        _status: Ca,
        _result: p
      }, A = {
        $$typeof: ee,
        _payload: N,
        _init: mi
      };
      {
        var z, re;
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
              return re;
            },
            set: function(_e) {
              W("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), re = _e, Object.defineProperty(A, "propTypes", {
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
    var fe;
    fe = Symbol.for("react.module.reference");
    function De(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === S || p === w || ye || p === d || p === x || p === T || q || p === me || K || le || we || typeof p == "object" && p !== null && (p.$$typeof === ee || p.$$typeof === k || p.$$typeof === R || p.$$typeof === j || p.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === fe || p.getModuleId !== void 0));
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
          set: function(re) {
            z = re, !p.name && !p.displayName && (p.displayName = re);
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
    function $e(p) {
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
    function en(p, N, A) {
      var z = Ae();
      return z.useReducer(p, N, A);
    }
    function Ct(p) {
      var N = Ae();
      return N.useRef(p);
    }
    function jt(p, N) {
      var A = Ae();
      return A.useEffect(p, N);
    }
    function wn(p, N) {
      var A = Ae();
      return A.useInsertionEffect(p, N);
    }
    function Ga(p, N) {
      var A = Ae();
      return A.useLayoutEffect(p, N);
    }
    function ja(p, N) {
      var A = Ae();
      return A.useCallback(p, N);
    }
    function tn(p, N) {
      var A = Ae();
      return A.useMemo(p, N);
    }
    function hi(p, N, A) {
      var z = Ae();
      return z.useImperativeHandle(p, N, A);
    }
    function Ta(p, N) {
      {
        var A = Ae();
        return A.useDebugValue(p, N);
      }
    }
    function Ye() {
      var p = Ae();
      return p.useTransition();
    }
    function vi(p) {
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
    var kr = 0, lo, oo, so, uo, co, ou, su;
    function tl() {
    }
    tl.__reactDisabledLog = !0;
    function fo() {
      {
        if (kr === 0) {
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
        kr++;
      }
    }
    function Wa() {
      {
        if (kr--, kr === 0) {
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
        kr < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var gi = Ne.ReactCurrentDispatcher, Ur;
    function nl(p, N, A) {
      {
        if (Ur === void 0)
          try {
            throw Error();
          } catch (re) {
            var z = re.stack.trim().match(/\n( *(at )?)/);
            Ur = z && z[1] || "";
          }
        return `
` + Ur + p;
      }
    }
    var bi = !1, al;
    {
      var po = typeof WeakMap == "function" ? WeakMap : Map;
      al = new po();
    }
    function uu(p, N) {
      if (!p || bi)
        return "";
      {
        var A = al.get(p);
        if (A !== void 0)
          return A;
      }
      var z;
      bi = !0;
      var re = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _e;
      _e = gi.current, gi.current = null, fo();
      try {
        if (N) {
          var Se = function() {
            throw Error();
          };
          if (Object.defineProperty(Se.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Se, []);
            } catch (qt) {
              z = qt;
            }
            Reflect.construct(p, [], Se);
          } else {
            try {
              Se.call();
            } catch (qt) {
              z = qt;
            }
            p.call(Se.prototype);
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
`), pt = Ue.length - 1, St = Qe.length - 1; pt >= 1 && St >= 0 && Ue[pt] !== Qe[St]; )
            St--;
          for (; pt >= 1 && St >= 0; pt--, St--)
            if (Ue[pt] !== Qe[St]) {
              if (pt !== 1 || St !== 1)
                do
                  if (pt--, St--, St < 0 || Ue[pt] !== Qe[St]) {
                    var Rt = `
` + Ue[pt].replace(" at new ", " at ");
                    return p.displayName && Rt.includes("<anonymous>") && (Rt = Rt.replace("<anonymous>", p.displayName)), typeof p == "function" && al.set(p, Rt), Rt;
                  }
                while (pt >= 1 && St >= 0);
              break;
            }
        }
      } finally {
        bi = !1, gi.current = _e, Wa(), Error.prepareStackTrace = re;
      }
      var Ge = p ? p.displayName || p.name : "", Vt = Ge ? nl(Ge) : "";
      return typeof p == "function" && al.set(p, Vt), Vt;
    }
    function mo(p, N, A) {
      return uu(p, !1);
    }
    function Cd(p) {
      var N = p.prototype;
      return !!(N && N.isReactComponent);
    }
    function yi(p, N, A) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return uu(p, Cd(p));
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
            return yi(p.type, N, A);
          case ee: {
            var z = p, re = z._payload, _e = z._init;
            try {
              return yi(_e(re), N, A);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, ho = Ne.ReactDebugCurrentFrame;
    function rt(p) {
      if (p) {
        var N = p._owner, A = yi(p.type, p._source, N ? N.type : null);
        ho.setExtraStackFrame(A);
      } else
        ho.setExtraStackFrame(null);
    }
    function jd(p, N, A, z, re) {
      {
        var _e = Function.call.bind(Yt);
        for (var Se in p)
          if (_e(p, Se)) {
            var Ue = void 0;
            try {
              if (typeof p[Se] != "function") {
                var Qe = Error((z || "React class") + ": " + A + " type `" + Se + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[Se] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qe.name = "Invariant Violation", Qe;
              }
              Ue = p[Se](N, Se, z, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (pt) {
              Ue = pt;
            }
            Ue && !(Ue instanceof Error) && (rt(re), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", A, Se, typeof Ue), rt(null)), Ue instanceof Error && !(Ue.message in cu) && (cu[Ue.message] = !0, rt(re), W("Failed %s type: %s", A, Ue.message), rt(null));
          }
      }
    }
    function cr(p) {
      if (p) {
        var N = p._owner, A = yi(p.type, p._source, N ? N.type : null);
        J(A);
      } else
        J(null);
    }
    var ze;
    ze = !1;
    function vo() {
      if (F.current) {
        var p = wt(F.current.type);
        if (p)
          return `

Check the render method of \`` + p + "`.";
      }
      return "";
    }
    function Un(p) {
      if (p !== void 0) {
        var N = p.fileName.replace(/^.*[\\\/]/, ""), A = p.lineNumber;
        return `

Check your code at ` + N + ":" + A + ".";
      }
      return "";
    }
    function Ni(p) {
      return p != null ? Un(p.__source) : "";
    }
    var Fr = {};
    function Td(p) {
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
        var A = Td(N);
        if (!Fr[A]) {
          Fr[A] = !0;
          var z = "";
          p && p._owner && p._owner !== F.current && (z = " It was passed a child from " + wt(p._owner.type) + "."), cr(p), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, z), cr(null);
        }
      }
    }
    function Mt(p, N) {
      if (typeof p == "object") {
        if (Be(p))
          for (var A = 0; A < p.length; A++) {
            var z = p[A];
            Nt(z) && pn(z, N);
          }
        else if (Nt(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var re = G(p);
          if (typeof re == "function" && re !== p.entries)
            for (var _e = re.call(p), Se; !(Se = _e.next()).done; )
              Nt(Se.value) && pn(Se.value, N);
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
          var z = wt(N);
          jd(A, p.props, "prop", z, p);
        } else if (N.PropTypes !== void 0 && !ze) {
          ze = !0;
          var re = wt(N);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", re || "Unknown");
        }
        typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ha(p) {
      {
        for (var N = Object.keys(p.props), A = 0; A < N.length; A++) {
          var z = N[A];
          if (z !== "children" && z !== "key") {
            cr(p), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), cr(null);
            break;
          }
        }
        p.ref !== null && (cr(p), W("Invalid attribute `ref` supplied to `React.Fragment`."), cr(null));
      }
    }
    function Fn(p, N, A) {
      var z = De(p);
      if (!z) {
        var re = "";
        (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (re += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _e = Ni(N);
        _e ? re += _e : re += vo();
        var Se;
        p === null ? Se = "null" : Be(p) ? Se = "array" : p !== void 0 && p.$$typeof === g ? (Se = "<" + (wt(p.type) || "Unknown") + " />", re = " Did you accidentally export a JSX literal instead of a component?") : Se = typeof p, W("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Se, re);
      }
      var Ue = ae.apply(this, arguments);
      if (Ue == null)
        return Ue;
      if (z)
        for (var Qe = 2; Qe < arguments.length; Qe++)
          Mt(arguments[Qe], p);
      return p === S ? ha(Ue) : du(Ue), Ue;
    }
    var wa = !1;
    function wd(p) {
      var N = Fn.bind(null, p);
      return N.type = p, wa || (wa = !0, Y("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(N, "type", {
        enumerable: !1,
        get: function() {
          return Y("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: p
          }), p;
        }
      }), N;
    }
    function go(p, N, A) {
      for (var z = dt.apply(this, arguments), re = 2; re < arguments.length; re++)
        Mt(arguments[re], z.type);
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
          var re = z._updatedFibers.size;
          re > 10 && Y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), z._updatedFibers.clear();
        }
      }
    }
    var bo = !1, rl = null;
    function _d(p) {
      if (rl === null)
        try {
          var N = ("require" + Math.random()).slice(0, 7), A = o && o[N];
          rl = A.call(o, "timers").setImmediate;
        } catch {
          rl = function(re) {
            bo === !1 && (bo = !0, typeof MessageChannel > "u" && W("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var _e = new MessageChannel();
            _e.port1.onmessage = re, _e.port2.postMessage(void 0);
          };
        }
      return rl(p);
    }
    var zr = 0, xi = !1;
    function yo(p) {
      {
        var N = zr;
        zr++, te.current === null && (te.current = []);
        var A = te.isBatchingLegacy, z;
        try {
          if (te.isBatchingLegacy = !0, z = p(), !A && te.didScheduleLegacyUpdate) {
            var re = te.current;
            re !== null && (te.didScheduleLegacyUpdate = !1, ol(re));
          }
        } catch (Ge) {
          throw dr(N), Ge;
        } finally {
          te.isBatchingLegacy = A;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var _e = z, Se = !1, Ue = {
            then: function(Ge, Vt) {
              Se = !0, _e.then(function(qt) {
                dr(N), zr === 0 ? il(qt, Ge, Vt) : Ge(qt);
              }, function(qt) {
                dr(N), Vt(qt);
              });
            }
          };
          return !xi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            Se || (xi = !0, W("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ue;
        } else {
          var Qe = z;
          if (dr(N), zr === 0) {
            var pt = te.current;
            pt !== null && (ol(pt), te.current = null);
            var St = {
              then: function(Ge, Vt) {
                te.current === null ? (te.current = [], il(Qe, Ge, Vt)) : Ge(Qe);
              }
            };
            return St;
          } else {
            var Rt = {
              then: function(Ge, Vt) {
                Ge(Qe);
              }
            };
            return Rt;
          }
        }
      }
    }
    function dr(p) {
      p !== zr - 1 && W("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), zr = p;
    }
    function il(p, N, A) {
      {
        var z = te.current;
        if (z !== null)
          try {
            ol(z), _d(function() {
              z.length === 0 ? (te.current = null, N(p)) : il(p, N, A);
            });
          } catch (re) {
            A(re);
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
    var pu = Fn, mu = go, No = wd, hu = {
      map: Da,
      forEach: ur,
      count: Zi,
      toArray: pa,
      only: el
    };
    f.Children = hu, f.Component = ut, f.Fragment = S, f.Profiler = w, f.PureComponent = Xt, f.StrictMode = d, f.Suspense = x, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ne, f.act = yo, f.cloneElement = mu, f.createContext = pi, f.createElement = pu, f.createFactory = No, f.createRef = Zt, f.forwardRef = Z, f.isValidElement = Nt, f.lazy = E, f.memo = Ke, f.startTransition = fu, f.unstable_act = yo, f.useCallback = ja, f.useContext = $e, f.useDebugValue = Ta, f.useDeferredValue = vi, f.useEffect = jt, f.useId = iu, f.useImperativeHandle = hi, f.useInsertionEffect = wn, f.useLayoutEffect = Ga, f.useMemo = tn, f.useReducer = en, f.useRef = Ct, f.useState = je, f.useSyncExternalStore = lu, f.useTransition = Ye, f.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(xd, xd.exports);
var lw = xd.exports;
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
  var o = y, f = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), w = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), ee = Symbol.iterator, me = "@@iterator";
  function oe(E) {
    if (E === null || typeof E != "object")
      return null;
    var Z = ee && E[ee] || E[me];
    return typeof Z == "function" ? Z : null;
  }
  var ue = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function G(E) {
    {
      for (var Z = arguments.length, fe = new Array(Z > 1 ? Z - 1 : 0), De = 1; De < Z; De++)
        fe[De - 1] = arguments[De];
      P("error", E, fe);
    }
  }
  function P(E, Z, fe) {
    {
      var De = ue.ReactDebugCurrentFrame, Ke = De.getStackAddendum();
      Ke !== "" && (Z += "%s", fe = fe.concat([Ke]));
      var Ae = fe.map(function($e) {
        return String($e);
      });
      Ae.unshift("Warning: " + Z), Function.prototype.apply.call(console[E], console, Ae);
    }
  }
  var $ = !1, te = !1, F = !1, U = !1, ie = !1, J;
  J = Symbol.for("react.module.reference");
  function K(E) {
    return !!(typeof E == "string" || typeof E == "function" || E === g || E === S || ie || E === b || E === j || E === M || U || E === k || $ || te || F || typeof E == "object" && E !== null && (E.$$typeof === T || E.$$typeof === x || E.$$typeof === d || E.$$typeof === w || E.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    E.$$typeof === J || E.getModuleId !== void 0));
  }
  function le(E, Z, fe) {
    var De = E.displayName;
    if (De)
      return De;
    var Ke = Z.displayName || Z.name || "";
    return Ke !== "" ? fe + "(" + Ke + ")" : fe;
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
          var fe = E;
          return we(fe._context) + ".Provider";
        case R:
          return le(E, E.render, "ForwardRef");
        case x:
          var De = E.displayName || null;
          return De !== null ? De : q(E.type) || "Memo";
        case T: {
          var Ke = E, Ae = Ke._payload, $e = Ke._init;
          try {
            return q($e(Ae));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var ye = Object.assign, Ne = 0, Y, W, de, Ve, He, ot, Pe;
  function et() {
  }
  et.__reactDisabledLog = !0;
  function ut() {
    {
      if (Ne === 0) {
        Y = console.log, W = console.info, de = console.warn, Ve = console.error, He = console.group, ot = console.groupCollapsed, Pe = console.groupEnd;
        var E = {
          configurable: !0,
          enumerable: !0,
          value: et,
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
      Ne++;
    }
  }
  function bn() {
    {
      if (Ne--, Ne === 0) {
        var E = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ye({}, E, {
            value: Y
          }),
          info: ye({}, E, {
            value: W
          }),
          warn: ye({}, E, {
            value: de
          }),
          error: ye({}, E, {
            value: Ve
          }),
          group: ye({}, E, {
            value: He
          }),
          groupCollapsed: ye({}, E, {
            value: ot
          }),
          groupEnd: ye({}, E, {
            value: Pe
          })
        });
      }
      Ne < 0 && G("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Qt = ue.ReactCurrentDispatcher, Lt;
  function kn(E, Z, fe) {
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
      var fe = Jt.get(E);
      if (fe !== void 0)
        return fe;
    }
    var De;
    Xt = !0;
    var Ke = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ae;
    Ae = Qt.current, Qt.current = null, ut();
    try {
      if (Z) {
        var $e = function() {
          throw Error();
        };
        if (Object.defineProperty($e.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct($e, []);
          } catch (tn) {
            De = tn;
          }
          Reflect.construct(E, [], $e);
        } else {
          try {
            $e.call();
          } catch (tn) {
            De = tn;
          }
          E.call($e.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (tn) {
          De = tn;
        }
        E();
      }
    } catch (tn) {
      if (tn && De && typeof tn.stack == "string") {
        for (var je = tn.stack.split(`
`), en = De.stack.split(`
`), Ct = je.length - 1, jt = en.length - 1; Ct >= 1 && jt >= 0 && je[Ct] !== en[jt]; )
          jt--;
        for (; Ct >= 1 && jt >= 0; Ct--, jt--)
          if (je[Ct] !== en[jt]) {
            if (Ct !== 1 || jt !== 1)
              do
                if (Ct--, jt--, jt < 0 || je[Ct] !== en[jt]) {
                  var wn = `
` + je[Ct].replace(" at new ", " at ");
                  return E.displayName && wn.includes("<anonymous>") && (wn = wn.replace("<anonymous>", E.displayName)), typeof E == "function" && Jt.set(E, wn), wn;
                }
              while (Ct >= 1 && jt >= 0);
            break;
          }
      }
    } finally {
      Xt = !1, Qt.current = Ae, bn(), Error.prepareStackTrace = Ke;
    }
    var Ga = E ? E.displayName || E.name : "", ja = Ga ? kn(Ga) : "";
    return typeof E == "function" && Jt.set(E, ja), ja;
  }
  function Be(E, Z, fe) {
    return Q(E, !1);
  }
  function ct(E) {
    var Z = E.prototype;
    return !!(Z && Z.isReactComponent);
  }
  function tt(E, Z, fe) {
    if (E == null)
      return "";
    if (typeof E == "function")
      return Q(E, ct(E));
    if (typeof E == "string")
      return kn(E);
    switch (E) {
      case j:
        return kn("Suspense");
      case M:
        return kn("SuspenseList");
    }
    if (typeof E == "object")
      switch (E.$$typeof) {
        case R:
          return Be(E.render);
        case x:
          return tt(E.type, Z, fe);
        case T: {
          var De = E, Ke = De._payload, Ae = De._init;
          try {
            return tt(Ae(Ke), Z, fe);
          } catch {
          }
        }
      }
    return "";
  }
  var yt = Object.prototype.hasOwnProperty, ft = {}, kt = ue.ReactDebugCurrentFrame;
  function Et(E) {
    if (E) {
      var Z = E._owner, fe = tt(E.type, E._source, Z ? Z.type : null);
      kt.setExtraStackFrame(fe);
    } else
      kt.setExtraStackFrame(null);
  }
  function wt(E, Z, fe, De, Ke) {
    {
      var Ae = Function.call.bind(yt);
      for (var $e in E)
        if (Ae(E, $e)) {
          var je = void 0;
          try {
            if (typeof E[$e] != "function") {
              var en = Error((De || "React class") + ": " + fe + " type `" + $e + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[$e] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw en.name = "Invariant Violation", en;
            }
            je = E[$e](Z, $e, De, fe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (Ct) {
            je = Ct;
          }
          je && !(je instanceof Error) && (Et(Ke), G("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", De || "React class", fe, $e, typeof je), Et(null)), je instanceof Error && !(je.message in ft) && (ft[je.message] = !0, Et(Ke), G("Failed %s type: %s", fe, je.message), Et(null));
        }
    }
  }
  var Yt = Array.isArray;
  function Ut(E) {
    return Yt(E);
  }
  function Bt(E) {
    {
      var Z = typeof Symbol == "function" && Symbol.toStringTag, fe = Z && E[Symbol.toStringTag] || E.constructor.name || "Object";
      return fe;
    }
  }
  function Tn(E) {
    try {
      return Ft(E), !1;
    } catch {
      return !0;
    }
  }
  function Ft(E) {
    return "" + E;
  }
  function $t(E) {
    if (Tn(E))
      return G("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Bt(E)), Ft(E);
  }
  var dn = ue.ReactCurrentOwner, ea = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, qn, se, xe;
  xe = {};
  function ae(E) {
    if (yt.call(E, "ref")) {
      var Z = Object.getOwnPropertyDescriptor(E, "ref").get;
      if (Z && Z.isReactWarning)
        return !1;
    }
    return E.ref !== void 0;
  }
  function qe(E) {
    if (yt.call(E, "key")) {
      var Z = Object.getOwnPropertyDescriptor(E, "key").get;
      if (Z && Z.isReactWarning)
        return !1;
    }
    return E.key !== void 0;
  }
  function dt(E, Z) {
    if (typeof E.ref == "string" && dn.current && Z && dn.current.stateNode !== Z) {
      var fe = q(dn.current.type);
      xe[fe] || (G('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(dn.current.type), E.ref), xe[fe] = !0);
    }
  }
  function Nt(E, Z) {
    {
      var fe = function() {
        qn || (qn = !0, G("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Z));
      };
      fe.isReactWarning = !0, Object.defineProperty(E, "key", {
        get: fe,
        configurable: !0
      });
    }
  }
  function gt(E, Z) {
    {
      var fe = function() {
        se || (se = !0, G("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Z));
      };
      fe.isReactWarning = !0, Object.defineProperty(E, "ref", {
        get: fe,
        configurable: !0
      });
    }
  }
  var fn = function(E, Z, fe, De, Ke, Ae, $e) {
    var je = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: f,
      // Built-in properties that belong on the element
      type: E,
      key: Z,
      ref: fe,
      props: $e,
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
  function _t(E, Z, fe, De, Ke) {
    {
      var Ae, $e = {}, je = null, en = null;
      fe !== void 0 && ($t(fe), je = "" + fe), qe(Z) && ($t(Z.key), je = "" + Z.key), ae(Z) && (en = Z.ref, dt(Z, Ke));
      for (Ae in Z)
        yt.call(Z, Ae) && !ea.hasOwnProperty(Ae) && ($e[Ae] = Z[Ae]);
      if (E && E.defaultProps) {
        var Ct = E.defaultProps;
        for (Ae in Ct)
          $e[Ae] === void 0 && ($e[Ae] = Ct[Ae]);
      }
      if (je || en) {
        var jt = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
        je && Nt($e, jt), en && gt($e, jt);
      }
      return fn(E, je, en, Ke, De, dn.current, $e);
    }
  }
  var bt = ue.ReactCurrentOwner, Ot = ue.ReactDebugCurrentFrame;
  function ta(E) {
    if (E) {
      var Z = E._owner, fe = tt(E.type, E._source, Z ? Z.type : null);
      Ot.setExtraStackFrame(fe);
    } else
      Ot.setExtraStackFrame(null);
  }
  var na;
  na = !1;
  function Gn(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function Da() {
    {
      if (bt.current) {
        var E = q(bt.current.type);
        if (E)
          return `

Check the render method of \`` + E + "`.";
      }
      return "";
    }
  }
  function Zi(E) {
    {
      if (E !== void 0) {
        var Z = E.fileName.replace(/^.*[\\\/]/, ""), fe = E.lineNumber;
        return `

Check your code at ` + Z + ":" + fe + ".";
      }
      return "";
    }
  }
  var ur = {};
  function pa(E) {
    {
      var Z = Da();
      if (!Z) {
        var fe = typeof E == "string" ? E : E.displayName || E.name;
        fe && (Z = `

Check the top-level render call using <` + fe + ">.");
      }
      return Z;
    }
  }
  function el(E, Z) {
    {
      if (!E._store || E._store.validated || E.key != null)
        return;
      E._store.validated = !0;
      var fe = pa(Z);
      if (ur[fe])
        return;
      ur[fe] = !0;
      var De = "";
      E && E._owner && E._owner !== bt.current && (De = " It was passed a child from " + q(E._owner.type) + "."), ta(E), G('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', fe, De), ta(null);
    }
  }
  function pi(E, Z) {
    {
      if (typeof E != "object")
        return;
      if (Ut(E))
        for (var fe = 0; fe < E.length; fe++) {
          var De = E[fe];
          Gn(De) && el(De, Z);
        }
      else if (Gn(E))
        E._store && (E._store.validated = !0);
      else if (E) {
        var Ke = oe(E);
        if (typeof Ke == "function" && Ke !== E.entries)
          for (var Ae = Ke.call(E), $e; !($e = Ae.next()).done; )
            Gn($e.value) && el($e.value, Z);
      }
    }
  }
  function Ca(E) {
    {
      var Z = E.type;
      if (Z == null || typeof Z == "string")
        return;
      var fe;
      if (typeof Z == "function")
        fe = Z.propTypes;
      else if (typeof Z == "object" && (Z.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      Z.$$typeof === x))
        fe = Z.propTypes;
      else
        return;
      if (fe) {
        var De = q(Z);
        wt(fe, E.props, "prop", De, E);
      } else if (Z.PropTypes !== void 0 && !na) {
        na = !0;
        var Ke = q(Z);
        G("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ke || "Unknown");
      }
      typeof Z.getDefaultProps == "function" && !Z.getDefaultProps.isReactClassApproved && G("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ma(E) {
    {
      for (var Z = Object.keys(E.props), fe = 0; fe < Z.length; fe++) {
        var De = Z[fe];
        if (De !== "children" && De !== "key") {
          ta(E), G("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", De), ta(null);
          break;
        }
      }
      E.ref !== null && (ta(E), G("Invalid attribute `ref` supplied to `React.Fragment`."), ta(null));
    }
  }
  var aa = {};
  function qa(E, Z, fe, De, Ke, Ae) {
    {
      var $e = K(E);
      if (!$e) {
        var je = "";
        (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (je += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var en = Zi(Ke);
        en ? je += en : je += Da();
        var Ct;
        E === null ? Ct = "null" : Ut(E) ? Ct = "array" : E !== void 0 && E.$$typeof === f ? (Ct = "<" + (q(E.type) || "Unknown") + " />", je = " Did you accidentally export a JSX literal instead of a component?") : Ct = typeof E, G("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ct, je);
      }
      var jt = _t(E, Z, fe, Ke, Ae);
      if (jt == null)
        return jt;
      if ($e) {
        var wn = Z.children;
        if (wn !== void 0)
          if (De)
            if (Ut(wn)) {
              for (var Ga = 0; Ga < wn.length; Ga++)
                pi(wn[Ga], E);
              Object.freeze && Object.freeze(wn);
            } else
              G("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            pi(wn, E);
      }
      if (yt.call(Z, "key")) {
        var ja = q(E), tn = Object.keys(Z).filter(function(Ye) {
          return Ye !== "key";
        }), hi = tn.length > 0 ? "{key: someKey, " + tn.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!aa[ja + hi]) {
          var Ta = tn.length > 0 ? "{" + tn.join(": ..., ") + ": ...}" : "{}";
          G(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, hi, ja, Ta, ja), aa[ja + hi] = !0;
        }
      }
      return E === g ? ma(jt) : Ca(jt), jt;
    }
  }
  var mi = qa;
  zh.Fragment = g, zh.jsxDEV = mi;
})();
Sx.exports = zh;
var s = Sx.exports, Cx = { exports: {} }, fa = {}, jx = { exports: {} }, Tx = {};
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
    function g(se, xe) {
      var ae = se.length;
      se.push(xe), d(se, xe, ae);
    }
    function b(se) {
      return se.length === 0 ? null : se[0];
    }
    function S(se) {
      if (se.length === 0)
        return null;
      var xe = se[0], ae = se.pop();
      return ae !== xe && (se[0] = ae, w(se, ae, 0)), xe;
    }
    function d(se, xe, ae) {
      for (var qe = ae; qe > 0; ) {
        var dt = qe - 1 >>> 1, Nt = se[dt];
        if (R(Nt, xe) > 0)
          se[dt] = xe, se[qe] = Nt, qe = dt;
        else
          return;
      }
    }
    function w(se, xe, ae) {
      for (var qe = ae, dt = se.length, Nt = dt >>> 1; qe < Nt; ) {
        var gt = (qe + 1) * 2 - 1, fn = se[gt], _t = gt + 1, bt = se[_t];
        if (R(fn, xe) < 0)
          _t < dt && R(bt, fn) < 0 ? (se[qe] = bt, se[_t] = xe, qe = _t) : (se[qe] = fn, se[gt] = xe, qe = gt);
        else if (_t < dt && R(bt, xe) < 0)
          se[qe] = bt, se[_t] = xe, qe = _t;
        else
          return;
      }
    }
    function R(se, xe) {
      var ae = se.sortIndex - xe.sortIndex;
      return ae !== 0 ? ae : se.id - xe.id;
    }
    var j = 1, M = 2, x = 3, T = 4, k = 5;
    function ee(se, xe) {
    }
    var me = typeof performance == "object" && typeof performance.now == "function";
    if (me) {
      var oe = performance;
      o.unstable_now = function() {
        return oe.now();
      };
    } else {
      var ue = Date, G = ue.now();
      o.unstable_now = function() {
        return ue.now() - G;
      };
    }
    var P = 1073741823, $ = -1, te = 250, F = 5e3, U = 1e4, ie = P, J = [], K = [], le = 1, we = null, q = x, ye = !1, Ne = !1, Y = !1, W = typeof setTimeout == "function" ? setTimeout : null, de = typeof clearTimeout == "function" ? clearTimeout : null, Ve = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function He(se) {
      for (var xe = b(K); xe !== null; ) {
        if (xe.callback === null)
          S(K);
        else if (xe.startTime <= se)
          S(K), xe.sortIndex = xe.expirationTime, g(J, xe);
        else
          return;
        xe = b(K);
      }
    }
    function ot(se) {
      if (Y = !1, He(se), !Ne)
        if (b(J) !== null)
          Ne = !0, Ft(Pe);
        else {
          var xe = b(K);
          xe !== null && $t(ot, xe.startTime - se);
        }
    }
    function Pe(se, xe) {
      Ne = !1, Y && (Y = !1, dn()), ye = !0;
      var ae = q;
      try {
        var qe;
        if (!f) return et(se, xe);
      } finally {
        we = null, q = ae, ye = !1;
      }
    }
    function et(se, xe) {
      var ae = xe;
      for (He(ae), we = b(J); we !== null && !(we.expirationTime > ae && (!se || kt())); ) {
        var qe = we.callback;
        if (typeof qe == "function") {
          we.callback = null, q = we.priorityLevel;
          var dt = we.expirationTime <= ae, Nt = qe(dt);
          ae = o.unstable_now(), typeof Nt == "function" ? we.callback = Nt : we === b(J) && S(J), He(ae);
        } else
          S(J);
        we = b(J);
      }
      if (we !== null)
        return !0;
      var gt = b(K);
      return gt !== null && $t(ot, gt.startTime - ae), !1;
    }
    function ut(se, xe) {
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
      var ae = q;
      q = se;
      try {
        return xe();
      } finally {
        q = ae;
      }
    }
    function bn(se) {
      var xe;
      switch (q) {
        case j:
        case M:
        case x:
          xe = x;
          break;
        default:
          xe = q;
          break;
      }
      var ae = q;
      q = xe;
      try {
        return se();
      } finally {
        q = ae;
      }
    }
    function Qt(se) {
      var xe = q;
      return function() {
        var ae = q;
        q = xe;
        try {
          return se.apply(this, arguments);
        } finally {
          q = ae;
        }
      };
    }
    function Lt(se, xe, ae) {
      var qe = o.unstable_now(), dt;
      if (typeof ae == "object" && ae !== null) {
        var Nt = ae.delay;
        typeof Nt == "number" && Nt > 0 ? dt = qe + Nt : dt = qe;
      } else
        dt = qe;
      var gt;
      switch (se) {
        case j:
          gt = $;
          break;
        case M:
          gt = te;
          break;
        case k:
          gt = ie;
          break;
        case T:
          gt = U;
          break;
        case x:
        default:
          gt = F;
          break;
      }
      var fn = dt + gt, _t = {
        id: le++,
        callback: xe,
        priorityLevel: se,
        startTime: dt,
        expirationTime: fn,
        sortIndex: -1
      };
      return dt > qe ? (_t.sortIndex = dt, g(K, _t), b(J) === null && _t === b(K) && (Y ? dn() : Y = !0, $t(ot, dt - qe))) : (_t.sortIndex = fn, g(J, _t), !Ne && !ye && (Ne = !0, Ft(Pe))), _t;
    }
    function kn() {
    }
    function Xt() {
      !Ne && !ye && (Ne = !0, Ft(Pe));
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
    var Be = !1, ct = null, tt = -1, yt = m, ft = -1;
    function kt() {
      var se = o.unstable_now() - ft;
      return !(se < yt);
    }
    function Et() {
    }
    function wt(se) {
      if (se < 0 || se > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      se > 0 ? yt = Math.floor(1e3 / se) : yt = m;
    }
    var Yt = function() {
      if (ct !== null) {
        var se = o.unstable_now();
        ft = se;
        var xe = !0, ae = !0;
        try {
          ae = ct(xe, se);
        } finally {
          ae ? Ut() : (Be = !1, ct = null);
        }
      } else
        Be = !1;
    }, Ut;
    if (typeof Ve == "function")
      Ut = function() {
        Ve(Yt);
      };
    else if (typeof MessageChannel < "u") {
      var Bt = new MessageChannel(), Tn = Bt.port2;
      Bt.port1.onmessage = Yt, Ut = function() {
        Tn.postMessage(null);
      };
    } else
      Ut = function() {
        W(Yt, 0);
      };
    function Ft(se) {
      ct = se, Be || (Be = !0, Ut());
    }
    function $t(se, xe) {
      tt = W(function() {
        se(o.unstable_now());
      }, xe);
    }
    function dn() {
      de(tt), tt = -1;
    }
    var ea = Et, qn = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = j, o.unstable_LowPriority = T, o.unstable_NormalPriority = x, o.unstable_Profiling = qn, o.unstable_UserBlockingPriority = M, o.unstable_cancelCallback = Zt, o.unstable_continueExecution = Xt, o.unstable_forceFrameRate = wt, o.unstable_getCurrentPriorityLevel = Q, o.unstable_getFirstCallbackNode = Jt, o.unstable_next = bn, o.unstable_pauseExecution = kn, o.unstable_requestPaint = ea, o.unstable_runWithPriority = ut, o.unstable_scheduleCallback = Lt, o.unstable_shouldYield = kt, o.unstable_wrapCallback = Qt, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var R = 0, j = 1, M = 2, x = 3, T = 4, k = 5, ee = 6, me = 7, oe = 8, ue = 9, G = 10, P = 11, $ = 12, te = 13, F = 14, U = 15, ie = 16, J = 17, K = 18, le = 19, we = 21, q = 22, ye = 23, Ne = 24, Y = 25, W = !0, de = !1, Ve = !1, He = !1, ot = !1, Pe = !0, et = !0, ut = !0, bn = !0, Qt = /* @__PURE__ */ new Set(), Lt = {}, kn = {};
  function Xt(e, t) {
    Jt(e, t), Jt(e + "Capture", t);
  }
  function Jt(e, t) {
    Lt[e] && d("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Lt[e] = t;
    {
      var n = e.toLowerCase();
      kn[n] = e, e === "onDoubleClick" && (kn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Qt.add(t[a]);
  }
  var Zt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Q = Object.prototype.hasOwnProperty;
  function Be(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function ct(e) {
    try {
      return tt(e), !1;
    } catch {
      return !0;
    }
  }
  function tt(e) {
    return "" + e;
  }
  function yt(e, t) {
    if (ct(e))
      return d("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Be(e)), tt(e);
  }
  function ft(e) {
    if (ct(e))
      return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), tt(e);
  }
  function kt(e, t) {
    if (ct(e))
      return d("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Be(e)), tt(e);
  }
  function Et(e, t) {
    if (ct(e))
      return d("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Be(e)), tt(e);
  }
  function wt(e) {
    if (ct(e))
      return d("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), tt(e);
  }
  function Yt(e) {
    if (ct(e))
      return d("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Be(e)), tt(e);
  }
  var Ut = 0, Bt = 1, Tn = 2, Ft = 3, $t = 4, dn = 5, ea = 6, qn = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", se = qn + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", xe = new RegExp("^[" + qn + "][" + se + "]*$"), ae = {}, qe = {};
  function dt(e) {
    return Q.call(qe, e) ? !0 : Q.call(ae, e) ? !1 : xe.test(e) ? (qe[e] = !0, !0) : (ae[e] = !0, d("Invalid attribute name: `%s`", e), !1);
  }
  function Nt(e, t, n) {
    return t !== null ? t.type === Ut : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function gt(e, t, n, a) {
    if (n !== null && n.type === Ut)
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
    if (t === null || typeof t > "u" || gt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Ft:
          return !t;
        case $t:
          return t === !1;
        case dn:
          return isNaN(t);
        case ea:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function _t(e) {
    return Ot.hasOwnProperty(e) ? Ot[e] : null;
  }
  function bt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Tn || t === Ft || t === $t, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Ot = {}, ta = [
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
  ta.forEach(function(e) {
    Ot[e] = new bt(
      e,
      Ut,
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
    Ot[t] = new bt(
      t,
      Bt,
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
    Ot[e] = new bt(
      e,
      Tn,
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
    Ot[e] = new bt(
      e,
      Tn,
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
    Ot[e] = new bt(
      e,
      Ft,
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
    Ot[e] = new bt(
      e,
      Ft,
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
    Ot[e] = new bt(
      e,
      $t,
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
    Ot[e] = new bt(
      e,
      ea,
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
    Ot[e] = new bt(
      e,
      dn,
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
  var na = /[\-\:]([a-z])/g, Gn = function(e) {
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
    var t = e.replace(na, Gn);
    Ot[t] = new bt(
      t,
      Bt,
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
    var t = e.replace(na, Gn);
    Ot[t] = new bt(
      t,
      Bt,
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
    var t = e.replace(na, Gn);
    Ot[t] = new bt(
      t,
      Bt,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Ot[e] = new bt(
      e,
      Bt,
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
  var Da = "xlinkHref";
  Ot[Da] = new bt(
    "xlinkHref",
    Bt,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Ot[e] = new bt(
      e,
      Bt,
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
  var Zi = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, ur = !1;
  function pa(e) {
    !ur && Zi.test(e) && (ur = !0, d("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function el(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      yt(n, t), a.sanitizeURL && pa("" + n);
      var i = a.attributeName, l = null;
      if (a.type === $t) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : fn(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (fn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Ft)
          return n;
        l = e.getAttribute(i);
      }
      return fn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function pi(e, t, n, a) {
    {
      if (!dt(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return yt(n, t), r === "" + n ? n : r;
    }
  }
  function Ca(e, t, n, a) {
    var r = _t(t);
    if (!Nt(t, r, a)) {
      if (fn(t, n, r, a) && (n = null), a || r === null) {
        if (dt(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (yt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var c = r.type;
          e[u] = c === Ft ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var h = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(h);
      else {
        var C = r.type, D;
        C === Ft || C === $t && n === !0 ? D = "" : (yt(n, h), D = "" + n, r.sanitizeURL && pa(D.toString())), v ? e.setAttributeNS(v, h, D) : e.setAttribute(h, D);
      }
    }
  }
  var ma = Symbol.for("react.element"), aa = Symbol.for("react.portal"), qa = Symbol.for("react.fragment"), mi = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), Z = Symbol.for("react.provider"), fe = Symbol.for("react.context"), De = Symbol.for("react.forward_ref"), Ke = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), $e = Symbol.for("react.memo"), je = Symbol.for("react.lazy"), en = Symbol.for("react.scope"), Ct = Symbol.for("react.debug_trace_mode"), jt = Symbol.for("react.offscreen"), wn = Symbol.for("react.legacy_hidden"), Ga = Symbol.for("react.cache"), ja = Symbol.for("react.tracing_marker"), tn = Symbol.iterator, hi = "@@iterator";
  function Ta(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = tn && e[tn] || e[hi];
    return typeof t == "function" ? t : null;
  }
  var Ye = Object.assign, vi = 0, iu, lu, kr, lo, oo, so, uo;
  function co() {
  }
  co.__reactDisabledLog = !0;
  function ou() {
    {
      if (vi === 0) {
        iu = console.log, lu = console.info, kr = console.warn, lo = console.error, oo = console.group, so = console.groupCollapsed, uo = console.groupEnd;
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
      vi++;
    }
  }
  function su() {
    {
      if (vi--, vi === 0) {
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
            value: kr
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
      vi < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var tl = m.ReactCurrentDispatcher, fo;
  function Wa(e, t, n) {
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
  var gi = !1, Ur;
  {
    var nl = typeof WeakMap == "function" ? WeakMap : Map;
    Ur = new nl();
  }
  function bi(e, t) {
    if (!e || gi)
      return "";
    {
      var n = Ur.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    gi = !0;
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
                  return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && Ur.set(e, C), C;
                }
              while (h >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      gi = !1, tl.current = i, su(), Error.prepareStackTrace = r;
    }
    var D = e ? e.displayName || e.name : "", V = D ? Wa(D) : "";
    return typeof e == "function" && Ur.set(e, V), V;
  }
  function al(e, t, n) {
    return bi(e, !0);
  }
  function po(e, t, n) {
    return bi(e, !1);
  }
  function uu(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function mo(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return bi(e, uu(e));
    if (typeof e == "string")
      return Wa(e);
    switch (e) {
      case Ke:
        return Wa("Suspense");
      case Ae:
        return Wa("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case De:
          return po(e.render);
        case $e:
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
  function Cd(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case k:
        return Wa(e.type);
      case ie:
        return Wa("Lazy");
      case te:
        return Wa("Suspense");
      case le:
        return Wa("SuspenseList");
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
  function yi(e) {
    try {
      var t = "", n = e;
      do
        t += Cd(n), n = n.return;
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
      case qa:
        return "Fragment";
      case aa:
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
        case fe:
          var t = e;
          return ho(t) + ".Consumer";
        case Z:
          var n = e;
          return ho(n._context) + ".Provider";
        case De:
          return cu(e, e.render, "ForwardRef");
        case $e:
          var a = e.displayName || null;
          return a !== null ? a : rt(e.type) || "Memo";
        case je: {
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
  function jd(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function cr(e) {
    return e.displayName || "Context";
  }
  function ze(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Ne:
        return "Cache";
      case ue:
        var a = n;
        return cr(a) + ".Consumer";
      case G:
        var r = n;
        return cr(r._context) + ".Provider";
      case K:
        return "DehydratedFragment";
      case P:
        return jd(n, n.render, "ForwardRef");
      case me:
        return "Fragment";
      case k:
        return n;
      case T:
        return "Portal";
      case x:
        return "Root";
      case ee:
        return "Text";
      case ie:
        return rt(n);
      case oe:
        return n === mi ? "StrictMode" : "Mode";
      case q:
        return "Offscreen";
      case $:
        return "Profiler";
      case we:
        return "Scope";
      case te:
        return "Suspense";
      case le:
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
  var vo = m.ReactDebugCurrentFrame, Un = null, Ni = !1;
  function Fr() {
    {
      if (Un === null)
        return null;
      var e = Un._debugOwner;
      if (e !== null && typeof e < "u")
        return ze(e);
    }
    return null;
  }
  function Td() {
    return Un === null ? "" : yi(Un);
  }
  function pn() {
    vo.getCurrentStack = null, Un = null, Ni = !1;
  }
  function Mt(e) {
    vo.getCurrentStack = e === null ? null : Td, Un = e, Ni = !1;
  }
  function du() {
    return Un;
  }
  function ha(e) {
    Ni = e;
  }
  function Fn(e) {
    return "" + e;
  }
  function wa(e) {
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
  var wd = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function go(e, t) {
    wd[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || d("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || d("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
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
  function _d(e) {
    var t = "";
    return e && (fu(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function zr(e) {
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
          rl(e), delete e[t];
        }
      };
      return l;
    }
  }
  function xi(e) {
    bo(e) || (e._valueTracker = zr(e));
  }
  function yo(e) {
    if (!e)
      return !1;
    var t = bo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = _d(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function dr(e) {
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
    var n = e, a = t.checked, r = Ye({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function hu(e, t) {
    go("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ll && (d("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Fr() || "A component", t.type), ll = !0), t.value !== void 0 && t.defaultValue !== void 0 && !il && (d("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Fr() || "A component", t.type), il = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: wa(t.value != null ? t.value : a),
      controlled: mu(t)
    };
  }
  function p(e, t) {
    var n = e, a = t.checked;
    a != null && Ca(n, "checked", a, !1);
  }
  function N(e, t) {
    var n = e;
    {
      var a = mu(t);
      !n._wrapperState.controlled && a && !pu && (d("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), pu = !0), n._wrapperState.controlled && !a && !ol && (d("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ol = !0);
    }
    p(e, t);
    var r = wa(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Fn(r)) : n.value !== Fn(r) && (n.value = Fn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? _e(n, t.type, r) : t.hasOwnProperty("defaultValue") && _e(n, t.type, wa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function A(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = Fn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var u = a.name;
    u !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, u !== "" && (a.name = u);
  }
  function z(e, t) {
    var n = e;
    N(n, t), re(n, t);
  }
  function re(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      yt(n, "name");
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
    (t !== "number" || dr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Fn(e._wrapperState.initialValue) : e.defaultValue !== Fn(n) && (e.defaultValue = Fn(n)));
  }
  var Se = !1, Ue = !1, Qe = !1;
  function pt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ue || (Ue = !0, d("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Qe || (Qe = !0, d("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Se && (d("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Se = !0);
  }
  function St(e, t) {
    t.value != null && e.setAttribute("value", Fn(wa(t.value)));
  }
  var Rt = Array.isArray;
  function Ge(e) {
    return Rt(e);
  }
  var Vt;
  Vt = !1;
  function qt() {
    var e = Fr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var Ei = ["value", "defaultValue"];
  function xo(e) {
    {
      go("select", e);
      for (var t = 0; t < Ei.length; t++) {
        var n = Ei[t];
        if (e[n] != null) {
          var a = Ge(e[n]);
          e.multiple && !a ? d("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, qt()) : !e.multiple && a && d("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, qt());
        }
      }
    }
  }
  function fr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var c = 0; c < r.length; c++) {
        var h = l.hasOwnProperty("$" + r[c].value);
        r[c].selected !== h && (r[c].selected = h), h && a && (r[c].defaultSelected = !0);
      }
    } else {
      for (var v = Fn(wa(n)), C = null, D = 0; D < r.length; D++) {
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
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Vt && (d("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Vt = !0);
  }
  function Od(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? fr(n, !!t.multiple, a, !1) : t.defaultValue != null && fr(n, !!t.multiple, t.defaultValue, !0);
  }
  function vu(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? fr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? fr(n, !!t.multiple, t.defaultValue, !0) : fr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function Md(e, t) {
    var n = e, a = t.value;
    a != null && fr(n, !!t.multiple, a, !1);
  }
  var tv = !1;
  function Vd(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Ye({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Fn(n._wrapperState.initialValue)
    });
    return a;
  }
  function nv(e, t) {
    var n = e;
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !tv && (d("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Fr() || "A component"), tv = !0);
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
      initialValue: wa(a)
    };
  }
  function av(e, t) {
    var n = e, a = wa(t.value), r = wa(t.defaultValue);
    if (a != null) {
      var i = Fn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Fn(r));
  }
  function rv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function Yx(e, t) {
    av(e, t);
  }
  var pr = "http://www.w3.org/1999/xhtml", qx = "http://www.w3.org/1998/Math/MathML", Ad = "http://www.w3.org/2000/svg";
  function Ld(e) {
    switch (e) {
      case "svg":
        return Ad;
      case "math":
        return qx;
      default:
        return pr;
    }
  }
  function kd(e, t) {
    return e == null || e === pr ? Ld(t) : e === Ad && t === "foreignObject" ? pr : e;
  }
  var Gx = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, iv = Gx(function(e, t) {
    if (e.namespaceURI === Ad && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Wn = 1, mr = 3, Gt = 8, hr = 9, Ud = 11, bu = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === mr) {
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
  function Fd(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ro.hasOwnProperty(e) && Ro[e]) ? t + "px" : (Et(t, e), ("" + t).trim());
  }
  var Xx = /([A-Z])/g, Jx = /^ms-/;
  function Zx(e) {
    return e.replace(Xx, "-$1").toLowerCase().replace(Jx, "-ms-");
  }
  var lv = function() {
  };
  {
    var eE = /^(?:webkit|moz|o)[A-Z]/, tE = /^-ms-/, nE = /-(.)/g, ov = /;\s*$/, sl = {}, zd = {}, sv = !1, uv = !1, aE = function(e) {
      return e.replace(nE, function(t, n) {
        return n.toUpperCase();
      });
    }, rE = function(e) {
      sl.hasOwnProperty(e) && sl[e] || (sl[e] = !0, d(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        aE(e.replace(tE, "ms-"))
      ));
    }, iE = function(e) {
      sl.hasOwnProperty(e) && sl[e] || (sl[e] = !0, d("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, lE = function(e, t) {
      zd.hasOwnProperty(t) && zd[t] || (zd[t] = !0, d(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(ov, "")));
    }, oE = function(e, t) {
      sv || (sv = !0, d("`NaN` is an invalid value for the `%s` css style property.", e));
    }, sE = function(e, t) {
      uv || (uv = !0, d("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    lv = function(e, t) {
      e.indexOf("-") > -1 ? rE(e) : eE.test(e) ? iE(e) : ov.test(t) && lE(e, t), typeof t == "number" && (isNaN(t) ? oE(e, t) : isFinite(t) || sE(e, t));
    };
  }
  var uE = lv;
  function cE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : Zx(a)) + ":", t += Fd(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function cv(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || uE(a, t[a]);
        var i = Fd(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function dE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function dv(e) {
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
      var n = dv(e), a = dv(t), r = {};
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
  }, mE = Ye({
    menuitem: !0
  }, pE), hE = "__html";
  function Pd(e, t) {
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
  function Si(e, t) {
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
  }, fv = {
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
  }, ul = {}, vE = new RegExp("^(aria)-[" + se + "]*$"), gE = new RegExp("^(aria)[A-Z][" + se + "]*$");
  function bE(e, t) {
    {
      if (Q.call(ul, t) && ul[t])
        return !0;
      if (gE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = fv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return d("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ul[t] = !0, !0;
        if (t !== a)
          return d("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ul[t] = !0, !0;
      }
      if (vE.test(t)) {
        var r = t.toLowerCase(), i = fv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ul[t] = !0, !1;
        if (t !== i)
          return d("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ul[t] = !0, !0;
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
    Si(e, t) || yE(e, t);
  }
  var pv = !1;
  function xE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !pv && (pv = !0, e === "select" && t.multiple ? d("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : d("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var mv = function() {
  };
  {
    var zn = {}, hv = /^on./, EE = /^on[^A-Z]/, SE = new RegExp("^(aria)-[" + se + "]*$"), RE = new RegExp("^(aria)[A-Z][" + se + "]*$");
    mv = function(e, t, n, a) {
      if (Q.call(zn, t) && zn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return d("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), zn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var u = l.hasOwnProperty(r) ? l[r] : null;
        if (u != null)
          return d("Invalid event handler property `%s`. Did you mean `%s`?", t, u), zn[t] = !0, !0;
        if (hv.test(t))
          return d("Unknown event handler property `%s`. It will be ignored.", t), zn[t] = !0, !0;
      } else if (hv.test(t))
        return EE.test(t) && d("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), zn[t] = !0, !0;
      if (SE.test(t) || RE.test(t))
        return !0;
      if (r === "innerhtml")
        return d("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), zn[t] = !0, !0;
      if (r === "aria")
        return d("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), zn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return d("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), zn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return d("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), zn[t] = !0, !0;
      var c = _t(t), h = c !== null && c.type === Ut;
      if (yu.hasOwnProperty(r)) {
        var v = yu[r];
        if (v !== t)
          return d("Invalid DOM property `%s`. Did you mean `%s`?", t, v), zn[t] = !0, !0;
      } else if (!h && t !== r)
        return d("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), zn[t] = !0, !0;
      return typeof n == "boolean" && gt(t, n, c, !1) ? (n ? d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), zn[t] = !0, !0) : h ? !0 : gt(t, n, c, !1) ? (zn[t] = !0, !1) : ((n === "false" || n === "true") && c !== null && c.type === Ft && (d("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), zn[t] = !0), !0);
    };
  }
  var DE = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = mv(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? d("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && d("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function CE(e, t, n) {
    Si(e, t) || DE(e, t, n);
  }
  var vv = 1, Hd = 2, Do = 4, jE = vv | Hd | Do, Co = null;
  function TE(e) {
    Co !== null && d("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Co = e;
  }
  function wE() {
    Co === null && d("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Co = null;
  }
  function _E(e) {
    return e === Co;
  }
  function Bd(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === mr ? t.parentNode : t;
  }
  var $d = null, cl = null, dl = null;
  function gv(e) {
    var t = Wr(e);
    if (t) {
      if (typeof $d != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = tc(n);
        $d(t.stateNode, t.type, a);
      }
    }
  }
  function OE(e) {
    $d = e;
  }
  function bv(e) {
    cl ? dl ? dl.push(e) : dl = [e] : cl = e;
  }
  function ME() {
    return cl !== null || dl !== null;
  }
  function yv() {
    if (cl) {
      var e = cl, t = dl;
      if (cl = null, dl = null, gv(e), t)
        for (var n = 0; n < t.length; n++)
          gv(t[n]);
    }
  }
  var Nv = function(e, t) {
    return e(t);
  }, xv = function() {
  }, Id = !1;
  function VE() {
    var e = ME();
    e && (xv(), yv());
  }
  function Ev(e, t, n) {
    if (Id)
      return e(t, n);
    Id = !0;
    try {
      return Nv(e, t, n);
    } finally {
      Id = !1, VE();
    }
  }
  function AE(e, t, n) {
    Nv = e, xv = n;
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
  var Yd = !1;
  if (Zt)
    try {
      var To = {};
      Object.defineProperty(To, "passive", {
        get: function() {
          Yd = !0;
        }
      }), window.addEventListener("test", To, To), window.removeEventListener("test", To, To);
    } catch {
      Yd = !1;
    }
  function Sv(e, t, n, a, r, i, l, u, c) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (v) {
      this.onError(v);
    }
  }
  var Rv = Sv;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var qd = document.createElement("react");
    Rv = function(t, n, a, r, i, l, u, c, h) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), C = !1, D = !0, V = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
      function H() {
        qd.removeEventListener(B, Ce, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = V);
      }
      var pe = Array.prototype.slice.call(arguments, 3);
      function Ce() {
        C = !0, H(), n.apply(a, pe), D = !1;
      }
      var Re, Ze = !1, We = !1;
      function _(O) {
        if (Re = O.error, Ze = !0, Re === null && O.colno === 0 && O.lineno === 0 && (We = !0), O.defaultPrevented && Re != null && typeof Re == "object")
          try {
            Re._suppressLogging = !0;
          } catch {
          }
      }
      var B = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", _), qd.addEventListener(B, Ce, !1), v.initEvent(B, !1, !1), qd.dispatchEvent(v), L && Object.defineProperty(window, "event", L), C && D && (Ze ? We && (Re = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Re = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Re)), window.removeEventListener("error", _), !C)
        return H(), Sv.apply(this, arguments);
    };
  }
  var UE = Rv, fl = !1, Nu = null, xu = !1, Gd = null, FE = {
    onError: function(e) {
      fl = !0, Nu = e;
    }
  };
  function Wd(e, t, n, a, r, i, l, u, c) {
    fl = !1, Nu = null, UE.apply(FE, arguments);
  }
  function zE(e, t, n, a, r, i, l, u, c) {
    if (Wd.apply(this, arguments), fl) {
      var h = Kd();
      xu || (xu = !0, Gd = h);
    }
  }
  function PE() {
    if (xu) {
      var e = Gd;
      throw xu = !1, Gd = null, e;
    }
  }
  function HE() {
    return fl;
  }
  function Kd() {
    if (fl) {
      var e = Nu;
      return fl = !1, Nu = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function pl(e) {
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
  ), ml = (
    /*                */
    1
  ), Wt = (
    /*                    */
    2
  ), it = (
    /*                       */
    4
  ), Ri = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), Dv = (
    /*                     */
    64
  ), lt = (
    /*                   */
    128
  ), vr = (
    /*            */
    256
  ), Di = (
    /*                          */
    512
  ), hl = (
    /*                     */
    1024
  ), Pr = (
    /*                      */
    2048
  ), gr = (
    /*                    */
    4096
  ), Ci = (
    /*                   */
    8192
  ), Qd = (
    /*             */
    16384
  ), IE = (
    /*               */
    32767
  ), Eu = (
    /*                   */
    32768
  ), Pn = (
    /*                */
    65536
  ), Xd = (
    /* */
    131072
  ), Cv = (
    /*                       */
    1048576
  ), Jd = (
    /*                    */
    2097152
  ), ji = (
    /*                 */
    4194304
  ), Zd = (
    /*                */
    8388608
  ), Hr = (
    /*               */
    16777216
  ), ef = (
    /*              */
    33554432
  ), tf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    it | hl | 0
  ), nf = Wt | it | Ri | wo | Di | gr | Ci, _o = it | Dv | Di | Ci, vl = Pr | Ri, br = ji | Zd | Jd, YE = m.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Wt | gr)) !== Oe && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function jv(e) {
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
  function Tv(e) {
    return e.tag === x ? e.stateNode.containerInfo : null;
  }
  function qE(e) {
    return Ti(e) === e;
  }
  function GE(e) {
    {
      var t = YE.current;
      if (t !== null && t.tag === j) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || d("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", ze(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = pl(e);
    return r ? Ti(r) === r : !1;
  }
  function wv(e) {
    if (Ti(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function _v(e) {
    var t = e.alternate;
    if (!t) {
      var n = Ti(e);
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
            return wv(i), e;
          if (c === r)
            return wv(i), t;
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
  function Ov(e) {
    var t = _v(e);
    return t !== null ? Mv(t) : null;
  }
  function Mv(e) {
    if (e.tag === k || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Mv(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function WE(e) {
    var t = _v(e);
    return t !== null ? Vv(t) : null;
  }
  function Vv(e) {
    if (e.tag === k || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== T) {
        var n = Vv(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Av = f.unstable_scheduleCallback, KE = f.unstable_cancelCallback, QE = f.unstable_shouldYield, XE = f.unstable_requestPaint, mn = f.unstable_now, JE = f.unstable_getCurrentPriorityLevel, Su = f.unstable_ImmediatePriority, af = f.unstable_UserBlockingPriority, wi = f.unstable_NormalPriority, ZE = f.unstable_LowPriority, rf = f.unstable_IdlePriority, eS = f.unstable_yieldValue, tS = f.unstable_setDisableYieldValue, gl = null, _n = null, ve = null, Ka = !1, _a = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function nS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return d("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      et && (e = Ye({}, e, {
        getLaneLabelMap: sS,
        injectProfilingHooks: oS
      })), gl = t.inject(e), _n = t;
    } catch (n) {
      d("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function aS(e, t) {
    if (_n && typeof _n.onScheduleFiberRoot == "function")
      try {
        _n.onScheduleFiberRoot(gl, e, t);
      } catch (n) {
        Ka || (Ka = !0, d("React instrumentation encountered an error: %s", n));
      }
  }
  function rS(e, t) {
    if (_n && typeof _n.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & lt) === lt;
        if (ut) {
          var a;
          switch (t) {
            case la:
              a = Su;
              break;
            case Nr:
              a = af;
              break;
            case xr:
              a = wi;
              break;
            case _u:
              a = rf;
              break;
            default:
              a = wi;
              break;
          }
          _n.onCommitFiberRoot(gl, e, a, n);
        }
      } catch (r) {
        Ka || (Ka = !0, d("React instrumentation encountered an error: %s", r));
      }
  }
  function iS(e) {
    if (_n && typeof _n.onPostCommitFiberRoot == "function")
      try {
        _n.onPostCommitFiberRoot(gl, e);
      } catch (t) {
        Ka || (Ka = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function lS(e) {
    if (_n && typeof _n.onCommitFiberUnmount == "function")
      try {
        _n.onCommitFiberUnmount(gl, e);
      } catch (t) {
        Ka || (Ka = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function hn(e) {
    if (typeof eS == "function" && (tS(e), b(e)), _n && typeof _n.setStrictMode == "function")
      try {
        _n.setStrictMode(gl, e);
      } catch (t) {
        Ka || (Ka = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function oS(e) {
    ve = e;
  }
  function sS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < of; n++) {
        var a = TS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function uS(e) {
    ve !== null && typeof ve.markCommitStarted == "function" && ve.markCommitStarted(e);
  }
  function Lv() {
    ve !== null && typeof ve.markCommitStopped == "function" && ve.markCommitStopped();
  }
  function Oo(e) {
    ve !== null && typeof ve.markComponentRenderStarted == "function" && ve.markComponentRenderStarted(e);
  }
  function bl() {
    ve !== null && typeof ve.markComponentRenderStopped == "function" && ve.markComponentRenderStopped();
  }
  function cS(e) {
    ve !== null && typeof ve.markComponentPassiveEffectMountStarted == "function" && ve.markComponentPassiveEffectMountStarted(e);
  }
  function dS() {
    ve !== null && typeof ve.markComponentPassiveEffectMountStopped == "function" && ve.markComponentPassiveEffectMountStopped();
  }
  function fS(e) {
    ve !== null && typeof ve.markComponentPassiveEffectUnmountStarted == "function" && ve.markComponentPassiveEffectUnmountStarted(e);
  }
  function pS() {
    ve !== null && typeof ve.markComponentPassiveEffectUnmountStopped == "function" && ve.markComponentPassiveEffectUnmountStopped();
  }
  function mS(e) {
    ve !== null && typeof ve.markComponentLayoutEffectMountStarted == "function" && ve.markComponentLayoutEffectMountStarted(e);
  }
  function hS() {
    ve !== null && typeof ve.markComponentLayoutEffectMountStopped == "function" && ve.markComponentLayoutEffectMountStopped();
  }
  function kv(e) {
    ve !== null && typeof ve.markComponentLayoutEffectUnmountStarted == "function" && ve.markComponentLayoutEffectUnmountStarted(e);
  }
  function Uv() {
    ve !== null && typeof ve.markComponentLayoutEffectUnmountStopped == "function" && ve.markComponentLayoutEffectUnmountStopped();
  }
  function vS(e, t, n) {
    ve !== null && typeof ve.markComponentErrored == "function" && ve.markComponentErrored(e, t, n);
  }
  function gS(e, t, n) {
    ve !== null && typeof ve.markComponentSuspended == "function" && ve.markComponentSuspended(e, t, n);
  }
  function bS(e) {
    ve !== null && typeof ve.markLayoutEffectsStarted == "function" && ve.markLayoutEffectsStarted(e);
  }
  function yS() {
    ve !== null && typeof ve.markLayoutEffectsStopped == "function" && ve.markLayoutEffectsStopped();
  }
  function NS(e) {
    ve !== null && typeof ve.markPassiveEffectsStarted == "function" && ve.markPassiveEffectsStarted(e);
  }
  function xS() {
    ve !== null && typeof ve.markPassiveEffectsStopped == "function" && ve.markPassiveEffectsStopped();
  }
  function Fv(e) {
    ve !== null && typeof ve.markRenderStarted == "function" && ve.markRenderStarted(e);
  }
  function ES() {
    ve !== null && typeof ve.markRenderYielded == "function" && ve.markRenderYielded();
  }
  function zv() {
    ve !== null && typeof ve.markRenderStopped == "function" && ve.markRenderStopped();
  }
  function SS(e) {
    ve !== null && typeof ve.markRenderScheduled == "function" && ve.markRenderScheduled(e);
  }
  function RS(e, t) {
    ve !== null && typeof ve.markForceUpdateScheduled == "function" && ve.markForceUpdateScheduled(e, t);
  }
  function lf(e, t) {
    ve !== null && typeof ve.markStateUpdateScheduled == "function" && ve.markStateUpdateScheduled(e, t);
  }
  var Te = (
    /*                         */
    0
  ), Xe = (
    /*                 */
    1
  ), mt = (
    /*                    */
    2
  ), Pt = (
    /*               */
    8
  ), Qa = (
    /*              */
    16
  ), Pv = Math.clz32 ? Math.clz32 : jS, DS = Math.log, CS = Math.LN2;
  function jS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (DS(t) / CS | 0) | 0;
  }
  var of = 31, X = (
    /*                        */
    0
  ), vn = (
    /*                          */
    0
  ), Le = (
    /*                        */
    1
  ), yl = (
    /*    */
    2
  ), yr = (
    /*             */
    4
  ), _i = (
    /*            */
    8
  ), Xa = (
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
  ), sf = (
    /*                        */
    128
  ), uf = (
    /*                        */
    256
  ), cf = (
    /*                        */
    512
  ), df = (
    /*                        */
    1024
  ), ff = (
    /*                        */
    2048
  ), pf = (
    /*                        */
    4096
  ), mf = (
    /*                        */
    8192
  ), hf = (
    /*                        */
    16384
  ), vf = (
    /*                       */
    32768
  ), gf = (
    /*                       */
    65536
  ), bf = (
    /*                       */
    131072
  ), yf = (
    /*                       */
    262144
  ), Nf = (
    /*                       */
    524288
  ), xf = (
    /*                       */
    1048576
  ), Ef = (
    /*                       */
    2097152
  ), Ru = (
    /*                            */
    130023424
  ), xl = (
    /*                             */
    4194304
  ), Sf = (
    /*                             */
    8388608
  ), Rf = (
    /*                             */
    16777216
  ), Df = (
    /*                             */
    33554432
  ), Cf = (
    /*                             */
    67108864
  ), Hv = xl, Ao = (
    /*          */
    134217728
  ), Bv = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), Oi = (
    /*                        */
    536870912
  ), ra = (
    /*                   */
    1073741824
  );
  function TS(e) {
    {
      if (e & Le)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & yr)
        return "InputContinuous";
      if (e & _i)
        return "DefaultHydration";
      if (e & Xa)
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
      if (e & Oi)
        return "Idle";
      if (e & ra)
        return "Offscreen";
    }
  }
  var Dt = -1, Du = Vo, Cu = xl;
  function ko(e) {
    switch (Mi(e)) {
      case Le:
        return Le;
      case yl:
        return yl;
      case yr:
        return yr;
      case _i:
        return _i;
      case Xa:
        return Xa;
      case Mo:
        return Mo;
      case Vo:
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
      case Ef:
        return e & Nl;
      case xl:
      case Sf:
      case Rf:
      case Df:
      case Cf:
        return e & Ru;
      case Ao:
        return Ao;
      case Lo:
        return Lo;
      case Oi:
        return Oi;
      case ra:
        return ra;
      default:
        return d("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function ju(e, t) {
    var n = e.pendingLanes;
    if (n === X)
      return X;
    var a = X, r = e.suspendedLanes, i = e.pingedLanes, l = n & Bv;
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
      var v = Mi(a), C = Mi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= C || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === Xa && (C & Nl) !== X
      )
        return t;
    }
    (a & yr) !== X && (a |= n & Xa);
    var D = e.entangledLanes;
    if (D !== X)
      for (var V = e.entanglements, L = a & D; L > 0; ) {
        var H = Vi(L), pe = 1 << H;
        a |= V[H], L &= ~pe;
      }
    return a;
  }
  function wS(e, t) {
    for (var n = e.eventTimes, a = Dt; t > 0; ) {
      var r = Vi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function _S(e, t) {
    switch (e) {
      case Le:
      case yl:
      case yr:
        return t + 250;
      case _i:
      case Xa:
      case Mo:
      case Vo:
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
      case Ef:
        return t + 5e3;
      case xl:
      case Sf:
      case Rf:
      case Df:
      case Cf:
        return Dt;
      case Ao:
      case Lo:
      case Oi:
      case ra:
        return Dt;
      default:
        return d("Should have found matching lanes. This is a bug in React."), Dt;
    }
  }
  function OS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Vi(l), c = 1 << u, h = i[u];
      h === Dt ? ((c & a) === X || (c & r) !== X) && (i[u] = _S(c, t)) : h <= t && (e.expiredLanes |= c), l &= ~c;
    }
  }
  function MS(e) {
    return ko(e.pendingLanes);
  }
  function jf(e) {
    var t = e.pendingLanes & ~ra;
    return t !== X ? t : t & ra ? ra : X;
  }
  function VS(e) {
    return (e & Le) !== X;
  }
  function Tf(e) {
    return (e & Bv) !== X;
  }
  function $v(e) {
    return (e & Ru) === e;
  }
  function AS(e) {
    var t = Le | yr | Xa;
    return (e & t) === X;
  }
  function LS(e) {
    return (e & Nl) === e;
  }
  function Tu(e, t) {
    var n = yl | yr | _i | Xa;
    return (t & n) !== X;
  }
  function kS(e, t) {
    return (t & e.expiredLanes) !== X;
  }
  function Iv(e) {
    return (e & Nl) !== X;
  }
  function Yv() {
    var e = Du;
    return Du <<= 1, (Du & Nl) === X && (Du = Vo), e;
  }
  function US() {
    var e = Cu;
    return Cu <<= 1, (Cu & Ru) === X && (Cu = xl), e;
  }
  function Mi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Mi(e);
  }
  function Vi(e) {
    return 31 - Pv(e);
  }
  function wf(e) {
    return Vi(e);
  }
  function ia(e, t) {
    return (e & t) !== X;
  }
  function El(e, t) {
    return (e & t) === t;
  }
  function Ie(e, t) {
    return e | t;
  }
  function wu(e, t) {
    return e & ~t;
  }
  function qv(e, t) {
    return e & t;
  }
  function tO(e) {
    return e;
  }
  function FS(e, t) {
    return e !== vn && e < t ? e : t;
  }
  function _f(e) {
    for (var t = [], n = 0; n < of; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== Oi && (e.suspendedLanes = X, e.pingedLanes = X);
    var a = e.eventTimes, r = wf(t);
    a[r] = n;
  }
  function zS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Vi(a), i = 1 << r;
      n[r] = Dt, a &= ~i;
    }
  }
  function Gv(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function PS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = X, e.pingedLanes = X, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Vi(l), c = 1 << u;
      a[u] = X, r[u] = Dt, i[u] = Dt, l &= ~c;
    }
  }
  function Of(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Vi(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function HS(e, t) {
    var n = Mi(t), a;
    switch (n) {
      case yr:
        a = yl;
        break;
      case Xa:
        a = _i;
        break;
      case Vo:
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
      case Ef:
      case xl:
      case Sf:
      case Rf:
      case Df:
      case Cf:
        a = Mo;
        break;
      case Oi:
        a = Lo;
        break;
      default:
        a = vn;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== vn ? vn : a;
  }
  function Wv(e, t, n) {
    if (_a)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = wf(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Kv(e, t) {
    if (_a)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = wf(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var c = u.alternate;
          (c === null || !a.has(c)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function Qv(e, t) {
    return null;
  }
  var la = Le, Nr = yr, xr = Xa, _u = Oi, zo = vn;
  function Oa() {
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
  function Mf(e, t) {
    return e !== 0 && e < t;
  }
  function Xv(e) {
    var t = Mi(e);
    return Mf(la, t) ? Mf(Nr, t) ? Tf(t) ? xr : _u : Nr : la;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Jv;
  function YS(e) {
    Jv = e;
  }
  function qS(e) {
    Jv(e);
  }
  var Vf;
  function GS(e) {
    Vf = e;
  }
  var Zv;
  function WS(e) {
    Zv = e;
  }
  var eg;
  function KS(e) {
    eg = e;
  }
  var tg;
  function QS(e) {
    tg = e;
  }
  var Af = !1, Mu = [], Br = null, $r = null, Ir = null, Po = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), Yr = [], XS = [
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
  function ng(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Br = null;
        break;
      case "dragenter":
      case "dragleave":
        $r = null;
        break;
      case "mouseover":
      case "mouseout":
        Ir = null;
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
        var u = Wr(t);
        u !== null && Vf(u);
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
        return Br = Bo(Br, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return $r = Bo($r, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var u = r;
        return Ir = Bo(Ir, e, t, n, a, u), !0;
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
  function ag(e) {
    var t = ki(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === te) {
          var r = jv(n);
          if (r !== null) {
            e.blockedOn = r, tg(e.priority, function() {
              Zv(n);
            });
            return;
          }
        } else if (a === x) {
          var i = n.stateNode;
          if (Ou(i)) {
            e.blockedOn = Tv(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function t0(e) {
    for (var t = eg(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Yr.length && Mf(t, Yr[a].priority); a++)
      ;
    Yr.splice(a, 0, n), a === 0 && ag(n);
  }
  function Vu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Uf(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        TE(i), r.target.dispatchEvent(i), wE();
      } else {
        var l = Wr(a);
        return l !== null && Vf(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function rg(e, t, n) {
    Vu(e) && n.delete(t);
  }
  function n0() {
    Af = !1, Br !== null && Vu(Br) && (Br = null), $r !== null && Vu($r) && ($r = null), Ir !== null && Vu(Ir) && (Ir = null), Po.forEach(rg), Ho.forEach(rg);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Af || (Af = !0, f.unstable_scheduleCallback(f.unstable_NormalPriority, n0)));
  }
  function Io(e) {
    if (Mu.length > 0) {
      $o(Mu[0], e);
      for (var t = 1; t < Mu.length; t++) {
        var n = Mu[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Br !== null && $o(Br, e), $r !== null && $o($r, e), Ir !== null && $o(Ir, e);
    var a = function(u) {
      return $o(u, e);
    };
    Po.forEach(a), Ho.forEach(a);
    for (var r = 0; r < Yr.length; r++) {
      var i = Yr[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; Yr.length > 0; ) {
      var l = Yr[0];
      if (l.blockedOn !== null)
        break;
      ag(l), l.blockedOn === null && Yr.shift();
    }
  }
  var Sl = m.ReactCurrentBatchConfig, Lf = !0;
  function ig(e) {
    Lf = !!e;
  }
  function a0() {
    return Lf;
  }
  function r0(e, t, n) {
    var a = lg(t), r;
    switch (a) {
      case la:
        r = i0;
        break;
      case Nr:
        r = l0;
        break;
      case xr:
      default:
        r = kf;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function i0(e, t, n, a) {
    var r = Oa(), i = Sl.transition;
    Sl.transition = null;
    try {
      gn(la), kf(e, t, n, a);
    } finally {
      gn(r), Sl.transition = i;
    }
  }
  function l0(e, t, n, a) {
    var r = Oa(), i = Sl.transition;
    Sl.transition = null;
    try {
      gn(Nr), kf(e, t, n, a);
    } finally {
      gn(r), Sl.transition = i;
    }
  }
  function kf(e, t, n, a) {
    Lf && o0(e, t, n, a);
  }
  function o0(e, t, n, a) {
    var r = Uf(e, t, n, a);
    if (r === null) {
      Xf(e, t, a, Au, n), ng(e, a);
      return;
    }
    if (e0(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (ng(e, a), t & Do && JS(e)) {
      for (; r !== null; ) {
        var i = Wr(r);
        i !== null && qS(i);
        var l = Uf(e, t, n, a);
        if (l === null && Xf(e, t, a, Au, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Xf(e, t, a, null, n);
  }
  var Au = null;
  function Uf(e, t, n, a) {
    Au = null;
    var r = Bd(a), i = ki(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === te) {
          var c = jv(l);
          if (c !== null)
            return c;
          i = null;
        } else if (u === x) {
          var h = l.stateNode;
          if (Ou(h))
            return Tv(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Au = i, null;
  }
  function lg(e) {
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
        return la;
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
        return Nr;
      case "message": {
        var t = JE();
        switch (t) {
          case Su:
            return la;
          case af:
            return Nr;
          case wi:
          case ZE:
            return xr;
          case rf:
            return _u;
          default:
            return xr;
        }
      }
      default:
        return xr;
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
  var Yo = null, Ff = null, qo = null;
  function f0(e) {
    return Yo = e, Ff = sg(), !0;
  }
  function p0() {
    Yo = null, Ff = null, qo = null;
  }
  function og() {
    if (qo)
      return qo;
    var e, t = Ff, n = t.length, a, r = sg(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, u), qo;
  }
  function sg() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function Lu(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function ku() {
    return !0;
  }
  function ug() {
    return !1;
  }
  function oa(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var c = e[u];
          c ? this[u] = c(i) : this[u] = i[u];
        }
      var h = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return h ? this.isDefaultPrevented = ku : this.isDefaultPrevented = ug, this.isPropagationStopped = ug, this;
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
  }, zf = oa(Rl), Go = Ye({}, Rl, {
    view: 0,
    detail: 0
  }), m0 = oa(Go), Pf, Hf, Wo;
  function h0(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (Pf = e.screenX - Wo.screenX, Hf = e.screenY - Wo.screenY) : (Pf = 0, Hf = 0), Wo = e);
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
    getModifierState: $f,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (h0(e), Pf);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Hf;
    }
  }), cg = oa(Uu), v0 = Ye({}, Uu, {
    dataTransfer: 0
  }), g0 = oa(v0), b0 = Ye({}, Go, {
    relatedTarget: 0
  }), Bf = oa(b0), y0 = Ye({}, Rl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), N0 = oa(y0), x0 = Ye({}, Rl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), E0 = oa(x0), S0 = Ye({}, Rl, {
    data: 0
  }), dg = oa(S0), R0 = dg, D0 = {
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
  function $f(e) {
    return w0;
  }
  var _0 = Ye({}, Go, {
    key: j0,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: $f,
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
  }), O0 = oa(_0), M0 = Ye({}, Uu, {
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
  }), fg = oa(M0), V0 = Ye({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: $f
  }), A0 = oa(V0), L0 = Ye({}, Rl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = oa(L0), U0 = Ye({}, Uu, {
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
  }), F0 = oa(U0), z0 = [9, 13, 27, 32], pg = 229, If = Zt && "CompositionEvent" in window, Ko = null;
  Zt && "documentMode" in document && (Ko = document.documentMode);
  var P0 = Zt && "TextEvent" in window && !Ko, mg = Zt && (!If || Ko && Ko > 8 && Ko <= 11), hg = 32, vg = String.fromCharCode(hg);
  function H0() {
    Xt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Xt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var gg = !1;
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
    return e === "keydown" && t.keyCode === pg;
  }
  function bg(e, t) {
    switch (e) {
      case "keyup":
        return z0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== pg;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function yg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function Ng(e) {
    return e.locale === "ko";
  }
  var Dl = !1;
  function Y0(e, t, n, a, r) {
    var i, l;
    if (If ? i = $0(t) : Dl ? bg(t, a) && (i = "onCompositionEnd") : I0(t, a) && (i = "onCompositionStart"), !i)
      return null;
    mg && !Ng(a) && (!Dl && i === "onCompositionStart" ? Dl = f0(r) : i === "onCompositionEnd" && Dl && (l = og()));
    var u = Bu(n, i);
    if (u.length > 0) {
      var c = new dg(i, t, null, a, r);
      if (e.push({
        event: c,
        listeners: u
      }), l)
        c.data = l;
      else {
        var h = yg(a);
        h !== null && (c.data = h);
      }
    }
  }
  function q0(e, t) {
    switch (e) {
      case "compositionend":
        return yg(t);
      case "keypress":
        var n = t.which;
        return n !== hg ? null : (gg = !0, vg);
      case "textInput":
        var a = t.data;
        return a === vg && gg ? null : a;
      default:
        return null;
    }
  }
  function G0(e, t) {
    if (Dl) {
      if (e === "compositionend" || !If && bg(e, t)) {
        var n = og();
        return p0(), Dl = !1, n;
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
        return mg && !Ng(t) ? null : t.data;
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
  function xg(e) {
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
  function Eg(e, t, n, a) {
    bv(a);
    var r = Bu(t, "onChange");
    if (r.length > 0) {
      var i = new zf("onChange", "change", null, n, a);
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
    Eg(t, Xo, e, Bd(e)), Ev(tR, t);
  }
  function tR(e) {
    Pg(e, 0);
  }
  function Fu(e) {
    var t = Ol(e);
    if (yo(t))
      return e;
  }
  function nR(e, t) {
    if (e === "change")
      return t;
  }
  var Sg = !1;
  Zt && (Sg = X0("input") && (!document.documentMode || document.documentMode > 9));
  function aR(e, t) {
    Qo = e, Xo = t, Qo.attachEvent("onpropertychange", Dg);
  }
  function Rg() {
    Qo && (Qo.detachEvent("onpropertychange", Dg), Qo = null, Xo = null);
  }
  function Dg(e) {
    e.propertyName === "value" && Fu(Xo) && eR(e);
  }
  function rR(e, t, n) {
    e === "focusin" ? (Rg(), aR(t, n)) : e === "focusout" && Rg();
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
    var u = n ? Ol(n) : window, c, h;
    if (Z0(u) ? c = nR : xg(u) ? Sg ? c = sR : (c = iR, h = rR) : lR(u) && (c = oR), c) {
      var v = c(t, n);
      if (v) {
        Eg(e, v, a, r);
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
      if (h && (ki(h) || fs(h)))
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
        if (D = n, V = L ? ki(L) : null, V !== null) {
          var H = Ti(V);
          (V !== H || V.tag !== k && V.tag !== ee) && (V = null);
        }
      } else
        D = null, V = n;
      if (D !== V) {
        var pe = cg, Ce = "onMouseLeave", Re = "onMouseEnter", Ze = "mouse";
        (t === "pointerout" || t === "pointerover") && (pe = fg, Ce = "onPointerLeave", Re = "onPointerEnter", Ze = "pointer");
        var We = D == null ? v : Ol(D), _ = V == null ? v : Ol(V), B = new pe(Ce, Ze + "leave", D, a, r);
        B.target = We, B.relatedTarget = _;
        var O = null, ne = ki(r);
        if (ne === n) {
          var be = new pe(Re, Ze + "enter", V, a, r);
          be.target = _, be.relatedTarget = We, O = be;
        }
        kR(e, B, O, D, V);
      }
    }
  }
  function pR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var sa = typeof Object.is == "function" ? Object.is : pR;
  function Jo(e, t) {
    if (sa(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Q.call(t, i) || !sa(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function Cg(e) {
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
  function jg(e, t) {
    for (var n = Cg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === mr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = Cg(mR(n));
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
      for (var D = null; v === t && (n === 0 || v.nodeType === mr) && (l = i + n), v === a && (r === 0 || v.nodeType === mr) && (u = i + r), v.nodeType === mr && (i += v.nodeValue.length), (D = v.firstChild) !== null; )
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
      var h = jg(e, l), v = jg(e, u);
      if (h && v) {
        if (r.rangeCount === 1 && r.anchorNode === h.node && r.anchorOffset === h.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var C = n.createRange();
        C.setStart(h.node, h.offset), r.removeAllRanges(), l > u ? (r.addRange(C), r.extend(v.node, v.offset)) : (C.setEnd(v.node, v.offset), r.addRange(C));
      }
    }
  }
  function Tg(e) {
    return e && e.nodeType === mr;
  }
  function wg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Tg(e) ? !1 : Tg(t) ? wg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function bR(e) {
    return e && e.ownerDocument && wg(e.ownerDocument.documentElement, e);
  }
  function yR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function _g() {
    for (var e = window, t = dr(); t instanceof e.HTMLIFrameElement; ) {
      if (yR(t))
        e = t.contentWindow;
      else
        return t;
      t = dr(e.document);
    }
    return t;
  }
  function Yf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function NR() {
    var e = _g();
    return {
      focusedElem: e,
      selectionRange: Yf(e) ? ER(e) : null
    };
  }
  function xR(e) {
    var t = _g(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && bR(n)) {
      a !== null && Yf(n) && SR(n, a);
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
  var Cl = null, qf = null, Zo = null, Gf = !1;
  function CR(e) {
    if ("selectionStart" in e && Yf(e))
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
    return e.window === e ? e.document : e.nodeType === hr ? e : e.ownerDocument;
  }
  function Og(e, t, n) {
    var a = jR(n);
    if (!(Gf || Cl == null || Cl !== dr(a))) {
      var r = CR(Cl);
      if (!Zo || !Jo(Zo, r)) {
        Zo = r;
        var i = Bu(qf, "onSelect");
        if (i.length > 0) {
          var l = new zf("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Cl;
        }
      }
    }
  }
  function TR(e, t, n, a, r, i, l) {
    var u = n ? Ol(n) : window;
    switch (t) {
      case "focusin":
        (xg(u) || u.contentEditable === "true") && (Cl = u, qf = n, Zo = null);
        break;
      case "focusout":
        Cl = null, qf = null, Zo = null;
        break;
      case "mousedown":
        Gf = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Gf = !1, Og(e, a, r);
        break;
      case "selectionchange":
        if (RR)
          break;
      case "keydown":
      case "keyup":
        Og(e, a, r);
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
  }, Wf = {}, Mg = {};
  Zt && (Mg = document.createElement("div").style, "AnimationEvent" in window || (delete jl.animationend.animation, delete jl.animationiteration.animation, delete jl.animationstart.animation), "TransitionEvent" in window || delete jl.transitionend.transition);
  function Pu(e) {
    if (Wf[e])
      return Wf[e];
    if (!jl[e])
      return e;
    var t = jl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Mg)
        return Wf[e] = t[n];
    return e;
  }
  var Vg = Pu("animationend"), Ag = Pu("animationiteration"), Lg = Pu("animationstart"), kg = Pu("transitionend"), Ug = /* @__PURE__ */ new Map(), Fg = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function qr(e, t) {
    Ug.set(e, t), Xt(t, [e]);
  }
  function wR() {
    for (var e = 0; e < Fg.length; e++) {
      var t = Fg[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      qr(n, "on" + a);
    }
    qr(Vg, "onAnimationEnd"), qr(Ag, "onAnimationIteration"), qr(Lg, "onAnimationStart"), qr("dblclick", "onDoubleClick"), qr("focusin", "onFocus"), qr("focusout", "onBlur"), qr(kg, "onTransitionEnd");
  }
  function _R(e, t, n, a, r, i, l) {
    var u = Ug.get(t);
    if (u !== void 0) {
      var c = zf, h = t;
      switch (t) {
        case "keypress":
          if (Lu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          c = O0;
          break;
        case "focusin":
          h = "focus", c = Bf;
          break;
        case "focusout":
          h = "blur", c = Bf;
          break;
        case "beforeblur":
        case "afterblur":
          c = Bf;
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
          c = cg;
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
        case Vg:
        case Ag:
        case Lg:
          c = N0;
          break;
        case kg:
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
          c = fg;
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
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Kf = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function zg(e, t, n) {
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
        zg(e, c, u), a = l;
      }
    else
      for (var h = 0; h < t.length; h++) {
        var v = t[h], C = v.instance, D = v.currentTarget, V = v.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        zg(e, V, D), a = C;
      }
  }
  function Pg(e, t) {
    for (var n = (t & Do) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      MR(i, l, n);
    }
    PE();
  }
  function VR(e, t, n, a, r) {
    var i = Bd(n), l = [];
    OR(l, e, a, n, i, t), Pg(l, t);
  }
  function Tt(e, t) {
    Kf.has(e) || d('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = uC(t), r = UR(e);
    a.has(r) || (Hg(t, e, Hd, n), a.add(r));
  }
  function Qf(e, t, n) {
    Kf.has(e) && !t && d('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Do), Hg(n, e, a, t);
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Hu]) {
      e[Hu] = !0, Qt.forEach(function(n) {
        n !== "selectionchange" && (Kf.has(n) || Qf(n, !1, e), Qf(n, !0, e));
      });
      var t = e.nodeType === hr ? e : e.ownerDocument;
      t !== null && (t[Hu] || (t[Hu] = !0, Qf("selectionchange", !1, t)));
    }
  }
  function Hg(e, t, n, a, r) {
    var i = r0(e, t, n), l = void 0;
    Yd && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? c0(e, t, i, l) : u0(e, t, i) : l !== void 0 ? d0(e, t, i, l) : s0(e, t, i);
  }
  function Bg(e, t) {
    return e === t || e.nodeType === Gt && e.parentNode === t;
  }
  function Xf(e, t, n, a, r) {
    var i = a;
    if (!(t & vv) && !(t & Hd)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var c = u.tag;
          if (c === x || c === T) {
            var h = u.stateNode.containerInfo;
            if (Bg(h, l))
              break;
            if (c === T)
              for (var v = u.return; v !== null; ) {
                var C = v.tag;
                if (C === x || C === T) {
                  var D = v.stateNode.containerInfo;
                  if (Bg(D, l))
                    return;
                }
                v = v.return;
              }
            for (; h !== null; ) {
              var V = ki(h);
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
    Ev(function() {
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
  function Tl(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== k);
    return e || null;
  }
  function LR(e, t) {
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
  function $g(e, t, n, a, r) {
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
    a !== null && $g(e, t, a, i, !1), r !== null && n !== null && $g(e, n, r, i, !0);
  }
  function UR(e, t) {
    return e + "__bubble";
  }
  var Kn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Gr = "suppressHydrationWarning", Ig = "autoFocus", Ai = "children", Li = "style", Iu = "__html", Jf, Yu, rs, Yg, qu, qg, Gg;
  Jf = {
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
      possibleRegistrationNames: kn
    });
  }, qg = Zt && !document.documentMode, rs = function(e, t, n) {
    if (!Kn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (Kn = !0, d("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Yg = function(e) {
    if (!Kn) {
      Kn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), d("Extra attributes from the server: %s", t);
    }
  }, qu = function(e, t) {
    t === !1 ? d("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : d("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Gg = function(e, t) {
    var n = e.namespaceURI === pr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var FR = /\r\n?/g, zR = /\u0000|\uFFFD/g;
  function Gu(e) {
    wt(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(FR, `
`).replace(zR, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (Kn || (Kn = !0, d('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && W))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Wg(e) {
    return e.nodeType === hr ? e : e.ownerDocument;
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
        if (i === Li)
          l && Object.freeze(l), cv(t, l);
        else if (i === as) {
          var u = l ? l[Iu] : void 0;
          u != null && iv(t, u);
        } else if (i === Ai)
          if (typeof l == "string") {
            var c = e !== "textarea" || l !== "";
            c && bu(t, l);
          } else typeof l == "number" && bu(t, "" + l);
        else i === $u || i === Gr || i === Ig || (Lt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && Tt("scroll", t)) : l != null && Ca(t, i, l, r));
      }
  }
  function BR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? cv(e, l) : i === as ? iv(e, l) : i === Ai ? bu(e, l) : Ca(e, i, l, a);
    }
  }
  function $R(e, t, n, a) {
    var r, i = Wg(n), l, u = a;
    if (u === pr && (u = Ld(e)), u === pr) {
      if (r = Si(e, t), !r && e !== e.toLowerCase() && d("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
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
    return u === pr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Q.call(Jf, e) && (Jf[e] = !0, d("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function IR(e, t) {
    return Wg(t).createTextNode(e);
  }
  function YR(e, t, n, a) {
    var r = Si(t, n);
    Yu(t, n);
    var i;
    switch (t) {
      case "dialog":
        Tt("cancel", e), Tt("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        Tt("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < es.length; l++)
          Tt(es[l], e);
        i = n;
        break;
      case "source":
        Tt("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        Tt("error", e), Tt("load", e), i = n;
        break;
      case "details":
        Tt("toggle", e), i = n;
        break;
      case "input":
        hu(e, n), i = No(e, n), Tt("invalid", e);
        break;
      case "option":
        pt(e, n), i = n;
        break;
      case "select":
        So(e, n), i = Eo(e, n), Tt("invalid", e);
        break;
      case "textarea":
        nv(e, n), i = Vd(e, n), Tt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Pd(t, i), HR(t, e, a, i, r), t) {
      case "input":
        xi(e), A(e, n, !1);
        break;
      case "textarea":
        xi(e), rv(e);
        break;
      case "option":
        St(e, n);
        break;
      case "select":
        Od(e, n);
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
        l = Vd(e, n), u = Vd(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ku(e);
        break;
    }
    Pd(t, u);
    var c, h, v = null;
    for (c in l)
      if (!(u.hasOwnProperty(c) || !l.hasOwnProperty(c) || l[c] == null))
        if (c === Li) {
          var C = l[c];
          for (h in C)
            C.hasOwnProperty(h) && (v || (v = {}), v[h] = "");
        } else c === as || c === Ai || c === $u || c === Gr || c === Ig || (Lt.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in u) {
      var D = u[c], V = l != null ? l[c] : void 0;
      if (!(!u.hasOwnProperty(c) || D === V || D == null && V == null))
        if (c === Li)
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
        } else c === Ai ? (typeof D == "string" || typeof D == "number") && (i = i || []).push(c, "" + D) : c === $u || c === Gr || (Lt.hasOwnProperty(c) ? (D != null && (typeof D != "function" && qu(c, D), c === "onScroll" && Tt("scroll", e)), !i && V !== D && (i = [])) : (i = i || []).push(c, D));
    }
    return v && (fE(v, u[Li]), (i = i || []).push(Li, v)), i;
  }
  function GR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && p(e, r);
    var i = Si(n, a), l = Si(n, r);
    switch (BR(e, t, i, l), n) {
      case "input":
        N(e, r);
        break;
      case "textarea":
        av(e, r);
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
    switch (u = Si(t, n), Yu(t, n), t) {
      case "dialog":
        Tt("cancel", e), Tt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Tt("load", e);
        break;
      case "video":
      case "audio":
        for (var h = 0; h < es.length; h++)
          Tt(es[h], e);
        break;
      case "source":
        Tt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Tt("error", e), Tt("load", e);
        break;
      case "details":
        Tt("toggle", e);
        break;
      case "input":
        hu(e, n), Tt("invalid", e);
        break;
      case "option":
        pt(e, n);
        break;
      case "select":
        So(e, n), Tt("invalid", e);
        break;
      case "textarea":
        nv(e, n), Tt("invalid", e);
        break;
    }
    Pd(t, n);
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
        if (L === Ai)
          typeof H == "string" ? e.textContent !== H && (n[Gr] !== !0 && Wu(e.textContent, H, i, l), V = [Ai, H]) : typeof H == "number" && e.textContent !== "" + H && (n[Gr] !== !0 && Wu(e.textContent, H, i, l), V = [Ai, "" + H]);
        else if (Lt.hasOwnProperty(L))
          H != null && (typeof H != "function" && qu(L, H), L === "onScroll" && Tt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var pe = void 0, Ce = _t(L);
          if (n[Gr] !== !0) {
            if (!(L === $u || L === Gr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            L === "value" || L === "checked" || L === "selected")) {
              if (L === as) {
                var Re = e.innerHTML, Ze = H ? H[Iu] : void 0;
                if (Ze != null) {
                  var We = Gg(e, Ze);
                  We !== Re && rs(L, Re, We);
                }
              } else if (L === Li) {
                if (c.delete(L), qg) {
                  var _ = cE(H);
                  pe = e.getAttribute("style"), _ !== pe && rs(L, pe, _);
                }
              } else if (u && !ot)
                c.delete(L.toLowerCase()), pe = pi(e, L, H), H !== pe && rs(L, pe, H);
              else if (!Nt(L, Ce, u) && !fn(L, H, Ce, u)) {
                var B = !1;
                if (Ce !== null)
                  c.delete(Ce.attributeName), pe = el(e, L, H, Ce);
                else {
                  var O = a;
                  if (O === pr && (O = Ld(t)), O === pr)
                    c.delete(L.toLowerCase());
                  else {
                    var ne = WR(L);
                    ne !== null && ne !== L && (B = !0, c.delete(ne)), c.delete(L);
                  }
                  pe = pi(e, L, H);
                }
                var be = ot;
                !be && H !== pe && !B && rs(L, pe, H);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    c.size > 0 && n[Gr] !== !0 && Yg(c), t) {
      case "input":
        xi(e), A(e, n, !0);
        break;
      case "textarea":
        xi(e), rv(e);
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
  function Zf(e, t) {
    {
      if (Kn)
        return;
      Kn = !0, d("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function ep(e, t) {
    {
      if (Kn)
        return;
      Kn = !0, d('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function tp(e, t, n) {
    {
      if (Kn)
        return;
      Kn = !0, d("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function np(e, t) {
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
        Md(e, n);
        return;
    }
  }
  var is = function() {
  }, ls = function() {
  };
  {
    var JR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Kg = [
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
    ], ZR = Kg.concat(["button"]), eD = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Qg = {
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
      var n = Ye({}, e || Qg), a = {
        tag: t
      };
      return Kg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), ZR.indexOf(t) !== -1 && (n.pTagInButtonScope = null), JR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
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
    }, Xg = {};
    is = function(e, t, n) {
      n = n || Qg;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && d("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = tD(e, r) ? null : a, l = i ? null : nD(e, n), u = i || l;
      if (u) {
        var c = u.tag, h = !!i + "|" + e + "|" + c;
        if (!Xg[h]) {
          Xg[h] = !0;
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
  var Qu = "suppressHydrationWarning", Xu = "$", Ju = "/$", os = "$?", ss = "$!", aD = "style", ap = null, rp = null;
  function rD(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case hr:
      case Ud: {
        t = a === hr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : kd(null, "");
        break;
      }
      default: {
        var i = a === Gt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = kd(l, t);
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
      var a = e, r = kd(a.namespace, t), i = ls(a.ancestorInfo, t);
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
    ap = a0(), rp = NR();
    var t = null;
    return ig(!1), t;
  }
  function oD(e) {
    xR(rp), ig(ap), ap = null, rp = null;
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
    return ds(r, h), fp(h, t), h;
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
  function ip(e, t) {
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
    return e === void 0 ? xr : lg(e.type);
  }
  var lp = typeof setTimeout == "function" ? setTimeout : void 0, mD = typeof clearTimeout == "function" ? clearTimeout : void 0, op = -1, Jg = typeof Promise == "function" ? Promise : void 0, hD = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jg < "u" ? function(e) {
    return Jg.resolve(null).then(e).catch(vD);
  } : lp;
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
    GR(e, t, n, a, r), fp(e, r);
  }
  function Zg(e) {
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
  function sp(e, t) {
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
    e.nodeType === Gt ? sp(e.parentNode, t) : e.nodeType === Wn && sp(e, t), Io(e);
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
    e.style.display = Fd("display", a);
  }
  function _D(e, t) {
    e.nodeValue = t;
  }
  function OD(e) {
    e.nodeType === Wn ? e.textContent = "" : e.nodeType === hr && e.documentElement && e.removeChild(e.documentElement);
  }
  function MD(e, t, n) {
    return e.nodeType !== Wn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function VD(e, t) {
    return t === "" || e.nodeType !== mr ? null : e;
  }
  function AD(e) {
    return e.nodeType !== Gt ? null : e;
  }
  function eb(e) {
    return e.data === os;
  }
  function up(e) {
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
      if (t === Wn || t === mr)
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
    ds(i, e), fp(e, n);
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
  function tb(e) {
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
    t.nodeType === Wn ? Zf(e, t) : t.nodeType === Gt || ep(e, t);
  }
  function QD(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Wn ? Zf(n, t) : t.nodeType === Gt || ep(n, t));
    }
  }
  function XD(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === Wn ? Zf(n, a) : a.nodeType === Gt || ep(n, a));
  }
  function JD(e, t, n) {
    tp(e, t);
  }
  function ZD(e, t) {
    np(e, t);
  }
  function eC(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && tp(a, t);
    }
  }
  function tC(e, t) {
    {
      var n = e.parentNode;
      n !== null && np(n, t);
    }
  }
  function nC(e, t, n, a, r, i) {
    (i || t[Qu] !== !0) && tp(n, a);
  }
  function aC(e, t, n, a, r) {
    (r || t[Qu] !== !0) && np(n, a);
  }
  function rC(e) {
    d("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function iC(e) {
    ts(e);
  }
  var wl = Math.random().toString(36).slice(2), _l = "__reactFiber$" + wl, cp = "__reactProps$" + wl, cs = "__reactContainer$" + wl, dp = "__reactEvents$" + wl, lC = "__reactListeners$" + wl, oC = "__reactHandles$" + wl;
  function sC(e) {
    delete e[_l], delete e[cp], delete e[dp], delete e[lC], delete e[oC];
  }
  function ds(e, t) {
    t[_l] = e;
  }
  function ec(e, t) {
    t[cs] = e;
  }
  function nb(e) {
    e[cs] = null;
  }
  function fs(e) {
    return !!e[cs];
  }
  function ki(e) {
    var t = e[_l];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[cs] || n[_l], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = tb(e); r !== null; ) {
            var i = r[_l];
            if (i)
              return i;
            r = tb(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Wr(e) {
    var t = e[_l] || e[cs];
    return t && (t.tag === k || t.tag === ee || t.tag === te || t.tag === x) ? t : null;
  }
  function Ol(e) {
    if (e.tag === k || e.tag === ee)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function tc(e) {
    return e[cp] || null;
  }
  function fp(e, t) {
    e[cp] = t;
  }
  function uC(e) {
    var t = e[dp];
    return t === void 0 && (t = e[dp] = /* @__PURE__ */ new Set()), t;
  }
  var ab = {}, rb = m.ReactDebugCurrentFrame;
  function nc(e) {
    if (e) {
      var t = e._owner, n = mo(e.type, e._source, t ? t.type : null);
      rb.setExtraStackFrame(n);
    } else
      rb.setExtraStackFrame(null);
  }
  function Ma(e, t, n, a, r) {
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
          u && !(u instanceof Error) && (nc(r), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), nc(null)), u instanceof Error && !(u.message in ab) && (ab[u.message] = !0, nc(r), d("Failed %s type: %s", n, u.message), nc(null));
        }
    }
  }
  var pp = [], ac;
  ac = [];
  var Er = -1;
  function Kr(e) {
    return {
      current: e
    };
  }
  function On(e, t) {
    if (Er < 0) {
      d("Unexpected pop.");
      return;
    }
    t !== ac[Er] && d("Unexpected Fiber popped."), e.current = pp[Er], pp[Er] = null, ac[Er] = null, Er--;
  }
  function Mn(e, t, n) {
    Er++, pp[Er] = e.current, ac[Er] = n, e.current = t;
  }
  var mp;
  mp = {};
  var ua = {};
  Object.freeze(ua);
  var Sr = Kr(ua), Ja = Kr(!1), hp = ua;
  function Ml(e, t, n) {
    return n && Za(t) ? hp : Sr.current;
  }
  function ib(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Vl(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return ua;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var u = ze(e) || "Unknown";
        Ma(a, i, "context", u);
      }
      return r && ib(e, t, i), i;
    }
  }
  function rc() {
    return Ja.current;
  }
  function Za(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function ic(e) {
    On(Ja, e), On(Sr, e);
  }
  function vp(e) {
    On(Ja, e), On(Sr, e);
  }
  function lb(e, t, n) {
    {
      if (Sr.current !== ua)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      Mn(Sr, t, e), Mn(Ja, n, e);
    }
  }
  function ob(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = ze(e) || "Unknown";
          mp[i] || (mp[i] = !0, d("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error((ze(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var c = ze(e) || "Unknown";
        Ma(r, l, "child context", c);
      }
      return Ye({}, n, l);
    }
  }
  function lc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || ua;
      return hp = Sr.current, Mn(Sr, n, e), Mn(Ja, Ja.current, e), !0;
    }
  }
  function sb(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = ob(e, t, hp);
        a.__reactInternalMemoizedMergedChildContext = r, On(Ja, e), On(Sr, e), Mn(Sr, r, e), Mn(Ja, n, e);
      } else
        On(Ja, e), Mn(Ja, n, e);
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
            if (Za(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Qr = 0, oc = 1, Rr = null, gp = !1, bp = !1;
  function ub(e) {
    Rr === null ? Rr = [e] : Rr.push(e);
  }
  function dC(e) {
    gp = !0, ub(e);
  }
  function cb() {
    gp && Xr();
  }
  function Xr() {
    if (!bp && Rr !== null) {
      bp = !0;
      var e = 0, t = Oa();
      try {
        var n = !0, a = Rr;
        for (gn(la); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Rr = null, gp = !1;
      } catch (i) {
        throw Rr !== null && (Rr = Rr.slice(e + 1)), Av(Su, Xr), i;
      } finally {
        gn(t), bp = !1;
      }
    }
    return null;
  }
  var Al = [], Ll = 0, sc = null, uc = 0, va = [], ga = 0, Ui = null, Dr = 1, Cr = "";
  function fC(e) {
    return zi(), (e.flags & Cv) !== Oe;
  }
  function pC(e) {
    return zi(), uc;
  }
  function mC() {
    var e = Cr, t = Dr, n = t & ~hC(t);
    return n.toString(32) + e;
  }
  function Fi(e, t) {
    zi(), Al[Ll++] = uc, Al[Ll++] = sc, sc = e, uc = t;
  }
  function db(e, t, n) {
    zi(), va[ga++] = Dr, va[ga++] = Cr, va[ga++] = Ui, Ui = e;
    var a = Dr, r = Cr, i = cc(a) - 1, l = a & ~(1 << i), u = n + 1, c = cc(t) + i;
    if (c > 30) {
      var h = i - i % 5, v = (1 << h) - 1, C = (l & v).toString(32), D = l >> h, V = i - h, L = cc(t) + V, H = u << V, pe = H | D, Ce = C + r;
      Dr = 1 << L | pe, Cr = Ce;
    } else {
      var Re = u << i, Ze = Re | l, We = r;
      Dr = 1 << c | Ze, Cr = We;
    }
  }
  function yp(e) {
    zi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Fi(e, n), db(e, n, a);
    }
  }
  function cc(e) {
    return 32 - Pv(e);
  }
  function hC(e) {
    return 1 << cc(e) - 1;
  }
  function Np(e) {
    for (; e === sc; )
      sc = Al[--Ll], Al[Ll] = null, uc = Al[--Ll], Al[Ll] = null;
    for (; e === Ui; )
      Ui = va[--ga], va[ga] = null, Cr = va[--ga], va[ga] = null, Dr = va[--ga], va[ga] = null;
  }
  function vC() {
    return zi(), Ui !== null ? {
      id: Dr,
      overflow: Cr
    } : null;
  }
  function gC(e, t) {
    zi(), va[ga++] = Dr, va[ga++] = Cr, va[ga++] = Ui, Dr = t.id, Cr = t.overflow, Ui = e;
  }
  function zi() {
    Nn() || d("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var yn = null, ba = null, Va = !1, Pi = !1, Jr = null;
  function bC() {
    Va && d("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function fb() {
    Pi = !0;
  }
  function yC() {
    return Pi;
  }
  function NC(e) {
    var t = e.stateNode.containerInfo;
    return ba = FD(t), yn = e, Va = !0, Jr = null, Pi = !1, !0;
  }
  function xC(e, t, n) {
    return ba = zD(t), yn = e, Va = !0, Jr = null, Pi = !1, n !== null && gC(e, n), !0;
  }
  function pb(e, t) {
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
  function mb(e, t) {
    pb(e, t);
    var n = DT();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ri) : a.push(n);
  }
  function xp(e, t) {
    {
      if (Pi)
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
              var pe = t.pendingProps;
              tC(L, pe);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function hb(e, t) {
    t.flags = t.flags & ~gr | Wt, xp(e, t);
  }
  function vb(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = MD(t, n);
        return a !== null ? (e.stateNode = a, yn = e, ba = UD(a), !0) : !1;
      }
      case ee: {
        var r = e.pendingProps, i = VD(t, r);
        return i !== null ? (e.stateNode = i, yn = e, ba = null, !0) : !1;
      }
      case te: {
        var l = AD(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: vC(),
            retryLane: ra
          };
          e.memoizedState = u;
          var c = CT(l);
          return c.return = e, e.child = c, yn = e, ba = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function Ep(e) {
    return (e.mode & Xe) !== Te && (e.flags & lt) === Oe;
  }
  function Sp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Rp(e) {
    if (Va) {
      var t = ba;
      if (!t) {
        Ep(e) && (xp(yn, e), Sp()), hb(yn, e), Va = !1, yn = e;
        return;
      }
      var n = t;
      if (!vb(e, t)) {
        Ep(e) && (xp(yn, e), Sp()), t = us(n);
        var a = yn;
        if (!t || !vb(e, t)) {
          hb(yn, e), Va = !1, yn = e;
          return;
        }
        mb(a, n);
      }
    }
  }
  function EC(e, t, n) {
    var a = e.stateNode, r = !Pi, i = PD(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function SC(e) {
    var t = e.stateNode, n = e.memoizedProps, a = HD(t, n, e);
    if (a) {
      var r = yn;
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
  function gb(e) {
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== x && t.tag !== te; )
      t = t.return;
    yn = t;
  }
  function dc(e) {
    if (e !== yn)
      return !1;
    if (!Va)
      return gb(e), Va = !0, !1;
    if (e.tag !== x && (e.tag !== k || qD(e.type) && !ip(e.type, e.memoizedProps))) {
      var t = ba;
      if (t)
        if (Ep(e))
          bb(e), Sp();
        else
          for (; t; )
            mb(e, t), t = us(t);
    }
    return gb(e), e.tag === te ? ba = DC(e) : ba = yn ? us(e.stateNode) : null, !0;
  }
  function CC() {
    return Va && ba !== null;
  }
  function bb(e) {
    for (var t = ba; t; )
      pb(e, t), t = us(t);
  }
  function kl() {
    yn = null, ba = null, Va = !1, Pi = !1;
  }
  function yb() {
    Jr !== null && (fN(Jr), Jr = null);
  }
  function Nn() {
    return Va;
  }
  function Dp(e) {
    Jr === null ? Jr = [e] : Jr.push(e);
  }
  var jC = m.ReactCurrentBatchConfig, TC = null;
  function wC() {
    return jC.transition;
  }
  var Aa = {
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
    }, Hi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ps = [], ms = [], hs = [], vs = [], gs = [], bs = [], Bi = /* @__PURE__ */ new Set();
    Aa.recordUnsafeLifecycleWarnings = function(e, t) {
      Bi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & Pt && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && hs.push(e), e.mode & Pt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & Pt && typeof t.UNSAFE_componentWillUpdate == "function" && bs.push(e));
    }, Aa.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(D) {
        e.add(ze(D) || "Component"), Bi.add(D.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(D) {
        t.add(ze(D) || "Component"), Bi.add(D.type);
      }), ms = []);
      var n = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(D) {
        n.add(ze(D) || "Component"), Bi.add(D.type);
      }), hs = []);
      var a = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(D) {
        a.add(ze(D) || "Component"), Bi.add(D.type);
      }), vs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(D) {
        r.add(ze(D) || "Component"), Bi.add(D.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (bs.length > 0 && (bs.forEach(function(D) {
        i.add(ze(D) || "Component"), Bi.add(D.type);
      }), bs = []), t.size > 0) {
        var l = Hi(t);
        d(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = Hi(a);
        d(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var c = Hi(i);
        d(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, c);
      }
      if (e.size > 0) {
        var h = Hi(e);
        S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (n.size > 0) {
        var v = Hi(n);
        S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var C = Hi(r);
        S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, C);
      }
    };
    var fc = /* @__PURE__ */ new Map(), Nb = /* @__PURE__ */ new Set();
    Aa.recordLegacyContextWarning = function(e, t) {
      var n = _C(e);
      if (n === null) {
        d("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!Nb.has(e.type)) {
        var a = fc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], fc.set(n, a)), a.push(e));
      }
    }, Aa.flushLegacyContextWarning = function() {
      fc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(ze(i) || "Component"), Nb.add(i.type);
          });
          var r = Hi(a);
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
    }, Aa.discardPendingWarnings = function() {
      ps = [], ms = [], hs = [], vs = [], gs = [], bs = [], fc = /* @__PURE__ */ new Map();
    };
  }
  var Cp, jp, Tp, wp, _p, xb = function(e, t) {
  };
  Cp = !1, jp = !1, Tp = {}, wp = {}, _p = {}, xb = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = ze(t) || "Component";
      wp[n] || (wp[n] = !0, d('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
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
        Tp[r] || (d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Tp[r] = !0);
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
        kt(a, "ref");
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
      if (_p[t])
        return;
      _p[t] = !0, d("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function Eb(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function Sb(e) {
    function t(_, B) {
      if (e) {
        var O = _.deletions;
        O === null ? (_.deletions = [B], _.flags |= Ri) : O.push(B);
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
      var O = Xi(_, B);
      return O.index = 0, O.sibling = null, O;
    }
    function i(_, B, O) {
      if (_.index = O, !e)
        return _.flags |= Cv, B;
      var ne = _.alternate;
      if (ne !== null) {
        var be = ne.index;
        return be < B ? (_.flags |= Wt, B) : be;
      } else
        return _.flags |= Wt, B;
    }
    function l(_) {
      return e && _.alternate === null && (_.flags |= Wt), _;
    }
    function u(_, B, O, ne) {
      if (B === null || B.tag !== ee) {
        var be = Dh(O, _.mode, ne);
        return be.return = _, be;
      } else {
        var he = r(B, O);
        return he.return = _, he;
      }
    }
    function c(_, B, O, ne) {
      var be = O.type;
      if (be === qa)
        return v(_, B, O.props.children, ne, O.key);
      if (B !== null && (B.elementType === be || // Keep this check inline so it only runs on the false path:
      TN(B, O) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof be == "object" && be !== null && be.$$typeof === je && Eb(be) === B.type)) {
        var he = r(B, O.props);
        return he.ref = ys(_, B, O), he.return = _, he._debugSource = O._source, he._debugOwner = O._owner, he;
      }
      var Me = Rh(O, _.mode, ne);
      return Me.ref = ys(_, B, O), Me.return = _, Me;
    }
    function h(_, B, O, ne) {
      if (B === null || B.tag !== T || B.stateNode.containerInfo !== O.containerInfo || B.stateNode.implementation !== O.implementation) {
        var be = Ch(O, _.mode, ne);
        return be.return = _, be;
      } else {
        var he = r(B, O.children || []);
        return he.return = _, he;
      }
    }
    function v(_, B, O, ne, be) {
      if (B === null || B.tag !== me) {
        var he = ui(O, _.mode, ne, be);
        return he.return = _, he;
      } else {
        var Me = r(B, O);
        return Me.return = _, Me;
      }
    }
    function C(_, B, O) {
      if (typeof B == "string" && B !== "" || typeof B == "number") {
        var ne = Dh("" + B, _.mode, O);
        return ne.return = _, ne;
      }
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case ma: {
            var be = Rh(B, _.mode, O);
            return be.ref = ys(_, null, B), be.return = _, be;
          }
          case aa: {
            var he = Ch(B, _.mode, O);
            return he.return = _, he;
          }
          case je: {
            var Me = B._payload, Fe = B._init;
            return C(_, Fe(Me), O);
          }
        }
        if (Ge(B) || Ta(B)) {
          var vt = ui(B, _.mode, O, null);
          return vt.return = _, vt;
        }
        pc(_, B);
      }
      return typeof B == "function" && mc(_), null;
    }
    function D(_, B, O, ne) {
      var be = B !== null ? B.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number")
        return be !== null ? null : u(_, B, "" + O, ne);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ma:
            return O.key === be ? c(_, B, O, ne) : null;
          case aa:
            return O.key === be ? h(_, B, O, ne) : null;
          case je: {
            var he = O._payload, Me = O._init;
            return D(_, B, Me(he), ne);
          }
        }
        if (Ge(O) || Ta(O))
          return be !== null ? null : v(_, B, O, ne, null);
        pc(_, O);
      }
      return typeof O == "function" && mc(_), null;
    }
    function V(_, B, O, ne, be) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number") {
        var he = _.get(O) || null;
        return u(B, he, "" + ne, be);
      }
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case ma: {
            var Me = _.get(ne.key === null ? O : ne.key) || null;
            return c(B, Me, ne, be);
          }
          case aa: {
            var Fe = _.get(ne.key === null ? O : ne.key) || null;
            return h(B, Fe, ne, be);
          }
          case je:
            var vt = ne._payload, nt = ne._init;
            return V(_, B, O, nt(vt), be);
        }
        if (Ge(ne) || Ta(ne)) {
          var It = _.get(O) || null;
          return v(B, It, ne, be, null);
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
          case ma:
          case aa:
            xb(_, O);
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
            var be = _._payload, he = _._init;
            L(he(be), B, O);
            break;
        }
      }
      return B;
    }
    function H(_, B, O, ne) {
      for (var be = null, he = 0; he < O.length; he++) {
        var Me = O[he];
        be = L(Me, be, _);
      }
      for (var Fe = null, vt = null, nt = B, It = 0, at = 0, Ht = null; nt !== null && at < O.length; at++) {
        nt.index > at ? (Ht = nt, nt = null) : Ht = nt.sibling;
        var An = D(_, nt, O[at], ne);
        if (An === null) {
          nt === null && (nt = Ht);
          break;
        }
        e && nt && An.alternate === null && t(_, nt), It = i(An, It, at), vt === null ? Fe = An : vt.sibling = An, vt = An, nt = Ht;
      }
      if (at === O.length) {
        if (n(_, nt), Nn()) {
          var jn = at;
          Fi(_, jn);
        }
        return Fe;
      }
      if (nt === null) {
        for (; at < O.length; at++) {
          var da = C(_, O[at], ne);
          da !== null && (It = i(da, It, at), vt === null ? Fe = da : vt.sibling = da, vt = da);
        }
        if (Nn()) {
          var In = at;
          Fi(_, In);
        }
        return Fe;
      }
      for (var Yn = a(_, nt); at < O.length; at++) {
        var Ln = V(Yn, _, at, O[at], ne);
        Ln !== null && (e && Ln.alternate !== null && Yn.delete(Ln.key === null ? at : Ln.key), It = i(Ln, It, at), vt === null ? Fe = Ln : vt.sibling = Ln, vt = Ln);
      }
      if (e && Yn.forEach(function(to) {
        return t(_, to);
      }), Nn()) {
        var Vr = at;
        Fi(_, Vr);
      }
      return Fe;
    }
    function pe(_, B, O, ne) {
      var be = Ta(O);
      if (typeof be != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        O[Symbol.toStringTag] === "Generator" && (jp || d("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), jp = !0), O.entries === be && (Cp || d("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Cp = !0);
        var he = be.call(O);
        if (he)
          for (var Me = null, Fe = he.next(); !Fe.done; Fe = he.next()) {
            var vt = Fe.value;
            Me = L(vt, Me, _);
          }
      }
      var nt = be.call(O);
      if (nt == null)
        throw new Error("An iterable object provided no iterator.");
      for (var It = null, at = null, Ht = B, An = 0, jn = 0, da = null, In = nt.next(); Ht !== null && !In.done; jn++, In = nt.next()) {
        Ht.index > jn ? (da = Ht, Ht = null) : da = Ht.sibling;
        var Yn = D(_, Ht, In.value, ne);
        if (Yn === null) {
          Ht === null && (Ht = da);
          break;
        }
        e && Ht && Yn.alternate === null && t(_, Ht), An = i(Yn, An, jn), at === null ? It = Yn : at.sibling = Yn, at = Yn, Ht = da;
      }
      if (In.done) {
        if (n(_, Ht), Nn()) {
          var Ln = jn;
          Fi(_, Ln);
        }
        return It;
      }
      if (Ht === null) {
        for (; !In.done; jn++, In = nt.next()) {
          var Vr = C(_, In.value, ne);
          Vr !== null && (An = i(Vr, An, jn), at === null ? It = Vr : at.sibling = Vr, at = Vr);
        }
        if (Nn()) {
          var to = jn;
          Fi(_, to);
        }
        return It;
      }
      for (var Xs = a(_, Ht); !In.done; jn++, In = nt.next()) {
        var or = V(Xs, _, jn, In.value, ne);
        or !== null && (e && or.alternate !== null && Xs.delete(or.key === null ? jn : or.key), An = i(or, An, jn), at === null ? It = or : at.sibling = or, at = or);
      }
      if (e && Xs.forEach(function(aw) {
        return t(_, aw);
      }), Nn()) {
        var nw = jn;
        Fi(_, nw);
      }
      return It;
    }
    function Ce(_, B, O, ne) {
      if (B !== null && B.tag === ee) {
        n(_, B.sibling);
        var be = r(B, O);
        return be.return = _, be;
      }
      n(_, B);
      var he = Dh(O, _.mode, ne);
      return he.return = _, he;
    }
    function Re(_, B, O, ne) {
      for (var be = O.key, he = B; he !== null; ) {
        if (he.key === be) {
          var Me = O.type;
          if (Me === qa) {
            if (he.tag === me) {
              n(_, he.sibling);
              var Fe = r(he, O.props.children);
              return Fe.return = _, Fe._debugSource = O._source, Fe._debugOwner = O._owner, Fe;
            }
          } else if (he.elementType === Me || // Keep this check inline so it only runs on the false path:
          TN(he, O) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Me == "object" && Me !== null && Me.$$typeof === je && Eb(Me) === he.type) {
            n(_, he.sibling);
            var vt = r(he, O.props);
            return vt.ref = ys(_, he, O), vt.return = _, vt._debugSource = O._source, vt._debugOwner = O._owner, vt;
          }
          n(_, he);
          break;
        } else
          t(_, he);
        he = he.sibling;
      }
      if (O.type === qa) {
        var nt = ui(O.props.children, _.mode, ne, O.key);
        return nt.return = _, nt;
      } else {
        var It = Rh(O, _.mode, ne);
        return It.ref = ys(_, B, O), It.return = _, It;
      }
    }
    function Ze(_, B, O, ne) {
      for (var be = O.key, he = B; he !== null; ) {
        if (he.key === be)
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
      var Fe = Ch(O, _.mode, ne);
      return Fe.return = _, Fe;
    }
    function We(_, B, O, ne) {
      var be = typeof O == "object" && O !== null && O.type === qa && O.key === null;
      if (be && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ma:
            return l(Re(_, B, O, ne));
          case aa:
            return l(Ze(_, B, O, ne));
          case je:
            var he = O._payload, Me = O._init;
            return We(_, B, Me(he), ne);
        }
        if (Ge(O))
          return H(_, B, O, ne);
        if (Ta(O))
          return pe(_, B, O, ne);
        pc(_, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" ? l(Ce(_, B, "" + O, ne)) : (typeof O == "function" && mc(_), n(_, B));
    }
    return We;
  }
  var Ul = Sb(!0), Rb = Sb(!1);
  function MC(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Xi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Xi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function VC(e, t) {
    for (var n = e.child; n !== null; )
      NT(n, t), n = n.sibling;
  }
  var Op = Kr(null), Mp;
  Mp = {};
  var hc = null, Fl = null, Vp = null, vc = !1;
  function gc() {
    hc = null, Fl = null, Vp = null, vc = !1;
  }
  function Db() {
    vc = !0;
  }
  function Cb() {
    vc = !1;
  }
  function jb(e, t, n) {
    Mn(Op, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Mp && d("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Mp;
  }
  function Ap(e, t) {
    var n = Op.current;
    On(Op, t), e._currentValue = n;
  }
  function Lp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = Ie(r.childLanes, t)) : (a.childLanes = Ie(a.childLanes, t), r !== null && (r.childLanes = Ie(r.childLanes, t))), a === n)
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
              var u = Uo(n), c = jr(Dt, u);
              c.tag = yc;
              var h = a.updateQueue;
              if (h !== null) {
                var v = h.shared, C = v.pending;
                C === null ? c.next = c : (c.next = C.next, C.next = c), v.pending = c;
              }
            }
            a.lanes = Ie(a.lanes, n);
            var D = a.alternate;
            D !== null && (D.lanes = Ie(D.lanes, n)), Lp(a.return, n, e), i.lanes = Ie(i.lanes, n);
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
        V.lanes = Ie(V.lanes, n);
        var L = V.alternate;
        L !== null && (L.lanes = Ie(L.lanes, n)), Lp(V, n, e), r = a.sibling;
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
    hc = e, Fl = null, Vp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (ia(n.lanes, t) && As(), n.firstContext = null);
    }
  }
  function Kt(e) {
    vc && d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Vp !== e) {
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
  var $i = null;
  function kp(e) {
    $i === null ? $i = [e] : $i.push(e);
  }
  function kC() {
    if ($i !== null) {
      for (var e = 0; e < $i.length; e++) {
        var t = $i[e], n = t.interleaved;
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
      $i = null;
    }
  }
  function Tb(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, kp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function UC(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, kp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function FC(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, kp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function Qn(e, t) {
    return bc(e, t);
  }
  var zC = bc;
  function bc(e, t) {
    e.lanes = Ie(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ie(n.lanes, t)), n === null && (e.flags & (Wt | gr)) !== Oe && RN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ie(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ie(n.childLanes, t) : (r.flags & (Wt | gr)) !== Oe && RN(e), a = r, r = r.return;
    if (a.tag === x) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var wb = 0, _b = 1, yc = 2, Up = 3, Nc = !1, Fp, xc;
  Fp = !1, xc = null;
  function zp(e) {
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
  function Ob(e, t) {
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
  function jr(e, t) {
    var n = {
      eventTime: e,
      lane: t,
      tag: wb,
      payload: null,
      callback: null,
      next: null
    };
    return n;
  }
  function Zr(e, t, n) {
    var a = e.updateQueue;
    if (a === null)
      return null;
    var r = a.shared;
    if (xc === r && !Fp && (d("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Fp = !0), U1()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, zC(e, n);
    } else
      return FC(e, r, t, n);
  }
  function Ec(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Iv(n)) {
        var i = r.lanes;
        i = qv(i, e.pendingLanes);
        var l = Ie(i, n);
        r.lanes = l, Of(e, l);
      }
    }
  }
  function Pp(e, t) {
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
      case _b: {
        var l = n.payload;
        if (typeof l == "function") {
          Db();
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
            Cb();
          }
          return u;
        }
        return l;
      }
      case Up:
        e.flags = e.flags & ~Pn | lt;
      case wb: {
        var c = n.payload, h;
        if (typeof c == "function") {
          Db(), h = c.call(i, a, r);
          {
            if (e.mode & Pt) {
              hn(!0);
              try {
                c.call(i, a, r);
              } finally {
                hn(!1);
              }
            }
            Cb();
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
      var V = r.baseState, L = X, H = null, pe = null, Ce = null, Re = i;
      do {
        var Ze = Re.lane, We = Re.eventTime;
        if (El(a, Ze)) {
          if (Ce !== null) {
            var B = {
              eventTime: We,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: vn,
              tag: Re.tag,
              payload: Re.payload,
              callback: Re.callback,
              next: null
            };
            Ce = Ce.next = B;
          }
          V = PC(e, r, Re, V, t, n);
          var O = Re.callback;
          if (O !== null && // If the update was already committed, we should not queue its
          // callback again.
          Re.lane !== vn) {
            e.flags |= Dv;
            var ne = r.effects;
            ne === null ? r.effects = [Re] : ne.push(Re);
          }
        } else {
          var _ = {
            eventTime: We,
            lane: Ze,
            tag: Re.tag,
            payload: Re.payload,
            callback: Re.callback,
            next: null
          };
          Ce === null ? (pe = Ce = _, H = V) : Ce = Ce.next = _, L = Ie(L, Ze);
        }
        if (Re = Re.next, Re === null) {
          if (u = r.shared.pending, u === null)
            break;
          var be = u, he = be.next;
          be.next = null, Re = he, r.lastBaseUpdate = be, r.shared.pending = null;
        }
      } while (!0);
      Ce === null && (H = V), r.baseState = H, r.firstBaseUpdate = pe, r.lastBaseUpdate = Ce;
      var Me = r.shared.interleaved;
      if (Me !== null) {
        var Fe = Me;
        do
          L = Ie(L, Fe.lane), Fe = Fe.next;
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
  function Mb() {
    Nc = !1;
  }
  function Rc() {
    return Nc;
  }
  function Vb(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, HC(l, n));
      }
  }
  var Ns = {}, ei = Kr(Ns), xs = Kr(Ns), Dc = Kr(Ns);
  function Cc(e) {
    if (e === Ns)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Ab() {
    var e = Cc(Dc.current);
    return e;
  }
  function Hp(e, t) {
    Mn(Dc, t, e), Mn(xs, e, e), Mn(ei, Ns, e);
    var n = rD(t);
    On(ei, e), Mn(ei, n, e);
  }
  function Pl(e) {
    On(ei, e), On(xs, e), On(Dc, e);
  }
  function Bp() {
    var e = Cc(ei.current);
    return e;
  }
  function Lb(e) {
    Cc(Dc.current);
    var t = Cc(ei.current), n = iD(t, e.type);
    t !== n && (Mn(xs, e, e), Mn(ei, n, e));
  }
  function $p(e) {
    xs.current === e && (On(ei, e), On(xs, e));
  }
  var BC = 0, kb = 1, Ub = 1, Es = 2, La = Kr(BC);
  function Ip(e, t) {
    return (e & t) !== 0;
  }
  function Hl(e) {
    return e & kb;
  }
  function Yp(e, t) {
    return e & kb | t;
  }
  function $C(e, t) {
    return e | t;
  }
  function ti(e, t) {
    Mn(La, t, e);
  }
  function Bl(e) {
    On(La, e);
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
          if (a === null || eb(a) || up(a))
            return t;
        }
      } else if (t.tag === le && // revealOrder undefined can't be trusted because it don't
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
  var Xn = (
    /*   */
    0
  ), nn = (
    /* */
    1
  ), er = (
    /*  */
    2
  ), an = (
    /*    */
    4
  ), xn = (
    /*   */
    8
  ), qp = [];
  function Gp() {
    for (var e = 0; e < qp.length; e++) {
      var t = qp[e];
      t._workInProgressVersionPrimary = null;
    }
    qp.length = 0;
  }
  function YC(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ge = m.ReactCurrentDispatcher, Ss = m.ReactCurrentBatchConfig, Wp, $l;
  Wp = /* @__PURE__ */ new Set();
  var Ii = X, ht = null, rn = null, ln = null, Tc = !1, Rs = !1, Ds = 0, qC = 0, GC = 25, I = null, ya = null, ni = -1, Kp = !1;
  function st() {
    {
      var e = I;
      ya === null ? ya = [e] : ya.push(e);
    }
  }
  function ce() {
    {
      var e = I;
      ya !== null && (ni++, ya[ni] !== e && WC(e));
    }
  }
  function Il(e) {
    e != null && !Ge(e) && d("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", I, typeof e);
  }
  function WC(e) {
    {
      var t = ze(ht);
      if (!Wp.has(t) && (Wp.add(t), ya !== null)) {
        for (var n = "", a = 30, r = 0; r <= ni; r++) {
          for (var i = ya[r], l = r === ni ? e : i, u = r + 1 + ". " + i; u.length < a; )
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
  function Vn() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function Qp(e, t) {
    if (Kp)
      return !1;
    if (t === null)
      return d("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", I), !1;
    e.length !== t.length && d(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, I, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!sa(e[n], t[n]))
        return !1;
    return !0;
  }
  function Yl(e, t, n, a, r, i) {
    Ii = i, ht = t, ya = e !== null ? e._debugHookTypes : null, ni = -1, Kp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = X, e !== null && e.memoizedState !== null ? ge.current = iy : ya !== null ? ge.current = ry : ge.current = ay;
    var l = n(a, r);
    if (Rs) {
      var u = 0;
      do {
        if (Rs = !1, Ds = 0, u >= GC)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, Kp = !1, rn = null, ln = null, t.updateQueue = null, ni = -1, ge.current = ly, l = n(a, r);
      } while (Rs);
    }
    ge.current = Hc, t._debugHookTypes = ya;
    var c = rn !== null && rn.next !== null;
    if (Ii = X, ht = null, rn = null, ln = null, I = null, ya = null, ni = -1, e !== null && (e.flags & br) !== (t.flags & br) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Xe) !== Te && d("Internal React error: Expected static flag was missing. Please notify the React team."), Tc = !1, c)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function ql() {
    var e = Ds !== 0;
    return Ds = 0, e;
  }
  function Fb(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Qa) !== Te ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function zb() {
    if (ge.current = Hc, Tc) {
      for (var e = ht.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    Ii = X, ht = null, rn = null, ln = null, ya = null, ni = -1, I = null, Jb = !1, Rs = !1, Ds = 0;
  }
  function tr() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ln === null ? ht.memoizedState = ln = e : ln = ln.next = e, ln;
  }
  function Na() {
    var e;
    if (rn === null) {
      var t = ht.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = rn.next;
    var n;
    if (ln === null ? n = ht.memoizedState : n = ln.next, n !== null)
      ln = n, n = ln.next, rn = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      rn = e;
      var a = {
        memoizedState: rn.memoizedState,
        baseState: rn.baseState,
        baseQueue: rn.baseQueue,
        queue: rn.queue,
        next: null
      };
      ln === null ? ht.memoizedState = ln = a : ln = ln.next = a;
    }
    return ln;
  }
  function Pb() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Xp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Jp(e, t, n) {
    var a = tr(), r;
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
    var l = i.dispatch = JC.bind(null, ht, i);
    return [a.memoizedState, l];
  }
  function Zp(e, t, n) {
    var a = Na(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = rn, l = i.baseQueue, u = r.pending;
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
        var pe = H.lane;
        if (El(Ii, pe)) {
          if (L !== null) {
            var Re = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: vn,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            };
            L = L.next = Re;
          }
          if (H.hasEagerState)
            C = H.eagerState;
          else {
            var Ze = H.action;
            C = e(C, Ze);
          }
        } else {
          var Ce = {
            lane: pe,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          L === null ? (V = L = Ce, D = C) : L = L.next = Ce, ht.lanes = Ie(ht.lanes, pe), qs(pe);
        }
        H = H.next;
      } while (H !== null && H !== v);
      L === null ? D = C : L.next = V, sa(C, a.memoizedState) || As(), a.memoizedState = C, a.baseState = D, a.baseQueue = L, r.lastRenderedState = C;
    }
    var We = r.interleaved;
    if (We !== null) {
      var _ = We;
      do {
        var B = _.lane;
        ht.lanes = Ie(ht.lanes, B), qs(B), _ = _.next;
      } while (_ !== We);
    } else l === null && (r.lanes = X);
    var O = r.dispatch;
    return [a.memoizedState, O];
  }
  function em(e, t, n) {
    var a = Na(), r = a.queue;
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
      sa(u, a.memoizedState) || As(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function aO(e, t, n) {
  }
  function rO(e, t, n) {
  }
  function tm(e, t, n) {
    var a = ht, r = tr(), i, l = Nn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), $l || i !== n() && (d("The result of getServerSnapshot should be cached to avoid an infinite loop"), $l = !0);
    } else {
      if (i = t(), !$l) {
        var u = t();
        sa(i, u) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), $l = !0);
      }
      var c = ld();
      if (c === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(c, Ii) || Hb(a, t, i);
    }
    r.memoizedState = i;
    var h = {
      value: i,
      getSnapshot: t
    };
    return r.queue = h, Vc($b.bind(null, a, h, e), [e]), a.flags |= Pr, Cs(nn | xn, Bb.bind(null, a, h, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = ht, r = Na(), i = t();
    if (!$l) {
      var l = t();
      sa(i, l) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), $l = !0);
    }
    var u = r.memoizedState, c = !sa(u, i);
    c && (r.memoizedState = i, As());
    var h = r.queue;
    if (Ts($b.bind(null, a, h, e), [e]), h.getSnapshot !== t || c || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    ln !== null && ln.memoizedState.tag & nn) {
      a.flags |= Pr, Cs(nn | xn, Bb.bind(null, a, h, i, t), void 0, null);
      var v = ld();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(v, Ii) || Hb(a, t, i);
    }
    return i;
  }
  function Hb(e, t, n) {
    e.flags |= Qd;
    var a = {
      getSnapshot: t,
      value: n
    }, r = ht.updateQueue;
    if (r === null)
      r = Pb(), ht.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function Bb(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Ib(t) && Yb(e);
  }
  function $b(e, t, n) {
    var a = function() {
      Ib(t) && Yb(e);
    };
    return n(a);
  }
  function Ib(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !sa(n, a);
    } catch {
      return !0;
    }
  }
  function Yb(e) {
    var t = Qn(e, Le);
    t !== null && cn(t, e, Le, Dt);
  }
  function _c(e) {
    var t = tr();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: X,
      dispatch: null,
      lastRenderedReducer: Xp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = ZC.bind(null, ht, n);
    return [t.memoizedState, a];
  }
  function nm(e) {
    return Zp(Xp);
  }
  function am(e) {
    return em(Xp);
  }
  function Cs(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = ht.updateQueue;
    if (i === null)
      i = Pb(), ht.updateQueue = i, i.lastEffect = r.next = r;
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
  function rm(e) {
    var t = tr();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Oc(e) {
    var t = Na();
    return t.memoizedState;
  }
  function js(e, t, n, a) {
    var r = tr(), i = a === void 0 ? null : a;
    ht.flags |= e, r.memoizedState = Cs(nn | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = Na(), i = a === void 0 ? null : a, l = void 0;
    if (rn !== null) {
      var u = rn.memoizedState;
      if (l = u.destroy, i !== null) {
        var c = u.deps;
        if (Qp(i, c)) {
          r.memoizedState = Cs(t, n, l, i);
          return;
        }
      }
    }
    ht.flags |= e, r.memoizedState = Cs(nn | t, n, l, i);
  }
  function Vc(e, t) {
    return (ht.mode & Qa) !== Te ? js(ef | Pr | Zd, xn, e, t) : js(Pr | Zd, xn, e, t);
  }
  function Ts(e, t) {
    return Mc(Pr, xn, e, t);
  }
  function im(e, t) {
    return js(it, er, e, t);
  }
  function Ac(e, t) {
    return Mc(it, er, e, t);
  }
  function lm(e, t) {
    var n = it;
    return n |= ji, (ht.mode & Qa) !== Te && (n |= Hr), js(n, an, e, t);
  }
  function Lc(e, t) {
    return Mc(it, an, e, t);
  }
  function qb(e, t) {
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
  function om(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = it;
    return r |= ji, (ht.mode & Qa) !== Te && (r |= Hr), js(r, an, qb.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(it, an, qb.bind(null, t, e), a);
  }
  function KC(e, t) {
  }
  var Uc = KC;
  function sm(e, t) {
    var n = tr(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fc(e, t) {
    var n = Na(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Qp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function um(e, t) {
    var n = tr(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function zc(e, t) {
    var n = Na(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Qp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function cm(e) {
    var t = tr();
    return t.memoizedState = e, e;
  }
  function Gb(e) {
    var t = Na(), n = rn, a = n.memoizedState;
    return Kb(t, a, e);
  }
  function Wb(e) {
    var t = Na();
    if (rn === null)
      return t.memoizedState = e, e;
    var n = rn.memoizedState;
    return Kb(t, n, e);
  }
  function Kb(e, t, n) {
    var a = !AS(Ii);
    if (a) {
      if (!sa(n, t)) {
        var r = Yv();
        ht.lanes = Ie(ht.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, As()), e.memoizedState = n, n;
  }
  function QC(e, t, n) {
    var a = Oa();
    gn($S(a, Nr)), e(!0);
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
  function dm() {
    var e = _c(!1), t = e[0], n = e[1], a = QC.bind(null, n), r = tr();
    return r.memoizedState = a, [t, a];
  }
  function Qb() {
    var e = nm(), t = e[0], n = Na(), a = n.memoizedState;
    return [t, a];
  }
  function Xb() {
    var e = am(), t = e[0], n = Na(), a = n.memoizedState;
    return [t, a];
  }
  var Jb = !1;
  function XC() {
    return Jb;
  }
  function fm() {
    var e = tr(), t = ld(), n = t.identifierPrefix, a;
    if (Nn()) {
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
    var e = Na(), t = e.memoizedState;
    return t;
  }
  function JC(e, t, n) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = oi(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Zb(e))
      ey(t, r);
    else {
      var i = Tb(e, t, r, a);
      if (i !== null) {
        var l = $n();
        cn(i, e, a, l), ty(i, t, a);
      }
    }
    ny(e, a);
  }
  function ZC(e, t, n) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = oi(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Zb(e))
      ey(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === X && (i === null || i.lanes === X)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = ge.current, ge.current = ka;
          try {
            var c = t.lastRenderedState, h = l(c, n);
            if (r.hasEagerState = !0, r.eagerState = h, sa(h, c)) {
              UC(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ge.current = u;
          }
        }
      }
      var v = Tb(e, t, r, a);
      if (v !== null) {
        var C = $n();
        cn(v, e, a, C), ty(v, t, a);
      }
    }
    ny(e, a);
  }
  function Zb(e) {
    var t = e.alternate;
    return e === ht || t !== null && t === ht;
  }
  function ey(e, t) {
    Rs = Tc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function ty(e, t, n) {
    if (Iv(n)) {
      var a = t.lanes;
      a = qv(a, e.pendingLanes);
      var r = Ie(a, n);
      t.lanes = r, Of(e, r);
    }
  }
  function ny(e, t, n) {
    lf(e, t);
  }
  var Hc = {
    readContext: Kt,
    useCallback: Vn,
    useContext: Vn,
    useEffect: Vn,
    useImperativeHandle: Vn,
    useInsertionEffect: Vn,
    useLayoutEffect: Vn,
    useMemo: Vn,
    useReducer: Vn,
    useRef: Vn,
    useState: Vn,
    useDebugValue: Vn,
    useDeferredValue: Vn,
    useTransition: Vn,
    useMutableSource: Vn,
    useSyncExternalStore: Vn,
    useId: Vn,
    unstable_isNewReconciler: de
  }, ay = null, ry = null, iy = null, ly = null, nr = null, ka = null, Bc = null;
  {
    var pm = function() {
      d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, ke = function() {
      d("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    ay = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", st(), Il(t), sm(e, t);
      },
      useContext: function(e) {
        return I = "useContext", st(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", st(), Il(t), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", st(), Il(n), om(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", st(), Il(t), im(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", st(), Il(t), lm(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", st(), Il(t);
        var n = ge.current;
        ge.current = nr;
        try {
          return um(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", st();
        var a = ge.current;
        ge.current = nr;
        try {
          return Jp(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", st(), rm(e);
      },
      useState: function(e) {
        I = "useState", st();
        var t = ge.current;
        ge.current = nr;
        try {
          return _c(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", st(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", st(), cm(e);
      },
      useTransition: function() {
        return I = "useTransition", st(), dm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", st(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", st(), tm(e, t, n);
      },
      useId: function() {
        return I = "useId", st(), fm();
      },
      unstable_isNewReconciler: de
    }, ry = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ce(), sm(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ce(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ce(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ce(), om(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ce(), im(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ce(), lm(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ce();
        var n = ge.current;
        ge.current = nr;
        try {
          return um(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ce();
        var a = ge.current;
        ge.current = nr;
        try {
          return Jp(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ce(), rm(e);
      },
      useState: function(e) {
        I = "useState", ce();
        var t = ge.current;
        ge.current = nr;
        try {
          return _c(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ce(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ce(), cm(e);
      },
      useTransition: function() {
        return I = "useTransition", ce(), dm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ce(), tm(e, t, n);
      },
      useId: function() {
        return I = "useId", ce(), fm();
      },
      unstable_isNewReconciler: de
    }, iy = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ce(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ce(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ce();
        var n = ge.current;
        ge.current = ka;
        try {
          return zc(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ce();
        var a = ge.current;
        ge.current = ka;
        try {
          return Zp(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ce(), Oc();
      },
      useState: function(e) {
        I = "useState", ce();
        var t = ge.current;
        ge.current = ka;
        try {
          return nm(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ce(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ce(), Gb(e);
      },
      useTransition: function() {
        return I = "useTransition", ce(), Qb();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ce(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ce(), Pc();
      },
      unstable_isNewReconciler: de
    }, ly = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ce(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ce(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ce();
        var n = ge.current;
        ge.current = Bc;
        try {
          return zc(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ce();
        var a = ge.current;
        ge.current = Bc;
        try {
          return em(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ce(), Oc();
      },
      useState: function(e) {
        I = "useState", ce();
        var t = ge.current;
        ge.current = Bc;
        try {
          return am(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ce(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ce(), Wb(e);
      },
      useTransition: function() {
        return I = "useTransition", ce(), Xb();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ce(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ce(), Pc();
      },
      unstable_isNewReconciler: de
    }, nr = {
      readContext: function(e) {
        return pm(), Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ke(), st(), sm(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ke(), st(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ke(), st(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ke(), st(), om(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ke(), st(), im(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ke(), st(), lm(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ke(), st();
        var n = ge.current;
        ge.current = nr;
        try {
          return um(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ke(), st();
        var a = ge.current;
        ge.current = nr;
        try {
          return Jp(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ke(), st(), rm(e);
      },
      useState: function(e) {
        I = "useState", ke(), st();
        var t = ge.current;
        ge.current = nr;
        try {
          return _c(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ke(), st(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ke(), st(), cm(e);
      },
      useTransition: function() {
        return I = "useTransition", ke(), st(), dm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ke(), st(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ke(), st(), tm(e, t, n);
      },
      useId: function() {
        return I = "useId", ke(), st(), fm();
      },
      unstable_isNewReconciler: de
    }, ka = {
      readContext: function(e) {
        return pm(), Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ke(), ce(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ke(), ce(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ke(), ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ke(), ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ke(), ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ke(), ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ke(), ce();
        var n = ge.current;
        ge.current = ka;
        try {
          return zc(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ke(), ce();
        var a = ge.current;
        ge.current = ka;
        try {
          return Zp(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ke(), ce(), Oc();
      },
      useState: function(e) {
        I = "useState", ke(), ce();
        var t = ge.current;
        ge.current = ka;
        try {
          return nm(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ke(), ce(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ke(), ce(), Gb(e);
      },
      useTransition: function() {
        return I = "useTransition", ke(), ce(), Qb();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ke(), ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ke(), ce(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ke(), ce(), Pc();
      },
      unstable_isNewReconciler: de
    }, Bc = {
      readContext: function(e) {
        return pm(), Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ke(), ce(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ke(), ce(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ke(), ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ke(), ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ke(), ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ke(), ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ke(), ce();
        var n = ge.current;
        ge.current = ka;
        try {
          return zc(e, t);
        } finally {
          ge.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ke(), ce();
        var a = ge.current;
        ge.current = ka;
        try {
          return em(e, t, n);
        } finally {
          ge.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ke(), ce(), Oc();
      },
      useState: function(e) {
        I = "useState", ke(), ce();
        var t = ge.current;
        ge.current = ka;
        try {
          return am(e);
        } finally {
          ge.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ke(), ce(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ke(), ce(), Wb(e);
      },
      useTransition: function() {
        return I = "useTransition", ke(), ce(), Xb();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ke(), ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ke(), ce(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ke(), ce(), Pc();
      },
      unstable_isNewReconciler: de
    };
  }
  var ai = f.unstable_now, oy = 0, $c = -1, ws = -1, Ic = -1, mm = !1, Yc = !1;
  function sy() {
    return mm;
  }
  function ej() {
    Yc = !0;
  }
  function tj() {
    mm = !1, Yc = !1;
  }
  function nj() {
    mm = Yc, Yc = !1;
  }
  function uy() {
    return oy;
  }
  function cy() {
    oy = ai();
  }
  function hm(e) {
    ws = ai(), e.actualStartTime < 0 && (e.actualStartTime = ai());
  }
  function dy(e) {
    ws = -1;
  }
  function qc(e, t) {
    if (ws >= 0) {
      var n = ai() - ws;
      e.actualDuration += n, t && (e.selfBaseDuration = n), ws = -1;
    }
  }
  function ar(e) {
    if ($c >= 0) {
      var t = ai() - $c;
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
  function vm(e) {
    if (Ic >= 0) {
      var t = ai() - Ic;
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
  function rr() {
    $c = ai();
  }
  function gm() {
    Ic = ai();
  }
  function bm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function Ua(e, t) {
    if (e && e.defaultProps) {
      var n = Ye({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var ym = {}, Nm, xm, Em, Sm, Rm, fy, Gc, Dm, Cm, jm, _s;
  {
    Nm = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), Dm = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), Cm = /* @__PURE__ */ new Set(), jm = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var py = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        py.has(n) || (py.add(n), d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, fy = function(e, t) {
      if (t === void 0) {
        var n = rt(e) || "Component";
        Rm.has(n) || (Rm.add(n), d("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(ym, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(ym);
  }
  function Tm(e, t, n, a) {
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
      fy(t, i);
    }
    var l = i == null ? r : Ye({}, r, i);
    if (e.memoizedState = l, e.lanes === X) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var wm = {
    isMounted: GE,
    enqueueSetState: function(e, t, n) {
      var a = pl(e), r = $n(), i = oi(a), l = jr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var u = Zr(a, l, i);
      u !== null && (cn(u, a, i, r), Ec(u, a, i)), lf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = pl(e), r = $n(), i = oi(a), l = jr(r, i);
      l.tag = _b, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var u = Zr(a, l, i);
      u !== null && (cn(u, a, i, r), Ec(u, a, i)), lf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = pl(e), a = $n(), r = oi(n), i = jr(a, r);
      i.tag = yc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Zr(n, i, r);
      l !== null && (cn(l, n, r, a), Ec(l, n, r)), RS(n, r);
    }
  };
  function my(e, t, n, a, r, i, l) {
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
        c === void 0 && d("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", rt(t) || "Component");
      }
      return c;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function aj(e, t, n) {
    var a = e.stateNode;
    {
      var r = rt(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? d("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : d("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && d("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && d("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && d("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && d("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Pt) === Te && (_s.add(t), d(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Pt) === Te && (_s.add(t), d(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && d("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Cm.has(t) && (Cm.add(t), d("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && d("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && d("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", rt(t) || "A pure component"), typeof a.componentDidUnmount == "function" && d("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && d("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && d("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && d("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && d("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && d("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !Em.has(t) && (Em.add(t), d("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", rt(t))), typeof a.getDerivedStateFromProps == "function" && d("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && d("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && d("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || Ge(u)) && d("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && d("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function hy(e, t) {
    t.updater = wm, e.stateNode = t, $E(t, e), t._reactInternalInstance = ym;
  }
  function vy(e, t, n) {
    var a = !1, r = ua, i = ua, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === fe && l._context === void 0
      );
      if (!u && !jm.has(t)) {
        jm.add(t);
        var c = "";
        l === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? c = " However, it is set to a " + typeof l + "." : l.$$typeof === Z ? c = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", d("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", rt(t) || "Component", c);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Kt(l);
    else {
      r = Ml(e, t, !0);
      var h = t.contextTypes;
      a = h != null, i = a ? Vl(e, r) : ua;
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
    hy(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var D = rt(t) || "Component";
        xm.has(D) || (xm.add(D), d("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, v.state === null ? "null" : "undefined", D));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var V = null, L = null, H = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? V = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (V = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? H = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (H = "UNSAFE_componentWillUpdate"), V !== null || L !== null || H !== null) {
          var pe = rt(t) || "Component", Ce = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Sm.has(pe) || (Sm.add(pe), d(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, pe, Ce, V !== null ? `
  ` + V : "", L !== null ? `
  ` + L : "", H !== null ? `
  ` + H : ""));
        }
      }
    }
    return a && ib(e, r, i), v;
  }
  function rj(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (d("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", ze(e) || "Component"), wm.enqueueReplaceState(t, t.state, null));
  }
  function gy(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = ze(e) || "Component";
        Nm.has(i) || (Nm.add(i), d("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      wm.enqueueReplaceState(t, t.state, null);
    }
  }
  function _m(e, t, n, a) {
    aj(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, zp(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Kt(i);
    else {
      var l = Ml(e, t, !0);
      r.context = Vl(e, l);
    }
    {
      if (r.state === n) {
        var u = rt(t) || "Component";
        Dm.has(u) || (Dm.add(u), d("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & Pt && Aa.recordLegacyContextWarning(e, r), Aa.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var c = t.getDerivedStateFromProps;
    if (typeof c == "function" && (Tm(e, t, c, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (rj(e, r), Sc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var h = it;
      h |= ji, (e.mode & Qa) !== Te && (h |= Hr), e.flags |= h;
    }
  }
  function ij(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, c = ua;
    if (typeof u == "object" && u !== null)
      c = Kt(u);
    else {
      var h = Ml(e, t, !0);
      c = Vl(e, h);
    }
    var v = t.getDerivedStateFromProps, C = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== c) && gy(e, r, n, c), Mb();
    var D = e.memoizedState, V = r.state = D;
    if (Sc(e, n, r, a), V = e.memoizedState, i === n && D === V && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var L = it;
        L |= ji, (e.mode & Qa) !== Te && (L |= Hr), e.flags |= L;
      }
      return !1;
    }
    typeof v == "function" && (Tm(e, t, v, n), V = e.memoizedState);
    var H = Rc() || my(e, t, i, n, D, V, c);
    if (H) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var pe = it;
        pe |= ji, (e.mode & Qa) !== Te && (pe |= Hr), e.flags |= pe;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ce = it;
        Ce |= ji, (e.mode & Qa) !== Te && (Ce |= Hr), e.flags |= Ce;
      }
      e.memoizedProps = n, e.memoizedState = V;
    }
    return r.props = n, r.state = V, r.context = c, H;
  }
  function lj(e, t, n, a, r) {
    var i = t.stateNode;
    Ob(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : Ua(t.type, l);
    i.props = u;
    var c = t.pendingProps, h = i.context, v = n.contextType, C = ua;
    if (typeof v == "object" && v !== null)
      C = Kt(v);
    else {
      var D = Ml(t, n, !0);
      C = Vl(t, D);
    }
    var V = n.getDerivedStateFromProps, L = typeof V == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !L && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== c || h !== C) && gy(t, i, a, C), Mb();
    var H = t.memoizedState, pe = i.state = H;
    if (Sc(t, a, i, r), pe = t.memoizedState, l === c && H === pe && !rc() && !Rc() && !Ve)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= it), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= hl), !1;
    typeof V == "function" && (Tm(t, n, V, a), pe = t.memoizedState);
    var Ce = Rc() || my(t, n, u, a, H, pe, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Ve;
    return Ce ? (!L && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, pe, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, pe, C)), typeof i.componentDidUpdate == "function" && (t.flags |= it), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= hl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= it), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= hl), t.memoizedProps = a, t.memoizedState = pe), i.props = a, i.state = pe, i.context = C, Ce;
  }
  function Yi(e, t) {
    return {
      value: e,
      source: t,
      stack: yi(t),
      digest: null
    };
  }
  function Om(e, t, n) {
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
  function Mm(e, t) {
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
  function by(e, t, n) {
    var a = jr(Dt, n);
    a.tag = Up, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      eT(r), Mm(e, t);
    }, a;
  }
  function Vm(e, t, n) {
    var a = jr(Dt, n);
    a.tag = Up;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        wN(e), Mm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      wN(e), Mm(e, t), typeof r != "function" && J1(this);
      var c = t.value, h = t.stack;
      this.componentDidCatch(c, {
        componentStack: h !== null ? h : ""
      }), typeof r != "function" && (ia(e.lanes, Le) || d("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", ze(e) || "Unknown"));
    }), a;
  }
  function yy(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new sj(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = tT.bind(null, e, t, n);
      _a && Gs(e, n), t.then(i, i);
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
  function Ny(e) {
    var t = e;
    do {
      if (t.tag === te && IC(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function xy(e, t, n, a, r) {
    if ((e.mode & Xe) === Te) {
      if (e === t)
        e.flags |= Pn;
      else {
        if (e.flags |= lt, n.flags |= Xd, n.flags &= -52805, n.tag === j) {
          var i = n.alternate;
          if (i === null)
            n.tag = J;
          else {
            var l = jr(Dt, Le);
            l.tag = yc, Zr(n, l, Le);
          }
        }
        n.lanes = Ie(n.lanes, Le);
      }
      return e;
    }
    return e.flags |= Pn, e.lanes = r, e;
  }
  function dj(e, t, n, a, r) {
    if (n.flags |= Eu, _a && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      cj(n), Nn() && n.mode & Xe && fb();
      var l = Ny(t);
      if (l !== null) {
        l.flags &= ~vr, xy(l, t, n, e, r), l.mode & Xe && yy(e, i, r), uj(l, e, i);
        return;
      } else {
        if (!VS(r)) {
          yy(e, i, r), fh();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (Nn() && n.mode & Xe) {
      fb();
      var c = Ny(t);
      if (c !== null) {
        (c.flags & Pn) === Oe && (c.flags |= vr), xy(c, t, n, e, r), Dp(Yi(a, n));
        return;
      }
    }
    a = Yi(a, n), I1(a);
    var h = t;
    do {
      switch (h.tag) {
        case x: {
          var v = a;
          h.flags |= Pn;
          var C = Uo(r);
          h.lanes = Ie(h.lanes, C);
          var D = by(h, v, C);
          Pp(h, D);
          return;
        }
        case j:
          var V = a, L = h.type, H = h.stateNode;
          if ((h.flags & lt) === Oe && (typeof L.getDerivedStateFromError == "function" || H !== null && typeof H.componentDidCatch == "function" && !NN(H))) {
            h.flags |= Pn;
            var pe = Uo(r);
            h.lanes = Ie(h.lanes, pe);
            var Ce = Vm(h, V, pe);
            Pp(h, Ce);
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
  var Os = m.ReactCurrentOwner, Fa = !1, Am, Ms, Lm, km, Um, qi, Fm, Wc, Vs;
  Am = {}, Ms = {}, Lm = {}, km = {}, Um = {}, qi = !1, Fm = {}, Wc = {}, Vs = {};
  function Hn(e, t, n, a) {
    e === null ? t.child = Rb(t, null, n, a) : t.child = Ul(t, e.child, n, a);
  }
  function pj(e, t, n, a) {
    t.child = Ul(t, e.child, null, a), t.child = Ul(t, null, n, a);
  }
  function Ey(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ma(
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
      if (Os.current = t, ha(!0), c = Yl(e, t, l, a, u, r), h = ql(), t.mode & Pt) {
        hn(!0);
        try {
          c = Yl(e, t, l, a, u, r), h = ql();
        } finally {
          hn(!1);
        }
      }
      ha(!1);
    }
    return bl(), e !== null && !Fa ? (Fb(e, t, r), Tr(e, t, r)) : (Nn() && h && yp(t), t.flags |= ml, Hn(e, t, c, r), t.child);
  }
  function Sy(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (bT(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = eo(i), t.tag = U, t.type = l, Hm(t, i), Ry(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && Ma(
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
      var h = Sh(n.type, null, a, t, t.mode, r);
      return h.ref = t.ref, h.return = t, t.child = h, h;
    }
    {
      var v = n.type, C = v.propTypes;
      C && Ma(
        C,
        a,
        // Resolved props
        "prop",
        rt(v)
      );
    }
    var D = e.child, V = Gm(e, r);
    if (!V) {
      var L = D.memoizedProps, H = n.compare;
      if (H = H !== null ? H : Jo, H(L, a) && e.ref === t.ref)
        return Tr(e, t, r);
    }
    t.flags |= ml;
    var pe = Xi(D, a);
    return pe.ref = t.ref, pe.return = t, t.child = pe, pe;
  }
  function Ry(e, t, n, a, r) {
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
        h && Ma(
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
        if (Fa = !1, t.pendingProps = a = v, Gm(e, r))
          (e.flags & Xd) !== Oe && (Fa = !0);
        else return t.lanes = e.lanes, Tr(e, t, r);
    }
    return zm(e, t, n, a, r);
  }
  function Dy(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || He)
      if ((t.mode & Xe) === Te) {
        var l = {
          baseLanes: X,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, od(t, n);
      } else if (ia(n, ra)) {
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
          c = Ie(h, n);
        } else
          c = n;
        t.lanes = t.childLanes = ra;
        var v = {
          baseLanes: c,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, od(t, c), null;
      }
    else {
      var V;
      i !== null ? (V = Ie(i.baseLanes, n), t.memoizedState = null) : V = n, od(t, V);
    }
    return Hn(e, t, r, n), t.child;
  }
  function mj(e, t, n) {
    var a = t.pendingProps;
    return Hn(e, t, a, n), t.child;
  }
  function hj(e, t, n) {
    var a = t.pendingProps.children;
    return Hn(e, t, a, n), t.child;
  }
  function vj(e, t, n) {
    {
      t.flags |= it;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Hn(e, t, i, n), t.child;
  }
  function Cy(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Di, t.flags |= Jd);
  }
  function zm(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ma(
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
      if (Os.current = t, ha(!0), c = Yl(e, t, n, a, l, r), h = ql(), t.mode & Pt) {
        hn(!0);
        try {
          c = Yl(e, t, n, a, l, r), h = ql();
        } finally {
          hn(!1);
        }
      }
      ha(!1);
    }
    return bl(), e !== null && !Fa ? (Fb(e, t, r), Tr(e, t, r)) : (Nn() && h && yp(t), t.flags |= ml, Hn(e, t, c, r), t.child);
  }
  function jy(e, t, n, a, r) {
    {
      switch (VT(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), c = u.state;
          i.updater.enqueueSetState(i, c, null);
          break;
        }
        case !0: {
          t.flags |= lt, t.flags |= Pn;
          var h = new Error("Simulated error coming from DevTools"), v = Uo(r);
          t.lanes = Ie(t.lanes, v);
          var C = Vm(t, Yi(h, t), v);
          Pp(t, C);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var D = n.propTypes;
        D && Ma(
          D,
          a,
          // Resolved props
          "prop",
          rt(n)
        );
      }
    }
    var V;
    Za(n) ? (V = !0, lc(t)) : V = !1, zl(t, r);
    var L = t.stateNode, H;
    L === null ? (Qc(e, t), vy(t, n, a), _m(t, n, a, r), H = !0) : e === null ? H = ij(t, n, a, r) : H = lj(e, t, n, a, r);
    var pe = Pm(e, t, n, H, V, r);
    {
      var Ce = t.stateNode;
      H && Ce.props !== a && (qi || d("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", ze(t) || "a component"), qi = !0);
    }
    return pe;
  }
  function Pm(e, t, n, a, r, i) {
    Cy(e, t);
    var l = (t.flags & lt) !== Oe;
    if (!a && !l)
      return r && sb(t, n, !1), Tr(e, t, i);
    var u = t.stateNode;
    Os.current = t;
    var c;
    if (l && typeof n.getDerivedStateFromError != "function")
      c = null, dy();
    else {
      Oo(t);
      {
        if (ha(!0), c = u.render(), t.mode & Pt) {
          hn(!0);
          try {
            u.render();
          } finally {
            hn(!1);
          }
        }
        ha(!1);
      }
      bl();
    }
    return t.flags |= ml, e !== null && l ? pj(e, t, c, i) : Hn(e, t, c, i), t.memoizedState = u.state, r && sb(t, n, !0), t.child;
  }
  function Ty(e) {
    var t = e.stateNode;
    t.pendingContext ? lb(e, t.pendingContext, t.pendingContext !== t.context) : t.context && lb(e, t.context, !1), Hp(e, t.containerInfo);
  }
  function gj(e, t, n) {
    if (Ty(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Ob(e, t), Sc(t, a, null, n);
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
      if (h.baseState = c, t.memoizedState = c, t.flags & vr) {
        var v = Yi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return wy(e, t, u, n, v);
      } else if (u !== i) {
        var C = Yi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return wy(e, t, u, n, C);
      } else {
        NC(t);
        var D = Rb(t, null, u, n);
        t.child = D;
        for (var V = D; V; )
          V.flags = V.flags & ~Wt | gr, V = V.sibling;
      }
    } else {
      if (kl(), u === i)
        return Tr(e, t, n);
      Hn(e, t, u, n);
    }
    return t.child;
  }
  function wy(e, t, n, a, r) {
    return kl(), Dp(r), t.flags |= vr, Hn(e, t, n, a), t.child;
  }
  function bj(e, t, n) {
    Lb(t), e === null && Rp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = ip(a, r);
    return u ? l = null : i !== null && ip(a, i) && (t.flags |= wo), Cy(e, t), Hn(e, t, l, n), t.child;
  }
  function yj(e, t) {
    return e === null && Rp(t), null;
  }
  function Nj(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, c = u(l);
    t.type = c;
    var h = t.tag = yT(c), v = Ua(c, r), C;
    switch (h) {
      case R:
        return Hm(t, c), t.type = c = eo(c), C = zm(null, t, c, v, a), C;
      case j:
        return t.type = c = gh(c), C = jy(null, t, c, v, a), C;
      case P:
        return t.type = c = bh(c), C = Ey(null, t, c, v, a), C;
      case F: {
        if (t.type !== t.elementType) {
          var D = c.propTypes;
          D && Ma(
            D,
            v,
            // Resolved for outer only
            "prop",
            rt(c)
          );
        }
        return C = Sy(
          null,
          t,
          c,
          Ua(c.type, v),
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
    return Za(n) ? (i = !0, lc(t)) : i = !1, zl(t, r), vy(t, n, a), _m(t, n, a, r), Pm(null, t, n, !0, i, r);
  }
  function Ej(e, t, n, a) {
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
        Am[h] || (d("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", h, h), Am[h] = !0);
      }
      t.mode & Pt && Aa.recordLegacyContextWarning(t, null), ha(!0), Os.current = t, u = Yl(null, t, n, r, i, a), c = ql(), ha(!1);
    }
    if (bl(), t.flags |= ml, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
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
      return Za(n) ? (D = !0, lc(t)) : D = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, zp(t), hy(t, u), _m(t, n, r, a), Pm(null, t, n, !0, D, a);
    } else {
      if (t.tag = R, t.mode & Pt) {
        hn(!0);
        try {
          u = Yl(null, t, n, r, i, a), c = ql();
        } finally {
          hn(!1);
        }
      }
      return Nn() && c && yp(t), Hn(null, t, u, a), Hm(t, n), t.child;
    }
  }
  function Hm(e, t) {
    {
      if (t && t.childContextTypes && d("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Fr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Um[r] || (Um[r] = !0, d("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = rt(t) || "Unknown";
        Vs[l] || (d("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Vs[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = rt(t) || "Unknown";
        km[u] || (d("%s: Function components do not support getDerivedStateFromProps.", u), km[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var c = rt(t) || "Unknown";
        Lm[c] || (d("%s: Function components do not support contextType.", c), Lm[c] = !0);
      }
    }
  }
  var Bm = {
    dehydrated: null,
    treeContext: null,
    retryLane: vn
  };
  function $m(e) {
    return {
      baseLanes: e,
      cachePool: fj(),
      transitions: null
    };
  }
  function Sj(e, t) {
    var n = null;
    return {
      baseLanes: Ie(e.baseLanes, t),
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
    return Ip(e, Es);
  }
  function Dj(e, t) {
    return wu(e.childLanes, t);
  }
  function _y(e, t, n) {
    var a = t.pendingProps;
    AT(t) && (t.flags |= lt);
    var r = La.current, i = !1, l = (t.flags & lt) !== Oe;
    if (l || Rj(r, e) ? (i = !0, t.flags &= ~lt) : (e === null || e.memoizedState !== null) && (r = $C(r, Ub)), r = Hl(r), ti(t, r), e === null) {
      Rp(t);
      var u = t.memoizedState;
      if (u !== null) {
        var c = u.dehydrated;
        if (c !== null)
          return _j(t, c);
      }
      var h = a.children, v = a.fallback;
      if (i) {
        var C = Cj(t, h, v, n), D = t.child;
        return D.memoizedState = $m(n), t.memoizedState = Bm, C;
      } else
        return Im(t, h);
    } else {
      var V = e.memoizedState;
      if (V !== null) {
        var L = V.dehydrated;
        if (L !== null)
          return Oj(e, t, l, a, L, V, n);
      }
      if (i) {
        var H = a.fallback, pe = a.children, Ce = Tj(e, t, pe, H, n), Re = t.child, Ze = e.child.memoizedState;
        return Re.memoizedState = Ze === null ? $m(n) : Sj(Ze, n), Re.childLanes = Dj(e, n), t.memoizedState = Bm, Ce;
      } else {
        var We = a.children, _ = jj(e, t, We, n);
        return t.memoizedState = null, _;
      }
    }
  }
  function Im(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Ym(r, a);
    return i.return = e, e.child = i, i;
  }
  function Cj(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, c;
    return (r & Xe) === Te && i !== null ? (u = i, u.childLanes = X, u.pendingProps = l, e.mode & mt && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), c = ui(n, r, a, null)) : (u = Ym(l, r), c = ui(n, r, a, null)), u.return = e, c.return = e, u.sibling = c, e.child = u, c;
  }
  function Ym(e, t, n) {
    return ON(e, t, X, null);
  }
  function Oy(e, t) {
    return Xi(e, t);
  }
  function jj(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Oy(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Xe) === Te && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= Ri) : u.push(i);
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
      h = v, h.childLanes = X, h.pendingProps = c, t.mode & mt && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = l.selfBaseDuration, h.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      h = Oy(l, c), h.subtreeFlags = l.subtreeFlags & br;
    var C;
    return u !== null ? C = Xi(u, a) : (C = ui(a, i, r, null), C.flags |= Wt), C.return = t, h.return = t, h.sibling = C, t.child = h, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Dp(a), Ul(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Im(t, i);
    return l.flags |= Wt, t.memoizedState = null, l;
  }
  function wj(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Ym(l, i), c = ui(a, i, r, null);
    return c.flags |= Wt, u.return = t, c.return = t, u.sibling = c, t.child = u, (t.mode & Xe) !== Te && Ul(t, e.child, null, r), c;
  }
  function _j(e, t, n) {
    return (e.mode & Xe) === Te ? (d("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Le) : up(t) ? e.lanes = _i : e.lanes = ra, null;
  }
  function Oj(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & vr) {
        t.flags &= ~vr;
        var _ = Om(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, _);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= lt, null;
        var B = a.children, O = a.fallback, ne = wj(e, t, B, O, l), be = t.child;
        return be.memoizedState = $m(l), t.memoizedState = Bm, ne;
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
      if (up(r)) {
        var u, c, h;
        {
          var v = LD(r);
          u = v.digest, c = v.message, h = v.stack;
        }
        var C;
        c ? C = new Error(c) : C = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var D = Om(C, u, h);
        return Kc(e, t, l, D);
      }
      var V = ia(l, e.childLanes);
      if (Fa || V) {
        var L = ld();
        if (L !== null) {
          var H = HS(L, l);
          if (H !== vn && H !== i.retryLane) {
            i.retryLane = H;
            var pe = Dt;
            Qn(e, H), cn(L, e, H, pe);
          }
        }
        fh();
        var Ce = Om(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Ce);
      } else if (eb(r)) {
        t.flags |= lt, t.child = e.child;
        var Re = nT.bind(null, e);
        return kD(r, Re), null;
      } else {
        xC(t, r, i.treeContext);
        var Ze = a.children, We = Im(t, Ze);
        return We.flags |= gr, We;
      }
    }
  }
  function My(e, t, n) {
    e.lanes = Ie(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ie(a.lanes, t)), Lp(e.return, t, n);
  }
  function Mj(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === te) {
        var r = a.memoizedState;
        r !== null && My(a, n, e);
      } else if (a.tag === le)
        My(a, n, e);
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
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Fm[e])
      if (Fm[e] = !0, typeof e == "string")
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
  function Vy(e, t) {
    {
      var n = Ge(e), a = !n && typeof Ta(e) == "function";
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
          if (!Vy(e[n], n))
            return;
      } else {
        var a = Ta(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Vy(i.value, l))
                return;
              l++;
            }
        } else
          d('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function qm(e, t, n, a, r) {
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
  function Ay(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    Aj(r), Lj(i, r), kj(l, r), Hn(e, t, l, n);
    var u = La.current, c = Ip(u, Es);
    if (c)
      u = Yp(u, Es), t.flags |= lt;
    else {
      var h = e !== null && (e.flags & lt) !== Oe;
      h && Mj(t, t.child, n), u = Hl(u);
    }
    if (ti(t, u), (t.mode & Xe) === Te)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = Vj(t.child), C;
          v === null ? (C = t.child, t.child = null) : (C = v.sibling, v.sibling = null), qm(
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
          qm(
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
          qm(
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
    Hp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ul(t, null, a, n) : Hn(e, t, a, n), t.child;
  }
  var Ly = !1;
  function Fj(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || Ly || (Ly = !0, d("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var c = t.type.propTypes;
      c && Ma(c, i, "prop", "Context.Provider");
    }
    if (jb(t, r, u), l !== null) {
      var h = l.value;
      if (sa(h, u)) {
        if (l.children === i.children && !rc())
          return Tr(e, t, n);
      } else
        AC(t, r, n);
    }
    var v = i.children;
    return Hn(e, t, v, n), t.child;
  }
  var ky = !1;
  function zj(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (ky || (ky = !0, d("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && d("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), zl(t, n);
    var l = Kt(a);
    Oo(t);
    var u;
    return Os.current = t, ha(!0), u = i(l), ha(!1), bl(), t.flags |= ml, Hn(e, t, u, n), t.child;
  }
  function As() {
    Fa = !0;
  }
  function Qc(e, t) {
    (t.mode & Xe) === Te && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Wt);
  }
  function Tr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), dy(), qs(t.lanes), ia(n, t.childLanes) ? (MC(e, t), t.child) : null;
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
      return i === null ? (a.deletions = [e], a.flags |= Ri) : i.push(e), n.flags |= Wt, n;
    }
  }
  function Gm(e, t) {
    var n = e.lanes;
    return !!ia(n, t);
  }
  function Hj(e, t, n) {
    switch (t.tag) {
      case x:
        Ty(t), t.stateNode, kl();
        break;
      case k:
        Lb(t);
        break;
      case j: {
        var a = t.type;
        Za(a) && lc(t);
        break;
      }
      case T:
        Hp(t, t.stateNode.containerInfo);
        break;
      case G: {
        var r = t.memoizedProps.value, i = t.type._context;
        jb(t, i, r);
        break;
      }
      case $:
        {
          var l = ia(n, t.childLanes);
          l && (t.flags |= it);
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
            return ti(t, Hl(La.current)), t.flags |= lt, null;
          var h = t.child, v = h.childLanes;
          if (ia(n, v))
            return _y(e, t, n);
          ti(t, Hl(La.current));
          var C = Tr(e, t, n);
          return C !== null ? C.sibling : null;
        } else
          ti(t, Hl(La.current));
        break;
      }
      case le: {
        var D = (e.flags & lt) !== Oe, V = ia(n, t.childLanes);
        if (D) {
          if (V)
            return Ay(e, t, n);
          t.flags |= lt;
        }
        var L = t.memoizedState;
        if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), ti(t, La.current), V)
          break;
        return null;
      }
      case q:
      case ye:
        return t.lanes = X, Dy(e, t, n);
    }
    return Tr(e, t, n);
  }
  function Uy(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return Pj(e, t, Sh(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || rc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        Fa = !0;
      else {
        var i = Gm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & lt) === Oe)
          return Fa = !1, Hj(e, t, n);
        (e.flags & Xd) !== Oe ? Fa = !0 : Fa = !1;
      }
    } else if (Fa = !1, Nn() && fC(t)) {
      var l = t.index, u = pC();
      db(t, u, l);
    }
    switch (t.lanes = X, t.tag) {
      case M:
        return Ej(e, t, t.type, n);
      case ie: {
        var c = t.elementType;
        return Nj(e, t, c, n);
      }
      case R: {
        var h = t.type, v = t.pendingProps, C = t.elementType === h ? v : Ua(h, v);
        return zm(e, t, h, C, n);
      }
      case j: {
        var D = t.type, V = t.pendingProps, L = t.elementType === D ? V : Ua(D, V);
        return jy(e, t, D, L, n);
      }
      case x:
        return gj(e, t, n);
      case k:
        return bj(e, t, n);
      case ee:
        return yj(e, t);
      case te:
        return _y(e, t, n);
      case T:
        return Uj(e, t, n);
      case P: {
        var H = t.type, pe = t.pendingProps, Ce = t.elementType === H ? pe : Ua(H, pe);
        return Ey(e, t, H, Ce, n);
      }
      case me:
        return mj(e, t, n);
      case oe:
        return hj(e, t, n);
      case $:
        return vj(e, t, n);
      case G:
        return Fj(e, t, n);
      case ue:
        return zj(e, t, n);
      case F: {
        var Re = t.type, Ze = t.pendingProps, We = Ua(Re, Ze);
        if (t.type !== t.elementType) {
          var _ = Re.propTypes;
          _ && Ma(
            _,
            We,
            // Resolved for outer only
            "prop",
            rt(Re)
          );
        }
        return We = Ua(Re.type, We), Sy(e, t, Re, We, n);
      }
      case U:
        return Ry(e, t, t.type, t.pendingProps, n);
      case J: {
        var B = t.type, O = t.pendingProps, ne = t.elementType === B ? O : Ua(B, O);
        return xj(e, t, B, ne, n);
      }
      case le:
        return Ay(e, t, n);
      case we:
        break;
      case q:
        return Dy(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Gl(e) {
    e.flags |= it;
  }
  function Fy(e) {
    e.flags |= Di, e.flags |= Jd;
  }
  var zy, Wm, Py, Hy;
  zy = function(e, t, n, a) {
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
  }, Wm = function(e, t) {
  }, Py = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = Bp(), c = dD(l, n, i, a, r, u);
      t.updateQueue = c, c && Gl(t);
    }
  }, Hy = function(e, t, n, a) {
    n !== a && Gl(t);
  };
  function Ls(e, t) {
    if (!Nn())
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
  function En(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = X, a = Oe;
    if (t) {
      if ((e.mode & mt) !== Te) {
        for (var c = e.selfBaseDuration, h = e.child; h !== null; )
          n = Ie(n, Ie(h.lanes, h.childLanes)), a |= h.subtreeFlags & br, a |= h.flags & br, c += h.treeBaseDuration, h = h.sibling;
        e.treeBaseDuration = c;
      } else
        for (var v = e.child; v !== null; )
          n = Ie(n, Ie(v.lanes, v.childLanes)), a |= v.subtreeFlags & br, a |= v.flags & br, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & mt) !== Te) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Ie(n, Ie(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var u = e.child; u !== null; )
          n = Ie(n, Ie(u.lanes, u.childLanes)), a |= u.subtreeFlags, a |= u.flags, u.return = e, u = u.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function Bj(e, t, n) {
    if (CC() && (t.mode & Xe) !== Te && (t.flags & lt) === Oe)
      return bb(t), kl(), t.flags |= vr | Eu | Pn, !1;
    var a = dc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (RC(t), En(t), (t.mode & mt) !== Te) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (kl(), (t.flags & lt) === Oe && (t.memoizedState = null), t.flags |= it, En(t), (t.mode & mt) !== Te) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return yb(), !0;
  }
  function By(e, t, n) {
    var a = t.pendingProps;
    switch (Np(t), t.tag) {
      case M:
      case ie:
      case U:
      case R:
      case P:
      case me:
      case oe:
      case $:
      case ue:
      case F:
        return En(t), null;
      case j: {
        var r = t.type;
        return Za(r) && ic(t), En(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (Pl(t), vp(t), Gp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = dc(t);
          if (l)
            Gl(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & vr) !== Oe) && (t.flags |= hl, yb());
          }
        }
        return Wm(e, t), En(t), null;
      }
      case k: {
        $p(t);
        var c = Ab(), h = t.type;
        if (e !== null && t.stateNode != null)
          Py(e, t, h, a, c), e.ref !== t.ref && Fy(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return En(t), null;
          }
          var v = Bp(), C = dc(t);
          if (C)
            EC(t, c, v) && Gl(t);
          else {
            var D = sD(h, a, c, v, t);
            zy(D, t, !1, !1), t.stateNode = D, cD(D, h, a, c) && Gl(t);
          }
          t.ref !== null && Fy(t);
        }
        return En(t), null;
      }
      case ee: {
        var V = a;
        if (e && t.stateNode != null) {
          var L = e.memoizedProps;
          Hy(e, t, L, V);
        } else {
          if (typeof V != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var H = Ab(), pe = Bp(), Ce = dc(t);
          Ce ? SC(t) && Gl(t) : t.stateNode = fD(V, H, pe, t);
        }
        return En(t), null;
      }
      case te: {
        Bl(t);
        var Re = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ze = Bj(e, t, Re);
          if (!Ze)
            return t.flags & Pn ? t : null;
        }
        if ((t.flags & lt) !== Oe)
          return t.lanes = n, (t.mode & mt) !== Te && bm(t), t;
        var We = Re !== null, _ = e !== null && e.memoizedState !== null;
        if (We !== _ && We) {
          var B = t.child;
          if (B.flags |= Ci, (t.mode & Xe) !== Te) {
            var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            O || Ip(La.current, Ub) ? $1() : fh();
          }
        }
        var ne = t.updateQueue;
        if (ne !== null && (t.flags |= it), En(t), (t.mode & mt) !== Te && We) {
          var be = t.child;
          be !== null && (t.treeBaseDuration -= be.treeBaseDuration);
        }
        return null;
      }
      case T:
        return Pl(t), Wm(e, t), e === null && iC(t.stateNode.containerInfo), En(t), null;
      case G:
        var he = t.type._context;
        return Ap(he, t), En(t), null;
      case J: {
        var Me = t.type;
        return Za(Me) && ic(t), En(t), null;
      }
      case le: {
        Bl(t);
        var Fe = t.memoizedState;
        if (Fe === null)
          return En(t), null;
        var vt = (t.flags & lt) !== Oe, nt = Fe.rendering;
        if (nt === null)
          if (vt)
            Ls(Fe, !1);
          else {
            var It = Y1() && (e === null || (e.flags & lt) === Oe);
            if (!It)
              for (var at = t.child; at !== null; ) {
                var Ht = jc(at);
                if (Ht !== null) {
                  vt = !0, t.flags |= lt, Ls(Fe, !1);
                  var An = Ht.updateQueue;
                  return An !== null && (t.updateQueue = An, t.flags |= it), t.subtreeFlags = Oe, VC(t, n), ti(t, Yp(La.current, Es)), t.child;
                }
                at = at.sibling;
              }
            Fe.tail !== null && mn() > uN() && (t.flags |= lt, vt = !0, Ls(Fe, !1), t.lanes = Hv);
          }
        else {
          if (!vt) {
            var jn = jc(nt);
            if (jn !== null) {
              t.flags |= lt, vt = !0;
              var da = jn.updateQueue;
              if (da !== null && (t.updateQueue = da, t.flags |= it), Ls(Fe, !0), Fe.tail === null && Fe.tailMode === "hidden" && !nt.alternate && !Nn())
                return En(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            mn() * 2 - Fe.renderingStartTime > uN() && n !== ra && (t.flags |= lt, vt = !0, Ls(Fe, !1), t.lanes = Hv);
          }
          if (Fe.isBackwards)
            nt.sibling = t.child, t.child = nt;
          else {
            var In = Fe.last;
            In !== null ? In.sibling = nt : t.child = nt, Fe.last = nt;
          }
        }
        if (Fe.tail !== null) {
          var Yn = Fe.tail;
          Fe.rendering = Yn, Fe.tail = Yn.sibling, Fe.renderingStartTime = mn(), Yn.sibling = null;
          var Ln = La.current;
          return vt ? Ln = Yp(Ln, Es) : Ln = Hl(Ln), ti(t, Ln), Yn;
        }
        return En(t), null;
      }
      case we:
        break;
      case q:
      case ye: {
        dh(t);
        var Vr = t.memoizedState, to = Vr !== null;
        if (e !== null) {
          var Xs = e.memoizedState, or = Xs !== null;
          or !== to && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !He && (t.flags |= Ci);
        }
        return !to || (t.mode & Xe) === Te ? En(t) : ia(lr, ra) && (En(t), t.subtreeFlags & (Wt | it) && (t.flags |= Ci)), null;
      }
      case Ne:
        return null;
      case Y:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function $j(e, t, n) {
    switch (Np(t), t.tag) {
      case j: {
        var a = t.type;
        Za(a) && ic(t);
        var r = t.flags;
        return r & Pn ? (t.flags = r & ~Pn | lt, (t.mode & mt) !== Te && bm(t), t) : null;
      }
      case x: {
        t.stateNode, Pl(t), vp(t), Gp();
        var i = t.flags;
        return (i & Pn) !== Oe && (i & lt) === Oe ? (t.flags = i & ~Pn | lt, t) : null;
      }
      case k:
        return $p(t), null;
      case te: {
        Bl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          kl();
        }
        var u = t.flags;
        return u & Pn ? (t.flags = u & ~Pn | lt, (t.mode & mt) !== Te && bm(t), t) : null;
      }
      case le:
        return Bl(t), null;
      case T:
        return Pl(t), null;
      case G:
        var c = t.type._context;
        return Ap(c, t), null;
      case q:
      case ye:
        return dh(t), null;
      case Ne:
        return null;
      default:
        return null;
    }
  }
  function $y(e, t, n) {
    switch (Np(t), t.tag) {
      case j: {
        var a = t.type.childContextTypes;
        a != null && ic(t);
        break;
      }
      case x: {
        t.stateNode, Pl(t), vp(t), Gp();
        break;
      }
      case k: {
        $p(t);
        break;
      }
      case T:
        Pl(t);
        break;
      case te:
        Bl(t);
        break;
      case le:
        Bl(t);
        break;
      case G:
        var r = t.type._context;
        Ap(r, t);
        break;
      case q:
      case ye:
        dh(t);
        break;
    }
  }
  var Iy = null;
  Iy = /* @__PURE__ */ new Set();
  var Xc = !1, Sn = !1, Ij = typeof WeakSet == "function" ? WeakSet : Set, Ee = null, Wl = null, Kl = null;
  function Yj(e) {
    Wd(null, function() {
      throw e;
    }), Kd();
  }
  var qj = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & mt)
      try {
        rr(), t.componentWillUnmount();
      } finally {
        ar(e);
      }
    else
      t.componentWillUnmount();
  };
  function Yy(e, t) {
    try {
      ri(an, e);
    } catch (n) {
      xt(e, t, n);
    }
  }
  function Km(e, t, n) {
    try {
      qj(e, n);
    } catch (a) {
      xt(e, t, a);
    }
  }
  function Gj(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      xt(e, t, a);
    }
  }
  function qy(e, t) {
    try {
      Wy(e);
    } catch (n) {
      xt(e, t, n);
    }
  }
  function Ql(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (ut && bn && e.mode & mt)
            try {
              rr(), a = n(null);
            } finally {
              ar(e);
            }
          else
            a = n(null);
        } catch (r) {
          xt(e, t, r);
        }
        typeof a == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", ze(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      xt(e, t, a);
    }
  }
  var Gy = !1;
  function Wj(e, t) {
    lD(e.containerInfo), Ee = t, Kj();
    var n = Gy;
    return Gy = !1, n;
  }
  function Kj() {
    for (; Ee !== null; ) {
      var e = Ee, t = e.child;
      (e.subtreeFlags & tf) !== Oe && t !== null ? (t.return = e, Ee = t) : Qj();
    }
  }
  function Qj() {
    for (; Ee !== null; ) {
      var e = Ee;
      Mt(e);
      try {
        Xj(e);
      } catch (n) {
        xt(e, e.return, n);
      }
      pn();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ee = t;
        return;
      }
      Ee = e.return;
    }
  }
  function Xj(e) {
    var t = e.alternate, n = e.flags;
    if ((n & hl) !== Oe) {
      switch (Mt(e), e.tag) {
        case R:
        case P:
        case U:
          break;
        case j: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !qi && (i.props !== e.memoizedProps && d("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(e) || "instance"), i.state !== e.memoizedState && d("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Ua(e.type, a), r);
            {
              var u = Iy;
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
  function za(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & xn) !== Xn ? fS(t) : (e & an) !== Xn && kv(t), (e & er) !== Xn && Ws(!0), Jc(t, n, u), (e & er) !== Xn && Ws(!1), (e & xn) !== Xn ? pS() : (e & an) !== Xn && Uv());
        }
        l = l.next;
      } while (l !== i);
    }
  }
  function ri(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & xn) !== Xn ? cS(t) : (e & an) !== Xn && mS(t);
          var l = i.create;
          (e & er) !== Xn && Ws(!0), i.destroy = l(), (e & er) !== Xn && Ws(!1), (e & xn) !== Xn ? dS() : (e & an) !== Xn && hS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var c = void 0;
              (i.tag & an) !== Oe ? c = "useLayoutEffect" : (i.tag & er) !== Oe ? c = "useInsertionEffect" : c = "useEffect";
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
    if ((t.flags & it) !== Oe)
      switch (t.tag) {
        case $: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = uy(), u = t.alternate === null ? "mount" : "update";
          sy() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
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
          if (!Sn)
            if (n.mode & mt)
              try {
                rr(), ri(an | nn, n);
              } finally {
                ar(n);
              }
            else
              ri(an | nn, n);
          break;
        }
        case j: {
          var r = n.stateNode;
          if (n.flags & it && !Sn)
            if (t === null)
              if (n.type === n.elementType && !qi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), n.mode & mt)
                try {
                  rr(), r.componentDidMount();
                } finally {
                  ar(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Ua(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !qi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), n.mode & mt)
                try {
                  rr(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  ar(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !qi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), Vb(n, u, r));
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
            Vb(n, c, h);
          }
          break;
        }
        case k: {
          var v = n.stateNode;
          if (t === null && n.flags & it) {
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
            var V = n.memoizedProps, L = V.onCommit, H = V.onRender, pe = n.stateNode.effectDuration, Ce = uy(), Re = t === null ? "mount" : "update";
            sy() && (Re = "nested-update"), typeof H == "function" && H(n.memoizedProps.id, Re, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ce);
            {
              typeof L == "function" && L(n.memoizedProps.id, Re, pe, Ce), Q1(n);
              var Ze = n.return;
              e: for (; Ze !== null; ) {
                switch (Ze.tag) {
                  case x:
                    var We = Ze.stateNode;
                    We.effectDuration += pe;
                    break e;
                  case $:
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
        case te: {
          o1(e, n);
          break;
        }
        case le:
        case J:
        case we:
        case q:
        case ye:
        case Y:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    Sn || n.flags & Di && Wy(n);
  }
  function e1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        if (e.mode & mt)
          try {
            rr(), Yy(e, e.return);
          } finally {
            ar(e);
          }
        else
          Yy(e, e.return);
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && Gj(e, e.return, t), qy(e, e.return);
        break;
      }
      case k: {
        qy(e, e.return);
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
            xt(e, e.return, l);
          }
        }
      } else if (a.tag === ee) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TD(i) : _D(i, a.memoizedProps);
          } catch (l) {
            xt(e, e.return, l);
          }
      } else if (!((a.tag === q || a.tag === ye) && a.memoizedState !== null && a !== e)) {
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
  function Wy(e) {
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
        if (e.mode & mt)
          try {
            rr(), r = t(a);
          } finally {
            ar(e);
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
  function Ky(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ky(t));
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
      if (Qy(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Qy(e) {
    return e.tag === k || e.tag === x || e.tag === T;
  }
  function Xy(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Qy(t.return))
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
        t.flags & wo && (Zg(n), t.flags &= ~wo);
        var a = Xy(e);
        Xm(e, a, n);
        break;
      }
      case x:
      case T: {
        var r = t.stateNode.containerInfo, i = Xy(e);
        Qm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Qm(e, t, n) {
    var a = e.tag, r = a === k || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? SD(n, i, t) : xD(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Qm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Qm(u, t, n), u = u.sibling;
      }
    }
  }
  function Xm(e, t, n) {
    var a = e.tag, r = a === k || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? ED(n, i, t) : ND(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Xm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Xm(u, t, n), u = u.sibling;
      }
    }
  }
  var Rn = null, Pa = !1;
  function i1(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case k: {
            Rn = a.stateNode, Pa = !1;
            break e;
          }
          case x: {
            Rn = a.stateNode.containerInfo, Pa = !0;
            break e;
          }
          case T: {
            Rn = a.stateNode.containerInfo, Pa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (Rn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Jy(e, t, n), Rn = null, Pa = !1;
    }
    n1(n);
  }
  function ii(e, t, n) {
    for (var a = n.child; a !== null; )
      Jy(e, t, a), a = a.sibling;
  }
  function Jy(e, t, n) {
    switch (lS(n), n.tag) {
      case k:
        Sn || Ql(n, t);
      case ee: {
        {
          var a = Rn, r = Pa;
          Rn = null, ii(e, t, n), Rn = a, Pa = r, Rn !== null && (Pa ? DD(Rn, n.stateNode) : RD(Rn, n.stateNode));
        }
        return;
      }
      case K: {
        Rn !== null && (Pa ? CD(Rn, n.stateNode) : sp(Rn, n.stateNode));
        return;
      }
      case T: {
        {
          var i = Rn, l = Pa;
          Rn = n.stateNode.containerInfo, Pa = !0, ii(e, t, n), Rn = i, Pa = l;
        }
        return;
      }
      case R:
      case P:
      case F:
      case U: {
        if (!Sn) {
          var u = n.updateQueue;
          if (u !== null) {
            var c = u.lastEffect;
            if (c !== null) {
              var h = c.next, v = h;
              do {
                var C = v, D = C.destroy, V = C.tag;
                D !== void 0 && ((V & er) !== Xn ? Jc(n, t, D) : (V & an) !== Xn && (kv(n), n.mode & mt ? (rr(), Jc(n, t, D), ar(n)) : Jc(n, t, D), Uv())), v = v.next;
              } while (v !== h);
            }
          }
        }
        ii(e, t, n);
        return;
      }
      case j: {
        if (!Sn) {
          Ql(n, t);
          var L = n.stateNode;
          typeof L.componentWillUnmount == "function" && Km(n, t, L);
        }
        ii(e, t, n);
        return;
      }
      case we: {
        ii(e, t, n);
        return;
      }
      case q: {
        if (
          // TODO: Remove this dead flag
          n.mode & Xe
        ) {
          var H = Sn;
          Sn = H || n.memoizedState !== null, ii(e, t, n), Sn = H;
        } else
          ii(e, t, n);
        break;
      }
      default: {
        ii(e, t, n);
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
  function Zy(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Ij()), t.forEach(function(a) {
        var r = aT.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), _a)
            if (Wl !== null && Kl !== null)
              Gs(Kl, Wl);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function s1(e, t, n) {
    Wl = n, Kl = e, Mt(t), eN(t, e), Mt(t), Wl = null, Kl = null;
  }
  function Ha(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          i1(e, t, i);
        } catch (c) {
          xt(i, t, c);
        }
      }
    var l = du();
    if (t.subtreeFlags & nf)
      for (var u = t.child; u !== null; )
        Mt(u), eN(u, e), u = u.sibling;
    Mt(l);
  }
  function eN(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case P:
      case F:
      case U: {
        if (Ha(t, e), ir(e), r & it) {
          try {
            za(er | nn, e, e.return), ri(er | nn, e);
          } catch (Me) {
            xt(e, e.return, Me);
          }
          if (e.mode & mt) {
            try {
              rr(), za(an | nn, e, e.return);
            } catch (Me) {
              xt(e, e.return, Me);
            }
            ar(e);
          } else
            try {
              za(an | nn, e, e.return);
            } catch (Me) {
              xt(e, e.return, Me);
            }
        }
        return;
      }
      case j: {
        Ha(t, e), ir(e), r & Di && a !== null && Ql(a, a.return);
        return;
      }
      case k: {
        Ha(t, e), ir(e), r & Di && a !== null && Ql(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              Zg(i);
            } catch (Me) {
              xt(e, e.return, Me);
            }
          }
          if (r & it) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, c = a !== null ? a.memoizedProps : u, h = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  bD(l, v, h, c, u, e);
                } catch (Me) {
                  xt(e, e.return, Me);
                }
            }
          }
        }
        return;
      }
      case ee: {
        if (Ha(t, e), ir(e), r & it) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, D = e.memoizedProps, V = a !== null ? a.memoizedProps : D;
          try {
            yD(C, V, D);
          } catch (Me) {
            xt(e, e.return, Me);
          }
        }
        return;
      }
      case x: {
        if (Ha(t, e), ir(e), r & it && a !== null) {
          var L = a.memoizedState;
          if (L.isDehydrated)
            try {
              ID(t.containerInfo);
            } catch (Me) {
              xt(e, e.return, Me);
            }
        }
        return;
      }
      case T: {
        Ha(t, e), ir(e);
        return;
      }
      case te: {
        Ha(t, e), ir(e);
        var H = e.child;
        if (H.flags & Ci) {
          var pe = H.stateNode, Ce = H.memoizedState, Re = Ce !== null;
          if (pe.isHidden = Re, Re) {
            var Ze = H.alternate !== null && H.alternate.memoizedState !== null;
            Ze || B1();
          }
        }
        if (r & it) {
          try {
            l1(e);
          } catch (Me) {
            xt(e, e.return, Me);
          }
          Zy(e);
        }
        return;
      }
      case q: {
        var We = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Xe
        ) {
          var _ = Sn;
          Sn = _ || We, Ha(t, e), Sn = _;
        } else
          Ha(t, e);
        if (ir(e), r & Ci) {
          var B = e.stateNode, O = e.memoizedState, ne = O !== null, be = e;
          if (B.isHidden = ne, ne && !We && (be.mode & Xe) !== Te) {
            Ee = be;
            for (var he = be.child; he !== null; )
              Ee = he, c1(he), he = he.sibling;
          }
          t1(be, ne);
        }
        return;
      }
      case le: {
        Ha(t, e), ir(e), r & it && Zy(e);
        return;
      }
      case we:
        return;
      default: {
        Ha(t, e), ir(e);
        return;
      }
    }
  }
  function ir(e) {
    var t = e.flags;
    if (t & Wt) {
      try {
        r1(e);
      } catch (n) {
        xt(e, e.return, n);
      }
      e.flags &= ~Wt;
    }
    t & gr && (e.flags &= ~gr);
  }
  function u1(e, t, n) {
    Wl = n, Kl = t, Ee = e, tN(e, t, n), Wl = null, Kl = null;
  }
  function tN(e, t, n) {
    for (var a = (e.mode & Xe) !== Te; Ee !== null; ) {
      var r = Ee, i = r.child;
      if (r.tag === q && a) {
        var l = r.memoizedState !== null, u = l || Xc;
        if (u) {
          Jm(e, t, n);
          continue;
        } else {
          var c = r.alternate, h = c !== null && c.memoizedState !== null, v = h || Sn, C = Xc, D = Sn;
          Xc = u, Sn = v, Sn && !D && (Ee = r, d1(r));
          for (var V = i; V !== null; )
            Ee = V, tN(
              V,
              // New root; bubble back up to here and stop.
              t,
              n
            ), V = V.sibling;
          Ee = r, Xc = C, Sn = D, Jm(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== Oe && i !== null ? (i.return = r, Ee = i) : Jm(e, t, n);
    }
  }
  function Jm(e, t, n) {
    for (; Ee !== null; ) {
      var a = Ee;
      if ((a.flags & _o) !== Oe) {
        var r = a.alternate;
        Mt(a);
        try {
          Zj(t, r, a, n);
        } catch (l) {
          xt(a, a.return, l);
        }
        pn();
      }
      if (a === e) {
        Ee = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, Ee = i;
        return;
      }
      Ee = a.return;
    }
  }
  function c1(e) {
    for (; Ee !== null; ) {
      var t = Ee, n = t.child;
      switch (t.tag) {
        case R:
        case P:
        case F:
        case U: {
          if (t.mode & mt)
            try {
              rr(), za(an, t, t.return);
            } finally {
              ar(t);
            }
          else
            za(an, t, t.return);
          break;
        }
        case j: {
          Ql(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Km(t, t.return, a);
          break;
        }
        case k: {
          Ql(t, t.return);
          break;
        }
        case q: {
          var r = t.memoizedState !== null;
          if (r) {
            nN(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, Ee = n) : nN(e);
    }
  }
  function nN(e) {
    for (; Ee !== null; ) {
      var t = Ee;
      if (t === e) {
        Ee = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Ee = n;
        return;
      }
      Ee = t.return;
    }
  }
  function d1(e) {
    for (; Ee !== null; ) {
      var t = Ee, n = t.child;
      if (t.tag === q) {
        var a = t.memoizedState !== null;
        if (a) {
          aN(e);
          continue;
        }
      }
      n !== null ? (n.return = t, Ee = n) : aN(e);
    }
  }
  function aN(e) {
    for (; Ee !== null; ) {
      var t = Ee;
      Mt(t);
      try {
        e1(t);
      } catch (a) {
        xt(t, t.return, a);
      }
      if (pn(), t === e) {
        Ee = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Ee = n;
        return;
      }
      Ee = t.return;
    }
  }
  function f1(e, t, n, a) {
    Ee = t, p1(t, e, n, a);
  }
  function p1(e, t, n, a) {
    for (; Ee !== null; ) {
      var r = Ee, i = r.child;
      (r.subtreeFlags & vl) !== Oe && i !== null ? (i.return = r, Ee = i) : m1(e, t, n, a);
    }
  }
  function m1(e, t, n, a) {
    for (; Ee !== null; ) {
      var r = Ee;
      if ((r.flags & Pr) !== Oe) {
        Mt(r);
        try {
          h1(t, r, n, a);
        } catch (l) {
          xt(r, r.return, l);
        }
        pn();
      }
      if (r === e) {
        Ee = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, Ee = i;
        return;
      }
      Ee = r.return;
    }
  }
  function h1(e, t, n, a) {
    switch (t.tag) {
      case R:
      case P:
      case U: {
        if (t.mode & mt) {
          gm();
          try {
            ri(xn | nn, t);
          } finally {
            vm(t);
          }
        } else
          ri(xn | nn, t);
        break;
      }
    }
  }
  function v1(e) {
    Ee = e, g1();
  }
  function g1() {
    for (; Ee !== null; ) {
      var e = Ee, t = e.child;
      if ((Ee.flags & Ri) !== Oe) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            Ee = r, N1(r, e);
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
          Ee = e;
        }
      }
      (e.subtreeFlags & vl) !== Oe && t !== null ? (t.return = e, Ee = t) : b1();
    }
  }
  function b1() {
    for (; Ee !== null; ) {
      var e = Ee;
      (e.flags & Pr) !== Oe && (Mt(e), y1(e), pn());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ee = t;
        return;
      }
      Ee = e.return;
    }
  }
  function y1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & mt ? (gm(), za(xn | nn, e, e.return), vm(e)) : za(xn | nn, e, e.return);
        break;
      }
    }
  }
  function N1(e, t) {
    for (; Ee !== null; ) {
      var n = Ee;
      Mt(n), E1(n, t), pn();
      var a = n.child;
      a !== null ? (a.return = n, Ee = a) : x1(e);
    }
  }
  function x1(e) {
    for (; Ee !== null; ) {
      var t = Ee, n = t.sibling, a = t.return;
      if (Ky(t), t === e) {
        Ee = null;
        return;
      }
      if (n !== null) {
        n.return = a, Ee = n;
        return;
      }
      Ee = a;
    }
  }
  function E1(e, t) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & mt ? (gm(), za(xn, e, t), vm(e)) : za(xn, e, t);
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
          ri(an | nn, e);
        } catch (n) {
          xt(e, e.return, n);
        }
        break;
      }
      case j: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          xt(e, e.return, n);
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
          ri(xn | nn, e);
        } catch (t) {
          xt(e, e.return, t);
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
          za(an | nn, e, e.return);
        } catch (n) {
          xt(e, e.return, n);
        }
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Km(e, e.return, t);
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
          za(xn | nn, e, e.return);
        } catch (t) {
          xt(e, e.return, t);
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
  function rN() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && w1.current !== null && d("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var O1 = Math.ceil, Zm = m.ReactCurrentDispatcher, eh = m.ReactCurrentOwner, Dn = m.ReactCurrentBatchConfig, Ba = m.ReactCurrentActQueue, on = (
    /*             */
    0
  ), iN = (
    /*               */
    1
  ), Cn = (
    /*                */
    2
  ), xa = (
    /*                */
    4
  ), wr = 0, Us = 1, Gi = 2, Zc = 3, Fs = 4, lN = 5, th = 6, Je = on, Bn = null, zt = null, sn = X, lr = X, nh = Kr(X), un = wr, zs = null, ed = X, Ps = X, td = X, Hs = null, Jn = null, ah = 0, oN = 500, sN = 1 / 0, M1 = 500, _r = null;
  function Bs() {
    sN = mn() + M1;
  }
  function uN() {
    return sN;
  }
  var nd = !1, rh = null, Xl = null, Wi = !1, li = null, $s = X, ih = [], lh = null, V1 = 50, Is = 0, oh = null, sh = !1, ad = !1, A1 = 50, Jl = 0, rd = null, Ys = Dt, id = X, cN = !1;
  function ld() {
    return Bn;
  }
  function $n() {
    return (Je & (Cn | xa)) !== on ? mn() : (Ys !== Dt || (Ys = mn()), Ys);
  }
  function oi(e) {
    var t = e.mode;
    if ((t & Xe) === Te)
      return Le;
    if ((Je & Cn) !== on && sn !== X)
      return Uo(sn);
    var n = wC() !== TC;
    if (n) {
      if (Dn.transition !== null) {
        var a = Dn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return id === vn && (id = Yv()), id;
    }
    var r = Oa();
    if (r !== vn)
      return r;
    var i = pD();
    return i;
  }
  function L1(e) {
    var t = e.mode;
    return (t & Xe) === Te ? Le : US();
  }
  function cn(e, t, n, a) {
    iT(), cN && d("useInsertionEffect must not schedule updates."), sh && (ad = !0), Fo(e, n, a), (Je & Cn) !== X && e === Bn ? sT(t) : (_a && Wv(e, t, n), uT(t), e === Bn && ((Je & Cn) === on && (Ps = Ie(Ps, n)), un === Fs && si(e, sn)), Zn(e, a), n === Le && Je === on && (t.mode & Xe) === Te && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Ba.isBatchingLegacy && (Bs(), cb()));
  }
  function k1(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Zn(e, n);
  }
  function U1(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Je & Cn) !== on
    );
  }
  function Zn(e, t) {
    var n = e.callbackNode;
    OS(e, t);
    var a = ju(e, e === Bn ? sn : X);
    if (a === X) {
      n !== null && CN(n), e.callbackNode = null, e.callbackPriority = vn;
      return;
    }
    var r = Mi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Ba.current !== null && n !== hh)) {
      n == null && i !== Le && d("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && CN(n);
    var l;
    if (r === Le)
      e.tag === Qr ? (Ba.isBatchingLegacy !== null && (Ba.didScheduleLegacyUpdate = !0), dC(pN.bind(null, e))) : ub(pN.bind(null, e)), Ba.current !== null ? Ba.current.push(Xr) : hD(function() {
        (Je & (Cn | xa)) === on && Xr();
      }), l = null;
    else {
      var u;
      switch (Xv(a)) {
        case la:
          u = Su;
          break;
        case Nr:
          u = af;
          break;
        case xr:
          u = wi;
          break;
        case _u:
          u = rf;
          break;
        default:
          u = wi;
          break;
      }
      l = vh(u, dN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function dN(e, t) {
    if (tj(), Ys = Dt, id = X, (Je & (Cn | xa)) !== on)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Mr();
    if (a && e.callbackNode !== n)
      return null;
    var r = ju(e, e === Bn ? sn : X);
    if (r === X)
      return null;
    var i = !Tu(e, r) && !kS(e, r) && !t, l = i ? G1(e, r) : sd(e, r);
    if (l !== wr) {
      if (l === Gi) {
        var u = jf(e);
        u !== X && (r = u, l = uh(e, u));
      }
      if (l === Us) {
        var c = zs;
        throw Ki(e, X), si(e, r), Zn(e, mn()), c;
      }
      if (l === th)
        si(e, r);
      else {
        var h = !Tu(e, r), v = e.current.alternate;
        if (h && !z1(v)) {
          if (l = sd(e, r), l === Gi) {
            var C = jf(e);
            C !== X && (r = C, l = uh(e, C));
          }
          if (l === Us) {
            var D = zs;
            throw Ki(e, X), si(e, r), Zn(e, mn()), D;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, F1(e, l, r);
      }
    }
    return Zn(e, mn()), e.callbackNode === n ? dN.bind(null, e) : null;
  }
  function uh(e, t) {
    var n = Hs;
    if (Ou(e)) {
      var a = Ki(e, t);
      a.flags |= vr, rC(e.containerInfo);
    }
    var r = sd(e, t);
    if (r !== Gi) {
      var i = Jn;
      Jn = n, i !== null && fN(i);
    }
    return r;
  }
  function fN(e) {
    Jn === null ? Jn = e : Jn.push.apply(Jn, e);
  }
  function F1(e, t, n) {
    switch (t) {
      case wr:
      case Us:
        throw new Error("Root did not complete. This is a bug in React.");
      case Gi: {
        Qi(e, Jn, _r);
        break;
      }
      case Zc: {
        if (si(e, n), $v(n) && // do not delay if we're inside an act() scope
        !jN()) {
          var a = ah + oN - mn();
          if (a > 10) {
            var r = ju(e, X);
            if (r !== X)
              break;
            var i = e.suspendedLanes;
            if (!El(i, n)) {
              $n(), Gv(e, i);
              break;
            }
            e.timeoutHandle = lp(Qi.bind(null, e, Jn, _r), a);
            break;
          }
        }
        Qi(e, Jn, _r);
        break;
      }
      case Fs: {
        if (si(e, n), LS(n))
          break;
        if (!jN()) {
          var l = wS(e, n), u = l, c = mn() - u, h = rT(c) - c;
          if (h > 10) {
            e.timeoutHandle = lp(Qi.bind(null, e, Jn, _r), h);
            break;
          }
        }
        Qi(e, Jn, _r);
        break;
      }
      case lN: {
        Qi(e, Jn, _r);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function z1(e) {
    for (var t = e; ; ) {
      if (t.flags & Qd) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, u = i.value;
              try {
                if (!sa(l(), u))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var c = t.child;
      if (t.subtreeFlags & Qd && c !== null) {
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
  function si(e, t) {
    t = wu(t, td), t = wu(t, Ps), zS(e, t);
  }
  function pN(e) {
    if (nj(), (Je & (Cn | xa)) !== on)
      throw new Error("Should not already be working.");
    Mr();
    var t = ju(e, X);
    if (!ia(t, Le))
      return Zn(e, mn()), null;
    var n = sd(e, t);
    if (e.tag !== Qr && n === Gi) {
      var a = jf(e);
      a !== X && (t = a, n = uh(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Ki(e, X), si(e, t), Zn(e, mn()), r;
    }
    if (n === th)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Qi(e, Jn, _r), Zn(e, mn()), null;
  }
  function P1(e, t) {
    t !== X && (Of(e, Ie(t, Le)), Zn(e, mn()), (Je & (Cn | xa)) === on && (Bs(), Xr()));
  }
  function ch(e, t) {
    var n = Je;
    Je |= iN;
    try {
      return e(t);
    } finally {
      Je = n, Je === on && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Ba.isBatchingLegacy && (Bs(), cb());
    }
  }
  function H1(e, t, n, a, r) {
    var i = Oa(), l = Dn.transition;
    try {
      return Dn.transition = null, gn(la), e(t, n, a, r);
    } finally {
      gn(i), Dn.transition = l, Je === on && Bs();
    }
  }
  function Or(e) {
    li !== null && li.tag === Qr && (Je & (Cn | xa)) === on && Mr();
    var t = Je;
    Je |= iN;
    var n = Dn.transition, a = Oa();
    try {
      return Dn.transition = null, gn(la), e ? e() : void 0;
    } finally {
      gn(a), Dn.transition = n, Je = t, (Je & (Cn | xa)) === on && Xr();
    }
  }
  function mN() {
    return (Je & (Cn | xa)) !== on;
  }
  function od(e, t) {
    Mn(nh, lr, e), lr = Ie(lr, t);
  }
  function dh(e) {
    lr = nh.current, On(nh, e);
  }
  function Ki(e, t) {
    e.finishedWork = null, e.finishedLanes = X;
    var n = e.timeoutHandle;
    if (n !== op && (e.timeoutHandle = op, mD(n)), zt !== null)
      for (var a = zt.return; a !== null; ) {
        var r = a.alternate;
        $y(r, a), a = a.return;
      }
    Bn = e;
    var i = Xi(e.current, null);
    return zt = i, sn = lr = t, un = wr, zs = null, ed = X, Ps = X, td = X, Hs = null, Jn = null, kC(), Aa.discardPendingWarnings(), i;
  }
  function hN(e, t) {
    do {
      var n = zt;
      try {
        if (gc(), zb(), pn(), eh.current = null, n === null || n.return === null) {
          un = Us, zs = t, zt = null;
          return;
        }
        if (ut && n.mode & mt && qc(n, !0), et)
          if (bl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            gS(n, a, sn);
          } else
            vS(n, t, sn);
        dj(e, n.return, n, t, sn), yN(n);
      } catch (r) {
        t = r, zt === n && n !== null ? (n = n.return, zt = n) : n = zt;
        continue;
      }
      return;
    } while (!0);
  }
  function vN() {
    var e = Zm.current;
    return Zm.current = Hc, e === null ? Hc : e;
  }
  function gN(e) {
    Zm.current = e;
  }
  function B1() {
    ah = mn();
  }
  function qs(e) {
    ed = Ie(e, ed);
  }
  function $1() {
    un === wr && (un = Zc);
  }
  function fh() {
    (un === wr || un === Zc || un === Gi) && (un = Fs), Bn !== null && (Tf(ed) || Tf(Ps)) && si(Bn, sn);
  }
  function I1(e) {
    un !== Fs && (un = Gi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Y1() {
    return un === wr;
  }
  function sd(e, t) {
    var n = Je;
    Je |= Cn;
    var a = vN();
    if (Bn !== e || sn !== t) {
      if (_a) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, sn), r.clear()), Kv(e, t);
      }
      _r = Qv(), Ki(e, t);
    }
    Fv(t);
    do
      try {
        q1();
        break;
      } catch (i) {
        hN(e, i);
      }
    while (!0);
    if (gc(), Je = n, gN(a), zt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return zv(), Bn = null, sn = X, un;
  }
  function q1() {
    for (; zt !== null; )
      bN(zt);
  }
  function G1(e, t) {
    var n = Je;
    Je |= Cn;
    var a = vN();
    if (Bn !== e || sn !== t) {
      if (_a) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, sn), r.clear()), Kv(e, t);
      }
      _r = Qv(), Bs(), Ki(e, t);
    }
    Fv(t);
    do
      try {
        W1();
        break;
      } catch (i) {
        hN(e, i);
      }
    while (!0);
    return gc(), gN(a), Je = n, zt !== null ? (ES(), wr) : (zv(), Bn = null, sn = X, un);
  }
  function W1() {
    for (; zt !== null && !QE(); )
      bN(zt);
  }
  function bN(e) {
    var t = e.alternate;
    Mt(e);
    var n;
    (e.mode & mt) !== Te ? (hm(e), n = ph(t, e, lr), qc(e, !0)) : n = ph(t, e, lr), pn(), e.memoizedProps = e.pendingProps, n === null ? yN(e) : zt = n, eh.current = null;
  }
  function yN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Eu) === Oe) {
        Mt(t);
        var r = void 0;
        if ((t.mode & mt) === Te ? r = By(n, t, lr) : (hm(t), r = By(n, t, lr), qc(t, !1)), pn(), r !== null) {
          zt = r;
          return;
        }
      } else {
        var i = $j(n, t);
        if (i !== null) {
          i.flags &= IE, zt = i;
          return;
        }
        if ((t.mode & mt) !== Te) {
          qc(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Eu, a.subtreeFlags = Oe, a.deletions = null;
        else {
          un = th, zt = null;
          return;
        }
      }
      var c = t.sibling;
      if (c !== null) {
        zt = c;
        return;
      }
      t = a, zt = t;
    } while (t !== null);
    un === wr && (un = lN);
  }
  function Qi(e, t, n) {
    var a = Oa(), r = Dn.transition;
    try {
      Dn.transition = null, gn(la), K1(e, t, n, a);
    } finally {
      Dn.transition = r, gn(a);
    }
    return null;
  }
  function K1(e, t, n, a) {
    do
      Mr();
    while (li !== null);
    if (lT(), (Je & (Cn | xa)) !== on)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (uS(i), r === null)
      return Lv(), null;
    if (i === X && d("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = X, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = vn;
    var l = Ie(r.lanes, r.childLanes);
    PS(e, l), e === Bn && (Bn = null, zt = null, sn = X), ((r.subtreeFlags & vl) !== Oe || (r.flags & vl) !== Oe) && (Wi || (Wi = !0, lh = n, vh(wi, function() {
      return Mr(), null;
    })));
    var u = (r.subtreeFlags & (tf | nf | _o | vl)) !== Oe, c = (r.flags & (tf | nf | _o | vl)) !== Oe;
    if (u || c) {
      var h = Dn.transition;
      Dn.transition = null;
      var v = Oa();
      gn(la);
      var C = Je;
      Je |= xa, eh.current = null, Wj(e, r), cy(), s1(e, r, i), oD(e.containerInfo), e.current = r, bS(i), u1(r, e, i), yS(), XE(), Je = C, gn(v), Dn.transition = h;
    } else
      e.current = r, cy();
    var D = Wi;
    if (Wi ? (Wi = !1, li = e, $s = i) : (Jl = 0, rd = null), l = e.pendingLanes, l === X && (Xl = null), D || SN(e.current, !1), rS(r.stateNode, a), _a && e.memoizedUpdaters.clear(), T1(), Zn(e, mn()), t !== null)
      for (var V = e.onRecoverableError, L = 0; L < t.length; L++) {
        var H = t[L], pe = H.stack, Ce = H.digest;
        V(H.value, {
          componentStack: pe,
          digest: Ce
        });
      }
    if (nd) {
      nd = !1;
      var Re = rh;
      throw rh = null, Re;
    }
    return ia($s, Le) && e.tag !== Qr && Mr(), l = e.pendingLanes, ia(l, Le) ? (ej(), e === oh ? Is++ : (Is = 0, oh = e)) : Is = 0, Xr(), Lv(), null;
  }
  function Mr() {
    if (li !== null) {
      var e = Xv($s), t = IS(xr, e), n = Dn.transition, a = Oa();
      try {
        return Dn.transition = null, gn(t), X1();
      } finally {
        gn(a), Dn.transition = n;
      }
    }
    return !1;
  }
  function Q1(e) {
    ih.push(e), Wi || (Wi = !0, vh(wi, function() {
      return Mr(), null;
    }));
  }
  function X1() {
    if (li === null)
      return !1;
    var e = lh;
    lh = null;
    var t = li, n = $s;
    if (li = null, $s = X, (Je & (Cn | xa)) !== on)
      throw new Error("Cannot flush passive effects while already rendering.");
    sh = !0, ad = !1, NS(n);
    var a = Je;
    Je |= xa, v1(t.current), f1(t, t.current, n, e);
    {
      var r = ih;
      ih = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        Jj(t, l);
      }
    }
    xS(), SN(t.current, !0), Je = a, Xr(), ad ? t === rd ? Jl++ : (Jl = 0, rd = t) : Jl = 0, sh = !1, ad = !1, iS(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function NN(e) {
    return Xl !== null && Xl.has(e);
  }
  function J1(e) {
    Xl === null ? Xl = /* @__PURE__ */ new Set([e]) : Xl.add(e);
  }
  function Z1(e) {
    nd || (nd = !0, rh = e);
  }
  var eT = Z1;
  function xN(e, t, n) {
    var a = Yi(n, t), r = by(e, a, Le), i = Zr(e, r, Le), l = $n();
    i !== null && (Fo(i, Le, l), Zn(i, l));
  }
  function xt(e, t, n) {
    if (Yj(n), Ws(!1), e.tag === x) {
      xN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        xN(a, e, n);
        return;
      } else if (a.tag === j) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !NN(i)) {
          var l = Yi(n, e), u = Vm(a, l, Le), c = Zr(a, u, Le), h = $n();
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
    var r = $n();
    Gv(e, n), cT(e), Bn === e && El(sn, n) && (un === Fs || un === Zc && $v(sn) && mn() - ah < oN ? Ki(e, X) : td = Ie(td, n)), Zn(e, r);
  }
  function EN(e, t) {
    t === vn && (t = L1(e));
    var n = $n(), a = Qn(e, t);
    a !== null && (Fo(a, t, n), Zn(a, n));
  }
  function nT(e) {
    var t = e.memoizedState, n = vn;
    t !== null && (n = t.retryLane), EN(e, n);
  }
  function aT(e, t) {
    var n = vn, a;
    switch (e.tag) {
      case te:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case le:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), EN(e, n);
  }
  function rT(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : O1(e / 1960) * 1960;
  }
  function iT() {
    if (Is > V1)
      throw Is = 0, oh = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Jl > A1 && (Jl = 0, rd = null, d("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function lT() {
    Aa.flushLegacyContextWarning(), Aa.flushPendingUnsafeLifecycleWarnings();
  }
  function SN(e, t) {
    Mt(e), ud(e, Hr, D1), t && ud(e, ef, C1), ud(e, Hr, S1), t && ud(e, ef, R1), pn();
  }
  function ud(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Oe ? a = a.child : ((a.flags & t) !== Oe && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cd = null;
  function RN(e) {
    {
      if ((Je & Cn) !== on || !(e.mode & Xe))
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
      var a = Un;
      try {
        Mt(e), d("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? Mt(e) : pn();
      }
    }
  }
  var ph;
  {
    var oT = null;
    ph = function(e, t, n) {
      var a = MN(oT, t);
      try {
        return Uy(e, t, n);
      } catch (i) {
        if (yC() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), zb(), $y(e, t), MN(t, a), t.mode & mt && hm(t), Wd(null, Uy, null, e, t, n), HE()) {
          var r = Kd();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var DN = !1, mh;
  mh = /* @__PURE__ */ new Set();
  function sT(e) {
    if (Ni && !XC())
      switch (e.tag) {
        case R:
        case P:
        case U: {
          var t = zt && ze(zt) || "Unknown", n = t;
          if (!mh.has(n)) {
            mh.add(n);
            var a = ze(e) || "Unknown";
            d("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case j: {
          DN || (d("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), DN = !0);
          break;
        }
      }
  }
  function Gs(e, t) {
    if (_a) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Wv(e, a, t);
      });
    }
  }
  var hh = {};
  function vh(e, t) {
    {
      var n = Ba.current;
      return n !== null ? (n.push(t), hh) : Av(e, t);
    }
  }
  function CN(e) {
    if (e !== hh)
      return KE(e);
  }
  function jN() {
    return Ba.current !== null;
  }
  function uT(e) {
    {
      if (e.mode & Xe) {
        if (!rN())
          return;
      } else if (!_1() || Je !== on || e.tag !== R && e.tag !== P && e.tag !== U)
        return;
      if (Ba.current === null) {
        var t = Un;
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
    e.tag !== Qr && rN() && Ba.current === null && d(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Ws(e) {
    cN = e;
  }
  var Ea = null, Zl = null, dT = function(e) {
    Ea = e;
  };
  function eo(e) {
    {
      if (Ea === null)
        return e;
      var t = Ea(e);
      return t === void 0 ? e : t.current;
    }
  }
  function gh(e) {
    return eo(e);
  }
  function bh(e) {
    {
      if (Ea === null)
        return e;
      var t = Ea(e);
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
  function TN(e, t) {
    {
      if (Ea === null)
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
          (i === $e || i === je) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = Ea(n);
        if (l !== void 0 && l === Ea(a))
          return !0;
      }
      return !1;
    }
  }
  function wN(e) {
    {
      if (Ea === null || typeof WeakSet != "function")
        return;
      Zl === null && (Zl = /* @__PURE__ */ new WeakSet()), Zl.add(e);
    }
  }
  var fT = function(e, t) {
    {
      if (Ea === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Mr(), Or(function() {
        yh(e.current, a, n);
      });
    }
  }, pT = function(e, t) {
    {
      if (e.context !== ua)
        return;
      Mr(), Or(function() {
        Ks(t, e, null, null);
      });
    }
  };
  function yh(e, t, n) {
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
      if (Ea === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var h = !1, v = !1;
      if (c !== null) {
        var C = Ea(c);
        C !== void 0 && (n.has(C) ? v = !0 : t.has(C) && (l === j ? v = !0 : h = !0));
      }
      if (Zl !== null && (Zl.has(e) || a !== null && Zl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || h) {
        var D = Qn(e, Le);
        D !== null && cn(D, e, Le, Dt);
      }
      r !== null && !v && yh(r, t, n), i !== null && yh(i, t, n);
    }
  }
  var mT = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return Nh(e.current, a, n), n;
    }
  };
  function Nh(e, t, n) {
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
      u !== null && t.has(u) && (c = !0), c ? hT(e, n) : a !== null && Nh(a, t, n), r !== null && Nh(r, t, n);
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
  var xh;
  {
    xh = !1;
    try {
      var _N = Object.preventExtensions({});
    } catch {
      xh = !0;
    }
  }
  function gT(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Oe, this.subtreeFlags = Oe, this.deletions = null, this.lanes = X, this.childLanes = X, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !xh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var ca = function(e, t, n, a) {
    return new gT(e, t, n, a);
  };
  function Eh(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function bT(e) {
    return typeof e == "function" && !Eh(e) && e.defaultProps === void 0;
  }
  function yT(e) {
    if (typeof e == "function")
      return Eh(e) ? j : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === De)
        return P;
      if (t === $e)
        return F;
    }
    return M;
  }
  function Xi(e, t) {
    var n = e.alternate;
    n === null ? (n = ca(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Oe, n.subtreeFlags = Oe, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & br, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
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
        n.type = gh(e.type);
        break;
      case P:
        n.type = bh(e.type);
        break;
    }
    return n;
  }
  function NT(e, t) {
    e.flags &= br | Wt;
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
    return e === oc ? (a = Xe, t === !0 && (a |= Pt, a |= Qa)) : a = Te, _a && (a |= mt), ca(x, null, null, a);
  }
  function Sh(e, t, n, a, r, i) {
    var l = M, u = e;
    if (typeof e == "function")
      Eh(e) ? (l = j, u = gh(u)) : u = eo(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case qa:
          return ui(n.children, r, i, t);
        case mi:
          l = oe, r |= Pt, (r & Xe) !== Te && (r |= Qa);
          break;
        case E:
          return ET(n, r, i, t);
        case Ke:
          return ST(n, r, i, t);
        case Ae:
          return RT(n, r, i, t);
        case jt:
          return ON(n, r, i, t);
        case wn:
        case en:
        case Ga:
        case ja:
        case Ct:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Z:
                l = G;
                break e;
              case fe:
                l = ue;
                break e;
              case De:
                l = P, u = bh(u);
                break e;
              case $e:
                l = F;
                break e;
              case je:
                l = ie, u = null;
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
    var v = ca(l, n, t, r);
    return v.elementType = e, v.type = u, v.lanes = i, v._debugOwner = a, v;
  }
  function Rh(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = Sh(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function ui(e, t, n, a) {
    var r = ca(me, e, a, t);
    return r.lanes = n, r;
  }
  function ET(e, t, n, a) {
    typeof e.id != "string" && d('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = ca($, e, a, t | mt);
    return r.elementType = E, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ST(e, t, n, a) {
    var r = ca(te, e, a, t);
    return r.elementType = Ke, r.lanes = n, r;
  }
  function RT(e, t, n, a) {
    var r = ca(le, e, a, t);
    return r.elementType = Ae, r.lanes = n, r;
  }
  function ON(e, t, n, a) {
    var r = ca(q, e, a, t);
    r.elementType = jt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Dh(e, t, n) {
    var a = ca(ee, e, null, t);
    return a.lanes = n, a;
  }
  function DT() {
    var e = ca(k, null, null, Te);
    return e.elementType = "DELETED", e;
  }
  function CT(e) {
    var t = ca(K, null, null, Te);
    return t.stateNode = e, t;
  }
  function Ch(e, t, n) {
    var a = e.children !== null ? e.children : [], r = ca(T, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function MN(e, t) {
    return e === null && (e = ca(M, null, null, Te)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function jT(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = op, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = vn, this.eventTimes = _f(X), this.expirationTimes = _f(Dt), this.pendingLanes = X, this.suspendedLanes = X, this.pingedLanes = X, this.expiredLanes = X, this.mutableReadLanes = X, this.finishedLanes = X, this.entangledLanes = X, this.entanglements = _f(X), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < of; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case oc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Qr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function VN(e, t, n, a, r, i, l, u, c, h) {
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
    return zp(C), v;
  }
  var jh = "18.3.1";
  function TT(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return ft(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: aa,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Th, wh;
  Th = !1, wh = {};
  function AN(e) {
    if (!e)
      return ua;
    var t = pl(e), n = cC(t);
    if (t.tag === j) {
      var a = t.type;
      if (Za(a))
        return ob(t, a, n);
    }
    return n;
  }
  function wT(e, t) {
    {
      var n = pl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Ov(n);
      if (r === null)
        return null;
      if (r.mode & Pt) {
        var i = ze(n) || "Component";
        if (!wh[i]) {
          wh[i] = !0;
          var l = Un;
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
  function LN(e, t, n, a, r, i, l, u) {
    var c = !1, h = null;
    return VN(e, t, c, h, n, a, r, i, l);
  }
  function kN(e, t, n, a, r, i, l, u, c, h) {
    var v = !0, C = VN(n, a, v, e, r, i, l, u, c);
    C.context = AN(null);
    var D = C.current, V = $n(), L = oi(D), H = jr(V, L);
    return H.callback = t ?? null, Zr(D, H, L), k1(C, L, V), C;
  }
  function Ks(e, t, n, a) {
    aS(t, e);
    var r = t.current, i = $n(), l = oi(r);
    SS(l);
    var u = AN(n);
    t.context === null ? t.context = u : t.pendingContext = u, Ni && Un !== null && !Th && (Th = !0, d(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, ze(Un) || "Unknown"));
    var c = jr(i, l);
    c.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && d("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), c.callback = a);
    var h = Zr(r, c, l);
    return h !== null && (cn(h, r, l, i), Ec(h, r, l)), l;
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
        Or(function() {
          var r = Qn(e, Le);
          if (r !== null) {
            var i = $n();
            cn(r, e, Le, i);
          }
        });
        var a = Le;
        _h(e, a);
        break;
      }
    }
  }
  function UN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = FS(n.retryLane, t));
  }
  function _h(e, t) {
    UN(e, t);
    var n = e.alternate;
    n && UN(n, t);
  }
  function OT(e) {
    if (e.tag === te) {
      var t = Ao, n = Qn(e, t);
      if (n !== null) {
        var a = $n();
        cn(n, e, t, a);
      }
      _h(e, t);
    }
  }
  function MT(e) {
    if (e.tag === te) {
      var t = oi(e), n = Qn(e, t);
      if (n !== null) {
        var a = $n();
        cn(n, e, t, a);
      }
      _h(e, t);
    }
  }
  function FN(e) {
    var t = WE(e);
    return t === null ? null : t.stateNode;
  }
  var zN = function(e) {
    return null;
  };
  function VT(e) {
    return zN(e);
  }
  var PN = function(e) {
    return !1;
  };
  function AT(e) {
    return PN(e);
  }
  var HN = null, BN = null, $N = null, IN = null, YN = null, qN = null, GN = null, WN = null, KN = null;
  {
    var QN = function(e, t, n) {
      var a = t[n], r = Ge(e) ? e.slice() : Ye({}, e);
      return n + 1 === t.length ? (Ge(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = QN(e[a], t, n + 1), r);
    }, XN = function(e, t) {
      return QN(e, t, 0);
    }, JN = function(e, t, n, a) {
      var r = t[a], i = Ge(e) ? e.slice() : Ye({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Ge(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = JN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, ZN = function(e, t, n) {
      if (t.length !== n.length) {
        S("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            S("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return JN(e, t, n, 0);
    }, ex = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Ge(e) ? e.slice() : Ye({}, e);
      return i[r] = ex(e[r], t, n + 1, a), i;
    }, tx = function(e, t, n) {
      return ex(e, t, 0, n);
    }, Oh = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    HN = function(e, t, n, a) {
      var r = Oh(e, t);
      if (r !== null) {
        var i = tx(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ye({}, e.memoizedProps);
        var l = Qn(e, Le);
        l !== null && cn(l, e, Le, Dt);
      }
    }, BN = function(e, t, n) {
      var a = Oh(e, t);
      if (a !== null) {
        var r = XN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ye({}, e.memoizedProps);
        var i = Qn(e, Le);
        i !== null && cn(i, e, Le, Dt);
      }
    }, $N = function(e, t, n, a) {
      var r = Oh(e, t);
      if (r !== null) {
        var i = ZN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ye({}, e.memoizedProps);
        var l = Qn(e, Le);
        l !== null && cn(l, e, Le, Dt);
      }
    }, IN = function(e, t, n) {
      e.pendingProps = tx(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Qn(e, Le);
      a !== null && cn(a, e, Le, Dt);
    }, YN = function(e, t) {
      e.pendingProps = XN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Qn(e, Le);
      n !== null && cn(n, e, Le, Dt);
    }, qN = function(e, t, n) {
      e.pendingProps = ZN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Qn(e, Le);
      a !== null && cn(a, e, Le, Dt);
    }, GN = function(e) {
      var t = Qn(e, Le);
      t !== null && cn(t, e, Le, Dt);
    }, WN = function(e) {
      zN = e;
    }, KN = function(e) {
      PN = e;
    };
  }
  function LT(e) {
    var t = Ov(e);
    return t === null ? null : t.stateNode;
  }
  function kT(e) {
    return null;
  }
  function UT() {
    return Un;
  }
  function FT(e) {
    var t = e.findFiberByHostInstance, n = m.ReactCurrentDispatcher;
    return nS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: HN,
      overrideHookStateDeletePath: BN,
      overrideHookStateRenamePath: $N,
      overrideProps: IN,
      overridePropsDeletePath: YN,
      overridePropsRenamePath: qN,
      setErrorHandler: WN,
      setSuspenseHandler: KN,
      scheduleUpdate: GN,
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
      reconcilerVersion: jh
    });
  }
  var nx = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Mh(e) {
    this._internalRoot = e;
  }
  fd.prototype.render = Mh.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? d("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : pd(arguments[1]) ? d("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && d("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== Gt) {
        var a = FN(t.current);
        a && a.parentNode !== n && d("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Ks(e, t, null, null);
  }, fd.prototype.unmount = Mh.prototype.unmount = function() {
    typeof arguments[0] == "function" && d("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      mN() && d("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Or(function() {
        Ks(null, e, null, null);
      }), nb(t);
    }
  };
  function zT(e, t) {
    if (!pd(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    ax(e);
    var n = !1, a = !1, r = "", i = nx;
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ma && d(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = LN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var u = e.nodeType === Gt ? e.parentNode : e;
    return ts(u), new Mh(l);
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
    ax(e), t === void 0 && d("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", c = nx;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (c = n.onRecoverableError));
    var h = kN(t, null, e, oc, a, i, l, u, c);
    if (ec(h.current, e), ts(e), r)
      for (var v = 0; v < r.length; v++) {
        var C = r[v];
        YC(h, C);
      }
    return new fd(h);
  }
  function pd(e) {
    return !!(e && (e.nodeType === Wn || e.nodeType === hr || e.nodeType === Ud));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === Wn || e.nodeType === hr || e.nodeType === Ud || e.nodeType === Gt && e.nodeValue === " react-mount-point-unstable "));
  }
  function ax(e) {
    e.nodeType === Wn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fs(e) && (e._reactRootContainer ? d("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : d("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var BT = m.ReactCurrentOwner, rx;
  rx = function(e) {
    if (e._reactRootContainer && e.nodeType !== Gt) {
      var t = FN(e._reactRootContainer.current);
      t && t.parentNode !== e && d("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Vh(e), r = !!(a && Wr(a));
    r && !n && d("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Wn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Vh(e) {
    return e ? e.nodeType === hr ? e.documentElement : e.firstChild : null;
  }
  function ix() {
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
      var l = kN(
        t,
        a,
        e,
        Qr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        ix
      );
      e._reactRootContainer = l, ec(l.current, e);
      var u = e.nodeType === Gt ? e.parentNode : e;
      return ts(u), Or(), l;
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
      var v = LN(
        e,
        Qr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        ix
      );
      e._reactRootContainer = v, ec(v.current, e);
      var C = e.nodeType === Gt ? e.parentNode : e;
      return ts(C), Or(function() {
        Ks(t, v, n, a);
      }), v;
    }
  }
  function IT(e, t) {
    e !== null && typeof e != "function" && d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function md(e, t, n, a, r) {
    rx(n), IT(r === void 0 ? null : r, "render");
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
  var lx = !1;
  function YT(e) {
    {
      lx || (lx = !0, d("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = BT.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || d("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", rt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
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
  var ox = !1;
  function KT(e) {
    if (ox || (ox = !0, d("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qs(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = fs(e) && e._reactRootContainer === void 0;
      t && d("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Vh(e), a = n && !Wr(n);
        a && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Or(function() {
        md(null, null, e, !1, function() {
          e._reactRootContainer = null, nb(e);
        });
      }), !0;
    } else {
      {
        var r = Vh(e), i = !!(r && Wr(r)), l = e.nodeType === Wn && Qs(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  YS(_T), GS(OT), WS(MT), KS(Oa), QS(BS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && d("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), OE(XR), AE(ch, H1, Or);
  function QT(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!pd(t))
      throw new Error("Target container is not a DOM element.");
    return TT(e, t, null, n);
  }
  function XT(e, t, n, a) {
    return WT(e, t, n, a);
  }
  var Ah = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [Wr, Ol, tc, bv, yv, ch]
  };
  function JT(e, t) {
    return Ah.usingClientEntryPoint || d('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), zT(e, t);
  }
  function ZT(e, t, n) {
    return Ah.usingClientEntryPoint || d('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), HT(e, t, n);
  }
  function ew(e) {
    return mN() && d("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Or(e);
  }
  var tw = FT({
    findFiberByHostInstance: ki,
    bundleType: 1,
    version: jh,
    rendererPackageName: "react-dom"
  });
  if (!tw && Zt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var sx = window.location.protocol;
    /^(https?|file):$/.test(sx) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (sx === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  fa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ah, fa.createPortal = QT, fa.createRoot = JT, fa.findDOMNode = YT, fa.flushSync = ew, fa.hydrate = qT, fa.hydrateRoot = ZT, fa.render = GT, fa.unmountComponentAtNode = KT, fa.unstable_batchedUpdates = ch, fa.unstable_renderSubtreeIntoContainer = XT, fa.version = jh, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
Cx.exports = fa;
var uw = Cx.exports, wx, ux = uw;
{
  var cx = ux.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  wx = function(o, f) {
    cx.usingClientEntryPoint = !0;
    try {
      return ux.createRoot(o, f);
    } finally {
      cx.usingClientEntryPoint = !1;
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
var ci;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(ci || (ci = {}));
const dx = "popstate";
function cw(o) {
  o === void 0 && (o = {});
  function f(g, b) {
    let {
      pathname: S,
      search: d,
      hash: w
    } = g.location;
    return Ph(
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
function $a(o, f) {
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
function fx(o, f) {
  return {
    usr: o.state,
    key: o.key,
    idx: f
  };
}
function Ph(o, f, m, g) {
  return m === void 0 && (m = null), Js({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof f == "string" ? ro(f) : f, {
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
function ro(o) {
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
  } = g, d = b.history, w = ci.Pop, R = null, j = M();
  j == null && (j = 0, d.replaceState(Js({}, d.state, {
    idx: j
  }), ""));
  function M() {
    return (d.state || {
      idx: null
    }).idx;
  }
  function x() {
    w = ci.Pop;
    let oe = M(), ue = oe == null ? null : oe - j;
    j = oe, R && R({
      action: w,
      location: me.location,
      delta: ue
    });
  }
  function T(oe, ue) {
    w = ci.Push;
    let G = Ph(me.location, oe, ue);
    j = M() + 1;
    let P = fx(G, j), $ = me.createHref(G);
    try {
      d.pushState(P, "", $);
    } catch (te) {
      if (te instanceof DOMException && te.name === "DataCloneError")
        throw te;
      b.location.assign($);
    }
    S && R && R({
      action: w,
      location: me.location,
      delta: 1
    });
  }
  function k(oe, ue) {
    w = ci.Replace;
    let G = Ph(me.location, oe, ue);
    j = M();
    let P = fx(G, j), $ = me.createHref(G);
    d.replaceState(P, "", $), S && R && R({
      action: w,
      location: me.location,
      delta: 0
    });
  }
  function ee(oe) {
    let ue = b.location.origin !== "null" ? b.location.origin : b.location.href, G = typeof oe == "string" ? oe : Zs(oe);
    return G = G.replace(/ $/, "%20"), At(ue, "No window.location.(origin|href) available to create URL for href: " + G), new URL(G, ue);
  }
  let me = {
    get action() {
      return w;
    },
    get location() {
      return o(b, d);
    },
    listen(oe) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return b.addEventListener(dx, x), R = oe, () => {
        b.removeEventListener(dx, x), R = null;
      };
    },
    createHref(oe) {
      return f(b, oe);
    },
    createURL: ee,
    encodeLocation(oe) {
      let ue = ee(oe);
      return {
        pathname: ue.pathname,
        search: ue.search,
        hash: ue.hash
      };
    },
    push: T,
    replace: k,
    go(oe) {
      return d.go(oe);
    }
  };
  return me;
}
var px;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(px || (px = {}));
function pw(o, f, m) {
  return m === void 0 && (m = "/"), mw(o, f, m);
}
function mw(o, f, m, g) {
  let b = typeof f == "string" ? ro(f) : f, S = fi(b.pathname || "/", m);
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
    let j = Lr([g, R.relativePath]), M = m.concat(R);
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
const vw = /^:[\w-]+$/, gw = 3, bw = 2, yw = 1, Nw = 10, xw = -2, mx = (o) => o === "*";
function Ew(o, f) {
  let m = o.split("/"), g = m.length;
  return m.some(mx) && (g += xw), f && (g += bw), m.filter((b) => !mx(b)).reduce((b, S) => b + (vw.test(S) ? gw : S === "" ? yw : Nw), g);
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
    let R = g[w], j = w === g.length - 1, M = S === "/" ? f : f.slice(S.length) || "/", x = Hh({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: j
    }, M), T = R.route;
    if (!x)
      return null;
    Object.assign(b, x.params), d.push({
      // TODO: Can this as be avoided?
      params: b,
      pathname: Lr([S, x.pathname]),
      pathnameBase: _w(Lr([S, x.pathnameBase])),
      route: T
    }), x.pathnameBase !== "/" && (S = Lr([S, x.pathnameBase]));
  }
  return d;
}
function Hh(o, f) {
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
        let me = w[x] || "";
        d = S.slice(0, S.length - me.length).replace(/(.)\/+$/, "$1");
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
  f === void 0 && (f = !1), m === void 0 && (m = !0), $a(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
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
    return $a(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + f + ").")), o;
  }
}
function fi(o, f) {
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
  } = typeof o == "string" ? ro(o) : o;
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
function Lh(o, f, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + f + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ww(o) {
  return o.filter((f, m) => m === 0 || f.route.path && f.route.path.length > 0);
}
function Gh(o, f) {
  let m = ww(o);
  return f ? m.map((g, b) => b === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Wh(o, f, m, g) {
  g === void 0 && (g = !1);
  let b;
  typeof o == "string" ? b = ro(o) : (b = Js({}, o), At(!b.pathname || !b.pathname.includes("?"), Lh("?", "pathname", "search", b)), At(!b.pathname || !b.pathname.includes("#"), Lh("#", "pathname", "hash", b)), At(!b.search || !b.search.includes("#"), Lh("#", "search", "hash", b)));
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
const Lr = (o) => o.join("/").replace(/\/\/+/g, "/"), _w = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Ow = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Mw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
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
const Kh = /* @__PURE__ */ y.createContext(null);
Kh.displayName = "DataRouterState";
const Lw = /* @__PURE__ */ y.createContext(null);
Lw.displayName = "Await";
const Ra = /* @__PURE__ */ y.createContext(null);
Ra.displayName = "Navigation";
const au = /* @__PURE__ */ y.createContext(null);
au.displayName = "Location";
const Ya = /* @__PURE__ */ y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ya.displayName = "Route";
const Qh = /* @__PURE__ */ y.createContext(null);
Qh.displayName = "RouteError";
function kw(o, f) {
  let {
    relative: m
  } = f === void 0 ? {} : f;
  io() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: b
  } = y.useContext(Ra), {
    hash: S,
    pathname: d,
    search: w
  } = ru(o, {
    relative: m
  }), R = d;
  return g !== "/" && (R = d === "/" ? g : Lr([g, d])), b.createHref({
    pathname: R,
    search: w,
    hash: S
  });
}
function io() {
  return y.useContext(au) != null;
}
function Ji() {
  return io() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(au).location;
}
const Vx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ax(o) {
  y.useContext(Ra).static || y.useLayoutEffect(o);
}
function Xh() {
  let {
    isDataRoute: o
  } = y.useContext(Ya);
  return o ? Xw() : Uw();
}
function Uw() {
  io() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = y.useContext(nu), {
    basename: f,
    future: m,
    navigator: g
  } = y.useContext(Ra), {
    matches: b
  } = y.useContext(Ya), {
    pathname: S
  } = Ji(), d = JSON.stringify(Gh(b, m.v7_relativeSplatPath)), w = y.useRef(!1);
  return Ax(() => {
    w.current = !0;
  }), y.useCallback(function(j, M) {
    if (M === void 0 && (M = {}), $a(w.current, Vx), !w.current) return;
    if (typeof j == "number") {
      g.go(j);
      return;
    }
    let x = Wh(j, JSON.parse(d), S, M.relative === "path");
    o == null && f !== "/" && (x.pathname = x.pathname === "/" ? f : Lr([f, x.pathname])), (M.replace ? g.replace : g.push)(x, M.state, M);
  }, [f, g, d, S, o]);
}
function Fw() {
  let {
    matches: o
  } = y.useContext(Ya), f = o[o.length - 1];
  return f ? f.params : {};
}
function ru(o, f) {
  let {
    relative: m
  } = f === void 0 ? {} : f, {
    future: g
  } = y.useContext(Ra), {
    matches: b
  } = y.useContext(Ya), {
    pathname: S
  } = Ji(), d = JSON.stringify(Gh(b, g.v7_relativeSplatPath));
  return y.useMemo(() => Wh(o, JSON.parse(d), S, m === "path"), [o, d, S, m]);
}
function zw(o, f) {
  return Pw(o, f);
}
function Pw(o, f, m, g) {
  io() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: b
  } = y.useContext(Ra), {
    matches: S
  } = y.useContext(Ya), d = S[S.length - 1], w = d ? d.params : {}, R = d ? d.pathname : "/", j = d ? d.pathnameBase : "/", M = d && d.route;
  {
    let G = M && M.path || "";
    kx(R, !M || G.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + G + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + G + '"> to <Route ') + ('path="' + (G === "/" ? "*" : G + "/*") + '">.'));
  }
  let x = Ji(), T;
  if (f) {
    var k;
    let G = typeof f == "string" ? ro(f) : f;
    j === "/" || (k = G.pathname) != null && k.startsWith(j) || At(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + j + '" ') + ('but pathname "' + G.pathname + '" was given in the `location` prop.')), T = G;
  } else
    T = x;
  let ee = T.pathname || "/", me = ee;
  if (j !== "/") {
    let G = j.replace(/^\//, "").split("/");
    me = "/" + ee.replace(/^\//, "").split("/").slice(G.length).join("/");
  }
  let oe = pw(o, {
    pathname: me
  });
  $a(M || oe != null, 'No routes matched location "' + T.pathname + T.search + T.hash + '" '), $a(oe == null || oe[oe.length - 1].route.element !== void 0 || oe[oe.length - 1].route.Component !== void 0 || oe[oe.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + T.pathname + T.search + T.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ue = Yw(oe && oe.map((G) => Object.assign({}, G, {
    params: Object.assign({}, w, G.params),
    pathname: Lr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(G.pathname).pathname : G.pathname
    ]),
    pathnameBase: G.pathnameBase === "/" ? j : Lr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(G.pathnameBase).pathname : G.pathnameBase
    ])
  })), S, m, g);
  return f && ue ? /* @__PURE__ */ y.createElement(au.Provider, {
    value: {
      location: eu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, T),
      navigationType: ci.Pop
    }
  }, ue) : ue;
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
    return this.state.error !== void 0 ? /* @__PURE__ */ y.createElement(Ya.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ y.createElement(Qh.Provider, {
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
  return b && b.static && b.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (b.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ y.createElement(Ya.Provider, {
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
    let k, ee = !1, me = null, oe = null;
    m && (k = w && x.route.id ? w[x.route.id] : void 0, me = x.route.errorElement || Bw, R && (j < 0 && T === 0 ? (kx("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), ee = !0, oe = null) : j === T && (ee = !0, oe = x.route.hydrateFallbackElement || null)));
    let ue = f.concat(d.slice(0, T + 1)), G = () => {
      let P;
      return k ? P = me : ee ? P = oe : x.route.Component ? P = /* @__PURE__ */ y.createElement(x.route.Component, null) : x.route.element ? P = x.route.element : P = M, /* @__PURE__ */ y.createElement(Iw, {
        match: x,
        routeContext: {
          outlet: M,
          matches: ue,
          isDataRoute: m != null
        },
        children: P
      });
    };
    return m && (x.route.ErrorBoundary || x.route.errorElement || T === 0) ? /* @__PURE__ */ y.createElement($w, {
      location: m.location,
      revalidation: m.revalidation,
      component: me,
      error: k,
      children: G(),
      routeContext: {
        outlet: null,
        matches: ue,
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
function Jh(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qw(o) {
  let f = y.useContext(nu);
  return f || At(!1, Jh(o)), f;
}
function Gw(o) {
  let f = y.useContext(Kh);
  return f || At(!1, Jh(o)), f;
}
function Ww(o) {
  let f = y.useContext(Ya);
  return f || At(!1, Jh(o)), f;
}
function Zh(o) {
  let f = Ww(o), m = f.matches[f.matches.length - 1];
  return m.route.id || At(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function Kw() {
  return Zh(tu.UseRouteId);
}
function Qw() {
  var o;
  let f = y.useContext(Qh), m = Gw(tu.UseRouteError), g = Zh(tu.UseRouteError);
  return f !== void 0 ? f : (o = m.errors) == null ? void 0 : o[g];
}
function Xw() {
  let {
    router: o
  } = qw(Lx.UseNavigateStable), f = Zh(tu.UseNavigateStable), m = y.useRef(!1);
  return Ax(() => {
    m.current = !0;
  }), y.useCallback(function(b, S) {
    S === void 0 && (S = {}), $a(m.current, Vx), m.current && (typeof b == "number" ? o.navigate(b) : o.navigate(b, eu({
      fromRouteId: f
    }, S)));
  }, [o, f]);
}
const hx = {};
function kx(o, f, m) {
  !f && !hx[o] && (hx[o] = !0, $a(!1, m));
}
const vx = {};
function Jw(o, f) {
  vx[f] || (vx[f] = !0, console.warn(f));
}
const gx = (o, f, m) => Jw(o, "⚠️ React Router Future Flag Warning: " + f + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Zw(o, f) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && gx("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && gx("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function e_(o) {
  let {
    to: f,
    replace: m,
    state: g,
    relative: b
  } = o;
  io() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: S,
    static: d
  } = y.useContext(Ra);
  $a(!d, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: w
  } = y.useContext(Ya), {
    pathname: R
  } = Ji(), j = Xh(), M = Wh(f, Gh(w, S.v7_relativeSplatPath), R, b === "path"), x = JSON.stringify(M);
  return y.useEffect(() => j(JSON.parse(x), {
    replace: m,
    state: g,
    relative: b
  }), [j, x, b, m, g]), null;
}
function sr(o) {
  At(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function t_(o) {
  let {
    basename: f = "/",
    children: m = null,
    location: g,
    navigationType: b = ci.Pop,
    navigator: S,
    static: d = !1,
    future: w
  } = o;
  io() && At(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = f.replace(/^\/*/, "/"), j = y.useMemo(() => ({
    basename: R,
    navigator: S,
    static: d,
    future: eu({
      v7_relativeSplatPath: !1
    }, w)
  }), [R, w, S, d]);
  typeof g == "string" && (g = ro(g));
  let {
    pathname: M = "/",
    search: x = "",
    hash: T = "",
    state: k = null,
    key: ee = "default"
  } = g, me = y.useMemo(() => {
    let oe = fi(M, R);
    return oe == null ? null : {
      location: {
        pathname: oe,
        search: x,
        hash: T,
        state: k,
        key: ee
      },
      navigationType: b
    };
  }, [R, M, x, T, k, ee, b]);
  return $a(me != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + M + x + T + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), me == null ? null : /* @__PURE__ */ y.createElement(Ra.Provider, {
    value: j
  }, /* @__PURE__ */ y.createElement(au.Provider, {
    children: m,
    value: me
  }));
}
function n_(o) {
  let {
    children: f,
    location: m
  } = o;
  return zw(Bh(f), m);
}
new Promise(() => {
});
function Bh(o, f) {
  f === void 0 && (f = []);
  let m = [];
  return y.Children.forEach(o, (g, b) => {
    if (!/* @__PURE__ */ y.isValidElement(g))
      return;
    let S = [...f, b];
    if (g.type === y.Fragment) {
      m.push.apply(m, Bh(g.props.children, S));
      return;
    }
    g.type !== sr && At(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || At(!1, "An index route cannot have child routes.");
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
    g.props.children && (d.children = Bh(g.props.children, S)), m.push(d);
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
function ao() {
  return ao = Object.assign ? Object.assign.bind() : function(o) {
    for (var f = 1; f < arguments.length; f++) {
      var m = arguments[f];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, ao.apply(this, arguments);
}
function ev(o, f) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), b, S;
  for (S = 0; S < g.length; S++)
    b = g[S], !(f.indexOf(b) >= 0) && (m[b] = o[b]);
  return m;
}
const vd = "get", gd = "application/x-www-form-urlencoded";
function Dd(o) {
  return o != null && typeof o.tagName == "string";
}
function a_(o) {
  return Dd(o) && o.tagName.toLowerCase() === "button";
}
function r_(o) {
  return Dd(o) && o.tagName.toLowerCase() === "form";
}
function i_(o) {
  return Dd(o) && o.tagName.toLowerCase() === "input";
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
function kh(o) {
  return o != null && !u_.has(o) ? ($a(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + gd + '"')), null) : o;
}
function c_(o, f) {
  let m, g, b, S, d;
  if (r_(o)) {
    let w = o.getAttribute("action");
    g = w ? fi(w, f) : null, m = o.getAttribute("method") || vd, b = kh(o.getAttribute("enctype")) || gd, S = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let w = o.form;
    if (w == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || w.getAttribute("action");
    if (g = R ? fi(R, f) : null, m = o.getAttribute("formmethod") || w.getAttribute("method") || vd, b = kh(o.getAttribute("formenctype")) || kh(w.getAttribute("enctype")) || gd, S = new FormData(w, o), !s_()) {
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
    if (Dd(o))
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
const v_ = "startTransition", bx = ow[v_];
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
    j && bx ? bx(() => R(x)) : R(x);
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
const b_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", y_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, no = /* @__PURE__ */ y.forwardRef(function(f, m) {
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
  } = f, T = ev(f, d_), {
    basename: k
  } = y.useContext(Ra), ee, me = !1;
  if (typeof j == "string" && y_.test(j) && (ee = j, b_))
    try {
      let P = new URL(window.location.href), $ = j.startsWith("//") ? new URL(P.protocol + j) : new URL(j), te = fi($.pathname, k);
      $.origin === P.origin && te != null ? j = te + $.search + $.hash : me = !0;
    } catch {
      $a(!1, '<Link to="' + j + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let oe = kw(j, {
    relative: b
  }), ue = S_(j, {
    replace: d,
    state: w,
    target: R,
    preventScrollReset: M,
    relative: b,
    viewTransition: x
  });
  function G(P) {
    g && g(P), P.defaultPrevented || ue(P);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ y.createElement("a", ao({}, T, {
      href: ee || oe,
      onClick: me || S ? g : G,
      ref: m,
      target: R
    }))
  );
});
no.displayName = "Link";
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
  } = f, x = ev(f, f_), T = ru(R, {
    relative: x.relative
  }), k = Ji(), ee = y.useContext(Kh), {
    navigator: me,
    basename: oe
  } = y.useContext(Ra), ue = ee != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(T) && j === !0, G = me.encodeLocation ? me.encodeLocation(T).pathname : T.pathname, P = k.pathname, $ = ee && ee.navigation && ee.navigation.location ? ee.navigation.location.pathname : null;
  b || (P = P.toLowerCase(), $ = $ ? $.toLowerCase() : null, G = G.toLowerCase()), $ && oe && ($ = fi($, oe) || $);
  const te = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let F = P === G || !d && P.startsWith(G) && P.charAt(te) === "/", U = $ != null && ($ === G || !d && $.startsWith(G) && $.charAt(G.length) === "/"), ie = {
    isActive: F,
    isPending: U,
    isTransitioning: ue
  }, J = F ? g : void 0, K;
  typeof S == "function" ? K = S(ie) : K = [S, F ? "active" : null, U ? "pending" : null, ue ? "transitioning" : null].filter(Boolean).join(" ");
  let le = typeof w == "function" ? w(ie) : w;
  return /* @__PURE__ */ y.createElement(no, ao({}, x, {
    "aria-current": J,
    className: K,
    ref: m,
    style: le,
    to: R,
    viewTransition: j
  }), typeof M == "function" ? M(ie) : M);
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
  } = o, k = ev(o, p_), ee = j_(), me = T_(R, {
    relative: M
  }), oe = w.toLowerCase() === "get" ? "get" : "post", ue = (G) => {
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
  return /* @__PURE__ */ y.createElement("form", ao({
    ref: f,
    method: oe,
    action: me,
    onSubmit: b ? j : ue
  }, k));
});
x_.displayName = "Form";
var Ed;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(Ed || (Ed = {}));
var yx;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(yx || (yx = {}));
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
  } = f === void 0 ? {} : f, R = Xh(), j = Ji(), M = ru(o, {
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
  } = Fx(Ed.UseSubmit), {
    basename: f
  } = y.useContext(Ra), m = Kw();
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
  } = y.useContext(Ra), b = y.useContext(Ya);
  b || At(!1, "useFormAction must be used inside a RouteContext");
  let [S] = b.matches.slice(-1), d = ao({}, ru(o || ".", {
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
  return (!o || o === ".") && S.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (d.pathname = d.pathname === "/" ? g : Lr([g, d.pathname])), Zs(d);
}
function w_(o, f) {
  f === void 0 && (f = {});
  let m = y.useContext(Ux);
  m == null && At(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = Fx(Ed.useViewTransitionState), b = ru(o, {
    relative: f.relative
  });
  if (!m.isTransitioning)
    return !1;
  let S = fi(m.currentLocation.pathname, g) || m.currentLocation.pathname, d = fi(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return Hh(b.pathname, d) != null || Hh(b.pathname, S) != null;
}
function __() {
  const [o, f] = y.useState(null), [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [M, x] = y.useState(""), [T, k] = y.useState(!1), [ee, me] = y.useState(!1);
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
  function oe(P) {
    const $ = (P == null ? void 0 : P.code) || "", te = (P == null ? void 0 : P.message) || "";
    return $.includes("invalid-email") ? "Please enter a valid email address." : $.includes("user-not-found") ? "No account found with that email." : $.includes("wrong-password") || $.includes("invalid-credential") || te.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : $.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : $.includes("network-request-failed") ? "Network error. Check your connection and try again." : te || "Something went wrong.";
  }
  async function ue(P) {
    P.preventDefault(), j(""), x(""), k(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), te = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: F, setPersistence: U, browserLocalPersistence: ie, browserSessionPersistence: J, signInWithEmailAndPassword: K } = te, le = F();
      await U(le, d ? ie : J);
      const q = await (await K(le, m.trim(), b)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: q }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch ($) {
      j(oe($));
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
      j(oe(P));
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
      /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: ue, children: [
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
            /* @__PURE__ */ s.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": ee ? "Hide password" : "Show password", onClick: () => me((P) => !P), children: "👁️" }, void 0, !1, {
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
  const [o, f] = y.useState(null), [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(""), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, me] = y.useState(""), [oe, ue] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), [F, U] = y.useState(!1);
  y.useEffect(() => {
    const K = typeof window < "u" ? window : void 0, le = K && K.__FIREBASE__ ? K.__FIREBASE__ : null;
    f({
      apiKey: le && le.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: le && le.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: le && le.projectId || void 0 || "fresh-basket-a8933",
      appId: le && le.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: le && le.messagingSenderId || void 0 || "163656027399",
      measurementId: le && le.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ie(K) {
    const le = (K == null ? void 0 : K.code) || "";
    return le.includes("email-already-in-use") ? "An account with this email already exists." : le.includes("weak-password") ? "Password should be at least 6 characters." : le.includes("invalid-email") ? "Please enter a valid email address." : le.includes("network-request-failed") ? "Network error. Check your connection and try again." : (K == null ? void 0 : K.message) || "Something went wrong.";
  }
  async function J(K) {
    K.preventDefault(), k(""), me(""), ue(!0);
    try {
      const le = String(m).trim(), we = String(b).trim(), q = we.replace(/\D+/g, ""), ye = { fn: !le, cn: !we };
      if (te(ye.fn), U(ye.cn || q.length < 7), ye.fn || ye.cn) {
        k("Please fill in required fields");
        return;
      }
      if (q.length < 7) {
        k("Please enter a valid mobile number");
        return;
      }
      if (R !== M) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Ne = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Y, createUserWithEmailAndPassword: W } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), de = Y(), He = await (await W(de, d.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: He, profile: { fullName: le, contactNumber: we } }) })).ok) throw new Error("Session creation failed");
      me("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (le) {
      k(ie(le));
    } finally {
      ue(!1);
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
            const le = String(K.target.value).trim().replace(/\D+/g, "");
            U(!(le.length >= 7));
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
      /* @__PURE__ */ s.jsxDEV("button", { className: "auth-button", disabled: oe, type: "submit", children: oe ? "Creating account…" : "Create account" }, void 0, !1, {
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
function Ar({ children: o }) {
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
  const f = Xh();
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
        /* @__PURE__ */ s.jsxDEV(no, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), f("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(no, { to: "/orders", onClick: (m) => {
          m.preventDefault(), f("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(no, { to: "/riders", onClick: (m) => {
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
            /* @__PURE__ */ s.jsxDEV(no, { className: "dropdown-item", to: "/settings", onClick: (m) => {
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
  const [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, me] = y.useState(!1), [oe, ue] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), F = "+92";
  function U(J) {
    const K = String(J || "").replace(/\D+/g, "");
    return K.length === 0 ? "" : K.startsWith("92") ? F + K.slice(2) : F + K;
  }
  U(d);
  async function ie() {
    x(""), k(""), te(!0);
    const J = String(m), K = String(b).trim(), le = String(d).trim(), we = le.replace(/\D+/g, ""), q = { fn: !K, cn: !le, pw: !J };
    if (me(q.fn), ue(q.cn || we.length < 7), P(q.pw), q.fn || q.cn || q.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (we.length !== 10) {
      x("numbers should be 10 digit"), ue(!0);
      return;
    }
    if (J.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const ye = U(le), Ne = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: J, fullName: K, contactNumber: ye })
      }), Y = await Ne.json().catch(() => null);
      if (!Ne.ok) {
        const W = String(Y && (Y.error || Y.message) || ""), de = W.toUpperCase();
        /MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(W) || /MISSING\s*PASSWORD/i.test(W) ? (x("Full name, mobile and password are required"), me(!K), ue(!le || we.length !== 10), P(!J)) : de.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(W) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(W) ? (ue(!0), x("numbers should be 10 digit")) : /FIREBASE NOT CONFIGURED/i.test(W) ? x("Service temporarily unavailable. Please try again later.") : x(W || "Failed to create rider");
        return;
      }
      k("Rider created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (ye) {
      const Ne = String((ye == null ? void 0 : ye.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(Ne) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(Ne) || /AT LEAST 6 CHARACTERS/i.test(Ne) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(Ne) ? (ue(!0), x("numbers should be 10 digit")) : x(Ne || "Failed to create rider");
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
          S(J.target.value), $ && me(!String(J.target.value).trim());
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
                w(K), $ && ue(K.length !== 10);
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: ie, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
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
  }, [o]), [S, d] = y.useState(g), [w, R] = y.useState(b), [j, M] = y.useState(!1), [x, T] = y.useState(""), [k, ee] = y.useState(""), [me, oe] = y.useState(!1), ue = "+92";
  function G($) {
    const te = String($ || "").replace(/\D+/g, "");
    return te.length === 0 ? "" : te.startsWith("92") ? ue + te.slice(2) : ue + te;
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
        const F = await te.json().catch(() => null), U = F && (F.data || F) || {}, ie = U.rider || U || {};
        if (!$) return;
        const J = String(ie.displayName || ie.name || "").trim(), K = String(ie.contactNumber || "").replace(/\D+/g, "");
        J && d(J), K && R(K.slice(-10));
      } catch {
      }
    })(), () => {
      $ = !1;
    };
  }, [o == null ? void 0 : o.id]);
  async function P() {
    oe(!0), T(""), ee("");
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
      const ie = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(U)
      }), J = await ie.json().catch(() => ({}));
      if (ie.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!ie.ok) {
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
              className: "field-input phone-input-field" + (me && (w && w.replace(/\D+/g, "").length !== 10 ? " input-error" : "")),
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
const Sd = "app.settings.fares", Sa = {
  baseFare: 0,
  farePerKm: 2
};
function zx() {
  if (typeof window > "u" || !window.localStorage)
    return { ...Sa };
  try {
    const o = window.localStorage.getItem(Sd);
    if (!o)
      return { ...Sa };
    const f = JSON.parse(o), m = Number(f == null ? void 0 : f.baseFare), g = Number(f == null ? void 0 : f.farePerKm);
    return {
      baseFare: Number.isFinite(m) ? m : Sa.baseFare,
      farePerKm: Number.isFinite(g) ? g : Sa.farePerKm
    };
  } catch {
    return { ...Sa };
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
    const Y = /* @__PURE__ */ new Date(), W = new Date(Y.getFullYear(), Y.getMonth(), 1), de = `${W.getFullYear()}-${String(W.getMonth() + 1).padStart(2, "0")}-${String(W.getDate()).padStart(2, "0")}`, Ve = `${Y.getFullYear()}-${String(Y.getMonth() + 1).padStart(2, "0")}-${String(Y.getDate()).padStart(2, "0")}`;
    return { from: de, to: Ve };
  }, f = y.useMemo(() => o(), []), [m, g] = y.useState([]), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [M, x] = y.useState(1), [T, k] = y.useState(20), [ee, me] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [oe, ue] = y.useState(!1), [G, P] = y.useState(null), [$, te] = y.useState(Sa), [F, U] = y.useState(f.from), [ie, J] = y.useState(f.to), [K, le] = y.useState(/* @__PURE__ */ new Map());
  y.useEffect(() => {
    function Y() {
      te(zx());
    }
    Y();
    function W(de) {
      de.key === Sd && Y();
    }
    return typeof window < "u" && (window.addEventListener("storage", W), window.addEventListener("fare-settings-changed", Y)), () => {
      typeof window < "u" && (window.removeEventListener("storage", W), window.removeEventListener("fare-settings-changed", Y));
    };
  }, []), y.useEffect(() => {
    let Y = !0;
    return (async () => {
      var W, de, Ve, He;
      w(!0), j("");
      try {
        const ot = new URLSearchParams();
        b && ot.set("q", b), ot.set("page", String(M)), ot.set("limit", String(T));
        const Pe = await fetch(`/api/riders?${ot.toString()}`, { credentials: "include" });
        if (Pe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Pe.ok) throw new Error("Failed to load riders");
        const et = await Pe.json();
        Y && (g(Array.isArray(et.riders) ? et.riders : []), me({ total: ((W = et.meta) == null ? void 0 : W.total) || 0, page: ((de = et.meta) == null ? void 0 : de.page) || 1, limit: ((Ve = et.meta) == null ? void 0 : Ve.limit) || T, pages: ((He = et.meta) == null ? void 0 : He.pages) || 1 }));
      } catch (ot) {
        Y && j(ot.message || "Failed to load riders");
      } finally {
        Y && w(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, [b, M, T]), y.useEffect(() => {
    if (!F || !ie || !m.length) {
      le(/* @__PURE__ */ new Map());
      return;
    }
    const Y = new AbortController(), W = Y.signal;
    let de = !1;
    const Ve = (() => {
      const Pe = typeof navigator < "u" && Number.isFinite(Number(navigator.hardwareConcurrency)) ? Number(navigator.hardwareConcurrency) : 8;
      return Math.max(2, Math.min(8, Math.floor(Pe / 2)));
    })();
    le(/* @__PURE__ */ new Map());
    const He = m.map((Pe) => async () => {
      const et = `${Pe.id}:${F}:${ie}`;
      try {
        const ut = await fetch(`/api/riders/${Pe.id}/km-in-range?fromDate=${F}&toDate=${ie}`, { credentials: "include", signal: W });
        if (ut.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ut.ok) {
          const Qt = await ut.text().catch(() => String(ut.status));
          console.error(`km-in-range error for ${Pe.id}:`, ut.status, Qt);
          return;
        }
        const bn = await ut.json();
        if (de || W.aborted) return;
        le((Qt) => {
          const Lt = new Map(Qt);
          return Lt.set(et, {
            km: bn.totalKm || 0,
            rideCount: bn.rideCount || 0,
            performancePct: bn.performancePct || 0
          }), Lt;
        });
      } catch (ut) {
        if (ut && ut.name === "AbortError") return;
        console.error(`km-in-range fetch error for ${Pe.id}:`, ut);
      }
    });
    async function ot(Pe, et) {
      let ut = 0;
      const bn = new Array(Math.min(et, Pe.length)).fill(0).map(async () => {
        for (; !de && !W.aborted; ) {
          const Qt = ut++;
          if (Qt >= Pe.length) break;
          await Pe[Qt]();
        }
      });
      await Promise.all(bn);
    }
    return ot(He, Ve), () => {
      de = !0, Y.abort();
    };
  }, [F, ie, m]);
  const we = y.useMemo(() => m.filter((Y) => {
    if (b && !String(Y.name || "").toLowerCase().includes(b.toLowerCase().trim())) return !1;
    if (F || ie) {
      const W = Number(Y.lastActiveDays ?? 0), de = F ? new Date(F) : null, Ve = ie ? new Date(ie) : null;
      if (de && Ve) {
        const He = Math.floor((Date.now() - de.getTime()) / 864e5), ot = Math.floor((Date.now() - Ve.getTime()) / (1e3 * 60 * 60 * 24));
        if (W < ot || W > He) return !1;
      } else if (de) {
        const He = Math.floor((Date.now() - de.getTime()) / 864e5);
        if (W > He) return !1;
      } else if (Ve) {
        const He = Math.floor((Date.now() - Ve.getTime()) / 864e5);
        if (W < He) return !1;
      }
    }
    return !0;
  }), [m, b, F, ie]), q = y.useMemo(() => {
    const Y = Number($.farePerKm);
    return Number.isFinite(Y) ? Y : Sa.farePerKm;
  }, [$]), ye = y.useMemo(() => {
    const Y = Number($.baseFare);
    return Number.isFinite(Y) ? Y : Sa.baseFare;
  }, [$]);
  y.useEffect(() => {
    if (!Array.isArray(m) || m.length === 0) return;
    const Y = {};
    for (const W of m) {
      if (!W || W.id === void 0 || W.id === null) continue;
      const de = Number(W.performancePct);
      Number.isFinite(de) && (Y[W.id] = Math.round(de));
    }
    Object.keys(Y).length !== 0 && k_(Y);
  }, [m]);
  const Ne = y.useMemo(() => {
    const Y = /* @__PURE__ */ new Date(), W = [], de = [];
    for (let Ve = 2; Ve >= 0; Ve--) {
      const He = new Date(Y.getFullYear(), Y.getMonth() - Ve, 1), ot = `${He.getFullYear()}-${String(He.getMonth() + 1).padStart(2, "0")}`, Pe = He.toLocaleString(void 0, { month: "short", year: "numeric" });
      W.push(ot), de.push(Pe);
    }
    return { keys: W, labels: de };
  }, []);
  return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-management", children: [
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
      /* @__PURE__ */ s.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => ue(!0), children: "Create Rider" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: ie, onChange: (Y) => {
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
      oe && /* @__PURE__ */ s.jsxDEV(V_, { onClose: () => ue(!1), onCreated: () => {
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
            g((W) => W.map((de) => String(de.id) === String(Y.id) ? { ...de, name: Y.displayName || Y.name || de.name, contactNumber: Y.contactNumber ?? de.contactNumber } : de)), P(null);
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
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-month", children: "Range" }, Ne.keys[Ne.keys.length - 1], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 306,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-earnings", children: (() => {
            const Y = Ne.keys[Ne.keys.length - 2], W = String(Y).split("-"), de = parseInt(W[0], 10), Ve = parseInt(W[1], 10);
            return `Earnings (${new Date(Number.isFinite(de) ? de : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(Ve) ? Ve - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
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
              if (F && ie) {
                const de = `${Y.id}:${F}:${ie}`, Ve = K.get(de);
                if (!Ve) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading range" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 327,
                  columnNumber: 42
                }, this);
                const He = (Ve == null ? void 0 : Ve.km) ?? 0;
                return `${Number(He).toFixed(2)} km`;
              }
              return `${Number(((W = Y.monthlyCounts) == null ? void 0 : W[Ne.keys[Ne.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            (() => {
              var He, ot;
              if (F && ie) {
                const Pe = `${Y.id}:${F}:${ie}`;
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
              let W = 0, de = 0;
              if (F && ie) {
                const Pe = `${Y.id}:${F}:${ie}`, et = K.get(Pe);
                W = (et == null ? void 0 : et.km) ?? 0, de = (et == null ? void 0 : et.rideCount) ?? 0;
              } else {
                const Pe = Ne.keys[Ne.keys.length - 2];
                W = Number(((He = Y.monthlyCounts) == null ? void 0 : He[Pe]) || 0);
                const et = Array.isArray(Y.orders) ? Y.orders : [];
                de = Number(((ot = Y.monthlyRideCounts) == null ? void 0 : ot[Pe]) ?? H_(et, Pe) ?? 0);
              }
              const Ve = W * q + de * ye;
              return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(Ve) ? `${Ve.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 356,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-performance", children: (() => {
              if (F && ie) {
                const W = `${Y.id}:${F}:${ie}`, de = K.get(W);
                if (!de) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading performance" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 362,
                  columnNumber: 42
                }, this);
                const Ve = (de == null ? void 0 : de.performancePct) ?? 0;
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
                    const de = await fetch(`/api/riders/${encodeURIComponent(Y.id)}`, { method: "DELETE", credentials: "include" });
                    if (de.status === 401) {
                      window.location.href = "/auth/login";
                      return;
                    }
                    if (!de.ok) {
                      const Ve = await de.text().catch(() => "");
                      alert(Ve || "Failed to delete");
                      return;
                    }
                    g((Ve) => Ve.filter((He) => String(He.id) !== String(Y.id))), me((Ve) => ({ ...Ve, total: Math.max(0, (Ve.total || 1) - 1) }));
                  } catch (de) {
                    alert(String((de == null ? void 0 : de.message) || "Failed to delete"));
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
const $h = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, Nx = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
function Ia(o) {
  return o !== null && typeof o == "object";
}
function di(o) {
  if (o == null) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      const f = o.toDate();
      if (f instanceof Date && !Number.isNaN(f.getTime())) return f;
    } catch {
      return null;
    }
  if (Ia(o) && o.seconds !== void 0) {
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
  if (Ia(o)) {
    if (o.at) return di(o.at);
    if (o.value && o.value !== o) return di(o.value);
    if (o.expectedAt) return di(o.expectedAt);
  }
  return null;
}
function Rd(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const f = o.trim();
    if (!f) return null;
    if ($h.test(f)) return parseFloat(f.replace($h, "$1"));
    if (Nx.test(f)) return parseFloat(f.replace(Nx, "$1")) / 60;
    const m = Number(f);
    return Number.isFinite(m) ? m : null;
  }
  if (Ia(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const f = Rd(o.duration);
      if (f !== null) return f;
    }
    if (o.value !== void 0 && o.value !== o) {
      const f = Rd(o.value);
      if (f !== null) return f;
    }
  }
  return null;
}
function $_(o) {
  var m, g, b, S, d, w;
  if (!Ia(o)) return null;
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
    const j = Rd(R);
    if (j !== null) return j;
  }
  return null;
}
function I_(o) {
  var m, g, b, S;
  if (!Ia(o)) return null;
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
  if (!Ia(o)) return null;
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
function Uh(o) {
  if (!Ia(o)) return null;
  const f = Bx(o);
  return f ?? null;
}
function bd(o) {
  if (!Ia(o)) return null;
  const f = $_(o);
  if (Number.isFinite(f)) return f;
  const m = di(I_(o)), g = di(Bx(o));
  if (m instanceof Date && g instanceof Date) {
    const b = m.getTime() - g.getTime();
    if (b >= 0)
      return Math.round(b / 6e4);
  }
  return null;
}
function Ih(o) {
  const f = di(o);
  if (!(f instanceof Date) || Number.isNaN(f.getTime())) return "-";
  try {
    return f.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function Yh(o) {
  if (o == null) return "-";
  if (Ia(o) && o.minutes !== void 0) {
    const m = Number(o.minutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  const f = di(o);
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
    const g = m.match($h);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : m;
  }
  if (Ia(o) && o.expectedMinutes !== void 0) {
    const m = Number(o.expectedMinutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  return String(o);
}
function yd(o) {
  var g, b, S, d, w, R, j, M;
  if (!Ia(o)) return null;
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
function qh(o) {
  const f = Rd(o);
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
    return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
    return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: S }, void 0, !1, {
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
    return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
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
          const ee = T.name || T.orderId, me = di(T.created_at), oe = me instanceof Date && !Number.isNaN(me.getTime()) ? me.toISOString().slice(0, 10) : "-", ue = Ih(T.deliveryStartTime), G = yd(T), P = Yh(G), $ = bd(T), te = qh($), F = Number(T.distance_km), U = Number.isFinite(F) ? `${F.toFixed(2)} km` : typeof T.distance_km == "string" && T.distance_km.trim() ? T.distance_km : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-cell", children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km date-cell", children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 96,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: ue }, void 0, !1, {
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
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, M] = y.useState(""), [x, T] = y.useState(""), [k, ee] = y.useState(""), [me, oe] = y.useState(!0), [ue, G] = y.useState(!0), [P, $] = y.useState(""), [te, F] = y.useState(""), [U, ie] = y.useState(!1);
  y.useEffect(() => {
    let q = !0;
    return (async () => {
      oe(!0), $("");
      try {
        const ye = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load riders");
        const Ne = await ye.json();
        q && b(Array.isArray(Ne.riders) ? Ne.riders : []);
      } catch (ye) {
        q && $(ye.message || "Failed to load riders");
      } finally {
        q && oe(!1);
      }
    })(), () => {
      q = !1;
    };
  }, []), y.useEffect(() => {
    let q = !0;
    return (async () => {
      G(!0), F("");
      try {
        const ye = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load packers");
        const Ne = await ye.json();
        q && d(Array.isArray(Ne.packers) ? Ne.packers : []);
      } catch (ye) {
        q && F(ye.message || "Failed to load packers");
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
    ie(!0);
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
      const ye = await q.json().catch(() => null);
      if (!q.ok) throw new Error(ye && ye.error ? ye.error : "Assign failed");
      const Ne = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (Ne.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const Y = await Ne.json().catch(() => null);
      if (!Ne.ok) throw new Error(Y && Y.error ? Y.error : "Assign failed");
      m && m({ orderId: o, riderId: w, packerId: j, paymentMethod: x.trim(), amount: k.trim() });
      try {
        window && typeof window.showToast == "function" && window.showToast("Order assigned successfully", { type: "success" });
      } catch {
      }
      f();
    } catch (q) {
      alert(q.message || "Failed to assign");
    } finally {
      ie(!1);
    }
  }
  const K = P || "", le = te || "", we = me || ue;
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
                  [...g].sort((q, ye) => q.name.localeCompare(ye.name)).map((q) => /* @__PURE__ */ s.jsxDEV("option", { value: q.id, children: q.name }, q.id, !1, {
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
                  [...S].sort((q, ye) => q.name.localeCompare(ye.name)).map((q) => /* @__PURE__ */ s.jsxDEV("option", { value: q.id, children: q.name }, q.id, !1, {
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
          le && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: le }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 35
          }, this),
          S.length === 0 && !le && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
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
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, M] = y.useState(""), [x, T] = y.useState(""), [k, ee] = y.useState(""), [me, oe] = y.useState(!0), [ue, G] = y.useState(""), [P, $] = y.useState(!1);
  y.useEffect(() => {
    let F = !0;
    return (async () => {
      var U;
      oe(!0), G("");
      try {
        const ie = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (ie.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ie.ok) throw new Error("Failed to load riders");
        const J = await ie.json();
        if (F) {
          b(Array.isArray(J.riders) ? J.riders : []);
          const K = ((U = o.assignment) == null ? void 0 : U.riderId) || o.riderId || o.rider_id || "";
          R(String(K));
        }
      } catch (ie) {
        F && G(ie.message || "Failed to load riders");
      } finally {
        F && oe(!1);
      }
    })(), () => {
      F = !1;
    };
  }, [o]), y.useEffect(() => {
    let F = !0;
    return (async () => {
      var U;
      try {
        const ie = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (ie.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ie.ok) throw new Error("Failed to load packers");
        const J = await ie.json();
        if (F) {
          d(Array.isArray(J.packers) ? J.packers : []);
          const K = ((U = o.assignment) == null ? void 0 : U.packerId) || o.packed_by || o.packer_id || "";
          M(String(K));
        }
      } catch (ie) {
        F && G(ie.message || "Failed to load packers");
      }
    })(), () => {
      F = !1;
    };
  }, [o]), y.useEffect(() => {
    var ie, J;
    const F = ((ie = o.assignment) == null ? void 0 : ie.paymentMethod) || o.paymentMethod || "", U = ((J = o.assignment) == null ? void 0 : J.amount) || o.amount || "";
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
      const ie = await U.json().catch(() => null);
      if (!U.ok) throw new Error(ie && ie.error ? ie.error : "Update failed");
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-body", children: me ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 113,
      columnNumber: 13
    }, this) : /* @__PURE__ */ s.jsxDEV(s.Fragment, { children: [
      ue && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: ue }, void 0, !1, {
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
          g.length === 0 && !ue && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
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
          S.length === 0 && !ue && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
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
function Nd(o) {
  if (typeof o != "string") return "";
  const f = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return f === "in_transit" ? "in_progress" : f;
}
function Ix(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function xx(o) {
  return Nd(Ix(o));
}
const W_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], Fh = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function K_() {
  const [o, f] = y.useState([]), [m, g] = y.useState(""), [b, S] = y.useState("all"), [d, w] = y.useState(1), [R, j] = y.useState(20), [M, x] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [T, k] = y.useState(!0), [ee, me] = y.useState(""), [oe, ue] = y.useState(""), [G, P] = y.useState(!0), [$, te] = y.useState(0), [F, U] = y.useState(!1), [ie, J] = y.useState(null), [K, le] = y.useState(!1), [we, q] = y.useState(null), [ye, Ne] = y.useState(!1), [Y, W] = y.useState(null), [de, Ve] = y.useState(""), [He, ot] = y.useState("");
  y.useEffect(() => {
    let Q = !0;
    return (async () => {
      var Be, ct, tt, yt;
      k(!0), me(""), ue("");
      try {
        const ft = new URLSearchParams();
        if (m && ft.set("q", m), b && b !== "all") {
          const wt = Fh[b] || b;
          ft.set("status", Nd(wt));
        }
        ft.set("page", String(d)), ft.set("limit", String(R));
        const kt = await fetch(`/api/orders?${ft.toString()}`, { credentials: "include" });
        if (kt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!kt.ok) throw new Error("Failed to load orders");
        const Et = await kt.json();
        Q && (f(Array.isArray(Et.orders) ? Et.orders : []), ue(Et.shopifyError || ""), P(!!Et.shopifyConfigured), x({ total: ((Be = Et.meta) == null ? void 0 : Be.total) || 0, page: ((ct = Et.meta) == null ? void 0 : ct.page) || 1, limit: ((tt = Et.meta) == null ? void 0 : tt.limit) || R, pages: ((yt = Et.meta) == null ? void 0 : yt.pages) || 1 }));
      } catch (ft) {
        Q && me(ft.message || "Failed to load orders");
      } finally {
        Q && k(!1);
      }
    })(), () => {
      Q = !1;
    };
  }, [m, b, d, R, $]);
  function Pe(Q) {
    const Be = [Q.created_at, Q.createdAt, Q.expected_delivery_time, Q.expectedDeliveryTime, Q.deliveryStartTime, Q.deliveryStartTime, Q.actual_delivery_time, Q.actualDeliveryTime];
    for (const ct of Be) {
      if (!ct) continue;
      const tt = Date.parse(String(ct));
      if (!Number.isNaN(tt)) return new Date(tt);
    }
    return null;
  }
  async function et() {
    var Q, Be, ct, tt;
    try {
      const yt = de ? /* @__PURE__ */ new Date(de + "T00:00:00") : null, ft = He ? /* @__PURE__ */ new Date(He + "T23:59:59") : null, kt = new URLSearchParams();
      if (m && kt.set("q", m), b && b !== "all") {
        const ae = Fh[b] || b;
        kt.set("status", Nd(ae));
      }
      const Et = 200;
      let wt = [], Yt = 1;
      const Ut = new URLSearchParams(kt.toString());
      Ut.set("page", String(Yt)), Ut.set("limit", String(Et));
      let Bt = await fetch(`/api/orders?${Ut.toString()}`, { credentials: "include" });
      if (Bt.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!Bt.ok) throw new Error("Failed to load orders for export");
      let Tn = await Bt.json();
      wt = wt.concat(Array.isArray(Tn.orders) ? Tn.orders : []);
      const Ft = ((Q = Tn.meta) == null ? void 0 : Q.pages) || 1;
      for (let ae = 2; ae <= Ft; ae++) {
        const qe = new URLSearchParams(kt.toString());
        qe.set("page", String(ae)), qe.set("limit", String(Et));
        const dt = await fetch(`/api/orders?${qe.toString()}`, { credentials: "include" });
        if (dt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!dt.ok) continue;
        const Nt = await dt.json();
        Array.isArray(Nt.orders) && (wt = wt.concat(Nt.orders));
      }
      const $t = [], dn = ["Order", "Customer", "Address", "Rider", "Packer", "Start", "Expected", "Actual", "Amount", "Payment Method", "Status"];
      $t.push(dn.map((ae) => `"${ae.replace(/"/g, '""')}"`).join(","));
      for (const ae of wt) {
        const qe = Pe(ae);
        if (yt && (!qe || qe < yt) || ft && (!qe || qe > ft)) continue;
        const dt = ae.name || ae.order_number || ae.id || "", Nt = ae.full_name || ae.customer && ae.customer.full_name || "";
        let gt = "-";
        typeof ae.shipping_address == "string" && String(ae.shipping_address).trim() ? gt = String(ae.shipping_address).trim() : ae.shipping_address && typeof ae.shipping_address == "object" ? gt = [ae.shipping_address.address1 || "", ae.shipping_address.city || "", ae.shipping_address.province || "", ae.shipping_address.country || ""].map((pa) => String(pa || "").trim()).filter(Boolean).join(", ") || "-" : typeof ae.billing_address == "string" && String(ae.billing_address).trim() ? gt = String(ae.billing_address).trim() : ae.billing_address && typeof ae.billing_address == "object" && (gt = [ae.billing_address.address1 || "", ae.billing_address.city || "", ae.billing_address.province || "", ae.billing_address.country || ""].map((pa) => String(pa || "").trim()).filter(Boolean).join(", ") || "-");
        const fn = ae.rider ? String(ae.rider) : (Be = ae.assignment) != null && Be.riderId ? String(ae.assignment.riderId) : "Unassigned", _t = ae.packerName || (ae.packed_by ? String(ae.packed_by) : ""), bt = typeof Uh == "function" ? Ih(Uh(ae)) : "", Ot = typeof yd == "function" ? Yh(yd(ae)) : "", ta = typeof bd == "function" ? qh(bd(ae)) : "", na = ae.amount || ((ct = ae.assignment) == null ? void 0 : ct.amount) || "", Gn = ae.paymentMethod || ((tt = ae.assignment) == null ? void 0 : tt.paymentMethod) || "", Da = (ae.current_status || ae.order_status || ae.status || "").toString(), ur = [dt, Nt, gt, fn, _t, bt, Ot, ta, na, Gn, Da].map((pa) => `"${String(pa || "").replace(/"/g, '""')}"`).join(",");
        $t.push(ur);
      }
      const ea = $t.join(`
`), qn = new Blob([ea], { type: "text/csv;charset=utf-8;" }), se = URL.createObjectURL(qn), xe = document.createElement("a");
      xe.href = se, xe.download = `orders_${de || "all"}_${He || "all"}.csv`, document.body.appendChild(xe), xe.click(), xe.remove(), URL.revokeObjectURL(se);
    } catch (yt) {
      try {
        window && typeof window.showToast == "function" && window.showToast(yt.message || "Failed to generate CSV", { type: "error" });
      } catch {
      }
    }
  }
  y.useMemo(() => o, [o]);
  const ut = y.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (b === "all") return o.slice();
    const Q = Nd(Fh[b] || b);
    return o.filter((Be) => xx(Be) === Q);
  }, [o, b]);
  function bn() {
    J(null), U(!1);
  }
  function Qt(Q) {
    q(Q), le(!0);
  }
  function Lt() {
    q(null), le(!1);
  }
  function kn(Q) {
    W(Q), Ne(!0);
  }
  function Xt() {
    W(null), Ne(!1);
  }
  function Jt(Q) {
    try {
      const { orderId: Be } = Q || {};
      if (!Be) return;
      const ct = String(Be).replace(/^#+/, "");
      w(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${Be}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function Zt(Q) {
    if (Q)
      try {
        const Be = await fetch(`/api/orders/${encodeURIComponent(Q)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (Be.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Be.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${Q}`, { type: "success" });
        } catch {
        }
        w(1), te((ct) => ct + 1);
      } catch (Be) {
        try {
          window && typeof window.showToast == "function" && window.showToast(Be.message || "Failed to unassign order", { type: "error" });
        } catch {
        }
      }
  }
  return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-header-left", children: [
        /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 235,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 236,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 234,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-date-range", children: [
        /* @__PURE__ */ s.jsxDEV("label", { className: "date-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "sr-only", children: "From date" }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 241,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "From date", className: "date-input", type: "date", value: de, onChange: (Q) => Ve(Q.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 242,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 240,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "date-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "sr-only", children: "To date" }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 245,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "To date", className: "date-input", type: "date", value: He, onChange: (Q) => ot(Q.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 246,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 244,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip download-csv-btn", onClick: et, children: "Download CSV" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 248,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 239,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 233,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ s.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 254,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (Q) => {
          g(Q.target.value), w(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 255,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 253,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: W_.map(({ key: Q, label: Be }) => /* @__PURE__ */ s.jsxDEV("button", { className: `rc-select rc-chip${b === Q ? " active" : ""}`, onClick: () => {
        S(Q), w(1);
      }, "data-filter": Q, children: Be }, Q, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 259,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 257,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 252,
      columnNumber: 9
    }, this),
    !G && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 267,
      columnNumber: 11
    }, this),
    oe && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: oe }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 269,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper orders-table-scroll", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 275,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 276,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 277,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 278,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-packer packer-heading", children: "Packer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 279,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 280,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 281,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 282,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-amount amount-heading", children: "Amount" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 283,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-payment payment-heading", children: "Payment Method" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 284,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 285,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actions actions-heading", children: "Actions" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 286,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 274,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 273,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("tbody", { children: [
        T && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 291,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 291,
          columnNumber: 17
        }, this),
        !T && ee && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "auth-error", children: ee }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 294,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 294,
          columnNumber: 17
        }, this),
        !T && !ee && ut.map((Q, Be) => {
          var ea, qn, se;
          const ct = Ix(Q), tt = xx(Q), yt = Q.full_name || (Q.customer && Q.customer.full_name ? Q.customer.full_name : "");
          let ft = "-";
          typeof Q.shipping_address == "string" && String(Q.shipping_address).trim() ? ft = String(Q.shipping_address).trim() : Q.shipping_address && typeof Q.shipping_address == "object" ? ft = [Q.shipping_address.address1 || "", Q.shipping_address.city || "", Q.shipping_address.province || "", Q.shipping_address.country || ""].map((xe) => String(xe || "").trim()).filter(Boolean).join(", ") || "-" : typeof Q.billing_address == "string" && String(Q.billing_address).trim() ? ft = String(Q.billing_address).trim() : Q.billing_address && typeof Q.billing_address == "object" && (ft = [Q.billing_address.address1 || "", Q.billing_address.city || "", Q.billing_address.province || "", Q.billing_address.country || ""].map((xe) => String(xe || "").trim()).filter(Boolean).join(", ") || "-");
          const kt = Q.name || Q.order_number || Q.id, Et = kt != null ? String(kt).replace(/^#+/, "").trim() : "", wt = Et || "-", Yt = Uh(Q), Ut = Ih(Yt), Bt = yd(Q), Tn = Yh(Bt), Ft = bd(Q), $t = qh(Ft), dn = Q.rider ? String(Q.rider) : (ea = Q.assignment) != null && ea.riderId ? String(Q.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": tt, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-id-cell", children: wt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 325,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km customer-cell", children: yt || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 326,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf address-cell", children: ft }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 327,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-rider rider-cell", children: dn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 328,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-packer packer-cell", children: Q.packerName || (Q.packed_by ? String(Q.packed_by) : "-") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 329,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Ut }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 330,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Tn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 331,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: $t }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 332,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-amount amount-cell", children: Q.amount || ((qn = Q.assignment) == null ? void 0 : qn.amount) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 333,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-payment payment-cell", children: Q.paymentMethod || ((se = Q.assignment) == null ? void 0 : se.paymentMethod) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 334,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ s.jsxDEV("span", { className: `status-chip status-${tt}`, children: ct }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 336,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 335,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actions actions-cell", children: /* @__PURE__ */ s.jsxDEV("div", { className: "actions-container", children: [
              tt === "assigned" && /* @__PURE__ */ s.jsxDEV(
                "button",
                {
                  className: "status-unassign-btn icon-black",
                  onClick: () => Zt(Et),
                  "aria-label": "Unassign order",
                  title: "Unassign order",
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 347,
                    columnNumber: 151
                  }, this) }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 347,
                    columnNumber: 29
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 341,
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
                  disabled: tt !== "delivered",
                  onClick: () => tt === "delivered" && kn(Q),
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: [
                    /* @__PURE__ */ s.jsxDEV("path", { d: "M21 5h-3.17l-1.41-1.41A2 2 0 0 0 15 3H9a2 2 0 0 0-1.41.59L6.17 5H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 13H3V7h4.05l1.41-1.41.01-.01L9 5h6l.53.58L17.95 7H21v11z" }, void 0, !1, {
                      fileName: "/app/code/client/pages/Orders.jsx",
                      lineNumber: 357,
                      columnNumber: 149
                    }, this),
                    /* @__PURE__ */ s.jsxDEV("path", { d: "M12 8a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 8zm0 8a3 3 0 1 1 .001-6.001A3 3 0 0 1 12 16z" }, void 0, !1, {
                      fileName: "/app/code/client/pages/Orders.jsx",
                      lineNumber: 357,
                      columnNumber: 351
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 357,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 350,
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
                    lineNumber: 365,
                    columnNumber: 149
                  }, this) }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 365,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 359,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 339,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 338,
              columnNumber: 21
            }, this)
          ] }, kt || Be, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 324,
            columnNumber: 19
          }, this);
        }),
        !T && !ee && ut.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 373,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 373,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 289,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 272,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 271,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      F && ie && /* @__PURE__ */ s.jsxDEV($x, { orderId: ie, onClose: bn, onAssigned: Jt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 380,
        columnNumber: 11
      }, this),
      K && we && /* @__PURE__ */ s.jsxDEV(q_, { order: we, onClose: Lt, onUpdated: () => {
        te((Q) => Q + 1), Lt();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 383,
        columnNumber: 11
      }, this),
      ye && Y && /* @__PURE__ */ s.jsxDEV(G_, { order: Y, onClose: Xt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 386,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || T, onClick: () => w((Q) => Math.max(1, Q - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 389,
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
          lineNumber: 390,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || T, onClick: () => w((Q) => Math.min(M.pages, Q + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 391,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 388,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 378,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 232,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 231,
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
  }, []), /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
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
  const [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, me] = y.useState(!1), [oe, ue] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), F = "+92";
  function U(J) {
    const K = String(J || "").replace(/\D+/g, "");
    return K.length === 0 ? "" : K.startsWith("92") ? F + K.slice(2) : F + K;
  }
  async function ie() {
    x(""), k(""), te(!0);
    const J = String(m), K = String(b).trim(), le = String(d).trim(), we = le.replace(/\D+/g, ""), q = { fn: !K, cn: !le, pw: !J };
    if (me(q.fn), ue(q.cn || we.length !== 10), P(q.pw), q.fn || q.cn || q.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (we.length !== 10) {
      x("numbers should be 10 digit"), ue(!0);
      return;
    }
    if (J.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const ye = U(le), Ne = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: J, fullName: K, contactNumber: ye })
      }), Y = await Ne.json().catch(() => null);
      if (!Ne.ok) {
        const W = String(Y && (Y.error || Y.message) || ""), de = W.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(W) || /MISSING\s*PASSWORD/i.test(W))
          x("Full name, mobile and password are required"), me(!K), ue(!le || we.length !== 10), P(!J);
        else if (de.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(W))
          P(!0), x("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(W))
          ue(!0), x("numbers should be 10 digit");
        else if (/FIREBASE NOT CONFIGURED/i.test(W))
          x("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(W || "Failed to create packer");
        return;
      }
      k("Packer created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (ye) {
      const Ne = String((ye == null ? void 0 : ye.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(Ne) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(Ne) || /AT LEAST 6 CHARACTERS/i.test(Ne) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(Ne) ? (ue(!0), x("numbers should be 10 digit")) : x(Ne || "Failed to create packer");
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
          S(J.target.value), $ && me(!String(J.target.value).trim());
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
                w(K), $ && ue(K.length !== 10);
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: ie, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
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
      var U, ie, J, K;
      g(!0), S("");
      try {
        const le = new URLSearchParams();
        le.set("limit", String(R)), le.set("page", String(d)), le.set("status", "new");
        const we = await fetch(`/api/orders?${le.toString()}`, { credentials: "include" });
        if (we.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!we.ok) throw new Error("Failed to load orders");
        const q = await we.json();
        F && (f(Array.isArray(q.orders) ? q.orders : []), x({ total: ((U = q.meta) == null ? void 0 : U.total) || 0, page: ((ie = q.meta) == null ? void 0 : ie.page) || d, limit: ((J = q.meta) == null ? void 0 : J.limit) || R, pages: ((K = q.meta) == null ? void 0 : K.pages) || 1 }));
      } catch (le) {
        F && S(le.message || "Failed to load orders");
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
  const [k, ee] = y.useState(!1), [me, oe] = y.useState(null), [ue, G] = y.useState(!1);
  function P(F) {
    oe(F), ee(!0);
  }
  function $() {
    oe(null), ee(!1);
  }
  function te(F) {
    try {
      const { orderId: U } = F || {};
      if (!U) return;
      const ie = String(U).replace(/^#+/, "");
      f((J) => J.filter((K, le) => {
        const we = String(K.id || K.name || K.order_number || le).replace(/^#+/, "");
        return String(we) !== String(ie);
      })), x((J) => ({ ...J || {}, total: Math.max(0, ((J == null ? void 0 : J.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${U}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "dashboard-orders", children: [
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
        !m && !b && (Array.isArray(o) ? o.filter((U) => T(U) === "new") : []).map((U, ie) => {
          const J = T(U), K = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let le = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? le = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? le = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((W) => String(W || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? le = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (le = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((W) => String(W || "").trim()).filter(Boolean).join(", ") || "-");
          const we = U.name || U.order_number || U.id || ie, q = String(U.id || U.name || U.order_number || ie).replace(/^#+/, ""), ye = U.created_at ? new Date(U.created_at) : null, Ne = ye ? ye.toLocaleDateString() : "-", Y = ye ? ye.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-address", children: le }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-date", children: Ne }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-time", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ s.jsxDEV("button", { className: "order-action btn-manage", onClick: () => P(String(U.id || U.name || U.order_number || ie)), children: "Assign" }, void 0, !1, {
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
    k && me && /* @__PURE__ */ s.jsxDEV($x, { orderId: me, onClose: $, onAssigned: te }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    ue && /* @__PURE__ */ s.jsxDEV(X_, { onClose: () => G(!1), onCreated: () => {
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
  const [o, f] = y.useState(Sa.baseFare), [m, g] = y.useState(Sa.farePerKm), [b, S] = y.useState(!1);
  y.useEffect(() => {
    const R = zx();
    f(R.baseFare), g(R.farePerKm);
  }, []);
  function d() {
    S(!0);
    try {
      const R = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.setItem(Sd, JSON.stringify(R));
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
    f(Sa.baseFare), g(Sa.farePerKm);
    try {
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.removeItem(Sd);
        try {
          window.dispatchEvent(new Event("fare-settings-changed"));
        } catch {
        }
      }
    } catch {
    }
  }
  return /* @__PURE__ */ s.jsxDEV(Ar, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
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
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/auth/login", element: /* @__PURE__ */ s.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/auth/register", element: /* @__PURE__ */ s.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/riders", element: /* @__PURE__ */ s.jsxDEV(B_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/riders/:id", element: /* @__PURE__ */ s.jsxDEV(Y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/orders", element: /* @__PURE__ */ s.jsxDEV(K_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/reports", element: /* @__PURE__ */ s.jsxDEV(Q_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/dashboard", element: /* @__PURE__ */ s.jsxDEV(J_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "/settings", element: /* @__PURE__ */ s.jsxDEV(Z_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 42
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(sr, { path: "*", element: /* @__PURE__ */ s.jsxDEV(e_, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
