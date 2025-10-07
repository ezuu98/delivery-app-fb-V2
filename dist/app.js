function Pw(u, p) {
  for (var v = 0; v < p.length; v++) {
    const g = p[v];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const y in g)
        if (y !== "default" && !(y in u)) {
          const R = Object.getOwnPropertyDescriptor(g, y);
          R && Object.defineProperty(u, y, R.get ? R : {
            enumerable: !0,
            get: () => g[y]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, { value: "Module" }));
}
function $w(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var fE = { exports: {} }, wv = {}, dE = { exports: {} }, hf = { exports: {} };
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
    var v = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), ae = Symbol.iterator, he = "@@iterator";
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
    function Kt(c, b) {
      {
        var M = c.constructor, F = M && (M.displayName || M.name) || "ReactClass", K = F + "." + b;
        if (dn[K])
          return;
        ye("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, F), dn[K] = !0;
      }
    }
    var Sn = {
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
        Kt(c, "forceUpdate");
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
        Kt(c, "replaceState");
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
        Kt(c, "setState");
      }
    }, Dt = Object.assign, Yn = {};
    Object.freeze(Yn);
    function Xt(c, b, M) {
      this.props = c, this.context = b, this.refs = Yn, this.updater = M || Sn;
    }
    Xt.prototype.isReactComponent = {}, Xt.prototype.setState = function(c, b) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, c, b, "setState");
    }, Xt.prototype.forceUpdate = function(c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    };
    {
      var va = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, In = function(c, b) {
        Object.defineProperty(Xt.prototype, c, {
          get: function() {
            Le("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Rt in va)
        va.hasOwnProperty(Rt) && In(Rt, va[Rt]);
    }
    function qn() {
    }
    qn.prototype = Xt.prototype;
    function Jt(c, b, M) {
      this.props = c, this.context = b, this.refs = Yn, this.updater = M || Sn;
    }
    var Zt = Jt.prototype = new qn();
    Zt.constructor = Jt, Dt(Zt, Xt.prototype), Zt.isPureReactComponent = !0;
    function en() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var Vn = Array.isArray;
    function Pt(c) {
      return Vn(c);
    }
    function xn(c) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, M = b && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return M;
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
    function aa(c) {
      if ($t(c))
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", xn(c)), Yt(c);
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
    function kn(c) {
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
        case _:
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
          case O:
            return tr(c, c.render, "ForwardRef");
          case V:
            var F = c.displayName || null;
            return F !== null ? F : kn(c.type) || "Memo";
          case Q: {
            var K = c, Re = K._payload, de = K._init;
            try {
              return kn(de(Re));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var pn = Object.prototype.hasOwnProperty, tn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Rn, Fa, Ot;
    Ot = {};
    function Cn(c) {
      if (pn.call(c, "ref")) {
        var b = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function Un(c) {
      if (pn.call(c, "key")) {
        var b = Object.getOwnPropertyDescriptor(c, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function _r(c, b) {
      var M = function() {
        Rn || (Rn = !0, ye("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
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
        var b = kn(ge.current.type);
        Ot[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, c.ref), Ot[b] = !0);
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
        Cn(b) && (de = b.ref, ee(b)), Un(b) && (aa(b.key), Re = "" + b.key), Me = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (F in b)
          pn.call(b, F) && !tn.hasOwnProperty(F) && (K[F] = b[F]);
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
        Cn(b) && (de = b.ref, tt = ge.current), Un(b) && (aa(b.key), Re = "" + b.key);
        var ot;
        c.type && c.type.defaultProps && (ot = c.type.defaultProps);
        for (F in b)
          pn.call(b, F) && !tn.hasOwnProperty(F) && (b[F] === void 0 && ot !== void 0 ? K[F] = ot[F] : K[F] = b[F]);
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
    var gt = ".", mn = ":";
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
        if (Pt($e)) {
          var ot = "";
          tt != null && (ot = ya(tt) + "/"), ra($e, b, ot, "", function(Cf) {
            return Cf;
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
      var ut, He, vt = 0, Tt = F === "" ? gt : F + mn;
      if (Pt(c))
        for (var bi = 0; bi < c.length; bi++)
          ut = c[bi], He = Tt + ga(ut, bi), vt += ra(ut, b, M, He, K);
      else {
        var go = I(c);
        if (typeof go == "function") {
          var lr = c;
          go === lr.entries && (it || Le("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var bo = go.call(lr), No, Rf = 0; !(No = bo.next()).done; )
            ut = No.value, He = Tt + ga(ut, Rf++), vt += ra(ut, b, M, He, K);
        } else if (Re === "object") {
          var ps = String(c);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
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
    var ba = -1, ia = 0, Gn = 1, za = 2;
    function fi(c) {
      if (c._status === ba) {
        var b = c._result, M = b();
        if (M.then(function(Re) {
          if (c._status === ia || c._status === ba) {
            var de = c;
            de._status = Gn, de._result = Re;
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
      if (c._status === Gn) {
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
        $$typeof: O,
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
      return !!(typeof c == "string" || typeof c == "function" || c === R || c === k || Te || c === f || c === E || c === _ || oe || c === pe || J || U || ve || typeof c == "object" && c !== null && (c.$$typeof === Q || c.$$typeof === V || c.$$typeof === D || c.$$typeof === T || c.$$typeof === O || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === te || c.getModuleId !== void 0));
    }
    function Pe(c, b) {
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
    function Lt(c, b, M) {
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
    function vn(c, b) {
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
    function Mt(c, b) {
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
    function ns() {
      var c = we();
      return c.useId();
    }
    function as(c, b, M) {
      var F = we();
      return F.useSyncExternalStore(c, b, M);
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
              value: rs
            }),
            groupEnd: Dt({}, c, {
              value: is
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
    function ls(c, b) {
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
            } catch (Tt) {
              F = Tt;
            }
            Reflect.construct(c, [], de);
          } else {
            try {
              de.call();
            } catch (Tt) {
              F = Tt;
            }
            c.call(de.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Tt) {
            F = Tt;
          }
          c();
        }
      } catch (Tt) {
        if (Tt && F && typeof Tt.stack == "string") {
          for (var Me = Tt.stack.split(`
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
        vi = !1, mi.current = Re, Ba(), Error.prepareStackTrace = K;
      }
      var He = c ? c.displayName || c.name : "", vt = He ? Zi(He) : "";
      return typeof c == "function" && el.set(c, vt), vt;
    }
    function co(c, b, M) {
      return ls(c, !1);
    }
    function bf(c) {
      var b = c.prototype;
      return !!(b && b.isReactComponent);
    }
    function hi(c, b, M) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return ls(c, bf(c));
      if (typeof c == "string")
        return Zi(c);
      switch (c) {
        case E:
          return Zi("Suspense");
        case _:
          return Zi("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case O:
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
    var os = {}, fo = je.ReactDebugCurrentFrame;
    function Qe(c) {
      if (c) {
        var b = c._owner, M = hi(c.type, c._source, b ? b.type : null);
        fo.setExtraStackFrame(M);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(c, b, M, F, K) {
      {
        var Re = Function.call.bind(pn);
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
            Me && !(Me instanceof Error) && (Qe(K), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", M, de, typeof Me), Qe(null)), Me instanceof Error && !(Me.message in os) && (os[Me.message] = !0, Qe(K), ye("Failed %s type: %s", M, Me.message), Qe(null));
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
        var c = kn(ge.current.type);
        if (c)
          return `

Check the render method of \`` + c + "`.";
      }
      return "";
    }
    function Dn(c) {
      if (c !== void 0) {
        var b = c.fileName.replace(/^.*[\\\/]/, ""), M = c.lineNumber;
        return `

Check your code at ` + b + ":" + M + ".";
      }
      return "";
    }
    function yi(c) {
      return c != null ? Dn(c.__source) : "";
    }
    var Mr = {};
    function Ef(c) {
      var b = po();
      if (!b) {
        var M = typeof c == "string" ? c : c.displayName || c.name;
        M && (b = `

Check the top-level render call using <` + M + ">.");
      }
      return b;
    }
    function It(c, b) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var M = Ef(b);
        if (!Mr[M]) {
          Mr[M] = !0;
          var F = "";
          c && c._owner && c._owner !== ge.current && (F = " It was passed a child from " + kn(c._owner.type) + "."), rr(c), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', M, F), rr(null);
        }
      }
    }
    function mt(c, b) {
      if (typeof c == "object") {
        if (Pt(c))
          for (var M = 0; M < c.length; M++) {
            var F = c[M];
            yt(F) && It(F, b);
          }
        else if (yt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var K = I(c);
          if (typeof K == "function" && K !== c.entries)
            for (var Re = K.call(c), de; !(de = Re.next()).done; )
              yt(de.value) && It(de.value, b);
        }
      }
    }
    function us(c) {
      {
        var b = c.type;
        if (b == null || typeof b == "string")
          return;
        var M;
        if (typeof b == "function")
          M = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === O || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === V))
          M = b.propTypes;
        else
          return;
        if (M) {
          var F = kn(b);
          Nf(M, c.props, "prop", F, c);
        } else if (b.PropTypes !== void 0 && !Ve) {
          Ve = !0;
          var K = kn(b);
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
    function Tn(c, b, M) {
      var F = Ne(c);
      if (!F) {
        var K = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = yi(b);
        Re ? K += Re : K += po();
        var de;
        c === null ? de = "null" : Pt(c) ? de = "array" : c !== void 0 && c.$$typeof === g ? (de = "<" + (kn(c.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : de = typeof c, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", de, K);
      }
      var Me = Fe.apply(this, arguments);
      if (Me == null)
        return Me;
      if (F)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], c);
      return c === R ? la(Me) : us(Me), Me;
    }
    var Sa = !1;
    function Sf(c) {
      var b = Tn.bind(null, c);
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
      return us(F), F;
    }
    function ss(c, b) {
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
    function xf(c) {
      if (tl === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), M = u && u[b];
          tl = M.call(u, "timers").setImmediate;
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
        Ar++, B.current === null && (B.current = []);
        var M = B.isBatchingLegacy, F;
        try {
          if (B.isBatchingLegacy = !0, F = c(), !M && B.didScheduleLegacyUpdate) {
            var K = B.current;
            K !== null && (B.didScheduleLegacyUpdate = !1, rl(K));
          }
        } catch (He) {
          throw ir(b), He;
        } finally {
          B.isBatchingLegacy = M;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Re = F, de = !1, Me = {
            then: function(He, vt) {
              de = !0, Re.then(function(Tt) {
                ir(b), Ar === 0 ? nl(Tt, He, vt) : He(Tt);
              }, function(Tt) {
                ir(b), vt(Tt);
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
    function nl(c, b, M) {
      {
        var F = B.current;
        if (F !== null)
          try {
            rl(F), xf(function() {
              F.length === 0 ? (B.current = null, b(c)) : nl(c, b, M);
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
    var cs = Tn, fs = mo, yo = Sf, ds = {
      map: ar,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    p.Children = ds, p.Component = Xt, p.Fragment = R, p.Profiler = k, p.PureComponent = Jt, p.StrictMode = f, p.Suspense = E, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = je, p.act = ho, p.cloneElement = fs, p.createContext = ci, p.createElement = cs, p.createFactory = yo, p.createRef = en, p.forwardRef = q, p.isValidElement = yt, p.lazy = N, p.memo = Pe, p.startTransition = ss, p.unstable_act = ho, p.useCallback = Na, p.useContext = ke, p.useDebugValue = Ea, p.useDeferredValue = pi, p.useEffect = dt, p.useId = ns, p.useImperativeHandle = di, p.useInsertionEffect = vn, p.useLayoutEffect = Ha, p.useMemo = Mt, p.useReducer = Lt, p.useRef = ft, p.useState = Se, p.useSyncExternalStore = as, p.useTransition = ze, p.version = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var Yw = hf.exports;
dE.exports = Yw;
var C = dE.exports;
const Iw = /* @__PURE__ */ $w(C), qw = /* @__PURE__ */ Pw({
  __proto__: null,
  default: Iw
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
  var u = C, p = Symbol.for("react.element"), v = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), k = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), Q = Symbol.iterator, pe = "@@iterator";
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
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === R || X || N === y || N === T || N === O || ce || N === V || G || B || ge || typeof N == "object" && N !== null && (N.$$typeof === _ || N.$$typeof === E || N.$$typeof === f || N.$$typeof === k || N.$$typeof === D || // This needs to include all possible module reference object
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
      case O:
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
        case _: {
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
  var Te = Object.assign, je = 0, Le, ye, Je, dn, Kt, Sn, Dt;
  function Yn() {
  }
  Yn.__reactDisabledLog = !0;
  function Xt() {
    {
      if (je === 0) {
        Le = console.log, ye = console.info, Je = console.warn, dn = console.error, Kt = console.group, Sn = console.groupCollapsed, Dt = console.groupEnd;
        var N = {
          configurable: !0,
          enumerable: !0,
          value: Yn,
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
            value: Kt
          }),
          groupCollapsed: Te({}, N, {
            value: Sn
          }),
          groupEnd: Te({}, N, {
            value: Dt
          })
        });
      }
      je < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var In = he.ReactCurrentDispatcher, Rt;
  function qn(N, q, te) {
    {
      if (Rt === void 0)
        try {
          throw Error();
        } catch (Pe) {
          var Ne = Pe.stack.trim().match(/\n( *(at )?)/);
          Rt = Ne && Ne[1] || "";
        }
      return `
` + Rt + N;
    }
  }
  var Jt = !1, Zt;
  {
    var en = typeof WeakMap == "function" ? WeakMap : Map;
    Zt = new en();
  }
  function Vn(N, q) {
    if (!N || Jt)
      return "";
    {
      var te = Zt.get(N);
      if (te !== void 0)
        return te;
    }
    var Ne;
    Jt = !0;
    var Pe = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var we;
    we = In.current, In.current = null, Xt();
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
          } catch (Mt) {
            Ne = Mt;
          }
          Reflect.construct(N, [], ke);
        } else {
          try {
            ke.call();
          } catch (Mt) {
            Ne = Mt;
          }
          N.call(ke.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Mt) {
          Ne = Mt;
        }
        N();
      }
    } catch (Mt) {
      if (Mt && Ne && typeof Mt.stack == "string") {
        for (var Se = Mt.stack.split(`
`), Lt = Ne.stack.split(`
`), ft = Se.length - 1, dt = Lt.length - 1; ft >= 1 && dt >= 0 && Se[ft] !== Lt[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (Se[ft] !== Lt[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || Se[ft] !== Lt[dt]) {
                  var vn = `
` + Se[ft].replace(" at new ", " at ");
                  return N.displayName && vn.includes("<anonymous>") && (vn = vn.replace("<anonymous>", N.displayName)), typeof N == "function" && Zt.set(N, vn), vn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Jt = !1, In.current = we, va(), Error.prepareStackTrace = Pe;
    }
    var Ha = N ? N.displayName || N.name : "", Na = Ha ? qn(Ha) : "";
    return typeof N == "function" && Zt.set(N, Na), Na;
  }
  function Pt(N, q, te) {
    return Vn(N, !1);
  }
  function xn(N) {
    var q = N.prototype;
    return !!(q && q.isReactComponent);
  }
  function $t(N, q, te) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return Vn(N, xn(N));
    if (typeof N == "string")
      return qn(N);
    switch (N) {
      case T:
        return qn("Suspense");
      case O:
        return qn("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case D:
          return Pt(N.render);
        case E:
          return $t(N.type, q, te);
        case _: {
          var Ne = N, Pe = Ne._payload, we = Ne._init;
          try {
            return $t(we(Pe), q, te);
          } catch {
          }
        }
      }
    return "";
  }
  var Yt = Object.prototype.hasOwnProperty, aa = {}, tr = he.ReactDebugCurrentFrame;
  function ha(N) {
    if (N) {
      var q = N._owner, te = $t(N.type, N._source, q ? q.type : null);
      tr.setExtraStackFrame(te);
    } else
      tr.setExtraStackFrame(null);
  }
  function kn(N, q, te, Ne, Pe) {
    {
      var we = Function.call.bind(Yt);
      for (var ke in N)
        if (we(N, ke)) {
          var Se = void 0;
          try {
            if (typeof N[ke] != "function") {
              var Lt = Error((Ne || "React class") + ": " + te + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Lt.name = "Invariant Violation", Lt;
            }
            Se = N[ke](q, ke, Ne, te, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Se = ft;
          }
          Se && !(Se instanceof Error) && (ha(Pe), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", te, ke, typeof Se), ha(null)), Se instanceof Error && !(Se.message in aa) && (aa[Se.message] = !0, ha(Pe), I("Failed %s type: %s", te, Se.message), ha(null));
        }
    }
  }
  var pn = Array.isArray;
  function tn(N) {
    return pn(N);
  }
  function Rn(N) {
    {
      var q = typeof Symbol == "function" && Symbol.toStringTag, te = q && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return te;
    }
  }
  function Fa(N) {
    try {
      return Ot(N), !1;
    } catch {
      return !0;
    }
  }
  function Ot(N) {
    return "" + N;
  }
  function Cn(N) {
    if (Fa(N))
      return I("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(N)), Ot(N);
  }
  var Un = he.ReactCurrentOwner, _r = {
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
    if (typeof N.ref == "string" && Un.current && q && Un.current.stateNode !== q) {
      var te = oe(Un.current.type);
      be[te] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', oe(Un.current.type), N.ref), be[te] = !0);
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
  var mn = function(N, q, te, Ne, Pe, we, ke) {
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
      var we, ke = {}, Se = null, Lt = null;
      te !== void 0 && (Cn(te), Se = "" + te), et(q) && (Cn(q.key), Se = "" + q.key), Fe(q) && (Lt = q.ref, ct(q, Pe));
      for (we in q)
        Yt.call(q, we) && !_r.hasOwnProperty(we) && (ke[we] = q[we]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (we in ft)
          ke[we] === void 0 && (ke[we] = ft[we]);
      }
      if (Se || Lt) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Se && yt(ke, dt), Lt && gt(ke, dt);
      }
      return mn(N, Se, Lt, Pe, Ne, Un.current, ke);
    }
  }
  var it = he.ReactCurrentOwner, Et = he.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var q = N._owner, te = $t(N.type, N._source, q ? q.type : null);
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
        var Pe = ae(N);
        if (typeof Pe == "function" && Pe !== N.entries)
          for (var we = Pe.call(N), ke; !(ke = we.next()).done; )
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
        kn(te, N.props, "prop", Ne, N);
      } else if (q.PropTypes !== void 0 && !ga) {
        ga = !0;
        var Pe = oe(q);
        I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Pe || "Unknown");
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
  var Gn = {};
  function za(N, q, te, Ne, Pe, we) {
    {
      var ke = J(N);
      if (!ke) {
        var Se = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Lt = no(Pe);
        Lt ? Se += Lt : Se += ar();
        var ft;
        N === null ? ft = "null" : tn(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (oe(N.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Se);
      }
      var dt = Nt(N, q, te, Pe, we);
      if (dt == null)
        return dt;
      if (ke) {
        var vn = q.children;
        if (vn !== void 0)
          if (Ne)
            if (tn(vn)) {
              for (var Ha = 0; Ha < vn.length; Ha++)
                ci(vn[Ha], N);
              Object.freeze && Object.freeze(vn);
            } else
              I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(vn, N);
      }
      if (Yt.call(q, "key")) {
        var Na = oe(N), Mt = Object.keys(q).filter(function(ze) {
          return ze !== "key";
        }), di = Mt.length > 0 ? "{key: someKey, " + Mt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Gn[Na + di]) {
          var Ea = Mt.length > 0 ? "{" + Mt.join(": ..., ") + ": ...}" : "{}";
          I(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, Na, Ea, Na), Gn[Na + di] = !0;
        }
      }
      return N === g ? ia(dt) : ba(dt), dt;
    }
  }
  var fi = za;
  wv.Fragment = g, wv.jsxDEV = fi;
})();
fE.exports = wv;
var d = fE.exports, pE = { exports: {} }, na = {}, mE = { exports: {} }, vE = {};
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
        var gt = (et + 1) * 2 - 1, mn = ee[gt], Nt = gt + 1, it = ee[Nt];
        if (D(mn, be) < 0)
          Nt < ct && D(it, mn) < 0 ? (ee[et] = it, ee[Nt] = be, et = Nt) : (ee[et] = mn, ee[gt] = be, et = gt);
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
    var T = 1, O = 2, E = 3, _ = 4, V = 5;
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
    var $ = 1073741823, G = -1, B = 250, ge = 5e3, ce = 1e4, X = $, ie = [], J = [], U = 1, ve = null, oe = E, Te = !1, je = !1, Le = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, dn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Kt(ee) {
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
    function Sn(ee) {
      if (Le = !1, Kt(ee), !je)
        if (y(ie) !== null)
          je = !0, Ot(Dt);
        else {
          var be = y(J);
          be !== null && Cn(Sn, be.startTime - ee);
        }
    }
    function Dt(ee, be) {
      je = !1, Le && (Le = !1, Un()), Te = !0;
      var Fe = oe;
      try {
        var et;
        if (!p) return Yn(ee, be);
      } finally {
        ve = null, oe = Fe, Te = !1;
      }
    }
    function Yn(ee, be) {
      var Fe = be;
      for (Kt(Fe), ve = y(ie); ve !== null && !(ve.expirationTime > Fe && (!ee || tr())); ) {
        var et = ve.callback;
        if (typeof et == "function") {
          ve.callback = null, oe = ve.priorityLevel;
          var ct = ve.expirationTime <= Fe, yt = et(ct);
          Fe = u.unstable_now(), typeof yt == "function" ? ve.callback = yt : ve === y(ie) && R(ie), Kt(Fe);
        } else
          R(ie);
        ve = y(ie);
      }
      if (ve !== null)
        return !0;
      var gt = y(J);
      return gt !== null && Cn(Sn, gt.startTime - Fe), !1;
    }
    function Xt(ee, be) {
      switch (ee) {
        case T:
        case O:
        case E:
        case _:
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
        case O:
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
    function In(ee) {
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
    function Rt(ee, be, Fe) {
      var et = u.unstable_now(), ct;
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
        case O:
          gt = B;
          break;
        case V:
          gt = X;
          break;
        case _:
          gt = ce;
          break;
        case E:
        default:
          gt = ge;
          break;
      }
      var mn = ct + gt, Nt = {
        id: U++,
        callback: be,
        priorityLevel: ee,
        startTime: ct,
        expirationTime: mn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, g(J, Nt), y(ie) === null && Nt === y(J) && (Le ? Un() : Le = !0, Cn(Sn, ct - et))) : (Nt.sortIndex = mn, g(ie, Nt), !je && !Te && (je = !0, Ot(Dt))), Nt;
    }
    function qn() {
    }
    function Jt() {
      !je && !Te && (je = !0, Ot(Dt));
    }
    function Zt() {
      return y(ie);
    }
    function en(ee) {
      ee.callback = null;
    }
    function Vn() {
      return oe;
    }
    var Pt = !1, xn = null, $t = -1, Yt = v, aa = -1;
    function tr() {
      var ee = u.unstable_now() - aa;
      return !(ee < Yt);
    }
    function ha() {
    }
    function kn(ee) {
      if (ee < 0 || ee > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ee > 0 ? Yt = Math.floor(1e3 / ee) : Yt = v;
    }
    var pn = function() {
      if (xn !== null) {
        var ee = u.unstable_now();
        aa = ee;
        var be = !0, Fe = !0;
        try {
          Fe = xn(be, ee);
        } finally {
          Fe ? tn() : (Pt = !1, xn = null);
        }
      } else
        Pt = !1;
    }, tn;
    if (typeof dn == "function")
      tn = function() {
        dn(pn);
      };
    else if (typeof MessageChannel < "u") {
      var Rn = new MessageChannel(), Fa = Rn.port2;
      Rn.port1.onmessage = pn, tn = function() {
        Fa.postMessage(null);
      };
    } else
      tn = function() {
        ye(pn, 0);
      };
    function Ot(ee) {
      xn = ee, Pt || (Pt = !0, tn());
    }
    function Cn(ee, be) {
      $t = ye(function() {
        ee(u.unstable_now());
      }, be);
    }
    function Un() {
      Je($t), $t = -1;
    }
    var _r = ha, nr = null;
    u.unstable_IdlePriority = V, u.unstable_ImmediatePriority = T, u.unstable_LowPriority = _, u.unstable_NormalPriority = E, u.unstable_Profiling = nr, u.unstable_UserBlockingPriority = O, u.unstable_cancelCallback = en, u.unstable_continueExecution = Jt, u.unstable_forceFrameRate = kn, u.unstable_getCurrentPriorityLevel = Vn, u.unstable_getFirstCallbackNode = Zt, u.unstable_next = va, u.unstable_pauseExecution = qn, u.unstable_requestPaint = _r, u.unstable_runWithPriority = Xt, u.unstable_scheduleCallback = Rt, u.unstable_shouldYield = tr, u.unstable_wrapCallback = In, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(vE);
mE.exports = vE;
var Gw = mE.exports;
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
  var u = C, p = Gw, v = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
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
  var D = 0, T = 1, O = 2, E = 3, _ = 4, V = 5, Q = 6, pe = 7, ae = 8, he = 9, I = 10, $ = 11, G = 12, B = 13, ge = 14, ce = 15, X = 16, ie = 17, J = 18, U = 19, ve = 21, oe = 22, Te = 23, je = 24, Le = 25, ye = !0, Je = !1, dn = !1, Kt = !1, Sn = !1, Dt = !0, Yn = !0, Xt = !0, va = !0, In = /* @__PURE__ */ new Set(), Rt = {}, qn = {};
  function Jt(e, t) {
    Zt(e, t), Zt(e + "Capture", t);
  }
  function Zt(e, t) {
    Rt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Rt[e] = t;
    {
      var n = e.toLowerCase();
      qn[n] = e, e === "onDoubleClick" && (qn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      In.add(t[a]);
  }
  var en = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Vn = Object.prototype.hasOwnProperty;
  function Pt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function xn(e) {
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
    if (xn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function aa(e) {
    if (xn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  function tr(e, t) {
    if (xn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function ha(e, t) {
    if (xn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pt(e)), $t(e);
  }
  function kn(e) {
    if (xn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  function pn(e) {
    if (xn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Pt(e)), $t(e);
  }
  var tn = 0, Rn = 1, Fa = 2, Ot = 3, Cn = 4, Un = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + nr + "][" + ee + "]*$"), Fe = {}, et = {};
  function ct(e) {
    return Vn.call(et, e) ? !0 : Vn.call(Fe, e) ? !1 : be.test(e) ? (et[e] = !0, !0) : (Fe[e] = !0, f("Invalid attribute name: `%s`", e), !1);
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
  function mn(e, t, n, a) {
    if (t === null || typeof t > "u" || gt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Ot:
          return !t;
        case Cn:
          return t === !1;
        case Un:
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
    this.acceptsBooleans = t === Fa || t === Ot || t === Cn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
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
      Rn,
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
      Ot,
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
      Ot,
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
      Cn,
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
      Un,
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
      Rn,
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
      Rn,
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
      Rn,
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
      Rn,
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
    Rn,
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
      Rn,
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
      if (a.type === Cn) {
        if (e.hasAttribute(i)) {
          var o = e.getAttribute(i);
          return o === "" ? !0 : mn(t, n, a, !1) ? o : o === "" + n ? n : o;
        }
      } else if (e.hasAttribute(i)) {
        if (mn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Ot)
          return n;
        l = e.getAttribute(i);
      }
      return mn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
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
  function ba(e, t, n, a) {
    var r = Nt(t);
    if (!yt(t, r, a)) {
      if (mn(t, n, r, a) && (n = null), a || r === null) {
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
          e[o] = s === Ot ? !1 : "";
        } else
          e[o] = n;
        return;
      }
      var m = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(m);
      else {
        var x = r.type, S;
        x === Ot || x === Cn && n === !0 ? S = "" : (Yt(n, m), S = "" + n, r.sanitizeURL && Ki(S.toString())), h ? e.setAttributeNS(h, m, S) : e.setAttribute(m, S);
      }
    }
  }
  var ia = Symbol.for("react.element"), Gn = Symbol.for("react.portal"), za = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), q = Symbol.for("react.provider"), te = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Pe = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), Lt = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), vn = Symbol.for("react.legacy_hidden"), Ha = Symbol.for("react.cache"), Na = Symbol.for("react.tracing_marker"), Mt = Symbol.iterator, di = "@@iterator";
  function Ea(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Mt && e[Mt] || e[di];
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
        for (var o = A.stack.split(`
`), s = a.stack.split(`
`), m = o.length - 1, h = s.length - 1; m >= 1 && h >= 0 && o[m] !== s[h]; )
          h--;
        for (; m >= 1 && h >= 0; m--, h--)
          if (o[m] !== s[h]) {
            if (m !== 1 || h !== 1)
              do
                if (m--, h--, h < 0 || o[m] !== s[h]) {
                  var x = `
` + o[m].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, x), x;
                }
              while (m >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      mi = !1, Ji.current = i, is(), Error.prepareStackTrace = r;
    }
    var S = e ? e.displayName || e.name : "", L = S ? Ba(S) : "";
    return typeof e == "function" && Lr.set(e, L), L;
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
      case Pe:
        return Ba("Suspense");
      case we:
        return Ba("SuspenseList");
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
        return Ba(e.type);
      case X:
        return Ba("Lazy");
      case B:
        return Ba("Suspense");
      case U:
        return Ba("SuspenseList");
      case D:
      case O:
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
      case Gn:
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
      case _:
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
      case B:
        return "Suspense";
      case U:
        return "SuspenseList";
      case Le:
        return "TracingMarker";
      case T:
      case D:
      case ie:
      case O:
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
  var po = v.ReactDebugCurrentFrame, Dn = null, yi = !1;
  function Mr() {
    {
      if (Dn === null)
        return null;
      var e = Dn._debugOwner;
      if (e !== null && typeof e < "u")
        return Ve(e);
    }
    return null;
  }
  function Ef() {
    return Dn === null ? "" : hi(Dn);
  }
  function It() {
    po.getCurrentStack = null, Dn = null, yi = !1;
  }
  function mt(e) {
    po.getCurrentStack = e === null ? null : Ef, Dn = e, yi = !1;
  }
  function us() {
    return Dn;
  }
  function la(e) {
    yi = e;
  }
  function Tn(e) {
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
        return pn(e), e;
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
    pn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(o) {
          pn(o), a = "" + o, i.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          pn(o), a = "" + o;
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
  function yo(e, t) {
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
      initialValue: Sa(t.value != null ? t.value : a),
      controlled: fs(t)
    };
  }
  function c(e, t) {
    var n = e, a = t.checked;
    a != null && ba(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = fs(t);
      !n._wrapperState.controlled && a && !cs && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), cs = !0), n._wrapperState.controlled && !a && !rl && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), rl = !0);
    }
    c(e, t);
    var r = Sa(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Tn(r)) : n.value !== Tn(r) && (n.value = Tn(r));
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
      var l = Tn(a._wrapperState.initialValue);
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
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Tn(e._wrapperState.initialValue) : e.defaultValue !== Tn(n) && (e.defaultValue = Tn(n)));
  }
  var de = !1, Me = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? u.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Me || (Me = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !de && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), de = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", Tn(Sa(t.value)));
  }
  var ut = Array.isArray;
  function He(e) {
    return ut(e);
  }
  var vt;
  vt = !1;
  function Tt() {
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
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Tt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Tt());
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
      for (var h = Tn(Sa(n)), x = null, S = 0; S < r.length; S++) {
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
      children: Tn(n._wrapperState.initialValue)
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
      initialValue: Sa(a)
    };
  }
  function Yv(e, t) {
    var n = e, a = Sa(t.value), r = Sa(t.defaultValue);
    if (a != null) {
      var i = Tn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Tn(r));
  }
  function Iv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function wE(e, t) {
    Yv(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", _E = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return _E;
      default:
        return or;
    }
  }
  function wf(e, t) {
    return e == null || e === or ? jf(t) : e === Tf && t === "foreignObject" ? or : e;
  }
  var OE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, ms, qv = OE(function(e, t) {
    if (e.namespaceURI === Tf && !("innerHTML" in e)) {
      ms = ms || document.createElement("div"), ms.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = ms.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Fn = 1, ur = 3, jt = 8, sr = 9, _f = 11, vs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, LE = {
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
  function ME(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var AE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    AE.forEach(function(t) {
      Eo[ME(t, e)] = Eo[e];
    });
  });
  function Of(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (ha(t, e), ("" + t).trim());
  }
  var VE = /([A-Z])/g, kE = /^ms-/;
  function UE(e) {
    return e.replace(VE, "-$1").toLowerCase().replace(kE, "-ms-");
  }
  var Gv = function() {
  };
  {
    var FE = /^(?:webkit|moz|o)[A-Z]/, zE = /^-ms-/, HE = /-(.)/g, Wv = /;\s*$/, il = {}, Lf = {}, Qv = !1, Kv = !1, BE = function(e) {
      return e.replace(HE, function(t, n) {
        return n.toUpperCase();
      });
    }, PE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        BE(e.replace(zE, "ms-"))
      ));
    }, $E = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, YE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Wv, "")));
    }, IE = function(e, t) {
      Qv || (Qv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, qE = function(e, t) {
      Kv || (Kv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Gv = function(e, t) {
      e.indexOf("-") > -1 ? PE(e) : FE.test(e) ? $E(e) : Wv.test(t) && YE(e, t), typeof t == "number" && (isNaN(t) ? IE(e, t) : isFinite(t) || qE(e, t));
    };
  }
  var GE = Gv;
  function WE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : UE(a)) + ":", t += Of(a, r, i), n = ";";
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
        r || GE(a, t[a]);
        var i = Of(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function QE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Jv(e) {
    var t = {};
    for (var n in e)
      for (var a = LE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function KE(e, t) {
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
          r[s] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", QE(e[l]) ? "Removing" : "Updating", l, o);
        }
      }
    }
  }
  var XE = {
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
  }, JE = ze({
    menuitem: !0
  }, XE), ZE = "__html";
  function Mf(e, t) {
    if (t) {
      if (JE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(ZE in t.dangerouslySetInnerHTML))
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
  }, ll = {}, eS = new RegExp("^(aria)-[" + ee + "]*$"), tS = new RegExp("^(aria)[A-Z][" + ee + "]*$");
  function nS(e, t) {
    {
      if (Vn.call(ll, t) && ll[t])
        return !0;
      if (tS.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = Zv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ll[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ll[t] = !0, !0;
      }
      if (eS.test(t)) {
        var r = t.toLowerCase(), i = Zv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ll[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ll[t] = !0, !0;
      }
    }
    return !0;
  }
  function aS(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = nS(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function rS(e, t) {
    Ni(e, t) || aS(e, t);
  }
  var eh = !1;
  function iS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !eh && (eh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var th = function() {
  };
  {
    var jn = {}, nh = /^on./, lS = /^on[^A-Z]/, oS = new RegExp("^(aria)-[" + ee + "]*$"), uS = new RegExp("^(aria)[A-Z][" + ee + "]*$");
    th = function(e, t, n, a) {
      if (Vn.call(jn, t) && jn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), jn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var o = l.hasOwnProperty(r) ? l[r] : null;
        if (o != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, o), jn[t] = !0, !0;
        if (nh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), jn[t] = !0, !0;
      } else if (nh.test(t))
        return lS.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), jn[t] = !0, !0;
      if (oS.test(t) || uS.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), jn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), jn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), jn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), jn[t] = !0, !0;
      var s = Nt(t), m = s !== null && s.type === tn;
      if (hs.hasOwnProperty(r)) {
        var h = hs[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), jn[t] = !0, !0;
      } else if (!m && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), jn[t] = !0, !0;
      return typeof n == "boolean" && gt(t, n, s, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), jn[t] = !0, !0) : m ? !0 : gt(t, n, s, !1) ? (jn[t] = !0, !1) : ((n === "false" || n === "true") && s !== null && s.type === Ot && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), jn[t] = !0), !0);
    };
  }
  var sS = function(e, t, n) {
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
  function cS(e, t, n) {
    Ni(e, t) || sS(e, t, n);
  }
  var ah = 1, Af = 2, So = 4, fS = ah | Af | So, xo = null;
  function dS(e) {
    xo !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), xo = e;
  }
  function pS() {
    xo === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), xo = null;
  }
  function mS(e) {
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
  function vS(e) {
    kf = e;
  }
  function ih(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function hS() {
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
  function yS() {
    var e = hS();
    e && (uh(), lh());
  }
  function sh(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return oh(e, t, n);
    } finally {
      Uf = !1, yS();
    }
  }
  function gS(e, t, n) {
    oh = e, uh = n;
  }
  function bS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function NS(e, t, n) {
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
        return !!(n.disabled && bS(t));
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
    if (NS(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Ff = !1;
  if (en)
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
      var h = document.createEvent("Event"), x = !1, S = !0, L = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        zf.removeEventListener(H, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = L);
      }
      var ne = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        x = !0, z(), n.apply(a, ne), S = !1;
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
      if (window.addEventListener("error", j), zf.addEventListener(H, Ee, !1), h.initEvent(H, !1, !1), zf.dispatchEvent(h), A && Object.defineProperty(window, "event", A), x && S && (qe ? Be && (me = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : me = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(me)), window.removeEventListener("error", j), !x)
        return z(), ch.apply(this, arguments);
    };
  }
  var ES = fh, sl = !1, ys = null, gs = !1, Hf = null, SS = {
    onError: function(e) {
      sl = !0, ys = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, o, s) {
    sl = !1, ys = null, ES.apply(SS, arguments);
  }
  function xS(e, t, n, a, r, i, l, o, s) {
    if (Bf.apply(this, arguments), sl) {
      var m = Pf();
      gs || (gs = !0, Hf = m);
    }
  }
  function RS() {
    if (gs) {
      var e = Hf;
      throw gs = !1, Hf = null, e;
    }
  }
  function CS() {
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
  function DS(e) {
    return e._reactInternals !== void 0;
  }
  function TS(e, t) {
    e._reactInternals = t;
  }
  var Ce = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), wt = (
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
  ), dh = (
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
  ), $f = (
    /*             */
    16384
  ), jS = (
    /*               */
    32767
  ), bs = (
    /*                   */
    32768
  ), wn = (
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
    Ke | dl | 0
  ), Qf = wt | Ke | Ei | Do | Si | fr | xi, To = Ke | dh | Si | xi, pl = Vr | Ei, dr = Ri | qf | If, wS = v.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (wt | fr)) !== Ce && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === E ? n : null;
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
    return e.tag === E ? e.stateNode.containerInfo : null;
  }
  function _S(e) {
    return Ci(e) === e;
  }
  function OS(e) {
    {
      var t = wS.current;
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
    if (a.tag !== E)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function gh(e) {
    var t = yh(e);
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
  function LS(e) {
    var t = yh(e);
    return t !== null ? Nh(t) : null;
  }
  function Nh(e) {
    if (e.tag === V || e.tag === Q)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== _) {
        var n = Nh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Eh = p.unstable_scheduleCallback, MS = p.unstable_cancelCallback, AS = p.unstable_shouldYield, VS = p.unstable_requestPaint, qt = p.unstable_now, kS = p.unstable_getCurrentPriorityLevel, Ns = p.unstable_ImmediatePriority, Kf = p.unstable_UserBlockingPriority, Di = p.unstable_NormalPriority, US = p.unstable_LowPriority, Xf = p.unstable_IdlePriority, FS = p.unstable_yieldValue, zS = p.unstable_setDisableYieldValue, ml = null, hn = null, le = null, Pa = !1, xa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function HS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Yn && (e = ze({}, e, {
        getLaneLabelMap: qS,
        injectProfilingHooks: IS
      })), ml = t.inject(e), hn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function BS(e, t) {
    if (hn && typeof hn.onScheduleFiberRoot == "function")
      try {
        hn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function PS(e, t) {
    if (hn && typeof hn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Xe) === Xe;
        if (Xt) {
          var a;
          switch (t) {
            case Kn:
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
          hn.onCommitFiberRoot(ml, e, a, n);
        }
      } catch (r) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function $S(e) {
    if (hn && typeof hn.onPostCommitFiberRoot == "function")
      try {
        hn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function YS(e) {
    if (hn && typeof hn.onCommitFiberUnmount == "function")
      try {
        hn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof FS == "function" && (zS(e), y(e)), hn && typeof hn.setStrictMode == "function")
      try {
        hn.setStrictMode(ml, e);
      } catch (t) {
        Pa || (Pa = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function IS(e) {
    le = e;
  }
  function qS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Zf; n++) {
        var a = dx(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function GS(e) {
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
  function WS(e) {
    le !== null && typeof le.markComponentPassiveEffectMountStarted == "function" && le.markComponentPassiveEffectMountStarted(e);
  }
  function QS() {
    le !== null && typeof le.markComponentPassiveEffectMountStopped == "function" && le.markComponentPassiveEffectMountStopped();
  }
  function KS(e) {
    le !== null && typeof le.markComponentPassiveEffectUnmountStarted == "function" && le.markComponentPassiveEffectUnmountStarted(e);
  }
  function XS() {
    le !== null && typeof le.markComponentPassiveEffectUnmountStopped == "function" && le.markComponentPassiveEffectUnmountStopped();
  }
  function JS(e) {
    le !== null && typeof le.markComponentLayoutEffectMountStarted == "function" && le.markComponentLayoutEffectMountStarted(e);
  }
  function ZS() {
    le !== null && typeof le.markComponentLayoutEffectMountStopped == "function" && le.markComponentLayoutEffectMountStopped();
  }
  function xh(e) {
    le !== null && typeof le.markComponentLayoutEffectUnmountStarted == "function" && le.markComponentLayoutEffectUnmountStarted(e);
  }
  function Rh() {
    le !== null && typeof le.markComponentLayoutEffectUnmountStopped == "function" && le.markComponentLayoutEffectUnmountStopped();
  }
  function ex(e, t, n) {
    le !== null && typeof le.markComponentErrored == "function" && le.markComponentErrored(e, t, n);
  }
  function tx(e, t, n) {
    le !== null && typeof le.markComponentSuspended == "function" && le.markComponentSuspended(e, t, n);
  }
  function nx(e) {
    le !== null && typeof le.markLayoutEffectsStarted == "function" && le.markLayoutEffectsStarted(e);
  }
  function ax() {
    le !== null && typeof le.markLayoutEffectsStopped == "function" && le.markLayoutEffectsStopped();
  }
  function rx(e) {
    le !== null && typeof le.markPassiveEffectsStarted == "function" && le.markPassiveEffectsStarted(e);
  }
  function ix() {
    le !== null && typeof le.markPassiveEffectsStopped == "function" && le.markPassiveEffectsStopped();
  }
  function Ch(e) {
    le !== null && typeof le.markRenderStarted == "function" && le.markRenderStarted(e);
  }
  function lx() {
    le !== null && typeof le.markRenderYielded == "function" && le.markRenderYielded();
  }
  function Dh() {
    le !== null && typeof le.markRenderStopped == "function" && le.markRenderStopped();
  }
  function ox(e) {
    le !== null && typeof le.markRenderScheduled == "function" && le.markRenderScheduled(e);
  }
  function ux(e, t) {
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
  ), $a = (
    /*              */
    16
  ), Th = Math.clz32 ? Math.clz32 : fx, sx = Math.log, cx = Math.LN2;
  function fx(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (sx(t) / cx | 0) | 0;
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
  ), Wn = (
    /*                   */
    1073741824
  );
  function dx(e) {
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
      if (e & Es)
        return "Retry";
      if (e & Oo)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & ji)
        return "Idle";
      if (e & Wn)
        return "Offscreen";
    }
  }
  var st = -1, Ss = _o, xs = gl;
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
      case Wn:
        return Wn;
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
      for (var L = e.entanglements, A = a & S; A > 0; ) {
        var z = _i(A), ne = 1 << z;
        a |= L[z], A &= ~ne;
      }
    return a;
  }
  function px(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function mx(e, t) {
    switch (e) {
      case _e:
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
      case Wn:
        return st;
      default:
        return f("Should have found matching lanes. This is a bug in React."), st;
    }
  }
  function vx(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), s = 1 << o, m = i[o];
      m === st ? ((s & a) === Y || (s & r) !== Y) && (i[o] = mx(s, t)) : m <= t && (e.expiredLanes |= s), l &= ~s;
    }
  }
  function hx(e) {
    return Mo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~Wn;
    return t !== Y ? t : t & Wn ? Wn : Y;
  }
  function yx(e) {
    return (e & _e) !== Y;
  }
  function Nd(e) {
    return (e & wh) !== Y;
  }
  function _h(e) {
    return (e & Es) === e;
  }
  function gx(e) {
    var t = _e | pr | Ya;
    return (e & t) === Y;
  }
  function bx(e) {
    return (e & yl) === e;
  }
  function Cs(e, t) {
    var n = hl | pr | Ti | Ya;
    return (t & n) !== Y;
  }
  function Nx(e, t) {
    return (t & e.expiredLanes) !== Y;
  }
  function Oh(e) {
    return (e & yl) !== Y;
  }
  function Lh() {
    var e = Ss;
    return Ss <<= 1, (Ss & yl) === Y && (Ss = _o), e;
  }
  function Ex() {
    var e = xs;
    return xs <<= 1, (xs & Es) === Y && (xs = gl), e;
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
  function Qn(e, t) {
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
  function j_(e) {
    return e;
  }
  function Sx(e, t) {
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
  function xx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function Ah(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function Rx(e, t) {
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
  function Cx(e, t) {
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
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
  }
  function Vh(e, t, n) {
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
          var s = o.alternate;
          (s === null || !a.has(s)) && a.add(o);
        }), l.clear()), t &= ~i;
      }
  }
  function Uh(e, t) {
    return null;
  }
  var Kn = _e, mr = pr, vr = Ya, Ts = ji, ko = Wt;
  function Ra() {
    return ko;
  }
  function Qt(e) {
    ko = e;
  }
  function Dx(e, t) {
    var n = ko;
    try {
      return ko = e, t();
    } finally {
      ko = n;
    }
  }
  function Tx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function jx(e, t) {
    return e > t ? e : t;
  }
  function Rd(e, t) {
    return e !== 0 && e < t;
  }
  function Fh(e) {
    var t = wi(e);
    return Rd(Kn, t) ? Rd(mr, t) ? Nd(t) ? vr : Ts : mr : Kn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var zh;
  function wx(e) {
    zh = e;
  }
  function _x(e) {
    zh(e);
  }
  var Cd;
  function Ox(e) {
    Cd = e;
  }
  var Hh;
  function Lx(e) {
    Hh = e;
  }
  var Bh;
  function Mx(e) {
    Bh = e;
  }
  var Ph;
  function Ax(e) {
    Ph = e;
  }
  var Dd = !1, ws = [], Ur = null, Fr = null, zr = null, Uo = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Map(), Hr = [], Vx = [
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
  function kx(e) {
    return Vx.indexOf(e) > -1;
  }
  function Ux(e, t, n, a, r) {
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
      var l = Ux(t, n, a, r, i);
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
  function Fx(e, t, n, a, r) {
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
        var h = r, x = h.pointerId;
        return Fo.set(x, zo(Fo.get(x) || null, e, t, n, a, h)), !0;
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
        } else if (a === E) {
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
  function zx(e) {
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
        dS(i), r.target.dispatchEvent(i), pS();
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
  function Hx() {
    Dd = !1, Ur !== null && _s(Ur) && (Ur = null), Fr !== null && _s(Fr) && (Fr = null), zr !== null && _s(zr) && (zr = null), Uo.forEach(Ih), Fo.forEach(Ih);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, Hx)));
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
  function Bx() {
    return Td;
  }
  function Px(e, t, n) {
    var a = Gh(t), r;
    switch (a) {
      case Kn:
        r = $x;
        break;
      case mr:
        r = Yx;
        break;
      case vr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function $x(e, t, n, a) {
    var r = Ra(), i = Nl.transition;
    Nl.transition = null;
    try {
      Qt(Kn), jd(e, t, n, a);
    } finally {
      Qt(r), Nl.transition = i;
    }
  }
  function Yx(e, t, n, a) {
    var r = Ra(), i = Nl.transition;
    Nl.transition = null;
    try {
      Qt(mr), jd(e, t, n, a);
    } finally {
      Qt(r), Nl.transition = i;
    }
  }
  function jd(e, t, n, a) {
    Td && Ix(e, t, n, a);
  }
  function Ix(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      $d(e, t, a, Os, n), $h(e, a);
      return;
    }
    if (Fx(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if ($h(e, a), t & So && kx(e)) {
      for (; r !== null; ) {
        var i = $r(r);
        i !== null && _x(i);
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
        } else if (o === E) {
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
        return Kn;
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
        var t = kS();
        switch (t) {
          case Ns:
            return Kn;
          case Kf:
            return mr;
          case Di:
          case US:
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
  function qx(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function Gx(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function Wx(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function Qx(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Po = null, _d = null, $o = null;
  function Kx(e) {
    return Po = e, _d = Qh(), !0;
  }
  function Xx() {
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
  function Xn(e) {
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
  }, Od = Xn(El), Yo = ze({}, El, {
    view: 0,
    detail: 0
  }), Jx = Xn(Yo), Ld, Md, Io;
  function Zx(e) {
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
      return "movementX" in e ? e.movementX : (Zx(e), Ld);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Md;
    }
  }), Xh = Xn(As), eR = ze({}, As, {
    dataTransfer: 0
  }), tR = Xn(eR), nR = ze({}, Yo, {
    relatedTarget: 0
  }), Ad = Xn(nR), aR = ze({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), rR = Xn(aR), iR = ze({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), lR = Xn(iR), oR = ze({}, El, {
    data: 0
  }), Jh = Xn(oR), uR = Jh, sR = {
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
  }, cR = {
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
  function fR(e) {
    if (e.key) {
      var t = sR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ls(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? cR[e.keyCode] || "Unidentified" : "";
  }
  var dR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function pR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = dR[e];
    return a ? !!n[a] : !1;
  }
  function Vd(e) {
    return pR;
  }
  var mR = ze({}, Yo, {
    key: fR,
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
  }), vR = Xn(mR), hR = ze({}, As, {
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
  }), Zh = Xn(hR), yR = ze({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vd
  }), gR = Xn(yR), bR = ze({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), NR = Xn(bR), ER = ze({}, As, {
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
  }), SR = Xn(ER), xR = [9, 13, 27, 32], ey = 229, kd = en && "CompositionEvent" in window, qo = null;
  en && "documentMode" in document && (qo = document.documentMode);
  var RR = en && "TextEvent" in window && !qo, ty = en && (!kd || qo && qo > 8 && qo <= 11), ny = 32, ay = String.fromCharCode(ny);
  function CR() {
    Jt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Jt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Jt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Jt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var ry = !1;
  function DR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function TR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function jR(e, t) {
    return e === "keydown" && t.keyCode === ey;
  }
  function iy(e, t) {
    switch (e) {
      case "keyup":
        return xR.indexOf(t.keyCode) !== -1;
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
  var Sl = !1;
  function wR(e, t, n, a, r) {
    var i, l;
    if (kd ? i = TR(t) : Sl ? iy(t, a) && (i = "onCompositionEnd") : jR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ty && !oy(a) && (!Sl && i === "onCompositionStart" ? Sl = Kx(r) : i === "onCompositionEnd" && Sl && (l = Wh()));
    var o = zs(n, i);
    if (o.length > 0) {
      var s = new Jh(i, t, null, a, r);
      if (e.push({
        event: s,
        listeners: o
      }), l)
        s.data = l;
      else {
        var m = ly(a);
        m !== null && (s.data = m);
      }
    }
  }
  function _R(e, t) {
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
  function OR(e, t) {
    if (Sl) {
      if (e === "compositionend" || !kd && iy(e, t)) {
        var n = Wh();
        return Xx(), Sl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!DR(t)) {
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
  function LR(e, t, n, a, r) {
    var i;
    if (RR ? i = _R(t, a) : i = OR(t, a), !i)
      return null;
    var l = zs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new uR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function MR(e, t, n, a, r, i, l) {
    wR(e, t, n, a, r), LR(e, t, n, a, r);
  }
  var AR = {
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
    return t === "input" ? !!AR[e.type] : t === "textarea";
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
  function VR(e) {
    if (!en)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function kR() {
    Jt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
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
  function UR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function FR(e) {
    var t = [];
    sy(t, Wo, e, Vf(e)), sh(zR, t);
  }
  function zR(e) {
    Ty(e, 0);
  }
  function Vs(e) {
    var t = jl(e);
    if (ho(t))
      return e;
  }
  function HR(e, t) {
    if (e === "change")
      return t;
  }
  var cy = !1;
  en && (cy = VR("input") && (!document.documentMode || document.documentMode > 9));
  function BR(e, t) {
    Go = e, Wo = t, Go.attachEvent("onpropertychange", dy);
  }
  function fy() {
    Go && (Go.detachEvent("onpropertychange", dy), Go = null, Wo = null);
  }
  function dy(e) {
    e.propertyName === "value" && Vs(Wo) && FR(e);
  }
  function PR(e, t, n) {
    e === "focusin" ? (fy(), BR(t, n)) : e === "focusout" && fy();
  }
  function $R(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vs(Wo);
  }
  function YR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function IR(e, t) {
    if (e === "click")
      return Vs(t);
  }
  function qR(e, t) {
    if (e === "input" || e === "change")
      return Vs(t);
  }
  function GR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function WR(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window, s, m;
    if (UR(o) ? s = HR : uy(o) ? cy ? s = qR : (s = $R, m = PR) : YR(o) && (s = IR), s) {
      var h = s(t, n);
      if (h) {
        sy(e, h, a, r);
        return;
      }
    }
    m && m(t, o, n), t === "focusout" && GR(o);
  }
  function QR() {
    Zt("onMouseEnter", ["mouseout", "mouseover"]), Zt("onMouseLeave", ["mouseout", "mouseover"]), Zt("onPointerEnter", ["pointerout", "pointerover"]), Zt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function KR(e, t, n, a, r, i, l) {
    var o = t === "mouseover" || t === "pointerover", s = t === "mouseout" || t === "pointerout";
    if (o && !mS(a)) {
      var m = a.relatedTarget || a.fromElement;
      if (m && (Mi(m) || su(m)))
        return;
    }
    if (!(!s && !o)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var x = r.ownerDocument;
        x ? h = x.defaultView || x.parentWindow : h = window;
      }
      var S, L;
      if (s) {
        var A = a.relatedTarget || a.toElement;
        if (S = n, L = A ? Mi(A) : null, L !== null) {
          var z = Ci(L);
          (L !== z || L.tag !== V && L.tag !== Q) && (L = null);
        }
      } else
        S = null, L = n;
      if (S !== L) {
        var ne = Xh, Ee = "onMouseLeave", me = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (ne = Zh, Ee = "onPointerLeave", me = "onPointerEnter", qe = "pointer");
        var Be = S == null ? h : jl(S), j = L == null ? h : jl(L), H = new ne(Ee, qe + "leave", S, a, r);
        H.target = Be, H.relatedTarget = j;
        var w = null, W = Mi(r);
        if (W === n) {
          var se = new ne(me, qe + "enter", L, a, r);
          se.target = j, se.relatedTarget = Be, w = se;
        }
        NC(e, H, w, S, L);
      }
    }
  }
  function XR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jn = typeof Object.is == "function" ? Object.is : XR;
  function Qo(e, t) {
    if (Jn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Vn.call(t, i) || !Jn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function py(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function JR(e) {
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
      n = py(JR(n));
    }
  }
  function ZR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, o = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return eC(e, r, i, l, o);
  }
  function eC(e, t, n, a, r) {
    var i = 0, l = -1, o = -1, s = 0, m = 0, h = e, x = null;
    e: for (; ; ) {
      for (var S = null; h === t && (n === 0 || h.nodeType === ur) && (l = i + n), h === a && (r === 0 || h.nodeType === ur) && (o = i + r), h.nodeType === ur && (i += h.nodeValue.length), (S = h.firstChild) !== null; )
        x = h, h = S;
      for (; ; ) {
        if (h === e)
          break e;
        if (x === t && ++s === n && (l = i), x === a && ++m === r && (o = i), (S = h.nextSibling) !== null)
          break;
        h = x, x = h.parentNode;
      }
      h = S;
    }
    return l === -1 || o === -1 ? null : {
      start: l,
      end: o
    };
  }
  function tC(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), o = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > o) {
        var s = o;
        o = l, l = s;
      }
      var m = my(e, l), h = my(e, o);
      if (m && h) {
        if (r.rangeCount === 1 && r.anchorNode === m.node && r.anchorOffset === m.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var x = n.createRange();
        x.setStart(m.node, m.offset), r.removeAllRanges(), l > o ? (r.addRange(x), r.extend(h.node, h.offset)) : (x.setEnd(h.node, h.offset), r.addRange(x));
      }
    }
  }
  function vy(e) {
    return e && e.nodeType === ur;
  }
  function hy(e, t) {
    return !e || !t ? !1 : e === t ? !0 : vy(e) ? !1 : vy(t) ? hy(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function nC(e) {
    return e && e.ownerDocument && hy(e.ownerDocument.documentElement, e);
  }
  function aC(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function yy() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (aC(t))
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
  function rC() {
    var e = yy();
    return {
      focusedElem: e,
      selectionRange: Ud(e) ? lC(e) : null
    };
  }
  function iC(e) {
    var t = yy(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && nC(n)) {
      a !== null && Ud(n) && oC(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === Fn && r.push({
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
  function lC(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = ZR(e), t || {
      start: 0,
      end: 0
    };
  }
  function oC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : tC(e, t);
  }
  var uC = en && "documentMode" in document && document.documentMode <= 11;
  function sC() {
    Jt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var xl = null, Fd = null, Ko = null, zd = !1;
  function cC(e) {
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
  function fC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function gy(e, t, n) {
    var a = fC(n);
    if (!(zd || xl == null || xl !== ir(a))) {
      var r = cC(xl);
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
  function dC(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (uy(o) || o.contentEditable === "true") && (xl = o, Fd = n, Ko = null);
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
        zd = !1, gy(e, a, r);
        break;
      case "selectionchange":
        if (uC)
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
  en && (by = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
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
  var Ny = Us("animationend"), Ey = Us("animationiteration"), Sy = Us("animationstart"), xy = Us("transitionend"), Ry = /* @__PURE__ */ new Map(), Cy = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Br(e, t) {
    Ry.set(e, t), Jt(t, [e]);
  }
  function pC() {
    for (var e = 0; e < Cy.length; e++) {
      var t = Cy[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Br(n, "on" + a);
    }
    Br(Ny, "onAnimationEnd"), Br(Ey, "onAnimationIteration"), Br(Sy, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(xy, "onTransitionEnd");
  }
  function mC(e, t, n, a, r, i, l) {
    var o = Ry.get(t);
    if (o !== void 0) {
      var s = Od, m = t;
      switch (t) {
        case "keypress":
          if (Ls(a) === 0)
            return;
        case "keydown":
        case "keyup":
          s = vR;
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
          s = tR;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          s = gR;
          break;
        case Ny:
        case Ey:
        case Sy:
          s = rR;
          break;
        case xy:
          s = NR;
          break;
        case "scroll":
          s = Jx;
          break;
        case "wheel":
          s = SR;
          break;
        case "copy":
        case "cut":
        case "paste":
          s = lR;
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
        var x = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", S = gC(n, o, a.type, h, x);
        if (S.length > 0) {
          var L = new s(o, m, null, a, r);
          e.push({
            event: L,
            listeners: S
          });
        }
      }
    }
  }
  pC(), QR(), kR(), sC(), CR();
  function vC(e, t, n, a, r, i, l) {
    mC(e, t, n, a, r, i);
    var o = (i & fS) === 0;
    o && (KR(e, t, n, a, r), WR(e, t, n, a, r), dC(e, t, n, a, r), MR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function Dy(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, xS(a, t, void 0, e), e.currentTarget = null;
  }
  function hC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, o = i.currentTarget, s = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Dy(e, s, o), a = l;
      }
    else
      for (var m = 0; m < t.length; m++) {
        var h = t[m], x = h.instance, S = h.currentTarget, L = h.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        Dy(e, L, S), a = x;
      }
  }
  function Ty(e, t) {
    for (var n = (t & So) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      hC(i, l, n);
    }
    RS();
  }
  function yC(e, t, n, a, r) {
    var i = Vf(n), l = [];
    vC(l, e, a, n, i, t), Ty(l, t);
  }
  function pt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = G0(t), r = EC(e);
    a.has(r) || (jy(t, e, Af, n), a.add(r));
  }
  function Pd(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= So), jy(n, e, a, t);
  }
  var Fs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[Fs]) {
      e[Fs] = !0, In.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || Pd(n, !1, e), Pd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[Fs] || (t[Fs] = !0, Pd("selectionchange", !1, t)));
    }
  }
  function jy(e, t, n, a, r) {
    var i = Px(e, t, n), l = void 0;
    Ff && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? Wx(e, t, i, l) : Gx(e, t, i) : l !== void 0 ? Qx(e, t, i, l) : qx(e, t, i);
  }
  function wy(e, t) {
    return e === t || e.nodeType === jt && e.parentNode === t;
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
          if (s === E || s === _) {
            var m = o.stateNode.containerInfo;
            if (wy(m, l))
              break;
            if (s === _)
              for (var h = o.return; h !== null; ) {
                var x = h.tag;
                if (x === E || x === _) {
                  var S = h.stateNode.containerInfo;
                  if (wy(S, l))
                    return;
                }
                h = h.return;
              }
            for (; m !== null; ) {
              var L = Mi(m);
              if (L === null)
                return;
              var A = L.tag;
              if (A === V || A === Q) {
                o = i = L;
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
      return yC(e, t, n, i);
    });
  }
  function Zo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function gC(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, o = a ? l : t, s = [], m = e, h = null; m !== null; ) {
      var x = m, S = x.stateNode, L = x.tag;
      if (L === V && S !== null && (h = S, o !== null)) {
        var A = Ro(m, o);
        A != null && s.push(Zo(m, A, h));
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
  function bC(e, t) {
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
  function _y(e, t, n, a, r) {
    for (var i = t._reactName, l = [], o = n; o !== null && o !== a; ) {
      var s = o, m = s.alternate, h = s.stateNode, x = s.tag;
      if (m !== null && m === a)
        break;
      if (x === V && h !== null) {
        var S = h;
        if (r) {
          var L = Ro(o, i);
          L != null && l.unshift(Zo(o, L, S));
        } else if (!r) {
          var A = Ro(o, i);
          A != null && l.push(Zo(o, A, S));
        }
      }
      o = o.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function NC(e, t, n, a, r) {
    var i = a && r ? bC(a, r) : null;
    a !== null && _y(e, t, a, i, !1), r !== null && n !== null && _y(e, n, r, i, !0);
  }
  function EC(e, t) {
    return e + "__bubble";
  }
  var zn = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Pr = "suppressHydrationWarning", Oy = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Ly, $s, My, Ay;
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
    rS(e, t), iS(e, t), cS(e, t, {
      registrationNameDependencies: Rt,
      possibleRegistrationNames: qn
    });
  }, My = en && !document.documentMode, tu = function(e, t, n) {
    if (!zn) {
      var a = Ys(n), r = Ys(t);
      r !== a && (zn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ly = function(e) {
    if (!zn) {
      zn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, $s = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Ay = function(e, t) {
    var n = e.namespaceURI === or ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var SC = /\r\n?/g, xC = /\u0000|\uFFFD/g;
  function Ys(e) {
    kn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(SC, `
`).replace(xC, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (zn || (zn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Vy(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function RC() {
  }
  function qs(e) {
    e.onclick = RC;
  }
  function CC(e, t, n, a, r) {
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
        else i === Hs || i === Pr || i === Oy || (Rt.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && pt("scroll", t)) : l != null && ba(t, i, l, r));
      }
  }
  function DC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Xv(e, l) : i === eu ? qv(e, l) : i === Oi ? vs(e, l) : ba(e, i, l, a);
    }
  }
  function TC(e, t, n, a) {
    var r, i = Vy(n), l, o = a;
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
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Vn.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function jC(e, t) {
    return Vy(t).createTextNode(e);
  }
  function wC(e, t, n, a) {
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
        ds(e, n), i = yo(e, n), pt("invalid", e);
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
    switch (Mf(t, i), CC(t, e, a, i, r), t) {
      case "input":
        gi(e), M(e, n, !1);
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
  function _C(e, t, n, a, r) {
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
    Mf(t, o);
    var s, m, h = null;
    for (s in l)
      if (!(o.hasOwnProperty(s) || !l.hasOwnProperty(s) || l[s] == null))
        if (s === Li) {
          var x = l[s];
          for (m in x)
            x.hasOwnProperty(m) && (h || (h = {}), h[m] = "");
        } else s === eu || s === Oi || s === Hs || s === Pr || s === Oy || (Rt.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in o) {
      var S = o[s], L = l != null ? l[s] : void 0;
      if (!(!o.hasOwnProperty(s) || S === L || S == null && L == null))
        if (s === Li)
          if (S && Object.freeze(S), L) {
            for (m in L)
              L.hasOwnProperty(m) && (!S || !S.hasOwnProperty(m)) && (h || (h = {}), h[m] = "");
            for (m in S)
              S.hasOwnProperty(m) && L[m] !== S[m] && (h || (h = {}), h[m] = S[m]);
          } else
            h || (i || (i = []), i.push(s, h)), h = S;
        else if (s === eu) {
          var A = S ? S[Bs] : void 0, z = L ? L[Bs] : void 0;
          A != null && z !== A && (i = i || []).push(s, A);
        } else s === Oi ? (typeof S == "string" || typeof S == "number") && (i = i || []).push(s, "" + S) : s === Hs || s === Pr || (Rt.hasOwnProperty(s) ? (S != null && (typeof S != "function" && $s(s, S), s === "onScroll" && pt("scroll", e)), !i && L !== S && (i = [])) : (i = i || []).push(s, S));
    }
    return h && (KE(h, o[Li]), (i = i || []).push(Li, h)), i;
  }
  function OC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && c(e, r);
    var i = Ni(n, a), l = Ni(n, r);
    switch (DC(e, t, i, l), n) {
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
  function LC(e) {
    {
      var t = e.toLowerCase();
      return hs.hasOwnProperty(t) && hs[t] || null;
    }
  }
  function MC(e, t, n, a, r, i, l) {
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
    var L = null;
    for (var A in n)
      if (n.hasOwnProperty(A)) {
        var z = n[A];
        if (A === Oi)
          typeof z == "string" ? e.textContent !== z && (n[Pr] !== !0 && Is(e.textContent, z, i, l), L = [Oi, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Pr] !== !0 && Is(e.textContent, z, i, l), L = [Oi, "" + z]);
        else if (Rt.hasOwnProperty(A))
          z != null && (typeof z != "function" && $s(A, z), A === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var ne = void 0, Ee = Nt(A);
          if (n[Pr] !== !0) {
            if (!(A === Hs || A === Pr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            A === "value" || A === "checked" || A === "selected")) {
              if (A === eu) {
                var me = e.innerHTML, qe = z ? z[Bs] : void 0;
                if (qe != null) {
                  var Be = Ay(e, qe);
                  Be !== me && tu(A, me, Be);
                }
              } else if (A === Li) {
                if (s.delete(A), My) {
                  var j = WE(z);
                  ne = e.getAttribute("style"), j !== ne && tu(A, ne, j);
                }
              } else if (o && !Sn)
                s.delete(A.toLowerCase()), ne = ci(e, A, z), z !== ne && tu(A, ne, z);
              else if (!yt(A, Ee, o) && !mn(A, z, Ee, o)) {
                var H = !1;
                if (Ee !== null)
                  s.delete(Ee.attributeName), ne = Xi(e, A, z, Ee);
                else {
                  var w = a;
                  if (w === or && (w = jf(t)), w === or)
                    s.delete(A.toLowerCase());
                  else {
                    var W = LC(A);
                    W !== null && W !== A && (H = !0, s.delete(W)), s.delete(A);
                  }
                  ne = ci(e, A, z);
                }
                var se = Sn;
                !se && z !== ne && !H && tu(A, ne, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    s.size > 0 && n[Pr] !== !0 && Ly(s), t) {
      case "input":
        gi(e), M(e, n, !0);
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
    return L;
  }
  function AC(e, t, n) {
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
  function VC(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
        return;
      case "textarea":
        wE(e, n);
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
    var kC = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], ky = [
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
    ], UC = ky.concat(["button"]), FC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Uy = {
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
      var n = ze({}, e || Uy), a = {
        tag: t
      };
      return ky.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), UC.indexOf(t) !== -1 && (n.pTagInButtonScope = null), kC.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var zC = function(e, t) {
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
          return FC.indexOf(t) === -1;
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
    }, HC = function(e, t) {
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
      var i = zC(e, r) ? null : a, l = i ? null : HC(e, n), o = i || l;
      if (o) {
        var s = o.tag, m = !!i + "|" + e + "|" + s;
        if (!Fy[m]) {
          Fy[m] = !0;
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
  var Gs = "suppressHydrationWarning", Ws = "$", Qs = "/$", ru = "$?", iu = "$!", BC = "style", Qd = null, Kd = null;
  function PC(e) {
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
        var i = a === jt ? e.parentNode : e, l = i.namespaceURI || null;
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
  function $C(e, t, n) {
    {
      var a = e, r = wf(a.namespace, t), i = au(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function w_(e) {
    return e;
  }
  function YC(e) {
    Qd = Bx(), Kd = rC();
    var t = null;
    return qh(!1), t;
  }
  function IC(e) {
    iC(Kd), qh(Qd), Qd = null, Kd = null;
  }
  function qC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (nu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var o = "" + t.children, s = au(l.ancestorInfo, e);
        nu(null, o, s);
      }
      i = l.namespace;
    }
    var m = TC(e, t, n, i);
    return uu(r, m), rp(m, t), m;
  }
  function GC(e, t) {
    e.appendChild(t);
  }
  function WC(e, t, n, a, r) {
    switch (wC(e, t, n, a), t) {
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
  function QC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var o = "" + a.children, s = au(l.ancestorInfo, t);
        nu(null, o, s);
      }
    }
    return _C(e, t, n, a);
  }
  function Xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function KC(e, t, n, a) {
    {
      var r = n;
      nu(null, e, r.ancestorInfo);
    }
    var i = jC(e, t);
    return uu(a, i), i;
  }
  function XC() {
    var e = window.event;
    return e === void 0 ? vr : Gh(e.type);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, JC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, zy = typeof Promise == "function" ? Promise : void 0, ZC = typeof queueMicrotask == "function" ? queueMicrotask : typeof zy < "u" ? function(e) {
    return zy.resolve(null).then(e).catch(e0);
  } : Jd;
  function e0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function t0(e, t, n, a) {
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
  function n0(e, t, n, a, r, i) {
    OC(e, t, n, a, r), rp(e, r);
  }
  function Hy(e) {
    vs(e, "");
  }
  function a0(e, t, n) {
    e.nodeValue = n;
  }
  function r0(e, t) {
    e.appendChild(t);
  }
  function i0(e, t) {
    var n;
    e.nodeType === jt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function l0(e, t, n) {
    e.insertBefore(t, n);
  }
  function o0(e, t, n) {
    e.nodeType === jt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function u0(e, t) {
    e.removeChild(t);
  }
  function s0(e, t) {
    e.nodeType === jt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ep(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === jt) {
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
  function c0(e, t) {
    e.nodeType === jt ? ep(e.parentNode, t) : e.nodeType === Fn && ep(e, t), Bo(e);
  }
  function f0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function d0(e) {
    e.nodeValue = "";
  }
  function p0(e, t) {
    e = e;
    var n = t[BC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Of("display", a);
  }
  function m0(e, t) {
    e.nodeValue = t;
  }
  function v0(e) {
    e.nodeType === Fn ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function h0(e, t, n) {
    return e.nodeType !== Fn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function y0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function g0(e) {
    return e.nodeType !== jt ? null : e;
  }
  function By(e) {
    return e.data === ru;
  }
  function tp(e) {
    return e.data === iu;
  }
  function b0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function N0(e, t) {
    e._reactRetry = t;
  }
  function Ks(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === Fn || t === ur)
        break;
      if (t === jt) {
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
  function E0(e) {
    return Ks(e.firstChild);
  }
  function S0(e) {
    return Ks(e.firstChild);
  }
  function x0(e) {
    return Ks(e.nextSibling);
  }
  function R0(e, t, n, a, r, i, l) {
    uu(i, e), rp(e, n);
    var o;
    {
      var s = r;
      o = s.namespace;
    }
    var m = (i.mode & Ye) !== xe;
    return MC(e, t, n, o, a, m, l);
  }
  function C0(e, t, n, a) {
    return uu(n, e), n.mode & Ye, AC(e, t);
  }
  function D0(e, t) {
    uu(t, e);
  }
  function T0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
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
      if (t.nodeType === jt) {
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
  function j0(e) {
    Bo(e);
  }
  function w0(e) {
    Bo(e);
  }
  function _0(e) {
    return e !== "head" && e !== "body";
  }
  function O0(e, t, n, a) {
    var r = !0;
    Is(t.nodeValue, n, a, r);
  }
  function L0(e, t, n, a, r, i) {
    if (t[Gs] !== !0) {
      var l = !0;
      Is(a.nodeValue, r, i, l);
    }
  }
  function M0(e, t) {
    t.nodeType === Fn ? Id(e, t) : t.nodeType === jt || qd(e, t);
  }
  function A0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Fn ? Id(n, t) : t.nodeType === jt || qd(n, t));
    }
  }
  function V0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === Fn ? Id(n, a) : a.nodeType === jt || qd(n, a));
  }
  function k0(e, t, n) {
    Gd(e, t);
  }
  function U0(e, t) {
    Wd(e, t);
  }
  function F0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Gd(a, t);
    }
  }
  function z0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Wd(n, t);
    }
  }
  function H0(e, t, n, a, r, i) {
    (i || t[Gs] !== !0) && Gd(n, a);
  }
  function B0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && Wd(n, a);
  }
  function P0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function $0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, Y0 = "__reactListeners$" + Dl, I0 = "__reactHandles$" + Dl;
  function q0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[Y0], delete e[I0];
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
  function Mi(e) {
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
    return t && (t.tag === V || t.tag === Q || t.tag === B || t.tag === E) ? t : null;
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
  function G0(e) {
    var t = e[ap];
    return t === void 0 && (t = e[ap] = /* @__PURE__ */ new Set()), t;
  }
  var Yy = {}, Iy = v.ReactDebugCurrentFrame;
  function Zs(e) {
    if (e) {
      var t = e._owner, n = co(e.type, e._source, t ? t.type : null);
      Iy.setExtraStackFrame(n);
    } else
      Iy.setExtraStackFrame(null);
  }
  function Ca(e, t, n, a, r) {
    {
      var i = Function.call.bind(Vn);
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
  function yn(e, t) {
    if (hr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ec[hr] && f("Unexpected Fiber popped."), e.current = ip[hr], ip[hr] = null, ec[hr] = null, hr--;
  }
  function gn(e, t, n) {
    hr++, ip[hr] = e.current, ec[hr] = n, e.current = t;
  }
  var lp;
  lp = {};
  var Zn = {};
  Object.freeze(Zn);
  var yr = Yr(Zn), Ia = Yr(!1), op = Zn;
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
        return Zn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var o = Ve(e) || "Unknown";
        Ca(a, i, "context", o);
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
    yn(Ia, e), yn(yr, e);
  }
  function up(e) {
    yn(Ia, e), yn(yr, e);
  }
  function Gy(e, t, n) {
    {
      if (yr.current !== Zn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      gn(yr, t, e), gn(Ia, n, e);
    }
  }
  function Wy(e, t, n) {
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
        Ca(r, l, "child context", s);
      }
      return ze({}, n, l);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Zn;
      return op = yr.current, gn(yr, n, e), gn(Ia, Ia.current, e), !0;
    }
  }
  function Qy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Wy(e, t, op);
        a.__reactInternalMemoizedMergedChildContext = r, yn(Ia, e), yn(yr, e), gn(yr, r, e), gn(Ia, n, e);
      } else
        yn(Ia, e), gn(Ia, n, e);
    }
  }
  function W0(e) {
    {
      if (!_S(e) || e.tag !== T)
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
  var Ir = 0, rc = 1, gr = null, sp = !1, cp = !1;
  function Ky(e) {
    gr === null ? gr = [e] : gr.push(e);
  }
  function Q0(e) {
    sp = !0, Ky(e);
  }
  function Xy() {
    sp && qr();
  }
  function qr() {
    if (!cp && gr !== null) {
      cp = !0;
      var e = 0, t = Ra();
      try {
        var n = !0, a = gr;
        for (Qt(Kn); e < a.length; e++) {
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
  var Ol = [], Ll = 0, ic = null, lc = 0, oa = [], ua = 0, Ai = null, br = 1, Nr = "";
  function K0(e) {
    return ki(), (e.flags & ph) !== Ce;
  }
  function X0(e) {
    return ki(), lc;
  }
  function J0() {
    var e = Nr, t = br, n = t & ~Z0(t);
    return n.toString(32) + e;
  }
  function Vi(e, t) {
    ki(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Jy(e, t, n) {
    ki(), oa[ua++] = br, oa[ua++] = Nr, oa[ua++] = Ai, Ai = e;
    var a = br, r = Nr, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, s = oc(t) + i;
    if (s > 30) {
      var m = i - i % 5, h = (1 << m) - 1, x = (l & h).toString(32), S = l >> m, L = i - m, A = oc(t) + L, z = o << L, ne = z | S, Ee = x + r;
      br = 1 << A | ne, Nr = Ee;
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
      Vi(e, n), Jy(e, n, a);
    }
  }
  function oc(e) {
    return 32 - Th(e);
  }
  function Z0(e) {
    return 1 << oc(e) - 1;
  }
  function dp(e) {
    for (; e === ic; )
      ic = Ol[--Ll], Ol[Ll] = null, lc = Ol[--Ll], Ol[Ll] = null;
    for (; e === Ai; )
      Ai = oa[--ua], oa[ua] = null, Nr = oa[--ua], oa[ua] = null, br = oa[--ua], oa[ua] = null;
  }
  function eD() {
    return ki(), Ai !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function tD(e, t) {
    ki(), oa[ua++] = br, oa[ua++] = Nr, oa[ua++] = Ai, br = t.id, Nr = t.overflow, Ai = e;
  }
  function ki() {
    an() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var nn = null, sa = null, Da = !1, Ui = !1, Gr = null;
  function nD() {
    Da && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Zy() {
    Ui = !0;
  }
  function aD() {
    return Ui;
  }
  function rD(e) {
    var t = e.stateNode.containerInfo;
    return sa = S0(t), nn = e, Da = !0, Gr = null, Ui = !1, !0;
  }
  function iD(e, t, n) {
    return sa = x0(t), nn = e, Da = !0, Gr = null, Ui = !1, n !== null && tD(e, n), !0;
  }
  function eg(e, t) {
    switch (e.tag) {
      case E: {
        M0(e.stateNode.containerInfo, t);
        break;
      }
      case V: {
        var n = (e.mode & Ye) !== xe;
        V0(
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
        a.dehydrated !== null && A0(a.dehydrated, t);
        break;
      }
    }
  }
  function tg(e, t) {
    eg(e, t);
    var n = sw();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ei) : a.push(n);
  }
  function pp(e, t) {
    {
      if (Ui)
        return;
      switch (e.tag) {
        case E: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case V:
              var a = t.type;
              t.pendingProps, k0(n, a);
              break;
            case Q:
              var r = t.pendingProps;
              U0(n, r);
              break;
          }
          break;
        }
        case V: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case V: {
              var s = t.type, m = t.pendingProps, h = (e.mode & Ye) !== xe;
              H0(
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
              var x = t.pendingProps, S = (e.mode & Ye) !== xe;
              B0(
                i,
                l,
                o,
                x,
                // TODO: Delete this argument when we remove the legacy root API.
                S
              );
              break;
            }
          }
          break;
        }
        case B: {
          var L = e.memoizedState, A = L.dehydrated;
          if (A !== null) switch (t.tag) {
            case V:
              var z = t.type;
              t.pendingProps, F0(A, z);
              break;
            case Q:
              var ne = t.pendingProps;
              z0(A, ne);
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
    t.flags = t.flags & ~fr | wt, pp(e, t);
  }
  function ag(e, t) {
    switch (e.tag) {
      case V: {
        var n = e.type;
        e.pendingProps;
        var a = h0(t, n);
        return a !== null ? (e.stateNode = a, nn = e, sa = E0(a), !0) : !1;
      }
      case Q: {
        var r = e.pendingProps, i = y0(t, r);
        return i !== null ? (e.stateNode = i, nn = e, sa = null, !0) : !1;
      }
      case B: {
        var l = g0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: eD(),
            retryLane: Wn
          };
          e.memoizedState = o;
          var s = cw(l);
          return s.return = e, e.child = s, nn = e, sa = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function mp(e) {
    return (e.mode & Ye) !== xe && (e.flags & Xe) === Ce;
  }
  function vp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function hp(e) {
    if (Da) {
      var t = sa;
      if (!t) {
        mp(e) && (pp(nn, e), vp()), ng(nn, e), Da = !1, nn = e;
        return;
      }
      var n = t;
      if (!ag(e, t)) {
        mp(e) && (pp(nn, e), vp()), t = lu(n);
        var a = nn;
        if (!t || !ag(e, t)) {
          ng(nn, e), Da = !1, nn = e;
          return;
        }
        tg(a, n);
      }
    }
  }
  function lD(e, t, n) {
    var a = e.stateNode, r = !Ui, i = R0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function oD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = C0(t, n, e);
    if (a) {
      var r = nn;
      if (r !== null)
        switch (r.tag) {
          case E: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== xe;
            O0(
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
            L0(
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
  function uD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    D0(n, e);
  }
  function sD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return T0(n);
  }
  function rg(e) {
    for (var t = e.return; t !== null && t.tag !== V && t.tag !== E && t.tag !== B; )
      t = t.return;
    nn = t;
  }
  function uc(e) {
    if (e !== nn)
      return !1;
    if (!Da)
      return rg(e), Da = !0, !1;
    if (e.tag !== E && (e.tag !== V || _0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = sa;
      if (t)
        if (mp(e))
          ig(e), vp();
        else
          for (; t; )
            tg(e, t), t = lu(t);
    }
    return rg(e), e.tag === B ? sa = sD(e) : sa = nn ? lu(e.stateNode) : null, !0;
  }
  function cD() {
    return Da && sa !== null;
  }
  function ig(e) {
    for (var t = sa; t; )
      eg(e, t), t = lu(t);
  }
  function Ml() {
    nn = null, sa = null, Da = !1, Ui = !1;
  }
  function lg() {
    Gr !== null && (Zb(Gr), Gr = null);
  }
  function an() {
    return Da;
  }
  function yp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var fD = v.ReactCurrentBatchConfig, dD = null;
  function pD() {
    return fD.transition;
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
    var mD = function(e) {
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
    var sc = /* @__PURE__ */ new Map(), og = /* @__PURE__ */ new Set();
    Ta.recordLegacyContextWarning = function(e, t) {
      var n = mD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!og.has(e.type)) {
        var a = sc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], sc.set(n, a)), a.push(e));
      }
    }, Ta.flushLegacyContextWarning = function() {
      sc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Ve(i) || "Component"), og.add(i.type);
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
    }, Ta.discardPendingWarnings = function() {
      cu = [], fu = [], du = [], pu = [], mu = [], vu = [], sc = /* @__PURE__ */ new Map();
    };
  }
  var gp, bp, Np, Ep, Sp, ug = function(e, t) {
  };
  gp = !1, bp = !1, Np = {}, Ep = {}, Sp = {}, ug = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Ve(t) || "Component";
      Ep[n] || (Ep[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function vD(e) {
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
      !(typeof n.type == "function" && !vD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
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
  function sg(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function cg(e) {
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
        return se < H ? (j.flags |= wt, H) : se;
      } else
        return j.flags |= wt, H;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= wt), j;
    }
    function o(j, H, w, W) {
      if (H === null || H.tag !== Q) {
        var se = yv(w, j.mode, W);
        return se.return = j, se;
      } else {
        var re = r(H, w);
        return re.return = j, re;
      }
    }
    function s(j, H, w, W) {
      var se = w.type;
      if (se === za)
        return h(j, H, w.props.children, W, w.key);
      if (H !== null && (H.elementType === se || // Keep this check inline so it only runs on the false path:
      vN(H, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof se == "object" && se !== null && se.$$typeof === Se && sg(se) === H.type)) {
        var re = r(H, w.props);
        return re.ref = hu(j, H, w), re.return = j, re._debugSource = w._source, re._debugOwner = w._owner, re;
      }
      var De = hv(w, j.mode, W);
      return De.ref = hu(j, H, w), De.return = j, De;
    }
    function m(j, H, w, W) {
      if (H === null || H.tag !== _ || H.stateNode.containerInfo !== w.containerInfo || H.stateNode.implementation !== w.implementation) {
        var se = gv(w, j.mode, W);
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
    function x(j, H, w) {
      if (typeof H == "string" && H !== "" || typeof H == "number") {
        var W = yv("" + H, j.mode, w);
        return W.return = j, W;
      }
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case ia: {
            var se = hv(H, j.mode, w);
            return se.ref = hu(j, null, H), se.return = j, se;
          }
          case Gn: {
            var re = gv(H, j.mode, w);
            return re.return = j, re;
          }
          case Se: {
            var De = H._payload, Ae = H._init;
            return x(j, Ae(De), w);
          }
        }
        if (He(H) || Ea(H)) {
          var rt = ri(H, j.mode, w, null);
          return rt.return = j, rt;
        }
        cc(j, H);
      }
      return typeof H == "function" && fc(j), null;
    }
    function S(j, H, w, W) {
      var se = H !== null ? H.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return se !== null ? null : o(j, H, "" + w, W);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return w.key === se ? s(j, H, w, W) : null;
          case Gn:
            return w.key === se ? m(j, H, w, W) : null;
          case Se: {
            var re = w._payload, De = w._init;
            return S(j, H, De(re), W);
          }
        }
        if (He(w) || Ea(w))
          return se !== null ? null : h(j, H, w, W, null);
        cc(j, w);
      }
      return typeof w == "function" && fc(j), null;
    }
    function L(j, H, w, W, se) {
      if (typeof W == "string" && W !== "" || typeof W == "number") {
        var re = j.get(w) || null;
        return o(H, re, "" + W, se);
      }
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case ia: {
            var De = j.get(W.key === null ? w : W.key) || null;
            return s(H, De, W, se);
          }
          case Gn: {
            var Ae = j.get(W.key === null ? w : W.key) || null;
            return m(H, Ae, W, se);
          }
          case Se:
            var rt = W._payload, Ge = W._init;
            return L(j, H, w, Ge(rt), se);
        }
        if (He(W) || Ea(W)) {
          var Ct = j.get(w) || null;
          return h(H, Ct, W, se, null);
        }
        cc(H, W);
      }
      return typeof W == "function" && fc(H), null;
    }
    function A(j, H, w) {
      {
        if (typeof j != "object" || j === null)
          return H;
        switch (j.$$typeof) {
          case ia:
          case Gn:
            ug(j, w);
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
            A(re(se), H, w);
            break;
        }
      }
      return H;
    }
    function z(j, H, w, W) {
      for (var se = null, re = 0; re < w.length; re++) {
        var De = w[re];
        se = A(De, se, j);
      }
      for (var Ae = null, rt = null, Ge = H, Ct = 0, We = 0, xt = null; Ge !== null && We < w.length; We++) {
        Ge.index > We ? (xt = Ge, Ge = null) : xt = Ge.sibling;
        var Nn = S(j, Ge, w[We], W);
        if (Nn === null) {
          Ge === null && (Ge = xt);
          break;
        }
        e && Ge && Nn.alternate === null && t(j, Ge), Ct = i(Nn, Ct, We), rt === null ? Ae = Nn : rt.sibling = Nn, rt = Nn, Ge = xt;
      }
      if (We === w.length) {
        if (n(j, Ge), an()) {
          var fn = We;
          Vi(j, fn);
        }
        return Ae;
      }
      if (Ge === null) {
        for (; We < w.length; We++) {
          var ta = x(j, w[We], W);
          ta !== null && (Ct = i(ta, Ct, We), rt === null ? Ae = ta : rt.sibling = ta, rt = ta);
        }
        if (an()) {
          var Mn = We;
          Vi(j, Mn);
        }
        return Ae;
      }
      for (var An = a(j, Ge); We < w.length; We++) {
        var En = L(An, j, We, w[We], W);
        En !== null && (e && En.alternate !== null && An.delete(En.key === null ? We : En.key), Ct = i(En, Ct, We), rt === null ? Ae = En : rt.sibling = En, rt = En);
      }
      if (e && An.forEach(function(Jl) {
        return t(j, Jl);
      }), an()) {
        var Tr = We;
        Vi(j, Tr);
      }
      return Ae;
    }
    function ne(j, H, w, W) {
      var se = Ea(w);
      if (typeof se != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === se && (gp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gp = !0);
        var re = se.call(w);
        if (re)
          for (var De = null, Ae = re.next(); !Ae.done; Ae = re.next()) {
            var rt = Ae.value;
            De = A(rt, De, j);
          }
      }
      var Ge = se.call(w);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Ct = null, We = null, xt = H, Nn = 0, fn = 0, ta = null, Mn = Ge.next(); xt !== null && !Mn.done; fn++, Mn = Ge.next()) {
        xt.index > fn ? (ta = xt, xt = null) : ta = xt.sibling;
        var An = S(j, xt, Mn.value, W);
        if (An === null) {
          xt === null && (xt = ta);
          break;
        }
        e && xt && An.alternate === null && t(j, xt), Nn = i(An, Nn, fn), We === null ? Ct = An : We.sibling = An, We = An, xt = ta;
      }
      if (Mn.done) {
        if (n(j, xt), an()) {
          var En = fn;
          Vi(j, En);
        }
        return Ct;
      }
      if (xt === null) {
        for (; !Mn.done; fn++, Mn = Ge.next()) {
          var Tr = x(j, Mn.value, W);
          Tr !== null && (Nn = i(Tr, Nn, fn), We === null ? Ct = Tr : We.sibling = Tr, We = Tr);
        }
        if (an()) {
          var Jl = fn;
          Vi(j, Jl);
        }
        return Ct;
      }
      for (var Wu = a(j, xt); !Mn.done; fn++, Mn = Ge.next()) {
        var er = L(Wu, j, fn, Mn.value, W);
        er !== null && (e && er.alternate !== null && Wu.delete(er.key === null ? fn : er.key), Nn = i(er, Nn, fn), We === null ? Ct = er : We.sibling = er, We = er);
      }
      if (e && Wu.forEach(function(Bw) {
        return t(j, Bw);
      }), an()) {
        var Hw = fn;
        Vi(j, Hw);
      }
      return Ct;
    }
    function Ee(j, H, w, W) {
      if (H !== null && H.tag === Q) {
        n(j, H.sibling);
        var se = r(H, w);
        return se.return = j, se;
      }
      n(j, H);
      var re = yv(w, j.mode, W);
      return re.return = j, re;
    }
    function me(j, H, w, W) {
      for (var se = w.key, re = H; re !== null; ) {
        if (re.key === se) {
          var De = w.type;
          if (De === za) {
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
          typeof De == "object" && De !== null && De.$$typeof === Se && sg(De) === re.type) {
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
      if (w.type === za) {
        var Ge = ri(w.props.children, j.mode, W, w.key);
        return Ge.return = j, Ge;
      } else {
        var Ct = hv(w, j.mode, W);
        return Ct.ref = hu(j, H, w), Ct.return = j, Ct;
      }
    }
    function qe(j, H, w, W) {
      for (var se = w.key, re = H; re !== null; ) {
        if (re.key === se)
          if (re.tag === _ && re.stateNode.containerInfo === w.containerInfo && re.stateNode.implementation === w.implementation) {
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
      var Ae = gv(w, j.mode, W);
      return Ae.return = j, Ae;
    }
    function Be(j, H, w, W) {
      var se = typeof w == "object" && w !== null && w.type === za && w.key === null;
      if (se && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return l(me(j, H, w, W));
          case Gn:
            return l(qe(j, H, w, W));
          case Se:
            var re = w._payload, De = w._init;
            return Be(j, H, De(re), W);
        }
        if (He(w))
          return z(j, H, w, W);
        if (Ea(w))
          return ne(j, H, w, W);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Ee(j, H, "" + w, W)) : (typeof w == "function" && fc(j), n(j, H));
    }
    return Be;
  }
  var Al = cg(!0), fg = cg(!1);
  function hD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Wi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Wi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function yD(e, t) {
    for (var n = e.child; n !== null; )
      rw(n, t), n = n.sibling;
  }
  var xp = Yr(null), Rp;
  Rp = {};
  var dc = null, Vl = null, Cp = null, pc = !1;
  function mc() {
    dc = null, Vl = null, Cp = null, pc = !1;
  }
  function dg() {
    pc = !0;
  }
  function pg() {
    pc = !1;
  }
  function mg(e, t, n) {
    gn(xp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rp;
  }
  function Dp(e, t) {
    var n = xp.current;
    yn(xp, t), e._currentValue = n;
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
  function gD(e, t, n) {
    bD(e, t, n);
  }
  function bD(e, t, n) {
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
                var h = m.shared, x = h.pending;
                x === null ? s.next = s : (s.next = x.next, x.next = s), h.pending = s;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var S = a.alternate;
            S !== null && (S.lanes = Ue(S.lanes, n)), Tp(a.return, n, e), i.lanes = Ue(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === I)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === J) {
        var L = a.return;
        if (L === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        L.lanes = Ue(L.lanes, n);
        var A = L.alternate;
        A !== null && (A.lanes = Ue(A.lanes, n)), Tp(L, n, e), r = a.sibling;
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
      a !== null && (Qn(n.lanes, t) && Ou(), n.firstContext = null);
    }
  }
  function _t(e) {
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
  function ND() {
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
  function ED(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function SD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function Hn(e, t) {
    return vc(e, t);
  }
  var xD = vc;
  function vc(e, t) {
    e.lanes = Ue(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (wt | fr)) !== Ce && fN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (wt | fr)) !== Ce && fN(e), a = r, r = r.return;
    if (a.tag === E) {
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
        lanes: Y
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
    if (gc === r && !_p && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), _p = !0), Ej()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, xD(e, n);
    } else
      return SD(e, r, t, n);
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
  function RD(e, t, n, a, r, i) {
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
        e.flags = e.flags & ~wn | Xe;
      case hg: {
        var s = n.payload, m;
        if (typeof s == "function") {
          dg(), m = s.call(i, a, r);
          {
            if (e.mode & St) {
              Gt(!0);
              try {
                s.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            pg();
          }
        } else
          m = s;
        return m == null ? a : ze({}, a, m);
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
      var s = o, m = s.next;
      s.next = null, l === null ? i = m : l.next = m, l = s;
      var h = e.alternate;
      if (h !== null) {
        var x = h.updateQueue, S = x.lastBaseUpdate;
        S !== l && (S === null ? x.firstBaseUpdate = m : S.next = m, x.lastBaseUpdate = s);
      }
    }
    if (i !== null) {
      var L = r.baseState, A = Y, z = null, ne = null, Ee = null, me = i;
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
          L = RD(e, r, me, L, t, n);
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
          Ee === null ? (ne = Ee = j, z = L) : Ee = Ee.next = j, A = Ue(A, qe);
        }
        if (me = me.next, me === null) {
          if (o = r.shared.pending, o === null)
            break;
          var se = o, re = se.next;
          se.next = null, me = re, r.lastBaseUpdate = se, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (z = L), r.baseState = z, r.firstBaseUpdate = ne, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Ae = De;
        do
          A = Ue(A, Ae.lane), Ae = Ae.next;
        while (Ae !== De);
      } else i === null && (r.shared.lanes = Y);
      $u(A), e.lanes = A, e.memoizedState = L;
    }
    gc = null;
  }
  function CD(e, t) {
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
        l !== null && (i.callback = null, CD(l, n));
      }
  }
  var yu = {}, Qr = Yr(yu), gu = Yr(yu), Sc = Yr(yu);
  function xc(e) {
    if (e === yu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Eg() {
    var e = xc(Sc.current);
    return e;
  }
  function Mp(e, t) {
    gn(Sc, t, e), gn(gu, e, e), gn(Qr, yu, e);
    var n = PC(t);
    yn(Qr, e), gn(Qr, n, e);
  }
  function Ul(e) {
    yn(Qr, e), yn(gu, e), yn(Sc, e);
  }
  function Ap() {
    var e = xc(Qr.current);
    return e;
  }
  function Sg(e) {
    xc(Sc.current);
    var t = xc(Qr.current), n = $C(t, e.type);
    t !== n && (gn(gu, e, e), gn(Qr, n, e));
  }
  function Vp(e) {
    gu.current === e && (yn(Qr, e), yn(gu, e));
  }
  var DD = 0, xg = 1, Rg = 1, bu = 2, ja = Yr(DD);
  function kp(e, t) {
    return (e & t) !== 0;
  }
  function Fl(e) {
    return e & xg;
  }
  function Up(e, t) {
    return e & xg | t;
  }
  function TD(e, t) {
    return e | t;
  }
  function Kr(e, t) {
    gn(ja, t, e);
  }
  function zl(e) {
    yn(ja, e);
  }
  function jD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === B) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || By(a) || tp(a))
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
  ), At = (
    /* */
    1
  ), Ga = (
    /*  */
    2
  ), Vt = (
    /*    */
    4
  ), rn = (
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
  function wD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ue = v.ReactCurrentDispatcher, Nu = v.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = Y, at = null, kt = null, Ut = null, Cc = !1, Eu = !1, Su = 0, _D = 0, OD = 25, P = null, ca = null, Xr = -1, Bp = !1;
  function Ze() {
    {
      var e = P;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function Z() {
    {
      var e = P;
      ca !== null && (Xr++, ca[Xr] !== e && LD(e));
    }
  }
  function Bl(e) {
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
  }
  function LD(e) {
    {
      var t = Ve(at);
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
  function bn() {
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
      if (!Jn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, at = t, ca = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Y, e !== null && e.memoizedState !== null ? ue.current = qg : ca !== null ? ue.current = Ig : ue.current = Yg;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, Su = 0, o >= OD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, kt = null, Ut = null, t.updateQueue = null, Xr = -1, ue.current = Gg, l = n(a, r);
      } while (Eu);
    }
    ue.current = Fc, t._debugHookTypes = ca;
    var s = kt !== null && kt.next !== null;
    if (Bi = Y, at = null, kt = null, Ut = null, P = null, ca = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
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
  function Cg(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & $a) !== xe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Dg() {
    if (ue.current = Fc, Cc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = Y, at = null, kt = null, Ut = null, ca = null, Xr = -1, P = null, zg = !1, Eu = !1, Su = 0;
  }
  function Wa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ut === null ? at.memoizedState = Ut = e : Ut = Ut.next = e, Ut;
  }
  function fa() {
    var e;
    if (kt === null) {
      var t = at.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = kt.next;
    var n;
    if (Ut === null ? n = at.memoizedState : n = Ut.next, n !== null)
      Ut = n, n = Ut.next, kt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      kt = e;
      var a = {
        memoizedState: kt.memoizedState,
        baseState: kt.baseState,
        baseQueue: kt.baseQueue,
        queue: kt.queue,
        next: null
      };
      Ut === null ? at.memoizedState = Ut = a : Ut = Ut.next = a;
    }
    return Ut;
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
      lanes: Y,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = kD.bind(null, at, i);
    return [a.memoizedState, l];
  }
  function Ip(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = kt, l = i.baseQueue, o = r.pending;
    if (o !== null) {
      if (l !== null) {
        var s = l.next, m = o.next;
        l.next = m, o.next = s;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = o, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, x = i.baseState, S = null, L = null, A = null, z = h;
      do {
        var ne = z.lane;
        if (bl(Bi, ne)) {
          if (A !== null) {
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
          A === null ? (L = A = Ee, S = x) : A = A.next = Ee, at.lanes = Ue(at.lanes, ne), $u(ne);
        }
        z = z.next;
      } while (z !== null && z !== h);
      A === null ? S = x : A.next = L, Jn(x, a.memoizedState) || Ou(), a.memoizedState = x, a.baseState = S, a.baseQueue = A, r.lastRenderedState = x;
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
    var a = fa(), r = a.queue;
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
      Jn(o, a.memoizedState) || Ou(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function __(e, t, n) {
  }
  function O_(e, t, n) {
  }
  function Gp(e, t, n) {
    var a = at, r = Wa(), i, l = an();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var o = t();
        Jn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
      }
      var s = af();
      if (s === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(s, Bi) || jg(a, t, i);
    }
    r.memoizedState = i;
    var m = {
      value: i,
      getSnapshot: t
    };
    return r.queue = m, _c(_g.bind(null, a, m, e), [e]), a.flags |= Vr, xu(At | rn, wg.bind(null, a, m, i, t), void 0, null), i;
  }
  function Dc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Hl) {
      var l = t();
      Jn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var o = r.memoizedState, s = !Jn(o, i);
    s && (r.memoizedState = i, Ou());
    var m = r.queue;
    if (Cu(_g.bind(null, a, m, e), [e]), m.getSnapshot !== t || s || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & At) {
      a.flags |= Vr, xu(At | rn, wg.bind(null, a, m, i, t), void 0, null);
      var h = af();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(h, Bi) || jg(a, t, i);
    }
    return i;
  }
  function jg(e, t, n) {
    e.flags |= $f;
    var a = {
      getSnapshot: t,
      value: n
    }, r = at.updateQueue;
    if (r === null)
      r = Tg(), at.updateQueue = r, r.stores = [a];
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
      return !Jn(n, a);
    } catch {
      return !0;
    }
  }
  function Lg(e) {
    var t = Hn(e, _e);
    t !== null && Bt(t, e, _e, st);
  }
  function Tc(e) {
    var t = Wa();
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
    var a = n.dispatch = UD.bind(null, at, n);
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
      i = Tg(), at.updateQueue = i, i.lastEffect = r.next = r;
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
    at.flags |= e, r.memoizedState = xu(At | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (kt !== null) {
      var o = kt.memoizedState;
      if (l = o.destroy, i !== null) {
        var s = o.deps;
        if (Pp(i, s)) {
          r.memoizedState = xu(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = xu(At | t, n, l, i);
  }
  function _c(e, t) {
    return (at.mode & $a) !== xe ? Ru(Gf | Vr | qf, rn, e, t) : Ru(Vr | qf, rn, e, t);
  }
  function Cu(e, t) {
    return wc(Vr, rn, e, t);
  }
  function Xp(e, t) {
    return Ru(Ke, Ga, e, t);
  }
  function Oc(e, t) {
    return wc(Ke, Ga, e, t);
  }
  function Jp(e, t) {
    var n = Ke;
    return n |= Ri, (at.mode & $a) !== xe && (n |= kr), Ru(n, Vt, e, t);
  }
  function Lc(e, t) {
    return wc(Ke, Vt, e, t);
  }
  function Mg(e, t) {
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
    var a = n != null ? n.concat([e]) : null, r = Ke;
    return r |= Ri, (at.mode & $a) !== xe && (r |= kr), Ru(r, Vt, Mg.bind(null, t, e), a);
  }
  function Mc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(Ke, Vt, Mg.bind(null, t, e), a);
  }
  function MD(e, t) {
  }
  var Ac = MD;
  function em(e, t) {
    var n = Wa(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Vc(e, t) {
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
  function Ag(e) {
    var t = fa(), n = kt, a = n.memoizedState;
    return kg(t, a, e);
  }
  function Vg(e) {
    var t = fa();
    if (kt === null)
      return t.memoizedState = e, e;
    var n = kt.memoizedState;
    return kg(t, n, e);
  }
  function kg(e, t, n) {
    var a = !gx(Bi);
    if (a) {
      if (!Jn(n, t)) {
        var r = Lh();
        at.lanes = Ue(at.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function AD(e, t, n) {
    var a = Ra();
    Qt(Tx(a, mr)), e(!0);
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
    var e = Tc(!1), t = e[0], n = e[1], a = AD.bind(null, n), r = Wa();
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
  function VD() {
    return zg;
  }
  function rm() {
    var e = Wa(), t = af(), n = t.identifierPrefix, a;
    if (an()) {
      var r = J0();
      a = ":" + n + "R" + r;
      var i = Su++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = _D++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Uc() {
    var e = fa(), t = e.memoizedState;
    return t;
  }
  function kD(e, t, n) {
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
        var l = Ln();
        Bt(i, e, a, l), Pg(i, t, a);
      }
    }
    $g(e, a);
  }
  function UD(e, t, n) {
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
      if (e.lanes === Y && (i === null || i.lanes === Y)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = ue.current, ue.current = wa;
          try {
            var s = t.lastRenderedState, m = l(s, n);
            if (r.hasEagerState = !0, r.eagerState = m, Jn(m, s)) {
              ED(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ue.current = o;
          }
        }
      }
      var h = vg(e, t, r, a);
      if (h !== null) {
        var x = Ln();
        Bt(h, e, a, x), Pg(h, t, a);
      }
    }
    $g(e, a);
  }
  function Hg(e) {
    var t = e.alternate;
    return e === at || t !== null && t === at;
  }
  function Bg(e, t) {
    Eu = Cc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Pg(e, t, n) {
    if (Oh(n)) {
      var a = t.lanes;
      a = Mh(a, e.pendingLanes);
      var r = Ue(a, n);
      t.lanes = r, xd(e, r);
    }
  }
  function $g(e, t, n) {
    Jf(e, t);
  }
  var Fc = {
    readContext: _t,
    useCallback: bn,
    useContext: bn,
    useEffect: bn,
    useImperativeHandle: bn,
    useInsertionEffect: bn,
    useLayoutEffect: bn,
    useMemo: bn,
    useReducer: bn,
    useRef: bn,
    useState: bn,
    useDebugValue: bn,
    useDeferredValue: bn,
    useTransition: bn,
    useMutableSource: bn,
    useSyncExternalStore: bn,
    useId: bn,
    unstable_isNewReconciler: Je
  }, Yg = null, Ig = null, qg = null, Gg = null, Qa = null, wa = null, zc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Oe = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Yg = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Ze(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Ze(), _t(e);
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
        ue.current = Qa;
        try {
          return tm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Ze();
        var a = ue.current;
        ue.current = Qa;
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
        ue.current = Qa;
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
      unstable_isNewReconciler: Je
    }, Ig = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Z(), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Z(), _t(e);
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
        ue.current = Qa;
        try {
          return tm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Z();
        var a = ue.current;
        ue.current = Qa;
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
        ue.current = Qa;
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
      unstable_isNewReconciler: Je
    }, qg = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Z(), _t(e);
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
        ue.current = wa;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Z();
        var a = ue.current;
        ue.current = wa;
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
        ue.current = wa;
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
        return P = "useDeferredValue", Z(), Ag(e);
      },
      useTransition: function() {
        return P = "useTransition", Z(), Ug();
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
      unstable_isNewReconciler: Je
    }, Gg = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Z(), _t(e);
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
        return P = "useDeferredValue", Z(), Vg(e);
      },
      useTransition: function() {
        return P = "useTransition", Z(), Fg();
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
      unstable_isNewReconciler: Je
    }, Qa = {
      readContext: function(e) {
        return im(), _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Oe(), Ze(), em(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Oe(), Ze(), _t(e);
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
        ue.current = Qa;
        try {
          return tm(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Oe(), Ze();
        var a = ue.current;
        ue.current = Qa;
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
        ue.current = Qa;
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
      unstable_isNewReconciler: Je
    }, wa = {
      readContext: function(e) {
        return im(), _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Oe(), Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Oe(), Z(), _t(e);
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
        ue.current = wa;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Oe(), Z();
        var a = ue.current;
        ue.current = wa;
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
        ue.current = wa;
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
        return P = "useDeferredValue", Oe(), Z(), Ag(e);
      },
      useTransition: function() {
        return P = "useTransition", Oe(), Z(), Ug();
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
      unstable_isNewReconciler: Je
    }, zc = {
      readContext: function(e) {
        return im(), _t(e);
      },
      useCallback: function(e, t) {
        return P = "useCallback", Oe(), Z(), Vc(e, t);
      },
      useContext: function(e) {
        return P = "useContext", Oe(), Z(), _t(e);
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
        ue.current = wa;
        try {
          return kc(e, t);
        } finally {
          ue.current = n;
        }
      },
      useReducer: function(e, t, n) {
        P = "useReducer", Oe(), Z();
        var a = ue.current;
        ue.current = wa;
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
        ue.current = wa;
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
        return P = "useDeferredValue", Oe(), Z(), Vg(e);
      },
      useTransition: function() {
        return P = "useTransition", Oe(), Z(), Fg();
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
      unstable_isNewReconciler: Je
    };
  }
  var Jr = p.unstable_now, Wg = 0, Hc = -1, Du = -1, Bc = -1, lm = !1, Pc = !1;
  function Qg() {
    return lm;
  }
  function FD() {
    Pc = !0;
  }
  function zD() {
    lm = !1, Pc = !1;
  }
  function HD() {
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
  function um(e) {
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
    Hc = Jr();
  }
  function sm() {
    Bc = Jr();
  }
  function cm(e) {
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
        var n = Qe(e) || "Component";
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
    var l = i == null ? r : ze({}, r, i);
    if (e.memoizedState = l, e.lanes === Y) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: OS,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = Ln(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (Bt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = Ln(), i = ni(a), l = Er(r, i);
      l.tag = yg, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (Bt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = Ln(), r = ni(n), i = Er(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && (Bt(l, n, r, a), bc(l, n, r)), ux(n, r);
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
        s === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Qe(t) || "Component");
      }
      return s;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function BD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Qe(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !gm.has(t) && (gm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Qe(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Qe(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || He(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function nb(e, t) {
    t.updater = Em, e.stateNode = t, TS(t, e), t._reactInternalInstance = fm;
  }
  function ab(e, t, n) {
    var a = !1, r = Zn, i = Zn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === te && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var s = "";
        l === void 0 ? s = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? s = " However, it is set to a " + typeof l + "." : l.$$typeof === q ? s = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? s = " Did you accidentally pass the Context.Consumer instead?" : s = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Qe(t) || "Component", s);
      }
    }
    if (typeof l == "object" && l !== null)
      i = _t(l);
    else {
      r = wl(e, t, !0);
      var m = t.contextTypes;
      a = m != null, i = a ? _l(e, r) : Zn;
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
    var x = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    nb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && x === null) {
        var S = Qe(t) || "Component";
        pm.has(S) || (pm.add(S), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", S, h.state === null ? "null" : "undefined", S));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var L = null, A = null, z = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? L = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (L = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), L !== null || A !== null || z !== null) {
          var ne = Qe(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vm.has(ne) || (vm.add(ne), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ne, Ee, L !== null ? `
  ` + L : "", A !== null ? `
  ` + A : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && qy(e, r, i), h;
  }
  function PD(e, t) {
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
    BD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Op(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = _t(i);
    else {
      var l = wl(e, t, !0);
      r.context = _l(e, l);
    }
    {
      if (r.state === n) {
        var o = Qe(t) || "Component";
        ym.has(o) || (ym.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & St && Ta.recordLegacyContextWarning(e, r), Ta.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var s = t.getDerivedStateFromProps;
    if (typeof s == "function" && (Nm(e, t, s, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (PD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var m = Ke;
      m |= Ri, (e.mode & $a) !== xe && (m |= kr), e.flags |= m;
    }
  }
  function $D(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, s = Zn;
    if (typeof o == "object" && o !== null)
      s = _t(o);
    else {
      var m = wl(e, t, !0);
      s = _l(e, m);
    }
    var h = t.getDerivedStateFromProps, x = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !x && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== s) && rb(e, r, n, s), bg();
    var S = e.memoizedState, L = r.state = S;
    if (Nc(e, n, r, a), L = e.memoizedState, i === n && S === L && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var A = Ke;
        A |= Ri, (e.mode & $a) !== xe && (A |= kr), e.flags |= A;
      }
      return !1;
    }
    typeof h == "function" && (Nm(e, t, h, n), L = e.memoizedState);
    var z = Ec() || tb(e, t, i, n, S, L, s);
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
      e.memoizedProps = n, e.memoizedState = L;
    }
    return r.props = n, r.state = L, r.context = s, z;
  }
  function YD(e, t, n, a, r) {
    var i = t.stateNode;
    gg(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : _a(t.type, l);
    i.props = o;
    var s = t.pendingProps, m = i.context, h = n.contextType, x = Zn;
    if (typeof h == "object" && h !== null)
      x = _t(h);
    else {
      var S = wl(t, n, !0);
      x = _l(t, S);
    }
    var L = n.getDerivedStateFromProps, A = typeof L == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !A && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== s || m !== x) && rb(t, i, a, x), bg();
    var z = t.memoizedState, ne = i.state = z;
    if (Nc(t, a, i, r), ne = t.memoizedState, l === s && z === ne && !tc() && !Ec() && !dn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= dl), !1;
    typeof L == "function" && (Nm(t, n, L, a), ne = t.memoizedState);
    var Ee = Ec() || tb(t, n, o, a, z, ne, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    dn;
    return Ee ? (!A && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ne, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ne, x)), typeof i.componentDidUpdate == "function" && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = ne), i.props = a, i.state = ne, i.context = x, Ee;
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
  function ID(e, t) {
    return !0;
  }
  function Rm(e, t) {
    try {
      var n = ID(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var o = r ? Ve(r) : null, s = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", m;
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
  var qD = typeof WeakMap == "function" ? WeakMap : Map;
  function ib(e, t, n) {
    var a = Er(st, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Fj(r), Rm(e, t);
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
      hN(e), Rm(e, t), typeof r != "function" && kj(this);
      var s = t.value, m = t.stack;
      this.componentDidCatch(s, {
        componentStack: m !== null ? m : ""
      }), typeof r != "function" && (Qn(e.lanes, _e) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ve(e) || "Unknown"));
    }), a;
  }
  function lb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new qD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = zj.bind(null, e, t, n);
      xa && Yu(e, n), t.then(i, i);
    }
  }
  function GD(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function WD(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === xe && (n === D || n === $ || n === ce)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function ob(e) {
    var t = e;
    do {
      if (t.tag === B && jD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ub(e, t, n, a, r) {
    if ((e.mode & Ye) === xe) {
      if (e === t)
        e.flags |= wn;
      else {
        if (e.flags |= Xe, n.flags |= Yf, n.flags &= -52805, n.tag === T) {
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
    return e.flags |= wn, e.lanes = r, e;
  }
  function QD(e, t, n, a, r) {
    if (n.flags |= bs, xa && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      WD(n), an() && n.mode & Ye && Zy();
      var l = ob(t);
      if (l !== null) {
        l.flags &= ~cr, ub(l, t, n, e, r), l.mode & Ye && lb(e, i, r), GD(l, e, i);
        return;
      } else {
        if (!yx(r)) {
          lb(e, i, r), rv();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (an() && n.mode & Ye) {
      Zy();
      var s = ob(t);
      if (s !== null) {
        (s.flags & wn) === Ce && (s.flags |= cr), ub(s, t, n, e, r), yp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), jj(a);
    var m = t;
    do {
      switch (m.tag) {
        case E: {
          var h = a;
          m.flags |= wn;
          var x = Ao(r);
          m.lanes = Ue(m.lanes, x);
          var S = ib(m, h, x);
          Lp(m, S);
          return;
        }
        case T:
          var L = a, A = m.type, z = m.stateNode;
          if ((m.flags & Xe) === Ce && (typeof A.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !oN(z))) {
            m.flags |= wn;
            var ne = Ao(r);
            m.lanes = Ue(m.lanes, ne);
            var Ee = Cm(m, L, ne);
            Lp(m, Ee);
            return;
          }
          break;
      }
      m = m.return;
    } while (m !== null);
  }
  function KD() {
    return null;
  }
  var ju = v.ReactCurrentOwner, Oa = !1, Dm, wu, Tm, jm, wm, $i, _m, Ic, _u;
  Dm = {}, wu = {}, Tm = {}, jm = {}, wm = {}, $i = !1, _m = {}, Ic = {}, _u = {};
  function _n(e, t, n, a) {
    e === null ? t.child = fg(t, null, n, a) : t.child = Al(t, e.child, n, a);
  }
  function XD(e, t, n, a) {
    t.child = Al(t, e.child, null, a), t.child = Al(t, null, n, a);
  }
  function sb(e, t, n, a, r) {
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
    var l = n.render, o = t.ref, s, m;
    kl(t, r), jo(t);
    {
      if (ju.current = t, la(!0), s = Pl(e, t, l, a, o, r), m = $l(), t.mode & St) {
        Gt(!0);
        try {
          s = Pl(e, t, l, a, o, r), m = $l();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return vl(), e !== null && !Oa ? (Cg(e, t, r), Sr(e, t, r)) : (an() && m && fp(t), t.flags |= fl, _n(e, t, s, r), t.child);
  }
  function cb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (nw(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = ce, t.type = l, Mm(t, i), fb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && Ca(
          o,
          a,
          // Resolved props
          "prop",
          Qe(i)
        ), n.defaultProps !== void 0) {
          var s = Qe(i) || "Unknown";
          _u[s] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", s), _u[s] = !0);
        }
      }
      var m = vv(n.type, null, a, t, t.mode, r);
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
    var S = e.child, L = zm(e, r);
    if (!L) {
      var A = S.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Qo, z(A, a) && e.ref === t.ref)
        return Sr(e, t, r);
    }
    t.flags |= fl;
    var ne = Wi(S, a);
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
        if (Oa = !1, t.pendingProps = a = h, zm(e, r))
          (e.flags & Yf) !== Ce && (Oa = !0);
        else return t.lanes = e.lanes, Sr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function db(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Kt)
      if ((t.mode & Ye) === xe) {
        var l = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (Qn(n, Wn)) {
        var x = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = x;
        var S = i !== null ? i.baseLanes : n;
        rf(t, S);
      } else {
        var o = null, s;
        if (i !== null) {
          var m = i.baseLanes;
          s = Ue(m, n);
        } else
          s = n;
        t.lanes = t.childLanes = Wn;
        var h = {
          baseLanes: s,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = h, t.updateQueue = null, rf(t, s), null;
      }
    else {
      var L;
      i !== null ? (L = Ue(i.baseLanes, n), t.memoizedState = null) : L = n, rf(t, L);
    }
    return _n(e, t, r, n), t.child;
  }
  function JD(e, t, n) {
    var a = t.pendingProps;
    return _n(e, t, a, n), t.child;
  }
  function ZD(e, t, n) {
    var a = t.pendingProps.children;
    return _n(e, t, a, n), t.child;
  }
  function eT(e, t, n) {
    {
      t.flags |= Ke;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return _n(e, t, i, n), t.child;
  }
  function pb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Si, t.flags |= If);
  }
  function Om(e, t, n, a, r) {
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
      var o = wl(t, n, !0);
      l = _l(t, o);
    }
    var s, m;
    kl(t, r), jo(t);
    {
      if (ju.current = t, la(!0), s = Pl(e, t, n, a, l, r), m = $l(), t.mode & St) {
        Gt(!0);
        try {
          s = Pl(e, t, n, a, l, r), m = $l();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return vl(), e !== null && !Oa ? (Cg(e, t, r), Sr(e, t, r)) : (an() && m && fp(t), t.flags |= fl, _n(e, t, s, r), t.child);
  }
  function mb(e, t, n, a, r) {
    {
      switch (yw(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), s = o.state;
          i.updater.enqueueSetState(i, s, null);
          break;
        }
        case !0: {
          t.flags |= Xe, t.flags |= wn;
          var m = new Error("Simulated error coming from DevTools"), h = Ao(r);
          t.lanes = Ue(t.lanes, h);
          var x = Cm(t, Pi(m, t), h);
          Lp(t, x);
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
    var L;
    qa(n) ? (L = !0, ac(t)) : L = !1, kl(t, r);
    var A = t.stateNode, z;
    A === null ? (Gc(e, t), ab(t, n, a), Sm(t, n, a, r), z = !0) : e === null ? z = $D(t, n, a, r) : z = YD(e, t, n, a, r);
    var ne = Lm(e, t, n, z, L, r);
    {
      var Ee = t.stateNode;
      z && Ee.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ve(t) || "a component"), $i = !0);
    }
    return ne;
  }
  function Lm(e, t, n, a, r, i) {
    pb(e, t);
    var l = (t.flags & Xe) !== Ce;
    if (!a && !l)
      return r && Qy(t, n, !1), Sr(e, t, i);
    var o = t.stateNode;
    ju.current = t;
    var s;
    if (l && typeof n.getDerivedStateFromError != "function")
      s = null, Jg();
    else {
      jo(t);
      {
        if (la(!0), s = o.render(), t.mode & St) {
          Gt(!0);
          try {
            o.render();
          } finally {
            Gt(!1);
          }
        }
        la(!1);
      }
      vl();
    }
    return t.flags |= fl, e !== null && l ? XD(e, t, s, i) : _n(e, t, s, i), t.memoizedState = o.state, r && Qy(t, n, !0), t.child;
  }
  function vb(e) {
    var t = e.stateNode;
    t.pendingContext ? Gy(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gy(e, t.context, !1), Mp(e, t.containerInfo);
  }
  function tT(e, t, n) {
    if (vb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    gg(e, t), Nc(t, a, null, n);
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
        var x = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return hb(e, t, o, n, x);
      } else {
        rD(t);
        var S = fg(t, null, o, n);
        t.child = S;
        for (var L = S; L; )
          L.flags = L.flags & ~wt | fr, L = L.sibling;
      }
    } else {
      if (Ml(), o === i)
        return Sr(e, t, n);
      _n(e, t, o, n);
    }
    return t.child;
  }
  function hb(e, t, n, a, r) {
    return Ml(), yp(r), t.flags |= cr, _n(e, t, n, a), t.child;
  }
  function nT(e, t, n) {
    Sg(t), e === null && hp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Xd(a, r);
    return o ? l = null : i !== null && Xd(a, i) && (t.flags |= Do), pb(e, t), _n(e, t, l, n), t.child;
  }
  function aT(e, t) {
    return e === null && hp(t), null;
  }
  function rT(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, s = o(l);
    t.type = s;
    var m = t.tag = aw(s), h = _a(s, r), x;
    switch (m) {
      case D:
        return Mm(t, s), t.type = s = Xl(s), x = Om(null, t, s, h, a), x;
      case T:
        return t.type = s = sv(s), x = mb(null, t, s, h, a), x;
      case $:
        return t.type = s = cv(s), x = sb(null, t, s, h, a), x;
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
        return x = cb(
          null,
          t,
          s,
          _a(s.type, h),
          // The inner type can have defaults too
          a
        ), x;
      }
    }
    var L = "";
    throw s !== null && typeof s == "object" && s.$$typeof === Se && (L = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + s + ". " + ("Lazy element type must resolve to a class or function." + L));
  }
  function iT(e, t, n, a, r) {
    Gc(e, t), t.tag = T;
    var i;
    return qa(n) ? (i = !0, ac(t)) : i = !1, kl(t, r), ab(t, n, a), Sm(t, n, a, r), Lm(null, t, n, !0, i, r);
  }
  function lT(e, t, n, a) {
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
        var m = Qe(n) || "Unknown";
        Dm[m] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", m, m), Dm[m] = !0);
      }
      t.mode & St && Ta.recordLegacyContextWarning(t, null), la(!0), ju.current = t, o = Pl(null, t, n, r, i, a), s = $l(), la(!1);
    }
    if (vl(), t.flags |= fl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var h = Qe(n) || "Unknown";
      wu[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), wu[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
    ) {
      {
        var x = Qe(n) || "Unknown";
        wu[x] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), wu[x] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var S = !1;
      return qa(n) ? (S = !0, ac(t)) : S = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Op(t), nb(t, o), Sm(t, n, r, a), Lm(null, t, n, !0, S, a);
    } else {
      if (t.tag = D, t.mode & St) {
        Gt(!0);
        try {
          o = Pl(null, t, n, r, i, a), s = $l();
        } finally {
          Gt(!1);
        }
      }
      return an() && s && fp(t), _n(null, t, o, a), Mm(t, n), t.child;
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
        var l = Qe(t) || "Unknown";
        _u[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), _u[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = Qe(t) || "Unknown";
        jm[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), jm[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var s = Qe(t) || "Unknown";
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
      cachePool: KD(),
      transitions: null
    };
  }
  function oT(e, t) {
    var n = null;
    return {
      baseLanes: Ue(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function uT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return kp(e, bu);
  }
  function sT(e, t) {
    return Ds(e.childLanes, t);
  }
  function yb(e, t, n) {
    var a = t.pendingProps;
    gw(t) && (t.flags |= Xe);
    var r = ja.current, i = !1, l = (t.flags & Xe) !== Ce;
    if (l || uT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = TD(r, Rg)), r = Fl(r), Kr(t, r), e === null) {
      hp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var s = o.dehydrated;
        if (s !== null)
          return mT(t, s);
      }
      var m = a.children, h = a.fallback;
      if (i) {
        var x = cT(t, m, h, n), S = t.child;
        return S.memoizedState = Vm(n), t.memoizedState = Am, x;
      } else
        return km(t, m);
    } else {
      var L = e.memoizedState;
      if (L !== null) {
        var A = L.dehydrated;
        if (A !== null)
          return vT(e, t, l, a, A, L, n);
      }
      if (i) {
        var z = a.fallback, ne = a.children, Ee = dT(e, t, ne, z, n), me = t.child, qe = e.child.memoizedState;
        return me.memoizedState = qe === null ? Vm(n) : oT(qe, n), me.childLanes = sT(e, n), t.memoizedState = Am, Ee;
      } else {
        var Be = a.children, j = fT(e, t, Be, n);
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
  function cT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, s;
    return (r & Ye) === xe && i !== null ? (o = i, o.childLanes = Y, o.pendingProps = l, e.mode & nt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), s = ri(n, r, a, null)) : (o = Um(l, r), s = ri(n, r, a, null)), o.return = e, s.return = e, o.sibling = s, e.child = o, s;
  }
  function Um(e, t, n) {
    return gN(e, t, Y, null);
  }
  function gb(e, t) {
    return Wi(e, t);
  }
  function fT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = gb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ye) === xe && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var o = t.deletions;
      o === null ? (t.deletions = [i], t.flags |= Ei) : o.push(i);
    }
    return t.child = l, l;
  }
  function dT(e, t, n, a, r) {
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
      m = gb(l, s), m.subtreeFlags = l.subtreeFlags & dr;
    var x;
    return o !== null ? x = Wi(o, a) : (x = ri(a, i, r, null), x.flags |= wt), x.return = t, m.return = t, m.sibling = x, t.child = m, x;
  }
  function qc(e, t, n, a) {
    a !== null && yp(a), Al(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = km(t, i);
    return l.flags |= wt, t.memoizedState = null, l;
  }
  function pT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Um(l, i), s = ri(a, i, r, null);
    return s.flags |= wt, o.return = t, s.return = t, o.sibling = s, t.child = o, (t.mode & Ye) !== xe && Al(t, e.child, null, r), s;
  }
  function mT(e, t, n) {
    return (e.mode & Ye) === xe ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = _e) : tp(t) ? e.lanes = Ti : e.lanes = Wn, null;
  }
  function vT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var j = xm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Xe, null;
        var H = a.children, w = a.fallback, W = pT(e, t, H, w, l), se = t.child;
        return se.memoizedState = Vm(l), t.memoizedState = Am, W;
      }
    else {
      if (nD(), (t.mode & Ye) === xe)
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
          var h = b0(r);
          o = h.digest, s = h.message, m = h.stack;
        }
        var x;
        s ? x = new Error(s) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var S = xm(x, o, m);
        return qc(e, t, l, S);
      }
      var L = Qn(l, e.childLanes);
      if (Oa || L) {
        var A = af();
        if (A !== null) {
          var z = Cx(A, l);
          if (z !== Wt && z !== i.retryLane) {
            i.retryLane = z;
            var ne = st;
            Hn(e, z), Bt(A, e, z, ne);
          }
        }
        rv();
        var Ee = xm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, Ee);
      } else if (By(r)) {
        t.flags |= Xe, t.child = e.child;
        var me = Hj.bind(null, e);
        return N0(r, me), null;
      } else {
        iD(t, r, i.treeContext);
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
  function hT(e, t, n) {
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
  function yT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Rc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function gT(e) {
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
  function bT(e, t) {
    e !== void 0 && !Ic[e] && (e !== "collapsed" && e !== "hidden" ? (Ic[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Ic[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Nb(e, t) {
    {
      var n = He(e), a = !n && typeof Ea(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function NT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (He(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Nb(e[n], n))
            return;
      } else {
        var a = Ea(e);
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
    gT(r), bT(i, r), NT(l, r), _n(e, t, l, n);
    var o = ja.current, s = kp(o, bu);
    if (s)
      o = Up(o, bu), t.flags |= Xe;
    else {
      var m = e !== null && (e.flags & Xe) !== Ce;
      m && hT(t, t.child, n), o = Fl(o);
    }
    if (Kr(t, o), (t.mode & Ye) === xe)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = yT(t.child), x;
          h === null ? (x = t.child, t.child = null) : (x = h.sibling, h.sibling = null), Fm(
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
          var S = null, L = t.child;
          for (t.child = null; L !== null; ) {
            var A = L.alternate;
            if (A !== null && Rc(A) === null) {
              t.child = L;
              break;
            }
            var z = L.sibling;
            L.sibling = S, S = L, L = z;
          }
          Fm(
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
  function ET(e, t, n) {
    Mp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Al(t, null, a, n) : _n(e, t, a, n), t.child;
  }
  var Sb = !1;
  function ST(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || Sb || (Sb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var s = t.type.propTypes;
      s && Ca(s, i, "prop", "Context.Provider");
    }
    if (mg(t, r, o), l !== null) {
      var m = l.value;
      if (Jn(m, o)) {
        if (l.children === i.children && !tc())
          return Sr(e, t, n);
      } else
        gD(t, r, n);
    }
    var h = i.children;
    return _n(e, t, h, n), t.child;
  }
  var xb = !1;
  function xT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (xb || (xb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kl(t, n);
    var l = _t(a);
    jo(t);
    var o;
    return ju.current = t, la(!0), o = i(l), la(!1), vl(), t.flags |= fl, _n(e, t, o, n), t.child;
  }
  function Ou() {
    Oa = !0;
  }
  function Gc(e, t) {
    (t.mode & Ye) === xe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= wt);
  }
  function Sr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Jg(), $u(t.lanes), Qn(n, t.childLanes) ? (hD(e, t), t.child) : null;
  }
  function RT(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Ei) : i.push(e), n.flags |= wt, n;
    }
  }
  function zm(e, t) {
    var n = e.lanes;
    return !!Qn(n, t);
  }
  function CT(e, t, n) {
    switch (t.tag) {
      case E:
        vb(t), t.stateNode, Ml();
        break;
      case V:
        Sg(t);
        break;
      case T: {
        var a = t.type;
        qa(a) && ac(t);
        break;
      }
      case _:
        Mp(t, t.stateNode.containerInfo);
        break;
      case I: {
        var r = t.memoizedProps.value, i = t.type._context;
        mg(t, i, r);
        break;
      }
      case G:
        {
          var l = Qn(n, t.childLanes);
          l && (t.flags |= Ke);
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
            return Kr(t, Fl(ja.current)), t.flags |= Xe, null;
          var m = t.child, h = m.childLanes;
          if (Qn(n, h))
            return yb(e, t, n);
          Kr(t, Fl(ja.current));
          var x = Sr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Kr(t, Fl(ja.current));
        break;
      }
      case U: {
        var S = (e.flags & Xe) !== Ce, L = Qn(n, t.childLanes);
        if (S) {
          if (L)
            return Eb(e, t, n);
          t.flags |= Xe;
        }
        var A = t.memoizedState;
        if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Kr(t, ja.current), L)
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
      return RT(e, t, vv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        Oa = !0;
      else {
        var i = zm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Xe) === Ce)
          return Oa = !1, CT(e, t, n);
        (e.flags & Yf) !== Ce ? Oa = !0 : Oa = !1;
      }
    } else if (Oa = !1, an() && K0(t)) {
      var l = t.index, o = X0();
      Jy(t, o, l);
    }
    switch (t.lanes = Y, t.tag) {
      case O:
        return lT(e, t, t.type, n);
      case X: {
        var s = t.elementType;
        return rT(e, t, s, n);
      }
      case D: {
        var m = t.type, h = t.pendingProps, x = t.elementType === m ? h : _a(m, h);
        return Om(e, t, m, x, n);
      }
      case T: {
        var S = t.type, L = t.pendingProps, A = t.elementType === S ? L : _a(S, L);
        return mb(e, t, S, A, n);
      }
      case E:
        return tT(e, t, n);
      case V:
        return nT(e, t, n);
      case Q:
        return aT(e, t);
      case B:
        return yb(e, t, n);
      case _:
        return ET(e, t, n);
      case $: {
        var z = t.type, ne = t.pendingProps, Ee = t.elementType === z ? ne : _a(z, ne);
        return sb(e, t, z, Ee, n);
      }
      case pe:
        return JD(e, t, n);
      case ae:
        return ZD(e, t, n);
      case G:
        return eT(e, t, n);
      case I:
        return ST(e, t, n);
      case he:
        return xT(e, t, n);
      case ge: {
        var me = t.type, qe = t.pendingProps, Be = _a(me, qe);
        if (t.type !== t.elementType) {
          var j = me.propTypes;
          j && Ca(
            j,
            Be,
            // Resolved for outer only
            "prop",
            Qe(me)
          );
        }
        return Be = _a(me.type, Be), cb(e, t, me, Be, n);
      }
      case ce:
        return fb(e, t, t.type, t.pendingProps, n);
      case ie: {
        var H = t.type, w = t.pendingProps, W = t.elementType === H ? w : _a(H, w);
        return iT(e, t, H, W, n);
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
    e.flags |= Ke;
  }
  function Cb(e) {
    e.flags |= Si, e.flags |= If;
  }
  var Db, Hm, Tb, jb;
  Db = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === V || r.tag === Q)
        GC(e, r.stateNode);
      else if (r.tag !== _) {
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
      var l = t.stateNode, o = Ap(), s = QC(l, n, i, a, r, o);
      t.updateQueue = s, s && Yl(t);
    }
  }, jb = function(e, t, n, a) {
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
        for (var o = e.child; o !== null; )
          n = Ue(n, Ue(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function DT(e, t, n) {
    if (cD() && (t.mode & Ye) !== xe && (t.flags & Xe) === Ce)
      return ig(t), Ml(), t.flags |= cr | bs | wn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (uD(t), ln(t), (t.mode & nt) !== xe) {
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
      case O:
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
        return qa(r) && nc(t), ln(t), null;
      }
      case E: {
        var i = t.stateNode;
        if (Ul(t), up(t), zp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = uc(t);
          if (l)
            Yl(t);
          else if (e !== null) {
            var o = e.memoizedState;
            // Check if this is a client root
            (!o.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== Ce) && (t.flags |= dl, lg());
          }
        }
        return Hm(e, t), ln(t), null;
      }
      case V: {
        Vp(t);
        var s = Eg(), m = t.type;
        if (e !== null && t.stateNode != null)
          Tb(e, t, m, a, s), e.ref !== t.ref && Cb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return ln(t), null;
          }
          var h = Ap(), x = uc(t);
          if (x)
            lD(t, s, h) && Yl(t);
          else {
            var S = qC(m, a, s, h, t);
            Db(S, t, !1, !1), t.stateNode = S, WC(S, m, a, s) && Yl(t);
          }
          t.ref !== null && Cb(t);
        }
        return ln(t), null;
      }
      case Q: {
        var L = a;
        if (e && t.stateNode != null) {
          var A = e.memoizedProps;
          jb(e, t, A, L);
        } else {
          if (typeof L != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = Eg(), ne = Ap(), Ee = uc(t);
          Ee ? oD(t) && Yl(t) : t.stateNode = KC(L, z, ne, t);
        }
        return ln(t), null;
      }
      case B: {
        zl(t);
        var me = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = DT(e, t, me);
          if (!qe)
            return t.flags & wn ? t : null;
        }
        if ((t.flags & Xe) !== Ce)
          return t.lanes = n, (t.mode & nt) !== xe && cm(t), t;
        var Be = me !== null, j = e !== null && e.memoizedState !== null;
        if (Be !== j && Be) {
          var H = t.child;
          if (H.flags |= xi, (t.mode & Ye) !== xe) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(ja.current, Rg) ? Tj() : rv();
          }
        }
        var W = t.updateQueue;
        if (W !== null && (t.flags |= Ke), ln(t), (t.mode & nt) !== xe && Be) {
          var se = t.child;
          se !== null && (t.treeBaseDuration -= se.treeBaseDuration);
        }
        return null;
      }
      case _:
        return Ul(t), Hm(e, t), e === null && $0(t.stateNode.containerInfo), ln(t), null;
      case I:
        var re = t.type._context;
        return Dp(re, t), ln(t), null;
      case ie: {
        var De = t.type;
        return qa(De) && nc(t), ln(t), null;
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
            var Ct = wj() && (e === null || (e.flags & Xe) === Ce);
            if (!Ct)
              for (var We = t.child; We !== null; ) {
                var xt = Rc(We);
                if (xt !== null) {
                  rt = !0, t.flags |= Xe, Lu(Ae, !1);
                  var Nn = xt.updateQueue;
                  return Nn !== null && (t.updateQueue = Nn, t.flags |= Ke), t.subtreeFlags = Ce, yD(t, n), Kr(t, Up(ja.current, bu)), t.child;
                }
                We = We.sibling;
              }
            Ae.tail !== null && qt() > Kb() && (t.flags |= Xe, rt = !0, Lu(Ae, !1), t.lanes = jh);
          }
        else {
          if (!rt) {
            var fn = Rc(Ge);
            if (fn !== null) {
              t.flags |= Xe, rt = !0;
              var ta = fn.updateQueue;
              if (ta !== null && (t.updateQueue = ta, t.flags |= Ke), Lu(Ae, !0), Ae.tail === null && Ae.tailMode === "hidden" && !Ge.alternate && !an())
                return ln(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Ae.renderingStartTime > Kb() && n !== Wn && (t.flags |= Xe, rt = !0, Lu(Ae, !1), t.lanes = jh);
          }
          if (Ae.isBackwards)
            Ge.sibling = t.child, t.child = Ge;
          else {
            var Mn = Ae.last;
            Mn !== null ? Mn.sibling = Ge : t.child = Ge, Ae.last = Ge;
          }
        }
        if (Ae.tail !== null) {
          var An = Ae.tail;
          Ae.rendering = An, Ae.tail = An.sibling, Ae.renderingStartTime = qt(), An.sibling = null;
          var En = ja.current;
          return rt ? En = Up(En, bu) : En = Fl(En), Kr(t, En), An;
        }
        return ln(t), null;
      }
      case ve:
        break;
      case oe:
      case Te: {
        av(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, er = Wu !== null;
          er !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Kt && (t.flags |= xi);
        }
        return !Jl || (t.mode & Ye) === xe ? ln(t) : Qn(Za, Wn) && (ln(t), t.subtreeFlags & (wt | Ke) && (t.flags |= xi)), null;
      }
      case je:
        return null;
      case Le:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function TT(e, t, n) {
    switch (dp(t), t.tag) {
      case T: {
        var a = t.type;
        qa(a) && nc(t);
        var r = t.flags;
        return r & wn ? (t.flags = r & ~wn | Xe, (t.mode & nt) !== xe && cm(t), t) : null;
      }
      case E: {
        t.stateNode, Ul(t), up(t), zp();
        var i = t.flags;
        return (i & wn) !== Ce && (i & Xe) === Ce ? (t.flags = i & ~wn | Xe, t) : null;
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
        return o & wn ? (t.flags = o & ~wn | Xe, (t.mode & nt) !== xe && cm(t), t) : null;
      }
      case U:
        return zl(t), null;
      case _:
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
      case E: {
        t.stateNode, Ul(t), up(t), zp();
        break;
      }
      case V: {
        Vp(t);
        break;
      }
      case _:
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
  var Wc = !1, on = !1, jT = typeof WeakSet == "function" ? WeakSet : Set, fe = null, Il = null, ql = null;
  function wT(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var _T = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nt)
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
      Zr(Vt, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      _T(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function OT(e, t, n) {
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
          if (Xt && va && e.mode & nt)
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
  function Qc(e, t, n) {
    try {
      n();
    } catch (a) {
      lt(e, t, a);
    }
  }
  var Ab = !1;
  function LT(e, t) {
    YC(e.containerInfo), fe = t, MT();
    var n = Ab;
    return Ab = !1, n;
  }
  function MT() {
    for (; fe !== null; ) {
      var e = fe, t = e.child;
      (e.subtreeFlags & Wf) !== Ce && t !== null ? (t.return = e, fe = t) : AT();
    }
  }
  function AT() {
    for (; fe !== null; ) {
      var e = fe;
      mt(e);
      try {
        VT(e);
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
  function VT(e) {
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
              var o = Ob;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ve(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case E: {
          {
            var s = e.stateNode;
            v0(s.containerInfo);
          }
          break;
        }
        case V:
        case Q:
        case _:
        case ie:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      It();
    }
  }
  function La(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && ((e & rn) !== Bn ? KS(t) : (e & Vt) !== Bn && xh(t), (e & Ga) !== Bn && Iu(!0), Qc(t, n, o), (e & Ga) !== Bn && Iu(!1), (e & rn) !== Bn ? XS() : (e & Vt) !== Bn && Rh());
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
          (e & rn) !== Bn ? WS(t) : (e & Vt) !== Bn && JS(t);
          var l = i.create;
          (e & Ga) !== Bn && Iu(!0), i.destroy = l(), (e & Ga) !== Bn && Iu(!1), (e & rn) !== Bn ? QS() : (e & Vt) !== Bn && ZS();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var s = void 0;
              (i.tag & Vt) !== Ce ? s = "useLayoutEffect" : (i.tag & Ga) !== Ce ? s = "useInsertionEffect" : s = "useEffect";
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
  function kT(e, t) {
    if ((t.flags & Ke) !== Ce)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Kg(), o = t.alternate === null ? "mount" : "update";
          Qg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
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
  function UT(e, t, n, a) {
    if ((n.flags & To) !== Ce)
      switch (n.tag) {
        case D:
        case $:
        case ce: {
          if (!on)
            if (n.mode & nt)
              try {
                Xa(), Zr(Vt | At, n);
              } finally {
                Ka(n);
              }
            else
              Zr(Vt | At, n);
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
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), Ng(n, o, r));
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
            Ng(n, s, m);
          }
          break;
        }
        case V: {
          var h = n.stateNode;
          if (t === null && n.flags & Ke) {
            var x = n.type, S = n.memoizedProps;
            t0(h, x, S);
          }
          break;
        }
        case Q:
          break;
        case _:
          break;
        case G: {
          {
            var L = n.memoizedProps, A = L.onCommit, z = L.onRender, ne = n.stateNode.effectDuration, Ee = Kg(), me = t === null ? "mount" : "update";
            Qg() && (me = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, me, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof A == "function" && A(n.memoizedProps.id, me, ne, Ee), Aj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case E:
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
          IT(e, n);
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
    on || n.flags & Si && Vb(n);
  }
  function FT(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        if (e.mode & nt)
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
        typeof t.componentDidMount == "function" && OT(e, e.return, t), Mb(e, e.return);
        break;
      }
      case V: {
        Mb(e, e.return);
        break;
      }
    }
  }
  function zT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === V) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? f0(r) : p0(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === Q) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? d0(i) : m0(i, a.memoizedProps);
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
  function HT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function kb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, kb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === V) {
        var n = e.stateNode;
        n !== null && q0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function BT(e) {
    for (var t = e.return; t !== null; ) {
      if (Ub(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ub(e) {
    return e.tag === V || e.tag === E || e.tag === _;
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
        if (t.flags & wt || t.child === null || t.tag === _)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & wt))
        return t.stateNode;
    }
  }
  function PT(e) {
    var t = BT(e);
    switch (t.tag) {
      case V: {
        var n = t.stateNode;
        t.flags & Do && (Hy(n), t.flags &= ~Do);
        var a = Fb(e);
        $m(e, a, n);
        break;
      }
      case E:
      case _: {
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
      t ? o0(n, i, t) : i0(n, i);
    } else if (a !== _) {
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
      t ? l0(n, i, t) : r0(n, i);
    } else if (a !== _) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var o = l.sibling; o !== null; )
          $m(o, t, n), o = o.sibling;
      }
    }
  }
  var un = null, Ma = !1;
  function $T(e, t, n) {
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
          case _: {
            un = a.stateNode.containerInfo, Ma = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (un === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      zb(e, t, n), un = null, Ma = !1;
    }
    HT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      zb(e, t, a), a = a.sibling;
  }
  function zb(e, t, n) {
    switch (YS(n), n.tag) {
      case V:
        on || Gl(n, t);
      case Q: {
        {
          var a = un, r = Ma;
          un = null, ei(e, t, n), un = a, Ma = r, un !== null && (Ma ? s0(un, n.stateNode) : u0(un, n.stateNode));
        }
        return;
      }
      case J: {
        un !== null && (Ma ? c0(un, n.stateNode) : ep(un, n.stateNode));
        return;
      }
      case _: {
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
          var o = n.updateQueue;
          if (o !== null) {
            var s = o.lastEffect;
            if (s !== null) {
              var m = s.next, h = m;
              do {
                var x = h, S = x.destroy, L = x.tag;
                S !== void 0 && ((L & Ga) !== Bn ? Qc(n, t, S) : (L & Vt) !== Bn && (xh(n), n.mode & nt ? (Xa(), Qc(n, t, S), Ka(n)) : Qc(n, t, S), Rh())), h = h.next;
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
  function YT(e) {
    e.memoizedState;
  }
  function IT(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && w0(i);
        }
      }
    }
  }
  function Hb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new jT()), t.forEach(function(a) {
        var r = Bj.bind(null, e, a);
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
  function qT(e, t, n) {
    Il = n, ql = e, mt(t), Bb(t, e), mt(t), Il = null, ql = null;
  }
  function Aa(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          $T(e, t, i);
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
        if (Aa(t, e), Ja(e), r & Ke) {
          try {
            La(Ga | At, e, e.return), Zr(Ga | At, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Xa(), La(Vt | At, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Ka(e);
          } else
            try {
              La(Vt | At, e, e.return);
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
              Hy(i);
            } catch (De) {
              lt(e, e.return, De);
            }
          }
          if (r & Ke) {
            var l = e.stateNode;
            if (l != null) {
              var o = e.memoizedProps, s = a !== null ? a.memoizedProps : o, m = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  n0(l, h, m, s, o, e);
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
          var x = e.stateNode, S = e.memoizedProps, L = a !== null ? a.memoizedProps : S;
          try {
            a0(x, L, S);
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
              j0(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case _: {
        Aa(t, e), Ja(e);
        return;
      }
      case B: {
        Aa(t, e), Ja(e);
        var z = e.child;
        if (z.flags & xi) {
          var ne = z.stateNode, Ee = z.memoizedState, me = Ee !== null;
          if (ne.isHidden = me, me) {
            var qe = z.alternate !== null && z.alternate.memoizedState !== null;
            qe || Dj();
          }
        }
        if (r & Ke) {
          try {
            YT(e);
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
          var j = on;
          on = j || Be, Aa(t, e), on = j;
        } else
          Aa(t, e);
        if (Ja(e), r & xi) {
          var H = e.stateNode, w = e.memoizedState, W = w !== null, se = e;
          if (H.isHidden = W, W && !Be && (se.mode & Ye) !== xe) {
            fe = se;
            for (var re = se.child; re !== null; )
              fe = re, WT(re), re = re.sibling;
          }
          zT(se, W);
        }
        return;
      }
      case U: {
        Aa(t, e), Ja(e), r & Ke && Hb(e);
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
    if (t & wt) {
      try {
        PT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~wt;
    }
    t & fr && (e.flags &= ~fr);
  }
  function GT(e, t, n) {
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
          var s = r.alternate, m = s !== null && s.memoizedState !== null, h = m || on, x = Wc, S = on;
          Wc = o, on = h, on && !S && (fe = r, QT(r));
          for (var L = i; L !== null; )
            fe = L, Pb(
              L,
              // New root; bubble back up to here and stop.
              t,
              n
            ), L = L.sibling;
          fe = r, Wc = x, on = S, Ym(e, t, n);
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
          UT(t, r, a, n);
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
  function WT(e) {
    for (; fe !== null; ) {
      var t = fe, n = t.child;
      switch (t.tag) {
        case D:
        case $:
        case ge:
        case ce: {
          if (t.mode & nt)
            try {
              Xa(), La(Vt, t, t.return);
            } finally {
              Ka(t);
            }
          else
            La(Vt, t, t.return);
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
  function QT(e) {
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
        FT(t);
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
  function KT(e, t, n, a) {
    fe = t, XT(t, e, n, a);
  }
  function XT(e, t, n, a) {
    for (; fe !== null; ) {
      var r = fe, i = r.child;
      (r.subtreeFlags & pl) !== Ce && i !== null ? (i.return = r, fe = i) : JT(e, t, n, a);
    }
  }
  function JT(e, t, n, a) {
    for (; fe !== null; ) {
      var r = fe;
      if ((r.flags & Vr) !== Ce) {
        mt(r);
        try {
          ZT(t, r, n, a);
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
  function ZT(e, t, n, a) {
    switch (t.tag) {
      case D:
      case $:
      case ce: {
        if (t.mode & nt) {
          sm();
          try {
            Zr(rn | At, t);
          } finally {
            um(t);
          }
        } else
          Zr(rn | At, t);
        break;
      }
    }
  }
  function ej(e) {
    fe = e, tj();
  }
  function tj() {
    for (; fe !== null; ) {
      var e = fe, t = e.child;
      if ((fe.flags & Ei) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            fe = r, rj(r, e);
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
      (e.subtreeFlags & pl) !== Ce && t !== null ? (t.return = e, fe = t) : nj();
    }
  }
  function nj() {
    for (; fe !== null; ) {
      var e = fe;
      (e.flags & Vr) !== Ce && (mt(e), aj(e), It());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, fe = t;
        return;
      }
      fe = e.return;
    }
  }
  function aj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        e.mode & nt ? (sm(), La(rn | At, e, e.return), um(e)) : La(rn | At, e, e.return);
        break;
      }
    }
  }
  function rj(e, t) {
    for (; fe !== null; ) {
      var n = fe;
      mt(n), lj(n, t), It();
      var a = n.child;
      a !== null ? (a.return = n, fe = a) : ij(e);
    }
  }
  function ij(e) {
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
  function lj(e, t) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        e.mode & nt ? (sm(), La(rn, e, t), um(e)) : La(rn, e, t);
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
          Zr(Vt | At, e);
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
  function uj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce: {
        try {
          Zr(rn | At, e);
        } catch (t) {
          lt(e, e.return, t);
        }
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
          La(Vt | At, e, e.return);
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
  function cj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ce:
        try {
          La(rn | At, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Mu = Symbol.for;
    Mu("selector.component"), Mu("selector.has_pseudo_class"), Mu("selector.role"), Mu("selector.test_id"), Mu("selector.text");
  }
  var fj = [];
  function dj() {
    fj.forEach(function(e) {
      return e();
    });
  }
  var pj = v.ReactCurrentActQueue;
  function mj(e) {
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
      return !e && pj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var vj = Math.ceil, Im = v.ReactCurrentDispatcher, qm = v.ReactCurrentOwner, sn = v.ReactCurrentBatchConfig, Va = v.ReactCurrentActQueue, Ft = (
    /*             */
    0
  ), qb = (
    /*               */
    1
  ), cn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), xr = 0, Au = 1, Yi = 2, Kc = 3, Vu = 4, Gb = 5, Gm = 6, Ie = Ft, On = null, bt = null, zt = Y, Za = Y, Wm = Yr(Y), Ht = xr, ku = null, Xc = Y, Uu = Y, Jc = Y, Fu = null, Pn = null, Qm = 0, Wb = 500, Qb = 1 / 0, hj = 500, Rr = null;
  function zu() {
    Qb = qt() + hj;
  }
  function Kb() {
    return Qb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ti = null, Hu = Y, Xm = [], Jm = null, yj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, gj = 50, Ql = 0, tf = null, Pu = st, nf = Y, Xb = !1;
  function af() {
    return On;
  }
  function Ln() {
    return (Ie & (cn | da)) !== Ft ? qt() : (Pu !== st || (Pu = qt()), Pu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Ye) === xe)
      return _e;
    if ((Ie & cn) !== Ft && zt !== Y)
      return Ao(zt);
    var n = pD() !== dD;
    if (n) {
      if (sn.transition !== null) {
        var a = sn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Wt && (nf = Lh()), nf;
    }
    var r = Ra();
    if (r !== Wt)
      return r;
    var i = XC();
    return i;
  }
  function bj(e) {
    var t = e.mode;
    return (t & Ye) === xe ? _e : Ex();
  }
  function Bt(e, t, n, a) {
    $j(), Xb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Vo(e, n, a), (Ie & cn) !== Y && e === On ? qj(t) : (xa && Vh(e, t, n), Gj(t), e === On && ((Ie & cn) === Ft && (Uu = Ue(Uu, n)), Ht === Vu && ai(e, zt)), $n(e, a), n === _e && Ie === Ft && (t.mode & Ye) === xe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Va.isBatchingLegacy && (zu(), Xy()));
  }
  function Nj(e, t, n) {
    var a = e.current;
    a.lanes = t, Vo(e, t, n), $n(e, n);
  }
  function Ej(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & cn) !== Ft
    );
  }
  function $n(e, t) {
    var n = e.callbackNode;
    vx(e, t);
    var a = Rs(e, e === On ? zt : Y);
    if (a === Y) {
      n !== null && pN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== ov)) {
      n == null && i !== _e && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && pN(n);
    var l;
    if (r === _e)
      e.tag === Ir ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), Q0(eN.bind(null, e))) : Ky(eN.bind(null, e)), Va.current !== null ? Va.current.push(qr) : ZC(function() {
        (Ie & (cn | da)) === Ft && qr();
      }), l = null;
    else {
      var o;
      switch (Fh(a)) {
        case Kn:
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
    if (zD(), Pu = st, nf = Y, (Ie & (cn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === On ? zt : Y);
    if (r === Y)
      return null;
    var i = !Cs(e, r) && !Nx(e, r) && !t, l = i ? Oj(e, r) : lf(e, r);
    if (l !== xr) {
      if (l === Yi) {
        var o = bd(e);
        o !== Y && (r = o, l = tv(e, o));
      }
      if (l === Au) {
        var s = ku;
        throw qi(e, Y), ai(e, r), $n(e, qt()), s;
      }
      if (l === Gm)
        ai(e, r);
      else {
        var m = !Cs(e, r), h = e.current.alternate;
        if (m && !xj(h)) {
          if (l = lf(e, r), l === Yi) {
            var x = bd(e);
            x !== Y && (r = x, l = tv(e, x));
          }
          if (l === Au) {
            var S = ku;
            throw qi(e, Y), ai(e, r), $n(e, qt()), S;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Sj(e, l, r);
      }
    }
    return $n(e, qt()), e.callbackNode === n ? Jb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = Fu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= cr, P0(e.containerInfo);
    }
    var r = lf(e, t);
    if (r !== Yi) {
      var i = Pn;
      Pn = n, i !== null && Zb(i);
    }
    return r;
  }
  function Zb(e) {
    Pn === null ? Pn = e : Pn.push.apply(Pn, e);
  }
  function Sj(e, t, n) {
    switch (t) {
      case xr:
      case Au:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, Pn, Rr);
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
              Ln(), Ah(e, i);
              break;
            }
            e.timeoutHandle = Jd(Gi.bind(null, e, Pn, Rr), a);
            break;
          }
        }
        Gi(e, Pn, Rr);
        break;
      }
      case Vu: {
        if (ai(e, n), bx(n))
          break;
        if (!mN()) {
          var l = px(e, n), o = l, s = qt() - o, m = Pj(s) - s;
          if (m > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, Pn, Rr), m);
            break;
          }
        }
        Gi(e, Pn, Rr);
        break;
      }
      case Gb: {
        Gi(e, Pn, Rr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function xj(e) {
    for (var t = e; ; ) {
      if (t.flags & $f) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, o = i.value;
              try {
                if (!Jn(l(), o))
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
    t = Ds(t, Jc), t = Ds(t, Uu), xx(e, t);
  }
  function eN(e) {
    if (HD(), (Ie & (cn | da)) !== Ft)
      throw new Error("Should not already be working.");
    Dr();
    var t = Rs(e, Y);
    if (!Qn(t, _e))
      return $n(e, qt()), null;
    var n = lf(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = bd(e);
      a !== Y && (t = a, n = tv(e, a));
    }
    if (n === Au) {
      var r = ku;
      throw qi(e, Y), ai(e, t), $n(e, qt()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, Pn, Rr), $n(e, qt()), null;
  }
  function Rj(e, t) {
    t !== Y && (xd(e, Ue(t, _e)), $n(e, qt()), (Ie & (cn | da)) === Ft && (zu(), qr()));
  }
  function nv(e, t) {
    var n = Ie;
    Ie |= qb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === Ft && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Va.isBatchingLegacy && (zu(), Xy());
    }
  }
  function Cj(e, t, n, a, r) {
    var i = Ra(), l = sn.transition;
    try {
      return sn.transition = null, Qt(Kn), e(t, n, a, r);
    } finally {
      Qt(i), sn.transition = l, Ie === Ft && zu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && (Ie & (cn | da)) === Ft && Dr();
    var t = Ie;
    Ie |= qb;
    var n = sn.transition, a = Ra();
    try {
      return sn.transition = null, Qt(Kn), e ? e() : void 0;
    } finally {
      Qt(a), sn.transition = n, Ie = t, (Ie & (cn | da)) === Ft && qr();
    }
  }
  function tN() {
    return (Ie & (cn | da)) !== Ft;
  }
  function rf(e, t) {
    gn(Wm, Za, e), Za = Ue(Za, t);
  }
  function av(e) {
    Za = Wm.current, yn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = Y;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, JC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        _b(r, a), a = a.return;
      }
    On = e;
    var i = Wi(e.current, null);
    return bt = i, zt = Za = t, Ht = xr, ku = null, Xc = Y, Uu = Y, Jc = Y, Fu = null, Pn = null, ND(), Ta.discardPendingWarnings(), i;
  }
  function nN(e, t) {
    do {
      var n = bt;
      try {
        if (mc(), Dg(), It(), qm.current = null, n === null || n.return === null) {
          Ht = Au, ku = t, bt = null;
          return;
        }
        if (Xt && n.mode & nt && $c(n, !0), Yn)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            tx(n, a, zt);
          } else
            ex(n, t, zt);
        QD(e, n.return, n, t, zt), lN(n);
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
  function Dj() {
    Qm = qt();
  }
  function $u(e) {
    Xc = Ue(e, Xc);
  }
  function Tj() {
    Ht === xr && (Ht = Kc);
  }
  function rv() {
    (Ht === xr || Ht === Kc || Ht === Yi) && (Ht = Vu), On !== null && (Nd(Xc) || Nd(Uu)) && ai(On, zt);
  }
  function jj(e) {
    Ht !== Vu && (Ht = Yi), Fu === null ? Fu = [e] : Fu.push(e);
  }
  function wj() {
    return Ht === xr;
  }
  function lf(e, t) {
    var n = Ie;
    Ie |= cn;
    var a = aN();
    if (On !== e || zt !== t) {
      if (xa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, zt), r.clear()), kh(e, t);
      }
      Rr = Uh(), qi(e, t);
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
    if (mc(), Ie = n, rN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Dh(), On = null, zt = Y, Ht;
  }
  function _j() {
    for (; bt !== null; )
      iN(bt);
  }
  function Oj(e, t) {
    var n = Ie;
    Ie |= cn;
    var a = aN();
    if (On !== e || zt !== t) {
      if (xa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, zt), r.clear()), kh(e, t);
      }
      Rr = Uh(), zu(), qi(e, t);
    }
    Ch(t);
    do
      try {
        Lj();
        break;
      } catch (i) {
        nN(e, i);
      }
    while (!0);
    return mc(), rN(a), Ie = n, bt !== null ? (lx(), xr) : (Dh(), On = null, zt = Y, Ht);
  }
  function Lj() {
    for (; bt !== null && !AS(); )
      iN(bt);
  }
  function iN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== xe ? (om(e), n = iv(t, e, Za), $c(e, !0)) : n = iv(t, e, Za), It(), e.memoizedProps = e.pendingProps, n === null ? lN(e) : bt = n, qm.current = null;
  }
  function lN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === xe ? r = wb(n, t, Za) : (om(t), r = wb(n, t, Za), $c(t, !1)), It(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = TT(n, t);
        if (i !== null) {
          i.flags &= jS, bt = i;
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
          Ht = Gm, bt = null;
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
    Ht === xr && (Ht = Gb);
  }
  function Gi(e, t, n) {
    var a = Ra(), r = sn.transition;
    try {
      sn.transition = null, Qt(Kn), Mj(e, t, n, a);
    } finally {
      sn.transition = r, Qt(a);
    }
    return null;
  }
  function Mj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (Yj(), (Ie & (cn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (GS(i), r === null)
      return Sh(), null;
    if (i === Y && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Y, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = Ue(r.lanes, r.childLanes);
    Rx(e, l), e === On && (On = null, bt = null, zt = Y), ((r.subtreeFlags & pl) !== Ce || (r.flags & pl) !== Ce) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Dr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ce, s = (r.flags & (Wf | Qf | To | pl)) !== Ce;
    if (o || s) {
      var m = sn.transition;
      sn.transition = null;
      var h = Ra();
      Qt(Kn);
      var x = Ie;
      Ie |= da, qm.current = null, LT(e, r), Xg(), qT(e, r, i), IC(e.containerInfo), e.current = r, nx(i), GT(r, e, i), ax(), VS(), Ie = x, Qt(h), sn.transition = m;
    } else
      e.current = r, Xg();
    var S = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === Y && (Wl = null), S || cN(e.current, !1), PS(r.stateNode, a), xa && e.memoizedUpdaters.clear(), dj(), $n(e, qt()), t !== null)
      for (var L = e.onRecoverableError, A = 0; A < t.length; A++) {
        var z = t[A], ne = z.stack, Ee = z.digest;
        L(z.value, {
          componentStack: ne,
          digest: Ee
        });
      }
    if (Zc) {
      Zc = !1;
      var me = Km;
      throw Km = null, me;
    }
    return Qn(Hu, _e) && e.tag !== Ir && Dr(), l = e.pendingLanes, Qn(l, _e) ? (FD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, qr(), Sh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = Fh(Hu), t = jx(vr, e), n = sn.transition, a = Ra();
      try {
        return sn.transition = null, Qt(t), Vj();
      } finally {
        Qt(a), sn.transition = n;
      }
    }
    return !1;
  }
  function Aj(e) {
    Xm.push(e), Ii || (Ii = !0, uv(Di, function() {
      return Dr(), null;
    }));
  }
  function Vj() {
    if (ti === null)
      return !1;
    var e = Jm;
    Jm = null;
    var t = ti, n = Hu;
    if (ti = null, Hu = Y, (Ie & (cn | da)) !== Ft)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, rx(n);
    var a = Ie;
    Ie |= da, ej(t.current), KT(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        kT(t, l);
      }
    }
    ix(), cN(t.current, !0), Ie = a, qr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, $S(t);
    {
      var o = t.current.stateNode;
      o.effectDuration = 0, o.passiveEffectDuration = 0;
    }
    return !0;
  }
  function oN(e) {
    return Wl !== null && Wl.has(e);
  }
  function kj(e) {
    Wl === null ? Wl = /* @__PURE__ */ new Set([e]) : Wl.add(e);
  }
  function Uj(e) {
    Zc || (Zc = !0, Km = e);
  }
  var Fj = Uj;
  function uN(e, t, n) {
    var a = Pi(n, t), r = ib(e, a, _e), i = Wr(e, r, _e), l = Ln();
    i !== null && (Vo(i, _e, l), $n(i, l));
  }
  function lt(e, t, n) {
    if (wT(n), Iu(!1), e.tag === E) {
      uN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === E) {
        uN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !oN(i)) {
          var l = Pi(n, e), o = Cm(a, l, _e), s = Wr(a, o, _e), m = Ln();
          s !== null && (Vo(s, _e, m), $n(s, m));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function zj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Ln();
    Ah(e, n), Wj(e), On === e && bl(zt, n) && (Ht === Vu || Ht === Kc && _h(zt) && qt() - Qm < Wb ? qi(e, Y) : Jc = Ue(Jc, n)), $n(e, r);
  }
  function sN(e, t) {
    t === Wt && (t = bj(e));
    var n = Ln(), a = Hn(e, t);
    a !== null && (Vo(a, t, n), $n(a, n));
  }
  function Hj(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), sN(e, n);
  }
  function Bj(e, t) {
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
  function Pj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : vj(e / 1960) * 1960;
  }
  function $j() {
    if (Bu > yj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > gj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function Yj() {
    Ta.flushLegacyContextWarning(), Ta.flushPendingUnsafeLifecycleWarnings();
  }
  function cN(e, t) {
    mt(e), of(e, kr, sj), t && of(e, Gf, cj), of(e, kr, oj), t && of(e, Gf, uj), It();
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
      if ((Ie & cn) !== Ft || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== O && t !== E && t !== T && t !== D && t !== $ && t !== ge && t !== ce)
        return;
      var n = Ve(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = Dn;
      try {
        mt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : It();
      }
    }
  }
  var iv;
  {
    var Ij = null;
    iv = function(e, t, n) {
      var a = bN(Ij, t);
      try {
        return Rb(e, t, n);
      } catch (i) {
        if (aD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (mc(), Dg(), _b(e, t), bN(t, a), t.mode & nt && om(t), Bf(null, Rb, null, e, t, n), CS()) {
          var r = Pf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var dN = !1, lv;
  lv = /* @__PURE__ */ new Set();
  function qj(e) {
    if (yi && !VD())
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
    if (xa) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Vh(e, a, t);
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
      return MS(e);
  }
  function mN() {
    return Va.current !== null;
  }
  function Gj(e) {
    {
      if (e.mode & Ye) {
        if (!Ib())
          return;
      } else if (!mj() || Ie !== Ft || e.tag !== D && e.tag !== $ && e.tag !== ce)
        return;
      if (Va.current === null) {
        var t = Dn;
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
  function Wj(e) {
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
  var pa = null, Kl = null, Qj = function(e) {
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
  function hN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Kl === null && (Kl = /* @__PURE__ */ new WeakSet()), Kl.add(e);
    }
  }
  var Kj = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        fv(e.current, a, n);
      });
    }
  }, Xj = function(e, t) {
    {
      if (e.context !== Zn)
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
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var m = !1, h = !1;
      if (s !== null) {
        var x = pa(s);
        x !== void 0 && (n.has(x) ? h = !0 : t.has(x) && (l === T ? h = !0 : m = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || m) {
        var S = Hn(e, _e);
        S !== null && Bt(S, e, _e, st);
      }
      r !== null && !h && fv(r, t, n), i !== null && fv(i, t, n);
    }
  }
  var Jj = function(e, t) {
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
      o !== null && t.has(o) && (s = !0), s ? Zj(e, n) : a !== null && dv(a, t, n), r !== null && dv(r, t, n);
    }
  }
  function Zj(e, t) {
    {
      var n = ew(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case V:
            t.add(a.stateNode);
            return;
          case _:
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
  function ew(e, t) {
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
      var yN = Object.preventExtensions({});
    } catch {
      pv = !0;
    }
  }
  function tw(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = Y, this.childLanes = Y, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var ea = function(e, t, n, a) {
    return new tw(e, t, n, a);
  };
  function mv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function nw(e) {
    return typeof e == "function" && !mv(e) && e.defaultProps === void 0;
  }
  function aw(e) {
    if (typeof e == "function")
      return mv(e) ? T : D;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return $;
      if (t === ke)
        return ge;
    }
    return O;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = ea(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case O:
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
  function rw(e, t) {
    e.flags &= dr | wt;
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
  function iw(e, t, n) {
    var a;
    return e === rc ? (a = Ye, t === !0 && (a |= St, a |= $a)) : a = xe, xa && (a |= nt), ea(E, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = O, o = e;
    if (typeof e == "function")
      mv(e) ? (l = T, o = sv(o)) : o = Xl(o);
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
          return lw(n, r, i, t);
        case Pe:
          return ow(n, r, i, t);
        case we:
          return uw(n, r, i, t);
        case dt:
          return gN(n, r, i, t);
        case vn:
        case Lt:
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
    var h = ea(l, n, t, r);
    return h.elementType = e, h.type = o, h.lanes = i, h._debugOwner = a, h;
  }
  function hv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vv(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ri(e, t, n, a) {
    var r = ea(pe, e, a, t);
    return r.lanes = n, r;
  }
  function lw(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = ea(G, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ow(e, t, n, a) {
    var r = ea(B, e, a, t);
    return r.elementType = Pe, r.lanes = n, r;
  }
  function uw(e, t, n, a) {
    var r = ea(U, e, a, t);
    return r.elementType = we, r.lanes = n, r;
  }
  function gN(e, t, n, a) {
    var r = ea(oe, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function yv(e, t, n) {
    var a = ea(Q, e, null, t);
    return a.lanes = n, a;
  }
  function sw() {
    var e = ea(V, null, null, xe);
    return e.elementType = "DELETED", e;
  }
  function cw(e) {
    var t = ea(J, null, null, xe);
    return t.stateNode = e, t;
  }
  function gv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = ea(_, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function bN(e, t) {
    return e === null && (e = ea(O, null, null, xe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function fw(e, t, n, a, r) {
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
    var h = new fw(e, t, n, o, s), x = iw(t, i);
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
    return Op(x), h;
  }
  var bv = "18.3.1";
  function dw(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return aa(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: Gn,
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
      return Zn;
    var t = cl(e), n = W0(t);
    if (t.tag === T) {
      var a = t.type;
      if (qa(a))
        return Wy(t, a, n);
    }
    return n;
  }
  function pw(e, t) {
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
        var i = Ve(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = Dn;
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
    var h = !0, x = NN(n, a, h, e, r, i, l, o, s);
    x.context = EN(null);
    var S = x.current, L = Ln(), A = ni(S), z = Er(L, A);
    return z.callback = t ?? null, Wr(S, z, A), Nj(x, A, L), x;
  }
  function qu(e, t, n, a) {
    BS(t, e);
    var r = t.current, i = Ln(), l = ni(r);
    ox(l);
    var o = EN(n);
    t.context === null ? t.context = o : t.pendingContext = o, yi && Dn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ve(Dn) || "Unknown"));
    var s = Er(i, l);
    s.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), s.callback = a);
    var m = Wr(r, s, l);
    return m !== null && (Bt(m, r, l, i), bc(m, r, l)), l;
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
  function mw(e) {
    switch (e.tag) {
      case E: {
        var t = e.stateNode;
        if (js(t)) {
          var n = hx(t);
          Rj(t, n);
        }
        break;
      }
      case B: {
        Cr(function() {
          var r = Hn(e, _e);
          if (r !== null) {
            var i = Ln();
            Bt(r, e, _e, i);
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
    n !== null && n.dehydrated !== null && (n.retryLane = Sx(n.retryLane, t));
  }
  function Sv(e, t) {
    RN(e, t);
    var n = e.alternate;
    n && RN(n, t);
  }
  function vw(e) {
    if (e.tag === B) {
      var t = Oo, n = Hn(e, t);
      if (n !== null) {
        var a = Ln();
        Bt(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function hw(e) {
    if (e.tag === B) {
      var t = ni(e), n = Hn(e, t);
      if (n !== null) {
        var a = Ln();
        Bt(n, e, t, a);
      }
      Sv(e, t);
    }
  }
  function CN(e) {
    var t = LS(e);
    return t === null ? null : t.stateNode;
  }
  var DN = function(e) {
    return null;
  };
  function yw(e) {
    return DN(e);
  }
  var TN = function(e) {
    return !1;
  };
  function gw(e) {
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
        var l = Hn(e, _e);
        l !== null && Bt(l, e, _e, st);
      }
    }, wN = function(e, t, n) {
      var a = xv(e, t);
      if (a !== null) {
        var r = FN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Hn(e, _e);
        i !== null && Bt(i, e, _e, st);
      }
    }, _N = function(e, t, n, a) {
      var r = xv(e, t);
      if (r !== null) {
        var i = HN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Hn(e, _e);
        l !== null && Bt(l, e, _e, st);
      }
    }, ON = function(e, t, n) {
      e.pendingProps = PN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, _e);
      a !== null && Bt(a, e, _e, st);
    }, LN = function(e, t) {
      e.pendingProps = FN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Hn(e, _e);
      n !== null && Bt(n, e, _e, st);
    }, MN = function(e, t, n) {
      e.pendingProps = HN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, _e);
      a !== null && Bt(a, e, _e, st);
    }, AN = function(e) {
      var t = Hn(e, _e);
      t !== null && Bt(t, e, _e, st);
    }, VN = function(e) {
      DN = e;
    }, kN = function(e) {
      TN = e;
    };
  }
  function bw(e) {
    var t = gh(e);
    return t === null ? null : t.stateNode;
  }
  function Nw(e) {
    return null;
  }
  function Ew() {
    return Dn;
  }
  function Sw(e) {
    var t = e.findFiberByHostInstance, n = v.ReactCurrentDispatcher;
    return HS({
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
      findHostInstanceByFiber: bw,
      findFiberByHostInstance: t || Nw,
      // React Refresh
      findHostInstancesForRefresh: Jj,
      scheduleRefresh: Kj,
      scheduleRoot: Xj,
      setRefreshHandler: Qj,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: Ew,
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
      if (n.nodeType !== jt) {
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
  function xw(e, t) {
    if (!ff(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    YN(e);
    var n = !1, a = !1, r = "", i = $N;
    t != null && (t.hydrate ? R("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = SN(e, rc, null, n, a, r, i);
    Xs(l.current, e);
    var o = e.nodeType === jt ? e.parentNode : e;
    return Jo(o), new Rv(l);
  }
  function cf(e) {
    this._internalRoot = e;
  }
  function Rw(e) {
    e && zx(e);
  }
  cf.prototype.unstable_scheduleHydration = Rw;
  function Cw(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    YN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", s = $N;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError));
    var m = xN(t, null, e, rc, a, i, l, o, s);
    if (Xs(m.current, e), Jo(e), r)
      for (var h = 0; h < r.length; h++) {
        var x = r[h];
        wD(m, x);
      }
    return new cf(m);
  }
  function ff(e) {
    return !!(e && (e.nodeType === Fn || e.nodeType === sr || e.nodeType === _f));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === Fn || e.nodeType === sr || e.nodeType === _f || e.nodeType === jt && e.nodeValue === " react-mount-point-unstable "));
  }
  function YN(e) {
    e.nodeType === Fn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var Dw = v.ReactCurrentOwner, IN;
  IN = function(e) {
    if (e._reactRootContainer && e.nodeType !== jt) {
      var t = CN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Cv(e), r = !!(a && $r(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Fn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Cv(e) {
    return e ? e.nodeType === sr ? e.documentElement : e.firstChild : null;
  }
  function qN() {
  }
  function Tw(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var S = sf(l);
          i.call(S);
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
      var o = e.nodeType === jt ? e.parentNode : e;
      return Jo(o), Cr(), l;
    } else {
      for (var s; s = e.lastChild; )
        e.removeChild(s);
      if (typeof a == "function") {
        var m = a;
        a = function() {
          var S = sf(h);
          m.call(S);
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
      var x = e.nodeType === jt ? e.parentNode : e;
      return Jo(x), Cr(function() {
        qu(t, h, n, a);
      }), h;
    }
  }
  function jw(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    IN(n), jw(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = Tw(n, t, e, r, a);
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
  function ww(e) {
    {
      GN || (GN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = Dw.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Qe(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Fn ? e : pw(e, "findDOMNode");
  }
  function _w(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function Ow(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function Lw(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !DS(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  var WN = !1;
  function Mw(e) {
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
        var r = Cv(e), i = !!(r && $r(r)), l = e.nodeType === Fn && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  wx(mw), Ox(vw), Lx(hw), Mx(Ra), Ax(Dx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), vS(VC), gS(nv, Cj, Cr);
  function Aw(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return dw(e, t, null, n);
  }
  function Vw(e, t, n, a) {
    return Lw(e, t, n, a);
  }
  var Dv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$r, jl, Js, ih, lh, nv]
  };
  function kw(e, t) {
    return Dv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), xw(e, t);
  }
  function Uw(e, t, n) {
    return Dv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Cw(e, t, n);
  }
  function Fw(e) {
    return tN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var zw = Sw({
    findFiberByHostInstance: Mi,
    bundleType: 1,
    version: bv,
    rendererPackageName: "react-dom"
  });
  if (!zw && en && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var QN = window.location.protocol;
    /^(https?|file):$/.test(QN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (QN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  na.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, na.createPortal = Aw, na.createRoot = kw, na.findDOMNode = ww, na.flushSync = Fw, na.hydrate = _w, na.hydrateRoot = Uw, na.render = Ow, na.unmountComponentAtNode = Mw, na.unstable_batchedUpdates = nv, na.unstable_renderSubtreeIntoContainer = Vw, na.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
pE.exports = na;
var Ww = pE.exports, hE, KN = Ww;
{
  var XN = KN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  hE = function(u, p) {
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
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (u[g] = v[g]);
    }
    return u;
  }, Qu.apply(this, arguments);
}
var li;
(function(u) {
  u.Pop = "POP", u.Push = "PUSH", u.Replace = "REPLACE";
})(li || (li = {}));
const JN = "popstate";
function Qw(u) {
  u === void 0 && (u = {});
  function p(g, y) {
    let {
      pathname: R,
      search: f,
      hash: k
    } = g.location;
    return _v(
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
    return typeof y == "string" ? y : Ku(y);
  }
  return Xw(p, v, null, u);
}
function ht(u, p) {
  if (u === !1 || u === null || typeof u > "u")
    throw new Error(p);
}
function ka(u, p) {
  if (!u) {
    typeof console < "u" && console.warn(p);
    try {
      throw new Error(p);
    } catch {
    }
  }
}
function Kw() {
  return Math.random().toString(36).substr(2, 8);
}
function ZN(u, p) {
  return {
    usr: u.state,
    key: u.key,
    idx: p
  };
}
function _v(u, p, v, g) {
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
    key: p && p.key || g || Kw()
  });
}
function Ku(u) {
  let {
    pathname: p = "/",
    search: v = "",
    hash: g = ""
  } = u;
  return v && v !== "?" && (p += v.charAt(0) === "?" ? v : "?" + v), g && g !== "#" && (p += g.charAt(0) === "#" ? g : "#" + g), p;
}
function eo(u) {
  let p = {};
  if (u) {
    let v = u.indexOf("#");
    v >= 0 && (p.hash = u.substr(v), u = u.substr(0, v));
    let g = u.indexOf("?");
    g >= 0 && (p.search = u.substr(g), u = u.substr(0, g)), u && (p.pathname = u);
  }
  return p;
}
function Xw(u, p, v, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: R = !1
  } = g, f = y.history, k = li.Pop, D = null, T = O();
  T == null && (T = 0, f.replaceState(Qu({}, f.state, {
    idx: T
  }), ""));
  function O() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function E() {
    k = li.Pop;
    let ae = O(), he = ae == null ? null : ae - T;
    T = ae, D && D({
      action: k,
      location: pe.location,
      delta: he
    });
  }
  function _(ae, he) {
    k = li.Push;
    let I = _v(pe.location, ae, he);
    T = O() + 1;
    let $ = ZN(I, T), G = pe.createHref(I);
    try {
      f.pushState($, "", G);
    } catch (B) {
      if (B instanceof DOMException && B.name === "DataCloneError")
        throw B;
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
    let I = _v(pe.location, ae, he);
    T = O();
    let $ = ZN(I, T), G = pe.createHref(I);
    f.replaceState($, "", G), R && D && D({
      action: k,
      location: pe.location,
      delta: 0
    });
  }
  function Q(ae) {
    let he = y.location.origin !== "null" ? y.location.origin : y.location.href, I = typeof ae == "string" ? ae : Ku(ae);
    return I = I.replace(/ $/, "%20"), ht(he, "No window.location.(origin|href) available to create URL for href: " + I), new URL(I, he);
  }
  let pe = {
    get action() {
      return k;
    },
    get location() {
      return u(y, f);
    },
    listen(ae) {
      if (D)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(JN, E), D = ae, () => {
        y.removeEventListener(JN, E), D = null;
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
    push: _,
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
function Jw(u, p, v) {
  return v === void 0 && (v = "/"), Zw(u, p, v);
}
function Zw(u, p, v, g) {
  let y = typeof p == "string" ? eo(p) : p, R = ui(y.pathname || "/", v);
  if (R == null)
    return null;
  let f = yE(u);
  e1(f);
  let k = null;
  for (let D = 0; k == null && D < f.length; ++D) {
    let T = f1(R);
    k = s1(f[D], T);
  }
  return k;
}
function yE(u, p, v, g) {
  p === void 0 && (p = []), v === void 0 && (v = []), g === void 0 && (g = "");
  let y = (R, f, k) => {
    let D = {
      relativePath: k === void 0 ? R.path || "" : k,
      caseSensitive: R.caseSensitive === !0,
      childrenIndex: f,
      route: R
    };
    D.relativePath.startsWith("/") && (ht(D.relativePath.startsWith(g), 'Absolute route path "' + D.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), D.relativePath = D.relativePath.slice(g.length));
    let T = wr([g, D.relativePath]), O = v.concat(D);
    R.children && R.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      R.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), yE(R.children, p, O, T)), !(R.path == null && !R.index) && p.push({
      path: T,
      score: o1(T, R.index),
      routesMeta: O
    });
  };
  return u.forEach((R, f) => {
    var k;
    if (R.path === "" || !((k = R.path) != null && k.includes("?")))
      y(R, f);
    else
      for (let D of gE(R.path))
        y(R, f, D);
  }), p;
}
function gE(u) {
  let p = u.split("/");
  if (p.length === 0) return [];
  let [v, ...g] = p, y = v.endsWith("?"), R = v.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [R, ""] : [R];
  let f = gE(g.join("/")), k = [];
  return k.push(...f.map((D) => D === "" ? R : [R, D].join("/"))), y && k.push(...f), k.map((D) => u.startsWith("/") && D === "" ? "/" : D);
}
function e1(u) {
  u.sort((p, v) => p.score !== v.score ? v.score - p.score : u1(p.routesMeta.map((g) => g.childrenIndex), v.routesMeta.map((g) => g.childrenIndex)));
}
const t1 = /^:[\w-]+$/, n1 = 3, a1 = 2, r1 = 1, i1 = 10, l1 = -2, tE = (u) => u === "*";
function o1(u, p) {
  let v = u.split("/"), g = v.length;
  return v.some(tE) && (g += l1), p && (g += a1), v.filter((y) => !tE(y)).reduce((y, R) => y + (t1.test(R) ? n1 : R === "" ? r1 : i1), g);
}
function u1(u, p) {
  return u.length === p.length && u.slice(0, -1).every((g, y) => g === p[y]) ? (
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
function s1(u, p, v) {
  let {
    routesMeta: g
  } = u, y = {}, R = "/", f = [];
  for (let k = 0; k < g.length; ++k) {
    let D = g[k], T = k === g.length - 1, O = R === "/" ? p : p.slice(R.length) || "/", E = Ov({
      path: D.relativePath,
      caseSensitive: D.caseSensitive,
      end: T
    }, O), _ = D.route;
    if (!E)
      return null;
    Object.assign(y, E.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: wr([R, E.pathname]),
      pathnameBase: v1(wr([R, E.pathnameBase])),
      route: _
    }), E.pathnameBase !== "/" && (R = wr([R, E.pathnameBase]));
  }
  return f;
}
function Ov(u, p) {
  typeof u == "string" && (u = {
    path: u,
    caseSensitive: !1,
    end: !0
  });
  let [v, g] = c1(u.path, u.caseSensitive, u.end), y = p.match(v);
  if (!y) return null;
  let R = y[0], f = R.replace(/(.)\/+$/, "$1"), k = y.slice(1);
  return {
    params: g.reduce((T, O, E) => {
      let {
        paramName: _,
        isOptional: V
      } = O;
      if (_ === "*") {
        let pe = k[E] || "";
        f = R.slice(0, R.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const Q = k[E];
      return V && !Q ? T[_] = void 0 : T[_] = (Q || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: R,
    pathnameBase: f,
    pattern: u
  };
}
function c1(u, p, v) {
  p === void 0 && (p = !1), v === void 0 && (v = !0), ka(u === "*" || !u.endsWith("*") || u.endsWith("/*"), 'Route path "' + u + '" will be treated as if it were ' + ('"' + u.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + u.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + u.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, k, D) => (g.push({
    paramName: k,
    isOptional: D != null
  }), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return u.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += u === "*" || u === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : v ? y += "\\/*$" : u !== "" && u !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, p ? void 0 : "i"), g];
}
function f1(u) {
  try {
    return u.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return ka(!1, 'The URL path "' + u + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), u;
  }
}
function ui(u, p) {
  if (p === "/") return u;
  if (!u.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let v = p.endsWith("/") ? p.length - 1 : p.length, g = u.charAt(v);
  return g && g !== "/" ? null : u.slice(v) || "/";
}
function d1(u, p) {
  p === void 0 && (p = "/");
  let {
    pathname: v,
    search: g = "",
    hash: y = ""
  } = typeof u == "string" ? eo(u) : u;
  return {
    pathname: v ? v.startsWith("/") ? v : p1(v, p) : p,
    search: h1(g),
    hash: y1(y)
  };
}
function p1(u, p) {
  let v = p.replace(/\/+$/, "").split("/");
  return u.split("/").forEach((y) => {
    y === ".." ? v.length > 1 && v.pop() : y !== "." && v.push(y);
  }), v.length > 1 ? v.join("/") : "/";
}
function Tv(u, p, v, g) {
  return "Cannot include a '" + u + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + v + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function m1(u) {
  return u.filter((p, v) => v === 0 || p.route.path && p.route.path.length > 0);
}
function Av(u, p) {
  let v = m1(u);
  return p ? v.map((g, y) => y === v.length - 1 ? g.pathname : g.pathnameBase) : v.map((g) => g.pathnameBase);
}
function Vv(u, p, v, g) {
  g === void 0 && (g = !1);
  let y;
  typeof u == "string" ? y = eo(u) : (y = Qu({}, u), ht(!y.pathname || !y.pathname.includes("?"), Tv("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), Tv("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), Tv("#", "search", "hash", y)));
  let R = u === "" || y.pathname === "", f = R ? "/" : y.pathname, k;
  if (f == null)
    k = v;
  else {
    let E = p.length - 1;
    if (!g && f.startsWith("..")) {
      let _ = f.split("/");
      for (; _[0] === ".."; )
        _.shift(), E -= 1;
      y.pathname = _.join("/");
    }
    k = E >= 0 ? p[E] : "/";
  }
  let D = d1(y, k), T = f && f !== "/" && f.endsWith("/"), O = (R || f === ".") && v.endsWith("/");
  return !D.pathname.endsWith("/") && (T || O) && (D.pathname += "/"), D;
}
const wr = (u) => u.join("/").replace(/\/\/+/g, "/"), v1 = (u) => u.replace(/\/+$/, "").replace(/^\/*/, "/"), h1 = (u) => !u || u === "?" ? "" : u.startsWith("?") ? u : "?" + u, y1 = (u) => !u || u === "#" ? "" : u.startsWith("#") ? u : "#" + u;
function g1(u) {
  return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.internal == "boolean" && "data" in u;
}
const bE = ["post", "put", "patch", "delete"];
new Set(bE);
const b1 = ["get", ...bE];
new Set(b1);
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
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (u[g] = v[g]);
    }
    return u;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ C.createContext(null);
Zu.displayName = "DataRouter";
const kv = /* @__PURE__ */ C.createContext(null);
kv.displayName = "DataRouterState";
const N1 = /* @__PURE__ */ C.createContext(null);
N1.displayName = "Await";
const ma = /* @__PURE__ */ C.createContext(null);
ma.displayName = "Navigation";
const es = /* @__PURE__ */ C.createContext(null);
es.displayName = "Location";
const Ua = /* @__PURE__ */ C.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ua.displayName = "Route";
const Uv = /* @__PURE__ */ C.createContext(null);
Uv.displayName = "RouteError";
function E1(u, p) {
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
  } = ts(u, {
    relative: v
  }), D = f;
  return g !== "/" && (D = f === "/" ? g : wr([g, f])), y.createHref({
    pathname: D,
    search: k,
    hash: R
  });
}
function to() {
  return C.useContext(es) != null;
}
function Qi() {
  return to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C.useContext(es).location;
}
const NE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function EE(u) {
  C.useContext(ma).static || C.useLayoutEffect(u);
}
function Fv() {
  let {
    isDataRoute: u
  } = C.useContext(Ua);
  return u ? k1() : S1();
}
function S1() {
  to() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let u = C.useContext(Zu), {
    basename: p,
    future: v,
    navigator: g
  } = C.useContext(ma), {
    matches: y
  } = C.useContext(Ua), {
    pathname: R
  } = Qi(), f = JSON.stringify(Av(y, v.v7_relativeSplatPath)), k = C.useRef(!1);
  return EE(() => {
    k.current = !0;
  }), C.useCallback(function(T, O) {
    if (O === void 0 && (O = {}), ka(k.current, NE), !k.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let E = Vv(T, JSON.parse(f), R, O.relative === "path");
    u == null && p !== "/" && (E.pathname = E.pathname === "/" ? p : wr([p, E.pathname])), (O.replace ? g.replace : g.push)(E, O.state, O);
  }, [p, g, f, R, u]);
}
function x1() {
  let {
    matches: u
  } = C.useContext(Ua), p = u[u.length - 1];
  return p ? p.params : {};
}
function ts(u, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    future: g
  } = C.useContext(ma), {
    matches: y
  } = C.useContext(Ua), {
    pathname: R
  } = Qi(), f = JSON.stringify(Av(y, g.v7_relativeSplatPath));
  return C.useMemo(() => Vv(u, JSON.parse(f), R, v === "path"), [u, f, R, v]);
}
function R1(u, p) {
  return C1(u, p);
}
function C1(u, p, v, g) {
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
  } = C.useContext(Ua), f = R[R.length - 1], k = f ? f.params : {}, D = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", O = f && f.route;
  {
    let I = O && O.path || "";
    xE(D, !O || I.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + D + '" (under <Route path="' + I + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + I + '"> to <Route ') + ('path="' + (I === "/" ? "*" : I + "/*") + '">.'));
  }
  let E = Qi(), _;
  if (p) {
    var V;
    let I = typeof p == "string" ? eo(p) : p;
    T === "/" || (V = I.pathname) != null && V.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + I.pathname + '" was given in the `location` prop.')), _ = I;
  } else
    _ = E;
  let Q = _.pathname || "/", pe = Q;
  if (T !== "/") {
    let I = T.replace(/^\//, "").split("/");
    pe = "/" + Q.replace(/^\//, "").split("/").slice(I.length).join("/");
  }
  let ae = Jw(u, {
    pathname: pe
  });
  ka(O || ae != null, 'No routes matched location "' + _.pathname + _.search + _.hash + '" '), ka(ae == null || ae[ae.length - 1].route.element !== void 0 || ae[ae.length - 1].route.Component !== void 0 || ae[ae.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + _.pathname + _.search + _.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let he = _1(ae && ae.map((I) => Object.assign({}, I, {
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
  return p && he ? /* @__PURE__ */ C.createElement(es.Provider, {
    value: {
      location: Xu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, _),
      navigationType: li.Pop
    }
  }, he) : he;
}
function D1() {
  let u = V1(), p = g1(u) ? u.status + " " + u.statusText : u instanceof Error ? u.message : JSON.stringify(u), v = u instanceof Error ? u.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, R = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", u), f = /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ C.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ C.createElement("code", {
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
const T1 = /* @__PURE__ */ C.createElement(D1, null);
class j1 extends C.Component {
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
    }, /* @__PURE__ */ C.createElement(Uv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function w1(u) {
  let {
    routeContext: p,
    match: v,
    children: g
  } = u, y = C.useContext(Zu);
  return y && y.static && y.staticContext && (v.route.errorElement || v.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = v.route.id), /* @__PURE__ */ C.createElement(Ua.Provider, {
    value: p
  }, g);
}
function _1(u, p, v, g) {
  var y;
  if (p === void 0 && (p = []), v === void 0 && (v = null), g === void 0 && (g = null), u == null) {
    var R;
    if (!v)
      return null;
    if (v.errors)
      u = v.matches;
    else if ((R = g) != null && R.v7_partialHydration && p.length === 0 && !v.initialized && v.matches.length > 0)
      u = v.matches;
    else
      return null;
  }
  let f = u, k = (y = v) == null ? void 0 : y.errors;
  if (k != null) {
    let O = f.findIndex((E) => E.route.id && (k == null ? void 0 : k[E.route.id]) !== void 0);
    O >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(k).join(",")), f = f.slice(0, Math.min(f.length, O + 1));
  }
  let D = !1, T = -1;
  if (v && g && g.v7_partialHydration)
    for (let O = 0; O < f.length; O++) {
      let E = f[O];
      if ((E.route.HydrateFallback || E.route.hydrateFallbackElement) && (T = O), E.route.id) {
        let {
          loaderData: _,
          errors: V
        } = v, Q = E.route.loader && _[E.route.id] === void 0 && (!V || V[E.route.id] === void 0);
        if (E.route.lazy || Q) {
          D = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((O, E, _) => {
    let V, Q = !1, pe = null, ae = null;
    v && (V = k && E.route.id ? k[E.route.id] : void 0, pe = E.route.errorElement || T1, D && (T < 0 && _ === 0 ? (xE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), Q = !0, ae = null) : T === _ && (Q = !0, ae = E.route.hydrateFallbackElement || null)));
    let he = p.concat(f.slice(0, _ + 1)), I = () => {
      let $;
      return V ? $ = pe : Q ? $ = ae : E.route.Component ? $ = /* @__PURE__ */ C.createElement(E.route.Component, null) : E.route.element ? $ = E.route.element : $ = O, /* @__PURE__ */ C.createElement(w1, {
        match: E,
        routeContext: {
          outlet: O,
          matches: he,
          isDataRoute: v != null
        },
        children: $
      });
    };
    return v && (E.route.ErrorBoundary || E.route.errorElement || _ === 0) ? /* @__PURE__ */ C.createElement(j1, {
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
var SE = /* @__PURE__ */ function(u) {
  return u.UseBlocker = "useBlocker", u.UseRevalidator = "useRevalidator", u.UseNavigateStable = "useNavigate", u;
}(SE || {}), Ju = /* @__PURE__ */ function(u) {
  return u.UseBlocker = "useBlocker", u.UseLoaderData = "useLoaderData", u.UseActionData = "useActionData", u.UseRouteError = "useRouteError", u.UseNavigation = "useNavigation", u.UseRouteLoaderData = "useRouteLoaderData", u.UseMatches = "useMatches", u.UseRevalidator = "useRevalidator", u.UseNavigateStable = "useNavigate", u.UseRouteId = "useRouteId", u;
}(Ju || {});
function zv(u) {
  return u + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function O1(u) {
  let p = C.useContext(Zu);
  return p || ht(!1, zv(u)), p;
}
function L1(u) {
  let p = C.useContext(kv);
  return p || ht(!1, zv(u)), p;
}
function M1(u) {
  let p = C.useContext(Ua);
  return p || ht(!1, zv(u)), p;
}
function Hv(u) {
  let p = M1(u), v = p.matches[p.matches.length - 1];
  return v.route.id || ht(!1, u + ' can only be used on routes that contain a unique "id"'), v.route.id;
}
function A1() {
  return Hv(Ju.UseRouteId);
}
function V1() {
  var u;
  let p = C.useContext(Uv), v = L1(Ju.UseRouteError), g = Hv(Ju.UseRouteError);
  return p !== void 0 ? p : (u = v.errors) == null ? void 0 : u[g];
}
function k1() {
  let {
    router: u
  } = O1(SE.UseNavigateStable), p = Hv(Ju.UseNavigateStable), v = C.useRef(!1);
  return EE(() => {
    v.current = !0;
  }), C.useCallback(function(y, R) {
    R === void 0 && (R = {}), ka(v.current, NE), v.current && (typeof y == "number" ? u.navigate(y) : u.navigate(y, Xu({
      fromRouteId: p
    }, R)));
  }, [u, p]);
}
const nE = {};
function xE(u, p, v) {
  !p && !nE[u] && (nE[u] = !0, ka(!1, v));
}
const aE = {};
function U1(u, p) {
  aE[p] || (aE[p] = !0, console.warn(p));
}
const rE = (u, p, v) => U1(u, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + u + "` future flag to opt-in early. ") + ("For more information, see " + v + "."));
function F1(u, p) {
  (u == null ? void 0 : u.v7_startTransition) === void 0 && rE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (u == null ? void 0 : u.v7_relativeSplatPath) === void 0 && rE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function z1(u) {
  let {
    to: p,
    replace: v,
    state: g,
    relative: y
  } = u;
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
  } = Qi(), T = Fv(), O = Vv(p, Av(k, R.v7_relativeSplatPath), D, y === "path"), E = JSON.stringify(O);
  return C.useEffect(() => T(JSON.parse(E), {
    replace: v,
    state: g,
    relative: y
  }), [T, E, y, v, g]), null;
}
function jr(u) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function H1(u) {
  let {
    basename: p = "/",
    children: v = null,
    location: g,
    navigationType: y = li.Pop,
    navigator: R,
    static: f = !1,
    future: k
  } = u;
  to() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let D = p.replace(/^\/*/, "/"), T = C.useMemo(() => ({
    basename: D,
    navigator: R,
    static: f,
    future: Xu({
      v7_relativeSplatPath: !1
    }, k)
  }), [D, k, R, f]);
  typeof g == "string" && (g = eo(g));
  let {
    pathname: O = "/",
    search: E = "",
    hash: _ = "",
    state: V = null,
    key: Q = "default"
  } = g, pe = C.useMemo(() => {
    let ae = ui(O, D);
    return ae == null ? null : {
      location: {
        pathname: ae,
        search: E,
        hash: _,
        state: V,
        key: Q
      },
      navigationType: y
    };
  }, [D, O, E, _, V, Q, y]);
  return ka(pe != null, '<Router basename="' + D + '"> is not able to match the URL ' + ('"' + O + E + _ + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ C.createElement(ma.Provider, {
    value: T
  }, /* @__PURE__ */ C.createElement(es.Provider, {
    children: v,
    value: pe
  }));
}
function B1(u) {
  let {
    children: p,
    location: v
  } = u;
  return R1(Lv(p), v);
}
new Promise(() => {
});
function Lv(u, p) {
  p === void 0 && (p = []);
  let v = [];
  return C.Children.forEach(u, (g, y) => {
    if (!/* @__PURE__ */ C.isValidElement(g))
      return;
    let R = [...p, y];
    if (g.type === C.Fragment) {
      v.push.apply(v, Lv(g.props.children, R));
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
    g.props.children && (f.children = Lv(g.props.children, R)), v.push(f);
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
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (u[g] = v[g]);
    }
    return u;
  }, Zl.apply(this, arguments);
}
function Bv(u, p) {
  if (u == null) return {};
  var v = {}, g = Object.keys(u), y, R;
  for (R = 0; R < g.length; R++)
    y = g[R], !(p.indexOf(y) >= 0) && (v[y] = u[y]);
  return v;
}
const mf = "get", vf = "application/x-www-form-urlencoded";
function gf(u) {
  return u != null && typeof u.tagName == "string";
}
function P1(u) {
  return gf(u) && u.tagName.toLowerCase() === "button";
}
function $1(u) {
  return gf(u) && u.tagName.toLowerCase() === "form";
}
function Y1(u) {
  return gf(u) && u.tagName.toLowerCase() === "input";
}
function I1(u) {
  return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey);
}
function q1(u, p) {
  return u.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !I1(u);
}
let pf = null;
function G1() {
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
const W1 = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function jv(u) {
  return u != null && !W1.has(u) ? (ka(!1, '"' + u + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : u;
}
function Q1(u, p) {
  let v, g, y, R, f;
  if ($1(u)) {
    let k = u.getAttribute("action");
    g = k ? ui(k, p) : null, v = u.getAttribute("method") || mf, y = jv(u.getAttribute("enctype")) || vf, R = new FormData(u);
  } else if (P1(u) || Y1(u) && (u.type === "submit" || u.type === "image")) {
    let k = u.form;
    if (k == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let D = u.getAttribute("formaction") || k.getAttribute("action");
    if (g = D ? ui(D, p) : null, v = u.getAttribute("formmethod") || k.getAttribute("method") || mf, y = jv(u.getAttribute("formenctype")) || jv(k.getAttribute("enctype")) || vf, R = new FormData(k, u), !G1()) {
      let {
        name: T,
        type: O,
        value: E
      } = u;
      if (O === "image") {
        let _ = T ? T + "." : "";
        R.append(_ + "x", "0"), R.append(_ + "y", "0");
      } else T && R.append(T, E);
    }
  } else {
    if (gf(u))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    v = mf, g = null, y = vf, f = u;
  }
  return R && y === "text/plain" && (f = R, R = void 0), {
    action: g,
    method: v.toLowerCase(),
    encType: y,
    formData: R,
    body: f
  };
}
const K1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], X1 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], J1 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], Z1 = "6";
try {
  window.__reactRouterVersion = Z1;
} catch {
}
const RE = /* @__PURE__ */ C.createContext({
  isTransitioning: !1
});
RE.displayName = "ViewTransition";
const e_ = /* @__PURE__ */ C.createContext(/* @__PURE__ */ new Map());
e_.displayName = "Fetchers";
const t_ = "startTransition", iE = qw[t_];
function n_(u) {
  let {
    basename: p,
    children: v,
    future: g,
    window: y
  } = u, R = C.useRef();
  R.current == null && (R.current = Qw({
    window: y,
    v5Compat: !0
  }));
  let f = R.current, [k, D] = C.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, O = C.useCallback((E) => {
    T && iE ? iE(() => D(E)) : D(E);
  }, [D, T]);
  return C.useLayoutEffect(() => f.listen(O), [f, O]), C.useEffect(() => F1(g), [g]), /* @__PURE__ */ C.createElement(H1, {
    basename: p,
    children: v,
    location: k.location,
    navigationType: k.action,
    navigator: f,
    future: g
  });
}
const a_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", r_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ C.forwardRef(function(p, v) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: R,
    replace: f,
    state: k,
    target: D,
    to: T,
    preventScrollReset: O,
    viewTransition: E
  } = p, _ = Bv(p, K1), {
    basename: V
  } = C.useContext(ma), Q, pe = !1;
  if (typeof T == "string" && r_.test(T) && (Q = T, a_))
    try {
      let $ = new URL(window.location.href), G = T.startsWith("//") ? new URL($.protocol + T) : new URL(T), B = ui(G.pathname, V);
      G.origin === $.origin && B != null ? T = B + G.search + G.hash : pe = !0;
    } catch {
      ka(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ae = E1(T, {
    relative: y
  }), he = u_(T, {
    replace: f,
    state: k,
    target: D,
    preventScrollReset: O,
    relative: y,
    viewTransition: E
  });
  function I($) {
    g && g($), $.defaultPrevented || he($);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ C.createElement("a", Zl({}, _, {
      href: Q || ae,
      onClick: pe || R ? g : I,
      ref: v,
      target: D
    }))
  );
});
ii.displayName = "Link";
const i_ = /* @__PURE__ */ C.forwardRef(function(p, v) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: R = "",
    end: f = !1,
    style: k,
    to: D,
    viewTransition: T,
    children: O
  } = p, E = Bv(p, X1), _ = ts(D, {
    relative: E.relative
  }), V = Qi(), Q = C.useContext(kv), {
    navigator: pe,
    basename: ae
  } = C.useContext(ma), he = Q != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  m_(_) && T === !0, I = pe.encodeLocation ? pe.encodeLocation(_).pathname : _.pathname, $ = V.pathname, G = Q && Q.navigation && Q.navigation.location ? Q.navigation.location.pathname : null;
  y || ($ = $.toLowerCase(), G = G ? G.toLowerCase() : null, I = I.toLowerCase()), G && ae && (G = ui(G, ae) || G);
  const B = I !== "/" && I.endsWith("/") ? I.length - 1 : I.length;
  let ge = $ === I || !f && $.startsWith(I) && $.charAt(B) === "/", ce = G != null && (G === I || !f && G.startsWith(I) && G.charAt(I.length) === "/"), X = {
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
  }), typeof O == "function" ? O(X) : O);
});
i_.displayName = "NavLink";
const l_ = /* @__PURE__ */ C.forwardRef((u, p) => {
  let {
    fetcherKey: v,
    navigate: g,
    reloadDocument: y,
    replace: R,
    state: f,
    method: k = mf,
    action: D,
    onSubmit: T,
    relative: O,
    preventScrollReset: E,
    viewTransition: _
  } = u, V = Bv(u, J1), Q = d_(), pe = p_(D, {
    relative: O
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
      relative: O,
      preventScrollReset: E,
      viewTransition: _
    });
  };
  return /* @__PURE__ */ C.createElement("form", Zl({
    ref: p,
    method: ae,
    action: pe,
    onSubmit: y ? T : he
  }, V));
});
l_.displayName = "Form";
var yf;
(function(u) {
  u.UseScrollRestoration = "useScrollRestoration", u.UseSubmit = "useSubmit", u.UseSubmitFetcher = "useSubmitFetcher", u.UseFetcher = "useFetcher", u.useViewTransitionState = "useViewTransitionState";
})(yf || (yf = {}));
var lE;
(function(u) {
  u.UseFetcher = "useFetcher", u.UseFetchers = "useFetchers", u.UseScrollRestoration = "useScrollRestoration";
})(lE || (lE = {}));
function o_(u) {
  return u + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function CE(u) {
  let p = C.useContext(Zu);
  return p || ht(!1, o_(u)), p;
}
function u_(u, p) {
  let {
    target: v,
    replace: g,
    state: y,
    preventScrollReset: R,
    relative: f,
    viewTransition: k
  } = p === void 0 ? {} : p, D = Fv(), T = Qi(), O = ts(u, {
    relative: f
  });
  return C.useCallback((E) => {
    if (q1(E, v)) {
      E.preventDefault();
      let _ = g !== void 0 ? g : Ku(T) === Ku(O);
      D(u, {
        replace: _,
        state: y,
        preventScrollReset: R,
        relative: f,
        viewTransition: k
      });
    }
  }, [T, D, O, g, y, v, u, R, f, k]);
}
function s_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let c_ = 0, f_ = () => "__" + String(++c_) + "__";
function d_() {
  let {
    router: u
  } = CE(yf.UseSubmit), {
    basename: p
  } = C.useContext(ma), v = A1();
  return C.useCallback(function(g, y) {
    y === void 0 && (y = {}), s_();
    let {
      action: R,
      method: f,
      encType: k,
      formData: D,
      body: T
    } = Q1(g, p);
    if (y.navigate === !1) {
      let O = y.fetcherKey || f_();
      u.fetch(O, v, y.action || R, {
        preventScrollReset: y.preventScrollReset,
        formData: D,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || k,
        flushSync: y.flushSync
      });
    } else
      u.navigate(y.action || R, {
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
  }, [u, p, v]);
}
function p_(u, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    basename: g
  } = C.useContext(ma), y = C.useContext(Ua);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [R] = y.matches.slice(-1), f = Zl({}, ts(u || ".", {
    relative: v
  })), k = Qi();
  if (u == null) {
    f.search = k.search;
    let D = new URLSearchParams(f.search), T = D.getAll("index");
    if (T.some((E) => E === "")) {
      D.delete("index"), T.filter((_) => _).forEach((_) => D.append("index", _));
      let E = D.toString();
      f.search = E ? "?" + E : "";
    }
  }
  return (!u || u === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : wr([g, f.pathname])), Ku(f);
}
function m_(u, p) {
  p === void 0 && (p = {});
  let v = C.useContext(RE);
  v == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = CE(yf.useViewTransitionState), y = ts(u, {
    relative: p.relative
  });
  if (!v.isTransitioning)
    return !1;
  let R = ui(v.currentLocation.pathname, g) || v.currentLocation.pathname, f = ui(v.nextLocation.pathname, g) || v.nextLocation.pathname;
  return Ov(y.pathname, f) != null || Ov(y.pathname, R) != null;
}
function v_() {
  const [u, p] = C.useState(null), [v, g] = C.useState(""), [y, R] = C.useState(""), [f, k] = C.useState(!0), [D, T] = C.useState(""), [O, E] = C.useState(""), [_, V] = C.useState(!1), [Q, pe] = C.useState(!1);
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
    const G = ($ == null ? void 0 : $.code) || "", B = ($ == null ? void 0 : $.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || B.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : B || "Something went wrong.";
  }
  async function he($) {
    $.preventDefault(), T(""), E(""), V(!0);
    try {
      if (!(u != null && u.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(u), B = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ge, setPersistence: ce, browserLocalPersistence: X, browserSessionPersistence: ie, signInWithEmailAndPassword: J } = B, U = ge();
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
      if (!(u != null && u.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(u), { getAuth: G, sendPasswordResetEmail: B } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ge = G();
      await B(ge, v.trim()), E("If an account exists for that email, a reset link has been sent.");
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
      O && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: O }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: _, type: "submit", children: _ ? "Signing in…" : "Sign in" }, void 0, !1, {
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
function h_() {
  const [u, p] = C.useState(null), [v, g] = C.useState(""), [y, R] = C.useState(""), [f, k] = C.useState(""), [D, T] = C.useState(""), [O, E] = C.useState(""), [_, V] = C.useState(""), [Q, pe] = C.useState(""), [ae, he] = C.useState(!1), [I, $] = C.useState(!1), [G, B] = C.useState(!1), [ge, ce] = C.useState(!1);
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
      if (B(Te.fn), ce(Te.cn || oe.length < 7), Te.fn || Te.cn) {
        V("Please fill in required fields");
        return;
      }
      if (oe.length < 7) {
        V("Please enter a valid mobile number");
        return;
      }
      if (D !== O) throw new Error("Passwords do not match");
      if (!(u != null && u.apiKey)) throw new Error("Firebase not configured");
      const je = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(u), { getAuth: Le, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Je = Le(), Kt = await (await ye(Je, f.trim(), D)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Kt, profile: { fullName: U, contactNumber: ve } }) })).ok) throw new Error("Session creation failed");
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
    _ && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: _ }, void 0, !1, {
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
          g(J.target.value), G && B(!String(J.target.value).trim());
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: O, onChange: (J) => E(J.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
function y_() {
  const [u, p] = C.useState([]);
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
    if (!u.length) return;
    const v = u.map((g) => setTimeout(() => {
      p((y) => y.filter((R) => R.id !== g.id));
    }, g.ttl));
    return () => {
      v.forEach(clearTimeout);
    };
  }, [u]), u.length ? /* @__PURE__ */ d.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: u.map((v) => /* @__PURE__ */ d.jsxDEV("div", { className: `toast ${v.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
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
function oi({ children: u }) {
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
  const p = Fv();
  return C.useEffect(() => {
    const v = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(E, _, V) {
      E && (E.classList.toggle("hidden", !V), E.setAttribute("aria-hidden", V ? "false" : "true"), _ && _.setAttribute("aria-expanded", V ? "true" : "false"));
    }
    function k() {
      f(g, v, !1), f(R, y, !1);
    }
    function D(E) {
      const _ = (V) => V && (V === E.target || V.contains(E.target));
      !_(g) && !_(v) && !_(R) && !_(y) && k();
    }
    function T(E) {
      E.key === "Escape" && k();
    }
    function O(E) {
      E && E.querySelectorAll(".dropdown-item").forEach((_) => {
        _.addEventListener("click", () => k());
      });
    }
    return v && g && (v.addEventListener("click", (E) => {
      E.stopPropagation(), f(R, y, !1), f(g, v, g.classList.contains("hidden"));
    }), O(g)), y && R && (y.addEventListener("click", (E) => {
      E.stopPropagation(), f(g, v, !1), f(R, y, R.classList.contains("hidden"));
    }), O(R)), document.addEventListener("click", D), document.addEventListener("keydown", T), () => {
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
    /* @__PURE__ */ d.jsxDEV(y_, {}, void 0, !1, {
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
function g_({ onClose: u, onCreated: p }) {
  const [v, g] = C.useState(""), [y, R] = C.useState(""), [f, k] = C.useState(""), [D, T] = C.useState(""), [O, E] = C.useState(!1), [_, V] = C.useState(""), [Q, pe] = C.useState(""), [ae, he] = C.useState(!1), [I, $] = C.useState(!1), [G, B] = C.useState(!1), [ge, ce] = C.useState(!1);
  async function X() {
    V(""), pe(""), ce(!0);
    const ie = String(v).trim(), J = String(y), U = String(f).trim(), ve = String(D).trim(), oe = ve.replace(/\D+/g, ""), Te = { fn: !U, cn: !ve, pw: !J };
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
          V("Full name, mobile and password are required"), he(!U), $(!ve || oe.length < 7), B(!J);
        else if (Je.includes("EMAIL_EXISTS"))
          V("An account with this email already exists. Use a different email or leave email blank.");
        else if (Je.includes("INVALID_EMAIL"))
          V("Please enter a valid email");
        else if (Je.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ye))
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
          R(ie.target.value), ge && B(!String(ie.target.value));
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
      _ && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: _ }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: u, disabled: O, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: O, children: O ? "Creating…" : "Create" }, void 0, !1, {
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
function b_() {
  const [u, p] = C.useState([]), [v, g] = C.useState(""), [y, R] = C.useState("all"), [f, k] = C.useState("all"), [D, T] = C.useState("all"), [O, E] = C.useState(!0), [_, V] = C.useState(""), [Q, pe] = C.useState(1), [ae, he] = C.useState(20), [I, $] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [G, B] = C.useState(!1);
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
  const ge = C.useMemo(() => u.filter((X) => {
    if (v && !X.name.toLowerCase().includes(v.toLowerCase().trim()) || D !== "all" && X.status !== D || f !== "all" && String(X.id) !== String(f)) return !1;
    if (y !== "all") {
      const ie = parseInt(X.lastActiveDays, 10) || 9999, J = parseInt(y, 10);
      if (!(ie <= J)) return !1;
    }
    return !0;
  }), [u, v, D, f, y]), ce = C.useMemo(() => {
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
      G && /* @__PURE__ */ d.jsxDEV(g_, { onClose: () => B(!1), onCreated: () => {
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
          O && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 127,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 127,
            columnNumber: 17
          }, this),
          !O && _ && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "auth-error", children: _ }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 17
          }, this),
          !O && !_ && ge.map((X) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": X.id, "data-status": X.status, "data-last-days": X.lastActiveDays, children: [
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
          !O && !_ && ge.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 5, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: I.page <= 1 || O, onClick: () => pe((X) => Math.max(1, X - 1)), children: "Prev" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: I.page >= I.pages || O, onClick: () => pe((X) => Math.min(I.pages, X + 1)), children: "Next" }, void 0, !1, {
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
function N_() {
  const { id: u } = x1(), [p, v] = C.useState(null), [g, y] = C.useState(!0), [R, f] = C.useState("");
  if (C.useEffect(() => {
    let O = !0;
    return (async () => {
      y(!0), f("");
      try {
        const E = await fetch(`/api/riders/${u}`, { credentials: "include" });
        if (E.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!E.ok) throw new Error("Failed to load rider");
        const _ = await E.json();
        O && v(_);
      } catch (E) {
        O && f(E.message || "Failed to load rider");
      } finally {
        O && y(!1);
      }
    })(), () => {
      O = !1;
    };
  }, [u]), g)
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
      /* @__PURE__ */ d.jsxDEV("tbody", { children: (T || []).map((O, E) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
      ] }, E, !0, {
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
function DE({ orderId: u, onClose: p, onAssigned: v }) {
  const [g, y] = C.useState([]), [R, f] = C.useState(!0), [k, D] = C.useState(""), [T, O] = C.useState(null);
  C.useEffect(() => {
    let _ = !0;
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
        _ && y(Array.isArray(Q.riders) ? Q.riders : Q.riders || []);
      } catch (V) {
        _ && D(V.message || "Failed to load riders");
      } finally {
        _ && f(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, []);
  async function E(_) {
    if (!(!u || !_)) {
      O(_);
      try {
        const V = await fetch(`/api/orders/${encodeURIComponent(u)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: _ })
        });
        if (V.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const Q = await V.json().catch(() => null);
        if (!V.ok) throw new Error(Q && Q.error ? Q.error : "Assign failed");
        v && v({ orderId: u, riderId: _ }), p();
      } catch (V) {
        alert(V.message || "Failed to assign rider");
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
          g.map((_) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { children: _.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 62,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: _.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 63,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-assign", onClick: () => E(_.id), disabled: T && T !== _.id, children: T === _.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 65,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 64,
              columnNumber: 21
            }, this)
          ] }, _.id, !0, {
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
function Mv(u) {
  if (typeof u != "string") return "";
  const p = u.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return p === "in_transit" ? "in_progress" : p;
}
function TE(u) {
  return u && typeof u.current_status == "string" ? u.current_status : "";
}
function oE(u) {
  return Mv(TE(u));
}
function jE(u) {
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
function E_(u) {
  if (u == null) return "-";
  if (typeof u == "object" && u.minutes !== void 0) {
    const v = Number(u.minutes);
    if (Number.isFinite(v)) return `${v} min`;
  }
  const p = jE(u);
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
    const g = v.match(/^(\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : v;
  }
  return String(u);
}
function S_(u) {
  var g, y, R, f, k, D, T, O;
  if (!u || typeof u != "object") return null;
  const p = [
    u.expected_delivery_time,
    u.expectedDeliveryTime,
    (g = u.order) == null ? void 0 : g.expected_delivery_time,
    (y = u.order) == null ? void 0 : y.expectedDeliveryTime,
    (R = u.orders) == null ? void 0 : R.expected_delivery_time,
    (f = u.orders) == null ? void 0 : f.expectedDeliveryTime,
    (k = u.delivery) == null ? void 0 : k.expected_delivery_time,
    (D = u.delivery) == null ? void 0 : D.expectedDeliveryTime,
    (T = u.expected_delivery) == null ? void 0 : T.time,
    (O = u.expected_delivery) == null ? void 0 : O.minutes,
    u.expected_time,
    u.expectedTime
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
  const v = u.delivery_events || u.deliveryEvents || u.events || null;
  if (Array.isArray(v))
    for (let E = v.length - 1; E >= 0; E -= 1) {
      const _ = v[E];
      if (!_) continue;
      const V = typeof _.type == "string" ? _.type.toLowerCase().trim() : "";
      if (!(V !== "eta" && V !== "expected")) {
        if (_.expectedMinutes !== void 0 && _.expectedMinutes !== null) return { minutes: _.expectedMinutes };
        if (_.minutes !== void 0 && _.minutes !== null) return { minutes: _.minutes };
        if (_.expectedAt) return _.expectedAt;
      }
    }
  return null;
}
function uE(u) {
  const p = jE(u);
  if (!(p instanceof Date) || Number.isNaN(p.getTime())) return "-";
  try {
    return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
const x_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], sE = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function R_() {
  const [u, p] = C.useState([]), [v, g] = C.useState(""), [y, R] = C.useState("all"), [f, k] = C.useState(1), [D, T] = C.useState(20), [O, E] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [_, V] = C.useState(!0), [Q, pe] = C.useState(""), [ae, he] = C.useState(""), [I, $] = C.useState(!0), [G, B] = C.useState(!1), [ge, ce] = C.useState(null);
  C.useEffect(() => {
    let U = !0;
    return (async () => {
      var ve, oe, Te, je;
      V(!0), pe(""), he("");
      try {
        const Le = new URLSearchParams();
        if (v && Le.set("q", v), y && y !== "all") {
          const dn = sE[y] || y;
          Le.set("status", Mv(dn));
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
  }, [v, y, f, D]), C.useMemo(() => u, [u]);
  const X = C.useMemo(() => {
    if (!Array.isArray(u)) return [];
    if (y === "all") return u.slice();
    const U = Mv(sE[y] || y);
    return u.filter((ve) => oE(ve) === U);
  }, [u, y]);
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
        lineNumber: 213,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 214,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 212,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 219,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: v, onChange: (U) => {
          g(U.target.value), k(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 220,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 218,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        x_.map(({ key: U, label: ve }) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${y === U ? " active" : ""}`, onClick: () => {
          R(U), k(1);
        }, "data-filter": U, children: ve }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 224,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (U) => {
          T(parseInt(U.target.value, 10)), k(1);
        }, children: [10, 20, 50, 100].map((U) => /* @__PURE__ */ d.jsxDEV("option", { value: U, children: [
          U,
          "/page"
        ] }, U, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 229,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 228,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 222,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 217,
      columnNumber: 9
    }, this),
    !I && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 235,
      columnNumber: 11
    }, this),
    ae && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ae }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 237,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 243,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 244,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 245,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 246,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 247,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 248,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 249,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 250,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 242,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 241,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        _ && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 255,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 255,
          columnNumber: 17
        }, this),
        !_ && Q && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "auth-error", children: Q }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 258,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 258,
          columnNumber: 17
        }, this),
        !_ && !Q && X.map((U, ve) => {
          var In;
          const oe = TE(U), Te = oE(U), je = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let Le = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? Le = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? Le = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((Rt) => String(Rt || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? Le = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (Le = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((Rt) => String(Rt || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = U.name || U.order_number || U.id, dn = (ye != null ? String(ye).replace(/^#+/, "").trim() : "") || "-", Kt = U.deliveryStartTime ?? U.delivery_start_time ?? U.start_time ?? null, Sn = uE(Kt), Dt = S_(U), Yn = E_(Dt), Xt = uE(U.actual_delivery_time ?? U.delivery_completion_time ?? null), va = U.rider ? String(U.rider) : (In = U.assignment) != null && In.riderId ? String(U.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Te, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name order-id-cell", children: dn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 288,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km customer-cell", children: je || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 289,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf address-cell", children: Le }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 290,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider rider-cell", children: va }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 291,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Sn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 292,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Yn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 293,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: Xt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 294,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Te}`, children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 295,
              columnNumber: 63
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 295,
              columnNumber: 21
            }, this)
          ] }, ye || ve, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 287,
            columnNumber: 19
          }, this);
        }),
        !_ && !Q && X.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 300,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 300,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 253,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 240,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 239,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      G && ge && /* @__PURE__ */ d.jsxDEV(DE, { orderId: ge, onClose: ie, onAssigned: J }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 307,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || _, onClick: () => k((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 311,
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
          lineNumber: 312,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || _, onClick: () => k((U) => Math.min(O.pages, U + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 313,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 310,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 305,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 211,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 210,
    columnNumber: 5
  }, this);
}
function C_() {
  const [u, p] = C.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [v, g] = C.useState([]), [y, R] = C.useState(!1), [f, k] = C.useState(!0), [D, T] = C.useState("");
  return C.useEffect(() => {
    let O = !0;
    return (async () => {
      k(!0), T("");
      try {
        const E = await fetch("/api/reports", { credentials: "include" });
        if (E.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!E.ok) throw new Error("Failed to load reports");
        const _ = await E.json();
        O && (p(_.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(_.deliveries) ? _.deliveries : []));
      } catch (E) {
        O && T(E.message || "Failed to load reports");
      } finally {
        O && k(!1);
      }
    })(), () => {
      O = !1;
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: y, onChange: (O) => R(O.target.checked) }, void 0, !1, {
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
          !f && !D && v.map((O, E) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
          ] }, O.orderId || E, !0, {
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
function D_() {
  const [u, p] = C.useState([]), [v, g] = C.useState(!0), [y, R] = C.useState(""), [f, k] = C.useState(1), [D, T] = C.useState(25), [O, E] = C.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  C.useEffect(() => {
    let G = !0;
    return (async () => {
      var B, ge, ce, X;
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
        G && (p(Array.isArray(U.orders) ? U.orders : []), E({ total: ((B = U.meta) == null ? void 0 : B.total) || 0, page: ((ge = U.meta) == null ? void 0 : ge.page) || f, limit: ((ce = U.meta) == null ? void 0 : ce.limit) || D, pages: ((X = U.meta) == null ? void 0 : X.pages) || 1 }));
      } catch (ie) {
        G && R(ie.message || "Failed to load orders");
      } finally {
        G && g(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [f]);
  function _(G) {
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
      const { orderId: B } = G || {};
      if (!B) return;
      const ge = String(B).replace(/^#+/, "");
      p((ce) => ce.filter((X, ie) => {
        const J = String(X.id || X.name || X.order_number || ie).replace(/^#+/, "");
        return String(J) !== String(ge);
      })), E((ce) => ({ ...ce || {}, total: Math.max(0, ((ce == null ? void 0 : ce.total) || 0) - 1) }));
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: v ? "…" : O.total || u.length }, void 0, !1, {
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
        !v && !y && (Array.isArray(u) ? u.filter((B) => _(B) === "new") : []).map((B, ge) => {
          const ce = _(B), X = B.full_name || (B.customer && B.customer.full_name ? B.customer.full_name : "");
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
        !v && !y && u.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || v, onClick: () => k((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
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
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 141,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || v, onClick: () => k((G) => Math.min(O.pages, G + 1)), children: "Next" }, void 0, !1, {
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
    V && pe && /* @__PURE__ */ d.jsxDEV(DE, { orderId: pe, onClose: I, onAssigned: $ }, void 0, !1, {
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
function T_() {
  return /* @__PURE__ */ d.jsxDEV(n_, { children: /* @__PURE__ */ d.jsxDEV(B1, { children: [
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(h_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(b_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(N_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(R_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(C_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(D_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(z1, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function cE() {
  const u = document.getElementById("react-root");
  if (!u) return;
  hE(u).render(/* @__PURE__ */ d.jsxDEV(T_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", cE) : cE();
