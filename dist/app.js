function Y1(o, p) {
  for (var v = 0; v < p.length; v++) {
    const g = p[v];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const y in g)
        if (y !== "default" && !(y in o)) {
          const R = Object.getOwnPropertyDescriptor(g, y);
          R && Object.defineProperty(o, y, R.get ? R : {
            enumerable: !0,
            get: () => g[y]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }));
}
function I1(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var dE = { exports: {} }, _v = {}, pE = { exports: {} }, yf = { exports: {} };
yf.exports;
(function(o, p) {
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
    var v = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), j = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), ae = Symbol.iterator, he = "@@iterator";
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
    }, P = {
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
    je.ReactDebugCurrentFrame = ce, je.ReactCurrentActQueue = P;
    function Le(c) {
      {
        for (var b = arguments.length, M = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          M[F - 1] = arguments[F];
        Je("warn", c, M);
      }
    }
    function ye(c) {
      {
        for (var b = arguments.length, M = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          M[F - 1] = arguments[F];
        Je("error", c, M);
      }
    }
    function Je(c, b, M) {
      {
        var F = je.ReactDebugCurrentFrame, K = F.getStackAddendum();
        K !== "" && (b += "%s", M = M.concat([K]));
        var Re = M.map(function(de) {
          return String(de);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[c], console, Re);
      }
    }
    var dn = {};
    function Xt(c, b) {
      {
        var M = c.constructor, F = M && (M.displayName || M.name) || "ReactClass", K = F + "." + b;
        if (dn[K])
          return;
        ye("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, F), dn[K] = !0;
      }
    }
    var xn = {
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
      enqueueForceUpdate: function(c, b, M) {
        Xt(c, "forceUpdate");
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
      enqueueReplaceState: function(c, b, M, F) {
        Xt(c, "replaceState");
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
      enqueueSetState: function(c, b, M, F) {
        Xt(c, "setState");
      }
    }, Dt = Object.assign, In = {};
    Object.freeze(In);
    function Jt(c, b, M) {
      this.props = c, this.context = b, this.refs = In, this.updater = M || xn;
    }
    Jt.prototype.isReactComponent = {}, Jt.prototype.setState = function(c, b) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, c, b, "setState");
    }, Jt.prototype.forceUpdate = function(c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    };
    {
      var va = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, na = function(c, b) {
        Object.defineProperty(Jt.prototype, c, {
          get: function() {
            Le("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Tt in va)
        va.hasOwnProperty(Tt) && na(Tt, va[Tt]);
    }
    function pn() {
    }
    pn.prototype = Jt.prototype;
    function Rt(c, b, M) {
      this.props = c, this.context = b, this.refs = In, this.updater = M || xn;
    }
    var Zt = Rt.prototype = new pn();
    Zt.constructor = Rt, Dt(Zt, Jt.prototype), Zt.isPureReactComponent = !0;
    function en() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var kn = Array.isArray;
    function $t(c) {
      return kn(c);
    }
    function Rn(c) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, M = b && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return M;
      }
    }
    function Yt(c) {
      try {
        return It(c), !1;
      } catch {
        return !0;
      }
    }
    function It(c) {
      return "" + c;
    }
    function aa(c) {
      if (Yt(c))
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(c)), It(c);
    }
    function tr(c, b, M) {
      var F = c.displayName;
      if (F)
        return F;
      var K = b.displayName || b.name || "";
      return K !== "" ? M + "(" + K + ")" : M;
    }
    function ha(c) {
      return c.displayName || "Context";
    }
    function Un(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && ye("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case R:
          return "Fragment";
        case y:
          return "Portal";
        case k:
          return "Profiler";
        case f:
          return "StrictMode";
        case E:
          return "Suspense";
        case j:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case T:
            var b = c;
            return ha(b) + ".Consumer";
          case D:
            var M = c;
            return ha(M._context) + ".Provider";
          case L:
            return tr(c, c.render, "ForwardRef");
          case V:
            var F = c.displayName || null;
            return F !== null ? F : Un(c.type) || "Memo";
          case Q: {
            var K = c, Re = K._payload, de = K._init;
            try {
              return Un(de(Re));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var mn = Object.prototype.hasOwnProperty, tn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Cn, Fa, Lt;
    Lt = {};
    function Dn(c) {
      if (mn.call(c, "ref")) {
        var b = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function Fn(c) {
      if (mn.call(c, "key")) {
        var b = Object.getOwnPropertyDescriptor(c, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function _r(c, b) {
      var M = function() {
        Cn || (Cn = !0, ye("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      M.isReactWarning = !0, Object.defineProperty(c, "key", {
        get: M,
        configurable: !0
      });
    }
    function nr(c, b) {
      var M = function() {
        Fa || (Fa = !0, ye("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      M.isReactWarning = !0, Object.defineProperty(c, "ref", {
        get: M,
        configurable: !0
      });
    }
    function ee(c) {
      if (typeof c.ref == "string" && ge.current && c.__self && ge.current.stateNode !== c.__self) {
        var b = Un(ge.current.type);
        Lt[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, c.ref), Lt[b] = !0);
      }
    }
    var be = function(c, b, M, F, K, Re, de) {
      var Me = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: c,
        key: b,
        ref: M,
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
    function Fe(c, b, M) {
      var F, K = {}, Re = null, de = null, Me = null, $e = null;
      if (b != null) {
        Dn(b) && (de = b.ref, ee(b)), Fn(b) && (aa(b.key), Re = "" + b.key), Me = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (F in b)
          mn.call(b, F) && !tn.hasOwnProperty(F) && (K[F] = b[F]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        K.children = M;
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
      var M = be(c.type, b, c.ref, c._self, c._source, c._owner, c.props);
      return M;
    }
    function ct(c, b, M) {
      if (c == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
      var F, K = Dt({}, c.props), Re = c.key, de = c.ref, Me = c._self, $e = c._source, tt = c._owner;
      if (b != null) {
        Dn(b) && (de = b.ref, tt = ge.current), Fn(b) && (aa(b.key), Re = "" + b.key);
        var ot;
        c.type && c.type.defaultProps && (ot = c.type.defaultProps);
        for (F in b)
          mn.call(b, F) && !tn.hasOwnProperty(F) && (b[F] === void 0 && ot !== void 0 ? K[F] = ot[F] : K[F] = b[F]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        K.children = M;
      else if (ut > 1) {
        for (var He = Array(ut), vt = 0; vt < ut; vt++)
          He[vt] = arguments[vt + 2];
        K.children = He;
      }
      return be(c.type, Re, de, Me, $e, tt, K);
    }
    function yt(c) {
      return typeof c == "object" && c !== null && c.$$typeof === g;
    }
    var gt = ".", vn = ":";
    function Nt(c) {
      var b = /[=:]/g, M = {
        "=": "=0",
        ":": "=2"
      }, F = c.replace(b, function(K) {
        return M[K];
      });
      return "$" + F;
    }
    var it = !1, Et = /\/+/g;
    function ya(c) {
      return c.replace(Et, "$&/");
    }
    function ga(c, b) {
      return typeof c == "object" && c !== null && c.key != null ? (aa(c.key), Nt("" + c.key)) : b.toString(36);
    }
    function ra(c, b, M, F, K) {
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
              case g:
              case y:
                de = !0;
            }
        }
      if (de) {
        var Me = c, $e = K(Me), tt = F === "" ? gt + ga(Me, 0) : F;
        if ($t($e)) {
          var ot = "";
          tt != null && (ot = ya(tt) + "/"), ra($e, b, ot, "", function(Df) {
            return Df;
          });
        } else $e != null && (yt($e) && ($e.key && (!Me || Me.key !== $e.key) && aa($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          M + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Me || Me.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ya("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var ut, He, vt = 0, jt = F === "" ? gt : F + vn;
      if ($t(c))
        for (var bi = 0; bi < c.length; bi++)
          ut = c[bi], He = jt + ga(ut, bi), vt += ra(ut, b, M, He, K);
      else {
        var go = I(c);
        if (typeof go == "function") {
          var lr = c;
          go === lr.entries && (it || Le("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var bo = go.call(lr), No, Cf = 0; !(No = bo.next()).done; )
            ut = No.value, He = jt + ga(ut, Cf++), vt += ra(ut, b, M, He, K);
        } else if (Re === "object") {
          var ms = String(c);
          throw new Error("Objects are not valid as a React child (found: " + (ms === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : ms) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function ar(c, b, M) {
      if (c == null)
        return c;
      var F = [], K = 0;
      return ra(c, F, "", "", function(Re) {
        return b.call(M, Re, K++);
      }), F;
    }
    function no(c) {
      var b = 0;
      return ar(c, function() {
        b++;
      }), b;
    }
    function si(c, b, M) {
      ar(c, function() {
        b.apply(this, arguments);
      }, M);
    }
    function Ki(c) {
      return ar(c, function(b) {
        return b;
      }) || [];
    }
    function Xi(c) {
      if (!yt(c))
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
      var M = !1, F = !1, K = !1;
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
              return M || (M = !0, ye("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
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
    var ba = -1, ia = 0, qn = 1, za = 2;
    function fi(c) {
      if (c._status === ba) {
        var b = c._result, M = b();
        if (M.then(function(Re) {
          if (c._status === ia || c._status === ba) {
            var de = c;
            de._status = qn, de._result = Re;
          }
        }, function(Re) {
          if (c._status === ia || c._status === ba) {
            var de = c;
            de._status = za, de._result = Re;
          }
        }), c._status === ba) {
          var F = c;
          F._status = ia, F._result = M;
        }
      }
      if (c._status === qn) {
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
        _status: ba,
        _result: c
      }, M = {
        $$typeof: Q,
        _payload: b,
        _init: fi
      };
      {
        var F, K;
        Object.defineProperties(M, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Re, Object.defineProperty(M, "defaultProps", {
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
              ye("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), K = Re, Object.defineProperty(M, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return M;
    }
    function q(c) {
      c != null && c.$$typeof === V ? ye("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof c != "function" ? ye("forwardRef requires a render function but was given %s.", c === null ? "null" : typeof c) : c.length !== 0 && c.length !== 2 && ye("forwardRef render functions accept exactly two parameters: props and ref. %s", c.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), c != null && (c.defaultProps != null || c.propTypes != null) && ye("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: L,
        render: c
      };
      {
        var M;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return M;
          },
          set: function(F) {
            M = F, !c.name && !c.displayName && (c.displayName = F);
          }
        });
      }
      return b;
    }
    var te;
    te = Symbol.for("react.module.reference");
    function Ne(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === R || c === k || Te || c === f || c === E || c === j || oe || c === pe || J || U || ve || typeof c == "object" && c !== null && (c.$$typeof === Q || c.$$typeof === V || c.$$typeof === D || c.$$typeof === T || c.$$typeof === L || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === te || c.getModuleId !== void 0));
    }
    function Be(c, b) {
      Ne(c) || ye("memo: The first argument must be a component. Instead received: %s", c === null ? "null" : typeof c);
      var M = {
        $$typeof: V,
        type: c,
        compare: b === void 0 ? null : b
      };
      {
        var F;
        Object.defineProperty(M, "displayName", {
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
      return M;
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
        var M = c._context;
        M.Consumer === c ? ye("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : M.Provider === c && ye("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(c);
    }
    function Se(c) {
      var b = we();
      return b.useState(c);
    }
    function Mt(c, b, M) {
      var F = we();
      return F.useReducer(c, b, M);
    }
    function ft(c) {
      var b = we();
      return b.useRef(c);
    }
    function dt(c, b) {
      var M = we();
      return M.useEffect(c, b);
    }
    function hn(c, b) {
      var M = we();
      return M.useInsertionEffect(c, b);
    }
    function Ha(c, b) {
      var M = we();
      return M.useLayoutEffect(c, b);
    }
    function Na(c, b) {
      var M = we();
      return M.useCallback(c, b);
    }
    function At(c, b) {
      var M = we();
      return M.useMemo(c, b);
    }
    function di(c, b, M) {
      var F = we();
      return F.useImperativeHandle(c, b, M);
    }
    function Ea(c, b) {
      {
        var M = we();
        return M.useDebugValue(c, b);
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
    function as() {
      var c = we();
      return c.useId();
    }
    function rs(c, b, M) {
      var F = we();
      return F.useSyncExternalStore(c, b, M);
    }
    var Or = 0, ao, ro, io, lo, oo, is, ls;
    function Ji() {
    }
    Ji.__reactDisabledLog = !0;
    function uo() {
      {
        if (Or === 0) {
          ao = console.log, ro = console.info, io = console.warn, lo = console.error, oo = console.group, is = console.groupCollapsed, ls = console.groupEnd;
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
    function Pa() {
      {
        if (Or--, Or === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Dt({}, c, {
              value: ao
            }),
            info: Dt({}, c, {
              value: ro
            }),
            warn: Dt({}, c, {
              value: io
            }),
            error: Dt({}, c, {
              value: lo
            }),
            group: Dt({}, c, {
              value: oo
            }),
            groupCollapsed: Dt({}, c, {
              value: is
            }),
            groupEnd: Dt({}, c, {
              value: ls
            })
          });
        }
        Or < 0 && ye("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = je.ReactCurrentDispatcher, Lr;
    function Zi(c, b, M) {
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
    function os(c, b) {
      if (!c || vi)
        return "";
      {
        var M = el.get(c);
        if (M !== void 0)
          return M;
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
            } catch (jt) {
              F = jt;
            }
            Reflect.construct(c, [], de);
          } else {
            try {
              de.call();
            } catch (jt) {
              F = jt;
            }
            c.call(de.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (jt) {
            F = jt;
          }
          c();
        }
      } catch (jt) {
        if (jt && F && typeof jt.stack == "string") {
          for (var Me = jt.stack.split(`
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
        vi = !1, mi.current = Re, Pa(), Error.prepareStackTrace = K;
      }
      var He = c ? c.displayName || c.name : "", vt = He ? Zi(He) : "";
      return typeof c == "function" && el.set(c, vt), vt;
    }
    function co(c, b, M) {
      return os(c, !1);
    }
    function Nf(c) {
      var b = c.prototype;
      return !!(b && b.isReactComponent);
    }
    function hi(c, b, M) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return os(c, Nf(c));
      if (typeof c == "string")
        return Zi(c);
      switch (c) {
        case E:
          return Zi("Suspense");
        case j:
          return Zi("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case L:
            return co(c.render);
          case V:
            return hi(c.type, b, M);
          case Q: {
            var F = c, K = F._payload, Re = F._init;
            try {
              return hi(Re(K), b, M);
            } catch {
            }
          }
        }
      return "";
    }
    var us = {}, fo = je.ReactDebugCurrentFrame;
    function Qe(c) {
      if (c) {
        var b = c._owner, M = hi(c.type, c._source, b ? b.type : null);
        fo.setExtraStackFrame(M);
      } else
        fo.setExtraStackFrame(null);
    }
    function Ef(c, b, M, F, K) {
      {
        var Re = Function.call.bind(mn);
        for (var de in c)
          if (Re(c, de)) {
            var Me = void 0;
            try {
              if (typeof c[de] != "function") {
                var $e = Error((F || "React class") + ": " + M + " type `" + de + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[de] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Me = c[de](b, de, F, M, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Me = tt;
            }
            Me && !(Me instanceof Error) && (Qe(K), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", M, de, typeof Me), Qe(null)), Me instanceof Error && !(Me.message in us) && (us[Me.message] = !0, Qe(K), ye("Failed %s type: %s", M, Me.message), Qe(null));
          }
      }
    }
    function rr(c) {
      if (c) {
        var b = c._owner, M = hi(c.type, c._source, b ? b.type : null);
        ie(M);
      } else
        ie(null);
    }
    var Ve;
    Ve = !1;
    function po() {
      if (ge.current) {
        var c = Un(ge.current.type);
        if (c)
          return `

Check the render method of \`` + c + "`.";
      }
      return "";
    }
    function Tn(c) {
      if (c !== void 0) {
        var b = c.fileName.replace(/^.*[\\\/]/, ""), M = c.lineNumber;
        return `

Check your code at ` + b + ":" + M + ".";
      }
      return "";
    }
    function yi(c) {
      return c != null ? Tn(c.__source) : "";
    }
    var Mr = {};
    function Sf(c) {
      var b = po();
      if (!b) {
        var M = typeof c == "string" ? c : c.displayName || c.name;
        M && (b = `

Check the top-level render call using <` + M + ">.");
      }
      return b;
    }
    function qt(c, b) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var M = Sf(b);
        if (!Mr[M]) {
          Mr[M] = !0;
          var F = "";
          c && c._owner && c._owner !== ge.current && (F = " It was passed a child from " + Un(c._owner.type) + "."), rr(c), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', M, F), rr(null);
        }
      }
    }
    function mt(c, b) {
      if (typeof c == "object") {
        if ($t(c))
          for (var M = 0; M < c.length; M++) {
            var F = c[M];
            yt(F) && qt(F, b);
          }
        else if (yt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var K = I(c);
          if (typeof K == "function" && K !== c.entries)
            for (var Re = K.call(c), de; !(de = Re.next()).done; )
              yt(de.value) && qt(de.value, b);
        }
      }
    }
    function ss(c) {
      {
        var b = c.type;
        if (b == null || typeof b == "string")
          return;
        var M;
        if (typeof b == "function")
          M = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === L || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === V))
          M = b.propTypes;
        else
          return;
        if (M) {
          var F = Un(b);
          Ef(M, c.props, "prop", F, c);
        } else if (b.PropTypes !== void 0 && !Ve) {
          Ve = !0;
          var K = Un(b);
          ye("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", K || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ye("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(c) {
      {
        for (var b = Object.keys(c.props), M = 0; M < b.length; M++) {
          var F = b[M];
          if (F !== "children" && F !== "key") {
            rr(c), ye("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), rr(null);
            break;
          }
        }
        c.ref !== null && (rr(c), ye("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function jn(c, b, M) {
      var F = Ne(c);
      if (!F) {
        var K = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = yi(b);
        Re ? K += Re : K += po();
        var de;
        c === null ? de = "null" : $t(c) ? de = "array" : c !== void 0 && c.$$typeof === g ? (de = "<" + (Un(c.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : de = typeof c, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", de, K);
      }
      var Me = Fe.apply(this, arguments);
      if (Me == null)
        return Me;
      if (F)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], c);
      return c === R ? la(Me) : ss(Me), Me;
    }
    var Sa = !1;
    function xf(c) {
      var b = jn.bind(null, c);
      return b.type = c, Sa || (Sa = !0, Le("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return Le("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: c
          }), c;
        }
      }), b;
    }
    function mo(c, b, M) {
      for (var F = ct.apply(this, arguments), K = 2; K < arguments.length; K++)
        mt(arguments[K], F.type);
      return ss(F), F;
    }
    function cs(c, b) {
      var M = G.transition;
      G.transition = {};
      var F = G.transition;
      G.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        c();
      } finally {
        if (G.transition = M, M === null && F._updatedFibers) {
          var K = F._updatedFibers.size;
          K > 10 && Le("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
        }
      }
    }
    var vo = !1, tl = null;
    function Rf(c) {
      if (tl === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), M = o && o[b];
          tl = M.call(o, "timers").setImmediate;
        } catch {
          tl = function(K) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && ye("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = K, Re.port2.postMessage(void 0);
          };
        }
      return tl(c);
    }
    var Ar = 0, gi = !1;
    function ho(c) {
      {
        var b = Ar;
        Ar++, P.current === null && (P.current = []);
        var M = P.isBatchingLegacy, F;
        try {
          if (P.isBatchingLegacy = !0, F = c(), !M && P.didScheduleLegacyUpdate) {
            var K = P.current;
            K !== null && (P.didScheduleLegacyUpdate = !1, rl(K));
          }
        } catch (He) {
          throw ir(b), He;
        } finally {
          P.isBatchingLegacy = M;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Re = F, de = !1, Me = {
            then: function(He, vt) {
              de = !0, Re.then(function(jt) {
                ir(b), Ar === 0 ? nl(jt, He, vt) : He(jt);
              }, function(jt) {
                ir(b), vt(jt);
              });
            }
          };
          return !gi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            de || (gi = !0, ye("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Me;
        } else {
          var $e = F;
          if (ir(b), Ar === 0) {
            var tt = P.current;
            tt !== null && (rl(tt), P.current = null);
            var ot = {
              then: function(He, vt) {
                P.current === null ? (P.current = [], nl($e, He, vt)) : He($e);
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
    function nl(c, b, M) {
      {
        var F = P.current;
        if (F !== null)
          try {
            rl(F), Rf(function() {
              F.length === 0 ? (P.current = null, b(c)) : nl(c, b, M);
            });
          } catch (K) {
            M(K);
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
            var M = c[b];
            do
              M = M(!0);
            while (M !== null);
          }
          c.length = 0;
        } catch (F) {
          throw c = c.slice(b + 1), F;
        } finally {
          al = !1;
        }
      }
    }
    var fs = jn, ds = mo, yo = xf, ps = {
      map: ar,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    p.Children = ps, p.Component = Jt, p.Fragment = R, p.Profiler = k, p.PureComponent = Rt, p.StrictMode = f, p.Suspense = E, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = je, p.act = ho, p.cloneElement = ds, p.createContext = ci, p.createElement = fs, p.createFactory = yo, p.createRef = en, p.forwardRef = q, p.isValidElement = yt, p.lazy = N, p.memo = Be, p.startTransition = cs, p.unstable_act = ho, p.useCallback = Na, p.useContext = ke, p.useDebugValue = Ea, p.useDeferredValue = pi, p.useEffect = dt, p.useId = as, p.useImperativeHandle = di, p.useInsertionEffect = hn, p.useLayoutEffect = Ha, p.useMemo = At, p.useReducer = Mt, p.useRef = ft, p.useState = Se, p.useSyncExternalStore = rs, p.useTransition = ze, p.version = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(yf, yf.exports);
var q1 = yf.exports;
pE.exports = q1;
var C = pE.exports;
const G1 = /* @__PURE__ */ I1(C), W1 = /* @__PURE__ */ Y1({
  __proto__: null,
  default: G1
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
  var o = C, p = Symbol.for("react.element"), v = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), k = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), Q = Symbol.iterator, pe = "@@iterator";
  function ae(N) {
    if (N === null || typeof N != "object")
      return null;
    var q = Q && N[Q] || N[pe];
    return typeof q == "function" ? q : null;
  }
  var he = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function I(N) {
    {
      for (var q = arguments.length, te = new Array(q > 1 ? q - 1 : 0), Ne = 1; Ne < q; Ne++)
        te[Ne - 1] = arguments[Ne];
      $("error", N, te);
    }
  }
  function $(N, q, te) {
    {
      var Ne = he.ReactDebugCurrentFrame, Be = Ne.getStackAddendum();
      Be !== "" && (q += "%s", te = te.concat([Be]));
      var we = te.map(function(ke) {
        return String(ke);
      });
      we.unshift("Warning: " + q), Function.prototype.apply.call(console[N], console, we);
    }
  }
  var G = !1, P = !1, ge = !1, ce = !1, X = !1, ie;
  ie = Symbol.for("react.module.reference");
  function J(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === R || X || N === y || N === T || N === L || ce || N === V || G || P || ge || typeof N == "object" && N !== null && (N.$$typeof === j || N.$$typeof === E || N.$$typeof === f || N.$$typeof === k || N.$$typeof === D || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === ie || N.getModuleId !== void 0));
  }
  function U(N, q, te) {
    var Ne = N.displayName;
    if (Ne)
      return Ne;
    var Be = q.displayName || q.name || "";
    return Be !== "" ? te + "(" + Be + ")" : te;
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
      case g:
        return "Fragment";
      case v:
        return "Portal";
      case R:
        return "Profiler";
      case y:
        return "StrictMode";
      case T:
        return "Suspense";
      case L:
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
        case E:
          var Ne = N.displayName || null;
          return Ne !== null ? Ne : oe(N.type) || "Memo";
        case j: {
          var Be = N, we = Be._payload, ke = Be._init;
          try {
            return oe(ke(we));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Te = Object.assign, je = 0, Le, ye, Je, dn, Xt, xn, Dt;
  function In() {
  }
  In.__reactDisabledLog = !0;
  function Jt() {
    {
      if (je === 0) {
        Le = console.log, ye = console.info, Je = console.warn, dn = console.error, Xt = console.group, xn = console.groupCollapsed, Dt = console.groupEnd;
        var N = {
          configurable: !0,
          enumerable: !0,
          value: In,
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
  function va() {
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
            value: Je
          }),
          error: Te({}, N, {
            value: dn
          }),
          group: Te({}, N, {
            value: Xt
          }),
          groupCollapsed: Te({}, N, {
            value: xn
          }),
          groupEnd: Te({}, N, {
            value: Dt
          })
        });
      }
      je < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = he.ReactCurrentDispatcher, Tt;
  function pn(N, q, te) {
    {
      if (Tt === void 0)
        try {
          throw Error();
        } catch (Be) {
          var Ne = Be.stack.trim().match(/\n( *(at )?)/);
          Tt = Ne && Ne[1] || "";
        }
      return `
` + Tt + N;
    }
  }
  var Rt = !1, Zt;
  {
    var en = typeof WeakMap == "function" ? WeakMap : Map;
    Zt = new en();
  }
  function kn(N, q) {
    if (!N || Rt)
      return "";
    {
      var te = Zt.get(N);
      if (te !== void 0)
        return te;
    }
    var Ne;
    Rt = !0;
    var Be = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var we;
    we = na.current, na.current = null, Jt();
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
          } catch (At) {
            Ne = At;
          }
          Reflect.construct(N, [], ke);
        } else {
          try {
            ke.call();
          } catch (At) {
            Ne = At;
          }
          N.call(ke.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (At) {
          Ne = At;
        }
        N();
      }
    } catch (At) {
      if (At && Ne && typeof At.stack == "string") {
        for (var Se = At.stack.split(`
`), Mt = Ne.stack.split(`
`), ft = Se.length - 1, dt = Mt.length - 1; ft >= 1 && dt >= 0 && Se[ft] !== Mt[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (Se[ft] !== Mt[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || Se[ft] !== Mt[dt]) {
                  var hn = `
` + Se[ft].replace(" at new ", " at ");
                  return N.displayName && hn.includes("<anonymous>") && (hn = hn.replace("<anonymous>", N.displayName)), typeof N == "function" && Zt.set(N, hn), hn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Rt = !1, na.current = we, va(), Error.prepareStackTrace = Be;
    }
    var Ha = N ? N.displayName || N.name : "", Na = Ha ? pn(Ha) : "";
    return typeof N == "function" && Zt.set(N, Na), Na;
  }
  function $t(N, q, te) {
    return kn(N, !1);
  }
  function Rn(N) {
    var q = N.prototype;
    return !!(q && q.isReactComponent);
  }
  function Yt(N, q, te) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return pn(N);
    switch (N) {
      case T:
        return pn("Suspense");
      case L:
        return pn("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case D:
          return $t(N.render);
        case E:
          return Yt(N.type, q, te);
        case j: {
          var Ne = N, Be = Ne._payload, we = Ne._init;
          try {
            return Yt(we(Be), q, te);
          } catch {
          }
        }
      }
    return "";
  }
  var It = Object.prototype.hasOwnProperty, aa = {}, tr = he.ReactDebugCurrentFrame;
  function ha(N) {
    if (N) {
      var q = N._owner, te = Yt(N.type, N._source, q ? q.type : null);
      tr.setExtraStackFrame(te);
    } else
      tr.setExtraStackFrame(null);
  }
  function Un(N, q, te, Ne, Be) {
    {
      var we = Function.call.bind(It);
      for (var ke in N)
        if (we(N, ke)) {
          var Se = void 0;
          try {
            if (typeof N[ke] != "function") {
              var Mt = Error((Ne || "React class") + ": " + te + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Mt.name = "Invariant Violation", Mt;
            }
            Se = N[ke](q, ke, Ne, te, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Se = ft;
          }
          Se && !(Se instanceof Error) && (ha(Be), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", te, ke, typeof Se), ha(null)), Se instanceof Error && !(Se.message in aa) && (aa[Se.message] = !0, ha(Be), I("Failed %s type: %s", te, Se.message), ha(null));
        }
    }
  }
  var mn = Array.isArray;
  function tn(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var q = typeof Symbol == "function" && Symbol.toStringTag, te = q && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return te;
    }
  }
  function Fa(N) {
    try {
      return Lt(N), !1;
    } catch {
      return !0;
    }
  }
  function Lt(N) {
    return "" + N;
  }
  function Dn(N) {
    if (Fa(N))
      return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Lt(N);
  }
  var Fn = he.ReactCurrentOwner, _r = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, ee, be;
  be = {};
  function Fe(N) {
    if (It.call(N, "ref")) {
      var q = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (q && q.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if (It.call(N, "key")) {
      var q = Object.getOwnPropertyDescriptor(N, "key").get;
      if (q && q.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, q) {
    if (typeof N.ref == "string" && Fn.current && q && Fn.current.stateNode !== q) {
      var te = oe(Fn.current.type);
      be[te] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', oe(Fn.current.type), N.ref), be[te] = !0);
    }
  }
  function yt(N, q) {
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
  function gt(N, q) {
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
  var vn = function(N, q, te, Ne, Be, we, ke) {
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
      value: Be
    }), Object.freeze && (Object.freeze(Se.props), Object.freeze(Se)), Se;
  };
  function Nt(N, q, te, Ne, Be) {
    {
      var we, ke = {}, Se = null, Mt = null;
      te !== void 0 && (Dn(te), Se = "" + te), et(q) && (Dn(q.key), Se = "" + q.key), Fe(q) && (Mt = q.ref, ct(q, Be));
      for (we in q)
        It.call(q, we) && !_r.hasOwnProperty(we) && (ke[we] = q[we]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (we in ft)
          ke[we] === void 0 && (ke[we] = ft[we]);
      }
      if (Se || Mt) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Se && yt(ke, dt), Mt && gt(ke, dt);
      }
      return vn(N, Se, Mt, Be, Ne, Fn.current, ke);
    }
  }
  var it = he.ReactCurrentOwner, Et = he.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var q = N._owner, te = Yt(N.type, N._source, q ? q.type : null);
      Et.setExtraStackFrame(te);
    } else
      Et.setExtraStackFrame(null);
  }
  var ga;
  ga = !1;
  function ra(N) {
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
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + oe(N._owner.type) + "."), ya(N), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', te, Ne), ya(null);
    }
  }
  function ci(N, q) {
    {
      if (typeof N != "object")
        return;
      if (tn(N))
        for (var te = 0; te < N.length; te++) {
          var Ne = N[te];
          ra(Ne) && Xi(Ne, q);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Be = ae(N);
        if (typeof Be == "function" && Be !== N.entries)
          for (var we = Be.call(N), ke; !(ke = we.next()).done; )
            ra(ke.value) && Xi(ke.value, q);
      }
    }
  }
  function ba(N) {
    {
      var q = N.type;
      if (q == null || typeof q == "string")
        return;
      var te;
      if (typeof q == "function")
        te = q.propTypes;
      else if (typeof q == "object" && (q.$$typeof === D || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      q.$$typeof === E))
        te = q.propTypes;
      else
        return;
      if (te) {
        var Ne = oe(q);
        Un(te, N.props, "prop", Ne, N);
      } else if (q.PropTypes !== void 0 && !ga) {
        ga = !0;
        var Be = oe(q);
        I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Be || "Unknown");
      }
      typeof q.getDefaultProps == "function" && !q.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var q = Object.keys(N.props), te = 0; te < q.length; te++) {
        var Ne = q[te];
        if (Ne !== "children" && Ne !== "key") {
          ya(N), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ne), ya(null);
          break;
        }
      }
      N.ref !== null && (ya(N), I("Invalid attribute `ref` supplied to `React.Fragment`."), ya(null));
    }
  }
  var qn = {};
  function za(N, q, te, Ne, Be, we) {
    {
      var ke = J(N);
      if (!ke) {
        var Se = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Mt = no(Be);
        Mt ? Se += Mt : Se += ar();
        var ft;
        N === null ? ft = "null" : tn(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (oe(N.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Se);
      }
      var dt = Nt(N, q, te, Be, we);
      if (dt == null)
        return dt;
      if (ke) {
        var hn = q.children;
        if (hn !== void 0)
          if (Ne)
            if (tn(hn)) {
              for (var Ha = 0; Ha < hn.length; Ha++)
                ci(hn[Ha], N);
              Object.freeze && Object.freeze(hn);
            } else
              I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(hn, N);
      }
      if (It.call(q, "key")) {
        var Na = oe(N), At = Object.keys(q).filter(function(ze) {
          return ze !== "key";
        }), di = At.length > 0 ? "{key: someKey, " + At.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Na + di]) {
          var Ea = At.length > 0 ? "{" + At.join(": ..., ") + ": ...}" : "{}";
          I(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, Na, Ea, Na), qn[Na + di] = !0;
        }
      }
      return N === g ? ia(dt) : ba(dt), dt;
    }
  }
  var fi = za;
  _v.Fragment = g, _v.jsxDEV = fi;
})();
dE.exports = _v;
var d = dE.exports, mE = { exports: {} }, ta = {}, vE = { exports: {} }, hE = {};
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
    var p = !1, v = 5;
    function g(ee, be) {
      var Fe = ee.length;
      ee.push(be), f(ee, be, Fe);
    }
    function y(ee) {
      return ee.length === 0 ? null : ee[0];
    }
    function R(ee) {
      if (ee.length === 0)
        return null;
      var be = ee[0], Fe = ee.pop();
      return Fe !== be && (ee[0] = Fe, k(ee, Fe, 0)), be;
    }
    function f(ee, be, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, yt = ee[ct];
        if (D(yt, be) > 0)
          ee[ct] = be, ee[et] = yt, et = ct;
        else
          return;
      }
    }
    function k(ee, be, Fe) {
      for (var et = Fe, ct = ee.length, yt = ct >>> 1; et < yt; ) {
        var gt = (et + 1) * 2 - 1, vn = ee[gt], Nt = gt + 1, it = ee[Nt];
        if (D(vn, be) < 0)
          Nt < ct && D(it, vn) < 0 ? (ee[et] = it, ee[Nt] = be, et = Nt) : (ee[et] = vn, ee[gt] = be, et = gt);
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
    var T = 1, L = 2, E = 3, j = 4, V = 5;
    function Q(ee, be) {
    }
    var pe = typeof performance == "object" && typeof performance.now == "function";
    if (pe) {
      var ae = performance;
      o.unstable_now = function() {
        return ae.now();
      };
    } else {
      var he = Date, I = he.now();
      o.unstable_now = function() {
        return he.now() - I;
      };
    }
    var $ = 1073741823, G = -1, P = 250, ge = 5e3, ce = 1e4, X = $, ie = [], J = [], U = 1, ve = null, oe = E, Te = !1, je = !1, Le = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, dn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Xt(ee) {
      for (var be = y(J); be !== null; ) {
        if (be.callback === null)
          R(J);
        else if (be.startTime <= ee)
          R(J), be.sortIndex = be.expirationTime, g(ie, be);
        else
          return;
        be = y(J);
      }
    }
    function xn(ee) {
      if (Le = !1, Xt(ee), !je)
        if (y(ie) !== null)
          je = !0, Lt(Dt);
        else {
          var be = y(J);
          be !== null && Dn(xn, be.startTime - ee);
        }
    }
    function Dt(ee, be) {
      je = !1, Le && (Le = !1, Fn()), Te = !0;
      var Fe = oe;
      try {
        var et;
        if (!p) return In(ee, be);
      } finally {
        ve = null, oe = Fe, Te = !1;
      }
    }
    function In(ee, be) {
      var Fe = be;
      for (Xt(Fe), ve = y(ie); ve !== null && !(ve.expirationTime > Fe && (!ee || tr())); ) {
        var et = ve.callback;
        if (typeof et == "function") {
          ve.callback = null, oe = ve.priorityLevel;
          var ct = ve.expirationTime <= Fe, yt = et(ct);
          Fe = o.unstable_now(), typeof yt == "function" ? ve.callback = yt : ve === y(ie) && R(ie), Xt(Fe);
        } else
          R(ie);
        ve = y(ie);
      }
      if (ve !== null)
        return !0;
      var gt = y(J);
      return gt !== null && Dn(xn, gt.startTime - Fe), !1;
    }
    function Jt(ee, be) {
      switch (ee) {
        case T:
        case L:
        case E:
        case j:
        case V:
          break;
        default:
          ee = E;
      }
      var Fe = oe;
      oe = ee;
      try {
        return be();
      } finally {
        oe = Fe;
      }
    }
    function va(ee) {
      var be;
      switch (oe) {
        case T:
        case L:
        case E:
          be = E;
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
    function na(ee) {
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
    function Tt(ee, be, Fe) {
      var et = o.unstable_now(), ct;
      if (typeof Fe == "object" && Fe !== null) {
        var yt = Fe.delay;
        typeof yt == "number" && yt > 0 ? ct = et + yt : ct = et;
      } else
        ct = et;
      var gt;
      switch (ee) {
        case T:
          gt = G;
          break;
        case L:
          gt = P;
          break;
        case V:
          gt = X;
          break;
        case j:
          gt = ce;
          break;
        case E:
        default:
          gt = ge;
          break;
      }
      var vn = ct + gt, Nt = {
        id: U++,
        callback: be,
        priorityLevel: ee,
        startTime: ct,
        expirationTime: vn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, g(J, Nt), y(ie) === null && Nt === y(J) && (Le ? Fn() : Le = !0, Dn(xn, ct - et))) : (Nt.sortIndex = vn, g(ie, Nt), !je && !Te && (je = !0, Lt(Dt))), Nt;
    }
    function pn() {
    }
    function Rt() {
      !je && !Te && (je = !0, Lt(Dt));
    }
    function Zt() {
      return y(ie);
    }
    function en(ee) {
      ee.callback = null;
    }
    function kn() {
      return oe;
    }
    var $t = !1, Rn = null, Yt = -1, It = v, aa = -1;
    function tr() {
      var ee = o.unstable_now() - aa;
      return !(ee < It);
    }
    function ha() {
    }
    function Un(ee) {
      if (ee < 0 || ee > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ee > 0 ? It = Math.floor(1e3 / ee) : It = v;
    }
    var mn = function() {
      if (Rn !== null) {
        var ee = o.unstable_now();
        aa = ee;
        var be = !0, Fe = !0;
        try {
          Fe = Rn(be, ee);
        } finally {
          Fe ? tn() : ($t = !1, Rn = null);
        }
      } else
        $t = !1;
    }, tn;
    if (typeof dn == "function")
      tn = function() {
        dn(mn);
      };
    else if (typeof MessageChannel < "u") {
      var Cn = new MessageChannel(), Fa = Cn.port2;
      Cn.port1.onmessage = mn, tn = function() {
        Fa.postMessage(null);
      };
    } else
      tn = function() {
        ye(mn, 0);
      };
    function Lt(ee) {
      Rn = ee, $t || ($t = !0, tn());
    }
    function Dn(ee, be) {
      Yt = ye(function() {
        ee(o.unstable_now());
      }, be);
    }
    function Fn() {
      Je(Yt), Yt = -1;
    }
    var _r = ha, nr = null;
    o.unstable_IdlePriority = V, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = j, o.unstable_NormalPriority = E, o.unstable_Profiling = nr, o.unstable_UserBlockingPriority = L, o.unstable_cancelCallback = en, o.unstable_continueExecution = Rt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = Zt, o.unstable_next = va, o.unstable_pauseExecution = pn, o.unstable_requestPaint = _r, o.unstable_runWithPriority = Jt, o.unstable_scheduleCallback = Tt, o.unstable_shouldYield = tr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hE);
vE.exports = hE;
var Q1 = vE.exports;
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
  var o = C, p = Q1, v = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function R(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      k("warn", e, n);
    }
  }
  function f(e) {
    if (!g) {
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
  var D = 0, T = 1, L = 2, E = 3, j = 4, V = 5, Q = 6, pe = 7, ae = 8, he = 9, I = 10, $ = 11, G = 12, P = 13, ge = 14, ce = 15, X = 16, ie = 17, J = 18, U = 19, ve = 21, oe = 22, Te = 23, je = 24, Le = 25, ye = !0, Je = !1, dn = !1, Xt = !1, xn = !1, Dt = !0, In = !0, Jt = !0, va = !0, na = /* @__PURE__ */ new Set(), Tt = {}, pn = {};
  function Rt(e, t) {
    Zt(e, t), Zt(e + "Capture", t);
  }
  function Zt(e, t) {
    Tt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Tt[e] = t;
    {
      var n = e.toLowerCase();
      pn[n] = e, e === "onDoubleClick" && (pn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      na.add(t[a]);
  }
  var en = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", kn = Object.prototype.hasOwnProperty;
  function $t(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Rn(e) {
    try {
      return Yt(e), !1;
    } catch {
      return !0;
    }
  }
  function Yt(e) {
    return "" + e;
  }
  function It(e, t) {
    if (Rn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, $t(e)), Yt(e);
  }
  function aa(e) {
    if (Rn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $t(e)), Yt(e);
  }
  function tr(e, t) {
    if (Rn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, $t(e)), Yt(e);
  }
  function ha(e, t) {
    if (Rn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, $t(e)), Yt(e);
  }
  function Un(e) {
    if (Rn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", $t(e)), Yt(e);
  }
  function mn(e) {
    if (Rn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", $t(e)), Yt(e);
  }
  var tn = 0, Cn = 1, Fa = 2, Lt = 3, Dn = 4, Fn = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + nr + "][" + ee + "]*$"), Fe = {}, et = {};
  function ct(e) {
    return kn.call(et, e) ? !0 : kn.call(Fe, e) ? !1 : be.test(e) ? (et[e] = !0, !0) : (Fe[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function yt(e, t, n) {
    return t !== null ? t.type === tn : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function gt(e, t, n, a) {
    if (n !== null && n.type === tn)
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
  function vn(e, t, n, a) {
    if (t === null || typeof t > "u" || gt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Lt:
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
  function Nt(e) {
    return Et.hasOwnProperty(e) ? Et[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Fa || t === Lt || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Et = {}, ya = [
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
  ya.forEach(function(e) {
    Et[e] = new it(
      e,
      tn,
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
    Et[e] = new it(
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
    Et[e] = new it(
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
    Et[e] = new it(
      e,
      Lt,
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
      Lt,
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
  var ga = /[\-\:]([a-z])/g, ra = function(e) {
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
    var t = e.replace(ga, ra);
    Et[t] = new it(
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
    var t = e.replace(ga, ra);
    Et[t] = new it(
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
    var t = e.replace(ga, ra);
    Et[t] = new it(
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
    Et[e] = new it(
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
  Et[ar] = new it(
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
    Et[e] = new it(
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
      It(n, t), a.sanitizeURL && Ki("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Dn) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : vn(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (vn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Lt)
          return n;
        l = e.getAttribute(i);
      }
      return vn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function ci(e, t, n, a) {
    {
      if (!ct(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return It(n, t), r === "" + n ? n : r;
    }
  }
  function ba(e, t, n, a) {
    var r = Nt(t);
    if (!yt(t, r, a)) {
      if (vn(t, n, r, a) && (n = null), a || r === null) {
        if (ct(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (It(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var s = r.type;
          e[u] = s === Lt ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var m = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(m);
      else {
        var x = r.type, S;
        x === Lt || x === Dn && n === !0 ? S = "" : (It(n, m), S = "" + n, r.sanitizeURL && Ki(S.toString())), h ? e.setAttributeNS(h, m, S) : e.setAttribute(m, S);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), q = Symbol.for("react.provider"), te = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Be = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), Mt = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Ha = Symbol.for("react.cache"), Na = Symbol.for("react.tracing_marker"), At = Symbol.iterator, di = "@@iterator";
  function Ea(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = At && e[At] || e[di];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, pi = 0, as, rs, Or, ao, ro, io, lo;
  function oo() {
  }
  oo.__reactDisabledLog = !0;
  function is() {
    {
      if (pi === 0) {
        as = console.log, rs = console.info, Or = console.warn, ao = console.error, ro = console.group, io = console.groupCollapsed, lo = console.groupEnd;
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
  function ls() {
    {
      if (pi--, pi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ze({}, e, {
            value: as
          }),
          info: ze({}, e, {
            value: rs
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
  function Pa(e, t, n) {
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
    i = Ji.current, Ji.current = null, is();
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
          } catch (A) {
            a = A;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (A) {
            a = A;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (A) {
          a = A;
        }
        e();
      }
    } catch (A) {
      if (A && a && typeof A.stack == "string") {
        for (var u = A.stack.split(`
`), s = a.stack.split(`
`), m = u.length - 1, h = s.length - 1; m >= 1 && h >= 0 && u[m] !== s[h]; )
          h--;
        for (; m >= 1 && h >= 0; m--, h--)
          if (u[m] !== s[h]) {
            if (m !== 1 || h !== 1)
              do
                if (m--, h--, h < 0 || u[m] !== s[h]) {
                  var x = `
` + u[m].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, x), x;
                }
              while (m >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      mi = !1, Ji.current = i, ls(), Error.prepareStackTrace = r;
    }
    var S = e ? e.displayName || e.name : "", O = S ? Pa(S) : "";
    return typeof e == "function" && Lr.set(e, O), O;
  }
  function el(e, t, n) {
    return vi(e, !0);
  }
  function so(e, t, n) {
    return vi(e, !1);
  }
  function os(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function co(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return vi(e, os(e));
    if (typeof e == "string")
      return Pa(e);
    switch (e) {
      case Be:
        return Pa("Suspense");
      case we:
        return Pa("SuspenseList");
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
  function Nf(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case V:
        return Pa(e.type);
      case X:
        return Pa("Lazy");
      case P:
        return Pa("Suspense");
      case U:
        return Pa("SuspenseList");
      case D:
      case L:
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
        t += Nf(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function us(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function fo(e) {
    return e.displayName || "Context";
  }
  function Qe(e) {
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
      case Be:
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
          return us(e, e.render, "ForwardRef");
        case ke:
          var a = e.displayName || null;
          return a !== null ? a : Qe(e.type) || "Memo";
        case Se: {
          var r = e, i = r._payload, l = r._init;
          try {
            return Qe(l(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function Ef(e, t, n) {
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
        return Ef(n, n.render, "ForwardRef");
      case pe:
        return "Fragment";
      case V:
        return n;
      case j:
        return "Portal";
      case E:
        return "Root";
      case Q:
        return "Text";
      case X:
        return Qe(n);
      case ae:
        return n === fi ? "StrictMode" : "Mode";
      case oe:
        return "Offscreen";
      case G:
        return "Profiler";
      case ve:
        return "Scope";
      case P:
        return "Suspense";
      case U:
        return "SuspenseList";
      case Le:
        return "TracingMarker";
      case T:
      case D:
      case ie:
      case L:
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
  var po = v.ReactDebugCurrentFrame, Tn = null, yi = !1;
  function Mr() {
    {
      if (Tn === null)
        return null;
      var e = Tn._debugOwner;
      if (e !== null && typeof e < "u")
        return Ve(e);
    }
    return null;
  }
  function Sf() {
    return Tn === null ? "" : hi(Tn);
  }
  function qt() {
    po.getCurrentStack = null, Tn = null, yi = !1;
  }
  function mt(e) {
    po.getCurrentStack = e === null ? null : Sf, Tn = e, yi = !1;
  }
  function ss() {
    return Tn;
  }
  function la(e) {
    yi = e;
  }
  function jn(e) {
    return "" + e;
  }
  function Sa(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return mn(e), e;
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
  function cs(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function vo(e) {
    return e._valueTracker;
  }
  function tl(e) {
    e._valueTracker = null;
  }
  function Rf(e) {
    var t = "";
    return e && (cs(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ar(e) {
    var t = cs(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    mn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(u) {
          mn(u), a = "" + u, i.call(this, u);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(u) {
          mn(u), a = "" + u;
        },
        stopTracking: function() {
          tl(e), delete e[t];
        }
      };
      return l;
    }
  }
  function gi(e) {
    vo(e) || (e._valueTracker = Ar(e));
  }
  function ho(e) {
    if (!e)
      return !1;
    var t = vo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = Rf(e);
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
  var nl = !1, al = !1, rl = !1, fs = !1;
  function ds(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function yo(e, t) {
    var n = e, a = t.checked, r = ze({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function ps(e, t) {
    mo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !al && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), al = !0), t.value !== void 0 && t.defaultValue !== void 0 && !nl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), nl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Sa(t.value != null ? t.value : a),
      controlled: ds(t)
    };
  }
  function c(e, t) {
    var n = e, a = t.checked;
    a != null && ba(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = ds(t);
      !n._wrapperState.controlled && a && !fs && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), fs = !0), n._wrapperState.controlled && !a && !rl && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), rl = !0);
    }
    c(e, t);
    var r = Sa(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = jn(r)) : n.value !== jn(r) && (n.value = jn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Re(n, t.type, r) : t.hasOwnProperty("defaultValue") && Re(n, t.type, Sa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function M(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = jn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var u = a.name;
    u !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, u !== "" && (a.name = u);
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
      It(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var u = Zs(l);
          if (!u)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          ho(l), b(l, u);
        }
      }
    }
  }
  function Re(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var de = !1, Me = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Me || (Me = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !de && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), de = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", jn(Sa(t.value)));
  }
  var ut = Array.isArray;
  function He(e) {
    return ut(e);
  }
  var vt;
  vt = !1;
  function jt() {
    var e = Mr();
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
          var a = He(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, jt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, jt());
        }
      }
    }
  }
  function lr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var s = 0; s < r.length; s++) {
        var m = l.hasOwnProperty("$" + r[s].value);
        r[s].selected !== m && (r[s].selected = m), m && a && (r[s].defaultSelected = !0);
      }
    } else {
      for (var h = jn(Sa(n)), x = null, S = 0; S < r.length; S++) {
        if (r[S].value === h) {
          r[S].selected = !0, a && (r[S].defaultSelected = !0);
          return;
        }
        x === null && !r[S].disabled && (x = r[S]);
      }
      x !== null && (x.selected = !0);
    }
  }
  function bo(e, t) {
    return ze({}, t, {
      value: void 0
    });
  }
  function No(e, t) {
    var n = e;
    go(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !vt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), vt = !0);
  }
  function Cf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? lr(n, !!t.multiple, a, !1) : t.defaultValue != null && lr(n, !!t.multiple, t.defaultValue, !0);
  }
  function ms(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? lr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? lr(n, !!t.multiple, t.defaultValue, !0) : lr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function Df(e, t) {
    var n = e, a = t.value;
    a != null && lr(n, !!t.multiple, a, !1);
  }
  var Yv = !1;
  function Tf(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = ze({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: jn(n._wrapperState.initialValue)
    });
    return a;
  }
  function Iv(e, t) {
    var n = e;
    mo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Yv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component"), Yv = !0);
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
      initialValue: Sa(a)
    };
  }
  function qv(e, t) {
    var n = e, a = Sa(t.value), r = Sa(t.defaultValue);
    if (a != null) {
      var i = jn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = jn(r));
  }
  function Gv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function OE(e, t) {
    qv(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", LE = "http://www.w3.org/1998/Math/MathML", jf = "http://www.w3.org/2000/svg";
  function wf(e) {
    switch (e) {
      case "svg":
        return jf;
      case "math":
        return LE;
      default:
        return or;
    }
  }
  function _f(e, t) {
    return e == null || e === or ? wf(t) : e === jf && t === "foreignObject" ? or : e;
  }
  var ME = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, vs, Wv = ME(function(e, t) {
    if (e.namespaceURI === jf && !("innerHTML" in e)) {
      vs = vs || document.createElement("div"), vs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = vs.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, ur = 3, wt = 8, sr = 9, Of = 11, hs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, AE = {
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
  function VE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var kE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    kE.forEach(function(t) {
      Eo[VE(t, e)] = Eo[e];
    });
  });
  function Lf(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (ha(t, e), ("" + t).trim());
  }
  var UE = /([A-Z])/g, FE = /^ms-/;
  function zE(e) {
    return e.replace(UE, "-$1").toLowerCase().replace(FE, "-ms-");
  }
  var Qv = function() {
  };
  {
    var HE = /^(?:webkit|moz|o)[A-Z]/, PE = /^-ms-/, BE = /-(.)/g, Kv = /;\s*$/, il = {}, Mf = {}, Xv = !1, Jv = !1, $E = function(e) {
      return e.replace(BE, function(t, n) {
        return n.toUpperCase();
      });
    }, YE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        $E(e.replace(PE, "ms-"))
      ));
    }, IE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, qE = function(e, t) {
      Mf.hasOwnProperty(t) && Mf[t] || (Mf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Kv, "")));
    }, GE = function(e, t) {
      Xv || (Xv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, WE = function(e, t) {
      Jv || (Jv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Qv = function(e, t) {
      e.indexOf("-") > -1 ? YE(e) : HE.test(e) ? IE(e) : Kv.test(t) && qE(e, t), typeof t == "number" && (isNaN(t) ? GE(e, t) : isFinite(t) || WE(e, t));
    };
  }
  var QE = Qv;
  function KE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : zE(a)) + ":", t += Lf(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function Zv(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || QE(a, t[a]);
        var i = Lf(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function XE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function eh(e) {
    var t = {};
    for (var n in e)
      for (var a = AE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function JE(e, t) {
    {
      if (!t)
        return;
      var n = eh(e), a = eh(t), r = {};
      for (var i in n) {
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var s = l + "," + u;
          if (r[s])
            continue;
          r[s] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", XE(e[l]) ? "Removing" : "Updating", l, u);
        }
      }
    }
  }
  var ZE = {
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
  }, eS = ze({
    menuitem: !0
  }, ZE), tS = "__html";
  function Af(e, t) {
    if (t) {
      if (eS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(tS in t.dangerouslySetInnerHTML))
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
  var ys = {
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
  }, th = {
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
  }, ll = {}, nS = new RegExp("^(aria)-[" + ee + "]*$"), aS = new RegExp("^(aria)[A-Z][" + ee + "]*$");
  function rS(e, t) {
    {
      if (kn.call(ll, t) && ll[t])
        return !0;
      if (aS.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = th.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ll[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ll[t] = !0, !0;
      }
      if (nS.test(t)) {
        var r = t.toLowerCase(), i = th.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ll[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ll[t] = !0, !0;
      }
    }
    return !0;
  }
  function iS(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = rS(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function lS(e, t) {
    Ni(e, t) || iS(e, t);
  }
  var nh = !1;
  function oS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !nh && (nh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var ah = function() {
  };
  {
    var wn = {}, rh = /^on./, uS = /^on[^A-Z]/, sS = new RegExp("^(aria)-[" + ee + "]*$"), cS = new RegExp("^(aria)[A-Z][" + ee + "]*$");
    ah = function(e, t, n, a) {
      if (kn.call(wn, t) && wn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), wn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var u = l.hasOwnProperty(r) ? l[r] : null;
        if (u != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, u), wn[t] = !0, !0;
        if (rh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), wn[t] = !0, !0;
      } else if (rh.test(t))
        return uS.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (sS.test(t) || cS.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), wn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), wn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), wn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), wn[t] = !0, !0;
      var s = Nt(t), m = s !== null && s.type === tn;
      if (ys.hasOwnProperty(r)) {
        var h = ys[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!m && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && gt(t, n, s, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : m ? !0 : gt(t, n, s, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && s !== null && s.type === Lt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var fS = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = ah(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function dS(e, t, n) {
    Ni(e, t) || fS(e, t, n);
  }
  var ih = 1, Vf = 2, So = 4, pS = ih | Vf | So, xo = null;
  function mS(e) {
    xo !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), xo = e;
  }
  function vS() {
    xo === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), xo = null;
  }
  function hS(e) {
    return e === xo;
  }
  function kf(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ur ? t.parentNode : t;
  }
  var Uf = null, ol = null, ul = null;
  function lh(e) {
    var t = $r(e);
    if (t) {
      if (typeof Uf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = Zs(n);
        Uf(t.stateNode, t.type, a);
      }
    }
  }
  function yS(e) {
    Uf = e;
  }
  function oh(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function gS() {
    return ol !== null || ul !== null;
  }
  function uh() {
    if (ol) {
      var e = ol, t = ul;
      if (ol = null, ul = null, lh(e), t)
        for (var n = 0; n < t.length; n++)
          lh(t[n]);
    }
  }
  var sh = function(e, t) {
    return e(t);
  }, ch = function() {
  }, Ff = !1;
  function bS() {
    var e = gS();
    e && (ch(), uh());
  }
  function fh(e, t, n) {
    if (Ff)
      return e(t, n);
    Ff = !0;
    try {
      return sh(e, t, n);
    } finally {
      Ff = !1, bS();
    }
  }
  function NS(e, t, n) {
    sh = e, ch = n;
  }
  function ES(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function SS(e, t, n) {
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
        return !!(n.disabled && ES(t));
      default:
        return !1;
    }
  }
  function Ro(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = Zs(n);
    if (a === null)
      return null;
    var r = a[t];
    if (SS(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var zf = !1;
  if (en)
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
  function dh(e, t, n, a, r, i, l, u, s) {
    var m = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, m);
    } catch (h) {
      this.onError(h);
    }
  }
  var ph = dh;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Hf = document.createElement("react");
    ph = function(t, n, a, r, i, l, u, s, m) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), x = !1, S = !0, O = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        Hf.removeEventListener(H, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var ne = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        x = !0, z(), n.apply(a, ne), S = !1;
      }
      var me, qe = !1, Pe = !1;
      function w(_) {
        if (me = _.error, qe = !0, me === null && _.colno === 0 && _.lineno === 0 && (Pe = !0), _.defaultPrevented && me != null && typeof me == "object")
          try {
            me._suppressLogging = !0;
          } catch {
          }
      }
      var H = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", w), Hf.addEventListener(H, Ee, !1), h.initEvent(H, !1, !1), Hf.dispatchEvent(h), A && Object.defineProperty(window, "event", A), x && S && (qe ? Pe && (me = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : me = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(me)), window.removeEventListener("error", w), !x)
        return z(), dh.apply(this, arguments);
    };
  }
  var xS = ph, sl = !1, gs = null, bs = !1, Pf = null, RS = {
    onError: function(e) {
      sl = !0, gs = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, u, s) {
    sl = !1, gs = null, xS.apply(RS, arguments);
  }
  function CS(e, t, n, a, r, i, l, u, s) {
    if (Bf.apply(this, arguments), sl) {
      var m = $f();
      bs || (bs = !0, Pf = m);
    }
  }
  function DS() {
    if (bs) {
      var e = Pf;
      throw bs = !1, Pf = null, e;
    }
  }
  function TS() {
    return sl;
  }
  function $f() {
    if (sl) {
      var e = gs;
      return sl = !1, gs = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function cl(e) {
    return e._reactInternals;
  }
  function jS(e) {
    return e._reactInternals !== void 0;
  }
  function wS(e, t) {
    e._reactInternals = t;
  }
  var Ce = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), _t = (
    /*                    */
    2
  ), Ke = (
    /*                       */
    4
  ), Ei = (
    /*                */
    16
  ), Do = (
    /*                 */
    32
  ), mh = (
    /*                     */
    64
  ), Xe = (
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
  ), Yf = (
    /*             */
    16384
  ), _S = (
    /*               */
    32767
  ), Ns = (
    /*                   */
    32768
  ), _n = (
    /*                */
    65536
  ), If = (
    /* */
    131072
  ), vh = (
    /*                       */
    1048576
  ), qf = (
    /*                    */
    2097152
  ), Ri = (
    /*                 */
    4194304
  ), Gf = (
    /*                */
    8388608
  ), kr = (
    /*               */
    16777216
  ), Wf = (
    /*              */
    33554432
  ), Qf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    Ke | dl | 0
  ), Kf = _t | Ke | Ei | Do | Si | fr | xi, To = Ke | mh | Si | xi, pl = Vr | Ei, dr = Ri | Gf | qf, OS = v.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (_t | fr)) !== Ce && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === E ? n : null;
  }
  function hh(e) {
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
  function yh(e) {
    return e.tag === E ? e.stateNode.containerInfo : null;
  }
  function LS(e) {
    return Ci(e) === e;
  }
  function MS(e) {
    {
      var t = OS.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ve(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = cl(e);
    return r ? Ci(r) === r : !1;
  }
  function gh(e) {
    if (Ci(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function bh(e) {
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
        var u = i.return;
        if (u !== null) {
          a = r = u;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (var s = i.child; s; ) {
          if (s === a)
            return gh(i), e;
          if (s === r)
            return gh(i), t;
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
    if (a.tag !== E)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function Nh(e) {
    var t = bh(e);
    return t !== null ? Eh(t) : null;
  }
  function Eh(e) {
    if (e.tag === V || e.tag === Q)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Eh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function AS(e) {
    var t = bh(e);
    return t !== null ? Sh(t) : null;
  }
  function Sh(e) {
    if (e.tag === V || e.tag === Q)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== j) {
        var n = Sh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var xh = p.unstable_scheduleCallback, VS = p.unstable_cancelCallback, kS = p.unstable_shouldYield, US = p.unstable_requestPaint, Gt = p.unstable_now, FS = p.unstable_getCurrentPriorityLevel, Es = p.unstable_ImmediatePriority, Xf = p.unstable_UserBlockingPriority, Di = p.unstable_NormalPriority, zS = p.unstable_LowPriority, Jf = p.unstable_IdlePriority, HS = p.unstable_yieldValue, PS = p.unstable_setDisableYieldValue, ml = null, yn = null, le = null, Ba = !1, xa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function BS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      In && (e = ze({}, e, {
        getLaneLabelMap: WS,
        injectProfilingHooks: GS
      })), ml = t.inject(e), yn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function $S(e, t) {
    if (yn && typeof yn.onScheduleFiberRoot == "function")
      try {
        yn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function YS(e, t) {
    if (yn && typeof yn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Xe) === Xe;
        if (Jt) {
          var a;
          switch (t) {
            case Qn:
              a = Es;
              break;
            case mr:
              a = Xf;
              break;
            case vr:
              a = Di;
              break;
            case js:
              a = Jf;
              break;
            default:
              a = Di;
              break;
          }
          yn.onCommitFiberRoot(ml, e, a, n);
        }
      } catch (r) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function IS(e) {
    if (yn && typeof yn.onPostCommitFiberRoot == "function")
      try {
        yn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function qS(e) {
    if (yn && typeof yn.onCommitFiberUnmount == "function")
      try {
        yn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Wt(e) {
    if (typeof HS == "function" && (PS(e), y(e)), yn && typeof yn.setStrictMode == "function")
      try {
        yn.setStrictMode(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function GS(e) {
    le = e;
  }
  function WS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < ed; n++) {
        var a = mx(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function QS(e) {
    le !== null && typeof le.markCommitStarted == "function" && le.markCommitStarted(e);
  }
  function Rh() {
    le !== null && typeof le.markCommitStopped == "function" && le.markCommitStopped();
  }
  function jo(e) {
    le !== null && typeof le.markComponentRenderStarted == "function" && le.markComponentRenderStarted(e);
  }
  function vl() {
    le !== null && typeof le.markComponentRenderStopped == "function" && le.markComponentRenderStopped();
  }
  function KS(e) {
    le !== null && typeof le.markComponentPassiveEffectMountStarted == "function" && le.markComponentPassiveEffectMountStarted(e);
  }
  function XS() {
    le !== null && typeof le.markComponentPassiveEffectMountStopped == "function" && le.markComponentPassiveEffectMountStopped();
  }
  function JS(e) {
    le !== null && typeof le.markComponentPassiveEffectUnmountStarted == "function" && le.markComponentPassiveEffectUnmountStarted(e);
  }
  function ZS() {
    le !== null && typeof le.markComponentPassiveEffectUnmountStopped == "function" && le.markComponentPassiveEffectUnmountStopped();
  }
  function ex(e) {
    le !== null && typeof le.markComponentLayoutEffectMountStarted == "function" && le.markComponentLayoutEffectMountStarted(e);
  }
  function tx() {
    le !== null && typeof le.markComponentLayoutEffectMountStopped == "function" && le.markComponentLayoutEffectMountStopped();
  }
  function Ch(e) {
    le !== null && typeof le.markComponentLayoutEffectUnmountStarted == "function" && le.markComponentLayoutEffectUnmountStarted(e);
  }
  function Dh() {
    le !== null && typeof le.markComponentLayoutEffectUnmountStopped == "function" && le.markComponentLayoutEffectUnmountStopped();
  }
  function nx(e, t, n) {
    le !== null && typeof le.markComponentErrored == "function" && le.markComponentErrored(e, t, n);
  }
  function ax(e, t, n) {
    le !== null && typeof le.markComponentSuspended == "function" && le.markComponentSuspended(e, t, n);
  }
  function rx(e) {
    le !== null && typeof le.markLayoutEffectsStarted == "function" && le.markLayoutEffectsStarted(e);
  }
  function ix() {
    le !== null && typeof le.markLayoutEffectsStopped == "function" && le.markLayoutEffectsStopped();
  }
  function lx(e) {
    le !== null && typeof le.markPassiveEffectsStarted == "function" && le.markPassiveEffectsStarted(e);
  }
  function ox() {
    le !== null && typeof le.markPassiveEffectsStopped == "function" && le.markPassiveEffectsStopped();
  }
  function Th(e) {
    le !== null && typeof le.markRenderStarted == "function" && le.markRenderStarted(e);
  }
  function ux() {
    le !== null && typeof le.markRenderYielded == "function" && le.markRenderYielded();
  }
  function jh() {
    le !== null && typeof le.markRenderStopped == "function" && le.markRenderStopped();
  }
  function sx(e) {
    le !== null && typeof le.markRenderScheduled == "function" && le.markRenderScheduled(e);
  }
  function cx(e, t) {
    le !== null && typeof le.markForceUpdateScheduled == "function" && le.markForceUpdateScheduled(e, t);
  }
  function Zf(e, t) {
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
  ), $a = (
    /*              */
    16
  ), wh = Math.clz32 ? Math.clz32 : px, fx = Math.log, dx = Math.LN2;
  function px(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (fx(t) / dx | 0) | 0;
  }
  var ed = 31, Y = (
    /*                        */
    0
  ), Qt = (
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
  ), td = (
    /*                        */
    128
  ), nd = (
    /*                        */
    256
  ), ad = (
    /*                        */
    512
  ), rd = (
    /*                        */
    1024
  ), id = (
    /*                        */
    2048
  ), ld = (
    /*                        */
    4096
  ), od = (
    /*                        */
    8192
  ), ud = (
    /*                        */
    16384
  ), sd = (
    /*                       */
    32768
  ), cd = (
    /*                       */
    65536
  ), fd = (
    /*                       */
    131072
  ), dd = (
    /*                       */
    262144
  ), pd = (
    /*                       */
    524288
  ), md = (
    /*                       */
    1048576
  ), vd = (
    /*                       */
    2097152
  ), Ss = (
    /*                            */
    130023424
  ), gl = (
    /*                             */
    4194304
  ), hd = (
    /*                             */
    8388608
  ), yd = (
    /*                             */
    16777216
  ), gd = (
    /*                             */
    33554432
  ), bd = (
    /*                             */
    67108864
  ), _h = gl, Oo = (
    /*          */
    134217728
  ), Oh = (
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
  function mx(e) {
    {
      if (e & _e)
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
      if (e & Ss)
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
  var st = -1, xs = _o, Rs = gl;
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
      case Ya:
        return Ya;
      case wo:
        return wo;
      case _o:
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
      case vd:
        return e & yl;
      case gl:
      case hd:
      case yd:
      case gd:
      case bd:
        return e & Ss;
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
  function Cs(e, t) {
    var n = e.pendingLanes;
    if (n === Y)
      return Y;
    var a = Y, r = e.suspendedLanes, i = e.pingedLanes, l = n & Oh;
    if (l !== Y) {
      var u = l & ~r;
      if (u !== Y)
        a = Mo(u);
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
      var h = wi(a), x = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === Ya && (x & yl) !== Y
      )
        return t;
    }
    (a & pr) !== Y && (a |= n & Ya);
    var S = e.entangledLanes;
    if (S !== Y)
      for (var O = e.entanglements, A = a & S; A > 0; ) {
        var z = _i(A), ne = 1 << z;
        a |= O[z], A &= ~ne;
      }
    return a;
  }
  function vx(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function hx(e, t) {
    switch (e) {
      case _e:
      case hl:
      case pr:
        return t + 250;
      case Ti:
      case Ya:
      case wo:
      case _o:
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
      case vd:
        return t + 5e3;
      case gl:
      case hd:
      case yd:
      case gd:
      case bd:
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
  function yx(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = _i(l), s = 1 << u, m = i[u];
      m === st ? ((s & a) === Y || (s & r) !== Y) && (i[u] = hx(s, t)) : m <= t && (e.expiredLanes |= s), l &= ~s;
    }
  }
  function gx(e) {
    return Mo(e.pendingLanes);
  }
  function Nd(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== Y ? t : t & Gn ? Gn : Y;
  }
  function bx(e) {
    return (e & _e) !== Y;
  }
  function Ed(e) {
    return (e & Oh) !== Y;
  }
  function Lh(e) {
    return (e & Ss) === e;
  }
  function Nx(e) {
    var t = _e | pr | Ya;
    return (e & t) === Y;
  }
  function Ex(e) {
    return (e & yl) === e;
  }
  function Ds(e, t) {
    var n = hl | pr | Ti | Ya;
    return (t & n) !== Y;
  }
  function Sx(e, t) {
    return (t & e.expiredLanes) !== Y;
  }
  function Mh(e) {
    return (e & yl) !== Y;
  }
  function Ah() {
    var e = xs;
    return xs <<= 1, (xs & yl) === Y && (xs = _o), e;
  }
  function xx() {
    var e = Rs;
    return Rs <<= 1, (Rs & Ss) === Y && (Rs = gl), e;
  }
  function wi(e) {
    return e & -e;
  }
  function Ao(e) {
    return wi(e);
  }
  function _i(e) {
    return 31 - wh(e);
  }
  function Sd(e) {
    return _i(e);
  }
  function Wn(e, t) {
    return (e & t) !== Y;
  }
  function bl(e, t) {
    return (e & t) === t;
  }
  function Ue(e, t) {
    return e | t;
  }
  function Ts(e, t) {
    return e & ~t;
  }
  function Vh(e, t) {
    return e & t;
  }
  function L_(e) {
    return e;
  }
  function Rx(e, t) {
    return e !== Qt && e < t ? e : t;
  }
  function xd(e) {
    for (var t = [], n = 0; n < ed; n++)
      t.push(e);
    return t;
  }
  function Vo(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = Y, e.pingedLanes = Y);
    var a = e.eventTimes, r = Sd(t);
    a[r] = n;
  }
  function Cx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function kh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function Dx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = Y, e.pingedLanes = Y, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = _i(l), s = 1 << u;
      a[u] = Y, r[u] = st, i[u] = st, l &= ~s;
    }
  }
  function Rd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = _i(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function Tx(e, t) {
    var n = wi(t), a;
    switch (n) {
      case pr:
        a = hl;
        break;
      case Ya:
        a = Ti;
        break;
      case _o:
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
      case vd:
      case gl:
      case hd:
      case yd:
      case gd:
      case bd:
        a = wo;
        break;
      case ji:
        a = Lo;
        break;
      default:
        a = Qt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Qt ? Qt : a;
  }
  function Uh(e, t, n) {
    if (xa)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Sd(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Fh(e, t) {
    if (xa)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Sd(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var s = u.alternate;
          (s === null || !a.has(s)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function zh(e, t) {
    return null;
  }
  var Qn = _e, mr = pr, vr = Ya, js = ji, ko = Qt;
  function Ra() {
    return ko;
  }
  function Kt(e) {
    ko = e;
  }
  function jx(e, t) {
    var n = ko;
    try {
      return ko = e, t();
    } finally {
      ko = n;
    }
  }
  function wx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function _x(e, t) {
    return e > t ? e : t;
  }
  function Cd(e, t) {
    return e !== 0 && e < t;
  }
  function Hh(e) {
    var t = wi(e);
    return Cd(Qn, t) ? Cd(mr, t) ? Ed(t) ? vr : js : mr : Qn;
  }
  function ws(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Ph;
  function Ox(e) {
    Ph = e;
  }
  function Lx(e) {
    Ph(e);
  }
  var Dd;
  function Mx(e) {
    Dd = e;
  }
  var Bh;
  function Ax(e) {
    Bh = e;
  }
  var $h;
  function Vx(e) {
    $h = e;
  }
  var Yh;
  function kx(e) {
    Yh = e;
  }
  var Td = !1, _s = [], Ur = null, Fr = null, zr = null, Uo = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Map(), Hr = [], Ux = [
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
  function Fx(e) {
    return Ux.indexOf(e) > -1;
  }
  function zx(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Ih(e, t) {
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
      var l = zx(t, n, a, r, i);
      if (t !== null) {
        var u = $r(t);
        u !== null && Dd(u);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var s = e.targetContainers;
    return r !== null && s.indexOf(r) === -1 && s.push(r), e;
  }
  function Hx(e, t, n, a, r) {
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
        var u = r;
        return zr = zo(zr, e, t, n, a, u), !0;
      }
      case "pointerover": {
        var s = r, m = s.pointerId;
        return Uo.set(m, zo(Uo.get(m) || null, e, t, n, a, s)), !0;
      }
      case "gotpointercapture": {
        var h = r, x = h.pointerId;
        return Fo.set(x, zo(Fo.get(x) || null, e, t, n, a, h)), !0;
      }
    }
    return !1;
  }
  function qh(e) {
    var t = Mi(e.target);
    if (t !== null) {
      var n = Ci(t);
      if (n !== null) {
        var a = n.tag;
        if (a === P) {
          var r = hh(n);
          if (r !== null) {
            e.blockedOn = r, Yh(e.priority, function() {
              Bh(n);
            });
            return;
          }
        } else if (a === E) {
          var i = n.stateNode;
          if (ws(i)) {
            e.blockedOn = yh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function Px(e) {
    for (var t = $h(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Hr.length && Cd(t, Hr[a].priority); a++)
      ;
    Hr.splice(a, 0, n), a === 0 && qh(n);
  }
  function Os(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = _d(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        mS(i), r.target.dispatchEvent(i), vS();
      } else {
        var l = $r(a);
        return l !== null && Dd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Gh(e, t, n) {
    Os(e) && n.delete(t);
  }
  function Bx() {
    Td = !1, Ur !== null && Os(Ur) && (Ur = null), Fr !== null && Os(Fr) && (Fr = null), zr !== null && Os(zr) && (zr = null), Uo.forEach(Gh), Fo.forEach(Gh);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Td || (Td = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, Bx)));
  }
  function Po(e) {
    if (_s.length > 0) {
      Ho(_s[0], e);
      for (var t = 1; t < _s.length; t++) {
        var n = _s[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Ur !== null && Ho(Ur, e), Fr !== null && Ho(Fr, e), zr !== null && Ho(zr, e);
    var a = function(u) {
      return Ho(u, e);
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
      qh(l), l.blockedOn === null && Hr.shift();
    }
  }
  var Nl = v.ReactCurrentBatchConfig, jd = !0;
  function Wh(e) {
    jd = !!e;
  }
  function $x() {
    return jd;
  }
  function Yx(e, t, n) {
    var a = Qh(t), r;
    switch (a) {
      case Qn:
        r = Ix;
        break;
      case mr:
        r = qx;
        break;
      case vr:
      default:
        r = wd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function Ix(e, t, n, a) {
    var r = Ra(), i = Nl.transition;
    Nl.transition = null;
    try {
      Kt(Qn), wd(e, t, n, a);
    } finally {
      Kt(r), Nl.transition = i;
    }
  }
  function qx(e, t, n, a) {
    var r = Ra(), i = Nl.transition;
    Nl.transition = null;
    try {
      Kt(mr), wd(e, t, n, a);
    } finally {
      Kt(r), Nl.transition = i;
    }
  }
  function wd(e, t, n, a) {
    jd && Gx(e, t, n, a);
  }
  function Gx(e, t, n, a) {
    var r = _d(e, t, n, a);
    if (r === null) {
      Yd(e, t, a, Ls, n), Ih(e, a);
      return;
    }
    if (Hx(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Ih(e, a), t & So && Fx(e)) {
      for (; r !== null; ) {
        var i = $r(r);
        i !== null && Lx(i);
        var l = _d(e, t, n, a);
        if (l === null && Yd(e, t, a, Ls, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Yd(e, t, a, null, n);
  }
  var Ls = null;
  function _d(e, t, n, a) {
    Ls = null;
    var r = kf(a), i = Mi(r);
    if (i !== null) {
      var l = Ci(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === P) {
          var s = hh(l);
          if (s !== null)
            return s;
          i = null;
        } else if (u === E) {
          var m = l.stateNode;
          if (ws(m))
            return yh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Ls = i, null;
  }
  function Qh(e) {
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
        var t = FS();
        switch (t) {
          case Es:
            return Qn;
          case Xf:
            return mr;
          case Di:
          case zS:
            return vr;
          case Jf:
            return js;
          default:
            return vr;
        }
      }
      default:
        return vr;
    }
  }
  function Wx(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function Qx(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function Kx(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function Xx(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Bo = null, Od = null, $o = null;
  function Jx(e) {
    return Bo = e, Od = Xh(), !0;
  }
  function Zx() {
    Bo = null, Od = null, $o = null;
  }
  function Kh() {
    if ($o)
      return $o;
    var e, t = Od, n = t.length, a, r = Xh(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return $o = r.slice(e, u), $o;
  }
  function Xh() {
    return "value" in Bo ? Bo.value : Bo.textContent;
  }
  function Ms(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function As() {
    return !0;
  }
  function Jh() {
    return !1;
  }
  function Kn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var s = e[u];
          s ? this[u] = s(i) : this[u] = i[u];
        }
      var m = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return m ? this.isDefaultPrevented = As : this.isDefaultPrevented = Jh, this.isPropagationStopped = Jh, this;
    }
    return ze(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = As);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = As);
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
      isPersistent: As
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
  }, Ld = Kn(El), Yo = ze({}, El, {
    view: 0,
    detail: 0
  }), eR = Kn(Yo), Md, Ad, Io;
  function tR(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Md = e.screenX - Io.screenX, Ad = e.screenY - Io.screenY) : (Md = 0, Ad = 0), Io = e);
  }
  var Vs = ze({}, Yo, {
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
    getModifierState: kd,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (tR(e), Md);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ad;
    }
  }), Zh = Kn(Vs), nR = ze({}, Vs, {
    dataTransfer: 0
  }), aR = Kn(nR), rR = ze({}, Yo, {
    relatedTarget: 0
  }), Vd = Kn(rR), iR = ze({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lR = Kn(iR), oR = ze({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), uR = Kn(oR), sR = ze({}, El, {
    data: 0
  }), ey = Kn(sR), cR = ey, fR = {
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
  }, dR = {
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
  function pR(e) {
    if (e.key) {
      var t = fR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ms(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? dR[e.keyCode] || "Unidentified" : "";
  }
  var mR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = mR[e];
    return a ? !!n[a] : !1;
  }
  function kd(e) {
    return vR;
  }
  var hR = ze({}, Yo, {
    key: pR,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: kd,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Ms(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ms(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), yR = Kn(hR), gR = ze({}, Vs, {
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
  }), ty = Kn(gR), bR = ze({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: kd
  }), NR = Kn(bR), ER = ze({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SR = Kn(ER), xR = ze({}, Vs, {
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
  }), RR = Kn(xR), CR = [9, 13, 27, 32], ny = 229, Ud = en && "CompositionEvent" in window, qo = null;
  en && "documentMode" in document && (qo = document.documentMode);
  var DR = en && "TextEvent" in window && !qo, ay = en && (!Ud || qo && qo > 8 && qo <= 11), ry = 32, iy = String.fromCharCode(ry);
  function TR() {
    Rt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Rt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Rt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Rt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var ly = !1;
  function jR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function wR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function _R(e, t) {
    return e === "keydown" && t.keyCode === ny;
  }
  function oy(e, t) {
    switch (e) {
      case "keyup":
        return CR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== ny;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function uy(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function sy(e) {
    return e.locale === "ko";
  }
  var Sl = !1;
  function OR(e, t, n, a, r) {
    var i, l;
    if (Ud ? i = wR(t) : Sl ? oy(t, a) && (i = "onCompositionEnd") : _R(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ay && !sy(a) && (!Sl && i === "onCompositionStart" ? Sl = Jx(r) : i === "onCompositionEnd" && Sl && (l = Kh()));
    var u = Hs(n, i);
    if (u.length > 0) {
      var s = new ey(i, t, null, a, r);
      if (e.push({
        event: s,
        listeners: u
      }), l)
        s.data = l;
      else {
        var m = uy(a);
        m !== null && (s.data = m);
      }
    }
  }
  function LR(e, t) {
    switch (e) {
      case "compositionend":
        return uy(t);
      case "keypress":
        var n = t.which;
        return n !== ry ? null : (ly = !0, iy);
      case "textInput":
        var a = t.data;
        return a === iy && ly ? null : a;
      default:
        return null;
    }
  }
  function MR(e, t) {
    if (Sl) {
      if (e === "compositionend" || !Ud && oy(e, t)) {
        var n = Kh();
        return Zx(), Sl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!jR(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ay && !sy(t) ? null : t.data;
      default:
        return null;
    }
  }
  function AR(e, t, n, a, r) {
    var i;
    if (DR ? i = LR(t, a) : i = MR(t, a), !i)
      return null;
    var l = Hs(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new cR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
    }
  }
  function VR(e, t, n, a, r, i, l) {
    OR(e, t, n, a, r), AR(e, t, n, a, r);
  }
  var kR = {
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
  function cy(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!kR[e.type] : t === "textarea";
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
  function UR(e) {
    if (!en)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function FR() {
    Rt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function fy(e, t, n, a) {
    oh(a);
    var r = Hs(t, "onChange");
    if (r.length > 0) {
      var i = new Ld("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Go = null, Wo = null;
  function zR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function HR(e) {
    var t = [];
    fy(t, Wo, e, kf(e)), fh(PR, t);
  }
  function PR(e) {
    wy(e, 0);
  }
  function ks(e) {
    var t = jl(e);
    if (ho(t))
      return e;
  }
  function BR(e, t) {
    if (e === "change")
      return t;
  }
  var dy = !1;
  en && (dy = UR("input") && (!document.documentMode || document.documentMode > 9));
  function $R(e, t) {
    Go = e, Wo = t, Go.attachEvent("onpropertychange", my);
  }
  function py() {
    Go && (Go.detachEvent("onpropertychange", my), Go = null, Wo = null);
  }
  function my(e) {
    e.propertyName === "value" && ks(Wo) && HR(e);
  }
  function YR(e, t, n) {
    e === "focusin" ? (py(), $R(t, n)) : e === "focusout" && py();
  }
  function IR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ks(Wo);
  }
  function qR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function GR(e, t) {
    if (e === "click")
      return ks(t);
  }
  function WR(e, t) {
    if (e === "input" || e === "change")
      return ks(t);
  }
  function QR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function KR(e, t, n, a, r, i, l) {
    var u = n ? jl(n) : window, s, m;
    if (zR(u) ? s = BR : cy(u) ? dy ? s = WR : (s = IR, m = YR) : qR(u) && (s = GR), s) {
      var h = s(t, n);
      if (h) {
        fy(e, h, a, r);
        return;
      }
    }
    m && m(t, u, n), t === "focusout" && QR(u);
  }
  function XR() {
    Zt("onMouseEnter", ["mouseout", "mouseover"]), Zt("onMouseLeave", ["mouseout", "mouseover"]), Zt("onPointerEnter", ["pointerout", "pointerover"]), Zt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function JR(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", s = t === "mouseout" || t === "pointerout";
    if (u && !hS(a)) {
      var m = a.relatedTarget || a.fromElement;
      if (m && (Mi(m) || su(m)))
        return;
    }
    if (!(!s && !u)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var x = r.ownerDocument;
        x ? h = x.defaultView || x.parentWindow : h = window;
      }
      var S, O;
      if (s) {
        var A = a.relatedTarget || a.toElement;
        if (S = n, O = A ? Mi(A) : null, O !== null) {
          var z = Ci(O);
          (O !== z || O.tag !== V && O.tag !== Q) && (O = null);
        }
      } else
        S = null, O = n;
      if (S !== O) {
        var ne = Zh, Ee = "onMouseLeave", me = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (ne = ty, Ee = "onPointerLeave", me = "onPointerEnter", qe = "pointer");
        var Pe = S == null ? h : jl(S), w = O == null ? h : jl(O), H = new ne(Ee, qe + "leave", S, a, r);
        H.target = Pe, H.relatedTarget = w;
        var _ = null, W = Mi(r);
        if (W === n) {
          var se = new ne(me, qe + "enter", O, a, r);
          se.target = w, se.relatedTarget = Pe, _ = se;
        }
        SC(e, H, _, S, O);
      }
    }
  }
  function ZR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Xn = typeof Object.is == "function" ? Object.is : ZR;
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
  function vy(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function eC(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function hy(e, t) {
    for (var n = vy(e), a = 0, r = 0; n; ) {
      if (n.nodeType === ur) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = vy(eC(n));
    }
  }
  function tC(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return nC(e, r, i, l, u);
  }
  function nC(e, t, n, a, r) {
    var i = 0, l = -1, u = -1, s = 0, m = 0, h = e, x = null;
    e: for (; ; ) {
      for (var S = null; h === t && (n === 0 || h.nodeType === ur) && (l = i + n), h === a && (r === 0 || h.nodeType === ur) && (u = i + r), h.nodeType === ur && (i += h.nodeValue.length), (S = h.firstChild) !== null; )
        x = h, h = S;
      for (; ; ) {
        if (h === e)
          break e;
        if (x === t && ++s === n && (l = i), x === a && ++m === r && (u = i), (S = h.nextSibling) !== null)
          break;
        h = x, x = h.parentNode;
      }
      h = S;
    }
    return l === -1 || u === -1 ? null : {
      start: l,
      end: u
    };
  }
  function aC(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var s = u;
        u = l, l = s;
      }
      var m = hy(e, l), h = hy(e, u);
      if (m && h) {
        if (r.rangeCount === 1 && r.anchorNode === m.node && r.anchorOffset === m.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var x = n.createRange();
        x.setStart(m.node, m.offset), r.removeAllRanges(), l > u ? (r.addRange(x), r.extend(h.node, h.offset)) : (x.setEnd(h.node, h.offset), r.addRange(x));
      }
    }
  }
  function yy(e) {
    return e && e.nodeType === ur;
  }
  function gy(e, t) {
    return !e || !t ? !1 : e === t ? !0 : yy(e) ? !1 : yy(t) ? gy(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function rC(e) {
    return e && e.ownerDocument && gy(e.ownerDocument.documentElement, e);
  }
  function iC(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function by() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (iC(t))
        e = t.contentWindow;
      else
        return t;
      t = ir(e.document);
    }
    return t;
  }
  function Fd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function lC() {
    var e = by();
    return {
      focusedElem: e,
      selectionRange: Fd(e) ? uC(e) : null
    };
  }
  function oC(e) {
    var t = by(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && rC(n)) {
      a !== null && Fd(n) && sC(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === zn && r.push({
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
  function uC(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = tC(e), t || {
      start: 0,
      end: 0
    };
  }
  function sC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : aC(e, t);
  }
  var cC = en && "documentMode" in document && document.documentMode <= 11;
  function fC() {
    Rt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var xl = null, zd = null, Ko = null, Hd = !1;
  function dC(e) {
    if ("selectionStart" in e && Fd(e))
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
  function pC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function Ny(e, t, n) {
    var a = pC(n);
    if (!(Hd || xl == null || xl !== ir(a))) {
      var r = dC(xl);
      if (!Ko || !Qo(Ko, r)) {
        Ko = r;
        var i = Hs(zd, "onSelect");
        if (i.length > 0) {
          var l = new Ld("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = xl;
        }
      }
    }
  }
  function mC(e, t, n, a, r, i, l) {
    var u = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (cy(u) || u.contentEditable === "true") && (xl = u, zd = n, Ko = null);
        break;
      case "focusout":
        xl = null, zd = null, Ko = null;
        break;
      case "mousedown":
        Hd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Hd = !1, Ny(e, a, r);
        break;
      case "selectionchange":
        if (cC)
          break;
      case "keydown":
      case "keyup":
        Ny(e, a, r);
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
  }, Pd = {}, Ey = {};
  en && (Ey = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
  function Fs(e) {
    if (Pd[e])
      return Pd[e];
    if (!Rl[e])
      return e;
    var t = Rl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Ey)
        return Pd[e] = t[n];
    return e;
  }
  var Sy = Fs("animationend"), xy = Fs("animationiteration"), Ry = Fs("animationstart"), Cy = Fs("transitionend"), Dy = /* @__PURE__ */ new Map(), Ty = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Pr(e, t) {
    Dy.set(e, t), Rt(t, [e]);
  }
  function vC() {
    for (var e = 0; e < Ty.length; e++) {
      var t = Ty[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Pr(n, "on" + a);
    }
    Pr(Sy, "onAnimationEnd"), Pr(xy, "onAnimationIteration"), Pr(Ry, "onAnimationStart"), Pr("dblclick", "onDoubleClick"), Pr("focusin", "onFocus"), Pr("focusout", "onBlur"), Pr(Cy, "onTransitionEnd");
  }
  function hC(e, t, n, a, r, i, l) {
    var u = Dy.get(t);
    if (u !== void 0) {
      var s = Ld, m = t;
      switch (t) {
        case "keypress":
          if (Ms(a) === 0)
            return;
        case "keydown":
        case "keyup":
          s = yR;
          break;
        case "focusin":
          m = "focus", s = Vd;
          break;
        case "focusout":
          m = "blur", s = Vd;
          break;
        case "beforeblur":
        case "afterblur":
          s = Vd;
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
          s = Zh;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          s = aR;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          s = NR;
          break;
        case Sy:
        case xy:
        case Ry:
          s = lR;
          break;
        case Cy:
          s = SR;
          break;
        case "scroll":
          s = eR;
          break;
        case "wheel":
          s = RR;
          break;
        case "copy":
        case "cut":
        case "paste":
          s = uR;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          s = ty;
          break;
      }
      var h = (i & So) !== 0;
      {
        var x = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", S = NC(n, u, a.type, h, x);
        if (S.length > 0) {
          var O = new s(u, m, null, a, r);
          e.push({
            event: O,
            listeners: S
          });
        }
      }
    }
  }
  vC(), XR(), FR(), fC(), TR();
  function yC(e, t, n, a, r, i, l) {
    hC(e, t, n, a, r, i);
    var u = (i & pS) === 0;
    u && (JR(e, t, n, a, r), KR(e, t, n, a, r), mC(e, t, n, a, r), VR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function jy(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, CS(a, t, void 0, e), e.currentTarget = null;
  }
  function gC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, s = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        jy(e, s, u), a = l;
      }
    else
      for (var m = 0; m < t.length; m++) {
        var h = t[m], x = h.instance, S = h.currentTarget, O = h.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        jy(e, O, S), a = x;
      }
  }
  function wy(e, t) {
    for (var n = (t & So) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      gC(i, l, n);
    }
    DS();
  }
  function bC(e, t, n, a, r) {
    var i = kf(n), l = [];
    yC(l, e, a, n, i, t), wy(l, t);
  }
  function pt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = Q0(t), r = xC(e);
    a.has(r) || (_y(t, e, Vf, n), a.add(r));
  }
  function $d(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= So), _y(n, e, a, t);
  }
  var zs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[zs]) {
      e[zs] = !0, na.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || $d(n, !1, e), $d(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[zs] || (t[zs] = !0, $d("selectionchange", !1, t)));
    }
  }
  function _y(e, t, n, a, r) {
    var i = Yx(e, t, n), l = void 0;
    zf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? Kx(e, t, i, l) : Qx(e, t, i) : l !== void 0 ? Xx(e, t, i, l) : Wx(e, t, i);
  }
  function Oy(e, t) {
    return e === t || e.nodeType === wt && e.parentNode === t;
  }
  function Yd(e, t, n, a, r) {
    var i = a;
    if (!(t & ih) && !(t & Vf)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var s = u.tag;
          if (s === E || s === j) {
            var m = u.stateNode.containerInfo;
            if (Oy(m, l))
              break;
            if (s === j)
              for (var h = u.return; h !== null; ) {
                var x = h.tag;
                if (x === E || x === j) {
                  var S = h.stateNode.containerInfo;
                  if (Oy(S, l))
                    return;
                }
                h = h.return;
              }
            for (; m !== null; ) {
              var O = Mi(m);
              if (O === null)
                return;
              var A = O.tag;
              if (A === V || A === Q) {
                u = i = O;
                continue e;
              }
              m = m.parentNode;
            }
          }
          u = u.return;
        }
      }
    }
    fh(function() {
      return bC(e, t, n, i);
    });
  }
  function Zo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function NC(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, u = a ? l : t, s = [], m = e, h = null; m !== null; ) {
      var x = m, S = x.stateNode, O = x.tag;
      if (O === V && S !== null && (h = S, u !== null)) {
        var A = Ro(m, u);
        A != null && s.push(Zo(m, A, h));
      }
      if (r)
        break;
      m = m.return;
    }
    return s;
  }
  function Hs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, u = i.tag;
      if (u === V && l !== null) {
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
  function EC(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Cl(i))
      r++;
    for (var l = 0, u = a; u; u = Cl(u))
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
  function Ly(e, t, n, a, r) {
    for (var i = t._reactName, l = [], u = n; u !== null && u !== a; ) {
      var s = u, m = s.alternate, h = s.stateNode, x = s.tag;
      if (m !== null && m === a)
        break;
      if (x === V && h !== null) {
        var S = h;
        if (r) {
          var O = Ro(u, i);
          O != null && l.unshift(Zo(u, O, S));
        } else if (!r) {
          var A = Ro(u, i);
          A != null && l.push(Zo(u, A, S));
        }
      }
      u = u.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function SC(e, t, n, a, r) {
    var i = a && r ? EC(a, r) : null;
    a !== null && Ly(e, t, a, i, !1), r !== null && n !== null && Ly(e, n, r, i, !0);
  }
  function xC(e, t) {
    return e + "__bubble";
  }
  var Hn = !1, eu = "dangerouslySetInnerHTML", Ps = "suppressContentEditableWarning", Br = "suppressHydrationWarning", My = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Id, $s, tu, Ay, Ys, Vy, ky;
  Id = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, $s = function(e, t) {
    lS(e, t), oS(e, t), dS(e, t, {
      registrationNameDependencies: Tt,
      possibleRegistrationNames: pn
    });
  }, Vy = en && !document.documentMode, tu = function(e, t, n) {
    if (!Hn) {
      var a = Is(n), r = Is(t);
      r !== a && (Hn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ay = function(e) {
    if (!Hn) {
      Hn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, Ys = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, ky = function(e, t) {
    var n = e.namespaceURI === or ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var RC = /\r\n?/g, CC = /\u0000|\uFFFD/g;
  function Is(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(RC, `
`).replace(CC, "");
  }
  function qs(e, t, n, a) {
    var r = Is(t), i = Is(e);
    if (i !== r && (a && (Hn || (Hn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Uy(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function DC() {
  }
  function Gs(e) {
    e.onclick = DC;
  }
  function TC(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Li)
          l && Object.freeze(l), Zv(t, l);
        else if (i === eu) {
          var u = l ? l[Bs] : void 0;
          u != null && Wv(t, u);
        } else if (i === Oi)
          if (typeof l == "string") {
            var s = e !== "textarea" || l !== "";
            s && hs(t, l);
          } else typeof l == "number" && hs(t, "" + l);
        else i === Ps || i === Br || i === My || (Tt.hasOwnProperty(i) ? l != null && (typeof l != "function" && Ys(i, l), i === "onScroll" && pt("scroll", t)) : l != null && ba(t, i, l, r));
      }
  }
  function jC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Zv(e, l) : i === eu ? Wv(e, l) : i === Oi ? hs(e, l) : ba(e, i, l, a);
    }
  }
  function wC(e, t, n, a) {
    var r, i = Uy(n), l, u = a;
    if (u === or && (u = wf(e)), u === or) {
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
      l = i.createElementNS(u, e);
    return u === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !kn.call(Id, e) && (Id[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function _C(e, t) {
    return Uy(t).createTextNode(e);
  }
  function OC(e, t, n, a) {
    var r = Ni(t, n);
    $s(t, n);
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
        ps(e, n), i = yo(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n), i = n;
        break;
      case "select":
        No(e, n), i = bo(e, n), pt("invalid", e);
        break;
      case "textarea":
        Iv(e, n), i = Tf(e, n), pt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Af(t, i), TC(t, e, a, i, r), t) {
      case "input":
        gi(e), M(e, n, !1);
        break;
      case "textarea":
        gi(e), Gv(e);
        break;
      case "option":
        ot(e, n);
        break;
      case "select":
        Cf(e, n);
        break;
      default:
        typeof i.onClick == "function" && Gs(e);
        break;
    }
  }
  function LC(e, t, n, a, r) {
    $s(t, a);
    var i = null, l, u;
    switch (t) {
      case "input":
        l = yo(e, n), u = yo(e, a), i = [];
        break;
      case "select":
        l = bo(e, n), u = bo(e, a), i = [];
        break;
      case "textarea":
        l = Tf(e, n), u = Tf(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Gs(e);
        break;
    }
    Af(t, u);
    var s, m, h = null;
    for (s in l)
      if (!(u.hasOwnProperty(s) || !l.hasOwnProperty(s) || l[s] == null))
        if (s === Li) {
          var x = l[s];
          for (m in x)
            x.hasOwnProperty(m) && (h || (h = {}), h[m] = "");
        } else s === eu || s === Oi || s === Ps || s === Br || s === My || (Tt.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in u) {
      var S = u[s], O = l != null ? l[s] : void 0;
      if (!(!u.hasOwnProperty(s) || S === O || S == null && O == null))
        if (s === Li)
          if (S && Object.freeze(S), O) {
            for (m in O)
              O.hasOwnProperty(m) && (!S || !S.hasOwnProperty(m)) && (h || (h = {}), h[m] = "");
            for (m in S)
              S.hasOwnProperty(m) && O[m] !== S[m] && (h || (h = {}), h[m] = S[m]);
          } else
            h || (i || (i = []), i.push(s, h)), h = S;
        else if (s === eu) {
          var A = S ? S[Bs] : void 0, z = O ? O[Bs] : void 0;
          A != null && z !== A && (i = i || []).push(s, A);
        } else s === Oi ? (typeof S == "string" || typeof S == "number") && (i = i || []).push(s, "" + S) : s === Ps || s === Br || (Tt.hasOwnProperty(s) ? (S != null && (typeof S != "function" && Ys(s, S), s === "onScroll" && pt("scroll", e)), !i && O !== S && (i = [])) : (i = i || []).push(s, S));
    }
    return h && (JE(h, u[Li]), (i = i || []).push(Li, h)), i;
  }
  function MC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && c(e, r);
    var i = Ni(n, a), l = Ni(n, r);
    switch (jC(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        qv(e, r);
        break;
      case "select":
        ms(e, r);
        break;
    }
  }
  function AC(e) {
    {
      var t = e.toLowerCase();
      return ys.hasOwnProperty(t) && ys[t] || null;
    }
  }
  function VC(e, t, n, a, r, i, l) {
    var u, s;
    switch (u = Ni(t, n), $s(t, n), t) {
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
        ps(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n);
        break;
      case "select":
        No(e, n), pt("invalid", e);
        break;
      case "textarea":
        Iv(e, n), pt("invalid", e);
        break;
    }
    Af(t, n);
    {
      s = /* @__PURE__ */ new Set();
      for (var h = e.attributes, x = 0; x < h.length; x++) {
        var S = h[x].name.toLowerCase();
        switch (S) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            s.add(h[x].name);
        }
      }
    }
    var O = null;
    for (var A in n)
      if (n.hasOwnProperty(A)) {
        var z = n[A];
        if (A === Oi)
          typeof z == "string" ? e.textContent !== z && (n[Br] !== !0 && qs(e.textContent, z, i, l), O = [Oi, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Br] !== !0 && qs(e.textContent, z, i, l), O = [Oi, "" + z]);
        else if (Tt.hasOwnProperty(A))
          z != null && (typeof z != "function" && Ys(A, z), A === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var ne = void 0, Ee = Nt(A);
          if (n[Br] !== !0) {
            if (!(A === Ps || A === Br || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            A === "value" || A === "checked" || A === "selected")) {
              if (A === eu) {
                var me = e.innerHTML, qe = z ? z[Bs] : void 0;
                if (qe != null) {
                  var Pe = ky(e, qe);
                  Pe !== me && tu(A, me, Pe);
                }
              } else if (A === Li) {
                if (s.delete(A), Vy) {
                  var w = KE(z);
                  ne = e.getAttribute("style"), w !== ne && tu(A, ne, w);
                }
              } else if (u && !xn)
                s.delete(A.toLowerCase()), ne = ci(e, A, z), z !== ne && tu(A, ne, z);
              else if (!yt(A, Ee, u) && !vn(A, z, Ee, u)) {
                var H = !1;
                if (Ee !== null)
                  s.delete(Ee.attributeName), ne = Xi(e, A, z, Ee);
                else {
                  var _ = a;
                  if (_ === or && (_ = wf(t)), _ === or)
                    s.delete(A.toLowerCase());
                  else {
                    var W = AC(A);
                    W !== null && W !== A && (H = !0, s.delete(W)), s.delete(A);
                  }
                  ne = ci(e, A, z);
                }
                var se = xn;
                !se && z !== ne && !H && tu(A, ne, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    s.size > 0 && n[Br] !== !0 && Ay(s), t) {
      case "input":
        gi(e), M(e, n, !0);
        break;
      case "textarea":
        gi(e), Gv(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Gs(e);
        break;
    }
    return O;
  }
  function kC(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function qd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Wd(e, t, n) {
    {
      if (Hn)
        return;
      Hn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Qd(e, t) {
    {
      if (t === "" || Hn)
        return;
      Hn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function UC(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
        return;
      case "textarea":
        OE(e, n);
        return;
      case "select":
        Df(e, n);
        return;
    }
  }
  var nu = function() {
  }, au = function() {
  };
  {
    var FC = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Fy = [
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
    ], zC = Fy.concat(["button"]), HC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], zy = {
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
      var n = ze({}, e || zy), a = {
        tag: t
      };
      return Fy.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), zC.indexOf(t) !== -1 && (n.pTagInButtonScope = null), FC.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var PC = function(e, t) {
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
          return HC.indexOf(t) === -1;
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
    }, BC = function(e, t) {
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
    }, Hy = {};
    nu = function(e, t, n) {
      n = n || zy;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = PC(e, r) ? null : a, l = i ? null : BC(e, n), u = i || l;
      if (u) {
        var s = u.tag, m = !!i + "|" + e + "|" + s;
        if (!Hy[m]) {
          Hy[m] = !0;
          var h = e, x = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", x = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var S = "";
            s === "table" && e === "tr" && (S += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, s, x, S);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", h, s);
        }
      }
    };
  }
  var Ws = "suppressHydrationWarning", Qs = "$", Ks = "/$", ru = "$?", iu = "$!", $C = "style", Kd = null, Xd = null;
  function YC(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case sr:
      case Of: {
        t = a === sr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : _f(null, "");
        break;
      }
      default: {
        var i = a === wt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = _f(l, t);
        break;
      }
    }
    {
      var u = t.toLowerCase(), s = au(null, u);
      return {
        namespace: n,
        ancestorInfo: s
      };
    }
  }
  function IC(e, t, n) {
    {
      var a = e, r = _f(a.namespace, t), i = au(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function M_(e) {
    return e;
  }
  function qC(e) {
    Kd = $x(), Xd = lC();
    var t = null;
    return Wh(!1), t;
  }
  function GC(e) {
    oC(Xd), Wh(Kd), Kd = null, Xd = null;
  }
  function WC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (nu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, s = au(l.ancestorInfo, e);
        nu(null, u, s);
      }
      i = l.namespace;
    }
    var m = wC(e, t, n, i);
    return uu(r, m), ip(m, t), m;
  }
  function QC(e, t) {
    e.appendChild(t);
  }
  function KC(e, t, n, a, r) {
    switch (OC(e, t, n, a), t) {
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
  function XC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var u = "" + a.children, s = au(l.ancestorInfo, t);
        nu(null, u, s);
      }
    }
    return LC(e, t, n, a);
  }
  function Jd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function JC(e, t, n, a) {
    {
      var r = n;
      nu(null, e, r.ancestorInfo);
    }
    var i = _C(e, t);
    return uu(a, i), i;
  }
  function ZC() {
    var e = window.event;
    return e === void 0 ? vr : Qh(e.type);
  }
  var Zd = typeof setTimeout == "function" ? setTimeout : void 0, e0 = typeof clearTimeout == "function" ? clearTimeout : void 0, ep = -1, Py = typeof Promise == "function" ? Promise : void 0, t0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Py < "u" ? function(e) {
    return Py.resolve(null).then(e).catch(n0);
  } : Zd;
  function n0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function a0(e, t, n, a) {
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
  function r0(e, t, n, a, r, i) {
    MC(e, t, n, a, r), ip(e, r);
  }
  function By(e) {
    hs(e, "");
  }
  function i0(e, t, n) {
    e.nodeValue = n;
  }
  function l0(e, t) {
    e.appendChild(t);
  }
  function o0(e, t) {
    var n;
    e.nodeType === wt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Gs(n);
  }
  function u0(e, t, n) {
    e.insertBefore(t, n);
  }
  function s0(e, t, n) {
    e.nodeType === wt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function c0(e, t) {
    e.removeChild(t);
  }
  function f0(e, t) {
    e.nodeType === wt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function tp(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === wt) {
        var i = r.data;
        if (i === Ks)
          if (a === 0) {
            e.removeChild(r), Po(t);
            return;
          } else
            a--;
        else (i === Qs || i === ru || i === iu) && a++;
      }
      n = r;
    } while (n);
    Po(t);
  }
  function d0(e, t) {
    e.nodeType === wt ? tp(e.parentNode, t) : e.nodeType === zn && tp(e, t), Po(e);
  }
  function p0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function m0(e) {
    e.nodeValue = "";
  }
  function v0(e, t) {
    e = e;
    var n = t[$C], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Lf("display", a);
  }
  function h0(e, t) {
    e.nodeValue = t;
  }
  function y0(e) {
    e.nodeType === zn ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function g0(e, t, n) {
    return e.nodeType !== zn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function b0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function N0(e) {
    return e.nodeType !== wt ? null : e;
  }
  function $y(e) {
    return e.data === ru;
  }
  function np(e) {
    return e.data === iu;
  }
  function E0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function S0(e, t) {
    e._reactRetry = t;
  }
  function Xs(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === zn || t === ur)
        break;
      if (t === wt) {
        var n = e.data;
        if (n === Qs || n === iu || n === ru)
          break;
        if (n === Ks)
          return null;
      }
    }
    return e;
  }
  function lu(e) {
    return Xs(e.nextSibling);
  }
  function x0(e) {
    return Xs(e.firstChild);
  }
  function R0(e) {
    return Xs(e.firstChild);
  }
  function C0(e) {
    return Xs(e.nextSibling);
  }
  function D0(e, t, n, a, r, i, l) {
    uu(i, e), ip(e, n);
    var u;
    {
      var s = r;
      u = s.namespace;
    }
    var m = (i.mode & Ye) !== xe;
    return VC(e, t, n, u, a, m, l);
  }
  function T0(e, t, n, a) {
    return uu(n, e), n.mode & Ye, kC(e, t);
  }
  function j0(e, t) {
    uu(t, e);
  }
  function w0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === wt) {
        var a = t.data;
        if (a === Ks) {
          if (n === 0)
            return lu(t);
          n--;
        } else (a === Qs || a === iu || a === ru) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Yy(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === wt) {
        var a = t.data;
        if (a === Qs || a === iu || a === ru) {
          if (n === 0)
            return t;
          n--;
        } else a === Ks && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function _0(e) {
    Po(e);
  }
  function O0(e) {
    Po(e);
  }
  function L0(e) {
    return e !== "head" && e !== "body";
  }
  function M0(e, t, n, a) {
    var r = !0;
    qs(t.nodeValue, n, a, r);
  }
  function A0(e, t, n, a, r, i) {
    if (t[Ws] !== !0) {
      var l = !0;
      qs(a.nodeValue, r, i, l);
    }
  }
  function V0(e, t) {
    t.nodeType === zn ? qd(e, t) : t.nodeType === wt || Gd(e, t);
  }
  function k0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === zn ? qd(n, t) : t.nodeType === wt || Gd(n, t));
    }
  }
  function U0(e, t, n, a, r) {
    (r || t[Ws] !== !0) && (a.nodeType === zn ? qd(n, a) : a.nodeType === wt || Gd(n, a));
  }
  function F0(e, t, n) {
    Wd(e, t);
  }
  function z0(e, t) {
    Qd(e, t);
  }
  function H0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Wd(a, t);
    }
  }
  function P0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Qd(n, t);
    }
  }
  function B0(e, t, n, a, r, i) {
    (i || t[Ws] !== !0) && Wd(n, a);
  }
  function $0(e, t, n, a, r) {
    (r || t[Ws] !== !0) && Qd(n, a);
  }
  function Y0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function I0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, ap = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, rp = "__reactEvents$" + Dl, q0 = "__reactListeners$" + Dl, G0 = "__reactHandles$" + Dl;
  function W0(e) {
    delete e[Tl], delete e[ap], delete e[rp], delete e[q0], delete e[G0];
  }
  function uu(e, t) {
    t[Tl] = e;
  }
  function Js(e, t) {
    t[ou] = e;
  }
  function Iy(e) {
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
          for (var r = Yy(e); r !== null; ) {
            var i = r[Tl];
            if (i)
              return i;
            r = Yy(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function $r(e) {
    var t = e[Tl] || e[ou];
    return t && (t.tag === V || t.tag === Q || t.tag === P || t.tag === E) ? t : null;
  }
  function jl(e) {
    if (e.tag === V || e.tag === Q)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function Zs(e) {
    return e[ap] || null;
  }
  function ip(e, t) {
    e[ap] = t;
  }
  function Q0(e) {
    var t = e[rp];
    return t === void 0 && (t = e[rp] = /* @__PURE__ */ new Set()), t;
  }
  var qy = {}, Gy = v.ReactDebugCurrentFrame;
  function ec(e) {
    if (e) {
      var t = e._owner, n = co(e.type, e._source, t ? t.type : null);
      Gy.setExtraStackFrame(n);
    } else
      Gy.setExtraStackFrame(null);
  }
  function Ca(e, t, n, a, r) {
    {
      var i = Function.call.bind(kn);
      for (var l in e)
        if (i(e, l)) {
          var u = void 0;
          try {
            if (typeof e[l] != "function") {
              var s = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw s.name = "Invariant Violation", s;
            }
            u = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (m) {
            u = m;
          }
          u && !(u instanceof Error) && (ec(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), ec(null)), u instanceof Error && !(u.message in qy) && (qy[u.message] = !0, ec(r), f("Failed %s type: %s", n, u.message), ec(null));
        }
    }
  }
  var lp = [], tc;
  tc = [];
  var hr = -1;
  function Yr(e) {
    return {
      current: e
    };
  }
  function gn(e, t) {
    if (hr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== tc[hr] && f("Unexpected Fiber popped."), e.current = lp[hr], lp[hr] = null, tc[hr] = null, hr--;
  }
  function bn(e, t, n) {
    hr++, lp[hr] = e.current, tc[hr] = n, e.current = t;
  }
  var op;
  op = {};
  var Jn = {};
  Object.freeze(Jn);
  var yr = Yr(Jn), Ia = Yr(!1), up = Jn;
  function wl(e, t, n) {
    return n && qa(t) ? up : yr.current;
  }
  function Wy(e, t, n) {
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
        var u = Ve(e) || "Unknown";
        Ca(a, i, "context", u);
      }
      return r && Wy(e, t, i), i;
    }
  }
  function nc() {
    return Ia.current;
  }
  function qa(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function ac(e) {
    gn(Ia, e), gn(yr, e);
  }
  function sp(e) {
    gn(Ia, e), gn(yr, e);
  }
  function Qy(e, t, n) {
    {
      if (yr.current !== Jn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      bn(yr, t, e), bn(Ia, n, e);
    }
  }
  function Ky(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Ve(e) || "Unknown";
          op[i] || (op[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error((Ve(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var s = Ve(e) || "Unknown";
        Ca(r, l, "child context", s);
      }
      return ze({}, n, l);
    }
  }
  function rc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Jn;
      return up = yr.current, bn(yr, n, e), bn(Ia, Ia.current, e), !0;
    }
  }
  function Xy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Ky(e, t, up);
        a.__reactInternalMemoizedMergedChildContext = r, gn(Ia, e), gn(yr, e), bn(yr, r, e), bn(Ia, n, e);
      } else
        gn(Ia, e), bn(Ia, n, e);
    }
  }
  function K0(e) {
    {
      if (!LS(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case E:
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
  var Ir = 0, ic = 1, gr = null, cp = !1, fp = !1;
  function Jy(e) {
    gr === null ? gr = [e] : gr.push(e);
  }
  function X0(e) {
    cp = !0, Jy(e);
  }
  function Zy() {
    cp && qr();
  }
  function qr() {
    if (!fp && gr !== null) {
      fp = !0;
      var e = 0, t = Ra();
      try {
        var n = !0, a = gr;
        for (Kt(Qn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        gr = null, cp = !1;
      } catch (i) {
        throw gr !== null && (gr = gr.slice(e + 1)), xh(Es, qr), i;
      } finally {
        Kt(t), fp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, lc = null, oc = 0, oa = [], ua = 0, Ai = null, br = 1, Nr = "";
  function J0(e) {
    return ki(), (e.flags & vh) !== Ce;
  }
  function Z0(e) {
    return ki(), oc;
  }
  function eD() {
    var e = Nr, t = br, n = t & ~tD(t);
    return n.toString(32) + e;
  }
  function Vi(e, t) {
    ki(), Ol[Ll++] = oc, Ol[Ll++] = lc, lc = e, oc = t;
  }
  function eg(e, t, n) {
    ki(), oa[ua++] = br, oa[ua++] = Nr, oa[ua++] = Ai, Ai = e;
    var a = br, r = Nr, i = uc(a) - 1, l = a & ~(1 << i), u = n + 1, s = uc(t) + i;
    if (s > 30) {
      var m = i - i % 5, h = (1 << m) - 1, x = (l & h).toString(32), S = l >> m, O = i - m, A = uc(t) + O, z = u << O, ne = z | S, Ee = x + r;
      br = 1 << A | ne, Nr = Ee;
    } else {
      var me = u << i, qe = me | l, Pe = r;
      br = 1 << s | qe, Nr = Pe;
    }
  }
  function dp(e) {
    ki();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Vi(e, n), eg(e, n, a);
    }
  }
  function uc(e) {
    return 32 - wh(e);
  }
  function tD(e) {
    return 1 << uc(e) - 1;
  }
  function pp(e) {
    for (; e === lc; )
      lc = Ol[--Ll], Ol[Ll] = null, oc = Ol[--Ll], Ol[Ll] = null;
    for (; e === Ai; )
      Ai = oa[--ua], oa[ua] = null, Nr = oa[--ua], oa[ua] = null, br = oa[--ua], oa[ua] = null;
  }
  function nD() {
    return ki(), Ai !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function aD(e, t) {
    ki(), oa[ua++] = br, oa[ua++] = Nr, oa[ua++] = Ai, br = t.id, Nr = t.overflow, Ai = e;
  }
  function ki() {
    an() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var nn = null, sa = null, Da = !1, Ui = !1, Gr = null;
  function rD() {
    Da && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function tg() {
    Ui = !0;
  }
  function iD() {
    return Ui;
  }
  function lD(e) {
    var t = e.stateNode.containerInfo;
    return sa = R0(t), nn = e, Da = !0, Gr = null, Ui = !1, !0;
  }
  function oD(e, t, n) {
    return sa = C0(t), nn = e, Da = !0, Gr = null, Ui = !1, n !== null && aD(e, n), !0;
  }
  function ng(e, t) {
    switch (e.tag) {
      case E: {
        V0(e.stateNode.containerInfo, t);
        break;
      }
      case V: {
        var n = (e.mode & Ye) !== xe;
        U0(
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
        a.dehydrated !== null && k0(a.dehydrated, t);
        break;
      }
    }
  }
  function ag(e, t) {
    ng(e, t);
    var n = f1();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ei) : a.push(n);
  }
  function mp(e, t) {
    {
      if (Ui)
        return;
      switch (e.tag) {
        case E: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case V:
              var a = t.type;
              t.pendingProps, F0(n, a);
              break;
            case Q:
              var r = t.pendingProps;
              z0(n, r);
              break;
          }
          break;
        }
        case V: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case V: {
              var s = t.type, m = t.pendingProps, h = (e.mode & Ye) !== xe;
              B0(
                i,
                l,
                u,
                s,
                m,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case Q: {
              var x = t.pendingProps, S = (e.mode & Ye) !== xe;
              $0(
                i,
                l,
                u,
                x,
                // TODO: Delete this argument when we remove the legacy root API.
                S
              );
              break;
            }
          }
          break;
        }
        case P: {
          var O = e.memoizedState, A = O.dehydrated;
          if (A !== null) switch (t.tag) {
            case V:
              var z = t.type;
              t.pendingProps, H0(A, z);
              break;
            case Q:
              var ne = t.pendingProps;
              P0(A, ne);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function rg(e, t) {
    t.flags = t.flags & ~fr | _t, mp(e, t);
  }
  function ig(e, t) {
    switch (e.tag) {
      case V: {
        var n = e.type;
        e.pendingProps;
        var a = g0(t, n);
        return a !== null ? (e.stateNode = a, nn = e, sa = x0(a), !0) : !1;
      }
      case Q: {
        var r = e.pendingProps, i = b0(t, r);
        return i !== null ? (e.stateNode = i, nn = e, sa = null, !0) : !1;
      }
      case P: {
        var l = N0(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: nD(),
            retryLane: Gn
          };
          e.memoizedState = u;
          var s = d1(l);
          return s.return = e, e.child = s, nn = e, sa = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function vp(e) {
    return (e.mode & Ye) !== xe && (e.flags & Xe) === Ce;
  }
  function hp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function yp(e) {
    if (Da) {
      var t = sa;
      if (!t) {
        vp(e) && (mp(nn, e), hp()), rg(nn, e), Da = !1, nn = e;
        return;
      }
      var n = t;
      if (!ig(e, t)) {
        vp(e) && (mp(nn, e), hp()), t = lu(n);
        var a = nn;
        if (!t || !ig(e, t)) {
          rg(nn, e), Da = !1, nn = e;
          return;
        }
        ag(a, n);
      }
    }
  }
  function uD(e, t, n) {
    var a = e.stateNode, r = !Ui, i = D0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function sD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = T0(t, n, e);
    if (a) {
      var r = nn;
      if (r !== null)
        switch (r.tag) {
          case E: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== xe;
            M0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case V: {
            var u = r.type, s = r.memoizedProps, m = r.stateNode, h = (r.mode & Ye) !== xe;
            A0(
              u,
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
  function cD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    j0(n, e);
  }
  function fD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return w0(n);
  }
  function lg(e) {
    for (var t = e.return; t !== null && t.tag !== V && t.tag !== E && t.tag !== P; )
      t = t.return;
    nn = t;
  }
  function sc(e) {
    if (e !== nn)
      return !1;
    if (!Da)
      return lg(e), Da = !0, !1;
    if (e.tag !== E && (e.tag !== V || L0(e.type) && !Jd(e.type, e.memoizedProps))) {
      var t = sa;
      if (t)
        if (vp(e))
          og(e), hp();
        else
          for (; t; )
            ag(e, t), t = lu(t);
    }
    return lg(e), e.tag === P ? sa = fD(e) : sa = nn ? lu(e.stateNode) : null, !0;
  }
  function dD() {
    return Da && sa !== null;
  }
  function og(e) {
    for (var t = sa; t; )
      ng(e, t), t = lu(t);
  }
  function Ml() {
    nn = null, sa = null, Da = !1, Ui = !1;
  }
  function ug() {
    Gr !== null && (tN(Gr), Gr = null);
  }
  function an() {
    return Da;
  }
  function gp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var pD = v.ReactCurrentBatchConfig, mD = null;
  function vD() {
    return pD.transition;
  }
  var Ta = {
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
    var hD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & St && (t = n), n = n.return;
      return t;
    }, Fi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, cu = [], fu = [], du = [], pu = [], mu = [], vu = [], zi = /* @__PURE__ */ new Set();
    Ta.recordUnsafeLifecycleWarnings = function(e, t) {
      zi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && cu.push(e), e.mode & St && typeof t.UNSAFE_componentWillMount == "function" && fu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & St && typeof t.UNSAFE_componentWillReceiveProps == "function" && pu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & St && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Ta.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(S) {
        e.add(Ve(S) || "Component"), zi.add(S.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(S) {
        t.add(Ve(S) || "Component"), zi.add(S.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(S) {
        n.add(Ve(S) || "Component"), zi.add(S.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(S) {
        a.add(Ve(S) || "Component"), zi.add(S.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(S) {
        r.add(Ve(S) || "Component"), zi.add(S.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(S) {
        i.add(Ve(S) || "Component"), zi.add(S.type);
      }), vu = []), t.size > 0) {
        var l = Fi(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = Fi(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var s = Fi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, s);
      }
      if (e.size > 0) {
        var m = Fi(e);
        R(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, m);
      }
      if (n.size > 0) {
        var h = Fi(n);
        R(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var x = Fi(r);
        R(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
      }
    };
    var cc = /* @__PURE__ */ new Map(), sg = /* @__PURE__ */ new Set();
    Ta.recordLegacyContextWarning = function(e, t) {
      var n = hD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!sg.has(e.type)) {
        var a = cc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], cc.set(n, a)), a.push(e));
      }
    }, Ta.flushLegacyContextWarning = function() {
      cc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Ve(i) || "Component"), sg.add(i.type);
          });
          var r = Fi(a);
          try {
            mt(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            qt();
          }
        }
      });
    }, Ta.discardPendingWarnings = function() {
      cu = [], fu = [], du = [], pu = [], mu = [], vu = [], cc = /* @__PURE__ */ new Map();
    };
  }
  var bp, Np, Ep, Sp, xp, cg = function(e, t) {
  };
  bp = !1, Np = !1, Ep = {}, Sp = {}, xp = {}, cg = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Ve(t) || "Component";
      Sp[n] || (Sp[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function yD(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function hu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & St || Dt) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !yD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Ve(e) || "Component";
        Ep[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Ep[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var u = i;
          if (u.tag !== T)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = u.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var s = l;
        tr(a, "ref");
        var m = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === m)
          return t.ref;
        var h = function(x) {
          var S = s.refs;
          x === null ? delete S[m] : S[m] = x;
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
  function fc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function dc(e) {
    {
      var t = Ve(e) || "Component";
      if (xp[t])
        return;
      xp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function fg(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function dg(e) {
    function t(w, H) {
      if (e) {
        var _ = w.deletions;
        _ === null ? (w.deletions = [H], w.flags |= Ei) : _.push(H);
      }
    }
    function n(w, H) {
      if (!e)
        return null;
      for (var _ = H; _ !== null; )
        t(w, _), _ = _.sibling;
      return null;
    }
    function a(w, H) {
      for (var _ = /* @__PURE__ */ new Map(), W = H; W !== null; )
        W.key !== null ? _.set(W.key, W) : _.set(W.index, W), W = W.sibling;
      return _;
    }
    function r(w, H) {
      var _ = Wi(w, H);
      return _.index = 0, _.sibling = null, _;
    }
    function i(w, H, _) {
      if (w.index = _, !e)
        return w.flags |= vh, H;
      var W = w.alternate;
      if (W !== null) {
        var se = W.index;
        return se < H ? (w.flags |= _t, H) : se;
      } else
        return w.flags |= _t, H;
    }
    function l(w) {
      return e && w.alternate === null && (w.flags |= _t), w;
    }
    function u(w, H, _, W) {
      if (H === null || H.tag !== Q) {
        var se = gv(_, w.mode, W);
        return se.return = w, se;
      } else {
        var re = r(H, _);
        return re.return = w, re;
      }
    }
    function s(w, H, _, W) {
      var se = _.type;
      if (se === za)
        return h(w, H, _.props.children, W, _.key);
      if (H !== null && (H.elementType === se || // Keep this check inline so it only runs on the false path:
      yN(H, _) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof se == "object" && se !== null && se.$$typeof === Se && fg(se) === H.type)) {
        var re = r(H, _.props);
        return re.ref = hu(w, H, _), re.return = w, re._debugSource = _._source, re._debugOwner = _._owner, re;
      }
      var De = yv(_, w.mode, W);
      return De.ref = hu(w, H, _), De.return = w, De;
    }
    function m(w, H, _, W) {
      if (H === null || H.tag !== j || H.stateNode.containerInfo !== _.containerInfo || H.stateNode.implementation !== _.implementation) {
        var se = bv(_, w.mode, W);
        return se.return = w, se;
      } else {
        var re = r(H, _.children || []);
        return re.return = w, re;
      }
    }
    function h(w, H, _, W, se) {
      if (H === null || H.tag !== pe) {
        var re = ri(_, w.mode, W, se);
        return re.return = w, re;
      } else {
        var De = r(H, _);
        return De.return = w, De;
      }
    }
    function x(w, H, _) {
      if (typeof H == "string" && H !== "" || typeof H == "number") {
        var W = gv("" + H, w.mode, _);
        return W.return = w, W;
      }
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case ia: {
            var se = yv(H, w.mode, _);
            return se.ref = hu(w, null, H), se.return = w, se;
          }
          case qn: {
            var re = bv(H, w.mode, _);
            return re.return = w, re;
          }
          case Se: {
            var De = H._payload, Ae = H._init;
            return x(w, Ae(De), _);
          }
        }
        if (He(H) || Ea(H)) {
          var rt = ri(H, w.mode, _, null);
          return rt.return = w, rt;
        }
        fc(w, H);
      }
      return typeof H == "function" && dc(w), null;
    }
    function S(w, H, _, W) {
      var se = H !== null ? H.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number")
        return se !== null ? null : u(w, H, "" + _, W);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return _.key === se ? s(w, H, _, W) : null;
          case qn:
            return _.key === se ? m(w, H, _, W) : null;
          case Se: {
            var re = _._payload, De = _._init;
            return S(w, H, De(re), W);
          }
        }
        if (He(_) || Ea(_))
          return se !== null ? null : h(w, H, _, W, null);
        fc(w, _);
      }
      return typeof _ == "function" && dc(w), null;
    }
    function O(w, H, _, W, se) {
      if (typeof W == "string" && W !== "" || typeof W == "number") {
        var re = w.get(_) || null;
        return u(H, re, "" + W, se);
      }
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case ia: {
            var De = w.get(W.key === null ? _ : W.key) || null;
            return s(H, De, W, se);
          }
          case qn: {
            var Ae = w.get(W.key === null ? _ : W.key) || null;
            return m(H, Ae, W, se);
          }
          case Se:
            var rt = W._payload, Ge = W._init;
            return O(w, H, _, Ge(rt), se);
        }
        if (He(W) || Ea(W)) {
          var Ct = w.get(_) || null;
          return h(H, Ct, W, se, null);
        }
        fc(H, W);
      }
      return typeof W == "function" && dc(H), null;
    }
    function A(w, H, _) {
      {
        if (typeof w != "object" || w === null)
          return H;
        switch (w.$$typeof) {
          case ia:
          case qn:
            cg(w, _);
            var W = w.key;
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
            var se = w._payload, re = w._init;
            A(re(se), H, _);
            break;
        }
      }
      return H;
    }
    function z(w, H, _, W) {
      for (var se = null, re = 0; re < _.length; re++) {
        var De = _[re];
        se = A(De, se, w);
      }
      for (var Ae = null, rt = null, Ge = H, Ct = 0, We = 0, xt = null; Ge !== null && We < _.length; We++) {
        Ge.index > We ? (xt = Ge, Ge = null) : xt = Ge.sibling;
        var En = S(w, Ge, _[We], W);
        if (En === null) {
          Ge === null && (Ge = xt);
          break;
        }
        e && Ge && En.alternate === null && t(w, Ge), Ct = i(En, Ct, We), rt === null ? Ae = En : rt.sibling = En, rt = En, Ge = xt;
      }
      if (We === _.length) {
        if (n(w, Ge), an()) {
          var fn = We;
          Vi(w, fn);
        }
        return Ae;
      }
      if (Ge === null) {
        for (; We < _.length; We++) {
          var ea = x(w, _[We], W);
          ea !== null && (Ct = i(ea, Ct, We), rt === null ? Ae = ea : rt.sibling = ea, rt = ea);
        }
        if (an()) {
          var An = We;
          Vi(w, An);
        }
        return Ae;
      }
      for (var Vn = a(w, Ge); We < _.length; We++) {
        var Sn = O(Vn, w, We, _[We], W);
        Sn !== null && (e && Sn.alternate !== null && Vn.delete(Sn.key === null ? We : Sn.key), Ct = i(Sn, Ct, We), rt === null ? Ae = Sn : rt.sibling = Sn, rt = Sn);
      }
      if (e && Vn.forEach(function(Jl) {
        return t(w, Jl);
      }), an()) {
        var Tr = We;
        Vi(w, Tr);
      }
      return Ae;
    }
    function ne(w, H, _, W) {
      var se = Ea(_);
      if (typeof se != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        _[Symbol.toStringTag] === "Generator" && (Np || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Np = !0), _.entries === se && (bp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), bp = !0);
        var re = se.call(_);
        if (re)
          for (var De = null, Ae = re.next(); !Ae.done; Ae = re.next()) {
            var rt = Ae.value;
            De = A(rt, De, w);
          }
      }
      var Ge = se.call(_);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Ct = null, We = null, xt = H, En = 0, fn = 0, ea = null, An = Ge.next(); xt !== null && !An.done; fn++, An = Ge.next()) {
        xt.index > fn ? (ea = xt, xt = null) : ea = xt.sibling;
        var Vn = S(w, xt, An.value, W);
        if (Vn === null) {
          xt === null && (xt = ea);
          break;
        }
        e && xt && Vn.alternate === null && t(w, xt), En = i(Vn, En, fn), We === null ? Ct = Vn : We.sibling = Vn, We = Vn, xt = ea;
      }
      if (An.done) {
        if (n(w, xt), an()) {
          var Sn = fn;
          Vi(w, Sn);
        }
        return Ct;
      }
      if (xt === null) {
        for (; !An.done; fn++, An = Ge.next()) {
          var Tr = x(w, An.value, W);
          Tr !== null && (En = i(Tr, En, fn), We === null ? Ct = Tr : We.sibling = Tr, We = Tr);
        }
        if (an()) {
          var Jl = fn;
          Vi(w, Jl);
        }
        return Ct;
      }
      for (var Wu = a(w, xt); !An.done; fn++, An = Ge.next()) {
        var er = O(Wu, w, fn, An.value, W);
        er !== null && (e && er.alternate !== null && Wu.delete(er.key === null ? fn : er.key), En = i(er, En, fn), We === null ? Ct = er : We.sibling = er, We = er);
      }
      if (e && Wu.forEach(function($1) {
        return t(w, $1);
      }), an()) {
        var B1 = fn;
        Vi(w, B1);
      }
      return Ct;
    }
    function Ee(w, H, _, W) {
      if (H !== null && H.tag === Q) {
        n(w, H.sibling);
        var se = r(H, _);
        return se.return = w, se;
      }
      n(w, H);
      var re = gv(_, w.mode, W);
      return re.return = w, re;
    }
    function me(w, H, _, W) {
      for (var se = _.key, re = H; re !== null; ) {
        if (re.key === se) {
          var De = _.type;
          if (De === za) {
            if (re.tag === pe) {
              n(w, re.sibling);
              var Ae = r(re, _.props.children);
              return Ae.return = w, Ae._debugSource = _._source, Ae._debugOwner = _._owner, Ae;
            }
          } else if (re.elementType === De || // Keep this check inline so it only runs on the false path:
          yN(re, _) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === Se && fg(De) === re.type) {
            n(w, re.sibling);
            var rt = r(re, _.props);
            return rt.ref = hu(w, re, _), rt.return = w, rt._debugSource = _._source, rt._debugOwner = _._owner, rt;
          }
          n(w, re);
          break;
        } else
          t(w, re);
        re = re.sibling;
      }
      if (_.type === za) {
        var Ge = ri(_.props.children, w.mode, W, _.key);
        return Ge.return = w, Ge;
      } else {
        var Ct = yv(_, w.mode, W);
        return Ct.ref = hu(w, H, _), Ct.return = w, Ct;
      }
    }
    function qe(w, H, _, W) {
      for (var se = _.key, re = H; re !== null; ) {
        if (re.key === se)
          if (re.tag === j && re.stateNode.containerInfo === _.containerInfo && re.stateNode.implementation === _.implementation) {
            n(w, re.sibling);
            var De = r(re, _.children || []);
            return De.return = w, De;
          } else {
            n(w, re);
            break;
          }
        else
          t(w, re);
        re = re.sibling;
      }
      var Ae = bv(_, w.mode, W);
      return Ae.return = w, Ae;
    }
    function Pe(w, H, _, W) {
      var se = typeof _ == "object" && _ !== null && _.type === za && _.key === null;
      if (se && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return l(me(w, H, _, W));
          case qn:
            return l(qe(w, H, _, W));
          case Se:
            var re = _._payload, De = _._init;
            return Pe(w, H, De(re), W);
        }
        if (He(_))
          return z(w, H, _, W);
        if (Ea(_))
          return ne(w, H, _, W);
        fc(w, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" ? l(Ee(w, H, "" + _, W)) : (typeof _ == "function" && dc(w), n(w, H));
    }
    return Pe;
  }
  var Al = dg(!0), pg = dg(!1);
  function gD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Wi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Wi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function bD(e, t) {
    for (var n = e.child; n !== null; )
      l1(n, t), n = n.sibling;
  }
  var Rp = Yr(null), Cp;
  Cp = {};
  var pc = null, Vl = null, Dp = null, mc = !1;
  function vc() {
    pc = null, Vl = null, Dp = null, mc = !1;
  }
  function mg() {
    mc = !0;
  }
  function vg() {
    mc = !1;
  }
  function hg(e, t, n) {
    bn(Rp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Cp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Cp;
  }
  function Tp(e, t) {
    var n = Rp.current;
    gn(Rp, t), e._currentValue = n;
  }
  function jp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = Ue(r.childLanes, t)) : (a.childLanes = Ue(a.childLanes, t), r !== null && (r.childLanes = Ue(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function ND(e, t, n) {
    ED(e, t, n);
  }
  function ED(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var u = Ao(n), s = Er(st, u);
              s.tag = yc;
              var m = a.updateQueue;
              if (m !== null) {
                var h = m.shared, x = h.pending;
                x === null ? s.next = s : (s.next = x.next, x.next = s), h.pending = s;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var S = a.alternate;
            S !== null && (S.lanes = Ue(S.lanes, n)), jp(a.return, n, e), i.lanes = Ue(i.lanes, n);
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
        var A = O.alternate;
        A !== null && (A.lanes = Ue(A.lanes, n)), jp(O, n, e), r = a.sibling;
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
    pc = e, Vl = null, Dp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Wn(n.lanes, t) && Ou(), n.firstContext = null);
    }
  }
  function Ot(e) {
    mc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Dp !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Vl === null) {
        if (pc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Vl = n, pc.dependencies = {
          lanes: Y,
          firstContext: n
        };
      } else
        Vl = Vl.next = n;
    }
    return t;
  }
  var Hi = null;
  function wp(e) {
    Hi === null ? Hi = [e] : Hi.push(e);
  }
  function SD() {
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
  function yg(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, wp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, hc(e, a);
  }
  function xD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, wp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function RD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, wp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, hc(e, a);
  }
  function Pn(e, t) {
    return hc(e, t);
  }
  var CD = hc;
  function hc(e, t) {
    e.lanes = Ue(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (_t | fr)) !== Ce && pN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (_t | fr)) !== Ce && pN(e), a = r, r = r.return;
    if (a.tag === E) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var gg = 0, bg = 1, yc = 2, _p = 3, gc = !1, Op, bc;
  Op = !1, bc = null;
  function Lp(e) {
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
  function Ng(e, t) {
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
      tag: gg,
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
    if (bc === r && !Op && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Op = !0), xj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, CD(e, n);
    } else
      return RD(e, r, t, n);
  }
  function Nc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Mh(n)) {
        var i = r.lanes;
        i = Vh(i, e.pendingLanes);
        var l = Ue(i, n);
        r.lanes = l, Rd(e, l);
      }
    }
  }
  function Mp(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, u = n.firstBaseUpdate;
        if (u !== null) {
          var s = u;
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
  function DD(e, t, n, a, r, i) {
    switch (n.tag) {
      case bg: {
        var l = n.payload;
        if (typeof l == "function") {
          mg();
          var u = l.call(i, a, r);
          {
            if (e.mode & St) {
              Wt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Wt(!1);
              }
            }
            vg();
          }
          return u;
        }
        return l;
      }
      case _p:
        e.flags = e.flags & ~_n | Xe;
      case gg: {
        var s = n.payload, m;
        if (typeof s == "function") {
          mg(), m = s.call(i, a, r);
          {
            if (e.mode & St) {
              Wt(!0);
              try {
                s.call(i, a, r);
              } finally {
                Wt(!1);
              }
            }
            vg();
          }
        } else
          m = s;
        return m == null ? a : ze({}, a, m);
      }
      case yc:
        return gc = !0, a;
    }
    return a;
  }
  function Ec(e, t, n, a) {
    var r = e.updateQueue;
    gc = !1, bc = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
    if (u !== null) {
      r.shared.pending = null;
      var s = u, m = s.next;
      s.next = null, l === null ? i = m : l.next = m, l = s;
      var h = e.alternate;
      if (h !== null) {
        var x = h.updateQueue, S = x.lastBaseUpdate;
        S !== l && (S === null ? x.firstBaseUpdate = m : S.next = m, x.lastBaseUpdate = s);
      }
    }
    if (i !== null) {
      var O = r.baseState, A = Y, z = null, ne = null, Ee = null, me = i;
      do {
        var qe = me.lane, Pe = me.eventTime;
        if (bl(a, qe)) {
          if (Ee !== null) {
            var H = {
              eventTime: Pe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Qt,
              tag: me.tag,
              payload: me.payload,
              callback: me.callback,
              next: null
            };
            Ee = Ee.next = H;
          }
          O = DD(e, r, me, O, t, n);
          var _ = me.callback;
          if (_ !== null && // If the update was already committed, we should not queue its
          // callback again.
          me.lane !== Qt) {
            e.flags |= mh;
            var W = r.effects;
            W === null ? r.effects = [me] : W.push(me);
          }
        } else {
          var w = {
            eventTime: Pe,
            lane: qe,
            tag: me.tag,
            payload: me.payload,
            callback: me.callback,
            next: null
          };
          Ee === null ? (ne = Ee = w, z = O) : Ee = Ee.next = w, A = Ue(A, qe);
        }
        if (me = me.next, me === null) {
          if (u = r.shared.pending, u === null)
            break;
          var se = u, re = se.next;
          se.next = null, me = re, r.lastBaseUpdate = se, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (z = O), r.baseState = z, r.firstBaseUpdate = ne, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Ae = De;
        do
          A = Ue(A, Ae.lane), Ae = Ae.next;
        while (Ae !== De);
      } else i === null && (r.shared.lanes = Y);
      $u(A), e.lanes = A, e.memoizedState = O;
    }
    bc = null;
  }
  function TD(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Eg() {
    gc = !1;
  }
  function Sc() {
    return gc;
  }
  function Sg(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, TD(l, n));
      }
  }
  var yu = {}, Qr = Yr(yu), gu = Yr(yu), xc = Yr(yu);
  function Rc(e) {
    if (e === yu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function xg() {
    var e = Rc(xc.current);
    return e;
  }
  function Ap(e, t) {
    bn(xc, t, e), bn(gu, e, e), bn(Qr, yu, e);
    var n = YC(t);
    gn(Qr, e), bn(Qr, n, e);
  }
  function Ul(e) {
    gn(Qr, e), gn(gu, e), gn(xc, e);
  }
  function Vp() {
    var e = Rc(Qr.current);
    return e;
  }
  function Rg(e) {
    Rc(xc.current);
    var t = Rc(Qr.current), n = IC(t, e.type);
    t !== n && (bn(gu, e, e), bn(Qr, n, e));
  }
  function kp(e) {
    gu.current === e && (gn(Qr, e), gn(gu, e));
  }
  var jD = 0, Cg = 1, Dg = 1, bu = 2, ja = Yr(jD);
  function Up(e, t) {
    return (e & t) !== 0;
  }
  function Fl(e) {
    return e & Cg;
  }
  function Fp(e, t) {
    return e & Cg | t;
  }
  function wD(e, t) {
    return e | t;
  }
  function Kr(e, t) {
    bn(ja, t, e);
  }
  function zl(e) {
    gn(ja, e);
  }
  function _D(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Cc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === P) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || $y(a) || np(a))
            return t;
        }
      } else if (t.tag === U && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Xe) !== Ce;
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
  var Bn = (
    /*   */
    0
  ), Vt = (
    /* */
    1
  ), Ga = (
    /*  */
    2
  ), kt = (
    /*    */
    4
  ), rn = (
    /*   */
    8
  ), zp = [];
  function Hp() {
    for (var e = 0; e < zp.length; e++) {
      var t = zp[e];
      t._workInProgressVersionPrimary = null;
    }
    zp.length = 0;
  }
  function OD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ue = v.ReactCurrentDispatcher, Nu = v.ReactCurrentBatchConfig, Pp, Hl;
  Pp = /* @__PURE__ */ new Set();
  var Pi = Y, at = null, Ut = null, Ft = null, Dc = !1, Eu = !1, Su = 0, LD = 0, MD = 25, B = null, ca = null, Xr = -1, Bp = !1;
  function Ze() {
    {
      var e = B;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function Z() {
    {
      var e = B;
      ca !== null && (Xr++, ca[Xr] !== e && AD(e));
    }
  }
  function Pl(e) {
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", B, typeof e);
  }
  function AD(e) {
    {
      var t = Ve(at);
      if (!Pp.has(t) && (Pp.add(t), ca !== null)) {
        for (var n = "", a = 30, r = 0; r <= Xr; r++) {
          for (var i = ca[r], l = r === Xr ? e : i, u = r + 1 + ". " + i; u.length < a; )
            u += " ";
          u += l + `
`, n += u;
        }
        f(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, n);
      }
    }
  }
  function Nn() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function $p(e, t) {
    if (Bp)
      return !1;
    if (t === null)
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", B), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, B, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Bl(e, t, n, a, r, i) {
    Pi = i, at = t, ca = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Y, e !== null && e.memoizedState !== null ? ue.current = Wg : ca !== null ? ue.current = Gg : ue.current = qg;
    var l = n(a, r);
    if (Eu) {
      var u = 0;
      do {
        if (Eu = !1, Su = 0, u >= MD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, Bp = !1, Ut = null, Ft = null, t.updateQueue = null, Xr = -1, ue.current = Qg, l = n(a, r);
      } while (Eu);
    }
    ue.current = zc, t._debugHookTypes = ca;
    var s = Ut !== null && Ut.next !== null;
    if (Pi = Y, at = null, Ut = null, Ft = null, B = null, ca = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== xe && f("Internal React error: Expected static flag was missing. Please notify the React team."), Dc = !1, s)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function $l() {
    var e = Su !== 0;
    return Su = 0, e;
  }
  function Tg(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & $a) !== xe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ts(e.lanes, n);
  }
  function jg() {
    if (ue.current = zc, Dc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Dc = !1;
    }
    Pi = Y, at = null, Ut = null, Ft = null, ca = null, Xr = -1, B = null, Pg = !1, Eu = !1, Su = 0;
  }
  function Wa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ft === null ? at.memoizedState = Ft = e : Ft = Ft.next = e, Ft;
  }
  function fa() {
    var e;
    if (Ut === null) {
      var t = at.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Ut.next;
    var n;
    if (Ft === null ? n = at.memoizedState : n = Ft.next, n !== null)
      Ft = n, n = Ft.next, Ut = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Ut = e;
      var a = {
        memoizedState: Ut.memoizedState,
        baseState: Ut.baseState,
        baseQueue: Ut.baseQueue,
        queue: Ut.queue,
        next: null
      };
      Ft === null ? at.memoizedState = Ft = a : Ft = Ft.next = a;
    }
    return Ft;
  }
  function wg() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Yp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ip(e, t, n) {
    var a = Wa(), r;
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
    var l = i.dispatch = FD.bind(null, at, i);
    return [a.memoizedState, l];
  }
  function qp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Ut, l = i.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var s = l.next, m = u.next;
        l.next = m, u.next = s;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, x = i.baseState, S = null, O = null, A = null, z = h;
      do {
        var ne = z.lane;
        if (bl(Pi, ne)) {
          if (A !== null) {
            var me = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Qt,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            };
            A = A.next = me;
          }
          if (z.hasEagerState)
            x = z.eagerState;
          else {
            var qe = z.action;
            x = e(x, qe);
          }
        } else {
          var Ee = {
            lane: ne,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          A === null ? (O = A = Ee, S = x) : A = A.next = Ee, at.lanes = Ue(at.lanes, ne), $u(ne);
        }
        z = z.next;
      } while (z !== null && z !== h);
      A === null ? S = x : A.next = O, Xn(x, a.memoizedState) || Ou(), a.memoizedState = x, a.baseState = S, a.baseQueue = A, r.lastRenderedState = x;
    }
    var Pe = r.interleaved;
    if (Pe !== null) {
      var w = Pe;
      do {
        var H = w.lane;
        at.lanes = Ue(at.lanes, H), $u(H), w = w.next;
      } while (w !== Pe);
    } else l === null && (r.lanes = Y);
    var _ = r.dispatch;
    return [a.memoizedState, _];
  }
  function Gp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, u = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var s = l.next, m = s;
      do {
        var h = m.action;
        u = e(u, h), m = m.next;
      } while (m !== s);
      Xn(u, a.memoizedState) || Ou(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function A_(e, t, n) {
  }
  function V_(e, t, n) {
  }
  function Wp(e, t, n) {
    var a = at, r = Wa(), i, l = an();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var u = t();
        Xn(i, u) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
      }
      var s = rf();
      if (s === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ds(s, Pi) || _g(a, t, i);
    }
    r.memoizedState = i;
    var m = {
      value: i,
      getSnapshot: t
    };
    return r.queue = m, Oc(Lg.bind(null, a, m, e), [e]), a.flags |= Vr, xu(Vt | rn, Og.bind(null, a, m, i, t), void 0, null), i;
  }
  function Tc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Hl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var u = r.memoizedState, s = !Xn(u, i);
    s && (r.memoizedState = i, Ou());
    var m = r.queue;
    if (Cu(Lg.bind(null, a, m, e), [e]), m.getSnapshot !== t || s || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ft !== null && Ft.memoizedState.tag & Vt) {
      a.flags |= Vr, xu(Vt | rn, Og.bind(null, a, m, i, t), void 0, null);
      var h = rf();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ds(h, Pi) || _g(a, t, i);
    }
    return i;
  }
  function _g(e, t, n) {
    e.flags |= Yf;
    var a = {
      getSnapshot: t,
      value: n
    }, r = at.updateQueue;
    if (r === null)
      r = wg(), at.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function Og(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Mg(t) && Ag(e);
  }
  function Lg(e, t, n) {
    var a = function() {
      Mg(t) && Ag(e);
    };
    return n(a);
  }
  function Mg(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Xn(n, a);
    } catch {
      return !0;
    }
  }
  function Ag(e) {
    var t = Pn(e, _e);
    t !== null && Bt(t, e, _e, st);
  }
  function jc(e) {
    var t = Wa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: Y,
      dispatch: null,
      lastRenderedReducer: Yp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = zD.bind(null, at, n);
    return [t.memoizedState, a];
  }
  function Qp(e) {
    return qp(Yp);
  }
  function Kp(e) {
    return Gp(Yp);
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
      i = wg(), at.updateQueue = i, i.lastEffect = r.next = r;
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
  function Xp(e) {
    var t = Wa();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function wc(e) {
    var t = fa();
    return t.memoizedState;
  }
  function Ru(e, t, n, a) {
    var r = Wa(), i = a === void 0 ? null : a;
    at.flags |= e, r.memoizedState = xu(Vt | t, n, void 0, i);
  }
  function _c(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (Ut !== null) {
      var u = Ut.memoizedState;
      if (l = u.destroy, i !== null) {
        var s = u.deps;
        if ($p(i, s)) {
          r.memoizedState = xu(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = xu(Vt | t, n, l, i);
  }
  function Oc(e, t) {
    return (at.mode & $a) !== xe ? Ru(Wf | Vr | Gf, rn, e, t) : Ru(Vr | Gf, rn, e, t);
  }
  function Cu(e, t) {
    return _c(Vr, rn, e, t);
  }
  function Jp(e, t) {
    return Ru(Ke, Ga, e, t);
  }
  function Lc(e, t) {
    return _c(Ke, Ga, e, t);
  }
  function Zp(e, t) {
    var n = Ke;
    return n |= Ri, (at.mode & $a) !== xe && (n |= kr), Ru(n, kt, e, t);
  }
  function Mc(e, t) {
    return _c(Ke, kt, e, t);
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
  function em(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Ke;
    return r |= Ri, (at.mode & $a) !== xe && (r |= kr), Ru(r, kt, Vg.bind(null, t, e), a);
  }
  function Ac(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return _c(Ke, kt, Vg.bind(null, t, e), a);
  }
  function VD(e, t) {
  }
  var Vc = VD;
  function tm(e, t) {
    var n = Wa(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function kc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if ($p(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function nm(e, t) {
    var n = Wa(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function Uc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if ($p(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function am(e) {
    var t = Wa();
    return t.memoizedState = e, e;
  }
  function kg(e) {
    var t = fa(), n = Ut, a = n.memoizedState;
    return Fg(t, a, e);
  }
  function Ug(e) {
    var t = fa();
    if (Ut === null)
      return t.memoizedState = e, e;
    var n = Ut.memoizedState;
    return Fg(t, n, e);
  }
  function Fg(e, t, n) {
    var a = !Nx(Pi);
    if (a) {
      if (!Xn(n, t)) {
        var r = Ah();
        at.lanes = Ue(at.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function kD(e, t, n) {
    var a = Ra();
    Kt(wx(a, mr)), e(!0);
    var r = Nu.transition;
    Nu.transition = {};
    var i = Nu.transition;
    Nu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Kt(a), Nu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && R("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function rm() {
    var e = jc(!1), t = e[0], n = e[1], a = kD.bind(null, n), r = Wa();
    return r.memoizedState = a, [t, a];
  }
  function zg() {
    var e = Qp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  function Hg() {
    var e = Kp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  var Pg = !1;
  function UD() {
    return Pg;
  }
  function im() {
    var e = Wa(), t = rf(), n = t.identifierPrefix, a;
    if (an()) {
      var r = eD();
      a = ":" + n + "R" + r;
      var i = Su++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = LD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Fc() {
    var e = fa(), t = e.memoizedState;
    return t;
  }
  function FD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Bg(e))
      $g(t, r);
    else {
      var i = yg(e, t, r, a);
      if (i !== null) {
        var l = Mn();
        Bt(i, e, a, l), Yg(i, t, a);
      }
    }
    Ig(e, a);
  }
  function zD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Bg(e))
      $g(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === Y && (i === null || i.lanes === Y)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = ue.current, ue.current = wa;
          try {
            var s = t.lastRenderedState, m = l(s, n);
            if (r.hasEagerState = !0, r.eagerState = m, Xn(m, s)) {
              xD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ue.current = u;
          }
        }
      }
      var h = yg(e, t, r, a);
      if (h !== null) {
        var x = Mn();
        Bt(h, e, a, x), Yg(h, t, a);
      }
    }
    Ig(e, a);
  }
  function Bg(e) {
    var t = e.alternate;
    return e === at || t !== null && t === at;
  }
  function $g(e, t) {
    Eu = Dc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Yg(e, t, n) {
    if (Mh(n)) {
      var a = t.lanes;
      a = Vh(a, e.pendingLanes);
      var r = Ue(a, n);
      t.lanes = r, Rd(e, r);
    }
  }
  function Ig(e, t, n) {
    Zf(e, t);
  }
  var zc = {
    readContext: Ot,
    useCallback: Nn,
    useContext: Nn,
    useEffect: Nn,
    useImperativeHandle: Nn,
    useInsertionEffect: Nn,
    useLayoutEffect: Nn,
    useMemo: Nn,
    useReducer: Nn,
    useRef: Nn,
    useState: Nn,
    useDebugValue: Nn,
    useDeferredValue: Nn,
    useTransition: Nn,
    useMutableSource: Nn,
    useSyncExternalStore: Nn,
    useId: Nn,
    unstable_isNewReconciler: Je
  }, qg = null, Gg = null, Wg = null, Qg = null, Qa = null, wa = null, Hc = null;
  {
    var lm = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Oe = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    qg = {
      readContext: function(e) {
        return Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Ze(), Pl(t), tm(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Ze(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Ze(), Pl(t), Oc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Ze(), Pl(n), em(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Ze(), Pl(t), Jp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Ze(), Pl(t), Zp(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Ze(), Pl(t);
        var n = ue.current;
        ue.current = Qa;
        try {
          return nm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Ze();
        var a = ue.current;
        ue.current = Qa;
        try {
          return Ip(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Ze(), Xp(e);
      },
      useState: function(e) {
        B = "useState", Ze();
        var t = ue.current;
        ue.current = Qa;
        try {
          return jc(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Ze(), am(e);
      },
      useTransition: function() {
        return B = "useTransition", Ze(), rm();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Ze(), Wp(e, t, n);
      },
      useId: function() {
        return B = "useId", Ze(), im();
      },
      unstable_isNewReconciler: Je
    }, Gg = {
      readContext: function(e) {
        return Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Z(), tm(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Z(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Z(), Oc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Z(), em(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Z(), Jp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Z(), Zp(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Z();
        var n = ue.current;
        ue.current = Qa;
        try {
          return nm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Z();
        var a = ue.current;
        ue.current = Qa;
        try {
          return Ip(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Z(), Xp(e);
      },
      useState: function(e) {
        B = "useState", Z();
        var t = ue.current;
        ue.current = Qa;
        try {
          return jc(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Z(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Z(), am(e);
      },
      useTransition: function() {
        return B = "useTransition", Z(), rm();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Z(), Wp(e, t, n);
      },
      useId: function() {
        return B = "useId", Z(), im();
      },
      unstable_isNewReconciler: Je
    }, Wg = {
      readContext: function(e) {
        return Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Z(), kc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Z(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Z(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Z(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Z(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Z();
        var n = ue.current;
        ue.current = wa;
        try {
          return Uc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Z();
        var a = ue.current;
        ue.current = wa;
        try {
          return qp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Z(), wc();
      },
      useState: function(e) {
        B = "useState", Z();
        var t = ue.current;
        ue.current = wa;
        try {
          return Qp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Z(), Vc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Z(), kg(e);
      },
      useTransition: function() {
        return B = "useTransition", Z(), zg();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Z(), Tc(e, t);
      },
      useId: function() {
        return B = "useId", Z(), Fc();
      },
      unstable_isNewReconciler: Je
    }, Qg = {
      readContext: function(e) {
        return Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Z(), kc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Z(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Z(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Z(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Z(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Z();
        var n = ue.current;
        ue.current = Hc;
        try {
          return Uc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Z();
        var a = ue.current;
        ue.current = Hc;
        try {
          return Gp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Z(), wc();
      },
      useState: function(e) {
        B = "useState", Z();
        var t = ue.current;
        ue.current = Hc;
        try {
          return Kp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Z(), Vc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Z(), Ug(e);
      },
      useTransition: function() {
        return B = "useTransition", Z(), Hg();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Z(), Tc(e, t);
      },
      useId: function() {
        return B = "useId", Z(), Fc();
      },
      unstable_isNewReconciler: Je
    }, Qa = {
      readContext: function(e) {
        return lm(), Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Oe(), Ze(), tm(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Oe(), Ze(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Oe(), Ze(), Oc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Oe(), Ze(), em(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), Ze(), Jp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), Ze(), Zp(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Oe(), Ze();
        var n = ue.current;
        ue.current = Qa;
        try {
          return nm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), Ze();
        var a = ue.current;
        ue.current = Qa;
        try {
          return Ip(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Oe(), Ze(), Xp(e);
      },
      useState: function(e) {
        B = "useState", Oe(), Ze();
        var t = ue.current;
        ue.current = Qa;
        try {
          return jc(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Oe(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Oe(), Ze(), am(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), Ze(), rm();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Oe(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Oe(), Ze(), Wp(e, t, n);
      },
      useId: function() {
        return B = "useId", Oe(), Ze(), im();
      },
      unstable_isNewReconciler: Je
    }, wa = {
      readContext: function(e) {
        return lm(), Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Oe(), Z(), kc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Oe(), Z(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Oe(), Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Oe(), Z(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), Z(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), Z(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Oe(), Z();
        var n = ue.current;
        ue.current = wa;
        try {
          return Uc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), Z();
        var a = ue.current;
        ue.current = wa;
        try {
          return qp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Oe(), Z(), wc();
      },
      useState: function(e) {
        B = "useState", Oe(), Z();
        var t = ue.current;
        ue.current = wa;
        try {
          return Qp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Oe(), Z(), Vc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Oe(), Z(), kg(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), Z(), zg();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Oe(), Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Oe(), Z(), Tc(e, t);
      },
      useId: function() {
        return B = "useId", Oe(), Z(), Fc();
      },
      unstable_isNewReconciler: Je
    }, Hc = {
      readContext: function(e) {
        return lm(), Ot(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Oe(), Z(), kc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Oe(), Z(), Ot(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Oe(), Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Oe(), Z(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), Z(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), Z(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Oe(), Z();
        var n = ue.current;
        ue.current = wa;
        try {
          return Uc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), Z();
        var a = ue.current;
        ue.current = wa;
        try {
          return Gp(e, t, n);
        } finally {
          ue.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Oe(), Z(), wc();
      },
      useState: function(e) {
        B = "useState", Oe(), Z();
        var t = ue.current;
        ue.current = wa;
        try {
          return Kp(e);
        } finally {
          ue.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Oe(), Z(), Vc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Oe(), Z(), Ug(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), Z(), Hg();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Oe(), Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Oe(), Z(), Tc(e, t);
      },
      useId: function() {
        return B = "useId", Oe(), Z(), Fc();
      },
      unstable_isNewReconciler: Je
    };
  }
  var Jr = p.unstable_now, Kg = 0, Pc = -1, Du = -1, Bc = -1, om = !1, $c = !1;
  function Xg() {
    return om;
  }
  function HD() {
    $c = !0;
  }
  function PD() {
    om = !1, $c = !1;
  }
  function BD() {
    om = $c, $c = !1;
  }
  function Jg() {
    return Kg;
  }
  function Zg() {
    Kg = Jr();
  }
  function um(e) {
    Du = Jr(), e.actualStartTime < 0 && (e.actualStartTime = Jr());
  }
  function eb(e) {
    Du = -1;
  }
  function Yc(e, t) {
    if (Du >= 0) {
      var n = Jr() - Du;
      e.actualDuration += n, t && (e.selfBaseDuration = n), Du = -1;
    }
  }
  function Ka(e) {
    if (Pc >= 0) {
      var t = Jr() - Pc;
      Pc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case E:
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
  function sm(e) {
    if (Bc >= 0) {
      var t = Jr() - Bc;
      Bc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case E:
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
  function Xa() {
    Pc = Jr();
  }
  function cm() {
    Bc = Jr();
  }
  function fm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function _a(e, t) {
    if (e && e.defaultProps) {
      var n = ze({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var dm = {}, pm, mm, vm, hm, ym, tb, Ic, gm, bm, Nm, Tu;
  {
    pm = /* @__PURE__ */ new Set(), mm = /* @__PURE__ */ new Set(), vm = /* @__PURE__ */ new Set(), hm = /* @__PURE__ */ new Set(), gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), Tu = /* @__PURE__ */ new Set();
    var nb = /* @__PURE__ */ new Set();
    Ic = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        nb.has(n) || (nb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, tb = function(e, t) {
      if (t === void 0) {
        var n = Qe(e) || "Component";
        ym.has(n) || (ym.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(dm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(dm);
  }
  function Em(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & St) {
        Wt(!0);
        try {
          i = n(a, r);
        } finally {
          Wt(!1);
        }
      }
      tb(t, i);
    }
    var l = i == null ? r : ze({}, r, i);
    if (e.memoizedState = l, e.lanes === Y) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Sm = {
    isMounted: MS,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = Mn(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Ic(n, "setState"), l.callback = n);
      var u = Wr(a, l, i);
      u !== null && (Bt(u, a, i, r), Nc(u, a, i)), Zf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = Mn(), i = ni(a), l = Er(r, i);
      l.tag = bg, l.payload = t, n != null && (Ic(n, "replaceState"), l.callback = n);
      var u = Wr(a, l, i);
      u !== null && (Bt(u, a, i, r), Nc(u, a, i)), Zf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = Mn(), r = ni(n), i = Er(a, r);
      i.tag = yc, t != null && (Ic(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && (Bt(l, n, r, a), Nc(l, n, r)), cx(n, r);
    }
  };
  function ab(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var s = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & St) {
          Wt(!0);
          try {
            s = u.shouldComponentUpdate(a, i, l);
          } finally {
            Wt(!1);
          }
        }
        s === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Qe(t) || "Component");
      }
      return s;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function $D(e, t, n) {
    var a = e.stateNode;
    {
      var r = Qe(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !bm.has(t) && (bm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Qe(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !vm.has(t) && (vm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Qe(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || He(u)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function rb(e, t) {
    t.updater = Sm, e.stateNode = t, wS(t, e), t._reactInternalInstance = dm;
  }
  function ib(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === te && l._context === void 0
      );
      if (!u && !Nm.has(t)) {
        Nm.add(t);
        var s = "";
        l === void 0 ? s = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? s = " However, it is set to a " + typeof l + "." : l.$$typeof === q ? s = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? s = " Did you accidentally pass the Context.Consumer instead?" : s = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Qe(t) || "Component", s);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Ot(l);
    else {
      r = wl(e, t, !0);
      var m = t.contextTypes;
      a = m != null, i = a ? _l(e, r) : Jn;
    }
    var h = new t(n, i);
    if (e.mode & St) {
      Wt(!0);
      try {
        h = new t(n, i);
      } finally {
        Wt(!1);
      }
    }
    var x = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    rb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && x === null) {
        var S = Qe(t) || "Component";
        mm.has(S) || (mm.add(S), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", S, h.state === null ? "null" : "undefined", S));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var O = null, A = null, z = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), O !== null || A !== null || z !== null) {
          var ne = Qe(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          hm.has(ne) || (hm.add(ne), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ne, Ee, O !== null ? `
  ` + O : "", A !== null ? `
  ` + A : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && Wy(e, r, i), h;
  }
  function YD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ve(e) || "Component"), Sm.enqueueReplaceState(t, t.state, null));
  }
  function lb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Ve(e) || "Component";
        pm.has(i) || (pm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Sm.enqueueReplaceState(t, t.state, null);
    }
  }
  function xm(e, t, n, a) {
    $D(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Lp(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Ot(i);
    else {
      var l = wl(e, t, !0);
      r.context = _l(e, l);
    }
    {
      if (r.state === n) {
        var u = Qe(t) || "Component";
        gm.has(u) || (gm.add(u), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & St && Ta.recordLegacyContextWarning(e, r), Ta.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var s = t.getDerivedStateFromProps;
    if (typeof s == "function" && (Em(e, t, s, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (YD(e, r), Ec(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var m = Ke;
      m |= Ri, (e.mode & $a) !== xe && (m |= kr), e.flags |= m;
    }
  }
  function ID(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, s = Jn;
    if (typeof u == "object" && u !== null)
      s = Ot(u);
    else {
      var m = wl(e, t, !0);
      s = _l(e, m);
    }
    var h = t.getDerivedStateFromProps, x = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !x && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== s) && lb(e, r, n, s), Eg();
    var S = e.memoizedState, O = r.state = S;
    if (Ec(e, n, r, a), O = e.memoizedState, i === n && S === O && !nc() && !Sc()) {
      if (typeof r.componentDidMount == "function") {
        var A = Ke;
        A |= Ri, (e.mode & $a) !== xe && (A |= kr), e.flags |= A;
      }
      return !1;
    }
    typeof h == "function" && (Em(e, t, h, n), O = e.memoizedState);
    var z = Sc() || ab(e, t, i, n, S, O, s);
    if (z) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ne = Ke;
        ne |= Ri, (e.mode & $a) !== xe && (ne |= kr), e.flags |= ne;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ee = Ke;
        Ee |= Ri, (e.mode & $a) !== xe && (Ee |= kr), e.flags |= Ee;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = s, z;
  }
  function qD(e, t, n, a, r) {
    var i = t.stateNode;
    Ng(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : _a(t.type, l);
    i.props = u;
    var s = t.pendingProps, m = i.context, h = n.contextType, x = Jn;
    if (typeof h == "object" && h !== null)
      x = Ot(h);
    else {
      var S = wl(t, n, !0);
      x = _l(t, S);
    }
    var O = n.getDerivedStateFromProps, A = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !A && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== s || m !== x) && lb(t, i, a, x), Eg();
    var z = t.memoizedState, ne = i.state = z;
    if (Ec(t, a, i, r), ne = t.memoizedState, l === s && z === ne && !nc() && !Sc() && !dn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= dl), !1;
    typeof O == "function" && (Em(t, n, O, a), ne = t.memoizedState);
    var Ee = Sc() || ab(t, n, u, a, z, ne, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    dn;
    return Ee ? (!A && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ne, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ne, x)), typeof i.componentDidUpdate == "function" && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = ne), i.props = a, i.state = ne, i.context = x, Ee;
  }
  function Bi(e, t) {
    return {
      value: e,
      source: t,
      stack: hi(t),
      digest: null
    };
  }
  function Rm(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function GD(e, t) {
    return !0;
  }
  function Cm(e, t) {
    try {
      var n = GD(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var u = r ? Ve(r) : null, s = u ? "The above error occurred in the <" + u + "> component:" : "The above error occurred in one of your React components:", m;
      if (e.tag === E)
        m = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Ve(e) || "Anonymous";
        m = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var x = s + `
` + l + `

` + ("" + m);
      console.error(x);
    } catch (S) {
      setTimeout(function() {
        throw S;
      });
    }
  }
  var WD = typeof WeakMap == "function" ? WeakMap : Map;
  function ob(e, t, n) {
    var a = Er(st, n);
    a.tag = _p, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Hj(r), Cm(e, t);
    }, a;
  }
  function Dm(e, t, n) {
    var a = Er(st, n);
    a.tag = _p;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        gN(e), Cm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      gN(e), Cm(e, t), typeof r != "function" && Fj(this);
      var s = t.value, m = t.stack;
      this.componentDidCatch(s, {
        componentStack: m !== null ? m : ""
      }), typeof r != "function" && (Wn(e.lanes, _e) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ve(e) || "Unknown"));
    }), a;
  }
  function ub(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new WD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Pj.bind(null, e, t, n);
      xa && Yu(e, n), t.then(i, i);
    }
  }
  function QD(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function KD(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === xe && (n === D || n === $ || n === ce)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function sb(e) {
    var t = e;
    do {
      if (t.tag === P && _D(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function cb(e, t, n, a, r) {
    if ((e.mode & Ye) === xe) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Xe, n.flags |= If, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = ie;
          else {
            var l = Er(st, _e);
            l.tag = yc, Wr(n, l, _e);
          }
        }
        n.lanes = Ue(n.lanes, _e);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function XD(e, t, n, a, r) {
    if (n.flags |= Ns, xa && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      KD(n), an() && n.mode & Ye && tg();
      var l = sb(t);
      if (l !== null) {
        l.flags &= ~cr, cb(l, t, n, e, r), l.mode & Ye && ub(e, i, r), QD(l, e, i);
        return;
      } else {
        if (!bx(r)) {
          ub(e, i, r), iv();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (an() && n.mode & Ye) {
      tg();
      var s = sb(t);
      if (s !== null) {
        (s.flags & _n) === Ce && (s.flags |= cr), cb(s, t, n, e, r), gp(Bi(a, n));
        return;
      }
    }
    a = Bi(a, n), _j(a);
    var m = t;
    do {
      switch (m.tag) {
        case E: {
          var h = a;
          m.flags |= _n;
          var x = Ao(r);
          m.lanes = Ue(m.lanes, x);
          var S = ob(m, h, x);
          Mp(m, S);
          return;
        }
        case T:
          var O = a, A = m.type, z = m.stateNode;
          if ((m.flags & Xe) === Ce && (typeof A.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !sN(z))) {
            m.flags |= _n;
            var ne = Ao(r);
            m.lanes = Ue(m.lanes, ne);
            var Ee = Dm(m, O, ne);
            Mp(m, Ee);
            return;
          }
          break;
      }
      m = m.return;
    } while (m !== null);
  }
  function JD() {
    return null;
  }
  var ju = v.ReactCurrentOwner, Oa = !1, Tm, wu, jm, wm, _m, $i, Om, qc, _u;
  Tm = {}, wu = {}, jm = {}, wm = {}, _m = {}, $i = !1, Om = {}, qc = {}, _u = {};
  function On(e, t, n, a) {
    e === null ? t.child = pg(t, null, n, a) : t.child = Al(t, e.child, n, a);
  }
  function ZD(e, t, n, a) {
    t.child = Al(t, e.child, null, a), t.child = Al(t, null, n, a);
  }
  function fb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ca(
        i,
        a,
        // Resolved props
        "prop",
        Qe(n)
      );
    }
    var l = n.render, u = t.ref, s, m;
    kl(t, r), jo(t);
    {
      if (ju.current = t, la(!0), s = Bl(e, t, l, a, u, r), m = $l(), t.mode & St) {
        Wt(!0);
        try {
          s = Bl(e, t, l, a, u, r), m = $l();
        } finally {
          Wt(!1);
        }
      }
      la(!1);
    }
    return vl(), e !== null && !Oa ? (Tg(e, t, r), Sr(e, t, r)) : (an() && m && dp(t), t.flags |= fl, On(e, t, s, r), t.child);
  }
  function db(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (r1(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = ce, t.type = l, Am(t, i), pb(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && Ca(
          u,
          a,
          // Resolved props
          "prop",
          Qe(i)
        ), n.defaultProps !== void 0) {
          var s = Qe(i) || "Unknown";
          _u[s] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", s), _u[s] = !0);
        }
      }
      var m = hv(n.type, null, a, t, t.mode, r);
      return m.ref = t.ref, m.return = t, t.child = m, m;
    }
    {
      var h = n.type, x = h.propTypes;
      x && Ca(
        x,
        a,
        // Resolved props
        "prop",
        Qe(h)
      );
    }
    var S = e.child, O = Hm(e, r);
    if (!O) {
      var A = S.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Qo, z(A, a) && e.ref === t.ref)
        return Sr(e, t, r);
    }
    t.flags |= fl;
    var ne = Wi(S, a);
    return ne.ref = t.ref, ne.return = t, t.child = ne, ne;
  }
  function pb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Se) {
        var l = i, u = l._payload, s = l._init;
        try {
          i = s(u);
        } catch {
          i = null;
        }
        var m = i && i.propTypes;
        m && Ca(
          m,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Qe(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Qo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Oa = !1, t.pendingProps = a = h, Hm(e, r))
          (e.flags & If) !== Ce && (Oa = !0);
        else return t.lanes = e.lanes, Sr(e, t, r);
    }
    return Lm(e, t, n, a, r);
  }
  function mb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Xt)
      if ((t.mode & Ye) === xe) {
        var l = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, lf(t, n);
      } else if (Wn(n, Gn)) {
        var x = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = x;
        var S = i !== null ? i.baseLanes : n;
        lf(t, S);
      } else {
        var u = null, s;
        if (i !== null) {
          var m = i.baseLanes;
          s = Ue(m, n);
        } else
          s = n;
        t.lanes = t.childLanes = Gn;
        var h = {
          baseLanes: s,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = h, t.updateQueue = null, lf(t, s), null;
      }
    else {
      var O;
      i !== null ? (O = Ue(i.baseLanes, n), t.memoizedState = null) : O = n, lf(t, O);
    }
    return On(e, t, r, n), t.child;
  }
  function eT(e, t, n) {
    var a = t.pendingProps;
    return On(e, t, a, n), t.child;
  }
  function tT(e, t, n) {
    var a = t.pendingProps.children;
    return On(e, t, a, n), t.child;
  }
  function nT(e, t, n) {
    {
      t.flags |= Ke;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return On(e, t, i, n), t.child;
  }
  function vb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Si, t.flags |= qf);
  }
  function Lm(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ca(
        i,
        a,
        // Resolved props
        "prop",
        Qe(n)
      );
    }
    var l;
    {
      var u = wl(t, n, !0);
      l = _l(t, u);
    }
    var s, m;
    kl(t, r), jo(t);
    {
      if (ju.current = t, la(!0), s = Bl(e, t, n, a, l, r), m = $l(), t.mode & St) {
        Wt(!0);
        try {
          s = Bl(e, t, n, a, l, r), m = $l();
        } finally {
          Wt(!1);
        }
      }
      la(!1);
    }
    return vl(), e !== null && !Oa ? (Tg(e, t, r), Sr(e, t, r)) : (an() && m && dp(t), t.flags |= fl, On(e, t, s, r), t.child);
  }
  function hb(e, t, n, a, r) {
    {
      switch (b1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), s = u.state;
          i.updater.enqueueSetState(i, s, null);
          break;
        }
        case !0: {
          t.flags |= Xe, t.flags |= _n;
          var m = new Error("Simulated error coming from DevTools"), h = Ao(r);
          t.lanes = Ue(t.lanes, h);
          var x = Dm(t, Bi(m, t), h);
          Mp(t, x);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var S = n.propTypes;
        S && Ca(
          S,
          a,
          // Resolved props
          "prop",
          Qe(n)
        );
      }
    }
    var O;
    qa(n) ? (O = !0, rc(t)) : O = !1, kl(t, r);
    var A = t.stateNode, z;
    A === null ? (Wc(e, t), ib(t, n, a), xm(t, n, a, r), z = !0) : e === null ? z = ID(t, n, a, r) : z = qD(e, t, n, a, r);
    var ne = Mm(e, t, n, z, O, r);
    {
      var Ee = t.stateNode;
      z && Ee.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ve(t) || "a component"), $i = !0);
    }
    return ne;
  }
  function Mm(e, t, n, a, r, i) {
    vb(e, t);
    var l = (t.flags & Xe) !== Ce;
    if (!a && !l)
      return r && Xy(t, n, !1), Sr(e, t, i);
    var u = t.stateNode;
    ju.current = t;
    var s;
    if (l && typeof n.getDerivedStateFromError != "function")
      s = null, eb();
    else {
      jo(t);
      {
        if (la(!0), s = u.render(), t.mode & St) {
          Wt(!0);
          try {
            u.render();
          } finally {
            Wt(!1);
          }
        }
        la(!1);
      }
      vl();
    }
    return t.flags |= fl, e !== null && l ? ZD(e, t, s, i) : On(e, t, s, i), t.memoizedState = u.state, r && Xy(t, n, !0), t.child;
  }
  function yb(e) {
    var t = e.stateNode;
    t.pendingContext ? Qy(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Qy(e, t.context, !1), Ap(e, t.containerInfo);
  }
  function aT(e, t, n) {
    if (yb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Ng(e, t), Ec(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var u = l.element;
    if (r.isDehydrated) {
      var s = {
        element: u,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, m = t.updateQueue;
      if (m.baseState = s, t.memoizedState = s, t.flags & cr) {
        var h = Bi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return gb(e, t, u, n, h);
      } else if (u !== i) {
        var x = Bi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return gb(e, t, u, n, x);
      } else {
        lD(t);
        var S = pg(t, null, u, n);
        t.child = S;
        for (var O = S; O; )
          O.flags = O.flags & ~_t | fr, O = O.sibling;
      }
    } else {
      if (Ml(), u === i)
        return Sr(e, t, n);
      On(e, t, u, n);
    }
    return t.child;
  }
  function gb(e, t, n, a, r) {
    return Ml(), gp(r), t.flags |= cr, On(e, t, n, a), t.child;
  }
  function rT(e, t, n) {
    Rg(t), e === null && yp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = Jd(a, r);
    return u ? l = null : i !== null && Jd(a, i) && (t.flags |= Do), vb(e, t), On(e, t, l, n), t.child;
  }
  function iT(e, t) {
    return e === null && yp(t), null;
  }
  function lT(e, t, n, a) {
    Wc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, s = u(l);
    t.type = s;
    var m = t.tag = i1(s), h = _a(s, r), x;
    switch (m) {
      case D:
        return Am(t, s), t.type = s = Xl(s), x = Lm(null, t, s, h, a), x;
      case T:
        return t.type = s = cv(s), x = hb(null, t, s, h, a), x;
      case $:
        return t.type = s = fv(s), x = fb(null, t, s, h, a), x;
      case ge: {
        if (t.type !== t.elementType) {
          var S = s.propTypes;
          S && Ca(
            S,
            h,
            // Resolved for outer only
            "prop",
            Qe(s)
          );
        }
        return x = db(
          null,
          t,
          s,
          _a(s.type, h),
          // The inner type can have defaults too
          a
        ), x;
      }
    }
    var O = "";
    throw s !== null && typeof s == "object" && s.$$typeof === Se && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + s + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function oT(e, t, n, a, r) {
    Wc(e, t), t.tag = T;
    var i;
    return qa(n) ? (i = !0, rc(t)) : i = !1, kl(t, r), ib(t, n, a), xm(t, n, a, r), Mm(null, t, n, !0, i, r);
  }
  function uT(e, t, n, a) {
    Wc(e, t);
    var r = t.pendingProps, i;
    {
      var l = wl(t, n, !1);
      i = _l(t, l);
    }
    kl(t, a);
    var u, s;
    jo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var m = Qe(n) || "Unknown";
        Tm[m] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", m, m), Tm[m] = !0);
      }
      t.mode & St && Ta.recordLegacyContextWarning(t, null), la(!0), ju.current = t, u = Bl(null, t, n, r, i, a), s = $l(), la(!1);
    }
    if (vl(), t.flags |= fl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var h = Qe(n) || "Unknown";
      wu[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), wu[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var x = Qe(n) || "Unknown";
        wu[x] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), wu[x] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var S = !1;
      return qa(n) ? (S = !0, rc(t)) : S = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, Lp(t), rb(t, u), xm(t, n, r, a), Mm(null, t, n, !0, S, a);
    } else {
      if (t.tag = D, t.mode & St) {
        Wt(!0);
        try {
          u = Bl(null, t, n, r, i, a), s = $l();
        } finally {
          Wt(!1);
        }
      }
      return an() && s && dp(t), On(null, t, u, a), Am(t, n), t.child;
    }
  }
  function Am(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Mr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), _m[r] || (_m[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Qe(t) || "Unknown";
        _u[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), _u[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = Qe(t) || "Unknown";
        wm[u] || (f("%s: Function components do not support getDerivedStateFromProps.", u), wm[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var s = Qe(t) || "Unknown";
        jm[s] || (f("%s: Function components do not support contextType.", s), jm[s] = !0);
      }
    }
  }
  var Vm = {
    dehydrated: null,
    treeContext: null,
    retryLane: Qt
  };
  function km(e) {
    return {
      baseLanes: e,
      cachePool: JD(),
      transitions: null
    };
  }
  function sT(e, t) {
    var n = null;
    return {
      baseLanes: Ue(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function cT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Up(e, bu);
  }
  function fT(e, t) {
    return Ts(e.childLanes, t);
  }
  function bb(e, t, n) {
    var a = t.pendingProps;
    N1(t) && (t.flags |= Xe);
    var r = ja.current, i = !1, l = (t.flags & Xe) !== Ce;
    if (l || cT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = wD(r, Dg)), r = Fl(r), Kr(t, r), e === null) {
      yp(t);
      var u = t.memoizedState;
      if (u !== null) {
        var s = u.dehydrated;
        if (s !== null)
          return hT(t, s);
      }
      var m = a.children, h = a.fallback;
      if (i) {
        var x = dT(t, m, h, n), S = t.child;
        return S.memoizedState = km(n), t.memoizedState = Vm, x;
      } else
        return Um(t, m);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var A = O.dehydrated;
        if (A !== null)
          return yT(e, t, l, a, A, O, n);
      }
      if (i) {
        var z = a.fallback, ne = a.children, Ee = mT(e, t, ne, z, n), me = t.child, qe = e.child.memoizedState;
        return me.memoizedState = qe === null ? km(n) : sT(qe, n), me.childLanes = fT(e, n), t.memoizedState = Vm, Ee;
      } else {
        var Pe = a.children, w = pT(e, t, Pe, n);
        return t.memoizedState = null, w;
      }
    }
  }
  function Um(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Fm(r, a);
    return i.return = e, e.child = i, i;
  }
  function dT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, s;
    return (r & Ye) === xe && i !== null ? (u = i, u.childLanes = Y, u.pendingProps = l, e.mode & nt && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), s = ri(n, r, a, null)) : (u = Fm(l, r), s = ri(n, r, a, null)), u.return = e, s.return = e, u.sibling = s, e.child = u, s;
  }
  function Fm(e, t, n) {
    return NN(e, t, Y, null);
  }
  function Nb(e, t) {
    return Wi(e, t);
  }
  function pT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Nb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ye) === xe && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= Ei) : u.push(i);
    }
    return t.child = l, l;
  }
  function mT(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, s = {
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
      m = Nb(l, s), m.subtreeFlags = l.subtreeFlags & dr;
    var x;
    return u !== null ? x = Wi(u, a) : (x = ri(a, i, r, null), x.flags |= _t), x.return = t, m.return = t, m.sibling = x, t.child = m, x;
  }
  function Gc(e, t, n, a) {
    a !== null && gp(a), Al(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Um(t, i);
    return l.flags |= _t, t.memoizedState = null, l;
  }
  function vT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Fm(l, i), s = ri(a, i, r, null);
    return s.flags |= _t, u.return = t, s.return = t, u.sibling = s, t.child = u, (t.mode & Ye) !== xe && Al(t, e.child, null, r), s;
  }
  function hT(e, t, n) {
    return (e.mode & Ye) === xe ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = _e) : np(t) ? e.lanes = Ti : e.lanes = Gn, null;
  }
  function yT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var w = Rm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Gc(e, t, l, w);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Xe, null;
        var H = a.children, _ = a.fallback, W = vT(e, t, H, _, l), se = t.child;
        return se.memoizedState = km(l), t.memoizedState = Vm, W;
      }
    else {
      if (rD(), (t.mode & Ye) === xe)
        return Gc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (np(r)) {
        var u, s, m;
        {
          var h = E0(r);
          u = h.digest, s = h.message, m = h.stack;
        }
        var x;
        s ? x = new Error(s) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var S = Rm(x, u, m);
        return Gc(e, t, l, S);
      }
      var O = Wn(l, e.childLanes);
      if (Oa || O) {
        var A = rf();
        if (A !== null) {
          var z = Tx(A, l);
          if (z !== Qt && z !== i.retryLane) {
            i.retryLane = z;
            var ne = st;
            Pn(e, z), Bt(A, e, z, ne);
          }
        }
        iv();
        var Ee = Rm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Gc(e, t, l, Ee);
      } else if ($y(r)) {
        t.flags |= Xe, t.child = e.child;
        var me = Bj.bind(null, e);
        return S0(r, me), null;
      } else {
        oD(t, r, i.treeContext);
        var qe = a.children, Pe = Um(t, qe);
        return Pe.flags |= fr, Pe;
      }
    }
  }
  function Eb(e, t, n) {
    e.lanes = Ue(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ue(a.lanes, t)), jp(e.return, t, n);
  }
  function gT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === P) {
        var r = a.memoizedState;
        r !== null && Eb(a, n, e);
      } else if (a.tag === U)
        Eb(a, n, e);
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
  function bT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Cc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function NT(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Om[e])
      if (Om[e] = !0, typeof e == "string")
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
  function ET(e, t) {
    e !== void 0 && !qc[e] && (e !== "collapsed" && e !== "hidden" ? (qc[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (qc[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Sb(e, t) {
    {
      var n = He(e), a = !n && typeof Ea(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function ST(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (He(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Sb(e[n], n))
            return;
      } else {
        var a = Ea(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Sb(i.value, l))
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
  function xb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    NT(r), ET(i, r), ST(l, r), On(e, t, l, n);
    var u = ja.current, s = Up(u, bu);
    if (s)
      u = Fp(u, bu), t.flags |= Xe;
    else {
      var m = e !== null && (e.flags & Xe) !== Ce;
      m && gT(t, t.child, n), u = Fl(u);
    }
    if (Kr(t, u), (t.mode & Ye) === xe)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = bT(t.child), x;
          h === null ? (x = t.child, t.child = null) : (x = h.sibling, h.sibling = null), zm(
            t,
            !1,
            // isBackwards
            x,
            h,
            i
          );
          break;
        }
        case "backwards": {
          var S = null, O = t.child;
          for (t.child = null; O !== null; ) {
            var A = O.alternate;
            if (A !== null && Cc(A) === null) {
              t.child = O;
              break;
            }
            var z = O.sibling;
            O.sibling = S, S = O, O = z;
          }
          zm(
            t,
            !0,
            // isBackwards
            S,
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
  function xT(e, t, n) {
    Ap(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Al(t, null, a, n) : On(e, t, a, n), t.child;
  }
  var Rb = !1;
  function RT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || Rb || (Rb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var s = t.type.propTypes;
      s && Ca(s, i, "prop", "Context.Provider");
    }
    if (hg(t, r, u), l !== null) {
      var m = l.value;
      if (Xn(m, u)) {
        if (l.children === i.children && !nc())
          return Sr(e, t, n);
      } else
        ND(t, r, n);
    }
    var h = i.children;
    return On(e, t, h, n), t.child;
  }
  var Cb = !1;
  function CT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Cb || (Cb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kl(t, n);
    var l = Ot(a);
    jo(t);
    var u;
    return ju.current = t, la(!0), u = i(l), la(!1), vl(), t.flags |= fl, On(e, t, u, n), t.child;
  }
  function Ou() {
    Oa = !0;
  }
  function Wc(e, t) {
    (t.mode & Ye) === xe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= _t);
  }
  function Sr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), eb(), $u(t.lanes), Wn(n, t.childLanes) ? (gD(e, t), t.child) : null;
  }
  function DT(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Ei) : i.push(e), n.flags |= _t, n;
    }
  }
  function Hm(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function TT(e, t, n) {
    switch (t.tag) {
      case E:
        yb(t), t.stateNode, Ml();
        break;
      case V:
        Rg(t);
        break;
      case T: {
        var a = t.type;
        qa(a) && rc(t);
        break;
      }
      case j:
        Ap(t, t.stateNode.containerInfo);
        break;
      case I: {
        var r = t.memoizedProps.value, i = t.type._context;
        hg(t, i, r);
        break;
      }
      case G:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= Ke);
          {
            var u = t.stateNode;
            u.effectDuration = 0, u.passiveEffectDuration = 0;
          }
        }
        break;
      case P: {
        var s = t.memoizedState;
        if (s !== null) {
          if (s.dehydrated !== null)
            return Kr(t, Fl(ja.current)), t.flags |= Xe, null;
          var m = t.child, h = m.childLanes;
          if (Wn(n, h))
            return bb(e, t, n);
          Kr(t, Fl(ja.current));
          var x = Sr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Kr(t, Fl(ja.current));
        break;
      }
      case U: {
        var S = (e.flags & Xe) !== Ce, O = Wn(n, t.childLanes);
        if (S) {
          if (O)
            return xb(e, t, n);
          t.flags |= Xe;
        }
        var A = t.memoizedState;
        if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Kr(t, ja.current), O)
          break;
        return null;
      }
      case oe:
      case Te:
        return t.lanes = Y, mb(e, t, n);
    }
    return Sr(e, t, n);
  }
  function Db(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return DT(e, t, hv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || nc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        Oa = !0;
      else {
        var i = Hm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Xe) === Ce)
          return Oa = !1, TT(e, t, n);
        (e.flags & If) !== Ce ? Oa = !0 : Oa = !1;
      }
    } else if (Oa = !1, an() && J0(t)) {
      var l = t.index, u = Z0();
      eg(t, u, l);
    }
    switch (t.lanes = Y, t.tag) {
      case L:
        return uT(e, t, t.type, n);
      case X: {
        var s = t.elementType;
        return lT(e, t, s, n);
      }
      case D: {
        var m = t.type, h = t.pendingProps, x = t.elementType === m ? h : _a(m, h);
        return Lm(e, t, m, x, n);
      }
      case T: {
        var S = t.type, O = t.pendingProps, A = t.elementType === S ? O : _a(S, O);
        return hb(e, t, S, A, n);
      }
      case E:
        return aT(e, t, n);
      case V:
        return rT(e, t, n);
      case Q:
        return iT(e, t);
      case P:
        return bb(e, t, n);
      case j:
        return xT(e, t, n);
      case $: {
        var z = t.type, ne = t.pendingProps, Ee = t.elementType === z ? ne : _a(z, ne);
        return fb(e, t, z, Ee, n);
      }
      case pe:
        return eT(e, t, n);
      case ae:
        return tT(e, t, n);
      case G:
        return nT(e, t, n);
      case I:
        return RT(e, t, n);
      case he:
        return CT(e, t, n);
      case ge: {
        var me = t.type, qe = t.pendingProps, Pe = _a(me, qe);
        if (t.type !== t.elementType) {
          var w = me.propTypes;
          w && Ca(
            w,
            Pe,
            // Resolved for outer only
            "prop",
            Qe(me)
          );
        }
        return Pe = _a(me.type, Pe), db(e, t, me, Pe, n);
      }
      case ce:
        return pb(e, t, t.type, t.pendingProps, n);
      case ie: {
        var H = t.type, _ = t.pendingProps, W = t.elementType === H ? _ : _a(H, _);
        return oT(e, t, H, W, n);
      }
      case U:
        return xb(e, t, n);
      case ve:
        break;
      case oe:
        return mb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Yl(e) {
    e.flags |= Ke;
  }
  function Tb(e) {
    e.flags |= Si, e.flags |= qf;
  }
  var jb, Pm, wb, _b;
  jb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === V || r.tag === Q)
        QC(e, r.stateNode);
      else if (r.tag !== j) {
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
  }, Pm = function(e, t) {
  }, wb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = Vp(), s = XC(l, n, i, a, r, u);
      t.updateQueue = s, s && Yl(t);
    }
  }, _b = function(e, t, n, a) {
    n !== a && Yl(t);
  };
  function Lu(e, t) {
    if (!an())
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
  function ln(e) {
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
        for (var u = e.child; u !== null; )
          n = Ue(n, Ue(u.lanes, u.childLanes)), a |= u.subtreeFlags, a |= u.flags, u.return = e, u = u.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function jT(e, t, n) {
    if (dD() && (t.mode & Ye) !== xe && (t.flags & Xe) === Ce)
      return og(t), Ml(), t.flags |= cr | Ns | _n, !1;
    var a = sc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (cD(t), ln(t), (t.mode & nt) !== xe) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ml(), (t.flags & Xe) === Ce && (t.memoizedState = null), t.flags |= Ke, ln(t), (t.mode & nt) !== xe) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return ug(), !0;
  }
  function Ob(e, t, n) {
    var a = t.pendingProps;
    switch (pp(t), t.tag) {
      case L:
      case X:
      case ce:
      case D:
      case $:
      case pe:
      case ae:
      case G:
      case he:
      case ge:
        return ln(t), null;
      case T: {
        var r = t.type;
        return qa(r) && ac(t), ln(t), null;
      }
      case E: {
        var i = t.stateNode;
        if (Ul(t), sp(t), Hp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = sc(t);
          if (l)
            Yl(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== Ce) && (t.flags |= dl, ug());
          }
        }
        return Pm(e, t), ln(t), null;
      }
      case V: {
        kp(t);
        var s = xg(), m = t.type;
        if (e !== null && t.stateNode != null)
          wb(e, t, m, a, s), e.ref !== t.ref && Tb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return ln(t), null;
          }
          var h = Vp(), x = sc(t);
          if (x)
            uD(t, s, h) && Yl(t);
          else {
            var S = WC(m, a, s, h, t);
            jb(S, t, !1, !1), t.stateNode = S, KC(S, m, a, s) && Yl(t);
          }
          t.ref !== null && Tb(t);
        }
        return ln(t), null;
      }
      case Q: {
        var O = a;
        if (e && t.stateNode != null) {
          var A = e.memoizedProps;
          _b(e, t, A, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = xg(), ne = Vp(), Ee = sc(t);
          Ee ? sD(t) && Yl(t) : t.stateNode = JC(O, z, ne, t);
        }
        return ln(t), null;
      }
      case P: {
        zl(t);
        var me = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = jT(e, t, me);
          if (!qe)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Xe) !== Ce)
          return t.lanes = n, (t.mode & nt) !== xe && fm(t), t;
        var Pe = me !== null, w = e !== null && e.memoizedState !== null;
        if (Pe !== w && Pe) {
          var H = t.child;
          if (H.flags |= xi, (t.mode & Ye) !== xe) {
            var _ = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            _ || Up(ja.current, Dg) ? wj() : iv();
          }
        }
        var W = t.updateQueue;
        if (W !== null && (t.flags |= Ke), ln(t), (t.mode & nt) !== xe && Pe) {
          var se = t.child;
          se !== null && (t.treeBaseDuration -= se.treeBaseDuration);
        }
        return null;
      }
      case j:
        return Ul(t), Pm(e, t), e === null && I0(t.stateNode.containerInfo), ln(t), null;
      case I:
        var re = t.type._context;
        return Tp(re, t), ln(t), null;
      case ie: {
        var De = t.type;
        return qa(De) && ac(t), ln(t), null;
      }
      case U: {
        zl(t);
        var Ae = t.memoizedState;
        if (Ae === null)
          return ln(t), null;
        var rt = (t.flags & Xe) !== Ce, Ge = Ae.rendering;
        if (Ge === null)
          if (rt)
            Lu(Ae, !1);
          else {
            var Ct = Oj() && (e === null || (e.flags & Xe) === Ce);
            if (!Ct)
              for (var We = t.child; We !== null; ) {
                var xt = Cc(We);
                if (xt !== null) {
                  rt = !0, t.flags |= Xe, Lu(Ae, !1);
                  var En = xt.updateQueue;
                  return En !== null && (t.updateQueue = En, t.flags |= Ke), t.subtreeFlags = Ce, bD(t, n), Kr(t, Fp(ja.current, bu)), t.child;
                }
                We = We.sibling;
              }
            Ae.tail !== null && Gt() > Jb() && (t.flags |= Xe, rt = !0, Lu(Ae, !1), t.lanes = _h);
          }
        else {
          if (!rt) {
            var fn = Cc(Ge);
            if (fn !== null) {
              t.flags |= Xe, rt = !0;
              var ea = fn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Ke), Lu(Ae, !0), Ae.tail === null && Ae.tailMode === "hidden" && !Ge.alternate && !an())
                return ln(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            Gt() * 2 - Ae.renderingStartTime > Jb() && n !== Gn && (t.flags |= Xe, rt = !0, Lu(Ae, !1), t.lanes = _h);
          }
          if (Ae.isBackwards)
            Ge.sibling = t.child, t.child = Ge;
          else {
            var An = Ae.last;
            An !== null ? An.sibling = Ge : t.child = Ge, Ae.last = Ge;
          }
        }
        if (Ae.tail !== null) {
          var Vn = Ae.tail;
          Ae.rendering = Vn, Ae.tail = Vn.sibling, Ae.renderingStartTime = Gt(), Vn.sibling = null;
          var Sn = ja.current;
          return rt ? Sn = Fp(Sn, bu) : Sn = Fl(Sn), Kr(t, Sn), Vn;
        }
        return ln(t), null;
      }
      case ve:
        break;
      case oe:
      case Te: {
        rv(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, er = Wu !== null;
          er !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Xt && (t.flags |= xi);
        }
        return !Jl || (t.mode & Ye) === xe ? ln(t) : Wn(Za, Gn) && (ln(t), t.subtreeFlags & (_t | Ke) && (t.flags |= xi)), null;
      }
      case je:
        return null;
      case Le:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function wT(e, t, n) {
    switch (pp(t), t.tag) {
      case T: {
        var a = t.type;
        qa(a) && ac(t);
        var r = t.flags;
        return r & _n ? (t.flags = r & ~_n | Xe, (t.mode & nt) !== xe && fm(t), t) : null;
      }
      case E: {
        t.stateNode, Ul(t), sp(t), Hp();
        var i = t.flags;
        return (i & _n) !== Ce && (i & Xe) === Ce ? (t.flags = i & ~_n | Xe, t) : null;
      }
      case V:
        return kp(t), null;
      case P: {
        zl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ml();
        }
        var u = t.flags;
        return u & _n ? (t.flags = u & ~_n | Xe, (t.mode & nt) !== xe && fm(t), t) : null;
      }
      case U:
        return zl(t), null;
      case j:
        return Ul(t), null;
      case I:
        var s = t.type._context;
        return Tp(s, t), null;
      case oe:
      case Te:
        return rv(t), null;
      case je:
        return null;
      default:
        return null;
    }
  }
  function Lb(e, t, n) {
    switch (pp(t), t.tag) {
      case T: {
        var a = t.type.childContextTypes;
        a != null && ac(t);
        break;
      }
      case E: {
        t.stateNode, Ul(t), sp(t), Hp();
        break;
      }
      case V: {
        kp(t);
        break;
      }
      case j:
        Ul(t);
        break;
      case P:
        zl(t);
        break;
      case U:
        zl(t);
        break;
      case I:
        var r = t.type._context;
        Tp(r, t);
        break;
      case oe:
      case Te:
        rv(t);
        break;
    }
  }
  var Mb = null;
  Mb = /* @__PURE__ */ new Set();
  var Qc = !1, on = !1, _T = typeof WeakSet == "function" ? WeakSet : Set, fe = null, Il = null, ql = null;
  function OT(e) {
    Bf(null, function() {
      throw e;
    }), $f();
  }
  var LT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nt)
      try {
        Xa(), t.componentWillUnmount();
      } finally {
        Ka(e);
      }
    else
      t.componentWillUnmount();
  };
  function Ab(e, t) {
    try {
      Zr(kt, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      LT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function MT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      lt(e, t, a);
    }
  }
  function Vb(e, t) {
    try {
      Ub(e);
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
          if (Jt && va && e.mode & nt)
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
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
      } else
        n.current = null;
  }
  function Kc(e, t, n) {
    try {
      n();
    } catch (a) {
      lt(e, t, a);
    }
  }
  var kb = !1;
  function AT(e, t) {
    qC(e.containerInfo), fe = t, VT();
    var n = kb;
    return kb = !1, n;
  }
  function VT() {
    for (; fe !== null; ) {
      var e = fe, t = e.child;
      (e.subtreeFlags & Qf) !== Ce && t !== null ? (t.return = e, fe = t) : kT();
    }
  }
  function kT() {
    for (; fe !== null; ) {
      var e = fe;
      mt(e);
      try {
        UT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      qt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, fe = t;
        return;
      }
      fe = e.return;
    }
  }
  function UT(e) {
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
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : _a(e.type, a), r);
            {
              var u = Mb;
              l === void 0 && !u.has(e.type) && (u.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ve(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case E: {
          {
            var s = e.stateNode;
            y0(s.containerInfo);
          }
          break;
        }
        case V:
        case Q:
        case j:
        case ie:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      qt();
    }
  }
  function La(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & rn) !== Bn ? JS(t) : (e & kt) !== Bn && Ch(t), (e & Ga) !== Bn && Iu(!0), Kc(t, n, u), (e & Ga) !== Bn && Iu(!1), (e & rn) !== Bn ? ZS() : (e & kt) !== Bn && Dh());
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
          (e & rn) !== Bn ? KS(t) : (e & kt) !== Bn && ex(t);
          var l = i.create;
          (e & Ga) !== Bn && Iu(!0), i.destroy = l(), (e & Ga) !== Bn && Iu(!1), (e & rn) !== Bn ? XS() : (e & kt) !== Bn && tx();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var s = void 0;
              (i.tag & kt) !== Ce ? s = "useLayoutEffect" : (i.tag & Ga) !== Ce ? s = "useInsertionEffect" : s = "useEffect";
              var m = void 0;
              u === null ? m = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof u.then == "function" ? m = `

It looks like you wrote ` + s + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + s + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : m = " You returned: " + u, f("%s must not return anything besides a function, which is used for clean-up.%s", s, m);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function FT(e, t) {
    if ((t.flags & Ke) !== Ce)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Jg(), u = t.alternate === null ? "mount" : "update";
          Xg() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var s = t.return;
          e: for (; s !== null; ) {
            switch (s.tag) {
              case E:
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
  function zT(e, t, n, a) {
    if ((n.flags & To) !== Ce)
      switch (n.tag) {
        case D:
        case $:
        case ce: {
          if (!on)
            if (n.mode & nt)
              try {
                Xa(), Zr(kt | Vt, n);
              } finally {
                Ka(n);
              }
            else
              Zr(kt | Vt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Ke && !on)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), n.mode & nt)
                try {
                  Xa(), r.componentDidMount();
                } finally {
                  Ka(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : _a(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), n.mode & nt)
                try {
                  Xa(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ka(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), Sg(n, u, r));
          break;
        }
        case E: {
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
            Sg(n, s, m);
          }
          break;
        }
        case V: {
          var h = n.stateNode;
          if (t === null && n.flags & Ke) {
            var x = n.type, S = n.memoizedProps;
            a0(h, x, S);
          }
          break;
        }
        case Q:
          break;
        case j:
          break;
        case G: {
          {
            var O = n.memoizedProps, A = O.onCommit, z = O.onRender, ne = n.stateNode.effectDuration, Ee = Jg(), me = t === null ? "mount" : "update";
            Xg() && (me = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, me, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof A == "function" && A(n.memoizedProps.id, me, ne, Ee), kj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case E:
                    var Pe = qe.stateNode;
                    Pe.effectDuration += ne;
                    break e;
                  case G:
                    var w = qe.stateNode;
                    w.effectDuration += ne;
                    break e;
                }
                qe = qe.return;
              }
            }
          }
          break;
        }
        case P: {
          GT(e, n);
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
    on || n.flags & Si && Ub(n);
  }
  function HT(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        if (e.mode & nt)
          try {
            Xa(), Ab(e, e.return);
          } finally {
            Ka(e);
          }
        else
          Ab(e, e.return);
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && MT(e, e.return, t), Vb(e, e.return);
        break;
      }
      case V: {
        Vb(e, e.return);
        break;
      }
    }
  }
  function PT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === V) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? p0(r) : v0(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === Q) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? m0(i) : h0(i, a.memoizedProps);
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
  function Ub(e) {
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
            Xa(), r = t(a);
          } finally {
            Ka(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ve(e)), t.current = a;
    }
  }
  function BT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Fb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Fb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === V) {
        var n = e.stateNode;
        n !== null && W0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function $T(e) {
    for (var t = e.return; t !== null; ) {
      if (zb(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function zb(e) {
    return e.tag === V || e.tag === E || e.tag === j;
  }
  function Hb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || zb(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== V && t.tag !== Q && t.tag !== J; ) {
        if (t.flags & _t || t.child === null || t.tag === j)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & _t))
        return t.stateNode;
    }
  }
  function YT(e) {
    var t = $T(e);
    switch (t.tag) {
      case V: {
        var n = t.stateNode;
        t.flags & Do && (By(n), t.flags &= ~Do);
        var a = Hb(e);
        Ym(e, a, n);
        break;
      }
      case E:
      case j: {
        var r = t.stateNode.containerInfo, i = Hb(e);
        $m(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function $m(e, t, n) {
    var a = e.tag, r = a === V || a === Q;
    if (r) {
      var i = e.stateNode;
      t ? s0(n, i, t) : o0(n, i);
    } else if (a !== j) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var u = l.sibling; u !== null; )
          $m(u, t, n), u = u.sibling;
      }
    }
  }
  function Ym(e, t, n) {
    var a = e.tag, r = a === V || a === Q;
    if (r) {
      var i = e.stateNode;
      t ? u0(n, i, t) : l0(n, i);
    } else if (a !== j) {
      var l = e.child;
      if (l !== null) {
        Ym(l, t, n);
        for (var u = l.sibling; u !== null; )
          Ym(u, t, n), u = u.sibling;
      }
    }
  }
  var un = null, Ma = !1;
  function IT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case V: {
            un = a.stateNode, Ma = !1;
            break e;
          }
          case E: {
            un = a.stateNode.containerInfo, Ma = !0;
            break e;
          }
          case j: {
            un = a.stateNode.containerInfo, Ma = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (un === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Pb(e, t, n), un = null, Ma = !1;
    }
    BT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      Pb(e, t, a), a = a.sibling;
  }
  function Pb(e, t, n) {
    switch (qS(n), n.tag) {
      case V:
        on || Gl(n, t);
      case Q: {
        {
          var a = un, r = Ma;
          un = null, ei(e, t, n), un = a, Ma = r, un !== null && (Ma ? f0(un, n.stateNode) : c0(un, n.stateNode));
        }
        return;
      }
      case J: {
        un !== null && (Ma ? d0(un, n.stateNode) : tp(un, n.stateNode));
        return;
      }
      case j: {
        {
          var i = un, l = Ma;
          un = n.stateNode.containerInfo, Ma = !0, ei(e, t, n), un = i, Ma = l;
        }
        return;
      }
      case D:
      case $:
      case ge:
      case ce: {
        if (!on) {
          var u = n.updateQueue;
          if (u !== null) {
            var s = u.lastEffect;
            if (s !== null) {
              var m = s.next, h = m;
              do {
                var x = h, S = x.destroy, O = x.tag;
                S !== void 0 && ((O & Ga) !== Bn ? Kc(n, t, S) : (O & kt) !== Bn && (Ch(n), n.mode & nt ? (Xa(), Kc(n, t, S), Ka(n)) : Kc(n, t, S), Dh())), h = h.next;
              } while (h !== m);
            }
          }
        }
        ei(e, t, n);
        return;
      }
      case T: {
        if (!on) {
          Gl(n, t);
          var A = n.stateNode;
          typeof A.componentWillUnmount == "function" && Bm(n, t, A);
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
          var z = on;
          on = z || n.memoizedState !== null, ei(e, t, n), on = z;
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
  function qT(e) {
    e.memoizedState;
  }
  function GT(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && O0(i);
        }
      }
    }
  }
  function Bb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new _T()), t.forEach(function(a) {
        var r = $j.bind(null, e, a);
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
  function WT(e, t, n) {
    Il = n, ql = e, mt(t), $b(t, e), mt(t), Il = null, ql = null;
  }
  function Aa(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          IT(e, t, i);
        } catch (s) {
          lt(i, t, s);
        }
      }
    var l = ss();
    if (t.subtreeFlags & Kf)
      for (var u = t.child; u !== null; )
        mt(u), $b(u, e), u = u.sibling;
    mt(l);
  }
  function $b(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case D:
      case $:
      case ge:
      case ce: {
        if (Aa(t, e), Ja(e), r & Ke) {
          try {
            La(Ga | Vt, e, e.return), Zr(Ga | Vt, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Xa(), La(kt | Vt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Ka(e);
          } else
            try {
              La(kt | Vt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case T: {
        Aa(t, e), Ja(e), r & Si && a !== null && Gl(a, a.return);
        return;
      }
      case V: {
        Aa(t, e), Ja(e), r & Si && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              By(i);
            } catch (De) {
              lt(e, e.return, De);
            }
          }
          if (r & Ke) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, s = a !== null ? a.memoizedProps : u, m = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  r0(l, h, m, s, u, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case Q: {
        if (Aa(t, e), Ja(e), r & Ke) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, S = e.memoizedProps, O = a !== null ? a.memoizedProps : S;
          try {
            i0(x, O, S);
          } catch (De) {
            lt(e, e.return, De);
          }
        }
        return;
      }
      case E: {
        if (Aa(t, e), Ja(e), r & Ke && a !== null) {
          var A = a.memoizedState;
          if (A.isDehydrated)
            try {
              _0(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case j: {
        Aa(t, e), Ja(e);
        return;
      }
      case P: {
        Aa(t, e), Ja(e);
        var z = e.child;
        if (z.flags & xi) {
          var ne = z.stateNode, Ee = z.memoizedState, me = Ee !== null;
          if (ne.isHidden = me, me) {
            var qe = z.alternate !== null && z.alternate.memoizedState !== null;
            qe || jj();
          }
        }
        if (r & Ke) {
          try {
            qT(e);
          } catch (De) {
            lt(e, e.return, De);
          }
          Bb(e);
        }
        return;
      }
      case oe: {
        var Pe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ye
        ) {
          var w = on;
          on = w || Pe, Aa(t, e), on = w;
        } else
          Aa(t, e);
        if (Ja(e), r & xi) {
          var H = e.stateNode, _ = e.memoizedState, W = _ !== null, se = e;
          if (H.isHidden = W, W && !Pe && (se.mode & Ye) !== xe) {
            fe = se;
            for (var re = se.child; re !== null; )
              fe = re, KT(re), re = re.sibling;
          }
          PT(se, W);
        }
        return;
      }
      case U: {
        Aa(t, e), Ja(e), r & Ke && Bb(e);
        return;
      }
      case ve:
        return;
      default: {
        Aa(t, e), Ja(e);
        return;
      }
    }
  }
  function Ja(e) {
    var t = e.flags;
    if (t & _t) {
      try {
        YT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~_t;
    }
    t & fr && (e.flags &= ~fr);
  }
  function QT(e, t, n) {
    Il = n, ql = t, fe = e, Yb(e, t, n), Il = null, ql = null;
  }
  function Yb(e, t, n) {
    for (var a = (e.mode & Ye) !== xe; fe !== null; ) {
      var r = fe, i = r.child;
      if (r.tag === oe && a) {
        var l = r.memoizedState !== null, u = l || Qc;
        if (u) {
          Im(e, t, n);
          continue;
        } else {
          var s = r.alternate, m = s !== null && s.memoizedState !== null, h = m || on, x = Qc, S = on;
          Qc = u, on = h, on && !S && (fe = r, XT(r));
          for (var O = i; O !== null; )
            fe = O, Yb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          fe = r, Qc = x, on = S, Im(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ce && i !== null ? (i.return = r, fe = i) : Im(e, t, n);
    }
  }
  function Im(e, t, n) {
    for (; fe !== null; ) {
      var a = fe;
      if ((a.flags & To) !== Ce) {
        var r = a.alternate;
        mt(a);
        try {
          zT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
        }
        qt();
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
  function KT(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.child;
      switch (t.tag) {
        case D:
        case $:
        case ge:
        case ce: {
          if (t.mode & nt)
            try {
              Xa(), La(kt, t, t.return);
            } finally {
              Ka(t);
            }
          else
            La(kt, t, t.return);
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
            Ib(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, fe = n) : Ib(e);
    }
  }
  function Ib(e) {
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
  function XT(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.child;
      if (t.tag === oe) {
        var a = t.memoizedState !== null;
        if (a) {
          qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, fe = n) : qb(e);
    }
  }
  function qb(e) {
    for (; fe !== null; ) {
      var t = fe;
      mt(t);
      try {
        HT(t);
      } catch (a) {
        lt(t, t.return, a);
      }
      if (qt(), t === e) {
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
  function JT(e, t, n, a) {
    fe = t, ZT(t, e, n, a);
  }
  function ZT(e, t, n, a) {
    for (; fe !== null; ) {
      var r = fe, i = r.child;
      (r.subtreeFlags & pl) !== Ce && i !== null ? (i.return = r, fe = i) : ej(e, t, n, a);
    }
  }
  function ej(e, t, n, a) {
    for (; fe !== null; ) {
      var r = fe;
      if ((r.flags & Vr) !== Ce) {
        mt(r);
        try {
          tj(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
        }
        qt();
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
  function tj(e, t, n, a) {
    switch (t.tag) {
      case D:
      case $:
      case ce: {
        if (t.mode & nt) {
          cm();
          try {
            Zr(rn | Vt, t);
          } finally {
            sm(t);
          }
        } else
          Zr(rn | Vt, t);
        break;
      }
    }
  }
  function nj(e) {
    fe = e, aj();
  }
  function aj() {
    for (; fe !== null; ) {
      var e = fe, t = e.child;
      if ((fe.flags & Ei) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            fe = r, lj(r, e);
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
          fe = e;
        }
      }
      (e.subtreeFlags & pl) !== Ce && t !== null ? (t.return = e, fe = t) : rj();
    }
  }
  function rj() {
    for (; fe !== null; ) {
      var e = fe;
      (e.flags & Vr) !== Ce && (mt(e), ij(e), qt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, fe = t;
        return;
      }
      fe = e.return;
    }
  }
  function ij(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        e.mode & nt ? (cm(), La(rn | Vt, e, e.return), sm(e)) : La(rn | Vt, e, e.return);
        break;
      }
    }
  }
  function lj(e, t) {
    for (; fe !== null; ) {
      var n = fe;
      mt(n), uj(n, t), qt();
      var a = n.child;
      a !== null ? (a.return = n, fe = a) : oj(e);
    }
  }
  function oj(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.sibling, a = t.return;
      if (Fb(t), t === e) {
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
  function uj(e, t) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        e.mode & nt ? (cm(), La(rn, e, t), sm(e)) : La(rn, e, t);
        break;
      }
    }
  }
  function sj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        try {
          Zr(kt | Vt, e);
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
  function cj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        try {
          Zr(rn | Vt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function fj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        try {
          La(kt | Vt, e, e.return);
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
  function dj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce:
        try {
          La(rn | Vt, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Mu = Symbol.for;
    Mu("selector.component"), Mu("selector.has_pseudo_class"), Mu("selector.role"), Mu("selector.test_id"), Mu("selector.text");
  }
  var pj = [];
  function mj() {
    pj.forEach(function(e) {
      return e();
    });
  }
  var vj = v.ReactCurrentActQueue;
  function hj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Gb() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && vj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var yj = Math.ceil, qm = v.ReactCurrentDispatcher, Gm = v.ReactCurrentOwner, sn = v.ReactCurrentBatchConfig, Va = v.ReactCurrentActQueue, zt = (
    /*             */
    0
  ), Wb = (
    /*               */
    1
  ), cn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), xr = 0, Au = 1, Yi = 2, Xc = 3, Vu = 4, Qb = 5, Wm = 6, Ie = zt, Ln = null, bt = null, Ht = Y, Za = Y, Qm = Yr(Y), Pt = xr, ku = null, Jc = Y, Uu = Y, Zc = Y, Fu = null, $n = null, Km = 0, Kb = 500, Xb = 1 / 0, gj = 500, Rr = null;
  function zu() {
    Xb = Gt() + gj;
  }
  function Jb() {
    return Xb;
  }
  var ef = !1, Xm = null, Wl = null, Ii = !1, ti = null, Hu = Y, Jm = [], Zm = null, bj = 50, Pu = 0, ev = null, tv = !1, tf = !1, Nj = 50, Ql = 0, nf = null, Bu = st, af = Y, Zb = !1;
  function rf() {
    return Ln;
  }
  function Mn() {
    return (Ie & (cn | da)) !== zt ? Gt() : (Bu !== st || (Bu = Gt()), Bu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Ye) === xe)
      return _e;
    if ((Ie & cn) !== zt && Ht !== Y)
      return Ao(Ht);
    var n = vD() !== mD;
    if (n) {
      if (sn.transition !== null) {
        var a = sn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return af === Qt && (af = Ah()), af;
    }
    var r = Ra();
    if (r !== Qt)
      return r;
    var i = ZC();
    return i;
  }
  function Ej(e) {
    var t = e.mode;
    return (t & Ye) === xe ? _e : xx();
  }
  function Bt(e, t, n, a) {
    Ij(), Zb && f("useInsertionEffect must not schedule updates."), tv && (tf = !0), Vo(e, n, a), (Ie & cn) !== Y && e === Ln ? Wj(t) : (xa && Uh(e, t, n), Qj(t), e === Ln && ((Ie & cn) === zt && (Uu = Ue(Uu, n)), Pt === Vu && ai(e, Ht)), Yn(e, a), n === _e && Ie === zt && (t.mode & Ye) === xe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Va.isBatchingLegacy && (zu(), Zy()));
  }
  function Sj(e, t, n) {
    var a = e.current;
    a.lanes = t, Vo(e, t, n), Yn(e, n);
  }
  function xj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & cn) !== zt
    );
  }
  function Yn(e, t) {
    var n = e.callbackNode;
    yx(e, t);
    var a = Cs(e, e === Ln ? Ht : Y);
    if (a === Y) {
      n !== null && vN(n), e.callbackNode = null, e.callbackPriority = Qt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== uv)) {
      n == null && i !== _e && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && vN(n);
    var l;
    if (r === _e)
      e.tag === Ir ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), X0(nN.bind(null, e))) : Jy(nN.bind(null, e)), Va.current !== null ? Va.current.push(qr) : t0(function() {
        (Ie & (cn | da)) === zt && qr();
      }), l = null;
    else {
      var u;
      switch (Hh(a)) {
        case Qn:
          u = Es;
          break;
        case mr:
          u = Xf;
          break;
        case vr:
          u = Di;
          break;
        case js:
          u = Jf;
          break;
        default:
          u = Di;
          break;
      }
      l = sv(u, eN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function eN(e, t) {
    if (PD(), Bu = st, af = Y, (Ie & (cn | da)) !== zt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Cs(e, e === Ln ? Ht : Y);
    if (r === Y)
      return null;
    var i = !Ds(e, r) && !Sx(e, r) && !t, l = i ? Mj(e, r) : of(e, r);
    if (l !== xr) {
      if (l === Yi) {
        var u = Nd(e);
        u !== Y && (r = u, l = nv(e, u));
      }
      if (l === Au) {
        var s = ku;
        throw qi(e, Y), ai(e, r), Yn(e, Gt()), s;
      }
      if (l === Wm)
        ai(e, r);
      else {
        var m = !Ds(e, r), h = e.current.alternate;
        if (m && !Cj(h)) {
          if (l = of(e, r), l === Yi) {
            var x = Nd(e);
            x !== Y && (r = x, l = nv(e, x));
          }
          if (l === Au) {
            var S = ku;
            throw qi(e, Y), ai(e, r), Yn(e, Gt()), S;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Rj(e, l, r);
      }
    }
    return Yn(e, Gt()), e.callbackNode === n ? eN.bind(null, e) : null;
  }
  function nv(e, t) {
    var n = Fu;
    if (ws(e)) {
      var a = qi(e, t);
      a.flags |= cr, Y0(e.containerInfo);
    }
    var r = of(e, t);
    if (r !== Yi) {
      var i = $n;
      $n = n, i !== null && tN(i);
    }
    return r;
  }
  function tN(e) {
    $n === null ? $n = e : $n.push.apply($n, e);
  }
  function Rj(e, t, n) {
    switch (t) {
      case xr:
      case Au:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, $n, Rr);
        break;
      }
      case Xc: {
        if (ai(e, n), Lh(n) && // do not delay if we're inside an act() scope
        !hN()) {
          var a = Km + Kb - Gt();
          if (a > 10) {
            var r = Cs(e, Y);
            if (r !== Y)
              break;
            var i = e.suspendedLanes;
            if (!bl(i, n)) {
              Mn(), kh(e, i);
              break;
            }
            e.timeoutHandle = Zd(Gi.bind(null, e, $n, Rr), a);
            break;
          }
        }
        Gi(e, $n, Rr);
        break;
      }
      case Vu: {
        if (ai(e, n), Ex(n))
          break;
        if (!hN()) {
          var l = vx(e, n), u = l, s = Gt() - u, m = Yj(s) - s;
          if (m > 10) {
            e.timeoutHandle = Zd(Gi.bind(null, e, $n, Rr), m);
            break;
          }
        }
        Gi(e, $n, Rr);
        break;
      }
      case Qb: {
        Gi(e, $n, Rr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function Cj(e) {
    for (var t = e; ; ) {
      if (t.flags & Yf) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, u = i.value;
              try {
                if (!Xn(l(), u))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var s = t.child;
      if (t.subtreeFlags & Yf && s !== null) {
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
    t = Ts(t, Zc), t = Ts(t, Uu), Cx(e, t);
  }
  function nN(e) {
    if (BD(), (Ie & (cn | da)) !== zt)
      throw new Error("Should not already be working.");
    Dr();
    var t = Cs(e, Y);
    if (!Wn(t, _e))
      return Yn(e, Gt()), null;
    var n = of(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = Nd(e);
      a !== Y && (t = a, n = nv(e, a));
    }
    if (n === Au) {
      var r = ku;
      throw qi(e, Y), ai(e, t), Yn(e, Gt()), r;
    }
    if (n === Wm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, $n, Rr), Yn(e, Gt()), null;
  }
  function Dj(e, t) {
    t !== Y && (Rd(e, Ue(t, _e)), Yn(e, Gt()), (Ie & (cn | da)) === zt && (zu(), qr()));
  }
  function av(e, t) {
    var n = Ie;
    Ie |= Wb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === zt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Va.isBatchingLegacy && (zu(), Zy());
    }
  }
  function Tj(e, t, n, a, r) {
    var i = Ra(), l = sn.transition;
    try {
      return sn.transition = null, Kt(Qn), e(t, n, a, r);
    } finally {
      Kt(i), sn.transition = l, Ie === zt && zu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && (Ie & (cn | da)) === zt && Dr();
    var t = Ie;
    Ie |= Wb;
    var n = sn.transition, a = Ra();
    try {
      return sn.transition = null, Kt(Qn), e ? e() : void 0;
    } finally {
      Kt(a), sn.transition = n, Ie = t, (Ie & (cn | da)) === zt && qr();
    }
  }
  function aN() {
    return (Ie & (cn | da)) !== zt;
  }
  function lf(e, t) {
    bn(Qm, Za, e), Za = Ue(Za, t);
  }
  function rv(e) {
    Za = Qm.current, gn(Qm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = Y;
    var n = e.timeoutHandle;
    if (n !== ep && (e.timeoutHandle = ep, e0(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        Lb(r, a), a = a.return;
      }
    Ln = e;
    var i = Wi(e.current, null);
    return bt = i, Ht = Za = t, Pt = xr, ku = null, Jc = Y, Uu = Y, Zc = Y, Fu = null, $n = null, SD(), Ta.discardPendingWarnings(), i;
  }
  function rN(e, t) {
    do {
      var n = bt;
      try {
        if (vc(), jg(), qt(), Gm.current = null, n === null || n.return === null) {
          Pt = Au, ku = t, bt = null;
          return;
        }
        if (Jt && n.mode & nt && Yc(n, !0), In)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            ax(n, a, Ht);
          } else
            nx(n, t, Ht);
        XD(e, n.return, n, t, Ht), uN(n);
      } catch (r) {
        t = r, bt === n && n !== null ? (n = n.return, bt = n) : n = bt;
        continue;
      }
      return;
    } while (!0);
  }
  function iN() {
    var e = qm.current;
    return qm.current = zc, e === null ? zc : e;
  }
  function lN(e) {
    qm.current = e;
  }
  function jj() {
    Km = Gt();
  }
  function $u(e) {
    Jc = Ue(e, Jc);
  }
  function wj() {
    Pt === xr && (Pt = Xc);
  }
  function iv() {
    (Pt === xr || Pt === Xc || Pt === Yi) && (Pt = Vu), Ln !== null && (Ed(Jc) || Ed(Uu)) && ai(Ln, Ht);
  }
  function _j(e) {
    Pt !== Vu && (Pt = Yi), Fu === null ? Fu = [e] : Fu.push(e);
  }
  function Oj() {
    return Pt === xr;
  }
  function of(e, t) {
    var n = Ie;
    Ie |= cn;
    var a = iN();
    if (Ln !== e || Ht !== t) {
      if (xa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ht), r.clear()), Fh(e, t);
      }
      Rr = zh(), qi(e, t);
    }
    Th(t);
    do
      try {
        Lj();
        break;
      } catch (i) {
        rN(e, i);
      }
    while (!0);
    if (vc(), Ie = n, lN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return jh(), Ln = null, Ht = Y, Pt;
  }
  function Lj() {
    for (; bt !== null; )
      oN(bt);
  }
  function Mj(e, t) {
    var n = Ie;
    Ie |= cn;
    var a = iN();
    if (Ln !== e || Ht !== t) {
      if (xa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ht), r.clear()), Fh(e, t);
      }
      Rr = zh(), zu(), qi(e, t);
    }
    Th(t);
    do
      try {
        Aj();
        break;
      } catch (i) {
        rN(e, i);
      }
    while (!0);
    return vc(), lN(a), Ie = n, bt !== null ? (ux(), xr) : (jh(), Ln = null, Ht = Y, Pt);
  }
  function Aj() {
    for (; bt !== null && !kS(); )
      oN(bt);
  }
  function oN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== xe ? (um(e), n = lv(t, e, Za), Yc(e, !0)) : n = lv(t, e, Za), qt(), e.memoizedProps = e.pendingProps, n === null ? uN(e) : bt = n, Gm.current = null;
  }
  function uN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Ns) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === xe ? r = Ob(n, t, Za) : (um(t), r = Ob(n, t, Za), Yc(t, !1)), qt(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = wT(n, t);
        if (i !== null) {
          i.flags &= _S, bt = i;
          return;
        }
        if ((t.mode & nt) !== xe) {
          Yc(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Ns, a.subtreeFlags = Ce, a.deletions = null;
        else {
          Pt = Wm, bt = null;
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
    Pt === xr && (Pt = Qb);
  }
  function Gi(e, t, n) {
    var a = Ra(), r = sn.transition;
    try {
      sn.transition = null, Kt(Qn), Vj(e, t, n, a);
    } finally {
      sn.transition = r, Kt(a);
    }
    return null;
  }
  function Vj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (qj(), (Ie & (cn | da)) !== zt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (QS(i), r === null)
      return Rh(), null;
    if (i === Y && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Y, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Qt;
    var l = Ue(r.lanes, r.childLanes);
    Dx(e, l), e === Ln && (Ln = null, bt = null, Ht = Y), ((r.subtreeFlags & pl) !== Ce || (r.flags & pl) !== Ce) && (Ii || (Ii = !0, Zm = n, sv(Di, function() {
      return Dr(), null;
    })));
    var u = (r.subtreeFlags & (Qf | Kf | To | pl)) !== Ce, s = (r.flags & (Qf | Kf | To | pl)) !== Ce;
    if (u || s) {
      var m = sn.transition;
      sn.transition = null;
      var h = Ra();
      Kt(Qn);
      var x = Ie;
      Ie |= da, Gm.current = null, AT(e, r), Zg(), WT(e, r, i), GC(e.containerInfo), e.current = r, rx(i), QT(r, e, i), ix(), US(), Ie = x, Kt(h), sn.transition = m;
    } else
      e.current = r, Zg();
    var S = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, nf = null), l = e.pendingLanes, l === Y && (Wl = null), S || dN(e.current, !1), YS(r.stateNode, a), xa && e.memoizedUpdaters.clear(), mj(), Yn(e, Gt()), t !== null)
      for (var O = e.onRecoverableError, A = 0; A < t.length; A++) {
        var z = t[A], ne = z.stack, Ee = z.digest;
        O(z.value, {
          componentStack: ne,
          digest: Ee
        });
      }
    if (ef) {
      ef = !1;
      var me = Xm;
      throw Xm = null, me;
    }
    return Wn(Hu, _e) && e.tag !== Ir && Dr(), l = e.pendingLanes, Wn(l, _e) ? (HD(), e === ev ? Pu++ : (Pu = 0, ev = e)) : Pu = 0, qr(), Rh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = Hh(Hu), t = _x(vr, e), n = sn.transition, a = Ra();
      try {
        return sn.transition = null, Kt(t), Uj();
      } finally {
        Kt(a), sn.transition = n;
      }
    }
    return !1;
  }
  function kj(e) {
    Jm.push(e), Ii || (Ii = !0, sv(Di, function() {
      return Dr(), null;
    }));
  }
  function Uj() {
    if (ti === null)
      return !1;
    var e = Zm;
    Zm = null;
    var t = ti, n = Hu;
    if (ti = null, Hu = Y, (Ie & (cn | da)) !== zt)
      throw new Error("Cannot flush passive effects while already rendering.");
    tv = !0, tf = !1, lx(n);
    var a = Ie;
    Ie |= da, nj(t.current), JT(t, t.current, n, e);
    {
      var r = Jm;
      Jm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        FT(t, l);
      }
    }
    ox(), dN(t.current, !0), Ie = a, qr(), tf ? t === nf ? Ql++ : (Ql = 0, nf = t) : Ql = 0, tv = !1, tf = !1, IS(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function sN(e) {
    return Wl !== null && Wl.has(e);
  }
  function Fj(e) {
    Wl === null ? Wl = /* @__PURE__ */ new Set([e]) : Wl.add(e);
  }
  function zj(e) {
    ef || (ef = !0, Xm = e);
  }
  var Hj = zj;
  function cN(e, t, n) {
    var a = Bi(n, t), r = ob(e, a, _e), i = Wr(e, r, _e), l = Mn();
    i !== null && (Vo(i, _e, l), Yn(i, l));
  }
  function lt(e, t, n) {
    if (OT(n), Iu(!1), e.tag === E) {
      cN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === E) {
        cN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !sN(i)) {
          var l = Bi(n, e), u = Dm(a, l, _e), s = Wr(a, u, _e), m = Mn();
          s !== null && (Vo(s, _e, m), Yn(s, m));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Pj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Mn();
    kh(e, n), Kj(e), Ln === e && bl(Ht, n) && (Pt === Vu || Pt === Xc && Lh(Ht) && Gt() - Km < Kb ? qi(e, Y) : Zc = Ue(Zc, n)), Yn(e, r);
  }
  function fN(e, t) {
    t === Qt && (t = Ej(e));
    var n = Mn(), a = Pn(e, t);
    a !== null && (Vo(a, t, n), Yn(a, n));
  }
  function Bj(e) {
    var t = e.memoizedState, n = Qt;
    t !== null && (n = t.retryLane), fN(e, n);
  }
  function $j(e, t) {
    var n = Qt, a;
    switch (e.tag) {
      case P:
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
    a !== null && a.delete(t), fN(e, n);
  }
  function Yj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : yj(e / 1960) * 1960;
  }
  function Ij() {
    if (Pu > bj)
      throw Pu = 0, ev = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > Nj && (Ql = 0, nf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function qj() {
    Ta.flushLegacyContextWarning(), Ta.flushPendingUnsafeLifecycleWarnings();
  }
  function dN(e, t) {
    mt(e), uf(e, kr, fj), t && uf(e, Wf, dj), uf(e, kr, sj), t && uf(e, Wf, cj), qt();
  }
  function uf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ce ? a = a.child : ((a.flags & t) !== Ce && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var sf = null;
  function pN(e) {
    {
      if ((Ie & cn) !== zt || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== L && t !== E && t !== T && t !== D && t !== $ && t !== ge && t !== ce)
        return;
      var n = Ve(e) || "ReactComponent";
      if (sf !== null) {
        if (sf.has(n))
          return;
        sf.add(n);
      } else
        sf = /* @__PURE__ */ new Set([n]);
      var a = Tn;
      try {
        mt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : qt();
      }
    }
  }
  var lv;
  {
    var Gj = null;
    lv = function(e, t, n) {
      var a = EN(Gj, t);
      try {
        return Db(e, t, n);
      } catch (i) {
        if (iD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (vc(), jg(), Lb(e, t), EN(t, a), t.mode & nt && um(t), Bf(null, Db, null, e, t, n), TS()) {
          var r = $f();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var mN = !1, ov;
  ov = /* @__PURE__ */ new Set();
  function Wj(e) {
    if (yi && !UD())
      switch (e.tag) {
        case D:
        case $:
        case ce: {
          var t = bt && Ve(bt) || "Unknown", n = t;
          if (!ov.has(n)) {
            ov.add(n);
            var a = Ve(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          mN || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), mN = !0);
          break;
        }
      }
  }
  function Yu(e, t) {
    if (xa) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Uh(e, a, t);
      });
    }
  }
  var uv = {};
  function sv(e, t) {
    {
      var n = Va.current;
      return n !== null ? (n.push(t), uv) : xh(e, t);
    }
  }
  function vN(e) {
    if (e !== uv)
      return VS(e);
  }
  function hN() {
    return Va.current !== null;
  }
  function Qj(e) {
    {
      if (e.mode & Ye) {
        if (!Gb())
          return;
      } else if (!hj() || Ie !== zt || e.tag !== D && e.tag !== $ && e.tag !== ce)
        return;
      if (Va.current === null) {
        var t = Tn;
        try {
          mt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ve(e));
        } finally {
          t ? mt(e) : qt();
        }
      }
    }
  }
  function Kj(e) {
    e.tag !== Ir && Gb() && Va.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Iu(e) {
    Zb = e;
  }
  var pa = null, Kl = null, Xj = function(e) {
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
  function cv(e) {
    return Xl(e);
  }
  function fv(e) {
    {
      if (pa === null)
        return e;
      var t = pa(e);
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
  function yN(e, t) {
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
        var l = pa(n);
        if (l !== void 0 && l === pa(a))
          return !0;
      }
      return !1;
    }
  }
  function gN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Kl === null && (Kl = /* @__PURE__ */ new WeakSet()), Kl.add(e);
    }
  }
  var Jj = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        dv(e.current, a, n);
      });
    }
  }, Zj = function(e, t) {
    {
      if (e.context !== Jn)
        return;
      Dr(), Cr(function() {
        qu(t, e, null, null);
      });
    }
  };
  function dv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, u = e.type, s = null;
      switch (l) {
        case D:
        case ce:
        case T:
          s = u;
          break;
        case $:
          s = u.render;
          break;
      }
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var m = !1, h = !1;
      if (s !== null) {
        var x = pa(s);
        x !== void 0 && (n.has(x) ? h = !0 : t.has(x) && (l === T ? h = !0 : m = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || m) {
        var S = Pn(e, _e);
        S !== null && Bt(S, e, _e, st);
      }
      r !== null && !h && dv(r, t, n), i !== null && dv(i, t, n);
    }
  }
  var e1 = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return pv(e.current, a, n), n;
    }
  };
  function pv(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, u = null;
      switch (i) {
        case D:
        case ce:
        case T:
          u = l;
          break;
        case $:
          u = l.render;
          break;
      }
      var s = !1;
      u !== null && t.has(u) && (s = !0), s ? t1(e, n) : a !== null && pv(a, t, n), r !== null && pv(r, t, n);
    }
  }
  function t1(e, t) {
    {
      var n = n1(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case V:
            t.add(a.stateNode);
            return;
          case j:
            t.add(a.stateNode.containerInfo);
            return;
          case E:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function n1(e, t) {
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
  var mv;
  {
    mv = !1;
    try {
      var bN = Object.preventExtensions({});
    } catch {
      mv = !0;
    }
  }
  function a1(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = Y, this.childLanes = Y, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !mv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Zn = function(e, t, n, a) {
    return new a1(e, t, n, a);
  };
  function vv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function r1(e) {
    return typeof e == "function" && !vv(e) && e.defaultProps === void 0;
  }
  function i1(e) {
    if (typeof e == "function")
      return vv(e) ? T : D;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return $;
      if (t === ke)
        return ge;
    }
    return L;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case L:
      case D:
      case ce:
        n.type = Xl(e.type);
        break;
      case T:
        n.type = cv(e.type);
        break;
      case $:
        n.type = fv(e.type);
        break;
    }
    return n;
  }
  function l1(e, t) {
    e.flags &= dr | _t;
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
  function o1(e, t, n) {
    var a;
    return e === ic ? (a = Ye, t === !0 && (a |= St, a |= $a)) : a = xe, xa && (a |= nt), Zn(E, null, null, a);
  }
  function hv(e, t, n, a, r, i) {
    var l = L, u = e;
    if (typeof e == "function")
      vv(e) ? (l = T, u = cv(u)) : u = Xl(u);
    else if (typeof e == "string")
      l = V;
    else
      e: switch (e) {
        case za:
          return ri(n.children, r, i, t);
        case fi:
          l = ae, r |= St, (r & Ye) !== xe && (r |= $a);
          break;
        case N:
          return u1(n, r, i, t);
        case Be:
          return s1(n, r, i, t);
        case we:
          return c1(n, r, i, t);
        case dt:
          return NN(n, r, i, t);
        case hn:
        case Mt:
        case Ha:
        case Na:
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
                l = $, u = fv(u);
                break e;
              case ke:
                l = ge;
                break e;
              case Se:
                l = X, u = null;
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
    var h = Zn(l, n, t, r);
    return h.elementType = e, h.type = u, h.lanes = i, h._debugOwner = a, h;
  }
  function yv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = hv(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function ri(e, t, n, a) {
    var r = Zn(pe, e, a, t);
    return r.lanes = n, r;
  }
  function u1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(G, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function s1(e, t, n, a) {
    var r = Zn(P, e, a, t);
    return r.elementType = Be, r.lanes = n, r;
  }
  function c1(e, t, n, a) {
    var r = Zn(U, e, a, t);
    return r.elementType = we, r.lanes = n, r;
  }
  function NN(e, t, n, a) {
    var r = Zn(oe, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function gv(e, t, n) {
    var a = Zn(Q, e, null, t);
    return a.lanes = n, a;
  }
  function f1() {
    var e = Zn(V, null, null, xe);
    return e.elementType = "DELETED", e;
  }
  function d1(e) {
    var t = Zn(J, null, null, xe);
    return t.stateNode = e, t;
  }
  function bv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(j, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function EN(e, t) {
    return e === null && (e = Zn(L, null, null, xe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function p1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = ep, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Qt, this.eventTimes = xd(Y), this.expirationTimes = xd(st), this.pendingLanes = Y, this.suspendedLanes = Y, this.pingedLanes = Y, this.expiredLanes = Y, this.mutableReadLanes = Y, this.finishedLanes = Y, this.entangledLanes = Y, this.entanglements = xd(Y), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < ed; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case ic:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Ir:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function SN(e, t, n, a, r, i, l, u, s, m) {
    var h = new p1(e, t, n, u, s), x = o1(t, i);
    h.current = x, x.stateNode = h;
    {
      var S = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      x.memoizedState = S;
    }
    return Lp(x), h;
  }
  var Nv = "18.3.1";
  function m1(e, t, n) {
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
  var Ev, Sv;
  Ev = !1, Sv = {};
  function xN(e) {
    if (!e)
      return Jn;
    var t = cl(e), n = K0(t);
    if (t.tag === T) {
      var a = t.type;
      if (qa(a))
        return Ky(t, a, n);
    }
    return n;
  }
  function v1(e, t) {
    {
      var n = cl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Nh(n);
      if (r === null)
        return null;
      if (r.mode & St) {
        var i = Ve(n) || "Component";
        if (!Sv[i]) {
          Sv[i] = !0;
          var l = Tn;
          try {
            mt(r), n.mode & St ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? mt(l) : qt();
          }
        }
      }
      return r.stateNode;
    }
  }
  function RN(e, t, n, a, r, i, l, u) {
    var s = !1, m = null;
    return SN(e, t, s, m, n, a, r, i, l);
  }
  function CN(e, t, n, a, r, i, l, u, s, m) {
    var h = !0, x = SN(n, a, h, e, r, i, l, u, s);
    x.context = xN(null);
    var S = x.current, O = Mn(), A = ni(S), z = Er(O, A);
    return z.callback = t ?? null, Wr(S, z, A), Sj(x, A, O), x;
  }
  function qu(e, t, n, a) {
    $S(t, e);
    var r = t.current, i = Mn(), l = ni(r);
    sx(l);
    var u = xN(n);
    t.context === null ? t.context = u : t.pendingContext = u, yi && Tn !== null && !Ev && (Ev = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ve(Tn) || "Unknown"));
    var s = Er(i, l);
    s.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), s.callback = a);
    var m = Wr(r, s, l);
    return m !== null && (Bt(m, r, l, i), Nc(m, r, l)), l;
  }
  function cf(e) {
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
  function h1(e) {
    switch (e.tag) {
      case E: {
        var t = e.stateNode;
        if (ws(t)) {
          var n = gx(t);
          Dj(t, n);
        }
        break;
      }
      case P: {
        Cr(function() {
          var r = Pn(e, _e);
          if (r !== null) {
            var i = Mn();
            Bt(r, e, _e, i);
          }
        });
        var a = _e;
        xv(e, a);
        break;
      }
    }
  }
  function DN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = Rx(n.retryLane, t));
  }
  function xv(e, t) {
    DN(e, t);
    var n = e.alternate;
    n && DN(n, t);
  }
  function y1(e) {
    if (e.tag === P) {
      var t = Oo, n = Pn(e, t);
      if (n !== null) {
        var a = Mn();
        Bt(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function g1(e) {
    if (e.tag === P) {
      var t = ni(e), n = Pn(e, t);
      if (n !== null) {
        var a = Mn();
        Bt(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function TN(e) {
    var t = AS(e);
    return t === null ? null : t.stateNode;
  }
  var jN = function(e) {
    return null;
  };
  function b1(e) {
    return jN(e);
  }
  var wN = function(e) {
    return !1;
  };
  function N1(e) {
    return wN(e);
  }
  var _N = null, ON = null, LN = null, MN = null, AN = null, VN = null, kN = null, UN = null, FN = null;
  {
    var zN = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : ze({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = zN(e[a], t, n + 1), r);
    }, HN = function(e, t) {
      return zN(e, t, 0);
    }, PN = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : ze({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], He(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = PN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, BN = function(e, t, n) {
      if (t.length !== n.length) {
        R("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            R("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return PN(e, t, n, 0);
    }, $N = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : ze({}, e);
      return i[r] = $N(e[r], t, n + 1, a), i;
    }, YN = function(e, t, n) {
      return $N(e, t, 0, n);
    }, Rv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    _N = function(e, t, n, a) {
      var r = Rv(e, t);
      if (r !== null) {
        var i = YN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, _e);
        l !== null && Bt(l, e, _e, st);
      }
    }, ON = function(e, t, n) {
      var a = Rv(e, t);
      if (a !== null) {
        var r = HN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Pn(e, _e);
        i !== null && Bt(i, e, _e, st);
      }
    }, LN = function(e, t, n, a) {
      var r = Rv(e, t);
      if (r !== null) {
        var i = BN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, _e);
        l !== null && Bt(l, e, _e, st);
      }
    }, MN = function(e, t, n) {
      e.pendingProps = YN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, _e);
      a !== null && Bt(a, e, _e, st);
    }, AN = function(e, t) {
      e.pendingProps = HN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Pn(e, _e);
      n !== null && Bt(n, e, _e, st);
    }, VN = function(e, t, n) {
      e.pendingProps = BN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, _e);
      a !== null && Bt(a, e, _e, st);
    }, kN = function(e) {
      var t = Pn(e, _e);
      t !== null && Bt(t, e, _e, st);
    }, UN = function(e) {
      jN = e;
    }, FN = function(e) {
      wN = e;
    };
  }
  function E1(e) {
    var t = Nh(e);
    return t === null ? null : t.stateNode;
  }
  function S1(e) {
    return null;
  }
  function x1() {
    return Tn;
  }
  function R1(e) {
    var t = e.findFiberByHostInstance, n = v.ReactCurrentDispatcher;
    return BS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: _N,
      overrideHookStateDeletePath: ON,
      overrideHookStateRenamePath: LN,
      overrideProps: MN,
      overridePropsDeletePath: AN,
      overridePropsRenamePath: VN,
      setErrorHandler: UN,
      setSuspenseHandler: FN,
      scheduleUpdate: kN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: E1,
      findFiberByHostInstance: t || S1,
      // React Refresh
      findHostInstancesForRefresh: e1,
      scheduleRefresh: Jj,
      scheduleRoot: Zj,
      setRefreshHandler: Xj,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: x1,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: Nv
    });
  }
  var IN = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Cv(e) {
    this._internalRoot = e;
  }
  ff.prototype.render = Cv.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : df(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== wt) {
        var a = TN(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    qu(e, t, null, null);
  }, ff.prototype.unmount = Cv.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      aN() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Cr(function() {
        qu(null, e, null, null);
      }), Iy(t);
    }
  };
  function C1(e, t) {
    if (!df(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    qN(e);
    var n = !1, a = !1, r = "", i = IN;
    t != null && (t.hydrate ? R("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = RN(e, ic, null, n, a, r, i);
    Js(l.current, e);
    var u = e.nodeType === wt ? e.parentNode : e;
    return Jo(u), new Cv(l);
  }
  function ff(e) {
    this._internalRoot = e;
  }
  function D1(e) {
    e && Px(e);
  }
  ff.prototype.unstable_scheduleHydration = D1;
  function T1(e, t, n) {
    if (!df(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    qN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", s = IN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError));
    var m = CN(t, null, e, ic, a, i, l, u, s);
    if (Js(m.current, e), Jo(e), r)
      for (var h = 0; h < r.length; h++) {
        var x = r[h];
        OD(m, x);
      }
    return new ff(m);
  }
  function df(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === sr || e.nodeType === Of));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === sr || e.nodeType === Of || e.nodeType === wt && e.nodeValue === " react-mount-point-unstable "));
  }
  function qN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var j1 = v.ReactCurrentOwner, GN;
  GN = function(e) {
    if (e._reactRootContainer && e.nodeType !== wt) {
      var t = TN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Dv(e), r = !!(a && $r(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Dv(e) {
    return e ? e.nodeType === sr ? e.documentElement : e.firstChild : null;
  }
  function WN() {
  }
  function w1(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var S = cf(l);
          i.call(S);
        };
      }
      var l = CN(
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
        WN
      );
      e._reactRootContainer = l, Js(l.current, e);
      var u = e.nodeType === wt ? e.parentNode : e;
      return Jo(u), Cr(), l;
    } else {
      for (var s; s = e.lastChild; )
        e.removeChild(s);
      if (typeof a == "function") {
        var m = a;
        a = function() {
          var S = cf(h);
          m.call(S);
        };
      }
      var h = RN(
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
        WN
      );
      e._reactRootContainer = h, Js(h.current, e);
      var x = e.nodeType === wt ? e.parentNode : e;
      return Jo(x), Cr(function() {
        qu(t, h, n, a);
      }), h;
    }
  }
  function _1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function pf(e, t, n, a, r) {
    GN(n), _1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = w1(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var u = r;
        r = function() {
          var s = cf(l);
          u.call(s);
        };
      }
      qu(t, l, e, r);
    }
    return cf(l);
  }
  var QN = !1;
  function O1(e) {
    {
      QN || (QN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = j1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Qe(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : v1(e, "findDOMNode");
  }
  function L1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return pf(null, e, t, !0, n);
  }
  function M1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return pf(null, e, t, !1, n);
  }
  function A1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !jS(e))
      throw new Error("parentComponent must be a valid React Component");
    return pf(e, t, n, !1, a);
  }
  var KN = !1;
  function V1(e) {
    if (KN || (KN = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = su(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Dv(e), a = n && !$r(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Cr(function() {
        pf(null, null, e, !1, function() {
          e._reactRootContainer = null, Iy(e);
        });
      }), !0;
    } else {
      {
        var r = Dv(e), i = !!(r && $r(r)), l = e.nodeType === zn && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  Ox(h1), Mx(y1), Ax(g1), Vx(Ra), kx(jx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), yS(UC), NS(av, Tj, Cr);
  function k1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!df(t))
      throw new Error("Target container is not a DOM element.");
    return m1(e, t, null, n);
  }
  function U1(e, t, n, a) {
    return A1(e, t, n, a);
  }
  var Tv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$r, jl, Zs, oh, uh, av]
  };
  function F1(e, t) {
    return Tv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), C1(e, t);
  }
  function z1(e, t, n) {
    return Tv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), T1(e, t, n);
  }
  function H1(e) {
    return aN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var P1 = R1({
    findFiberByHostInstance: Mi,
    bundleType: 1,
    version: Nv,
    rendererPackageName: "react-dom"
  });
  if (!P1 && en && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var XN = window.location.protocol;
    /^(https?|file):$/.test(XN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (XN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Tv, ta.createPortal = k1, ta.createRoot = F1, ta.findDOMNode = O1, ta.flushSync = H1, ta.hydrate = L1, ta.hydrateRoot = z1, ta.render = M1, ta.unmountComponentAtNode = V1, ta.unstable_batchedUpdates = av, ta.unstable_renderSubtreeIntoContainer = U1, ta.version = Nv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
mE.exports = ta;
var K1 = mE.exports, yE, JN = K1;
{
  var ZN = JN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  yE = function(o, p) {
    ZN.usingClientEntryPoint = !0;
    try {
      return JN.createRoot(o, p);
    } finally {
      ZN.usingClientEntryPoint = !1;
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
function Ku() {
  return Ku = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (o[g] = v[g]);
    }
    return o;
  }, Ku.apply(this, arguments);
}
var li;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(li || (li = {}));
const eE = "popstate";
function X1(o) {
  o === void 0 && (o = {});
  function p(g, y) {
    let {
      pathname: R,
      search: f,
      hash: k
    } = g.location;
    return Ov(
      "",
      {
        pathname: R,
        search: f,
        hash: k
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function v(g, y) {
    return typeof y == "string" ? y : Xu(y);
  }
  return Z1(p, v, null, o);
}
function ht(o, p) {
  if (o === !1 || o === null || typeof o > "u")
    throw new Error(p);
}
function ka(o, p) {
  if (!o) {
    typeof console < "u" && console.warn(p);
    try {
      throw new Error(p);
    } catch {
    }
  }
}
function J1() {
  return Math.random().toString(36).substr(2, 8);
}
function tE(o, p) {
  return {
    usr: o.state,
    key: o.key,
    idx: p
  };
}
function Ov(o, p, v, g) {
  return v === void 0 && (v = null), Ku({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof p == "string" ? eo(p) : p, {
    state: v,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: p && p.key || g || J1()
  });
}
function Xu(o) {
  let {
    pathname: p = "/",
    search: v = "",
    hash: g = ""
  } = o;
  return v && v !== "?" && (p += v.charAt(0) === "?" ? v : "?" + v), g && g !== "#" && (p += g.charAt(0) === "#" ? g : "#" + g), p;
}
function eo(o) {
  let p = {};
  if (o) {
    let v = o.indexOf("#");
    v >= 0 && (p.hash = o.substr(v), o = o.substr(0, v));
    let g = o.indexOf("?");
    g >= 0 && (p.search = o.substr(g), o = o.substr(0, g)), o && (p.pathname = o);
  }
  return p;
}
function Z1(o, p, v, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: R = !1
  } = g, f = y.history, k = li.Pop, D = null, T = L();
  T == null && (T = 0, f.replaceState(Ku({}, f.state, {
    idx: T
  }), ""));
  function L() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function E() {
    k = li.Pop;
    let ae = L(), he = ae == null ? null : ae - T;
    T = ae, D && D({
      action: k,
      location: pe.location,
      delta: he
    });
  }
  function j(ae, he) {
    k = li.Push;
    let I = Ov(pe.location, ae, he);
    T = L() + 1;
    let $ = tE(I, T), G = pe.createHref(I);
    try {
      f.pushState($, "", G);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError")
        throw P;
      y.location.assign(G);
    }
    R && D && D({
      action: k,
      location: pe.location,
      delta: 1
    });
  }
  function V(ae, he) {
    k = li.Replace;
    let I = Ov(pe.location, ae, he);
    T = L();
    let $ = tE(I, T), G = pe.createHref(I);
    f.replaceState($, "", G), R && D && D({
      action: k,
      location: pe.location,
      delta: 0
    });
  }
  function Q(ae) {
    let he = y.location.origin !== "null" ? y.location.origin : y.location.href, I = typeof ae == "string" ? ae : Xu(ae);
    return I = I.replace(/ $/, "%20"), ht(he, "No window.location.(origin|href) available to create URL for href: " + I), new URL(I, he);
  }
  let pe = {
    get action() {
      return k;
    },
    get location() {
      return o(y, f);
    },
    listen(ae) {
      if (D)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(eE, E), D = ae, () => {
        y.removeEventListener(eE, E), D = null;
      };
    },
    createHref(ae) {
      return p(y, ae);
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
    push: j,
    replace: V,
    go(ae) {
      return f.go(ae);
    }
  };
  return pe;
}
var nE;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(nE || (nE = {}));
function ew(o, p, v) {
  return v === void 0 && (v = "/"), tw(o, p, v);
}
function tw(o, p, v, g) {
  let y = typeof p == "string" ? eo(p) : p, R = ui(y.pathname || "/", v);
  if (R == null)
    return null;
  let f = gE(o);
  nw(f);
  let k = null;
  for (let D = 0; k == null && D < f.length; ++D) {
    let T = pw(R);
    k = fw(f[D], T);
  }
  return k;
}
function gE(o, p, v, g) {
  p === void 0 && (p = []), v === void 0 && (v = []), g === void 0 && (g = "");
  let y = (R, f, k) => {
    let D = {
      relativePath: k === void 0 ? R.path || "" : k,
      caseSensitive: R.caseSensitive === !0,
      childrenIndex: f,
      route: R
    };
    D.relativePath.startsWith("/") && (ht(D.relativePath.startsWith(g), 'Absolute route path "' + D.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), D.relativePath = D.relativePath.slice(g.length));
    let T = wr([g, D.relativePath]), L = v.concat(D);
    R.children && R.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      R.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), gE(R.children, p, L, T)), !(R.path == null && !R.index) && p.push({
      path: T,
      score: sw(T, R.index),
      routesMeta: L
    });
  };
  return o.forEach((R, f) => {
    var k;
    if (R.path === "" || !((k = R.path) != null && k.includes("?")))
      y(R, f);
    else
      for (let D of bE(R.path))
        y(R, f, D);
  }), p;
}
function bE(o) {
  let p = o.split("/");
  if (p.length === 0) return [];
  let [v, ...g] = p, y = v.endsWith("?"), R = v.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [R, ""] : [R];
  let f = bE(g.join("/")), k = [];
  return k.push(...f.map((D) => D === "" ? R : [R, D].join("/"))), y && k.push(...f), k.map((D) => o.startsWith("/") && D === "" ? "/" : D);
}
function nw(o) {
  o.sort((p, v) => p.score !== v.score ? v.score - p.score : cw(p.routesMeta.map((g) => g.childrenIndex), v.routesMeta.map((g) => g.childrenIndex)));
}
const aw = /^:[\w-]+$/, rw = 3, iw = 2, lw = 1, ow = 10, uw = -2, aE = (o) => o === "*";
function sw(o, p) {
  let v = o.split("/"), g = v.length;
  return v.some(aE) && (g += uw), p && (g += iw), v.filter((y) => !aE(y)).reduce((y, R) => y + (aw.test(R) ? rw : R === "" ? lw : ow), g);
}
function cw(o, p) {
  return o.length === p.length && o.slice(0, -1).every((g, y) => g === p[y]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    o[o.length - 1] - p[p.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function fw(o, p, v) {
  let {
    routesMeta: g
  } = o, y = {}, R = "/", f = [];
  for (let k = 0; k < g.length; ++k) {
    let D = g[k], T = k === g.length - 1, L = R === "/" ? p : p.slice(R.length) || "/", E = Lv({
      path: D.relativePath,
      caseSensitive: D.caseSensitive,
      end: T
    }, L), j = D.route;
    if (!E)
      return null;
    Object.assign(y, E.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: wr([R, E.pathname]),
      pathnameBase: yw(wr([R, E.pathnameBase])),
      route: j
    }), E.pathnameBase !== "/" && (R = wr([R, E.pathnameBase]));
  }
  return f;
}
function Lv(o, p) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [v, g] = dw(o.path, o.caseSensitive, o.end), y = p.match(v);
  if (!y) return null;
  let R = y[0], f = R.replace(/(.)\/+$/, "$1"), k = y.slice(1);
  return {
    params: g.reduce((T, L, E) => {
      let {
        paramName: j,
        isOptional: V
      } = L;
      if (j === "*") {
        let pe = k[E] || "";
        f = R.slice(0, R.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const Q = k[E];
      return V && !Q ? T[j] = void 0 : T[j] = (Q || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: R,
    pathnameBase: f,
    pattern: o
  };
}
function dw(o, p, v) {
  p === void 0 && (p = !1), v === void 0 && (v = !0), ka(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, k, D) => (g.push({
    paramName: k,
    isOptional: D != null
  }), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : v ? y += "\\/*$" : o !== "" && o !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, p ? void 0 : "i"), g];
}
function pw(o) {
  try {
    return o.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return ka(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), o;
  }
}
function ui(o, p) {
  if (p === "/") return o;
  if (!o.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let v = p.endsWith("/") ? p.length - 1 : p.length, g = o.charAt(v);
  return g && g !== "/" ? null : o.slice(v) || "/";
}
function mw(o, p) {
  p === void 0 && (p = "/");
  let {
    pathname: v,
    search: g = "",
    hash: y = ""
  } = typeof o == "string" ? eo(o) : o;
  return {
    pathname: v ? v.startsWith("/") ? v : vw(v, p) : p,
    search: gw(g),
    hash: bw(y)
  };
}
function vw(o, p) {
  let v = p.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? v.length > 1 && v.pop() : y !== "." && v.push(y);
  }), v.length > 1 ? v.join("/") : "/";
}
function jv(o, p, v, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + v + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function hw(o) {
  return o.filter((p, v) => v === 0 || p.route.path && p.route.path.length > 0);
}
function kv(o, p) {
  let v = hw(o);
  return p ? v.map((g, y) => y === v.length - 1 ? g.pathname : g.pathnameBase) : v.map((g) => g.pathnameBase);
}
function Uv(o, p, v, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = eo(o) : (y = Ku({}, o), ht(!y.pathname || !y.pathname.includes("?"), jv("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), jv("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), jv("#", "search", "hash", y)));
  let R = o === "" || y.pathname === "", f = R ? "/" : y.pathname, k;
  if (f == null)
    k = v;
  else {
    let E = p.length - 1;
    if (!g && f.startsWith("..")) {
      let j = f.split("/");
      for (; j[0] === ".."; )
        j.shift(), E -= 1;
      y.pathname = j.join("/");
    }
    k = E >= 0 ? p[E] : "/";
  }
  let D = mw(y, k), T = f && f !== "/" && f.endsWith("/"), L = (R || f === ".") && v.endsWith("/");
  return !D.pathname.endsWith("/") && (T || L) && (D.pathname += "/"), D;
}
const wr = (o) => o.join("/").replace(/\/\/+/g, "/"), yw = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), gw = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, bw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Nw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const NE = ["post", "put", "patch", "delete"];
new Set(NE);
const Ew = ["get", ...NE];
new Set(Ew);
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
function Ju() {
  return Ju = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (o[g] = v[g]);
    }
    return o;
  }, Ju.apply(this, arguments);
}
const es = /* @__PURE__ */ C.createContext(null);
es.displayName = "DataRouter";
const Fv = /* @__PURE__ */ C.createContext(null);
Fv.displayName = "DataRouterState";
const Sw = /* @__PURE__ */ C.createContext(null);
Sw.displayName = "Await";
const ma = /* @__PURE__ */ C.createContext(null);
ma.displayName = "Navigation";
const ts = /* @__PURE__ */ C.createContext(null);
ts.displayName = "Location";
const Ua = /* @__PURE__ */ C.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ua.displayName = "Route";
const zv = /* @__PURE__ */ C.createContext(null);
zv.displayName = "RouteError";
function xw(o, p) {
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
    basename: g,
    navigator: y
  } = C.useContext(ma), {
    hash: R,
    pathname: f,
    search: k
  } = ns(o, {
    relative: v
  }), D = f;
  return g !== "/" && (D = f === "/" ? g : wr([g, f])), y.createHref({
    pathname: D,
    search: k,
    hash: R
  });
}
function to() {
  return C.useContext(ts) != null;
}
function Qi() {
  return to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C.useContext(ts).location;
}
const EE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function SE(o) {
  C.useContext(ma).static || C.useLayoutEffect(o);
}
function Hv() {
  let {
    isDataRoute: o
  } = C.useContext(Ua);
  return o ? Fw() : Rw();
}
function Rw() {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = C.useContext(es), {
    basename: p,
    future: v,
    navigator: g
  } = C.useContext(ma), {
    matches: y
  } = C.useContext(Ua), {
    pathname: R
  } = Qi(), f = JSON.stringify(kv(y, v.v7_relativeSplatPath)), k = C.useRef(!1);
  return SE(() => {
    k.current = !0;
  }), C.useCallback(function(T, L) {
    if (L === void 0 && (L = {}), ka(k.current, EE), !k.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let E = Uv(T, JSON.parse(f), R, L.relative === "path");
    o == null && p !== "/" && (E.pathname = E.pathname === "/" ? p : wr([p, E.pathname])), (L.replace ? g.replace : g.push)(E, L.state, L);
  }, [p, g, f, R, o]);
}
function Cw() {
  let {
    matches: o
  } = C.useContext(Ua), p = o[o.length - 1];
  return p ? p.params : {};
}
function ns(o, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    future: g
  } = C.useContext(ma), {
    matches: y
  } = C.useContext(Ua), {
    pathname: R
  } = Qi(), f = JSON.stringify(kv(y, g.v7_relativeSplatPath));
  return C.useMemo(() => Uv(o, JSON.parse(f), R, v === "path"), [o, f, R, v]);
}
function Dw(o, p) {
  return Tw(o, p);
}
function Tw(o, p, v, g) {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = C.useContext(ma), {
    matches: R
  } = C.useContext(Ua), f = R[R.length - 1], k = f ? f.params : {}, D = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", L = f && f.route;
  {
    let I = L && L.path || "";
    RE(D, !L || I.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + D + '" (under <Route path="' + I + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + I + '"> to <Route ') + ('path="' + (I === "/" ? "*" : I + "/*") + '">.'));
  }
  let E = Qi(), j;
  if (p) {
    var V;
    let I = typeof p == "string" ? eo(p) : p;
    T === "/" || (V = I.pathname) != null && V.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + I.pathname + '" was given in the `location` prop.')), j = I;
  } else
    j = E;
  let Q = j.pathname || "/", pe = Q;
  if (T !== "/") {
    let I = T.replace(/^\//, "").split("/");
    pe = "/" + Q.replace(/^\//, "").split("/").slice(I.length).join("/");
  }
  let ae = ew(o, {
    pathname: pe
  });
  ka(L || ae != null, 'No routes matched location "' + j.pathname + j.search + j.hash + '" '), ka(ae == null || ae[ae.length - 1].route.element !== void 0 || ae[ae.length - 1].route.Component !== void 0 || ae[ae.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + j.pathname + j.search + j.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let he = Lw(ae && ae.map((I) => Object.assign({}, I, {
    params: Object.assign({}, k, I.params),
    pathname: wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(I.pathname).pathname : I.pathname
    ]),
    pathnameBase: I.pathnameBase === "/" ? T : wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(I.pathnameBase).pathname : I.pathnameBase
    ])
  })), R, v, g);
  return p && he ? /* @__PURE__ */ C.createElement(ts.Provider, {
    value: {
      location: Ju({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, j),
      navigationType: li.Pop
    }
  }, he) : he;
}
function jw() {
  let o = Uw(), p = Nw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), v = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, R = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), f = /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ C.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ C.createElement("code", {
    style: R
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ C.createElement("code", {
    style: R
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ C.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), v ? /* @__PURE__ */ C.createElement("pre", {
    style: y
  }, v) : null, f);
}
const ww = /* @__PURE__ */ C.createElement(jw, null);
class _w extends C.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ C.createElement(Ua.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ C.createElement(zv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Ow(o) {
  let {
    routeContext: p,
    match: v,
    children: g
  } = o, y = C.useContext(es);
  return y && y.static && y.staticContext && (v.route.errorElement || v.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = v.route.id), /* @__PURE__ */ C.createElement(Ua.Provider, {
    value: p
  }, g);
}
function Lw(o, p, v, g) {
  var y;
  if (p === void 0 && (p = []), v === void 0 && (v = null), g === void 0 && (g = null), o == null) {
    var R;
    if (!v)
      return null;
    if (v.errors)
      o = v.matches;
    else if ((R = g) != null && R.v7_partialHydration && p.length === 0 && !v.initialized && v.matches.length > 0)
      o = v.matches;
    else
      return null;
  }
  let f = o, k = (y = v) == null ? void 0 : y.errors;
  if (k != null) {
    let L = f.findIndex((E) => E.route.id && (k == null ? void 0 : k[E.route.id]) !== void 0);
    L >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(k).join(",")), f = f.slice(0, Math.min(f.length, L + 1));
  }
  let D = !1, T = -1;
  if (v && g && g.v7_partialHydration)
    for (let L = 0; L < f.length; L++) {
      let E = f[L];
      if ((E.route.HydrateFallback || E.route.hydrateFallbackElement) && (T = L), E.route.id) {
        let {
          loaderData: j,
          errors: V
        } = v, Q = E.route.loader && j[E.route.id] === void 0 && (!V || V[E.route.id] === void 0);
        if (E.route.lazy || Q) {
          D = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((L, E, j) => {
    let V, Q = !1, pe = null, ae = null;
    v && (V = k && E.route.id ? k[E.route.id] : void 0, pe = E.route.errorElement || ww, D && (T < 0 && j === 0 ? (RE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), Q = !0, ae = null) : T === j && (Q = !0, ae = E.route.hydrateFallbackElement || null)));
    let he = p.concat(f.slice(0, j + 1)), I = () => {
      let $;
      return V ? $ = pe : Q ? $ = ae : E.route.Component ? $ = /* @__PURE__ */ C.createElement(E.route.Component, null) : E.route.element ? $ = E.route.element : $ = L, /* @__PURE__ */ C.createElement(Ow, {
        match: E,
        routeContext: {
          outlet: L,
          matches: he,
          isDataRoute: v != null
        },
        children: $
      });
    };
    return v && (E.route.ErrorBoundary || E.route.errorElement || j === 0) ? /* @__PURE__ */ C.createElement(_w, {
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
var xE = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(xE || {}), Zu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(Zu || {});
function Pv(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Mw(o) {
  let p = C.useContext(es);
  return p || ht(!1, Pv(o)), p;
}
function Aw(o) {
  let p = C.useContext(Fv);
  return p || ht(!1, Pv(o)), p;
}
function Vw(o) {
  let p = C.useContext(Ua);
  return p || ht(!1, Pv(o)), p;
}
function Bv(o) {
  let p = Vw(o), v = p.matches[p.matches.length - 1];
  return v.route.id || ht(!1, o + ' can only be used on routes that contain a unique "id"'), v.route.id;
}
function kw() {
  return Bv(Zu.UseRouteId);
}
function Uw() {
  var o;
  let p = C.useContext(zv), v = Aw(Zu.UseRouteError), g = Bv(Zu.UseRouteError);
  return p !== void 0 ? p : (o = v.errors) == null ? void 0 : o[g];
}
function Fw() {
  let {
    router: o
  } = Mw(xE.UseNavigateStable), p = Bv(Zu.UseNavigateStable), v = C.useRef(!1);
  return SE(() => {
    v.current = !0;
  }), C.useCallback(function(y, R) {
    R === void 0 && (R = {}), ka(v.current, EE), v.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, Ju({
      fromRouteId: p
    }, R)));
  }, [o, p]);
}
const rE = {};
function RE(o, p, v) {
  !p && !rE[o] && (rE[o] = !0, ka(!1, v));
}
const iE = {};
function zw(o, p) {
  iE[p] || (iE[p] = !0, console.warn(p));
}
const lE = (o, p, v) => zw(o, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + v + "."));
function Hw(o, p) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && lE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && lE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Pw(o) {
  let {
    to: p,
    replace: v,
    state: g,
    relative: y
  } = o;
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: R,
    static: f
  } = C.useContext(ma);
  ka(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: k
  } = C.useContext(Ua), {
    pathname: D
  } = Qi(), T = Hv(), L = Uv(p, kv(k, R.v7_relativeSplatPath), D, y === "path"), E = JSON.stringify(L);
  return C.useEffect(() => T(JSON.parse(E), {
    replace: v,
    state: g,
    relative: y
  }), [T, E, y, v, g]), null;
}
function jr(o) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Bw(o) {
  let {
    basename: p = "/",
    children: v = null,
    location: g,
    navigationType: y = li.Pop,
    navigator: R,
    static: f = !1,
    future: k
  } = o;
  to() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let D = p.replace(/^\/*/, "/"), T = C.useMemo(() => ({
    basename: D,
    navigator: R,
    static: f,
    future: Ju({
      v7_relativeSplatPath: !1
    }, k)
  }), [D, k, R, f]);
  typeof g == "string" && (g = eo(g));
  let {
    pathname: L = "/",
    search: E = "",
    hash: j = "",
    state: V = null,
    key: Q = "default"
  } = g, pe = C.useMemo(() => {
    let ae = ui(L, D);
    return ae == null ? null : {
      location: {
        pathname: ae,
        search: E,
        hash: j,
        state: V,
        key: Q
      },
      navigationType: y
    };
  }, [D, L, E, j, V, Q, y]);
  return ka(pe != null, '<Router basename="' + D + '"> is not able to match the URL ' + ('"' + L + E + j + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ C.createElement(ma.Provider, {
    value: T
  }, /* @__PURE__ */ C.createElement(ts.Provider, {
    children: v,
    value: pe
  }));
}
function $w(o) {
  let {
    children: p,
    location: v
  } = o;
  return Dw(Mv(p), v);
}
new Promise(() => {
});
function Mv(o, p) {
  p === void 0 && (p = []);
  let v = [];
  return C.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ C.isValidElement(g))
      return;
    let R = [...p, y];
    if (g.type === C.Fragment) {
      v.push.apply(v, Mv(g.props.children, R));
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
    g.props.children && (f.children = Mv(g.props.children, R)), v.push(f);
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
  return Zl = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (o[g] = v[g]);
    }
    return o;
  }, Zl.apply(this, arguments);
}
function $v(o, p) {
  if (o == null) return {};
  var v = {}, g = Object.keys(o), y, R;
  for (R = 0; R < g.length; R++)
    y = g[R], !(p.indexOf(y) >= 0) && (v[y] = o[y]);
  return v;
}
const vf = "get", hf = "application/x-www-form-urlencoded";
function bf(o) {
  return o != null && typeof o.tagName == "string";
}
function Yw(o) {
  return bf(o) && o.tagName.toLowerCase() === "button";
}
function Iw(o) {
  return bf(o) && o.tagName.toLowerCase() === "form";
}
function qw(o) {
  return bf(o) && o.tagName.toLowerCase() === "input";
}
function Gw(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function Ww(o, p) {
  return o.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !Gw(o);
}
let mf = null;
function Qw() {
  if (mf === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), mf = !1;
    } catch {
      mf = !0;
    }
  return mf;
}
const Kw = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function wv(o) {
  return o != null && !Kw.has(o) ? (ka(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + hf + '"')), null) : o;
}
function Xw(o, p) {
  let v, g, y, R, f;
  if (Iw(o)) {
    let k = o.getAttribute("action");
    g = k ? ui(k, p) : null, v = o.getAttribute("method") || vf, y = wv(o.getAttribute("enctype")) || hf, R = new FormData(o);
  } else if (Yw(o) || qw(o) && (o.type === "submit" || o.type === "image")) {
    let k = o.form;
    if (k == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let D = o.getAttribute("formaction") || k.getAttribute("action");
    if (g = D ? ui(D, p) : null, v = o.getAttribute("formmethod") || k.getAttribute("method") || vf, y = wv(o.getAttribute("formenctype")) || wv(k.getAttribute("enctype")) || hf, R = new FormData(k, o), !Qw()) {
      let {
        name: T,
        type: L,
        value: E
      } = o;
      if (L === "image") {
        let j = T ? T + "." : "";
        R.append(j + "x", "0"), R.append(j + "y", "0");
      } else T && R.append(T, E);
    }
  } else {
    if (bf(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    v = vf, g = null, y = hf, f = o;
  }
  return R && y === "text/plain" && (f = R, R = void 0), {
    action: g,
    method: v.toLowerCase(),
    encType: y,
    formData: R,
    body: f
  };
}
const Jw = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Zw = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], e_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], t_ = "6";
try {
  window.__reactRouterVersion = t_;
} catch {
}
const CE = /* @__PURE__ */ C.createContext({
  isTransitioning: !1
});
CE.displayName = "ViewTransition";
const n_ = /* @__PURE__ */ C.createContext(/* @__PURE__ */ new Map());
n_.displayName = "Fetchers";
const a_ = "startTransition", oE = W1[a_];
function r_(o) {
  let {
    basename: p,
    children: v,
    future: g,
    window: y
  } = o, R = C.useRef();
  R.current == null && (R.current = X1({
    window: y,
    v5Compat: !0
  }));
  let f = R.current, [k, D] = C.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, L = C.useCallback((E) => {
    T && oE ? oE(() => D(E)) : D(E);
  }, [D, T]);
  return C.useLayoutEffect(() => f.listen(L), [f, L]), C.useEffect(() => Hw(g), [g]), /* @__PURE__ */ C.createElement(Bw, {
    basename: p,
    children: v,
    location: k.location,
    navigationType: k.action,
    navigator: f,
    future: g
  });
}
const i_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", l_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ C.forwardRef(function(p, v) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: R,
    replace: f,
    state: k,
    target: D,
    to: T,
    preventScrollReset: L,
    viewTransition: E
  } = p, j = $v(p, Jw), {
    basename: V
  } = C.useContext(ma), Q, pe = !1;
  if (typeof T == "string" && l_.test(T) && (Q = T, i_))
    try {
      let $ = new URL(window.location.href), G = T.startsWith("//") ? new URL($.protocol + T) : new URL(T), P = ui(G.pathname, V);
      G.origin === $.origin && P != null ? T = P + G.search + G.hash : pe = !0;
    } catch {
      ka(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ae = xw(T, {
    relative: y
  }), he = c_(T, {
    replace: f,
    state: k,
    target: D,
    preventScrollReset: L,
    relative: y,
    viewTransition: E
  });
  function I($) {
    g && g($), $.defaultPrevented || he($);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ C.createElement("a", Zl({}, j, {
      href: Q || ae,
      onClick: pe || R ? g : I,
      ref: v,
      target: D
    }))
  );
});
ii.displayName = "Link";
const o_ = /* @__PURE__ */ C.forwardRef(function(p, v) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: R = "",
    end: f = !1,
    style: k,
    to: D,
    viewTransition: T,
    children: L
  } = p, E = $v(p, Zw), j = ns(D, {
    relative: E.relative
  }), V = Qi(), Q = C.useContext(Fv), {
    navigator: pe,
    basename: ae
  } = C.useContext(ma), he = Q != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  h_(j) && T === !0, I = pe.encodeLocation ? pe.encodeLocation(j).pathname : j.pathname, $ = V.pathname, G = Q && Q.navigation && Q.navigation.location ? Q.navigation.location.pathname : null;
  y || ($ = $.toLowerCase(), G = G ? G.toLowerCase() : null, I = I.toLowerCase()), G && ae && (G = ui(G, ae) || G);
  const P = I !== "/" && I.endsWith("/") ? I.length - 1 : I.length;
  let ge = $ === I || !f && $.startsWith(I) && $.charAt(P) === "/", ce = G != null && (G === I || !f && G.startsWith(I) && G.charAt(I.length) === "/"), X = {
    isActive: ge,
    isPending: ce,
    isTransitioning: he
  }, ie = ge ? g : void 0, J;
  typeof R == "function" ? J = R(X) : J = [R, ge ? "active" : null, ce ? "pending" : null, he ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof k == "function" ? k(X) : k;
  return /* @__PURE__ */ C.createElement(ii, Zl({}, E, {
    "aria-current": ie,
    className: J,
    ref: v,
    style: U,
    to: D,
    viewTransition: T
  }), typeof L == "function" ? L(X) : L);
});
o_.displayName = "NavLink";
const u_ = /* @__PURE__ */ C.forwardRef((o, p) => {
  let {
    fetcherKey: v,
    navigate: g,
    reloadDocument: y,
    replace: R,
    state: f,
    method: k = vf,
    action: D,
    onSubmit: T,
    relative: L,
    preventScrollReset: E,
    viewTransition: j
  } = o, V = $v(o, e_), Q = m_(), pe = v_(D, {
    relative: L
  }), ae = k.toLowerCase() === "get" ? "get" : "post", he = (I) => {
    if (T && T(I), I.defaultPrevented) return;
    I.preventDefault();
    let $ = I.nativeEvent.submitter, G = ($ == null ? void 0 : $.getAttribute("formmethod")) || k;
    Q($ || I.currentTarget, {
      fetcherKey: v,
      method: G,
      navigate: g,
      replace: R,
      state: f,
      relative: L,
      preventScrollReset: E,
      viewTransition: j
    });
  };
  return /* @__PURE__ */ C.createElement("form", Zl({
    ref: p,
    method: ae,
    action: pe,
    onSubmit: y ? T : he
  }, V));
});
u_.displayName = "Form";
var gf;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(gf || (gf = {}));
var uE;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(uE || (uE = {}));
function s_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function DE(o) {
  let p = C.useContext(es);
  return p || ht(!1, s_(o)), p;
}
function c_(o, p) {
  let {
    target: v,
    replace: g,
    state: y,
    preventScrollReset: R,
    relative: f,
    viewTransition: k
  } = p === void 0 ? {} : p, D = Hv(), T = Qi(), L = ns(o, {
    relative: f
  });
  return C.useCallback((E) => {
    if (Ww(E, v)) {
      E.preventDefault();
      let j = g !== void 0 ? g : Xu(T) === Xu(L);
      D(o, {
        replace: j,
        state: y,
        preventScrollReset: R,
        relative: f,
        viewTransition: k
      });
    }
  }, [T, D, L, g, y, v, o, R, f, k]);
}
function f_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let d_ = 0, p_ = () => "__" + String(++d_) + "__";
function m_() {
  let {
    router: o
  } = DE(gf.UseSubmit), {
    basename: p
  } = C.useContext(ma), v = kw();
  return C.useCallback(function(g, y) {
    y === void 0 && (y = {}), f_();
    let {
      action: R,
      method: f,
      encType: k,
      formData: D,
      body: T
    } = Xw(g, p);
    if (y.navigate === !1) {
      let L = y.fetcherKey || p_();
      o.fetch(L, v, y.action || R, {
        preventScrollReset: y.preventScrollReset,
        formData: D,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || k,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || R, {
        preventScrollReset: y.preventScrollReset,
        formData: D,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || k,
        replace: y.replace,
        state: y.state,
        fromRouteId: v,
        flushSync: y.flushSync,
        viewTransition: y.viewTransition
      });
  }, [o, p, v]);
}
function v_(o, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    basename: g
  } = C.useContext(ma), y = C.useContext(Ua);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [R] = y.matches.slice(-1), f = Zl({}, ns(o || ".", {
    relative: v
  })), k = Qi();
  if (o == null) {
    f.search = k.search;
    let D = new URLSearchParams(f.search), T = D.getAll("index");
    if (T.some((E) => E === "")) {
      D.delete("index"), T.filter((j) => j).forEach((j) => D.append("index", j));
      let E = D.toString();
      f.search = E ? "?" + E : "";
    }
  }
  return (!o || o === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : wr([g, f.pathname])), Xu(f);
}
function h_(o, p) {
  p === void 0 && (p = {});
  let v = C.useContext(CE);
  v == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = DE(gf.useViewTransitionState), y = ns(o, {
    relative: p.relative
  });
  if (!v.isTransitioning)
    return !1;
  let R = ui(v.currentLocation.pathname, g) || v.currentLocation.pathname, f = ui(v.nextLocation.pathname, g) || v.nextLocation.pathname;
  return Lv(y.pathname, f) != null || Lv(y.pathname, R) != null;
}
function y_() {
  const [o, p] = C.useState(null), [v, g] = C.useState(""), [y, R] = C.useState(""), [f, k] = C.useState(!0), [D, T] = C.useState(""), [L, E] = C.useState(""), [j, V] = C.useState(!1), [Q, pe] = C.useState(!1);
  C.useEffect(() => {
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
    const G = ($ == null ? void 0 : $.code) || "", P = ($ == null ? void 0 : $.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || P.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : P || "Something went wrong.";
  }
  async function he($) {
    $.preventDefault(), T(""), E(""), V(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), P = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ge, setPersistence: ce, browserLocalPersistence: X, browserSessionPersistence: ie, signInWithEmailAndPassword: J } = P, U = ge();
      await ce(U, f ? X : ie);
      const oe = await (await J(U, v.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: oe }) })).ok) throw new Error("Session creation failed");
      E("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (G) {
      T(ae(G));
    } finally {
      V(!1);
    }
  }
  async function I() {
    T(""), E("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: G, sendPasswordResetEmail: P } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ge = G();
      await P(ge, v.trim()), E("If an account exists for that email, a reset link has been sent.");
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
      L && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: L }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: he, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: v, onChange: ($) => g($.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: Q ? "text" : "password", value: y, onChange: ($) => R($.target.value), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: j, type: "submit", children: j ? "Signing in…" : "Sign in" }, void 0, !1, {
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
function g_() {
  const [o, p] = C.useState(null), [v, g] = C.useState(""), [y, R] = C.useState(""), [f, k] = C.useState(""), [D, T] = C.useState(""), [L, E] = C.useState(""), [j, V] = C.useState(""), [Q, pe] = C.useState(""), [ae, he] = C.useState(!1), [I, $] = C.useState(!1), [G, P] = C.useState(!1), [ge, ce] = C.useState(!1);
  C.useEffect(() => {
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
      const U = String(v).trim(), ve = String(y).trim(), oe = ve.replace(/\D+/g, ""), Te = { fn: !U, cn: !ve };
      if (P(Te.fn), ce(Te.cn || oe.length < 7), Te.fn || Te.cn) {
        V("Please fill in required fields");
        return;
      }
      if (oe.length < 7) {
        V("Please enter a valid mobile number");
        return;
      }
      if (D !== L) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const je = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Le, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Je = Le(), Xt = await (await ye(Je, f.trim(), D)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Xt, profile: { fullName: U, contactNumber: ve } }) })).ok) throw new Error("Session creation failed");
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
    j && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: j }, void 0, !1, {
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
          g(J.target.value), G && P(!String(J.target.value).trim());
        }, onBlur: () => P(!String(v).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (ge ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (J) => {
          if (R(J.target.value), ge) {
            const U = String(J.target.value).trim().replace(/\D+/g, "");
            ce(!(U.length >= 7));
          }
        }, onBlur: () => {
          const J = String(y).trim().replace(/\D+/g, "");
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: L, onChange: (J) => E(J.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
function b_() {
  const [o, p] = C.useState([]);
  return C.useEffect(() => {
    const v = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (v.length) {
      const g = v.map((y) => ({
        id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
        message: String(y.message || ""),
        type: y.opts && y.opts.type || "success",
        ttl: y.opts && typeof y.opts.ttl == "number" ? y.opts.ttl : 4e3
      }));
      p((y) => [...g, ...y]);
      try {
        delete window.__pendingToasts;
      } catch {
        window.__pendingToasts = [];
      }
    }
    return window.showToast = function(g, y = {}) {
      const R = String(Date.now()) + Math.random().toString(36).slice(2, 8), f = { id: R, message: String(g || ""), type: y.type || "success", ttl: typeof y.ttl == "number" ? y.ttl : 4e3 };
      return p((k) => [f, ...k]), R;
    }, window.hideToast = function(g) {
      p((y) => y.filter((R) => R.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), C.useEffect(() => {
    if (!o.length) return;
    const v = o.map((g) => setTimeout(() => {
      p((y) => y.filter((R) => R.id !== g.id));
    }, g.ttl));
    return () => {
      v.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ d.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((v) => /* @__PURE__ */ d.jsxDEV("div", { className: `toast ${v.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ d.jsxDEV("div", { className: "toast-message", children: v.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ d.jsxDEV("button", { className: "toast-close", onClick: () => p((g) => g.filter((y) => y.id !== v.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
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
function oi({ children: o }) {
  C.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(v, g) {
      return window.__pendingToasts.push({ message: v, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(v) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== v));
      } catch {
      }
    }));
  }, []);
  const p = Hv();
  return C.useEffect(() => {
    const v = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(E, j, V) {
      E && (E.classList.toggle("hidden", !V), E.setAttribute("aria-hidden", V ? "false" : "true"), j && j.setAttribute("aria-expanded", V ? "true" : "false"));
    }
    function k() {
      f(g, v, !1), f(R, y, !1);
    }
    function D(E) {
      const j = (V) => V && (V === E.target || V.contains(E.target));
      !j(g) && !j(v) && !j(R) && !j(y) && k();
    }
    function T(E) {
      E.key === "Escape" && k();
    }
    function L(E) {
      E && E.querySelectorAll(".dropdown-item").forEach((j) => {
        j.addEventListener("click", () => k());
      });
    }
    return v && g && (v.addEventListener("click", (E) => {
      E.stopPropagation(), f(R, y, !1), f(g, v, g.classList.contains("hidden"));
    }), L(g)), y && R && (y.addEventListener("click", (E) => {
      E.stopPropagation(), f(g, v, !1), f(R, y, R.classList.contains("hidden"));
    }), L(R)), document.addEventListener("click", D), document.addEventListener("keydown", T), () => {
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
    /* @__PURE__ */ d.jsxDEV("main", { className: "content", children: o }, void 0, !1, {
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
    /* @__PURE__ */ d.jsxDEV(b_, {}, void 0, !1, {
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
function N_({ onClose: o, onCreated: p }) {
  const [v, g] = C.useState(""), [y, R] = C.useState(""), [f, k] = C.useState(""), [D, T] = C.useState(""), [L, E] = C.useState(!1), [j, V] = C.useState(""), [Q, pe] = C.useState(""), [ae, he] = C.useState(!1), [I, $] = C.useState(!1), [G, P] = C.useState(!1), [ge, ce] = C.useState(!1);
  async function X() {
    V(""), pe(""), ce(!0);
    const ie = String(v).trim(), J = String(y), U = String(f).trim(), ve = String(D).trim(), oe = ve.replace(/\D+/g, ""), Te = { fn: !U, cn: !ve, pw: !J };
    if (he(Te.fn), $(Te.cn || oe.length < 7), P(Te.pw), Te.fn || Te.cn || Te.pw) {
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
      P(!0), V("Password must be at least 6 characters");
      return;
    }
    E(!0);
    try {
      const je = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ie, password: J, fullName: U, contactNumber: ve })
      }), Le = await je.json().catch(() => null);
      if (!je.ok) {
        const ye = String(Le && (Le.error || Le.message) || ""), Je = ye.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ye) || /MISSING\s*EMAIL\/PASSWORD/i.test(ye))
          V("Full name, mobile and password are required"), he(!U), $(!ve || oe.length < 7), P(!J);
        else if (Je.includes("EMAIL_EXISTS"))
          V("An account with this email already exists. Use a different email or leave email blank.");
        else if (Je.includes("INVALID_EMAIL"))
          V("Please enter a valid email");
        else if (Je.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ye))
          P(!0), V("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ye))
          $(!0), V("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ye))
          V("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ye || "Failed to create rider");
        return;
      }
      pe("Rider created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (je) {
      const Le = String((je == null ? void 0 : je.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(Le) ? V("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(Le) ? V("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(Le) ? V("Please enter a valid email") : /WEAK_PASSWORD/i.test(Le) || /AT LEAST 6 CHARACTERS/i.test(Le) ? (P(!0), V("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(Le) ? ($(!0), V("Please enter a valid mobile number")) : V(Le || "Failed to create rider");
    } finally {
      E(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ d.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
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
          g(ie.target.value);
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (ie) => {
          R(ie.target.value), ge && P(!String(ie.target.value));
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
      j && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: j }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: L, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: L, children: L ? "Creating…" : "Create" }, void 0, !1, {
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
function E_() {
  const [o, p] = C.useState([]), [v, g] = C.useState(""), [y, R] = C.useState("all"), [f, k] = C.useState("all"), [D, T] = C.useState("all"), [L, E] = C.useState(!0), [j, V] = C.useState(""), [Q, pe] = C.useState(1), [ae, he] = C.useState(20), [I, $] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [G, P] = C.useState(!1);
  C.useEffect(() => {
    let X = !0;
    return (async () => {
      var ie, J, U, ve;
      E(!0), V("");
      try {
        const oe = new URLSearchParams();
        v && oe.set("q", v), D !== "all" && oe.set("status", D), y !== "all" && oe.set("lastDays", y), oe.set("page", String(Q)), oe.set("limit", String(ae));
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
        X && E(!1);
      }
    })(), () => {
      X = !1;
    };
  }, [v, D, y, Q, ae]);
  const ge = C.useMemo(() => o.filter((X) => {
    if (v && !X.name.toLowerCase().includes(v.toLowerCase().trim()) || D !== "all" && X.status !== D || f !== "all" && String(X.id) !== String(f)) return !1;
    if (y !== "all") {
      const ie = parseInt(X.lastActiveDays, 10) || 9999, J = parseInt(y, 10);
      if (!(ie <= J)) return !1;
    }
    return !0;
  }), [o, v, D, f, y]), ce = C.useMemo(() => {
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => P(!0), children: "Create Rider" }, void 0, !1, {
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
          g(X.target.value), pe(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: y, onChange: (X) => {
          R(X.target.value), pe(1);
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
          o.map((X) => /* @__PURE__ */ d.jsxDEV("option", { value: X.id, children: X.name }, X.id, !1, {
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
      G && /* @__PURE__ */ d.jsxDEV(N_, { onClose: () => P(!1), onCreated: () => {
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
          L && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 127,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 127,
            columnNumber: 17
          }, this),
          !L && j && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "auth-error", children: j }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 17
          }, this),
          !L && !j && ge.map((X) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": X.id, "data-status": X.status, "data-last-days": X.lastActiveDays, children: [
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
              Number(X.totalKm || 0).toFixed(2),
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
          !L && !j && ge.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: I.page <= 1 || L, onClick: () => pe((X) => Math.max(1, X - 1)), children: "Prev" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: I.page >= I.pages || L, onClick: () => pe((X) => Math.min(I.pages, X + 1)), children: "Next" }, void 0, !1, {
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
function TE(o) {
  if (!o) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      return o.toDate();
    } catch {
      return null;
    }
  if (typeof o == "object" && o.seconds !== void 0) {
    const p = Number(o.seconds);
    if (Number.isFinite(p)) return new Date(p * 1e3);
  }
  if (typeof o == "number")
    return Number.isFinite(o) ? o > 1e12 ? new Date(o) : new Date(o * 1e3) : null;
  if (typeof o == "string") {
    const p = Date.parse(o);
    if (Number.isFinite(p)) return new Date(p);
  }
  return null;
}
function Av(o) {
  if (o && typeof o == "object" && !(o instanceof Date)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0) return Av(o.duration);
    if (o.value !== void 0) return Av(o.value);
  }
  if (typeof o == "number" && Number.isFinite(o) && Math.abs(o) < 1e6) return o;
  if (typeof o == "string") {
    const p = o.trim();
    if (!p) return null;
    const v = p.match(/^(-?\d+(?:\.\d+)?)\s*(min|mins|minutes)$/i);
    if (v) return parseFloat(v[1]);
    const g = p.match(/^(-?\d+(?:\.\d+)?)\s*(sec|secs|seconds)$/i);
    if (g) return parseFloat(g[1]) / 60;
    const y = Number(p);
    if (Number.isFinite(y) && Math.abs(y) < 1e6) return y;
  }
  return null;
}
function Qu(o) {
  if (o == null || o === "") return "-";
  if (o && typeof o == "object" && !(o instanceof Date)) {
    if (o.expectedAt) return Qu(o.expectedAt);
    if (o.at) return Qu(o.at);
    if (o.value !== void 0 && o.value !== o) return Qu(o.value);
  }
  const p = Av(o);
  if (p !== null)
    return `${Math.round(p)} mins`;
  const v = TE(o);
  if (!(v instanceof Date) || Number.isNaN(v.getTime()))
    return typeof o == "string" && o.trim() || "-";
  try {
    return v.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function S_() {
  var L;
  const { id: o } = Cw(), [p, v] = C.useState(null), [g, y] = C.useState(!0), [R, f] = C.useState("");
  if (C.useEffect(() => {
    let E = !0;
    return (async () => {
      y(!0), f("");
      try {
        const j = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (j.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!j.ok) throw new Error("Failed to load rider");
        const V = await j.json();
        E && v(V);
      } catch (j) {
        E && f(j.message || "Failed to load rider");
      } finally {
        E && y(!1);
      }
    })(), () => {
      E = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 82,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 82,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 82,
      columnNumber: 12
    }, this);
  if (R)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 85,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 85,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 85,
      columnNumber: 12
    }, this);
  if (!p)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 88,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 88,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 88,
      columnNumber: 12
    }, this);
  const { rider: k, metrics: D, history: T } = p;
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 97,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ d.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 103,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { children: [
        /* @__PURE__ */ d.jsxDEV("h3", { className: "rp-name", children: k.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 105,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          k.id
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 106,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 104,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 102,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 101,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: Array.isArray(k.orders) ? k.orders.length : 0 }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 113,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 113,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: [
          D.onTimeRate,
          "%"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 114,
          columnNumber: 66
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 114,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: [
          Number(k.totalKm || 0),
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 115,
          columnNumber: 71
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 115,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 112,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 123,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 124,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 125,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 126,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Distance (KM)" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 127,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 122,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 121,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        (p.riderOrders || []).map((E, j) => {
          var V;
          return /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: E.name || E.orderId }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 133,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: ((V = TE(E.created_at)) == null ? void 0 : V.toISOString().slice(0, 10)) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 134,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: Qu(E.expected_delivery_time) }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 135,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: Qu(E.actual_delivery_time) }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 136,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
              Number.isFinite(Number(E.distance_km)) ? Number(E.distance_km).toFixed(2) : E.distance_km || "-",
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 137,
              columnNumber: 19
            }, this)
          ] }, E.orderId || j, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 132,
            columnNumber: 17
          }, this);
        }),
        !((L = p.riderOrders) != null && L.length) && (T || []).map((E, j) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: E.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 142,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: E.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 143,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: [
            E.avgTime,
            " mins"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 144,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
            E.distanceKm,
            " km"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 145,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 146,
            columnNumber: 19
          }, this)
        ] }, `h-${j}`, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 141,
          columnNumber: 17
        }, this))
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 130,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 120,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 119,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 95,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 94,
    columnNumber: 5
  }, this);
}
function jE({ orderId: o, onClose: p, onAssigned: v }) {
  const [g, y] = C.useState([]), [R, f] = C.useState(!0), [k, D] = C.useState(""), [T, L] = C.useState(null);
  C.useEffect(() => {
    let j = !0;
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
        j && y(Array.isArray(Q.riders) ? Q.riders : Q.riders || []);
      } catch (V) {
        j && D(V.message || "Failed to load riders");
      } finally {
        j && f(!1);
      }
    })(), () => {
      j = !1;
    };
  }, []);
  async function E(j) {
    if (!(!o || !j)) {
      L(j);
      try {
        const V = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: j })
        });
        if (V.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const Q = await V.json().catch(() => null);
        if (!V.ok) throw new Error(Q && Q.error ? Q.error : "Assign failed");
        v && v({ orderId: o, riderId: j }), p();
      } catch (V) {
        alert(V.message || "Failed to assign rider");
      } finally {
        L(null);
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
      R && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 52,
        columnNumber: 23
      }, this),
      k && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: k }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 53,
        columnNumber: 21
      }, this),
      !R && !k && /* @__PURE__ */ d.jsxDEV("table", { className: "assign-table", children: [
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
          g.map((j) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { children: j.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 62,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: j.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 63,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-assign", onClick: () => E(j.id), disabled: T && T !== j.id, children: T === j.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 65,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 64,
              columnNumber: 21
            }, this)
          ] }, j.id, !0, {
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
function Vv(o) {
  if (typeof o != "string") return "";
  const p = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return p === "in_transit" ? "in_progress" : p;
}
function wE(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function sE(o) {
  return Vv(wE(o));
}
function _E(o) {
  if (!o) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      return o.toDate();
    } catch {
      return null;
    }
  if (typeof o == "object" && o.seconds !== void 0) {
    const p = Number(o.seconds);
    if (Number.isFinite(p)) {
      const v = p * 1e3;
      return new Date(v);
    }
  }
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return null;
    if (o > 1e12) return new Date(o);
    if (o > 1e9) return new Date(o * 1e3);
  }
  if (typeof o == "string") {
    const p = Date.parse(o);
    if (Number.isFinite(p)) return new Date(p);
  }
  return null;
}
function x_(o) {
  if (o == null) return "-";
  if (typeof o == "object" && o.minutes !== void 0) {
    const v = Number(o.minutes);
    if (Number.isFinite(v)) return `${v} min`;
  }
  const p = _E(o);
  if (p instanceof Date && !Number.isNaN(p.getTime()))
    try {
      return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
    }
  if (typeof o == "number") {
    const v = Number.isFinite(o) ? Math.round(o) : NaN;
    return Number.isNaN(v) ? "-" : `${v} min`;
  }
  if (typeof o == "string") {
    const v = o.trim();
    if (!v) return "-";
    const g = v.match(/^(\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : v;
  }
  return String(o);
}
function R_(o) {
  var g, y, R, f, k, D, T, L;
  if (!o || typeof o != "object") return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (R = o.orders) == null ? void 0 : R.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (k = o.delivery) == null ? void 0 : k.expected_delivery_time,
    (D = o.delivery) == null ? void 0 : D.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (L = o.expected_delivery) == null ? void 0 : L.minutes,
    o.expected_time,
    o.expectedTime
  ];
  for (const E of p)
    if (E != null) {
      if (typeof E == "string") {
        if (E.trim()) return E;
        continue;
      }
      if (typeof E == "object") {
        if (E.minutes !== void 0 || E.seconds !== void 0) return E;
        if (E.expectedMinutes !== void 0) return { minutes: E.expectedMinutes };
        if (E.expectedAt) return E.expectedAt;
        if (Object.values(E).find((Q) => Q != null) !== void 0) return E;
        continue;
      }
      return E;
    }
  const v = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(v))
    for (let E = v.length - 1; E >= 0; E -= 1) {
      const j = v[E];
      if (!j) continue;
      const V = typeof j.type == "string" ? j.type.toLowerCase().trim() : "";
      if (!(V !== "eta" && V !== "expected")) {
        if (j.expectedMinutes !== void 0 && j.expectedMinutes !== null) return { minutes: j.expectedMinutes };
        if (j.minutes !== void 0 && j.minutes !== null) return { minutes: j.minutes };
        if (j.expectedAt) return j.expectedAt;
      }
    }
  return null;
}
function C_(o) {
  const p = _E(o);
  if (!(p instanceof Date) || Number.isNaN(p.getTime())) return "-";
  try {
    return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function D_(o) {
  if (o == null) return "-";
  let p = null;
  if (typeof o == "number" && Number.isFinite(o))
    p = Math.round(o);
  else if (typeof o == "string") {
    const y = o.trim();
    if (!y) return "-";
    const R = y.match(/(\d+(?:\.\d+)?)/);
    if (R) p = Math.round(parseFloat(R[1]));
    else return y;
  } else
    return "-";
  if (!Number.isFinite(p)) return "-";
  if (p < 60) return `${p} min`;
  const v = Math.floor(p / 60), g = p % 60;
  return `${v}h ${g}m`;
}
const T_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], cE = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function j_() {
  const [o, p] = C.useState([]), [v, g] = C.useState(""), [y, R] = C.useState("all"), [f, k] = C.useState(1), [D, T] = C.useState(20), [L, E] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [j, V] = C.useState(!0), [Q, pe] = C.useState(""), [ae, he] = C.useState(""), [I, $] = C.useState(!0), [G, P] = C.useState(!1), [ge, ce] = C.useState(null);
  C.useEffect(() => {
    let U = !0;
    return (async () => {
      var ve, oe, Te, je;
      V(!0), pe(""), he("");
      try {
        const Le = new URLSearchParams();
        if (v && Le.set("q", v), y && y !== "all") {
          const dn = cE[y] || y;
          Le.set("status", Vv(dn));
        }
        Le.set("page", String(f)), Le.set("limit", String(D));
        const ye = await fetch(`/api/orders?${Le.toString()}`, { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load orders");
        const Je = await ye.json();
        U && (p(Array.isArray(Je.orders) ? Je.orders : []), he(Je.shopifyError || ""), $(!!Je.shopifyConfigured), E({ total: ((ve = Je.meta) == null ? void 0 : ve.total) || 0, page: ((oe = Je.meta) == null ? void 0 : oe.page) || 1, limit: ((Te = Je.meta) == null ? void 0 : Te.limit) || D, pages: ((je = Je.meta) == null ? void 0 : je.pages) || 1 }));
      } catch (Le) {
        U && pe(Le.message || "Failed to load orders");
      } finally {
        U && V(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [v, y, f, D]), C.useMemo(() => o, [o]);
  const X = C.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const U = Vv(cE[y] || y);
    return o.filter((ve) => sE(ve) === U);
  }, [o, y]);
  function ie() {
    ce(null), P(!1);
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
        lineNumber: 233,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 234,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 232,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 239,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: v, onChange: (U) => {
          g(U.target.value), k(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 240,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 238,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        T_.map(({ key: U, label: ve }) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${y === U ? " active" : ""}`, onClick: () => {
          R(U), k(1);
        }, "data-filter": U, children: ve }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 244,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (U) => {
          T(parseInt(U.target.value, 10)), k(1);
        }, children: [10, 20, 50, 100].map((U) => /* @__PURE__ */ d.jsxDEV("option", { value: U, children: [
          U,
          "/page"
        ] }, U, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 249,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 248,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 242,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 237,
      columnNumber: 9
    }, this),
    !I && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 255,
      columnNumber: 11
    }, this),
    ae && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ae }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 257,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 263,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 264,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 265,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 266,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 267,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 268,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 269,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 270,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 262,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 261,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        j && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 275,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 275,
          columnNumber: 17
        }, this),
        !j && Q && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "auth-error", children: Q }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 278,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 278,
          columnNumber: 17
        }, this),
        !j && !Q && X.map((U, ve) => {
          var Tt, pn;
          const oe = wE(U), Te = sE(U), je = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let Le = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? Le = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? Le = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((Rt) => String(Rt || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? Le = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (Le = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((Rt) => String(Rt || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = U.name || U.order_number || U.id, dn = (ye != null ? String(ye).replace(/^#+/, "").trim() : "") || "-", Xt = U.deliveryStartTime ?? U.delivery_start_time ?? U.start_time ?? null, xn = C_(Xt), Dt = R_(U), In = x_(Dt), Jt = (Tt = U == null ? void 0 : U.orders) == null ? void 0 : Tt.deliveryDuration, va = D_(Jt), na = U.rider ? String(U.rider) : (pn = U.assignment) != null && pn.riderId ? String(U.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Te, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name order-id-cell", children: dn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 309,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km customer-cell", children: je || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 310,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf address-cell", children: Le }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 311,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider rider-cell", children: na }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 312,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-start-time start-cell", children: xn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 313,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected expected-cell", children: In }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 314,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: va }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 315,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Te}`, children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 316,
              columnNumber: 63
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 316,
              columnNumber: 21
            }, this)
          ] }, ye || ve, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 308,
            columnNumber: 19
          }, this);
        }),
        !j && !Q && X.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 321,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 321,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 273,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 260,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 259,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      G && ge && /* @__PURE__ */ d.jsxDEV(jE, { orderId: ge, onClose: ie, onAssigned: J }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 328,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page <= 1 || j, onClick: () => k((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 332,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          L.page,
          " of ",
          L.pages,
          " • ",
          L.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 333,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page >= L.pages || j, onClick: () => k((U) => Math.min(L.pages, U + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 334,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 331,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 326,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 231,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 230,
    columnNumber: 5
  }, this);
}
function w_() {
  const [o, p] = C.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [v, g] = C.useState([]), [y, R] = C.useState(!1), [f, k] = C.useState(!0), [D, T] = C.useState("");
  return C.useEffect(() => {
    let L = !0;
    return (async () => {
      k(!0), T("");
      try {
        const E = await fetch("/api/reports", { credentials: "include" });
        if (E.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!E.ok) throw new Error("Failed to load reports");
        const j = await E.json();
        L && (p(j.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(j.deliveries) ? j.deliveries : []));
      } catch (E) {
        L && T(E.message || "Failed to load reports");
      } finally {
        L && k(!1);
      }
    })(), () => {
      L = !1;
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "reports-stat-value", children: o.totalDeliveries }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: y, onChange: (L) => R(L.target.checked) }, void 0, !1, {
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
      y && /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
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
          !f && !D && v.map((L, E) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              L.orderNumber || L.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: L.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: L.expectedMinutes != null ? `${L.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: L.durationMins != null ? `${L.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: L.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, L.orderId || E, !0, {
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
function __() {
  const [o, p] = C.useState([]), [v, g] = C.useState(!0), [y, R] = C.useState(""), [f, k] = C.useState(1), [D, T] = C.useState(25), [L, E] = C.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  C.useEffect(() => {
    let G = !0;
    return (async () => {
      var P, ge, ce, X;
      g(!0), R("");
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
        G && (p(Array.isArray(U.orders) ? U.orders : []), E({ total: ((P = U.meta) == null ? void 0 : P.total) || 0, page: ((ge = U.meta) == null ? void 0 : ge.page) || f, limit: ((ce = U.meta) == null ? void 0 : ce.limit) || D, pages: ((X = U.meta) == null ? void 0 : X.pages) || 1 }));
      } catch (ie) {
        G && R(ie.message || "Failed to load orders");
      } finally {
        G && g(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [f]);
  function j(G) {
    return !G || typeof G != "object" ? "new" : typeof G.current_status == "string" && String(G.current_status).trim() ? String(G.current_status).toLowerCase().trim() : "new";
  }
  const [V, Q] = C.useState(!1), [pe, ae] = C.useState(null);
  function he(G) {
    ae(G), Q(!0);
  }
  function I() {
    ae(null), Q(!1);
  }
  function $(G) {
    try {
      const { orderId: P } = G || {};
      if (!P) return;
      const ge = String(P).replace(/^#+/, "");
      p((ce) => ce.filter((X, ie) => {
        const J = String(X.id || X.name || X.order_number || ie).replace(/^#+/, "");
        return String(J) !== String(ge);
      })), E((ce) => ({ ...ce || {}, total: Math.max(0, ((ce == null ? void 0 : ce.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${P}`, { type: "success" });
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: v ? "…" : L.total || o.length }, void 0, !1, {
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
        !v && y && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: y }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 28
        }, this),
        !v && !y && (Array.isArray(o) ? o.filter((P) => j(P) === "new") : []).map((P, ge) => {
          const ce = j(P), X = P.full_name || (P.customer && P.customer.full_name ? P.customer.full_name : "");
          let ie = "-";
          typeof P.shipping_address == "string" && String(P.shipping_address).trim() ? ie = String(P.shipping_address).trim() : P.shipping_address && typeof P.shipping_address == "object" ? ie = [P.shipping_address.address1 || "", P.shipping_address.city || "", P.shipping_address.province || "", P.shipping_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-" : typeof P.billing_address == "string" && String(P.billing_address).trim() ? ie = String(P.billing_address).trim() : P.billing_address && typeof P.billing_address == "object" && (ie = [P.billing_address.address1 || "", P.billing_address.city || "", P.billing_address.province || "", P.billing_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-");
          const J = P.name || P.order_number || P.id || ge, U = String(P.id || P.name || P.order_number || ge).replace(/^#+/, ""), ve = P.created_at ? new Date(P.created_at) : null, oe = ve ? ve.toLocaleDateString() : "-", Te = ve ? ve.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
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
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => he(String(P.id || P.name || P.order_number || ge)), children: "Assign Rider" }, void 0, !1, {
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
        !v && !y && o.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page <= 1 || v, onClick: () => k((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        L.page,
        " of ",
        L.pages,
        " • ",
        L.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 141,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page >= L.pages || v, onClick: () => k((G) => Math.min(L.pages, G + 1)), children: "Next" }, void 0, !1, {
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
    V && pe && /* @__PURE__ */ d.jsxDEV(jE, { orderId: pe, onClose: I, onAssigned: $ }, void 0, !1, {
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
function O_() {
  return /* @__PURE__ */ d.jsxDEV(r_, { children: /* @__PURE__ */ d.jsxDEV($w, { children: [
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(g_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(E_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(S_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(j_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(w_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(Pw, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function fE() {
  const o = document.getElementById("react-root");
  if (!o) return;
  yE(o).render(/* @__PURE__ */ d.jsxDEV(O_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fE) : fE();
