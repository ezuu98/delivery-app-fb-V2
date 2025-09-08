function Aw(c, m) {
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
function kw(c) {
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
    var h = "18.3.1", g = Symbol.for("react.element"), N = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), D = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), H = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), Q = Symbol.iterator, le = "@@iterator";
    function P(s) {
      if (s === null || typeof s != "object")
        return null;
      var y = Q && s[Q] || s[le];
      return typeof y == "function" ? y : null;
    }
    var G = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, ae = {
      transition: null
    }, J = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, ue = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, Y = {}, ze = null;
    function K(s) {
      ze = s;
    }
    Y.setExtraStackFrame = function(s) {
      ze = s;
    }, Y.getCurrentStack = null, Y.getStackAddendum = function() {
      var s = "";
      ze && (s += ze);
      var y = Y.getCurrentStack;
      return y && (s += y() || ""), s;
    };
    var Ae = !1, Oe = !1, Le = !1, me = !1, Ve = !1, Xe = {
      ReactCurrentDispatcher: G,
      ReactCurrentBatchConfig: ae,
      ReactCurrentOwner: ue
    };
    Xe.ReactDebugCurrentFrame = Y, Xe.ReactCurrentActQueue = J;
    function Je(s) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        jt("warn", s, L);
      }
    }
    function je(s) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        jt("error", s, L);
      }
    }
    function jt(s, y, L) {
      {
        var k = Xe.ReactDebugCurrentFrame, W = k.getStackAddendum();
        W !== "" && (y += "%s", L = L.concat([W]));
        var be = L.map(function(fe) {
          return String(fe);
        });
        be.unshift("Warning: " + y), Function.prototype.apply.call(console[s], console, be);
      }
    }
    var da = {};
    function Bn(s, y) {
      {
        var L = s.constructor, k = L && (L.displayName || L.name) || "ReactClass", W = k + "." + y;
        if (da[W])
          return;
        je("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", y, k), da[W] = !0;
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
      var tr = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, ka = function(s, y) {
        Object.defineProperty(bn.prototype, s, {
          get: function() {
            Je("%s(...) is deprecated in plain JavaScript React classes. %s", y[0], y[1]);
          }
        });
      };
      for (var Qt in tr)
        tr.hasOwnProperty(Qt) && ka(Qt, tr[Qt]);
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
        return je("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Nn(s)), $t(s);
    }
    function nr(s, y, L) {
      var k = s.displayName;
      if (k)
        return k;
      var W = y.displayName || y.name || "";
      return W !== "" ? L + "(" + W + ")" : L;
    }
    function ma(s) {
      return s.displayName || "Context";
    }
    function Vn(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && je("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
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
          case D:
            var y = s;
            return ma(y) + ".Consumer";
          case C:
            var L = s;
            return ma(L._context) + ".Provider";
          case O:
            return nr(s, s.render, "ForwardRef");
          case H:
            var k = s.displayName || null;
            return k !== null ? k : Vn(s.type) || "Memo";
          case z: {
            var W = s, be = W._payload, fe = W._init;
            try {
              return Vn(fe(be));
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
    function Lr(s, y) {
      var L = function() {
        En || (En = !0, je("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: L,
        configurable: !0
      });
    }
    function ar(s, y) {
      var L = function() {
        Ua || (Ua = !0, je("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(s, "ref", {
        get: L,
        configurable: !0
      });
    }
    function Z(s) {
      if (typeof s.ref == "string" && ue.current && s.__self && ue.current.stateNode !== s.__self) {
        var y = Vn(ue.current.type);
        wt[y] || (je('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y, s.ref), wt[y] = !0);
      }
    }
    var pe = function(s, y, L, k, W, be, fe) {
      var Ce = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: s,
        key: y,
        ref: L,
        props: fe,
        // Record the component responsible for creating this element.
        _owner: be
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
        value: k
      }), Object.defineProperty(Ce, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: W
      }), Object.freeze && (Object.freeze(Ce.props), Object.freeze(Ce)), Ce;
    };
    function Me(s, y, L) {
      var k, W = {}, be = null, fe = null, Ce = null, Be = null;
      if (y != null) {
        xn(y) && (fe = y.ref, Z(y)), Mn(y) && (ea(y.key), be = "" + y.key), Ce = y.__self === void 0 ? null : y.__self, Be = y.__source === void 0 ? null : y.__source;
        for (k in y)
          cn.call(y, k) && !Zt.hasOwnProperty(k) && (W[k] = y[k]);
      }
      var et = arguments.length - 2;
      if (et === 1)
        W.children = L;
      else if (et > 1) {
        for (var lt = Array(et), ot = 0; ot < et; ot++)
          lt[ot] = arguments[ot + 2];
        Object.freeze && Object.freeze(lt), W.children = lt;
      }
      if (s && s.defaultProps) {
        var Ue = s.defaultProps;
        for (k in Ue)
          W[k] === void 0 && (W[k] = Ue[k]);
      }
      if (be || fe) {
        var mt = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
        be && Lr(W, mt), fe && ar(W, mt);
      }
      return pe(s, be, fe, Ce, Be, ue.current, W);
    }
    function Ze(s, y) {
      var L = pe(s.type, y, s.ref, s._self, s._source, s._owner, s.props);
      return L;
    }
    function st(s, y, L) {
      if (s == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + s + ".");
      var k, W = Ht({}, s.props), be = s.key, fe = s.ref, Ce = s._self, Be = s._source, et = s._owner;
      if (y != null) {
        xn(y) && (fe = y.ref, et = ue.current), Mn(y) && (ea(y.key), be = "" + y.key);
        var lt;
        s.type && s.type.defaultProps && (lt = s.type.defaultProps);
        for (k in y)
          cn.call(y, k) && !Zt.hasOwnProperty(k) && (y[k] === void 0 && lt !== void 0 ? W[k] = lt[k] : W[k] = y[k]);
      }
      var ot = arguments.length - 2;
      if (ot === 1)
        W.children = L;
      else if (ot > 1) {
        for (var Ue = Array(ot), mt = 0; mt < ot; mt++)
          Ue[mt] = arguments[mt + 2];
        W.children = Ue;
      }
      return pe(s.type, be, fe, Ce, Be, et, W);
    }
    function ht(s) {
      return typeof s == "object" && s !== null && s.$$typeof === g;
    }
    var yt = ".", fn = ":";
    function bt(s) {
      var y = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, k = s.replace(y, function(W) {
        return L[W];
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
    function ta(s, y, L, k, W) {
      var be = typeof s;
      (be === "undefined" || be === "boolean") && (s = null);
      var fe = !1;
      if (s === null)
        fe = !0;
      else
        switch (be) {
          case "string":
          case "number":
            fe = !0;
            break;
          case "object":
            switch (s.$$typeof) {
              case g:
              case N:
                fe = !0;
            }
        }
      if (fe) {
        var Ce = s, Be = W(Ce), et = k === "" ? yt + ha(Ce, 0) : k;
        if (Bt(Be)) {
          var lt = "";
          et != null && (lt = va(et) + "/"), ta(Be, y, lt, "", function(Cf) {
            return Cf;
          });
        } else Be != null && (ht(Be) && (Be.key && (!Ce || Ce.key !== Be.key) && ea(Be.key), Be = Ze(
          Be,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Be.key && (!Ce || Ce.key !== Be.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            va("" + Be.key) + "/"
          ) : "") + et
        )), y.push(Be));
        return 1;
      }
      var ot, Ue, mt = 0, Rt = k === "" ? yt : k + fn;
      if (Bt(s))
        for (var bi = 0; bi < s.length; bi++)
          ot = s[bi], Ue = Rt + ha(ot, bi), mt += ta(ot, y, L, Ue, W);
      else {
        var go = P(s);
        if (typeof go == "function") {
          var or = s;
          go === or.entries && (rt || Je("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rt = !0);
          for (var bo = go.call(or), No, Rf = 0; !(No = bo.next()).done; )
            ot = No.value, Ue = Rt + ha(ot, Rf++), mt += ta(ot, y, L, Ue, W);
        } else if (be === "object") {
          var ps = String(s);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return mt;
    }
    function rr(s, y, L) {
      if (s == null)
        return s;
      var k = [], W = 0;
      return ta(s, k, "", "", function(be) {
        return y.call(L, be, W++);
      }), k;
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
        $$typeof: C,
        _context: y
      };
      var L = !1, k = !1, W = !1;
      {
        var be = {
          $$typeof: D,
          _context: y
        };
        Object.defineProperties(be, {
          Provider: {
            get: function() {
              return k || (k = !0, je("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), y.Provider;
            },
            set: function(fe) {
              y.Provider = fe;
            }
          },
          _currentValue: {
            get: function() {
              return y._currentValue;
            },
            set: function(fe) {
              y._currentValue = fe;
            }
          },
          _currentValue2: {
            get: function() {
              return y._currentValue2;
            },
            set: function(fe) {
              y._currentValue2 = fe;
            }
          },
          _threadCount: {
            get: function() {
              return y._threadCount;
            },
            set: function(fe) {
              y._threadCount = fe;
            }
          },
          Consumer: {
            get: function() {
              return L || (L = !0, je("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), y.Consumer;
            }
          },
          displayName: {
            get: function() {
              return y.displayName;
            },
            set: function(fe) {
              W || (Je("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", fe), W = !0);
            }
          }
        }), y.Consumer = be;
      }
      return y._currentRenderer = null, y._currentRenderer2 = null, y;
    }
    var ya = -1, na = 0, $n = 1, Fa = 2;
    function fi(s) {
      if (s._status === ya) {
        var y = s._result, L = y();
        if (L.then(function(be) {
          if (s._status === na || s._status === ya) {
            var fe = s;
            fe._status = $n, fe._result = be;
          }
        }, function(be) {
          if (s._status === na || s._status === ya) {
            var fe = s;
            fe._status = Fa, fe._result = be;
          }
        }), s._status === ya) {
          var k = s;
          k._status = na, k._result = L;
        }
      }
      if (s._status === $n) {
        var W = s._result;
        return W === void 0 && je(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, W), "default" in W || je(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, W), W.default;
      } else
        throw s._result;
    }
    function b(s) {
      var y = {
        // We use these fields to store the result.
        _status: ya,
        _result: s
      }, L = {
        $$typeof: z,
        _payload: y,
        _init: fi
      };
      {
        var k, W;
        Object.defineProperties(L, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return k;
            },
            set: function(be) {
              je("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), k = be, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return W;
            },
            set: function(be) {
              je("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), W = be, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function I(s) {
      s != null && s.$$typeof === H ? je("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof s != "function" ? je("forwardRef requires a render function but was given %s.", s === null ? "null" : typeof s) : s.length !== 0 && s.length !== 2 && je("forwardRef render functions accept exactly two parameters: props and ref. %s", s.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), s != null && (s.defaultProps != null || s.propTypes != null) && je("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var y = {
        $$typeof: O,
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
    var ee;
    ee = Symbol.for("react.module.reference");
    function ve(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === R || s === A || Ve || s === f || s === S || s === M || me || s === se || Ae || Oe || Le || typeof s == "object" && s !== null && (s.$$typeof === z || s.$$typeof === H || s.$$typeof === C || s.$$typeof === D || s.$$typeof === O || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === ee || s.getModuleId !== void 0));
    }
    function He(s, y) {
      ve(s) || je("memo: The first argument must be a component. Instead received: %s", s === null ? "null" : typeof s);
      var L = {
        $$typeof: H,
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
          set: function(W) {
            k = W, !s.name && !s.displayName && (s.displayName = W);
          }
        });
      }
      return L;
    }
    function xe() {
      var s = G.current;
      return s === null && je(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), s;
    }
    function we(s) {
      var y = xe();
      if (s._context !== void 0) {
        var L = s._context;
        L.Consumer === s ? je("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === s && je("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return y.useContext(s);
    }
    function ye(s) {
      var y = xe();
      return y.useState(s);
    }
    function _t(s, y, L) {
      var k = xe();
      return k.useReducer(s, y, L);
    }
    function ct(s) {
      var y = xe();
      return y.useRef(s);
    }
    function ft(s, y) {
      var L = xe();
      return L.useEffect(s, y);
    }
    function dn(s, y) {
      var L = xe();
      return L.useInsertionEffect(s, y);
    }
    function za(s, y) {
      var L = xe();
      return L.useLayoutEffect(s, y);
    }
    function ga(s, y) {
      var L = xe();
      return L.useCallback(s, y);
    }
    function Ot(s, y) {
      var L = xe();
      return L.useMemo(s, y);
    }
    function di(s, y, L) {
      var k = xe();
      return k.useImperativeHandle(s, y, L);
    }
    function ba(s, y) {
      {
        var L = xe();
        return L.useDebugValue(s, y);
      }
    }
    function ke() {
      var s = xe();
      return s.useTransition();
    }
    function pi(s) {
      var y = xe();
      return y.useDeferredValue(s);
    }
    function ns() {
      var s = xe();
      return s.useId();
    }
    function as(s, y, L) {
      var k = xe();
      return k.useSyncExternalStore(s, y, L);
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
        Vr < 0 && je("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = Xe.ReactCurrentDispatcher, Mr;
    function Zi(s, y, L) {
      {
        if (Mr === void 0)
          try {
            throw Error();
          } catch (W) {
            var k = W.stack.trim().match(/\n( *(at )?)/);
            Mr = k && k[1] || "";
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
      var k;
      vi = !0;
      var W = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var be;
      be = mi.current, mi.current = null, uo();
      try {
        if (y) {
          var fe = function() {
            throw Error();
          };
          if (Object.defineProperty(fe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(fe, []);
            } catch (Rt) {
              k = Rt;
            }
            Reflect.construct(s, [], fe);
          } else {
            try {
              fe.call();
            } catch (Rt) {
              k = Rt;
            }
            s.call(fe.prototype);
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
          for (var Ce = Rt.stack.split(`
`), Be = k.stack.split(`
`), et = Ce.length - 1, lt = Be.length - 1; et >= 1 && lt >= 0 && Ce[et] !== Be[lt]; )
            lt--;
          for (; et >= 1 && lt >= 0; et--, lt--)
            if (Ce[et] !== Be[lt]) {
              if (et !== 1 || lt !== 1)
                do
                  if (et--, lt--, lt < 0 || Ce[et] !== Be[lt]) {
                    var ot = `
` + Ce[et].replace(" at new ", " at ");
                    return s.displayName && ot.includes("<anonymous>") && (ot = ot.replace("<anonymous>", s.displayName)), typeof s == "function" && el.set(s, ot), ot;
                  }
                while (et >= 1 && lt >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = be, Ha(), Error.prepareStackTrace = W;
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
        case S:
          return Zi("Suspense");
        case M:
          return Zi("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case O:
            return co(s.render);
          case H:
            return hi(s.type, y, L);
          case z: {
            var k = s, W = k._payload, be = k._init;
            try {
              return hi(be(W), y, L);
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
    function Nf(s, y, L, k, W) {
      {
        var be = Function.call.bind(cn);
        for (var fe in s)
          if (be(s, fe)) {
            var Ce = void 0;
            try {
              if (typeof s[fe] != "function") {
                var Be = Error((k || "React class") + ": " + L + " type `" + fe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[fe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Be.name = "Invariant Violation", Be;
              }
              Ce = s[fe](y, fe, k, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (et) {
              Ce = et;
            }
            Ce && !(Ce instanceof Error) && (Ge(W), je("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", k || "React class", L, fe, typeof Ce), Ge(null)), Ce instanceof Error && !(Ce.message in os) && (os[Ce.message] = !0, Ge(W), je("Failed %s type: %s", L, Ce.message), Ge(null));
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
      if (ue.current) {
        var s = Vn(ue.current.type);
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
          var k = "";
          s && s._owner && s._owner !== ue.current && (k = " It was passed a child from " + Vn(s._owner.type) + "."), ir(s), je('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, k), ir(null);
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
          var W = P(s);
          if (typeof W == "function" && W !== s.entries)
            for (var be = W.call(s), fe; !(fe = be.next()).done; )
              ht(fe.value) && Yt(fe.value, y);
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
        else if (typeof y == "object" && (y.$$typeof === O || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === H))
          L = y.propTypes;
        else
          return;
        if (L) {
          var k = Vn(y);
          Nf(L, s.props, "prop", k, s);
        } else if (y.PropTypes !== void 0 && !Te) {
          Te = !0;
          var W = Vn(y);
          je("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", W || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && je("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function aa(s) {
      {
        for (var y = Object.keys(s.props), L = 0; L < y.length; L++) {
          var k = y[L];
          if (k !== "children" && k !== "key") {
            ir(s), je("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", k), ir(null);
            break;
          }
        }
        s.ref !== null && (ir(s), je("Invalid attribute `ref` supplied to `React.Fragment`."), ir(null));
      }
    }
    function Rn(s, y, L) {
      var k = ve(s);
      if (!k) {
        var W = "";
        (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (W += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var be = yi(y);
        be ? W += be : W += po();
        var fe;
        s === null ? fe = "null" : Bt(s) ? fe = "array" : s !== void 0 && s.$$typeof === g ? (fe = "<" + (Vn(s.type) || "Unknown") + " />", W = " Did you accidentally export a JSX literal instead of a component?") : fe = typeof s, je("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", fe, W);
      }
      var Ce = Me.apply(this, arguments);
      if (Ce == null)
        return Ce;
      if (k)
        for (var Be = 2; Be < arguments.length; Be++)
          pt(arguments[Be], s);
      return s === R ? aa(Ce) : us(Ce), Ce;
    }
    var Na = !1;
    function xf(s) {
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
      for (var k = st.apply(this, arguments), W = 2; W < arguments.length; W++)
        pt(arguments[W], k.type);
      return us(k), k;
    }
    function ss(s, y) {
      var L = ae.transition;
      ae.transition = {};
      var k = ae.transition;
      ae.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        s();
      } finally {
        if (ae.transition = L, L === null && k._updatedFibers) {
          var W = k._updatedFibers.size;
          W > 10 && Je("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), k._updatedFibers.clear();
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
          tl = function(W) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && je("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var be = new MessageChannel();
            be.port1.onmessage = W, be.port2.postMessage(void 0);
          };
        }
      return tl(s);
    }
    var kr = 0, gi = !1;
    function ho(s) {
      {
        var y = kr;
        kr++, J.current === null && (J.current = []);
        var L = J.isBatchingLegacy, k;
        try {
          if (J.isBatchingLegacy = !0, k = s(), !L && J.didScheduleLegacyUpdate) {
            var W = J.current;
            W !== null && (J.didScheduleLegacyUpdate = !1, rl(W));
          }
        } catch (Ue) {
          throw lr(y), Ue;
        } finally {
          J.isBatchingLegacy = L;
        }
        if (k !== null && typeof k == "object" && typeof k.then == "function") {
          var be = k, fe = !1, Ce = {
            then: function(Ue, mt) {
              fe = !0, be.then(function(Rt) {
                lr(y), kr === 0 ? nl(Rt, Ue, mt) : Ue(Rt);
              }, function(Rt) {
                lr(y), mt(Rt);
              });
            }
          };
          return !gi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            fe || (gi = !0, je("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ce;
        } else {
          var Be = k;
          if (lr(y), kr === 0) {
            var et = J.current;
            et !== null && (rl(et), J.current = null);
            var lt = {
              then: function(Ue, mt) {
                J.current === null ? (J.current = [], nl(Be, Ue, mt)) : Ue(Be);
              }
            };
            return lt;
          } else {
            var ot = {
              then: function(Ue, mt) {
                Ue(Be);
              }
            };
            return ot;
          }
        }
      }
    }
    function lr(s) {
      s !== kr - 1 && je("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), kr = s;
    }
    function nl(s, y, L) {
      {
        var k = J.current;
        if (k !== null)
          try {
            rl(k), Sf(function() {
              k.length === 0 ? (J.current = null, y(s)) : nl(s, y, L);
            });
          } catch (W) {
            L(W);
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
      map: rr,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    m.Children = ds, m.Component = bn, m.Fragment = R, m.Profiler = A, m.PureComponent = Kt, m.StrictMode = f, m.Suspense = S, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xe, m.act = ho, m.cloneElement = fs, m.createContext = ci, m.createElement = cs, m.createFactory = yo, m.createRef = Jt, m.forwardRef = I, m.isValidElement = ht, m.lazy = b, m.memo = He, m.startTransition = ss, m.unstable_act = ho, m.useCallback = ga, m.useContext = we, m.useDebugValue = ba, m.useDeferredValue = pi, m.useEffect = ft, m.useId = ns, m.useImperativeHandle = di, m.useInsertionEffect = dn, m.useLayoutEffect = za, m.useMemo = Ot, m.useReducer = _t, m.useRef = ct, m.useState = ye, m.useSyncExternalStore = as, m.useTransition = ke, m.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var Uw = hf.exports;
uE.exports = Uw;
var T = uE.exports;
const Fw = /* @__PURE__ */ kw(T), zw = /* @__PURE__ */ Aw({
  __proto__: null,
  default: Fw
}, [T]);
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
  var c = T, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), A = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), z = Symbol.iterator, se = "@@iterator";
  function Q(b) {
    if (b === null || typeof b != "object")
      return null;
    var I = z && b[z] || b[se];
    return typeof I == "function" ? I : null;
  }
  var le = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function P(b) {
    {
      for (var I = arguments.length, ee = new Array(I > 1 ? I - 1 : 0), ve = 1; ve < I; ve++)
        ee[ve - 1] = arguments[ve];
      G("error", b, ee);
    }
  }
  function G(b, I, ee) {
    {
      var ve = le.ReactDebugCurrentFrame, He = ve.getStackAddendum();
      He !== "" && (I += "%s", ee = ee.concat([He]));
      var xe = ee.map(function(we) {
        return String(we);
      });
      xe.unshift("Warning: " + I), Function.prototype.apply.call(console[b], console, xe);
    }
  }
  var ae = !1, J = !1, ue = !1, Y = !1, ze = !1, K;
  K = Symbol.for("react.module.reference");
  function Ae(b) {
    return !!(typeof b == "string" || typeof b == "function" || b === g || b === R || ze || b === N || b === D || b === O || Y || b === H || ae || J || ue || typeof b == "object" && b !== null && (b.$$typeof === M || b.$$typeof === S || b.$$typeof === f || b.$$typeof === A || b.$$typeof === C || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    b.$$typeof === K || b.getModuleId !== void 0));
  }
  function Oe(b, I, ee) {
    var ve = b.displayName;
    if (ve)
      return ve;
    var He = I.displayName || I.name || "";
    return He !== "" ? ee + "(" + He + ")" : ee;
  }
  function Le(b) {
    return b.displayName || "Context";
  }
  function me(b) {
    if (b == null)
      return null;
    if (typeof b.tag == "number" && P("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
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
      case D:
        return "Suspense";
      case O:
        return "SuspenseList";
    }
    if (typeof b == "object")
      switch (b.$$typeof) {
        case A:
          var I = b;
          return Le(I) + ".Consumer";
        case f:
          var ee = b;
          return Le(ee._context) + ".Provider";
        case C:
          return Oe(b, b.render, "ForwardRef");
        case S:
          var ve = b.displayName || null;
          return ve !== null ? ve : me(b.type) || "Memo";
        case M: {
          var He = b, xe = He._payload, we = He._init;
          try {
            return me(we(xe));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Ve = Object.assign, Xe = 0, Je, je, jt, da, Bn, Zn, Ht;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function bn() {
    {
      if (Xe === 0) {
        Je = console.log, je = console.info, jt = console.warn, da = console.error, Bn = console.group, Zn = console.groupCollapsed, Ht = console.groupEnd;
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
      Xe++;
    }
  }
  function tr() {
    {
      if (Xe--, Xe === 0) {
        var b = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ve({}, b, {
            value: Je
          }),
          info: Ve({}, b, {
            value: je
          }),
          warn: Ve({}, b, {
            value: jt
          }),
          error: Ve({}, b, {
            value: da
          }),
          group: Ve({}, b, {
            value: Bn
          }),
          groupCollapsed: Ve({}, b, {
            value: Zn
          }),
          groupEnd: Ve({}, b, {
            value: Ht
          })
        });
      }
      Xe < 0 && P("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var ka = le.ReactCurrentDispatcher, Qt;
  function Pn(b, I, ee) {
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
      var ee = Xt.get(b);
      if (ee !== void 0)
        return ee;
    }
    var ve;
    Kt = !0;
    var He = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var xe;
    xe = ka.current, ka.current = null, bn();
    try {
      if (I) {
        var we = function() {
          throw Error();
        };
        if (Object.defineProperty(we.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(we, []);
          } catch (Ot) {
            ve = Ot;
          }
          Reflect.construct(b, [], we);
        } else {
          try {
            we.call();
          } catch (Ot) {
            ve = Ot;
          }
          b.call(we.prototype);
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
        for (var ye = Ot.stack.split(`
`), _t = ve.stack.split(`
`), ct = ye.length - 1, ft = _t.length - 1; ct >= 1 && ft >= 0 && ye[ct] !== _t[ft]; )
          ft--;
        for (; ct >= 1 && ft >= 0; ct--, ft--)
          if (ye[ct] !== _t[ft]) {
            if (ct !== 1 || ft !== 1)
              do
                if (ct--, ft--, ft < 0 || ye[ct] !== _t[ft]) {
                  var dn = `
` + ye[ct].replace(" at new ", " at ");
                  return b.displayName && dn.includes("<anonymous>") && (dn = dn.replace("<anonymous>", b.displayName)), typeof b == "function" && Xt.set(b, dn), dn;
                }
              while (ct >= 1 && ft >= 0);
            break;
          }
      }
    } finally {
      Kt = !1, ka.current = xe, tr(), Error.prepareStackTrace = He;
    }
    var za = b ? b.displayName || b.name : "", ga = za ? Pn(za) : "";
    return typeof b == "function" && Xt.set(b, ga), ga;
  }
  function Bt(b, I, ee) {
    return Ln(b, !1);
  }
  function Nn(b) {
    var I = b.prototype;
    return !!(I && I.isReactComponent);
  }
  function Pt(b, I, ee) {
    if (b == null)
      return "";
    if (typeof b == "function")
      return Ln(b, Nn(b));
    if (typeof b == "string")
      return Pn(b);
    switch (b) {
      case D:
        return Pn("Suspense");
      case O:
        return Pn("SuspenseList");
    }
    if (typeof b == "object")
      switch (b.$$typeof) {
        case C:
          return Bt(b.render);
        case S:
          return Pt(b.type, I, ee);
        case M: {
          var ve = b, He = ve._payload, xe = ve._init;
          try {
            return Pt(xe(He), I, ee);
          } catch {
          }
        }
      }
    return "";
  }
  var $t = Object.prototype.hasOwnProperty, ea = {}, nr = le.ReactDebugCurrentFrame;
  function ma(b) {
    if (b) {
      var I = b._owner, ee = Pt(b.type, b._source, I ? I.type : null);
      nr.setExtraStackFrame(ee);
    } else
      nr.setExtraStackFrame(null);
  }
  function Vn(b, I, ee, ve, He) {
    {
      var xe = Function.call.bind($t);
      for (var we in b)
        if (xe(b, we)) {
          var ye = void 0;
          try {
            if (typeof b[we] != "function") {
              var _t = Error((ve || "React class") + ": " + ee + " type `" + we + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[we] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw _t.name = "Invariant Violation", _t;
            }
            ye = b[we](I, we, ve, ee, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ct) {
            ye = ct;
          }
          ye && !(ye instanceof Error) && (ma(He), P("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ve || "React class", ee, we, typeof ye), ma(null)), ye instanceof Error && !(ye.message in ea) && (ea[ye.message] = !0, ma(He), P("Failed %s type: %s", ee, ye.message), ma(null));
        }
    }
  }
  var cn = Array.isArray;
  function Zt(b) {
    return cn(b);
  }
  function En(b) {
    {
      var I = typeof Symbol == "function" && Symbol.toStringTag, ee = I && b[Symbol.toStringTag] || b.constructor.name || "Object";
      return ee;
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
      return P("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(b)), wt(b);
  }
  var Mn = le.ReactCurrentOwner, Lr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ar, Z, pe;
  pe = {};
  function Me(b) {
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
      var ee = me(Mn.current.type);
      pe[ee] || (P('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', me(Mn.current.type), b.ref), pe[ee] = !0);
    }
  }
  function ht(b, I) {
    {
      var ee = function() {
        ar || (ar = !0, P("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
      };
      ee.isReactWarning = !0, Object.defineProperty(b, "key", {
        get: ee,
        configurable: !0
      });
    }
  }
  function yt(b, I) {
    {
      var ee = function() {
        Z || (Z = !0, P("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
      };
      ee.isReactWarning = !0, Object.defineProperty(b, "ref", {
        get: ee,
        configurable: !0
      });
    }
  }
  var fn = function(b, I, ee, ve, He, xe, we) {
    var ye = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: m,
      // Built-in properties that belong on the element
      type: b,
      key: I,
      ref: ee,
      props: we,
      // Record the component responsible for creating this element.
      _owner: xe
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
  function bt(b, I, ee, ve, He) {
    {
      var xe, we = {}, ye = null, _t = null;
      ee !== void 0 && (xn(ee), ye = "" + ee), Ze(I) && (xn(I.key), ye = "" + I.key), Me(I) && (_t = I.ref, st(I, He));
      for (xe in I)
        $t.call(I, xe) && !Lr.hasOwnProperty(xe) && (we[xe] = I[xe]);
      if (b && b.defaultProps) {
        var ct = b.defaultProps;
        for (xe in ct)
          we[xe] === void 0 && (we[xe] = ct[xe]);
      }
      if (ye || _t) {
        var ft = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
        ye && ht(we, ft), _t && yt(we, ft);
      }
      return fn(b, ye, _t, He, ve, Mn.current, we);
    }
  }
  var rt = le.ReactCurrentOwner, Nt = le.ReactDebugCurrentFrame;
  function va(b) {
    if (b) {
      var I = b._owner, ee = Pt(b.type, b._source, I ? I.type : null);
      Nt.setExtraStackFrame(ee);
    } else
      Nt.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function ta(b) {
    return typeof b == "object" && b !== null && b.$$typeof === m;
  }
  function rr() {
    {
      if (rt.current) {
        var b = me(rt.current.type);
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
        var I = b.fileName.replace(/^.*[\\\/]/, ""), ee = b.lineNumber;
        return `

Check your code at ` + I + ":" + ee + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(b) {
    {
      var I = rr();
      if (!I) {
        var ee = typeof b == "string" ? b : b.displayName || b.name;
        ee && (I = `

Check the top-level render call using <` + ee + ">.");
      }
      return I;
    }
  }
  function Xi(b, I) {
    {
      if (!b._store || b._store.validated || b.key != null)
        return;
      b._store.validated = !0;
      var ee = Ki(I);
      if (si[ee])
        return;
      si[ee] = !0;
      var ve = "";
      b && b._owner && b._owner !== rt.current && (ve = " It was passed a child from " + me(b._owner.type) + "."), va(b), P('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ee, ve), va(null);
    }
  }
  function ci(b, I) {
    {
      if (typeof b != "object")
        return;
      if (Zt(b))
        for (var ee = 0; ee < b.length; ee++) {
          var ve = b[ee];
          ta(ve) && Xi(ve, I);
        }
      else if (ta(b))
        b._store && (b._store.validated = !0);
      else if (b) {
        var He = Q(b);
        if (typeof He == "function" && He !== b.entries)
          for (var xe = He.call(b), we; !(we = xe.next()).done; )
            ta(we.value) && Xi(we.value, I);
      }
    }
  }
  function ya(b) {
    {
      var I = b.type;
      if (I == null || typeof I == "string")
        return;
      var ee;
      if (typeof I == "function")
        ee = I.propTypes;
      else if (typeof I == "object" && (I.$$typeof === C || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      I.$$typeof === S))
        ee = I.propTypes;
      else
        return;
      if (ee) {
        var ve = me(I);
        Vn(ee, b.props, "prop", ve, b);
      } else if (I.PropTypes !== void 0 && !ha) {
        ha = !0;
        var He = me(I);
        P("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", He || "Unknown");
      }
      typeof I.getDefaultProps == "function" && !I.getDefaultProps.isReactClassApproved && P("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function na(b) {
    {
      for (var I = Object.keys(b.props), ee = 0; ee < I.length; ee++) {
        var ve = I[ee];
        if (ve !== "children" && ve !== "key") {
          va(b), P("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ve), va(null);
          break;
        }
      }
      b.ref !== null && (va(b), P("Invalid attribute `ref` supplied to `React.Fragment`."), va(null));
    }
  }
  var $n = {};
  function Fa(b, I, ee, ve, He, xe) {
    {
      var we = Ae(b);
      if (!we) {
        var ye = "";
        (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (ye += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _t = no(He);
        _t ? ye += _t : ye += rr();
        var ct;
        b === null ? ct = "null" : Zt(b) ? ct = "array" : b !== void 0 && b.$$typeof === m ? (ct = "<" + (me(b.type) || "Unknown") + " />", ye = " Did you accidentally export a JSX literal instead of a component?") : ct = typeof b, P("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ct, ye);
      }
      var ft = bt(b, I, ee, He, xe);
      if (ft == null)
        return ft;
      if (we) {
        var dn = I.children;
        if (dn !== void 0)
          if (ve)
            if (Zt(dn)) {
              for (var za = 0; za < dn.length; za++)
                ci(dn[za], b);
              Object.freeze && Object.freeze(dn);
            } else
              P("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(dn, b);
      }
      if ($t.call(I, "key")) {
        var ga = me(b), Ot = Object.keys(I).filter(function(ke) {
          return ke !== "key";
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
    function g(Z, pe) {
      var Me = Z.length;
      Z.push(pe), f(Z, pe, Me);
    }
    function N(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function R(Z) {
      if (Z.length === 0)
        return null;
      var pe = Z[0], Me = Z.pop();
      return Me !== pe && (Z[0] = Me, A(Z, Me, 0)), pe;
    }
    function f(Z, pe, Me) {
      for (var Ze = Me; Ze > 0; ) {
        var st = Ze - 1 >>> 1, ht = Z[st];
        if (C(ht, pe) > 0)
          Z[st] = pe, Z[Ze] = ht, Ze = st;
        else
          return;
      }
    }
    function A(Z, pe, Me) {
      for (var Ze = Me, st = Z.length, ht = st >>> 1; Ze < ht; ) {
        var yt = (Ze + 1) * 2 - 1, fn = Z[yt], bt = yt + 1, rt = Z[bt];
        if (C(fn, pe) < 0)
          bt < st && C(rt, fn) < 0 ? (Z[Ze] = rt, Z[bt] = pe, Ze = bt) : (Z[Ze] = fn, Z[yt] = pe, Ze = yt);
        else if (bt < st && C(rt, pe) < 0)
          Z[Ze] = rt, Z[bt] = pe, Ze = bt;
        else
          return;
      }
    }
    function C(Z, pe) {
      var Me = Z.sortIndex - pe.sortIndex;
      return Me !== 0 ? Me : Z.id - pe.id;
    }
    var D = 1, O = 2, S = 3, M = 4, H = 5;
    function z(Z, pe) {
    }
    var se = typeof performance == "object" && typeof performance.now == "function";
    if (se) {
      var Q = performance;
      c.unstable_now = function() {
        return Q.now();
      };
    } else {
      var le = Date, P = le.now();
      c.unstable_now = function() {
        return le.now() - P;
      };
    }
    var G = 1073741823, ae = -1, J = 250, ue = 5e3, Y = 1e4, ze = G, K = [], Ae = [], Oe = 1, Le = null, me = S, Ve = !1, Xe = !1, Je = !1, je = typeof setTimeout == "function" ? setTimeout : null, jt = typeof clearTimeout == "function" ? clearTimeout : null, da = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Bn(Z) {
      for (var pe = N(Ae); pe !== null; ) {
        if (pe.callback === null)
          R(Ae);
        else if (pe.startTime <= Z)
          R(Ae), pe.sortIndex = pe.expirationTime, g(K, pe);
        else
          return;
        pe = N(Ae);
      }
    }
    function Zn(Z) {
      if (Je = !1, Bn(Z), !Xe)
        if (N(K) !== null)
          Xe = !0, wt(Ht);
        else {
          var pe = N(Ae);
          pe !== null && xn(Zn, pe.startTime - Z);
        }
    }
    function Ht(Z, pe) {
      Xe = !1, Je && (Je = !1, Mn()), Ve = !0;
      var Me = me;
      try {
        var Ze;
        if (!m) return pa(Z, pe);
      } finally {
        Le = null, me = Me, Ve = !1;
      }
    }
    function pa(Z, pe) {
      var Me = pe;
      for (Bn(Me), Le = N(K); Le !== null && !(Le.expirationTime > Me && (!Z || nr())); ) {
        var Ze = Le.callback;
        if (typeof Ze == "function") {
          Le.callback = null, me = Le.priorityLevel;
          var st = Le.expirationTime <= Me, ht = Ze(st);
          Me = c.unstable_now(), typeof ht == "function" ? Le.callback = ht : Le === N(K) && R(K), Bn(Me);
        } else
          R(K);
        Le = N(K);
      }
      if (Le !== null)
        return !0;
      var yt = N(Ae);
      return yt !== null && xn(Zn, yt.startTime - Me), !1;
    }
    function bn(Z, pe) {
      switch (Z) {
        case D:
        case O:
        case S:
        case M:
        case H:
          break;
        default:
          Z = S;
      }
      var Me = me;
      me = Z;
      try {
        return pe();
      } finally {
        me = Me;
      }
    }
    function tr(Z) {
      var pe;
      switch (me) {
        case D:
        case O:
        case S:
          pe = S;
          break;
        default:
          pe = me;
          break;
      }
      var Me = me;
      me = pe;
      try {
        return Z();
      } finally {
        me = Me;
      }
    }
    function ka(Z) {
      var pe = me;
      return function() {
        var Me = me;
        me = pe;
        try {
          return Z.apply(this, arguments);
        } finally {
          me = Me;
        }
      };
    }
    function Qt(Z, pe, Me) {
      var Ze = c.unstable_now(), st;
      if (typeof Me == "object" && Me !== null) {
        var ht = Me.delay;
        typeof ht == "number" && ht > 0 ? st = Ze + ht : st = Ze;
      } else
        st = Ze;
      var yt;
      switch (Z) {
        case D:
          yt = ae;
          break;
        case O:
          yt = J;
          break;
        case H:
          yt = ze;
          break;
        case M:
          yt = Y;
          break;
        case S:
        default:
          yt = ue;
          break;
      }
      var fn = st + yt, bt = {
        id: Oe++,
        callback: pe,
        priorityLevel: Z,
        startTime: st,
        expirationTime: fn,
        sortIndex: -1
      };
      return st > Ze ? (bt.sortIndex = st, g(Ae, bt), N(K) === null && bt === N(Ae) && (Je ? Mn() : Je = !0, xn(Zn, st - Ze))) : (bt.sortIndex = fn, g(K, bt), !Xe && !Ve && (Xe = !0, wt(Ht))), bt;
    }
    function Pn() {
    }
    function Kt() {
      !Xe && !Ve && (Xe = !0, wt(Ht));
    }
    function Xt() {
      return N(K);
    }
    function Jt(Z) {
      Z.callback = null;
    }
    function Ln() {
      return me;
    }
    var Bt = !1, Nn = null, Pt = -1, $t = h, ea = -1;
    function nr() {
      var Z = c.unstable_now() - ea;
      return !(Z < $t);
    }
    function ma() {
    }
    function Vn(Z) {
      if (Z < 0 || Z > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      Z > 0 ? $t = Math.floor(1e3 / Z) : $t = h;
    }
    var cn = function() {
      if (Nn !== null) {
        var Z = c.unstable_now();
        ea = Z;
        var pe = !0, Me = !0;
        try {
          Me = Nn(pe, Z);
        } finally {
          Me ? Zt() : (Bt = !1, Nn = null);
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
        je(cn, 0);
      };
    function wt(Z) {
      Nn = Z, Bt || (Bt = !0, Zt());
    }
    function xn(Z, pe) {
      Pt = je(function() {
        Z(c.unstable_now());
      }, pe);
    }
    function Mn() {
      jt(Pt), Pt = -1;
    }
    var Lr = ma, ar = null;
    c.unstable_IdlePriority = H, c.unstable_ImmediatePriority = D, c.unstable_LowPriority = M, c.unstable_NormalPriority = S, c.unstable_Profiling = ar, c.unstable_UserBlockingPriority = O, c.unstable_cancelCallback = Jt, c.unstable_continueExecution = Kt, c.unstable_forceFrameRate = Vn, c.unstable_getCurrentPriorityLevel = Ln, c.unstable_getFirstCallbackNode = Xt, c.unstable_next = tr, c.unstable_pauseExecution = Pn, c.unstable_requestPaint = Lr, c.unstable_runWithPriority = bn, c.unstable_scheduleCallback = Qt, c.unstable_shouldYield = nr, c.unstable_wrapCallback = ka, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var c = T, m = Hw, h = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
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
  var C = 0, D = 1, O = 2, S = 3, M = 4, H = 5, z = 6, se = 7, Q = 8, le = 9, P = 10, G = 11, ae = 12, J = 13, ue = 14, Y = 15, ze = 16, K = 17, Ae = 18, Oe = 19, Le = 21, me = 22, Ve = 23, Xe = 24, Je = 25, je = !0, jt = !1, da = !1, Bn = !1, Zn = !1, Ht = !0, pa = !0, bn = !0, tr = !0, ka = /* @__PURE__ */ new Set(), Qt = {}, Pn = {};
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
  var Zt = 0, En = 1, Ua = 2, wt = 3, xn = 4, Mn = 5, Lr = 6, ar = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Z = ar + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", pe = new RegExp("^[" + ar + "][" + Z + "]*$"), Me = {}, Ze = {};
  function st(e) {
    return Ln.call(Ze, e) ? !0 : Ln.call(Me, e) ? !1 : pe.test(e) ? (Ze[e] = !0, !0) : (Me[e] = !0, f("Invalid attribute name: `%s`", e), !1);
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
        case Lr:
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
  var na = Symbol.for("react.element"), $n = Symbol.for("react.portal"), Fa = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), I = Symbol.for("react.provider"), ee = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), He = Symbol.for("react.suspense"), xe = Symbol.for("react.suspense_list"), we = Symbol.for("react.memo"), ye = Symbol.for("react.lazy"), _t = Symbol.for("react.scope"), ct = Symbol.for("react.debug_trace_mode"), ft = Symbol.for("react.offscreen"), dn = Symbol.for("react.legacy_hidden"), za = Symbol.for("react.cache"), ga = Symbol.for("react.tracing_marker"), Ot = Symbol.iterator, di = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Ot && e[Ot] || e[di];
    return typeof t == "function" ? t : null;
  }
  var ke = Object.assign, pi = 0, ns, as, Vr, ao, ro, io, lo;
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
          log: ke({}, e, {
            value: ns
          }),
          info: ke({}, e, {
            value: as
          }),
          warn: ke({}, e, {
            value: Vr
          }),
          error: ke({}, e, {
            value: ao
          }),
          group: ke({}, e, {
            value: ro
          }),
          groupCollapsed: ke({}, e, {
            value: io
          }),
          groupEnd: ke({}, e, {
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
                  var x = `
` + o[p].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Mr.set(e, x), x;
                }
              while (p >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      mi = !1, Ji.current = i, is(), Error.prepareStackTrace = r;
    }
    var E = e ? e.displayName || e.name : "", _ = E ? Ha(E) : "";
    return typeof e == "function" && Mr.set(e, _), _;
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
      case xe:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ve:
          return so(e.render);
        case we:
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
      case H:
        return Ha(e.type);
      case ze:
        return Ha("Lazy");
      case J:
        return Ha("Suspense");
      case Oe:
        return Ha("SuspenseList");
      case C:
      case O:
      case Y:
        return so(e.type);
      case G:
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
      case xe:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ee:
          var t = e;
          return fo(t) + ".Consumer";
        case I:
          var n = e;
          return fo(n._context) + ".Provider";
        case ve:
          return os(e, e.render, "ForwardRef");
        case we:
          var a = e.displayName || null;
          return a !== null ? a : Ge(e.type) || "Memo";
        case ye: {
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
      case le:
        var a = n;
        return ir(a) + ".Consumer";
      case P:
        var r = n;
        return ir(r._context) + ".Provider";
      case Ae:
        return "DehydratedFragment";
      case G:
        return Nf(n, n.render, "ForwardRef");
      case se:
        return "Fragment";
      case H:
        return n;
      case M:
        return "Portal";
      case S:
        return "Root";
      case z:
        return "Text";
      case ze:
        return Ge(n);
      case Q:
        return n === fi ? "StrictMode" : "Mode";
      case me:
        return "Offscreen";
      case ae:
        return "Profiler";
      case Le:
        return "Scope";
      case J:
        return "Suspense";
      case Oe:
        return "SuspenseList";
      case Je:
        return "TracingMarker";
      case D:
      case C:
      case K:
      case O:
      case ue:
      case Y:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = h.ReactDebugCurrentFrame, Sn = null, yi = !1;
  function Ar() {
    {
      if (Sn === null)
        return null;
      var e = Sn._debugOwner;
      if (e !== null && typeof e < "u")
        return Te(e);
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
  function kr(e) {
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
    vo(e) || (e._valueTracker = kr(e));
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
    var n = e, a = t.checked, r = ke({}, t, {
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
    t.hasOwnProperty("value") ? be(n, t.type, r) : t.hasOwnProperty("defaultValue") && be(n, t.type, Na(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
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
    y(n, t), W(n, t);
  }
  function W(e, t) {
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
  function be(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || lr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Rn(e._wrapperState.initialValue) : e.defaultValue !== Rn(n) && (e.defaultValue = Rn(n)));
  }
  var fe = !1, Ce = !1, Be = !1;
  function et(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? c.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ce || (Ce = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Be || (Be = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !fe && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), fe = !0);
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
    return ke({}, t, {
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
    var a = ke({}, t, {
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
  function xE(e, t) {
    $v(e, t);
  }
  var ur = "http://www.w3.org/1999/xhtml", SE = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return SE;
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
  }, IE = ke({
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
  }, ll = {}, GE = new RegExp("^(aria)-[" + Z + "]*$"), WE = new RegExp("^(aria)[A-Z][" + Z + "]*$");
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
    var Cn = {}, th = /^on./, ZE = /^on[^A-Z]/, ex = new RegExp("^(aria)-[" + Z + "]*$"), tx = new RegExp("^(aria)[A-Z][" + Z + "]*$");
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
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === sr ? t.parentNode : t;
  }
  var kf = null, ol = null, ul = null;
  function ah(e) {
    var t = Ir(e);
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
      var v = document.createEvent("Event"), x = !1, E = !0, _ = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
      function U() {
        zf.removeEventListener(F, he, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = _);
      }
      var te = Array.prototype.slice.call(arguments, 3);
      function he() {
        x = !0, U(), n.apply(a, te), E = !1;
      }
      var de, Ye = !1, Fe = !1;
      function j(w) {
        if (de = w.error, Ye = !0, de === null && w.colno === 0 && w.lineno === 0 && (Fe = !0), w.defaultPrevented && de != null && typeof de == "object")
          try {
            de._suppressLogging = !0;
          } catch {
          }
      }
      var F = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), zf.addEventListener(F, he, !1), v.initEvent(F, !1, !1), zf.dispatchEvent(v), V && Object.defineProperty(window, "event", V), x && E && (Ye ? Fe && (de = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : de = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(de)), window.removeEventListener("error", j), !x)
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
  ), xi = (
    /*                          */
    512
  ), dl = (
    /*                     */
    1024
  ), Ur = (
    /*                      */
    2048
  ), dr = (
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
  ), Fr = (
    /*               */
    16777216
  ), Gf = (
    /*              */
    33554432
  ), Wf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    We | dl | 0
  ), Qf = Dt | We | Ei | Do | xi | dr | Si, To = We | fh | xi | Si, pl = Ur | Ei, pr = Ri | qf | If, xx = h.ReactCurrentOwner;
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
    return t.tag === S ? n : null;
  }
  function ph(e) {
    if (e.tag === J) {
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
    if (a.tag !== S)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function yh(e) {
    var t = hh(e);
    return t !== null ? gh(t) : null;
  }
  function gh(e) {
    if (e.tag === H || e.tag === z)
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
    if (e.tag === H || e.tag === z)
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
  var Nh = m.unstable_scheduleCallback, Dx = m.unstable_cancelCallback, Tx = m.unstable_shouldYield, jx = m.unstable_requestPaint, It = m.unstable_now, wx = m.unstable_getCurrentPriorityLevel, Ns = m.unstable_ImmediatePriority, Kf = m.unstable_UserBlockingPriority, Di = m.unstable_NormalPriority, _x = m.unstable_LowPriority, Xf = m.unstable_IdlePriority, Ox = m.unstable_yieldValue, Lx = m.unstable_setDisableYieldValue, ml = null, pn = null, re = null, Ba = !1, Ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function Vx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = ke({}, e, {
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
    re = e;
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
    re !== null && typeof re.markCommitStarted == "function" && re.markCommitStarted(e);
  }
  function Eh() {
    re !== null && typeof re.markCommitStopped == "function" && re.markCommitStopped();
  }
  function jo(e) {
    re !== null && typeof re.markComponentRenderStarted == "function" && re.markComponentRenderStarted(e);
  }
  function vl() {
    re !== null && typeof re.markComponentRenderStopped == "function" && re.markComponentRenderStopped();
  }
  function Bx(e) {
    re !== null && typeof re.markComponentPassiveEffectMountStarted == "function" && re.markComponentPassiveEffectMountStarted(e);
  }
  function Px() {
    re !== null && typeof re.markComponentPassiveEffectMountStopped == "function" && re.markComponentPassiveEffectMountStopped();
  }
  function $x(e) {
    re !== null && typeof re.markComponentPassiveEffectUnmountStarted == "function" && re.markComponentPassiveEffectUnmountStarted(e);
  }
  function Yx() {
    re !== null && typeof re.markComponentPassiveEffectUnmountStopped == "function" && re.markComponentPassiveEffectUnmountStopped();
  }
  function Ix(e) {
    re !== null && typeof re.markComponentLayoutEffectMountStarted == "function" && re.markComponentLayoutEffectMountStarted(e);
  }
  function qx() {
    re !== null && typeof re.markComponentLayoutEffectMountStopped == "function" && re.markComponentLayoutEffectMountStopped();
  }
  function xh(e) {
    re !== null && typeof re.markComponentLayoutEffectUnmountStarted == "function" && re.markComponentLayoutEffectUnmountStarted(e);
  }
  function Sh() {
    re !== null && typeof re.markComponentLayoutEffectUnmountStopped == "function" && re.markComponentLayoutEffectUnmountStopped();
  }
  function Gx(e, t, n) {
    re !== null && typeof re.markComponentErrored == "function" && re.markComponentErrored(e, t, n);
  }
  function Wx(e, t, n) {
    re !== null && typeof re.markComponentSuspended == "function" && re.markComponentSuspended(e, t, n);
  }
  function Qx(e) {
    re !== null && typeof re.markLayoutEffectsStarted == "function" && re.markLayoutEffectsStarted(e);
  }
  function Kx() {
    re !== null && typeof re.markLayoutEffectsStopped == "function" && re.markLayoutEffectsStopped();
  }
  function Xx(e) {
    re !== null && typeof re.markPassiveEffectsStarted == "function" && re.markPassiveEffectsStarted(e);
  }
  function Jx() {
    re !== null && typeof re.markPassiveEffectsStopped == "function" && re.markPassiveEffectsStopped();
  }
  function Rh(e) {
    re !== null && typeof re.markRenderStarted == "function" && re.markRenderStarted(e);
  }
  function Zx() {
    re !== null && typeof re.markRenderYielded == "function" && re.markRenderYielded();
  }
  function Ch() {
    re !== null && typeof re.markRenderStopped == "function" && re.markRenderStopped();
  }
  function eS(e) {
    re !== null && typeof re.markRenderScheduled == "function" && re.markRenderScheduled(e);
  }
  function tS(e, t) {
    re !== null && typeof re.markForceUpdateScheduled == "function" && re.markForceUpdateScheduled(e, t);
  }
  function Jf(e, t) {
    re !== null && typeof re.markStateUpdateScheduled == "function" && re.markStateUpdateScheduled(e, t);
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
  var Zf = 31, $ = (
    /*                        */
    0
  ), Gt = (
    /*                          */
    0
  ), Se = (
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
  function iS(e) {
    {
      if (e & Se)
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
  var ut = -1, xs = _o, Ss = gl;
  function Vo(e) {
    switch (wi(e)) {
      case Se:
        return Se;
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
      var v = wi(a), x = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === $a && (x & yl) !== $
      )
        return t;
    }
    (a & mr) !== $ && (a |= n & $a);
    var E = e.entangledLanes;
    if (E !== $)
      for (var _ = e.entanglements, V = a & E; V > 0; ) {
        var U = _i(V), te = 1 << U;
        a |= _[U], V &= ~te;
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
      case Se:
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
  function uS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o, p = i[o];
      p === ut ? ((u & a) === $ || (u & r) !== $) && (i[o] = oS(u, t)) : p <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function sS(e) {
    return Vo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~Yn;
    return t !== $ ? t : t & Yn ? Yn : $;
  }
  function cS(e) {
    return (e & Se) !== $;
  }
  function Nd(e) {
    return (e & jh) !== $;
  }
  function wh(e) {
    return (e & Es) === e;
  }
  function fS(e) {
    var t = Se | mr | $a;
    return (e & t) === $;
  }
  function dS(e) {
    return (e & yl) === e;
  }
  function Cs(e, t) {
    var n = hl | mr | Ti | $a;
    return (t & n) !== $;
  }
  function pS(e, t) {
    return (t & e.expiredLanes) !== $;
  }
  function _h(e) {
    return (e & yl) !== $;
  }
  function Oh() {
    var e = xs;
    return xs <<= 1, (xs & yl) === $ && (xs = _o), e;
  }
  function mS() {
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
  function _e(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Lh(e, t) {
    return e & t;
  }
  function N_(e) {
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
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = $, e.pingedLanes = $);
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
    e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o;
      a[o] = $, r[o] = ut, i[o] = ut, l &= ~u;
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
  function kh(e, t) {
    return null;
  }
  var qn = Se, vr = mr, hr = $a, Ts = ji, ko = Gt;
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
    return Rd(qn, t) ? Rd(vr, t) ? Nd(t) ? hr : Ts : vr : qn;
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
  var Dd = !1, ws = [], zr = null, Hr = null, Br = null, Uo = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Map(), Pr = [], jS = [
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
        zr = null;
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
        var o = Ir(t);
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
        return zr = zo(zr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Hr = zo(Hr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var o = r;
        return Br = zo(Br, e, t, n, a, o), !0;
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
        if (a === J) {
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
        ix(i), r.target.dispatchEvent(i), lx();
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
  function VS() {
    Dd = !1, zr !== null && _s(zr) && (zr = null), Hr !== null && _s(Hr) && (Hr = null), Br !== null && _s(Br) && (Br = null), Uo.forEach(Yh), Fo.forEach(Yh);
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
    zr !== null && Ho(zr, e), Hr !== null && Ho(Hr, e), Br !== null && Ho(Br, e);
    var a = function(o) {
      return Ho(o, e);
    };
    Uo.forEach(a), Fo.forEach(a);
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
  function MS() {
    return Td;
  }
  function AS(e, t, n) {
    var a = qh(t), r;
    switch (a) {
      case qn:
        r = kS;
        break;
      case vr:
        r = US;
        break;
      case hr:
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
      Wt(vr), jd(e, t, n, a);
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
        var i = Ir(r);
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
        if (o === J) {
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
        return vr;
      case "message": {
        var t = wx();
        switch (t) {
          case Ns:
            return qn;
          case Kf:
            return vr;
          case Di:
          case _x:
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
    return ke(t.prototype, {
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
  }, Od = Gn(El), Yo = ke({}, El, {
    view: 0,
    detail: 0
  }), IS = Gn(Yo), Ld, Vd, Io;
  function qS(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Ld = e.screenX - Io.screenX, Vd = e.screenY - Io.screenY) : (Ld = 0, Vd = 0), Io = e);
  }
  var Ms = ke({}, Yo, {
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
  }), Kh = Gn(Ms), GS = ke({}, Ms, {
    dataTransfer: 0
  }), WS = Gn(GS), QS = ke({}, Yo, {
    relatedTarget: 0
  }), Md = Gn(QS), KS = ke({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), XS = Gn(KS), JS = ke({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ZS = Gn(JS), eR = ke({}, El, {
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
  var oR = ke({}, Yo, {
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
  }), uR = Gn(oR), sR = ke({}, Ms, {
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
  }), Jh = Gn(sR), cR = ke({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ad
  }), fR = Gn(cR), dR = ke({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pR = Gn(dR), mR = ke({}, Ms, {
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
    !t || !t.controlled || e.type !== "number" || be(e, "number", e.value);
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
      var E, _;
      if (u) {
        var V = a.relatedTarget || a.toElement;
        if (E = n, _ = V ? Vi(V) : null, _ !== null) {
          var U = Ci(_);
          (_ !== U || _.tag !== H && _.tag !== z) && (_ = null);
        }
      } else
        E = null, _ = n;
      if (E !== _) {
        var te = Kh, he = "onMouseLeave", de = "onMouseEnter", Ye = "mouse";
        (t === "pointerout" || t === "pointerover") && (te = Jh, he = "onPointerLeave", de = "onPointerEnter", Ye = "pointer");
        var Fe = E == null ? v : jl(E), j = _ == null ? v : jl(_), F = new te(he, Ye + "leave", E, a, r);
        F.target = Fe, F.relatedTarget = j;
        var w = null, q = Vi(r);
        if (q === n) {
          var oe = new te(de, Ye + "enter", _, a, r);
          oe.target = j, oe.relatedTarget = Fe, w = oe;
        }
        pC(e, F, w, E, _);
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
    var i = 0, l = -1, o = -1, u = 0, p = 0, v = e, x = null;
    e: for (; ; ) {
      for (var E = null; v === t && (n === 0 || v.nodeType === sr) && (l = i + n), v === a && (r === 0 || v.nodeType === sr) && (o = i + r), v.nodeType === sr && (i += v.nodeValue.length), (E = v.firstChild) !== null; )
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
    return e.window === e ? e.document : e.nodeType === cr ? e : e.ownerDocument;
  }
  function yy(e, t, n) {
    var a = rC(n);
    if (!(zd || Sl == null || Sl !== lr(a))) {
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
  function $r(e, t) {
    Sy.set(e, t), Kt(t, [e]);
  }
  function lC() {
    for (var e = 0; e < Ry.length; e++) {
      var t = Ry[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      $r(n, "on" + a);
    }
    $r(by, "onAnimationEnd"), $r(Ny, "onAnimationIteration"), $r(Ey, "onAnimationStart"), $r("dblclick", "onDoubleClick"), $r("focusin", "onFocus"), $r("focusout", "onBlur"), $r(xy, "onTransitionEnd");
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
          var _ = new u(o, p, null, a, r);
          e.push({
            event: _,
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
        var v = t[p], x = v.instance, E = v.currentTarget, _ = v.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        Cy(e, _, E), a = x;
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
      var t = e.nodeType === cr ? e : e.ownerDocument;
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
              var _ = Vi(p);
              if (_ === null)
                return;
              var V = _.tag;
              if (V === H || V === z) {
                o = i = _;
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
      var x = p, E = x.stateNode, _ = x.tag;
      if (_ === H && E !== null && (v = E, o !== null)) {
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
      if (o === H && l !== null) {
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
    while (e && e.tag !== H);
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
      if (x === H && v !== null) {
        var E = v;
        if (r) {
          var _ = Ro(o, i);
          _ != null && l.unshift(Zo(o, _, E));
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
  var kn = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", _y = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Oy, $s, Ly, Vy;
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
    if (i !== r && (a && (kn || (kn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && je))
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
        } else u === eu || u === Oi || u === Hs || u === Yr || u === _y || (Qt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in o) {
      var E = o[u], _ = l != null ? l[u] : void 0;
      if (!(!o.hasOwnProperty(u) || E === _ || E == null && _ == null))
        if (u === Li)
          if (E && Object.freeze(E), _) {
            for (p in _)
              _.hasOwnProperty(p) && (!E || !E.hasOwnProperty(p)) && (v || (v = {}), v[p] = "");
            for (p in E)
              E.hasOwnProperty(p) && _[p] !== E[p] && (v || (v = {}), v[p] = E[p]);
          } else
            v || (i || (i = []), i.push(u, v)), v = E;
        else if (u === eu) {
          var V = E ? E[Bs] : void 0, U = _ ? _[Bs] : void 0;
          V != null && U !== V && (i = i || []).push(u, V);
        } else u === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(u, "" + E) : u === Hs || u === Yr || (Qt.hasOwnProperty(u) ? (E != null && (typeof E != "function" && $s(u, E), u === "onScroll" && dt("scroll", e)), !i && _ !== E && (i = [])) : (i = i || []).push(u, E));
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
    var _ = null;
    for (var V in n)
      if (n.hasOwnProperty(V)) {
        var U = n[V];
        if (V === Oi)
          typeof U == "string" ? e.textContent !== U && (n[Yr] !== !0 && Is(e.textContent, U, i, l), _ = [Oi, U]) : typeof U == "number" && e.textContent !== "" + U && (n[Yr] !== !0 && Is(e.textContent, U, i, l), _ = [Oi, "" + U]);
        else if (Qt.hasOwnProperty(V))
          U != null && (typeof U != "function" && $s(V, U), V === "onScroll" && dt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var te = void 0, he = bt(V);
          if (n[Yr] !== !0) {
            if (!(V === Hs || V === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === eu) {
                var de = e.innerHTML, Ye = U ? U[Bs] : void 0;
                if (Ye != null) {
                  var Fe = Vy(e, Ye);
                  Fe !== de && tu(V, de, Fe);
                }
              } else if (V === Li) {
                if (u.delete(V), Ly) {
                  var j = BE(U);
                  te = e.getAttribute("style"), j !== te && tu(V, te, j);
                }
              } else if (o && !Zn)
                u.delete(V.toLowerCase()), te = ci(e, V, U), U !== te && tu(V, te, U);
              else if (!ht(V, he, o) && !fn(V, U, he, o)) {
                var F = !1;
                if (he !== null)
                  u.delete(he.attributeName), te = Xi(e, V, U, he);
                else {
                  var w = a;
                  if (w === ur && (w = jf(t)), w === ur)
                    u.delete(V.toLowerCase());
                  else {
                    var q = CC(V);
                    q !== null && q !== V && (F = !0, u.delete(q)), u.delete(V);
                  }
                  te = ci(e, V, U);
                }
                var oe = Zn;
                !oe && U !== te && !F && tu(V, te, U);
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
    return _;
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
      var n = ke({}, e || ky), a = {
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
  function kC(e, t, n) {
    {
      var a = e, r = wf(a.namespace, t), i = au(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function E_(e) {
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
    return e === void 0 ? hr : qh(e.type);
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
    var p = (i.mode & Pe) !== ge;
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
  function Ir(e) {
    var t = e[Tl] || e[ou];
    return t && (t.tag === H || t.tag === z || t.tag === J || t.tag === S) ? t : null;
  }
  function jl(e) {
    if (e.tag === H || e.tag === z)
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
        Sa(r, l, "child context", u);
      }
      return ke({}, n, l);
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
      if (!Sx(e) || e.tag !== D)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case S:
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
      var e = 0, t = xa();
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
    return ki(), (e.flags & dh) !== Ne;
  }
  function Y0(e) {
    return ki(), lc;
  }
  function I0() {
    var e = Er, t = Nr, n = t & ~q0(t);
    return n.toString(32) + e;
  }
  function Ai(e, t) {
    ki(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Xy(e, t, n) {
    ki(), ra[ia++] = Nr, ra[ia++] = Er, ra[ia++] = Mi, Mi = e;
    var a = Nr, r = Er, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, u = oc(t) + i;
    if (u > 30) {
      var p = i - i % 5, v = (1 << p) - 1, x = (l & v).toString(32), E = l >> p, _ = i - p, V = oc(t) + _, U = o << _, te = U | E, he = x + r;
      Nr = 1 << V | te, Er = he;
    } else {
      var de = o << i, Ye = de | l, Fe = r;
      Nr = 1 << u | Ye, Er = Fe;
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
      Mi = ra[--ia], ra[ia] = null, Er = ra[--ia], ra[ia] = null, Nr = ra[--ia], ra[ia] = null;
  }
  function G0() {
    return ki(), Mi !== null ? {
      id: Nr,
      overflow: Er
    } : null;
  }
  function W0(e, t) {
    ki(), ra[ia++] = Nr, ra[ia++] = Er, ra[ia++] = Mi, Nr = t.id, Er = t.overflow, Mi = e;
  }
  function ki() {
    tn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var en = null, la = null, Ra = !1, Ui = !1, Qr = null;
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
    return la = v0(t), en = e, Ra = !0, Qr = null, Ui = !1, !0;
  }
  function J0(e, t, n) {
    return la = h0(t), en = e, Ra = !0, Qr = null, Ui = !1, n !== null && W0(e, n), !0;
  }
  function Zy(e, t) {
    switch (e.tag) {
      case S: {
        D0(e.stateNode.containerInfo, t);
        break;
      }
      case H: {
        var n = (e.mode & Pe) !== ge;
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
      case J: {
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
      if (Ui)
        return;
      switch (e.tag) {
        case S: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case H:
              var a = t.type;
              t.pendingProps, w0(n, a);
              break;
            case z:
              var r = t.pendingProps;
              _0(n, r);
              break;
          }
          break;
        }
        case H: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case H: {
              var u = t.type, p = t.pendingProps, v = (e.mode & Pe) !== ge;
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
            case z: {
              var x = t.pendingProps, E = (e.mode & Pe) !== ge;
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
        case J: {
          var _ = e.memoizedState, V = _.dehydrated;
          if (V !== null) switch (t.tag) {
            case H:
              var U = t.type;
              t.pendingProps, O0(V, U);
              break;
            case z:
              var te = t.pendingProps;
              L0(V, te);
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
      case H: {
        var n = e.type;
        e.pendingProps;
        var a = s0(t, n);
        return a !== null ? (e.stateNode = a, en = e, la = m0(a), !0) : !1;
      }
      case z: {
        var r = e.pendingProps, i = c0(t, r);
        return i !== null ? (e.stateNode = i, en = e, la = null, !0) : !1;
      }
      case J: {
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
    return (e.mode & Pe) !== ge && (e.flags & Qe) === Ne;
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
            var i = r.stateNode.containerInfo, l = (r.mode & Pe) !== ge;
            R0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case H: {
            var o = r.type, u = r.memoizedProps, p = r.stateNode, v = (r.mode & Pe) !== ge;
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
    for (var t = e.return; t !== null && t.tag !== H && t.tag !== S && t.tag !== J; )
      t = t.return;
    en = t;
  }
  function uc(e) {
    if (e !== en)
      return !1;
    if (!Ra)
      return ag(e), Ra = !0, !1;
    if (e.tag !== S && (e.tag !== H || S0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = la;
      if (t)
        if (mp(e))
          rg(e), vp();
        else
          for (; t; )
            eg(e, t), t = lu(t);
    }
    return ag(e), e.tag === J ? la = nD(e) : la = en ? lu(e.stateNode) : null, !0;
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
        e.add(Te(E) || "Component"), zi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(Te(E) || "Component"), zi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(Te(E) || "Component"), zi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(Te(E) || "Component"), zi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(Te(E) || "Component"), zi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(Te(E) || "Component"), zi.add(E.type);
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
            a.add(Te(i) || "Component"), lg.add(i.type);
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
      var t = Te(e) || "Component";
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
      if (F === null || F.tag !== z) {
        var oe = yv(w, j.mode, q);
        return oe.return = j, oe;
      } else {
        var ne = r(F, w);
        return ne.return = j, ne;
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
      typeof oe == "object" && oe !== null && oe.$$typeof === ye && ug(oe) === F.type)) {
        var ne = r(F, w.props);
        return ne.ref = hu(j, F, w), ne.return = j, ne._debugSource = w._source, ne._debugOwner = w._owner, ne;
      }
      var Ee = hv(w, j.mode, q);
      return Ee.ref = hu(j, F, w), Ee.return = j, Ee;
    }
    function p(j, F, w, q) {
      if (F === null || F.tag !== M || F.stateNode.containerInfo !== w.containerInfo || F.stateNode.implementation !== w.implementation) {
        var oe = gv(w, j.mode, q);
        return oe.return = j, oe;
      } else {
        var ne = r(F, w.children || []);
        return ne.return = j, ne;
      }
    }
    function v(j, F, w, q, oe) {
      if (F === null || F.tag !== se) {
        var ne = li(w, j.mode, q, oe);
        return ne.return = j, ne;
      } else {
        var Ee = r(F, w);
        return Ee.return = j, Ee;
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
            var ne = gv(F, j.mode, w);
            return ne.return = j, ne;
          }
          case ye: {
            var Ee = F._payload, De = F._init;
            return x(j, De(Ee), w);
          }
        }
        if (Ue(F) || ba(F)) {
          var at = li(F, j.mode, w, null);
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
          case ye: {
            var ne = w._payload, Ee = w._init;
            return E(j, F, Ee(ne), q);
          }
        }
        if (Ue(w) || ba(w))
          return oe !== null ? null : v(j, F, w, q, null);
        cc(j, w);
      }
      return typeof w == "function" && fc(j), null;
    }
    function _(j, F, w, q, oe) {
      if (typeof q == "string" && q !== "" || typeof q == "number") {
        var ne = j.get(w) || null;
        return o(F, ne, "" + q, oe);
      }
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case na: {
            var Ee = j.get(q.key === null ? w : q.key) || null;
            return u(F, Ee, q, oe);
          }
          case $n: {
            var De = j.get(q.key === null ? w : q.key) || null;
            return p(F, De, q, oe);
          }
          case ye:
            var at = q._payload, Ie = q._init;
            return _(j, F, w, Ie(at), oe);
        }
        if (Ue(q) || ba(q)) {
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
          case ye:
            var oe = j._payload, ne = j._init;
            V(ne(oe), F, w);
            break;
        }
      }
      return F;
    }
    function U(j, F, w, q) {
      for (var oe = null, ne = 0; ne < w.length; ne++) {
        var Ee = w[ne];
        oe = V(Ee, oe, j);
      }
      for (var De = null, at = null, Ie = F, St = 0, qe = 0, xt = null; Ie !== null && qe < w.length; qe++) {
        Ie.index > qe ? (xt = Ie, Ie = null) : xt = Ie.sibling;
        var yn = E(j, Ie, w[qe], q);
        if (yn === null) {
          Ie === null && (Ie = xt);
          break;
        }
        e && Ie && yn.alternate === null && t(j, Ie), St = i(yn, St, qe), at === null ? De = yn : at.sibling = yn, at = yn, Ie = xt;
      }
      if (qe === w.length) {
        if (n(j, Ie), tn()) {
          var sn = qe;
          Ai(j, sn);
        }
        return De;
      }
      if (Ie === null) {
        for (; qe < w.length; qe++) {
          var Xn = x(j, w[qe], q);
          Xn !== null && (St = i(Xn, St, qe), at === null ? De = Xn : at.sibling = Xn, at = Xn);
        }
        if (tn()) {
          var _n = qe;
          Ai(j, _n);
        }
        return De;
      }
      for (var On = a(j, Ie); qe < w.length; qe++) {
        var gn = _(On, j, qe, w[qe], q);
        gn !== null && (e && gn.alternate !== null && On.delete(gn.key === null ? qe : gn.key), St = i(gn, St, qe), at === null ? De = gn : at.sibling = gn, at = gn);
      }
      if (e && On.forEach(function(Jl) {
        return t(j, Jl);
      }), tn()) {
        var jr = qe;
        Ai(j, jr);
      }
      return De;
    }
    function te(j, F, w, q) {
      var oe = ba(w);
      if (typeof oe != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === oe && (gp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gp = !0);
        var ne = oe.call(w);
        if (ne)
          for (var Ee = null, De = ne.next(); !De.done; De = ne.next()) {
            var at = De.value;
            Ee = V(at, Ee, j);
          }
      }
      var Ie = oe.call(w);
      if (Ie == null)
        throw new Error("An iterable object provided no iterator.");
      for (var St = null, qe = null, xt = F, yn = 0, sn = 0, Xn = null, _n = Ie.next(); xt !== null && !_n.done; sn++, _n = Ie.next()) {
        xt.index > sn ? (Xn = xt, xt = null) : Xn = xt.sibling;
        var On = E(j, xt, _n.value, q);
        if (On === null) {
          xt === null && (xt = Xn);
          break;
        }
        e && xt && On.alternate === null && t(j, xt), yn = i(On, yn, sn), qe === null ? St = On : qe.sibling = On, qe = On, xt = Xn;
      }
      if (_n.done) {
        if (n(j, xt), tn()) {
          var gn = sn;
          Ai(j, gn);
        }
        return St;
      }
      if (xt === null) {
        for (; !_n.done; sn++, _n = Ie.next()) {
          var jr = x(j, _n.value, q);
          jr !== null && (yn = i(jr, yn, sn), qe === null ? St = jr : qe.sibling = jr, qe = jr);
        }
        if (tn()) {
          var Jl = sn;
          Ai(j, Jl);
        }
        return St;
      }
      for (var Wu = a(j, xt); !_n.done; sn++, _n = Ie.next()) {
        var Za = _(Wu, j, sn, _n.value, q);
        Za !== null && (e && Za.alternate !== null && Wu.delete(Za.key === null ? sn : Za.key), yn = i(Za, yn, sn), qe === null ? St = Za : qe.sibling = Za, qe = Za);
      }
      if (e && Wu.forEach(function(Mw) {
        return t(j, Mw);
      }), tn()) {
        var Vw = sn;
        Ai(j, Vw);
      }
      return St;
    }
    function he(j, F, w, q) {
      if (F !== null && F.tag === z) {
        n(j, F.sibling);
        var oe = r(F, w);
        return oe.return = j, oe;
      }
      n(j, F);
      var ne = yv(w, j.mode, q);
      return ne.return = j, ne;
    }
    function de(j, F, w, q) {
      for (var oe = w.key, ne = F; ne !== null; ) {
        if (ne.key === oe) {
          var Ee = w.type;
          if (Ee === Fa) {
            if (ne.tag === se) {
              n(j, ne.sibling);
              var De = r(ne, w.props.children);
              return De.return = j, De._debugSource = w._source, De._debugOwner = w._owner, De;
            }
          } else if (ne.elementType === Ee || // Keep this check inline so it only runs on the false path:
          mN(ne, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Ee == "object" && Ee !== null && Ee.$$typeof === ye && ug(Ee) === ne.type) {
            n(j, ne.sibling);
            var at = r(ne, w.props);
            return at.ref = hu(j, ne, w), at.return = j, at._debugSource = w._source, at._debugOwner = w._owner, at;
          }
          n(j, ne);
          break;
        } else
          t(j, ne);
        ne = ne.sibling;
      }
      if (w.type === Fa) {
        var Ie = li(w.props.children, j.mode, q, w.key);
        return Ie.return = j, Ie;
      } else {
        var St = hv(w, j.mode, q);
        return St.ref = hu(j, F, w), St.return = j, St;
      }
    }
    function Ye(j, F, w, q) {
      for (var oe = w.key, ne = F; ne !== null; ) {
        if (ne.key === oe)
          if (ne.tag === M && ne.stateNode.containerInfo === w.containerInfo && ne.stateNode.implementation === w.implementation) {
            n(j, ne.sibling);
            var Ee = r(ne, w.children || []);
            return Ee.return = j, Ee;
          } else {
            n(j, ne);
            break;
          }
        else
          t(j, ne);
        ne = ne.sibling;
      }
      var De = gv(w, j.mode, q);
      return De.return = j, De;
    }
    function Fe(j, F, w, q) {
      var oe = typeof w == "object" && w !== null && w.type === Fa && w.key === null;
      if (oe && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case na:
            return l(de(j, F, w, q));
          case $n:
            return l(Ye(j, F, w, q));
          case ye:
            var ne = w._payload, Ee = w._init;
            return Fe(j, F, Ee(ne), q);
        }
        if (Ue(w))
          return U(j, F, w, q);
        if (ba(w))
          return te(j, F, w, q);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(he(j, F, "" + w, q)) : (typeof w == "function" && fc(j), n(j, F));
    }
    return Fe;
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
  var Sp = qr(null), Rp;
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
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = _e(r.childLanes, t)) : (a.childLanes = _e(a.childLanes, t), r !== null && (r.childLanes = _e(r.childLanes, t))), a === n)
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
              var o = Mo(n), u = xr(ut, o);
              u.tag = hc;
              var p = a.updateQueue;
              if (p !== null) {
                var v = p.shared, x = v.pending;
                x === null ? u.next = u : (u.next = x.next, x.next = u), v.pending = u;
              }
            }
            a.lanes = _e(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = _e(E.lanes, n)), Tp(a.return, n, e), i.lanes = _e(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === P)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Ae) {
        var _ = a.return;
        if (_ === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        _.lanes = _e(_.lanes, n);
        var V = _.alternate;
        V !== null && (V.lanes = _e(V.lanes, n)), Tp(_, n, e), r = a.sibling;
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
  function Un(e, t) {
    return vc(e, t);
  }
  var hD = vc;
  function vc(e, t) {
    e.lanes = _e(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = _e(n.lanes, t)), n === null && (e.flags & (Dt | dr)) !== Ne && cN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = _e(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = _e(n.childLanes, t) : (r.flags & (Dt | dr)) !== Ne && cN(e), a = r, r = r.return;
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
  function xr(e, t) {
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
        var l = _e(i, n);
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
        return p == null ? a : ke({}, a, p);
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
      var _ = r.baseState, V = $, U = null, te = null, he = null, de = i;
      do {
        var Ye = de.lane, Fe = de.eventTime;
        if (bl(a, Ye)) {
          if (he !== null) {
            var F = {
              eventTime: Fe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              tag: de.tag,
              payload: de.payload,
              callback: de.callback,
              next: null
            };
            he = he.next = F;
          }
          _ = yD(e, r, de, _, t, n);
          var w = de.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          de.lane !== Gt) {
            e.flags |= fh;
            var q = r.effects;
            q === null ? r.effects = [de] : q.push(de);
          }
        } else {
          var j = {
            eventTime: Fe,
            lane: Ye,
            tag: de.tag,
            payload: de.payload,
            callback: de.callback,
            next: null
          };
          he === null ? (te = he = j, U = _) : he = he.next = j, V = _e(V, Ye);
        }
        if (de = de.next, de === null) {
          if (o = r.shared.pending, o === null)
            break;
          var oe = o, ne = oe.next;
          oe.next = null, de = ne, r.lastBaseUpdate = oe, r.shared.pending = null;
        }
      } while (!0);
      he === null && (U = _), r.baseState = U, r.firstBaseUpdate = te, r.lastBaseUpdate = he;
      var Ee = r.shared.interleaved;
      if (Ee !== null) {
        var De = Ee;
        do
          V = _e(V, De.lane), De = De.next;
        while (De !== Ee);
      } else i === null && (r.shared.lanes = $);
      $u(V), e.lanes = V, e.memoizedState = _;
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
  var yu = {}, Xr = qr(yu), gu = qr(yu), xc = qr(yu);
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
    vn(xc, t, e), vn(gu, e, e), vn(Xr, yu, e);
    var n = AC(t);
    mn(Xr, e), vn(Xr, n, e);
  }
  function Ul(e) {
    mn(Xr, e), mn(gu, e), mn(xc, e);
  }
  function Mp() {
    var e = Sc(Xr.current);
    return e;
  }
  function Eg(e) {
    Sc(xc.current);
    var t = Sc(Xr.current), n = kC(t, e.type);
    t !== n && (vn(gu, e, e), vn(Xr, n, e));
  }
  function Ap(e) {
    gu.current === e && (mn(Xr, e), mn(gu, e));
  }
  var bD = 0, xg = 1, Sg = 1, bu = 2, Da = qr(bD);
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
  function Jr(e, t) {
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
      if (t.tag === J) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Hy(a) || tp(a))
            return t;
        }
      } else if (t.tag === Oe && // revealOrder undefined can't be trusted because it don't
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
  var ie = h.ReactCurrentDispatcher, Nu = h.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = $, nt = null, Mt = null, At = null, Cc = !1, Eu = !1, xu = 0, SD = 0, RD = 25, B = null, oa = null, Zr = -1, Bp = !1;
  function Ke() {
    {
      var e = B;
      oa === null ? oa = [e] : oa.push(e);
    }
  }
  function X() {
    {
      var e = B;
      oa !== null && (Zr++, oa[Zr] !== e && CD(e));
    }
  }
  function Bl(e) {
    e != null && !Ue(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", B, typeof e);
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
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", B), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, B, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Wn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, nt = t, oa = e !== null ? e._debugHookTypes : null, Zr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? ie.current = Ig : oa !== null ? ie.current = Yg : ie.current = $g;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, xu = 0, o >= RD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, Mt = null, At = null, t.updateQueue = null, Zr = -1, ie.current = qg, l = n(a, r);
      } while (Eu);
    }
    ie.current = Fc, t._debugHookTypes = oa;
    var u = Mt !== null && Mt.next !== null;
    if (Bi = $, nt = null, Mt = null, At = null, B = null, oa = null, Zr = -1, e !== null && (e.flags & pr) !== (t.flags & pr) && // Disable this warning in legacy mode, because legacy Suspense is weird
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
  function Rg(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Pa) !== ge ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Cg() {
    if (ie.current = Fc, Cc) {
      for (var e = nt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = $, nt = null, Mt = null, At = null, oa = null, Zr = -1, B = null, Fg = !1, Eu = !1, xu = 0;
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
      var v = l.next, x = i.baseState, E = null, _ = null, V = null, U = v;
      do {
        var te = U.lane;
        if (bl(Bi, te)) {
          if (V !== null) {
            var de = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
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
            lane: te,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          V === null ? (_ = V = he, E = x) : V = V.next = he, nt.lanes = _e(nt.lanes, te), $u(te);
        }
        U = U.next;
      } while (U !== null && U !== v);
      V === null ? E = x : V.next = _, Wn(x, a.memoizedState) || Ou(), a.memoizedState = x, a.baseState = E, a.baseQueue = V, r.lastRenderedState = x;
    }
    var Fe = r.interleaved;
    if (Fe !== null) {
      var j = Fe;
      do {
        var F = j.lane;
        nt.lanes = _e(nt.lanes, F), $u(F), j = j.next;
      } while (j !== Fe);
    } else l === null && (r.lanes = $);
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
  function x_(e, t, n) {
  }
  function S_(e, t, n) {
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
    return r.queue = p, _c(wg.bind(null, a, p, e), [e]), a.flags |= Ur, Su(Lt | nn, jg.bind(null, a, p, i, t), void 0, null), i;
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
      a.flags |= Ur, Su(Lt | nn, jg.bind(null, a, p, i, t), void 0, null);
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
    var t = Un(e, Se);
    t !== null && zt(t, e, Se, ut);
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
    return (nt.mode & Pa) !== ge ? Ru(Gf | Ur | qf, nn, e, t) : Ru(Ur | qf, nn, e, t);
  }
  function Cu(e, t) {
    return wc(Ur, nn, e, t);
  }
  function Xp(e, t) {
    return Ru(We, qa, e, t);
  }
  function Oc(e, t) {
    return wc(We, qa, e, t);
  }
  function Jp(e, t) {
    var n = We;
    return n |= Ri, (nt.mode & Pa) !== ge && (n |= Fr), Ru(n, Vt, e, t);
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
    return r |= Ri, (nt.mode & Pa) !== ge && (r |= Fr), Ru(r, Vt, Lg.bind(null, t, e), a);
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
        nt.lanes = _e(nt.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function TD(e, t, n) {
    var a = xa();
    Wt(NS(a, vr)), e(!0);
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
    var a = ri(e), r = {
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
    var a = ri(e), r = {
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
      if (e.lanes === $ && (i === null || i.lanes === $)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = ie.current, ie.current = Ta;
          try {
            var u = t.lastRenderedState, p = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = p, Wn(p, u)) {
              mD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ie.current = o;
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
      var r = _e(a, n);
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
    }, Re = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    $g = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Ke(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Ke(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Ke(), Bl(t), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Ke(), Bl(n), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Ke(), Bl(t), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Ke(), Bl(t), Jp(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Ke(), Bl(t);
        var n = ie.current;
        ie.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Ke();
        var a = ie.current;
        ie.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Ke(), Kp(e);
      },
      useState: function(e) {
        B = "useState", Ke();
        var t = ie.current;
        ie.current = Wa;
        try {
          return Tc(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Ke(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Ke(), nm(e);
      },
      useTransition: function() {
        return B = "useTransition", Ke(), am();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Ke(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Ke(), Gp(e, t, n);
      },
      useId: function() {
        return B = "useId", Ke(), rm();
      },
      unstable_isNewReconciler: jt
    }, Yg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", X(), em(e, t);
      },
      useContext: function(e) {
        return B = "useContext", X(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", X(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", X(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", X(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", X(), Jp(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", X();
        var n = ie.current;
        ie.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", X();
        var a = ie.current;
        ie.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", X(), Kp(e);
      },
      useState: function(e) {
        B = "useState", X();
        var t = ie.current;
        ie.current = Wa;
        try {
          return Tc(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", X(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", X(), nm(e);
      },
      useTransition: function() {
        return B = "useTransition", X(), am();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", X(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", X(), Gp(e, t, n);
      },
      useId: function() {
        return B = "useId", X(), rm();
      },
      unstable_isNewReconciler: jt
    }, Ig = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", X(), Ac(e, t);
      },
      useContext: function(e) {
        return B = "useContext", X(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", X(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", X(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", X(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", X(), Lc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", X();
        var n = ie.current;
        ie.current = Ta;
        try {
          return kc(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", X();
        var a = ie.current;
        ie.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", X(), jc();
      },
      useState: function(e) {
        B = "useState", X();
        var t = ie.current;
        ie.current = Ta;
        try {
          return Wp(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", X(), Mc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", X(), Vg(e);
      },
      useTransition: function() {
        return B = "useTransition", X(), kg();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", X(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", X(), Dc(e, t);
      },
      useId: function() {
        return B = "useId", X(), Uc();
      },
      unstable_isNewReconciler: jt
    }, qg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", X(), Ac(e, t);
      },
      useContext: function(e) {
        return B = "useContext", X(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", X(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", X(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", X(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", X(), Lc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", X();
        var n = ie.current;
        ie.current = zc;
        try {
          return kc(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", X();
        var a = ie.current;
        ie.current = zc;
        try {
          return qp(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", X(), jc();
      },
      useState: function(e) {
        B = "useState", X();
        var t = ie.current;
        ie.current = zc;
        try {
          return Qp(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", X(), Mc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", X(), Mg(e);
      },
      useTransition: function() {
        return B = "useTransition", X(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", X(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", X(), Dc(e, t);
      },
      useId: function() {
        return B = "useId", X(), Uc();
      },
      unstable_isNewReconciler: jt
    }, Wa = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Re(), Ke(), em(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Re(), Ke(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Re(), Ke(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Re(), Ke(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Re(), Ke(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Re(), Ke(), Jp(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Re(), Ke();
        var n = ie.current;
        ie.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Re(), Ke();
        var a = ie.current;
        ie.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Re(), Ke(), Kp(e);
      },
      useState: function(e) {
        B = "useState", Re(), Ke();
        var t = ie.current;
        ie.current = Wa;
        try {
          return Tc(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Re(), Ke(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Re(), Ke(), nm(e);
      },
      useTransition: function() {
        return B = "useTransition", Re(), Ke(), am();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Re(), Ke(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Re(), Ke(), Gp(e, t, n);
      },
      useId: function() {
        return B = "useId", Re(), Ke(), rm();
      },
      unstable_isNewReconciler: jt
    }, Ta = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Re(), X(), Ac(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Re(), X(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Re(), X(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Re(), X(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Re(), X(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Re(), X(), Lc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Re(), X();
        var n = ie.current;
        ie.current = Ta;
        try {
          return kc(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Re(), X();
        var a = ie.current;
        ie.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Re(), X(), jc();
      },
      useState: function(e) {
        B = "useState", Re(), X();
        var t = ie.current;
        ie.current = Ta;
        try {
          return Wp(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Re(), X(), Mc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Re(), X(), Vg(e);
      },
      useTransition: function() {
        return B = "useTransition", Re(), X(), kg();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Re(), X(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Re(), X(), Dc(e, t);
      },
      useId: function() {
        return B = "useId", Re(), X(), Uc();
      },
      unstable_isNewReconciler: jt
    }, zc = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Re(), X(), Ac(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Re(), X(), Tt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Re(), X(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Re(), X(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Re(), X(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Re(), X(), Lc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Re(), X();
        var n = ie.current;
        ie.current = Ta;
        try {
          return kc(e, t);
        } finally {
          ie.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Re(), X();
        var a = ie.current;
        ie.current = Ta;
        try {
          return qp(e, t, n);
        } finally {
          ie.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Re(), X(), jc();
      },
      useState: function(e) {
        B = "useState", Re(), X();
        var t = ie.current;
        ie.current = Ta;
        try {
          return Qp(e);
        } finally {
          ie.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Re(), X(), Mc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Re(), X(), Mg(e);
      },
      useTransition: function() {
        return B = "useTransition", Re(), X(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Re(), X(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Re(), X(), Dc(e, t);
      },
      useId: function() {
        return B = "useId", Re(), X(), Uc();
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
          case S:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case ae:
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
          case S:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case ae:
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
      var n = ke({}, t), a = e.defaultProps;
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
    var l = i == null ? r : ke({}, r, i);
    if (e.memoizedState = l, e.lanes === $) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: Rx,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = wn(), i = ri(a), l = xr(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Kr(a, l, i);
      o !== null && (zt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = wn(), i = ri(a), l = xr(r, i);
      l.tag = hg, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Kr(a, l, i);
      o !== null && (zt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = wn(), r = ri(n), i = xr(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Kr(n, i, r);
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
      (e.mode & Et) === ge && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === ge && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !gm.has(t) && (gm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ge(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ge(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || Ue(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
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
        l === null || l !== void 0 && l.$$typeof === ee && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === I ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ge(t) || "Component", u);
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
        var E = Ge(t) || "Component";
        pm.has(E) || (pm.add(E), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, v.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var _ = null, V = null, U = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? _ = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (_ = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? U = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (U = "UNSAFE_componentWillUpdate"), _ !== null || V !== null || U !== null) {
          var te = Ge(t) || "Component", he = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vm.has(te) || (vm.add(te), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, te, he, _ !== null ? `
  ` + _ : "", V !== null ? `
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
        var o = Ge(t) || "Component";
        ym.has(o) || (ym.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & Et && Ca.recordLegacyContextWarning(e, r), Ca.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Nm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (AD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var p = We;
      p |= Ri, (e.mode & Pa) !== ge && (p |= Fr), e.flags |= p;
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
    var E = e.memoizedState, _ = r.state = E;
    if (Nc(e, n, r, a), _ = e.memoizedState, i === n && E === _ && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var V = We;
        V |= Ri, (e.mode & Pa) !== ge && (V |= Fr), e.flags |= V;
      }
      return !1;
    }
    typeof v == "function" && (Nm(e, t, v, n), _ = e.memoizedState);
    var U = Ec() || eb(e, t, i, n, E, _, u);
    if (U) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var te = We;
        te |= Ri, (e.mode & Pa) !== ge && (te |= Fr), e.flags |= te;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var he = We;
        he |= Ri, (e.mode & Pa) !== ge && (he |= Fr), e.flags |= he;
      }
      e.memoizedProps = n, e.memoizedState = _;
    }
    return r.props = n, r.state = _, r.context = u, U;
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
    var _ = n.getDerivedStateFromProps, V = typeof _ == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || p !== x) && ab(t, i, a, x), gg();
    var U = t.memoizedState, te = i.state = U;
    if (Nc(t, a, i, r), te = t.memoizedState, l === u && U === te && !tc() && !Ec() && !da)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= We), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), !1;
    typeof _ == "function" && (Nm(t, n, _, a), te = t.memoizedState);
    var he = Ec() || eb(t, n, o, a, U, te, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    da;
    return he ? (!V && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, te, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, te, x)), typeof i.componentDidUpdate == "function" && (t.flags |= We), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= We), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = te), i.props = a, i.state = te, i.context = x, he;
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
        if (e.tag === D)
          return;
        console.error(a);
      }
      var o = r ? Te(r) : null, u = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", p;
      if (e.tag === S)
        p = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Te(e) || "Anonymous";
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
    var a = xr(ut, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Oj(r), Rm(e, t);
    }, a;
  }
  function Cm(e, t, n) {
    var a = xr(ut, n);
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
      }), typeof r != "function" && (In(e.lanes, Se) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Te(e) || "Unknown"));
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
    if ((e.mode & Pe) === ge && (n === C || n === G || n === Y)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function lb(e) {
    var t = e;
    do {
      if (t.tag === J && ED(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ob(e, t, n, a, r) {
    if ((e.mode & Pe) === ge) {
      if (e === t)
        e.flags |= Dn;
      else {
        if (e.flags |= Qe, n.flags |= Yf, n.flags &= -52805, n.tag === D) {
          var i = n.alternate;
          if (i === null)
            n.tag = K;
          else {
            var l = xr(ut, Se);
            l.tag = hc, Kr(n, l, Se);
          }
        }
        n.lanes = _e(n.lanes, Se);
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
        l.flags &= ~fr, ob(l, t, n, e, r), l.mode & Pe && ib(e, i, r), HD(l, e, i);
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
        (u.flags & Dn) === Ne && (u.flags |= fr), ob(u, t, n, e, r), yp(Pi(a, n));
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
          p.lanes = _e(p.lanes, x);
          var E = rb(p, v, x);
          Lp(p, E);
          return;
        }
        case D:
          var _ = a, V = p.type, U = p.stateNode;
          if ((p.flags & Qe) === Ne && (typeof V.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && !lN(U))) {
            p.flags |= Dn;
            var te = Mo(r);
            p.lanes = _e(p.lanes, te);
            var he = Cm(p, _, te);
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
        Ge(n)
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
    return vl(), e !== null && !wa ? (Rg(e, t, r), Sr(e, t, r)) : (tn() && p && fp(t), t.flags |= fl, Tn(e, t, u, r), t.child);
  }
  function sb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (Qj(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = Y, t.type = l, Vm(t, i), cb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && Sa(
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
      var v = n.type, x = v.propTypes;
      x && Sa(
        x,
        a,
        // Resolved props
        "prop",
        Ge(v)
      );
    }
    var E = e.child, _ = zm(e, r);
    if (!_) {
      var V = E.memoizedProps, U = n.compare;
      if (U = U !== null ? U : Qo, U(V, a) && e.ref === t.ref)
        return Sr(e, t, r);
    }
    t.flags |= fl;
    var te = Wi(E, a);
    return te.ref = t.ref, te.return = t, t.child = te, te;
  }
  function cb(e, t, n, a, r) {
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
        p && Sa(
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
        if (wa = !1, t.pendingProps = a = v, zm(e, r))
          (e.flags & Yf) !== Ne && (wa = !0);
        else return t.lanes = e.lanes, Sr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function fb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Bn)
      if ((t.mode & Pe) === ge) {
        var l = {
          baseLanes: $,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (In(n, Yn)) {
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
          u = _e(p, n);
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
      var _;
      i !== null ? (_ = _e(i.baseLanes, n), t.memoizedState = null) : _ = n, rf(t, _);
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
        Ge(n)
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
    return vl(), e !== null && !wa ? (Rg(e, t, r), Sr(e, t, r)) : (tn() && p && fp(t), t.flags |= fl, Tn(e, t, u, r), t.child);
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
          t.lanes = _e(t.lanes, v);
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
          Ge(n)
        );
      }
    }
    var _;
    Ia(n) ? (_ = !0, ac(t)) : _ = !1, kl(t, r);
    var V = t.stateNode, U;
    V === null ? (Gc(e, t), nb(t, n, a), xm(t, n, a, r), U = !0) : e === null ? U = kD(t, n, a, r) : U = UD(e, t, n, a, r);
    var te = Lm(e, t, n, U, _, r);
    {
      var he = t.stateNode;
      U && he.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Te(t) || "a component"), $i = !0);
    }
    return te;
  }
  function Lm(e, t, n, a, r, i) {
    db(e, t);
    var l = (t.flags & Qe) !== Ne;
    if (!a && !l)
      return r && Wy(t, n, !1), Sr(e, t, i);
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
        var x = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return vb(e, t, o, n, x);
      } else {
        X0(t);
        var E = cg(t, null, o, n);
        t.child = E;
        for (var _ = E; _; )
          _.flags = _.flags & ~Dt | dr, _ = _.sibling;
      }
    } else {
      if (Vl(), o === i)
        return Sr(e, t, n);
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
    var p = t.tag = Kj(u), v = ja(u, r), x;
    switch (p) {
      case C:
        return Vm(t, u), t.type = u = Xl(u), x = Om(null, t, u, v, a), x;
      case D:
        return t.type = u = sv(u), x = pb(null, t, u, v, a), x;
      case G:
        return t.type = u = cv(u), x = ub(null, t, u, v, a), x;
      case ue: {
        if (t.type !== t.elementType) {
          var E = u.propTypes;
          E && Sa(
            E,
            v,
            // Resolved for outer only
            "prop",
            Ge(u)
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
    var _ = "";
    throw u !== null && typeof u == "object" && u.$$typeof === ye && (_ = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + _));
  }
  function JD(e, t, n, a, r) {
    Gc(e, t), t.tag = D;
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
        var x = Ge(n) || "Unknown";
        wu[x] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), wu[x] = !0);
      }
      t.tag = D, t.memoizedState = null, t.updateQueue = null;
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
      baseLanes: _e(e.baseLanes, t),
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
    fw(t) && (t.flags |= Qe);
    var r = Da.current, i = !1, l = (t.flags & Qe) !== Ne;
    if (l || tT(r, e) ? (i = !0, t.flags &= ~Qe) : (e === null || e.memoizedState !== null) && (r = ND(r, Sg)), r = Fl(r), Jr(t, r), e === null) {
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
      var _ = e.memoizedState;
      if (_ !== null) {
        var V = _.dehydrated;
        if (V !== null)
          return uT(e, t, l, a, V, _, n);
      }
      if (i) {
        var U = a.fallback, te = a.children, he = iT(e, t, te, U, n), de = t.child, Ye = e.child.memoizedState;
        return de.memoizedState = Ye === null ? Am(n) : eT(Ye, n), de.childLanes = nT(e, n), t.memoizedState = Mm, he;
      } else {
        var Fe = a.children, j = rT(e, t, Fe, n);
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
    return (r & Pe) === ge && i !== null ? (o = i, o.childLanes = $, o.pendingProps = l, e.mode & tt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = li(n, r, a, null)) : (o = Um(l, r), u = li(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function Um(e, t, n) {
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
    if ((t.mode & Pe) === ge && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
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
      p = yb(l, u), p.subtreeFlags = l.subtreeFlags & pr;
    var x;
    return o !== null ? x = Wi(o, a) : (x = li(a, i, r, null), x.flags |= Dt), x.return = t, p.return = t, p.sibling = x, t.child = p, x;
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
    }, o = Um(l, i), u = li(a, i, r, null);
    return u.flags |= Dt, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & Pe) !== ge && Ml(t, e.child, null, r), u;
  }
  function oT(e, t, n) {
    return (e.mode & Pe) === ge ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Se) : tp(t) ? e.lanes = Ti : e.lanes = Yn, null;
  }
  function uT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & fr) {
        t.flags &= ~fr;
        var j = Sm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Qe, null;
        var F = a.children, w = a.fallback, q = lT(e, t, F, w, l), oe = t.child;
        return oe.memoizedState = Am(l), t.memoizedState = Mm, q;
      }
    else {
      if (Q0(), (t.mode & Pe) === ge)
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
      var _ = In(l, e.childLanes);
      if (wa || _) {
        var V = af();
        if (V !== null) {
          var U = gS(V, l);
          if (U !== Gt && U !== i.retryLane) {
            i.retryLane = U;
            var te = ut;
            Un(e, U), zt(V, e, U, te);
          }
        }
        rv();
        var he = Sm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, he);
      } else if (Hy(r)) {
        t.flags |= Qe, t.child = e.child;
        var de = Vj.bind(null, e);
        return p0(r, de), null;
      } else {
        J0(t, r, i.treeContext);
        var Ye = a.children, Fe = km(t, Ye);
        return Fe.flags |= dr, Fe;
      }
    }
  }
  function gb(e, t, n) {
    e.lanes = _e(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = _e(a.lanes, t)), Tp(e.return, t, n);
  }
  function sT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === J) {
        var r = a.memoizedState;
        r !== null && gb(a, n, e);
      } else if (a.tag === Oe)
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
      o = Up(o, bu), t.flags |= Qe;
    else {
      var p = e !== null && (e.flags & Qe) !== Ne;
      p && sT(t, t.child, n), o = Fl(o);
    }
    if (Jr(t, o), (t.mode & Pe) === ge)
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
          var E = null, _ = t.child;
          for (t.child = null; _ !== null; ) {
            var V = _.alternate;
            if (V !== null && Rc(V) === null) {
              t.child = _;
              break;
            }
            var U = _.sibling;
            _.sibling = E, E = _, _ = U;
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
          return Sr(e, t, n);
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
    (t.mode & Pe) === ge && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Dt);
  }
  function Sr(e, t, n) {
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
      case H:
        Eg(t);
        break;
      case D: {
        var a = t.type;
        Ia(a) && ac(t);
        break;
      }
      case M:
        Vp(t, t.stateNode.containerInfo);
        break;
      case P: {
        var r = t.memoizedProps.value, i = t.type._context;
        pg(t, i, r);
        break;
      }
      case ae:
        {
          var l = In(n, t.childLanes);
          l && (t.flags |= We);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case J: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Jr(t, Fl(Da.current)), t.flags |= Qe, null;
          var p = t.child, v = p.childLanes;
          if (In(n, v))
            return hb(e, t, n);
          Jr(t, Fl(Da.current));
          var x = Sr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Jr(t, Fl(Da.current));
        break;
      }
      case Oe: {
        var E = (e.flags & Qe) !== Ne, _ = In(n, t.childLanes);
        if (E) {
          if (_)
            return Nb(e, t, n);
          t.flags |= Qe;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Jr(t, Da.current), _)
          break;
        return null;
      }
      case me:
      case Ve:
        return t.lanes = $, fb(e, t, n);
    }
    return Sr(e, t, n);
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
        (t.flags & Qe) === Ne)
          return wa = !1, gT(e, t, n);
        (e.flags & Yf) !== Ne ? wa = !0 : wa = !1;
      }
    } else if (wa = !1, tn() && $0(t)) {
      var l = t.index, o = Y0();
      Xy(t, o, l);
    }
    switch (t.lanes = $, t.tag) {
      case O:
        return ZD(e, t, t.type, n);
      case ze: {
        var u = t.elementType;
        return XD(e, t, u, n);
      }
      case C: {
        var p = t.type, v = t.pendingProps, x = t.elementType === p ? v : ja(p, v);
        return Om(e, t, p, x, n);
      }
      case D: {
        var E = t.type, _ = t.pendingProps, V = t.elementType === E ? _ : ja(E, _);
        return pb(e, t, E, V, n);
      }
      case S:
        return WD(e, t, n);
      case H:
        return QD(e, t, n);
      case z:
        return KD(e, t);
      case J:
        return hb(e, t, n);
      case M:
        return mT(e, t, n);
      case G: {
        var U = t.type, te = t.pendingProps, he = t.elementType === U ? te : ja(U, te);
        return ub(e, t, U, he, n);
      }
      case se:
        return ID(e, t, n);
      case Q:
        return qD(e, t, n);
      case ae:
        return GD(e, t, n);
      case P:
        return vT(e, t, n);
      case le:
        return hT(e, t, n);
      case ue: {
        var de = t.type, Ye = t.pendingProps, Fe = ja(de, Ye);
        if (t.type !== t.elementType) {
          var j = de.propTypes;
          j && Sa(
            j,
            Fe,
            // Resolved for outer only
            "prop",
            Ge(de)
          );
        }
        return Fe = ja(de.type, Fe), sb(e, t, de, Fe, n);
      }
      case Y:
        return cb(e, t, t.type, t.pendingProps, n);
      case K: {
        var F = t.type, w = t.pendingProps, q = t.elementType === F ? w : ja(F, w);
        return JD(e, t, F, q, n);
      }
      case Oe:
        return Nb(e, t, n);
      case Le:
        break;
      case me:
        return fb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Yl(e) {
    e.flags |= We;
  }
  function Rb(e) {
    e.flags |= xi, e.flags |= If;
  }
  var Cb, Hm, Db, Tb;
  Cb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === H || r.tag === z)
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = $, a = Ne;
    if (t) {
      if ((e.mode & tt) !== ge) {
        for (var u = e.selfBaseDuration, p = e.child; p !== null; )
          n = _e(n, _e(p.lanes, p.childLanes)), a |= p.subtreeFlags & pr, a |= p.flags & pr, u += p.treeBaseDuration, p = p.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = _e(n, _e(v.lanes, v.childLanes)), a |= v.subtreeFlags & pr, a |= v.flags & pr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & tt) !== ge) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = _e(n, _e(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = _e(n, _e(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function bT(e, t, n) {
    if (aD() && (t.mode & Pe) !== ge && (t.flags & Qe) === Ne)
      return rg(t), Vl(), t.flags |= fr | bs | Dn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (tD(t), an(t), (t.mode & tt) !== ge) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Qe) === Ne && (t.memoizedState = null), t.flags |= We, an(t), (t.mode & tt) !== ge) {
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
      case O:
      case ze:
      case Y:
      case C:
      case G:
      case se:
      case Q:
      case ae:
      case le:
      case ue:
        return an(t), null;
      case D: {
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
            (t.flags & fr) !== Ne) && (t.flags |= dl, ig());
          }
        }
        return Hm(e, t), an(t), null;
      }
      case H: {
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
      case z: {
        var _ = a;
        if (e && t.stateNode != null) {
          var V = e.memoizedProps;
          Tb(e, t, V, _);
        } else {
          if (typeof _ != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var U = Ng(), te = Mp(), he = uc(t);
          he ? eD(t) && Yl(t) : t.stateNode = $C(_, U, te, t);
        }
        return an(t), null;
      }
      case J: {
        zl(t);
        var de = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ye = bT(e, t, de);
          if (!Ye)
            return t.flags & Dn ? t : null;
        }
        if ((t.flags & Qe) !== Ne)
          return t.lanes = n, (t.mode & tt) !== ge && cm(t), t;
        var Fe = de !== null, j = e !== null && e.memoizedState !== null;
        if (Fe !== j && Fe) {
          var F = t.child;
          if (F.flags |= Si, (t.mode & Pe) !== ge) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(Da.current, Sg) ? Nj() : rv();
          }
        }
        var q = t.updateQueue;
        if (q !== null && (t.flags |= We), an(t), (t.mode & tt) !== ge && Fe) {
          var oe = t.child;
          oe !== null && (t.treeBaseDuration -= oe.treeBaseDuration);
        }
        return null;
      }
      case M:
        return Ul(t), Hm(e, t), e === null && k0(t.stateNode.containerInfo), an(t), null;
      case P:
        var ne = t.type._context;
        return Dp(ne, t), an(t), null;
      case K: {
        var Ee = t.type;
        return Ia(Ee) && nc(t), an(t), null;
      }
      case Oe: {
        zl(t);
        var De = t.memoizedState;
        if (De === null)
          return an(t), null;
        var at = (t.flags & Qe) !== Ne, Ie = De.rendering;
        if (Ie === null)
          if (at)
            Lu(De, !1);
          else {
            var St = xj() && (e === null || (e.flags & Qe) === Ne);
            if (!St)
              for (var qe = t.child; qe !== null; ) {
                var xt = Rc(qe);
                if (xt !== null) {
                  at = !0, t.flags |= Qe, Lu(De, !1);
                  var yn = xt.updateQueue;
                  return yn !== null && (t.updateQueue = yn, t.flags |= We), t.subtreeFlags = Ne, cD(t, n), Jr(t, Up(Da.current, bu)), t.child;
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
          return at ? gn = Up(gn, bu) : gn = Fl(gn), Jr(t, gn), On;
        }
        return an(t), null;
      }
      case Le:
        break;
      case me:
      case Ve: {
        av(t);
        var jr = t.memoizedState, Jl = jr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, Za = Wu !== null;
          Za !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Bn && (t.flags |= Si);
        }
        return !Jl || (t.mode & Pe) === ge ? an(t) : In(Ja, Yn) && (an(t), t.subtreeFlags & (Dt | We) && (t.flags |= Si)), null;
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
        return r & Dn ? (t.flags = r & ~Dn | Qe, (t.mode & tt) !== ge && cm(t), t) : null;
      }
      case S: {
        t.stateNode, Ul(t), up(t), zp();
        var i = t.flags;
        return (i & Dn) !== Ne && (i & Qe) === Ne ? (t.flags = i & ~Dn | Qe, t) : null;
      }
      case H:
        return Ap(t), null;
      case J: {
        zl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var o = t.flags;
        return o & Dn ? (t.flags = o & ~Dn | Qe, (t.mode & tt) !== ge && cm(t), t) : null;
      }
      case Oe:
        return zl(t), null;
      case M:
        return Ul(t), null;
      case P:
        var u = t.type._context;
        return Dp(u, t), null;
      case me:
      case Ve:
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
      case S: {
        t.stateNode, Ul(t), up(t), zp();
        break;
      }
      case H: {
        Ap(t);
        break;
      }
      case M:
        Ul(t);
        break;
      case J:
        zl(t);
        break;
      case Oe:
        zl(t);
        break;
      case P:
        var r = t.type._context;
        Dp(r, t);
        break;
      case me:
      case Ve:
        av(t);
        break;
    }
  }
  var _b = null;
  _b = /* @__PURE__ */ new Set();
  var Wc = !1, rn = !1, ET = typeof WeakSet == "function" ? WeakSet : Set, ce = null, Il = null, ql = null;
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
      ti(Vt, e);
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
    UC(e.containerInfo), ce = t, DT();
    var n = Vb;
    return Vb = !1, n;
  }
  function DT() {
    for (; ce !== null; ) {
      var e = ce, t = e.child;
      (e.subtreeFlags & Wf) !== Ne && t !== null ? (t.return = e, ce = t) : TT();
    }
  }
  function TT() {
    for (; ce !== null; ) {
      var e = ce;
      pt(e);
      try {
        jT(e);
      } catch (n) {
        it(e, e.return, n);
      }
      Yt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ce = t;
        return;
      }
      ce = e.return;
    }
  }
  function jT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & dl) !== Ne) {
      switch (pt(e), e.tag) {
        case C:
        case G:
        case Y:
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
        case S: {
          {
            var u = e.stateNode;
            u0(u.containerInfo);
          }
          break;
        }
        case H:
        case z:
        case M:
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
          l.destroy = void 0, o !== void 0 && ((e & nn) !== Fn ? $x(t) : (e & Vt) !== Fn && xh(t), (e & qa) !== Fn && Iu(!0), Qc(t, n, o), (e & qa) !== Fn && Iu(!1), (e & nn) !== Fn ? Yx() : (e & Vt) !== Fn && Sh());
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
          (e & nn) !== Fn ? Bx(t) : (e & Vt) !== Fn && Ix(t);
          var l = i.create;
          (e & qa) !== Fn && Iu(!0), i.destroy = l(), (e & qa) !== Fn && Iu(!1), (e & nn) !== Fn ? Px() : (e & Vt) !== Fn && qx();
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
        case ae: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Qg(), o = t.alternate === null ? "mount" : "update";
          Wg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case S:
                var p = u.stateNode;
                p.passiveEffectDuration += n;
                break e;
              case ae:
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
        case C:
        case G:
        case Y: {
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
        case S: {
          var u = n.updateQueue;
          if (u !== null) {
            var p = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case H:
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
        case H: {
          var v = n.stateNode;
          if (t === null && n.flags & We) {
            var x = n.type, E = n.memoizedProps;
            WC(v, x, E);
          }
          break;
        }
        case z:
          break;
        case M:
          break;
        case ae: {
          {
            var _ = n.memoizedProps, V = _.onCommit, U = _.onRender, te = n.stateNode.effectDuration, he = Qg(), de = t === null ? "mount" : "update";
            Wg() && (de = "nested-update"), typeof U == "function" && U(n.memoizedProps.id, de, n.actualDuration, n.treeBaseDuration, n.actualStartTime, he);
            {
              typeof V == "function" && V(n.memoizedProps.id, de, te, he), Tj(n);
              var Ye = n.return;
              e: for (; Ye !== null; ) {
                switch (Ye.tag) {
                  case S:
                    var Fe = Ye.stateNode;
                    Fe.effectDuration += te;
                    break e;
                  case ae:
                    var j = Ye.stateNode;
                    j.effectDuration += te;
                    break e;
                }
                Ye = Ye.return;
              }
            }
          }
          break;
        }
        case J: {
          FT(e, n);
          break;
        }
        case Oe:
        case K:
        case Le:
        case me:
        case Ve:
        case Je:
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
      case Y: {
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
      case H: {
        Lb(e, e.return);
        break;
      }
    }
  }
  function LT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === H) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? r0(r) : l0(a.stateNode, a.memoizedProps);
          } catch (l) {
            it(e, e.return, l);
          }
        }
      } else if (a.tag === z) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? i0(i) : o0(i, a.memoizedProps);
          } catch (l) {
            it(e, e.return, l);
          }
      } else if (!((a.tag === me || a.tag === Ve) && a.memoizedState !== null && a !== e)) {
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
        case H:
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === H) {
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
    return e.tag === H || e.tag === S || e.tag === M;
  }
  function Ub(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || kb(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== H && t.tag !== z && t.tag !== Ae; ) {
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
      case H: {
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
    var a = e.tag, r = a === H || a === z;
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
    var a = e.tag, r = a === H || a === z;
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
          case H: {
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
  function ni(e, t, n) {
    for (var a = n.child; a !== null; )
      Fb(e, t, a), a = a.sibling;
  }
  function Fb(e, t, n) {
    switch (Ux(n), n.tag) {
      case H:
        rn || Gl(n, t);
      case z: {
        {
          var a = ln, r = Oa;
          ln = null, ni(e, t, n), ln = a, Oa = r, ln !== null && (Oa ? n0(ln, n.stateNode) : t0(ln, n.stateNode));
        }
        return;
      }
      case Ae: {
        ln !== null && (Oa ? a0(ln, n.stateNode) : ep(ln, n.stateNode));
        return;
      }
      case M: {
        {
          var i = ln, l = Oa;
          ln = n.stateNode.containerInfo, Oa = !0, ni(e, t, n), ln = i, Oa = l;
        }
        return;
      }
      case C:
      case G:
      case ue:
      case Y: {
        if (!rn) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var p = u.next, v = p;
              do {
                var x = v, E = x.destroy, _ = x.tag;
                E !== void 0 && ((_ & qa) !== Fn ? Qc(n, t, E) : (_ & Vt) !== Fn && (xh(n), n.mode & tt ? (Ka(), Qc(n, t, E), Qa(n)) : Qc(n, t, E), Sh())), v = v.next;
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
      case Le: {
        ni(e, t, n);
        return;
      }
      case me: {
        if (
          // TODO: Remove this dead flag
          n.mode & Pe
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
      case ue:
      case Y: {
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
        La(t, e), Xa(e), r & xi && a !== null && Gl(a, a.return);
        return;
      }
      case H: {
        La(t, e), Xa(e), r & xi && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              zy(i);
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
      case z: {
        if (La(t, e), Xa(e), r & We) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, E = e.memoizedProps, _ = a !== null ? a.memoizedProps : E;
          try {
            KC(x, _, E);
          } catch (Ee) {
            it(e, e.return, Ee);
          }
        }
        return;
      }
      case S: {
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
      case M: {
        La(t, e), Xa(e);
        return;
      }
      case J: {
        La(t, e), Xa(e);
        var U = e.child;
        if (U.flags & Si) {
          var te = U.stateNode, he = U.memoizedState, de = he !== null;
          if (te.isHidden = de, de) {
            var Ye = U.alternate !== null && U.alternate.memoizedState !== null;
            Ye || bj();
          }
        }
        if (r & We) {
          try {
            UT(e);
          } catch (Ee) {
            it(e, e.return, Ee);
          }
          zb(e);
        }
        return;
      }
      case me: {
        var Fe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Pe
        ) {
          var j = rn;
          rn = j || Fe, La(t, e), rn = j;
        } else
          La(t, e);
        if (Xa(e), r & Si) {
          var F = e.stateNode, w = e.memoizedState, q = w !== null, oe = e;
          if (F.isHidden = q, q && !Fe && (oe.mode & Pe) !== ge) {
            ce = oe;
            for (var ne = oe.child; ne !== null; )
              ce = ne, BT(ne), ne = ne.sibling;
          }
          LT(oe, q);
        }
        return;
      }
      case Oe: {
        La(t, e), Xa(e), r & We && zb(e);
        return;
      }
      case Le:
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
    Il = n, ql = t, ce = e, Bb(e, t, n), Il = null, ql = null;
  }
  function Bb(e, t, n) {
    for (var a = (e.mode & Pe) !== ge; ce !== null; ) {
      var r = ce, i = r.child;
      if (r.tag === me && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var u = r.alternate, p = u !== null && u.memoizedState !== null, v = p || rn, x = Wc, E = rn;
          Wc = o, rn = v, rn && !E && (ce = r, PT(r));
          for (var _ = i; _ !== null; )
            ce = _, Bb(
              _,
              // New root; bubble back up to here and stop.
              t,
              n
            ), _ = _.sibling;
          ce = r, Wc = x, rn = E, Ym(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ne && i !== null ? (i.return = r, ce = i) : Ym(e, t, n);
    }
  }
  function Ym(e, t, n) {
    for (; ce !== null; ) {
      var a = ce;
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
        ce = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, ce = i;
        return;
      }
      ce = a.return;
    }
  }
  function BT(e) {
    for (; ce !== null; ) {
      var t = ce, n = t.child;
      switch (t.tag) {
        case C:
        case G:
        case ue:
        case Y: {
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
        case H: {
          Gl(t, t.return);
          break;
        }
        case me: {
          var r = t.memoizedState !== null;
          if (r) {
            Pb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, ce = n) : Pb(e);
    }
  }
  function Pb(e) {
    for (; ce !== null; ) {
      var t = ce;
      if (t === e) {
        ce = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ce = n;
        return;
      }
      ce = t.return;
    }
  }
  function PT(e) {
    for (; ce !== null; ) {
      var t = ce, n = t.child;
      if (t.tag === me) {
        var a = t.memoizedState !== null;
        if (a) {
          $b(e);
          continue;
        }
      }
      n !== null ? (n.return = t, ce = n) : $b(e);
    }
  }
  function $b(e) {
    for (; ce !== null; ) {
      var t = ce;
      pt(t);
      try {
        OT(t);
      } catch (a) {
        it(t, t.return, a);
      }
      if (Yt(), t === e) {
        ce = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, ce = n;
        return;
      }
      ce = t.return;
    }
  }
  function $T(e, t, n, a) {
    ce = t, YT(t, e, n, a);
  }
  function YT(e, t, n, a) {
    for (; ce !== null; ) {
      var r = ce, i = r.child;
      (r.subtreeFlags & pl) !== Ne && i !== null ? (i.return = r, ce = i) : IT(e, t, n, a);
    }
  }
  function IT(e, t, n, a) {
    for (; ce !== null; ) {
      var r = ce;
      if ((r.flags & Ur) !== Ne) {
        pt(r);
        try {
          qT(t, r, n, a);
        } catch (l) {
          it(r, r.return, l);
        }
        Yt();
      }
      if (r === e) {
        ce = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, ce = i;
        return;
      }
      ce = r.return;
    }
  }
  function qT(e, t, n, a) {
    switch (t.tag) {
      case C:
      case G:
      case Y: {
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
    ce = e, WT();
  }
  function WT() {
    for (; ce !== null; ) {
      var e = ce, t = e.child;
      if ((ce.flags & Ei) !== Ne) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            ce = r, XT(r, e);
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
          ce = e;
        }
      }
      (e.subtreeFlags & pl) !== Ne && t !== null ? (t.return = e, ce = t) : QT();
    }
  }
  function QT() {
    for (; ce !== null; ) {
      var e = ce;
      (e.flags & Ur) !== Ne && (pt(e), KT(e), Yt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, ce = t;
        return;
      }
      ce = e.return;
    }
  }
  function KT(e) {
    switch (e.tag) {
      case C:
      case G:
      case Y: {
        e.mode & tt ? (sm(), _a(nn | Lt, e, e.return), um(e)) : _a(nn | Lt, e, e.return);
        break;
      }
    }
  }
  function XT(e, t) {
    for (; ce !== null; ) {
      var n = ce;
      pt(n), ZT(n, t), Yt();
      var a = n.child;
      a !== null ? (a.return = n, ce = a) : JT(e);
    }
  }
  function JT(e) {
    for (; ce !== null; ) {
      var t = ce, n = t.sibling, a = t.return;
      if (Ab(t), t === e) {
        ce = null;
        return;
      }
      if (n !== null) {
        n.return = a, ce = n;
        return;
      }
      ce = a;
    }
  }
  function ZT(e, t) {
    switch (e.tag) {
      case C:
      case G:
      case Y: {
        e.mode & tt ? (sm(), _a(nn, e, t), um(e)) : _a(nn, e, t);
        break;
      }
    }
  }
  function ej(e) {
    switch (e.tag) {
      case C:
      case G:
      case Y: {
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
      case C:
      case G:
      case Y: {
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
      case C:
      case G:
      case Y: {
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
      case C:
      case G:
      case Y:
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
  ), Rr = 0, Mu = 1, Yi = 2, Kc = 3, Au = 4, qb = 5, Gm = 6, $e = kt, jn = null, gt = null, Ut = $, Ja = $, Wm = qr($), Ft = Rr, ku = null, Xc = $, Uu = $, Jc = $, Fu = null, zn = null, Qm = 0, Gb = 500, Wb = 1 / 0, sj = 500, Cr = null;
  function zu() {
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
    return ($e & (un | sa)) !== kt ? It() : (Pu !== ut || (Pu = It()), Pu);
  }
  function ri(e) {
    var t = e.mode;
    if ((t & Pe) === ge)
      return Se;
    if (($e & un) !== kt && Ut !== $)
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
    return (t & Pe) === ge ? Se : mS();
  }
  function zt(e, t, n, a) {
    kj(), Kb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Ao(e, n, a), ($e & un) !== $ && e === jn ? zj(t) : (Ea && Mh(e, t, n), Hj(t), e === jn && (($e & un) === kt && (Uu = _e(Uu, n)), Ft === Au && ii(e, Ut)), Hn(e, a), n === Se && $e === kt && (t.mode & Pe) === ge && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
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
    var a = Rs(e, e === jn ? Ut : $);
    if (a === $) {
      n !== null && dN(n), e.callbackNode = null, e.callbackPriority = Gt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== ov)) {
      n == null && i !== Se && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && dN(n);
    var l;
    if (r === Se)
      e.tag === Gr ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), P0(Zb.bind(null, e))) : Qy(Zb.bind(null, e)), Va.current !== null ? Va.current.push(Wr) : qC(function() {
        ($e & (un | sa)) === kt && Wr();
      }), l = null;
    else {
      var o;
      switch (Uh(a)) {
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
    if (LD(), Pu = ut, nf = $, ($e & (un | sa)) !== kt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Tr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === jn ? Ut : $);
    if (r === $)
      return null;
    var i = !Cs(e, r) && !pS(e, r) && !t, l = i ? Rj(e, r) : lf(e, r);
    if (l !== Rr) {
      if (l === Yi) {
        var o = bd(e);
        o !== $ && (r = o, l = tv(e, o));
      }
      if (l === Mu) {
        var u = ku;
        throw qi(e, $), ii(e, r), Hn(e, It()), u;
      }
      if (l === Gm)
        ii(e, r);
      else {
        var p = !Cs(e, r), v = e.current.alternate;
        if (p && !hj(v)) {
          if (l = lf(e, r), l === Yi) {
            var x = bd(e);
            x !== $ && (r = x, l = tv(e, x));
          }
          if (l === Mu) {
            var E = ku;
            throw qi(e, $), ii(e, r), Hn(e, It()), E;
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
      a.flags |= fr, A0(e.containerInfo);
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
      case Rr:
      case Mu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, zn, Cr);
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
            e.timeoutHandle = Jd(Gi.bind(null, e, zn, Cr), a);
            break;
          }
        }
        Gi(e, zn, Cr);
        break;
      }
      case Au: {
        if (ii(e, n), dS(n))
          break;
        if (!pN()) {
          var l = lS(e, n), o = l, u = It() - o, p = Aj(u) - u;
          if (p > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, zn, Cr), p);
            break;
          }
        }
        Gi(e, zn, Cr);
        break;
      }
      case qb: {
        Gi(e, zn, Cr);
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
    t = Ds(t, Jc), t = Ds(t, Uu), hS(e, t);
  }
  function Zb(e) {
    if (VD(), ($e & (un | sa)) !== kt)
      throw new Error("Should not already be working.");
    Tr();
    var t = Rs(e, $);
    if (!In(t, Se))
      return Hn(e, It()), null;
    var n = lf(e, t);
    if (e.tag !== Gr && n === Yi) {
      var a = bd(e);
      a !== $ && (t = a, n = tv(e, a));
    }
    if (n === Mu) {
      var r = ku;
      throw qi(e, $), ii(e, t), Hn(e, It()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, zn, Cr), Hn(e, It()), null;
  }
  function yj(e, t) {
    t !== $ && (Sd(e, _e(t, Se)), Hn(e, It()), ($e & (un | sa)) === kt && (zu(), Wr()));
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
  function Dr(e) {
    ai !== null && ai.tag === Gr && ($e & (un | sa)) === kt && Tr();
    var t = $e;
    $e |= Ib;
    var n = on.transition, a = xa();
    try {
      return on.transition = null, Wt(qn), e ? e() : void 0;
    } finally {
      Wt(a), on.transition = n, $e = t, ($e & (un | sa)) === kt && Wr();
    }
  }
  function eN() {
    return ($e & (un | sa)) !== kt;
  }
  function rf(e, t) {
    vn(Wm, Ja, e), Ja = _e(Ja, t);
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
    return gt = i, Ut = Ja = t, Ft = Rr, ku = null, Xc = $, Uu = $, Jc = $, Fu = null, zn = null, pD(), Ca.discardPendingWarnings(), i;
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
    Xc = _e(e, Xc);
  }
  function Nj() {
    Ft === Rr && (Ft = Kc);
  }
  function rv() {
    (Ft === Rr || Ft === Kc || Ft === Yi) && (Ft = Au), jn !== null && (Nd(Xc) || Nd(Uu)) && ii(jn, Ut);
  }
  function Ej(e) {
    Ft !== Au && (Ft = Yi), Fu === null ? Fu = [e] : Fu.push(e);
  }
  function xj() {
    return Ft === Rr;
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
      Cr = kh(), qi(e, t);
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
    return Ch(), jn = null, Ut = $, Ft;
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
      Cr = kh(), zu(), qi(e, t);
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
    return mc(), aN(a), $e = n, gt !== null ? (Zx(), Rr) : (Ch(), jn = null, Ut = $, Ft);
  }
  function Cj() {
    for (; gt !== null && !Tx(); )
      rN(gt);
  }
  function rN(e) {
    var t = e.alternate;
    pt(e);
    var n;
    (e.mode & tt) !== ge ? (om(e), n = iv(t, e, Ja), $c(e, !0)) : n = iv(t, e, Ja), Yt(), e.memoizedProps = e.pendingProps, n === null ? iN(e) : gt = n, qm.current = null;
  }
  function iN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ne) {
        pt(t);
        var r = void 0;
        if ((t.mode & tt) === ge ? r = jb(n, t, Ja) : (om(t), r = jb(n, t, Ja), $c(t, !1)), Yt(), r !== null) {
          gt = r;
          return;
        }
      } else {
        var i = NT(n, t);
        if (i !== null) {
          i.flags &= Ex, gt = i;
          return;
        }
        if ((t.mode & tt) !== ge) {
          $c(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= bs, a.subtreeFlags = Ne, a.deletions = null;
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
    Ft === Rr && (Ft = qb);
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
      Tr();
    while (ai !== null);
    if (Uj(), ($e & (un | sa)) !== kt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (Hx(i), r === null)
      return Eh(), null;
    if (i === $ && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Gt;
    var l = _e(r.lanes, r.childLanes);
    yS(e, l), e === jn && (jn = null, gt = null, Ut = $), ((r.subtreeFlags & pl) !== Ne || (r.flags & pl) !== Ne) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Tr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ne, u = (r.flags & (Wf | Qf | To | pl)) !== Ne;
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
    if (Ii ? (Ii = !1, ai = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === $ && (Wl = null), E || sN(e.current, !1), Ax(r.stateNode, a), Ea && e.memoizedUpdaters.clear(), ij(), Hn(e, It()), t !== null)
      for (var _ = e.onRecoverableError, V = 0; V < t.length; V++) {
        var U = t[V], te = U.stack, he = U.digest;
        _(U.value, {
          componentStack: te,
          digest: he
        });
      }
    if (Zc) {
      Zc = !1;
      var de = Km;
      throw Km = null, de;
    }
    return In(Hu, Se) && e.tag !== Gr && Tr(), l = e.pendingLanes, In(l, Se) ? (OD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, Wr(), Eh(), null;
  }
  function Tr() {
    if (ai !== null) {
      var e = Uh(Hu), t = ES(hr, e), n = on.transition, a = xa();
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
    if (ai = null, Hu = $, ($e & (un | sa)) !== kt)
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
    Jx(), sN(t.current, !0), $e = a, Wr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, kx(t);
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
    var a = Pi(n, t), r = rb(e, a, Se), i = Kr(e, r, Se), l = wn();
    i !== null && (Ao(i, Se, l), Hn(i, l));
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
      } else if (a.tag === D) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !lN(i)) {
          var l = Pi(n, e), o = Cm(a, l, Se), u = Kr(a, o, Se), p = wn();
          u !== null && (Ao(u, Se, p), Hn(u, p));
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
    Vh(e, n), Bj(e), jn === e && bl(Ut, n) && (Ft === Au || Ft === Kc && wh(Ut) && It() - Qm < Gb ? qi(e, $) : Jc = _e(Jc, n)), Hn(e, r);
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
      case J:
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
    pt(e), of(e, Fr, nj), t && of(e, Gf, aj), of(e, Fr, ej), t && of(e, Gf, tj), Yt();
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
      if (($e & un) !== kt || !(e.mode & Pe))
        return;
      var t = e.tag;
      if (t !== O && t !== S && t !== D && t !== C && t !== G && t !== ue && t !== Y)
        return;
      var n = Te(e) || "ReactComponent";
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
        case Y: {
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
      } else if (!oj() || $e !== kt || e.tag !== C && e.tag !== G && e.tag !== Y)
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
        case D: {
          typeof a == "function" && (r = !0);
          break;
        }
        case C: {
          (typeof a == "function" || i === ye) && (r = !0);
          break;
        }
        case G: {
          (i === ve || i === ye) && (r = !0);
          break;
        }
        case ue:
        case Y: {
          (i === we || i === ye) && (r = !0);
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
        case C:
        case Y:
        case D:
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
        x !== void 0 && (n.has(x) ? v = !0 : t.has(x) && (l === D ? v = !0 : p = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || p) {
        var E = Un(e, Se);
        E !== null && zt(E, e, Se, ut);
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
        case Y:
        case D:
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
          case H:
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
      if (n.tag === H)
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
      return mv(e) ? D : C;
    if (e != null) {
      var t = e.$$typeof;
      if (t === ve)
        return G;
      if (t === we)
        return ue;
    }
    return O;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Kn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ne, n.subtreeFlags = Ne, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & pr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case O:
      case C:
      case Y:
        n.type = Xl(e.type);
        break;
      case D:
        n.type = sv(e.type);
        break;
      case G:
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
    return e === rc ? (a = Pe, t === !0 && (a |= Et, a |= Pa)) : a = ge, Ea && (a |= tt), Kn(S, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = O, o = e;
    if (typeof e == "function")
      mv(e) ? (l = D, o = sv(o)) : o = Xl(o);
    else if (typeof e == "string")
      l = H;
    else
      e: switch (e) {
        case Fa:
          return li(n.children, r, i, t);
        case fi:
          l = Q, r |= Et, (r & Pe) !== ge && (r |= Pa);
          break;
        case b:
          return Zj(n, r, i, t);
        case He:
          return ew(n, r, i, t);
        case xe:
          return tw(n, r, i, t);
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
                l = P;
                break e;
              case ee:
                l = le;
                break e;
              case ve:
                l = G, o = cv(o);
                break e;
              case we:
                l = ue;
                break e;
              case ye:
                l = ze, o = null;
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
    var r = Kn(se, e, a, t);
    return r.lanes = n, r;
  }
  function Zj(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Kn(ae, e, a, t | tt);
    return r.elementType = b, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ew(e, t, n, a) {
    var r = Kn(J, e, a, t);
    return r.elementType = He, r.lanes = n, r;
  }
  function tw(e, t, n, a) {
    var r = Kn(Oe, e, a, t);
    return r.elementType = xe, r.lanes = n, r;
  }
  function yN(e, t, n, a) {
    var r = Kn(me, e, a, t);
    r.elementType = ft, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function yv(e, t, n) {
    var a = Kn(z, e, null, t);
    return a.lanes = n, a;
  }
  function nw() {
    var e = Kn(H, null, null, ge);
    return e.elementType = "DELETED", e;
  }
  function aw(e) {
    var t = Kn(Ae, null, null, ge);
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
    return e === null && (e = Kn(O, null, null, ge)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function rw(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Gt, this.eventTimes = xd($), this.expirationTimes = xd(ut), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = xd($), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
    var v = new rw(e, t, n, o, u), x = Jj(t, i);
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
    var E = x.current, _ = wn(), V = ri(E), U = xr(_, V);
    return U.callback = t ?? null, Kr(E, U, V), pj(x, V, _), x;
  }
  function qu(e, t, n, a) {
    Mx(t, e);
    var r = t.current, i = wn(), l = ri(r);
    eS(l);
    var o = NN(n);
    t.context === null ? t.context = o : t.pendingContext = o, yi && Sn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Te(Sn) || "Unknown"));
    var u = xr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var p = Kr(r, u, l);
    return p !== null && (zt(p, r, l, i), bc(p, r, l)), l;
  }
  function sf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case H:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function ow(e) {
    switch (e.tag) {
      case S: {
        var t = e.stateNode;
        if (js(t)) {
          var n = sS(t);
          yj(t, n);
        }
        break;
      }
      case J: {
        Dr(function() {
          var r = Un(e, Se);
          if (r !== null) {
            var i = wn();
            zt(r, e, Se, i);
          }
        });
        var a = Se;
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
  function uw(e) {
    if (e.tag === J) {
      var t = Oo, n = Un(e, t);
      if (n !== null) {
        var a = wn();
        zt(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function sw(e) {
    if (e.tag === J) {
      var t = ri(e), n = Un(e, t);
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
    var kN = function(e, t, n) {
      var a = t[n], r = Ue(e) ? e.slice() : ke({}, e);
      return n + 1 === t.length ? (Ue(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = kN(e[a], t, n + 1), r);
    }, UN = function(e, t) {
      return kN(e, t, 0);
    }, FN = function(e, t, n, a) {
      var r = t[a], i = Ue(e) ? e.slice() : ke({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Ue(i) ? i.splice(r, 1) : delete i[r];
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
      var r = t[n], i = Ue(e) ? e.slice() : ke({}, e);
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
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ke({}, e.memoizedProps);
        var l = Un(e, Se);
        l !== null && zt(l, e, Se, ut);
      }
    }, jN = function(e, t, n) {
      var a = Sv(e, t);
      if (a !== null) {
        var r = UN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ke({}, e.memoizedProps);
        var i = Un(e, Se);
        i !== null && zt(i, e, Se, ut);
      }
    }, wN = function(e, t, n, a) {
      var r = Sv(e, t);
      if (r !== null) {
        var i = zN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ke({}, e.memoizedProps);
        var l = Un(e, Se);
        l !== null && zt(l, e, Se, ut);
      }
    }, _N = function(e, t, n) {
      e.pendingProps = BN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Un(e, Se);
      a !== null && zt(a, e, Se, ut);
    }, ON = function(e, t) {
      e.pendingProps = UN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Un(e, Se);
      n !== null && zt(n, e, Se, ut);
    }, LN = function(e, t, n) {
      e.pendingProps = zN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Un(e, Se);
      a !== null && zt(a, e, Se, ut);
    }, VN = function(e) {
      var t = Un(e, Se);
      t !== null && zt(t, e, Se, ut);
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
    return Sn;
  }
  function vw(e) {
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
  function yw(e) {
    e && LS(e);
  }
  cf.prototype.unstable_scheduleHydration = yw;
  function gw(e, t, n) {
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
      var l = xN(
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
      var x = e.nodeType === Ct ? e.parentNode : e;
      return Jo(x), Dr(function() {
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
  function xw(e) {
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
  function Sw(e, t, n) {
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
    if (e == null || !bx(e))
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
  xS(ow), RS(uw), CS(sw), DS(xa), TS(bS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), ux(jC), fx(nv, gj, Dr);
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
  Jn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, Jn.createPortal = Tw, Jn.createRoot = ww, Jn.findDOMNode = xw, Jn.flushSync = Ow, Jn.hydrate = Sw, Jn.hydrateRoot = _w, Jn.render = Rw, Jn.unmountComponentAtNode = Dw, Jn.unstable_batchedUpdates = nv, Jn.unstable_renderSubtreeIntoContainer = jw, Jn.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
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
    key: m && m.key || g || $w()
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
function Yw(c, m, h, g) {
  g === void 0 && (g = {});
  let {
    window: N = document.defaultView,
    v5Compat: R = !1
  } = g, f = N.history, A = oi.Pop, C = null, D = O();
  D == null && (D = 0, f.replaceState(Qu({}, f.state, {
    idx: D
  }), ""));
  function O() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function S() {
    A = oi.Pop;
    let Q = O(), le = Q == null ? null : Q - D;
    D = Q, C && C({
      action: A,
      location: se.location,
      delta: le
    });
  }
  function M(Q, le) {
    A = oi.Push;
    let P = _v(se.location, Q, le);
    D = O() + 1;
    let G = JN(P, D), ae = se.createHref(P);
    try {
      f.pushState(G, "", ae);
    } catch (J) {
      if (J instanceof DOMException && J.name === "DataCloneError")
        throw J;
      N.location.assign(ae);
    }
    R && C && C({
      action: A,
      location: se.location,
      delta: 1
    });
  }
  function H(Q, le) {
    A = oi.Replace;
    let P = _v(se.location, Q, le);
    D = O();
    let G = JN(P, D), ae = se.createHref(P);
    f.replaceState(G, "", ae), R && C && C({
      action: A,
      location: se.location,
      delta: 0
    });
  }
  function z(Q) {
    let le = N.location.origin !== "null" ? N.location.origin : N.location.href, P = typeof Q == "string" ? Q : Ku(Q);
    return P = P.replace(/ $/, "%20"), vt(le, "No window.location.(origin|href) available to create URL for href: " + P), new URL(P, le);
  }
  let se = {
    get action() {
      return A;
    },
    get location() {
      return c(N, f);
    },
    listen(Q) {
      if (C)
        throw new Error("A history only accepts one active listener");
      return N.addEventListener(XN, S), C = Q, () => {
        N.removeEventListener(XN, S), C = null;
      };
    },
    createHref(Q) {
      return m(N, Q);
    },
    createURL: z,
    encodeLocation(Q) {
      let le = z(Q);
      return {
        pathname: le.pathname,
        search: le.search,
        hash: le.hash
      };
    },
    push: M,
    replace: H,
    go(Q) {
      return f.go(Q);
    }
  };
  return se;
}
var ZN;
(function(c) {
  c.data = "data", c.deferred = "deferred", c.redirect = "redirect", c.error = "error";
})(ZN || (ZN = {}));
function Iw(c, m, h) {
  return h === void 0 && (h = "/"), qw(c, m, h);
}
function qw(c, m, h, g) {
  let N = typeof m == "string" ? eo(m) : m, R = ui(N.pathname || "/", h);
  if (R == null)
    return null;
  let f = pE(c);
  Gw(f);
  let A = null;
  for (let C = 0; A == null && C < f.length; ++C) {
    let D = r1(R);
    A = n1(f[C], D);
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
    let D = Or([g, C.relativePath]), O = h.concat(C);
    R.children && R.children.length > 0 && (vt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      R.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + D + '".')
    ), pE(R.children, m, O, D)), !(R.path == null && !R.index) && m.push({
      path: D,
      score: e1(D, R.index),
      routesMeta: O
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
function Gw(c) {
  c.sort((m, h) => m.score !== h.score ? h.score - m.score : t1(m.routesMeta.map((g) => g.childrenIndex), h.routesMeta.map((g) => g.childrenIndex)));
}
const Ww = /^:[\w-]+$/, Qw = 3, Kw = 2, Xw = 1, Jw = 10, Zw = -2, eE = (c) => c === "*";
function e1(c, m) {
  let h = c.split("/"), g = h.length;
  return h.some(eE) && (g += Zw), m && (g += Kw), h.filter((N) => !eE(N)).reduce((N, R) => N + (Ww.test(R) ? Qw : R === "" ? Xw : Jw), g);
}
function t1(c, m) {
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
function n1(c, m, h) {
  let {
    routesMeta: g
  } = c, N = {}, R = "/", f = [];
  for (let A = 0; A < g.length; ++A) {
    let C = g[A], D = A === g.length - 1, O = R === "/" ? m : m.slice(R.length) || "/", S = Ov({
      path: C.relativePath,
      caseSensitive: C.caseSensitive,
      end: D
    }, O), M = C.route;
    if (!S)
      return null;
    Object.assign(N, S.params), f.push({
      // TODO: Can this as be avoided?
      params: N,
      pathname: Or([R, S.pathname]),
      pathnameBase: u1(Or([R, S.pathnameBase])),
      route: M
    }), S.pathnameBase !== "/" && (R = Or([R, S.pathnameBase]));
  }
  return f;
}
function Ov(c, m) {
  typeof c == "string" && (c = {
    path: c,
    caseSensitive: !1,
    end: !0
  });
  let [h, g] = a1(c.path, c.caseSensitive, c.end), N = m.match(h);
  if (!N) return null;
  let R = N[0], f = R.replace(/(.)\/+$/, "$1"), A = N.slice(1);
  return {
    params: g.reduce((D, O, S) => {
      let {
        paramName: M,
        isOptional: H
      } = O;
      if (M === "*") {
        let se = A[S] || "";
        f = R.slice(0, R.length - se.length).replace(/(.)\/+$/, "$1");
      }
      const z = A[S];
      return H && !z ? D[M] = void 0 : D[M] = (z || "").replace(/%2F/g, "/"), D;
    }, {}),
    pathname: R,
    pathnameBase: f,
    pattern: c
  };
}
function a1(c, m, h) {
  m === void 0 && (m = !1), h === void 0 && (h = !0), Ma(c === "*" || !c.endsWith("*") || c.endsWith("/*"), 'Route path "' + c + '" will be treated as if it were ' + ('"' + c.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + c.replace(/\*$/, "/*") + '".'));
  let g = [], N = "^" + c.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, A, C) => (g.push({
    paramName: A,
    isOptional: C != null
  }), C ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return c.endsWith("*") ? (g.push({
    paramName: "*"
  }), N += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? N += "\\/*$" : c !== "" && c !== "/" && (N += "(?:(?=\\/|$))"), [new RegExp(N, m ? void 0 : "i"), g];
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
  let h = m.endsWith("/") ? m.length - 1 : m.length, g = c.charAt(h);
  return g && g !== "/" ? null : c.slice(h) || "/";
}
function i1(c, m) {
  m === void 0 && (m = "/");
  let {
    pathname: h,
    search: g = "",
    hash: N = ""
  } = typeof c == "string" ? eo(c) : c;
  return {
    pathname: h ? h.startsWith("/") ? h : l1(h, m) : m,
    search: s1(g),
    hash: c1(N)
  };
}
function l1(c, m) {
  let h = m.replace(/\/+$/, "").split("/");
  return c.split("/").forEach((N) => {
    N === ".." ? h.length > 1 && h.pop() : N !== "." && h.push(N);
  }), h.length > 1 ? h.join("/") : "/";
}
function Tv(c, m, h, g) {
  return "Cannot include a '" + c + "' character in a manually specified " + ("`to." + m + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function o1(c) {
  return c.filter((m, h) => h === 0 || m.route.path && m.route.path.length > 0);
}
function Vv(c, m) {
  let h = o1(c);
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
  let C = i1(N, A), D = f && f !== "/" && f.endsWith("/"), O = (R || f === ".") && h.endsWith("/");
  return !C.pathname.endsWith("/") && (D || O) && (C.pathname += "/"), C;
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
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ T.createContext(null);
Zu.displayName = "DataRouter";
const Av = /* @__PURE__ */ T.createContext(null);
Av.displayName = "DataRouterState";
const p1 = /* @__PURE__ */ T.createContext(null);
p1.displayName = "Await";
const fa = /* @__PURE__ */ T.createContext(null);
fa.displayName = "Navigation";
const es = /* @__PURE__ */ T.createContext(null);
es.displayName = "Location";
const Aa = /* @__PURE__ */ T.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Aa.displayName = "Route";
const kv = /* @__PURE__ */ T.createContext(null);
kv.displayName = "RouteError";
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
    basename: g,
    navigator: N
  } = T.useContext(fa), {
    hash: R,
    pathname: f,
    search: A
  } = ts(c, {
    relative: h
  }), C = f;
  return g !== "/" && (C = f === "/" ? g : Or([g, f])), N.createHref({
    pathname: C,
    search: A,
    hash: R
  });
}
function to() {
  return T.useContext(es) != null;
}
function Qi() {
  return to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), T.useContext(es).location;
}
const hE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function yE(c) {
  T.useContext(fa).static || T.useLayoutEffect(c);
}
function Uv() {
  let {
    isDataRoute: c
  } = T.useContext(Aa);
  return c ? w1() : v1();
}
function v1() {
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let c = T.useContext(Zu), {
    basename: m,
    future: h,
    navigator: g
  } = T.useContext(fa), {
    matches: N
  } = T.useContext(Aa), {
    pathname: R
  } = Qi(), f = JSON.stringify(Vv(N, h.v7_relativeSplatPath)), A = T.useRef(!1);
  return yE(() => {
    A.current = !0;
  }), T.useCallback(function(D, O) {
    if (O === void 0 && (O = {}), Ma(A.current, hE), !A.current) return;
    if (typeof D == "number") {
      g.go(D);
      return;
    }
    let S = Mv(D, JSON.parse(f), R, O.relative === "path");
    c == null && m !== "/" && (S.pathname = S.pathname === "/" ? m : Or([m, S.pathname])), (O.replace ? g.replace : g.push)(S, O.state, O);
  }, [m, g, f, R, c]);
}
function h1() {
  let {
    matches: c
  } = T.useContext(Aa), m = c[c.length - 1];
  return m ? m.params : {};
}
function ts(c, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    future: g
  } = T.useContext(fa), {
    matches: N
  } = T.useContext(Aa), {
    pathname: R
  } = Qi(), f = JSON.stringify(Vv(N, g.v7_relativeSplatPath));
  return T.useMemo(() => Mv(c, JSON.parse(f), R, h === "path"), [c, f, R, h]);
}
function y1(c, m) {
  return g1(c, m);
}
function g1(c, m, h, g) {
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: N
  } = T.useContext(fa), {
    matches: R
  } = T.useContext(Aa), f = R[R.length - 1], A = f ? f.params : {}, C = f ? f.pathname : "/", D = f ? f.pathnameBase : "/", O = f && f.route;
  {
    let P = O && O.path || "";
    bE(C, !O || P.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + C + '" (under <Route path="' + P + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + P + '"> to <Route ') + ('path="' + (P === "/" ? "*" : P + "/*") + '">.'));
  }
  let S = Qi(), M;
  if (m) {
    var H;
    let P = typeof m == "string" ? eo(m) : m;
    D === "/" || (H = P.pathname) != null && H.startsWith(D) || vt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + D + '" ') + ('but pathname "' + P.pathname + '" was given in the `location` prop.')), M = P;
  } else
    M = S;
  let z = M.pathname || "/", se = z;
  if (D !== "/") {
    let P = D.replace(/^\//, "").split("/");
    se = "/" + z.replace(/^\//, "").split("/").slice(P.length).join("/");
  }
  let Q = Iw(c, {
    pathname: se
  });
  Ma(O || Q != null, 'No routes matched location "' + M.pathname + M.search + M.hash + '" '), Ma(Q == null || Q[Q.length - 1].route.element !== void 0 || Q[Q.length - 1].route.Component !== void 0 || Q[Q.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + M.pathname + M.search + M.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let le = S1(Q && Q.map((P) => Object.assign({}, P, {
    params: Object.assign({}, A, P.params),
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
  })), R, h, g);
  return m && le ? /* @__PURE__ */ T.createElement(es.Provider, {
    value: {
      location: Xu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, M),
      navigationType: oi.Pop
    }
  }, le) : le;
}
function b1() {
  let c = j1(), m = f1(c) ? c.status + " " + c.statusText : c instanceof Error ? c.message : JSON.stringify(c), h = c instanceof Error ? c.stack : null, g = "rgba(200,200,200, 0.5)", N = {
    padding: "0.5rem",
    backgroundColor: g
  }, R = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", c), f = /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ T.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ T.createElement("code", {
    style: R
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ T.createElement("code", {
    style: R
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ T.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, m), h ? /* @__PURE__ */ T.createElement("pre", {
    style: N
  }, h) : null, f);
}
const N1 = /* @__PURE__ */ T.createElement(b1, null);
class E1 extends T.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ T.createElement(Aa.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ T.createElement(kv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function x1(c) {
  let {
    routeContext: m,
    match: h,
    children: g
  } = c, N = T.useContext(Zu);
  return N && N.static && N.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (N.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ T.createElement(Aa.Provider, {
    value: m
  }, g);
}
function S1(c, m, h, g) {
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
    let O = f.findIndex((S) => S.route.id && (A == null ? void 0 : A[S.route.id]) !== void 0);
    O >= 0 || vt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(A).join(",")), f = f.slice(0, Math.min(f.length, O + 1));
  }
  let C = !1, D = -1;
  if (h && g && g.v7_partialHydration)
    for (let O = 0; O < f.length; O++) {
      let S = f[O];
      if ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (D = O), S.route.id) {
        let {
          loaderData: M,
          errors: H
        } = h, z = S.route.loader && M[S.route.id] === void 0 && (!H || H[S.route.id] === void 0);
        if (S.route.lazy || z) {
          C = !0, D >= 0 ? f = f.slice(0, D + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((O, S, M) => {
    let H, z = !1, se = null, Q = null;
    h && (H = A && S.route.id ? A[S.route.id] : void 0, se = S.route.errorElement || N1, C && (D < 0 && M === 0 ? (bE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), z = !0, Q = null) : D === M && (z = !0, Q = S.route.hydrateFallbackElement || null)));
    let le = m.concat(f.slice(0, M + 1)), P = () => {
      let G;
      return H ? G = se : z ? G = Q : S.route.Component ? G = /* @__PURE__ */ T.createElement(S.route.Component, null) : S.route.element ? G = S.route.element : G = O, /* @__PURE__ */ T.createElement(x1, {
        match: S,
        routeContext: {
          outlet: O,
          matches: le,
          isDataRoute: h != null
        },
        children: G
      });
    };
    return h && (S.route.ErrorBoundary || S.route.errorElement || M === 0) ? /* @__PURE__ */ T.createElement(E1, {
      location: h.location,
      revalidation: h.revalidation,
      component: se,
      error: H,
      children: P(),
      routeContext: {
        outlet: null,
        matches: le,
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
function Fv(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function R1(c) {
  let m = T.useContext(Zu);
  return m || vt(!1, Fv(c)), m;
}
function C1(c) {
  let m = T.useContext(Av);
  return m || vt(!1, Fv(c)), m;
}
function D1(c) {
  let m = T.useContext(Aa);
  return m || vt(!1, Fv(c)), m;
}
function zv(c) {
  let m = D1(c), h = m.matches[m.matches.length - 1];
  return h.route.id || vt(!1, c + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function T1() {
  return zv(Ju.UseRouteId);
}
function j1() {
  var c;
  let m = T.useContext(kv), h = C1(Ju.UseRouteError), g = zv(Ju.UseRouteError);
  return m !== void 0 ? m : (c = h.errors) == null ? void 0 : c[g];
}
function w1() {
  let {
    router: c
  } = R1(gE.UseNavigateStable), m = zv(Ju.UseNavigateStable), h = T.useRef(!1);
  return yE(() => {
    h.current = !0;
  }), T.useCallback(function(N, R) {
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
  } = T.useContext(fa);
  Ma(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: A
  } = T.useContext(Aa), {
    pathname: C
  } = Qi(), D = Uv(), O = Mv(m, Vv(A, R.v7_relativeSplatPath), C, N === "path"), S = JSON.stringify(O);
  return T.useEffect(() => D(JSON.parse(S), {
    replace: h,
    state: g,
    relative: N
  }), [D, S, N, h, g]), null;
}
function er(c) {
  vt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function V1(c) {
  let {
    basename: m = "/",
    children: h = null,
    location: g,
    navigationType: N = oi.Pop,
    navigator: R,
    static: f = !1,
    future: A
  } = c;
  to() && vt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let C = m.replace(/^\/*/, "/"), D = T.useMemo(() => ({
    basename: C,
    navigator: R,
    static: f,
    future: Xu({
      v7_relativeSplatPath: !1
    }, A)
  }), [C, A, R, f]);
  typeof g == "string" && (g = eo(g));
  let {
    pathname: O = "/",
    search: S = "",
    hash: M = "",
    state: H = null,
    key: z = "default"
  } = g, se = T.useMemo(() => {
    let Q = ui(O, C);
    return Q == null ? null : {
      location: {
        pathname: Q,
        search: S,
        hash: M,
        state: H,
        key: z
      },
      navigationType: N
    };
  }, [C, O, S, M, H, z, N]);
  return Ma(se != null, '<Router basename="' + C + '"> is not able to match the URL ' + ('"' + O + S + M + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), se == null ? null : /* @__PURE__ */ T.createElement(fa.Provider, {
    value: D
  }, /* @__PURE__ */ T.createElement(es.Provider, {
    children: h,
    value: se
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
  return T.Children.forEach(c, (g, N) => {
    if (!/* @__PURE__ */ T.isValidElement(g))
      return;
    let R = [...m, N];
    if (g.type === T.Fragment) {
      h.push.apply(h, Lv(g.props.children, R));
      return;
    }
    g.type !== er && vt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || vt(!1, "An index route cannot have child routes.");
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
function A1(c) {
  return gf(c) && c.tagName.toLowerCase() === "button";
}
function k1(c) {
  return gf(c) && c.tagName.toLowerCase() === "form";
}
function U1(c) {
  return gf(c) && c.tagName.toLowerCase() === "input";
}
function F1(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function z1(c, m) {
  return c.button === 0 && // Ignore everything but left clicks
  (!m || m === "_self") && // Let browser handle "target=_blank" etc.
  !F1(c);
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
  let h, g, N, R, f;
  if (k1(c)) {
    let A = c.getAttribute("action");
    g = A ? ui(A, m) : null, h = c.getAttribute("method") || mf, N = jv(c.getAttribute("enctype")) || vf, R = new FormData(c);
  } else if (A1(c) || U1(c) && (c.type === "submit" || c.type === "image")) {
    let A = c.form;
    if (A == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let C = c.getAttribute("formaction") || A.getAttribute("action");
    if (g = C ? ui(C, m) : null, h = c.getAttribute("formmethod") || A.getAttribute("method") || mf, N = jv(c.getAttribute("formenctype")) || jv(A.getAttribute("enctype")) || vf, R = new FormData(A, c), !H1()) {
      let {
        name: D,
        type: O,
        value: S
      } = c;
      if (O === "image") {
        let M = D ? D + "." : "";
        R.append(M + "x", "0"), R.append(M + "y", "0");
      } else D && R.append(D, S);
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
const $1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Y1 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], I1 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], q1 = "6";
try {
  window.__reactRouterVersion = q1;
} catch {
}
const NE = /* @__PURE__ */ T.createContext({
  isTransitioning: !1
});
NE.displayName = "ViewTransition";
const G1 = /* @__PURE__ */ T.createContext(/* @__PURE__ */ new Map());
G1.displayName = "Fetchers";
const W1 = "startTransition", rE = zw[W1];
function Q1(c) {
  let {
    basename: m,
    children: h,
    future: g,
    window: N
  } = c, R = T.useRef();
  R.current == null && (R.current = Pw({
    window: N,
    v5Compat: !0
  }));
  let f = R.current, [A, C] = T.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: D
  } = g || {}, O = T.useCallback((S) => {
    D && rE ? rE(() => C(S)) : C(S);
  }, [C, D]);
  return T.useLayoutEffect(() => f.listen(O), [f, O]), T.useEffect(() => O1(g), [g]), /* @__PURE__ */ T.createElement(V1, {
    basename: m,
    children: h,
    location: A.location,
    navigationType: A.action,
    navigator: f,
    future: g
  });
}
const K1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", X1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, wr = /* @__PURE__ */ T.forwardRef(function(m, h) {
  let {
    onClick: g,
    relative: N,
    reloadDocument: R,
    replace: f,
    state: A,
    target: C,
    to: D,
    preventScrollReset: O,
    viewTransition: S
  } = m, M = Hv(m, $1), {
    basename: H
  } = T.useContext(fa), z, se = !1;
  if (typeof D == "string" && X1.test(D) && (z = D, K1))
    try {
      let G = new URL(window.location.href), ae = D.startsWith("//") ? new URL(G.protocol + D) : new URL(D), J = ui(ae.pathname, H);
      ae.origin === G.origin && J != null ? D = J + ae.search + ae.hash : se = !0;
    } catch {
      Ma(!1, '<Link to="' + D + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let Q = m1(D, {
    relative: N
  }), le = t_(D, {
    replace: f,
    state: A,
    target: C,
    preventScrollReset: O,
    relative: N,
    viewTransition: S
  });
  function P(G) {
    g && g(G), G.defaultPrevented || le(G);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ T.createElement("a", Zl({}, M, {
      href: z || Q,
      onClick: se || R ? g : P,
      ref: h,
      target: C
    }))
  );
});
wr.displayName = "Link";
const J1 = /* @__PURE__ */ T.forwardRef(function(m, h) {
  let {
    "aria-current": g = "page",
    caseSensitive: N = !1,
    className: R = "",
    end: f = !1,
    style: A,
    to: C,
    viewTransition: D,
    children: O
  } = m, S = Hv(m, Y1), M = ts(C, {
    relative: S.relative
  }), H = Qi(), z = T.useContext(Av), {
    navigator: se,
    basename: Q
  } = T.useContext(fa), le = z != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  o_(M) && D === !0, P = se.encodeLocation ? se.encodeLocation(M).pathname : M.pathname, G = H.pathname, ae = z && z.navigation && z.navigation.location ? z.navigation.location.pathname : null;
  N || (G = G.toLowerCase(), ae = ae ? ae.toLowerCase() : null, P = P.toLowerCase()), ae && Q && (ae = ui(ae, Q) || ae);
  const J = P !== "/" && P.endsWith("/") ? P.length - 1 : P.length;
  let ue = G === P || !f && G.startsWith(P) && G.charAt(J) === "/", Y = ae != null && (ae === P || !f && ae.startsWith(P) && ae.charAt(P.length) === "/"), ze = {
    isActive: ue,
    isPending: Y,
    isTransitioning: le
  }, K = ue ? g : void 0, Ae;
  typeof R == "function" ? Ae = R(ze) : Ae = [R, ue ? "active" : null, Y ? "pending" : null, le ? "transitioning" : null].filter(Boolean).join(" ");
  let Oe = typeof A == "function" ? A(ze) : A;
  return /* @__PURE__ */ T.createElement(wr, Zl({}, S, {
    "aria-current": K,
    className: Ae,
    ref: h,
    style: Oe,
    to: C,
    viewTransition: D
  }), typeof O == "function" ? O(ze) : O);
});
J1.displayName = "NavLink";
const Z1 = /* @__PURE__ */ T.forwardRef((c, m) => {
  let {
    fetcherKey: h,
    navigate: g,
    reloadDocument: N,
    replace: R,
    state: f,
    method: A = mf,
    action: C,
    onSubmit: D,
    relative: O,
    preventScrollReset: S,
    viewTransition: M
  } = c, H = Hv(c, I1), z = i_(), se = l_(C, {
    relative: O
  }), Q = A.toLowerCase() === "get" ? "get" : "post", le = (P) => {
    if (D && D(P), P.defaultPrevented) return;
    P.preventDefault();
    let G = P.nativeEvent.submitter, ae = (G == null ? void 0 : G.getAttribute("formmethod")) || A;
    z(G || P.currentTarget, {
      fetcherKey: h,
      method: ae,
      navigate: g,
      replace: R,
      state: f,
      relative: O,
      preventScrollReset: S,
      viewTransition: M
    });
  };
  return /* @__PURE__ */ T.createElement("form", Zl({
    ref: m,
    method: Q,
    action: se,
    onSubmit: N ? D : le
  }, H));
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
  let m = T.useContext(Zu);
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
  } = m === void 0 ? {} : m, C = Uv(), D = Qi(), O = ts(c, {
    relative: f
  });
  return T.useCallback((S) => {
    if (z1(S, h)) {
      S.preventDefault();
      let M = g !== void 0 ? g : Ku(D) === Ku(O);
      C(c, {
        replace: M,
        state: N,
        preventScrollReset: R,
        relative: f,
        viewTransition: A
      });
    }
  }, [D, C, O, g, N, h, c, R, f, A]);
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
  } = T.useContext(fa), h = T1();
  return T.useCallback(function(g, N) {
    N === void 0 && (N = {}), n_();
    let {
      action: R,
      method: f,
      encType: A,
      formData: C,
      body: D
    } = P1(g, m);
    if (N.navigate === !1) {
      let O = N.fetcherKey || r_();
      c.fetch(O, h, N.action || R, {
        preventScrollReset: N.preventScrollReset,
        formData: C,
        body: D,
        formMethod: N.method || f,
        formEncType: N.encType || A,
        flushSync: N.flushSync
      });
    } else
      c.navigate(N.action || R, {
        preventScrollReset: N.preventScrollReset,
        formData: C,
        body: D,
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
  } = T.useContext(fa), N = T.useContext(Aa);
  N || vt(!1, "useFormAction must be used inside a RouteContext");
  let [R] = N.matches.slice(-1), f = Zl({}, ts(c || ".", {
    relative: h
  })), A = Qi();
  if (c == null) {
    f.search = A.search;
    let C = new URLSearchParams(f.search), D = C.getAll("index");
    if (D.some((S) => S === "")) {
      C.delete("index"), D.filter((M) => M).forEach((M) => C.append("index", M));
      let S = C.toString();
      f.search = S ? "?" + S : "";
    }
  }
  return (!c || c === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Or([g, f.pathname])), Ku(f);
}
function o_(c, m) {
  m === void 0 && (m = {});
  let h = T.useContext(NE);
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
  const [c, m] = T.useState(null), [h, g] = T.useState(""), [N, R] = T.useState(""), [f, A] = T.useState(!0), [C, D] = T.useState(""), [O, S] = T.useState(""), [M, H] = T.useState(!1), [z, se] = T.useState(!1);
  T.useEffect(() => {
    var G, ae, J, ue, Y, ze;
    m({
      apiKey: (G = window.__FIREBASE__) == null ? void 0 : G.apiKey,
      authDomain: (ae = window.__FIREBASE__) == null ? void 0 : ae.authDomain,
      projectId: (J = window.__FIREBASE__) == null ? void 0 : J.projectId,
      appId: (ue = window.__FIREBASE__) == null ? void 0 : ue.appId,
      messagingSenderId: (Y = window.__FIREBASE__) == null ? void 0 : Y.messagingSenderId,
      measurementId: (ze = window.__FIREBASE__) == null ? void 0 : ze.measurementId
    });
  }, []);
  function Q(G) {
    const ae = (G == null ? void 0 : G.code) || "", J = (G == null ? void 0 : G.message) || "";
    return ae.includes("invalid-email") ? "Please enter a valid email address." : ae.includes("user-not-found") ? "No account found with that email." : ae.includes("wrong-password") || ae.includes("invalid-credential") || J.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : ae.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : ae.includes("network-request-failed") ? "Network error. Check your connection and try again." : J || "Something went wrong.";
  }
  async function le(G) {
    G.preventDefault(), D(""), S(""), H(!0);
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const ae = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), J = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ue, setPersistence: Y, browserLocalPersistence: ze, browserSessionPersistence: K, signInWithEmailAndPassword: Ae } = J, Oe = ue();
      await Y(Oe, f ? ze : K);
      const me = await (await Ae(Oe, h.trim(), N)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: me }) })).ok) throw new Error("Session creation failed");
      S("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (ae) {
      D(Q(ae));
    } finally {
      H(!1);
    }
  }
  async function P() {
    D(""), S("");
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: ae, sendPasswordResetEmail: J } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ue = ae();
      await J(ue, h.trim()), S("If an account exists for that email, a reset link has been sent.");
    } catch (G) {
      D(Q(G));
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
      O && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: O }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: le, children: [
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: z ? "text" : "password", value: N, onChange: (G) => R(G.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 87,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": z ? "Hide password" : "Show password", onClick: () => se((G) => !G), children: "👁️" }, void 0, !1, {
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
  const [c, m] = T.useState(null), [h, g] = T.useState(""), [N, R] = T.useState(""), [f, A] = T.useState(""), [C, D] = T.useState(""), [O, S] = T.useState(""), [M, H] = T.useState(""), [z, se] = T.useState(""), [Q, le] = T.useState(!1), [P, G] = T.useState(!1);
  T.useEffect(() => {
    var ue, Y, ze, K, Ae, Oe;
    m({
      apiKey: (ue = window.__FIREBASE__) == null ? void 0 : ue.apiKey,
      authDomain: (Y = window.__FIREBASE__) == null ? void 0 : Y.authDomain,
      projectId: (ze = window.__FIREBASE__) == null ? void 0 : ze.projectId,
      appId: (K = window.__FIREBASE__) == null ? void 0 : K.appId,
      messagingSenderId: (Ae = window.__FIREBASE__) == null ? void 0 : Ae.messagingSenderId,
      measurementId: (Oe = window.__FIREBASE__) == null ? void 0 : Oe.measurementId
    });
  }, []);
  function ae(ue) {
    const Y = (ue == null ? void 0 : ue.code) || "";
    return Y.includes("email-already-in-use") ? "An account with this email already exists." : Y.includes("weak-password") ? "Password should be at least 6 characters." : Y.includes("invalid-email") ? "Please enter a valid email address." : Y.includes("network-request-failed") ? "Network error. Check your connection and try again." : (ue == null ? void 0 : ue.message) || "Something went wrong.";
  }
  async function J(ue) {
    ue.preventDefault(), H(""), se(""), le(!0);
    try {
      if (C !== O) throw new Error("Passwords do not match");
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const Y = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: ze, createUserWithEmailAndPassword: K } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ae = ze(), Le = await (await K(Ae, f.trim(), C)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Le, profile: { fullName: h, contactNumber: N } }) })).ok) throw new Error("Session creation failed");
      se("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (Y) {
      H(ae(Y));
    } finally {
      le(!1);
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
    z && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: z }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 57,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: J, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: h, onChange: (ue) => g(ue.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: N, onChange: (ue) => R(ue.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (ue) => A(ue.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: P ? "text" : "password", value: C, onChange: (ue) => D(ue.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": P ? "Hide password" : "Show password", onClick: () => G((ue) => !ue), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: O, onChange: (ue) => S(ue.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button", disabled: Q, type: "submit", children: Q ? "Creating account…" : "Create account" }, void 0, !1, {
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
  const m = Uv();
  return T.useEffect(() => {
    const h = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), N = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(S, M, H) {
      S && (S.classList.toggle("hidden", !H), S.setAttribute("aria-hidden", H ? "false" : "true"), M && M.setAttribute("aria-expanded", H ? "true" : "false"));
    }
    function A() {
      f(g, h, !1), f(R, N, !1);
    }
    function C(S) {
      const M = (H) => H && (H === S.target || H.contains(S.target));
      !M(g) && !M(h) && !M(R) && !M(N) && A();
    }
    function D(S) {
      S.key === "Escape" && A();
    }
    function O(S) {
      S && S.querySelectorAll(".dropdown-item").forEach((M) => {
        M.addEventListener("click", () => A());
      });
    }
    return h && g && (h.addEventListener("click", (S) => {
      S.stopPropagation(), f(R, N, !1), f(g, h, g.classList.contains("hidden"));
    }), O(g)), N && R && (N.addEventListener("click", (S) => {
      S.stopPropagation(), f(g, h, !1), f(R, N, R.classList.contains("hidden"));
    }), O(R)), document.addEventListener("click", C), document.addEventListener("keydown", D), () => {
      document.removeEventListener("click", C), document.removeEventListener("keydown", D);
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
function c_({ onClose: c, onCreated: m }) {
  const [h, g] = T.useState(""), [N, R] = T.useState(""), [f, A] = T.useState(""), [C, D] = T.useState(""), [O, S] = T.useState(!1), [M, H] = T.useState(""), [z, se] = T.useState("");
  async function Q() {
    if (H(""), se(""), !h || !N) {
      H("Email and password are required");
      return;
    }
    S(!0);
    try {
      const le = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(h).trim(), password: String(N), fullName: String(f).trim() || null, contactNumber: String(C).trim() || null })
      }), P = await le.json().catch(() => null);
      if (!le.ok) throw new Error(P && P.error ? P.error : P && P.message ? P.message : "Failed to create rider");
      se("Rider created successfully"), m && m(), setTimeout(() => {
        c && c();
      }, 600);
    } catch (le) {
      H(le.message || "Failed to create rider");
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
      z && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: z }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 41,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", value: f, onChange: (le) => A(le.target.value), placeholder: "Optional" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "email", value: h, onChange: (le) => g(le.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "password", value: N, onChange: (le) => R(le.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", value: C, onChange: (le) => D(le.target.value), placeholder: "Optional" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: c, disabled: O, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: Q, disabled: O, children: O ? "Creating…" : "Create" }, void 0, !1, {
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
  const [c, m] = T.useState([]), [h, g] = T.useState(""), [N, R] = T.useState("all"), [f, A] = T.useState("all"), [C, D] = T.useState("all"), [O, S] = T.useState(!0), [M, H] = T.useState(""), [z, se] = T.useState(1), [Q, le] = T.useState(20), [P, G] = T.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [ae, J] = T.useState(!1);
  T.useEffect(() => {
    let Y = !0;
    return (async () => {
      var ze, K, Ae, Oe;
      S(!0), H("");
      try {
        const Le = new URLSearchParams();
        h && Le.set("q", h), C !== "all" && Le.set("status", C), N !== "all" && Le.set("lastDays", N), Le.set("page", String(z)), Le.set("limit", String(Q));
        const me = await fetch(`/api/riders?${Le.toString()}`, { credentials: "include" });
        if (me.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!me.ok) throw new Error("Failed to load riders");
        const Ve = await me.json();
        Y && (m(Array.isArray(Ve.riders) ? Ve.riders : []), G({ total: ((ze = Ve.meta) == null ? void 0 : ze.total) || 0, page: ((K = Ve.meta) == null ? void 0 : K.page) || 1, limit: ((Ae = Ve.meta) == null ? void 0 : Ae.limit) || Q, pages: ((Oe = Ve.meta) == null ? void 0 : Oe.pages) || 1 }));
      } catch (Le) {
        Y && H(Le.message || "Failed to load riders");
      } finally {
        Y && S(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, [h, C, N, z, Q]);
  const ue = T.useMemo(() => c.filter((Y) => {
    if (h && !Y.name.toLowerCase().includes(h.toLowerCase().trim()) || C !== "all" && Y.status !== C || f !== "all" && String(Y.id) !== String(f)) return !1;
    if (N !== "all") {
      const ze = parseInt(Y.lastActiveDays, 10) || 9999, K = parseInt(N, 10);
      if (!(ze <= K)) return !1;
    }
    return !0;
  }), [c, h, C, f, N]);
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => J(!0), children: "Create Rider" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (Y) => {
          g(Y.target.value), se(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: N, onChange: (Y) => {
          R(Y.target.value), se(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: f, onChange: (Y) => A(Y.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          c.map((Y) => /* @__PURE__ */ d.jsxDEV("option", { value: Y.id, children: Y.name }, Y.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 83,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: C, onChange: (Y) => {
          D(Y.target.value), se(1);
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
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: Q, onChange: (Y) => {
        le(parseInt(Y.target.value, 10)), se(1);
      }, children: [10, 20, 50, 100].map((Y) => /* @__PURE__ */ d.jsxDEV("option", { value: Y, children: [
        Y,
        "/page"
      ] }, Y, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 92,
        columnNumber: 39
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 91,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => J(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 94,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 70,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: [
      ae && /* @__PURE__ */ d.jsxDEV(c_, { onClose: () => J(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 99,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 104,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Total KM Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 105,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Delivery Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 106,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Commission Earned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 107,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 103,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 102,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("tbody", { children: [
          O && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 112,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 112,
            columnNumber: 17
          }, this),
          !O && M && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "auth-error", children: M }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 115,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 115,
            columnNumber: 17
          }, this),
          !O && !M && ue.map((Y) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": Y.id, "data-status": Y.status, "data-last-days": Y.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { href: `/riders/${Y.id}`, children: Y.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 119,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 119,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              Y.totalKm,
              " ",
              /* @__PURE__ */ d.jsxDEV("span", { className: "rc-km-unit", children: "km" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 120,
                columnNumber: 57
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 120,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-progress", children: [
              /* @__PURE__ */ d.jsxDEV("progress", { max: "100", value: Y.performance, className: "rc-progress-bar" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 123,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ d.jsxDEV("span", { className: "rc-progress-value", children: Y.performance }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 124,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 122,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 121,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
              "$",
              Y.commissionUsd
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 127,
              columnNumber: 19
            }, this)
          ] }, Y.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 118,
            columnNumber: 17
          }, this)),
          !O && !M && ue.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 131,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 131,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 110,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 97,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: P.page <= 1 || O, onClick: () => se((Y) => Math.max(1, Y - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 139,
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
        lineNumber: 140,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: P.page >= P.pages || O, onClick: () => se((Y) => Math.min(P.pages, Y + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 141,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 138,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 137,
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
  const { id: c } = h1(), [m, h] = T.useState(null), [g, N] = T.useState(!0), [R, f] = T.useState("");
  if (T.useEffect(() => {
    let O = !0;
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
        O && h(M);
      } catch (S) {
        O && f(S.message || "Failed to load rider");
      } finally {
        O && N(!1);
      }
    })(), () => {
      O = !1;
    };
  }, [c]), g)
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
  if (R)
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
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
  const { rider: A, metrics: C, history: D } = m;
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
      /* @__PURE__ */ d.jsxDEV("tbody", { children: (D || []).map((O, S) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: O.date }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: O.deliveries }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 80,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: [
          O.avgTime,
          " mins"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 81,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
          O.distanceKm,
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
  const [c, m] = T.useState([]), [h, g] = T.useState(""), [N, R] = T.useState("all"), [f, A] = T.useState(1), [C, D] = T.useState(20), [O, S] = T.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [M, H] = T.useState(""), [z, se] = T.useState(""), [Q, le] = T.useState(!0), [P, G] = T.useState(""), [ae, J] = T.useState(""), [ue, Y] = T.useState(!0);
  T.useEffect(() => {
    let K = !0;
    return (async () => {
      var Ae, Oe, Le, me;
      le(!0), G(""), J("");
      try {
        const Ve = new URLSearchParams();
        h && Ve.set("q", h), N && N !== "all" && Ve.set("status", N), M && Ve.set("created_at_min", M), z && Ve.set("created_at_max", z), Ve.set("page", String(f)), Ve.set("limit", String(C));
        const Xe = await fetch(`/api/orders?${Ve.toString()}`, { credentials: "include" });
        if (Xe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Xe.ok) throw new Error("Failed to load orders");
        const Je = await Xe.json();
        K && (m(Array.isArray(Je.orders) ? Je.orders : []), J(Je.shopifyError || ""), Y(!!Je.shopifyConfigured), S({ total: ((Ae = Je.meta) == null ? void 0 : Ae.total) || 0, page: ((Oe = Je.meta) == null ? void 0 : Oe.page) || 1, limit: ((Le = Je.meta) == null ? void 0 : Le.limit) || C, pages: ((me = Je.meta) == null ? void 0 : me.pages) || 1 }));
      } catch (Ve) {
        K && G(Ve.message || "Failed to load orders");
      } finally {
        K && le(!1);
      }
    })(), () => {
      K = !1;
    };
  }, [h, N, f, C, M, z]);
  const ze = T.useMemo(() => c, [c]);
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
          g(K.target.value), A(1);
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
          R(K), A(1);
        }, "data-filter": K, children: K === "all" ? "All" : K.replace("-", " ") }, K, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 72,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-select rc-chip", type: "date", value: M, onChange: (K) => {
          H(K.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-select rc-chip", type: "date", value: z, onChange: (K) => {
          se(K.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: C, onChange: (K) => {
          D(parseInt(K.target.value, 10)), A(1);
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
    !ue && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 85,
      columnNumber: 11
    }, this),
    ae && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ae }, void 0, !1, {
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
        Q && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 103,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 103,
          columnNumber: 17
        }, this),
        !Q && P && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: P }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 106,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 106,
          columnNumber: 17
        }, this),
        !Q && !P && ze.map((K, Ae) => {
          var je, jt;
          const Oe = p_(K), Le = ((je = K.customer) == null ? void 0 : je.first_name) || "", me = ((jt = K.customer) == null ? void 0 : jt.last_name) || "", Ve = K.shipping_address && `${K.shipping_address.address1 || ""} ${K.shipping_address.city || ""}${K.shipping_address.province ? `, ${K.shipping_address.province}` : ""}${K.shipping_address.country ? `, ${K.shipping_address.country}` : ""}` || "-", Xe = Oe === "new" ? "Assign" : Oe === "assigned" ? "View" : Oe === "in-transit" ? "Track" : "Details", Je = K.name || K.order_number || K.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Oe, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              Je
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              Le,
              " ",
              me
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: Ve }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 119,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Oe}`, children: Oe.replace("-", " ") }, void 0, !1, {
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
          ] }, Je || Ae, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 116,
            columnNumber: 19
          }, this);
        }),
        !Q && !P && ze.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || Q, onClick: () => A((K) => Math.max(1, K - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 134,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        O.page,
        " of ",
        O.pages,
        " • ",
        O.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 135,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || Q, onClick: () => A((K) => Math.min(O.pages, K + 1)), children: "Next" }, void 0, !1, {
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
  const [c, m] = T.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, g] = T.useState([]), [N, R] = T.useState(!1), [f, A] = T.useState(!0), [C, D] = T.useState("");
  return T.useEffect(() => {
    let O = !0;
    return (async () => {
      A(!0), D("");
      try {
        const S = await fetch("/api/reports", { credentials: "include" });
        if (S.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!S.ok) throw new Error("Failed to load reports");
        const M = await S.json();
        O && (m(M.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(M.deliveries) ? M.deliveries : []));
      } catch (S) {
        O && D(S.message || "Failed to load reports");
      } finally {
        O && A(!1);
      }
    })(), () => {
      O = !1;
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: N, onChange: (O) => R(O.target.checked) }, void 0, !1, {
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
          !f && !C && h.map((O, S) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              O.orderNumber || O.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: O.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: O.expectedMinutes != null ? `${O.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: O.durationMins != null ? `${O.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: O.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, O.orderId || S, !0, {
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
function h_() {
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
function y_({ orderId: c, onClose: m, onAssigned: h }) {
  const [g, N] = T.useState([]), [R, f] = T.useState(!0), [A, C] = T.useState(""), [D, O] = T.useState(null);
  T.useEffect(() => {
    let M = !0;
    return (async () => {
      f(!0), C("");
      try {
        const H = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (H.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!H.ok) throw new Error("Failed to load riders");
        const z = await H.json();
        M && N(Array.isArray(z.riders) ? z.riders : z.riders || []);
      } catch (H) {
        M && C(H.message || "Failed to load riders");
      } finally {
        M && f(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []);
  async function S(M) {
    if (!(!c || !M)) {
      O(M);
      try {
        const H = await fetch(`/api/orders/${encodeURIComponent(c)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: M })
        });
        if (H.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const z = await H.json().catch(() => null);
        if (!H.ok) throw new Error(z && z.error ? z.error : "Assign failed");
        h && h({ orderId: c, riderId: M }), m();
      } catch (H) {
        alert(H.message || "Failed to assign rider");
      } finally {
        O(null);
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
            /* @__PURE__ */ d.jsxDEV("td", { children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-assign", onClick: () => S(M.id), disabled: D && D !== M.id, children: D === M.id ? "Assigning…" : "Assign" }, void 0, !1, {
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
function g_() {
  const [c, m] = T.useState([]), [h, g] = T.useState(!0), [N, R] = T.useState("");
  T.useEffect(() => {
    let z = !0;
    return (async () => {
      g(!0), R("");
      try {
        const se = new URLSearchParams();
        se.set("limit", "25");
        const Q = await fetch(`/api/orders?${se.toString()}`, { credentials: "include" });
        if (Q.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Q.ok) throw new Error("Failed to load orders");
        const le = await Q.json();
        z && m(Array.isArray(le.orders) ? le.orders : []);
      } catch (se) {
        z && R(se.message || "Failed to load orders");
      } finally {
        z && g(!1);
      }
    })(), () => {
      z = !1;
    };
  }, []);
  function f(z) {
    return z && z.assignment || (Array.isArray(z.tags) ? z.tags : typeof z.tags == "string" ? z.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : z.fulfillment_status === "fulfilled" ? "delivered" : z.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  const [A, C] = T.useState(!1), [D, O] = T.useState(null);
  function S(z) {
    O(z), C(!0);
  }
  function M() {
    O(null), C(!1);
  }
  function H() {
    window.location.reload();
  }
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 54,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 53,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: h ? "…" : c.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 59,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 60,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 58,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 62,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 57,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 52,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 70,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 71,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 75,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 76,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 69,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 68,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        h && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 80,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 80,
          columnNumber: 28
        }, this),
        !h && N && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: N }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 81,
          columnNumber: 42
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 81,
          columnNumber: 38
        }, this),
        !h && !N && c.map((z, se) => {
          var K, Ae;
          const Q = f(z), le = ((K = z.customer) == null ? void 0 : K.first_name) || "", P = ((Ae = z.customer) == null ? void 0 : Ae.last_name) || "", G = z.shipping_address && `${z.shipping_address.address1 || ""} ${z.shipping_address.city || ""}${z.shipping_address.province ? `, ${z.shipping_address.province}` : ""}${z.shipping_address.country ? `, ${z.shipping_address.country}` : ""}` || "-", ae = z.name || z.order_number || z.id || se, J = String(z.id || z.name || z.order_number || se).replace(/^#+/, ""), ue = z.created_at ? new Date(z.created_at) : null, Y = ue ? ue.toLocaleDateString() : "-", ze = ue ? ue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Q, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: ae && String(ae).startsWith("#") ? ae : `#${ae}` }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 94,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: [
              le,
              " ",
              P
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: G }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 96,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Q}`, children: Q.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 97,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 97,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 98,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: ze }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 99,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => S(J), children: "Manage" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 100,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 100,
              columnNumber: 21
            }, this)
          ] }, J, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 93,
            columnNumber: 19
          }, this);
        }),
        !h && !N && c.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 104,
          columnNumber: 66
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 104,
          columnNumber: 62
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 79,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 67,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 66,
      columnNumber: 9
    }, this),
    A && D && /* @__PURE__ */ d.jsxDEV(y_, { orderId: D, onClose: M, onAssigned: H }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 109,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 51,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}
function b_() {
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
    /* @__PURE__ */ d.jsxDEV(er, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(f_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(d_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(m_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/customers", element: /* @__PURE__ */ d.jsxDEV(h_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(er, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(g_, {}, void 0, !1, {
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
  dE(c).render(/* @__PURE__ */ d.jsxDEV(b_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", lE) : lE();
