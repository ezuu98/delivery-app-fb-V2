function U1(s, m) {
  for (var h = 0; h < m.length; h++) {
    const g = m[h];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const b in g)
        if (b !== "default" && !(b in s)) {
          const R = Object.getOwnPropertyDescriptor(g, b);
          R && Object.defineProperty(s, b, R.get ? R : {
            enumerable: !0,
            get: () => g[b]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
function F1(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var uE = { exports: {} }, _v = {}, sE = { exports: {} }, hf = { exports: {} };
hf.exports;
(function(s, m) {
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
    var h = "18.3.1", g = Symbol.for("react.element"), b = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), X = Symbol.iterator, ue = "@@iterator";
    function B(c) {
      if (c === null || typeof c != "object")
        return null;
      var y = X && c[X] || c[ue];
      return typeof y == "function" ? y : null;
    }
    var G = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, Q = {
      transition: null
    }, Y = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, Z = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, P = {}, _e = null;
    function Se(c) {
      _e = c;
    }
    P.setExtraStackFrame = function(c) {
      _e = c;
    }, P.getCurrentStack = null, P.getStackAddendum = function() {
      var c = "";
      _e && (c += _e);
      var y = P.getCurrentStack;
      return y && (c += y() || ""), c;
    };
    var Me = !1, Oe = !1, Ae = !1, pe = !1, Ge = !1, rt = {
      ReactCurrentDispatcher: G,
      ReactCurrentBatchConfig: Q,
      ReactCurrentOwner: Z
    };
    rt.ReactDebugCurrentFrame = P, rt.ReactCurrentActQueue = Y;
    function ee(c) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        Je("warn", c, L);
      }
    }
    function Ne(c) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        Je("error", c, L);
      }
    }
    function Je(c, y, L) {
      {
        var k = rt.ReactDebugCurrentFrame, K = k.getStackAddendum();
        K !== "" && (y += "%s", L = L.concat([K]));
        var be = L.map(function(ce) {
          return String(ce);
        });
        be.unshift("Warning: " + y), Function.prototype.apply.call(console[c], console, be);
      }
    }
    var jt = {};
    function Yt(c, y) {
      {
        var L = c.constructor, k = L && (L.displayName || L.name) || "ReactClass", K = k + "." + y;
        if (jt[K])
          return;
        Ne("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", y, k), jt[K] = !0;
      }
    }
    var vt = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(c) {
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
      enqueueForceUpdate: function(c, y, L) {
        Yt(c, "forceUpdate");
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
      enqueueReplaceState: function(c, y, L, k) {
        Yt(c, "replaceState");
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
      enqueueSetState: function(c, y, L, k) {
        Yt(c, "setState");
      }
    }, ct = Object.assign, bt = {};
    Object.freeze(bt);
    function It(c, y, L) {
      this.props = c, this.context = y, this.refs = bt, this.updater = L || vt;
    }
    It.prototype.isReactComponent = {}, It.prototype.setState = function(c, y) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, c, y, "setState");
    }, It.prototype.forceUpdate = function(c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    };
    {
      var na = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Ua = function(c, y) {
        Object.defineProperty(It.prototype, c, {
          get: function() {
            ee("%s(...) is deprecated in plain JavaScript React classes. %s", y[0], y[1]);
          }
        });
      };
      for (var en in na)
        na.hasOwnProperty(en) && Ua(en, na[en]);
    }
    function In() {
    }
    In.prototype = It.prototype;
    function tn(c, y, L) {
      this.props = c, this.context = y, this.refs = bt, this.updater = L || vt;
    }
    var nn = tn.prototype = new In();
    nn.constructor = tn, ct(nn, It.prototype), nn.isPureReactComponent = !0;
    function an() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var kn = Array.isArray;
    function qt(c) {
      return kn(c);
    }
    function Rn(c) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, L = y && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return L;
      }
    }
    function Gt(c) {
      try {
        return Wt(c), !1;
      } catch {
        return !0;
      }
    }
    function Wt(c) {
      return "" + c;
    }
    function aa(c) {
      if (Gt(c))
        return Ne("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(c)), Wt(c);
    }
    function tr(c, y, L) {
      var k = c.displayName;
      if (k)
        return k;
      var K = y.displayName || y.name || "";
      return K !== "" ? L + "(" + K + ")" : L;
    }
    function va(c) {
      return c.displayName || "Context";
    }
    function Un(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && Ne("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case R:
          return "Fragment";
        case b:
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
      if (typeof c == "object")
        switch (c.$$typeof) {
          case T:
            var y = c;
            return va(y) + ".Consumer";
          case D:
            var L = c;
            return va(L._context) + ".Provider";
          case _:
            return tr(c, c.render, "ForwardRef");
          case z:
            var k = c.displayName || null;
            return k !== null ? k : Un(c.type) || "Memo";
          case W: {
            var K = c, be = K._payload, ce = K._init;
            try {
              return Un(ce(be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var vn = Object.prototype.hasOwnProperty, rn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Cn, Fa, Vt;
    Vt = {};
    function Dn(c) {
      if (vn.call(c, "ref")) {
        var y = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function Fn(c) {
      if (vn.call(c, "key")) {
        var y = Object.getOwnPropertyDescriptor(c, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function _r(c, y) {
      var L = function() {
        Cn || (Cn = !0, Ne("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(c, "key", {
        get: L,
        configurable: !0
      });
    }
    function nr(c, y) {
      var L = function() {
        Fa || (Fa = !0, Ne("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(c, "ref", {
        get: L,
        configurable: !0
      });
    }
    function te(c) {
      if (typeof c.ref == "string" && Z.current && c.__self && Z.current.stateNode !== c.__self) {
        var y = Un(Z.current.type);
        Vt[y] || (Ne('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y, c.ref), Vt[y] = !0);
      }
    }
    var me = function(c, y, L, k, K, be, ce) {
      var Te = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: c,
        key: y,
        ref: L,
        props: ce,
        // Record the component responsible for creating this element.
        _owner: be
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
        value: k
      }), Object.defineProperty(Te, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: K
      }), Object.freeze && (Object.freeze(Te.props), Object.freeze(Te)), Te;
    };
    function ke(c, y, L) {
      var k, K = {}, be = null, ce = null, Te = null, Be = null;
      if (y != null) {
        Dn(y) && (ce = y.ref, te(y)), Fn(y) && (aa(y.key), be = "" + y.key), Te = y.__self === void 0 ? null : y.__self, Be = y.__source === void 0 ? null : y.__source;
        for (k in y)
          vn.call(y, k) && !rn.hasOwnProperty(k) && (K[k] = y[k]);
      }
      var et = arguments.length - 2;
      if (et === 1)
        K.children = L;
      else if (et > 1) {
        for (var ot = Array(et), ut = 0; ut < et; ut++)
          ot[ut] = arguments[ut + 2];
        Object.freeze && Object.freeze(ot), K.children = ot;
      }
      if (c && c.defaultProps) {
        var Fe = c.defaultProps;
        for (k in Fe)
          K[k] === void 0 && (K[k] = Fe[k]);
      }
      if (be || ce) {
        var yt = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
        be && _r(K, yt), ce && nr(K, yt);
      }
      return me(c, be, ce, Te, Be, Z.current, K);
    }
    function Ze(c, y) {
      var L = me(c.type, y, c.ref, c._self, c._source, c._owner, c.props);
      return L;
    }
    function ft(c, y, L) {
      if (c == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
      var k, K = ct({}, c.props), be = c.key, ce = c.ref, Te = c._self, Be = c._source, et = c._owner;
      if (y != null) {
        Dn(y) && (ce = y.ref, et = Z.current), Fn(y) && (aa(y.key), be = "" + y.key);
        var ot;
        c.type && c.type.defaultProps && (ot = c.type.defaultProps);
        for (k in y)
          vn.call(y, k) && !rn.hasOwnProperty(k) && (y[k] === void 0 && ot !== void 0 ? K[k] = ot[k] : K[k] = y[k]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        K.children = L;
      else if (ut > 1) {
        for (var Fe = Array(ut), yt = 0; yt < ut; yt++)
          Fe[yt] = arguments[yt + 2];
        K.children = Fe;
      }
      return me(c.type, be, ce, Te, Be, et, K);
    }
    function Nt(c) {
      return typeof c == "object" && c !== null && c.$$typeof === g;
    }
    var Et = ".", hn = ":";
    function St(c) {
      var y = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, k = c.replace(y, function(K) {
        return L[K];
      });
      return "$" + k;
    }
    var it = !1, Rt = /\/+/g;
    function ha(c) {
      return c.replace(Rt, "$&/");
    }
    function ya(c, y) {
      return typeof c == "object" && c !== null && c.key != null ? (aa(c.key), St("" + c.key)) : y.toString(36);
    }
    function ra(c, y, L, k, K) {
      var be = typeof c;
      (be === "undefined" || be === "boolean") && (c = null);
      var ce = !1;
      if (c === null)
        ce = !0;
      else
        switch (be) {
          case "string":
          case "number":
            ce = !0;
            break;
          case "object":
            switch (c.$$typeof) {
              case g:
              case b:
                ce = !0;
            }
        }
      if (ce) {
        var Te = c, Be = K(Te), et = k === "" ? Et + ya(Te, 0) : k;
        if (qt(Be)) {
          var ot = "";
          et != null && (ot = ha(et) + "/"), ra(Be, y, ot, "", function(Cf) {
            return Cf;
          });
        } else Be != null && (Nt(Be) && (Be.key && (!Te || Te.key !== Be.key) && aa(Be.key), Be = Ze(
          Be,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Be.key && (!Te || Te.key !== Be.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ha("" + Be.key) + "/"
          ) : "") + et
        )), y.push(Be));
        return 1;
      }
      var ut, Fe, yt = 0, wt = k === "" ? Et : k + hn;
      if (qt(c))
        for (var bi = 0; bi < c.length; bi++)
          ut = c[bi], Fe = wt + ya(ut, bi), yt += ra(ut, y, L, Fe, K);
      else {
        var go = B(c);
        if (typeof go == "function") {
          var lr = c;
          go === lr.entries && (it || ee("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var bo = go.call(lr), No, Rf = 0; !(No = bo.next()).done; )
            ut = No.value, Fe = wt + ya(ut, Rf++), yt += ra(ut, y, L, Fe, K);
        } else if (be === "object") {
          var ps = String(c);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return yt;
    }
    function ar(c, y, L) {
      if (c == null)
        return c;
      var k = [], K = 0;
      return ra(c, k, "", "", function(be) {
        return y.call(L, be, K++);
      }), k;
    }
    function no(c) {
      var y = 0;
      return ar(c, function() {
        y++;
      }), y;
    }
    function si(c, y, L) {
      ar(c, function() {
        y.apply(this, arguments);
      }, L);
    }
    function Ki(c) {
      return ar(c, function(y) {
        return y;
      }) || [];
    }
    function Xi(c) {
      if (!Nt(c))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return c;
    }
    function ci(c) {
      var y = {
        $$typeof: T,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: c,
        _currentValue2: c,
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
        $$typeof: D,
        _context: y
      };
      var L = !1, k = !1, K = !1;
      {
        var be = {
          $$typeof: T,
          _context: y
        };
        Object.defineProperties(be, {
          Provider: {
            get: function() {
              return k || (k = !0, Ne("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), y.Provider;
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
              return L || (L = !0, Ne("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), y.Consumer;
            }
          },
          displayName: {
            get: function() {
              return y.displayName;
            },
            set: function(ce) {
              K || (ee("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ce), K = !0);
            }
          }
        }), y.Consumer = be;
      }
      return y._currentRenderer = null, y._currentRenderer2 = null, y;
    }
    var ga = -1, ia = 0, qn = 1, za = 2;
    function fi(c) {
      if (c._status === ga) {
        var y = c._result, L = y();
        if (L.then(function(be) {
          if (c._status === ia || c._status === ga) {
            var ce = c;
            ce._status = qn, ce._result = be;
          }
        }, function(be) {
          if (c._status === ia || c._status === ga) {
            var ce = c;
            ce._status = za, ce._result = be;
          }
        }), c._status === ga) {
          var k = c;
          k._status = ia, k._result = L;
        }
      }
      if (c._status === qn) {
        var K = c._result;
        return K === void 0 && Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, K), "default" in K || Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, K), K.default;
      } else
        throw c._result;
    }
    function N(c) {
      var y = {
        // We use these fields to store the result.
        _status: ga,
        _result: c
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
            set: function(be) {
              Ne("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), k = be, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return K;
            },
            set: function(be) {
              Ne("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), K = be, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function I(c) {
      c != null && c.$$typeof === z ? Ne("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof c != "function" ? Ne("forwardRef requires a render function but was given %s.", c === null ? "null" : typeof c) : c.length !== 0 && c.length !== 2 && Ne("forwardRef render functions accept exactly two parameters: props and ref. %s", c.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), c != null && (c.defaultProps != null || c.propTypes != null) && Ne("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var y = {
        $$typeof: _,
        render: c
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
            L = k, !c.name && !c.displayName && (c.displayName = k);
          }
        });
      }
      return y;
    }
    var ne;
    ne = Symbol.for("react.module.reference");
    function ve(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === R || c === A || Ge || c === f || c === S || c === M || pe || c === fe || Me || Oe || Ae || typeof c == "object" && c !== null && (c.$$typeof === W || c.$$typeof === z || c.$$typeof === D || c.$$typeof === T || c.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === ne || c.getModuleId !== void 0));
    }
    function He(c, y) {
      ve(c) || Ne("memo: The first argument must be a component. Instead received: %s", c === null ? "null" : typeof c);
      var L = {
        $$typeof: z,
        type: c,
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
            k = K, !c.name && !c.displayName && (c.displayName = K);
          }
        });
      }
      return L;
    }
    function Re() {
      var c = G.current;
      return c === null && Ne(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), c;
    }
    function Le(c) {
      var y = Re();
      if (c._context !== void 0) {
        var L = c._context;
        L.Consumer === c ? Ne("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === c && Ne("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return y.useContext(c);
    }
    function ye(c) {
      var y = Re();
      return y.useState(c);
    }
    function Mt(c, y, L) {
      var k = Re();
      return k.useReducer(c, y, L);
    }
    function dt(c) {
      var y = Re();
      return y.useRef(c);
    }
    function pt(c, y) {
      var L = Re();
      return L.useEffect(c, y);
    }
    function yn(c, y) {
      var L = Re();
      return L.useInsertionEffect(c, y);
    }
    function Ha(c, y) {
      var L = Re();
      return L.useLayoutEffect(c, y);
    }
    function ba(c, y) {
      var L = Re();
      return L.useCallback(c, y);
    }
    function At(c, y) {
      var L = Re();
      return L.useMemo(c, y);
    }
    function di(c, y, L) {
      var k = Re();
      return k.useImperativeHandle(c, y, L);
    }
    function Na(c, y) {
      {
        var L = Re();
        return L.useDebugValue(c, y);
      }
    }
    function Ue() {
      var c = Re();
      return c.useTransition();
    }
    function pi(c) {
      var y = Re();
      return y.useDeferredValue(c);
    }
    function ns() {
      var c = Re();
      return c.useId();
    }
    function as(c, y, L) {
      var k = Re();
      return k.useSyncExternalStore(c, y, L);
    }
    var Or = 0, ao, ro, io, lo, oo, rs, is;
    function Ji() {
    }
    Ji.__reactDisabledLog = !0;
    function uo() {
      {
        if (Or === 0) {
          ao = console.log, ro = console.info, io = console.warn, lo = console.error, oo = console.group, rs = console.groupCollapsed, is = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: Ji,
            writable: !0
          };
          Object.defineProperties(console, {
            info: c,
            log: c,
            warn: c,
            error: c,
            group: c,
            groupCollapsed: c,
            groupEnd: c
          });
        }
        Or++;
      }
    }
    function Ba() {
      {
        if (Or--, Or === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ct({}, c, {
              value: ao
            }),
            info: ct({}, c, {
              value: ro
            }),
            warn: ct({}, c, {
              value: io
            }),
            error: ct({}, c, {
              value: lo
            }),
            group: ct({}, c, {
              value: oo
            }),
            groupCollapsed: ct({}, c, {
              value: rs
            }),
            groupEnd: ct({}, c, {
              value: is
            })
          });
        }
        Or < 0 && Ne("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = rt.ReactCurrentDispatcher, Lr;
    function Zi(c, y, L) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (K) {
            var k = K.stack.trim().match(/\n( *(at )?)/);
            Lr = k && k[1] || "";
          }
        return `
` + Lr + c;
      }
    }
    var vi = !1, el;
    {
      var so = typeof WeakMap == "function" ? WeakMap : Map;
      el = new so();
    }
    function ls(c, y) {
      if (!c || vi)
        return "";
      {
        var L = el.get(c);
        if (L !== void 0)
          return L;
      }
      var k;
      vi = !0;
      var K = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var be;
      be = mi.current, mi.current = null, uo();
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
            } catch (wt) {
              k = wt;
            }
            Reflect.construct(c, [], ce);
          } else {
            try {
              ce.call();
            } catch (wt) {
              k = wt;
            }
            c.call(ce.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (wt) {
            k = wt;
          }
          c();
        }
      } catch (wt) {
        if (wt && k && typeof wt.stack == "string") {
          for (var Te = wt.stack.split(`
`), Be = k.stack.split(`
`), et = Te.length - 1, ot = Be.length - 1; et >= 1 && ot >= 0 && Te[et] !== Be[ot]; )
            ot--;
          for (; et >= 1 && ot >= 0; et--, ot--)
            if (Te[et] !== Be[ot]) {
              if (et !== 1 || ot !== 1)
                do
                  if (et--, ot--, ot < 0 || Te[et] !== Be[ot]) {
                    var ut = `
` + Te[et].replace(" at new ", " at ");
                    return c.displayName && ut.includes("<anonymous>") && (ut = ut.replace("<anonymous>", c.displayName)), typeof c == "function" && el.set(c, ut), ut;
                  }
                while (et >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = be, Ba(), Error.prepareStackTrace = K;
      }
      var Fe = c ? c.displayName || c.name : "", yt = Fe ? Zi(Fe) : "";
      return typeof c == "function" && el.set(c, yt), yt;
    }
    function co(c, y, L) {
      return ls(c, !1);
    }
    function bf(c) {
      var y = c.prototype;
      return !!(y && y.isReactComponent);
    }
    function hi(c, y, L) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return ls(c, bf(c));
      if (typeof c == "string")
        return Zi(c);
      switch (c) {
        case S:
          return Zi("Suspense");
        case M:
          return Zi("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case _:
            return co(c.render);
          case z:
            return hi(c.type, y, L);
          case W: {
            var k = c, K = k._payload, be = k._init;
            try {
              return hi(be(K), y, L);
            } catch {
            }
          }
        }
      return "";
    }
    var os = {}, fo = rt.ReactDebugCurrentFrame;
    function We(c) {
      if (c) {
        var y = c._owner, L = hi(c.type, c._source, y ? y.type : null);
        fo.setExtraStackFrame(L);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(c, y, L, k, K) {
      {
        var be = Function.call.bind(vn);
        for (var ce in c)
          if (be(c, ce)) {
            var Te = void 0;
            try {
              if (typeof c[ce] != "function") {
                var Be = Error((k || "React class") + ": " + L + " type `" + ce + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[ce] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Be.name = "Invariant Violation", Be;
              }
              Te = c[ce](y, ce, k, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (et) {
              Te = et;
            }
            Te && !(Te instanceof Error) && (We(K), Ne("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", k || "React class", L, ce, typeof Te), We(null)), Te instanceof Error && !(Te.message in os) && (os[Te.message] = !0, We(K), Ne("Failed %s type: %s", L, Te.message), We(null));
          }
      }
    }
    function rr(c) {
      if (c) {
        var y = c._owner, L = hi(c.type, c._source, y ? y.type : null);
        Se(L);
      } else
        Se(null);
    }
    var we;
    we = !1;
    function po() {
      if (Z.current) {
        var c = Un(Z.current.type);
        if (c)
          return `

Check the render method of \`` + c + "`.";
      }
      return "";
    }
    function Tn(c) {
      if (c !== void 0) {
        var y = c.fileName.replace(/^.*[\\\/]/, ""), L = c.lineNumber;
        return `

Check your code at ` + y + ":" + L + ".";
      }
      return "";
    }
    function yi(c) {
      return c != null ? Tn(c.__source) : "";
    }
    var Vr = {};
    function Ef(c) {
      var y = po();
      if (!y) {
        var L = typeof c == "string" ? c : c.displayName || c.name;
        L && (y = `

Check the top-level render call using <` + L + ">.");
      }
      return y;
    }
    function Qt(c, y) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var L = Ef(y);
        if (!Vr[L]) {
          Vr[L] = !0;
          var k = "";
          c && c._owner && c._owner !== Z.current && (k = " It was passed a child from " + Un(c._owner.type) + "."), rr(c), Ne('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, k), rr(null);
        }
      }
    }
    function ht(c, y) {
      if (typeof c == "object") {
        if (qt(c))
          for (var L = 0; L < c.length; L++) {
            var k = c[L];
            Nt(k) && Qt(k, y);
          }
        else if (Nt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var K = B(c);
          if (typeof K == "function" && K !== c.entries)
            for (var be = K.call(c), ce; !(ce = be.next()).done; )
              Nt(ce.value) && Qt(ce.value, y);
        }
      }
    }
    function us(c) {
      {
        var y = c.type;
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
          var k = Un(y);
          Nf(L, c.props, "prop", k, c);
        } else if (y.PropTypes !== void 0 && !we) {
          we = !0;
          var K = Un(y);
          Ne("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", K || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && Ne("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(c) {
      {
        for (var y = Object.keys(c.props), L = 0; L < y.length; L++) {
          var k = y[L];
          if (k !== "children" && k !== "key") {
            rr(c), Ne("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", k), rr(null);
            break;
          }
        }
        c.ref !== null && (rr(c), Ne("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function jn(c, y, L) {
      var k = ve(c);
      if (!k) {
        var K = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var be = yi(y);
        be ? K += be : K += po();
        var ce;
        c === null ? ce = "null" : qt(c) ? ce = "array" : c !== void 0 && c.$$typeof === g ? (ce = "<" + (Un(c.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : ce = typeof c, Ne("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ce, K);
      }
      var Te = ke.apply(this, arguments);
      if (Te == null)
        return Te;
      if (k)
        for (var Be = 2; Be < arguments.length; Be++)
          ht(arguments[Be], c);
      return c === R ? la(Te) : us(Te), Te;
    }
    var Ea = !1;
    function xf(c) {
      var y = jn.bind(null, c);
      return y.type = c, Ea || (Ea = !0, ee("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(y, "type", {
        enumerable: !1,
        get: function() {
          return ee("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: c
          }), c;
        }
      }), y;
    }
    function mo(c, y, L) {
      for (var k = ft.apply(this, arguments), K = 2; K < arguments.length; K++)
        ht(arguments[K], k.type);
      return us(k), k;
    }
    function ss(c, y) {
      var L = Q.transition;
      Q.transition = {};
      var k = Q.transition;
      Q.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        c();
      } finally {
        if (Q.transition = L, L === null && k._updatedFibers) {
          var K = k._updatedFibers.size;
          K > 10 && ee("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), k._updatedFibers.clear();
        }
      }
    }
    var vo = !1, tl = null;
    function Sf(c) {
      if (tl === null)
        try {
          var y = ("require" + Math.random()).slice(0, 7), L = s && s[y];
          tl = L.call(s, "timers").setImmediate;
        } catch {
          tl = function(K) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && Ne("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var be = new MessageChannel();
            be.port1.onmessage = K, be.port2.postMessage(void 0);
          };
        }
      return tl(c);
    }
    var Mr = 0, gi = !1;
    function ho(c) {
      {
        var y = Mr;
        Mr++, Y.current === null && (Y.current = []);
        var L = Y.isBatchingLegacy, k;
        try {
          if (Y.isBatchingLegacy = !0, k = c(), !L && Y.didScheduleLegacyUpdate) {
            var K = Y.current;
            K !== null && (Y.didScheduleLegacyUpdate = !1, rl(K));
          }
        } catch (Fe) {
          throw ir(y), Fe;
        } finally {
          Y.isBatchingLegacy = L;
        }
        if (k !== null && typeof k == "object" && typeof k.then == "function") {
          var be = k, ce = !1, Te = {
            then: function(Fe, yt) {
              ce = !0, be.then(function(wt) {
                ir(y), Mr === 0 ? nl(wt, Fe, yt) : Fe(wt);
              }, function(wt) {
                ir(y), yt(wt);
              });
            }
          };
          return !gi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ce || (gi = !0, Ne("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Te;
        } else {
          var Be = k;
          if (ir(y), Mr === 0) {
            var et = Y.current;
            et !== null && (rl(et), Y.current = null);
            var ot = {
              then: function(Fe, yt) {
                Y.current === null ? (Y.current = [], nl(Be, Fe, yt)) : Fe(Be);
              }
            };
            return ot;
          } else {
            var ut = {
              then: function(Fe, yt) {
                Fe(Be);
              }
            };
            return ut;
          }
        }
      }
    }
    function ir(c) {
      c !== Mr - 1 && Ne("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Mr = c;
    }
    function nl(c, y, L) {
      {
        var k = Y.current;
        if (k !== null)
          try {
            rl(k), Sf(function() {
              k.length === 0 ? (Y.current = null, y(c)) : nl(c, y, L);
            });
          } catch (K) {
            L(K);
          }
        else
          y(c);
      }
    }
    var al = !1;
    function rl(c) {
      if (!al) {
        al = !0;
        var y = 0;
        try {
          for (; y < c.length; y++) {
            var L = c[y];
            do
              L = L(!0);
            while (L !== null);
          }
          c.length = 0;
        } catch (k) {
          throw c = c.slice(y + 1), k;
        } finally {
          al = !1;
        }
      }
    }
    var cs = jn, fs = mo, yo = xf, ds = {
      map: ar,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    m.Children = ds, m.Component = It, m.Fragment = R, m.Profiler = A, m.PureComponent = tn, m.StrictMode = f, m.Suspense = S, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rt, m.act = ho, m.cloneElement = fs, m.createContext = ci, m.createElement = cs, m.createFactory = yo, m.createRef = an, m.forwardRef = I, m.isValidElement = Nt, m.lazy = N, m.memo = He, m.startTransition = ss, m.unstable_act = ho, m.useCallback = ba, m.useContext = Le, m.useDebugValue = Na, m.useDeferredValue = pi, m.useEffect = pt, m.useId = ns, m.useImperativeHandle = di, m.useInsertionEffect = yn, m.useLayoutEffect = Ha, m.useMemo = At, m.useReducer = Mt, m.useRef = dt, m.useState = ye, m.useSyncExternalStore = as, m.useTransition = Ue, m.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var z1 = hf.exports;
sE.exports = z1;
var C = sE.exports;
const H1 = /* @__PURE__ */ F1(C), B1 = /* @__PURE__ */ U1({
  __proto__: null,
  default: H1
}, [C]);
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
  var s = C, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), A = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), z = Symbol.for("react.offscreen"), W = Symbol.iterator, fe = "@@iterator";
  function X(N) {
    if (N === null || typeof N != "object")
      return null;
    var I = W && N[W] || N[fe];
    return typeof I == "function" ? I : null;
  }
  var ue = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function B(N) {
    {
      for (var I = arguments.length, ne = new Array(I > 1 ? I - 1 : 0), ve = 1; ve < I; ve++)
        ne[ve - 1] = arguments[ve];
      G("error", N, ne);
    }
  }
  function G(N, I, ne) {
    {
      var ve = ue.ReactDebugCurrentFrame, He = ve.getStackAddendum();
      He !== "" && (I += "%s", ne = ne.concat([He]));
      var Re = ne.map(function(Le) {
        return String(Le);
      });
      Re.unshift("Warning: " + I), Function.prototype.apply.call(console[N], console, Re);
    }
  }
  var Q = !1, Y = !1, Z = !1, P = !1, _e = !1, Se;
  Se = Symbol.for("react.module.reference");
  function Me(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === R || _e || N === b || N === T || N === _ || P || N === z || Q || Y || Z || typeof N == "object" && N !== null && (N.$$typeof === M || N.$$typeof === S || N.$$typeof === f || N.$$typeof === A || N.$$typeof === D || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === Se || N.getModuleId !== void 0));
  }
  function Oe(N, I, ne) {
    var ve = N.displayName;
    if (ve)
      return ve;
    var He = I.displayName || I.name || "";
    return He !== "" ? ne + "(" + He + ")" : ne;
  }
  function Ae(N) {
    return N.displayName || "Context";
  }
  function pe(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && B("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
      return N.displayName || N.name || null;
    if (typeof N == "string")
      return N;
    switch (N) {
      case g:
        return "Fragment";
      case h:
        return "Portal";
      case R:
        return "Profiler";
      case b:
        return "StrictMode";
      case T:
        return "Suspense";
      case _:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case A:
          var I = N;
          return Ae(I) + ".Consumer";
        case f:
          var ne = N;
          return Ae(ne._context) + ".Provider";
        case D:
          return Oe(N, N.render, "ForwardRef");
        case S:
          var ve = N.displayName || null;
          return ve !== null ? ve : pe(N.type) || "Memo";
        case M: {
          var He = N, Re = He._payload, Le = He._init;
          try {
            return pe(Le(Re));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Ge = Object.assign, rt = 0, ee, Ne, Je, jt, Yt, vt, ct;
  function bt() {
  }
  bt.__reactDisabledLog = !0;
  function It() {
    {
      if (rt === 0) {
        ee = console.log, Ne = console.info, Je = console.warn, jt = console.error, Yt = console.group, vt = console.groupCollapsed, ct = console.groupEnd;
        var N = {
          configurable: !0,
          enumerable: !0,
          value: bt,
          writable: !0
        };
        Object.defineProperties(console, {
          info: N,
          log: N,
          warn: N,
          error: N,
          group: N,
          groupCollapsed: N,
          groupEnd: N
        });
      }
      rt++;
    }
  }
  function na() {
    {
      if (rt--, rt === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ge({}, N, {
            value: ee
          }),
          info: Ge({}, N, {
            value: Ne
          }),
          warn: Ge({}, N, {
            value: Je
          }),
          error: Ge({}, N, {
            value: jt
          }),
          group: Ge({}, N, {
            value: Yt
          }),
          groupCollapsed: Ge({}, N, {
            value: vt
          }),
          groupEnd: Ge({}, N, {
            value: ct
          })
        });
      }
      rt < 0 && B("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ua = ue.ReactCurrentDispatcher, en;
  function In(N, I, ne) {
    {
      if (en === void 0)
        try {
          throw Error();
        } catch (He) {
          var ve = He.stack.trim().match(/\n( *(at )?)/);
          en = ve && ve[1] || "";
        }
      return `
` + en + N;
    }
  }
  var tn = !1, nn;
  {
    var an = typeof WeakMap == "function" ? WeakMap : Map;
    nn = new an();
  }
  function kn(N, I) {
    if (!N || tn)
      return "";
    {
      var ne = nn.get(N);
      if (ne !== void 0)
        return ne;
    }
    var ve;
    tn = !0;
    var He = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Re;
    Re = Ua.current, Ua.current = null, It();
    try {
      if (I) {
        var Le = function() {
          throw Error();
        };
        if (Object.defineProperty(Le.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Le, []);
          } catch (At) {
            ve = At;
          }
          Reflect.construct(N, [], Le);
        } else {
          try {
            Le.call();
          } catch (At) {
            ve = At;
          }
          N.call(Le.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (At) {
          ve = At;
        }
        N();
      }
    } catch (At) {
      if (At && ve && typeof At.stack == "string") {
        for (var ye = At.stack.split(`
`), Mt = ve.stack.split(`
`), dt = ye.length - 1, pt = Mt.length - 1; dt >= 1 && pt >= 0 && ye[dt] !== Mt[pt]; )
          pt--;
        for (; dt >= 1 && pt >= 0; dt--, pt--)
          if (ye[dt] !== Mt[pt]) {
            if (dt !== 1 || pt !== 1)
              do
                if (dt--, pt--, pt < 0 || ye[dt] !== Mt[pt]) {
                  var yn = `
` + ye[dt].replace(" at new ", " at ");
                  return N.displayName && yn.includes("<anonymous>") && (yn = yn.replace("<anonymous>", N.displayName)), typeof N == "function" && nn.set(N, yn), yn;
                }
              while (dt >= 1 && pt >= 0);
            break;
          }
      }
    } finally {
      tn = !1, Ua.current = Re, na(), Error.prepareStackTrace = He;
    }
    var Ha = N ? N.displayName || N.name : "", ba = Ha ? In(Ha) : "";
    return typeof N == "function" && nn.set(N, ba), ba;
  }
  function qt(N, I, ne) {
    return kn(N, !1);
  }
  function Rn(N) {
    var I = N.prototype;
    return !!(I && I.isReactComponent);
  }
  function Gt(N, I, ne) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return In(N);
    switch (N) {
      case T:
        return In("Suspense");
      case _:
        return In("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case D:
          return qt(N.render);
        case S:
          return Gt(N.type, I, ne);
        case M: {
          var ve = N, He = ve._payload, Re = ve._init;
          try {
            return Gt(Re(He), I, ne);
          } catch {
          }
        }
      }
    return "";
  }
  var Wt = Object.prototype.hasOwnProperty, aa = {}, tr = ue.ReactDebugCurrentFrame;
  function va(N) {
    if (N) {
      var I = N._owner, ne = Gt(N.type, N._source, I ? I.type : null);
      tr.setExtraStackFrame(ne);
    } else
      tr.setExtraStackFrame(null);
  }
  function Un(N, I, ne, ve, He) {
    {
      var Re = Function.call.bind(Wt);
      for (var Le in N)
        if (Re(N, Le)) {
          var ye = void 0;
          try {
            if (typeof N[Le] != "function") {
              var Mt = Error((ve || "React class") + ": " + ne + " type `" + Le + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[Le] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Mt.name = "Invariant Violation", Mt;
            }
            ye = N[Le](I, Le, ve, ne, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (dt) {
            ye = dt;
          }
          ye && !(ye instanceof Error) && (va(He), B("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ve || "React class", ne, Le, typeof ye), va(null)), ye instanceof Error && !(ye.message in aa) && (aa[ye.message] = !0, va(He), B("Failed %s type: %s", ne, ye.message), va(null));
        }
    }
  }
  var vn = Array.isArray;
  function rn(N) {
    return vn(N);
  }
  function Cn(N) {
    {
      var I = typeof Symbol == "function" && Symbol.toStringTag, ne = I && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return ne;
    }
  }
  function Fa(N) {
    try {
      return Vt(N), !1;
    } catch {
      return !0;
    }
  }
  function Vt(N) {
    return "" + N;
  }
  function Dn(N) {
    if (Fa(N))
      return B("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Vt(N);
  }
  var Fn = ue.ReactCurrentOwner, _r = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, te, me;
  me = {};
  function ke(N) {
    if (Wt.call(N, "ref")) {
      var I = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (I && I.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function Ze(N) {
    if (Wt.call(N, "key")) {
      var I = Object.getOwnPropertyDescriptor(N, "key").get;
      if (I && I.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ft(N, I) {
    if (typeof N.ref == "string" && Fn.current && I && Fn.current.stateNode !== I) {
      var ne = pe(Fn.current.type);
      me[ne] || (B('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', pe(Fn.current.type), N.ref), me[ne] = !0);
    }
  }
  function Nt(N, I) {
    {
      var ne = function() {
        nr || (nr = !0, B("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
      };
      ne.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ne,
        configurable: !0
      });
    }
  }
  function Et(N, I) {
    {
      var ne = function() {
        te || (te = !0, B("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
      };
      ne.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ne,
        configurable: !0
      });
    }
  }
  var hn = function(N, I, ne, ve, He, Re, Le) {
    var ye = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: m,
      // Built-in properties that belong on the element
      type: N,
      key: I,
      ref: ne,
      props: Le,
      // Record the component responsible for creating this element.
      _owner: Re
    };
    return ye._store = {}, Object.defineProperty(ye._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(ye, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: ve
    }), Object.defineProperty(ye, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: He
    }), Object.freeze && (Object.freeze(ye.props), Object.freeze(ye)), ye;
  };
  function St(N, I, ne, ve, He) {
    {
      var Re, Le = {}, ye = null, Mt = null;
      ne !== void 0 && (Dn(ne), ye = "" + ne), Ze(I) && (Dn(I.key), ye = "" + I.key), ke(I) && (Mt = I.ref, ft(I, He));
      for (Re in I)
        Wt.call(I, Re) && !_r.hasOwnProperty(Re) && (Le[Re] = I[Re]);
      if (N && N.defaultProps) {
        var dt = N.defaultProps;
        for (Re in dt)
          Le[Re] === void 0 && (Le[Re] = dt[Re]);
      }
      if (ye || Mt) {
        var pt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        ye && Nt(Le, pt), Mt && Et(Le, pt);
      }
      return hn(N, ye, Mt, He, ve, Fn.current, Le);
    }
  }
  var it = ue.ReactCurrentOwner, Rt = ue.ReactDebugCurrentFrame;
  function ha(N) {
    if (N) {
      var I = N._owner, ne = Gt(N.type, N._source, I ? I.type : null);
      Rt.setExtraStackFrame(ne);
    } else
      Rt.setExtraStackFrame(null);
  }
  var ya;
  ya = !1;
  function ra(N) {
    return typeof N == "object" && N !== null && N.$$typeof === m;
  }
  function ar() {
    {
      if (it.current) {
        var N = pe(it.current.type);
        if (N)
          return `

Check the render method of \`` + N + "`.";
      }
      return "";
    }
  }
  function no(N) {
    {
      if (N !== void 0) {
        var I = N.fileName.replace(/^.*[\\\/]/, ""), ne = N.lineNumber;
        return `

Check your code at ` + I + ":" + ne + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(N) {
    {
      var I = ar();
      if (!I) {
        var ne = typeof N == "string" ? N : N.displayName || N.name;
        ne && (I = `

Check the top-level render call using <` + ne + ">.");
      }
      return I;
    }
  }
  function Xi(N, I) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ne = Ki(I);
      if (si[ne])
        return;
      si[ne] = !0;
      var ve = "";
      N && N._owner && N._owner !== it.current && (ve = " It was passed a child from " + pe(N._owner.type) + "."), ha(N), B('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ne, ve), ha(null);
    }
  }
  function ci(N, I) {
    {
      if (typeof N != "object")
        return;
      if (rn(N))
        for (var ne = 0; ne < N.length; ne++) {
          var ve = N[ne];
          ra(ve) && Xi(ve, I);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var He = X(N);
        if (typeof He == "function" && He !== N.entries)
          for (var Re = He.call(N), Le; !(Le = Re.next()).done; )
            ra(Le.value) && Xi(Le.value, I);
      }
    }
  }
  function ga(N) {
    {
      var I = N.type;
      if (I == null || typeof I == "string")
        return;
      var ne;
      if (typeof I == "function")
        ne = I.propTypes;
      else if (typeof I == "object" && (I.$$typeof === D || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      I.$$typeof === S))
        ne = I.propTypes;
      else
        return;
      if (ne) {
        var ve = pe(I);
        Un(ne, N.props, "prop", ve, N);
      } else if (I.PropTypes !== void 0 && !ya) {
        ya = !0;
        var He = pe(I);
        B("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", He || "Unknown");
      }
      typeof I.getDefaultProps == "function" && !I.getDefaultProps.isReactClassApproved && B("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var I = Object.keys(N.props), ne = 0; ne < I.length; ne++) {
        var ve = I[ne];
        if (ve !== "children" && ve !== "key") {
          ha(N), B("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ve), ha(null);
          break;
        }
      }
      N.ref !== null && (ha(N), B("Invalid attribute `ref` supplied to `React.Fragment`."), ha(null));
    }
  }
  var qn = {};
  function za(N, I, ne, ve, He, Re) {
    {
      var Le = Me(N);
      if (!Le) {
        var ye = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (ye += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Mt = no(He);
        Mt ? ye += Mt : ye += ar();
        var dt;
        N === null ? dt = "null" : rn(N) ? dt = "array" : N !== void 0 && N.$$typeof === m ? (dt = "<" + (pe(N.type) || "Unknown") + " />", ye = " Did you accidentally export a JSX literal instead of a component?") : dt = typeof N, B("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", dt, ye);
      }
      var pt = St(N, I, ne, He, Re);
      if (pt == null)
        return pt;
      if (Le) {
        var yn = I.children;
        if (yn !== void 0)
          if (ve)
            if (rn(yn)) {
              for (var Ha = 0; Ha < yn.length; Ha++)
                ci(yn[Ha], N);
              Object.freeze && Object.freeze(yn);
            } else
              B("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(yn, N);
      }
      if (Wt.call(I, "key")) {
        var ba = pe(N), At = Object.keys(I).filter(function(Ue) {
          return Ue !== "key";
        }), di = At.length > 0 ? "{key: someKey, " + At.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[ba + di]) {
          var Na = At.length > 0 ? "{" + At.join(": ..., ") + ": ...}" : "{}";
          B(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, ba, Na, ba), qn[ba + di] = !0;
        }
      }
      return N === g ? ia(pt) : ga(pt), pt;
    }
  }
  var fi = za;
  _v.Fragment = g, _v.jsxDEV = fi;
})();
uE.exports = _v;
var d = uE.exports, cE = { exports: {} }, ta = {}, fE = { exports: {} }, dE = {};
(function(s) {
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
    function g(te, me) {
      var ke = te.length;
      te.push(me), f(te, me, ke);
    }
    function b(te) {
      return te.length === 0 ? null : te[0];
    }
    function R(te) {
      if (te.length === 0)
        return null;
      var me = te[0], ke = te.pop();
      return ke !== me && (te[0] = ke, A(te, ke, 0)), me;
    }
    function f(te, me, ke) {
      for (var Ze = ke; Ze > 0; ) {
        var ft = Ze - 1 >>> 1, Nt = te[ft];
        if (D(Nt, me) > 0)
          te[ft] = me, te[Ze] = Nt, Ze = ft;
        else
          return;
      }
    }
    function A(te, me, ke) {
      for (var Ze = ke, ft = te.length, Nt = ft >>> 1; Ze < Nt; ) {
        var Et = (Ze + 1) * 2 - 1, hn = te[Et], St = Et + 1, it = te[St];
        if (D(hn, me) < 0)
          St < ft && D(it, hn) < 0 ? (te[Ze] = it, te[St] = me, Ze = St) : (te[Ze] = hn, te[Et] = me, Ze = Et);
        else if (St < ft && D(it, me) < 0)
          te[Ze] = it, te[St] = me, Ze = St;
        else
          return;
      }
    }
    function D(te, me) {
      var ke = te.sortIndex - me.sortIndex;
      return ke !== 0 ? ke : te.id - me.id;
    }
    var T = 1, _ = 2, S = 3, M = 4, z = 5;
    function W(te, me) {
    }
    var fe = typeof performance == "object" && typeof performance.now == "function";
    if (fe) {
      var X = performance;
      s.unstable_now = function() {
        return X.now();
      };
    } else {
      var ue = Date, B = ue.now();
      s.unstable_now = function() {
        return ue.now() - B;
      };
    }
    var G = 1073741823, Q = -1, Y = 250, Z = 5e3, P = 1e4, _e = G, Se = [], Me = [], Oe = 1, Ae = null, pe = S, Ge = !1, rt = !1, ee = !1, Ne = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, jt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Yt(te) {
      for (var me = b(Me); me !== null; ) {
        if (me.callback === null)
          R(Me);
        else if (me.startTime <= te)
          R(Me), me.sortIndex = me.expirationTime, g(Se, me);
        else
          return;
        me = b(Me);
      }
    }
    function vt(te) {
      if (ee = !1, Yt(te), !rt)
        if (b(Se) !== null)
          rt = !0, Vt(ct);
        else {
          var me = b(Me);
          me !== null && Dn(vt, me.startTime - te);
        }
    }
    function ct(te, me) {
      rt = !1, ee && (ee = !1, Fn()), Ge = !0;
      var ke = pe;
      try {
        var Ze;
        if (!m) return bt(te, me);
      } finally {
        Ae = null, pe = ke, Ge = !1;
      }
    }
    function bt(te, me) {
      var ke = me;
      for (Yt(ke), Ae = b(Se); Ae !== null && !(Ae.expirationTime > ke && (!te || tr())); ) {
        var Ze = Ae.callback;
        if (typeof Ze == "function") {
          Ae.callback = null, pe = Ae.priorityLevel;
          var ft = Ae.expirationTime <= ke, Nt = Ze(ft);
          ke = s.unstable_now(), typeof Nt == "function" ? Ae.callback = Nt : Ae === b(Se) && R(Se), Yt(ke);
        } else
          R(Se);
        Ae = b(Se);
      }
      if (Ae !== null)
        return !0;
      var Et = b(Me);
      return Et !== null && Dn(vt, Et.startTime - ke), !1;
    }
    function It(te, me) {
      switch (te) {
        case T:
        case _:
        case S:
        case M:
        case z:
          break;
        default:
          te = S;
      }
      var ke = pe;
      pe = te;
      try {
        return me();
      } finally {
        pe = ke;
      }
    }
    function na(te) {
      var me;
      switch (pe) {
        case T:
        case _:
        case S:
          me = S;
          break;
        default:
          me = pe;
          break;
      }
      var ke = pe;
      pe = me;
      try {
        return te();
      } finally {
        pe = ke;
      }
    }
    function Ua(te) {
      var me = pe;
      return function() {
        var ke = pe;
        pe = me;
        try {
          return te.apply(this, arguments);
        } finally {
          pe = ke;
        }
      };
    }
    function en(te, me, ke) {
      var Ze = s.unstable_now(), ft;
      if (typeof ke == "object" && ke !== null) {
        var Nt = ke.delay;
        typeof Nt == "number" && Nt > 0 ? ft = Ze + Nt : ft = Ze;
      } else
        ft = Ze;
      var Et;
      switch (te) {
        case T:
          Et = Q;
          break;
        case _:
          Et = Y;
          break;
        case z:
          Et = _e;
          break;
        case M:
          Et = P;
          break;
        case S:
        default:
          Et = Z;
          break;
      }
      var hn = ft + Et, St = {
        id: Oe++,
        callback: me,
        priorityLevel: te,
        startTime: ft,
        expirationTime: hn,
        sortIndex: -1
      };
      return ft > Ze ? (St.sortIndex = ft, g(Me, St), b(Se) === null && St === b(Me) && (ee ? Fn() : ee = !0, Dn(vt, ft - Ze))) : (St.sortIndex = hn, g(Se, St), !rt && !Ge && (rt = !0, Vt(ct))), St;
    }
    function In() {
    }
    function tn() {
      !rt && !Ge && (rt = !0, Vt(ct));
    }
    function nn() {
      return b(Se);
    }
    function an(te) {
      te.callback = null;
    }
    function kn() {
      return pe;
    }
    var qt = !1, Rn = null, Gt = -1, Wt = h, aa = -1;
    function tr() {
      var te = s.unstable_now() - aa;
      return !(te < Wt);
    }
    function va() {
    }
    function Un(te) {
      if (te < 0 || te > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      te > 0 ? Wt = Math.floor(1e3 / te) : Wt = h;
    }
    var vn = function() {
      if (Rn !== null) {
        var te = s.unstable_now();
        aa = te;
        var me = !0, ke = !0;
        try {
          ke = Rn(me, te);
        } finally {
          ke ? rn() : (qt = !1, Rn = null);
        }
      } else
        qt = !1;
    }, rn;
    if (typeof jt == "function")
      rn = function() {
        jt(vn);
      };
    else if (typeof MessageChannel < "u") {
      var Cn = new MessageChannel(), Fa = Cn.port2;
      Cn.port1.onmessage = vn, rn = function() {
        Fa.postMessage(null);
      };
    } else
      rn = function() {
        Ne(vn, 0);
      };
    function Vt(te) {
      Rn = te, qt || (qt = !0, rn());
    }
    function Dn(te, me) {
      Gt = Ne(function() {
        te(s.unstable_now());
      }, me);
    }
    function Fn() {
      Je(Gt), Gt = -1;
    }
    var _r = va, nr = null;
    s.unstable_IdlePriority = z, s.unstable_ImmediatePriority = T, s.unstable_LowPriority = M, s.unstable_NormalPriority = S, s.unstable_Profiling = nr, s.unstable_UserBlockingPriority = _, s.unstable_cancelCallback = an, s.unstable_continueExecution = tn, s.unstable_forceFrameRate = Un, s.unstable_getCurrentPriorityLevel = kn, s.unstable_getFirstCallbackNode = nn, s.unstable_next = na, s.unstable_pauseExecution = In, s.unstable_requestPaint = _r, s.unstable_runWithPriority = It, s.unstable_scheduleCallback = en, s.unstable_shouldYield = tr, s.unstable_wrapCallback = Ua, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(dE);
fE.exports = dE;
var P1 = fE.exports;
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
  var s = C, m = P1, h = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function b(e) {
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
  var D = 0, T = 1, _ = 2, S = 3, M = 4, z = 5, W = 6, fe = 7, X = 8, ue = 9, B = 10, G = 11, Q = 12, Y = 13, Z = 14, P = 15, _e = 16, Se = 17, Me = 18, Oe = 19, Ae = 21, pe = 22, Ge = 23, rt = 24, ee = 25, Ne = !0, Je = !1, jt = !1, Yt = !1, vt = !1, ct = !0, bt = !0, It = !0, na = !0, Ua = /* @__PURE__ */ new Set(), en = {}, In = {};
  function tn(e, t) {
    nn(e, t), nn(e + "Capture", t);
  }
  function nn(e, t) {
    en[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), en[e] = t;
    {
      var n = e.toLowerCase();
      In[n] = e, e === "onDoubleClick" && (In.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Ua.add(t[a]);
  }
  var an = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", kn = Object.prototype.hasOwnProperty;
  function qt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Rn(e) {
    try {
      return Gt(e), !1;
    } catch {
      return !0;
    }
  }
  function Gt(e) {
    return "" + e;
  }
  function Wt(e, t) {
    if (Rn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, qt(e)), Gt(e);
  }
  function aa(e) {
    if (Rn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qt(e)), Gt(e);
  }
  function tr(e, t) {
    if (Rn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, qt(e)), Gt(e);
  }
  function va(e, t) {
    if (Rn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, qt(e)), Gt(e);
  }
  function Un(e) {
    if (Rn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", qt(e)), Gt(e);
  }
  function vn(e) {
    if (Rn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", qt(e)), Gt(e);
  }
  var rn = 0, Cn = 1, Fa = 2, Vt = 3, Dn = 4, Fn = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", te = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", me = new RegExp("^[" + nr + "][" + te + "]*$"), ke = {}, Ze = {};
  function ft(e) {
    return kn.call(Ze, e) ? !0 : kn.call(ke, e) ? !1 : me.test(e) ? (Ze[e] = !0, !0) : (ke[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function Nt(e, t, n) {
    return t !== null ? t.type === rn : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function Et(e, t, n, a) {
    if (n !== null && n.type === rn)
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
  function hn(e, t, n, a) {
    if (t === null || typeof t > "u" || Et(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Vt:
          return !t;
        case Dn:
          return t === !1;
        case Fn:
          return isNaN(t);
        case _r:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function St(e) {
    return Rt.hasOwnProperty(e) ? Rt[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Fa || t === Vt || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Rt = {}, ha = [
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
  ha.forEach(function(e) {
    Rt[e] = new it(
      e,
      rn,
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
    Rt[t] = new it(
      t,
      Cn,
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
    Rt[e] = new it(
      e,
      Fa,
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
    Rt[e] = new it(
      e,
      Fa,
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
    Rt[e] = new it(
      e,
      Vt,
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
    Rt[e] = new it(
      e,
      Vt,
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
    Rt[e] = new it(
      e,
      Dn,
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
    Rt[e] = new it(
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
    Rt[e] = new it(
      e,
      Fn,
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
  var ya = /[\-\:]([a-z])/g, ra = function(e) {
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
    var t = e.replace(ya, ra);
    Rt[t] = new it(
      t,
      Cn,
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
    var t = e.replace(ya, ra);
    Rt[t] = new it(
      t,
      Cn,
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
    var t = e.replace(ya, ra);
    Rt[t] = new it(
      t,
      Cn,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Rt[e] = new it(
      e,
      Cn,
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
  Rt[ar] = new it(
    "xlinkHref",
    Cn,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Rt[e] = new it(
      e,
      Cn,
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
      Wt(n, t), a.sanitizeURL && Ki("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Dn) {
        if (e.hasAttribute(i)) {
          var o = e.getAttribute(i);
          return o === "" ? !0 : hn(t, n, a, !1) ? o : o === "" + n ? n : o;
        }
      } else if (e.hasAttribute(i)) {
        if (hn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Vt)
          return n;
        l = e.getAttribute(i);
      }
      return hn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function ci(e, t, n, a) {
    {
      if (!ft(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return Wt(n, t), r === "" + n ? n : r;
    }
  }
  function ga(e, t, n, a) {
    var r = St(t);
    if (!Nt(t, r, a)) {
      if (hn(t, n, r, a) && (n = null), a || r === null) {
        if (ft(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Wt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var o = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[o] = u === Vt ? !1 : "";
        } else
          e[o] = n;
        return;
      }
      var p = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(p);
      else {
        var x = r.type, E;
        x === Vt || x === Dn && n === !0 ? E = "" : (Wt(n, p), E = "" + n, r.sanitizeURL && Ki(E.toString())), v ? e.setAttributeNS(v, p, E) : e.setAttribute(p, E);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), I = Symbol.for("react.provider"), ne = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), He = Symbol.for("react.suspense"), Re = Symbol.for("react.suspense_list"), Le = Symbol.for("react.memo"), ye = Symbol.for("react.lazy"), Mt = Symbol.for("react.scope"), dt = Symbol.for("react.debug_trace_mode"), pt = Symbol.for("react.offscreen"), yn = Symbol.for("react.legacy_hidden"), Ha = Symbol.for("react.cache"), ba = Symbol.for("react.tracing_marker"), At = Symbol.iterator, di = "@@iterator";
  function Na(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = At && e[At] || e[di];
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
  function Ba(e, t, n) {
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
    var E = e ? e.displayName || e.name : "", O = E ? Ba(E) : "";
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
      return Ba(e);
    switch (e) {
      case He:
        return Ba("Suspense");
      case Re:
        return Ba("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ve:
          return so(e.render);
        case Le:
          return co(e.type, t, n);
        case ye: {
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
        return Ba(e.type);
      case _e:
        return Ba("Lazy");
      case Y:
        return Ba("Suspense");
      case Oe:
        return Ba("SuspenseList");
      case D:
      case _:
      case P:
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
  function We(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case za:
        return "Fragment";
      case qn:
        return "Portal";
      case N:
        return "Profiler";
      case fi:
        return "StrictMode";
      case He:
        return "Suspense";
      case Re:
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
        case Le:
          var a = e.displayName || null;
          return a !== null ? a : We(e.type) || "Memo";
        case ye: {
          var r = e, i = r._payload, l = r._init;
          try {
            return We(l(i));
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
  function we(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case rt:
        return "Cache";
      case ue:
        var a = n;
        return rr(a) + ".Consumer";
      case B:
        var r = n;
        return rr(r._context) + ".Provider";
      case Me:
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
      case _e:
        return We(n);
      case X:
        return n === fi ? "StrictMode" : "Mode";
      case pe:
        return "Offscreen";
      case Q:
        return "Profiler";
      case Ae:
        return "Scope";
      case Y:
        return "Suspense";
      case Oe:
        return "SuspenseList";
      case ee:
        return "TracingMarker";
      case T:
      case D:
      case Se:
      case _:
      case Z:
      case P:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = h.ReactDebugCurrentFrame, Tn = null, yi = !1;
  function Vr() {
    {
      if (Tn === null)
        return null;
      var e = Tn._debugOwner;
      if (e !== null && typeof e < "u")
        return we(e);
    }
    return null;
  }
  function Ef() {
    return Tn === null ? "" : hi(Tn);
  }
  function Qt() {
    po.getCurrentStack = null, Tn = null, yi = !1;
  }
  function ht(e) {
    po.getCurrentStack = e === null ? null : Ef, Tn = e, yi = !1;
  }
  function us() {
    return Tn;
  }
  function la(e) {
    yi = e;
  }
  function jn(e) {
    return "" + e;
  }
  function Ea(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return vn(e), e;
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
    vn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(o) {
          vn(o), a = "" + o, i.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          vn(o), a = "" + o;
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
      initialValue: Ea(t.value != null ? t.value : a),
      controlled: fs(t)
    };
  }
  function c(e, t) {
    var n = e, a = t.checked;
    a != null && ga(n, "checked", a, !1);
  }
  function y(e, t) {
    var n = e;
    {
      var a = fs(t);
      !n._wrapperState.controlled && a && !cs && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), cs = !0), n._wrapperState.controlled && !a && !rl && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), rl = !0);
    }
    c(e, t);
    var r = Ea(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = jn(r)) : n.value !== jn(r) && (n.value = jn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? be(n, t.type, r) : t.hasOwnProperty("defaultValue") && be(n, t.type, Ea(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function L(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = jn(a._wrapperState.initialValue);
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
      Wt(n, "name");
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
  function be(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var ce = !1, Te = !1, Be = !1;
  function et(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? s.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Te || (Te = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Be || (Be = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ce && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ce = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", jn(Ea(t.value)));
  }
  var ut = Array.isArray;
  function Fe(e) {
    return ut(e);
  }
  var yt;
  yt = !1;
  function wt() {
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
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, wt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, wt());
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
      for (var v = jn(Ea(n)), x = null, E = 0; E < r.length; E++) {
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
    }, t.value !== void 0 && t.defaultValue !== void 0 && !yt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), yt = !0);
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
  var Pv = !1;
  function Df(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Ue({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: jn(n._wrapperState.initialValue)
    });
    return a;
  }
  function $v(e, t) {
    var n = e;
    mo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Pv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component"), Pv = !0);
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
      initialValue: Ea(a)
    };
  }
  function Yv(e, t) {
    var n = e, a = Ea(t.value), r = Ea(t.defaultValue);
    if (a != null) {
      var i = jn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = jn(r));
  }
  function Iv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function RE(e, t) {
    Yv(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", CE = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return CE;
      default:
        return or;
    }
  }
  function wf(e, t) {
    return e == null || e === or ? jf(t) : e === Tf && t === "foreignObject" ? or : e;
  }
  var DE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, ms, qv = DE(function(e, t) {
    if (e.namespaceURI === Tf && !("innerHTML" in e)) {
      ms = ms || document.createElement("div"), ms.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = ms.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, ur = 3, _t = 8, sr = 9, _f = 11, vs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, TE = {
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
  function jE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var wE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    wE.forEach(function(t) {
      Eo[jE(t, e)] = Eo[e];
    });
  });
  function Of(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (va(t, e), ("" + t).trim());
  }
  var _E = /([A-Z])/g, OE = /^ms-/;
  function LE(e) {
    return e.replace(_E, "-$1").toLowerCase().replace(OE, "-ms-");
  }
  var Gv = function() {
  };
  {
    var VE = /^(?:webkit|moz|o)[A-Z]/, ME = /^-ms-/, AE = /-(.)/g, Wv = /;\s*$/, il = {}, Lf = {}, Qv = !1, Kv = !1, kE = function(e) {
      return e.replace(AE, function(t, n) {
        return n.toUpperCase();
      });
    }, UE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        kE(e.replace(ME, "ms-"))
      ));
    }, FE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, zE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Wv, "")));
    }, HE = function(e, t) {
      Qv || (Qv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, BE = function(e, t) {
      Kv || (Kv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Gv = function(e, t) {
      e.indexOf("-") > -1 ? UE(e) : VE.test(e) ? FE(e) : Wv.test(t) && zE(e, t), typeof t == "number" && (isNaN(t) ? HE(e, t) : isFinite(t) || BE(e, t));
    };
  }
  var PE = Gv;
  function $E(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : LE(a)) + ":", t += Of(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function Xv(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || PE(a, t[a]);
        var i = Of(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function YE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Jv(e) {
    var t = {};
    for (var n in e)
      for (var a = TE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function IE(e, t) {
    {
      if (!t)
        return;
      var n = Jv(e), a = Jv(t), r = {};
      for (var i in n) {
        var l = n[i], o = a[i];
        if (o && l !== o) {
          var u = l + "," + o;
          if (r[u])
            continue;
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", YE(e[l]) ? "Removing" : "Updating", l, o);
        }
      }
    }
  }
  var qE = {
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
  }, GE = Ue({
    menuitem: !0
  }, qE), WE = "__html";
  function Vf(e, t) {
    if (t) {
      if (GE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(WE in t.dangerouslySetInnerHTML))
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
  }, Zv = {
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
  }, ll = {}, QE = new RegExp("^(aria)-[" + te + "]*$"), KE = new RegExp("^(aria)[A-Z][" + te + "]*$");
  function XE(e, t) {
    {
      if (kn.call(ll, t) && ll[t])
        return !0;
      if (KE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = Zv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ll[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ll[t] = !0, !0;
      }
      if (QE.test(t)) {
        var r = t.toLowerCase(), i = Zv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ll[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ll[t] = !0, !0;
      }
    }
    return !0;
  }
  function JE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = XE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function ZE(e, t) {
    Ni(e, t) || JE(e, t);
  }
  var eh = !1;
  function ex(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !eh && (eh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var th = function() {
  };
  {
    var wn = {}, nh = /^on./, tx = /^on[^A-Z]/, nx = new RegExp("^(aria)-[" + te + "]*$"), ax = new RegExp("^(aria)[A-Z][" + te + "]*$");
    th = function(e, t, n, a) {
      if (kn.call(wn, t) && wn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), wn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var o = l.hasOwnProperty(r) ? l[r] : null;
        if (o != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, o), wn[t] = !0, !0;
        if (nh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), wn[t] = !0, !0;
      } else if (nh.test(t))
        return tx.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (nx.test(t) || ax.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), wn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), wn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), wn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), wn[t] = !0, !0;
      var u = St(t), p = u !== null && u.type === rn;
      if (hs.hasOwnProperty(r)) {
        var v = hs[r];
        if (v !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, v), wn[t] = !0, !0;
      } else if (!p && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && Et(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : p ? !0 : Et(t, n, u, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === Vt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var rx = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = th(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(o) {
        return "`" + o + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function ix(e, t, n) {
    Ni(e, t) || rx(e, t, n);
  }
  var ah = 1, Mf = 2, xo = 4, lx = ah | Mf | xo, So = null;
  function ox(e) {
    So !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), So = e;
  }
  function ux() {
    So === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), So = null;
  }
  function sx(e) {
    return e === So;
  }
  function Af(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ur ? t.parentNode : t;
  }
  var kf = null, ol = null, ul = null;
  function rh(e) {
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
  function cx(e) {
    kf = e;
  }
  function ih(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function fx() {
    return ol !== null || ul !== null;
  }
  function lh() {
    if (ol) {
      var e = ol, t = ul;
      if (ol = null, ul = null, rh(e), t)
        for (var n = 0; n < t.length; n++)
          rh(t[n]);
    }
  }
  var oh = function(e, t) {
    return e(t);
  }, uh = function() {
  }, Uf = !1;
  function dx() {
    var e = fx();
    e && (uh(), lh());
  }
  function sh(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return oh(e, t, n);
    } finally {
      Uf = !1, dx();
    }
  }
  function px(e, t, n) {
    oh = e, uh = n;
  }
  function mx(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function vx(e, t, n) {
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
        return !!(n.disabled && mx(t));
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
    if (vx(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Ff = !1;
  if (an)
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
  function ch(e, t, n, a, r, i, l, o, u) {
    var p = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, p);
    } catch (v) {
      this.onError(v);
    }
  }
  var fh = ch;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var zf = document.createElement("react");
    fh = function(t, n, a, r, i, l, o, u, p) {
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
      var de, Ye = !1, ze = !1;
      function j(w) {
        if (de = w.error, Ye = !0, de === null && w.colno === 0 && w.lineno === 0 && (ze = !0), w.defaultPrevented && de != null && typeof de == "object")
          try {
            de._suppressLogging = !0;
          } catch {
          }
      }
      var F = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), zf.addEventListener(F, he, !1), v.initEvent(F, !1, !1), zf.dispatchEvent(v), V && Object.defineProperty(window, "event", V), x && E && (Ye ? ze && (de = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : de = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(de)), window.removeEventListener("error", j), !x)
        return U(), ch.apply(this, arguments);
    };
  }
  var hx = fh, sl = !1, ys = null, gs = !1, Hf = null, yx = {
    onError: function(e) {
      sl = !0, ys = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, o, u) {
    sl = !1, ys = null, hx.apply(yx, arguments);
  }
  function gx(e, t, n, a, r, i, l, o, u) {
    if (Bf.apply(this, arguments), sl) {
      var p = Pf();
      gs || (gs = !0, Hf = p);
    }
  }
  function bx() {
    if (gs) {
      var e = Hf;
      throw gs = !1, Hf = null, e;
    }
  }
  function Nx() {
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
  function Ex(e) {
    return e._reactInternals !== void 0;
  }
  function xx(e, t) {
    e._reactInternals = t;
  }
  var Ee = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), Ot = (
    /*                    */
    2
  ), Qe = (
    /*                       */
    4
  ), Ei = (
    /*                */
    16
  ), Do = (
    /*                 */
    32
  ), dh = (
    /*                     */
    64
  ), Ke = (
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
  ), Sx = (
    /*               */
    32767
  ), bs = (
    /*                   */
    32768
  ), _n = (
    /*                */
    65536
  ), Yf = (
    /* */
    131072
  ), ph = (
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
    Qe | dl | 0
  ), Qf = Ot | Qe | Ei | Do | xi | fr | Si, To = Qe | dh | xi | Si, pl = Ar | Ei, dr = Ri | qf | If, Rx = h.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Ot | fr)) !== Ee && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === S ? n : null;
  }
  function mh(e) {
    if (e.tag === Y) {
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
  function vh(e) {
    return e.tag === S ? e.stateNode.containerInfo : null;
  }
  function Cx(e) {
    return Ci(e) === e;
  }
  function Dx(e) {
    {
      var t = Rx.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", we(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = cl(e);
    return r ? Ci(r) === r : !1;
  }
  function hh(e) {
    if (Ci(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function yh(e) {
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
            return hh(i), e;
          if (u === r)
            return hh(i), t;
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
  function gh(e) {
    var t = yh(e);
    return t !== null ? bh(t) : null;
  }
  function bh(e) {
    if (e.tag === z || e.tag === W)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = bh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function Tx(e) {
    var t = yh(e);
    return t !== null ? Nh(t) : null;
  }
  function Nh(e) {
    if (e.tag === z || e.tag === W)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== M) {
        var n = Nh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Eh = m.unstable_scheduleCallback, jx = m.unstable_cancelCallback, wx = m.unstable_shouldYield, _x = m.unstable_requestPaint, Kt = m.unstable_now, Ox = m.unstable_getCurrentPriorityLevel, Ns = m.unstable_ImmediatePriority, Kf = m.unstable_UserBlockingPriority, Di = m.unstable_NormalPriority, Lx = m.unstable_LowPriority, Xf = m.unstable_IdlePriority, Vx = m.unstable_yieldValue, Mx = m.unstable_setDisableYieldValue, ml = null, gn = null, ie = null, Pa = !1, xa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function Ax(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      bt && (e = Ue({}, e, {
        getLaneLabelMap: Bx,
        injectProfilingHooks: Hx
      })), ml = t.inject(e), gn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function kx(e, t) {
    if (gn && typeof gn.onScheduleFiberRoot == "function")
      try {
        gn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function Ux(e, t) {
    if (gn && typeof gn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Ke) === Ke;
        if (It) {
          var a;
          switch (t) {
            case Qn:
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
          gn.onCommitFiberRoot(ml, e, a, n);
        }
      } catch (r) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function Fx(e) {
    if (gn && typeof gn.onPostCommitFiberRoot == "function")
      try {
        gn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function zx(e) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Xt(e) {
    if (typeof Vx == "function" && (Mx(e), b(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(ml, e);
      } catch (t) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Hx(e) {
    ie = e;
  }
  function Bx() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Zf; n++) {
        var a = oS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function Px(e) {
    ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
  }
  function xh() {
    ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
  }
  function jo(e) {
    ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
  }
  function vl() {
    ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
  }
  function $x(e) {
    ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
  }
  function Yx() {
    ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
  }
  function Ix(e) {
    ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
  }
  function qx() {
    ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
  }
  function Gx(e) {
    ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
  }
  function Wx() {
    ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
  }
  function Sh(e) {
    ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
  }
  function Rh() {
    ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
  }
  function Qx(e, t, n) {
    ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, n);
  }
  function Kx(e, t, n) {
    ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, n);
  }
  function Xx(e) {
    ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
  }
  function Jx() {
    ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
  }
  function Zx(e) {
    ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
  }
  function eS() {
    ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
  }
  function Ch(e) {
    ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
  }
  function tS() {
    ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
  }
  function Dh() {
    ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
  }
  function nS(e) {
    ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
  }
  function aS(e, t) {
    ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
  }
  function Jf(e, t) {
    ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
  }
  var ge = (
    /*                         */
    0
  ), Pe = (
    /*                 */
    1
  ), tt = (
    /*                    */
    2
  ), Ct = (
    /*               */
    8
  ), $a = (
    /*              */
    16
  ), Th = Math.clz32 ? Math.clz32 : lS, rS = Math.log, iS = Math.LN2;
  function lS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (rS(t) / iS | 0) | 0;
  }
  var Zf = 31, $ = (
    /*                        */
    0
  ), Jt = (
    /*                          */
    0
  ), Ce = (
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
  ), Ya = (
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
  ), jh = gl, Oo = (
    /*          */
    134217728
  ), wh = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), ji = (
    /*                        */
    536870912
  ), Gn = (
    /*                   */
    1073741824
  );
  function oS(e) {
    {
      if (e & Ce)
        return "Sync";
      if (e & hl)
        return "InputContinuousHydration";
      if (e & pr)
        return "InputContinuous";
      if (e & Ti)
        return "DefaultHydration";
      if (e & Ya)
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
      if (e & Gn)
        return "Offscreen";
    }
  }
  var st = -1, xs = _o, Ss = gl;
  function Vo(e) {
    switch (wi(e)) {
      case Ce:
        return Ce;
      case hl:
        return hl;
      case pr:
        return pr;
      case Ti:
        return Ti;
      case Ya:
        return Ya;
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
      case Gn:
        return Gn;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Rs(e, t) {
    var n = e.pendingLanes;
    if (n === $)
      return $;
    var a = $, r = e.suspendedLanes, i = e.pingedLanes, l = n & wh;
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
      var v = wi(a), x = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === Ya && (x & yl) !== $
      )
        return t;
    }
    (a & pr) !== $ && (a |= n & Ya);
    var E = e.entangledLanes;
    if (E !== $)
      for (var O = e.entanglements, V = a & E; V > 0; ) {
        var U = _i(V), ae = 1 << U;
        a |= O[U], V &= ~ae;
      }
    return a;
  }
  function uS(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function sS(e, t) {
    switch (e) {
      case Ce:
      case hl:
      case pr:
        return t + 250;
      case Ti:
      case Ya:
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
        return st;
      case Oo:
      case Lo:
      case ji:
      case Gn:
        return st;
      default:
        return f("Should have found matching lanes. This is a bug in React."), st;
    }
  }
  function cS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o, p = i[o];
      p === st ? ((u & a) === $ || (u & r) !== $) && (i[o] = sS(u, t)) : p <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function fS(e) {
    return Vo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== $ ? t : t & Gn ? Gn : $;
  }
  function dS(e) {
    return (e & Ce) !== $;
  }
  function Nd(e) {
    return (e & wh) !== $;
  }
  function _h(e) {
    return (e & Es) === e;
  }
  function pS(e) {
    var t = Ce | pr | Ya;
    return (e & t) === $;
  }
  function mS(e) {
    return (e & yl) === e;
  }
  function Cs(e, t) {
    var n = hl | pr | Ti | Ya;
    return (t & n) !== $;
  }
  function vS(e, t) {
    return (t & e.expiredLanes) !== $;
  }
  function Oh(e) {
    return (e & yl) !== $;
  }
  function Lh() {
    var e = xs;
    return xs <<= 1, (xs & yl) === $ && (xs = _o), e;
  }
  function hS() {
    var e = Ss;
    return Ss <<= 1, (Ss & Es) === $ && (Ss = gl), e;
  }
  function wi(e) {
    return e & -e;
  }
  function Mo(e) {
    return wi(e);
  }
  function _i(e) {
    return 31 - Th(e);
  }
  function Ed(e) {
    return _i(e);
  }
  function Wn(e, t) {
    return (e & t) !== $;
  }
  function bl(e, t) {
    return (e & t) === t;
  }
  function Ve(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Vh(e, t) {
    return e & t;
  }
  function b_(e) {
    return e;
  }
  function yS(e, t) {
    return e !== Jt && e < t ? e : t;
  }
  function xd(e) {
    for (var t = [], n = 0; n < Zf; n++)
      t.push(e);
    return t;
  }
  function Ao(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = $, e.pingedLanes = $);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function gS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function Mh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function bS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o;
      a[o] = $, r[o] = st, i[o] = st, l &= ~u;
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
  function NS(e, t) {
    var n = wi(t), a;
    switch (n) {
      case pr:
        a = hl;
        break;
      case Ya:
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
        a = Jt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Jt ? Jt : a;
  }
  function Ah(e, t, n) {
    if (xa)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Ed(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function kh(e, t) {
    if (xa)
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
  var Qn = Ce, mr = pr, vr = Ya, Ts = ji, ko = Jt;
  function Sa() {
    return ko;
  }
  function Zt(e) {
    ko = e;
  }
  function ES(e, t) {
    var n = ko;
    try {
      return ko = e, t();
    } finally {
      ko = n;
    }
  }
  function xS(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function SS(e, t) {
    return e > t ? e : t;
  }
  function Rd(e, t) {
    return e !== 0 && e < t;
  }
  function Fh(e) {
    var t = wi(e);
    return Rd(Qn, t) ? Rd(mr, t) ? Nd(t) ? vr : Ts : mr : Qn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var zh;
  function RS(e) {
    zh = e;
  }
  function CS(e) {
    zh(e);
  }
  var Cd;
  function DS(e) {
    Cd = e;
  }
  var Hh;
  function TS(e) {
    Hh = e;
  }
  var Bh;
  function jS(e) {
    Bh = e;
  }
  var Ph;
  function wS(e) {
    Ph = e;
  }
  var Dd = !1, ws = [], Ur = null, Fr = null, zr = null, Uo = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Map(), Hr = [], _S = [
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
  function OS(e) {
    return _S.indexOf(e) > -1;
  }
  function LS(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function $h(e, t) {
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
      var l = LS(t, n, a, r, i);
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
  function VS(e, t, n, a, r) {
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
  function Yh(e) {
    var t = Vi(e.target);
    if (t !== null) {
      var n = Ci(t);
      if (n !== null) {
        var a = n.tag;
        if (a === Y) {
          var r = mh(n);
          if (r !== null) {
            e.blockedOn = r, Ph(e.priority, function() {
              Hh(n);
            });
            return;
          }
        } else if (a === S) {
          var i = n.stateNode;
          if (js(i)) {
            e.blockedOn = vh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function MS(e) {
    for (var t = Bh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Hr.length && Rd(t, Hr[a].priority); a++)
      ;
    Hr.splice(a, 0, n), a === 0 && Yh(n);
  }
  function _s(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = wd(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        ox(i), r.target.dispatchEvent(i), ux();
      } else {
        var l = $r(a);
        return l !== null && Cd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Ih(e, t, n) {
    _s(e) && n.delete(t);
  }
  function AS() {
    Dd = !1, Ur !== null && _s(Ur) && (Ur = null), Fr !== null && _s(Fr) && (Fr = null), zr !== null && _s(zr) && (zr = null), Uo.forEach(Ih), Fo.forEach(Ih);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, AS)));
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
      Yh(l), l.blockedOn === null && Hr.shift();
    }
  }
  var Nl = h.ReactCurrentBatchConfig, Td = !0;
  function qh(e) {
    Td = !!e;
  }
  function kS() {
    return Td;
  }
  function US(e, t, n) {
    var a = Gh(t), r;
    switch (a) {
      case Qn:
        r = FS;
        break;
      case mr:
        r = zS;
        break;
      case vr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function FS(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Zt(Qn), jd(e, t, n, a);
    } finally {
      Zt(r), Nl.transition = i;
    }
  }
  function zS(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Zt(mr), jd(e, t, n, a);
    } finally {
      Zt(r), Nl.transition = i;
    }
  }
  function jd(e, t, n, a) {
    Td && HS(e, t, n, a);
  }
  function HS(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      $d(e, t, a, Os, n), $h(e, a);
      return;
    }
    if (VS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if ($h(e, a), t & xo && OS(e)) {
      for (; r !== null; ) {
        var i = $r(r);
        i !== null && CS(i);
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
        if (o === Y) {
          var u = mh(l);
          if (u !== null)
            return u;
          i = null;
        } else if (o === S) {
          var p = l.stateNode;
          if (js(p))
            return vh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Os = i, null;
  }
  function Gh(e) {
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
        return Qn;
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
        var t = Ox();
        switch (t) {
          case Ns:
            return Qn;
          case Kf:
            return mr;
          case Di:
          case Lx:
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
  function BS(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function PS(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function $S(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function YS(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Po = null, _d = null, $o = null;
  function IS(e) {
    return Po = e, _d = Qh(), !0;
  }
  function qS() {
    Po = null, _d = null, $o = null;
  }
  function Wh() {
    if ($o)
      return $o;
    var e, t = _d, n = t.length, a, r = Qh(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var o = a > 1 ? 1 - a : void 0;
    return $o = r.slice(e, o), $o;
  }
  function Qh() {
    return "value" in Po ? Po.value : Po.textContent;
  }
  function Ls(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function Vs() {
    return !0;
  }
  function Kh() {
    return !1;
  }
  function Kn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var o in e)
        if (e.hasOwnProperty(o)) {
          var u = e[o];
          u ? this[o] = u(i) : this[o] = i[o];
        }
      var p = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return p ? this.isDefaultPrevented = Vs : this.isDefaultPrevented = Kh, this.isPropagationStopped = Kh, this;
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
  }, Od = Kn(El), Yo = Ue({}, El, {
    view: 0,
    detail: 0
  }), GS = Kn(Yo), Ld, Vd, Io;
  function WS(e) {
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
      return "movementX" in e ? e.movementX : (WS(e), Ld);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Vd;
    }
  }), Xh = Kn(Ms), QS = Ue({}, Ms, {
    dataTransfer: 0
  }), KS = Kn(QS), XS = Ue({}, Yo, {
    relatedTarget: 0
  }), Md = Kn(XS), JS = Ue({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ZS = Kn(JS), eR = Ue({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), tR = Kn(eR), nR = Ue({}, El, {
    data: 0
  }), Jh = Kn(nR), aR = Jh, rR = {
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
  }, iR = {
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
  function lR(e) {
    if (e.key) {
      var t = rR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ls(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? iR[e.keyCode] || "Unidentified" : "";
  }
  var oR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function uR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = oR[e];
    return a ? !!n[a] : !1;
  }
  function Ad(e) {
    return uR;
  }
  var sR = Ue({}, Yo, {
    key: lR,
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
  }), cR = Kn(sR), fR = Ue({}, Ms, {
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
  }), Zh = Kn(fR), dR = Ue({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ad
  }), pR = Kn(dR), mR = Ue({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vR = Kn(mR), hR = Ue({}, Ms, {
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
  }), yR = Kn(hR), gR = [9, 13, 27, 32], ey = 229, kd = an && "CompositionEvent" in window, qo = null;
  an && "documentMode" in document && (qo = document.documentMode);
  var bR = an && "TextEvent" in window && !qo, ty = an && (!kd || qo && qo > 8 && qo <= 11), ny = 32, ay = String.fromCharCode(ny);
  function NR() {
    tn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), tn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), tn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), tn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var ry = !1;
  function ER(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function xR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function SR(e, t) {
    return e === "keydown" && t.keyCode === ey;
  }
  function iy(e, t) {
    switch (e) {
      case "keyup":
        return gR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== ey;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ly(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function oy(e) {
    return e.locale === "ko";
  }
  var xl = !1;
  function RR(e, t, n, a, r) {
    var i, l;
    if (kd ? i = xR(t) : xl ? iy(t, a) && (i = "onCompositionEnd") : SR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ty && !oy(a) && (!xl && i === "onCompositionStart" ? xl = IS(r) : i === "onCompositionEnd" && xl && (l = Wh()));
    var o = zs(n, i);
    if (o.length > 0) {
      var u = new Jh(i, t, null, a, r);
      if (e.push({
        event: u,
        listeners: o
      }), l)
        u.data = l;
      else {
        var p = ly(a);
        p !== null && (u.data = p);
      }
    }
  }
  function CR(e, t) {
    switch (e) {
      case "compositionend":
        return ly(t);
      case "keypress":
        var n = t.which;
        return n !== ny ? null : (ry = !0, ay);
      case "textInput":
        var a = t.data;
        return a === ay && ry ? null : a;
      default:
        return null;
    }
  }
  function DR(e, t) {
    if (xl) {
      if (e === "compositionend" || !kd && iy(e, t)) {
        var n = Wh();
        return qS(), xl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!ER(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ty && !oy(t) ? null : t.data;
      default:
        return null;
    }
  }
  function TR(e, t, n, a, r) {
    var i;
    if (bR ? i = CR(t, a) : i = DR(t, a), !i)
      return null;
    var l = zs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new aR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function jR(e, t, n, a, r, i, l) {
    RR(e, t, n, a, r), TR(e, t, n, a, r);
  }
  var wR = {
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
  function uy(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!wR[e.type] : t === "textarea";
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
  function _R(e) {
    if (!an)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function OR() {
    tn("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function sy(e, t, n, a) {
    ih(a);
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
  function LR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function VR(e) {
    var t = [];
    sy(t, Wo, e, Af(e)), sh(MR, t);
  }
  function MR(e) {
    Ty(e, 0);
  }
  function As(e) {
    var t = jl(e);
    if (ho(t))
      return e;
  }
  function AR(e, t) {
    if (e === "change")
      return t;
  }
  var cy = !1;
  an && (cy = _R("input") && (!document.documentMode || document.documentMode > 9));
  function kR(e, t) {
    Go = e, Wo = t, Go.attachEvent("onpropertychange", dy);
  }
  function fy() {
    Go && (Go.detachEvent("onpropertychange", dy), Go = null, Wo = null);
  }
  function dy(e) {
    e.propertyName === "value" && As(Wo) && VR(e);
  }
  function UR(e, t, n) {
    e === "focusin" ? (fy(), kR(t, n)) : e === "focusout" && fy();
  }
  function FR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Wo);
  }
  function zR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function HR(e, t) {
    if (e === "click")
      return As(t);
  }
  function BR(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function PR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || be(e, "number", e.value);
  }
  function $R(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window, u, p;
    if (LR(o) ? u = AR : uy(o) ? cy ? u = BR : (u = FR, p = UR) : zR(o) && (u = HR), u) {
      var v = u(t, n);
      if (v) {
        sy(e, v, a, r);
        return;
      }
    }
    p && p(t, o, n), t === "focusout" && PR(o);
  }
  function YR() {
    nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function IR(e, t, n, a, r, i, l) {
    var o = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (o && !sx(a)) {
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
        var ae = Xh, he = "onMouseLeave", de = "onMouseEnter", Ye = "mouse";
        (t === "pointerout" || t === "pointerover") && (ae = Zh, he = "onPointerLeave", de = "onPointerEnter", Ye = "pointer");
        var ze = E == null ? v : jl(E), j = O == null ? v : jl(O), F = new ae(he, Ye + "leave", E, a, r);
        F.target = ze, F.relatedTarget = j;
        var w = null, q = Vi(r);
        if (q === n) {
          var oe = new ae(de, Ye + "enter", O, a, r);
          oe.target = j, oe.relatedTarget = ze, w = oe;
        }
        vC(e, F, w, E, O);
      }
    }
  }
  function qR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Xn = typeof Object.is == "function" ? Object.is : qR;
  function Qo(e, t) {
    if (Xn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!kn.call(t, i) || !Xn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function py(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function GR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function my(e, t) {
    for (var n = py(e), a = 0, r = 0; n; ) {
      if (n.nodeType === ur) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = py(GR(n));
    }
  }
  function WR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, o = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return QR(e, r, i, l, o);
  }
  function QR(e, t, n, a, r) {
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
  function KR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), o = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > o) {
        var u = o;
        o = l, l = u;
      }
      var p = my(e, l), v = my(e, o);
      if (p && v) {
        if (r.rangeCount === 1 && r.anchorNode === p.node && r.anchorOffset === p.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var x = n.createRange();
        x.setStart(p.node, p.offset), r.removeAllRanges(), l > o ? (r.addRange(x), r.extend(v.node, v.offset)) : (x.setEnd(v.node, v.offset), r.addRange(x));
      }
    }
  }
  function vy(e) {
    return e && e.nodeType === ur;
  }
  function hy(e, t) {
    return !e || !t ? !1 : e === t ? !0 : vy(e) ? !1 : vy(t) ? hy(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function XR(e) {
    return e && e.ownerDocument && hy(e.ownerDocument.documentElement, e);
  }
  function JR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function yy() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (JR(t))
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
  function ZR() {
    var e = yy();
    return {
      focusedElem: e,
      selectionRange: Ud(e) ? tC(e) : null
    };
  }
  function eC(e) {
    var t = yy(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && XR(n)) {
      a !== null && Ud(n) && nC(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === zn && r.push({
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
  function tC(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = WR(e), t || {
      start: 0,
      end: 0
    };
  }
  function nC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : KR(e, t);
  }
  var aC = an && "documentMode" in document && document.documentMode <= 11;
  function rC() {
    tn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Sl = null, Fd = null, Ko = null, zd = !1;
  function iC(e) {
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
  function lC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function gy(e, t, n) {
    var a = lC(n);
    if (!(zd || Sl == null || Sl !== ir(a))) {
      var r = iC(Sl);
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
  function oC(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (uy(o) || o.contentEditable === "true") && (Sl = o, Fd = n, Ko = null);
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
        zd = !1, gy(e, a, r);
        break;
      case "selectionchange":
        if (aC)
          break;
      case "keydown":
      case "keyup":
        gy(e, a, r);
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
  }, Hd = {}, by = {};
  an && (by = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
  function Us(e) {
    if (Hd[e])
      return Hd[e];
    if (!Rl[e])
      return e;
    var t = Rl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in by)
        return Hd[e] = t[n];
    return e;
  }
  var Ny = Us("animationend"), Ey = Us("animationiteration"), xy = Us("animationstart"), Sy = Us("transitionend"), Ry = /* @__PURE__ */ new Map(), Cy = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Br(e, t) {
    Ry.set(e, t), tn(t, [e]);
  }
  function uC() {
    for (var e = 0; e < Cy.length; e++) {
      var t = Cy[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Br(n, "on" + a);
    }
    Br(Ny, "onAnimationEnd"), Br(Ey, "onAnimationIteration"), Br(xy, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(Sy, "onTransitionEnd");
  }
  function sC(e, t, n, a, r, i, l) {
    var o = Ry.get(t);
    if (o !== void 0) {
      var u = Od, p = t;
      switch (t) {
        case "keypress":
          if (Ls(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = cR;
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
          u = Xh;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          u = KS;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = pR;
          break;
        case Ny:
        case Ey:
        case xy:
          u = ZS;
          break;
        case Sy:
          u = vR;
          break;
        case "scroll":
          u = GS;
          break;
        case "wheel":
          u = yR;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = tR;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          u = Zh;
          break;
      }
      var v = (i & xo) !== 0;
      {
        var x = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", E = pC(n, o, a.type, v, x);
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
  uC(), YR(), OR(), rC(), NR();
  function cC(e, t, n, a, r, i, l) {
    sC(e, t, n, a, r, i);
    var o = (i & lx) === 0;
    o && (IR(e, t, n, a, r), $R(e, t, n, a, r), oC(e, t, n, a, r), jR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function Dy(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, gx(a, t, void 0, e), e.currentTarget = null;
  }
  function fC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, o = i.currentTarget, u = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Dy(e, u, o), a = l;
      }
    else
      for (var p = 0; p < t.length; p++) {
        var v = t[p], x = v.instance, E = v.currentTarget, O = v.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        Dy(e, O, E), a = x;
      }
  }
  function Ty(e, t) {
    for (var n = (t & xo) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      fC(i, l, n);
    }
    bx();
  }
  function dC(e, t, n, a, r) {
    var i = Af(n), l = [];
    cC(l, e, a, n, i, t), Ty(l, t);
  }
  function mt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = P0(t), r = hC(e);
    a.has(r) || (jy(t, e, Mf, n), a.add(r));
  }
  function Pd(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= xo), jy(n, e, a, t);
  }
  var Fs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[Fs]) {
      e[Fs] = !0, Ua.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || Pd(n, !1, e), Pd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[Fs] || (t[Fs] = !0, Pd("selectionchange", !1, t)));
    }
  }
  function jy(e, t, n, a, r) {
    var i = US(e, t, n), l = void 0;
    Ff && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? $S(e, t, i, l) : PS(e, t, i) : l !== void 0 ? YS(e, t, i, l) : BS(e, t, i);
  }
  function wy(e, t) {
    return e === t || e.nodeType === _t && e.parentNode === t;
  }
  function $d(e, t, n, a, r) {
    var i = a;
    if (!(t & ah) && !(t & Mf)) {
      var l = r;
      if (a !== null) {
        var o = a;
        e: for (; ; ) {
          if (o === null)
            return;
          var u = o.tag;
          if (u === S || u === M) {
            var p = o.stateNode.containerInfo;
            if (wy(p, l))
              break;
            if (u === M)
              for (var v = o.return; v !== null; ) {
                var x = v.tag;
                if (x === S || x === M) {
                  var E = v.stateNode.containerInfo;
                  if (wy(E, l))
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
    sh(function() {
      return dC(e, t, n, i);
    });
  }
  function Zo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function pC(e, t, n, a, r, i) {
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
  function mC(e, t) {
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
  function _y(e, t, n, a, r) {
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
  function vC(e, t, n, a, r) {
    var i = a && r ? mC(a, r) : null;
    a !== null && _y(e, t, a, i, !1), r !== null && n !== null && _y(e, n, r, i, !0);
  }
  function hC(e, t) {
    return e + "__bubble";
  }
  var Hn = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Pr = "suppressHydrationWarning", Oy = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Ly, $s, Vy, My;
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
    ZE(e, t), ex(e, t), ix(e, t, {
      registrationNameDependencies: en,
      possibleRegistrationNames: In
    });
  }, Vy = an && !document.documentMode, tu = function(e, t, n) {
    if (!Hn) {
      var a = Ys(n), r = Ys(t);
      r !== a && (Hn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ly = function(e) {
    if (!Hn) {
      Hn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, $s = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, My = function(e, t) {
    var n = e.namespaceURI === or ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var yC = /\r\n?/g, gC = /\u0000|\uFFFD/g;
  function Ys(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(yC, `
`).replace(gC, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (Hn || (Hn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && Ne))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Ay(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function bC() {
  }
  function qs(e) {
    e.onclick = bC;
  }
  function NC(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Li)
          l && Object.freeze(l), Xv(t, l);
        else if (i === eu) {
          var o = l ? l[Bs] : void 0;
          o != null && qv(t, o);
        } else if (i === Oi)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && vs(t, l);
          } else typeof l == "number" && vs(t, "" + l);
        else i === Hs || i === Pr || i === Oy || (en.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && mt("scroll", t)) : l != null && ga(t, i, l, r));
      }
  }
  function EC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Xv(e, l) : i === eu ? qv(e, l) : i === Oi ? vs(e, l) : ga(e, i, l, a);
    }
  }
  function xC(e, t, n, a) {
    var r, i = Ay(n), l, o = a;
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
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !kn.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function SC(e, t) {
    return Ay(t).createTextNode(e);
  }
  function RC(e, t, n, a) {
    var r = Ni(t, n);
    Ps(t, n);
    var i;
    switch (t) {
      case "dialog":
        mt("cancel", e), mt("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        mt("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < Xo.length; l++)
          mt(Xo[l], e);
        i = n;
        break;
      case "source":
        mt("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        mt("error", e), mt("load", e), i = n;
        break;
      case "details":
        mt("toggle", e), i = n;
        break;
      case "input":
        ds(e, n), i = yo(e, n), mt("invalid", e);
        break;
      case "option":
        et(e, n), i = n;
        break;
      case "select":
        No(e, n), i = bo(e, n), mt("invalid", e);
        break;
      case "textarea":
        $v(e, n), i = Df(e, n), mt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Vf(t, i), NC(t, e, a, i, r), t) {
      case "input":
        gi(e), L(e, n, !1);
        break;
      case "textarea":
        gi(e), Iv(e);
        break;
      case "option":
        ot(e, n);
        break;
      case "select":
        Rf(e, n);
        break;
      default:
        typeof i.onClick == "function" && qs(e);
        break;
    }
  }
  function CC(e, t, n, a, r) {
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
        } else u === eu || u === Oi || u === Hs || u === Pr || u === Oy || (en.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
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
        } else u === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(u, "" + E) : u === Hs || u === Pr || (en.hasOwnProperty(u) ? (E != null && (typeof E != "function" && $s(u, E), u === "onScroll" && mt("scroll", e)), !i && O !== E && (i = [])) : (i = i || []).push(u, E));
    }
    return v && (IE(v, o[Li]), (i = i || []).push(Li, v)), i;
  }
  function DC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && c(e, r);
    var i = Ni(n, a), l = Ni(n, r);
    switch (EC(e, t, i, l), n) {
      case "input":
        y(e, r);
        break;
      case "textarea":
        Yv(e, r);
        break;
      case "select":
        ps(e, r);
        break;
    }
  }
  function TC(e) {
    {
      var t = e.toLowerCase();
      return hs.hasOwnProperty(t) && hs[t] || null;
    }
  }
  function jC(e, t, n, a, r, i, l) {
    var o, u;
    switch (o = Ni(t, n), Ps(t, n), t) {
      case "dialog":
        mt("cancel", e), mt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        mt("load", e);
        break;
      case "video":
      case "audio":
        for (var p = 0; p < Xo.length; p++)
          mt(Xo[p], e);
        break;
      case "source":
        mt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        mt("error", e), mt("load", e);
        break;
      case "details":
        mt("toggle", e);
        break;
      case "input":
        ds(e, n), mt("invalid", e);
        break;
      case "option":
        et(e, n);
        break;
      case "select":
        No(e, n), mt("invalid", e);
        break;
      case "textarea":
        $v(e, n), mt("invalid", e);
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
        else if (en.hasOwnProperty(V))
          U != null && (typeof U != "function" && $s(V, U), V === "onScroll" && mt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var ae = void 0, he = St(V);
          if (n[Pr] !== !0) {
            if (!(V === Hs || V === Pr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === eu) {
                var de = e.innerHTML, Ye = U ? U[Bs] : void 0;
                if (Ye != null) {
                  var ze = My(e, Ye);
                  ze !== de && tu(V, de, ze);
                }
              } else if (V === Li) {
                if (u.delete(V), Vy) {
                  var j = $E(U);
                  ae = e.getAttribute("style"), j !== ae && tu(V, ae, j);
                }
              } else if (o && !vt)
                u.delete(V.toLowerCase()), ae = ci(e, V, U), U !== ae && tu(V, ae, U);
              else if (!Nt(V, he, o) && !hn(V, U, he, o)) {
                var F = !1;
                if (he !== null)
                  u.delete(he.attributeName), ae = Xi(e, V, U, he);
                else {
                  var w = a;
                  if (w === or && (w = jf(t)), w === or)
                    u.delete(V.toLowerCase());
                  else {
                    var q = TC(V);
                    q !== null && q !== V && (F = !0, u.delete(q)), u.delete(V);
                  }
                  ae = ci(e, V, U);
                }
                var oe = vt;
                !oe && U !== ae && !F && tu(V, ae, U);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Pr] !== !0 && Ly(u), t) {
      case "input":
        gi(e), L(e, n, !0);
        break;
      case "textarea":
        gi(e), Iv(e);
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
  function wC(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Id(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function qd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t, n) {
    {
      if (Hn)
        return;
      Hn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Wd(e, t) {
    {
      if (t === "" || Hn)
        return;
      Hn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function _C(e, t, n) {
    switch (t) {
      case "input":
        k(e, n);
        return;
      case "textarea":
        RE(e, n);
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
    var OC = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], ky = [
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
    ], LC = ky.concat(["button"]), VC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Uy = {
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
      var n = Ue({}, e || Uy), a = {
        tag: t
      };
      return ky.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), LC.indexOf(t) !== -1 && (n.pTagInButtonScope = null), OC.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var MC = function(e, t) {
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
          return VC.indexOf(t) === -1;
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
    }, AC = function(e, t) {
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
    }, Fy = {};
    nu = function(e, t, n) {
      n = n || Uy;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = MC(e, r) ? null : a, l = i ? null : AC(e, n), o = i || l;
      if (o) {
        var u = o.tag, p = !!i + "|" + e + "|" + u;
        if (!Fy[p]) {
          Fy[p] = !0;
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
  var Gs = "suppressHydrationWarning", Ws = "$", Qs = "/$", ru = "$?", iu = "$!", kC = "style", Qd = null, Kd = null;
  function UC(e) {
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
        var i = a === _t ? e.parentNode : e, l = i.namespaceURI || null;
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
  function FC(e, t, n) {
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
  function zC(e) {
    Qd = kS(), Kd = ZR();
    var t = null;
    return qh(!1), t;
  }
  function HC(e) {
    eC(Kd), qh(Qd), Qd = null, Kd = null;
  }
  function BC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (nu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var o = "" + t.children, u = au(l.ancestorInfo, e);
        nu(null, o, u);
      }
      i = l.namespace;
    }
    var p = xC(e, t, n, i);
    return uu(r, p), rp(p, t), p;
  }
  function PC(e, t) {
    e.appendChild(t);
  }
  function $C(e, t, n, a, r) {
    switch (RC(e, t, n, a), t) {
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
  function YC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var o = "" + a.children, u = au(l.ancestorInfo, t);
        nu(null, o, u);
      }
    }
    return CC(e, t, n, a);
  }
  function Xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function IC(e, t, n, a) {
    {
      var r = n;
      nu(null, e, r.ancestorInfo);
    }
    var i = SC(e, t);
    return uu(a, i), i;
  }
  function qC() {
    var e = window.event;
    return e === void 0 ? vr : Gh(e.type);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, GC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, zy = typeof Promise == "function" ? Promise : void 0, WC = typeof queueMicrotask == "function" ? queueMicrotask : typeof zy < "u" ? function(e) {
    return zy.resolve(null).then(e).catch(QC);
  } : Jd;
  function QC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function KC(e, t, n, a) {
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
  function XC(e, t, n, a, r, i) {
    DC(e, t, n, a, r), rp(e, r);
  }
  function Hy(e) {
    vs(e, "");
  }
  function JC(e, t, n) {
    e.nodeValue = n;
  }
  function ZC(e, t) {
    e.appendChild(t);
  }
  function e0(e, t) {
    var n;
    e.nodeType === _t ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function t0(e, t, n) {
    e.insertBefore(t, n);
  }
  function n0(e, t, n) {
    e.nodeType === _t ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function a0(e, t) {
    e.removeChild(t);
  }
  function r0(e, t) {
    e.nodeType === _t ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ep(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === _t) {
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
  function i0(e, t) {
    e.nodeType === _t ? ep(e.parentNode, t) : e.nodeType === zn && ep(e, t), Bo(e);
  }
  function l0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function o0(e) {
    e.nodeValue = "";
  }
  function u0(e, t) {
    e = e;
    var n = t[kC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Of("display", a);
  }
  function s0(e, t) {
    e.nodeValue = t;
  }
  function c0(e) {
    e.nodeType === zn ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function f0(e, t, n) {
    return e.nodeType !== zn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function d0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function p0(e) {
    return e.nodeType !== _t ? null : e;
  }
  function By(e) {
    return e.data === ru;
  }
  function tp(e) {
    return e.data === iu;
  }
  function m0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function v0(e, t) {
    e._reactRetry = t;
  }
  function Ks(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === zn || t === ur)
        break;
      if (t === _t) {
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
  function h0(e) {
    return Ks(e.firstChild);
  }
  function y0(e) {
    return Ks(e.firstChild);
  }
  function g0(e) {
    return Ks(e.nextSibling);
  }
  function b0(e, t, n, a, r, i, l) {
    uu(i, e), rp(e, n);
    var o;
    {
      var u = r;
      o = u.namespace;
    }
    var p = (i.mode & Pe) !== ge;
    return jC(e, t, n, o, a, p, l);
  }
  function N0(e, t, n, a) {
    return uu(n, e), n.mode & Pe, wC(e, t);
  }
  function E0(e, t) {
    uu(t, e);
  }
  function x0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === _t) {
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
  function Py(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === _t) {
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
  function S0(e) {
    Bo(e);
  }
  function R0(e) {
    Bo(e);
  }
  function C0(e) {
    return e !== "head" && e !== "body";
  }
  function D0(e, t, n, a) {
    var r = !0;
    Is(t.nodeValue, n, a, r);
  }
  function T0(e, t, n, a, r, i) {
    if (t[Gs] !== !0) {
      var l = !0;
      Is(a.nodeValue, r, i, l);
    }
  }
  function j0(e, t) {
    t.nodeType === zn ? Id(e, t) : t.nodeType === _t || qd(e, t);
  }
  function w0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === zn ? Id(n, t) : t.nodeType === _t || qd(n, t));
    }
  }
  function _0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === zn ? Id(n, a) : a.nodeType === _t || qd(n, a));
  }
  function O0(e, t, n) {
    Gd(e, t);
  }
  function L0(e, t) {
    Wd(e, t);
  }
  function V0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Gd(a, t);
    }
  }
  function M0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Wd(n, t);
    }
  }
  function A0(e, t, n, a, r, i) {
    (i || t[Gs] !== !0) && Gd(n, a);
  }
  function k0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && Wd(n, a);
  }
  function U0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function F0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, z0 = "__reactListeners$" + Dl, H0 = "__reactHandles$" + Dl;
  function B0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[z0], delete e[H0];
  }
  function uu(e, t) {
    t[Tl] = e;
  }
  function Xs(e, t) {
    t[ou] = e;
  }
  function $y(e) {
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
          for (var r = Py(e); r !== null; ) {
            var i = r[Tl];
            if (i)
              return i;
            r = Py(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function $r(e) {
    var t = e[Tl] || e[ou];
    return t && (t.tag === z || t.tag === W || t.tag === Y || t.tag === S) ? t : null;
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
  function P0(e) {
    var t = e[ap];
    return t === void 0 && (t = e[ap] = /* @__PURE__ */ new Set()), t;
  }
  var Yy = {}, Iy = h.ReactDebugCurrentFrame;
  function Zs(e) {
    if (e) {
      var t = e._owner, n = co(e.type, e._source, t ? t.type : null);
      Iy.setExtraStackFrame(n);
    } else
      Iy.setExtraStackFrame(null);
  }
  function Ra(e, t, n, a, r) {
    {
      var i = Function.call.bind(kn);
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
          o && !(o instanceof Error) && (Zs(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof o), Zs(null)), o instanceof Error && !(o.message in Yy) && (Yy[o.message] = !0, Zs(r), f("Failed %s type: %s", n, o.message), Zs(null));
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
  function bn(e, t) {
    if (hr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ec[hr] && f("Unexpected Fiber popped."), e.current = ip[hr], ip[hr] = null, ec[hr] = null, hr--;
  }
  function Nn(e, t, n) {
    hr++, ip[hr] = e.current, ec[hr] = n, e.current = t;
  }
  var lp;
  lp = {};
  var Jn = {};
  Object.freeze(Jn);
  var yr = Yr(Jn), Ia = Yr(!1), op = Jn;
  function wl(e, t, n) {
    return n && qa(t) ? op : yr.current;
  }
  function qy(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function _l(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return Jn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var o = we(e) || "Unknown";
        Ra(a, i, "context", o);
      }
      return r && qy(e, t, i), i;
    }
  }
  function tc() {
    return Ia.current;
  }
  function qa(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function nc(e) {
    bn(Ia, e), bn(yr, e);
  }
  function up(e) {
    bn(Ia, e), bn(yr, e);
  }
  function Gy(e, t, n) {
    {
      if (yr.current !== Jn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      Nn(yr, t, e), Nn(Ia, n, e);
    }
  }
  function Wy(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = we(e) || "Unknown";
          lp[i] || (lp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var o in l)
        if (!(o in r))
          throw new Error((we(e) || "Unknown") + '.getChildContext(): key "' + o + '" is not defined in childContextTypes.');
      {
        var u = we(e) || "Unknown";
        Ra(r, l, "child context", u);
      }
      return Ue({}, n, l);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Jn;
      return op = yr.current, Nn(yr, n, e), Nn(Ia, Ia.current, e), !0;
    }
  }
  function Qy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Wy(e, t, op);
        a.__reactInternalMemoizedMergedChildContext = r, bn(Ia, e), bn(yr, e), Nn(yr, r, e), Nn(Ia, n, e);
      } else
        bn(Ia, e), Nn(Ia, n, e);
    }
  }
  function $0(e) {
    {
      if (!Cx(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case S:
            return t.stateNode.context;
          case T: {
            var n = t.type;
            if (qa(n))
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
  function Ky(e) {
    gr === null ? gr = [e] : gr.push(e);
  }
  function Y0(e) {
    sp = !0, Ky(e);
  }
  function Xy() {
    sp && qr();
  }
  function qr() {
    if (!cp && gr !== null) {
      cp = !0;
      var e = 0, t = Sa();
      try {
        var n = !0, a = gr;
        for (Zt(Qn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        gr = null, sp = !1;
      } catch (i) {
        throw gr !== null && (gr = gr.slice(e + 1)), Eh(Ns, qr), i;
      } finally {
        Zt(t), cp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, ic = null, lc = 0, oa = [], ua = 0, Mi = null, br = 1, Nr = "";
  function I0(e) {
    return ki(), (e.flags & ph) !== Ee;
  }
  function q0(e) {
    return ki(), lc;
  }
  function G0() {
    var e = Nr, t = br, n = t & ~W0(t);
    return n.toString(32) + e;
  }
  function Ai(e, t) {
    ki(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Jy(e, t, n) {
    ki(), oa[ua++] = br, oa[ua++] = Nr, oa[ua++] = Mi, Mi = e;
    var a = br, r = Nr, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, u = oc(t) + i;
    if (u > 30) {
      var p = i - i % 5, v = (1 << p) - 1, x = (l & v).toString(32), E = l >> p, O = i - p, V = oc(t) + O, U = o << O, ae = U | E, he = x + r;
      br = 1 << V | ae, Nr = he;
    } else {
      var de = o << i, Ye = de | l, ze = r;
      br = 1 << u | Ye, Nr = ze;
    }
  }
  function fp(e) {
    ki();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ai(e, n), Jy(e, n, a);
    }
  }
  function oc(e) {
    return 32 - Th(e);
  }
  function W0(e) {
    return 1 << oc(e) - 1;
  }
  function dp(e) {
    for (; e === ic; )
      ic = Ol[--Ll], Ol[Ll] = null, lc = Ol[--Ll], Ol[Ll] = null;
    for (; e === Mi; )
      Mi = oa[--ua], oa[ua] = null, Nr = oa[--ua], oa[ua] = null, br = oa[--ua], oa[ua] = null;
  }
  function Q0() {
    return ki(), Mi !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function K0(e, t) {
    ki(), oa[ua++] = br, oa[ua++] = Nr, oa[ua++] = Mi, br = t.id, Nr = t.overflow, Mi = e;
  }
  function ki() {
    on() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var ln = null, sa = null, Ca = !1, Ui = !1, Gr = null;
  function X0() {
    Ca && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Zy() {
    Ui = !0;
  }
  function J0() {
    return Ui;
  }
  function Z0(e) {
    var t = e.stateNode.containerInfo;
    return sa = y0(t), ln = e, Ca = !0, Gr = null, Ui = !1, !0;
  }
  function eD(e, t, n) {
    return sa = g0(t), ln = e, Ca = !0, Gr = null, Ui = !1, n !== null && K0(e, n), !0;
  }
  function eg(e, t) {
    switch (e.tag) {
      case S: {
        j0(e.stateNode.containerInfo, t);
        break;
      }
      case z: {
        var n = (e.mode & Pe) !== ge;
        _0(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case Y: {
        var a = e.memoizedState;
        a.dehydrated !== null && w0(a.dehydrated, t);
        break;
      }
    }
  }
  function tg(e, t) {
    eg(e, t);
    var n = r1();
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
              t.pendingProps, O0(n, a);
              break;
            case W:
              var r = t.pendingProps;
              L0(n, r);
              break;
          }
          break;
        }
        case z: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case z: {
              var u = t.type, p = t.pendingProps, v = (e.mode & Pe) !== ge;
              A0(
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
              var x = t.pendingProps, E = (e.mode & Pe) !== ge;
              k0(
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
        case Y: {
          var O = e.memoizedState, V = O.dehydrated;
          if (V !== null) switch (t.tag) {
            case z:
              var U = t.type;
              t.pendingProps, V0(V, U);
              break;
            case W:
              var ae = t.pendingProps;
              M0(V, ae);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function ng(e, t) {
    t.flags = t.flags & ~fr | Ot, pp(e, t);
  }
  function ag(e, t) {
    switch (e.tag) {
      case z: {
        var n = e.type;
        e.pendingProps;
        var a = f0(t, n);
        return a !== null ? (e.stateNode = a, ln = e, sa = h0(a), !0) : !1;
      }
      case W: {
        var r = e.pendingProps, i = d0(t, r);
        return i !== null ? (e.stateNode = i, ln = e, sa = null, !0) : !1;
      }
      case Y: {
        var l = p0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: Q0(),
            retryLane: Gn
          };
          e.memoizedState = o;
          var u = i1(l);
          return u.return = e, e.child = u, ln = e, sa = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function mp(e) {
    return (e.mode & Pe) !== ge && (e.flags & Ke) === Ee;
  }
  function vp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function hp(e) {
    if (Ca) {
      var t = sa;
      if (!t) {
        mp(e) && (pp(ln, e), vp()), ng(ln, e), Ca = !1, ln = e;
        return;
      }
      var n = t;
      if (!ag(e, t)) {
        mp(e) && (pp(ln, e), vp()), t = lu(n);
        var a = ln;
        if (!t || !ag(e, t)) {
          ng(ln, e), Ca = !1, ln = e;
          return;
        }
        tg(a, n);
      }
    }
  }
  function tD(e, t, n) {
    var a = e.stateNode, r = !Ui, i = b0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function nD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = N0(t, n, e);
    if (a) {
      var r = ln;
      if (r !== null)
        switch (r.tag) {
          case S: {
            var i = r.stateNode.containerInfo, l = (r.mode & Pe) !== ge;
            D0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case z: {
            var o = r.type, u = r.memoizedProps, p = r.stateNode, v = (r.mode & Pe) !== ge;
            T0(
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
  function aD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    E0(n, e);
  }
  function rD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return x0(n);
  }
  function rg(e) {
    for (var t = e.return; t !== null && t.tag !== z && t.tag !== S && t.tag !== Y; )
      t = t.return;
    ln = t;
  }
  function uc(e) {
    if (e !== ln)
      return !1;
    if (!Ca)
      return rg(e), Ca = !0, !1;
    if (e.tag !== S && (e.tag !== z || C0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = sa;
      if (t)
        if (mp(e))
          ig(e), vp();
        else
          for (; t; )
            tg(e, t), t = lu(t);
    }
    return rg(e), e.tag === Y ? sa = rD(e) : sa = ln ? lu(e.stateNode) : null, !0;
  }
  function iD() {
    return Ca && sa !== null;
  }
  function ig(e) {
    for (var t = sa; t; )
      eg(e, t), t = lu(t);
  }
  function Vl() {
    ln = null, sa = null, Ca = !1, Ui = !1;
  }
  function lg() {
    Gr !== null && (Zb(Gr), Gr = null);
  }
  function on() {
    return Ca;
  }
  function yp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var lD = h.ReactCurrentBatchConfig, oD = null;
  function uD() {
    return lD.transition;
  }
  var Da = {
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
    var sD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & Ct && (t = n), n = n.return;
      return t;
    }, Fi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, cu = [], fu = [], du = [], pu = [], mu = [], vu = [], zi = /* @__PURE__ */ new Set();
    Da.recordUnsafeLifecycleWarnings = function(e, t) {
      zi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && cu.push(e), e.mode & Ct && typeof t.UNSAFE_componentWillMount == "function" && fu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & Ct && typeof t.UNSAFE_componentWillReceiveProps == "function" && pu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & Ct && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Da.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(E) {
        e.add(we(E) || "Component"), zi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(we(E) || "Component"), zi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(we(E) || "Component"), zi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(we(E) || "Component"), zi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(we(E) || "Component"), zi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(we(E) || "Component"), zi.add(E.type);
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
    var sc = /* @__PURE__ */ new Map(), og = /* @__PURE__ */ new Set();
    Da.recordLegacyContextWarning = function(e, t) {
      var n = sD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!og.has(e.type)) {
        var a = sc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], sc.set(n, a)), a.push(e));
      }
    }, Da.flushLegacyContextWarning = function() {
      sc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(we(i) || "Component"), og.add(i.type);
          });
          var r = Fi(a);
          try {
            ht(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            Qt();
          }
        }
      });
    }, Da.discardPendingWarnings = function() {
      cu = [], fu = [], du = [], pu = [], mu = [], vu = [], sc = /* @__PURE__ */ new Map();
    };
  }
  var gp, bp, Np, Ep, xp, ug = function(e, t) {
  };
  gp = !1, bp = !1, Np = {}, Ep = {}, xp = {}, ug = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = we(t) || "Component";
      Ep[n] || (Ep[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function cD(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function hu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Ct || ct) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !cD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = we(e) || "Component";
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
      var t = we(e) || "Component";
      if (xp[t])
        return;
      xp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function sg(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function cg(e) {
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
        return j.flags |= ph, F;
      var q = j.alternate;
      if (q !== null) {
        var oe = q.index;
        return oe < F ? (j.flags |= Ot, F) : oe;
      } else
        return j.flags |= Ot, F;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= Ot), j;
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
      if (oe === za)
        return v(j, F, w.props.children, q, w.key);
      if (F !== null && (F.elementType === oe || // Keep this check inline so it only runs on the false path:
      vN(F, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof oe == "object" && oe !== null && oe.$$typeof === ye && sg(oe) === F.type)) {
        var re = r(F, w.props);
        return re.ref = hu(j, F, w), re.return = j, re._debugSource = w._source, re._debugOwner = w._owner, re;
      }
      var xe = hv(w, j.mode, q);
      return xe.ref = hu(j, F, w), xe.return = j, xe;
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
        var xe = r(F, w);
        return xe.return = j, xe;
      }
    }
    function x(j, F, w) {
      if (typeof F == "string" && F !== "" || typeof F == "number") {
        var q = yv("" + F, j.mode, w);
        return q.return = j, q;
      }
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case ia: {
            var oe = hv(F, j.mode, w);
            return oe.ref = hu(j, null, F), oe.return = j, oe;
          }
          case qn: {
            var re = gv(F, j.mode, w);
            return re.return = j, re;
          }
          case ye: {
            var xe = F._payload, je = F._init;
            return x(j, je(xe), w);
          }
        }
        if (Fe(F) || Na(F)) {
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
          case ia:
            return w.key === oe ? u(j, F, w, q) : null;
          case qn:
            return w.key === oe ? p(j, F, w, q) : null;
          case ye: {
            var re = w._payload, xe = w._init;
            return E(j, F, xe(re), q);
          }
        }
        if (Fe(w) || Na(w))
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
          case ia: {
            var xe = j.get(q.key === null ? w : q.key) || null;
            return u(F, xe, q, oe);
          }
          case qn: {
            var je = j.get(q.key === null ? w : q.key) || null;
            return p(F, je, q, oe);
          }
          case ye:
            var at = q._payload, Ie = q._init;
            return O(j, F, w, Ie(at), oe);
        }
        if (Fe(q) || Na(q)) {
          var Tt = j.get(w) || null;
          return v(F, Tt, q, oe, null);
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
          case ia:
          case qn:
            ug(j, w);
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
          case ye:
            var oe = j._payload, re = j._init;
            V(re(oe), F, w);
            break;
        }
      }
      return F;
    }
    function U(j, F, w, q) {
      for (var oe = null, re = 0; re < w.length; re++) {
        var xe = w[re];
        oe = V(xe, oe, j);
      }
      for (var je = null, at = null, Ie = F, Tt = 0, qe = 0, Dt = null; Ie !== null && qe < w.length; qe++) {
        Ie.index > qe ? (Dt = Ie, Ie = null) : Dt = Ie.sibling;
        var xn = E(j, Ie, w[qe], q);
        if (xn === null) {
          Ie === null && (Ie = Dt);
          break;
        }
        e && Ie && xn.alternate === null && t(j, Ie), Tt = i(xn, Tt, qe), at === null ? je = xn : at.sibling = xn, at = xn, Ie = Dt;
      }
      if (qe === w.length) {
        if (n(j, Ie), on()) {
          var mn = qe;
          Ai(j, mn);
        }
        return je;
      }
      if (Ie === null) {
        for (; qe < w.length; qe++) {
          var ea = x(j, w[qe], q);
          ea !== null && (Tt = i(ea, Tt, qe), at === null ? je = ea : at.sibling = ea, at = ea);
        }
        if (on()) {
          var Mn = qe;
          Ai(j, Mn);
        }
        return je;
      }
      for (var An = a(j, Ie); qe < w.length; qe++) {
        var Sn = O(An, j, qe, w[qe], q);
        Sn !== null && (e && Sn.alternate !== null && An.delete(Sn.key === null ? qe : Sn.key), Tt = i(Sn, Tt, qe), at === null ? je = Sn : at.sibling = Sn, at = Sn);
      }
      if (e && An.forEach(function(Jl) {
        return t(j, Jl);
      }), on()) {
        var Tr = qe;
        Ai(j, Tr);
      }
      return je;
    }
    function ae(j, F, w, q) {
      var oe = Na(w);
      if (typeof oe != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === oe && (gp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gp = !0);
        var re = oe.call(w);
        if (re)
          for (var xe = null, je = re.next(); !je.done; je = re.next()) {
            var at = je.value;
            xe = V(at, xe, j);
          }
      }
      var Ie = oe.call(w);
      if (Ie == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Tt = null, qe = null, Dt = F, xn = 0, mn = 0, ea = null, Mn = Ie.next(); Dt !== null && !Mn.done; mn++, Mn = Ie.next()) {
        Dt.index > mn ? (ea = Dt, Dt = null) : ea = Dt.sibling;
        var An = E(j, Dt, Mn.value, q);
        if (An === null) {
          Dt === null && (Dt = ea);
          break;
        }
        e && Dt && An.alternate === null && t(j, Dt), xn = i(An, xn, mn), qe === null ? Tt = An : qe.sibling = An, qe = An, Dt = ea;
      }
      if (Mn.done) {
        if (n(j, Dt), on()) {
          var Sn = mn;
          Ai(j, Sn);
        }
        return Tt;
      }
      if (Dt === null) {
        for (; !Mn.done; mn++, Mn = Ie.next()) {
          var Tr = x(j, Mn.value, q);
          Tr !== null && (xn = i(Tr, xn, mn), qe === null ? Tt = Tr : qe.sibling = Tr, qe = Tr);
        }
        if (on()) {
          var Jl = mn;
          Ai(j, Jl);
        }
        return Tt;
      }
      for (var Wu = a(j, Dt); !Mn.done; mn++, Mn = Ie.next()) {
        var er = O(Wu, j, mn, Mn.value, q);
        er !== null && (e && er.alternate !== null && Wu.delete(er.key === null ? mn : er.key), xn = i(er, xn, mn), qe === null ? Tt = er : qe.sibling = er, qe = er);
      }
      if (e && Wu.forEach(function(k1) {
        return t(j, k1);
      }), on()) {
        var A1 = mn;
        Ai(j, A1);
      }
      return Tt;
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
    function de(j, F, w, q) {
      for (var oe = w.key, re = F; re !== null; ) {
        if (re.key === oe) {
          var xe = w.type;
          if (xe === za) {
            if (re.tag === fe) {
              n(j, re.sibling);
              var je = r(re, w.props.children);
              return je.return = j, je._debugSource = w._source, je._debugOwner = w._owner, je;
            }
          } else if (re.elementType === xe || // Keep this check inline so it only runs on the false path:
          vN(re, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof xe == "object" && xe !== null && xe.$$typeof === ye && sg(xe) === re.type) {
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
      if (w.type === za) {
        var Ie = ri(w.props.children, j.mode, q, w.key);
        return Ie.return = j, Ie;
      } else {
        var Tt = hv(w, j.mode, q);
        return Tt.ref = hu(j, F, w), Tt.return = j, Tt;
      }
    }
    function Ye(j, F, w, q) {
      for (var oe = w.key, re = F; re !== null; ) {
        if (re.key === oe)
          if (re.tag === M && re.stateNode.containerInfo === w.containerInfo && re.stateNode.implementation === w.implementation) {
            n(j, re.sibling);
            var xe = r(re, w.children || []);
            return xe.return = j, xe;
          } else {
            n(j, re);
            break;
          }
        else
          t(j, re);
        re = re.sibling;
      }
      var je = gv(w, j.mode, q);
      return je.return = j, je;
    }
    function ze(j, F, w, q) {
      var oe = typeof w == "object" && w !== null && w.type === za && w.key === null;
      if (oe && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return l(de(j, F, w, q));
          case qn:
            return l(Ye(j, F, w, q));
          case ye:
            var re = w._payload, xe = w._init;
            return ze(j, F, xe(re), q);
        }
        if (Fe(w))
          return U(j, F, w, q);
        if (Na(w))
          return ae(j, F, w, q);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(he(j, F, "" + w, q)) : (typeof w == "function" && fc(j), n(j, F));
    }
    return ze;
  }
  var Ml = cg(!0), fg = cg(!1);
  function fD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Wi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Wi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function dD(e, t) {
    for (var n = e.child; n !== null; )
      Zj(n, t), n = n.sibling;
  }
  var Sp = Yr(null), Rp;
  Rp = {};
  var dc = null, Al = null, Cp = null, pc = !1;
  function mc() {
    dc = null, Al = null, Cp = null, pc = !1;
  }
  function dg() {
    pc = !0;
  }
  function pg() {
    pc = !1;
  }
  function mg(e, t, n) {
    Nn(Sp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rp;
  }
  function Dp(e, t) {
    var n = Sp.current;
    bn(Sp, t), e._currentValue = n;
  }
  function Tp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = Ve(r.childLanes, t)) : (a.childLanes = Ve(a.childLanes, t), r !== null && (r.childLanes = Ve(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function pD(e, t, n) {
    mD(e, t, n);
  }
  function mD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var o = Mo(n), u = Er(st, o);
              u.tag = hc;
              var p = a.updateQueue;
              if (p !== null) {
                var v = p.shared, x = v.pending;
                x === null ? u.next = u : (u.next = x.next, x.next = u), v.pending = u;
              }
            }
            a.lanes = Ve(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = Ve(E.lanes, n)), Tp(a.return, n, e), i.lanes = Ve(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === B)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Me) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = Ve(O.lanes, n);
        var V = O.alternate;
        V !== null && (V.lanes = Ve(V.lanes, n)), Tp(O, n, e), r = a.sibling;
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
      a !== null && (Wn(n.lanes, t) && Ou(), n.firstContext = null);
    }
  }
  function Lt(e) {
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
  function vD() {
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
  function vg(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function hD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function yD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function Bn(e, t) {
    return vc(e, t);
  }
  var gD = vc;
  function vc(e, t) {
    e.lanes = Ve(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ve(n.lanes, t)), n === null && (e.flags & (Ot | fr)) !== Ee && fN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ve(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ve(n.childLanes, t) : (r.flags & (Ot | fr)) !== Ee && fN(e), a = r, r = r.return;
    if (a.tag === S) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var hg = 0, yg = 1, hc = 2, wp = 3, yc = !1, _p, gc;
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
  function gg(e, t) {
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
      tag: hg,
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
    if (gc === r && !_p && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), _p = !0), hj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, gD(e, n);
    } else
      return yD(e, r, t, n);
  }
  function bc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Oh(n)) {
        var i = r.lanes;
        i = Vh(i, e.pendingLanes);
        var l = Ve(i, n);
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
  function bD(e, t, n, a, r, i) {
    switch (n.tag) {
      case yg: {
        var l = n.payload;
        if (typeof l == "function") {
          dg();
          var o = l.call(i, a, r);
          {
            if (e.mode & Ct) {
              Xt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Xt(!1);
              }
            }
            pg();
          }
          return o;
        }
        return l;
      }
      case wp:
        e.flags = e.flags & ~_n | Ke;
      case hg: {
        var u = n.payload, p;
        if (typeof u == "function") {
          dg(), p = u.call(i, a, r);
          {
            if (e.mode & Ct) {
              Xt(!0);
              try {
                u.call(i, a, r);
              } finally {
                Xt(!1);
              }
            }
            pg();
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
      var O = r.baseState, V = $, U = null, ae = null, he = null, de = i;
      do {
        var Ye = de.lane, ze = de.eventTime;
        if (bl(a, Ye)) {
          if (he !== null) {
            var F = {
              eventTime: ze,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Jt,
              tag: de.tag,
              payload: de.payload,
              callback: de.callback,
              next: null
            };
            he = he.next = F;
          }
          O = bD(e, r, de, O, t, n);
          var w = de.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          de.lane !== Jt) {
            e.flags |= dh;
            var q = r.effects;
            q === null ? r.effects = [de] : q.push(de);
          }
        } else {
          var j = {
            eventTime: ze,
            lane: Ye,
            tag: de.tag,
            payload: de.payload,
            callback: de.callback,
            next: null
          };
          he === null ? (ae = he = j, U = O) : he = he.next = j, V = Ve(V, Ye);
        }
        if (de = de.next, de === null) {
          if (o = r.shared.pending, o === null)
            break;
          var oe = o, re = oe.next;
          oe.next = null, de = re, r.lastBaseUpdate = oe, r.shared.pending = null;
        }
      } while (!0);
      he === null && (U = O), r.baseState = U, r.firstBaseUpdate = ae, r.lastBaseUpdate = he;
      var xe = r.shared.interleaved;
      if (xe !== null) {
        var je = xe;
        do
          V = Ve(V, je.lane), je = je.next;
        while (je !== xe);
      } else i === null && (r.shared.lanes = $);
      $u(V), e.lanes = V, e.memoizedState = O;
    }
    gc = null;
  }
  function ND(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function bg() {
    yc = !1;
  }
  function Ec() {
    return yc;
  }
  function Ng(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, ND(l, n));
      }
  }
  var yu = {}, Qr = Yr(yu), gu = Yr(yu), xc = Yr(yu);
  function Sc(e) {
    if (e === yu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Eg() {
    var e = Sc(xc.current);
    return e;
  }
  function Vp(e, t) {
    Nn(xc, t, e), Nn(gu, e, e), Nn(Qr, yu, e);
    var n = UC(t);
    bn(Qr, e), Nn(Qr, n, e);
  }
  function Ul(e) {
    bn(Qr, e), bn(gu, e), bn(xc, e);
  }
  function Mp() {
    var e = Sc(Qr.current);
    return e;
  }
  function xg(e) {
    Sc(xc.current);
    var t = Sc(Qr.current), n = FC(t, e.type);
    t !== n && (Nn(gu, e, e), Nn(Qr, n, e));
  }
  function Ap(e) {
    gu.current === e && (bn(Qr, e), bn(gu, e));
  }
  var ED = 0, Sg = 1, Rg = 1, bu = 2, Ta = Yr(ED);
  function kp(e, t) {
    return (e & t) !== 0;
  }
  function Fl(e) {
    return e & Sg;
  }
  function Up(e, t) {
    return e & Sg | t;
  }
  function xD(e, t) {
    return e | t;
  }
  function Kr(e, t) {
    Nn(Ta, t, e);
  }
  function zl(e) {
    bn(Ta, e);
  }
  function SD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === Y) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || By(a) || tp(a))
            return t;
        }
      } else if (t.tag === Oe && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Ke) !== Ee;
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
  var Pn = (
    /*   */
    0
  ), kt = (
    /* */
    1
  ), Ga = (
    /*  */
    2
  ), Ut = (
    /*    */
    4
  ), un = (
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
  function RD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var le = h.ReactCurrentDispatcher, Nu = h.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = $, nt = null, Ft = null, zt = null, Cc = !1, Eu = !1, xu = 0, CD = 0, DD = 25, H = null, ca = null, Xr = -1, Bp = !1;
  function Xe() {
    {
      var e = H;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function J() {
    {
      var e = H;
      ca !== null && (Xr++, ca[Xr] !== e && TD(e));
    }
  }
  function Bl(e) {
    e != null && !Fe(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", H, typeof e);
  }
  function TD(e) {
    {
      var t = we(nt);
      if (!Hp.has(t) && (Hp.add(t), ca !== null)) {
        for (var n = "", a = 30, r = 0; r <= Xr; r++) {
          for (var i = ca[r], l = r === Xr ? e : i, o = r + 1 + ". " + i; o.length < a; )
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
  function En() {
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
      if (!Xn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, nt = t, ca = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? le.current = qg : ca !== null ? le.current = Ig : le.current = Yg;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, xu = 0, o >= DD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, Ft = null, zt = null, t.updateQueue = null, Xr = -1, le.current = Gg, l = n(a, r);
      } while (Eu);
    }
    le.current = Fc, t._debugHookTypes = ca;
    var u = Ft !== null && Ft.next !== null;
    if (Bi = $, nt = null, Ft = null, zt = null, H = null, ca = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Pe) !== ge && f("Internal React error: Expected static flag was missing. Please notify the React team."), Cc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function $l() {
    var e = xu !== 0;
    return xu = 0, e;
  }
  function Cg(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & $a) !== ge ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Dg() {
    if (le.current = Fc, Cc) {
      for (var e = nt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = $, nt = null, Ft = null, zt = null, ca = null, Xr = -1, H = null, zg = !1, Eu = !1, xu = 0;
  }
  function Wa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return zt === null ? nt.memoizedState = zt = e : zt = zt.next = e, zt;
  }
  function fa() {
    var e;
    if (Ft === null) {
      var t = nt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Ft.next;
    var n;
    if (zt === null ? n = nt.memoizedState : n = zt.next, n !== null)
      zt = n, n = zt.next, Ft = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Ft = e;
      var a = {
        memoizedState: Ft.memoizedState,
        baseState: Ft.baseState,
        baseQueue: Ft.baseQueue,
        queue: Ft.queue,
        next: null
      };
      zt === null ? nt.memoizedState = zt = a : zt = zt.next = a;
    }
    return zt;
  }
  function Tg() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function $p(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Yp(e, t, n) {
    var a = Wa(), r;
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
    var l = i.dispatch = OD.bind(null, nt, i);
    return [a.memoizedState, l];
  }
  function Ip(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Ft, l = i.baseQueue, o = r.pending;
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
            var de = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Jt,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            };
            V = V.next = de;
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
          V === null ? (O = V = he, E = x) : V = V.next = he, nt.lanes = Ve(nt.lanes, ae), $u(ae);
        }
        U = U.next;
      } while (U !== null && U !== v);
      V === null ? E = x : V.next = O, Xn(x, a.memoizedState) || Ou(), a.memoizedState = x, a.baseState = E, a.baseQueue = V, r.lastRenderedState = x;
    }
    var ze = r.interleaved;
    if (ze !== null) {
      var j = ze;
      do {
        var F = j.lane;
        nt.lanes = Ve(nt.lanes, F), $u(F), j = j.next;
      } while (j !== ze);
    } else l === null && (r.lanes = $);
    var w = r.dispatch;
    return [a.memoizedState, w];
  }
  function qp(e, t, n) {
    var a = fa(), r = a.queue;
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
      Xn(o, a.memoizedState) || Ou(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function E_(e, t, n) {
  }
  function x_(e, t, n) {
  }
  function Gp(e, t, n) {
    var a = nt, r = Wa(), i, l = on();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var o = t();
        Xn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
      }
      var u = af();
      if (u === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(u, Bi) || jg(a, t, i);
    }
    r.memoizedState = i;
    var p = {
      value: i,
      getSnapshot: t
    };
    return r.queue = p, _c(_g.bind(null, a, p, e), [e]), a.flags |= Ar, Su(kt | un, wg.bind(null, a, p, i, t), void 0, null), i;
  }
  function Dc(e, t, n) {
    var a = nt, r = fa(), i = t();
    if (!Hl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var o = r.memoizedState, u = !Xn(o, i);
    u && (r.memoizedState = i, Ou());
    var p = r.queue;
    if (Cu(_g.bind(null, a, p, e), [e]), p.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    zt !== null && zt.memoizedState.tag & kt) {
      a.flags |= Ar, Su(kt | un, wg.bind(null, a, p, i, t), void 0, null);
      var v = af();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(v, Bi) || jg(a, t, i);
    }
    return i;
  }
  function jg(e, t, n) {
    e.flags |= $f;
    var a = {
      getSnapshot: t,
      value: n
    }, r = nt.updateQueue;
    if (r === null)
      r = Tg(), nt.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function wg(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Og(t) && Lg(e);
  }
  function _g(e, t, n) {
    var a = function() {
      Og(t) && Lg(e);
    };
    return n(a);
  }
  function Og(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Xn(n, a);
    } catch {
      return !0;
    }
  }
  function Lg(e) {
    var t = Bn(e, Ce);
    t !== null && $t(t, e, Ce, st);
  }
  function Tc(e) {
    var t = Wa();
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
    var a = n.dispatch = LD.bind(null, nt, n);
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
      i = Tg(), nt.updateQueue = i, i.lastEffect = r.next = r;
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
    var t = Wa();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function jc(e) {
    var t = fa();
    return t.memoizedState;
  }
  function Ru(e, t, n, a) {
    var r = Wa(), i = a === void 0 ? null : a;
    nt.flags |= e, r.memoizedState = Su(kt | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (Ft !== null) {
      var o = Ft.memoizedState;
      if (l = o.destroy, i !== null) {
        var u = o.deps;
        if (Pp(i, u)) {
          r.memoizedState = Su(t, n, l, i);
          return;
        }
      }
    }
    nt.flags |= e, r.memoizedState = Su(kt | t, n, l, i);
  }
  function _c(e, t) {
    return (nt.mode & $a) !== ge ? Ru(Gf | Ar | qf, un, e, t) : Ru(Ar | qf, un, e, t);
  }
  function Cu(e, t) {
    return wc(Ar, un, e, t);
  }
  function Xp(e, t) {
    return Ru(Qe, Ga, e, t);
  }
  function Oc(e, t) {
    return wc(Qe, Ga, e, t);
  }
  function Jp(e, t) {
    var n = Qe;
    return n |= Ri, (nt.mode & $a) !== ge && (n |= kr), Ru(n, Ut, e, t);
  }
  function Lc(e, t) {
    return wc(Qe, Ut, e, t);
  }
  function Vg(e, t) {
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
    var a = n != null ? n.concat([e]) : null, r = Qe;
    return r |= Ri, (nt.mode & $a) !== ge && (r |= kr), Ru(r, Ut, Vg.bind(null, t, e), a);
  }
  function Vc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(Qe, Ut, Vg.bind(null, t, e), a);
  }
  function jD(e, t) {
  }
  var Mc = jD;
  function em(e, t) {
    var n = Wa(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Ac(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Pp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function tm(e, t) {
    var n = Wa(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function kc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Pp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function nm(e) {
    var t = Wa();
    return t.memoizedState = e, e;
  }
  function Mg(e) {
    var t = fa(), n = Ft, a = n.memoizedState;
    return kg(t, a, e);
  }
  function Ag(e) {
    var t = fa();
    if (Ft === null)
      return t.memoizedState = e, e;
    var n = Ft.memoizedState;
    return kg(t, n, e);
  }
  function kg(e, t, n) {
    var a = !pS(Bi);
    if (a) {
      if (!Xn(n, t)) {
        var r = Lh();
        nt.lanes = Ve(nt.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function wD(e, t, n) {
    var a = Sa();
    Zt(xS(a, mr)), e(!0);
    var r = Nu.transition;
    Nu.transition = {};
    var i = Nu.transition;
    Nu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Zt(a), Nu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && R("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function am() {
    var e = Tc(!1), t = e[0], n = e[1], a = wD.bind(null, n), r = Wa();
    return r.memoizedState = a, [t, a];
  }
  function Ug() {
    var e = Wp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  function Fg() {
    var e = Qp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  var zg = !1;
  function _D() {
    return zg;
  }
  function rm() {
    var e = Wa(), t = af(), n = t.identifierPrefix, a;
    if (on()) {
      var r = G0();
      a = ":" + n + "R" + r;
      var i = xu++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = CD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Uc() {
    var e = fa(), t = e.memoizedState;
    return t;
  }
  function OD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hg(e))
      Bg(t, r);
    else {
      var i = vg(e, t, r, a);
      if (i !== null) {
        var l = Vn();
        $t(i, e, a, l), Pg(i, t, a);
      }
    }
    $g(e, a);
  }
  function LD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hg(e))
      Bg(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === $ && (i === null || i.lanes === $)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = le.current, le.current = ja;
          try {
            var u = t.lastRenderedState, p = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = p, Xn(p, u)) {
              hD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            le.current = o;
          }
        }
      }
      var v = vg(e, t, r, a);
      if (v !== null) {
        var x = Vn();
        $t(v, e, a, x), Pg(v, t, a);
      }
    }
    $g(e, a);
  }
  function Hg(e) {
    var t = e.alternate;
    return e === nt || t !== null && t === nt;
  }
  function Bg(e, t) {
    Eu = Cc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Pg(e, t, n) {
    if (Oh(n)) {
      var a = t.lanes;
      a = Vh(a, e.pendingLanes);
      var r = Ve(a, n);
      t.lanes = r, Sd(e, r);
    }
  }
  function $g(e, t, n) {
    Jf(e, t);
  }
  var Fc = {
    readContext: Lt,
    useCallback: En,
    useContext: En,
    useEffect: En,
    useImperativeHandle: En,
    useInsertionEffect: En,
    useLayoutEffect: En,
    useMemo: En,
    useReducer: En,
    useRef: En,
    useState: En,
    useDebugValue: En,
    useDeferredValue: En,
    useTransition: En,
    useMutableSource: En,
    useSyncExternalStore: En,
    useId: En,
    unstable_isNewReconciler: Je
  }, Yg = null, Ig = null, qg = null, Gg = null, Qa = null, ja = null, zc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, De = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Yg = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", Xe(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Xe(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", Xe(), Bl(t), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", Xe(), Bl(n), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Xe(), Bl(t), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Xe(), Bl(t), Jp(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Xe(), Bl(t);
        var n = le.current;
        le.current = Qa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", Xe();
        var a = le.current;
        le.current = Qa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", Xe(), Kp(e);
      },
      useState: function(e) {
        H = "useState", Xe();
        var t = le.current;
        le.current = Qa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", Xe(), void 0;
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", Xe(), nm(e);
      },
      useTransition: function() {
        return H = "useTransition", Xe(), am();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", Xe(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", Xe(), Gp(e, t, n);
      },
      useId: function() {
        return H = "useId", Xe(), rm();
      },
      unstable_isNewReconciler: Je
    }, Ig = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", J(), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", J(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", J(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", J(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", J(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", J(), Jp(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", J();
        var n = le.current;
        le.current = Qa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", J();
        var a = le.current;
        le.current = Qa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", J(), Kp(e);
      },
      useState: function(e) {
        H = "useState", J();
        var t = le.current;
        le.current = Qa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", J(), void 0;
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", J(), nm(e);
      },
      useTransition: function() {
        return H = "useTransition", J(), am();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", J(), Gp(e, t, n);
      },
      useId: function() {
        return H = "useId", J(), rm();
      },
      unstable_isNewReconciler: Je
    }, qg = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", J(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", J(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", J();
        var n = le.current;
        le.current = ja;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", J();
        var a = le.current;
        le.current = ja;
        try {
          return Ip(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", J(), jc();
      },
      useState: function(e) {
        H = "useState", J();
        var t = le.current;
        le.current = ja;
        try {
          return Wp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", J(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", J(), Mg(e);
      },
      useTransition: function() {
        return H = "useTransition", J(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", J(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", J(), Uc();
      },
      unstable_isNewReconciler: Je
    }, Gg = {
      readContext: function(e) {
        return Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", J(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", J(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", J();
        var n = le.current;
        le.current = zc;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", J();
        var a = le.current;
        le.current = zc;
        try {
          return qp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", J(), jc();
      },
      useState: function(e) {
        H = "useState", J();
        var t = le.current;
        le.current = zc;
        try {
          return Qp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", J(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", J(), Ag(e);
      },
      useTransition: function() {
        return H = "useTransition", J(), Fg();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", J(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", J(), Uc();
      },
      unstable_isNewReconciler: Je
    }, Qa = {
      readContext: function(e) {
        return im(), Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", De(), Xe(), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", De(), Xe(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", De(), Xe(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", De(), Xe(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", De(), Xe(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", De(), Xe(), Jp(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", De(), Xe();
        var n = le.current;
        le.current = Qa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", De(), Xe();
        var a = le.current;
        le.current = Qa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", De(), Xe(), Kp(e);
      },
      useState: function(e) {
        H = "useState", De(), Xe();
        var t = le.current;
        le.current = Qa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", De(), Xe(), void 0;
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", De(), Xe(), nm(e);
      },
      useTransition: function() {
        return H = "useTransition", De(), Xe(), am();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", De(), Xe(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", De(), Xe(), Gp(e, t, n);
      },
      useId: function() {
        return H = "useId", De(), Xe(), rm();
      },
      unstable_isNewReconciler: Je
    }, ja = {
      readContext: function(e) {
        return im(), Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", De(), J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", De(), J(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", De(), J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", De(), J(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", De(), J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", De(), J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", De(), J();
        var n = le.current;
        le.current = ja;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", De(), J();
        var a = le.current;
        le.current = ja;
        try {
          return Ip(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", De(), J(), jc();
      },
      useState: function(e) {
        H = "useState", De(), J();
        var t = le.current;
        le.current = ja;
        try {
          return Wp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", De(), J(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", De(), J(), Mg(e);
      },
      useTransition: function() {
        return H = "useTransition", De(), J(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", De(), J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", De(), J(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", De(), J(), Uc();
      },
      unstable_isNewReconciler: Je
    }, zc = {
      readContext: function(e) {
        return im(), Lt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", De(), J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", De(), J(), Lt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", De(), J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", De(), J(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", De(), J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", De(), J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", De(), J();
        var n = le.current;
        le.current = ja;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", De(), J();
        var a = le.current;
        le.current = ja;
        try {
          return qp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", De(), J(), jc();
      },
      useState: function(e) {
        H = "useState", De(), J();
        var t = le.current;
        le.current = ja;
        try {
          return Qp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", De(), J(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", De(), J(), Ag(e);
      },
      useTransition: function() {
        return H = "useTransition", De(), J(), Fg();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", De(), J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", De(), J(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", De(), J(), Uc();
      },
      unstable_isNewReconciler: Je
    };
  }
  var Jr = m.unstable_now, Wg = 0, Hc = -1, Du = -1, Bc = -1, lm = !1, Pc = !1;
  function Qg() {
    return lm;
  }
  function VD() {
    Pc = !0;
  }
  function MD() {
    lm = !1, Pc = !1;
  }
  function AD() {
    lm = Pc, Pc = !1;
  }
  function Kg() {
    return Wg;
  }
  function Xg() {
    Wg = Jr();
  }
  function om(e) {
    Du = Jr(), e.actualStartTime < 0 && (e.actualStartTime = Jr());
  }
  function Jg(e) {
    Du = -1;
  }
  function $c(e, t) {
    if (Du >= 0) {
      var n = Jr() - Du;
      e.actualDuration += n, t && (e.selfBaseDuration = n), Du = -1;
    }
  }
  function Ka(e) {
    if (Hc >= 0) {
      var t = Jr() - Hc;
      Hc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case S:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case Q:
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
          case Q:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function Xa() {
    Hc = Jr();
  }
  function sm() {
    Bc = Jr();
  }
  function cm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function wa(e, t) {
    if (e && e.defaultProps) {
      var n = Ue({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var fm = {}, dm, pm, mm, vm, hm, Zg, Yc, ym, gm, bm, Tu;
  {
    dm = /* @__PURE__ */ new Set(), pm = /* @__PURE__ */ new Set(), mm = /* @__PURE__ */ new Set(), vm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), hm = /* @__PURE__ */ new Set(), gm = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Tu = /* @__PURE__ */ new Set();
    var eb = /* @__PURE__ */ new Set();
    Yc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        eb.has(n) || (eb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, Zg = function(e, t) {
      if (t === void 0) {
        var n = We(e) || "Component";
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
      if (e.mode & Ct) {
        Xt(!0);
        try {
          i = n(a, r);
        } finally {
          Xt(!1);
        }
      }
      Zg(t, i);
    }
    var l = i == null ? r : Ue({}, r, i);
    if (e.memoizedState = l, e.lanes === $) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: Dx,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = Vn(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && ($t(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = Vn(), i = ni(a), l = Er(r, i);
      l.tag = yg, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && ($t(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = Vn(), r = ni(n), i = Er(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && ($t(l, n, r, a), bc(l, n, r)), aS(n, r);
    }
  };
  function tb(e, t, n, a, r, i, l) {
    var o = e.stateNode;
    if (typeof o.shouldComponentUpdate == "function") {
      var u = o.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Ct) {
          Xt(!0);
          try {
            u = o.shouldComponentUpdate(a, i, l);
          } finally {
            Xt(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", We(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function kD(e, t, n) {
    var a = e.stateNode;
    {
      var r = We(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Ct) === ge && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Ct) === ge && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !gm.has(t) && (gm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", We(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", We(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || Fe(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function nb(e, t) {
    t.updater = Em, e.stateNode = t, xx(t, e), t._reactInternalInstance = fm;
  }
  function ab(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === ne && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === I ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", We(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Lt(l);
    else {
      r = wl(e, t, !0);
      var p = t.contextTypes;
      a = p != null, i = a ? _l(e, r) : Jn;
    }
    var v = new t(n, i);
    if (e.mode & Ct) {
      Xt(!0);
      try {
        v = new t(n, i);
      } finally {
        Xt(!1);
      }
    }
    var x = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    nb(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && x === null) {
        var E = We(t) || "Component";
        pm.has(E) || (pm.add(E), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, v.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var O = null, V = null, U = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? U = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (U = "UNSAFE_componentWillUpdate"), O !== null || V !== null || U !== null) {
          var ae = We(t) || "Component", he = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
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
    return a && qy(e, r, i), v;
  }
  function UD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", we(e) || "Component"), Em.enqueueReplaceState(t, t.state, null));
  }
  function rb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = we(e) || "Component";
        dm.has(i) || (dm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Em.enqueueReplaceState(t, t.state, null);
    }
  }
  function xm(e, t, n, a) {
    kD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Op(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Lt(i);
    else {
      var l = wl(e, t, !0);
      r.context = _l(e, l);
    }
    {
      if (r.state === n) {
        var o = We(t) || "Component";
        ym.has(o) || (ym.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & Ct && Da.recordLegacyContextWarning(e, r), Da.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Nm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (UD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var p = Qe;
      p |= Ri, (e.mode & $a) !== ge && (p |= kr), e.flags |= p;
    }
  }
  function FD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, u = Jn;
    if (typeof o == "object" && o !== null)
      u = Lt(o);
    else {
      var p = wl(e, t, !0);
      u = _l(e, p);
    }
    var v = t.getDerivedStateFromProps, x = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !x && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && rb(e, r, n, u), bg();
    var E = e.memoizedState, O = r.state = E;
    if (Nc(e, n, r, a), O = e.memoizedState, i === n && E === O && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var V = Qe;
        V |= Ri, (e.mode & $a) !== ge && (V |= kr), e.flags |= V;
      }
      return !1;
    }
    typeof v == "function" && (Nm(e, t, v, n), O = e.memoizedState);
    var U = Ec() || tb(e, t, i, n, E, O, u);
    if (U) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ae = Qe;
        ae |= Ri, (e.mode & $a) !== ge && (ae |= kr), e.flags |= ae;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var he = Qe;
        he |= Ri, (e.mode & $a) !== ge && (he |= kr), e.flags |= he;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = u, U;
  }
  function zD(e, t, n, a, r) {
    var i = t.stateNode;
    gg(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : wa(t.type, l);
    i.props = o;
    var u = t.pendingProps, p = i.context, v = n.contextType, x = Jn;
    if (typeof v == "object" && v !== null)
      x = Lt(v);
    else {
      var E = wl(t, n, !0);
      x = _l(t, E);
    }
    var O = n.getDerivedStateFromProps, V = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || p !== x) && rb(t, i, a, x), bg();
    var U = t.memoizedState, ae = i.state = U;
    if (Nc(t, a, i, r), ae = t.memoizedState, l === u && U === ae && !tc() && !Ec() && !jt)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), !1;
    typeof O == "function" && (Nm(t, n, O, a), ae = t.memoizedState);
    var he = Ec() || tb(t, n, o, a, U, ae, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    jt;
    return he ? (!V && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ae, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ae, x)), typeof i.componentDidUpdate == "function" && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = ae), i.props = a, i.state = ae, i.context = x, he;
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
  function HD(e, t) {
    return !0;
  }
  function Rm(e, t) {
    try {
      var n = HD(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var o = r ? we(r) : null, u = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", p;
      if (e.tag === S)
        p = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = we(e) || "Anonymous";
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
  var BD = typeof WeakMap == "function" ? WeakMap : Map;
  function ib(e, t, n) {
    var a = Er(st, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Vj(r), Rm(e, t);
    }, a;
  }
  function Cm(e, t, n) {
    var a = Er(st, n);
    a.tag = wp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        hN(e), Rm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      hN(e), Rm(e, t), typeof r != "function" && Oj(this);
      var u = t.value, p = t.stack;
      this.componentDidCatch(u, {
        componentStack: p !== null ? p : ""
      }), typeof r != "function" && (Wn(e.lanes, Ce) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", we(e) || "Unknown"));
    }), a;
  }
  function lb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new BD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Mj.bind(null, e, t, n);
      xa && Yu(e, n), t.then(i, i);
    }
  }
  function PD(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function $D(e, t) {
    var n = e.tag;
    if ((e.mode & Pe) === ge && (n === D || n === G || n === P)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function ob(e) {
    var t = e;
    do {
      if (t.tag === Y && SD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ub(e, t, n, a, r) {
    if ((e.mode & Pe) === ge) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Ke, n.flags |= Yf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = Se;
          else {
            var l = Er(st, Ce);
            l.tag = hc, Wr(n, l, Ce);
          }
        }
        n.lanes = Ve(n.lanes, Ce);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function YD(e, t, n, a, r) {
    if (n.flags |= bs, xa && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      $D(n), on() && n.mode & Pe && Zy();
      var l = ob(t);
      if (l !== null) {
        l.flags &= ~cr, ub(l, t, n, e, r), l.mode & Pe && lb(e, i, r), PD(l, e, i);
        return;
      } else {
        if (!dS(r)) {
          lb(e, i, r), rv();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (on() && n.mode & Pe) {
      Zy();
      var u = ob(t);
      if (u !== null) {
        (u.flags & _n) === Ee && (u.flags |= cr), ub(u, t, n, e, r), yp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), Sj(a);
    var p = t;
    do {
      switch (p.tag) {
        case S: {
          var v = a;
          p.flags |= _n;
          var x = Mo(r);
          p.lanes = Ve(p.lanes, x);
          var E = ib(p, v, x);
          Lp(p, E);
          return;
        }
        case T:
          var O = a, V = p.type, U = p.stateNode;
          if ((p.flags & Ke) === Ee && (typeof V.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && !oN(U))) {
            p.flags |= _n;
            var ae = Mo(r);
            p.lanes = Ve(p.lanes, ae);
            var he = Cm(p, O, ae);
            Lp(p, he);
            return;
          }
          break;
      }
      p = p.return;
    } while (p !== null);
  }
  function ID() {
    return null;
  }
  var ju = h.ReactCurrentOwner, _a = !1, Dm, wu, Tm, jm, wm, $i, _m, Ic, _u;
  Dm = {}, wu = {}, Tm = {}, jm = {}, wm = {}, $i = !1, _m = {}, Ic = {}, _u = {};
  function On(e, t, n, a) {
    e === null ? t.child = fg(t, null, n, a) : t.child = Ml(t, e.child, n, a);
  }
  function qD(e, t, n, a) {
    t.child = Ml(t, e.child, null, a), t.child = Ml(t, null, n, a);
  }
  function sb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ra(
        i,
        a,
        // Resolved props
        "prop",
        We(n)
      );
    }
    var l = n.render, o = t.ref, u, p;
    kl(t, r), jo(t);
    {
      if (ju.current = t, la(!0), u = Pl(e, t, l, a, o, r), p = $l(), t.mode & Ct) {
        Xt(!0);
        try {
          u = Pl(e, t, l, a, o, r), p = $l();
        } finally {
          Xt(!1);
        }
      }
      la(!1);
    }
    return vl(), e !== null && !_a ? (Cg(e, t, r), xr(e, t, r)) : (on() && p && fp(t), t.flags |= fl, On(e, t, u, r), t.child);
  }
  function cb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (Xj(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = P, t.type = l, Vm(t, i), fb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && Ra(
          o,
          a,
          // Resolved props
          "prop",
          We(i)
        ), n.defaultProps !== void 0) {
          var u = We(i) || "Unknown";
          _u[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), _u[u] = !0);
        }
      }
      var p = vv(n.type, null, a, t, t.mode, r);
      return p.ref = t.ref, p.return = t, t.child = p, p;
    }
    {
      var v = n.type, x = v.propTypes;
      x && Ra(
        x,
        a,
        // Resolved props
        "prop",
        We(v)
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
  function fb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === ye) {
        var l = i, o = l._payload, u = l._init;
        try {
          i = u(o);
        } catch {
          i = null;
        }
        var p = i && i.propTypes;
        p && Ra(
          p,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          We(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Qo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (_a = !1, t.pendingProps = a = v, zm(e, r))
          (e.flags & Yf) !== Ee && (_a = !0);
        else return t.lanes = e.lanes, xr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function db(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Yt)
      if ((t.mode & Pe) === ge) {
        var l = {
          baseLanes: $,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (Wn(n, Gn)) {
        var x = {
          baseLanes: $,
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
          u = Ve(p, n);
        } else
          u = n;
        t.lanes = t.childLanes = Gn;
        var v = {
          baseLanes: u,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, rf(t, u), null;
      }
    else {
      var O;
      i !== null ? (O = Ve(i.baseLanes, n), t.memoizedState = null) : O = n, rf(t, O);
    }
    return On(e, t, r, n), t.child;
  }
  function GD(e, t, n) {
    var a = t.pendingProps;
    return On(e, t, a, n), t.child;
  }
  function WD(e, t, n) {
    var a = t.pendingProps.children;
    return On(e, t, a, n), t.child;
  }
  function QD(e, t, n) {
    {
      t.flags |= Qe;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return On(e, t, i, n), t.child;
  }
  function pb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= xi, t.flags |= If);
  }
  function Om(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ra(
        i,
        a,
        // Resolved props
        "prop",
        We(n)
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
      if (ju.current = t, la(!0), u = Pl(e, t, n, a, l, r), p = $l(), t.mode & Ct) {
        Xt(!0);
        try {
          u = Pl(e, t, n, a, l, r), p = $l();
        } finally {
          Xt(!1);
        }
      }
      la(!1);
    }
    return vl(), e !== null && !_a ? (Cg(e, t, r), xr(e, t, r)) : (on() && p && fp(t), t.flags |= fl, On(e, t, u, r), t.child);
  }
  function mb(e, t, n, a, r) {
    {
      switch (d1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), u = o.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= Ke, t.flags |= _n;
          var p = new Error("Simulated error coming from DevTools"), v = Mo(r);
          t.lanes = Ve(t.lanes, v);
          var x = Cm(t, Pi(p, t), v);
          Lp(t, x);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var E = n.propTypes;
        E && Ra(
          E,
          a,
          // Resolved props
          "prop",
          We(n)
        );
      }
    }
    var O;
    qa(n) ? (O = !0, ac(t)) : O = !1, kl(t, r);
    var V = t.stateNode, U;
    V === null ? (Gc(e, t), ab(t, n, a), xm(t, n, a, r), U = !0) : e === null ? U = FD(t, n, a, r) : U = zD(e, t, n, a, r);
    var ae = Lm(e, t, n, U, O, r);
    {
      var he = t.stateNode;
      U && he.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", we(t) || "a component"), $i = !0);
    }
    return ae;
  }
  function Lm(e, t, n, a, r, i) {
    pb(e, t);
    var l = (t.flags & Ke) !== Ee;
    if (!a && !l)
      return r && Qy(t, n, !1), xr(e, t, i);
    var o = t.stateNode;
    ju.current = t;
    var u;
    if (l && typeof n.getDerivedStateFromError != "function")
      u = null, Jg();
    else {
      jo(t);
      {
        if (la(!0), u = o.render(), t.mode & Ct) {
          Xt(!0);
          try {
            o.render();
          } finally {
            Xt(!1);
          }
        }
        la(!1);
      }
      vl();
    }
    return t.flags |= fl, e !== null && l ? qD(e, t, u, i) : On(e, t, u, i), t.memoizedState = o.state, r && Qy(t, n, !0), t.child;
  }
  function vb(e) {
    var t = e.stateNode;
    t.pendingContext ? Gy(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gy(e, t.context, !1), Vp(e, t.containerInfo);
  }
  function KD(e, t, n) {
    if (vb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    gg(e, t), Nc(t, a, null, n);
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
        return hb(e, t, o, n, v);
      } else if (o !== i) {
        var x = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return hb(e, t, o, n, x);
      } else {
        Z0(t);
        var E = fg(t, null, o, n);
        t.child = E;
        for (var O = E; O; )
          O.flags = O.flags & ~Ot | fr, O = O.sibling;
      }
    } else {
      if (Vl(), o === i)
        return xr(e, t, n);
      On(e, t, o, n);
    }
    return t.child;
  }
  function hb(e, t, n, a, r) {
    return Vl(), yp(r), t.flags |= cr, On(e, t, n, a), t.child;
  }
  function XD(e, t, n) {
    xg(t), e === null && hp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Xd(a, r);
    return o ? l = null : i !== null && Xd(a, i) && (t.flags |= Do), pb(e, t), On(e, t, l, n), t.child;
  }
  function JD(e, t) {
    return e === null && hp(t), null;
  }
  function ZD(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, u = o(l);
    t.type = u;
    var p = t.tag = Jj(u), v = wa(u, r), x;
    switch (p) {
      case D:
        return Vm(t, u), t.type = u = Xl(u), x = Om(null, t, u, v, a), x;
      case T:
        return t.type = u = sv(u), x = mb(null, t, u, v, a), x;
      case G:
        return t.type = u = cv(u), x = sb(null, t, u, v, a), x;
      case Z: {
        if (t.type !== t.elementType) {
          var E = u.propTypes;
          E && Ra(
            E,
            v,
            // Resolved for outer only
            "prop",
            We(u)
          );
        }
        return x = cb(
          null,
          t,
          u,
          wa(u.type, v),
          // The inner type can have defaults too
          a
        ), x;
      }
    }
    var O = "";
    throw u !== null && typeof u == "object" && u.$$typeof === ye && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function eT(e, t, n, a, r) {
    Gc(e, t), t.tag = T;
    var i;
    return qa(n) ? (i = !0, ac(t)) : i = !1, kl(t, r), ab(t, n, a), xm(t, n, a, r), Lm(null, t, n, !0, i, r);
  }
  function tT(e, t, n, a) {
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
        var p = We(n) || "Unknown";
        Dm[p] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", p, p), Dm[p] = !0);
      }
      t.mode & Ct && Da.recordLegacyContextWarning(t, null), la(!0), ju.current = t, o = Pl(null, t, n, r, i, a), u = $l(), la(!1);
    }
    if (vl(), t.flags |= fl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var v = We(n) || "Unknown";
      wu[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), wu[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
    ) {
      {
        var x = We(n) || "Unknown";
        wu[x] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), wu[x] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var E = !1;
      return qa(n) ? (E = !0, ac(t)) : E = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Op(t), nb(t, o), xm(t, n, r, a), Lm(null, t, n, !0, E, a);
    } else {
      if (t.tag = D, t.mode & Ct) {
        Xt(!0);
        try {
          o = Pl(null, t, n, r, i, a), u = $l();
        } finally {
          Xt(!1);
        }
      }
      return on() && u && fp(t), On(null, t, o, a), Vm(t, n), t.child;
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
        var l = We(t) || "Unknown";
        _u[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), _u[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = We(t) || "Unknown";
        jm[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), jm[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = We(t) || "Unknown";
        Tm[u] || (f("%s: Function components do not support contextType.", u), Tm[u] = !0);
      }
    }
  }
  var Mm = {
    dehydrated: null,
    treeContext: null,
    retryLane: Jt
  };
  function Am(e) {
    return {
      baseLanes: e,
      cachePool: ID(),
      transitions: null
    };
  }
  function nT(e, t) {
    var n = null;
    return {
      baseLanes: Ve(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function aT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return kp(e, bu);
  }
  function rT(e, t) {
    return Ds(e.childLanes, t);
  }
  function yb(e, t, n) {
    var a = t.pendingProps;
    p1(t) && (t.flags |= Ke);
    var r = Ta.current, i = !1, l = (t.flags & Ke) !== Ee;
    if (l || aT(r, e) ? (i = !0, t.flags &= ~Ke) : (e === null || e.memoizedState !== null) && (r = xD(r, Rg)), r = Fl(r), Kr(t, r), e === null) {
      hp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var u = o.dehydrated;
        if (u !== null)
          return sT(t, u);
      }
      var p = a.children, v = a.fallback;
      if (i) {
        var x = iT(t, p, v, n), E = t.child;
        return E.memoizedState = Am(n), t.memoizedState = Mm, x;
      } else
        return km(t, p);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var V = O.dehydrated;
        if (V !== null)
          return cT(e, t, l, a, V, O, n);
      }
      if (i) {
        var U = a.fallback, ae = a.children, he = oT(e, t, ae, U, n), de = t.child, Ye = e.child.memoizedState;
        return de.memoizedState = Ye === null ? Am(n) : nT(Ye, n), de.childLanes = rT(e, n), t.memoizedState = Mm, he;
      } else {
        var ze = a.children, j = lT(e, t, ze, n);
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
  function iT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, u;
    return (r & Pe) === ge && i !== null ? (o = i, o.childLanes = $, o.pendingProps = l, e.mode & tt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = ri(n, r, a, null)) : (o = Um(l, r), u = ri(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function Um(e, t, n) {
    return gN(e, t, $, null);
  }
  function gb(e, t) {
    return Wi(e, t);
  }
  function lT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = gb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Pe) === ge && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var o = t.deletions;
      o === null ? (t.deletions = [i], t.flags |= Ei) : o.push(i);
    }
    return t.child = l, l;
  }
  function oT(e, t, n, a, r) {
    var i = t.mode, l = e.child, o = l.sibling, u = {
      mode: "hidden",
      children: n
    }, p;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Pe) === ge && // Make sure we're on the second pass, i.e. the primary child fragment was
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
      p = gb(l, u), p.subtreeFlags = l.subtreeFlags & dr;
    var x;
    return o !== null ? x = Wi(o, a) : (x = ri(a, i, r, null), x.flags |= Ot), x.return = t, p.return = t, p.sibling = x, t.child = p, x;
  }
  function qc(e, t, n, a) {
    a !== null && yp(a), Ml(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = km(t, i);
    return l.flags |= Ot, t.memoizedState = null, l;
  }
  function uT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Um(l, i), u = ri(a, i, r, null);
    return u.flags |= Ot, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & Pe) !== ge && Ml(t, e.child, null, r), u;
  }
  function sT(e, t, n) {
    return (e.mode & Pe) === ge ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ce) : tp(t) ? e.lanes = Ti : e.lanes = Gn, null;
  }
  function cT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var j = Sm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Ke, null;
        var F = a.children, w = a.fallback, q = uT(e, t, F, w, l), oe = t.child;
        return oe.memoizedState = Am(l), t.memoizedState = Mm, q;
      }
    else {
      if (X0(), (t.mode & Pe) === ge)
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
          var v = m0(r);
          o = v.digest, u = v.message, p = v.stack;
        }
        var x;
        u ? x = new Error(u) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var E = Sm(x, o, p);
        return qc(e, t, l, E);
      }
      var O = Wn(l, e.childLanes);
      if (_a || O) {
        var V = af();
        if (V !== null) {
          var U = NS(V, l);
          if (U !== Jt && U !== i.retryLane) {
            i.retryLane = U;
            var ae = st;
            Bn(e, U), $t(V, e, U, ae);
          }
        }
        rv();
        var he = Sm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, he);
      } else if (By(r)) {
        t.flags |= Ke, t.child = e.child;
        var de = Aj.bind(null, e);
        return v0(r, de), null;
      } else {
        eD(t, r, i.treeContext);
        var Ye = a.children, ze = km(t, Ye);
        return ze.flags |= fr, ze;
      }
    }
  }
  function bb(e, t, n) {
    e.lanes = Ve(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ve(a.lanes, t)), Tp(e.return, t, n);
  }
  function fT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === Y) {
        var r = a.memoizedState;
        r !== null && bb(a, n, e);
      } else if (a.tag === Oe)
        bb(a, n, e);
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
  function dT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Rc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function pT(e) {
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
  function mT(e, t) {
    e !== void 0 && !Ic[e] && (e !== "collapsed" && e !== "hidden" ? (Ic[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Ic[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Nb(e, t) {
    {
      var n = Fe(e), a = !n && typeof Na(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function vT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Fe(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Nb(e[n], n))
            return;
      } else {
        var a = Na(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Nb(i.value, l))
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
  function Eb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    pT(r), mT(i, r), vT(l, r), On(e, t, l, n);
    var o = Ta.current, u = kp(o, bu);
    if (u)
      o = Up(o, bu), t.flags |= Ke;
    else {
      var p = e !== null && (e.flags & Ke) !== Ee;
      p && fT(t, t.child, n), o = Fl(o);
    }
    if (Kr(t, o), (t.mode & Pe) === ge)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = dT(t.child), x;
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
  function hT(e, t, n) {
    Vp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ml(t, null, a, n) : On(e, t, a, n), t.child;
  }
  var xb = !1;
  function yT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || xb || (xb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && Ra(u, i, "prop", "Context.Provider");
    }
    if (mg(t, r, o), l !== null) {
      var p = l.value;
      if (Xn(p, o)) {
        if (l.children === i.children && !tc())
          return xr(e, t, n);
      } else
        pD(t, r, n);
    }
    var v = i.children;
    return On(e, t, v, n), t.child;
  }
  var Sb = !1;
  function gT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Sb || (Sb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kl(t, n);
    var l = Lt(a);
    jo(t);
    var o;
    return ju.current = t, la(!0), o = i(l), la(!1), vl(), t.flags |= fl, On(e, t, o, n), t.child;
  }
  function Ou() {
    _a = !0;
  }
  function Gc(e, t) {
    (t.mode & Pe) === ge && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Ot);
  }
  function xr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Jg(), $u(t.lanes), Wn(n, t.childLanes) ? (fD(e, t), t.child) : null;
  }
  function bT(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Ei) : i.push(e), n.flags |= Ot, n;
    }
  }
  function zm(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function NT(e, t, n) {
    switch (t.tag) {
      case S:
        vb(t), t.stateNode, Vl();
        break;
      case z:
        xg(t);
        break;
      case T: {
        var a = t.type;
        qa(a) && ac(t);
        break;
      }
      case M:
        Vp(t, t.stateNode.containerInfo);
        break;
      case B: {
        var r = t.memoizedProps.value, i = t.type._context;
        mg(t, i, r);
        break;
      }
      case Q:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= Qe);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case Y: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Kr(t, Fl(Ta.current)), t.flags |= Ke, null;
          var p = t.child, v = p.childLanes;
          if (Wn(n, v))
            return yb(e, t, n);
          Kr(t, Fl(Ta.current));
          var x = xr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Kr(t, Fl(Ta.current));
        break;
      }
      case Oe: {
        var E = (e.flags & Ke) !== Ee, O = Wn(n, t.childLanes);
        if (E) {
          if (O)
            return Eb(e, t, n);
          t.flags |= Ke;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Kr(t, Ta.current), O)
          break;
        return null;
      }
      case pe:
      case Ge:
        return t.lanes = $, db(e, t, n);
    }
    return xr(e, t, n);
  }
  function Rb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return bT(e, t, vv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        _a = !0;
      else {
        var i = zm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Ke) === Ee)
          return _a = !1, NT(e, t, n);
        (e.flags & Yf) !== Ee ? _a = !0 : _a = !1;
      }
    } else if (_a = !1, on() && I0(t)) {
      var l = t.index, o = q0();
      Jy(t, o, l);
    }
    switch (t.lanes = $, t.tag) {
      case _:
        return tT(e, t, t.type, n);
      case _e: {
        var u = t.elementType;
        return ZD(e, t, u, n);
      }
      case D: {
        var p = t.type, v = t.pendingProps, x = t.elementType === p ? v : wa(p, v);
        return Om(e, t, p, x, n);
      }
      case T: {
        var E = t.type, O = t.pendingProps, V = t.elementType === E ? O : wa(E, O);
        return mb(e, t, E, V, n);
      }
      case S:
        return KD(e, t, n);
      case z:
        return XD(e, t, n);
      case W:
        return JD(e, t);
      case Y:
        return yb(e, t, n);
      case M:
        return hT(e, t, n);
      case G: {
        var U = t.type, ae = t.pendingProps, he = t.elementType === U ? ae : wa(U, ae);
        return sb(e, t, U, he, n);
      }
      case fe:
        return GD(e, t, n);
      case X:
        return WD(e, t, n);
      case Q:
        return QD(e, t, n);
      case B:
        return yT(e, t, n);
      case ue:
        return gT(e, t, n);
      case Z: {
        var de = t.type, Ye = t.pendingProps, ze = wa(de, Ye);
        if (t.type !== t.elementType) {
          var j = de.propTypes;
          j && Ra(
            j,
            ze,
            // Resolved for outer only
            "prop",
            We(de)
          );
        }
        return ze = wa(de.type, ze), cb(e, t, de, ze, n);
      }
      case P:
        return fb(e, t, t.type, t.pendingProps, n);
      case Se: {
        var F = t.type, w = t.pendingProps, q = t.elementType === F ? w : wa(F, w);
        return eT(e, t, F, q, n);
      }
      case Oe:
        return Eb(e, t, n);
      case Ae:
        break;
      case pe:
        return db(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Yl(e) {
    e.flags |= Qe;
  }
  function Cb(e) {
    e.flags |= xi, e.flags |= If;
  }
  var Db, Hm, Tb, jb;
  Db = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === z || r.tag === W)
        PC(e, r.stateNode);
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
  }, Tb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, o = Mp(), u = YC(l, n, i, a, r, o);
      t.updateQueue = u, u && Yl(t);
    }
  }, jb = function(e, t, n, a) {
    n !== a && Yl(t);
  };
  function Lu(e, t) {
    if (!on())
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
  function sn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = $, a = Ee;
    if (t) {
      if ((e.mode & tt) !== ge) {
        for (var u = e.selfBaseDuration, p = e.child; p !== null; )
          n = Ve(n, Ve(p.lanes, p.childLanes)), a |= p.subtreeFlags & dr, a |= p.flags & dr, u += p.treeBaseDuration, p = p.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = Ve(n, Ve(v.lanes, v.childLanes)), a |= v.subtreeFlags & dr, a |= v.flags & dr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & tt) !== ge) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Ve(n, Ve(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = Ve(n, Ve(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function ET(e, t, n) {
    if (iD() && (t.mode & Pe) !== ge && (t.flags & Ke) === Ee)
      return ig(t), Vl(), t.flags |= cr | bs | _n, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (aD(t), sn(t), (t.mode & tt) !== ge) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Ke) === Ee && (t.memoizedState = null), t.flags |= Qe, sn(t), (t.mode & tt) !== ge) {
          var l = n !== null;
          if (l) {
            var o = t.child;
            o !== null && (t.treeBaseDuration -= o.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return lg(), !0;
  }
  function wb(e, t, n) {
    var a = t.pendingProps;
    switch (dp(t), t.tag) {
      case _:
      case _e:
      case P:
      case D:
      case G:
      case fe:
      case X:
      case Q:
      case ue:
      case Z:
        return sn(t), null;
      case T: {
        var r = t.type;
        return qa(r) && nc(t), sn(t), null;
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
            (t.flags & cr) !== Ee) && (t.flags |= dl, lg());
          }
        }
        return Hm(e, t), sn(t), null;
      }
      case z: {
        Ap(t);
        var u = Eg(), p = t.type;
        if (e !== null && t.stateNode != null)
          Tb(e, t, p, a, u), e.ref !== t.ref && Cb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return sn(t), null;
          }
          var v = Mp(), x = uc(t);
          if (x)
            tD(t, u, v) && Yl(t);
          else {
            var E = BC(p, a, u, v, t);
            Db(E, t, !1, !1), t.stateNode = E, $C(E, p, a, u) && Yl(t);
          }
          t.ref !== null && Cb(t);
        }
        return sn(t), null;
      }
      case W: {
        var O = a;
        if (e && t.stateNode != null) {
          var V = e.memoizedProps;
          jb(e, t, V, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var U = Eg(), ae = Mp(), he = uc(t);
          he ? nD(t) && Yl(t) : t.stateNode = IC(O, U, ae, t);
        }
        return sn(t), null;
      }
      case Y: {
        zl(t);
        var de = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ye = ET(e, t, de);
          if (!Ye)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Ke) !== Ee)
          return t.lanes = n, (t.mode & tt) !== ge && cm(t), t;
        var ze = de !== null, j = e !== null && e.memoizedState !== null;
        if (ze !== j && ze) {
          var F = t.child;
          if (F.flags |= Si, (t.mode & Pe) !== ge) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(Ta.current, Rg) ? xj() : rv();
          }
        }
        var q = t.updateQueue;
        if (q !== null && (t.flags |= Qe), sn(t), (t.mode & tt) !== ge && ze) {
          var oe = t.child;
          oe !== null && (t.treeBaseDuration -= oe.treeBaseDuration);
        }
        return null;
      }
      case M:
        return Ul(t), Hm(e, t), e === null && F0(t.stateNode.containerInfo), sn(t), null;
      case B:
        var re = t.type._context;
        return Dp(re, t), sn(t), null;
      case Se: {
        var xe = t.type;
        return qa(xe) && nc(t), sn(t), null;
      }
      case Oe: {
        zl(t);
        var je = t.memoizedState;
        if (je === null)
          return sn(t), null;
        var at = (t.flags & Ke) !== Ee, Ie = je.rendering;
        if (Ie === null)
          if (at)
            Lu(je, !1);
          else {
            var Tt = Rj() && (e === null || (e.flags & Ke) === Ee);
            if (!Tt)
              for (var qe = t.child; qe !== null; ) {
                var Dt = Rc(qe);
                if (Dt !== null) {
                  at = !0, t.flags |= Ke, Lu(je, !1);
                  var xn = Dt.updateQueue;
                  return xn !== null && (t.updateQueue = xn, t.flags |= Qe), t.subtreeFlags = Ee, dD(t, n), Kr(t, Up(Ta.current, bu)), t.child;
                }
                qe = qe.sibling;
              }
            je.tail !== null && Kt() > Kb() && (t.flags |= Ke, at = !0, Lu(je, !1), t.lanes = jh);
          }
        else {
          if (!at) {
            var mn = Rc(Ie);
            if (mn !== null) {
              t.flags |= Ke, at = !0;
              var ea = mn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Qe), Lu(je, !0), je.tail === null && je.tailMode === "hidden" && !Ie.alternate && !on())
                return sn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            Kt() * 2 - je.renderingStartTime > Kb() && n !== Gn && (t.flags |= Ke, at = !0, Lu(je, !1), t.lanes = jh);
          }
          if (je.isBackwards)
            Ie.sibling = t.child, t.child = Ie;
          else {
            var Mn = je.last;
            Mn !== null ? Mn.sibling = Ie : t.child = Ie, je.last = Ie;
          }
        }
        if (je.tail !== null) {
          var An = je.tail;
          je.rendering = An, je.tail = An.sibling, je.renderingStartTime = Kt(), An.sibling = null;
          var Sn = Ta.current;
          return at ? Sn = Up(Sn, bu) : Sn = Fl(Sn), Kr(t, Sn), An;
        }
        return sn(t), null;
      }
      case Ae:
        break;
      case pe:
      case Ge: {
        av(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, er = Wu !== null;
          er !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Yt && (t.flags |= Si);
        }
        return !Jl || (t.mode & Pe) === ge ? sn(t) : Wn(Za, Gn) && (sn(t), t.subtreeFlags & (Ot | Qe) && (t.flags |= Si)), null;
      }
      case rt:
        return null;
      case ee:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function xT(e, t, n) {
    switch (dp(t), t.tag) {
      case T: {
        var a = t.type;
        qa(a) && nc(t);
        var r = t.flags;
        return r & _n ? (t.flags = r & ~_n | Ke, (t.mode & tt) !== ge && cm(t), t) : null;
      }
      case S: {
        t.stateNode, Ul(t), up(t), zp();
        var i = t.flags;
        return (i & _n) !== Ee && (i & Ke) === Ee ? (t.flags = i & ~_n | Ke, t) : null;
      }
      case z:
        return Ap(t), null;
      case Y: {
        zl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var o = t.flags;
        return o & _n ? (t.flags = o & ~_n | Ke, (t.mode & tt) !== ge && cm(t), t) : null;
      }
      case Oe:
        return zl(t), null;
      case M:
        return Ul(t), null;
      case B:
        var u = t.type._context;
        return Dp(u, t), null;
      case pe:
      case Ge:
        return av(t), null;
      case rt:
        return null;
      default:
        return null;
    }
  }
  function _b(e, t, n) {
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
      case Y:
        zl(t);
        break;
      case Oe:
        zl(t);
        break;
      case B:
        var r = t.type._context;
        Dp(r, t);
        break;
      case pe:
      case Ge:
        av(t);
        break;
    }
  }
  var Ob = null;
  Ob = /* @__PURE__ */ new Set();
  var Wc = !1, cn = !1, ST = typeof WeakSet == "function" ? WeakSet : Set, se = null, Il = null, ql = null;
  function RT(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var CT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & tt)
      try {
        Xa(), t.componentWillUnmount();
      } finally {
        Ka(e);
      }
    else
      t.componentWillUnmount();
  };
  function Lb(e, t) {
    try {
      Zr(Ut, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      CT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function DT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      lt(e, t, a);
    }
  }
  function Vb(e, t) {
    try {
      Ab(e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Gl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (It && na && e.mode & tt)
            try {
              Xa(), a = n(null);
            } finally {
              Ka(e);
            }
          else
            a = n(null);
        } catch (r) {
          lt(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", we(e));
      } else
        n.current = null;
  }
  function Qc(e, t, n) {
    try {
      n();
    } catch (a) {
      lt(e, t, a);
    }
  }
  var Mb = !1;
  function TT(e, t) {
    zC(e.containerInfo), se = t, jT();
    var n = Mb;
    return Mb = !1, n;
  }
  function jT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      (e.subtreeFlags & Wf) !== Ee && t !== null ? (t.return = e, se = t) : wT();
    }
  }
  function wT() {
    for (; se !== null; ) {
      var e = se;
      ht(e);
      try {
        _T(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      Qt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, se = t;
        return;
      }
      se = e.return;
    }
  }
  function _T(e) {
    var t = e.alternate, n = e.flags;
    if ((n & dl) !== Ee) {
      switch (ht(e), e.tag) {
        case D:
        case G:
        case P:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !$i && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : wa(e.type, a), r);
            {
              var o = Ob;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", we(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case S: {
          {
            var u = e.stateNode;
            c0(u.containerInfo);
          }
          break;
        }
        case z:
        case W:
        case M:
        case Se:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      Qt();
    }
  }
  function Oa(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && ((e & un) !== Pn ? Ix(t) : (e & Ut) !== Pn && Sh(t), (e & Ga) !== Pn && Iu(!0), Qc(t, n, o), (e & Ga) !== Pn && Iu(!1), (e & un) !== Pn ? qx() : (e & Ut) !== Pn && Rh());
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
          (e & un) !== Pn ? $x(t) : (e & Ut) !== Pn && Gx(t);
          var l = i.create;
          (e & Ga) !== Pn && Iu(!0), i.destroy = l(), (e & Ga) !== Pn && Iu(!1), (e & un) !== Pn ? Yx() : (e & Ut) !== Pn && Wx();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var u = void 0;
              (i.tag & Ut) !== Ee ? u = "useLayoutEffect" : (i.tag & Ga) !== Ee ? u = "useInsertionEffect" : u = "useEffect";
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
  function OT(e, t) {
    if ((t.flags & Qe) !== Ee)
      switch (t.tag) {
        case Q: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Kg(), o = t.alternate === null ? "mount" : "update";
          Qg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case S:
                var p = u.stateNode;
                p.passiveEffectDuration += n;
                break e;
              case Q:
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
  function LT(e, t, n, a) {
    if ((n.flags & To) !== Ee)
      switch (n.tag) {
        case D:
        case G:
        case P: {
          if (!cn)
            if (n.mode & tt)
              try {
                Xa(), Zr(Ut | kt, n);
              } finally {
                Ka(n);
              }
            else
              Zr(Ut | kt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Qe && !cn)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(n) || "instance")), n.mode & tt)
                try {
                  Xa(), r.componentDidMount();
                } finally {
                  Ka(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : wa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(n) || "instance")), n.mode & tt)
                try {
                  Xa(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ka(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(n) || "instance")), Ng(n, o, r));
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
            Ng(n, u, p);
          }
          break;
        }
        case z: {
          var v = n.stateNode;
          if (t === null && n.flags & Qe) {
            var x = n.type, E = n.memoizedProps;
            KC(v, x, E);
          }
          break;
        }
        case W:
          break;
        case M:
          break;
        case Q: {
          {
            var O = n.memoizedProps, V = O.onCommit, U = O.onRender, ae = n.stateNode.effectDuration, he = Kg(), de = t === null ? "mount" : "update";
            Qg() && (de = "nested-update"), typeof U == "function" && U(n.memoizedProps.id, de, n.actualDuration, n.treeBaseDuration, n.actualStartTime, he);
            {
              typeof V == "function" && V(n.memoizedProps.id, de, ae, he), wj(n);
              var Ye = n.return;
              e: for (; Ye !== null; ) {
                switch (Ye.tag) {
                  case S:
                    var ze = Ye.stateNode;
                    ze.effectDuration += ae;
                    break e;
                  case Q:
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
        case Y: {
          HT(e, n);
          break;
        }
        case Oe:
        case Se:
        case Ae:
        case pe:
        case Ge:
        case ee:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    cn || n.flags & xi && Ab(n);
  }
  function VT(e) {
    switch (e.tag) {
      case D:
      case G:
      case P: {
        if (e.mode & tt)
          try {
            Xa(), Lb(e, e.return);
          } finally {
            Ka(e);
          }
        else
          Lb(e, e.return);
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && DT(e, e.return, t), Vb(e, e.return);
        break;
      }
      case z: {
        Vb(e, e.return);
        break;
      }
    }
  }
  function MT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === z) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? l0(r) : u0(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === W) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? o0(i) : s0(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === pe || a.tag === Ge) && a.memoizedState !== null && a !== e)) {
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
  function Ab(e) {
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
            Xa(), r = t(a);
          } finally {
            Ka(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", we(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", we(e)), t.current = a;
    }
  }
  function AT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function kb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, kb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === z) {
        var n = e.stateNode;
        n !== null && B0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function kT(e) {
    for (var t = e.return; t !== null; ) {
      if (Ub(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ub(e) {
    return e.tag === z || e.tag === S || e.tag === M;
  }
  function Fb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ub(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== z && t.tag !== W && t.tag !== Me; ) {
        if (t.flags & Ot || t.child === null || t.tag === M)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Ot))
        return t.stateNode;
    }
  }
  function UT(e) {
    var t = kT(e);
    switch (t.tag) {
      case z: {
        var n = t.stateNode;
        t.flags & Do && (Hy(n), t.flags &= ~Do);
        var a = Fb(e);
        $m(e, a, n);
        break;
      }
      case S:
      case M: {
        var r = t.stateNode.containerInfo, i = Fb(e);
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
      t ? n0(n, i, t) : e0(n, i);
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
      t ? t0(n, i, t) : ZC(n, i);
    } else if (a !== M) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var o = l.sibling; o !== null; )
          $m(o, t, n), o = o.sibling;
      }
    }
  }
  var fn = null, La = !1;
  function FT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case z: {
            fn = a.stateNode, La = !1;
            break e;
          }
          case S: {
            fn = a.stateNode.containerInfo, La = !0;
            break e;
          }
          case M: {
            fn = a.stateNode.containerInfo, La = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (fn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      zb(e, t, n), fn = null, La = !1;
    }
    AT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      zb(e, t, a), a = a.sibling;
  }
  function zb(e, t, n) {
    switch (zx(n), n.tag) {
      case z:
        cn || Gl(n, t);
      case W: {
        {
          var a = fn, r = La;
          fn = null, ei(e, t, n), fn = a, La = r, fn !== null && (La ? r0(fn, n.stateNode) : a0(fn, n.stateNode));
        }
        return;
      }
      case Me: {
        fn !== null && (La ? i0(fn, n.stateNode) : ep(fn, n.stateNode));
        return;
      }
      case M: {
        {
          var i = fn, l = La;
          fn = n.stateNode.containerInfo, La = !0, ei(e, t, n), fn = i, La = l;
        }
        return;
      }
      case D:
      case G:
      case Z:
      case P: {
        if (!cn) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var p = u.next, v = p;
              do {
                var x = v, E = x.destroy, O = x.tag;
                E !== void 0 && ((O & Ga) !== Pn ? Qc(n, t, E) : (O & Ut) !== Pn && (Sh(n), n.mode & tt ? (Xa(), Qc(n, t, E), Ka(n)) : Qc(n, t, E), Rh())), v = v.next;
              } while (v !== p);
            }
          }
        }
        ei(e, t, n);
        return;
      }
      case T: {
        if (!cn) {
          Gl(n, t);
          var V = n.stateNode;
          typeof V.componentWillUnmount == "function" && Bm(n, t, V);
        }
        ei(e, t, n);
        return;
      }
      case Ae: {
        ei(e, t, n);
        return;
      }
      case pe: {
        if (
          // TODO: Remove this dead flag
          n.mode & Pe
        ) {
          var U = cn;
          cn = U || n.memoizedState !== null, ei(e, t, n), cn = U;
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
  function zT(e) {
    e.memoizedState;
  }
  function HT(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && R0(i);
        }
      }
    }
  }
  function Hb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new ST()), t.forEach(function(a) {
        var r = kj.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), xa)
            if (Il !== null && ql !== null)
              Yu(ql, Il);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function BT(e, t, n) {
    Il = n, ql = e, ht(t), Bb(t, e), ht(t), Il = null, ql = null;
  }
  function Va(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          FT(e, t, i);
        } catch (u) {
          lt(i, t, u);
        }
      }
    var l = us();
    if (t.subtreeFlags & Qf)
      for (var o = t.child; o !== null; )
        ht(o), Bb(o, e), o = o.sibling;
    ht(l);
  }
  function Bb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case D:
      case G:
      case Z:
      case P: {
        if (Va(t, e), Ja(e), r & Qe) {
          try {
            Oa(Ga | kt, e, e.return), Zr(Ga | kt, e);
          } catch (xe) {
            lt(e, e.return, xe);
          }
          if (e.mode & tt) {
            try {
              Xa(), Oa(Ut | kt, e, e.return);
            } catch (xe) {
              lt(e, e.return, xe);
            }
            Ka(e);
          } else
            try {
              Oa(Ut | kt, e, e.return);
            } catch (xe) {
              lt(e, e.return, xe);
            }
        }
        return;
      }
      case T: {
        Va(t, e), Ja(e), r & xi && a !== null && Gl(a, a.return);
        return;
      }
      case z: {
        Va(t, e), Ja(e), r & xi && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              Hy(i);
            } catch (xe) {
              lt(e, e.return, xe);
            }
          }
          if (r & Qe) {
            var l = e.stateNode;
            if (l != null) {
              var o = e.memoizedProps, u = a !== null ? a.memoizedProps : o, p = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  XC(l, v, p, u, o, e);
                } catch (xe) {
                  lt(e, e.return, xe);
                }
            }
          }
        }
        return;
      }
      case W: {
        if (Va(t, e), Ja(e), r & Qe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, E = e.memoizedProps, O = a !== null ? a.memoizedProps : E;
          try {
            JC(x, O, E);
          } catch (xe) {
            lt(e, e.return, xe);
          }
        }
        return;
      }
      case S: {
        if (Va(t, e), Ja(e), r & Qe && a !== null) {
          var V = a.memoizedState;
          if (V.isDehydrated)
            try {
              S0(t.containerInfo);
            } catch (xe) {
              lt(e, e.return, xe);
            }
        }
        return;
      }
      case M: {
        Va(t, e), Ja(e);
        return;
      }
      case Y: {
        Va(t, e), Ja(e);
        var U = e.child;
        if (U.flags & Si) {
          var ae = U.stateNode, he = U.memoizedState, de = he !== null;
          if (ae.isHidden = de, de) {
            var Ye = U.alternate !== null && U.alternate.memoizedState !== null;
            Ye || Ej();
          }
        }
        if (r & Qe) {
          try {
            zT(e);
          } catch (xe) {
            lt(e, e.return, xe);
          }
          Hb(e);
        }
        return;
      }
      case pe: {
        var ze = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Pe
        ) {
          var j = cn;
          cn = j || ze, Va(t, e), cn = j;
        } else
          Va(t, e);
        if (Ja(e), r & Si) {
          var F = e.stateNode, w = e.memoizedState, q = w !== null, oe = e;
          if (F.isHidden = q, q && !ze && (oe.mode & Pe) !== ge) {
            se = oe;
            for (var re = oe.child; re !== null; )
              se = re, $T(re), re = re.sibling;
          }
          MT(oe, q);
        }
        return;
      }
      case Oe: {
        Va(t, e), Ja(e), r & Qe && Hb(e);
        return;
      }
      case Ae:
        return;
      default: {
        Va(t, e), Ja(e);
        return;
      }
    }
  }
  function Ja(e) {
    var t = e.flags;
    if (t & Ot) {
      try {
        UT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~Ot;
    }
    t & fr && (e.flags &= ~fr);
  }
  function PT(e, t, n) {
    Il = n, ql = t, se = e, Pb(e, t, n), Il = null, ql = null;
  }
  function Pb(e, t, n) {
    for (var a = (e.mode & Pe) !== ge; se !== null; ) {
      var r = se, i = r.child;
      if (r.tag === pe && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var u = r.alternate, p = u !== null && u.memoizedState !== null, v = p || cn, x = Wc, E = cn;
          Wc = o, cn = v, cn && !E && (se = r, YT(r));
          for (var O = i; O !== null; )
            se = O, Pb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          se = r, Wc = x, cn = E, Ym(e, t, n);
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
        ht(a);
        try {
          LT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
        }
        Qt();
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
  function $T(e) {
    for (; se !== null; ) {
      var t = se, n = t.child;
      switch (t.tag) {
        case D:
        case G:
        case Z:
        case P: {
          if (t.mode & tt)
            try {
              Xa(), Oa(Ut, t, t.return);
            } finally {
              Ka(t);
            }
          else
            Oa(Ut, t, t.return);
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
        case pe: {
          var r = t.memoizedState !== null;
          if (r) {
            $b(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, se = n) : $b(e);
    }
  }
  function $b(e) {
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
  function YT(e) {
    for (; se !== null; ) {
      var t = se, n = t.child;
      if (t.tag === pe) {
        var a = t.memoizedState !== null;
        if (a) {
          Yb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, se = n) : Yb(e);
    }
  }
  function Yb(e) {
    for (; se !== null; ) {
      var t = se;
      ht(t);
      try {
        VT(t);
      } catch (a) {
        lt(t, t.return, a);
      }
      if (Qt(), t === e) {
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
  function IT(e, t, n, a) {
    se = t, qT(t, e, n, a);
  }
  function qT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se, i = r.child;
      (r.subtreeFlags & pl) !== Ee && i !== null ? (i.return = r, se = i) : GT(e, t, n, a);
    }
  }
  function GT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se;
      if ((r.flags & Ar) !== Ee) {
        ht(r);
        try {
          WT(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
        }
        Qt();
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
  function WT(e, t, n, a) {
    switch (t.tag) {
      case D:
      case G:
      case P: {
        if (t.mode & tt) {
          sm();
          try {
            Zr(un | kt, t);
          } finally {
            um(t);
          }
        } else
          Zr(un | kt, t);
        break;
      }
    }
  }
  function QT(e) {
    se = e, KT();
  }
  function KT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      if ((se.flags & Ei) !== Ee) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            se = r, ZT(r, e);
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
      (e.subtreeFlags & pl) !== Ee && t !== null ? (t.return = e, se = t) : XT();
    }
  }
  function XT() {
    for (; se !== null; ) {
      var e = se;
      (e.flags & Ar) !== Ee && (ht(e), JT(e), Qt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, se = t;
        return;
      }
      se = e.return;
    }
  }
  function JT(e) {
    switch (e.tag) {
      case D:
      case G:
      case P: {
        e.mode & tt ? (sm(), Oa(un | kt, e, e.return), um(e)) : Oa(un | kt, e, e.return);
        break;
      }
    }
  }
  function ZT(e, t) {
    for (; se !== null; ) {
      var n = se;
      ht(n), tj(n, t), Qt();
      var a = n.child;
      a !== null ? (a.return = n, se = a) : ej(e);
    }
  }
  function ej(e) {
    for (; se !== null; ) {
      var t = se, n = t.sibling, a = t.return;
      if (kb(t), t === e) {
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
  function tj(e, t) {
    switch (e.tag) {
      case D:
      case G:
      case P: {
        e.mode & tt ? (sm(), Oa(un, e, t), um(e)) : Oa(un, e, t);
        break;
      }
    }
  }
  function nj(e) {
    switch (e.tag) {
      case D:
      case G:
      case P: {
        try {
          Zr(Ut | kt, e);
        } catch (n) {
          lt(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          lt(e, e.return, n);
        }
        break;
      }
    }
  }
  function aj(e) {
    switch (e.tag) {
      case D:
      case G:
      case P: {
        try {
          Zr(un | kt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function rj(e) {
    switch (e.tag) {
      case D:
      case G:
      case P: {
        try {
          Oa(Ut | kt, e, e.return);
        } catch (n) {
          lt(e, e.return, n);
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
  function ij(e) {
    switch (e.tag) {
      case D:
      case G:
      case P:
        try {
          Oa(un | kt, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Vu = Symbol.for;
    Vu("selector.component"), Vu("selector.has_pseudo_class"), Vu("selector.role"), Vu("selector.test_id"), Vu("selector.text");
  }
  var lj = [];
  function oj() {
    lj.forEach(function(e) {
      return e();
    });
  }
  var uj = h.ReactCurrentActQueue;
  function sj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Ib() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && uj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var cj = Math.ceil, Im = h.ReactCurrentDispatcher, qm = h.ReactCurrentOwner, dn = h.ReactCurrentBatchConfig, Ma = h.ReactCurrentActQueue, Ht = (
    /*             */
    0
  ), qb = (
    /*               */
    1
  ), pn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), Sr = 0, Mu = 1, Yi = 2, Kc = 3, Au = 4, Gb = 5, Gm = 6, $e = Ht, Ln = null, xt = null, Bt = $, Za = $, Wm = Yr($), Pt = Sr, ku = null, Xc = $, Uu = $, Jc = $, Fu = null, $n = null, Qm = 0, Wb = 500, Qb = 1 / 0, fj = 500, Rr = null;
  function zu() {
    Qb = Kt() + fj;
  }
  function Kb() {
    return Qb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ti = null, Hu = $, Xm = [], Jm = null, dj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, pj = 50, Ql = 0, tf = null, Pu = st, nf = $, Xb = !1;
  function af() {
    return Ln;
  }
  function Vn() {
    return ($e & (pn | da)) !== Ht ? Kt() : (Pu !== st || (Pu = Kt()), Pu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Pe) === ge)
      return Ce;
    if (($e & pn) !== Ht && Bt !== $)
      return Mo(Bt);
    var n = uD() !== oD;
    if (n) {
      if (dn.transition !== null) {
        var a = dn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Jt && (nf = Lh()), nf;
    }
    var r = Sa();
    if (r !== Jt)
      return r;
    var i = qC();
    return i;
  }
  function mj(e) {
    var t = e.mode;
    return (t & Pe) === ge ? Ce : hS();
  }
  function $t(e, t, n, a) {
    Fj(), Xb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Ao(e, n, a), ($e & pn) !== $ && e === Ln ? Bj(t) : (xa && Ah(e, t, n), Pj(t), e === Ln && (($e & pn) === Ht && (Uu = Ve(Uu, n)), Pt === Au && ai(e, Bt)), Yn(e, a), n === Ce && $e === Ht && (t.mode & Pe) === ge && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Ma.isBatchingLegacy && (zu(), Xy()));
  }
  function vj(e, t, n) {
    var a = e.current;
    a.lanes = t, Ao(e, t, n), Yn(e, n);
  }
  function hj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      ($e & pn) !== Ht
    );
  }
  function Yn(e, t) {
    var n = e.callbackNode;
    cS(e, t);
    var a = Rs(e, e === Ln ? Bt : $);
    if (a === $) {
      n !== null && pN(n), e.callbackNode = null, e.callbackPriority = Jt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Ma.current !== null && n !== ov)) {
      n == null && i !== Ce && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && pN(n);
    var l;
    if (r === Ce)
      e.tag === Ir ? (Ma.isBatchingLegacy !== null && (Ma.didScheduleLegacyUpdate = !0), Y0(eN.bind(null, e))) : Ky(eN.bind(null, e)), Ma.current !== null ? Ma.current.push(qr) : WC(function() {
        ($e & (pn | da)) === Ht && qr();
      }), l = null;
    else {
      var o;
      switch (Fh(a)) {
        case Qn:
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
      l = uv(o, Jb.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function Jb(e, t) {
    if (MD(), Pu = st, nf = $, ($e & (pn | da)) !== Ht)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === Ln ? Bt : $);
    if (r === $)
      return null;
    var i = !Cs(e, r) && !vS(e, r) && !t, l = i ? Dj(e, r) : lf(e, r);
    if (l !== Sr) {
      if (l === Yi) {
        var o = bd(e);
        o !== $ && (r = o, l = tv(e, o));
      }
      if (l === Mu) {
        var u = ku;
        throw qi(e, $), ai(e, r), Yn(e, Kt()), u;
      }
      if (l === Gm)
        ai(e, r);
      else {
        var p = !Cs(e, r), v = e.current.alternate;
        if (p && !gj(v)) {
          if (l = lf(e, r), l === Yi) {
            var x = bd(e);
            x !== $ && (r = x, l = tv(e, x));
          }
          if (l === Mu) {
            var E = ku;
            throw qi(e, $), ai(e, r), Yn(e, Kt()), E;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, yj(e, l, r);
      }
    }
    return Yn(e, Kt()), e.callbackNode === n ? Jb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = Fu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= cr, U0(e.containerInfo);
    }
    var r = lf(e, t);
    if (r !== Yi) {
      var i = $n;
      $n = n, i !== null && Zb(i);
    }
    return r;
  }
  function Zb(e) {
    $n === null ? $n = e : $n.push.apply($n, e);
  }
  function yj(e, t, n) {
    switch (t) {
      case Sr:
      case Mu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, $n, Rr);
        break;
      }
      case Kc: {
        if (ai(e, n), _h(n) && // do not delay if we're inside an act() scope
        !mN()) {
          var a = Qm + Wb - Kt();
          if (a > 10) {
            var r = Rs(e, $);
            if (r !== $)
              break;
            var i = e.suspendedLanes;
            if (!bl(i, n)) {
              Vn(), Mh(e, i);
              break;
            }
            e.timeoutHandle = Jd(Gi.bind(null, e, $n, Rr), a);
            break;
          }
        }
        Gi(e, $n, Rr);
        break;
      }
      case Au: {
        if (ai(e, n), mS(n))
          break;
        if (!mN()) {
          var l = uS(e, n), o = l, u = Kt() - o, p = Uj(u) - u;
          if (p > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, $n, Rr), p);
            break;
          }
        }
        Gi(e, $n, Rr);
        break;
      }
      case Gb: {
        Gi(e, $n, Rr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function gj(e) {
    for (var t = e; ; ) {
      if (t.flags & $f) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, o = i.value;
              try {
                if (!Xn(l(), o))
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
    t = Ds(t, Jc), t = Ds(t, Uu), gS(e, t);
  }
  function eN(e) {
    if (AD(), ($e & (pn | da)) !== Ht)
      throw new Error("Should not already be working.");
    Dr();
    var t = Rs(e, $);
    if (!Wn(t, Ce))
      return Yn(e, Kt()), null;
    var n = lf(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = bd(e);
      a !== $ && (t = a, n = tv(e, a));
    }
    if (n === Mu) {
      var r = ku;
      throw qi(e, $), ai(e, t), Yn(e, Kt()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, $n, Rr), Yn(e, Kt()), null;
  }
  function bj(e, t) {
    t !== $ && (Sd(e, Ve(t, Ce)), Yn(e, Kt()), ($e & (pn | da)) === Ht && (zu(), qr()));
  }
  function nv(e, t) {
    var n = $e;
    $e |= qb;
    try {
      return e(t);
    } finally {
      $e = n, $e === Ht && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Ma.isBatchingLegacy && (zu(), Xy());
    }
  }
  function Nj(e, t, n, a, r) {
    var i = Sa(), l = dn.transition;
    try {
      return dn.transition = null, Zt(Qn), e(t, n, a, r);
    } finally {
      Zt(i), dn.transition = l, $e === Ht && zu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && ($e & (pn | da)) === Ht && Dr();
    var t = $e;
    $e |= qb;
    var n = dn.transition, a = Sa();
    try {
      return dn.transition = null, Zt(Qn), e ? e() : void 0;
    } finally {
      Zt(a), dn.transition = n, $e = t, ($e & (pn | da)) === Ht && qr();
    }
  }
  function tN() {
    return ($e & (pn | da)) !== Ht;
  }
  function rf(e, t) {
    Nn(Wm, Za, e), Za = Ve(Za, t);
  }
  function av(e) {
    Za = Wm.current, bn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = $;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, GC(n)), xt !== null)
      for (var a = xt.return; a !== null; ) {
        var r = a.alternate;
        _b(r, a), a = a.return;
      }
    Ln = e;
    var i = Wi(e.current, null);
    return xt = i, Bt = Za = t, Pt = Sr, ku = null, Xc = $, Uu = $, Jc = $, Fu = null, $n = null, vD(), Da.discardPendingWarnings(), i;
  }
  function nN(e, t) {
    do {
      var n = xt;
      try {
        if (mc(), Dg(), Qt(), qm.current = null, n === null || n.return === null) {
          Pt = Mu, ku = t, xt = null;
          return;
        }
        if (It && n.mode & tt && $c(n, !0), bt)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            Kx(n, a, Bt);
          } else
            Qx(n, t, Bt);
        YD(e, n.return, n, t, Bt), lN(n);
      } catch (r) {
        t = r, xt === n && n !== null ? (n = n.return, xt = n) : n = xt;
        continue;
      }
      return;
    } while (!0);
  }
  function aN() {
    var e = Im.current;
    return Im.current = Fc, e === null ? Fc : e;
  }
  function rN(e) {
    Im.current = e;
  }
  function Ej() {
    Qm = Kt();
  }
  function $u(e) {
    Xc = Ve(e, Xc);
  }
  function xj() {
    Pt === Sr && (Pt = Kc);
  }
  function rv() {
    (Pt === Sr || Pt === Kc || Pt === Yi) && (Pt = Au), Ln !== null && (Nd(Xc) || Nd(Uu)) && ai(Ln, Bt);
  }
  function Sj(e) {
    Pt !== Au && (Pt = Yi), Fu === null ? Fu = [e] : Fu.push(e);
  }
  function Rj() {
    return Pt === Sr;
  }
  function lf(e, t) {
    var n = $e;
    $e |= pn;
    var a = aN();
    if (Ln !== e || Bt !== t) {
      if (xa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Bt), r.clear()), kh(e, t);
      }
      Rr = Uh(), qi(e, t);
    }
    Ch(t);
    do
      try {
        Cj();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    if (mc(), $e = n, rN(a), xt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Dh(), Ln = null, Bt = $, Pt;
  }
  function Cj() {
    for (; xt !== null; )
      iN(xt);
  }
  function Dj(e, t) {
    var n = $e;
    $e |= pn;
    var a = aN();
    if (Ln !== e || Bt !== t) {
      if (xa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Bt), r.clear()), kh(e, t);
      }
      Rr = Uh(), zu(), qi(e, t);
    }
    Ch(t);
    do
      try {
        Tj();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    return mc(), rN(a), $e = n, xt !== null ? (tS(), Sr) : (Dh(), Ln = null, Bt = $, Pt);
  }
  function Tj() {
    for (; xt !== null && !wx(); )
      iN(xt);
  }
  function iN(e) {
    var t = e.alternate;
    ht(e);
    var n;
    (e.mode & tt) !== ge ? (om(e), n = iv(t, e, Za), $c(e, !0)) : n = iv(t, e, Za), Qt(), e.memoizedProps = e.pendingProps, n === null ? lN(e) : xt = n, qm.current = null;
  }
  function lN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ee) {
        ht(t);
        var r = void 0;
        if ((t.mode & tt) === ge ? r = wb(n, t, Za) : (om(t), r = wb(n, t, Za), $c(t, !1)), Qt(), r !== null) {
          xt = r;
          return;
        }
      } else {
        var i = xT(n, t);
        if (i !== null) {
          i.flags &= Sx, xt = i;
          return;
        }
        if ((t.mode & tt) !== ge) {
          $c(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= bs, a.subtreeFlags = Ee, a.deletions = null;
        else {
          Pt = Gm, xt = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        xt = u;
        return;
      }
      t = a, xt = t;
    } while (t !== null);
    Pt === Sr && (Pt = Gb);
  }
  function Gi(e, t, n) {
    var a = Sa(), r = dn.transition;
    try {
      dn.transition = null, Zt(Qn), jj(e, t, n, a);
    } finally {
      dn.transition = r, Zt(a);
    }
    return null;
  }
  function jj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (zj(), ($e & (pn | da)) !== Ht)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (Px(i), r === null)
      return xh(), null;
    if (i === $ && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Jt;
    var l = Ve(r.lanes, r.childLanes);
    bS(e, l), e === Ln && (Ln = null, xt = null, Bt = $), ((r.subtreeFlags & pl) !== Ee || (r.flags & pl) !== Ee) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Dr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ee, u = (r.flags & (Wf | Qf | To | pl)) !== Ee;
    if (o || u) {
      var p = dn.transition;
      dn.transition = null;
      var v = Sa();
      Zt(Qn);
      var x = $e;
      $e |= da, qm.current = null, TT(e, r), Xg(), BT(e, r, i), HC(e.containerInfo), e.current = r, Xx(i), PT(r, e, i), Jx(), _x(), $e = x, Zt(v), dn.transition = p;
    } else
      e.current = r, Xg();
    var E = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === $ && (Wl = null), E || cN(e.current, !1), Ux(r.stateNode, a), xa && e.memoizedUpdaters.clear(), oj(), Yn(e, Kt()), t !== null)
      for (var O = e.onRecoverableError, V = 0; V < t.length; V++) {
        var U = t[V], ae = U.stack, he = U.digest;
        O(U.value, {
          componentStack: ae,
          digest: he
        });
      }
    if (Zc) {
      Zc = !1;
      var de = Km;
      throw Km = null, de;
    }
    return Wn(Hu, Ce) && e.tag !== Ir && Dr(), l = e.pendingLanes, Wn(l, Ce) ? (VD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, qr(), xh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = Fh(Hu), t = SS(vr, e), n = dn.transition, a = Sa();
      try {
        return dn.transition = null, Zt(t), _j();
      } finally {
        Zt(a), dn.transition = n;
      }
    }
    return !1;
  }
  function wj(e) {
    Xm.push(e), Ii || (Ii = !0, uv(Di, function() {
      return Dr(), null;
    }));
  }
  function _j() {
    if (ti === null)
      return !1;
    var e = Jm;
    Jm = null;
    var t = ti, n = Hu;
    if (ti = null, Hu = $, ($e & (pn | da)) !== Ht)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, Zx(n);
    var a = $e;
    $e |= da, QT(t.current), IT(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        OT(t, l);
      }
    }
    eS(), cN(t.current, !0), $e = a, qr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, Fx(t);
    {
      var o = t.current.stateNode;
      o.effectDuration = 0, o.passiveEffectDuration = 0;
    }
    return !0;
  }
  function oN(e) {
    return Wl !== null && Wl.has(e);
  }
  function Oj(e) {
    Wl === null ? Wl = /* @__PURE__ */ new Set([e]) : Wl.add(e);
  }
  function Lj(e) {
    Zc || (Zc = !0, Km = e);
  }
  var Vj = Lj;
  function uN(e, t, n) {
    var a = Pi(n, t), r = ib(e, a, Ce), i = Wr(e, r, Ce), l = Vn();
    i !== null && (Ao(i, Ce, l), Yn(i, l));
  }
  function lt(e, t, n) {
    if (RT(n), Iu(!1), e.tag === S) {
      uN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === S) {
        uN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !oN(i)) {
          var l = Pi(n, e), o = Cm(a, l, Ce), u = Wr(a, o, Ce), p = Vn();
          u !== null && (Ao(u, Ce, p), Yn(u, p));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Mj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Vn();
    Mh(e, n), $j(e), Ln === e && bl(Bt, n) && (Pt === Au || Pt === Kc && _h(Bt) && Kt() - Qm < Wb ? qi(e, $) : Jc = Ve(Jc, n)), Yn(e, r);
  }
  function sN(e, t) {
    t === Jt && (t = mj(e));
    var n = Vn(), a = Bn(e, t);
    a !== null && (Ao(a, t, n), Yn(a, n));
  }
  function Aj(e) {
    var t = e.memoizedState, n = Jt;
    t !== null && (n = t.retryLane), sN(e, n);
  }
  function kj(e, t) {
    var n = Jt, a;
    switch (e.tag) {
      case Y:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case Oe:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), sN(e, n);
  }
  function Uj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : cj(e / 1960) * 1960;
  }
  function Fj() {
    if (Bu > dj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > pj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function zj() {
    Da.flushLegacyContextWarning(), Da.flushPendingUnsafeLifecycleWarnings();
  }
  function cN(e, t) {
    ht(e), of(e, kr, rj), t && of(e, Gf, ij), of(e, kr, nj), t && of(e, Gf, aj), Qt();
  }
  function of(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ee ? a = a.child : ((a.flags & t) !== Ee && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var uf = null;
  function fN(e) {
    {
      if (($e & pn) !== Ht || !(e.mode & Pe))
        return;
      var t = e.tag;
      if (t !== _ && t !== S && t !== T && t !== D && t !== G && t !== Z && t !== P)
        return;
      var n = we(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = Tn;
      try {
        ht(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? ht(e) : Qt();
      }
    }
  }
  var iv;
  {
    var Hj = null;
    iv = function(e, t, n) {
      var a = bN(Hj, t);
      try {
        return Rb(e, t, n);
      } catch (i) {
        if (J0() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (mc(), Dg(), _b(e, t), bN(t, a), t.mode & tt && om(t), Bf(null, Rb, null, e, t, n), Nx()) {
          var r = Pf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var dN = !1, lv;
  lv = /* @__PURE__ */ new Set();
  function Bj(e) {
    if (yi && !_D())
      switch (e.tag) {
        case D:
        case G:
        case P: {
          var t = xt && we(xt) || "Unknown", n = t;
          if (!lv.has(n)) {
            lv.add(n);
            var a = we(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          dN || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), dN = !0);
          break;
        }
      }
  }
  function Yu(e, t) {
    if (xa) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Ah(e, a, t);
      });
    }
  }
  var ov = {};
  function uv(e, t) {
    {
      var n = Ma.current;
      return n !== null ? (n.push(t), ov) : Eh(e, t);
    }
  }
  function pN(e) {
    if (e !== ov)
      return jx(e);
  }
  function mN() {
    return Ma.current !== null;
  }
  function Pj(e) {
    {
      if (e.mode & Pe) {
        if (!Ib())
          return;
      } else if (!sj() || $e !== Ht || e.tag !== D && e.tag !== G && e.tag !== P)
        return;
      if (Ma.current === null) {
        var t = Tn;
        try {
          ht(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, we(e));
        } finally {
          t ? ht(e) : Qt();
        }
      }
    }
  }
  function $j(e) {
    e.tag !== Ir && Ib() && Ma.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Iu(e) {
    Xb = e;
  }
  var pa = null, Kl = null, Yj = function(e) {
    pa = e;
  };
  function Xl(e) {
    {
      if (pa === null)
        return e;
      var t = pa(e);
      return t === void 0 ? e : t.current;
    }
  }
  function sv(e) {
    return Xl(e);
  }
  function cv(e) {
    {
      if (pa === null)
        return e;
      var t = pa(e);
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
  function vN(e, t) {
    {
      if (pa === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case T: {
          typeof a == "function" && (r = !0);
          break;
        }
        case D: {
          (typeof a == "function" || i === ye) && (r = !0);
          break;
        }
        case G: {
          (i === ve || i === ye) && (r = !0);
          break;
        }
        case Z:
        case P: {
          (i === Le || i === ye) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = pa(n);
        if (l !== void 0 && l === pa(a))
          return !0;
      }
      return !1;
    }
  }
  function hN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Kl === null && (Kl = /* @__PURE__ */ new WeakSet()), Kl.add(e);
    }
  }
  var Ij = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        fv(e.current, a, n);
      });
    }
  }, qj = function(e, t) {
    {
      if (e.context !== Jn)
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
        case D:
        case P:
        case T:
          u = o;
          break;
        case G:
          u = o.render;
          break;
      }
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var p = !1, v = !1;
      if (u !== null) {
        var x = pa(u);
        x !== void 0 && (n.has(x) ? v = !0 : t.has(x) && (l === T ? v = !0 : p = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || p) {
        var E = Bn(e, Ce);
        E !== null && $t(E, e, Ce, st);
      }
      r !== null && !v && fv(r, t, n), i !== null && fv(i, t, n);
    }
  }
  var Gj = function(e, t) {
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
        case D:
        case P:
        case T:
          o = l;
          break;
        case G:
          o = l.render;
          break;
      }
      var u = !1;
      o !== null && t.has(o) && (u = !0), u ? Wj(e, n) : a !== null && dv(a, t, n), r !== null && dv(r, t, n);
    }
  }
  function Wj(e, t) {
    {
      var n = Qj(e, t);
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
  function Qj(e, t) {
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
      var yN = Object.preventExtensions({});
    } catch {
      pv = !0;
    }
  }
  function Kj(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ee, this.subtreeFlags = Ee, this.deletions = null, this.lanes = $, this.childLanes = $, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Zn = function(e, t, n, a) {
    return new Kj(e, t, n, a);
  };
  function mv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function Xj(e) {
    return typeof e == "function" && !mv(e) && e.defaultProps === void 0;
  }
  function Jj(e) {
    if (typeof e == "function")
      return mv(e) ? T : D;
    if (e != null) {
      var t = e.$$typeof;
      if (t === ve)
        return G;
      if (t === Le)
        return Z;
    }
    return _;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ee, n.subtreeFlags = Ee, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case _:
      case D:
      case P:
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
  function Zj(e, t) {
    e.flags &= dr | Ot;
    var n = e.alternate;
    if (n === null)
      e.childLanes = $, e.lanes = t, e.child = null, e.subtreeFlags = Ee, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
  function e1(e, t, n) {
    var a;
    return e === rc ? (a = Pe, t === !0 && (a |= Ct, a |= $a)) : a = ge, xa && (a |= tt), Zn(S, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = _, o = e;
    if (typeof e == "function")
      mv(e) ? (l = T, o = sv(o)) : o = Xl(o);
    else if (typeof e == "string")
      l = z;
    else
      e: switch (e) {
        case za:
          return ri(n.children, r, i, t);
        case fi:
          l = X, r |= Ct, (r & Pe) !== ge && (r |= $a);
          break;
        case N:
          return t1(n, r, i, t);
        case He:
          return n1(n, r, i, t);
        case Re:
          return a1(n, r, i, t);
        case pt:
          return gN(n, r, i, t);
        case yn:
        case Mt:
        case Ha:
        case ba:
        case dt:
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
              case Le:
                l = Z;
                break e;
              case ye:
                l = _e, o = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var p = a ? we(a) : null;
            p && (u += `

Check the render method of \`` + p + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
        }
      }
    var v = Zn(l, n, t, r);
    return v.elementType = e, v.type = o, v.lanes = i, v._debugOwner = a, v;
  }
  function hv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vv(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ri(e, t, n, a) {
    var r = Zn(fe, e, a, t);
    return r.lanes = n, r;
  }
  function t1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(Q, e, a, t | tt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function n1(e, t, n, a) {
    var r = Zn(Y, e, a, t);
    return r.elementType = He, r.lanes = n, r;
  }
  function a1(e, t, n, a) {
    var r = Zn(Oe, e, a, t);
    return r.elementType = Re, r.lanes = n, r;
  }
  function gN(e, t, n, a) {
    var r = Zn(pe, e, a, t);
    r.elementType = pt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function yv(e, t, n) {
    var a = Zn(W, e, null, t);
    return a.lanes = n, a;
  }
  function r1() {
    var e = Zn(z, null, null, ge);
    return e.elementType = "DELETED", e;
  }
  function i1(e) {
    var t = Zn(Me, null, null, ge);
    return t.stateNode = e, t;
  }
  function gv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(M, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function bN(e, t) {
    return e === null && (e = Zn(_, null, null, ge)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function l1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Jt, this.eventTimes = xd($), this.expirationTimes = xd(st), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = xd($), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
  function NN(e, t, n, a, r, i, l, o, u, p) {
    var v = new l1(e, t, n, o, u), x = e1(t, i);
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
  function o1(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return aa(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: qn,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Nv, Ev;
  Nv = !1, Ev = {};
  function EN(e) {
    if (!e)
      return Jn;
    var t = cl(e), n = $0(t);
    if (t.tag === T) {
      var a = t.type;
      if (qa(a))
        return Wy(t, a, n);
    }
    return n;
  }
  function u1(e, t) {
    {
      var n = cl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = gh(n);
      if (r === null)
        return null;
      if (r.mode & Ct) {
        var i = we(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = Tn;
          try {
            ht(r), n.mode & Ct ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? ht(l) : Qt();
          }
        }
      }
      return r.stateNode;
    }
  }
  function xN(e, t, n, a, r, i, l, o) {
    var u = !1, p = null;
    return NN(e, t, u, p, n, a, r, i, l);
  }
  function SN(e, t, n, a, r, i, l, o, u, p) {
    var v = !0, x = NN(n, a, v, e, r, i, l, o, u);
    x.context = EN(null);
    var E = x.current, O = Vn(), V = ni(E), U = Er(O, V);
    return U.callback = t ?? null, Wr(E, U, V), vj(x, V, O), x;
  }
  function qu(e, t, n, a) {
    kx(t, e);
    var r = t.current, i = Vn(), l = ni(r);
    nS(l);
    var o = EN(n);
    t.context === null ? t.context = o : t.pendingContext = o, yi && Tn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, we(Tn) || "Unknown"));
    var u = Er(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var p = Wr(r, u, l);
    return p !== null && ($t(p, r, l, i), bc(p, r, l)), l;
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
  function s1(e) {
    switch (e.tag) {
      case S: {
        var t = e.stateNode;
        if (js(t)) {
          var n = fS(t);
          bj(t, n);
        }
        break;
      }
      case Y: {
        Cr(function() {
          var r = Bn(e, Ce);
          if (r !== null) {
            var i = Vn();
            $t(r, e, Ce, i);
          }
        });
        var a = Ce;
        xv(e, a);
        break;
      }
    }
  }
  function RN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = yS(n.retryLane, t));
  }
  function xv(e, t) {
    RN(e, t);
    var n = e.alternate;
    n && RN(n, t);
  }
  function c1(e) {
    if (e.tag === Y) {
      var t = Oo, n = Bn(e, t);
      if (n !== null) {
        var a = Vn();
        $t(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function f1(e) {
    if (e.tag === Y) {
      var t = ni(e), n = Bn(e, t);
      if (n !== null) {
        var a = Vn();
        $t(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function CN(e) {
    var t = Tx(e);
    return t === null ? null : t.stateNode;
  }
  var DN = function(e) {
    return null;
  };
  function d1(e) {
    return DN(e);
  }
  var TN = function(e) {
    return !1;
  };
  function p1(e) {
    return TN(e);
  }
  var jN = null, wN = null, _N = null, ON = null, LN = null, VN = null, MN = null, AN = null, kN = null;
  {
    var UN = function(e, t, n) {
      var a = t[n], r = Fe(e) ? e.slice() : Ue({}, e);
      return n + 1 === t.length ? (Fe(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = UN(e[a], t, n + 1), r);
    }, FN = function(e, t) {
      return UN(e, t, 0);
    }, zN = function(e, t, n, a) {
      var r = t[a], i = Fe(e) ? e.slice() : Ue({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Fe(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = zN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, HN = function(e, t, n) {
      if (t.length !== n.length) {
        R("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            R("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return zN(e, t, n, 0);
    }, BN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Fe(e) ? e.slice() : Ue({}, e);
      return i[r] = BN(e[r], t, n + 1, a), i;
    }, PN = function(e, t, n) {
      return BN(e, t, 0, n);
    }, Sv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    jN = function(e, t, n, a) {
      var r = Sv(e, t);
      if (r !== null) {
        var i = PN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ue({}, e.memoizedProps);
        var l = Bn(e, Ce);
        l !== null && $t(l, e, Ce, st);
      }
    }, wN = function(e, t, n) {
      var a = Sv(e, t);
      if (a !== null) {
        var r = FN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ue({}, e.memoizedProps);
        var i = Bn(e, Ce);
        i !== null && $t(i, e, Ce, st);
      }
    }, _N = function(e, t, n, a) {
      var r = Sv(e, t);
      if (r !== null) {
        var i = HN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ue({}, e.memoizedProps);
        var l = Bn(e, Ce);
        l !== null && $t(l, e, Ce, st);
      }
    }, ON = function(e, t, n) {
      e.pendingProps = PN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Bn(e, Ce);
      a !== null && $t(a, e, Ce, st);
    }, LN = function(e, t) {
      e.pendingProps = FN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Bn(e, Ce);
      n !== null && $t(n, e, Ce, st);
    }, VN = function(e, t, n) {
      e.pendingProps = HN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Bn(e, Ce);
      a !== null && $t(a, e, Ce, st);
    }, MN = function(e) {
      var t = Bn(e, Ce);
      t !== null && $t(t, e, Ce, st);
    }, AN = function(e) {
      DN = e;
    }, kN = function(e) {
      TN = e;
    };
  }
  function m1(e) {
    var t = gh(e);
    return t === null ? null : t.stateNode;
  }
  function v1(e) {
    return null;
  }
  function h1() {
    return Tn;
  }
  function y1(e) {
    var t = e.findFiberByHostInstance, n = h.ReactCurrentDispatcher;
    return Ax({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: jN,
      overrideHookStateDeletePath: wN,
      overrideHookStateRenamePath: _N,
      overrideProps: ON,
      overridePropsDeletePath: LN,
      overridePropsRenamePath: VN,
      setErrorHandler: AN,
      setSuspenseHandler: kN,
      scheduleUpdate: MN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: m1,
      findFiberByHostInstance: t || v1,
      // React Refresh
      findHostInstancesForRefresh: Gj,
      scheduleRefresh: Ij,
      scheduleRoot: qj,
      setRefreshHandler: Yj,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: h1,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: bv
    });
  }
  var $N = typeof reportError == "function" ? (
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
      if (n.nodeType !== _t) {
        var a = CN(t.current);
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
      tN() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Cr(function() {
        qu(null, e, null, null);
      }), $y(t);
    }
  };
  function g1(e, t) {
    if (!ff(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    YN(e);
    var n = !1, a = !1, r = "", i = $N;
    t != null && (t.hydrate ? R("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = xN(e, rc, null, n, a, r, i);
    Xs(l.current, e);
    var o = e.nodeType === _t ? e.parentNode : e;
    return Jo(o), new Rv(l);
  }
  function cf(e) {
    this._internalRoot = e;
  }
  function b1(e) {
    e && MS(e);
  }
  cf.prototype.unstable_scheduleHydration = b1;
  function N1(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    YN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", u = $N;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var p = SN(t, null, e, rc, a, i, l, o, u);
    if (Xs(p.current, e), Jo(e), r)
      for (var v = 0; v < r.length; v++) {
        var x = r[v];
        RD(p, x);
      }
    return new cf(p);
  }
  function ff(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === sr || e.nodeType === _f));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === sr || e.nodeType === _f || e.nodeType === _t && e.nodeValue === " react-mount-point-unstable "));
  }
  function YN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var E1 = h.ReactCurrentOwner, IN;
  IN = function(e) {
    if (e._reactRootContainer && e.nodeType !== _t) {
      var t = CN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Cv(e), r = !!(a && $r(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Cv(e) {
    return e ? e.nodeType === sr ? e.documentElement : e.firstChild : null;
  }
  function qN() {
  }
  function x1(e, t, n, a, r) {
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
        Ir,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        qN
      );
      e._reactRootContainer = l, Xs(l.current, e);
      var o = e.nodeType === _t ? e.parentNode : e;
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
      var v = xN(
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
        qN
      );
      e._reactRootContainer = v, Xs(v.current, e);
      var x = e.nodeType === _t ? e.parentNode : e;
      return Jo(x), Cr(function() {
        qu(t, v, n, a);
      }), v;
    }
  }
  function S1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    IN(n), S1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = x1(n, t, e, r, a);
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
  var GN = !1;
  function R1(e) {
    {
      GN || (GN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = E1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", We(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : u1(e, "findDOMNode");
  }
  function C1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function D1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function T1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !Ex(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  var WN = !1;
  function j1(e) {
    if (WN || (WN = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gu(e))
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
          e._reactRootContainer = null, $y(e);
        });
      }), !0;
    } else {
      {
        var r = Cv(e), i = !!(r && $r(r)), l = e.nodeType === zn && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  RS(s1), DS(c1), TS(f1), jS(Sa), wS(ES), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), cx(_C), px(nv, Nj, Cr);
  function w1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return o1(e, t, null, n);
  }
  function _1(e, t, n, a) {
    return T1(e, t, n, a);
  }
  var Dv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$r, jl, Js, ih, lh, nv]
  };
  function O1(e, t) {
    return Dv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), g1(e, t);
  }
  function L1(e, t, n) {
    return Dv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), N1(e, t, n);
  }
  function V1(e) {
    return tN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var M1 = y1({
    findFiberByHostInstance: Vi,
    bundleType: 1,
    version: bv,
    rendererPackageName: "react-dom"
  });
  if (!M1 && an && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var QN = window.location.protocol;
    /^(https?|file):$/.test(QN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (QN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, ta.createPortal = w1, ta.createRoot = O1, ta.findDOMNode = R1, ta.flushSync = V1, ta.hydrate = C1, ta.hydrateRoot = L1, ta.render = D1, ta.unmountComponentAtNode = j1, ta.unstable_batchedUpdates = nv, ta.unstable_renderSubtreeIntoContainer = _1, ta.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
cE.exports = ta;
var $1 = cE.exports, pE, KN = $1;
{
  var XN = KN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  pE = function(s, m) {
    XN.usingClientEntryPoint = !0;
    try {
      return KN.createRoot(s, m);
    } finally {
      XN.usingClientEntryPoint = !1;
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
  return Qu = Object.assign ? Object.assign.bind() : function(s) {
    for (var m = 1; m < arguments.length; m++) {
      var h = arguments[m];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (s[g] = h[g]);
    }
    return s;
  }, Qu.apply(this, arguments);
}
var li;
(function(s) {
  s.Pop = "POP", s.Push = "PUSH", s.Replace = "REPLACE";
})(li || (li = {}));
const JN = "popstate";
function Y1(s) {
  s === void 0 && (s = {});
  function m(g, b) {
    let {
      pathname: R,
      search: f,
      hash: A
    } = g.location;
    return Ov(
      "",
      {
        pathname: R,
        search: f,
        hash: A
      },
      // state defaults to `null` because `window.history.state` does
      b.state && b.state.usr || null,
      b.state && b.state.key || "default"
    );
  }
  function h(g, b) {
    return typeof b == "string" ? b : Ku(b);
  }
  return q1(m, h, null, s);
}
function gt(s, m) {
  if (s === !1 || s === null || typeof s > "u")
    throw new Error(m);
}
function Aa(s, m) {
  if (!s) {
    typeof console < "u" && console.warn(m);
    try {
      throw new Error(m);
    } catch {
    }
  }
}
function I1() {
  return Math.random().toString(36).substr(2, 8);
}
function ZN(s, m) {
  return {
    usr: s.state,
    key: s.key,
    idx: m
  };
}
function Ov(s, m, h, g) {
  return h === void 0 && (h = null), Qu({
    pathname: typeof s == "string" ? s : s.pathname,
    search: "",
    hash: ""
  }, typeof m == "string" ? eo(m) : m, {
    state: h,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: m && m.key || g || I1()
  });
}
function Ku(s) {
  let {
    pathname: m = "/",
    search: h = "",
    hash: g = ""
  } = s;
  return h && h !== "?" && (m += h.charAt(0) === "?" ? h : "?" + h), g && g !== "#" && (m += g.charAt(0) === "#" ? g : "#" + g), m;
}
function eo(s) {
  let m = {};
  if (s) {
    let h = s.indexOf("#");
    h >= 0 && (m.hash = s.substr(h), s = s.substr(0, h));
    let g = s.indexOf("?");
    g >= 0 && (m.search = s.substr(g), s = s.substr(0, g)), s && (m.pathname = s);
  }
  return m;
}
function q1(s, m, h, g) {
  g === void 0 && (g = {});
  let {
    window: b = document.defaultView,
    v5Compat: R = !1
  } = g, f = b.history, A = li.Pop, D = null, T = _();
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
    let X = _(), ue = X == null ? null : X - T;
    T = X, D && D({
      action: A,
      location: fe.location,
      delta: ue
    });
  }
  function M(X, ue) {
    A = li.Push;
    let B = Ov(fe.location, X, ue);
    T = _() + 1;
    let G = ZN(B, T), Q = fe.createHref(B);
    try {
      f.pushState(G, "", Q);
    } catch (Y) {
      if (Y instanceof DOMException && Y.name === "DataCloneError")
        throw Y;
      b.location.assign(Q);
    }
    R && D && D({
      action: A,
      location: fe.location,
      delta: 1
    });
  }
  function z(X, ue) {
    A = li.Replace;
    let B = Ov(fe.location, X, ue);
    T = _();
    let G = ZN(B, T), Q = fe.createHref(B);
    f.replaceState(G, "", Q), R && D && D({
      action: A,
      location: fe.location,
      delta: 0
    });
  }
  function W(X) {
    let ue = b.location.origin !== "null" ? b.location.origin : b.location.href, B = typeof X == "string" ? X : Ku(X);
    return B = B.replace(/ $/, "%20"), gt(ue, "No window.location.(origin|href) available to create URL for href: " + B), new URL(B, ue);
  }
  let fe = {
    get action() {
      return A;
    },
    get location() {
      return s(b, f);
    },
    listen(X) {
      if (D)
        throw new Error("A history only accepts one active listener");
      return b.addEventListener(JN, S), D = X, () => {
        b.removeEventListener(JN, S), D = null;
      };
    },
    createHref(X) {
      return m(b, X);
    },
    createURL: W,
    encodeLocation(X) {
      let ue = W(X);
      return {
        pathname: ue.pathname,
        search: ue.search,
        hash: ue.hash
      };
    },
    push: M,
    replace: z,
    go(X) {
      return f.go(X);
    }
  };
  return fe;
}
var eE;
(function(s) {
  s.data = "data", s.deferred = "deferred", s.redirect = "redirect", s.error = "error";
})(eE || (eE = {}));
function G1(s, m, h) {
  return h === void 0 && (h = "/"), W1(s, m, h);
}
function W1(s, m, h, g) {
  let b = typeof m == "string" ? eo(m) : m, R = ui(b.pathname || "/", h);
  if (R == null)
    return null;
  let f = mE(s);
  Q1(f);
  let A = null;
  for (let D = 0; A == null && D < f.length; ++D) {
    let T = lw(R);
    A = rw(f[D], T);
  }
  return A;
}
function mE(s, m, h, g) {
  m === void 0 && (m = []), h === void 0 && (h = []), g === void 0 && (g = "");
  let b = (R, f, A) => {
    let D = {
      relativePath: A === void 0 ? R.path || "" : A,
      caseSensitive: R.caseSensitive === !0,
      childrenIndex: f,
      route: R
    };
    D.relativePath.startsWith("/") && (gt(D.relativePath.startsWith(g), 'Absolute route path "' + D.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), D.relativePath = D.relativePath.slice(g.length));
    let T = wr([g, D.relativePath]), _ = h.concat(D);
    R.children && R.children.length > 0 && (gt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      R.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), mE(R.children, m, _, T)), !(R.path == null && !R.index) && m.push({
      path: T,
      score: nw(T, R.index),
      routesMeta: _
    });
  };
  return s.forEach((R, f) => {
    var A;
    if (R.path === "" || !((A = R.path) != null && A.includes("?")))
      b(R, f);
    else
      for (let D of vE(R.path))
        b(R, f, D);
  }), m;
}
function vE(s) {
  let m = s.split("/");
  if (m.length === 0) return [];
  let [h, ...g] = m, b = h.endsWith("?"), R = h.replace(/\?$/, "");
  if (g.length === 0)
    return b ? [R, ""] : [R];
  let f = vE(g.join("/")), A = [];
  return A.push(...f.map((D) => D === "" ? R : [R, D].join("/"))), b && A.push(...f), A.map((D) => s.startsWith("/") && D === "" ? "/" : D);
}
function Q1(s) {
  s.sort((m, h) => m.score !== h.score ? h.score - m.score : aw(m.routesMeta.map((g) => g.childrenIndex), h.routesMeta.map((g) => g.childrenIndex)));
}
const K1 = /^:[\w-]+$/, X1 = 3, J1 = 2, Z1 = 1, ew = 10, tw = -2, tE = (s) => s === "*";
function nw(s, m) {
  let h = s.split("/"), g = h.length;
  return h.some(tE) && (g += tw), m && (g += J1), h.filter((b) => !tE(b)).reduce((b, R) => b + (K1.test(R) ? X1 : R === "" ? Z1 : ew), g);
}
function aw(s, m) {
  return s.length === m.length && s.slice(0, -1).every((g, b) => g === m[b]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    s[s.length - 1] - m[m.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function rw(s, m, h) {
  let {
    routesMeta: g
  } = s, b = {}, R = "/", f = [];
  for (let A = 0; A < g.length; ++A) {
    let D = g[A], T = A === g.length - 1, _ = R === "/" ? m : m.slice(R.length) || "/", S = Lv({
      path: D.relativePath,
      caseSensitive: D.caseSensitive,
      end: T
    }, _), M = D.route;
    if (!S)
      return null;
    Object.assign(b, S.params), f.push({
      // TODO: Can this as be avoided?
      params: b,
      pathname: wr([R, S.pathname]),
      pathnameBase: cw(wr([R, S.pathnameBase])),
      route: M
    }), S.pathnameBase !== "/" && (R = wr([R, S.pathnameBase]));
  }
  return f;
}
function Lv(s, m) {
  typeof s == "string" && (s = {
    path: s,
    caseSensitive: !1,
    end: !0
  });
  let [h, g] = iw(s.path, s.caseSensitive, s.end), b = m.match(h);
  if (!b) return null;
  let R = b[0], f = R.replace(/(.)\/+$/, "$1"), A = b.slice(1);
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
    pattern: s
  };
}
function iw(s, m, h) {
  m === void 0 && (m = !1), h === void 0 && (h = !0), Aa(s === "*" || !s.endsWith("*") || s.endsWith("/*"), 'Route path "' + s + '" will be treated as if it were ' + ('"' + s.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + s.replace(/\*$/, "/*") + '".'));
  let g = [], b = "^" + s.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, A, D) => (g.push({
    paramName: A,
    isOptional: D != null
  }), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return s.endsWith("*") ? (g.push({
    paramName: "*"
  }), b += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? b += "\\/*$" : s !== "" && s !== "/" && (b += "(?:(?=\\/|$))"), [new RegExp(b, m ? void 0 : "i"), g];
}
function lw(s) {
  try {
    return s.split("/").map((m) => decodeURIComponent(m).replace(/\//g, "%2F")).join("/");
  } catch (m) {
    return Aa(!1, 'The URL path "' + s + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + m + ").")), s;
  }
}
function ui(s, m) {
  if (m === "/") return s;
  if (!s.toLowerCase().startsWith(m.toLowerCase()))
    return null;
  let h = m.endsWith("/") ? m.length - 1 : m.length, g = s.charAt(h);
  return g && g !== "/" ? null : s.slice(h) || "/";
}
function ow(s, m) {
  m === void 0 && (m = "/");
  let {
    pathname: h,
    search: g = "",
    hash: b = ""
  } = typeof s == "string" ? eo(s) : s;
  return {
    pathname: h ? h.startsWith("/") ? h : uw(h, m) : m,
    search: fw(g),
    hash: dw(b)
  };
}
function uw(s, m) {
  let h = m.replace(/\/+$/, "").split("/");
  return s.split("/").forEach((b) => {
    b === ".." ? h.length > 1 && h.pop() : b !== "." && h.push(b);
  }), h.length > 1 ? h.join("/") : "/";
}
function Tv(s, m, h, g) {
  return "Cannot include a '" + s + "' character in a manually specified " + ("`to." + m + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function sw(s) {
  return s.filter((m, h) => h === 0 || m.route.path && m.route.path.length > 0);
}
function Mv(s, m) {
  let h = sw(s);
  return m ? h.map((g, b) => b === h.length - 1 ? g.pathname : g.pathnameBase) : h.map((g) => g.pathnameBase);
}
function Av(s, m, h, g) {
  g === void 0 && (g = !1);
  let b;
  typeof s == "string" ? b = eo(s) : (b = Qu({}, s), gt(!b.pathname || !b.pathname.includes("?"), Tv("?", "pathname", "search", b)), gt(!b.pathname || !b.pathname.includes("#"), Tv("#", "pathname", "hash", b)), gt(!b.search || !b.search.includes("#"), Tv("#", "search", "hash", b)));
  let R = s === "" || b.pathname === "", f = R ? "/" : b.pathname, A;
  if (f == null)
    A = h;
  else {
    let S = m.length - 1;
    if (!g && f.startsWith("..")) {
      let M = f.split("/");
      for (; M[0] === ".."; )
        M.shift(), S -= 1;
      b.pathname = M.join("/");
    }
    A = S >= 0 ? m[S] : "/";
  }
  let D = ow(b, A), T = f && f !== "/" && f.endsWith("/"), _ = (R || f === ".") && h.endsWith("/");
  return !D.pathname.endsWith("/") && (T || _) && (D.pathname += "/"), D;
}
const wr = (s) => s.join("/").replace(/\/\/+/g, "/"), cw = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"), fw = (s) => !s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s, dw = (s) => !s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s;
function pw(s) {
  return s != null && typeof s.status == "number" && typeof s.statusText == "string" && typeof s.internal == "boolean" && "data" in s;
}
const hE = ["post", "put", "patch", "delete"];
new Set(hE);
const mw = ["get", ...hE];
new Set(mw);
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
  return Xu = Object.assign ? Object.assign.bind() : function(s) {
    for (var m = 1; m < arguments.length; m++) {
      var h = arguments[m];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (s[g] = h[g]);
    }
    return s;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ C.createContext(null);
Zu.displayName = "DataRouter";
const kv = /* @__PURE__ */ C.createContext(null);
kv.displayName = "DataRouterState";
const vw = /* @__PURE__ */ C.createContext(null);
vw.displayName = "Await";
const ma = /* @__PURE__ */ C.createContext(null);
ma.displayName = "Navigation";
const es = /* @__PURE__ */ C.createContext(null);
es.displayName = "Location";
const ka = /* @__PURE__ */ C.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ka.displayName = "Route";
const Uv = /* @__PURE__ */ C.createContext(null);
Uv.displayName = "RouteError";
function hw(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m;
  to() || gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: b
  } = C.useContext(ma), {
    hash: R,
    pathname: f,
    search: A
  } = ts(s, {
    relative: h
  }), D = f;
  return g !== "/" && (D = f === "/" ? g : wr([g, f])), b.createHref({
    pathname: D,
    search: A,
    hash: R
  });
}
function to() {
  return C.useContext(es) != null;
}
function Qi() {
  return to() || gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C.useContext(es).location;
}
const yE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function gE(s) {
  C.useContext(ma).static || C.useLayoutEffect(s);
}
function Fv() {
  let {
    isDataRoute: s
  } = C.useContext(ka);
  return s ? Ow() : yw();
}
function yw() {
  to() || gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = C.useContext(Zu), {
    basename: m,
    future: h,
    navigator: g
  } = C.useContext(ma), {
    matches: b
  } = C.useContext(ka), {
    pathname: R
  } = Qi(), f = JSON.stringify(Mv(b, h.v7_relativeSplatPath)), A = C.useRef(!1);
  return gE(() => {
    A.current = !0;
  }), C.useCallback(function(T, _) {
    if (_ === void 0 && (_ = {}), Aa(A.current, yE), !A.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let S = Av(T, JSON.parse(f), R, _.relative === "path");
    s == null && m !== "/" && (S.pathname = S.pathname === "/" ? m : wr([m, S.pathname])), (_.replace ? g.replace : g.push)(S, _.state, _);
  }, [m, g, f, R, s]);
}
function gw() {
  let {
    matches: s
  } = C.useContext(ka), m = s[s.length - 1];
  return m ? m.params : {};
}
function ts(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    future: g
  } = C.useContext(ma), {
    matches: b
  } = C.useContext(ka), {
    pathname: R
  } = Qi(), f = JSON.stringify(Mv(b, g.v7_relativeSplatPath));
  return C.useMemo(() => Av(s, JSON.parse(f), R, h === "path"), [s, f, R, h]);
}
function bw(s, m) {
  return Nw(s, m);
}
function Nw(s, m, h, g) {
  to() || gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: b
  } = C.useContext(ma), {
    matches: R
  } = C.useContext(ka), f = R[R.length - 1], A = f ? f.params : {}, D = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", _ = f && f.route;
  {
    let B = _ && _.path || "";
    NE(D, !_ || B.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + D + '" (under <Route path="' + B + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + B + '"> to <Route ') + ('path="' + (B === "/" ? "*" : B + "/*") + '">.'));
  }
  let S = Qi(), M;
  if (m) {
    var z;
    let B = typeof m == "string" ? eo(m) : m;
    T === "/" || (z = B.pathname) != null && z.startsWith(T) || gt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + B.pathname + '" was given in the `location` prop.')), M = B;
  } else
    M = S;
  let W = M.pathname || "/", fe = W;
  if (T !== "/") {
    let B = T.replace(/^\//, "").split("/");
    fe = "/" + W.replace(/^\//, "").split("/").slice(B.length).join("/");
  }
  let X = G1(s, {
    pathname: fe
  });
  Aa(_ || X != null, 'No routes matched location "' + M.pathname + M.search + M.hash + '" '), Aa(X == null || X[X.length - 1].route.element !== void 0 || X[X.length - 1].route.Component !== void 0 || X[X.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + M.pathname + M.search + M.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ue = Cw(X && X.map((B) => Object.assign({}, B, {
    params: Object.assign({}, A, B.params),
    pathname: wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(B.pathname).pathname : B.pathname
    ]),
    pathnameBase: B.pathnameBase === "/" ? T : wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(B.pathnameBase).pathname : B.pathnameBase
    ])
  })), R, h, g);
  return m && ue ? /* @__PURE__ */ C.createElement(es.Provider, {
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
function Ew() {
  let s = _w(), m = pw(s) ? s.status + " " + s.statusText : s instanceof Error ? s.message : JSON.stringify(s), h = s instanceof Error ? s.stack : null, g = "rgba(200,200,200, 0.5)", b = {
    padding: "0.5rem",
    backgroundColor: g
  }, R = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", s), f = /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ C.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ C.createElement("code", {
    style: R
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ C.createElement("code", {
    style: R
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ C.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, m), h ? /* @__PURE__ */ C.createElement("pre", {
    style: b
  }, h) : null, f);
}
const xw = /* @__PURE__ */ C.createElement(Ew, null);
class Sw extends C.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ C.createElement(ka.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ C.createElement(Uv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Rw(s) {
  let {
    routeContext: m,
    match: h,
    children: g
  } = s, b = C.useContext(Zu);
  return b && b.static && b.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (b.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ C.createElement(ka.Provider, {
    value: m
  }, g);
}
function Cw(s, m, h, g) {
  var b;
  if (m === void 0 && (m = []), h === void 0 && (h = null), g === void 0 && (g = null), s == null) {
    var R;
    if (!h)
      return null;
    if (h.errors)
      s = h.matches;
    else if ((R = g) != null && R.v7_partialHydration && m.length === 0 && !h.initialized && h.matches.length > 0)
      s = h.matches;
    else
      return null;
  }
  let f = s, A = (b = h) == null ? void 0 : b.errors;
  if (A != null) {
    let _ = f.findIndex((S) => S.route.id && (A == null ? void 0 : A[S.route.id]) !== void 0);
    _ >= 0 || gt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(A).join(",")), f = f.slice(0, Math.min(f.length, _ + 1));
  }
  let D = !1, T = -1;
  if (h && g && g.v7_partialHydration)
    for (let _ = 0; _ < f.length; _++) {
      let S = f[_];
      if ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (T = _), S.route.id) {
        let {
          loaderData: M,
          errors: z
        } = h, W = S.route.loader && M[S.route.id] === void 0 && (!z || z[S.route.id] === void 0);
        if (S.route.lazy || W) {
          D = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((_, S, M) => {
    let z, W = !1, fe = null, X = null;
    h && (z = A && S.route.id ? A[S.route.id] : void 0, fe = S.route.errorElement || xw, D && (T < 0 && M === 0 ? (NE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), W = !0, X = null) : T === M && (W = !0, X = S.route.hydrateFallbackElement || null)));
    let ue = m.concat(f.slice(0, M + 1)), B = () => {
      let G;
      return z ? G = fe : W ? G = X : S.route.Component ? G = /* @__PURE__ */ C.createElement(S.route.Component, null) : S.route.element ? G = S.route.element : G = _, /* @__PURE__ */ C.createElement(Rw, {
        match: S,
        routeContext: {
          outlet: _,
          matches: ue,
          isDataRoute: h != null
        },
        children: G
      });
    };
    return h && (S.route.ErrorBoundary || S.route.errorElement || M === 0) ? /* @__PURE__ */ C.createElement(Sw, {
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
var bE = /* @__PURE__ */ function(s) {
  return s.UseBlocker = "useBlocker", s.UseRevalidator = "useRevalidator", s.UseNavigateStable = "useNavigate", s;
}(bE || {}), Ju = /* @__PURE__ */ function(s) {
  return s.UseBlocker = "useBlocker", s.UseLoaderData = "useLoaderData", s.UseActionData = "useActionData", s.UseRouteError = "useRouteError", s.UseNavigation = "useNavigation", s.UseRouteLoaderData = "useRouteLoaderData", s.UseMatches = "useMatches", s.UseRevalidator = "useRevalidator", s.UseNavigateStable = "useNavigate", s.UseRouteId = "useRouteId", s;
}(Ju || {});
function zv(s) {
  return s + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Dw(s) {
  let m = C.useContext(Zu);
  return m || gt(!1, zv(s)), m;
}
function Tw(s) {
  let m = C.useContext(kv);
  return m || gt(!1, zv(s)), m;
}
function jw(s) {
  let m = C.useContext(ka);
  return m || gt(!1, zv(s)), m;
}
function Hv(s) {
  let m = jw(s), h = m.matches[m.matches.length - 1];
  return h.route.id || gt(!1, s + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function ww() {
  return Hv(Ju.UseRouteId);
}
function _w() {
  var s;
  let m = C.useContext(Uv), h = Tw(Ju.UseRouteError), g = Hv(Ju.UseRouteError);
  return m !== void 0 ? m : (s = h.errors) == null ? void 0 : s[g];
}
function Ow() {
  let {
    router: s
  } = Dw(bE.UseNavigateStable), m = Hv(Ju.UseNavigateStable), h = C.useRef(!1);
  return gE(() => {
    h.current = !0;
  }), C.useCallback(function(b, R) {
    R === void 0 && (R = {}), Aa(h.current, yE), h.current && (typeof b == "number" ? s.navigate(b) : s.navigate(b, Xu({
      fromRouteId: m
    }, R)));
  }, [s, m]);
}
const nE = {};
function NE(s, m, h) {
  !m && !nE[s] && (nE[s] = !0, Aa(!1, h));
}
const aE = {};
function Lw(s, m) {
  aE[m] || (aE[m] = !0, console.warn(m));
}
const rE = (s, m, h) => Lw(s, "⚠️ React Router Future Flag Warning: " + m + ". " + ("You can use the `" + s + "` future flag to opt-in early. ") + ("For more information, see " + h + "."));
function Vw(s, m) {
  (s == null ? void 0 : s.v7_startTransition) === void 0 && rE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (s == null ? void 0 : s.v7_relativeSplatPath) === void 0 && rE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Mw(s) {
  let {
    to: m,
    replace: h,
    state: g,
    relative: b
  } = s;
  to() || gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: R,
    static: f
  } = C.useContext(ma);
  Aa(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: A
  } = C.useContext(ka), {
    pathname: D
  } = Qi(), T = Fv(), _ = Av(m, Mv(A, R.v7_relativeSplatPath), D, b === "path"), S = JSON.stringify(_);
  return C.useEffect(() => T(JSON.parse(S), {
    replace: h,
    state: g,
    relative: b
  }), [T, S, b, h, g]), null;
}
function jr(s) {
  gt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Aw(s) {
  let {
    basename: m = "/",
    children: h = null,
    location: g,
    navigationType: b = li.Pop,
    navigator: R,
    static: f = !1,
    future: A
  } = s;
  to() && gt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let D = m.replace(/^\/*/, "/"), T = C.useMemo(() => ({
    basename: D,
    navigator: R,
    static: f,
    future: Xu({
      v7_relativeSplatPath: !1
    }, A)
  }), [D, A, R, f]);
  typeof g == "string" && (g = eo(g));
  let {
    pathname: _ = "/",
    search: S = "",
    hash: M = "",
    state: z = null,
    key: W = "default"
  } = g, fe = C.useMemo(() => {
    let X = ui(_, D);
    return X == null ? null : {
      location: {
        pathname: X,
        search: S,
        hash: M,
        state: z,
        key: W
      },
      navigationType: b
    };
  }, [D, _, S, M, z, W, b]);
  return Aa(fe != null, '<Router basename="' + D + '"> is not able to match the URL ' + ('"' + _ + S + M + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), fe == null ? null : /* @__PURE__ */ C.createElement(ma.Provider, {
    value: T
  }, /* @__PURE__ */ C.createElement(es.Provider, {
    children: h,
    value: fe
  }));
}
function kw(s) {
  let {
    children: m,
    location: h
  } = s;
  return bw(Vv(m), h);
}
new Promise(() => {
});
function Vv(s, m) {
  m === void 0 && (m = []);
  let h = [];
  return C.Children.forEach(s, (g, b) => {
    if (!/* @__PURE__ */ C.isValidElement(g))
      return;
    let R = [...m, b];
    if (g.type === C.Fragment) {
      h.push.apply(h, Vv(g.props.children, R));
      return;
    }
    g.type !== jr && gt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || gt(!1, "An index route cannot have child routes.");
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
    g.props.children && (f.children = Vv(g.props.children, R)), h.push(f);
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
  return Zl = Object.assign ? Object.assign.bind() : function(s) {
    for (var m = 1; m < arguments.length; m++) {
      var h = arguments[m];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (s[g] = h[g]);
    }
    return s;
  }, Zl.apply(this, arguments);
}
function Bv(s, m) {
  if (s == null) return {};
  var h = {}, g = Object.keys(s), b, R;
  for (R = 0; R < g.length; R++)
    b = g[R], !(m.indexOf(b) >= 0) && (h[b] = s[b]);
  return h;
}
const mf = "get", vf = "application/x-www-form-urlencoded";
function gf(s) {
  return s != null && typeof s.tagName == "string";
}
function Uw(s) {
  return gf(s) && s.tagName.toLowerCase() === "button";
}
function Fw(s) {
  return gf(s) && s.tagName.toLowerCase() === "form";
}
function zw(s) {
  return gf(s) && s.tagName.toLowerCase() === "input";
}
function Hw(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function Bw(s, m) {
  return s.button === 0 && // Ignore everything but left clicks
  (!m || m === "_self") && // Let browser handle "target=_blank" etc.
  !Hw(s);
}
let pf = null;
function Pw() {
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
const $w = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function jv(s) {
  return s != null && !$w.has(s) ? (Aa(!1, '"' + s + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : s;
}
function Yw(s, m) {
  let h, g, b, R, f;
  if (Fw(s)) {
    let A = s.getAttribute("action");
    g = A ? ui(A, m) : null, h = s.getAttribute("method") || mf, b = jv(s.getAttribute("enctype")) || vf, R = new FormData(s);
  } else if (Uw(s) || zw(s) && (s.type === "submit" || s.type === "image")) {
    let A = s.form;
    if (A == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let D = s.getAttribute("formaction") || A.getAttribute("action");
    if (g = D ? ui(D, m) : null, h = s.getAttribute("formmethod") || A.getAttribute("method") || mf, b = jv(s.getAttribute("formenctype")) || jv(A.getAttribute("enctype")) || vf, R = new FormData(A, s), !Pw()) {
      let {
        name: T,
        type: _,
        value: S
      } = s;
      if (_ === "image") {
        let M = T ? T + "." : "";
        R.append(M + "x", "0"), R.append(M + "y", "0");
      } else T && R.append(T, S);
    }
  } else {
    if (gf(s))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    h = mf, g = null, b = vf, f = s;
  }
  return R && b === "text/plain" && (f = R, R = void 0), {
    action: g,
    method: h.toLowerCase(),
    encType: b,
    formData: R,
    body: f
  };
}
const Iw = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], qw = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Gw = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Ww = "6";
try {
  window.__reactRouterVersion = Ww;
} catch {
}
const EE = /* @__PURE__ */ C.createContext({
  isTransitioning: !1
});
EE.displayName = "ViewTransition";
const Qw = /* @__PURE__ */ C.createContext(/* @__PURE__ */ new Map());
Qw.displayName = "Fetchers";
const Kw = "startTransition", iE = B1[Kw];
function Xw(s) {
  let {
    basename: m,
    children: h,
    future: g,
    window: b
  } = s, R = C.useRef();
  R.current == null && (R.current = Y1({
    window: b,
    v5Compat: !0
  }));
  let f = R.current, [A, D] = C.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, _ = C.useCallback((S) => {
    T && iE ? iE(() => D(S)) : D(S);
  }, [D, T]);
  return C.useLayoutEffect(() => f.listen(_), [f, _]), C.useEffect(() => Vw(g), [g]), /* @__PURE__ */ C.createElement(Aw, {
    basename: m,
    children: h,
    location: A.location,
    navigationType: A.action,
    navigator: f,
    future: g
  });
}
const Jw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Zw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ C.forwardRef(function(m, h) {
  let {
    onClick: g,
    relative: b,
    reloadDocument: R,
    replace: f,
    state: A,
    target: D,
    to: T,
    preventScrollReset: _,
    viewTransition: S
  } = m, M = Bv(m, Iw), {
    basename: z
  } = C.useContext(ma), W, fe = !1;
  if (typeof T == "string" && Zw.test(T) && (W = T, Jw))
    try {
      let G = new URL(window.location.href), Q = T.startsWith("//") ? new URL(G.protocol + T) : new URL(T), Y = ui(Q.pathname, z);
      Q.origin === G.origin && Y != null ? T = Y + Q.search + Q.hash : fe = !0;
    } catch {
      Aa(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let X = hw(T, {
    relative: b
  }), ue = a_(T, {
    replace: f,
    state: A,
    target: D,
    preventScrollReset: _,
    relative: b,
    viewTransition: S
  });
  function B(G) {
    g && g(G), G.defaultPrevented || ue(G);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ C.createElement("a", Zl({}, M, {
      href: W || X,
      onClick: fe || R ? g : B,
      ref: h,
      target: D
    }))
  );
});
ii.displayName = "Link";
const e_ = /* @__PURE__ */ C.forwardRef(function(m, h) {
  let {
    "aria-current": g = "page",
    caseSensitive: b = !1,
    className: R = "",
    end: f = !1,
    style: A,
    to: D,
    viewTransition: T,
    children: _
  } = m, S = Bv(m, qw), M = ts(D, {
    relative: S.relative
  }), z = Qi(), W = C.useContext(kv), {
    navigator: fe,
    basename: X
  } = C.useContext(ma), ue = W != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  s_(M) && T === !0, B = fe.encodeLocation ? fe.encodeLocation(M).pathname : M.pathname, G = z.pathname, Q = W && W.navigation && W.navigation.location ? W.navigation.location.pathname : null;
  b || (G = G.toLowerCase(), Q = Q ? Q.toLowerCase() : null, B = B.toLowerCase()), Q && X && (Q = ui(Q, X) || Q);
  const Y = B !== "/" && B.endsWith("/") ? B.length - 1 : B.length;
  let Z = G === B || !f && G.startsWith(B) && G.charAt(Y) === "/", P = Q != null && (Q === B || !f && Q.startsWith(B) && Q.charAt(B.length) === "/"), _e = {
    isActive: Z,
    isPending: P,
    isTransitioning: ue
  }, Se = Z ? g : void 0, Me;
  typeof R == "function" ? Me = R(_e) : Me = [R, Z ? "active" : null, P ? "pending" : null, ue ? "transitioning" : null].filter(Boolean).join(" ");
  let Oe = typeof A == "function" ? A(_e) : A;
  return /* @__PURE__ */ C.createElement(ii, Zl({}, S, {
    "aria-current": Se,
    className: Me,
    ref: h,
    style: Oe,
    to: D,
    viewTransition: T
  }), typeof _ == "function" ? _(_e) : _);
});
e_.displayName = "NavLink";
const t_ = /* @__PURE__ */ C.forwardRef((s, m) => {
  let {
    fetcherKey: h,
    navigate: g,
    reloadDocument: b,
    replace: R,
    state: f,
    method: A = mf,
    action: D,
    onSubmit: T,
    relative: _,
    preventScrollReset: S,
    viewTransition: M
  } = s, z = Bv(s, Gw), W = o_(), fe = u_(D, {
    relative: _
  }), X = A.toLowerCase() === "get" ? "get" : "post", ue = (B) => {
    if (T && T(B), B.defaultPrevented) return;
    B.preventDefault();
    let G = B.nativeEvent.submitter, Q = (G == null ? void 0 : G.getAttribute("formmethod")) || A;
    W(G || B.currentTarget, {
      fetcherKey: h,
      method: Q,
      navigate: g,
      replace: R,
      state: f,
      relative: _,
      preventScrollReset: S,
      viewTransition: M
    });
  };
  return /* @__PURE__ */ C.createElement("form", Zl({
    ref: m,
    method: X,
    action: fe,
    onSubmit: b ? T : ue
  }, z));
});
t_.displayName = "Form";
var yf;
(function(s) {
  s.UseScrollRestoration = "useScrollRestoration", s.UseSubmit = "useSubmit", s.UseSubmitFetcher = "useSubmitFetcher", s.UseFetcher = "useFetcher", s.useViewTransitionState = "useViewTransitionState";
})(yf || (yf = {}));
var lE;
(function(s) {
  s.UseFetcher = "useFetcher", s.UseFetchers = "useFetchers", s.UseScrollRestoration = "useScrollRestoration";
})(lE || (lE = {}));
function n_(s) {
  return s + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function xE(s) {
  let m = C.useContext(Zu);
  return m || gt(!1, n_(s)), m;
}
function a_(s, m) {
  let {
    target: h,
    replace: g,
    state: b,
    preventScrollReset: R,
    relative: f,
    viewTransition: A
  } = m === void 0 ? {} : m, D = Fv(), T = Qi(), _ = ts(s, {
    relative: f
  });
  return C.useCallback((S) => {
    if (Bw(S, h)) {
      S.preventDefault();
      let M = g !== void 0 ? g : Ku(T) === Ku(_);
      D(s, {
        replace: M,
        state: b,
        preventScrollReset: R,
        relative: f,
        viewTransition: A
      });
    }
  }, [T, D, _, g, b, h, s, R, f, A]);
}
function r_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let i_ = 0, l_ = () => "__" + String(++i_) + "__";
function o_() {
  let {
    router: s
  } = xE(yf.UseSubmit), {
    basename: m
  } = C.useContext(ma), h = ww();
  return C.useCallback(function(g, b) {
    b === void 0 && (b = {}), r_();
    let {
      action: R,
      method: f,
      encType: A,
      formData: D,
      body: T
    } = Yw(g, m);
    if (b.navigate === !1) {
      let _ = b.fetcherKey || l_();
      s.fetch(_, h, b.action || R, {
        preventScrollReset: b.preventScrollReset,
        formData: D,
        body: T,
        formMethod: b.method || f,
        formEncType: b.encType || A,
        flushSync: b.flushSync
      });
    } else
      s.navigate(b.action || R, {
        preventScrollReset: b.preventScrollReset,
        formData: D,
        body: T,
        formMethod: b.method || f,
        formEncType: b.encType || A,
        replace: b.replace,
        state: b.state,
        fromRouteId: h,
        flushSync: b.flushSync,
        viewTransition: b.viewTransition
      });
  }, [s, m, h]);
}
function u_(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    basename: g
  } = C.useContext(ma), b = C.useContext(ka);
  b || gt(!1, "useFormAction must be used inside a RouteContext");
  let [R] = b.matches.slice(-1), f = Zl({}, ts(s || ".", {
    relative: h
  })), A = Qi();
  if (s == null) {
    f.search = A.search;
    let D = new URLSearchParams(f.search), T = D.getAll("index");
    if (T.some((S) => S === "")) {
      D.delete("index"), T.filter((M) => M).forEach((M) => D.append("index", M));
      let S = D.toString();
      f.search = S ? "?" + S : "";
    }
  }
  return (!s || s === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : wr([g, f.pathname])), Ku(f);
}
function s_(s, m) {
  m === void 0 && (m = {});
  let h = C.useContext(EE);
  h == null && gt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = xE(yf.useViewTransitionState), b = ts(s, {
    relative: m.relative
  });
  if (!h.isTransitioning)
    return !1;
  let R = ui(h.currentLocation.pathname, g) || h.currentLocation.pathname, f = ui(h.nextLocation.pathname, g) || h.nextLocation.pathname;
  return Lv(b.pathname, f) != null || Lv(b.pathname, R) != null;
}
function c_() {
  const [s, m] = C.useState(null), [h, g] = C.useState(""), [b, R] = C.useState(""), [f, A] = C.useState(!0), [D, T] = C.useState(""), [_, S] = C.useState(""), [M, z] = C.useState(!1), [W, fe] = C.useState(!1);
  C.useEffect(() => {
    var G, Q, Y, Z, P, _e;
    m({
      apiKey: (G = window.__FIREBASE__) == null ? void 0 : G.apiKey,
      authDomain: (Q = window.__FIREBASE__) == null ? void 0 : Q.authDomain,
      projectId: (Y = window.__FIREBASE__) == null ? void 0 : Y.projectId,
      appId: (Z = window.__FIREBASE__) == null ? void 0 : Z.appId,
      messagingSenderId: (P = window.__FIREBASE__) == null ? void 0 : P.messagingSenderId,
      measurementId: (_e = window.__FIREBASE__) == null ? void 0 : _e.measurementId
    });
  }, []);
  function X(G) {
    const Q = (G == null ? void 0 : G.code) || "", Y = (G == null ? void 0 : G.message) || "";
    return Q.includes("invalid-email") ? "Please enter a valid email address." : Q.includes("user-not-found") ? "No account found with that email." : Q.includes("wrong-password") || Q.includes("invalid-credential") || Y.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : Q.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : Q.includes("network-request-failed") ? "Network error. Check your connection and try again." : Y || "Something went wrong.";
  }
  async function ue(G) {
    G.preventDefault(), T(""), S(""), z(!0);
    try {
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const Q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), Y = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: Z, setPersistence: P, browserLocalPersistence: _e, browserSessionPersistence: Se, signInWithEmailAndPassword: Me } = Y, Oe = Z();
      await P(Oe, f ? _e : Se);
      const pe = await (await Me(Oe, h.trim(), b)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: pe }) })).ok) throw new Error("Session creation failed");
      S("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (Q) {
      T(X(Q));
    } finally {
      z(!1);
    }
  }
  async function B() {
    T(""), S("");
    try {
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), { getAuth: Q, sendPasswordResetEmail: Y } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Z = Q();
      await Y(Z, h.trim()), S("If an account exists for that email, a reset link has been sent.");
    } catch (G) {
      T(X(G));
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
      D && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: D }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: W ? "text" : "password", value: b, onChange: (G) => R(G.target.value), required: !0 }, void 0, !1, {
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
function f_() {
  const [s, m] = C.useState(null), [h, g] = C.useState(""), [b, R] = C.useState(""), [f, A] = C.useState(""), [D, T] = C.useState(""), [_, S] = C.useState(""), [M, z] = C.useState(""), [W, fe] = C.useState(""), [X, ue] = C.useState(!1), [B, G] = C.useState(!1);
  C.useEffect(() => {
    var Z, P, _e, Se, Me, Oe;
    m({
      apiKey: (Z = window.__FIREBASE__) == null ? void 0 : Z.apiKey,
      authDomain: (P = window.__FIREBASE__) == null ? void 0 : P.authDomain,
      projectId: (_e = window.__FIREBASE__) == null ? void 0 : _e.projectId,
      appId: (Se = window.__FIREBASE__) == null ? void 0 : Se.appId,
      messagingSenderId: (Me = window.__FIREBASE__) == null ? void 0 : Me.messagingSenderId,
      measurementId: (Oe = window.__FIREBASE__) == null ? void 0 : Oe.measurementId
    });
  }, []);
  function Q(Z) {
    const P = (Z == null ? void 0 : Z.code) || "";
    return P.includes("email-already-in-use") ? "An account with this email already exists." : P.includes("weak-password") ? "Password should be at least 6 characters." : P.includes("invalid-email") ? "Please enter a valid email address." : P.includes("network-request-failed") ? "Network error. Check your connection and try again." : (Z == null ? void 0 : Z.message) || "Something went wrong.";
  }
  async function Y(Z) {
    Z.preventDefault(), z(""), fe(""), ue(!0);
    try {
      if (D !== _) throw new Error("Passwords do not match");
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const P = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), { getAuth: _e, createUserWithEmailAndPassword: Se } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Me = _e(), Ae = await (await Se(Me, f.trim(), D)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Ae, profile: { fullName: h, contactNumber: b } }) })).ok) throw new Error("Session creation failed");
      fe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (P) {
      z(Q(P));
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
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: Y, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: h, onChange: (Z) => g(Z.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: b, onChange: (Z) => R(Z.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (Z) => A(Z.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: B ? "text" : "password", value: D, onChange: (Z) => T(Z.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": B ? "Hide password" : "Show password", onClick: () => G((Z) => !Z), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: _, onChange: (Z) => S(Z.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
function oi({ children: s }) {
  const m = Fv();
  return C.useEffect(() => {
    const h = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), b = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(S, M, z) {
      S && (S.classList.toggle("hidden", !z), S.setAttribute("aria-hidden", z ? "false" : "true"), M && M.setAttribute("aria-expanded", z ? "true" : "false"));
    }
    function A() {
      f(g, h, !1), f(R, b, !1);
    }
    function D(S) {
      const M = (z) => z && (z === S.target || z.contains(S.target));
      !M(g) && !M(h) && !M(R) && !M(b) && A();
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
      S.stopPropagation(), f(R, b, !1), f(g, h, g.classList.contains("hidden"));
    }), _(g)), b && R && (b.addEventListener("click", (S) => {
      S.stopPropagation(), f(g, h, !1), f(R, b, R.classList.contains("hidden"));
    }), _(R)), document.addEventListener("click", D), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", D), document.removeEventListener("keydown", T);
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
    /* @__PURE__ */ d.jsxDEV("main", { className: "content", children: s }, void 0, !1, {
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
function d_({ onClose: s, onCreated: m }) {
  const [h, g] = C.useState(""), [b, R] = C.useState(""), [f, A] = C.useState(""), [D, T] = C.useState(""), [_, S] = C.useState(!1), [M, z] = C.useState(""), [W, fe] = C.useState("");
  async function X() {
    if (z(""), fe(""), !h || !b) {
      z("Email and password are required");
      return;
    }
    S(!0);
    try {
      const ue = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(h).trim(), password: String(b), fullName: String(f).trim() || null, contactNumber: String(D).trim() || null })
      }), B = await ue.json().catch(() => null);
      if (!ue.ok) throw new Error(B && B.error ? B.error : B && B.message ? B.message : "Failed to create rider");
      fe("Rider created successfully"), m && m(), setTimeout(() => {
        s && s();
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "create-rider-close", onClick: s, "aria-label": "Close", children: "✕" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "password", value: b, onChange: (ue) => R(ue.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", value: D, onChange: (ue) => T(ue.target.value), placeholder: "Optional" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: s, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
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
function p_() {
  const [s, m] = C.useState([]), [h, g] = C.useState(""), [b, R] = C.useState("all"), [f, A] = C.useState("all"), [D, T] = C.useState("all"), [_, S] = C.useState(!0), [M, z] = C.useState(""), [W, fe] = C.useState(1), [X, ue] = C.useState(20), [B, G] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [Q, Y] = C.useState(!1);
  C.useEffect(() => {
    let P = !0;
    return (async () => {
      var _e, Se, Me, Oe;
      S(!0), z("");
      try {
        const Ae = new URLSearchParams();
        h && Ae.set("q", h), D !== "all" && Ae.set("status", D), b !== "all" && Ae.set("lastDays", b), Ae.set("page", String(W)), Ae.set("limit", String(X));
        const pe = await fetch(`/api/riders?${Ae.toString()}`, { credentials: "include" });
        if (pe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!pe.ok) throw new Error("Failed to load riders");
        const Ge = await pe.json();
        P && (m(Array.isArray(Ge.riders) ? Ge.riders : []), G({ total: ((_e = Ge.meta) == null ? void 0 : _e.total) || 0, page: ((Se = Ge.meta) == null ? void 0 : Se.page) || 1, limit: ((Me = Ge.meta) == null ? void 0 : Me.limit) || X, pages: ((Oe = Ge.meta) == null ? void 0 : Oe.pages) || 1 }));
      } catch (Ae) {
        P && z(Ae.message || "Failed to load riders");
      } finally {
        P && S(!1);
      }
    })(), () => {
      P = !1;
    };
  }, [h, D, b, W, X]);
  const Z = C.useMemo(() => s.filter((P) => {
    if (h && !P.name.toLowerCase().includes(h.toLowerCase().trim()) || D !== "all" && P.status !== D || f !== "all" && String(P.id) !== String(f)) return !1;
    if (b !== "all") {
      const _e = parseInt(P.lastActiveDays, 10) || 9999, Se = parseInt(b, 10);
      if (!(_e <= Se)) return !1;
    }
    return !0;
  }), [s, h, D, f, b]);
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => Y(!0), children: "Create Rider" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (P) => {
          g(P.target.value), fe(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: b, onChange: (P) => {
          R(P.target.value), fe(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: f, onChange: (P) => A(P.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          s.map((P) => /* @__PURE__ */ d.jsxDEV("option", { value: P.id, children: P.name }, P.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 83,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (P) => {
          T(P.target.value), fe(1);
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
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: X, onChange: (P) => {
        ue(parseInt(P.target.value, 10)), fe(1);
      }, children: [10, 20, 50, 100].map((P) => /* @__PURE__ */ d.jsxDEV("option", { value: P, children: [
        P,
        "/page"
      ] }, P, !0, {
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
      Q && /* @__PURE__ */ d.jsxDEV(d_, { onClose: () => Y(!1), onCreated: () => {
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
          !_ && !M && Z.map((P) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": P.id, "data-status": P.status, "data-last-days": P.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { href: `/riders/${P.id}`, children: P.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 118,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 118,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              P.totalKm,
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
              /* @__PURE__ */ d.jsxDEV("progress", { max: "100", value: P.performance, className: "rc-progress-bar" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 122,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ d.jsxDEV("span", { className: "rc-progress-value", children: P.performance }, void 0, !1, {
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
              P.commissionUsd
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 126,
              columnNumber: 19
            }, this)
          ] }, P.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 117,
            columnNumber: 17
          }, this)),
          !_ && !M && Z.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page <= 1 || _, onClick: () => fe((P) => Math.max(1, P - 1)), children: "Prev" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page >= B.pages || _, onClick: () => fe((P) => Math.min(B.pages, P + 1)), children: "Next" }, void 0, !1, {
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
function m_() {
  const { id: s } = gw(), [m, h] = C.useState(null), [g, b] = C.useState(!0), [R, f] = C.useState("");
  if (C.useEffect(() => {
    let _ = !0;
    return (async () => {
      b(!0), f("");
      try {
        const S = await fetch(`/api/riders/${s}`, { credentials: "include" });
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
        _ && b(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, [s]), g)
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
  const { rider: A, metrics: D, history: T } = m;
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
        /* @__PURE__ */ d.jsxDEV("strong", { children: D.totalDeliveries }, void 0, !1, {
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
          D.avgDeliveryMins,
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
          D.onTimeRate,
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
          D.totalKm,
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
function SE({ orderId: s, onClose: m, onAssigned: h }) {
  const [g, b] = C.useState([]), [R, f] = C.useState(!0), [A, D] = C.useState(""), [T, _] = C.useState(null);
  C.useEffect(() => {
    let M = !0;
    return (async () => {
      f(!0), D("");
      try {
        const z = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (z.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!z.ok) throw new Error("Failed to load riders");
        const W = await z.json();
        M && b(Array.isArray(W.riders) ? W.riders : W.riders || []);
      } catch (z) {
        M && D(z.message || "Failed to load riders");
      } finally {
        M && f(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []);
  async function S(M) {
    if (!(!s || !M)) {
      _(M);
      try {
        const z = await fetch(`/api/orders/${encodeURIComponent(s)}/assign`, {
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
        h && h({ orderId: s, riderId: M }), m();
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
function wv(s) {
  return (Array.isArray(s.tags) ? s.tags : typeof s.tags == "string" ? s.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : s.fulfillment_status === "fulfilled" ? "delivered" : s.fulfillment_status === "partial" ? "in-transit" : "new";
}
function v_() {
  const [s, m] = C.useState([]), [h, g] = C.useState(""), [b, R] = C.useState("all"), [f, A] = C.useState(1), [D, T] = C.useState(20), [_, S] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [M, z] = C.useState(""), [W, fe] = C.useState(""), [X, ue] = C.useState(!0), [B, G] = C.useState(""), [Q, Y] = C.useState(""), [Z, P] = C.useState(!0), [_e, Se] = C.useState(!1), [Me, Oe] = C.useState(null);
  C.useEffect(() => {
    let ee = !0;
    return (async () => {
      var Ne, Je, jt, Yt;
      ue(!0), G(""), Y("");
      try {
        const vt = new URLSearchParams();
        h && vt.set("q", h), b && b !== "all" && vt.set("status", b), M && vt.set("created_at_min", M), W && vt.set("created_at_max", W), vt.set("page", String(f)), vt.set("limit", String(D));
        const ct = await fetch(`/api/orders?${vt.toString()}`, { credentials: "include" });
        if (ct.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ct.ok) throw new Error("Failed to load orders");
        const bt = await ct.json();
        ee && (m(Array.isArray(bt.orders) ? bt.orders : []), Y(bt.shopifyError || ""), P(!!bt.shopifyConfigured), S({ total: ((Ne = bt.meta) == null ? void 0 : Ne.total) || 0, page: ((Je = bt.meta) == null ? void 0 : Je.page) || 1, limit: ((jt = bt.meta) == null ? void 0 : jt.limit) || D, pages: ((Yt = bt.meta) == null ? void 0 : Yt.pages) || 1 }));
      } catch (vt) {
        ee && G(vt.message || "Failed to load orders");
      } finally {
        ee && ue(!1);
      }
    })(), () => {
      ee = !1;
    };
  }, [h, b, f, D, M, W]);
  const Ae = C.useMemo(() => s, [s]), pe = C.useMemo(() => Array.isArray(s) ? b === "all" ? s.filter((ee) => wv(ee) !== "assigned") : s.filter((ee) => wv(ee) === b) : [], [s, b]);
  function Ge() {
    Oe(null), Se(!1);
  }
  function rt(ee) {
    try {
      const { orderId: Ne } = ee || {};
      if (!Ne) return;
      m((Je) => Je.filter((jt) => String(jt.name || jt.order_number || jt.id) !== String(Ne))), S((Je) => ({ ...Je || {}, total: Math.max(0, ((Je == null ? void 0 : Je.total) || 0) - 1) }));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 84,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 82,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 89,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (ee) => {
          g(ee.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 90,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        ["all", "new", "assigned", "in-transit", "delivered"].map((ee) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${b === ee ? " active" : ""}`, onClick: () => {
          R(ee), A(1);
        }, "data-filter": ee, children: ee === "all" ? "All" : ee.replace("-", " ") }, ee, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 94,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-chip", type: "date", value: M, onChange: (ee) => {
          z(ee.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 98,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-chip", type: "date", value: W, onChange: (ee) => {
          fe(ee.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 99,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (ee) => {
          T(parseInt(ee.target.value, 10)), A(1);
        }, children: [10, 20, 50, 100].map((ee) => /* @__PURE__ */ d.jsxDEV("option", { value: ee, children: [
          ee,
          "/page"
        ] }, ee, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 101,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 100,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 92,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    !Z && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 107,
      columnNumber: 11
    }, this),
    Q && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: Q }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 109,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 115,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 116,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 117,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 118,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected", children: "Expected Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 119,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual", children: "Actual Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 120,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 121,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 114,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 113,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        X && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 126,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 126,
          columnNumber: 17
        }, this),
        !X && B && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: B }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 129,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 129,
          columnNumber: 17
        }, this),
        !X && !B && pe.map((ee, Ne) => {
          var bt, It, na;
          const Je = wv(ee), jt = ((bt = ee.customer) == null ? void 0 : bt.first_name) || "", Yt = ((It = ee.customer) == null ? void 0 : It.last_name) || "", vt = ee.shipping_address && `${ee.shipping_address.address1 || ""} ${ee.shipping_address.city || ""}${ee.shipping_address.province ? `, ${ee.shipping_address.province}` : ""}${ee.shipping_address.country ? `, ${ee.shipping_address.country}` : ""}` || "-", ct = ee.name || ee.order_number || ee.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Je, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: ct }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 140,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              jt,
              " ",
              Yt
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 141,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: vt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 142,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider", children: ee.rider ? String(ee.rider) : (na = ee.assignment) != null && na.riderId ? String(ee.assignment.riderId) : "Unassigned" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 143,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected", children: ee.expected_delivery_time ? new Date(ee.expected_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 144,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual", children: ee.actual_delivery_time ? new Date(ee.actual_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 145,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Je}`, children: Je.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 146,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 146,
              columnNumber: 21
            }, this)
          ] }, ct || Ne, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 139,
            columnNumber: 19
          }, this);
        }),
        !X && !B && Ae.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 151,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 151,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 124,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 112,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      _e && Me && /* @__PURE__ */ d.jsxDEV(SE, { orderId: Me, onClose: Ge, onAssigned: rt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 158,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || X, onClick: () => A((ee) => Math.max(1, ee - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 162,
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
          lineNumber: 163,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || X, onClick: () => A((ee) => Math.min(_.pages, ee + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 161,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 156,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 81,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}
function h_() {
  const [s, m] = C.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, g] = C.useState([]), [b, R] = C.useState(!1), [f, A] = C.useState(!0), [D, T] = C.useState("");
  return C.useEffect(() => {
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "reports-stat-value", children: s.totalDeliveries }, void 0, !1, {
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
            s.avgDeliveryMins,
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: b, onChange: (_) => R(_.target.checked) }, void 0, !1, {
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
      b && /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
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
          !f && !D && h.map((_, S) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
          !f && !D && h.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
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
          D && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: D }, void 0, !1, {
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
function y_() {
  const [s, m] = C.useState([]), [h, g] = C.useState(!0), [b, R] = C.useState(""), [f, A] = C.useState(1), [D, T] = C.useState(25), [_, S] = C.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  C.useEffect(() => {
    let Q = !0;
    return (async () => {
      var Y, Z, P, _e;
      g(!0), R("");
      try {
        const Se = new URLSearchParams();
        Se.set("limit", String(D)), Se.set("page", String(f));
        const Me = await fetch(`/api/orders?${Se.toString()}`, { credentials: "include" });
        if (Me.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Me.ok) throw new Error("Failed to load orders");
        const Oe = await Me.json();
        Q && (m(Array.isArray(Oe.orders) ? Oe.orders : []), S({ total: ((Y = Oe.meta) == null ? void 0 : Y.total) || 0, page: ((Z = Oe.meta) == null ? void 0 : Z.page) || f, limit: ((P = Oe.meta) == null ? void 0 : P.limit) || D, pages: ((_e = Oe.meta) == null ? void 0 : _e.pages) || 1 }));
      } catch (Se) {
        Q && R(Se.message || "Failed to load orders");
      } finally {
        Q && g(!1);
      }
    })(), () => {
      Q = !1;
    };
  }, [f]);
  function M(Q) {
    return Q && Q.assignment || (Array.isArray(Q.tags) ? Q.tags : typeof Q.tags == "string" ? Q.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : Q.fulfillment_status === "fulfilled" ? "delivered" : Q.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  const [z, W] = C.useState(!1), [fe, X] = C.useState(null);
  function ue(Q) {
    X(Q), W(!0);
  }
  function B() {
    X(null), W(!1);
  }
  function G(Q) {
    try {
      const { orderId: Y } = Q || {};
      if (!Y) return;
      m((Z) => Z.filter((P, _e) => {
        const Se = String(P.id || P.name || P.order_number || _e).replace(/^#+/, "");
        return String(Se) !== String(Y);
      })), S((Z) => ({ ...Z || {}, total: Math.max(0, ((Z == null ? void 0 : Z.total) || 0) - 1) }));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 70,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 71,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: h ? "…" : _.total || s.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 76,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 73,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 68,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 87,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 88,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 85,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 84,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        h && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 28
        }, this),
        !h && b && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: b }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 42
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 38
        }, this),
        !h && !b && (Array.isArray(s) ? s.filter((Y) => M(Y) !== "assigned") : []).map((Y, Z) => {
          var ee, Ne;
          const P = M(Y), _e = ((ee = Y.customer) == null ? void 0 : ee.first_name) || "", Se = ((Ne = Y.customer) == null ? void 0 : Ne.last_name) || "", Me = Y.shipping_address && `${Y.shipping_address.address1 || ""} ${Y.shipping_address.city || ""}${Y.shipping_address.province ? `, ${Y.shipping_address.province}` : ""}${Y.shipping_address.country ? `, ${Y.shipping_address.country}` : ""}` || "-", Oe = Y.name || Y.order_number || Y.id || Z, Ae = String(Y.id || Y.name || Y.order_number || Z).replace(/^#+/, ""), pe = Y.created_at ? new Date(Y.created_at) : null, Ge = pe ? pe.toLocaleDateString() : "-", rt = pe ? pe.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": P, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: Oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 112,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: [
              _e,
              " ",
              Se
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 113,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: Me }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 114,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${P}`, children: P.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 115,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 115,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: Ge }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 116,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: rt }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 117,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => ue(Ae), children: "Assign Rider" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 118,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 118,
              columnNumber: 23
            }, this)
          ] }, Ae, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 111,
            columnNumber: 21
          }, this);
        }),
        !h && !b && s.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 123,
          columnNumber: 66
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 123,
          columnNumber: 62
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 95,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 82,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || h, onClick: () => A((Q) => Math.max(1, Q - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 130,
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
        lineNumber: 131,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || h, onClick: () => A((Q) => Math.min(_.pages, Q + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 132,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 129,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 128,
      columnNumber: 9
    }, this),
    z && fe && /* @__PURE__ */ d.jsxDEV(SE, { orderId: fe, onClose: B, onAssigned: G }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 137,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 67,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}
function g_() {
  return /* @__PURE__ */ d.jsxDEV(Xw, { children: /* @__PURE__ */ d.jsxDEV(kw, { children: [
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(c_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(f_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(p_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(m_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(h_, {}, void 0, !1, {
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
    /* @__PURE__ */ d.jsxDEV(jr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(Mw, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function oE() {
  const s = document.getElementById("react-root");
  if (!s) return;
  pE(s).render(/* @__PURE__ */ d.jsxDEV(g_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", oE) : oE();
