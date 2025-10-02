function z1(s, m) {
  for (var h = 0; h < m.length; h++) {
    const y = m[h];
    if (typeof y != "string" && !Array.isArray(y)) {
      for (const g in y)
        if (g !== "default" && !(g in s)) {
          const C = Object.getOwnPropertyDescriptor(y, g);
          C && Object.defineProperty(s, g, C.get ? C : {
            enumerable: !0,
            get: () => y[g]
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
    var h = "18.3.1", y = Symbol.for("react.element"), g = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), de = Symbol.for("react.offscreen"), ne = Symbol.iterator, me = "@@iterator";
    function q(c) {
      if (c === null || typeof c != "object")
        return null;
      var b = ne && c[ne] || c[me];
      return typeof b == "function" ? b : null;
    }
    var Y = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, G = {
      transition: null
    }, B = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, ve = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, $ = {}, Ue = null;
    function ce(c) {
      Ue = c;
    }
    $.setExtraStackFrame = function(c) {
      Ue = c;
    }, $.getCurrentStack = null, $.getStackAddendum = function() {
      var c = "";
      Ue && (c += Ue);
      var b = $.getCurrentStack;
      return b && (c += b() || ""), c;
    };
    var re = !1, U = !1, he = !1, ue = !1, ge = !1, Ae = {
      ReactCurrentDispatcher: Y,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: ve
    };
    Ae.ReactDebugCurrentFrame = $, Ae.ReactCurrentActQueue = B;
    function _e(c) {
      {
        for (var b = arguments.length, L = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          L[z - 1] = arguments[z];
        Ge("warn", c, L);
      }
    }
    function ye(c) {
      {
        for (var b = arguments.length, L = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          L[z - 1] = arguments[z];
        Ge("error", c, L);
      }
    }
    function Ge(c, b, L) {
      {
        var z = Ae.ReactDebugCurrentFrame, X = z.getStackAddendum();
        X !== "" && (b += "%s", L = L.concat([X]));
        var Re = L.map(function(fe) {
          return String(fe);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[c], console, Re);
      }
    }
    var cn = {};
    function Nn(c, b) {
      {
        var L = c.constructor, z = L && (L.displayName || L.name) || "ReactClass", X = z + "." + b;
        if (cn[X])
          return;
        ye("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, z), cn[X] = !0;
      }
    }
    var $n = {
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
      enqueueForceUpdate: function(c, b, L) {
        Nn(c, "forceUpdate");
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
      enqueueReplaceState: function(c, b, L, z) {
        Nn(c, "replaceState");
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
      enqueueSetState: function(c, b, L, z) {
        Nn(c, "setState");
      }
    }, Ht = Object.assign, pa = {};
    Object.freeze(pa);
    function En(c, b, L) {
      this.props = c, this.context = b, this.refs = pa, this.updater = L || $n;
    }
    En.prototype.isReactComponent = {}, En.prototype.setState = function(c, b) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, c, b, "setState");
    }, En.prototype.forceUpdate = function(c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    };
    {
      var er = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, ka = function(c, b) {
        Object.defineProperty(En.prototype, c, {
          get: function() {
            _e("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Qt in er)
        er.hasOwnProperty(Qt) && ka(Qt, er[Qt]);
    }
    function Yn() {
    }
    Yn.prototype = En.prototype;
    function Kt(c, b, L) {
      this.props = c, this.context = b, this.refs = pa, this.updater = L || $n;
    }
    var Xt = Kt.prototype = new Yn();
    Xt.constructor = Kt, Ht(Xt, En.prototype), Xt.isPureReactComponent = !0;
    function Jt() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var An = Array.isArray;
    function Bt(c) {
      return An(c);
    }
    function Sn(c) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, L = b && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return L;
      }
    }
    function Pt(c) {
      try {
        return $t(c), !1;
      } catch {
        return !0;
      }
    }
    function $t(c) {
      return "" + c;
    }
    function ta(c) {
      if (Pt(c))
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Sn(c)), $t(c);
    }
    function tr(c, b, L) {
      var z = c.displayName;
      if (z)
        return z;
      var X = b.displayName || b.name || "";
      return X !== "" ? L + "(" + X + ")" : L;
    }
    function ma(c) {
      return c.displayName || "Context";
    }
    function Vn(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && ye("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case C:
          return "Fragment";
        case g:
          return "Portal";
        case k:
          return "Profiler";
        case f:
          return "StrictMode";
        case x:
          return "Suspense";
        case A:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case T:
            var b = c;
            return ma(b) + ".Consumer";
          case D:
            var L = c;
            return ma(L._context) + ".Provider";
          case _:
            return tr(c, c.render, "ForwardRef");
          case V:
            var z = c.displayName || null;
            return z !== null ? z : Vn(c.type) || "Memo";
          case K: {
            var X = c, Re = X._payload, fe = X._init;
            try {
              return Vn(fe(Re));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var fn = Object.prototype.hasOwnProperty, Zt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, xn, Ua, wt;
    wt = {};
    function Rn(c) {
      if (fn.call(c, "ref")) {
        var b = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function kn(c) {
      if (fn.call(c, "key")) {
        var b = Object.getOwnPropertyDescriptor(c, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function _r(c, b) {
      var L = function() {
        xn || (xn = !0, ye("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      L.isReactWarning = !0, Object.defineProperty(c, "key", {
        get: L,
        configurable: !0
      });
    }
    function nr(c, b) {
      var L = function() {
        Ua || (Ua = !0, ye("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      L.isReactWarning = !0, Object.defineProperty(c, "ref", {
        get: L,
        configurable: !0
      });
    }
    function Z(c) {
      if (typeof c.ref == "string" && ve.current && c.__self && ve.current.stateNode !== c.__self) {
        var b = Vn(ve.current.type);
        wt[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, c.ref), wt[b] = !0);
      }
    }
    var be = function(c, b, L, z, X, Re, fe) {
      var Oe = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: y,
        // Built-in properties that belong on the element
        type: c,
        key: b,
        ref: L,
        props: fe,
        // Record the component responsible for creating this element.
        _owner: Re
      };
      return Oe._store = {}, Object.defineProperty(Oe._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Oe, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.defineProperty(Oe, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(Oe.props), Object.freeze(Oe)), Oe;
    };
    function ze(c, b, L) {
      var z, X = {}, Re = null, fe = null, Oe = null, $e = null;
      if (b != null) {
        Rn(b) && (fe = b.ref, Z(b)), kn(b) && (ta(b.key), Re = "" + b.key), Oe = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (z in b)
          fn.call(b, z) && !Zt.hasOwnProperty(z) && (X[z] = b[z]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        X.children = L;
      else if (tt > 1) {
        for (var ot = Array(tt), ut = 0; ut < tt; ut++)
          ot[ut] = arguments[ut + 2];
        Object.freeze && Object.freeze(ot), X.children = ot;
      }
      if (c && c.defaultProps) {
        var He = c.defaultProps;
        for (z in He)
          X[z] === void 0 && (X[z] = He[z]);
      }
      if (Re || fe) {
        var vt = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
        Re && _r(X, vt), fe && nr(X, vt);
      }
      return be(c, Re, fe, Oe, $e, ve.current, X);
    }
    function et(c, b) {
      var L = be(c.type, b, c.ref, c._self, c._source, c._owner, c.props);
      return L;
    }
    function ct(c, b, L) {
      if (c == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
      var z, X = Ht({}, c.props), Re = c.key, fe = c.ref, Oe = c._self, $e = c._source, tt = c._owner;
      if (b != null) {
        Rn(b) && (fe = b.ref, tt = ve.current), kn(b) && (ta(b.key), Re = "" + b.key);
        var ot;
        c.type && c.type.defaultProps && (ot = c.type.defaultProps);
        for (z in b)
          fn.call(b, z) && !Zt.hasOwnProperty(z) && (b[z] === void 0 && ot !== void 0 ? X[z] = ot[z] : X[z] = b[z]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        X.children = L;
      else if (ut > 1) {
        for (var He = Array(ut), vt = 0; vt < ut; vt++)
          He[vt] = arguments[vt + 2];
        X.children = He;
      }
      return be(c.type, Re, fe, Oe, $e, tt, X);
    }
    function gt(c) {
      return typeof c == "object" && c !== null && c.$$typeof === y;
    }
    var yt = ".", dn = ":";
    function Nt(c) {
      var b = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, z = c.replace(b, function(X) {
        return L[X];
      });
      return "$" + z;
    }
    var it = !1, Et = /\/+/g;
    function va(c) {
      return c.replace(Et, "$&/");
    }
    function ha(c, b) {
      return typeof c == "object" && c !== null && c.key != null ? (ta(c.key), Nt("" + c.key)) : b.toString(36);
    }
    function na(c, b, L, z, X) {
      var Re = typeof c;
      (Re === "undefined" || Re === "boolean") && (c = null);
      var fe = !1;
      if (c === null)
        fe = !0;
      else
        switch (Re) {
          case "string":
          case "number":
            fe = !0;
            break;
          case "object":
            switch (c.$$typeof) {
              case y:
              case g:
                fe = !0;
            }
        }
      if (fe) {
        var Oe = c, $e = X(Oe), tt = z === "" ? yt + ha(Oe, 0) : z;
        if (Bt($e)) {
          var ot = "";
          tt != null && (ot = va(tt) + "/"), na($e, b, ot, "", function(Cf) {
            return Cf;
          });
        } else $e != null && (gt($e) && ($e.key && (!Oe || Oe.key !== $e.key) && ta($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Oe || Oe.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            va("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var ut, He, vt = 0, Ct = z === "" ? yt : z + dn;
      if (Bt(c))
        for (var bi = 0; bi < c.length; bi++)
          ut = c[bi], He = Ct + ha(ut, bi), vt += na(ut, b, L, He, X);
      else {
        var yo = q(c);
        if (typeof yo == "function") {
          var lr = c;
          yo === lr.entries && (it || _e("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var bo = yo.call(lr), No, Rf = 0; !(No = bo.next()).done; )
            ut = No.value, He = Ct + ha(ut, Rf++), vt += na(ut, b, L, He, X);
        } else if (Re === "object") {
          var ps = String(c);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function ar(c, b, L) {
      if (c == null)
        return c;
      var z = [], X = 0;
      return na(c, z, "", "", function(Re) {
        return b.call(L, Re, X++);
      }), z;
    }
    function no(c) {
      var b = 0;
      return ar(c, function() {
        b++;
      }), b;
    }
    function si(c, b, L) {
      ar(c, function() {
        b.apply(this, arguments);
      }, L);
    }
    function Ki(c) {
      return ar(c, function(b) {
        return b;
      }) || [];
    }
    function Xi(c) {
      if (!gt(c))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return c;
    }
    function ci(c) {
      var b = {
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
      b.Provider = {
        $$typeof: D,
        _context: b
      };
      var L = !1, z = !1, X = !1;
      {
        var Re = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(Re, {
          Provider: {
            get: function() {
              return z || (z = !0, ye("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
            },
            set: function(fe) {
              b.Provider = fe;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(fe) {
              b._currentValue = fe;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(fe) {
              b._currentValue2 = fe;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(fe) {
              b._threadCount = fe;
            }
          },
          Consumer: {
            get: function() {
              return L || (L = !0, ye("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
            }
          },
          displayName: {
            get: function() {
              return b.displayName;
            },
            set: function(fe) {
              X || (_e("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", fe), X = !0);
            }
          }
        }), b.Consumer = Re;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var ga = -1, aa = 0, In = 1, za = 2;
    function fi(c) {
      if (c._status === ga) {
        var b = c._result, L = b();
        if (L.then(function(Re) {
          if (c._status === aa || c._status === ga) {
            var fe = c;
            fe._status = In, fe._result = Re;
          }
        }, function(Re) {
          if (c._status === aa || c._status === ga) {
            var fe = c;
            fe._status = za, fe._result = Re;
          }
        }), c._status === ga) {
          var z = c;
          z._status = aa, z._result = L;
        }
      }
      if (c._status === In) {
        var X = c._result;
        return X === void 0 && ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, X), "default" in X || ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, X), X.default;
      } else
        throw c._result;
    }
    function N(c) {
      var b = {
        // We use these fields to store the result.
        _status: ga,
        _result: c
      }, L = {
        $$typeof: K,
        _payload: b,
        _init: fi
      };
      {
        var z, X;
        Object.defineProperties(L, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return z;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), z = Re, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return X;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), X = Re, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function W(c) {
      c != null && c.$$typeof === V ? ye("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof c != "function" ? ye("forwardRef requires a render function but was given %s.", c === null ? "null" : typeof c) : c.length !== 0 && c.length !== 2 && ye("forwardRef render functions accept exactly two parameters: props and ref. %s", c.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), c != null && (c.defaultProps != null || c.propTypes != null) && ye("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: _,
        render: c
      };
      {
        var L;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return L;
          },
          set: function(z) {
            L = z, !c.name && !c.displayName && (c.displayName = z);
          }
        });
      }
      return b;
    }
    var ee;
    ee = Symbol.for("react.module.reference");
    function Ne(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === C || c === k || ge || c === f || c === x || c === A || ue || c === de || re || U || he || typeof c == "object" && c !== null && (c.$$typeof === K || c.$$typeof === V || c.$$typeof === D || c.$$typeof === T || c.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === ee || c.getModuleId !== void 0));
    }
    function Pe(c, b) {
      Ne(c) || ye("memo: The first argument must be a component. Instead received: %s", c === null ? "null" : typeof c);
      var L = {
        $$typeof: V,
        type: c,
        compare: b === void 0 ? null : b
      };
      {
        var z;
        Object.defineProperty(L, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return z;
          },
          set: function(X) {
            z = X, !c.name && !c.displayName && (c.displayName = X);
          }
        });
      }
      return L;
    }
    function Te() {
      var c = Y.current;
      return c === null && ye(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), c;
    }
    function Ve(c) {
      var b = Te();
      if (c._context !== void 0) {
        var L = c._context;
        L.Consumer === c ? ye("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === c && ye("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(c);
    }
    function Se(c) {
      var b = Te();
      return b.useState(c);
    }
    function _t(c, b, L) {
      var z = Te();
      return z.useReducer(c, b, L);
    }
    function ft(c) {
      var b = Te();
      return b.useRef(c);
    }
    function dt(c, b) {
      var L = Te();
      return L.useEffect(c, b);
    }
    function pn(c, b) {
      var L = Te();
      return L.useInsertionEffect(c, b);
    }
    function Fa(c, b) {
      var L = Te();
      return L.useLayoutEffect(c, b);
    }
    function ya(c, b) {
      var L = Te();
      return L.useCallback(c, b);
    }
    function Ot(c, b) {
      var L = Te();
      return L.useMemo(c, b);
    }
    function di(c, b, L) {
      var z = Te();
      return z.useImperativeHandle(c, b, L);
    }
    function ba(c, b) {
      {
        var L = Te();
        return L.useDebugValue(c, b);
      }
    }
    function Fe() {
      var c = Te();
      return c.useTransition();
    }
    function pi(c) {
      var b = Te();
      return b.useDeferredValue(c);
    }
    function ns() {
      var c = Te();
      return c.useId();
    }
    function as(c, b, L) {
      var z = Te();
      return z.useSyncExternalStore(c, b, L);
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
            log: Ht({}, c, {
              value: ao
            }),
            info: Ht({}, c, {
              value: ro
            }),
            warn: Ht({}, c, {
              value: io
            }),
            error: Ht({}, c, {
              value: lo
            }),
            group: Ht({}, c, {
              value: oo
            }),
            groupCollapsed: Ht({}, c, {
              value: rs
            }),
            groupEnd: Ht({}, c, {
              value: is
            })
          });
        }
        Or < 0 && ye("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = Ae.ReactCurrentDispatcher, Lr;
    function Zi(c, b, L) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (X) {
            var z = X.stack.trim().match(/\n( *(at )?)/);
            Lr = z && z[1] || "";
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
    function ls(c, b) {
      if (!c || vi)
        return "";
      {
        var L = el.get(c);
        if (L !== void 0)
          return L;
      }
      var z;
      vi = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = mi.current, mi.current = null, uo();
      try {
        if (b) {
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
            } catch (Ct) {
              z = Ct;
            }
            Reflect.construct(c, [], fe);
          } else {
            try {
              fe.call();
            } catch (Ct) {
              z = Ct;
            }
            c.call(fe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ct) {
            z = Ct;
          }
          c();
        }
      } catch (Ct) {
        if (Ct && z && typeof Ct.stack == "string") {
          for (var Oe = Ct.stack.split(`
`), $e = z.stack.split(`
`), tt = Oe.length - 1, ot = $e.length - 1; tt >= 1 && ot >= 0 && Oe[tt] !== $e[ot]; )
            ot--;
          for (; tt >= 1 && ot >= 0; tt--, ot--)
            if (Oe[tt] !== $e[ot]) {
              if (tt !== 1 || ot !== 1)
                do
                  if (tt--, ot--, ot < 0 || Oe[tt] !== $e[ot]) {
                    var ut = `
` + Oe[tt].replace(" at new ", " at ");
                    return c.displayName && ut.includes("<anonymous>") && (ut = ut.replace("<anonymous>", c.displayName)), typeof c == "function" && el.set(c, ut), ut;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = Re, Ha(), Error.prepareStackTrace = X;
      }
      var He = c ? c.displayName || c.name : "", vt = He ? Zi(He) : "";
      return typeof c == "function" && el.set(c, vt), vt;
    }
    function co(c, b, L) {
      return ls(c, !1);
    }
    function bf(c) {
      var b = c.prototype;
      return !!(b && b.isReactComponent);
    }
    function hi(c, b, L) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return ls(c, bf(c));
      if (typeof c == "string")
        return Zi(c);
      switch (c) {
        case x:
          return Zi("Suspense");
        case A:
          return Zi("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case _:
            return co(c.render);
          case V:
            return hi(c.type, b, L);
          case K: {
            var z = c, X = z._payload, Re = z._init;
            try {
              return hi(Re(X), b, L);
            } catch {
            }
          }
        }
      return "";
    }
    var os = {}, fo = Ae.ReactDebugCurrentFrame;
    function Ke(c) {
      if (c) {
        var b = c._owner, L = hi(c.type, c._source, b ? b.type : null);
        fo.setExtraStackFrame(L);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(c, b, L, z, X) {
      {
        var Re = Function.call.bind(fn);
        for (var fe in c)
          if (Re(c, fe)) {
            var Oe = void 0;
            try {
              if (typeof c[fe] != "function") {
                var $e = Error((z || "React class") + ": " + L + " type `" + fe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[fe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Oe = c[fe](b, fe, z, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Oe = tt;
            }
            Oe && !(Oe instanceof Error) && (Ke(X), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", L, fe, typeof Oe), Ke(null)), Oe instanceof Error && !(Oe.message in os) && (os[Oe.message] = !0, Ke(X), ye("Failed %s type: %s", L, Oe.message), Ke(null));
          }
      }
    }
    function rr(c) {
      if (c) {
        var b = c._owner, L = hi(c.type, c._source, b ? b.type : null);
        ce(L);
      } else
        ce(null);
    }
    var Me;
    Me = !1;
    function po() {
      if (ve.current) {
        var c = Vn(ve.current.type);
        if (c)
          return `

Check the render method of \`` + c + "`.";
      }
      return "";
    }
    function Cn(c) {
      if (c !== void 0) {
        var b = c.fileName.replace(/^.*[\\\/]/, ""), L = c.lineNumber;
        return `

Check your code at ` + b + ":" + L + ".";
      }
      return "";
    }
    function gi(c) {
      return c != null ? Cn(c.__source) : "";
    }
    var Mr = {};
    function Ef(c) {
      var b = po();
      if (!b) {
        var L = typeof c == "string" ? c : c.displayName || c.name;
        L && (b = `

Check the top-level render call using <` + L + ">.");
      }
      return b;
    }
    function Yt(c, b) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var L = Ef(b);
        if (!Mr[L]) {
          Mr[L] = !0;
          var z = "";
          c && c._owner && c._owner !== ve.current && (z = " It was passed a child from " + Vn(c._owner.type) + "."), rr(c), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, z), rr(null);
        }
      }
    }
    function mt(c, b) {
      if (typeof c == "object") {
        if (Bt(c))
          for (var L = 0; L < c.length; L++) {
            var z = c[L];
            gt(z) && Yt(z, b);
          }
        else if (gt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var X = q(c);
          if (typeof X == "function" && X !== c.entries)
            for (var Re = X.call(c), fe; !(fe = Re.next()).done; )
              gt(fe.value) && Yt(fe.value, b);
        }
      }
    }
    function us(c) {
      {
        var b = c.type;
        if (b == null || typeof b == "string")
          return;
        var L;
        if (typeof b == "function")
          L = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === _ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === V))
          L = b.propTypes;
        else
          return;
        if (L) {
          var z = Vn(b);
          Nf(L, c.props, "prop", z, c);
        } else if (b.PropTypes !== void 0 && !Me) {
          Me = !0;
          var X = Vn(b);
          ye("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ye("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ra(c) {
      {
        for (var b = Object.keys(c.props), L = 0; L < b.length; L++) {
          var z = b[L];
          if (z !== "children" && z !== "key") {
            rr(c), ye("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), rr(null);
            break;
          }
        }
        c.ref !== null && (rr(c), ye("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function Dn(c, b, L) {
      var z = Ne(c);
      if (!z) {
        var X = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (X += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = gi(b);
        Re ? X += Re : X += po();
        var fe;
        c === null ? fe = "null" : Bt(c) ? fe = "array" : c !== void 0 && c.$$typeof === y ? (fe = "<" + (Vn(c.type) || "Unknown") + " />", X = " Did you accidentally export a JSX literal instead of a component?") : fe = typeof c, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", fe, X);
      }
      var Oe = ze.apply(this, arguments);
      if (Oe == null)
        return Oe;
      if (z)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], c);
      return c === C ? ra(Oe) : us(Oe), Oe;
    }
    var Na = !1;
    function Sf(c) {
      var b = Dn.bind(null, c);
      return b.type = c, Na || (Na = !0, _e("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return _e("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: c
          }), c;
        }
      }), b;
    }
    function mo(c, b, L) {
      for (var z = ct.apply(this, arguments), X = 2; X < arguments.length; X++)
        mt(arguments[X], z.type);
      return us(z), z;
    }
    function ss(c, b) {
      var L = G.transition;
      G.transition = {};
      var z = G.transition;
      G.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        c();
      } finally {
        if (G.transition = L, L === null && z._updatedFibers) {
          var X = z._updatedFibers.size;
          X > 10 && _e("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), z._updatedFibers.clear();
        }
      }
    }
    var vo = !1, tl = null;
    function xf(c) {
      if (tl === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), L = s && s[b];
          tl = L.call(s, "timers").setImmediate;
        } catch {
          tl = function(X) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && ye("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = X, Re.port2.postMessage(void 0);
          };
        }
      return tl(c);
    }
    var Ar = 0, yi = !1;
    function ho(c) {
      {
        var b = Ar;
        Ar++, B.current === null && (B.current = []);
        var L = B.isBatchingLegacy, z;
        try {
          if (B.isBatchingLegacy = !0, z = c(), !L && B.didScheduleLegacyUpdate) {
            var X = B.current;
            X !== null && (B.didScheduleLegacyUpdate = !1, rl(X));
          }
        } catch (He) {
          throw ir(b), He;
        } finally {
          B.isBatchingLegacy = L;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var Re = z, fe = !1, Oe = {
            then: function(He, vt) {
              fe = !0, Re.then(function(Ct) {
                ir(b), Ar === 0 ? nl(Ct, He, vt) : He(Ct);
              }, function(Ct) {
                ir(b), vt(Ct);
              });
            }
          };
          return !yi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            fe || (yi = !0, ye("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Oe;
        } else {
          var $e = z;
          if (ir(b), Ar === 0) {
            var tt = B.current;
            tt !== null && (rl(tt), B.current = null);
            var ot = {
              then: function(He, vt) {
                B.current === null ? (B.current = [], nl($e, He, vt)) : He($e);
              }
            };
            return ot;
          } else {
            var ut = {
              then: function(He, vt) {
                He($e);
              }
            };
            return ut;
          }
        }
      }
    }
    function ir(c) {
      c !== Ar - 1 && ye("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ar = c;
    }
    function nl(c, b, L) {
      {
        var z = B.current;
        if (z !== null)
          try {
            rl(z), xf(function() {
              z.length === 0 ? (B.current = null, b(c)) : nl(c, b, L);
            });
          } catch (X) {
            L(X);
          }
        else
          b(c);
      }
    }
    var al = !1;
    function rl(c) {
      if (!al) {
        al = !0;
        var b = 0;
        try {
          for (; b < c.length; b++) {
            var L = c[b];
            do
              L = L(!0);
            while (L !== null);
          }
          c.length = 0;
        } catch (z) {
          throw c = c.slice(b + 1), z;
        } finally {
          al = !1;
        }
      }
    }
    var cs = Dn, fs = mo, go = Sf, ds = {
      map: ar,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    m.Children = ds, m.Component = En, m.Fragment = C, m.Profiler = k, m.PureComponent = Kt, m.StrictMode = f, m.Suspense = x, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ae, m.act = ho, m.cloneElement = fs, m.createContext = ci, m.createElement = cs, m.createFactory = go, m.createRef = Jt, m.forwardRef = W, m.isValidElement = gt, m.lazy = N, m.memo = Pe, m.startTransition = ss, m.unstable_act = ho, m.useCallback = ya, m.useContext = Ve, m.useDebugValue = ba, m.useDeferredValue = pi, m.useEffect = dt, m.useId = ns, m.useImperativeHandle = di, m.useInsertionEffect = pn, m.useLayoutEffect = Fa, m.useMemo = Ot, m.useReducer = _t, m.useRef = ft, m.useState = Se, m.useSyncExternalStore = as, m.useTransition = Fe, m.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var H1 = hf.exports;
sE.exports = H1;
var R = sE.exports;
const B1 = /* @__PURE__ */ F1(R), P1 = /* @__PURE__ */ z1({
  __proto__: null,
  default: B1
}, [R]);
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
  var s = R, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), k = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), K = Symbol.iterator, de = "@@iterator";
  function ne(N) {
    if (N === null || typeof N != "object")
      return null;
    var W = K && N[K] || N[de];
    return typeof W == "function" ? W : null;
  }
  var me = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function q(N) {
    {
      for (var W = arguments.length, ee = new Array(W > 1 ? W - 1 : 0), Ne = 1; Ne < W; Ne++)
        ee[Ne - 1] = arguments[Ne];
      Y("error", N, ee);
    }
  }
  function Y(N, W, ee) {
    {
      var Ne = me.ReactDebugCurrentFrame, Pe = Ne.getStackAddendum();
      Pe !== "" && (W += "%s", ee = ee.concat([Pe]));
      var Te = ee.map(function(Ve) {
        return String(Ve);
      });
      Te.unshift("Warning: " + W), Function.prototype.apply.call(console[N], console, Te);
    }
  }
  var G = !1, B = !1, ve = !1, $ = !1, Ue = !1, ce;
  ce = Symbol.for("react.module.reference");
  function re(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === y || N === C || Ue || N === g || N === T || N === _ || $ || N === V || G || B || ve || typeof N == "object" && N !== null && (N.$$typeof === A || N.$$typeof === x || N.$$typeof === f || N.$$typeof === k || N.$$typeof === D || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === ce || N.getModuleId !== void 0));
  }
  function U(N, W, ee) {
    var Ne = N.displayName;
    if (Ne)
      return Ne;
    var Pe = W.displayName || W.name || "";
    return Pe !== "" ? ee + "(" + Pe + ")" : ee;
  }
  function he(N) {
    return N.displayName || "Context";
  }
  function ue(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
      return N.displayName || N.name || null;
    if (typeof N == "string")
      return N;
    switch (N) {
      case y:
        return "Fragment";
      case h:
        return "Portal";
      case C:
        return "Profiler";
      case g:
        return "StrictMode";
      case T:
        return "Suspense";
      case _:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case k:
          var W = N;
          return he(W) + ".Consumer";
        case f:
          var ee = N;
          return he(ee._context) + ".Provider";
        case D:
          return U(N, N.render, "ForwardRef");
        case x:
          var Ne = N.displayName || null;
          return Ne !== null ? Ne : ue(N.type) || "Memo";
        case A: {
          var Pe = N, Te = Pe._payload, Ve = Pe._init;
          try {
            return ue(Ve(Te));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var ge = Object.assign, Ae = 0, _e, ye, Ge, cn, Nn, $n, Ht;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function En() {
    {
      if (Ae === 0) {
        _e = console.log, ye = console.info, Ge = console.warn, cn = console.error, Nn = console.group, $n = console.groupCollapsed, Ht = console.groupEnd;
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
      Ae++;
    }
  }
  function er() {
    {
      if (Ae--, Ae === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ge({}, N, {
            value: _e
          }),
          info: ge({}, N, {
            value: ye
          }),
          warn: ge({}, N, {
            value: Ge
          }),
          error: ge({}, N, {
            value: cn
          }),
          group: ge({}, N, {
            value: Nn
          }),
          groupCollapsed: ge({}, N, {
            value: $n
          }),
          groupEnd: ge({}, N, {
            value: Ht
          })
        });
      }
      Ae < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var ka = me.ReactCurrentDispatcher, Qt;
  function Yn(N, W, ee) {
    {
      if (Qt === void 0)
        try {
          throw Error();
        } catch (Pe) {
          var Ne = Pe.stack.trim().match(/\n( *(at )?)/);
          Qt = Ne && Ne[1] || "";
        }
      return `
` + Qt + N;
    }
  }
  var Kt = !1, Xt;
  {
    var Jt = typeof WeakMap == "function" ? WeakMap : Map;
    Xt = new Jt();
  }
  function An(N, W) {
    if (!N || Kt)
      return "";
    {
      var ee = Xt.get(N);
      if (ee !== void 0)
        return ee;
    }
    var Ne;
    Kt = !0;
    var Pe = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Te;
    Te = ka.current, ka.current = null, En();
    try {
      if (W) {
        var Ve = function() {
          throw Error();
        };
        if (Object.defineProperty(Ve.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Ve, []);
          } catch (Ot) {
            Ne = Ot;
          }
          Reflect.construct(N, [], Ve);
        } else {
          try {
            Ve.call();
          } catch (Ot) {
            Ne = Ot;
          }
          N.call(Ve.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Ot) {
          Ne = Ot;
        }
        N();
      }
    } catch (Ot) {
      if (Ot && Ne && typeof Ot.stack == "string") {
        for (var Se = Ot.stack.split(`
`), _t = Ne.stack.split(`
`), ft = Se.length - 1, dt = _t.length - 1; ft >= 1 && dt >= 0 && Se[ft] !== _t[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (Se[ft] !== _t[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || Se[ft] !== _t[dt]) {
                  var pn = `
` + Se[ft].replace(" at new ", " at ");
                  return N.displayName && pn.includes("<anonymous>") && (pn = pn.replace("<anonymous>", N.displayName)), typeof N == "function" && Xt.set(N, pn), pn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Kt = !1, ka.current = Te, er(), Error.prepareStackTrace = Pe;
    }
    var Fa = N ? N.displayName || N.name : "", ya = Fa ? Yn(Fa) : "";
    return typeof N == "function" && Xt.set(N, ya), ya;
  }
  function Bt(N, W, ee) {
    return An(N, !1);
  }
  function Sn(N) {
    var W = N.prototype;
    return !!(W && W.isReactComponent);
  }
  function Pt(N, W, ee) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return An(N, Sn(N));
    if (typeof N == "string")
      return Yn(N);
    switch (N) {
      case T:
        return Yn("Suspense");
      case _:
        return Yn("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case D:
          return Bt(N.render);
        case x:
          return Pt(N.type, W, ee);
        case A: {
          var Ne = N, Pe = Ne._payload, Te = Ne._init;
          try {
            return Pt(Te(Pe), W, ee);
          } catch {
          }
        }
      }
    return "";
  }
  var $t = Object.prototype.hasOwnProperty, ta = {}, tr = me.ReactDebugCurrentFrame;
  function ma(N) {
    if (N) {
      var W = N._owner, ee = Pt(N.type, N._source, W ? W.type : null);
      tr.setExtraStackFrame(ee);
    } else
      tr.setExtraStackFrame(null);
  }
  function Vn(N, W, ee, Ne, Pe) {
    {
      var Te = Function.call.bind($t);
      for (var Ve in N)
        if (Te(N, Ve)) {
          var Se = void 0;
          try {
            if (typeof N[Ve] != "function") {
              var _t = Error((Ne || "React class") + ": " + ee + " type `" + Ve + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[Ve] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw _t.name = "Invariant Violation", _t;
            }
            Se = N[Ve](W, Ve, Ne, ee, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Se = ft;
          }
          Se && !(Se instanceof Error) && (ma(Pe), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", ee, Ve, typeof Se), ma(null)), Se instanceof Error && !(Se.message in ta) && (ta[Se.message] = !0, ma(Pe), q("Failed %s type: %s", ee, Se.message), ma(null));
        }
    }
  }
  var fn = Array.isArray;
  function Zt(N) {
    return fn(N);
  }
  function xn(N) {
    {
      var W = typeof Symbol == "function" && Symbol.toStringTag, ee = W && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return ee;
    }
  }
  function Ua(N) {
    try {
      return wt(N), !1;
    } catch {
      return !0;
    }
  }
  function wt(N) {
    return "" + N;
  }
  function Rn(N) {
    if (Ua(N))
      return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xn(N)), wt(N);
  }
  var kn = me.ReactCurrentOwner, _r = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, Z, be;
  be = {};
  function ze(N) {
    if ($t.call(N, "ref")) {
      var W = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (W && W.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if ($t.call(N, "key")) {
      var W = Object.getOwnPropertyDescriptor(N, "key").get;
      if (W && W.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, W) {
    if (typeof N.ref == "string" && kn.current && W && kn.current.stateNode !== W) {
      var ee = ue(kn.current.type);
      be[ee] || (q('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ue(kn.current.type), N.ref), be[ee] = !0);
    }
  }
  function gt(N, W) {
    {
      var ee = function() {
        nr || (nr = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
      };
      ee.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ee,
        configurable: !0
      });
    }
  }
  function yt(N, W) {
    {
      var ee = function() {
        Z || (Z = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", W));
      };
      ee.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ee,
        configurable: !0
      });
    }
  }
  var dn = function(N, W, ee, Ne, Pe, Te, Ve) {
    var Se = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: m,
      // Built-in properties that belong on the element
      type: N,
      key: W,
      ref: ee,
      props: Ve,
      // Record the component responsible for creating this element.
      _owner: Te
    };
    return Se._store = {}, Object.defineProperty(Se._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(Se, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ne
    }), Object.defineProperty(Se, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Pe
    }), Object.freeze && (Object.freeze(Se.props), Object.freeze(Se)), Se;
  };
  function Nt(N, W, ee, Ne, Pe) {
    {
      var Te, Ve = {}, Se = null, _t = null;
      ee !== void 0 && (Rn(ee), Se = "" + ee), et(W) && (Rn(W.key), Se = "" + W.key), ze(W) && (_t = W.ref, ct(W, Pe));
      for (Te in W)
        $t.call(W, Te) && !_r.hasOwnProperty(Te) && (Ve[Te] = W[Te]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (Te in ft)
          Ve[Te] === void 0 && (Ve[Te] = ft[Te]);
      }
      if (Se || _t) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Se && gt(Ve, dt), _t && yt(Ve, dt);
      }
      return dn(N, Se, _t, Pe, Ne, kn.current, Ve);
    }
  }
  var it = me.ReactCurrentOwner, Et = me.ReactDebugCurrentFrame;
  function va(N) {
    if (N) {
      var W = N._owner, ee = Pt(N.type, N._source, W ? W.type : null);
      Et.setExtraStackFrame(ee);
    } else
      Et.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function na(N) {
    return typeof N == "object" && N !== null && N.$$typeof === m;
  }
  function ar() {
    {
      if (it.current) {
        var N = ue(it.current.type);
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
        var W = N.fileName.replace(/^.*[\\\/]/, ""), ee = N.lineNumber;
        return `

Check your code at ` + W + ":" + ee + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(N) {
    {
      var W = ar();
      if (!W) {
        var ee = typeof N == "string" ? N : N.displayName || N.name;
        ee && (W = `

Check the top-level render call using <` + ee + ">.");
      }
      return W;
    }
  }
  function Xi(N, W) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ee = Ki(W);
      if (si[ee])
        return;
      si[ee] = !0;
      var Ne = "";
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + ue(N._owner.type) + "."), va(N), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ee, Ne), va(null);
    }
  }
  function ci(N, W) {
    {
      if (typeof N != "object")
        return;
      if (Zt(N))
        for (var ee = 0; ee < N.length; ee++) {
          var Ne = N[ee];
          na(Ne) && Xi(Ne, W);
        }
      else if (na(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Pe = ne(N);
        if (typeof Pe == "function" && Pe !== N.entries)
          for (var Te = Pe.call(N), Ve; !(Ve = Te.next()).done; )
            na(Ve.value) && Xi(Ve.value, W);
      }
    }
  }
  function ga(N) {
    {
      var W = N.type;
      if (W == null || typeof W == "string")
        return;
      var ee;
      if (typeof W == "function")
        ee = W.propTypes;
      else if (typeof W == "object" && (W.$$typeof === D || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      W.$$typeof === x))
        ee = W.propTypes;
      else
        return;
      if (ee) {
        var Ne = ue(W);
        Vn(ee, N.props, "prop", Ne, N);
      } else if (W.PropTypes !== void 0 && !ha) {
        ha = !0;
        var Pe = ue(W);
        q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Pe || "Unknown");
      }
      typeof W.getDefaultProps == "function" && !W.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function aa(N) {
    {
      for (var W = Object.keys(N.props), ee = 0; ee < W.length; ee++) {
        var Ne = W[ee];
        if (Ne !== "children" && Ne !== "key") {
          va(N), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ne), va(null);
          break;
        }
      }
      N.ref !== null && (va(N), q("Invalid attribute `ref` supplied to `React.Fragment`."), va(null));
    }
  }
  var In = {};
  function za(N, W, ee, Ne, Pe, Te) {
    {
      var Ve = re(N);
      if (!Ve) {
        var Se = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _t = no(Pe);
        _t ? Se += _t : Se += ar();
        var ft;
        N === null ? ft = "null" : Zt(N) ? ft = "array" : N !== void 0 && N.$$typeof === m ? (ft = "<" + (ue(N.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, q("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Se);
      }
      var dt = Nt(N, W, ee, Pe, Te);
      if (dt == null)
        return dt;
      if (Ve) {
        var pn = W.children;
        if (pn !== void 0)
          if (Ne)
            if (Zt(pn)) {
              for (var Fa = 0; Fa < pn.length; Fa++)
                ci(pn[Fa], N);
              Object.freeze && Object.freeze(pn);
            } else
              q("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(pn, N);
      }
      if ($t.call(W, "key")) {
        var ya = ue(N), Ot = Object.keys(W).filter(function(Fe) {
          return Fe !== "key";
        }), di = Ot.length > 0 ? "{key: someKey, " + Ot.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!In[ya + di]) {
          var ba = Ot.length > 0 ? "{" + Ot.join(": ..., ") + ": ...}" : "{}";
          q(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, ya, ba, ya), In[ya + di] = !0;
        }
      }
      return N === y ? aa(dt) : ga(dt), dt;
    }
  }
  var fi = za;
  _v.Fragment = y, _v.jsxDEV = fi;
})();
uE.exports = _v;
var d = uE.exports, cE = { exports: {} }, ea = {}, fE = { exports: {} }, dE = {};
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
    function y(Z, be) {
      var ze = Z.length;
      Z.push(be), f(Z, be, ze);
    }
    function g(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function C(Z) {
      if (Z.length === 0)
        return null;
      var be = Z[0], ze = Z.pop();
      return ze !== be && (Z[0] = ze, k(Z, ze, 0)), be;
    }
    function f(Z, be, ze) {
      for (var et = ze; et > 0; ) {
        var ct = et - 1 >>> 1, gt = Z[ct];
        if (D(gt, be) > 0)
          Z[ct] = be, Z[et] = gt, et = ct;
        else
          return;
      }
    }
    function k(Z, be, ze) {
      for (var et = ze, ct = Z.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, dn = Z[yt], Nt = yt + 1, it = Z[Nt];
        if (D(dn, be) < 0)
          Nt < ct && D(it, dn) < 0 ? (Z[et] = it, Z[Nt] = be, et = Nt) : (Z[et] = dn, Z[yt] = be, et = yt);
        else if (Nt < ct && D(it, be) < 0)
          Z[et] = it, Z[Nt] = be, et = Nt;
        else
          return;
      }
    }
    function D(Z, be) {
      var ze = Z.sortIndex - be.sortIndex;
      return ze !== 0 ? ze : Z.id - be.id;
    }
    var T = 1, _ = 2, x = 3, A = 4, V = 5;
    function K(Z, be) {
    }
    var de = typeof performance == "object" && typeof performance.now == "function";
    if (de) {
      var ne = performance;
      s.unstable_now = function() {
        return ne.now();
      };
    } else {
      var me = Date, q = me.now();
      s.unstable_now = function() {
        return me.now() - q;
      };
    }
    var Y = 1073741823, G = -1, B = 250, ve = 5e3, $ = 1e4, Ue = Y, ce = [], re = [], U = 1, he = null, ue = x, ge = !1, Ae = !1, _e = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Ge = typeof clearTimeout == "function" ? clearTimeout : null, cn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Nn(Z) {
      for (var be = g(re); be !== null; ) {
        if (be.callback === null)
          C(re);
        else if (be.startTime <= Z)
          C(re), be.sortIndex = be.expirationTime, y(ce, be);
        else
          return;
        be = g(re);
      }
    }
    function $n(Z) {
      if (_e = !1, Nn(Z), !Ae)
        if (g(ce) !== null)
          Ae = !0, wt(Ht);
        else {
          var be = g(re);
          be !== null && Rn($n, be.startTime - Z);
        }
    }
    function Ht(Z, be) {
      Ae = !1, _e && (_e = !1, kn()), ge = !0;
      var ze = ue;
      try {
        var et;
        if (!m) return pa(Z, be);
      } finally {
        he = null, ue = ze, ge = !1;
      }
    }
    function pa(Z, be) {
      var ze = be;
      for (Nn(ze), he = g(ce); he !== null && !(he.expirationTime > ze && (!Z || tr())); ) {
        var et = he.callback;
        if (typeof et == "function") {
          he.callback = null, ue = he.priorityLevel;
          var ct = he.expirationTime <= ze, gt = et(ct);
          ze = s.unstable_now(), typeof gt == "function" ? he.callback = gt : he === g(ce) && C(ce), Nn(ze);
        } else
          C(ce);
        he = g(ce);
      }
      if (he !== null)
        return !0;
      var yt = g(re);
      return yt !== null && Rn($n, yt.startTime - ze), !1;
    }
    function En(Z, be) {
      switch (Z) {
        case T:
        case _:
        case x:
        case A:
        case V:
          break;
        default:
          Z = x;
      }
      var ze = ue;
      ue = Z;
      try {
        return be();
      } finally {
        ue = ze;
      }
    }
    function er(Z) {
      var be;
      switch (ue) {
        case T:
        case _:
        case x:
          be = x;
          break;
        default:
          be = ue;
          break;
      }
      var ze = ue;
      ue = be;
      try {
        return Z();
      } finally {
        ue = ze;
      }
    }
    function ka(Z) {
      var be = ue;
      return function() {
        var ze = ue;
        ue = be;
        try {
          return Z.apply(this, arguments);
        } finally {
          ue = ze;
        }
      };
    }
    function Qt(Z, be, ze) {
      var et = s.unstable_now(), ct;
      if (typeof ze == "object" && ze !== null) {
        var gt = ze.delay;
        typeof gt == "number" && gt > 0 ? ct = et + gt : ct = et;
      } else
        ct = et;
      var yt;
      switch (Z) {
        case T:
          yt = G;
          break;
        case _:
          yt = B;
          break;
        case V:
          yt = Ue;
          break;
        case A:
          yt = $;
          break;
        case x:
        default:
          yt = ve;
          break;
      }
      var dn = ct + yt, Nt = {
        id: U++,
        callback: be,
        priorityLevel: Z,
        startTime: ct,
        expirationTime: dn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, y(re, Nt), g(ce) === null && Nt === g(re) && (_e ? kn() : _e = !0, Rn($n, ct - et))) : (Nt.sortIndex = dn, y(ce, Nt), !Ae && !ge && (Ae = !0, wt(Ht))), Nt;
    }
    function Yn() {
    }
    function Kt() {
      !Ae && !ge && (Ae = !0, wt(Ht));
    }
    function Xt() {
      return g(ce);
    }
    function Jt(Z) {
      Z.callback = null;
    }
    function An() {
      return ue;
    }
    var Bt = !1, Sn = null, Pt = -1, $t = h, ta = -1;
    function tr() {
      var Z = s.unstable_now() - ta;
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
    var fn = function() {
      if (Sn !== null) {
        var Z = s.unstable_now();
        ta = Z;
        var be = !0, ze = !0;
        try {
          ze = Sn(be, Z);
        } finally {
          ze ? Zt() : (Bt = !1, Sn = null);
        }
      } else
        Bt = !1;
    }, Zt;
    if (typeof cn == "function")
      Zt = function() {
        cn(fn);
      };
    else if (typeof MessageChannel < "u") {
      var xn = new MessageChannel(), Ua = xn.port2;
      xn.port1.onmessage = fn, Zt = function() {
        Ua.postMessage(null);
      };
    } else
      Zt = function() {
        ye(fn, 0);
      };
    function wt(Z) {
      Sn = Z, Bt || (Bt = !0, Zt());
    }
    function Rn(Z, be) {
      Pt = ye(function() {
        Z(s.unstable_now());
      }, be);
    }
    function kn() {
      Ge(Pt), Pt = -1;
    }
    var _r = ma, nr = null;
    s.unstable_IdlePriority = V, s.unstable_ImmediatePriority = T, s.unstable_LowPriority = A, s.unstable_NormalPriority = x, s.unstable_Profiling = nr, s.unstable_UserBlockingPriority = _, s.unstable_cancelCallback = Jt, s.unstable_continueExecution = Kt, s.unstable_forceFrameRate = Vn, s.unstable_getCurrentPriorityLevel = An, s.unstable_getFirstCallbackNode = Xt, s.unstable_next = er, s.unstable_pauseExecution = Yn, s.unstable_requestPaint = _r, s.unstable_runWithPriority = En, s.unstable_scheduleCallback = Qt, s.unstable_shouldYield = tr, s.unstable_wrapCallback = ka, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(dE);
fE.exports = dE;
var $1 = fE.exports;
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
  var s = R, m = $1, h = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, y = !1;
  function g(e) {
    y = e;
  }
  function C(e) {
    if (!y) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      k("warn", e, n);
    }
  }
  function f(e) {
    if (!y) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      k("error", e, n);
    }
  }
  function k(e, t, n) {
    {
      var a = h.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var D = 0, T = 1, _ = 2, x = 3, A = 4, V = 5, K = 6, de = 7, ne = 8, me = 9, q = 10, Y = 11, G = 12, B = 13, ve = 14, $ = 15, Ue = 16, ce = 17, re = 18, U = 19, he = 21, ue = 22, ge = 23, Ae = 24, _e = 25, ye = !0, Ge = !1, cn = !1, Nn = !1, $n = !1, Ht = !0, pa = !0, En = !0, er = !0, ka = /* @__PURE__ */ new Set(), Qt = {}, Yn = {};
  function Kt(e, t) {
    Xt(e, t), Xt(e + "Capture", t);
  }
  function Xt(e, t) {
    Qt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Qt[e] = t;
    {
      var n = e.toLowerCase();
      Yn[n] = e, e === "onDoubleClick" && (Yn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      ka.add(t[a]);
  }
  var Jt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", An = Object.prototype.hasOwnProperty;
  function Bt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Sn(e) {
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
    if (Sn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), Pt(e);
  }
  function ta(e) {
    if (Sn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), Pt(e);
  }
  function tr(e, t) {
    if (Sn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), Pt(e);
  }
  function ma(e, t) {
    if (Sn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), Pt(e);
  }
  function Vn(e) {
    if (Sn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), Pt(e);
  }
  function fn(e) {
    if (Sn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Bt(e)), Pt(e);
  }
  var Zt = 0, xn = 1, Ua = 2, wt = 3, Rn = 4, kn = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Z = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + nr + "][" + Z + "]*$"), ze = {}, et = {};
  function ct(e) {
    return An.call(et, e) ? !0 : An.call(ze, e) ? !1 : be.test(e) ? (et[e] = !0, !0) : (ze[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function gt(e, t, n) {
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
  function dn(e, t, n, a) {
    if (t === null || typeof t > "u" || yt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case wt:
          return !t;
        case Rn:
          return t === !1;
        case kn:
          return isNaN(t);
        case _r:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Nt(e) {
    return Et.hasOwnProperty(e) ? Et[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Ua || t === wt || t === Rn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Et = {}, va = [
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
    Et[e] = new it(
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
    Et[t] = new it(
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
    Et[e] = new it(
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
    Et[e] = new it(
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
    Et[e] = new it(
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
    Et[e] = new it(
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
    Et[e] = new it(
      e,
      Rn,
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
    Et[e] = new it(
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
    Et[e] = new it(
      e,
      kn,
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
    Et[t] = new it(
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
    Et[t] = new it(
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
    Et[t] = new it(
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
    Et[e] = new it(
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
  Et[ar] = new it(
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
    Et[e] = new it(
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
      $t(n, t), a.sanitizeURL && Ki("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Rn) {
        if (e.hasAttribute(i)) {
          var o = e.getAttribute(i);
          return o === "" ? !0 : dn(t, n, a, !1) ? o : o === "" + n ? n : o;
        }
      } else if (e.hasAttribute(i)) {
        if (dn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === wt)
          return n;
        l = e.getAttribute(i);
      }
      return dn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function ci(e, t, n, a) {
    {
      if (!ct(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return $t(n, t), r === "" + n ? n : r;
    }
  }
  function ga(e, t, n, a) {
    var r = Nt(t);
    if (!gt(t, r, a)) {
      if (dn(t, n, r, a) && (n = null), a || r === null) {
        if (ct(t)) {
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
        S === wt || S === Rn && n === !0 ? E = "" : ($t(n, p), E = "" + n, r.sanitizeURL && Ki(E.toString())), v ? e.setAttributeNS(v, p, E) : e.setAttribute(p, E);
      }
    }
  }
  var aa = Symbol.for("react.element"), In = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), W = Symbol.for("react.provider"), ee = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Pe = Symbol.for("react.suspense"), Te = Symbol.for("react.suspense_list"), Ve = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), _t = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), pn = Symbol.for("react.legacy_hidden"), Fa = Symbol.for("react.cache"), ya = Symbol.for("react.tracing_marker"), Ot = Symbol.iterator, di = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Ot && e[Ot] || e[di];
    return typeof t == "function" ? t : null;
  }
  var Fe = Object.assign, pi = 0, ns, as, Or, ao, ro, io, lo;
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
          log: Fe({}, e, {
            value: ns
          }),
          info: Fe({}, e, {
            value: as
          }),
          warn: Fe({}, e, {
            value: Or
          }),
          error: Fe({}, e, {
            value: ao
          }),
          group: Fe({}, e, {
            value: ro
          }),
          groupCollapsed: Fe({}, e, {
            value: io
          }),
          groupEnd: Fe({}, e, {
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
          } catch (M) {
            a = M;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (M) {
            a = M;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (M) {
          a = M;
        }
        e();
      }
    } catch (M) {
      if (M && a && typeof M.stack == "string") {
        for (var o = M.stack.split(`
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
                  return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, S), S;
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
      case Pe:
        return Ha("Suspense");
      case Te:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ne:
          return so(e.render);
        case Ve:
          return co(e.type, t, n);
        case Se: {
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
      case V:
        return Ha(e.type);
      case Ue:
        return Ha("Lazy");
      case B:
        return Ha("Suspense");
      case U:
        return Ha("SuspenseList");
      case D:
      case _:
      case $:
        return so(e.type);
      case Y:
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
  function Ke(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case za:
        return "Fragment";
      case In:
        return "Portal";
      case N:
        return "Profiler";
      case fi:
        return "StrictMode";
      case Pe:
        return "Suspense";
      case Te:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ee:
          var t = e;
          return fo(t) + ".Consumer";
        case W:
          var n = e;
          return fo(n._context) + ".Provider";
        case Ne:
          return os(e, e.render, "ForwardRef");
        case Ve:
          var a = e.displayName || null;
          return a !== null ? a : Ke(e.type) || "Memo";
        case Se: {
          var r = e, i = r._payload, l = r._init;
          try {
            return Ke(l(i));
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
  function Me(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Ae:
        return "Cache";
      case me:
        var a = n;
        return rr(a) + ".Consumer";
      case q:
        var r = n;
        return rr(r._context) + ".Provider";
      case re:
        return "DehydratedFragment";
      case Y:
        return Nf(n, n.render, "ForwardRef");
      case de:
        return "Fragment";
      case V:
        return n;
      case A:
        return "Portal";
      case x:
        return "Root";
      case K:
        return "Text";
      case Ue:
        return Ke(n);
      case ne:
        return n === fi ? "StrictMode" : "Mode";
      case ue:
        return "Offscreen";
      case G:
        return "Profiler";
      case he:
        return "Scope";
      case B:
        return "Suspense";
      case U:
        return "SuspenseList";
      case _e:
        return "TracingMarker";
      case T:
      case D:
      case ce:
      case _:
      case ve:
      case $:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = h.ReactDebugCurrentFrame, Cn = null, gi = !1;
  function Mr() {
    {
      if (Cn === null)
        return null;
      var e = Cn._debugOwner;
      if (e !== null && typeof e < "u")
        return Me(e);
    }
    return null;
  }
  function Ef() {
    return Cn === null ? "" : hi(Cn);
  }
  function Yt() {
    po.getCurrentStack = null, Cn = null, gi = !1;
  }
  function mt(e) {
    po.getCurrentStack = e === null ? null : Ef, Cn = e, gi = !1;
  }
  function us() {
    return Cn;
  }
  function ra(e) {
    gi = e;
  }
  function Dn(e) {
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
  function Ar(e) {
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
  function yi(e) {
    vo(e) || (e._valueTracker = Ar(e));
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
  function go(e, t) {
    var n = e, a = t.checked, r = Fe({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function ds(e, t) {
    mo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !al && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), al = !0), t.value !== void 0 && t.defaultValue !== void 0 && !nl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), nl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Na(t.value != null ? t.value : a),
      controlled: fs(t)
    };
  }
  function c(e, t) {
    var n = e, a = t.checked;
    a != null && ga(n, "checked", a, !1);
  }
  function b(e, t) {
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
      n.value != r) && (n.value = Dn(r)) : n.value !== Dn(r) && (n.value = Dn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Re(n, t.type, r) : t.hasOwnProperty("defaultValue") && Re(n, t.type, Na(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function L(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = Dn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var o = a.name;
    o !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, o !== "" && (a.name = o);
  }
  function z(e, t) {
    var n = e;
    b(n, t), X(n, t);
  }
  function X(e, t) {
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
          ho(l), b(l, o);
        }
      }
    }
  }
  function Re(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Dn(e._wrapperState.initialValue) : e.defaultValue !== Dn(n) && (e.defaultValue = Dn(n)));
  }
  var fe = !1, Oe = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? s.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Oe || (Oe = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !fe && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), fe = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", Dn(Na(t.value)));
  }
  var ut = Array.isArray;
  function He(e) {
    return ut(e);
  }
  var vt;
  vt = !1;
  function Ct() {
    var e = Mr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var bi = ["value", "defaultValue"];
  function yo(e) {
    {
      mo("select", e);
      for (var t = 0; t < bi.length; t++) {
        var n = bi[t];
        if (e[n] != null) {
          var a = He(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Ct()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Ct());
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
      for (var v = Dn(Na(n)), S = null, E = 0; E < r.length; E++) {
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
    return Fe({}, t, {
      value: void 0
    });
  }
  function No(e, t) {
    var n = e;
    yo(t), n._wrapperState = {
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
    var a = Fe({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Dn(n._wrapperState.initialValue)
    });
    return a;
  }
  function $v(e, t) {
    var n = e;
    mo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Pv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component"), Pv = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (He(r)) {
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
      var i = Dn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Dn(r));
  }
  function Iv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function CE(e, t) {
    Yv(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", DE = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return DE;
      default:
        return or;
    }
  }
  function wf(e, t) {
    return e == null || e === or ? jf(t) : e === Tf && t === "foreignObject" ? or : e;
  }
  var TE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, ms, qv = TE(function(e, t) {
    if (e.namespaceURI === Tf && !("innerHTML" in e)) {
      ms = ms || document.createElement("div"), ms.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = ms.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Un = 1, ur = 3, Dt = 8, sr = 9, _f = 11, vs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, jE = {
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
  function wE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var _E = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    _E.forEach(function(t) {
      Eo[wE(t, e)] = Eo[e];
    });
  });
  function Of(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (ma(t, e), ("" + t).trim());
  }
  var OE = /([A-Z])/g, LE = /^ms-/;
  function ME(e) {
    return e.replace(OE, "-$1").toLowerCase().replace(LE, "-ms-");
  }
  var Gv = function() {
  };
  {
    var AE = /^(?:webkit|moz|o)[A-Z]/, VE = /^-ms-/, kE = /-(.)/g, Wv = /;\s*$/, il = {}, Lf = {}, Qv = !1, Kv = !1, UE = function(e) {
      return e.replace(kE, function(t, n) {
        return n.toUpperCase();
      });
    }, zE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        UE(e.replace(VE, "ms-"))
      ));
    }, FE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, HE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Wv, "")));
    }, BE = function(e, t) {
      Qv || (Qv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, PE = function(e, t) {
      Kv || (Kv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Gv = function(e, t) {
      e.indexOf("-") > -1 ? zE(e) : AE.test(e) ? FE(e) : Wv.test(t) && HE(e, t), typeof t == "number" && (isNaN(t) ? BE(e, t) : isFinite(t) || PE(e, t));
    };
  }
  var $E = Gv;
  function YE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : ME(a)) + ":", t += Of(a, r, i), n = ";";
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
        r || $E(a, t[a]);
        var i = Of(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function IE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Jv(e) {
    var t = {};
    for (var n in e)
      for (var a = jE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function qE(e, t) {
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
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", IE(e[l]) ? "Removing" : "Updating", l, o);
        }
      }
    }
  }
  var GE = {
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
  }, WE = Fe({
    menuitem: !0
  }, GE), QE = "__html";
  function Mf(e, t) {
    if (t) {
      if (WE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(QE in t.dangerouslySetInnerHTML))
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
  }, ll = {}, KE = new RegExp("^(aria)-[" + Z + "]*$"), XE = new RegExp("^(aria)[A-Z][" + Z + "]*$");
  function JE(e, t) {
    {
      if (An.call(ll, t) && ll[t])
        return !0;
      if (XE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = Zv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ll[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ll[t] = !0, !0;
      }
      if (KE.test(t)) {
        var r = t.toLowerCase(), i = Zv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ll[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ll[t] = !0, !0;
      }
    }
    return !0;
  }
  function ZE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = JE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function eS(e, t) {
    Ni(e, t) || ZE(e, t);
  }
  var eh = !1;
  function tS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !eh && (eh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var th = function() {
  };
  {
    var Tn = {}, nh = /^on./, nS = /^on[^A-Z]/, aS = new RegExp("^(aria)-[" + Z + "]*$"), rS = new RegExp("^(aria)[A-Z][" + Z + "]*$");
    th = function(e, t, n, a) {
      if (An.call(Tn, t) && Tn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Tn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var o = l.hasOwnProperty(r) ? l[r] : null;
        if (o != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, o), Tn[t] = !0, !0;
        if (nh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), Tn[t] = !0, !0;
      } else if (nh.test(t))
        return nS.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Tn[t] = !0, !0;
      if (aS.test(t) || rS.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Tn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Tn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Tn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Tn[t] = !0, !0;
      var u = Nt(t), p = u !== null && u.type === Zt;
      if (hs.hasOwnProperty(r)) {
        var v = hs[r];
        if (v !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Tn[t] = !0, !0;
      } else if (!p && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Tn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Tn[t] = !0, !0) : p ? !0 : yt(t, n, u, !1) ? (Tn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === wt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Tn[t] = !0), !0);
    };
  }
  var iS = function(e, t, n) {
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
  function lS(e, t, n) {
    Ni(e, t) || iS(e, t, n);
  }
  var ah = 1, Af = 2, So = 4, oS = ah | Af | So, xo = null;
  function uS(e) {
    xo !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), xo = e;
  }
  function sS() {
    xo === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), xo = null;
  }
  function cS(e) {
    return e === xo;
  }
  function Vf(e) {
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
  function fS(e) {
    kf = e;
  }
  function ih(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function dS() {
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
  function pS() {
    var e = dS();
    e && (uh(), lh());
  }
  function sh(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return oh(e, t, n);
    } finally {
      Uf = !1, pS();
    }
  }
  function mS(e, t, n) {
    oh = e, uh = n;
  }
  function vS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function hS(e, t, n) {
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
        return !!(n.disabled && vS(t));
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
    if (hS(t, e.type, a))
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
      var v = document.createEvent("Event"), S = !1, E = !0, O = window.event, M = Object.getOwnPropertyDescriptor(window, "event");
      function F() {
        Ff.removeEventListener(H, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var te = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        S = !0, F(), n.apply(a, te), E = !1;
      }
      var pe, qe = !1, Be = !1;
      function j(w) {
        if (pe = w.error, qe = !0, pe === null && w.colno === 0 && w.lineno === 0 && (Be = !0), w.defaultPrevented && pe != null && typeof pe == "object")
          try {
            pe._suppressLogging = !0;
          } catch {
          }
      }
      var H = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), Ff.addEventListener(H, Ee, !1), v.initEvent(H, !1, !1), Ff.dispatchEvent(v), M && Object.defineProperty(window, "event", M), S && E && (qe ? Be && (pe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : pe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(pe)), window.removeEventListener("error", j), !S)
        return F(), ch.apply(this, arguments);
    };
  }
  var gS = fh, sl = !1, gs = null, ys = !1, Hf = null, yS = {
    onError: function(e) {
      sl = !0, gs = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, o, u) {
    sl = !1, gs = null, gS.apply(yS, arguments);
  }
  function bS(e, t, n, a, r, i, l, o, u) {
    if (Bf.apply(this, arguments), sl) {
      var p = Pf();
      ys || (ys = !0, Hf = p);
    }
  }
  function NS() {
    if (ys) {
      var e = Hf;
      throw ys = !1, Hf = null, e;
    }
  }
  function ES() {
    return sl;
  }
  function Pf() {
    if (sl) {
      var e = gs;
      return sl = !1, gs = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function cl(e) {
    return e._reactInternals;
  }
  function SS(e) {
    return e._reactInternals !== void 0;
  }
  function xS(e, t) {
    e._reactInternals = t;
  }
  var Ce = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), Tt = (
    /*                    */
    2
  ), Xe = (
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
  ), Je = (
    /*                   */
    128
  ), cr = (
    /*            */
    256
  ), Si = (
    /*                          */
    512
  ), dl = (
    /*                     */
    1024
  ), Vr = (
    /*                      */
    2048
  ), fr = (
    /*                    */
    4096
  ), xi = (
    /*                   */
    8192
  ), $f = (
    /*             */
    16384
  ), RS = (
    /*               */
    32767
  ), bs = (
    /*                   */
    32768
  ), jn = (
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
    Xe | dl | 0
  ), Qf = Tt | Xe | Ei | Do | Si | fr | xi, To = Xe | dh | Si | xi, pl = Vr | Ei, dr = Ri | qf | If, CS = h.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Tt | fr)) !== Ce && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function mh(e) {
    if (e.tag === B) {
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
    return e.tag === x ? e.stateNode.containerInfo : null;
  }
  function DS(e) {
    return Ci(e) === e;
  }
  function TS(e) {
    {
      var t = CS.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Me(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = cl(e);
    return r ? Ci(r) === r : !1;
  }
  function hh(e) {
    if (Ci(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function gh(e) {
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
    if (a.tag !== x)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function yh(e) {
    var t = gh(e);
    return t !== null ? bh(t) : null;
  }
  function bh(e) {
    if (e.tag === V || e.tag === K)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = bh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function jS(e) {
    var t = gh(e);
    return t !== null ? Nh(t) : null;
  }
  function Nh(e) {
    if (e.tag === V || e.tag === K)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== A) {
        var n = Nh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Eh = m.unstable_scheduleCallback, wS = m.unstable_cancelCallback, _S = m.unstable_shouldYield, OS = m.unstable_requestPaint, It = m.unstable_now, LS = m.unstable_getCurrentPriorityLevel, Ns = m.unstable_ImmediatePriority, Kf = m.unstable_UserBlockingPriority, Di = m.unstable_NormalPriority, MS = m.unstable_LowPriority, Xf = m.unstable_IdlePriority, AS = m.unstable_yieldValue, VS = m.unstable_setDisableYieldValue, ml = null, mn = null, ie = null, Ba = !1, Ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function kS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = Fe({}, e, {
        getLaneLabelMap: PS,
        injectProfilingHooks: BS
      })), ml = t.inject(e), mn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function US(e, t) {
    if (mn && typeof mn.onScheduleFiberRoot == "function")
      try {
        mn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function zS(e, t) {
    if (mn && typeof mn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Je) === Je;
        if (En) {
          var a;
          switch (t) {
            case Wn:
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
  function FS(e) {
    if (mn && typeof mn.onPostCommitFiberRoot == "function")
      try {
        mn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function HS(e) {
    if (mn && typeof mn.onCommitFiberUnmount == "function")
      try {
        mn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function qt(e) {
    if (typeof AS == "function" && (VS(e), g(e)), mn && typeof mn.setStrictMode == "function")
      try {
        mn.setStrictMode(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function BS(e) {
    ie = e;
  }
  function PS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Zf; n++) {
        var a = ux(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function $S(e) {
    ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
  }
  function Sh() {
    ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
  }
  function jo(e) {
    ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
  }
  function vl() {
    ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
  }
  function YS(e) {
    ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
  }
  function IS() {
    ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
  }
  function qS(e) {
    ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
  }
  function GS() {
    ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
  }
  function WS(e) {
    ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
  }
  function QS() {
    ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
  }
  function xh(e) {
    ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
  }
  function Rh() {
    ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
  }
  function KS(e, t, n) {
    ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, n);
  }
  function XS(e, t, n) {
    ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, n);
  }
  function JS(e) {
    ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
  }
  function ZS() {
    ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
  }
  function ex(e) {
    ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
  }
  function tx() {
    ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
  }
  function Ch(e) {
    ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
  }
  function nx() {
    ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
  }
  function Dh() {
    ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
  }
  function ax(e) {
    ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
  }
  function rx(e, t) {
    ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
  }
  function Jf(e, t) {
    ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
  }
  var xe = (
    /*                         */
    0
  ), Ye = (
    /*                 */
    1
  ), nt = (
    /*                    */
    2
  ), St = (
    /*               */
    8
  ), Pa = (
    /*              */
    16
  ), Th = Math.clz32 ? Math.clz32 : ox, ix = Math.log, lx = Math.LN2;
  function ox(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (ix(t) / lx | 0) | 0;
  }
  var Zf = 31, I = (
    /*                        */
    0
  ), Gt = (
    /*                          */
    0
  ), je = (
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
  ), gl = (
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
  ), yl = (
    /*                             */
    4194304
  ), vd = (
    /*                             */
    8388608
  ), hd = (
    /*                             */
    16777216
  ), gd = (
    /*                             */
    33554432
  ), yd = (
    /*                             */
    67108864
  ), jh = yl, Oo = (
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
  ), qn = (
    /*                   */
    1073741824
  );
  function ux(e) {
    {
      if (e & je)
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
      if (e & gl)
        return "Transition";
      if (e & Es)
        return "Retry";
      if (e & Oo)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & ji)
        return "Idle";
      if (e & qn)
        return "Offscreen";
    }
  }
  var st = -1, Ss = _o, xs = yl;
  function Mo(e) {
    switch (wi(e)) {
      case je:
        return je;
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
        return e & gl;
      case yl:
      case vd:
      case hd:
      case gd:
      case yd:
        return e & Es;
      case Oo:
        return Oo;
      case Lo:
        return Lo;
      case ji:
        return ji;
      case qn:
        return qn;
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
        a = Mo(o);
      else {
        var u = l & i;
        u !== I && (a = Mo(u));
      }
    } else {
      var p = n & ~r;
      p !== I ? a = Mo(p) : i !== I && (a = Mo(i));
    }
    if (a === I)
      return I;
    if (t !== I && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === I) {
      var v = wi(a), S = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= S || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === $a && (S & gl) !== I
      )
        return t;
    }
    (a & pr) !== I && (a |= n & $a);
    var E = e.entangledLanes;
    if (E !== I)
      for (var O = e.entanglements, M = a & E; M > 0; ) {
        var F = _i(M), te = 1 << F;
        a |= O[F], M &= ~te;
      }
    return a;
  }
  function sx(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function cx(e, t) {
    switch (e) {
      case je:
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
      case yl:
      case vd:
      case hd:
      case gd:
      case yd:
        return st;
      case Oo:
      case Lo:
      case ji:
      case qn:
        return st;
      default:
        return f("Should have found matching lanes. This is a bug in React."), st;
    }
  }
  function fx(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o, p = i[o];
      p === st ? ((u & a) === I || (u & r) !== I) && (i[o] = cx(u, t)) : p <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function dx(e) {
    return Mo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~qn;
    return t !== I ? t : t & qn ? qn : I;
  }
  function px(e) {
    return (e & je) !== I;
  }
  function Nd(e) {
    return (e & wh) !== I;
  }
  function _h(e) {
    return (e & Es) === e;
  }
  function mx(e) {
    var t = je | pr | $a;
    return (e & t) === I;
  }
  function vx(e) {
    return (e & gl) === e;
  }
  function Cs(e, t) {
    var n = hl | pr | Ti | $a;
    return (t & n) !== I;
  }
  function hx(e, t) {
    return (t & e.expiredLanes) !== I;
  }
  function Oh(e) {
    return (e & gl) !== I;
  }
  function Lh() {
    var e = Ss;
    return Ss <<= 1, (Ss & gl) === I && (Ss = _o), e;
  }
  function gx() {
    var e = xs;
    return xs <<= 1, (xs & Es) === I && (xs = yl), e;
  }
  function wi(e) {
    return e & -e;
  }
  function Ao(e) {
    return wi(e);
  }
  function _i(e) {
    return 31 - Th(e);
  }
  function Ed(e) {
    return _i(e);
  }
  function Gn(e, t) {
    return (e & t) !== I;
  }
  function bl(e, t) {
    return (e & t) === t;
  }
  function ke(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Mh(e, t) {
    return e & t;
  }
  function E_(e) {
    return e;
  }
  function yx(e, t) {
    return e !== Gt && e < t ? e : t;
  }
  function Sd(e) {
    for (var t = [], n = 0; n < Zf; n++)
      t.push(e);
    return t;
  }
  function Vo(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = I, e.pingedLanes = I);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function bx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function Ah(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function Nx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = I, e.pingedLanes = I, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o;
      a[o] = I, r[o] = st, i[o] = st, l &= ~u;
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
  function Ex(e, t) {
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
      case yl:
      case vd:
      case hd:
      case gd:
      case yd:
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
  function Vh(e, t, n) {
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
  var Wn = je, mr = pr, vr = $a, Ts = ji, ko = Gt;
  function Sa() {
    return ko;
  }
  function Wt(e) {
    ko = e;
  }
  function Sx(e, t) {
    var n = ko;
    try {
      return ko = e, t();
    } finally {
      ko = n;
    }
  }
  function xx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function Rx(e, t) {
    return e > t ? e : t;
  }
  function Rd(e, t) {
    return e !== 0 && e < t;
  }
  function zh(e) {
    var t = wi(e);
    return Rd(Wn, t) ? Rd(mr, t) ? Nd(t) ? vr : Ts : mr : Wn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Fh;
  function Cx(e) {
    Fh = e;
  }
  function Dx(e) {
    Fh(e);
  }
  var Cd;
  function Tx(e) {
    Cd = e;
  }
  var Hh;
  function jx(e) {
    Hh = e;
  }
  var Bh;
  function wx(e) {
    Bh = e;
  }
  var Ph;
  function _x(e) {
    Ph = e;
  }
  var Dd = !1, ws = [], Ur = null, zr = null, Fr = null, Uo = /* @__PURE__ */ new Map(), zo = /* @__PURE__ */ new Map(), Hr = [], Ox = [
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
  function Lx(e) {
    return Ox.indexOf(e) > -1;
  }
  function Mx(e, t, n, a, r) {
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
      var l = Mx(t, n, a, r, i);
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
  function Ax(e, t, n, a, r) {
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
        var v = r, S = v.pointerId;
        return zo.set(S, Fo(zo.get(S) || null, e, t, n, a, v)), !0;
      }
    }
    return !1;
  }
  function Yh(e) {
    var t = Mi(e.target);
    if (t !== null) {
      var n = Ci(t);
      if (n !== null) {
        var a = n.tag;
        if (a === B) {
          var r = mh(n);
          if (r !== null) {
            e.blockedOn = r, Ph(e.priority, function() {
              Hh(n);
            });
            return;
          }
        } else if (a === x) {
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
  function Vx(e) {
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
        uS(i), r.target.dispatchEvent(i), sS();
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
  function kx() {
    Dd = !1, Ur !== null && _s(Ur) && (Ur = null), zr !== null && _s(zr) && (zr = null), Fr !== null && _s(Fr) && (Fr = null), Uo.forEach(Ih), zo.forEach(Ih);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, kx)));
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
  function Ux() {
    return Td;
  }
  function zx(e, t, n) {
    var a = Gh(t), r;
    switch (a) {
      case Wn:
        r = Fx;
        break;
      case mr:
        r = Hx;
        break;
      case vr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function Fx(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Wt(Wn), jd(e, t, n, a);
    } finally {
      Wt(r), Nl.transition = i;
    }
  }
  function Hx(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Wt(mr), jd(e, t, n, a);
    } finally {
      Wt(r), Nl.transition = i;
    }
  }
  function jd(e, t, n, a) {
    Td && Bx(e, t, n, a);
  }
  function Bx(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      $d(e, t, a, Os, n), $h(e, a);
      return;
    }
    if (Ax(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if ($h(e, a), t & So && Lx(e)) {
      for (; r !== null; ) {
        var i = $r(r);
        i !== null && Dx(i);
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
    var r = Vf(a), i = Mi(r);
    if (i !== null) {
      var l = Ci(i);
      if (l === null)
        i = null;
      else {
        var o = l.tag;
        if (o === B) {
          var u = mh(l);
          if (u !== null)
            return u;
          i = null;
        } else if (o === x) {
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
        return Wn;
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
        var t = LS();
        switch (t) {
          case Ns:
            return Wn;
          case Kf:
            return mr;
          case Di:
          case MS:
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
  function Px(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function $x(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function Yx(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function Ix(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Po = null, _d = null, $o = null;
  function qx(e) {
    return Po = e, _d = Qh(), !0;
  }
  function Gx() {
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
  function Ms() {
    return !0;
  }
  function Kh() {
    return !1;
  }
  function Qn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var o in e)
        if (e.hasOwnProperty(o)) {
          var u = e[o];
          u ? this[o] = u(i) : this[o] = i[o];
        }
      var p = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return p ? this.isDefaultPrevented = Ms : this.isDefaultPrevented = Kh, this.isPropagationStopped = Kh, this;
    }
    return Fe(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ms);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ms);
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
      isPersistent: Ms
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
  }, Od = Qn(El), Yo = Fe({}, El, {
    view: 0,
    detail: 0
  }), Wx = Qn(Yo), Ld, Md, Io;
  function Qx(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Ld = e.screenX - Io.screenX, Md = e.screenY - Io.screenY) : (Ld = 0, Md = 0), Io = e);
  }
  var As = Fe({}, Yo, {
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
    getModifierState: Vd,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (Qx(e), Ld);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Md;
    }
  }), Xh = Qn(As), Kx = Fe({}, As, {
    dataTransfer: 0
  }), Xx = Qn(Kx), Jx = Fe({}, Yo, {
    relatedTarget: 0
  }), Ad = Qn(Jx), Zx = Fe({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eR = Qn(Zx), tR = Fe({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), nR = Qn(tR), aR = Fe({}, El, {
    data: 0
  }), Jh = Qn(aR), rR = Jh, iR = {
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
  }, lR = {
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
  function oR(e) {
    if (e.key) {
      var t = iR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ls(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? lR[e.keyCode] || "Unidentified" : "";
  }
  var uR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function sR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = uR[e];
    return a ? !!n[a] : !1;
  }
  function Vd(e) {
    return sR;
  }
  var cR = Fe({}, Yo, {
    key: oR,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Vd,
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
  }), fR = Qn(cR), dR = Fe({}, As, {
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
  }), Zh = Qn(dR), pR = Fe({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vd
  }), mR = Qn(pR), vR = Fe({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hR = Qn(vR), gR = Fe({}, As, {
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
  }), yR = Qn(gR), bR = [9, 13, 27, 32], eg = 229, kd = Jt && "CompositionEvent" in window, qo = null;
  Jt && "documentMode" in document && (qo = document.documentMode);
  var NR = Jt && "TextEvent" in window && !qo, tg = Jt && (!kd || qo && qo > 8 && qo <= 11), ng = 32, ag = String.fromCharCode(ng);
  function ER() {
    Kt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Kt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Kt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Kt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var rg = !1;
  function SR(e) {
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
  function RR(e, t) {
    return e === "keydown" && t.keyCode === eg;
  }
  function ig(e, t) {
    switch (e) {
      case "keyup":
        return bR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== eg;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function lg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function og(e) {
    return e.locale === "ko";
  }
  var Sl = !1;
  function CR(e, t, n, a, r) {
    var i, l;
    if (kd ? i = xR(t) : Sl ? ig(t, a) && (i = "onCompositionEnd") : RR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    tg && !og(a) && (!Sl && i === "onCompositionStart" ? Sl = qx(r) : i === "onCompositionEnd" && Sl && (l = Wh()));
    var o = Fs(n, i);
    if (o.length > 0) {
      var u = new Jh(i, t, null, a, r);
      if (e.push({
        event: u,
        listeners: o
      }), l)
        u.data = l;
      else {
        var p = lg(a);
        p !== null && (u.data = p);
      }
    }
  }
  function DR(e, t) {
    switch (e) {
      case "compositionend":
        return lg(t);
      case "keypress":
        var n = t.which;
        return n !== ng ? null : (rg = !0, ag);
      case "textInput":
        var a = t.data;
        return a === ag && rg ? null : a;
      default:
        return null;
    }
  }
  function TR(e, t) {
    if (Sl) {
      if (e === "compositionend" || !kd && ig(e, t)) {
        var n = Wh();
        return Gx(), Sl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!SR(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return tg && !og(t) ? null : t.data;
      default:
        return null;
    }
  }
  function jR(e, t, n, a, r) {
    var i;
    if (NR ? i = DR(t, a) : i = TR(t, a), !i)
      return null;
    var l = Fs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new rR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function wR(e, t, n, a, r, i, l) {
    CR(e, t, n, a, r), jR(e, t, n, a, r);
  }
  var _R = {
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
  function ug(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!_R[e.type] : t === "textarea";
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
  function OR(e) {
    if (!Jt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function LR() {
    Kt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function sg(e, t, n, a) {
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
  function MR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function AR(e) {
    var t = [];
    sg(t, Wo, e, Vf(e)), sh(VR, t);
  }
  function VR(e) {
    Tg(e, 0);
  }
  function Vs(e) {
    var t = jl(e);
    if (ho(t))
      return e;
  }
  function kR(e, t) {
    if (e === "change")
      return t;
  }
  var cg = !1;
  Jt && (cg = OR("input") && (!document.documentMode || document.documentMode > 9));
  function UR(e, t) {
    Go = e, Wo = t, Go.attachEvent("onpropertychange", dg);
  }
  function fg() {
    Go && (Go.detachEvent("onpropertychange", dg), Go = null, Wo = null);
  }
  function dg(e) {
    e.propertyName === "value" && Vs(Wo) && AR(e);
  }
  function zR(e, t, n) {
    e === "focusin" ? (fg(), UR(t, n)) : e === "focusout" && fg();
  }
  function FR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vs(Wo);
  }
  function HR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function BR(e, t) {
    if (e === "click")
      return Vs(t);
  }
  function PR(e, t) {
    if (e === "input" || e === "change")
      return Vs(t);
  }
  function $R(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function YR(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window, u, p;
    if (MR(o) ? u = kR : ug(o) ? cg ? u = PR : (u = FR, p = zR) : HR(o) && (u = BR), u) {
      var v = u(t, n);
      if (v) {
        sg(e, v, a, r);
        return;
      }
    }
    p && p(t, o, n), t === "focusout" && $R(o);
  }
  function IR() {
    Xt("onMouseEnter", ["mouseout", "mouseover"]), Xt("onMouseLeave", ["mouseout", "mouseover"]), Xt("onPointerEnter", ["pointerout", "pointerover"]), Xt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function qR(e, t, n, a, r, i, l) {
    var o = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (o && !cS(a)) {
      var p = a.relatedTarget || a.fromElement;
      if (p && (Mi(p) || su(p)))
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
      var E, O;
      if (u) {
        var M = a.relatedTarget || a.toElement;
        if (E = n, O = M ? Mi(M) : null, O !== null) {
          var F = Ci(O);
          (O !== F || O.tag !== V && O.tag !== K) && (O = null);
        }
      } else
        E = null, O = n;
      if (E !== O) {
        var te = Xh, Ee = "onMouseLeave", pe = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (te = Zh, Ee = "onPointerLeave", pe = "onPointerEnter", qe = "pointer");
        var Be = E == null ? v : jl(E), j = O == null ? v : jl(O), H = new te(Ee, qe + "leave", E, a, r);
        H.target = Be, H.relatedTarget = j;
        var w = null, Q = Mi(r);
        if (Q === n) {
          var oe = new te(pe, qe + "enter", O, a, r);
          oe.target = j, oe.relatedTarget = Be, w = oe;
        }
        hC(e, H, w, E, O);
      }
    }
  }
  function GR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Kn = typeof Object.is == "function" ? Object.is : GR;
  function Qo(e, t) {
    if (Kn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!An.call(t, i) || !Kn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function pg(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function WR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function mg(e, t) {
    for (var n = pg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === ur) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = pg(WR(n));
    }
  }
  function QR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, o = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return KR(e, r, i, l, o);
  }
  function KR(e, t, n, a, r) {
    var i = 0, l = -1, o = -1, u = 0, p = 0, v = e, S = null;
    e: for (; ; ) {
      for (var E = null; v === t && (n === 0 || v.nodeType === ur) && (l = i + n), v === a && (r === 0 || v.nodeType === ur) && (o = i + r), v.nodeType === ur && (i += v.nodeValue.length), (E = v.firstChild) !== null; )
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
  function XR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), o = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > o) {
        var u = o;
        o = l, l = u;
      }
      var p = mg(e, l), v = mg(e, o);
      if (p && v) {
        if (r.rangeCount === 1 && r.anchorNode === p.node && r.anchorOffset === p.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var S = n.createRange();
        S.setStart(p.node, p.offset), r.removeAllRanges(), l > o ? (r.addRange(S), r.extend(v.node, v.offset)) : (S.setEnd(v.node, v.offset), r.addRange(S));
      }
    }
  }
  function vg(e) {
    return e && e.nodeType === ur;
  }
  function hg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : vg(e) ? !1 : vg(t) ? hg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function JR(e) {
    return e && e.ownerDocument && hg(e.ownerDocument.documentElement, e);
  }
  function ZR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function gg() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (ZR(t))
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
  function eC() {
    var e = gg();
    return {
      focusedElem: e,
      selectionRange: Ud(e) ? nC(e) : null
    };
  }
  function tC(e) {
    var t = gg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && JR(n)) {
      a !== null && Ud(n) && aC(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === Un && r.push({
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
  function nC(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = QR(e), t || {
      start: 0,
      end: 0
    };
  }
  function aC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : XR(e, t);
  }
  var rC = Jt && "documentMode" in document && document.documentMode <= 11;
  function iC() {
    Kt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var xl = null, zd = null, Ko = null, Fd = !1;
  function lC(e) {
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
  function oC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function yg(e, t, n) {
    var a = oC(n);
    if (!(Fd || xl == null || xl !== ir(a))) {
      var r = lC(xl);
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
  function uC(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (ug(o) || o.contentEditable === "true") && (xl = o, zd = n, Ko = null);
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
        Fd = !1, yg(e, a, r);
        break;
      case "selectionchange":
        if (rC)
          break;
      case "keydown":
      case "keyup":
        yg(e, a, r);
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
  }, Hd = {}, bg = {};
  Jt && (bg = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
  function Us(e) {
    if (Hd[e])
      return Hd[e];
    if (!Rl[e])
      return e;
    var t = Rl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in bg)
        return Hd[e] = t[n];
    return e;
  }
  var Ng = Us("animationend"), Eg = Us("animationiteration"), Sg = Us("animationstart"), xg = Us("transitionend"), Rg = /* @__PURE__ */ new Map(), Cg = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Br(e, t) {
    Rg.set(e, t), Kt(t, [e]);
  }
  function sC() {
    for (var e = 0; e < Cg.length; e++) {
      var t = Cg[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Br(n, "on" + a);
    }
    Br(Ng, "onAnimationEnd"), Br(Eg, "onAnimationIteration"), Br(Sg, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(xg, "onTransitionEnd");
  }
  function cC(e, t, n, a, r, i, l) {
    var o = Rg.get(t);
    if (o !== void 0) {
      var u = Od, p = t;
      switch (t) {
        case "keypress":
          if (Ls(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = fR;
          break;
        case "focusin":
          p = "focus", u = Ad;
          break;
        case "focusout":
          p = "blur", u = Ad;
          break;
        case "beforeblur":
        case "afterblur":
          u = Ad;
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
          u = Xx;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = mR;
          break;
        case Ng:
        case Eg:
        case Sg:
          u = eR;
          break;
        case xg:
          u = hR;
          break;
        case "scroll":
          u = Wx;
          break;
        case "wheel":
          u = yR;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = nR;
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
      var v = (i & So) !== 0;
      {
        var S = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", E = mC(n, o, a.type, v, S);
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
  sC(), IR(), LR(), iC(), ER();
  function fC(e, t, n, a, r, i, l) {
    cC(e, t, n, a, r, i);
    var o = (i & oS) === 0;
    o && (qR(e, t, n, a, r), YR(e, t, n, a, r), uC(e, t, n, a, r), wR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function Dg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, bS(a, t, void 0, e), e.currentTarget = null;
  }
  function dC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, o = i.currentTarget, u = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Dg(e, u, o), a = l;
      }
    else
      for (var p = 0; p < t.length; p++) {
        var v = t[p], S = v.instance, E = v.currentTarget, O = v.listener;
        if (S !== a && e.isPropagationStopped())
          return;
        Dg(e, O, E), a = S;
      }
  }
  function Tg(e, t) {
    for (var n = (t & So) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      dC(i, l, n);
    }
    NS();
  }
  function pC(e, t, n, a, r) {
    var i = Vf(n), l = [];
    fC(l, e, a, n, i, t), Tg(l, t);
  }
  function pt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = $0(t), r = gC(e);
    a.has(r) || (jg(t, e, Af, n), a.add(r));
  }
  function Pd(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= So), jg(n, e, a, t);
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
  function jg(e, t, n, a, r) {
    var i = zx(e, t, n), l = void 0;
    zf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? Yx(e, t, i, l) : $x(e, t, i) : l !== void 0 ? Ix(e, t, i, l) : Px(e, t, i);
  }
  function wg(e, t) {
    return e === t || e.nodeType === Dt && e.parentNode === t;
  }
  function $d(e, t, n, a, r) {
    var i = a;
    if (!(t & ah) && !(t & Af)) {
      var l = r;
      if (a !== null) {
        var o = a;
        e: for (; ; ) {
          if (o === null)
            return;
          var u = o.tag;
          if (u === x || u === A) {
            var p = o.stateNode.containerInfo;
            if (wg(p, l))
              break;
            if (u === A)
              for (var v = o.return; v !== null; ) {
                var S = v.tag;
                if (S === x || S === A) {
                  var E = v.stateNode.containerInfo;
                  if (wg(E, l))
                    return;
                }
                v = v.return;
              }
            for (; p !== null; ) {
              var O = Mi(p);
              if (O === null)
                return;
              var M = O.tag;
              if (M === V || M === K) {
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
      return pC(e, t, n, i);
    });
  }
  function Zo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function mC(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, o = a ? l : t, u = [], p = e, v = null; p !== null; ) {
      var S = p, E = S.stateNode, O = S.tag;
      if (O === V && E !== null && (v = E, o !== null)) {
        var M = Ro(p, o);
        M != null && u.push(Zo(p, M, v));
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
      if (o === V && l !== null) {
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
    while (e && e.tag !== V);
    return e || null;
  }
  function vC(e, t) {
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
  function _g(e, t, n, a, r) {
    for (var i = t._reactName, l = [], o = n; o !== null && o !== a; ) {
      var u = o, p = u.alternate, v = u.stateNode, S = u.tag;
      if (p !== null && p === a)
        break;
      if (S === V && v !== null) {
        var E = v;
        if (r) {
          var O = Ro(o, i);
          O != null && l.unshift(Zo(o, O, E));
        } else if (!r) {
          var M = Ro(o, i);
          M != null && l.push(Zo(o, M, E));
        }
      }
      o = o.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function hC(e, t, n, a, r) {
    var i = a && r ? vC(a, r) : null;
    a !== null && _g(e, t, a, i, !1), r !== null && n !== null && _g(e, n, r, i, !0);
  }
  function gC(e, t) {
    return e + "__bubble";
  }
  var zn = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Pr = "suppressHydrationWarning", Og = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Lg, $s, Mg, Ag;
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
    eS(e, t), tS(e, t), lS(e, t, {
      registrationNameDependencies: Qt,
      possibleRegistrationNames: Yn
    });
  }, Mg = Jt && !document.documentMode, tu = function(e, t, n) {
    if (!zn) {
      var a = Ys(n), r = Ys(t);
      r !== a && (zn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Lg = function(e) {
    if (!zn) {
      zn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, $s = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Ag = function(e, t) {
    var n = e.namespaceURI === or ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var yC = /\r\n?/g, bC = /\u0000|\uFFFD/g;
  function Ys(e) {
    Vn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(yC, `
`).replace(bC, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (zn || (zn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Vg(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function NC() {
  }
  function qs(e) {
    e.onclick = NC;
  }
  function EC(e, t, n, a, r) {
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
        else i === Hs || i === Pr || i === Og || (Qt.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && pt("scroll", t)) : l != null && ga(t, i, l, r));
      }
  }
  function SC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Xv(e, l) : i === eu ? qv(e, l) : i === Oi ? vs(e, l) : ga(e, i, l, a);
    }
  }
  function xC(e, t, n, a) {
    var r, i = Vg(n), l, o = a;
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
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !An.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function RC(e, t) {
    return Vg(t).createTextNode(e);
  }
  function CC(e, t, n, a) {
    var r = Ni(t, n);
    Ps(t, n);
    var i;
    switch (t) {
      case "dialog":
        pt("cancel", e), pt("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        pt("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < Xo.length; l++)
          pt(Xo[l], e);
        i = n;
        break;
      case "source":
        pt("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        pt("error", e), pt("load", e), i = n;
        break;
      case "details":
        pt("toggle", e), i = n;
        break;
      case "input":
        ds(e, n), i = go(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n), i = n;
        break;
      case "select":
        No(e, n), i = bo(e, n), pt("invalid", e);
        break;
      case "textarea":
        $v(e, n), i = Df(e, n), pt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Mf(t, i), EC(t, e, a, i, r), t) {
      case "input":
        yi(e), L(e, n, !1);
        break;
      case "textarea":
        yi(e), Iv(e);
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
  function DC(e, t, n, a, r) {
    Ps(t, a);
    var i = null, l, o;
    switch (t) {
      case "input":
        l = go(e, n), o = go(e, a), i = [];
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
    Mf(t, o);
    var u, p, v = null;
    for (u in l)
      if (!(o.hasOwnProperty(u) || !l.hasOwnProperty(u) || l[u] == null))
        if (u === Li) {
          var S = l[u];
          for (p in S)
            S.hasOwnProperty(p) && (v || (v = {}), v[p] = "");
        } else u === eu || u === Oi || u === Hs || u === Pr || u === Og || (Qt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
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
          var M = E ? E[Bs] : void 0, F = O ? O[Bs] : void 0;
          M != null && F !== M && (i = i || []).push(u, M);
        } else u === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(u, "" + E) : u === Hs || u === Pr || (Qt.hasOwnProperty(u) ? (E != null && (typeof E != "function" && $s(u, E), u === "onScroll" && pt("scroll", e)), !i && O !== E && (i = [])) : (i = i || []).push(u, E));
    }
    return v && (qE(v, o[Li]), (i = i || []).push(Li, v)), i;
  }
  function TC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && c(e, r);
    var i = Ni(n, a), l = Ni(n, r);
    switch (SC(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        Yv(e, r);
        break;
      case "select":
        ps(e, r);
        break;
    }
  }
  function jC(e) {
    {
      var t = e.toLowerCase();
      return hs.hasOwnProperty(t) && hs[t] || null;
    }
  }
  function wC(e, t, n, a, r, i, l) {
    var o, u;
    switch (o = Ni(t, n), Ps(t, n), t) {
      case "dialog":
        pt("cancel", e), pt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        pt("load", e);
        break;
      case "video":
      case "audio":
        for (var p = 0; p < Xo.length; p++)
          pt(Xo[p], e);
        break;
      case "source":
        pt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        pt("error", e), pt("load", e);
        break;
      case "details":
        pt("toggle", e);
        break;
      case "input":
        ds(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n);
        break;
      case "select":
        No(e, n), pt("invalid", e);
        break;
      case "textarea":
        $v(e, n), pt("invalid", e);
        break;
    }
    Mf(t, n);
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
    var O = null;
    for (var M in n)
      if (n.hasOwnProperty(M)) {
        var F = n[M];
        if (M === Oi)
          typeof F == "string" ? e.textContent !== F && (n[Pr] !== !0 && Is(e.textContent, F, i, l), O = [Oi, F]) : typeof F == "number" && e.textContent !== "" + F && (n[Pr] !== !0 && Is(e.textContent, F, i, l), O = [Oi, "" + F]);
        else if (Qt.hasOwnProperty(M))
          F != null && (typeof F != "function" && $s(M, F), M === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var te = void 0, Ee = Nt(M);
          if (n[Pr] !== !0) {
            if (!(M === Hs || M === Pr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            M === "value" || M === "checked" || M === "selected")) {
              if (M === eu) {
                var pe = e.innerHTML, qe = F ? F[Bs] : void 0;
                if (qe != null) {
                  var Be = Ag(e, qe);
                  Be !== pe && tu(M, pe, Be);
                }
              } else if (M === Li) {
                if (u.delete(M), Mg) {
                  var j = YE(F);
                  te = e.getAttribute("style"), j !== te && tu(M, te, j);
                }
              } else if (o && !$n)
                u.delete(M.toLowerCase()), te = ci(e, M, F), F !== te && tu(M, te, F);
              else if (!gt(M, Ee, o) && !dn(M, F, Ee, o)) {
                var H = !1;
                if (Ee !== null)
                  u.delete(Ee.attributeName), te = Xi(e, M, F, Ee);
                else {
                  var w = a;
                  if (w === or && (w = jf(t)), w === or)
                    u.delete(M.toLowerCase());
                  else {
                    var Q = jC(M);
                    Q !== null && Q !== M && (H = !0, u.delete(Q)), u.delete(M);
                  }
                  te = ci(e, M, F);
                }
                var oe = $n;
                !oe && F !== te && !H && tu(M, te, F);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Pr] !== !0 && Lg(u), t) {
      case "input":
        yi(e), L(e, n, !0);
        break;
      case "textarea":
        yi(e), Iv(e);
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
  function _C(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Id(e, t) {
    {
      if (zn)
        return;
      zn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function qd(e, t) {
    {
      if (zn)
        return;
      zn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t, n) {
    {
      if (zn)
        return;
      zn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Wd(e, t) {
    {
      if (t === "" || zn)
        return;
      zn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function OC(e, t, n) {
    switch (t) {
      case "input":
        z(e, n);
        return;
      case "textarea":
        CE(e, n);
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
    var LC = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], kg = [
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
    ], MC = kg.concat(["button"]), AC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Ug = {
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
      var n = Fe({}, e || Ug), a = {
        tag: t
      };
      return kg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), MC.indexOf(t) !== -1 && (n.pTagInButtonScope = null), LC.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var VC = function(e, t) {
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
          return AC.indexOf(t) === -1;
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
    }, kC = function(e, t) {
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
    }, zg = {};
    nu = function(e, t, n) {
      n = n || Ug;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = VC(e, r) ? null : a, l = i ? null : kC(e, n), o = i || l;
      if (o) {
        var u = o.tag, p = !!i + "|" + e + "|" + u;
        if (!zg[p]) {
          zg[p] = !0;
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
  var Gs = "suppressHydrationWarning", Ws = "$", Qs = "/$", ru = "$?", iu = "$!", UC = "style", Qd = null, Kd = null;
  function zC(e) {
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
        var i = a === Dt ? e.parentNode : e, l = i.namespaceURI || null;
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
  function S_(e) {
    return e;
  }
  function HC(e) {
    Qd = Ux(), Kd = eC();
    var t = null;
    return qh(!1), t;
  }
  function BC(e) {
    tC(Kd), qh(Qd), Qd = null, Kd = null;
  }
  function PC(e, t, n, a, r) {
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
  function $C(e, t) {
    e.appendChild(t);
  }
  function YC(e, t, n, a, r) {
    switch (CC(e, t, n, a), t) {
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
  function IC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var o = "" + a.children, u = au(l.ancestorInfo, t);
        nu(null, o, u);
      }
    }
    return DC(e, t, n, a);
  }
  function Xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function qC(e, t, n, a) {
    {
      var r = n;
      nu(null, e, r.ancestorInfo);
    }
    var i = RC(e, t);
    return uu(a, i), i;
  }
  function GC() {
    var e = window.event;
    return e === void 0 ? vr : Gh(e.type);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, WC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, Fg = typeof Promise == "function" ? Promise : void 0, QC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fg < "u" ? function(e) {
    return Fg.resolve(null).then(e).catch(KC);
  } : Jd;
  function KC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function XC(e, t, n, a) {
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
  function JC(e, t, n, a, r, i) {
    TC(e, t, n, a, r), rp(e, r);
  }
  function Hg(e) {
    vs(e, "");
  }
  function ZC(e, t, n) {
    e.nodeValue = n;
  }
  function e0(e, t) {
    e.appendChild(t);
  }
  function t0(e, t) {
    var n;
    e.nodeType === Dt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function n0(e, t, n) {
    e.insertBefore(t, n);
  }
  function a0(e, t, n) {
    e.nodeType === Dt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function r0(e, t) {
    e.removeChild(t);
  }
  function i0(e, t) {
    e.nodeType === Dt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ep(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Dt) {
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
  function l0(e, t) {
    e.nodeType === Dt ? ep(e.parentNode, t) : e.nodeType === Un && ep(e, t), Bo(e);
  }
  function o0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function u0(e) {
    e.nodeValue = "";
  }
  function s0(e, t) {
    e = e;
    var n = t[UC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Of("display", a);
  }
  function c0(e, t) {
    e.nodeValue = t;
  }
  function f0(e) {
    e.nodeType === Un ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function d0(e, t, n) {
    return e.nodeType !== Un || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function p0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function m0(e) {
    return e.nodeType !== Dt ? null : e;
  }
  function Bg(e) {
    return e.data === ru;
  }
  function tp(e) {
    return e.data === iu;
  }
  function v0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function h0(e, t) {
    e._reactRetry = t;
  }
  function Ks(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === Un || t === ur)
        break;
      if (t === Dt) {
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
  function g0(e) {
    return Ks(e.firstChild);
  }
  function y0(e) {
    return Ks(e.firstChild);
  }
  function b0(e) {
    return Ks(e.nextSibling);
  }
  function N0(e, t, n, a, r, i, l) {
    uu(i, e), rp(e, n);
    var o;
    {
      var u = r;
      o = u.namespace;
    }
    var p = (i.mode & Ye) !== xe;
    return wC(e, t, n, o, a, p, l);
  }
  function E0(e, t, n, a) {
    return uu(n, e), n.mode & Ye, _C(e, t);
  }
  function S0(e, t) {
    uu(t, e);
  }
  function x0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === Dt) {
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
  function Pg(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === Dt) {
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
  function R0(e) {
    Bo(e);
  }
  function C0(e) {
    Bo(e);
  }
  function D0(e) {
    return e !== "head" && e !== "body";
  }
  function T0(e, t, n, a) {
    var r = !0;
    Is(t.nodeValue, n, a, r);
  }
  function j0(e, t, n, a, r, i) {
    if (t[Gs] !== !0) {
      var l = !0;
      Is(a.nodeValue, r, i, l);
    }
  }
  function w0(e, t) {
    t.nodeType === Un ? Id(e, t) : t.nodeType === Dt || qd(e, t);
  }
  function _0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Un ? Id(n, t) : t.nodeType === Dt || qd(n, t));
    }
  }
  function O0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === Un ? Id(n, a) : a.nodeType === Dt || qd(n, a));
  }
  function L0(e, t, n) {
    Gd(e, t);
  }
  function M0(e, t) {
    Wd(e, t);
  }
  function A0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Gd(a, t);
    }
  }
  function V0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Wd(n, t);
    }
  }
  function k0(e, t, n, a, r, i) {
    (i || t[Gs] !== !0) && Gd(n, a);
  }
  function U0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && Wd(n, a);
  }
  function z0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function F0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, H0 = "__reactListeners$" + Dl, B0 = "__reactHandles$" + Dl;
  function P0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[H0], delete e[B0];
  }
  function uu(e, t) {
    t[Tl] = e;
  }
  function Xs(e, t) {
    t[ou] = e;
  }
  function $g(e) {
    e[ou] = null;
  }
  function su(e) {
    return !!e[ou];
  }
  function Mi(e) {
    var t = e[Tl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ou] || n[Tl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = Pg(e); r !== null; ) {
            var i = r[Tl];
            if (i)
              return i;
            r = Pg(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function $r(e) {
    var t = e[Tl] || e[ou];
    return t && (t.tag === V || t.tag === K || t.tag === B || t.tag === x) ? t : null;
  }
  function jl(e) {
    if (e.tag === V || e.tag === K)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function Js(e) {
    return e[np] || null;
  }
  function rp(e, t) {
    e[np] = t;
  }
  function $0(e) {
    var t = e[ap];
    return t === void 0 && (t = e[ap] = /* @__PURE__ */ new Set()), t;
  }
  var Yg = {}, Ig = h.ReactDebugCurrentFrame;
  function Zs(e) {
    if (e) {
      var t = e._owner, n = co(e.type, e._source, t ? t.type : null);
      Ig.setExtraStackFrame(n);
    } else
      Ig.setExtraStackFrame(null);
  }
  function xa(e, t, n, a, r) {
    {
      var i = Function.call.bind(An);
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
          o && !(o instanceof Error) && (Zs(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof o), Zs(null)), o instanceof Error && !(o.message in Yg) && (Yg[o.message] = !0, Zs(r), f("Failed %s type: %s", n, o.message), Zs(null));
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
  var Xn = {};
  Object.freeze(Xn);
  var gr = Yr(Xn), Ya = Yr(!1), op = Xn;
  function wl(e, t, n) {
    return n && Ia(t) ? op : gr.current;
  }
  function qg(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function _l(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return Xn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var o = Me(e) || "Unknown";
        xa(a, i, "context", o);
      }
      return r && qg(e, t, i), i;
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
    vn(Ya, e), vn(gr, e);
  }
  function up(e) {
    vn(Ya, e), vn(gr, e);
  }
  function Gg(e, t, n) {
    {
      if (gr.current !== Xn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      hn(gr, t, e), hn(Ya, n, e);
    }
  }
  function Wg(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Me(e) || "Unknown";
          lp[i] || (lp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var o in l)
        if (!(o in r))
          throw new Error((Me(e) || "Unknown") + '.getChildContext(): key "' + o + '" is not defined in childContextTypes.');
      {
        var u = Me(e) || "Unknown";
        xa(r, l, "child context", u);
      }
      return Fe({}, n, l);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Xn;
      return op = gr.current, hn(gr, n, e), hn(Ya, Ya.current, e), !0;
    }
  }
  function Qg(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Wg(e, t, op);
        a.__reactInternalMemoizedMergedChildContext = r, vn(Ya, e), vn(gr, e), hn(gr, r, e), hn(Ya, n, e);
      } else
        vn(Ya, e), hn(Ya, n, e);
    }
  }
  function Y0(e) {
    {
      if (!DS(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case x:
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
  var Ir = 0, rc = 1, yr = null, sp = !1, cp = !1;
  function Kg(e) {
    yr === null ? yr = [e] : yr.push(e);
  }
  function I0(e) {
    sp = !0, Kg(e);
  }
  function Xg() {
    sp && qr();
  }
  function qr() {
    if (!cp && yr !== null) {
      cp = !0;
      var e = 0, t = Sa();
      try {
        var n = !0, a = yr;
        for (Wt(Wn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        yr = null, sp = !1;
      } catch (i) {
        throw yr !== null && (yr = yr.slice(e + 1)), Eh(Ns, qr), i;
      } finally {
        Wt(t), cp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, ic = null, lc = 0, ia = [], la = 0, Ai = null, br = 1, Nr = "";
  function q0(e) {
    return ki(), (e.flags & ph) !== Ce;
  }
  function G0(e) {
    return ki(), lc;
  }
  function W0() {
    var e = Nr, t = br, n = t & ~Q0(t);
    return n.toString(32) + e;
  }
  function Vi(e, t) {
    ki(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Jg(e, t, n) {
    ki(), ia[la++] = br, ia[la++] = Nr, ia[la++] = Ai, Ai = e;
    var a = br, r = Nr, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, u = oc(t) + i;
    if (u > 30) {
      var p = i - i % 5, v = (1 << p) - 1, S = (l & v).toString(32), E = l >> p, O = i - p, M = oc(t) + O, F = o << O, te = F | E, Ee = S + r;
      br = 1 << M | te, Nr = Ee;
    } else {
      var pe = o << i, qe = pe | l, Be = r;
      br = 1 << u | qe, Nr = Be;
    }
  }
  function fp(e) {
    ki();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Vi(e, n), Jg(e, n, a);
    }
  }
  function oc(e) {
    return 32 - Th(e);
  }
  function Q0(e) {
    return 1 << oc(e) - 1;
  }
  function dp(e) {
    for (; e === ic; )
      ic = Ol[--Ll], Ol[Ll] = null, lc = Ol[--Ll], Ol[Ll] = null;
    for (; e === Ai; )
      Ai = ia[--la], ia[la] = null, Nr = ia[--la], ia[la] = null, br = ia[--la], ia[la] = null;
  }
  function K0() {
    return ki(), Ai !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function X0(e, t) {
    ki(), ia[la++] = br, ia[la++] = Nr, ia[la++] = Ai, br = t.id, Nr = t.overflow, Ai = e;
  }
  function ki() {
    tn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var en = null, oa = null, Ra = !1, Ui = !1, Gr = null;
  function J0() {
    Ra && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Zg() {
    Ui = !0;
  }
  function Z0() {
    return Ui;
  }
  function eD(e) {
    var t = e.stateNode.containerInfo;
    return oa = y0(t), en = e, Ra = !0, Gr = null, Ui = !1, !0;
  }
  function tD(e, t, n) {
    return oa = b0(t), en = e, Ra = !0, Gr = null, Ui = !1, n !== null && X0(e, n), !0;
  }
  function ey(e, t) {
    switch (e.tag) {
      case x: {
        w0(e.stateNode.containerInfo, t);
        break;
      }
      case V: {
        var n = (e.mode & Ye) !== xe;
        O0(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case B: {
        var a = e.memoizedState;
        a.dehydrated !== null && _0(a.dehydrated, t);
        break;
      }
    }
  }
  function ty(e, t) {
    ey(e, t);
    var n = i1();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ei) : a.push(n);
  }
  function pp(e, t) {
    {
      if (Ui)
        return;
      switch (e.tag) {
        case x: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case V:
              var a = t.type;
              t.pendingProps, L0(n, a);
              break;
            case K:
              var r = t.pendingProps;
              M0(n, r);
              break;
          }
          break;
        }
        case V: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case V: {
              var u = t.type, p = t.pendingProps, v = (e.mode & Ye) !== xe;
              k0(
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
              var S = t.pendingProps, E = (e.mode & Ye) !== xe;
              U0(
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
        case B: {
          var O = e.memoizedState, M = O.dehydrated;
          if (M !== null) switch (t.tag) {
            case V:
              var F = t.type;
              t.pendingProps, A0(M, F);
              break;
            case K:
              var te = t.pendingProps;
              V0(M, te);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function ny(e, t) {
    t.flags = t.flags & ~fr | Tt, pp(e, t);
  }
  function ay(e, t) {
    switch (e.tag) {
      case V: {
        var n = e.type;
        e.pendingProps;
        var a = d0(t, n);
        return a !== null ? (e.stateNode = a, en = e, oa = g0(a), !0) : !1;
      }
      case K: {
        var r = e.pendingProps, i = p0(t, r);
        return i !== null ? (e.stateNode = i, en = e, oa = null, !0) : !1;
      }
      case B: {
        var l = m0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: K0(),
            retryLane: qn
          };
          e.memoizedState = o;
          var u = l1(l);
          return u.return = e, e.child = u, en = e, oa = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function mp(e) {
    return (e.mode & Ye) !== xe && (e.flags & Je) === Ce;
  }
  function vp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function hp(e) {
    if (Ra) {
      var t = oa;
      if (!t) {
        mp(e) && (pp(en, e), vp()), ny(en, e), Ra = !1, en = e;
        return;
      }
      var n = t;
      if (!ay(e, t)) {
        mp(e) && (pp(en, e), vp()), t = lu(n);
        var a = en;
        if (!t || !ay(e, t)) {
          ny(en, e), Ra = !1, en = e;
          return;
        }
        ty(a, n);
      }
    }
  }
  function nD(e, t, n) {
    var a = e.stateNode, r = !Ui, i = N0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function aD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = E0(t, n, e);
    if (a) {
      var r = en;
      if (r !== null)
        switch (r.tag) {
          case x: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== xe;
            T0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case V: {
            var o = r.type, u = r.memoizedProps, p = r.stateNode, v = (r.mode & Ye) !== xe;
            j0(
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
  function rD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    S0(n, e);
  }
  function iD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return x0(n);
  }
  function ry(e) {
    for (var t = e.return; t !== null && t.tag !== V && t.tag !== x && t.tag !== B; )
      t = t.return;
    en = t;
  }
  function uc(e) {
    if (e !== en)
      return !1;
    if (!Ra)
      return ry(e), Ra = !0, !1;
    if (e.tag !== x && (e.tag !== V || D0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = oa;
      if (t)
        if (mp(e))
          iy(e), vp();
        else
          for (; t; )
            ty(e, t), t = lu(t);
    }
    return ry(e), e.tag === B ? oa = iD(e) : oa = en ? lu(e.stateNode) : null, !0;
  }
  function lD() {
    return Ra && oa !== null;
  }
  function iy(e) {
    for (var t = oa; t; )
      ey(e, t), t = lu(t);
  }
  function Ml() {
    en = null, oa = null, Ra = !1, Ui = !1;
  }
  function ly() {
    Gr !== null && (Zb(Gr), Gr = null);
  }
  function tn() {
    return Ra;
  }
  function gp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var oD = h.ReactCurrentBatchConfig, uD = null;
  function sD() {
    return oD.transition;
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
    var cD = function(e) {
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
        e.add(Me(E) || "Component"), Fi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(Me(E) || "Component"), Fi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(Me(E) || "Component"), Fi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(Me(E) || "Component"), Fi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(Me(E) || "Component"), Fi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(Me(E) || "Component"), Fi.add(E.type);
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
    var sc = /* @__PURE__ */ new Map(), oy = /* @__PURE__ */ new Set();
    Ca.recordLegacyContextWarning = function(e, t) {
      var n = cD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!oy.has(e.type)) {
        var a = sc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], sc.set(n, a)), a.push(e));
      }
    }, Ca.flushLegacyContextWarning = function() {
      sc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Me(i) || "Component"), oy.add(i.type);
          });
          var r = zi(a);
          try {
            mt(n), f(`Legacy context API has been detected within a strict-mode tree.

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
  var yp, bp, Np, Ep, Sp, uy = function(e, t) {
  };
  yp = !1, bp = !1, Np = {}, Ep = {}, Sp = {}, uy = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Me(t) || "Component";
      Ep[n] || (Ep[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function fD(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function hu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & St || Ht) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !fD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Me(e) || "Component";
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
      var t = Me(e) || "Component";
      if (Sp[t])
        return;
      Sp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function sy(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function cy(e) {
    function t(j, H) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [H], j.flags |= Ei) : w.push(H);
      }
    }
    function n(j, H) {
      if (!e)
        return null;
      for (var w = H; w !== null; )
        t(j, w), w = w.sibling;
      return null;
    }
    function a(j, H) {
      for (var w = /* @__PURE__ */ new Map(), Q = H; Q !== null; )
        Q.key !== null ? w.set(Q.key, Q) : w.set(Q.index, Q), Q = Q.sibling;
      return w;
    }
    function r(j, H) {
      var w = Wi(j, H);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, H, w) {
      if (j.index = w, !e)
        return j.flags |= ph, H;
      var Q = j.alternate;
      if (Q !== null) {
        var oe = Q.index;
        return oe < H ? (j.flags |= Tt, H) : oe;
      } else
        return j.flags |= Tt, H;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= Tt), j;
    }
    function o(j, H, w, Q) {
      if (H === null || H.tag !== K) {
        var oe = gv(w, j.mode, Q);
        return oe.return = j, oe;
      } else {
        var ae = r(H, w);
        return ae.return = j, ae;
      }
    }
    function u(j, H, w, Q) {
      var oe = w.type;
      if (oe === za)
        return v(j, H, w.props.children, Q, w.key);
      if (H !== null && (H.elementType === oe || // Keep this check inline so it only runs on the false path:
      vN(H, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof oe == "object" && oe !== null && oe.$$typeof === Se && sy(oe) === H.type)) {
        var ae = r(H, w.props);
        return ae.ref = hu(j, H, w), ae.return = j, ae._debugSource = w._source, ae._debugOwner = w._owner, ae;
      }
      var De = hv(w, j.mode, Q);
      return De.ref = hu(j, H, w), De.return = j, De;
    }
    function p(j, H, w, Q) {
      if (H === null || H.tag !== A || H.stateNode.containerInfo !== w.containerInfo || H.stateNode.implementation !== w.implementation) {
        var oe = yv(w, j.mode, Q);
        return oe.return = j, oe;
      } else {
        var ae = r(H, w.children || []);
        return ae.return = j, ae;
      }
    }
    function v(j, H, w, Q, oe) {
      if (H === null || H.tag !== de) {
        var ae = ri(w, j.mode, Q, oe);
        return ae.return = j, ae;
      } else {
        var De = r(H, w);
        return De.return = j, De;
      }
    }
    function S(j, H, w) {
      if (typeof H == "string" && H !== "" || typeof H == "number") {
        var Q = gv("" + H, j.mode, w);
        return Q.return = j, Q;
      }
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case aa: {
            var oe = hv(H, j.mode, w);
            return oe.ref = hu(j, null, H), oe.return = j, oe;
          }
          case In: {
            var ae = yv(H, j.mode, w);
            return ae.return = j, ae;
          }
          case Se: {
            var De = H._payload, Le = H._init;
            return S(j, Le(De), w);
          }
        }
        if (He(H) || ba(H)) {
          var rt = ri(H, j.mode, w, null);
          return rt.return = j, rt;
        }
        cc(j, H);
      }
      return typeof H == "function" && fc(j), null;
    }
    function E(j, H, w, Q) {
      var oe = H !== null ? H.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return oe !== null ? null : o(j, H, "" + w, Q);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case aa:
            return w.key === oe ? u(j, H, w, Q) : null;
          case In:
            return w.key === oe ? p(j, H, w, Q) : null;
          case Se: {
            var ae = w._payload, De = w._init;
            return E(j, H, De(ae), Q);
          }
        }
        if (He(w) || ba(w))
          return oe !== null ? null : v(j, H, w, Q, null);
        cc(j, w);
      }
      return typeof w == "function" && fc(j), null;
    }
    function O(j, H, w, Q, oe) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") {
        var ae = j.get(w) || null;
        return o(H, ae, "" + Q, oe);
      }
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case aa: {
            var De = j.get(Q.key === null ? w : Q.key) || null;
            return u(H, De, Q, oe);
          }
          case In: {
            var Le = j.get(Q.key === null ? w : Q.key) || null;
            return p(H, Le, Q, oe);
          }
          case Se:
            var rt = Q._payload, We = Q._init;
            return O(j, H, w, We(rt), oe);
        }
        if (He(Q) || ba(Q)) {
          var Rt = j.get(w) || null;
          return v(H, Rt, Q, oe, null);
        }
        cc(H, Q);
      }
      return typeof Q == "function" && fc(H), null;
    }
    function M(j, H, w) {
      {
        if (typeof j != "object" || j === null)
          return H;
        switch (j.$$typeof) {
          case aa:
          case In:
            uy(j, w);
            var Q = j.key;
            if (typeof Q != "string")
              break;
            if (H === null) {
              H = /* @__PURE__ */ new Set(), H.add(Q);
              break;
            }
            if (!H.has(Q)) {
              H.add(Q);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Q);
            break;
          case Se:
            var oe = j._payload, ae = j._init;
            M(ae(oe), H, w);
            break;
        }
      }
      return H;
    }
    function F(j, H, w, Q) {
      for (var oe = null, ae = 0; ae < w.length; ae++) {
        var De = w[ae];
        oe = M(De, oe, j);
      }
      for (var Le = null, rt = null, We = H, Rt = 0, Qe = 0, xt = null; We !== null && Qe < w.length; Qe++) {
        We.index > Qe ? (xt = We, We = null) : xt = We.sibling;
        var yn = E(j, We, w[Qe], Q);
        if (yn === null) {
          We === null && (We = xt);
          break;
        }
        e && We && yn.alternate === null && t(j, We), Rt = i(yn, Rt, Qe), rt === null ? Le = yn : rt.sibling = yn, rt = yn, We = xt;
      }
      if (Qe === w.length) {
        if (n(j, We), tn()) {
          var sn = Qe;
          Vi(j, sn);
        }
        return Le;
      }
      if (We === null) {
        for (; Qe < w.length; Qe++) {
          var Zn = S(j, w[Qe], Q);
          Zn !== null && (Rt = i(Zn, Rt, Qe), rt === null ? Le = Zn : rt.sibling = Zn, rt = Zn);
        }
        if (tn()) {
          var Ln = Qe;
          Vi(j, Ln);
        }
        return Le;
      }
      for (var Mn = a(j, We); Qe < w.length; Qe++) {
        var bn = O(Mn, j, Qe, w[Qe], Q);
        bn !== null && (e && bn.alternate !== null && Mn.delete(bn.key === null ? Qe : bn.key), Rt = i(bn, Rt, Qe), rt === null ? Le = bn : rt.sibling = bn, rt = bn);
      }
      if (e && Mn.forEach(function(Jl) {
        return t(j, Jl);
      }), tn()) {
        var Tr = Qe;
        Vi(j, Tr);
      }
      return Le;
    }
    function te(j, H, w, Q) {
      var oe = ba(w);
      if (typeof oe != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === oe && (yp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), yp = !0);
        var ae = oe.call(w);
        if (ae)
          for (var De = null, Le = ae.next(); !Le.done; Le = ae.next()) {
            var rt = Le.value;
            De = M(rt, De, j);
          }
      }
      var We = oe.call(w);
      if (We == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, Qe = null, xt = H, yn = 0, sn = 0, Zn = null, Ln = We.next(); xt !== null && !Ln.done; sn++, Ln = We.next()) {
        xt.index > sn ? (Zn = xt, xt = null) : Zn = xt.sibling;
        var Mn = E(j, xt, Ln.value, Q);
        if (Mn === null) {
          xt === null && (xt = Zn);
          break;
        }
        e && xt && Mn.alternate === null && t(j, xt), yn = i(Mn, yn, sn), Qe === null ? Rt = Mn : Qe.sibling = Mn, Qe = Mn, xt = Zn;
      }
      if (Ln.done) {
        if (n(j, xt), tn()) {
          var bn = sn;
          Vi(j, bn);
        }
        return Rt;
      }
      if (xt === null) {
        for (; !Ln.done; sn++, Ln = We.next()) {
          var Tr = S(j, Ln.value, Q);
          Tr !== null && (yn = i(Tr, yn, sn), Qe === null ? Rt = Tr : Qe.sibling = Tr, Qe = Tr);
        }
        if (tn()) {
          var Jl = sn;
          Vi(j, Jl);
        }
        return Rt;
      }
      for (var Wu = a(j, xt); !Ln.done; sn++, Ln = We.next()) {
        var Za = O(Wu, j, sn, Ln.value, Q);
        Za !== null && (e && Za.alternate !== null && Wu.delete(Za.key === null ? sn : Za.key), yn = i(Za, yn, sn), Qe === null ? Rt = Za : Qe.sibling = Za, Qe = Za);
      }
      if (e && Wu.forEach(function(U1) {
        return t(j, U1);
      }), tn()) {
        var k1 = sn;
        Vi(j, k1);
      }
      return Rt;
    }
    function Ee(j, H, w, Q) {
      if (H !== null && H.tag === K) {
        n(j, H.sibling);
        var oe = r(H, w);
        return oe.return = j, oe;
      }
      n(j, H);
      var ae = gv(w, j.mode, Q);
      return ae.return = j, ae;
    }
    function pe(j, H, w, Q) {
      for (var oe = w.key, ae = H; ae !== null; ) {
        if (ae.key === oe) {
          var De = w.type;
          if (De === za) {
            if (ae.tag === de) {
              n(j, ae.sibling);
              var Le = r(ae, w.props.children);
              return Le.return = j, Le._debugSource = w._source, Le._debugOwner = w._owner, Le;
            }
          } else if (ae.elementType === De || // Keep this check inline so it only runs on the false path:
          vN(ae, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === Se && sy(De) === ae.type) {
            n(j, ae.sibling);
            var rt = r(ae, w.props);
            return rt.ref = hu(j, ae, w), rt.return = j, rt._debugSource = w._source, rt._debugOwner = w._owner, rt;
          }
          n(j, ae);
          break;
        } else
          t(j, ae);
        ae = ae.sibling;
      }
      if (w.type === za) {
        var We = ri(w.props.children, j.mode, Q, w.key);
        return We.return = j, We;
      } else {
        var Rt = hv(w, j.mode, Q);
        return Rt.ref = hu(j, H, w), Rt.return = j, Rt;
      }
    }
    function qe(j, H, w, Q) {
      for (var oe = w.key, ae = H; ae !== null; ) {
        if (ae.key === oe)
          if (ae.tag === A && ae.stateNode.containerInfo === w.containerInfo && ae.stateNode.implementation === w.implementation) {
            n(j, ae.sibling);
            var De = r(ae, w.children || []);
            return De.return = j, De;
          } else {
            n(j, ae);
            break;
          }
        else
          t(j, ae);
        ae = ae.sibling;
      }
      var Le = yv(w, j.mode, Q);
      return Le.return = j, Le;
    }
    function Be(j, H, w, Q) {
      var oe = typeof w == "object" && w !== null && w.type === za && w.key === null;
      if (oe && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case aa:
            return l(pe(j, H, w, Q));
          case In:
            return l(qe(j, H, w, Q));
          case Se:
            var ae = w._payload, De = w._init;
            return Be(j, H, De(ae), Q);
        }
        if (He(w))
          return F(j, H, w, Q);
        if (ba(w))
          return te(j, H, w, Q);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Ee(j, H, "" + w, Q)) : (typeof w == "function" && fc(j), n(j, H));
    }
    return Be;
  }
  var Al = cy(!0), fy = cy(!1);
  function dD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Wi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Wi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function pD(e, t) {
    for (var n = e.child; n !== null; )
      e1(n, t), n = n.sibling;
  }
  var xp = Yr(null), Rp;
  Rp = {};
  var dc = null, Vl = null, Cp = null, pc = !1;
  function mc() {
    dc = null, Vl = null, Cp = null, pc = !1;
  }
  function dy() {
    pc = !0;
  }
  function py() {
    pc = !1;
  }
  function my(e, t, n) {
    hn(xp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rp;
  }
  function Dp(e, t) {
    var n = xp.current;
    vn(xp, t), e._currentValue = n;
  }
  function Tp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = ke(r.childLanes, t)) : (a.childLanes = ke(a.childLanes, t), r !== null && (r.childLanes = ke(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function mD(e, t, n) {
    vD(e, t, n);
  }
  function vD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var o = Ao(n), u = Er(st, o);
              u.tag = hc;
              var p = a.updateQueue;
              if (p !== null) {
                var v = p.shared, S = v.pending;
                S === null ? u.next = u : (u.next = S.next, S.next = u), v.pending = u;
              }
            }
            a.lanes = ke(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = ke(E.lanes, n)), Tp(a.return, n, e), i.lanes = ke(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === q)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === re) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = ke(O.lanes, n);
        var M = O.alternate;
        M !== null && (M.lanes = ke(M.lanes, n)), Tp(O, n, e), r = a.sibling;
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
          var F = r.sibling;
          if (F !== null) {
            F.return = r.return, r = F;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function kl(e, t) {
    dc = e, Vl = null, Cp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Gn(n.lanes, t) && Ou(), n.firstContext = null);
    }
  }
  function jt(e) {
    pc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Cp !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Vl === null) {
        if (dc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Vl = n, dc.dependencies = {
          lanes: I,
          firstContext: n
        };
      } else
        Vl = Vl.next = n;
    }
    return t;
  }
  var Hi = null;
  function jp(e) {
    Hi === null ? Hi = [e] : Hi.push(e);
  }
  function hD() {
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
  function vy(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function gD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function yD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function Fn(e, t) {
    return vc(e, t);
  }
  var bD = vc;
  function vc(e, t) {
    e.lanes = ke(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = ke(n.lanes, t)), n === null && (e.flags & (Tt | fr)) !== Ce && fN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = ke(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = ke(n.childLanes, t) : (r.flags & (Tt | fr)) !== Ce && fN(e), a = r, r = r.return;
    if (a.tag === x) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var hy = 0, gy = 1, hc = 2, wp = 3, gc = !1, _p, yc;
  _p = !1, yc = null;
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
  function yy(e, t) {
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
      tag: hy,
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
    if (yc === r && !_p && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), _p = !0), gj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, bD(e, n);
    } else
      return yD(e, r, t, n);
  }
  function bc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Oh(n)) {
        var i = r.lanes;
        i = Mh(i, e.pendingLanes);
        var l = ke(i, n);
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
  function ND(e, t, n, a, r, i) {
    switch (n.tag) {
      case gy: {
        var l = n.payload;
        if (typeof l == "function") {
          dy();
          var o = l.call(i, a, r);
          {
            if (e.mode & St) {
              qt(!0);
              try {
                l.call(i, a, r);
              } finally {
                qt(!1);
              }
            }
            py();
          }
          return o;
        }
        return l;
      }
      case wp:
        e.flags = e.flags & ~jn | Je;
      case hy: {
        var u = n.payload, p;
        if (typeof u == "function") {
          dy(), p = u.call(i, a, r);
          {
            if (e.mode & St) {
              qt(!0);
              try {
                u.call(i, a, r);
              } finally {
                qt(!1);
              }
            }
            py();
          }
        } else
          p = u;
        return p == null ? a : Fe({}, a, p);
      }
      case hc:
        return gc = !0, a;
    }
    return a;
  }
  function Nc(e, t, n, a) {
    var r = e.updateQueue;
    gc = !1, yc = r.shared;
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
      var O = r.baseState, M = I, F = null, te = null, Ee = null, pe = i;
      do {
        var qe = pe.lane, Be = pe.eventTime;
        if (bl(a, qe)) {
          if (Ee !== null) {
            var H = {
              eventTime: Be,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              tag: pe.tag,
              payload: pe.payload,
              callback: pe.callback,
              next: null
            };
            Ee = Ee.next = H;
          }
          O = ND(e, r, pe, O, t, n);
          var w = pe.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          pe.lane !== Gt) {
            e.flags |= dh;
            var Q = r.effects;
            Q === null ? r.effects = [pe] : Q.push(pe);
          }
        } else {
          var j = {
            eventTime: Be,
            lane: qe,
            tag: pe.tag,
            payload: pe.payload,
            callback: pe.callback,
            next: null
          };
          Ee === null ? (te = Ee = j, F = O) : Ee = Ee.next = j, M = ke(M, qe);
        }
        if (pe = pe.next, pe === null) {
          if (o = r.shared.pending, o === null)
            break;
          var oe = o, ae = oe.next;
          oe.next = null, pe = ae, r.lastBaseUpdate = oe, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (F = O), r.baseState = F, r.firstBaseUpdate = te, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Le = De;
        do
          M = ke(M, Le.lane), Le = Le.next;
        while (Le !== De);
      } else i === null && (r.shared.lanes = I);
      $u(M), e.lanes = M, e.memoizedState = O;
    }
    yc = null;
  }
  function ED(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function by() {
    gc = !1;
  }
  function Ec() {
    return gc;
  }
  function Ny(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, ED(l, n));
      }
  }
  var gu = {}, Qr = Yr(gu), yu = Yr(gu), Sc = Yr(gu);
  function xc(e) {
    if (e === gu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Ey() {
    var e = xc(Sc.current);
    return e;
  }
  function Mp(e, t) {
    hn(Sc, t, e), hn(yu, e, e), hn(Qr, gu, e);
    var n = zC(t);
    vn(Qr, e), hn(Qr, n, e);
  }
  function Ul(e) {
    vn(Qr, e), vn(yu, e), vn(Sc, e);
  }
  function Ap() {
    var e = xc(Qr.current);
    return e;
  }
  function Sy(e) {
    xc(Sc.current);
    var t = xc(Qr.current), n = FC(t, e.type);
    t !== n && (hn(yu, e, e), hn(Qr, n, e));
  }
  function Vp(e) {
    yu.current === e && (vn(Qr, e), vn(yu, e));
  }
  var SD = 0, xy = 1, Ry = 1, bu = 2, Da = Yr(SD);
  function kp(e, t) {
    return (e & t) !== 0;
  }
  function zl(e) {
    return e & xy;
  }
  function Up(e, t) {
    return e & xy | t;
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
  function RD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === B) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Bg(a) || tp(a))
            return t;
        }
      } else if (t.tag === U && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Je) !== Ce;
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
  var Hn = (
    /*   */
    0
  ), Lt = (
    /* */
    1
  ), qa = (
    /*  */
    2
  ), Mt = (
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
  function CD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var le = h.ReactCurrentDispatcher, Nu = h.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = I, at = null, At = null, Vt = null, Cc = !1, Eu = !1, Su = 0, DD = 0, TD = 25, P = null, ua = null, Xr = -1, Bp = !1;
  function Ze() {
    {
      var e = P;
      ua === null ? ua = [e] : ua.push(e);
    }
  }
  function J() {
    {
      var e = P;
      ua !== null && (Xr++, ua[Xr] !== e && jD(e));
    }
  }
  function Bl(e) {
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
  }
  function jD(e) {
    {
      var t = Me(at);
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
  function gn() {
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
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", P), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, P, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Kn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, at = t, ua = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = I, e !== null && e.memoizedState !== null ? le.current = qy : ua !== null ? le.current = Iy : le.current = Yy;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, Su = 0, o >= TD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, At = null, Vt = null, t.updateQueue = null, Xr = -1, le.current = Gy, l = n(a, r);
      } while (Eu);
    }
    le.current = zc, t._debugHookTypes = ua;
    var u = At !== null && At.next !== null;
    if (Bi = I, at = null, At = null, Vt = null, P = null, ua = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== xe && f("Internal React error: Expected static flag was missing. Please notify the React team."), Cc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function $l() {
    var e = Su !== 0;
    return Su = 0, e;
  }
  function Cy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Pa) !== xe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Dy() {
    if (le.current = zc, Cc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = I, at = null, At = null, Vt = null, ua = null, Xr = -1, P = null, Fy = !1, Eu = !1, Su = 0;
  }
  function Ga() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Vt === null ? at.memoizedState = Vt = e : Vt = Vt.next = e, Vt;
  }
  function sa() {
    var e;
    if (At === null) {
      var t = at.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = At.next;
    var n;
    if (Vt === null ? n = at.memoizedState : n = Vt.next, n !== null)
      Vt = n, n = Vt.next, At = e;
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
      Vt === null ? at.memoizedState = Vt = a : Vt = Vt.next = a;
    }
    return Vt;
  }
  function Ty() {
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
    var l = i.dispatch = LD.bind(null, at, i);
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
      var v = l.next, S = i.baseState, E = null, O = null, M = null, F = v;
      do {
        var te = F.lane;
        if (bl(Bi, te)) {
          if (M !== null) {
            var pe = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            };
            M = M.next = pe;
          }
          if (F.hasEagerState)
            S = F.eagerState;
          else {
            var qe = F.action;
            S = e(S, qe);
          }
        } else {
          var Ee = {
            lane: te,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null
          };
          M === null ? (O = M = Ee, E = S) : M = M.next = Ee, at.lanes = ke(at.lanes, te), $u(te);
        }
        F = F.next;
      } while (F !== null && F !== v);
      M === null ? E = S : M.next = O, Kn(S, a.memoizedState) || Ou(), a.memoizedState = S, a.baseState = E, a.baseQueue = M, r.lastRenderedState = S;
    }
    var Be = r.interleaved;
    if (Be !== null) {
      var j = Be;
      do {
        var H = j.lane;
        at.lanes = ke(at.lanes, H), $u(H), j = j.next;
      } while (j !== Be);
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
      Kn(o, a.memoizedState) || Ou(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function x_(e, t, n) {
  }
  function R_(e, t, n) {
  }
  function Gp(e, t, n) {
    var a = at, r = Ga(), i, l = tn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var o = t();
        Kn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
      }
      var u = af();
      if (u === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(u, Bi) || jy(a, t, i);
    }
    r.memoizedState = i;
    var p = {
      value: i,
      getSnapshot: t
    };
    return r.queue = p, _c(_y.bind(null, a, p, e), [e]), a.flags |= Vr, xu(Lt | nn, wy.bind(null, a, p, i, t), void 0, null), i;
  }
  function Dc(e, t, n) {
    var a = at, r = sa(), i = t();
    if (!Hl) {
      var l = t();
      Kn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var o = r.memoizedState, u = !Kn(o, i);
    u && (r.memoizedState = i, Ou());
    var p = r.queue;
    if (Cu(_y.bind(null, a, p, e), [e]), p.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Vt !== null && Vt.memoizedState.tag & Lt) {
      a.flags |= Vr, xu(Lt | nn, wy.bind(null, a, p, i, t), void 0, null);
      var v = af();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(v, Bi) || jy(a, t, i);
    }
    return i;
  }
  function jy(e, t, n) {
    e.flags |= $f;
    var a = {
      getSnapshot: t,
      value: n
    }, r = at.updateQueue;
    if (r === null)
      r = Ty(), at.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function wy(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Oy(t) && Ly(e);
  }
  function _y(e, t, n) {
    var a = function() {
      Oy(t) && Ly(e);
    };
    return n(a);
  }
  function Oy(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Kn(n, a);
    } catch {
      return !0;
    }
  }
  function Ly(e) {
    var t = Fn(e, je);
    t !== null && Ft(t, e, je, st);
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
    var a = n.dispatch = MD.bind(null, at, n);
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
    }, i = at.updateQueue;
    if (i === null)
      i = Ty(), at.updateQueue = i, i.lastEffect = r.next = r;
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
    at.flags |= e, r.memoizedState = xu(Lt | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = sa(), i = a === void 0 ? null : a, l = void 0;
    if (At !== null) {
      var o = At.memoizedState;
      if (l = o.destroy, i !== null) {
        var u = o.deps;
        if (Pp(i, u)) {
          r.memoizedState = xu(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = xu(Lt | t, n, l, i);
  }
  function _c(e, t) {
    return (at.mode & Pa) !== xe ? Ru(Gf | Vr | qf, nn, e, t) : Ru(Vr | qf, nn, e, t);
  }
  function Cu(e, t) {
    return wc(Vr, nn, e, t);
  }
  function Xp(e, t) {
    return Ru(Xe, qa, e, t);
  }
  function Oc(e, t) {
    return wc(Xe, qa, e, t);
  }
  function Jp(e, t) {
    var n = Xe;
    return n |= Ri, (at.mode & Pa) !== xe && (n |= kr), Ru(n, Mt, e, t);
  }
  function Lc(e, t) {
    return wc(Xe, Mt, e, t);
  }
  function My(e, t) {
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
    var a = n != null ? n.concat([e]) : null, r = Xe;
    return r |= Ri, (at.mode & Pa) !== xe && (r |= kr), Ru(r, Mt, My.bind(null, t, e), a);
  }
  function Mc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(Xe, Mt, My.bind(null, t, e), a);
  }
  function wD(e, t) {
  }
  var Ac = wD;
  function em(e, t) {
    var n = Ga(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Vc(e, t) {
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
  function Ay(e) {
    var t = sa(), n = At, a = n.memoizedState;
    return ky(t, a, e);
  }
  function Vy(e) {
    var t = sa();
    if (At === null)
      return t.memoizedState = e, e;
    var n = At.memoizedState;
    return ky(t, n, e);
  }
  function ky(e, t, n) {
    var a = !mx(Bi);
    if (a) {
      if (!Kn(n, t)) {
        var r = Lh();
        at.lanes = ke(at.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function _D(e, t, n) {
    var a = Sa();
    Wt(xx(a, mr)), e(!0);
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
    var e = Tc(!1), t = e[0], n = e[1], a = _D.bind(null, n), r = Ga();
    return r.memoizedState = a, [t, a];
  }
  function Uy() {
    var e = Wp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  function zy() {
    var e = Qp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  var Fy = !1;
  function OD() {
    return Fy;
  }
  function rm() {
    var e = Ga(), t = af(), n = t.identifierPrefix, a;
    if (tn()) {
      var r = W0();
      a = ":" + n + "R" + r;
      var i = Su++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = DD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Uc() {
    var e = sa(), t = e.memoizedState;
    return t;
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
    if (Hy(e))
      By(t, r);
    else {
      var i = vy(e, t, r, a);
      if (i !== null) {
        var l = On();
        Ft(i, e, a, l), Py(i, t, a);
      }
    }
    $y(e, a);
  }
  function MD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hy(e))
      By(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === I && (i === null || i.lanes === I)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = le.current, le.current = Ta;
          try {
            var u = t.lastRenderedState, p = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = p, Kn(p, u)) {
              gD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            le.current = o;
          }
        }
      }
      var v = vy(e, t, r, a);
      if (v !== null) {
        var S = On();
        Ft(v, e, a, S), Py(v, t, a);
      }
    }
    $y(e, a);
  }
  function Hy(e) {
    var t = e.alternate;
    return e === at || t !== null && t === at;
  }
  function By(e, t) {
    Eu = Cc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Py(e, t, n) {
    if (Oh(n)) {
      var a = t.lanes;
      a = Mh(a, e.pendingLanes);
      var r = ke(a, n);
      t.lanes = r, xd(e, r);
    }
  }
  function $y(e, t, n) {
    Jf(e, t);
  }
  var zc = {
    readContext: jt,
    useCallback: gn,
    useContext: gn,
    useEffect: gn,
    useImperativeHandle: gn,
    useInsertionEffect: gn,
    useLayoutEffect: gn,
    useMemo: gn,
    useReducer: gn,
    useRef: gn,
    useState: gn,
    useDebugValue: gn,
    useDeferredValue: gn,
    useTransition: gn,
    useMutableSource: gn,
    useSyncExternalStore: gn,
    useId: gn,
    unstable_isNewReconciler: Ge
  }, Yy = null, Iy = null, qy = null, Gy = null, Wa = null, Ta = null, Fc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, we = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Yy = {
      readContext: function(e) {
        return jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Ze(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Ze(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Ze(), Bl(t), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Ze(), Bl(n), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Ze(), Bl(t), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Ze(), Bl(t), Jp(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Ze(), Bl(t);
        var n = le.current;
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Ze();
        var a = le.current;
        le.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Ze(), Kp(e);
      },
      useState: function(e) {
        P = "useState", Ze();
        var t = le.current;
        le.current = Wa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Ze(), nm(e);
      },
      useTransition: function() {
        return P = "useTransition", Ze(), am();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Ze(), Gp(e, t, n);
      },
      useId: function() {
        return P = "useId", Ze(), rm();
      },
      unstable_isNewReconciler: Ge
    }, Iy = {
      readContext: function(e) {
        return jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", J(), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", J(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", J(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", J(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", J(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", J(), Jp(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", J();
        var n = le.current;
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", J();
        var a = le.current;
        le.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", J(), Kp(e);
      },
      useState: function(e) {
        P = "useState", J();
        var t = le.current;
        le.current = Wa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", J(), void 0;
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", J(), nm(e);
      },
      useTransition: function() {
        return P = "useTransition", J(), am();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", J(), Gp(e, t, n);
      },
      useId: function() {
        return P = "useId", J(), rm();
      },
      unstable_isNewReconciler: Ge
    }, qy = {
      readContext: function(e) {
        return jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", J(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", J(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", J(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", J();
        var n = le.current;
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", J();
        var a = le.current;
        le.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", J(), jc();
      },
      useState: function(e) {
        P = "useState", J();
        var t = le.current;
        le.current = Ta;
        try {
          return Wp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", J(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", J(), Ay(e);
      },
      useTransition: function() {
        return P = "useTransition", J(), Uy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", J(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", J(), Uc();
      },
      unstable_isNewReconciler: Ge
    }, Gy = {
      readContext: function(e) {
        return jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", J(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", J(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", J(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", J();
        var n = le.current;
        le.current = Fc;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", J();
        var a = le.current;
        le.current = Fc;
        try {
          return qp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", J(), jc();
      },
      useState: function(e) {
        P = "useState", J();
        var t = le.current;
        le.current = Fc;
        try {
          return Qp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", J(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", J(), Vy(e);
      },
      useTransition: function() {
        return P = "useTransition", J(), zy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", J(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", J(), Uc();
      },
      unstable_isNewReconciler: Ge
    }, Wa = {
      readContext: function(e) {
        return im(), jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", we(), Ze(), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", we(), Ze(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", we(), Ze(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", we(), Ze(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", we(), Ze(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", we(), Ze(), Jp(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", we(), Ze();
        var n = le.current;
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", we(), Ze();
        var a = le.current;
        le.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", we(), Ze(), Kp(e);
      },
      useState: function(e) {
        P = "useState", we(), Ze();
        var t = le.current;
        le.current = Wa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", we(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", we(), Ze(), nm(e);
      },
      useTransition: function() {
        return P = "useTransition", we(), Ze(), am();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", we(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", we(), Ze(), Gp(e, t, n);
      },
      useId: function() {
        return P = "useId", we(), Ze(), rm();
      },
      unstable_isNewReconciler: Ge
    }, Ta = {
      readContext: function(e) {
        return im(), jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", we(), J(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", we(), J(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", we(), J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", we(), J(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", we(), J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", we(), J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", we(), J();
        var n = le.current;
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", we(), J();
        var a = le.current;
        le.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", we(), J(), jc();
      },
      useState: function(e) {
        P = "useState", we(), J();
        var t = le.current;
        le.current = Ta;
        try {
          return Wp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", we(), J(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", we(), J(), Ay(e);
      },
      useTransition: function() {
        return P = "useTransition", we(), J(), Uy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", we(), J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", we(), J(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", we(), J(), Uc();
      },
      unstable_isNewReconciler: Ge
    }, Fc = {
      readContext: function(e) {
        return im(), jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", we(), J(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", we(), J(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", we(), J(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", we(), J(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", we(), J(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", we(), J(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", we(), J();
        var n = le.current;
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", we(), J();
        var a = le.current;
        le.current = Ta;
        try {
          return qp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", we(), J(), jc();
      },
      useState: function(e) {
        P = "useState", we(), J();
        var t = le.current;
        le.current = Ta;
        try {
          return Qp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", we(), J(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", we(), J(), Vy(e);
      },
      useTransition: function() {
        return P = "useTransition", we(), J(), zy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", we(), J(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", we(), J(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", we(), J(), Uc();
      },
      unstable_isNewReconciler: Ge
    };
  }
  var Jr = m.unstable_now, Wy = 0, Hc = -1, Du = -1, Bc = -1, lm = !1, Pc = !1;
  function Qy() {
    return lm;
  }
  function AD() {
    Pc = !0;
  }
  function VD() {
    lm = !1, Pc = !1;
  }
  function kD() {
    lm = Pc, Pc = !1;
  }
  function Ky() {
    return Wy;
  }
  function Xy() {
    Wy = Jr();
  }
  function om(e) {
    Du = Jr(), e.actualStartTime < 0 && (e.actualStartTime = Jr());
  }
  function Jy(e) {
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
          case x:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case G:
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
          case x:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case G:
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
      var n = Fe({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var fm = {}, dm, pm, mm, vm, hm, Zy, Yc, gm, ym, bm, Tu;
  {
    dm = /* @__PURE__ */ new Set(), pm = /* @__PURE__ */ new Set(), mm = /* @__PURE__ */ new Set(), vm = /* @__PURE__ */ new Set(), gm = /* @__PURE__ */ new Set(), hm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Tu = /* @__PURE__ */ new Set();
    var eb = /* @__PURE__ */ new Set();
    Yc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        eb.has(n) || (eb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, Zy = function(e, t) {
      if (t === void 0) {
        var n = Ke(e) || "Component";
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
        qt(!0);
        try {
          i = n(a, r);
        } finally {
          qt(!1);
        }
      }
      Zy(t, i);
    }
    var l = i == null ? r : Fe({}, r, i);
    if (e.memoizedState = l, e.lanes === I) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: TS,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = On(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (Ft(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = On(), i = ni(a), l = Er(r, i);
      l.tag = gy, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (Ft(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = On(), r = ni(n), i = Er(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && (Ft(l, n, r, a), bc(l, n, r)), rx(n, r);
    }
  };
  function tb(e, t, n, a, r, i, l) {
    var o = e.stateNode;
    if (typeof o.shouldComponentUpdate == "function") {
      var u = o.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & St) {
          qt(!0);
          try {
            u = o.shouldComponentUpdate(a, i, l);
          } finally {
            qt(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ke(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function UD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ke(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !ym.has(t) && (ym.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ke(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ke(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || He(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function nb(e, t) {
    t.updater = Em, e.stateNode = t, xS(t, e), t._reactInternalInstance = fm;
  }
  function ab(e, t, n) {
    var a = !1, r = Xn, i = Xn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === ee && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === W ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ke(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = jt(l);
    else {
      r = wl(e, t, !0);
      var p = t.contextTypes;
      a = p != null, i = a ? _l(e, r) : Xn;
    }
    var v = new t(n, i);
    if (e.mode & St) {
      qt(!0);
      try {
        v = new t(n, i);
      } finally {
        qt(!1);
      }
    }
    var S = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    nb(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && S === null) {
        var E = Ke(t) || "Component";
        pm.has(E) || (pm.add(E), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, v.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var O = null, M = null, F = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? M = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (M = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? F = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (F = "UNSAFE_componentWillUpdate"), O !== null || M !== null || F !== null) {
          var te = Ke(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vm.has(te) || (vm.add(te), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, te, Ee, O !== null ? `
  ` + O : "", M !== null ? `
  ` + M : "", F !== null ? `
  ` + F : ""));
        }
      }
    }
    return a && qg(e, r, i), v;
  }
  function zD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Me(e) || "Component"), Em.enqueueReplaceState(t, t.state, null));
  }
  function rb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Me(e) || "Component";
        dm.has(i) || (dm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Em.enqueueReplaceState(t, t.state, null);
    }
  }
  function Sm(e, t, n, a) {
    UD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Op(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = jt(i);
    else {
      var l = wl(e, t, !0);
      r.context = _l(e, l);
    }
    {
      if (r.state === n) {
        var o = Ke(t) || "Component";
        gm.has(o) || (gm.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & St && Ca.recordLegacyContextWarning(e, r), Ca.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Nm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (zD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var p = Xe;
      p |= Ri, (e.mode & Pa) !== xe && (p |= kr), e.flags |= p;
    }
  }
  function FD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, u = Xn;
    if (typeof o == "object" && o !== null)
      u = jt(o);
    else {
      var p = wl(e, t, !0);
      u = _l(e, p);
    }
    var v = t.getDerivedStateFromProps, S = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !S && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && rb(e, r, n, u), by();
    var E = e.memoizedState, O = r.state = E;
    if (Nc(e, n, r, a), O = e.memoizedState, i === n && E === O && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var M = Xe;
        M |= Ri, (e.mode & Pa) !== xe && (M |= kr), e.flags |= M;
      }
      return !1;
    }
    typeof v == "function" && (Nm(e, t, v, n), O = e.memoizedState);
    var F = Ec() || tb(e, t, i, n, E, O, u);
    if (F) {
      if (!S && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var te = Xe;
        te |= Ri, (e.mode & Pa) !== xe && (te |= kr), e.flags |= te;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ee = Xe;
        Ee |= Ri, (e.mode & Pa) !== xe && (Ee |= kr), e.flags |= Ee;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = u, F;
  }
  function HD(e, t, n, a, r) {
    var i = t.stateNode;
    yy(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : ja(t.type, l);
    i.props = o;
    var u = t.pendingProps, p = i.context, v = n.contextType, S = Xn;
    if (typeof v == "object" && v !== null)
      S = jt(v);
    else {
      var E = wl(t, n, !0);
      S = _l(t, E);
    }
    var O = n.getDerivedStateFromProps, M = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !M && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || p !== S) && rb(t, i, a, S), by();
    var F = t.memoizedState, te = i.state = F;
    if (Nc(t, a, i, r), te = t.memoizedState, l === u && F === te && !tc() && !Ec() && !cn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= dl), !1;
    typeof O == "function" && (Nm(t, n, O, a), te = t.memoizedState);
    var Ee = Ec() || tb(t, n, o, a, F, te, S) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    cn;
    return Ee ? (!M && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, te, S), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, te, S)), typeof i.componentDidUpdate == "function" && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = te), i.props = a, i.state = te, i.context = S, Ee;
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
  function BD(e, t) {
    return !0;
  }
  function Rm(e, t) {
    try {
      var n = BD(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var o = r ? Me(r) : null, u = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", p;
      if (e.tag === x)
        p = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Me(e) || "Anonymous";
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
  var PD = typeof WeakMap == "function" ? WeakMap : Map;
  function ib(e, t, n) {
    var a = Er(st, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Aj(r), Rm(e, t);
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
      hN(e), Rm(e, t), typeof r != "function" && Lj(this);
      var u = t.value, p = t.stack;
      this.componentDidCatch(u, {
        componentStack: p !== null ? p : ""
      }), typeof r != "function" && (Gn(e.lanes, je) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Me(e) || "Unknown"));
    }), a;
  }
  function lb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new PD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Vj.bind(null, e, t, n);
      Ea && Yu(e, n), t.then(i, i);
    }
  }
  function $D(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function YD(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === xe && (n === D || n === Y || n === $)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function ob(e) {
    var t = e;
    do {
      if (t.tag === B && RD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ub(e, t, n, a, r) {
    if ((e.mode & Ye) === xe) {
      if (e === t)
        e.flags |= jn;
      else {
        if (e.flags |= Je, n.flags |= Yf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = ce;
          else {
            var l = Er(st, je);
            l.tag = hc, Wr(n, l, je);
          }
        }
        n.lanes = ke(n.lanes, je);
      }
      return e;
    }
    return e.flags |= jn, e.lanes = r, e;
  }
  function ID(e, t, n, a, r) {
    if (n.flags |= bs, Ea && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      YD(n), tn() && n.mode & Ye && Zg();
      var l = ob(t);
      if (l !== null) {
        l.flags &= ~cr, ub(l, t, n, e, r), l.mode & Ye && lb(e, i, r), $D(l, e, i);
        return;
      } else {
        if (!px(r)) {
          lb(e, i, r), rv();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (tn() && n.mode & Ye) {
      Zg();
      var u = ob(t);
      if (u !== null) {
        (u.flags & jn) === Ce && (u.flags |= cr), ub(u, t, n, e, r), gp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), Rj(a);
    var p = t;
    do {
      switch (p.tag) {
        case x: {
          var v = a;
          p.flags |= jn;
          var S = Ao(r);
          p.lanes = ke(p.lanes, S);
          var E = ib(p, v, S);
          Lp(p, E);
          return;
        }
        case T:
          var O = a, M = p.type, F = p.stateNode;
          if ((p.flags & Je) === Ce && (typeof M.getDerivedStateFromError == "function" || F !== null && typeof F.componentDidCatch == "function" && !oN(F))) {
            p.flags |= jn;
            var te = Ao(r);
            p.lanes = ke(p.lanes, te);
            var Ee = Cm(p, O, te);
            Lp(p, Ee);
            return;
          }
          break;
      }
      p = p.return;
    } while (p !== null);
  }
  function qD() {
    return null;
  }
  var ju = h.ReactCurrentOwner, wa = !1, Dm, wu, Tm, jm, wm, $i, _m, Ic, _u;
  Dm = {}, wu = {}, Tm = {}, jm = {}, wm = {}, $i = !1, _m = {}, Ic = {}, _u = {};
  function wn(e, t, n, a) {
    e === null ? t.child = fy(t, null, n, a) : t.child = Al(t, e.child, n, a);
  }
  function GD(e, t, n, a) {
    t.child = Al(t, e.child, null, a), t.child = Al(t, null, n, a);
  }
  function sb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && xa(
        i,
        a,
        // Resolved props
        "prop",
        Ke(n)
      );
    }
    var l = n.render, o = t.ref, u, p;
    kl(t, r), jo(t);
    {
      if (ju.current = t, ra(!0), u = Pl(e, t, l, a, o, r), p = $l(), t.mode & St) {
        qt(!0);
        try {
          u = Pl(e, t, l, a, o, r), p = $l();
        } finally {
          qt(!1);
        }
      }
      ra(!1);
    }
    return vl(), e !== null && !wa ? (Cy(e, t, r), Sr(e, t, r)) : (tn() && p && fp(t), t.flags |= fl, wn(e, t, u, r), t.child);
  }
  function cb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (Jj(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = $, t.type = l, Mm(t, i), fb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && xa(
          o,
          a,
          // Resolved props
          "prop",
          Ke(i)
        ), n.defaultProps !== void 0) {
          var u = Ke(i) || "Unknown";
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
        Ke(v)
      );
    }
    var E = e.child, O = Fm(e, r);
    if (!O) {
      var M = E.memoizedProps, F = n.compare;
      if (F = F !== null ? F : Qo, F(M, a) && e.ref === t.ref)
        return Sr(e, t, r);
    }
    t.flags |= fl;
    var te = Wi(E, a);
    return te.ref = t.ref, te.return = t, t.child = te, te;
  }
  function fb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Se) {
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
          Ke(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Qo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (wa = !1, t.pendingProps = a = v, Fm(e, r))
          (e.flags & Yf) !== Ce && (wa = !0);
        else return t.lanes = e.lanes, Sr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function db(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Nn)
      if ((t.mode & Ye) === xe) {
        var l = {
          baseLanes: I,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (Gn(n, qn)) {
        var S = {
          baseLanes: I,
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
          u = ke(p, n);
        } else
          u = n;
        t.lanes = t.childLanes = qn;
        var v = {
          baseLanes: u,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, rf(t, u), null;
      }
    else {
      var O;
      i !== null ? (O = ke(i.baseLanes, n), t.memoizedState = null) : O = n, rf(t, O);
    }
    return wn(e, t, r, n), t.child;
  }
  function WD(e, t, n) {
    var a = t.pendingProps;
    return wn(e, t, a, n), t.child;
  }
  function QD(e, t, n) {
    var a = t.pendingProps.children;
    return wn(e, t, a, n), t.child;
  }
  function KD(e, t, n) {
    {
      t.flags |= Xe;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return wn(e, t, i, n), t.child;
  }
  function pb(e, t) {
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
        Ke(n)
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
        qt(!0);
        try {
          u = Pl(e, t, n, a, l, r), p = $l();
        } finally {
          qt(!1);
        }
      }
      ra(!1);
    }
    return vl(), e !== null && !wa ? (Cy(e, t, r), Sr(e, t, r)) : (tn() && p && fp(t), t.flags |= fl, wn(e, t, u, r), t.child);
  }
  function mb(e, t, n, a, r) {
    {
      switch (p1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), u = o.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= Je, t.flags |= jn;
          var p = new Error("Simulated error coming from DevTools"), v = Ao(r);
          t.lanes = ke(t.lanes, v);
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
          Ke(n)
        );
      }
    }
    var O;
    Ia(n) ? (O = !0, ac(t)) : O = !1, kl(t, r);
    var M = t.stateNode, F;
    M === null ? (Gc(e, t), ab(t, n, a), Sm(t, n, a, r), F = !0) : e === null ? F = FD(t, n, a, r) : F = HD(e, t, n, a, r);
    var te = Lm(e, t, n, F, O, r);
    {
      var Ee = t.stateNode;
      F && Ee.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Me(t) || "a component"), $i = !0);
    }
    return te;
  }
  function Lm(e, t, n, a, r, i) {
    pb(e, t);
    var l = (t.flags & Je) !== Ce;
    if (!a && !l)
      return r && Qg(t, n, !1), Sr(e, t, i);
    var o = t.stateNode;
    ju.current = t;
    var u;
    if (l && typeof n.getDerivedStateFromError != "function")
      u = null, Jy();
    else {
      jo(t);
      {
        if (ra(!0), u = o.render(), t.mode & St) {
          qt(!0);
          try {
            o.render();
          } finally {
            qt(!1);
          }
        }
        ra(!1);
      }
      vl();
    }
    return t.flags |= fl, e !== null && l ? GD(e, t, u, i) : wn(e, t, u, i), t.memoizedState = o.state, r && Qg(t, n, !0), t.child;
  }
  function vb(e) {
    var t = e.stateNode;
    t.pendingContext ? Gg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gg(e, t.context, !1), Mp(e, t.containerInfo);
  }
  function XD(e, t, n) {
    if (vb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    yy(e, t), Nc(t, a, null, n);
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
        var S = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return hb(e, t, o, n, S);
      } else {
        eD(t);
        var E = fy(t, null, o, n);
        t.child = E;
        for (var O = E; O; )
          O.flags = O.flags & ~Tt | fr, O = O.sibling;
      }
    } else {
      if (Ml(), o === i)
        return Sr(e, t, n);
      wn(e, t, o, n);
    }
    return t.child;
  }
  function hb(e, t, n, a, r) {
    return Ml(), gp(r), t.flags |= cr, wn(e, t, n, a), t.child;
  }
  function JD(e, t, n) {
    Sy(t), e === null && hp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Xd(a, r);
    return o ? l = null : i !== null && Xd(a, i) && (t.flags |= Do), pb(e, t), wn(e, t, l, n), t.child;
  }
  function ZD(e, t) {
    return e === null && hp(t), null;
  }
  function eT(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, u = o(l);
    t.type = u;
    var p = t.tag = Zj(u), v = ja(u, r), S;
    switch (p) {
      case D:
        return Mm(t, u), t.type = u = Xl(u), S = Om(null, t, u, v, a), S;
      case T:
        return t.type = u = sv(u), S = mb(null, t, u, v, a), S;
      case Y:
        return t.type = u = cv(u), S = sb(null, t, u, v, a), S;
      case ve: {
        if (t.type !== t.elementType) {
          var E = u.propTypes;
          E && xa(
            E,
            v,
            // Resolved for outer only
            "prop",
            Ke(u)
          );
        }
        return S = cb(
          null,
          t,
          u,
          ja(u.type, v),
          // The inner type can have defaults too
          a
        ), S;
      }
    }
    var O = "";
    throw u !== null && typeof u == "object" && u.$$typeof === Se && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function tT(e, t, n, a, r) {
    Gc(e, t), t.tag = T;
    var i;
    return Ia(n) ? (i = !0, ac(t)) : i = !1, kl(t, r), ab(t, n, a), Sm(t, n, a, r), Lm(null, t, n, !0, i, r);
  }
  function nT(e, t, n, a) {
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
        var p = Ke(n) || "Unknown";
        Dm[p] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", p, p), Dm[p] = !0);
      }
      t.mode & St && Ca.recordLegacyContextWarning(t, null), ra(!0), ju.current = t, o = Pl(null, t, n, r, i, a), u = $l(), ra(!1);
    }
    if (vl(), t.flags |= fl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var v = Ke(n) || "Unknown";
      wu[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), wu[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
    ) {
      {
        var S = Ke(n) || "Unknown";
        wu[S] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", S, S, S), wu[S] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var E = !1;
      return Ia(n) ? (E = !0, ac(t)) : E = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Op(t), nb(t, o), Sm(t, n, r, a), Lm(null, t, n, !0, E, a);
    } else {
      if (t.tag = D, t.mode & St) {
        qt(!0);
        try {
          o = Pl(null, t, n, r, i, a), u = $l();
        } finally {
          qt(!1);
        }
      }
      return tn() && u && fp(t), wn(null, t, o, a), Mm(t, n), t.child;
    }
  }
  function Mm(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Mr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), wm[r] || (wm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Ke(t) || "Unknown";
        _u[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), _u[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = Ke(t) || "Unknown";
        jm[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), jm[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Ke(t) || "Unknown";
        Tm[u] || (f("%s: Function components do not support contextType.", u), Tm[u] = !0);
      }
    }
  }
  var Am = {
    dehydrated: null,
    treeContext: null,
    retryLane: Gt
  };
  function Vm(e) {
    return {
      baseLanes: e,
      cachePool: qD(),
      transitions: null
    };
  }
  function aT(e, t) {
    var n = null;
    return {
      baseLanes: ke(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function rT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return kp(e, bu);
  }
  function iT(e, t) {
    return Ds(e.childLanes, t);
  }
  function gb(e, t, n) {
    var a = t.pendingProps;
    m1(t) && (t.flags |= Je);
    var r = Da.current, i = !1, l = (t.flags & Je) !== Ce;
    if (l || rT(r, e) ? (i = !0, t.flags &= ~Je) : (e === null || e.memoizedState !== null) && (r = xD(r, Ry)), r = zl(r), Kr(t, r), e === null) {
      hp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var u = o.dehydrated;
        if (u !== null)
          return cT(t, u);
      }
      var p = a.children, v = a.fallback;
      if (i) {
        var S = lT(t, p, v, n), E = t.child;
        return E.memoizedState = Vm(n), t.memoizedState = Am, S;
      } else
        return km(t, p);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var M = O.dehydrated;
        if (M !== null)
          return fT(e, t, l, a, M, O, n);
      }
      if (i) {
        var F = a.fallback, te = a.children, Ee = uT(e, t, te, F, n), pe = t.child, qe = e.child.memoizedState;
        return pe.memoizedState = qe === null ? Vm(n) : aT(qe, n), pe.childLanes = iT(e, n), t.memoizedState = Am, Ee;
      } else {
        var Be = a.children, j = oT(e, t, Be, n);
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
  function lT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, u;
    return (r & Ye) === xe && i !== null ? (o = i, o.childLanes = I, o.pendingProps = l, e.mode & nt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = ri(n, r, a, null)) : (o = Um(l, r), u = ri(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function Um(e, t, n) {
    return yN(e, t, I, null);
  }
  function yb(e, t) {
    return Wi(e, t);
  }
  function oT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = yb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ye) === xe && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var o = t.deletions;
      o === null ? (t.deletions = [i], t.flags |= Ei) : o.push(i);
    }
    return t.child = l, l;
  }
  function uT(e, t, n, a, r) {
    var i = t.mode, l = e.child, o = l.sibling, u = {
      mode: "hidden",
      children: n
    }, p;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Ye) === xe && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      p = v, p.childLanes = I, p.pendingProps = u, t.mode & nt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = l.selfBaseDuration, p.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      p = yb(l, u), p.subtreeFlags = l.subtreeFlags & dr;
    var S;
    return o !== null ? S = Wi(o, a) : (S = ri(a, i, r, null), S.flags |= Tt), S.return = t, p.return = t, p.sibling = S, t.child = p, S;
  }
  function qc(e, t, n, a) {
    a !== null && gp(a), Al(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = km(t, i);
    return l.flags |= Tt, t.memoizedState = null, l;
  }
  function sT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Um(l, i), u = ri(a, i, r, null);
    return u.flags |= Tt, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & Ye) !== xe && Al(t, e.child, null, r), u;
  }
  function cT(e, t, n) {
    return (e.mode & Ye) === xe ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = je) : tp(t) ? e.lanes = Ti : e.lanes = qn, null;
  }
  function fT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var j = xm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Je, null;
        var H = a.children, w = a.fallback, Q = sT(e, t, H, w, l), oe = t.child;
        return oe.memoizedState = Vm(l), t.memoizedState = Am, Q;
      }
    else {
      if (J0(), (t.mode & Ye) === xe)
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
          var v = v0(r);
          o = v.digest, u = v.message, p = v.stack;
        }
        var S;
        u ? S = new Error(u) : S = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var E = xm(S, o, p);
        return qc(e, t, l, E);
      }
      var O = Gn(l, e.childLanes);
      if (wa || O) {
        var M = af();
        if (M !== null) {
          var F = Ex(M, l);
          if (F !== Gt && F !== i.retryLane) {
            i.retryLane = F;
            var te = st;
            Fn(e, F), Ft(M, e, F, te);
          }
        }
        rv();
        var Ee = xm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, Ee);
      } else if (Bg(r)) {
        t.flags |= Je, t.child = e.child;
        var pe = kj.bind(null, e);
        return h0(r, pe), null;
      } else {
        tD(t, r, i.treeContext);
        var qe = a.children, Be = km(t, qe);
        return Be.flags |= fr, Be;
      }
    }
  }
  function bb(e, t, n) {
    e.lanes = ke(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = ke(a.lanes, t)), Tp(e.return, t, n);
  }
  function dT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === B) {
        var r = a.memoizedState;
        r !== null && bb(a, n, e);
      } else if (a.tag === U)
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
  function pT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Rc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function mT(e) {
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
  function vT(e, t) {
    e !== void 0 && !Ic[e] && (e !== "collapsed" && e !== "hidden" ? (Ic[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Ic[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Nb(e, t) {
    {
      var n = He(e), a = !n && typeof ba(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function hT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (He(e)) {
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
    mT(r), vT(i, r), hT(l, r), wn(e, t, l, n);
    var o = Da.current, u = kp(o, bu);
    if (u)
      o = Up(o, bu), t.flags |= Je;
    else {
      var p = e !== null && (e.flags & Je) !== Ce;
      p && dT(t, t.child, n), o = zl(o);
    }
    if (Kr(t, o), (t.mode & Ye) === xe)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = pT(t.child), S;
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
          var E = null, O = t.child;
          for (t.child = null; O !== null; ) {
            var M = O.alternate;
            if (M !== null && Rc(M) === null) {
              t.child = O;
              break;
            }
            var F = O.sibling;
            O.sibling = E, E = O, O = F;
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
  function gT(e, t, n) {
    Mp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Al(t, null, a, n) : wn(e, t, a, n), t.child;
  }
  var Sb = !1;
  function yT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || Sb || (Sb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && xa(u, i, "prop", "Context.Provider");
    }
    if (my(t, r, o), l !== null) {
      var p = l.value;
      if (Kn(p, o)) {
        if (l.children === i.children && !tc())
          return Sr(e, t, n);
      } else
        mD(t, r, n);
    }
    var v = i.children;
    return wn(e, t, v, n), t.child;
  }
  var xb = !1;
  function bT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (xb || (xb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kl(t, n);
    var l = jt(a);
    jo(t);
    var o;
    return ju.current = t, ra(!0), o = i(l), ra(!1), vl(), t.flags |= fl, wn(e, t, o, n), t.child;
  }
  function Ou() {
    wa = !0;
  }
  function Gc(e, t) {
    (t.mode & Ye) === xe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Tt);
  }
  function Sr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Jy(), $u(t.lanes), Gn(n, t.childLanes) ? (dD(e, t), t.child) : null;
  }
  function NT(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Ei) : i.push(e), n.flags |= Tt, n;
    }
  }
  function Fm(e, t) {
    var n = e.lanes;
    return !!Gn(n, t);
  }
  function ET(e, t, n) {
    switch (t.tag) {
      case x:
        vb(t), t.stateNode, Ml();
        break;
      case V:
        Sy(t);
        break;
      case T: {
        var a = t.type;
        Ia(a) && ac(t);
        break;
      }
      case A:
        Mp(t, t.stateNode.containerInfo);
        break;
      case q: {
        var r = t.memoizedProps.value, i = t.type._context;
        my(t, i, r);
        break;
      }
      case G:
        {
          var l = Gn(n, t.childLanes);
          l && (t.flags |= Xe);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case B: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Kr(t, zl(Da.current)), t.flags |= Je, null;
          var p = t.child, v = p.childLanes;
          if (Gn(n, v))
            return gb(e, t, n);
          Kr(t, zl(Da.current));
          var S = Sr(e, t, n);
          return S !== null ? S.sibling : null;
        } else
          Kr(t, zl(Da.current));
        break;
      }
      case U: {
        var E = (e.flags & Je) !== Ce, O = Gn(n, t.childLanes);
        if (E) {
          if (O)
            return Eb(e, t, n);
          t.flags |= Je;
        }
        var M = t.memoizedState;
        if (M !== null && (M.rendering = null, M.tail = null, M.lastEffect = null), Kr(t, Da.current), O)
          break;
        return null;
      }
      case ue:
      case ge:
        return t.lanes = I, db(e, t, n);
    }
    return Sr(e, t, n);
  }
  function Rb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return NT(e, t, vv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        wa = !0;
      else {
        var i = Fm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Je) === Ce)
          return wa = !1, ET(e, t, n);
        (e.flags & Yf) !== Ce ? wa = !0 : wa = !1;
      }
    } else if (wa = !1, tn() && q0(t)) {
      var l = t.index, o = G0();
      Jg(t, o, l);
    }
    switch (t.lanes = I, t.tag) {
      case _:
        return nT(e, t, t.type, n);
      case Ue: {
        var u = t.elementType;
        return eT(e, t, u, n);
      }
      case D: {
        var p = t.type, v = t.pendingProps, S = t.elementType === p ? v : ja(p, v);
        return Om(e, t, p, S, n);
      }
      case T: {
        var E = t.type, O = t.pendingProps, M = t.elementType === E ? O : ja(E, O);
        return mb(e, t, E, M, n);
      }
      case x:
        return XD(e, t, n);
      case V:
        return JD(e, t, n);
      case K:
        return ZD(e, t);
      case B:
        return gb(e, t, n);
      case A:
        return gT(e, t, n);
      case Y: {
        var F = t.type, te = t.pendingProps, Ee = t.elementType === F ? te : ja(F, te);
        return sb(e, t, F, Ee, n);
      }
      case de:
        return WD(e, t, n);
      case ne:
        return QD(e, t, n);
      case G:
        return KD(e, t, n);
      case q:
        return yT(e, t, n);
      case me:
        return bT(e, t, n);
      case ve: {
        var pe = t.type, qe = t.pendingProps, Be = ja(pe, qe);
        if (t.type !== t.elementType) {
          var j = pe.propTypes;
          j && xa(
            j,
            Be,
            // Resolved for outer only
            "prop",
            Ke(pe)
          );
        }
        return Be = ja(pe.type, Be), cb(e, t, pe, Be, n);
      }
      case $:
        return fb(e, t, t.type, t.pendingProps, n);
      case ce: {
        var H = t.type, w = t.pendingProps, Q = t.elementType === H ? w : ja(H, w);
        return tT(e, t, H, Q, n);
      }
      case U:
        return Eb(e, t, n);
      case he:
        break;
      case ue:
        return db(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Yl(e) {
    e.flags |= Xe;
  }
  function Cb(e) {
    e.flags |= Si, e.flags |= If;
  }
  var Db, Hm, Tb, jb;
  Db = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === V || r.tag === K)
        $C(e, r.stateNode);
      else if (r.tag !== A) {
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
      var l = t.stateNode, o = Ap(), u = IC(l, n, i, a, r, o);
      t.updateQueue = u, u && Yl(t);
    }
  }, jb = function(e, t, n, a) {
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = I, a = Ce;
    if (t) {
      if ((e.mode & nt) !== xe) {
        for (var u = e.selfBaseDuration, p = e.child; p !== null; )
          n = ke(n, ke(p.lanes, p.childLanes)), a |= p.subtreeFlags & dr, a |= p.flags & dr, u += p.treeBaseDuration, p = p.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = ke(n, ke(v.lanes, v.childLanes)), a |= v.subtreeFlags & dr, a |= v.flags & dr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & nt) !== xe) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = ke(n, ke(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = ke(n, ke(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function ST(e, t, n) {
    if (lD() && (t.mode & Ye) !== xe && (t.flags & Je) === Ce)
      return iy(t), Ml(), t.flags |= cr | bs | jn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (rD(t), an(t), (t.mode & nt) !== xe) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ml(), (t.flags & Je) === Ce && (t.memoizedState = null), t.flags |= Xe, an(t), (t.mode & nt) !== xe) {
          var l = n !== null;
          if (l) {
            var o = t.child;
            o !== null && (t.treeBaseDuration -= o.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return ly(), !0;
  }
  function wb(e, t, n) {
    var a = t.pendingProps;
    switch (dp(t), t.tag) {
      case _:
      case Ue:
      case $:
      case D:
      case Y:
      case de:
      case ne:
      case G:
      case me:
      case ve:
        return an(t), null;
      case T: {
        var r = t.type;
        return Ia(r) && nc(t), an(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (Ul(t), up(t), Fp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = uc(t);
          if (l)
            Yl(t);
          else if (e !== null) {
            var o = e.memoizedState;
            // Check if this is a client root
            (!o.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== Ce) && (t.flags |= dl, ly());
          }
        }
        return Hm(e, t), an(t), null;
      }
      case V: {
        Vp(t);
        var u = Ey(), p = t.type;
        if (e !== null && t.stateNode != null)
          Tb(e, t, p, a, u), e.ref !== t.ref && Cb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return an(t), null;
          }
          var v = Ap(), S = uc(t);
          if (S)
            nD(t, u, v) && Yl(t);
          else {
            var E = PC(p, a, u, v, t);
            Db(E, t, !1, !1), t.stateNode = E, YC(E, p, a, u) && Yl(t);
          }
          t.ref !== null && Cb(t);
        }
        return an(t), null;
      }
      case K: {
        var O = a;
        if (e && t.stateNode != null) {
          var M = e.memoizedProps;
          jb(e, t, M, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var F = Ey(), te = Ap(), Ee = uc(t);
          Ee ? aD(t) && Yl(t) : t.stateNode = qC(O, F, te, t);
        }
        return an(t), null;
      }
      case B: {
        Fl(t);
        var pe = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = ST(e, t, pe);
          if (!qe)
            return t.flags & jn ? t : null;
        }
        if ((t.flags & Je) !== Ce)
          return t.lanes = n, (t.mode & nt) !== xe && cm(t), t;
        var Be = pe !== null, j = e !== null && e.memoizedState !== null;
        if (Be !== j && Be) {
          var H = t.child;
          if (H.flags |= xi, (t.mode & Ye) !== xe) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(Da.current, Ry) ? xj() : rv();
          }
        }
        var Q = t.updateQueue;
        if (Q !== null && (t.flags |= Xe), an(t), (t.mode & nt) !== xe && Be) {
          var oe = t.child;
          oe !== null && (t.treeBaseDuration -= oe.treeBaseDuration);
        }
        return null;
      }
      case A:
        return Ul(t), Hm(e, t), e === null && F0(t.stateNode.containerInfo), an(t), null;
      case q:
        var ae = t.type._context;
        return Dp(ae, t), an(t), null;
      case ce: {
        var De = t.type;
        return Ia(De) && nc(t), an(t), null;
      }
      case U: {
        Fl(t);
        var Le = t.memoizedState;
        if (Le === null)
          return an(t), null;
        var rt = (t.flags & Je) !== Ce, We = Le.rendering;
        if (We === null)
          if (rt)
            Lu(Le, !1);
          else {
            var Rt = Cj() && (e === null || (e.flags & Je) === Ce);
            if (!Rt)
              for (var Qe = t.child; Qe !== null; ) {
                var xt = Rc(Qe);
                if (xt !== null) {
                  rt = !0, t.flags |= Je, Lu(Le, !1);
                  var yn = xt.updateQueue;
                  return yn !== null && (t.updateQueue = yn, t.flags |= Xe), t.subtreeFlags = Ce, pD(t, n), Kr(t, Up(Da.current, bu)), t.child;
                }
                Qe = Qe.sibling;
              }
            Le.tail !== null && It() > Kb() && (t.flags |= Je, rt = !0, Lu(Le, !1), t.lanes = jh);
          }
        else {
          if (!rt) {
            var sn = Rc(We);
            if (sn !== null) {
              t.flags |= Je, rt = !0;
              var Zn = sn.updateQueue;
              if (Zn !== null && (t.updateQueue = Zn, t.flags |= Xe), Lu(Le, !0), Le.tail === null && Le.tailMode === "hidden" && !We.alternate && !tn())
                return an(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            It() * 2 - Le.renderingStartTime > Kb() && n !== qn && (t.flags |= Je, rt = !0, Lu(Le, !1), t.lanes = jh);
          }
          if (Le.isBackwards)
            We.sibling = t.child, t.child = We;
          else {
            var Ln = Le.last;
            Ln !== null ? Ln.sibling = We : t.child = We, Le.last = We;
          }
        }
        if (Le.tail !== null) {
          var Mn = Le.tail;
          Le.rendering = Mn, Le.tail = Mn.sibling, Le.renderingStartTime = It(), Mn.sibling = null;
          var bn = Da.current;
          return rt ? bn = Up(bn, bu) : bn = zl(bn), Kr(t, bn), Mn;
        }
        return an(t), null;
      }
      case he:
        break;
      case ue:
      case ge: {
        av(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, Za = Wu !== null;
          Za !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Nn && (t.flags |= xi);
        }
        return !Jl || (t.mode & Ye) === xe ? an(t) : Gn(Ja, qn) && (an(t), t.subtreeFlags & (Tt | Xe) && (t.flags |= xi)), null;
      }
      case Ae:
        return null;
      case _e:
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
        return r & jn ? (t.flags = r & ~jn | Je, (t.mode & nt) !== xe && cm(t), t) : null;
      }
      case x: {
        t.stateNode, Ul(t), up(t), Fp();
        var i = t.flags;
        return (i & jn) !== Ce && (i & Je) === Ce ? (t.flags = i & ~jn | Je, t) : null;
      }
      case V:
        return Vp(t), null;
      case B: {
        Fl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ml();
        }
        var o = t.flags;
        return o & jn ? (t.flags = o & ~jn | Je, (t.mode & nt) !== xe && cm(t), t) : null;
      }
      case U:
        return Fl(t), null;
      case A:
        return Ul(t), null;
      case q:
        var u = t.type._context;
        return Dp(u, t), null;
      case ue:
      case ge:
        return av(t), null;
      case Ae:
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
      case x: {
        t.stateNode, Ul(t), up(t), Fp();
        break;
      }
      case V: {
        Vp(t);
        break;
      }
      case A:
        Ul(t);
        break;
      case B:
        Fl(t);
        break;
      case U:
        Fl(t);
        break;
      case q:
        var r = t.type._context;
        Dp(r, t);
        break;
      case ue:
      case ge:
        av(t);
        break;
    }
  }
  var Ob = null;
  Ob = /* @__PURE__ */ new Set();
  var Wc = !1, rn = !1, RT = typeof WeakSet == "function" ? WeakSet : Set, se = null, Il = null, ql = null;
  function CT(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var DT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nt)
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
      lt(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      DT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function TT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      lt(e, t, a);
    }
  }
  function Mb(e, t) {
    try {
      Vb(e);
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
          if (En && er && e.mode & nt)
            try {
              Ka(), a = n(null);
            } finally {
              Qa(e);
            }
          else
            a = n(null);
        } catch (r) {
          lt(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
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
  var Ab = !1;
  function jT(e, t) {
    HC(e.containerInfo), se = t, wT();
    var n = Ab;
    return Ab = !1, n;
  }
  function wT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      (e.subtreeFlags & Wf) !== Ce && t !== null ? (t.return = e, se = t) : _T();
    }
  }
  function _T() {
    for (; se !== null; ) {
      var e = se;
      mt(e);
      try {
        OT(e);
      } catch (n) {
        lt(e, e.return, n);
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
  function OT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & dl) !== Ce) {
      switch (mt(e), e.tag) {
        case D:
        case Y:
        case $:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !$i && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : ja(e.type, a), r);
            {
              var o = Ob;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Me(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case x: {
          {
            var u = e.stateNode;
            f0(u.containerInfo);
          }
          break;
        }
        case V:
        case K:
        case A:
        case ce:
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
          l.destroy = void 0, o !== void 0 && ((e & nn) !== Hn ? qS(t) : (e & Mt) !== Hn && xh(t), (e & qa) !== Hn && Iu(!0), Qc(t, n, o), (e & qa) !== Hn && Iu(!1), (e & nn) !== Hn ? GS() : (e & Mt) !== Hn && Rh());
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
          (e & nn) !== Hn ? YS(t) : (e & Mt) !== Hn && WS(t);
          var l = i.create;
          (e & qa) !== Hn && Iu(!0), i.destroy = l(), (e & qa) !== Hn && Iu(!1), (e & nn) !== Hn ? IS() : (e & Mt) !== Hn && QS();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var u = void 0;
              (i.tag & Mt) !== Ce ? u = "useLayoutEffect" : (i.tag & qa) !== Ce ? u = "useInsertionEffect" : u = "useEffect";
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
  function LT(e, t) {
    if ((t.flags & Xe) !== Ce)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Ky(), o = t.alternate === null ? "mount" : "update";
          Qy() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case x:
                var p = u.stateNode;
                p.passiveEffectDuration += n;
                break e;
              case G:
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
  function MT(e, t, n, a) {
    if ((n.flags & To) !== Ce)
      switch (n.tag) {
        case D:
        case Y:
        case $: {
          if (!rn)
            if (n.mode & nt)
              try {
                Ka(), Zr(Mt | Lt, n);
              } finally {
                Qa(n);
              }
            else
              Zr(Mt | Lt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Xe && !rn)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), n.mode & nt)
                try {
                  Ka(), r.componentDidMount();
                } finally {
                  Qa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : ja(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), n.mode & nt)
                try {
                  Ka(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Qa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), Ny(n, o, r));
          break;
        }
        case x: {
          var u = n.updateQueue;
          if (u !== null) {
            var p = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case V:
                  p = n.child.stateNode;
                  break;
                case T:
                  p = n.child.stateNode;
                  break;
              }
            Ny(n, u, p);
          }
          break;
        }
        case V: {
          var v = n.stateNode;
          if (t === null && n.flags & Xe) {
            var S = n.type, E = n.memoizedProps;
            XC(v, S, E);
          }
          break;
        }
        case K:
          break;
        case A:
          break;
        case G: {
          {
            var O = n.memoizedProps, M = O.onCommit, F = O.onRender, te = n.stateNode.effectDuration, Ee = Ky(), pe = t === null ? "mount" : "update";
            Qy() && (pe = "nested-update"), typeof F == "function" && F(n.memoizedProps.id, pe, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof M == "function" && M(n.memoizedProps.id, pe, te, Ee), _j(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case x:
                    var Be = qe.stateNode;
                    Be.effectDuration += te;
                    break e;
                  case G:
                    var j = qe.stateNode;
                    j.effectDuration += te;
                    break e;
                }
                qe = qe.return;
              }
            }
          }
          break;
        }
        case B: {
          BT(e, n);
          break;
        }
        case U:
        case ce:
        case he:
        case ue:
        case ge:
        case _e:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    rn || n.flags & Si && Vb(n);
  }
  function AT(e) {
    switch (e.tag) {
      case D:
      case Y:
      case $: {
        if (e.mode & nt)
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
        typeof t.componentDidMount == "function" && TT(e, e.return, t), Mb(e, e.return);
        break;
      }
      case V: {
        Mb(e, e.return);
        break;
      }
    }
  }
  function VT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === V) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? o0(r) : s0(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === K) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? u0(i) : c0(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === ue || a.tag === ge) && a.memoizedState !== null && a !== e)) {
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
  function Vb(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case V:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & nt)
          try {
            Ka(), r = t(a);
          } finally {
            Qa(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Me(e)), t.current = a;
    }
  }
  function kT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function kb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, kb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === V) {
        var n = e.stateNode;
        n !== null && P0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function UT(e) {
    for (var t = e.return; t !== null; ) {
      if (Ub(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ub(e) {
    return e.tag === V || e.tag === x || e.tag === A;
  }
  function zb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ub(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== V && t.tag !== K && t.tag !== re; ) {
        if (t.flags & Tt || t.child === null || t.tag === A)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Tt))
        return t.stateNode;
    }
  }
  function zT(e) {
    var t = UT(e);
    switch (t.tag) {
      case V: {
        var n = t.stateNode;
        t.flags & Do && (Hg(n), t.flags &= ~Do);
        var a = zb(e);
        $m(e, a, n);
        break;
      }
      case x:
      case A: {
        var r = t.stateNode.containerInfo, i = zb(e);
        Pm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Pm(e, t, n) {
    var a = e.tag, r = a === V || a === K;
    if (r) {
      var i = e.stateNode;
      t ? a0(n, i, t) : t0(n, i);
    } else if (a !== A) {
      var l = e.child;
      if (l !== null) {
        Pm(l, t, n);
        for (var o = l.sibling; o !== null; )
          Pm(o, t, n), o = o.sibling;
      }
    }
  }
  function $m(e, t, n) {
    var a = e.tag, r = a === V || a === K;
    if (r) {
      var i = e.stateNode;
      t ? n0(n, i, t) : e0(n, i);
    } else if (a !== A) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var o = l.sibling; o !== null; )
          $m(o, t, n), o = o.sibling;
      }
    }
  }
  var ln = null, Oa = !1;
  function FT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case V: {
            ln = a.stateNode, Oa = !1;
            break e;
          }
          case x: {
            ln = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
          case A: {
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
    kT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      Fb(e, t, a), a = a.sibling;
  }
  function Fb(e, t, n) {
    switch (HS(n), n.tag) {
      case V:
        rn || Gl(n, t);
      case K: {
        {
          var a = ln, r = Oa;
          ln = null, ei(e, t, n), ln = a, Oa = r, ln !== null && (Oa ? i0(ln, n.stateNode) : r0(ln, n.stateNode));
        }
        return;
      }
      case re: {
        ln !== null && (Oa ? l0(ln, n.stateNode) : ep(ln, n.stateNode));
        return;
      }
      case A: {
        {
          var i = ln, l = Oa;
          ln = n.stateNode.containerInfo, Oa = !0, ei(e, t, n), ln = i, Oa = l;
        }
        return;
      }
      case D:
      case Y:
      case ve:
      case $: {
        if (!rn) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var p = u.next, v = p;
              do {
                var S = v, E = S.destroy, O = S.tag;
                E !== void 0 && ((O & qa) !== Hn ? Qc(n, t, E) : (O & Mt) !== Hn && (xh(n), n.mode & nt ? (Ka(), Qc(n, t, E), Qa(n)) : Qc(n, t, E), Rh())), v = v.next;
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
          var M = n.stateNode;
          typeof M.componentWillUnmount == "function" && Bm(n, t, M);
        }
        ei(e, t, n);
        return;
      }
      case he: {
        ei(e, t, n);
        return;
      }
      case ue: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ye
        ) {
          var F = rn;
          rn = F || n.memoizedState !== null, ei(e, t, n), rn = F;
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
  function HT(e) {
    e.memoizedState;
  }
  function BT(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && C0(i);
        }
      }
    }
  }
  function Hb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new RT()), t.forEach(function(a) {
        var r = Uj.bind(null, e, a);
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
  function PT(e, t, n) {
    Il = n, ql = e, mt(t), Bb(t, e), mt(t), Il = null, ql = null;
  }
  function La(e, t, n) {
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
        mt(o), Bb(o, e), o = o.sibling;
    mt(l);
  }
  function Bb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case D:
      case Y:
      case ve:
      case $: {
        if (La(t, e), Xa(e), r & Xe) {
          try {
            _a(qa | Lt, e, e.return), Zr(qa | Lt, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Ka(), _a(Mt | Lt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Qa(e);
          } else
            try {
              _a(Mt | Lt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case T: {
        La(t, e), Xa(e), r & Si && a !== null && Gl(a, a.return);
        return;
      }
      case V: {
        La(t, e), Xa(e), r & Si && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              Hg(i);
            } catch (De) {
              lt(e, e.return, De);
            }
          }
          if (r & Xe) {
            var l = e.stateNode;
            if (l != null) {
              var o = e.memoizedProps, u = a !== null ? a.memoizedProps : o, p = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  JC(l, v, p, u, o, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case K: {
        if (La(t, e), Xa(e), r & Xe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var S = e.stateNode, E = e.memoizedProps, O = a !== null ? a.memoizedProps : E;
          try {
            ZC(S, O, E);
          } catch (De) {
            lt(e, e.return, De);
          }
        }
        return;
      }
      case x: {
        if (La(t, e), Xa(e), r & Xe && a !== null) {
          var M = a.memoizedState;
          if (M.isDehydrated)
            try {
              R0(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case A: {
        La(t, e), Xa(e);
        return;
      }
      case B: {
        La(t, e), Xa(e);
        var F = e.child;
        if (F.flags & xi) {
          var te = F.stateNode, Ee = F.memoizedState, pe = Ee !== null;
          if (te.isHidden = pe, pe) {
            var qe = F.alternate !== null && F.alternate.memoizedState !== null;
            qe || Sj();
          }
        }
        if (r & Xe) {
          try {
            HT(e);
          } catch (De) {
            lt(e, e.return, De);
          }
          Hb(e);
        }
        return;
      }
      case ue: {
        var Be = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ye
        ) {
          var j = rn;
          rn = j || Be, La(t, e), rn = j;
        } else
          La(t, e);
        if (Xa(e), r & xi) {
          var H = e.stateNode, w = e.memoizedState, Q = w !== null, oe = e;
          if (H.isHidden = Q, Q && !Be && (oe.mode & Ye) !== xe) {
            se = oe;
            for (var ae = oe.child; ae !== null; )
              se = ae, YT(ae), ae = ae.sibling;
          }
          VT(oe, Q);
        }
        return;
      }
      case U: {
        La(t, e), Xa(e), r & Xe && Hb(e);
        return;
      }
      case he:
        return;
      default: {
        La(t, e), Xa(e);
        return;
      }
    }
  }
  function Xa(e) {
    var t = e.flags;
    if (t & Tt) {
      try {
        zT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~Tt;
    }
    t & fr && (e.flags &= ~fr);
  }
  function $T(e, t, n) {
    Il = n, ql = t, se = e, Pb(e, t, n), Il = null, ql = null;
  }
  function Pb(e, t, n) {
    for (var a = (e.mode & Ye) !== xe; se !== null; ) {
      var r = se, i = r.child;
      if (r.tag === ue && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var u = r.alternate, p = u !== null && u.memoizedState !== null, v = p || rn, S = Wc, E = rn;
          Wc = o, rn = v, rn && !E && (se = r, IT(r));
          for (var O = i; O !== null; )
            se = O, Pb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          se = r, Wc = S, rn = E, Ym(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ce && i !== null ? (i.return = r, se = i) : Ym(e, t, n);
    }
  }
  function Ym(e, t, n) {
    for (; se !== null; ) {
      var a = se;
      if ((a.flags & To) !== Ce) {
        var r = a.alternate;
        mt(a);
        try {
          MT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
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
  function YT(e) {
    for (; se !== null; ) {
      var t = se, n = t.child;
      switch (t.tag) {
        case D:
        case Y:
        case ve:
        case $: {
          if (t.mode & nt)
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
        case V: {
          Gl(t, t.return);
          break;
        }
        case ue: {
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
  function IT(e) {
    for (; se !== null; ) {
      var t = se, n = t.child;
      if (t.tag === ue) {
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
        AT(t);
      } catch (a) {
        lt(t, t.return, a);
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
  function qT(e, t, n, a) {
    se = t, GT(t, e, n, a);
  }
  function GT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se, i = r.child;
      (r.subtreeFlags & pl) !== Ce && i !== null ? (i.return = r, se = i) : WT(e, t, n, a);
    }
  }
  function WT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se;
      if ((r.flags & Vr) !== Ce) {
        mt(r);
        try {
          QT(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
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
  function QT(e, t, n, a) {
    switch (t.tag) {
      case D:
      case Y:
      case $: {
        if (t.mode & nt) {
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
  function KT(e) {
    se = e, XT();
  }
  function XT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      if ((se.flags & Ei) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            se = r, ej(r, e);
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
      (e.subtreeFlags & pl) !== Ce && t !== null ? (t.return = e, se = t) : JT();
    }
  }
  function JT() {
    for (; se !== null; ) {
      var e = se;
      (e.flags & Vr) !== Ce && (mt(e), ZT(e), Yt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, se = t;
        return;
      }
      se = e.return;
    }
  }
  function ZT(e) {
    switch (e.tag) {
      case D:
      case Y:
      case $: {
        e.mode & nt ? (sm(), _a(nn | Lt, e, e.return), um(e)) : _a(nn | Lt, e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (; se !== null; ) {
      var n = se;
      mt(n), nj(n, t), Yt();
      var a = n.child;
      a !== null ? (a.return = n, se = a) : tj(e);
    }
  }
  function tj(e) {
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
  function nj(e, t) {
    switch (e.tag) {
      case D:
      case Y:
      case $: {
        e.mode & nt ? (sm(), _a(nn, e, t), um(e)) : _a(nn, e, t);
        break;
      }
    }
  }
  function aj(e) {
    switch (e.tag) {
      case D:
      case Y:
      case $: {
        try {
          Zr(Mt | Lt, e);
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
  function rj(e) {
    switch (e.tag) {
      case D:
      case Y:
      case $: {
        try {
          Zr(nn | Lt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function ij(e) {
    switch (e.tag) {
      case D:
      case Y:
      case $: {
        try {
          _a(Mt | Lt, e, e.return);
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
  function lj(e) {
    switch (e.tag) {
      case D:
      case Y:
      case $:
        try {
          _a(nn | Lt, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Mu = Symbol.for;
    Mu("selector.component"), Mu("selector.has_pseudo_class"), Mu("selector.role"), Mu("selector.test_id"), Mu("selector.text");
  }
  var oj = [];
  function uj() {
    oj.forEach(function(e) {
      return e();
    });
  }
  var sj = h.ReactCurrentActQueue;
  function cj(e) {
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
      return !e && sj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var fj = Math.ceil, Im = h.ReactCurrentDispatcher, qm = h.ReactCurrentOwner, on = h.ReactCurrentBatchConfig, Ma = h.ReactCurrentActQueue, kt = (
    /*             */
    0
  ), qb = (
    /*               */
    1
  ), un = (
    /*                */
    2
  ), ca = (
    /*                */
    4
  ), xr = 0, Au = 1, Yi = 2, Kc = 3, Vu = 4, Gb = 5, Gm = 6, Ie = kt, _n = null, bt = null, Ut = I, Ja = I, Wm = Yr(I), zt = xr, ku = null, Xc = I, Uu = I, Jc = I, zu = null, Bn = null, Qm = 0, Wb = 500, Qb = 1 / 0, dj = 500, Rr = null;
  function Fu() {
    Qb = It() + dj;
  }
  function Kb() {
    return Qb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ti = null, Hu = I, Xm = [], Jm = null, pj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, mj = 50, Ql = 0, tf = null, Pu = st, nf = I, Xb = !1;
  function af() {
    return _n;
  }
  function On() {
    return (Ie & (un | ca)) !== kt ? It() : (Pu !== st || (Pu = It()), Pu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Ye) === xe)
      return je;
    if ((Ie & un) !== kt && Ut !== I)
      return Ao(Ut);
    var n = sD() !== uD;
    if (n) {
      if (on.transition !== null) {
        var a = on.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Gt && (nf = Lh()), nf;
    }
    var r = Sa();
    if (r !== Gt)
      return r;
    var i = GC();
    return i;
  }
  function vj(e) {
    var t = e.mode;
    return (t & Ye) === xe ? je : gx();
  }
  function Ft(e, t, n, a) {
    Fj(), Xb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Vo(e, n, a), (Ie & un) !== I && e === _n ? Pj(t) : (Ea && Vh(e, t, n), $j(t), e === _n && ((Ie & un) === kt && (Uu = ke(Uu, n)), zt === Vu && ai(e, Ut)), Pn(e, a), n === je && Ie === kt && (t.mode & Ye) === xe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Ma.isBatchingLegacy && (Fu(), Xg()));
  }
  function hj(e, t, n) {
    var a = e.current;
    a.lanes = t, Vo(e, t, n), Pn(e, n);
  }
  function gj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & un) !== kt
    );
  }
  function Pn(e, t) {
    var n = e.callbackNode;
    fx(e, t);
    var a = Rs(e, e === _n ? Ut : I);
    if (a === I) {
      n !== null && pN(n), e.callbackNode = null, e.callbackPriority = Gt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Ma.current !== null && n !== ov)) {
      n == null && i !== je && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && pN(n);
    var l;
    if (r === je)
      e.tag === Ir ? (Ma.isBatchingLegacy !== null && (Ma.didScheduleLegacyUpdate = !0), I0(eN.bind(null, e))) : Kg(eN.bind(null, e)), Ma.current !== null ? Ma.current.push(qr) : QC(function() {
        (Ie & (un | ca)) === kt && qr();
      }), l = null;
    else {
      var o;
      switch (zh(a)) {
        case Wn:
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
    if (VD(), Pu = st, nf = I, (Ie & (un | ca)) !== kt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === _n ? Ut : I);
    if (r === I)
      return null;
    var i = !Cs(e, r) && !hx(e, r) && !t, l = i ? Tj(e, r) : lf(e, r);
    if (l !== xr) {
      if (l === Yi) {
        var o = bd(e);
        o !== I && (r = o, l = tv(e, o));
      }
      if (l === Au) {
        var u = ku;
        throw qi(e, I), ai(e, r), Pn(e, It()), u;
      }
      if (l === Gm)
        ai(e, r);
      else {
        var p = !Cs(e, r), v = e.current.alternate;
        if (p && !bj(v)) {
          if (l = lf(e, r), l === Yi) {
            var S = bd(e);
            S !== I && (r = S, l = tv(e, S));
          }
          if (l === Au) {
            var E = ku;
            throw qi(e, I), ai(e, r), Pn(e, It()), E;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, yj(e, l, r);
      }
    }
    return Pn(e, It()), e.callbackNode === n ? Jb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = zu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= cr, z0(e.containerInfo);
    }
    var r = lf(e, t);
    if (r !== Yi) {
      var i = Bn;
      Bn = n, i !== null && Zb(i);
    }
    return r;
  }
  function Zb(e) {
    Bn === null ? Bn = e : Bn.push.apply(Bn, e);
  }
  function yj(e, t, n) {
    switch (t) {
      case xr:
      case Au:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, Bn, Rr);
        break;
      }
      case Kc: {
        if (ai(e, n), _h(n) && // do not delay if we're inside an act() scope
        !mN()) {
          var a = Qm + Wb - It();
          if (a > 10) {
            var r = Rs(e, I);
            if (r !== I)
              break;
            var i = e.suspendedLanes;
            if (!bl(i, n)) {
              On(), Ah(e, i);
              break;
            }
            e.timeoutHandle = Jd(Gi.bind(null, e, Bn, Rr), a);
            break;
          }
        }
        Gi(e, Bn, Rr);
        break;
      }
      case Vu: {
        if (ai(e, n), vx(n))
          break;
        if (!mN()) {
          var l = sx(e, n), o = l, u = It() - o, p = zj(u) - u;
          if (p > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, Bn, Rr), p);
            break;
          }
        }
        Gi(e, Bn, Rr);
        break;
      }
      case Gb: {
        Gi(e, Bn, Rr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function bj(e) {
    for (var t = e; ; ) {
      if (t.flags & $f) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, o = i.value;
              try {
                if (!Kn(l(), o))
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
    t = Ds(t, Jc), t = Ds(t, Uu), bx(e, t);
  }
  function eN(e) {
    if (kD(), (Ie & (un | ca)) !== kt)
      throw new Error("Should not already be working.");
    Dr();
    var t = Rs(e, I);
    if (!Gn(t, je))
      return Pn(e, It()), null;
    var n = lf(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = bd(e);
      a !== I && (t = a, n = tv(e, a));
    }
    if (n === Au) {
      var r = ku;
      throw qi(e, I), ai(e, t), Pn(e, It()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, Bn, Rr), Pn(e, It()), null;
  }
  function Nj(e, t) {
    t !== I && (xd(e, ke(t, je)), Pn(e, It()), (Ie & (un | ca)) === kt && (Fu(), qr()));
  }
  function nv(e, t) {
    var n = Ie;
    Ie |= qb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === kt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Ma.isBatchingLegacy && (Fu(), Xg());
    }
  }
  function Ej(e, t, n, a, r) {
    var i = Sa(), l = on.transition;
    try {
      return on.transition = null, Wt(Wn), e(t, n, a, r);
    } finally {
      Wt(i), on.transition = l, Ie === kt && Fu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && (Ie & (un | ca)) === kt && Dr();
    var t = Ie;
    Ie |= qb;
    var n = on.transition, a = Sa();
    try {
      return on.transition = null, Wt(Wn), e ? e() : void 0;
    } finally {
      Wt(a), on.transition = n, Ie = t, (Ie & (un | ca)) === kt && qr();
    }
  }
  function tN() {
    return (Ie & (un | ca)) !== kt;
  }
  function rf(e, t) {
    hn(Wm, Ja, e), Ja = ke(Ja, t);
  }
  function av(e) {
    Ja = Wm.current, vn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = I;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, WC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        _b(r, a), a = a.return;
      }
    _n = e;
    var i = Wi(e.current, null);
    return bt = i, Ut = Ja = t, zt = xr, ku = null, Xc = I, Uu = I, Jc = I, zu = null, Bn = null, hD(), Ca.discardPendingWarnings(), i;
  }
  function nN(e, t) {
    do {
      var n = bt;
      try {
        if (mc(), Dy(), Yt(), qm.current = null, n === null || n.return === null) {
          zt = Au, ku = t, bt = null;
          return;
        }
        if (En && n.mode & nt && $c(n, !0), pa)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            XS(n, a, Ut);
          } else
            KS(n, t, Ut);
        ID(e, n.return, n, t, Ut), lN(n);
      } catch (r) {
        t = r, bt === n && n !== null ? (n = n.return, bt = n) : n = bt;
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
  function Sj() {
    Qm = It();
  }
  function $u(e) {
    Xc = ke(e, Xc);
  }
  function xj() {
    zt === xr && (zt = Kc);
  }
  function rv() {
    (zt === xr || zt === Kc || zt === Yi) && (zt = Vu), _n !== null && (Nd(Xc) || Nd(Uu)) && ai(_n, Ut);
  }
  function Rj(e) {
    zt !== Vu && (zt = Yi), zu === null ? zu = [e] : zu.push(e);
  }
  function Cj() {
    return zt === xr;
  }
  function lf(e, t) {
    var n = Ie;
    Ie |= un;
    var a = aN();
    if (_n !== e || Ut !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ut), r.clear()), kh(e, t);
      }
      Rr = Uh(), qi(e, t);
    }
    Ch(t);
    do
      try {
        Dj();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    if (mc(), Ie = n, rN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Dh(), _n = null, Ut = I, zt;
  }
  function Dj() {
    for (; bt !== null; )
      iN(bt);
  }
  function Tj(e, t) {
    var n = Ie;
    Ie |= un;
    var a = aN();
    if (_n !== e || Ut !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ut), r.clear()), kh(e, t);
      }
      Rr = Uh(), Fu(), qi(e, t);
    }
    Ch(t);
    do
      try {
        jj();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    return mc(), rN(a), Ie = n, bt !== null ? (nx(), xr) : (Dh(), _n = null, Ut = I, zt);
  }
  function jj() {
    for (; bt !== null && !_S(); )
      iN(bt);
  }
  function iN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== xe ? (om(e), n = iv(t, e, Ja), $c(e, !0)) : n = iv(t, e, Ja), Yt(), e.memoizedProps = e.pendingProps, n === null ? lN(e) : bt = n, qm.current = null;
  }
  function lN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === xe ? r = wb(n, t, Ja) : (om(t), r = wb(n, t, Ja), $c(t, !1)), Yt(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = xT(n, t);
        if (i !== null) {
          i.flags &= RS, bt = i;
          return;
        }
        if ((t.mode & nt) !== xe) {
          $c(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= bs, a.subtreeFlags = Ce, a.deletions = null;
        else {
          zt = Gm, bt = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        bt = u;
        return;
      }
      t = a, bt = t;
    } while (t !== null);
    zt === xr && (zt = Gb);
  }
  function Gi(e, t, n) {
    var a = Sa(), r = on.transition;
    try {
      on.transition = null, Wt(Wn), wj(e, t, n, a);
    } finally {
      on.transition = r, Wt(a);
    }
    return null;
  }
  function wj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (Hj(), (Ie & (un | ca)) !== kt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if ($S(i), r === null)
      return Sh(), null;
    if (i === I && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = I, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Gt;
    var l = ke(r.lanes, r.childLanes);
    Nx(e, l), e === _n && (_n = null, bt = null, Ut = I), ((r.subtreeFlags & pl) !== Ce || (r.flags & pl) !== Ce) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Dr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ce, u = (r.flags & (Wf | Qf | To | pl)) !== Ce;
    if (o || u) {
      var p = on.transition;
      on.transition = null;
      var v = Sa();
      Wt(Wn);
      var S = Ie;
      Ie |= ca, qm.current = null, jT(e, r), Xy(), PT(e, r, i), BC(e.containerInfo), e.current = r, JS(i), $T(r, e, i), ZS(), OS(), Ie = S, Wt(v), on.transition = p;
    } else
      e.current = r, Xy();
    var E = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === I && (Wl = null), E || cN(e.current, !1), zS(r.stateNode, a), Ea && e.memoizedUpdaters.clear(), uj(), Pn(e, It()), t !== null)
      for (var O = e.onRecoverableError, M = 0; M < t.length; M++) {
        var F = t[M], te = F.stack, Ee = F.digest;
        O(F.value, {
          componentStack: te,
          digest: Ee
        });
      }
    if (Zc) {
      Zc = !1;
      var pe = Km;
      throw Km = null, pe;
    }
    return Gn(Hu, je) && e.tag !== Ir && Dr(), l = e.pendingLanes, Gn(l, je) ? (AD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, qr(), Sh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = zh(Hu), t = Rx(vr, e), n = on.transition, a = Sa();
      try {
        return on.transition = null, Wt(t), Oj();
      } finally {
        Wt(a), on.transition = n;
      }
    }
    return !1;
  }
  function _j(e) {
    Xm.push(e), Ii || (Ii = !0, uv(Di, function() {
      return Dr(), null;
    }));
  }
  function Oj() {
    if (ti === null)
      return !1;
    var e = Jm;
    Jm = null;
    var t = ti, n = Hu;
    if (ti = null, Hu = I, (Ie & (un | ca)) !== kt)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, ex(n);
    var a = Ie;
    Ie |= ca, KT(t.current), qT(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        LT(t, l);
      }
    }
    tx(), cN(t.current, !0), Ie = a, qr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, FS(t);
    {
      var o = t.current.stateNode;
      o.effectDuration = 0, o.passiveEffectDuration = 0;
    }
    return !0;
  }
  function oN(e) {
    return Wl !== null && Wl.has(e);
  }
  function Lj(e) {
    Wl === null ? Wl = /* @__PURE__ */ new Set([e]) : Wl.add(e);
  }
  function Mj(e) {
    Zc || (Zc = !0, Km = e);
  }
  var Aj = Mj;
  function uN(e, t, n) {
    var a = Pi(n, t), r = ib(e, a, je), i = Wr(e, r, je), l = On();
    i !== null && (Vo(i, je, l), Pn(i, l));
  }
  function lt(e, t, n) {
    if (CT(n), Iu(!1), e.tag === x) {
      uN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        uN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !oN(i)) {
          var l = Pi(n, e), o = Cm(a, l, je), u = Wr(a, o, je), p = On();
          u !== null && (Vo(u, je, p), Pn(u, p));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Vj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = On();
    Ah(e, n), Yj(e), _n === e && bl(Ut, n) && (zt === Vu || zt === Kc && _h(Ut) && It() - Qm < Wb ? qi(e, I) : Jc = ke(Jc, n)), Pn(e, r);
  }
  function sN(e, t) {
    t === Gt && (t = vj(e));
    var n = On(), a = Fn(e, t);
    a !== null && (Vo(a, t, n), Pn(a, n));
  }
  function kj(e) {
    var t = e.memoizedState, n = Gt;
    t !== null && (n = t.retryLane), sN(e, n);
  }
  function Uj(e, t) {
    var n = Gt, a;
    switch (e.tag) {
      case B:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case U:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), sN(e, n);
  }
  function zj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : fj(e / 1960) * 1960;
  }
  function Fj() {
    if (Bu > pj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > mj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function Hj() {
    Ca.flushLegacyContextWarning(), Ca.flushPendingUnsafeLifecycleWarnings();
  }
  function cN(e, t) {
    mt(e), of(e, kr, ij), t && of(e, Gf, lj), of(e, kr, aj), t && of(e, Gf, rj), Yt();
  }
  function of(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ce ? a = a.child : ((a.flags & t) !== Ce && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var uf = null;
  function fN(e) {
    {
      if ((Ie & un) !== kt || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== _ && t !== x && t !== T && t !== D && t !== Y && t !== ve && t !== $)
        return;
      var n = Me(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = Cn;
      try {
        mt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : Yt();
      }
    }
  }
  var iv;
  {
    var Bj = null;
    iv = function(e, t, n) {
      var a = bN(Bj, t);
      try {
        return Rb(e, t, n);
      } catch (i) {
        if (Z0() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (mc(), Dy(), _b(e, t), bN(t, a), t.mode & nt && om(t), Bf(null, Rb, null, e, t, n), ES()) {
          var r = Pf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var dN = !1, lv;
  lv = /* @__PURE__ */ new Set();
  function Pj(e) {
    if (gi && !OD())
      switch (e.tag) {
        case D:
        case Y:
        case $: {
          var t = bt && Me(bt) || "Unknown", n = t;
          if (!lv.has(n)) {
            lv.add(n);
            var a = Me(e) || "Unknown";
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
        Vh(e, a, t);
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
      return wS(e);
  }
  function mN() {
    return Ma.current !== null;
  }
  function $j(e) {
    {
      if (e.mode & Ye) {
        if (!Ib())
          return;
      } else if (!cj() || Ie !== kt || e.tag !== D && e.tag !== Y && e.tag !== $)
        return;
      if (Ma.current === null) {
        var t = Cn;
        try {
          mt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Me(e));
        } finally {
          t ? mt(e) : Yt();
        }
      }
    }
  }
  function Yj(e) {
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
  var fa = null, Kl = null, Ij = function(e) {
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
              $$typeof: Ne,
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
        case D: {
          (typeof a == "function" || i === Se) && (r = !0);
          break;
        }
        case Y: {
          (i === Ne || i === Se) && (r = !0);
          break;
        }
        case ve:
        case $: {
          (i === Ve || i === Se) && (r = !0);
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
  var qj = function(e, t) {
    {
      if (fa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        fv(e.current, a, n);
      });
    }
  }, Gj = function(e, t) {
    {
      if (e.context !== Xn)
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
        case $:
        case T:
          u = o;
          break;
        case Y:
          u = o.render;
          break;
      }
      if (fa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var p = !1, v = !1;
      if (u !== null) {
        var S = fa(u);
        S !== void 0 && (n.has(S) ? v = !0 : t.has(S) && (l === T ? v = !0 : p = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || p) {
        var E = Fn(e, je);
        E !== null && Ft(E, e, je, st);
      }
      r !== null && !v && fv(r, t, n), i !== null && fv(i, t, n);
    }
  }
  var Wj = function(e, t) {
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
        case $:
        case T:
          o = l;
          break;
        case Y:
          o = l.render;
          break;
      }
      var u = !1;
      o !== null && t.has(o) && (u = !0), u ? Qj(e, n) : a !== null && dv(a, t, n), r !== null && dv(r, t, n);
    }
  }
  function Qj(e, t) {
    {
      var n = Kj(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case V:
            t.add(a.stateNode);
            return;
          case A:
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
  function Kj(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === V)
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
      var gN = Object.preventExtensions({});
    } catch {
      pv = !0;
    }
  }
  function Xj(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = I, this.childLanes = I, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Jn = function(e, t, n, a) {
    return new Xj(e, t, n, a);
  };
  function mv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function Jj(e) {
    return typeof e == "function" && !mv(e) && e.defaultProps === void 0;
  }
  function Zj(e) {
    if (typeof e == "function")
      return mv(e) ? T : D;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return Y;
      if (t === Ve)
        return ve;
    }
    return _;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Jn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case _:
      case D:
      case $:
        n.type = Xl(e.type);
        break;
      case T:
        n.type = sv(e.type);
        break;
      case Y:
        n.type = cv(e.type);
        break;
    }
    return n;
  }
  function e1(e, t) {
    e.flags &= dr | Tt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = I, e.lanes = t, e.child = null, e.subtreeFlags = Ce, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = Ce, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function t1(e, t, n) {
    var a;
    return e === rc ? (a = Ye, t === !0 && (a |= St, a |= Pa)) : a = xe, Ea && (a |= nt), Jn(x, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = _, o = e;
    if (typeof e == "function")
      mv(e) ? (l = T, o = sv(o)) : o = Xl(o);
    else if (typeof e == "string")
      l = V;
    else
      e: switch (e) {
        case za:
          return ri(n.children, r, i, t);
        case fi:
          l = ne, r |= St, (r & Ye) !== xe && (r |= Pa);
          break;
        case N:
          return n1(n, r, i, t);
        case Pe:
          return a1(n, r, i, t);
        case Te:
          return r1(n, r, i, t);
        case dt:
          return yN(n, r, i, t);
        case pn:
        case _t:
        case Fa:
        case ya:
        case ft:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case W:
                l = q;
                break e;
              case ee:
                l = me;
                break e;
              case Ne:
                l = Y, o = cv(o);
                break e;
              case Ve:
                l = ve;
                break e;
              case Se:
                l = Ue, o = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var p = a ? Me(a) : null;
            p && (u += `

Check the render method of \`` + p + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
        }
      }
    var v = Jn(l, n, t, r);
    return v.elementType = e, v.type = o, v.lanes = i, v._debugOwner = a, v;
  }
  function hv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vv(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ri(e, t, n, a) {
    var r = Jn(de, e, a, t);
    return r.lanes = n, r;
  }
  function n1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Jn(G, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function a1(e, t, n, a) {
    var r = Jn(B, e, a, t);
    return r.elementType = Pe, r.lanes = n, r;
  }
  function r1(e, t, n, a) {
    var r = Jn(U, e, a, t);
    return r.elementType = Te, r.lanes = n, r;
  }
  function yN(e, t, n, a) {
    var r = Jn(ue, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function gv(e, t, n) {
    var a = Jn(K, e, null, t);
    return a.lanes = n, a;
  }
  function i1() {
    var e = Jn(V, null, null, xe);
    return e.elementType = "DELETED", e;
  }
  function l1(e) {
    var t = Jn(re, null, null, xe);
    return t.stateNode = e, t;
  }
  function yv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Jn(A, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function bN(e, t) {
    return e === null && (e = Jn(_, null, null, xe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function o1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Gt, this.eventTimes = Sd(I), this.expirationTimes = Sd(st), this.pendingLanes = I, this.suspendedLanes = I, this.pingedLanes = I, this.expiredLanes = I, this.mutableReadLanes = I, this.finishedLanes = I, this.entangledLanes = I, this.entanglements = Sd(I), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
    var v = new o1(e, t, n, o, u), S = t1(t, i);
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
  function u1(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return ta(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: In,
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
      return Xn;
    var t = cl(e), n = Y0(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ia(a))
        return Wg(t, a, n);
    }
    return n;
  }
  function s1(e, t) {
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
      if (r.mode & St) {
        var i = Me(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = Cn;
          try {
            mt(r), n.mode & St ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? mt(l) : Yt();
          }
        }
      }
      return r.stateNode;
    }
  }
  function SN(e, t, n, a, r, i, l, o) {
    var u = !1, p = null;
    return NN(e, t, u, p, n, a, r, i, l);
  }
  function xN(e, t, n, a, r, i, l, o, u, p) {
    var v = !0, S = NN(n, a, v, e, r, i, l, o, u);
    S.context = EN(null);
    var E = S.current, O = On(), M = ni(E), F = Er(O, M);
    return F.callback = t ?? null, Wr(E, F, M), hj(S, M, O), S;
  }
  function qu(e, t, n, a) {
    US(t, e);
    var r = t.current, i = On(), l = ni(r);
    ax(l);
    var o = EN(n);
    t.context === null ? t.context = o : t.pendingContext = o, gi && Cn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Me(Cn) || "Unknown"));
    var u = Er(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var p = Wr(r, u, l);
    return p !== null && (Ft(p, r, l, i), bc(p, r, l)), l;
  }
  function sf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case V:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function c1(e) {
    switch (e.tag) {
      case x: {
        var t = e.stateNode;
        if (js(t)) {
          var n = dx(t);
          Nj(t, n);
        }
        break;
      }
      case B: {
        Cr(function() {
          var r = Fn(e, je);
          if (r !== null) {
            var i = On();
            Ft(r, e, je, i);
          }
        });
        var a = je;
        Sv(e, a);
        break;
      }
    }
  }
  function RN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = yx(n.retryLane, t));
  }
  function Sv(e, t) {
    RN(e, t);
    var n = e.alternate;
    n && RN(n, t);
  }
  function f1(e) {
    if (e.tag === B) {
      var t = Oo, n = Fn(e, t);
      if (n !== null) {
        var a = On();
        Ft(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function d1(e) {
    if (e.tag === B) {
      var t = ni(e), n = Fn(e, t);
      if (n !== null) {
        var a = On();
        Ft(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function CN(e) {
    var t = jS(e);
    return t === null ? null : t.stateNode;
  }
  var DN = function(e) {
    return null;
  };
  function p1(e) {
    return DN(e);
  }
  var TN = function(e) {
    return !1;
  };
  function m1(e) {
    return TN(e);
  }
  var jN = null, wN = null, _N = null, ON = null, LN = null, MN = null, AN = null, VN = null, kN = null;
  {
    var UN = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : Fe({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = UN(e[a], t, n + 1), r);
    }, zN = function(e, t) {
      return UN(e, t, 0);
    }, FN = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : Fe({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], He(i) ? i.splice(r, 1) : delete i[r];
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
        C("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            C("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return FN(e, t, n, 0);
    }, BN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : Fe({}, e);
      return i[r] = BN(e[r], t, n + 1, a), i;
    }, PN = function(e, t, n) {
      return BN(e, t, 0, n);
    }, xv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    jN = function(e, t, n, a) {
      var r = xv(e, t);
      if (r !== null) {
        var i = PN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Fe({}, e.memoizedProps);
        var l = Fn(e, je);
        l !== null && Ft(l, e, je, st);
      }
    }, wN = function(e, t, n) {
      var a = xv(e, t);
      if (a !== null) {
        var r = zN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Fe({}, e.memoizedProps);
        var i = Fn(e, je);
        i !== null && Ft(i, e, je, st);
      }
    }, _N = function(e, t, n, a) {
      var r = xv(e, t);
      if (r !== null) {
        var i = HN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Fe({}, e.memoizedProps);
        var l = Fn(e, je);
        l !== null && Ft(l, e, je, st);
      }
    }, ON = function(e, t, n) {
      e.pendingProps = PN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Fn(e, je);
      a !== null && Ft(a, e, je, st);
    }, LN = function(e, t) {
      e.pendingProps = zN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Fn(e, je);
      n !== null && Ft(n, e, je, st);
    }, MN = function(e, t, n) {
      e.pendingProps = HN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Fn(e, je);
      a !== null && Ft(a, e, je, st);
    }, AN = function(e) {
      var t = Fn(e, je);
      t !== null && Ft(t, e, je, st);
    }, VN = function(e) {
      DN = e;
    }, kN = function(e) {
      TN = e;
    };
  }
  function v1(e) {
    var t = yh(e);
    return t === null ? null : t.stateNode;
  }
  function h1(e) {
    return null;
  }
  function g1() {
    return Cn;
  }
  function y1(e) {
    var t = e.findFiberByHostInstance, n = h.ReactCurrentDispatcher;
    return kS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: jN,
      overrideHookStateDeletePath: wN,
      overrideHookStateRenamePath: _N,
      overrideProps: ON,
      overridePropsDeletePath: LN,
      overridePropsRenamePath: MN,
      setErrorHandler: VN,
      setSuspenseHandler: kN,
      scheduleUpdate: AN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: v1,
      findFiberByHostInstance: t || h1,
      // React Refresh
      findHostInstancesForRefresh: Wj,
      scheduleRefresh: qj,
      scheduleRoot: Gj,
      setRefreshHandler: Ij,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: g1,
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
      if (n.nodeType !== Dt) {
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
      }), $g(t);
    }
  };
  function b1(e, t) {
    if (!ff(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    YN(e);
    var n = !1, a = !1, r = "", i = $N;
    t != null && (t.hydrate ? C("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === aa && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = SN(e, rc, null, n, a, r, i);
    Xs(l.current, e);
    var o = e.nodeType === Dt ? e.parentNode : e;
    return Jo(o), new Rv(l);
  }
  function cf(e) {
    this._internalRoot = e;
  }
  function N1(e) {
    e && Vx(e);
  }
  cf.prototype.unstable_scheduleHydration = N1;
  function E1(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    YN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", u = $N;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var p = xN(t, null, e, rc, a, i, l, o, u);
    if (Xs(p.current, e), Jo(e), r)
      for (var v = 0; v < r.length; v++) {
        var S = r[v];
        CD(p, S);
      }
    return new cf(p);
  }
  function ff(e) {
    return !!(e && (e.nodeType === Un || e.nodeType === sr || e.nodeType === _f));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === Un || e.nodeType === sr || e.nodeType === _f || e.nodeType === Dt && e.nodeValue === " react-mount-point-unstable "));
  }
  function YN(e) {
    e.nodeType === Un && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var S1 = h.ReactCurrentOwner, IN;
  IN = function(e) {
    if (e._reactRootContainer && e.nodeType !== Dt) {
      var t = CN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Cv(e), r = !!(a && $r(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Un && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
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
        qN
      );
      e._reactRootContainer = l, Xs(l.current, e);
      var o = e.nodeType === Dt ? e.parentNode : e;
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
      var v = SN(
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
      var S = e.nodeType === Dt ? e.parentNode : e;
      return Jo(S), Cr(function() {
        qu(t, v, n, a);
      }), v;
    }
  }
  function R1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    IN(n), R1(r === void 0 ? null : r, "render");
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
  function C1(e) {
    {
      GN || (GN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = S1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ke(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Un ? e : s1(e, "findDOMNode");
  }
  function D1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function T1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function j1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !SS(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  var WN = !1;
  function w1(e) {
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
          e._reactRootContainer = null, $g(e);
        });
      }), !0;
    } else {
      {
        var r = Cv(e), i = !!(r && $r(r)), l = e.nodeType === Un && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  Cx(c1), Tx(f1), jx(d1), wx(Sa), _x(Sx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), fS(OC), mS(nv, Ej, Cr);
  function _1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return u1(e, t, null, n);
  }
  function O1(e, t, n, a) {
    return j1(e, t, n, a);
  }
  var Dv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$r, jl, Js, ih, lh, nv]
  };
  function L1(e, t) {
    return Dv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), b1(e, t);
  }
  function M1(e, t, n) {
    return Dv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), E1(e, t, n);
  }
  function A1(e) {
    return tN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var V1 = y1({
    findFiberByHostInstance: Mi,
    bundleType: 1,
    version: bv,
    rendererPackageName: "react-dom"
  });
  if (!V1 && Jt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var QN = window.location.protocol;
    /^(https?|file):$/.test(QN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (QN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, ea.createPortal = _1, ea.createRoot = L1, ea.findDOMNode = C1, ea.flushSync = A1, ea.hydrate = D1, ea.hydrateRoot = M1, ea.render = T1, ea.unmountComponentAtNode = w1, ea.unstable_batchedUpdates = nv, ea.unstable_renderSubtreeIntoContainer = O1, ea.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
cE.exports = ea;
var Y1 = cE.exports, pE, KN = Y1;
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
      for (var y in h)
        Object.prototype.hasOwnProperty.call(h, y) && (s[y] = h[y]);
    }
    return s;
  }, Qu.apply(this, arguments);
}
var li;
(function(s) {
  s.Pop = "POP", s.Push = "PUSH", s.Replace = "REPLACE";
})(li || (li = {}));
const JN = "popstate";
function I1(s) {
  s === void 0 && (s = {});
  function m(y, g) {
    let {
      pathname: C,
      search: f,
      hash: k
    } = y.location;
    return Ov(
      "",
      {
        pathname: C,
        search: f,
        hash: k
      },
      // state defaults to `null` because `window.history.state` does
      g.state && g.state.usr || null,
      g.state && g.state.key || "default"
    );
  }
  function h(y, g) {
    return typeof g == "string" ? g : Ku(g);
  }
  return G1(m, h, null, s);
}
function ht(s, m) {
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
function q1() {
  return Math.random().toString(36).substr(2, 8);
}
function ZN(s, m) {
  return {
    usr: s.state,
    key: s.key,
    idx: m
  };
}
function Ov(s, m, h, y) {
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
    key: m && m.key || y || q1()
  });
}
function Ku(s) {
  let {
    pathname: m = "/",
    search: h = "",
    hash: y = ""
  } = s;
  return h && h !== "?" && (m += h.charAt(0) === "?" ? h : "?" + h), y && y !== "#" && (m += y.charAt(0) === "#" ? y : "#" + y), m;
}
function eo(s) {
  let m = {};
  if (s) {
    let h = s.indexOf("#");
    h >= 0 && (m.hash = s.substr(h), s = s.substr(0, h));
    let y = s.indexOf("?");
    y >= 0 && (m.search = s.substr(y), s = s.substr(0, y)), s && (m.pathname = s);
  }
  return m;
}
function G1(s, m, h, y) {
  y === void 0 && (y = {});
  let {
    window: g = document.defaultView,
    v5Compat: C = !1
  } = y, f = g.history, k = li.Pop, D = null, T = _();
  T == null && (T = 0, f.replaceState(Qu({}, f.state, {
    idx: T
  }), ""));
  function _() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function x() {
    k = li.Pop;
    let ne = _(), me = ne == null ? null : ne - T;
    T = ne, D && D({
      action: k,
      location: de.location,
      delta: me
    });
  }
  function A(ne, me) {
    k = li.Push;
    let q = Ov(de.location, ne, me);
    T = _() + 1;
    let Y = ZN(q, T), G = de.createHref(q);
    try {
      f.pushState(Y, "", G);
    } catch (B) {
      if (B instanceof DOMException && B.name === "DataCloneError")
        throw B;
      g.location.assign(G);
    }
    C && D && D({
      action: k,
      location: de.location,
      delta: 1
    });
  }
  function V(ne, me) {
    k = li.Replace;
    let q = Ov(de.location, ne, me);
    T = _();
    let Y = ZN(q, T), G = de.createHref(q);
    f.replaceState(Y, "", G), C && D && D({
      action: k,
      location: de.location,
      delta: 0
    });
  }
  function K(ne) {
    let me = g.location.origin !== "null" ? g.location.origin : g.location.href, q = typeof ne == "string" ? ne : Ku(ne);
    return q = q.replace(/ $/, "%20"), ht(me, "No window.location.(origin|href) available to create URL for href: " + q), new URL(q, me);
  }
  let de = {
    get action() {
      return k;
    },
    get location() {
      return s(g, f);
    },
    listen(ne) {
      if (D)
        throw new Error("A history only accepts one active listener");
      return g.addEventListener(JN, x), D = ne, () => {
        g.removeEventListener(JN, x), D = null;
      };
    },
    createHref(ne) {
      return m(g, ne);
    },
    createURL: K,
    encodeLocation(ne) {
      let me = K(ne);
      return {
        pathname: me.pathname,
        search: me.search,
        hash: me.hash
      };
    },
    push: A,
    replace: V,
    go(ne) {
      return f.go(ne);
    }
  };
  return de;
}
var eE;
(function(s) {
  s.data = "data", s.deferred = "deferred", s.redirect = "redirect", s.error = "error";
})(eE || (eE = {}));
function W1(s, m, h) {
  return h === void 0 && (h = "/"), Q1(s, m, h);
}
function Q1(s, m, h, y) {
  let g = typeof m == "string" ? eo(m) : m, C = ui(g.pathname || "/", h);
  if (C == null)
    return null;
  let f = mE(s);
  K1(f);
  let k = null;
  for (let D = 0; k == null && D < f.length; ++D) {
    let T = ow(C);
    k = iw(f[D], T);
  }
  return k;
}
function mE(s, m, h, y) {
  m === void 0 && (m = []), h === void 0 && (h = []), y === void 0 && (y = "");
  let g = (C, f, k) => {
    let D = {
      relativePath: k === void 0 ? C.path || "" : k,
      caseSensitive: C.caseSensitive === !0,
      childrenIndex: f,
      route: C
    };
    D.relativePath.startsWith("/") && (ht(D.relativePath.startsWith(y), 'Absolute route path "' + D.relativePath + '" nested under path ' + ('"' + y + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), D.relativePath = D.relativePath.slice(y.length));
    let T = wr([y, D.relativePath]), _ = h.concat(D);
    C.children && C.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      C.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), mE(C.children, m, _, T)), !(C.path == null && !C.index) && m.push({
      path: T,
      score: aw(T, C.index),
      routesMeta: _
    });
  };
  return s.forEach((C, f) => {
    var k;
    if (C.path === "" || !((k = C.path) != null && k.includes("?")))
      g(C, f);
    else
      for (let D of vE(C.path))
        g(C, f, D);
  }), m;
}
function vE(s) {
  let m = s.split("/");
  if (m.length === 0) return [];
  let [h, ...y] = m, g = h.endsWith("?"), C = h.replace(/\?$/, "");
  if (y.length === 0)
    return g ? [C, ""] : [C];
  let f = vE(y.join("/")), k = [];
  return k.push(...f.map((D) => D === "" ? C : [C, D].join("/"))), g && k.push(...f), k.map((D) => s.startsWith("/") && D === "" ? "/" : D);
}
function K1(s) {
  s.sort((m, h) => m.score !== h.score ? h.score - m.score : rw(m.routesMeta.map((y) => y.childrenIndex), h.routesMeta.map((y) => y.childrenIndex)));
}
const X1 = /^:[\w-]+$/, J1 = 3, Z1 = 2, ew = 1, tw = 10, nw = -2, tE = (s) => s === "*";
function aw(s, m) {
  let h = s.split("/"), y = h.length;
  return h.some(tE) && (y += nw), m && (y += Z1), h.filter((g) => !tE(g)).reduce((g, C) => g + (X1.test(C) ? J1 : C === "" ? ew : tw), y);
}
function rw(s, m) {
  return s.length === m.length && s.slice(0, -1).every((y, g) => y === m[g]) ? (
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
function iw(s, m, h) {
  let {
    routesMeta: y
  } = s, g = {}, C = "/", f = [];
  for (let k = 0; k < y.length; ++k) {
    let D = y[k], T = k === y.length - 1, _ = C === "/" ? m : m.slice(C.length) || "/", x = Lv({
      path: D.relativePath,
      caseSensitive: D.caseSensitive,
      end: T
    }, _), A = D.route;
    if (!x)
      return null;
    Object.assign(g, x.params), f.push({
      // TODO: Can this as be avoided?
      params: g,
      pathname: wr([C, x.pathname]),
      pathnameBase: fw(wr([C, x.pathnameBase])),
      route: A
    }), x.pathnameBase !== "/" && (C = wr([C, x.pathnameBase]));
  }
  return f;
}
function Lv(s, m) {
  typeof s == "string" && (s = {
    path: s,
    caseSensitive: !1,
    end: !0
  });
  let [h, y] = lw(s.path, s.caseSensitive, s.end), g = m.match(h);
  if (!g) return null;
  let C = g[0], f = C.replace(/(.)\/+$/, "$1"), k = g.slice(1);
  return {
    params: y.reduce((T, _, x) => {
      let {
        paramName: A,
        isOptional: V
      } = _;
      if (A === "*") {
        let de = k[x] || "";
        f = C.slice(0, C.length - de.length).replace(/(.)\/+$/, "$1");
      }
      const K = k[x];
      return V && !K ? T[A] = void 0 : T[A] = (K || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: C,
    pathnameBase: f,
    pattern: s
  };
}
function lw(s, m, h) {
  m === void 0 && (m = !1), h === void 0 && (h = !0), Aa(s === "*" || !s.endsWith("*") || s.endsWith("/*"), 'Route path "' + s + '" will be treated as if it were ' + ('"' + s.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + s.replace(/\*$/, "/*") + '".'));
  let y = [], g = "^" + s.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, k, D) => (y.push({
    paramName: k,
    isOptional: D != null
  }), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return s.endsWith("*") ? (y.push({
    paramName: "*"
  }), g += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? g += "\\/*$" : s !== "" && s !== "/" && (g += "(?:(?=\\/|$))"), [new RegExp(g, m ? void 0 : "i"), y];
}
function ow(s) {
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
  let h = m.endsWith("/") ? m.length - 1 : m.length, y = s.charAt(h);
  return y && y !== "/" ? null : s.slice(h) || "/";
}
function uw(s, m) {
  m === void 0 && (m = "/");
  let {
    pathname: h,
    search: y = "",
    hash: g = ""
  } = typeof s == "string" ? eo(s) : s;
  return {
    pathname: h ? h.startsWith("/") ? h : sw(h, m) : m,
    search: dw(y),
    hash: pw(g)
  };
}
function sw(s, m) {
  let h = m.replace(/\/+$/, "").split("/");
  return s.split("/").forEach((g) => {
    g === ".." ? h.length > 1 && h.pop() : g !== "." && h.push(g);
  }), h.length > 1 ? h.join("/") : "/";
}
function Tv(s, m, h, y) {
  return "Cannot include a '" + s + "' character in a manually specified " + ("`to." + m + "` field [" + JSON.stringify(y) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function cw(s) {
  return s.filter((m, h) => h === 0 || m.route.path && m.route.path.length > 0);
}
function Av(s, m) {
  let h = cw(s);
  return m ? h.map((y, g) => g === h.length - 1 ? y.pathname : y.pathnameBase) : h.map((y) => y.pathnameBase);
}
function Vv(s, m, h, y) {
  y === void 0 && (y = !1);
  let g;
  typeof s == "string" ? g = eo(s) : (g = Qu({}, s), ht(!g.pathname || !g.pathname.includes("?"), Tv("?", "pathname", "search", g)), ht(!g.pathname || !g.pathname.includes("#"), Tv("#", "pathname", "hash", g)), ht(!g.search || !g.search.includes("#"), Tv("#", "search", "hash", g)));
  let C = s === "" || g.pathname === "", f = C ? "/" : g.pathname, k;
  if (f == null)
    k = h;
  else {
    let x = m.length - 1;
    if (!y && f.startsWith("..")) {
      let A = f.split("/");
      for (; A[0] === ".."; )
        A.shift(), x -= 1;
      g.pathname = A.join("/");
    }
    k = x >= 0 ? m[x] : "/";
  }
  let D = uw(g, k), T = f && f !== "/" && f.endsWith("/"), _ = (C || f === ".") && h.endsWith("/");
  return !D.pathname.endsWith("/") && (T || _) && (D.pathname += "/"), D;
}
const wr = (s) => s.join("/").replace(/\/\/+/g, "/"), fw = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"), dw = (s) => !s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s, pw = (s) => !s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s;
function mw(s) {
  return s != null && typeof s.status == "number" && typeof s.statusText == "string" && typeof s.internal == "boolean" && "data" in s;
}
const hE = ["post", "put", "patch", "delete"];
new Set(hE);
const vw = ["get", ...hE];
new Set(vw);
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
      for (var y in h)
        Object.prototype.hasOwnProperty.call(h, y) && (s[y] = h[y]);
    }
    return s;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ R.createContext(null);
Zu.displayName = "DataRouter";
const kv = /* @__PURE__ */ R.createContext(null);
kv.displayName = "DataRouterState";
const hw = /* @__PURE__ */ R.createContext(null);
hw.displayName = "Await";
const da = /* @__PURE__ */ R.createContext(null);
da.displayName = "Navigation";
const es = /* @__PURE__ */ R.createContext(null);
es.displayName = "Location";
const Va = /* @__PURE__ */ R.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Va.displayName = "Route";
const Uv = /* @__PURE__ */ R.createContext(null);
Uv.displayName = "RouteError";
function gw(s, m) {
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
    basename: y,
    navigator: g
  } = R.useContext(da), {
    hash: C,
    pathname: f,
    search: k
  } = ts(s, {
    relative: h
  }), D = f;
  return y !== "/" && (D = f === "/" ? y : wr([y, f])), g.createHref({
    pathname: D,
    search: k,
    hash: C
  });
}
function to() {
  return R.useContext(es) != null;
}
function Qi() {
  return to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), R.useContext(es).location;
}
const gE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function yE(s) {
  R.useContext(da).static || R.useLayoutEffect(s);
}
function zv() {
  let {
    isDataRoute: s
  } = R.useContext(Va);
  return s ? Lw() : yw();
}
function yw() {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = R.useContext(Zu), {
    basename: m,
    future: h,
    navigator: y
  } = R.useContext(da), {
    matches: g
  } = R.useContext(Va), {
    pathname: C
  } = Qi(), f = JSON.stringify(Av(g, h.v7_relativeSplatPath)), k = R.useRef(!1);
  return yE(() => {
    k.current = !0;
  }), R.useCallback(function(T, _) {
    if (_ === void 0 && (_ = {}), Aa(k.current, gE), !k.current) return;
    if (typeof T == "number") {
      y.go(T);
      return;
    }
    let x = Vv(T, JSON.parse(f), C, _.relative === "path");
    s == null && m !== "/" && (x.pathname = x.pathname === "/" ? m : wr([m, x.pathname])), (_.replace ? y.replace : y.push)(x, _.state, _);
  }, [m, y, f, C, s]);
}
function bw() {
  let {
    matches: s
  } = R.useContext(Va), m = s[s.length - 1];
  return m ? m.params : {};
}
function ts(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    future: y
  } = R.useContext(da), {
    matches: g
  } = R.useContext(Va), {
    pathname: C
  } = Qi(), f = JSON.stringify(Av(g, y.v7_relativeSplatPath));
  return R.useMemo(() => Vv(s, JSON.parse(f), C, h === "path"), [s, f, C, h]);
}
function Nw(s, m) {
  return Ew(s, m);
}
function Ew(s, m, h, y) {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: g
  } = R.useContext(da), {
    matches: C
  } = R.useContext(Va), f = C[C.length - 1], k = f ? f.params : {}, D = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", _ = f && f.route;
  {
    let q = _ && _.path || "";
    NE(D, !_ || q.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + D + '" (under <Route path="' + q + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + q + '"> to <Route ') + ('path="' + (q === "/" ? "*" : q + "/*") + '">.'));
  }
  let x = Qi(), A;
  if (m) {
    var V;
    let q = typeof m == "string" ? eo(m) : m;
    T === "/" || (V = q.pathname) != null && V.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + q.pathname + '" was given in the `location` prop.')), A = q;
  } else
    A = x;
  let K = A.pathname || "/", de = K;
  if (T !== "/") {
    let q = T.replace(/^\//, "").split("/");
    de = "/" + K.replace(/^\//, "").split("/").slice(q.length).join("/");
  }
  let ne = W1(s, {
    pathname: de
  });
  Aa(_ || ne != null, 'No routes matched location "' + A.pathname + A.search + A.hash + '" '), Aa(ne == null || ne[ne.length - 1].route.element !== void 0 || ne[ne.length - 1].route.Component !== void 0 || ne[ne.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + A.pathname + A.search + A.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let me = Dw(ne && ne.map((q) => Object.assign({}, q, {
    params: Object.assign({}, k, q.params),
    pathname: wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      g.encodeLocation ? g.encodeLocation(q.pathname).pathname : q.pathname
    ]),
    pathnameBase: q.pathnameBase === "/" ? T : wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      g.encodeLocation ? g.encodeLocation(q.pathnameBase).pathname : q.pathnameBase
    ])
  })), C, h, y);
  return m && me ? /* @__PURE__ */ R.createElement(es.Provider, {
    value: {
      location: Xu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, A),
      navigationType: li.Pop
    }
  }, me) : me;
}
function Sw() {
  let s = Ow(), m = mw(s) ? s.status + " " + s.statusText : s instanceof Error ? s.message : JSON.stringify(s), h = s instanceof Error ? s.stack : null, y = "rgba(200,200,200, 0.5)", g = {
    padding: "0.5rem",
    backgroundColor: y
  }, C = {
    padding: "2px 4px",
    backgroundColor: y
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", s), f = /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ R.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ R.createElement("code", {
    style: C
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ R.createElement("code", {
    style: C
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ R.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, m), h ? /* @__PURE__ */ R.createElement("pre", {
    style: g
  }, h) : null, f);
}
const xw = /* @__PURE__ */ R.createElement(Sw, null);
class Rw extends R.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ R.createElement(Va.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ R.createElement(Uv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Cw(s) {
  let {
    routeContext: m,
    match: h,
    children: y
  } = s, g = R.useContext(Zu);
  return g && g.static && g.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (g.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ R.createElement(Va.Provider, {
    value: m
  }, y);
}
function Dw(s, m, h, y) {
  var g;
  if (m === void 0 && (m = []), h === void 0 && (h = null), y === void 0 && (y = null), s == null) {
    var C;
    if (!h)
      return null;
    if (h.errors)
      s = h.matches;
    else if ((C = y) != null && C.v7_partialHydration && m.length === 0 && !h.initialized && h.matches.length > 0)
      s = h.matches;
    else
      return null;
  }
  let f = s, k = (g = h) == null ? void 0 : g.errors;
  if (k != null) {
    let _ = f.findIndex((x) => x.route.id && (k == null ? void 0 : k[x.route.id]) !== void 0);
    _ >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(k).join(",")), f = f.slice(0, Math.min(f.length, _ + 1));
  }
  let D = !1, T = -1;
  if (h && y && y.v7_partialHydration)
    for (let _ = 0; _ < f.length; _++) {
      let x = f[_];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (T = _), x.route.id) {
        let {
          loaderData: A,
          errors: V
        } = h, K = x.route.loader && A[x.route.id] === void 0 && (!V || V[x.route.id] === void 0);
        if (x.route.lazy || K) {
          D = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((_, x, A) => {
    let V, K = !1, de = null, ne = null;
    h && (V = k && x.route.id ? k[x.route.id] : void 0, de = x.route.errorElement || xw, D && (T < 0 && A === 0 ? (NE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), K = !0, ne = null) : T === A && (K = !0, ne = x.route.hydrateFallbackElement || null)));
    let me = m.concat(f.slice(0, A + 1)), q = () => {
      let Y;
      return V ? Y = de : K ? Y = ne : x.route.Component ? Y = /* @__PURE__ */ R.createElement(x.route.Component, null) : x.route.element ? Y = x.route.element : Y = _, /* @__PURE__ */ R.createElement(Cw, {
        match: x,
        routeContext: {
          outlet: _,
          matches: me,
          isDataRoute: h != null
        },
        children: Y
      });
    };
    return h && (x.route.ErrorBoundary || x.route.errorElement || A === 0) ? /* @__PURE__ */ R.createElement(Rw, {
      location: h.location,
      revalidation: h.revalidation,
      component: de,
      error: V,
      children: q(),
      routeContext: {
        outlet: null,
        matches: me,
        isDataRoute: !0
      }
    }) : q();
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
function Tw(s) {
  let m = R.useContext(Zu);
  return m || ht(!1, Fv(s)), m;
}
function jw(s) {
  let m = R.useContext(kv);
  return m || ht(!1, Fv(s)), m;
}
function ww(s) {
  let m = R.useContext(Va);
  return m || ht(!1, Fv(s)), m;
}
function Hv(s) {
  let m = ww(s), h = m.matches[m.matches.length - 1];
  return h.route.id || ht(!1, s + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function _w() {
  return Hv(Ju.UseRouteId);
}
function Ow() {
  var s;
  let m = R.useContext(Uv), h = jw(Ju.UseRouteError), y = Hv(Ju.UseRouteError);
  return m !== void 0 ? m : (s = h.errors) == null ? void 0 : s[y];
}
function Lw() {
  let {
    router: s
  } = Tw(bE.UseNavigateStable), m = Hv(Ju.UseNavigateStable), h = R.useRef(!1);
  return yE(() => {
    h.current = !0;
  }), R.useCallback(function(g, C) {
    C === void 0 && (C = {}), Aa(h.current, gE), h.current && (typeof g == "number" ? s.navigate(g) : s.navigate(g, Xu({
      fromRouteId: m
    }, C)));
  }, [s, m]);
}
const nE = {};
function NE(s, m, h) {
  !m && !nE[s] && (nE[s] = !0, Aa(!1, h));
}
const aE = {};
function Mw(s, m) {
  aE[m] || (aE[m] = !0, console.warn(m));
}
const rE = (s, m, h) => Mw(s, "⚠️ React Router Future Flag Warning: " + m + ". " + ("You can use the `" + s + "` future flag to opt-in early. ") + ("For more information, see " + h + "."));
function Aw(s, m) {
  (s == null ? void 0 : s.v7_startTransition) === void 0 && rE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (s == null ? void 0 : s.v7_relativeSplatPath) === void 0 && rE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Vw(s) {
  let {
    to: m,
    replace: h,
    state: y,
    relative: g
  } = s;
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: C,
    static: f
  } = R.useContext(da);
  Aa(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: k
  } = R.useContext(Va), {
    pathname: D
  } = Qi(), T = zv(), _ = Vv(m, Av(k, C.v7_relativeSplatPath), D, g === "path"), x = JSON.stringify(_);
  return R.useEffect(() => T(JSON.parse(x), {
    replace: h,
    state: y,
    relative: g
  }), [T, x, g, h, y]), null;
}
function jr(s) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function kw(s) {
  let {
    basename: m = "/",
    children: h = null,
    location: y,
    navigationType: g = li.Pop,
    navigator: C,
    static: f = !1,
    future: k
  } = s;
  to() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let D = m.replace(/^\/*/, "/"), T = R.useMemo(() => ({
    basename: D,
    navigator: C,
    static: f,
    future: Xu({
      v7_relativeSplatPath: !1
    }, k)
  }), [D, k, C, f]);
  typeof y == "string" && (y = eo(y));
  let {
    pathname: _ = "/",
    search: x = "",
    hash: A = "",
    state: V = null,
    key: K = "default"
  } = y, de = R.useMemo(() => {
    let ne = ui(_, D);
    return ne == null ? null : {
      location: {
        pathname: ne,
        search: x,
        hash: A,
        state: V,
        key: K
      },
      navigationType: g
    };
  }, [D, _, x, A, V, K, g]);
  return Aa(de != null, '<Router basename="' + D + '"> is not able to match the URL ' + ('"' + _ + x + A + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), de == null ? null : /* @__PURE__ */ R.createElement(da.Provider, {
    value: T
  }, /* @__PURE__ */ R.createElement(es.Provider, {
    children: h,
    value: de
  }));
}
function Uw(s) {
  let {
    children: m,
    location: h
  } = s;
  return Nw(Mv(m), h);
}
new Promise(() => {
});
function Mv(s, m) {
  m === void 0 && (m = []);
  let h = [];
  return R.Children.forEach(s, (y, g) => {
    if (!/* @__PURE__ */ R.isValidElement(y))
      return;
    let C = [...m, g];
    if (y.type === R.Fragment) {
      h.push.apply(h, Mv(y.props.children, C));
      return;
    }
    y.type !== jr && ht(!1, "[" + (typeof y.type == "string" ? y.type : y.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !y.props.index || !y.props.children || ht(!1, "An index route cannot have child routes.");
    let f = {
      id: y.props.id || C.join("-"),
      caseSensitive: y.props.caseSensitive,
      element: y.props.element,
      Component: y.props.Component,
      index: y.props.index,
      path: y.props.path,
      loader: y.props.loader,
      action: y.props.action,
      errorElement: y.props.errorElement,
      ErrorBoundary: y.props.ErrorBoundary,
      hasErrorBoundary: y.props.ErrorBoundary != null || y.props.errorElement != null,
      shouldRevalidate: y.props.shouldRevalidate,
      handle: y.props.handle,
      lazy: y.props.lazy
    };
    y.props.children && (f.children = Mv(y.props.children, C)), h.push(f);
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
      for (var y in h)
        Object.prototype.hasOwnProperty.call(h, y) && (s[y] = h[y]);
    }
    return s;
  }, Zl.apply(this, arguments);
}
function Bv(s, m) {
  if (s == null) return {};
  var h = {}, y = Object.keys(s), g, C;
  for (C = 0; C < y.length; C++)
    g = y[C], !(m.indexOf(g) >= 0) && (h[g] = s[g]);
  return h;
}
const mf = "get", vf = "application/x-www-form-urlencoded";
function yf(s) {
  return s != null && typeof s.tagName == "string";
}
function zw(s) {
  return yf(s) && s.tagName.toLowerCase() === "button";
}
function Fw(s) {
  return yf(s) && s.tagName.toLowerCase() === "form";
}
function Hw(s) {
  return yf(s) && s.tagName.toLowerCase() === "input";
}
function Bw(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function Pw(s, m) {
  return s.button === 0 && // Ignore everything but left clicks
  (!m || m === "_self") && // Let browser handle "target=_blank" etc.
  !Bw(s);
}
let pf = null;
function $w() {
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
const Yw = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function jv(s) {
  return s != null && !Yw.has(s) ? (Aa(!1, '"' + s + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : s;
}
function Iw(s, m) {
  let h, y, g, C, f;
  if (Fw(s)) {
    let k = s.getAttribute("action");
    y = k ? ui(k, m) : null, h = s.getAttribute("method") || mf, g = jv(s.getAttribute("enctype")) || vf, C = new FormData(s);
  } else if (zw(s) || Hw(s) && (s.type === "submit" || s.type === "image")) {
    let k = s.form;
    if (k == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let D = s.getAttribute("formaction") || k.getAttribute("action");
    if (y = D ? ui(D, m) : null, h = s.getAttribute("formmethod") || k.getAttribute("method") || mf, g = jv(s.getAttribute("formenctype")) || jv(k.getAttribute("enctype")) || vf, C = new FormData(k, s), !$w()) {
      let {
        name: T,
        type: _,
        value: x
      } = s;
      if (_ === "image") {
        let A = T ? T + "." : "";
        C.append(A + "x", "0"), C.append(A + "y", "0");
      } else T && C.append(T, x);
    }
  } else {
    if (yf(s))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    h = mf, y = null, g = vf, f = s;
  }
  return C && g === "text/plain" && (f = C, C = void 0), {
    action: y,
    method: h.toLowerCase(),
    encType: g,
    formData: C,
    body: f
  };
}
const qw = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Gw = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Ww = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Qw = "6";
try {
  window.__reactRouterVersion = Qw;
} catch {
}
const EE = /* @__PURE__ */ R.createContext({
  isTransitioning: !1
});
EE.displayName = "ViewTransition";
const Kw = /* @__PURE__ */ R.createContext(/* @__PURE__ */ new Map());
Kw.displayName = "Fetchers";
const Xw = "startTransition", iE = P1[Xw];
function Jw(s) {
  let {
    basename: m,
    children: h,
    future: y,
    window: g
  } = s, C = R.useRef();
  C.current == null && (C.current = I1({
    window: g,
    v5Compat: !0
  }));
  let f = C.current, [k, D] = R.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = y || {}, _ = R.useCallback((x) => {
    T && iE ? iE(() => D(x)) : D(x);
  }, [D, T]);
  return R.useLayoutEffect(() => f.listen(_), [f, _]), R.useEffect(() => Aw(y), [y]), /* @__PURE__ */ R.createElement(kw, {
    basename: m,
    children: h,
    location: k.location,
    navigationType: k.action,
    navigator: f,
    future: y
  });
}
const Zw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", e_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ R.forwardRef(function(m, h) {
  let {
    onClick: y,
    relative: g,
    reloadDocument: C,
    replace: f,
    state: k,
    target: D,
    to: T,
    preventScrollReset: _,
    viewTransition: x
  } = m, A = Bv(m, qw), {
    basename: V
  } = R.useContext(da), K, de = !1;
  if (typeof T == "string" && e_.test(T) && (K = T, Zw))
    try {
      let Y = new URL(window.location.href), G = T.startsWith("//") ? new URL(Y.protocol + T) : new URL(T), B = ui(G.pathname, V);
      G.origin === Y.origin && B != null ? T = B + G.search + G.hash : de = !0;
    } catch {
      Aa(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ne = gw(T, {
    relative: g
  }), me = r_(T, {
    replace: f,
    state: k,
    target: D,
    preventScrollReset: _,
    relative: g,
    viewTransition: x
  });
  function q(Y) {
    y && y(Y), Y.defaultPrevented || me(Y);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ R.createElement("a", Zl({}, A, {
      href: K || ne,
      onClick: de || C ? y : q,
      ref: h,
      target: D
    }))
  );
});
ii.displayName = "Link";
const t_ = /* @__PURE__ */ R.forwardRef(function(m, h) {
  let {
    "aria-current": y = "page",
    caseSensitive: g = !1,
    className: C = "",
    end: f = !1,
    style: k,
    to: D,
    viewTransition: T,
    children: _
  } = m, x = Bv(m, Gw), A = ts(D, {
    relative: x.relative
  }), V = Qi(), K = R.useContext(kv), {
    navigator: de,
    basename: ne
  } = R.useContext(da), me = K != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  c_(A) && T === !0, q = de.encodeLocation ? de.encodeLocation(A).pathname : A.pathname, Y = V.pathname, G = K && K.navigation && K.navigation.location ? K.navigation.location.pathname : null;
  g || (Y = Y.toLowerCase(), G = G ? G.toLowerCase() : null, q = q.toLowerCase()), G && ne && (G = ui(G, ne) || G);
  const B = q !== "/" && q.endsWith("/") ? q.length - 1 : q.length;
  let ve = Y === q || !f && Y.startsWith(q) && Y.charAt(B) === "/", $ = G != null && (G === q || !f && G.startsWith(q) && G.charAt(q.length) === "/"), Ue = {
    isActive: ve,
    isPending: $,
    isTransitioning: me
  }, ce = ve ? y : void 0, re;
  typeof C == "function" ? re = C(Ue) : re = [C, ve ? "active" : null, $ ? "pending" : null, me ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof k == "function" ? k(Ue) : k;
  return /* @__PURE__ */ R.createElement(ii, Zl({}, x, {
    "aria-current": ce,
    className: re,
    ref: h,
    style: U,
    to: D,
    viewTransition: T
  }), typeof _ == "function" ? _(Ue) : _);
});
t_.displayName = "NavLink";
const n_ = /* @__PURE__ */ R.forwardRef((s, m) => {
  let {
    fetcherKey: h,
    navigate: y,
    reloadDocument: g,
    replace: C,
    state: f,
    method: k = mf,
    action: D,
    onSubmit: T,
    relative: _,
    preventScrollReset: x,
    viewTransition: A
  } = s, V = Bv(s, Ww), K = u_(), de = s_(D, {
    relative: _
  }), ne = k.toLowerCase() === "get" ? "get" : "post", me = (q) => {
    if (T && T(q), q.defaultPrevented) return;
    q.preventDefault();
    let Y = q.nativeEvent.submitter, G = (Y == null ? void 0 : Y.getAttribute("formmethod")) || k;
    K(Y || q.currentTarget, {
      fetcherKey: h,
      method: G,
      navigate: y,
      replace: C,
      state: f,
      relative: _,
      preventScrollReset: x,
      viewTransition: A
    });
  };
  return /* @__PURE__ */ R.createElement("form", Zl({
    ref: m,
    method: ne,
    action: de,
    onSubmit: g ? T : me
  }, V));
});
n_.displayName = "Form";
var gf;
(function(s) {
  s.UseScrollRestoration = "useScrollRestoration", s.UseSubmit = "useSubmit", s.UseSubmitFetcher = "useSubmitFetcher", s.UseFetcher = "useFetcher", s.useViewTransitionState = "useViewTransitionState";
})(gf || (gf = {}));
var lE;
(function(s) {
  s.UseFetcher = "useFetcher", s.UseFetchers = "useFetchers", s.UseScrollRestoration = "useScrollRestoration";
})(lE || (lE = {}));
function a_(s) {
  return s + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function SE(s) {
  let m = R.useContext(Zu);
  return m || ht(!1, a_(s)), m;
}
function r_(s, m) {
  let {
    target: h,
    replace: y,
    state: g,
    preventScrollReset: C,
    relative: f,
    viewTransition: k
  } = m === void 0 ? {} : m, D = zv(), T = Qi(), _ = ts(s, {
    relative: f
  });
  return R.useCallback((x) => {
    if (Pw(x, h)) {
      x.preventDefault();
      let A = y !== void 0 ? y : Ku(T) === Ku(_);
      D(s, {
        replace: A,
        state: g,
        preventScrollReset: C,
        relative: f,
        viewTransition: k
      });
    }
  }, [T, D, _, y, g, h, s, C, f, k]);
}
function i_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let l_ = 0, o_ = () => "__" + String(++l_) + "__";
function u_() {
  let {
    router: s
  } = SE(gf.UseSubmit), {
    basename: m
  } = R.useContext(da), h = _w();
  return R.useCallback(function(y, g) {
    g === void 0 && (g = {}), i_();
    let {
      action: C,
      method: f,
      encType: k,
      formData: D,
      body: T
    } = Iw(y, m);
    if (g.navigate === !1) {
      let _ = g.fetcherKey || o_();
      s.fetch(_, h, g.action || C, {
        preventScrollReset: g.preventScrollReset,
        formData: D,
        body: T,
        formMethod: g.method || f,
        formEncType: g.encType || k,
        flushSync: g.flushSync
      });
    } else
      s.navigate(g.action || C, {
        preventScrollReset: g.preventScrollReset,
        formData: D,
        body: T,
        formMethod: g.method || f,
        formEncType: g.encType || k,
        replace: g.replace,
        state: g.state,
        fromRouteId: h,
        flushSync: g.flushSync,
        viewTransition: g.viewTransition
      });
  }, [s, m, h]);
}
function s_(s, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    basename: y
  } = R.useContext(da), g = R.useContext(Va);
  g || ht(!1, "useFormAction must be used inside a RouteContext");
  let [C] = g.matches.slice(-1), f = Zl({}, ts(s || ".", {
    relative: h
  })), k = Qi();
  if (s == null) {
    f.search = k.search;
    let D = new URLSearchParams(f.search), T = D.getAll("index");
    if (T.some((x) => x === "")) {
      D.delete("index"), T.filter((A) => A).forEach((A) => D.append("index", A));
      let x = D.toString();
      f.search = x ? "?" + x : "";
    }
  }
  return (!s || s === ".") && C.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), y !== "/" && (f.pathname = f.pathname === "/" ? y : wr([y, f.pathname])), Ku(f);
}
function c_(s, m) {
  m === void 0 && (m = {});
  let h = R.useContext(EE);
  h == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: y
  } = SE(gf.useViewTransitionState), g = ts(s, {
    relative: m.relative
  });
  if (!h.isTransitioning)
    return !1;
  let C = ui(h.currentLocation.pathname, y) || h.currentLocation.pathname, f = ui(h.nextLocation.pathname, y) || h.nextLocation.pathname;
  return Lv(g.pathname, f) != null || Lv(g.pathname, C) != null;
}
function f_() {
  const [s, m] = R.useState(null), [h, y] = R.useState(""), [g, C] = R.useState(""), [f, k] = R.useState(!0), [D, T] = R.useState(""), [_, x] = R.useState(""), [A, V] = R.useState(!1), [K, de] = R.useState(!1);
  R.useEffect(() => {
    const Y = typeof window < "u" ? window : void 0, G = Y && Y.__FIREBASE__ ? Y.__FIREBASE__ : null;
    m({
      apiKey: G && G.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: G && G.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: G && G.projectId || void 0 || "fresh-basket-a8933",
      appId: G && G.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: G && G.messagingSenderId || void 0 || "163656027399",
      measurementId: G && G.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ne(Y) {
    const G = (Y == null ? void 0 : Y.code) || "", B = (Y == null ? void 0 : Y.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || B.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : B || "Something went wrong.";
  }
  async function me(Y) {
    Y.preventDefault(), T(""), x(""), V(!0);
    try {
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), B = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ve, setPersistence: $, browserLocalPersistence: Ue, browserSessionPersistence: ce, signInWithEmailAndPassword: re } = B, U = ve();
      await $(U, f ? Ue : ce);
      const ue = await (await re(U, h.trim(), g)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: ue }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (G) {
      T(ne(G));
    } finally {
      V(!1);
    }
  }
  async function q() {
    T(""), x("");
    try {
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const Y = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), { getAuth: G, sendPasswordResetEmail: B } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ve = G();
      await B(ve, h.trim()), x("If an account exists for that email, a reset link has been sent.");
    } catch (Y) {
      T(ne(Y));
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
      D && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: D }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      _ && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: _ }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: me, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: h, onChange: (Y) => y(Y.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: K ? "text" : "password", value: g, onChange: (Y) => C(Y.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": K ? "Hide password" : "Show password", onClick: () => de((Y) => !Y), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: f, onChange: (Y) => k(Y.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("button", { className: "link-button", type: "button", onClick: q, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: A, type: "submit", children: A ? "Signing in…" : "Sign in" }, void 0, !1, {
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
function d_() {
  const [s, m] = R.useState(null), [h, y] = R.useState(""), [g, C] = R.useState(""), [f, k] = R.useState(""), [D, T] = R.useState(""), [_, x] = R.useState(""), [A, V] = R.useState(""), [K, de] = R.useState(""), [ne, me] = R.useState(!1), [q, Y] = R.useState(!1), [G, B] = R.useState(!1), [ve, $] = R.useState(!1);
  R.useEffect(() => {
    const re = typeof window < "u" ? window : void 0, U = re && re.__FIREBASE__ ? re.__FIREBASE__ : null;
    m({
      apiKey: U && U.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: U && U.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: U && U.projectId || void 0 || "fresh-basket-a8933",
      appId: U && U.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: U && U.messagingSenderId || void 0 || "163656027399",
      measurementId: U && U.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function Ue(re) {
    const U = (re == null ? void 0 : re.code) || "";
    return U.includes("email-already-in-use") ? "An account with this email already exists." : U.includes("weak-password") ? "Password should be at least 6 characters." : U.includes("invalid-email") ? "Please enter a valid email address." : U.includes("network-request-failed") ? "Network error. Check your connection and try again." : (re == null ? void 0 : re.message) || "Something went wrong.";
  }
  async function ce(re) {
    re.preventDefault(), V(""), de(""), me(!0);
    try {
      const U = String(h).trim(), he = String(g).trim(), ue = he.replace(/\D+/g, ""), ge = { fn: !U, cn: !he };
      if (B(ge.fn), $(ge.cn || ue.length < 7), ge.fn || ge.cn) {
        V("Please fill in required fields");
        return;
      }
      if (ue.length < 7) {
        V("Please enter a valid mobile number");
        return;
      }
      if (D !== _) throw new Error("Passwords do not match");
      if (!(s != null && s.apiKey)) throw new Error("Firebase not configured");
      const Ae = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(s), { getAuth: _e, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ge = _e(), Nn = await (await ye(Ge, f.trim(), D)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Nn, profile: { fullName: U, contactNumber: he } }) })).ok) throw new Error("Session creation failed");
      de("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (U) {
      V(Ue(U));
    } finally {
      me(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ d.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    A && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: A }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    K && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: K }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: ce, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (G && !String(h).trim() ? " input-error" : ""), value: h, onChange: (re) => {
          y(re.target.value), G && B(!String(re.target.value).trim());
        }, onBlur: () => B(!String(h).trim()), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 72,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (ve ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: g, onChange: (re) => {
          if (C(re.target.value), ve) {
            const U = String(re.target.value).trim().replace(/\D+/g, "");
            $(!(U.length >= 7));
          }
        }, onBlur: () => {
          const re = String(g).trim().replace(/\D+/g, "");
          $(!(re.length >= 7));
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
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (re) => k(re.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ d.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: q ? "text" : "password", value: D, onChange: (re) => T(re.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": q ? "Hide password" : "Show password", onClick: () => Y((re) => !re), children: "👁️" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: _, onChange: (re) => x(re.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button", disabled: ne, type: "submit", children: ne ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ d.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
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
function p_() {
  const [s, m] = R.useState([]);
  return R.useEffect(() => {
    const h = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (h.length) {
      const y = h.map((g) => ({
        id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
        message: String(g.message || ""),
        type: g.opts && g.opts.type || "success",
        ttl: g.opts && typeof g.opts.ttl == "number" ? g.opts.ttl : 4e3
      }));
      m((g) => [...y, ...g]);
      try {
        delete window.__pendingToasts;
      } catch {
        window.__pendingToasts = [];
      }
    }
    return window.showToast = function(y, g = {}) {
      const C = String(Date.now()) + Math.random().toString(36).slice(2, 8), f = { id: C, message: String(y || ""), type: g.type || "success", ttl: typeof g.ttl == "number" ? g.ttl : 4e3 };
      return m((k) => [f, ...k]), C;
    }, window.hideToast = function(y) {
      m((g) => g.filter((C) => C.id !== y));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), R.useEffect(() => {
    if (!s.length) return;
    const h = s.map((y) => setTimeout(() => {
      m((g) => g.filter((C) => C.id !== y.id));
    }, y.ttl));
    return () => {
      h.forEach(clearTimeout);
    };
  }, [s]), s.length ? /* @__PURE__ */ d.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: s.map((h) => /* @__PURE__ */ d.jsxDEV("div", { className: `toast ${h.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ d.jsxDEV("div", { className: "toast-message", children: h.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ d.jsxDEV("button", { className: "toast-close", onClick: () => m((y) => y.filter((g) => g.id !== h.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 47,
      columnNumber: 11
    }, this)
  ] }, h.id, !0, {
    fileName: "/app/code/client/components/Toaster.jsx",
    lineNumber: 45,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "/app/code/client/components/Toaster.jsx",
    lineNumber: 43,
    columnNumber: 5
  }, this) : null;
}
function oi({ children: s }) {
  R.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(h, y) {
      return window.__pendingToasts.push({ message: h, opts: y || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(h) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((y) => y.id !== h));
      } catch {
      }
    }));
  }, []);
  const m = zv();
  return R.useEffect(() => {
    const h = document.getElementById("notifBtn"), y = document.getElementById("notifMenu"), g = document.getElementById("profileBtn"), C = document.getElementById("profileMenu");
    function f(x, A, V) {
      x && (x.classList.toggle("hidden", !V), x.setAttribute("aria-hidden", V ? "false" : "true"), A && A.setAttribute("aria-expanded", V ? "true" : "false"));
    }
    function k() {
      f(y, h, !1), f(C, g, !1);
    }
    function D(x) {
      const A = (V) => V && (V === x.target || V.contains(x.target));
      !A(y) && !A(h) && !A(C) && !A(g) && k();
    }
    function T(x) {
      x.key === "Escape" && k();
    }
    function _(x) {
      x && x.querySelectorAll(".dropdown-item").forEach((A) => {
        A.addEventListener("click", () => k());
      });
    }
    return h && y && (h.addEventListener("click", (x) => {
      x.stopPropagation(), f(C, g, !1), f(y, h, y.classList.contains("hidden"));
    }), _(y)), g && C && (g.addEventListener("click", (x) => {
      x.stopPropagation(), f(y, h, !1), f(C, g, C.classList.contains("hidden"));
    }), _(C)), document.addEventListener("click", D), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", D), document.removeEventListener("keydown", T);
    };
  }, []), /* @__PURE__ */ d.jsxDEV(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ d.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ d.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ d.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 75,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/dashboard", onClick: (h) => {
          h.preventDefault(), m("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/orders", onClick: (h) => {
          h.preventDefault(), m("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/riders", onClick: (h) => {
          h.preventDefault(), m("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/reports", onClick: (h) => {
          h.preventDefault(), m("/reports");
        }, children: "Reports" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ d.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ d.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("defs", { children: /* @__PURE__ */ d.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 88,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 96,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ d.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ d.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ d.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 103,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ d.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(ii, { className: "dropdown-item", to: "/riders", onClick: (h) => {
              h.preventDefault(), m("/riders");
            }, children: "Riders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(ii, { className: "dropdown-item", to: "/orders", onClick: (h) => {
              h.preventDefault(), m("/orders");
            }, children: "Orders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 108,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ d.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 109,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 109,
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
    /* @__PURE__ */ d.jsxDEV("main", { className: "content", children: s }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV(p_, {}, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 117,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
function m_({ onClose: s, onCreated: m }) {
  const [h, y] = R.useState(""), [g, C] = R.useState(""), [f, k] = R.useState(""), [D, T] = R.useState(""), [_, x] = R.useState(!1), [A, V] = R.useState(""), [K, de] = R.useState(""), [ne, me] = R.useState(!1), [q, Y] = R.useState(!1), [G, B] = R.useState(!1), [ve, $] = R.useState(!1);
  async function Ue() {
    V(""), de(""), $(!0);
    const ce = String(h).trim(), re = String(g), U = String(f).trim(), he = String(D).trim(), ue = he.replace(/\D+/g, ""), ge = { fn: !U, cn: !he, pw: !re };
    if (me(ge.fn), Y(ge.cn || ue.length < 7), B(ge.pw), ge.fn || ge.cn || ge.pw) {
      V("Full name, mobile and password are required");
      return;
    }
    if (ue.length < 7) {
      V("Please enter a valid mobile number"), Y(!0);
      return;
    }
    if (ce && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ce)) {
      V("Please enter a valid email");
      return;
    }
    if (re.length < 6) {
      B(!0), V("Password must be at least 6 characters");
      return;
    }
    x(!0);
    try {
      const Ae = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ce, password: re, fullName: U, contactNumber: he })
      }), _e = await Ae.json().catch(() => null);
      if (!Ae.ok) {
        const ye = String(_e && (_e.error || _e.message) || ""), Ge = ye.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ye) || /MISSING\s*EMAIL\/PASSWORD/i.test(ye))
          V("Full name, mobile and password are required"), me(!U), Y(!he || ue.length < 7), B(!re);
        else if (Ge.includes("EMAIL_EXISTS"))
          V("An account with this email already exists. Use a different email or leave email blank.");
        else if (Ge.includes("INVALID_EMAIL"))
          V("Please enter a valid email");
        else if (Ge.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ye))
          B(!0), V("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ye))
          Y(!0), V("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ye))
          V("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ye || "Failed to create rider");
        return;
      }
      de("Rider created successfully"), m && m(), setTimeout(() => {
        s && s();
      }, 600);
    } catch (Ae) {
      const _e = String((Ae == null ? void 0 : Ae.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(_e) ? V("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(_e) ? V("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(_e) ? V("Please enter a valid email") : /WEAK_PASSWORD/i.test(_e) || /AT LEAST 6 CHARACTERS/i.test(_e) ? (B(!0), V("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(_e) ? (Y(!0), V("Please enter a valid mobile number")) : V(_e || "Failed to create rider");
    } finally {
      x(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ d.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "create-rider-close", onClick: s, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 94,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 92,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-body", children: [
      K && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: K }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ve && !String(f).trim() ? " input-error" : ""), value: f, onChange: (ce) => {
          k(ce.target.value), ve && me(!String(ce.target.value).trim());
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 99,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 98,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Email",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "email", value: h, onChange: (ce) => {
          y(ce.target.value);
        } }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 102,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ve && !String(g) ? " input-error" : ""), type: "password", value: g, onChange: (ce) => {
          C(ce.target.value), ve && B(!String(ce.target.value));
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 105,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ve && String(D).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: D, onChange: (ce) => {
          if (T(ce.target.value), ve) {
            const re = String(ce.target.value).trim().replace(/\D+/g, "");
            Y(!(re.length >= 7));
          }
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 108,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      A && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: A }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: s, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: Ue, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 113,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 111,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 96,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 91,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 90,
    columnNumber: 5
  }, this);
}
function v_() {
  const [s, m] = R.useState([]), [h, y] = R.useState(""), [g, C] = R.useState("all"), [f, k] = R.useState("all"), [D, T] = R.useState("all"), [_, x] = R.useState(!0), [A, V] = R.useState(""), [K, de] = R.useState(1), [ne, me] = R.useState(20), [q, Y] = R.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [G, B] = R.useState(!1);
  R.useEffect(() => {
    let $ = !0;
    return (async () => {
      var Ue, ce, re, U;
      x(!0), V("");
      try {
        const he = new URLSearchParams();
        h && he.set("q", h), D !== "all" && he.set("status", D), g !== "all" && he.set("lastDays", g), he.set("page", String(K)), he.set("limit", String(ne));
        const ue = await fetch(`/api/riders?${he.toString()}`, { credentials: "include" });
        if (ue.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ue.ok) throw new Error("Failed to load riders");
        const ge = await ue.json();
        $ && (m(Array.isArray(ge.riders) ? ge.riders : []), Y({ total: ((Ue = ge.meta) == null ? void 0 : Ue.total) || 0, page: ((ce = ge.meta) == null ? void 0 : ce.page) || 1, limit: ((re = ge.meta) == null ? void 0 : re.limit) || ne, pages: ((U = ge.meta) == null ? void 0 : U.pages) || 1 }));
      } catch (he) {
        $ && V(he.message || "Failed to load riders");
      } finally {
        $ && x(!1);
      }
    })(), () => {
      $ = !1;
    };
  }, [h, D, g, K, ne]);
  const ve = R.useMemo(() => s.filter(($) => {
    if (h && !$.name.toLowerCase().includes(h.toLowerCase().trim()) || D !== "all" && $.status !== D || f !== "all" && String($.id) !== String(f)) return !1;
    if (g !== "all") {
      const Ue = parseInt($.lastActiveDays, 10) || 9999, ce = parseInt(g, 10);
      if (!(Ue <= ce)) return !1;
    }
    return !0;
  }), [s, h, D, f, g]);
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => B(!0), children: "Create Rider" }, void 0, !1, {
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
          y($.target.value), de(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: g, onChange: ($) => {
          C($.target.value), de(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: f, onChange: ($) => k($.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          s.map(($) => /* @__PURE__ */ d.jsxDEV("option", { value: $.id, children: $.name }, $.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 83,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: ($) => {
          T($.target.value), de(1);
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
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: ne, onChange: ($) => {
        me(parseInt($.target.value, 10)), de(1);
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
      G && /* @__PURE__ */ d.jsxDEV(m_, { onClose: () => B(!1), onCreated: () => {
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
          !_ && A && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "auth-error", children: A }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 114,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 114,
            columnNumber: 17
          }, this),
          !_ && !A && ve.map(($) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": $.id, "data-status": $.status, "data-last-days": $.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { className: "rider-name-link", href: `/riders/${$.id}`, children: $.name }, void 0, !1, {
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
          !_ && !A && ve.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: q.page <= 1 || _, onClick: () => de(($) => Math.max(1, $ - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 138,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        q.page,
        " of ",
        q.pages,
        " • ",
        q.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 139,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: q.page >= q.pages || _, onClick: () => de(($) => Math.min(q.pages, $ + 1)), children: "Next" }, void 0, !1, {
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
function h_() {
  const { id: s } = bw(), [m, h] = R.useState(null), [y, g] = R.useState(!0), [C, f] = R.useState("");
  if (R.useEffect(() => {
    let _ = !0;
    return (async () => {
      g(!0), f("");
      try {
        const x = await fetch(`/api/riders/${s}`, { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load rider");
        const A = await x.json();
        _ && h(A);
      } catch (x) {
        _ && f(x.message || "Failed to load rider");
      } finally {
        _ && g(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, [s]), y)
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
  if (C)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: C }, void 0, !1, {
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
  const { rider: k, metrics: D, history: T } = m;
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
        /* @__PURE__ */ d.jsxDEV("h3", { className: "rp-name", children: k.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          k.id
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
      /* @__PURE__ */ d.jsxDEV("tbody", { children: (T || []).map((_, x) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
function xE({ orderId: s, onClose: m, onAssigned: h }) {
  const [y, g] = R.useState([]), [C, f] = R.useState(!0), [k, D] = R.useState(""), [T, _] = R.useState(null);
  R.useEffect(() => {
    let A = !0;
    return (async () => {
      f(!0), D("");
      try {
        const V = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (V.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!V.ok) throw new Error("Failed to load riders");
        const K = await V.json();
        A && g(Array.isArray(K.riders) ? K.riders : K.riders || []);
      } catch (V) {
        A && D(V.message || "Failed to load riders");
      } finally {
        A && f(!1);
      }
    })(), () => {
      A = !1;
    };
  }, []);
  async function x(A) {
    if (!(!s || !A)) {
      _(A);
      try {
        const V = await fetch(`/api/orders/${encodeURIComponent(s)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: A })
        });
        if (V.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const K = await V.json().catch(() => null);
        if (!V.ok) throw new Error(K && K.error ? K.error : "Assign failed");
        h && h({ orderId: s, riderId: A }), m();
      } catch (V) {
        alert(V.message || "Failed to assign rider");
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
      C && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 52,
        columnNumber: 23
      }, this),
      k && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: k }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 53,
        columnNumber: 21
      }, this),
      !C && !k && /* @__PURE__ */ d.jsxDEV("table", { className: "assign-table", children: [
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
          y.map((A) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { children: A.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 62,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: A.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 63,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-assign", onClick: () => x(A.id), disabled: T && T !== A.id, children: T === A.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 65,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 64,
              columnNumber: 21
            }, this)
          ] }, A.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 61,
            columnNumber: 19
          }, this)),
          y.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No riders found." }, void 0, !1, {
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
function RE(s) {
  return s && typeof s.current_status == "string" ? s.current_status : "";
}
function wv(s) {
  const m = RE(s);
  return m ? m.toLowerCase().trim() : "";
}
function g_() {
  const [s, m] = R.useState([]), [h, y] = R.useState(""), [g, C] = R.useState("all"), [f, k] = R.useState(1), [D, T] = R.useState(20), [_, x] = R.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [A, V] = R.useState(!0), [K, de] = R.useState(""), [ne, me] = R.useState(""), [q, Y] = R.useState(!0), [G, B] = R.useState(!1), [ve, $] = R.useState(null);
  R.useEffect(() => {
    let U = !0;
    return (async () => {
      var he, ue, ge, Ae;
      V(!0), de(""), me("");
      try {
        const _e = new URLSearchParams();
        h && _e.set("q", h), g && g !== "all" && _e.set("status", g), _e.set("page", String(f)), _e.set("limit", String(D));
        const ye = await fetch(`/api/orders?${_e.toString()}`, { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load orders");
        const Ge = await ye.json();
        U && (m(Array.isArray(Ge.orders) ? Ge.orders : []), me(Ge.shopifyError || ""), Y(!!Ge.shopifyConfigured), x({ total: ((he = Ge.meta) == null ? void 0 : he.total) || 0, page: ((ue = Ge.meta) == null ? void 0 : ue.page) || 1, limit: ((ge = Ge.meta) == null ? void 0 : ge.limit) || D, pages: ((Ae = Ge.meta) == null ? void 0 : Ae.pages) || 1 }));
      } catch (_e) {
        U && de(_e.message || "Failed to load orders");
      } finally {
        U && V(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [h, g, f, D]), R.useMemo(() => s, [s]);
  const Ue = R.useMemo(() => Array.isArray(s) ? g === "all" ? s.filter((U) => wv(U) !== "assigned") : s.filter((U) => wv(U) === g) : [], [s, g]);
  function ce() {
    $(null), B(!1);
  }
  function re(U) {
    try {
      const { orderId: he } = U || {};
      if (!he) return;
      const ue = String(he).replace(/^#+/, "");
      m((ge) => ge.filter((Ae) => String(Ae.name || Ae.order_number || Ae.id).replace(/^#+/, "") !== String(ue))), x((ge) => ({ ...ge || {}, total: Math.max(0, ((ge == null ? void 0 : ge.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${he}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 79,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 86,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (U) => {
          y(U.target.value), k(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 87,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        ["all", "new", "assigned", "in-transit", "delivered"].map((U) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${g === U ? " active" : ""}`, onClick: () => {
          C(U), k(1);
        }, "data-filter": U, children: U === "all" ? "All" : U.replace("-", " ") }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 91,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (U) => {
          T(parseInt(U.target.value, 10)), k(1);
        }, children: [10, 20, 50, 100].map((U) => /* @__PURE__ */ d.jsxDEV("option", { value: U, children: [
          U,
          "/page"
        ] }, U, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 96,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 95,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 89,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 84,
      columnNumber: 9
    }, this),
    !q && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 102,
      columnNumber: 11
    }, this),
    ne && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ne }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 104,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 110,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 111,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 112,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 113,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected", children: "Expected Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual", children: "Actual Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 115,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 116,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 109,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 108,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        A && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 121,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 121,
          columnNumber: 17
        }, this),
        !A && K && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: K }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 124,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 124,
          columnNumber: 17
        }, this),
        !A && !K && Ue.map((U, he) => {
          var Ge;
          const ue = RE(U), ge = wv(U), Ae = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let _e = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? _e = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? _e = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((cn) => String(cn || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? _e = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (_e = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((cn) => String(cn || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = U.name || U.order_number || U.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": ge, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: ye }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 146,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: Ae || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 147,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: _e }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 148,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider", children: U.rider ? String(U.rider) : (Ge = U.assignment) != null && Ge.riderId ? String(U.assignment.riderId) : "Unassigned" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 149,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected", children: U.expected_delivery_time ? new Date(U.expected_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 150,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual", children: U.actual_delivery_time ? new Date(U.actual_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 151,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${ge}`, children: ue }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 152,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 152,
              columnNumber: 21
            }, this)
          ] }, ye || he, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 145,
            columnNumber: 19
          }, this);
        }),
        !A && !K && Ue.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 157,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 157,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 119,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 107,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      G && ve && /* @__PURE__ */ d.jsxDEV(xE, { orderId: ve, onClose: ce, onAssigned: re }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 164,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || A, onClick: () => k((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 168,
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
          lineNumber: 169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || A, onClick: () => k((U) => Math.min(_.pages, U + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 170,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 167,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 162,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 78,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 77,
    columnNumber: 5
  }, this);
}
function y_() {
  const [s, m] = R.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, y] = R.useState([]), [g, C] = R.useState(!1), [f, k] = R.useState(!0), [D, T] = R.useState("");
  return R.useEffect(() => {
    let _ = !0;
    return (async () => {
      k(!0), T("");
      try {
        const x = await fetch("/api/reports", { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load reports");
        const A = await x.json();
        _ && (m(A.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), y(Array.isArray(A.deliveries) ? A.deliveries : []));
      } catch (x) {
        _ && T(x.message || "Failed to load reports");
      } finally {
        _ && k(!1);
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: g, onChange: (_) => C(_.target.checked) }, void 0, !1, {
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
      g && /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
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
          !f && !D && h.map((_, x) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
          ] }, _.orderId || x, !0, {
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
function b_() {
  const [s, m] = R.useState([]), [h, y] = R.useState(!0), [g, C] = R.useState(""), [f, k] = R.useState(1), [D, T] = R.useState(25), [_, x] = R.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  R.useEffect(() => {
    let G = !0;
    return (async () => {
      var B, ve, $, Ue;
      y(!0), C("");
      try {
        const ce = new URLSearchParams();
        ce.set("limit", String(D)), ce.set("page", String(f));
        const re = await fetch(`/api/orders?${ce.toString()}`, { credentials: "include" });
        if (re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!re.ok) throw new Error("Failed to load orders");
        const U = await re.json();
        G && (m(Array.isArray(U.orders) ? U.orders : []), x({ total: ((B = U.meta) == null ? void 0 : B.total) || 0, page: ((ve = U.meta) == null ? void 0 : ve.page) || f, limit: (($ = U.meta) == null ? void 0 : $.limit) || D, pages: ((Ue = U.meta) == null ? void 0 : Ue.pages) || 1 }));
      } catch (ce) {
        G && C(ce.message || "Failed to load orders");
      } finally {
        G && y(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [f]);
  function A(G) {
    return G && G.assignment || (Array.isArray(G.tags) ? G.tags : typeof G.tags == "string" ? G.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : G.fulfillment_status === "fulfilled" ? "delivered" : G.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  const [V, K] = R.useState(!1), [de, ne] = R.useState(null);
  function me(G) {
    ne(G), K(!0);
  }
  function q() {
    ne(null), K(!1);
  }
  function Y(G) {
    try {
      const { orderId: B } = G || {};
      if (!B) return;
      const ve = String(B).replace(/^#+/, "");
      m(($) => $.filter((Ue, ce) => {
        const re = String(Ue.id || Ue.name || Ue.order_number || ce).replace(/^#+/, "");
        return String(re) !== String(ve);
      })), x(($) => ({ ...$ || {}, total: Math.max(0, (($ == null ? void 0 : $.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${B}`, { type: "success" });
      } catch {
      }
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: h ? "…" : _.total || s.length }, void 0, !1, {
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
        !h && g && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: g }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 28
        }, this),
        !h && !g && (Array.isArray(s) ? s.filter((B) => A(B) !== "assigned") : []).map((B, ve) => {
          const $ = A(B), Ue = B.full_name || (B.customer && B.customer.full_name ? B.customer.full_name : "");
          let ce = "-";
          typeof B.shipping_address == "string" && String(B.shipping_address).trim() ? ce = String(B.shipping_address).trim() : B.shipping_address && typeof B.shipping_address == "object" ? ce = [B.shipping_address.address1 || "", B.shipping_address.city || "", B.shipping_address.province || "", B.shipping_address.country || ""].map((Ae) => String(Ae || "").trim()).filter(Boolean).join(", ") || "-" : typeof B.billing_address == "string" && String(B.billing_address).trim() ? ce = String(B.billing_address).trim() : B.billing_address && typeof B.billing_address == "object" && (ce = [B.billing_address.address1 || "", B.billing_address.city || "", B.billing_address.province || "", B.billing_address.country || ""].map((Ae) => String(Ae || "").trim()).filter(Boolean).join(", ") || "-");
          const re = B.name || B.order_number || B.id || ve, U = String(B.id || B.name || B.order_number || ve).replace(/^#+/, ""), he = B.created_at ? new Date(B.created_at) : null, ue = he ? he.toLocaleDateString() : "-", ge = he ? he.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": $, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: re }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: Ue || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: ce }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${$}`, children: $.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: ue }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: ge }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => me(String(B.id || B.name || B.order_number || ve)), children: "Assign Rider" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, U, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 125,
            columnNumber: 21
          }, this);
        }),
        !h && !g && s.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || h, onClick: () => k((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
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
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || h, onClick: () => k((G) => Math.min(_.pages, G + 1)), children: "Next" }, void 0, !1, {
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
    V && de && /* @__PURE__ */ d.jsxDEV(xE, { orderId: de, onClose: q, onAssigned: Y }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
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
function N_() {
  return /* @__PURE__ */ d.jsxDEV(Jw, { children: /* @__PURE__ */ d.jsxDEV(Uw, { children: [
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(f_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(d_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(h_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(g_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(b_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(Vw, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
  pE(s).render(/* @__PURE__ */ d.jsxDEV(N_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", oE) : oE();
