function ew(o, p) {
  for (var m = 0; m < p.length; m++) {
    const g = p[m];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const y in g)
        if (y !== "default" && !(y in o)) {
          const S = Object.getOwnPropertyDescriptor(g, y);
          S && Object.defineProperty(o, y, S.get ? S : {
            enumerable: !0,
            get: () => g[y]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }));
}
function tw(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var hx = { exports: {} }, Vv = {}, gx = { exports: {} }, yf = { exports: {} };
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), T = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), j = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), ne = Symbol.iterator, ve = "@@iterator";
    function Y(f) {
      if (f === null || typeof f != "object")
        return null;
      var b = ne && f[ne] || f[ve];
      return typeof b == "function" ? b : null;
    }
    var $ = {
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
    }, ge = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, ue = {}, X = null;
    function Z(f) {
      X = f;
    }
    ue.setExtraStackFrame = function(f) {
      X = f;
    }, ue.getCurrentStack = null, ue.getStackAddendum = function() {
      var f = "";
      X && (f += X);
      var b = ue.getCurrentStack;
      return b && (f += b() || ""), f;
    };
    var Q = !1, U = !1, fe = !1, ee = !1, Te = !1, je = {
      ReactCurrentDispatcher: $,
      ReactCurrentBatchConfig: q,
      ReactCurrentOwner: ge
    };
    je.ReactDebugCurrentFrame = ue, je.ReactCurrentActQueue = P;
    function Le(f) {
      {
        for (var b = arguments.length, M = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          M[F - 1] = arguments[F];
        Je("warn", f, M);
      }
    }
    function ye(f) {
      {
        for (var b = arguments.length, M = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          M[F - 1] = arguments[F];
        Je("error", f, M);
      }
    }
    function Je(f, b, M) {
      {
        var F = je.ReactDebugCurrentFrame, J = F.getStackAddendum();
        J !== "" && (b += "%s", M = M.concat([J]));
        var Re = M.map(function(me) {
          return String(me);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[f], console, Re);
      }
    }
    var pn = {};
    function Qt(f, b) {
      {
        var M = f.constructor, F = M && (M.displayName || M.name) || "ReactClass", J = F + "." + b;
        if (pn[J])
          return;
        ye("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, F), pn[J] = !0;
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
      isMounted: function(f) {
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
      enqueueForceUpdate: function(f, b, M) {
        Qt(f, "forceUpdate");
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
      enqueueReplaceState: function(f, b, M, F) {
        Qt(f, "replaceState");
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
      enqueueSetState: function(f, b, M, F) {
        Qt(f, "setState");
      }
    }, Ct = Object.assign, In = {};
    Object.freeze(In);
    function Xt(f, b, M) {
      this.props = f, this.context = b, this.refs = In, this.updater = M || Sn;
    }
    Xt.prototype.isReactComponent = {}, Xt.prototype.setState = function(f, b) {
      if (typeof f != "object" && typeof f != "function" && f != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, f, b, "setState");
    }, Xt.prototype.forceUpdate = function(f) {
      this.updater.enqueueForceUpdate(this, f, "forceUpdate");
    };
    {
      var va = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, na = function(f, b) {
        Object.defineProperty(Xt.prototype, f, {
          get: function() {
            Le("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Dt in va)
        va.hasOwnProperty(Dt) && na(Dt, va[Dt]);
    }
    function Jt() {
    }
    Jt.prototype = Xt.prototype;
    function Zt(f, b, M) {
      this.props = f, this.context = b, this.refs = In, this.updater = M || Sn;
    }
    var en = Zt.prototype = new Jt();
    en.constructor = Zt, Ct(en, Xt.prototype), en.isPureReactComponent = !0;
    function tn() {
      var f = {
        current: null
      };
      return Object.seal(f), f;
    }
    var kn = Array.isArray;
    function Bt(f) {
      return kn(f);
    }
    function Rn(f) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, M = b && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return M;
      }
    }
    function $t(f) {
      try {
        return Yt(f), !1;
      } catch {
        return !0;
      }
    }
    function Yt(f) {
      return "" + f;
    }
    function aa(f) {
      if ($t(f))
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(f)), Yt(f);
    }
    function ar(f, b, M) {
      var F = f.displayName;
      if (F)
        return F;
      var J = b.displayName || b.name || "";
      return J !== "" ? M + "(" + J + ")" : M;
    }
    function ha(f) {
      return f.displayName || "Context";
    }
    function Un(f) {
      if (f == null)
        return null;
      if (typeof f.tag == "number" && ye("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof f == "function")
        return f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case S:
          return "Fragment";
        case y:
          return "Portal";
        case O:
          return "Profiler";
        case c:
          return "StrictMode";
        case x:
          return "Suspense";
        case j:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case T:
            var b = f;
            return ha(b) + ".Consumer";
          case C:
            var M = f;
            return ha(M._context) + ".Provider";
          case V:
            return ar(f, f.render, "ForwardRef");
          case k:
            var F = f.displayName || null;
            return F !== null ? F : Un(f.type) || "Memo";
          case K: {
            var J = f, Re = J._payload, me = J._init;
            try {
              return Un(me(Re));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var mn = Object.prototype.hasOwnProperty, nn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Cn, za, Ot;
    Ot = {};
    function Dn(f) {
      if (mn.call(f, "ref")) {
        var b = Object.getOwnPropertyDescriptor(f, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return f.ref !== void 0;
    }
    function Fn(f) {
      if (mn.call(f, "key")) {
        var b = Object.getOwnPropertyDescriptor(f, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return f.key !== void 0;
    }
    function Vr(f, b) {
      var M = function() {
        Cn || (Cn = !0, ye("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      M.isReactWarning = !0, Object.defineProperty(f, "key", {
        get: M,
        configurable: !0
      });
    }
    function rr(f, b) {
      var M = function() {
        za || (za = !0, ye("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      M.isReactWarning = !0, Object.defineProperty(f, "ref", {
        get: M,
        configurable: !0
      });
    }
    function ae(f) {
      if (typeof f.ref == "string" && ge.current && f.__self && ge.current.stateNode !== f.__self) {
        var b = Un(ge.current.type);
        Ot[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, f.ref), Ot[b] = !0);
      }
    }
    var be = function(f, b, M, F, J, Re, me) {
      var Ve = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: f,
        key: b,
        ref: M,
        props: me,
        // Record the component responsible for creating this element.
        _owner: Re
      };
      return Ve._store = {}, Object.defineProperty(Ve._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Ve, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: F
      }), Object.defineProperty(Ve, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: J
      }), Object.freeze && (Object.freeze(Ve.props), Object.freeze(Ve)), Ve;
    };
    function Fe(f, b, M) {
      var F, J = {}, Re = null, me = null, Ve = null, $e = null;
      if (b != null) {
        Dn(b) && (me = b.ref, ae(b)), Fn(b) && (aa(b.key), Re = "" + b.key), Ve = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (F in b)
          mn.call(b, F) && !nn.hasOwnProperty(F) && (J[F] = b[F]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        J.children = M;
      else if (tt > 1) {
        for (var ot = Array(tt), ut = 0; ut < tt; ut++)
          ot[ut] = arguments[ut + 2];
        Object.freeze && Object.freeze(ot), J.children = ot;
      }
      if (f && f.defaultProps) {
        var He = f.defaultProps;
        for (F in He)
          J[F] === void 0 && (J[F] = He[F]);
      }
      if (Re || me) {
        var vt = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
        Re && Vr(J, vt), me && rr(J, vt);
      }
      return be(f, Re, me, Ve, $e, ge.current, J);
    }
    function et(f, b) {
      var M = be(f.type, b, f.ref, f._self, f._source, f._owner, f.props);
      return M;
    }
    function ct(f, b, M) {
      if (f == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
      var F, J = Ct({}, f.props), Re = f.key, me = f.ref, Ve = f._self, $e = f._source, tt = f._owner;
      if (b != null) {
        Dn(b) && (me = b.ref, tt = ge.current), Fn(b) && (aa(b.key), Re = "" + b.key);
        var ot;
        f.type && f.type.defaultProps && (ot = f.type.defaultProps);
        for (F in b)
          mn.call(b, F) && !nn.hasOwnProperty(F) && (b[F] === void 0 && ot !== void 0 ? J[F] = ot[F] : J[F] = b[F]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        J.children = M;
      else if (ut > 1) {
        for (var He = Array(ut), vt = 0; vt < ut; vt++)
          He[vt] = arguments[vt + 2];
        J.children = He;
      }
      return be(f.type, Re, me, Ve, $e, tt, J);
    }
    function gt(f) {
      return typeof f == "object" && f !== null && f.$$typeof === g;
    }
    var yt = ".", vn = ":";
    function Nt(f) {
      var b = /[=:]/g, M = {
        "=": "=0",
        ":": "=2"
      }, F = f.replace(b, function(J) {
        return M[J];
      });
      return "$" + F;
    }
    var it = !1, xt = /\/+/g;
    function ga(f) {
      return f.replace(xt, "$&/");
    }
    function ya(f, b) {
      return typeof f == "object" && f !== null && f.key != null ? (aa(f.key), Nt("" + f.key)) : b.toString(36);
    }
    function ra(f, b, M, F, J) {
      var Re = typeof f;
      (Re === "undefined" || Re === "boolean") && (f = null);
      var me = !1;
      if (f === null)
        me = !0;
      else
        switch (Re) {
          case "string":
          case "number":
            me = !0;
            break;
          case "object":
            switch (f.$$typeof) {
              case g:
              case y:
                me = !0;
            }
        }
      if (me) {
        var Ve = f, $e = J(Ve), tt = F === "" ? yt + ya(Ve, 0) : F;
        if (Bt($e)) {
          var ot = "";
          tt != null && (ot = ga(tt) + "/"), ra($e, b, ot, "", function(jf) {
            return jf;
          });
        } else $e != null && (gt($e) && ($e.key && (!Ve || Ve.key !== $e.key) && aa($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          M + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Ve || Ve.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ga("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var ut, He, vt = 0, Tt = F === "" ? yt : F + vn;
      if (Bt(f))
        for (var Ni = 0; Ni < f.length; Ni++)
          ut = f[Ni], He = Tt + ya(ut, Ni), vt += ra(ut, b, M, He, J);
      else {
        var No = Y(f);
        if (typeof No == "function") {
          var ur = f;
          No === ur.entries && (it || Le("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var xo = No.call(ur), Eo, Tf = 0; !(Eo = xo.next()).done; )
            ut = Eo.value, He = Tt + ya(ut, Tf++), vt += ra(ut, b, M, He, J);
        } else if (Re === "object") {
          var vs = String(f);
          throw new Error("Objects are not valid as a React child (found: " + (vs === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : vs) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function ir(f, b, M) {
      if (f == null)
        return f;
      var F = [], J = 0;
      return ra(f, F, "", "", function(Re) {
        return b.call(M, Re, J++);
      }), F;
    }
    function ro(f) {
      var b = 0;
      return ir(f, function() {
        b++;
      }), b;
    }
    function ci(f, b, M) {
      ir(f, function() {
        b.apply(this, arguments);
      }, M);
    }
    function Ji(f) {
      return ir(f, function(b) {
        return b;
      }) || [];
    }
    function Zi(f) {
      if (!gt(f))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return f;
    }
    function fi(f) {
      var b = {
        $$typeof: T,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: f,
        _currentValue2: f,
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
        $$typeof: C,
        _context: b
      };
      var M = !1, F = !1, J = !1;
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
            set: function(me) {
              b.Provider = me;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(me) {
              b._currentValue = me;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(me) {
              b._currentValue2 = me;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(me) {
              b._threadCount = me;
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
            set: function(me) {
              J || (Le("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", me), J = !0);
            }
          }
        }), b.Consumer = Re;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var ba = -1, ia = 0, qn = 1, Ha = 2;
    function di(f) {
      if (f._status === ba) {
        var b = f._result, M = b();
        if (M.then(function(Re) {
          if (f._status === ia || f._status === ba) {
            var me = f;
            me._status = qn, me._result = Re;
          }
        }, function(Re) {
          if (f._status === ia || f._status === ba) {
            var me = f;
            me._status = Ha, me._result = Re;
          }
        }), f._status === ba) {
          var F = f;
          F._status = ia, F._result = M;
        }
      }
      if (f._status === qn) {
        var J = f._result;
        return J === void 0 && ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, J), "default" in J || ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, J), J.default;
      } else
        throw f._result;
    }
    function N(f) {
      var b = {
        // We use these fields to store the result.
        _status: ba,
        _result: f
      }, M = {
        $$typeof: K,
        _payload: b,
        _init: di
      };
      {
        var F, J;
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
              return J;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), J = Re, Object.defineProperty(M, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return M;
    }
    function G(f) {
      f != null && f.$$typeof === k ? ye("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof f != "function" ? ye("forwardRef requires a render function but was given %s.", f === null ? "null" : typeof f) : f.length !== 0 && f.length !== 2 && ye("forwardRef render functions accept exactly two parameters: props and ref. %s", f.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), f != null && (f.defaultProps != null || f.propTypes != null) && ye("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: V,
        render: f
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
            M = F, !f.name && !f.displayName && (f.displayName = F);
          }
        });
      }
      return b;
    }
    var re;
    re = Symbol.for("react.module.reference");
    function Ne(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === S || f === O || Te || f === c || f === x || f === j || ee || f === pe || Q || U || fe || typeof f == "object" && f !== null && (f.$$typeof === K || f.$$typeof === k || f.$$typeof === C || f.$$typeof === T || f.$$typeof === V || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      f.$$typeof === re || f.getModuleId !== void 0));
    }
    function Be(f, b) {
      Ne(f) || ye("memo: The first argument must be a component. Instead received: %s", f === null ? "null" : typeof f);
      var M = {
        $$typeof: k,
        type: f,
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
          set: function(J) {
            F = J, !f.name && !f.displayName && (f.displayName = J);
          }
        });
      }
      return M;
    }
    function we() {
      var f = $.current;
      return f === null && ye(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), f;
    }
    function ke(f) {
      var b = we();
      if (f._context !== void 0) {
        var M = f._context;
        M.Consumer === f ? ye("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : M.Provider === f && ye("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(f);
    }
    function Ee(f) {
      var b = we();
      return b.useState(f);
    }
    function Lt(f, b, M) {
      var F = we();
      return F.useReducer(f, b, M);
    }
    function ft(f) {
      var b = we();
      return b.useRef(f);
    }
    function dt(f, b) {
      var M = we();
      return M.useEffect(f, b);
    }
    function hn(f, b) {
      var M = we();
      return M.useInsertionEffect(f, b);
    }
    function Pa(f, b) {
      var M = we();
      return M.useLayoutEffect(f, b);
    }
    function Na(f, b) {
      var M = we();
      return M.useCallback(f, b);
    }
    function Vt(f, b) {
      var M = we();
      return M.useMemo(f, b);
    }
    function pi(f, b, M) {
      var F = we();
      return F.useImperativeHandle(f, b, M);
    }
    function xa(f, b) {
      {
        var M = we();
        return M.useDebugValue(f, b);
      }
    }
    function ze() {
      var f = we();
      return f.useTransition();
    }
    function mi(f) {
      var b = we();
      return b.useDeferredValue(f);
    }
    function rs() {
      var f = we();
      return f.useId();
    }
    function is(f, b, M) {
      var F = we();
      return F.useSyncExternalStore(f, b, M);
    }
    var Mr = 0, io, lo, oo, uo, so, ls, os;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function co() {
      {
        if (Mr === 0) {
          io = console.log, lo = console.info, oo = console.warn, uo = console.error, so = console.group, ls = console.groupCollapsed, os = console.groupEnd;
          var f = {
            configurable: !0,
            enumerable: !0,
            value: el,
            writable: !0
          };
          Object.defineProperties(console, {
            info: f,
            log: f,
            warn: f,
            error: f,
            group: f,
            groupCollapsed: f,
            groupEnd: f
          });
        }
        Mr++;
      }
    }
    function Ba() {
      {
        if (Mr--, Mr === 0) {
          var f = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ct({}, f, {
              value: io
            }),
            info: Ct({}, f, {
              value: lo
            }),
            warn: Ct({}, f, {
              value: oo
            }),
            error: Ct({}, f, {
              value: uo
            }),
            group: Ct({}, f, {
              value: so
            }),
            groupCollapsed: Ct({}, f, {
              value: ls
            }),
            groupEnd: Ct({}, f, {
              value: os
            })
          });
        }
        Mr < 0 && ye("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vi = je.ReactCurrentDispatcher, Ar;
    function tl(f, b, M) {
      {
        if (Ar === void 0)
          try {
            throw Error();
          } catch (J) {
            var F = J.stack.trim().match(/\n( *(at )?)/);
            Ar = F && F[1] || "";
          }
        return `
` + Ar + f;
      }
    }
    var hi = !1, nl;
    {
      var fo = typeof WeakMap == "function" ? WeakMap : Map;
      nl = new fo();
    }
    function us(f, b) {
      if (!f || hi)
        return "";
      {
        var M = nl.get(f);
        if (M !== void 0)
          return M;
      }
      var F;
      hi = !0;
      var J = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = vi.current, vi.current = null, co();
      try {
        if (b) {
          var me = function() {
            throw Error();
          };
          if (Object.defineProperty(me.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(me, []);
            } catch (Tt) {
              F = Tt;
            }
            Reflect.construct(f, [], me);
          } else {
            try {
              me.call();
            } catch (Tt) {
              F = Tt;
            }
            f.call(me.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Tt) {
            F = Tt;
          }
          f();
        }
      } catch (Tt) {
        if (Tt && F && typeof Tt.stack == "string") {
          for (var Ve = Tt.stack.split(`
`), $e = F.stack.split(`
`), tt = Ve.length - 1, ot = $e.length - 1; tt >= 1 && ot >= 0 && Ve[tt] !== $e[ot]; )
            ot--;
          for (; tt >= 1 && ot >= 0; tt--, ot--)
            if (Ve[tt] !== $e[ot]) {
              if (tt !== 1 || ot !== 1)
                do
                  if (tt--, ot--, ot < 0 || Ve[tt] !== $e[ot]) {
                    var ut = `
` + Ve[tt].replace(" at new ", " at ");
                    return f.displayName && ut.includes("<anonymous>") && (ut = ut.replace("<anonymous>", f.displayName)), typeof f == "function" && nl.set(f, ut), ut;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        hi = !1, vi.current = Re, Ba(), Error.prepareStackTrace = J;
      }
      var He = f ? f.displayName || f.name : "", vt = He ? tl(He) : "";
      return typeof f == "function" && nl.set(f, vt), vt;
    }
    function po(f, b, M) {
      return us(f, !1);
    }
    function Ef(f) {
      var b = f.prototype;
      return !!(b && b.isReactComponent);
    }
    function gi(f, b, M) {
      if (f == null)
        return "";
      if (typeof f == "function")
        return us(f, Ef(f));
      if (typeof f == "string")
        return tl(f);
      switch (f) {
        case x:
          return tl("Suspense");
        case j:
          return tl("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case V:
            return po(f.render);
          case k:
            return gi(f.type, b, M);
          case K: {
            var F = f, J = F._payload, Re = F._init;
            try {
              return gi(Re(J), b, M);
            } catch {
            }
          }
        }
      return "";
    }
    var ss = {}, mo = je.ReactDebugCurrentFrame;
    function Ke(f) {
      if (f) {
        var b = f._owner, M = gi(f.type, f._source, b ? b.type : null);
        mo.setExtraStackFrame(M);
      } else
        mo.setExtraStackFrame(null);
    }
    function Sf(f, b, M, F, J) {
      {
        var Re = Function.call.bind(mn);
        for (var me in f)
          if (Re(f, me)) {
            var Ve = void 0;
            try {
              if (typeof f[me] != "function") {
                var $e = Error((F || "React class") + ": " + M + " type `" + me + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[me] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Ve = f[me](b, me, F, M, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Ve = tt;
            }
            Ve && !(Ve instanceof Error) && (Ke(J), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", M, me, typeof Ve), Ke(null)), Ve instanceof Error && !(Ve.message in ss) && (ss[Ve.message] = !0, Ke(J), ye("Failed %s type: %s", M, Ve.message), Ke(null));
          }
      }
    }
    function lr(f) {
      if (f) {
        var b = f._owner, M = gi(f.type, f._source, b ? b.type : null);
        Z(M);
      } else
        Z(null);
    }
    var Ae;
    Ae = !1;
    function vo() {
      if (ge.current) {
        var f = Un(ge.current.type);
        if (f)
          return `

Check the render method of \`` + f + "`.";
      }
      return "";
    }
    function Tn(f) {
      if (f !== void 0) {
        var b = f.fileName.replace(/^.*[\\\/]/, ""), M = f.lineNumber;
        return `

Check your code at ` + b + ":" + M + ".";
      }
      return "";
    }
    function yi(f) {
      return f != null ? Tn(f.__source) : "";
    }
    var kr = {};
    function Rf(f) {
      var b = vo();
      if (!b) {
        var M = typeof f == "string" ? f : f.displayName || f.name;
        M && (b = `

Check the top-level render call using <` + M + ">.");
      }
      return b;
    }
    function It(f, b) {
      if (!(!f._store || f._store.validated || f.key != null)) {
        f._store.validated = !0;
        var M = Rf(b);
        if (!kr[M]) {
          kr[M] = !0;
          var F = "";
          f && f._owner && f._owner !== ge.current && (F = " It was passed a child from " + Un(f._owner.type) + "."), lr(f), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', M, F), lr(null);
        }
      }
    }
    function mt(f, b) {
      if (typeof f == "object") {
        if (Bt(f))
          for (var M = 0; M < f.length; M++) {
            var F = f[M];
            gt(F) && It(F, b);
          }
        else if (gt(f))
          f._store && (f._store.validated = !0);
        else if (f) {
          var J = Y(f);
          if (typeof J == "function" && J !== f.entries)
            for (var Re = J.call(f), me; !(me = Re.next()).done; )
              gt(me.value) && It(me.value, b);
        }
      }
    }
    function cs(f) {
      {
        var b = f.type;
        if (b == null || typeof b == "string")
          return;
        var M;
        if (typeof b == "function")
          M = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === V || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === k))
          M = b.propTypes;
        else
          return;
        if (M) {
          var F = Un(b);
          Sf(M, f.props, "prop", F, f);
        } else if (b.PropTypes !== void 0 && !Ae) {
          Ae = !0;
          var J = Un(b);
          ye("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", J || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ye("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(f) {
      {
        for (var b = Object.keys(f.props), M = 0; M < b.length; M++) {
          var F = b[M];
          if (F !== "children" && F !== "key") {
            lr(f), ye("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), lr(null);
            break;
          }
        }
        f.ref !== null && (lr(f), ye("Invalid attribute `ref` supplied to `React.Fragment`."), lr(null));
      }
    }
    function jn(f, b, M) {
      var F = Ne(f);
      if (!F) {
        var J = "";
        (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (J += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = yi(b);
        Re ? J += Re : J += vo();
        var me;
        f === null ? me = "null" : Bt(f) ? me = "array" : f !== void 0 && f.$$typeof === g ? (me = "<" + (Un(f.type) || "Unknown") + " />", J = " Did you accidentally export a JSX literal instead of a component?") : me = typeof f, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", me, J);
      }
      var Ve = Fe.apply(this, arguments);
      if (Ve == null)
        return Ve;
      if (F)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], f);
      return f === S ? la(Ve) : cs(Ve), Ve;
    }
    var Ea = !1;
    function Cf(f) {
      var b = jn.bind(null, f);
      return b.type = f, Ea || (Ea = !0, Le("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return Le("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: f
          }), f;
        }
      }), b;
    }
    function ho(f, b, M) {
      for (var F = ct.apply(this, arguments), J = 2; J < arguments.length; J++)
        mt(arguments[J], F.type);
      return cs(F), F;
    }
    function fs(f, b) {
      var M = q.transition;
      q.transition = {};
      var F = q.transition;
      q.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        f();
      } finally {
        if (q.transition = M, M === null && F._updatedFibers) {
          var J = F._updatedFibers.size;
          J > 10 && Le("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
        }
      }
    }
    var go = !1, al = null;
    function Df(f) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), M = o && o[b];
          al = M.call(o, "timers").setImmediate;
        } catch {
          al = function(J) {
            go === !1 && (go = !0, typeof MessageChannel > "u" && ye("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = J, Re.port2.postMessage(void 0);
          };
        }
      return al(f);
    }
    var Ur = 0, bi = !1;
    function yo(f) {
      {
        var b = Ur;
        Ur++, P.current === null && (P.current = []);
        var M = P.isBatchingLegacy, F;
        try {
          if (P.isBatchingLegacy = !0, F = f(), !M && P.didScheduleLegacyUpdate) {
            var J = P.current;
            J !== null && (P.didScheduleLegacyUpdate = !1, ll(J));
          }
        } catch (He) {
          throw or(b), He;
        } finally {
          P.isBatchingLegacy = M;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Re = F, me = !1, Ve = {
            then: function(He, vt) {
              me = !0, Re.then(function(Tt) {
                or(b), Ur === 0 ? rl(Tt, He, vt) : He(Tt);
              }, function(Tt) {
                or(b), vt(Tt);
              });
            }
          };
          return !bi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            me || (bi = !0, ye("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ve;
        } else {
          var $e = F;
          if (or(b), Ur === 0) {
            var tt = P.current;
            tt !== null && (ll(tt), P.current = null);
            var ot = {
              then: function(He, vt) {
                P.current === null ? (P.current = [], rl($e, He, vt)) : He($e);
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
    function or(f) {
      f !== Ur - 1 && ye("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = f;
    }
    function rl(f, b, M) {
      {
        var F = P.current;
        if (F !== null)
          try {
            ll(F), Df(function() {
              F.length === 0 ? (P.current = null, b(f)) : rl(f, b, M);
            });
          } catch (J) {
            M(J);
          }
        else
          b(f);
      }
    }
    var il = !1;
    function ll(f) {
      if (!il) {
        il = !0;
        var b = 0;
        try {
          for (; b < f.length; b++) {
            var M = f[b];
            do
              M = M(!0);
            while (M !== null);
          }
          f.length = 0;
        } catch (F) {
          throw f = f.slice(b + 1), F;
        } finally {
          il = !1;
        }
      }
    }
    var ds = jn, ps = ho, bo = Cf, ms = {
      map: ir,
      forEach: ci,
      count: ro,
      toArray: Ji,
      only: Zi
    };
    p.Children = ms, p.Component = Xt, p.Fragment = S, p.Profiler = O, p.PureComponent = Zt, p.StrictMode = c, p.Suspense = x, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = je, p.act = yo, p.cloneElement = ps, p.createContext = fi, p.createElement = ds, p.createFactory = bo, p.createRef = tn, p.forwardRef = G, p.isValidElement = gt, p.lazy = N, p.memo = Be, p.startTransition = fs, p.unstable_act = yo, p.useCallback = Na, p.useContext = ke, p.useDebugValue = xa, p.useDeferredValue = mi, p.useEffect = dt, p.useId = rs, p.useImperativeHandle = pi, p.useInsertionEffect = hn, p.useLayoutEffect = Pa, p.useMemo = Vt, p.useReducer = Lt, p.useRef = ft, p.useState = Ee, p.useSyncExternalStore = is, p.useTransition = ze, p.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(yf, yf.exports);
var nw = yf.exports;
gx.exports = nw;
var D = gx.exports;
const aw = /* @__PURE__ */ tw(D), rw = /* @__PURE__ */ ew({
  __proto__: null,
  default: aw
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
  var o = D, p = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), c = Symbol.for("react.provider"), O = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), K = Symbol.iterator, pe = "@@iterator";
  function ne(N) {
    if (N === null || typeof N != "object")
      return null;
    var G = K && N[K] || N[pe];
    return typeof G == "function" ? G : null;
  }
  var ve = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function Y(N) {
    {
      for (var G = arguments.length, re = new Array(G > 1 ? G - 1 : 0), Ne = 1; Ne < G; Ne++)
        re[Ne - 1] = arguments[Ne];
      $("error", N, re);
    }
  }
  function $(N, G, re) {
    {
      var Ne = ve.ReactDebugCurrentFrame, Be = Ne.getStackAddendum();
      Be !== "" && (G += "%s", re = re.concat([Be]));
      var we = re.map(function(ke) {
        return String(ke);
      });
      we.unshift("Warning: " + G), Function.prototype.apply.call(console[N], console, we);
    }
  }
  var q = !1, P = !1, ge = !1, ue = !1, X = !1, Z;
  Z = Symbol.for("react.module.reference");
  function Q(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === S || X || N === y || N === T || N === V || ue || N === k || q || P || ge || typeof N == "object" && N !== null && (N.$$typeof === j || N.$$typeof === x || N.$$typeof === c || N.$$typeof === O || N.$$typeof === C || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === Z || N.getModuleId !== void 0));
  }
  function U(N, G, re) {
    var Ne = N.displayName;
    if (Ne)
      return Ne;
    var Be = G.displayName || G.name || "";
    return Be !== "" ? re + "(" + Be + ")" : re;
  }
  function fe(N) {
    return N.displayName || "Context";
  }
  function ee(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && Y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
      return N.displayName || N.name || null;
    if (typeof N == "string")
      return N;
    switch (N) {
      case g:
        return "Fragment";
      case m:
        return "Portal";
      case S:
        return "Profiler";
      case y:
        return "StrictMode";
      case T:
        return "Suspense";
      case V:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case O:
          var G = N;
          return fe(G) + ".Consumer";
        case c:
          var re = N;
          return fe(re._context) + ".Provider";
        case C:
          return U(N, N.render, "ForwardRef");
        case x:
          var Ne = N.displayName || null;
          return Ne !== null ? Ne : ee(N.type) || "Memo";
        case j: {
          var Be = N, we = Be._payload, ke = Be._init;
          try {
            return ee(ke(we));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Te = Object.assign, je = 0, Le, ye, Je, pn, Qt, Sn, Ct;
  function In() {
  }
  In.__reactDisabledLog = !0;
  function Xt() {
    {
      if (je === 0) {
        Le = console.log, ye = console.info, Je = console.warn, pn = console.error, Qt = console.group, Sn = console.groupCollapsed, Ct = console.groupEnd;
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
            value: pn
          }),
          group: Te({}, N, {
            value: Qt
          }),
          groupCollapsed: Te({}, N, {
            value: Sn
          }),
          groupEnd: Te({}, N, {
            value: Ct
          })
        });
      }
      je < 0 && Y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = ve.ReactCurrentDispatcher, Dt;
  function Jt(N, G, re) {
    {
      if (Dt === void 0)
        try {
          throw Error();
        } catch (Be) {
          var Ne = Be.stack.trim().match(/\n( *(at )?)/);
          Dt = Ne && Ne[1] || "";
        }
      return `
` + Dt + N;
    }
  }
  var Zt = !1, en;
  {
    var tn = typeof WeakMap == "function" ? WeakMap : Map;
    en = new tn();
  }
  function kn(N, G) {
    if (!N || Zt)
      return "";
    {
      var re = en.get(N);
      if (re !== void 0)
        return re;
    }
    var Ne;
    Zt = !0;
    var Be = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var we;
    we = na.current, na.current = null, Xt();
    try {
      if (G) {
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
          } catch (Vt) {
            Ne = Vt;
          }
          Reflect.construct(N, [], ke);
        } else {
          try {
            ke.call();
          } catch (Vt) {
            Ne = Vt;
          }
          N.call(ke.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Vt) {
          Ne = Vt;
        }
        N();
      }
    } catch (Vt) {
      if (Vt && Ne && typeof Vt.stack == "string") {
        for (var Ee = Vt.stack.split(`
`), Lt = Ne.stack.split(`
`), ft = Ee.length - 1, dt = Lt.length - 1; ft >= 1 && dt >= 0 && Ee[ft] !== Lt[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (Ee[ft] !== Lt[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || Ee[ft] !== Lt[dt]) {
                  var hn = `
` + Ee[ft].replace(" at new ", " at ");
                  return N.displayName && hn.includes("<anonymous>") && (hn = hn.replace("<anonymous>", N.displayName)), typeof N == "function" && en.set(N, hn), hn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Zt = !1, na.current = we, va(), Error.prepareStackTrace = Be;
    }
    var Pa = N ? N.displayName || N.name : "", Na = Pa ? Jt(Pa) : "";
    return typeof N == "function" && en.set(N, Na), Na;
  }
  function Bt(N, G, re) {
    return kn(N, !1);
  }
  function Rn(N) {
    var G = N.prototype;
    return !!(G && G.isReactComponent);
  }
  function $t(N, G, re) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return Jt(N);
    switch (N) {
      case T:
        return Jt("Suspense");
      case V:
        return Jt("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case C:
          return Bt(N.render);
        case x:
          return $t(N.type, G, re);
        case j: {
          var Ne = N, Be = Ne._payload, we = Ne._init;
          try {
            return $t(we(Be), G, re);
          } catch {
          }
        }
      }
    return "";
  }
  var Yt = Object.prototype.hasOwnProperty, aa = {}, ar = ve.ReactDebugCurrentFrame;
  function ha(N) {
    if (N) {
      var G = N._owner, re = $t(N.type, N._source, G ? G.type : null);
      ar.setExtraStackFrame(re);
    } else
      ar.setExtraStackFrame(null);
  }
  function Un(N, G, re, Ne, Be) {
    {
      var we = Function.call.bind(Yt);
      for (var ke in N)
        if (we(N, ke)) {
          var Ee = void 0;
          try {
            if (typeof N[ke] != "function") {
              var Lt = Error((Ne || "React class") + ": " + re + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Lt.name = "Invariant Violation", Lt;
            }
            Ee = N[ke](G, ke, Ne, re, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Ee = ft;
          }
          Ee && !(Ee instanceof Error) && (ha(Be), Y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", re, ke, typeof Ee), ha(null)), Ee instanceof Error && !(Ee.message in aa) && (aa[Ee.message] = !0, ha(Be), Y("Failed %s type: %s", re, Ee.message), ha(null));
        }
    }
  }
  var mn = Array.isArray;
  function nn(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var G = typeof Symbol == "function" && Symbol.toStringTag, re = G && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return re;
    }
  }
  function za(N) {
    try {
      return Ot(N), !1;
    } catch {
      return !0;
    }
  }
  function Ot(N) {
    return "" + N;
  }
  function Dn(N) {
    if (za(N))
      return Y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Ot(N);
  }
  var Fn = ve.ReactCurrentOwner, Vr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, rr, ae, be;
  be = {};
  function Fe(N) {
    if (Yt.call(N, "ref")) {
      var G = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (G && G.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if (Yt.call(N, "key")) {
      var G = Object.getOwnPropertyDescriptor(N, "key").get;
      if (G && G.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, G) {
    if (typeof N.ref == "string" && Fn.current && G && Fn.current.stateNode !== G) {
      var re = ee(Fn.current.type);
      be[re] || (Y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ee(Fn.current.type), N.ref), be[re] = !0);
    }
  }
  function gt(N, G) {
    {
      var re = function() {
        rr || (rr = !0, Y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
      };
      re.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: re,
        configurable: !0
      });
    }
  }
  function yt(N, G) {
    {
      var re = function() {
        ae || (ae = !0, Y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
      };
      re.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: re,
        configurable: !0
      });
    }
  }
  var vn = function(N, G, re, Ne, Be, we, ke) {
    var Ee = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: N,
      key: G,
      ref: re,
      props: ke,
      // Record the component responsible for creating this element.
      _owner: we
    };
    return Ee._store = {}, Object.defineProperty(Ee._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(Ee, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ne
    }), Object.defineProperty(Ee, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Be
    }), Object.freeze && (Object.freeze(Ee.props), Object.freeze(Ee)), Ee;
  };
  function Nt(N, G, re, Ne, Be) {
    {
      var we, ke = {}, Ee = null, Lt = null;
      re !== void 0 && (Dn(re), Ee = "" + re), et(G) && (Dn(G.key), Ee = "" + G.key), Fe(G) && (Lt = G.ref, ct(G, Be));
      for (we in G)
        Yt.call(G, we) && !Vr.hasOwnProperty(we) && (ke[we] = G[we]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (we in ft)
          ke[we] === void 0 && (ke[we] = ft[we]);
      }
      if (Ee || Lt) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Ee && gt(ke, dt), Lt && yt(ke, dt);
      }
      return vn(N, Ee, Lt, Be, Ne, Fn.current, ke);
    }
  }
  var it = ve.ReactCurrentOwner, xt = ve.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var G = N._owner, re = $t(N.type, N._source, G ? G.type : null);
      xt.setExtraStackFrame(re);
    } else
      xt.setExtraStackFrame(null);
  }
  var ya;
  ya = !1;
  function ra(N) {
    return typeof N == "object" && N !== null && N.$$typeof === p;
  }
  function ir() {
    {
      if (it.current) {
        var N = ee(it.current.type);
        if (N)
          return `

Check the render method of \`` + N + "`.";
      }
      return "";
    }
  }
  function ro(N) {
    {
      if (N !== void 0) {
        var G = N.fileName.replace(/^.*[\\\/]/, ""), re = N.lineNumber;
        return `

Check your code at ` + G + ":" + re + ".";
      }
      return "";
    }
  }
  var ci = {};
  function Ji(N) {
    {
      var G = ir();
      if (!G) {
        var re = typeof N == "string" ? N : N.displayName || N.name;
        re && (G = `

Check the top-level render call using <` + re + ">.");
      }
      return G;
    }
  }
  function Zi(N, G) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var re = Ji(G);
      if (ci[re])
        return;
      ci[re] = !0;
      var Ne = "";
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + ee(N._owner.type) + "."), ga(N), Y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', re, Ne), ga(null);
    }
  }
  function fi(N, G) {
    {
      if (typeof N != "object")
        return;
      if (nn(N))
        for (var re = 0; re < N.length; re++) {
          var Ne = N[re];
          ra(Ne) && Zi(Ne, G);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Be = ne(N);
        if (typeof Be == "function" && Be !== N.entries)
          for (var we = Be.call(N), ke; !(ke = we.next()).done; )
            ra(ke.value) && Zi(ke.value, G);
      }
    }
  }
  function ba(N) {
    {
      var G = N.type;
      if (G == null || typeof G == "string")
        return;
      var re;
      if (typeof G == "function")
        re = G.propTypes;
      else if (typeof G == "object" && (G.$$typeof === C || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      G.$$typeof === x))
        re = G.propTypes;
      else
        return;
      if (re) {
        var Ne = ee(G);
        Un(re, N.props, "prop", Ne, N);
      } else if (G.PropTypes !== void 0 && !ya) {
        ya = !0;
        var Be = ee(G);
        Y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Be || "Unknown");
      }
      typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && Y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var G = Object.keys(N.props), re = 0; re < G.length; re++) {
        var Ne = G[re];
        if (Ne !== "children" && Ne !== "key") {
          ga(N), Y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ne), ga(null);
          break;
        }
      }
      N.ref !== null && (ga(N), Y("Invalid attribute `ref` supplied to `React.Fragment`."), ga(null));
    }
  }
  var qn = {};
  function Ha(N, G, re, Ne, Be, we) {
    {
      var ke = Q(N);
      if (!ke) {
        var Ee = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Ee += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Lt = ro(Be);
        Lt ? Ee += Lt : Ee += ir();
        var ft;
        N === null ? ft = "null" : nn(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (ee(N.type) || "Unknown") + " />", Ee = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, Y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Ee);
      }
      var dt = Nt(N, G, re, Be, we);
      if (dt == null)
        return dt;
      if (ke) {
        var hn = G.children;
        if (hn !== void 0)
          if (Ne)
            if (nn(hn)) {
              for (var Pa = 0; Pa < hn.length; Pa++)
                fi(hn[Pa], N);
              Object.freeze && Object.freeze(hn);
            } else
              Y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            fi(hn, N);
      }
      if (Yt.call(G, "key")) {
        var Na = ee(N), Vt = Object.keys(G).filter(function(ze) {
          return ze !== "key";
        }), pi = Vt.length > 0 ? "{key: someKey, " + Vt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Na + pi]) {
          var xa = Vt.length > 0 ? "{" + Vt.join(": ..., ") + ": ...}" : "{}";
          Y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pi, Na, xa, Na), qn[Na + pi] = !0;
        }
      }
      return N === g ? ia(dt) : ba(dt), dt;
    }
  }
  var di = Ha;
  Vv.Fragment = g, Vv.jsxDEV = di;
})();
hx.exports = Vv;
var d = hx.exports, yx = { exports: {} }, ta = {}, bx = { exports: {} }, Nx = {};
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
    var p = !1, m = 5;
    function g(ae, be) {
      var Fe = ae.length;
      ae.push(be), c(ae, be, Fe);
    }
    function y(ae) {
      return ae.length === 0 ? null : ae[0];
    }
    function S(ae) {
      if (ae.length === 0)
        return null;
      var be = ae[0], Fe = ae.pop();
      return Fe !== be && (ae[0] = Fe, O(ae, Fe, 0)), be;
    }
    function c(ae, be, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, gt = ae[ct];
        if (C(gt, be) > 0)
          ae[ct] = be, ae[et] = gt, et = ct;
        else
          return;
      }
    }
    function O(ae, be, Fe) {
      for (var et = Fe, ct = ae.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, vn = ae[yt], Nt = yt + 1, it = ae[Nt];
        if (C(vn, be) < 0)
          Nt < ct && C(it, vn) < 0 ? (ae[et] = it, ae[Nt] = be, et = Nt) : (ae[et] = vn, ae[yt] = be, et = yt);
        else if (Nt < ct && C(it, be) < 0)
          ae[et] = it, ae[Nt] = be, et = Nt;
        else
          return;
      }
    }
    function C(ae, be) {
      var Fe = ae.sortIndex - be.sortIndex;
      return Fe !== 0 ? Fe : ae.id - be.id;
    }
    var T = 1, V = 2, x = 3, j = 4, k = 5;
    function K(ae, be) {
    }
    var pe = typeof performance == "object" && typeof performance.now == "function";
    if (pe) {
      var ne = performance;
      o.unstable_now = function() {
        return ne.now();
      };
    } else {
      var ve = Date, Y = ve.now();
      o.unstable_now = function() {
        return ve.now() - Y;
      };
    }
    var $ = 1073741823, q = -1, P = 250, ge = 5e3, ue = 1e4, X = $, Z = [], Q = [], U = 1, fe = null, ee = x, Te = !1, je = !1, Le = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, pn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Qt(ae) {
      for (var be = y(Q); be !== null; ) {
        if (be.callback === null)
          S(Q);
        else if (be.startTime <= ae)
          S(Q), be.sortIndex = be.expirationTime, g(Z, be);
        else
          return;
        be = y(Q);
      }
    }
    function Sn(ae) {
      if (Le = !1, Qt(ae), !je)
        if (y(Z) !== null)
          je = !0, Ot(Ct);
        else {
          var be = y(Q);
          be !== null && Dn(Sn, be.startTime - ae);
        }
    }
    function Ct(ae, be) {
      je = !1, Le && (Le = !1, Fn()), Te = !0;
      var Fe = ee;
      try {
        var et;
        if (!p) return In(ae, be);
      } finally {
        fe = null, ee = Fe, Te = !1;
      }
    }
    function In(ae, be) {
      var Fe = be;
      for (Qt(Fe), fe = y(Z); fe !== null && !(fe.expirationTime > Fe && (!ae || ar())); ) {
        var et = fe.callback;
        if (typeof et == "function") {
          fe.callback = null, ee = fe.priorityLevel;
          var ct = fe.expirationTime <= Fe, gt = et(ct);
          Fe = o.unstable_now(), typeof gt == "function" ? fe.callback = gt : fe === y(Z) && S(Z), Qt(Fe);
        } else
          S(Z);
        fe = y(Z);
      }
      if (fe !== null)
        return !0;
      var yt = y(Q);
      return yt !== null && Dn(Sn, yt.startTime - Fe), !1;
    }
    function Xt(ae, be) {
      switch (ae) {
        case T:
        case V:
        case x:
        case j:
        case k:
          break;
        default:
          ae = x;
      }
      var Fe = ee;
      ee = ae;
      try {
        return be();
      } finally {
        ee = Fe;
      }
    }
    function va(ae) {
      var be;
      switch (ee) {
        case T:
        case V:
        case x:
          be = x;
          break;
        default:
          be = ee;
          break;
      }
      var Fe = ee;
      ee = be;
      try {
        return ae();
      } finally {
        ee = Fe;
      }
    }
    function na(ae) {
      var be = ee;
      return function() {
        var Fe = ee;
        ee = be;
        try {
          return ae.apply(this, arguments);
        } finally {
          ee = Fe;
        }
      };
    }
    function Dt(ae, be, Fe) {
      var et = o.unstable_now(), ct;
      if (typeof Fe == "object" && Fe !== null) {
        var gt = Fe.delay;
        typeof gt == "number" && gt > 0 ? ct = et + gt : ct = et;
      } else
        ct = et;
      var yt;
      switch (ae) {
        case T:
          yt = q;
          break;
        case V:
          yt = P;
          break;
        case k:
          yt = X;
          break;
        case j:
          yt = ue;
          break;
        case x:
        default:
          yt = ge;
          break;
      }
      var vn = ct + yt, Nt = {
        id: U++,
        callback: be,
        priorityLevel: ae,
        startTime: ct,
        expirationTime: vn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, g(Q, Nt), y(Z) === null && Nt === y(Q) && (Le ? Fn() : Le = !0, Dn(Sn, ct - et))) : (Nt.sortIndex = vn, g(Z, Nt), !je && !Te && (je = !0, Ot(Ct))), Nt;
    }
    function Jt() {
    }
    function Zt() {
      !je && !Te && (je = !0, Ot(Ct));
    }
    function en() {
      return y(Z);
    }
    function tn(ae) {
      ae.callback = null;
    }
    function kn() {
      return ee;
    }
    var Bt = !1, Rn = null, $t = -1, Yt = m, aa = -1;
    function ar() {
      var ae = o.unstable_now() - aa;
      return !(ae < Yt);
    }
    function ha() {
    }
    function Un(ae) {
      if (ae < 0 || ae > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ae > 0 ? Yt = Math.floor(1e3 / ae) : Yt = m;
    }
    var mn = function() {
      if (Rn !== null) {
        var ae = o.unstable_now();
        aa = ae;
        var be = !0, Fe = !0;
        try {
          Fe = Rn(be, ae);
        } finally {
          Fe ? nn() : (Bt = !1, Rn = null);
        }
      } else
        Bt = !1;
    }, nn;
    if (typeof pn == "function")
      nn = function() {
        pn(mn);
      };
    else if (typeof MessageChannel < "u") {
      var Cn = new MessageChannel(), za = Cn.port2;
      Cn.port1.onmessage = mn, nn = function() {
        za.postMessage(null);
      };
    } else
      nn = function() {
        ye(mn, 0);
      };
    function Ot(ae) {
      Rn = ae, Bt || (Bt = !0, nn());
    }
    function Dn(ae, be) {
      $t = ye(function() {
        ae(o.unstable_now());
      }, be);
    }
    function Fn() {
      Je($t), $t = -1;
    }
    var Vr = ha, rr = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = j, o.unstable_NormalPriority = x, o.unstable_Profiling = rr, o.unstable_UserBlockingPriority = V, o.unstable_cancelCallback = tn, o.unstable_continueExecution = Zt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = en, o.unstable_next = va, o.unstable_pauseExecution = Jt, o.unstable_requestPaint = Vr, o.unstable_runWithPriority = Xt, o.unstable_scheduleCallback = Dt, o.unstable_shouldYield = ar, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Nx);
bx.exports = Nx;
var iw = bx.exports;
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
  var o = D, p = iw, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function S(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      O("warn", e, n);
    }
  }
  function c(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      O("error", e, n);
    }
  }
  function O(e, t, n) {
    {
      var a = m.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var C = 0, T = 1, V = 2, x = 3, j = 4, k = 5, K = 6, pe = 7, ne = 8, ve = 9, Y = 10, $ = 11, q = 12, P = 13, ge = 14, ue = 15, X = 16, Z = 17, Q = 18, U = 19, fe = 21, ee = 22, Te = 23, je = 24, Le = 25, ye = !0, Je = !1, pn = !1, Qt = !1, Sn = !1, Ct = !0, In = !0, Xt = !0, va = !0, na = /* @__PURE__ */ new Set(), Dt = {}, Jt = {};
  function Zt(e, t) {
    en(e, t), en(e + "Capture", t);
  }
  function en(e, t) {
    Dt[e] && c("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Dt[e] = t;
    {
      var n = e.toLowerCase();
      Jt[n] = e, e === "onDoubleClick" && (Jt.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      na.add(t[a]);
  }
  var tn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", kn = Object.prototype.hasOwnProperty;
  function Bt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Rn(e) {
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
    if (Rn(e))
      return c("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function aa(e) {
    if (Rn(e))
      return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  function ar(e, t) {
    if (Rn(e))
      return c("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function ha(e, t) {
    if (Rn(e))
      return c("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function Un(e) {
    if (Rn(e))
      return c("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  function mn(e) {
    if (Rn(e))
      return c("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  var nn = 0, Cn = 1, za = 2, Ot = 3, Dn = 4, Fn = 5, Vr = 6, rr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ae = rr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + rr + "][" + ae + "]*$"), Fe = {}, et = {};
  function ct(e) {
    return kn.call(et, e) ? !0 : kn.call(Fe, e) ? !1 : be.test(e) ? (et[e] = !0, !0) : (Fe[e] = !0, c("Invalid attribute name: `%s`", e), !1);
  }
  function gt(e, t, n) {
    return t !== null ? t.type === nn : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function yt(e, t, n, a) {
    if (n !== null && n.type === nn)
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
    if (t === null || typeof t > "u" || yt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Ot:
          return !t;
        case Dn:
          return t === !1;
        case Fn:
          return isNaN(t);
        case Vr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Nt(e) {
    return xt.hasOwnProperty(e) ? xt[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === za || t === Ot || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var xt = {}, ga = [
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
  ga.forEach(function(e) {
    xt[e] = new it(
      e,
      nn,
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
    xt[t] = new it(
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
    xt[e] = new it(
      e,
      za,
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
    xt[e] = new it(
      e,
      za,
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
    xt[e] = new it(
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
    xt[e] = new it(
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
    xt[e] = new it(
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
    xt[e] = new it(
      e,
      Vr,
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
    xt[e] = new it(
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
    xt[t] = new it(
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
    xt[t] = new it(
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
    xt[t] = new it(
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
    xt[e] = new it(
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
  var ir = "xlinkHref";
  xt[ir] = new it(
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
    xt[e] = new it(
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
  var ro = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, ci = !1;
  function Ji(e) {
    !ci && ro.test(e) && (ci = !0, c("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function Zi(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      Yt(n, t), a.sanitizeURL && Ji("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Dn) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : vn(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (vn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Ot)
          return n;
        l = e.getAttribute(i);
      }
      return vn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function fi(e, t, n, a) {
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
    if (!gt(t, r, a)) {
      if (vn(t, n, r, a) && (n = null), a || r === null) {
        if (ct(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Yt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var s = r.type;
          e[u] = s === Ot ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var v = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(v);
      else {
        var R = r.type, E;
        R === Ot || R === Dn && n === !0 ? E = "" : (Yt(n, v), E = "" + n, r.sanitizeURL && Ji(E.toString())), h ? e.setAttributeNS(h, v, E) : e.setAttribute(v, E);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Ha = Symbol.for("react.fragment"), di = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), G = Symbol.for("react.provider"), re = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Be = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), Ee = Symbol.for("react.lazy"), Lt = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Pa = Symbol.for("react.cache"), Na = Symbol.for("react.tracing_marker"), Vt = Symbol.iterator, pi = "@@iterator";
  function xa(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Vt && e[Vt] || e[pi];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, mi = 0, rs, is, Mr, io, lo, oo, uo;
  function so() {
  }
  so.__reactDisabledLog = !0;
  function ls() {
    {
      if (mi === 0) {
        rs = console.log, is = console.info, Mr = console.warn, io = console.error, lo = console.group, oo = console.groupCollapsed, uo = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: so,
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
      mi++;
    }
  }
  function os() {
    {
      if (mi--, mi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ze({}, e, {
            value: rs
          }),
          info: ze({}, e, {
            value: is
          }),
          warn: ze({}, e, {
            value: Mr
          }),
          error: ze({}, e, {
            value: io
          }),
          group: ze({}, e, {
            value: lo
          }),
          groupCollapsed: ze({}, e, {
            value: oo
          }),
          groupEnd: ze({}, e, {
            value: uo
          })
        });
      }
      mi < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var el = m.ReactCurrentDispatcher, co;
  function Ba(e, t, n) {
    {
      if (co === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          co = a && a[1] || "";
        }
      return `
` + co + e;
    }
  }
  var vi = !1, Ar;
  {
    var tl = typeof WeakMap == "function" ? WeakMap : Map;
    Ar = new tl();
  }
  function hi(e, t) {
    if (!e || vi)
      return "";
    {
      var n = Ar.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    vi = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = el.current, el.current = null, ls();
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
`), v = u.length - 1, h = s.length - 1; v >= 1 && h >= 0 && u[v] !== s[h]; )
          h--;
        for (; v >= 1 && h >= 0; v--, h--)
          if (u[v] !== s[h]) {
            if (v !== 1 || h !== 1)
              do
                if (v--, h--, h < 0 || u[v] !== s[h]) {
                  var R = `
` + u[v].replace(" at new ", " at ");
                  return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), typeof e == "function" && Ar.set(e, R), R;
                }
              while (v >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      vi = !1, el.current = i, os(), Error.prepareStackTrace = r;
    }
    var E = e ? e.displayName || e.name : "", L = E ? Ba(E) : "";
    return typeof e == "function" && Ar.set(e, L), L;
  }
  function nl(e, t, n) {
    return hi(e, !0);
  }
  function fo(e, t, n) {
    return hi(e, !1);
  }
  function us(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function po(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return hi(e, us(e));
    if (typeof e == "string")
      return Ba(e);
    switch (e) {
      case Be:
        return Ba("Suspense");
      case we:
        return Ba("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ne:
          return fo(e.render);
        case ke:
          return po(e.type, t, n);
        case Ee: {
          var a = e, r = a._payload, i = a._init;
          try {
            return po(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function Ef(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case k:
        return Ba(e.type);
      case X:
        return Ba("Lazy");
      case P:
        return Ba("Suspense");
      case U:
        return Ba("SuspenseList");
      case C:
      case V:
      case ue:
        return fo(e.type);
      case $:
        return fo(e.type.render);
      case T:
        return nl(e.type);
      default:
        return "";
    }
  }
  function gi(e) {
    try {
      var t = "", n = e;
      do
        t += Ef(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function ss(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function mo(e) {
    return e.displayName || "Context";
  }
  function Ke(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Ha:
        return "Fragment";
      case qn:
        return "Portal";
      case N:
        return "Profiler";
      case di:
        return "StrictMode";
      case Be:
        return "Suspense";
      case we:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case re:
          var t = e;
          return mo(t) + ".Consumer";
        case G:
          var n = e;
          return mo(n._context) + ".Provider";
        case Ne:
          return ss(e, e.render, "ForwardRef");
        case ke:
          var a = e.displayName || null;
          return a !== null ? a : Ke(e.type) || "Memo";
        case Ee: {
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
  function Sf(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function lr(e) {
    return e.displayName || "Context";
  }
  function Ae(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case je:
        return "Cache";
      case ve:
        var a = n;
        return lr(a) + ".Consumer";
      case Y:
        var r = n;
        return lr(r._context) + ".Provider";
      case Q:
        return "DehydratedFragment";
      case $:
        return Sf(n, n.render, "ForwardRef");
      case pe:
        return "Fragment";
      case k:
        return n;
      case j:
        return "Portal";
      case x:
        return "Root";
      case K:
        return "Text";
      case X:
        return Ke(n);
      case ne:
        return n === di ? "StrictMode" : "Mode";
      case ee:
        return "Offscreen";
      case q:
        return "Profiler";
      case fe:
        return "Scope";
      case P:
        return "Suspense";
      case U:
        return "SuspenseList";
      case Le:
        return "TracingMarker";
      case T:
      case C:
      case Z:
      case V:
      case ge:
      case ue:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var vo = m.ReactDebugCurrentFrame, Tn = null, yi = !1;
  function kr() {
    {
      if (Tn === null)
        return null;
      var e = Tn._debugOwner;
      if (e !== null && typeof e < "u")
        return Ae(e);
    }
    return null;
  }
  function Rf() {
    return Tn === null ? "" : gi(Tn);
  }
  function It() {
    vo.getCurrentStack = null, Tn = null, yi = !1;
  }
  function mt(e) {
    vo.getCurrentStack = e === null ? null : Rf, Tn = e, yi = !1;
  }
  function cs() {
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
        return mn(e), e;
      default:
        return "";
    }
  }
  var Cf = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function ho(e, t) {
    Cf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || c("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || c("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function fs(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function go(e) {
    return e._valueTracker;
  }
  function al(e) {
    e._valueTracker = null;
  }
  function Df(e) {
    var t = "";
    return e && (fs(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ur(e) {
    var t = fs(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
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
          al(e), delete e[t];
        }
      };
      return l;
    }
  }
  function bi(e) {
    go(e) || (e._valueTracker = Ur(e));
  }
  function yo(e) {
    if (!e)
      return !1;
    var t = go(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = Df(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function or(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var rl = !1, il = !1, ll = !1, ds = !1;
  function ps(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function bo(e, t) {
    var n = e, a = t.checked, r = ze({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function ms(e, t) {
    ho("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !il && (c("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), il = !0), t.value !== void 0 && t.defaultValue !== void 0 && !rl && (c("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), rl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Ea(t.value != null ? t.value : a),
      controlled: ps(t)
    };
  }
  function f(e, t) {
    var n = e, a = t.checked;
    a != null && ba(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = ps(t);
      !n._wrapperState.controlled && a && !ds && (c("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ds = !0), n._wrapperState.controlled && !a && !ll && (c("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ll = !0);
    }
    f(e, t);
    var r = Ea(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = jn(r)) : n.value !== jn(r) && (n.value = jn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Re(n, t.type, r) : t.hasOwnProperty("defaultValue") && Re(n, t.type, Ea(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
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
    b(n, t), J(n, t);
  }
  function J(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Yt(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var u = ec(l);
          if (!u)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          yo(l), b(l, u);
        }
      }
    }
  }
  function Re(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || or(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var me = !1, Ve = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ve || (Ve = !0, c("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, c("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !me && (c("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), me = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", jn(Ea(t.value)));
  }
  var ut = Array.isArray;
  function He(e) {
    return ut(e);
  }
  var vt;
  vt = !1;
  function Tt() {
    var e = kr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var Ni = ["value", "defaultValue"];
  function No(e) {
    {
      ho("select", e);
      for (var t = 0; t < Ni.length; t++) {
        var n = Ni[t];
        if (e[n] != null) {
          var a = He(e[n]);
          e.multiple && !a ? c("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Tt()) : !e.multiple && a && c("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Tt());
        }
      }
    }
  }
  function ur(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var s = 0; s < r.length; s++) {
        var v = l.hasOwnProperty("$" + r[s].value);
        r[s].selected !== v && (r[s].selected = v), v && a && (r[s].defaultSelected = !0);
      }
    } else {
      for (var h = jn(Ea(n)), R = null, E = 0; E < r.length; E++) {
        if (r[E].value === h) {
          r[E].selected = !0, a && (r[E].defaultSelected = !0);
          return;
        }
        R === null && !r[E].disabled && (R = r[E]);
      }
      R !== null && (R.selected = !0);
    }
  }
  function xo(e, t) {
    return ze({}, t, {
      value: void 0
    });
  }
  function Eo(e, t) {
    var n = e;
    No(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !vt && (c("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), vt = !0);
  }
  function Tf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? ur(n, !!t.multiple, a, !1) : t.defaultValue != null && ur(n, !!t.multiple, t.defaultValue, !0);
  }
  function vs(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? ur(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? ur(n, !!t.multiple, t.defaultValue, !0) : ur(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function jf(e, t) {
    var n = e, a = t.value;
    a != null && ur(n, !!t.multiple, a, !1);
  }
  var Gv = !1;
  function wf(e, t) {
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
  function Wv(e, t) {
    var n = e;
    ho("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Gv && (c("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), Gv = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        c("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
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
      initialValue: Ea(a)
    };
  }
  function Kv(e, t) {
    var n = e, a = Ea(t.value), r = Ea(t.defaultValue);
    if (a != null) {
      var i = jn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = jn(r));
  }
  function Qv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function Px(e, t) {
    Kv(e, t);
  }
  var sr = "http://www.w3.org/1999/xhtml", Bx = "http://www.w3.org/1998/Math/MathML", _f = "http://www.w3.org/2000/svg";
  function Of(e) {
    switch (e) {
      case "svg":
        return _f;
      case "math":
        return Bx;
      default:
        return sr;
    }
  }
  function Lf(e, t) {
    return e == null || e === sr ? Of(t) : e === _f && t === "foreignObject" ? sr : e;
  }
  var $x = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, hs, Xv = $x(function(e, t) {
    if (e.namespaceURI === _f && !("innerHTML" in e)) {
      hs = hs || document.createElement("div"), hs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = hs.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, cr = 3, jt = 8, fr = 9, Vf = 11, gs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === cr) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, Yx = {
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
  }, So = {
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
  function Ix(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var qx = ["Webkit", "ms", "Moz", "O"];
  Object.keys(So).forEach(function(e) {
    qx.forEach(function(t) {
      So[Ix(t, e)] = So[e];
    });
  });
  function Mf(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(So.hasOwnProperty(e) && So[e]) ? t + "px" : (ha(t, e), ("" + t).trim());
  }
  var Gx = /([A-Z])/g, Wx = /^ms-/;
  function Kx(e) {
    return e.replace(Gx, "-$1").toLowerCase().replace(Wx, "-ms-");
  }
  var Jv = function() {
  };
  {
    var Qx = /^(?:webkit|moz|o)[A-Z]/, Xx = /^-ms-/, Jx = /-(.)/g, Zv = /;\s*$/, ol = {}, Af = {}, eh = !1, th = !1, Zx = function(e) {
      return e.replace(Jx, function(t, n) {
        return n.toUpperCase();
      });
    }, eE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, c(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        Zx(e.replace(Xx, "ms-"))
      ));
    }, tE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, c("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, nE = function(e, t) {
      Af.hasOwnProperty(t) && Af[t] || (Af[t] = !0, c(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Zv, "")));
    }, aE = function(e, t) {
      eh || (eh = !0, c("`NaN` is an invalid value for the `%s` css style property.", e));
    }, rE = function(e, t) {
      th || (th = !0, c("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Jv = function(e, t) {
      e.indexOf("-") > -1 ? eE(e) : Qx.test(e) ? tE(e) : Zv.test(t) && nE(e, t), typeof t == "number" && (isNaN(t) ? aE(e, t) : isFinite(t) || rE(e, t));
    };
  }
  var iE = Jv;
  function lE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : Kx(a)) + ":", t += Mf(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function nh(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || iE(a, t[a]);
        var i = Mf(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function oE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function ah(e) {
    var t = {};
    for (var n in e)
      for (var a = Yx[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function uE(e, t) {
    {
      if (!t)
        return;
      var n = ah(e), a = ah(t), r = {};
      for (var i in n) {
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var s = l + "," + u;
          if (r[s])
            continue;
          r[s] = !0, c("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", oE(e[l]) ? "Removing" : "Updating", l, u);
        }
      }
    }
  }
  var sE = {
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
  }, cE = ze({
    menuitem: !0
  }, sE), fE = "__html";
  function kf(e, t) {
    if (t) {
      if (cE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(fE in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && c("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function xi(e, t) {
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
  }, rh = {
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
  }, ul = {}, dE = new RegExp("^(aria)-[" + ae + "]*$"), pE = new RegExp("^(aria)[A-Z][" + ae + "]*$");
  function mE(e, t) {
    {
      if (kn.call(ul, t) && ul[t])
        return !0;
      if (pE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = rh.hasOwnProperty(n) ? n : null;
        if (a == null)
          return c("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ul[t] = !0, !0;
        if (t !== a)
          return c("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ul[t] = !0, !0;
      }
      if (dE.test(t)) {
        var r = t.toLowerCase(), i = rh.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ul[t] = !0, !1;
        if (t !== i)
          return c("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ul[t] = !0, !0;
      }
    }
    return !0;
  }
  function vE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = mE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? c("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && c("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function hE(e, t) {
    xi(e, t) || vE(e, t);
  }
  var ih = !1;
  function gE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !ih && (ih = !0, e === "select" && t.multiple ? c("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : c("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var lh = function() {
  };
  {
    var wn = {}, oh = /^on./, yE = /^on[^A-Z]/, bE = new RegExp("^(aria)-[" + ae + "]*$"), NE = new RegExp("^(aria)[A-Z][" + ae + "]*$");
    lh = function(e, t, n, a) {
      if (kn.call(wn, t) && wn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return c("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), wn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var u = l.hasOwnProperty(r) ? l[r] : null;
        if (u != null)
          return c("Invalid event handler property `%s`. Did you mean `%s`?", t, u), wn[t] = !0, !0;
        if (oh.test(t))
          return c("Unknown event handler property `%s`. It will be ignored.", t), wn[t] = !0, !0;
      } else if (oh.test(t))
        return yE.test(t) && c("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (bE.test(t) || NE.test(t))
        return !0;
      if (r === "innerhtml")
        return c("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), wn[t] = !0, !0;
      if (r === "aria")
        return c("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), wn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return c("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), wn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return c("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), wn[t] = !0, !0;
      var s = Nt(t), v = s !== null && s.type === nn;
      if (ys.hasOwnProperty(r)) {
        var h = ys[r];
        if (h !== t)
          return c("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!v && t !== r)
        return c("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, s, !1) ? (n ? c('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : c('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : v ? !0 : yt(t, n, s, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && s !== null && s.type === Ot && (c("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var xE = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = lh(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? c("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && c("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function EE(e, t, n) {
    xi(e, t) || xE(e, t, n);
  }
  var uh = 1, Uf = 2, Ro = 4, SE = uh | Uf | Ro, Co = null;
  function RE(e) {
    Co !== null && c("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Co = e;
  }
  function CE() {
    Co === null && c("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Co = null;
  }
  function DE(e) {
    return e === Co;
  }
  function Ff(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === cr ? t.parentNode : t;
  }
  var zf = null, sl = null, cl = null;
  function sh(e) {
    var t = qr(e);
    if (t) {
      if (typeof zf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = ec(n);
        zf(t.stateNode, t.type, a);
      }
    }
  }
  function TE(e) {
    zf = e;
  }
  function ch(e) {
    sl ? cl ? cl.push(e) : cl = [e] : sl = e;
  }
  function jE() {
    return sl !== null || cl !== null;
  }
  function fh() {
    if (sl) {
      var e = sl, t = cl;
      if (sl = null, cl = null, sh(e), t)
        for (var n = 0; n < t.length; n++)
          sh(t[n]);
    }
  }
  var dh = function(e, t) {
    return e(t);
  }, ph = function() {
  }, Hf = !1;
  function wE() {
    var e = jE();
    e && (ph(), fh());
  }
  function mh(e, t, n) {
    if (Hf)
      return e(t, n);
    Hf = !0;
    try {
      return dh(e, t, n);
    } finally {
      Hf = !1, wE();
    }
  }
  function _E(e, t, n) {
    dh = e, ph = n;
  }
  function OE(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function LE(e, t, n) {
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
        return !!(n.disabled && OE(t));
      default:
        return !1;
    }
  }
  function Do(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = ec(n);
    if (a === null)
      return null;
    var r = a[t];
    if (LE(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Pf = !1;
  if (tn)
    try {
      var To = {};
      Object.defineProperty(To, "passive", {
        get: function() {
          Pf = !0;
        }
      }), window.addEventListener("test", To, To), window.removeEventListener("test", To, To);
    } catch {
      Pf = !1;
    }
  function vh(e, t, n, a, r, i, l, u, s) {
    var v = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, v);
    } catch (h) {
      this.onError(h);
    }
  }
  var hh = vh;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Bf = document.createElement("react");
    hh = function(t, n, a, r, i, l, u, s, v) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), R = !1, E = !0, L = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        Bf.removeEventListener(H, xe, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = L);
      }
      var ie = Array.prototype.slice.call(arguments, 3);
      function xe() {
        R = !0, z(), n.apply(a, ie), E = !1;
      }
      var he, qe = !1, Pe = !1;
      function w(_) {
        if (he = _.error, qe = !0, he === null && _.colno === 0 && _.lineno === 0 && (Pe = !0), _.defaultPrevented && he != null && typeof he == "object")
          try {
            he._suppressLogging = !0;
          } catch {
          }
      }
      var H = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", w), Bf.addEventListener(H, xe, !1), h.initEvent(H, !1, !1), Bf.dispatchEvent(h), A && Object.defineProperty(window, "event", A), R && E && (qe ? Pe && (he = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : he = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(he)), window.removeEventListener("error", w), !R)
        return z(), vh.apply(this, arguments);
    };
  }
  var VE = hh, fl = !1, bs = null, Ns = !1, $f = null, ME = {
    onError: function(e) {
      fl = !0, bs = e;
    }
  };
  function Yf(e, t, n, a, r, i, l, u, s) {
    fl = !1, bs = null, VE.apply(ME, arguments);
  }
  function AE(e, t, n, a, r, i, l, u, s) {
    if (Yf.apply(this, arguments), fl) {
      var v = If();
      Ns || (Ns = !0, $f = v);
    }
  }
  function kE() {
    if (Ns) {
      var e = $f;
      throw Ns = !1, $f = null, e;
    }
  }
  function UE() {
    return fl;
  }
  function If() {
    if (fl) {
      var e = bs;
      return fl = !1, bs = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function dl(e) {
    return e._reactInternals;
  }
  function FE(e) {
    return e._reactInternals !== void 0;
  }
  function zE(e, t) {
    e._reactInternals = t;
  }
  var Ce = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), wt = (
    /*                    */
    2
  ), Qe = (
    /*                       */
    4
  ), Ei = (
    /*                */
    16
  ), jo = (
    /*                 */
    32
  ), gh = (
    /*                     */
    64
  ), Xe = (
    /*                   */
    128
  ), dr = (
    /*            */
    256
  ), Si = (
    /*                          */
    512
  ), ml = (
    /*                     */
    1024
  ), Fr = (
    /*                      */
    2048
  ), pr = (
    /*                    */
    4096
  ), Ri = (
    /*                   */
    8192
  ), qf = (
    /*             */
    16384
  ), HE = (
    /*               */
    32767
  ), xs = (
    /*                   */
    32768
  ), _n = (
    /*                */
    65536
  ), Gf = (
    /* */
    131072
  ), yh = (
    /*                       */
    1048576
  ), Wf = (
    /*                    */
    2097152
  ), Ci = (
    /*                 */
    4194304
  ), Kf = (
    /*                */
    8388608
  ), zr = (
    /*               */
    16777216
  ), Qf = (
    /*              */
    33554432
  ), Xf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    Qe | ml | 0
  ), Jf = wt | Qe | Ei | jo | Si | pr | Ri, wo = Qe | gh | Si | Ri, vl = Fr | Ei, mr = Ci | Kf | Wf, PE = m.ReactCurrentOwner;
  function Di(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (wt | pr)) !== Ce && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function bh(e) {
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
  function Nh(e) {
    return e.tag === x ? e.stateNode.containerInfo : null;
  }
  function BE(e) {
    return Di(e) === e;
  }
  function $E(e) {
    {
      var t = PE.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || c("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ae(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = dl(e);
    return r ? Di(r) === r : !1;
  }
  function xh(e) {
    if (Di(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function Eh(e) {
    var t = e.alternate;
    if (!t) {
      var n = Di(e);
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
            return xh(i), e;
          if (s === r)
            return xh(i), t;
          s = s.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var v = !1, h = i.child; h; ) {
          if (h === a) {
            v = !0, a = i, r = l;
            break;
          }
          if (h === r) {
            v = !0, r = i, a = l;
            break;
          }
          h = h.sibling;
        }
        if (!v) {
          for (h = l.child; h; ) {
            if (h === a) {
              v = !0, a = l, r = i;
              break;
            }
            if (h === r) {
              v = !0, r = l, a = i;
              break;
            }
            h = h.sibling;
          }
          if (!v)
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
  function Sh(e) {
    var t = Eh(e);
    return t !== null ? Rh(t) : null;
  }
  function Rh(e) {
    if (e.tag === k || e.tag === K)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Rh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function YE(e) {
    var t = Eh(e);
    return t !== null ? Ch(t) : null;
  }
  function Ch(e) {
    if (e.tag === k || e.tag === K)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== j) {
        var n = Ch(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Dh = p.unstable_scheduleCallback, IE = p.unstable_cancelCallback, qE = p.unstable_shouldYield, GE = p.unstable_requestPaint, qt = p.unstable_now, WE = p.unstable_getCurrentPriorityLevel, Es = p.unstable_ImmediatePriority, Zf = p.unstable_UserBlockingPriority, Ti = p.unstable_NormalPriority, KE = p.unstable_LowPriority, ed = p.unstable_IdlePriority, QE = p.unstable_yieldValue, XE = p.unstable_setDisableYieldValue, hl = null, gn = null, oe = null, $a = !1, Sa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function JE(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return c("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      In && (e = ze({}, e, {
        getLaneLabelMap: rS,
        injectProfilingHooks: aS
      })), hl = t.inject(e), gn = t;
    } catch (n) {
      c("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function ZE(e, t) {
    if (gn && typeof gn.onScheduleFiberRoot == "function")
      try {
        gn.onScheduleFiberRoot(hl, e, t);
      } catch (n) {
        $a || ($a = !0, c("React instrumentation encountered an error: %s", n));
      }
  }
  function eS(e, t) {
    if (gn && typeof gn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Xe) === Xe;
        if (Xt) {
          var a;
          switch (t) {
            case Kn:
              a = Es;
              break;
            case hr:
              a = Zf;
              break;
            case gr:
              a = Ti;
              break;
            case ws:
              a = ed;
              break;
            default:
              a = Ti;
              break;
          }
          gn.onCommitFiberRoot(hl, e, a, n);
        }
      } catch (r) {
        $a || ($a = !0, c("React instrumentation encountered an error: %s", r));
      }
  }
  function tS(e) {
    if (gn && typeof gn.onPostCommitFiberRoot == "function")
      try {
        gn.onPostCommitFiberRoot(hl, e);
      } catch (t) {
        $a || ($a = !0, c("React instrumentation encountered an error: %s", t));
      }
  }
  function nS(e) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(hl, e);
      } catch (t) {
        $a || ($a = !0, c("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof QE == "function" && (XE(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        $a || ($a = !0, c("React instrumentation encountered an error: %s", t));
      }
  }
  function aS(e) {
    oe = e;
  }
  function rS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < nd; n++) {
        var a = RS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function iS(e) {
    oe !== null && typeof oe.markCommitStarted == "function" && oe.markCommitStarted(e);
  }
  function Th() {
    oe !== null && typeof oe.markCommitStopped == "function" && oe.markCommitStopped();
  }
  function _o(e) {
    oe !== null && typeof oe.markComponentRenderStarted == "function" && oe.markComponentRenderStarted(e);
  }
  function gl() {
    oe !== null && typeof oe.markComponentRenderStopped == "function" && oe.markComponentRenderStopped();
  }
  function lS(e) {
    oe !== null && typeof oe.markComponentPassiveEffectMountStarted == "function" && oe.markComponentPassiveEffectMountStarted(e);
  }
  function oS() {
    oe !== null && typeof oe.markComponentPassiveEffectMountStopped == "function" && oe.markComponentPassiveEffectMountStopped();
  }
  function uS(e) {
    oe !== null && typeof oe.markComponentPassiveEffectUnmountStarted == "function" && oe.markComponentPassiveEffectUnmountStarted(e);
  }
  function sS() {
    oe !== null && typeof oe.markComponentPassiveEffectUnmountStopped == "function" && oe.markComponentPassiveEffectUnmountStopped();
  }
  function cS(e) {
    oe !== null && typeof oe.markComponentLayoutEffectMountStarted == "function" && oe.markComponentLayoutEffectMountStarted(e);
  }
  function fS() {
    oe !== null && typeof oe.markComponentLayoutEffectMountStopped == "function" && oe.markComponentLayoutEffectMountStopped();
  }
  function jh(e) {
    oe !== null && typeof oe.markComponentLayoutEffectUnmountStarted == "function" && oe.markComponentLayoutEffectUnmountStarted(e);
  }
  function wh() {
    oe !== null && typeof oe.markComponentLayoutEffectUnmountStopped == "function" && oe.markComponentLayoutEffectUnmountStopped();
  }
  function dS(e, t, n) {
    oe !== null && typeof oe.markComponentErrored == "function" && oe.markComponentErrored(e, t, n);
  }
  function pS(e, t, n) {
    oe !== null && typeof oe.markComponentSuspended == "function" && oe.markComponentSuspended(e, t, n);
  }
  function mS(e) {
    oe !== null && typeof oe.markLayoutEffectsStarted == "function" && oe.markLayoutEffectsStarted(e);
  }
  function vS() {
    oe !== null && typeof oe.markLayoutEffectsStopped == "function" && oe.markLayoutEffectsStopped();
  }
  function hS(e) {
    oe !== null && typeof oe.markPassiveEffectsStarted == "function" && oe.markPassiveEffectsStarted(e);
  }
  function gS() {
    oe !== null && typeof oe.markPassiveEffectsStopped == "function" && oe.markPassiveEffectsStopped();
  }
  function _h(e) {
    oe !== null && typeof oe.markRenderStarted == "function" && oe.markRenderStarted(e);
  }
  function yS() {
    oe !== null && typeof oe.markRenderYielded == "function" && oe.markRenderYielded();
  }
  function Oh() {
    oe !== null && typeof oe.markRenderStopped == "function" && oe.markRenderStopped();
  }
  function bS(e) {
    oe !== null && typeof oe.markRenderScheduled == "function" && oe.markRenderScheduled(e);
  }
  function NS(e, t) {
    oe !== null && typeof oe.markForceUpdateScheduled == "function" && oe.markForceUpdateScheduled(e, t);
  }
  function td(e, t) {
    oe !== null && typeof oe.markStateUpdateScheduled == "function" && oe.markStateUpdateScheduled(e, t);
  }
  var Se = (
    /*                         */
    0
  ), Ye = (
    /*                 */
    1
  ), nt = (
    /*                    */
    2
  ), Et = (
    /*               */
    8
  ), Ya = (
    /*              */
    16
  ), Lh = Math.clz32 ? Math.clz32 : SS, xS = Math.log, ES = Math.LN2;
  function SS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (xS(t) / ES | 0) | 0;
  }
  var nd = 31, I = (
    /*                        */
    0
  ), Wt = (
    /*                          */
    0
  ), _e = (
    /*                        */
    1
  ), yl = (
    /*    */
    2
  ), vr = (
    /*             */
    4
  ), ji = (
    /*            */
    8
  ), Ia = (
    /*                     */
    16
  ), Oo = (
    /*                */
    32
  ), bl = (
    /*                       */
    4194240
  ), Lo = (
    /*                        */
    64
  ), ad = (
    /*                        */
    128
  ), rd = (
    /*                        */
    256
  ), id = (
    /*                        */
    512
  ), ld = (
    /*                        */
    1024
  ), od = (
    /*                        */
    2048
  ), ud = (
    /*                        */
    4096
  ), sd = (
    /*                        */
    8192
  ), cd = (
    /*                        */
    16384
  ), fd = (
    /*                       */
    32768
  ), dd = (
    /*                       */
    65536
  ), pd = (
    /*                       */
    131072
  ), md = (
    /*                       */
    262144
  ), vd = (
    /*                       */
    524288
  ), hd = (
    /*                       */
    1048576
  ), gd = (
    /*                       */
    2097152
  ), Ss = (
    /*                            */
    130023424
  ), Nl = (
    /*                             */
    4194304
  ), yd = (
    /*                             */
    8388608
  ), bd = (
    /*                             */
    16777216
  ), Nd = (
    /*                             */
    33554432
  ), xd = (
    /*                             */
    67108864
  ), Vh = Nl, Vo = (
    /*          */
    134217728
  ), Mh = (
    /*                          */
    268435455
  ), Mo = (
    /*               */
    268435456
  ), wi = (
    /*                        */
    536870912
  ), Gn = (
    /*                   */
    1073741824
  );
  function RS(e) {
    {
      if (e & _e)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & vr)
        return "InputContinuous";
      if (e & ji)
        return "DefaultHydration";
      if (e & Ia)
        return "Default";
      if (e & Oo)
        return "TransitionHydration";
      if (e & bl)
        return "Transition";
      if (e & Ss)
        return "Retry";
      if (e & Vo)
        return "SelectiveHydration";
      if (e & Mo)
        return "IdleHydration";
      if (e & wi)
        return "Idle";
      if (e & Gn)
        return "Offscreen";
    }
  }
  var st = -1, Rs = Lo, Cs = Nl;
  function Ao(e) {
    switch (_i(e)) {
      case _e:
        return _e;
      case yl:
        return yl;
      case vr:
        return vr;
      case ji:
        return ji;
      case Ia:
        return Ia;
      case Oo:
        return Oo;
      case Lo:
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
      case hd:
      case gd:
        return e & bl;
      case Nl:
      case yd:
      case bd:
      case Nd:
      case xd:
        return e & Ss;
      case Vo:
        return Vo;
      case Mo:
        return Mo;
      case wi:
        return wi;
      case Gn:
        return Gn;
      default:
        return c("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Ds(e, t) {
    var n = e.pendingLanes;
    if (n === I)
      return I;
    var a = I, r = e.suspendedLanes, i = e.pingedLanes, l = n & Mh;
    if (l !== I) {
      var u = l & ~r;
      if (u !== I)
        a = Ao(u);
      else {
        var s = l & i;
        s !== I && (a = Ao(s));
      }
    } else {
      var v = n & ~r;
      v !== I ? a = Ao(v) : i !== I && (a = Ao(i));
    }
    if (a === I)
      return I;
    if (t !== I && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === I) {
      var h = _i(a), R = _i(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= R || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === Ia && (R & bl) !== I
      )
        return t;
    }
    (a & vr) !== I && (a |= n & Ia);
    var E = e.entangledLanes;
    if (E !== I)
      for (var L = e.entanglements, A = a & E; A > 0; ) {
        var z = Oi(A), ie = 1 << z;
        a |= L[z], A &= ~ie;
      }
    return a;
  }
  function CS(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = Oi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function DS(e, t) {
    switch (e) {
      case _e:
      case yl:
      case vr:
        return t + 250;
      case ji:
      case Ia:
      case Oo:
      case Lo:
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
      case hd:
      case gd:
        return t + 5e3;
      case Nl:
      case yd:
      case bd:
      case Nd:
      case xd:
        return st;
      case Vo:
      case Mo:
      case wi:
      case Gn:
        return st;
      default:
        return c("Should have found matching lanes. This is a bug in React."), st;
    }
  }
  function TS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Oi(l), s = 1 << u, v = i[u];
      v === st ? ((s & a) === I || (s & r) !== I) && (i[u] = DS(s, t)) : v <= t && (e.expiredLanes |= s), l &= ~s;
    }
  }
  function jS(e) {
    return Ao(e.pendingLanes);
  }
  function Ed(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== I ? t : t & Gn ? Gn : I;
  }
  function wS(e) {
    return (e & _e) !== I;
  }
  function Sd(e) {
    return (e & Mh) !== I;
  }
  function Ah(e) {
    return (e & Ss) === e;
  }
  function _S(e) {
    var t = _e | vr | Ia;
    return (e & t) === I;
  }
  function OS(e) {
    return (e & bl) === e;
  }
  function Ts(e, t) {
    var n = yl | vr | ji | Ia;
    return (t & n) !== I;
  }
  function LS(e, t) {
    return (t & e.expiredLanes) !== I;
  }
  function kh(e) {
    return (e & bl) !== I;
  }
  function Uh() {
    var e = Rs;
    return Rs <<= 1, (Rs & bl) === I && (Rs = Lo), e;
  }
  function VS() {
    var e = Cs;
    return Cs <<= 1, (Cs & Ss) === I && (Cs = Nl), e;
  }
  function _i(e) {
    return e & -e;
  }
  function ko(e) {
    return _i(e);
  }
  function Oi(e) {
    return 31 - Lh(e);
  }
  function Rd(e) {
    return Oi(e);
  }
  function Wn(e, t) {
    return (e & t) !== I;
  }
  function xl(e, t) {
    return (e & t) === t;
  }
  function Ue(e, t) {
    return e | t;
  }
  function js(e, t) {
    return e & ~t;
  }
  function Fh(e, t) {
    return e & t;
  }
  function H_(e) {
    return e;
  }
  function MS(e, t) {
    return e !== Wt && e < t ? e : t;
  }
  function Cd(e) {
    for (var t = [], n = 0; n < nd; n++)
      t.push(e);
    return t;
  }
  function Uo(e, t, n) {
    e.pendingLanes |= t, t !== wi && (e.suspendedLanes = I, e.pingedLanes = I);
    var a = e.eventTimes, r = Rd(t);
    a[r] = n;
  }
  function AS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Oi(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function zh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function kS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = I, e.pingedLanes = I, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Oi(l), s = 1 << u;
      a[u] = I, r[u] = st, i[u] = st, l &= ~s;
    }
  }
  function Dd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Oi(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function US(e, t) {
    var n = _i(t), a;
    switch (n) {
      case vr:
        a = yl;
        break;
      case Ia:
        a = ji;
        break;
      case Lo:
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
      case hd:
      case gd:
      case Nl:
      case yd:
      case bd:
      case Nd:
      case xd:
        a = Oo;
        break;
      case wi:
        a = Mo;
        break;
      default:
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
  }
  function Hh(e, t, n) {
    if (Sa)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Rd(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Ph(e, t) {
    if (Sa)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Rd(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var s = u.alternate;
          (s === null || !a.has(s)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function Bh(e, t) {
    return null;
  }
  var Kn = _e, hr = vr, gr = Ia, ws = wi, Fo = Wt;
  function Ra() {
    return Fo;
  }
  function Kt(e) {
    Fo = e;
  }
  function FS(e, t) {
    var n = Fo;
    try {
      return Fo = e, t();
    } finally {
      Fo = n;
    }
  }
  function zS(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function HS(e, t) {
    return e > t ? e : t;
  }
  function Td(e, t) {
    return e !== 0 && e < t;
  }
  function $h(e) {
    var t = _i(e);
    return Td(Kn, t) ? Td(hr, t) ? Sd(t) ? gr : ws : hr : Kn;
  }
  function _s(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Yh;
  function PS(e) {
    Yh = e;
  }
  function BS(e) {
    Yh(e);
  }
  var jd;
  function $S(e) {
    jd = e;
  }
  var Ih;
  function YS(e) {
    Ih = e;
  }
  var qh;
  function IS(e) {
    qh = e;
  }
  var Gh;
  function qS(e) {
    Gh = e;
  }
  var wd = !1, Os = [], Hr = null, Pr = null, Br = null, zo = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), $r = [], GS = [
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
  function WS(e) {
    return GS.indexOf(e) > -1;
  }
  function KS(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Wh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Hr = null;
        break;
      case "dragenter":
      case "dragleave":
        Pr = null;
        break;
      case "mouseover":
      case "mouseout":
        Br = null;
        break;
      case "pointerover":
      case "pointerout": {
        var n = t.pointerId;
        zo.delete(n);
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
  function Po(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = KS(t, n, a, r, i);
      if (t !== null) {
        var u = qr(t);
        u !== null && jd(u);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var s = e.targetContainers;
    return r !== null && s.indexOf(r) === -1 && s.push(r), e;
  }
  function QS(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Hr = Po(Hr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Pr = Po(Pr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var u = r;
        return Br = Po(Br, e, t, n, a, u), !0;
      }
      case "pointerover": {
        var s = r, v = s.pointerId;
        return zo.set(v, Po(zo.get(v) || null, e, t, n, a, s)), !0;
      }
      case "gotpointercapture": {
        var h = r, R = h.pointerId;
        return Ho.set(R, Po(Ho.get(R) || null, e, t, n, a, h)), !0;
      }
    }
    return !1;
  }
  function Kh(e) {
    var t = Mi(e.target);
    if (t !== null) {
      var n = Di(t);
      if (n !== null) {
        var a = n.tag;
        if (a === P) {
          var r = bh(n);
          if (r !== null) {
            e.blockedOn = r, Gh(e.priority, function() {
              Ih(n);
            });
            return;
          }
        } else if (a === x) {
          var i = n.stateNode;
          if (_s(i)) {
            e.blockedOn = Nh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function XS(e) {
    for (var t = qh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < $r.length && Td(t, $r[a].priority); a++)
      ;
    $r.splice(a, 0, n), a === 0 && Kh(n);
  }
  function Ls(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Ld(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        RE(i), r.target.dispatchEvent(i), CE();
      } else {
        var l = qr(a);
        return l !== null && jd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Qh(e, t, n) {
    Ls(e) && n.delete(t);
  }
  function JS() {
    wd = !1, Hr !== null && Ls(Hr) && (Hr = null), Pr !== null && Ls(Pr) && (Pr = null), Br !== null && Ls(Br) && (Br = null), zo.forEach(Qh), Ho.forEach(Qh);
  }
  function Bo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, wd || (wd = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, JS)));
  }
  function $o(e) {
    if (Os.length > 0) {
      Bo(Os[0], e);
      for (var t = 1; t < Os.length; t++) {
        var n = Os[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Hr !== null && Bo(Hr, e), Pr !== null && Bo(Pr, e), Br !== null && Bo(Br, e);
    var a = function(u) {
      return Bo(u, e);
    };
    zo.forEach(a), Ho.forEach(a);
    for (var r = 0; r < $r.length; r++) {
      var i = $r[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; $r.length > 0; ) {
      var l = $r[0];
      if (l.blockedOn !== null)
        break;
      Kh(l), l.blockedOn === null && $r.shift();
    }
  }
  var El = m.ReactCurrentBatchConfig, _d = !0;
  function Xh(e) {
    _d = !!e;
  }
  function ZS() {
    return _d;
  }
  function eR(e, t, n) {
    var a = Jh(t), r;
    switch (a) {
      case Kn:
        r = tR;
        break;
      case hr:
        r = nR;
        break;
      case gr:
      default:
        r = Od;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function tR(e, t, n, a) {
    var r = Ra(), i = El.transition;
    El.transition = null;
    try {
      Kt(Kn), Od(e, t, n, a);
    } finally {
      Kt(r), El.transition = i;
    }
  }
  function nR(e, t, n, a) {
    var r = Ra(), i = El.transition;
    El.transition = null;
    try {
      Kt(hr), Od(e, t, n, a);
    } finally {
      Kt(r), El.transition = i;
    }
  }
  function Od(e, t, n, a) {
    _d && aR(e, t, n, a);
  }
  function aR(e, t, n, a) {
    var r = Ld(e, t, n, a);
    if (r === null) {
      qd(e, t, a, Vs, n), Wh(e, a);
      return;
    }
    if (QS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Wh(e, a), t & Ro && WS(e)) {
      for (; r !== null; ) {
        var i = qr(r);
        i !== null && BS(i);
        var l = Ld(e, t, n, a);
        if (l === null && qd(e, t, a, Vs, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    qd(e, t, a, null, n);
  }
  var Vs = null;
  function Ld(e, t, n, a) {
    Vs = null;
    var r = Ff(a), i = Mi(r);
    if (i !== null) {
      var l = Di(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === P) {
          var s = bh(l);
          if (s !== null)
            return s;
          i = null;
        } else if (u === x) {
          var v = l.stateNode;
          if (_s(v))
            return Nh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Vs = i, null;
  }
  function Jh(e) {
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
        return hr;
      case "message": {
        var t = WE();
        switch (t) {
          case Es:
            return Kn;
          case Zf:
            return hr;
          case Ti:
          case KE:
            return gr;
          case ed:
            return ws;
          default:
            return gr;
        }
      }
      default:
        return gr;
    }
  }
  function rR(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function iR(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function lR(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function oR(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Yo = null, Vd = null, Io = null;
  function uR(e) {
    return Yo = e, Vd = eg(), !0;
  }
  function sR() {
    Yo = null, Vd = null, Io = null;
  }
  function Zh() {
    if (Io)
      return Io;
    var e, t = Vd, n = t.length, a, r = eg(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return Io = r.slice(e, u), Io;
  }
  function eg() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function Ms(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function As() {
    return !0;
  }
  function tg() {
    return !1;
  }
  function Qn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var s = e[u];
          s ? this[u] = s(i) : this[u] = i[u];
        }
      var v = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return v ? this.isDefaultPrevented = As : this.isDefaultPrevented = tg, this.isPropagationStopped = tg, this;
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
  var Sl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Md = Qn(Sl), qo = ze({}, Sl, {
    view: 0,
    detail: 0
  }), cR = Qn(qo), Ad, kd, Go;
  function fR(e) {
    e !== Go && (Go && e.type === "mousemove" ? (Ad = e.screenX - Go.screenX, kd = e.screenY - Go.screenY) : (Ad = 0, kd = 0), Go = e);
  }
  var ks = ze({}, qo, {
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
    getModifierState: Fd,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (fR(e), Ad);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : kd;
    }
  }), ng = Qn(ks), dR = ze({}, ks, {
    dataTransfer: 0
  }), pR = Qn(dR), mR = ze({}, qo, {
    relatedTarget: 0
  }), Ud = Qn(mR), vR = ze({}, Sl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hR = Qn(vR), gR = ze({}, Sl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), yR = Qn(gR), bR = ze({}, Sl, {
    data: 0
  }), ag = Qn(bR), NR = ag, xR = {
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
  }, ER = {
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
  function SR(e) {
    if (e.key) {
      var t = xR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ms(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? ER[e.keyCode] || "Unidentified" : "";
  }
  var RR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function CR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = RR[e];
    return a ? !!n[a] : !1;
  }
  function Fd(e) {
    return CR;
  }
  var DR = ze({}, qo, {
    key: SR,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fd,
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
  }), TR = Qn(DR), jR = ze({}, ks, {
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
  }), rg = Qn(jR), wR = ze({}, qo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fd
  }), _R = Qn(wR), OR = ze({}, Sl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), LR = Qn(OR), VR = ze({}, ks, {
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
  }), MR = Qn(VR), AR = [9, 13, 27, 32], ig = 229, zd = tn && "CompositionEvent" in window, Wo = null;
  tn && "documentMode" in document && (Wo = document.documentMode);
  var kR = tn && "TextEvent" in window && !Wo, lg = tn && (!zd || Wo && Wo > 8 && Wo <= 11), og = 32, ug = String.fromCharCode(og);
  function UR() {
    Zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Zt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var sg = !1;
  function FR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function zR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function HR(e, t) {
    return e === "keydown" && t.keyCode === ig;
  }
  function cg(e, t) {
    switch (e) {
      case "keyup":
        return AR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== ig;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function fg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function dg(e) {
    return e.locale === "ko";
  }
  var Rl = !1;
  function PR(e, t, n, a, r) {
    var i, l;
    if (zd ? i = zR(t) : Rl ? cg(t, a) && (i = "onCompositionEnd") : HR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    lg && !dg(a) && (!Rl && i === "onCompositionStart" ? Rl = uR(r) : i === "onCompositionEnd" && Rl && (l = Zh()));
    var u = Ps(n, i);
    if (u.length > 0) {
      var s = new ag(i, t, null, a, r);
      if (e.push({
        event: s,
        listeners: u
      }), l)
        s.data = l;
      else {
        var v = fg(a);
        v !== null && (s.data = v);
      }
    }
  }
  function BR(e, t) {
    switch (e) {
      case "compositionend":
        return fg(t);
      case "keypress":
        var n = t.which;
        return n !== og ? null : (sg = !0, ug);
      case "textInput":
        var a = t.data;
        return a === ug && sg ? null : a;
      default:
        return null;
    }
  }
  function $R(e, t) {
    if (Rl) {
      if (e === "compositionend" || !zd && cg(e, t)) {
        var n = Zh();
        return sR(), Rl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!FR(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return lg && !dg(t) ? null : t.data;
      default:
        return null;
    }
  }
  function YR(e, t, n, a, r) {
    var i;
    if (kR ? i = BR(t, a) : i = $R(t, a), !i)
      return null;
    var l = Ps(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new NR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
    }
  }
  function IR(e, t, n, a, r, i, l) {
    PR(e, t, n, a, r), YR(e, t, n, a, r);
  }
  var qR = {
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
  function pg(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!qR[e.type] : t === "textarea";
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
  function GR(e) {
    if (!tn)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function WR() {
    Zt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function mg(e, t, n, a) {
    ch(a);
    var r = Ps(t, "onChange");
    if (r.length > 0) {
      var i = new Md("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Ko = null, Qo = null;
  function KR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function QR(e) {
    var t = [];
    mg(t, Qo, e, Ff(e)), mh(XR, t);
  }
  function XR(e) {
    Lg(e, 0);
  }
  function Us(e) {
    var t = _l(e);
    if (yo(t))
      return e;
  }
  function JR(e, t) {
    if (e === "change")
      return t;
  }
  var vg = !1;
  tn && (vg = GR("input") && (!document.documentMode || document.documentMode > 9));
  function ZR(e, t) {
    Ko = e, Qo = t, Ko.attachEvent("onpropertychange", gg);
  }
  function hg() {
    Ko && (Ko.detachEvent("onpropertychange", gg), Ko = null, Qo = null);
  }
  function gg(e) {
    e.propertyName === "value" && Us(Qo) && QR(e);
  }
  function e0(e, t, n) {
    e === "focusin" ? (hg(), ZR(t, n)) : e === "focusout" && hg();
  }
  function t0(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Us(Qo);
  }
  function n0(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function a0(e, t) {
    if (e === "click")
      return Us(t);
  }
  function r0(e, t) {
    if (e === "input" || e === "change")
      return Us(t);
  }
  function i0(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function l0(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window, s, v;
    if (KR(u) ? s = JR : pg(u) ? vg ? s = r0 : (s = t0, v = e0) : n0(u) && (s = a0), s) {
      var h = s(t, n);
      if (h) {
        mg(e, h, a, r);
        return;
      }
    }
    v && v(t, u, n), t === "focusout" && i0(u);
  }
  function o0() {
    en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function u0(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", s = t === "mouseout" || t === "pointerout";
    if (u && !DE(a)) {
      var v = a.relatedTarget || a.fromElement;
      if (v && (Mi(v) || fu(v)))
        return;
    }
    if (!(!s && !u)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var R = r.ownerDocument;
        R ? h = R.defaultView || R.parentWindow : h = window;
      }
      var E, L;
      if (s) {
        var A = a.relatedTarget || a.toElement;
        if (E = n, L = A ? Mi(A) : null, L !== null) {
          var z = Di(L);
          (L !== z || L.tag !== k && L.tag !== K) && (L = null);
        }
      } else
        E = null, L = n;
      if (E !== L) {
        var ie = ng, xe = "onMouseLeave", he = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (ie = rg, xe = "onPointerLeave", he = "onPointerEnter", qe = "pointer");
        var Pe = E == null ? h : _l(E), w = L == null ? h : _l(L), H = new ie(xe, qe + "leave", E, a, r);
        H.target = Pe, H.relatedTarget = w;
        var _ = null, W = Mi(r);
        if (W === n) {
          var ce = new ie(he, qe + "enter", L, a, r);
          ce.target = w, ce.relatedTarget = Pe, _ = ce;
        }
        L0(e, H, _, E, L);
      }
    }
  }
  function s0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Xn = typeof Object.is == "function" ? Object.is : s0;
  function Xo(e, t) {
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
  function yg(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function c0(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function bg(e, t) {
    for (var n = yg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === cr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = yg(c0(n));
    }
  }
  function f0(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return d0(e, r, i, l, u);
  }
  function d0(e, t, n, a, r) {
    var i = 0, l = -1, u = -1, s = 0, v = 0, h = e, R = null;
    e: for (; ; ) {
      for (var E = null; h === t && (n === 0 || h.nodeType === cr) && (l = i + n), h === a && (r === 0 || h.nodeType === cr) && (u = i + r), h.nodeType === cr && (i += h.nodeValue.length), (E = h.firstChild) !== null; )
        R = h, h = E;
      for (; ; ) {
        if (h === e)
          break e;
        if (R === t && ++s === n && (l = i), R === a && ++v === r && (u = i), (E = h.nextSibling) !== null)
          break;
        h = R, R = h.parentNode;
      }
      h = E;
    }
    return l === -1 || u === -1 ? null : {
      start: l,
      end: u
    };
  }
  function p0(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var s = u;
        u = l, l = s;
      }
      var v = bg(e, l), h = bg(e, u);
      if (v && h) {
        if (r.rangeCount === 1 && r.anchorNode === v.node && r.anchorOffset === v.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var R = n.createRange();
        R.setStart(v.node, v.offset), r.removeAllRanges(), l > u ? (r.addRange(R), r.extend(h.node, h.offset)) : (R.setEnd(h.node, h.offset), r.addRange(R));
      }
    }
  }
  function Ng(e) {
    return e && e.nodeType === cr;
  }
  function xg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Ng(e) ? !1 : Ng(t) ? xg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function m0(e) {
    return e && e.ownerDocument && xg(e.ownerDocument.documentElement, e);
  }
  function v0(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function Eg() {
    for (var e = window, t = or(); t instanceof e.HTMLIFrameElement; ) {
      if (v0(t))
        e = t.contentWindow;
      else
        return t;
      t = or(e.document);
    }
    return t;
  }
  function Hd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function h0() {
    var e = Eg();
    return {
      focusedElem: e,
      selectionRange: Hd(e) ? y0(e) : null
    };
  }
  function g0(e) {
    var t = Eg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && m0(n)) {
      a !== null && Hd(n) && b0(n, a);
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
  function y0(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = f0(e), t || {
      start: 0,
      end: 0
    };
  }
  function b0(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : p0(e, t);
  }
  var N0 = tn && "documentMode" in document && document.documentMode <= 11;
  function x0() {
    Zt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Cl = null, Pd = null, Jo = null, Bd = !1;
  function E0(e) {
    if ("selectionStart" in e && Hd(e))
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
  function S0(e) {
    return e.window === e ? e.document : e.nodeType === fr ? e : e.ownerDocument;
  }
  function Sg(e, t, n) {
    var a = S0(n);
    if (!(Bd || Cl == null || Cl !== or(a))) {
      var r = E0(Cl);
      if (!Jo || !Xo(Jo, r)) {
        Jo = r;
        var i = Ps(Pd, "onSelect");
        if (i.length > 0) {
          var l = new Md("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Cl;
        }
      }
    }
  }
  function R0(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window;
    switch (t) {
      case "focusin":
        (pg(u) || u.contentEditable === "true") && (Cl = u, Pd = n, Jo = null);
        break;
      case "focusout":
        Cl = null, Pd = null, Jo = null;
        break;
      case "mousedown":
        Bd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Bd = !1, Sg(e, a, r);
        break;
      case "selectionchange":
        if (N0)
          break;
      case "keydown":
      case "keyup":
        Sg(e, a, r);
    }
  }
  function Fs(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Dl = {
    animationend: Fs("Animation", "AnimationEnd"),
    animationiteration: Fs("Animation", "AnimationIteration"),
    animationstart: Fs("Animation", "AnimationStart"),
    transitionend: Fs("Transition", "TransitionEnd")
  }, $d = {}, Rg = {};
  tn && (Rg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
  function zs(e) {
    if ($d[e])
      return $d[e];
    if (!Dl[e])
      return e;
    var t = Dl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Rg)
        return $d[e] = t[n];
    return e;
  }
  var Cg = zs("animationend"), Dg = zs("animationiteration"), Tg = zs("animationstart"), jg = zs("transitionend"), wg = /* @__PURE__ */ new Map(), _g = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Yr(e, t) {
    wg.set(e, t), Zt(t, [e]);
  }
  function C0() {
    for (var e = 0; e < _g.length; e++) {
      var t = _g[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Yr(n, "on" + a);
    }
    Yr(Cg, "onAnimationEnd"), Yr(Dg, "onAnimationIteration"), Yr(Tg, "onAnimationStart"), Yr("dblclick", "onDoubleClick"), Yr("focusin", "onFocus"), Yr("focusout", "onBlur"), Yr(jg, "onTransitionEnd");
  }
  function D0(e, t, n, a, r, i, l) {
    var u = wg.get(t);
    if (u !== void 0) {
      var s = Md, v = t;
      switch (t) {
        case "keypress":
          if (Ms(a) === 0)
            return;
        case "keydown":
        case "keyup":
          s = TR;
          break;
        case "focusin":
          v = "focus", s = Ud;
          break;
        case "focusout":
          v = "blur", s = Ud;
          break;
        case "beforeblur":
        case "afterblur":
          s = Ud;
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
          s = ng;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          s = pR;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          s = _R;
          break;
        case Cg:
        case Dg:
        case Tg:
          s = hR;
          break;
        case jg:
          s = LR;
          break;
        case "scroll":
          s = cR;
          break;
        case "wheel":
          s = MR;
          break;
        case "copy":
        case "cut":
        case "paste":
          s = yR;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          s = rg;
          break;
      }
      var h = (i & Ro) !== 0;
      {
        var R = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", E = _0(n, u, a.type, h, R);
        if (E.length > 0) {
          var L = new s(u, v, null, a, r);
          e.push({
            event: L,
            listeners: E
          });
        }
      }
    }
  }
  C0(), o0(), WR(), x0(), UR();
  function T0(e, t, n, a, r, i, l) {
    D0(e, t, n, a, r, i);
    var u = (i & SE) === 0;
    u && (u0(e, t, n, a, r), l0(e, t, n, a, r), R0(e, t, n, a, r), IR(e, t, n, a, r));
  }
  var Zo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Yd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Zo));
  function Og(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, AE(a, t, void 0, e), e.currentTarget = null;
  }
  function j0(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, s = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Og(e, s, u), a = l;
      }
    else
      for (var v = 0; v < t.length; v++) {
        var h = t[v], R = h.instance, E = h.currentTarget, L = h.listener;
        if (R !== a && e.isPropagationStopped())
          return;
        Og(e, L, E), a = R;
      }
  }
  function Lg(e, t) {
    for (var n = (t & Ro) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      j0(i, l, n);
    }
    kE();
  }
  function w0(e, t, n, a, r) {
    var i = Ff(n), l = [];
    T0(l, e, a, n, i, t), Lg(l, t);
  }
  function pt(e, t) {
    Yd.has(e) || c('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = iD(t), r = V0(e);
    a.has(r) || (Vg(t, e, Uf, n), a.add(r));
  }
  function Id(e, t, n) {
    Yd.has(e) && !t && c('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Ro), Vg(n, e, a, t);
  }
  var Hs = "_reactListening" + Math.random().toString(36).slice(2);
  function eu(e) {
    if (!e[Hs]) {
      e[Hs] = !0, na.forEach(function(n) {
        n !== "selectionchange" && (Yd.has(n) || Id(n, !1, e), Id(n, !0, e));
      });
      var t = e.nodeType === fr ? e : e.ownerDocument;
      t !== null && (t[Hs] || (t[Hs] = !0, Id("selectionchange", !1, t)));
    }
  }
  function Vg(e, t, n, a, r) {
    var i = eR(e, t, n), l = void 0;
    Pf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? lR(e, t, i, l) : iR(e, t, i) : l !== void 0 ? oR(e, t, i, l) : rR(e, t, i);
  }
  function Mg(e, t) {
    return e === t || e.nodeType === jt && e.parentNode === t;
  }
  function qd(e, t, n, a, r) {
    var i = a;
    if (!(t & uh) && !(t & Uf)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var s = u.tag;
          if (s === x || s === j) {
            var v = u.stateNode.containerInfo;
            if (Mg(v, l))
              break;
            if (s === j)
              for (var h = u.return; h !== null; ) {
                var R = h.tag;
                if (R === x || R === j) {
                  var E = h.stateNode.containerInfo;
                  if (Mg(E, l))
                    return;
                }
                h = h.return;
              }
            for (; v !== null; ) {
              var L = Mi(v);
              if (L === null)
                return;
              var A = L.tag;
              if (A === k || A === K) {
                u = i = L;
                continue e;
              }
              v = v.parentNode;
            }
          }
          u = u.return;
        }
      }
    }
    mh(function() {
      return w0(e, t, n, i);
    });
  }
  function tu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function _0(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, u = a ? l : t, s = [], v = e, h = null; v !== null; ) {
      var R = v, E = R.stateNode, L = R.tag;
      if (L === k && E !== null && (h = E, u !== null)) {
        var A = Do(v, u);
        A != null && s.push(tu(v, A, h));
      }
      if (r)
        break;
      v = v.return;
    }
    return s;
  }
  function Ps(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, u = i.tag;
      if (u === k && l !== null) {
        var s = l, v = Do(r, n);
        v != null && a.unshift(tu(r, v, s));
        var h = Do(r, t);
        h != null && a.push(tu(r, h, s));
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
  function O0(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Tl(i))
      r++;
    for (var l = 0, u = a; u; u = Tl(u))
      l++;
    for (; r - l > 0; )
      n = Tl(n), r--;
    for (; l - r > 0; )
      a = Tl(a), l--;
    for (var s = r; s--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Tl(n), a = Tl(a);
    }
    return null;
  }
  function Ag(e, t, n, a, r) {
    for (var i = t._reactName, l = [], u = n; u !== null && u !== a; ) {
      var s = u, v = s.alternate, h = s.stateNode, R = s.tag;
      if (v !== null && v === a)
        break;
      if (R === k && h !== null) {
        var E = h;
        if (r) {
          var L = Do(u, i);
          L != null && l.unshift(tu(u, L, E));
        } else if (!r) {
          var A = Do(u, i);
          A != null && l.push(tu(u, A, E));
        }
      }
      u = u.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function L0(e, t, n, a, r) {
    var i = a && r ? O0(a, r) : null;
    a !== null && Ag(e, t, a, i, !1), r !== null && n !== null && Ag(e, n, r, i, !0);
  }
  function V0(e, t) {
    return e + "__bubble";
  }
  var Hn = !1, nu = "dangerouslySetInnerHTML", Bs = "suppressContentEditableWarning", Ir = "suppressHydrationWarning", kg = "autoFocus", Li = "children", Vi = "style", $s = "__html", Gd, Ys, au, Ug, Is, Fg, zg;
  Gd = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Ys = function(e, t) {
    hE(e, t), gE(e, t), EE(e, t, {
      registrationNameDependencies: Dt,
      possibleRegistrationNames: Jt
    });
  }, Fg = tn && !document.documentMode, au = function(e, t, n) {
    if (!Hn) {
      var a = qs(n), r = qs(t);
      r !== a && (Hn = !0, c("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ug = function(e) {
    if (!Hn) {
      Hn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), c("Extra attributes from the server: %s", t);
    }
  }, Is = function(e, t) {
    t === !1 ? c("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : c("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, zg = function(e, t) {
    var n = e.namespaceURI === sr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var M0 = /\r\n?/g, A0 = /\u0000|\uFFFD/g;
  function qs(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(M0, `
`).replace(A0, "");
  }
  function Gs(e, t, n, a) {
    var r = qs(t), i = qs(e);
    if (i !== r && (a && (Hn || (Hn = !0, c('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Hg(e) {
    return e.nodeType === fr ? e : e.ownerDocument;
  }
  function k0() {
  }
  function Ws(e) {
    e.onclick = k0;
  }
  function U0(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Vi)
          l && Object.freeze(l), nh(t, l);
        else if (i === nu) {
          var u = l ? l[$s] : void 0;
          u != null && Xv(t, u);
        } else if (i === Li)
          if (typeof l == "string") {
            var s = e !== "textarea" || l !== "";
            s && gs(t, l);
          } else typeof l == "number" && gs(t, "" + l);
        else i === Bs || i === Ir || i === kg || (Dt.hasOwnProperty(i) ? l != null && (typeof l != "function" && Is(i, l), i === "onScroll" && pt("scroll", t)) : l != null && ba(t, i, l, r));
      }
  }
  function F0(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Vi ? nh(e, l) : i === nu ? Xv(e, l) : i === Li ? gs(e, l) : ba(e, i, l, a);
    }
  }
  function z0(e, t, n, a) {
    var r, i = Hg(n), l, u = a;
    if (u === sr && (u = Of(e)), u === sr) {
      if (r = xi(e, t), !r && e !== e.toLowerCase() && c("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var s = i.createElement("div");
        s.innerHTML = "<script><\/script>";
        var v = s.firstChild;
        l = s.removeChild(v);
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
    return u === sr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !kn.call(Gd, e) && (Gd[e] = !0, c("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function H0(e, t) {
    return Hg(t).createTextNode(e);
  }
  function P0(e, t, n, a) {
    var r = xi(t, n);
    Ys(t, n);
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
        for (var l = 0; l < Zo.length; l++)
          pt(Zo[l], e);
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
        ms(e, n), i = bo(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n), i = n;
        break;
      case "select":
        Eo(e, n), i = xo(e, n), pt("invalid", e);
        break;
      case "textarea":
        Wv(e, n), i = wf(e, n), pt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (kf(t, i), U0(t, e, a, i, r), t) {
      case "input":
        bi(e), M(e, n, !1);
        break;
      case "textarea":
        bi(e), Qv(e);
        break;
      case "option":
        ot(e, n);
        break;
      case "select":
        Tf(e, n);
        break;
      default:
        typeof i.onClick == "function" && Ws(e);
        break;
    }
  }
  function B0(e, t, n, a, r) {
    Ys(t, a);
    var i = null, l, u;
    switch (t) {
      case "input":
        l = bo(e, n), u = bo(e, a), i = [];
        break;
      case "select":
        l = xo(e, n), u = xo(e, a), i = [];
        break;
      case "textarea":
        l = wf(e, n), u = wf(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ws(e);
        break;
    }
    kf(t, u);
    var s, v, h = null;
    for (s in l)
      if (!(u.hasOwnProperty(s) || !l.hasOwnProperty(s) || l[s] == null))
        if (s === Vi) {
          var R = l[s];
          for (v in R)
            R.hasOwnProperty(v) && (h || (h = {}), h[v] = "");
        } else s === nu || s === Li || s === Bs || s === Ir || s === kg || (Dt.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in u) {
      var E = u[s], L = l != null ? l[s] : void 0;
      if (!(!u.hasOwnProperty(s) || E === L || E == null && L == null))
        if (s === Vi)
          if (E && Object.freeze(E), L) {
            for (v in L)
              L.hasOwnProperty(v) && (!E || !E.hasOwnProperty(v)) && (h || (h = {}), h[v] = "");
            for (v in E)
              E.hasOwnProperty(v) && L[v] !== E[v] && (h || (h = {}), h[v] = E[v]);
          } else
            h || (i || (i = []), i.push(s, h)), h = E;
        else if (s === nu) {
          var A = E ? E[$s] : void 0, z = L ? L[$s] : void 0;
          A != null && z !== A && (i = i || []).push(s, A);
        } else s === Li ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(s, "" + E) : s === Bs || s === Ir || (Dt.hasOwnProperty(s) ? (E != null && (typeof E != "function" && Is(s, E), s === "onScroll" && pt("scroll", e)), !i && L !== E && (i = [])) : (i = i || []).push(s, E));
    }
    return h && (uE(h, u[Vi]), (i = i || []).push(Vi, h)), i;
  }
  function $0(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && f(e, r);
    var i = xi(n, a), l = xi(n, r);
    switch (F0(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        Kv(e, r);
        break;
      case "select":
        vs(e, r);
        break;
    }
  }
  function Y0(e) {
    {
      var t = e.toLowerCase();
      return ys.hasOwnProperty(t) && ys[t] || null;
    }
  }
  function I0(e, t, n, a, r, i, l) {
    var u, s;
    switch (u = xi(t, n), Ys(t, n), t) {
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
        for (var v = 0; v < Zo.length; v++)
          pt(Zo[v], e);
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
        ms(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n);
        break;
      case "select":
        Eo(e, n), pt("invalid", e);
        break;
      case "textarea":
        Wv(e, n), pt("invalid", e);
        break;
    }
    kf(t, n);
    {
      s = /* @__PURE__ */ new Set();
      for (var h = e.attributes, R = 0; R < h.length; R++) {
        var E = h[R].name.toLowerCase();
        switch (E) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            s.add(h[R].name);
        }
      }
    }
    var L = null;
    for (var A in n)
      if (n.hasOwnProperty(A)) {
        var z = n[A];
        if (A === Li)
          typeof z == "string" ? e.textContent !== z && (n[Ir] !== !0 && Gs(e.textContent, z, i, l), L = [Li, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Ir] !== !0 && Gs(e.textContent, z, i, l), L = [Li, "" + z]);
        else if (Dt.hasOwnProperty(A))
          z != null && (typeof z != "function" && Is(A, z), A === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var ie = void 0, xe = Nt(A);
          if (n[Ir] !== !0) {
            if (!(A === Bs || A === Ir || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            A === "value" || A === "checked" || A === "selected")) {
              if (A === nu) {
                var he = e.innerHTML, qe = z ? z[$s] : void 0;
                if (qe != null) {
                  var Pe = zg(e, qe);
                  Pe !== he && au(A, he, Pe);
                }
              } else if (A === Vi) {
                if (s.delete(A), Fg) {
                  var w = lE(z);
                  ie = e.getAttribute("style"), w !== ie && au(A, ie, w);
                }
              } else if (u && !Sn)
                s.delete(A.toLowerCase()), ie = fi(e, A, z), z !== ie && au(A, ie, z);
              else if (!gt(A, xe, u) && !vn(A, z, xe, u)) {
                var H = !1;
                if (xe !== null)
                  s.delete(xe.attributeName), ie = Zi(e, A, z, xe);
                else {
                  var _ = a;
                  if (_ === sr && (_ = Of(t)), _ === sr)
                    s.delete(A.toLowerCase());
                  else {
                    var W = Y0(A);
                    W !== null && W !== A && (H = !0, s.delete(W)), s.delete(A);
                  }
                  ie = fi(e, A, z);
                }
                var ce = Sn;
                !ce && z !== ie && !H && au(A, ie, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    s.size > 0 && n[Ir] !== !0 && Ug(s), t) {
      case "input":
        bi(e), M(e, n, !0);
        break;
      case "textarea":
        bi(e), Qv(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Ws(e);
        break;
    }
    return L;
  }
  function q0(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Wd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, c("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Kd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, c('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Qd(e, t, n) {
    {
      if (Hn)
        return;
      Hn = !0, c("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t) {
    {
      if (t === "" || Hn)
        return;
      Hn = !0, c('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function G0(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
        return;
      case "textarea":
        Px(e, n);
        return;
      case "select":
        jf(e, n);
        return;
    }
  }
  var ru = function() {
  }, iu = function() {
  };
  {
    var W0 = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Pg = [
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
    ], K0 = Pg.concat(["button"]), Q0 = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Bg = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    iu = function(e, t) {
      var n = ze({}, e || Bg), a = {
        tag: t
      };
      return Pg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), K0.indexOf(t) !== -1 && (n.pTagInButtonScope = null), W0.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var X0 = function(e, t) {
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
          return Q0.indexOf(t) === -1;
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
    }, J0 = function(e, t) {
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
    }, $g = {};
    ru = function(e, t, n) {
      n = n || Bg;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && c("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = X0(e, r) ? null : a, l = i ? null : J0(e, n), u = i || l;
      if (u) {
        var s = u.tag, v = !!i + "|" + e + "|" + s;
        if (!$g[v]) {
          $g[v] = !0;
          var h = e, R = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", R = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var E = "";
            s === "table" && e === "tr" && (E += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), c("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, s, R, E);
          } else
            c("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", h, s);
        }
      }
    };
  }
  var Ks = "suppressHydrationWarning", Qs = "$", Xs = "/$", lu = "$?", ou = "$!", Z0 = "style", Jd = null, Zd = null;
  function eC(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case fr:
      case Vf: {
        t = a === fr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Lf(null, "");
        break;
      }
      default: {
        var i = a === jt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Lf(l, t);
        break;
      }
    }
    {
      var u = t.toLowerCase(), s = iu(null, u);
      return {
        namespace: n,
        ancestorInfo: s
      };
    }
  }
  function tC(e, t, n) {
    {
      var a = e, r = Lf(a.namespace, t), i = iu(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function P_(e) {
    return e;
  }
  function nC(e) {
    Jd = ZS(), Zd = h0();
    var t = null;
    return Xh(!1), t;
  }
  function aC(e) {
    g0(Zd), Xh(Jd), Jd = null, Zd = null;
  }
  function rC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (ru(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, s = iu(l.ancestorInfo, e);
        ru(null, u, s);
      }
      i = l.namespace;
    }
    var v = z0(e, t, n, i);
    return cu(r, v), op(v, t), v;
  }
  function iC(e, t) {
    e.appendChild(t);
  }
  function lC(e, t, n, a, r) {
    switch (P0(e, t, n, a), t) {
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
  function oC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var u = "" + a.children, s = iu(l.ancestorInfo, t);
        ru(null, u, s);
      }
    }
    return B0(e, t, n, a);
  }
  function ep(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function uC(e, t, n, a) {
    {
      var r = n;
      ru(null, e, r.ancestorInfo);
    }
    var i = H0(e, t);
    return cu(a, i), i;
  }
  function sC() {
    var e = window.event;
    return e === void 0 ? gr : Jh(e.type);
  }
  var tp = typeof setTimeout == "function" ? setTimeout : void 0, cC = typeof clearTimeout == "function" ? clearTimeout : void 0, np = -1, Yg = typeof Promise == "function" ? Promise : void 0, fC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yg < "u" ? function(e) {
    return Yg.resolve(null).then(e).catch(dC);
  } : tp;
  function dC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function pC(e, t, n, a) {
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
  function mC(e, t, n, a, r, i) {
    $0(e, t, n, a, r), op(e, r);
  }
  function Ig(e) {
    gs(e, "");
  }
  function vC(e, t, n) {
    e.nodeValue = n;
  }
  function hC(e, t) {
    e.appendChild(t);
  }
  function gC(e, t) {
    var n;
    e.nodeType === jt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ws(n);
  }
  function yC(e, t, n) {
    e.insertBefore(t, n);
  }
  function bC(e, t, n) {
    e.nodeType === jt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function NC(e, t) {
    e.removeChild(t);
  }
  function xC(e, t) {
    e.nodeType === jt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ap(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === jt) {
        var i = r.data;
        if (i === Xs)
          if (a === 0) {
            e.removeChild(r), $o(t);
            return;
          } else
            a--;
        else (i === Qs || i === lu || i === ou) && a++;
      }
      n = r;
    } while (n);
    $o(t);
  }
  function EC(e, t) {
    e.nodeType === jt ? ap(e.parentNode, t) : e.nodeType === zn && ap(e, t), $o(e);
  }
  function SC(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function RC(e) {
    e.nodeValue = "";
  }
  function CC(e, t) {
    e = e;
    var n = t[Z0], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Mf("display", a);
  }
  function DC(e, t) {
    e.nodeValue = t;
  }
  function TC(e) {
    e.nodeType === zn ? e.textContent = "" : e.nodeType === fr && e.documentElement && e.removeChild(e.documentElement);
  }
  function jC(e, t, n) {
    return e.nodeType !== zn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function wC(e, t) {
    return t === "" || e.nodeType !== cr ? null : e;
  }
  function _C(e) {
    return e.nodeType !== jt ? null : e;
  }
  function qg(e) {
    return e.data === lu;
  }
  function rp(e) {
    return e.data === ou;
  }
  function OC(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function LC(e, t) {
    e._reactRetry = t;
  }
  function Js(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === zn || t === cr)
        break;
      if (t === jt) {
        var n = e.data;
        if (n === Qs || n === ou || n === lu)
          break;
        if (n === Xs)
          return null;
      }
    }
    return e;
  }
  function uu(e) {
    return Js(e.nextSibling);
  }
  function VC(e) {
    return Js(e.firstChild);
  }
  function MC(e) {
    return Js(e.firstChild);
  }
  function AC(e) {
    return Js(e.nextSibling);
  }
  function kC(e, t, n, a, r, i, l) {
    cu(i, e), op(e, n);
    var u;
    {
      var s = r;
      u = s.namespace;
    }
    var v = (i.mode & Ye) !== Se;
    return I0(e, t, n, u, a, v, l);
  }
  function UC(e, t, n, a) {
    return cu(n, e), n.mode & Ye, q0(e, t);
  }
  function FC(e, t) {
    cu(t, e);
  }
  function zC(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Xs) {
          if (n === 0)
            return uu(t);
          n--;
        } else (a === Qs || a === ou || a === lu) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Gg(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Qs || a === ou || a === lu) {
          if (n === 0)
            return t;
          n--;
        } else a === Xs && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function HC(e) {
    $o(e);
  }
  function PC(e) {
    $o(e);
  }
  function BC(e) {
    return e !== "head" && e !== "body";
  }
  function $C(e, t, n, a) {
    var r = !0;
    Gs(t.nodeValue, n, a, r);
  }
  function YC(e, t, n, a, r, i) {
    if (t[Ks] !== !0) {
      var l = !0;
      Gs(a.nodeValue, r, i, l);
    }
  }
  function IC(e, t) {
    t.nodeType === zn ? Wd(e, t) : t.nodeType === jt || Kd(e, t);
  }
  function qC(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === zn ? Wd(n, t) : t.nodeType === jt || Kd(n, t));
    }
  }
  function GC(e, t, n, a, r) {
    (r || t[Ks] !== !0) && (a.nodeType === zn ? Wd(n, a) : a.nodeType === jt || Kd(n, a));
  }
  function WC(e, t, n) {
    Qd(e, t);
  }
  function KC(e, t) {
    Xd(e, t);
  }
  function QC(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Qd(a, t);
    }
  }
  function XC(e, t) {
    {
      var n = e.parentNode;
      n !== null && Xd(n, t);
    }
  }
  function JC(e, t, n, a, r, i) {
    (i || t[Ks] !== !0) && Qd(n, a);
  }
  function ZC(e, t, n, a, r) {
    (r || t[Ks] !== !0) && Xd(n, a);
  }
  function eD(e) {
    c("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function tD(e) {
    eu(e);
  }
  var jl = Math.random().toString(36).slice(2), wl = "__reactFiber$" + jl, ip = "__reactProps$" + jl, su = "__reactContainer$" + jl, lp = "__reactEvents$" + jl, nD = "__reactListeners$" + jl, aD = "__reactHandles$" + jl;
  function rD(e) {
    delete e[wl], delete e[ip], delete e[lp], delete e[nD], delete e[aD];
  }
  function cu(e, t) {
    t[wl] = e;
  }
  function Zs(e, t) {
    t[su] = e;
  }
  function Wg(e) {
    e[su] = null;
  }
  function fu(e) {
    return !!e[su];
  }
  function Mi(e) {
    var t = e[wl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[su] || n[wl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = Gg(e); r !== null; ) {
            var i = r[wl];
            if (i)
              return i;
            r = Gg(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function qr(e) {
    var t = e[wl] || e[su];
    return t && (t.tag === k || t.tag === K || t.tag === P || t.tag === x) ? t : null;
  }
  function _l(e) {
    if (e.tag === k || e.tag === K)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function ec(e) {
    return e[ip] || null;
  }
  function op(e, t) {
    e[ip] = t;
  }
  function iD(e) {
    var t = e[lp];
    return t === void 0 && (t = e[lp] = /* @__PURE__ */ new Set()), t;
  }
  var Kg = {}, Qg = m.ReactDebugCurrentFrame;
  function tc(e) {
    if (e) {
      var t = e._owner, n = po(e.type, e._source, t ? t.type : null);
      Qg.setExtraStackFrame(n);
    } else
      Qg.setExtraStackFrame(null);
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
          } catch (v) {
            u = v;
          }
          u && !(u instanceof Error) && (tc(r), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), tc(null)), u instanceof Error && !(u.message in Kg) && (Kg[u.message] = !0, tc(r), c("Failed %s type: %s", n, u.message), tc(null));
        }
    }
  }
  var up = [], nc;
  nc = [];
  var yr = -1;
  function Gr(e) {
    return {
      current: e
    };
  }
  function yn(e, t) {
    if (yr < 0) {
      c("Unexpected pop.");
      return;
    }
    t !== nc[yr] && c("Unexpected Fiber popped."), e.current = up[yr], up[yr] = null, nc[yr] = null, yr--;
  }
  function bn(e, t, n) {
    yr++, up[yr] = e.current, nc[yr] = n, e.current = t;
  }
  var sp;
  sp = {};
  var Jn = {};
  Object.freeze(Jn);
  var br = Gr(Jn), qa = Gr(!1), cp = Jn;
  function Ol(e, t, n) {
    return n && Ga(t) ? cp : br.current;
  }
  function Xg(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Ll(e, t) {
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
        var u = Ae(e) || "Unknown";
        Ca(a, i, "context", u);
      }
      return r && Xg(e, t, i), i;
    }
  }
  function ac() {
    return qa.current;
  }
  function Ga(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function rc(e) {
    yn(qa, e), yn(br, e);
  }
  function fp(e) {
    yn(qa, e), yn(br, e);
  }
  function Jg(e, t, n) {
    {
      if (br.current !== Jn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      bn(br, t, e), bn(qa, n, e);
    }
  }
  function Zg(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Ae(e) || "Unknown";
          sp[i] || (sp[i] = !0, c("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error((Ae(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var s = Ae(e) || "Unknown";
        Ca(r, l, "child context", s);
      }
      return ze({}, n, l);
    }
  }
  function ic(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Jn;
      return cp = br.current, bn(br, n, e), bn(qa, qa.current, e), !0;
    }
  }
  function ey(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Zg(e, t, cp);
        a.__reactInternalMemoizedMergedChildContext = r, yn(qa, e), yn(br, e), bn(br, r, e), bn(qa, n, e);
      } else
        yn(qa, e), bn(qa, n, e);
    }
  }
  function lD(e) {
    {
      if (!BE(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case x:
            return t.stateNode.context;
          case T: {
            var n = t.type;
            if (Ga(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Wr = 0, lc = 1, Nr = null, dp = !1, pp = !1;
  function ty(e) {
    Nr === null ? Nr = [e] : Nr.push(e);
  }
  function oD(e) {
    dp = !0, ty(e);
  }
  function ny() {
    dp && Kr();
  }
  function Kr() {
    if (!pp && Nr !== null) {
      pp = !0;
      var e = 0, t = Ra();
      try {
        var n = !0, a = Nr;
        for (Kt(Kn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Nr = null, dp = !1;
      } catch (i) {
        throw Nr !== null && (Nr = Nr.slice(e + 1)), Dh(Es, Kr), i;
      } finally {
        Kt(t), pp = !1;
      }
    }
    return null;
  }
  var Vl = [], Ml = 0, oc = null, uc = 0, oa = [], ua = 0, Ai = null, xr = 1, Er = "";
  function uD(e) {
    return Ui(), (e.flags & yh) !== Ce;
  }
  function sD(e) {
    return Ui(), uc;
  }
  function cD() {
    var e = Er, t = xr, n = t & ~fD(t);
    return n.toString(32) + e;
  }
  function ki(e, t) {
    Ui(), Vl[Ml++] = uc, Vl[Ml++] = oc, oc = e, uc = t;
  }
  function ay(e, t, n) {
    Ui(), oa[ua++] = xr, oa[ua++] = Er, oa[ua++] = Ai, Ai = e;
    var a = xr, r = Er, i = sc(a) - 1, l = a & ~(1 << i), u = n + 1, s = sc(t) + i;
    if (s > 30) {
      var v = i - i % 5, h = (1 << v) - 1, R = (l & h).toString(32), E = l >> v, L = i - v, A = sc(t) + L, z = u << L, ie = z | E, xe = R + r;
      xr = 1 << A | ie, Er = xe;
    } else {
      var he = u << i, qe = he | l, Pe = r;
      xr = 1 << s | qe, Er = Pe;
    }
  }
  function mp(e) {
    Ui();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      ki(e, n), ay(e, n, a);
    }
  }
  function sc(e) {
    return 32 - Lh(e);
  }
  function fD(e) {
    return 1 << sc(e) - 1;
  }
  function vp(e) {
    for (; e === oc; )
      oc = Vl[--Ml], Vl[Ml] = null, uc = Vl[--Ml], Vl[Ml] = null;
    for (; e === Ai; )
      Ai = oa[--ua], oa[ua] = null, Er = oa[--ua], oa[ua] = null, xr = oa[--ua], oa[ua] = null;
  }
  function dD() {
    return Ui(), Ai !== null ? {
      id: xr,
      overflow: Er
    } : null;
  }
  function pD(e, t) {
    Ui(), oa[ua++] = xr, oa[ua++] = Er, oa[ua++] = Ai, xr = t.id, Er = t.overflow, Ai = e;
  }
  function Ui() {
    rn() || c("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var an = null, sa = null, Da = !1, Fi = !1, Qr = null;
  function mD() {
    Da && c("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function ry() {
    Fi = !0;
  }
  function vD() {
    return Fi;
  }
  function hD(e) {
    var t = e.stateNode.containerInfo;
    return sa = MC(t), an = e, Da = !0, Qr = null, Fi = !1, !0;
  }
  function gD(e, t, n) {
    return sa = AC(t), an = e, Da = !0, Qr = null, Fi = !1, n !== null && pD(e, n), !0;
  }
  function iy(e, t) {
    switch (e.tag) {
      case x: {
        IC(e.stateNode.containerInfo, t);
        break;
      }
      case k: {
        var n = (e.mode & Ye) !== Se;
        GC(
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
        a.dehydrated !== null && qC(a.dehydrated, t);
        break;
      }
    }
  }
  function ly(e, t) {
    iy(e, t);
    var n = x1();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ei) : a.push(n);
  }
  function hp(e, t) {
    {
      if (Fi)
        return;
      switch (e.tag) {
        case x: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case k:
              var a = t.type;
              t.pendingProps, WC(n, a);
              break;
            case K:
              var r = t.pendingProps;
              KC(n, r);
              break;
          }
          break;
        }
        case k: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case k: {
              var s = t.type, v = t.pendingProps, h = (e.mode & Ye) !== Se;
              JC(
                i,
                l,
                u,
                s,
                v,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case K: {
              var R = t.pendingProps, E = (e.mode & Ye) !== Se;
              ZC(
                i,
                l,
                u,
                R,
                // TODO: Delete this argument when we remove the legacy root API.
                E
              );
              break;
            }
          }
          break;
        }
        case P: {
          var L = e.memoizedState, A = L.dehydrated;
          if (A !== null) switch (t.tag) {
            case k:
              var z = t.type;
              t.pendingProps, QC(A, z);
              break;
            case K:
              var ie = t.pendingProps;
              XC(A, ie);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function oy(e, t) {
    t.flags = t.flags & ~pr | wt, hp(e, t);
  }
  function uy(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = jC(t, n);
        return a !== null ? (e.stateNode = a, an = e, sa = VC(a), !0) : !1;
      }
      case K: {
        var r = e.pendingProps, i = wC(t, r);
        return i !== null ? (e.stateNode = i, an = e, sa = null, !0) : !1;
      }
      case P: {
        var l = _C(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: dD(),
            retryLane: Gn
          };
          e.memoizedState = u;
          var s = E1(l);
          return s.return = e, e.child = s, an = e, sa = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function gp(e) {
    return (e.mode & Ye) !== Se && (e.flags & Xe) === Ce;
  }
  function yp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function bp(e) {
    if (Da) {
      var t = sa;
      if (!t) {
        gp(e) && (hp(an, e), yp()), oy(an, e), Da = !1, an = e;
        return;
      }
      var n = t;
      if (!uy(e, t)) {
        gp(e) && (hp(an, e), yp()), t = uu(n);
        var a = an;
        if (!t || !uy(e, t)) {
          oy(an, e), Da = !1, an = e;
          return;
        }
        ly(a, n);
      }
    }
  }
  function yD(e, t, n) {
    var a = e.stateNode, r = !Fi, i = kC(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function bD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = UC(t, n, e);
    if (a) {
      var r = an;
      if (r !== null)
        switch (r.tag) {
          case x: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== Se;
            $C(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case k: {
            var u = r.type, s = r.memoizedProps, v = r.stateNode, h = (r.mode & Ye) !== Se;
            YC(
              u,
              s,
              v,
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
  function ND(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    FC(n, e);
  }
  function xD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return zC(n);
  }
  function sy(e) {
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== x && t.tag !== P; )
      t = t.return;
    an = t;
  }
  function cc(e) {
    if (e !== an)
      return !1;
    if (!Da)
      return sy(e), Da = !0, !1;
    if (e.tag !== x && (e.tag !== k || BC(e.type) && !ep(e.type, e.memoizedProps))) {
      var t = sa;
      if (t)
        if (gp(e))
          cy(e), yp();
        else
          for (; t; )
            ly(e, t), t = uu(t);
    }
    return sy(e), e.tag === P ? sa = xD(e) : sa = an ? uu(e.stateNode) : null, !0;
  }
  function ED() {
    return Da && sa !== null;
  }
  function cy(e) {
    for (var t = sa; t; )
      iy(e, t), t = uu(t);
  }
  function Al() {
    an = null, sa = null, Da = !1, Fi = !1;
  }
  function fy() {
    Qr !== null && (rN(Qr), Qr = null);
  }
  function rn() {
    return Da;
  }
  function Np(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var SD = m.ReactCurrentBatchConfig, RD = null;
  function CD() {
    return SD.transition;
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
    var DD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & Et && (t = n), n = n.return;
      return t;
    }, zi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, du = [], pu = [], mu = [], vu = [], hu = [], gu = [], Hi = /* @__PURE__ */ new Set();
    Ta.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & Et && typeof t.UNSAFE_componentWillMount == "function" && pu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillReceiveProps == "function" && vu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && hu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillUpdate == "function" && gu.push(e));
    }, Ta.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        e.add(Ae(E) || "Component"), Hi.add(E.type);
      }), du = []);
      var t = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        t.add(Ae(E) || "Component"), Hi.add(E.type);
      }), pu = []);
      var n = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        n.add(Ae(E) || "Component"), Hi.add(E.type);
      }), mu = []);
      var a = /* @__PURE__ */ new Set();
      vu.length > 0 && (vu.forEach(function(E) {
        a.add(Ae(E) || "Component"), Hi.add(E.type);
      }), vu = []);
      var r = /* @__PURE__ */ new Set();
      hu.length > 0 && (hu.forEach(function(E) {
        r.add(Ae(E) || "Component"), Hi.add(E.type);
      }), hu = []);
      var i = /* @__PURE__ */ new Set();
      if (gu.length > 0 && (gu.forEach(function(E) {
        i.add(Ae(E) || "Component"), Hi.add(E.type);
      }), gu = []), t.size > 0) {
        var l = zi(t);
        c(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = zi(a);
        c(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var s = zi(i);
        c(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, s);
      }
      if (e.size > 0) {
        var v = zi(e);
        S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (n.size > 0) {
        var h = zi(n);
        S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var R = zi(r);
        S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, R);
      }
    };
    var fc = /* @__PURE__ */ new Map(), dy = /* @__PURE__ */ new Set();
    Ta.recordLegacyContextWarning = function(e, t) {
      var n = DD(e);
      if (n === null) {
        c("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!dy.has(e.type)) {
        var a = fc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], fc.set(n, a)), a.push(e));
      }
    }, Ta.flushLegacyContextWarning = function() {
      fc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Ae(i) || "Component"), dy.add(i.type);
          });
          var r = zi(a);
          try {
            mt(n), c(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            It();
          }
        }
      });
    }, Ta.discardPendingWarnings = function() {
      du = [], pu = [], mu = [], vu = [], hu = [], gu = [], fc = /* @__PURE__ */ new Map();
    };
  }
  var xp, Ep, Sp, Rp, Cp, py = function(e, t) {
  };
  xp = !1, Ep = !1, Sp = {}, Rp = {}, Cp = {}, py = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Ae(t) || "Component";
      Rp[n] || (Rp[n] = !0, c('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function TD(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function yu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Et || Ct) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !TD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Ae(e) || "Component";
        Sp[r] || (c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Sp[r] = !0);
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
        ar(a, "ref");
        var v = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === v)
          return t.ref;
        var h = function(R) {
          var E = s.refs;
          R === null ? delete E[v] : E[v] = R;
        };
        return h._stringRef = v, h;
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
  function dc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function pc(e) {
    {
      var t = Ae(e) || "Component";
      if (Cp[t])
        return;
      Cp[t] = !0, c("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function my(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function vy(e) {
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
      var _ = Ki(w, H);
      return _.index = 0, _.sibling = null, _;
    }
    function i(w, H, _) {
      if (w.index = _, !e)
        return w.flags |= yh, H;
      var W = w.alternate;
      if (W !== null) {
        var ce = W.index;
        return ce < H ? (w.flags |= wt, H) : ce;
      } else
        return w.flags |= wt, H;
    }
    function l(w) {
      return e && w.alternate === null && (w.flags |= wt), w;
    }
    function u(w, H, _, W) {
      if (H === null || H.tag !== K) {
        var ce = Nv(_, w.mode, W);
        return ce.return = w, ce;
      } else {
        var le = r(H, _);
        return le.return = w, le;
      }
    }
    function s(w, H, _, W) {
      var ce = _.type;
      if (ce === Ha)
        return h(w, H, _.props.children, W, _.key);
      if (H !== null && (H.elementType === ce || // Keep this check inline so it only runs on the false path:
      NN(H, _) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ce == "object" && ce !== null && ce.$$typeof === Ee && my(ce) === H.type)) {
        var le = r(H, _.props);
        return le.ref = yu(w, H, _), le.return = w, le._debugSource = _._source, le._debugOwner = _._owner, le;
      }
      var De = bv(_, w.mode, W);
      return De.ref = yu(w, H, _), De.return = w, De;
    }
    function v(w, H, _, W) {
      if (H === null || H.tag !== j || H.stateNode.containerInfo !== _.containerInfo || H.stateNode.implementation !== _.implementation) {
        var ce = xv(_, w.mode, W);
        return ce.return = w, ce;
      } else {
        var le = r(H, _.children || []);
        return le.return = w, le;
      }
    }
    function h(w, H, _, W, ce) {
      if (H === null || H.tag !== pe) {
        var le = oi(_, w.mode, W, ce);
        return le.return = w, le;
      } else {
        var De = r(H, _);
        return De.return = w, De;
      }
    }
    function R(w, H, _) {
      if (typeof H == "string" && H !== "" || typeof H == "number") {
        var W = Nv("" + H, w.mode, _);
        return W.return = w, W;
      }
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case ia: {
            var ce = bv(H, w.mode, _);
            return ce.ref = yu(w, null, H), ce.return = w, ce;
          }
          case qn: {
            var le = xv(H, w.mode, _);
            return le.return = w, le;
          }
          case Ee: {
            var De = H._payload, Me = H._init;
            return R(w, Me(De), _);
          }
        }
        if (He(H) || xa(H)) {
          var rt = oi(H, w.mode, _, null);
          return rt.return = w, rt;
        }
        dc(w, H);
      }
      return typeof H == "function" && pc(w), null;
    }
    function E(w, H, _, W) {
      var ce = H !== null ? H.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number")
        return ce !== null ? null : u(w, H, "" + _, W);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return _.key === ce ? s(w, H, _, W) : null;
          case qn:
            return _.key === ce ? v(w, H, _, W) : null;
          case Ee: {
            var le = _._payload, De = _._init;
            return E(w, H, De(le), W);
          }
        }
        if (He(_) || xa(_))
          return ce !== null ? null : h(w, H, _, W, null);
        dc(w, _);
      }
      return typeof _ == "function" && pc(w), null;
    }
    function L(w, H, _, W, ce) {
      if (typeof W == "string" && W !== "" || typeof W == "number") {
        var le = w.get(_) || null;
        return u(H, le, "" + W, ce);
      }
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case ia: {
            var De = w.get(W.key === null ? _ : W.key) || null;
            return s(H, De, W, ce);
          }
          case qn: {
            var Me = w.get(W.key === null ? _ : W.key) || null;
            return v(H, Me, W, ce);
          }
          case Ee:
            var rt = W._payload, Ge = W._init;
            return L(w, H, _, Ge(rt), ce);
        }
        if (He(W) || xa(W)) {
          var Rt = w.get(_) || null;
          return h(H, Rt, W, ce, null);
        }
        dc(H, W);
      }
      return typeof W == "function" && pc(H), null;
    }
    function A(w, H, _) {
      {
        if (typeof w != "object" || w === null)
          return H;
        switch (w.$$typeof) {
          case ia:
          case qn:
            py(w, _);
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
            c("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", W);
            break;
          case Ee:
            var ce = w._payload, le = w._init;
            A(le(ce), H, _);
            break;
        }
      }
      return H;
    }
    function z(w, H, _, W) {
      for (var ce = null, le = 0; le < _.length; le++) {
        var De = _[le];
        ce = A(De, ce, w);
      }
      for (var Me = null, rt = null, Ge = H, Rt = 0, We = 0, St = null; Ge !== null && We < _.length; We++) {
        Ge.index > We ? (St = Ge, Ge = null) : St = Ge.sibling;
        var xn = E(w, Ge, _[We], W);
        if (xn === null) {
          Ge === null && (Ge = St);
          break;
        }
        e && Ge && xn.alternate === null && t(w, Ge), Rt = i(xn, Rt, We), rt === null ? Me = xn : rt.sibling = xn, rt = xn, Ge = St;
      }
      if (We === _.length) {
        if (n(w, Ge), rn()) {
          var dn = We;
          ki(w, dn);
        }
        return Me;
      }
      if (Ge === null) {
        for (; We < _.length; We++) {
          var ea = R(w, _[We], W);
          ea !== null && (Rt = i(ea, Rt, We), rt === null ? Me = ea : rt.sibling = ea, rt = ea);
        }
        if (rn()) {
          var Mn = We;
          ki(w, Mn);
        }
        return Me;
      }
      for (var An = a(w, Ge); We < _.length; We++) {
        var En = L(An, w, We, _[We], W);
        En !== null && (e && En.alternate !== null && An.delete(En.key === null ? We : En.key), Rt = i(En, Rt, We), rt === null ? Me = En : rt.sibling = En, rt = En);
      }
      if (e && An.forEach(function(eo) {
        return t(w, eo);
      }), rn()) {
        var wr = We;
        ki(w, wr);
      }
      return Me;
    }
    function ie(w, H, _, W) {
      var ce = xa(_);
      if (typeof ce != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        _[Symbol.toStringTag] === "Generator" && (Ep || c("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Ep = !0), _.entries === ce && (xp || c("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), xp = !0);
        var le = ce.call(_);
        if (le)
          for (var De = null, Me = le.next(); !Me.done; Me = le.next()) {
            var rt = Me.value;
            De = A(rt, De, w);
          }
      }
      var Ge = ce.call(_);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, We = null, St = H, xn = 0, dn = 0, ea = null, Mn = Ge.next(); St !== null && !Mn.done; dn++, Mn = Ge.next()) {
        St.index > dn ? (ea = St, St = null) : ea = St.sibling;
        var An = E(w, St, Mn.value, W);
        if (An === null) {
          St === null && (St = ea);
          break;
        }
        e && St && An.alternate === null && t(w, St), xn = i(An, xn, dn), We === null ? Rt = An : We.sibling = An, We = An, St = ea;
      }
      if (Mn.done) {
        if (n(w, St), rn()) {
          var En = dn;
          ki(w, En);
        }
        return Rt;
      }
      if (St === null) {
        for (; !Mn.done; dn++, Mn = Ge.next()) {
          var wr = R(w, Mn.value, W);
          wr !== null && (xn = i(wr, xn, dn), We === null ? Rt = wr : We.sibling = wr, We = wr);
        }
        if (rn()) {
          var eo = dn;
          ki(w, eo);
        }
        return Rt;
      }
      for (var Qu = a(w, St); !Mn.done; dn++, Mn = Ge.next()) {
        var tr = L(Qu, w, dn, Mn.value, W);
        tr !== null && (e && tr.alternate !== null && Qu.delete(tr.key === null ? dn : tr.key), xn = i(tr, xn, dn), We === null ? Rt = tr : We.sibling = tr, We = tr);
      }
      if (e && Qu.forEach(function(Z1) {
        return t(w, Z1);
      }), rn()) {
        var J1 = dn;
        ki(w, J1);
      }
      return Rt;
    }
    function xe(w, H, _, W) {
      if (H !== null && H.tag === K) {
        n(w, H.sibling);
        var ce = r(H, _);
        return ce.return = w, ce;
      }
      n(w, H);
      var le = Nv(_, w.mode, W);
      return le.return = w, le;
    }
    function he(w, H, _, W) {
      for (var ce = _.key, le = H; le !== null; ) {
        if (le.key === ce) {
          var De = _.type;
          if (De === Ha) {
            if (le.tag === pe) {
              n(w, le.sibling);
              var Me = r(le, _.props.children);
              return Me.return = w, Me._debugSource = _._source, Me._debugOwner = _._owner, Me;
            }
          } else if (le.elementType === De || // Keep this check inline so it only runs on the false path:
          NN(le, _) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === Ee && my(De) === le.type) {
            n(w, le.sibling);
            var rt = r(le, _.props);
            return rt.ref = yu(w, le, _), rt.return = w, rt._debugSource = _._source, rt._debugOwner = _._owner, rt;
          }
          n(w, le);
          break;
        } else
          t(w, le);
        le = le.sibling;
      }
      if (_.type === Ha) {
        var Ge = oi(_.props.children, w.mode, W, _.key);
        return Ge.return = w, Ge;
      } else {
        var Rt = bv(_, w.mode, W);
        return Rt.ref = yu(w, H, _), Rt.return = w, Rt;
      }
    }
    function qe(w, H, _, W) {
      for (var ce = _.key, le = H; le !== null; ) {
        if (le.key === ce)
          if (le.tag === j && le.stateNode.containerInfo === _.containerInfo && le.stateNode.implementation === _.implementation) {
            n(w, le.sibling);
            var De = r(le, _.children || []);
            return De.return = w, De;
          } else {
            n(w, le);
            break;
          }
        else
          t(w, le);
        le = le.sibling;
      }
      var Me = xv(_, w.mode, W);
      return Me.return = w, Me;
    }
    function Pe(w, H, _, W) {
      var ce = typeof _ == "object" && _ !== null && _.type === Ha && _.key === null;
      if (ce && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return l(he(w, H, _, W));
          case qn:
            return l(qe(w, H, _, W));
          case Ee:
            var le = _._payload, De = _._init;
            return Pe(w, H, De(le), W);
        }
        if (He(_))
          return z(w, H, _, W);
        if (xa(_))
          return ie(w, H, _, W);
        dc(w, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" ? l(xe(w, H, "" + _, W)) : (typeof _ == "function" && pc(w), n(w, H));
    }
    return Pe;
  }
  var kl = vy(!0), hy = vy(!1);
  function jD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Ki(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Ki(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function wD(e, t) {
    for (var n = e.child; n !== null; )
      h1(n, t), n = n.sibling;
  }
  var Dp = Gr(null), Tp;
  Tp = {};
  var mc = null, Ul = null, jp = null, vc = !1;
  function hc() {
    mc = null, Ul = null, jp = null, vc = !1;
  }
  function gy() {
    vc = !0;
  }
  function yy() {
    vc = !1;
  }
  function by(e, t, n) {
    bn(Dp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Tp && c("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Tp;
  }
  function wp(e, t) {
    var n = Dp.current;
    yn(Dp, t), e._currentValue = n;
  }
  function _p(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (xl(a.childLanes, t) ? r !== null && !xl(r.childLanes, t) && (r.childLanes = Ue(r.childLanes, t)) : (a.childLanes = Ue(a.childLanes, t), r !== null && (r.childLanes = Ue(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && c("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function _D(e, t, n) {
    OD(e, t, n);
  }
  function OD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var u = ko(n), s = Sr(st, u);
              s.tag = yc;
              var v = a.updateQueue;
              if (v !== null) {
                var h = v.shared, R = h.pending;
                R === null ? s.next = s : (s.next = R.next, R.next = s), h.pending = s;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = Ue(E.lanes, n)), _p(a.return, n, e), i.lanes = Ue(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === Y)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Q) {
        var L = a.return;
        if (L === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        L.lanes = Ue(L.lanes, n);
        var A = L.alternate;
        A !== null && (A.lanes = Ue(A.lanes, n)), _p(L, n, e), r = a.sibling;
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
  function Fl(e, t) {
    mc = e, Ul = null, jp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Wn(n.lanes, t) && Vu(), n.firstContext = null);
    }
  }
  function _t(e) {
    vc && c("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (jp !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Ul === null) {
        if (mc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Ul = n, mc.dependencies = {
          lanes: I,
          firstContext: n
        };
      } else
        Ul = Ul.next = n;
    }
    return t;
  }
  var Pi = null;
  function Op(e) {
    Pi === null ? Pi = [e] : Pi.push(e);
  }
  function LD() {
    if (Pi !== null) {
      for (var e = 0; e < Pi.length; e++) {
        var t = Pi[e], n = t.interleaved;
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
      Pi = null;
    }
  }
  function Ny(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Op(t)) : (n.next = r.next, r.next = n), t.interleaved = n, gc(e, a);
  }
  function VD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Op(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function MD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Op(t)) : (n.next = r.next, r.next = n), t.interleaved = n, gc(e, a);
  }
  function Pn(e, t) {
    return gc(e, t);
  }
  var AD = gc;
  function gc(e, t) {
    e.lanes = Ue(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (wt | pr)) !== Ce && hN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (wt | pr)) !== Ce && hN(e), a = r, r = r.return;
    if (a.tag === x) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var xy = 0, Ey = 1, yc = 2, Lp = 3, bc = !1, Vp, Nc;
  Vp = !1, Nc = null;
  function Mp(e) {
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
  function Sy(e, t) {
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
      tag: xy,
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
    if (Nc === r && !Vp && (c("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Vp = !0), Vj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, AD(e, n);
    } else
      return MD(e, r, t, n);
  }
  function xc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (kh(n)) {
        var i = r.lanes;
        i = Fh(i, e.pendingLanes);
        var l = Ue(i, n);
        r.lanes = l, Dd(e, l);
      }
    }
  }
  function Ap(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, u = n.firstBaseUpdate;
        if (u !== null) {
          var s = u;
          do {
            var v = {
              eventTime: s.eventTime,
              lane: s.lane,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null
            };
            l === null ? i = l = v : (l.next = v, l = v), s = s.next;
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
  function kD(e, t, n, a, r, i) {
    switch (n.tag) {
      case Ey: {
        var l = n.payload;
        if (typeof l == "function") {
          gy();
          var u = l.call(i, a, r);
          {
            if (e.mode & Et) {
              Gt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            yy();
          }
          return u;
        }
        return l;
      }
      case Lp:
        e.flags = e.flags & ~_n | Xe;
      case xy: {
        var s = n.payload, v;
        if (typeof s == "function") {
          gy(), v = s.call(i, a, r);
          {
            if (e.mode & Et) {
              Gt(!0);
              try {
                s.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            yy();
          }
        } else
          v = s;
        return v == null ? a : ze({}, a, v);
      }
      case yc:
        return bc = !0, a;
    }
    return a;
  }
  function Ec(e, t, n, a) {
    var r = e.updateQueue;
    bc = !1, Nc = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
    if (u !== null) {
      r.shared.pending = null;
      var s = u, v = s.next;
      s.next = null, l === null ? i = v : l.next = v, l = s;
      var h = e.alternate;
      if (h !== null) {
        var R = h.updateQueue, E = R.lastBaseUpdate;
        E !== l && (E === null ? R.firstBaseUpdate = v : E.next = v, R.lastBaseUpdate = s);
      }
    }
    if (i !== null) {
      var L = r.baseState, A = I, z = null, ie = null, xe = null, he = i;
      do {
        var qe = he.lane, Pe = he.eventTime;
        if (xl(a, qe)) {
          if (xe !== null) {
            var H = {
              eventTime: Pe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              tag: he.tag,
              payload: he.payload,
              callback: he.callback,
              next: null
            };
            xe = xe.next = H;
          }
          L = kD(e, r, he, L, t, n);
          var _ = he.callback;
          if (_ !== null && // If the update was already committed, we should not queue its
          // callback again.
          he.lane !== Wt) {
            e.flags |= gh;
            var W = r.effects;
            W === null ? r.effects = [he] : W.push(he);
          }
        } else {
          var w = {
            eventTime: Pe,
            lane: qe,
            tag: he.tag,
            payload: he.payload,
            callback: he.callback,
            next: null
          };
          xe === null ? (ie = xe = w, z = L) : xe = xe.next = w, A = Ue(A, qe);
        }
        if (he = he.next, he === null) {
          if (u = r.shared.pending, u === null)
            break;
          var ce = u, le = ce.next;
          ce.next = null, he = le, r.lastBaseUpdate = ce, r.shared.pending = null;
        }
      } while (!0);
      xe === null && (z = L), r.baseState = z, r.firstBaseUpdate = ie, r.lastBaseUpdate = xe;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Me = De;
        do
          A = Ue(A, Me.lane), Me = Me.next;
        while (Me !== De);
      } else i === null && (r.shared.lanes = I);
      Iu(A), e.lanes = A, e.memoizedState = L;
    }
    Nc = null;
  }
  function UD(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Ry() {
    bc = !1;
  }
  function Sc() {
    return bc;
  }
  function Cy(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, UD(l, n));
      }
  }
  var bu = {}, Jr = Gr(bu), Nu = Gr(bu), Rc = Gr(bu);
  function Cc(e) {
    if (e === bu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Dy() {
    var e = Cc(Rc.current);
    return e;
  }
  function kp(e, t) {
    bn(Rc, t, e), bn(Nu, e, e), bn(Jr, bu, e);
    var n = eC(t);
    yn(Jr, e), bn(Jr, n, e);
  }
  function zl(e) {
    yn(Jr, e), yn(Nu, e), yn(Rc, e);
  }
  function Up() {
    var e = Cc(Jr.current);
    return e;
  }
  function Ty(e) {
    Cc(Rc.current);
    var t = Cc(Jr.current), n = tC(t, e.type);
    t !== n && (bn(Nu, e, e), bn(Jr, n, e));
  }
  function Fp(e) {
    Nu.current === e && (yn(Jr, e), yn(Nu, e));
  }
  var FD = 0, jy = 1, wy = 1, xu = 2, ja = Gr(FD);
  function zp(e, t) {
    return (e & t) !== 0;
  }
  function Hl(e) {
    return e & jy;
  }
  function Hp(e, t) {
    return e & jy | t;
  }
  function zD(e, t) {
    return e | t;
  }
  function Zr(e, t) {
    bn(ja, t, e);
  }
  function Pl(e) {
    yn(ja, e);
  }
  function HD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Dc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === P) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || qg(a) || rp(a))
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
  ), Mt = (
    /* */
    1
  ), Wa = (
    /*  */
    2
  ), At = (
    /*    */
    4
  ), ln = (
    /*   */
    8
  ), Pp = [];
  function Bp() {
    for (var e = 0; e < Pp.length; e++) {
      var t = Pp[e];
      t._workInProgressVersionPrimary = null;
    }
    Pp.length = 0;
  }
  function PD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var se = m.ReactCurrentDispatcher, Eu = m.ReactCurrentBatchConfig, $p, Bl;
  $p = /* @__PURE__ */ new Set();
  var Bi = I, at = null, kt = null, Ut = null, Tc = !1, Su = !1, Ru = 0, BD = 0, $D = 25, B = null, ca = null, ei = -1, Yp = !1;
  function Ze() {
    {
      var e = B;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function te() {
    {
      var e = B;
      ca !== null && (ei++, ca[ei] !== e && YD(e));
    }
  }
  function $l(e) {
    e != null && !He(e) && c("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", B, typeof e);
  }
  function YD(e) {
    {
      var t = Ae(at);
      if (!$p.has(t) && ($p.add(t), ca !== null)) {
        for (var n = "", a = 30, r = 0; r <= ei; r++) {
          for (var i = ca[r], l = r === ei ? e : i, u = r + 1 + ". " + i; u.length < a; )
            u += " ";
          u += l + `
`, n += u;
        }
        c(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

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
  function Ip(e, t) {
    if (Yp)
      return !1;
    if (t === null)
      return c("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", B), !1;
    e.length !== t.length && c(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, B, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Yl(e, t, n, a, r, i) {
    Bi = i, at = t, ca = e !== null ? e._debugHookTypes : null, ei = -1, Yp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = I, e !== null && e.memoizedState !== null ? se.current = Xy : ca !== null ? se.current = Qy : se.current = Ky;
    var l = n(a, r);
    if (Su) {
      var u = 0;
      do {
        if (Su = !1, Ru = 0, u >= $D)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, Yp = !1, kt = null, Ut = null, t.updateQueue = null, ei = -1, se.current = Jy, l = n(a, r);
      } while (Su);
    }
    se.current = Hc, t._debugHookTypes = ca;
    var s = kt !== null && kt.next !== null;
    if (Bi = I, at = null, kt = null, Ut = null, B = null, ca = null, ei = -1, e !== null && (e.flags & mr) !== (t.flags & mr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== Se && c("Internal React error: Expected static flag was missing. Please notify the React team."), Tc = !1, s)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Il() {
    var e = Ru !== 0;
    return Ru = 0, e;
  }
  function _y(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ya) !== Se ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = js(e.lanes, n);
  }
  function Oy() {
    if (se.current = Hc, Tc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    Bi = I, at = null, kt = null, Ut = null, ca = null, ei = -1, B = null, Yy = !1, Su = !1, Ru = 0;
  }
  function Ka() {
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
  function Ly() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function qp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Gp(e, t, n) {
    var a = Ka(), r;
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
    var l = i.dispatch = WD.bind(null, at, i);
    return [a.memoizedState, l];
  }
  function Wp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = kt, l = i.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var s = l.next, v = u.next;
        l.next = v, u.next = s;
      }
      i.baseQueue !== l && c("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, R = i.baseState, E = null, L = null, A = null, z = h;
      do {
        var ie = z.lane;
        if (xl(Bi, ie)) {
          if (A !== null) {
            var he = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            };
            A = A.next = he;
          }
          if (z.hasEagerState)
            R = z.eagerState;
          else {
            var qe = z.action;
            R = e(R, qe);
          }
        } else {
          var xe = {
            lane: ie,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          A === null ? (L = A = xe, E = R) : A = A.next = xe, at.lanes = Ue(at.lanes, ie), Iu(ie);
        }
        z = z.next;
      } while (z !== null && z !== h);
      A === null ? E = R : A.next = L, Xn(R, a.memoizedState) || Vu(), a.memoizedState = R, a.baseState = E, a.baseQueue = A, r.lastRenderedState = R;
    }
    var Pe = r.interleaved;
    if (Pe !== null) {
      var w = Pe;
      do {
        var H = w.lane;
        at.lanes = Ue(at.lanes, H), Iu(H), w = w.next;
      } while (w !== Pe);
    } else l === null && (r.lanes = I);
    var _ = r.dispatch;
    return [a.memoizedState, _];
  }
  function Kp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, u = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var s = l.next, v = s;
      do {
        var h = v.action;
        u = e(u, h), v = v.next;
      } while (v !== s);
      Xn(u, a.memoizedState) || Vu(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function B_(e, t, n) {
  }
  function $_(e, t, n) {
  }
  function Qp(e, t, n) {
    var a = at, r = Ka(), i, l = rn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Bl || i !== n() && (c("The result of getServerSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    } else {
      if (i = t(), !Bl) {
        var u = t();
        Xn(i, u) || (c("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
      }
      var s = lf();
      if (s === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ts(s, Bi) || Vy(a, t, i);
    }
    r.memoizedState = i;
    var v = {
      value: i,
      getSnapshot: t
    };
    return r.queue = v, Lc(Ay.bind(null, a, v, e), [e]), a.flags |= Fr, Cu(Mt | ln, My.bind(null, a, v, i, t), void 0, null), i;
  }
  function jc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (c("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var u = r.memoizedState, s = !Xn(u, i);
    s && (r.memoizedState = i, Vu());
    var v = r.queue;
    if (Tu(Ay.bind(null, a, v, e), [e]), v.getSnapshot !== t || s || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & Mt) {
      a.flags |= Fr, Cu(Mt | ln, My.bind(null, a, v, i, t), void 0, null);
      var h = lf();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ts(h, Bi) || Vy(a, t, i);
    }
    return i;
  }
  function Vy(e, t, n) {
    e.flags |= qf;
    var a = {
      getSnapshot: t,
      value: n
    }, r = at.updateQueue;
    if (r === null)
      r = Ly(), at.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function My(e, t, n, a) {
    t.value = n, t.getSnapshot = a, ky(t) && Uy(e);
  }
  function Ay(e, t, n) {
    var a = function() {
      ky(t) && Uy(e);
    };
    return n(a);
  }
  function ky(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Xn(n, a);
    } catch {
      return !0;
    }
  }
  function Uy(e) {
    var t = Pn(e, _e);
    t !== null && Pt(t, e, _e, st);
  }
  function wc(e) {
    var t = Ka();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: I,
      dispatch: null,
      lastRenderedReducer: qp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = KD.bind(null, at, n);
    return [t.memoizedState, a];
  }
  function Xp(e) {
    return Wp(qp);
  }
  function Jp(e) {
    return Kp(qp);
  }
  function Cu(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = at.updateQueue;
    if (i === null)
      i = Ly(), at.updateQueue = i, i.lastEffect = r.next = r;
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
  function Zp(e) {
    var t = Ka();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function _c(e) {
    var t = fa();
    return t.memoizedState;
  }
  function Du(e, t, n, a) {
    var r = Ka(), i = a === void 0 ? null : a;
    at.flags |= e, r.memoizedState = Cu(Mt | t, n, void 0, i);
  }
  function Oc(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (kt !== null) {
      var u = kt.memoizedState;
      if (l = u.destroy, i !== null) {
        var s = u.deps;
        if (Ip(i, s)) {
          r.memoizedState = Cu(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = Cu(Mt | t, n, l, i);
  }
  function Lc(e, t) {
    return (at.mode & Ya) !== Se ? Du(Qf | Fr | Kf, ln, e, t) : Du(Fr | Kf, ln, e, t);
  }
  function Tu(e, t) {
    return Oc(Fr, ln, e, t);
  }
  function em(e, t) {
    return Du(Qe, Wa, e, t);
  }
  function Vc(e, t) {
    return Oc(Qe, Wa, e, t);
  }
  function tm(e, t) {
    var n = Qe;
    return n |= Ci, (at.mode & Ya) !== Se && (n |= zr), Du(n, At, e, t);
  }
  function Mc(e, t) {
    return Oc(Qe, At, e, t);
  }
  function Fy(e, t) {
    if (typeof t == "function") {
      var n = t, a = e();
      return n(a), function() {
        n(null);
      };
    } else if (t != null) {
      var r = t;
      r.hasOwnProperty("current") || c("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(r).join(", ") + "}");
      var i = e();
      return r.current = i, function() {
        r.current = null;
      };
    }
  }
  function nm(e, t, n) {
    typeof t != "function" && c("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Qe;
    return r |= Ci, (at.mode & Ya) !== Se && (r |= zr), Du(r, At, Fy.bind(null, t, e), a);
  }
  function Ac(e, t, n) {
    typeof t != "function" && c("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Oc(Qe, At, Fy.bind(null, t, e), a);
  }
  function ID(e, t) {
  }
  var kc = ID;
  function am(e, t) {
    var n = Ka(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Uc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Ip(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function rm(e, t) {
    var n = Ka(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function Fc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Ip(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function im(e) {
    var t = Ka();
    return t.memoizedState = e, e;
  }
  function zy(e) {
    var t = fa(), n = kt, a = n.memoizedState;
    return Py(t, a, e);
  }
  function Hy(e) {
    var t = fa();
    if (kt === null)
      return t.memoizedState = e, e;
    var n = kt.memoizedState;
    return Py(t, n, e);
  }
  function Py(e, t, n) {
    var a = !_S(Bi);
    if (a) {
      if (!Xn(n, t)) {
        var r = Uh();
        at.lanes = Ue(at.lanes, r), Iu(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Vu()), e.memoizedState = n, n;
  }
  function qD(e, t, n) {
    var a = Ra();
    Kt(zS(a, hr)), e(!0);
    var r = Eu.transition;
    Eu.transition = {};
    var i = Eu.transition;
    Eu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Kt(a), Eu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function lm() {
    var e = wc(!1), t = e[0], n = e[1], a = qD.bind(null, n), r = Ka();
    return r.memoizedState = a, [t, a];
  }
  function By() {
    var e = Xp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  function $y() {
    var e = Jp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  var Yy = !1;
  function GD() {
    return Yy;
  }
  function om() {
    var e = Ka(), t = lf(), n = t.identifierPrefix, a;
    if (rn()) {
      var r = cD();
      a = ":" + n + "R" + r;
      var i = Ru++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = BD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function zc() {
    var e = fa(), t = e.memoizedState;
    return t;
  }
  function WD(e, t, n) {
    typeof arguments[3] == "function" && c("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Iy(e))
      qy(t, r);
    else {
      var i = Ny(e, t, r, a);
      if (i !== null) {
        var l = Vn();
        Pt(i, e, a, l), Gy(i, t, a);
      }
    }
    Wy(e, a);
  }
  function KD(e, t, n) {
    typeof arguments[3] == "function" && c("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Iy(e))
      qy(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === I && (i === null || i.lanes === I)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = se.current, se.current = wa;
          try {
            var s = t.lastRenderedState, v = l(s, n);
            if (r.hasEagerState = !0, r.eagerState = v, Xn(v, s)) {
              VD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            se.current = u;
          }
        }
      }
      var h = Ny(e, t, r, a);
      if (h !== null) {
        var R = Vn();
        Pt(h, e, a, R), Gy(h, t, a);
      }
    }
    Wy(e, a);
  }
  function Iy(e) {
    var t = e.alternate;
    return e === at || t !== null && t === at;
  }
  function qy(e, t) {
    Su = Tc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Gy(e, t, n) {
    if (kh(n)) {
      var a = t.lanes;
      a = Fh(a, e.pendingLanes);
      var r = Ue(a, n);
      t.lanes = r, Dd(e, r);
    }
  }
  function Wy(e, t, n) {
    td(e, t);
  }
  var Hc = {
    readContext: _t,
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
  }, Ky = null, Qy = null, Xy = null, Jy = null, Qa = null, wa = null, Pc = null;
  {
    var um = function() {
      c("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Oe = function() {
      c("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Ky = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Ze(), $l(t), am(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Ze(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Ze(), $l(t), Lc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Ze(), $l(n), nm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Ze(), $l(t), em(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Ze(), $l(t), tm(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Ze(), $l(t);
        var n = se.current;
        se.current = Qa;
        try {
          return rm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Ze();
        var a = se.current;
        se.current = Qa;
        try {
          return Gp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Ze(), Zp(e);
      },
      useState: function(e) {
        B = "useState", Ze();
        var t = se.current;
        se.current = Qa;
        try {
          return wc(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Ze(), im(e);
      },
      useTransition: function() {
        return B = "useTransition", Ze(), lm();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Ze(), Qp(e, t, n);
      },
      useId: function() {
        return B = "useId", Ze(), om();
      },
      unstable_isNewReconciler: Je
    }, Qy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", te(), am(e, t);
      },
      useContext: function(e) {
        return B = "useContext", te(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", te(), Lc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", te(), nm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", te(), em(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", te(), tm(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", te();
        var n = se.current;
        se.current = Qa;
        try {
          return rm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", te();
        var a = se.current;
        se.current = Qa;
        try {
          return Gp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", te(), Zp(e);
      },
      useState: function(e) {
        B = "useState", te();
        var t = se.current;
        se.current = Qa;
        try {
          return wc(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", te(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", te(), im(e);
      },
      useTransition: function() {
        return B = "useTransition", te(), lm();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", te(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", te(), Qp(e, t, n);
      },
      useId: function() {
        return B = "useId", te(), om();
      },
      unstable_isNewReconciler: Je
    }, Xy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", te(), Uc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", te(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", te(), Tu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", te(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", te(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", te(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", te();
        var n = se.current;
        se.current = wa;
        try {
          return Fc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", te();
        var a = se.current;
        se.current = wa;
        try {
          return Wp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", te(), _c();
      },
      useState: function(e) {
        B = "useState", te();
        var t = se.current;
        se.current = wa;
        try {
          return Xp(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", te(), kc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", te(), zy(e);
      },
      useTransition: function() {
        return B = "useTransition", te(), By();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", te(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", te(), jc(e, t);
      },
      useId: function() {
        return B = "useId", te(), zc();
      },
      unstable_isNewReconciler: Je
    }, Jy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", te(), Uc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", te(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", te(), Tu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", te(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", te(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", te(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", te();
        var n = se.current;
        se.current = Pc;
        try {
          return Fc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", te();
        var a = se.current;
        se.current = Pc;
        try {
          return Kp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", te(), _c();
      },
      useState: function(e) {
        B = "useState", te();
        var t = se.current;
        se.current = Pc;
        try {
          return Jp(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", te(), kc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", te(), Hy(e);
      },
      useTransition: function() {
        return B = "useTransition", te(), $y();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", te(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", te(), jc(e, t);
      },
      useId: function() {
        return B = "useId", te(), zc();
      },
      unstable_isNewReconciler: Je
    }, Qa = {
      readContext: function(e) {
        return um(), _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Oe(), Ze(), am(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Oe(), Ze(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Oe(), Ze(), Lc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Oe(), Ze(), nm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), Ze(), em(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), Ze(), tm(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Oe(), Ze();
        var n = se.current;
        se.current = Qa;
        try {
          return rm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), Ze();
        var a = se.current;
        se.current = Qa;
        try {
          return Gp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Oe(), Ze(), Zp(e);
      },
      useState: function(e) {
        B = "useState", Oe(), Ze();
        var t = se.current;
        se.current = Qa;
        try {
          return wc(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Oe(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Oe(), Ze(), im(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), Ze(), lm();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Oe(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Oe(), Ze(), Qp(e, t, n);
      },
      useId: function() {
        return B = "useId", Oe(), Ze(), om();
      },
      unstable_isNewReconciler: Je
    }, wa = {
      readContext: function(e) {
        return um(), _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Oe(), te(), Uc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Oe(), te(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Oe(), te(), Tu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Oe(), te(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), te(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), te(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Oe(), te();
        var n = se.current;
        se.current = wa;
        try {
          return Fc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), te();
        var a = se.current;
        se.current = wa;
        try {
          return Wp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Oe(), te(), _c();
      },
      useState: function(e) {
        B = "useState", Oe(), te();
        var t = se.current;
        se.current = wa;
        try {
          return Xp(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Oe(), te(), kc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Oe(), te(), zy(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), te(), By();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Oe(), te(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Oe(), te(), jc(e, t);
      },
      useId: function() {
        return B = "useId", Oe(), te(), zc();
      },
      unstable_isNewReconciler: Je
    }, Pc = {
      readContext: function(e) {
        return um(), _t(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Oe(), te(), Uc(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Oe(), te(), _t(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Oe(), te(), Tu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return B = "useImperativeHandle", Oe(), te(), Ac(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), te(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), te(), Mc(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Oe(), te();
        var n = se.current;
        se.current = wa;
        try {
          return Fc(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), te();
        var a = se.current;
        se.current = wa;
        try {
          return Kp(e, t, n);
        } finally {
          se.current = a;
        }
      },
      useRef: function(e) {
        return B = "useRef", Oe(), te(), _c();
      },
      useState: function(e) {
        B = "useState", Oe(), te();
        var t = se.current;
        se.current = wa;
        try {
          return Jp(e);
        } finally {
          se.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return B = "useDebugValue", Oe(), te(), kc();
      },
      useDeferredValue: function(e) {
        return B = "useDeferredValue", Oe(), te(), Hy(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), te(), $y();
      },
      useMutableSource: function(e, t, n) {
        return B = "useMutableSource", Oe(), te(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return B = "useSyncExternalStore", Oe(), te(), jc(e, t);
      },
      useId: function() {
        return B = "useId", Oe(), te(), zc();
      },
      unstable_isNewReconciler: Je
    };
  }
  var ti = p.unstable_now, Zy = 0, Bc = -1, ju = -1, $c = -1, sm = !1, Yc = !1;
  function eb() {
    return sm;
  }
  function QD() {
    Yc = !0;
  }
  function XD() {
    sm = !1, Yc = !1;
  }
  function JD() {
    sm = Yc, Yc = !1;
  }
  function tb() {
    return Zy;
  }
  function nb() {
    Zy = ti();
  }
  function cm(e) {
    ju = ti(), e.actualStartTime < 0 && (e.actualStartTime = ti());
  }
  function ab(e) {
    ju = -1;
  }
  function Ic(e, t) {
    if (ju >= 0) {
      var n = ti() - ju;
      e.actualDuration += n, t && (e.selfBaseDuration = n), ju = -1;
    }
  }
  function Xa(e) {
    if (Bc >= 0) {
      var t = ti() - Bc;
      Bc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
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
  function fm(e) {
    if ($c >= 0) {
      var t = ti() - $c;
      $c = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
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
  function Ja() {
    Bc = ti();
  }
  function dm() {
    $c = ti();
  }
  function pm(e) {
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
  var mm = {}, vm, hm, gm, ym, bm, rb, qc, Nm, xm, Em, wu;
  {
    vm = /* @__PURE__ */ new Set(), hm = /* @__PURE__ */ new Set(), gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), wu = /* @__PURE__ */ new Set();
    var ib = /* @__PURE__ */ new Set();
    qc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        ib.has(n) || (ib.add(n), c("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, rb = function(e, t) {
      if (t === void 0) {
        var n = Ke(e) || "Component";
        bm.has(n) || (bm.add(n), c("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(mm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(mm);
  }
  function Sm(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & Et) {
        Gt(!0);
        try {
          i = n(a, r);
        } finally {
          Gt(!1);
        }
      }
      rb(t, i);
    }
    var l = i == null ? r : ze({}, r, i);
    if (e.memoizedState = l, e.lanes === I) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Rm = {
    isMounted: $E,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = Vn(), i = ii(a), l = Sr(r, i);
      l.payload = t, n != null && (qc(n, "setState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (Pt(u, a, i, r), xc(u, a, i)), td(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = Vn(), i = ii(a), l = Sr(r, i);
      l.tag = Ey, l.payload = t, n != null && (qc(n, "replaceState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (Pt(u, a, i, r), xc(u, a, i)), td(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = Vn(), r = ii(n), i = Sr(a, r);
      i.tag = yc, t != null && (qc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (Pt(l, n, r, a), xc(l, n, r)), NS(n, r);
    }
  };
  function lb(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var s = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Et) {
          Gt(!0);
          try {
            s = u.shouldComponentUpdate(a, i, l);
          } finally {
            Gt(!1);
          }
        }
        s === void 0 && c("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ke(t) || "Component");
      }
      return s;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Xo(n, a) || !Xo(r, i) : !0;
  }
  function ZD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ke(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? c("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : c("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && c("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && c("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && c("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && c("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !wu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === Se && (wu.add(t), c(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !wu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === Se && (wu.add(t), c(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && c("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !xm.has(t) && (xm.add(t), c("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && c("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && c("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ke(t) || "A pure component"), typeof a.componentDidUnmount == "function" && c("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && c("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && c("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && c("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && c("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && c("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !gm.has(t) && (gm.add(t), c("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ke(t))), typeof a.getDerivedStateFromProps == "function" && c("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && c("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && c("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || He(u)) && c("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && c("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function ob(e, t) {
    t.updater = Rm, e.stateNode = t, zE(t, e), t._reactInternalInstance = mm;
  }
  function ub(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === re && l._context === void 0
      );
      if (!u && !Em.has(t)) {
        Em.add(t);
        var s = "";
        l === void 0 ? s = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? s = " However, it is set to a " + typeof l + "." : l.$$typeof === G ? s = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? s = " Did you accidentally pass the Context.Consumer instead?" : s = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", c("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ke(t) || "Component", s);
      }
    }
    if (typeof l == "object" && l !== null)
      i = _t(l);
    else {
      r = Ol(e, t, !0);
      var v = t.contextTypes;
      a = v != null, i = a ? Ll(e, r) : Jn;
    }
    var h = new t(n, i);
    if (e.mode & Et) {
      Gt(!0);
      try {
        h = new t(n, i);
      } finally {
        Gt(!1);
      }
    }
    var R = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    ob(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && R === null) {
        var E = Ke(t) || "Component";
        hm.has(E) || (hm.add(E), c("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, h.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var L = null, A = null, z = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? L = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (L = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), L !== null || A !== null || z !== null) {
          var ie = Ke(t) || "Component", xe = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          ym.has(ie) || (ym.add(ie), c(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ie, xe, L !== null ? `
  ` + L : "", A !== null ? `
  ` + A : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && Xg(e, r, i), h;
  }
  function eT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (c("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ae(e) || "Component"), Rm.enqueueReplaceState(t, t.state, null));
  }
  function sb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Ae(e) || "Component";
        vm.has(i) || (vm.add(i), c("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Rm.enqueueReplaceState(t, t.state, null);
    }
  }
  function Cm(e, t, n, a) {
    ZD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Mp(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = _t(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Ll(e, l);
    }
    {
      if (r.state === n) {
        var u = Ke(t) || "Component";
        Nm.has(u) || (Nm.add(u), c("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & Et && Ta.recordLegacyContextWarning(e, r), Ta.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var s = t.getDerivedStateFromProps;
    if (typeof s == "function" && (Sm(e, t, s, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (eT(e, r), Ec(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var v = Qe;
      v |= Ci, (e.mode & Ya) !== Se && (v |= zr), e.flags |= v;
    }
  }
  function tT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, s = Jn;
    if (typeof u == "object" && u !== null)
      s = _t(u);
    else {
      var v = Ol(e, t, !0);
      s = Ll(e, v);
    }
    var h = t.getDerivedStateFromProps, R = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !R && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== s) && sb(e, r, n, s), Ry();
    var E = e.memoizedState, L = r.state = E;
    if (Ec(e, n, r, a), L = e.memoizedState, i === n && E === L && !ac() && !Sc()) {
      if (typeof r.componentDidMount == "function") {
        var A = Qe;
        A |= Ci, (e.mode & Ya) !== Se && (A |= zr), e.flags |= A;
      }
      return !1;
    }
    typeof h == "function" && (Sm(e, t, h, n), L = e.memoizedState);
    var z = Sc() || lb(e, t, i, n, E, L, s);
    if (z) {
      if (!R && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ie = Qe;
        ie |= Ci, (e.mode & Ya) !== Se && (ie |= zr), e.flags |= ie;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var xe = Qe;
        xe |= Ci, (e.mode & Ya) !== Se && (xe |= zr), e.flags |= xe;
      }
      e.memoizedProps = n, e.memoizedState = L;
    }
    return r.props = n, r.state = L, r.context = s, z;
  }
  function nT(e, t, n, a, r) {
    var i = t.stateNode;
    Sy(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : _a(t.type, l);
    i.props = u;
    var s = t.pendingProps, v = i.context, h = n.contextType, R = Jn;
    if (typeof h == "object" && h !== null)
      R = _t(h);
    else {
      var E = Ol(t, n, !0);
      R = Ll(t, E);
    }
    var L = n.getDerivedStateFromProps, A = typeof L == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !A && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== s || v !== R) && sb(t, i, a, R), Ry();
    var z = t.memoizedState, ie = i.state = z;
    if (Ec(t, a, i, r), ie = t.memoizedState, l === s && z === ie && !ac() && !Sc() && !pn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), !1;
    typeof L == "function" && (Sm(t, n, L, a), ie = t.memoizedState);
    var xe = Sc() || lb(t, n, u, a, z, ie, R) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    pn;
    return xe ? (!A && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ie, R), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ie, R)), typeof i.componentDidUpdate == "function" && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = ie), i.props = a, i.state = ie, i.context = R, xe;
  }
  function $i(e, t) {
    return {
      value: e,
      source: t,
      stack: gi(t),
      digest: null
    };
  }
  function Dm(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function aT(e, t) {
    return !0;
  }
  function Tm(e, t) {
    try {
      var n = aT(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var u = r ? Ae(r) : null, s = u ? "The above error occurred in the <" + u + "> component:" : "The above error occurred in one of your React components:", v;
      if (e.tag === x)
        v = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Ae(e) || "Anonymous";
        v = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var R = s + `
` + l + `

` + ("" + v);
      console.error(R);
    } catch (E) {
      setTimeout(function() {
        throw E;
      });
    }
  }
  var rT = typeof WeakMap == "function" ? WeakMap : Map;
  function cb(e, t, n) {
    var a = Sr(st, n);
    a.tag = Lp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Qj(r), Tm(e, t);
    }, a;
  }
  function jm(e, t, n) {
    var a = Sr(st, n);
    a.tag = Lp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        xN(e), Tm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      xN(e), Tm(e, t), typeof r != "function" && Wj(this);
      var s = t.value, v = t.stack;
      this.componentDidCatch(s, {
        componentStack: v !== null ? v : ""
      }), typeof r != "function" && (Wn(e.lanes, _e) || c("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ae(e) || "Unknown"));
    }), a;
  }
  function fb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new rT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Xj.bind(null, e, t, n);
      Sa && qu(e, n), t.then(i, i);
    }
  }
  function iT(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function lT(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === Se && (n === C || n === $ || n === ue)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function db(e) {
    var t = e;
    do {
      if (t.tag === P && HD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function pb(e, t, n, a, r) {
    if ((e.mode & Ye) === Se) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Xe, n.flags |= Gf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = Z;
          else {
            var l = Sr(st, _e);
            l.tag = yc, Xr(n, l, _e);
          }
        }
        n.lanes = Ue(n.lanes, _e);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function oT(e, t, n, a, r) {
    if (n.flags |= xs, Sa && qu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      lT(n), rn() && n.mode & Ye && ry();
      var l = db(t);
      if (l !== null) {
        l.flags &= ~dr, pb(l, t, n, e, r), l.mode & Ye && fb(e, i, r), iT(l, e, i);
        return;
      } else {
        if (!wS(r)) {
          fb(e, i, r), ov();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (rn() && n.mode & Ye) {
      ry();
      var s = db(t);
      if (s !== null) {
        (s.flags & _n) === Ce && (s.flags |= dr), pb(s, t, n, e, r), Np($i(a, n));
        return;
      }
    }
    a = $i(a, n), Hj(a);
    var v = t;
    do {
      switch (v.tag) {
        case x: {
          var h = a;
          v.flags |= _n;
          var R = ko(r);
          v.lanes = Ue(v.lanes, R);
          var E = cb(v, h, R);
          Ap(v, E);
          return;
        }
        case T:
          var L = a, A = v.type, z = v.stateNode;
          if ((v.flags & Xe) === Ce && (typeof A.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !dN(z))) {
            v.flags |= _n;
            var ie = ko(r);
            v.lanes = Ue(v.lanes, ie);
            var xe = jm(v, L, ie);
            Ap(v, xe);
            return;
          }
          break;
      }
      v = v.return;
    } while (v !== null);
  }
  function uT() {
    return null;
  }
  var _u = m.ReactCurrentOwner, Oa = !1, wm, Ou, _m, Om, Lm, Yi, Vm, Gc, Lu;
  wm = {}, Ou = {}, _m = {}, Om = {}, Lm = {}, Yi = !1, Vm = {}, Gc = {}, Lu = {};
  function On(e, t, n, a) {
    e === null ? t.child = hy(t, null, n, a) : t.child = kl(t, e.child, n, a);
  }
  function sT(e, t, n, a) {
    t.child = kl(t, e.child, null, a), t.child = kl(t, null, n, a);
  }
  function mb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ca(
        i,
        a,
        // Resolved props
        "prop",
        Ke(n)
      );
    }
    var l = n.render, u = t.ref, s, v;
    Fl(t, r), _o(t);
    {
      if (_u.current = t, la(!0), s = Yl(e, t, l, a, u, r), v = Il(), t.mode & Et) {
        Gt(!0);
        try {
          s = Yl(e, t, l, a, u, r), v = Il();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Oa ? (_y(e, t, r), Rr(e, t, r)) : (rn() && v && mp(t), t.flags |= pl, On(e, t, s, r), t.child);
  }
  function vb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (m1(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = ue, t.type = l, km(t, i), hb(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && Ca(
          u,
          a,
          // Resolved props
          "prop",
          Ke(i)
        ), n.defaultProps !== void 0) {
          var s = Ke(i) || "Unknown";
          Lu[s] || (c("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", s), Lu[s] = !0);
        }
      }
      var v = yv(n.type, null, a, t, t.mode, r);
      return v.ref = t.ref, v.return = t, t.child = v, v;
    }
    {
      var h = n.type, R = h.propTypes;
      R && Ca(
        R,
        a,
        // Resolved props
        "prop",
        Ke(h)
      );
    }
    var E = e.child, L = Bm(e, r);
    if (!L) {
      var A = E.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Xo, z(A, a) && e.ref === t.ref)
        return Rr(e, t, r);
    }
    t.flags |= pl;
    var ie = Ki(E, a);
    return ie.ref = t.ref, ie.return = t, t.child = ie, ie;
  }
  function hb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Ee) {
        var l = i, u = l._payload, s = l._init;
        try {
          i = s(u);
        } catch {
          i = null;
        }
        var v = i && i.propTypes;
        v && Ca(
          v,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Ke(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Xo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Oa = !1, t.pendingProps = a = h, Bm(e, r))
          (e.flags & Gf) !== Ce && (Oa = !0);
        else return t.lanes = e.lanes, Rr(e, t, r);
    }
    return Mm(e, t, n, a, r);
  }
  function gb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Qt)
      if ((t.mode & Ye) === Se) {
        var l = {
          baseLanes: I,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, of(t, n);
      } else if (Wn(n, Gn)) {
        var R = {
          baseLanes: I,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = R;
        var E = i !== null ? i.baseLanes : n;
        of(t, E);
      } else {
        var u = null, s;
        if (i !== null) {
          var v = i.baseLanes;
          s = Ue(v, n);
        } else
          s = n;
        t.lanes = t.childLanes = Gn;
        var h = {
          baseLanes: s,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = h, t.updateQueue = null, of(t, s), null;
      }
    else {
      var L;
      i !== null ? (L = Ue(i.baseLanes, n), t.memoizedState = null) : L = n, of(t, L);
    }
    return On(e, t, r, n), t.child;
  }
  function cT(e, t, n) {
    var a = t.pendingProps;
    return On(e, t, a, n), t.child;
  }
  function fT(e, t, n) {
    var a = t.pendingProps.children;
    return On(e, t, a, n), t.child;
  }
  function dT(e, t, n) {
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
  function yb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Si, t.flags |= Wf);
  }
  function Mm(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ca(
        i,
        a,
        // Resolved props
        "prop",
        Ke(n)
      );
    }
    var l;
    {
      var u = Ol(t, n, !0);
      l = Ll(t, u);
    }
    var s, v;
    Fl(t, r), _o(t);
    {
      if (_u.current = t, la(!0), s = Yl(e, t, n, a, l, r), v = Il(), t.mode & Et) {
        Gt(!0);
        try {
          s = Yl(e, t, n, a, l, r), v = Il();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Oa ? (_y(e, t, r), Rr(e, t, r)) : (rn() && v && mp(t), t.flags |= pl, On(e, t, s, r), t.child);
  }
  function bb(e, t, n, a, r) {
    {
      switch (w1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), s = u.state;
          i.updater.enqueueSetState(i, s, null);
          break;
        }
        case !0: {
          t.flags |= Xe, t.flags |= _n;
          var v = new Error("Simulated error coming from DevTools"), h = ko(r);
          t.lanes = Ue(t.lanes, h);
          var R = jm(t, $i(v, t), h);
          Ap(t, R);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var E = n.propTypes;
        E && Ca(
          E,
          a,
          // Resolved props
          "prop",
          Ke(n)
        );
      }
    }
    var L;
    Ga(n) ? (L = !0, ic(t)) : L = !1, Fl(t, r);
    var A = t.stateNode, z;
    A === null ? (Kc(e, t), ub(t, n, a), Cm(t, n, a, r), z = !0) : e === null ? z = tT(t, n, a, r) : z = nT(e, t, n, a, r);
    var ie = Am(e, t, n, z, L, r);
    {
      var xe = t.stateNode;
      z && xe.props !== a && (Yi || c("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ae(t) || "a component"), Yi = !0);
    }
    return ie;
  }
  function Am(e, t, n, a, r, i) {
    yb(e, t);
    var l = (t.flags & Xe) !== Ce;
    if (!a && !l)
      return r && ey(t, n, !1), Rr(e, t, i);
    var u = t.stateNode;
    _u.current = t;
    var s;
    if (l && typeof n.getDerivedStateFromError != "function")
      s = null, ab();
    else {
      _o(t);
      {
        if (la(!0), s = u.render(), t.mode & Et) {
          Gt(!0);
          try {
            u.render();
          } finally {
            Gt(!1);
          }
        }
        la(!1);
      }
      gl();
    }
    return t.flags |= pl, e !== null && l ? sT(e, t, s, i) : On(e, t, s, i), t.memoizedState = u.state, r && ey(t, n, !0), t.child;
  }
  function Nb(e) {
    var t = e.stateNode;
    t.pendingContext ? Jg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Jg(e, t.context, !1), kp(e, t.containerInfo);
  }
  function pT(e, t, n) {
    if (Nb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Sy(e, t), Ec(t, a, null, n);
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
      }, v = t.updateQueue;
      if (v.baseState = s, t.memoizedState = s, t.flags & dr) {
        var h = $i(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return xb(e, t, u, n, h);
      } else if (u !== i) {
        var R = $i(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return xb(e, t, u, n, R);
      } else {
        hD(t);
        var E = hy(t, null, u, n);
        t.child = E;
        for (var L = E; L; )
          L.flags = L.flags & ~wt | pr, L = L.sibling;
      }
    } else {
      if (Al(), u === i)
        return Rr(e, t, n);
      On(e, t, u, n);
    }
    return t.child;
  }
  function xb(e, t, n, a, r) {
    return Al(), Np(r), t.flags |= dr, On(e, t, n, a), t.child;
  }
  function mT(e, t, n) {
    Ty(t), e === null && bp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = ep(a, r);
    return u ? l = null : i !== null && ep(a, i) && (t.flags |= jo), yb(e, t), On(e, t, l, n), t.child;
  }
  function vT(e, t) {
    return e === null && bp(t), null;
  }
  function hT(e, t, n, a) {
    Kc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, s = u(l);
    t.type = s;
    var v = t.tag = v1(s), h = _a(s, r), R;
    switch (v) {
      case C:
        return km(t, s), t.type = s = Zl(s), R = Mm(null, t, s, h, a), R;
      case T:
        return t.type = s = dv(s), R = bb(null, t, s, h, a), R;
      case $:
        return t.type = s = pv(s), R = mb(null, t, s, h, a), R;
      case ge: {
        if (t.type !== t.elementType) {
          var E = s.propTypes;
          E && Ca(
            E,
            h,
            // Resolved for outer only
            "prop",
            Ke(s)
          );
        }
        return R = vb(
          null,
          t,
          s,
          _a(s.type, h),
          // The inner type can have defaults too
          a
        ), R;
      }
    }
    var L = "";
    throw s !== null && typeof s == "object" && s.$$typeof === Ee && (L = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + s + ". " + ("Lazy element type must resolve to a class or function." + L));
  }
  function gT(e, t, n, a, r) {
    Kc(e, t), t.tag = T;
    var i;
    return Ga(n) ? (i = !0, ic(t)) : i = !1, Fl(t, r), ub(t, n, a), Cm(t, n, a, r), Am(null, t, n, !0, i, r);
  }
  function yT(e, t, n, a) {
    Kc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ol(t, n, !1);
      i = Ll(t, l);
    }
    Fl(t, a);
    var u, s;
    _o(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var v = Ke(n) || "Unknown";
        wm[v] || (c("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", v, v), wm[v] = !0);
      }
      t.mode & Et && Ta.recordLegacyContextWarning(t, null), la(!0), _u.current = t, u = Yl(null, t, n, r, i, a), s = Il(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var h = Ke(n) || "Unknown";
      Ou[h] || (c("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), Ou[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var R = Ke(n) || "Unknown";
        Ou[R] || (c("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", R, R, R), Ou[R] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var E = !1;
      return Ga(n) ? (E = !0, ic(t)) : E = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, Mp(t), ob(t, u), Cm(t, n, r, a), Am(null, t, n, !0, E, a);
    } else {
      if (t.tag = C, t.mode & Et) {
        Gt(!0);
        try {
          u = Yl(null, t, n, r, i, a), s = Il();
        } finally {
          Gt(!1);
        }
      }
      return rn() && s && mp(t), On(null, t, u, a), km(t, n), t.child;
    }
  }
  function km(e, t) {
    {
      if (t && t.childContextTypes && c("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Lm[r] || (Lm[r] = !0, c("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Ke(t) || "Unknown";
        Lu[l] || (c("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Lu[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = Ke(t) || "Unknown";
        Om[u] || (c("%s: Function components do not support getDerivedStateFromProps.", u), Om[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var s = Ke(t) || "Unknown";
        _m[s] || (c("%s: Function components do not support contextType.", s), _m[s] = !0);
      }
    }
  }
  var Um = {
    dehydrated: null,
    treeContext: null,
    retryLane: Wt
  };
  function Fm(e) {
    return {
      baseLanes: e,
      cachePool: uT(),
      transitions: null
    };
  }
  function bT(e, t) {
    var n = null;
    return {
      baseLanes: Ue(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function NT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return zp(e, xu);
  }
  function xT(e, t) {
    return js(e.childLanes, t);
  }
  function Eb(e, t, n) {
    var a = t.pendingProps;
    _1(t) && (t.flags |= Xe);
    var r = ja.current, i = !1, l = (t.flags & Xe) !== Ce;
    if (l || NT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = zD(r, wy)), r = Hl(r), Zr(t, r), e === null) {
      bp(t);
      var u = t.memoizedState;
      if (u !== null) {
        var s = u.dehydrated;
        if (s !== null)
          return DT(t, s);
      }
      var v = a.children, h = a.fallback;
      if (i) {
        var R = ET(t, v, h, n), E = t.child;
        return E.memoizedState = Fm(n), t.memoizedState = Um, R;
      } else
        return zm(t, v);
    } else {
      var L = e.memoizedState;
      if (L !== null) {
        var A = L.dehydrated;
        if (A !== null)
          return TT(e, t, l, a, A, L, n);
      }
      if (i) {
        var z = a.fallback, ie = a.children, xe = RT(e, t, ie, z, n), he = t.child, qe = e.child.memoizedState;
        return he.memoizedState = qe === null ? Fm(n) : bT(qe, n), he.childLanes = xT(e, n), t.memoizedState = Um, xe;
      } else {
        var Pe = a.children, w = ST(e, t, Pe, n);
        return t.memoizedState = null, w;
      }
    }
  }
  function zm(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Hm(r, a);
    return i.return = e, e.child = i, i;
  }
  function ET(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, s;
    return (r & Ye) === Se && i !== null ? (u = i, u.childLanes = I, u.pendingProps = l, e.mode & nt && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), s = oi(n, r, a, null)) : (u = Hm(l, r), s = oi(n, r, a, null)), u.return = e, s.return = e, u.sibling = s, e.child = u, s;
  }
  function Hm(e, t, n) {
    return SN(e, t, I, null);
  }
  function Sb(e, t) {
    return Ki(e, t);
  }
  function ST(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Sb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ye) === Se && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= Ei) : u.push(i);
    }
    return t.child = l, l;
  }
  function RT(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, s = {
      mode: "hidden",
      children: n
    }, v;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Ye) === Se && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var h = t.child;
      v = h, v.childLanes = I, v.pendingProps = s, t.mode & nt && (v.actualDuration = 0, v.actualStartTime = -1, v.selfBaseDuration = l.selfBaseDuration, v.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      v = Sb(l, s), v.subtreeFlags = l.subtreeFlags & mr;
    var R;
    return u !== null ? R = Ki(u, a) : (R = oi(a, i, r, null), R.flags |= wt), R.return = t, v.return = t, v.sibling = R, t.child = v, R;
  }
  function Wc(e, t, n, a) {
    a !== null && Np(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = zm(t, i);
    return l.flags |= wt, t.memoizedState = null, l;
  }
  function CT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Hm(l, i), s = oi(a, i, r, null);
    return s.flags |= wt, u.return = t, s.return = t, u.sibling = s, t.child = u, (t.mode & Ye) !== Se && kl(t, e.child, null, r), s;
  }
  function DT(e, t, n) {
    return (e.mode & Ye) === Se ? (c("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = _e) : rp(t) ? e.lanes = ji : e.lanes = Gn, null;
  }
  function TT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & dr) {
        t.flags &= ~dr;
        var w = Dm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Wc(e, t, l, w);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Xe, null;
        var H = a.children, _ = a.fallback, W = CT(e, t, H, _, l), ce = t.child;
        return ce.memoizedState = Fm(l), t.memoizedState = Um, W;
      }
    else {
      if (mD(), (t.mode & Ye) === Se)
        return Wc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (rp(r)) {
        var u, s, v;
        {
          var h = OC(r);
          u = h.digest, s = h.message, v = h.stack;
        }
        var R;
        s ? R = new Error(s) : R = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var E = Dm(R, u, v);
        return Wc(e, t, l, E);
      }
      var L = Wn(l, e.childLanes);
      if (Oa || L) {
        var A = lf();
        if (A !== null) {
          var z = US(A, l);
          if (z !== Wt && z !== i.retryLane) {
            i.retryLane = z;
            var ie = st;
            Pn(e, z), Pt(A, e, z, ie);
          }
        }
        ov();
        var xe = Dm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Wc(e, t, l, xe);
      } else if (qg(r)) {
        t.flags |= Xe, t.child = e.child;
        var he = Jj.bind(null, e);
        return LC(r, he), null;
      } else {
        gD(t, r, i.treeContext);
        var qe = a.children, Pe = zm(t, qe);
        return Pe.flags |= pr, Pe;
      }
    }
  }
  function Rb(e, t, n) {
    e.lanes = Ue(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ue(a.lanes, t)), _p(e.return, t, n);
  }
  function jT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === P) {
        var r = a.memoizedState;
        r !== null && Rb(a, n, e);
      } else if (a.tag === U)
        Rb(a, n, e);
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
  function wT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Dc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function _T(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Vm[e])
      if (Vm[e] = !0, typeof e == "string")
        switch (e.toLowerCase()) {
          case "together":
          case "forwards":
          case "backwards": {
            c('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
            break;
          }
          case "forward":
          case "backward": {
            c('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
            break;
          }
          default:
            c('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
            break;
        }
      else
        c('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
  }
  function OT(e, t) {
    e !== void 0 && !Gc[e] && (e !== "collapsed" && e !== "hidden" ? (Gc[e] = !0, c('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Gc[e] = !0, c('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Cb(e, t) {
    {
      var n = He(e), a = !n && typeof xa(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return c("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function LT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (He(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Cb(e[n], n))
            return;
      } else {
        var a = xa(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Cb(i.value, l))
                return;
              l++;
            }
        } else
          c('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function Pm(e, t, n, a, r) {
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
  function Db(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    _T(r), OT(i, r), LT(l, r), On(e, t, l, n);
    var u = ja.current, s = zp(u, xu);
    if (s)
      u = Hp(u, xu), t.flags |= Xe;
    else {
      var v = e !== null && (e.flags & Xe) !== Ce;
      v && jT(t, t.child, n), u = Hl(u);
    }
    if (Zr(t, u), (t.mode & Ye) === Se)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = wT(t.child), R;
          h === null ? (R = t.child, t.child = null) : (R = h.sibling, h.sibling = null), Pm(
            t,
            !1,
            // isBackwards
            R,
            h,
            i
          );
          break;
        }
        case "backwards": {
          var E = null, L = t.child;
          for (t.child = null; L !== null; ) {
            var A = L.alternate;
            if (A !== null && Dc(A) === null) {
              t.child = L;
              break;
            }
            var z = L.sibling;
            L.sibling = E, E = L, L = z;
          }
          Pm(
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
          Pm(
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
  function VT(e, t, n) {
    kp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = kl(t, null, a, n) : On(e, t, a, n), t.child;
  }
  var Tb = !1;
  function MT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || Tb || (Tb = !0, c("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var s = t.type.propTypes;
      s && Ca(s, i, "prop", "Context.Provider");
    }
    if (by(t, r, u), l !== null) {
      var v = l.value;
      if (Xn(v, u)) {
        if (l.children === i.children && !ac())
          return Rr(e, t, n);
      } else
        _D(t, r, n);
    }
    var h = i.children;
    return On(e, t, h, n), t.child;
  }
  var jb = !1;
  function AT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (jb || (jb = !0, c("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && c("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fl(t, n);
    var l = _t(a);
    _o(t);
    var u;
    return _u.current = t, la(!0), u = i(l), la(!1), gl(), t.flags |= pl, On(e, t, u, n), t.child;
  }
  function Vu() {
    Oa = !0;
  }
  function Kc(e, t) {
    (t.mode & Ye) === Se && e !== null && (e.alternate = null, t.alternate = null, t.flags |= wt);
  }
  function Rr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), ab(), Iu(t.lanes), Wn(n, t.childLanes) ? (jD(e, t), t.child) : null;
  }
  function kT(e, t, n) {
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
  function Bm(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function UT(e, t, n) {
    switch (t.tag) {
      case x:
        Nb(t), t.stateNode, Al();
        break;
      case k:
        Ty(t);
        break;
      case T: {
        var a = t.type;
        Ga(a) && ic(t);
        break;
      }
      case j:
        kp(t, t.stateNode.containerInfo);
        break;
      case Y: {
        var r = t.memoizedProps.value, i = t.type._context;
        by(t, i, r);
        break;
      }
      case q:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= Qe);
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
            return Zr(t, Hl(ja.current)), t.flags |= Xe, null;
          var v = t.child, h = v.childLanes;
          if (Wn(n, h))
            return Eb(e, t, n);
          Zr(t, Hl(ja.current));
          var R = Rr(e, t, n);
          return R !== null ? R.sibling : null;
        } else
          Zr(t, Hl(ja.current));
        break;
      }
      case U: {
        var E = (e.flags & Xe) !== Ce, L = Wn(n, t.childLanes);
        if (E) {
          if (L)
            return Db(e, t, n);
          t.flags |= Xe;
        }
        var A = t.memoizedState;
        if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Zr(t, ja.current), L)
          break;
        return null;
      }
      case ee:
      case Te:
        return t.lanes = I, gb(e, t, n);
    }
    return Rr(e, t, n);
  }
  function wb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return kT(e, t, yv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || ac() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        Oa = !0;
      else {
        var i = Bm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Xe) === Ce)
          return Oa = !1, UT(e, t, n);
        (e.flags & Gf) !== Ce ? Oa = !0 : Oa = !1;
      }
    } else if (Oa = !1, rn() && uD(t)) {
      var l = t.index, u = sD();
      ay(t, u, l);
    }
    switch (t.lanes = I, t.tag) {
      case V:
        return yT(e, t, t.type, n);
      case X: {
        var s = t.elementType;
        return hT(e, t, s, n);
      }
      case C: {
        var v = t.type, h = t.pendingProps, R = t.elementType === v ? h : _a(v, h);
        return Mm(e, t, v, R, n);
      }
      case T: {
        var E = t.type, L = t.pendingProps, A = t.elementType === E ? L : _a(E, L);
        return bb(e, t, E, A, n);
      }
      case x:
        return pT(e, t, n);
      case k:
        return mT(e, t, n);
      case K:
        return vT(e, t);
      case P:
        return Eb(e, t, n);
      case j:
        return VT(e, t, n);
      case $: {
        var z = t.type, ie = t.pendingProps, xe = t.elementType === z ? ie : _a(z, ie);
        return mb(e, t, z, xe, n);
      }
      case pe:
        return cT(e, t, n);
      case ne:
        return fT(e, t, n);
      case q:
        return dT(e, t, n);
      case Y:
        return MT(e, t, n);
      case ve:
        return AT(e, t, n);
      case ge: {
        var he = t.type, qe = t.pendingProps, Pe = _a(he, qe);
        if (t.type !== t.elementType) {
          var w = he.propTypes;
          w && Ca(
            w,
            Pe,
            // Resolved for outer only
            "prop",
            Ke(he)
          );
        }
        return Pe = _a(he.type, Pe), vb(e, t, he, Pe, n);
      }
      case ue:
        return hb(e, t, t.type, t.pendingProps, n);
      case Z: {
        var H = t.type, _ = t.pendingProps, W = t.elementType === H ? _ : _a(H, _);
        return gT(e, t, H, W, n);
      }
      case U:
        return Db(e, t, n);
      case fe:
        break;
      case ee:
        return gb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= Qe;
  }
  function _b(e) {
    e.flags |= Si, e.flags |= Wf;
  }
  var Ob, $m, Lb, Vb;
  Ob = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === k || r.tag === K)
        iC(e, r.stateNode);
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
  }, $m = function(e, t) {
  }, Lb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = Up(), s = oC(l, n, i, a, r, u);
      t.updateQueue = s, s && ql(t);
    }
  }, Vb = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Mu(e, t) {
    if (!rn())
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
  function on(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = I, a = Ce;
    if (t) {
      if ((e.mode & nt) !== Se) {
        for (var s = e.selfBaseDuration, v = e.child; v !== null; )
          n = Ue(n, Ue(v.lanes, v.childLanes)), a |= v.subtreeFlags & mr, a |= v.flags & mr, s += v.treeBaseDuration, v = v.sibling;
        e.treeBaseDuration = s;
      } else
        for (var h = e.child; h !== null; )
          n = Ue(n, Ue(h.lanes, h.childLanes)), a |= h.subtreeFlags & mr, a |= h.flags & mr, h.return = e, h = h.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & nt) !== Se) {
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
  function FT(e, t, n) {
    if (ED() && (t.mode & Ye) !== Se && (t.flags & Xe) === Ce)
      return cy(t), Al(), t.flags |= dr | xs | _n, !1;
    var a = cc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (ND(t), on(t), (t.mode & nt) !== Se) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Al(), (t.flags & Xe) === Ce && (t.memoizedState = null), t.flags |= Qe, on(t), (t.mode & nt) !== Se) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return fy(), !0;
  }
  function Mb(e, t, n) {
    var a = t.pendingProps;
    switch (vp(t), t.tag) {
      case V:
      case X:
      case ue:
      case C:
      case $:
      case pe:
      case ne:
      case q:
      case ve:
      case ge:
        return on(t), null;
      case T: {
        var r = t.type;
        return Ga(r) && rc(t), on(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (zl(t), fp(t), Bp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = cc(t);
          if (l)
            ql(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & dr) !== Ce) && (t.flags |= ml, fy());
          }
        }
        return $m(e, t), on(t), null;
      }
      case k: {
        Fp(t);
        var s = Dy(), v = t.type;
        if (e !== null && t.stateNode != null)
          Lb(e, t, v, a, s), e.ref !== t.ref && _b(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return on(t), null;
          }
          var h = Up(), R = cc(t);
          if (R)
            yD(t, s, h) && ql(t);
          else {
            var E = rC(v, a, s, h, t);
            Ob(E, t, !1, !1), t.stateNode = E, lC(E, v, a, s) && ql(t);
          }
          t.ref !== null && _b(t);
        }
        return on(t), null;
      }
      case K: {
        var L = a;
        if (e && t.stateNode != null) {
          var A = e.memoizedProps;
          Vb(e, t, A, L);
        } else {
          if (typeof L != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = Dy(), ie = Up(), xe = cc(t);
          xe ? bD(t) && ql(t) : t.stateNode = uC(L, z, ie, t);
        }
        return on(t), null;
      }
      case P: {
        Pl(t);
        var he = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = FT(e, t, he);
          if (!qe)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Xe) !== Ce)
          return t.lanes = n, (t.mode & nt) !== Se && pm(t), t;
        var Pe = he !== null, w = e !== null && e.memoizedState !== null;
        if (Pe !== w && Pe) {
          var H = t.child;
          if (H.flags |= Ri, (t.mode & Ye) !== Se) {
            var _ = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            _ || zp(ja.current, wy) ? zj() : ov();
          }
        }
        var W = t.updateQueue;
        if (W !== null && (t.flags |= Qe), on(t), (t.mode & nt) !== Se && Pe) {
          var ce = t.child;
          ce !== null && (t.treeBaseDuration -= ce.treeBaseDuration);
        }
        return null;
      }
      case j:
        return zl(t), $m(e, t), e === null && tD(t.stateNode.containerInfo), on(t), null;
      case Y:
        var le = t.type._context;
        return wp(le, t), on(t), null;
      case Z: {
        var De = t.type;
        return Ga(De) && rc(t), on(t), null;
      }
      case U: {
        Pl(t);
        var Me = t.memoizedState;
        if (Me === null)
          return on(t), null;
        var rt = (t.flags & Xe) !== Ce, Ge = Me.rendering;
        if (Ge === null)
          if (rt)
            Mu(Me, !1);
          else {
            var Rt = Pj() && (e === null || (e.flags & Xe) === Ce);
            if (!Rt)
              for (var We = t.child; We !== null; ) {
                var St = Dc(We);
                if (St !== null) {
                  rt = !0, t.flags |= Xe, Mu(Me, !1);
                  var xn = St.updateQueue;
                  return xn !== null && (t.updateQueue = xn, t.flags |= Qe), t.subtreeFlags = Ce, wD(t, n), Zr(t, Hp(ja.current, xu)), t.child;
                }
                We = We.sibling;
              }
            Me.tail !== null && qt() > tN() && (t.flags |= Xe, rt = !0, Mu(Me, !1), t.lanes = Vh);
          }
        else {
          if (!rt) {
            var dn = Dc(Ge);
            if (dn !== null) {
              t.flags |= Xe, rt = !0;
              var ea = dn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Qe), Mu(Me, !0), Me.tail === null && Me.tailMode === "hidden" && !Ge.alternate && !rn())
                return on(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Me.renderingStartTime > tN() && n !== Gn && (t.flags |= Xe, rt = !0, Mu(Me, !1), t.lanes = Vh);
          }
          if (Me.isBackwards)
            Ge.sibling = t.child, t.child = Ge;
          else {
            var Mn = Me.last;
            Mn !== null ? Mn.sibling = Ge : t.child = Ge, Me.last = Ge;
          }
        }
        if (Me.tail !== null) {
          var An = Me.tail;
          Me.rendering = An, Me.tail = An.sibling, Me.renderingStartTime = qt(), An.sibling = null;
          var En = ja.current;
          return rt ? En = Hp(En, xu) : En = Hl(En), Zr(t, En), An;
        }
        return on(t), null;
      }
      case fe:
        break;
      case ee:
      case Te: {
        lv(t);
        var wr = t.memoizedState, eo = wr !== null;
        if (e !== null) {
          var Qu = e.memoizedState, tr = Qu !== null;
          tr !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Qt && (t.flags |= Ri);
        }
        return !eo || (t.mode & Ye) === Se ? on(t) : Wn(er, Gn) && (on(t), t.subtreeFlags & (wt | Qe) && (t.flags |= Ri)), null;
      }
      case je:
        return null;
      case Le:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function zT(e, t, n) {
    switch (vp(t), t.tag) {
      case T: {
        var a = t.type;
        Ga(a) && rc(t);
        var r = t.flags;
        return r & _n ? (t.flags = r & ~_n | Xe, (t.mode & nt) !== Se && pm(t), t) : null;
      }
      case x: {
        t.stateNode, zl(t), fp(t), Bp();
        var i = t.flags;
        return (i & _n) !== Ce && (i & Xe) === Ce ? (t.flags = i & ~_n | Xe, t) : null;
      }
      case k:
        return Fp(t), null;
      case P: {
        Pl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Al();
        }
        var u = t.flags;
        return u & _n ? (t.flags = u & ~_n | Xe, (t.mode & nt) !== Se && pm(t), t) : null;
      }
      case U:
        return Pl(t), null;
      case j:
        return zl(t), null;
      case Y:
        var s = t.type._context;
        return wp(s, t), null;
      case ee:
      case Te:
        return lv(t), null;
      case je:
        return null;
      default:
        return null;
    }
  }
  function Ab(e, t, n) {
    switch (vp(t), t.tag) {
      case T: {
        var a = t.type.childContextTypes;
        a != null && rc(t);
        break;
      }
      case x: {
        t.stateNode, zl(t), fp(t), Bp();
        break;
      }
      case k: {
        Fp(t);
        break;
      }
      case j:
        zl(t);
        break;
      case P:
        Pl(t);
        break;
      case U:
        Pl(t);
        break;
      case Y:
        var r = t.type._context;
        wp(r, t);
        break;
      case ee:
      case Te:
        lv(t);
        break;
    }
  }
  var kb = null;
  kb = /* @__PURE__ */ new Set();
  var Qc = !1, un = !1, HT = typeof WeakSet == "function" ? WeakSet : Set, de = null, Gl = null, Wl = null;
  function PT(e) {
    Yf(null, function() {
      throw e;
    }), If();
  }
  var BT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nt)
      try {
        Ja(), t.componentWillUnmount();
      } finally {
        Xa(e);
      }
    else
      t.componentWillUnmount();
  };
  function Ub(e, t) {
    try {
      ni(At, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Ym(e, t, n) {
    try {
      BT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function $T(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      lt(e, t, a);
    }
  }
  function Fb(e, t) {
    try {
      Hb(e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Kl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (Xt && va && e.mode & nt)
            try {
              Ja(), a = n(null);
            } finally {
              Xa(e);
            }
          else
            a = n(null);
        } catch (r) {
          lt(e, t, r);
        }
        typeof a == "function" && c("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ae(e));
      } else
        n.current = null;
  }
  function Xc(e, t, n) {
    try {
      n();
    } catch (a) {
      lt(e, t, a);
    }
  }
  var zb = !1;
  function YT(e, t) {
    nC(e.containerInfo), de = t, IT();
    var n = zb;
    return zb = !1, n;
  }
  function IT() {
    for (; de !== null; ) {
      var e = de, t = e.child;
      (e.subtreeFlags & Xf) !== Ce && t !== null ? (t.return = e, de = t) : qT();
    }
  }
  function qT() {
    for (; de !== null; ) {
      var e = de;
      mt(e);
      try {
        GT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      It();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, de = t;
        return;
      }
      de = e.return;
    }
  }
  function GT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== Ce) {
      switch (mt(e), e.tag) {
        case C:
        case $:
        case ue:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Yi && (i.props !== e.memoizedProps && c("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ae(e) || "instance"), i.state !== e.memoizedState && c("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ae(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : _a(e.type, a), r);
            {
              var u = kb;
              l === void 0 && !u.has(e.type) && (u.add(e.type), c("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ae(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case x: {
          {
            var s = e.stateNode;
            TC(s.containerInfo);
          }
          break;
        }
        case k:
        case K:
        case j:
        case Z:
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
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & ln) !== Bn ? uS(t) : (e & At) !== Bn && jh(t), (e & Wa) !== Bn && Gu(!0), Xc(t, n, u), (e & Wa) !== Bn && Gu(!1), (e & ln) !== Bn ? sS() : (e & At) !== Bn && wh());
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
          (e & ln) !== Bn ? lS(t) : (e & At) !== Bn && cS(t);
          var l = i.create;
          (e & Wa) !== Bn && Gu(!0), i.destroy = l(), (e & Wa) !== Bn && Gu(!1), (e & ln) !== Bn ? oS() : (e & At) !== Bn && fS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var s = void 0;
              (i.tag & At) !== Ce ? s = "useLayoutEffect" : (i.tag & Wa) !== Ce ? s = "useInsertionEffect" : s = "useEffect";
              var v = void 0;
              u === null ? v = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof u.then == "function" ? v = `

It looks like you wrote ` + s + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + s + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : v = " You returned: " + u, c("%s must not return anything besides a function, which is used for clean-up.%s", s, v);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function WT(e, t) {
    if ((t.flags & Qe) !== Ce)
      switch (t.tag) {
        case q: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = tb(), u = t.alternate === null ? "mount" : "update";
          eb() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var s = t.return;
          e: for (; s !== null; ) {
            switch (s.tag) {
              case x:
                var v = s.stateNode;
                v.passiveEffectDuration += n;
                break e;
              case q:
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
  function KT(e, t, n, a) {
    if ((n.flags & wo) !== Ce)
      switch (n.tag) {
        case C:
        case $:
        case ue: {
          if (!un)
            if (n.mode & nt)
              try {
                Ja(), ni(At | Mt, n);
              } finally {
                Xa(n);
              }
            else
              ni(At | Mt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Qe && !un)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && c("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ae(n) || "instance"), r.state !== n.memoizedState && c("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ae(n) || "instance")), n.mode & nt)
                try {
                  Ja(), r.componentDidMount();
                } finally {
                  Xa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : _a(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && c("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ae(n) || "instance"), r.state !== n.memoizedState && c("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ae(n) || "instance")), n.mode & nt)
                try {
                  Ja(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Xa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && c("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ae(n) || "instance"), r.state !== n.memoizedState && c("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ae(n) || "instance")), Cy(n, u, r));
          break;
        }
        case x: {
          var s = n.updateQueue;
          if (s !== null) {
            var v = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case k:
                  v = n.child.stateNode;
                  break;
                case T:
                  v = n.child.stateNode;
                  break;
              }
            Cy(n, s, v);
          }
          break;
        }
        case k: {
          var h = n.stateNode;
          if (t === null && n.flags & Qe) {
            var R = n.type, E = n.memoizedProps;
            pC(h, R, E);
          }
          break;
        }
        case K:
          break;
        case j:
          break;
        case q: {
          {
            var L = n.memoizedProps, A = L.onCommit, z = L.onRender, ie = n.stateNode.effectDuration, xe = tb(), he = t === null ? "mount" : "update";
            eb() && (he = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, he, n.actualDuration, n.treeBaseDuration, n.actualStartTime, xe);
            {
              typeof A == "function" && A(n.memoizedProps.id, he, ie, xe), qj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case x:
                    var Pe = qe.stateNode;
                    Pe.effectDuration += ie;
                    break e;
                  case q:
                    var w = qe.stateNode;
                    w.effectDuration += ie;
                    break e;
                }
                qe = qe.return;
              }
            }
          }
          break;
        }
        case P: {
          aj(e, n);
          break;
        }
        case U:
        case Z:
        case fe:
        case ee:
        case Te:
        case Le:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    un || n.flags & Si && Hb(n);
  }
  function QT(e) {
    switch (e.tag) {
      case C:
      case $:
      case ue: {
        if (e.mode & nt)
          try {
            Ja(), Ub(e, e.return);
          } finally {
            Xa(e);
          }
        else
          Ub(e, e.return);
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && $T(e, e.return, t), Fb(e, e.return);
        break;
      }
      case k: {
        Fb(e, e.return);
        break;
      }
    }
  }
  function XT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === k) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? SC(r) : CC(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === K) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? RC(i) : DC(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === ee || a.tag === Te) && a.memoizedState !== null && a !== e)) {
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
  function Hb(e) {
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
        if (e.mode & nt)
          try {
            Ja(), r = t(a);
          } finally {
            Xa(e);
          }
        else
          r = t(a);
        typeof r == "function" && c("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ae(e));
      } else
        t.hasOwnProperty("current") || c("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ae(e)), t.current = a;
    }
  }
  function JT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Pb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Pb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === k) {
        var n = e.stateNode;
        n !== null && rD(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function ZT(e) {
    for (var t = e.return; t !== null; ) {
      if (Bb(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Bb(e) {
    return e.tag === k || e.tag === x || e.tag === j;
  }
  function $b(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Bb(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== K && t.tag !== Q; ) {
        if (t.flags & wt || t.child === null || t.tag === j)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & wt))
        return t.stateNode;
    }
  }
  function ej(e) {
    var t = ZT(e);
    switch (t.tag) {
      case k: {
        var n = t.stateNode;
        t.flags & jo && (Ig(n), t.flags &= ~jo);
        var a = $b(e);
        qm(e, a, n);
        break;
      }
      case x:
      case j: {
        var r = t.stateNode.containerInfo, i = $b(e);
        Im(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Im(e, t, n) {
    var a = e.tag, r = a === k || a === K;
    if (r) {
      var i = e.stateNode;
      t ? bC(n, i, t) : gC(n, i);
    } else if (a !== j) {
      var l = e.child;
      if (l !== null) {
        Im(l, t, n);
        for (var u = l.sibling; u !== null; )
          Im(u, t, n), u = u.sibling;
      }
    }
  }
  function qm(e, t, n) {
    var a = e.tag, r = a === k || a === K;
    if (r) {
      var i = e.stateNode;
      t ? yC(n, i, t) : hC(n, i);
    } else if (a !== j) {
      var l = e.child;
      if (l !== null) {
        qm(l, t, n);
        for (var u = l.sibling; u !== null; )
          qm(u, t, n), u = u.sibling;
      }
    }
  }
  var sn = null, Va = !1;
  function tj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case k: {
            sn = a.stateNode, Va = !1;
            break e;
          }
          case x: {
            sn = a.stateNode.containerInfo, Va = !0;
            break e;
          }
          case j: {
            sn = a.stateNode.containerInfo, Va = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (sn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Yb(e, t, n), sn = null, Va = !1;
    }
    JT(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Yb(e, t, a), a = a.sibling;
  }
  function Yb(e, t, n) {
    switch (nS(n), n.tag) {
      case k:
        un || Kl(n, t);
      case K: {
        {
          var a = sn, r = Va;
          sn = null, ai(e, t, n), sn = a, Va = r, sn !== null && (Va ? xC(sn, n.stateNode) : NC(sn, n.stateNode));
        }
        return;
      }
      case Q: {
        sn !== null && (Va ? EC(sn, n.stateNode) : ap(sn, n.stateNode));
        return;
      }
      case j: {
        {
          var i = sn, l = Va;
          sn = n.stateNode.containerInfo, Va = !0, ai(e, t, n), sn = i, Va = l;
        }
        return;
      }
      case C:
      case $:
      case ge:
      case ue: {
        if (!un) {
          var u = n.updateQueue;
          if (u !== null) {
            var s = u.lastEffect;
            if (s !== null) {
              var v = s.next, h = v;
              do {
                var R = h, E = R.destroy, L = R.tag;
                E !== void 0 && ((L & Wa) !== Bn ? Xc(n, t, E) : (L & At) !== Bn && (jh(n), n.mode & nt ? (Ja(), Xc(n, t, E), Xa(n)) : Xc(n, t, E), wh())), h = h.next;
              } while (h !== v);
            }
          }
        }
        ai(e, t, n);
        return;
      }
      case T: {
        if (!un) {
          Kl(n, t);
          var A = n.stateNode;
          typeof A.componentWillUnmount == "function" && Ym(n, t, A);
        }
        ai(e, t, n);
        return;
      }
      case fe: {
        ai(e, t, n);
        return;
      }
      case ee: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ye
        ) {
          var z = un;
          un = z || n.memoizedState !== null, ai(e, t, n), un = z;
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
  function nj(e) {
    e.memoizedState;
  }
  function aj(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && PC(i);
        }
      }
    }
  }
  function Ib(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new HT()), t.forEach(function(a) {
        var r = Zj.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), Sa)
            if (Gl !== null && Wl !== null)
              qu(Wl, Gl);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function rj(e, t, n) {
    Gl = n, Wl = e, mt(t), qb(t, e), mt(t), Gl = null, Wl = null;
  }
  function Ma(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          tj(e, t, i);
        } catch (s) {
          lt(i, t, s);
        }
      }
    var l = cs();
    if (t.subtreeFlags & Jf)
      for (var u = t.child; u !== null; )
        mt(u), qb(u, e), u = u.sibling;
    mt(l);
  }
  function qb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case C:
      case $:
      case ge:
      case ue: {
        if (Ma(t, e), Za(e), r & Qe) {
          try {
            La(Wa | Mt, e, e.return), ni(Wa | Mt, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Ja(), La(At | Mt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Xa(e);
          } else
            try {
              La(At | Mt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case T: {
        Ma(t, e), Za(e), r & Si && a !== null && Kl(a, a.return);
        return;
      }
      case k: {
        Ma(t, e), Za(e), r & Si && a !== null && Kl(a, a.return);
        {
          if (e.flags & jo) {
            var i = e.stateNode;
            try {
              Ig(i);
            } catch (De) {
              lt(e, e.return, De);
            }
          }
          if (r & Qe) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, s = a !== null ? a.memoizedProps : u, v = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  mC(l, h, v, s, u, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case K: {
        if (Ma(t, e), Za(e), r & Qe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var R = e.stateNode, E = e.memoizedProps, L = a !== null ? a.memoizedProps : E;
          try {
            vC(R, L, E);
          } catch (De) {
            lt(e, e.return, De);
          }
        }
        return;
      }
      case x: {
        if (Ma(t, e), Za(e), r & Qe && a !== null) {
          var A = a.memoizedState;
          if (A.isDehydrated)
            try {
              HC(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case j: {
        Ma(t, e), Za(e);
        return;
      }
      case P: {
        Ma(t, e), Za(e);
        var z = e.child;
        if (z.flags & Ri) {
          var ie = z.stateNode, xe = z.memoizedState, he = xe !== null;
          if (ie.isHidden = he, he) {
            var qe = z.alternate !== null && z.alternate.memoizedState !== null;
            qe || Fj();
          }
        }
        if (r & Qe) {
          try {
            nj(e);
          } catch (De) {
            lt(e, e.return, De);
          }
          Ib(e);
        }
        return;
      }
      case ee: {
        var Pe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ye
        ) {
          var w = un;
          un = w || Pe, Ma(t, e), un = w;
        } else
          Ma(t, e);
        if (Za(e), r & Ri) {
          var H = e.stateNode, _ = e.memoizedState, W = _ !== null, ce = e;
          if (H.isHidden = W, W && !Pe && (ce.mode & Ye) !== Se) {
            de = ce;
            for (var le = ce.child; le !== null; )
              de = le, lj(le), le = le.sibling;
          }
          XT(ce, W);
        }
        return;
      }
      case U: {
        Ma(t, e), Za(e), r & Qe && Ib(e);
        return;
      }
      case fe:
        return;
      default: {
        Ma(t, e), Za(e);
        return;
      }
    }
  }
  function Za(e) {
    var t = e.flags;
    if (t & wt) {
      try {
        ej(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~wt;
    }
    t & pr && (e.flags &= ~pr);
  }
  function ij(e, t, n) {
    Gl = n, Wl = t, de = e, Gb(e, t, n), Gl = null, Wl = null;
  }
  function Gb(e, t, n) {
    for (var a = (e.mode & Ye) !== Se; de !== null; ) {
      var r = de, i = r.child;
      if (r.tag === ee && a) {
        var l = r.memoizedState !== null, u = l || Qc;
        if (u) {
          Gm(e, t, n);
          continue;
        } else {
          var s = r.alternate, v = s !== null && s.memoizedState !== null, h = v || un, R = Qc, E = un;
          Qc = u, un = h, un && !E && (de = r, oj(r));
          for (var L = i; L !== null; )
            de = L, Gb(
              L,
              // New root; bubble back up to here and stop.
              t,
              n
            ), L = L.sibling;
          de = r, Qc = R, un = E, Gm(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & wo) !== Ce && i !== null ? (i.return = r, de = i) : Gm(e, t, n);
    }
  }
  function Gm(e, t, n) {
    for (; de !== null; ) {
      var a = de;
      if ((a.flags & wo) !== Ce) {
        var r = a.alternate;
        mt(a);
        try {
          KT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
        }
        It();
      }
      if (a === e) {
        de = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, de = i;
        return;
      }
      de = a.return;
    }
  }
  function lj(e) {
    for (; de !== null; ) {
      var t = de, n = t.child;
      switch (t.tag) {
        case C:
        case $:
        case ge:
        case ue: {
          if (t.mode & nt)
            try {
              Ja(), La(At, t, t.return);
            } finally {
              Xa(t);
            }
          else
            La(At, t, t.return);
          break;
        }
        case T: {
          Kl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Ym(t, t.return, a);
          break;
        }
        case k: {
          Kl(t, t.return);
          break;
        }
        case ee: {
          var r = t.memoizedState !== null;
          if (r) {
            Wb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, de = n) : Wb(e);
    }
  }
  function Wb(e) {
    for (; de !== null; ) {
      var t = de;
      if (t === e) {
        de = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, de = n;
        return;
      }
      de = t.return;
    }
  }
  function oj(e) {
    for (; de !== null; ) {
      var t = de, n = t.child;
      if (t.tag === ee) {
        var a = t.memoizedState !== null;
        if (a) {
          Kb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, de = n) : Kb(e);
    }
  }
  function Kb(e) {
    for (; de !== null; ) {
      var t = de;
      mt(t);
      try {
        QT(t);
      } catch (a) {
        lt(t, t.return, a);
      }
      if (It(), t === e) {
        de = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, de = n;
        return;
      }
      de = t.return;
    }
  }
  function uj(e, t, n, a) {
    de = t, sj(t, e, n, a);
  }
  function sj(e, t, n, a) {
    for (; de !== null; ) {
      var r = de, i = r.child;
      (r.subtreeFlags & vl) !== Ce && i !== null ? (i.return = r, de = i) : cj(e, t, n, a);
    }
  }
  function cj(e, t, n, a) {
    for (; de !== null; ) {
      var r = de;
      if ((r.flags & Fr) !== Ce) {
        mt(r);
        try {
          fj(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
        }
        It();
      }
      if (r === e) {
        de = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, de = i;
        return;
      }
      de = r.return;
    }
  }
  function fj(e, t, n, a) {
    switch (t.tag) {
      case C:
      case $:
      case ue: {
        if (t.mode & nt) {
          dm();
          try {
            ni(ln | Mt, t);
          } finally {
            fm(t);
          }
        } else
          ni(ln | Mt, t);
        break;
      }
    }
  }
  function dj(e) {
    de = e, pj();
  }
  function pj() {
    for (; de !== null; ) {
      var e = de, t = e.child;
      if ((de.flags & Ei) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            de = r, hj(r, e);
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
          de = e;
        }
      }
      (e.subtreeFlags & vl) !== Ce && t !== null ? (t.return = e, de = t) : mj();
    }
  }
  function mj() {
    for (; de !== null; ) {
      var e = de;
      (e.flags & Fr) !== Ce && (mt(e), vj(e), It());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, de = t;
        return;
      }
      de = e.return;
    }
  }
  function vj(e) {
    switch (e.tag) {
      case C:
      case $:
      case ue: {
        e.mode & nt ? (dm(), La(ln | Mt, e, e.return), fm(e)) : La(ln | Mt, e, e.return);
        break;
      }
    }
  }
  function hj(e, t) {
    for (; de !== null; ) {
      var n = de;
      mt(n), yj(n, t), It();
      var a = n.child;
      a !== null ? (a.return = n, de = a) : gj(e);
    }
  }
  function gj(e) {
    for (; de !== null; ) {
      var t = de, n = t.sibling, a = t.return;
      if (Pb(t), t === e) {
        de = null;
        return;
      }
      if (n !== null) {
        n.return = a, de = n;
        return;
      }
      de = a;
    }
  }
  function yj(e, t) {
    switch (e.tag) {
      case C:
      case $:
      case ue: {
        e.mode & nt ? (dm(), La(ln, e, t), fm(e)) : La(ln, e, t);
        break;
      }
    }
  }
  function bj(e) {
    switch (e.tag) {
      case C:
      case $:
      case ue: {
        try {
          ni(At | Mt, e);
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
  function Nj(e) {
    switch (e.tag) {
      case C:
      case $:
      case ue: {
        try {
          ni(ln | Mt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function xj(e) {
    switch (e.tag) {
      case C:
      case $:
      case ue: {
        try {
          La(At | Mt, e, e.return);
        } catch (n) {
          lt(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Ym(e, e.return, t);
        break;
      }
    }
  }
  function Ej(e) {
    switch (e.tag) {
      case C:
      case $:
      case ue:
        try {
          La(ln | Mt, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Au = Symbol.for;
    Au("selector.component"), Au("selector.has_pseudo_class"), Au("selector.role"), Au("selector.test_id"), Au("selector.text");
  }
  var Sj = [];
  function Rj() {
    Sj.forEach(function(e) {
      return e();
    });
  }
  var Cj = m.ReactCurrentActQueue;
  function Dj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Qb() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && Cj.current !== null && c("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var Tj = Math.ceil, Wm = m.ReactCurrentDispatcher, Km = m.ReactCurrentOwner, cn = m.ReactCurrentBatchConfig, Aa = m.ReactCurrentActQueue, Ft = (
    /*             */
    0
  ), Xb = (
    /*               */
    1
  ), fn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), Cr = 0, ku = 1, Ii = 2, Jc = 3, Uu = 4, Jb = 5, Qm = 6, Ie = Ft, Ln = null, bt = null, zt = I, er = I, Xm = Gr(I), Ht = Cr, Fu = null, Zc = I, zu = I, ef = I, Hu = null, $n = null, Jm = 0, Zb = 500, eN = 1 / 0, jj = 500, Dr = null;
  function Pu() {
    eN = qt() + jj;
  }
  function tN() {
    return eN;
  }
  var tf = !1, Zm = null, Ql = null, qi = !1, ri = null, Bu = I, ev = [], tv = null, wj = 50, $u = 0, nv = null, av = !1, nf = !1, _j = 50, Xl = 0, af = null, Yu = st, rf = I, nN = !1;
  function lf() {
    return Ln;
  }
  function Vn() {
    return (Ie & (fn | da)) !== Ft ? qt() : (Yu !== st || (Yu = qt()), Yu);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ye) === Se)
      return _e;
    if ((Ie & fn) !== Ft && zt !== I)
      return ko(zt);
    var n = CD() !== RD;
    if (n) {
      if (cn.transition !== null) {
        var a = cn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return rf === Wt && (rf = Uh()), rf;
    }
    var r = Ra();
    if (r !== Wt)
      return r;
    var i = sC();
    return i;
  }
  function Oj(e) {
    var t = e.mode;
    return (t & Ye) === Se ? _e : VS();
  }
  function Pt(e, t, n, a) {
    t1(), nN && c("useInsertionEffect must not schedule updates."), av && (nf = !0), Uo(e, n, a), (Ie & fn) !== I && e === Ln ? r1(t) : (Sa && Hh(e, t, n), i1(t), e === Ln && ((Ie & fn) === Ft && (zu = Ue(zu, n)), Ht === Uu && li(e, zt)), Yn(e, a), n === _e && Ie === Ft && (t.mode & Ye) === Se && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Aa.isBatchingLegacy && (Pu(), ny()));
  }
  function Lj(e, t, n) {
    var a = e.current;
    a.lanes = t, Uo(e, t, n), Yn(e, n);
  }
  function Vj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & fn) !== Ft
    );
  }
  function Yn(e, t) {
    var n = e.callbackNode;
    TS(e, t);
    var a = Ds(e, e === Ln ? zt : I);
    if (a === I) {
      n !== null && yN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = _i(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Aa.current !== null && n !== cv)) {
      n == null && i !== _e && c("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && yN(n);
    var l;
    if (r === _e)
      e.tag === Wr ? (Aa.isBatchingLegacy !== null && (Aa.didScheduleLegacyUpdate = !0), oD(iN.bind(null, e))) : ty(iN.bind(null, e)), Aa.current !== null ? Aa.current.push(Kr) : fC(function() {
        (Ie & (fn | da)) === Ft && Kr();
      }), l = null;
    else {
      var u;
      switch ($h(a)) {
        case Kn:
          u = Es;
          break;
        case hr:
          u = Zf;
          break;
        case gr:
          u = Ti;
          break;
        case ws:
          u = ed;
          break;
        default:
          u = Ti;
          break;
      }
      l = fv(u, aN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function aN(e, t) {
    if (XD(), Yu = st, rf = I, (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = jr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Ds(e, e === Ln ? zt : I);
    if (r === I)
      return null;
    var i = !Ts(e, r) && !LS(e, r) && !t, l = i ? $j(e, r) : uf(e, r);
    if (l !== Cr) {
      if (l === Ii) {
        var u = Ed(e);
        u !== I && (r = u, l = rv(e, u));
      }
      if (l === ku) {
        var s = Fu;
        throw Gi(e, I), li(e, r), Yn(e, qt()), s;
      }
      if (l === Qm)
        li(e, r);
      else {
        var v = !Ts(e, r), h = e.current.alternate;
        if (v && !Aj(h)) {
          if (l = uf(e, r), l === Ii) {
            var R = Ed(e);
            R !== I && (r = R, l = rv(e, R));
          }
          if (l === ku) {
            var E = Fu;
            throw Gi(e, I), li(e, r), Yn(e, qt()), E;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Mj(e, l, r);
      }
    }
    return Yn(e, qt()), e.callbackNode === n ? aN.bind(null, e) : null;
  }
  function rv(e, t) {
    var n = Hu;
    if (_s(e)) {
      var a = Gi(e, t);
      a.flags |= dr, eD(e.containerInfo);
    }
    var r = uf(e, t);
    if (r !== Ii) {
      var i = $n;
      $n = n, i !== null && rN(i);
    }
    return r;
  }
  function rN(e) {
    $n === null ? $n = e : $n.push.apply($n, e);
  }
  function Mj(e, t, n) {
    switch (t) {
      case Cr:
      case ku:
        throw new Error("Root did not complete. This is a bug in React.");
      case Ii: {
        Wi(e, $n, Dr);
        break;
      }
      case Jc: {
        if (li(e, n), Ah(n) && // do not delay if we're inside an act() scope
        !bN()) {
          var a = Jm + Zb - qt();
          if (a > 10) {
            var r = Ds(e, I);
            if (r !== I)
              break;
            var i = e.suspendedLanes;
            if (!xl(i, n)) {
              Vn(), zh(e, i);
              break;
            }
            e.timeoutHandle = tp(Wi.bind(null, e, $n, Dr), a);
            break;
          }
        }
        Wi(e, $n, Dr);
        break;
      }
      case Uu: {
        if (li(e, n), OS(n))
          break;
        if (!bN()) {
          var l = CS(e, n), u = l, s = qt() - u, v = e1(s) - s;
          if (v > 10) {
            e.timeoutHandle = tp(Wi.bind(null, e, $n, Dr), v);
            break;
          }
        }
        Wi(e, $n, Dr);
        break;
      }
      case Jb: {
        Wi(e, $n, Dr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function Aj(e) {
    for (var t = e; ; ) {
      if (t.flags & qf) {
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
      if (t.subtreeFlags & qf && s !== null) {
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
  function li(e, t) {
    t = js(t, ef), t = js(t, zu), AS(e, t);
  }
  function iN(e) {
    if (JD(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    jr();
    var t = Ds(e, I);
    if (!Wn(t, _e))
      return Yn(e, qt()), null;
    var n = uf(e, t);
    if (e.tag !== Wr && n === Ii) {
      var a = Ed(e);
      a !== I && (t = a, n = rv(e, a));
    }
    if (n === ku) {
      var r = Fu;
      throw Gi(e, I), li(e, t), Yn(e, qt()), r;
    }
    if (n === Qm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Wi(e, $n, Dr), Yn(e, qt()), null;
  }
  function kj(e, t) {
    t !== I && (Dd(e, Ue(t, _e)), Yn(e, qt()), (Ie & (fn | da)) === Ft && (Pu(), Kr()));
  }
  function iv(e, t) {
    var n = Ie;
    Ie |= Xb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === Ft && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Aa.isBatchingLegacy && (Pu(), ny());
    }
  }
  function Uj(e, t, n, a, r) {
    var i = Ra(), l = cn.transition;
    try {
      return cn.transition = null, Kt(Kn), e(t, n, a, r);
    } finally {
      Kt(i), cn.transition = l, Ie === Ft && Pu();
    }
  }
  function Tr(e) {
    ri !== null && ri.tag === Wr && (Ie & (fn | da)) === Ft && jr();
    var t = Ie;
    Ie |= Xb;
    var n = cn.transition, a = Ra();
    try {
      return cn.transition = null, Kt(Kn), e ? e() : void 0;
    } finally {
      Kt(a), cn.transition = n, Ie = t, (Ie & (fn | da)) === Ft && Kr();
    }
  }
  function lN() {
    return (Ie & (fn | da)) !== Ft;
  }
  function of(e, t) {
    bn(Xm, er, e), er = Ue(er, t);
  }
  function lv(e) {
    er = Xm.current, yn(Xm, e);
  }
  function Gi(e, t) {
    e.finishedWork = null, e.finishedLanes = I;
    var n = e.timeoutHandle;
    if (n !== np && (e.timeoutHandle = np, cC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        Ab(r, a), a = a.return;
      }
    Ln = e;
    var i = Ki(e.current, null);
    return bt = i, zt = er = t, Ht = Cr, Fu = null, Zc = I, zu = I, ef = I, Hu = null, $n = null, LD(), Ta.discardPendingWarnings(), i;
  }
  function oN(e, t) {
    do {
      var n = bt;
      try {
        if (hc(), Oy(), It(), Km.current = null, n === null || n.return === null) {
          Ht = ku, Fu = t, bt = null;
          return;
        }
        if (Xt && n.mode & nt && Ic(n, !0), In)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            pS(n, a, zt);
          } else
            dS(n, t, zt);
        oT(e, n.return, n, t, zt), fN(n);
      } catch (r) {
        t = r, bt === n && n !== null ? (n = n.return, bt = n) : n = bt;
        continue;
      }
      return;
    } while (!0);
  }
  function uN() {
    var e = Wm.current;
    return Wm.current = Hc, e === null ? Hc : e;
  }
  function sN(e) {
    Wm.current = e;
  }
  function Fj() {
    Jm = qt();
  }
  function Iu(e) {
    Zc = Ue(e, Zc);
  }
  function zj() {
    Ht === Cr && (Ht = Jc);
  }
  function ov() {
    (Ht === Cr || Ht === Jc || Ht === Ii) && (Ht = Uu), Ln !== null && (Sd(Zc) || Sd(zu)) && li(Ln, zt);
  }
  function Hj(e) {
    Ht !== Uu && (Ht = Ii), Hu === null ? Hu = [e] : Hu.push(e);
  }
  function Pj() {
    return Ht === Cr;
  }
  function uf(e, t) {
    var n = Ie;
    Ie |= fn;
    var a = uN();
    if (Ln !== e || zt !== t) {
      if (Sa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (qu(e, zt), r.clear()), Ph(e, t);
      }
      Dr = Bh(), Gi(e, t);
    }
    _h(t);
    do
      try {
        Bj();
        break;
      } catch (i) {
        oN(e, i);
      }
    while (!0);
    if (hc(), Ie = n, sN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Oh(), Ln = null, zt = I, Ht;
  }
  function Bj() {
    for (; bt !== null; )
      cN(bt);
  }
  function $j(e, t) {
    var n = Ie;
    Ie |= fn;
    var a = uN();
    if (Ln !== e || zt !== t) {
      if (Sa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (qu(e, zt), r.clear()), Ph(e, t);
      }
      Dr = Bh(), Pu(), Gi(e, t);
    }
    _h(t);
    do
      try {
        Yj();
        break;
      } catch (i) {
        oN(e, i);
      }
    while (!0);
    return hc(), sN(a), Ie = n, bt !== null ? (yS(), Cr) : (Oh(), Ln = null, zt = I, Ht);
  }
  function Yj() {
    for (; bt !== null && !qE(); )
      cN(bt);
  }
  function cN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== Se ? (cm(e), n = uv(t, e, er), Ic(e, !0)) : n = uv(t, e, er), It(), e.memoizedProps = e.pendingProps, n === null ? fN(e) : bt = n, Km.current = null;
  }
  function fN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & xs) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === Se ? r = Mb(n, t, er) : (cm(t), r = Mb(n, t, er), Ic(t, !1)), It(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = zT(n, t);
        if (i !== null) {
          i.flags &= HE, bt = i;
          return;
        }
        if ((t.mode & nt) !== Se) {
          Ic(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= xs, a.subtreeFlags = Ce, a.deletions = null;
        else {
          Ht = Qm, bt = null;
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
    Ht === Cr && (Ht = Jb);
  }
  function Wi(e, t, n) {
    var a = Ra(), r = cn.transition;
    try {
      cn.transition = null, Kt(Kn), Ij(e, t, n, a);
    } finally {
      cn.transition = r, Kt(a);
    }
    return null;
  }
  function Ij(e, t, n, a) {
    do
      jr();
    while (ri !== null);
    if (n1(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (iS(i), r === null)
      return Th(), null;
    if (i === I && c("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = I, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = Ue(r.lanes, r.childLanes);
    kS(e, l), e === Ln && (Ln = null, bt = null, zt = I), ((r.subtreeFlags & vl) !== Ce || (r.flags & vl) !== Ce) && (qi || (qi = !0, tv = n, fv(Ti, function() {
      return jr(), null;
    })));
    var u = (r.subtreeFlags & (Xf | Jf | wo | vl)) !== Ce, s = (r.flags & (Xf | Jf | wo | vl)) !== Ce;
    if (u || s) {
      var v = cn.transition;
      cn.transition = null;
      var h = Ra();
      Kt(Kn);
      var R = Ie;
      Ie |= da, Km.current = null, YT(e, r), nb(), rj(e, r, i), aC(e.containerInfo), e.current = r, mS(i), ij(r, e, i), vS(), GE(), Ie = R, Kt(h), cn.transition = v;
    } else
      e.current = r, nb();
    var E = qi;
    if (qi ? (qi = !1, ri = e, Bu = i) : (Xl = 0, af = null), l = e.pendingLanes, l === I && (Ql = null), E || vN(e.current, !1), eS(r.stateNode, a), Sa && e.memoizedUpdaters.clear(), Rj(), Yn(e, qt()), t !== null)
      for (var L = e.onRecoverableError, A = 0; A < t.length; A++) {
        var z = t[A], ie = z.stack, xe = z.digest;
        L(z.value, {
          componentStack: ie,
          digest: xe
        });
      }
    if (tf) {
      tf = !1;
      var he = Zm;
      throw Zm = null, he;
    }
    return Wn(Bu, _e) && e.tag !== Wr && jr(), l = e.pendingLanes, Wn(l, _e) ? (QD(), e === nv ? $u++ : ($u = 0, nv = e)) : $u = 0, Kr(), Th(), null;
  }
  function jr() {
    if (ri !== null) {
      var e = $h(Bu), t = HS(gr, e), n = cn.transition, a = Ra();
      try {
        return cn.transition = null, Kt(t), Gj();
      } finally {
        Kt(a), cn.transition = n;
      }
    }
    return !1;
  }
  function qj(e) {
    ev.push(e), qi || (qi = !0, fv(Ti, function() {
      return jr(), null;
    }));
  }
  function Gj() {
    if (ri === null)
      return !1;
    var e = tv;
    tv = null;
    var t = ri, n = Bu;
    if (ri = null, Bu = I, (Ie & (fn | da)) !== Ft)
      throw new Error("Cannot flush passive effects while already rendering.");
    av = !0, nf = !1, hS(n);
    var a = Ie;
    Ie |= da, dj(t.current), uj(t, t.current, n, e);
    {
      var r = ev;
      ev = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        WT(t, l);
      }
    }
    gS(), vN(t.current, !0), Ie = a, Kr(), nf ? t === af ? Xl++ : (Xl = 0, af = t) : Xl = 0, av = !1, nf = !1, tS(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function dN(e) {
    return Ql !== null && Ql.has(e);
  }
  function Wj(e) {
    Ql === null ? Ql = /* @__PURE__ */ new Set([e]) : Ql.add(e);
  }
  function Kj(e) {
    tf || (tf = !0, Zm = e);
  }
  var Qj = Kj;
  function pN(e, t, n) {
    var a = $i(n, t), r = cb(e, a, _e), i = Xr(e, r, _e), l = Vn();
    i !== null && (Uo(i, _e, l), Yn(i, l));
  }
  function lt(e, t, n) {
    if (PT(n), Gu(!1), e.tag === x) {
      pN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        pN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !dN(i)) {
          var l = $i(n, e), u = jm(a, l, _e), s = Xr(a, u, _e), v = Vn();
          s !== null && (Uo(s, _e, v), Yn(s, v));
          return;
        }
      }
      a = a.return;
    }
    c(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Xj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Vn();
    zh(e, n), l1(e), Ln === e && xl(zt, n) && (Ht === Uu || Ht === Jc && Ah(zt) && qt() - Jm < Zb ? Gi(e, I) : ef = Ue(ef, n)), Yn(e, r);
  }
  function mN(e, t) {
    t === Wt && (t = Oj(e));
    var n = Vn(), a = Pn(e, t);
    a !== null && (Uo(a, t, n), Yn(a, n));
  }
  function Jj(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), mN(e, n);
  }
  function Zj(e, t) {
    var n = Wt, a;
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
    a !== null && a.delete(t), mN(e, n);
  }
  function e1(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Tj(e / 1960) * 1960;
  }
  function t1() {
    if ($u > wj)
      throw $u = 0, nv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > _j && (Xl = 0, af = null, c("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function n1() {
    Ta.flushLegacyContextWarning(), Ta.flushPendingUnsafeLifecycleWarnings();
  }
  function vN(e, t) {
    mt(e), sf(e, zr, xj), t && sf(e, Qf, Ej), sf(e, zr, bj), t && sf(e, Qf, Nj), It();
  }
  function sf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ce ? a = a.child : ((a.flags & t) !== Ce && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cf = null;
  function hN(e) {
    {
      if ((Ie & fn) !== Ft || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== V && t !== x && t !== T && t !== C && t !== $ && t !== ge && t !== ue)
        return;
      var n = Ae(e) || "ReactComponent";
      if (cf !== null) {
        if (cf.has(n))
          return;
        cf.add(n);
      } else
        cf = /* @__PURE__ */ new Set([n]);
      var a = Tn;
      try {
        mt(e), c("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : It();
      }
    }
  }
  var uv;
  {
    var a1 = null;
    uv = function(e, t, n) {
      var a = RN(a1, t);
      try {
        return wb(e, t, n);
      } catch (i) {
        if (vD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (hc(), Oy(), Ab(e, t), RN(t, a), t.mode & nt && cm(t), Yf(null, wb, null, e, t, n), UE()) {
          var r = If();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var gN = !1, sv;
  sv = /* @__PURE__ */ new Set();
  function r1(e) {
    if (yi && !GD())
      switch (e.tag) {
        case C:
        case $:
        case ue: {
          var t = bt && Ae(bt) || "Unknown", n = t;
          if (!sv.has(n)) {
            sv.add(n);
            var a = Ae(e) || "Unknown";
            c("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          gN || (c("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), gN = !0);
          break;
        }
      }
  }
  function qu(e, t) {
    if (Sa) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Hh(e, a, t);
      });
    }
  }
  var cv = {};
  function fv(e, t) {
    {
      var n = Aa.current;
      return n !== null ? (n.push(t), cv) : Dh(e, t);
    }
  }
  function yN(e) {
    if (e !== cv)
      return IE(e);
  }
  function bN() {
    return Aa.current !== null;
  }
  function i1(e) {
    {
      if (e.mode & Ye) {
        if (!Qb())
          return;
      } else if (!Dj() || Ie !== Ft || e.tag !== C && e.tag !== $ && e.tag !== ue)
        return;
      if (Aa.current === null) {
        var t = Tn;
        try {
          mt(e), c(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ae(e));
        } finally {
          t ? mt(e) : It();
        }
      }
    }
  }
  function l1(e) {
    e.tag !== Wr && Qb() && Aa.current === null && c(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Gu(e) {
    nN = e;
  }
  var pa = null, Jl = null, o1 = function(e) {
    pa = e;
  };
  function Zl(e) {
    {
      if (pa === null)
        return e;
      var t = pa(e);
      return t === void 0 ? e : t.current;
    }
  }
  function dv(e) {
    return Zl(e);
  }
  function pv(e) {
    {
      if (pa === null)
        return e;
      var t = pa(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Zl(e.render);
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
  function NN(e, t) {
    {
      if (pa === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case T: {
          typeof a == "function" && (r = !0);
          break;
        }
        case C: {
          (typeof a == "function" || i === Ee) && (r = !0);
          break;
        }
        case $: {
          (i === Ne || i === Ee) && (r = !0);
          break;
        }
        case ge:
        case ue: {
          (i === ke || i === Ee) && (r = !0);
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
  function xN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Jl === null && (Jl = /* @__PURE__ */ new WeakSet()), Jl.add(e);
    }
  }
  var u1 = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      jr(), Tr(function() {
        mv(e.current, a, n);
      });
    }
  }, s1 = function(e, t) {
    {
      if (e.context !== Jn)
        return;
      jr(), Tr(function() {
        Wu(t, e, null, null);
      });
    }
  };
  function mv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, u = e.type, s = null;
      switch (l) {
        case C:
        case ue:
        case T:
          s = u;
          break;
        case $:
          s = u.render;
          break;
      }
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var v = !1, h = !1;
      if (s !== null) {
        var R = pa(s);
        R !== void 0 && (n.has(R) ? h = !0 : t.has(R) && (l === T ? h = !0 : v = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || v) {
        var E = Pn(e, _e);
        E !== null && Pt(E, e, _e, st);
      }
      r !== null && !h && mv(r, t, n), i !== null && mv(i, t, n);
    }
  }
  var c1 = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return vv(e.current, a, n), n;
    }
  };
  function vv(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, u = null;
      switch (i) {
        case C:
        case ue:
        case T:
          u = l;
          break;
        case $:
          u = l.render;
          break;
      }
      var s = !1;
      u !== null && t.has(u) && (s = !0), s ? f1(e, n) : a !== null && vv(a, t, n), r !== null && vv(r, t, n);
    }
  }
  function f1(e, t) {
    {
      var n = d1(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case k:
            t.add(a.stateNode);
            return;
          case j:
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
  function d1(e, t) {
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
  var hv;
  {
    hv = !1;
    try {
      var EN = Object.preventExtensions({});
    } catch {
      hv = !0;
    }
  }
  function p1(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = I, this.childLanes = I, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !hv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Zn = function(e, t, n, a) {
    return new p1(e, t, n, a);
  };
  function gv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function m1(e) {
    return typeof e == "function" && !gv(e) && e.defaultProps === void 0;
  }
  function v1(e) {
    if (typeof e == "function")
      return gv(e) ? T : C;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return $;
      if (t === ke)
        return ge;
    }
    return V;
  }
  function Ki(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & mr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case V:
      case C:
      case ue:
        n.type = Zl(e.type);
        break;
      case T:
        n.type = dv(e.type);
        break;
      case $:
        n.type = pv(e.type);
        break;
    }
    return n;
  }
  function h1(e, t) {
    e.flags &= mr | wt;
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
  function g1(e, t, n) {
    var a;
    return e === lc ? (a = Ye, t === !0 && (a |= Et, a |= Ya)) : a = Se, Sa && (a |= nt), Zn(x, null, null, a);
  }
  function yv(e, t, n, a, r, i) {
    var l = V, u = e;
    if (typeof e == "function")
      gv(e) ? (l = T, u = dv(u)) : u = Zl(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case Ha:
          return oi(n.children, r, i, t);
        case di:
          l = ne, r |= Et, (r & Ye) !== Se && (r |= Ya);
          break;
        case N:
          return y1(n, r, i, t);
        case Be:
          return b1(n, r, i, t);
        case we:
          return N1(n, r, i, t);
        case dt:
          return SN(n, r, i, t);
        case hn:
        case Lt:
        case Pa:
        case Na:
        case ft:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case G:
                l = Y;
                break e;
              case re:
                l = ve;
                break e;
              case Ne:
                l = $, u = pv(u);
                break e;
              case ke:
                l = ge;
                break e;
              case Ee:
                l = X, u = null;
                break e;
            }
          var s = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var v = a ? Ae(a) : null;
            v && (s += `

Check the render method of \`` + v + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + s));
        }
      }
    var h = Zn(l, n, t, r);
    return h.elementType = e, h.type = u, h.lanes = i, h._debugOwner = a, h;
  }
  function bv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = yv(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function oi(e, t, n, a) {
    var r = Zn(pe, e, a, t);
    return r.lanes = n, r;
  }
  function y1(e, t, n, a) {
    typeof e.id != "string" && c('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(q, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function b1(e, t, n, a) {
    var r = Zn(P, e, a, t);
    return r.elementType = Be, r.lanes = n, r;
  }
  function N1(e, t, n, a) {
    var r = Zn(U, e, a, t);
    return r.elementType = we, r.lanes = n, r;
  }
  function SN(e, t, n, a) {
    var r = Zn(ee, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Nv(e, t, n) {
    var a = Zn(K, e, null, t);
    return a.lanes = n, a;
  }
  function x1() {
    var e = Zn(k, null, null, Se);
    return e.elementType = "DELETED", e;
  }
  function E1(e) {
    var t = Zn(Q, null, null, Se);
    return t.stateNode = e, t;
  }
  function xv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(j, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function RN(e, t) {
    return e === null && (e = Zn(V, null, null, Se)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function S1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = np, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Wt, this.eventTimes = Cd(I), this.expirationTimes = Cd(st), this.pendingLanes = I, this.suspendedLanes = I, this.pingedLanes = I, this.expiredLanes = I, this.mutableReadLanes = I, this.finishedLanes = I, this.entangledLanes = I, this.entanglements = Cd(I), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < nd; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case lc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Wr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function CN(e, t, n, a, r, i, l, u, s, v) {
    var h = new S1(e, t, n, u, s), R = g1(t, i);
    h.current = R, R.stateNode = h;
    {
      var E = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      R.memoizedState = E;
    }
    return Mp(R), h;
  }
  var Ev = "18.3.1";
  function R1(e, t, n) {
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
  var Sv, Rv;
  Sv = !1, Rv = {};
  function DN(e) {
    if (!e)
      return Jn;
    var t = dl(e), n = lD(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ga(a))
        return Zg(t, a, n);
    }
    return n;
  }
  function C1(e, t) {
    {
      var n = dl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Sh(n);
      if (r === null)
        return null;
      if (r.mode & Et) {
        var i = Ae(n) || "Component";
        if (!Rv[i]) {
          Rv[i] = !0;
          var l = Tn;
          try {
            mt(r), n.mode & Et ? c("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : c("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? mt(l) : It();
          }
        }
      }
      return r.stateNode;
    }
  }
  function TN(e, t, n, a, r, i, l, u) {
    var s = !1, v = null;
    return CN(e, t, s, v, n, a, r, i, l);
  }
  function jN(e, t, n, a, r, i, l, u, s, v) {
    var h = !0, R = CN(n, a, h, e, r, i, l, u, s);
    R.context = DN(null);
    var E = R.current, L = Vn(), A = ii(E), z = Sr(L, A);
    return z.callback = t ?? null, Xr(E, z, A), Lj(R, A, L), R;
  }
  function Wu(e, t, n, a) {
    ZE(t, e);
    var r = t.current, i = Vn(), l = ii(r);
    bS(l);
    var u = DN(n);
    t.context === null ? t.context = u : t.pendingContext = u, yi && Tn !== null && !Sv && (Sv = !0, c(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ae(Tn) || "Unknown"));
    var s = Sr(i, l);
    s.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && c("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), s.callback = a);
    var v = Xr(r, s, l);
    return v !== null && (Pt(v, r, l, i), xc(v, r, l)), l;
  }
  function ff(e) {
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
  function D1(e) {
    switch (e.tag) {
      case x: {
        var t = e.stateNode;
        if (_s(t)) {
          var n = jS(t);
          kj(t, n);
        }
        break;
      }
      case P: {
        Tr(function() {
          var r = Pn(e, _e);
          if (r !== null) {
            var i = Vn();
            Pt(r, e, _e, i);
          }
        });
        var a = _e;
        Cv(e, a);
        break;
      }
    }
  }
  function wN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = MS(n.retryLane, t));
  }
  function Cv(e, t) {
    wN(e, t);
    var n = e.alternate;
    n && wN(n, t);
  }
  function T1(e) {
    if (e.tag === P) {
      var t = Vo, n = Pn(e, t);
      if (n !== null) {
        var a = Vn();
        Pt(n, e, t, a);
      }
      Cv(e, t);
    }
  }
  function j1(e) {
    if (e.tag === P) {
      var t = ii(e), n = Pn(e, t);
      if (n !== null) {
        var a = Vn();
        Pt(n, e, t, a);
      }
      Cv(e, t);
    }
  }
  function _N(e) {
    var t = YE(e);
    return t === null ? null : t.stateNode;
  }
  var ON = function(e) {
    return null;
  };
  function w1(e) {
    return ON(e);
  }
  var LN = function(e) {
    return !1;
  };
  function _1(e) {
    return LN(e);
  }
  var VN = null, MN = null, AN = null, kN = null, UN = null, FN = null, zN = null, HN = null, PN = null;
  {
    var BN = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : ze({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = BN(e[a], t, n + 1), r);
    }, $N = function(e, t) {
      return BN(e, t, 0);
    }, YN = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : ze({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], He(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = YN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, IN = function(e, t, n) {
      if (t.length !== n.length) {
        S("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            S("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return YN(e, t, n, 0);
    }, qN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : ze({}, e);
      return i[r] = qN(e[r], t, n + 1, a), i;
    }, GN = function(e, t, n) {
      return qN(e, t, 0, n);
    }, Dv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    VN = function(e, t, n, a) {
      var r = Dv(e, t);
      if (r !== null) {
        var i = GN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, _e);
        l !== null && Pt(l, e, _e, st);
      }
    }, MN = function(e, t, n) {
      var a = Dv(e, t);
      if (a !== null) {
        var r = $N(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Pn(e, _e);
        i !== null && Pt(i, e, _e, st);
      }
    }, AN = function(e, t, n, a) {
      var r = Dv(e, t);
      if (r !== null) {
        var i = IN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, _e);
        l !== null && Pt(l, e, _e, st);
      }
    }, kN = function(e, t, n) {
      e.pendingProps = GN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, _e);
      a !== null && Pt(a, e, _e, st);
    }, UN = function(e, t) {
      e.pendingProps = $N(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Pn(e, _e);
      n !== null && Pt(n, e, _e, st);
    }, FN = function(e, t, n) {
      e.pendingProps = IN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, _e);
      a !== null && Pt(a, e, _e, st);
    }, zN = function(e) {
      var t = Pn(e, _e);
      t !== null && Pt(t, e, _e, st);
    }, HN = function(e) {
      ON = e;
    }, PN = function(e) {
      LN = e;
    };
  }
  function O1(e) {
    var t = Sh(e);
    return t === null ? null : t.stateNode;
  }
  function L1(e) {
    return null;
  }
  function V1() {
    return Tn;
  }
  function M1(e) {
    var t = e.findFiberByHostInstance, n = m.ReactCurrentDispatcher;
    return JE({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: VN,
      overrideHookStateDeletePath: MN,
      overrideHookStateRenamePath: AN,
      overrideProps: kN,
      overridePropsDeletePath: UN,
      overridePropsRenamePath: FN,
      setErrorHandler: HN,
      setSuspenseHandler: PN,
      scheduleUpdate: zN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: O1,
      findFiberByHostInstance: t || L1,
      // React Refresh
      findHostInstancesForRefresh: c1,
      scheduleRefresh: u1,
      scheduleRoot: s1,
      setRefreshHandler: o1,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: V1,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: Ev
    });
  }
  var WN = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Tv(e) {
    this._internalRoot = e;
  }
  df.prototype.render = Tv.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? c("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : pf(arguments[1]) ? c("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && c("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== jt) {
        var a = _N(t.current);
        a && a.parentNode !== n && c("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Wu(e, t, null, null);
  }, df.prototype.unmount = Tv.prototype.unmount = function() {
    typeof arguments[0] == "function" && c("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      lN() && c("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Tr(function() {
        Wu(null, e, null, null);
      }), Wg(t);
    }
  };
  function A1(e, t) {
    if (!pf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    KN(e);
    var n = !1, a = !1, r = "", i = WN;
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && c(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = TN(e, lc, null, n, a, r, i);
    Zs(l.current, e);
    var u = e.nodeType === jt ? e.parentNode : e;
    return eu(u), new Tv(l);
  }
  function df(e) {
    this._internalRoot = e;
  }
  function k1(e) {
    e && XS(e);
  }
  df.prototype.unstable_scheduleHydration = k1;
  function U1(e, t, n) {
    if (!pf(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    KN(e), t === void 0 && c("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", s = WN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError));
    var v = jN(t, null, e, lc, a, i, l, u, s);
    if (Zs(v.current, e), eu(e), r)
      for (var h = 0; h < r.length; h++) {
        var R = r[h];
        PD(v, R);
      }
    return new df(v);
  }
  function pf(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === fr || e.nodeType === Vf));
  }
  function Ku(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === fr || e.nodeType === Vf || e.nodeType === jt && e.nodeValue === " react-mount-point-unstable "));
  }
  function KN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && c("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fu(e) && (e._reactRootContainer ? c("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : c("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var F1 = m.ReactCurrentOwner, QN;
  QN = function(e) {
    if (e._reactRootContainer && e.nodeType !== jt) {
      var t = _N(e._reactRootContainer.current);
      t && t.parentNode !== e && c("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = jv(e), r = !!(a && qr(a));
    r && !n && c("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && c("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function jv(e) {
    return e ? e.nodeType === fr ? e.documentElement : e.firstChild : null;
  }
  function XN() {
  }
  function z1(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var E = ff(l);
          i.call(E);
        };
      }
      var l = jN(
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
        XN
      );
      e._reactRootContainer = l, Zs(l.current, e);
      var u = e.nodeType === jt ? e.parentNode : e;
      return eu(u), Tr(), l;
    } else {
      for (var s; s = e.lastChild; )
        e.removeChild(s);
      if (typeof a == "function") {
        var v = a;
        a = function() {
          var E = ff(h);
          v.call(E);
        };
      }
      var h = TN(
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
        XN
      );
      e._reactRootContainer = h, Zs(h.current, e);
      var R = e.nodeType === jt ? e.parentNode : e;
      return eu(R), Tr(function() {
        Wu(t, h, n, a);
      }), h;
    }
  }
  function H1(e, t) {
    e !== null && typeof e != "function" && c("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function mf(e, t, n, a, r) {
    QN(n), H1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = z1(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var u = r;
        r = function() {
          var s = ff(l);
          u.call(s);
        };
      }
      Wu(t, l, e, r);
    }
    return ff(l);
  }
  var JN = !1;
  function P1(e) {
    {
      JN || (JN = !0, c("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = F1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || c("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ke(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : C1(e, "findDOMNode");
  }
  function B1(e, t, n) {
    if (c("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ku(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fu(t) && t._reactRootContainer === void 0;
      a && c("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return mf(null, e, t, !0, n);
  }
  function $1(e, t, n) {
    if (c("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ku(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fu(t) && t._reactRootContainer === void 0;
      a && c("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return mf(null, e, t, !1, n);
  }
  function Y1(e, t, n, a) {
    if (c("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Ku(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !FE(e))
      throw new Error("parentComponent must be a valid React Component");
    return mf(e, t, n, !1, a);
  }
  var ZN = !1;
  function I1(e) {
    if (ZN || (ZN = !0, c("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Ku(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = fu(e) && e._reactRootContainer === void 0;
      t && c("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = jv(e), a = n && !qr(n);
        a && c("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Tr(function() {
        mf(null, null, e, !1, function() {
          e._reactRootContainer = null, Wg(e);
        });
      }), !0;
    } else {
      {
        var r = jv(e), i = !!(r && qr(r)), l = e.nodeType === zn && Ku(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && c("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  PS(D1), $S(T1), YS(j1), IS(Ra), qS(FS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && c("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), TE(G0), _E(iv, Uj, Tr);
  function q1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!pf(t))
      throw new Error("Target container is not a DOM element.");
    return R1(e, t, null, n);
  }
  function G1(e, t, n, a) {
    return Y1(e, t, n, a);
  }
  var wv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [qr, _l, ec, ch, fh, iv]
  };
  function W1(e, t) {
    return wv.usingClientEntryPoint || c('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), A1(e, t);
  }
  function K1(e, t, n) {
    return wv.usingClientEntryPoint || c('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), U1(e, t, n);
  }
  function Q1(e) {
    return lN() && c("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Tr(e);
  }
  var X1 = M1({
    findFiberByHostInstance: Mi,
    bundleType: 1,
    version: Ev,
    rendererPackageName: "react-dom"
  });
  if (!X1 && tn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var ex = window.location.protocol;
    /^(https?|file):$/.test(ex) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (ex === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wv, ta.createPortal = q1, ta.createRoot = W1, ta.findDOMNode = P1, ta.flushSync = Q1, ta.hydrate = B1, ta.hydrateRoot = K1, ta.render = $1, ta.unmountComponentAtNode = I1, ta.unstable_batchedUpdates = iv, ta.unstable_renderSubtreeIntoContainer = G1, ta.version = Ev, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
yx.exports = ta;
var lw = yx.exports, xx, tx = lw;
{
  var nx = tx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  xx = function(o, p) {
    nx.usingClientEntryPoint = !0;
    try {
      return tx.createRoot(o, p);
    } finally {
      nx.usingClientEntryPoint = !1;
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
function Xu() {
  return Xu = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var m = arguments[p];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, Xu.apply(this, arguments);
}
var ui;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(ui || (ui = {}));
const ax = "popstate";
function ow(o) {
  o === void 0 && (o = {});
  function p(g, y) {
    let {
      pathname: S,
      search: c,
      hash: O
    } = g.location;
    return Mv(
      "",
      {
        pathname: S,
        search: c,
        hash: O
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function m(g, y) {
    return typeof y == "string" ? y : Ju(y);
  }
  return sw(p, m, null, o);
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
function uw() {
  return Math.random().toString(36).substr(2, 8);
}
function rx(o, p) {
  return {
    usr: o.state,
    key: o.key,
    idx: p
  };
}
function Mv(o, p, m, g) {
  return m === void 0 && (m = null), Xu({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof p == "string" ? no(p) : p, {
    state: m,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: p && p.key || g || uw()
  });
}
function Ju(o) {
  let {
    pathname: p = "/",
    search: m = "",
    hash: g = ""
  } = o;
  return m && m !== "?" && (p += m.charAt(0) === "?" ? m : "?" + m), g && g !== "#" && (p += g.charAt(0) === "#" ? g : "#" + g), p;
}
function no(o) {
  let p = {};
  if (o) {
    let m = o.indexOf("#");
    m >= 0 && (p.hash = o.substr(m), o = o.substr(0, m));
    let g = o.indexOf("?");
    g >= 0 && (p.search = o.substr(g), o = o.substr(0, g)), o && (p.pathname = o);
  }
  return p;
}
function sw(o, p, m, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: S = !1
  } = g, c = y.history, O = ui.Pop, C = null, T = V();
  T == null && (T = 0, c.replaceState(Xu({}, c.state, {
    idx: T
  }), ""));
  function V() {
    return (c.state || {
      idx: null
    }).idx;
  }
  function x() {
    O = ui.Pop;
    let ne = V(), ve = ne == null ? null : ne - T;
    T = ne, C && C({
      action: O,
      location: pe.location,
      delta: ve
    });
  }
  function j(ne, ve) {
    O = ui.Push;
    let Y = Mv(pe.location, ne, ve);
    T = V() + 1;
    let $ = rx(Y, T), q = pe.createHref(Y);
    try {
      c.pushState($, "", q);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError")
        throw P;
      y.location.assign(q);
    }
    S && C && C({
      action: O,
      location: pe.location,
      delta: 1
    });
  }
  function k(ne, ve) {
    O = ui.Replace;
    let Y = Mv(pe.location, ne, ve);
    T = V();
    let $ = rx(Y, T), q = pe.createHref(Y);
    c.replaceState($, "", q), S && C && C({
      action: O,
      location: pe.location,
      delta: 0
    });
  }
  function K(ne) {
    let ve = y.location.origin !== "null" ? y.location.origin : y.location.href, Y = typeof ne == "string" ? ne : Ju(ne);
    return Y = Y.replace(/ $/, "%20"), ht(ve, "No window.location.(origin|href) available to create URL for href: " + Y), new URL(Y, ve);
  }
  let pe = {
    get action() {
      return O;
    },
    get location() {
      return o(y, c);
    },
    listen(ne) {
      if (C)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(ax, x), C = ne, () => {
        y.removeEventListener(ax, x), C = null;
      };
    },
    createHref(ne) {
      return p(y, ne);
    },
    createURL: K,
    encodeLocation(ne) {
      let ve = K(ne);
      return {
        pathname: ve.pathname,
        search: ve.search,
        hash: ve.hash
      };
    },
    push: j,
    replace: k,
    go(ne) {
      return c.go(ne);
    }
  };
  return pe;
}
var ix;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(ix || (ix = {}));
function cw(o, p, m) {
  return m === void 0 && (m = "/"), fw(o, p, m);
}
function fw(o, p, m, g) {
  let y = typeof p == "string" ? no(p) : p, S = si(y.pathname || "/", m);
  if (S == null)
    return null;
  let c = Ex(o);
  dw(c);
  let O = null;
  for (let C = 0; O == null && C < c.length; ++C) {
    let T = Sw(S);
    O = xw(c[C], T);
  }
  return O;
}
function Ex(o, p, m, g) {
  p === void 0 && (p = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (S, c, O) => {
    let C = {
      relativePath: O === void 0 ? S.path || "" : O,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: c,
      route: S
    };
    C.relativePath.startsWith("/") && (ht(C.relativePath.startsWith(g), 'Absolute route path "' + C.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), C.relativePath = C.relativePath.slice(g.length));
    let T = Or([g, C.relativePath]), V = m.concat(C);
    S.children && S.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), Ex(S.children, p, V, T)), !(S.path == null && !S.index) && p.push({
      path: T,
      score: bw(T, S.index),
      routesMeta: V
    });
  };
  return o.forEach((S, c) => {
    var O;
    if (S.path === "" || !((O = S.path) != null && O.includes("?")))
      y(S, c);
    else
      for (let C of Sx(S.path))
        y(S, c, C);
  }), p;
}
function Sx(o) {
  let p = o.split("/");
  if (p.length === 0) return [];
  let [m, ...g] = p, y = m.endsWith("?"), S = m.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [S, ""] : [S];
  let c = Sx(g.join("/")), O = [];
  return O.push(...c.map((C) => C === "" ? S : [S, C].join("/"))), y && O.push(...c), O.map((C) => o.startsWith("/") && C === "" ? "/" : C);
}
function dw(o) {
  o.sort((p, m) => p.score !== m.score ? m.score - p.score : Nw(p.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const pw = /^:[\w-]+$/, mw = 3, vw = 2, hw = 1, gw = 10, yw = -2, lx = (o) => o === "*";
function bw(o, p) {
  let m = o.split("/"), g = m.length;
  return m.some(lx) && (g += yw), p && (g += vw), m.filter((y) => !lx(y)).reduce((y, S) => y + (pw.test(S) ? mw : S === "" ? hw : gw), g);
}
function Nw(o, p) {
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
function xw(o, p, m) {
  let {
    routesMeta: g
  } = o, y = {}, S = "/", c = [];
  for (let O = 0; O < g.length; ++O) {
    let C = g[O], T = O === g.length - 1, V = S === "/" ? p : p.slice(S.length) || "/", x = Av({
      path: C.relativePath,
      caseSensitive: C.caseSensitive,
      end: T
    }, V), j = C.route;
    if (!x)
      return null;
    Object.assign(y, x.params), c.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Or([S, x.pathname]),
      pathnameBase: Tw(Or([S, x.pathnameBase])),
      route: j
    }), x.pathnameBase !== "/" && (S = Or([S, x.pathnameBase]));
  }
  return c;
}
function Av(o, p) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [m, g] = Ew(o.path, o.caseSensitive, o.end), y = p.match(m);
  if (!y) return null;
  let S = y[0], c = S.replace(/(.)\/+$/, "$1"), O = y.slice(1);
  return {
    params: g.reduce((T, V, x) => {
      let {
        paramName: j,
        isOptional: k
      } = V;
      if (j === "*") {
        let pe = O[x] || "";
        c = S.slice(0, S.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const K = O[x];
      return k && !K ? T[j] = void 0 : T[j] = (K || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: S,
    pathnameBase: c,
    pattern: o
  };
}
function Ew(o, p, m) {
  p === void 0 && (p = !1), m === void 0 && (m = !0), ka(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (c, O, C) => (g.push({
    paramName: O,
    isOptional: C != null
  }), C ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : m ? y += "\\/*$" : o !== "" && o !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, p ? void 0 : "i"), g];
}
function Sw(o) {
  try {
    return o.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return ka(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), o;
  }
}
function si(o, p) {
  if (p === "/") return o;
  if (!o.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let m = p.endsWith("/") ? p.length - 1 : p.length, g = o.charAt(m);
  return g && g !== "/" ? null : o.slice(m) || "/";
}
function Rw(o, p) {
  p === void 0 && (p = "/");
  let {
    pathname: m,
    search: g = "",
    hash: y = ""
  } = typeof o == "string" ? no(o) : o;
  return {
    pathname: m ? m.startsWith("/") ? m : Cw(m, p) : p,
    search: jw(g),
    hash: ww(y)
  };
}
function Cw(o, p) {
  let m = p.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? m.length > 1 && m.pop() : y !== "." && m.push(y);
  }), m.length > 1 ? m.join("/") : "/";
}
function _v(o, p, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Dw(o) {
  return o.filter((p, m) => m === 0 || p.route.path && p.route.path.length > 0);
}
function zv(o, p) {
  let m = Dw(o);
  return p ? m.map((g, y) => y === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Hv(o, p, m, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = no(o) : (y = Xu({}, o), ht(!y.pathname || !y.pathname.includes("?"), _v("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), _v("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), _v("#", "search", "hash", y)));
  let S = o === "" || y.pathname === "", c = S ? "/" : y.pathname, O;
  if (c == null)
    O = m;
  else {
    let x = p.length - 1;
    if (!g && c.startsWith("..")) {
      let j = c.split("/");
      for (; j[0] === ".."; )
        j.shift(), x -= 1;
      y.pathname = j.join("/");
    }
    O = x >= 0 ? p[x] : "/";
  }
  let C = Rw(y, O), T = c && c !== "/" && c.endsWith("/"), V = (S || c === ".") && m.endsWith("/");
  return !C.pathname.endsWith("/") && (T || V) && (C.pathname += "/"), C;
}
const Or = (o) => o.join("/").replace(/\/\/+/g, "/"), Tw = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), jw = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, ww = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function _w(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const Rx = ["post", "put", "patch", "delete"];
new Set(Rx);
const Ow = ["get", ...Rx];
new Set(Ow);
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
function Zu() {
  return Zu = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var m = arguments[p];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, Zu.apply(this, arguments);
}
const ts = /* @__PURE__ */ D.createContext(null);
ts.displayName = "DataRouter";
const Pv = /* @__PURE__ */ D.createContext(null);
Pv.displayName = "DataRouterState";
const Lw = /* @__PURE__ */ D.createContext(null);
Lw.displayName = "Await";
const ma = /* @__PURE__ */ D.createContext(null);
ma.displayName = "Navigation";
const ns = /* @__PURE__ */ D.createContext(null);
ns.displayName = "Location";
const Fa = /* @__PURE__ */ D.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Fa.displayName = "Route";
const Bv = /* @__PURE__ */ D.createContext(null);
Bv.displayName = "RouteError";
function Vw(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p;
  ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: y
  } = D.useContext(ma), {
    hash: S,
    pathname: c,
    search: O
  } = as(o, {
    relative: m
  }), C = c;
  return g !== "/" && (C = c === "/" ? g : Or([g, c])), y.createHref({
    pathname: C,
    search: O,
    hash: S
  });
}
function ao() {
  return D.useContext(ns) != null;
}
function Xi() {
  return ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), D.useContext(ns).location;
}
const Cx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Dx(o) {
  D.useContext(ma).static || D.useLayoutEffect(o);
}
function $v() {
  let {
    isDataRoute: o
  } = D.useContext(Fa);
  return o ? Ww() : Mw();
}
function Mw() {
  ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = D.useContext(ts), {
    basename: p,
    future: m,
    navigator: g
  } = D.useContext(ma), {
    matches: y
  } = D.useContext(Fa), {
    pathname: S
  } = Xi(), c = JSON.stringify(zv(y, m.v7_relativeSplatPath)), O = D.useRef(!1);
  return Dx(() => {
    O.current = !0;
  }), D.useCallback(function(T, V) {
    if (V === void 0 && (V = {}), ka(O.current, Cx), !O.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let x = Hv(T, JSON.parse(c), S, V.relative === "path");
    o == null && p !== "/" && (x.pathname = x.pathname === "/" ? p : Or([p, x.pathname])), (V.replace ? g.replace : g.push)(x, V.state, V);
  }, [p, g, c, S, o]);
}
function Aw() {
  let {
    matches: o
  } = D.useContext(Fa), p = o[o.length - 1];
  return p ? p.params : {};
}
function as(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p, {
    future: g
  } = D.useContext(ma), {
    matches: y
  } = D.useContext(Fa), {
    pathname: S
  } = Xi(), c = JSON.stringify(zv(y, g.v7_relativeSplatPath));
  return D.useMemo(() => Hv(o, JSON.parse(c), S, m === "path"), [o, c, S, m]);
}
function kw(o, p) {
  return Uw(o, p);
}
function Uw(o, p, m, g) {
  ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = D.useContext(ma), {
    matches: S
  } = D.useContext(Fa), c = S[S.length - 1], O = c ? c.params : {}, C = c ? c.pathname : "/", T = c ? c.pathnameBase : "/", V = c && c.route;
  {
    let Y = V && V.path || "";
    jx(C, !V || Y.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + C + '" (under <Route path="' + Y + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + Y + '"> to <Route ') + ('path="' + (Y === "/" ? "*" : Y + "/*") + '">.'));
  }
  let x = Xi(), j;
  if (p) {
    var k;
    let Y = typeof p == "string" ? no(p) : p;
    T === "/" || (k = Y.pathname) != null && k.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + Y.pathname + '" was given in the `location` prop.')), j = Y;
  } else
    j = x;
  let K = j.pathname || "/", pe = K;
  if (T !== "/") {
    let Y = T.replace(/^\//, "").split("/");
    pe = "/" + K.replace(/^\//, "").split("/").slice(Y.length).join("/");
  }
  let ne = cw(o, {
    pathname: pe
  });
  ka(V || ne != null, 'No routes matched location "' + j.pathname + j.search + j.hash + '" '), ka(ne == null || ne[ne.length - 1].route.element !== void 0 || ne[ne.length - 1].route.Component !== void 0 || ne[ne.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + j.pathname + j.search + j.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ve = Bw(ne && ne.map((Y) => Object.assign({}, Y, {
    params: Object.assign({}, O, Y.params),
    pathname: Or([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(Y.pathname).pathname : Y.pathname
    ]),
    pathnameBase: Y.pathnameBase === "/" ? T : Or([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(Y.pathnameBase).pathname : Y.pathnameBase
    ])
  })), S, m, g);
  return p && ve ? /* @__PURE__ */ D.createElement(ns.Provider, {
    value: {
      location: Zu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, j),
      navigationType: ui.Pop
    }
  }, ve) : ve;
}
function Fw() {
  let o = Gw(), p = _w(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, S = {
    padding: "2px 4px",
    backgroundColor: g
  }, c = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), c = /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ D.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ D.createElement("code", {
    style: S
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ D.createElement("code", {
    style: S
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ D.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), m ? /* @__PURE__ */ D.createElement("pre", {
    style: y
  }, m) : null, c);
}
const zw = /* @__PURE__ */ D.createElement(Fw, null);
class Hw extends D.Component {
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
  static getDerivedStateFromProps(p, m) {
    return m.location !== p.location || m.revalidation !== "idle" && p.revalidation === "idle" ? {
      error: p.error,
      location: p.location,
      revalidation: p.revalidation
    } : {
      error: p.error !== void 0 ? p.error : m.error,
      location: m.location,
      revalidation: p.revalidation || m.revalidation
    };
  }
  componentDidCatch(p, m) {
    console.error("React Router caught the following error during render", p, m);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ D.createElement(Fa.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ D.createElement(Bv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Pw(o) {
  let {
    routeContext: p,
    match: m,
    children: g
  } = o, y = D.useContext(ts);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ D.createElement(Fa.Provider, {
    value: p
  }, g);
}
function Bw(o, p, m, g) {
  var y;
  if (p === void 0 && (p = []), m === void 0 && (m = null), g === void 0 && (g = null), o == null) {
    var S;
    if (!m)
      return null;
    if (m.errors)
      o = m.matches;
    else if ((S = g) != null && S.v7_partialHydration && p.length === 0 && !m.initialized && m.matches.length > 0)
      o = m.matches;
    else
      return null;
  }
  let c = o, O = (y = m) == null ? void 0 : y.errors;
  if (O != null) {
    let V = c.findIndex((x) => x.route.id && (O == null ? void 0 : O[x.route.id]) !== void 0);
    V >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(O).join(",")), c = c.slice(0, Math.min(c.length, V + 1));
  }
  let C = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let V = 0; V < c.length; V++) {
      let x = c[V];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (T = V), x.route.id) {
        let {
          loaderData: j,
          errors: k
        } = m, K = x.route.loader && j[x.route.id] === void 0 && (!k || k[x.route.id] === void 0);
        if (x.route.lazy || K) {
          C = !0, T >= 0 ? c = c.slice(0, T + 1) : c = [c[0]];
          break;
        }
      }
    }
  return c.reduceRight((V, x, j) => {
    let k, K = !1, pe = null, ne = null;
    m && (k = O && x.route.id ? O[x.route.id] : void 0, pe = x.route.errorElement || zw, C && (T < 0 && j === 0 ? (jx("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), K = !0, ne = null) : T === j && (K = !0, ne = x.route.hydrateFallbackElement || null)));
    let ve = p.concat(c.slice(0, j + 1)), Y = () => {
      let $;
      return k ? $ = pe : K ? $ = ne : x.route.Component ? $ = /* @__PURE__ */ D.createElement(x.route.Component, null) : x.route.element ? $ = x.route.element : $ = V, /* @__PURE__ */ D.createElement(Pw, {
        match: x,
        routeContext: {
          outlet: V,
          matches: ve,
          isDataRoute: m != null
        },
        children: $
      });
    };
    return m && (x.route.ErrorBoundary || x.route.errorElement || j === 0) ? /* @__PURE__ */ D.createElement(Hw, {
      location: m.location,
      revalidation: m.revalidation,
      component: pe,
      error: k,
      children: Y(),
      routeContext: {
        outlet: null,
        matches: ve,
        isDataRoute: !0
      }
    }) : Y();
  }, null);
}
var Tx = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(Tx || {}), es = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(es || {});
function Yv(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function $w(o) {
  let p = D.useContext(ts);
  return p || ht(!1, Yv(o)), p;
}
function Yw(o) {
  let p = D.useContext(Pv);
  return p || ht(!1, Yv(o)), p;
}
function Iw(o) {
  let p = D.useContext(Fa);
  return p || ht(!1, Yv(o)), p;
}
function Iv(o) {
  let p = Iw(o), m = p.matches[p.matches.length - 1];
  return m.route.id || ht(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function qw() {
  return Iv(es.UseRouteId);
}
function Gw() {
  var o;
  let p = D.useContext(Bv), m = Yw(es.UseRouteError), g = Iv(es.UseRouteError);
  return p !== void 0 ? p : (o = m.errors) == null ? void 0 : o[g];
}
function Ww() {
  let {
    router: o
  } = $w(Tx.UseNavigateStable), p = Iv(es.UseNavigateStable), m = D.useRef(!1);
  return Dx(() => {
    m.current = !0;
  }), D.useCallback(function(y, S) {
    S === void 0 && (S = {}), ka(m.current, Cx), m.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, Zu({
      fromRouteId: p
    }, S)));
  }, [o, p]);
}
const ox = {};
function jx(o, p, m) {
  !p && !ox[o] && (ox[o] = !0, ka(!1, m));
}
const ux = {};
function Kw(o, p) {
  ux[p] || (ux[p] = !0, console.warn(p));
}
const sx = (o, p, m) => Kw(o, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Qw(o, p) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && sx("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && sx("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Xw(o) {
  let {
    to: p,
    replace: m,
    state: g,
    relative: y
  } = o;
  ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: S,
    static: c
  } = D.useContext(ma);
  ka(!c, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: O
  } = D.useContext(Fa), {
    pathname: C
  } = Xi(), T = $v(), V = Hv(p, zv(O, S.v7_relativeSplatPath), C, y === "path"), x = JSON.stringify(V);
  return D.useEffect(() => T(JSON.parse(x), {
    replace: m,
    state: g,
    relative: y
  }), [T, x, y, m, g]), null;
}
function nr(o) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Jw(o) {
  let {
    basename: p = "/",
    children: m = null,
    location: g,
    navigationType: y = ui.Pop,
    navigator: S,
    static: c = !1,
    future: O
  } = o;
  ao() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let C = p.replace(/^\/*/, "/"), T = D.useMemo(() => ({
    basename: C,
    navigator: S,
    static: c,
    future: Zu({
      v7_relativeSplatPath: !1
    }, O)
  }), [C, O, S, c]);
  typeof g == "string" && (g = no(g));
  let {
    pathname: V = "/",
    search: x = "",
    hash: j = "",
    state: k = null,
    key: K = "default"
  } = g, pe = D.useMemo(() => {
    let ne = si(V, C);
    return ne == null ? null : {
      location: {
        pathname: ne,
        search: x,
        hash: j,
        state: k,
        key: K
      },
      navigationType: y
    };
  }, [C, V, x, j, k, K, y]);
  return ka(pe != null, '<Router basename="' + C + '"> is not able to match the URL ' + ('"' + V + x + j + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ D.createElement(ma.Provider, {
    value: T
  }, /* @__PURE__ */ D.createElement(ns.Provider, {
    children: m,
    value: pe
  }));
}
function Zw(o) {
  let {
    children: p,
    location: m
  } = o;
  return kw(kv(p), m);
}
new Promise(() => {
});
function kv(o, p) {
  p === void 0 && (p = []);
  let m = [];
  return D.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ D.isValidElement(g))
      return;
    let S = [...p, y];
    if (g.type === D.Fragment) {
      m.push.apply(m, kv(g.props.children, S));
      return;
    }
    g.type !== nr && ht(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || ht(!1, "An index route cannot have child routes.");
    let c = {
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
    g.props.children && (c.children = kv(g.props.children, S)), m.push(c);
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
function to() {
  return to = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var m = arguments[p];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, to.apply(this, arguments);
}
function qv(o, p) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), y, S;
  for (S = 0; S < g.length; S++)
    y = g[S], !(p.indexOf(y) >= 0) && (m[y] = o[y]);
  return m;
}
const hf = "get", gf = "application/x-www-form-urlencoded";
function xf(o) {
  return o != null && typeof o.tagName == "string";
}
function e_(o) {
  return xf(o) && o.tagName.toLowerCase() === "button";
}
function t_(o) {
  return xf(o) && o.tagName.toLowerCase() === "form";
}
function n_(o) {
  return xf(o) && o.tagName.toLowerCase() === "input";
}
function a_(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function r_(o, p) {
  return o.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !a_(o);
}
let vf = null;
function i_() {
  if (vf === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), vf = !1;
    } catch {
      vf = !0;
    }
  return vf;
}
const l_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Ov(o) {
  return o != null && !l_.has(o) ? (ka(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + gf + '"')), null) : o;
}
function o_(o, p) {
  let m, g, y, S, c;
  if (t_(o)) {
    let O = o.getAttribute("action");
    g = O ? si(O, p) : null, m = o.getAttribute("method") || hf, y = Ov(o.getAttribute("enctype")) || gf, S = new FormData(o);
  } else if (e_(o) || n_(o) && (o.type === "submit" || o.type === "image")) {
    let O = o.form;
    if (O == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let C = o.getAttribute("formaction") || O.getAttribute("action");
    if (g = C ? si(C, p) : null, m = o.getAttribute("formmethod") || O.getAttribute("method") || hf, y = Ov(o.getAttribute("formenctype")) || Ov(O.getAttribute("enctype")) || gf, S = new FormData(O, o), !i_()) {
      let {
        name: T,
        type: V,
        value: x
      } = o;
      if (V === "image") {
        let j = T ? T + "." : "";
        S.append(j + "x", "0"), S.append(j + "y", "0");
      } else T && S.append(T, x);
    }
  } else {
    if (xf(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    m = hf, g = null, y = gf, c = o;
  }
  return S && y === "text/plain" && (c = S, S = void 0), {
    action: g,
    method: m.toLowerCase(),
    encType: y,
    formData: S,
    body: c
  };
}
const u_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], s_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], c_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], f_ = "6";
try {
  window.__reactRouterVersion = f_;
} catch {
}
const wx = /* @__PURE__ */ D.createContext({
  isTransitioning: !1
});
wx.displayName = "ViewTransition";
const d_ = /* @__PURE__ */ D.createContext(/* @__PURE__ */ new Map());
d_.displayName = "Fetchers";
const p_ = "startTransition", cx = rw[p_];
function m_(o) {
  let {
    basename: p,
    children: m,
    future: g,
    window: y
  } = o, S = D.useRef();
  S.current == null && (S.current = ow({
    window: y,
    v5Compat: !0
  }));
  let c = S.current, [O, C] = D.useState({
    action: c.action,
    location: c.location
  }), {
    v7_startTransition: T
  } = g || {}, V = D.useCallback((x) => {
    T && cx ? cx(() => C(x)) : C(x);
  }, [C, T]);
  return D.useLayoutEffect(() => c.listen(V), [c, V]), D.useEffect(() => Qw(g), [g]), /* @__PURE__ */ D.createElement(Jw, {
    basename: p,
    children: m,
    location: O.location,
    navigationType: O.action,
    navigator: c,
    future: g
  });
}
const v_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", h_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Qi = /* @__PURE__ */ D.forwardRef(function(p, m) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: S,
    replace: c,
    state: O,
    target: C,
    to: T,
    preventScrollReset: V,
    viewTransition: x
  } = p, j = qv(p, u_), {
    basename: k
  } = D.useContext(ma), K, pe = !1;
  if (typeof T == "string" && h_.test(T) && (K = T, v_))
    try {
      let $ = new URL(window.location.href), q = T.startsWith("//") ? new URL($.protocol + T) : new URL(T), P = si(q.pathname, k);
      q.origin === $.origin && P != null ? T = P + q.search + q.hash : pe = !0;
    } catch {
      ka(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ne = Vw(T, {
    relative: y
  }), ve = N_(T, {
    replace: c,
    state: O,
    target: C,
    preventScrollReset: V,
    relative: y,
    viewTransition: x
  });
  function Y($) {
    g && g($), $.defaultPrevented || ve($);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ D.createElement("a", to({}, j, {
      href: K || ne,
      onClick: pe || S ? g : Y,
      ref: m,
      target: C
    }))
  );
});
Qi.displayName = "Link";
const g_ = /* @__PURE__ */ D.forwardRef(function(p, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: S = "",
    end: c = !1,
    style: O,
    to: C,
    viewTransition: T,
    children: V
  } = p, x = qv(p, s_), j = as(C, {
    relative: x.relative
  }), k = Xi(), K = D.useContext(Pv), {
    navigator: pe,
    basename: ne
  } = D.useContext(ma), ve = K != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  D_(j) && T === !0, Y = pe.encodeLocation ? pe.encodeLocation(j).pathname : j.pathname, $ = k.pathname, q = K && K.navigation && K.navigation.location ? K.navigation.location.pathname : null;
  y || ($ = $.toLowerCase(), q = q ? q.toLowerCase() : null, Y = Y.toLowerCase()), q && ne && (q = si(q, ne) || q);
  const P = Y !== "/" && Y.endsWith("/") ? Y.length - 1 : Y.length;
  let ge = $ === Y || !c && $.startsWith(Y) && $.charAt(P) === "/", ue = q != null && (q === Y || !c && q.startsWith(Y) && q.charAt(Y.length) === "/"), X = {
    isActive: ge,
    isPending: ue,
    isTransitioning: ve
  }, Z = ge ? g : void 0, Q;
  typeof S == "function" ? Q = S(X) : Q = [S, ge ? "active" : null, ue ? "pending" : null, ve ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof O == "function" ? O(X) : O;
  return /* @__PURE__ */ D.createElement(Qi, to({}, x, {
    "aria-current": Z,
    className: Q,
    ref: m,
    style: U,
    to: C,
    viewTransition: T
  }), typeof V == "function" ? V(X) : V);
});
g_.displayName = "NavLink";
const y_ = /* @__PURE__ */ D.forwardRef((o, p) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: S,
    state: c,
    method: O = hf,
    action: C,
    onSubmit: T,
    relative: V,
    preventScrollReset: x,
    viewTransition: j
  } = o, k = qv(o, c_), K = R_(), pe = C_(C, {
    relative: V
  }), ne = O.toLowerCase() === "get" ? "get" : "post", ve = (Y) => {
    if (T && T(Y), Y.defaultPrevented) return;
    Y.preventDefault();
    let $ = Y.nativeEvent.submitter, q = ($ == null ? void 0 : $.getAttribute("formmethod")) || O;
    K($ || Y.currentTarget, {
      fetcherKey: m,
      method: q,
      navigate: g,
      replace: S,
      state: c,
      relative: V,
      preventScrollReset: x,
      viewTransition: j
    });
  };
  return /* @__PURE__ */ D.createElement("form", to({
    ref: p,
    method: ne,
    action: pe,
    onSubmit: y ? T : ve
  }, k));
});
y_.displayName = "Form";
var bf;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(bf || (bf = {}));
var fx;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(fx || (fx = {}));
function b_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function _x(o) {
  let p = D.useContext(ts);
  return p || ht(!1, b_(o)), p;
}
function N_(o, p) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: S,
    relative: c,
    viewTransition: O
  } = p === void 0 ? {} : p, C = $v(), T = Xi(), V = as(o, {
    relative: c
  });
  return D.useCallback((x) => {
    if (r_(x, m)) {
      x.preventDefault();
      let j = g !== void 0 ? g : Ju(T) === Ju(V);
      C(o, {
        replace: j,
        state: y,
        preventScrollReset: S,
        relative: c,
        viewTransition: O
      });
    }
  }, [T, C, V, g, y, m, o, S, c, O]);
}
function x_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let E_ = 0, S_ = () => "__" + String(++E_) + "__";
function R_() {
  let {
    router: o
  } = _x(bf.UseSubmit), {
    basename: p
  } = D.useContext(ma), m = qw();
  return D.useCallback(function(g, y) {
    y === void 0 && (y = {}), x_();
    let {
      action: S,
      method: c,
      encType: O,
      formData: C,
      body: T
    } = o_(g, p);
    if (y.navigate === !1) {
      let V = y.fetcherKey || S_();
      o.fetch(V, m, y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: C,
        body: T,
        formMethod: y.method || c,
        formEncType: y.encType || O,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: C,
        body: T,
        formMethod: y.method || c,
        formEncType: y.encType || O,
        replace: y.replace,
        state: y.state,
        fromRouteId: m,
        flushSync: y.flushSync,
        viewTransition: y.viewTransition
      });
  }, [o, p, m]);
}
function C_(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p, {
    basename: g
  } = D.useContext(ma), y = D.useContext(Fa);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [S] = y.matches.slice(-1), c = to({}, as(o || ".", {
    relative: m
  })), O = Xi();
  if (o == null) {
    c.search = O.search;
    let C = new URLSearchParams(c.search), T = C.getAll("index");
    if (T.some((x) => x === "")) {
      C.delete("index"), T.filter((j) => j).forEach((j) => C.append("index", j));
      let x = C.toString();
      c.search = x ? "?" + x : "";
    }
  }
  return (!o || o === ".") && S.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (c.pathname = c.pathname === "/" ? g : Or([g, c.pathname])), Ju(c);
}
function D_(o, p) {
  p === void 0 && (p = {});
  let m = D.useContext(wx);
  m == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = _x(bf.useViewTransitionState), y = as(o, {
    relative: p.relative
  });
  if (!m.isTransitioning)
    return !1;
  let S = si(m.currentLocation.pathname, g) || m.currentLocation.pathname, c = si(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return Av(y.pathname, c) != null || Av(y.pathname, S) != null;
}
function T_() {
  const [o, p] = D.useState(null), [m, g] = D.useState(""), [y, S] = D.useState(""), [c, O] = D.useState(!0), [C, T] = D.useState(""), [V, x] = D.useState(""), [j, k] = D.useState(!1), [K, pe] = D.useState(!1);
  D.useEffect(() => {
    const $ = typeof window < "u" ? window : void 0, q = $ && $.__FIREBASE__ ? $.__FIREBASE__ : null;
    p({
      apiKey: q && q.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: q && q.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: q && q.projectId || void 0 || "fresh-basket-a8933",
      appId: q && q.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: q && q.messagingSenderId || void 0 || "163656027399",
      measurementId: q && q.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ne($) {
    const q = ($ == null ? void 0 : $.code) || "", P = ($ == null ? void 0 : $.message) || "";
    return q.includes("invalid-email") ? "Please enter a valid email address." : q.includes("user-not-found") ? "No account found with that email." : q.includes("wrong-password") || q.includes("invalid-credential") || P.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : q.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : q.includes("network-request-failed") ? "Network error. Check your connection and try again." : P || "Something went wrong.";
  }
  async function ve($) {
    $.preventDefault(), T(""), x(""), k(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), P = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ge, setPersistence: ue, browserLocalPersistence: X, browserSessionPersistence: Z, signInWithEmailAndPassword: Q } = P, U = ge();
      await ue(U, c ? X : Z);
      const ee = await (await Q(U, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: ee }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (q) {
      T(ne(q));
    } finally {
      k(!1);
    }
  }
  async function Y() {
    T(""), x("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: q, sendPasswordResetEmail: P } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ge = q();
      await P(ge, m.trim()), x("If an account exists for that email, a reset link has been sent.");
    } catch ($) {
      T(ne($));
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
      V && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: V }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: ve, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: ($) => g($.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: K ? "text" : "password", value: y, onChange: ($) => S($.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": K ? "Hide password" : "Show password", onClick: () => pe(($) => !$), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: c, onChange: ($) => O($.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("button", { className: "link-button", type: "button", onClick: Y, children: "Forgot password?" }, void 0, !1, {
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
function j_() {
  const [o, p] = D.useState(null), [m, g] = D.useState(""), [y, S] = D.useState(""), [c, O] = D.useState(""), [C, T] = D.useState(""), [V, x] = D.useState(""), [j, k] = D.useState(""), [K, pe] = D.useState(""), [ne, ve] = D.useState(!1), [Y, $] = D.useState(!1), [q, P] = D.useState(!1), [ge, ue] = D.useState(!1);
  D.useEffect(() => {
    const Q = typeof window < "u" ? window : void 0, U = Q && Q.__FIREBASE__ ? Q.__FIREBASE__ : null;
    p({
      apiKey: U && U.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: U && U.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: U && U.projectId || void 0 || "fresh-basket-a8933",
      appId: U && U.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: U && U.messagingSenderId || void 0 || "163656027399",
      measurementId: U && U.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function X(Q) {
    const U = (Q == null ? void 0 : Q.code) || "";
    return U.includes("email-already-in-use") ? "An account with this email already exists." : U.includes("weak-password") ? "Password should be at least 6 characters." : U.includes("invalid-email") ? "Please enter a valid email address." : U.includes("network-request-failed") ? "Network error. Check your connection and try again." : (Q == null ? void 0 : Q.message) || "Something went wrong.";
  }
  async function Z(Q) {
    Q.preventDefault(), k(""), pe(""), ve(!0);
    try {
      const U = String(m).trim(), fe = String(y).trim(), ee = fe.replace(/\D+/g, ""), Te = { fn: !U, cn: !fe };
      if (P(Te.fn), ue(Te.cn || ee.length < 7), Te.fn || Te.cn) {
        k("Please fill in required fields");
        return;
      }
      if (ee.length < 7) {
        k("Please enter a valid mobile number");
        return;
      }
      if (C !== V) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const je = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Le, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Je = Le(), Qt = await (await ye(Je, c.trim(), C)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Qt, profile: { fullName: U, contactNumber: fe } }) })).ok) throw new Error("Session creation failed");
      pe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (U) {
      k(X(U));
    } finally {
      ve(!1);
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
    K && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: K }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: Z, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (q && !String(m).trim() ? " input-error" : ""), value: m, onChange: (Q) => {
          g(Q.target.value), q && P(!String(Q.target.value).trim());
        }, onBlur: () => P(!String(m).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (ge ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (Q) => {
          if (S(Q.target.value), ge) {
            const U = String(Q.target.value).trim().replace(/\D+/g, "");
            ue(!(U.length >= 7));
          }
        }, onBlur: () => {
          const Q = String(y).trim().replace(/\D+/g, "");
          ue(!(Q.length >= 7));
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: c, onChange: (Q) => O(Q.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: Y ? "text" : "password", value: C, onChange: (Q) => T(Q.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": Y ? "Hide password" : "Show password", onClick: () => $((Q) => !Q), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: V, onChange: (Q) => x(Q.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
function w_() {
  const [o, p] = D.useState([]);
  return D.useEffect(() => {
    const m = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (m.length) {
      const g = m.map((y) => ({
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
      const S = String(Date.now()) + Math.random().toString(36).slice(2, 8), c = { id: S, message: String(g || ""), type: y.type || "success", ttl: typeof y.ttl == "number" ? y.ttl : 4e3 };
      return p((O) => [c, ...O]), S;
    }, window.hideToast = function(g) {
      p((y) => y.filter((S) => S.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), D.useEffect(() => {
    if (!o.length) return;
    const m = o.map((g) => setTimeout(() => {
      p((y) => y.filter((S) => S.id !== g.id));
    }, g.ttl));
    return () => {
      m.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ d.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((m) => /* @__PURE__ */ d.jsxDEV("div", { className: `toast ${m.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ d.jsxDEV("div", { className: "toast-message", children: m.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ d.jsxDEV("button", { className: "toast-close", onClick: () => p((g) => g.filter((y) => y.id !== m.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
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
function _r({ children: o }) {
  D.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(m, g) {
      return window.__pendingToasts.push({ message: m, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(m) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== m));
      } catch {
      }
    }));
  }, []);
  const p = $v();
  return D.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), S = document.getElementById("profileMenu");
    function c(x, j, k) {
      x && (x.classList.toggle("hidden", !k), x.setAttribute("aria-hidden", k ? "false" : "true"), j && j.setAttribute("aria-expanded", k ? "true" : "false"));
    }
    function O() {
      c(g, m, !1), c(S, y, !1);
    }
    function C(x) {
      const j = (k) => k && (k === x.target || k.contains(x.target));
      !j(g) && !j(m) && !j(S) && !j(y) && O();
    }
    function T(x) {
      x.key === "Escape" && O();
    }
    function V(x) {
      x && x.querySelectorAll(".dropdown-item").forEach((j) => {
        j.addEventListener("click", () => O());
      });
    }
    return m && g && (m.addEventListener("click", (x) => {
      x.stopPropagation(), c(S, y, !1), c(g, m, g.classList.contains("hidden"));
    }), V(g)), y && S && (y.addEventListener("click", (x) => {
      x.stopPropagation(), c(g, m, !1), c(S, y, S.classList.contains("hidden"));
    }), V(S)), document.addEventListener("click", C), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", C), document.removeEventListener("keydown", T);
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
        /* @__PURE__ */ d.jsxDEV(Qi, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), p("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(Qi, { to: "/orders", onClick: (m) => {
          m.preventDefault(), p("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(Qi, { to: "/riders", onClick: (m) => {
          m.preventDefault(), p("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(Qi, { to: "/reports", onClick: (m) => {
          m.preventDefault(), p("/reports");
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
            /* @__PURE__ */ d.jsxDEV(Qi, { className: "dropdown-item", to: "/settings", onClick: (m) => {
              m.preventDefault(), p("/settings");
            }, children: "Settings" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ d.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 108,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 108,
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
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV(w_, {}, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 116,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
function __({ onClose: o, onCreated: p }) {
  const [m, g] = D.useState(""), [y, S] = D.useState(""), [c, O] = D.useState(""), [C, T] = D.useState(""), [V, x] = D.useState(!1), [j, k] = D.useState(""), [K, pe] = D.useState(""), [ne, ve] = D.useState(!1), [Y, $] = D.useState(!1), [q, P] = D.useState(!1), [ge, ue] = D.useState(!1);
  async function X() {
    k(""), pe(""), ue(!0);
    const Z = String(m).trim(), Q = String(y), U = String(c).trim(), fe = String(C).trim(), ee = fe.replace(/\D+/g, ""), Te = { fn: !U, cn: !fe, pw: !Q };
    if (ve(Te.fn), $(Te.cn || ee.length < 7), P(Te.pw), Te.fn || Te.cn || Te.pw) {
      k("Full name, mobile and password are required");
      return;
    }
    if (ee.length < 7) {
      k("Please enter a valid mobile number"), $(!0);
      return;
    }
    if (Z && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Z)) {
      k("Please enter a valid email");
      return;
    }
    if (Q.length < 6) {
      P(!0), k("Password must be at least 6 characters");
      return;
    }
    x(!0);
    try {
      const je = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Z, password: Q, fullName: U, contactNumber: fe })
      }), Le = await je.json().catch(() => null);
      if (!je.ok) {
        const ye = String(Le && (Le.error || Le.message) || ""), Je = ye.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ye) || /MISSING\s*EMAIL\/PASSWORD/i.test(ye))
          k("Full name, mobile and password are required"), ve(!U), $(!fe || ee.length < 7), P(!Q);
        else if (Je.includes("EMAIL_EXISTS"))
          k("An account with this email already exists. Use a different email or leave email blank.");
        else if (Je.includes("INVALID_EMAIL"))
          k("Please enter a valid email");
        else if (Je.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ye))
          P(!0), k("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ye))
          $(!0), k("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ye))
          k("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ye || "Failed to create rider");
        return;
      }
      pe("Rider created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (je) {
      const Le = String((je == null ? void 0 : je.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(Le) ? k("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(Le) ? k("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(Le) ? k("Please enter a valid email") : /WEAK_PASSWORD/i.test(Le) || /AT LEAST 6 CHARACTERS/i.test(Le) ? (P(!0), k("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(Le) ? ($(!0), k("Please enter a valid mobile number")) : k(Le || "Failed to create rider");
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
      K && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: K }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && !String(c).trim() ? " input-error" : ""), value: c, onChange: (Z) => {
          O(Z.target.value), ge && ve(!String(Z.target.value).trim());
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (Z) => {
          g(Z.target.value);
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (Z) => {
          S(Z.target.value), ge && P(!String(Z.target.value));
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && String(C).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: C, onChange: (Z) => {
          if (T(Z.target.value), ge) {
            const Q = String(Z.target.value).trim().replace(/\D+/g, "");
            $(!(Q.length >= 7));
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: V, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: V, children: V ? "Creating…" : "Create" }, void 0, !1, {
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
function O_() {
  const [o, p] = D.useState([]), [m, g] = D.useState(""), [y, S] = D.useState("all"), [c, O] = D.useState("all"), [C, T] = D.useState("all"), [V, x] = D.useState(!0), [j, k] = D.useState(""), [K, pe] = D.useState(1), [ne, ve] = D.useState(20), [Y, $] = D.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [q, P] = D.useState(!1);
  D.useEffect(() => {
    let X = !0;
    return (async () => {
      var Z, Q, U, fe;
      x(!0), k("");
      try {
        const ee = new URLSearchParams();
        m && ee.set("q", m), C !== "all" && ee.set("status", C), y !== "all" && ee.set("lastDays", y), ee.set("page", String(K)), ee.set("limit", String(ne));
        const Te = await fetch(`/api/riders?${ee.toString()}`, { credentials: "include" });
        if (Te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Te.ok) throw new Error("Failed to load riders");
        const je = await Te.json();
        X && (p(Array.isArray(je.riders) ? je.riders : []), $({ total: ((Z = je.meta) == null ? void 0 : Z.total) || 0, page: ((Q = je.meta) == null ? void 0 : Q.page) || 1, limit: ((U = je.meta) == null ? void 0 : U.limit) || ne, pages: ((fe = je.meta) == null ? void 0 : fe.pages) || 1 }));
      } catch (ee) {
        X && k(ee.message || "Failed to load riders");
      } finally {
        X && x(!1);
      }
    })(), () => {
      X = !1;
    };
  }, [m, C, y, K, ne]);
  const ge = D.useMemo(() => o.filter((X) => {
    if (m && !X.name.toLowerCase().includes(m.toLowerCase().trim()) || C !== "all" && X.status !== C || c !== "all" && String(X.id) !== String(c)) return !1;
    if (y !== "all") {
      const Z = parseInt(X.lastActiveDays, 10) || 9999, Q = parseInt(y, 10);
      if (!(Z <= Q)) return !1;
    }
    return !0;
  }), [o, m, C, c, y]), ue = D.useMemo(() => {
    const X = /* @__PURE__ */ new Date(), Z = [], Q = [];
    for (let U = 2; U >= 0; U--) {
      const fe = new Date(X.getFullYear(), X.getMonth() - U, 1), ee = `${fe.getFullYear()}-${String(fe.getMonth() + 1).padStart(2, "0")}`, Te = fe.toLocaleString(void 0, { month: "short", year: "numeric" });
      Z.push(ee), Q.push(Te);
    }
    return { keys: Z, labels: Q };
  }, []);
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-management", children: [
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (X) => {
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
          S(X.target.value), pe(1);
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: c, onChange: (X) => O(X.target.value), children: [
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: C, onChange: (X) => {
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
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: ne, onChange: (X) => {
        ve(parseInt(X.target.value, 10)), pe(1);
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
      q && /* @__PURE__ */ d.jsxDEV(__, { onClose: () => P(!1), onCreated: () => {
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
          ue.labels.map((X, Z) => /* @__PURE__ */ d.jsxDEV("th", { className: "col-month", children: X }, ue.keys[Z], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 120,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-earnings", children: (() => {
            const X = ue.keys[ue.keys.length - 2], Z = String(X).split("-"), Q = parseInt(Z[0], 10), U = parseInt(Z[1], 10);
            return `Earnings (${new Date(Number.isFinite(Q) ? Q : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(U) ? U - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 122,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 123,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 124,
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
          V && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 129,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 129,
            columnNumber: 17
          }, this),
          !V && j && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: j }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 132,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 132,
            columnNumber: 17
          }, this),
          !V && !j && ge.map((X) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": X.id, "data-status": X.status, "data-last-days": X.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { className: "rider-name-link", href: `/riders/${X.id}`, children: X.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 136,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 136,
              columnNumber: 19
            }, this),
            ue.keys.map((Z) => {
              var Q;
              return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((Q = X.monthlyCounts) == null ? void 0 : Q[Z]) || 0).toFixed(2),
                " km"
              ] }, Z, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 138,
                columnNumber: 21
              }, this);
            }),
            (() => {
              var fe;
              const Z = ue.keys[ue.keys.length - 2], U = Number(((fe = X.monthlyCounts) == null ? void 0 : fe[Z]) || 0) * 2;
              return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(U) ? `${Math.round(U)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 140,
                columnNumber: 189
              }, this);
            })(),
            (() => {
              const Z = Array.isArray(X.orders) ? X.orders : [], Q = Z.length;
              if (!Q) return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-performance", children: "0%" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 141,
                columnNumber: 128
              }, this);
              let U = 0;
              for (const ee of Z)
                ee && typeof ee == "object" && (ee.onTime === !0 || ee.on_time === !0 || ee.metrics && ee.metrics.onTime === !0) && (U += 1);
              const fe = Math.round(U / Q * 100);
              return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-performance", children: `${fe}%` }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 141,
                columnNumber: 421
              }, this);
            })(),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-total", children: [
              Number(X.totalKm || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 142,
              columnNumber: 19
            }, this)
          ] }, X.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 135,
            columnNumber: 17
          }, this)),
          !V && !j && ge.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 146,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 146,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 127,
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: Y.page <= 1 || V, onClick: () => pe((X) => Math.max(1, X - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 154,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        Y.page,
        " of ",
        Y.pages,
        " • ",
        Y.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 155,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: Y.page >= Y.pages || V, onClick: () => pe((X) => Math.min(Y.pages, X + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 156,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 153,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 152,
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
const Uv = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, dx = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
function Ua(o) {
  return o !== null && typeof o == "object";
}
function Lr(o) {
  if (o == null) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      const p = o.toDate();
      if (p instanceof Date && !Number.isNaN(p.getTime())) return p;
    } catch {
      return null;
    }
  if (Ua(o) && o.seconds !== void 0) {
    const p = Number(o.seconds);
    if (Number.isFinite(p)) {
      const m = p * 1e3;
      return new Date(m);
    }
  }
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return null;
    if (o > 1e12) return new Date(o);
    if (o > 1e9) return new Date(o * 1e3);
  }
  if (typeof o == "string") {
    const p = o.trim();
    if (!p) return null;
    let m = p;
    const g = m.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d+)(.*)$/);
    g && g[2].length > 3 && (m = `${g[1]}.${g[2].slice(0, 3)}${g[3]}`);
    const y = Date.parse(m);
    if (Number.isFinite(y)) return new Date(y);
  }
  if (Ua(o)) {
    if (o.at) return Lr(o.at);
    if (o.value && o.value !== o) return Lr(o.value);
    if (o.expectedAt) return Lr(o.expectedAt);
  }
  return null;
}
function Nf(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const p = o.trim();
    if (!p) return null;
    if (Uv.test(p)) return parseFloat(p.replace(Uv, "$1"));
    if (dx.test(p)) return parseFloat(p.replace(dx, "$1")) / 60;
    const m = Number(p);
    return Number.isFinite(m) ? m : null;
  }
  if (Ua(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const p = Nf(o.duration);
      if (p !== null) return p;
    }
    if (o.value !== void 0 && o.value !== o) {
      const p = Nf(o.value);
      if (p !== null) return p;
    }
  }
  return null;
}
function Ox(o) {
  var m, g, y, S, c, O;
  if (!Ua(o)) return null;
  const p = [
    o.durationMins,
    o.duration_minutes,
    o.deliveryDuration,
    o.delivery_duration,
    o.actualDuration,
    o.actual_duration,
    o.actualDurationMinutes,
    (m = o.orders) == null ? void 0 : m.deliveryDuration,
    (g = o.orders) == null ? void 0 : g.delivery_duration,
    (y = o.orders) == null ? void 0 : y.durationMins,
    (S = o.orders) == null ? void 0 : S.duration_minutes,
    (c = o.orders) == null ? void 0 : c.actualDuration,
    (O = o.orders) == null ? void 0 : O.actualDurationMinutes
  ];
  for (const C of p) {
    const T = Nf(C);
    if (T !== null) return T;
  }
  return null;
}
function Lx(o) {
  var m, g, y, S;
  if (!Ua(o)) return null;
  const p = [
    o.deliveredAt,
    o.actual_delivery_time,
    o.actualDeliveryTime,
    o.deliveryEndTime,
    o.delivery_end_time,
    (m = o.orders) == null ? void 0 : m.deliveredAt,
    (g = o.orders) == null ? void 0 : g.actual_delivery_time,
    (y = o.orders) == null ? void 0 : y.actualDeliveryTime,
    (S = o.orders) == null ? void 0 : S.deliveryEndTime
  ];
  for (const c of p)
    if (c != null) return c;
  return null;
}
function Vx(o) {
  var m, g, y, S, c, O;
  if (!Ua(o)) return null;
  const p = [
    o.deliveryStartTime,
    o.delivery_start_time,
    o.start_time,
    o.startTime,
    o.started_at,
    o.startedAt,
    (m = o.orders) == null ? void 0 : m.deliveryStartTime,
    (g = o.orders) == null ? void 0 : g.delivery_start_time,
    (y = o.orders) == null ? void 0 : y.start_time,
    (S = o.orders) == null ? void 0 : S.startTime,
    (c = o.orders) == null ? void 0 : c.started_at,
    (O = o.orders) == null ? void 0 : O.startedAt
  ];
  for (const C of p)
    if (C != null) return C;
  return null;
}
function L_(o) {
  var S, c;
  if (!Ua(o)) return null;
  const p = Vx(o);
  if (p != null) return p;
  const m = Lx(o), g = Ox(o);
  if (m != null && Number.isFinite(g)) {
    const O = Lr(m);
    if (O instanceof Date)
      return new Date(O.getTime() - g * 6e4);
  }
  const y = [
    o.created_at,
    o.createdAt,
    o.created,
    (S = o.orders) == null ? void 0 : S.created_at,
    (c = o.orders) == null ? void 0 : c.createdAt
  ];
  for (const O of y)
    if (O != null) return O;
  return null;
}
function Mx(o) {
  if (!Ua(o)) return null;
  const p = Ox(o);
  if (Number.isFinite(p)) return p;
  const m = Lr(Lx(o)), g = Lr(Vx(o));
  if (m instanceof Date && g instanceof Date) {
    const y = m.getTime() - g.getTime();
    if (y >= 0)
      return Math.round(y / 6e4);
  }
  return null;
}
function Ax(o) {
  const p = Lr(o);
  if (!(p instanceof Date) || Number.isNaN(p.getTime())) return "-";
  try {
    return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function kx(o) {
  if (o == null) return "-";
  if (Ua(o) && o.minutes !== void 0) {
    const m = Number(o.minutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  const p = Lr(o);
  if (p instanceof Date && !Number.isNaN(p.getTime()))
    try {
      return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "-";
    }
  if (typeof o == "number")
    return Number.isFinite(o) ? `${Math.round(o)} min` : "-";
  if (typeof o == "string") {
    const m = o.trim();
    if (!m) return "-";
    const g = m.match(Uv);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : m;
  }
  if (Ua(o) && o.expectedMinutes !== void 0) {
    const m = Number(o.expectedMinutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  return String(o);
}
function Ux(o) {
  var g, y, S, c, O, C, T, V;
  if (!Ua(o)) return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (S = o.orders) == null ? void 0 : S.expected_delivery_time,
    (c = o.orders) == null ? void 0 : c.expectedDeliveryTime,
    (O = o.delivery) == null ? void 0 : O.expected_delivery_time,
    (C = o.delivery) == null ? void 0 : C.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (V = o.expected_delivery) == null ? void 0 : V.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const x of p)
    if (x != null && !(typeof x == "string" && !x.trim()))
      return x;
  const m = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(m))
    for (let x = m.length - 1; x >= 0; x -= 1) {
      const j = m[x];
      if (!j) continue;
      const k = typeof j.type == "string" ? j.type.toLowerCase().trim() : "";
      if (!(k !== "eta" && k !== "expected")) {
        if (j.expectedMinutes !== void 0 && j.expectedMinutes !== null) return { minutes: j.expectedMinutes };
        if (j.minutes !== void 0 && j.minutes !== null) return { minutes: j.minutes };
        if (j.expectedAt) return j.expectedAt;
      }
    }
  return null;
}
function Fx(o) {
  const p = Nf(o);
  if (p === null || !Number.isFinite(p)) return "-";
  const m = Math.round(p);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), y = m % 60;
  return `${g}h ${y}m`;
}
function V_() {
  var V;
  const { id: o } = Aw(), [p, m] = D.useState(null), [g, y] = D.useState(!0), [S, c] = D.useState("");
  if (D.useEffect(() => {
    let x = !0;
    return (async () => {
      y(!0), c("");
      try {
        const j = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (j.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!j.ok) throw new Error("Failed to load rider");
        const k = await j.json();
        x && m(k);
      } catch (j) {
        x && c(j.message || "Failed to load rider");
      } finally {
        x && y(!1);
      }
    })(), () => {
      x = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: S }, void 0, !1, {
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
  if (!p)
    return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  const { rider: O, metrics: C, history: T } = p;
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 45,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 43,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ d.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 50,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { children: [
        /* @__PURE__ */ d.jsxDEV("h3", { className: "rp-name", children: O.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          O.id
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 53,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 51,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 49,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 48,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: Array.isArray(O.orders) ? O.orders.length : 0 }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 60,
          columnNumber: 70
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
          Number(O.totalKm || 0),
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
      lineNumber: 59,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 58,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name order-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 70,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km date-heading", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm distance-heading", children: "Distance (KM)" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 75,
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
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        (p.riderOrders || []).map((x, j) => {
          const k = x.name || x.orderId, K = Lr(x.created_at), pe = K instanceof Date && !Number.isNaN(K.getTime()) ? K.toISOString().slice(0, 10) : "-", ne = Ax(x.deliveryStartTime), ve = Ux(x), Y = kx(ve), $ = Mx(x), q = Fx($), P = Number(x.distance_km), ge = Number.isFinite(P) ? `${P.toFixed(2)} km` : typeof x.distance_km == "string" && x.distance_km.trim() ? x.distance_km : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name order-cell", children: k }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 94,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km date-cell", children: pe }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-start-time start-cell", children: ne }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 96,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 97,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: q }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 98,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission distance-cell", children: ge }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 99,
              columnNumber: 21
            }, this)
          ] }, x.orderId || j, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 93,
            columnNumber: 19
          }, this);
        }),
        !((V = p.riderOrders) != null && V.length) && (T || []).map((x, j) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name order-cell", children: x.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 105,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km date-cell", children: x.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 106,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 107,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected expected-cell", children: x.avgTime ? `${x.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 108,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 109,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(x.distanceKm)) ? `${Number(x.distanceKm).toFixed(2)} km` : x.distanceKm || "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 110,
            columnNumber: 19
          }, this)
        ] }, `h-${j}`, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 104,
          columnNumber: 17
        }, this))
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 78,
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
    lineNumber: 42,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
}
function zx({ orderId: o, onClose: p, onAssigned: m }) {
  const [g, y] = D.useState([]), [S, c] = D.useState(!0), [O, C] = D.useState(""), [T, V] = D.useState(null);
  D.useEffect(() => {
    let j = !0;
    return (async () => {
      c(!0), C("");
      try {
        const k = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!k.ok) throw new Error("Failed to load riders");
        const K = await k.json();
        j && y(Array.isArray(K.riders) ? K.riders : K.riders || []);
      } catch (k) {
        j && C(k.message || "Failed to load riders");
      } finally {
        j && c(!1);
      }
    })(), () => {
      j = !1;
    };
  }, []);
  async function x(j) {
    if (!(!o || !j)) {
      V(j);
      try {
        const k = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: j })
        });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const K = await k.json().catch(() => null);
        if (!k.ok) throw new Error(K && K.error ? K.error : "Assign failed");
        m && m({ orderId: o, riderId: j }), p();
      } catch (k) {
        alert(k.message || "Failed to assign rider");
      } finally {
        V(null);
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
      S && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 52,
        columnNumber: 23
      }, this),
      O && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: O }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 53,
        columnNumber: 21
      }, this),
      !S && !O && /* @__PURE__ */ d.jsxDEV("table", { className: "assign-table", children: [
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
            /* @__PURE__ */ d.jsxDEV("td", { children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-assign", onClick: () => x(j.id), disabled: T && T !== j.id, children: T === j.id ? "Assigning…" : "Assign" }, void 0, !1, {
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
function Fv(o) {
  if (typeof o != "string") return "";
  const p = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return p === "in_transit" ? "in_progress" : p;
}
function Hx(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function px(o) {
  return Fv(Hx(o));
}
const M_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], mx = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function A_() {
  const [o, p] = D.useState([]), [m, g] = D.useState(""), [y, S] = D.useState("all"), [c, O] = D.useState(1), [C, T] = D.useState(20), [V, x] = D.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [j, k] = D.useState(!0), [K, pe] = D.useState(""), [ne, ve] = D.useState(""), [Y, $] = D.useState(!0), [q, P] = D.useState(!1), [ge, ue] = D.useState(null);
  D.useEffect(() => {
    let U = !0;
    return (async () => {
      var fe, ee, Te, je;
      k(!0), pe(""), ve("");
      try {
        const Le = new URLSearchParams();
        if (m && Le.set("q", m), y && y !== "all") {
          const pn = mx[y] || y;
          Le.set("status", Fv(pn));
        }
        Le.set("page", String(c)), Le.set("limit", String(C));
        const ye = await fetch(`/api/orders?${Le.toString()}`, { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load orders");
        const Je = await ye.json();
        U && (p(Array.isArray(Je.orders) ? Je.orders : []), ve(Je.shopifyError || ""), $(!!Je.shopifyConfigured), x({ total: ((fe = Je.meta) == null ? void 0 : fe.total) || 0, page: ((ee = Je.meta) == null ? void 0 : ee.page) || 1, limit: ((Te = Je.meta) == null ? void 0 : Te.limit) || C, pages: ((je = Je.meta) == null ? void 0 : je.pages) || 1 }));
      } catch (Le) {
        U && pe(Le.message || "Failed to load orders");
      } finally {
        U && k(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [m, y, c, C]), D.useMemo(() => o, [o]);
  const X = D.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const U = Fv(mx[y] || y);
    return o.filter((fe) => px(fe) === U);
  }, [o, y]);
  function Z() {
    ue(null), P(!1);
  }
  function Q(U) {
    try {
      const { orderId: fe } = U || {};
      if (!fe) return;
      const ee = String(fe).replace(/^#+/, "");
      O(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${fe}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 104,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 102,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (U) => {
          g(U.target.value), O(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 110,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        M_.map(({ key: U, label: fe }) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${y === U ? " active" : ""}`, onClick: () => {
          S(U), O(1);
        }, "data-filter": U, children: fe }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: C, onChange: (U) => {
          T(parseInt(U.target.value, 10)), O(1);
        }, children: [10, 20, 50, 100].map((U) => /* @__PURE__ */ d.jsxDEV("option", { value: U, children: [
          U,
          "/page"
        ] }, U, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 119,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 118,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 112,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 107,
      columnNumber: 9
    }, this),
    !Y && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 125,
      columnNumber: 11
    }, this),
    ne && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: ne }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 127,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 133,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 134,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 135,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 136,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 137,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 139,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 140,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 132,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 131,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        j && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 17
        }, this),
        !j && K && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "auth-error", children: K }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 17
        }, this),
        !j && !K && X.map((U, fe) => {
          var Dt;
          const ee = Hx(U), Te = px(U), je = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let Le = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? Le = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? Le = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? Le = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (Le = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = U.name || U.order_number || U.id, pn = (ye != null ? String(ye).replace(/^#+/, "").trim() : "") || "-", Qt = L_(U), Sn = Ax(Qt), Ct = Ux(U), In = kx(Ct), Xt = Mx(U), va = Fx(Xt), na = U.rider ? String(U.rider) : (Dt = U.assignment) != null && Dt.riderId ? String(U.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": Te, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name order-id-cell", children: pn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 179,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km customer-cell", children: je || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 180,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf address-cell", children: Le }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 181,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-rider rider-cell", children: na }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 182,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Sn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 183,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected expected-cell", children: In }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 184,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: va }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 185,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${Te}`, children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 63
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 21
            }, this)
          ] }, ye || fe, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 178,
            columnNumber: 19
          }, this);
        }),
        !j && !K && X.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 191,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 191,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 143,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 130,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 129,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      q && ge && /* @__PURE__ */ d.jsxDEV(zx, { orderId: ge, onClose: Z, onAssigned: Q }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: V.page <= 1 || j, onClick: () => O((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          V.page,
          " of ",
          V.pages,
          " • ",
          V.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: V.page >= V.pages || j, onClick: () => O((U) => Math.min(V.pages, U + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 204,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 201,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 196,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}
function k_() {
  const [o, p] = D.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = D.useState([]), [y, S] = D.useState(!1), [c, O] = D.useState(!0), [C, T] = D.useState("");
  return D.useEffect(() => {
    let V = !0;
    return (async () => {
      O(!0), T("");
      try {
        const x = await fetch("/api/reports", { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load reports");
        const j = await x.json();
        V && (p(j.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(j.deliveries) ? j.deliveries : []));
      } catch (x) {
        V && T(x.message || "Failed to load reports");
      } finally {
        V && O(!1);
      }
    })(), () => {
      V = !1;
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: y, onChange: (V) => S(V.target.checked) }, void 0, !1, {
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
          !c && !C && m.map((V, x) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              V.orderNumber || V.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: V.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: V.expectedMinutes != null ? `${V.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: V.durationMins != null ? `${V.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: V.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, V.orderId || x, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !c && !C && m.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          c && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
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
function U_() {
  const [o, p] = D.useState([]), [m, g] = D.useState(!0), [y, S] = D.useState(""), [c, O] = D.useState(1), [C, T] = D.useState(25), [V, x] = D.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  D.useEffect(() => {
    let q = !0;
    return (async () => {
      var P, ge, ue, X;
      g(!0), S("");
      try {
        const Z = new URLSearchParams();
        Z.set("limit", String(C)), Z.set("page", String(c));
        const Q = await fetch(`/api/orders?${Z.toString()}`, { credentials: "include" });
        if (Q.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Q.ok) throw new Error("Failed to load orders");
        const U = await Q.json();
        q && (p(Array.isArray(U.orders) ? U.orders : []), x({ total: ((P = U.meta) == null ? void 0 : P.total) || 0, page: ((ge = U.meta) == null ? void 0 : ge.page) || c, limit: ((ue = U.meta) == null ? void 0 : ue.limit) || C, pages: ((X = U.meta) == null ? void 0 : X.pages) || 1 }));
      } catch (Z) {
        q && S(Z.message || "Failed to load orders");
      } finally {
        q && g(!1);
      }
    })(), () => {
      q = !1;
    };
  }, [c]);
  function j(q) {
    return !q || typeof q != "object" ? "new" : typeof q.current_status == "string" && String(q.current_status).trim() ? String(q.current_status).toLowerCase().trim() : "new";
  }
  const [k, K] = D.useState(!1), [pe, ne] = D.useState(null);
  function ve(q) {
    ne(q), K(!0);
  }
  function Y() {
    ne(null), K(!1);
  }
  function $(q) {
    try {
      const { orderId: P } = q || {};
      if (!P) return;
      const ge = String(P).replace(/^#+/, "");
      p((ue) => ue.filter((X, Z) => {
        const Q = String(X.id || X.name || X.order_number || Z).replace(/^#+/, "");
        return String(Q) !== String(ge);
      })), x((ue) => ({ ...ue || {}, total: Math.max(0, ((ue == null ? void 0 : ue.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${P}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "dashboard-orders", children: [
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: m ? "…" : V.total || o.length }, void 0, !1, {
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
        m && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 28
        }, this),
        !m && y && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: y }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 28
        }, this),
        !m && !y && (Array.isArray(o) ? o.filter((P) => j(P) === "new") : []).map((P, ge) => {
          const ue = j(P), X = P.full_name || (P.customer && P.customer.full_name ? P.customer.full_name : "");
          let Z = "-";
          typeof P.shipping_address == "string" && String(P.shipping_address).trim() ? Z = String(P.shipping_address).trim() : P.shipping_address && typeof P.shipping_address == "object" ? Z = [P.shipping_address.address1 || "", P.shipping_address.city || "", P.shipping_address.province || "", P.shipping_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-" : typeof P.billing_address == "string" && String(P.billing_address).trim() ? Z = String(P.billing_address).trim() : P.billing_address && typeof P.billing_address == "object" && (Z = [P.billing_address.address1 || "", P.billing_address.city || "", P.billing_address.province || "", P.billing_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-");
          const Q = P.name || P.order_number || P.id || ge, U = String(P.id || P.name || P.order_number || ge).replace(/^#+/, ""), fe = P.created_at ? new Date(P.created_at) : null, ee = fe ? fe.toLocaleDateString() : "-", Te = fe ? fe.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": ue, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: Q }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 122,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: X || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 123,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: Z }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${ue}`, children: ue.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: Te }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => ve(String(P.id || P.name || P.order_number || ge)), children: "Assign Rider" }, void 0, !1, {
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
        !m && !y && o.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: V.page <= 1 || m, onClick: () => O((q) => Math.max(1, q - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        V.page,
        " of ",
        V.pages,
        " • ",
        V.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 141,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: V.page >= V.pages || m, onClick: () => O((q) => Math.min(V.pages, q + 1)), children: "Next" }, void 0, !1, {
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
    k && pe && /* @__PURE__ */ d.jsxDEV(zx, { orderId: pe, onClose: Y, onAssigned: $ }, void 0, !1, {
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
const Lv = "app.settings.fares";
function F_() {
  const [o, p] = D.useState(0), [m, g] = D.useState(2), [y, S] = D.useState(!1);
  D.useEffect(() => {
    try {
      const C = localStorage.getItem(Lv);
      if (C) {
        const T = JSON.parse(C);
        T && typeof T == "object" && (T.baseFare !== void 0 && Number.isFinite(Number(T.baseFare)) && p(Number(T.baseFare)), T.farePerKm !== void 0 && Number.isFinite(Number(T.farePerKm)) && g(Number(T.farePerKm)));
      }
    } catch {
    }
  }, []);
  function c() {
    S(!0);
    try {
      const C = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
      localStorage.setItem(Lv, JSON.stringify(C));
      try {
        typeof window < "u" && typeof window.showToast == "function" && window.showToast("Settings saved", { type: "success" });
      } catch {
      }
    } finally {
      S(!1);
    }
  }
  function O() {
    p(0), g(2);
    try {
      localStorage.removeItem(Lv);
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(_r, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Settings" }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage fares for earnings calculations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "rc-select rc-chip", children: [
          /* @__PURE__ */ d.jsxDEV("span", { children: "Base Fare" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV(
            "input",
            {
              type: "number",
              className: "rc-search-input",
              value: Number.isFinite(o) ? String(o) : "",
              min: "0",
              step: "0.01",
              onChange: (C) => p(C.target.value === "" ? 0 : Number(C.target.value)),
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
        /* @__PURE__ */ d.jsxDEV("label", { className: "rc-select rc-chip", children: [
          /* @__PURE__ */ d.jsxDEV("span", { children: "Fare per Km" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV(
            "input",
            {
              type: "number",
              className: "rc-search-input",
              value: Number.isFinite(m) ? String(m) : "",
              min: "0",
              step: "0.01",
              onChange: (C) => g(C.target.value === "" ? 0 : Number(C.target.value)),
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
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", onClick: c, disabled: y, children: "Save" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", onClick: O, disabled: y, children: "Reset" }, void 0, !1, {
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
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
      "Current: Base Fare ",
      Number(o).toFixed(2),
      " • Fare/Km ",
      Number(m).toFixed(2)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 81,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 80,
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
function z_() {
  return /* @__PURE__ */ d.jsxDEV(m_, { children: /* @__PURE__ */ d.jsxDEV(Zw, { children: [
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(T_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(j_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(V_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(A_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(k_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(U_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "/settings", element: /* @__PURE__ */ d.jsxDEV(F_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 42
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(nr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(Xw, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function vx() {
  const o = document.getElementById("react-root");
  if (!o) return;
  xx(o).render(/* @__PURE__ */ d.jsxDEV(z_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", vx) : vx();
