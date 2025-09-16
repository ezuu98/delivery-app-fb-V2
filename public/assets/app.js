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
function z1(s) {
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
    var h = "18.3.1", g = Symbol.for("react.element"), b = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), te = Symbol.iterator, ue = "@@iterator";
    function $(c) {
      if (c === null || typeof c != "object")
        return null;
      var y = te && c[te] || c[ue];
      return typeof y == "function" ? y : null;
    }
    var Q = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, q = {
      transition: null
    }, P = {
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
    }, B = {}, Ie = null;
    function Se(c) {
      Ie = c;
    }
    B.setExtraStackFrame = function(c) {
      Ie = c;
    }, B.getCurrentStack = null, B.getStackAddendum = function() {
      var c = "";
      Ie && (c += Ie);
      var y = B.getCurrentStack;
      return y && (c += y() || ""), c;
    };
    var Fe = !1, Me = !1, Y = !1, de = !1, _e = !1, He = {
      ReactCurrentDispatcher: Q,
      ReactCurrentBatchConfig: q,
      ReactCurrentOwner: Z
    };
    He.ReactDebugCurrentFrame = B, He.ReactCurrentActQueue = P;
    function at(c) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        yt("warn", c, L);
      }
    }
    function Ee(c) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        yt("error", c, L);
      }
    }
    function yt(c, y, L) {
      {
        var k = He.ReactDebugCurrentFrame, X = k.getStackAddendum();
        X !== "" && (y += "%s", L = L.concat([X]));
        var be = L.map(function(ce) {
          return String(ce);
        });
        be.unshift("Warning: " + y), Function.prototype.apply.call(console[c], console, be);
      }
    }
    var pt = {};
    function Pn(c, y) {
      {
        var L = c.constructor, k = L && (L.displayName || L.name) || "ReactClass", X = k + "." + y;
        if (pt[X])
          return;
        Ee("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", y, k), pt[X] = !0;
      }
    }
    var ea = {
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
        Pn(c, "forceUpdate");
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
        Pn(c, "replaceState");
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
        Pn(c, "setState");
      }
    }, Bt = Object.assign, pa = {};
    Object.freeze(pa);
    function Nn(c, y, L) {
      this.props = c, this.context = y, this.refs = pa, this.updater = L || ea;
    }
    Nn.prototype.isReactComponent = {}, Nn.prototype.setState = function(c, y) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, c, y, "setState");
    }, Nn.prototype.forceUpdate = function(c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    };
    {
      var er = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, ka = function(c, y) {
        Object.defineProperty(Nn.prototype, c, {
          get: function() {
            at("%s(...) is deprecated in plain JavaScript React classes. %s", y[0], y[1]);
          }
        });
      };
      for (var Kt in er)
        er.hasOwnProperty(Kt) && ka(Kt, er[Kt]);
    }
    function $n() {
    }
    $n.prototype = Nn.prototype;
    function Xt(c, y, L) {
      this.props = c, this.context = y, this.refs = pa, this.updater = L || ea;
    }
    var Jt = Xt.prototype = new $n();
    Jt.constructor = Xt, Bt(Jt, Nn.prototype), Jt.isPureReactComponent = !0;
    function Zt() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var Vn = Array.isArray;
    function Pt(c) {
      return Vn(c);
    }
    function En(c) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, L = y && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return L;
      }
    }
    function $t(c) {
      try {
        return Yt(c), !1;
      } catch {
        return !0;
      }
    }
    function Yt(c) {
      return "" + c;
    }
    function ta(c) {
      if ($t(c))
        return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(c)), Yt(c);
    }
    function tr(c, y, L) {
      var k = c.displayName;
      if (k)
        return k;
      var X = y.displayName || y.name || "";
      return X !== "" ? L + "(" + X + ")" : L;
    }
    function ma(c) {
      return c.displayName || "Context";
    }
    function Mn(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
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
            return ma(y) + ".Consumer";
          case C:
            var L = c;
            return ma(L._context) + ".Provider";
          case _:
            return tr(c, c.render, "ForwardRef");
          case F:
            var k = c.displayName || null;
            return k !== null ? k : Mn(c.type) || "Memo";
          case K: {
            var X = c, be = X._payload, ce = X._init;
            try {
              return Mn(ce(be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var fn = Object.prototype.hasOwnProperty, en = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, xn, Ua, _t;
    _t = {};
    function Sn(c) {
      if (fn.call(c, "ref")) {
        var y = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function An(c) {
      if (fn.call(c, "key")) {
        var y = Object.getOwnPropertyDescriptor(c, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function _r(c, y) {
      var L = function() {
        xn || (xn = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(c, "key", {
        get: L,
        configurable: !0
      });
    }
    function nr(c, y) {
      var L = function() {
        Ua || (Ua = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(c, "ref", {
        get: L,
        configurable: !0
      });
    }
    function ee(c) {
      if (typeof c.ref == "string" && Z.current && c.__self && Z.current.stateNode !== c.__self) {
        var y = Mn(Z.current.type);
        _t[y] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y, c.ref), _t[y] = !0);
      }
    }
    var me = function(c, y, L, k, X, be, ce) {
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
        value: X
      }), Object.freeze && (Object.freeze(Te.props), Object.freeze(Te)), Te;
    };
    function Ve(c, y, L) {
      var k, X = {}, be = null, ce = null, Te = null, Be = null;
      if (y != null) {
        Sn(y) && (ce = y.ref, ee(y)), An(y) && (ta(y.key), be = "" + y.key), Te = y.__self === void 0 ? null : y.__self, Be = y.__source === void 0 ? null : y.__source;
        for (k in y)
          fn.call(y, k) && !en.hasOwnProperty(k) && (X[k] = y[k]);
      }
      var Ze = arguments.length - 2;
      if (Ze === 1)
        X.children = L;
      else if (Ze > 1) {
        for (var lt = Array(Ze), ot = 0; ot < Ze; ot++)
          lt[ot] = arguments[ot + 2];
        Object.freeze && Object.freeze(lt), X.children = lt;
      }
      if (c && c.defaultProps) {
        var ke = c.defaultProps;
        for (k in ke)
          X[k] === void 0 && (X[k] = ke[k]);
      }
      if (be || ce) {
        var vt = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
        be && _r(X, vt), ce && nr(X, vt);
      }
      return me(c, be, ce, Te, Be, Z.current, X);
    }
    function Je(c, y) {
      var L = me(c.type, y, c.ref, c._self, c._source, c._owner, c.props);
      return L;
    }
    function st(c, y, L) {
      if (c == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
      var k, X = Bt({}, c.props), be = c.key, ce = c.ref, Te = c._self, Be = c._source, Ze = c._owner;
      if (y != null) {
        Sn(y) && (ce = y.ref, Ze = Z.current), An(y) && (ta(y.key), be = "" + y.key);
        var lt;
        c.type && c.type.defaultProps && (lt = c.type.defaultProps);
        for (k in y)
          fn.call(y, k) && !en.hasOwnProperty(k) && (y[k] === void 0 && lt !== void 0 ? X[k] = lt[k] : X[k] = y[k]);
      }
      var ot = arguments.length - 2;
      if (ot === 1)
        X.children = L;
      else if (ot > 1) {
        for (var ke = Array(ot), vt = 0; vt < ot; vt++)
          ke[vt] = arguments[vt + 2];
        X.children = ke;
      }
      return me(c.type, be, ce, Te, Be, Ze, X);
    }
    function gt(c) {
      return typeof c == "object" && c !== null && c.$$typeof === g;
    }
    var bt = ".", dn = ":";
    function Et(c) {
      var y = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, k = c.replace(y, function(X) {
        return L[X];
      });
      return "$" + k;
    }
    var rt = !1, xt = /\/+/g;
    function va(c) {
      return c.replace(xt, "$&/");
    }
    function ha(c, y) {
      return typeof c == "object" && c !== null && c.key != null ? (ta(c.key), Et("" + c.key)) : y.toString(36);
    }
    function na(c, y, L, k, X) {
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
        var Te = c, Be = X(Te), Ze = k === "" ? bt + ha(Te, 0) : k;
        if (Pt(Be)) {
          var lt = "";
          Ze != null && (lt = va(Ze) + "/"), na(Be, y, lt, "", function(Cf) {
            return Cf;
          });
        } else Be != null && (gt(Be) && (Be.key && (!Te || Te.key !== Be.key) && ta(Be.key), Be = Je(
          Be,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Be.key && (!Te || Te.key !== Be.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            va("" + Be.key) + "/"
          ) : "") + Ze
        )), y.push(Be));
        return 1;
      }
      var ot, ke, vt = 0, Dt = k === "" ? bt : k + dn;
      if (Pt(c))
        for (var bi = 0; bi < c.length; bi++)
          ot = c[bi], ke = Dt + ha(ot, bi), vt += na(ot, y, L, ke, X);
      else {
        var go = $(c);
        if (typeof go == "function") {
          var lr = c;
          go === lr.entries && (rt || at("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rt = !0);
          for (var bo = go.call(lr), No, Rf = 0; !(No = bo.next()).done; )
            ot = No.value, ke = Dt + ha(ot, Rf++), vt += na(ot, y, L, ke, X);
        } else if (be === "object") {
          var ps = String(c);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function ar(c, y, L) {
      if (c == null)
        return c;
      var k = [], X = 0;
      return na(c, k, "", "", function(be) {
        return y.call(L, be, X++);
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
      if (!gt(c))
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
        $$typeof: C,
        _context: y
      };
      var L = !1, k = !1, X = !1;
      {
        var be = {
          $$typeof: T,
          _context: y
        };
        Object.defineProperties(be, {
          Provider: {
            get: function() {
              return k || (k = !0, Ee("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), y.Provider;
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
              return L || (L = !0, Ee("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), y.Consumer;
            }
          },
          displayName: {
            get: function() {
              return y.displayName;
            },
            set: function(ce) {
              X || (at("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ce), X = !0);
            }
          }
        }), y.Consumer = be;
      }
      return y._currentRenderer = null, y._currentRenderer2 = null, y;
    }
    var ya = -1, aa = 0, Yn = 1, za = 2;
    function fi(c) {
      if (c._status === ya) {
        var y = c._result, L = y();
        if (L.then(function(be) {
          if (c._status === aa || c._status === ya) {
            var ce = c;
            ce._status = Yn, ce._result = be;
          }
        }, function(be) {
          if (c._status === aa || c._status === ya) {
            var ce = c;
            ce._status = za, ce._result = be;
          }
        }), c._status === ya) {
          var k = c;
          k._status = aa, k._result = L;
        }
      }
      if (c._status === Yn) {
        var X = c._result;
        return X === void 0 && Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, X), "default" in X || Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, X), X.default;
      } else
        throw c._result;
    }
    function N(c) {
      var y = {
        // We use these fields to store the result.
        _status: ya,
        _result: c
      }, L = {
        $$typeof: K,
        _payload: y,
        _init: fi
      };
      {
        var k, X;
        Object.defineProperties(L, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return k;
            },
            set: function(be) {
              Ee("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), k = be, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return X;
            },
            set: function(be) {
              Ee("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), X = be, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function G(c) {
      c != null && c.$$typeof === F ? Ee("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof c != "function" ? Ee("forwardRef requires a render function but was given %s.", c === null ? "null" : typeof c) : c.length !== 0 && c.length !== 2 && Ee("forwardRef render functions accept exactly two parameters: props and ref. %s", c.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), c != null && (c.defaultProps != null || c.propTypes != null) && Ee("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
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
      return !!(typeof c == "string" || typeof c == "function" || c === R || c === A || _e || c === f || c === S || c === M || de || c === fe || Fe || Me || Y || typeof c == "object" && c !== null && (c.$$typeof === K || c.$$typeof === F || c.$$typeof === C || c.$$typeof === T || c.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === ne || c.getModuleId !== void 0));
    }
    function ze(c, y) {
      ve(c) || Ee("memo: The first argument must be a component. Instead received: %s", c === null ? "null" : typeof c);
      var L = {
        $$typeof: F,
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
          set: function(X) {
            k = X, !c.name && !c.displayName && (c.displayName = X);
          }
        });
      }
      return L;
    }
    function Re() {
      var c = Q.current;
      return c === null && Ee(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), c;
    }
    function Oe(c) {
      var y = Re();
      if (c._context !== void 0) {
        var L = c._context;
        L.Consumer === c ? Ee("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === c && Ee("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return y.useContext(c);
    }
    function ye(c) {
      var y = Re();
      return y.useState(c);
    }
    function Ot(c, y, L) {
      var k = Re();
      return k.useReducer(c, y, L);
    }
    function ct(c) {
      var y = Re();
      return y.useRef(c);
    }
    function ft(c, y) {
      var L = Re();
      return L.useEffect(c, y);
    }
    function pn(c, y) {
      var L = Re();
      return L.useInsertionEffect(c, y);
    }
    function Fa(c, y) {
      var L = Re();
      return L.useLayoutEffect(c, y);
    }
    function ga(c, y) {
      var L = Re();
      return L.useCallback(c, y);
    }
    function Lt(c, y) {
      var L = Re();
      return L.useMemo(c, y);
    }
    function di(c, y, L) {
      var k = Re();
      return k.useImperativeHandle(c, y, L);
    }
    function ba(c, y) {
      {
        var L = Re();
        return L.useDebugValue(c, y);
      }
    }
    function Ae() {
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
    function Ha() {
      {
        if (Or--, Or === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Bt({}, c, {
              value: ao
            }),
            info: Bt({}, c, {
              value: ro
            }),
            warn: Bt({}, c, {
              value: io
            }),
            error: Bt({}, c, {
              value: lo
            }),
            group: Bt({}, c, {
              value: oo
            }),
            groupCollapsed: Bt({}, c, {
              value: rs
            }),
            groupEnd: Bt({}, c, {
              value: is
            })
          });
        }
        Or < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = He.ReactCurrentDispatcher, Lr;
    function Zi(c, y, L) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (X) {
            var k = X.stack.trim().match(/\n( *(at )?)/);
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
      var X = Error.prepareStackTrace;
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
            } catch (Dt) {
              k = Dt;
            }
            Reflect.construct(c, [], ce);
          } else {
            try {
              ce.call();
            } catch (Dt) {
              k = Dt;
            }
            c.call(ce.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Dt) {
            k = Dt;
          }
          c();
        }
      } catch (Dt) {
        if (Dt && k && typeof Dt.stack == "string") {
          for (var Te = Dt.stack.split(`
`), Be = k.stack.split(`
`), Ze = Te.length - 1, lt = Be.length - 1; Ze >= 1 && lt >= 0 && Te[Ze] !== Be[lt]; )
            lt--;
          for (; Ze >= 1 && lt >= 0; Ze--, lt--)
            if (Te[Ze] !== Be[lt]) {
              if (Ze !== 1 || lt !== 1)
                do
                  if (Ze--, lt--, lt < 0 || Te[Ze] !== Be[lt]) {
                    var ot = `
` + Te[Ze].replace(" at new ", " at ");
                    return c.displayName && ot.includes("<anonymous>") && (ot = ot.replace("<anonymous>", c.displayName)), typeof c == "function" && el.set(c, ot), ot;
                  }
                while (Ze >= 1 && lt >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = be, Ha(), Error.prepareStackTrace = X;
      }
      var ke = c ? c.displayName || c.name : "", vt = ke ? Zi(ke) : "";
      return typeof c == "function" && el.set(c, vt), vt;
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
          case F:
            return hi(c.type, y, L);
          case K: {
            var k = c, X = k._payload, be = k._init;
            try {
              return hi(be(X), y, L);
            } catch {
            }
          }
        }
      return "";
    }
    var os = {}, fo = He.ReactDebugCurrentFrame;
    function We(c) {
      if (c) {
        var y = c._owner, L = hi(c.type, c._source, y ? y.type : null);
        fo.setExtraStackFrame(L);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(c, y, L, k, X) {
      {
        var be = Function.call.bind(fn);
        for (var ce in c)
          if (be(c, ce)) {
            var Te = void 0;
            try {
              if (typeof c[ce] != "function") {
                var Be = Error((k || "React class") + ": " + L + " type `" + ce + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[ce] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Be.name = "Invariant Violation", Be;
              }
              Te = c[ce](y, ce, k, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Ze) {
              Te = Ze;
            }
            Te && !(Te instanceof Error) && (We(X), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", k || "React class", L, ce, typeof Te), We(null)), Te instanceof Error && !(Te.message in os) && (os[Te.message] = !0, We(X), Ee("Failed %s type: %s", L, Te.message), We(null));
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
        var c = Mn(Z.current.type);
        if (c)
          return `

Check the render method of \`` + c + "`.";
      }
      return "";
    }
    function Rn(c) {
      if (c !== void 0) {
        var y = c.fileName.replace(/^.*[\\\/]/, ""), L = c.lineNumber;
        return `

Check your code at ` + y + ":" + L + ".";
      }
      return "";
    }
    function yi(c) {
      return c != null ? Rn(c.__source) : "";
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
    function It(c, y) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var L = Ef(y);
        if (!Vr[L]) {
          Vr[L] = !0;
          var k = "";
          c && c._owner && c._owner !== Z.current && (k = " It was passed a child from " + Mn(c._owner.type) + "."), rr(c), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, k), rr(null);
        }
      }
    }
    function mt(c, y) {
      if (typeof c == "object") {
        if (Pt(c))
          for (var L = 0; L < c.length; L++) {
            var k = c[L];
            gt(k) && It(k, y);
          }
        else if (gt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var X = $(c);
          if (typeof X == "function" && X !== c.entries)
            for (var be = X.call(c), ce; !(ce = be.next()).done; )
              gt(ce.value) && It(ce.value, y);
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
        y.$$typeof === F))
          L = y.propTypes;
        else
          return;
        if (L) {
          var k = Mn(y);
          Nf(L, c.props, "prop", k, c);
        } else if (y.PropTypes !== void 0 && !we) {
          we = !0;
          var X = Mn(y);
          Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ra(c) {
      {
        for (var y = Object.keys(c.props), L = 0; L < y.length; L++) {
          var k = y[L];
          if (k !== "children" && k !== "key") {
            rr(c), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", k), rr(null);
            break;
          }
        }
        c.ref !== null && (rr(c), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function Cn(c, y, L) {
      var k = ve(c);
      if (!k) {
        var X = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (X += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var be = yi(y);
        be ? X += be : X += po();
        var ce;
        c === null ? ce = "null" : Pt(c) ? ce = "array" : c !== void 0 && c.$$typeof === g ? (ce = "<" + (Mn(c.type) || "Unknown") + " />", X = " Did you accidentally export a JSX literal instead of a component?") : ce = typeof c, Ee("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ce, X);
      }
      var Te = Ve.apply(this, arguments);
      if (Te == null)
        return Te;
      if (k)
        for (var Be = 2; Be < arguments.length; Be++)
          mt(arguments[Be], c);
      return c === R ? ra(Te) : us(Te), Te;
    }
    var Na = !1;
    function xf(c) {
      var y = Cn.bind(null, c);
      return y.type = c, Na || (Na = !0, at("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(y, "type", {
        enumerable: !1,
        get: function() {
          return at("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: c
          }), c;
        }
      }), y;
    }
    function mo(c, y, L) {
      for (var k = st.apply(this, arguments), X = 2; X < arguments.length; X++)
        mt(arguments[X], k.type);
      return us(k), k;
    }
    function ss(c, y) {
      var L = q.transition;
      q.transition = {};
      var k = q.transition;
      q.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        c();
      } finally {
        if (q.transition = L, L === null && k._updatedFibers) {
          var X = k._updatedFibers.size;
          X > 10 && at("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), k._updatedFibers.clear();
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
          tl = function(X) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && Ee("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var be = new MessageChannel();
            be.port1.onmessage = X, be.port2.postMessage(void 0);
          };
        }
      return tl(c);
    }
    var Mr = 0, gi = !1;
    function ho(c) {
      {
        var y = Mr;
        Mr++, P.current === null && (P.current = []);
        var L = P.isBatchingLegacy, k;
        try {
          if (P.isBatchingLegacy = !0, k = c(), !L && P.didScheduleLegacyUpdate) {
            var X = P.current;
            X !== null && (P.didScheduleLegacyUpdate = !1, rl(X));
          }
        } catch (ke) {
          throw ir(y), ke;
        } finally {
          P.isBatchingLegacy = L;
        }
        if (k !== null && typeof k == "object" && typeof k.then == "function") {
          var be = k, ce = !1, Te = {
            then: function(ke, vt) {
              ce = !0, be.then(function(Dt) {
                ir(y), Mr === 0 ? nl(Dt, ke, vt) : ke(Dt);
              }, function(Dt) {
                ir(y), vt(Dt);
              });
            }
          };
          return !gi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ce || (gi = !0, Ee("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Te;
        } else {
          var Be = k;
          if (ir(y), Mr === 0) {
            var Ze = P.current;
            Ze !== null && (rl(Ze), P.current = null);
            var lt = {
              then: function(ke, vt) {
                P.current === null ? (P.current = [], nl(Be, ke, vt)) : ke(Be);
              }
            };
            return lt;
          } else {
            var ot = {
              then: function(ke, vt) {
                ke(Be);
              }
            };
            return ot;
          }
        }
      }
    }
    function ir(c) {
      c !== Mr - 1 && Ee("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Mr = c;
    }
    function nl(c, y, L) {
      {
        var k = P.current;
        if (k !== null)
          try {
            rl(k), Sf(function() {
              k.length === 0 ? (P.current = null, y(c)) : nl(c, y, L);
            });
          } catch (X) {
            L(X);
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
    var cs = Cn, fs = mo, yo = xf, ds = {
      map: ar,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    m.Children = ds, m.Component = Nn, m.Fragment = R, m.Profiler = A, m.PureComponent = Xt, m.StrictMode = f, m.Suspense = S, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = He, m.act = ho, m.cloneElement = fs, m.createContext = ci, m.createElement = cs, m.createFactory = yo, m.createRef = Zt, m.forwardRef = G, m.isValidElement = gt, m.lazy = N, m.memo = ze, m.startTransition = ss, m.unstable_act = ho, m.useCallback = ga, m.useContext = Oe, m.useDebugValue = ba, m.useDeferredValue = pi, m.useEffect = ft, m.useId = ns, m.useImperativeHandle = di, m.useInsertionEffect = pn, m.useLayoutEffect = Fa, m.useMemo = Lt, m.useReducer = Ot, m.useRef = ct, m.useState = ye, m.useSyncExternalStore = as, m.useTransition = Ae, m.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var F1 = hf.exports;
sE.exports = F1;
var D = sE.exports;
const H1 = /* @__PURE__ */ z1(D), B1 = /* @__PURE__ */ U1({
  __proto__: null,
  default: H1
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
  var s = D, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), A = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), F = Symbol.for("react.offscreen"), K = Symbol.iterator, fe = "@@iterator";
  function te(N) {
    if (N === null || typeof N != "object")
      return null;
    var G = K && N[K] || N[fe];
    return typeof G == "function" ? G : null;
  }
  var ue = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function $(N) {
    {
      for (var G = arguments.length, ne = new Array(G > 1 ? G - 1 : 0), ve = 1; ve < G; ve++)
        ne[ve - 1] = arguments[ve];
      Q("error", N, ne);
    }
  }
  function Q(N, G, ne) {
    {
      var ve = ue.ReactDebugCurrentFrame, ze = ve.getStackAddendum();
      ze !== "" && (G += "%s", ne = ne.concat([ze]));
      var Re = ne.map(function(Oe) {
        return String(Oe);
      });
      Re.unshift("Warning: " + G), Function.prototype.apply.call(console[N], console, Re);
    }
  }
  var q = !1, P = !1, Z = !1, B = !1, Ie = !1, Se;
  Se = Symbol.for("react.module.reference");
  function Fe(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === R || Ie || N === b || N === T || N === _ || B || N === F || q || P || Z || typeof N == "object" && N !== null && (N.$$typeof === M || N.$$typeof === S || N.$$typeof === f || N.$$typeof === A || N.$$typeof === C || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === Se || N.getModuleId !== void 0));
  }
  function Me(N, G, ne) {
    var ve = N.displayName;
    if (ve)
      return ve;
    var ze = G.displayName || G.name || "";
    return ze !== "" ? ne + "(" + ze + ")" : ne;
  }
  function Y(N) {
    return N.displayName || "Context";
  }
  function de(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
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
          var G = N;
          return Y(G) + ".Consumer";
        case f:
          var ne = N;
          return Y(ne._context) + ".Provider";
        case C:
          return Me(N, N.render, "ForwardRef");
        case S:
          var ve = N.displayName || null;
          return ve !== null ? ve : de(N.type) || "Memo";
        case M: {
          var ze = N, Re = ze._payload, Oe = ze._init;
          try {
            return de(Oe(Re));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var _e = Object.assign, He = 0, at, Ee, yt, pt, Pn, ea, Bt;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function Nn() {
    {
      if (He === 0) {
        at = console.log, Ee = console.info, yt = console.warn, pt = console.error, Pn = console.group, ea = console.groupCollapsed, Bt = console.groupEnd;
        var N = {
          configurable: !0,
          enumerable: !0,
          value: pa,
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
      He++;
    }
  }
  function er() {
    {
      if (He--, He === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: _e({}, N, {
            value: at
          }),
          info: _e({}, N, {
            value: Ee
          }),
          warn: _e({}, N, {
            value: yt
          }),
          error: _e({}, N, {
            value: pt
          }),
          group: _e({}, N, {
            value: Pn
          }),
          groupCollapsed: _e({}, N, {
            value: ea
          }),
          groupEnd: _e({}, N, {
            value: Bt
          })
        });
      }
      He < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var ka = ue.ReactCurrentDispatcher, Kt;
  function $n(N, G, ne) {
    {
      if (Kt === void 0)
        try {
          throw Error();
        } catch (ze) {
          var ve = ze.stack.trim().match(/\n( *(at )?)/);
          Kt = ve && ve[1] || "";
        }
      return `
` + Kt + N;
    }
  }
  var Xt = !1, Jt;
  {
    var Zt = typeof WeakMap == "function" ? WeakMap : Map;
    Jt = new Zt();
  }
  function Vn(N, G) {
    if (!N || Xt)
      return "";
    {
      var ne = Jt.get(N);
      if (ne !== void 0)
        return ne;
    }
    var ve;
    Xt = !0;
    var ze = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Re;
    Re = ka.current, ka.current = null, Nn();
    try {
      if (G) {
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
          } catch (Lt) {
            ve = Lt;
          }
          Reflect.construct(N, [], Oe);
        } else {
          try {
            Oe.call();
          } catch (Lt) {
            ve = Lt;
          }
          N.call(Oe.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Lt) {
          ve = Lt;
        }
        N();
      }
    } catch (Lt) {
      if (Lt && ve && typeof Lt.stack == "string") {
        for (var ye = Lt.stack.split(`
`), Ot = ve.stack.split(`
`), ct = ye.length - 1, ft = Ot.length - 1; ct >= 1 && ft >= 0 && ye[ct] !== Ot[ft]; )
          ft--;
        for (; ct >= 1 && ft >= 0; ct--, ft--)
          if (ye[ct] !== Ot[ft]) {
            if (ct !== 1 || ft !== 1)
              do
                if (ct--, ft--, ft < 0 || ye[ct] !== Ot[ft]) {
                  var pn = `
` + ye[ct].replace(" at new ", " at ");
                  return N.displayName && pn.includes("<anonymous>") && (pn = pn.replace("<anonymous>", N.displayName)), typeof N == "function" && Jt.set(N, pn), pn;
                }
              while (ct >= 1 && ft >= 0);
            break;
          }
      }
    } finally {
      Xt = !1, ka.current = Re, er(), Error.prepareStackTrace = ze;
    }
    var Fa = N ? N.displayName || N.name : "", ga = Fa ? $n(Fa) : "";
    return typeof N == "function" && Jt.set(N, ga), ga;
  }
  function Pt(N, G, ne) {
    return Vn(N, !1);
  }
  function En(N) {
    var G = N.prototype;
    return !!(G && G.isReactComponent);
  }
  function $t(N, G, ne) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return Vn(N, En(N));
    if (typeof N == "string")
      return $n(N);
    switch (N) {
      case T:
        return $n("Suspense");
      case _:
        return $n("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case C:
          return Pt(N.render);
        case S:
          return $t(N.type, G, ne);
        case M: {
          var ve = N, ze = ve._payload, Re = ve._init;
          try {
            return $t(Re(ze), G, ne);
          } catch {
          }
        }
      }
    return "";
  }
  var Yt = Object.prototype.hasOwnProperty, ta = {}, tr = ue.ReactDebugCurrentFrame;
  function ma(N) {
    if (N) {
      var G = N._owner, ne = $t(N.type, N._source, G ? G.type : null);
      tr.setExtraStackFrame(ne);
    } else
      tr.setExtraStackFrame(null);
  }
  function Mn(N, G, ne, ve, ze) {
    {
      var Re = Function.call.bind(Yt);
      for (var Oe in N)
        if (Re(N, Oe)) {
          var ye = void 0;
          try {
            if (typeof N[Oe] != "function") {
              var Ot = Error((ve || "React class") + ": " + ne + " type `" + Oe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[Oe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Ot.name = "Invariant Violation", Ot;
            }
            ye = N[Oe](G, Oe, ve, ne, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ct) {
            ye = ct;
          }
          ye && !(ye instanceof Error) && (ma(ze), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ve || "React class", ne, Oe, typeof ye), ma(null)), ye instanceof Error && !(ye.message in ta) && (ta[ye.message] = !0, ma(ze), $("Failed %s type: %s", ne, ye.message), ma(null));
        }
    }
  }
  var fn = Array.isArray;
  function en(N) {
    return fn(N);
  }
  function xn(N) {
    {
      var G = typeof Symbol == "function" && Symbol.toStringTag, ne = G && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return ne;
    }
  }
  function Ua(N) {
    try {
      return _t(N), !1;
    } catch {
      return !0;
    }
  }
  function _t(N) {
    return "" + N;
  }
  function Sn(N) {
    if (Ua(N))
      return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xn(N)), _t(N);
  }
  var An = ue.ReactCurrentOwner, _r = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, ee, me;
  me = {};
  function Ve(N) {
    if (Yt.call(N, "ref")) {
      var G = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (G && G.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function Je(N) {
    if (Yt.call(N, "key")) {
      var G = Object.getOwnPropertyDescriptor(N, "key").get;
      if (G && G.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function st(N, G) {
    if (typeof N.ref == "string" && An.current && G && An.current.stateNode !== G) {
      var ne = de(An.current.type);
      me[ne] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', de(An.current.type), N.ref), me[ne] = !0);
    }
  }
  function gt(N, G) {
    {
      var ne = function() {
        nr || (nr = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
      };
      ne.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ne,
        configurable: !0
      });
    }
  }
  function bt(N, G) {
    {
      var ne = function() {
        ee || (ee = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
      };
      ne.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ne,
        configurable: !0
      });
    }
  }
  var dn = function(N, G, ne, ve, ze, Re, Oe) {
    var ye = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: m,
      // Built-in properties that belong on the element
      type: N,
      key: G,
      ref: ne,
      props: Oe,
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
      value: ze
    }), Object.freeze && (Object.freeze(ye.props), Object.freeze(ye)), ye;
  };
  function Et(N, G, ne, ve, ze) {
    {
      var Re, Oe = {}, ye = null, Ot = null;
      ne !== void 0 && (Sn(ne), ye = "" + ne), Je(G) && (Sn(G.key), ye = "" + G.key), Ve(G) && (Ot = G.ref, st(G, ze));
      for (Re in G)
        Yt.call(G, Re) && !_r.hasOwnProperty(Re) && (Oe[Re] = G[Re]);
      if (N && N.defaultProps) {
        var ct = N.defaultProps;
        for (Re in ct)
          Oe[Re] === void 0 && (Oe[Re] = ct[Re]);
      }
      if (ye || Ot) {
        var ft = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        ye && gt(Oe, ft), Ot && bt(Oe, ft);
      }
      return dn(N, ye, Ot, ze, ve, An.current, Oe);
    }
  }
  var rt = ue.ReactCurrentOwner, xt = ue.ReactDebugCurrentFrame;
  function va(N) {
    if (N) {
      var G = N._owner, ne = $t(N.type, N._source, G ? G.type : null);
      xt.setExtraStackFrame(ne);
    } else
      xt.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function na(N) {
    return typeof N == "object" && N !== null && N.$$typeof === m;
  }
  function ar() {
    {
      if (rt.current) {
        var N = de(rt.current.type);
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
        var G = N.fileName.replace(/^.*[\\\/]/, ""), ne = N.lineNumber;
        return `

Check your code at ` + G + ":" + ne + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(N) {
    {
      var G = ar();
      if (!G) {
        var ne = typeof N == "string" ? N : N.displayName || N.name;
        ne && (G = `

Check the top-level render call using <` + ne + ">.");
      }
      return G;
    }
  }
  function Xi(N, G) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ne = Ki(G);
      if (si[ne])
        return;
      si[ne] = !0;
      var ve = "";
      N && N._owner && N._owner !== rt.current && (ve = " It was passed a child from " + de(N._owner.type) + "."), va(N), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ne, ve), va(null);
    }
  }
  function ci(N, G) {
    {
      if (typeof N != "object")
        return;
      if (en(N))
        for (var ne = 0; ne < N.length; ne++) {
          var ve = N[ne];
          na(ve) && Xi(ve, G);
        }
      else if (na(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var ze = te(N);
        if (typeof ze == "function" && ze !== N.entries)
          for (var Re = ze.call(N), Oe; !(Oe = Re.next()).done; )
            na(Oe.value) && Xi(Oe.value, G);
      }
    }
  }
  function ya(N) {
    {
      var G = N.type;
      if (G == null || typeof G == "string")
        return;
      var ne;
      if (typeof G == "function")
        ne = G.propTypes;
      else if (typeof G == "object" && (G.$$typeof === C || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      G.$$typeof === S))
        ne = G.propTypes;
      else
        return;
      if (ne) {
        var ve = de(G);
        Mn(ne, N.props, "prop", ve, N);
      } else if (G.PropTypes !== void 0 && !ha) {
        ha = !0;
        var ze = de(G);
        $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ze || "Unknown");
      }
      typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function aa(N) {
    {
      for (var G = Object.keys(N.props), ne = 0; ne < G.length; ne++) {
        var ve = G[ne];
        if (ve !== "children" && ve !== "key") {
          va(N), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ve), va(null);
          break;
        }
      }
      N.ref !== null && (va(N), $("Invalid attribute `ref` supplied to `React.Fragment`."), va(null));
    }
  }
  var Yn = {};
  function za(N, G, ne, ve, ze, Re) {
    {
      var Oe = Fe(N);
      if (!Oe) {
        var ye = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (ye += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Ot = no(ze);
        Ot ? ye += Ot : ye += ar();
        var ct;
        N === null ? ct = "null" : en(N) ? ct = "array" : N !== void 0 && N.$$typeof === m ? (ct = "<" + (de(N.type) || "Unknown") + " />", ye = " Did you accidentally export a JSX literal instead of a component?") : ct = typeof N, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ct, ye);
      }
      var ft = Et(N, G, ne, ze, Re);
      if (ft == null)
        return ft;
      if (Oe) {
        var pn = G.children;
        if (pn !== void 0)
          if (ve)
            if (en(pn)) {
              for (var Fa = 0; Fa < pn.length; Fa++)
                ci(pn[Fa], N);
              Object.freeze && Object.freeze(pn);
            } else
              $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(pn, N);
      }
      if (Yt.call(G, "key")) {
        var ga = de(N), Lt = Object.keys(G).filter(function(Ae) {
          return Ae !== "key";
        }), di = Lt.length > 0 ? "{key: someKey, " + Lt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Yn[ga + di]) {
          var ba = Lt.length > 0 ? "{" + Lt.join(": ..., ") + ": ...}" : "{}";
          $(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, ga, ba, ga), Yn[ga + di] = !0;
        }
      }
      return N === g ? aa(ft) : ya(ft), ft;
    }
  }
  var fi = za;
  _v.Fragment = g, _v.jsxDEV = fi;
})();
uE.exports = _v;
var d = uE.exports, cE = { exports: {} }, Zn = {}, fE = { exports: {} }, dE = {};
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
    function g(ee, me) {
      var Ve = ee.length;
      ee.push(me), f(ee, me, Ve);
    }
    function b(ee) {
      return ee.length === 0 ? null : ee[0];
    }
    function R(ee) {
      if (ee.length === 0)
        return null;
      var me = ee[0], Ve = ee.pop();
      return Ve !== me && (ee[0] = Ve, A(ee, Ve, 0)), me;
    }
    function f(ee, me, Ve) {
      for (var Je = Ve; Je > 0; ) {
        var st = Je - 1 >>> 1, gt = ee[st];
        if (C(gt, me) > 0)
          ee[st] = me, ee[Je] = gt, Je = st;
        else
          return;
      }
    }
    function A(ee, me, Ve) {
      for (var Je = Ve, st = ee.length, gt = st >>> 1; Je < gt; ) {
        var bt = (Je + 1) * 2 - 1, dn = ee[bt], Et = bt + 1, rt = ee[Et];
        if (C(dn, me) < 0)
          Et < st && C(rt, dn) < 0 ? (ee[Je] = rt, ee[Et] = me, Je = Et) : (ee[Je] = dn, ee[bt] = me, Je = bt);
        else if (Et < st && C(rt, me) < 0)
          ee[Je] = rt, ee[Et] = me, Je = Et;
        else
          return;
      }
    }
    function C(ee, me) {
      var Ve = ee.sortIndex - me.sortIndex;
      return Ve !== 0 ? Ve : ee.id - me.id;
    }
    var T = 1, _ = 2, S = 3, M = 4, F = 5;
    function K(ee, me) {
    }
    var fe = typeof performance == "object" && typeof performance.now == "function";
    if (fe) {
      var te = performance;
      s.unstable_now = function() {
        return te.now();
      };
    } else {
      var ue = Date, $ = ue.now();
      s.unstable_now = function() {
        return ue.now() - $;
      };
    }
    var Q = 1073741823, q = -1, P = 250, Z = 5e3, B = 1e4, Ie = Q, Se = [], Fe = [], Me = 1, Y = null, de = S, _e = !1, He = !1, at = !1, Ee = typeof setTimeout == "function" ? setTimeout : null, yt = typeof clearTimeout == "function" ? clearTimeout : null, pt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Pn(ee) {
      for (var me = b(Fe); me !== null; ) {
        if (me.callback === null)
          R(Fe);
        else if (me.startTime <= ee)
          R(Fe), me.sortIndex = me.expirationTime, g(Se, me);
        else
          return;
        me = b(Fe);
      }
    }
    function ea(ee) {
      if (at = !1, Pn(ee), !He)
        if (b(Se) !== null)
          He = !0, _t(Bt);
        else {
          var me = b(Fe);
          me !== null && Sn(ea, me.startTime - ee);
        }
    }
    function Bt(ee, me) {
      He = !1, at && (at = !1, An()), _e = !0;
      var Ve = de;
      try {
        var Je;
        if (!m) return pa(ee, me);
      } finally {
        Y = null, de = Ve, _e = !1;
      }
    }
    function pa(ee, me) {
      var Ve = me;
      for (Pn(Ve), Y = b(Se); Y !== null && !(Y.expirationTime > Ve && (!ee || tr())); ) {
        var Je = Y.callback;
        if (typeof Je == "function") {
          Y.callback = null, de = Y.priorityLevel;
          var st = Y.expirationTime <= Ve, gt = Je(st);
          Ve = s.unstable_now(), typeof gt == "function" ? Y.callback = gt : Y === b(Se) && R(Se), Pn(Ve);
        } else
          R(Se);
        Y = b(Se);
      }
      if (Y !== null)
        return !0;
      var bt = b(Fe);
      return bt !== null && Sn(ea, bt.startTime - Ve), !1;
    }
    function Nn(ee, me) {
      switch (ee) {
        case T:
        case _:
        case S:
        case M:
        case F:
          break;
        default:
          ee = S;
      }
      var Ve = de;
      de = ee;
      try {
        return me();
      } finally {
        de = Ve;
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
      var Ve = de;
      de = me;
      try {
        return ee();
      } finally {
        de = Ve;
      }
    }
    function ka(ee) {
      var me = de;
      return function() {
        var Ve = de;
        de = me;
        try {
          return ee.apply(this, arguments);
        } finally {
          de = Ve;
        }
      };
    }
    function Kt(ee, me, Ve) {
      var Je = s.unstable_now(), st;
      if (typeof Ve == "object" && Ve !== null) {
        var gt = Ve.delay;
        typeof gt == "number" && gt > 0 ? st = Je + gt : st = Je;
      } else
        st = Je;
      var bt;
      switch (ee) {
        case T:
          bt = q;
          break;
        case _:
          bt = P;
          break;
        case F:
          bt = Ie;
          break;
        case M:
          bt = B;
          break;
        case S:
        default:
          bt = Z;
          break;
      }
      var dn = st + bt, Et = {
        id: Me++,
        callback: me,
        priorityLevel: ee,
        startTime: st,
        expirationTime: dn,
        sortIndex: -1
      };
      return st > Je ? (Et.sortIndex = st, g(Fe, Et), b(Se) === null && Et === b(Fe) && (at ? An() : at = !0, Sn(ea, st - Je))) : (Et.sortIndex = dn, g(Se, Et), !He && !_e && (He = !0, _t(Bt))), Et;
    }
    function $n() {
    }
    function Xt() {
      !He && !_e && (He = !0, _t(Bt));
    }
    function Jt() {
      return b(Se);
    }
    function Zt(ee) {
      ee.callback = null;
    }
    function Vn() {
      return de;
    }
    var Pt = !1, En = null, $t = -1, Yt = h, ta = -1;
    function tr() {
      var ee = s.unstable_now() - ta;
      return !(ee < Yt);
    }
    function ma() {
    }
    function Mn(ee) {
      if (ee < 0 || ee > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ee > 0 ? Yt = Math.floor(1e3 / ee) : Yt = h;
    }
    var fn = function() {
      if (En !== null) {
        var ee = s.unstable_now();
        ta = ee;
        var me = !0, Ve = !0;
        try {
          Ve = En(me, ee);
        } finally {
          Ve ? en() : (Pt = !1, En = null);
        }
      } else
        Pt = !1;
    }, en;
    if (typeof pt == "function")
      en = function() {
        pt(fn);
      };
    else if (typeof MessageChannel < "u") {
      var xn = new MessageChannel(), Ua = xn.port2;
      xn.port1.onmessage = fn, en = function() {
        Ua.postMessage(null);
      };
    } else
      en = function() {
        Ee(fn, 0);
      };
    function _t(ee) {
      En = ee, Pt || (Pt = !0, en());
    }
    function Sn(ee, me) {
      $t = Ee(function() {
        ee(s.unstable_now());
      }, me);
    }
    function An() {
      yt($t), $t = -1;
    }
    var _r = ma, nr = null;
    s.unstable_IdlePriority = F, s.unstable_ImmediatePriority = T, s.unstable_LowPriority = M, s.unstable_NormalPriority = S, s.unstable_Profiling = nr, s.unstable_UserBlockingPriority = _, s.unstable_cancelCallback = Zt, s.unstable_continueExecution = Xt, s.unstable_forceFrameRate = Mn, s.unstable_getCurrentPriorityLevel = Vn, s.unstable_getFirstCallbackNode = Jt, s.unstable_next = er, s.unstable_pauseExecution = $n, s.unstable_requestPaint = _r, s.unstable_runWithPriority = Nn, s.unstable_scheduleCallback = Kt, s.unstable_shouldYield = tr, s.unstable_wrapCallback = ka, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var s = D, m = P1, h = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
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
  var C = 0, T = 1, _ = 2, S = 3, M = 4, F = 5, K = 6, fe = 7, te = 8, ue = 9, $ = 10, Q = 11, q = 12, P = 13, Z = 14, B = 15, Ie = 16, Se = 17, Fe = 18, Me = 19, Y = 21, de = 22, _e = 23, He = 24, at = 25, Ee = !0, yt = !1, pt = !1, Pn = !1, ea = !1, Bt = !0, pa = !0, Nn = !0, er = !0, ka = /* @__PURE__ */ new Set(), Kt = {}, $n = {};
  function Xt(e, t) {
    Jt(e, t), Jt(e + "Capture", t);
  }
  function Jt(e, t) {
    Kt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Kt[e] = t;
    {
      var n = e.toLowerCase();
      $n[n] = e, e === "onDoubleClick" && ($n.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      ka.add(t[a]);
  }
  var Zt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Vn = Object.prototype.hasOwnProperty;
  function Pt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function En(e) {
    try {
      return $t(e), !1;
    } catch {
      return !0;
    }
  }
  function $t(e) {
    return "" + e;
  }
  function Yt(e, t) {
    if (En(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function ta(e) {
    if (En(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  function tr(e, t) {
    if (En(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function ma(e, t) {
    if (En(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function Mn(e) {
    if (En(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  function fn(e) {
    if (En(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  var en = 0, xn = 1, Ua = 2, _t = 3, Sn = 4, An = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", me = new RegExp("^[" + nr + "][" + ee + "]*$"), Ve = {}, Je = {};
  function st(e) {
    return Vn.call(Je, e) ? !0 : Vn.call(Ve, e) ? !1 : me.test(e) ? (Je[e] = !0, !0) : (Ve[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function gt(e, t, n) {
    return t !== null ? t.type === en : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function bt(e, t, n, a) {
    if (n !== null && n.type === en)
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
  function dn(e, t, n, a) {
    if (t === null || typeof t > "u" || bt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case _t:
          return !t;
        case Sn:
          return t === !1;
        case An:
          return isNaN(t);
        case _r:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Et(e) {
    return xt.hasOwnProperty(e) ? xt[e] : null;
  }
  function rt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Ua || t === _t || t === Sn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var xt = {}, va = [
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
    xt[e] = new rt(
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
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0], n = e[1];
    xt[t] = new rt(
      t,
      xn,
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
    xt[e] = new rt(
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
    xt[e] = new rt(
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
    xt[e] = new rt(
      e,
      _t,
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
    xt[e] = new rt(
      e,
      _t,
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
    xt[e] = new rt(
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
    xt[e] = new rt(
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
    xt[e] = new rt(
      e,
      An,
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
  var ha = /[\-\:]([a-z])/g, na = function(e) {
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
    var t = e.replace(ha, na);
    xt[t] = new rt(
      t,
      xn,
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
    var t = e.replace(ha, na);
    xt[t] = new rt(
      t,
      xn,
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
    var t = e.replace(ha, na);
    xt[t] = new rt(
      t,
      xn,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    xt[e] = new rt(
      e,
      xn,
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
  xt[ar] = new rt(
    "xlinkHref",
    xn,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    xt[e] = new rt(
      e,
      xn,
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
      Yt(n, t), a.sanitizeURL && Ki("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Sn) {
        if (e.hasAttribute(i)) {
          var o = e.getAttribute(i);
          return o === "" ? !0 : dn(t, n, a, !1) ? o : o === "" + n ? n : o;
        }
      } else if (e.hasAttribute(i)) {
        if (dn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === _t)
          return n;
        l = e.getAttribute(i);
      }
      return dn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function ci(e, t, n, a) {
    {
      if (!st(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return Yt(n, t), r === "" + n ? n : r;
    }
  }
  function ya(e, t, n, a) {
    var r = Et(t);
    if (!gt(t, r, a)) {
      if (dn(t, n, r, a) && (n = null), a || r === null) {
        if (st(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Yt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var o = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[o] = u === _t ? !1 : "";
        } else
          e[o] = n;
        return;
      }
      var p = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(p);
      else {
        var x = r.type, E;
        x === _t || x === Sn && n === !0 ? E = "" : (Yt(n, p), E = "" + n, r.sanitizeURL && Ki(E.toString())), v ? e.setAttributeNS(v, p, E) : e.setAttribute(p, E);
      }
    }
  }
  var aa = Symbol.for("react.element"), Yn = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), G = Symbol.for("react.provider"), ne = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), ze = Symbol.for("react.suspense"), Re = Symbol.for("react.suspense_list"), Oe = Symbol.for("react.memo"), ye = Symbol.for("react.lazy"), Ot = Symbol.for("react.scope"), ct = Symbol.for("react.debug_trace_mode"), ft = Symbol.for("react.offscreen"), pn = Symbol.for("react.legacy_hidden"), Fa = Symbol.for("react.cache"), ga = Symbol.for("react.tracing_marker"), Lt = Symbol.iterator, di = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Lt && e[Lt] || e[di];
    return typeof t == "function" ? t : null;
  }
  var Ae = Object.assign, pi = 0, ns, as, Or, ao, ro, io, lo;
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
          log: Ae({}, e, {
            value: ns
          }),
          info: Ae({}, e, {
            value: as
          }),
          warn: Ae({}, e, {
            value: Or
          }),
          error: Ae({}, e, {
            value: ao
          }),
          group: Ae({}, e, {
            value: ro
          }),
          groupCollapsed: Ae({}, e, {
            value: io
          }),
          groupEnd: Ae({}, e, {
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
      case ze:
        return Ha("Suspense");
      case Re:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ve:
          return so(e.render);
        case Oe:
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
      case F:
        return Ha(e.type);
      case Ie:
        return Ha("Lazy");
      case P:
        return Ha("Suspense");
      case Me:
        return Ha("SuspenseList");
      case C:
      case _:
      case B:
        return so(e.type);
      case Q:
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
      case Yn:
        return "Portal";
      case N:
        return "Profiler";
      case fi:
        return "StrictMode";
      case ze:
        return "Suspense";
      case Re:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ne:
          var t = e;
          return fo(t) + ".Consumer";
        case G:
          var n = e;
          return fo(n._context) + ".Provider";
        case ve:
          return os(e, e.render, "ForwardRef");
        case Oe:
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
      case He:
        return "Cache";
      case ue:
        var a = n;
        return rr(a) + ".Consumer";
      case $:
        var r = n;
        return rr(r._context) + ".Provider";
      case Fe:
        return "DehydratedFragment";
      case Q:
        return Nf(n, n.render, "ForwardRef");
      case fe:
        return "Fragment";
      case F:
        return n;
      case M:
        return "Portal";
      case S:
        return "Root";
      case K:
        return "Text";
      case Ie:
        return We(n);
      case te:
        return n === fi ? "StrictMode" : "Mode";
      case de:
        return "Offscreen";
      case q:
        return "Profiler";
      case Y:
        return "Scope";
      case P:
        return "Suspense";
      case Me:
        return "SuspenseList";
      case at:
        return "TracingMarker";
      case T:
      case C:
      case Se:
      case _:
      case Z:
      case B:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = h.ReactDebugCurrentFrame, Rn = null, yi = !1;
  function Vr() {
    {
      if (Rn === null)
        return null;
      var e = Rn._debugOwner;
      if (e !== null && typeof e < "u")
        return we(e);
    }
    return null;
  }
  function Ef() {
    return Rn === null ? "" : hi(Rn);
  }
  function It() {
    po.getCurrentStack = null, Rn = null, yi = !1;
  }
  function mt(e) {
    po.getCurrentStack = e === null ? null : Ef, Rn = e, yi = !1;
  }
  function us() {
    return Rn;
  }
  function ra(e) {
    yi = e;
  }
  function Cn(e) {
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
        return fn(e), e;
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
    fn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(o) {
          fn(o), a = "" + o, i.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          fn(o), a = "" + o;
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
    var n = e, a = t.checked, r = Ae({}, t, {
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
  function c(e, t) {
    var n = e, a = t.checked;
    a != null && ya(n, "checked", a, !1);
  }
  function y(e, t) {
    var n = e;
    {
      var a = fs(t);
      !n._wrapperState.controlled && a && !cs && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), cs = !0), n._wrapperState.controlled && !a && !rl && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), rl = !0);
    }
    c(e, t);
    var r = Na(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Cn(r)) : n.value !== Cn(r) && (n.value = Cn(r));
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
      var l = Cn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var o = a.name;
    o !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, o !== "" && (a.name = o);
  }
  function k(e, t) {
    var n = e;
    y(n, t), X(n, t);
  }
  function X(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Yt(n, "name");
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
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Cn(e._wrapperState.initialValue) : e.defaultValue !== Cn(n) && (e.defaultValue = Cn(n)));
  }
  var ce = !1, Te = !1, Be = !1;
  function Ze(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? s.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Te || (Te = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Be || (Be = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ce && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ce = !0);
  }
  function lt(e, t) {
    t.value != null && e.setAttribute("value", Cn(Na(t.value)));
  }
  var ot = Array.isArray;
  function ke(e) {
    return ot(e);
  }
  var vt;
  vt = !1;
  function Dt() {
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
          var a = ke(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Dt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Dt());
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
      for (var v = Cn(Na(n)), x = null, E = 0; E < r.length; E++) {
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
    return Ae({}, t, {
      value: void 0
    });
  }
  function No(e, t) {
    var n = e;
    go(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !vt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), vt = !0);
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
    var a = Ae({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Cn(n._wrapperState.initialValue)
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
          if (ke(r)) {
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
  function Yv(e, t) {
    var n = e, a = Na(t.value), r = Na(t.defaultValue);
    if (a != null) {
      var i = Cn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Cn(r));
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
  }), kn = 1, ur = 3, Tt = 8, sr = 9, _f = 11, vs = function(e, t) {
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
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (ma(t, e), ("" + t).trim());
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
    }, zE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, FE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Wv, "")));
    }, HE = function(e, t) {
      Qv || (Qv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, BE = function(e, t) {
      Kv || (Kv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Gv = function(e, t) {
      e.indexOf("-") > -1 ? UE(e) : VE.test(e) ? zE(e) : Wv.test(t) && FE(e, t), typeof t == "number" && (isNaN(t) ? HE(e, t) : isFinite(t) || BE(e, t));
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
  }, GE = Ae({
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
  }, ll = {}, QE = new RegExp("^(aria)-[" + ee + "]*$"), KE = new RegExp("^(aria)[A-Z][" + ee + "]*$");
  function XE(e, t) {
    {
      if (Vn.call(ll, t) && ll[t])
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
    var Dn = {}, nh = /^on./, tx = /^on[^A-Z]/, nx = new RegExp("^(aria)-[" + ee + "]*$"), ax = new RegExp("^(aria)[A-Z][" + ee + "]*$");
    th = function(e, t, n, a) {
      if (Vn.call(Dn, t) && Dn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Dn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var o = l.hasOwnProperty(r) ? l[r] : null;
        if (o != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, o), Dn[t] = !0, !0;
        if (nh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), Dn[t] = !0, !0;
      } else if (nh.test(t))
        return tx.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Dn[t] = !0, !0;
      if (nx.test(t) || ax.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Dn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Dn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Dn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Dn[t] = !0, !0;
      var u = Et(t), p = u !== null && u.type === en;
      if (hs.hasOwnProperty(r)) {
        var v = hs[r];
        if (v !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Dn[t] = !0, !0;
      } else if (!p && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Dn[t] = !0, !0;
      return typeof n == "boolean" && bt(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Dn[t] = !0, !0) : p ? !0 : bt(t, n, u, !1) ? (Dn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === _t && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Dn[t] = !0), !0);
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
  var zf = !1;
  if (Zt)
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
    var Ff = document.createElement("react");
    fh = function(t, n, a, r, i, l, o, u, p) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), x = !1, E = !0, O = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
      function U() {
        Ff.removeEventListener(z, he, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var ae = Array.prototype.slice.call(arguments, 3);
      function he() {
        x = !0, U(), n.apply(a, ae), E = !1;
      }
      var pe, Ye = !1, Ue = !1;
      function j(w) {
        if (pe = w.error, Ye = !0, pe === null && w.colno === 0 && w.lineno === 0 && (Ue = !0), w.defaultPrevented && pe != null && typeof pe == "object")
          try {
            pe._suppressLogging = !0;
          } catch {
          }
      }
      var z = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), Ff.addEventListener(z, he, !1), v.initEvent(z, !1, !1), Ff.dispatchEvent(v), V && Object.defineProperty(window, "event", V), x && E && (Ye ? Ue && (pe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : pe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(pe)), window.removeEventListener("error", j), !x)
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
  var Ne = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), jt = (
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
  ), Tn = (
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
  ), Qf = jt | Qe | Ei | Do | xi | fr | Si, To = Qe | dh | xi | Si, pl = Ar | Ei, dr = Ri | qf | If, Rx = h.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (jt | fr)) !== Ne && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === S ? n : null;
  }
  function mh(e) {
    if (e.tag === P) {
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
    if (e.tag === F || e.tag === K)
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
    if (e.tag === F || e.tag === K)
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
  var Eh = m.unstable_scheduleCallback, jx = m.unstable_cancelCallback, wx = m.unstable_shouldYield, _x = m.unstable_requestPaint, qt = m.unstable_now, Ox = m.unstable_getCurrentPriorityLevel, Ns = m.unstable_ImmediatePriority, Kf = m.unstable_UserBlockingPriority, Di = m.unstable_NormalPriority, Lx = m.unstable_LowPriority, Xf = m.unstable_IdlePriority, Vx = m.unstable_yieldValue, Mx = m.unstable_setDisableYieldValue, ml = null, mn = null, ie = null, Ba = !1, Ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function Ax(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = Ae({}, e, {
        getLaneLabelMap: Bx,
        injectProfilingHooks: Hx
      })), ml = t.inject(e), mn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function kx(e, t) {
    if (mn && typeof mn.onScheduleFiberRoot == "function")
      try {
        mn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function Ux(e, t) {
    if (mn && typeof mn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Ke) === Ke;
        if (Nn) {
          var a;
          switch (t) {
            case Gn:
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
          mn.onCommitFiberRoot(ml, e, a, n);
        }
      } catch (r) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function zx(e) {
    if (mn && typeof mn.onPostCommitFiberRoot == "function")
      try {
        mn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Fx(e) {
    if (mn && typeof mn.onCommitFiberUnmount == "function")
      try {
        mn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof Vx == "function" && (Mx(e), b(e)), mn && typeof mn.setStrictMode == "function")
      try {
        mn.setStrictMode(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
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
  ), et = (
    /*                    */
    2
  ), St = (
    /*               */
    8
  ), Pa = (
    /*              */
    16
  ), Th = Math.clz32 ? Math.clz32 : lS, rS = Math.log, iS = Math.LN2;
  function lS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (rS(t) / iS | 0) | 0;
  }
  var Zf = 31, I = (
    /*                        */
    0
  ), Wt = (
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
  ), In = (
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
      if (e & In)
        return "Offscreen";
    }
  }
  var ut = -1, xs = _o, Ss = gl;
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
      case In:
        return In;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Rs(e, t) {
    var n = e.pendingLanes;
    if (n === I)
      return I;
    var a = I, r = e.suspendedLanes, i = e.pingedLanes, l = n & wh;
    if (l !== I) {
      var o = l & ~r;
      if (o !== I)
        a = Vo(o);
      else {
        var u = l & i;
        u !== I && (a = Vo(u));
      }
    } else {
      var p = n & ~r;
      p !== I ? a = Vo(p) : i !== I && (a = Vo(i));
    }
    if (a === I)
      return I;
    if (t !== I && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === I) {
      var v = wi(a), x = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === $a && (x & yl) !== I
      )
        return t;
    }
    (a & pr) !== I && (a |= n & $a);
    var E = e.entangledLanes;
    if (E !== I)
      for (var O = e.entanglements, V = a & E; V > 0; ) {
        var U = _i(V), ae = 1 << U;
        a |= O[U], V &= ~ae;
      }
    return a;
  }
  function uS(e, t) {
    for (var n = e.eventTimes, a = ut; t > 0; ) {
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
      case In:
        return ut;
      default:
        return f("Should have found matching lanes. This is a bug in React."), ut;
    }
  }
  function cS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o, p = i[o];
      p === ut ? ((u & a) === I || (u & r) !== I) && (i[o] = sS(u, t)) : p <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function fS(e) {
    return Vo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~In;
    return t !== I ? t : t & In ? In : I;
  }
  function dS(e) {
    return (e & Ce) !== I;
  }
  function Nd(e) {
    return (e & wh) !== I;
  }
  function _h(e) {
    return (e & Es) === e;
  }
  function pS(e) {
    var t = Ce | pr | $a;
    return (e & t) === I;
  }
  function mS(e) {
    return (e & yl) === e;
  }
  function Cs(e, t) {
    var n = hl | pr | Ti | $a;
    return (t & n) !== I;
  }
  function vS(e, t) {
    return (t & e.expiredLanes) !== I;
  }
  function Oh(e) {
    return (e & yl) !== I;
  }
  function Lh() {
    var e = xs;
    return xs <<= 1, (xs & yl) === I && (xs = _o), e;
  }
  function hS() {
    var e = Ss;
    return Ss <<= 1, (Ss & Es) === I && (Ss = gl), e;
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
  function qn(e, t) {
    return (e & t) !== I;
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
  function Vh(e, t) {
    return e & t;
  }
  function b_(e) {
    return e;
  }
  function yS(e, t) {
    return e !== Wt && e < t ? e : t;
  }
  function xd(e) {
    for (var t = [], n = 0; n < Zf; n++)
      t.push(e);
    return t;
  }
  function Ao(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = I, e.pingedLanes = I);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function gS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = ut, a &= ~i;
    }
  }
  function Mh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function bS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = I, e.pingedLanes = I, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o;
      a[o] = I, r[o] = ut, i[o] = ut, l &= ~u;
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
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
  }
  function Ah(e, t, n) {
    if (Ea)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Ed(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function kh(e, t) {
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
  var Gn = Ce, mr = pr, vr = $a, Ts = ji, ko = Wt;
  function xa() {
    return ko;
  }
  function Qt(e) {
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
  function zh(e) {
    var t = wi(e);
    return Rd(Gn, t) ? Rd(mr, t) ? Nd(t) ? vr : Ts : mr : Gn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Fh;
  function RS(e) {
    Fh = e;
  }
  function CS(e) {
    Fh(e);
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
  var Dd = !1, ws = [], Ur = null, zr = null, Fr = null, Uo = /* @__PURE__ */ new Map(), zo = /* @__PURE__ */ new Map(), Hr = [], _S = [
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
        zr = null;
        break;
      case "mouseover":
      case "mouseout":
        Fr = null;
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
        zo.delete(a);
        break;
      }
    }
  }
  function Fo(e, t, n, a, r, i) {
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
        return Ur = Fo(Ur, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return zr = Fo(zr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var o = r;
        return Fr = Fo(Fr, e, t, n, a, o), !0;
      }
      case "pointerover": {
        var u = r, p = u.pointerId;
        return Uo.set(p, Fo(Uo.get(p) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var v = r, x = v.pointerId;
        return zo.set(x, Fo(zo.get(x) || null, e, t, n, a, v)), !0;
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
        if (a === P) {
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
    Dd = !1, Ur !== null && _s(Ur) && (Ur = null), zr !== null && _s(zr) && (zr = null), Fr !== null && _s(Fr) && (Fr = null), Uo.forEach(Ih), zo.forEach(Ih);
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
    Ur !== null && Ho(Ur, e), zr !== null && Ho(zr, e), Fr !== null && Ho(Fr, e);
    var a = function(o) {
      return Ho(o, e);
    };
    Uo.forEach(a), zo.forEach(a);
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
      case Gn:
        r = zS;
        break;
      case mr:
        r = FS;
        break;
      case vr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function zS(e, t, n, a) {
    var r = xa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Qt(Gn), jd(e, t, n, a);
    } finally {
      Qt(r), Nl.transition = i;
    }
  }
  function FS(e, t, n, a) {
    var r = xa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Qt(mr), jd(e, t, n, a);
    } finally {
      Qt(r), Nl.transition = i;
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
        if (o === P) {
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
        return Gn;
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
            return Gn;
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
  function Wn(e) {
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
    return Ae(t.prototype, {
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
  }, Od = Wn(El), Yo = Ae({}, El, {
    view: 0,
    detail: 0
  }), GS = Wn(Yo), Ld, Vd, Io;
  function WS(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Ld = e.screenX - Io.screenX, Vd = e.screenY - Io.screenY) : (Ld = 0, Vd = 0), Io = e);
  }
  var Ms = Ae({}, Yo, {
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
  }), Xh = Wn(Ms), QS = Ae({}, Ms, {
    dataTransfer: 0
  }), KS = Wn(QS), XS = Ae({}, Yo, {
    relatedTarget: 0
  }), Md = Wn(XS), JS = Ae({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ZS = Wn(JS), eR = Ae({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), tR = Wn(eR), nR = Ae({}, El, {
    data: 0
  }), Jh = Wn(nR), aR = Jh, rR = {
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
  var sR = Ae({}, Yo, {
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
  }), cR = Wn(sR), fR = Ae({}, Ms, {
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
  }), Zh = Wn(fR), dR = Ae({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ad
  }), pR = Wn(dR), mR = Ae({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vR = Wn(mR), hR = Ae({}, Ms, {
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
  }), yR = Wn(hR), gR = [9, 13, 27, 32], ey = 229, kd = Zt && "CompositionEvent" in window, qo = null;
  Zt && "documentMode" in document && (qo = document.documentMode);
  var bR = Zt && "TextEvent" in window && !qo, ty = Zt && (!kd || qo && qo > 8 && qo <= 11), ny = 32, ay = String.fromCharCode(ny);
  function NR() {
    Xt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Xt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
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
    var o = Fs(n, i);
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
    var l = Fs(n, "onBeforeInput");
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
    if (!Zt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function OR() {
    Xt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function sy(e, t, n, a) {
    ih(a);
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
  Zt && (cy = _R("input") && (!document.documentMode || document.documentMode > 9));
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
  function zR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Wo);
  }
  function FR(e) {
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
    if (LR(o) ? u = AR : uy(o) ? cy ? u = BR : (u = zR, p = UR) : FR(o) && (u = HR), u) {
      var v = u(t, n);
      if (v) {
        sy(e, v, a, r);
        return;
      }
    }
    p && p(t, o, n), t === "focusout" && PR(o);
  }
  function YR() {
    Jt("onMouseEnter", ["mouseout", "mouseover"]), Jt("onMouseLeave", ["mouseout", "mouseover"]), Jt("onPointerEnter", ["pointerout", "pointerover"]), Jt("onPointerLeave", ["pointerout", "pointerover"]);
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
          (O !== U || O.tag !== F && O.tag !== K) && (O = null);
        }
      } else
        E = null, O = n;
      if (E !== O) {
        var ae = Xh, he = "onMouseLeave", pe = "onMouseEnter", Ye = "mouse";
        (t === "pointerout" || t === "pointerover") && (ae = Zh, he = "onPointerLeave", pe = "onPointerEnter", Ye = "pointer");
        var Ue = E == null ? v : jl(E), j = O == null ? v : jl(O), z = new ae(he, Ye + "leave", E, a, r);
        z.target = Ue, z.relatedTarget = j;
        var w = null, W = Vi(r);
        if (W === n) {
          var oe = new ae(pe, Ye + "enter", O, a, r);
          oe.target = j, oe.relatedTarget = Ue, w = oe;
        }
        vC(e, z, w, E, O);
      }
    }
  }
  function qR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Qn = typeof Object.is == "function" ? Object.is : qR;
  function Qo(e, t) {
    if (Qn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Vn.call(t, i) || !Qn(e[i], t[i]))
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
        i.nodeType === kn && r.push({
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
  var aC = Zt && "documentMode" in document && document.documentMode <= 11;
  function rC() {
    Xt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Sl = null, zd = null, Ko = null, Fd = !1;
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
    if (!(Fd || Sl == null || Sl !== ir(a))) {
      var r = iC(Sl);
      if (!Ko || !Qo(Ko, r)) {
        Ko = r;
        var i = Fs(zd, "onSelect");
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
        (uy(o) || o.contentEditable === "true") && (Sl = o, zd = n, Ko = null);
        break;
      case "focusout":
        Sl = null, zd = null, Ko = null;
        break;
      case "mousedown":
        Fd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Fd = !1, gy(e, a, r);
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
  Zt && (by = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
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
    Ry.set(e, t), Xt(t, [e]);
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
  function dt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = P0(t), r = hC(e);
    a.has(r) || (jy(t, e, Mf, n), a.add(r));
  }
  function Pd(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= xo), jy(n, e, a, t);
  }
  var zs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[zs]) {
      e[zs] = !0, ka.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || Pd(n, !1, e), Pd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[zs] || (t[zs] = !0, Pd("selectionchange", !1, t)));
    }
  }
  function jy(e, t, n, a, r) {
    var i = US(e, t, n), l = void 0;
    zf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? $S(e, t, i, l) : PS(e, t, i) : l !== void 0 ? YS(e, t, i, l) : BS(e, t, i);
  }
  function wy(e, t) {
    return e === t || e.nodeType === Tt && e.parentNode === t;
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
              if (V === F || V === K) {
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
      if (O === F && E !== null && (v = E, o !== null)) {
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
      if (o === F && l !== null) {
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
    while (e && e.tag !== F);
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
      if (x === F && v !== null) {
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
  var Un = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Pr = "suppressHydrationWarning", Oy = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Ly, $s, Vy, My;
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
      registrationNameDependencies: Kt,
      possibleRegistrationNames: $n
    });
  }, Vy = Zt && !document.documentMode, tu = function(e, t, n) {
    if (!Un) {
      var a = Ys(n), r = Ys(t);
      r !== a && (Un = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ly = function(e) {
    if (!Un) {
      Un = !0;
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
    Mn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(yC, `
`).replace(gC, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (Un || (Un = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && Ee))
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
        else i === Hs || i === Pr || i === Oy || (Kt.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && dt("scroll", t)) : l != null && ya(t, i, l, r));
      }
  }
  function EC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Xv(e, l) : i === eu ? qv(e, l) : i === Oi ? vs(e, l) : ya(e, i, l, a);
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
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Vn.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
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
        Ze(e, n), i = n;
        break;
      case "select":
        No(e, n), i = bo(e, n), dt("invalid", e);
        break;
      case "textarea":
        $v(e, n), i = Df(e, n), dt("invalid", e);
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
        } else u === eu || u === Oi || u === Hs || u === Pr || u === Oy || (Kt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
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
        } else u === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(u, "" + E) : u === Hs || u === Pr || (Kt.hasOwnProperty(u) ? (E != null && (typeof E != "function" && $s(u, E), u === "onScroll" && dt("scroll", e)), !i && O !== E && (i = [])) : (i = i || []).push(u, E));
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
        Ze(e, n);
        break;
      case "select":
        No(e, n), dt("invalid", e);
        break;
      case "textarea":
        $v(e, n), dt("invalid", e);
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
        else if (Kt.hasOwnProperty(V))
          U != null && (typeof U != "function" && $s(V, U), V === "onScroll" && dt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var ae = void 0, he = Et(V);
          if (n[Pr] !== !0) {
            if (!(V === Hs || V === Pr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === eu) {
                var pe = e.innerHTML, Ye = U ? U[Bs] : void 0;
                if (Ye != null) {
                  var Ue = My(e, Ye);
                  Ue !== pe && tu(V, pe, Ue);
                }
              } else if (V === Li) {
                if (u.delete(V), Vy) {
                  var j = $E(U);
                  ae = e.getAttribute("style"), j !== ae && tu(V, ae, j);
                }
              } else if (o && !ea)
                u.delete(V.toLowerCase()), ae = ci(e, V, U), U !== ae && tu(V, ae, U);
              else if (!gt(V, he, o) && !dn(V, U, he, o)) {
                var z = !1;
                if (he !== null)
                  u.delete(he.attributeName), ae = Xi(e, V, U, he);
                else {
                  var w = a;
                  if (w === or && (w = jf(t)), w === or)
                    u.delete(V.toLowerCase());
                  else {
                    var W = TC(V);
                    W !== null && W !== V && (z = !0, u.delete(W)), u.delete(V);
                  }
                  ae = ci(e, V, U);
                }
                var oe = ea;
                !oe && U !== ae && !z && tu(V, ae, U);
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
      var n = Ae({}, e || Uy), a = {
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
    }, zy = {};
    nu = function(e, t, n) {
      n = n || Uy;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = MC(e, r) ? null : a, l = i ? null : AC(e, n), o = i || l;
      if (o) {
        var u = o.tag, p = !!i + "|" + e + "|" + u;
        if (!zy[p]) {
          zy[p] = !0;
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
        var i = a === Tt ? e.parentNode : e, l = i.namespaceURI || null;
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
  function zC(e, t, n) {
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
  function FC(e) {
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
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, GC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, Fy = typeof Promise == "function" ? Promise : void 0, WC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fy < "u" ? function(e) {
    return Fy.resolve(null).then(e).catch(QC);
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
    e.nodeType === Tt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function t0(e, t, n) {
    e.insertBefore(t, n);
  }
  function n0(e, t, n) {
    e.nodeType === Tt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function a0(e, t) {
    e.removeChild(t);
  }
  function r0(e, t) {
    e.nodeType === Tt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ep(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Tt) {
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
    e.nodeType === Tt ? ep(e.parentNode, t) : e.nodeType === kn && ep(e, t), Bo(e);
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
    e.nodeType === kn ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function f0(e, t, n) {
    return e.nodeType !== kn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function d0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function p0(e) {
    return e.nodeType !== Tt ? null : e;
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
      if (t === kn || t === ur)
        break;
      if (t === Tt) {
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
      if (t.nodeType === Tt) {
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
      if (t.nodeType === Tt) {
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
    t.nodeType === kn ? Id(e, t) : t.nodeType === Tt || qd(e, t);
  }
  function w0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === kn ? Id(n, t) : t.nodeType === Tt || qd(n, t));
    }
  }
  function _0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === kn ? Id(n, a) : a.nodeType === Tt || qd(n, a));
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
  function z0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, F0 = "__reactListeners$" + Dl, H0 = "__reactHandles$" + Dl;
  function B0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[F0], delete e[H0];
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
    return t && (t.tag === F || t.tag === K || t.tag === P || t.tag === S) ? t : null;
  }
  function jl(e) {
    if (e.tag === F || e.tag === K)
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
  function Sa(e, t, n, a, r) {
    {
      var i = Function.call.bind(Vn);
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
  function vn(e, t) {
    if (hr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ec[hr] && f("Unexpected Fiber popped."), e.current = ip[hr], ip[hr] = null, ec[hr] = null, hr--;
  }
  function hn(e, t, n) {
    hr++, ip[hr] = e.current, ec[hr] = n, e.current = t;
  }
  var lp;
  lp = {};
  var Kn = {};
  Object.freeze(Kn);
  var yr = Yr(Kn), Ya = Yr(!1), op = Kn;
  function wl(e, t, n) {
    return n && Ia(t) ? op : yr.current;
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
        return Kn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var o = we(e) || "Unknown";
        Sa(a, i, "context", o);
      }
      return r && qy(e, t, i), i;
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
    vn(Ya, e), vn(yr, e);
  }
  function up(e) {
    vn(Ya, e), vn(yr, e);
  }
  function Gy(e, t, n) {
    {
      if (yr.current !== Kn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      hn(yr, t, e), hn(Ya, n, e);
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
        Sa(r, l, "child context", u);
      }
      return Ae({}, n, l);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Kn;
      return op = yr.current, hn(yr, n, e), hn(Ya, Ya.current, e), !0;
    }
  }
  function Qy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Wy(e, t, op);
        a.__reactInternalMemoizedMergedChildContext = r, vn(Ya, e), vn(yr, e), hn(yr, r, e), hn(Ya, n, e);
      } else
        vn(Ya, e), hn(Ya, n, e);
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
      var e = 0, t = xa();
      try {
        var n = !0, a = gr;
        for (Qt(Gn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        gr = null, sp = !1;
      } catch (i) {
        throw gr !== null && (gr = gr.slice(e + 1)), Eh(Ns, qr), i;
      } finally {
        Qt(t), cp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, ic = null, lc = 0, ia = [], la = 0, Mi = null, br = 1, Nr = "";
  function I0(e) {
    return ki(), (e.flags & ph) !== Ne;
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
    ki(), ia[la++] = br, ia[la++] = Nr, ia[la++] = Mi, Mi = e;
    var a = br, r = Nr, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, u = oc(t) + i;
    if (u > 30) {
      var p = i - i % 5, v = (1 << p) - 1, x = (l & v).toString(32), E = l >> p, O = i - p, V = oc(t) + O, U = o << O, ae = U | E, he = x + r;
      br = 1 << V | ae, Nr = he;
    } else {
      var pe = o << i, Ye = pe | l, Ue = r;
      br = 1 << u | Ye, Nr = Ue;
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
      Mi = ia[--la], ia[la] = null, Nr = ia[--la], ia[la] = null, br = ia[--la], ia[la] = null;
  }
  function Q0() {
    return ki(), Mi !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function K0(e, t) {
    ki(), ia[la++] = br, ia[la++] = Nr, ia[la++] = Mi, br = t.id, Nr = t.overflow, Mi = e;
  }
  function ki() {
    nn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var tn = null, oa = null, Ra = !1, Ui = !1, Gr = null;
  function X0() {
    Ra && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Zy() {
    Ui = !0;
  }
  function J0() {
    return Ui;
  }
  function Z0(e) {
    var t = e.stateNode.containerInfo;
    return oa = y0(t), tn = e, Ra = !0, Gr = null, Ui = !1, !0;
  }
  function eD(e, t, n) {
    return oa = g0(t), tn = e, Ra = !0, Gr = null, Ui = !1, n !== null && K0(e, n), !0;
  }
  function eg(e, t) {
    switch (e.tag) {
      case S: {
        j0(e.stateNode.containerInfo, t);
        break;
      }
      case F: {
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
      case P: {
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
            case F:
              var a = t.type;
              t.pendingProps, O0(n, a);
              break;
            case K:
              var r = t.pendingProps;
              L0(n, r);
              break;
          }
          break;
        }
        case F: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case F: {
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
            case K: {
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
        case P: {
          var O = e.memoizedState, V = O.dehydrated;
          if (V !== null) switch (t.tag) {
            case F:
              var U = t.type;
              t.pendingProps, V0(V, U);
              break;
            case K:
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
    t.flags = t.flags & ~fr | jt, pp(e, t);
  }
  function ag(e, t) {
    switch (e.tag) {
      case F: {
        var n = e.type;
        e.pendingProps;
        var a = f0(t, n);
        return a !== null ? (e.stateNode = a, tn = e, oa = h0(a), !0) : !1;
      }
      case K: {
        var r = e.pendingProps, i = d0(t, r);
        return i !== null ? (e.stateNode = i, tn = e, oa = null, !0) : !1;
      }
      case P: {
        var l = p0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: Q0(),
            retryLane: In
          };
          e.memoizedState = o;
          var u = i1(l);
          return u.return = e, e.child = u, tn = e, oa = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function mp(e) {
    return (e.mode & Pe) !== ge && (e.flags & Ke) === Ne;
  }
  function vp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function hp(e) {
    if (Ra) {
      var t = oa;
      if (!t) {
        mp(e) && (pp(tn, e), vp()), ng(tn, e), Ra = !1, tn = e;
        return;
      }
      var n = t;
      if (!ag(e, t)) {
        mp(e) && (pp(tn, e), vp()), t = lu(n);
        var a = tn;
        if (!t || !ag(e, t)) {
          ng(tn, e), Ra = !1, tn = e;
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
      var r = tn;
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
          case F: {
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
    for (var t = e.return; t !== null && t.tag !== F && t.tag !== S && t.tag !== P; )
      t = t.return;
    tn = t;
  }
  function uc(e) {
    if (e !== tn)
      return !1;
    if (!Ra)
      return rg(e), Ra = !0, !1;
    if (e.tag !== S && (e.tag !== F || C0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = oa;
      if (t)
        if (mp(e))
          ig(e), vp();
        else
          for (; t; )
            tg(e, t), t = lu(t);
    }
    return rg(e), e.tag === P ? oa = rD(e) : oa = tn ? lu(e.stateNode) : null, !0;
  }
  function iD() {
    return Ra && oa !== null;
  }
  function ig(e) {
    for (var t = oa; t; )
      eg(e, t), t = lu(t);
  }
  function Vl() {
    tn = null, oa = null, Ra = !1, Ui = !1;
  }
  function lg() {
    Gr !== null && (Zb(Gr), Gr = null);
  }
  function nn() {
    return Ra;
  }
  function yp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var lD = h.ReactCurrentBatchConfig, oD = null;
  function uD() {
    return lD.transition;
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
    var sD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & St && (t = n), n = n.return;
      return t;
    }, zi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, cu = [], fu = [], du = [], pu = [], mu = [], vu = [], Fi = /* @__PURE__ */ new Set();
    Ca.recordUnsafeLifecycleWarnings = function(e, t) {
      Fi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && cu.push(e), e.mode & St && typeof t.UNSAFE_componentWillMount == "function" && fu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & St && typeof t.UNSAFE_componentWillReceiveProps == "function" && pu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & St && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Ca.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(E) {
        e.add(we(E) || "Component"), Fi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(we(E) || "Component"), Fi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(we(E) || "Component"), Fi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(we(E) || "Component"), Fi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(we(E) || "Component"), Fi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(we(E) || "Component"), Fi.add(E.type);
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
        R(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, p);
      }
      if (n.size > 0) {
        var v = zi(n);
        R(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var x = zi(r);
        R(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
      }
    };
    var sc = /* @__PURE__ */ new Map(), og = /* @__PURE__ */ new Set();
    Ca.recordLegacyContextWarning = function(e, t) {
      var n = sD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!og.has(e.type)) {
        var a = sc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], sc.set(n, a)), a.push(e));
      }
    }, Ca.flushLegacyContextWarning = function() {
      sc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(we(i) || "Component"), og.add(i.type);
          });
          var r = zi(a);
          try {
            mt(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            It();
          }
        }
      });
    }, Ca.discardPendingWarnings = function() {
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
      if ((e.mode & St || Bt) && // We warn in ReactElement.js if owner and self are equal for string refs
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
    function t(j, z) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [z], j.flags |= Ei) : w.push(z);
      }
    }
    function n(j, z) {
      if (!e)
        return null;
      for (var w = z; w !== null; )
        t(j, w), w = w.sibling;
      return null;
    }
    function a(j, z) {
      for (var w = /* @__PURE__ */ new Map(), W = z; W !== null; )
        W.key !== null ? w.set(W.key, W) : w.set(W.index, W), W = W.sibling;
      return w;
    }
    function r(j, z) {
      var w = Wi(j, z);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, z, w) {
      if (j.index = w, !e)
        return j.flags |= ph, z;
      var W = j.alternate;
      if (W !== null) {
        var oe = W.index;
        return oe < z ? (j.flags |= jt, z) : oe;
      } else
        return j.flags |= jt, z;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= jt), j;
    }
    function o(j, z, w, W) {
      if (z === null || z.tag !== K) {
        var oe = yv(w, j.mode, W);
        return oe.return = j, oe;
      } else {
        var re = r(z, w);
        return re.return = j, re;
      }
    }
    function u(j, z, w, W) {
      var oe = w.type;
      if (oe === za)
        return v(j, z, w.props.children, W, w.key);
      if (z !== null && (z.elementType === oe || // Keep this check inline so it only runs on the false path:
      vN(z, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof oe == "object" && oe !== null && oe.$$typeof === ye && sg(oe) === z.type)) {
        var re = r(z, w.props);
        return re.ref = hu(j, z, w), re.return = j, re._debugSource = w._source, re._debugOwner = w._owner, re;
      }
      var xe = hv(w, j.mode, W);
      return xe.ref = hu(j, z, w), xe.return = j, xe;
    }
    function p(j, z, w, W) {
      if (z === null || z.tag !== M || z.stateNode.containerInfo !== w.containerInfo || z.stateNode.implementation !== w.implementation) {
        var oe = gv(w, j.mode, W);
        return oe.return = j, oe;
      } else {
        var re = r(z, w.children || []);
        return re.return = j, re;
      }
    }
    function v(j, z, w, W, oe) {
      if (z === null || z.tag !== fe) {
        var re = ri(w, j.mode, W, oe);
        return re.return = j, re;
      } else {
        var xe = r(z, w);
        return xe.return = j, xe;
      }
    }
    function x(j, z, w) {
      if (typeof z == "string" && z !== "" || typeof z == "number") {
        var W = yv("" + z, j.mode, w);
        return W.return = j, W;
      }
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case aa: {
            var oe = hv(z, j.mode, w);
            return oe.ref = hu(j, null, z), oe.return = j, oe;
          }
          case Yn: {
            var re = gv(z, j.mode, w);
            return re.return = j, re;
          }
          case ye: {
            var xe = z._payload, je = z._init;
            return x(j, je(xe), w);
          }
        }
        if (ke(z) || ba(z)) {
          var nt = ri(z, j.mode, w, null);
          return nt.return = j, nt;
        }
        cc(j, z);
      }
      return typeof z == "function" && fc(j), null;
    }
    function E(j, z, w, W) {
      var oe = z !== null ? z.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return oe !== null ? null : o(j, z, "" + w, W);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case aa:
            return w.key === oe ? u(j, z, w, W) : null;
          case Yn:
            return w.key === oe ? p(j, z, w, W) : null;
          case ye: {
            var re = w._payload, xe = w._init;
            return E(j, z, xe(re), W);
          }
        }
        if (ke(w) || ba(w))
          return oe !== null ? null : v(j, z, w, W, null);
        cc(j, w);
      }
      return typeof w == "function" && fc(j), null;
    }
    function O(j, z, w, W, oe) {
      if (typeof W == "string" && W !== "" || typeof W == "number") {
        var re = j.get(w) || null;
        return o(z, re, "" + W, oe);
      }
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case aa: {
            var xe = j.get(W.key === null ? w : W.key) || null;
            return u(z, xe, W, oe);
          }
          case Yn: {
            var je = j.get(W.key === null ? w : W.key) || null;
            return p(z, je, W, oe);
          }
          case ye:
            var nt = W._payload, qe = W._init;
            return O(j, z, w, qe(nt), oe);
        }
        if (ke(W) || ba(W)) {
          var Ct = j.get(w) || null;
          return v(z, Ct, W, oe, null);
        }
        cc(z, W);
      }
      return typeof W == "function" && fc(z), null;
    }
    function V(j, z, w) {
      {
        if (typeof j != "object" || j === null)
          return z;
        switch (j.$$typeof) {
          case aa:
          case Yn:
            ug(j, w);
            var W = j.key;
            if (typeof W != "string")
              break;
            if (z === null) {
              z = /* @__PURE__ */ new Set(), z.add(W);
              break;
            }
            if (!z.has(W)) {
              z.add(W);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", W);
            break;
          case ye:
            var oe = j._payload, re = j._init;
            V(re(oe), z, w);
            break;
        }
      }
      return z;
    }
    function U(j, z, w, W) {
      for (var oe = null, re = 0; re < w.length; re++) {
        var xe = w[re];
        oe = V(xe, oe, j);
      }
      for (var je = null, nt = null, qe = z, Ct = 0, Ge = 0, Rt = null; qe !== null && Ge < w.length; Ge++) {
        qe.index > Ge ? (Rt = qe, qe = null) : Rt = qe.sibling;
        var gn = E(j, qe, w[Ge], W);
        if (gn === null) {
          qe === null && (qe = Rt);
          break;
        }
        e && qe && gn.alternate === null && t(j, qe), Ct = i(gn, Ct, Ge), nt === null ? je = gn : nt.sibling = gn, nt = gn, qe = Rt;
      }
      if (Ge === w.length) {
        if (n(j, qe), nn()) {
          var cn = Ge;
          Ai(j, cn);
        }
        return je;
      }
      if (qe === null) {
        for (; Ge < w.length; Ge++) {
          var Jn = x(j, w[Ge], W);
          Jn !== null && (Ct = i(Jn, Ct, Ge), nt === null ? je = Jn : nt.sibling = Jn, nt = Jn);
        }
        if (nn()) {
          var On = Ge;
          Ai(j, On);
        }
        return je;
      }
      for (var Ln = a(j, qe); Ge < w.length; Ge++) {
        var bn = O(Ln, j, Ge, w[Ge], W);
        bn !== null && (e && bn.alternate !== null && Ln.delete(bn.key === null ? Ge : bn.key), Ct = i(bn, Ct, Ge), nt === null ? je = bn : nt.sibling = bn, nt = bn);
      }
      if (e && Ln.forEach(function(Jl) {
        return t(j, Jl);
      }), nn()) {
        var Tr = Ge;
        Ai(j, Tr);
      }
      return je;
    }
    function ae(j, z, w, W) {
      var oe = ba(w);
      if (typeof oe != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === oe && (gp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gp = !0);
        var re = oe.call(w);
        if (re)
          for (var xe = null, je = re.next(); !je.done; je = re.next()) {
            var nt = je.value;
            xe = V(nt, xe, j);
          }
      }
      var qe = oe.call(w);
      if (qe == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Ct = null, Ge = null, Rt = z, gn = 0, cn = 0, Jn = null, On = qe.next(); Rt !== null && !On.done; cn++, On = qe.next()) {
        Rt.index > cn ? (Jn = Rt, Rt = null) : Jn = Rt.sibling;
        var Ln = E(j, Rt, On.value, W);
        if (Ln === null) {
          Rt === null && (Rt = Jn);
          break;
        }
        e && Rt && Ln.alternate === null && t(j, Rt), gn = i(Ln, gn, cn), Ge === null ? Ct = Ln : Ge.sibling = Ln, Ge = Ln, Rt = Jn;
      }
      if (On.done) {
        if (n(j, Rt), nn()) {
          var bn = cn;
          Ai(j, bn);
        }
        return Ct;
      }
      if (Rt === null) {
        for (; !On.done; cn++, On = qe.next()) {
          var Tr = x(j, On.value, W);
          Tr !== null && (gn = i(Tr, gn, cn), Ge === null ? Ct = Tr : Ge.sibling = Tr, Ge = Tr);
        }
        if (nn()) {
          var Jl = cn;
          Ai(j, Jl);
        }
        return Ct;
      }
      for (var Wu = a(j, Rt); !On.done; cn++, On = qe.next()) {
        var Za = O(Wu, j, cn, On.value, W);
        Za !== null && (e && Za.alternate !== null && Wu.delete(Za.key === null ? cn : Za.key), gn = i(Za, gn, cn), Ge === null ? Ct = Za : Ge.sibling = Za, Ge = Za);
      }
      if (e && Wu.forEach(function(k1) {
        return t(j, k1);
      }), nn()) {
        var A1 = cn;
        Ai(j, A1);
      }
      return Ct;
    }
    function he(j, z, w, W) {
      if (z !== null && z.tag === K) {
        n(j, z.sibling);
        var oe = r(z, w);
        return oe.return = j, oe;
      }
      n(j, z);
      var re = yv(w, j.mode, W);
      return re.return = j, re;
    }
    function pe(j, z, w, W) {
      for (var oe = w.key, re = z; re !== null; ) {
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
            var nt = r(re, w.props);
            return nt.ref = hu(j, re, w), nt.return = j, nt._debugSource = w._source, nt._debugOwner = w._owner, nt;
          }
          n(j, re);
          break;
        } else
          t(j, re);
        re = re.sibling;
      }
      if (w.type === za) {
        var qe = ri(w.props.children, j.mode, W, w.key);
        return qe.return = j, qe;
      } else {
        var Ct = hv(w, j.mode, W);
        return Ct.ref = hu(j, z, w), Ct.return = j, Ct;
      }
    }
    function Ye(j, z, w, W) {
      for (var oe = w.key, re = z; re !== null; ) {
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
      var je = gv(w, j.mode, W);
      return je.return = j, je;
    }
    function Ue(j, z, w, W) {
      var oe = typeof w == "object" && w !== null && w.type === za && w.key === null;
      if (oe && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case aa:
            return l(pe(j, z, w, W));
          case Yn:
            return l(Ye(j, z, w, W));
          case ye:
            var re = w._payload, xe = w._init;
            return Ue(j, z, xe(re), W);
        }
        if (ke(w))
          return U(j, z, w, W);
        if (ba(w))
          return ae(j, z, w, W);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(he(j, z, "" + w, W)) : (typeof w == "function" && fc(j), n(j, z));
    }
    return Ue;
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
    hn(Sp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rp;
  }
  function Dp(e, t) {
    var n = Sp.current;
    vn(Sp, t), e._currentValue = n;
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
              var o = Mo(n), u = Er(ut, o);
              u.tag = hc;
              var p = a.updateQueue;
              if (p !== null) {
                var v = p.shared, x = v.pending;
                x === null ? u.next = u : (u.next = x.next, x.next = u), v.pending = u;
              }
            }
            a.lanes = Le(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = Le(E.lanes, n)), Tp(a.return, n, e), i.lanes = Le(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === $)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Fe) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = Le(O.lanes, n);
        var V = O.alternate;
        V !== null && (V.lanes = Le(V.lanes, n)), Tp(O, n, e), r = a.sibling;
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
      a !== null && (qn(n.lanes, t) && Ou(), n.firstContext = null);
    }
  }
  function wt(e) {
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
          lanes: I,
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
  function zn(e, t) {
    return vc(e, t);
  }
  var gD = vc;
  function vc(e, t) {
    e.lanes = Le(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Le(n.lanes, t)), n === null && (e.flags & (jt | fr)) !== Ne && fN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Le(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Le(n.childLanes, t) : (r.flags & (jt | fr)) !== Ne && fN(e), a = r, r = r.return;
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
        lanes: I
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
        var l = Le(i, n);
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
            if (e.mode & St) {
              Gt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            pg();
          }
          return o;
        }
        return l;
      }
      case wp:
        e.flags = e.flags & ~Tn | Ke;
      case hg: {
        var u = n.payload, p;
        if (typeof u == "function") {
          dg(), p = u.call(i, a, r);
          {
            if (e.mode & St) {
              Gt(!0);
              try {
                u.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            pg();
          }
        } else
          p = u;
        return p == null ? a : Ae({}, a, p);
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
      var O = r.baseState, V = I, U = null, ae = null, he = null, pe = i;
      do {
        var Ye = pe.lane, Ue = pe.eventTime;
        if (bl(a, Ye)) {
          if (he !== null) {
            var z = {
              eventTime: Ue,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              tag: pe.tag,
              payload: pe.payload,
              callback: pe.callback,
              next: null
            };
            he = he.next = z;
          }
          O = bD(e, r, pe, O, t, n);
          var w = pe.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          pe.lane !== Wt) {
            e.flags |= dh;
            var W = r.effects;
            W === null ? r.effects = [pe] : W.push(pe);
          }
        } else {
          var j = {
            eventTime: Ue,
            lane: Ye,
            tag: pe.tag,
            payload: pe.payload,
            callback: pe.callback,
            next: null
          };
          he === null ? (ae = he = j, U = O) : he = he.next = j, V = Le(V, Ye);
        }
        if (pe = pe.next, pe === null) {
          if (o = r.shared.pending, o === null)
            break;
          var oe = o, re = oe.next;
          oe.next = null, pe = re, r.lastBaseUpdate = oe, r.shared.pending = null;
        }
      } while (!0);
      he === null && (U = O), r.baseState = U, r.firstBaseUpdate = ae, r.lastBaseUpdate = he;
      var xe = r.shared.interleaved;
      if (xe !== null) {
        var je = xe;
        do
          V = Le(V, je.lane), je = je.next;
        while (je !== xe);
      } else i === null && (r.shared.lanes = I);
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
    hn(xc, t, e), hn(gu, e, e), hn(Qr, yu, e);
    var n = UC(t);
    vn(Qr, e), hn(Qr, n, e);
  }
  function Ul(e) {
    vn(Qr, e), vn(gu, e), vn(xc, e);
  }
  function Mp() {
    var e = Sc(Qr.current);
    return e;
  }
  function xg(e) {
    Sc(xc.current);
    var t = Sc(Qr.current), n = zC(t, e.type);
    t !== n && (hn(gu, e, e), hn(Qr, n, e));
  }
  function Ap(e) {
    gu.current === e && (vn(Qr, e), vn(gu, e));
  }
  var ED = 0, Sg = 1, Rg = 1, bu = 2, Da = Yr(ED);
  function kp(e, t) {
    return (e & t) !== 0;
  }
  function zl(e) {
    return e & Sg;
  }
  function Up(e, t) {
    return e & Sg | t;
  }
  function xD(e, t) {
    return e | t;
  }
  function Kr(e, t) {
    hn(Da, t, e);
  }
  function Fl(e) {
    vn(Da, e);
  }
  function SD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === P) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || By(a) || tp(a))
            return t;
        }
      } else if (t.tag === Me && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Ke) !== Ne;
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
  ), Vt = (
    /* */
    1
  ), qa = (
    /*  */
    2
  ), Mt = (
    /*    */
    4
  ), an = (
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
  function RD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var le = h.ReactCurrentDispatcher, Nu = h.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = I, tt = null, At = null, kt = null, Cc = !1, Eu = !1, xu = 0, CD = 0, DD = 25, H = null, ua = null, Xr = -1, Bp = !1;
  function Xe() {
    {
      var e = H;
      ua === null ? ua = [e] : ua.push(e);
    }
  }
  function J() {
    {
      var e = H;
      ua !== null && (Xr++, ua[Xr] !== e && TD(e));
    }
  }
  function Bl(e) {
    e != null && !ke(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", H, typeof e);
  }
  function TD(e) {
    {
      var t = we(tt);
      if (!Hp.has(t) && (Hp.add(t), ua !== null)) {
        for (var n = "", a = 30, r = 0; r <= Xr; r++) {
          for (var i = ua[r], l = r === Xr ? e : i, o = r + 1 + ". " + i; o.length < a; )
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
  function yn() {
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
      if (!Qn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, tt = t, ua = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = I, e !== null && e.memoizedState !== null ? le.current = qg : ua !== null ? le.current = Ig : le.current = Yg;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, xu = 0, o >= DD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, At = null, kt = null, t.updateQueue = null, Xr = -1, le.current = Gg, l = n(a, r);
      } while (Eu);
    }
    le.current = zc, t._debugHookTypes = ua;
    var u = At !== null && At.next !== null;
    if (Bi = I, tt = null, At = null, kt = null, H = null, ua = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
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
    t.updateQueue = e.updateQueue, (t.mode & Pa) !== ge ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Dg() {
    if (le.current = zc, Cc) {
      for (var e = tt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = I, tt = null, At = null, kt = null, ua = null, Xr = -1, H = null, Fg = !1, Eu = !1, xu = 0;
  }
  function Ga() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return kt === null ? tt.memoizedState = kt = e : kt = kt.next = e, kt;
  }
  function sa() {
    var e;
    if (At === null) {
      var t = tt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = At.next;
    var n;
    if (kt === null ? n = tt.memoizedState : n = kt.next, n !== null)
      kt = n, n = kt.next, At = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      At = e;
      var a = {
        memoizedState: At.memoizedState,
        baseState: At.baseState,
        baseQueue: At.baseQueue,
        queue: At.queue,
        next: null
      };
      kt === null ? tt.memoizedState = kt = a : kt = kt.next = a;
    }
    return kt;
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
    var a = Ga(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: I,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = OD.bind(null, tt, i);
    return [a.memoizedState, l];
  }
  function Ip(e, t, n) {
    var a = sa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = At, l = i.baseQueue, o = r.pending;
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
              lane: Wt,
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
          V === null ? (O = V = he, E = x) : V = V.next = he, tt.lanes = Le(tt.lanes, ae), $u(ae);
        }
        U = U.next;
      } while (U !== null && U !== v);
      V === null ? E = x : V.next = O, Qn(x, a.memoizedState) || Ou(), a.memoizedState = x, a.baseState = E, a.baseQueue = V, r.lastRenderedState = x;
    }
    var Ue = r.interleaved;
    if (Ue !== null) {
      var j = Ue;
      do {
        var z = j.lane;
        tt.lanes = Le(tt.lanes, z), $u(z), j = j.next;
      } while (j !== Ue);
    } else l === null && (r.lanes = I);
    var w = r.dispatch;
    return [a.memoizedState, w];
  }
  function qp(e, t, n) {
    var a = sa(), r = a.queue;
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
      Qn(o, a.memoizedState) || Ou(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function E_(e, t, n) {
  }
  function x_(e, t, n) {
  }
  function Gp(e, t, n) {
    var a = tt, r = Ga(), i, l = nn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var o = t();
        Qn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
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
    return r.queue = p, _c(_g.bind(null, a, p, e), [e]), a.flags |= Ar, Su(Vt | an, wg.bind(null, a, p, i, t), void 0, null), i;
  }
  function Dc(e, t, n) {
    var a = tt, r = sa(), i = t();
    if (!Hl) {
      var l = t();
      Qn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var o = r.memoizedState, u = !Qn(o, i);
    u && (r.memoizedState = i, Ou());
    var p = r.queue;
    if (Cu(_g.bind(null, a, p, e), [e]), p.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    kt !== null && kt.memoizedState.tag & Vt) {
      a.flags |= Ar, Su(Vt | an, wg.bind(null, a, p, i, t), void 0, null);
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
    }, r = tt.updateQueue;
    if (r === null)
      r = Tg(), tt.updateQueue = r, r.stores = [a];
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
      return !Qn(n, a);
    } catch {
      return !0;
    }
  }
  function Lg(e) {
    var t = zn(e, Ce);
    t !== null && Ht(t, e, Ce, ut);
  }
  function Tc(e) {
    var t = Ga();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: I,
      dispatch: null,
      lastRenderedReducer: $p,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = LD.bind(null, tt, n);
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
    }, i = tt.updateQueue;
    if (i === null)
      i = Tg(), tt.updateQueue = i, i.lastEffect = r.next = r;
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
    var t = sa();
    return t.memoizedState;
  }
  function Ru(e, t, n, a) {
    var r = Ga(), i = a === void 0 ? null : a;
    tt.flags |= e, r.memoizedState = Su(Vt | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = sa(), i = a === void 0 ? null : a, l = void 0;
    if (At !== null) {
      var o = At.memoizedState;
      if (l = o.destroy, i !== null) {
        var u = o.deps;
        if (Pp(i, u)) {
          r.memoizedState = Su(t, n, l, i);
          return;
        }
      }
    }
    tt.flags |= e, r.memoizedState = Su(Vt | t, n, l, i);
  }
  function _c(e, t) {
    return (tt.mode & Pa) !== ge ? Ru(Gf | Ar | qf, an, e, t) : Ru(Ar | qf, an, e, t);
  }
  function Cu(e, t) {
    return wc(Ar, an, e, t);
  }
  function Xp(e, t) {
    return Ru(Qe, qa, e, t);
  }
  function Oc(e, t) {
    return wc(Qe, qa, e, t);
  }
  function Jp(e, t) {
    var n = Qe;
    return n |= Ri, (tt.mode & Pa) !== ge && (n |= kr), Ru(n, Mt, e, t);
  }
  function Lc(e, t) {
    return wc(Qe, Mt, e, t);
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
    return r |= Ri, (tt.mode & Pa) !== ge && (r |= kr), Ru(r, Mt, Vg.bind(null, t, e), a);
  }
  function Vc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(Qe, Mt, Vg.bind(null, t, e), a);
  }
  function jD(e, t) {
  }
  var Mc = jD;
  function em(e, t) {
    var n = Ga(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Ac(e, t) {
    var n = sa(), a = t === void 0 ? null : t, r = n.memoizedState;
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
    var n = sa(), a = t === void 0 ? null : t, r = n.memoizedState;
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
  function Mg(e) {
    var t = sa(), n = At, a = n.memoizedState;
    return kg(t, a, e);
  }
  function Ag(e) {
    var t = sa();
    if (At === null)
      return t.memoizedState = e, e;
    var n = At.memoizedState;
    return kg(t, n, e);
  }
  function kg(e, t, n) {
    var a = !pS(Bi);
    if (a) {
      if (!Qn(n, t)) {
        var r = Lh();
        tt.lanes = Le(tt.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function wD(e, t, n) {
    var a = xa();
    Qt(xS(a, mr)), e(!0);
    var r = Nu.transition;
    Nu.transition = {};
    var i = Nu.transition;
    Nu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Qt(a), Nu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && R("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function am() {
    var e = Tc(!1), t = e[0], n = e[1], a = wD.bind(null, n), r = Ga();
    return r.memoizedState = a, [t, a];
  }
  function Ug() {
    var e = Wp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  function zg() {
    var e = Qp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  var Fg = !1;
  function _D() {
    return Fg;
  }
  function rm() {
    var e = Ga(), t = af(), n = t.identifierPrefix, a;
    if (nn()) {
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
    var e = sa(), t = e.memoizedState;
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
        var l = _n();
        Ht(i, e, a, l), Pg(i, t, a);
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
      if (e.lanes === I && (i === null || i.lanes === I)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = le.current, le.current = Ta;
          try {
            var u = t.lastRenderedState, p = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = p, Qn(p, u)) {
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
        var x = _n();
        Ht(v, e, a, x), Pg(v, t, a);
      }
    }
    $g(e, a);
  }
  function Hg(e) {
    var t = e.alternate;
    return e === tt || t !== null && t === tt;
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
      var r = Le(a, n);
      t.lanes = r, Sd(e, r);
    }
  }
  function $g(e, t, n) {
    Jf(e, t);
  }
  var zc = {
    readContext: wt,
    useCallback: yn,
    useContext: yn,
    useEffect: yn,
    useImperativeHandle: yn,
    useInsertionEffect: yn,
    useLayoutEffect: yn,
    useMemo: yn,
    useReducer: yn,
    useRef: yn,
    useState: yn,
    useDebugValue: yn,
    useDeferredValue: yn,
    useTransition: yn,
    useMutableSource: yn,
    useSyncExternalStore: yn,
    useId: yn,
    unstable_isNewReconciler: yt
  }, Yg = null, Ig = null, qg = null, Gg = null, Wa = null, Ta = null, Fc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, De = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Yg = {
      readContext: function(e) {
        return wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", Xe(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Xe(), wt(e);
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
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", Xe();
        var a = le.current;
        le.current = Wa;
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
        le.current = Wa;
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
      unstable_isNewReconciler: yt
    }, Ig = {
      readContext: function(e) {
        return wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", J(), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", J(), wt(e);
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
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", J();
        var a = le.current;
        le.current = Wa;
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
        le.current = Wa;
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
      unstable_isNewReconciler: yt
    }, qg = {
      readContext: function(e) {
        return wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", J(), wt(e);
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
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", J();
        var a = le.current;
        le.current = Ta;
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
        le.current = Ta;
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
      unstable_isNewReconciler: yt
    }, Gg = {
      readContext: function(e) {
        return wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", J(), wt(e);
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
        le.current = Fc;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", J();
        var a = le.current;
        le.current = Fc;
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
        le.current = Fc;
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
        return H = "useTransition", J(), zg();
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
      unstable_isNewReconciler: yt
    }, Wa = {
      readContext: function(e) {
        return im(), wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", De(), Xe(), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", De(), Xe(), wt(e);
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
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", De(), Xe();
        var a = le.current;
        le.current = Wa;
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
        le.current = Wa;
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
      unstable_isNewReconciler: yt
    }, Ta = {
      readContext: function(e) {
        return im(), wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", De(), J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", De(), J(), wt(e);
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
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", De(), J();
        var a = le.current;
        le.current = Ta;
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
        le.current = Ta;
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
      unstable_isNewReconciler: yt
    }, Fc = {
      readContext: function(e) {
        return im(), wt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", De(), J(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", De(), J(), wt(e);
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
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", De(), J();
        var a = le.current;
        le.current = Ta;
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
        le.current = Ta;
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
        return H = "useTransition", De(), J(), zg();
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
      unstable_isNewReconciler: yt
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
          case q:
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
          case q:
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
      var n = Ae({}, t), a = e.defaultProps;
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
      if (e.mode & St) {
        Gt(!0);
        try {
          i = n(a, r);
        } finally {
          Gt(!1);
        }
      }
      Zg(t, i);
    }
    var l = i == null ? r : Ae({}, r, i);
    if (e.memoizedState = l, e.lanes === I) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: Dx,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = _n(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (Ht(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = _n(), i = ni(a), l = Er(r, i);
      l.tag = yg, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (Ht(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = _n(), r = ni(n), i = Er(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && (Ht(l, n, r, a), bc(l, n, r)), aS(n, r);
    }
  };
  function tb(e, t, n, a, r, i, l) {
    var o = e.stateNode;
    if (typeof o.shouldComponentUpdate == "function") {
      var u = o.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & St) {
          Gt(!0);
          try {
            u = o.shouldComponentUpdate(a, i, l);
          } finally {
            Gt(!1);
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
      (e.mode & St) === ge && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === ge && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !gm.has(t) && (gm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", We(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", We(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || ke(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function nb(e, t) {
    t.updater = Em, e.stateNode = t, xx(t, e), t._reactInternalInstance = fm;
  }
  function ab(e, t, n) {
    var a = !1, r = Kn, i = Kn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === ne && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === G ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", We(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = wt(l);
    else {
      r = wl(e, t, !0);
      var p = t.contextTypes;
      a = p != null, i = a ? _l(e, r) : Kn;
    }
    var v = new t(n, i);
    if (e.mode & St) {
      Gt(!0);
      try {
        v = new t(n, i);
      } finally {
        Gt(!1);
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
      r.context = wt(i);
    else {
      var l = wl(e, t, !0);
      r.context = _l(e, l);
    }
    {
      if (r.state === n) {
        var o = We(t) || "Component";
        ym.has(o) || (ym.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & St && Ca.recordLegacyContextWarning(e, r), Ca.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Nm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (UD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var p = Qe;
      p |= Ri, (e.mode & Pa) !== ge && (p |= kr), e.flags |= p;
    }
  }
  function zD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, u = Kn;
    if (typeof o == "object" && o !== null)
      u = wt(o);
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
        V |= Ri, (e.mode & Pa) !== ge && (V |= kr), e.flags |= V;
      }
      return !1;
    }
    typeof v == "function" && (Nm(e, t, v, n), O = e.memoizedState);
    var U = Ec() || tb(e, t, i, n, E, O, u);
    if (U) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ae = Qe;
        ae |= Ri, (e.mode & Pa) !== ge && (ae |= kr), e.flags |= ae;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var he = Qe;
        he |= Ri, (e.mode & Pa) !== ge && (he |= kr), e.flags |= he;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = u, U;
  }
  function FD(e, t, n, a, r) {
    var i = t.stateNode;
    gg(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : ja(t.type, l);
    i.props = o;
    var u = t.pendingProps, p = i.context, v = n.contextType, x = Kn;
    if (typeof v == "object" && v !== null)
      x = wt(v);
    else {
      var E = wl(t, n, !0);
      x = _l(t, E);
    }
    var O = n.getDerivedStateFromProps, V = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || p !== x) && rb(t, i, a, x), bg();
    var U = t.memoizedState, ae = i.state = U;
    if (Nc(t, a, i, r), ae = t.memoizedState, l === u && U === ae && !tc() && !Ec() && !pt)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), !1;
    typeof O == "function" && (Nm(t, n, O, a), ae = t.memoizedState);
    var he = Ec() || tb(t, n, o, a, U, ae, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    pt;
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
    var a = Er(ut, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Vj(r), Rm(e, t);
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
        hN(e), Rm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      hN(e), Rm(e, t), typeof r != "function" && Oj(this);
      var u = t.value, p = t.stack;
      this.componentDidCatch(u, {
        componentStack: p !== null ? p : ""
      }), typeof r != "function" && (qn(e.lanes, Ce) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", we(e) || "Unknown"));
    }), a;
  }
  function lb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new BD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Mj.bind(null, e, t, n);
      Ea && Yu(e, n), t.then(i, i);
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
    if ((e.mode & Pe) === ge && (n === C || n === Q || n === B)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function ob(e) {
    var t = e;
    do {
      if (t.tag === P && SD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ub(e, t, n, a, r) {
    if ((e.mode & Pe) === ge) {
      if (e === t)
        e.flags |= Tn;
      else {
        if (e.flags |= Ke, n.flags |= Yf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = Se;
          else {
            var l = Er(ut, Ce);
            l.tag = hc, Wr(n, l, Ce);
          }
        }
        n.lanes = Le(n.lanes, Ce);
      }
      return e;
    }
    return e.flags |= Tn, e.lanes = r, e;
  }
  function YD(e, t, n, a, r) {
    if (n.flags |= bs, Ea && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      $D(n), nn() && n.mode & Pe && Zy();
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
    } else if (nn() && n.mode & Pe) {
      Zy();
      var u = ob(t);
      if (u !== null) {
        (u.flags & Tn) === Ne && (u.flags |= cr), ub(u, t, n, e, r), yp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), Sj(a);
    var p = t;
    do {
      switch (p.tag) {
        case S: {
          var v = a;
          p.flags |= Tn;
          var x = Mo(r);
          p.lanes = Le(p.lanes, x);
          var E = ib(p, v, x);
          Lp(p, E);
          return;
        }
        case T:
          var O = a, V = p.type, U = p.stateNode;
          if ((p.flags & Ke) === Ne && (typeof V.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && !oN(U))) {
            p.flags |= Tn;
            var ae = Mo(r);
            p.lanes = Le(p.lanes, ae);
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
  var ju = h.ReactCurrentOwner, wa = !1, Dm, wu, Tm, jm, wm, $i, _m, Ic, _u;
  Dm = {}, wu = {}, Tm = {}, jm = {}, wm = {}, $i = !1, _m = {}, Ic = {}, _u = {};
  function jn(e, t, n, a) {
    e === null ? t.child = fg(t, null, n, a) : t.child = Ml(t, e.child, n, a);
  }
  function qD(e, t, n, a) {
    t.child = Ml(t, e.child, null, a), t.child = Ml(t, null, n, a);
  }
  function sb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Sa(
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
      if (ju.current = t, ra(!0), u = Pl(e, t, l, a, o, r), p = $l(), t.mode & St) {
        Gt(!0);
        try {
          u = Pl(e, t, l, a, o, r), p = $l();
        } finally {
          Gt(!1);
        }
      }
      ra(!1);
    }
    return vl(), e !== null && !wa ? (Cg(e, t, r), xr(e, t, r)) : (nn() && p && fp(t), t.flags |= fl, jn(e, t, u, r), t.child);
  }
  function cb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (Xj(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = B, t.type = l, Vm(t, i), fb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && Sa(
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
      x && Sa(
        x,
        a,
        // Resolved props
        "prop",
        We(v)
      );
    }
    var E = e.child, O = Fm(e, r);
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
        p && Sa(
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
        if (wa = !1, t.pendingProps = a = v, Fm(e, r))
          (e.flags & Yf) !== Ne && (wa = !0);
        else return t.lanes = e.lanes, xr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function db(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Pn)
      if ((t.mode & Pe) === ge) {
        var l = {
          baseLanes: I,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (qn(n, In)) {
        var x = {
          baseLanes: I,
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
          u = Le(p, n);
        } else
          u = n;
        t.lanes = t.childLanes = In;
        var v = {
          baseLanes: u,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, rf(t, u), null;
      }
    else {
      var O;
      i !== null ? (O = Le(i.baseLanes, n), t.memoizedState = null) : O = n, rf(t, O);
    }
    return jn(e, t, r, n), t.child;
  }
  function GD(e, t, n) {
    var a = t.pendingProps;
    return jn(e, t, a, n), t.child;
  }
  function WD(e, t, n) {
    var a = t.pendingProps.children;
    return jn(e, t, a, n), t.child;
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
    return jn(e, t, i, n), t.child;
  }
  function pb(e, t) {
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
      if (ju.current = t, ra(!0), u = Pl(e, t, n, a, l, r), p = $l(), t.mode & St) {
        Gt(!0);
        try {
          u = Pl(e, t, n, a, l, r), p = $l();
        } finally {
          Gt(!1);
        }
      }
      ra(!1);
    }
    return vl(), e !== null && !wa ? (Cg(e, t, r), xr(e, t, r)) : (nn() && p && fp(t), t.flags |= fl, jn(e, t, u, r), t.child);
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
          t.flags |= Ke, t.flags |= Tn;
          var p = new Error("Simulated error coming from DevTools"), v = Mo(r);
          t.lanes = Le(t.lanes, v);
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
          We(n)
        );
      }
    }
    var O;
    Ia(n) ? (O = !0, ac(t)) : O = !1, kl(t, r);
    var V = t.stateNode, U;
    V === null ? (Gc(e, t), ab(t, n, a), xm(t, n, a, r), U = !0) : e === null ? U = zD(t, n, a, r) : U = FD(e, t, n, a, r);
    var ae = Lm(e, t, n, U, O, r);
    {
      var he = t.stateNode;
      U && he.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", we(t) || "a component"), $i = !0);
    }
    return ae;
  }
  function Lm(e, t, n, a, r, i) {
    pb(e, t);
    var l = (t.flags & Ke) !== Ne;
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
        if (ra(!0), u = o.render(), t.mode & St) {
          Gt(!0);
          try {
            o.render();
          } finally {
            Gt(!1);
          }
        }
        ra(!1);
      }
      vl();
    }
    return t.flags |= fl, e !== null && l ? qD(e, t, u, i) : jn(e, t, u, i), t.memoizedState = o.state, r && Qy(t, n, !0), t.child;
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
          O.flags = O.flags & ~jt | fr, O = O.sibling;
      }
    } else {
      if (Vl(), o === i)
        return xr(e, t, n);
      jn(e, t, o, n);
    }
    return t.child;
  }
  function hb(e, t, n, a, r) {
    return Vl(), yp(r), t.flags |= cr, jn(e, t, n, a), t.child;
  }
  function XD(e, t, n) {
    xg(t), e === null && hp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Xd(a, r);
    return o ? l = null : i !== null && Xd(a, i) && (t.flags |= Do), pb(e, t), jn(e, t, l, n), t.child;
  }
  function JD(e, t) {
    return e === null && hp(t), null;
  }
  function ZD(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, u = o(l);
    t.type = u;
    var p = t.tag = Jj(u), v = ja(u, r), x;
    switch (p) {
      case C:
        return Vm(t, u), t.type = u = Xl(u), x = Om(null, t, u, v, a), x;
      case T:
        return t.type = u = sv(u), x = mb(null, t, u, v, a), x;
      case Q:
        return t.type = u = cv(u), x = sb(null, t, u, v, a), x;
      case Z: {
        if (t.type !== t.elementType) {
          var E = u.propTypes;
          E && Sa(
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
          ja(u.type, v),
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
    return Ia(n) ? (i = !0, ac(t)) : i = !1, kl(t, r), ab(t, n, a), xm(t, n, a, r), Lm(null, t, n, !0, i, r);
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
      t.mode & St && Ca.recordLegacyContextWarning(t, null), ra(!0), ju.current = t, o = Pl(null, t, n, r, i, a), u = $l(), ra(!1);
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
      return Ia(n) ? (E = !0, ac(t)) : E = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Op(t), nb(t, o), xm(t, n, r, a), Lm(null, t, n, !0, E, a);
    } else {
      if (t.tag = C, t.mode & St) {
        Gt(!0);
        try {
          o = Pl(null, t, n, r, i, a), u = $l();
        } finally {
          Gt(!1);
        }
      }
      return nn() && u && fp(t), jn(null, t, o, a), Vm(t, n), t.child;
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
    retryLane: Wt
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
      baseLanes: Le(e.baseLanes, t),
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
    var r = Da.current, i = !1, l = (t.flags & Ke) !== Ne;
    if (l || aT(r, e) ? (i = !0, t.flags &= ~Ke) : (e === null || e.memoizedState !== null) && (r = xD(r, Rg)), r = zl(r), Kr(t, r), e === null) {
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
        var U = a.fallback, ae = a.children, he = oT(e, t, ae, U, n), pe = t.child, Ye = e.child.memoizedState;
        return pe.memoizedState = Ye === null ? Am(n) : nT(Ye, n), pe.childLanes = rT(e, n), t.memoizedState = Mm, he;
      } else {
        var Ue = a.children, j = lT(e, t, Ue, n);
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
    return (r & Pe) === ge && i !== null ? (o = i, o.childLanes = I, o.pendingProps = l, e.mode & et && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = ri(n, r, a, null)) : (o = Um(l, r), u = ri(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function Um(e, t, n) {
    return gN(e, t, I, null);
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
      p = v, p.childLanes = I, p.pendingProps = u, t.mode & et && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = l.selfBaseDuration, p.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      p = gb(l, u), p.subtreeFlags = l.subtreeFlags & dr;
    var x;
    return o !== null ? x = Wi(o, a) : (x = ri(a, i, r, null), x.flags |= jt), x.return = t, p.return = t, p.sibling = x, t.child = p, x;
  }
  function qc(e, t, n, a) {
    a !== null && yp(a), Ml(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = km(t, i);
    return l.flags |= jt, t.memoizedState = null, l;
  }
  function uT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Um(l, i), u = ri(a, i, r, null);
    return u.flags |= jt, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & Pe) !== ge && Ml(t, e.child, null, r), u;
  }
  function sT(e, t, n) {
    return (e.mode & Pe) === ge ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ce) : tp(t) ? e.lanes = Ti : e.lanes = In, null;
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
        var z = a.children, w = a.fallback, W = uT(e, t, z, w, l), oe = t.child;
        return oe.memoizedState = Am(l), t.memoizedState = Mm, W;
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
      var O = qn(l, e.childLanes);
      if (wa || O) {
        var V = af();
        if (V !== null) {
          var U = NS(V, l);
          if (U !== Wt && U !== i.retryLane) {
            i.retryLane = U;
            var ae = ut;
            zn(e, U), Ht(V, e, U, ae);
          }
        }
        rv();
        var he = Sm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, he);
      } else if (By(r)) {
        t.flags |= Ke, t.child = e.child;
        var pe = Aj.bind(null, e);
        return v0(r, pe), null;
      } else {
        eD(t, r, i.treeContext);
        var Ye = a.children, Ue = km(t, Ye);
        return Ue.flags |= fr, Ue;
      }
    }
  }
  function bb(e, t, n) {
    e.lanes = Le(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Le(a.lanes, t)), Tp(e.return, t, n);
  }
  function fT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === P) {
        var r = a.memoizedState;
        r !== null && bb(a, n, e);
      } else if (a.tag === Me)
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
      var n = ke(e), a = !n && typeof ba(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function vT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (ke(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Nb(e[n], n))
            return;
      } else {
        var a = ba(e);
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
  function Eb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    pT(r), mT(i, r), vT(l, r), jn(e, t, l, n);
    var o = Da.current, u = kp(o, bu);
    if (u)
      o = Up(o, bu), t.flags |= Ke;
    else {
      var p = e !== null && (e.flags & Ke) !== Ne;
      p && fT(t, t.child, n), o = zl(o);
    }
    if (Kr(t, o), (t.mode & Pe) === ge)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = dT(t.child), x;
          v === null ? (x = t.child, t.child = null) : (x = v.sibling, v.sibling = null), zm(
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
  function hT(e, t, n) {
    Vp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ml(t, null, a, n) : jn(e, t, a, n), t.child;
  }
  var xb = !1;
  function yT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || xb || (xb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && Sa(u, i, "prop", "Context.Provider");
    }
    if (mg(t, r, o), l !== null) {
      var p = l.value;
      if (Qn(p, o)) {
        if (l.children === i.children && !tc())
          return xr(e, t, n);
      } else
        pD(t, r, n);
    }
    var v = i.children;
    return jn(e, t, v, n), t.child;
  }
  var Sb = !1;
  function gT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Sb || (Sb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kl(t, n);
    var l = wt(a);
    jo(t);
    var o;
    return ju.current = t, ra(!0), o = i(l), ra(!1), vl(), t.flags |= fl, jn(e, t, o, n), t.child;
  }
  function Ou() {
    wa = !0;
  }
  function Gc(e, t) {
    (t.mode & Pe) === ge && e !== null && (e.alternate = null, t.alternate = null, t.flags |= jt);
  }
  function xr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Jg(), $u(t.lanes), qn(n, t.childLanes) ? (fD(e, t), t.child) : null;
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
      return i === null ? (a.deletions = [e], a.flags |= Ei) : i.push(e), n.flags |= jt, n;
    }
  }
  function Fm(e, t) {
    var n = e.lanes;
    return !!qn(n, t);
  }
  function NT(e, t, n) {
    switch (t.tag) {
      case S:
        vb(t), t.stateNode, Vl();
        break;
      case F:
        xg(t);
        break;
      case T: {
        var a = t.type;
        Ia(a) && ac(t);
        break;
      }
      case M:
        Vp(t, t.stateNode.containerInfo);
        break;
      case $: {
        var r = t.memoizedProps.value, i = t.type._context;
        mg(t, i, r);
        break;
      }
      case q:
        {
          var l = qn(n, t.childLanes);
          l && (t.flags |= Qe);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case P: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Kr(t, zl(Da.current)), t.flags |= Ke, null;
          var p = t.child, v = p.childLanes;
          if (qn(n, v))
            return yb(e, t, n);
          Kr(t, zl(Da.current));
          var x = xr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Kr(t, zl(Da.current));
        break;
      }
      case Me: {
        var E = (e.flags & Ke) !== Ne, O = qn(n, t.childLanes);
        if (E) {
          if (O)
            return Eb(e, t, n);
          t.flags |= Ke;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Kr(t, Da.current), O)
          break;
        return null;
      }
      case de:
      case _e:
        return t.lanes = I, db(e, t, n);
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
        wa = !0;
      else {
        var i = Fm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Ke) === Ne)
          return wa = !1, NT(e, t, n);
        (e.flags & Yf) !== Ne ? wa = !0 : wa = !1;
      }
    } else if (wa = !1, nn() && I0(t)) {
      var l = t.index, o = q0();
      Jy(t, o, l);
    }
    switch (t.lanes = I, t.tag) {
      case _:
        return tT(e, t, t.type, n);
      case Ie: {
        var u = t.elementType;
        return ZD(e, t, u, n);
      }
      case C: {
        var p = t.type, v = t.pendingProps, x = t.elementType === p ? v : ja(p, v);
        return Om(e, t, p, x, n);
      }
      case T: {
        var E = t.type, O = t.pendingProps, V = t.elementType === E ? O : ja(E, O);
        return mb(e, t, E, V, n);
      }
      case S:
        return KD(e, t, n);
      case F:
        return XD(e, t, n);
      case K:
        return JD(e, t);
      case P:
        return yb(e, t, n);
      case M:
        return hT(e, t, n);
      case Q: {
        var U = t.type, ae = t.pendingProps, he = t.elementType === U ? ae : ja(U, ae);
        return sb(e, t, U, he, n);
      }
      case fe:
        return GD(e, t, n);
      case te:
        return WD(e, t, n);
      case q:
        return QD(e, t, n);
      case $:
        return yT(e, t, n);
      case ue:
        return gT(e, t, n);
      case Z: {
        var pe = t.type, Ye = t.pendingProps, Ue = ja(pe, Ye);
        if (t.type !== t.elementType) {
          var j = pe.propTypes;
          j && Sa(
            j,
            Ue,
            // Resolved for outer only
            "prop",
            We(pe)
          );
        }
        return Ue = ja(pe.type, Ue), cb(e, t, pe, Ue, n);
      }
      case B:
        return fb(e, t, t.type, t.pendingProps, n);
      case Se: {
        var z = t.type, w = t.pendingProps, W = t.elementType === z ? w : ja(z, w);
        return eT(e, t, z, W, n);
      }
      case Me:
        return Eb(e, t, n);
      case Y:
        break;
      case de:
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
      if (r.tag === F || r.tag === K)
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
    if (!nn())
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
  function rn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = I, a = Ne;
    if (t) {
      if ((e.mode & et) !== ge) {
        for (var u = e.selfBaseDuration, p = e.child; p !== null; )
          n = Le(n, Le(p.lanes, p.childLanes)), a |= p.subtreeFlags & dr, a |= p.flags & dr, u += p.treeBaseDuration, p = p.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = Le(n, Le(v.lanes, v.childLanes)), a |= v.subtreeFlags & dr, a |= v.flags & dr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & et) !== ge) {
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
  function ET(e, t, n) {
    if (iD() && (t.mode & Pe) !== ge && (t.flags & Ke) === Ne)
      return ig(t), Vl(), t.flags |= cr | bs | Tn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (aD(t), rn(t), (t.mode & et) !== ge) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Ke) === Ne && (t.memoizedState = null), t.flags |= Qe, rn(t), (t.mode & et) !== ge) {
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
      case Ie:
      case B:
      case C:
      case Q:
      case fe:
      case te:
      case q:
      case ue:
      case Z:
        return rn(t), null;
      case T: {
        var r = t.type;
        return Ia(r) && nc(t), rn(t), null;
      }
      case S: {
        var i = t.stateNode;
        if (Ul(t), up(t), Fp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = uc(t);
          if (l)
            Yl(t);
          else if (e !== null) {
            var o = e.memoizedState;
            // Check if this is a client root
            (!o.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== Ne) && (t.flags |= dl, lg());
          }
        }
        return Hm(e, t), rn(t), null;
      }
      case F: {
        Ap(t);
        var u = Eg(), p = t.type;
        if (e !== null && t.stateNode != null)
          Tb(e, t, p, a, u), e.ref !== t.ref && Cb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return rn(t), null;
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
        return rn(t), null;
      }
      case K: {
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
        return rn(t), null;
      }
      case P: {
        Fl(t);
        var pe = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ye = ET(e, t, pe);
          if (!Ye)
            return t.flags & Tn ? t : null;
        }
        if ((t.flags & Ke) !== Ne)
          return t.lanes = n, (t.mode & et) !== ge && cm(t), t;
        var Ue = pe !== null, j = e !== null && e.memoizedState !== null;
        if (Ue !== j && Ue) {
          var z = t.child;
          if (z.flags |= Si, (t.mode & Pe) !== ge) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(Da.current, Rg) ? xj() : rv();
          }
        }
        var W = t.updateQueue;
        if (W !== null && (t.flags |= Qe), rn(t), (t.mode & et) !== ge && Ue) {
          var oe = t.child;
          oe !== null && (t.treeBaseDuration -= oe.treeBaseDuration);
        }
        return null;
      }
      case M:
        return Ul(t), Hm(e, t), e === null && z0(t.stateNode.containerInfo), rn(t), null;
      case $:
        var re = t.type._context;
        return Dp(re, t), rn(t), null;
      case Se: {
        var xe = t.type;
        return Ia(xe) && nc(t), rn(t), null;
      }
      case Me: {
        Fl(t);
        var je = t.memoizedState;
        if (je === null)
          return rn(t), null;
        var nt = (t.flags & Ke) !== Ne, qe = je.rendering;
        if (qe === null)
          if (nt)
            Lu(je, !1);
          else {
            var Ct = Rj() && (e === null || (e.flags & Ke) === Ne);
            if (!Ct)
              for (var Ge = t.child; Ge !== null; ) {
                var Rt = Rc(Ge);
                if (Rt !== null) {
                  nt = !0, t.flags |= Ke, Lu(je, !1);
                  var gn = Rt.updateQueue;
                  return gn !== null && (t.updateQueue = gn, t.flags |= Qe), t.subtreeFlags = Ne, dD(t, n), Kr(t, Up(Da.current, bu)), t.child;
                }
                Ge = Ge.sibling;
              }
            je.tail !== null && qt() > Kb() && (t.flags |= Ke, nt = !0, Lu(je, !1), t.lanes = jh);
          }
        else {
          if (!nt) {
            var cn = Rc(qe);
            if (cn !== null) {
              t.flags |= Ke, nt = !0;
              var Jn = cn.updateQueue;
              if (Jn !== null && (t.updateQueue = Jn, t.flags |= Qe), Lu(je, !0), je.tail === null && je.tailMode === "hidden" && !qe.alternate && !nn())
                return rn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - je.renderingStartTime > Kb() && n !== In && (t.flags |= Ke, nt = !0, Lu(je, !1), t.lanes = jh);
          }
          if (je.isBackwards)
            qe.sibling = t.child, t.child = qe;
          else {
            var On = je.last;
            On !== null ? On.sibling = qe : t.child = qe, je.last = qe;
          }
        }
        if (je.tail !== null) {
          var Ln = je.tail;
          je.rendering = Ln, je.tail = Ln.sibling, je.renderingStartTime = qt(), Ln.sibling = null;
          var bn = Da.current;
          return nt ? bn = Up(bn, bu) : bn = zl(bn), Kr(t, bn), Ln;
        }
        return rn(t), null;
      }
      case Y:
        break;
      case de:
      case _e: {
        av(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, Za = Wu !== null;
          Za !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Pn && (t.flags |= Si);
        }
        return !Jl || (t.mode & Pe) === ge ? rn(t) : qn(Ja, In) && (rn(t), t.subtreeFlags & (jt | Qe) && (t.flags |= Si)), null;
      }
      case He:
        return null;
      case at:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function xT(e, t, n) {
    switch (dp(t), t.tag) {
      case T: {
        var a = t.type;
        Ia(a) && nc(t);
        var r = t.flags;
        return r & Tn ? (t.flags = r & ~Tn | Ke, (t.mode & et) !== ge && cm(t), t) : null;
      }
      case S: {
        t.stateNode, Ul(t), up(t), Fp();
        var i = t.flags;
        return (i & Tn) !== Ne && (i & Ke) === Ne ? (t.flags = i & ~Tn | Ke, t) : null;
      }
      case F:
        return Ap(t), null;
      case P: {
        Fl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var o = t.flags;
        return o & Tn ? (t.flags = o & ~Tn | Ke, (t.mode & et) !== ge && cm(t), t) : null;
      }
      case Me:
        return Fl(t), null;
      case M:
        return Ul(t), null;
      case $:
        var u = t.type._context;
        return Dp(u, t), null;
      case de:
      case _e:
        return av(t), null;
      case He:
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
        t.stateNode, Ul(t), up(t), Fp();
        break;
      }
      case F: {
        Ap(t);
        break;
      }
      case M:
        Ul(t);
        break;
      case P:
        Fl(t);
        break;
      case Me:
        Fl(t);
        break;
      case $:
        var r = t.type._context;
        Dp(r, t);
        break;
      case de:
      case _e:
        av(t);
        break;
    }
  }
  var Ob = null;
  Ob = /* @__PURE__ */ new Set();
  var Wc = !1, ln = !1, ST = typeof WeakSet == "function" ? WeakSet : Set, se = null, Il = null, ql = null;
  function RT(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var CT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & et)
      try {
        Ka(), t.componentWillUnmount();
      } finally {
        Qa(e);
      }
    else
      t.componentWillUnmount();
  };
  function Lb(e, t) {
    try {
      Zr(Mt, e);
    } catch (n) {
      it(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      CT(e, n);
    } catch (a) {
      it(e, t, a);
    }
  }
  function DT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      it(e, t, a);
    }
  }
  function Vb(e, t) {
    try {
      Ab(e);
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
          if (Nn && er && e.mode & et)
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
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", we(e));
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
  var Mb = !1;
  function TT(e, t) {
    FC(e.containerInfo), se = t, jT();
    var n = Mb;
    return Mb = !1, n;
  }
  function jT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      (e.subtreeFlags & Wf) !== Ne && t !== null ? (t.return = e, se = t) : wT();
    }
  }
  function wT() {
    for (; se !== null; ) {
      var e = se;
      mt(e);
      try {
        _T(e);
      } catch (n) {
        it(e, e.return, n);
      }
      It();
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
    if ((n & dl) !== Ne) {
      switch (mt(e), e.tag) {
        case C:
        case Q:
        case B:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !$i && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : ja(e.type, a), r);
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
        case F:
        case K:
        case M:
        case Se:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      It();
    }
  }
  function _a(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && ((e & an) !== Fn ? Ix(t) : (e & Mt) !== Fn && Sh(t), (e & qa) !== Fn && Iu(!0), Qc(t, n, o), (e & qa) !== Fn && Iu(!1), (e & an) !== Fn ? qx() : (e & Mt) !== Fn && Rh());
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
          (e & an) !== Fn ? $x(t) : (e & Mt) !== Fn && Gx(t);
          var l = i.create;
          (e & qa) !== Fn && Iu(!0), i.destroy = l(), (e & qa) !== Fn && Iu(!1), (e & an) !== Fn ? Yx() : (e & Mt) !== Fn && Wx();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var u = void 0;
              (i.tag & Mt) !== Ne ? u = "useLayoutEffect" : (i.tag & qa) !== Ne ? u = "useInsertionEffect" : u = "useEffect";
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
    if ((t.flags & Qe) !== Ne)
      switch (t.tag) {
        case q: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Kg(), o = t.alternate === null ? "mount" : "update";
          Qg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case S:
                var p = u.stateNode;
                p.passiveEffectDuration += n;
                break e;
              case q:
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
    if ((n.flags & To) !== Ne)
      switch (n.tag) {
        case C:
        case Q:
        case B: {
          if (!ln)
            if (n.mode & et)
              try {
                Ka(), Zr(Mt | Vt, n);
              } finally {
                Qa(n);
              }
            else
              Zr(Mt | Vt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Qe && !ln)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(n) || "instance")), n.mode & et)
                try {
                  Ka(), r.componentDidMount();
                } finally {
                  Qa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : ja(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", we(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", we(n) || "instance")), n.mode & et)
                try {
                  Ka(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Qa(n);
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
                case F:
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
        case F: {
          var v = n.stateNode;
          if (t === null && n.flags & Qe) {
            var x = n.type, E = n.memoizedProps;
            KC(v, x, E);
          }
          break;
        }
        case K:
          break;
        case M:
          break;
        case q: {
          {
            var O = n.memoizedProps, V = O.onCommit, U = O.onRender, ae = n.stateNode.effectDuration, he = Kg(), pe = t === null ? "mount" : "update";
            Qg() && (pe = "nested-update"), typeof U == "function" && U(n.memoizedProps.id, pe, n.actualDuration, n.treeBaseDuration, n.actualStartTime, he);
            {
              typeof V == "function" && V(n.memoizedProps.id, pe, ae, he), wj(n);
              var Ye = n.return;
              e: for (; Ye !== null; ) {
                switch (Ye.tag) {
                  case S:
                    var Ue = Ye.stateNode;
                    Ue.effectDuration += ae;
                    break e;
                  case q:
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
        case P: {
          HT(e, n);
          break;
        }
        case Me:
        case Se:
        case Y:
        case de:
        case _e:
        case at:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    ln || n.flags & xi && Ab(n);
  }
  function VT(e) {
    switch (e.tag) {
      case C:
      case Q:
      case B: {
        if (e.mode & et)
          try {
            Ka(), Lb(e, e.return);
          } finally {
            Qa(e);
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
      case F: {
        Vb(e, e.return);
        break;
      }
    }
  }
  function MT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === F) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? l0(r) : u0(a.stateNode, a.memoizedProps);
          } catch (l) {
            it(e, e.return, l);
          }
        }
      } else if (a.tag === K) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? o0(i) : s0(i, a.memoizedProps);
          } catch (l) {
            it(e, e.return, l);
          }
      } else if (!((a.tag === de || a.tag === _e) && a.memoizedState !== null && a !== e)) {
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
        case F:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & et)
          try {
            Ka(), r = t(a);
          } finally {
            Qa(e);
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === F) {
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
    return e.tag === F || e.tag === S || e.tag === M;
  }
  function zb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ub(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== F && t.tag !== K && t.tag !== Fe; ) {
        if (t.flags & jt || t.child === null || t.tag === M)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & jt))
        return t.stateNode;
    }
  }
  function UT(e) {
    var t = kT(e);
    switch (t.tag) {
      case F: {
        var n = t.stateNode;
        t.flags & Do && (Hy(n), t.flags &= ~Do);
        var a = zb(e);
        $m(e, a, n);
        break;
      }
      case S:
      case M: {
        var r = t.stateNode.containerInfo, i = zb(e);
        Pm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Pm(e, t, n) {
    var a = e.tag, r = a === F || a === K;
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
    var a = e.tag, r = a === F || a === K;
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
  var on = null, Oa = !1;
  function zT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case F: {
            on = a.stateNode, Oa = !1;
            break e;
          }
          case S: {
            on = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
          case M: {
            on = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (on === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Fb(e, t, n), on = null, Oa = !1;
    }
    AT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      Fb(e, t, a), a = a.sibling;
  }
  function Fb(e, t, n) {
    switch (Fx(n), n.tag) {
      case F:
        ln || Gl(n, t);
      case K: {
        {
          var a = on, r = Oa;
          on = null, ei(e, t, n), on = a, Oa = r, on !== null && (Oa ? r0(on, n.stateNode) : a0(on, n.stateNode));
        }
        return;
      }
      case Fe: {
        on !== null && (Oa ? i0(on, n.stateNode) : ep(on, n.stateNode));
        return;
      }
      case M: {
        {
          var i = on, l = Oa;
          on = n.stateNode.containerInfo, Oa = !0, ei(e, t, n), on = i, Oa = l;
        }
        return;
      }
      case C:
      case Q:
      case Z:
      case B: {
        if (!ln) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var p = u.next, v = p;
              do {
                var x = v, E = x.destroy, O = x.tag;
                E !== void 0 && ((O & qa) !== Fn ? Qc(n, t, E) : (O & Mt) !== Fn && (Sh(n), n.mode & et ? (Ka(), Qc(n, t, E), Qa(n)) : Qc(n, t, E), Rh())), v = v.next;
              } while (v !== p);
            }
          }
        }
        ei(e, t, n);
        return;
      }
      case T: {
        if (!ln) {
          Gl(n, t);
          var V = n.stateNode;
          typeof V.componentWillUnmount == "function" && Bm(n, t, V);
        }
        ei(e, t, n);
        return;
      }
      case Y: {
        ei(e, t, n);
        return;
      }
      case de: {
        if (
          // TODO: Remove this dead flag
          n.mode & Pe
        ) {
          var U = ln;
          ln = U || n.memoizedState !== null, ei(e, t, n), ln = U;
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
  function FT(e) {
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
  function BT(e, t, n) {
    Il = n, ql = e, mt(t), Bb(t, e), mt(t), Il = null, ql = null;
  }
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          zT(e, t, i);
        } catch (u) {
          it(i, t, u);
        }
      }
    var l = us();
    if (t.subtreeFlags & Qf)
      for (var o = t.child; o !== null; )
        mt(o), Bb(o, e), o = o.sibling;
    mt(l);
  }
  function Bb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case C:
      case Q:
      case Z:
      case B: {
        if (La(t, e), Xa(e), r & Qe) {
          try {
            _a(qa | Vt, e, e.return), Zr(qa | Vt, e);
          } catch (xe) {
            it(e, e.return, xe);
          }
          if (e.mode & et) {
            try {
              Ka(), _a(Mt | Vt, e, e.return);
            } catch (xe) {
              it(e, e.return, xe);
            }
            Qa(e);
          } else
            try {
              _a(Mt | Vt, e, e.return);
            } catch (xe) {
              it(e, e.return, xe);
            }
        }
        return;
      }
      case T: {
        La(t, e), Xa(e), r & xi && a !== null && Gl(a, a.return);
        return;
      }
      case F: {
        La(t, e), Xa(e), r & xi && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              Hy(i);
            } catch (xe) {
              it(e, e.return, xe);
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
                  it(e, e.return, xe);
                }
            }
          }
        }
        return;
      }
      case K: {
        if (La(t, e), Xa(e), r & Qe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, E = e.memoizedProps, O = a !== null ? a.memoizedProps : E;
          try {
            JC(x, O, E);
          } catch (xe) {
            it(e, e.return, xe);
          }
        }
        return;
      }
      case S: {
        if (La(t, e), Xa(e), r & Qe && a !== null) {
          var V = a.memoizedState;
          if (V.isDehydrated)
            try {
              S0(t.containerInfo);
            } catch (xe) {
              it(e, e.return, xe);
            }
        }
        return;
      }
      case M: {
        La(t, e), Xa(e);
        return;
      }
      case P: {
        La(t, e), Xa(e);
        var U = e.child;
        if (U.flags & Si) {
          var ae = U.stateNode, he = U.memoizedState, pe = he !== null;
          if (ae.isHidden = pe, pe) {
            var Ye = U.alternate !== null && U.alternate.memoizedState !== null;
            Ye || Ej();
          }
        }
        if (r & Qe) {
          try {
            FT(e);
          } catch (xe) {
            it(e, e.return, xe);
          }
          Hb(e);
        }
        return;
      }
      case de: {
        var Ue = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Pe
        ) {
          var j = ln;
          ln = j || Ue, La(t, e), ln = j;
        } else
          La(t, e);
        if (Xa(e), r & Si) {
          var z = e.stateNode, w = e.memoizedState, W = w !== null, oe = e;
          if (z.isHidden = W, W && !Ue && (oe.mode & Pe) !== ge) {
            se = oe;
            for (var re = oe.child; re !== null; )
              se = re, $T(re), re = re.sibling;
          }
          MT(oe, W);
        }
        return;
      }
      case Me: {
        La(t, e), Xa(e), r & Qe && Hb(e);
        return;
      }
      case Y:
        return;
      default: {
        La(t, e), Xa(e);
        return;
      }
    }
  }
  function Xa(e) {
    var t = e.flags;
    if (t & jt) {
      try {
        UT(e);
      } catch (n) {
        it(e, e.return, n);
      }
      e.flags &= ~jt;
    }
    t & fr && (e.flags &= ~fr);
  }
  function PT(e, t, n) {
    Il = n, ql = t, se = e, Pb(e, t, n), Il = null, ql = null;
  }
  function Pb(e, t, n) {
    for (var a = (e.mode & Pe) !== ge; se !== null; ) {
      var r = se, i = r.child;
      if (r.tag === de && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var u = r.alternate, p = u !== null && u.memoizedState !== null, v = p || ln, x = Wc, E = ln;
          Wc = o, ln = v, ln && !E && (se = r, YT(r));
          for (var O = i; O !== null; )
            se = O, Pb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          se = r, Wc = x, ln = E, Ym(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ne && i !== null ? (i.return = r, se = i) : Ym(e, t, n);
    }
  }
  function Ym(e, t, n) {
    for (; se !== null; ) {
      var a = se;
      if ((a.flags & To) !== Ne) {
        var r = a.alternate;
        mt(a);
        try {
          LT(t, r, a, n);
        } catch (l) {
          it(a, a.return, l);
        }
        It();
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
        case C:
        case Q:
        case Z:
        case B: {
          if (t.mode & et)
            try {
              Ka(), _a(Mt, t, t.return);
            } finally {
              Qa(t);
            }
          else
            _a(Mt, t, t.return);
          break;
        }
        case T: {
          Gl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Bm(t, t.return, a);
          break;
        }
        case F: {
          Gl(t, t.return);
          break;
        }
        case de: {
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
      if (t.tag === de) {
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
      mt(t);
      try {
        VT(t);
      } catch (a) {
        it(t, t.return, a);
      }
      if (It(), t === e) {
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
      (r.subtreeFlags & pl) !== Ne && i !== null ? (i.return = r, se = i) : GT(e, t, n, a);
    }
  }
  function GT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se;
      if ((r.flags & Ar) !== Ne) {
        mt(r);
        try {
          WT(t, r, n, a);
        } catch (l) {
          it(r, r.return, l);
        }
        It();
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
      case C:
      case Q:
      case B: {
        if (t.mode & et) {
          sm();
          try {
            Zr(an | Vt, t);
          } finally {
            um(t);
          }
        } else
          Zr(an | Vt, t);
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
      if ((se.flags & Ei) !== Ne) {
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
      (e.subtreeFlags & pl) !== Ne && t !== null ? (t.return = e, se = t) : XT();
    }
  }
  function XT() {
    for (; se !== null; ) {
      var e = se;
      (e.flags & Ar) !== Ne && (mt(e), JT(e), It());
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
      case C:
      case Q:
      case B: {
        e.mode & et ? (sm(), _a(an | Vt, e, e.return), um(e)) : _a(an | Vt, e, e.return);
        break;
      }
    }
  }
  function ZT(e, t) {
    for (; se !== null; ) {
      var n = se;
      mt(n), tj(n, t), It();
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
      case C:
      case Q:
      case B: {
        e.mode & et ? (sm(), _a(an, e, t), um(e)) : _a(an, e, t);
        break;
      }
    }
  }
  function nj(e) {
    switch (e.tag) {
      case C:
      case Q:
      case B: {
        try {
          Zr(Mt | Vt, e);
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
  function aj(e) {
    switch (e.tag) {
      case C:
      case Q:
      case B: {
        try {
          Zr(an | Vt, e);
        } catch (t) {
          it(e, e.return, t);
        }
        break;
      }
    }
  }
  function rj(e) {
    switch (e.tag) {
      case C:
      case Q:
      case B: {
        try {
          _a(Mt | Vt, e, e.return);
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
  function ij(e) {
    switch (e.tag) {
      case C:
      case Q:
      case B:
        try {
          _a(an | Vt, e, e.return);
        } catch (t) {
          it(e, e.return, t);
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
  var cj = Math.ceil, Im = h.ReactCurrentDispatcher, qm = h.ReactCurrentOwner, un = h.ReactCurrentBatchConfig, Va = h.ReactCurrentActQueue, Ut = (
    /*             */
    0
  ), qb = (
    /*               */
    1
  ), sn = (
    /*                */
    2
  ), ca = (
    /*                */
    4
  ), Sr = 0, Mu = 1, Yi = 2, Kc = 3, Au = 4, Gb = 5, Gm = 6, $e = Ut, wn = null, Nt = null, zt = I, Ja = I, Wm = Yr(I), Ft = Sr, ku = null, Xc = I, Uu = I, Jc = I, zu = null, Hn = null, Qm = 0, Wb = 500, Qb = 1 / 0, fj = 500, Rr = null;
  function Fu() {
    Qb = qt() + fj;
  }
  function Kb() {
    return Qb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ti = null, Hu = I, Xm = [], Jm = null, dj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, pj = 50, Ql = 0, tf = null, Pu = ut, nf = I, Xb = !1;
  function af() {
    return wn;
  }
  function _n() {
    return ($e & (sn | ca)) !== Ut ? qt() : (Pu !== ut || (Pu = qt()), Pu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Pe) === ge)
      return Ce;
    if (($e & sn) !== Ut && zt !== I)
      return Mo(zt);
    var n = uD() !== oD;
    if (n) {
      if (un.transition !== null) {
        var a = un.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Wt && (nf = Lh()), nf;
    }
    var r = xa();
    if (r !== Wt)
      return r;
    var i = qC();
    return i;
  }
  function mj(e) {
    var t = e.mode;
    return (t & Pe) === ge ? Ce : hS();
  }
  function Ht(e, t, n, a) {
    zj(), Xb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Ao(e, n, a), ($e & sn) !== I && e === wn ? Bj(t) : (Ea && Ah(e, t, n), Pj(t), e === wn && (($e & sn) === Ut && (Uu = Le(Uu, n)), Ft === Au && ai(e, zt)), Bn(e, a), n === Ce && $e === Ut && (t.mode & Pe) === ge && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Va.isBatchingLegacy && (Fu(), Xy()));
  }
  function vj(e, t, n) {
    var a = e.current;
    a.lanes = t, Ao(e, t, n), Bn(e, n);
  }
  function hj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      ($e & sn) !== Ut
    );
  }
  function Bn(e, t) {
    var n = e.callbackNode;
    cS(e, t);
    var a = Rs(e, e === wn ? zt : I);
    if (a === I) {
      n !== null && pN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== ov)) {
      n == null && i !== Ce && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && pN(n);
    var l;
    if (r === Ce)
      e.tag === Ir ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), Y0(eN.bind(null, e))) : Ky(eN.bind(null, e)), Va.current !== null ? Va.current.push(qr) : WC(function() {
        ($e & (sn | ca)) === Ut && qr();
      }), l = null;
    else {
      var o;
      switch (zh(a)) {
        case Gn:
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
    if (MD(), Pu = ut, nf = I, ($e & (sn | ca)) !== Ut)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === wn ? zt : I);
    if (r === I)
      return null;
    var i = !Cs(e, r) && !vS(e, r) && !t, l = i ? Dj(e, r) : lf(e, r);
    if (l !== Sr) {
      if (l === Yi) {
        var o = bd(e);
        o !== I && (r = o, l = tv(e, o));
      }
      if (l === Mu) {
        var u = ku;
        throw qi(e, I), ai(e, r), Bn(e, qt()), u;
      }
      if (l === Gm)
        ai(e, r);
      else {
        var p = !Cs(e, r), v = e.current.alternate;
        if (p && !gj(v)) {
          if (l = lf(e, r), l === Yi) {
            var x = bd(e);
            x !== I && (r = x, l = tv(e, x));
          }
          if (l === Mu) {
            var E = ku;
            throw qi(e, I), ai(e, r), Bn(e, qt()), E;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, yj(e, l, r);
      }
    }
    return Bn(e, qt()), e.callbackNode === n ? Jb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = zu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= cr, U0(e.containerInfo);
    }
    var r = lf(e, t);
    if (r !== Yi) {
      var i = Hn;
      Hn = n, i !== null && Zb(i);
    }
    return r;
  }
  function Zb(e) {
    Hn === null ? Hn = e : Hn.push.apply(Hn, e);
  }
  function yj(e, t, n) {
    switch (t) {
      case Sr:
      case Mu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, Hn, Rr);
        break;
      }
      case Kc: {
        if (ai(e, n), _h(n) && // do not delay if we're inside an act() scope
        !mN()) {
          var a = Qm + Wb - qt();
          if (a > 10) {
            var r = Rs(e, I);
            if (r !== I)
              break;
            var i = e.suspendedLanes;
            if (!bl(i, n)) {
              _n(), Mh(e, i);
              break;
            }
            e.timeoutHandle = Jd(Gi.bind(null, e, Hn, Rr), a);
            break;
          }
        }
        Gi(e, Hn, Rr);
        break;
      }
      case Au: {
        if (ai(e, n), mS(n))
          break;
        if (!mN()) {
          var l = uS(e, n), o = l, u = qt() - o, p = Uj(u) - u;
          if (p > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, Hn, Rr), p);
            break;
          }
        }
        Gi(e, Hn, Rr);
        break;
      }
      case Gb: {
        Gi(e, Hn, Rr);
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
                if (!Qn(l(), o))
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
    if (AD(), ($e & (sn | ca)) !== Ut)
      throw new Error("Should not already be working.");
    Dr();
    var t = Rs(e, I);
    if (!qn(t, Ce))
      return Bn(e, qt()), null;
    var n = lf(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = bd(e);
      a !== I && (t = a, n = tv(e, a));
    }
    if (n === Mu) {
      var r = ku;
      throw qi(e, I), ai(e, t), Bn(e, qt()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, Hn, Rr), Bn(e, qt()), null;
  }
  function bj(e, t) {
    t !== I && (Sd(e, Le(t, Ce)), Bn(e, qt()), ($e & (sn | ca)) === Ut && (Fu(), qr()));
  }
  function nv(e, t) {
    var n = $e;
    $e |= qb;
    try {
      return e(t);
    } finally {
      $e = n, $e === Ut && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Va.isBatchingLegacy && (Fu(), Xy());
    }
  }
  function Nj(e, t, n, a, r) {
    var i = xa(), l = un.transition;
    try {
      return un.transition = null, Qt(Gn), e(t, n, a, r);
    } finally {
      Qt(i), un.transition = l, $e === Ut && Fu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && ($e & (sn | ca)) === Ut && Dr();
    var t = $e;
    $e |= qb;
    var n = un.transition, a = xa();
    try {
      return un.transition = null, Qt(Gn), e ? e() : void 0;
    } finally {
      Qt(a), un.transition = n, $e = t, ($e & (sn | ca)) === Ut && qr();
    }
  }
  function tN() {
    return ($e & (sn | ca)) !== Ut;
  }
  function rf(e, t) {
    hn(Wm, Ja, e), Ja = Le(Ja, t);
  }
  function av(e) {
    Ja = Wm.current, vn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = I;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, GC(n)), Nt !== null)
      for (var a = Nt.return; a !== null; ) {
        var r = a.alternate;
        _b(r, a), a = a.return;
      }
    wn = e;
    var i = Wi(e.current, null);
    return Nt = i, zt = Ja = t, Ft = Sr, ku = null, Xc = I, Uu = I, Jc = I, zu = null, Hn = null, vD(), Ca.discardPendingWarnings(), i;
  }
  function nN(e, t) {
    do {
      var n = Nt;
      try {
        if (mc(), Dg(), It(), qm.current = null, n === null || n.return === null) {
          Ft = Mu, ku = t, Nt = null;
          return;
        }
        if (Nn && n.mode & et && $c(n, !0), pa)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            Kx(n, a, zt);
          } else
            Qx(n, t, zt);
        YD(e, n.return, n, t, zt), lN(n);
      } catch (r) {
        t = r, Nt === n && n !== null ? (n = n.return, Nt = n) : n = Nt;
        continue;
      }
      return;
    } while (!0);
  }
  function aN() {
    var e = Im.current;
    return Im.current = zc, e === null ? zc : e;
  }
  function rN(e) {
    Im.current = e;
  }
  function Ej() {
    Qm = qt();
  }
  function $u(e) {
    Xc = Le(e, Xc);
  }
  function xj() {
    Ft === Sr && (Ft = Kc);
  }
  function rv() {
    (Ft === Sr || Ft === Kc || Ft === Yi) && (Ft = Au), wn !== null && (Nd(Xc) || Nd(Uu)) && ai(wn, zt);
  }
  function Sj(e) {
    Ft !== Au && (Ft = Yi), zu === null ? zu = [e] : zu.push(e);
  }
  function Rj() {
    return Ft === Sr;
  }
  function lf(e, t) {
    var n = $e;
    $e |= sn;
    var a = aN();
    if (wn !== e || zt !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, zt), r.clear()), kh(e, t);
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
    if (mc(), $e = n, rN(a), Nt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Dh(), wn = null, zt = I, Ft;
  }
  function Cj() {
    for (; Nt !== null; )
      iN(Nt);
  }
  function Dj(e, t) {
    var n = $e;
    $e |= sn;
    var a = aN();
    if (wn !== e || zt !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, zt), r.clear()), kh(e, t);
      }
      Rr = Uh(), Fu(), qi(e, t);
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
    return mc(), rN(a), $e = n, Nt !== null ? (tS(), Sr) : (Dh(), wn = null, zt = I, Ft);
  }
  function Tj() {
    for (; Nt !== null && !wx(); )
      iN(Nt);
  }
  function iN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & et) !== ge ? (om(e), n = iv(t, e, Ja), $c(e, !0)) : n = iv(t, e, Ja), It(), e.memoizedProps = e.pendingProps, n === null ? lN(e) : Nt = n, qm.current = null;
  }
  function lN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ne) {
        mt(t);
        var r = void 0;
        if ((t.mode & et) === ge ? r = wb(n, t, Ja) : (om(t), r = wb(n, t, Ja), $c(t, !1)), It(), r !== null) {
          Nt = r;
          return;
        }
      } else {
        var i = xT(n, t);
        if (i !== null) {
          i.flags &= Sx, Nt = i;
          return;
        }
        if ((t.mode & et) !== ge) {
          $c(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= bs, a.subtreeFlags = Ne, a.deletions = null;
        else {
          Ft = Gm, Nt = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        Nt = u;
        return;
      }
      t = a, Nt = t;
    } while (t !== null);
    Ft === Sr && (Ft = Gb);
  }
  function Gi(e, t, n) {
    var a = xa(), r = un.transition;
    try {
      un.transition = null, Qt(Gn), jj(e, t, n, a);
    } finally {
      un.transition = r, Qt(a);
    }
    return null;
  }
  function jj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (Fj(), ($e & (sn | ca)) !== Ut)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (Px(i), r === null)
      return xh(), null;
    if (i === I && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = I, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = Le(r.lanes, r.childLanes);
    bS(e, l), e === wn && (wn = null, Nt = null, zt = I), ((r.subtreeFlags & pl) !== Ne || (r.flags & pl) !== Ne) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Dr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ne, u = (r.flags & (Wf | Qf | To | pl)) !== Ne;
    if (o || u) {
      var p = un.transition;
      un.transition = null;
      var v = xa();
      Qt(Gn);
      var x = $e;
      $e |= ca, qm.current = null, TT(e, r), Xg(), BT(e, r, i), HC(e.containerInfo), e.current = r, Xx(i), PT(r, e, i), Jx(), _x(), $e = x, Qt(v), un.transition = p;
    } else
      e.current = r, Xg();
    var E = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === I && (Wl = null), E || cN(e.current, !1), Ux(r.stateNode, a), Ea && e.memoizedUpdaters.clear(), oj(), Bn(e, qt()), t !== null)
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
    return qn(Hu, Ce) && e.tag !== Ir && Dr(), l = e.pendingLanes, qn(l, Ce) ? (VD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, qr(), xh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = zh(Hu), t = SS(vr, e), n = un.transition, a = xa();
      try {
        return un.transition = null, Qt(t), _j();
      } finally {
        Qt(a), un.transition = n;
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
    if (ti = null, Hu = I, ($e & (sn | ca)) !== Ut)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, Zx(n);
    var a = $e;
    $e |= ca, QT(t.current), IT(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        OT(t, l);
      }
    }
    eS(), cN(t.current, !0), $e = a, qr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, zx(t);
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
    var a = Pi(n, t), r = ib(e, a, Ce), i = Wr(e, r, Ce), l = _n();
    i !== null && (Ao(i, Ce, l), Bn(i, l));
  }
  function it(e, t, n) {
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
          var l = Pi(n, e), o = Cm(a, l, Ce), u = Wr(a, o, Ce), p = _n();
          u !== null && (Ao(u, Ce, p), Bn(u, p));
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
    var r = _n();
    Mh(e, n), $j(e), wn === e && bl(zt, n) && (Ft === Au || Ft === Kc && _h(zt) && qt() - Qm < Wb ? qi(e, I) : Jc = Le(Jc, n)), Bn(e, r);
  }
  function sN(e, t) {
    t === Wt && (t = mj(e));
    var n = _n(), a = zn(e, t);
    a !== null && (Ao(a, t, n), Bn(a, n));
  }
  function Aj(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), sN(e, n);
  }
  function kj(e, t) {
    var n = Wt, a;
    switch (e.tag) {
      case P:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case Me:
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
  function zj() {
    if (Bu > dj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > pj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function Fj() {
    Ca.flushLegacyContextWarning(), Ca.flushPendingUnsafeLifecycleWarnings();
  }
  function cN(e, t) {
    mt(e), of(e, kr, rj), t && of(e, Gf, ij), of(e, kr, nj), t && of(e, Gf, aj), It();
  }
  function of(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ne ? a = a.child : ((a.flags & t) !== Ne && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var uf = null;
  function fN(e) {
    {
      if (($e & sn) !== Ut || !(e.mode & Pe))
        return;
      var t = e.tag;
      if (t !== _ && t !== S && t !== T && t !== C && t !== Q && t !== Z && t !== B)
        return;
      var n = we(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = Rn;
      try {
        mt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : It();
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
        if (mc(), Dg(), _b(e, t), bN(t, a), t.mode & et && om(t), Bf(null, Rb, null, e, t, n), Nx()) {
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
        case C:
        case Q:
        case B: {
          var t = Nt && we(Nt) || "Unknown", n = t;
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
    if (Ea) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Ah(e, a, t);
      });
    }
  }
  var ov = {};
  function uv(e, t) {
    {
      var n = Va.current;
      return n !== null ? (n.push(t), ov) : Eh(e, t);
    }
  }
  function pN(e) {
    if (e !== ov)
      return jx(e);
  }
  function mN() {
    return Va.current !== null;
  }
  function Pj(e) {
    {
      if (e.mode & Pe) {
        if (!Ib())
          return;
      } else if (!sj() || $e !== Ut || e.tag !== C && e.tag !== Q && e.tag !== B)
        return;
      if (Va.current === null) {
        var t = Rn;
        try {
          mt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, we(e));
        } finally {
          t ? mt(e) : It();
        }
      }
    }
  }
  function $j(e) {
    e.tag !== Ir && Ib() && Va.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

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
  var fa = null, Kl = null, Yj = function(e) {
    fa = e;
  };
  function Xl(e) {
    {
      if (fa === null)
        return e;
      var t = fa(e);
      return t === void 0 ? e : t.current;
    }
  }
  function sv(e) {
    return Xl(e);
  }
  function cv(e) {
    {
      if (fa === null)
        return e;
      var t = fa(e);
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
      if (fa === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case T: {
          typeof a == "function" && (r = !0);
          break;
        }
        case C: {
          (typeof a == "function" || i === ye) && (r = !0);
          break;
        }
        case Q: {
          (i === ve || i === ye) && (r = !0);
          break;
        }
        case Z:
        case B: {
          (i === Oe || i === ye) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = fa(n);
        if (l !== void 0 && l === fa(a))
          return !0;
      }
      return !1;
    }
  }
  function hN(e) {
    {
      if (fa === null || typeof WeakSet != "function")
        return;
      Kl === null && (Kl = /* @__PURE__ */ new WeakSet()), Kl.add(e);
    }
  }
  var Ij = function(e, t) {
    {
      if (fa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        fv(e.current, a, n);
      });
    }
  }, qj = function(e, t) {
    {
      if (e.context !== Kn)
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
        case B:
        case T:
          u = o;
          break;
        case Q:
          u = o.render;
          break;
      }
      if (fa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var p = !1, v = !1;
      if (u !== null) {
        var x = fa(u);
        x !== void 0 && (n.has(x) ? v = !0 : t.has(x) && (l === T ? v = !0 : p = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || p) {
        var E = zn(e, Ce);
        E !== null && Ht(E, e, Ce, ut);
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
        case C:
        case B:
        case T:
          o = l;
          break;
        case Q:
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
          case F:
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
      if (n.tag === F)
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
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ne, this.subtreeFlags = Ne, this.deletions = null, this.lanes = I, this.childLanes = I, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Xn = function(e, t, n, a) {
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
      return mv(e) ? T : C;
    if (e != null) {
      var t = e.$$typeof;
      if (t === ve)
        return Q;
      if (t === Oe)
        return Z;
    }
    return _;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Xn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ne, n.subtreeFlags = Ne, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case _:
      case C:
      case B:
        n.type = Xl(e.type);
        break;
      case T:
        n.type = sv(e.type);
        break;
      case Q:
        n.type = cv(e.type);
        break;
    }
    return n;
  }
  function Zj(e, t) {
    e.flags &= dr | jt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = I, e.lanes = t, e.child = null, e.subtreeFlags = Ne, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
  function e1(e, t, n) {
    var a;
    return e === rc ? (a = Pe, t === !0 && (a |= St, a |= Pa)) : a = ge, Ea && (a |= et), Xn(S, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = _, o = e;
    if (typeof e == "function")
      mv(e) ? (l = T, o = sv(o)) : o = Xl(o);
    else if (typeof e == "string")
      l = F;
    else
      e: switch (e) {
        case za:
          return ri(n.children, r, i, t);
        case fi:
          l = te, r |= St, (r & Pe) !== ge && (r |= Pa);
          break;
        case N:
          return t1(n, r, i, t);
        case ze:
          return n1(n, r, i, t);
        case Re:
          return a1(n, r, i, t);
        case ft:
          return gN(n, r, i, t);
        case pn:
        case Ot:
        case Fa:
        case ga:
        case ct:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case G:
                l = $;
                break e;
              case ne:
                l = ue;
                break e;
              case ve:
                l = Q, o = cv(o);
                break e;
              case Oe:
                l = Z;
                break e;
              case ye:
                l = Ie, o = null;
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
    var v = Xn(l, n, t, r);
    return v.elementType = e, v.type = o, v.lanes = i, v._debugOwner = a, v;
  }
  function hv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vv(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ri(e, t, n, a) {
    var r = Xn(fe, e, a, t);
    return r.lanes = n, r;
  }
  function t1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Xn(q, e, a, t | et);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function n1(e, t, n, a) {
    var r = Xn(P, e, a, t);
    return r.elementType = ze, r.lanes = n, r;
  }
  function a1(e, t, n, a) {
    var r = Xn(Me, e, a, t);
    return r.elementType = Re, r.lanes = n, r;
  }
  function gN(e, t, n, a) {
    var r = Xn(de, e, a, t);
    r.elementType = ft, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function yv(e, t, n) {
    var a = Xn(K, e, null, t);
    return a.lanes = n, a;
  }
  function r1() {
    var e = Xn(F, null, null, ge);
    return e.elementType = "DELETED", e;
  }
  function i1(e) {
    var t = Xn(Fe, null, null, ge);
    return t.stateNode = e, t;
  }
  function gv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Xn(M, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function bN(e, t) {
    return e === null && (e = Xn(_, null, null, ge)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function l1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Wt, this.eventTimes = xd(I), this.expirationTimes = xd(ut), this.pendingLanes = I, this.suspendedLanes = I, this.pingedLanes = I, this.expiredLanes = I, this.mutableReadLanes = I, this.finishedLanes = I, this.entangledLanes = I, this.entanglements = xd(I), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
    return ta(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: Yn,
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
      return Kn;
    var t = cl(e), n = $0(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ia(a))
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
      if (r.mode & St) {
        var i = we(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = Rn;
          try {
            mt(r), n.mode & St ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? mt(l) : It();
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
    var E = x.current, O = _n(), V = ni(E), U = Er(O, V);
    return U.callback = t ?? null, Wr(E, U, V), vj(x, V, O), x;
  }
  function qu(e, t, n, a) {
    kx(t, e);
    var r = t.current, i = _n(), l = ni(r);
    nS(l);
    var o = EN(n);
    t.context === null ? t.context = o : t.pendingContext = o, yi && Rn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, we(Rn) || "Unknown"));
    var u = Er(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var p = Wr(r, u, l);
    return p !== null && (Ht(p, r, l, i), bc(p, r, l)), l;
  }
  function sf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case F:
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
      case P: {
        Cr(function() {
          var r = zn(e, Ce);
          if (r !== null) {
            var i = _n();
            Ht(r, e, Ce, i);
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
    if (e.tag === P) {
      var t = Oo, n = zn(e, t);
      if (n !== null) {
        var a = _n();
        Ht(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function f1(e) {
    if (e.tag === P) {
      var t = ni(e), n = zn(e, t);
      if (n !== null) {
        var a = _n();
        Ht(n, e, t, a);
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
      var a = t[n], r = ke(e) ? e.slice() : Ae({}, e);
      return n + 1 === t.length ? (ke(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = UN(e[a], t, n + 1), r);
    }, zN = function(e, t) {
      return UN(e, t, 0);
    }, FN = function(e, t, n, a) {
      var r = t[a], i = ke(e) ? e.slice() : Ae({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], ke(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = FN(
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
      return FN(e, t, n, 0);
    }, BN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = ke(e) ? e.slice() : Ae({}, e);
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
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ae({}, e.memoizedProps);
        var l = zn(e, Ce);
        l !== null && Ht(l, e, Ce, ut);
      }
    }, wN = function(e, t, n) {
      var a = Sv(e, t);
      if (a !== null) {
        var r = zN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ae({}, e.memoizedProps);
        var i = zn(e, Ce);
        i !== null && Ht(i, e, Ce, ut);
      }
    }, _N = function(e, t, n, a) {
      var r = Sv(e, t);
      if (r !== null) {
        var i = HN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ae({}, e.memoizedProps);
        var l = zn(e, Ce);
        l !== null && Ht(l, e, Ce, ut);
      }
    }, ON = function(e, t, n) {
      e.pendingProps = PN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = zn(e, Ce);
      a !== null && Ht(a, e, Ce, ut);
    }, LN = function(e, t) {
      e.pendingProps = zN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = zn(e, Ce);
      n !== null && Ht(n, e, Ce, ut);
    }, VN = function(e, t, n) {
      e.pendingProps = HN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = zn(e, Ce);
      a !== null && Ht(a, e, Ce, ut);
    }, MN = function(e) {
      var t = zn(e, Ce);
      t !== null && Ht(t, e, Ce, ut);
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
    return Rn;
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
      if (n.nodeType !== Tt) {
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
    t != null && (t.hydrate ? R("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === aa && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = xN(e, rc, null, n, a, r, i);
    Xs(l.current, e);
    var o = e.nodeType === Tt ? e.parentNode : e;
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
    return !!(e && (e.nodeType === kn || e.nodeType === sr || e.nodeType === _f));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === kn || e.nodeType === sr || e.nodeType === _f || e.nodeType === Tt && e.nodeValue === " react-mount-point-unstable "));
  }
  function YN(e) {
    e.nodeType === kn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var E1 = h.ReactCurrentOwner, IN;
  IN = function(e) {
    if (e._reactRootContainer && e.nodeType !== Tt) {
      var t = CN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Cv(e), r = !!(a && $r(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === kn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
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
      var o = e.nodeType === Tt ? e.parentNode : e;
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
      var x = e.nodeType === Tt ? e.parentNode : e;
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
    return e == null ? null : e.nodeType === kn ? e : u1(e, "findDOMNode");
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
        var r = Cv(e), i = !!(r && $r(r)), l = e.nodeType === kn && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  RS(s1), DS(c1), TS(f1), jS(xa), wS(ES), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
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
  if (!M1 && Zt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var QN = window.location.protocol;
    /^(https?|file):$/.test(QN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (QN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  Zn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, Zn.createPortal = w1, Zn.createRoot = O1, Zn.findDOMNode = R1, Zn.flushSync = V1, Zn.hydrate = C1, Zn.hydrateRoot = L1, Zn.render = D1, Zn.unmountComponentAtNode = j1, Zn.unstable_batchedUpdates = nv, Zn.unstable_renderSubtreeIntoContainer = _1, Zn.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
cE.exports = Zn;
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
function ht(s, m) {
  if (s === !1 || s === null || typeof s > "u")
    throw new Error(m);
}
function Ma(s, m) {
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
  } = g, f = b.history, A = li.Pop, C = null, T = _();
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
    let te = _(), ue = te == null ? null : te - T;
    T = te, C && C({
      action: A,
      location: fe.location,
      delta: ue
    });
  }
  function M(te, ue) {
    A = li.Push;
    let $ = Ov(fe.location, te, ue);
    T = _() + 1;
    let Q = ZN($, T), q = fe.createHref($);
    try {
      f.pushState(Q, "", q);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError")
        throw P;
      b.location.assign(q);
    }
    R && C && C({
      action: A,
      location: fe.location,
      delta: 1
    });
  }
  function F(te, ue) {
    A = li.Replace;
    let $ = Ov(fe.location, te, ue);
    T = _();
    let Q = ZN($, T), q = fe.createHref($);
    f.replaceState(Q, "", q), R && C && C({
      action: A,
      location: fe.location,
      delta: 0
    });
  }
  function K(te) {
    let ue = b.location.origin !== "null" ? b.location.origin : b.location.href, $ = typeof te == "string" ? te : Ku(te);
    return $ = $.replace(/ $/, "%20"), ht(ue, "No window.location.(origin|href) available to create URL for href: " + $), new URL($, ue);
  }
  let fe = {
    get action() {
      return A;
    },
    get location() {
      return s(b, f);
    },
    listen(te) {
      if (C)
        throw new Error("A history only accepts one active listener");
      return b.addEventListener(JN, S), C = te, () => {
        b.removeEventListener(JN, S), C = null;
      };
    },
    createHref(te) {
      return m(b, te);
    },
    createURL: K,
    encodeLocation(te) {
      let ue = K(te);
      return {
        pathname: ue.pathname,
        search: ue.search,
        hash: ue.hash
      };
    },
    push: M,
    replace: F,
    go(te) {
      return f.go(te);
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
  for (let C = 0; A == null && C < f.length; ++C) {
    let T = lw(R);
    A = rw(f[C], T);
  }
  return A;
}
function mE(s, m, h, g) {
  m === void 0 && (m = []), h === void 0 && (h = []), g === void 0 && (g = "");
  let b = (R, f, A) => {
    let C = {
      relativePath: A === void 0 ? R.path || "" : A,
      caseSensitive: R.caseSensitive === !0,
      childrenIndex: f,
      route: R
    };
    C.relativePath.startsWith("/") && (ht(C.relativePath.startsWith(g), 'Absolute route path "' + C.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), C.relativePath = C.relativePath.slice(g.length));
    let T = wr([g, C.relativePath]), _ = h.concat(C);
    R.children && R.children.length > 0 && (ht(
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
      for (let C of vE(R.path))
        b(R, f, C);
  }), m;
}
function vE(s) {
  let m = s.split("/");
  if (m.length === 0) return [];
  let [h, ...g] = m, b = h.endsWith("?"), R = h.replace(/\?$/, "");
  if (g.length === 0)
    return b ? [R, ""] : [R];
  let f = vE(g.join("/")), A = [];
  return A.push(...f.map((C) => C === "" ? R : [R, C].join("/"))), b && A.push(...f), A.map((C) => s.startsWith("/") && C === "" ? "/" : C);
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
    let C = g[A], T = A === g.length - 1, _ = R === "/" ? m : m.slice(R.length) || "/", S = Lv({
      path: C.relativePath,
      caseSensitive: C.caseSensitive,
      end: T
    }, _), M = C.route;
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
        isOptional: F
      } = _;
      if (M === "*") {
        let fe = A[S] || "";
        f = R.slice(0, R.length - fe.length).replace(/(.)\/+$/, "$1");
      }
      const K = A[S];
      return F && !K ? T[M] = void 0 : T[M] = (K || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: R,
    pathnameBase: f,
    pattern: s
  };
}
function iw(s, m, h) {
  m === void 0 && (m = !1), h === void 0 && (h = !0), Ma(s === "*" || !s.endsWith("*") || s.endsWith("/*"), 'Route path "' + s + '" will be treated as if it were ' + ('"' + s.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + s.replace(/\*$/, "/*") + '".'));
  let g = [], b = "^" + s.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, A, C) => (g.push({
    paramName: A,
    isOptional: C != null
  }), C ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return s.endsWith("*") ? (g.push({
    paramName: "*"
  }), b += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? b += "\\/*$" : s !== "" && s !== "/" && (b += "(?:(?=\\/|$))"), [new RegExp(b, m ? void 0 : "i"), g];
}
function lw(s) {
  try {
    return s.split("/").map((m) => decodeURIComponent(m).replace(/\//g, "%2F")).join("/");
  } catch (m) {
    return Ma(!1, 'The URL path "' + s + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + m + ").")), s;
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
  typeof s == "string" ? b = eo(s) : (b = Qu({}, s), ht(!b.pathname || !b.pathname.includes("?"), Tv("?", "pathname", "search", b)), ht(!b.pathname || !b.pathname.includes("#"), Tv("#", "pathname", "hash", b)), ht(!b.search || !b.search.includes("#"), Tv("#", "search", "hash", b)));
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
  let C = ow(b, A), T = f && f !== "/" && f.endsWith("/"), _ = (R || f === ".") && h.endsWith("/");
  return !C.pathname.endsWith("/") && (T || _) && (C.pathname += "/"), C;
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
const Zu = /* @__PURE__ */ D.createContext(null);
Zu.displayName = "DataRouter";
const kv = /* @__PURE__ */ D.createContext(null);
kv.displayName = "DataRouterState";
const vw = /* @__PURE__ */ D.createContext(null);
vw.displayName = "Await";
const da = /* @__PURE__ */ D.createContext(null);
da.displayName = "Navigation";
const es = /* @__PURE__ */ D.createContext(null);
es.displayName = "Location";
const Aa = /* @__PURE__ */ D.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Aa.displayName = "Route";
const Uv = /* @__PURE__ */ D.createContext(null);
Uv.displayName = "RouteError";
function hw(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m;
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: b
  } = D.useContext(da), {
    hash: R,
    pathname: f,
    search: A
  } = ts(s, {
    relative: h
  }), C = f;
  return g !== "/" && (C = f === "/" ? g : wr([g, f])), b.createHref({
    pathname: C,
    search: A,
    hash: R
  });
}
function to() {
  return D.useContext(es) != null;
}
function Qi() {
  return to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), D.useContext(es).location;
}
const yE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function gE(s) {
  D.useContext(da).static || D.useLayoutEffect(s);
}
function zv() {
  let {
    isDataRoute: s
  } = D.useContext(Aa);
  return s ? Ow() : yw();
}
function yw() {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = D.useContext(Zu), {
    basename: m,
    future: h,
    navigator: g
  } = D.useContext(da), {
    matches: b
  } = D.useContext(Aa), {
    pathname: R
  } = Qi(), f = JSON.stringify(Mv(b, h.v7_relativeSplatPath)), A = D.useRef(!1);
  return gE(() => {
    A.current = !0;
  }), D.useCallback(function(T, _) {
    if (_ === void 0 && (_ = {}), Ma(A.current, yE), !A.current) return;
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
  } = D.useContext(Aa), m = s[s.length - 1];
  return m ? m.params : {};
}
function ts(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    future: g
  } = D.useContext(da), {
    matches: b
  } = D.useContext(Aa), {
    pathname: R
  } = Qi(), f = JSON.stringify(Mv(b, g.v7_relativeSplatPath));
  return D.useMemo(() => Av(s, JSON.parse(f), R, h === "path"), [s, f, R, h]);
}
function bw(s, m) {
  return Nw(s, m);
}
function Nw(s, m, h, g) {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: b
  } = D.useContext(da), {
    matches: R
  } = D.useContext(Aa), f = R[R.length - 1], A = f ? f.params : {}, C = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", _ = f && f.route;
  {
    let $ = _ && _.path || "";
    NE(C, !_ || $.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + C + '" (under <Route path="' + $ + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + $ + '"> to <Route ') + ('path="' + ($ === "/" ? "*" : $ + "/*") + '">.'));
  }
  let S = Qi(), M;
  if (m) {
    var F;
    let $ = typeof m == "string" ? eo(m) : m;
    T === "/" || (F = $.pathname) != null && F.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + $.pathname + '" was given in the `location` prop.')), M = $;
  } else
    M = S;
  let K = M.pathname || "/", fe = K;
  if (T !== "/") {
    let $ = T.replace(/^\//, "").split("/");
    fe = "/" + K.replace(/^\//, "").split("/").slice($.length).join("/");
  }
  let te = G1(s, {
    pathname: fe
  });
  Ma(_ || te != null, 'No routes matched location "' + M.pathname + M.search + M.hash + '" '), Ma(te == null || te[te.length - 1].route.element !== void 0 || te[te.length - 1].route.Component !== void 0 || te[te.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + M.pathname + M.search + M.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ue = Cw(te && te.map(($) => Object.assign({}, $, {
    params: Object.assign({}, A, $.params),
    pathname: wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation($.pathname).pathname : $.pathname
    ]),
    pathnameBase: $.pathnameBase === "/" ? T : wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation($.pathnameBase).pathname : $.pathnameBase
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
function Ew() {
  let s = _w(), m = pw(s) ? s.status + " " + s.statusText : s instanceof Error ? s.message : JSON.stringify(s), h = s instanceof Error ? s.stack : null, g = "rgba(200,200,200, 0.5)", b = {
    padding: "0.5rem",
    backgroundColor: g
  }, R = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", s), f = /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ D.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ D.createElement("code", {
    style: R
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ D.createElement("code", {
    style: R
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ D.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, m), h ? /* @__PURE__ */ D.createElement("pre", {
    style: b
  }, h) : null, f);
}
const xw = /* @__PURE__ */ D.createElement(Ew, null);
class Sw extends D.Component {
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
    }, /* @__PURE__ */ D.createElement(Uv.Provider, {
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
  } = s, b = D.useContext(Zu);
  return b && b.static && b.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (b.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ D.createElement(Aa.Provider, {
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
    _ >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(A).join(",")), f = f.slice(0, Math.min(f.length, _ + 1));
  }
  let C = !1, T = -1;
  if (h && g && g.v7_partialHydration)
    for (let _ = 0; _ < f.length; _++) {
      let S = f[_];
      if ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (T = _), S.route.id) {
        let {
          loaderData: M,
          errors: F
        } = h, K = S.route.loader && M[S.route.id] === void 0 && (!F || F[S.route.id] === void 0);
        if (S.route.lazy || K) {
          C = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((_, S, M) => {
    let F, K = !1, fe = null, te = null;
    h && (F = A && S.route.id ? A[S.route.id] : void 0, fe = S.route.errorElement || xw, C && (T < 0 && M === 0 ? (NE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), K = !0, te = null) : T === M && (K = !0, te = S.route.hydrateFallbackElement || null)));
    let ue = m.concat(f.slice(0, M + 1)), $ = () => {
      let Q;
      return F ? Q = fe : K ? Q = te : S.route.Component ? Q = /* @__PURE__ */ D.createElement(S.route.Component, null) : S.route.element ? Q = S.route.element : Q = _, /* @__PURE__ */ D.createElement(Rw, {
        match: S,
        routeContext: {
          outlet: _,
          matches: ue,
          isDataRoute: h != null
        },
        children: Q
      });
    };
    return h && (S.route.ErrorBoundary || S.route.errorElement || M === 0) ? /* @__PURE__ */ D.createElement(Sw, {
      location: h.location,
      revalidation: h.revalidation,
      component: fe,
      error: F,
      children: $(),
      routeContext: {
        outlet: null,
        matches: ue,
        isDataRoute: !0
      }
    }) : $();
  }, null);
}
var bE = /* @__PURE__ */ function(s) {
  return s.UseBlocker = "useBlocker", s.UseRevalidator = "useRevalidator", s.UseNavigateStable = "useNavigate", s;
}(bE || {}), Ju = /* @__PURE__ */ function(s) {
  return s.UseBlocker = "useBlocker", s.UseLoaderData = "useLoaderData", s.UseActionData = "useActionData", s.UseRouteError = "useRouteError", s.UseNavigation = "useNavigation", s.UseRouteLoaderData = "useRouteLoaderData", s.UseMatches = "useMatches", s.UseRevalidator = "useRevalidator", s.UseNavigateStable = "useNavigate", s.UseRouteId = "useRouteId", s;
}(Ju || {});
function Fv(s) {
  return s + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Dw(s) {
  let m = D.useContext(Zu);
  return m || ht(!1, Fv(s)), m;
}
function Tw(s) {
  let m = D.useContext(kv);
  return m || ht(!1, Fv(s)), m;
}
function jw(s) {
  let m = D.useContext(Aa);
  return m || ht(!1, Fv(s)), m;
}
function Hv(s) {
  let m = jw(s), h = m.matches[m.matches.length - 1];
  return h.route.id || ht(!1, s + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function ww() {
  return Hv(Ju.UseRouteId);
}
function _w() {
  var s;
  let m = D.useContext(Uv), h = Tw(Ju.UseRouteError), g = Hv(Ju.UseRouteError);
  return m !== void 0 ? m : (s = h.errors) == null ? void 0 : s[g];
}
function Ow() {
  let {
    router: s
  } = Dw(bE.UseNavigateStable), m = Hv(Ju.UseNavigateStable), h = D.useRef(!1);
  return gE(() => {
    h.current = !0;
  }), D.useCallback(function(b, R) {
    R === void 0 && (R = {}), Ma(h.current, yE), h.current && (typeof b == "number" ? s.navigate(b) : s.navigate(b, Xu({
      fromRouteId: m
    }, R)));
  }, [s, m]);
}
const nE = {};
function NE(s, m, h) {
  !m && !nE[s] && (nE[s] = !0, Ma(!1, h));
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
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: R,
    static: f
  } = D.useContext(da);
  Ma(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: A
  } = D.useContext(Aa), {
    pathname: C
  } = Qi(), T = zv(), _ = Av(m, Mv(A, R.v7_relativeSplatPath), C, b === "path"), S = JSON.stringify(_);
  return D.useEffect(() => T(JSON.parse(S), {
    replace: h,
    state: g,
    relative: b
  }), [T, S, b, h, g]), null;
}
function jr(s) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
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
  to() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
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
    state: F = null,
    key: K = "default"
  } = g, fe = D.useMemo(() => {
    let te = ui(_, C);
    return te == null ? null : {
      location: {
        pathname: te,
        search: S,
        hash: M,
        state: F,
        key: K
      },
      navigationType: b
    };
  }, [C, _, S, M, F, K, b]);
  return Ma(fe != null, '<Router basename="' + C + '"> is not able to match the URL ' + ('"' + _ + S + M + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), fe == null ? null : /* @__PURE__ */ D.createElement(da.Provider, {
    value: T
  }, /* @__PURE__ */ D.createElement(es.Provider, {
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
  return D.Children.forEach(s, (g, b) => {
    if (!/* @__PURE__ */ D.isValidElement(g))
      return;
    let R = [...m, b];
    if (g.type === D.Fragment) {
      h.push.apply(h, Vv(g.props.children, R));
      return;
    }
    g.type !== jr && ht(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || ht(!1, "An index route cannot have child routes.");
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
function zw(s) {
  return gf(s) && s.tagName.toLowerCase() === "form";
}
function Fw(s) {
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
  return s != null && !$w.has(s) ? (Ma(!1, '"' + s + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : s;
}
function Yw(s, m) {
  let h, g, b, R, f;
  if (zw(s)) {
    let A = s.getAttribute("action");
    g = A ? ui(A, m) : null, h = s.getAttribute("method") || mf, b = jv(s.getAttribute("enctype")) || vf, R = new FormData(s);
  } else if (Uw(s) || Fw(s) && (s.type === "submit" || s.type === "image")) {
    let A = s.form;
    if (A == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let C = s.getAttribute("formaction") || A.getAttribute("action");
    if (g = C ? ui(C, m) : null, h = s.getAttribute("formmethod") || A.getAttribute("method") || mf, b = jv(s.getAttribute("formenctype")) || jv(A.getAttribute("enctype")) || vf, R = new FormData(A, s), !Pw()) {
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
const EE = /* @__PURE__ */ D.createContext({
  isTransitioning: !1
});
EE.displayName = "ViewTransition";
const Qw = /* @__PURE__ */ D.createContext(/* @__PURE__ */ new Map());
Qw.displayName = "Fetchers";
const Kw = "startTransition", iE = B1[Kw];
function Xw(s) {
  let {
    basename: m,
    children: h,
    future: g,
    window: b
  } = s, R = D.useRef();
  R.current == null && (R.current = Y1({
    window: b,
    v5Compat: !0
  }));
  let f = R.current, [A, C] = D.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, _ = D.useCallback((S) => {
    T && iE ? iE(() => C(S)) : C(S);
  }, [C, T]);
  return D.useLayoutEffect(() => f.listen(_), [f, _]), D.useEffect(() => Vw(g), [g]), /* @__PURE__ */ D.createElement(Aw, {
    basename: m,
    children: h,
    location: A.location,
    navigationType: A.action,
    navigator: f,
    future: g
  });
}
const Jw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Zw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ D.forwardRef(function(m, h) {
  let {
    onClick: g,
    relative: b,
    reloadDocument: R,
    replace: f,
    state: A,
    target: C,
    to: T,
    preventScrollReset: _,
    viewTransition: S
  } = m, M = Bv(m, Iw), {
    basename: F
  } = D.useContext(da), K, fe = !1;
  if (typeof T == "string" && Zw.test(T) && (K = T, Jw))
    try {
      let Q = new URL(window.location.href), q = T.startsWith("//") ? new URL(Q.protocol + T) : new URL(T), P = ui(q.pathname, F);
      q.origin === Q.origin && P != null ? T = P + q.search + q.hash : fe = !0;
    } catch {
      Ma(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let te = hw(T, {
    relative: b
  }), ue = a_(T, {
    replace: f,
    state: A,
    target: C,
    preventScrollReset: _,
    relative: b,
    viewTransition: S
  });
  function $(Q) {
    g && g(Q), Q.defaultPrevented || ue(Q);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ D.createElement("a", Zl({}, M, {
      href: K || te,
      onClick: fe || R ? g : $,
      ref: h,
      target: C
    }))
  );
});
ii.displayName = "Link";
const e_ = /* @__PURE__ */ D.forwardRef(function(m, h) {
  let {
    "aria-current": g = "page",
    caseSensitive: b = !1,
    className: R = "",
    end: f = !1,
    style: A,
    to: C,
    viewTransition: T,
    children: _
  } = m, S = Bv(m, qw), M = ts(C, {
    relative: S.relative
  }), F = Qi(), K = D.useContext(kv), {
    navigator: fe,
    basename: te
  } = D.useContext(da), ue = K != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  s_(M) && T === !0, $ = fe.encodeLocation ? fe.encodeLocation(M).pathname : M.pathname, Q = F.pathname, q = K && K.navigation && K.navigation.location ? K.navigation.location.pathname : null;
  b || (Q = Q.toLowerCase(), q = q ? q.toLowerCase() : null, $ = $.toLowerCase()), q && te && (q = ui(q, te) || q);
  const P = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length;
  let Z = Q === $ || !f && Q.startsWith($) && Q.charAt(P) === "/", B = q != null && (q === $ || !f && q.startsWith($) && q.charAt($.length) === "/"), Ie = {
    isActive: Z,
    isPending: B,
    isTransitioning: ue
  }, Se = Z ? g : void 0, Fe;
  typeof R == "function" ? Fe = R(Ie) : Fe = [R, Z ? "active" : null, B ? "pending" : null, ue ? "transitioning" : null].filter(Boolean).join(" ");
  let Me = typeof A == "function" ? A(Ie) : A;
  return /* @__PURE__ */ D.createElement(ii, Zl({}, S, {
    "aria-current": Se,
    className: Fe,
    ref: h,
    style: Me,
    to: C,
    viewTransition: T
  }), typeof _ == "function" ? _(Ie) : _);
});
e_.displayName = "NavLink";
const t_ = /* @__PURE__ */ D.forwardRef((s, m) => {
  let {
    fetcherKey: h,
    navigate: g,
    reloadDocument: b,
    replace: R,
    state: f,
    method: A = mf,
    action: C,
    onSubmit: T,
    relative: _,
    preventScrollReset: S,
    viewTransition: M
  } = s, F = Bv(s, Gw), K = o_(), fe = u_(C, {
    relative: _
  }), te = A.toLowerCase() === "get" ? "get" : "post", ue = ($) => {
    if (T && T($), $.defaultPrevented) return;
    $.preventDefault();
    let Q = $.nativeEvent.submitter, q = (Q == null ? void 0 : Q.getAttribute("formmethod")) || A;
    K(Q || $.currentTarget, {
      fetcherKey: h,
      method: q,
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
    method: te,
    action: fe,
    onSubmit: b ? T : ue
  }, F));
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
  let m = D.useContext(Zu);
  return m || ht(!1, n_(s)), m;
}
function a_(s, m) {
  let {
    target: h,
    replace: g,
    state: b,
    preventScrollReset: R,
    relative: f,
    viewTransition: A
  } = m === void 0 ? {} : m, C = zv(), T = Qi(), _ = ts(s, {
    relative: f
  });
  return D.useCallback((S) => {
    if (Bw(S, h)) {
      S.preventDefault();
      let M = g !== void 0 ? g : Ku(T) === Ku(_);
      C(s, {
        replace: M,
        state: b,
        preventScrollReset: R,
        relative: f,
        viewTransition: A
      });
    }
  }, [T, C, _, g, b, h, s, R, f, A]);
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
  } = D.useContext(da), h = ww();
  return D.useCallback(function(g, b) {
    b === void 0 && (b = {}), r_();
    let {
      action: R,
      method: f,
      encType: A,
      formData: C,
      body: T
    } = Yw(g, m);
    if (b.navigate === !1) {
      let _ = b.fetcherKey || l_();
      s.fetch(_, h, b.action || R, {
        preventScrollReset: b.preventScrollReset,
        formData: C,
        body: T,
        formMethod: b.method || f,
        formEncType: b.encType || A,
        flushSync: b.flushSync
      });
    } else
      s.navigate(b.action || R, {
        preventScrollReset: b.preventScrollReset,
        formData: C,
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
  } = D.useContext(da), b = D.useContext(Aa);
  b || ht(!1, "useFormAction must be used inside a RouteContext");
  let [R] = b.matches.slice(-1), f = Zl({}, ts(s || ".", {
    relative: h
  })), A = Qi();
  if (s == null) {
    f.search = A.search;
    let C = new URLSearchParams(f.search), T = C.getAll("index");
    if (T.some((S) => S === "")) {
      C.delete("index"), T.filter((M) => M).forEach((M) => C.append("index", M));
      let S = C.toString();
      f.search = S ? "?" + S : "";
    }
  }
  return (!s || s === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : wr([g, f.pathname])), Ku(f);
}
function s_(s, m) {
  m === void 0 && (m = {});
  let h = D.useContext(EE);
  h == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
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
  const [s, m] = D.useState(null), [h, g] = D.useState(""), [b, R] = D.useState(""), [f, A] = D.useState(!0), [C, T] = D.useState(""), [_, S] = D.useState(""), [M, F] = D.useState(!1), [K, fe] = D.useState(!1);
  D.useEffect(() => {
    const Q = typeof window < "u" ? window : void 0, q = Q && Q.__FIREBASE__ ? Q.__FIREBASE__ : null;
    m({
      apiKey: q && q.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: q && q.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: q && q.projectId || void 0 || "fresh-basket-a8933",
      appId: q && q.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: q && q.messagingSenderId || void 0 || "163656027399",
      measurementId: q && q.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function te(Q) {
    const q = (Q == null ? void 0 : Q.code) || "", P = (Q == null ? void 0 : Q.message) || "";
    return q.includes("invalid-email") ? "Please enter a valid email address." : q.includes("user-not-found") ? "No account found with that email." : q.includes("wrong-password") || q.includes("invalid-credential") || P.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : q.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : q.includes("network-request-failed") ? "Network error. Check your connection and try again." : P || "Something went wrong.";
  }
  async function ue(Q) {
    Q.preventDefault(), T(""), S(""), F(!0);
    try {
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), P = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: Z, setPersistence: B, browserLocalPersistence: Ie, browserSessionPersistence: Se, signInWithEmailAndPassword: Fe } = P, Me = Z();
      await B(Me, f ? Ie : Se);
      const de = await (await Fe(Me, h.trim(), b)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: de }) })).ok) throw new Error("Session creation failed");
      S("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (q) {
      T(te(q));
    } finally {
      F(!1);
    }
  }
  async function $() {
    T(""), S("");
    try {
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const Q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), { getAuth: q, sendPasswordResetEmail: P } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Z = q();
      await P(Z, h.trim()), S("If an account exists for that email, a reset link has been sent.");
    } catch (Q) {
      T(te(Q));
    }
  }
  return /* @__PURE__ */ d.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ d.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ d.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ d.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ d.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ d.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
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
    /* @__PURE__ */ d.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      C && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: C }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      _ && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: _ }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: ue, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: h, onChange: (Q) => g(Q.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 85,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ d.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: K ? "text" : "password", value: b, onChange: (Q) => R(Q.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": K ? "Hide password" : "Show password", onClick: () => fe((Q) => !Q), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ d.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: f, onChange: (Q) => A(Q.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("button", { className: "link-button", type: "button", onClick: $, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: M, type: "submit", children: M ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ d.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
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
function f_() {
  const [s, m] = D.useState(null), [h, g] = D.useState(""), [b, R] = D.useState(""), [f, A] = D.useState(""), [C, T] = D.useState(""), [_, S] = D.useState(""), [M, F] = D.useState(""), [K, fe] = D.useState(""), [te, ue] = D.useState(!1), [$, Q] = D.useState(!1);
  D.useEffect(() => {
    const Z = typeof window < "u" ? window : void 0, B = Z && Z.__FIREBASE__ ? Z.__FIREBASE__ : null;
    m({
      apiKey: B && B.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: B && B.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: B && B.projectId || void 0 || "fresh-basket-a8933",
      appId: B && B.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: B && B.messagingSenderId || void 0 || "163656027399",
      measurementId: B && B.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function q(Z) {
    const B = (Z == null ? void 0 : Z.code) || "";
    return B.includes("email-already-in-use") ? "An account with this email already exists." : B.includes("weak-password") ? "Password should be at least 6 characters." : B.includes("invalid-email") ? "Please enter a valid email address." : B.includes("network-request-failed") ? "Network error. Check your connection and try again." : (Z == null ? void 0 : Z.message) || "Something went wrong.";
  }
  async function P(Z) {
    Z.preventDefault(), F(""), fe(""), ue(!0);
    try {
      if (C !== _) throw new Error("Passwords do not match");
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const B = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), { getAuth: Ie, createUserWithEmailAndPassword: Se } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Fe = Ie(), Y = await (await Se(Fe, f.trim(), C)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Y, profile: { fullName: h, contactNumber: b } }) })).ok) throw new Error("Session creation failed");
      fe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (B) {
      F(q(B));
    } finally {
      ue(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ d.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    M && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 58,
      columnNumber: 17
    }, this),
    K && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: K }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 59,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: P, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: h, onChange: (Z) => g(Z.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 62,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: b, onChange: (Z) => R(Z.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 65,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (Z) => A(Z.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 68,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ d.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: $ ? "text" : "password", value: C, onChange: (Z) => T(Z.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 72,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": $ ? "Hide password" : "Show password", onClick: () => Q((Z) => !Z), children: "👁️" }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 73,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 71,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: _, onChange: (Z) => S(Z.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button", disabled: te, type: "submit", children: te ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 79,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ d.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 81,
        columnNumber: 48
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Register.jsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
function oi({ children: s }) {
  const m = zv();
  return D.useEffect(() => {
    const h = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), b = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(S, M, F) {
      S && (S.classList.toggle("hidden", !F), S.setAttribute("aria-hidden", F ? "false" : "true"), M && M.setAttribute("aria-expanded", F ? "true" : "false"));
    }
    function A() {
      f(g, h, !1), f(R, b, !1);
    }
    function C(S) {
      const M = (F) => F && (F === S.target || F.contains(S.target));
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
  const [h, g] = D.useState(""), [b, R] = D.useState(""), [f, A] = D.useState(""), [C, T] = D.useState(""), [_, S] = D.useState(!1), [M, F] = D.useState(""), [K, fe] = D.useState("");
  async function te() {
    if (F(""), fe(""), !h || !b) {
      F("Email and password are required");
      return;
    }
    S(!0);
    try {
      const ue = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(h).trim(), password: String(b), fullName: String(f).trim() || null, contactNumber: String(C).trim() || null })
      }), $ = await ue.json().catch(() => null);
      if (!ue.ok) throw new Error($ && $.error ? $.error : $ && $.message ? $.message : "Failed to create rider");
      fe("Rider created successfully"), m && m(), setTimeout(() => {
        s && s();
      }, 600);
    } catch (ue) {
      F(ue.message || "Failed to create rider");
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
      K && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: K }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: s, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: te, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
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
  const [s, m] = D.useState([]), [h, g] = D.useState(""), [b, R] = D.useState("all"), [f, A] = D.useState("all"), [C, T] = D.useState("all"), [_, S] = D.useState(!0), [M, F] = D.useState(""), [K, fe] = D.useState(1), [te, ue] = D.useState(20), [$, Q] = D.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [q, P] = D.useState(!1);
  D.useEffect(() => {
    let B = !0;
    return (async () => {
      var Ie, Se, Fe, Me;
      S(!0), F("");
      try {
        const Y = new URLSearchParams();
        h && Y.set("q", h), C !== "all" && Y.set("status", C), b !== "all" && Y.set("lastDays", b), Y.set("page", String(K)), Y.set("limit", String(te));
        const de = await fetch(`/api/riders?${Y.toString()}`, { credentials: "include" });
        if (de.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!de.ok) throw new Error("Failed to load riders");
        const _e = await de.json();
        B && (m(Array.isArray(_e.riders) ? _e.riders : []), Q({ total: ((Ie = _e.meta) == null ? void 0 : Ie.total) || 0, page: ((Se = _e.meta) == null ? void 0 : Se.page) || 1, limit: ((Fe = _e.meta) == null ? void 0 : Fe.limit) || te, pages: ((Me = _e.meta) == null ? void 0 : Me.pages) || 1 }));
      } catch (Y) {
        B && F(Y.message || "Failed to load riders");
      } finally {
        B && S(!1);
      }
    })(), () => {
      B = !1;
    };
  }, [h, C, b, K, te]);
  const Z = D.useMemo(() => s.filter((B) => {
    if (h && !B.name.toLowerCase().includes(h.toLowerCase().trim()) || C !== "all" && B.status !== C || f !== "all" && String(B.id) !== String(f)) return !1;
    if (b !== "all") {
      const Ie = parseInt(B.lastActiveDays, 10) || 9999, Se = parseInt(b, 10);
      if (!(Ie <= Se)) return !1;
    }
    return !0;
  }), [s, h, C, f, b]);
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => P(!0), children: "Create Rider" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (B) => {
          g(B.target.value), fe(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: b, onChange: (B) => {
          R(B.target.value), fe(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: f, onChange: (B) => A(B.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          s.map((B) => /* @__PURE__ */ d.jsxDEV("option", { value: B.id, children: B.name }, B.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 83,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: C, onChange: (B) => {
          T(B.target.value), fe(1);
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
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: te, onChange: (B) => {
        ue(parseInt(B.target.value, 10)), fe(1);
      }, children: [10, 20, 50, 100].map((B) => /* @__PURE__ */ d.jsxDEV("option", { value: B, children: [
        B,
        "/page"
      ] }, B, !0, {
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
      q && /* @__PURE__ */ d.jsxDEV(d_, { onClose: () => P(!1), onCreated: () => {
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
          !_ && !M && Z.map((B) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": B.id, "data-status": B.status, "data-last-days": B.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { href: `/riders/${B.id}`, children: B.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 118,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 118,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              B.totalKm,
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
              /* @__PURE__ */ d.jsxDEV("progress", { max: "100", value: B.performance, className: "rc-progress-bar" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 122,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ d.jsxDEV("span", { className: "rc-progress-value", children: B.performance }, void 0, !1, {
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
              B.commissionUsd
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 126,
              columnNumber: 19
            }, this)
          ] }, B.id, !0, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: $.page <= 1 || _, onClick: () => fe((B) => Math.max(1, B - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 138,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        $.page,
        " of ",
        $.pages,
        " • ",
        $.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 139,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: $.page >= $.pages || _, onClick: () => fe((B) => Math.min($.pages, B + 1)), children: "Next" }, void 0, !1, {
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
  const { id: s } = gw(), [m, h] = D.useState(null), [g, b] = D.useState(!0), [R, f] = D.useState("");
  if (D.useEffect(() => {
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
function SE({ orderId: s, onClose: m, onAssigned: h }) {
  const [g, b] = D.useState([]), [R, f] = D.useState(!0), [A, C] = D.useState(""), [T, _] = D.useState(null);
  D.useEffect(() => {
    let M = !0;
    return (async () => {
      f(!0), C("");
      try {
        const F = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (F.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!F.ok) throw new Error("Failed to load riders");
        const K = await F.json();
        M && b(Array.isArray(K.riders) ? K.riders : K.riders || []);
      } catch (F) {
        M && C(F.message || "Failed to load riders");
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
        const F = await fetch(`/api/orders/${encodeURIComponent(s)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: M })
        });
        if (F.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const K = await F.json().catch(() => null);
        if (!F.ok) throw new Error(K && K.error ? K.error : "Assign failed");
        h && h({ orderId: s, riderId: M }), m();
      } catch (F) {
        alert(F.message || "Failed to assign rider");
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
  const [s, m] = D.useState([]), [h, g] = D.useState(""), [b, R] = D.useState("all"), [f, A] = D.useState(1), [C, T] = D.useState(20), [_, S] = D.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [M, F] = D.useState(!0), [K, fe] = D.useState(""), [te, ue] = D.useState(""), [$, Q] = D.useState(!0), [q, P] = D.useState(!1), [Z, B] = D.useState(null);
  D.useEffect(() => {
    let Y = !0;
    return (async () => {
      var de, _e, He, at;
      F(!0), fe(""), ue("");
      try {
        const Ee = new URLSearchParams();
        h && Ee.set("q", h), b && b !== "all" && Ee.set("status", b), Ee.set("page", String(f)), Ee.set("limit", String(C));
        const yt = await fetch(`/api/orders?${Ee.toString()}`, { credentials: "include" });
        if (yt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!yt.ok) throw new Error("Failed to load orders");
        const pt = await yt.json();
        Y && (m(Array.isArray(pt.orders) ? pt.orders : []), ue(pt.shopifyError || ""), Q(!!pt.shopifyConfigured), S({ total: ((de = pt.meta) == null ? void 0 : de.total) || 0, page: ((_e = pt.meta) == null ? void 0 : _e.page) || 1, limit: ((He = pt.meta) == null ? void 0 : He.limit) || C, pages: ((at = pt.meta) == null ? void 0 : at.pages) || 1 }));
      } catch (Ee) {
        Y && fe(Ee.message || "Failed to load orders");
      } finally {
        Y && F(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, [h, b, f, C]);
  const Ie = D.useMemo(() => s, [s]), Se = D.useMemo(() => Array.isArray(s) ? b === "all" ? s.filter((Y) => wv(Y) !== "assigned") : s.filter((Y) => wv(Y) === b) : [], [s, b]);
  function Fe() {
    B(null), P(!1);
  }
  function Me(Y) {
    try {
      const { orderId: de } = Y || {};
      if (!de) return;
      m((_e) => _e.filter((He) => String(He.name || He.order_number || He.id) !== String(de))), S((_e) => ({ ..._e || {}, total: Math.max(0, ((_e == null ? void 0 : _e.total) || 0) - 1) }));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 80,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 78,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (Y) => {
          g(Y.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        ["all", "new", "assigned", "in-transit", "delivered"].map((Y) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${b === Y ? " active" : ""}`, onClick: () => {
          R(Y), A(1);
        }, "data-filter": Y, children: Y === "all" ? "All" : Y.replace("-", " ") }, Y, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 90,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: C, onChange: (Y) => {
          T(parseInt(Y.target.value, 10)), A(1);
        }, children: [10, 20, 50, 100].map((Y) => /* @__PURE__ */ d.jsxDEV("option", { value: Y, children: [
          Y,
          "/page"
        ] }, Y, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 95,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 94,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    !$ && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 101,
      columnNumber: 11
    }, this),
    te && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: te }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 103,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 109,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 110,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 111,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 112,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected", children: "Expected Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 113,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual", children: "Actual Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 115,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 108,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 107,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        M && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 120,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 120,
          columnNumber: 17
        }, this),
        !M && K && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: K }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 123,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 123,
          columnNumber: 17
        }, this),
        !M && !K && Se.map((Y, de) => {
          var yt;
          const _e = wv(Y), He = Y.full_name || (Y.customer && Y.customer.full_name ? Y.customer.full_name : "");
          let at = "-";
          typeof Y.shipping_address == "string" && String(Y.shipping_address).trim() ? at = String(Y.shipping_address).trim() : Y.shipping_address && typeof Y.shipping_address == "object" ? at = [Y.shipping_address.address1 || "", Y.shipping_address.city || "", Y.shipping_address.province || "", Y.shipping_address.country || ""].map((pt) => String(pt || "").trim()).filter(Boolean).join(", ") || "-" : typeof Y.billing_address == "string" && String(Y.billing_address).trim() ? at = String(Y.billing_address).trim() : Y.billing_address && typeof Y.billing_address == "object" && (at = [Y.billing_address.address1 || "", Y.billing_address.city || "", Y.billing_address.province || "", Y.billing_address.country || ""].map((pt) => String(pt || "").trim()).filter(Boolean).join(", ") || "-");
          const Ee = Y.name || Y.order_number || Y.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": _e, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: Ee }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 144,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: He || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 145,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: at }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 146,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider", children: Y.rider ? String(Y.rider) : (yt = Y.assignment) != null && yt.riderId ? String(Y.assignment.riderId) : "Unassigned" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 147,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected", children: Y.expected_delivery_time ? new Date(Y.expected_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 148,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual", children: Y.actual_delivery_time ? new Date(Y.actual_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 149,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${_e}`, children: _e.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 150,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 150,
              columnNumber: 21
            }, this)
          ] }, Ee || de, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 143,
            columnNumber: 19
          }, this);
        }),
        !M && !K && Ie.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 155,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 155,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 118,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 106,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 105,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      q && Z && /* @__PURE__ */ d.jsxDEV(SE, { orderId: Z, onClose: Fe, onAssigned: Me }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || M, onClick: () => A((Y) => Math.max(1, Y - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 166,
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
          lineNumber: 167,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || M, onClick: () => A((Y) => Math.min(_.pages, Y + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 168,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 165,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 160,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
}
function h_() {
  const [s, m] = D.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, g] = D.useState([]), [b, R] = D.useState(!1), [f, A] = D.useState(!0), [C, T] = D.useState("");
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
function y_() {
  const [s, m] = D.useState([]), [h, g] = D.useState(!0), [b, R] = D.useState(""), [f, A] = D.useState(1), [C, T] = D.useState(25), [_, S] = D.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  D.useEffect(() => {
    let q = !0;
    return (async () => {
      var P, Z, B, Ie;
      g(!0), R("");
      try {
        const Se = new URLSearchParams();
        Se.set("limit", String(C)), Se.set("page", String(f));
        const Fe = await fetch(`/api/orders?${Se.toString()}`, { credentials: "include" });
        if (Fe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Fe.ok) throw new Error("Failed to load orders");
        const Me = await Fe.json();
        q && (m(Array.isArray(Me.orders) ? Me.orders : []), S({ total: ((P = Me.meta) == null ? void 0 : P.total) || 0, page: ((Z = Me.meta) == null ? void 0 : Z.page) || f, limit: ((B = Me.meta) == null ? void 0 : B.limit) || C, pages: ((Ie = Me.meta) == null ? void 0 : Ie.pages) || 1 }));
      } catch (Se) {
        q && R(Se.message || "Failed to load orders");
      } finally {
        q && g(!1);
      }
    })(), () => {
      q = !1;
    };
  }, [f]);
  function M(q) {
    return q && q.assignment || (Array.isArray(q.tags) ? q.tags : typeof q.tags == "string" ? q.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : q.fulfillment_status === "fulfilled" ? "delivered" : q.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  const [F, K] = D.useState(!1), [fe, te] = D.useState(null);
  function ue(q) {
    te(q), K(!0);
  }
  function $() {
    te(null), K(!1);
  }
  function Q(q) {
    try {
      const { orderId: P } = q || {};
      if (!P) return;
      m((Z) => Z.filter((B, Ie) => {
        const Se = String(B.id || B.name || B.order_number || Ie).replace(/^#+/, "");
        return String(Se) !== String(P);
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
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 28
        }, this),
        !h && !b && (Array.isArray(s) ? s.filter((P) => M(P) !== "assigned") : []).map((P, Z) => {
          const B = M(P), Ie = P.full_name || (P.customer && P.customer.full_name ? P.customer.full_name : "");
          let Se = "-";
          typeof P.shipping_address == "string" && String(P.shipping_address).trim() ? Se = String(P.shipping_address).trim() : P.shipping_address && typeof P.shipping_address == "object" ? Se = [P.shipping_address.address1 || "", P.shipping_address.city || "", P.shipping_address.province || "", P.shipping_address.country || ""].map((He) => String(He || "").trim()).filter(Boolean).join(", ") || "-" : typeof P.billing_address == "string" && String(P.billing_address).trim() ? Se = String(P.billing_address).trim() : P.billing_address && typeof P.billing_address == "object" && (Se = [P.billing_address.address1 || "", P.billing_address.city || "", P.billing_address.province || "", P.billing_address.country || ""].map((He) => String(He || "").trim()).filter(Boolean).join(", ") || "-");
          const Fe = P.name || P.order_number || P.id || Z, Me = String(P.id || P.name || P.order_number || Z).replace(/^#+/, ""), Y = P.created_at ? new Date(P.created_at) : null, de = Y ? Y.toLocaleDateString() : "-", _e = Y ? Y.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": B, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: Fe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 122,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: Ie || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 123,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: Se }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${B}`, children: B.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: de }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: _e }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => ue(Me), children: "Assign Rider" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this)
          ] }, Me, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 121,
            columnNumber: 21
          }, this);
        }),
        !h && !b && s.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 133,
          columnNumber: 66
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 133,
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || h, onClick: () => A((q) => Math.max(1, q - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
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
        lineNumber: 141,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || h, onClick: () => A((q) => Math.min(_.pages, q + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 142,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 139,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 138,
      columnNumber: 9
    }, this),
    F && fe && /* @__PURE__ */ d.jsxDEV(SE, { orderId: fe, onClose: $, onAssigned: Q }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 147,
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
