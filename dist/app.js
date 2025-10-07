function Hw(u, p) {
  for (var v = 0; v < p.length; v++) {
    const y = p[v];
    if (typeof y != "string" && !Array.isArray(y)) {
      for (const g in y)
        if (g !== "default" && !(g in u)) {
          const C = Object.getOwnPropertyDescriptor(y, g);
          C && Object.defineProperty(u, g, C.get ? C : {
            enumerable: !0,
            get: () => y[g]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, { value: "Module" }));
}
function Bw(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var cE = { exports: {} }, wv = {}, fE = { exports: {} }, hf = { exports: {} };
hf.exports;
(function(u, p) {
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
    var v = "18.3.1", y = Symbol.for("react.element"), g = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), ae = Symbol.iterator, he = "@@iterator";
    function I(c) {
      if (c === null || typeof c != "object")
        return null;
      var b = ae && c[ae] || c[he];
      return typeof b == "function" ? b : null;
    }
    var $ = {
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
    }, ge = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, ce = {}, X = null;
    function ie(c) {
      X = c;
    }
    ce.setExtraStackFrame = function(c) {
      X = c;
    }, ce.getCurrentStack = null, ce.getStackAddendum = function() {
      var c = "";
      X && (c += X);
      var b = ce.getCurrentStack;
      return b && (c += b() || ""), c;
    };
    var J = !1, U = !1, ve = !1, oe = !1, Te = !1, je = {
      ReactCurrentDispatcher: $,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: ge
    };
    je.ReactDebugCurrentFrame = ce, je.ReactCurrentActQueue = B;
    function Le(c) {
      {
        for (var b = arguments.length, L = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          L[F - 1] = arguments[F];
        Ge("warn", c, L);
      }
    }
    function ye(c) {
      {
        for (var b = arguments.length, L = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          L[F - 1] = arguments[F];
        Ge("error", c, L);
      }
    }
    function Ge(c, b, L) {
      {
        var F = je.ReactDebugCurrentFrame, K = F.getStackAddendum();
        K !== "" && (b += "%s", L = L.concat([K]));
        var Re = L.map(function(de) {
          return String(de);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[c], console, Re);
      }
    }
    var Ht = {};
    function Nn(c, b) {
      {
        var L = c.constructor, F = L && (L.displayName || L.name) || "ReactClass", K = F + "." + b;
        if (Ht[K])
          return;
        ye("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, F), Ht[K] = !0;
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
      enqueueReplaceState: function(c, b, L, F) {
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
      enqueueSetState: function(c, b, L, F) {
        Nn(c, "setState");
      }
    }, Bt = Object.assign, pa = {};
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
            Le("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Kt in er)
        er.hasOwnProperty(Kt) && ka(Kt, er[Kt]);
    }
    function Yn() {
    }
    Yn.prototype = En.prototype;
    function Xt(c, b, L) {
      this.props = c, this.context = b, this.refs = pa, this.updater = L || $n;
    }
    var Jt = Xt.prototype = new Yn();
    Jt.constructor = Xt, Bt(Jt, En.prototype), Jt.isPureReactComponent = !0;
    function Zt() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var An = Array.isArray;
    function Pt(c) {
      return An(c);
    }
    function Sn(c) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, L = b && c[Symbol.toStringTag] || c.constructor.name || "Object";
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
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Sn(c)), Yt(c);
    }
    function tr(c, b, L) {
      var F = c.displayName;
      if (F)
        return F;
      var K = b.displayName || b.name || "";
      return K !== "" ? L + "(" + K + ")" : L;
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
            var F = c.displayName || null;
            return F !== null ? F : Vn(c.type) || "Memo";
          case Q: {
            var K = c, Re = K._payload, de = K._init;
            try {
              return Vn(de(Re));
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
    function ee(c) {
      if (typeof c.ref == "string" && ge.current && c.__self && ge.current.stateNode !== c.__self) {
        var b = Vn(ge.current.type);
        wt[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, c.ref), wt[b] = !0);
      }
    }
    var be = function(c, b, L, F, K, Re, de) {
      var Me = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: y,
        // Built-in properties that belong on the element
        type: c,
        key: b,
        ref: L,
        props: de,
        // Record the component responsible for creating this element.
        _owner: Re
      };
      return Me._store = {}, Object.defineProperty(Me._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Me, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: F
      }), Object.defineProperty(Me, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: K
      }), Object.freeze && (Object.freeze(Me.props), Object.freeze(Me)), Me;
    };
    function Fe(c, b, L) {
      var F, K = {}, Re = null, de = null, Me = null, $e = null;
      if (b != null) {
        Rn(b) && (de = b.ref, ee(b)), kn(b) && (ta(b.key), Re = "" + b.key), Me = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (F in b)
          fn.call(b, F) && !en.hasOwnProperty(F) && (K[F] = b[F]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        K.children = L;
      else if (tt > 1) {
        for (var ot = Array(tt), ut = 0; ut < tt; ut++)
          ot[ut] = arguments[ut + 2];
        Object.freeze && Object.freeze(ot), K.children = ot;
      }
      if (c && c.defaultProps) {
        var He = c.defaultProps;
        for (F in He)
          K[F] === void 0 && (K[F] = He[F]);
      }
      if (Re || de) {
        var vt = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
        Re && _r(K, vt), de && nr(K, vt);
      }
      return be(c, Re, de, Me, $e, ge.current, K);
    }
    function et(c, b) {
      var L = be(c.type, b, c.ref, c._self, c._source, c._owner, c.props);
      return L;
    }
    function ct(c, b, L) {
      if (c == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
      var F, K = Bt({}, c.props), Re = c.key, de = c.ref, Me = c._self, $e = c._source, tt = c._owner;
      if (b != null) {
        Rn(b) && (de = b.ref, tt = ge.current), kn(b) && (ta(b.key), Re = "" + b.key);
        var ot;
        c.type && c.type.defaultProps && (ot = c.type.defaultProps);
        for (F in b)
          fn.call(b, F) && !en.hasOwnProperty(F) && (b[F] === void 0 && ot !== void 0 ? K[F] = ot[F] : K[F] = b[F]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        K.children = L;
      else if (ut > 1) {
        for (var He = Array(ut), vt = 0; vt < ut; vt++)
          He[vt] = arguments[vt + 2];
        K.children = He;
      }
      return be(c.type, Re, de, Me, $e, tt, K);
    }
    function gt(c) {
      return typeof c == "object" && c !== null && c.$$typeof === y;
    }
    var yt = ".", dn = ":";
    function Nt(c) {
      var b = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, F = c.replace(b, function(K) {
        return L[K];
      });
      return "$" + F;
    }
    var it = !1, Et = /\/+/g;
    function va(c) {
      return c.replace(Et, "$&/");
    }
    function ha(c, b) {
      return typeof c == "object" && c !== null && c.key != null ? (ta(c.key), Nt("" + c.key)) : b.toString(36);
    }
    function na(c, b, L, F, K) {
      var Re = typeof c;
      (Re === "undefined" || Re === "boolean") && (c = null);
      var de = !1;
      if (c === null)
        de = !0;
      else
        switch (Re) {
          case "string":
          case "number":
            de = !0;
            break;
          case "object":
            switch (c.$$typeof) {
              case y:
              case g:
                de = !0;
            }
        }
      if (de) {
        var Me = c, $e = K(Me), tt = F === "" ? yt + ha(Me, 0) : F;
        if (Pt($e)) {
          var ot = "";
          tt != null && (ot = va(tt) + "/"), na($e, b, ot, "", function(Cf) {
            return Cf;
          });
        } else $e != null && (gt($e) && ($e.key && (!Me || Me.key !== $e.key) && ta($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Me || Me.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            va("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var ut, He, vt = 0, Ct = F === "" ? yt : F + dn;
      if (Pt(c))
        for (var bi = 0; bi < c.length; bi++)
          ut = c[bi], He = Ct + ha(ut, bi), vt += na(ut, b, L, He, K);
      else {
        var yo = I(c);
        if (typeof yo == "function") {
          var lr = c;
          yo === lr.entries && (it || Le("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var bo = yo.call(lr), No, Rf = 0; !(No = bo.next()).done; )
            ut = No.value, He = Ct + ha(ut, Rf++), vt += na(ut, b, L, He, K);
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
      var F = [], K = 0;
      return na(c, F, "", "", function(Re) {
        return b.call(L, Re, K++);
      }), F;
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
      var L = !1, F = !1, K = !1;
      {
        var Re = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(Re, {
          Provider: {
            get: function() {
              return F || (F = !0, ye("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
            },
            set: function(de) {
              b.Provider = de;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(de) {
              b._currentValue = de;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(de) {
              b._currentValue2 = de;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(de) {
              b._threadCount = de;
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
            set: function(de) {
              K || (Le("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", de), K = !0);
            }
          }
        }), b.Consumer = Re;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var ga = -1, aa = 0, In = 1, Fa = 2;
    function fi(c) {
      if (c._status === ga) {
        var b = c._result, L = b();
        if (L.then(function(Re) {
          if (c._status === aa || c._status === ga) {
            var de = c;
            de._status = In, de._result = Re;
          }
        }, function(Re) {
          if (c._status === aa || c._status === ga) {
            var de = c;
            de._status = Fa, de._result = Re;
          }
        }), c._status === ga) {
          var F = c;
          F._status = aa, F._result = L;
        }
      }
      if (c._status === In) {
        var K = c._result;
        return K === void 0 && ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, K), "default" in K || ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, K), K.default;
      } else
        throw c._result;
    }
    function N(c) {
      var b = {
        // We use these fields to store the result.
        _status: ga,
        _result: c
      }, L = {
        $$typeof: Q,
        _payload: b,
        _init: fi
      };
      {
        var F, K;
        Object.defineProperties(L, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Re, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return K;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), K = Re, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function q(c) {
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
          set: function(F) {
            L = F, !c.name && !c.displayName && (c.displayName = F);
          }
        });
      }
      return b;
    }
    var te;
    te = Symbol.for("react.module.reference");
    function Ne(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === C || c === k || Te || c === f || c === x || c === A || oe || c === pe || J || U || ve || typeof c == "object" && c !== null && (c.$$typeof === Q || c.$$typeof === V || c.$$typeof === D || c.$$typeof === T || c.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === te || c.getModuleId !== void 0));
    }
    function Pe(c, b) {
      Ne(c) || ye("memo: The first argument must be a component. Instead received: %s", c === null ? "null" : typeof c);
      var L = {
        $$typeof: V,
        type: c,
        compare: b === void 0 ? null : b
      };
      {
        var F;
        Object.defineProperty(L, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return F;
          },
          set: function(K) {
            F = K, !c.name && !c.displayName && (c.displayName = K);
          }
        });
      }
      return L;
    }
    function we() {
      var c = $.current;
      return c === null && ye(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), c;
    }
    function ke(c) {
      var b = we();
      if (c._context !== void 0) {
        var L = c._context;
        L.Consumer === c ? ye("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === c && ye("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(c);
    }
    function Se(c) {
      var b = we();
      return b.useState(c);
    }
    function _t(c, b, L) {
      var F = we();
      return F.useReducer(c, b, L);
    }
    function ft(c) {
      var b = we();
      return b.useRef(c);
    }
    function dt(c, b) {
      var L = we();
      return L.useEffect(c, b);
    }
    function pn(c, b) {
      var L = we();
      return L.useInsertionEffect(c, b);
    }
    function za(c, b) {
      var L = we();
      return L.useLayoutEffect(c, b);
    }
    function ya(c, b) {
      var L = we();
      return L.useCallback(c, b);
    }
    function Ot(c, b) {
      var L = we();
      return L.useMemo(c, b);
    }
    function di(c, b, L) {
      var F = we();
      return F.useImperativeHandle(c, b, L);
    }
    function ba(c, b) {
      {
        var L = we();
        return L.useDebugValue(c, b);
      }
    }
    function ze() {
      var c = we();
      return c.useTransition();
    }
    function pi(c) {
      var b = we();
      return b.useDeferredValue(c);
    }
    function ns() {
      var c = we();
      return c.useId();
    }
    function as(c, b, L) {
      var F = we();
      return F.useSyncExternalStore(c, b, L);
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
        Or < 0 && ye("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = je.ReactCurrentDispatcher, Lr;
    function Zi(c, b, L) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (K) {
            var F = K.stack.trim().match(/\n( *(at )?)/);
            Lr = F && F[1] || "";
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
      var F;
      vi = !0;
      var K = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = mi.current, mi.current = null, uo();
      try {
        if (b) {
          var de = function() {
            throw Error();
          };
          if (Object.defineProperty(de.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(de, []);
            } catch (Ct) {
              F = Ct;
            }
            Reflect.construct(c, [], de);
          } else {
            try {
              de.call();
            } catch (Ct) {
              F = Ct;
            }
            c.call(de.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ct) {
            F = Ct;
          }
          c();
        }
      } catch (Ct) {
        if (Ct && F && typeof Ct.stack == "string") {
          for (var Me = Ct.stack.split(`
`), $e = F.stack.split(`
`), tt = Me.length - 1, ot = $e.length - 1; tt >= 1 && ot >= 0 && Me[tt] !== $e[ot]; )
            ot--;
          for (; tt >= 1 && ot >= 0; tt--, ot--)
            if (Me[tt] !== $e[ot]) {
              if (tt !== 1 || ot !== 1)
                do
                  if (tt--, ot--, ot < 0 || Me[tt] !== $e[ot]) {
                    var ut = `
` + Me[tt].replace(" at new ", " at ");
                    return c.displayName && ut.includes("<anonymous>") && (ut = ut.replace("<anonymous>", c.displayName)), typeof c == "function" && el.set(c, ut), ut;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = Re, Ha(), Error.prepareStackTrace = K;
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
          case Q: {
            var F = c, K = F._payload, Re = F._init;
            try {
              return hi(Re(K), b, L);
            } catch {
            }
          }
        }
      return "";
    }
    var os = {}, fo = je.ReactDebugCurrentFrame;
    function Ke(c) {
      if (c) {
        var b = c._owner, L = hi(c.type, c._source, b ? b.type : null);
        fo.setExtraStackFrame(L);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(c, b, L, F, K) {
      {
        var Re = Function.call.bind(fn);
        for (var de in c)
          if (Re(c, de)) {
            var Me = void 0;
            try {
              if (typeof c[de] != "function") {
                var $e = Error((F || "React class") + ": " + L + " type `" + de + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[de] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Me = c[de](b, de, F, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Me = tt;
            }
            Me && !(Me instanceof Error) && (Ke(K), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", L, de, typeof Me), Ke(null)), Me instanceof Error && !(Me.message in os) && (os[Me.message] = !0, Ke(K), ye("Failed %s type: %s", L, Me.message), Ke(null));
          }
      }
    }
    function rr(c) {
      if (c) {
        var b = c._owner, L = hi(c.type, c._source, b ? b.type : null);
        ie(L);
      } else
        ie(null);
    }
    var Ve;
    Ve = !1;
    function po() {
      if (ge.current) {
        var c = Vn(ge.current.type);
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
    function It(c, b) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var L = Ef(b);
        if (!Mr[L]) {
          Mr[L] = !0;
          var F = "";
          c && c._owner && c._owner !== ge.current && (F = " It was passed a child from " + Vn(c._owner.type) + "."), rr(c), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, F), rr(null);
        }
      }
    }
    function mt(c, b) {
      if (typeof c == "object") {
        if (Pt(c))
          for (var L = 0; L < c.length; L++) {
            var F = c[L];
            gt(F) && It(F, b);
          }
        else if (gt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var K = I(c);
          if (typeof K == "function" && K !== c.entries)
            for (var Re = K.call(c), de; !(de = Re.next()).done; )
              gt(de.value) && It(de.value, b);
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
          var F = Vn(b);
          Nf(L, c.props, "prop", F, c);
        } else if (b.PropTypes !== void 0 && !Ve) {
          Ve = !0;
          var K = Vn(b);
          ye("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", K || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ye("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ra(c) {
      {
        for (var b = Object.keys(c.props), L = 0; L < b.length; L++) {
          var F = b[L];
          if (F !== "children" && F !== "key") {
            rr(c), ye("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), rr(null);
            break;
          }
        }
        c.ref !== null && (rr(c), ye("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function Dn(c, b, L) {
      var F = Ne(c);
      if (!F) {
        var K = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = gi(b);
        Re ? K += Re : K += po();
        var de;
        c === null ? de = "null" : Pt(c) ? de = "array" : c !== void 0 && c.$$typeof === y ? (de = "<" + (Vn(c.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : de = typeof c, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", de, K);
      }
      var Me = Fe.apply(this, arguments);
      if (Me == null)
        return Me;
      if (F)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], c);
      return c === C ? ra(Me) : us(Me), Me;
    }
    var Na = !1;
    function Sf(c) {
      var b = Dn.bind(null, c);
      return b.type = c, Na || (Na = !0, Le("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return Le("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: c
          }), c;
        }
      }), b;
    }
    function mo(c, b, L) {
      for (var F = ct.apply(this, arguments), K = 2; K < arguments.length; K++)
        mt(arguments[K], F.type);
      return us(F), F;
    }
    function ss(c, b) {
      var L = G.transition;
      G.transition = {};
      var F = G.transition;
      G.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        c();
      } finally {
        if (G.transition = L, L === null && F._updatedFibers) {
          var K = F._updatedFibers.size;
          K > 10 && Le("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
        }
      }
    }
    var vo = !1, tl = null;
    function xf(c) {
      if (tl === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), L = u && u[b];
          tl = L.call(u, "timers").setImmediate;
        } catch {
          tl = function(K) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && ye("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = K, Re.port2.postMessage(void 0);
          };
        }
      return tl(c);
    }
    var Ar = 0, yi = !1;
    function ho(c) {
      {
        var b = Ar;
        Ar++, B.current === null && (B.current = []);
        var L = B.isBatchingLegacy, F;
        try {
          if (B.isBatchingLegacy = !0, F = c(), !L && B.didScheduleLegacyUpdate) {
            var K = B.current;
            K !== null && (B.didScheduleLegacyUpdate = !1, rl(K));
          }
        } catch (He) {
          throw ir(b), He;
        } finally {
          B.isBatchingLegacy = L;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Re = F, de = !1, Me = {
            then: function(He, vt) {
              de = !0, Re.then(function(Ct) {
                ir(b), Ar === 0 ? nl(Ct, He, vt) : He(Ct);
              }, function(Ct) {
                ir(b), vt(Ct);
              });
            }
          };
          return !yi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            de || (yi = !0, ye("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Me;
        } else {
          var $e = F;
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
        var F = B.current;
        if (F !== null)
          try {
            rl(F), xf(function() {
              F.length === 0 ? (B.current = null, b(c)) : nl(c, b, L);
            });
          } catch (K) {
            L(K);
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
        } catch (F) {
          throw c = c.slice(b + 1), F;
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
    p.Children = ds, p.Component = En, p.Fragment = C, p.Profiler = k, p.PureComponent = Xt, p.StrictMode = f, p.Suspense = x, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = je, p.act = ho, p.cloneElement = fs, p.createContext = ci, p.createElement = cs, p.createFactory = go, p.createRef = Zt, p.forwardRef = q, p.isValidElement = gt, p.lazy = N, p.memo = Pe, p.startTransition = ss, p.unstable_act = ho, p.useCallback = ya, p.useContext = ke, p.useDebugValue = ba, p.useDeferredValue = pi, p.useEffect = dt, p.useId = ns, p.useImperativeHandle = di, p.useInsertionEffect = pn, p.useLayoutEffect = za, p.useMemo = Ot, p.useReducer = _t, p.useRef = ft, p.useState = Se, p.useSyncExternalStore = as, p.useTransition = ze, p.version = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var Pw = hf.exports;
fE.exports = Pw;
var R = fE.exports;
const $w = /* @__PURE__ */ Bw(R), Yw = /* @__PURE__ */ Hw({
  __proto__: null,
  default: $w
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
  var u = R, p = Symbol.for("react.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), k = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), Q = Symbol.iterator, pe = "@@iterator";
  function ae(N) {
    if (N === null || typeof N != "object")
      return null;
    var q = Q && N[Q] || N[pe];
    return typeof q == "function" ? q : null;
  }
  var he = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function I(N) {
    {
      for (var q = arguments.length, te = new Array(q > 1 ? q - 1 : 0), Ne = 1; Ne < q; Ne++)
        te[Ne - 1] = arguments[Ne];
      $("error", N, te);
    }
  }
  function $(N, q, te) {
    {
      var Ne = he.ReactDebugCurrentFrame, Pe = Ne.getStackAddendum();
      Pe !== "" && (q += "%s", te = te.concat([Pe]));
      var we = te.map(function(ke) {
        return String(ke);
      });
      we.unshift("Warning: " + q), Function.prototype.apply.call(console[N], console, we);
    }
  }
  var G = !1, B = !1, ge = !1, ce = !1, X = !1, ie;
  ie = Symbol.for("react.module.reference");
  function J(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === y || N === C || X || N === g || N === T || N === _ || ce || N === V || G || B || ge || typeof N == "object" && N !== null && (N.$$typeof === A || N.$$typeof === x || N.$$typeof === f || N.$$typeof === k || N.$$typeof === D || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === ie || N.getModuleId !== void 0));
  }
  function U(N, q, te) {
    var Ne = N.displayName;
    if (Ne)
      return Ne;
    var Pe = q.displayName || q.name || "";
    return Pe !== "" ? te + "(" + Pe + ")" : te;
  }
  function ve(N) {
    return N.displayName || "Context";
  }
  function oe(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && I("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
      return N.displayName || N.name || null;
    if (typeof N == "string")
      return N;
    switch (N) {
      case y:
        return "Fragment";
      case v:
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
          var q = N;
          return ve(q) + ".Consumer";
        case f:
          var te = N;
          return ve(te._context) + ".Provider";
        case D:
          return U(N, N.render, "ForwardRef");
        case x:
          var Ne = N.displayName || null;
          return Ne !== null ? Ne : oe(N.type) || "Memo";
        case A: {
          var Pe = N, we = Pe._payload, ke = Pe._init;
          try {
            return oe(ke(we));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Te = Object.assign, je = 0, Le, ye, Ge, Ht, Nn, $n, Bt;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function En() {
    {
      if (je === 0) {
        Le = console.log, ye = console.info, Ge = console.warn, Ht = console.error, Nn = console.group, $n = console.groupCollapsed, Bt = console.groupEnd;
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
      je++;
    }
  }
  function er() {
    {
      if (je--, je === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Te({}, N, {
            value: Le
          }),
          info: Te({}, N, {
            value: ye
          }),
          warn: Te({}, N, {
            value: Ge
          }),
          error: Te({}, N, {
            value: Ht
          }),
          group: Te({}, N, {
            value: Nn
          }),
          groupCollapsed: Te({}, N, {
            value: $n
          }),
          groupEnd: Te({}, N, {
            value: Bt
          })
        });
      }
      je < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var ka = he.ReactCurrentDispatcher, Kt;
  function Yn(N, q, te) {
    {
      if (Kt === void 0)
        try {
          throw Error();
        } catch (Pe) {
          var Ne = Pe.stack.trim().match(/\n( *(at )?)/);
          Kt = Ne && Ne[1] || "";
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
  function An(N, q) {
    if (!N || Xt)
      return "";
    {
      var te = Jt.get(N);
      if (te !== void 0)
        return te;
    }
    var Ne;
    Xt = !0;
    var Pe = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var we;
    we = ka.current, ka.current = null, En();
    try {
      if (q) {
        var ke = function() {
          throw Error();
        };
        if (Object.defineProperty(ke.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(ke, []);
          } catch (Ot) {
            Ne = Ot;
          }
          Reflect.construct(N, [], ke);
        } else {
          try {
            ke.call();
          } catch (Ot) {
            Ne = Ot;
          }
          N.call(ke.prototype);
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
                  return N.displayName && pn.includes("<anonymous>") && (pn = pn.replace("<anonymous>", N.displayName)), typeof N == "function" && Jt.set(N, pn), pn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Xt = !1, ka.current = we, er(), Error.prepareStackTrace = Pe;
    }
    var za = N ? N.displayName || N.name : "", ya = za ? Yn(za) : "";
    return typeof N == "function" && Jt.set(N, ya), ya;
  }
  function Pt(N, q, te) {
    return An(N, !1);
  }
  function Sn(N) {
    var q = N.prototype;
    return !!(q && q.isReactComponent);
  }
  function $t(N, q, te) {
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
          return Pt(N.render);
        case x:
          return $t(N.type, q, te);
        case A: {
          var Ne = N, Pe = Ne._payload, we = Ne._init;
          try {
            return $t(we(Pe), q, te);
          } catch {
          }
        }
      }
    return "";
  }
  var Yt = Object.prototype.hasOwnProperty, ta = {}, tr = he.ReactDebugCurrentFrame;
  function ma(N) {
    if (N) {
      var q = N._owner, te = $t(N.type, N._source, q ? q.type : null);
      tr.setExtraStackFrame(te);
    } else
      tr.setExtraStackFrame(null);
  }
  function Vn(N, q, te, Ne, Pe) {
    {
      var we = Function.call.bind(Yt);
      for (var ke in N)
        if (we(N, ke)) {
          var Se = void 0;
          try {
            if (typeof N[ke] != "function") {
              var _t = Error((Ne || "React class") + ": " + te + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw _t.name = "Invariant Violation", _t;
            }
            Se = N[ke](q, ke, Ne, te, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Se = ft;
          }
          Se && !(Se instanceof Error) && (ma(Pe), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", te, ke, typeof Se), ma(null)), Se instanceof Error && !(Se.message in ta) && (ta[Se.message] = !0, ma(Pe), I("Failed %s type: %s", te, Se.message), ma(null));
        }
    }
  }
  var fn = Array.isArray;
  function en(N) {
    return fn(N);
  }
  function xn(N) {
    {
      var q = typeof Symbol == "function" && Symbol.toStringTag, te = q && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return te;
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
      return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xn(N)), wt(N);
  }
  var kn = he.ReactCurrentOwner, _r = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, ee, be;
  be = {};
  function Fe(N) {
    if (Yt.call(N, "ref")) {
      var q = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (q && q.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if (Yt.call(N, "key")) {
      var q = Object.getOwnPropertyDescriptor(N, "key").get;
      if (q && q.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, q) {
    if (typeof N.ref == "string" && kn.current && q && kn.current.stateNode !== q) {
      var te = oe(kn.current.type);
      be[te] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', oe(kn.current.type), N.ref), be[te] = !0);
    }
  }
  function gt(N, q) {
    {
      var te = function() {
        nr || (nr = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", q));
      };
      te.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: te,
        configurable: !0
      });
    }
  }
  function yt(N, q) {
    {
      var te = function() {
        ee || (ee = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", q));
      };
      te.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: te,
        configurable: !0
      });
    }
  }
  var dn = function(N, q, te, Ne, Pe, we, ke) {
    var Se = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: N,
      key: q,
      ref: te,
      props: ke,
      // Record the component responsible for creating this element.
      _owner: we
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
  function Nt(N, q, te, Ne, Pe) {
    {
      var we, ke = {}, Se = null, _t = null;
      te !== void 0 && (Rn(te), Se = "" + te), et(q) && (Rn(q.key), Se = "" + q.key), Fe(q) && (_t = q.ref, ct(q, Pe));
      for (we in q)
        Yt.call(q, we) && !_r.hasOwnProperty(we) && (ke[we] = q[we]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (we in ft)
          ke[we] === void 0 && (ke[we] = ft[we]);
      }
      if (Se || _t) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Se && gt(ke, dt), _t && yt(ke, dt);
      }
      return dn(N, Se, _t, Pe, Ne, kn.current, ke);
    }
  }
  var it = he.ReactCurrentOwner, Et = he.ReactDebugCurrentFrame;
  function va(N) {
    if (N) {
      var q = N._owner, te = $t(N.type, N._source, q ? q.type : null);
      Et.setExtraStackFrame(te);
    } else
      Et.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function na(N) {
    return typeof N == "object" && N !== null && N.$$typeof === p;
  }
  function ar() {
    {
      if (it.current) {
        var N = oe(it.current.type);
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
        var q = N.fileName.replace(/^.*[\\\/]/, ""), te = N.lineNumber;
        return `

Check your code at ` + q + ":" + te + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(N) {
    {
      var q = ar();
      if (!q) {
        var te = typeof N == "string" ? N : N.displayName || N.name;
        te && (q = `

Check the top-level render call using <` + te + ">.");
      }
      return q;
    }
  }
  function Xi(N, q) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var te = Ki(q);
      if (si[te])
        return;
      si[te] = !0;
      var Ne = "";
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + oe(N._owner.type) + "."), va(N), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', te, Ne), va(null);
    }
  }
  function ci(N, q) {
    {
      if (typeof N != "object")
        return;
      if (en(N))
        for (var te = 0; te < N.length; te++) {
          var Ne = N[te];
          na(Ne) && Xi(Ne, q);
        }
      else if (na(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Pe = ae(N);
        if (typeof Pe == "function" && Pe !== N.entries)
          for (var we = Pe.call(N), ke; !(ke = we.next()).done; )
            na(ke.value) && Xi(ke.value, q);
      }
    }
  }
  function ga(N) {
    {
      var q = N.type;
      if (q == null || typeof q == "string")
        return;
      var te;
      if (typeof q == "function")
        te = q.propTypes;
      else if (typeof q == "object" && (q.$$typeof === D || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      q.$$typeof === x))
        te = q.propTypes;
      else
        return;
      if (te) {
        var Ne = oe(q);
        Vn(te, N.props, "prop", Ne, N);
      } else if (q.PropTypes !== void 0 && !ha) {
        ha = !0;
        var Pe = oe(q);
        I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Pe || "Unknown");
      }
      typeof q.getDefaultProps == "function" && !q.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function aa(N) {
    {
      for (var q = Object.keys(N.props), te = 0; te < q.length; te++) {
        var Ne = q[te];
        if (Ne !== "children" && Ne !== "key") {
          va(N), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ne), va(null);
          break;
        }
      }
      N.ref !== null && (va(N), I("Invalid attribute `ref` supplied to `React.Fragment`."), va(null));
    }
  }
  var In = {};
  function Fa(N, q, te, Ne, Pe, we) {
    {
      var ke = J(N);
      if (!ke) {
        var Se = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _t = no(Pe);
        _t ? Se += _t : Se += ar();
        var ft;
        N === null ? ft = "null" : en(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (oe(N.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Se);
      }
      var dt = Nt(N, q, te, Pe, we);
      if (dt == null)
        return dt;
      if (ke) {
        var pn = q.children;
        if (pn !== void 0)
          if (Ne)
            if (en(pn)) {
              for (var za = 0; za < pn.length; za++)
                ci(pn[za], N);
              Object.freeze && Object.freeze(pn);
            } else
              I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(pn, N);
      }
      if (Yt.call(q, "key")) {
        var ya = oe(N), Ot = Object.keys(q).filter(function(ze) {
          return ze !== "key";
        }), di = Ot.length > 0 ? "{key: someKey, " + Ot.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!In[ya + di]) {
          var ba = Ot.length > 0 ? "{" + Ot.join(": ..., ") + ": ...}" : "{}";
          I(`A props object containing a "key" prop is being spread into JSX:
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
  var fi = Fa;
  wv.Fragment = y, wv.jsxDEV = fi;
})();
cE.exports = wv;
var d = cE.exports, dE = { exports: {} }, ea = {}, pE = { exports: {} }, mE = {};
(function(u) {
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
    var p = !1, v = 5;
    function y(ee, be) {
      var Fe = ee.length;
      ee.push(be), f(ee, be, Fe);
    }
    function g(ee) {
      return ee.length === 0 ? null : ee[0];
    }
    function C(ee) {
      if (ee.length === 0)
        return null;
      var be = ee[0], Fe = ee.pop();
      return Fe !== be && (ee[0] = Fe, k(ee, Fe, 0)), be;
    }
    function f(ee, be, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, gt = ee[ct];
        if (D(gt, be) > 0)
          ee[ct] = be, ee[et] = gt, et = ct;
        else
          return;
      }
    }
    function k(ee, be, Fe) {
      for (var et = Fe, ct = ee.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, dn = ee[yt], Nt = yt + 1, it = ee[Nt];
        if (D(dn, be) < 0)
          Nt < ct && D(it, dn) < 0 ? (ee[et] = it, ee[Nt] = be, et = Nt) : (ee[et] = dn, ee[yt] = be, et = yt);
        else if (Nt < ct && D(it, be) < 0)
          ee[et] = it, ee[Nt] = be, et = Nt;
        else
          return;
      }
    }
    function D(ee, be) {
      var Fe = ee.sortIndex - be.sortIndex;
      return Fe !== 0 ? Fe : ee.id - be.id;
    }
    var T = 1, _ = 2, x = 3, A = 4, V = 5;
    function Q(ee, be) {
    }
    var pe = typeof performance == "object" && typeof performance.now == "function";
    if (pe) {
      var ae = performance;
      u.unstable_now = function() {
        return ae.now();
      };
    } else {
      var he = Date, I = he.now();
      u.unstable_now = function() {
        return he.now() - I;
      };
    }
    var $ = 1073741823, G = -1, B = 250, ge = 5e3, ce = 1e4, X = $, ie = [], J = [], U = 1, ve = null, oe = x, Te = !1, je = !1, Le = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Ge = typeof clearTimeout == "function" ? clearTimeout : null, Ht = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Nn(ee) {
      for (var be = g(J); be !== null; ) {
        if (be.callback === null)
          C(J);
        else if (be.startTime <= ee)
          C(J), be.sortIndex = be.expirationTime, y(ie, be);
        else
          return;
        be = g(J);
      }
    }
    function $n(ee) {
      if (Le = !1, Nn(ee), !je)
        if (g(ie) !== null)
          je = !0, wt(Bt);
        else {
          var be = g(J);
          be !== null && Rn($n, be.startTime - ee);
        }
    }
    function Bt(ee, be) {
      je = !1, Le && (Le = !1, kn()), Te = !0;
      var Fe = oe;
      try {
        var et;
        if (!p) return pa(ee, be);
      } finally {
        ve = null, oe = Fe, Te = !1;
      }
    }
    function pa(ee, be) {
      var Fe = be;
      for (Nn(Fe), ve = g(ie); ve !== null && !(ve.expirationTime > Fe && (!ee || tr())); ) {
        var et = ve.callback;
        if (typeof et == "function") {
          ve.callback = null, oe = ve.priorityLevel;
          var ct = ve.expirationTime <= Fe, gt = et(ct);
          Fe = u.unstable_now(), typeof gt == "function" ? ve.callback = gt : ve === g(ie) && C(ie), Nn(Fe);
        } else
          C(ie);
        ve = g(ie);
      }
      if (ve !== null)
        return !0;
      var yt = g(J);
      return yt !== null && Rn($n, yt.startTime - Fe), !1;
    }
    function En(ee, be) {
      switch (ee) {
        case T:
        case _:
        case x:
        case A:
        case V:
          break;
        default:
          ee = x;
      }
      var Fe = oe;
      oe = ee;
      try {
        return be();
      } finally {
        oe = Fe;
      }
    }
    function er(ee) {
      var be;
      switch (oe) {
        case T:
        case _:
        case x:
          be = x;
          break;
        default:
          be = oe;
          break;
      }
      var Fe = oe;
      oe = be;
      try {
        return ee();
      } finally {
        oe = Fe;
      }
    }
    function ka(ee) {
      var be = oe;
      return function() {
        var Fe = oe;
        oe = be;
        try {
          return ee.apply(this, arguments);
        } finally {
          oe = Fe;
        }
      };
    }
    function Kt(ee, be, Fe) {
      var et = u.unstable_now(), ct;
      if (typeof Fe == "object" && Fe !== null) {
        var gt = Fe.delay;
        typeof gt == "number" && gt > 0 ? ct = et + gt : ct = et;
      } else
        ct = et;
      var yt;
      switch (ee) {
        case T:
          yt = G;
          break;
        case _:
          yt = B;
          break;
        case V:
          yt = X;
          break;
        case A:
          yt = ce;
          break;
        case x:
        default:
          yt = ge;
          break;
      }
      var dn = ct + yt, Nt = {
        id: U++,
        callback: be,
        priorityLevel: ee,
        startTime: ct,
        expirationTime: dn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, y(J, Nt), g(ie) === null && Nt === g(J) && (Le ? kn() : Le = !0, Rn($n, ct - et))) : (Nt.sortIndex = dn, y(ie, Nt), !je && !Te && (je = !0, wt(Bt))), Nt;
    }
    function Yn() {
    }
    function Xt() {
      !je && !Te && (je = !0, wt(Bt));
    }
    function Jt() {
      return g(ie);
    }
    function Zt(ee) {
      ee.callback = null;
    }
    function An() {
      return oe;
    }
    var Pt = !1, Sn = null, $t = -1, Yt = v, ta = -1;
    function tr() {
      var ee = u.unstable_now() - ta;
      return !(ee < Yt);
    }
    function ma() {
    }
    function Vn(ee) {
      if (ee < 0 || ee > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ee > 0 ? Yt = Math.floor(1e3 / ee) : Yt = v;
    }
    var fn = function() {
      if (Sn !== null) {
        var ee = u.unstable_now();
        ta = ee;
        var be = !0, Fe = !0;
        try {
          Fe = Sn(be, ee);
        } finally {
          Fe ? en() : (Pt = !1, Sn = null);
        }
      } else
        Pt = !1;
    }, en;
    if (typeof Ht == "function")
      en = function() {
        Ht(fn);
      };
    else if (typeof MessageChannel < "u") {
      var xn = new MessageChannel(), Ua = xn.port2;
      xn.port1.onmessage = fn, en = function() {
        Ua.postMessage(null);
      };
    } else
      en = function() {
        ye(fn, 0);
      };
    function wt(ee) {
      Sn = ee, Pt || (Pt = !0, en());
    }
    function Rn(ee, be) {
      $t = ye(function() {
        ee(u.unstable_now());
      }, be);
    }
    function kn() {
      Ge($t), $t = -1;
    }
    var _r = ma, nr = null;
    u.unstable_IdlePriority = V, u.unstable_ImmediatePriority = T, u.unstable_LowPriority = A, u.unstable_NormalPriority = x, u.unstable_Profiling = nr, u.unstable_UserBlockingPriority = _, u.unstable_cancelCallback = Zt, u.unstable_continueExecution = Xt, u.unstable_forceFrameRate = Vn, u.unstable_getCurrentPriorityLevel = An, u.unstable_getFirstCallbackNode = Jt, u.unstable_next = er, u.unstable_pauseExecution = Yn, u.unstable_requestPaint = _r, u.unstable_runWithPriority = En, u.unstable_scheduleCallback = Kt, u.unstable_shouldYield = tr, u.unstable_wrapCallback = ka, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(mE);
pE.exports = mE;
var Iw = pE.exports;
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
  var u = R, p = Iw, v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, y = !1;
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
      var a = v.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var D = 0, T = 1, _ = 2, x = 3, A = 4, V = 5, Q = 6, pe = 7, ae = 8, he = 9, I = 10, $ = 11, G = 12, B = 13, ge = 14, ce = 15, X = 16, ie = 17, J = 18, U = 19, ve = 21, oe = 22, Te = 23, je = 24, Le = 25, ye = !0, Ge = !1, Ht = !1, Nn = !1, $n = !1, Bt = !0, pa = !0, En = !0, er = !0, ka = /* @__PURE__ */ new Set(), Kt = {}, Yn = {};
  function Xt(e, t) {
    Jt(e, t), Jt(e + "Capture", t);
  }
  function Jt(e, t) {
    Kt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Kt[e] = t;
    {
      var n = e.toLowerCase();
      Yn[n] = e, e === "onDoubleClick" && (Yn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      ka.add(t[a]);
  }
  var Zt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", An = Object.prototype.hasOwnProperty;
  function Pt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Sn(e) {
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
    if (Sn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function ta(e) {
    if (Sn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  function tr(e, t) {
    if (Sn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function ma(e, t) {
    if (Sn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function Vn(e) {
    if (Sn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  function fn(e) {
    if (Sn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  var en = 0, xn = 1, Ua = 2, wt = 3, Rn = 4, kn = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + nr + "][" + ee + "]*$"), Fe = {}, et = {};
  function ct(e) {
    return An.call(et, e) ? !0 : An.call(Fe, e) ? !1 : be.test(e) ? (et[e] = !0, !0) : (Fe[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function gt(e, t, n) {
    return t !== null ? t.type === en : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function yt(e, t, n, a) {
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
      Yt(n, t), a.sanitizeURL && Ki("" + n);
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
      return Yt(n, t), r === "" + n ? n : r;
    }
  }
  function ga(e, t, n, a) {
    var r = Nt(t);
    if (!gt(t, r, a)) {
      if (dn(t, n, r, a) && (n = null), a || r === null) {
        if (ct(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Yt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var o = r.propertyName;
        if (n === null) {
          var s = r.type;
          e[o] = s === wt ? !1 : "";
        } else
          e[o] = n;
        return;
      }
      var m = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(m);
      else {
        var S = r.type, E;
        S === wt || S === Rn && n === !0 ? E = "" : (Yt(n, m), E = "" + n, r.sanitizeURL && Ki(E.toString())), h ? e.setAttributeNS(h, m, E) : e.setAttribute(m, E);
      }
    }
  }
  var aa = Symbol.for("react.element"), In = Symbol.for("react.portal"), Fa = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), q = Symbol.for("react.provider"), te = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Pe = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), _t = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), pn = Symbol.for("react.legacy_hidden"), za = Symbol.for("react.cache"), ya = Symbol.for("react.tracing_marker"), Ot = Symbol.iterator, di = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Ot && e[Ot] || e[di];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, pi = 0, ns, as, Or, ao, ro, io, lo;
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
          log: ze({}, e, {
            value: ns
          }),
          info: ze({}, e, {
            value: as
          }),
          warn: ze({}, e, {
            value: Or
          }),
          error: ze({}, e, {
            value: ao
          }),
          group: ze({}, e, {
            value: ro
          }),
          groupCollapsed: ze({}, e, {
            value: io
          }),
          groupEnd: ze({}, e, {
            value: lo
          })
        });
      }
      pi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ji = v.ReactCurrentDispatcher, uo;
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
`), s = a.stack.split(`
`), m = o.length - 1, h = s.length - 1; m >= 1 && h >= 0 && o[m] !== s[h]; )
          h--;
        for (; m >= 1 && h >= 0; m--, h--)
          if (o[m] !== s[h]) {
            if (m !== 1 || h !== 1)
              do
                if (m--, h--, h < 0 || o[m] !== s[h]) {
                  var S = `
` + o[m].replace(" at new ", " at ");
                  return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, S), S;
                }
              while (m >= 1 && h >= 0);
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
      case we:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ne:
          return so(e.render);
        case ke:
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
      case X:
        return Ha("Lazy");
      case B:
        return Ha("Suspense");
      case U:
        return Ha("SuspenseList");
      case D:
      case _:
      case ce:
        return so(e.type);
      case $:
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
      case Fa:
        return "Fragment";
      case In:
        return "Portal";
      case N:
        return "Profiler";
      case fi:
        return "StrictMode";
      case Pe:
        return "Suspense";
      case we:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case te:
          var t = e;
          return fo(t) + ".Consumer";
        case q:
          var n = e;
          return fo(n._context) + ".Provider";
        case Ne:
          return os(e, e.render, "ForwardRef");
        case ke:
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
  function Ve(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case je:
        return "Cache";
      case he:
        var a = n;
        return rr(a) + ".Consumer";
      case I:
        var r = n;
        return rr(r._context) + ".Provider";
      case J:
        return "DehydratedFragment";
      case $:
        return Nf(n, n.render, "ForwardRef");
      case pe:
        return "Fragment";
      case V:
        return n;
      case A:
        return "Portal";
      case x:
        return "Root";
      case Q:
        return "Text";
      case X:
        return Ke(n);
      case ae:
        return n === fi ? "StrictMode" : "Mode";
      case oe:
        return "Offscreen";
      case G:
        return "Profiler";
      case ve:
        return "Scope";
      case B:
        return "Suspense";
      case U:
        return "SuspenseList";
      case Le:
        return "TracingMarker";
      case T:
      case D:
      case ie:
      case _:
      case ge:
      case ce:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = v.ReactDebugCurrentFrame, Cn = null, gi = !1;
  function Mr() {
    {
      if (Cn === null)
        return null;
      var e = Cn._debugOwner;
      if (e !== null && typeof e < "u")
        return Ve(e);
    }
    return null;
  }
  function Ef() {
    return Cn === null ? "" : hi(Cn);
  }
  function It() {
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
    var n = e, a = t.checked, r = ze({}, t, {
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
  function F(e, t) {
    var n = e;
    b(n, t), K(n, t);
  }
  function K(e, t) {
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
          ho(l), b(l, o);
        }
      }
    }
  }
  function Re(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Dn(e._wrapperState.initialValue) : e.defaultValue !== Dn(n) && (e.defaultValue = Dn(n)));
  }
  var de = !1, Me = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? u.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Me || (Me = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !de && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), de = !0);
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
      for (var s = 0; s < r.length; s++) {
        var m = l.hasOwnProperty("$" + r[s].value);
        r[s].selected !== m && (r[s].selected = m), m && a && (r[s].defaultSelected = !0);
      }
    } else {
      for (var h = Dn(Na(n)), S = null, E = 0; E < r.length; E++) {
        if (r[E].value === h) {
          r[E].selected = !0, a && (r[E].defaultSelected = !0);
          return;
        }
        S === null && !r[E].disabled && (S = r[E]);
      }
      S !== null && (S.selected = !0);
    }
  }
  function bo(e, t) {
    return ze({}, t, {
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
    var a = ze({}, t, {
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
  function TE(e, t) {
    Yv(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", jE = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return jE;
      default:
        return or;
    }
  }
  function wf(e, t) {
    return e == null || e === or ? jf(t) : e === Tf && t === "foreignObject" ? or : e;
  }
  var wE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, ms, qv = wE(function(e, t) {
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
  }, _E = {
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
  function OE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var LE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    LE.forEach(function(t) {
      Eo[OE(t, e)] = Eo[e];
    });
  });
  function Of(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (ma(t, e), ("" + t).trim());
  }
  var ME = /([A-Z])/g, AE = /^ms-/;
  function VE(e) {
    return e.replace(ME, "-$1").toLowerCase().replace(AE, "-ms-");
  }
  var Gv = function() {
  };
  {
    var kE = /^(?:webkit|moz|o)[A-Z]/, UE = /^-ms-/, FE = /-(.)/g, Wv = /;\s*$/, il = {}, Lf = {}, Qv = !1, Kv = !1, zE = function(e) {
      return e.replace(FE, function(t, n) {
        return n.toUpperCase();
      });
    }, HE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        zE(e.replace(UE, "ms-"))
      ));
    }, BE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, PE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Wv, "")));
    }, $E = function(e, t) {
      Qv || (Qv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, YE = function(e, t) {
      Kv || (Kv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Gv = function(e, t) {
      e.indexOf("-") > -1 ? HE(e) : kE.test(e) ? BE(e) : Wv.test(t) && PE(e, t), typeof t == "number" && (isNaN(t) ? $E(e, t) : isFinite(t) || YE(e, t));
    };
  }
  var IE = Gv;
  function qE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : VE(a)) + ":", t += Of(a, r, i), n = ";";
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
        r || IE(a, t[a]);
        var i = Of(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function GE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Jv(e) {
    var t = {};
    for (var n in e)
      for (var a = _E[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function WE(e, t) {
    {
      if (!t)
        return;
      var n = Jv(e), a = Jv(t), r = {};
      for (var i in n) {
        var l = n[i], o = a[i];
        if (o && l !== o) {
          var s = l + "," + o;
          if (r[s])
            continue;
          r[s] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", GE(e[l]) ? "Removing" : "Updating", l, o);
        }
      }
    }
  }
  var QE = {
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
  }, KE = ze({
    menuitem: !0
  }, QE), XE = "__html";
  function Mf(e, t) {
    if (t) {
      if (KE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(XE in t.dangerouslySetInnerHTML))
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
  }, ll = {}, JE = new RegExp("^(aria)-[" + ee + "]*$"), ZE = new RegExp("^(aria)[A-Z][" + ee + "]*$");
  function eS(e, t) {
    {
      if (An.call(ll, t) && ll[t])
        return !0;
      if (ZE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = Zv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ll[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ll[t] = !0, !0;
      }
      if (JE.test(t)) {
        var r = t.toLowerCase(), i = Zv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ll[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ll[t] = !0, !0;
      }
    }
    return !0;
  }
  function tS(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = eS(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function nS(e, t) {
    Ni(e, t) || tS(e, t);
  }
  var eh = !1;
  function aS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !eh && (eh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var th = function() {
  };
  {
    var Tn = {}, nh = /^on./, rS = /^on[^A-Z]/, iS = new RegExp("^(aria)-[" + ee + "]*$"), lS = new RegExp("^(aria)[A-Z][" + ee + "]*$");
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
        return rS.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Tn[t] = !0, !0;
      if (iS.test(t) || lS.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Tn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Tn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Tn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Tn[t] = !0, !0;
      var s = Nt(t), m = s !== null && s.type === en;
      if (hs.hasOwnProperty(r)) {
        var h = hs[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), Tn[t] = !0, !0;
      } else if (!m && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Tn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, s, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Tn[t] = !0, !0) : m ? !0 : yt(t, n, s, !1) ? (Tn[t] = !0, !1) : ((n === "false" || n === "true") && s !== null && s.type === wt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Tn[t] = !0), !0);
    };
  }
  var oS = function(e, t, n) {
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
  function uS(e, t, n) {
    Ni(e, t) || oS(e, t, n);
  }
  var ah = 1, Af = 2, So = 4, sS = ah | Af | So, xo = null;
  function cS(e) {
    xo !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), xo = e;
  }
  function fS() {
    xo === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), xo = null;
  }
  function dS(e) {
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
  function pS(e) {
    kf = e;
  }
  function ih(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function mS() {
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
  function vS() {
    var e = mS();
    e && (uh(), lh());
  }
  function sh(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return oh(e, t, n);
    } finally {
      Uf = !1, vS();
    }
  }
  function hS(e, t, n) {
    oh = e, uh = n;
  }
  function gS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function yS(e, t, n) {
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
        return !!(n.disabled && gS(t));
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
    if (yS(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Ff = !1;
  if (Zt)
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
  function ch(e, t, n, a, r, i, l, o, s) {
    var m = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, m);
    } catch (h) {
      this.onError(h);
    }
  }
  var fh = ch;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var zf = document.createElement("react");
    fh = function(t, n, a, r, i, l, o, s, m) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), S = !1, E = !0, O = window.event, M = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        zf.removeEventListener(H, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var ne = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        S = !0, z(), n.apply(a, ne), E = !1;
      }
      var me, qe = !1, Be = !1;
      function j(w) {
        if (me = w.error, qe = !0, me === null && w.colno === 0 && w.lineno === 0 && (Be = !0), w.defaultPrevented && me != null && typeof me == "object")
          try {
            me._suppressLogging = !0;
          } catch {
          }
      }
      var H = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), zf.addEventListener(H, Ee, !1), h.initEvent(H, !1, !1), zf.dispatchEvent(h), M && Object.defineProperty(window, "event", M), S && E && (qe ? Be && (me = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : me = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(me)), window.removeEventListener("error", j), !S)
        return z(), ch.apply(this, arguments);
    };
  }
  var bS = fh, sl = !1, gs = null, ys = !1, Hf = null, NS = {
    onError: function(e) {
      sl = !0, gs = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, o, s) {
    sl = !1, gs = null, bS.apply(NS, arguments);
  }
  function ES(e, t, n, a, r, i, l, o, s) {
    if (Bf.apply(this, arguments), sl) {
      var m = Pf();
      ys || (ys = !0, Hf = m);
    }
  }
  function SS() {
    if (ys) {
      var e = Hf;
      throw ys = !1, Hf = null, e;
    }
  }
  function xS() {
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
  function RS(e) {
    return e._reactInternals !== void 0;
  }
  function CS(e, t) {
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
  ), DS = (
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
  ), Qf = Tt | Xe | Ei | Do | Si | fr | xi, To = Xe | dh | Si | xi, pl = Vr | Ei, dr = Ri | qf | If, TS = v.ReactCurrentOwner;
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
  function jS(e) {
    return Ci(e) === e;
  }
  function wS(e) {
    {
      var t = TS.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ve(n) || "A component"), a._warnedAboutRefsInRender = !0;
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
        for (var s = i.child; s; ) {
          if (s === a)
            return hh(i), e;
          if (s === r)
            return hh(i), t;
          s = s.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var m = !1, h = i.child; h; ) {
          if (h === a) {
            m = !0, a = i, r = l;
            break;
          }
          if (h === r) {
            m = !0, r = i, a = l;
            break;
          }
          h = h.sibling;
        }
        if (!m) {
          for (h = l.child; h; ) {
            if (h === a) {
              m = !0, a = l, r = i;
              break;
            }
            if (h === r) {
              m = !0, r = l, a = i;
              break;
            }
            h = h.sibling;
          }
          if (!m)
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
    if (e.tag === V || e.tag === Q)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = bh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function _S(e) {
    var t = gh(e);
    return t !== null ? Nh(t) : null;
  }
  function Nh(e) {
    if (e.tag === V || e.tag === Q)
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
  var Eh = p.unstable_scheduleCallback, OS = p.unstable_cancelCallback, LS = p.unstable_shouldYield, MS = p.unstable_requestPaint, qt = p.unstable_now, AS = p.unstable_getCurrentPriorityLevel, Ns = p.unstable_ImmediatePriority, Kf = p.unstable_UserBlockingPriority, Di = p.unstable_NormalPriority, VS = p.unstable_LowPriority, Xf = p.unstable_IdlePriority, kS = p.unstable_yieldValue, US = p.unstable_setDisableYieldValue, ml = null, mn = null, le = null, Ba = !1, Ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function FS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = ze({}, e, {
        getLaneLabelMap: YS,
        injectProfilingHooks: $S
      })), ml = t.inject(e), mn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function zS(e, t) {
    if (mn && typeof mn.onScheduleFiberRoot == "function")
      try {
        mn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function HS(e, t) {
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
  function BS(e) {
    if (mn && typeof mn.onPostCommitFiberRoot == "function")
      try {
        mn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function PS(e) {
    if (mn && typeof mn.onCommitFiberUnmount == "function")
      try {
        mn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof kS == "function" && (US(e), g(e)), mn && typeof mn.setStrictMode == "function")
      try {
        mn.setStrictMode(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function $S(e) {
    le = e;
  }
  function YS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Zf; n++) {
        var a = cx(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function IS(e) {
    le !== null && typeof le.markCommitStarted == "function" && le.markCommitStarted(e);
  }
  function Sh() {
    le !== null && typeof le.markCommitStopped == "function" && le.markCommitStopped();
  }
  function jo(e) {
    le !== null && typeof le.markComponentRenderStarted == "function" && le.markComponentRenderStarted(e);
  }
  function vl() {
    le !== null && typeof le.markComponentRenderStopped == "function" && le.markComponentRenderStopped();
  }
  function qS(e) {
    le !== null && typeof le.markComponentPassiveEffectMountStarted == "function" && le.markComponentPassiveEffectMountStarted(e);
  }
  function GS() {
    le !== null && typeof le.markComponentPassiveEffectMountStopped == "function" && le.markComponentPassiveEffectMountStopped();
  }
  function WS(e) {
    le !== null && typeof le.markComponentPassiveEffectUnmountStarted == "function" && le.markComponentPassiveEffectUnmountStarted(e);
  }
  function QS() {
    le !== null && typeof le.markComponentPassiveEffectUnmountStopped == "function" && le.markComponentPassiveEffectUnmountStopped();
  }
  function KS(e) {
    le !== null && typeof le.markComponentLayoutEffectMountStarted == "function" && le.markComponentLayoutEffectMountStarted(e);
  }
  function XS() {
    le !== null && typeof le.markComponentLayoutEffectMountStopped == "function" && le.markComponentLayoutEffectMountStopped();
  }
  function xh(e) {
    le !== null && typeof le.markComponentLayoutEffectUnmountStarted == "function" && le.markComponentLayoutEffectUnmountStarted(e);
  }
  function Rh() {
    le !== null && typeof le.markComponentLayoutEffectUnmountStopped == "function" && le.markComponentLayoutEffectUnmountStopped();
  }
  function JS(e, t, n) {
    le !== null && typeof le.markComponentErrored == "function" && le.markComponentErrored(e, t, n);
  }
  function ZS(e, t, n) {
    le !== null && typeof le.markComponentSuspended == "function" && le.markComponentSuspended(e, t, n);
  }
  function ex(e) {
    le !== null && typeof le.markLayoutEffectsStarted == "function" && le.markLayoutEffectsStarted(e);
  }
  function tx() {
    le !== null && typeof le.markLayoutEffectsStopped == "function" && le.markLayoutEffectsStopped();
  }
  function nx(e) {
    le !== null && typeof le.markPassiveEffectsStarted == "function" && le.markPassiveEffectsStarted(e);
  }
  function ax() {
    le !== null && typeof le.markPassiveEffectsStopped == "function" && le.markPassiveEffectsStopped();
  }
  function Ch(e) {
    le !== null && typeof le.markRenderStarted == "function" && le.markRenderStarted(e);
  }
  function rx() {
    le !== null && typeof le.markRenderYielded == "function" && le.markRenderYielded();
  }
  function Dh() {
    le !== null && typeof le.markRenderStopped == "function" && le.markRenderStopped();
  }
  function ix(e) {
    le !== null && typeof le.markRenderScheduled == "function" && le.markRenderScheduled(e);
  }
  function lx(e, t) {
    le !== null && typeof le.markForceUpdateScheduled == "function" && le.markForceUpdateScheduled(e, t);
  }
  function Jf(e, t) {
    le !== null && typeof le.markStateUpdateScheduled == "function" && le.markStateUpdateScheduled(e, t);
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
  ), Th = Math.clz32 ? Math.clz32 : sx, ox = Math.log, ux = Math.LN2;
  function sx(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (ox(t) / ux | 0) | 0;
  }
  var Zf = 31, Y = (
    /*                        */
    0
  ), Wt = (
    /*                          */
    0
  ), _e = (
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
  function cx(e) {
    {
      if (e & _e)
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
      case _e:
        return _e;
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
    if (n === Y)
      return Y;
    var a = Y, r = e.suspendedLanes, i = e.pingedLanes, l = n & wh;
    if (l !== Y) {
      var o = l & ~r;
      if (o !== Y)
        a = Mo(o);
      else {
        var s = l & i;
        s !== Y && (a = Mo(s));
      }
    } else {
      var m = n & ~r;
      m !== Y ? a = Mo(m) : i !== Y && (a = Mo(i));
    }
    if (a === Y)
      return Y;
    if (t !== Y && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === Y) {
      var h = wi(a), S = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= S || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === $a && (S & gl) !== Y
      )
        return t;
    }
    (a & pr) !== Y && (a |= n & $a);
    var E = e.entangledLanes;
    if (E !== Y)
      for (var O = e.entanglements, M = a & E; M > 0; ) {
        var z = _i(M), ne = 1 << z;
        a |= O[z], M &= ~ne;
      }
    return a;
  }
  function fx(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function dx(e, t) {
    switch (e) {
      case _e:
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
  function px(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), s = 1 << o, m = i[o];
      m === st ? ((s & a) === Y || (s & r) !== Y) && (i[o] = dx(s, t)) : m <= t && (e.expiredLanes |= s), l &= ~s;
    }
  }
  function mx(e) {
    return Mo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~qn;
    return t !== Y ? t : t & qn ? qn : Y;
  }
  function vx(e) {
    return (e & _e) !== Y;
  }
  function Nd(e) {
    return (e & wh) !== Y;
  }
  function _h(e) {
    return (e & Es) === e;
  }
  function hx(e) {
    var t = _e | pr | $a;
    return (e & t) === Y;
  }
  function gx(e) {
    return (e & gl) === e;
  }
  function Cs(e, t) {
    var n = hl | pr | Ti | $a;
    return (t & n) !== Y;
  }
  function yx(e, t) {
    return (t & e.expiredLanes) !== Y;
  }
  function Oh(e) {
    return (e & gl) !== Y;
  }
  function Lh() {
    var e = Ss;
    return Ss <<= 1, (Ss & gl) === Y && (Ss = _o), e;
  }
  function bx() {
    var e = xs;
    return xs <<= 1, (xs & Es) === Y && (xs = yl), e;
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
    return (e & t) !== Y;
  }
  function bl(e, t) {
    return (e & t) === t;
  }
  function Ue(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Mh(e, t) {
    return e & t;
  }
  function D_(e) {
    return e;
  }
  function Nx(e, t) {
    return e !== Wt && e < t ? e : t;
  }
  function Sd(e) {
    for (var t = [], n = 0; n < Zf; n++)
      t.push(e);
    return t;
  }
  function Vo(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = Y, e.pingedLanes = Y);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function Ex(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function Ah(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function Sx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = Y, e.pingedLanes = Y, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), s = 1 << o;
      a[o] = Y, r[o] = st, i[o] = st, l &= ~s;
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
  function xx(e, t) {
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
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
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
          var s = o.alternate;
          (s === null || !a.has(s)) && a.add(o);
        }), l.clear()), t &= ~i;
      }
  }
  function Uh(e, t) {
    return null;
  }
  var Wn = _e, mr = pr, vr = $a, Ts = ji, ko = Wt;
  function Sa() {
    return ko;
  }
  function Qt(e) {
    ko = e;
  }
  function Rx(e, t) {
    var n = ko;
    try {
      return ko = e, t();
    } finally {
      ko = n;
    }
  }
  function Cx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function Dx(e, t) {
    return e > t ? e : t;
  }
  function Rd(e, t) {
    return e !== 0 && e < t;
  }
  function Fh(e) {
    var t = wi(e);
    return Rd(Wn, t) ? Rd(mr, t) ? Nd(t) ? vr : Ts : mr : Wn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var zh;
  function Tx(e) {
    zh = e;
  }
  function jx(e) {
    zh(e);
  }
  var Cd;
  function wx(e) {
    Cd = e;
  }
  var Hh;
  function _x(e) {
    Hh = e;
  }
  var Bh;
  function Ox(e) {
    Bh = e;
  }
  var Ph;
  function Lx(e) {
    Ph = e;
  }
  var Dd = !1, ws = [], Ur = null, Fr = null, zr = null, Uo = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Map(), Hr = [], Mx = [
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
  function Ax(e) {
    return Mx.indexOf(e) > -1;
  }
  function Vx(e, t, n, a, r) {
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
      var l = Vx(t, n, a, r, i);
      if (t !== null) {
        var o = $r(t);
        o !== null && Cd(o);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var s = e.targetContainers;
    return r !== null && s.indexOf(r) === -1 && s.push(r), e;
  }
  function kx(e, t, n, a, r) {
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
        var s = r, m = s.pointerId;
        return Uo.set(m, zo(Uo.get(m) || null, e, t, n, a, s)), !0;
      }
      case "gotpointercapture": {
        var h = r, S = h.pointerId;
        return Fo.set(S, zo(Fo.get(S) || null, e, t, n, a, h)), !0;
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
  function Ux(e) {
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
        cS(i), r.target.dispatchEvent(i), fS();
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
  function Fx() {
    Dd = !1, Ur !== null && _s(Ur) && (Ur = null), Fr !== null && _s(Fr) && (Fr = null), zr !== null && _s(zr) && (zr = null), Uo.forEach(Ih), Fo.forEach(Ih);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, Fx)));
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
  var Nl = v.ReactCurrentBatchConfig, Td = !0;
  function qh(e) {
    Td = !!e;
  }
  function zx() {
    return Td;
  }
  function Hx(e, t, n) {
    var a = Gh(t), r;
    switch (a) {
      case Wn:
        r = Bx;
        break;
      case mr:
        r = Px;
        break;
      case vr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function Bx(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Qt(Wn), jd(e, t, n, a);
    } finally {
      Qt(r), Nl.transition = i;
    }
  }
  function Px(e, t, n, a) {
    var r = Sa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Qt(mr), jd(e, t, n, a);
    } finally {
      Qt(r), Nl.transition = i;
    }
  }
  function jd(e, t, n, a) {
    Td && $x(e, t, n, a);
  }
  function $x(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      $d(e, t, a, Os, n), $h(e, a);
      return;
    }
    if (kx(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if ($h(e, a), t & So && Ax(e)) {
      for (; r !== null; ) {
        var i = $r(r);
        i !== null && jx(i);
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
          var s = mh(l);
          if (s !== null)
            return s;
          i = null;
        } else if (o === x) {
          var m = l.stateNode;
          if (js(m))
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
        var t = AS();
        switch (t) {
          case Ns:
            return Wn;
          case Kf:
            return mr;
          case Di:
          case VS:
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
  function Yx(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function Ix(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function qx(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function Gx(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Po = null, _d = null, $o = null;
  function Wx(e) {
    return Po = e, _d = Qh(), !0;
  }
  function Qx() {
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
          var s = e[o];
          s ? this[o] = s(i) : this[o] = i[o];
        }
      var m = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return m ? this.isDefaultPrevented = Ms : this.isDefaultPrevented = Kh, this.isPropagationStopped = Kh, this;
    }
    return ze(t.prototype, {
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
  }, Od = Qn(El), Yo = ze({}, El, {
    view: 0,
    detail: 0
  }), Kx = Qn(Yo), Ld, Md, Io;
  function Xx(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Ld = e.screenX - Io.screenX, Md = e.screenY - Io.screenY) : (Ld = 0, Md = 0), Io = e);
  }
  var As = ze({}, Yo, {
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
      return "movementX" in e ? e.movementX : (Xx(e), Ld);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Md;
    }
  }), Xh = Qn(As), Jx = ze({}, As, {
    dataTransfer: 0
  }), Zx = Qn(Jx), eR = ze({}, Yo, {
    relatedTarget: 0
  }), Ad = Qn(eR), tR = ze({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), nR = Qn(tR), aR = ze({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rR = Qn(aR), iR = ze({}, El, {
    data: 0
  }), Jh = Qn(iR), lR = Jh, oR = {
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
  }, uR = {
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
  function sR(e) {
    if (e.key) {
      var t = oR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ls(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? uR[e.keyCode] || "Unidentified" : "";
  }
  var cR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = cR[e];
    return a ? !!n[a] : !1;
  }
  function Vd(e) {
    return fR;
  }
  var dR = ze({}, Yo, {
    key: sR,
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
  }), pR = Qn(dR), mR = ze({}, As, {
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
  }), Zh = Qn(mR), vR = ze({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vd
  }), hR = Qn(vR), gR = ze({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yR = Qn(gR), bR = ze({}, As, {
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
  }), NR = Qn(bR), ER = [9, 13, 27, 32], eg = 229, kd = Zt && "CompositionEvent" in window, qo = null;
  Zt && "documentMode" in document && (qo = document.documentMode);
  var SR = Zt && "TextEvent" in window && !qo, tg = Zt && (!kd || qo && qo > 8 && qo <= 11), ng = 32, ag = String.fromCharCode(ng);
  function xR() {
    Xt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Xt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var rg = !1;
  function RR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function CR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function DR(e, t) {
    return e === "keydown" && t.keyCode === eg;
  }
  function ig(e, t) {
    switch (e) {
      case "keyup":
        return ER.indexOf(t.keyCode) !== -1;
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
  function TR(e, t, n, a, r) {
    var i, l;
    if (kd ? i = CR(t) : Sl ? ig(t, a) && (i = "onCompositionEnd") : DR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    tg && !og(a) && (!Sl && i === "onCompositionStart" ? Sl = Wx(r) : i === "onCompositionEnd" && Sl && (l = Wh()));
    var o = zs(n, i);
    if (o.length > 0) {
      var s = new Jh(i, t, null, a, r);
      if (e.push({
        event: s,
        listeners: o
      }), l)
        s.data = l;
      else {
        var m = lg(a);
        m !== null && (s.data = m);
      }
    }
  }
  function jR(e, t) {
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
  function wR(e, t) {
    if (Sl) {
      if (e === "compositionend" || !kd && ig(e, t)) {
        var n = Wh();
        return Qx(), Sl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!RR(t)) {
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
  function _R(e, t, n, a, r) {
    var i;
    if (SR ? i = jR(t, a) : i = wR(t, a), !i)
      return null;
    var l = zs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new lR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function OR(e, t, n, a, r, i, l) {
    TR(e, t, n, a, r), _R(e, t, n, a, r);
  }
  var LR = {
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
    return t === "input" ? !!LR[e.type] : t === "textarea";
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
  function MR(e) {
    if (!Zt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function AR() {
    Xt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function sg(e, t, n, a) {
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
  function VR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function kR(e) {
    var t = [];
    sg(t, Wo, e, Vf(e)), sh(UR, t);
  }
  function UR(e) {
    Tg(e, 0);
  }
  function Vs(e) {
    var t = jl(e);
    if (ho(t))
      return e;
  }
  function FR(e, t) {
    if (e === "change")
      return t;
  }
  var cg = !1;
  Zt && (cg = MR("input") && (!document.documentMode || document.documentMode > 9));
  function zR(e, t) {
    Go = e, Wo = t, Go.attachEvent("onpropertychange", dg);
  }
  function fg() {
    Go && (Go.detachEvent("onpropertychange", dg), Go = null, Wo = null);
  }
  function dg(e) {
    e.propertyName === "value" && Vs(Wo) && kR(e);
  }
  function HR(e, t, n) {
    e === "focusin" ? (fg(), zR(t, n)) : e === "focusout" && fg();
  }
  function BR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vs(Wo);
  }
  function PR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function $R(e, t) {
    if (e === "click")
      return Vs(t);
  }
  function YR(e, t) {
    if (e === "input" || e === "change")
      return Vs(t);
  }
  function IR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function qR(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window, s, m;
    if (VR(o) ? s = FR : ug(o) ? cg ? s = YR : (s = BR, m = HR) : PR(o) && (s = $R), s) {
      var h = s(t, n);
      if (h) {
        sg(e, h, a, r);
        return;
      }
    }
    m && m(t, o, n), t === "focusout" && IR(o);
  }
  function GR() {
    Jt("onMouseEnter", ["mouseout", "mouseover"]), Jt("onMouseLeave", ["mouseout", "mouseover"]), Jt("onPointerEnter", ["pointerout", "pointerover"]), Jt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function WR(e, t, n, a, r, i, l) {
    var o = t === "mouseover" || t === "pointerover", s = t === "mouseout" || t === "pointerout";
    if (o && !dS(a)) {
      var m = a.relatedTarget || a.fromElement;
      if (m && (Mi(m) || su(m)))
        return;
    }
    if (!(!s && !o)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var S = r.ownerDocument;
        S ? h = S.defaultView || S.parentWindow : h = window;
      }
      var E, O;
      if (s) {
        var M = a.relatedTarget || a.toElement;
        if (E = n, O = M ? Mi(M) : null, O !== null) {
          var z = Ci(O);
          (O !== z || O.tag !== V && O.tag !== Q) && (O = null);
        }
      } else
        E = null, O = n;
      if (E !== O) {
        var ne = Xh, Ee = "onMouseLeave", me = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (ne = Zh, Ee = "onPointerLeave", me = "onPointerEnter", qe = "pointer");
        var Be = E == null ? h : jl(E), j = O == null ? h : jl(O), H = new ne(Ee, qe + "leave", E, a, r);
        H.target = Be, H.relatedTarget = j;
        var w = null, W = Mi(r);
        if (W === n) {
          var se = new ne(me, qe + "enter", O, a, r);
          se.target = j, se.relatedTarget = Be, w = se;
        }
        yC(e, H, w, E, O);
      }
    }
  }
  function QR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Kn = typeof Object.is == "function" ? Object.is : QR;
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
  function KR(e) {
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
      n = pg(KR(n));
    }
  }
  function XR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, o = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return JR(e, r, i, l, o);
  }
  function JR(e, t, n, a, r) {
    var i = 0, l = -1, o = -1, s = 0, m = 0, h = e, S = null;
    e: for (; ; ) {
      for (var E = null; h === t && (n === 0 || h.nodeType === ur) && (l = i + n), h === a && (r === 0 || h.nodeType === ur) && (o = i + r), h.nodeType === ur && (i += h.nodeValue.length), (E = h.firstChild) !== null; )
        S = h, h = E;
      for (; ; ) {
        if (h === e)
          break e;
        if (S === t && ++s === n && (l = i), S === a && ++m === r && (o = i), (E = h.nextSibling) !== null)
          break;
        h = S, S = h.parentNode;
      }
      h = E;
    }
    return l === -1 || o === -1 ? null : {
      start: l,
      end: o
    };
  }
  function ZR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), o = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > o) {
        var s = o;
        o = l, l = s;
      }
      var m = mg(e, l), h = mg(e, o);
      if (m && h) {
        if (r.rangeCount === 1 && r.anchorNode === m.node && r.anchorOffset === m.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var S = n.createRange();
        S.setStart(m.node, m.offset), r.removeAllRanges(), l > o ? (r.addRange(S), r.extend(h.node, h.offset)) : (S.setEnd(h.node, h.offset), r.addRange(S));
      }
    }
  }
  function vg(e) {
    return e && e.nodeType === ur;
  }
  function hg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : vg(e) ? !1 : vg(t) ? hg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function eC(e) {
    return e && e.ownerDocument && hg(e.ownerDocument.documentElement, e);
  }
  function tC(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function gg() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (tC(t))
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
  function nC() {
    var e = gg();
    return {
      focusedElem: e,
      selectionRange: Ud(e) ? rC(e) : null
    };
  }
  function aC(e) {
    var t = gg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && eC(n)) {
      a !== null && Ud(n) && iC(n, a);
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
  function rC(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = XR(e), t || {
      start: 0,
      end: 0
    };
  }
  function iC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : ZR(e, t);
  }
  var lC = Zt && "documentMode" in document && document.documentMode <= 11;
  function oC() {
    Xt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var xl = null, Fd = null, Ko = null, zd = !1;
  function uC(e) {
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
  function sC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function yg(e, t, n) {
    var a = sC(n);
    if (!(zd || xl == null || xl !== ir(a))) {
      var r = uC(xl);
      if (!Ko || !Qo(Ko, r)) {
        Ko = r;
        var i = zs(Fd, "onSelect");
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
  function cC(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (ug(o) || o.contentEditable === "true") && (xl = o, Fd = n, Ko = null);
        break;
      case "focusout":
        xl = null, Fd = null, Ko = null;
        break;
      case "mousedown":
        zd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        zd = !1, yg(e, a, r);
        break;
      case "selectionchange":
        if (lC)
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
  Zt && (bg = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
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
    Rg.set(e, t), Xt(t, [e]);
  }
  function fC() {
    for (var e = 0; e < Cg.length; e++) {
      var t = Cg[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Br(n, "on" + a);
    }
    Br(Ng, "onAnimationEnd"), Br(Eg, "onAnimationIteration"), Br(Sg, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(xg, "onTransitionEnd");
  }
  function dC(e, t, n, a, r, i, l) {
    var o = Rg.get(t);
    if (o !== void 0) {
      var s = Od, m = t;
      switch (t) {
        case "keypress":
          if (Ls(a) === 0)
            return;
        case "keydown":
        case "keyup":
          s = pR;
          break;
        case "focusin":
          m = "focus", s = Ad;
          break;
        case "focusout":
          m = "blur", s = Ad;
          break;
        case "beforeblur":
        case "afterblur":
          s = Ad;
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
          s = Xh;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          s = Zx;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          s = hR;
          break;
        case Ng:
        case Eg:
        case Sg:
          s = nR;
          break;
        case xg:
          s = yR;
          break;
        case "scroll":
          s = Kx;
          break;
        case "wheel":
          s = NR;
          break;
        case "copy":
        case "cut":
        case "paste":
          s = rR;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          s = Zh;
          break;
      }
      var h = (i & So) !== 0;
      {
        var S = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", E = hC(n, o, a.type, h, S);
        if (E.length > 0) {
          var O = new s(o, m, null, a, r);
          e.push({
            event: O,
            listeners: E
          });
        }
      }
    }
  }
  fC(), GR(), AR(), oC(), xR();
  function pC(e, t, n, a, r, i, l) {
    dC(e, t, n, a, r, i);
    var o = (i & sS) === 0;
    o && (WR(e, t, n, a, r), qR(e, t, n, a, r), cC(e, t, n, a, r), OR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function Dg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, ES(a, t, void 0, e), e.currentTarget = null;
  }
  function mC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, o = i.currentTarget, s = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Dg(e, s, o), a = l;
      }
    else
      for (var m = 0; m < t.length; m++) {
        var h = t[m], S = h.instance, E = h.currentTarget, O = h.listener;
        if (S !== a && e.isPropagationStopped())
          return;
        Dg(e, O, E), a = S;
      }
  }
  function Tg(e, t) {
    for (var n = (t & So) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      mC(i, l, n);
    }
    SS();
  }
  function vC(e, t, n, a, r) {
    var i = Vf(n), l = [];
    pC(l, e, a, n, i, t), Tg(l, t);
  }
  function pt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = I0(t), r = bC(e);
    a.has(r) || (jg(t, e, Af, n), a.add(r));
  }
  function Pd(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= So), jg(n, e, a, t);
  }
  var Fs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[Fs]) {
      e[Fs] = !0, ka.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || Pd(n, !1, e), Pd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[Fs] || (t[Fs] = !0, Pd("selectionchange", !1, t)));
    }
  }
  function jg(e, t, n, a, r) {
    var i = Hx(e, t, n), l = void 0;
    Ff && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? qx(e, t, i, l) : Ix(e, t, i) : l !== void 0 ? Gx(e, t, i, l) : Yx(e, t, i);
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
          var s = o.tag;
          if (s === x || s === A) {
            var m = o.stateNode.containerInfo;
            if (wg(m, l))
              break;
            if (s === A)
              for (var h = o.return; h !== null; ) {
                var S = h.tag;
                if (S === x || S === A) {
                  var E = h.stateNode.containerInfo;
                  if (wg(E, l))
                    return;
                }
                h = h.return;
              }
            for (; m !== null; ) {
              var O = Mi(m);
              if (O === null)
                return;
              var M = O.tag;
              if (M === V || M === Q) {
                o = i = O;
                continue e;
              }
              m = m.parentNode;
            }
          }
          o = o.return;
        }
      }
    }
    sh(function() {
      return vC(e, t, n, i);
    });
  }
  function Zo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function hC(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, o = a ? l : t, s = [], m = e, h = null; m !== null; ) {
      var S = m, E = S.stateNode, O = S.tag;
      if (O === V && E !== null && (h = E, o !== null)) {
        var M = Ro(m, o);
        M != null && s.push(Zo(m, M, h));
      }
      if (r)
        break;
      m = m.return;
    }
    return s;
  }
  function zs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, o = i.tag;
      if (o === V && l !== null) {
        var s = l, m = Ro(r, n);
        m != null && a.unshift(Zo(r, m, s));
        var h = Ro(r, t);
        h != null && a.push(Zo(r, h, s));
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
  function gC(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Cl(i))
      r++;
    for (var l = 0, o = a; o; o = Cl(o))
      l++;
    for (; r - l > 0; )
      n = Cl(n), r--;
    for (; l - r > 0; )
      a = Cl(a), l--;
    for (var s = r; s--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Cl(n), a = Cl(a);
    }
    return null;
  }
  function _g(e, t, n, a, r) {
    for (var i = t._reactName, l = [], o = n; o !== null && o !== a; ) {
      var s = o, m = s.alternate, h = s.stateNode, S = s.tag;
      if (m !== null && m === a)
        break;
      if (S === V && h !== null) {
        var E = h;
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
  function yC(e, t, n, a, r) {
    var i = a && r ? gC(a, r) : null;
    a !== null && _g(e, t, a, i, !1), r !== null && n !== null && _g(e, n, r, i, !0);
  }
  function bC(e, t) {
    return e + "__bubble";
  }
  var Fn = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Pr = "suppressHydrationWarning", Og = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Lg, $s, Mg, Ag;
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
    nS(e, t), aS(e, t), uS(e, t, {
      registrationNameDependencies: Kt,
      possibleRegistrationNames: Yn
    });
  }, Mg = Zt && !document.documentMode, tu = function(e, t, n) {
    if (!Fn) {
      var a = Ys(n), r = Ys(t);
      r !== a && (Fn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Lg = function(e) {
    if (!Fn) {
      Fn = !0;
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
  var NC = /\r\n?/g, EC = /\u0000|\uFFFD/g;
  function Ys(e) {
    Vn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(NC, `
`).replace(EC, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (Fn || (Fn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Vg(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function SC() {
  }
  function qs(e) {
    e.onclick = SC;
  }
  function xC(e, t, n, a, r) {
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
            var s = e !== "textarea" || l !== "";
            s && vs(t, l);
          } else typeof l == "number" && vs(t, "" + l);
        else i === Hs || i === Pr || i === Og || (Kt.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && pt("scroll", t)) : l != null && ga(t, i, l, r));
      }
  }
  function RC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Xv(e, l) : i === eu ? qv(e, l) : i === Oi ? vs(e, l) : ga(e, i, l, a);
    }
  }
  function CC(e, t, n, a) {
    var r, i = Vg(n), l, o = a;
    if (o === or && (o = jf(e)), o === or) {
      if (r = Ni(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var s = i.createElement("div");
        s.innerHTML = "<script><\/script>";
        var m = s.firstChild;
        l = s.removeChild(m);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var h = l;
        t.multiple ? h.multiple = !0 : t.size && (h.size = t.size);
      }
    } else
      l = i.createElementNS(o, e);
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !An.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function DC(e, t) {
    return Vg(t).createTextNode(e);
  }
  function TC(e, t, n, a) {
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
    switch (Mf(t, i), xC(t, e, a, i, r), t) {
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
  function jC(e, t, n, a, r) {
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
    var s, m, h = null;
    for (s in l)
      if (!(o.hasOwnProperty(s) || !l.hasOwnProperty(s) || l[s] == null))
        if (s === Li) {
          var S = l[s];
          for (m in S)
            S.hasOwnProperty(m) && (h || (h = {}), h[m] = "");
        } else s === eu || s === Oi || s === Hs || s === Pr || s === Og || (Kt.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in o) {
      var E = o[s], O = l != null ? l[s] : void 0;
      if (!(!o.hasOwnProperty(s) || E === O || E == null && O == null))
        if (s === Li)
          if (E && Object.freeze(E), O) {
            for (m in O)
              O.hasOwnProperty(m) && (!E || !E.hasOwnProperty(m)) && (h || (h = {}), h[m] = "");
            for (m in E)
              E.hasOwnProperty(m) && O[m] !== E[m] && (h || (h = {}), h[m] = E[m]);
          } else
            h || (i || (i = []), i.push(s, h)), h = E;
        else if (s === eu) {
          var M = E ? E[Bs] : void 0, z = O ? O[Bs] : void 0;
          M != null && z !== M && (i = i || []).push(s, M);
        } else s === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(s, "" + E) : s === Hs || s === Pr || (Kt.hasOwnProperty(s) ? (E != null && (typeof E != "function" && $s(s, E), s === "onScroll" && pt("scroll", e)), !i && O !== E && (i = [])) : (i = i || []).push(s, E));
    }
    return h && (WE(h, o[Li]), (i = i || []).push(Li, h)), i;
  }
  function wC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && c(e, r);
    var i = Ni(n, a), l = Ni(n, r);
    switch (RC(e, t, i, l), n) {
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
  function _C(e) {
    {
      var t = e.toLowerCase();
      return hs.hasOwnProperty(t) && hs[t] || null;
    }
  }
  function OC(e, t, n, a, r, i, l) {
    var o, s;
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
        for (var m = 0; m < Xo.length; m++)
          pt(Xo[m], e);
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
      s = /* @__PURE__ */ new Set();
      for (var h = e.attributes, S = 0; S < h.length; S++) {
        var E = h[S].name.toLowerCase();
        switch (E) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            s.add(h[S].name);
        }
      }
    }
    var O = null;
    for (var M in n)
      if (n.hasOwnProperty(M)) {
        var z = n[M];
        if (M === Oi)
          typeof z == "string" ? e.textContent !== z && (n[Pr] !== !0 && Is(e.textContent, z, i, l), O = [Oi, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Pr] !== !0 && Is(e.textContent, z, i, l), O = [Oi, "" + z]);
        else if (Kt.hasOwnProperty(M))
          z != null && (typeof z != "function" && $s(M, z), M === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var ne = void 0, Ee = Nt(M);
          if (n[Pr] !== !0) {
            if (!(M === Hs || M === Pr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            M === "value" || M === "checked" || M === "selected")) {
              if (M === eu) {
                var me = e.innerHTML, qe = z ? z[Bs] : void 0;
                if (qe != null) {
                  var Be = Ag(e, qe);
                  Be !== me && tu(M, me, Be);
                }
              } else if (M === Li) {
                if (s.delete(M), Mg) {
                  var j = qE(z);
                  ne = e.getAttribute("style"), j !== ne && tu(M, ne, j);
                }
              } else if (o && !$n)
                s.delete(M.toLowerCase()), ne = ci(e, M, z), z !== ne && tu(M, ne, z);
              else if (!gt(M, Ee, o) && !dn(M, z, Ee, o)) {
                var H = !1;
                if (Ee !== null)
                  s.delete(Ee.attributeName), ne = Xi(e, M, z, Ee);
                else {
                  var w = a;
                  if (w === or && (w = jf(t)), w === or)
                    s.delete(M.toLowerCase());
                  else {
                    var W = _C(M);
                    W !== null && W !== M && (H = !0, s.delete(W)), s.delete(M);
                  }
                  ne = ci(e, M, z);
                }
                var se = $n;
                !se && z !== ne && !H && tu(M, ne, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    s.size > 0 && n[Pr] !== !0 && Lg(s), t) {
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
  function LC(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Id(e, t) {
    {
      if (Fn)
        return;
      Fn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function qd(e, t) {
    {
      if (Fn)
        return;
      Fn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t, n) {
    {
      if (Fn)
        return;
      Fn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Wd(e, t) {
    {
      if (t === "" || Fn)
        return;
      Fn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function MC(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
        return;
      case "textarea":
        TE(e, n);
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
    var AC = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], kg = [
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
    ], VC = kg.concat(["button"]), kC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Ug = {
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
      var n = ze({}, e || Ug), a = {
        tag: t
      };
      return kg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), VC.indexOf(t) !== -1 && (n.pTagInButtonScope = null), AC.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var UC = function(e, t) {
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
          return kC.indexOf(t) === -1;
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
    }, FC = function(e, t) {
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
    }, Fg = {};
    nu = function(e, t, n) {
      n = n || Ug;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = UC(e, r) ? null : a, l = i ? null : FC(e, n), o = i || l;
      if (o) {
        var s = o.tag, m = !!i + "|" + e + "|" + s;
        if (!Fg[m]) {
          Fg[m] = !0;
          var h = e, S = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", S = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var E = "";
            s === "table" && e === "tr" && (E += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, s, S, E);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", h, s);
        }
      }
    };
  }
  var Gs = "suppressHydrationWarning", Ws = "$", Qs = "/$", ru = "$?", iu = "$!", zC = "style", Qd = null, Kd = null;
  function HC(e) {
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
      var o = t.toLowerCase(), s = au(null, o);
      return {
        namespace: n,
        ancestorInfo: s
      };
    }
  }
  function BC(e, t, n) {
    {
      var a = e, r = wf(a.namespace, t), i = au(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function T_(e) {
    return e;
  }
  function PC(e) {
    Qd = zx(), Kd = nC();
    var t = null;
    return qh(!1), t;
  }
  function $C(e) {
    aC(Kd), qh(Qd), Qd = null, Kd = null;
  }
  function YC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (nu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var o = "" + t.children, s = au(l.ancestorInfo, e);
        nu(null, o, s);
      }
      i = l.namespace;
    }
    var m = CC(e, t, n, i);
    return uu(r, m), rp(m, t), m;
  }
  function IC(e, t) {
    e.appendChild(t);
  }
  function qC(e, t, n, a, r) {
    switch (TC(e, t, n, a), t) {
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
  function GC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var o = "" + a.children, s = au(l.ancestorInfo, t);
        nu(null, o, s);
      }
    }
    return jC(e, t, n, a);
  }
  function Xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function WC(e, t, n, a) {
    {
      var r = n;
      nu(null, e, r.ancestorInfo);
    }
    var i = DC(e, t);
    return uu(a, i), i;
  }
  function QC() {
    var e = window.event;
    return e === void 0 ? vr : Gh(e.type);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, KC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, zg = typeof Promise == "function" ? Promise : void 0, XC = typeof queueMicrotask == "function" ? queueMicrotask : typeof zg < "u" ? function(e) {
    return zg.resolve(null).then(e).catch(JC);
  } : Jd;
  function JC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ZC(e, t, n, a) {
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
  function e0(e, t, n, a, r, i) {
    wC(e, t, n, a, r), rp(e, r);
  }
  function Hg(e) {
    vs(e, "");
  }
  function t0(e, t, n) {
    e.nodeValue = n;
  }
  function n0(e, t) {
    e.appendChild(t);
  }
  function a0(e, t) {
    var n;
    e.nodeType === Dt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function r0(e, t, n) {
    e.insertBefore(t, n);
  }
  function i0(e, t, n) {
    e.nodeType === Dt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function l0(e, t) {
    e.removeChild(t);
  }
  function o0(e, t) {
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
  function u0(e, t) {
    e.nodeType === Dt ? ep(e.parentNode, t) : e.nodeType === Un && ep(e, t), Bo(e);
  }
  function s0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function c0(e) {
    e.nodeValue = "";
  }
  function f0(e, t) {
    e = e;
    var n = t[zC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Of("display", a);
  }
  function d0(e, t) {
    e.nodeValue = t;
  }
  function p0(e) {
    e.nodeType === Un ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function m0(e, t, n) {
    return e.nodeType !== Un || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function v0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function h0(e) {
    return e.nodeType !== Dt ? null : e;
  }
  function Bg(e) {
    return e.data === ru;
  }
  function tp(e) {
    return e.data === iu;
  }
  function g0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function y0(e, t) {
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
  function b0(e) {
    return Ks(e.firstChild);
  }
  function N0(e) {
    return Ks(e.firstChild);
  }
  function E0(e) {
    return Ks(e.nextSibling);
  }
  function S0(e, t, n, a, r, i, l) {
    uu(i, e), rp(e, n);
    var o;
    {
      var s = r;
      o = s.namespace;
    }
    var m = (i.mode & Ye) !== xe;
    return OC(e, t, n, o, a, m, l);
  }
  function x0(e, t, n, a) {
    return uu(n, e), n.mode & Ye, LC(e, t);
  }
  function R0(e, t) {
    uu(t, e);
  }
  function C0(e) {
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
  function D0(e) {
    Bo(e);
  }
  function T0(e) {
    Bo(e);
  }
  function j0(e) {
    return e !== "head" && e !== "body";
  }
  function w0(e, t, n, a) {
    var r = !0;
    Is(t.nodeValue, n, a, r);
  }
  function _0(e, t, n, a, r, i) {
    if (t[Gs] !== !0) {
      var l = !0;
      Is(a.nodeValue, r, i, l);
    }
  }
  function O0(e, t) {
    t.nodeType === Un ? Id(e, t) : t.nodeType === Dt || qd(e, t);
  }
  function L0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Un ? Id(n, t) : t.nodeType === Dt || qd(n, t));
    }
  }
  function M0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === Un ? Id(n, a) : a.nodeType === Dt || qd(n, a));
  }
  function A0(e, t, n) {
    Gd(e, t);
  }
  function V0(e, t) {
    Wd(e, t);
  }
  function k0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Gd(a, t);
    }
  }
  function U0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Wd(n, t);
    }
  }
  function F0(e, t, n, a, r, i) {
    (i || t[Gs] !== !0) && Gd(n, a);
  }
  function z0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && Wd(n, a);
  }
  function H0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function B0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, P0 = "__reactListeners$" + Dl, $0 = "__reactHandles$" + Dl;
  function Y0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[P0], delete e[$0];
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
    return t && (t.tag === V || t.tag === Q || t.tag === B || t.tag === x) ? t : null;
  }
  function jl(e) {
    if (e.tag === V || e.tag === Q)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function Js(e) {
    return e[np] || null;
  }
  function rp(e, t) {
    e[np] = t;
  }
  function I0(e) {
    var t = e[ap];
    return t === void 0 && (t = e[ap] = /* @__PURE__ */ new Set()), t;
  }
  var Yg = {}, Ig = v.ReactDebugCurrentFrame;
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
              var s = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw s.name = "Invariant Violation", s;
            }
            o = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (m) {
            o = m;
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
        var o = Ve(e) || "Unknown";
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
          var i = Ve(e) || "Unknown";
          lp[i] || (lp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var o in l)
        if (!(o in r))
          throw new Error((Ve(e) || "Unknown") + '.getChildContext(): key "' + o + '" is not defined in childContextTypes.');
      {
        var s = Ve(e) || "Unknown";
        xa(r, l, "child context", s);
      }
      return ze({}, n, l);
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
  function q0(e) {
    {
      if (!jS(e) || e.tag !== T)
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
  function G0(e) {
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
        for (Qt(Wn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        yr = null, sp = !1;
      } catch (i) {
        throw yr !== null && (yr = yr.slice(e + 1)), Eh(Ns, qr), i;
      } finally {
        Qt(t), cp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, ic = null, lc = 0, ia = [], la = 0, Ai = null, br = 1, Nr = "";
  function W0(e) {
    return ki(), (e.flags & ph) !== Ce;
  }
  function Q0(e) {
    return ki(), lc;
  }
  function K0() {
    var e = Nr, t = br, n = t & ~X0(t);
    return n.toString(32) + e;
  }
  function Vi(e, t) {
    ki(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Jg(e, t, n) {
    ki(), ia[la++] = br, ia[la++] = Nr, ia[la++] = Ai, Ai = e;
    var a = br, r = Nr, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, s = oc(t) + i;
    if (s > 30) {
      var m = i - i % 5, h = (1 << m) - 1, S = (l & h).toString(32), E = l >> m, O = i - m, M = oc(t) + O, z = o << O, ne = z | E, Ee = S + r;
      br = 1 << M | ne, Nr = Ee;
    } else {
      var me = o << i, qe = me | l, Be = r;
      br = 1 << s | qe, Nr = Be;
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
  function X0(e) {
    return 1 << oc(e) - 1;
  }
  function dp(e) {
    for (; e === ic; )
      ic = Ol[--Ll], Ol[Ll] = null, lc = Ol[--Ll], Ol[Ll] = null;
    for (; e === Ai; )
      Ai = ia[--la], ia[la] = null, Nr = ia[--la], ia[la] = null, br = ia[--la], ia[la] = null;
  }
  function J0() {
    return ki(), Ai !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function Z0(e, t) {
    ki(), ia[la++] = br, ia[la++] = Nr, ia[la++] = Ai, br = t.id, Nr = t.overflow, Ai = e;
  }
  function ki() {
    nn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var tn = null, oa = null, Ra = !1, Ui = !1, Gr = null;
  function eD() {
    Ra && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Zg() {
    Ui = !0;
  }
  function tD() {
    return Ui;
  }
  function nD(e) {
    var t = e.stateNode.containerInfo;
    return oa = N0(t), tn = e, Ra = !0, Gr = null, Ui = !1, !0;
  }
  function aD(e, t, n) {
    return oa = E0(t), tn = e, Ra = !0, Gr = null, Ui = !1, n !== null && Z0(e, n), !0;
  }
  function ey(e, t) {
    switch (e.tag) {
      case x: {
        O0(e.stateNode.containerInfo, t);
        break;
      }
      case V: {
        var n = (e.mode & Ye) !== xe;
        M0(
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
        a.dehydrated !== null && L0(a.dehydrated, t);
        break;
      }
    }
  }
  function ty(e, t) {
    ey(e, t);
    var n = ow();
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
              t.pendingProps, A0(n, a);
              break;
            case Q:
              var r = t.pendingProps;
              V0(n, r);
              break;
          }
          break;
        }
        case V: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case V: {
              var s = t.type, m = t.pendingProps, h = (e.mode & Ye) !== xe;
              F0(
                i,
                l,
                o,
                s,
                m,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case Q: {
              var S = t.pendingProps, E = (e.mode & Ye) !== xe;
              z0(
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
              var z = t.type;
              t.pendingProps, k0(M, z);
              break;
            case Q:
              var ne = t.pendingProps;
              U0(M, ne);
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
        var a = m0(t, n);
        return a !== null ? (e.stateNode = a, tn = e, oa = b0(a), !0) : !1;
      }
      case Q: {
        var r = e.pendingProps, i = v0(t, r);
        return i !== null ? (e.stateNode = i, tn = e, oa = null, !0) : !1;
      }
      case B: {
        var l = h0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: J0(),
            retryLane: qn
          };
          e.memoizedState = o;
          var s = uw(l);
          return s.return = e, e.child = s, tn = e, oa = null, !0;
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
        mp(e) && (pp(tn, e), vp()), ny(tn, e), Ra = !1, tn = e;
        return;
      }
      var n = t;
      if (!ay(e, t)) {
        mp(e) && (pp(tn, e), vp()), t = lu(n);
        var a = tn;
        if (!t || !ay(e, t)) {
          ny(tn, e), Ra = !1, tn = e;
          return;
        }
        ty(a, n);
      }
    }
  }
  function rD(e, t, n) {
    var a = e.stateNode, r = !Ui, i = S0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function iD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = x0(t, n, e);
    if (a) {
      var r = tn;
      if (r !== null)
        switch (r.tag) {
          case x: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== xe;
            w0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case V: {
            var o = r.type, s = r.memoizedProps, m = r.stateNode, h = (r.mode & Ye) !== xe;
            _0(
              o,
              s,
              m,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              h
            );
            break;
          }
        }
    }
    return a;
  }
  function lD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    R0(n, e);
  }
  function oD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return C0(n);
  }
  function ry(e) {
    for (var t = e.return; t !== null && t.tag !== V && t.tag !== x && t.tag !== B; )
      t = t.return;
    tn = t;
  }
  function uc(e) {
    if (e !== tn)
      return !1;
    if (!Ra)
      return ry(e), Ra = !0, !1;
    if (e.tag !== x && (e.tag !== V || j0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = oa;
      if (t)
        if (mp(e))
          iy(e), vp();
        else
          for (; t; )
            ty(e, t), t = lu(t);
    }
    return ry(e), e.tag === B ? oa = oD(e) : oa = tn ? lu(e.stateNode) : null, !0;
  }
  function uD() {
    return Ra && oa !== null;
  }
  function iy(e) {
    for (var t = oa; t; )
      ey(e, t), t = lu(t);
  }
  function Ml() {
    tn = null, oa = null, Ra = !1, Ui = !1;
  }
  function ly() {
    Gr !== null && (Zb(Gr), Gr = null);
  }
  function nn() {
    return Ra;
  }
  function gp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var sD = v.ReactCurrentBatchConfig, cD = null;
  function fD() {
    return sD.transition;
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
    var dD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & St && (t = n), n = n.return;
      return t;
    }, Fi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, cu = [], fu = [], du = [], pu = [], mu = [], vu = [], zi = /* @__PURE__ */ new Set();
    Ca.recordUnsafeLifecycleWarnings = function(e, t) {
      zi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && cu.push(e), e.mode & St && typeof t.UNSAFE_componentWillMount == "function" && fu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & St && typeof t.UNSAFE_componentWillReceiveProps == "function" && pu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & St && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Ca.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(E) {
        e.add(Ve(E) || "Component"), zi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(Ve(E) || "Component"), zi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(Ve(E) || "Component"), zi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(Ve(E) || "Component"), zi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(Ve(E) || "Component"), zi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(Ve(E) || "Component"), zi.add(E.type);
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
        var s = Fi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, s);
      }
      if (e.size > 0) {
        var m = Fi(e);
        C(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, m);
      }
      if (n.size > 0) {
        var h = Fi(n);
        C(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var S = Fi(r);
        C(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, S);
      }
    };
    var sc = /* @__PURE__ */ new Map(), oy = /* @__PURE__ */ new Set();
    Ca.recordLegacyContextWarning = function(e, t) {
      var n = dD(e);
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
            a.add(Ve(i) || "Component"), oy.add(i.type);
          });
          var r = Fi(a);
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
  var yp, bp, Np, Ep, Sp, uy = function(e, t) {
  };
  yp = !1, bp = !1, Np = {}, Ep = {}, Sp = {}, uy = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Ve(t) || "Component";
      Ep[n] || (Ep[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function pD(e) {
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
      !(typeof n.type == "function" && !pD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Ve(e) || "Component";
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
        var s = l;
        tr(a, "ref");
        var m = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === m)
          return t.ref;
        var h = function(S) {
          var E = s.refs;
          S === null ? delete E[m] : E[m] = S;
        };
        return h._stringRef = m, h;
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
      var t = Ve(e) || "Component";
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
      for (var w = /* @__PURE__ */ new Map(), W = H; W !== null; )
        W.key !== null ? w.set(W.key, W) : w.set(W.index, W), W = W.sibling;
      return w;
    }
    function r(j, H) {
      var w = Wi(j, H);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, H, w) {
      if (j.index = w, !e)
        return j.flags |= ph, H;
      var W = j.alternate;
      if (W !== null) {
        var se = W.index;
        return se < H ? (j.flags |= Tt, H) : se;
      } else
        return j.flags |= Tt, H;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= Tt), j;
    }
    function o(j, H, w, W) {
      if (H === null || H.tag !== Q) {
        var se = gv(w, j.mode, W);
        return se.return = j, se;
      } else {
        var re = r(H, w);
        return re.return = j, re;
      }
    }
    function s(j, H, w, W) {
      var se = w.type;
      if (se === Fa)
        return h(j, H, w.props.children, W, w.key);
      if (H !== null && (H.elementType === se || // Keep this check inline so it only runs on the false path:
      vN(H, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof se == "object" && se !== null && se.$$typeof === Se && sy(se) === H.type)) {
        var re = r(H, w.props);
        return re.ref = hu(j, H, w), re.return = j, re._debugSource = w._source, re._debugOwner = w._owner, re;
      }
      var De = hv(w, j.mode, W);
      return De.ref = hu(j, H, w), De.return = j, De;
    }
    function m(j, H, w, W) {
      if (H === null || H.tag !== A || H.stateNode.containerInfo !== w.containerInfo || H.stateNode.implementation !== w.implementation) {
        var se = yv(w, j.mode, W);
        return se.return = j, se;
      } else {
        var re = r(H, w.children || []);
        return re.return = j, re;
      }
    }
    function h(j, H, w, W, se) {
      if (H === null || H.tag !== pe) {
        var re = ri(w, j.mode, W, se);
        return re.return = j, re;
      } else {
        var De = r(H, w);
        return De.return = j, De;
      }
    }
    function S(j, H, w) {
      if (typeof H == "string" && H !== "" || typeof H == "number") {
        var W = gv("" + H, j.mode, w);
        return W.return = j, W;
      }
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case aa: {
            var se = hv(H, j.mode, w);
            return se.ref = hu(j, null, H), se.return = j, se;
          }
          case In: {
            var re = yv(H, j.mode, w);
            return re.return = j, re;
          }
          case Se: {
            var De = H._payload, Ae = H._init;
            return S(j, Ae(De), w);
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
    function E(j, H, w, W) {
      var se = H !== null ? H.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return se !== null ? null : o(j, H, "" + w, W);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case aa:
            return w.key === se ? s(j, H, w, W) : null;
          case In:
            return w.key === se ? m(j, H, w, W) : null;
          case Se: {
            var re = w._payload, De = w._init;
            return E(j, H, De(re), W);
          }
        }
        if (He(w) || ba(w))
          return se !== null ? null : h(j, H, w, W, null);
        cc(j, w);
      }
      return typeof w == "function" && fc(j), null;
    }
    function O(j, H, w, W, se) {
      if (typeof W == "string" && W !== "" || typeof W == "number") {
        var re = j.get(w) || null;
        return o(H, re, "" + W, se);
      }
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case aa: {
            var De = j.get(W.key === null ? w : W.key) || null;
            return s(H, De, W, se);
          }
          case In: {
            var Ae = j.get(W.key === null ? w : W.key) || null;
            return m(H, Ae, W, se);
          }
          case Se:
            var rt = W._payload, We = W._init;
            return O(j, H, w, We(rt), se);
        }
        if (He(W) || ba(W)) {
          var Rt = j.get(w) || null;
          return h(H, Rt, W, se, null);
        }
        cc(H, W);
      }
      return typeof W == "function" && fc(H), null;
    }
    function M(j, H, w) {
      {
        if (typeof j != "object" || j === null)
          return H;
        switch (j.$$typeof) {
          case aa:
          case In:
            uy(j, w);
            var W = j.key;
            if (typeof W != "string")
              break;
            if (H === null) {
              H = /* @__PURE__ */ new Set(), H.add(W);
              break;
            }
            if (!H.has(W)) {
              H.add(W);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", W);
            break;
          case Se:
            var se = j._payload, re = j._init;
            M(re(se), H, w);
            break;
        }
      }
      return H;
    }
    function z(j, H, w, W) {
      for (var se = null, re = 0; re < w.length; re++) {
        var De = w[re];
        se = M(De, se, j);
      }
      for (var Ae = null, rt = null, We = H, Rt = 0, Qe = 0, xt = null; We !== null && Qe < w.length; Qe++) {
        We.index > Qe ? (xt = We, We = null) : xt = We.sibling;
        var yn = E(j, We, w[Qe], W);
        if (yn === null) {
          We === null && (We = xt);
          break;
        }
        e && We && yn.alternate === null && t(j, We), Rt = i(yn, Rt, Qe), rt === null ? Ae = yn : rt.sibling = yn, rt = yn, We = xt;
      }
      if (Qe === w.length) {
        if (n(j, We), nn()) {
          var cn = Qe;
          Vi(j, cn);
        }
        return Ae;
      }
      if (We === null) {
        for (; Qe < w.length; Qe++) {
          var Zn = S(j, w[Qe], W);
          Zn !== null && (Rt = i(Zn, Rt, Qe), rt === null ? Ae = Zn : rt.sibling = Zn, rt = Zn);
        }
        if (nn()) {
          var Ln = Qe;
          Vi(j, Ln);
        }
        return Ae;
      }
      for (var Mn = a(j, We); Qe < w.length; Qe++) {
        var bn = O(Mn, j, Qe, w[Qe], W);
        bn !== null && (e && bn.alternate !== null && Mn.delete(bn.key === null ? Qe : bn.key), Rt = i(bn, Rt, Qe), rt === null ? Ae = bn : rt.sibling = bn, rt = bn);
      }
      if (e && Mn.forEach(function(Jl) {
        return t(j, Jl);
      }), nn()) {
        var Tr = Qe;
        Vi(j, Tr);
      }
      return Ae;
    }
    function ne(j, H, w, W) {
      var se = ba(w);
      if (typeof se != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === se && (yp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), yp = !0);
        var re = se.call(w);
        if (re)
          for (var De = null, Ae = re.next(); !Ae.done; Ae = re.next()) {
            var rt = Ae.value;
            De = M(rt, De, j);
          }
      }
      var We = se.call(w);
      if (We == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, Qe = null, xt = H, yn = 0, cn = 0, Zn = null, Ln = We.next(); xt !== null && !Ln.done; cn++, Ln = We.next()) {
        xt.index > cn ? (Zn = xt, xt = null) : Zn = xt.sibling;
        var Mn = E(j, xt, Ln.value, W);
        if (Mn === null) {
          xt === null && (xt = Zn);
          break;
        }
        e && xt && Mn.alternate === null && t(j, xt), yn = i(Mn, yn, cn), Qe === null ? Rt = Mn : Qe.sibling = Mn, Qe = Mn, xt = Zn;
      }
      if (Ln.done) {
        if (n(j, xt), nn()) {
          var bn = cn;
          Vi(j, bn);
        }
        return Rt;
      }
      if (xt === null) {
        for (; !Ln.done; cn++, Ln = We.next()) {
          var Tr = S(j, Ln.value, W);
          Tr !== null && (yn = i(Tr, yn, cn), Qe === null ? Rt = Tr : Qe.sibling = Tr, Qe = Tr);
        }
        if (nn()) {
          var Jl = cn;
          Vi(j, Jl);
        }
        return Rt;
      }
      for (var Wu = a(j, xt); !Ln.done; cn++, Ln = We.next()) {
        var Za = O(Wu, j, cn, Ln.value, W);
        Za !== null && (e && Za.alternate !== null && Wu.delete(Za.key === null ? cn : Za.key), yn = i(Za, yn, cn), Qe === null ? Rt = Za : Qe.sibling = Za, Qe = Za);
      }
      if (e && Wu.forEach(function(zw) {
        return t(j, zw);
      }), nn()) {
        var Fw = cn;
        Vi(j, Fw);
      }
      return Rt;
    }
    function Ee(j, H, w, W) {
      if (H !== null && H.tag === Q) {
        n(j, H.sibling);
        var se = r(H, w);
        return se.return = j, se;
      }
      n(j, H);
      var re = gv(w, j.mode, W);
      return re.return = j, re;
    }
    function me(j, H, w, W) {
      for (var se = w.key, re = H; re !== null; ) {
        if (re.key === se) {
          var De = w.type;
          if (De === Fa) {
            if (re.tag === pe) {
              n(j, re.sibling);
              var Ae = r(re, w.props.children);
              return Ae.return = j, Ae._debugSource = w._source, Ae._debugOwner = w._owner, Ae;
            }
          } else if (re.elementType === De || // Keep this check inline so it only runs on the false path:
          vN(re, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === Se && sy(De) === re.type) {
            n(j, re.sibling);
            var rt = r(re, w.props);
            return rt.ref = hu(j, re, w), rt.return = j, rt._debugSource = w._source, rt._debugOwner = w._owner, rt;
          }
          n(j, re);
          break;
        } else
          t(j, re);
        re = re.sibling;
      }
      if (w.type === Fa) {
        var We = ri(w.props.children, j.mode, W, w.key);
        return We.return = j, We;
      } else {
        var Rt = hv(w, j.mode, W);
        return Rt.ref = hu(j, H, w), Rt.return = j, Rt;
      }
    }
    function qe(j, H, w, W) {
      for (var se = w.key, re = H; re !== null; ) {
        if (re.key === se)
          if (re.tag === A && re.stateNode.containerInfo === w.containerInfo && re.stateNode.implementation === w.implementation) {
            n(j, re.sibling);
            var De = r(re, w.children || []);
            return De.return = j, De;
          } else {
            n(j, re);
            break;
          }
        else
          t(j, re);
        re = re.sibling;
      }
      var Ae = yv(w, j.mode, W);
      return Ae.return = j, Ae;
    }
    function Be(j, H, w, W) {
      var se = typeof w == "object" && w !== null && w.type === Fa && w.key === null;
      if (se && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case aa:
            return l(me(j, H, w, W));
          case In:
            return l(qe(j, H, w, W));
          case Se:
            var re = w._payload, De = w._init;
            return Be(j, H, De(re), W);
        }
        if (He(w))
          return z(j, H, w, W);
        if (ba(w))
          return ne(j, H, w, W);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Ee(j, H, "" + w, W)) : (typeof w == "function" && fc(j), n(j, H));
    }
    return Be;
  }
  var Al = cy(!0), fy = cy(!1);
  function mD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Wi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Wi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function vD(e, t) {
    for (var n = e.child; n !== null; )
      nw(n, t), n = n.sibling;
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
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = Ue(r.childLanes, t)) : (a.childLanes = Ue(a.childLanes, t), r !== null && (r.childLanes = Ue(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function hD(e, t, n) {
    gD(e, t, n);
  }
  function gD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var o = Ao(n), s = Er(st, o);
              s.tag = hc;
              var m = a.updateQueue;
              if (m !== null) {
                var h = m.shared, S = h.pending;
                S === null ? s.next = s : (s.next = S.next, S.next = s), h.pending = s;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = Ue(E.lanes, n)), Tp(a.return, n, e), i.lanes = Ue(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === I)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === J) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = Ue(O.lanes, n);
        var M = O.alternate;
        M !== null && (M.lanes = Ue(M.lanes, n)), Tp(O, n, e), r = a.sibling;
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
          var z = r.sibling;
          if (z !== null) {
            z.return = r.return, r = z;
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
          lanes: Y,
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
  function yD() {
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
  function bD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function ND(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function zn(e, t) {
    return vc(e, t);
  }
  var ED = vc;
  function vc(e, t) {
    e.lanes = Ue(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (Tt | fr)) !== Ce && fN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (Tt | fr)) !== Ce && fN(e), a = r, r = r.return;
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
        lanes: Y
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
    if (yc === r && !_p && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), _p = !0), bj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, ED(e, n);
    } else
      return ND(e, r, t, n);
  }
  function bc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Oh(n)) {
        var i = r.lanes;
        i = Mh(i, e.pendingLanes);
        var l = Ue(i, n);
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
          var s = o;
          do {
            var m = {
              eventTime: s.eventTime,
              lane: s.lane,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null
            };
            l === null ? i = l = m : (l.next = m, l = m), s = s.next;
          } while (s !== null);
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
    var h = n.lastBaseUpdate;
    h === null ? n.firstBaseUpdate = t : h.next = t, n.lastBaseUpdate = t;
  }
  function SD(e, t, n, a, r, i) {
    switch (n.tag) {
      case gy: {
        var l = n.payload;
        if (typeof l == "function") {
          dy();
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
            py();
          }
          return o;
        }
        return l;
      }
      case wp:
        e.flags = e.flags & ~jn | Je;
      case hy: {
        var s = n.payload, m;
        if (typeof s == "function") {
          dy(), m = s.call(i, a, r);
          {
            if (e.mode & St) {
              Gt(!0);
              try {
                s.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            py();
          }
        } else
          m = s;
        return m == null ? a : ze({}, a, m);
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
      var s = o, m = s.next;
      s.next = null, l === null ? i = m : l.next = m, l = s;
      var h = e.alternate;
      if (h !== null) {
        var S = h.updateQueue, E = S.lastBaseUpdate;
        E !== l && (E === null ? S.firstBaseUpdate = m : E.next = m, S.lastBaseUpdate = s);
      }
    }
    if (i !== null) {
      var O = r.baseState, M = Y, z = null, ne = null, Ee = null, me = i;
      do {
        var qe = me.lane, Be = me.eventTime;
        if (bl(a, qe)) {
          if (Ee !== null) {
            var H = {
              eventTime: Be,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              tag: me.tag,
              payload: me.payload,
              callback: me.callback,
              next: null
            };
            Ee = Ee.next = H;
          }
          O = SD(e, r, me, O, t, n);
          var w = me.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          me.lane !== Wt) {
            e.flags |= dh;
            var W = r.effects;
            W === null ? r.effects = [me] : W.push(me);
          }
        } else {
          var j = {
            eventTime: Be,
            lane: qe,
            tag: me.tag,
            payload: me.payload,
            callback: me.callback,
            next: null
          };
          Ee === null ? (ne = Ee = j, z = O) : Ee = Ee.next = j, M = Ue(M, qe);
        }
        if (me = me.next, me === null) {
          if (o = r.shared.pending, o === null)
            break;
          var se = o, re = se.next;
          se.next = null, me = re, r.lastBaseUpdate = se, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (z = O), r.baseState = z, r.firstBaseUpdate = ne, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Ae = De;
        do
          M = Ue(M, Ae.lane), Ae = Ae.next;
        while (Ae !== De);
      } else i === null && (r.shared.lanes = Y);
      $u(M), e.lanes = M, e.memoizedState = O;
    }
    yc = null;
  }
  function xD(e, t) {
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
        l !== null && (i.callback = null, xD(l, n));
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
    var n = HC(t);
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
    var t = xc(Qr.current), n = BC(t, e.type);
    t !== n && (hn(yu, e, e), hn(Qr, n, e));
  }
  function Vp(e) {
    yu.current === e && (vn(Qr, e), vn(yu, e));
  }
  var RD = 0, xy = 1, Ry = 1, bu = 2, Da = Yr(RD);
  function kp(e, t) {
    return (e & t) !== 0;
  }
  function Fl(e) {
    return e & xy;
  }
  function Up(e, t) {
    return e & xy | t;
  }
  function CD(e, t) {
    return e | t;
  }
  function Kr(e, t) {
    hn(Da, t, e);
  }
  function zl(e) {
    vn(Da, e);
  }
  function DD(e, t) {
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
  ), an = (
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
  function TD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ue = v.ReactCurrentDispatcher, Nu = v.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = Y, at = null, At = null, Vt = null, Cc = !1, Eu = !1, Su = 0, jD = 0, wD = 25, P = null, ua = null, Xr = -1, Bp = !1;
  function Ze() {
    {
      var e = P;
      ua === null ? ua = [e] : ua.push(e);
    }
  }
  function Z() {
    {
      var e = P;
      ua !== null && (Xr++, ua[Xr] !== e && _D(e));
    }
  }
  function Bl(e) {
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
  }
  function _D(e) {
    {
      var t = Ve(at);
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
    Bi = i, at = t, ua = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Y, e !== null && e.memoizedState !== null ? ue.current = qy : ua !== null ? ue.current = Iy : ue.current = Yy;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, Su = 0, o >= wD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, At = null, Vt = null, t.updateQueue = null, Xr = -1, ue.current = Gy, l = n(a, r);
      } while (Eu);
    }
    ue.current = Fc, t._debugHookTypes = ua;
    var s = At !== null && At.next !== null;
    if (Bi = Y, at = null, At = null, Vt = null, P = null, ua = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== xe && f("Internal React error: Expected static flag was missing. Please notify the React team."), Cc = !1, s)
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
    if (ue.current = Fc, Cc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = Y, at = null, At = null, Vt = null, ua = null, Xr = -1, P = null, zy = !1, Eu = !1, Su = 0;
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
      lanes: Y,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = AD.bind(null, at, i);
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
        var s = l.next, m = o.next;
        l.next = m, o.next = s;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = o, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, S = i.baseState, E = null, O = null, M = null, z = h;
      do {
        var ne = z.lane;
        if (bl(Bi, ne)) {
          if (M !== null) {
            var me = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            };
            M = M.next = me;
          }
          if (z.hasEagerState)
            S = z.eagerState;
          else {
            var qe = z.action;
            S = e(S, qe);
          }
        } else {
          var Ee = {
            lane: ne,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          M === null ? (O = M = Ee, E = S) : M = M.next = Ee, at.lanes = Ue(at.lanes, ne), $u(ne);
        }
        z = z.next;
      } while (z !== null && z !== h);
      M === null ? E = S : M.next = O, Kn(S, a.memoizedState) || Ou(), a.memoizedState = S, a.baseState = E, a.baseQueue = M, r.lastRenderedState = S;
    }
    var Be = r.interleaved;
    if (Be !== null) {
      var j = Be;
      do {
        var H = j.lane;
        at.lanes = Ue(at.lanes, H), $u(H), j = j.next;
      } while (j !== Be);
    } else l === null && (r.lanes = Y);
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
      var s = l.next, m = s;
      do {
        var h = m.action;
        o = e(o, h), m = m.next;
      } while (m !== s);
      Kn(o, a.memoizedState) || Ou(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function j_(e, t, n) {
  }
  function w_(e, t, n) {
  }
  function Gp(e, t, n) {
    var a = at, r = Ga(), i, l = nn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var o = t();
        Kn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
      }
      var s = af();
      if (s === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(s, Bi) || jy(a, t, i);
    }
    r.memoizedState = i;
    var m = {
      value: i,
      getSnapshot: t
    };
    return r.queue = m, _c(_y.bind(null, a, m, e), [e]), a.flags |= Vr, xu(Lt | an, wy.bind(null, a, m, i, t), void 0, null), i;
  }
  function Dc(e, t, n) {
    var a = at, r = sa(), i = t();
    if (!Hl) {
      var l = t();
      Kn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var o = r.memoizedState, s = !Kn(o, i);
    s && (r.memoizedState = i, Ou());
    var m = r.queue;
    if (Cu(_y.bind(null, a, m, e), [e]), m.getSnapshot !== t || s || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Vt !== null && Vt.memoizedState.tag & Lt) {
      a.flags |= Vr, xu(Lt | an, wy.bind(null, a, m, i, t), void 0, null);
      var h = af();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(h, Bi) || jy(a, t, i);
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
    var t = zn(e, _e);
    t !== null && zt(t, e, _e, st);
  }
  function Tc(e) {
    var t = Ga();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: Y,
      dispatch: null,
      lastRenderedReducer: $p,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = VD.bind(null, at, n);
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
        var s = o.deps;
        if (Pp(i, s)) {
          r.memoizedState = xu(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = xu(Lt | t, n, l, i);
  }
  function _c(e, t) {
    return (at.mode & Pa) !== xe ? Ru(Gf | Vr | qf, an, e, t) : Ru(Vr | qf, an, e, t);
  }
  function Cu(e, t) {
    return wc(Vr, an, e, t);
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
  function OD(e, t) {
  }
  var Ac = OD;
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
    var a = !hx(Bi);
    if (a) {
      if (!Kn(n, t)) {
        var r = Lh();
        at.lanes = Ue(at.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function LD(e, t, n) {
    var a = Sa();
    Qt(Cx(a, mr)), e(!0);
    var r = Nu.transition;
    Nu.transition = {};
    var i = Nu.transition;
    Nu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Qt(a), Nu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && C("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function am() {
    var e = Tc(!1), t = e[0], n = e[1], a = LD.bind(null, n), r = Ga();
    return r.memoizedState = a, [t, a];
  }
  function Uy() {
    var e = Wp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  function Fy() {
    var e = Qp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  var zy = !1;
  function MD() {
    return zy;
  }
  function rm() {
    var e = Ga(), t = af(), n = t.identifierPrefix, a;
    if (nn()) {
      var r = K0();
      a = ":" + n + "R" + r;
      var i = Su++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = jD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Uc() {
    var e = sa(), t = e.memoizedState;
    return t;
  }
  function AD(e, t, n) {
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
        zt(i, e, a, l), Py(i, t, a);
      }
    }
    $y(e, a);
  }
  function VD(e, t, n) {
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
      if (e.lanes === Y && (i === null || i.lanes === Y)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = ue.current, ue.current = Ta;
          try {
            var s = t.lastRenderedState, m = l(s, n);
            if (r.hasEagerState = !0, r.eagerState = m, Kn(m, s)) {
              bD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ue.current = o;
          }
        }
      }
      var h = vy(e, t, r, a);
      if (h !== null) {
        var S = On();
        zt(h, e, a, S), Py(h, t, a);
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
      var r = Ue(a, n);
      t.lanes = r, xd(e, r);
    }
  }
  function $y(e, t, n) {
    Jf(e, t);
  }
  var Fc = {
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
  }, Yy = null, Iy = null, qy = null, Gy = null, Wa = null, Ta = null, zc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Oe = function() {
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
        var n = ue.current;
        ue.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Ze();
        var a = ue.current;
        ue.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Ze(), Kp(e);
      },
      useState: function(e) {
        P = "useState", Ze();
        var t = ue.current;
        ue.current = Wa;
        try {
          return Tc(e);
        } finally {
          ue.current = t;
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
        return P = "useCallback", Z(), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Z(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Z(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Z(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Z(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Z(), Jp(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Z();
        var n = ue.current;
        ue.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Z();
        var a = ue.current;
        ue.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Z(), Kp(e);
      },
      useState: function(e) {
        P = "useState", Z();
        var t = ue.current;
        ue.current = Wa;
        try {
          return Tc(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Z(), void 0;
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Z(), nm(e);
      },
      useTransition: function() {
        return P = "useTransition", Z(), am();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Z(), Gp(e, t, n);
      },
      useId: function() {
        return P = "useId", Z(), rm();
      },
      unstable_isNewReconciler: Ge
    }, qy = {
      readContext: function(e) {
        return jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Z(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Z(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Z();
        var n = ue.current;
        ue.current = Ta;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Z();
        var a = ue.current;
        ue.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Z(), jc();
      },
      useState: function(e) {
        P = "useState", Z();
        var t = ue.current;
        ue.current = Ta;
        try {
          return Wp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Z(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Z(), Ay(e);
      },
      useTransition: function() {
        return P = "useTransition", Z(), Uy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Z(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", Z(), Uc();
      },
      unstable_isNewReconciler: Ge
    }, Gy = {
      readContext: function(e) {
        return jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Z(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Z(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Z();
        var n = ue.current;
        ue.current = zc;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Z();
        var a = ue.current;
        ue.current = zc;
        try {
          return qp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Z(), jc();
      },
      useState: function(e) {
        P = "useState", Z();
        var t = ue.current;
        ue.current = zc;
        try {
          return Qp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Z(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Z(), Vy(e);
      },
      useTransition: function() {
        return P = "useTransition", Z(), Fy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Z(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", Z(), Uc();
      },
      unstable_isNewReconciler: Ge
    }, Wa = {
      readContext: function(e) {
        return im(), jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Oe(), Ze(), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Oe(), Ze(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Oe(), Ze(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Oe(), Ze(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Oe(), Ze(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Oe(), Ze(), Jp(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Oe(), Ze();
        var n = ue.current;
        ue.current = Wa;
        try {
          return tm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Oe(), Ze();
        var a = ue.current;
        ue.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Oe(), Ze(), Kp(e);
      },
      useState: function(e) {
        P = "useState", Oe(), Ze();
        var t = ue.current;
        ue.current = Wa;
        try {
          return Tc(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Oe(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Oe(), Ze(), nm(e);
      },
      useTransition: function() {
        return P = "useTransition", Oe(), Ze(), am();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Oe(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Oe(), Ze(), Gp(e, t, n);
      },
      useId: function() {
        return P = "useId", Oe(), Ze(), rm();
      },
      unstable_isNewReconciler: Ge
    }, Ta = {
      readContext: function(e) {
        return im(), jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Oe(), Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Oe(), Z(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Oe(), Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Oe(), Z(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Oe(), Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Oe(), Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Oe(), Z();
        var n = ue.current;
        ue.current = Ta;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Oe(), Z();
        var a = ue.current;
        ue.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Oe(), Z(), jc();
      },
      useState: function(e) {
        P = "useState", Oe(), Z();
        var t = ue.current;
        ue.current = Ta;
        try {
          return Wp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Oe(), Z(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Oe(), Z(), Ay(e);
      },
      useTransition: function() {
        return P = "useTransition", Oe(), Z(), Uy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Oe(), Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Oe(), Z(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", Oe(), Z(), Uc();
      },
      unstable_isNewReconciler: Ge
    }, zc = {
      readContext: function(e) {
        return im(), jt(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Oe(), Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Oe(), Z(), jt(e);
      },
      useEffect: function(e, t) {
        return P = "useEffect", Oe(), Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return P = "useImperativeHandle", Oe(), Z(), Mc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return P = "useInsertionEffect", Oe(), Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return P = "useLayoutEffect", Oe(), Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        P = "useMemo", Oe(), Z();
        var n = ue.current;
        ue.current = Ta;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Oe(), Z();
        var a = ue.current;
        ue.current = Ta;
        try {
          return qp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return P = "useRef", Oe(), Z(), jc();
      },
      useState: function(e) {
        P = "useState", Oe(), Z();
        var t = ue.current;
        ue.current = Ta;
        try {
          return Qp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return P = "useDebugValue", Oe(), Z(), Ac();
      },
      useDeferredValue: function(e) {
        return P = "useDeferredValue", Oe(), Z(), Vy(e);
      },
      useTransition: function() {
        return P = "useTransition", Oe(), Z(), Fy();
      },
      useMutableSource: function(e, t, n) {
        return P = "useMutableSource", Oe(), Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return P = "useSyncExternalStore", Oe(), Z(), Dc(e, t);
      },
      useId: function() {
        return P = "useId", Oe(), Z(), Uc();
      },
      unstable_isNewReconciler: Ge
    };
  }
  var Jr = p.unstable_now, Wy = 0, Hc = -1, Du = -1, Bc = -1, lm = !1, Pc = !1;
  function Qy() {
    return lm;
  }
  function kD() {
    Pc = !0;
  }
  function UD() {
    lm = !1, Pc = !1;
  }
  function FD() {
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
      var n = ze({}, t), a = e.defaultProps;
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
        Gt(!0);
        try {
          i = n(a, r);
        } finally {
          Gt(!1);
        }
      }
      Zy(t, i);
    }
    var l = i == null ? r : ze({}, r, i);
    if (e.memoizedState = l, e.lanes === Y) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: wS,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = On(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (zt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = On(), i = ni(a), l = Er(r, i);
      l.tag = gy, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (zt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = On(), r = ni(n), i = Er(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && (zt(l, n, r, a), bc(l, n, r)), lx(n, r);
    }
  };
  function tb(e, t, n, a, r, i, l) {
    var o = e.stateNode;
    if (typeof o.shouldComponentUpdate == "function") {
      var s = o.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & St) {
          Gt(!0);
          try {
            s = o.shouldComponentUpdate(a, i, l);
          } finally {
            Gt(!1);
          }
        }
        s === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ke(t) || "Component");
      }
      return s;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function zD(e, t, n) {
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
    t.updater = Em, e.stateNode = t, CS(t, e), t._reactInternalInstance = fm;
  }
  function ab(e, t, n) {
    var a = !1, r = Xn, i = Xn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === te && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var s = "";
        l === void 0 ? s = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? s = " However, it is set to a " + typeof l + "." : l.$$typeof === q ? s = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? s = " Did you accidentally pass the Context.Consumer instead?" : s = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ke(t) || "Component", s);
      }
    }
    if (typeof l == "object" && l !== null)
      i = jt(l);
    else {
      r = wl(e, t, !0);
      var m = t.contextTypes;
      a = m != null, i = a ? _l(e, r) : Xn;
    }
    var h = new t(n, i);
    if (e.mode & St) {
      Gt(!0);
      try {
        h = new t(n, i);
      } finally {
        Gt(!1);
      }
    }
    var S = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    nb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && S === null) {
        var E = Ke(t) || "Component";
        pm.has(E) || (pm.add(E), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, h.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var O = null, M = null, z = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? M = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (M = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), O !== null || M !== null || z !== null) {
          var ne = Ke(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vm.has(ne) || (vm.add(ne), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ne, Ee, O !== null ? `
  ` + O : "", M !== null ? `
  ` + M : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && qg(e, r, i), h;
  }
  function HD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ve(e) || "Component"), Em.enqueueReplaceState(t, t.state, null));
  }
  function rb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Ve(e) || "Component";
        dm.has(i) || (dm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Em.enqueueReplaceState(t, t.state, null);
    }
  }
  function Sm(e, t, n, a) {
    zD(e, t, n);
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
    var s = t.getDerivedStateFromProps;
    if (typeof s == "function" && (Nm(e, t, s, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (HD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var m = Xe;
      m |= Ri, (e.mode & Pa) !== xe && (m |= kr), e.flags |= m;
    }
  }
  function BD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, s = Xn;
    if (typeof o == "object" && o !== null)
      s = jt(o);
    else {
      var m = wl(e, t, !0);
      s = _l(e, m);
    }
    var h = t.getDerivedStateFromProps, S = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !S && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== s) && rb(e, r, n, s), by();
    var E = e.memoizedState, O = r.state = E;
    if (Nc(e, n, r, a), O = e.memoizedState, i === n && E === O && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var M = Xe;
        M |= Ri, (e.mode & Pa) !== xe && (M |= kr), e.flags |= M;
      }
      return !1;
    }
    typeof h == "function" && (Nm(e, t, h, n), O = e.memoizedState);
    var z = Ec() || tb(e, t, i, n, E, O, s);
    if (z) {
      if (!S && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ne = Xe;
        ne |= Ri, (e.mode & Pa) !== xe && (ne |= kr), e.flags |= ne;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ee = Xe;
        Ee |= Ri, (e.mode & Pa) !== xe && (Ee |= kr), e.flags |= Ee;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = s, z;
  }
  function PD(e, t, n, a, r) {
    var i = t.stateNode;
    yy(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : ja(t.type, l);
    i.props = o;
    var s = t.pendingProps, m = i.context, h = n.contextType, S = Xn;
    if (typeof h == "object" && h !== null)
      S = jt(h);
    else {
      var E = wl(t, n, !0);
      S = _l(t, E);
    }
    var O = n.getDerivedStateFromProps, M = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !M && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== s || m !== S) && rb(t, i, a, S), by();
    var z = t.memoizedState, ne = i.state = z;
    if (Nc(t, a, i, r), ne = t.memoizedState, l === s && z === ne && !tc() && !Ec() && !Ht)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= dl), !1;
    typeof O == "function" && (Nm(t, n, O, a), ne = t.memoizedState);
    var Ee = Ec() || tb(t, n, o, a, z, ne, S) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Ht;
    return Ee ? (!M && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ne, S), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ne, S)), typeof i.componentDidUpdate == "function" && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = ne), i.props = a, i.state = ne, i.context = S, Ee;
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
  function $D(e, t) {
    return !0;
  }
  function Rm(e, t) {
    try {
      var n = $D(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var o = r ? Ve(r) : null, s = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", m;
      if (e.tag === x)
        m = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Ve(e) || "Anonymous";
        m = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var S = s + `
` + l + `

` + ("" + m);
      console.error(S);
    } catch (E) {
      setTimeout(function() {
        throw E;
      });
    }
  }
  var YD = typeof WeakMap == "function" ? WeakMap : Map;
  function ib(e, t, n) {
    var a = Er(st, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      kj(r), Rm(e, t);
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
      hN(e), Rm(e, t), typeof r != "function" && Aj(this);
      var s = t.value, m = t.stack;
      this.componentDidCatch(s, {
        componentStack: m !== null ? m : ""
      }), typeof r != "function" && (Gn(e.lanes, _e) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ve(e) || "Unknown"));
    }), a;
  }
  function lb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new YD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Uj.bind(null, e, t, n);
      Ea && Yu(e, n), t.then(i, i);
    }
  }
  function ID(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function qD(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === xe && (n === D || n === $ || n === ce)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function ob(e) {
    var t = e;
    do {
      if (t.tag === B && DD(t))
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
            n.tag = ie;
          else {
            var l = Er(st, _e);
            l.tag = hc, Wr(n, l, _e);
          }
        }
        n.lanes = Ue(n.lanes, _e);
      }
      return e;
    }
    return e.flags |= jn, e.lanes = r, e;
  }
  function GD(e, t, n, a, r) {
    if (n.flags |= bs, Ea && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      qD(n), nn() && n.mode & Ye && Zg();
      var l = ob(t);
      if (l !== null) {
        l.flags &= ~cr, ub(l, t, n, e, r), l.mode & Ye && lb(e, i, r), ID(l, e, i);
        return;
      } else {
        if (!vx(r)) {
          lb(e, i, r), rv();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (nn() && n.mode & Ye) {
      Zg();
      var s = ob(t);
      if (s !== null) {
        (s.flags & jn) === Ce && (s.flags |= cr), ub(s, t, n, e, r), gp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), Dj(a);
    var m = t;
    do {
      switch (m.tag) {
        case x: {
          var h = a;
          m.flags |= jn;
          var S = Ao(r);
          m.lanes = Ue(m.lanes, S);
          var E = ib(m, h, S);
          Lp(m, E);
          return;
        }
        case T:
          var O = a, M = m.type, z = m.stateNode;
          if ((m.flags & Je) === Ce && (typeof M.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !oN(z))) {
            m.flags |= jn;
            var ne = Ao(r);
            m.lanes = Ue(m.lanes, ne);
            var Ee = Cm(m, O, ne);
            Lp(m, Ee);
            return;
          }
          break;
      }
      m = m.return;
    } while (m !== null);
  }
  function WD() {
    return null;
  }
  var ju = v.ReactCurrentOwner, wa = !1, Dm, wu, Tm, jm, wm, $i, _m, Ic, _u;
  Dm = {}, wu = {}, Tm = {}, jm = {}, wm = {}, $i = !1, _m = {}, Ic = {}, _u = {};
  function wn(e, t, n, a) {
    e === null ? t.child = fy(t, null, n, a) : t.child = Al(t, e.child, n, a);
  }
  function QD(e, t, n, a) {
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
    var l = n.render, o = t.ref, s, m;
    kl(t, r), jo(t);
    {
      if (ju.current = t, ra(!0), s = Pl(e, t, l, a, o, r), m = $l(), t.mode & St) {
        Gt(!0);
        try {
          s = Pl(e, t, l, a, o, r), m = $l();
        } finally {
          Gt(!1);
        }
      }
      ra(!1);
    }
    return vl(), e !== null && !wa ? (Cy(e, t, r), Sr(e, t, r)) : (nn() && m && fp(t), t.flags |= fl, wn(e, t, s, r), t.child);
  }
  function cb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (ew(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = ce, t.type = l, Mm(t, i), fb(e, t, l, a, r);
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
          var s = Ke(i) || "Unknown";
          _u[s] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", s), _u[s] = !0);
        }
      }
      var m = vv(n.type, null, a, t, t.mode, r);
      return m.ref = t.ref, m.return = t, t.child = m, m;
    }
    {
      var h = n.type, S = h.propTypes;
      S && xa(
        S,
        a,
        // Resolved props
        "prop",
        Ke(h)
      );
    }
    var E = e.child, O = zm(e, r);
    if (!O) {
      var M = E.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Qo, z(M, a) && e.ref === t.ref)
        return Sr(e, t, r);
    }
    t.flags |= fl;
    var ne = Wi(E, a);
    return ne.ref = t.ref, ne.return = t, t.child = ne, ne;
  }
  function fb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Se) {
        var l = i, o = l._payload, s = l._init;
        try {
          i = s(o);
        } catch {
          i = null;
        }
        var m = i && i.propTypes;
        m && xa(
          m,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Ke(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Qo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (wa = !1, t.pendingProps = a = h, zm(e, r))
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
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (Gn(n, qn)) {
        var S = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = S;
        var E = i !== null ? i.baseLanes : n;
        rf(t, E);
      } else {
        var o = null, s;
        if (i !== null) {
          var m = i.baseLanes;
          s = Ue(m, n);
        } else
          s = n;
        t.lanes = t.childLanes = qn;
        var h = {
          baseLanes: s,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = h, t.updateQueue = null, rf(t, s), null;
      }
    else {
      var O;
      i !== null ? (O = Ue(i.baseLanes, n), t.memoizedState = null) : O = n, rf(t, O);
    }
    return wn(e, t, r, n), t.child;
  }
  function KD(e, t, n) {
    var a = t.pendingProps;
    return wn(e, t, a, n), t.child;
  }
  function XD(e, t, n) {
    var a = t.pendingProps.children;
    return wn(e, t, a, n), t.child;
  }
  function JD(e, t, n) {
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
    var s, m;
    kl(t, r), jo(t);
    {
      if (ju.current = t, ra(!0), s = Pl(e, t, n, a, l, r), m = $l(), t.mode & St) {
        Gt(!0);
        try {
          s = Pl(e, t, n, a, l, r), m = $l();
        } finally {
          Gt(!1);
        }
      }
      ra(!1);
    }
    return vl(), e !== null && !wa ? (Cy(e, t, r), Sr(e, t, r)) : (nn() && m && fp(t), t.flags |= fl, wn(e, t, s, r), t.child);
  }
  function mb(e, t, n, a, r) {
    {
      switch (vw(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), s = o.state;
          i.updater.enqueueSetState(i, s, null);
          break;
        }
        case !0: {
          t.flags |= Je, t.flags |= jn;
          var m = new Error("Simulated error coming from DevTools"), h = Ao(r);
          t.lanes = Ue(t.lanes, h);
          var S = Cm(t, Pi(m, t), h);
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
    var M = t.stateNode, z;
    M === null ? (Gc(e, t), ab(t, n, a), Sm(t, n, a, r), z = !0) : e === null ? z = BD(t, n, a, r) : z = PD(e, t, n, a, r);
    var ne = Lm(e, t, n, z, O, r);
    {
      var Ee = t.stateNode;
      z && Ee.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ve(t) || "a component"), $i = !0);
    }
    return ne;
  }
  function Lm(e, t, n, a, r, i) {
    pb(e, t);
    var l = (t.flags & Je) !== Ce;
    if (!a && !l)
      return r && Qg(t, n, !1), Sr(e, t, i);
    var o = t.stateNode;
    ju.current = t;
    var s;
    if (l && typeof n.getDerivedStateFromError != "function")
      s = null, Jy();
    else {
      jo(t);
      {
        if (ra(!0), s = o.render(), t.mode & St) {
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
    return t.flags |= fl, e !== null && l ? QD(e, t, s, i) : wn(e, t, s, i), t.memoizedState = o.state, r && Qg(t, n, !0), t.child;
  }
  function vb(e) {
    var t = e.stateNode;
    t.pendingContext ? Gg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gg(e, t.context, !1), Mp(e, t.containerInfo);
  }
  function ZD(e, t, n) {
    if (vb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    yy(e, t), Nc(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var o = l.element;
    if (r.isDehydrated) {
      var s = {
        element: o,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, m = t.updateQueue;
      if (m.baseState = s, t.memoizedState = s, t.flags & cr) {
        var h = Pi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return hb(e, t, o, n, h);
      } else if (o !== i) {
        var S = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return hb(e, t, o, n, S);
      } else {
        nD(t);
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
  function eT(e, t, n) {
    Sy(t), e === null && hp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Xd(a, r);
    return o ? l = null : i !== null && Xd(a, i) && (t.flags |= Do), pb(e, t), wn(e, t, l, n), t.child;
  }
  function tT(e, t) {
    return e === null && hp(t), null;
  }
  function nT(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, s = o(l);
    t.type = s;
    var m = t.tag = tw(s), h = ja(s, r), S;
    switch (m) {
      case D:
        return Mm(t, s), t.type = s = Xl(s), S = Om(null, t, s, h, a), S;
      case T:
        return t.type = s = sv(s), S = mb(null, t, s, h, a), S;
      case $:
        return t.type = s = cv(s), S = sb(null, t, s, h, a), S;
      case ge: {
        if (t.type !== t.elementType) {
          var E = s.propTypes;
          E && xa(
            E,
            h,
            // Resolved for outer only
            "prop",
            Ke(s)
          );
        }
        return S = cb(
          null,
          t,
          s,
          ja(s.type, h),
          // The inner type can have defaults too
          a
        ), S;
      }
    }
    var O = "";
    throw s !== null && typeof s == "object" && s.$$typeof === Se && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + s + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function aT(e, t, n, a, r) {
    Gc(e, t), t.tag = T;
    var i;
    return Ia(n) ? (i = !0, ac(t)) : i = !1, kl(t, r), ab(t, n, a), Sm(t, n, a, r), Lm(null, t, n, !0, i, r);
  }
  function rT(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i;
    {
      var l = wl(t, n, !1);
      i = _l(t, l);
    }
    kl(t, a);
    var o, s;
    jo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var m = Ke(n) || "Unknown";
        Dm[m] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", m, m), Dm[m] = !0);
      }
      t.mode & St && Ca.recordLegacyContextWarning(t, null), ra(!0), ju.current = t, o = Pl(null, t, n, r, i, a), s = $l(), ra(!1);
    }
    if (vl(), t.flags |= fl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var h = Ke(n) || "Unknown";
      wu[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), wu[h] = !0);
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
        Gt(!0);
        try {
          o = Pl(null, t, n, r, i, a), s = $l();
        } finally {
          Gt(!1);
        }
      }
      return nn() && s && fp(t), wn(null, t, o, a), Mm(t, n), t.child;
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
        var s = Ke(t) || "Unknown";
        Tm[s] || (f("%s: Function components do not support contextType.", s), Tm[s] = !0);
      }
    }
  }
  var Am = {
    dehydrated: null,
    treeContext: null,
    retryLane: Wt
  };
  function Vm(e) {
    return {
      baseLanes: e,
      cachePool: WD(),
      transitions: null
    };
  }
  function iT(e, t) {
    var n = null;
    return {
      baseLanes: Ue(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function lT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return kp(e, bu);
  }
  function oT(e, t) {
    return Ds(e.childLanes, t);
  }
  function gb(e, t, n) {
    var a = t.pendingProps;
    hw(t) && (t.flags |= Je);
    var r = Da.current, i = !1, l = (t.flags & Je) !== Ce;
    if (l || lT(r, e) ? (i = !0, t.flags &= ~Je) : (e === null || e.memoizedState !== null) && (r = CD(r, Ry)), r = Fl(r), Kr(t, r), e === null) {
      hp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var s = o.dehydrated;
        if (s !== null)
          return dT(t, s);
      }
      var m = a.children, h = a.fallback;
      if (i) {
        var S = uT(t, m, h, n), E = t.child;
        return E.memoizedState = Vm(n), t.memoizedState = Am, S;
      } else
        return km(t, m);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var M = O.dehydrated;
        if (M !== null)
          return pT(e, t, l, a, M, O, n);
      }
      if (i) {
        var z = a.fallback, ne = a.children, Ee = cT(e, t, ne, z, n), me = t.child, qe = e.child.memoizedState;
        return me.memoizedState = qe === null ? Vm(n) : iT(qe, n), me.childLanes = oT(e, n), t.memoizedState = Am, Ee;
      } else {
        var Be = a.children, j = sT(e, t, Be, n);
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
  function uT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, s;
    return (r & Ye) === xe && i !== null ? (o = i, o.childLanes = Y, o.pendingProps = l, e.mode & nt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), s = ri(n, r, a, null)) : (o = Um(l, r), s = ri(n, r, a, null)), o.return = e, s.return = e, o.sibling = s, e.child = o, s;
  }
  function Um(e, t, n) {
    return yN(e, t, Y, null);
  }
  function yb(e, t) {
    return Wi(e, t);
  }
  function sT(e, t, n, a) {
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
  function cT(e, t, n, a, r) {
    var i = t.mode, l = e.child, o = l.sibling, s = {
      mode: "hidden",
      children: n
    }, m;
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
      var h = t.child;
      m = h, m.childLanes = Y, m.pendingProps = s, t.mode & nt && (m.actualDuration = 0, m.actualStartTime = -1, m.selfBaseDuration = l.selfBaseDuration, m.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      m = yb(l, s), m.subtreeFlags = l.subtreeFlags & dr;
    var S;
    return o !== null ? S = Wi(o, a) : (S = ri(a, i, r, null), S.flags |= Tt), S.return = t, m.return = t, m.sibling = S, t.child = m, S;
  }
  function qc(e, t, n, a) {
    a !== null && gp(a), Al(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = km(t, i);
    return l.flags |= Tt, t.memoizedState = null, l;
  }
  function fT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Um(l, i), s = ri(a, i, r, null);
    return s.flags |= Tt, o.return = t, s.return = t, o.sibling = s, t.child = o, (t.mode & Ye) !== xe && Al(t, e.child, null, r), s;
  }
  function dT(e, t, n) {
    return (e.mode & Ye) === xe ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = _e) : tp(t) ? e.lanes = Ti : e.lanes = qn, null;
  }
  function pT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var j = xm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Je, null;
        var H = a.children, w = a.fallback, W = fT(e, t, H, w, l), se = t.child;
        return se.memoizedState = Vm(l), t.memoizedState = Am, W;
      }
    else {
      if (eD(), (t.mode & Ye) === xe)
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
        var o, s, m;
        {
          var h = g0(r);
          o = h.digest, s = h.message, m = h.stack;
        }
        var S;
        s ? S = new Error(s) : S = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var E = xm(S, o, m);
        return qc(e, t, l, E);
      }
      var O = Gn(l, e.childLanes);
      if (wa || O) {
        var M = af();
        if (M !== null) {
          var z = xx(M, l);
          if (z !== Wt && z !== i.retryLane) {
            i.retryLane = z;
            var ne = st;
            zn(e, z), zt(M, e, z, ne);
          }
        }
        rv();
        var Ee = xm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, Ee);
      } else if (Bg(r)) {
        t.flags |= Je, t.child = e.child;
        var me = Fj.bind(null, e);
        return y0(r, me), null;
      } else {
        aD(t, r, i.treeContext);
        var qe = a.children, Be = km(t, qe);
        return Be.flags |= fr, Be;
      }
    }
  }
  function bb(e, t, n) {
    e.lanes = Ue(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ue(a.lanes, t)), Tp(e.return, t, n);
  }
  function mT(e, t, n) {
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
  function vT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Rc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function hT(e) {
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
  function gT(e, t) {
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
  function yT(e, t) {
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
    hT(r), gT(i, r), yT(l, r), wn(e, t, l, n);
    var o = Da.current, s = kp(o, bu);
    if (s)
      o = Up(o, bu), t.flags |= Je;
    else {
      var m = e !== null && (e.flags & Je) !== Ce;
      m && mT(t, t.child, n), o = Fl(o);
    }
    if (Kr(t, o), (t.mode & Ye) === xe)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = vT(t.child), S;
          h === null ? (S = t.child, t.child = null) : (S = h.sibling, h.sibling = null), Fm(
            t,
            !1,
            // isBackwards
            S,
            h,
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
            var z = O.sibling;
            O.sibling = E, E = O, O = z;
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
  function bT(e, t, n) {
    Mp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Al(t, null, a, n) : wn(e, t, a, n), t.child;
  }
  var Sb = !1;
  function NT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || Sb || (Sb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var s = t.type.propTypes;
      s && xa(s, i, "prop", "Context.Provider");
    }
    if (my(t, r, o), l !== null) {
      var m = l.value;
      if (Kn(m, o)) {
        if (l.children === i.children && !tc())
          return Sr(e, t, n);
      } else
        hD(t, r, n);
    }
    var h = i.children;
    return wn(e, t, h, n), t.child;
  }
  var xb = !1;
  function ET(e, t, n) {
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
    return e !== null && (t.dependencies = e.dependencies), Jy(), $u(t.lanes), Gn(n, t.childLanes) ? (mD(e, t), t.child) : null;
  }
  function ST(e, t, n) {
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
  function zm(e, t) {
    var n = e.lanes;
    return !!Gn(n, t);
  }
  function xT(e, t, n) {
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
      case I: {
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
        var s = t.memoizedState;
        if (s !== null) {
          if (s.dehydrated !== null)
            return Kr(t, Fl(Da.current)), t.flags |= Je, null;
          var m = t.child, h = m.childLanes;
          if (Gn(n, h))
            return gb(e, t, n);
          Kr(t, Fl(Da.current));
          var S = Sr(e, t, n);
          return S !== null ? S.sibling : null;
        } else
          Kr(t, Fl(Da.current));
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
      case oe:
      case Te:
        return t.lanes = Y, db(e, t, n);
    }
    return Sr(e, t, n);
  }
  function Rb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return ST(e, t, vv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        wa = !0;
      else {
        var i = zm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Je) === Ce)
          return wa = !1, xT(e, t, n);
        (e.flags & Yf) !== Ce ? wa = !0 : wa = !1;
      }
    } else if (wa = !1, nn() && W0(t)) {
      var l = t.index, o = Q0();
      Jg(t, o, l);
    }
    switch (t.lanes = Y, t.tag) {
      case _:
        return rT(e, t, t.type, n);
      case X: {
        var s = t.elementType;
        return nT(e, t, s, n);
      }
      case D: {
        var m = t.type, h = t.pendingProps, S = t.elementType === m ? h : ja(m, h);
        return Om(e, t, m, S, n);
      }
      case T: {
        var E = t.type, O = t.pendingProps, M = t.elementType === E ? O : ja(E, O);
        return mb(e, t, E, M, n);
      }
      case x:
        return ZD(e, t, n);
      case V:
        return eT(e, t, n);
      case Q:
        return tT(e, t);
      case B:
        return gb(e, t, n);
      case A:
        return bT(e, t, n);
      case $: {
        var z = t.type, ne = t.pendingProps, Ee = t.elementType === z ? ne : ja(z, ne);
        return sb(e, t, z, Ee, n);
      }
      case pe:
        return KD(e, t, n);
      case ae:
        return XD(e, t, n);
      case G:
        return JD(e, t, n);
      case I:
        return NT(e, t, n);
      case he:
        return ET(e, t, n);
      case ge: {
        var me = t.type, qe = t.pendingProps, Be = ja(me, qe);
        if (t.type !== t.elementType) {
          var j = me.propTypes;
          j && xa(
            j,
            Be,
            // Resolved for outer only
            "prop",
            Ke(me)
          );
        }
        return Be = ja(me.type, Be), cb(e, t, me, Be, n);
      }
      case ce:
        return fb(e, t, t.type, t.pendingProps, n);
      case ie: {
        var H = t.type, w = t.pendingProps, W = t.elementType === H ? w : ja(H, w);
        return aT(e, t, H, W, n);
      }
      case U:
        return Eb(e, t, n);
      case ve:
        break;
      case oe:
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
      if (r.tag === V || r.tag === Q)
        IC(e, r.stateNode);
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
      var l = t.stateNode, o = Ap(), s = GC(l, n, i, a, r, o);
      t.updateQueue = s, s && Yl(t);
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = Y, a = Ce;
    if (t) {
      if ((e.mode & nt) !== xe) {
        for (var s = e.selfBaseDuration, m = e.child; m !== null; )
          n = Ue(n, Ue(m.lanes, m.childLanes)), a |= m.subtreeFlags & dr, a |= m.flags & dr, s += m.treeBaseDuration, m = m.sibling;
        e.treeBaseDuration = s;
      } else
        for (var h = e.child; h !== null; )
          n = Ue(n, Ue(h.lanes, h.childLanes)), a |= h.subtreeFlags & dr, a |= h.flags & dr, h.return = e, h = h.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & nt) !== xe) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Ue(n, Ue(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = Ue(n, Ue(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function RT(e, t, n) {
    if (uD() && (t.mode & Ye) !== xe && (t.flags & Je) === Ce)
      return iy(t), Ml(), t.flags |= cr | bs | jn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (lD(t), rn(t), (t.mode & nt) !== xe) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ml(), (t.flags & Je) === Ce && (t.memoizedState = null), t.flags |= Xe, rn(t), (t.mode & nt) !== xe) {
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
      case X:
      case ce:
      case D:
      case $:
      case pe:
      case ae:
      case G:
      case he:
      case ge:
        return rn(t), null;
      case T: {
        var r = t.type;
        return Ia(r) && nc(t), rn(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (Ul(t), up(t), zp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
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
        return Hm(e, t), rn(t), null;
      }
      case V: {
        Vp(t);
        var s = Ey(), m = t.type;
        if (e !== null && t.stateNode != null)
          Tb(e, t, m, a, s), e.ref !== t.ref && Cb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return rn(t), null;
          }
          var h = Ap(), S = uc(t);
          if (S)
            rD(t, s, h) && Yl(t);
          else {
            var E = YC(m, a, s, h, t);
            Db(E, t, !1, !1), t.stateNode = E, qC(E, m, a, s) && Yl(t);
          }
          t.ref !== null && Cb(t);
        }
        return rn(t), null;
      }
      case Q: {
        var O = a;
        if (e && t.stateNode != null) {
          var M = e.memoizedProps;
          jb(e, t, M, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = Ey(), ne = Ap(), Ee = uc(t);
          Ee ? iD(t) && Yl(t) : t.stateNode = WC(O, z, ne, t);
        }
        return rn(t), null;
      }
      case B: {
        zl(t);
        var me = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = RT(e, t, me);
          if (!qe)
            return t.flags & jn ? t : null;
        }
        if ((t.flags & Je) !== Ce)
          return t.lanes = n, (t.mode & nt) !== xe && cm(t), t;
        var Be = me !== null, j = e !== null && e.memoizedState !== null;
        if (Be !== j && Be) {
          var H = t.child;
          if (H.flags |= xi, (t.mode & Ye) !== xe) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(Da.current, Ry) ? Cj() : rv();
          }
        }
        var W = t.updateQueue;
        if (W !== null && (t.flags |= Xe), rn(t), (t.mode & nt) !== xe && Be) {
          var se = t.child;
          se !== null && (t.treeBaseDuration -= se.treeBaseDuration);
        }
        return null;
      }
      case A:
        return Ul(t), Hm(e, t), e === null && B0(t.stateNode.containerInfo), rn(t), null;
      case I:
        var re = t.type._context;
        return Dp(re, t), rn(t), null;
      case ie: {
        var De = t.type;
        return Ia(De) && nc(t), rn(t), null;
      }
      case U: {
        zl(t);
        var Ae = t.memoizedState;
        if (Ae === null)
          return rn(t), null;
        var rt = (t.flags & Je) !== Ce, We = Ae.rendering;
        if (We === null)
          if (rt)
            Lu(Ae, !1);
          else {
            var Rt = Tj() && (e === null || (e.flags & Je) === Ce);
            if (!Rt)
              for (var Qe = t.child; Qe !== null; ) {
                var xt = Rc(Qe);
                if (xt !== null) {
                  rt = !0, t.flags |= Je, Lu(Ae, !1);
                  var yn = xt.updateQueue;
                  return yn !== null && (t.updateQueue = yn, t.flags |= Xe), t.subtreeFlags = Ce, vD(t, n), Kr(t, Up(Da.current, bu)), t.child;
                }
                Qe = Qe.sibling;
              }
            Ae.tail !== null && qt() > Kb() && (t.flags |= Je, rt = !0, Lu(Ae, !1), t.lanes = jh);
          }
        else {
          if (!rt) {
            var cn = Rc(We);
            if (cn !== null) {
              t.flags |= Je, rt = !0;
              var Zn = cn.updateQueue;
              if (Zn !== null && (t.updateQueue = Zn, t.flags |= Xe), Lu(Ae, !0), Ae.tail === null && Ae.tailMode === "hidden" && !We.alternate && !nn())
                return rn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Ae.renderingStartTime > Kb() && n !== qn && (t.flags |= Je, rt = !0, Lu(Ae, !1), t.lanes = jh);
          }
          if (Ae.isBackwards)
            We.sibling = t.child, t.child = We;
          else {
            var Ln = Ae.last;
            Ln !== null ? Ln.sibling = We : t.child = We, Ae.last = We;
          }
        }
        if (Ae.tail !== null) {
          var Mn = Ae.tail;
          Ae.rendering = Mn, Ae.tail = Mn.sibling, Ae.renderingStartTime = qt(), Mn.sibling = null;
          var bn = Da.current;
          return rt ? bn = Up(bn, bu) : bn = Fl(bn), Kr(t, bn), Mn;
        }
        return rn(t), null;
      }
      case ve:
        break;
      case oe:
      case Te: {
        av(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, Za = Wu !== null;
          Za !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Nn && (t.flags |= xi);
        }
        return !Jl || (t.mode & Ye) === xe ? rn(t) : Gn(Ja, qn) && (rn(t), t.subtreeFlags & (Tt | Xe) && (t.flags |= xi)), null;
      }
      case je:
        return null;
      case Le:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function CT(e, t, n) {
    switch (dp(t), t.tag) {
      case T: {
        var a = t.type;
        Ia(a) && nc(t);
        var r = t.flags;
        return r & jn ? (t.flags = r & ~jn | Je, (t.mode & nt) !== xe && cm(t), t) : null;
      }
      case x: {
        t.stateNode, Ul(t), up(t), zp();
        var i = t.flags;
        return (i & jn) !== Ce && (i & Je) === Ce ? (t.flags = i & ~jn | Je, t) : null;
      }
      case V:
        return Vp(t), null;
      case B: {
        zl(t);
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
        return zl(t), null;
      case A:
        return Ul(t), null;
      case I:
        var s = t.type._context;
        return Dp(s, t), null;
      case oe:
      case Te:
        return av(t), null;
      case je:
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
        t.stateNode, Ul(t), up(t), zp();
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
        zl(t);
        break;
      case U:
        zl(t);
        break;
      case I:
        var r = t.type._context;
        Dp(r, t);
        break;
      case oe:
      case Te:
        av(t);
        break;
    }
  }
  var Ob = null;
  Ob = /* @__PURE__ */ new Set();
  var Wc = !1, ln = !1, DT = typeof WeakSet == "function" ? WeakSet : Set, fe = null, Il = null, ql = null;
  function TT(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var jT = function(e, t) {
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
      jT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function wT(e, t, n) {
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
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
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
  function _T(e, t) {
    PC(e.containerInfo), fe = t, OT();
    var n = Ab;
    return Ab = !1, n;
  }
  function OT() {
    for (; fe !== null; ) {
      var e = fe, t = e.child;
      (e.subtreeFlags & Wf) !== Ce && t !== null ? (t.return = e, fe = t) : LT();
    }
  }
  function LT() {
    for (; fe !== null; ) {
      var e = fe;
      mt(e);
      try {
        MT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      It();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, fe = t;
        return;
      }
      fe = e.return;
    }
  }
  function MT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & dl) !== Ce) {
      switch (mt(e), e.tag) {
        case D:
        case $:
        case ce:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !$i && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : ja(e.type, a), r);
            {
              var o = Ob;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ve(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case x: {
          {
            var s = e.stateNode;
            p0(s.containerInfo);
          }
          break;
        }
        case V:
        case Q:
        case A:
        case ie:
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
          l.destroy = void 0, o !== void 0 && ((e & an) !== Hn ? WS(t) : (e & Mt) !== Hn && xh(t), (e & qa) !== Hn && Iu(!0), Qc(t, n, o), (e & qa) !== Hn && Iu(!1), (e & an) !== Hn ? QS() : (e & Mt) !== Hn && Rh());
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
          (e & an) !== Hn ? qS(t) : (e & Mt) !== Hn && KS(t);
          var l = i.create;
          (e & qa) !== Hn && Iu(!0), i.destroy = l(), (e & qa) !== Hn && Iu(!1), (e & an) !== Hn ? GS() : (e & Mt) !== Hn && XS();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var s = void 0;
              (i.tag & Mt) !== Ce ? s = "useLayoutEffect" : (i.tag & qa) !== Ce ? s = "useInsertionEffect" : s = "useEffect";
              var m = void 0;
              o === null ? m = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof o.then == "function" ? m = `

It looks like you wrote ` + s + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + s + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : m = " You returned: " + o, f("%s must not return anything besides a function, which is used for clean-up.%s", s, m);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function AT(e, t) {
    if ((t.flags & Xe) !== Ce)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Ky(), o = t.alternate === null ? "mount" : "update";
          Qy() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var s = t.return;
          e: for (; s !== null; ) {
            switch (s.tag) {
              case x:
                var m = s.stateNode;
                m.passiveEffectDuration += n;
                break e;
              case G:
                var h = s.stateNode;
                h.passiveEffectDuration += n;
                break e;
            }
            s = s.return;
          }
          break;
        }
      }
  }
  function VT(e, t, n, a) {
    if ((n.flags & To) !== Ce)
      switch (n.tag) {
        case D:
        case $:
        case ce: {
          if (!ln)
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
          if (n.flags & Xe && !ln)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), n.mode & nt)
                try {
                  Ka(), r.componentDidMount();
                } finally {
                  Qa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : ja(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), n.mode & nt)
                try {
                  Ka(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Qa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), Ny(n, o, r));
          break;
        }
        case x: {
          var s = n.updateQueue;
          if (s !== null) {
            var m = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case V:
                  m = n.child.stateNode;
                  break;
                case T:
                  m = n.child.stateNode;
                  break;
              }
            Ny(n, s, m);
          }
          break;
        }
        case V: {
          var h = n.stateNode;
          if (t === null && n.flags & Xe) {
            var S = n.type, E = n.memoizedProps;
            ZC(h, S, E);
          }
          break;
        }
        case Q:
          break;
        case A:
          break;
        case G: {
          {
            var O = n.memoizedProps, M = O.onCommit, z = O.onRender, ne = n.stateNode.effectDuration, Ee = Ky(), me = t === null ? "mount" : "update";
            Qy() && (me = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, me, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof M == "function" && M(n.memoizedProps.id, me, ne, Ee), Lj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case x:
                    var Be = qe.stateNode;
                    Be.effectDuration += ne;
                    break e;
                  case G:
                    var j = qe.stateNode;
                    j.effectDuration += ne;
                    break e;
                }
                qe = qe.return;
              }
            }
          }
          break;
        }
        case B: {
          $T(e, n);
          break;
        }
        case U:
        case ie:
        case ve:
        case oe:
        case Te:
        case Le:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    ln || n.flags & Si && Vb(n);
  }
  function kT(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
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
        typeof t.componentDidMount == "function" && wT(e, e.return, t), Mb(e, e.return);
        break;
      }
      case V: {
        Mb(e, e.return);
        break;
      }
    }
  }
  function UT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === V) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? s0(r) : f0(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === Q) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? c0(i) : d0(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === oe || a.tag === Te) && a.memoizedState !== null && a !== e)) {
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
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ve(e)), t.current = a;
    }
  }
  function FT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function kb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, kb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === V) {
        var n = e.stateNode;
        n !== null && Y0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function zT(e) {
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
  function Fb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ub(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== V && t.tag !== Q && t.tag !== J; ) {
        if (t.flags & Tt || t.child === null || t.tag === A)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Tt))
        return t.stateNode;
    }
  }
  function HT(e) {
    var t = zT(e);
    switch (t.tag) {
      case V: {
        var n = t.stateNode;
        t.flags & Do && (Hg(n), t.flags &= ~Do);
        var a = Fb(e);
        $m(e, a, n);
        break;
      }
      case x:
      case A: {
        var r = t.stateNode.containerInfo, i = Fb(e);
        Pm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Pm(e, t, n) {
    var a = e.tag, r = a === V || a === Q;
    if (r) {
      var i = e.stateNode;
      t ? i0(n, i, t) : a0(n, i);
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
    var a = e.tag, r = a === V || a === Q;
    if (r) {
      var i = e.stateNode;
      t ? r0(n, i, t) : n0(n, i);
    } else if (a !== A) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var o = l.sibling; o !== null; )
          $m(o, t, n), o = o.sibling;
      }
    }
  }
  var on = null, Oa = !1;
  function BT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case V: {
            on = a.stateNode, Oa = !1;
            break e;
          }
          case x: {
            on = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
          case A: {
            on = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (on === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      zb(e, t, n), on = null, Oa = !1;
    }
    FT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      zb(e, t, a), a = a.sibling;
  }
  function zb(e, t, n) {
    switch (PS(n), n.tag) {
      case V:
        ln || Gl(n, t);
      case Q: {
        {
          var a = on, r = Oa;
          on = null, ei(e, t, n), on = a, Oa = r, on !== null && (Oa ? o0(on, n.stateNode) : l0(on, n.stateNode));
        }
        return;
      }
      case J: {
        on !== null && (Oa ? u0(on, n.stateNode) : ep(on, n.stateNode));
        return;
      }
      case A: {
        {
          var i = on, l = Oa;
          on = n.stateNode.containerInfo, Oa = !0, ei(e, t, n), on = i, Oa = l;
        }
        return;
      }
      case D:
      case $:
      case ge:
      case ce: {
        if (!ln) {
          var o = n.updateQueue;
          if (o !== null) {
            var s = o.lastEffect;
            if (s !== null) {
              var m = s.next, h = m;
              do {
                var S = h, E = S.destroy, O = S.tag;
                E !== void 0 && ((O & qa) !== Hn ? Qc(n, t, E) : (O & Mt) !== Hn && (xh(n), n.mode & nt ? (Ka(), Qc(n, t, E), Qa(n)) : Qc(n, t, E), Rh())), h = h.next;
              } while (h !== m);
            }
          }
        }
        ei(e, t, n);
        return;
      }
      case T: {
        if (!ln) {
          Gl(n, t);
          var M = n.stateNode;
          typeof M.componentWillUnmount == "function" && Bm(n, t, M);
        }
        ei(e, t, n);
        return;
      }
      case ve: {
        ei(e, t, n);
        return;
      }
      case oe: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ye
        ) {
          var z = ln;
          ln = z || n.memoizedState !== null, ei(e, t, n), ln = z;
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
  function PT(e) {
    e.memoizedState;
  }
  function $T(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && T0(i);
        }
      }
    }
  }
  function Hb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new DT()), t.forEach(function(a) {
        var r = zj.bind(null, e, a);
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
  function YT(e, t, n) {
    Il = n, ql = e, mt(t), Bb(t, e), mt(t), Il = null, ql = null;
  }
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          BT(e, t, i);
        } catch (s) {
          lt(i, t, s);
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
      case $:
      case ge:
      case ce: {
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
              var o = e.memoizedProps, s = a !== null ? a.memoizedProps : o, m = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  e0(l, h, m, s, o, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case Q: {
        if (La(t, e), Xa(e), r & Xe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var S = e.stateNode, E = e.memoizedProps, O = a !== null ? a.memoizedProps : E;
          try {
            t0(S, O, E);
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
              D0(t.containerInfo);
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
        var z = e.child;
        if (z.flags & xi) {
          var ne = z.stateNode, Ee = z.memoizedState, me = Ee !== null;
          if (ne.isHidden = me, me) {
            var qe = z.alternate !== null && z.alternate.memoizedState !== null;
            qe || Rj();
          }
        }
        if (r & Xe) {
          try {
            PT(e);
          } catch (De) {
            lt(e, e.return, De);
          }
          Hb(e);
        }
        return;
      }
      case oe: {
        var Be = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ye
        ) {
          var j = ln;
          ln = j || Be, La(t, e), ln = j;
        } else
          La(t, e);
        if (Xa(e), r & xi) {
          var H = e.stateNode, w = e.memoizedState, W = w !== null, se = e;
          if (H.isHidden = W, W && !Be && (se.mode & Ye) !== xe) {
            fe = se;
            for (var re = se.child; re !== null; )
              fe = re, qT(re), re = re.sibling;
          }
          UT(se, W);
        }
        return;
      }
      case U: {
        La(t, e), Xa(e), r & Xe && Hb(e);
        return;
      }
      case ve:
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
        HT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~Tt;
    }
    t & fr && (e.flags &= ~fr);
  }
  function IT(e, t, n) {
    Il = n, ql = t, fe = e, Pb(e, t, n), Il = null, ql = null;
  }
  function Pb(e, t, n) {
    for (var a = (e.mode & Ye) !== xe; fe !== null; ) {
      var r = fe, i = r.child;
      if (r.tag === oe && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var s = r.alternate, m = s !== null && s.memoizedState !== null, h = m || ln, S = Wc, E = ln;
          Wc = o, ln = h, ln && !E && (fe = r, GT(r));
          for (var O = i; O !== null; )
            fe = O, Pb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          fe = r, Wc = S, ln = E, Ym(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ce && i !== null ? (i.return = r, fe = i) : Ym(e, t, n);
    }
  }
  function Ym(e, t, n) {
    for (; fe !== null; ) {
      var a = fe;
      if ((a.flags & To) !== Ce) {
        var r = a.alternate;
        mt(a);
        try {
          VT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
        }
        It();
      }
      if (a === e) {
        fe = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, fe = i;
        return;
      }
      fe = a.return;
    }
  }
  function qT(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.child;
      switch (t.tag) {
        case D:
        case $:
        case ge:
        case ce: {
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
        case oe: {
          var r = t.memoizedState !== null;
          if (r) {
            $b(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, fe = n) : $b(e);
    }
  }
  function $b(e) {
    for (; fe !== null; ) {
      var t = fe;
      if (t === e) {
        fe = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, fe = n;
        return;
      }
      fe = t.return;
    }
  }
  function GT(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.child;
      if (t.tag === oe) {
        var a = t.memoizedState !== null;
        if (a) {
          Yb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, fe = n) : Yb(e);
    }
  }
  function Yb(e) {
    for (; fe !== null; ) {
      var t = fe;
      mt(t);
      try {
        kT(t);
      } catch (a) {
        lt(t, t.return, a);
      }
      if (It(), t === e) {
        fe = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, fe = n;
        return;
      }
      fe = t.return;
    }
  }
  function WT(e, t, n, a) {
    fe = t, QT(t, e, n, a);
  }
  function QT(e, t, n, a) {
    for (; fe !== null; ) {
      var r = fe, i = r.child;
      (r.subtreeFlags & pl) !== Ce && i !== null ? (i.return = r, fe = i) : KT(e, t, n, a);
    }
  }
  function KT(e, t, n, a) {
    for (; fe !== null; ) {
      var r = fe;
      if ((r.flags & Vr) !== Ce) {
        mt(r);
        try {
          XT(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
        }
        It();
      }
      if (r === e) {
        fe = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, fe = i;
        return;
      }
      fe = r.return;
    }
  }
  function XT(e, t, n, a) {
    switch (t.tag) {
      case D:
      case $:
      case ce: {
        if (t.mode & nt) {
          sm();
          try {
            Zr(an | Lt, t);
          } finally {
            um(t);
          }
        } else
          Zr(an | Lt, t);
        break;
      }
    }
  }
  function JT(e) {
    fe = e, ZT();
  }
  function ZT() {
    for (; fe !== null; ) {
      var e = fe, t = e.child;
      if ((fe.flags & Ei) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            fe = r, nj(r, e);
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
          fe = e;
        }
      }
      (e.subtreeFlags & pl) !== Ce && t !== null ? (t.return = e, fe = t) : ej();
    }
  }
  function ej() {
    for (; fe !== null; ) {
      var e = fe;
      (e.flags & Vr) !== Ce && (mt(e), tj(e), It());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, fe = t;
        return;
      }
      fe = e.return;
    }
  }
  function tj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        e.mode & nt ? (sm(), _a(an | Lt, e, e.return), um(e)) : _a(an | Lt, e, e.return);
        break;
      }
    }
  }
  function nj(e, t) {
    for (; fe !== null; ) {
      var n = fe;
      mt(n), rj(n, t), It();
      var a = n.child;
      a !== null ? (a.return = n, fe = a) : aj(e);
    }
  }
  function aj(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.sibling, a = t.return;
      if (kb(t), t === e) {
        fe = null;
        return;
      }
      if (n !== null) {
        n.return = a, fe = n;
        return;
      }
      fe = a;
    }
  }
  function rj(e, t) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        e.mode & nt ? (sm(), _a(an, e, t), um(e)) : _a(an, e, t);
        break;
      }
    }
  }
  function ij(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
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
  function lj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        try {
          Zr(an | Lt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function oj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
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
  function uj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce:
        try {
          _a(an | Lt, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Mu = Symbol.for;
    Mu("selector.component"), Mu("selector.has_pseudo_class"), Mu("selector.role"), Mu("selector.test_id"), Mu("selector.text");
  }
  var sj = [];
  function cj() {
    sj.forEach(function(e) {
      return e();
    });
  }
  var fj = v.ReactCurrentActQueue;
  function dj(e) {
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
      return !e && fj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var pj = Math.ceil, Im = v.ReactCurrentDispatcher, qm = v.ReactCurrentOwner, un = v.ReactCurrentBatchConfig, Ma = v.ReactCurrentActQueue, kt = (
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
  ), xr = 0, Au = 1, Yi = 2, Kc = 3, Vu = 4, Gb = 5, Gm = 6, Ie = kt, _n = null, bt = null, Ut = Y, Ja = Y, Wm = Yr(Y), Ft = xr, ku = null, Xc = Y, Uu = Y, Jc = Y, Fu = null, Bn = null, Qm = 0, Wb = 500, Qb = 1 / 0, mj = 500, Rr = null;
  function zu() {
    Qb = qt() + mj;
  }
  function Kb() {
    return Qb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ti = null, Hu = Y, Xm = [], Jm = null, vj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, hj = 50, Ql = 0, tf = null, Pu = st, nf = Y, Xb = !1;
  function af() {
    return _n;
  }
  function On() {
    return (Ie & (sn | ca)) !== kt ? qt() : (Pu !== st || (Pu = qt()), Pu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Ye) === xe)
      return _e;
    if ((Ie & sn) !== kt && Ut !== Y)
      return Ao(Ut);
    var n = fD() !== cD;
    if (n) {
      if (un.transition !== null) {
        var a = un.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Wt && (nf = Lh()), nf;
    }
    var r = Sa();
    if (r !== Wt)
      return r;
    var i = QC();
    return i;
  }
  function gj(e) {
    var t = e.mode;
    return (t & Ye) === xe ? _e : bx();
  }
  function zt(e, t, n, a) {
    Bj(), Xb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Vo(e, n, a), (Ie & sn) !== Y && e === _n ? Yj(t) : (Ea && Vh(e, t, n), Ij(t), e === _n && ((Ie & sn) === kt && (Uu = Ue(Uu, n)), Ft === Vu && ai(e, Ut)), Pn(e, a), n === _e && Ie === kt && (t.mode & Ye) === xe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Ma.isBatchingLegacy && (zu(), Xg()));
  }
  function yj(e, t, n) {
    var a = e.current;
    a.lanes = t, Vo(e, t, n), Pn(e, n);
  }
  function bj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & sn) !== kt
    );
  }
  function Pn(e, t) {
    var n = e.callbackNode;
    px(e, t);
    var a = Rs(e, e === _n ? Ut : Y);
    if (a === Y) {
      n !== null && pN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Ma.current !== null && n !== ov)) {
      n == null && i !== _e && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && pN(n);
    var l;
    if (r === _e)
      e.tag === Ir ? (Ma.isBatchingLegacy !== null && (Ma.didScheduleLegacyUpdate = !0), G0(eN.bind(null, e))) : Kg(eN.bind(null, e)), Ma.current !== null ? Ma.current.push(qr) : XC(function() {
        (Ie & (sn | ca)) === kt && qr();
      }), l = null;
    else {
      var o;
      switch (Fh(a)) {
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
    if (UD(), Pu = st, nf = Y, (Ie & (sn | ca)) !== kt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === _n ? Ut : Y);
    if (r === Y)
      return null;
    var i = !Cs(e, r) && !yx(e, r) && !t, l = i ? wj(e, r) : lf(e, r);
    if (l !== xr) {
      if (l === Yi) {
        var o = bd(e);
        o !== Y && (r = o, l = tv(e, o));
      }
      if (l === Au) {
        var s = ku;
        throw qi(e, Y), ai(e, r), Pn(e, qt()), s;
      }
      if (l === Gm)
        ai(e, r);
      else {
        var m = !Cs(e, r), h = e.current.alternate;
        if (m && !Ej(h)) {
          if (l = lf(e, r), l === Yi) {
            var S = bd(e);
            S !== Y && (r = S, l = tv(e, S));
          }
          if (l === Au) {
            var E = ku;
            throw qi(e, Y), ai(e, r), Pn(e, qt()), E;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Nj(e, l, r);
      }
    }
    return Pn(e, qt()), e.callbackNode === n ? Jb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = Fu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= cr, H0(e.containerInfo);
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
  function Nj(e, t, n) {
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
          var a = Qm + Wb - qt();
          if (a > 10) {
            var r = Rs(e, Y);
            if (r !== Y)
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
        if (ai(e, n), gx(n))
          break;
        if (!mN()) {
          var l = fx(e, n), o = l, s = qt() - o, m = Hj(s) - s;
          if (m > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, Bn, Rr), m);
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
  function Ej(e) {
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
      var s = t.child;
      if (t.subtreeFlags & $f && s !== null) {
        s.return = t, t = s;
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
    t = Ds(t, Jc), t = Ds(t, Uu), Ex(e, t);
  }
  function eN(e) {
    if (FD(), (Ie & (sn | ca)) !== kt)
      throw new Error("Should not already be working.");
    Dr();
    var t = Rs(e, Y);
    if (!Gn(t, _e))
      return Pn(e, qt()), null;
    var n = lf(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = bd(e);
      a !== Y && (t = a, n = tv(e, a));
    }
    if (n === Au) {
      var r = ku;
      throw qi(e, Y), ai(e, t), Pn(e, qt()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, Bn, Rr), Pn(e, qt()), null;
  }
  function Sj(e, t) {
    t !== Y && (xd(e, Ue(t, _e)), Pn(e, qt()), (Ie & (sn | ca)) === kt && (zu(), qr()));
  }
  function nv(e, t) {
    var n = Ie;
    Ie |= qb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === kt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Ma.isBatchingLegacy && (zu(), Xg());
    }
  }
  function xj(e, t, n, a, r) {
    var i = Sa(), l = un.transition;
    try {
      return un.transition = null, Qt(Wn), e(t, n, a, r);
    } finally {
      Qt(i), un.transition = l, Ie === kt && zu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && (Ie & (sn | ca)) === kt && Dr();
    var t = Ie;
    Ie |= qb;
    var n = un.transition, a = Sa();
    try {
      return un.transition = null, Qt(Wn), e ? e() : void 0;
    } finally {
      Qt(a), un.transition = n, Ie = t, (Ie & (sn | ca)) === kt && qr();
    }
  }
  function tN() {
    return (Ie & (sn | ca)) !== kt;
  }
  function rf(e, t) {
    hn(Wm, Ja, e), Ja = Ue(Ja, t);
  }
  function av(e) {
    Ja = Wm.current, vn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = Y;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, KC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        _b(r, a), a = a.return;
      }
    _n = e;
    var i = Wi(e.current, null);
    return bt = i, Ut = Ja = t, Ft = xr, ku = null, Xc = Y, Uu = Y, Jc = Y, Fu = null, Bn = null, yD(), Ca.discardPendingWarnings(), i;
  }
  function nN(e, t) {
    do {
      var n = bt;
      try {
        if (mc(), Dy(), It(), qm.current = null, n === null || n.return === null) {
          Ft = Au, ku = t, bt = null;
          return;
        }
        if (En && n.mode & nt && $c(n, !0), pa)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            ZS(n, a, Ut);
          } else
            JS(n, t, Ut);
        GD(e, n.return, n, t, Ut), lN(n);
      } catch (r) {
        t = r, bt === n && n !== null ? (n = n.return, bt = n) : n = bt;
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
  function Rj() {
    Qm = qt();
  }
  function $u(e) {
    Xc = Ue(e, Xc);
  }
  function Cj() {
    Ft === xr && (Ft = Kc);
  }
  function rv() {
    (Ft === xr || Ft === Kc || Ft === Yi) && (Ft = Vu), _n !== null && (Nd(Xc) || Nd(Uu)) && ai(_n, Ut);
  }
  function Dj(e) {
    Ft !== Vu && (Ft = Yi), Fu === null ? Fu = [e] : Fu.push(e);
  }
  function Tj() {
    return Ft === xr;
  }
  function lf(e, t) {
    var n = Ie;
    Ie |= sn;
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
        jj();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    if (mc(), Ie = n, rN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Dh(), _n = null, Ut = Y, Ft;
  }
  function jj() {
    for (; bt !== null; )
      iN(bt);
  }
  function wj(e, t) {
    var n = Ie;
    Ie |= sn;
    var a = aN();
    if (_n !== e || Ut !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ut), r.clear()), kh(e, t);
      }
      Rr = Uh(), zu(), qi(e, t);
    }
    Ch(t);
    do
      try {
        _j();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    return mc(), rN(a), Ie = n, bt !== null ? (rx(), xr) : (Dh(), _n = null, Ut = Y, Ft);
  }
  function _j() {
    for (; bt !== null && !LS(); )
      iN(bt);
  }
  function iN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== xe ? (om(e), n = iv(t, e, Ja), $c(e, !0)) : n = iv(t, e, Ja), It(), e.memoizedProps = e.pendingProps, n === null ? lN(e) : bt = n, qm.current = null;
  }
  function lN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === xe ? r = wb(n, t, Ja) : (om(t), r = wb(n, t, Ja), $c(t, !1)), It(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = CT(n, t);
        if (i !== null) {
          i.flags &= DS, bt = i;
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
          Ft = Gm, bt = null;
          return;
        }
      }
      var s = t.sibling;
      if (s !== null) {
        bt = s;
        return;
      }
      t = a, bt = t;
    } while (t !== null);
    Ft === xr && (Ft = Gb);
  }
  function Gi(e, t, n) {
    var a = Sa(), r = un.transition;
    try {
      un.transition = null, Qt(Wn), Oj(e, t, n, a);
    } finally {
      un.transition = r, Qt(a);
    }
    return null;
  }
  function Oj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (Pj(), (Ie & (sn | ca)) !== kt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (IS(i), r === null)
      return Sh(), null;
    if (i === Y && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Y, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = Ue(r.lanes, r.childLanes);
    Sx(e, l), e === _n && (_n = null, bt = null, Ut = Y), ((r.subtreeFlags & pl) !== Ce || (r.flags & pl) !== Ce) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Dr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ce, s = (r.flags & (Wf | Qf | To | pl)) !== Ce;
    if (o || s) {
      var m = un.transition;
      un.transition = null;
      var h = Sa();
      Qt(Wn);
      var S = Ie;
      Ie |= ca, qm.current = null, _T(e, r), Xy(), YT(e, r, i), $C(e.containerInfo), e.current = r, ex(i), IT(r, e, i), tx(), MS(), Ie = S, Qt(h), un.transition = m;
    } else
      e.current = r, Xy();
    var E = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === Y && (Wl = null), E || cN(e.current, !1), HS(r.stateNode, a), Ea && e.memoizedUpdaters.clear(), cj(), Pn(e, qt()), t !== null)
      for (var O = e.onRecoverableError, M = 0; M < t.length; M++) {
        var z = t[M], ne = z.stack, Ee = z.digest;
        O(z.value, {
          componentStack: ne,
          digest: Ee
        });
      }
    if (Zc) {
      Zc = !1;
      var me = Km;
      throw Km = null, me;
    }
    return Gn(Hu, _e) && e.tag !== Ir && Dr(), l = e.pendingLanes, Gn(l, _e) ? (kD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, qr(), Sh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = Fh(Hu), t = Dx(vr, e), n = un.transition, a = Sa();
      try {
        return un.transition = null, Qt(t), Mj();
      } finally {
        Qt(a), un.transition = n;
      }
    }
    return !1;
  }
  function Lj(e) {
    Xm.push(e), Ii || (Ii = !0, uv(Di, function() {
      return Dr(), null;
    }));
  }
  function Mj() {
    if (ti === null)
      return !1;
    var e = Jm;
    Jm = null;
    var t = ti, n = Hu;
    if (ti = null, Hu = Y, (Ie & (sn | ca)) !== kt)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, nx(n);
    var a = Ie;
    Ie |= ca, JT(t.current), WT(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        AT(t, l);
      }
    }
    ax(), cN(t.current, !0), Ie = a, qr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, BS(t);
    {
      var o = t.current.stateNode;
      o.effectDuration = 0, o.passiveEffectDuration = 0;
    }
    return !0;
  }
  function oN(e) {
    return Wl !== null && Wl.has(e);
  }
  function Aj(e) {
    Wl === null ? Wl = /* @__PURE__ */ new Set([e]) : Wl.add(e);
  }
  function Vj(e) {
    Zc || (Zc = !0, Km = e);
  }
  var kj = Vj;
  function uN(e, t, n) {
    var a = Pi(n, t), r = ib(e, a, _e), i = Wr(e, r, _e), l = On();
    i !== null && (Vo(i, _e, l), Pn(i, l));
  }
  function lt(e, t, n) {
    if (TT(n), Iu(!1), e.tag === x) {
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
          var l = Pi(n, e), o = Cm(a, l, _e), s = Wr(a, o, _e), m = On();
          s !== null && (Vo(s, _e, m), Pn(s, m));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Uj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = On();
    Ah(e, n), qj(e), _n === e && bl(Ut, n) && (Ft === Vu || Ft === Kc && _h(Ut) && qt() - Qm < Wb ? qi(e, Y) : Jc = Ue(Jc, n)), Pn(e, r);
  }
  function sN(e, t) {
    t === Wt && (t = gj(e));
    var n = On(), a = zn(e, t);
    a !== null && (Vo(a, t, n), Pn(a, n));
  }
  function Fj(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), sN(e, n);
  }
  function zj(e, t) {
    var n = Wt, a;
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
  function Hj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : pj(e / 1960) * 1960;
  }
  function Bj() {
    if (Bu > vj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > hj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function Pj() {
    Ca.flushLegacyContextWarning(), Ca.flushPendingUnsafeLifecycleWarnings();
  }
  function cN(e, t) {
    mt(e), of(e, kr, oj), t && of(e, Gf, uj), of(e, kr, ij), t && of(e, Gf, lj), It();
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
      if ((Ie & sn) !== kt || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== _ && t !== x && t !== T && t !== D && t !== $ && t !== ge && t !== ce)
        return;
      var n = Ve(e) || "ReactComponent";
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
        a ? mt(e) : It();
      }
    }
  }
  var iv;
  {
    var $j = null;
    iv = function(e, t, n) {
      var a = bN($j, t);
      try {
        return Rb(e, t, n);
      } catch (i) {
        if (tD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (mc(), Dy(), _b(e, t), bN(t, a), t.mode & nt && om(t), Bf(null, Rb, null, e, t, n), xS()) {
          var r = Pf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var dN = !1, lv;
  lv = /* @__PURE__ */ new Set();
  function Yj(e) {
    if (gi && !MD())
      switch (e.tag) {
        case D:
        case $:
        case ce: {
          var t = bt && Ve(bt) || "Unknown", n = t;
          if (!lv.has(n)) {
            lv.add(n);
            var a = Ve(e) || "Unknown";
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
      return OS(e);
  }
  function mN() {
    return Ma.current !== null;
  }
  function Ij(e) {
    {
      if (e.mode & Ye) {
        if (!Ib())
          return;
      } else if (!dj() || Ie !== kt || e.tag !== D && e.tag !== $ && e.tag !== ce)
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

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ve(e));
        } finally {
          t ? mt(e) : It();
        }
      }
    }
  }
  function qj(e) {
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
  var fa = null, Kl = null, Gj = function(e) {
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
        case $: {
          (i === Ne || i === Se) && (r = !0);
          break;
        }
        case ge:
        case ce: {
          (i === ke || i === Se) && (r = !0);
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
  var Wj = function(e, t) {
    {
      if (fa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        fv(e.current, a, n);
      });
    }
  }, Qj = function(e, t) {
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
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, o = e.type, s = null;
      switch (l) {
        case D:
        case ce:
        case T:
          s = o;
          break;
        case $:
          s = o.render;
          break;
      }
      if (fa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var m = !1, h = !1;
      if (s !== null) {
        var S = fa(s);
        S !== void 0 && (n.has(S) ? h = !0 : t.has(S) && (l === T ? h = !0 : m = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || m) {
        var E = zn(e, _e);
        E !== null && zt(E, e, _e, st);
      }
      r !== null && !h && fv(r, t, n), i !== null && fv(i, t, n);
    }
  }
  var Kj = function(e, t) {
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
        case ce:
        case T:
          o = l;
          break;
        case $:
          o = l.render;
          break;
      }
      var s = !1;
      o !== null && t.has(o) && (s = !0), s ? Xj(e, n) : a !== null && dv(a, t, n), r !== null && dv(r, t, n);
    }
  }
  function Xj(e, t) {
    {
      var n = Jj(e, t);
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
  function Jj(e, t) {
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
  function Zj(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = Y, this.childLanes = Y, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Jn = function(e, t, n, a) {
    return new Zj(e, t, n, a);
  };
  function mv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function ew(e) {
    return typeof e == "function" && !mv(e) && e.defaultProps === void 0;
  }
  function tw(e) {
    if (typeof e == "function")
      return mv(e) ? T : D;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return $;
      if (t === ke)
        return ge;
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
      case ce:
        n.type = Xl(e.type);
        break;
      case T:
        n.type = sv(e.type);
        break;
      case $:
        n.type = cv(e.type);
        break;
    }
    return n;
  }
  function nw(e, t) {
    e.flags &= dr | Tt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = Y, e.lanes = t, e.child = null, e.subtreeFlags = Ce, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
  function aw(e, t, n) {
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
        case Fa:
          return ri(n.children, r, i, t);
        case fi:
          l = ae, r |= St, (r & Ye) !== xe && (r |= Pa);
          break;
        case N:
          return rw(n, r, i, t);
        case Pe:
          return iw(n, r, i, t);
        case we:
          return lw(n, r, i, t);
        case dt:
          return yN(n, r, i, t);
        case pn:
        case _t:
        case za:
        case ya:
        case ft:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case q:
                l = I;
                break e;
              case te:
                l = he;
                break e;
              case Ne:
                l = $, o = cv(o);
                break e;
              case ke:
                l = ge;
                break e;
              case Se:
                l = X, o = null;
                break e;
            }
          var s = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var m = a ? Ve(a) : null;
            m && (s += `

Check the render method of \`` + m + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + s));
        }
      }
    var h = Jn(l, n, t, r);
    return h.elementType = e, h.type = o, h.lanes = i, h._debugOwner = a, h;
  }
  function hv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vv(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ri(e, t, n, a) {
    var r = Jn(pe, e, a, t);
    return r.lanes = n, r;
  }
  function rw(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Jn(G, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function iw(e, t, n, a) {
    var r = Jn(B, e, a, t);
    return r.elementType = Pe, r.lanes = n, r;
  }
  function lw(e, t, n, a) {
    var r = Jn(U, e, a, t);
    return r.elementType = we, r.lanes = n, r;
  }
  function yN(e, t, n, a) {
    var r = Jn(oe, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function gv(e, t, n) {
    var a = Jn(Q, e, null, t);
    return a.lanes = n, a;
  }
  function ow() {
    var e = Jn(V, null, null, xe);
    return e.elementType = "DELETED", e;
  }
  function uw(e) {
    var t = Jn(J, null, null, xe);
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
  function sw(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Wt, this.eventTimes = Sd(Y), this.expirationTimes = Sd(st), this.pendingLanes = Y, this.suspendedLanes = Y, this.pingedLanes = Y, this.expiredLanes = Y, this.mutableReadLanes = Y, this.finishedLanes = Y, this.entangledLanes = Y, this.entanglements = Sd(Y), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
  function NN(e, t, n, a, r, i, l, o, s, m) {
    var h = new sw(e, t, n, o, s), S = aw(t, i);
    h.current = S, S.stateNode = h;
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
    return Op(S), h;
  }
  var bv = "18.3.1";
  function cw(e, t, n) {
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
    var t = cl(e), n = q0(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ia(a))
        return Wg(t, a, n);
    }
    return n;
  }
  function fw(e, t) {
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
        var i = Ve(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = Cn;
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
  function SN(e, t, n, a, r, i, l, o) {
    var s = !1, m = null;
    return NN(e, t, s, m, n, a, r, i, l);
  }
  function xN(e, t, n, a, r, i, l, o, s, m) {
    var h = !0, S = NN(n, a, h, e, r, i, l, o, s);
    S.context = EN(null);
    var E = S.current, O = On(), M = ni(E), z = Er(O, M);
    return z.callback = t ?? null, Wr(E, z, M), yj(S, M, O), S;
  }
  function qu(e, t, n, a) {
    zS(t, e);
    var r = t.current, i = On(), l = ni(r);
    ix(l);
    var o = EN(n);
    t.context === null ? t.context = o : t.pendingContext = o, gi && Cn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ve(Cn) || "Unknown"));
    var s = Er(i, l);
    s.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), s.callback = a);
    var m = Wr(r, s, l);
    return m !== null && (zt(m, r, l, i), bc(m, r, l)), l;
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
  function dw(e) {
    switch (e.tag) {
      case x: {
        var t = e.stateNode;
        if (js(t)) {
          var n = mx(t);
          Sj(t, n);
        }
        break;
      }
      case B: {
        Cr(function() {
          var r = zn(e, _e);
          if (r !== null) {
            var i = On();
            zt(r, e, _e, i);
          }
        });
        var a = _e;
        Sv(e, a);
        break;
      }
    }
  }
  function RN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = Nx(n.retryLane, t));
  }
  function Sv(e, t) {
    RN(e, t);
    var n = e.alternate;
    n && RN(n, t);
  }
  function pw(e) {
    if (e.tag === B) {
      var t = Oo, n = zn(e, t);
      if (n !== null) {
        var a = On();
        zt(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function mw(e) {
    if (e.tag === B) {
      var t = ni(e), n = zn(e, t);
      if (n !== null) {
        var a = On();
        zt(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function CN(e) {
    var t = _S(e);
    return t === null ? null : t.stateNode;
  }
  var DN = function(e) {
    return null;
  };
  function vw(e) {
    return DN(e);
  }
  var TN = function(e) {
    return !1;
  };
  function hw(e) {
    return TN(e);
  }
  var jN = null, wN = null, _N = null, ON = null, LN = null, MN = null, AN = null, VN = null, kN = null;
  {
    var UN = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : ze({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = UN(e[a], t, n + 1), r);
    }, FN = function(e, t) {
      return UN(e, t, 0);
    }, zN = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : ze({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], He(i) ? i.splice(r, 1) : delete i[r];
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
        C("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            C("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return zN(e, t, n, 0);
    }, BN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : ze({}, e);
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
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = zn(e, _e);
        l !== null && zt(l, e, _e, st);
      }
    }, wN = function(e, t, n) {
      var a = xv(e, t);
      if (a !== null) {
        var r = FN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = zn(e, _e);
        i !== null && zt(i, e, _e, st);
      }
    }, _N = function(e, t, n, a) {
      var r = xv(e, t);
      if (r !== null) {
        var i = HN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = zn(e, _e);
        l !== null && zt(l, e, _e, st);
      }
    }, ON = function(e, t, n) {
      e.pendingProps = PN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = zn(e, _e);
      a !== null && zt(a, e, _e, st);
    }, LN = function(e, t) {
      e.pendingProps = FN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = zn(e, _e);
      n !== null && zt(n, e, _e, st);
    }, MN = function(e, t, n) {
      e.pendingProps = HN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = zn(e, _e);
      a !== null && zt(a, e, _e, st);
    }, AN = function(e) {
      var t = zn(e, _e);
      t !== null && zt(t, e, _e, st);
    }, VN = function(e) {
      DN = e;
    }, kN = function(e) {
      TN = e;
    };
  }
  function gw(e) {
    var t = yh(e);
    return t === null ? null : t.stateNode;
  }
  function yw(e) {
    return null;
  }
  function bw() {
    return Cn;
  }
  function Nw(e) {
    var t = e.findFiberByHostInstance, n = v.ReactCurrentDispatcher;
    return FS({
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
      findHostInstanceByFiber: gw,
      findFiberByHostInstance: t || yw,
      // React Refresh
      findHostInstancesForRefresh: Kj,
      scheduleRefresh: Wj,
      scheduleRoot: Qj,
      setRefreshHandler: Gj,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: bw,
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
  function Ew(e, t) {
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
  function Sw(e) {
    e && Ux(e);
  }
  cf.prototype.unstable_scheduleHydration = Sw;
  function xw(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    YN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", s = $N;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError));
    var m = xN(t, null, e, rc, a, i, l, o, s);
    if (Xs(m.current, e), Jo(e), r)
      for (var h = 0; h < r.length; h++) {
        var S = r[h];
        TD(m, S);
      }
    return new cf(m);
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
  var Rw = v.ReactCurrentOwner, IN;
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
  function Cw(e, t, n, a, r) {
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
      for (var s; s = e.lastChild; )
        e.removeChild(s);
      if (typeof a == "function") {
        var m = a;
        a = function() {
          var E = sf(h);
          m.call(E);
        };
      }
      var h = SN(
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
      e._reactRootContainer = h, Xs(h.current, e);
      var S = e.nodeType === Dt ? e.parentNode : e;
      return Jo(S), Cr(function() {
        qu(t, h, n, a);
      }), h;
    }
  }
  function Dw(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    IN(n), Dw(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = Cw(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var o = r;
        r = function() {
          var s = sf(l);
          o.call(s);
        };
      }
      qu(t, l, e, r);
    }
    return sf(l);
  }
  var GN = !1;
  function Tw(e) {
    {
      GN || (GN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = Rw.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ke(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Un ? e : fw(e, "findDOMNode");
  }
  function jw(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function ww(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function _w(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !RS(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  var WN = !1;
  function Ow(e) {
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
  Tx(dw), wx(pw), _x(mw), Ox(Sa), Lx(Rx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), pS(MC), hS(nv, xj, Cr);
  function Lw(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return cw(e, t, null, n);
  }
  function Mw(e, t, n, a) {
    return _w(e, t, n, a);
  }
  var Dv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$r, jl, Js, ih, lh, nv]
  };
  function Aw(e, t) {
    return Dv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Ew(e, t);
  }
  function Vw(e, t, n) {
    return Dv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), xw(e, t, n);
  }
  function kw(e) {
    return tN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var Uw = Nw({
    findFiberByHostInstance: Mi,
    bundleType: 1,
    version: bv,
    rendererPackageName: "react-dom"
  });
  if (!Uw && Zt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var QN = window.location.protocol;
    /^(https?|file):$/.test(QN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (QN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, ea.createPortal = Lw, ea.createRoot = Aw, ea.findDOMNode = Tw, ea.flushSync = kw, ea.hydrate = jw, ea.hydrateRoot = Vw, ea.render = ww, ea.unmountComponentAtNode = Ow, ea.unstable_batchedUpdates = nv, ea.unstable_renderSubtreeIntoContainer = Mw, ea.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
dE.exports = ea;
var qw = dE.exports, vE, KN = qw;
{
  var XN = KN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  vE = function(u, p) {
    XN.usingClientEntryPoint = !0;
    try {
      return KN.createRoot(u, p);
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
  return Qu = Object.assign ? Object.assign.bind() : function(u) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var y in v)
        Object.prototype.hasOwnProperty.call(v, y) && (u[y] = v[y]);
    }
    return u;
  }, Qu.apply(this, arguments);
}
var li;
(function(u) {
  u.Pop = "POP", u.Push = "PUSH", u.Replace = "REPLACE";
})(li || (li = {}));
const JN = "popstate";
function Gw(u) {
  u === void 0 && (u = {});
  function p(y, g) {
    let {
      pathname: C,
      search: f,
      hash: k
    } = y.location;
    return _v(
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
  function v(y, g) {
    return typeof g == "string" ? g : Ku(g);
  }
  return Qw(p, v, null, u);
}
function ht(u, p) {
  if (u === !1 || u === null || typeof u > "u")
    throw new Error(p);
}
function Aa(u, p) {
  if (!u) {
    typeof console < "u" && console.warn(p);
    try {
      throw new Error(p);
    } catch {
    }
  }
}
function Ww() {
  return Math.random().toString(36).substr(2, 8);
}
function ZN(u, p) {
  return {
    usr: u.state,
    key: u.key,
    idx: p
  };
}
function _v(u, p, v, y) {
  return v === void 0 && (v = null), Qu({
    pathname: typeof u == "string" ? u : u.pathname,
    search: "",
    hash: ""
  }, typeof p == "string" ? eo(p) : p, {
    state: v,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: p && p.key || y || Ww()
  });
}
function Ku(u) {
  let {
    pathname: p = "/",
    search: v = "",
    hash: y = ""
  } = u;
  return v && v !== "?" && (p += v.charAt(0) === "?" ? v : "?" + v), y && y !== "#" && (p += y.charAt(0) === "#" ? y : "#" + y), p;
}
function eo(u) {
  let p = {};
  if (u) {
    let v = u.indexOf("#");
    v >= 0 && (p.hash = u.substr(v), u = u.substr(0, v));
    let y = u.indexOf("?");
    y >= 0 && (p.search = u.substr(y), u = u.substr(0, y)), u && (p.pathname = u);
  }
  return p;
}
function Qw(u, p, v, y) {
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
    let ae = _(), he = ae == null ? null : ae - T;
    T = ae, D && D({
      action: k,
      location: pe.location,
      delta: he
    });
  }
  function A(ae, he) {
    k = li.Push;
    let I = _v(pe.location, ae, he);
    T = _() + 1;
    let $ = ZN(I, T), G = pe.createHref(I);
    try {
      f.pushState($, "", G);
    } catch (B) {
      if (B instanceof DOMException && B.name === "DataCloneError")
        throw B;
      g.location.assign(G);
    }
    C && D && D({
      action: k,
      location: pe.location,
      delta: 1
    });
  }
  function V(ae, he) {
    k = li.Replace;
    let I = _v(pe.location, ae, he);
    T = _();
    let $ = ZN(I, T), G = pe.createHref(I);
    f.replaceState($, "", G), C && D && D({
      action: k,
      location: pe.location,
      delta: 0
    });
  }
  function Q(ae) {
    let he = g.location.origin !== "null" ? g.location.origin : g.location.href, I = typeof ae == "string" ? ae : Ku(ae);
    return I = I.replace(/ $/, "%20"), ht(he, "No window.location.(origin|href) available to create URL for href: " + I), new URL(I, he);
  }
  let pe = {
    get action() {
      return k;
    },
    get location() {
      return u(g, f);
    },
    listen(ae) {
      if (D)
        throw new Error("A history only accepts one active listener");
      return g.addEventListener(JN, x), D = ae, () => {
        g.removeEventListener(JN, x), D = null;
      };
    },
    createHref(ae) {
      return p(g, ae);
    },
    createURL: Q,
    encodeLocation(ae) {
      let he = Q(ae);
      return {
        pathname: he.pathname,
        search: he.search,
        hash: he.hash
      };
    },
    push: A,
    replace: V,
    go(ae) {
      return f.go(ae);
    }
  };
  return pe;
}
var eE;
(function(u) {
  u.data = "data", u.deferred = "deferred", u.redirect = "redirect", u.error = "error";
})(eE || (eE = {}));
function Kw(u, p, v) {
  return v === void 0 && (v = "/"), Xw(u, p, v);
}
function Xw(u, p, v, y) {
  let g = typeof p == "string" ? eo(p) : p, C = ui(g.pathname || "/", v);
  if (C == null)
    return null;
  let f = hE(u);
  Jw(f);
  let k = null;
  for (let D = 0; k == null && D < f.length; ++D) {
    let T = s1(C);
    k = o1(f[D], T);
  }
  return k;
}
function hE(u, p, v, y) {
  p === void 0 && (p = []), v === void 0 && (v = []), y === void 0 && (y = "");
  let g = (C, f, k) => {
    let D = {
      relativePath: k === void 0 ? C.path || "" : k,
      caseSensitive: C.caseSensitive === !0,
      childrenIndex: f,
      route: C
    };
    D.relativePath.startsWith("/") && (ht(D.relativePath.startsWith(y), 'Absolute route path "' + D.relativePath + '" nested under path ' + ('"' + y + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), D.relativePath = D.relativePath.slice(y.length));
    let T = wr([y, D.relativePath]), _ = v.concat(D);
    C.children && C.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      C.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), hE(C.children, p, _, T)), !(C.path == null && !C.index) && p.push({
      path: T,
      score: i1(T, C.index),
      routesMeta: _
    });
  };
  return u.forEach((C, f) => {
    var k;
    if (C.path === "" || !((k = C.path) != null && k.includes("?")))
      g(C, f);
    else
      for (let D of gE(C.path))
        g(C, f, D);
  }), p;
}
function gE(u) {
  let p = u.split("/");
  if (p.length === 0) return [];
  let [v, ...y] = p, g = v.endsWith("?"), C = v.replace(/\?$/, "");
  if (y.length === 0)
    return g ? [C, ""] : [C];
  let f = gE(y.join("/")), k = [];
  return k.push(...f.map((D) => D === "" ? C : [C, D].join("/"))), g && k.push(...f), k.map((D) => u.startsWith("/") && D === "" ? "/" : D);
}
function Jw(u) {
  u.sort((p, v) => p.score !== v.score ? v.score - p.score : l1(p.routesMeta.map((y) => y.childrenIndex), v.routesMeta.map((y) => y.childrenIndex)));
}
const Zw = /^:[\w-]+$/, e1 = 3, t1 = 2, n1 = 1, a1 = 10, r1 = -2, tE = (u) => u === "*";
function i1(u, p) {
  let v = u.split("/"), y = v.length;
  return v.some(tE) && (y += r1), p && (y += t1), v.filter((g) => !tE(g)).reduce((g, C) => g + (Zw.test(C) ? e1 : C === "" ? n1 : a1), y);
}
function l1(u, p) {
  return u.length === p.length && u.slice(0, -1).every((y, g) => y === p[g]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    u[u.length - 1] - p[p.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function o1(u, p, v) {
  let {
    routesMeta: y
  } = u, g = {}, C = "/", f = [];
  for (let k = 0; k < y.length; ++k) {
    let D = y[k], T = k === y.length - 1, _ = C === "/" ? p : p.slice(C.length) || "/", x = Ov({
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
      pathnameBase: p1(wr([C, x.pathnameBase])),
      route: A
    }), x.pathnameBase !== "/" && (C = wr([C, x.pathnameBase]));
  }
  return f;
}
function Ov(u, p) {
  typeof u == "string" && (u = {
    path: u,
    caseSensitive: !1,
    end: !0
  });
  let [v, y] = u1(u.path, u.caseSensitive, u.end), g = p.match(v);
  if (!g) return null;
  let C = g[0], f = C.replace(/(.)\/+$/, "$1"), k = g.slice(1);
  return {
    params: y.reduce((T, _, x) => {
      let {
        paramName: A,
        isOptional: V
      } = _;
      if (A === "*") {
        let pe = k[x] || "";
        f = C.slice(0, C.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const Q = k[x];
      return V && !Q ? T[A] = void 0 : T[A] = (Q || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: C,
    pathnameBase: f,
    pattern: u
  };
}
function u1(u, p, v) {
  p === void 0 && (p = !1), v === void 0 && (v = !0), Aa(u === "*" || !u.endsWith("*") || u.endsWith("/*"), 'Route path "' + u + '" will be treated as if it were ' + ('"' + u.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + u.replace(/\*$/, "/*") + '".'));
  let y = [], g = "^" + u.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, k, D) => (y.push({
    paramName: k,
    isOptional: D != null
  }), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return u.endsWith("*") ? (y.push({
    paramName: "*"
  }), g += u === "*" || u === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : v ? g += "\\/*$" : u !== "" && u !== "/" && (g += "(?:(?=\\/|$))"), [new RegExp(g, p ? void 0 : "i"), y];
}
function s1(u) {
  try {
    return u.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return Aa(!1, 'The URL path "' + u + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), u;
  }
}
function ui(u, p) {
  if (p === "/") return u;
  if (!u.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let v = p.endsWith("/") ? p.length - 1 : p.length, y = u.charAt(v);
  return y && y !== "/" ? null : u.slice(v) || "/";
}
function c1(u, p) {
  p === void 0 && (p = "/");
  let {
    pathname: v,
    search: y = "",
    hash: g = ""
  } = typeof u == "string" ? eo(u) : u;
  return {
    pathname: v ? v.startsWith("/") ? v : f1(v, p) : p,
    search: m1(y),
    hash: v1(g)
  };
}
function f1(u, p) {
  let v = p.replace(/\/+$/, "").split("/");
  return u.split("/").forEach((g) => {
    g === ".." ? v.length > 1 && v.pop() : g !== "." && v.push(g);
  }), v.length > 1 ? v.join("/") : "/";
}
function Tv(u, p, v, y) {
  return "Cannot include a '" + u + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(y) + "].  Please separate it out to the ") + ("`to." + v + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function d1(u) {
  return u.filter((p, v) => v === 0 || p.route.path && p.route.path.length > 0);
}
function Av(u, p) {
  let v = d1(u);
  return p ? v.map((y, g) => g === v.length - 1 ? y.pathname : y.pathnameBase) : v.map((y) => y.pathnameBase);
}
function Vv(u, p, v, y) {
  y === void 0 && (y = !1);
  let g;
  typeof u == "string" ? g = eo(u) : (g = Qu({}, u), ht(!g.pathname || !g.pathname.includes("?"), Tv("?", "pathname", "search", g)), ht(!g.pathname || !g.pathname.includes("#"), Tv("#", "pathname", "hash", g)), ht(!g.search || !g.search.includes("#"), Tv("#", "search", "hash", g)));
  let C = u === "" || g.pathname === "", f = C ? "/" : g.pathname, k;
  if (f == null)
    k = v;
  else {
    let x = p.length - 1;
    if (!y && f.startsWith("..")) {
      let A = f.split("/");
      for (; A[0] === ".."; )
        A.shift(), x -= 1;
      g.pathname = A.join("/");
    }
    k = x >= 0 ? p[x] : "/";
  }
  let D = c1(g, k), T = f && f !== "/" && f.endsWith("/"), _ = (C || f === ".") && v.endsWith("/");
  return !D.pathname.endsWith("/") && (T || _) && (D.pathname += "/"), D;
}
const wr = (u) => u.join("/").replace(/\/\/+/g, "/"), p1 = (u) => u.replace(/\/+$/, "").replace(/^\/*/, "/"), m1 = (u) => !u || u === "?" ? "" : u.startsWith("?") ? u : "?" + u, v1 = (u) => !u || u === "#" ? "" : u.startsWith("#") ? u : "#" + u;
function h1(u) {
  return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.internal == "boolean" && "data" in u;
}
const yE = ["post", "put", "patch", "delete"];
new Set(yE);
const g1 = ["get", ...yE];
new Set(g1);
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
  return Xu = Object.assign ? Object.assign.bind() : function(u) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var y in v)
        Object.prototype.hasOwnProperty.call(v, y) && (u[y] = v[y]);
    }
    return u;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ R.createContext(null);
Zu.displayName = "DataRouter";
const kv = /* @__PURE__ */ R.createContext(null);
kv.displayName = "DataRouterState";
const y1 = /* @__PURE__ */ R.createContext(null);
y1.displayName = "Await";
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
function b1(u, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p;
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
  } = ts(u, {
    relative: v
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
const bE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function NE(u) {
  R.useContext(da).static || R.useLayoutEffect(u);
}
function Fv() {
  let {
    isDataRoute: u
  } = R.useContext(Va);
  return u ? A1() : N1();
}
function N1() {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let u = R.useContext(Zu), {
    basename: p,
    future: v,
    navigator: y
  } = R.useContext(da), {
    matches: g
  } = R.useContext(Va), {
    pathname: C
  } = Qi(), f = JSON.stringify(Av(g, v.v7_relativeSplatPath)), k = R.useRef(!1);
  return NE(() => {
    k.current = !0;
  }), R.useCallback(function(T, _) {
    if (_ === void 0 && (_ = {}), Aa(k.current, bE), !k.current) return;
    if (typeof T == "number") {
      y.go(T);
      return;
    }
    let x = Vv(T, JSON.parse(f), C, _.relative === "path");
    u == null && p !== "/" && (x.pathname = x.pathname === "/" ? p : wr([p, x.pathname])), (_.replace ? y.replace : y.push)(x, _.state, _);
  }, [p, y, f, C, u]);
}
function E1() {
  let {
    matches: u
  } = R.useContext(Va), p = u[u.length - 1];
  return p ? p.params : {};
}
function ts(u, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    future: y
  } = R.useContext(da), {
    matches: g
  } = R.useContext(Va), {
    pathname: C
  } = Qi(), f = JSON.stringify(Av(g, y.v7_relativeSplatPath));
  return R.useMemo(() => Vv(u, JSON.parse(f), C, v === "path"), [u, f, C, v]);
}
function S1(u, p) {
  return x1(u, p);
}
function x1(u, p, v, y) {
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
    let I = _ && _.path || "";
    SE(D, !_ || I.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + D + '" (under <Route path="' + I + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + I + '"> to <Route ') + ('path="' + (I === "/" ? "*" : I + "/*") + '">.'));
  }
  let x = Qi(), A;
  if (p) {
    var V;
    let I = typeof p == "string" ? eo(p) : p;
    T === "/" || (V = I.pathname) != null && V.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + I.pathname + '" was given in the `location` prop.')), A = I;
  } else
    A = x;
  let Q = A.pathname || "/", pe = Q;
  if (T !== "/") {
    let I = T.replace(/^\//, "").split("/");
    pe = "/" + Q.replace(/^\//, "").split("/").slice(I.length).join("/");
  }
  let ae = Kw(u, {
    pathname: pe
  });
  Aa(_ || ae != null, 'No routes matched location "' + A.pathname + A.search + A.hash + '" '), Aa(ae == null || ae[ae.length - 1].route.element !== void 0 || ae[ae.length - 1].route.Component !== void 0 || ae[ae.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + A.pathname + A.search + A.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let he = j1(ae && ae.map((I) => Object.assign({}, I, {
    params: Object.assign({}, k, I.params),
    pathname: wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      g.encodeLocation ? g.encodeLocation(I.pathname).pathname : I.pathname
    ]),
    pathnameBase: I.pathnameBase === "/" ? T : wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      g.encodeLocation ? g.encodeLocation(I.pathnameBase).pathname : I.pathnameBase
    ])
  })), C, v, y);
  return p && he ? /* @__PURE__ */ R.createElement(es.Provider, {
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
  }, he) : he;
}
function R1() {
  let u = M1(), p = h1(u) ? u.status + " " + u.statusText : u instanceof Error ? u.message : JSON.stringify(u), v = u instanceof Error ? u.stack : null, y = "rgba(200,200,200, 0.5)", g = {
    padding: "0.5rem",
    backgroundColor: y
  }, C = {
    padding: "2px 4px",
    backgroundColor: y
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", u), f = /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ R.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ R.createElement("code", {
    style: C
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ R.createElement("code", {
    style: C
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ R.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), v ? /* @__PURE__ */ R.createElement("pre", {
    style: g
  }, v) : null, f);
}
const C1 = /* @__PURE__ */ R.createElement(R1, null);
class D1 extends R.Component {
  constructor(p) {
    super(p), this.state = {
      location: p.location,
      revalidation: p.revalidation,
      error: p.error
    };
  }
  static getDerivedStateFromError(p) {
    return {
      error: p
    };
  }
  static getDerivedStateFromProps(p, v) {
    return v.location !== p.location || v.revalidation !== "idle" && p.revalidation === "idle" ? {
      error: p.error,
      location: p.location,
      revalidation: p.revalidation
    } : {
      error: p.error !== void 0 ? p.error : v.error,
      location: v.location,
      revalidation: p.revalidation || v.revalidation
    };
  }
  componentDidCatch(p, v) {
    console.error("React Router caught the following error during render", p, v);
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
function T1(u) {
  let {
    routeContext: p,
    match: v,
    children: y
  } = u, g = R.useContext(Zu);
  return g && g.static && g.staticContext && (v.route.errorElement || v.route.ErrorBoundary) && (g.staticContext._deepestRenderedBoundaryId = v.route.id), /* @__PURE__ */ R.createElement(Va.Provider, {
    value: p
  }, y);
}
function j1(u, p, v, y) {
  var g;
  if (p === void 0 && (p = []), v === void 0 && (v = null), y === void 0 && (y = null), u == null) {
    var C;
    if (!v)
      return null;
    if (v.errors)
      u = v.matches;
    else if ((C = y) != null && C.v7_partialHydration && p.length === 0 && !v.initialized && v.matches.length > 0)
      u = v.matches;
    else
      return null;
  }
  let f = u, k = (g = v) == null ? void 0 : g.errors;
  if (k != null) {
    let _ = f.findIndex((x) => x.route.id && (k == null ? void 0 : k[x.route.id]) !== void 0);
    _ >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(k).join(",")), f = f.slice(0, Math.min(f.length, _ + 1));
  }
  let D = !1, T = -1;
  if (v && y && y.v7_partialHydration)
    for (let _ = 0; _ < f.length; _++) {
      let x = f[_];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (T = _), x.route.id) {
        let {
          loaderData: A,
          errors: V
        } = v, Q = x.route.loader && A[x.route.id] === void 0 && (!V || V[x.route.id] === void 0);
        if (x.route.lazy || Q) {
          D = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((_, x, A) => {
    let V, Q = !1, pe = null, ae = null;
    v && (V = k && x.route.id ? k[x.route.id] : void 0, pe = x.route.errorElement || C1, D && (T < 0 && A === 0 ? (SE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), Q = !0, ae = null) : T === A && (Q = !0, ae = x.route.hydrateFallbackElement || null)));
    let he = p.concat(f.slice(0, A + 1)), I = () => {
      let $;
      return V ? $ = pe : Q ? $ = ae : x.route.Component ? $ = /* @__PURE__ */ R.createElement(x.route.Component, null) : x.route.element ? $ = x.route.element : $ = _, /* @__PURE__ */ R.createElement(T1, {
        match: x,
        routeContext: {
          outlet: _,
          matches: he,
          isDataRoute: v != null
        },
        children: $
      });
    };
    return v && (x.route.ErrorBoundary || x.route.errorElement || A === 0) ? /* @__PURE__ */ R.createElement(D1, {
      location: v.location,
      revalidation: v.revalidation,
      component: pe,
      error: V,
      children: I(),
      routeContext: {
        outlet: null,
        matches: he,
        isDataRoute: !0
      }
    }) : I();
  }, null);
}
var EE = /* @__PURE__ */ function(u) {
  return u.UseBlocker = "useBlocker", u.UseRevalidator = "useRevalidator", u.UseNavigateStable = "useNavigate", u;
}(EE || {}), Ju = /* @__PURE__ */ function(u) {
  return u.UseBlocker = "useBlocker", u.UseLoaderData = "useLoaderData", u.UseActionData = "useActionData", u.UseRouteError = "useRouteError", u.UseNavigation = "useNavigation", u.UseRouteLoaderData = "useRouteLoaderData", u.UseMatches = "useMatches", u.UseRevalidator = "useRevalidator", u.UseNavigateStable = "useNavigate", u.UseRouteId = "useRouteId", u;
}(Ju || {});
function zv(u) {
  return u + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function w1(u) {
  let p = R.useContext(Zu);
  return p || ht(!1, zv(u)), p;
}
function _1(u) {
  let p = R.useContext(kv);
  return p || ht(!1, zv(u)), p;
}
function O1(u) {
  let p = R.useContext(Va);
  return p || ht(!1, zv(u)), p;
}
function Hv(u) {
  let p = O1(u), v = p.matches[p.matches.length - 1];
  return v.route.id || ht(!1, u + ' can only be used on routes that contain a unique "id"'), v.route.id;
}
function L1() {
  return Hv(Ju.UseRouteId);
}
function M1() {
  var u;
  let p = R.useContext(Uv), v = _1(Ju.UseRouteError), y = Hv(Ju.UseRouteError);
  return p !== void 0 ? p : (u = v.errors) == null ? void 0 : u[y];
}
function A1() {
  let {
    router: u
  } = w1(EE.UseNavigateStable), p = Hv(Ju.UseNavigateStable), v = R.useRef(!1);
  return NE(() => {
    v.current = !0;
  }), R.useCallback(function(g, C) {
    C === void 0 && (C = {}), Aa(v.current, bE), v.current && (typeof g == "number" ? u.navigate(g) : u.navigate(g, Xu({
      fromRouteId: p
    }, C)));
  }, [u, p]);
}
const nE = {};
function SE(u, p, v) {
  !p && !nE[u] && (nE[u] = !0, Aa(!1, v));
}
const aE = {};
function V1(u, p) {
  aE[p] || (aE[p] = !0, console.warn(p));
}
const rE = (u, p, v) => V1(u, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + u + "` future flag to opt-in early. ") + ("For more information, see " + v + "."));
function k1(u, p) {
  (u == null ? void 0 : u.v7_startTransition) === void 0 && rE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (u == null ? void 0 : u.v7_relativeSplatPath) === void 0 && rE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function U1(u) {
  let {
    to: p,
    replace: v,
    state: y,
    relative: g
  } = u;
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
  } = Qi(), T = Fv(), _ = Vv(p, Av(k, C.v7_relativeSplatPath), D, g === "path"), x = JSON.stringify(_);
  return R.useEffect(() => T(JSON.parse(x), {
    replace: v,
    state: y,
    relative: g
  }), [T, x, g, v, y]), null;
}
function jr(u) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function F1(u) {
  let {
    basename: p = "/",
    children: v = null,
    location: y,
    navigationType: g = li.Pop,
    navigator: C,
    static: f = !1,
    future: k
  } = u;
  to() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let D = p.replace(/^\/*/, "/"), T = R.useMemo(() => ({
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
    key: Q = "default"
  } = y, pe = R.useMemo(() => {
    let ae = ui(_, D);
    return ae == null ? null : {
      location: {
        pathname: ae,
        search: x,
        hash: A,
        state: V,
        key: Q
      },
      navigationType: g
    };
  }, [D, _, x, A, V, Q, g]);
  return Aa(pe != null, '<Router basename="' + D + '"> is not able to match the URL ' + ('"' + _ + x + A + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ R.createElement(da.Provider, {
    value: T
  }, /* @__PURE__ */ R.createElement(es.Provider, {
    children: v,
    value: pe
  }));
}
function z1(u) {
  let {
    children: p,
    location: v
  } = u;
  return S1(Lv(p), v);
}
new Promise(() => {
});
function Lv(u, p) {
  p === void 0 && (p = []);
  let v = [];
  return R.Children.forEach(u, (y, g) => {
    if (!/* @__PURE__ */ R.isValidElement(y))
      return;
    let C = [...p, g];
    if (y.type === R.Fragment) {
      v.push.apply(v, Lv(y.props.children, C));
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
    y.props.children && (f.children = Lv(y.props.children, C)), v.push(f);
  }), v;
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
  return Zl = Object.assign ? Object.assign.bind() : function(u) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var y in v)
        Object.prototype.hasOwnProperty.call(v, y) && (u[y] = v[y]);
    }
    return u;
  }, Zl.apply(this, arguments);
}
function Bv(u, p) {
  if (u == null) return {};
  var v = {}, y = Object.keys(u), g, C;
  for (C = 0; C < y.length; C++)
    g = y[C], !(p.indexOf(g) >= 0) && (v[g] = u[g]);
  return v;
}
const mf = "get", vf = "application/x-www-form-urlencoded";
function yf(u) {
  return u != null && typeof u.tagName == "string";
}
function H1(u) {
  return yf(u) && u.tagName.toLowerCase() === "button";
}
function B1(u) {
  return yf(u) && u.tagName.toLowerCase() === "form";
}
function P1(u) {
  return yf(u) && u.tagName.toLowerCase() === "input";
}
function $1(u) {
  return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey);
}
function Y1(u, p) {
  return u.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !$1(u);
}
let pf = null;
function I1() {
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
const q1 = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function jv(u) {
  return u != null && !q1.has(u) ? (Aa(!1, '"' + u + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : u;
}
function G1(u, p) {
  let v, y, g, C, f;
  if (B1(u)) {
    let k = u.getAttribute("action");
    y = k ? ui(k, p) : null, v = u.getAttribute("method") || mf, g = jv(u.getAttribute("enctype")) || vf, C = new FormData(u);
  } else if (H1(u) || P1(u) && (u.type === "submit" || u.type === "image")) {
    let k = u.form;
    if (k == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let D = u.getAttribute("formaction") || k.getAttribute("action");
    if (y = D ? ui(D, p) : null, v = u.getAttribute("formmethod") || k.getAttribute("method") || mf, g = jv(u.getAttribute("formenctype")) || jv(k.getAttribute("enctype")) || vf, C = new FormData(k, u), !I1()) {
      let {
        name: T,
        type: _,
        value: x
      } = u;
      if (_ === "image") {
        let A = T ? T + "." : "";
        C.append(A + "x", "0"), C.append(A + "y", "0");
      } else T && C.append(T, x);
    }
  } else {
    if (yf(u))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    v = mf, y = null, g = vf, f = u;
  }
  return C && g === "text/plain" && (f = C, C = void 0), {
    action: y,
    method: v.toLowerCase(),
    encType: g,
    formData: C,
    body: f
  };
}
const W1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Q1 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], K1 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], X1 = "6";
try {
  window.__reactRouterVersion = X1;
} catch {
}
const xE = /* @__PURE__ */ R.createContext({
  isTransitioning: !1
});
xE.displayName = "ViewTransition";
const J1 = /* @__PURE__ */ R.createContext(/* @__PURE__ */ new Map());
J1.displayName = "Fetchers";
const Z1 = "startTransition", iE = Yw[Z1];
function e_(u) {
  let {
    basename: p,
    children: v,
    future: y,
    window: g
  } = u, C = R.useRef();
  C.current == null && (C.current = Gw({
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
  return R.useLayoutEffect(() => f.listen(_), [f, _]), R.useEffect(() => k1(y), [y]), /* @__PURE__ */ R.createElement(F1, {
    basename: p,
    children: v,
    location: k.location,
    navigationType: k.action,
    navigator: f,
    future: y
  });
}
const t_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", n_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ R.forwardRef(function(p, v) {
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
  } = p, A = Bv(p, W1), {
    basename: V
  } = R.useContext(da), Q, pe = !1;
  if (typeof T == "string" && n_.test(T) && (Q = T, t_))
    try {
      let $ = new URL(window.location.href), G = T.startsWith("//") ? new URL($.protocol + T) : new URL(T), B = ui(G.pathname, V);
      G.origin === $.origin && B != null ? T = B + G.search + G.hash : pe = !0;
    } catch {
      Aa(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ae = b1(T, {
    relative: g
  }), he = l_(T, {
    replace: f,
    state: k,
    target: D,
    preventScrollReset: _,
    relative: g,
    viewTransition: x
  });
  function I($) {
    y && y($), $.defaultPrevented || he($);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ R.createElement("a", Zl({}, A, {
      href: Q || ae,
      onClick: pe || C ? y : I,
      ref: v,
      target: D
    }))
  );
});
ii.displayName = "Link";
const a_ = /* @__PURE__ */ R.forwardRef(function(p, v) {
  let {
    "aria-current": y = "page",
    caseSensitive: g = !1,
    className: C = "",
    end: f = !1,
    style: k,
    to: D,
    viewTransition: T,
    children: _
  } = p, x = Bv(p, Q1), A = ts(D, {
    relative: x.relative
  }), V = Qi(), Q = R.useContext(kv), {
    navigator: pe,
    basename: ae
  } = R.useContext(da), he = Q != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  d_(A) && T === !0, I = pe.encodeLocation ? pe.encodeLocation(A).pathname : A.pathname, $ = V.pathname, G = Q && Q.navigation && Q.navigation.location ? Q.navigation.location.pathname : null;
  g || ($ = $.toLowerCase(), G = G ? G.toLowerCase() : null, I = I.toLowerCase()), G && ae && (G = ui(G, ae) || G);
  const B = I !== "/" && I.endsWith("/") ? I.length - 1 : I.length;
  let ge = $ === I || !f && $.startsWith(I) && $.charAt(B) === "/", ce = G != null && (G === I || !f && G.startsWith(I) && G.charAt(I.length) === "/"), X = {
    isActive: ge,
    isPending: ce,
    isTransitioning: he
  }, ie = ge ? y : void 0, J;
  typeof C == "function" ? J = C(X) : J = [C, ge ? "active" : null, ce ? "pending" : null, he ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof k == "function" ? k(X) : k;
  return /* @__PURE__ */ R.createElement(ii, Zl({}, x, {
    "aria-current": ie,
    className: J,
    ref: v,
    style: U,
    to: D,
    viewTransition: T
  }), typeof _ == "function" ? _(X) : _);
});
a_.displayName = "NavLink";
const r_ = /* @__PURE__ */ R.forwardRef((u, p) => {
  let {
    fetcherKey: v,
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
  } = u, V = Bv(u, K1), Q = c_(), pe = f_(D, {
    relative: _
  }), ae = k.toLowerCase() === "get" ? "get" : "post", he = (I) => {
    if (T && T(I), I.defaultPrevented) return;
    I.preventDefault();
    let $ = I.nativeEvent.submitter, G = ($ == null ? void 0 : $.getAttribute("formmethod")) || k;
    Q($ || I.currentTarget, {
      fetcherKey: v,
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
    ref: p,
    method: ae,
    action: pe,
    onSubmit: g ? T : he
  }, V));
});
r_.displayName = "Form";
var gf;
(function(u) {
  u.UseScrollRestoration = "useScrollRestoration", u.UseSubmit = "useSubmit", u.UseSubmitFetcher = "useSubmitFetcher", u.UseFetcher = "useFetcher", u.useViewTransitionState = "useViewTransitionState";
})(gf || (gf = {}));
var lE;
(function(u) {
  u.UseFetcher = "useFetcher", u.UseFetchers = "useFetchers", u.UseScrollRestoration = "useScrollRestoration";
})(lE || (lE = {}));
function i_(u) {
  return u + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function RE(u) {
  let p = R.useContext(Zu);
  return p || ht(!1, i_(u)), p;
}
function l_(u, p) {
  let {
    target: v,
    replace: y,
    state: g,
    preventScrollReset: C,
    relative: f,
    viewTransition: k
  } = p === void 0 ? {} : p, D = Fv(), T = Qi(), _ = ts(u, {
    relative: f
  });
  return R.useCallback((x) => {
    if (Y1(x, v)) {
      x.preventDefault();
      let A = y !== void 0 ? y : Ku(T) === Ku(_);
      D(u, {
        replace: A,
        state: g,
        preventScrollReset: C,
        relative: f,
        viewTransition: k
      });
    }
  }, [T, D, _, y, g, v, u, C, f, k]);
}
function o_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let u_ = 0, s_ = () => "__" + String(++u_) + "__";
function c_() {
  let {
    router: u
  } = RE(gf.UseSubmit), {
    basename: p
  } = R.useContext(da), v = L1();
  return R.useCallback(function(y, g) {
    g === void 0 && (g = {}), o_();
    let {
      action: C,
      method: f,
      encType: k,
      formData: D,
      body: T
    } = G1(y, p);
    if (g.navigate === !1) {
      let _ = g.fetcherKey || s_();
      u.fetch(_, v, g.action || C, {
        preventScrollReset: g.preventScrollReset,
        formData: D,
        body: T,
        formMethod: g.method || f,
        formEncType: g.encType || k,
        flushSync: g.flushSync
      });
    } else
      u.navigate(g.action || C, {
        preventScrollReset: g.preventScrollReset,
        formData: D,
        body: T,
        formMethod: g.method || f,
        formEncType: g.encType || k,
        replace: g.replace,
        state: g.state,
        fromRouteId: v,
        flushSync: g.flushSync,
        viewTransition: g.viewTransition
      });
  }, [u, p, v]);
}
function f_(u, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    basename: y
  } = R.useContext(da), g = R.useContext(Va);
  g || ht(!1, "useFormAction must be used inside a RouteContext");
  let [C] = g.matches.slice(-1), f = Zl({}, ts(u || ".", {
    relative: v
  })), k = Qi();
  if (u == null) {
    f.search = k.search;
    let D = new URLSearchParams(f.search), T = D.getAll("index");
    if (T.some((x) => x === "")) {
      D.delete("index"), T.filter((A) => A).forEach((A) => D.append("index", A));
      let x = D.toString();
      f.search = x ? "?" + x : "";
    }
  }
  return (!u || u === ".") && C.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), y !== "/" && (f.pathname = f.pathname === "/" ? y : wr([y, f.pathname])), Ku(f);
}
function d_(u, p) {
  p === void 0 && (p = {});
  let v = R.useContext(xE);
  v == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: y
  } = RE(gf.useViewTransitionState), g = ts(u, {
    relative: p.relative
  });
  if (!v.isTransitioning)
    return !1;
  let C = ui(v.currentLocation.pathname, y) || v.currentLocation.pathname, f = ui(v.nextLocation.pathname, y) || v.nextLocation.pathname;
  return Ov(g.pathname, f) != null || Ov(g.pathname, C) != null;
}
function p_() {
  const [u, p] = R.useState(null), [v, y] = R.useState(""), [g, C] = R.useState(""), [f, k] = R.useState(!0), [D, T] = R.useState(""), [_, x] = R.useState(""), [A, V] = R.useState(!1), [Q, pe] = R.useState(!1);
  R.useEffect(() => {
    const $ = typeof window < "u" ? window : void 0, G = $ && $.__FIREBASE__ ? $.__FIREBASE__ : null;
    p({
      apiKey: G && G.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: G && G.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: G && G.projectId || void 0 || "fresh-basket-a8933",
      appId: G && G.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: G && G.messagingSenderId || void 0 || "163656027399",
      measurementId: G && G.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ae($) {
    const G = ($ == null ? void 0 : $.code) || "", B = ($ == null ? void 0 : $.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || B.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : B || "Something went wrong.";
  }
  async function he($) {
    $.preventDefault(), T(""), x(""), V(!0);
    try {
      if (!(u != null && u.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(u), B = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ge, setPersistence: ce, browserLocalPersistence: X, browserSessionPersistence: ie, signInWithEmailAndPassword: J } = B, U = ge();
      await ce(U, f ? X : ie);
      const oe = await (await J(U, v.trim(), g)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: oe }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (G) {
      T(ae(G));
    } finally {
      V(!1);
    }
  }
  async function I() {
    T(""), x("");
    try {
      if (!(u != null && u.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(u), { getAuth: G, sendPasswordResetEmail: B } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ge = G();
      await B(ge, v.trim()), x("If an account exists for that email, a reset link has been sent.");
    } catch ($) {
      T(ae($));
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
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: he, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: v, onChange: ($) => y($.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: Q ? "text" : "password", value: g, onChange: ($) => C($.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": Q ? "Hide password" : "Show password", onClick: () => pe(($) => !$), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: f, onChange: ($) => k($.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("button", { className: "link-button", type: "button", onClick: I, children: "Forgot password?" }, void 0, !1, {
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
function m_() {
  const [u, p] = R.useState(null), [v, y] = R.useState(""), [g, C] = R.useState(""), [f, k] = R.useState(""), [D, T] = R.useState(""), [_, x] = R.useState(""), [A, V] = R.useState(""), [Q, pe] = R.useState(""), [ae, he] = R.useState(!1), [I, $] = R.useState(!1), [G, B] = R.useState(!1), [ge, ce] = R.useState(!1);
  R.useEffect(() => {
    const J = typeof window < "u" ? window : void 0, U = J && J.__FIREBASE__ ? J.__FIREBASE__ : null;
    p({
      apiKey: U && U.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: U && U.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: U && U.projectId || void 0 || "fresh-basket-a8933",
      appId: U && U.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: U && U.messagingSenderId || void 0 || "163656027399",
      measurementId: U && U.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function X(J) {
    const U = (J == null ? void 0 : J.code) || "";
    return U.includes("email-already-in-use") ? "An account with this email already exists." : U.includes("weak-password") ? "Password should be at least 6 characters." : U.includes("invalid-email") ? "Please enter a valid email address." : U.includes("network-request-failed") ? "Network error. Check your connection and try again." : (J == null ? void 0 : J.message) || "Something went wrong.";
  }
  async function ie(J) {
    J.preventDefault(), V(""), pe(""), he(!0);
    try {
      const U = String(v).trim(), ve = String(g).trim(), oe = ve.replace(/\D+/g, ""), Te = { fn: !U, cn: !ve };
      if (B(Te.fn), ce(Te.cn || oe.length < 7), Te.fn || Te.cn) {
        V("Please fill in required fields");
        return;
      }
      if (oe.length < 7) {
        V("Please enter a valid mobile number");
        return;
      }
      if (D !== _) throw new Error("Passwords do not match");
      if (!(u != null && u.apiKey)) throw new Error("Firebase not configured");
      const je = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(u), { getAuth: Le, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ge = Le(), Nn = await (await ye(Ge, f.trim(), D)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Nn, profile: { fullName: U, contactNumber: ve } }) })).ok) throw new Error("Session creation failed");
      pe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (U) {
      V(X(U));
    } finally {
      he(!1);
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
    Q && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: Q }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: ie, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (G && !String(v).trim() ? " input-error" : ""), value: v, onChange: (J) => {
          y(J.target.value), G && B(!String(J.target.value).trim());
        }, onBlur: () => B(!String(v).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (ge ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: g, onChange: (J) => {
          if (C(J.target.value), ge) {
            const U = String(J.target.value).trim().replace(/\D+/g, "");
            ce(!(U.length >= 7));
          }
        }, onBlur: () => {
          const J = String(g).trim().replace(/\D+/g, "");
          ce(!(J.length >= 7));
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (J) => k(J.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: I ? "text" : "password", value: D, onChange: (J) => T(J.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": I ? "Hide password" : "Show password", onClick: () => $((J) => !J), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: _, onChange: (J) => x(J.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button", disabled: ae, type: "submit", children: ae ? "Creating account…" : "Create account" }, void 0, !1, {
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
function v_() {
  const [u, p] = R.useState([]);
  return R.useEffect(() => {
    const v = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (v.length) {
      const y = v.map((g) => ({
        id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
        message: String(g.message || ""),
        type: g.opts && g.opts.type || "success",
        ttl: g.opts && typeof g.opts.ttl == "number" ? g.opts.ttl : 4e3
      }));
      p((g) => [...y, ...g]);
      try {
        delete window.__pendingToasts;
      } catch {
        window.__pendingToasts = [];
      }
    }
    return window.showToast = function(y, g = {}) {
      const C = String(Date.now()) + Math.random().toString(36).slice(2, 8), f = { id: C, message: String(y || ""), type: g.type || "success", ttl: typeof g.ttl == "number" ? g.ttl : 4e3 };
      return p((k) => [f, ...k]), C;
    }, window.hideToast = function(y) {
      p((g) => g.filter((C) => C.id !== y));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), R.useEffect(() => {
    if (!u.length) return;
    const v = u.map((y) => setTimeout(() => {
      p((g) => g.filter((C) => C.id !== y.id));
    }, y.ttl));
    return () => {
      v.forEach(clearTimeout);
    };
  }, [u]), u.length ? /* @__PURE__ */ d.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: u.map((v) => /* @__PURE__ */ d.jsxDEV("div", { className: `toast ${v.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ d.jsxDEV("div", { className: "toast-message", children: v.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ d.jsxDEV("button", { className: "toast-close", onClick: () => p((y) => y.filter((g) => g.id !== v.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 47,
      columnNumber: 11
    }, this)
  ] }, v.id, !0, {
    fileName: "/app/code/client/components/Toaster.jsx",
    lineNumber: 45,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "/app/code/client/components/Toaster.jsx",
    lineNumber: 43,
    columnNumber: 5
  }, this) : null;
}
function oi({ children: u }) {
  R.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(v, y) {
      return window.__pendingToasts.push({ message: v, opts: y || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(v) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((y) => y.id !== v));
      } catch {
      }
    }));
  }, []);
  const p = Fv();
  return R.useEffect(() => {
    const v = document.getElementById("notifBtn"), y = document.getElementById("notifMenu"), g = document.getElementById("profileBtn"), C = document.getElementById("profileMenu");
    function f(x, A, V) {
      x && (x.classList.toggle("hidden", !V), x.setAttribute("aria-hidden", V ? "false" : "true"), A && A.setAttribute("aria-expanded", V ? "true" : "false"));
    }
    function k() {
      f(y, v, !1), f(C, g, !1);
    }
    function D(x) {
      const A = (V) => V && (V === x.target || V.contains(x.target));
      !A(y) && !A(v) && !A(C) && !A(g) && k();
    }
    function T(x) {
      x.key === "Escape" && k();
    }
    function _(x) {
      x && x.querySelectorAll(".dropdown-item").forEach((A) => {
        A.addEventListener("click", () => k());
      });
    }
    return v && y && (v.addEventListener("click", (x) => {
      x.stopPropagation(), f(C, g, !1), f(y, v, y.classList.contains("hidden"));
    }), _(y)), g && C && (g.addEventListener("click", (x) => {
      x.stopPropagation(), f(y, v, !1), f(C, g, C.classList.contains("hidden"));
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
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/dashboard", onClick: (v) => {
          v.preventDefault(), p("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/orders", onClick: (v) => {
          v.preventDefault(), p("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/riders", onClick: (v) => {
          v.preventDefault(), p("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/reports", onClick: (v) => {
          v.preventDefault(), p("/reports");
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
            /* @__PURE__ */ d.jsxDEV(ii, { className: "dropdown-item", to: "/riders", onClick: (v) => {
              v.preventDefault(), p("/riders");
            }, children: "Riders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(ii, { className: "dropdown-item", to: "/orders", onClick: (v) => {
              v.preventDefault(), p("/orders");
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
    /* @__PURE__ */ d.jsxDEV("main", { className: "content", children: u }, void 0, !1, {
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
    /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
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
function h_({ onClose: u, onCreated: p }) {
  const [v, y] = R.useState(""), [g, C] = R.useState(""), [f, k] = R.useState(""), [D, T] = R.useState(""), [_, x] = R.useState(!1), [A, V] = R.useState(""), [Q, pe] = R.useState(""), [ae, he] = R.useState(!1), [I, $] = R.useState(!1), [G, B] = R.useState(!1), [ge, ce] = R.useState(!1);
  async function X() {
    V(""), pe(""), ce(!0);
    const ie = String(v).trim(), J = String(g), U = String(f).trim(), ve = String(D).trim(), oe = ve.replace(/\D+/g, ""), Te = { fn: !U, cn: !ve, pw: !J };
    if (he(Te.fn), $(Te.cn || oe.length < 7), B(Te.pw), Te.fn || Te.cn || Te.pw) {
      V("Full name, mobile and password are required");
      return;
    }
    if (oe.length < 7) {
      V("Please enter a valid mobile number"), $(!0);
      return;
    }
    if (ie && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ie)) {
      V("Please enter a valid email");
      return;
    }
    if (J.length < 6) {
      B(!0), V("Password must be at least 6 characters");
      return;
    }
    x(!0);
    try {
      const je = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ie, password: J, fullName: U, contactNumber: ve })
      }), Le = await je.json().catch(() => null);
      if (!je.ok) {
        const ye = String(Le && (Le.error || Le.message) || ""), Ge = ye.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ye) || /MISSING\s*EMAIL\/PASSWORD/i.test(ye))
          V("Full name, mobile and password are required"), he(!U), $(!ve || oe.length < 7), B(!J);
        else if (Ge.includes("EMAIL_EXISTS"))
          V("An account with this email already exists. Use a different email or leave email blank.");
        else if (Ge.includes("INVALID_EMAIL"))
          V("Please enter a valid email");
        else if (Ge.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ye))
          B(!0), V("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ye))
          $(!0), V("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ye))
          V("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ye || "Failed to create rider");
        return;
      }
      pe("Rider created successfully"), p && p(), setTimeout(() => {
        u && u();
      }, 600);
    } catch (je) {
      const Le = String((je == null ? void 0 : je.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(Le) ? V("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(Le) ? V("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(Le) ? V("Please enter a valid email") : /WEAK_PASSWORD/i.test(Le) || /AT LEAST 6 CHARACTERS/i.test(Le) ? (B(!0), V("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(Le) ? ($(!0), V("Please enter a valid mobile number")) : V(Le || "Failed to create rider");
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "create-rider-close", onClick: u, "aria-label": "Close", children: "✕" }, void 0, !1, {
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
      Q && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: Q }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && !String(f).trim() ? " input-error" : ""), value: f, onChange: (ie) => {
          k(ie.target.value), ge && he(!String(ie.target.value).trim());
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "email", value: v, onChange: (ie) => {
          y(ie.target.value);
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && !String(g) ? " input-error" : ""), type: "password", value: g, onChange: (ie) => {
          C(ie.target.value), ge && B(!String(ie.target.value));
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && String(D).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: D, onChange: (ie) => {
          if (T(ie.target.value), ge) {
            const J = String(ie.target.value).trim().replace(/\D+/g, "");
            $(!(J.length >= 7));
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: u, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
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
function g_() {
  const [u, p] = R.useState([]), [v, y] = R.useState(""), [g, C] = R.useState("all"), [f, k] = R.useState("all"), [D, T] = R.useState("all"), [_, x] = R.useState(!0), [A, V] = R.useState(""), [Q, pe] = R.useState(1), [ae, he] = R.useState(20), [I, $] = R.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [G, B] = R.useState(!1);
  R.useEffect(() => {
    let X = !0;
    return (async () => {
      var ie, J, U, ve;
      x(!0), V("");
      try {
        const oe = new URLSearchParams();
        v && oe.set("q", v), D !== "all" && oe.set("status", D), g !== "all" && oe.set("lastDays", g), oe.set("page", String(Q)), oe.set("limit", String(ae));
        const Te = await fetch(`/api/riders?${oe.toString()}`, { credentials: "include" });
        if (Te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Te.ok) throw new Error("Failed to load riders");
        const je = await Te.json();
        X && (p(Array.isArray(je.riders) ? je.riders : []), $({ total: ((ie = je.meta) == null ? void 0 : ie.total) || 0, page: ((J = je.meta) == null ? void 0 : J.page) || 1, limit: ((U = je.meta) == null ? void 0 : U.limit) || ae, pages: ((ve = je.meta) == null ? void 0 : ve.pages) || 1 }));
      } catch (oe) {
        X && V(oe.message || "Failed to load riders");
      } finally {
        X && x(!1);
      }
    })(), () => {
      X = !1;
    };
  }, [v, D, g, Q, ae]);
  const ge = R.useMemo(() => u.filter((X) => {
    if (v && !X.name.toLowerCase().includes(v.toLowerCase().trim()) || D !== "all" && X.status !== D || f !== "all" && String(X.id) !== String(f)) return !1;
    if (g !== "all") {
      const ie = parseInt(X.lastActiveDays, 10) || 9999, J = parseInt(g, 10);
      if (!(ie <= J)) return !1;
    }
    return !0;
  }), [u, v, D, f, g]), ce = R.useMemo(() => {
    const X = /* @__PURE__ */ new Date(), ie = [], J = [];
    for (let U = 2; U >= 0; U--) {
      const ve = new Date(X.getFullYear(), X.getMonth() - U, 1), oe = `${ve.getFullYear()}-${String(ve.getMonth() + 1).padStart(2, "0")}`, Te = ve.toLocaleString(void 0, { month: "short", year: "numeric" });
      ie.push(oe), J.push(Te);
    }
    return { keys: ie, labels: J };
  }, []);
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => B(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 81,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 80,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 75,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 87,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: v, onChange: (X) => {
          y(X.target.value), pe(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 88,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 86,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: g, onChange: (X) => {
          C(X.target.value), pe(1);
        }, children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Date Range" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 92,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "7", children: "Last 7 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 93,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "30", children: "Last 30 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 94,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 91,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: f, onChange: (X) => k(X.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 97,
            columnNumber: 15
          }, this),
          u.map((X) => /* @__PURE__ */ d.jsxDEV("option", { value: X.id, children: X.name }, X.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 98,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 96,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (X) => {
          T(X.target.value), pe(1);
        }, children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Status" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "Active", children: "Active" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 102,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "Inactive", children: "Inactive" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 103,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 100,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: ae, onChange: (X) => {
        he(parseInt(X.target.value, 10)), pe(1);
      }, children: [10, 20, 50, 100].map((X) => /* @__PURE__ */ d.jsxDEV("option", { value: X, children: [
        X,
        "/page"
      ] }, X, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 107,
        columnNumber: 39
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 106,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 85,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: [
      G && /* @__PURE__ */ d.jsxDEV(h_, { onClose: () => B(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 113,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 118,
            columnNumber: 17
          }, this),
          ce.labels.map((X, ie) => /* @__PURE__ */ d.jsxDEV("th", { className: "col-month", children: X }, ce.keys[ie], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 120,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 122,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 117,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 116,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("tbody", { children: [
          _ && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 127,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 127,
            columnNumber: 17
          }, this),
          !_ && A && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "auth-error", children: A }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 17
          }, this),
          !_ && !A && ge.map((X) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": X.id, "data-status": X.status, "data-last-days": X.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { className: "rider-name-link", href: `/riders/${X.id}`, children: X.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 134,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 134,
              columnNumber: 19
            }, this),
            ce.keys.map((ie) => {
              var J;
              return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((J = X.monthlyCounts) == null ? void 0 : J[ie]) || 0).toFixed(2),
                " km"
              ] }, ie, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 136,
                columnNumber: 21
              }, this);
            }),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-total", children: [
              Number(X.assignedOrders || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 138,
              columnNumber: 19
            }, this)
          ] }, X.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 133,
            columnNumber: 17
          }, this)),
          !_ && !A && ge.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 142,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 142,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 115,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: I.page <= 1 || _, onClick: () => pe((X) => Math.max(1, X - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 150,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        I.page,
        " of ",
        I.pages,
        " • ",
        I.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 151,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: I.page >= I.pages || _, onClick: () => pe((X) => Math.min(I.pages, X + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 152,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 149,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 148,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 74,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
function y_() {
  const { id: u } = E1(), [p, v] = R.useState(null), [y, g] = R.useState(!0), [C, f] = R.useState("");
  if (R.useEffect(() => {
    let _ = !0;
    return (async () => {
      g(!0), f("");
      try {
        const x = await fetch(`/api/riders/${u}`, { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load rider");
        const A = await x.json();
        _ && v(A);
      } catch (x) {
        _ && f(x.message || "Failed to load rider");
      } finally {
        _ && g(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, [u]), y)
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
  if (!p)
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
  const { rider: k, metrics: D, history: T } = p;
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
function CE({ orderId: u, onClose: p, onAssigned: v }) {
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
        const Q = await V.json();
        A && g(Array.isArray(Q.riders) ? Q.riders : Q.riders || []);
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
    if (!(!u || !A)) {
      _(A);
      try {
        const V = await fetch(`/api/orders/${encodeURIComponent(u)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: A })
        });
        if (V.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const Q = await V.json().catch(() => null);
        if (!V.ok) throw new Error(Q && Q.error ? Q.error : "Assign failed");
        v && v({ orderId: u, riderId: A }), p();
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "assign-modal-close", onClick: p, "aria-label": "Close", children: "✕" }, void 0, !1, {
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
function Mv(u) {
  if (typeof u != "string") return "";
  const p = u.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return p === "in_transit" ? "in_progress" : p;
}
function DE(u) {
  return u && typeof u.current_status == "string" ? u.current_status : "";
}
function oE(u) {
  return Mv(DE(u));
}
function b_(u) {
  if (!u) return null;
  if (u instanceof Date) return u;
  if (typeof (u == null ? void 0 : u.toDate) == "function")
    try {
      return u.toDate();
    } catch {
      return null;
    }
  if (typeof u == "object" && u.seconds !== void 0) {
    const p = Number(u.seconds);
    if (Number.isFinite(p)) {
      const v = p * 1e3;
      return new Date(v);
    }
  }
  if (typeof u == "number") {
    if (!Number.isFinite(u)) return null;
    if (u > 1e12) return new Date(u);
    if (u > 1e9) return new Date(u * 1e3);
  }
  if (typeof u == "string") {
    const p = Date.parse(u);
    if (Number.isFinite(p)) return new Date(p);
  }
  return null;
}
function N_(u) {
  if (u == null) return "-";
  if (typeof u == "object" && u.minutes !== void 0) {
    const v = Number(u.minutes);
    if (Number.isFinite(v)) return `${v} min`;
  }
  const p = b_(u);
  if (p instanceof Date && !Number.isNaN(p.getTime()))
    try {
      return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
    }
  if (typeof u == "number") {
    const v = Number.isFinite(u) ? Math.round(u) : NaN;
    return Number.isNaN(v) ? "-" : `${v} min`;
  }
  if (typeof u == "string") {
    const v = u.trim();
    if (!v) return "-";
    const y = v.match(/^(\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i);
    return y ? `${y[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : v;
  }
  return String(u);
}
const E_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], uE = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function S_() {
  const [u, p] = R.useState([]), [v, y] = R.useState(""), [g, C] = R.useState("all"), [f, k] = R.useState(1), [D, T] = R.useState(20), [_, x] = R.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [A, V] = R.useState(!0), [Q, pe] = R.useState(""), [ae, he] = R.useState(""), [I, $] = R.useState(!0), [G, B] = R.useState(!1), [ge, ce] = R.useState(null);
  R.useEffect(() => {
    let U = !0;
    return (async () => {
      var ve, oe, Te, je;
      V(!0), pe(""), he("");
      try {
        const Le = new URLSearchParams();
        if (v && Le.set("q", v), g && g !== "all") {
          const Ht = uE[g] || g;
          Le.set("status", Mv(Ht));
        }
        Le.set("page", String(f)), Le.set("limit", String(D));
        const ye = await fetch(`/api/orders?${Le.toString()}`, { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load orders");
        const Ge = await ye.json();
        U && (p(Array.isArray(Ge.orders) ? Ge.orders : []), he(Ge.shopifyError || ""), $(!!Ge.shopifyConfigured), x({ total: ((ve = Ge.meta) == null ? void 0 : ve.total) || 0, page: ((oe = Ge.meta) == null ? void 0 : oe.page) || 1, limit: ((Te = Ge.meta) == null ? void 0 : Te.limit) || D, pages: ((je = Ge.meta) == null ? void 0 : je.pages) || 1 }));
      } catch (Le) {
        U && pe(Le.message || "Failed to load orders");
      } finally {
        U && V(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [v, g, f, D]), R.useMemo(() => u, [u]);
  const X = R.useMemo(() => {
    if (!Array.isArray(u)) return [];
    if (g === "all") return u.slice();
    const U = Mv(uE[g] || g);
    return u.filter((ve) => oE(ve) === U);
  }, [u, g]);
  function ie() {
    ce(null), B(!1);
  }
  function J(U) {
    try {
      const { orderId: ve } = U || {};
      if (!ve) return;
      const oe = String(ve).replace(/^#+/, "");
      k(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${ve}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 158,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 159,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 157,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 164,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: v, onChange: (U) => {
          y(U.target.value), k(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 165,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 163,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        E_.map(({ key: U, label: ve }) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${g === U ? " active" : ""}`, onClick: () => {
          C(U), k(1);
        }, "data-filter": U, children: ve }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 169,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (U) => {
          T(parseInt(U.target.value, 10)), k(1);
        }, children: [10, 20, 50, 100].map((U) => /* @__PURE__ */ d.jsxDEV("option", { value: U, children: [
          U,
          "/page"
        ] }, U, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 174,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 173,
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
    }, this),
    !I && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 180,
      columnNumber: 11
    }, this),
    ae && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ae }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 182,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 188,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 189,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 190,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 191,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected", children: "Expected Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 192,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual", children: "Actual Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 193,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 194,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 187,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 186,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        A && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 199,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 199,
          columnNumber: 17
        }, this),
        !A && Q && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: Q }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 202,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 202,
          columnNumber: 17
        }, this),
        !A && !Q && X.map((U, ve) => {
          var Ge;
          const oe = DE(U), Te = oE(U), je = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let Le = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? Le = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? Le = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((Ht) => String(Ht || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? Le = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (Le = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((Ht) => String(Ht || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = U.name || U.order_number || U.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Te, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: ye }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 224,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: je || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 225,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: Le }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 226,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider", children: U.rider ? String(U.rider) : (Ge = U.assignment) != null && Ge.riderId ? String(U.assignment.riderId) : "Unassigned" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 227,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected", children: N_(U.expected_delivery_time) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 228,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual", children: U.actual_delivery_time ? new Date(U.actual_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 229,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Te}`, children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 230,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 230,
              columnNumber: 21
            }, this)
          ] }, ye || ve, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 223,
            columnNumber: 19
          }, this);
        }),
        !A && !Q && X.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 235,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 235,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 197,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 185,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 184,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      G && ge && /* @__PURE__ */ d.jsxDEV(CE, { orderId: ge, onClose: ie, onAssigned: J }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 242,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || A, onClick: () => k((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 246,
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
          lineNumber: 247,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || A, onClick: () => k((U) => Math.min(_.pages, U + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 248,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 245,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 240,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 156,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 155,
    columnNumber: 5
  }, this);
}
function x_() {
  const [u, p] = R.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [v, y] = R.useState([]), [g, C] = R.useState(!1), [f, k] = R.useState(!0), [D, T] = R.useState("");
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
        _ && (p(A.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), y(Array.isArray(A.deliveries) ? A.deliveries : []));
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "reports-stat-value", children: u.totalDeliveries }, void 0, !1, {
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
            u.avgDeliveryMins,
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
          !f && !D && v.map((_, x) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
          !f && !D && v.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
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
function R_() {
  const [u, p] = R.useState([]), [v, y] = R.useState(!0), [g, C] = R.useState(""), [f, k] = R.useState(1), [D, T] = R.useState(25), [_, x] = R.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  R.useEffect(() => {
    let G = !0;
    return (async () => {
      var B, ge, ce, X;
      y(!0), C("");
      try {
        const ie = new URLSearchParams();
        ie.set("limit", String(D)), ie.set("page", String(f));
        const J = await fetch(`/api/orders?${ie.toString()}`, { credentials: "include" });
        if (J.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!J.ok) throw new Error("Failed to load orders");
        const U = await J.json();
        G && (p(Array.isArray(U.orders) ? U.orders : []), x({ total: ((B = U.meta) == null ? void 0 : B.total) || 0, page: ((ge = U.meta) == null ? void 0 : ge.page) || f, limit: ((ce = U.meta) == null ? void 0 : ce.limit) || D, pages: ((X = U.meta) == null ? void 0 : X.pages) || 1 }));
      } catch (ie) {
        G && C(ie.message || "Failed to load orders");
      } finally {
        G && y(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [f]);
  function A(G) {
    return !G || typeof G != "object" ? "new" : typeof G.current_status == "string" && String(G.current_status).trim() ? String(G.current_status).toLowerCase().trim() : "new";
  }
  const [V, Q] = R.useState(!1), [pe, ae] = R.useState(null);
  function he(G) {
    ae(G), Q(!0);
  }
  function I() {
    ae(null), Q(!1);
  }
  function $(G) {
    try {
      const { orderId: B } = G || {};
      if (!B) return;
      const ge = String(B).replace(/^#+/, "");
      p((ce) => ce.filter((X, ie) => {
        const J = String(X.id || X.name || X.order_number || ie).replace(/^#+/, "");
        return String(J) !== String(ge);
      })), x((ce) => ({ ...ce || {}, total: Math.max(0, ((ce == null ? void 0 : ce.total) || 0) - 1) }));
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: v ? "…" : _.total || u.length }, void 0, !1, {
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
        v && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 28
        }, this),
        !v && g && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: g }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 28
        }, this),
        !v && !g && (Array.isArray(u) ? u.filter((B) => A(B) === "new") : []).map((B, ge) => {
          const ce = A(B), X = B.full_name || (B.customer && B.customer.full_name ? B.customer.full_name : "");
          let ie = "-";
          typeof B.shipping_address == "string" && String(B.shipping_address).trim() ? ie = String(B.shipping_address).trim() : B.shipping_address && typeof B.shipping_address == "object" ? ie = [B.shipping_address.address1 || "", B.shipping_address.city || "", B.shipping_address.province || "", B.shipping_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-" : typeof B.billing_address == "string" && String(B.billing_address).trim() ? ie = String(B.billing_address).trim() : B.billing_address && typeof B.billing_address == "object" && (ie = [B.billing_address.address1 || "", B.billing_address.city || "", B.billing_address.province || "", B.billing_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-");
          const J = B.name || B.order_number || B.id || ge, U = String(B.id || B.name || B.order_number || ge).replace(/^#+/, ""), ve = B.created_at ? new Date(B.created_at) : null, oe = ve ? ve.toLocaleDateString() : "-", Te = ve ? ve.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": ce, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: J }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 122,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: X || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 123,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${ce}`, children: ce.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: Te }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => he(String(B.id || B.name || B.order_number || ge)), children: "Assign Rider" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this)
          ] }, U, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 121,
            columnNumber: 21
          }, this);
        }),
        !v && !g && u.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || v, onClick: () => k((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || v, onClick: () => k((G) => Math.min(_.pages, G + 1)), children: "Next" }, void 0, !1, {
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
    V && pe && /* @__PURE__ */ d.jsxDEV(CE, { orderId: pe, onClose: I, onAssigned: $ }, void 0, !1, {
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
function C_() {
  return /* @__PURE__ */ d.jsxDEV(e_, { children: /* @__PURE__ */ d.jsxDEV(z1, { children: [
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(p_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(m_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(g_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(S_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(x_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(R_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(U1, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function sE() {
  const u = document.getElementById("react-root");
  if (!u) return;
  vE(u).render(/* @__PURE__ */ d.jsxDEV(C_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", sE) : sE();
