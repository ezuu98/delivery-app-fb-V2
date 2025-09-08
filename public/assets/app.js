function Aw(c, m) {
  for (var h = 0; h < m.length; h++) {
    const b = m[h];
    if (typeof b != "string" && !Array.isArray(b)) {
      for (const N in b)
        if (N !== "default" && !(N in c)) {
          const C = Object.getOwnPropertyDescriptor(b, N);
          C && Object.defineProperty(c, N, C.get ? C : {
            enumerable: !0,
            get: () => b[N]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }));
}
function Uw(c) {
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
    var h = "18.3.1", b = Symbol.for("react.element"), N = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), D = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), B = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), X = Symbol.iterator, pe = "@@iterator";
    function P(s) {
      if (s === null || typeof s != "object")
        return null;
      var y = X && s[X] || s[pe];
      return typeof y == "function" ? y : null;
    }
    var q = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, ie = {
      transition: null
    }, H = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, le = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, se = {}, $e = null;
    function K(s) {
      $e = s;
    }
    se.setExtraStackFrame = function(s) {
      $e = s;
    }, se.getCurrentStack = null, se.getStackAddendum = function() {
      var s = "";
      $e && (s += $e);
      var y = se.getCurrentStack;
      return y && (s += y() || ""), s;
    };
    var je = !1, _e = !1, Ae = !1, be = !1, Ye = !1, Xe = {
      ReactCurrentDispatcher: q,
      ReactCurrentBatchConfig: ie,
      ReactCurrentOwner: le
    };
    Xe.ReactDebugCurrentFrame = se, Xe.ReactCurrentActQueue = H;
    function Je(s) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), A = 1; A < y; A++)
          L[A - 1] = arguments[A];
        jt("warn", s, L);
      }
    }
    function we(s) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), A = 1; A < y; A++)
          L[A - 1] = arguments[A];
        jt("error", s, L);
      }
    }
    function jt(s, y, L) {
      {
        var A = Xe.ReactDebugCurrentFrame, G = A.getStackAddendum();
        G !== "" && (y += "%s", L = L.concat([G]));
        var ge = L.map(function(ue) {
          return String(ue);
        });
        ge.unshift("Warning: " + y), Function.prototype.apply.call(console[s], console, ge);
      }
    }
    var da = {};
    function Bn(s, y) {
      {
        var L = s.constructor, A = L && (L.displayName || L.name) || "ReactClass", G = A + "." + y;
        if (da[G])
          return;
        we("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", y, A), da[G] = !0;
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
      enqueueReplaceState: function(s, y, L, A) {
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
      enqueueSetState: function(s, y, L, A) {
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
      var tr = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Ua = function(s, y) {
        Object.defineProperty(bn.prototype, s, {
          get: function() {
            Je("%s(...) is deprecated in plain JavaScript React classes. %s", y[0], y[1]);
          }
        });
      };
      for (var Qt in tr)
        tr.hasOwnProperty(Qt) && Ua(Qt, tr[Qt]);
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
        return we("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Nn(s)), $t(s);
    }
    function nr(s, y, L) {
      var A = s.displayName;
      if (A)
        return A;
      var G = y.displayName || y.name || "";
      return G !== "" ? L + "(" + G + ")" : L;
    }
    function ma(s) {
      return s.displayName || "Context";
    }
    function Vn(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && we("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case C:
          return "Fragment";
        case N:
          return "Portal";
        case _:
          return "Profiler";
        case f:
          return "StrictMode";
        case x:
          return "Suspense";
        case z:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case D:
            var y = s;
            return ma(y) + ".Consumer";
          case R:
            var L = s;
            return ma(L._context) + ".Provider";
          case M:
            return nr(s, s.render, "ForwardRef");
          case B:
            var A = s.displayName || null;
            return A !== null ? A : Vn(s.type) || "Memo";
          case W: {
            var G = s, ge = G._payload, ue = G._init;
            try {
              return Vn(ue(ge));
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
    }, En, ka, wt;
    wt = {};
    function Sn(s) {
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
    function Lr(s, y) {
      var L = function() {
        En || (En = !0, we("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: L,
        configurable: !0
      });
    }
    function ar(s, y) {
      var L = function() {
        ka || (ka = !0, we("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(s, "ref", {
        get: L,
        configurable: !0
      });
    }
    function J(s) {
      if (typeof s.ref == "string" && le.current && s.__self && le.current.stateNode !== s.__self) {
        var y = Vn(le.current.type);
        wt[y] || (we('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y, s.ref), wt[y] = !0);
      }
    }
    var de = function(s, y, L, A, G, ge, ue) {
      var Ce = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: b,
        // Built-in properties that belong on the element
        type: s,
        key: y,
        ref: L,
        props: ue,
        // Record the component responsible for creating this element.
        _owner: ge
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
        value: A
      }), Object.defineProperty(Ce, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.freeze && (Object.freeze(Ce.props), Object.freeze(Ce)), Ce;
    };
    function Ve(s, y, L) {
      var A, G = {}, ge = null, ue = null, Ce = null, Fe = null;
      if (y != null) {
        Sn(y) && (ue = y.ref, J(y)), Mn(y) && (ea(y.key), ge = "" + y.key), Ce = y.__self === void 0 ? null : y.__self, Fe = y.__source === void 0 ? null : y.__source;
        for (A in y)
          cn.call(y, A) && !Zt.hasOwnProperty(A) && (G[A] = y[A]);
      }
      var et = arguments.length - 2;
      if (et === 1)
        G.children = L;
      else if (et > 1) {
        for (var lt = Array(et), ot = 0; ot < et; ot++)
          lt[ot] = arguments[ot + 2];
        Object.freeze && Object.freeze(lt), G.children = lt;
      }
      if (s && s.defaultProps) {
        var Ue = s.defaultProps;
        for (A in Ue)
          G[A] === void 0 && (G[A] = Ue[A]);
      }
      if (ge || ue) {
        var mt = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
        ge && Lr(G, mt), ue && ar(G, mt);
      }
      return de(s, ge, ue, Ce, Fe, le.current, G);
    }
    function Ze(s, y) {
      var L = de(s.type, y, s.ref, s._self, s._source, s._owner, s.props);
      return L;
    }
    function st(s, y, L) {
      if (s == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + s + ".");
      var A, G = Ht({}, s.props), ge = s.key, ue = s.ref, Ce = s._self, Fe = s._source, et = s._owner;
      if (y != null) {
        Sn(y) && (ue = y.ref, et = le.current), Mn(y) && (ea(y.key), ge = "" + y.key);
        var lt;
        s.type && s.type.defaultProps && (lt = s.type.defaultProps);
        for (A in y)
          cn.call(y, A) && !Zt.hasOwnProperty(A) && (y[A] === void 0 && lt !== void 0 ? G[A] = lt[A] : G[A] = y[A]);
      }
      var ot = arguments.length - 2;
      if (ot === 1)
        G.children = L;
      else if (ot > 1) {
        for (var Ue = Array(ot), mt = 0; mt < ot; mt++)
          Ue[mt] = arguments[mt + 2];
        G.children = Ue;
      }
      return de(s.type, ge, ue, Ce, Fe, et, G);
    }
    function ht(s) {
      return typeof s == "object" && s !== null && s.$$typeof === b;
    }
    var yt = ".", fn = ":";
    function bt(s) {
      var y = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, A = s.replace(y, function(G) {
        return L[G];
      });
      return "$" + A;
    }
    var rt = !1, Nt = /\/+/g;
    function va(s) {
      return s.replace(Nt, "$&/");
    }
    function ha(s, y) {
      return typeof s == "object" && s !== null && s.key != null ? (ea(s.key), bt("" + s.key)) : y.toString(36);
    }
    function ta(s, y, L, A, G) {
      var ge = typeof s;
      (ge === "undefined" || ge === "boolean") && (s = null);
      var ue = !1;
      if (s === null)
        ue = !0;
      else
        switch (ge) {
          case "string":
          case "number":
            ue = !0;
            break;
          case "object":
            switch (s.$$typeof) {
              case b:
              case N:
                ue = !0;
            }
        }
      if (ue) {
        var Ce = s, Fe = G(Ce), et = A === "" ? yt + ha(Ce, 0) : A;
        if (Bt(Fe)) {
          var lt = "";
          et != null && (lt = va(et) + "/"), ta(Fe, y, lt, "", function(Cf) {
            return Cf;
          });
        } else Fe != null && (ht(Fe) && (Fe.key && (!Ce || Ce.key !== Fe.key) && ea(Fe.key), Fe = Ze(
          Fe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Fe.key && (!Ce || Ce.key !== Fe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            va("" + Fe.key) + "/"
          ) : "") + et
        )), y.push(Fe));
        return 1;
      }
      var ot, Ue, mt = 0, Rt = A === "" ? yt : A + fn;
      if (Bt(s))
        for (var bi = 0; bi < s.length; bi++)
          ot = s[bi], Ue = Rt + ha(ot, bi), mt += ta(ot, y, L, Ue, G);
      else {
        var go = P(s);
        if (typeof go == "function") {
          var or = s;
          go === or.entries && (rt || Je("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rt = !0);
          for (var bo = go.call(or), No, Rf = 0; !(No = bo.next()).done; )
            ot = No.value, Ue = Rt + ha(ot, Rf++), mt += ta(ot, y, L, Ue, G);
        } else if (ge === "object") {
          var ps = String(s);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return mt;
    }
    function rr(s, y, L) {
      if (s == null)
        return s;
      var A = [], G = 0;
      return ta(s, A, "", "", function(ge) {
        return y.call(L, ge, G++);
      }), A;
    }
    function no(s) {
      var y = 0;
      return rr(s, function() {
        y++;
      }), y;
    }
    function si(s, y, L) {
      rr(s, function() {
        y.apply(this, arguments);
      }, L);
    }
    function Ki(s) {
      return rr(s, function(y) {
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
        $$typeof: D,
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
        $$typeof: R,
        _context: y
      };
      var L = !1, A = !1, G = !1;
      {
        var ge = {
          $$typeof: D,
          _context: y
        };
        Object.defineProperties(ge, {
          Provider: {
            get: function() {
              return A || (A = !0, we("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), y.Provider;
            },
            set: function(ue) {
              y.Provider = ue;
            }
          },
          _currentValue: {
            get: function() {
              return y._currentValue;
            },
            set: function(ue) {
              y._currentValue = ue;
            }
          },
          _currentValue2: {
            get: function() {
              return y._currentValue2;
            },
            set: function(ue) {
              y._currentValue2 = ue;
            }
          },
          _threadCount: {
            get: function() {
              return y._threadCount;
            },
            set: function(ue) {
              y._threadCount = ue;
            }
          },
          Consumer: {
            get: function() {
              return L || (L = !0, we("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), y.Consumer;
            }
          },
          displayName: {
            get: function() {
              return y.displayName;
            },
            set: function(ue) {
              G || (Je("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ue), G = !0);
            }
          }
        }), y.Consumer = ge;
      }
      return y._currentRenderer = null, y._currentRenderer2 = null, y;
    }
    var ya = -1, na = 0, $n = 1, za = 2;
    function fi(s) {
      if (s._status === ya) {
        var y = s._result, L = y();
        if (L.then(function(ge) {
          if (s._status === na || s._status === ya) {
            var ue = s;
            ue._status = $n, ue._result = ge;
          }
        }, function(ge) {
          if (s._status === na || s._status === ya) {
            var ue = s;
            ue._status = za, ue._result = ge;
          }
        }), s._status === ya) {
          var A = s;
          A._status = na, A._result = L;
        }
      }
      if (s._status === $n) {
        var G = s._result;
        return G === void 0 && we(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, G), "default" in G || we(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, G), G.default;
      } else
        throw s._result;
    }
    function g(s) {
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
        var A, G;
        Object.defineProperties(L, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return A;
            },
            set: function(ge) {
              we("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), A = ge, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return G;
            },
            set: function(ge) {
              we("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), G = ge, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function Y(s) {
      s != null && s.$$typeof === B ? we("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof s != "function" ? we("forwardRef requires a render function but was given %s.", s === null ? "null" : typeof s) : s.length !== 0 && s.length !== 2 && we("forwardRef render functions accept exactly two parameters: props and ref. %s", s.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), s != null && (s.defaultProps != null || s.propTypes != null) && we("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var y = {
        $$typeof: M,
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
          set: function(A) {
            L = A, !s.name && !s.displayName && (s.displayName = A);
          }
        });
      }
      return y;
    }
    var Z;
    Z = Symbol.for("react.module.reference");
    function me(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === C || s === _ || Ye || s === f || s === x || s === z || be || s === fe || je || _e || Ae || typeof s == "object" && s !== null && (s.$$typeof === W || s.$$typeof === B || s.$$typeof === R || s.$$typeof === D || s.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === Z || s.getModuleId !== void 0));
    }
    function ze(s, y) {
      me(s) || we("memo: The first argument must be a component. Instead received: %s", s === null ? "null" : typeof s);
      var L = {
        $$typeof: B,
        type: s,
        compare: y === void 0 ? null : y
      };
      {
        var A;
        Object.defineProperty(L, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return A;
          },
          set: function(G) {
            A = G, !s.name && !s.displayName && (s.displayName = G);
          }
        });
      }
      return L;
    }
    function Se() {
      var s = q.current;
      return s === null && we(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), s;
    }
    function Oe(s) {
      var y = Se();
      if (s._context !== void 0) {
        var L = s._context;
        L.Consumer === s ? we("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === s && we("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return y.useContext(s);
    }
    function he(s) {
      var y = Se();
      return y.useState(s);
    }
    function _t(s, y, L) {
      var A = Se();
      return A.useReducer(s, y, L);
    }
    function ct(s) {
      var y = Se();
      return y.useRef(s);
    }
    function ft(s, y) {
      var L = Se();
      return L.useEffect(s, y);
    }
    function dn(s, y) {
      var L = Se();
      return L.useInsertionEffect(s, y);
    }
    function Fa(s, y) {
      var L = Se();
      return L.useLayoutEffect(s, y);
    }
    function ga(s, y) {
      var L = Se();
      return L.useCallback(s, y);
    }
    function Ot(s, y) {
      var L = Se();
      return L.useMemo(s, y);
    }
    function di(s, y, L) {
      var A = Se();
      return A.useImperativeHandle(s, y, L);
    }
    function ba(s, y) {
      {
        var L = Se();
        return L.useDebugValue(s, y);
      }
    }
    function Me() {
      var s = Se();
      return s.useTransition();
    }
    function pi(s) {
      var y = Se();
      return y.useDeferredValue(s);
    }
    function ns() {
      var s = Se();
      return s.useId();
    }
    function as(s, y, L) {
      var A = Se();
      return A.useSyncExternalStore(s, y, L);
    }
    var Vr = 0, ao, ro, io, lo, oo, rs, is;
    function Ji() {
    }
    Ji.__reactDisabledLog = !0;
    function uo() {
      {
        if (Vr === 0) {
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
        Vr++;
      }
    }
    function Ha() {
      {
        if (Vr--, Vr === 0) {
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
        Vr < 0 && we("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = Xe.ReactCurrentDispatcher, Mr;
    function Zi(s, y, L) {
      {
        if (Mr === void 0)
          try {
            throw Error();
          } catch (G) {
            var A = G.stack.trim().match(/\n( *(at )?)/);
            Mr = A && A[1] || "";
          }
        return `
` + Mr + s;
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
      var A;
      vi = !0;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ge;
      ge = mi.current, mi.current = null, uo();
      try {
        if (y) {
          var ue = function() {
            throw Error();
          };
          if (Object.defineProperty(ue.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ue, []);
            } catch (Rt) {
              A = Rt;
            }
            Reflect.construct(s, [], ue);
          } else {
            try {
              ue.call();
            } catch (Rt) {
              A = Rt;
            }
            s.call(ue.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Rt) {
            A = Rt;
          }
          s();
        }
      } catch (Rt) {
        if (Rt && A && typeof Rt.stack == "string") {
          for (var Ce = Rt.stack.split(`
`), Fe = A.stack.split(`
`), et = Ce.length - 1, lt = Fe.length - 1; et >= 1 && lt >= 0 && Ce[et] !== Fe[lt]; )
            lt--;
          for (; et >= 1 && lt >= 0; et--, lt--)
            if (Ce[et] !== Fe[lt]) {
              if (et !== 1 || lt !== 1)
                do
                  if (et--, lt--, lt < 0 || Ce[et] !== Fe[lt]) {
                    var ot = `
` + Ce[et].replace(" at new ", " at ");
                    return s.displayName && ot.includes("<anonymous>") && (ot = ot.replace("<anonymous>", s.displayName)), typeof s == "function" && el.set(s, ot), ot;
                  }
                while (et >= 1 && lt >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = ge, Ha(), Error.prepareStackTrace = G;
      }
      var Ue = s ? s.displayName || s.name : "", mt = Ue ? Zi(Ue) : "";
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
        case x:
          return Zi("Suspense");
        case z:
          return Zi("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case M:
            return co(s.render);
          case B:
            return hi(s.type, y, L);
          case W: {
            var A = s, G = A._payload, ge = A._init;
            try {
              return hi(ge(G), y, L);
            } catch {
            }
          }
        }
      return "";
    }
    var os = {}, fo = Xe.ReactDebugCurrentFrame;
    function Ge(s) {
      if (s) {
        var y = s._owner, L = hi(s.type, s._source, y ? y.type : null);
        fo.setExtraStackFrame(L);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(s, y, L, A, G) {
      {
        var ge = Function.call.bind(cn);
        for (var ue in s)
          if (ge(s, ue)) {
            var Ce = void 0;
            try {
              if (typeof s[ue] != "function") {
                var Fe = Error((A || "React class") + ": " + L + " type `" + ue + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[ue] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Fe.name = "Invariant Violation", Fe;
              }
              Ce = s[ue](y, ue, A, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (et) {
              Ce = et;
            }
            Ce && !(Ce instanceof Error) && (Ge(G), we("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", A || "React class", L, ue, typeof Ce), Ge(null)), Ce instanceof Error && !(Ce.message in os) && (os[Ce.message] = !0, Ge(G), we("Failed %s type: %s", L, Ce.message), Ge(null));
          }
      }
    }
    function ir(s) {
      if (s) {
        var y = s._owner, L = hi(s.type, s._source, y ? y.type : null);
        K(L);
      } else
        K(null);
    }
    var Te;
    Te = !1;
    function po() {
      if (le.current) {
        var s = Vn(le.current.type);
        if (s)
          return `

Check the render method of \`` + s + "`.";
      }
      return "";
    }
    function xn(s) {
      if (s !== void 0) {
        var y = s.fileName.replace(/^.*[\\\/]/, ""), L = s.lineNumber;
        return `

Check your code at ` + y + ":" + L + ".";
      }
      return "";
    }
    function yi(s) {
      return s != null ? xn(s.__source) : "";
    }
    var Ar = {};
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
        if (!Ar[L]) {
          Ar[L] = !0;
          var A = "";
          s && s._owner && s._owner !== le.current && (A = " It was passed a child from " + Vn(s._owner.type) + "."), ir(s), we('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, A), ir(null);
        }
      }
    }
    function pt(s, y) {
      if (typeof s == "object") {
        if (Bt(s))
          for (var L = 0; L < s.length; L++) {
            var A = s[L];
            ht(A) && Yt(A, y);
          }
        else if (ht(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var G = P(s);
          if (typeof G == "function" && G !== s.entries)
            for (var ge = G.call(s), ue; !(ue = ge.next()).done; )
              ht(ue.value) && Yt(ue.value, y);
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
        else if (typeof y == "object" && (y.$$typeof === M || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === B))
          L = y.propTypes;
        else
          return;
        if (L) {
          var A = Vn(y);
          Nf(L, s.props, "prop", A, s);
        } else if (y.PropTypes !== void 0 && !Te) {
          Te = !0;
          var G = Vn(y);
          we("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && we("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function aa(s) {
      {
        for (var y = Object.keys(s.props), L = 0; L < y.length; L++) {
          var A = y[L];
          if (A !== "children" && A !== "key") {
            ir(s), we("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", A), ir(null);
            break;
          }
        }
        s.ref !== null && (ir(s), we("Invalid attribute `ref` supplied to `React.Fragment`."), ir(null));
      }
    }
    function Rn(s, y, L) {
      var A = me(s);
      if (!A) {
        var G = "";
        (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (G += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var ge = yi(y);
        ge ? G += ge : G += po();
        var ue;
        s === null ? ue = "null" : Bt(s) ? ue = "array" : s !== void 0 && s.$$typeof === b ? (ue = "<" + (Vn(s.type) || "Unknown") + " />", G = " Did you accidentally export a JSX literal instead of a component?") : ue = typeof s, we("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ue, G);
      }
      var Ce = Ve.apply(this, arguments);
      if (Ce == null)
        return Ce;
      if (A)
        for (var Fe = 2; Fe < arguments.length; Fe++)
          pt(arguments[Fe], s);
      return s === C ? aa(Ce) : us(Ce), Ce;
    }
    var Na = !1;
    function Sf(s) {
      var y = Rn.bind(null, s);
      return y.type = s, Na || (Na = !0, Je("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(y, "type", {
        enumerable: !1,
        get: function() {
          return Je("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: s
          }), s;
        }
      }), y;
    }
    function mo(s, y, L) {
      for (var A = st.apply(this, arguments), G = 2; G < arguments.length; G++)
        pt(arguments[G], A.type);
      return us(A), A;
    }
    function ss(s, y) {
      var L = ie.transition;
      ie.transition = {};
      var A = ie.transition;
      ie.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        s();
      } finally {
        if (ie.transition = L, L === null && A._updatedFibers) {
          var G = A._updatedFibers.size;
          G > 10 && Je("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), A._updatedFibers.clear();
        }
      }
    }
    var vo = !1, tl = null;
    function xf(s) {
      if (tl === null)
        try {
          var y = ("require" + Math.random()).slice(0, 7), L = c && c[y];
          tl = L.call(c, "timers").setImmediate;
        } catch {
          tl = function(G) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && we("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var ge = new MessageChannel();
            ge.port1.onmessage = G, ge.port2.postMessage(void 0);
          };
        }
      return tl(s);
    }
    var Ur = 0, gi = !1;
    function ho(s) {
      {
        var y = Ur;
        Ur++, H.current === null && (H.current = []);
        var L = H.isBatchingLegacy, A;
        try {
          if (H.isBatchingLegacy = !0, A = s(), !L && H.didScheduleLegacyUpdate) {
            var G = H.current;
            G !== null && (H.didScheduleLegacyUpdate = !1, rl(G));
          }
        } catch (Ue) {
          throw lr(y), Ue;
        } finally {
          H.isBatchingLegacy = L;
        }
        if (A !== null && typeof A == "object" && typeof A.then == "function") {
          var ge = A, ue = !1, Ce = {
            then: function(Ue, mt) {
              ue = !0, ge.then(function(Rt) {
                lr(y), Ur === 0 ? nl(Rt, Ue, mt) : Ue(Rt);
              }, function(Rt) {
                lr(y), mt(Rt);
              });
            }
          };
          return !gi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ue || (gi = !0, we("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ce;
        } else {
          var Fe = A;
          if (lr(y), Ur === 0) {
            var et = H.current;
            et !== null && (rl(et), H.current = null);
            var lt = {
              then: function(Ue, mt) {
                H.current === null ? (H.current = [], nl(Fe, Ue, mt)) : Ue(Fe);
              }
            };
            return lt;
          } else {
            var ot = {
              then: function(Ue, mt) {
                Ue(Fe);
              }
            };
            return ot;
          }
        }
      }
    }
    function lr(s) {
      s !== Ur - 1 && we("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = s;
    }
    function nl(s, y, L) {
      {
        var A = H.current;
        if (A !== null)
          try {
            rl(A), xf(function() {
              A.length === 0 ? (H.current = null, y(s)) : nl(s, y, L);
            });
          } catch (G) {
            L(G);
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
        } catch (A) {
          throw s = s.slice(y + 1), A;
        } finally {
          al = !1;
        }
      }
    }
    var cs = Rn, fs = mo, yo = Sf, ds = {
      map: rr,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    m.Children = ds, m.Component = bn, m.Fragment = C, m.Profiler = _, m.PureComponent = Kt, m.StrictMode = f, m.Suspense = x, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xe, m.act = ho, m.cloneElement = fs, m.createContext = ci, m.createElement = cs, m.createFactory = yo, m.createRef = Jt, m.forwardRef = Y, m.isValidElement = ht, m.lazy = g, m.memo = ze, m.startTransition = ss, m.unstable_act = ho, m.useCallback = ga, m.useContext = Oe, m.useDebugValue = ba, m.useDeferredValue = pi, m.useEffect = ft, m.useId = ns, m.useImperativeHandle = di, m.useInsertionEffect = dn, m.useLayoutEffect = Fa, m.useMemo = Ot, m.useReducer = _t, m.useRef = ct, m.useState = he, m.useSyncExternalStore = as, m.useTransition = Me, m.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var kw = hf.exports;
uE.exports = kw;
var O = uE.exports;
const zw = /* @__PURE__ */ Uw(O), Fw = /* @__PURE__ */ Aw({
  __proto__: null,
  default: zw
}, [O]);
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
  var c = O, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), _ = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), W = Symbol.iterator, fe = "@@iterator";
  function X(g) {
    if (g === null || typeof g != "object")
      return null;
    var Y = W && g[W] || g[fe];
    return typeof Y == "function" ? Y : null;
  }
  var pe = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function P(g) {
    {
      for (var Y = arguments.length, Z = new Array(Y > 1 ? Y - 1 : 0), me = 1; me < Y; me++)
        Z[me - 1] = arguments[me];
      q("error", g, Z);
    }
  }
  function q(g, Y, Z) {
    {
      var me = pe.ReactDebugCurrentFrame, ze = me.getStackAddendum();
      ze !== "" && (Y += "%s", Z = Z.concat([ze]));
      var Se = Z.map(function(Oe) {
        return String(Oe);
      });
      Se.unshift("Warning: " + Y), Function.prototype.apply.call(console[g], console, Se);
    }
  }
  var ie = !1, H = !1, le = !1, se = !1, $e = !1, K;
  K = Symbol.for("react.module.reference");
  function je(g) {
    return !!(typeof g == "string" || typeof g == "function" || g === b || g === C || $e || g === N || g === D || g === M || se || g === B || ie || H || le || typeof g == "object" && g !== null && (g.$$typeof === z || g.$$typeof === x || g.$$typeof === f || g.$$typeof === _ || g.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    g.$$typeof === K || g.getModuleId !== void 0));
  }
  function _e(g, Y, Z) {
    var me = g.displayName;
    if (me)
      return me;
    var ze = Y.displayName || Y.name || "";
    return ze !== "" ? Z + "(" + ze + ")" : Z;
  }
  function Ae(g) {
    return g.displayName || "Context";
  }
  function be(g) {
    if (g == null)
      return null;
    if (typeof g.tag == "number" && P("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
      return g.displayName || g.name || null;
    if (typeof g == "string")
      return g;
    switch (g) {
      case b:
        return "Fragment";
      case h:
        return "Portal";
      case C:
        return "Profiler";
      case N:
        return "StrictMode";
      case D:
        return "Suspense";
      case M:
        return "SuspenseList";
    }
    if (typeof g == "object")
      switch (g.$$typeof) {
        case _:
          var Y = g;
          return Ae(Y) + ".Consumer";
        case f:
          var Z = g;
          return Ae(Z._context) + ".Provider";
        case R:
          return _e(g, g.render, "ForwardRef");
        case x:
          var me = g.displayName || null;
          return me !== null ? me : be(g.type) || "Memo";
        case z: {
          var ze = g, Se = ze._payload, Oe = ze._init;
          try {
            return be(Oe(Se));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Ye = Object.assign, Xe = 0, Je, we, jt, da, Bn, Zn, Ht;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function bn() {
    {
      if (Xe === 0) {
        Je = console.log, we = console.info, jt = console.warn, da = console.error, Bn = console.group, Zn = console.groupCollapsed, Ht = console.groupEnd;
        var g = {
          configurable: !0,
          enumerable: !0,
          value: pa,
          writable: !0
        };
        Object.defineProperties(console, {
          info: g,
          log: g,
          warn: g,
          error: g,
          group: g,
          groupCollapsed: g,
          groupEnd: g
        });
      }
      Xe++;
    }
  }
  function tr() {
    {
      if (Xe--, Xe === 0) {
        var g = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ye({}, g, {
            value: Je
          }),
          info: Ye({}, g, {
            value: we
          }),
          warn: Ye({}, g, {
            value: jt
          }),
          error: Ye({}, g, {
            value: da
          }),
          group: Ye({}, g, {
            value: Bn
          }),
          groupCollapsed: Ye({}, g, {
            value: Zn
          }),
          groupEnd: Ye({}, g, {
            value: Ht
          })
        });
      }
      Xe < 0 && P("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ua = pe.ReactCurrentDispatcher, Qt;
  function Pn(g, Y, Z) {
    {
      if (Qt === void 0)
        try {
          throw Error();
        } catch (ze) {
          var me = ze.stack.trim().match(/\n( *(at )?)/);
          Qt = me && me[1] || "";
        }
      return `
` + Qt + g;
    }
  }
  var Kt = !1, Xt;
  {
    var Jt = typeof WeakMap == "function" ? WeakMap : Map;
    Xt = new Jt();
  }
  function Ln(g, Y) {
    if (!g || Kt)
      return "";
    {
      var Z = Xt.get(g);
      if (Z !== void 0)
        return Z;
    }
    var me;
    Kt = !0;
    var ze = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Se;
    Se = Ua.current, Ua.current = null, bn();
    try {
      if (Y) {
        var Oe = function() {
          throw Error();
        };
        if (Object.defineProperty(Oe.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Oe, []);
          } catch (Ot) {
            me = Ot;
          }
          Reflect.construct(g, [], Oe);
        } else {
          try {
            Oe.call();
          } catch (Ot) {
            me = Ot;
          }
          g.call(Oe.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Ot) {
          me = Ot;
        }
        g();
      }
    } catch (Ot) {
      if (Ot && me && typeof Ot.stack == "string") {
        for (var he = Ot.stack.split(`
`), _t = me.stack.split(`
`), ct = he.length - 1, ft = _t.length - 1; ct >= 1 && ft >= 0 && he[ct] !== _t[ft]; )
          ft--;
        for (; ct >= 1 && ft >= 0; ct--, ft--)
          if (he[ct] !== _t[ft]) {
            if (ct !== 1 || ft !== 1)
              do
                if (ct--, ft--, ft < 0 || he[ct] !== _t[ft]) {
                  var dn = `
` + he[ct].replace(" at new ", " at ");
                  return g.displayName && dn.includes("<anonymous>") && (dn = dn.replace("<anonymous>", g.displayName)), typeof g == "function" && Xt.set(g, dn), dn;
                }
              while (ct >= 1 && ft >= 0);
            break;
          }
      }
    } finally {
      Kt = !1, Ua.current = Se, tr(), Error.prepareStackTrace = ze;
    }
    var Fa = g ? g.displayName || g.name : "", ga = Fa ? Pn(Fa) : "";
    return typeof g == "function" && Xt.set(g, ga), ga;
  }
  function Bt(g, Y, Z) {
    return Ln(g, !1);
  }
  function Nn(g) {
    var Y = g.prototype;
    return !!(Y && Y.isReactComponent);
  }
  function Pt(g, Y, Z) {
    if (g == null)
      return "";
    if (typeof g == "function")
      return Ln(g, Nn(g));
    if (typeof g == "string")
      return Pn(g);
    switch (g) {
      case D:
        return Pn("Suspense");
      case M:
        return Pn("SuspenseList");
    }
    if (typeof g == "object")
      switch (g.$$typeof) {
        case R:
          return Bt(g.render);
        case x:
          return Pt(g.type, Y, Z);
        case z: {
          var me = g, ze = me._payload, Se = me._init;
          try {
            return Pt(Se(ze), Y, Z);
          } catch {
          }
        }
      }
    return "";
  }
  var $t = Object.prototype.hasOwnProperty, ea = {}, nr = pe.ReactDebugCurrentFrame;
  function ma(g) {
    if (g) {
      var Y = g._owner, Z = Pt(g.type, g._source, Y ? Y.type : null);
      nr.setExtraStackFrame(Z);
    } else
      nr.setExtraStackFrame(null);
  }
  function Vn(g, Y, Z, me, ze) {
    {
      var Se = Function.call.bind($t);
      for (var Oe in g)
        if (Se(g, Oe)) {
          var he = void 0;
          try {
            if (typeof g[Oe] != "function") {
              var _t = Error((me || "React class") + ": " + Z + " type `" + Oe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[Oe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw _t.name = "Invariant Violation", _t;
            }
            he = g[Oe](Y, Oe, me, Z, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ct) {
            he = ct;
          }
          he && !(he instanceof Error) && (ma(ze), P("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", me || "React class", Z, Oe, typeof he), ma(null)), he instanceof Error && !(he.message in ea) && (ea[he.message] = !0, ma(ze), P("Failed %s type: %s", Z, he.message), ma(null));
        }
    }
  }
  var cn = Array.isArray;
  function Zt(g) {
    return cn(g);
  }
  function En(g) {
    {
      var Y = typeof Symbol == "function" && Symbol.toStringTag, Z = Y && g[Symbol.toStringTag] || g.constructor.name || "Object";
      return Z;
    }
  }
  function ka(g) {
    try {
      return wt(g), !1;
    } catch {
      return !0;
    }
  }
  function wt(g) {
    return "" + g;
  }
  function Sn(g) {
    if (ka(g))
      return P("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(g)), wt(g);
  }
  var Mn = pe.ReactCurrentOwner, Lr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ar, J, de;
  de = {};
  function Ve(g) {
    if ($t.call(g, "ref")) {
      var Y = Object.getOwnPropertyDescriptor(g, "ref").get;
      if (Y && Y.isReactWarning)
        return !1;
    }
    return g.ref !== void 0;
  }
  function Ze(g) {
    if ($t.call(g, "key")) {
      var Y = Object.getOwnPropertyDescriptor(g, "key").get;
      if (Y && Y.isReactWarning)
        return !1;
    }
    return g.key !== void 0;
  }
  function st(g, Y) {
    if (typeof g.ref == "string" && Mn.current && Y && Mn.current.stateNode !== Y) {
      var Z = be(Mn.current.type);
      de[Z] || (P('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', be(Mn.current.type), g.ref), de[Z] = !0);
    }
  }
  function ht(g, Y) {
    {
      var Z = function() {
        ar || (ar = !0, P("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
      };
      Z.isReactWarning = !0, Object.defineProperty(g, "key", {
        get: Z,
        configurable: !0
      });
    }
  }
  function yt(g, Y) {
    {
      var Z = function() {
        J || (J = !0, P("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Y));
      };
      Z.isReactWarning = !0, Object.defineProperty(g, "ref", {
        get: Z,
        configurable: !0
      });
    }
  }
  var fn = function(g, Y, Z, me, ze, Se, Oe) {
    var he = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: m,
      // Built-in properties that belong on the element
      type: g,
      key: Y,
      ref: Z,
      props: Oe,
      // Record the component responsible for creating this element.
      _owner: Se
    };
    return he._store = {}, Object.defineProperty(he._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(he, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: me
    }), Object.defineProperty(he, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: ze
    }), Object.freeze && (Object.freeze(he.props), Object.freeze(he)), he;
  };
  function bt(g, Y, Z, me, ze) {
    {
      var Se, Oe = {}, he = null, _t = null;
      Z !== void 0 && (Sn(Z), he = "" + Z), Ze(Y) && (Sn(Y.key), he = "" + Y.key), Ve(Y) && (_t = Y.ref, st(Y, ze));
      for (Se in Y)
        $t.call(Y, Se) && !Lr.hasOwnProperty(Se) && (Oe[Se] = Y[Se]);
      if (g && g.defaultProps) {
        var ct = g.defaultProps;
        for (Se in ct)
          Oe[Se] === void 0 && (Oe[Se] = ct[Se]);
      }
      if (he || _t) {
        var ft = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
        he && ht(Oe, ft), _t && yt(Oe, ft);
      }
      return fn(g, he, _t, ze, me, Mn.current, Oe);
    }
  }
  var rt = pe.ReactCurrentOwner, Nt = pe.ReactDebugCurrentFrame;
  function va(g) {
    if (g) {
      var Y = g._owner, Z = Pt(g.type, g._source, Y ? Y.type : null);
      Nt.setExtraStackFrame(Z);
    } else
      Nt.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function ta(g) {
    return typeof g == "object" && g !== null && g.$$typeof === m;
  }
  function rr() {
    {
      if (rt.current) {
        var g = be(rt.current.type);
        if (g)
          return `

Check the render method of \`` + g + "`.";
      }
      return "";
    }
  }
  function no(g) {
    {
      if (g !== void 0) {
        var Y = g.fileName.replace(/^.*[\\\/]/, ""), Z = g.lineNumber;
        return `

Check your code at ` + Y + ":" + Z + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(g) {
    {
      var Y = rr();
      if (!Y) {
        var Z = typeof g == "string" ? g : g.displayName || g.name;
        Z && (Y = `

Check the top-level render call using <` + Z + ">.");
      }
      return Y;
    }
  }
  function Xi(g, Y) {
    {
      if (!g._store || g._store.validated || g.key != null)
        return;
      g._store.validated = !0;
      var Z = Ki(Y);
      if (si[Z])
        return;
      si[Z] = !0;
      var me = "";
      g && g._owner && g._owner !== rt.current && (me = " It was passed a child from " + be(g._owner.type) + "."), va(g), P('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Z, me), va(null);
    }
  }
  function ci(g, Y) {
    {
      if (typeof g != "object")
        return;
      if (Zt(g))
        for (var Z = 0; Z < g.length; Z++) {
          var me = g[Z];
          ta(me) && Xi(me, Y);
        }
      else if (ta(g))
        g._store && (g._store.validated = !0);
      else if (g) {
        var ze = X(g);
        if (typeof ze == "function" && ze !== g.entries)
          for (var Se = ze.call(g), Oe; !(Oe = Se.next()).done; )
            ta(Oe.value) && Xi(Oe.value, Y);
      }
    }
  }
  function ya(g) {
    {
      var Y = g.type;
      if (Y == null || typeof Y == "string")
        return;
      var Z;
      if (typeof Y == "function")
        Z = Y.propTypes;
      else if (typeof Y == "object" && (Y.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      Y.$$typeof === x))
        Z = Y.propTypes;
      else
        return;
      if (Z) {
        var me = be(Y);
        Vn(Z, g.props, "prop", me, g);
      } else if (Y.PropTypes !== void 0 && !ha) {
        ha = !0;
        var ze = be(Y);
        P("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ze || "Unknown");
      }
      typeof Y.getDefaultProps == "function" && !Y.getDefaultProps.isReactClassApproved && P("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function na(g) {
    {
      for (var Y = Object.keys(g.props), Z = 0; Z < Y.length; Z++) {
        var me = Y[Z];
        if (me !== "children" && me !== "key") {
          va(g), P("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", me), va(null);
          break;
        }
      }
      g.ref !== null && (va(g), P("Invalid attribute `ref` supplied to `React.Fragment`."), va(null));
    }
  }
  var $n = {};
  function za(g, Y, Z, me, ze, Se) {
    {
      var Oe = je(g);
      if (!Oe) {
        var he = "";
        (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (he += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _t = no(ze);
        _t ? he += _t : he += rr();
        var ct;
        g === null ? ct = "null" : Zt(g) ? ct = "array" : g !== void 0 && g.$$typeof === m ? (ct = "<" + (be(g.type) || "Unknown") + " />", he = " Did you accidentally export a JSX literal instead of a component?") : ct = typeof g, P("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ct, he);
      }
      var ft = bt(g, Y, Z, ze, Se);
      if (ft == null)
        return ft;
      if (Oe) {
        var dn = Y.children;
        if (dn !== void 0)
          if (me)
            if (Zt(dn)) {
              for (var Fa = 0; Fa < dn.length; Fa++)
                ci(dn[Fa], g);
              Object.freeze && Object.freeze(dn);
            } else
              P("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(dn, g);
      }
      if ($t.call(Y, "key")) {
        var ga = be(g), Ot = Object.keys(Y).filter(function(Me) {
          return Me !== "key";
        }), di = Ot.length > 0 ? "{key: someKey, " + Ot.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!$n[ga + di]) {
          var ba = Ot.length > 0 ? "{" + Ot.join(": ..., ") + ": ...}" : "{}";
          P(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, ga, ba, ga), $n[ga + di] = !0;
        }
      }
      return g === b ? na(ft) : ya(ft), ft;
    }
  }
  var fi = za;
  wv.Fragment = b, wv.jsxDEV = fi;
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
    function b(J, de) {
      var Ve = J.length;
      J.push(de), f(J, de, Ve);
    }
    function N(J) {
      return J.length === 0 ? null : J[0];
    }
    function C(J) {
      if (J.length === 0)
        return null;
      var de = J[0], Ve = J.pop();
      return Ve !== de && (J[0] = Ve, _(J, Ve, 0)), de;
    }
    function f(J, de, Ve) {
      for (var Ze = Ve; Ze > 0; ) {
        var st = Ze - 1 >>> 1, ht = J[st];
        if (R(ht, de) > 0)
          J[st] = de, J[Ze] = ht, Ze = st;
        else
          return;
      }
    }
    function _(J, de, Ve) {
      for (var Ze = Ve, st = J.length, ht = st >>> 1; Ze < ht; ) {
        var yt = (Ze + 1) * 2 - 1, fn = J[yt], bt = yt + 1, rt = J[bt];
        if (R(fn, de) < 0)
          bt < st && R(rt, fn) < 0 ? (J[Ze] = rt, J[bt] = de, Ze = bt) : (J[Ze] = fn, J[yt] = de, Ze = yt);
        else if (bt < st && R(rt, de) < 0)
          J[Ze] = rt, J[bt] = de, Ze = bt;
        else
          return;
      }
    }
    function R(J, de) {
      var Ve = J.sortIndex - de.sortIndex;
      return Ve !== 0 ? Ve : J.id - de.id;
    }
    var D = 1, M = 2, x = 3, z = 4, B = 5;
    function W(J, de) {
    }
    var fe = typeof performance == "object" && typeof performance.now == "function";
    if (fe) {
      var X = performance;
      c.unstable_now = function() {
        return X.now();
      };
    } else {
      var pe = Date, P = pe.now();
      c.unstable_now = function() {
        return pe.now() - P;
      };
    }
    var q = 1073741823, ie = -1, H = 250, le = 5e3, se = 1e4, $e = q, K = [], je = [], _e = 1, Ae = null, be = x, Ye = !1, Xe = !1, Je = !1, we = typeof setTimeout == "function" ? setTimeout : null, jt = typeof clearTimeout == "function" ? clearTimeout : null, da = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Bn(J) {
      for (var de = N(je); de !== null; ) {
        if (de.callback === null)
          C(je);
        else if (de.startTime <= J)
          C(je), de.sortIndex = de.expirationTime, b(K, de);
        else
          return;
        de = N(je);
      }
    }
    function Zn(J) {
      if (Je = !1, Bn(J), !Xe)
        if (N(K) !== null)
          Xe = !0, wt(Ht);
        else {
          var de = N(je);
          de !== null && Sn(Zn, de.startTime - J);
        }
    }
    function Ht(J, de) {
      Xe = !1, Je && (Je = !1, Mn()), Ye = !0;
      var Ve = be;
      try {
        var Ze;
        if (!m) return pa(J, de);
      } finally {
        Ae = null, be = Ve, Ye = !1;
      }
    }
    function pa(J, de) {
      var Ve = de;
      for (Bn(Ve), Ae = N(K); Ae !== null && !(Ae.expirationTime > Ve && (!J || nr())); ) {
        var Ze = Ae.callback;
        if (typeof Ze == "function") {
          Ae.callback = null, be = Ae.priorityLevel;
          var st = Ae.expirationTime <= Ve, ht = Ze(st);
          Ve = c.unstable_now(), typeof ht == "function" ? Ae.callback = ht : Ae === N(K) && C(K), Bn(Ve);
        } else
          C(K);
        Ae = N(K);
      }
      if (Ae !== null)
        return !0;
      var yt = N(je);
      return yt !== null && Sn(Zn, yt.startTime - Ve), !1;
    }
    function bn(J, de) {
      switch (J) {
        case D:
        case M:
        case x:
        case z:
        case B:
          break;
        default:
          J = x;
      }
      var Ve = be;
      be = J;
      try {
        return de();
      } finally {
        be = Ve;
      }
    }
    function tr(J) {
      var de;
      switch (be) {
        case D:
        case M:
        case x:
          de = x;
          break;
        default:
          de = be;
          break;
      }
      var Ve = be;
      be = de;
      try {
        return J();
      } finally {
        be = Ve;
      }
    }
    function Ua(J) {
      var de = be;
      return function() {
        var Ve = be;
        be = de;
        try {
          return J.apply(this, arguments);
        } finally {
          be = Ve;
        }
      };
    }
    function Qt(J, de, Ve) {
      var Ze = c.unstable_now(), st;
      if (typeof Ve == "object" && Ve !== null) {
        var ht = Ve.delay;
        typeof ht == "number" && ht > 0 ? st = Ze + ht : st = Ze;
      } else
        st = Ze;
      var yt;
      switch (J) {
        case D:
          yt = ie;
          break;
        case M:
          yt = H;
          break;
        case B:
          yt = $e;
          break;
        case z:
          yt = se;
          break;
        case x:
        default:
          yt = le;
          break;
      }
      var fn = st + yt, bt = {
        id: _e++,
        callback: de,
        priorityLevel: J,
        startTime: st,
        expirationTime: fn,
        sortIndex: -1
      };
      return st > Ze ? (bt.sortIndex = st, b(je, bt), N(K) === null && bt === N(je) && (Je ? Mn() : Je = !0, Sn(Zn, st - Ze))) : (bt.sortIndex = fn, b(K, bt), !Xe && !Ye && (Xe = !0, wt(Ht))), bt;
    }
    function Pn() {
    }
    function Kt() {
      !Xe && !Ye && (Xe = !0, wt(Ht));
    }
    function Xt() {
      return N(K);
    }
    function Jt(J) {
      J.callback = null;
    }
    function Ln() {
      return be;
    }
    var Bt = !1, Nn = null, Pt = -1, $t = h, ea = -1;
    function nr() {
      var J = c.unstable_now() - ea;
      return !(J < $t);
    }
    function ma() {
    }
    function Vn(J) {
      if (J < 0 || J > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      J > 0 ? $t = Math.floor(1e3 / J) : $t = h;
    }
    var cn = function() {
      if (Nn !== null) {
        var J = c.unstable_now();
        ea = J;
        var de = !0, Ve = !0;
        try {
          Ve = Nn(de, J);
        } finally {
          Ve ? Zt() : (Bt = !1, Nn = null);
        }
      } else
        Bt = !1;
    }, Zt;
    if (typeof da == "function")
      Zt = function() {
        da(cn);
      };
    else if (typeof MessageChannel < "u") {
      var En = new MessageChannel(), ka = En.port2;
      En.port1.onmessage = cn, Zt = function() {
        ka.postMessage(null);
      };
    } else
      Zt = function() {
        we(cn, 0);
      };
    function wt(J) {
      Nn = J, Bt || (Bt = !0, Zt());
    }
    function Sn(J, de) {
      Pt = we(function() {
        J(c.unstable_now());
      }, de);
    }
    function Mn() {
      jt(Pt), Pt = -1;
    }
    var Lr = ma, ar = null;
    c.unstable_IdlePriority = B, c.unstable_ImmediatePriority = D, c.unstable_LowPriority = z, c.unstable_NormalPriority = x, c.unstable_Profiling = ar, c.unstable_UserBlockingPriority = M, c.unstable_cancelCallback = Jt, c.unstable_continueExecution = Kt, c.unstable_forceFrameRate = Vn, c.unstable_getCurrentPriorityLevel = Ln, c.unstable_getFirstCallbackNode = Xt, c.unstable_next = tr, c.unstable_pauseExecution = Pn, c.unstable_requestPaint = Lr, c.unstable_runWithPriority = bn, c.unstable_scheduleCallback = Qt, c.unstable_shouldYield = nr, c.unstable_wrapCallback = Ua, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(fE);
cE.exports = fE;
var Hw = cE.exports;
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
  var c = O, m = Hw, h = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, b = !1;
  function N(e) {
    b = e;
  }
  function C(e) {
    if (!b) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      _("warn", e, n);
    }
  }
  function f(e) {
    if (!b) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      _("error", e, n);
    }
  }
  function _(e, t, n) {
    {
      var a = h.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var R = 0, D = 1, M = 2, x = 3, z = 4, B = 5, W = 6, fe = 7, X = 8, pe = 9, P = 10, q = 11, ie = 12, H = 13, le = 14, se = 15, $e = 16, K = 17, je = 18, _e = 19, Ae = 21, be = 22, Ye = 23, Xe = 24, Je = 25, we = !0, jt = !1, da = !1, Bn = !1, Zn = !1, Ht = !0, pa = !0, bn = !0, tr = !0, Ua = /* @__PURE__ */ new Set(), Qt = {}, Pn = {};
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
      Ua.add(t[a]);
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
  function nr(e, t) {
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
  var Zt = 0, En = 1, ka = 2, wt = 3, Sn = 4, Mn = 5, Lr = 6, ar = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", J = ar + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", de = new RegExp("^[" + ar + "][" + J + "]*$"), Ve = {}, Ze = {};
  function st(e) {
    return Ln.call(Ze, e) ? !0 : Ln.call(Ve, e) ? !1 : de.test(e) ? (Ze[e] = !0, !0) : (Ve[e] = !0, f("Invalid attribute name: `%s`", e), !1);
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
        case Sn:
          return t === !1;
        case Mn:
          return isNaN(t);
        case Lr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function bt(e) {
    return Nt.hasOwnProperty(e) ? Nt[e] : null;
  }
  function rt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === ka || t === wt || t === Sn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
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
      ka,
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
      ka,
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
      Sn,
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
      Lr,
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
  var rr = "xlinkHref";
  Nt[rr] = new rt(
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
      if (a.type === Sn) {
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
        var S = r.type, E;
        S === wt || S === Sn && n === !0 ? E = "" : ($t(n, p), E = "" + n, r.sanitizeURL && Ki(E.toString())), v ? e.setAttributeNS(v, p, E) : e.setAttribute(p, E);
      }
    }
  }
  var na = Symbol.for("react.element"), $n = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), Z = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), ze = Symbol.for("react.suspense"), Se = Symbol.for("react.suspense_list"), Oe = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), _t = Symbol.for("react.scope"), ct = Symbol.for("react.debug_trace_mode"), ft = Symbol.for("react.offscreen"), dn = Symbol.for("react.legacy_hidden"), Fa = Symbol.for("react.cache"), ga = Symbol.for("react.tracing_marker"), Ot = Symbol.iterator, di = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Ot && e[Ot] || e[di];
    return typeof t == "function" ? t : null;
  }
  var Me = Object.assign, pi = 0, ns, as, Vr, ao, ro, io, lo;
  function oo() {
  }
  oo.__reactDisabledLog = !0;
  function rs() {
    {
      if (pi === 0) {
        ns = console.log, as = console.info, Vr = console.warn, ao = console.error, ro = console.group, io = console.groupCollapsed, lo = console.groupEnd;
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
          log: Me({}, e, {
            value: ns
          }),
          info: Me({}, e, {
            value: as
          }),
          warn: Me({}, e, {
            value: Vr
          }),
          error: Me({}, e, {
            value: ao
          }),
          group: Me({}, e, {
            value: ro
          }),
          groupCollapsed: Me({}, e, {
            value: io
          }),
          groupEnd: Me({}, e, {
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
  var mi = !1, Mr;
  {
    var Zi = typeof WeakMap == "function" ? WeakMap : Map;
    Mr = new Zi();
  }
  function vi(e, t) {
    if (!e || mi)
      return "";
    {
      var n = Mr.get(e);
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
                  var S = `
` + o[p].replace(" at new ", " at ");
                  return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && Mr.set(e, S), S;
                }
              while (p >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      mi = !1, Ji.current = i, is(), Error.prepareStackTrace = r;
    }
    var E = e ? e.displayName || e.name : "", w = E ? Ha(E) : "";
    return typeof e == "function" && Mr.set(e, w), w;
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
      case ze:
        return Ha("Suspense");
      case Se:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case me:
          return so(e.render);
        case Oe:
          return co(e.type, t, n);
        case he: {
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
      case B:
        return Ha(e.type);
      case $e:
        return Ha("Lazy");
      case H:
        return Ha("Suspense");
      case _e:
        return Ha("SuspenseList");
      case R:
      case M:
      case se:
        return so(e.type);
      case q:
        return so(e.type.render);
      case D:
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
  function Ge(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case za:
        return "Fragment";
      case $n:
        return "Portal";
      case g:
        return "Profiler";
      case fi:
        return "StrictMode";
      case ze:
        return "Suspense";
      case Se:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Z:
          var t = e;
          return fo(t) + ".Consumer";
        case Y:
          var n = e;
          return fo(n._context) + ".Provider";
        case me:
          return os(e, e.render, "ForwardRef");
        case Oe:
          var a = e.displayName || null;
          return a !== null ? a : Ge(e.type) || "Memo";
        case he: {
          var r = e, i = r._payload, l = r._init;
          try {
            return Ge(l(i));
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
  function ir(e) {
    return e.displayName || "Context";
  }
  function Te(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Xe:
        return "Cache";
      case pe:
        var a = n;
        return ir(a) + ".Consumer";
      case P:
        var r = n;
        return ir(r._context) + ".Provider";
      case je:
        return "DehydratedFragment";
      case q:
        return Nf(n, n.render, "ForwardRef");
      case fe:
        return "Fragment";
      case B:
        return n;
      case z:
        return "Portal";
      case x:
        return "Root";
      case W:
        return "Text";
      case $e:
        return Ge(n);
      case X:
        return n === fi ? "StrictMode" : "Mode";
      case be:
        return "Offscreen";
      case ie:
        return "Profiler";
      case Ae:
        return "Scope";
      case H:
        return "Suspense";
      case _e:
        return "SuspenseList";
      case Je:
        return "TracingMarker";
      case D:
      case R:
      case K:
      case M:
      case le:
      case se:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = h.ReactDebugCurrentFrame, xn = null, yi = !1;
  function Ar() {
    {
      if (xn === null)
        return null;
      var e = xn._debugOwner;
      if (e !== null && typeof e < "u")
        return Te(e);
    }
    return null;
  }
  function Ef() {
    return xn === null ? "" : hi(xn);
  }
  function Yt() {
    po.getCurrentStack = null, xn = null, yi = !1;
  }
  function pt(e) {
    po.getCurrentStack = e === null ? null : Ef, xn = e, yi = !1;
  }
  function us() {
    return xn;
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
  var Sf = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function mo(e, t) {
    Sf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
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
  function xf(e) {
    var t = "";
    return e && (ss(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ur(e) {
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
    vo(e) || (e._valueTracker = Ur(e));
  }
  function ho(e) {
    if (!e)
      return !1;
    var t = vo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = xf(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function lr(e) {
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
    var n = e, a = t.checked, r = Me({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function ds(e, t) {
    mo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !al && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ar() || "A component", t.type), al = !0), t.value !== void 0 && t.defaultValue !== void 0 && !nl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ar() || "A component", t.type), nl = !0);
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
    t.hasOwnProperty("value") ? ge(n, t.type, r) : t.hasOwnProperty("defaultValue") && ge(n, t.type, Na(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
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
  function A(e, t) {
    var n = e;
    y(n, t), G(n, t);
  }
  function G(e, t) {
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
  function ge(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || lr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Rn(e._wrapperState.initialValue) : e.defaultValue !== Rn(n) && (e.defaultValue = Rn(n)));
  }
  var ue = !1, Ce = !1, Fe = !1;
  function et(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? c.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ce || (Ce = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Fe || (Fe = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ue && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ue = !0);
  }
  function lt(e, t) {
    t.value != null && e.setAttribute("value", Rn(Na(t.value)));
  }
  var ot = Array.isArray;
  function Ue(e) {
    return ot(e);
  }
  var mt;
  mt = !1;
  function Rt() {
    var e = Ar();
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
          var a = Ue(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Rt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Rt());
        }
      }
    }
  }
  function or(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, o = 0; o < i.length; o++)
        l["$" + i[o]] = !0;
      for (var u = 0; u < r.length; u++) {
        var p = l.hasOwnProperty("$" + r[u].value);
        r[u].selected !== p && (r[u].selected = p), p && a && (r[u].defaultSelected = !0);
      }
    } else {
      for (var v = Rn(Na(n)), S = null, E = 0; E < r.length; E++) {
        if (r[E].value === v) {
          r[E].selected = !0, a && (r[E].defaultSelected = !0);
          return;
        }
        S === null && !r[E].disabled && (S = r[E]);
      }
      S !== null && (S.selected = !0);
    }
  }
  function bo(e, t) {
    return Me({}, t, {
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
    a != null ? or(n, !!t.multiple, a, !1) : t.defaultValue != null && or(n, !!t.multiple, t.defaultValue, !0);
  }
  function ps(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? or(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? or(n, !!t.multiple, t.defaultValue, !0) : or(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function Cf(e, t) {
    var n = e, a = t.value;
    a != null && or(n, !!t.multiple, a, !1);
  }
  var Bv = !1;
  function Df(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Me({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Rn(n._wrapperState.initialValue)
    });
    return a;
  }
  function Pv(e, t) {
    var n = e;
    mo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Bv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ar() || "A component"), Bv = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Ue(r)) {
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
  function SE(e, t) {
    $v(e, t);
  }
  var ur = "http://www.w3.org/1999/xhtml", xE = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return xE;
      default:
        return ur;
    }
  }
  function wf(e, t) {
    return e == null || e === ur ? jf(t) : e === Tf && t === "foreignObject" ? ur : e;
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
  }), An = 1, sr = 3, Ct = 8, cr = 9, _f = 11, vs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === sr) {
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
    }, UE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, kE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Gv, "")));
    }, zE = function(e, t) {
      Wv || (Wv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, FE = function(e, t) {
      Qv || (Qv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    qv = function(e, t) {
      e.indexOf("-") > -1 ? AE(e) : OE.test(e) ? UE(e) : Gv.test(t) && kE(e, t), typeof t == "number" && (isNaN(t) ? zE(e, t) : isFinite(t) || FE(e, t));
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
  }, IE = Me({
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
  }, ll = {}, GE = new RegExp("^(aria)-[" + J + "]*$"), WE = new RegExp("^(aria)[A-Z][" + J + "]*$");
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
    var Cn = {}, th = /^on./, ZE = /^on[^A-Z]/, eS = new RegExp("^(aria)-[" + J + "]*$"), tS = new RegExp("^(aria)[A-Z][" + J + "]*$");
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
      if (eS.test(t) || tS.test(t))
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
  var nS = function(e, t, n) {
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
  function aS(e, t, n) {
    Ni(e, t) || nS(e, t, n);
  }
  var nh = 1, Mf = 2, So = 4, rS = nh | Mf | So, xo = null;
  function iS(e) {
    xo !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), xo = e;
  }
  function lS() {
    xo === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), xo = null;
  }
  function oS(e) {
    return e === xo;
  }
  function Af(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === sr ? t.parentNode : t;
  }
  var Uf = null, ol = null, ul = null;
  function ah(e) {
    var t = Ir(e);
    if (t) {
      if (typeof Uf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = Js(n);
        Uf(t.stateNode, t.type, a);
      }
    }
  }
  function uS(e) {
    Uf = e;
  }
  function rh(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function sS() {
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
  }, kf = !1;
  function cS() {
    var e = sS();
    e && (oh(), ih());
  }
  function uh(e, t, n) {
    if (kf)
      return e(t, n);
    kf = !0;
    try {
      return lh(e, t, n);
    } finally {
      kf = !1, cS();
    }
  }
  function fS(e, t, n) {
    lh = e, oh = n;
  }
  function dS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function pS(e, t, n) {
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
        return !!(n.disabled && dS(t));
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
    if (pS(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var zf = !1;
  if (Jt)
    try {
      var Co = {};
      Object.defineProperty(Co, "passive", {
        get: function() {
          zf = !0;
        }
      }), window.addEventListener("test", Co, Co), window.removeEventListener("test", Co, Co);
    } catch {
      zf = !1;
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
    var Ff = document.createElement("react");
    ch = function(t, n, a, r, i, l, o, u, p) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), S = !1, E = !0, w = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
      function U() {
        Ff.removeEventListener(k, ve, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = w);
      }
      var ee = Array.prototype.slice.call(arguments, 3);
      function ve() {
        S = !0, U(), n.apply(a, ee), E = !1;
      }
      var ce, Pe = !1, ke = !1;
      function T(j) {
        if (ce = j.error, Pe = !0, ce === null && j.colno === 0 && j.lineno === 0 && (ke = !0), j.defaultPrevented && ce != null && typeof ce == "object")
          try {
            ce._suppressLogging = !0;
          } catch {
          }
      }
      var k = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", T), Ff.addEventListener(k, ve, !1), v.initEvent(k, !1, !1), Ff.dispatchEvent(v), V && Object.defineProperty(window, "event", V), S && E && (Pe ? ke && (ce = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : ce = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(ce)), window.removeEventListener("error", T), !S)
        return U(), sh.apply(this, arguments);
    };
  }
  var mS = ch, sl = !1, ys = null, gs = !1, Hf = null, vS = {
    onError: function(e) {
      sl = !0, ys = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, o, u) {
    sl = !1, ys = null, mS.apply(vS, arguments);
  }
  function hS(e, t, n, a, r, i, l, o, u) {
    if (Bf.apply(this, arguments), sl) {
      var p = Pf();
      gs || (gs = !0, Hf = p);
    }
  }
  function yS() {
    if (gs) {
      var e = Hf;
      throw gs = !1, Hf = null, e;
    }
  }
  function gS() {
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
  function bS(e) {
    return e._reactInternals !== void 0;
  }
  function NS(e, t) {
    e._reactInternals = t;
  }
  var Ne = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), Dt = (
    /*                    */
    2
  ), We = (
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
  ), Qe = (
    /*                   */
    128
  ), fr = (
    /*            */
    256
  ), Si = (
    /*                          */
    512
  ), dl = (
    /*                     */
    1024
  ), kr = (
    /*                      */
    2048
  ), dr = (
    /*                    */
    4096
  ), xi = (
    /*                   */
    8192
  ), $f = (
    /*             */
    16384
  ), ES = (
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
  ), zr = (
    /*               */
    16777216
  ), Gf = (
    /*              */
    33554432
  ), Wf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    We | dl | 0
  ), Qf = Dt | We | Ei | Do | Si | dr | xi, To = We | fh | Si | xi, pl = kr | Ei, pr = Ri | qf | If, SS = h.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Dt | dr)) !== Ne && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function ph(e) {
    if (e.tag === H) {
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
    return e.tag === x ? e.stateNode.containerInfo : null;
  }
  function xS(e) {
    return Ci(e) === e;
  }
  function RS(e) {
    {
      var t = SS.current;
      if (t !== null && t.tag === D) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Te(n) || "A component"), a._warnedAboutRefsInRender = !0;
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
    if (a.tag !== x)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function yh(e) {
    var t = hh(e);
    return t !== null ? gh(t) : null;
  }
  function gh(e) {
    if (e.tag === B || e.tag === W)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = gh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function CS(e) {
    var t = hh(e);
    return t !== null ? bh(t) : null;
  }
  function bh(e) {
    if (e.tag === B || e.tag === W)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== z) {
        var n = bh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Nh = m.unstable_scheduleCallback, DS = m.unstable_cancelCallback, TS = m.unstable_shouldYield, jS = m.unstable_requestPaint, It = m.unstable_now, wS = m.unstable_getCurrentPriorityLevel, Ns = m.unstable_ImmediatePriority, Kf = m.unstable_UserBlockingPriority, Di = m.unstable_NormalPriority, _S = m.unstable_LowPriority, Xf = m.unstable_IdlePriority, OS = m.unstable_yieldValue, LS = m.unstable_setDisableYieldValue, ml = null, pn = null, ne = null, Ba = !1, Ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function VS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = Me({}, e, {
        getLaneLabelMap: FS,
        injectProfilingHooks: zS
      })), ml = t.inject(e), pn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function MS(e, t) {
    if (pn && typeof pn.onScheduleFiberRoot == "function")
      try {
        pn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function AS(e, t) {
    if (pn && typeof pn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Qe) === Qe;
        if (bn) {
          var a;
          switch (t) {
            case qn:
              a = Ns;
              break;
            case vr:
              a = Kf;
              break;
            case hr:
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
  function US(e) {
    if (pn && typeof pn.onPostCommitFiberRoot == "function")
      try {
        pn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function kS(e) {
    if (pn && typeof pn.onCommitFiberUnmount == "function")
      try {
        pn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function qt(e) {
    if (typeof OS == "function" && (LS(e), N(e)), pn && typeof pn.setStrictMode == "function")
      try {
        pn.setStrictMode(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function zS(e) {
    ne = e;
  }
  function FS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Zf; n++) {
        var a = ix(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function HS(e) {
    ne !== null && typeof ne.markCommitStarted == "function" && ne.markCommitStarted(e);
  }
  function Eh() {
    ne !== null && typeof ne.markCommitStopped == "function" && ne.markCommitStopped();
  }
  function jo(e) {
    ne !== null && typeof ne.markComponentRenderStarted == "function" && ne.markComponentRenderStarted(e);
  }
  function vl() {
    ne !== null && typeof ne.markComponentRenderStopped == "function" && ne.markComponentRenderStopped();
  }
  function BS(e) {
    ne !== null && typeof ne.markComponentPassiveEffectMountStarted == "function" && ne.markComponentPassiveEffectMountStarted(e);
  }
  function PS() {
    ne !== null && typeof ne.markComponentPassiveEffectMountStopped == "function" && ne.markComponentPassiveEffectMountStopped();
  }
  function $S(e) {
    ne !== null && typeof ne.markComponentPassiveEffectUnmountStarted == "function" && ne.markComponentPassiveEffectUnmountStarted(e);
  }
  function YS() {
    ne !== null && typeof ne.markComponentPassiveEffectUnmountStopped == "function" && ne.markComponentPassiveEffectUnmountStopped();
  }
  function IS(e) {
    ne !== null && typeof ne.markComponentLayoutEffectMountStarted == "function" && ne.markComponentLayoutEffectMountStarted(e);
  }
  function qS() {
    ne !== null && typeof ne.markComponentLayoutEffectMountStopped == "function" && ne.markComponentLayoutEffectMountStopped();
  }
  function Sh(e) {
    ne !== null && typeof ne.markComponentLayoutEffectUnmountStarted == "function" && ne.markComponentLayoutEffectUnmountStarted(e);
  }
  function xh() {
    ne !== null && typeof ne.markComponentLayoutEffectUnmountStopped == "function" && ne.markComponentLayoutEffectUnmountStopped();
  }
  function GS(e, t, n) {
    ne !== null && typeof ne.markComponentErrored == "function" && ne.markComponentErrored(e, t, n);
  }
  function WS(e, t, n) {
    ne !== null && typeof ne.markComponentSuspended == "function" && ne.markComponentSuspended(e, t, n);
  }
  function QS(e) {
    ne !== null && typeof ne.markLayoutEffectsStarted == "function" && ne.markLayoutEffectsStarted(e);
  }
  function KS() {
    ne !== null && typeof ne.markLayoutEffectsStopped == "function" && ne.markLayoutEffectsStopped();
  }
  function XS(e) {
    ne !== null && typeof ne.markPassiveEffectsStarted == "function" && ne.markPassiveEffectsStarted(e);
  }
  function JS() {
    ne !== null && typeof ne.markPassiveEffectsStopped == "function" && ne.markPassiveEffectsStopped();
  }
  function Rh(e) {
    ne !== null && typeof ne.markRenderStarted == "function" && ne.markRenderStarted(e);
  }
  function ZS() {
    ne !== null && typeof ne.markRenderYielded == "function" && ne.markRenderYielded();
  }
  function Ch() {
    ne !== null && typeof ne.markRenderStopped == "function" && ne.markRenderStopped();
  }
  function ex(e) {
    ne !== null && typeof ne.markRenderScheduled == "function" && ne.markRenderScheduled(e);
  }
  function tx(e, t) {
    ne !== null && typeof ne.markForceUpdateScheduled == "function" && ne.markForceUpdateScheduled(e, t);
  }
  function Jf(e, t) {
    ne !== null && typeof ne.markStateUpdateScheduled == "function" && ne.markStateUpdateScheduled(e, t);
  }
  var ye = (
    /*                         */
    0
  ), He = (
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
  ), Dh = Math.clz32 ? Math.clz32 : rx, nx = Math.log, ax = Math.LN2;
  function rx(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (nx(t) / ax | 0) | 0;
  }
  var Zf = 31, $ = (
    /*                        */
    0
  ), Gt = (
    /*                          */
    0
  ), xe = (
    /*                        */
    1
  ), hl = (
    /*    */
    2
  ), mr = (
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
  function ix(e) {
    {
      if (e & xe)
        return "Sync";
      if (e & hl)
        return "InputContinuousHydration";
      if (e & mr)
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
  var ut = -1, Ss = _o, xs = gl;
  function Vo(e) {
    switch (wi(e)) {
      case xe:
        return xe;
      case hl:
        return hl;
      case mr:
        return mr;
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
    if (n === $)
      return $;
    var a = $, r = e.suspendedLanes, i = e.pingedLanes, l = n & jh;
    if (l !== $) {
      var o = l & ~r;
      if (o !== $)
        a = Vo(o);
      else {
        var u = l & i;
        u !== $ && (a = Vo(u));
      }
    } else {
      var p = n & ~r;
      p !== $ ? a = Vo(p) : i !== $ && (a = Vo(i));
    }
    if (a === $)
      return $;
    if (t !== $ && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === $) {
      var v = wi(a), S = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= S || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === $a && (S & yl) !== $
      )
        return t;
    }
    (a & mr) !== $ && (a |= n & $a);
    var E = e.entangledLanes;
    if (E !== $)
      for (var w = e.entanglements, V = a & E; V > 0; ) {
        var U = _i(V), ee = 1 << U;
        a |= w[U], V &= ~ee;
      }
    return a;
  }
  function lx(e, t) {
    for (var n = e.eventTimes, a = ut; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function ox(e, t) {
    switch (e) {
      case xe:
      case hl:
      case mr:
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
  function ux(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o, p = i[o];
      p === ut ? ((u & a) === $ || (u & r) !== $) && (i[o] = ox(u, t)) : p <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function sx(e) {
    return Vo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~Yn;
    return t !== $ ? t : t & Yn ? Yn : $;
  }
  function cx(e) {
    return (e & xe) !== $;
  }
  function Nd(e) {
    return (e & jh) !== $;
  }
  function wh(e) {
    return (e & Es) === e;
  }
  function fx(e) {
    var t = xe | mr | $a;
    return (e & t) === $;
  }
  function dx(e) {
    return (e & yl) === e;
  }
  function Cs(e, t) {
    var n = hl | mr | Ti | $a;
    return (t & n) !== $;
  }
  function px(e, t) {
    return (t & e.expiredLanes) !== $;
  }
  function _h(e) {
    return (e & yl) !== $;
  }
  function Oh() {
    var e = Ss;
    return Ss <<= 1, (Ss & yl) === $ && (Ss = _o), e;
  }
  function mx() {
    var e = xs;
    return xs <<= 1, (xs & Es) === $ && (xs = gl), e;
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
    return (e & t) !== $;
  }
  function bl(e, t) {
    return (e & t) === t;
  }
  function Le(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Lh(e, t) {
    return e & t;
  }
  function g_(e) {
    return e;
  }
  function vx(e, t) {
    return e !== Gt && e < t ? e : t;
  }
  function Sd(e) {
    for (var t = [], n = 0; n < Zf; n++)
      t.push(e);
    return t;
  }
  function Ao(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = $, e.pingedLanes = $);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function hx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = ut, a &= ~i;
    }
  }
  function Vh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function yx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o;
      a[o] = $, r[o] = ut, i[o] = ut, l &= ~u;
    }
  }
  function xd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = _i(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function gx(e, t) {
    var n = wi(t), a;
    switch (n) {
      case mr:
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
  function Uh(e, t) {
    return null;
  }
  var qn = xe, vr = mr, hr = $a, Ts = ji, Uo = Gt;
  function Sa() {
    return Uo;
  }
  function Wt(e) {
    Uo = e;
  }
  function bx(e, t) {
    var n = Uo;
    try {
      return Uo = e, t();
    } finally {
      Uo = n;
    }
  }
  function Nx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function Ex(e, t) {
    return e > t ? e : t;
  }
  function Rd(e, t) {
    return e !== 0 && e < t;
  }
  function kh(e) {
    var t = wi(e);
    return Rd(qn, t) ? Rd(vr, t) ? Nd(t) ? hr : Ts : vr : qn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var zh;
  function Sx(e) {
    zh = e;
  }
  function xx(e) {
    zh(e);
  }
  var Cd;
  function Rx(e) {
    Cd = e;
  }
  var Fh;
  function Cx(e) {
    Fh = e;
  }
  var Hh;
  function Dx(e) {
    Hh = e;
  }
  var Bh;
  function Tx(e) {
    Bh = e;
  }
  var Dd = !1, ws = [], Fr = null, Hr = null, Br = null, ko = /* @__PURE__ */ new Map(), zo = /* @__PURE__ */ new Map(), Pr = [], jx = [
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
  function wx(e) {
    return jx.indexOf(e) > -1;
  }
  function _x(e, t, n, a, r) {
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
        Fr = null;
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
        ko.delete(n);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var a = t.pointerId;
        zo.delete(a);
        break;
      }
    }
  }
  function Fo(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = _x(t, n, a, r, i);
      if (t !== null) {
        var o = Ir(t);
        o !== null && Cd(o);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var u = e.targetContainers;
    return r !== null && u.indexOf(r) === -1 && u.push(r), e;
  }
  function Ox(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Fr = Fo(Fr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Hr = Fo(Hr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var o = r;
        return Br = Fo(Br, e, t, n, a, o), !0;
      }
      case "pointerover": {
        var u = r, p = u.pointerId;
        return ko.set(p, Fo(ko.get(p) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var v = r, S = v.pointerId;
        return zo.set(S, Fo(zo.get(S) || null, e, t, n, a, v)), !0;
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
        if (a === H) {
          var r = ph(n);
          if (r !== null) {
            e.blockedOn = r, Bh(e.priority, function() {
              Fh(n);
            });
            return;
          }
        } else if (a === x) {
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
  function Lx(e) {
    for (var t = Hh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Pr.length && Rd(t, Pr[a].priority); a++)
      ;
    Pr.splice(a, 0, n), a === 0 && $h(n);
  }
  function _s(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = wd(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        iS(i), r.target.dispatchEvent(i), lS();
      } else {
        var l = Ir(a);
        return l !== null && Cd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Yh(e, t, n) {
    _s(e) && n.delete(t);
  }
  function Vx() {
    Dd = !1, Fr !== null && _s(Fr) && (Fr = null), Hr !== null && _s(Hr) && (Hr = null), Br !== null && _s(Br) && (Br = null), ko.forEach(Yh), zo.forEach(Yh);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, Vx)));
  }
  function Bo(e) {
    if (ws.length > 0) {
      Ho(ws[0], e);
      for (var t = 1; t < ws.length; t++) {
        var n = ws[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Fr !== null && Ho(Fr, e), Hr !== null && Ho(Hr, e), Br !== null && Ho(Br, e);
    var a = function(o) {
      return Ho(o, e);
    };
    ko.forEach(a), zo.forEach(a);
    for (var r = 0; r < Pr.length; r++) {
      var i = Pr[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; Pr.length > 0; ) {
      var l = Pr[0];
      if (l.blockedOn !== null)
        break;
      $h(l), l.blockedOn === null && Pr.shift();
    }
  }
  var Nl = h.ReactCurrentBatchConfig, Td = !0;
  function Ih(e) {
    Td = !!e;
  }
  function Mx() {
    return Td;
  }
  function Ax(e, t, n) {
    var a = qh(t), r;
    switch (a) {
      case qn:
        r = Ux;
        break;
      case vr:
        r = kx;
        break;
      case hr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function Ux(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Wt(qn), jd(e, t, n, a);
    } finally {
      Wt(r), Nl.transition = i;
    }
  }
  function kx(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Wt(vr), jd(e, t, n, a);
    } finally {
      Wt(r), Nl.transition = i;
    }
  }
  function jd(e, t, n, a) {
    Td && zx(e, t, n, a);
  }
  function zx(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      $d(e, t, a, Os, n), Ph(e, a);
      return;
    }
    if (Ox(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Ph(e, a), t & So && wx(e)) {
      for (; r !== null; ) {
        var i = Ir(r);
        i !== null && xx(i);
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
        if (o === H) {
          var u = ph(l);
          if (u !== null)
            return u;
          i = null;
        } else if (o === x) {
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
        return vr;
      case "message": {
        var t = wS();
        switch (t) {
          case Ns:
            return qn;
          case Kf:
            return vr;
          case Di:
          case _S:
            return hr;
          case Xf:
            return Ts;
          default:
            return hr;
        }
      }
      default:
        return hr;
    }
  }
  function Fx(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function Hx(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function Bx(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function Px(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Po = null, _d = null, $o = null;
  function $x(e) {
    return Po = e, _d = Wh(), !0;
  }
  function Yx() {
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
    return Me(t.prototype, {
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
  }, Od = Gn(El), Yo = Me({}, El, {
    view: 0,
    detail: 0
  }), Ix = Gn(Yo), Ld, Vd, Io;
  function qx(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Ld = e.screenX - Io.screenX, Vd = e.screenY - Io.screenY) : (Ld = 0, Vd = 0), Io = e);
  }
  var Ms = Me({}, Yo, {
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
      return "movementX" in e ? e.movementX : (qx(e), Ld);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Vd;
    }
  }), Kh = Gn(Ms), Gx = Me({}, Ms, {
    dataTransfer: 0
  }), Wx = Gn(Gx), Qx = Me({}, Yo, {
    relatedTarget: 0
  }), Md = Gn(Qx), Kx = Me({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xx = Gn(Kx), Jx = Me({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Zx = Gn(Jx), eR = Me({}, El, {
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
  var oR = Me({}, Yo, {
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
  }), uR = Gn(oR), sR = Me({}, Ms, {
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
  }), Jh = Gn(sR), cR = Me({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ad
  }), fR = Gn(cR), dR = Me({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pR = Gn(dR), mR = Me({}, Ms, {
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
  }), vR = Gn(mR), hR = [9, 13, 27, 32], Zh = 229, Ud = Jt && "CompositionEvent" in window, qo = null;
  Jt && "documentMode" in document && (qo = document.documentMode);
  var yR = Jt && "TextEvent" in window && !qo, ey = Jt && (!Ud || qo && qo > 8 && qo <= 11), ty = 32, ny = String.fromCharCode(ty);
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
  var Sl = !1;
  function SR(e, t, n, a, r) {
    var i, l;
    if (Ud ? i = NR(t) : Sl ? ry(t, a) && (i = "onCompositionEnd") : ER(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ey && !ly(a) && (!Sl && i === "onCompositionStart" ? Sl = $x(r) : i === "onCompositionEnd" && Sl && (l = Gh()));
    var o = Fs(n, i);
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
  function xR(e, t) {
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
    if (Sl) {
      if (e === "compositionend" || !Ud && ry(e, t)) {
        var n = Gh();
        return Yx(), Sl = !1, n;
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
    if (yR ? i = xR(t, a) : i = RR(t, a), !i)
      return null;
    var l = Fs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new tR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function DR(e, t, n, a, r, i, l) {
    SR(e, t, n, a, r), CR(e, t, n, a, r);
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
    var r = Fs(t, "onChange");
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
  function UR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Wo);
  }
  function kR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function zR(e, t) {
    if (e === "click")
      return As(t);
  }
  function FR(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function HR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || ge(e, "number", e.value);
  }
  function BR(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window, u, p;
    if (_R(o) ? u = VR : oy(o) ? sy ? u = FR : (u = UR, p = AR) : kR(o) && (u = zR), u) {
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
    if (o && !oS(a)) {
      var p = a.relatedTarget || a.fromElement;
      if (p && (Vi(p) || su(p)))
        return;
    }
    if (!(!u && !o)) {
      var v;
      if (r.window === r)
        v = r;
      else {
        var S = r.ownerDocument;
        S ? v = S.defaultView || S.parentWindow : v = window;
      }
      var E, w;
      if (u) {
        var V = a.relatedTarget || a.toElement;
        if (E = n, w = V ? Vi(V) : null, w !== null) {
          var U = Ci(w);
          (w !== U || w.tag !== B && w.tag !== W) && (w = null);
        }
      } else
        E = null, w = n;
      if (E !== w) {
        var ee = Kh, ve = "onMouseLeave", ce = "onMouseEnter", Pe = "mouse";
        (t === "pointerout" || t === "pointerover") && (ee = Jh, ve = "onPointerLeave", ce = "onPointerEnter", Pe = "pointer");
        var ke = E == null ? v : jl(E), T = w == null ? v : jl(w), k = new ee(ve, Pe + "leave", E, a, r);
        k.target = ke, k.relatedTarget = T;
        var j = null, I = Vi(r);
        if (I === n) {
          var re = new ee(ce, Pe + "enter", w, a, r);
          re.target = T, re.relatedTarget = ke, j = re;
        }
        pC(e, k, j, E, w);
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
      if (n.nodeType === sr) {
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
    var i = 0, l = -1, o = -1, u = 0, p = 0, v = e, S = null;
    e: for (; ; ) {
      for (var E = null; v === t && (n === 0 || v.nodeType === sr) && (l = i + n), v === a && (r === 0 || v.nodeType === sr) && (o = i + r), v.nodeType === sr && (i += v.nodeValue.length), (E = v.firstChild) !== null; )
        S = v, v = E;
      for (; ; ) {
        if (v === e)
          break e;
        if (S === t && ++u === n && (l = i), S === a && ++p === r && (o = i), (E = v.nextSibling) !== null)
          break;
        v = S, S = v.parentNode;
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
        var S = n.createRange();
        S.setStart(p.node, p.offset), r.removeAllRanges(), l > o ? (r.addRange(S), r.extend(v.node, v.offset)) : (S.setEnd(v.node, v.offset), r.addRange(S));
      }
    }
  }
  function my(e) {
    return e && e.nodeType === sr;
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
    for (var e = window, t = lr(); t instanceof e.HTMLIFrameElement; ) {
      if (KR(t))
        e = t.contentWindow;
      else
        return t;
      t = lr(e.document);
    }
    return t;
  }
  function kd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function XR() {
    var e = hy();
    return {
      focusedElem: e,
      selectionRange: kd(e) ? ZR(e) : null
    };
  }
  function JR(e) {
    var t = hy(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && QR(n)) {
      a !== null && kd(n) && eC(n, a);
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
  var xl = null, zd = null, Ko = null, Fd = !1;
  function aC(e) {
    if ("selectionStart" in e && kd(e))
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
    return e.window === e ? e.document : e.nodeType === cr ? e : e.ownerDocument;
  }
  function yy(e, t, n) {
    var a = rC(n);
    if (!(Fd || xl == null || xl !== lr(a))) {
      var r = aC(xl);
      if (!Ko || !Qo(Ko, r)) {
        Ko = r;
        var i = Fs(zd, "onSelect");
        if (i.length > 0) {
          var l = new Od("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = xl;
        }
      }
    }
  }
  function iC(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (oy(o) || o.contentEditable === "true") && (xl = o, zd = n, Ko = null);
        break;
      case "focusout":
        xl = null, zd = null, Ko = null;
        break;
      case "mousedown":
        Fd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Fd = !1, yy(e, a, r);
        break;
      case "selectionchange":
        if (tC)
          break;
      case "keydown":
      case "keyup":
        yy(e, a, r);
    }
  }
  function Us(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Rl = {
    animationend: Us("Animation", "AnimationEnd"),
    animationiteration: Us("Animation", "AnimationIteration"),
    animationstart: Us("Animation", "AnimationStart"),
    transitionend: Us("Transition", "TransitionEnd")
  }, Hd = {}, gy = {};
  Jt && (gy = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
  function ks(e) {
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
  var by = ks("animationend"), Ny = ks("animationiteration"), Ey = ks("animationstart"), Sy = ks("transitionend"), xy = /* @__PURE__ */ new Map(), Ry = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function $r(e, t) {
    xy.set(e, t), Kt(t, [e]);
  }
  function lC() {
    for (var e = 0; e < Ry.length; e++) {
      var t = Ry[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      $r(n, "on" + a);
    }
    $r(by, "onAnimationEnd"), $r(Ny, "onAnimationIteration"), $r(Ey, "onAnimationStart"), $r("dblclick", "onDoubleClick"), $r("focusin", "onFocus"), $r("focusout", "onBlur"), $r(Sy, "onTransitionEnd");
  }
  function oC(e, t, n, a, r, i, l) {
    var o = xy.get(t);
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
          u = Wx;
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
          u = Xx;
          break;
        case Sy:
          u = pR;
          break;
        case "scroll":
          u = Ix;
          break;
        case "wheel":
          u = vR;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = Zx;
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
      var v = (i & So) !== 0;
      {
        var S = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", E = fC(n, o, a.type, v, S);
        if (E.length > 0) {
          var w = new u(o, p, null, a, r);
          e.push({
            event: w,
            listeners: E
          });
        }
      }
    }
  }
  lC(), PR(), wR(), nC(), gR();
  function uC(e, t, n, a, r, i, l) {
    oC(e, t, n, a, r, i);
    var o = (i & rS) === 0;
    o && ($R(e, t, n, a, r), BR(e, t, n, a, r), iC(e, t, n, a, r), DR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function Cy(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, hS(a, t, void 0, e), e.currentTarget = null;
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
        var v = t[p], S = v.instance, E = v.currentTarget, w = v.listener;
        if (S !== a && e.isPropagationStopped())
          return;
        Cy(e, w, E), a = S;
      }
  }
  function Dy(e, t) {
    for (var n = (t & So) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      sC(i, l, n);
    }
    yS();
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
    t && (a |= So), Ty(n, e, a, t);
  }
  var zs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[zs]) {
      e[zs] = !0, Ua.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || Pd(n, !1, e), Pd(n, !0, e));
      });
      var t = e.nodeType === cr ? e : e.ownerDocument;
      t !== null && (t[zs] || (t[zs] = !0, Pd("selectionchange", !1, t)));
    }
  }
  function Ty(e, t, n, a, r) {
    var i = Ax(e, t, n), l = void 0;
    zf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? Bx(e, t, i, l) : Hx(e, t, i) : l !== void 0 ? Px(e, t, i, l) : Fx(e, t, i);
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
          if (u === x || u === z) {
            var p = o.stateNode.containerInfo;
            if (jy(p, l))
              break;
            if (u === z)
              for (var v = o.return; v !== null; ) {
                var S = v.tag;
                if (S === x || S === z) {
                  var E = v.stateNode.containerInfo;
                  if (jy(E, l))
                    return;
                }
                v = v.return;
              }
            for (; p !== null; ) {
              var w = Vi(p);
              if (w === null)
                return;
              var V = w.tag;
              if (V === B || V === W) {
                o = i = w;
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
      var S = p, E = S.stateNode, w = S.tag;
      if (w === B && E !== null && (v = E, o !== null)) {
        var V = Ro(p, o);
        V != null && u.push(Zo(p, V, v));
      }
      if (r)
        break;
      p = p.return;
    }
    return u;
  }
  function Fs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, o = i.tag;
      if (o === B && l !== null) {
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
    while (e && e.tag !== B);
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
      var u = o, p = u.alternate, v = u.stateNode, S = u.tag;
      if (p !== null && p === a)
        break;
      if (S === B && v !== null) {
        var E = v;
        if (r) {
          var w = Ro(o, i);
          w != null && l.unshift(Zo(o, w, E));
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
  var Un = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", _y = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Oy, $s, Ly, Vy;
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
    XE(e, t), JE(e, t), aS(e, t, {
      registrationNameDependencies: Qt,
      possibleRegistrationNames: Pn
    });
  }, Ly = Jt && !document.documentMode, tu = function(e, t, n) {
    if (!Un) {
      var a = Ys(n), r = Ys(t);
      r !== a && (Un = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Oy = function(e) {
    if (!Un) {
      Un = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, $s = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Vy = function(e, t) {
    var n = e.namespaceURI === ur ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
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
    if (i !== r && (a && (Un || (Un = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && we))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function My(e) {
    return e.nodeType === cr ? e : e.ownerDocument;
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
        else i === Hs || i === Yr || i === _y || (Qt.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && dt("scroll", t)) : l != null && ya(t, i, l, r));
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
    if (o === ur && (o = jf(e)), o === ur) {
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
    return o === ur && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Ln.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function EC(e, t) {
    return My(t).createTextNode(e);
  }
  function SC(e, t, n, a) {
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
  function xC(e, t, n, a, r) {
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
          var S = l[u];
          for (p in S)
            S.hasOwnProperty(p) && (v || (v = {}), v[p] = "");
        } else u === eu || u === Oi || u === Hs || u === Yr || u === _y || (Qt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in o) {
      var E = o[u], w = l != null ? l[u] : void 0;
      if (!(!o.hasOwnProperty(u) || E === w || E == null && w == null))
        if (u === Li)
          if (E && Object.freeze(E), w) {
            for (p in w)
              w.hasOwnProperty(p) && (!E || !E.hasOwnProperty(p)) && (v || (v = {}), v[p] = "");
            for (p in E)
              E.hasOwnProperty(p) && w[p] !== E[p] && (v || (v = {}), v[p] = E[p]);
          } else
            v || (i || (i = []), i.push(u, v)), v = E;
        else if (u === eu) {
          var V = E ? E[Bs] : void 0, U = w ? w[Bs] : void 0;
          V != null && U !== V && (i = i || []).push(u, V);
        } else u === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(u, "" + E) : u === Hs || u === Yr || (Qt.hasOwnProperty(u) ? (E != null && (typeof E != "function" && $s(u, E), u === "onScroll" && dt("scroll", e)), !i && w !== E && (i = [])) : (i = i || []).push(u, E));
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
      for (var v = e.attributes, S = 0; S < v.length; S++) {
        var E = v[S].name.toLowerCase();
        switch (E) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            u.add(v[S].name);
        }
      }
    }
    var w = null;
    for (var V in n)
      if (n.hasOwnProperty(V)) {
        var U = n[V];
        if (V === Oi)
          typeof U == "string" ? e.textContent !== U && (n[Yr] !== !0 && Is(e.textContent, U, i, l), w = [Oi, U]) : typeof U == "number" && e.textContent !== "" + U && (n[Yr] !== !0 && Is(e.textContent, U, i, l), w = [Oi, "" + U]);
        else if (Qt.hasOwnProperty(V))
          U != null && (typeof U != "function" && $s(V, U), V === "onScroll" && dt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var ee = void 0, ve = bt(V);
          if (n[Yr] !== !0) {
            if (!(V === Hs || V === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === eu) {
                var ce = e.innerHTML, Pe = U ? U[Bs] : void 0;
                if (Pe != null) {
                  var ke = Vy(e, Pe);
                  ke !== ce && tu(V, ce, ke);
                }
              } else if (V === Li) {
                if (u.delete(V), Ly) {
                  var T = BE(U);
                  ee = e.getAttribute("style"), T !== ee && tu(V, ee, T);
                }
              } else if (o && !Zn)
                u.delete(V.toLowerCase()), ee = ci(e, V, U), U !== ee && tu(V, ee, U);
              else if (!ht(V, ve, o) && !fn(V, U, ve, o)) {
                var k = !1;
                if (ve !== null)
                  u.delete(ve.attributeName), ee = Xi(e, V, U, ve);
                else {
                  var j = a;
                  if (j === ur && (j = jf(t)), j === ur)
                    u.delete(V.toLowerCase());
                  else {
                    var I = CC(V);
                    I !== null && I !== V && (k = !0, u.delete(I)), u.delete(V);
                  }
                  ee = ci(e, V, U);
                }
                var re = Zn;
                !re && U !== ee && !k && tu(V, ee, U);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Yr] !== !0 && Oy(u), t) {
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
    return w;
  }
  function TC(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Id(e, t) {
    {
      if (Un)
        return;
      Un = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function qd(e, t) {
    {
      if (Un)
        return;
      Un = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t, n) {
    {
      if (Un)
        return;
      Un = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Wd(e, t) {
    {
      if (t === "" || Un)
        return;
      Un = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function jC(e, t, n) {
    switch (t) {
      case "input":
        A(e, n);
        return;
      case "textarea":
        SE(e, n);
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
    ], _C = Ay.concat(["button"]), OC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Uy = {
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
      var n = Me({}, e || Uy), a = {
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
    }, ky = {};
    nu = function(e, t, n) {
      n = n || Uy;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = LC(e, r) ? null : a, l = i ? null : VC(e, n), o = i || l;
      if (o) {
        var u = o.tag, p = !!i + "|" + e + "|" + u;
        if (!ky[p]) {
          ky[p] = !0;
          var v = e, S = "";
          if (e === "#text" ? /\S/.test(t) ? v = "Text nodes" : (v = "Whitespace text nodes", S = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : v = "<" + e + ">", i) {
            var E = "";
            u === "table" && e === "tr" && (E += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", v, u, S, E);
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
      case cr:
      case _f: {
        t = a === cr ? "#document" : "#fragment";
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
  function UC(e, t, n) {
    {
      var a = e, r = wf(a.namespace, t), i = au(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function b_(e) {
    return e;
  }
  function kC(e) {
    Qd = Mx(), Kd = XR();
    var t = null;
    return Ih(!1), t;
  }
  function zC(e) {
    JR(Kd), Ih(Qd), Qd = null, Kd = null;
  }
  function FC(e, t, n, a, r) {
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
    switch (SC(e, t, n, a), t) {
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
    return xC(e, t, n, a);
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
    return e === void 0 ? hr : qh(e.type);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, IC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, zy = typeof Promise == "function" ? Promise : void 0, qC = typeof queueMicrotask == "function" ? queueMicrotask : typeof zy < "u" ? function(e) {
    return zy.resolve(null).then(e).catch(GC);
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
  function Fy(e) {
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
    e.nodeType === An ? e.textContent = "" : e.nodeType === cr && e.documentElement && e.removeChild(e.documentElement);
  }
  function s0(e, t, n) {
    return e.nodeType !== An || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function c0(e, t) {
    return t === "" || e.nodeType !== sr ? null : e;
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
      if (t === An || t === sr)
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
    var p = (i.mode & He) !== ye;
    return DC(e, t, n, o, a, p, l);
  }
  function g0(e, t, n, a) {
    return uu(n, e), n.mode & He, TC(e, t);
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
  function S0(e) {
    Bo(e);
  }
  function x0(e) {
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
  function U0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, k0 = "__reactListeners$" + Dl, z0 = "__reactHandles$" + Dl;
  function F0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[k0], delete e[z0];
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
  function Ir(e) {
    var t = e[Tl] || e[ou];
    return t && (t.tag === B || t.tag === W || t.tag === H || t.tag === x) ? t : null;
  }
  function jl(e) {
    if (e.tag === B || e.tag === W)
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
  function xa(e, t, n, a, r) {
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
  var yr = -1;
  function qr(e) {
    return {
      current: e
    };
  }
  function mn(e, t) {
    if (yr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ec[yr] && f("Unexpected Fiber popped."), e.current = ip[yr], ip[yr] = null, ec[yr] = null, yr--;
  }
  function vn(e, t, n) {
    yr++, ip[yr] = e.current, ec[yr] = n, e.current = t;
  }
  var lp;
  lp = {};
  var Qn = {};
  Object.freeze(Qn);
  var gr = qr(Qn), Ya = qr(!1), op = Qn;
  function wl(e, t, n) {
    return n && Ia(t) ? op : gr.current;
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
        var o = Te(e) || "Unknown";
        xa(a, i, "context", o);
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
    mn(Ya, e), mn(gr, e);
  }
  function up(e) {
    mn(Ya, e), mn(gr, e);
  }
  function qy(e, t, n) {
    {
      if (gr.current !== Qn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      vn(gr, t, e), vn(Ya, n, e);
    }
  }
  function Gy(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Te(e) || "Unknown";
          lp[i] || (lp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var o in l)
        if (!(o in r))
          throw new Error((Te(e) || "Unknown") + '.getChildContext(): key "' + o + '" is not defined in childContextTypes.');
      {
        var u = Te(e) || "Unknown";
        xa(r, l, "child context", u);
      }
      return Me({}, n, l);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Qn;
      return op = gr.current, vn(gr, n, e), vn(Ya, Ya.current, e), !0;
    }
  }
  function Wy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Gy(e, t, op);
        a.__reactInternalMemoizedMergedChildContext = r, mn(Ya, e), mn(gr, e), vn(gr, r, e), vn(Ya, n, e);
      } else
        mn(Ya, e), vn(Ya, n, e);
    }
  }
  function B0(e) {
    {
      if (!xS(e) || e.tag !== D)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case x:
            return t.stateNode.context;
          case D: {
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
  var Gr = 0, rc = 1, br = null, sp = !1, cp = !1;
  function Qy(e) {
    br === null ? br = [e] : br.push(e);
  }
  function P0(e) {
    sp = !0, Qy(e);
  }
  function Ky() {
    sp && Wr();
  }
  function Wr() {
    if (!cp && br !== null) {
      cp = !0;
      var e = 0, t = Sa();
      try {
        var n = !0, a = br;
        for (Wt(qn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        br = null, sp = !1;
      } catch (i) {
        throw br !== null && (br = br.slice(e + 1)), Nh(Ns, Wr), i;
      } finally {
        Wt(t), cp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, ic = null, lc = 0, ra = [], ia = 0, Mi = null, Nr = 1, Er = "";
  function $0(e) {
    return Ui(), (e.flags & dh) !== Ne;
  }
  function Y0(e) {
    return Ui(), lc;
  }
  function I0() {
    var e = Er, t = Nr, n = t & ~q0(t);
    return n.toString(32) + e;
  }
  function Ai(e, t) {
    Ui(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Xy(e, t, n) {
    Ui(), ra[ia++] = Nr, ra[ia++] = Er, ra[ia++] = Mi, Mi = e;
    var a = Nr, r = Er, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, u = oc(t) + i;
    if (u > 30) {
      var p = i - i % 5, v = (1 << p) - 1, S = (l & v).toString(32), E = l >> p, w = i - p, V = oc(t) + w, U = o << w, ee = U | E, ve = S + r;
      Nr = 1 << V | ee, Er = ve;
    } else {
      var ce = o << i, Pe = ce | l, ke = r;
      Nr = 1 << u | Pe, Er = ke;
    }
  }
  function fp(e) {
    Ui();
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
      Mi = ra[--ia], ra[ia] = null, Er = ra[--ia], ra[ia] = null, Nr = ra[--ia], ra[ia] = null;
  }
  function G0() {
    return Ui(), Mi !== null ? {
      id: Nr,
      overflow: Er
    } : null;
  }
  function W0(e, t) {
    Ui(), ra[ia++] = Nr, ra[ia++] = Er, ra[ia++] = Mi, Nr = t.id, Er = t.overflow, Mi = e;
  }
  function Ui() {
    tn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var en = null, la = null, Ra = !1, ki = !1, Qr = null;
  function Q0() {
    Ra && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Jy() {
    ki = !0;
  }
  function K0() {
    return ki;
  }
  function X0(e) {
    var t = e.stateNode.containerInfo;
    return la = v0(t), en = e, Ra = !0, Qr = null, ki = !1, !0;
  }
  function J0(e, t, n) {
    return la = h0(t), en = e, Ra = !0, Qr = null, ki = !1, n !== null && W0(e, n), !0;
  }
  function Zy(e, t) {
    switch (e.tag) {
      case x: {
        D0(e.stateNode.containerInfo, t);
        break;
      }
      case B: {
        var n = (e.mode & He) !== ye;
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
      case H: {
        var a = e.memoizedState;
        a.dehydrated !== null && T0(a.dehydrated, t);
        break;
      }
    }
  }
  function eg(e, t) {
    Zy(e, t);
    var n = nw();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ei) : a.push(n);
  }
  function pp(e, t) {
    {
      if (ki)
        return;
      switch (e.tag) {
        case x: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case B:
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
        case B: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case B: {
              var u = t.type, p = t.pendingProps, v = (e.mode & He) !== ye;
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
              var S = t.pendingProps, E = (e.mode & He) !== ye;
              M0(
                i,
                l,
                o,
                S,
                // TODO: Delete this argument when we remove the legacy root API.
                E
              );
              break;
            }
          }
          break;
        }
        case H: {
          var w = e.memoizedState, V = w.dehydrated;
          if (V !== null) switch (t.tag) {
            case B:
              var U = t.type;
              t.pendingProps, O0(V, U);
              break;
            case W:
              var ee = t.pendingProps;
              L0(V, ee);
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
    t.flags = t.flags & ~dr | Dt, pp(e, t);
  }
  function ng(e, t) {
    switch (e.tag) {
      case B: {
        var n = e.type;
        e.pendingProps;
        var a = s0(t, n);
        return a !== null ? (e.stateNode = a, en = e, la = m0(a), !0) : !1;
      }
      case W: {
        var r = e.pendingProps, i = c0(t, r);
        return i !== null ? (e.stateNode = i, en = e, la = null, !0) : !1;
      }
      case H: {
        var l = f0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: G0(),
            retryLane: Yn
          };
          e.memoizedState = o;
          var u = aw(l);
          return u.return = e, e.child = u, en = e, la = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function mp(e) {
    return (e.mode & He) !== ye && (e.flags & Qe) === Ne;
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
    var a = e.stateNode, r = !ki, i = y0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function eD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = g0(t, n, e);
    if (a) {
      var r = en;
      if (r !== null)
        switch (r.tag) {
          case x: {
            var i = r.stateNode.containerInfo, l = (r.mode & He) !== ye;
            R0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case B: {
            var o = r.type, u = r.memoizedProps, p = r.stateNode, v = (r.mode & He) !== ye;
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
    for (var t = e.return; t !== null && t.tag !== B && t.tag !== x && t.tag !== H; )
      t = t.return;
    en = t;
  }
  function uc(e) {
    if (e !== en)
      return !1;
    if (!Ra)
      return ag(e), Ra = !0, !1;
    if (e.tag !== x && (e.tag !== B || x0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = la;
      if (t)
        if (mp(e))
          rg(e), vp();
        else
          for (; t; )
            eg(e, t), t = lu(t);
    }
    return ag(e), e.tag === H ? la = nD(e) : la = en ? lu(e.stateNode) : null, !0;
  }
  function aD() {
    return Ra && la !== null;
  }
  function rg(e) {
    for (var t = la; t; )
      Zy(e, t), t = lu(t);
  }
  function Vl() {
    en = null, la = null, Ra = !1, ki = !1;
  }
  function ig() {
    Qr !== null && (Jb(Qr), Qr = null);
  }
  function tn() {
    return Ra;
  }
  function yp(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
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
    }, zi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, cu = [], fu = [], du = [], pu = [], mu = [], vu = [], Fi = /* @__PURE__ */ new Set();
    Ca.recordUnsafeLifecycleWarnings = function(e, t) {
      Fi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && cu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillMount == "function" && fu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & Et && typeof t.UNSAFE_componentWillReceiveProps == "function" && pu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Ca.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(E) {
        e.add(Te(E) || "Component"), Fi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(Te(E) || "Component"), Fi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(Te(E) || "Component"), Fi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(Te(E) || "Component"), Fi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(Te(E) || "Component"), Fi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(Te(E) || "Component"), Fi.add(E.type);
      }), vu = []), t.size > 0) {
        var l = zi(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var o = zi(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, o);
      }
      if (i.size > 0) {
        var u = zi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, u);
      }
      if (e.size > 0) {
        var p = zi(e);
        C(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, p);
      }
      if (n.size > 0) {
        var v = zi(n);
        C(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var S = zi(r);
        C(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, S);
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
            a.add(Te(i) || "Component"), lg.add(i.type);
          });
          var r = zi(a);
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
  var gp, bp, Np, Ep, Sp, og = function(e, t) {
  };
  gp = !1, bp = !1, Np = {}, Ep = {}, Sp = {}, og = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Te(t) || "Component";
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
      !(n._owner && n._owner.tag !== D) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !uD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Te(e) || "Component";
        Np[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Np[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var o = i;
          if (o.tag !== D)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = o.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var u = l;
        nr(a, "ref");
        var p = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === p)
          return t.ref;
        var v = function(S) {
          var E = u.refs;
          S === null ? delete E[p] : E[p] = S;
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
      var t = Te(e) || "Component";
      if (Sp[t])
        return;
      Sp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function ug(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function sg(e) {
    function t(T, k) {
      if (e) {
        var j = T.deletions;
        j === null ? (T.deletions = [k], T.flags |= Ei) : j.push(k);
      }
    }
    function n(T, k) {
      if (!e)
        return null;
      for (var j = k; j !== null; )
        t(T, j), j = j.sibling;
      return null;
    }
    function a(T, k) {
      for (var j = /* @__PURE__ */ new Map(), I = k; I !== null; )
        I.key !== null ? j.set(I.key, I) : j.set(I.index, I), I = I.sibling;
      return j;
    }
    function r(T, k) {
      var j = Wi(T, k);
      return j.index = 0, j.sibling = null, j;
    }
    function i(T, k, j) {
      if (T.index = j, !e)
        return T.flags |= dh, k;
      var I = T.alternate;
      if (I !== null) {
        var re = I.index;
        return re < k ? (T.flags |= Dt, k) : re;
      } else
        return T.flags |= Dt, k;
    }
    function l(T) {
      return e && T.alternate === null && (T.flags |= Dt), T;
    }
    function o(T, k, j, I) {
      if (k === null || k.tag !== W) {
        var re = yv(j, T.mode, I);
        return re.return = T, re;
      } else {
        var te = r(k, j);
        return te.return = T, te;
      }
    }
    function u(T, k, j, I) {
      var re = j.type;
      if (re === za)
        return v(T, k, j.props.children, I, j.key);
      if (k !== null && (k.elementType === re || // Keep this check inline so it only runs on the false path:
      mN(k, j) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof re == "object" && re !== null && re.$$typeof === he && ug(re) === k.type)) {
        var te = r(k, j.props);
        return te.ref = hu(T, k, j), te.return = T, te._debugSource = j._source, te._debugOwner = j._owner, te;
      }
      var Ee = hv(j, T.mode, I);
      return Ee.ref = hu(T, k, j), Ee.return = T, Ee;
    }
    function p(T, k, j, I) {
      if (k === null || k.tag !== z || k.stateNode.containerInfo !== j.containerInfo || k.stateNode.implementation !== j.implementation) {
        var re = gv(j, T.mode, I);
        return re.return = T, re;
      } else {
        var te = r(k, j.children || []);
        return te.return = T, te;
      }
    }
    function v(T, k, j, I, re) {
      if (k === null || k.tag !== fe) {
        var te = li(j, T.mode, I, re);
        return te.return = T, te;
      } else {
        var Ee = r(k, j);
        return Ee.return = T, Ee;
      }
    }
    function S(T, k, j) {
      if (typeof k == "string" && k !== "" || typeof k == "number") {
        var I = yv("" + k, T.mode, j);
        return I.return = T, I;
      }
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case na: {
            var re = hv(k, T.mode, j);
            return re.ref = hu(T, null, k), re.return = T, re;
          }
          case $n: {
            var te = gv(k, T.mode, j);
            return te.return = T, te;
          }
          case he: {
            var Ee = k._payload, De = k._init;
            return S(T, De(Ee), j);
          }
        }
        if (Ue(k) || ba(k)) {
          var at = li(k, T.mode, j, null);
          return at.return = T, at;
        }
        cc(T, k);
      }
      return typeof k == "function" && fc(T), null;
    }
    function E(T, k, j, I) {
      var re = k !== null ? k.key : null;
      if (typeof j == "string" && j !== "" || typeof j == "number")
        return re !== null ? null : o(T, k, "" + j, I);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case na:
            return j.key === re ? u(T, k, j, I) : null;
          case $n:
            return j.key === re ? p(T, k, j, I) : null;
          case he: {
            var te = j._payload, Ee = j._init;
            return E(T, k, Ee(te), I);
          }
        }
        if (Ue(j) || ba(j))
          return re !== null ? null : v(T, k, j, I, null);
        cc(T, j);
      }
      return typeof j == "function" && fc(T), null;
    }
    function w(T, k, j, I, re) {
      if (typeof I == "string" && I !== "" || typeof I == "number") {
        var te = T.get(j) || null;
        return o(k, te, "" + I, re);
      }
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case na: {
            var Ee = T.get(I.key === null ? j : I.key) || null;
            return u(k, Ee, I, re);
          }
          case $n: {
            var De = T.get(I.key === null ? j : I.key) || null;
            return p(k, De, I, re);
          }
          case he:
            var at = I._payload, Ie = I._init;
            return w(T, k, j, Ie(at), re);
        }
        if (Ue(I) || ba(I)) {
          var xt = T.get(j) || null;
          return v(k, xt, I, re, null);
        }
        cc(k, I);
      }
      return typeof I == "function" && fc(k), null;
    }
    function V(T, k, j) {
      {
        if (typeof T != "object" || T === null)
          return k;
        switch (T.$$typeof) {
          case na:
          case $n:
            og(T, j);
            var I = T.key;
            if (typeof I != "string")
              break;
            if (k === null) {
              k = /* @__PURE__ */ new Set(), k.add(I);
              break;
            }
            if (!k.has(I)) {
              k.add(I);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", I);
            break;
          case he:
            var re = T._payload, te = T._init;
            V(te(re), k, j);
            break;
        }
      }
      return k;
    }
    function U(T, k, j, I) {
      for (var re = null, te = 0; te < j.length; te++) {
        var Ee = j[te];
        re = V(Ee, re, T);
      }
      for (var De = null, at = null, Ie = k, xt = 0, qe = 0, St = null; Ie !== null && qe < j.length; qe++) {
        Ie.index > qe ? (St = Ie, Ie = null) : St = Ie.sibling;
        var yn = E(T, Ie, j[qe], I);
        if (yn === null) {
          Ie === null && (Ie = St);
          break;
        }
        e && Ie && yn.alternate === null && t(T, Ie), xt = i(yn, xt, qe), at === null ? De = yn : at.sibling = yn, at = yn, Ie = St;
      }
      if (qe === j.length) {
        if (n(T, Ie), tn()) {
          var sn = qe;
          Ai(T, sn);
        }
        return De;
      }
      if (Ie === null) {
        for (; qe < j.length; qe++) {
          var Xn = S(T, j[qe], I);
          Xn !== null && (xt = i(Xn, xt, qe), at === null ? De = Xn : at.sibling = Xn, at = Xn);
        }
        if (tn()) {
          var _n = qe;
          Ai(T, _n);
        }
        return De;
      }
      for (var On = a(T, Ie); qe < j.length; qe++) {
        var gn = w(On, T, qe, j[qe], I);
        gn !== null && (e && gn.alternate !== null && On.delete(gn.key === null ? qe : gn.key), xt = i(gn, xt, qe), at === null ? De = gn : at.sibling = gn, at = gn);
      }
      if (e && On.forEach(function(Jl) {
        return t(T, Jl);
      }), tn()) {
        var jr = qe;
        Ai(T, jr);
      }
      return De;
    }
    function ee(T, k, j, I) {
      var re = ba(j);
      if (typeof re != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        j[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), j.entries === re && (gp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gp = !0);
        var te = re.call(j);
        if (te)
          for (var Ee = null, De = te.next(); !De.done; De = te.next()) {
            var at = De.value;
            Ee = V(at, Ee, T);
          }
      }
      var Ie = re.call(j);
      if (Ie == null)
        throw new Error("An iterable object provided no iterator.");
      for (var xt = null, qe = null, St = k, yn = 0, sn = 0, Xn = null, _n = Ie.next(); St !== null && !_n.done; sn++, _n = Ie.next()) {
        St.index > sn ? (Xn = St, St = null) : Xn = St.sibling;
        var On = E(T, St, _n.value, I);
        if (On === null) {
          St === null && (St = Xn);
          break;
        }
        e && St && On.alternate === null && t(T, St), yn = i(On, yn, sn), qe === null ? xt = On : qe.sibling = On, qe = On, St = Xn;
      }
      if (_n.done) {
        if (n(T, St), tn()) {
          var gn = sn;
          Ai(T, gn);
        }
        return xt;
      }
      if (St === null) {
        for (; !_n.done; sn++, _n = Ie.next()) {
          var jr = S(T, _n.value, I);
          jr !== null && (yn = i(jr, yn, sn), qe === null ? xt = jr : qe.sibling = jr, qe = jr);
        }
        if (tn()) {
          var Jl = sn;
          Ai(T, Jl);
        }
        return xt;
      }
      for (var Wu = a(T, St); !_n.done; sn++, _n = Ie.next()) {
        var Za = w(Wu, T, sn, _n.value, I);
        Za !== null && (e && Za.alternate !== null && Wu.delete(Za.key === null ? sn : Za.key), yn = i(Za, yn, sn), qe === null ? xt = Za : qe.sibling = Za, qe = Za);
      }
      if (e && Wu.forEach(function(Mw) {
        return t(T, Mw);
      }), tn()) {
        var Vw = sn;
        Ai(T, Vw);
      }
      return xt;
    }
    function ve(T, k, j, I) {
      if (k !== null && k.tag === W) {
        n(T, k.sibling);
        var re = r(k, j);
        return re.return = T, re;
      }
      n(T, k);
      var te = yv(j, T.mode, I);
      return te.return = T, te;
    }
    function ce(T, k, j, I) {
      for (var re = j.key, te = k; te !== null; ) {
        if (te.key === re) {
          var Ee = j.type;
          if (Ee === za) {
            if (te.tag === fe) {
              n(T, te.sibling);
              var De = r(te, j.props.children);
              return De.return = T, De._debugSource = j._source, De._debugOwner = j._owner, De;
            }
          } else if (te.elementType === Ee || // Keep this check inline so it only runs on the false path:
          mN(te, j) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Ee == "object" && Ee !== null && Ee.$$typeof === he && ug(Ee) === te.type) {
            n(T, te.sibling);
            var at = r(te, j.props);
            return at.ref = hu(T, te, j), at.return = T, at._debugSource = j._source, at._debugOwner = j._owner, at;
          }
          n(T, te);
          break;
        } else
          t(T, te);
        te = te.sibling;
      }
      if (j.type === za) {
        var Ie = li(j.props.children, T.mode, I, j.key);
        return Ie.return = T, Ie;
      } else {
        var xt = hv(j, T.mode, I);
        return xt.ref = hu(T, k, j), xt.return = T, xt;
      }
    }
    function Pe(T, k, j, I) {
      for (var re = j.key, te = k; te !== null; ) {
        if (te.key === re)
          if (te.tag === z && te.stateNode.containerInfo === j.containerInfo && te.stateNode.implementation === j.implementation) {
            n(T, te.sibling);
            var Ee = r(te, j.children || []);
            return Ee.return = T, Ee;
          } else {
            n(T, te);
            break;
          }
        else
          t(T, te);
        te = te.sibling;
      }
      var De = gv(j, T.mode, I);
      return De.return = T, De;
    }
    function ke(T, k, j, I) {
      var re = typeof j == "object" && j !== null && j.type === za && j.key === null;
      if (re && (j = j.props.children), typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case na:
            return l(ce(T, k, j, I));
          case $n:
            return l(Pe(T, k, j, I));
          case he:
            var te = j._payload, Ee = j._init;
            return ke(T, k, Ee(te), I);
        }
        if (Ue(j))
          return U(T, k, j, I);
        if (ba(j))
          return ee(T, k, j, I);
        cc(T, j);
      }
      return typeof j == "string" && j !== "" || typeof j == "number" ? l(ve(T, k, "" + j, I)) : (typeof j == "function" && fc(T), n(T, k));
    }
    return ke;
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
  var xp = qr(null), Rp;
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
    vn(xp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rp;
  }
  function Dp(e, t) {
    var n = xp.current;
    mn(xp, t), e._currentValue = n;
  }
  function Tp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = Le(r.childLanes, t)) : (a.childLanes = Le(a.childLanes, t), r !== null && (r.childLanes = Le(r.childLanes, t))), a === n)
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
            if (a.tag === D) {
              var o = Mo(n), u = Sr(ut, o);
              u.tag = hc;
              var p = a.updateQueue;
              if (p !== null) {
                var v = p.shared, S = v.pending;
                S === null ? u.next = u : (u.next = S.next, S.next = u), v.pending = u;
              }
            }
            a.lanes = Le(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = Le(E.lanes, n)), Tp(a.return, n, e), i.lanes = Le(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === P)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === je) {
        var w = a.return;
        if (w === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        w.lanes = Le(w.lanes, n);
        var V = w.alternate;
        V !== null && (V.lanes = Le(V.lanes, n)), Tp(w, n, e), r = a.sibling;
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
  function Ul(e, t) {
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
          lanes: $,
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
  function kn(e, t) {
    return vc(e, t);
  }
  var hD = vc;
  function vc(e, t) {
    e.lanes = Le(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Le(n.lanes, t)), n === null && (e.flags & (Dt | dr)) !== Ne && cN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Le(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Le(n.childLanes, t) : (r.flags & (Dt | dr)) !== Ne && cN(e), a = r, r = r.return;
    if (a.tag === x) {
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
        lanes: $
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
  function Sr(e, t) {
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
  function Kr(e, t, n) {
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
        var l = Le(i, n);
        r.lanes = l, xd(e, l);
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
        e.flags = e.flags & ~Dn | Qe;
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
        return p == null ? a : Me({}, a, p);
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
        var S = v.updateQueue, E = S.lastBaseUpdate;
        E !== l && (E === null ? S.firstBaseUpdate = p : E.next = p, S.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var w = r.baseState, V = $, U = null, ee = null, ve = null, ce = i;
      do {
        var Pe = ce.lane, ke = ce.eventTime;
        if (bl(a, Pe)) {
          if (ve !== null) {
            var k = {
              eventTime: ke,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              tag: ce.tag,
              payload: ce.payload,
              callback: ce.callback,
              next: null
            };
            ve = ve.next = k;
          }
          w = yD(e, r, ce, w, t, n);
          var j = ce.callback;
          if (j !== null && // If the update was already committed, we should not queue its
          // callback again.
          ce.lane !== Gt) {
            e.flags |= fh;
            var I = r.effects;
            I === null ? r.effects = [ce] : I.push(ce);
          }
        } else {
          var T = {
            eventTime: ke,
            lane: Pe,
            tag: ce.tag,
            payload: ce.payload,
            callback: ce.callback,
            next: null
          };
          ve === null ? (ee = ve = T, U = w) : ve = ve.next = T, V = Le(V, Pe);
        }
        if (ce = ce.next, ce === null) {
          if (o = r.shared.pending, o === null)
            break;
          var re = o, te = re.next;
          re.next = null, ce = te, r.lastBaseUpdate = re, r.shared.pending = null;
        }
      } while (!0);
      ve === null && (U = w), r.baseState = U, r.firstBaseUpdate = ee, r.lastBaseUpdate = ve;
      var Ee = r.shared.interleaved;
      if (Ee !== null) {
        var De = Ee;
        do
          V = Le(V, De.lane), De = De.next;
        while (De !== Ee);
      } else i === null && (r.shared.lanes = $);
      $u(V), e.lanes = V, e.memoizedState = w;
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
  var yu = {}, Xr = qr(yu), gu = qr(yu), Sc = qr(yu);
  function xc(e) {
    if (e === yu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Ng() {
    var e = xc(Sc.current);
    return e;
  }
  function Vp(e, t) {
    vn(Sc, t, e), vn(gu, e, e), vn(Xr, yu, e);
    var n = AC(t);
    mn(Xr, e), vn(Xr, n, e);
  }
  function kl(e) {
    mn(Xr, e), mn(gu, e), mn(Sc, e);
  }
  function Mp() {
    var e = xc(Xr.current);
    return e;
  }
  function Eg(e) {
    xc(Sc.current);
    var t = xc(Xr.current), n = UC(t, e.type);
    t !== n && (vn(gu, e, e), vn(Xr, n, e));
  }
  function Ap(e) {
    gu.current === e && (mn(Xr, e), mn(gu, e));
  }
  var bD = 0, Sg = 1, xg = 1, bu = 2, Da = qr(bD);
  function Up(e, t) {
    return (e & t) !== 0;
  }
  function zl(e) {
    return e & Sg;
  }
  function kp(e, t) {
    return e & Sg | t;
  }
  function ND(e, t) {
    return e | t;
  }
  function Jr(e, t) {
    vn(Da, t, e);
  }
  function Fl(e) {
    mn(Da, e);
  }
  function ED(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === H) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Hy(a) || tp(a))
            return t;
        }
      } else if (t.tag === _e && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Qe) !== Ne;
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
  var zn = (
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
  ), zp = [];
  function Fp() {
    for (var e = 0; e < zp.length; e++) {
      var t = zp[e];
      t._workInProgressVersionPrimary = null;
    }
    zp.length = 0;
  }
  function SD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ae = h.ReactCurrentDispatcher, Nu = h.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = $, nt = null, Mt = null, At = null, Cc = !1, Eu = !1, Su = 0, xD = 0, RD = 25, F = null, oa = null, Zr = -1, Bp = !1;
  function Ke() {
    {
      var e = F;
      oa === null ? oa = [e] : oa.push(e);
    }
  }
  function Q() {
    {
      var e = F;
      oa !== null && (Zr++, oa[Zr] !== e && CD(e));
    }
  }
  function Bl(e) {
    e != null && !Ue(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", F, typeof e);
  }
  function CD(e) {
    {
      var t = Te(nt);
      if (!Hp.has(t) && (Hp.add(t), oa !== null)) {
        for (var n = "", a = 30, r = 0; r <= Zr; r++) {
          for (var i = oa[r], l = r === Zr ? e : i, o = r + 1 + ". " + i; o.length < a; )
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
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", F), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, F, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Wn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, nt = t, oa = e !== null ? e._debugHookTypes : null, Zr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? ae.current = Ig : oa !== null ? ae.current = Yg : ae.current = $g;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, Su = 0, o >= RD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, Mt = null, At = null, t.updateQueue = null, Zr = -1, ae.current = qg, l = n(a, r);
      } while (Eu);
    }
    ae.current = zc, t._debugHookTypes = oa;
    var u = Mt !== null && Mt.next !== null;
    if (Bi = $, nt = null, Mt = null, At = null, F = null, oa = null, Zr = -1, e !== null && (e.flags & pr) !== (t.flags & pr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & He) !== ye && f("Internal React error: Expected static flag was missing. Please notify the React team."), Cc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function $l() {
    var e = Su !== 0;
    return Su = 0, e;
  }
  function Rg(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Pa) !== ye ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Cg() {
    if (ae.current = zc, Cc) {
      for (var e = nt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = $, nt = null, Mt = null, At = null, oa = null, Zr = -1, F = null, zg = !1, Eu = !1, Su = 0;
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
      lanes: $,
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
      var v = l.next, S = i.baseState, E = null, w = null, V = null, U = v;
      do {
        var ee = U.lane;
        if (bl(Bi, ee)) {
          if (V !== null) {
            var ce = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            };
            V = V.next = ce;
          }
          if (U.hasEagerState)
            S = U.eagerState;
          else {
            var Pe = U.action;
            S = e(S, Pe);
          }
        } else {
          var ve = {
            lane: ee,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          V === null ? (w = V = ve, E = S) : V = V.next = ve, nt.lanes = Le(nt.lanes, ee), $u(ee);
        }
        U = U.next;
      } while (U !== null && U !== v);
      V === null ? E = S : V.next = w, Wn(S, a.memoizedState) || Ou(), a.memoizedState = S, a.baseState = E, a.baseQueue = V, r.lastRenderedState = S;
    }
    var ke = r.interleaved;
    if (ke !== null) {
      var T = ke;
      do {
        var k = T.lane;
        nt.lanes = Le(nt.lanes, k), $u(k), T = T.next;
      } while (T !== ke);
    } else l === null && (r.lanes = $);
    var j = r.dispatch;
    return [a.memoizedState, j];
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
  function N_(e, t, n) {
  }
  function E_(e, t, n) {
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
    return r.queue = p, _c(wg.bind(null, a, p, e), [e]), a.flags |= kr, xu(Lt | nn, jg.bind(null, a, p, i, t), void 0, null), i;
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
      a.flags |= kr, xu(Lt | nn, jg.bind(null, a, p, i, t), void 0, null);
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
    var t = kn(e, xe);
    t !== null && Ft(t, e, xe, ut);
  }
  function Tc(e) {
    var t = Ga();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: $,
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
  function xu(e, t, n, a) {
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
    nt.flags |= e, r.memoizedState = xu(Lt | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = ua(), i = a === void 0 ? null : a, l = void 0;
    if (Mt !== null) {
      var o = Mt.memoizedState;
      if (l = o.destroy, i !== null) {
        var u = o.deps;
        if (Pp(i, u)) {
          r.memoizedState = xu(t, n, l, i);
          return;
        }
      }
    }
    nt.flags |= e, r.memoizedState = xu(Lt | t, n, l, i);
  }
  function _c(e, t) {
    return (nt.mode & Pa) !== ye ? Ru(Gf | kr | qf, nn, e, t) : Ru(kr | qf, nn, e, t);
  }
  function Cu(e, t) {
    return wc(kr, nn, e, t);
  }
  function Xp(e, t) {
    return Ru(We, qa, e, t);
  }
  function Oc(e, t) {
    return wc(We, qa, e, t);
  }
  function Jp(e, t) {
    var n = We;
    return n |= Ri, (nt.mode & Pa) !== ye && (n |= zr), Ru(n, Vt, e, t);
  }
  function Lc(e, t) {
    return wc(We, Vt, e, t);
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
    var a = n != null ? n.concat([e]) : null, r = We;
    return r |= Ri, (nt.mode & Pa) !== ye && (r |= zr), Ru(r, Vt, Lg.bind(null, t, e), a);
  }
  function Vc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(We, Vt, Lg.bind(null, t, e), a);
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
  function Uc(e, t) {
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
    var a = !fx(Bi);
    if (a) {
      if (!Wn(n, t)) {
        var r = Oh();
        nt.lanes = Le(nt.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function TD(e, t, n) {
    var a = Sa();
    Wt(Nx(a, vr)), e(!0);
    var r = Nu.transition;
    Nu.transition = {};
    var i = Nu.transition;
    Nu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Wt(a), Nu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && C("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function am() {
    var e = Tc(!1), t = e[0], n = e[1], a = TD.bind(null, n), r = Ga();
    return r.memoizedState = a, [t, a];
  }
  function Ug() {
    var e = Wp(), t = e[0], n = ua(), a = n.memoizedState;
    return [t, a];
  }
  function kg() {
    var e = Qp(), t = e[0], n = ua(), a = n.memoizedState;
    return [t, a];
  }
  var zg = !1;
  function jD() {
    return zg;
  }
  function rm() {
    var e = Ga(), t = af(), n = t.identifierPrefix, a;
    if (tn()) {
      var r = I0();
      a = ":" + n + "R" + r;
      var i = Su++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = xD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function kc() {
    var e = ua(), t = e.memoizedState;
    return t;
  }
  function wD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ri(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Fg(e))
      Hg(t, r);
    else {
      var i = mg(e, t, r, a);
      if (i !== null) {
        var l = wn();
        Ft(i, e, a, l), Bg(i, t, a);
      }
    }
    Pg(e, a);
  }
  function _D(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ri(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Fg(e))
      Hg(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === $ && (i === null || i.lanes === $)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = ae.current, ae.current = Ta;
          try {
            var u = t.lastRenderedState, p = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = p, Wn(p, u)) {
              mD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ae.current = o;
          }
        }
      }
      var v = mg(e, t, r, a);
      if (v !== null) {
        var S = wn();
        Ft(v, e, a, S), Bg(v, t, a);
      }
    }
    Pg(e, a);
  }
  function Fg(e) {
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
      var r = Le(a, n);
      t.lanes = r, xd(e, r);
    }
  }
  function Pg(e, t, n) {
    Jf(e, t);
  }
  var zc = {
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
  }, $g = null, Yg = null, Ig = null, qg = null, Wa = null, Ta = null, Fc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Re = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    $g = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Ke(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Ke(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Ke(), Bl(t), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Ke(), Bl(n), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Ke(), Bl(t), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Ke(), Bl(t), Jp(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Ke(), Bl(t);
        var n = ae.current;
        ae.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Ke();
        var a = ae.current;
        ae.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Ke(), Kp(e);
      },
      useState: function(e) {
        F = "useState", Ke();
        var t = ae.current;
        ae.current = Wa;
        try {
          return Tc(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Ke(), void 0;
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Ke(), nm(e);
      },
      useTransition: function() {
        return F = "useTransition", Ke(), am();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Ke(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Ke(), Gp(e, t, n);
      },
      useId: function() {
        return F = "useId", Ke(), rm();
      },
      unstable_isNewReconciler: jt
    }, Yg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Q(), em(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Q(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Q(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Q(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Q(), Jp(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Q();
        var n = ae.current;
        ae.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Q();
        var a = ae.current;
        ae.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Q(), Kp(e);
      },
      useState: function(e) {
        F = "useState", Q();
        var t = ae.current;
        ae.current = Wa;
        try {
          return Tc(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Q(), void 0;
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Q(), nm(e);
      },
      useTransition: function() {
        return F = "useTransition", Q(), am();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Q(), Gp(e, t, n);
      },
      useId: function() {
        return F = "useId", Q(), rm();
      },
      unstable_isNewReconciler: jt
    }, Ig = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Q(), Ac(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Q(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Q(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Q(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Q(), Lc(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Q();
        var n = ae.current;
        ae.current = Ta;
        try {
          return Uc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Q();
        var a = ae.current;
        ae.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Q(), jc();
      },
      useState: function(e) {
        F = "useState", Q();
        var t = ae.current;
        ae.current = Ta;
        try {
          return Wp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Q(), Mc();
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Q(), Vg(e);
      },
      useTransition: function() {
        return F = "useTransition", Q(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Q(), Dc(e, t);
      },
      useId: function() {
        return F = "useId", Q(), kc();
      },
      unstable_isNewReconciler: jt
    }, qg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Q(), Ac(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Q(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Q(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Q(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Q(), Lc(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Q();
        var n = ae.current;
        ae.current = Fc;
        try {
          return Uc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Q();
        var a = ae.current;
        ae.current = Fc;
        try {
          return qp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Q(), jc();
      },
      useState: function(e) {
        F = "useState", Q();
        var t = ae.current;
        ae.current = Fc;
        try {
          return Qp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Q(), Mc();
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Q(), Mg(e);
      },
      useTransition: function() {
        return F = "useTransition", Q(), kg();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Q(), Dc(e, t);
      },
      useId: function() {
        return F = "useId", Q(), kc();
      },
      unstable_isNewReconciler: jt
    }, Wa = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Re(), Ke(), em(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Re(), Ke(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Re(), Ke(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Re(), Ke(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Re(), Ke(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Re(), Ke(), Jp(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Re(), Ke();
        var n = ae.current;
        ae.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Re(), Ke();
        var a = ae.current;
        ae.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Re(), Ke(), Kp(e);
      },
      useState: function(e) {
        F = "useState", Re(), Ke();
        var t = ae.current;
        ae.current = Wa;
        try {
          return Tc(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Re(), Ke(), void 0;
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Re(), Ke(), nm(e);
      },
      useTransition: function() {
        return F = "useTransition", Re(), Ke(), am();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Re(), Ke(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Re(), Ke(), Gp(e, t, n);
      },
      useId: function() {
        return F = "useId", Re(), Ke(), rm();
      },
      unstable_isNewReconciler: jt
    }, Ta = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Re(), Q(), Ac(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Re(), Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Re(), Q(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Re(), Q(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Re(), Q(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Re(), Q(), Lc(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Re(), Q();
        var n = ae.current;
        ae.current = Ta;
        try {
          return Uc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Re(), Q();
        var a = ae.current;
        ae.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Re(), Q(), jc();
      },
      useState: function(e) {
        F = "useState", Re(), Q();
        var t = ae.current;
        ae.current = Ta;
        try {
          return Wp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Re(), Q(), Mc();
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Re(), Q(), Vg(e);
      },
      useTransition: function() {
        return F = "useTransition", Re(), Q(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Re(), Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Re(), Q(), Dc(e, t);
      },
      useId: function() {
        return F = "useId", Re(), Q(), kc();
      },
      unstable_isNewReconciler: jt
    }, Fc = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return F = "useCallback", Re(), Q(), Ac(e, t);
      },
      useContext: function(e) {
        return F = "useContext", Re(), Q(), Tt(e);
      },
      useEffect: function(e, t) {
        return F = "useEffect", Re(), Q(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return F = "useImperativeHandle", Re(), Q(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return F = "useInsertionEffect", Re(), Q(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return F = "useLayoutEffect", Re(), Q(), Lc(e, t);
      },
      useMemo: function(e, t) {
        F = "useMemo", Re(), Q();
        var n = ae.current;
        ae.current = Ta;
        try {
          return Uc(e, t);
        } finally {
          ae.current = n;
        }
      },
      useReducer: function(e, t, n) {
        F = "useReducer", Re(), Q();
        var a = ae.current;
        ae.current = Ta;
        try {
          return qp(e, t, n);
        } finally {
          ae.current = a;
        }
      },
      useRef: function(e) {
        return F = "useRef", Re(), Q(), jc();
      },
      useState: function(e) {
        F = "useState", Re(), Q();
        var t = ae.current;
        ae.current = Ta;
        try {
          return Qp(e);
        } finally {
          ae.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return F = "useDebugValue", Re(), Q(), Mc();
      },
      useDeferredValue: function(e) {
        return F = "useDeferredValue", Re(), Q(), Mg(e);
      },
      useTransition: function() {
        return F = "useTransition", Re(), Q(), kg();
      },
      useMutableSource: function(e, t, n) {
        return F = "useMutableSource", Re(), Q(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return F = "useSyncExternalStore", Re(), Q(), Dc(e, t);
      },
      useId: function() {
        return F = "useId", Re(), Q(), kc();
      },
      unstable_isNewReconciler: jt
    };
  }
  var ei = m.unstable_now, Gg = 0, Hc = -1, Du = -1, Bc = -1, lm = !1, Pc = !1;
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
    Gg = ei();
  }
  function om(e) {
    Du = ei(), e.actualStartTime < 0 && (e.actualStartTime = ei());
  }
  function Xg(e) {
    Du = -1;
  }
  function $c(e, t) {
    if (Du >= 0) {
      var n = ei() - Du;
      e.actualDuration += n, t && (e.selfBaseDuration = n), Du = -1;
    }
  }
  function Qa(e) {
    if (Hc >= 0) {
      var t = ei() - Hc;
      Hc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case ie:
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
      var t = ei() - Bc;
      Bc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case ie:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function Ka() {
    Hc = ei();
  }
  function sm() {
    Bc = ei();
  }
  function cm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function ja(e, t) {
    if (e && e.defaultProps) {
      var n = Me({}, t), a = e.defaultProps;
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
        var n = Ge(e) || "Component";
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
    var l = i == null ? r : Me({}, r, i);
    if (e.memoizedState = l, e.lanes === $) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: RS,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = wn(), i = ri(a), l = Sr(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Kr(a, l, i);
      o !== null && (Ft(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = wn(), i = ri(a), l = Sr(r, i);
      l.tag = hg, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Kr(a, l, i);
      o !== null && (Ft(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = wn(), r = ri(n), i = Sr(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Kr(n, i, r);
      l !== null && (Ft(l, n, r, a), bc(l, n, r)), tx(n, r);
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
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ge(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function MD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ge(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === ye && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === ye && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !gm.has(t) && (gm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ge(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ge(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || Ue(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function tb(e, t) {
    t.updater = Em, e.stateNode = t, NS(t, e), t._reactInternalInstance = fm;
  }
  function nb(e, t, n) {
    var a = !1, r = Qn, i = Qn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === Z && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === Y ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ge(t) || "Component", u);
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
    var S = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    tb(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && S === null) {
        var E = Ge(t) || "Component";
        pm.has(E) || (pm.add(E), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, v.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var w = null, V = null, U = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? w = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (w = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? U = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (U = "UNSAFE_componentWillUpdate"), w !== null || V !== null || U !== null) {
          var ee = Ge(t) || "Component", ve = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vm.has(ee) || (vm.add(ee), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ee, ve, w !== null ? `
  ` + w : "", V !== null ? `
  ` + V : "", U !== null ? `
  ` + U : ""));
        }
      }
    }
    return a && Iy(e, r, i), v;
  }
  function AD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Te(e) || "Component"), Em.enqueueReplaceState(t, t.state, null));
  }
  function ab(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Te(e) || "Component";
        dm.has(i) || (dm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Em.enqueueReplaceState(t, t.state, null);
    }
  }
  function Sm(e, t, n, a) {
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
        var o = Ge(t) || "Component";
        ym.has(o) || (ym.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & Et && Ca.recordLegacyContextWarning(e, r), Ca.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Nm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (AD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var p = We;
      p |= Ri, (e.mode & Pa) !== ye && (p |= zr), e.flags |= p;
    }
  }
  function UD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, u = Qn;
    if (typeof o == "object" && o !== null)
      u = Tt(o);
    else {
      var p = wl(e, t, !0);
      u = _l(e, p);
    }
    var v = t.getDerivedStateFromProps, S = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !S && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && ab(e, r, n, u), gg();
    var E = e.memoizedState, w = r.state = E;
    if (Nc(e, n, r, a), w = e.memoizedState, i === n && E === w && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var V = We;
        V |= Ri, (e.mode & Pa) !== ye && (V |= zr), e.flags |= V;
      }
      return !1;
    }
    typeof v == "function" && (Nm(e, t, v, n), w = e.memoizedState);
    var U = Ec() || eb(e, t, i, n, E, w, u);
    if (U) {
      if (!S && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ee = We;
        ee |= Ri, (e.mode & Pa) !== ye && (ee |= zr), e.flags |= ee;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var ve = We;
        ve |= Ri, (e.mode & Pa) !== ye && (ve |= zr), e.flags |= ve;
      }
      e.memoizedProps = n, e.memoizedState = w;
    }
    return r.props = n, r.state = w, r.context = u, U;
  }
  function kD(e, t, n, a, r) {
    var i = t.stateNode;
    yg(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : ja(t.type, l);
    i.props = o;
    var u = t.pendingProps, p = i.context, v = n.contextType, S = Qn;
    if (typeof v == "object" && v !== null)
      S = Tt(v);
    else {
      var E = wl(t, n, !0);
      S = _l(t, E);
    }
    var w = n.getDerivedStateFromProps, V = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || p !== S) && ab(t, i, a, S), gg();
    var U = t.memoizedState, ee = i.state = U;
    if (Nc(t, a, i, r), ee = t.memoizedState, l === u && U === ee && !tc() && !Ec() && !da)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= We), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), !1;
    typeof w == "function" && (Nm(t, n, w, a), ee = t.memoizedState);
    var ve = Ec() || eb(t, n, o, a, U, ee, S) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    da;
    return ve ? (!V && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ee, S), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ee, S)), typeof i.componentDidUpdate == "function" && (t.flags |= We), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= We), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = ee), i.props = a, i.state = ee, i.context = S, ve;
  }
  function Pi(e, t) {
    return {
      value: e,
      source: t,
      stack: hi(t),
      digest: null
    };
  }
  function xm(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function zD(e, t) {
    return !0;
  }
  function Rm(e, t) {
    try {
      var n = zD(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === D)
          return;
        console.error(a);
      }
      var o = r ? Te(r) : null, u = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", p;
      if (e.tag === x)
        p = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Te(e) || "Anonymous";
        p = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + v + ".");
      }
      var S = u + `
` + l + `

` + ("" + p);
      console.error(S);
    } catch (E) {
      setTimeout(function() {
        throw E;
      });
    }
  }
  var FD = typeof WeakMap == "function" ? WeakMap : Map;
  function rb(e, t, n) {
    var a = Sr(ut, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Oj(r), Rm(e, t);
    }, a;
  }
  function Cm(e, t, n) {
    var a = Sr(ut, n);
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
      }), typeof r != "function" && (In(e.lanes, xe) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Te(e) || "Unknown"));
    }), a;
  }
  function ib(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new FD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
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
    if ((e.mode & He) === ye && (n === R || n === q || n === se)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function lb(e) {
    var t = e;
    do {
      if (t.tag === H && ED(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ob(e, t, n, a, r) {
    if ((e.mode & He) === ye) {
      if (e === t)
        e.flags |= Dn;
      else {
        if (e.flags |= Qe, n.flags |= Yf, n.flags &= -52805, n.tag === D) {
          var i = n.alternate;
          if (i === null)
            n.tag = K;
          else {
            var l = Sr(ut, xe);
            l.tag = hc, Kr(n, l, xe);
          }
        }
        n.lanes = Le(n.lanes, xe);
      }
      return e;
    }
    return e.flags |= Dn, e.lanes = r, e;
  }
  function PD(e, t, n, a, r) {
    if (n.flags |= bs, Ea && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      BD(n), tn() && n.mode & He && Jy();
      var l = lb(t);
      if (l !== null) {
        l.flags &= ~fr, ob(l, t, n, e, r), l.mode & He && ib(e, i, r), HD(l, e, i);
        return;
      } else {
        if (!cx(r)) {
          ib(e, i, r), rv();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (tn() && n.mode & He) {
      Jy();
      var u = lb(t);
      if (u !== null) {
        (u.flags & Dn) === Ne && (u.flags |= fr), ob(u, t, n, e, r), yp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), Ej(a);
    var p = t;
    do {
      switch (p.tag) {
        case x: {
          var v = a;
          p.flags |= Dn;
          var S = Mo(r);
          p.lanes = Le(p.lanes, S);
          var E = rb(p, v, S);
          Lp(p, E);
          return;
        }
        case D:
          var w = a, V = p.type, U = p.stateNode;
          if ((p.flags & Qe) === Ne && (typeof V.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && !lN(U))) {
            p.flags |= Dn;
            var ee = Mo(r);
            p.lanes = Le(p.lanes, ee);
            var ve = Cm(p, w, ee);
            Lp(p, ve);
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
      i && xa(
        i,
        a,
        // Resolved props
        "prop",
        Ge(n)
      );
    }
    var l = n.render, o = t.ref, u, p;
    Ul(t, r), jo(t);
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
        return l = Xl(i), t.tag = se, t.type = l, Vm(t, i), cb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && xa(
          o,
          a,
          // Resolved props
          "prop",
          Ge(i)
        ), n.defaultProps !== void 0) {
          var u = Ge(i) || "Unknown";
          _u[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), _u[u] = !0);
        }
      }
      var p = vv(n.type, null, a, t, t.mode, r);
      return p.ref = t.ref, p.return = t, t.child = p, p;
    }
    {
      var v = n.type, S = v.propTypes;
      S && xa(
        S,
        a,
        // Resolved props
        "prop",
        Ge(v)
      );
    }
    var E = e.child, w = Fm(e, r);
    if (!w) {
      var V = E.memoizedProps, U = n.compare;
      if (U = U !== null ? U : Qo, U(V, a) && e.ref === t.ref)
        return xr(e, t, r);
    }
    t.flags |= fl;
    var ee = Wi(E, a);
    return ee.ref = t.ref, ee.return = t, t.child = ee, ee;
  }
  function cb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === he) {
        var l = i, o = l._payload, u = l._init;
        try {
          i = u(o);
        } catch {
          i = null;
        }
        var p = i && i.propTypes;
        p && xa(
          p,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Ge(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Qo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (wa = !1, t.pendingProps = a = v, Fm(e, r))
          (e.flags & Yf) !== Ne && (wa = !0);
        else return t.lanes = e.lanes, xr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function fb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Bn)
      if ((t.mode & He) === ye) {
        var l = {
          baseLanes: $,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (In(n, Yn)) {
        var S = {
          baseLanes: $,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = S;
        var E = i !== null ? i.baseLanes : n;
        rf(t, E);
      } else {
        var o = null, u;
        if (i !== null) {
          var p = i.baseLanes;
          u = Le(p, n);
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
      var w;
      i !== null ? (w = Le(i.baseLanes, n), t.memoizedState = null) : w = n, rf(t, w);
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
      t.flags |= We;
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
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Si, t.flags |= If);
  }
  function Om(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && xa(
        i,
        a,
        // Resolved props
        "prop",
        Ge(n)
      );
    }
    var l;
    {
      var o = wl(t, n, !0);
      l = _l(t, o);
    }
    var u, p;
    Ul(t, r), jo(t);
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
      switch (cw(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), u = o.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= Qe, t.flags |= Dn;
          var p = new Error("Simulated error coming from DevTools"), v = Mo(r);
          t.lanes = Le(t.lanes, v);
          var S = Cm(t, Pi(p, t), v);
          Lp(t, S);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var E = n.propTypes;
        E && xa(
          E,
          a,
          // Resolved props
          "prop",
          Ge(n)
        );
      }
    }
    var w;
    Ia(n) ? (w = !0, ac(t)) : w = !1, Ul(t, r);
    var V = t.stateNode, U;
    V === null ? (Gc(e, t), nb(t, n, a), Sm(t, n, a, r), U = !0) : e === null ? U = UD(t, n, a, r) : U = kD(e, t, n, a, r);
    var ee = Lm(e, t, n, U, w, r);
    {
      var ve = t.stateNode;
      U && ve.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Te(t) || "a component"), $i = !0);
    }
    return ee;
  }
  function Lm(e, t, n, a, r, i) {
    db(e, t);
    var l = (t.flags & Qe) !== Ne;
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
      if (p.baseState = u, t.memoizedState = u, t.flags & fr) {
        var v = Pi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return vb(e, t, o, n, v);
      } else if (o !== i) {
        var S = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return vb(e, t, o, n, S);
      } else {
        X0(t);
        var E = cg(t, null, o, n);
        t.child = E;
        for (var w = E; w; )
          w.flags = w.flags & ~Dt | dr, w = w.sibling;
      }
    } else {
      if (Vl(), o === i)
        return xr(e, t, n);
      Tn(e, t, o, n);
    }
    return t.child;
  }
  function vb(e, t, n, a, r) {
    return Vl(), yp(r), t.flags |= fr, Tn(e, t, n, a), t.child;
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
    var p = t.tag = Kj(u), v = ja(u, r), S;
    switch (p) {
      case R:
        return Vm(t, u), t.type = u = Xl(u), S = Om(null, t, u, v, a), S;
      case D:
        return t.type = u = sv(u), S = pb(null, t, u, v, a), S;
      case q:
        return t.type = u = cv(u), S = ub(null, t, u, v, a), S;
      case le: {
        if (t.type !== t.elementType) {
          var E = u.propTypes;
          E && xa(
            E,
            v,
            // Resolved for outer only
            "prop",
            Ge(u)
          );
        }
        return S = sb(
          null,
          t,
          u,
          ja(u.type, v),
          // The inner type can have defaults too
          a
        ), S;
      }
    }
    var w = "";
    throw u !== null && typeof u == "object" && u.$$typeof === he && (w = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + w));
  }
  function JD(e, t, n, a, r) {
    Gc(e, t), t.tag = D;
    var i;
    return Ia(n) ? (i = !0, ac(t)) : i = !1, Ul(t, r), nb(t, n, a), Sm(t, n, a, r), Lm(null, t, n, !0, i, r);
  }
  function ZD(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i;
    {
      var l = wl(t, n, !1);
      i = _l(t, l);
    }
    Ul(t, a);
    var o, u;
    jo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var p = Ge(n) || "Unknown";
        Dm[p] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", p, p), Dm[p] = !0);
      }
      t.mode & Et && Ca.recordLegacyContextWarning(t, null), aa(!0), ju.current = t, o = Pl(null, t, n, r, i, a), u = $l(), aa(!1);
    }
    if (vl(), t.flags |= fl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var v = Ge(n) || "Unknown";
      wu[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), wu[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
    ) {
      {
        var S = Ge(n) || "Unknown";
        wu[S] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", S, S, S), wu[S] = !0);
      }
      t.tag = D, t.memoizedState = null, t.updateQueue = null;
      var E = !1;
      return Ia(n) ? (E = !0, ac(t)) : E = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Op(t), tb(t, o), Sm(t, n, r, a), Lm(null, t, n, !0, E, a);
    } else {
      if (t.tag = R, t.mode & Et) {
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
        var n = "", a = Ar();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), wm[r] || (wm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Ge(t) || "Unknown";
        _u[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), _u[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = Ge(t) || "Unknown";
        jm[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), jm[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Ge(t) || "Unknown";
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
      baseLanes: Le(e.baseLanes, t),
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
    return Up(e, bu);
  }
  function nT(e, t) {
    return Ds(e.childLanes, t);
  }
  function hb(e, t, n) {
    var a = t.pendingProps;
    fw(t) && (t.flags |= Qe);
    var r = Da.current, i = !1, l = (t.flags & Qe) !== Ne;
    if (l || tT(r, e) ? (i = !0, t.flags &= ~Qe) : (e === null || e.memoizedState !== null) && (r = ND(r, xg)), r = zl(r), Jr(t, r), e === null) {
      hp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var u = o.dehydrated;
        if (u !== null)
          return oT(t, u);
      }
      var p = a.children, v = a.fallback;
      if (i) {
        var S = aT(t, p, v, n), E = t.child;
        return E.memoizedState = Am(n), t.memoizedState = Mm, S;
      } else
        return Um(t, p);
    } else {
      var w = e.memoizedState;
      if (w !== null) {
        var V = w.dehydrated;
        if (V !== null)
          return uT(e, t, l, a, V, w, n);
      }
      if (i) {
        var U = a.fallback, ee = a.children, ve = iT(e, t, ee, U, n), ce = t.child, Pe = e.child.memoizedState;
        return ce.memoizedState = Pe === null ? Am(n) : eT(Pe, n), ce.childLanes = nT(e, n), t.memoizedState = Mm, ve;
      } else {
        var ke = a.children, T = rT(e, t, ke, n);
        return t.memoizedState = null, T;
      }
    }
  }
  function Um(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = km(r, a);
    return i.return = e, e.child = i, i;
  }
  function aT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, u;
    return (r & He) === ye && i !== null ? (o = i, o.childLanes = $, o.pendingProps = l, e.mode & tt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = li(n, r, a, null)) : (o = km(l, r), u = li(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function km(e, t, n) {
    return yN(e, t, $, null);
  }
  function yb(e, t) {
    return Wi(e, t);
  }
  function rT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = yb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & He) === ye && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
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
      (i & He) === ye && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      p = v, p.childLanes = $, p.pendingProps = u, t.mode & tt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = l.selfBaseDuration, p.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      p = yb(l, u), p.subtreeFlags = l.subtreeFlags & pr;
    var S;
    return o !== null ? S = Wi(o, a) : (S = li(a, i, r, null), S.flags |= Dt), S.return = t, p.return = t, p.sibling = S, t.child = p, S;
  }
  function qc(e, t, n, a) {
    a !== null && yp(a), Ml(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Um(t, i);
    return l.flags |= Dt, t.memoizedState = null, l;
  }
  function lT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = km(l, i), u = li(a, i, r, null);
    return u.flags |= Dt, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & He) !== ye && Ml(t, e.child, null, r), u;
  }
  function oT(e, t, n) {
    return (e.mode & He) === ye ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = xe) : tp(t) ? e.lanes = Ti : e.lanes = Yn, null;
  }
  function uT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & fr) {
        t.flags &= ~fr;
        var T = xm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, T);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Qe, null;
        var k = a.children, j = a.fallback, I = lT(e, t, k, j, l), re = t.child;
        return re.memoizedState = Am(l), t.memoizedState = Mm, I;
      }
    else {
      if (Q0(), (t.mode & He) === ye)
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
        var S;
        u ? S = new Error(u) : S = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var E = xm(S, o, p);
        return qc(e, t, l, E);
      }
      var w = In(l, e.childLanes);
      if (wa || w) {
        var V = af();
        if (V !== null) {
          var U = gx(V, l);
          if (U !== Gt && U !== i.retryLane) {
            i.retryLane = U;
            var ee = ut;
            kn(e, U), Ft(V, e, U, ee);
          }
        }
        rv();
        var ve = xm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, ve);
      } else if (Hy(r)) {
        t.flags |= Qe, t.child = e.child;
        var ce = Vj.bind(null, e);
        return p0(r, ce), null;
      } else {
        J0(t, r, i.treeContext);
        var Pe = a.children, ke = Um(t, Pe);
        return ke.flags |= dr, ke;
      }
    }
  }
  function gb(e, t, n) {
    e.lanes = Le(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Le(a.lanes, t)), Tp(e.return, t, n);
  }
  function sT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === H) {
        var r = a.memoizedState;
        r !== null && gb(a, n, e);
      } else if (a.tag === _e)
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
      var n = Ue(e), a = !n && typeof ba(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function pT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Ue(e)) {
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
  function zm(e, t, n, a, r) {
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
    var o = Da.current, u = Up(o, bu);
    if (u)
      o = kp(o, bu), t.flags |= Qe;
    else {
      var p = e !== null && (e.flags & Qe) !== Ne;
      p && sT(t, t.child, n), o = zl(o);
    }
    if (Jr(t, o), (t.mode & He) === ye)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = cT(t.child), S;
          v === null ? (S = t.child, t.child = null) : (S = v.sibling, v.sibling = null), zm(
            t,
            !1,
            // isBackwards
            S,
            v,
            i
          );
          break;
        }
        case "backwards": {
          var E = null, w = t.child;
          for (t.child = null; w !== null; ) {
            var V = w.alternate;
            if (V !== null && Rc(V) === null) {
              t.child = w;
              break;
            }
            var U = w.sibling;
            w.sibling = E, E = w, w = U;
          }
          zm(
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
          zm(
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
      u && xa(u, i, "prop", "Context.Provider");
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
  var Sb = !1;
  function hT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Sb || (Sb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Ul(t, n);
    var l = Tt(a);
    jo(t);
    var o;
    return ju.current = t, aa(!0), o = i(l), aa(!1), vl(), t.flags |= fl, Tn(e, t, o, n), t.child;
  }
  function Ou() {
    wa = !0;
  }
  function Gc(e, t) {
    (t.mode & He) === ye && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Dt);
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
  function Fm(e, t) {
    var n = e.lanes;
    return !!In(n, t);
  }
  function gT(e, t, n) {
    switch (t.tag) {
      case x:
        mb(t), t.stateNode, Vl();
        break;
      case B:
        Eg(t);
        break;
      case D: {
        var a = t.type;
        Ia(a) && ac(t);
        break;
      }
      case z:
        Vp(t, t.stateNode.containerInfo);
        break;
      case P: {
        var r = t.memoizedProps.value, i = t.type._context;
        pg(t, i, r);
        break;
      }
      case ie:
        {
          var l = In(n, t.childLanes);
          l && (t.flags |= We);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case H: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Jr(t, zl(Da.current)), t.flags |= Qe, null;
          var p = t.child, v = p.childLanes;
          if (In(n, v))
            return hb(e, t, n);
          Jr(t, zl(Da.current));
          var S = xr(e, t, n);
          return S !== null ? S.sibling : null;
        } else
          Jr(t, zl(Da.current));
        break;
      }
      case _e: {
        var E = (e.flags & Qe) !== Ne, w = In(n, t.childLanes);
        if (E) {
          if (w)
            return Nb(e, t, n);
          t.flags |= Qe;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Jr(t, Da.current), w)
          break;
        return null;
      }
      case be:
      case Ye:
        return t.lanes = $, fb(e, t, n);
    }
    return xr(e, t, n);
  }
  function xb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return yT(e, t, vv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        wa = !0;
      else {
        var i = Fm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Qe) === Ne)
          return wa = !1, gT(e, t, n);
        (e.flags & Yf) !== Ne ? wa = !0 : wa = !1;
      }
    } else if (wa = !1, tn() && $0(t)) {
      var l = t.index, o = Y0();
      Xy(t, o, l);
    }
    switch (t.lanes = $, t.tag) {
      case M:
        return ZD(e, t, t.type, n);
      case $e: {
        var u = t.elementType;
        return XD(e, t, u, n);
      }
      case R: {
        var p = t.type, v = t.pendingProps, S = t.elementType === p ? v : ja(p, v);
        return Om(e, t, p, S, n);
      }
      case D: {
        var E = t.type, w = t.pendingProps, V = t.elementType === E ? w : ja(E, w);
        return pb(e, t, E, V, n);
      }
      case x:
        return WD(e, t, n);
      case B:
        return QD(e, t, n);
      case W:
        return KD(e, t);
      case H:
        return hb(e, t, n);
      case z:
        return mT(e, t, n);
      case q: {
        var U = t.type, ee = t.pendingProps, ve = t.elementType === U ? ee : ja(U, ee);
        return ub(e, t, U, ve, n);
      }
      case fe:
        return ID(e, t, n);
      case X:
        return qD(e, t, n);
      case ie:
        return GD(e, t, n);
      case P:
        return vT(e, t, n);
      case pe:
        return hT(e, t, n);
      case le: {
        var ce = t.type, Pe = t.pendingProps, ke = ja(ce, Pe);
        if (t.type !== t.elementType) {
          var T = ce.propTypes;
          T && xa(
            T,
            ke,
            // Resolved for outer only
            "prop",
            Ge(ce)
          );
        }
        return ke = ja(ce.type, ke), sb(e, t, ce, ke, n);
      }
      case se:
        return cb(e, t, t.type, t.pendingProps, n);
      case K: {
        var k = t.type, j = t.pendingProps, I = t.elementType === k ? j : ja(k, j);
        return JD(e, t, k, I, n);
      }
      case _e:
        return Nb(e, t, n);
      case Ae:
        break;
      case be:
        return fb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Yl(e) {
    e.flags |= We;
  }
  function Rb(e) {
    e.flags |= Si, e.flags |= If;
  }
  var Cb, Hm, Db, Tb;
  Cb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === B || r.tag === W)
        HC(e, r.stateNode);
      else if (r.tag !== z) {
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = $, a = Ne;
    if (t) {
      if ((e.mode & tt) !== ye) {
        for (var u = e.selfBaseDuration, p = e.child; p !== null; )
          n = Le(n, Le(p.lanes, p.childLanes)), a |= p.subtreeFlags & pr, a |= p.flags & pr, u += p.treeBaseDuration, p = p.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = Le(n, Le(v.lanes, v.childLanes)), a |= v.subtreeFlags & pr, a |= v.flags & pr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & tt) !== ye) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Le(n, Le(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = Le(n, Le(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function bT(e, t, n) {
    if (aD() && (t.mode & He) !== ye && (t.flags & Qe) === Ne)
      return rg(t), Vl(), t.flags |= fr | bs | Dn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (tD(t), an(t), (t.mode & tt) !== ye) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Qe) === Ne && (t.memoizedState = null), t.flags |= We, an(t), (t.mode & tt) !== ye) {
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
      case M:
      case $e:
      case se:
      case R:
      case q:
      case fe:
      case X:
      case ie:
      case pe:
      case le:
        return an(t), null;
      case D: {
        var r = t.type;
        return Ia(r) && nc(t), an(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (kl(t), up(t), Fp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = uc(t);
          if (l)
            Yl(t);
          else if (e !== null) {
            var o = e.memoizedState;
            // Check if this is a client root
            (!o.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & fr) !== Ne) && (t.flags |= dl, ig());
          }
        }
        return Hm(e, t), an(t), null;
      }
      case B: {
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
          var v = Mp(), S = uc(t);
          if (S)
            Z0(t, u, v) && Yl(t);
          else {
            var E = FC(p, a, u, v, t);
            Cb(E, t, !1, !1), t.stateNode = E, BC(E, p, a, u) && Yl(t);
          }
          t.ref !== null && Rb(t);
        }
        return an(t), null;
      }
      case W: {
        var w = a;
        if (e && t.stateNode != null) {
          var V = e.memoizedProps;
          Tb(e, t, V, w);
        } else {
          if (typeof w != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var U = Ng(), ee = Mp(), ve = uc(t);
          ve ? eD(t) && Yl(t) : t.stateNode = $C(w, U, ee, t);
        }
        return an(t), null;
      }
      case H: {
        Fl(t);
        var ce = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Pe = bT(e, t, ce);
          if (!Pe)
            return t.flags & Dn ? t : null;
        }
        if ((t.flags & Qe) !== Ne)
          return t.lanes = n, (t.mode & tt) !== ye && cm(t), t;
        var ke = ce !== null, T = e !== null && e.memoizedState !== null;
        if (ke !== T && ke) {
          var k = t.child;
          if (k.flags |= xi, (t.mode & He) !== ye) {
            var j = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            j || Up(Da.current, xg) ? Nj() : rv();
          }
        }
        var I = t.updateQueue;
        if (I !== null && (t.flags |= We), an(t), (t.mode & tt) !== ye && ke) {
          var re = t.child;
          re !== null && (t.treeBaseDuration -= re.treeBaseDuration);
        }
        return null;
      }
      case z:
        return kl(t), Hm(e, t), e === null && U0(t.stateNode.containerInfo), an(t), null;
      case P:
        var te = t.type._context;
        return Dp(te, t), an(t), null;
      case K: {
        var Ee = t.type;
        return Ia(Ee) && nc(t), an(t), null;
      }
      case _e: {
        Fl(t);
        var De = t.memoizedState;
        if (De === null)
          return an(t), null;
        var at = (t.flags & Qe) !== Ne, Ie = De.rendering;
        if (Ie === null)
          if (at)
            Lu(De, !1);
          else {
            var xt = Sj() && (e === null || (e.flags & Qe) === Ne);
            if (!xt)
              for (var qe = t.child; qe !== null; ) {
                var St = Rc(qe);
                if (St !== null) {
                  at = !0, t.flags |= Qe, Lu(De, !1);
                  var yn = St.updateQueue;
                  return yn !== null && (t.updateQueue = yn, t.flags |= We), t.subtreeFlags = Ne, cD(t, n), Jr(t, kp(Da.current, bu)), t.child;
                }
                qe = qe.sibling;
              }
            De.tail !== null && It() > Qb() && (t.flags |= Qe, at = !0, Lu(De, !1), t.lanes = Th);
          }
        else {
          if (!at) {
            var sn = Rc(Ie);
            if (sn !== null) {
              t.flags |= Qe, at = !0;
              var Xn = sn.updateQueue;
              if (Xn !== null && (t.updateQueue = Xn, t.flags |= We), Lu(De, !0), De.tail === null && De.tailMode === "hidden" && !Ie.alternate && !tn())
                return an(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            It() * 2 - De.renderingStartTime > Qb() && n !== Yn && (t.flags |= Qe, at = !0, Lu(De, !1), t.lanes = Th);
          }
          if (De.isBackwards)
            Ie.sibling = t.child, t.child = Ie;
          else {
            var _n = De.last;
            _n !== null ? _n.sibling = Ie : t.child = Ie, De.last = Ie;
          }
        }
        if (De.tail !== null) {
          var On = De.tail;
          De.rendering = On, De.tail = On.sibling, De.renderingStartTime = It(), On.sibling = null;
          var gn = Da.current;
          return at ? gn = kp(gn, bu) : gn = zl(gn), Jr(t, gn), On;
        }
        return an(t), null;
      }
      case Ae:
        break;
      case be:
      case Ye: {
        av(t);
        var jr = t.memoizedState, Jl = jr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, Za = Wu !== null;
          Za !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Bn && (t.flags |= xi);
        }
        return !Jl || (t.mode & He) === ye ? an(t) : In(Ja, Yn) && (an(t), t.subtreeFlags & (Dt | We) && (t.flags |= xi)), null;
      }
      case Xe:
        return null;
      case Je:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function NT(e, t, n) {
    switch (dp(t), t.tag) {
      case D: {
        var a = t.type;
        Ia(a) && nc(t);
        var r = t.flags;
        return r & Dn ? (t.flags = r & ~Dn | Qe, (t.mode & tt) !== ye && cm(t), t) : null;
      }
      case x: {
        t.stateNode, kl(t), up(t), Fp();
        var i = t.flags;
        return (i & Dn) !== Ne && (i & Qe) === Ne ? (t.flags = i & ~Dn | Qe, t) : null;
      }
      case B:
        return Ap(t), null;
      case H: {
        Fl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var o = t.flags;
        return o & Dn ? (t.flags = o & ~Dn | Qe, (t.mode & tt) !== ye && cm(t), t) : null;
      }
      case _e:
        return Fl(t), null;
      case z:
        return kl(t), null;
      case P:
        var u = t.type._context;
        return Dp(u, t), null;
      case be:
      case Ye:
        return av(t), null;
      case Xe:
        return null;
      default:
        return null;
    }
  }
  function wb(e, t, n) {
    switch (dp(t), t.tag) {
      case D: {
        var a = t.type.childContextTypes;
        a != null && nc(t);
        break;
      }
      case x: {
        t.stateNode, kl(t), up(t), Fp();
        break;
      }
      case B: {
        Ap(t);
        break;
      }
      case z:
        kl(t);
        break;
      case H:
        Fl(t);
        break;
      case _e:
        Fl(t);
        break;
      case P:
        var r = t.type._context;
        Dp(r, t);
        break;
      case be:
      case Ye:
        av(t);
        break;
    }
  }
  var _b = null;
  _b = /* @__PURE__ */ new Set();
  var Wc = !1, rn = !1, ET = typeof WeakSet == "function" ? WeakSet : Set, oe = null, Il = null, ql = null;
  function ST(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var xT = function(e, t) {
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
      ti(Vt, e);
    } catch (n) {
      it(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      xT(e, n);
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
          if (bn && tr && e.mode & tt)
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
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Te(e));
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
    kC(e.containerInfo), oe = t, DT();
    var n = Vb;
    return Vb = !1, n;
  }
  function DT() {
    for (; oe !== null; ) {
      var e = oe, t = e.child;
      (e.subtreeFlags & Wf) !== Ne && t !== null ? (t.return = e, oe = t) : TT();
    }
  }
  function TT() {
    for (; oe !== null; ) {
      var e = oe;
      pt(e);
      try {
        jT(e);
      } catch (n) {
        it(e, e.return, n);
      }
      Yt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, oe = t;
        return;
      }
      oe = e.return;
    }
  }
  function jT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & dl) !== Ne) {
      switch (pt(e), e.tag) {
        case R:
        case q:
        case se:
          break;
        case D: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !$i && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : ja(e.type, a), r);
            {
              var o = _b;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Te(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case x: {
          {
            var u = e.stateNode;
            u0(u.containerInfo);
          }
          break;
        }
        case B:
        case W:
        case z:
        case K:
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
          l.destroy = void 0, o !== void 0 && ((e & nn) !== zn ? $S(t) : (e & Vt) !== zn && Sh(t), (e & qa) !== zn && Iu(!0), Qc(t, n, o), (e & qa) !== zn && Iu(!1), (e & nn) !== zn ? YS() : (e & Vt) !== zn && xh());
        }
        l = l.next;
      } while (l !== i);
    }
  }
  function ti(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & nn) !== zn ? BS(t) : (e & Vt) !== zn && IS(t);
          var l = i.create;
          (e & qa) !== zn && Iu(!0), i.destroy = l(), (e & qa) !== zn && Iu(!1), (e & nn) !== zn ? PS() : (e & Vt) !== zn && qS();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var u = void 0;
              (i.tag & Vt) !== Ne ? u = "useLayoutEffect" : (i.tag & qa) !== Ne ? u = "useInsertionEffect" : u = "useEffect";
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
    if ((t.flags & We) !== Ne)
      switch (t.tag) {
        case ie: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Qg(), o = t.alternate === null ? "mount" : "update";
          Wg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case x:
                var p = u.stateNode;
                p.passiveEffectDuration += n;
                break e;
              case ie:
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
    if ((n.flags & To) !== Ne)
      switch (n.tag) {
        case R:
        case q:
        case se: {
          if (!rn)
            if (n.mode & tt)
              try {
                Ka(), ti(Vt | Lt, n);
              } finally {
                Qa(n);
              }
            else
              ti(Vt | Lt, n);
          break;
        }
        case D: {
          var r = n.stateNode;
          if (n.flags & We && !rn)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(n) || "instance")), n.mode & tt)
                try {
                  Ka(), r.componentDidMount();
                } finally {
                  Qa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : ja(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(n) || "instance")), n.mode & tt)
                try {
                  Ka(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Qa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Te(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Te(n) || "instance")), bg(n, o, r));
          break;
        }
        case x: {
          var u = n.updateQueue;
          if (u !== null) {
            var p = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case B:
                  p = n.child.stateNode;
                  break;
                case D:
                  p = n.child.stateNode;
                  break;
              }
            bg(n, u, p);
          }
          break;
        }
        case B: {
          var v = n.stateNode;
          if (t === null && n.flags & We) {
            var S = n.type, E = n.memoizedProps;
            WC(v, S, E);
          }
          break;
        }
        case W:
          break;
        case z:
          break;
        case ie: {
          {
            var w = n.memoizedProps, V = w.onCommit, U = w.onRender, ee = n.stateNode.effectDuration, ve = Qg(), ce = t === null ? "mount" : "update";
            Wg() && (ce = "nested-update"), typeof U == "function" && U(n.memoizedProps.id, ce, n.actualDuration, n.treeBaseDuration, n.actualStartTime, ve);
            {
              typeof V == "function" && V(n.memoizedProps.id, ce, ee, ve), Tj(n);
              var Pe = n.return;
              e: for (; Pe !== null; ) {
                switch (Pe.tag) {
                  case x:
                    var ke = Pe.stateNode;
                    ke.effectDuration += ee;
                    break e;
                  case ie:
                    var T = Pe.stateNode;
                    T.effectDuration += ee;
                    break e;
                }
                Pe = Pe.return;
              }
            }
          }
          break;
        }
        case H: {
          zT(e, n);
          break;
        }
        case _e:
        case K:
        case Ae:
        case be:
        case Ye:
        case Je:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    rn || n.flags & Si && Mb(n);
  }
  function OT(e) {
    switch (e.tag) {
      case R:
      case q:
      case se: {
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
      case D: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && RT(e, e.return, t), Lb(e, e.return);
        break;
      }
      case B: {
        Lb(e, e.return);
        break;
      }
    }
  }
  function LT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === B) {
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
      } else if (!((a.tag === be || a.tag === Ye) && a.memoizedState !== null && a !== e)) {
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
        case B:
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
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Te(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Te(e)), t.current = a;
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === B) {
        var n = e.stateNode;
        n !== null && F0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function MT(e) {
    for (var t = e.return; t !== null; ) {
      if (Ub(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ub(e) {
    return e.tag === B || e.tag === x || e.tag === z;
  }
  function kb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ub(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== B && t.tag !== W && t.tag !== je; ) {
        if (t.flags & Dt || t.child === null || t.tag === z)
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
      case B: {
        var n = t.stateNode;
        t.flags & Do && (Fy(n), t.flags &= ~Do);
        var a = kb(e);
        $m(e, a, n);
        break;
      }
      case x:
      case z: {
        var r = t.stateNode.containerInfo, i = kb(e);
        Pm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Pm(e, t, n) {
    var a = e.tag, r = a === B || a === W;
    if (r) {
      var i = e.stateNode;
      t ? e0(n, i, t) : JC(n, i);
    } else if (a !== z) {
      var l = e.child;
      if (l !== null) {
        Pm(l, t, n);
        for (var o = l.sibling; o !== null; )
          Pm(o, t, n), o = o.sibling;
      }
    }
  }
  function $m(e, t, n) {
    var a = e.tag, r = a === B || a === W;
    if (r) {
      var i = e.stateNode;
      t ? ZC(n, i, t) : XC(n, i);
    } else if (a !== z) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var o = l.sibling; o !== null; )
          $m(o, t, n), o = o.sibling;
      }
    }
  }
  var ln = null, Oa = !1;
  function UT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case B: {
            ln = a.stateNode, Oa = !1;
            break e;
          }
          case x: {
            ln = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
          case z: {
            ln = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (ln === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      zb(e, t, n), ln = null, Oa = !1;
    }
    VT(n);
  }
  function ni(e, t, n) {
    for (var a = n.child; a !== null; )
      zb(e, t, a), a = a.sibling;
  }
  function zb(e, t, n) {
    switch (kS(n), n.tag) {
      case B:
        rn || Gl(n, t);
      case W: {
        {
          var a = ln, r = Oa;
          ln = null, ni(e, t, n), ln = a, Oa = r, ln !== null && (Oa ? n0(ln, n.stateNode) : t0(ln, n.stateNode));
        }
        return;
      }
      case je: {
        ln !== null && (Oa ? a0(ln, n.stateNode) : ep(ln, n.stateNode));
        return;
      }
      case z: {
        {
          var i = ln, l = Oa;
          ln = n.stateNode.containerInfo, Oa = !0, ni(e, t, n), ln = i, Oa = l;
        }
        return;
      }
      case R:
      case q:
      case le:
      case se: {
        if (!rn) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var p = u.next, v = p;
              do {
                var S = v, E = S.destroy, w = S.tag;
                E !== void 0 && ((w & qa) !== zn ? Qc(n, t, E) : (w & Vt) !== zn && (Sh(n), n.mode & tt ? (Ka(), Qc(n, t, E), Qa(n)) : Qc(n, t, E), xh())), v = v.next;
              } while (v !== p);
            }
          }
        }
        ni(e, t, n);
        return;
      }
      case D: {
        if (!rn) {
          Gl(n, t);
          var V = n.stateNode;
          typeof V.componentWillUnmount == "function" && Bm(n, t, V);
        }
        ni(e, t, n);
        return;
      }
      case Ae: {
        ni(e, t, n);
        return;
      }
      case be: {
        if (
          // TODO: Remove this dead flag
          n.mode & He
        ) {
          var U = rn;
          rn = U || n.memoizedState !== null, ni(e, t, n), rn = U;
        } else
          ni(e, t, n);
        break;
      }
      default: {
        ni(e, t, n);
        return;
      }
    }
  }
  function kT(e) {
    e.memoizedState;
  }
  function zT(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && S0(i);
        }
      }
    }
  }
  function Fb(e) {
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
  function FT(e, t, n) {
    Il = n, ql = e, pt(t), Hb(t, e), pt(t), Il = null, ql = null;
  }
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          UT(e, t, i);
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
      case R:
      case q:
      case le:
      case se: {
        if (La(t, e), Xa(e), r & We) {
          try {
            _a(qa | Lt, e, e.return), ti(qa | Lt, e);
          } catch (Ee) {
            it(e, e.return, Ee);
          }
          if (e.mode & tt) {
            try {
              Ka(), _a(Vt | Lt, e, e.return);
            } catch (Ee) {
              it(e, e.return, Ee);
            }
            Qa(e);
          } else
            try {
              _a(Vt | Lt, e, e.return);
            } catch (Ee) {
              it(e, e.return, Ee);
            }
        }
        return;
      }
      case D: {
        La(t, e), Xa(e), r & Si && a !== null && Gl(a, a.return);
        return;
      }
      case B: {
        La(t, e), Xa(e), r & Si && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              Fy(i);
            } catch (Ee) {
              it(e, e.return, Ee);
            }
          }
          if (r & We) {
            var l = e.stateNode;
            if (l != null) {
              var o = e.memoizedProps, u = a !== null ? a.memoizedProps : o, p = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  QC(l, v, p, u, o, e);
                } catch (Ee) {
                  it(e, e.return, Ee);
                }
            }
          }
        }
        return;
      }
      case W: {
        if (La(t, e), Xa(e), r & We) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var S = e.stateNode, E = e.memoizedProps, w = a !== null ? a.memoizedProps : E;
          try {
            KC(S, w, E);
          } catch (Ee) {
            it(e, e.return, Ee);
          }
        }
        return;
      }
      case x: {
        if (La(t, e), Xa(e), r & We && a !== null) {
          var V = a.memoizedState;
          if (V.isDehydrated)
            try {
              E0(t.containerInfo);
            } catch (Ee) {
              it(e, e.return, Ee);
            }
        }
        return;
      }
      case z: {
        La(t, e), Xa(e);
        return;
      }
      case H: {
        La(t, e), Xa(e);
        var U = e.child;
        if (U.flags & xi) {
          var ee = U.stateNode, ve = U.memoizedState, ce = ve !== null;
          if (ee.isHidden = ce, ce) {
            var Pe = U.alternate !== null && U.alternate.memoizedState !== null;
            Pe || bj();
          }
        }
        if (r & We) {
          try {
            kT(e);
          } catch (Ee) {
            it(e, e.return, Ee);
          }
          Fb(e);
        }
        return;
      }
      case be: {
        var ke = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & He
        ) {
          var T = rn;
          rn = T || ke, La(t, e), rn = T;
        } else
          La(t, e);
        if (Xa(e), r & xi) {
          var k = e.stateNode, j = e.memoizedState, I = j !== null, re = e;
          if (k.isHidden = I, I && !ke && (re.mode & He) !== ye) {
            oe = re;
            for (var te = re.child; te !== null; )
              oe = te, BT(te), te = te.sibling;
          }
          LT(re, I);
        }
        return;
      }
      case _e: {
        La(t, e), Xa(e), r & We && Fb(e);
        return;
      }
      case Ae:
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
    t & dr && (e.flags &= ~dr);
  }
  function HT(e, t, n) {
    Il = n, ql = t, oe = e, Bb(e, t, n), Il = null, ql = null;
  }
  function Bb(e, t, n) {
    for (var a = (e.mode & He) !== ye; oe !== null; ) {
      var r = oe, i = r.child;
      if (r.tag === be && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var u = r.alternate, p = u !== null && u.memoizedState !== null, v = p || rn, S = Wc, E = rn;
          Wc = o, rn = v, rn && !E && (oe = r, PT(r));
          for (var w = i; w !== null; )
            oe = w, Bb(
              w,
              // New root; bubble back up to here and stop.
              t,
              n
            ), w = w.sibling;
          oe = r, Wc = S, rn = E, Ym(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ne && i !== null ? (i.return = r, oe = i) : Ym(e, t, n);
    }
  }
  function Ym(e, t, n) {
    for (; oe !== null; ) {
      var a = oe;
      if ((a.flags & To) !== Ne) {
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
        oe = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, oe = i;
        return;
      }
      oe = a.return;
    }
  }
  function BT(e) {
    for (; oe !== null; ) {
      var t = oe, n = t.child;
      switch (t.tag) {
        case R:
        case q:
        case le:
        case se: {
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
        case D: {
          Gl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Bm(t, t.return, a);
          break;
        }
        case B: {
          Gl(t, t.return);
          break;
        }
        case be: {
          var r = t.memoizedState !== null;
          if (r) {
            Pb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, oe = n) : Pb(e);
    }
  }
  function Pb(e) {
    for (; oe !== null; ) {
      var t = oe;
      if (t === e) {
        oe = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, oe = n;
        return;
      }
      oe = t.return;
    }
  }
  function PT(e) {
    for (; oe !== null; ) {
      var t = oe, n = t.child;
      if (t.tag === be) {
        var a = t.memoizedState !== null;
        if (a) {
          $b(e);
          continue;
        }
      }
      n !== null ? (n.return = t, oe = n) : $b(e);
    }
  }
  function $b(e) {
    for (; oe !== null; ) {
      var t = oe;
      pt(t);
      try {
        OT(t);
      } catch (a) {
        it(t, t.return, a);
      }
      if (Yt(), t === e) {
        oe = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, oe = n;
        return;
      }
      oe = t.return;
    }
  }
  function $T(e, t, n, a) {
    oe = t, YT(t, e, n, a);
  }
  function YT(e, t, n, a) {
    for (; oe !== null; ) {
      var r = oe, i = r.child;
      (r.subtreeFlags & pl) !== Ne && i !== null ? (i.return = r, oe = i) : IT(e, t, n, a);
    }
  }
  function IT(e, t, n, a) {
    for (; oe !== null; ) {
      var r = oe;
      if ((r.flags & kr) !== Ne) {
        pt(r);
        try {
          qT(t, r, n, a);
        } catch (l) {
          it(r, r.return, l);
        }
        Yt();
      }
      if (r === e) {
        oe = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, oe = i;
        return;
      }
      oe = r.return;
    }
  }
  function qT(e, t, n, a) {
    switch (t.tag) {
      case R:
      case q:
      case se: {
        if (t.mode & tt) {
          sm();
          try {
            ti(nn | Lt, t);
          } finally {
            um(t);
          }
        } else
          ti(nn | Lt, t);
        break;
      }
    }
  }
  function GT(e) {
    oe = e, WT();
  }
  function WT() {
    for (; oe !== null; ) {
      var e = oe, t = e.child;
      if ((oe.flags & Ei) !== Ne) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            oe = r, XT(r, e);
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
          oe = e;
        }
      }
      (e.subtreeFlags & pl) !== Ne && t !== null ? (t.return = e, oe = t) : QT();
    }
  }
  function QT() {
    for (; oe !== null; ) {
      var e = oe;
      (e.flags & kr) !== Ne && (pt(e), KT(e), Yt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, oe = t;
        return;
      }
      oe = e.return;
    }
  }
  function KT(e) {
    switch (e.tag) {
      case R:
      case q:
      case se: {
        e.mode & tt ? (sm(), _a(nn | Lt, e, e.return), um(e)) : _a(nn | Lt, e, e.return);
        break;
      }
    }
  }
  function XT(e, t) {
    for (; oe !== null; ) {
      var n = oe;
      pt(n), ZT(n, t), Yt();
      var a = n.child;
      a !== null ? (a.return = n, oe = a) : JT(e);
    }
  }
  function JT(e) {
    for (; oe !== null; ) {
      var t = oe, n = t.sibling, a = t.return;
      if (Ab(t), t === e) {
        oe = null;
        return;
      }
      if (n !== null) {
        n.return = a, oe = n;
        return;
      }
      oe = a;
    }
  }
  function ZT(e, t) {
    switch (e.tag) {
      case R:
      case q:
      case se: {
        e.mode & tt ? (sm(), _a(nn, e, t), um(e)) : _a(nn, e, t);
        break;
      }
    }
  }
  function ej(e) {
    switch (e.tag) {
      case R:
      case q:
      case se: {
        try {
          ti(Vt | Lt, e);
        } catch (n) {
          it(e, e.return, n);
        }
        break;
      }
      case D: {
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
      case R:
      case q:
      case se: {
        try {
          ti(nn | Lt, e);
        } catch (t) {
          it(e, e.return, t);
        }
        break;
      }
    }
  }
  function nj(e) {
    switch (e.tag) {
      case R:
      case q:
      case se: {
        try {
          _a(Vt | Lt, e, e.return);
        } catch (n) {
          it(e, e.return, n);
        }
        break;
      }
      case D: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Bm(e, e.return, t);
        break;
      }
    }
  }
  function aj(e) {
    switch (e.tag) {
      case R:
      case q:
      case se:
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
  var uj = Math.ceil, Im = h.ReactCurrentDispatcher, qm = h.ReactCurrentOwner, on = h.ReactCurrentBatchConfig, Va = h.ReactCurrentActQueue, Ut = (
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
  ), Rr = 0, Mu = 1, Yi = 2, Kc = 3, Au = 4, qb = 5, Gm = 6, Be = Ut, jn = null, gt = null, kt = $, Ja = $, Wm = qr($), zt = Rr, Uu = null, Xc = $, ku = $, Jc = $, zu = null, Fn = null, Qm = 0, Gb = 500, Wb = 1 / 0, sj = 500, Cr = null;
  function Fu() {
    Wb = It() + sj;
  }
  function Qb() {
    return Wb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ai = null, Hu = $, Xm = [], Jm = null, cj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, fj = 50, Ql = 0, tf = null, Pu = ut, nf = $, Kb = !1;
  function af() {
    return jn;
  }
  function wn() {
    return (Be & (un | sa)) !== Ut ? It() : (Pu !== ut || (Pu = It()), Pu);
  }
  function ri(e) {
    var t = e.mode;
    if ((t & He) === ye)
      return xe;
    if ((Be & un) !== Ut && kt !== $)
      return Mo(kt);
    var n = lD() !== iD;
    if (n) {
      if (on.transition !== null) {
        var a = on.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Gt && (nf = Oh()), nf;
    }
    var r = Sa();
    if (r !== Gt)
      return r;
    var i = YC();
    return i;
  }
  function dj(e) {
    var t = e.mode;
    return (t & He) === ye ? xe : mx();
  }
  function Ft(e, t, n, a) {
    Uj(), Kb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Ao(e, n, a), (Be & un) !== $ && e === jn ? Fj(t) : (Ea && Mh(e, t, n), Hj(t), e === jn && ((Be & un) === Ut && (ku = Le(ku, n)), zt === Au && ii(e, kt)), Hn(e, a), n === xe && Be === Ut && (t.mode & He) === ye && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Va.isBatchingLegacy && (Fu(), Ky()));
  }
  function pj(e, t, n) {
    var a = e.current;
    a.lanes = t, Ao(e, t, n), Hn(e, n);
  }
  function mj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Be & un) !== Ut
    );
  }
  function Hn(e, t) {
    var n = e.callbackNode;
    ux(e, t);
    var a = Rs(e, e === jn ? kt : $);
    if (a === $) {
      n !== null && dN(n), e.callbackNode = null, e.callbackPriority = Gt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== ov)) {
      n == null && i !== xe && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && dN(n);
    var l;
    if (r === xe)
      e.tag === Gr ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), P0(Zb.bind(null, e))) : Qy(Zb.bind(null, e)), Va.current !== null ? Va.current.push(Wr) : qC(function() {
        (Be & (un | sa)) === Ut && Wr();
      }), l = null;
    else {
      var o;
      switch (kh(a)) {
        case qn:
          o = Ns;
          break;
        case vr:
          o = Kf;
          break;
        case hr:
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
    if (LD(), Pu = ut, nf = $, (Be & (un | sa)) !== Ut)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Tr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === jn ? kt : $);
    if (r === $)
      return null;
    var i = !Cs(e, r) && !px(e, r) && !t, l = i ? Rj(e, r) : lf(e, r);
    if (l !== Rr) {
      if (l === Yi) {
        var o = bd(e);
        o !== $ && (r = o, l = tv(e, o));
      }
      if (l === Mu) {
        var u = Uu;
        throw qi(e, $), ii(e, r), Hn(e, It()), u;
      }
      if (l === Gm)
        ii(e, r);
      else {
        var p = !Cs(e, r), v = e.current.alternate;
        if (p && !hj(v)) {
          if (l = lf(e, r), l === Yi) {
            var S = bd(e);
            S !== $ && (r = S, l = tv(e, S));
          }
          if (l === Mu) {
            var E = Uu;
            throw qi(e, $), ii(e, r), Hn(e, It()), E;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, vj(e, l, r);
      }
    }
    return Hn(e, It()), e.callbackNode === n ? Xb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = zu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= fr, A0(e.containerInfo);
    }
    var r = lf(e, t);
    if (r !== Yi) {
      var i = Fn;
      Fn = n, i !== null && Jb(i);
    }
    return r;
  }
  function Jb(e) {
    Fn === null ? Fn = e : Fn.push.apply(Fn, e);
  }
  function vj(e, t, n) {
    switch (t) {
      case Rr:
      case Mu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, Fn, Cr);
        break;
      }
      case Kc: {
        if (ii(e, n), wh(n) && // do not delay if we're inside an act() scope
        !pN()) {
          var a = Qm + Gb - It();
          if (a > 10) {
            var r = Rs(e, $);
            if (r !== $)
              break;
            var i = e.suspendedLanes;
            if (!bl(i, n)) {
              wn(), Vh(e, i);
              break;
            }
            e.timeoutHandle = Jd(Gi.bind(null, e, Fn, Cr), a);
            break;
          }
        }
        Gi(e, Fn, Cr);
        break;
      }
      case Au: {
        if (ii(e, n), dx(n))
          break;
        if (!pN()) {
          var l = lx(e, n), o = l, u = It() - o, p = Aj(u) - u;
          if (p > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, Fn, Cr), p);
            break;
          }
        }
        Gi(e, Fn, Cr);
        break;
      }
      case qb: {
        Gi(e, Fn, Cr);
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
  function ii(e, t) {
    t = Ds(t, Jc), t = Ds(t, ku), hx(e, t);
  }
  function Zb(e) {
    if (VD(), (Be & (un | sa)) !== Ut)
      throw new Error("Should not already be working.");
    Tr();
    var t = Rs(e, $);
    if (!In(t, xe))
      return Hn(e, It()), null;
    var n = lf(e, t);
    if (e.tag !== Gr && n === Yi) {
      var a = bd(e);
      a !== $ && (t = a, n = tv(e, a));
    }
    if (n === Mu) {
      var r = Uu;
      throw qi(e, $), ii(e, t), Hn(e, It()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, Fn, Cr), Hn(e, It()), null;
  }
  function yj(e, t) {
    t !== $ && (xd(e, Le(t, xe)), Hn(e, It()), (Be & (un | sa)) === Ut && (Fu(), Wr()));
  }
  function nv(e, t) {
    var n = Be;
    Be |= Ib;
    try {
      return e(t);
    } finally {
      Be = n, Be === Ut && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Va.isBatchingLegacy && (Fu(), Ky());
    }
  }
  function gj(e, t, n, a, r) {
    var i = Sa(), l = on.transition;
    try {
      return on.transition = null, Wt(qn), e(t, n, a, r);
    } finally {
      Wt(i), on.transition = l, Be === Ut && Fu();
    }
  }
  function Dr(e) {
    ai !== null && ai.tag === Gr && (Be & (un | sa)) === Ut && Tr();
    var t = Be;
    Be |= Ib;
    var n = on.transition, a = Sa();
    try {
      return on.transition = null, Wt(qn), e ? e() : void 0;
    } finally {
      Wt(a), on.transition = n, Be = t, (Be & (un | sa)) === Ut && Wr();
    }
  }
  function eN() {
    return (Be & (un | sa)) !== Ut;
  }
  function rf(e, t) {
    vn(Wm, Ja, e), Ja = Le(Ja, t);
  }
  function av(e) {
    Ja = Wm.current, mn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = $;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, IC(n)), gt !== null)
      for (var a = gt.return; a !== null; ) {
        var r = a.alternate;
        wb(r, a), a = a.return;
      }
    jn = e;
    var i = Wi(e.current, null);
    return gt = i, kt = Ja = t, zt = Rr, Uu = null, Xc = $, ku = $, Jc = $, zu = null, Fn = null, pD(), Ca.discardPendingWarnings(), i;
  }
  function tN(e, t) {
    do {
      var n = gt;
      try {
        if (mc(), Cg(), Yt(), qm.current = null, n === null || n.return === null) {
          zt = Mu, Uu = t, gt = null;
          return;
        }
        if (bn && n.mode & tt && $c(n, !0), pa)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            WS(n, a, kt);
          } else
            GS(n, t, kt);
        PD(e, n.return, n, t, kt), iN(n);
      } catch (r) {
        t = r, gt === n && n !== null ? (n = n.return, gt = n) : n = gt;
        continue;
      }
      return;
    } while (!0);
  }
  function nN() {
    var e = Im.current;
    return Im.current = zc, e === null ? zc : e;
  }
  function aN(e) {
    Im.current = e;
  }
  function bj() {
    Qm = It();
  }
  function $u(e) {
    Xc = Le(e, Xc);
  }
  function Nj() {
    zt === Rr && (zt = Kc);
  }
  function rv() {
    (zt === Rr || zt === Kc || zt === Yi) && (zt = Au), jn !== null && (Nd(Xc) || Nd(ku)) && ii(jn, kt);
  }
  function Ej(e) {
    zt !== Au && (zt = Yi), zu === null ? zu = [e] : zu.push(e);
  }
  function Sj() {
    return zt === Rr;
  }
  function lf(e, t) {
    var n = Be;
    Be |= un;
    var a = nN();
    if (jn !== e || kt !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, kt), r.clear()), Ah(e, t);
      }
      Cr = Uh(), qi(e, t);
    }
    Rh(t);
    do
      try {
        xj();
        break;
      } catch (i) {
        tN(e, i);
      }
    while (!0);
    if (mc(), Be = n, aN(a), gt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Ch(), jn = null, kt = $, zt;
  }
  function xj() {
    for (; gt !== null; )
      rN(gt);
  }
  function Rj(e, t) {
    var n = Be;
    Be |= un;
    var a = nN();
    if (jn !== e || kt !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, kt), r.clear()), Ah(e, t);
      }
      Cr = Uh(), Fu(), qi(e, t);
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
    return mc(), aN(a), Be = n, gt !== null ? (ZS(), Rr) : (Ch(), jn = null, kt = $, zt);
  }
  function Cj() {
    for (; gt !== null && !TS(); )
      rN(gt);
  }
  function rN(e) {
    var t = e.alternate;
    pt(e);
    var n;
    (e.mode & tt) !== ye ? (om(e), n = iv(t, e, Ja), $c(e, !0)) : n = iv(t, e, Ja), Yt(), e.memoizedProps = e.pendingProps, n === null ? iN(e) : gt = n, qm.current = null;
  }
  function iN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ne) {
        pt(t);
        var r = void 0;
        if ((t.mode & tt) === ye ? r = jb(n, t, Ja) : (om(t), r = jb(n, t, Ja), $c(t, !1)), Yt(), r !== null) {
          gt = r;
          return;
        }
      } else {
        var i = NT(n, t);
        if (i !== null) {
          i.flags &= ES, gt = i;
          return;
        }
        if ((t.mode & tt) !== ye) {
          $c(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= bs, a.subtreeFlags = Ne, a.deletions = null;
        else {
          zt = Gm, gt = null;
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
    zt === Rr && (zt = qb);
  }
  function Gi(e, t, n) {
    var a = Sa(), r = on.transition;
    try {
      on.transition = null, Wt(qn), Dj(e, t, n, a);
    } finally {
      on.transition = r, Wt(a);
    }
    return null;
  }
  function Dj(e, t, n, a) {
    do
      Tr();
    while (ai !== null);
    if (kj(), (Be & (un | sa)) !== Ut)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (HS(i), r === null)
      return Eh(), null;
    if (i === $ && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Gt;
    var l = Le(r.lanes, r.childLanes);
    yx(e, l), e === jn && (jn = null, gt = null, kt = $), ((r.subtreeFlags & pl) !== Ne || (r.flags & pl) !== Ne) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Tr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ne, u = (r.flags & (Wf | Qf | To | pl)) !== Ne;
    if (o || u) {
      var p = on.transition;
      on.transition = null;
      var v = Sa();
      Wt(qn);
      var S = Be;
      Be |= sa, qm.current = null, CT(e, r), Kg(), FT(e, r, i), zC(e.containerInfo), e.current = r, QS(i), HT(r, e, i), KS(), jS(), Be = S, Wt(v), on.transition = p;
    } else
      e.current = r, Kg();
    var E = Ii;
    if (Ii ? (Ii = !1, ai = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === $ && (Wl = null), E || sN(e.current, !1), AS(r.stateNode, a), Ea && e.memoizedUpdaters.clear(), ij(), Hn(e, It()), t !== null)
      for (var w = e.onRecoverableError, V = 0; V < t.length; V++) {
        var U = t[V], ee = U.stack, ve = U.digest;
        w(U.value, {
          componentStack: ee,
          digest: ve
        });
      }
    if (Zc) {
      Zc = !1;
      var ce = Km;
      throw Km = null, ce;
    }
    return In(Hu, xe) && e.tag !== Gr && Tr(), l = e.pendingLanes, In(l, xe) ? (OD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, Wr(), Eh(), null;
  }
  function Tr() {
    if (ai !== null) {
      var e = kh(Hu), t = Ex(hr, e), n = on.transition, a = Sa();
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
      return Tr(), null;
    }));
  }
  function jj() {
    if (ai === null)
      return !1;
    var e = Jm;
    Jm = null;
    var t = ai, n = Hu;
    if (ai = null, Hu = $, (Be & (un | sa)) !== Ut)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, XS(n);
    var a = Be;
    Be |= sa, GT(t.current), $T(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        wT(t, l);
      }
    }
    JS(), sN(t.current, !0), Be = a, Wr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, US(t);
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
    var a = Pi(n, t), r = rb(e, a, xe), i = Kr(e, r, xe), l = wn();
    i !== null && (Ao(i, xe, l), Hn(i, l));
  }
  function it(e, t, n) {
    if (ST(n), Iu(!1), e.tag === x) {
      oN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        oN(a, e, n);
        return;
      } else if (a.tag === D) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !lN(i)) {
          var l = Pi(n, e), o = Cm(a, l, xe), u = Kr(a, o, xe), p = wn();
          u !== null && (Ao(u, xe, p), Hn(u, p));
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
    Vh(e, n), Bj(e), jn === e && bl(kt, n) && (zt === Au || zt === Kc && wh(kt) && It() - Qm < Gb ? qi(e, $) : Jc = Le(Jc, n)), Hn(e, r);
  }
  function uN(e, t) {
    t === Gt && (t = dj(e));
    var n = wn(), a = kn(e, t);
    a !== null && (Ao(a, t, n), Hn(a, n));
  }
  function Vj(e) {
    var t = e.memoizedState, n = Gt;
    t !== null && (n = t.retryLane), uN(e, n);
  }
  function Mj(e, t) {
    var n = Gt, a;
    switch (e.tag) {
      case H:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case _e:
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
  function Uj() {
    if (Bu > cj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > fj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function kj() {
    Ca.flushLegacyContextWarning(), Ca.flushPendingUnsafeLifecycleWarnings();
  }
  function sN(e, t) {
    pt(e), of(e, zr, nj), t && of(e, Gf, aj), of(e, zr, ej), t && of(e, Gf, tj), Yt();
  }
  function of(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ne ? a = a.child : ((a.flags & t) !== Ne && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var uf = null;
  function cN(e) {
    {
      if ((Be & un) !== Ut || !(e.mode & He))
        return;
      var t = e.tag;
      if (t !== M && t !== x && t !== D && t !== R && t !== q && t !== le && t !== se)
        return;
      var n = Te(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = xn;
      try {
        pt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? pt(e) : Yt();
      }
    }
  }
  var iv;
  {
    var zj = null;
    iv = function(e, t, n) {
      var a = gN(zj, t);
      try {
        return xb(e, t, n);
      } catch (i) {
        if (K0() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (mc(), Cg(), wb(e, t), gN(t, a), t.mode & tt && om(t), Bf(null, xb, null, e, t, n), gS()) {
          var r = Pf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var fN = !1, lv;
  lv = /* @__PURE__ */ new Set();
  function Fj(e) {
    if (yi && !jD())
      switch (e.tag) {
        case R:
        case q:
        case se: {
          var t = gt && Te(gt) || "Unknown", n = t;
          if (!lv.has(n)) {
            lv.add(n);
            var a = Te(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case D: {
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
      return DS(e);
  }
  function pN() {
    return Va.current !== null;
  }
  function Hj(e) {
    {
      if (e.mode & He) {
        if (!Yb())
          return;
      } else if (!oj() || Be !== Ut || e.tag !== R && e.tag !== q && e.tag !== se)
        return;
      if (Va.current === null) {
        var t = xn;
        try {
          pt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Te(e));
        } finally {
          t ? pt(e) : Yt();
        }
      }
    }
  }
  function Bj(e) {
    e.tag !== Gr && Yb() && Va.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

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
              $$typeof: me,
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
        case D: {
          typeof a == "function" && (r = !0);
          break;
        }
        case R: {
          (typeof a == "function" || i === he) && (r = !0);
          break;
        }
        case q: {
          (i === me || i === he) && (r = !0);
          break;
        }
        case le:
        case se: {
          (i === Oe || i === he) && (r = !0);
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
      Tr(), Dr(function() {
        fv(e.current, a, n);
      });
    }
  }, Yj = function(e, t) {
    {
      if (e.context !== Qn)
        return;
      Tr(), Dr(function() {
        qu(t, e, null, null);
      });
    }
  };
  function fv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, o = e.type, u = null;
      switch (l) {
        case R:
        case se:
        case D:
          u = o;
          break;
        case q:
          u = o.render;
          break;
      }
      if (ca === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var p = !1, v = !1;
      if (u !== null) {
        var S = ca(u);
        S !== void 0 && (n.has(S) ? v = !0 : t.has(S) && (l === D ? v = !0 : p = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || p) {
        var E = kn(e, xe);
        E !== null && Ft(E, e, xe, ut);
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
        case R:
        case se:
        case D:
          o = l;
          break;
        case q:
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
          case B:
            t.add(a.stateNode);
            return;
          case z:
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
  function Gj(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === B)
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
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ne, this.subtreeFlags = Ne, this.deletions = null, this.lanes = $, this.childLanes = $, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
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
      return mv(e) ? D : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === me)
        return q;
      if (t === Oe)
        return le;
    }
    return M;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Kn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ne, n.subtreeFlags = Ne, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & pr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case M:
      case R:
      case se:
        n.type = Xl(e.type);
        break;
      case D:
        n.type = sv(e.type);
        break;
      case q:
        n.type = cv(e.type);
        break;
    }
    return n;
  }
  function Xj(e, t) {
    e.flags &= pr | Dt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = $, e.lanes = t, e.child = null, e.subtreeFlags = Ne, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = Ne, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
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
    return e === rc ? (a = He, t === !0 && (a |= Et, a |= Pa)) : a = ye, Ea && (a |= tt), Kn(x, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = M, o = e;
    if (typeof e == "function")
      mv(e) ? (l = D, o = sv(o)) : o = Xl(o);
    else if (typeof e == "string")
      l = B;
    else
      e: switch (e) {
        case za:
          return li(n.children, r, i, t);
        case fi:
          l = X, r |= Et, (r & He) !== ye && (r |= Pa);
          break;
        case g:
          return Zj(n, r, i, t);
        case ze:
          return ew(n, r, i, t);
        case Se:
          return tw(n, r, i, t);
        case ft:
          return yN(n, r, i, t);
        case dn:
        case _t:
        case Fa:
        case ga:
        case ct:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Y:
                l = P;
                break e;
              case Z:
                l = pe;
                break e;
              case me:
                l = q, o = cv(o);
                break e;
              case Oe:
                l = le;
                break e;
              case he:
                l = $e, o = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var p = a ? Te(a) : null;
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
  function li(e, t, n, a) {
    var r = Kn(fe, e, a, t);
    return r.lanes = n, r;
  }
  function Zj(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Kn(ie, e, a, t | tt);
    return r.elementType = g, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ew(e, t, n, a) {
    var r = Kn(H, e, a, t);
    return r.elementType = ze, r.lanes = n, r;
  }
  function tw(e, t, n, a) {
    var r = Kn(_e, e, a, t);
    return r.elementType = Se, r.lanes = n, r;
  }
  function yN(e, t, n, a) {
    var r = Kn(be, e, a, t);
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
  function nw() {
    var e = Kn(B, null, null, ye);
    return e.elementType = "DELETED", e;
  }
  function aw(e) {
    var t = Kn(je, null, null, ye);
    return t.stateNode = e, t;
  }
  function gv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Kn(z, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function gN(e, t) {
    return e === null && (e = Kn(M, null, null, ye)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function rw(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Gt, this.eventTimes = Sd($), this.expirationTimes = Sd(ut), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = Sd($), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < Zf; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case rc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Gr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function bN(e, t, n, a, r, i, l, o, u, p) {
    var v = new rw(e, t, n, o, u), S = Jj(t, i);
    v.current = S, S.stateNode = v;
    {
      var E = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      S.memoizedState = E;
    }
    return Op(S), v;
  }
  var bv = "18.3.1";
  function iw(e, t, n) {
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
    if (t.tag === D) {
      var a = t.type;
      if (Ia(a))
        return Gy(t, a, n);
    }
    return n;
  }
  function lw(e, t) {
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
        var i = Te(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = xn;
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
  function SN(e, t, n, a, r, i, l, o, u, p) {
    var v = !0, S = bN(n, a, v, e, r, i, l, o, u);
    S.context = NN(null);
    var E = S.current, w = wn(), V = ri(E), U = Sr(w, V);
    return U.callback = t ?? null, Kr(E, U, V), pj(S, V, w), S;
  }
  function qu(e, t, n, a) {
    MS(t, e);
    var r = t.current, i = wn(), l = ri(r);
    ex(l);
    var o = NN(n);
    t.context === null ? t.context = o : t.pendingContext = o, yi && xn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Te(xn) || "Unknown"));
    var u = Sr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var p = Kr(r, u, l);
    return p !== null && (Ft(p, r, l, i), bc(p, r, l)), l;
  }
  function sf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case B:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function ow(e) {
    switch (e.tag) {
      case x: {
        var t = e.stateNode;
        if (js(t)) {
          var n = sx(t);
          yj(t, n);
        }
        break;
      }
      case H: {
        Dr(function() {
          var r = kn(e, xe);
          if (r !== null) {
            var i = wn();
            Ft(r, e, xe, i);
          }
        });
        var a = xe;
        Sv(e, a);
        break;
      }
    }
  }
  function xN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = vx(n.retryLane, t));
  }
  function Sv(e, t) {
    xN(e, t);
    var n = e.alternate;
    n && xN(n, t);
  }
  function uw(e) {
    if (e.tag === H) {
      var t = Oo, n = kn(e, t);
      if (n !== null) {
        var a = wn();
        Ft(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function sw(e) {
    if (e.tag === H) {
      var t = ri(e), n = kn(e, t);
      if (n !== null) {
        var a = wn();
        Ft(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function RN(e) {
    var t = CS(e);
    return t === null ? null : t.stateNode;
  }
  var CN = function(e) {
    return null;
  };
  function cw(e) {
    return CN(e);
  }
  var DN = function(e) {
    return !1;
  };
  function fw(e) {
    return DN(e);
  }
  var TN = null, jN = null, wN = null, _N = null, ON = null, LN = null, VN = null, MN = null, AN = null;
  {
    var UN = function(e, t, n) {
      var a = t[n], r = Ue(e) ? e.slice() : Me({}, e);
      return n + 1 === t.length ? (Ue(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = UN(e[a], t, n + 1), r);
    }, kN = function(e, t) {
      return UN(e, t, 0);
    }, zN = function(e, t, n, a) {
      var r = t[a], i = Ue(e) ? e.slice() : Me({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Ue(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = zN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, FN = function(e, t, n) {
      if (t.length !== n.length) {
        C("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            C("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return zN(e, t, n, 0);
    }, HN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Ue(e) ? e.slice() : Me({}, e);
      return i[r] = HN(e[r], t, n + 1, a), i;
    }, BN = function(e, t, n) {
      return HN(e, t, 0, n);
    }, xv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    TN = function(e, t, n, a) {
      var r = xv(e, t);
      if (r !== null) {
        var i = BN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Me({}, e.memoizedProps);
        var l = kn(e, xe);
        l !== null && Ft(l, e, xe, ut);
      }
    }, jN = function(e, t, n) {
      var a = xv(e, t);
      if (a !== null) {
        var r = kN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Me({}, e.memoizedProps);
        var i = kn(e, xe);
        i !== null && Ft(i, e, xe, ut);
      }
    }, wN = function(e, t, n, a) {
      var r = xv(e, t);
      if (r !== null) {
        var i = FN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Me({}, e.memoizedProps);
        var l = kn(e, xe);
        l !== null && Ft(l, e, xe, ut);
      }
    }, _N = function(e, t, n) {
      e.pendingProps = BN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = kn(e, xe);
      a !== null && Ft(a, e, xe, ut);
    }, ON = function(e, t) {
      e.pendingProps = kN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = kn(e, xe);
      n !== null && Ft(n, e, xe, ut);
    }, LN = function(e, t, n) {
      e.pendingProps = FN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = kn(e, xe);
      a !== null && Ft(a, e, xe, ut);
    }, VN = function(e) {
      var t = kn(e, xe);
      t !== null && Ft(t, e, xe, ut);
    }, MN = function(e) {
      CN = e;
    }, AN = function(e) {
      DN = e;
    };
  }
  function dw(e) {
    var t = yh(e);
    return t === null ? null : t.stateNode;
  }
  function pw(e) {
    return null;
  }
  function mw() {
    return xn;
  }
  function vw(e) {
    var t = e.findFiberByHostInstance, n = h.ReactCurrentDispatcher;
    return VS({
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
      findHostInstanceByFiber: dw,
      findFiberByHostInstance: t || pw,
      // React Refresh
      findHostInstancesForRefresh: Ij,
      scheduleRefresh: $j,
      scheduleRoot: Yj,
      setRefreshHandler: Pj,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: mw,
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
      eN() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Dr(function() {
        qu(null, e, null, null);
      }), Py(t);
    }
  };
  function hw(e, t) {
    if (!ff(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    $N(e);
    var n = !1, a = !1, r = "", i = PN;
    t != null && (t.hydrate ? C("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === na && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

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
  function yw(e) {
    e && Lx(e);
  }
  cf.prototype.unstable_scheduleHydration = yw;
  function gw(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    $N(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", u = PN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var p = SN(t, null, e, rc, a, i, l, o, u);
    if (Xs(p.current, e), Jo(e), r)
      for (var v = 0; v < r.length; v++) {
        var S = r[v];
        SD(p, S);
      }
    return new cf(p);
  }
  function ff(e) {
    return !!(e && (e.nodeType === An || e.nodeType === cr || e.nodeType === _f));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === An || e.nodeType === cr || e.nodeType === _f || e.nodeType === Ct && e.nodeValue === " react-mount-point-unstable "));
  }
  function $N(e) {
    e.nodeType === An && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var bw = h.ReactCurrentOwner, YN;
  YN = function(e) {
    if (e._reactRootContainer && e.nodeType !== Ct) {
      var t = RN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Cv(e), r = !!(a && Ir(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === An && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Cv(e) {
    return e ? e.nodeType === cr ? e.documentElement : e.firstChild : null;
  }
  function IN() {
  }
  function Nw(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var E = sf(l);
          i.call(E);
        };
      }
      var l = SN(
        t,
        a,
        e,
        Gr,
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
      return Jo(o), Dr(), l;
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
        Gr,
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
      var S = e.nodeType === Ct ? e.parentNode : e;
      return Jo(S), Dr(function() {
        qu(t, v, n, a);
      }), v;
    }
  }
  function Ew(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    YN(n), Ew(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = Nw(n, t, e, r, a);
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
  function Sw(e) {
    {
      qN || (qN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = bw.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ge(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === An ? e : lw(e, "findDOMNode");
  }
  function xw(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function Rw(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function Cw(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !bS(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  var GN = !1;
  function Dw(e) {
    if (GN || (GN = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = su(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Cv(e), a = n && !Ir(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Dr(function() {
        df(null, null, e, !1, function() {
          e._reactRootContainer = null, Py(e);
        });
      }), !0;
    } else {
      {
        var r = Cv(e), i = !!(r && Ir(r)), l = e.nodeType === An && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  Sx(ow), Rx(uw), Cx(sw), Dx(Sa), Tx(bx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), uS(jC), fS(nv, gj, Dr);
  function Tw(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return iw(e, t, null, n);
  }
  function jw(e, t, n, a) {
    return Cw(e, t, n, a);
  }
  var Dv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [Ir, jl, Js, rh, ih, nv]
  };
  function ww(e, t) {
    return Dv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), hw(e, t);
  }
  function _w(e, t, n) {
    return Dv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), gw(e, t, n);
  }
  function Ow(e) {
    return eN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Dr(e);
  }
  var Lw = vw({
    findFiberByHostInstance: Vi,
    bundleType: 1,
    version: bv,
    rendererPackageName: "react-dom"
  });
  if (!Lw && Jt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var WN = window.location.protocol;
    /^(https?|file):$/.test(WN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (WN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  Jn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, Jn.createPortal = Tw, Jn.createRoot = ww, Jn.findDOMNode = Sw, Jn.flushSync = Ow, Jn.hydrate = xw, Jn.hydrateRoot = _w, Jn.render = Rw, Jn.unmountComponentAtNode = Dw, Jn.unstable_batchedUpdates = nv, Jn.unstable_renderSubtreeIntoContainer = jw, Jn.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
sE.exports = Jn;
var Bw = sE.exports, dE, QN = Bw;
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
      for (var b in h)
        Object.prototype.hasOwnProperty.call(h, b) && (c[b] = h[b]);
    }
    return c;
  }, Qu.apply(this, arguments);
}
var oi;
(function(c) {
  c.Pop = "POP", c.Push = "PUSH", c.Replace = "REPLACE";
})(oi || (oi = {}));
const XN = "popstate";
function Pw(c) {
  c === void 0 && (c = {});
  function m(b, N) {
    let {
      pathname: C,
      search: f,
      hash: _
    } = b.location;
    return _v(
      "",
      {
        pathname: C,
        search: f,
        hash: _
      },
      // state defaults to `null` because `window.history.state` does
      N.state && N.state.usr || null,
      N.state && N.state.key || "default"
    );
  }
  function h(b, N) {
    return typeof N == "string" ? N : Ku(N);
  }
  return Yw(m, h, null, c);
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
function $w() {
  return Math.random().toString(36).substr(2, 8);
}
function JN(c, m) {
  return {
    usr: c.state,
    key: c.key,
    idx: m
  };
}
function _v(c, m, h, b) {
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
    key: m && m.key || b || $w()
  });
}
function Ku(c) {
  let {
    pathname: m = "/",
    search: h = "",
    hash: b = ""
  } = c;
  return h && h !== "?" && (m += h.charAt(0) === "?" ? h : "?" + h), b && b !== "#" && (m += b.charAt(0) === "#" ? b : "#" + b), m;
}
function eo(c) {
  let m = {};
  if (c) {
    let h = c.indexOf("#");
    h >= 0 && (m.hash = c.substr(h), c = c.substr(0, h));
    let b = c.indexOf("?");
    b >= 0 && (m.search = c.substr(b), c = c.substr(0, b)), c && (m.pathname = c);
  }
  return m;
}
function Yw(c, m, h, b) {
  b === void 0 && (b = {});
  let {
    window: N = document.defaultView,
    v5Compat: C = !1
  } = b, f = N.history, _ = oi.Pop, R = null, D = M();
  D == null && (D = 0, f.replaceState(Qu({}, f.state, {
    idx: D
  }), ""));
  function M() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function x() {
    _ = oi.Pop;
    let X = M(), pe = X == null ? null : X - D;
    D = X, R && R({
      action: _,
      location: fe.location,
      delta: pe
    });
  }
  function z(X, pe) {
    _ = oi.Push;
    let P = _v(fe.location, X, pe);
    D = M() + 1;
    let q = JN(P, D), ie = fe.createHref(P);
    try {
      f.pushState(q, "", ie);
    } catch (H) {
      if (H instanceof DOMException && H.name === "DataCloneError")
        throw H;
      N.location.assign(ie);
    }
    C && R && R({
      action: _,
      location: fe.location,
      delta: 1
    });
  }
  function B(X, pe) {
    _ = oi.Replace;
    let P = _v(fe.location, X, pe);
    D = M();
    let q = JN(P, D), ie = fe.createHref(P);
    f.replaceState(q, "", ie), C && R && R({
      action: _,
      location: fe.location,
      delta: 0
    });
  }
  function W(X) {
    let pe = N.location.origin !== "null" ? N.location.origin : N.location.href, P = typeof X == "string" ? X : Ku(X);
    return P = P.replace(/ $/, "%20"), vt(pe, "No window.location.(origin|href) available to create URL for href: " + P), new URL(P, pe);
  }
  let fe = {
    get action() {
      return _;
    },
    get location() {
      return c(N, f);
    },
    listen(X) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return N.addEventListener(XN, x), R = X, () => {
        N.removeEventListener(XN, x), R = null;
      };
    },
    createHref(X) {
      return m(N, X);
    },
    createURL: W,
    encodeLocation(X) {
      let pe = W(X);
      return {
        pathname: pe.pathname,
        search: pe.search,
        hash: pe.hash
      };
    },
    push: z,
    replace: B,
    go(X) {
      return f.go(X);
    }
  };
  return fe;
}
var ZN;
(function(c) {
  c.data = "data", c.deferred = "deferred", c.redirect = "redirect", c.error = "error";
})(ZN || (ZN = {}));
function Iw(c, m, h) {
  return h === void 0 && (h = "/"), qw(c, m, h);
}
function qw(c, m, h, b) {
  let N = typeof m == "string" ? eo(m) : m, C = ui(N.pathname || "/", h);
  if (C == null)
    return null;
  let f = pE(c);
  Gw(f);
  let _ = null;
  for (let R = 0; _ == null && R < f.length; ++R) {
    let D = r1(C);
    _ = n1(f[R], D);
  }
  return _;
}
function pE(c, m, h, b) {
  m === void 0 && (m = []), h === void 0 && (h = []), b === void 0 && (b = "");
  let N = (C, f, _) => {
    let R = {
      relativePath: _ === void 0 ? C.path || "" : _,
      caseSensitive: C.caseSensitive === !0,
      childrenIndex: f,
      route: C
    };
    R.relativePath.startsWith("/") && (vt(R.relativePath.startsWith(b), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + b + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(b.length));
    let D = Or([b, R.relativePath]), M = h.concat(R);
    C.children && C.children.length > 0 && (vt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      C.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + D + '".')
    ), pE(C.children, m, M, D)), !(C.path == null && !C.index) && m.push({
      path: D,
      score: e1(D, C.index),
      routesMeta: M
    });
  };
  return c.forEach((C, f) => {
    var _;
    if (C.path === "" || !((_ = C.path) != null && _.includes("?")))
      N(C, f);
    else
      for (let R of mE(C.path))
        N(C, f, R);
  }), m;
}
function mE(c) {
  let m = c.split("/");
  if (m.length === 0) return [];
  let [h, ...b] = m, N = h.endsWith("?"), C = h.replace(/\?$/, "");
  if (b.length === 0)
    return N ? [C, ""] : [C];
  let f = mE(b.join("/")), _ = [];
  return _.push(...f.map((R) => R === "" ? C : [C, R].join("/"))), N && _.push(...f), _.map((R) => c.startsWith("/") && R === "" ? "/" : R);
}
function Gw(c) {
  c.sort((m, h) => m.score !== h.score ? h.score - m.score : t1(m.routesMeta.map((b) => b.childrenIndex), h.routesMeta.map((b) => b.childrenIndex)));
}
const Ww = /^:[\w-]+$/, Qw = 3, Kw = 2, Xw = 1, Jw = 10, Zw = -2, eE = (c) => c === "*";
function e1(c, m) {
  let h = c.split("/"), b = h.length;
  return h.some(eE) && (b += Zw), m && (b += Kw), h.filter((N) => !eE(N)).reduce((N, C) => N + (Ww.test(C) ? Qw : C === "" ? Xw : Jw), b);
}
function t1(c, m) {
  return c.length === m.length && c.slice(0, -1).every((b, N) => b === m[N]) ? (
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
function n1(c, m, h) {
  let {
    routesMeta: b
  } = c, N = {}, C = "/", f = [];
  for (let _ = 0; _ < b.length; ++_) {
    let R = b[_], D = _ === b.length - 1, M = C === "/" ? m : m.slice(C.length) || "/", x = Ov({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: D
    }, M), z = R.route;
    if (!x)
      return null;
    Object.assign(N, x.params), f.push({
      // TODO: Can this as be avoided?
      params: N,
      pathname: Or([C, x.pathname]),
      pathnameBase: u1(Or([C, x.pathnameBase])),
      route: z
    }), x.pathnameBase !== "/" && (C = Or([C, x.pathnameBase]));
  }
  return f;
}
function Ov(c, m) {
  typeof c == "string" && (c = {
    path: c,
    caseSensitive: !1,
    end: !0
  });
  let [h, b] = a1(c.path, c.caseSensitive, c.end), N = m.match(h);
  if (!N) return null;
  let C = N[0], f = C.replace(/(.)\/+$/, "$1"), _ = N.slice(1);
  return {
    params: b.reduce((D, M, x) => {
      let {
        paramName: z,
        isOptional: B
      } = M;
      if (z === "*") {
        let fe = _[x] || "";
        f = C.slice(0, C.length - fe.length).replace(/(.)\/+$/, "$1");
      }
      const W = _[x];
      return B && !W ? D[z] = void 0 : D[z] = (W || "").replace(/%2F/g, "/"), D;
    }, {}),
    pathname: C,
    pathnameBase: f,
    pattern: c
  };
}
function a1(c, m, h) {
  m === void 0 && (m = !1), h === void 0 && (h = !0), Ma(c === "*" || !c.endsWith("*") || c.endsWith("/*"), 'Route path "' + c + '" will be treated as if it were ' + ('"' + c.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + c.replace(/\*$/, "/*") + '".'));
  let b = [], N = "^" + c.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, _, R) => (b.push({
    paramName: _,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return c.endsWith("*") ? (b.push({
    paramName: "*"
  }), N += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? N += "\\/*$" : c !== "" && c !== "/" && (N += "(?:(?=\\/|$))"), [new RegExp(N, m ? void 0 : "i"), b];
}
function r1(c) {
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
  let h = m.endsWith("/") ? m.length - 1 : m.length, b = c.charAt(h);
  return b && b !== "/" ? null : c.slice(h) || "/";
}
function i1(c, m) {
  m === void 0 && (m = "/");
  let {
    pathname: h,
    search: b = "",
    hash: N = ""
  } = typeof c == "string" ? eo(c) : c;
  return {
    pathname: h ? h.startsWith("/") ? h : l1(h, m) : m,
    search: s1(b),
    hash: c1(N)
  };
}
function l1(c, m) {
  let h = m.replace(/\/+$/, "").split("/");
  return c.split("/").forEach((N) => {
    N === ".." ? h.length > 1 && h.pop() : N !== "." && h.push(N);
  }), h.length > 1 ? h.join("/") : "/";
}
function Tv(c, m, h, b) {
  return "Cannot include a '" + c + "' character in a manually specified " + ("`to." + m + "` field [" + JSON.stringify(b) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function o1(c) {
  return c.filter((m, h) => h === 0 || m.route.path && m.route.path.length > 0);
}
function Vv(c, m) {
  let h = o1(c);
  return m ? h.map((b, N) => N === h.length - 1 ? b.pathname : b.pathnameBase) : h.map((b) => b.pathnameBase);
}
function Mv(c, m, h, b) {
  b === void 0 && (b = !1);
  let N;
  typeof c == "string" ? N = eo(c) : (N = Qu({}, c), vt(!N.pathname || !N.pathname.includes("?"), Tv("?", "pathname", "search", N)), vt(!N.pathname || !N.pathname.includes("#"), Tv("#", "pathname", "hash", N)), vt(!N.search || !N.search.includes("#"), Tv("#", "search", "hash", N)));
  let C = c === "" || N.pathname === "", f = C ? "/" : N.pathname, _;
  if (f == null)
    _ = h;
  else {
    let x = m.length - 1;
    if (!b && f.startsWith("..")) {
      let z = f.split("/");
      for (; z[0] === ".."; )
        z.shift(), x -= 1;
      N.pathname = z.join("/");
    }
    _ = x >= 0 ? m[x] : "/";
  }
  let R = i1(N, _), D = f && f !== "/" && f.endsWith("/"), M = (C || f === ".") && h.endsWith("/");
  return !R.pathname.endsWith("/") && (D || M) && (R.pathname += "/"), R;
}
const Or = (c) => c.join("/").replace(/\/\/+/g, "/"), u1 = (c) => c.replace(/\/+$/, "").replace(/^\/*/, "/"), s1 = (c) => !c || c === "?" ? "" : c.startsWith("?") ? c : "?" + c, c1 = (c) => !c || c === "#" ? "" : c.startsWith("#") ? c : "#" + c;
function f1(c) {
  return c != null && typeof c.status == "number" && typeof c.statusText == "string" && typeof c.internal == "boolean" && "data" in c;
}
const vE = ["post", "put", "patch", "delete"];
new Set(vE);
const d1 = ["get", ...vE];
new Set(d1);
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
      for (var b in h)
        Object.prototype.hasOwnProperty.call(h, b) && (c[b] = h[b]);
    }
    return c;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ O.createContext(null);
Zu.displayName = "DataRouter";
const Av = /* @__PURE__ */ O.createContext(null);
Av.displayName = "DataRouterState";
const p1 = /* @__PURE__ */ O.createContext(null);
p1.displayName = "Await";
const fa = /* @__PURE__ */ O.createContext(null);
fa.displayName = "Navigation";
const es = /* @__PURE__ */ O.createContext(null);
es.displayName = "Location";
const Aa = /* @__PURE__ */ O.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Aa.displayName = "Route";
const Uv = /* @__PURE__ */ O.createContext(null);
Uv.displayName = "RouteError";
function m1(c, m) {
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
    basename: b,
    navigator: N
  } = O.useContext(fa), {
    hash: C,
    pathname: f,
    search: _
  } = ts(c, {
    relative: h
  }), R = f;
  return b !== "/" && (R = f === "/" ? b : Or([b, f])), N.createHref({
    pathname: R,
    search: _,
    hash: C
  });
}
function to() {
  return O.useContext(es) != null;
}
function Qi() {
  return to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), O.useContext(es).location;
}
const hE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function yE(c) {
  O.useContext(fa).static || O.useLayoutEffect(c);
}
function kv() {
  let {
    isDataRoute: c
  } = O.useContext(Aa);
  return c ? w1() : v1();
}
function v1() {
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let c = O.useContext(Zu), {
    basename: m,
    future: h,
    navigator: b
  } = O.useContext(fa), {
    matches: N
  } = O.useContext(Aa), {
    pathname: C
  } = Qi(), f = JSON.stringify(Vv(N, h.v7_relativeSplatPath)), _ = O.useRef(!1);
  return yE(() => {
    _.current = !0;
  }), O.useCallback(function(D, M) {
    if (M === void 0 && (M = {}), Ma(_.current, hE), !_.current) return;
    if (typeof D == "number") {
      b.go(D);
      return;
    }
    let x = Mv(D, JSON.parse(f), C, M.relative === "path");
    c == null && m !== "/" && (x.pathname = x.pathname === "/" ? m : Or([m, x.pathname])), (M.replace ? b.replace : b.push)(x, M.state, M);
  }, [m, b, f, C, c]);
}
function h1() {
  let {
    matches: c
  } = O.useContext(Aa), m = c[c.length - 1];
  return m ? m.params : {};
}
function ts(c, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    future: b
  } = O.useContext(fa), {
    matches: N
  } = O.useContext(Aa), {
    pathname: C
  } = Qi(), f = JSON.stringify(Vv(N, b.v7_relativeSplatPath));
  return O.useMemo(() => Mv(c, JSON.parse(f), C, h === "path"), [c, f, C, h]);
}
function y1(c, m) {
  return g1(c, m);
}
function g1(c, m, h, b) {
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: N
  } = O.useContext(fa), {
    matches: C
  } = O.useContext(Aa), f = C[C.length - 1], _ = f ? f.params : {}, R = f ? f.pathname : "/", D = f ? f.pathnameBase : "/", M = f && f.route;
  {
    let P = M && M.path || "";
    bE(R, !M || P.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + P + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + P + '"> to <Route ') + ('path="' + (P === "/" ? "*" : P + "/*") + '">.'));
  }
  let x = Qi(), z;
  if (m) {
    var B;
    let P = typeof m == "string" ? eo(m) : m;
    D === "/" || (B = P.pathname) != null && B.startsWith(D) || vt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + D + '" ') + ('but pathname "' + P.pathname + '" was given in the `location` prop.')), z = P;
  } else
    z = x;
  let W = z.pathname || "/", fe = W;
  if (D !== "/") {
    let P = D.replace(/^\//, "").split("/");
    fe = "/" + W.replace(/^\//, "").split("/").slice(P.length).join("/");
  }
  let X = Iw(c, {
    pathname: fe
  });
  Ma(M || X != null, 'No routes matched location "' + z.pathname + z.search + z.hash + '" '), Ma(X == null || X[X.length - 1].route.element !== void 0 || X[X.length - 1].route.Component !== void 0 || X[X.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + z.pathname + z.search + z.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let pe = x1(X && X.map((P) => Object.assign({}, P, {
    params: Object.assign({}, _, P.params),
    pathname: Or([
      D,
      // Re-encode pathnames that were decoded inside matchRoutes
      N.encodeLocation ? N.encodeLocation(P.pathname).pathname : P.pathname
    ]),
    pathnameBase: P.pathnameBase === "/" ? D : Or([
      D,
      // Re-encode pathnames that were decoded inside matchRoutes
      N.encodeLocation ? N.encodeLocation(P.pathnameBase).pathname : P.pathnameBase
    ])
  })), C, h, b);
  return m && pe ? /* @__PURE__ */ O.createElement(es.Provider, {
    value: {
      location: Xu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, z),
      navigationType: oi.Pop
    }
  }, pe) : pe;
}
function b1() {
  let c = j1(), m = f1(c) ? c.status + " " + c.statusText : c instanceof Error ? c.message : JSON.stringify(c), h = c instanceof Error ? c.stack : null, b = "rgba(200,200,200, 0.5)", N = {
    padding: "0.5rem",
    backgroundColor: b
  }, C = {
    padding: "2px 4px",
    backgroundColor: b
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", c), f = /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ O.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ O.createElement("code", {
    style: C
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ O.createElement("code", {
    style: C
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ O.createElement(O.Fragment, null, /* @__PURE__ */ O.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ O.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, m), h ? /* @__PURE__ */ O.createElement("pre", {
    style: N
  }, h) : null, f);
}
const N1 = /* @__PURE__ */ O.createElement(b1, null);
class E1 extends O.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ O.createElement(Aa.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ O.createElement(Uv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function S1(c) {
  let {
    routeContext: m,
    match: h,
    children: b
  } = c, N = O.useContext(Zu);
  return N && N.static && N.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (N.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ O.createElement(Aa.Provider, {
    value: m
  }, b);
}
function x1(c, m, h, b) {
  var N;
  if (m === void 0 && (m = []), h === void 0 && (h = null), b === void 0 && (b = null), c == null) {
    var C;
    if (!h)
      return null;
    if (h.errors)
      c = h.matches;
    else if ((C = b) != null && C.v7_partialHydration && m.length === 0 && !h.initialized && h.matches.length > 0)
      c = h.matches;
    else
      return null;
  }
  let f = c, _ = (N = h) == null ? void 0 : N.errors;
  if (_ != null) {
    let M = f.findIndex((x) => x.route.id && (_ == null ? void 0 : _[x.route.id]) !== void 0);
    M >= 0 || vt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(_).join(",")), f = f.slice(0, Math.min(f.length, M + 1));
  }
  let R = !1, D = -1;
  if (h && b && b.v7_partialHydration)
    for (let M = 0; M < f.length; M++) {
      let x = f[M];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (D = M), x.route.id) {
        let {
          loaderData: z,
          errors: B
        } = h, W = x.route.loader && z[x.route.id] === void 0 && (!B || B[x.route.id] === void 0);
        if (x.route.lazy || W) {
          R = !0, D >= 0 ? f = f.slice(0, D + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((M, x, z) => {
    let B, W = !1, fe = null, X = null;
    h && (B = _ && x.route.id ? _[x.route.id] : void 0, fe = x.route.errorElement || N1, R && (D < 0 && z === 0 ? (bE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), W = !0, X = null) : D === z && (W = !0, X = x.route.hydrateFallbackElement || null)));
    let pe = m.concat(f.slice(0, z + 1)), P = () => {
      let q;
      return B ? q = fe : W ? q = X : x.route.Component ? q = /* @__PURE__ */ O.createElement(x.route.Component, null) : x.route.element ? q = x.route.element : q = M, /* @__PURE__ */ O.createElement(S1, {
        match: x,
        routeContext: {
          outlet: M,
          matches: pe,
          isDataRoute: h != null
        },
        children: q
      });
    };
    return h && (x.route.ErrorBoundary || x.route.errorElement || z === 0) ? /* @__PURE__ */ O.createElement(E1, {
      location: h.location,
      revalidation: h.revalidation,
      component: fe,
      error: B,
      children: P(),
      routeContext: {
        outlet: null,
        matches: pe,
        isDataRoute: !0
      }
    }) : P();
  }, null);
}
var gE = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c;
}(gE || {}), Ju = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseLoaderData = "useLoaderData", c.UseActionData = "useActionData", c.UseRouteError = "useRouteError", c.UseNavigation = "useNavigation", c.UseRouteLoaderData = "useRouteLoaderData", c.UseMatches = "useMatches", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c.UseRouteId = "useRouteId", c;
}(Ju || {});
function zv(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function R1(c) {
  let m = O.useContext(Zu);
  return m || vt(!1, zv(c)), m;
}
function C1(c) {
  let m = O.useContext(Av);
  return m || vt(!1, zv(c)), m;
}
function D1(c) {
  let m = O.useContext(Aa);
  return m || vt(!1, zv(c)), m;
}
function Fv(c) {
  let m = D1(c), h = m.matches[m.matches.length - 1];
  return h.route.id || vt(!1, c + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function T1() {
  return Fv(Ju.UseRouteId);
}
function j1() {
  var c;
  let m = O.useContext(Uv), h = C1(Ju.UseRouteError), b = Fv(Ju.UseRouteError);
  return m !== void 0 ? m : (c = h.errors) == null ? void 0 : c[b];
}
function w1() {
  let {
    router: c
  } = R1(gE.UseNavigateStable), m = Fv(Ju.UseNavigateStable), h = O.useRef(!1);
  return yE(() => {
    h.current = !0;
  }), O.useCallback(function(N, C) {
    C === void 0 && (C = {}), Ma(h.current, hE), h.current && (typeof N == "number" ? c.navigate(N) : c.navigate(N, Xu({
      fromRouteId: m
    }, C)));
  }, [c, m]);
}
const tE = {};
function bE(c, m, h) {
  !m && !tE[c] && (tE[c] = !0, Ma(!1, h));
}
const nE = {};
function _1(c, m) {
  nE[m] || (nE[m] = !0, console.warn(m));
}
const aE = (c, m, h) => _1(c, "⚠️ React Router Future Flag Warning: " + m + ". " + ("You can use the `" + c + "` future flag to opt-in early. ") + ("For more information, see " + h + "."));
function O1(c, m) {
  (c == null ? void 0 : c.v7_startTransition) === void 0 && aE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (c == null ? void 0 : c.v7_relativeSplatPath) === void 0 && aE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function L1(c) {
  let {
    to: m,
    replace: h,
    state: b,
    relative: N
  } = c;
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: C,
    static: f
  } = O.useContext(fa);
  Ma(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: _
  } = O.useContext(Aa), {
    pathname: R
  } = Qi(), D = kv(), M = Mv(m, Vv(_, C.v7_relativeSplatPath), R, N === "path"), x = JSON.stringify(M);
  return O.useEffect(() => D(JSON.parse(x), {
    replace: h,
    state: b,
    relative: N
  }), [D, x, N, h, b]), null;
}
function er(c) {
  vt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function V1(c) {
  let {
    basename: m = "/",
    children: h = null,
    location: b,
    navigationType: N = oi.Pop,
    navigator: C,
    static: f = !1,
    future: _
  } = c;
  to() && vt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = m.replace(/^\/*/, "/"), D = O.useMemo(() => ({
    basename: R,
    navigator: C,
    static: f,
    future: Xu({
      v7_relativeSplatPath: !1
    }, _)
  }), [R, _, C, f]);
  typeof b == "string" && (b = eo(b));
  let {
    pathname: M = "/",
    search: x = "",
    hash: z = "",
    state: B = null,
    key: W = "default"
  } = b, fe = O.useMemo(() => {
    let X = ui(M, R);
    return X == null ? null : {
      location: {
        pathname: X,
        search: x,
        hash: z,
        state: B,
        key: W
      },
      navigationType: N
    };
  }, [R, M, x, z, B, W, N]);
  return Ma(fe != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + M + x + z + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), fe == null ? null : /* @__PURE__ */ O.createElement(fa.Provider, {
    value: D
  }, /* @__PURE__ */ O.createElement(es.Provider, {
    children: h,
    value: fe
  }));
}
function M1(c) {
  let {
    children: m,
    location: h
  } = c;
  return y1(Lv(m), h);
}
new Promise(() => {
});
function Lv(c, m) {
  m === void 0 && (m = []);
  let h = [];
  return O.Children.forEach(c, (b, N) => {
    if (!/* @__PURE__ */ O.isValidElement(b))
      return;
    let C = [...m, N];
    if (b.type === O.Fragment) {
      h.push.apply(h, Lv(b.props.children, C));
      return;
    }
    b.type !== er && vt(!1, "[" + (typeof b.type == "string" ? b.type : b.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !b.props.index || !b.props.children || vt(!1, "An index route cannot have child routes.");
    let f = {
      id: b.props.id || C.join("-"),
      caseSensitive: b.props.caseSensitive,
      element: b.props.element,
      Component: b.props.Component,
      index: b.props.index,
      path: b.props.path,
      loader: b.props.loader,
      action: b.props.action,
      errorElement: b.props.errorElement,
      ErrorBoundary: b.props.ErrorBoundary,
      hasErrorBoundary: b.props.ErrorBoundary != null || b.props.errorElement != null,
      shouldRevalidate: b.props.shouldRevalidate,
      handle: b.props.handle,
      lazy: b.props.lazy
    };
    b.props.children && (f.children = Lv(b.props.children, C)), h.push(f);
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
      for (var b in h)
        Object.prototype.hasOwnProperty.call(h, b) && (c[b] = h[b]);
    }
    return c;
  }, Zl.apply(this, arguments);
}
function Hv(c, m) {
  if (c == null) return {};
  var h = {}, b = Object.keys(c), N, C;
  for (C = 0; C < b.length; C++)
    N = b[C], !(m.indexOf(N) >= 0) && (h[N] = c[N]);
  return h;
}
const mf = "get", vf = "application/x-www-form-urlencoded";
function gf(c) {
  return c != null && typeof c.tagName == "string";
}
function A1(c) {
  return gf(c) && c.tagName.toLowerCase() === "button";
}
function U1(c) {
  return gf(c) && c.tagName.toLowerCase() === "form";
}
function k1(c) {
  return gf(c) && c.tagName.toLowerCase() === "input";
}
function z1(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function F1(c, m) {
  return c.button === 0 && // Ignore everything but left clicks
  (!m || m === "_self") && // Let browser handle "target=_blank" etc.
  !z1(c);
}
let pf = null;
function H1() {
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
const B1 = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function jv(c) {
  return c != null && !B1.has(c) ? (Ma(!1, '"' + c + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : c;
}
function P1(c, m) {
  let h, b, N, C, f;
  if (U1(c)) {
    let _ = c.getAttribute("action");
    b = _ ? ui(_, m) : null, h = c.getAttribute("method") || mf, N = jv(c.getAttribute("enctype")) || vf, C = new FormData(c);
  } else if (A1(c) || k1(c) && (c.type === "submit" || c.type === "image")) {
    let _ = c.form;
    if (_ == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = c.getAttribute("formaction") || _.getAttribute("action");
    if (b = R ? ui(R, m) : null, h = c.getAttribute("formmethod") || _.getAttribute("method") || mf, N = jv(c.getAttribute("formenctype")) || jv(_.getAttribute("enctype")) || vf, C = new FormData(_, c), !H1()) {
      let {
        name: D,
        type: M,
        value: x
      } = c;
      if (M === "image") {
        let z = D ? D + "." : "";
        C.append(z + "x", "0"), C.append(z + "y", "0");
      } else D && C.append(D, x);
    }
  } else {
    if (gf(c))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    h = mf, b = null, N = vf, f = c;
  }
  return C && N === "text/plain" && (f = C, C = void 0), {
    action: b,
    method: h.toLowerCase(),
    encType: N,
    formData: C,
    body: f
  };
}
const $1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Y1 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], I1 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], q1 = "6";
try {
  window.__reactRouterVersion = q1;
} catch {
}
const NE = /* @__PURE__ */ O.createContext({
  isTransitioning: !1
});
NE.displayName = "ViewTransition";
const G1 = /* @__PURE__ */ O.createContext(/* @__PURE__ */ new Map());
G1.displayName = "Fetchers";
const W1 = "startTransition", rE = Fw[W1];
function Q1(c) {
  let {
    basename: m,
    children: h,
    future: b,
    window: N
  } = c, C = O.useRef();
  C.current == null && (C.current = Pw({
    window: N,
    v5Compat: !0
  }));
  let f = C.current, [_, R] = O.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: D
  } = b || {}, M = O.useCallback((x) => {
    D && rE ? rE(() => R(x)) : R(x);
  }, [R, D]);
  return O.useLayoutEffect(() => f.listen(M), [f, M]), O.useEffect(() => O1(b), [b]), /* @__PURE__ */ O.createElement(V1, {
    basename: m,
    children: h,
    location: _.location,
    navigationType: _.action,
    navigator: f,
    future: b
  });
}
const K1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", X1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, wr = /* @__PURE__ */ O.forwardRef(function(m, h) {
  let {
    onClick: b,
    relative: N,
    reloadDocument: C,
    replace: f,
    state: _,
    target: R,
    to: D,
    preventScrollReset: M,
    viewTransition: x
  } = m, z = Hv(m, $1), {
    basename: B
  } = O.useContext(fa), W, fe = !1;
  if (typeof D == "string" && X1.test(D) && (W = D, K1))
    try {
      let q = new URL(window.location.href), ie = D.startsWith("//") ? new URL(q.protocol + D) : new URL(D), H = ui(ie.pathname, B);
      ie.origin === q.origin && H != null ? D = H + ie.search + ie.hash : fe = !0;
    } catch {
      Ma(!1, '<Link to="' + D + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let X = m1(D, {
    relative: N
  }), pe = t_(D, {
    replace: f,
    state: _,
    target: R,
    preventScrollReset: M,
    relative: N,
    viewTransition: x
  });
  function P(q) {
    b && b(q), q.defaultPrevented || pe(q);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ O.createElement("a", Zl({}, z, {
      href: W || X,
      onClick: fe || C ? b : P,
      ref: h,
      target: R
    }))
  );
});
wr.displayName = "Link";
const J1 = /* @__PURE__ */ O.forwardRef(function(m, h) {
  let {
    "aria-current": b = "page",
    caseSensitive: N = !1,
    className: C = "",
    end: f = !1,
    style: _,
    to: R,
    viewTransition: D,
    children: M
  } = m, x = Hv(m, Y1), z = ts(R, {
    relative: x.relative
  }), B = Qi(), W = O.useContext(Av), {
    navigator: fe,
    basename: X
  } = O.useContext(fa), pe = W != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  o_(z) && D === !0, P = fe.encodeLocation ? fe.encodeLocation(z).pathname : z.pathname, q = B.pathname, ie = W && W.navigation && W.navigation.location ? W.navigation.location.pathname : null;
  N || (q = q.toLowerCase(), ie = ie ? ie.toLowerCase() : null, P = P.toLowerCase()), ie && X && (ie = ui(ie, X) || ie);
  const H = P !== "/" && P.endsWith("/") ? P.length - 1 : P.length;
  let le = q === P || !f && q.startsWith(P) && q.charAt(H) === "/", se = ie != null && (ie === P || !f && ie.startsWith(P) && ie.charAt(P.length) === "/"), $e = {
    isActive: le,
    isPending: se,
    isTransitioning: pe
  }, K = le ? b : void 0, je;
  typeof C == "function" ? je = C($e) : je = [C, le ? "active" : null, se ? "pending" : null, pe ? "transitioning" : null].filter(Boolean).join(" ");
  let _e = typeof _ == "function" ? _($e) : _;
  return /* @__PURE__ */ O.createElement(wr, Zl({}, x, {
    "aria-current": K,
    className: je,
    ref: h,
    style: _e,
    to: R,
    viewTransition: D
  }), typeof M == "function" ? M($e) : M);
});
J1.displayName = "NavLink";
const Z1 = /* @__PURE__ */ O.forwardRef((c, m) => {
  let {
    fetcherKey: h,
    navigate: b,
    reloadDocument: N,
    replace: C,
    state: f,
    method: _ = mf,
    action: R,
    onSubmit: D,
    relative: M,
    preventScrollReset: x,
    viewTransition: z
  } = c, B = Hv(c, I1), W = i_(), fe = l_(R, {
    relative: M
  }), X = _.toLowerCase() === "get" ? "get" : "post", pe = (P) => {
    if (D && D(P), P.defaultPrevented) return;
    P.preventDefault();
    let q = P.nativeEvent.submitter, ie = (q == null ? void 0 : q.getAttribute("formmethod")) || _;
    W(q || P.currentTarget, {
      fetcherKey: h,
      method: ie,
      navigate: b,
      replace: C,
      state: f,
      relative: M,
      preventScrollReset: x,
      viewTransition: z
    });
  };
  return /* @__PURE__ */ O.createElement("form", Zl({
    ref: m,
    method: X,
    action: fe,
    onSubmit: N ? D : pe
  }, B));
});
Z1.displayName = "Form";
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
  let m = O.useContext(Zu);
  return m || vt(!1, e_(c)), m;
}
function t_(c, m) {
  let {
    target: h,
    replace: b,
    state: N,
    preventScrollReset: C,
    relative: f,
    viewTransition: _
  } = m === void 0 ? {} : m, R = kv(), D = Qi(), M = ts(c, {
    relative: f
  });
  return O.useCallback((x) => {
    if (F1(x, h)) {
      x.preventDefault();
      let z = b !== void 0 ? b : Ku(D) === Ku(M);
      R(c, {
        replace: z,
        state: N,
        preventScrollReset: C,
        relative: f,
        viewTransition: _
      });
    }
  }, [D, R, M, b, N, h, c, C, f, _]);
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
  } = O.useContext(fa), h = T1();
  return O.useCallback(function(b, N) {
    N === void 0 && (N = {}), n_();
    let {
      action: C,
      method: f,
      encType: _,
      formData: R,
      body: D
    } = P1(b, m);
    if (N.navigate === !1) {
      let M = N.fetcherKey || r_();
      c.fetch(M, h, N.action || C, {
        preventScrollReset: N.preventScrollReset,
        formData: R,
        body: D,
        formMethod: N.method || f,
        formEncType: N.encType || _,
        flushSync: N.flushSync
      });
    } else
      c.navigate(N.action || C, {
        preventScrollReset: N.preventScrollReset,
        formData: R,
        body: D,
        formMethod: N.method || f,
        formEncType: N.encType || _,
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
    basename: b
  } = O.useContext(fa), N = O.useContext(Aa);
  N || vt(!1, "useFormAction must be used inside a RouteContext");
  let [C] = N.matches.slice(-1), f = Zl({}, ts(c || ".", {
    relative: h
  })), _ = Qi();
  if (c == null) {
    f.search = _.search;
    let R = new URLSearchParams(f.search), D = R.getAll("index");
    if (D.some((x) => x === "")) {
      R.delete("index"), D.filter((z) => z).forEach((z) => R.append("index", z));
      let x = R.toString();
      f.search = x ? "?" + x : "";
    }
  }
  return (!c || c === ".") && C.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), b !== "/" && (f.pathname = f.pathname === "/" ? b : Or([b, f.pathname])), Ku(f);
}
function o_(c, m) {
  m === void 0 && (m = {});
  let h = O.useContext(NE);
  h == null && vt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: b
  } = EE(yf.useViewTransitionState), N = ts(c, {
    relative: m.relative
  });
  if (!h.isTransitioning)
    return !1;
  let C = ui(h.currentLocation.pathname, b) || h.currentLocation.pathname, f = ui(h.nextLocation.pathname, b) || h.nextLocation.pathname;
  return Ov(N.pathname, f) != null || Ov(N.pathname, C) != null;
}
function u_() {
  const [c, m] = O.useState(null), [h, b] = O.useState(""), [N, C] = O.useState(""), [f, _] = O.useState(!0), [R, D] = O.useState(""), [M, x] = O.useState(""), [z, B] = O.useState(!1), [W, fe] = O.useState(!1);
  O.useEffect(() => {
    var q, ie, H, le, se, $e;
    m({
      apiKey: (q = window.__FIREBASE__) == null ? void 0 : q.apiKey,
      authDomain: (ie = window.__FIREBASE__) == null ? void 0 : ie.authDomain,
      projectId: (H = window.__FIREBASE__) == null ? void 0 : H.projectId,
      appId: (le = window.__FIREBASE__) == null ? void 0 : le.appId,
      messagingSenderId: (se = window.__FIREBASE__) == null ? void 0 : se.messagingSenderId,
      measurementId: ($e = window.__FIREBASE__) == null ? void 0 : $e.measurementId
    });
  }, []);
  function X(q) {
    const ie = (q == null ? void 0 : q.code) || "", H = (q == null ? void 0 : q.message) || "";
    return ie.includes("invalid-email") ? "Please enter a valid email address." : ie.includes("user-not-found") ? "No account found with that email." : ie.includes("wrong-password") || ie.includes("invalid-credential") || H.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : ie.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : ie.includes("network-request-failed") ? "Network error. Check your connection and try again." : H || "Something went wrong.";
  }
  async function pe(q) {
    q.preventDefault(), D(""), x(""), B(!0);
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const ie = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), H = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: le, setPersistence: se, browserLocalPersistence: $e, browserSessionPersistence: K, signInWithEmailAndPassword: je } = H, _e = le();
      await se(_e, f ? $e : K);
      const be = await (await je(_e, h.trim(), N)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: be }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 600);
    } catch (ie) {
      D(X(ie));
    } finally {
      B(!1);
    }
  }
  async function P() {
    D(""), x("");
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: ie, sendPasswordResetEmail: H } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), le = ie();
      await H(le, h.trim()), x("If an account exists for that email, a reset link has been sent.");
    } catch (q) {
      D(X(q));
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
      R && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 79,
        columnNumber: 19
      }, this),
      M && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: M }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: pe, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: h, onChange: (q) => b(q.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: W ? "text" : "password", value: N, onChange: (q) => C(q.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 87,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": W ? "Hide password" : "Show password", onClick: () => fe((q) => !q), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: f, onChange: (q) => _(q.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("button", { className: "link-button", type: "button", onClick: P, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 93,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: z, type: "submit", children: z ? "Signing in…" : "Sign in" }, void 0, !1, {
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
  const [c, m] = O.useState(null), [h, b] = O.useState(""), [N, C] = O.useState(""), [f, _] = O.useState(""), [R, D] = O.useState(""), [M, x] = O.useState(""), [z, B] = O.useState(""), [W, fe] = O.useState(""), [X, pe] = O.useState(!1), [P, q] = O.useState(!1);
  O.useEffect(() => {
    var le, se, $e, K, je, _e;
    m({
      apiKey: (le = window.__FIREBASE__) == null ? void 0 : le.apiKey,
      authDomain: (se = window.__FIREBASE__) == null ? void 0 : se.authDomain,
      projectId: ($e = window.__FIREBASE__) == null ? void 0 : $e.projectId,
      appId: (K = window.__FIREBASE__) == null ? void 0 : K.appId,
      messagingSenderId: (je = window.__FIREBASE__) == null ? void 0 : je.messagingSenderId,
      measurementId: (_e = window.__FIREBASE__) == null ? void 0 : _e.measurementId
    });
  }, []);
  function ie(le) {
    const se = (le == null ? void 0 : le.code) || "";
    return se.includes("email-already-in-use") ? "An account with this email already exists." : se.includes("weak-password") ? "Password should be at least 6 characters." : se.includes("invalid-email") ? "Please enter a valid email address." : se.includes("network-request-failed") ? "Network error. Check your connection and try again." : (le == null ? void 0 : le.message) || "Something went wrong.";
  }
  async function H(le) {
    le.preventDefault(), B(""), fe(""), pe(!0);
    try {
      if (R !== M) throw new Error("Passwords do not match");
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const se = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: $e, createUserWithEmailAndPassword: K } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), je = $e(), Ae = await (await K(je, f.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Ae, profile: { fullName: h, contactNumber: N } }) })).ok) throw new Error("Session creation failed");
      fe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (se) {
      B(ie(se));
    } finally {
      pe(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ d.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    z && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: z }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 56,
      columnNumber: 17
    }, this),
    W && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: W }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 57,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: H, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: h, onChange: (le) => b(le.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: N, onChange: (le) => C(le.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (le) => _(le.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: P ? "text" : "password", value: R, onChange: (le) => D(le.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": P ? "Hide password" : "Show password", onClick: () => q((le) => !le), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: M, onChange: (le) => x(le.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button", disabled: X, type: "submit", children: X ? "Creating account…" : "Create account" }, void 0, !1, {
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
function _r({ children: c }) {
  const m = kv();
  return O.useEffect(() => {
    const h = document.getElementById("notifBtn"), b = document.getElementById("notifMenu"), N = document.getElementById("profileBtn"), C = document.getElementById("profileMenu");
    function f(x, z, B) {
      x && (x.classList.toggle("hidden", !B), x.setAttribute("aria-hidden", B ? "false" : "true"), z && z.setAttribute("aria-expanded", B ? "true" : "false"));
    }
    function _() {
      f(b, h, !1), f(C, N, !1);
    }
    function R(x) {
      const z = (B) => B && (B === x.target || B.contains(x.target));
      !z(b) && !z(h) && !z(C) && !z(N) && _();
    }
    function D(x) {
      x.key === "Escape" && _();
    }
    function M(x) {
      x && x.querySelectorAll(".dropdown-item").forEach((z) => {
        z.addEventListener("click", () => _());
      });
    }
    return h && b && (h.addEventListener("click", (x) => {
      x.stopPropagation(), f(C, N, !1), f(b, h, b.classList.contains("hidden"));
    }), M(b)), N && C && (N.addEventListener("click", (x) => {
      x.stopPropagation(), f(b, h, !1), f(C, N, C.classList.contains("hidden"));
    }), M(C)), document.addEventListener("click", R), document.addEventListener("keydown", D), () => {
      document.removeEventListener("click", R), document.removeEventListener("keydown", D);
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
        /* @__PURE__ */ d.jsxDEV(wr, { to: "/dashboard", onClick: (h) => {
          h.preventDefault(), m("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 59,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(wr, { to: "/orders", onClick: (h) => {
          h.preventDefault(), m("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(wr, { to: "/riders", onClick: (h) => {
          h.preventDefault(), m("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(wr, { to: "/customers", onClick: (h) => {
          h.preventDefault(), m("/customers");
        }, children: "Customers" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(wr, { to: "/reports", onClick: (h) => {
          h.preventDefault(), m("/reports");
        }, children: "Reports" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 63,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 64,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ d.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ d.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("defs", { children: /* @__PURE__ */ d.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 70,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 71,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 72,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 69,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 68,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ d.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 75,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 67,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 66,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 79,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 80,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 78,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 65,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ d.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ d.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ d.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 86,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ d.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 86,
              columnNumber: 203
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 86,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 85,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(wr, { className: "dropdown-item", to: "/riders", onClick: (h) => {
              h.preventDefault(), m("/riders");
            }, children: "Riders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 90,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(wr, { className: "dropdown-item", to: "/orders", onClick: (h) => {
              h.preventDefault(), m("/orders");
            }, children: "Orders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 91,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ d.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 92,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 92,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 84,
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
      lineNumber: 98,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 99,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}
function c_() {
  const [c, m] = O.useState([]), [h, b] = O.useState(""), [N, C] = O.useState("all"), [f, _] = O.useState("all"), [R, D] = O.useState("all"), [M, x] = O.useState(!0), [z, B] = O.useState(""), [W, fe] = O.useState(1), [X, pe] = O.useState(20), [P, q] = O.useState({ total: 0, page: 1, limit: 20, pages: 1 });
  O.useEffect(() => {
    let H = !0;
    return (async () => {
      var le, se, $e, K;
      x(!0), B("");
      try {
        const je = new URLSearchParams();
        h && je.set("q", h), R !== "all" && je.set("status", R), N !== "all" && je.set("lastDays", N), je.set("page", String(W)), je.set("limit", String(X));
        const _e = await fetch(`/api/riders?${je.toString()}`, { credentials: "include" });
        if (_e.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!_e.ok) throw new Error("Failed to load riders");
        const Ae = await _e.json();
        H && (m(Array.isArray(Ae.riders) ? Ae.riders : []), q({ total: ((le = Ae.meta) == null ? void 0 : le.total) || 0, page: ((se = Ae.meta) == null ? void 0 : se.page) || 1, limit: (($e = Ae.meta) == null ? void 0 : $e.limit) || X, pages: ((K = Ae.meta) == null ? void 0 : K.pages) || 1 }));
      } catch (je) {
        H && B(je.message || "Failed to load riders");
      } finally {
        H && x(!1);
      }
    })(), () => {
      H = !1;
    };
  }, [h, R, N, W, X]);
  const ie = O.useMemo(() => c.filter((H) => {
    if (h && !H.name.toLowerCase().includes(h.toLowerCase().trim()) || R !== "all" && H.status !== R || f !== "all" && String(H.id) !== String(f)) return !1;
    if (N !== "all") {
      const le = parseInt(H.lastActiveDays, 10) || 9999, se = parseInt(N, 10);
      if (!(le <= se)) return !1;
    }
    return !0;
  }), [c, h, R, f, N]);
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Rider Commissions" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 59,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "View and manage rider commissions based on performance and distance traveled." }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 60,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 58,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (H) => {
          b(H.target.value), fe(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 66,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: N, onChange: (H) => {
          C(H.target.value), fe(1);
        }, children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Date Range" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 70,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "7", children: "Last 7 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 71,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "30", children: "Last 30 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 72,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 69,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: f, onChange: (H) => _(H.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          c.map((H) => /* @__PURE__ */ d.jsxDEV("option", { value: H.id, children: H.name }, H.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 76,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: R, onChange: (H) => {
          D(H.target.value), fe(1);
        }, children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Status" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "Active", children: "Active" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 80,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "Inactive", children: "Inactive" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 81,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 68,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: X, onChange: (H) => {
        pe(parseInt(H.target.value, 10)), fe(1);
      }, children: [10, 20, 50, 100].map((H) => /* @__PURE__ */ d.jsxDEV("option", { value: H, children: [
        H,
        "/page"
      ] }, H, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 85,
        columnNumber: 39
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 84,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Total KM Traveled" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Delivery Performance" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Commission Earned" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 96,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 92,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 91,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        M && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 101,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 101,
          columnNumber: 17
        }, this),
        !M && z && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "auth-error", children: z }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 104,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 104,
          columnNumber: 17
        }, this),
        !M && !z && ie.map((H) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": H.id, "data-status": H.status, "data-last-days": H.lastActiveDays, children: [
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { href: `/riders/${H.id}`, children: H.name }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 108,
            columnNumber: 47
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 108,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
            H.totalKm,
            " ",
            /* @__PURE__ */ d.jsxDEV("span", { className: "rc-km-unit", children: "km" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 109,
              columnNumber: 57
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 109,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-progress", children: [
            /* @__PURE__ */ d.jsxDEV("progress", { max: "100", value: H.performance, className: "rc-progress-bar" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 112,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("span", { className: "rc-progress-value", children: H.performance }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 113,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 111,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 110,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
            "$",
            H.commissionUsd
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 116,
            columnNumber: 19
          }, this)
        ] }, H.id, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 107,
          columnNumber: 17
        }, this)),
        !M && !z && ie.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "No riders found." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 120,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 120,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 99,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 90,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 89,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: P.page <= 1 || M, onClick: () => fe((H) => Math.max(1, H - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 128,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        P.page,
        " of ",
        P.pages,
        " • ",
        P.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 129,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: P.page >= P.pages || M, onClick: () => fe((H) => Math.min(P.pages, H + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 130,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 127,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 126,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 57,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
function f_() {
  const { id: c } = h1(), [m, h] = O.useState(null), [b, N] = O.useState(!0), [C, f] = O.useState("");
  if (O.useEffect(() => {
    let M = !0;
    return (async () => {
      N(!0), f("");
      try {
        const x = await fetch(`/api/riders/${c}`, { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load rider");
        const z = await x.json();
        M && h(z);
      } catch (x) {
        M && f(x.message || "Failed to load rider");
      } finally {
        M && N(!1);
      }
    })(), () => {
      M = !1;
    };
  }, [c]), b)
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
  if (C)
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: C }, void 0, !1, {
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
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  const { rider: _, metrics: R, history: D } = m;
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
        /* @__PURE__ */ d.jsxDEV("h3", { className: "rp-name", children: _.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          _.id
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
        /* @__PURE__ */ d.jsxDEV("strong", { children: R.totalDeliveries }, void 0, !1, {
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
          R.avgDeliveryMins,
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
          R.onTimeRate,
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
          R.totalKm,
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
      /* @__PURE__ */ d.jsxDEV("tbody", { children: (D || []).map((M, x) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: M.date }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: M.deliveries }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 80,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: [
          M.avgTime,
          " mins"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 81,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
          M.distanceKm,
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 82,
          columnNumber: 19
        }, this)
      ] }, x, !0, {
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
function d_(c) {
  return (Array.isArray(c.tags) ? c.tags : typeof c.tags == "string" ? c.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : c.fulfillment_status === "fulfilled" ? "delivered" : c.fulfillment_status === "partial" ? "in-transit" : "new";
}
function p_() {
  const [c, m] = O.useState([]), [h, b] = O.useState(""), [N, C] = O.useState("all"), [f, _] = O.useState(1), [R, D] = O.useState(20), [M, x] = O.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [z, B] = O.useState(""), [W, fe] = O.useState(""), [X, pe] = O.useState(!0), [P, q] = O.useState(""), [ie, H] = O.useState(""), [le, se] = O.useState(!0);
  O.useEffect(() => {
    let K = !0;
    return (async () => {
      var je, _e, Ae, be;
      pe(!0), q(""), H("");
      try {
        const Ye = new URLSearchParams();
        h && Ye.set("q", h), N && N !== "all" && Ye.set("status", N), z && Ye.set("created_at_min", z), W && Ye.set("created_at_max", W), Ye.set("page", String(f)), Ye.set("limit", String(R));
        const Xe = await fetch(`/api/orders?${Ye.toString()}`, { credentials: "include" });
        if (Xe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Xe.ok) throw new Error("Failed to load orders");
        const Je = await Xe.json();
        K && (m(Array.isArray(Je.orders) ? Je.orders : []), H(Je.shopifyError || ""), se(!!Je.shopifyConfigured), x({ total: ((je = Je.meta) == null ? void 0 : je.total) || 0, page: ((_e = Je.meta) == null ? void 0 : _e.page) || 1, limit: ((Ae = Je.meta) == null ? void 0 : Ae.limit) || R, pages: ((be = Je.meta) == null ? void 0 : be.pages) || 1 }));
      } catch (Ye) {
        K && q(Ye.message || "Failed to load orders");
      } finally {
        K && pe(!1);
      }
    })(), () => {
      K = !1;
    };
  }, [h, N, f, R, z, W]);
  const $e = O.useMemo(() => c, [c]);
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (K) => {
          b(K.target.value), _(1);
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
        ["all", "new", "assigned", "in-transit", "delivered"].map((K) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${N === K ? " active" : ""}`, onClick: () => {
          C(K), _(1);
        }, "data-filter": K, children: K === "all" ? "All" : K.replace("-", " ") }, K, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 72,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-select rc-chip", type: "date", value: z, onChange: (K) => {
          B(K.target.value), _(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-select rc-chip", type: "date", value: W, onChange: (K) => {
          fe(K.target.value), _(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: R, onChange: (K) => {
          D(parseInt(K.target.value, 10)), _(1);
        }, children: [10, 20, 50, 100].map((K) => /* @__PURE__ */ d.jsxDEV("option", { value: K, children: [
          K,
          "/page"
        ] }, K, !0, {
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
    !le && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 85,
      columnNumber: 11
    }, this),
    ie && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ie }, void 0, !1, {
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
        X && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 103,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 103,
          columnNumber: 17
        }, this),
        !X && P && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: P }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 106,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 106,
          columnNumber: 17
        }, this),
        !X && !P && $e.map((K, je) => {
          var we, jt;
          const _e = d_(K), Ae = ((we = K.customer) == null ? void 0 : we.first_name) || "", be = ((jt = K.customer) == null ? void 0 : jt.last_name) || "", Ye = K.shipping_address && `${K.shipping_address.address1 || ""} ${K.shipping_address.city || ""}${K.shipping_address.province ? `, ${K.shipping_address.province}` : ""}${K.shipping_address.country ? `, ${K.shipping_address.country}` : ""}` || "-", Xe = _e === "new" ? "Assign" : _e === "assigned" ? "View" : _e === "in-transit" ? "Track" : "Details", Je = K.name || K.order_number || K.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": _e, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              Je
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              Ae,
              " ",
              be
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: Ye }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 119,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${_e}`, children: _e.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 120,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 120,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: K.created_at ? new Date(K.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 121,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ d.jsxDEV("a", { href: "#", className: "order-action", "data-action": Xe.toLowerCase(), children: Xe }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 122,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 122,
              columnNumber: 21
            }, this)
          ] }, Je || je, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 116,
            columnNumber: 19
          }, this);
        }),
        !X && !P && $e.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || X, onClick: () => _((K) => Math.max(1, K - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 134,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        M.page,
        " of ",
        M.pages,
        " • ",
        M.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 135,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || X, onClick: () => _((K) => Math.min(M.pages, K + 1)), children: "Next" }, void 0, !1, {
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
function m_() {
  const [c, m] = O.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, b] = O.useState([]), [N, C] = O.useState(!1), [f, _] = O.useState(!0), [R, D] = O.useState("");
  return O.useEffect(() => {
    let M = !0;
    return (async () => {
      _(!0), D("");
      try {
        const x = await fetch("/api/reports", { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load reports");
        const z = await x.json();
        M && (m(z.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), b(Array.isArray(z.deliveries) ? z.deliveries : []));
      } catch (x) {
        M && D(x.message || "Failed to load reports");
      } finally {
        M && _(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []), /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: N, onChange: (M) => C(M.target.checked) }, void 0, !1, {
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
          !f && !R && h.map((M, x) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              M.orderNumber || M.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: M.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: M.expectedMinutes != null ? `${M.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: M.durationMins != null ? `${M.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: M.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, M.orderId || x, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !f && !R && h.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
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
          R && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: R }, void 0, !1, {
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
function v_() {
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Customers" }, void 0, !1, {
        fileName: "/app/code/client/pages/Customers.jsx",
        lineNumber: 8,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage your customer directory." }, void 0, !1, {
        fileName: "/app/code/client/pages/Customers.jsx",
        lineNumber: 9,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Customers.jsx",
      lineNumber: 7,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Customer management will appear here once connected to your data source." }, void 0, !1, {
      fileName: "/app/code/client/pages/Customers.jsx",
      lineNumber: 11,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Customers.jsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Customers.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
function h_() {
  const [c, m] = O.useState([]), [h, b] = O.useState(!0), [N, C] = O.useState("");
  O.useEffect(() => {
    let _ = !0;
    return (async () => {
      b(!0), C("");
      try {
        const R = new URLSearchParams();
        R.set("limit", "25");
        const D = await fetch(`/api/orders?${R.toString()}`, { credentials: "include" });
        if (D.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!D.ok) throw new Error("Failed to load orders");
        const M = await D.json();
        _ && m(Array.isArray(M.orders) ? M.orders : []);
      } catch (R) {
        _ && C(R.message || "Failed to load orders");
      } finally {
        _ && b(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, []);
  function f(_) {
    return (Array.isArray(_.tags) ? _.tags : typeof _.tags == "string" ? _.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : _.fulfillment_status === "fulfilled" ? "delivered" : _.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 41,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 42,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: h ? "…" : c.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 46,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 47,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 45,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 49,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 39,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 57,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 58,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 59,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 60,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 61,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 62,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 63,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 56,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 55,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        h && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 67,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 67,
          columnNumber: 28
        }, this),
        !h && N && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: N }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 68,
          columnNumber: 42
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 68,
          columnNumber: 38
        }, this),
        !h && !N && c.map((_, R) => {
          var pe, P;
          const D = f(_), M = ((pe = _.customer) == null ? void 0 : pe.first_name) || "", x = ((P = _.customer) == null ? void 0 : P.last_name) || "", z = _.shipping_address && `${_.shipping_address.address1 || ""} ${_.shipping_address.city || ""}${_.shipping_address.province ? `, ${_.shipping_address.province}` : ""}${_.shipping_address.country ? `, ${_.shipping_address.country}` : ""}` || "-", B = _.name || _.order_number || _.id || R, W = _.created_at ? new Date(_.created_at) : null, fe = W ? W.toLocaleDateString() : "-", X = W ? W.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": D, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: [
              "#",
              B
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 80,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: [
              M,
              " ",
              x
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 81,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: z }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 82,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${D}`, children: D.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 83,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 83,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: fe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 84,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: X }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 85,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("a", { className: "order-action", href: "/orders", children: "Manage" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 86,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 86,
              columnNumber: 21
            }, this)
          ] }, B, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 79,
            columnNumber: 19
          }, this);
        }),
        !h && !N && c.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 66
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 62
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 66,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 54,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 53,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 38,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}
function y_() {
  return /* @__PURE__ */ d.jsxDEV(Q1, { children: /* @__PURE__ */ d.jsxDEV(M1, { children: [
    /* @__PURE__ */ d.jsxDEV(er, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(u_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(s_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(c_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(f_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(p_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(m_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/customers", element: /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(h_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "*", element: /* @__PURE__ */ d.jsxDEV(L1, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function lE() {
  const c = document.getElementById("react-root");
  if (!c) return;
  dE(c).render(/* @__PURE__ */ d.jsxDEV(y_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", lE) : lE();
