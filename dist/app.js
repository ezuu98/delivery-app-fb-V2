function Z1(o, p) {
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
function ew(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var vE = { exports: {} }, Lv = {}, hE = { exports: {} }, yf = { exports: {} };
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
    var v = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), T = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), j = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), ne = Symbol.iterator, ve = "@@iterator";
    function Y(c) {
      if (c === null || typeof c != "object")
        return null;
      var b = ne && c[ne] || c[ve];
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
    function Z(c) {
      X = c;
    }
    ue.setExtraStackFrame = function(c) {
      X = c;
    }, ue.getCurrentStack = null, ue.getStackAddendum = function() {
      var c = "";
      X && (c += X);
      var b = ue.getCurrentStack;
      return b && (c += b() || ""), c;
    };
    var K = !1, U = !1, fe = !1, ee = !1, Te = !1, je = {
      ReactCurrentDispatcher: $,
      ReactCurrentBatchConfig: q,
      ReactCurrentOwner: ge
    };
    je.ReactDebugCurrentFrame = ue, je.ReactCurrentActQueue = P;
    function Le(c) {
      {
        for (var b = arguments.length, A = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          A[F - 1] = arguments[F];
        Je("warn", c, A);
      }
    }
    function ye(c) {
      {
        for (var b = arguments.length, A = new Array(b > 1 ? b - 1 : 0), F = 1; F < b; F++)
          A[F - 1] = arguments[F];
        Je("error", c, A);
      }
    }
    function Je(c, b, A) {
      {
        var F = je.ReactDebugCurrentFrame, J = F.getStackAddendum();
        J !== "" && (b += "%s", A = A.concat([J]));
        var Re = A.map(function(me) {
          return String(me);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[c], console, Re);
      }
    }
    var pn = {};
    function Kt(c, b) {
      {
        var A = c.constructor, F = A && (A.displayName || A.name) || "ReactClass", J = F + "." + b;
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
      enqueueForceUpdate: function(c, b, A) {
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
      enqueueReplaceState: function(c, b, A, F) {
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
      enqueueSetState: function(c, b, A, F) {
        Kt(c, "setState");
      }
    }, Ct = Object.assign, In = {};
    Object.freeze(In);
    function Xt(c, b, A) {
      this.props = c, this.context = b, this.refs = In, this.updater = A || Sn;
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
      }, na = function(c, b) {
        Object.defineProperty(Xt.prototype, c, {
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
    function Zt(c, b, A) {
      this.props = c, this.context = b, this.refs = In, this.updater = A || Sn;
    }
    var en = Zt.prototype = new Jt();
    en.constructor = Zt, Ct(en, Xt.prototype), en.isPureReactComponent = !0;
    function tn() {
      var c = {
        current: null
      };
      return Object.seal(c), c;
    }
    var kn = Array.isArray;
    function Bt(c) {
      return kn(c);
    }
    function Rn(c) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, A = b && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return A;
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
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(c)), Yt(c);
    }
    function nr(c, b, A) {
      var F = c.displayName;
      if (F)
        return F;
      var J = b.displayName || b.name || "";
      return J !== "" ? A + "(" + J + ")" : A;
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
        case L:
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
            var A = c;
            return ha(A._context) + ".Provider";
          case M:
            return nr(c, c.render, "ForwardRef");
          case k:
            var F = c.displayName || null;
            return F !== null ? F : Un(c.type) || "Memo";
          case Q: {
            var J = c, Re = J._payload, me = J._init;
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
    function Lr(c, b) {
      var A = function() {
        Cn || (Cn = !0, ye("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      A.isReactWarning = !0, Object.defineProperty(c, "key", {
        get: A,
        configurable: !0
      });
    }
    function ar(c, b) {
      var A = function() {
        za || (za = !0, ye("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      A.isReactWarning = !0, Object.defineProperty(c, "ref", {
        get: A,
        configurable: !0
      });
    }
    function ae(c) {
      if (typeof c.ref == "string" && ge.current && c.__self && ge.current.stateNode !== c.__self) {
        var b = Un(ge.current.type);
        Ot[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, c.ref), Ot[b] = !0);
      }
    }
    var be = function(c, b, A, F, J, Re, me) {
      var Me = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: c,
        key: b,
        ref: A,
        props: me,
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
        value: J
      }), Object.freeze && (Object.freeze(Me.props), Object.freeze(Me)), Me;
    };
    function Fe(c, b, A) {
      var F, J = {}, Re = null, me = null, Me = null, $e = null;
      if (b != null) {
        Dn(b) && (me = b.ref, ae(b)), Fn(b) && (aa(b.key), Re = "" + b.key), Me = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (F in b)
          mn.call(b, F) && !nn.hasOwnProperty(F) && (J[F] = b[F]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        J.children = A;
      else if (tt > 1) {
        for (var ot = Array(tt), ut = 0; ut < tt; ut++)
          ot[ut] = arguments[ut + 2];
        Object.freeze && Object.freeze(ot), J.children = ot;
      }
      if (c && c.defaultProps) {
        var He = c.defaultProps;
        for (F in He)
          J[F] === void 0 && (J[F] = He[F]);
      }
      if (Re || me) {
        var vt = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
        Re && Lr(J, vt), me && ar(J, vt);
      }
      return be(c, Re, me, Me, $e, ge.current, J);
    }
    function et(c, b) {
      var A = be(c.type, b, c.ref, c._self, c._source, c._owner, c.props);
      return A;
    }
    function ct(c, b, A) {
      if (c == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
      var F, J = Ct({}, c.props), Re = c.key, me = c.ref, Me = c._self, $e = c._source, tt = c._owner;
      if (b != null) {
        Dn(b) && (me = b.ref, tt = ge.current), Fn(b) && (aa(b.key), Re = "" + b.key);
        var ot;
        c.type && c.type.defaultProps && (ot = c.type.defaultProps);
        for (F in b)
          mn.call(b, F) && !nn.hasOwnProperty(F) && (b[F] === void 0 && ot !== void 0 ? J[F] = ot[F] : J[F] = b[F]);
      }
      var ut = arguments.length - 2;
      if (ut === 1)
        J.children = A;
      else if (ut > 1) {
        for (var He = Array(ut), vt = 0; vt < ut; vt++)
          He[vt] = arguments[vt + 2];
        J.children = He;
      }
      return be(c.type, Re, me, Me, $e, tt, J);
    }
    function gt(c) {
      return typeof c == "object" && c !== null && c.$$typeof === g;
    }
    var yt = ".", vn = ":";
    function Nt(c) {
      var b = /[=:]/g, A = {
        "=": "=0",
        ":": "=2"
      }, F = c.replace(b, function(J) {
        return A[J];
      });
      return "$" + F;
    }
    var it = !1, Et = /\/+/g;
    function ga(c) {
      return c.replace(Et, "$&/");
    }
    function ya(c, b) {
      return typeof c == "object" && c !== null && c.key != null ? (aa(c.key), Nt("" + c.key)) : b.toString(36);
    }
    function ra(c, b, A, F, J) {
      var Re = typeof c;
      (Re === "undefined" || Re === "boolean") && (c = null);
      var me = !1;
      if (c === null)
        me = !0;
      else
        switch (Re) {
          case "string":
          case "number":
            me = !0;
            break;
          case "object":
            switch (c.$$typeof) {
              case g:
              case y:
                me = !0;
            }
        }
      if (me) {
        var Me = c, $e = J(Me), tt = F === "" ? yt + ya(Me, 0) : F;
        if (Bt($e)) {
          var ot = "";
          tt != null && (ot = ga(tt) + "/"), ra($e, b, ot, "", function(jf) {
            return jf;
          });
        } else $e != null && (gt($e) && ($e.key && (!Me || Me.key !== $e.key) && aa($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          A + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Me || Me.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ga("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var ut, He, vt = 0, Tt = F === "" ? yt : F + vn;
      if (Bt(c))
        for (var Ei = 0; Ei < c.length; Ei++)
          ut = c[Ei], He = Tt + ya(ut, Ei), vt += ra(ut, b, A, He, J);
      else {
        var No = Y(c);
        if (typeof No == "function") {
          var or = c;
          No === or.entries && (it || Le("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var Eo = No.call(or), xo, Tf = 0; !(xo = Eo.next()).done; )
            ut = xo.value, He = Tt + ya(ut, Tf++), vt += ra(ut, b, A, He, J);
        } else if (Re === "object") {
          var vs = String(c);
          throw new Error("Objects are not valid as a React child (found: " + (vs === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : vs) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function rr(c, b, A) {
      if (c == null)
        return c;
      var F = [], J = 0;
      return ra(c, F, "", "", function(Re) {
        return b.call(A, Re, J++);
      }), F;
    }
    function ro(c) {
      var b = 0;
      return rr(c, function() {
        b++;
      }), b;
    }
    function fi(c, b, A) {
      rr(c, function() {
        b.apply(this, arguments);
      }, A);
    }
    function Ji(c) {
      return rr(c, function(b) {
        return b;
      }) || [];
    }
    function Zi(c) {
      if (!gt(c))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return c;
    }
    function di(c) {
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
      var A = !1, F = !1, J = !1;
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
              return A || (A = !0, ye("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
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
    function pi(c) {
      if (c._status === ba) {
        var b = c._result, A = b();
        if (A.then(function(Re) {
          if (c._status === ia || c._status === ba) {
            var me = c;
            me._status = qn, me._result = Re;
          }
        }, function(Re) {
          if (c._status === ia || c._status === ba) {
            var me = c;
            me._status = Ha, me._result = Re;
          }
        }), c._status === ba) {
          var F = c;
          F._status = ia, F._result = A;
        }
      }
      if (c._status === qn) {
        var J = c._result;
        return J === void 0 && ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, J), "default" in J || ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, J), J.default;
      } else
        throw c._result;
    }
    function N(c) {
      var b = {
        // We use these fields to store the result.
        _status: ba,
        _result: c
      }, A = {
        $$typeof: Q,
        _payload: b,
        _init: pi
      };
      {
        var F, J;
        Object.defineProperties(A, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Re, Object.defineProperty(A, "defaultProps", {
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
              ye("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), J = Re, Object.defineProperty(A, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return A;
    }
    function G(c) {
      c != null && c.$$typeof === k ? ye("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof c != "function" ? ye("forwardRef requires a render function but was given %s.", c === null ? "null" : typeof c) : c.length !== 0 && c.length !== 2 && ye("forwardRef render functions accept exactly two parameters: props and ref. %s", c.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), c != null && (c.defaultProps != null || c.propTypes != null) && ye("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: M,
        render: c
      };
      {
        var A;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return A;
          },
          set: function(F) {
            A = F, !c.name && !c.displayName && (c.displayName = F);
          }
        });
      }
      return b;
    }
    var re;
    re = Symbol.for("react.module.reference");
    function Ne(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === R || c === L || Te || c === f || c === E || c === j || ee || c === pe || K || U || fe || typeof c == "object" && c !== null && (c.$$typeof === Q || c.$$typeof === k || c.$$typeof === D || c.$$typeof === T || c.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === re || c.getModuleId !== void 0));
    }
    function Be(c, b) {
      Ne(c) || ye("memo: The first argument must be a component. Instead received: %s", c === null ? "null" : typeof c);
      var A = {
        $$typeof: k,
        type: c,
        compare: b === void 0 ? null : b
      };
      {
        var F;
        Object.defineProperty(A, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return F;
          },
          set: function(J) {
            F = J, !c.name && !c.displayName && (c.displayName = J);
          }
        });
      }
      return A;
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
        var A = c._context;
        A.Consumer === c ? ye("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : A.Provider === c && ye("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(c);
    }
    function xe(c) {
      var b = we();
      return b.useState(c);
    }
    function Lt(c, b, A) {
      var F = we();
      return F.useReducer(c, b, A);
    }
    function ft(c) {
      var b = we();
      return b.useRef(c);
    }
    function dt(c, b) {
      var A = we();
      return A.useEffect(c, b);
    }
    function hn(c, b) {
      var A = we();
      return A.useInsertionEffect(c, b);
    }
    function Pa(c, b) {
      var A = we();
      return A.useLayoutEffect(c, b);
    }
    function Na(c, b) {
      var A = we();
      return A.useCallback(c, b);
    }
    function Mt(c, b) {
      var A = we();
      return A.useMemo(c, b);
    }
    function mi(c, b, A) {
      var F = we();
      return F.useImperativeHandle(c, b, A);
    }
    function Ea(c, b) {
      {
        var A = we();
        return A.useDebugValue(c, b);
      }
    }
    function ze() {
      var c = we();
      return c.useTransition();
    }
    function vi(c) {
      var b = we();
      return b.useDeferredValue(c);
    }
    function rs() {
      var c = we();
      return c.useId();
    }
    function is(c, b, A) {
      var F = we();
      return F.useSyncExternalStore(c, b, A);
    }
    var Mr = 0, io, lo, oo, uo, so, ls, os;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function co() {
      {
        if (Mr === 0) {
          io = console.log, lo = console.info, oo = console.warn, uo = console.error, so = console.group, ls = console.groupCollapsed, os = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: el,
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
        Mr++;
      }
    }
    function Ba() {
      {
        if (Mr--, Mr === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ct({}, c, {
              value: io
            }),
            info: Ct({}, c, {
              value: lo
            }),
            warn: Ct({}, c, {
              value: oo
            }),
            error: Ct({}, c, {
              value: uo
            }),
            group: Ct({}, c, {
              value: so
            }),
            groupCollapsed: Ct({}, c, {
              value: ls
            }),
            groupEnd: Ct({}, c, {
              value: os
            })
          });
        }
        Mr < 0 && ye("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var hi = je.ReactCurrentDispatcher, Ar;
    function tl(c, b, A) {
      {
        if (Ar === void 0)
          try {
            throw Error();
          } catch (J) {
            var F = J.stack.trim().match(/\n( *(at )?)/);
            Ar = F && F[1] || "";
          }
        return `
` + Ar + c;
      }
    }
    var gi = !1, nl;
    {
      var fo = typeof WeakMap == "function" ? WeakMap : Map;
      nl = new fo();
    }
    function us(c, b) {
      if (!c || gi)
        return "";
      {
        var A = nl.get(c);
        if (A !== void 0)
          return A;
      }
      var F;
      gi = !0;
      var J = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = hi.current, hi.current = null, co();
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
            Reflect.construct(c, [], me);
          } else {
            try {
              me.call();
            } catch (Tt) {
              F = Tt;
            }
            c.call(me.prototype);
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
                    return c.displayName && ut.includes("<anonymous>") && (ut = ut.replace("<anonymous>", c.displayName)), typeof c == "function" && nl.set(c, ut), ut;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        gi = !1, hi.current = Re, Ba(), Error.prepareStackTrace = J;
      }
      var He = c ? c.displayName || c.name : "", vt = He ? tl(He) : "";
      return typeof c == "function" && nl.set(c, vt), vt;
    }
    function po(c, b, A) {
      return us(c, !1);
    }
    function xf(c) {
      var b = c.prototype;
      return !!(b && b.isReactComponent);
    }
    function yi(c, b, A) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return us(c, xf(c));
      if (typeof c == "string")
        return tl(c);
      switch (c) {
        case E:
          return tl("Suspense");
        case j:
          return tl("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case M:
            return po(c.render);
          case k:
            return yi(c.type, b, A);
          case Q: {
            var F = c, J = F._payload, Re = F._init;
            try {
              return yi(Re(J), b, A);
            } catch {
            }
          }
        }
      return "";
    }
    var ss = {}, mo = je.ReactDebugCurrentFrame;
    function Qe(c) {
      if (c) {
        var b = c._owner, A = yi(c.type, c._source, b ? b.type : null);
        mo.setExtraStackFrame(A);
      } else
        mo.setExtraStackFrame(null);
    }
    function Sf(c, b, A, F, J) {
      {
        var Re = Function.call.bind(mn);
        for (var me in c)
          if (Re(c, me)) {
            var Me = void 0;
            try {
              if (typeof c[me] != "function") {
                var $e = Error((F || "React class") + ": " + A + " type `" + me + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[me] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Me = c[me](b, me, F, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Me = tt;
            }
            Me && !(Me instanceof Error) && (Qe(J), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", A, me, typeof Me), Qe(null)), Me instanceof Error && !(Me.message in ss) && (ss[Me.message] = !0, Qe(J), ye("Failed %s type: %s", A, Me.message), Qe(null));
          }
      }
    }
    function ir(c) {
      if (c) {
        var b = c._owner, A = yi(c.type, c._source, b ? b.type : null);
        Z(A);
      } else
        Z(null);
    }
    var Ve;
    Ve = !1;
    function vo() {
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
        var b = c.fileName.replace(/^.*[\\\/]/, ""), A = c.lineNumber;
        return `

Check your code at ` + b + ":" + A + ".";
      }
      return "";
    }
    function bi(c) {
      return c != null ? Tn(c.__source) : "";
    }
    var Vr = {};
    function Rf(c) {
      var b = vo();
      if (!b) {
        var A = typeof c == "string" ? c : c.displayName || c.name;
        A && (b = `

Check the top-level render call using <` + A + ">.");
      }
      return b;
    }
    function It(c, b) {
      if (!(!c._store || c._store.validated || c.key != null)) {
        c._store.validated = !0;
        var A = Rf(b);
        if (!Vr[A]) {
          Vr[A] = !0;
          var F = "";
          c && c._owner && c._owner !== ge.current && (F = " It was passed a child from " + Un(c._owner.type) + "."), ir(c), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, F), ir(null);
        }
      }
    }
    function mt(c, b) {
      if (typeof c == "object") {
        if (Bt(c))
          for (var A = 0; A < c.length; A++) {
            var F = c[A];
            gt(F) && It(F, b);
          }
        else if (gt(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var J = Y(c);
          if (typeof J == "function" && J !== c.entries)
            for (var Re = J.call(c), me; !(me = Re.next()).done; )
              gt(me.value) && It(me.value, b);
        }
      }
    }
    function cs(c) {
      {
        var b = c.type;
        if (b == null || typeof b == "string")
          return;
        var A;
        if (typeof b == "function")
          A = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === M || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === k))
          A = b.propTypes;
        else
          return;
        if (A) {
          var F = Un(b);
          Sf(A, c.props, "prop", F, c);
        } else if (b.PropTypes !== void 0 && !Ve) {
          Ve = !0;
          var J = Un(b);
          ye("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", J || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ye("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(c) {
      {
        for (var b = Object.keys(c.props), A = 0; A < b.length; A++) {
          var F = b[A];
          if (F !== "children" && F !== "key") {
            ir(c), ye("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), ir(null);
            break;
          }
        }
        c.ref !== null && (ir(c), ye("Invalid attribute `ref` supplied to `React.Fragment`."), ir(null));
      }
    }
    function jn(c, b, A) {
      var F = Ne(c);
      if (!F) {
        var J = "";
        (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (J += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = bi(b);
        Re ? J += Re : J += vo();
        var me;
        c === null ? me = "null" : Bt(c) ? me = "array" : c !== void 0 && c.$$typeof === g ? (me = "<" + (Un(c.type) || "Unknown") + " />", J = " Did you accidentally export a JSX literal instead of a component?") : me = typeof c, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", me, J);
      }
      var Me = Fe.apply(this, arguments);
      if (Me == null)
        return Me;
      if (F)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], c);
      return c === R ? la(Me) : cs(Me), Me;
    }
    var xa = !1;
    function Cf(c) {
      var b = jn.bind(null, c);
      return b.type = c, xa || (xa = !0, Le("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return Le("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: c
          }), c;
        }
      }), b;
    }
    function ho(c, b, A) {
      for (var F = ct.apply(this, arguments), J = 2; J < arguments.length; J++)
        mt(arguments[J], F.type);
      return cs(F), F;
    }
    function fs(c, b) {
      var A = q.transition;
      q.transition = {};
      var F = q.transition;
      q.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        c();
      } finally {
        if (q.transition = A, A === null && F._updatedFibers) {
          var J = F._updatedFibers.size;
          J > 10 && Le("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
        }
      }
    }
    var go = !1, al = null;
    function Df(c) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), A = o && o[b];
          al = A.call(o, "timers").setImmediate;
        } catch {
          al = function(J) {
            go === !1 && (go = !0, typeof MessageChannel > "u" && ye("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = J, Re.port2.postMessage(void 0);
          };
        }
      return al(c);
    }
    var kr = 0, Ni = !1;
    function yo(c) {
      {
        var b = kr;
        kr++, P.current === null && (P.current = []);
        var A = P.isBatchingLegacy, F;
        try {
          if (P.isBatchingLegacy = !0, F = c(), !A && P.didScheduleLegacyUpdate) {
            var J = P.current;
            J !== null && (P.didScheduleLegacyUpdate = !1, ll(J));
          }
        } catch (He) {
          throw lr(b), He;
        } finally {
          P.isBatchingLegacy = A;
        }
        if (F !== null && typeof F == "object" && typeof F.then == "function") {
          var Re = F, me = !1, Me = {
            then: function(He, vt) {
              me = !0, Re.then(function(Tt) {
                lr(b), kr === 0 ? rl(Tt, He, vt) : He(Tt);
              }, function(Tt) {
                lr(b), vt(Tt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            me || (Ni = !0, ye("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Me;
        } else {
          var $e = F;
          if (lr(b), kr === 0) {
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
    function lr(c) {
      c !== kr - 1 && ye("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), kr = c;
    }
    function rl(c, b, A) {
      {
        var F = P.current;
        if (F !== null)
          try {
            ll(F), Df(function() {
              F.length === 0 ? (P.current = null, b(c)) : rl(c, b, A);
            });
          } catch (J) {
            A(J);
          }
        else
          b(c);
      }
    }
    var il = !1;
    function ll(c) {
      if (!il) {
        il = !0;
        var b = 0;
        try {
          for (; b < c.length; b++) {
            var A = c[b];
            do
              A = A(!0);
            while (A !== null);
          }
          c.length = 0;
        } catch (F) {
          throw c = c.slice(b + 1), F;
        } finally {
          il = !1;
        }
      }
    }
    var ds = jn, ps = ho, bo = Cf, ms = {
      map: rr,
      forEach: fi,
      count: ro,
      toArray: Ji,
      only: Zi
    };
    p.Children = ms, p.Component = Xt, p.Fragment = R, p.Profiler = L, p.PureComponent = Zt, p.StrictMode = f, p.Suspense = E, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = je, p.act = yo, p.cloneElement = ps, p.createContext = di, p.createElement = ds, p.createFactory = bo, p.createRef = tn, p.forwardRef = G, p.isValidElement = gt, p.lazy = N, p.memo = Be, p.startTransition = fs, p.unstable_act = yo, p.useCallback = Na, p.useContext = ke, p.useDebugValue = Ea, p.useDeferredValue = vi, p.useEffect = dt, p.useId = rs, p.useImperativeHandle = mi, p.useInsertionEffect = hn, p.useLayoutEffect = Pa, p.useMemo = Mt, p.useReducer = Lt, p.useRef = ft, p.useState = xe, p.useSyncExternalStore = is, p.useTransition = ze, p.version = v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(yf, yf.exports);
var tw = yf.exports;
hE.exports = tw;
var C = hE.exports;
const nw = /* @__PURE__ */ ew(C), aw = /* @__PURE__ */ Z1({
  __proto__: null,
  default: nw
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
  var o = C, p = Symbol.for("react.element"), v = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), L = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), Q = Symbol.iterator, pe = "@@iterator";
  function ne(N) {
    if (N === null || typeof N != "object")
      return null;
    var G = Q && N[Q] || N[pe];
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
  function K(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === R || X || N === y || N === T || N === M || ue || N === k || q || P || ge || typeof N == "object" && N !== null && (N.$$typeof === j || N.$$typeof === E || N.$$typeof === f || N.$$typeof === L || N.$$typeof === D || // This needs to include all possible module reference object
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
      case v:
        return "Portal";
      case R:
        return "Profiler";
      case y:
        return "StrictMode";
      case T:
        return "Suspense";
      case M:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case L:
          var G = N;
          return fe(G) + ".Consumer";
        case f:
          var re = N;
          return fe(re._context) + ".Provider";
        case D:
          return U(N, N.render, "ForwardRef");
        case E:
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
  var Te = Object.assign, je = 0, Le, ye, Je, pn, Kt, Sn, Ct;
  function In() {
  }
  In.__reactDisabledLog = !0;
  function Xt() {
    {
      if (je === 0) {
        Le = console.log, ye = console.info, Je = console.warn, pn = console.error, Kt = console.group, Sn = console.groupCollapsed, Ct = console.groupEnd;
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
            value: Kt
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
        for (var xe = Mt.stack.split(`
`), Lt = Ne.stack.split(`
`), ft = xe.length - 1, dt = Lt.length - 1; ft >= 1 && dt >= 0 && xe[ft] !== Lt[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (xe[ft] !== Lt[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || xe[ft] !== Lt[dt]) {
                  var hn = `
` + xe[ft].replace(" at new ", " at ");
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
      case M:
        return Jt("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case D:
          return Bt(N.render);
        case E:
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
  var Yt = Object.prototype.hasOwnProperty, aa = {}, nr = ve.ReactDebugCurrentFrame;
  function ha(N) {
    if (N) {
      var G = N._owner, re = $t(N.type, N._source, G ? G.type : null);
      nr.setExtraStackFrame(re);
    } else
      nr.setExtraStackFrame(null);
  }
  function Un(N, G, re, Ne, Be) {
    {
      var we = Function.call.bind(Yt);
      for (var ke in N)
        if (we(N, ke)) {
          var xe = void 0;
          try {
            if (typeof N[ke] != "function") {
              var Lt = Error((Ne || "React class") + ": " + re + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Lt.name = "Invariant Violation", Lt;
            }
            xe = N[ke](G, ke, Ne, re, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            xe = ft;
          }
          xe && !(xe instanceof Error) && (ha(Be), Y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", re, ke, typeof xe), ha(null)), xe instanceof Error && !(xe.message in aa) && (aa[xe.message] = !0, ha(Be), Y("Failed %s type: %s", re, xe.message), ha(null));
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
  var Fn = ve.ReactCurrentOwner, Lr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ar, ae, be;
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
        ar || (ar = !0, Y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
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
    var xe = {
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
    return xe._store = {}, Object.defineProperty(xe._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(xe, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ne
    }), Object.defineProperty(xe, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Be
    }), Object.freeze && (Object.freeze(xe.props), Object.freeze(xe)), xe;
  };
  function Nt(N, G, re, Ne, Be) {
    {
      var we, ke = {}, xe = null, Lt = null;
      re !== void 0 && (Dn(re), xe = "" + re), et(G) && (Dn(G.key), xe = "" + G.key), Fe(G) && (Lt = G.ref, ct(G, Be));
      for (we in G)
        Yt.call(G, we) && !Lr.hasOwnProperty(we) && (ke[we] = G[we]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (we in ft)
          ke[we] === void 0 && (ke[we] = ft[we]);
      }
      if (xe || Lt) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        xe && gt(ke, dt), Lt && yt(ke, dt);
      }
      return vn(N, xe, Lt, Be, Ne, Fn.current, ke);
    }
  }
  var it = ve.ReactCurrentOwner, Et = ve.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var G = N._owner, re = $t(N.type, N._source, G ? G.type : null);
      Et.setExtraStackFrame(re);
    } else
      Et.setExtraStackFrame(null);
  }
  var ya;
  ya = !1;
  function ra(N) {
    return typeof N == "object" && N !== null && N.$$typeof === p;
  }
  function rr() {
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
  var fi = {};
  function Ji(N) {
    {
      var G = rr();
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
      if (fi[re])
        return;
      fi[re] = !0;
      var Ne = "";
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + ee(N._owner.type) + "."), ga(N), Y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', re, Ne), ga(null);
    }
  }
  function di(N, G) {
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
      else if (typeof G == "object" && (G.$$typeof === D || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      G.$$typeof === E))
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
      var ke = K(N);
      if (!ke) {
        var xe = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (xe += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Lt = ro(Be);
        Lt ? xe += Lt : xe += rr();
        var ft;
        N === null ? ft = "null" : nn(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (ee(N.type) || "Unknown") + " />", xe = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, Y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, xe);
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
                di(hn[Pa], N);
              Object.freeze && Object.freeze(hn);
            } else
              Y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            di(hn, N);
      }
      if (Yt.call(G, "key")) {
        var Na = ee(N), Mt = Object.keys(G).filter(function(ze) {
          return ze !== "key";
        }), mi = Mt.length > 0 ? "{key: someKey, " + Mt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Na + mi]) {
          var Ea = Mt.length > 0 ? "{" + Mt.join(": ..., ") + ": ...}" : "{}";
          Y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, Na, Ea, Na), qn[Na + mi] = !0;
        }
      }
      return N === g ? ia(dt) : ba(dt), dt;
    }
  }
  var pi = Ha;
  Lv.Fragment = g, Lv.jsxDEV = pi;
})();
vE.exports = Lv;
var d = vE.exports, gE = { exports: {} }, ta = {}, yE = { exports: {} }, bE = {};
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
    function g(ae, be) {
      var Fe = ae.length;
      ae.push(be), f(ae, be, Fe);
    }
    function y(ae) {
      return ae.length === 0 ? null : ae[0];
    }
    function R(ae) {
      if (ae.length === 0)
        return null;
      var be = ae[0], Fe = ae.pop();
      return Fe !== be && (ae[0] = Fe, L(ae, Fe, 0)), be;
    }
    function f(ae, be, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, gt = ae[ct];
        if (D(gt, be) > 0)
          ae[ct] = be, ae[et] = gt, et = ct;
        else
          return;
      }
    }
    function L(ae, be, Fe) {
      for (var et = Fe, ct = ae.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, vn = ae[yt], Nt = yt + 1, it = ae[Nt];
        if (D(vn, be) < 0)
          Nt < ct && D(it, vn) < 0 ? (ae[et] = it, ae[Nt] = be, et = Nt) : (ae[et] = vn, ae[yt] = be, et = yt);
        else if (Nt < ct && D(it, be) < 0)
          ae[et] = it, ae[Nt] = be, et = Nt;
        else
          return;
      }
    }
    function D(ae, be) {
      var Fe = ae.sortIndex - be.sortIndex;
      return Fe !== 0 ? Fe : ae.id - be.id;
    }
    var T = 1, M = 2, E = 3, j = 4, k = 5;
    function Q(ae, be) {
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
    var $ = 1073741823, q = -1, P = 250, ge = 5e3, ue = 1e4, X = $, Z = [], K = [], U = 1, fe = null, ee = E, Te = !1, je = !1, Le = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, pn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Kt(ae) {
      for (var be = y(K); be !== null; ) {
        if (be.callback === null)
          R(K);
        else if (be.startTime <= ae)
          R(K), be.sortIndex = be.expirationTime, g(Z, be);
        else
          return;
        be = y(K);
      }
    }
    function Sn(ae) {
      if (Le = !1, Kt(ae), !je)
        if (y(Z) !== null)
          je = !0, Ot(Ct);
        else {
          var be = y(K);
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
      for (Kt(Fe), fe = y(Z); fe !== null && !(fe.expirationTime > Fe && (!ae || nr())); ) {
        var et = fe.callback;
        if (typeof et == "function") {
          fe.callback = null, ee = fe.priorityLevel;
          var ct = fe.expirationTime <= Fe, gt = et(ct);
          Fe = o.unstable_now(), typeof gt == "function" ? fe.callback = gt : fe === y(Z) && R(Z), Kt(Fe);
        } else
          R(Z);
        fe = y(Z);
      }
      if (fe !== null)
        return !0;
      var yt = y(K);
      return yt !== null && Dn(Sn, yt.startTime - Fe), !1;
    }
    function Xt(ae, be) {
      switch (ae) {
        case T:
        case M:
        case E:
        case j:
        case k:
          break;
        default:
          ae = E;
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
        case M:
        case E:
          be = E;
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
        case M:
          yt = P;
          break;
        case k:
          yt = X;
          break;
        case j:
          yt = ue;
          break;
        case E:
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
      return ct > et ? (Nt.sortIndex = ct, g(K, Nt), y(Z) === null && Nt === y(K) && (Le ? Fn() : Le = !0, Dn(Sn, ct - et))) : (Nt.sortIndex = vn, g(Z, Nt), !je && !Te && (je = !0, Ot(Ct))), Nt;
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
    var Bt = !1, Rn = null, $t = -1, Yt = v, aa = -1;
    function nr() {
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
      ae > 0 ? Yt = Math.floor(1e3 / ae) : Yt = v;
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
    var Lr = ha, ar = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = j, o.unstable_NormalPriority = E, o.unstable_Profiling = ar, o.unstable_UserBlockingPriority = M, o.unstable_cancelCallback = tn, o.unstable_continueExecution = Zt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = en, o.unstable_next = va, o.unstable_pauseExecution = Jt, o.unstable_requestPaint = Lr, o.unstable_runWithPriority = Xt, o.unstable_scheduleCallback = Dt, o.unstable_shouldYield = nr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bE);
yE.exports = bE;
var rw = yE.exports;
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
  var o = C, p = rw, v = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function R(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      L("warn", e, n);
    }
  }
  function f(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      L("error", e, n);
    }
  }
  function L(e, t, n) {
    {
      var a = v.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var D = 0, T = 1, M = 2, E = 3, j = 4, k = 5, Q = 6, pe = 7, ne = 8, ve = 9, Y = 10, $ = 11, q = 12, P = 13, ge = 14, ue = 15, X = 16, Z = 17, K = 18, U = 19, fe = 21, ee = 22, Te = 23, je = 24, Le = 25, ye = !0, Je = !1, pn = !1, Kt = !1, Sn = !1, Ct = !0, In = !0, Xt = !0, va = !0, na = /* @__PURE__ */ new Set(), Dt = {}, Jt = {};
  function Zt(e, t) {
    en(e, t), en(e + "Capture", t);
  }
  function en(e, t) {
    Dt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Dt[e] = t;
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
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function aa(e) {
    if (Rn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  function nr(e, t) {
    if (Rn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function ha(e, t) {
    if (Rn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function Un(e) {
    if (Rn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  function mn(e) {
    if (Rn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  var nn = 0, Cn = 1, za = 2, Ot = 3, Dn = 4, Fn = 5, Lr = 6, ar = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ae = ar + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + ar + "][" + ae + "]*$"), Fe = {}, et = {};
  function ct(e) {
    return kn.call(et, e) ? !0 : kn.call(Fe, e) ? !1 : be.test(e) ? (et[e] = !0, !0) : (Fe[e] = !0, f("Invalid attribute name: `%s`", e), !1);
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
        case Lr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Nt(e) {
    return Et.hasOwnProperty(e) ? Et[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === za || t === Ot || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Et = {}, ga = [
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
    Et[e] = new it(
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
    Et[e] = new it(
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
    var t = e.replace(ya, ra);
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
    var t = e.replace(ya, ra);
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
  var rr = "xlinkHref";
  Et[rr] = new it(
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
  var ro = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, fi = !1;
  function Ji(e) {
    !fi && ro.test(e) && (fi = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
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
  function di(e, t, n, a) {
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
      var m = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(m);
      else {
        var S = r.type, x;
        S === Ot || S === Dn && n === !0 ? x = "" : (Yt(n, m), x = "" + n, r.sanitizeURL && Ji(x.toString())), h ? e.setAttributeNS(h, m, x) : e.setAttribute(m, x);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Ha = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), G = Symbol.for("react.provider"), re = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Be = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), xe = Symbol.for("react.lazy"), Lt = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Pa = Symbol.for("react.cache"), Na = Symbol.for("react.tracing_marker"), Mt = Symbol.iterator, mi = "@@iterator";
  function Ea(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Mt && e[Mt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, vi = 0, rs, is, Mr, io, lo, oo, uo;
  function so() {
  }
  so.__reactDisabledLog = !0;
  function ls() {
    {
      if (vi === 0) {
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
      vi++;
    }
  }
  function os() {
    {
      if (vi--, vi === 0) {
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
      vi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var el = v.ReactCurrentDispatcher, co;
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
  var hi = !1, Ar;
  {
    var tl = typeof WeakMap == "function" ? WeakMap : Map;
    Ar = new tl();
  }
  function gi(e, t) {
    if (!e || hi)
      return "";
    {
      var n = Ar.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    hi = !0;
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
        for (var u = V.stack.split(`
`), s = a.stack.split(`
`), m = u.length - 1, h = s.length - 1; m >= 1 && h >= 0 && u[m] !== s[h]; )
          h--;
        for (; m >= 1 && h >= 0; m--, h--)
          if (u[m] !== s[h]) {
            if (m !== 1 || h !== 1)
              do
                if (m--, h--, h < 0 || u[m] !== s[h]) {
                  var S = `
` + u[m].replace(" at new ", " at ");
                  return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && Ar.set(e, S), S;
                }
              while (m >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      hi = !1, el.current = i, os(), Error.prepareStackTrace = r;
    }
    var x = e ? e.displayName || e.name : "", O = x ? Ba(x) : "";
    return typeof e == "function" && Ar.set(e, O), O;
  }
  function nl(e, t, n) {
    return gi(e, !0);
  }
  function fo(e, t, n) {
    return gi(e, !1);
  }
  function us(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function po(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return gi(e, us(e));
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
        case xe: {
          var a = e, r = a._payload, i = a._init;
          try {
            return po(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function xf(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case k:
        return Ba(e.type);
      case X:
        return Ba("Lazy");
      case P:
        return Ba("Suspense");
      case U:
        return Ba("SuspenseList");
      case D:
      case M:
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
  function yi(e) {
    try {
      var t = "", n = e;
      do
        t += xf(n), n = n.return;
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
  function Qe(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
      case pi:
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
          return a !== null ? a : Qe(e.type) || "Memo";
        case xe: {
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
  function Sf(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function ir(e) {
    return e.displayName || "Context";
  }
  function Ve(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case je:
        return "Cache";
      case ve:
        var a = n;
        return ir(a) + ".Consumer";
      case Y:
        var r = n;
        return ir(r._context) + ".Provider";
      case K:
        return "DehydratedFragment";
      case $:
        return Sf(n, n.render, "ForwardRef");
      case pe:
        return "Fragment";
      case k:
        return n;
      case j:
        return "Portal";
      case E:
        return "Root";
      case Q:
        return "Text";
      case X:
        return Qe(n);
      case ne:
        return n === pi ? "StrictMode" : "Mode";
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
      case D:
      case Z:
      case M:
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
  var vo = v.ReactDebugCurrentFrame, Tn = null, bi = !1;
  function Vr() {
    {
      if (Tn === null)
        return null;
      var e = Tn._debugOwner;
      if (e !== null && typeof e < "u")
        return Ve(e);
    }
    return null;
  }
  function Rf() {
    return Tn === null ? "" : yi(Tn);
  }
  function It() {
    vo.getCurrentStack = null, Tn = null, bi = !1;
  }
  function mt(e) {
    vo.getCurrentStack = e === null ? null : Rf, Tn = e, bi = !1;
  }
  function cs() {
    return Tn;
  }
  function la(e) {
    bi = e;
  }
  function jn(e) {
    return "" + e;
  }
  function xa(e) {
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
    Cf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
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
  function kr(e) {
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
  function Ni(e) {
    go(e) || (e._valueTracker = kr(e));
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
  function lr(e) {
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
    ho("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !il && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component", t.type), il = !0), t.value !== void 0 && t.defaultValue !== void 0 && !rl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component", t.type), rl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: xa(t.value != null ? t.value : a),
      controlled: ps(t)
    };
  }
  function c(e, t) {
    var n = e, a = t.checked;
    a != null && ba(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = ps(t);
      !n._wrapperState.controlled && a && !ds && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ds = !0), n._wrapperState.controlled && !a && !ll && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ll = !0);
    }
    c(e, t);
    var r = xa(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = jn(r)) : n.value !== jn(r) && (n.value = jn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Re(n, t.type, r) : t.hasOwnProperty("defaultValue") && Re(n, t.type, xa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function A(e, t, n) {
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
    (t !== "number" || lr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var me = !1, Me = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Me || (Me = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !me && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), me = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", jn(xa(t.value)));
  }
  var ut = Array.isArray;
  function He(e) {
    return ut(e);
  }
  var vt;
  vt = !1;
  function Tt() {
    var e = Vr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var Ei = ["value", "defaultValue"];
  function No(e) {
    {
      ho("select", e);
      for (var t = 0; t < Ei.length; t++) {
        var n = Ei[t];
        if (e[n] != null) {
          var a = He(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Tt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Tt());
        }
      }
    }
  }
  function or(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var s = 0; s < r.length; s++) {
        var m = l.hasOwnProperty("$" + r[s].value);
        r[s].selected !== m && (r[s].selected = m), m && a && (r[s].defaultSelected = !0);
      }
    } else {
      for (var h = jn(xa(n)), S = null, x = 0; x < r.length; x++) {
        if (r[x].value === h) {
          r[x].selected = !0, a && (r[x].defaultSelected = !0);
          return;
        }
        S === null && !r[x].disabled && (S = r[x]);
      }
      S !== null && (S.selected = !0);
    }
  }
  function Eo(e, t) {
    return ze({}, t, {
      value: void 0
    });
  }
  function xo(e, t) {
    var n = e;
    No(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !vt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), vt = !0);
  }
  function Tf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? or(n, !!t.multiple, a, !1) : t.defaultValue != null && or(n, !!t.multiple, t.defaultValue, !0);
  }
  function vs(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? or(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? or(n, !!t.multiple, t.defaultValue, !0) : or(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function jf(e, t) {
    var n = e, a = t.value;
    a != null && or(n, !!t.multiple, a, !1);
  }
  var qv = !1;
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
  function Gv(e, t) {
    var n = e;
    ho("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !qv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component"), qv = !0);
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
      initialValue: xa(a)
    };
  }
  function Wv(e, t) {
    var n = e, a = xa(t.value), r = xa(t.defaultValue);
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
  function HE(e, t) {
    Wv(e, t);
  }
  var ur = "http://www.w3.org/1999/xhtml", PE = "http://www.w3.org/1998/Math/MathML", _f = "http://www.w3.org/2000/svg";
  function Of(e) {
    switch (e) {
      case "svg":
        return _f;
      case "math":
        return PE;
      default:
        return ur;
    }
  }
  function Lf(e, t) {
    return e == null || e === ur ? Of(t) : e === _f && t === "foreignObject" ? ur : e;
  }
  var BE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, hs, Kv = BE(function(e, t) {
    if (e.namespaceURI === _f && !("innerHTML" in e)) {
      hs = hs || document.createElement("div"), hs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = hs.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, sr = 3, jt = 8, cr = 9, Mf = 11, gs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === sr) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, $E = {
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
  function YE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var IE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(So).forEach(function(e) {
    IE.forEach(function(t) {
      So[YE(t, e)] = So[e];
    });
  });
  function Af(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(So.hasOwnProperty(e) && So[e]) ? t + "px" : (ha(t, e), ("" + t).trim());
  }
  var qE = /([A-Z])/g, GE = /^ms-/;
  function WE(e) {
    return e.replace(qE, "-$1").toLowerCase().replace(GE, "-ms-");
  }
  var Xv = function() {
  };
  {
    var QE = /^(?:webkit|moz|o)[A-Z]/, KE = /^-ms-/, XE = /-(.)/g, Jv = /;\s*$/, ol = {}, Vf = {}, Zv = !1, eh = !1, JE = function(e) {
      return e.replace(XE, function(t, n) {
        return n.toUpperCase();
      });
    }, ZE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        JE(e.replace(KE, "ms-"))
      ));
    }, ex = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, tx = function(e, t) {
      Vf.hasOwnProperty(t) && Vf[t] || (Vf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Jv, "")));
    }, nx = function(e, t) {
      Zv || (Zv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, ax = function(e, t) {
      eh || (eh = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Xv = function(e, t) {
      e.indexOf("-") > -1 ? ZE(e) : QE.test(e) ? ex(e) : Jv.test(t) && tx(e, t), typeof t == "number" && (isNaN(t) ? nx(e, t) : isFinite(t) || ax(e, t));
    };
  }
  var rx = Xv;
  function ix(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : WE(a)) + ":", t += Af(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function th(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || rx(a, t[a]);
        var i = Af(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function lx(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function nh(e) {
    var t = {};
    for (var n in e)
      for (var a = $E[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function ox(e, t) {
    {
      if (!t)
        return;
      var n = nh(e), a = nh(t), r = {};
      for (var i in n) {
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var s = l + "," + u;
          if (r[s])
            continue;
          r[s] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", lx(e[l]) ? "Removing" : "Updating", l, u);
        }
      }
    }
  }
  var ux = {
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
  }, sx = ze({
    menuitem: !0
  }, ux), cx = "__html";
  function kf(e, t) {
    if (t) {
      if (sx[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(cx in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
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
  }, ah = {
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
  }, ul = {}, fx = new RegExp("^(aria)-[" + ae + "]*$"), dx = new RegExp("^(aria)[A-Z][" + ae + "]*$");
  function px(e, t) {
    {
      if (kn.call(ul, t) && ul[t])
        return !0;
      if (dx.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = ah.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ul[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ul[t] = !0, !0;
      }
      if (fx.test(t)) {
        var r = t.toLowerCase(), i = ah.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ul[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ul[t] = !0, !0;
      }
    }
    return !0;
  }
  function mx(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = px(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function vx(e, t) {
    xi(e, t) || mx(e, t);
  }
  var rh = !1;
  function hx(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !rh && (rh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var ih = function() {
  };
  {
    var wn = {}, lh = /^on./, gx = /^on[^A-Z]/, yx = new RegExp("^(aria)-[" + ae + "]*$"), bx = new RegExp("^(aria)[A-Z][" + ae + "]*$");
    ih = function(e, t, n, a) {
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
        if (lh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), wn[t] = !0, !0;
      } else if (lh.test(t))
        return gx.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (yx.test(t) || bx.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), wn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), wn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), wn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), wn[t] = !0, !0;
      var s = Nt(t), m = s !== null && s.type === nn;
      if (ys.hasOwnProperty(r)) {
        var h = ys[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!m && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, s, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : m ? !0 : yt(t, n, s, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && s !== null && s.type === Ot && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var Nx = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = ih(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function Ex(e, t, n) {
    xi(e, t) || Nx(e, t, n);
  }
  var oh = 1, Uf = 2, Ro = 4, xx = oh | Uf | Ro, Co = null;
  function Sx(e) {
    Co !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Co = e;
  }
  function Rx() {
    Co === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Co = null;
  }
  function Cx(e) {
    return e === Co;
  }
  function Ff(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === sr ? t.parentNode : t;
  }
  var zf = null, sl = null, cl = null;
  function uh(e) {
    var t = Ir(e);
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
  function Dx(e) {
    zf = e;
  }
  function sh(e) {
    sl ? cl ? cl.push(e) : cl = [e] : sl = e;
  }
  function Tx() {
    return sl !== null || cl !== null;
  }
  function ch() {
    if (sl) {
      var e = sl, t = cl;
      if (sl = null, cl = null, uh(e), t)
        for (var n = 0; n < t.length; n++)
          uh(t[n]);
    }
  }
  var fh = function(e, t) {
    return e(t);
  }, dh = function() {
  }, Hf = !1;
  function jx() {
    var e = Tx();
    e && (dh(), ch());
  }
  function ph(e, t, n) {
    if (Hf)
      return e(t, n);
    Hf = !0;
    try {
      return fh(e, t, n);
    } finally {
      Hf = !1, jx();
    }
  }
  function wx(e, t, n) {
    fh = e, dh = n;
  }
  function _x(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function Ox(e, t, n) {
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
        return !!(n.disabled && _x(t));
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
    if (Ox(t, e.type, a))
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
  function mh(e, t, n, a, r, i, l, u, s) {
    var m = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, m);
    } catch (h) {
      this.onError(h);
    }
  }
  var vh = mh;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Bf = document.createElement("react");
    vh = function(t, n, a, r, i, l, u, s, m) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), S = !1, x = !0, O = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
      function z() {
        Bf.removeEventListener(H, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var ie = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        S = !0, z(), n.apply(a, ie), x = !1;
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
      if (window.addEventListener("error", w), Bf.addEventListener(H, Ee, !1), h.initEvent(H, !1, !1), Bf.dispatchEvent(h), V && Object.defineProperty(window, "event", V), S && x && (qe ? Pe && (he = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : he = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(he)), window.removeEventListener("error", w), !S)
        return z(), mh.apply(this, arguments);
    };
  }
  var Lx = vh, fl = !1, bs = null, Ns = !1, $f = null, Mx = {
    onError: function(e) {
      fl = !0, bs = e;
    }
  };
  function Yf(e, t, n, a, r, i, l, u, s) {
    fl = !1, bs = null, Lx.apply(Mx, arguments);
  }
  function Ax(e, t, n, a, r, i, l, u, s) {
    if (Yf.apply(this, arguments), fl) {
      var m = If();
      Ns || (Ns = !0, $f = m);
    }
  }
  function Vx() {
    if (Ns) {
      var e = $f;
      throw Ns = !1, $f = null, e;
    }
  }
  function kx() {
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
  function Ux(e) {
    return e._reactInternals !== void 0;
  }
  function Fx(e, t) {
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
  ), Ke = (
    /*                       */
    4
  ), Si = (
    /*                */
    16
  ), jo = (
    /*                 */
    32
  ), hh = (
    /*                     */
    64
  ), Xe = (
    /*                   */
    128
  ), fr = (
    /*            */
    256
  ), Ri = (
    /*                          */
    512
  ), ml = (
    /*                     */
    1024
  ), Ur = (
    /*                      */
    2048
  ), dr = (
    /*                    */
    4096
  ), Ci = (
    /*                   */
    8192
  ), qf = (
    /*             */
    16384
  ), zx = (
    /*               */
    32767
  ), Es = (
    /*                   */
    32768
  ), _n = (
    /*                */
    65536
  ), Gf = (
    /* */
    131072
  ), gh = (
    /*                       */
    1048576
  ), Wf = (
    /*                    */
    2097152
  ), Di = (
    /*                 */
    4194304
  ), Qf = (
    /*                */
    8388608
  ), Fr = (
    /*               */
    16777216
  ), Kf = (
    /*              */
    33554432
  ), Xf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    Ke | ml | 0
  ), Jf = wt | Ke | Si | jo | Ri | dr | Ci, wo = Ke | hh | Ri | Ci, vl = Ur | Si, pr = Di | Qf | Wf, Hx = v.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (wt | dr)) !== Ce && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === E ? n : null;
  }
  function yh(e) {
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
  function bh(e) {
    return e.tag === E ? e.stateNode.containerInfo : null;
  }
  function Px(e) {
    return Ti(e) === e;
  }
  function Bx(e) {
    {
      var t = Hx.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ve(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = dl(e);
    return r ? Ti(r) === r : !1;
  }
  function Nh(e) {
    if (Ti(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function Eh(e) {
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
        for (var s = i.child; s; ) {
          if (s === a)
            return Nh(i), e;
          if (s === r)
            return Nh(i), t;
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
  function xh(e) {
    var t = Eh(e);
    return t !== null ? Sh(t) : null;
  }
  function Sh(e) {
    if (e.tag === k || e.tag === Q)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Sh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function $x(e) {
    var t = Eh(e);
    return t !== null ? Rh(t) : null;
  }
  function Rh(e) {
    if (e.tag === k || e.tag === Q)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== j) {
        var n = Rh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Ch = p.unstable_scheduleCallback, Yx = p.unstable_cancelCallback, Ix = p.unstable_shouldYield, qx = p.unstable_requestPaint, qt = p.unstable_now, Gx = p.unstable_getCurrentPriorityLevel, xs = p.unstable_ImmediatePriority, Zf = p.unstable_UserBlockingPriority, ji = p.unstable_NormalPriority, Wx = p.unstable_LowPriority, ed = p.unstable_IdlePriority, Qx = p.unstable_yieldValue, Kx = p.unstable_setDisableYieldValue, hl = null, gn = null, oe = null, $a = !1, Sa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function Xx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      In && (e = ze({}, e, {
        getLaneLabelMap: aS,
        injectProfilingHooks: nS
      })), hl = t.inject(e), gn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function Jx(e, t) {
    if (gn && typeof gn.onScheduleFiberRoot == "function")
      try {
        gn.onScheduleFiberRoot(hl, e, t);
      } catch (n) {
        $a || ($a = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function Zx(e, t) {
    if (gn && typeof gn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Xe) === Xe;
        if (Xt) {
          var a;
          switch (t) {
            case Qn:
              a = xs;
              break;
            case vr:
              a = Zf;
              break;
            case hr:
              a = ji;
              break;
            case ws:
              a = ed;
              break;
            default:
              a = ji;
              break;
          }
          gn.onCommitFiberRoot(hl, e, a, n);
        }
      } catch (r) {
        $a || ($a = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function eS(e) {
    if (gn && typeof gn.onPostCommitFiberRoot == "function")
      try {
        gn.onPostCommitFiberRoot(hl, e);
      } catch (t) {
        $a || ($a = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function tS(e) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(hl, e);
      } catch (t) {
        $a || ($a = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof Qx == "function" && (Kx(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        $a || ($a = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function nS(e) {
    oe = e;
  }
  function aS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < nd; n++) {
        var a = SS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function rS(e) {
    oe !== null && typeof oe.markCommitStarted == "function" && oe.markCommitStarted(e);
  }
  function Dh() {
    oe !== null && typeof oe.markCommitStopped == "function" && oe.markCommitStopped();
  }
  function _o(e) {
    oe !== null && typeof oe.markComponentRenderStarted == "function" && oe.markComponentRenderStarted(e);
  }
  function gl() {
    oe !== null && typeof oe.markComponentRenderStopped == "function" && oe.markComponentRenderStopped();
  }
  function iS(e) {
    oe !== null && typeof oe.markComponentPassiveEffectMountStarted == "function" && oe.markComponentPassiveEffectMountStarted(e);
  }
  function lS() {
    oe !== null && typeof oe.markComponentPassiveEffectMountStopped == "function" && oe.markComponentPassiveEffectMountStopped();
  }
  function oS(e) {
    oe !== null && typeof oe.markComponentPassiveEffectUnmountStarted == "function" && oe.markComponentPassiveEffectUnmountStarted(e);
  }
  function uS() {
    oe !== null && typeof oe.markComponentPassiveEffectUnmountStopped == "function" && oe.markComponentPassiveEffectUnmountStopped();
  }
  function sS(e) {
    oe !== null && typeof oe.markComponentLayoutEffectMountStarted == "function" && oe.markComponentLayoutEffectMountStarted(e);
  }
  function cS() {
    oe !== null && typeof oe.markComponentLayoutEffectMountStopped == "function" && oe.markComponentLayoutEffectMountStopped();
  }
  function Th(e) {
    oe !== null && typeof oe.markComponentLayoutEffectUnmountStarted == "function" && oe.markComponentLayoutEffectUnmountStarted(e);
  }
  function jh() {
    oe !== null && typeof oe.markComponentLayoutEffectUnmountStopped == "function" && oe.markComponentLayoutEffectUnmountStopped();
  }
  function fS(e, t, n) {
    oe !== null && typeof oe.markComponentErrored == "function" && oe.markComponentErrored(e, t, n);
  }
  function dS(e, t, n) {
    oe !== null && typeof oe.markComponentSuspended == "function" && oe.markComponentSuspended(e, t, n);
  }
  function pS(e) {
    oe !== null && typeof oe.markLayoutEffectsStarted == "function" && oe.markLayoutEffectsStarted(e);
  }
  function mS() {
    oe !== null && typeof oe.markLayoutEffectsStopped == "function" && oe.markLayoutEffectsStopped();
  }
  function vS(e) {
    oe !== null && typeof oe.markPassiveEffectsStarted == "function" && oe.markPassiveEffectsStarted(e);
  }
  function hS() {
    oe !== null && typeof oe.markPassiveEffectsStopped == "function" && oe.markPassiveEffectsStopped();
  }
  function wh(e) {
    oe !== null && typeof oe.markRenderStarted == "function" && oe.markRenderStarted(e);
  }
  function gS() {
    oe !== null && typeof oe.markRenderYielded == "function" && oe.markRenderYielded();
  }
  function _h() {
    oe !== null && typeof oe.markRenderStopped == "function" && oe.markRenderStopped();
  }
  function yS(e) {
    oe !== null && typeof oe.markRenderScheduled == "function" && oe.markRenderScheduled(e);
  }
  function bS(e, t) {
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
  ), xt = (
    /*               */
    8
  ), Ya = (
    /*              */
    16
  ), Oh = Math.clz32 ? Math.clz32 : xS, NS = Math.log, ES = Math.LN2;
  function xS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (NS(t) / ES | 0) | 0;
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
  ), mr = (
    /*             */
    4
  ), wi = (
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
  ), Ed = (
    /*                             */
    67108864
  ), Lh = Nl, Mo = (
    /*          */
    134217728
  ), Mh = (
    /*                          */
    268435455
  ), Ao = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), Gn = (
    /*                   */
    1073741824
  );
  function SS(e) {
    {
      if (e & _e)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & mr)
        return "InputContinuous";
      if (e & wi)
        return "DefaultHydration";
      if (e & Ia)
        return "Default";
      if (e & Oo)
        return "TransitionHydration";
      if (e & bl)
        return "Transition";
      if (e & Ss)
        return "Retry";
      if (e & Mo)
        return "SelectiveHydration";
      if (e & Ao)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & Gn)
        return "Offscreen";
    }
  }
  var st = -1, Rs = Lo, Cs = Nl;
  function Vo(e) {
    switch (Oi(e)) {
      case _e:
        return _e;
      case yl:
        return yl;
      case mr:
        return mr;
      case wi:
        return wi;
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
      case Ed:
        return e & Ss;
      case Mo:
        return Mo;
      case Ao:
        return Ao;
      case _i:
        return _i;
      case Gn:
        return Gn;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
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
        a = Vo(u);
      else {
        var s = l & i;
        s !== I && (a = Vo(s));
      }
    } else {
      var m = n & ~r;
      m !== I ? a = Vo(m) : i !== I && (a = Vo(i));
    }
    if (a === I)
      return I;
    if (t !== I && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === I) {
      var h = Oi(a), S = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= S || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === Ia && (S & bl) !== I
      )
        return t;
    }
    (a & mr) !== I && (a |= n & Ia);
    var x = e.entangledLanes;
    if (x !== I)
      for (var O = e.entanglements, V = a & x; V > 0; ) {
        var z = Li(V), ie = 1 << z;
        a |= O[z], V &= ~ie;
      }
    return a;
  }
  function RS(e, t) {
    for (var n = e.eventTimes, a = st; t > 0; ) {
      var r = Li(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function CS(e, t) {
    switch (e) {
      case _e:
      case yl:
      case mr:
        return t + 250;
      case wi:
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
      case Ed:
        return st;
      case Mo:
      case Ao:
      case _i:
      case Gn:
        return st;
      default:
        return f("Should have found matching lanes. This is a bug in React."), st;
    }
  }
  function DS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Li(l), s = 1 << u, m = i[u];
      m === st ? ((s & a) === I || (s & r) !== I) && (i[u] = CS(s, t)) : m <= t && (e.expiredLanes |= s), l &= ~s;
    }
  }
  function TS(e) {
    return Vo(e.pendingLanes);
  }
  function xd(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== I ? t : t & Gn ? Gn : I;
  }
  function jS(e) {
    return (e & _e) !== I;
  }
  function Sd(e) {
    return (e & Mh) !== I;
  }
  function Ah(e) {
    return (e & Ss) === e;
  }
  function wS(e) {
    var t = _e | mr | Ia;
    return (e & t) === I;
  }
  function _S(e) {
    return (e & bl) === e;
  }
  function Ts(e, t) {
    var n = yl | mr | wi | Ia;
    return (t & n) !== I;
  }
  function OS(e, t) {
    return (t & e.expiredLanes) !== I;
  }
  function Vh(e) {
    return (e & bl) !== I;
  }
  function kh() {
    var e = Rs;
    return Rs <<= 1, (Rs & bl) === I && (Rs = Lo), e;
  }
  function LS() {
    var e = Cs;
    return Cs <<= 1, (Cs & Ss) === I && (Cs = Nl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function ko(e) {
    return Oi(e);
  }
  function Li(e) {
    return 31 - Oh(e);
  }
  function Rd(e) {
    return Li(e);
  }
  function Wn(e, t) {
    return (e & t) !== I;
  }
  function El(e, t) {
    return (e & t) === t;
  }
  function Ue(e, t) {
    return e | t;
  }
  function js(e, t) {
    return e & ~t;
  }
  function Uh(e, t) {
    return e & t;
  }
  function F_(e) {
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
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = I, e.pingedLanes = I);
    var a = e.eventTimes, r = Rd(t);
    a[r] = n;
  }
  function AS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Li(a), i = 1 << r;
      n[r] = st, a &= ~i;
    }
  }
  function Fh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function VS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = I, e.pingedLanes = I, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Li(l), s = 1 << u;
      a[u] = I, r[u] = st, i[u] = st, l &= ~s;
    }
  }
  function Dd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Li(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function kS(e, t) {
    var n = Oi(t), a;
    switch (n) {
      case mr:
        a = yl;
        break;
      case Ia:
        a = wi;
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
      case Ed:
        a = Oo;
        break;
      case _i:
        a = Ao;
        break;
      default:
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
  }
  function zh(e, t, n) {
    if (Sa)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Rd(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Hh(e, t) {
    if (Sa)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Rd(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var s = u.alternate;
          (s === null || !a.has(s)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function Ph(e, t) {
    return null;
  }
  var Qn = _e, vr = mr, hr = Ia, ws = _i, Fo = Wt;
  function Ra() {
    return Fo;
  }
  function Qt(e) {
    Fo = e;
  }
  function US(e, t) {
    var n = Fo;
    try {
      return Fo = e, t();
    } finally {
      Fo = n;
    }
  }
  function FS(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function zS(e, t) {
    return e > t ? e : t;
  }
  function Td(e, t) {
    return e !== 0 && e < t;
  }
  function Bh(e) {
    var t = Oi(e);
    return Td(Qn, t) ? Td(vr, t) ? Sd(t) ? hr : ws : vr : Qn;
  }
  function _s(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var $h;
  function HS(e) {
    $h = e;
  }
  function PS(e) {
    $h(e);
  }
  var jd;
  function BS(e) {
    jd = e;
  }
  var Yh;
  function $S(e) {
    Yh = e;
  }
  var Ih;
  function YS(e) {
    Ih = e;
  }
  var qh;
  function IS(e) {
    qh = e;
  }
  var wd = !1, Os = [], zr = null, Hr = null, Pr = null, zo = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), Br = [], qS = [
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
  function GS(e) {
    return qS.indexOf(e) > -1;
  }
  function WS(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Gh(e, t) {
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
        Pr = null;
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
      var l = WS(t, n, a, r, i);
      if (t !== null) {
        var u = Ir(t);
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
        return zr = Po(zr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Hr = Po(Hr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var u = r;
        return Pr = Po(Pr, e, t, n, a, u), !0;
      }
      case "pointerover": {
        var s = r, m = s.pointerId;
        return zo.set(m, Po(zo.get(m) || null, e, t, n, a, s)), !0;
      }
      case "gotpointercapture": {
        var h = r, S = h.pointerId;
        return Ho.set(S, Po(Ho.get(S) || null, e, t, n, a, h)), !0;
      }
    }
    return !1;
  }
  function Wh(e) {
    var t = Vi(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === P) {
          var r = yh(n);
          if (r !== null) {
            e.blockedOn = r, qh(e.priority, function() {
              Yh(n);
            });
            return;
          }
        } else if (a === E) {
          var i = n.stateNode;
          if (_s(i)) {
            e.blockedOn = bh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function KS(e) {
    for (var t = Ih(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Br.length && Td(t, Br[a].priority); a++)
      ;
    Br.splice(a, 0, n), a === 0 && Wh(n);
  }
  function Ls(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Ld(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        Sx(i), r.target.dispatchEvent(i), Rx();
      } else {
        var l = Ir(a);
        return l !== null && jd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Qh(e, t, n) {
    Ls(e) && n.delete(t);
  }
  function XS() {
    wd = !1, zr !== null && Ls(zr) && (zr = null), Hr !== null && Ls(Hr) && (Hr = null), Pr !== null && Ls(Pr) && (Pr = null), zo.forEach(Qh), Ho.forEach(Qh);
  }
  function Bo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, wd || (wd = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, XS)));
  }
  function $o(e) {
    if (Os.length > 0) {
      Bo(Os[0], e);
      for (var t = 1; t < Os.length; t++) {
        var n = Os[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    zr !== null && Bo(zr, e), Hr !== null && Bo(Hr, e), Pr !== null && Bo(Pr, e);
    var a = function(u) {
      return Bo(u, e);
    };
    zo.forEach(a), Ho.forEach(a);
    for (var r = 0; r < Br.length; r++) {
      var i = Br[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; Br.length > 0; ) {
      var l = Br[0];
      if (l.blockedOn !== null)
        break;
      Wh(l), l.blockedOn === null && Br.shift();
    }
  }
  var xl = v.ReactCurrentBatchConfig, _d = !0;
  function Kh(e) {
    _d = !!e;
  }
  function JS() {
    return _d;
  }
  function ZS(e, t, n) {
    var a = Xh(t), r;
    switch (a) {
      case Qn:
        r = eR;
        break;
      case vr:
        r = tR;
        break;
      case hr:
      default:
        r = Od;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function eR(e, t, n, a) {
    var r = Ra(), i = xl.transition;
    xl.transition = null;
    try {
      Qt(Qn), Od(e, t, n, a);
    } finally {
      Qt(r), xl.transition = i;
    }
  }
  function tR(e, t, n, a) {
    var r = Ra(), i = xl.transition;
    xl.transition = null;
    try {
      Qt(vr), Od(e, t, n, a);
    } finally {
      Qt(r), xl.transition = i;
    }
  }
  function Od(e, t, n, a) {
    _d && nR(e, t, n, a);
  }
  function nR(e, t, n, a) {
    var r = Ld(e, t, n, a);
    if (r === null) {
      qd(e, t, a, Ms, n), Gh(e, a);
      return;
    }
    if (QS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Gh(e, a), t & Ro && GS(e)) {
      for (; r !== null; ) {
        var i = Ir(r);
        i !== null && PS(i);
        var l = Ld(e, t, n, a);
        if (l === null && qd(e, t, a, Ms, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    qd(e, t, a, null, n);
  }
  var Ms = null;
  function Ld(e, t, n, a) {
    Ms = null;
    var r = Ff(a), i = Vi(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === P) {
          var s = yh(l);
          if (s !== null)
            return s;
          i = null;
        } else if (u === E) {
          var m = l.stateNode;
          if (_s(m))
            return bh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Ms = i, null;
  }
  function Xh(e) {
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
        return vr;
      case "message": {
        var t = Gx();
        switch (t) {
          case xs:
            return Qn;
          case Zf:
            return vr;
          case ji:
          case Wx:
            return hr;
          case ed:
            return ws;
          default:
            return hr;
        }
      }
      default:
        return hr;
    }
  }
  function aR(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function rR(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function iR(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function lR(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Yo = null, Md = null, Io = null;
  function oR(e) {
    return Yo = e, Md = Zh(), !0;
  }
  function uR() {
    Yo = null, Md = null, Io = null;
  }
  function Jh() {
    if (Io)
      return Io;
    var e, t = Md, n = t.length, a, r = Zh(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return Io = r.slice(e, u), Io;
  }
  function Zh() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function As(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function Vs() {
    return !0;
  }
  function eg() {
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
      return m ? this.isDefaultPrevented = Vs : this.isDefaultPrevented = eg, this.isPropagationStopped = eg, this;
    }
    return ze(t.prototype, {
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
  var Sl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ad = Kn(Sl), qo = ze({}, Sl, {
    view: 0,
    detail: 0
  }), sR = Kn(qo), Vd, kd, Go;
  function cR(e) {
    e !== Go && (Go && e.type === "mousemove" ? (Vd = e.screenX - Go.screenX, kd = e.screenY - Go.screenY) : (Vd = 0, kd = 0), Go = e);
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
      return "movementX" in e ? e.movementX : (cR(e), Vd);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : kd;
    }
  }), tg = Kn(ks), fR = ze({}, ks, {
    dataTransfer: 0
  }), dR = Kn(fR), pR = ze({}, qo, {
    relatedTarget: 0
  }), Ud = Kn(pR), mR = ze({}, Sl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vR = Kn(mR), hR = ze({}, Sl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), gR = Kn(hR), yR = ze({}, Sl, {
    data: 0
  }), ng = Kn(yR), bR = ng, NR = {
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
  function xR(e) {
    if (e.key) {
      var t = NR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = As(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? ER[e.keyCode] || "Unidentified" : "";
  }
  var SR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function RR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = SR[e];
    return a ? !!n[a] : !1;
  }
  function Fd(e) {
    return RR;
  }
  var CR = ze({}, qo, {
    key: xR,
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
      return e.type === "keypress" ? As(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? As(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), DR = Kn(CR), TR = ze({}, ks, {
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
  }), ag = Kn(TR), jR = ze({}, qo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fd
  }), wR = Kn(jR), _R = ze({}, Sl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), OR = Kn(_R), LR = ze({}, ks, {
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
  }), MR = Kn(LR), AR = [9, 13, 27, 32], rg = 229, zd = tn && "CompositionEvent" in window, Wo = null;
  tn && "documentMode" in document && (Wo = document.documentMode);
  var VR = tn && "TextEvent" in window && !Wo, ig = tn && (!zd || Wo && Wo > 8 && Wo <= 11), lg = 32, og = String.fromCharCode(lg);
  function kR() {
    Zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Zt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var ug = !1;
  function UR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function FR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function zR(e, t) {
    return e === "keydown" && t.keyCode === rg;
  }
  function sg(e, t) {
    switch (e) {
      case "keyup":
        return AR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== rg;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function fg(e) {
    return e.locale === "ko";
  }
  var Rl = !1;
  function HR(e, t, n, a, r) {
    var i, l;
    if (zd ? i = FR(t) : Rl ? sg(t, a) && (i = "onCompositionEnd") : zR(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ig && !fg(a) && (!Rl && i === "onCompositionStart" ? Rl = oR(r) : i === "onCompositionEnd" && Rl && (l = Jh()));
    var u = Ps(n, i);
    if (u.length > 0) {
      var s = new ng(i, t, null, a, r);
      if (e.push({
        event: s,
        listeners: u
      }), l)
        s.data = l;
      else {
        var m = cg(a);
        m !== null && (s.data = m);
      }
    }
  }
  function PR(e, t) {
    switch (e) {
      case "compositionend":
        return cg(t);
      case "keypress":
        var n = t.which;
        return n !== lg ? null : (ug = !0, og);
      case "textInput":
        var a = t.data;
        return a === og && ug ? null : a;
      default:
        return null;
    }
  }
  function BR(e, t) {
    if (Rl) {
      if (e === "compositionend" || !zd && sg(e, t)) {
        var n = Jh();
        return uR(), Rl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!UR(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ig && !fg(t) ? null : t.data;
      default:
        return null;
    }
  }
  function $R(e, t, n, a, r) {
    var i;
    if (VR ? i = PR(t, a) : i = BR(t, a), !i)
      return null;
    var l = Ps(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new bR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
    }
  }
  function YR(e, t, n, a, r, i, l) {
    HR(e, t, n, a, r), $R(e, t, n, a, r);
  }
  var IR = {
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
  function dg(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!IR[e.type] : t === "textarea";
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
  function qR(e) {
    if (!tn)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function GR() {
    Zt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function pg(e, t, n, a) {
    sh(a);
    var r = Ps(t, "onChange");
    if (r.length > 0) {
      var i = new Ad("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Qo = null, Ko = null;
  function WR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function QR(e) {
    var t = [];
    pg(t, Ko, e, Ff(e)), ph(KR, t);
  }
  function KR(e) {
    Og(e, 0);
  }
  function Us(e) {
    var t = _l(e);
    if (yo(t))
      return e;
  }
  function XR(e, t) {
    if (e === "change")
      return t;
  }
  var mg = !1;
  tn && (mg = qR("input") && (!document.documentMode || document.documentMode > 9));
  function JR(e, t) {
    Qo = e, Ko = t, Qo.attachEvent("onpropertychange", hg);
  }
  function vg() {
    Qo && (Qo.detachEvent("onpropertychange", hg), Qo = null, Ko = null);
  }
  function hg(e) {
    e.propertyName === "value" && Us(Ko) && QR(e);
  }
  function ZR(e, t, n) {
    e === "focusin" ? (vg(), JR(t, n)) : e === "focusout" && vg();
  }
  function e0(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Us(Ko);
  }
  function t0(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function n0(e, t) {
    if (e === "click")
      return Us(t);
  }
  function a0(e, t) {
    if (e === "input" || e === "change")
      return Us(t);
  }
  function r0(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function i0(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window, s, m;
    if (WR(u) ? s = XR : dg(u) ? mg ? s = a0 : (s = e0, m = ZR) : t0(u) && (s = n0), s) {
      var h = s(t, n);
      if (h) {
        pg(e, h, a, r);
        return;
      }
    }
    m && m(t, u, n), t === "focusout" && r0(u);
  }
  function l0() {
    en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function o0(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", s = t === "mouseout" || t === "pointerout";
    if (u && !Cx(a)) {
      var m = a.relatedTarget || a.fromElement;
      if (m && (Vi(m) || fu(m)))
        return;
    }
    if (!(!s && !u)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var S = r.ownerDocument;
        S ? h = S.defaultView || S.parentWindow : h = window;
      }
      var x, O;
      if (s) {
        var V = a.relatedTarget || a.toElement;
        if (x = n, O = V ? Vi(V) : null, O !== null) {
          var z = Ti(O);
          (O !== z || O.tag !== k && O.tag !== Q) && (O = null);
        }
      } else
        x = null, O = n;
      if (x !== O) {
        var ie = tg, Ee = "onMouseLeave", he = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (ie = ag, Ee = "onPointerLeave", he = "onPointerEnter", qe = "pointer");
        var Pe = x == null ? h : _l(x), w = O == null ? h : _l(O), H = new ie(Ee, qe + "leave", x, a, r);
        H.target = Pe, H.relatedTarget = w;
        var _ = null, W = Vi(r);
        if (W === n) {
          var ce = new ie(he, qe + "enter", O, a, r);
          ce.target = w, ce.relatedTarget = Pe, _ = ce;
        }
        O0(e, H, _, x, O);
      }
    }
  }
  function u0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Xn = typeof Object.is == "function" ? Object.is : u0;
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
  function gg(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function s0(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function yg(e, t) {
    for (var n = gg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === sr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = gg(s0(n));
    }
  }
  function c0(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return f0(e, r, i, l, u);
  }
  function f0(e, t, n, a, r) {
    var i = 0, l = -1, u = -1, s = 0, m = 0, h = e, S = null;
    e: for (; ; ) {
      for (var x = null; h === t && (n === 0 || h.nodeType === sr) && (l = i + n), h === a && (r === 0 || h.nodeType === sr) && (u = i + r), h.nodeType === sr && (i += h.nodeValue.length), (x = h.firstChild) !== null; )
        S = h, h = x;
      for (; ; ) {
        if (h === e)
          break e;
        if (S === t && ++s === n && (l = i), S === a && ++m === r && (u = i), (x = h.nextSibling) !== null)
          break;
        h = S, S = h.parentNode;
      }
      h = x;
    }
    return l === -1 || u === -1 ? null : {
      start: l,
      end: u
    };
  }
  function d0(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var s = u;
        u = l, l = s;
      }
      var m = yg(e, l), h = yg(e, u);
      if (m && h) {
        if (r.rangeCount === 1 && r.anchorNode === m.node && r.anchorOffset === m.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var S = n.createRange();
        S.setStart(m.node, m.offset), r.removeAllRanges(), l > u ? (r.addRange(S), r.extend(h.node, h.offset)) : (S.setEnd(h.node, h.offset), r.addRange(S));
      }
    }
  }
  function bg(e) {
    return e && e.nodeType === sr;
  }
  function Ng(e, t) {
    return !e || !t ? !1 : e === t ? !0 : bg(e) ? !1 : bg(t) ? Ng(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function p0(e) {
    return e && e.ownerDocument && Ng(e.ownerDocument.documentElement, e);
  }
  function m0(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function Eg() {
    for (var e = window, t = lr(); t instanceof e.HTMLIFrameElement; ) {
      if (m0(t))
        e = t.contentWindow;
      else
        return t;
      t = lr(e.document);
    }
    return t;
  }
  function Hd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function v0() {
    var e = Eg();
    return {
      focusedElem: e,
      selectionRange: Hd(e) ? g0(e) : null
    };
  }
  function h0(e) {
    var t = Eg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && p0(n)) {
      a !== null && Hd(n) && y0(n, a);
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
  function g0(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = c0(e), t || {
      start: 0,
      end: 0
    };
  }
  function y0(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : d0(e, t);
  }
  var b0 = tn && "documentMode" in document && document.documentMode <= 11;
  function N0() {
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
  function x0(e) {
    return e.window === e ? e.document : e.nodeType === cr ? e : e.ownerDocument;
  }
  function xg(e, t, n) {
    var a = x0(n);
    if (!(Bd || Cl == null || Cl !== lr(a))) {
      var r = E0(Cl);
      if (!Jo || !Xo(Jo, r)) {
        Jo = r;
        var i = Ps(Pd, "onSelect");
        if (i.length > 0) {
          var l = new Ad("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Cl;
        }
      }
    }
  }
  function S0(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window;
    switch (t) {
      case "focusin":
        (dg(u) || u.contentEditable === "true") && (Cl = u, Pd = n, Jo = null);
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
        Bd = !1, xg(e, a, r);
        break;
      case "selectionchange":
        if (b0)
          break;
      case "keydown":
      case "keyup":
        xg(e, a, r);
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
  }, $d = {}, Sg = {};
  tn && (Sg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
  function zs(e) {
    if ($d[e])
      return $d[e];
    if (!Dl[e])
      return e;
    var t = Dl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Sg)
        return $d[e] = t[n];
    return e;
  }
  var Rg = zs("animationend"), Cg = zs("animationiteration"), Dg = zs("animationstart"), Tg = zs("transitionend"), jg = /* @__PURE__ */ new Map(), wg = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function $r(e, t) {
    jg.set(e, t), Zt(t, [e]);
  }
  function R0() {
    for (var e = 0; e < wg.length; e++) {
      var t = wg[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      $r(n, "on" + a);
    }
    $r(Rg, "onAnimationEnd"), $r(Cg, "onAnimationIteration"), $r(Dg, "onAnimationStart"), $r("dblclick", "onDoubleClick"), $r("focusin", "onFocus"), $r("focusout", "onBlur"), $r(Tg, "onTransitionEnd");
  }
  function C0(e, t, n, a, r, i, l) {
    var u = jg.get(t);
    if (u !== void 0) {
      var s = Ad, m = t;
      switch (t) {
        case "keypress":
          if (As(a) === 0)
            return;
        case "keydown":
        case "keyup":
          s = DR;
          break;
        case "focusin":
          m = "focus", s = Ud;
          break;
        case "focusout":
          m = "blur", s = Ud;
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
          s = tg;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          s = dR;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          s = wR;
          break;
        case Rg:
        case Cg:
        case Dg:
          s = vR;
          break;
        case Tg:
          s = OR;
          break;
        case "scroll":
          s = sR;
          break;
        case "wheel":
          s = MR;
          break;
        case "copy":
        case "cut":
        case "paste":
          s = gR;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          s = ag;
          break;
      }
      var h = (i & Ro) !== 0;
      {
        var S = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", x = w0(n, u, a.type, h, S);
        if (x.length > 0) {
          var O = new s(u, m, null, a, r);
          e.push({
            event: O,
            listeners: x
          });
        }
      }
    }
  }
  R0(), l0(), GR(), N0(), kR();
  function D0(e, t, n, a, r, i, l) {
    C0(e, t, n, a, r, i);
    var u = (i & xx) === 0;
    u && (o0(e, t, n, a, r), i0(e, t, n, a, r), S0(e, t, n, a, r), YR(e, t, n, a, r));
  }
  var Zo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Yd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Zo));
  function _g(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, Ax(a, t, void 0, e), e.currentTarget = null;
  }
  function T0(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, s = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        _g(e, s, u), a = l;
      }
    else
      for (var m = 0; m < t.length; m++) {
        var h = t[m], S = h.instance, x = h.currentTarget, O = h.listener;
        if (S !== a && e.isPropagationStopped())
          return;
        _g(e, O, x), a = S;
      }
  }
  function Og(e, t) {
    for (var n = (t & Ro) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      T0(i, l, n);
    }
    Vx();
  }
  function j0(e, t, n, a, r) {
    var i = Ff(n), l = [];
    D0(l, e, a, n, i, t), Og(l, t);
  }
  function pt(e, t) {
    Yd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = rD(t), r = L0(e);
    a.has(r) || (Lg(t, e, Uf, n), a.add(r));
  }
  function Id(e, t, n) {
    Yd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Ro), Lg(n, e, a, t);
  }
  var Hs = "_reactListening" + Math.random().toString(36).slice(2);
  function eu(e) {
    if (!e[Hs]) {
      e[Hs] = !0, na.forEach(function(n) {
        n !== "selectionchange" && (Yd.has(n) || Id(n, !1, e), Id(n, !0, e));
      });
      var t = e.nodeType === cr ? e : e.ownerDocument;
      t !== null && (t[Hs] || (t[Hs] = !0, Id("selectionchange", !1, t)));
    }
  }
  function Lg(e, t, n, a, r) {
    var i = ZS(e, t, n), l = void 0;
    Pf && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? iR(e, t, i, l) : rR(e, t, i) : l !== void 0 ? lR(e, t, i, l) : aR(e, t, i);
  }
  function Mg(e, t) {
    return e === t || e.nodeType === jt && e.parentNode === t;
  }
  function qd(e, t, n, a, r) {
    var i = a;
    if (!(t & oh) && !(t & Uf)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var s = u.tag;
          if (s === E || s === j) {
            var m = u.stateNode.containerInfo;
            if (Mg(m, l))
              break;
            if (s === j)
              for (var h = u.return; h !== null; ) {
                var S = h.tag;
                if (S === E || S === j) {
                  var x = h.stateNode.containerInfo;
                  if (Mg(x, l))
                    return;
                }
                h = h.return;
              }
            for (; m !== null; ) {
              var O = Vi(m);
              if (O === null)
                return;
              var V = O.tag;
              if (V === k || V === Q) {
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
    ph(function() {
      return j0(e, t, n, i);
    });
  }
  function tu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function w0(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, u = a ? l : t, s = [], m = e, h = null; m !== null; ) {
      var S = m, x = S.stateNode, O = S.tag;
      if (O === k && x !== null && (h = x, u !== null)) {
        var V = Do(m, u);
        V != null && s.push(tu(m, V, h));
      }
      if (r)
        break;
      m = m.return;
    }
    return s;
  }
  function Ps(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, u = i.tag;
      if (u === k && l !== null) {
        var s = l, m = Do(r, n);
        m != null && a.unshift(tu(r, m, s));
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
  function _0(e, t) {
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
      var s = u, m = s.alternate, h = s.stateNode, S = s.tag;
      if (m !== null && m === a)
        break;
      if (S === k && h !== null) {
        var x = h;
        if (r) {
          var O = Do(u, i);
          O != null && l.unshift(tu(u, O, x));
        } else if (!r) {
          var V = Do(u, i);
          V != null && l.push(tu(u, V, x));
        }
      }
      u = u.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function O0(e, t, n, a, r) {
    var i = a && r ? _0(a, r) : null;
    a !== null && Ag(e, t, a, i, !1), r !== null && n !== null && Ag(e, n, r, i, !0);
  }
  function L0(e, t) {
    return e + "__bubble";
  }
  var Hn = !1, nu = "dangerouslySetInnerHTML", Bs = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", Vg = "autoFocus", Mi = "children", Ai = "style", $s = "__html", Gd, Ys, au, kg, Is, Ug, Fg;
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
    vx(e, t), hx(e, t), Ex(e, t, {
      registrationNameDependencies: Dt,
      possibleRegistrationNames: Jt
    });
  }, Ug = tn && !document.documentMode, au = function(e, t, n) {
    if (!Hn) {
      var a = qs(n), r = qs(t);
      r !== a && (Hn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, kg = function(e) {
    if (!Hn) {
      Hn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, Is = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Fg = function(e, t) {
    var n = e.namespaceURI === ur ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
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
    if (i !== r && (a && (Hn || (Hn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function zg(e) {
    return e.nodeType === cr ? e : e.ownerDocument;
  }
  function V0() {
  }
  function Ws(e) {
    e.onclick = V0;
  }
  function k0(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Ai)
          l && Object.freeze(l), th(t, l);
        else if (i === nu) {
          var u = l ? l[$s] : void 0;
          u != null && Kv(t, u);
        } else if (i === Mi)
          if (typeof l == "string") {
            var s = e !== "textarea" || l !== "";
            s && gs(t, l);
          } else typeof l == "number" && gs(t, "" + l);
        else i === Bs || i === Yr || i === Vg || (Dt.hasOwnProperty(i) ? l != null && (typeof l != "function" && Is(i, l), i === "onScroll" && pt("scroll", t)) : l != null && ba(t, i, l, r));
      }
  }
  function U0(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Ai ? th(e, l) : i === nu ? Kv(e, l) : i === Mi ? gs(e, l) : ba(e, i, l, a);
    }
  }
  function F0(e, t, n, a) {
    var r, i = zg(n), l, u = a;
    if (u === ur && (u = Of(e)), u === ur) {
      if (r = xi(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
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
    return u === ur && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !kn.call(Gd, e) && (Gd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function z0(e, t) {
    return zg(t).createTextNode(e);
  }
  function H0(e, t, n, a) {
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
        xo(e, n), i = Eo(e, n), pt("invalid", e);
        break;
      case "textarea":
        Gv(e, n), i = wf(e, n), pt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (kf(t, i), k0(t, e, a, i, r), t) {
      case "input":
        Ni(e), A(e, n, !1);
        break;
      case "textarea":
        Ni(e), Qv(e);
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
  function P0(e, t, n, a, r) {
    Ys(t, a);
    var i = null, l, u;
    switch (t) {
      case "input":
        l = bo(e, n), u = bo(e, a), i = [];
        break;
      case "select":
        l = Eo(e, n), u = Eo(e, a), i = [];
        break;
      case "textarea":
        l = wf(e, n), u = wf(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ws(e);
        break;
    }
    kf(t, u);
    var s, m, h = null;
    for (s in l)
      if (!(u.hasOwnProperty(s) || !l.hasOwnProperty(s) || l[s] == null))
        if (s === Ai) {
          var S = l[s];
          for (m in S)
            S.hasOwnProperty(m) && (h || (h = {}), h[m] = "");
        } else s === nu || s === Mi || s === Bs || s === Yr || s === Vg || (Dt.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in u) {
      var x = u[s], O = l != null ? l[s] : void 0;
      if (!(!u.hasOwnProperty(s) || x === O || x == null && O == null))
        if (s === Ai)
          if (x && Object.freeze(x), O) {
            for (m in O)
              O.hasOwnProperty(m) && (!x || !x.hasOwnProperty(m)) && (h || (h = {}), h[m] = "");
            for (m in x)
              x.hasOwnProperty(m) && O[m] !== x[m] && (h || (h = {}), h[m] = x[m]);
          } else
            h || (i || (i = []), i.push(s, h)), h = x;
        else if (s === nu) {
          var V = x ? x[$s] : void 0, z = O ? O[$s] : void 0;
          V != null && z !== V && (i = i || []).push(s, V);
        } else s === Mi ? (typeof x == "string" || typeof x == "number") && (i = i || []).push(s, "" + x) : s === Bs || s === Yr || (Dt.hasOwnProperty(s) ? (x != null && (typeof x != "function" && Is(s, x), s === "onScroll" && pt("scroll", e)), !i && O !== x && (i = [])) : (i = i || []).push(s, x));
    }
    return h && (ox(h, u[Ai]), (i = i || []).push(Ai, h)), i;
  }
  function B0(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && c(e, r);
    var i = xi(n, a), l = xi(n, r);
    switch (U0(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        Wv(e, r);
        break;
      case "select":
        vs(e, r);
        break;
    }
  }
  function $0(e) {
    {
      var t = e.toLowerCase();
      return ys.hasOwnProperty(t) && ys[t] || null;
    }
  }
  function Y0(e, t, n, a, r, i, l) {
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
        for (var m = 0; m < Zo.length; m++)
          pt(Zo[m], e);
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
        xo(e, n), pt("invalid", e);
        break;
      case "textarea":
        Gv(e, n), pt("invalid", e);
        break;
    }
    kf(t, n);
    {
      s = /* @__PURE__ */ new Set();
      for (var h = e.attributes, S = 0; S < h.length; S++) {
        var x = h[S].name.toLowerCase();
        switch (x) {
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
    for (var V in n)
      if (n.hasOwnProperty(V)) {
        var z = n[V];
        if (V === Mi)
          typeof z == "string" ? e.textContent !== z && (n[Yr] !== !0 && Gs(e.textContent, z, i, l), O = [Mi, z]) : typeof z == "number" && e.textContent !== "" + z && (n[Yr] !== !0 && Gs(e.textContent, z, i, l), O = [Mi, "" + z]);
        else if (Dt.hasOwnProperty(V))
          z != null && (typeof z != "function" && Is(V, z), V === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var ie = void 0, Ee = Nt(V);
          if (n[Yr] !== !0) {
            if (!(V === Bs || V === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === nu) {
                var he = e.innerHTML, qe = z ? z[$s] : void 0;
                if (qe != null) {
                  var Pe = Fg(e, qe);
                  Pe !== he && au(V, he, Pe);
                }
              } else if (V === Ai) {
                if (s.delete(V), Ug) {
                  var w = ix(z);
                  ie = e.getAttribute("style"), w !== ie && au(V, ie, w);
                }
              } else if (u && !Sn)
                s.delete(V.toLowerCase()), ie = di(e, V, z), z !== ie && au(V, ie, z);
              else if (!gt(V, Ee, u) && !vn(V, z, Ee, u)) {
                var H = !1;
                if (Ee !== null)
                  s.delete(Ee.attributeName), ie = Zi(e, V, z, Ee);
                else {
                  var _ = a;
                  if (_ === ur && (_ = Of(t)), _ === ur)
                    s.delete(V.toLowerCase());
                  else {
                    var W = $0(V);
                    W !== null && W !== V && (H = !0, s.delete(W)), s.delete(V);
                  }
                  ie = di(e, V, z);
                }
                var ce = Sn;
                !ce && z !== ie && !H && au(V, ie, z);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    s.size > 0 && n[Yr] !== !0 && kg(s), t) {
      case "input":
        Ni(e), A(e, n, !0);
        break;
      case "textarea":
        Ni(e), Qv(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Ws(e);
        break;
    }
    return O;
  }
  function I0(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Wd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Qd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Kd(e, t, n) {
    {
      if (Hn)
        return;
      Hn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t) {
    {
      if (t === "" || Hn)
        return;
      Hn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function q0(e, t, n) {
    switch (t) {
      case "input":
        F(e, n);
        return;
      case "textarea":
        HE(e, n);
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
    var G0 = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Hg = [
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
    ], W0 = Hg.concat(["button"]), Q0 = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Pg = {
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
      var n = ze({}, e || Pg), a = {
        tag: t
      };
      return Hg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), W0.indexOf(t) !== -1 && (n.pTagInButtonScope = null), G0.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var K0 = function(e, t) {
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
    }, X0 = function(e, t) {
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
    }, Bg = {};
    ru = function(e, t, n) {
      n = n || Pg;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = K0(e, r) ? null : a, l = i ? null : X0(e, n), u = i || l;
      if (u) {
        var s = u.tag, m = !!i + "|" + e + "|" + s;
        if (!Bg[m]) {
          Bg[m] = !0;
          var h = e, S = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", S = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var x = "";
            s === "table" && e === "tr" && (x += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, s, S, x);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", h, s);
        }
      }
    };
  }
  var Qs = "suppressHydrationWarning", Ks = "$", Xs = "/$", lu = "$?", ou = "$!", J0 = "style", Jd = null, Zd = null;
  function Z0(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case cr:
      case Mf: {
        t = a === cr ? "#document" : "#fragment";
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
  function eC(e, t, n) {
    {
      var a = e, r = Lf(a.namespace, t), i = iu(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function z_(e) {
    return e;
  }
  function tC(e) {
    Jd = JS(), Zd = v0();
    var t = null;
    return Kh(!1), t;
  }
  function nC(e) {
    h0(Zd), Kh(Jd), Jd = null, Zd = null;
  }
  function aC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (ru(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, s = iu(l.ancestorInfo, e);
        ru(null, u, s);
      }
      i = l.namespace;
    }
    var m = F0(e, t, n, i);
    return cu(r, m), op(m, t), m;
  }
  function rC(e, t) {
    e.appendChild(t);
  }
  function iC(e, t, n, a, r) {
    switch (H0(e, t, n, a), t) {
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
  function lC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var u = "" + a.children, s = iu(l.ancestorInfo, t);
        ru(null, u, s);
      }
    }
    return P0(e, t, n, a);
  }
  function ep(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function oC(e, t, n, a) {
    {
      var r = n;
      ru(null, e, r.ancestorInfo);
    }
    var i = z0(e, t);
    return cu(a, i), i;
  }
  function uC() {
    var e = window.event;
    return e === void 0 ? hr : Xh(e.type);
  }
  var tp = typeof setTimeout == "function" ? setTimeout : void 0, sC = typeof clearTimeout == "function" ? clearTimeout : void 0, np = -1, $g = typeof Promise == "function" ? Promise : void 0, cC = typeof queueMicrotask == "function" ? queueMicrotask : typeof $g < "u" ? function(e) {
    return $g.resolve(null).then(e).catch(fC);
  } : tp;
  function fC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function dC(e, t, n, a) {
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
  function pC(e, t, n, a, r, i) {
    B0(e, t, n, a, r), op(e, r);
  }
  function Yg(e) {
    gs(e, "");
  }
  function mC(e, t, n) {
    e.nodeValue = n;
  }
  function vC(e, t) {
    e.appendChild(t);
  }
  function hC(e, t) {
    var n;
    e.nodeType === jt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ws(n);
  }
  function gC(e, t, n) {
    e.insertBefore(t, n);
  }
  function yC(e, t, n) {
    e.nodeType === jt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function bC(e, t) {
    e.removeChild(t);
  }
  function NC(e, t) {
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
        else (i === Ks || i === lu || i === ou) && a++;
      }
      n = r;
    } while (n);
    $o(t);
  }
  function EC(e, t) {
    e.nodeType === jt ? ap(e.parentNode, t) : e.nodeType === zn && ap(e, t), $o(e);
  }
  function xC(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function SC(e) {
    e.nodeValue = "";
  }
  function RC(e, t) {
    e = e;
    var n = t[J0], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Af("display", a);
  }
  function CC(e, t) {
    e.nodeValue = t;
  }
  function DC(e) {
    e.nodeType === zn ? e.textContent = "" : e.nodeType === cr && e.documentElement && e.removeChild(e.documentElement);
  }
  function TC(e, t, n) {
    return e.nodeType !== zn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function jC(e, t) {
    return t === "" || e.nodeType !== sr ? null : e;
  }
  function wC(e) {
    return e.nodeType !== jt ? null : e;
  }
  function Ig(e) {
    return e.data === lu;
  }
  function rp(e) {
    return e.data === ou;
  }
  function _C(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function OC(e, t) {
    e._reactRetry = t;
  }
  function Js(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === zn || t === sr)
        break;
      if (t === jt) {
        var n = e.data;
        if (n === Ks || n === ou || n === lu)
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
  function LC(e) {
    return Js(e.firstChild);
  }
  function MC(e) {
    return Js(e.firstChild);
  }
  function AC(e) {
    return Js(e.nextSibling);
  }
  function VC(e, t, n, a, r, i, l) {
    cu(i, e), op(e, n);
    var u;
    {
      var s = r;
      u = s.namespace;
    }
    var m = (i.mode & Ye) !== Se;
    return Y0(e, t, n, u, a, m, l);
  }
  function kC(e, t, n, a) {
    return cu(n, e), n.mode & Ye, I0(e, t);
  }
  function UC(e, t) {
    cu(t, e);
  }
  function FC(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Xs) {
          if (n === 0)
            return uu(t);
          n--;
        } else (a === Ks || a === ou || a === lu) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function qg(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Ks || a === ou || a === lu) {
          if (n === 0)
            return t;
          n--;
        } else a === Xs && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function zC(e) {
    $o(e);
  }
  function HC(e) {
    $o(e);
  }
  function PC(e) {
    return e !== "head" && e !== "body";
  }
  function BC(e, t, n, a) {
    var r = !0;
    Gs(t.nodeValue, n, a, r);
  }
  function $C(e, t, n, a, r, i) {
    if (t[Qs] !== !0) {
      var l = !0;
      Gs(a.nodeValue, r, i, l);
    }
  }
  function YC(e, t) {
    t.nodeType === zn ? Wd(e, t) : t.nodeType === jt || Qd(e, t);
  }
  function IC(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === zn ? Wd(n, t) : t.nodeType === jt || Qd(n, t));
    }
  }
  function qC(e, t, n, a, r) {
    (r || t[Qs] !== !0) && (a.nodeType === zn ? Wd(n, a) : a.nodeType === jt || Qd(n, a));
  }
  function GC(e, t, n) {
    Kd(e, t);
  }
  function WC(e, t) {
    Xd(e, t);
  }
  function QC(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Kd(a, t);
    }
  }
  function KC(e, t) {
    {
      var n = e.parentNode;
      n !== null && Xd(n, t);
    }
  }
  function XC(e, t, n, a, r, i) {
    (i || t[Qs] !== !0) && Kd(n, a);
  }
  function JC(e, t, n, a, r) {
    (r || t[Qs] !== !0) && Xd(n, a);
  }
  function ZC(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function eD(e) {
    eu(e);
  }
  var jl = Math.random().toString(36).slice(2), wl = "__reactFiber$" + jl, ip = "__reactProps$" + jl, su = "__reactContainer$" + jl, lp = "__reactEvents$" + jl, tD = "__reactListeners$" + jl, nD = "__reactHandles$" + jl;
  function aD(e) {
    delete e[wl], delete e[ip], delete e[lp], delete e[tD], delete e[nD];
  }
  function cu(e, t) {
    t[wl] = e;
  }
  function Zs(e, t) {
    t[su] = e;
  }
  function Gg(e) {
    e[su] = null;
  }
  function fu(e) {
    return !!e[su];
  }
  function Vi(e) {
    var t = e[wl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[su] || n[wl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = qg(e); r !== null; ) {
            var i = r[wl];
            if (i)
              return i;
            r = qg(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Ir(e) {
    var t = e[wl] || e[su];
    return t && (t.tag === k || t.tag === Q || t.tag === P || t.tag === E) ? t : null;
  }
  function _l(e) {
    if (e.tag === k || e.tag === Q)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function ec(e) {
    return e[ip] || null;
  }
  function op(e, t) {
    e[ip] = t;
  }
  function rD(e) {
    var t = e[lp];
    return t === void 0 && (t = e[lp] = /* @__PURE__ */ new Set()), t;
  }
  var Wg = {}, Qg = v.ReactDebugCurrentFrame;
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
          } catch (m) {
            u = m;
          }
          u && !(u instanceof Error) && (tc(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), tc(null)), u instanceof Error && !(u.message in Wg) && (Wg[u.message] = !0, tc(r), f("Failed %s type: %s", n, u.message), tc(null));
        }
    }
  }
  var up = [], nc;
  nc = [];
  var gr = -1;
  function qr(e) {
    return {
      current: e
    };
  }
  function yn(e, t) {
    if (gr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== nc[gr] && f("Unexpected Fiber popped."), e.current = up[gr], up[gr] = null, nc[gr] = null, gr--;
  }
  function bn(e, t, n) {
    gr++, up[gr] = e.current, nc[gr] = n, e.current = t;
  }
  var sp;
  sp = {};
  var Jn = {};
  Object.freeze(Jn);
  var yr = qr(Jn), qa = qr(!1), cp = Jn;
  function Ol(e, t, n) {
    return n && Ga(t) ? cp : yr.current;
  }
  function Kg(e, t, n) {
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
        var u = Ve(e) || "Unknown";
        Ca(a, i, "context", u);
      }
      return r && Kg(e, t, i), i;
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
    yn(qa, e), yn(yr, e);
  }
  function fp(e) {
    yn(qa, e), yn(yr, e);
  }
  function Xg(e, t, n) {
    {
      if (yr.current !== Jn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      bn(yr, t, e), bn(qa, n, e);
    }
  }
  function Jg(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Ve(e) || "Unknown";
          sp[i] || (sp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
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
  function ic(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Jn;
      return cp = yr.current, bn(yr, n, e), bn(qa, qa.current, e), !0;
    }
  }
  function Zg(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Jg(e, t, cp);
        a.__reactInternalMemoizedMergedChildContext = r, yn(qa, e), yn(yr, e), bn(yr, r, e), bn(qa, n, e);
      } else
        yn(qa, e), bn(qa, n, e);
    }
  }
  function iD(e) {
    {
      if (!Px(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case E:
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
  var Gr = 0, lc = 1, br = null, dp = !1, pp = !1;
  function ey(e) {
    br === null ? br = [e] : br.push(e);
  }
  function lD(e) {
    dp = !0, ey(e);
  }
  function ty() {
    dp && Wr();
  }
  function Wr() {
    if (!pp && br !== null) {
      pp = !0;
      var e = 0, t = Ra();
      try {
        var n = !0, a = br;
        for (Qt(Qn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        br = null, dp = !1;
      } catch (i) {
        throw br !== null && (br = br.slice(e + 1)), Ch(xs, Wr), i;
      } finally {
        Qt(t), pp = !1;
      }
    }
    return null;
  }
  var Ml = [], Al = 0, oc = null, uc = 0, oa = [], ua = 0, ki = null, Nr = 1, Er = "";
  function oD(e) {
    return Fi(), (e.flags & gh) !== Ce;
  }
  function uD(e) {
    return Fi(), uc;
  }
  function sD() {
    var e = Er, t = Nr, n = t & ~cD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Ml[Al++] = uc, Ml[Al++] = oc, oc = e, uc = t;
  }
  function ny(e, t, n) {
    Fi(), oa[ua++] = Nr, oa[ua++] = Er, oa[ua++] = ki, ki = e;
    var a = Nr, r = Er, i = sc(a) - 1, l = a & ~(1 << i), u = n + 1, s = sc(t) + i;
    if (s > 30) {
      var m = i - i % 5, h = (1 << m) - 1, S = (l & h).toString(32), x = l >> m, O = i - m, V = sc(t) + O, z = u << O, ie = z | x, Ee = S + r;
      Nr = 1 << V | ie, Er = Ee;
    } else {
      var he = u << i, qe = he | l, Pe = r;
      Nr = 1 << s | qe, Er = Pe;
    }
  }
  function mp(e) {
    Fi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ui(e, n), ny(e, n, a);
    }
  }
  function sc(e) {
    return 32 - Oh(e);
  }
  function cD(e) {
    return 1 << sc(e) - 1;
  }
  function vp(e) {
    for (; e === oc; )
      oc = Ml[--Al], Ml[Al] = null, uc = Ml[--Al], Ml[Al] = null;
    for (; e === ki; )
      ki = oa[--ua], oa[ua] = null, Er = oa[--ua], oa[ua] = null, Nr = oa[--ua], oa[ua] = null;
  }
  function fD() {
    return Fi(), ki !== null ? {
      id: Nr,
      overflow: Er
    } : null;
  }
  function dD(e, t) {
    Fi(), oa[ua++] = Nr, oa[ua++] = Er, oa[ua++] = ki, Nr = t.id, Er = t.overflow, ki = e;
  }
  function Fi() {
    rn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var an = null, sa = null, Da = !1, zi = !1, Qr = null;
  function pD() {
    Da && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function ay() {
    zi = !0;
  }
  function mD() {
    return zi;
  }
  function vD(e) {
    var t = e.stateNode.containerInfo;
    return sa = MC(t), an = e, Da = !0, Qr = null, zi = !1, !0;
  }
  function hD(e, t, n) {
    return sa = AC(t), an = e, Da = !0, Qr = null, zi = !1, n !== null && dD(e, n), !0;
  }
  function ry(e, t) {
    switch (e.tag) {
      case E: {
        YC(e.stateNode.containerInfo, t);
        break;
      }
      case k: {
        var n = (e.mode & Ye) !== Se;
        qC(
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
        a.dehydrated !== null && IC(a.dehydrated, t);
        break;
      }
    }
  }
  function iy(e, t) {
    ry(e, t);
    var n = N1();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Si) : a.push(n);
  }
  function hp(e, t) {
    {
      if (zi)
        return;
      switch (e.tag) {
        case E: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case k:
              var a = t.type;
              t.pendingProps, GC(n, a);
              break;
            case Q:
              var r = t.pendingProps;
              WC(n, r);
              break;
          }
          break;
        }
        case k: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case k: {
              var s = t.type, m = t.pendingProps, h = (e.mode & Ye) !== Se;
              XC(
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
              var S = t.pendingProps, x = (e.mode & Ye) !== Se;
              JC(
                i,
                l,
                u,
                S,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
          }
          break;
        }
        case P: {
          var O = e.memoizedState, V = O.dehydrated;
          if (V !== null) switch (t.tag) {
            case k:
              var z = t.type;
              t.pendingProps, QC(V, z);
              break;
            case Q:
              var ie = t.pendingProps;
              KC(V, ie);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function ly(e, t) {
    t.flags = t.flags & ~dr | wt, hp(e, t);
  }
  function oy(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = TC(t, n);
        return a !== null ? (e.stateNode = a, an = e, sa = LC(a), !0) : !1;
      }
      case Q: {
        var r = e.pendingProps, i = jC(t, r);
        return i !== null ? (e.stateNode = i, an = e, sa = null, !0) : !1;
      }
      case P: {
        var l = wC(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: fD(),
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
        gp(e) && (hp(an, e), yp()), ly(an, e), Da = !1, an = e;
        return;
      }
      var n = t;
      if (!oy(e, t)) {
        gp(e) && (hp(an, e), yp()), t = uu(n);
        var a = an;
        if (!t || !oy(e, t)) {
          ly(an, e), Da = !1, an = e;
          return;
        }
        iy(a, n);
      }
    }
  }
  function gD(e, t, n) {
    var a = e.stateNode, r = !zi, i = VC(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function yD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = kC(t, n, e);
    if (a) {
      var r = an;
      if (r !== null)
        switch (r.tag) {
          case E: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== Se;
            BC(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case k: {
            var u = r.type, s = r.memoizedProps, m = r.stateNode, h = (r.mode & Ye) !== Se;
            $C(
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
  function bD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    UC(n, e);
  }
  function ND(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return FC(n);
  }
  function uy(e) {
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== E && t.tag !== P; )
      t = t.return;
    an = t;
  }
  function cc(e) {
    if (e !== an)
      return !1;
    if (!Da)
      return uy(e), Da = !0, !1;
    if (e.tag !== E && (e.tag !== k || PC(e.type) && !ep(e.type, e.memoizedProps))) {
      var t = sa;
      if (t)
        if (gp(e))
          sy(e), yp();
        else
          for (; t; )
            iy(e, t), t = uu(t);
    }
    return uy(e), e.tag === P ? sa = ND(e) : sa = an ? uu(e.stateNode) : null, !0;
  }
  function ED() {
    return Da && sa !== null;
  }
  function sy(e) {
    for (var t = sa; t; )
      ry(e, t), t = uu(t);
  }
  function Vl() {
    an = null, sa = null, Da = !1, zi = !1;
  }
  function cy() {
    Qr !== null && (aN(Qr), Qr = null);
  }
  function rn() {
    return Da;
  }
  function Np(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var xD = v.ReactCurrentBatchConfig, SD = null;
  function RD() {
    return xD.transition;
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
    var CD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & xt && (t = n), n = n.return;
      return t;
    }, Hi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, du = [], pu = [], mu = [], vu = [], hu = [], gu = [], Pi = /* @__PURE__ */ new Set();
    Ta.recordUnsafeLifecycleWarnings = function(e, t) {
      Pi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & xt && typeof t.UNSAFE_componentWillMount == "function" && pu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & xt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && hu.push(e), e.mode & xt && typeof t.UNSAFE_componentWillUpdate == "function" && gu.push(e));
    }, Ta.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(x) {
        e.add(Ve(x) || "Component"), Pi.add(x.type);
      }), du = []);
      var t = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(x) {
        t.add(Ve(x) || "Component"), Pi.add(x.type);
      }), pu = []);
      var n = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(x) {
        n.add(Ve(x) || "Component"), Pi.add(x.type);
      }), mu = []);
      var a = /* @__PURE__ */ new Set();
      vu.length > 0 && (vu.forEach(function(x) {
        a.add(Ve(x) || "Component"), Pi.add(x.type);
      }), vu = []);
      var r = /* @__PURE__ */ new Set();
      hu.length > 0 && (hu.forEach(function(x) {
        r.add(Ve(x) || "Component"), Pi.add(x.type);
      }), hu = []);
      var i = /* @__PURE__ */ new Set();
      if (gu.length > 0 && (gu.forEach(function(x) {
        i.add(Ve(x) || "Component"), Pi.add(x.type);
      }), gu = []), t.size > 0) {
        var l = Hi(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = Hi(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var s = Hi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, s);
      }
      if (e.size > 0) {
        var m = Hi(e);
        R(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, m);
      }
      if (n.size > 0) {
        var h = Hi(n);
        R(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var S = Hi(r);
        R(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, S);
      }
    };
    var fc = /* @__PURE__ */ new Map(), fy = /* @__PURE__ */ new Set();
    Ta.recordLegacyContextWarning = function(e, t) {
      var n = CD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!fy.has(e.type)) {
        var a = fc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], fc.set(n, a)), a.push(e));
      }
    }, Ta.flushLegacyContextWarning = function() {
      fc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Ve(i) || "Component"), fy.add(i.type);
          });
          var r = Hi(a);
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
      du = [], pu = [], mu = [], vu = [], hu = [], gu = [], fc = /* @__PURE__ */ new Map();
    };
  }
  var Ep, xp, Sp, Rp, Cp, dy = function(e, t) {
  };
  Ep = !1, xp = !1, Sp = {}, Rp = {}, Cp = {}, dy = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Ve(t) || "Component";
      Rp[n] || (Rp[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function DD(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function yu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & xt || Ct) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !DD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Ve(e) || "Component";
        Sp[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Sp[r] = !0);
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
        nr(a, "ref");
        var m = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === m)
          return t.ref;
        var h = function(S) {
          var x = s.refs;
          S === null ? delete x[m] : x[m] = S;
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
  function dc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function pc(e) {
    {
      var t = Ve(e) || "Component";
      if (Cp[t])
        return;
      Cp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function py(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function my(e) {
    function t(w, H) {
      if (e) {
        var _ = w.deletions;
        _ === null ? (w.deletions = [H], w.flags |= Si) : _.push(H);
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
        return w.flags |= gh, H;
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
      if (H === null || H.tag !== Q) {
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
      bN(H, _) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ce == "object" && ce !== null && ce.$$typeof === xe && py(ce) === H.type)) {
        var le = r(H, _.props);
        return le.ref = yu(w, H, _), le.return = w, le._debugSource = _._source, le._debugOwner = _._owner, le;
      }
      var De = bv(_, w.mode, W);
      return De.ref = yu(w, H, _), De.return = w, De;
    }
    function m(w, H, _, W) {
      if (H === null || H.tag !== j || H.stateNode.containerInfo !== _.containerInfo || H.stateNode.implementation !== _.implementation) {
        var ce = Ev(_, w.mode, W);
        return ce.return = w, ce;
      } else {
        var le = r(H, _.children || []);
        return le.return = w, le;
      }
    }
    function h(w, H, _, W, ce) {
      if (H === null || H.tag !== pe) {
        var le = li(_, w.mode, W, ce);
        return le.return = w, le;
      } else {
        var De = r(H, _);
        return De.return = w, De;
      }
    }
    function S(w, H, _) {
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
            var le = Ev(H, w.mode, _);
            return le.return = w, le;
          }
          case xe: {
            var De = H._payload, Ae = H._init;
            return S(w, Ae(De), _);
          }
        }
        if (He(H) || Ea(H)) {
          var rt = li(H, w.mode, _, null);
          return rt.return = w, rt;
        }
        dc(w, H);
      }
      return typeof H == "function" && pc(w), null;
    }
    function x(w, H, _, W) {
      var ce = H !== null ? H.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number")
        return ce !== null ? null : u(w, H, "" + _, W);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return _.key === ce ? s(w, H, _, W) : null;
          case qn:
            return _.key === ce ? m(w, H, _, W) : null;
          case xe: {
            var le = _._payload, De = _._init;
            return x(w, H, De(le), W);
          }
        }
        if (He(_) || Ea(_))
          return ce !== null ? null : h(w, H, _, W, null);
        dc(w, _);
      }
      return typeof _ == "function" && pc(w), null;
    }
    function O(w, H, _, W, ce) {
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
            var Ae = w.get(W.key === null ? _ : W.key) || null;
            return m(H, Ae, W, ce);
          }
          case xe:
            var rt = W._payload, Ge = W._init;
            return O(w, H, _, Ge(rt), ce);
        }
        if (He(W) || Ea(W)) {
          var Rt = w.get(_) || null;
          return h(H, Rt, W, ce, null);
        }
        dc(H, W);
      }
      return typeof W == "function" && pc(H), null;
    }
    function V(w, H, _) {
      {
        if (typeof w != "object" || w === null)
          return H;
        switch (w.$$typeof) {
          case ia:
          case qn:
            dy(w, _);
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
          case xe:
            var ce = w._payload, le = w._init;
            V(le(ce), H, _);
            break;
        }
      }
      return H;
    }
    function z(w, H, _, W) {
      for (var ce = null, le = 0; le < _.length; le++) {
        var De = _[le];
        ce = V(De, ce, w);
      }
      for (var Ae = null, rt = null, Ge = H, Rt = 0, We = 0, St = null; Ge !== null && We < _.length; We++) {
        Ge.index > We ? (St = Ge, Ge = null) : St = Ge.sibling;
        var En = x(w, Ge, _[We], W);
        if (En === null) {
          Ge === null && (Ge = St);
          break;
        }
        e && Ge && En.alternate === null && t(w, Ge), Rt = i(En, Rt, We), rt === null ? Ae = En : rt.sibling = En, rt = En, Ge = St;
      }
      if (We === _.length) {
        if (n(w, Ge), rn()) {
          var dn = We;
          Ui(w, dn);
        }
        return Ae;
      }
      if (Ge === null) {
        for (; We < _.length; We++) {
          var ea = S(w, _[We], W);
          ea !== null && (Rt = i(ea, Rt, We), rt === null ? Ae = ea : rt.sibling = ea, rt = ea);
        }
        if (rn()) {
          var An = We;
          Ui(w, An);
        }
        return Ae;
      }
      for (var Vn = a(w, Ge); We < _.length; We++) {
        var xn = O(Vn, w, We, _[We], W);
        xn !== null && (e && xn.alternate !== null && Vn.delete(xn.key === null ? We : xn.key), Rt = i(xn, Rt, We), rt === null ? Ae = xn : rt.sibling = xn, rt = xn);
      }
      if (e && Vn.forEach(function(eo) {
        return t(w, eo);
      }), rn()) {
        var jr = We;
        Ui(w, jr);
      }
      return Ae;
    }
    function ie(w, H, _, W) {
      var ce = Ea(_);
      if (typeof ce != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        _[Symbol.toStringTag] === "Generator" && (xp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), xp = !0), _.entries === ce && (Ep || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ep = !0);
        var le = ce.call(_);
        if (le)
          for (var De = null, Ae = le.next(); !Ae.done; Ae = le.next()) {
            var rt = Ae.value;
            De = V(rt, De, w);
          }
      }
      var Ge = ce.call(_);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, We = null, St = H, En = 0, dn = 0, ea = null, An = Ge.next(); St !== null && !An.done; dn++, An = Ge.next()) {
        St.index > dn ? (ea = St, St = null) : ea = St.sibling;
        var Vn = x(w, St, An.value, W);
        if (Vn === null) {
          St === null && (St = ea);
          break;
        }
        e && St && Vn.alternate === null && t(w, St), En = i(Vn, En, dn), We === null ? Rt = Vn : We.sibling = Vn, We = Vn, St = ea;
      }
      if (An.done) {
        if (n(w, St), rn()) {
          var xn = dn;
          Ui(w, xn);
        }
        return Rt;
      }
      if (St === null) {
        for (; !An.done; dn++, An = Ge.next()) {
          var jr = S(w, An.value, W);
          jr !== null && (En = i(jr, En, dn), We === null ? Rt = jr : We.sibling = jr, We = jr);
        }
        if (rn()) {
          var eo = dn;
          Ui(w, eo);
        }
        return Rt;
      }
      for (var Ku = a(w, St); !An.done; dn++, An = Ge.next()) {
        var tr = O(Ku, w, dn, An.value, W);
        tr !== null && (e && tr.alternate !== null && Ku.delete(tr.key === null ? dn : tr.key), En = i(tr, En, dn), We === null ? Rt = tr : We.sibling = tr, We = tr);
      }
      if (e && Ku.forEach(function(J1) {
        return t(w, J1);
      }), rn()) {
        var X1 = dn;
        Ui(w, X1);
      }
      return Rt;
    }
    function Ee(w, H, _, W) {
      if (H !== null && H.tag === Q) {
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
              var Ae = r(le, _.props.children);
              return Ae.return = w, Ae._debugSource = _._source, Ae._debugOwner = _._owner, Ae;
            }
          } else if (le.elementType === De || // Keep this check inline so it only runs on the false path:
          bN(le, _) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === xe && py(De) === le.type) {
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
        var Ge = li(_.props.children, w.mode, W, _.key);
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
      var Ae = Ev(_, w.mode, W);
      return Ae.return = w, Ae;
    }
    function Pe(w, H, _, W) {
      var ce = typeof _ == "object" && _ !== null && _.type === Ha && _.key === null;
      if (ce && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ia:
            return l(he(w, H, _, W));
          case qn:
            return l(qe(w, H, _, W));
          case xe:
            var le = _._payload, De = _._init;
            return Pe(w, H, De(le), W);
        }
        if (He(_))
          return z(w, H, _, W);
        if (Ea(_))
          return ie(w, H, _, W);
        dc(w, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" ? l(Ee(w, H, "" + _, W)) : (typeof _ == "function" && pc(w), n(w, H));
    }
    return Pe;
  }
  var kl = my(!0), vy = my(!1);
  function TD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Ki(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Ki(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function jD(e, t) {
    for (var n = e.child; n !== null; )
      v1(n, t), n = n.sibling;
  }
  var Dp = qr(null), Tp;
  Tp = {};
  var mc = null, Ul = null, jp = null, vc = !1;
  function hc() {
    mc = null, Ul = null, jp = null, vc = !1;
  }
  function hy() {
    vc = !0;
  }
  function gy() {
    vc = !1;
  }
  function yy(e, t, n) {
    bn(Dp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Tp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Tp;
  }
  function wp(e, t) {
    var n = Dp.current;
    yn(Dp, t), e._currentValue = n;
  }
  function _p(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = Ue(r.childLanes, t)) : (a.childLanes = Ue(a.childLanes, t), r !== null && (r.childLanes = Ue(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function wD(e, t, n) {
    _D(e, t, n);
  }
  function _D(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var u = ko(n), s = xr(st, u);
              s.tag = yc;
              var m = a.updateQueue;
              if (m !== null) {
                var h = m.shared, S = h.pending;
                S === null ? s.next = s : (s.next = S.next, S.next = s), h.pending = s;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var x = a.alternate;
            x !== null && (x.lanes = Ue(x.lanes, n)), _p(a.return, n, e), i.lanes = Ue(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === Y)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === K) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = Ue(O.lanes, n);
        var V = O.alternate;
        V !== null && (V.lanes = Ue(V.lanes, n)), _p(O, n, e), r = a.sibling;
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
      a !== null && (Wn(n.lanes, t) && Mu(), n.firstContext = null);
    }
  }
  function _t(e) {
    vc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
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
  var Bi = null;
  function Op(e) {
    Bi === null ? Bi = [e] : Bi.push(e);
  }
  function OD() {
    if (Bi !== null) {
      for (var e = 0; e < Bi.length; e++) {
        var t = Bi[e], n = t.interleaved;
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
      Bi = null;
    }
  }
  function by(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Op(t)) : (n.next = r.next, r.next = n), t.interleaved = n, gc(e, a);
  }
  function LD(e, t, n, a) {
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
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (wt | dr)) !== Ce && vN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (wt | dr)) !== Ce && vN(e), a = r, r = r.return;
    if (a.tag === E) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Ny = 0, Ey = 1, yc = 2, Lp = 3, bc = !1, Mp, Nc;
  Mp = !1, Nc = null;
  function Ap(e) {
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
  function xy(e, t) {
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
      tag: Ny,
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
    if (Nc === r && !Mp && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Mp = !0), Lj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, AD(e, n);
    } else
      return MD(e, r, t, n);
  }
  function Ec(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Vh(n)) {
        var i = r.lanes;
        i = Uh(i, e.pendingLanes);
        var l = Ue(i, n);
        r.lanes = l, Dd(e, l);
      }
    }
  }
  function Vp(e, t) {
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
  function VD(e, t, n, a, r, i) {
    switch (n.tag) {
      case Ey: {
        var l = n.payload;
        if (typeof l == "function") {
          hy();
          var u = l.call(i, a, r);
          {
            if (e.mode & xt) {
              Gt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            gy();
          }
          return u;
        }
        return l;
      }
      case Lp:
        e.flags = e.flags & ~_n | Xe;
      case Ny: {
        var s = n.payload, m;
        if (typeof s == "function") {
          hy(), m = s.call(i, a, r);
          {
            if (e.mode & xt) {
              Gt(!0);
              try {
                s.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            gy();
          }
        } else
          m = s;
        return m == null ? a : ze({}, a, m);
      }
      case yc:
        return bc = !0, a;
    }
    return a;
  }
  function xc(e, t, n, a) {
    var r = e.updateQueue;
    bc = !1, Nc = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
    if (u !== null) {
      r.shared.pending = null;
      var s = u, m = s.next;
      s.next = null, l === null ? i = m : l.next = m, l = s;
      var h = e.alternate;
      if (h !== null) {
        var S = h.updateQueue, x = S.lastBaseUpdate;
        x !== l && (x === null ? S.firstBaseUpdate = m : x.next = m, S.lastBaseUpdate = s);
      }
    }
    if (i !== null) {
      var O = r.baseState, V = I, z = null, ie = null, Ee = null, he = i;
      do {
        var qe = he.lane, Pe = he.eventTime;
        if (El(a, qe)) {
          if (Ee !== null) {
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
            Ee = Ee.next = H;
          }
          O = VD(e, r, he, O, t, n);
          var _ = he.callback;
          if (_ !== null && // If the update was already committed, we should not queue its
          // callback again.
          he.lane !== Wt) {
            e.flags |= hh;
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
          Ee === null ? (ie = Ee = w, z = O) : Ee = Ee.next = w, V = Ue(V, qe);
        }
        if (he = he.next, he === null) {
          if (u = r.shared.pending, u === null)
            break;
          var ce = u, le = ce.next;
          ce.next = null, he = le, r.lastBaseUpdate = ce, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (z = O), r.baseState = z, r.firstBaseUpdate = ie, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Ae = De;
        do
          V = Ue(V, Ae.lane), Ae = Ae.next;
        while (Ae !== De);
      } else i === null && (r.shared.lanes = I);
      Iu(V), e.lanes = V, e.memoizedState = O;
    }
    Nc = null;
  }
  function kD(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Sy() {
    bc = !1;
  }
  function Sc() {
    return bc;
  }
  function Ry(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, kD(l, n));
      }
  }
  var bu = {}, Xr = qr(bu), Nu = qr(bu), Rc = qr(bu);
  function Cc(e) {
    if (e === bu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Cy() {
    var e = Cc(Rc.current);
    return e;
  }
  function kp(e, t) {
    bn(Rc, t, e), bn(Nu, e, e), bn(Xr, bu, e);
    var n = Z0(t);
    yn(Xr, e), bn(Xr, n, e);
  }
  function zl(e) {
    yn(Xr, e), yn(Nu, e), yn(Rc, e);
  }
  function Up() {
    var e = Cc(Xr.current);
    return e;
  }
  function Dy(e) {
    Cc(Rc.current);
    var t = Cc(Xr.current), n = eC(t, e.type);
    t !== n && (bn(Nu, e, e), bn(Xr, n, e));
  }
  function Fp(e) {
    Nu.current === e && (yn(Xr, e), yn(Nu, e));
  }
  var UD = 0, Ty = 1, jy = 1, Eu = 2, ja = qr(UD);
  function zp(e, t) {
    return (e & t) !== 0;
  }
  function Hl(e) {
    return e & Ty;
  }
  function Hp(e, t) {
    return e & Ty | t;
  }
  function FD(e, t) {
    return e | t;
  }
  function Jr(e, t) {
    bn(ja, t, e);
  }
  function Pl(e) {
    yn(ja, e);
  }
  function zD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Dc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === P) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Ig(a) || rp(a))
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
  ), Wa = (
    /*  */
    2
  ), Vt = (
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
  function HD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var se = v.ReactCurrentDispatcher, xu = v.ReactCurrentBatchConfig, $p, Bl;
  $p = /* @__PURE__ */ new Set();
  var $i = I, at = null, kt = null, Ut = null, Tc = !1, Su = !1, Ru = 0, PD = 0, BD = 25, B = null, ca = null, Zr = -1, Yp = !1;
  function Ze() {
    {
      var e = B;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function te() {
    {
      var e = B;
      ca !== null && (Zr++, ca[Zr] !== e && $D(e));
    }
  }
  function $l(e) {
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", B, typeof e);
  }
  function $D(e) {
    {
      var t = Ve(at);
      if (!$p.has(t) && ($p.add(t), ca !== null)) {
        for (var n = "", a = 30, r = 0; r <= Zr; r++) {
          for (var i = ca[r], l = r === Zr ? e : i, u = r + 1 + ". " + i; u.length < a; )
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
  function Ip(e, t) {
    if (Yp)
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
  function Yl(e, t, n, a, r, i) {
    $i = i, at = t, ca = e !== null ? e._debugHookTypes : null, Zr = -1, Yp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = I, e !== null && e.memoizedState !== null ? se.current = Ky : ca !== null ? se.current = Qy : se.current = Wy;
    var l = n(a, r);
    if (Su) {
      var u = 0;
      do {
        if (Su = !1, Ru = 0, u >= BD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, Yp = !1, kt = null, Ut = null, t.updateQueue = null, Zr = -1, se.current = Xy, l = n(a, r);
      } while (Su);
    }
    se.current = Hc, t._debugHookTypes = ca;
    var s = kt !== null && kt.next !== null;
    if ($i = I, at = null, kt = null, Ut = null, B = null, ca = null, Zr = -1, e !== null && (e.flags & pr) !== (t.flags & pr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== Se && f("Internal React error: Expected static flag was missing. Please notify the React team."), Tc = !1, s)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Il() {
    var e = Ru !== 0;
    return Ru = 0, e;
  }
  function wy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ya) !== Se ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = js(e.lanes, n);
  }
  function _y() {
    if (se.current = Hc, Tc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    $i = I, at = null, kt = null, Ut = null, ca = null, Zr = -1, B = null, $y = !1, Su = !1, Ru = 0;
  }
  function Qa() {
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
  function Oy() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function qp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Gp(e, t, n) {
    var a = Qa(), r;
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
    var l = i.dispatch = GD.bind(null, at, i);
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
        var s = l.next, m = u.next;
        l.next = m, u.next = s;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, S = i.baseState, x = null, O = null, V = null, z = h;
      do {
        var ie = z.lane;
        if (El($i, ie)) {
          if (V !== null) {
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
            V = V.next = he;
          }
          if (z.hasEagerState)
            S = z.eagerState;
          else {
            var qe = z.action;
            S = e(S, qe);
          }
        } else {
          var Ee = {
            lane: ie,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          V === null ? (O = V = Ee, x = S) : V = V.next = Ee, at.lanes = Ue(at.lanes, ie), Iu(ie);
        }
        z = z.next;
      } while (z !== null && z !== h);
      V === null ? x = S : V.next = O, Xn(S, a.memoizedState) || Mu(), a.memoizedState = S, a.baseState = x, a.baseQueue = V, r.lastRenderedState = S;
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
  function Qp(e, t, n) {
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
      Xn(u, a.memoizedState) || Mu(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function H_(e, t, n) {
  }
  function P_(e, t, n) {
  }
  function Kp(e, t, n) {
    var a = at, r = Qa(), i, l = rn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Bl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    } else {
      if (i = t(), !Bl) {
        var u = t();
        Xn(i, u) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
      }
      var s = lf();
      if (s === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ts(s, $i) || Ly(a, t, i);
    }
    r.memoizedState = i;
    var m = {
      value: i,
      getSnapshot: t
    };
    return r.queue = m, Lc(Ay.bind(null, a, m, e), [e]), a.flags |= Ur, Cu(At | ln, My.bind(null, a, m, i, t), void 0, null), i;
  }
  function jc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var u = r.memoizedState, s = !Xn(u, i);
    s && (r.memoizedState = i, Mu());
    var m = r.queue;
    if (Tu(Ay.bind(null, a, m, e), [e]), m.getSnapshot !== t || s || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & At) {
      a.flags |= Ur, Cu(At | ln, My.bind(null, a, m, i, t), void 0, null);
      var h = lf();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ts(h, $i) || Ly(a, t, i);
    }
    return i;
  }
  function Ly(e, t, n) {
    e.flags |= qf;
    var a = {
      getSnapshot: t,
      value: n
    }, r = at.updateQueue;
    if (r === null)
      r = Oy(), at.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function My(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Vy(t) && ky(e);
  }
  function Ay(e, t, n) {
    var a = function() {
      Vy(t) && ky(e);
    };
    return n(a);
  }
  function Vy(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Xn(n, a);
    } catch {
      return !0;
    }
  }
  function ky(e) {
    var t = Pn(e, _e);
    t !== null && Pt(t, e, _e, st);
  }
  function wc(e) {
    var t = Qa();
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
    var a = n.dispatch = WD.bind(null, at, n);
    return [t.memoizedState, a];
  }
  function Xp(e) {
    return Wp(qp);
  }
  function Jp(e) {
    return Qp(qp);
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
      i = Oy(), at.updateQueue = i, i.lastEffect = r.next = r;
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
    var t = Qa();
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
    var r = Qa(), i = a === void 0 ? null : a;
    at.flags |= e, r.memoizedState = Cu(At | t, n, void 0, i);
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
    at.flags |= e, r.memoizedState = Cu(At | t, n, l, i);
  }
  function Lc(e, t) {
    return (at.mode & Ya) !== Se ? Du(Kf | Ur | Qf, ln, e, t) : Du(Ur | Qf, ln, e, t);
  }
  function Tu(e, t) {
    return Oc(Ur, ln, e, t);
  }
  function em(e, t) {
    return Du(Ke, Wa, e, t);
  }
  function Mc(e, t) {
    return Oc(Ke, Wa, e, t);
  }
  function tm(e, t) {
    var n = Ke;
    return n |= Di, (at.mode & Ya) !== Se && (n |= Fr), Du(n, Vt, e, t);
  }
  function Ac(e, t) {
    return Oc(Ke, Vt, e, t);
  }
  function Uy(e, t) {
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
  function nm(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Ke;
    return r |= Di, (at.mode & Ya) !== Se && (r |= Fr), Du(r, Vt, Uy.bind(null, t, e), a);
  }
  function Vc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Oc(Ke, Vt, Uy.bind(null, t, e), a);
  }
  function YD(e, t) {
  }
  var kc = YD;
  function am(e, t) {
    var n = Qa(), a = t === void 0 ? null : t;
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
    var n = Qa(), a = t === void 0 ? null : t, r = e();
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
    var t = Qa();
    return t.memoizedState = e, e;
  }
  function Fy(e) {
    var t = fa(), n = kt, a = n.memoizedState;
    return Hy(t, a, e);
  }
  function zy(e) {
    var t = fa();
    if (kt === null)
      return t.memoizedState = e, e;
    var n = kt.memoizedState;
    return Hy(t, n, e);
  }
  function Hy(e, t, n) {
    var a = !wS($i);
    if (a) {
      if (!Xn(n, t)) {
        var r = kh();
        at.lanes = Ue(at.lanes, r), Iu(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Mu()), e.memoizedState = n, n;
  }
  function ID(e, t, n) {
    var a = Ra();
    Qt(FS(a, vr)), e(!0);
    var r = xu.transition;
    xu.transition = {};
    var i = xu.transition;
    xu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Qt(a), xu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && R("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function lm() {
    var e = wc(!1), t = e[0], n = e[1], a = ID.bind(null, n), r = Qa();
    return r.memoizedState = a, [t, a];
  }
  function Py() {
    var e = Xp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  function By() {
    var e = Jp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  var $y = !1;
  function qD() {
    return $y;
  }
  function om() {
    var e = Qa(), t = lf(), n = t.identifierPrefix, a;
    if (rn()) {
      var r = sD();
      a = ":" + n + "R" + r;
      var i = Ru++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = PD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function zc() {
    var e = fa(), t = e.memoizedState;
    return t;
  }
  function GD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ri(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yy(e))
      Iy(t, r);
    else {
      var i = by(e, t, r, a);
      if (i !== null) {
        var l = Mn();
        Pt(i, e, a, l), qy(i, t, a);
      }
    }
    Gy(e, a);
  }
  function WD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ri(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yy(e))
      Iy(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === I && (i === null || i.lanes === I)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = se.current, se.current = wa;
          try {
            var s = t.lastRenderedState, m = l(s, n);
            if (r.hasEagerState = !0, r.eagerState = m, Xn(m, s)) {
              LD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            se.current = u;
          }
        }
      }
      var h = by(e, t, r, a);
      if (h !== null) {
        var S = Mn();
        Pt(h, e, a, S), qy(h, t, a);
      }
    }
    Gy(e, a);
  }
  function Yy(e) {
    var t = e.alternate;
    return e === at || t !== null && t === at;
  }
  function Iy(e, t) {
    Su = Tc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function qy(e, t, n) {
    if (Vh(n)) {
      var a = t.lanes;
      a = Uh(a, e.pendingLanes);
      var r = Ue(a, n);
      t.lanes = r, Dd(e, r);
    }
  }
  function Gy(e, t, n) {
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
  }, Wy = null, Qy = null, Ky = null, Xy = null, Ka = null, wa = null, Pc = null;
  {
    var um = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Oe = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Wy = {
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
        se.current = Ka;
        try {
          return rm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Ze();
        var a = se.current;
        se.current = Ka;
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
        se.current = Ka;
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
        return B = "useSyncExternalStore", Ze(), Kp(e, t, n);
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
        se.current = Ka;
        try {
          return rm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", te();
        var a = se.current;
        se.current = Ka;
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
        se.current = Ka;
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
        return B = "useSyncExternalStore", te(), Kp(e, t, n);
      },
      useId: function() {
        return B = "useId", te(), om();
      },
      unstable_isNewReconciler: Je
    }, Ky = {
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
        return B = "useImperativeHandle", te(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", te(), Mc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", te(), Ac(e, t);
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
        return B = "useDeferredValue", te(), Fy(e);
      },
      useTransition: function() {
        return B = "useTransition", te(), Py();
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
        return B = "useImperativeHandle", te(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", te(), Mc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", te(), Ac(e, t);
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
          return Qp(e, t, n);
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
    }, Ka = {
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
        se.current = Ka;
        try {
          return rm(e, t);
        } finally {
          se.current = n;
        }
      },
      useReducer: function(e, t, n) {
        B = "useReducer", Oe(), Ze();
        var a = se.current;
        se.current = Ka;
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
        se.current = Ka;
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
        return B = "useSyncExternalStore", Oe(), Ze(), Kp(e, t, n);
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
        return B = "useImperativeHandle", Oe(), te(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), te(), Mc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), te(), Ac(e, t);
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
        return B = "useDeferredValue", Oe(), te(), Fy(e);
      },
      useTransition: function() {
        return B = "useTransition", Oe(), te(), Py();
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
        return B = "useImperativeHandle", Oe(), te(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Oe(), te(), Mc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Oe(), te(), Ac(e, t);
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
          return Qp(e, t, n);
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
    };
  }
  var ei = p.unstable_now, Jy = 0, Bc = -1, ju = -1, $c = -1, sm = !1, Yc = !1;
  function Zy() {
    return sm;
  }
  function QD() {
    Yc = !0;
  }
  function KD() {
    sm = !1, Yc = !1;
  }
  function XD() {
    sm = Yc, Yc = !1;
  }
  function eb() {
    return Jy;
  }
  function tb() {
    Jy = ei();
  }
  function cm(e) {
    ju = ei(), e.actualStartTime < 0 && (e.actualStartTime = ei());
  }
  function nb(e) {
    ju = -1;
  }
  function Ic(e, t) {
    if (ju >= 0) {
      var n = ei() - ju;
      e.actualDuration += n, t && (e.selfBaseDuration = n), ju = -1;
    }
  }
  function Xa(e) {
    if (Bc >= 0) {
      var t = ei() - Bc;
      Bc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case E:
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
      var t = ei() - $c;
      $c = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case E:
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
    Bc = ei();
  }
  function dm() {
    $c = ei();
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
  var mm = {}, vm, hm, gm, ym, bm, ab, qc, Nm, Em, xm, wu;
  {
    vm = /* @__PURE__ */ new Set(), hm = /* @__PURE__ */ new Set(), gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), wu = /* @__PURE__ */ new Set();
    var rb = /* @__PURE__ */ new Set();
    qc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        rb.has(n) || (rb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, ab = function(e, t) {
      if (t === void 0) {
        var n = Qe(e) || "Component";
        bm.has(n) || (bm.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
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
      if (e.mode & xt) {
        Gt(!0);
        try {
          i = n(a, r);
        } finally {
          Gt(!1);
        }
      }
      ab(t, i);
    }
    var l = i == null ? r : ze({}, r, i);
    if (e.memoizedState = l, e.lanes === I) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Rm = {
    isMounted: Bx,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ri(a), l = xr(r, i);
      l.payload = t, n != null && (qc(n, "setState"), l.callback = n);
      var u = Kr(a, l, i);
      u !== null && (Pt(u, a, i, r), Ec(u, a, i)), td(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ri(a), l = xr(r, i);
      l.tag = Ey, l.payload = t, n != null && (qc(n, "replaceState"), l.callback = n);
      var u = Kr(a, l, i);
      u !== null && (Pt(u, a, i, r), Ec(u, a, i)), td(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = Mn(), r = ri(n), i = xr(a, r);
      i.tag = yc, t != null && (qc(t, "forceUpdate"), i.callback = t);
      var l = Kr(n, i, r);
      l !== null && (Pt(l, n, r, a), Ec(l, n, r)), bS(n, r);
    }
  };
  function ib(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var s = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & xt) {
          Gt(!0);
          try {
            s = u.shouldComponentUpdate(a, i, l);
          } finally {
            Gt(!1);
          }
        }
        s === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Qe(t) || "Component");
      }
      return s;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Xo(n, a) || !Xo(r, i) : !0;
  }
  function JD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Qe(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !wu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & xt) === Se && (wu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !wu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & xt) === Se && (wu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Em.has(t) && (Em.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Qe(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !gm.has(t) && (gm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Qe(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || He(u)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function lb(e, t) {
    t.updater = Rm, e.stateNode = t, Fx(t, e), t._reactInternalInstance = mm;
  }
  function ob(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === re && l._context === void 0
      );
      if (!u && !xm.has(t)) {
        xm.add(t);
        var s = "";
        l === void 0 ? s = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? s = " However, it is set to a " + typeof l + "." : l.$$typeof === G ? s = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? s = " Did you accidentally pass the Context.Consumer instead?" : s = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Qe(t) || "Component", s);
      }
    }
    if (typeof l == "object" && l !== null)
      i = _t(l);
    else {
      r = Ol(e, t, !0);
      var m = t.contextTypes;
      a = m != null, i = a ? Ll(e, r) : Jn;
    }
    var h = new t(n, i);
    if (e.mode & xt) {
      Gt(!0);
      try {
        h = new t(n, i);
      } finally {
        Gt(!1);
      }
    }
    var S = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    lb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && S === null) {
        var x = Qe(t) || "Component";
        hm.has(x) || (hm.add(x), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", x, h.state === null ? "null" : "undefined", x));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var O = null, V = null, z = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? z = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (z = "UNSAFE_componentWillUpdate"), O !== null || V !== null || z !== null) {
          var ie = Qe(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          ym.has(ie) || (ym.add(ie), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ie, Ee, O !== null ? `
  ` + O : "", V !== null ? `
  ` + V : "", z !== null ? `
  ` + z : ""));
        }
      }
    }
    return a && Kg(e, r, i), h;
  }
  function ZD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ve(e) || "Component"), Rm.enqueueReplaceState(t, t.state, null));
  }
  function ub(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Ve(e) || "Component";
        vm.has(i) || (vm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Rm.enqueueReplaceState(t, t.state, null);
    }
  }
  function Cm(e, t, n, a) {
    JD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Ap(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = _t(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Ll(e, l);
    }
    {
      if (r.state === n) {
        var u = Qe(t) || "Component";
        Nm.has(u) || (Nm.add(u), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & xt && Ta.recordLegacyContextWarning(e, r), Ta.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var s = t.getDerivedStateFromProps;
    if (typeof s == "function" && (Sm(e, t, s, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (ZD(e, r), xc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var m = Ke;
      m |= Di, (e.mode & Ya) !== Se && (m |= Fr), e.flags |= m;
    }
  }
  function eT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, s = Jn;
    if (typeof u == "object" && u !== null)
      s = _t(u);
    else {
      var m = Ol(e, t, !0);
      s = Ll(e, m);
    }
    var h = t.getDerivedStateFromProps, S = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !S && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== s) && ub(e, r, n, s), Sy();
    var x = e.memoizedState, O = r.state = x;
    if (xc(e, n, r, a), O = e.memoizedState, i === n && x === O && !ac() && !Sc()) {
      if (typeof r.componentDidMount == "function") {
        var V = Ke;
        V |= Di, (e.mode & Ya) !== Se && (V |= Fr), e.flags |= V;
      }
      return !1;
    }
    typeof h == "function" && (Sm(e, t, h, n), O = e.memoizedState);
    var z = Sc() || ib(e, t, i, n, x, O, s);
    if (z) {
      if (!S && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ie = Ke;
        ie |= Di, (e.mode & Ya) !== Se && (ie |= Fr), e.flags |= ie;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ee = Ke;
        Ee |= Di, (e.mode & Ya) !== Se && (Ee |= Fr), e.flags |= Ee;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = s, z;
  }
  function tT(e, t, n, a, r) {
    var i = t.stateNode;
    xy(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : _a(t.type, l);
    i.props = u;
    var s = t.pendingProps, m = i.context, h = n.contextType, S = Jn;
    if (typeof h == "object" && h !== null)
      S = _t(h);
    else {
      var x = Ol(t, n, !0);
      S = Ll(t, x);
    }
    var O = n.getDerivedStateFromProps, V = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== s || m !== S) && ub(t, i, a, S), Sy();
    var z = t.memoizedState, ie = i.state = z;
    if (xc(t, a, i, r), ie = t.memoizedState, l === s && z === ie && !ac() && !Sc() && !pn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), !1;
    typeof O == "function" && (Sm(t, n, O, a), ie = t.memoizedState);
    var Ee = Sc() || ib(t, n, u, a, z, ie, S) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    pn;
    return Ee ? (!V && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ie, S), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ie, S)), typeof i.componentDidUpdate == "function" && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || z !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = ie), i.props = a, i.state = ie, i.context = S, Ee;
  }
  function Yi(e, t) {
    return {
      value: e,
      source: t,
      stack: yi(t),
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
  function nT(e, t) {
    return !0;
  }
  function Tm(e, t) {
    try {
      var n = nT(e, t);
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
      var S = s + `
` + l + `

` + ("" + m);
      console.error(S);
    } catch (x) {
      setTimeout(function() {
        throw x;
      });
    }
  }
  var aT = typeof WeakMap == "function" ? WeakMap : Map;
  function sb(e, t, n) {
    var a = xr(st, n);
    a.tag = Lp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Qj(r), Tm(e, t);
    }, a;
  }
  function jm(e, t, n) {
    var a = xr(st, n);
    a.tag = Lp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        NN(e), Tm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      NN(e), Tm(e, t), typeof r != "function" && Gj(this);
      var s = t.value, m = t.stack;
      this.componentDidCatch(s, {
        componentStack: m !== null ? m : ""
      }), typeof r != "function" && (Wn(e.lanes, _e) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ve(e) || "Unknown"));
    }), a;
  }
  function cb(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new aT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Kj.bind(null, e, t, n);
      Sa && qu(e, n), t.then(i, i);
    }
  }
  function rT(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function iT(e, t) {
    var n = e.tag;
    if ((e.mode & Ye) === Se && (n === D || n === $ || n === ue)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function fb(e) {
    var t = e;
    do {
      if (t.tag === P && zD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function db(e, t, n, a, r) {
    if ((e.mode & Ye) === Se) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Xe, n.flags |= Gf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = Z;
          else {
            var l = xr(st, _e);
            l.tag = yc, Kr(n, l, _e);
          }
        }
        n.lanes = Ue(n.lanes, _e);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function lT(e, t, n, a, r) {
    if (n.flags |= Es, Sa && qu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      iT(n), rn() && n.mode & Ye && ay();
      var l = fb(t);
      if (l !== null) {
        l.flags &= ~fr, db(l, t, n, e, r), l.mode & Ye && cb(e, i, r), rT(l, e, i);
        return;
      } else {
        if (!jS(r)) {
          cb(e, i, r), ov();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (rn() && n.mode & Ye) {
      ay();
      var s = fb(t);
      if (s !== null) {
        (s.flags & _n) === Ce && (s.flags |= fr), db(s, t, n, e, r), Np(Yi(a, n));
        return;
      }
    }
    a = Yi(a, n), zj(a);
    var m = t;
    do {
      switch (m.tag) {
        case E: {
          var h = a;
          m.flags |= _n;
          var S = ko(r);
          m.lanes = Ue(m.lanes, S);
          var x = sb(m, h, S);
          Vp(m, x);
          return;
        }
        case T:
          var O = a, V = m.type, z = m.stateNode;
          if ((m.flags & Xe) === Ce && (typeof V.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && !fN(z))) {
            m.flags |= _n;
            var ie = ko(r);
            m.lanes = Ue(m.lanes, ie);
            var Ee = jm(m, O, ie);
            Vp(m, Ee);
            return;
          }
          break;
      }
      m = m.return;
    } while (m !== null);
  }
  function oT() {
    return null;
  }
  var _u = v.ReactCurrentOwner, Oa = !1, wm, Ou, _m, Om, Lm, Ii, Mm, Gc, Lu;
  wm = {}, Ou = {}, _m = {}, Om = {}, Lm = {}, Ii = !1, Mm = {}, Gc = {}, Lu = {};
  function On(e, t, n, a) {
    e === null ? t.child = vy(t, null, n, a) : t.child = kl(t, e.child, n, a);
  }
  function uT(e, t, n, a) {
    t.child = kl(t, e.child, null, a), t.child = kl(t, null, n, a);
  }
  function pb(e, t, n, a, r) {
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
    Fl(t, r), _o(t);
    {
      if (_u.current = t, la(!0), s = Yl(e, t, l, a, u, r), m = Il(), t.mode & xt) {
        Gt(!0);
        try {
          s = Yl(e, t, l, a, u, r), m = Il();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Oa ? (wy(e, t, r), Sr(e, t, r)) : (rn() && m && mp(t), t.flags |= pl, On(e, t, s, r), t.child);
  }
  function mb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (p1(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = ue, t.type = l, km(t, i), vb(e, t, l, a, r);
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
          Lu[s] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", s), Lu[s] = !0);
        }
      }
      var m = yv(n.type, null, a, t, t.mode, r);
      return m.ref = t.ref, m.return = t, t.child = m, m;
    }
    {
      var h = n.type, S = h.propTypes;
      S && Ca(
        S,
        a,
        // Resolved props
        "prop",
        Qe(h)
      );
    }
    var x = e.child, O = Bm(e, r);
    if (!O) {
      var V = x.memoizedProps, z = n.compare;
      if (z = z !== null ? z : Xo, z(V, a) && e.ref === t.ref)
        return Sr(e, t, r);
    }
    t.flags |= pl;
    var ie = Ki(x, a);
    return ie.ref = t.ref, ie.return = t, t.child = ie, ie;
  }
  function vb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === xe) {
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
      if (Xo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Oa = !1, t.pendingProps = a = h, Bm(e, r))
          (e.flags & Gf) !== Ce && (Oa = !0);
        else return t.lanes = e.lanes, Sr(e, t, r);
    }
    return Am(e, t, n, a, r);
  }
  function hb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Kt)
      if ((t.mode & Ye) === Se) {
        var l = {
          baseLanes: I,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, of(t, n);
      } else if (Wn(n, Gn)) {
        var S = {
          baseLanes: I,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = S;
        var x = i !== null ? i.baseLanes : n;
        of(t, x);
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
        return t.memoizedState = h, t.updateQueue = null, of(t, s), null;
      }
    else {
      var O;
      i !== null ? (O = Ue(i.baseLanes, n), t.memoizedState = null) : O = n, of(t, O);
    }
    return On(e, t, r, n), t.child;
  }
  function sT(e, t, n) {
    var a = t.pendingProps;
    return On(e, t, a, n), t.child;
  }
  function cT(e, t, n) {
    var a = t.pendingProps.children;
    return On(e, t, a, n), t.child;
  }
  function fT(e, t, n) {
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
  function gb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ri, t.flags |= Wf);
  }
  function Am(e, t, n, a, r) {
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
      var u = Ol(t, n, !0);
      l = Ll(t, u);
    }
    var s, m;
    Fl(t, r), _o(t);
    {
      if (_u.current = t, la(!0), s = Yl(e, t, n, a, l, r), m = Il(), t.mode & xt) {
        Gt(!0);
        try {
          s = Yl(e, t, n, a, l, r), m = Il();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Oa ? (wy(e, t, r), Sr(e, t, r)) : (rn() && m && mp(t), t.flags |= pl, On(e, t, s, r), t.child);
  }
  function yb(e, t, n, a, r) {
    {
      switch (j1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), s = u.state;
          i.updater.enqueueSetState(i, s, null);
          break;
        }
        case !0: {
          t.flags |= Xe, t.flags |= _n;
          var m = new Error("Simulated error coming from DevTools"), h = ko(r);
          t.lanes = Ue(t.lanes, h);
          var S = jm(t, Yi(m, t), h);
          Vp(t, S);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var x = n.propTypes;
        x && Ca(
          x,
          a,
          // Resolved props
          "prop",
          Qe(n)
        );
      }
    }
    var O;
    Ga(n) ? (O = !0, ic(t)) : O = !1, Fl(t, r);
    var V = t.stateNode, z;
    V === null ? (Qc(e, t), ob(t, n, a), Cm(t, n, a, r), z = !0) : e === null ? z = eT(t, n, a, r) : z = tT(e, t, n, a, r);
    var ie = Vm(e, t, n, z, O, r);
    {
      var Ee = t.stateNode;
      z && Ee.props !== a && (Ii || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ve(t) || "a component"), Ii = !0);
    }
    return ie;
  }
  function Vm(e, t, n, a, r, i) {
    gb(e, t);
    var l = (t.flags & Xe) !== Ce;
    if (!a && !l)
      return r && Zg(t, n, !1), Sr(e, t, i);
    var u = t.stateNode;
    _u.current = t;
    var s;
    if (l && typeof n.getDerivedStateFromError != "function")
      s = null, nb();
    else {
      _o(t);
      {
        if (la(!0), s = u.render(), t.mode & xt) {
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
    return t.flags |= pl, e !== null && l ? uT(e, t, s, i) : On(e, t, s, i), t.memoizedState = u.state, r && Zg(t, n, !0), t.child;
  }
  function bb(e) {
    var t = e.stateNode;
    t.pendingContext ? Xg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Xg(e, t.context, !1), kp(e, t.containerInfo);
  }
  function dT(e, t, n) {
    if (bb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    xy(e, t), xc(t, a, null, n);
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
      if (m.baseState = s, t.memoizedState = s, t.flags & fr) {
        var h = Yi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Nb(e, t, u, n, h);
      } else if (u !== i) {
        var S = Yi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Nb(e, t, u, n, S);
      } else {
        vD(t);
        var x = vy(t, null, u, n);
        t.child = x;
        for (var O = x; O; )
          O.flags = O.flags & ~wt | dr, O = O.sibling;
      }
    } else {
      if (Vl(), u === i)
        return Sr(e, t, n);
      On(e, t, u, n);
    }
    return t.child;
  }
  function Nb(e, t, n, a, r) {
    return Vl(), Np(r), t.flags |= fr, On(e, t, n, a), t.child;
  }
  function pT(e, t, n) {
    Dy(t), e === null && bp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = ep(a, r);
    return u ? l = null : i !== null && ep(a, i) && (t.flags |= jo), gb(e, t), On(e, t, l, n), t.child;
  }
  function mT(e, t) {
    return e === null && bp(t), null;
  }
  function vT(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, s = u(l);
    t.type = s;
    var m = t.tag = m1(s), h = _a(s, r), S;
    switch (m) {
      case D:
        return km(t, s), t.type = s = Zl(s), S = Am(null, t, s, h, a), S;
      case T:
        return t.type = s = dv(s), S = yb(null, t, s, h, a), S;
      case $:
        return t.type = s = pv(s), S = pb(null, t, s, h, a), S;
      case ge: {
        if (t.type !== t.elementType) {
          var x = s.propTypes;
          x && Ca(
            x,
            h,
            // Resolved for outer only
            "prop",
            Qe(s)
          );
        }
        return S = mb(
          null,
          t,
          s,
          _a(s.type, h),
          // The inner type can have defaults too
          a
        ), S;
      }
    }
    var O = "";
    throw s !== null && typeof s == "object" && s.$$typeof === xe && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + s + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function hT(e, t, n, a, r) {
    Qc(e, t), t.tag = T;
    var i;
    return Ga(n) ? (i = !0, ic(t)) : i = !1, Fl(t, r), ob(t, n, a), Cm(t, n, a, r), Vm(null, t, n, !0, i, r);
  }
  function gT(e, t, n, a) {
    Qc(e, t);
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
        var m = Qe(n) || "Unknown";
        wm[m] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", m, m), wm[m] = !0);
      }
      t.mode & xt && Ta.recordLegacyContextWarning(t, null), la(!0), _u.current = t, u = Yl(null, t, n, r, i, a), s = Il(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var h = Qe(n) || "Unknown";
      Ou[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), Ou[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var S = Qe(n) || "Unknown";
        Ou[S] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", S, S, S), Ou[S] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var x = !1;
      return Ga(n) ? (x = !0, ic(t)) : x = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, Ap(t), lb(t, u), Cm(t, n, r, a), Vm(null, t, n, !0, x, a);
    } else {
      if (t.tag = D, t.mode & xt) {
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
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Vr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Lm[r] || (Lm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Qe(t) || "Unknown";
        Lu[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Lu[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = Qe(t) || "Unknown";
        Om[u] || (f("%s: Function components do not support getDerivedStateFromProps.", u), Om[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var s = Qe(t) || "Unknown";
        _m[s] || (f("%s: Function components do not support contextType.", s), _m[s] = !0);
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
      cachePool: oT(),
      transitions: null
    };
  }
  function yT(e, t) {
    var n = null;
    return {
      baseLanes: Ue(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function bT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return zp(e, Eu);
  }
  function NT(e, t) {
    return js(e.childLanes, t);
  }
  function Eb(e, t, n) {
    var a = t.pendingProps;
    w1(t) && (t.flags |= Xe);
    var r = ja.current, i = !1, l = (t.flags & Xe) !== Ce;
    if (l || bT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = FD(r, jy)), r = Hl(r), Jr(t, r), e === null) {
      bp(t);
      var u = t.memoizedState;
      if (u !== null) {
        var s = u.dehydrated;
        if (s !== null)
          return CT(t, s);
      }
      var m = a.children, h = a.fallback;
      if (i) {
        var S = ET(t, m, h, n), x = t.child;
        return x.memoizedState = Fm(n), t.memoizedState = Um, S;
      } else
        return zm(t, m);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var V = O.dehydrated;
        if (V !== null)
          return DT(e, t, l, a, V, O, n);
      }
      if (i) {
        var z = a.fallback, ie = a.children, Ee = ST(e, t, ie, z, n), he = t.child, qe = e.child.memoizedState;
        return he.memoizedState = qe === null ? Fm(n) : yT(qe, n), he.childLanes = NT(e, n), t.memoizedState = Um, Ee;
      } else {
        var Pe = a.children, w = xT(e, t, Pe, n);
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
    return (r & Ye) === Se && i !== null ? (u = i, u.childLanes = I, u.pendingProps = l, e.mode & nt && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), s = li(n, r, a, null)) : (u = Hm(l, r), s = li(n, r, a, null)), u.return = e, s.return = e, u.sibling = s, e.child = u, s;
  }
  function Hm(e, t, n) {
    return xN(e, t, I, null);
  }
  function xb(e, t) {
    return Ki(e, t);
  }
  function xT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = xb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ye) === Se && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= Si) : u.push(i);
    }
    return t.child = l, l;
  }
  function ST(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, s = {
      mode: "hidden",
      children: n
    }, m;
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
      m = h, m.childLanes = I, m.pendingProps = s, t.mode & nt && (m.actualDuration = 0, m.actualStartTime = -1, m.selfBaseDuration = l.selfBaseDuration, m.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      m = xb(l, s), m.subtreeFlags = l.subtreeFlags & pr;
    var S;
    return u !== null ? S = Ki(u, a) : (S = li(a, i, r, null), S.flags |= wt), S.return = t, m.return = t, m.sibling = S, t.child = m, S;
  }
  function Wc(e, t, n, a) {
    a !== null && Np(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = zm(t, i);
    return l.flags |= wt, t.memoizedState = null, l;
  }
  function RT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Hm(l, i), s = li(a, i, r, null);
    return s.flags |= wt, u.return = t, s.return = t, u.sibling = s, t.child = u, (t.mode & Ye) !== Se && kl(t, e.child, null, r), s;
  }
  function CT(e, t, n) {
    return (e.mode & Ye) === Se ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = _e) : rp(t) ? e.lanes = wi : e.lanes = Gn, null;
  }
  function DT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & fr) {
        t.flags &= ~fr;
        var w = Dm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Wc(e, t, l, w);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Xe, null;
        var H = a.children, _ = a.fallback, W = RT(e, t, H, _, l), ce = t.child;
        return ce.memoizedState = Fm(l), t.memoizedState = Um, W;
      }
    else {
      if (pD(), (t.mode & Ye) === Se)
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
        var u, s, m;
        {
          var h = _C(r);
          u = h.digest, s = h.message, m = h.stack;
        }
        var S;
        s ? S = new Error(s) : S = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var x = Dm(S, u, m);
        return Wc(e, t, l, x);
      }
      var O = Wn(l, e.childLanes);
      if (Oa || O) {
        var V = lf();
        if (V !== null) {
          var z = kS(V, l);
          if (z !== Wt && z !== i.retryLane) {
            i.retryLane = z;
            var ie = st;
            Pn(e, z), Pt(V, e, z, ie);
          }
        }
        ov();
        var Ee = Dm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Wc(e, t, l, Ee);
      } else if (Ig(r)) {
        t.flags |= Xe, t.child = e.child;
        var he = Xj.bind(null, e);
        return OC(r, he), null;
      } else {
        hD(t, r, i.treeContext);
        var qe = a.children, Pe = zm(t, qe);
        return Pe.flags |= dr, Pe;
      }
    }
  }
  function Sb(e, t, n) {
    e.lanes = Ue(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ue(a.lanes, t)), _p(e.return, t, n);
  }
  function TT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === P) {
        var r = a.memoizedState;
        r !== null && Sb(a, n, e);
      } else if (a.tag === U)
        Sb(a, n, e);
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
  function jT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Dc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function wT(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Mm[e])
      if (Mm[e] = !0, typeof e == "string")
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
  function _T(e, t) {
    e !== void 0 && !Gc[e] && (e !== "collapsed" && e !== "hidden" ? (Gc[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Gc[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Rb(e, t) {
    {
      var n = He(e), a = !n && typeof Ea(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function OT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (He(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Rb(e[n], n))
            return;
      } else {
        var a = Ea(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Rb(i.value, l))
                return;
              l++;
            }
        } else
          f('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
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
  function Cb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    wT(r), _T(i, r), OT(l, r), On(e, t, l, n);
    var u = ja.current, s = zp(u, Eu);
    if (s)
      u = Hp(u, Eu), t.flags |= Xe;
    else {
      var m = e !== null && (e.flags & Xe) !== Ce;
      m && TT(t, t.child, n), u = Hl(u);
    }
    if (Jr(t, u), (t.mode & Ye) === Se)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = jT(t.child), S;
          h === null ? (S = t.child, t.child = null) : (S = h.sibling, h.sibling = null), Pm(
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
          var x = null, O = t.child;
          for (t.child = null; O !== null; ) {
            var V = O.alternate;
            if (V !== null && Dc(V) === null) {
              t.child = O;
              break;
            }
            var z = O.sibling;
            O.sibling = x, x = O, O = z;
          }
          Pm(
            t,
            !0,
            // isBackwards
            x,
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
  function LT(e, t, n) {
    kp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = kl(t, null, a, n) : On(e, t, a, n), t.child;
  }
  var Db = !1;
  function MT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || Db || (Db = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var s = t.type.propTypes;
      s && Ca(s, i, "prop", "Context.Provider");
    }
    if (yy(t, r, u), l !== null) {
      var m = l.value;
      if (Xn(m, u)) {
        if (l.children === i.children && !ac())
          return Sr(e, t, n);
      } else
        wD(t, r, n);
    }
    var h = i.children;
    return On(e, t, h, n), t.child;
  }
  var Tb = !1;
  function AT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Tb || (Tb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fl(t, n);
    var l = _t(a);
    _o(t);
    var u;
    return _u.current = t, la(!0), u = i(l), la(!1), gl(), t.flags |= pl, On(e, t, u, n), t.child;
  }
  function Mu() {
    Oa = !0;
  }
  function Qc(e, t) {
    (t.mode & Ye) === Se && e !== null && (e.alternate = null, t.alternate = null, t.flags |= wt);
  }
  function Sr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), nb(), Iu(t.lanes), Wn(n, t.childLanes) ? (TD(e, t), t.child) : null;
  }
  function VT(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Si) : i.push(e), n.flags |= wt, n;
    }
  }
  function Bm(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function kT(e, t, n) {
    switch (t.tag) {
      case E:
        bb(t), t.stateNode, Vl();
        break;
      case k:
        Dy(t);
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
        yy(t, i, r);
        break;
      }
      case q:
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
            return Jr(t, Hl(ja.current)), t.flags |= Xe, null;
          var m = t.child, h = m.childLanes;
          if (Wn(n, h))
            return Eb(e, t, n);
          Jr(t, Hl(ja.current));
          var S = Sr(e, t, n);
          return S !== null ? S.sibling : null;
        } else
          Jr(t, Hl(ja.current));
        break;
      }
      case U: {
        var x = (e.flags & Xe) !== Ce, O = Wn(n, t.childLanes);
        if (x) {
          if (O)
            return Cb(e, t, n);
          t.flags |= Xe;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Jr(t, ja.current), O)
          break;
        return null;
      }
      case ee:
      case Te:
        return t.lanes = I, hb(e, t, n);
    }
    return Sr(e, t, n);
  }
  function jb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return VT(e, t, yv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
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
          return Oa = !1, kT(e, t, n);
        (e.flags & Gf) !== Ce ? Oa = !0 : Oa = !1;
      }
    } else if (Oa = !1, rn() && oD(t)) {
      var l = t.index, u = uD();
      ny(t, u, l);
    }
    switch (t.lanes = I, t.tag) {
      case M:
        return gT(e, t, t.type, n);
      case X: {
        var s = t.elementType;
        return vT(e, t, s, n);
      }
      case D: {
        var m = t.type, h = t.pendingProps, S = t.elementType === m ? h : _a(m, h);
        return Am(e, t, m, S, n);
      }
      case T: {
        var x = t.type, O = t.pendingProps, V = t.elementType === x ? O : _a(x, O);
        return yb(e, t, x, V, n);
      }
      case E:
        return dT(e, t, n);
      case k:
        return pT(e, t, n);
      case Q:
        return mT(e, t);
      case P:
        return Eb(e, t, n);
      case j:
        return LT(e, t, n);
      case $: {
        var z = t.type, ie = t.pendingProps, Ee = t.elementType === z ? ie : _a(z, ie);
        return pb(e, t, z, Ee, n);
      }
      case pe:
        return sT(e, t, n);
      case ne:
        return cT(e, t, n);
      case q:
        return fT(e, t, n);
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
            Qe(he)
          );
        }
        return Pe = _a(he.type, Pe), mb(e, t, he, Pe, n);
      }
      case ue:
        return vb(e, t, t.type, t.pendingProps, n);
      case Z: {
        var H = t.type, _ = t.pendingProps, W = t.elementType === H ? _ : _a(H, _);
        return hT(e, t, H, W, n);
      }
      case U:
        return Cb(e, t, n);
      case fe:
        break;
      case ee:
        return hb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= Ke;
  }
  function wb(e) {
    e.flags |= Ri, e.flags |= Wf;
  }
  var _b, $m, Ob, Lb;
  _b = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === k || r.tag === Q)
        rC(e, r.stateNode);
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
  }, Ob = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = Up(), s = lC(l, n, i, a, r, u);
      t.updateQueue = s, s && ql(t);
    }
  }, Lb = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Au(e, t) {
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
        for (var s = e.selfBaseDuration, m = e.child; m !== null; )
          n = Ue(n, Ue(m.lanes, m.childLanes)), a |= m.subtreeFlags & pr, a |= m.flags & pr, s += m.treeBaseDuration, m = m.sibling;
        e.treeBaseDuration = s;
      } else
        for (var h = e.child; h !== null; )
          n = Ue(n, Ue(h.lanes, h.childLanes)), a |= h.subtreeFlags & pr, a |= h.flags & pr, h.return = e, h = h.sibling;
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
  function UT(e, t, n) {
    if (ED() && (t.mode & Ye) !== Se && (t.flags & Xe) === Ce)
      return sy(t), Vl(), t.flags |= fr | Es | _n, !1;
    var a = cc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (bD(t), on(t), (t.mode & nt) !== Se) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Xe) === Ce && (t.memoizedState = null), t.flags |= Ke, on(t), (t.mode & nt) !== Se) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return cy(), !0;
  }
  function Mb(e, t, n) {
    var a = t.pendingProps;
    switch (vp(t), t.tag) {
      case M:
      case X:
      case ue:
      case D:
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
      case E: {
        var i = t.stateNode;
        if (zl(t), fp(t), Bp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = cc(t);
          if (l)
            ql(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & fr) !== Ce) && (t.flags |= ml, cy());
          }
        }
        return $m(e, t), on(t), null;
      }
      case k: {
        Fp(t);
        var s = Cy(), m = t.type;
        if (e !== null && t.stateNode != null)
          Ob(e, t, m, a, s), e.ref !== t.ref && wb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return on(t), null;
          }
          var h = Up(), S = cc(t);
          if (S)
            gD(t, s, h) && ql(t);
          else {
            var x = aC(m, a, s, h, t);
            _b(x, t, !1, !1), t.stateNode = x, iC(x, m, a, s) && ql(t);
          }
          t.ref !== null && wb(t);
        }
        return on(t), null;
      }
      case Q: {
        var O = a;
        if (e && t.stateNode != null) {
          var V = e.memoizedProps;
          Lb(e, t, V, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var z = Cy(), ie = Up(), Ee = cc(t);
          Ee ? yD(t) && ql(t) : t.stateNode = oC(O, z, ie, t);
        }
        return on(t), null;
      }
      case P: {
        Pl(t);
        var he = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = UT(e, t, he);
          if (!qe)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Xe) !== Ce)
          return t.lanes = n, (t.mode & nt) !== Se && pm(t), t;
        var Pe = he !== null, w = e !== null && e.memoizedState !== null;
        if (Pe !== w && Pe) {
          var H = t.child;
          if (H.flags |= Ci, (t.mode & Ye) !== Se) {
            var _ = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            _ || zp(ja.current, jy) ? Fj() : ov();
          }
        }
        var W = t.updateQueue;
        if (W !== null && (t.flags |= Ke), on(t), (t.mode & nt) !== Se && Pe) {
          var ce = t.child;
          ce !== null && (t.treeBaseDuration -= ce.treeBaseDuration);
        }
        return null;
      }
      case j:
        return zl(t), $m(e, t), e === null && eD(t.stateNode.containerInfo), on(t), null;
      case Y:
        var le = t.type._context;
        return wp(le, t), on(t), null;
      case Z: {
        var De = t.type;
        return Ga(De) && rc(t), on(t), null;
      }
      case U: {
        Pl(t);
        var Ae = t.memoizedState;
        if (Ae === null)
          return on(t), null;
        var rt = (t.flags & Xe) !== Ce, Ge = Ae.rendering;
        if (Ge === null)
          if (rt)
            Au(Ae, !1);
          else {
            var Rt = Hj() && (e === null || (e.flags & Xe) === Ce);
            if (!Rt)
              for (var We = t.child; We !== null; ) {
                var St = Dc(We);
                if (St !== null) {
                  rt = !0, t.flags |= Xe, Au(Ae, !1);
                  var En = St.updateQueue;
                  return En !== null && (t.updateQueue = En, t.flags |= Ke), t.subtreeFlags = Ce, jD(t, n), Jr(t, Hp(ja.current, Eu)), t.child;
                }
                We = We.sibling;
              }
            Ae.tail !== null && qt() > eN() && (t.flags |= Xe, rt = !0, Au(Ae, !1), t.lanes = Lh);
          }
        else {
          if (!rt) {
            var dn = Dc(Ge);
            if (dn !== null) {
              t.flags |= Xe, rt = !0;
              var ea = dn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Ke), Au(Ae, !0), Ae.tail === null && Ae.tailMode === "hidden" && !Ge.alternate && !rn())
                return on(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Ae.renderingStartTime > eN() && n !== Gn && (t.flags |= Xe, rt = !0, Au(Ae, !1), t.lanes = Lh);
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
          Ae.rendering = Vn, Ae.tail = Vn.sibling, Ae.renderingStartTime = qt(), Vn.sibling = null;
          var xn = ja.current;
          return rt ? xn = Hp(xn, Eu) : xn = Hl(xn), Jr(t, xn), Vn;
        }
        return on(t), null;
      }
      case fe:
        break;
      case ee:
      case Te: {
        lv(t);
        var jr = t.memoizedState, eo = jr !== null;
        if (e !== null) {
          var Ku = e.memoizedState, tr = Ku !== null;
          tr !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Kt && (t.flags |= Ci);
        }
        return !eo || (t.mode & Ye) === Se ? on(t) : Wn(er, Gn) && (on(t), t.subtreeFlags & (wt | Ke) && (t.flags |= Ci)), null;
      }
      case je:
        return null;
      case Le:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function FT(e, t, n) {
    switch (vp(t), t.tag) {
      case T: {
        var a = t.type;
        Ga(a) && rc(t);
        var r = t.flags;
        return r & _n ? (t.flags = r & ~_n | Xe, (t.mode & nt) !== Se && pm(t), t) : null;
      }
      case E: {
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
          Vl();
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
      case E: {
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
  var Vb = null;
  Vb = /* @__PURE__ */ new Set();
  var Kc = !1, un = !1, zT = typeof WeakSet == "function" ? WeakSet : Set, de = null, Gl = null, Wl = null;
  function HT(e) {
    Yf(null, function() {
      throw e;
    }), If();
  }
  var PT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nt)
      try {
        Ja(), t.componentWillUnmount();
      } finally {
        Xa(e);
      }
    else
      t.componentWillUnmount();
  };
  function kb(e, t) {
    try {
      ti(Vt, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Ym(e, t, n) {
    try {
      PT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function BT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      lt(e, t, a);
    }
  }
  function Ub(e, t) {
    try {
      zb(e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function Ql(e, t) {
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
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
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
  var Fb = !1;
  function $T(e, t) {
    tC(e.containerInfo), de = t, YT();
    var n = Fb;
    return Fb = !1, n;
  }
  function YT() {
    for (; de !== null; ) {
      var e = de, t = e.child;
      (e.subtreeFlags & Xf) !== Ce && t !== null ? (t.return = e, de = t) : IT();
    }
  }
  function IT() {
    for (; de !== null; ) {
      var e = de;
      mt(e);
      try {
        qT(e);
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
  function qT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== Ce) {
      switch (mt(e), e.tag) {
        case D:
        case $:
        case ue:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Ii && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : _a(e.type, a), r);
            {
              var u = Vb;
              l === void 0 && !u.has(e.type) && (u.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ve(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case E: {
          {
            var s = e.stateNode;
            DC(s.containerInfo);
          }
          break;
        }
        case k:
        case Q:
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
          l.destroy = void 0, u !== void 0 && ((e & ln) !== Bn ? oS(t) : (e & Vt) !== Bn && Th(t), (e & Wa) !== Bn && Gu(!0), Xc(t, n, u), (e & Wa) !== Bn && Gu(!1), (e & ln) !== Bn ? uS() : (e & Vt) !== Bn && jh());
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
          (e & ln) !== Bn ? iS(t) : (e & Vt) !== Bn && sS(t);
          var l = i.create;
          (e & Wa) !== Bn && Gu(!0), i.destroy = l(), (e & Wa) !== Bn && Gu(!1), (e & ln) !== Bn ? lS() : (e & Vt) !== Bn && cS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var s = void 0;
              (i.tag & Vt) !== Ce ? s = "useLayoutEffect" : (i.tag & Wa) !== Ce ? s = "useInsertionEffect" : s = "useEffect";
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
  function GT(e, t) {
    if ((t.flags & Ke) !== Ce)
      switch (t.tag) {
        case q: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = eb(), u = t.alternate === null ? "mount" : "update";
          Zy() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var s = t.return;
          e: for (; s !== null; ) {
            switch (s.tag) {
              case E:
                var m = s.stateNode;
                m.passiveEffectDuration += n;
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
  function WT(e, t, n, a) {
    if ((n.flags & wo) !== Ce)
      switch (n.tag) {
        case D:
        case $:
        case ue: {
          if (!un)
            if (n.mode & nt)
              try {
                Ja(), ti(Vt | At, n);
              } finally {
                Xa(n);
              }
            else
              ti(Vt | At, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Ke && !un)
            if (t === null)
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), n.mode & nt)
                try {
                  Ja(), r.componentDidMount();
                } finally {
                  Xa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : _a(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), n.mode & nt)
                try {
                  Ja(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Xa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(n) || "instance")), Ry(n, u, r));
          break;
        }
        case E: {
          var s = n.updateQueue;
          if (s !== null) {
            var m = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case k:
                  m = n.child.stateNode;
                  break;
                case T:
                  m = n.child.stateNode;
                  break;
              }
            Ry(n, s, m);
          }
          break;
        }
        case k: {
          var h = n.stateNode;
          if (t === null && n.flags & Ke) {
            var S = n.type, x = n.memoizedProps;
            dC(h, S, x);
          }
          break;
        }
        case Q:
          break;
        case j:
          break;
        case q: {
          {
            var O = n.memoizedProps, V = O.onCommit, z = O.onRender, ie = n.stateNode.effectDuration, Ee = eb(), he = t === null ? "mount" : "update";
            Zy() && (he = "nested-update"), typeof z == "function" && z(n.memoizedProps.id, he, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof V == "function" && V(n.memoizedProps.id, he, ie, Ee), Ij(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case E:
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
          nj(e, n);
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
    un || n.flags & Ri && zb(n);
  }
  function QT(e) {
    switch (e.tag) {
      case D:
      case $:
      case ue: {
        if (e.mode & nt)
          try {
            Ja(), kb(e, e.return);
          } finally {
            Xa(e);
          }
        else
          kb(e, e.return);
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && BT(e, e.return, t), Ub(e, e.return);
        break;
      }
      case k: {
        Ub(e, e.return);
        break;
      }
    }
  }
  function KT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === k) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? xC(r) : RC(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === Q) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? SC(i) : CC(i, a.memoizedProps);
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
  function zb(e) {
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
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ve(e)), t.current = a;
    }
  }
  function XT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Hb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Hb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === k) {
        var n = e.stateNode;
        n !== null && aD(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function JT(e) {
    for (var t = e.return; t !== null; ) {
      if (Pb(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Pb(e) {
    return e.tag === k || e.tag === E || e.tag === j;
  }
  function Bb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Pb(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== Q && t.tag !== K; ) {
        if (t.flags & wt || t.child === null || t.tag === j)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & wt))
        return t.stateNode;
    }
  }
  function ZT(e) {
    var t = JT(e);
    switch (t.tag) {
      case k: {
        var n = t.stateNode;
        t.flags & jo && (Yg(n), t.flags &= ~jo);
        var a = Bb(e);
        qm(e, a, n);
        break;
      }
      case E:
      case j: {
        var r = t.stateNode.containerInfo, i = Bb(e);
        Im(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Im(e, t, n) {
    var a = e.tag, r = a === k || a === Q;
    if (r) {
      var i = e.stateNode;
      t ? yC(n, i, t) : hC(n, i);
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
    var a = e.tag, r = a === k || a === Q;
    if (r) {
      var i = e.stateNode;
      t ? gC(n, i, t) : vC(n, i);
    } else if (a !== j) {
      var l = e.child;
      if (l !== null) {
        qm(l, t, n);
        for (var u = l.sibling; u !== null; )
          qm(u, t, n), u = u.sibling;
      }
    }
  }
  var sn = null, Ma = !1;
  function ej(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case k: {
            sn = a.stateNode, Ma = !1;
            break e;
          }
          case E: {
            sn = a.stateNode.containerInfo, Ma = !0;
            break e;
          }
          case j: {
            sn = a.stateNode.containerInfo, Ma = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (sn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      $b(e, t, n), sn = null, Ma = !1;
    }
    XT(n);
  }
  function ni(e, t, n) {
    for (var a = n.child; a !== null; )
      $b(e, t, a), a = a.sibling;
  }
  function $b(e, t, n) {
    switch (tS(n), n.tag) {
      case k:
        un || Ql(n, t);
      case Q: {
        {
          var a = sn, r = Ma;
          sn = null, ni(e, t, n), sn = a, Ma = r, sn !== null && (Ma ? NC(sn, n.stateNode) : bC(sn, n.stateNode));
        }
        return;
      }
      case K: {
        sn !== null && (Ma ? EC(sn, n.stateNode) : ap(sn, n.stateNode));
        return;
      }
      case j: {
        {
          var i = sn, l = Ma;
          sn = n.stateNode.containerInfo, Ma = !0, ni(e, t, n), sn = i, Ma = l;
        }
        return;
      }
      case D:
      case $:
      case ge:
      case ue: {
        if (!un) {
          var u = n.updateQueue;
          if (u !== null) {
            var s = u.lastEffect;
            if (s !== null) {
              var m = s.next, h = m;
              do {
                var S = h, x = S.destroy, O = S.tag;
                x !== void 0 && ((O & Wa) !== Bn ? Xc(n, t, x) : (O & Vt) !== Bn && (Th(n), n.mode & nt ? (Ja(), Xc(n, t, x), Xa(n)) : Xc(n, t, x), jh())), h = h.next;
              } while (h !== m);
            }
          }
        }
        ni(e, t, n);
        return;
      }
      case T: {
        if (!un) {
          Ql(n, t);
          var V = n.stateNode;
          typeof V.componentWillUnmount == "function" && Ym(n, t, V);
        }
        ni(e, t, n);
        return;
      }
      case fe: {
        ni(e, t, n);
        return;
      }
      case ee: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ye
        ) {
          var z = un;
          un = z || n.memoizedState !== null, ni(e, t, n), un = z;
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
  function tj(e) {
    e.memoizedState;
  }
  function nj(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && HC(i);
        }
      }
    }
  }
  function Yb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new zT()), t.forEach(function(a) {
        var r = Jj.bind(null, e, a);
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
  function aj(e, t, n) {
    Gl = n, Wl = e, mt(t), Ib(t, e), mt(t), Gl = null, Wl = null;
  }
  function Aa(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          ej(e, t, i);
        } catch (s) {
          lt(i, t, s);
        }
      }
    var l = cs();
    if (t.subtreeFlags & Jf)
      for (var u = t.child; u !== null; )
        mt(u), Ib(u, e), u = u.sibling;
    mt(l);
  }
  function Ib(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case D:
      case $:
      case ge:
      case ue: {
        if (Aa(t, e), Za(e), r & Ke) {
          try {
            La(Wa | At, e, e.return), ti(Wa | At, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Ja(), La(Vt | At, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Xa(e);
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
        Aa(t, e), Za(e), r & Ri && a !== null && Ql(a, a.return);
        return;
      }
      case k: {
        Aa(t, e), Za(e), r & Ri && a !== null && Ql(a, a.return);
        {
          if (e.flags & jo) {
            var i = e.stateNode;
            try {
              Yg(i);
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
                  pC(l, h, m, s, u, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case Q: {
        if (Aa(t, e), Za(e), r & Ke) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var S = e.stateNode, x = e.memoizedProps, O = a !== null ? a.memoizedProps : x;
          try {
            mC(S, O, x);
          } catch (De) {
            lt(e, e.return, De);
          }
        }
        return;
      }
      case E: {
        if (Aa(t, e), Za(e), r & Ke && a !== null) {
          var V = a.memoizedState;
          if (V.isDehydrated)
            try {
              zC(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case j: {
        Aa(t, e), Za(e);
        return;
      }
      case P: {
        Aa(t, e), Za(e);
        var z = e.child;
        if (z.flags & Ci) {
          var ie = z.stateNode, Ee = z.memoizedState, he = Ee !== null;
          if (ie.isHidden = he, he) {
            var qe = z.alternate !== null && z.alternate.memoizedState !== null;
            qe || Uj();
          }
        }
        if (r & Ke) {
          try {
            tj(e);
          } catch (De) {
            lt(e, e.return, De);
          }
          Yb(e);
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
          un = w || Pe, Aa(t, e), un = w;
        } else
          Aa(t, e);
        if (Za(e), r & Ci) {
          var H = e.stateNode, _ = e.memoizedState, W = _ !== null, ce = e;
          if (H.isHidden = W, W && !Pe && (ce.mode & Ye) !== Se) {
            de = ce;
            for (var le = ce.child; le !== null; )
              de = le, ij(le), le = le.sibling;
          }
          KT(ce, W);
        }
        return;
      }
      case U: {
        Aa(t, e), Za(e), r & Ke && Yb(e);
        return;
      }
      case fe:
        return;
      default: {
        Aa(t, e), Za(e);
        return;
      }
    }
  }
  function Za(e) {
    var t = e.flags;
    if (t & wt) {
      try {
        ZT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~wt;
    }
    t & dr && (e.flags &= ~dr);
  }
  function rj(e, t, n) {
    Gl = n, Wl = t, de = e, qb(e, t, n), Gl = null, Wl = null;
  }
  function qb(e, t, n) {
    for (var a = (e.mode & Ye) !== Se; de !== null; ) {
      var r = de, i = r.child;
      if (r.tag === ee && a) {
        var l = r.memoizedState !== null, u = l || Kc;
        if (u) {
          Gm(e, t, n);
          continue;
        } else {
          var s = r.alternate, m = s !== null && s.memoizedState !== null, h = m || un, S = Kc, x = un;
          Kc = u, un = h, un && !x && (de = r, lj(r));
          for (var O = i; O !== null; )
            de = O, qb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          de = r, Kc = S, un = x, Gm(e, t, n);
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
          WT(t, r, a, n);
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
  function ij(e) {
    for (; de !== null; ) {
      var t = de, n = t.child;
      switch (t.tag) {
        case D:
        case $:
        case ge:
        case ue: {
          if (t.mode & nt)
            try {
              Ja(), La(Vt, t, t.return);
            } finally {
              Xa(t);
            }
          else
            La(Vt, t, t.return);
          break;
        }
        case T: {
          Ql(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Ym(t, t.return, a);
          break;
        }
        case k: {
          Ql(t, t.return);
          break;
        }
        case ee: {
          var r = t.memoizedState !== null;
          if (r) {
            Gb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, de = n) : Gb(e);
    }
  }
  function Gb(e) {
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
  function lj(e) {
    for (; de !== null; ) {
      var t = de, n = t.child;
      if (t.tag === ee) {
        var a = t.memoizedState !== null;
        if (a) {
          Wb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, de = n) : Wb(e);
    }
  }
  function Wb(e) {
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
  function oj(e, t, n, a) {
    de = t, uj(t, e, n, a);
  }
  function uj(e, t, n, a) {
    for (; de !== null; ) {
      var r = de, i = r.child;
      (r.subtreeFlags & vl) !== Ce && i !== null ? (i.return = r, de = i) : sj(e, t, n, a);
    }
  }
  function sj(e, t, n, a) {
    for (; de !== null; ) {
      var r = de;
      if ((r.flags & Ur) !== Ce) {
        mt(r);
        try {
          cj(t, r, n, a);
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
  function cj(e, t, n, a) {
    switch (t.tag) {
      case D:
      case $:
      case ue: {
        if (t.mode & nt) {
          dm();
          try {
            ti(ln | At, t);
          } finally {
            fm(t);
          }
        } else
          ti(ln | At, t);
        break;
      }
    }
  }
  function fj(e) {
    de = e, dj();
  }
  function dj() {
    for (; de !== null; ) {
      var e = de, t = e.child;
      if ((de.flags & Si) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            de = r, vj(r, e);
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
      (e.subtreeFlags & vl) !== Ce && t !== null ? (t.return = e, de = t) : pj();
    }
  }
  function pj() {
    for (; de !== null; ) {
      var e = de;
      (e.flags & Ur) !== Ce && (mt(e), mj(e), It());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, de = t;
        return;
      }
      de = e.return;
    }
  }
  function mj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ue: {
        e.mode & nt ? (dm(), La(ln | At, e, e.return), fm(e)) : La(ln | At, e, e.return);
        break;
      }
    }
  }
  function vj(e, t) {
    for (; de !== null; ) {
      var n = de;
      mt(n), gj(n, t), It();
      var a = n.child;
      a !== null ? (a.return = n, de = a) : hj(e);
    }
  }
  function hj(e) {
    for (; de !== null; ) {
      var t = de, n = t.sibling, a = t.return;
      if (Hb(t), t === e) {
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
  function gj(e, t) {
    switch (e.tag) {
      case D:
      case $:
      case ue: {
        e.mode & nt ? (dm(), La(ln, e, t), fm(e)) : La(ln, e, t);
        break;
      }
    }
  }
  function yj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ue: {
        try {
          ti(Vt | At, e);
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
  function bj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ue: {
        try {
          ti(ln | At, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function Nj(e) {
    switch (e.tag) {
      case D:
      case $:
      case ue: {
        try {
          La(Vt | At, e, e.return);
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
      case D:
      case $:
      case ue:
        try {
          La(ln | At, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Vu = Symbol.for;
    Vu("selector.component"), Vu("selector.has_pseudo_class"), Vu("selector.role"), Vu("selector.test_id"), Vu("selector.text");
  }
  var xj = [];
  function Sj() {
    xj.forEach(function(e) {
      return e();
    });
  }
  var Rj = v.ReactCurrentActQueue;
  function Cj(e) {
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
      return !e && Rj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var Dj = Math.ceil, Wm = v.ReactCurrentDispatcher, Qm = v.ReactCurrentOwner, cn = v.ReactCurrentBatchConfig, Va = v.ReactCurrentActQueue, Ft = (
    /*             */
    0
  ), Kb = (
    /*               */
    1
  ), fn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), Rr = 0, ku = 1, qi = 2, Jc = 3, Uu = 4, Xb = 5, Km = 6, Ie = Ft, Ln = null, bt = null, zt = I, er = I, Xm = qr(I), Ht = Rr, Fu = null, Zc = I, zu = I, ef = I, Hu = null, $n = null, Jm = 0, Jb = 500, Zb = 1 / 0, Tj = 500, Cr = null;
  function Pu() {
    Zb = qt() + Tj;
  }
  function eN() {
    return Zb;
  }
  var tf = !1, Zm = null, Kl = null, Gi = !1, ai = null, Bu = I, ev = [], tv = null, jj = 50, $u = 0, nv = null, av = !1, nf = !1, wj = 50, Xl = 0, af = null, Yu = st, rf = I, tN = !1;
  function lf() {
    return Ln;
  }
  function Mn() {
    return (Ie & (fn | da)) !== Ft ? qt() : (Yu !== st || (Yu = qt()), Yu);
  }
  function ri(e) {
    var t = e.mode;
    if ((t & Ye) === Se)
      return _e;
    if ((Ie & fn) !== Ft && zt !== I)
      return ko(zt);
    var n = RD() !== SD;
    if (n) {
      if (cn.transition !== null) {
        var a = cn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return rf === Wt && (rf = kh()), rf;
    }
    var r = Ra();
    if (r !== Wt)
      return r;
    var i = uC();
    return i;
  }
  function _j(e) {
    var t = e.mode;
    return (t & Ye) === Se ? _e : LS();
  }
  function Pt(e, t, n, a) {
    e1(), tN && f("useInsertionEffect must not schedule updates."), av && (nf = !0), Uo(e, n, a), (Ie & fn) !== I && e === Ln ? a1(t) : (Sa && zh(e, t, n), r1(t), e === Ln && ((Ie & fn) === Ft && (zu = Ue(zu, n)), Ht === Uu && ii(e, zt)), Yn(e, a), n === _e && Ie === Ft && (t.mode & Ye) === Se && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Va.isBatchingLegacy && (Pu(), ty()));
  }
  function Oj(e, t, n) {
    var a = e.current;
    a.lanes = t, Uo(e, t, n), Yn(e, n);
  }
  function Lj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & fn) !== Ft
    );
  }
  function Yn(e, t) {
    var n = e.callbackNode;
    DS(e, t);
    var a = Ds(e, e === Ln ? zt : I);
    if (a === I) {
      n !== null && gN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== cv)) {
      n == null && i !== _e && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && gN(n);
    var l;
    if (r === _e)
      e.tag === Gr ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), lD(rN.bind(null, e))) : ey(rN.bind(null, e)), Va.current !== null ? Va.current.push(Wr) : cC(function() {
        (Ie & (fn | da)) === Ft && Wr();
      }), l = null;
    else {
      var u;
      switch (Bh(a)) {
        case Qn:
          u = xs;
          break;
        case vr:
          u = Zf;
          break;
        case hr:
          u = ji;
          break;
        case ws:
          u = ed;
          break;
        default:
          u = ji;
          break;
      }
      l = fv(u, nN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function nN(e, t) {
    if (KD(), Yu = st, rf = I, (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Tr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Ds(e, e === Ln ? zt : I);
    if (r === I)
      return null;
    var i = !Ts(e, r) && !OS(e, r) && !t, l = i ? Bj(e, r) : uf(e, r);
    if (l !== Rr) {
      if (l === qi) {
        var u = xd(e);
        u !== I && (r = u, l = rv(e, u));
      }
      if (l === ku) {
        var s = Fu;
        throw Wi(e, I), ii(e, r), Yn(e, qt()), s;
      }
      if (l === Km)
        ii(e, r);
      else {
        var m = !Ts(e, r), h = e.current.alternate;
        if (m && !Aj(h)) {
          if (l = uf(e, r), l === qi) {
            var S = xd(e);
            S !== I && (r = S, l = rv(e, S));
          }
          if (l === ku) {
            var x = Fu;
            throw Wi(e, I), ii(e, r), Yn(e, qt()), x;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Mj(e, l, r);
      }
    }
    return Yn(e, qt()), e.callbackNode === n ? nN.bind(null, e) : null;
  }
  function rv(e, t) {
    var n = Hu;
    if (_s(e)) {
      var a = Wi(e, t);
      a.flags |= fr, ZC(e.containerInfo);
    }
    var r = uf(e, t);
    if (r !== qi) {
      var i = $n;
      $n = n, i !== null && aN(i);
    }
    return r;
  }
  function aN(e) {
    $n === null ? $n = e : $n.push.apply($n, e);
  }
  function Mj(e, t, n) {
    switch (t) {
      case Rr:
      case ku:
        throw new Error("Root did not complete. This is a bug in React.");
      case qi: {
        Qi(e, $n, Cr);
        break;
      }
      case Jc: {
        if (ii(e, n), Ah(n) && // do not delay if we're inside an act() scope
        !yN()) {
          var a = Jm + Jb - qt();
          if (a > 10) {
            var r = Ds(e, I);
            if (r !== I)
              break;
            var i = e.suspendedLanes;
            if (!El(i, n)) {
              Mn(), Fh(e, i);
              break;
            }
            e.timeoutHandle = tp(Qi.bind(null, e, $n, Cr), a);
            break;
          }
        }
        Qi(e, $n, Cr);
        break;
      }
      case Uu: {
        if (ii(e, n), _S(n))
          break;
        if (!yN()) {
          var l = RS(e, n), u = l, s = qt() - u, m = Zj(s) - s;
          if (m > 10) {
            e.timeoutHandle = tp(Qi.bind(null, e, $n, Cr), m);
            break;
          }
        }
        Qi(e, $n, Cr);
        break;
      }
      case Xb: {
        Qi(e, $n, Cr);
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
  function ii(e, t) {
    t = js(t, ef), t = js(t, zu), AS(e, t);
  }
  function rN(e) {
    if (XD(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    Tr();
    var t = Ds(e, I);
    if (!Wn(t, _e))
      return Yn(e, qt()), null;
    var n = uf(e, t);
    if (e.tag !== Gr && n === qi) {
      var a = xd(e);
      a !== I && (t = a, n = rv(e, a));
    }
    if (n === ku) {
      var r = Fu;
      throw Wi(e, I), ii(e, t), Yn(e, qt()), r;
    }
    if (n === Km)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Qi(e, $n, Cr), Yn(e, qt()), null;
  }
  function Vj(e, t) {
    t !== I && (Dd(e, Ue(t, _e)), Yn(e, qt()), (Ie & (fn | da)) === Ft && (Pu(), Wr()));
  }
  function iv(e, t) {
    var n = Ie;
    Ie |= Kb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === Ft && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Va.isBatchingLegacy && (Pu(), ty());
    }
  }
  function kj(e, t, n, a, r) {
    var i = Ra(), l = cn.transition;
    try {
      return cn.transition = null, Qt(Qn), e(t, n, a, r);
    } finally {
      Qt(i), cn.transition = l, Ie === Ft && Pu();
    }
  }
  function Dr(e) {
    ai !== null && ai.tag === Gr && (Ie & (fn | da)) === Ft && Tr();
    var t = Ie;
    Ie |= Kb;
    var n = cn.transition, a = Ra();
    try {
      return cn.transition = null, Qt(Qn), e ? e() : void 0;
    } finally {
      Qt(a), cn.transition = n, Ie = t, (Ie & (fn | da)) === Ft && Wr();
    }
  }
  function iN() {
    return (Ie & (fn | da)) !== Ft;
  }
  function of(e, t) {
    bn(Xm, er, e), er = Ue(er, t);
  }
  function lv(e) {
    er = Xm.current, yn(Xm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = I;
    var n = e.timeoutHandle;
    if (n !== np && (e.timeoutHandle = np, sC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        Ab(r, a), a = a.return;
      }
    Ln = e;
    var i = Ki(e.current, null);
    return bt = i, zt = er = t, Ht = Rr, Fu = null, Zc = I, zu = I, ef = I, Hu = null, $n = null, OD(), Ta.discardPendingWarnings(), i;
  }
  function lN(e, t) {
    do {
      var n = bt;
      try {
        if (hc(), _y(), It(), Qm.current = null, n === null || n.return === null) {
          Ht = ku, Fu = t, bt = null;
          return;
        }
        if (Xt && n.mode & nt && Ic(n, !0), In)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            dS(n, a, zt);
          } else
            fS(n, t, zt);
        lT(e, n.return, n, t, zt), cN(n);
      } catch (r) {
        t = r, bt === n && n !== null ? (n = n.return, bt = n) : n = bt;
        continue;
      }
      return;
    } while (!0);
  }
  function oN() {
    var e = Wm.current;
    return Wm.current = Hc, e === null ? Hc : e;
  }
  function uN(e) {
    Wm.current = e;
  }
  function Uj() {
    Jm = qt();
  }
  function Iu(e) {
    Zc = Ue(e, Zc);
  }
  function Fj() {
    Ht === Rr && (Ht = Jc);
  }
  function ov() {
    (Ht === Rr || Ht === Jc || Ht === qi) && (Ht = Uu), Ln !== null && (Sd(Zc) || Sd(zu)) && ii(Ln, zt);
  }
  function zj(e) {
    Ht !== Uu && (Ht = qi), Hu === null ? Hu = [e] : Hu.push(e);
  }
  function Hj() {
    return Ht === Rr;
  }
  function uf(e, t) {
    var n = Ie;
    Ie |= fn;
    var a = oN();
    if (Ln !== e || zt !== t) {
      if (Sa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (qu(e, zt), r.clear()), Hh(e, t);
      }
      Cr = Ph(), Wi(e, t);
    }
    wh(t);
    do
      try {
        Pj();
        break;
      } catch (i) {
        lN(e, i);
      }
    while (!0);
    if (hc(), Ie = n, uN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return _h(), Ln = null, zt = I, Ht;
  }
  function Pj() {
    for (; bt !== null; )
      sN(bt);
  }
  function Bj(e, t) {
    var n = Ie;
    Ie |= fn;
    var a = oN();
    if (Ln !== e || zt !== t) {
      if (Sa) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (qu(e, zt), r.clear()), Hh(e, t);
      }
      Cr = Ph(), Pu(), Wi(e, t);
    }
    wh(t);
    do
      try {
        $j();
        break;
      } catch (i) {
        lN(e, i);
      }
    while (!0);
    return hc(), uN(a), Ie = n, bt !== null ? (gS(), Rr) : (_h(), Ln = null, zt = I, Ht);
  }
  function $j() {
    for (; bt !== null && !Ix(); )
      sN(bt);
  }
  function sN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== Se ? (cm(e), n = uv(t, e, er), Ic(e, !0)) : n = uv(t, e, er), It(), e.memoizedProps = e.pendingProps, n === null ? cN(e) : bt = n, Qm.current = null;
  }
  function cN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Es) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === Se ? r = Mb(n, t, er) : (cm(t), r = Mb(n, t, er), Ic(t, !1)), It(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = FT(n, t);
        if (i !== null) {
          i.flags &= zx, bt = i;
          return;
        }
        if ((t.mode & nt) !== Se) {
          Ic(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Es, a.subtreeFlags = Ce, a.deletions = null;
        else {
          Ht = Km, bt = null;
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
    Ht === Rr && (Ht = Xb);
  }
  function Qi(e, t, n) {
    var a = Ra(), r = cn.transition;
    try {
      cn.transition = null, Qt(Qn), Yj(e, t, n, a);
    } finally {
      cn.transition = r, Qt(a);
    }
    return null;
  }
  function Yj(e, t, n, a) {
    do
      Tr();
    while (ai !== null);
    if (t1(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (rS(i), r === null)
      return Dh(), null;
    if (i === I && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = I, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = Ue(r.lanes, r.childLanes);
    VS(e, l), e === Ln && (Ln = null, bt = null, zt = I), ((r.subtreeFlags & vl) !== Ce || (r.flags & vl) !== Ce) && (Gi || (Gi = !0, tv = n, fv(ji, function() {
      return Tr(), null;
    })));
    var u = (r.subtreeFlags & (Xf | Jf | wo | vl)) !== Ce, s = (r.flags & (Xf | Jf | wo | vl)) !== Ce;
    if (u || s) {
      var m = cn.transition;
      cn.transition = null;
      var h = Ra();
      Qt(Qn);
      var S = Ie;
      Ie |= da, Qm.current = null, $T(e, r), tb(), aj(e, r, i), nC(e.containerInfo), e.current = r, pS(i), rj(r, e, i), mS(), qx(), Ie = S, Qt(h), cn.transition = m;
    } else
      e.current = r, tb();
    var x = Gi;
    if (Gi ? (Gi = !1, ai = e, Bu = i) : (Xl = 0, af = null), l = e.pendingLanes, l === I && (Kl = null), x || mN(e.current, !1), Zx(r.stateNode, a), Sa && e.memoizedUpdaters.clear(), Sj(), Yn(e, qt()), t !== null)
      for (var O = e.onRecoverableError, V = 0; V < t.length; V++) {
        var z = t[V], ie = z.stack, Ee = z.digest;
        O(z.value, {
          componentStack: ie,
          digest: Ee
        });
      }
    if (tf) {
      tf = !1;
      var he = Zm;
      throw Zm = null, he;
    }
    return Wn(Bu, _e) && e.tag !== Gr && Tr(), l = e.pendingLanes, Wn(l, _e) ? (QD(), e === nv ? $u++ : ($u = 0, nv = e)) : $u = 0, Wr(), Dh(), null;
  }
  function Tr() {
    if (ai !== null) {
      var e = Bh(Bu), t = zS(hr, e), n = cn.transition, a = Ra();
      try {
        return cn.transition = null, Qt(t), qj();
      } finally {
        Qt(a), cn.transition = n;
      }
    }
    return !1;
  }
  function Ij(e) {
    ev.push(e), Gi || (Gi = !0, fv(ji, function() {
      return Tr(), null;
    }));
  }
  function qj() {
    if (ai === null)
      return !1;
    var e = tv;
    tv = null;
    var t = ai, n = Bu;
    if (ai = null, Bu = I, (Ie & (fn | da)) !== Ft)
      throw new Error("Cannot flush passive effects while already rendering.");
    av = !0, nf = !1, vS(n);
    var a = Ie;
    Ie |= da, fj(t.current), oj(t, t.current, n, e);
    {
      var r = ev;
      ev = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        GT(t, l);
      }
    }
    hS(), mN(t.current, !0), Ie = a, Wr(), nf ? t === af ? Xl++ : (Xl = 0, af = t) : Xl = 0, av = !1, nf = !1, eS(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function fN(e) {
    return Kl !== null && Kl.has(e);
  }
  function Gj(e) {
    Kl === null ? Kl = /* @__PURE__ */ new Set([e]) : Kl.add(e);
  }
  function Wj(e) {
    tf || (tf = !0, Zm = e);
  }
  var Qj = Wj;
  function dN(e, t, n) {
    var a = Yi(n, t), r = sb(e, a, _e), i = Kr(e, r, _e), l = Mn();
    i !== null && (Uo(i, _e, l), Yn(i, l));
  }
  function lt(e, t, n) {
    if (HT(n), Gu(!1), e.tag === E) {
      dN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === E) {
        dN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !fN(i)) {
          var l = Yi(n, e), u = jm(a, l, _e), s = Kr(a, u, _e), m = Mn();
          s !== null && (Uo(s, _e, m), Yn(s, m));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Kj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Mn();
    Fh(e, n), i1(e), Ln === e && El(zt, n) && (Ht === Uu || Ht === Jc && Ah(zt) && qt() - Jm < Jb ? Wi(e, I) : ef = Ue(ef, n)), Yn(e, r);
  }
  function pN(e, t) {
    t === Wt && (t = _j(e));
    var n = Mn(), a = Pn(e, t);
    a !== null && (Uo(a, t, n), Yn(a, n));
  }
  function Xj(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), pN(e, n);
  }
  function Jj(e, t) {
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
    a !== null && a.delete(t), pN(e, n);
  }
  function Zj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Dj(e / 1960) * 1960;
  }
  function e1() {
    if ($u > jj)
      throw $u = 0, nv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > wj && (Xl = 0, af = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function t1() {
    Ta.flushLegacyContextWarning(), Ta.flushPendingUnsafeLifecycleWarnings();
  }
  function mN(e, t) {
    mt(e), sf(e, Fr, Nj), t && sf(e, Kf, Ej), sf(e, Fr, yj), t && sf(e, Kf, bj), It();
  }
  function sf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ce ? a = a.child : ((a.flags & t) !== Ce && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cf = null;
  function vN(e) {
    {
      if ((Ie & fn) !== Ft || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== M && t !== E && t !== T && t !== D && t !== $ && t !== ge && t !== ue)
        return;
      var n = Ve(e) || "ReactComponent";
      if (cf !== null) {
        if (cf.has(n))
          return;
        cf.add(n);
      } else
        cf = /* @__PURE__ */ new Set([n]);
      var a = Tn;
      try {
        mt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : It();
      }
    }
  }
  var uv;
  {
    var n1 = null;
    uv = function(e, t, n) {
      var a = SN(n1, t);
      try {
        return jb(e, t, n);
      } catch (i) {
        if (mD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (hc(), _y(), Ab(e, t), SN(t, a), t.mode & nt && cm(t), Yf(null, jb, null, e, t, n), kx()) {
          var r = If();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var hN = !1, sv;
  sv = /* @__PURE__ */ new Set();
  function a1(e) {
    if (bi && !qD())
      switch (e.tag) {
        case D:
        case $:
        case ue: {
          var t = bt && Ve(bt) || "Unknown", n = t;
          if (!sv.has(n)) {
            sv.add(n);
            var a = Ve(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          hN || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), hN = !0);
          break;
        }
      }
  }
  function qu(e, t) {
    if (Sa) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        zh(e, a, t);
      });
    }
  }
  var cv = {};
  function fv(e, t) {
    {
      var n = Va.current;
      return n !== null ? (n.push(t), cv) : Ch(e, t);
    }
  }
  function gN(e) {
    if (e !== cv)
      return Yx(e);
  }
  function yN() {
    return Va.current !== null;
  }
  function r1(e) {
    {
      if (e.mode & Ye) {
        if (!Qb())
          return;
      } else if (!Cj() || Ie !== Ft || e.tag !== D && e.tag !== $ && e.tag !== ue)
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
          t ? mt(e) : It();
        }
      }
    }
  }
  function i1(e) {
    e.tag !== Gr && Qb() && Va.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Gu(e) {
    tN = e;
  }
  var pa = null, Jl = null, l1 = function(e) {
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
  function bN(e, t) {
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
          (typeof a == "function" || i === xe) && (r = !0);
          break;
        }
        case $: {
          (i === Ne || i === xe) && (r = !0);
          break;
        }
        case ge:
        case ue: {
          (i === ke || i === xe) && (r = !0);
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
  function NN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Jl === null && (Jl = /* @__PURE__ */ new WeakSet()), Jl.add(e);
    }
  }
  var o1 = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Tr(), Dr(function() {
        mv(e.current, a, n);
      });
    }
  }, u1 = function(e, t) {
    {
      if (e.context !== Jn)
        return;
      Tr(), Dr(function() {
        Wu(t, e, null, null);
      });
    }
  };
  function mv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, u = e.type, s = null;
      switch (l) {
        case D:
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
      var m = !1, h = !1;
      if (s !== null) {
        var S = pa(s);
        S !== void 0 && (n.has(S) ? h = !0 : t.has(S) && (l === T ? h = !0 : m = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || m) {
        var x = Pn(e, _e);
        x !== null && Pt(x, e, _e, st);
      }
      r !== null && !h && mv(r, t, n), i !== null && mv(i, t, n);
    }
  }
  var s1 = function(e, t) {
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
        case D:
        case ue:
        case T:
          u = l;
          break;
        case $:
          u = l.render;
          break;
      }
      var s = !1;
      u !== null && t.has(u) && (s = !0), s ? c1(e, n) : a !== null && vv(a, t, n), r !== null && vv(r, t, n);
    }
  }
  function c1(e, t) {
    {
      var n = f1(e, t);
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
  function f1(e, t) {
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
  function d1(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = I, this.childLanes = I, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !hv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Zn = function(e, t, n, a) {
    return new d1(e, t, n, a);
  };
  function gv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function p1(e) {
    return typeof e == "function" && !gv(e) && e.defaultProps === void 0;
  }
  function m1(e) {
    if (typeof e == "function")
      return gv(e) ? T : D;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return $;
      if (t === ke)
        return ge;
    }
    return M;
  }
  function Ki(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & pr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case M:
      case D:
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
  function v1(e, t) {
    e.flags &= pr | wt;
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
  function h1(e, t, n) {
    var a;
    return e === lc ? (a = Ye, t === !0 && (a |= xt, a |= Ya)) : a = Se, Sa && (a |= nt), Zn(E, null, null, a);
  }
  function yv(e, t, n, a, r, i) {
    var l = M, u = e;
    if (typeof e == "function")
      gv(e) ? (l = T, u = dv(u)) : u = Zl(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case Ha:
          return li(n.children, r, i, t);
        case pi:
          l = ne, r |= xt, (r & Ye) !== Se && (r |= Ya);
          break;
        case N:
          return g1(n, r, i, t);
        case Be:
          return y1(n, r, i, t);
        case we:
          return b1(n, r, i, t);
        case dt:
          return xN(n, r, i, t);
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
              case xe:
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
  function bv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = yv(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function li(e, t, n, a) {
    var r = Zn(pe, e, a, t);
    return r.lanes = n, r;
  }
  function g1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(q, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function y1(e, t, n, a) {
    var r = Zn(P, e, a, t);
    return r.elementType = Be, r.lanes = n, r;
  }
  function b1(e, t, n, a) {
    var r = Zn(U, e, a, t);
    return r.elementType = we, r.lanes = n, r;
  }
  function xN(e, t, n, a) {
    var r = Zn(ee, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Nv(e, t, n) {
    var a = Zn(Q, e, null, t);
    return a.lanes = n, a;
  }
  function N1() {
    var e = Zn(k, null, null, Se);
    return e.elementType = "DELETED", e;
  }
  function E1(e) {
    var t = Zn(K, null, null, Se);
    return t.stateNode = e, t;
  }
  function Ev(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(j, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function SN(e, t) {
    return e === null && (e = Zn(M, null, null, Se)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function x1(e, t, n, a, r) {
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
      case Gr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function RN(e, t, n, a, r, i, l, u, s, m) {
    var h = new x1(e, t, n, u, s), S = h1(t, i);
    h.current = S, S.stateNode = h;
    {
      var x = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      S.memoizedState = x;
    }
    return Ap(S), h;
  }
  var xv = "18.3.1";
  function S1(e, t, n) {
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
  function CN(e) {
    if (!e)
      return Jn;
    var t = dl(e), n = iD(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ga(a))
        return Jg(t, a, n);
    }
    return n;
  }
  function R1(e, t) {
    {
      var n = dl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = xh(n);
      if (r === null)
        return null;
      if (r.mode & xt) {
        var i = Ve(n) || "Component";
        if (!Rv[i]) {
          Rv[i] = !0;
          var l = Tn;
          try {
            mt(r), n.mode & xt ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? mt(l) : It();
          }
        }
      }
      return r.stateNode;
    }
  }
  function DN(e, t, n, a, r, i, l, u) {
    var s = !1, m = null;
    return RN(e, t, s, m, n, a, r, i, l);
  }
  function TN(e, t, n, a, r, i, l, u, s, m) {
    var h = !0, S = RN(n, a, h, e, r, i, l, u, s);
    S.context = CN(null);
    var x = S.current, O = Mn(), V = ri(x), z = xr(O, V);
    return z.callback = t ?? null, Kr(x, z, V), Oj(S, V, O), S;
  }
  function Wu(e, t, n, a) {
    Jx(t, e);
    var r = t.current, i = Mn(), l = ri(r);
    yS(l);
    var u = CN(n);
    t.context === null ? t.context = u : t.pendingContext = u, bi && Tn !== null && !Sv && (Sv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ve(Tn) || "Unknown"));
    var s = xr(i, l);
    s.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), s.callback = a);
    var m = Kr(r, s, l);
    return m !== null && (Pt(m, r, l, i), Ec(m, r, l)), l;
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
  function C1(e) {
    switch (e.tag) {
      case E: {
        var t = e.stateNode;
        if (_s(t)) {
          var n = TS(t);
          Vj(t, n);
        }
        break;
      }
      case P: {
        Dr(function() {
          var r = Pn(e, _e);
          if (r !== null) {
            var i = Mn();
            Pt(r, e, _e, i);
          }
        });
        var a = _e;
        Cv(e, a);
        break;
      }
    }
  }
  function jN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = MS(n.retryLane, t));
  }
  function Cv(e, t) {
    jN(e, t);
    var n = e.alternate;
    n && jN(n, t);
  }
  function D1(e) {
    if (e.tag === P) {
      var t = Mo, n = Pn(e, t);
      if (n !== null) {
        var a = Mn();
        Pt(n, e, t, a);
      }
      Cv(e, t);
    }
  }
  function T1(e) {
    if (e.tag === P) {
      var t = ri(e), n = Pn(e, t);
      if (n !== null) {
        var a = Mn();
        Pt(n, e, t, a);
      }
      Cv(e, t);
    }
  }
  function wN(e) {
    var t = $x(e);
    return t === null ? null : t.stateNode;
  }
  var _N = function(e) {
    return null;
  };
  function j1(e) {
    return _N(e);
  }
  var ON = function(e) {
    return !1;
  };
  function w1(e) {
    return ON(e);
  }
  var LN = null, MN = null, AN = null, VN = null, kN = null, UN = null, FN = null, zN = null, HN = null;
  {
    var PN = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : ze({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = PN(e[a], t, n + 1), r);
    }, BN = function(e, t) {
      return PN(e, t, 0);
    }, $N = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : ze({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], He(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = $N(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, YN = function(e, t, n) {
      if (t.length !== n.length) {
        R("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            R("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return $N(e, t, n, 0);
    }, IN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : ze({}, e);
      return i[r] = IN(e[r], t, n + 1, a), i;
    }, qN = function(e, t, n) {
      return IN(e, t, 0, n);
    }, Dv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    LN = function(e, t, n, a) {
      var r = Dv(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, _e);
        l !== null && Pt(l, e, _e, st);
      }
    }, MN = function(e, t, n) {
      var a = Dv(e, t);
      if (a !== null) {
        var r = BN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Pn(e, _e);
        i !== null && Pt(i, e, _e, st);
      }
    }, AN = function(e, t, n, a) {
      var r = Dv(e, t);
      if (r !== null) {
        var i = YN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, _e);
        l !== null && Pt(l, e, _e, st);
      }
    }, VN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, _e);
      a !== null && Pt(a, e, _e, st);
    }, kN = function(e, t) {
      e.pendingProps = BN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Pn(e, _e);
      n !== null && Pt(n, e, _e, st);
    }, UN = function(e, t, n) {
      e.pendingProps = YN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, _e);
      a !== null && Pt(a, e, _e, st);
    }, FN = function(e) {
      var t = Pn(e, _e);
      t !== null && Pt(t, e, _e, st);
    }, zN = function(e) {
      _N = e;
    }, HN = function(e) {
      ON = e;
    };
  }
  function _1(e) {
    var t = xh(e);
    return t === null ? null : t.stateNode;
  }
  function O1(e) {
    return null;
  }
  function L1() {
    return Tn;
  }
  function M1(e) {
    var t = e.findFiberByHostInstance, n = v.ReactCurrentDispatcher;
    return Xx({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: LN,
      overrideHookStateDeletePath: MN,
      overrideHookStateRenamePath: AN,
      overrideProps: VN,
      overridePropsDeletePath: kN,
      overridePropsRenamePath: UN,
      setErrorHandler: zN,
      setSuspenseHandler: HN,
      scheduleUpdate: FN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: _1,
      findFiberByHostInstance: t || O1,
      // React Refresh
      findHostInstancesForRefresh: s1,
      scheduleRefresh: o1,
      scheduleRoot: u1,
      setRefreshHandler: l1,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: L1,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: xv
    });
  }
  var GN = typeof reportError == "function" ? (
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
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : pf(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== jt) {
        var a = wN(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Wu(e, t, null, null);
  }, df.prototype.unmount = Tv.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      iN() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Dr(function() {
        Wu(null, e, null, null);
      }), Gg(t);
    }
  };
  function A1(e, t) {
    if (!pf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    WN(e);
    var n = !1, a = !1, r = "", i = GN;
    t != null && (t.hydrate ? R("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = DN(e, lc, null, n, a, r, i);
    Zs(l.current, e);
    var u = e.nodeType === jt ? e.parentNode : e;
    return eu(u), new Tv(l);
  }
  function df(e) {
    this._internalRoot = e;
  }
  function V1(e) {
    e && KS(e);
  }
  df.prototype.unstable_scheduleHydration = V1;
  function k1(e, t, n) {
    if (!pf(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    WN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", s = GN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError));
    var m = TN(t, null, e, lc, a, i, l, u, s);
    if (Zs(m.current, e), eu(e), r)
      for (var h = 0; h < r.length; h++) {
        var S = r[h];
        HD(m, S);
      }
    return new df(m);
  }
  function pf(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === cr || e.nodeType === Mf));
  }
  function Qu(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === cr || e.nodeType === Mf || e.nodeType === jt && e.nodeValue === " react-mount-point-unstable "));
  }
  function WN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fu(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var U1 = v.ReactCurrentOwner, QN;
  QN = function(e) {
    if (e._reactRootContainer && e.nodeType !== jt) {
      var t = wN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = jv(e), r = !!(a && Ir(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function jv(e) {
    return e ? e.nodeType === cr ? e.documentElement : e.firstChild : null;
  }
  function KN() {
  }
  function F1(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var x = ff(l);
          i.call(x);
        };
      }
      var l = TN(
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
        KN
      );
      e._reactRootContainer = l, Zs(l.current, e);
      var u = e.nodeType === jt ? e.parentNode : e;
      return eu(u), Dr(), l;
    } else {
      for (var s; s = e.lastChild; )
        e.removeChild(s);
      if (typeof a == "function") {
        var m = a;
        a = function() {
          var x = ff(h);
          m.call(x);
        };
      }
      var h = DN(
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
        KN
      );
      e._reactRootContainer = h, Zs(h.current, e);
      var S = e.nodeType === jt ? e.parentNode : e;
      return eu(S), Dr(function() {
        Wu(t, h, n, a);
      }), h;
    }
  }
  function z1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function mf(e, t, n, a, r) {
    QN(n), z1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = F1(n, t, e, r, a);
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
  var XN = !1;
  function H1(e) {
    {
      XN || (XN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = U1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Qe(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : R1(e, "findDOMNode");
  }
  function P1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fu(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return mf(null, e, t, !0, n);
  }
  function B1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fu(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return mf(null, e, t, !1, n);
  }
  function $1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !Ux(e))
      throw new Error("parentComponent must be a valid React Component");
    return mf(e, t, n, !1, a);
  }
  var JN = !1;
  function Y1(e) {
    if (JN || (JN = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = fu(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = jv(e), a = n && !Ir(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Dr(function() {
        mf(null, null, e, !1, function() {
          e._reactRootContainer = null, Gg(e);
        });
      }), !0;
    } else {
      {
        var r = jv(e), i = !!(r && Ir(r)), l = e.nodeType === zn && Qu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  HS(C1), BS(D1), $S(T1), YS(Ra), IS(US), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Dx(q0), wx(iv, kj, Dr);
  function I1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!pf(t))
      throw new Error("Target container is not a DOM element.");
    return S1(e, t, null, n);
  }
  function q1(e, t, n, a) {
    return $1(e, t, n, a);
  }
  var wv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [Ir, _l, ec, sh, ch, iv]
  };
  function G1(e, t) {
    return wv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), A1(e, t);
  }
  function W1(e, t, n) {
    return wv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), k1(e, t, n);
  }
  function Q1(e) {
    return iN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Dr(e);
  }
  var K1 = M1({
    findFiberByHostInstance: Vi,
    bundleType: 1,
    version: xv,
    rendererPackageName: "react-dom"
  });
  if (!K1 && tn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var ZN = window.location.protocol;
    /^(https?|file):$/.test(ZN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (ZN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wv, ta.createPortal = I1, ta.createRoot = G1, ta.findDOMNode = H1, ta.flushSync = Q1, ta.hydrate = P1, ta.hydrateRoot = W1, ta.render = B1, ta.unmountComponentAtNode = Y1, ta.unstable_batchedUpdates = iv, ta.unstable_renderSubtreeIntoContainer = q1, ta.version = xv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
gE.exports = ta;
var iw = gE.exports, NE, eE = iw;
{
  var tE = eE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  NE = function(o, p) {
    tE.usingClientEntryPoint = !0;
    try {
      return eE.createRoot(o, p);
    } finally {
      tE.usingClientEntryPoint = !1;
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
      var v = arguments[p];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (o[g] = v[g]);
    }
    return o;
  }, Xu.apply(this, arguments);
}
var ui;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(ui || (ui = {}));
const nE = "popstate";
function lw(o) {
  o === void 0 && (o = {});
  function p(g, y) {
    let {
      pathname: R,
      search: f,
      hash: L
    } = g.location;
    return Mv(
      "",
      {
        pathname: R,
        search: f,
        hash: L
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function v(g, y) {
    return typeof y == "string" ? y : Ju(y);
  }
  return uw(p, v, null, o);
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
function ow() {
  return Math.random().toString(36).substr(2, 8);
}
function aE(o, p) {
  return {
    usr: o.state,
    key: o.key,
    idx: p
  };
}
function Mv(o, p, v, g) {
  return v === void 0 && (v = null), Xu({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof p == "string" ? no(p) : p, {
    state: v,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: p && p.key || g || ow()
  });
}
function Ju(o) {
  let {
    pathname: p = "/",
    search: v = "",
    hash: g = ""
  } = o;
  return v && v !== "?" && (p += v.charAt(0) === "?" ? v : "?" + v), g && g !== "#" && (p += g.charAt(0) === "#" ? g : "#" + g), p;
}
function no(o) {
  let p = {};
  if (o) {
    let v = o.indexOf("#");
    v >= 0 && (p.hash = o.substr(v), o = o.substr(0, v));
    let g = o.indexOf("?");
    g >= 0 && (p.search = o.substr(g), o = o.substr(0, g)), o && (p.pathname = o);
  }
  return p;
}
function uw(o, p, v, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: R = !1
  } = g, f = y.history, L = ui.Pop, D = null, T = M();
  T == null && (T = 0, f.replaceState(Xu({}, f.state, {
    idx: T
  }), ""));
  function M() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function E() {
    L = ui.Pop;
    let ne = M(), ve = ne == null ? null : ne - T;
    T = ne, D && D({
      action: L,
      location: pe.location,
      delta: ve
    });
  }
  function j(ne, ve) {
    L = ui.Push;
    let Y = Mv(pe.location, ne, ve);
    T = M() + 1;
    let $ = aE(Y, T), q = pe.createHref(Y);
    try {
      f.pushState($, "", q);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError")
        throw P;
      y.location.assign(q);
    }
    R && D && D({
      action: L,
      location: pe.location,
      delta: 1
    });
  }
  function k(ne, ve) {
    L = ui.Replace;
    let Y = Mv(pe.location, ne, ve);
    T = M();
    let $ = aE(Y, T), q = pe.createHref(Y);
    f.replaceState($, "", q), R && D && D({
      action: L,
      location: pe.location,
      delta: 0
    });
  }
  function Q(ne) {
    let ve = y.location.origin !== "null" ? y.location.origin : y.location.href, Y = typeof ne == "string" ? ne : Ju(ne);
    return Y = Y.replace(/ $/, "%20"), ht(ve, "No window.location.(origin|href) available to create URL for href: " + Y), new URL(Y, ve);
  }
  let pe = {
    get action() {
      return L;
    },
    get location() {
      return o(y, f);
    },
    listen(ne) {
      if (D)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(nE, E), D = ne, () => {
        y.removeEventListener(nE, E), D = null;
      };
    },
    createHref(ne) {
      return p(y, ne);
    },
    createURL: Q,
    encodeLocation(ne) {
      let ve = Q(ne);
      return {
        pathname: ve.pathname,
        search: ve.search,
        hash: ve.hash
      };
    },
    push: j,
    replace: k,
    go(ne) {
      return f.go(ne);
    }
  };
  return pe;
}
var rE;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(rE || (rE = {}));
function sw(o, p, v) {
  return v === void 0 && (v = "/"), cw(o, p, v);
}
function cw(o, p, v, g) {
  let y = typeof p == "string" ? no(p) : p, R = ci(y.pathname || "/", v);
  if (R == null)
    return null;
  let f = EE(o);
  fw(f);
  let L = null;
  for (let D = 0; L == null && D < f.length; ++D) {
    let T = xw(R);
    L = Nw(f[D], T);
  }
  return L;
}
function EE(o, p, v, g) {
  p === void 0 && (p = []), v === void 0 && (v = []), g === void 0 && (g = "");
  let y = (R, f, L) => {
    let D = {
      relativePath: L === void 0 ? R.path || "" : L,
      caseSensitive: R.caseSensitive === !0,
      childrenIndex: f,
      route: R
    };
    D.relativePath.startsWith("/") && (ht(D.relativePath.startsWith(g), 'Absolute route path "' + D.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), D.relativePath = D.relativePath.slice(g.length));
    let T = _r([g, D.relativePath]), M = v.concat(D);
    R.children && R.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      R.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), EE(R.children, p, M, T)), !(R.path == null && !R.index) && p.push({
      path: T,
      score: yw(T, R.index),
      routesMeta: M
    });
  };
  return o.forEach((R, f) => {
    var L;
    if (R.path === "" || !((L = R.path) != null && L.includes("?")))
      y(R, f);
    else
      for (let D of xE(R.path))
        y(R, f, D);
  }), p;
}
function xE(o) {
  let p = o.split("/");
  if (p.length === 0) return [];
  let [v, ...g] = p, y = v.endsWith("?"), R = v.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [R, ""] : [R];
  let f = xE(g.join("/")), L = [];
  return L.push(...f.map((D) => D === "" ? R : [R, D].join("/"))), y && L.push(...f), L.map((D) => o.startsWith("/") && D === "" ? "/" : D);
}
function fw(o) {
  o.sort((p, v) => p.score !== v.score ? v.score - p.score : bw(p.routesMeta.map((g) => g.childrenIndex), v.routesMeta.map((g) => g.childrenIndex)));
}
const dw = /^:[\w-]+$/, pw = 3, mw = 2, vw = 1, hw = 10, gw = -2, iE = (o) => o === "*";
function yw(o, p) {
  let v = o.split("/"), g = v.length;
  return v.some(iE) && (g += gw), p && (g += mw), v.filter((y) => !iE(y)).reduce((y, R) => y + (dw.test(R) ? pw : R === "" ? vw : hw), g);
}
function bw(o, p) {
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
function Nw(o, p, v) {
  let {
    routesMeta: g
  } = o, y = {}, R = "/", f = [];
  for (let L = 0; L < g.length; ++L) {
    let D = g[L], T = L === g.length - 1, M = R === "/" ? p : p.slice(R.length) || "/", E = Av({
      path: D.relativePath,
      caseSensitive: D.caseSensitive,
      end: T
    }, M), j = D.route;
    if (!E)
      return null;
    Object.assign(y, E.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: _r([R, E.pathname]),
      pathnameBase: Dw(_r([R, E.pathnameBase])),
      route: j
    }), E.pathnameBase !== "/" && (R = _r([R, E.pathnameBase]));
  }
  return f;
}
function Av(o, p) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [v, g] = Ew(o.path, o.caseSensitive, o.end), y = p.match(v);
  if (!y) return null;
  let R = y[0], f = R.replace(/(.)\/+$/, "$1"), L = y.slice(1);
  return {
    params: g.reduce((T, M, E) => {
      let {
        paramName: j,
        isOptional: k
      } = M;
      if (j === "*") {
        let pe = L[E] || "";
        f = R.slice(0, R.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const Q = L[E];
      return k && !Q ? T[j] = void 0 : T[j] = (Q || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: R,
    pathnameBase: f,
    pattern: o
  };
}
function Ew(o, p, v) {
  p === void 0 && (p = !1), v === void 0 && (v = !0), ka(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, L, D) => (g.push({
    paramName: L,
    isOptional: D != null
  }), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : v ? y += "\\/*$" : o !== "" && o !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, p ? void 0 : "i"), g];
}
function xw(o) {
  try {
    return o.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return ka(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), o;
  }
}
function ci(o, p) {
  if (p === "/") return o;
  if (!o.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let v = p.endsWith("/") ? p.length - 1 : p.length, g = o.charAt(v);
  return g && g !== "/" ? null : o.slice(v) || "/";
}
function Sw(o, p) {
  p === void 0 && (p = "/");
  let {
    pathname: v,
    search: g = "",
    hash: y = ""
  } = typeof o == "string" ? no(o) : o;
  return {
    pathname: v ? v.startsWith("/") ? v : Rw(v, p) : p,
    search: Tw(g),
    hash: jw(y)
  };
}
function Rw(o, p) {
  let v = p.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? v.length > 1 && v.pop() : y !== "." && v.push(y);
  }), v.length > 1 ? v.join("/") : "/";
}
function _v(o, p, v, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + v + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Cw(o) {
  return o.filter((p, v) => v === 0 || p.route.path && p.route.path.length > 0);
}
function Fv(o, p) {
  let v = Cw(o);
  return p ? v.map((g, y) => y === v.length - 1 ? g.pathname : g.pathnameBase) : v.map((g) => g.pathnameBase);
}
function zv(o, p, v, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = no(o) : (y = Xu({}, o), ht(!y.pathname || !y.pathname.includes("?"), _v("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), _v("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), _v("#", "search", "hash", y)));
  let R = o === "" || y.pathname === "", f = R ? "/" : y.pathname, L;
  if (f == null)
    L = v;
  else {
    let E = p.length - 1;
    if (!g && f.startsWith("..")) {
      let j = f.split("/");
      for (; j[0] === ".."; )
        j.shift(), E -= 1;
      y.pathname = j.join("/");
    }
    L = E >= 0 ? p[E] : "/";
  }
  let D = Sw(y, L), T = f && f !== "/" && f.endsWith("/"), M = (R || f === ".") && v.endsWith("/");
  return !D.pathname.endsWith("/") && (T || M) && (D.pathname += "/"), D;
}
const _r = (o) => o.join("/").replace(/\/\/+/g, "/"), Dw = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Tw = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, jw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function ww(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const SE = ["post", "put", "patch", "delete"];
new Set(SE);
const _w = ["get", ...SE];
new Set(_w);
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
      var v = arguments[p];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (o[g] = v[g]);
    }
    return o;
  }, Zu.apply(this, arguments);
}
const ts = /* @__PURE__ */ C.createContext(null);
ts.displayName = "DataRouter";
const Hv = /* @__PURE__ */ C.createContext(null);
Hv.displayName = "DataRouterState";
const Ow = /* @__PURE__ */ C.createContext(null);
Ow.displayName = "Await";
const ma = /* @__PURE__ */ C.createContext(null);
ma.displayName = "Navigation";
const ns = /* @__PURE__ */ C.createContext(null);
ns.displayName = "Location";
const Fa = /* @__PURE__ */ C.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Fa.displayName = "Route";
const Pv = /* @__PURE__ */ C.createContext(null);
Pv.displayName = "RouteError";
function Lw(o, p) {
  let {
    relative: v
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
  } = C.useContext(ma), {
    hash: R,
    pathname: f,
    search: L
  } = as(o, {
    relative: v
  }), D = f;
  return g !== "/" && (D = f === "/" ? g : _r([g, f])), y.createHref({
    pathname: D,
    search: L,
    hash: R
  });
}
function ao() {
  return C.useContext(ns) != null;
}
function Xi() {
  return ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C.useContext(ns).location;
}
const RE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function CE(o) {
  C.useContext(ma).static || C.useLayoutEffect(o);
}
function Bv() {
  let {
    isDataRoute: o
  } = C.useContext(Fa);
  return o ? Gw() : Mw();
}
function Mw() {
  ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = C.useContext(ts), {
    basename: p,
    future: v,
    navigator: g
  } = C.useContext(ma), {
    matches: y
  } = C.useContext(Fa), {
    pathname: R
  } = Xi(), f = JSON.stringify(Fv(y, v.v7_relativeSplatPath)), L = C.useRef(!1);
  return CE(() => {
    L.current = !0;
  }), C.useCallback(function(T, M) {
    if (M === void 0 && (M = {}), ka(L.current, RE), !L.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let E = zv(T, JSON.parse(f), R, M.relative === "path");
    o == null && p !== "/" && (E.pathname = E.pathname === "/" ? p : _r([p, E.pathname])), (M.replace ? g.replace : g.push)(E, M.state, M);
  }, [p, g, f, R, o]);
}
function Aw() {
  let {
    matches: o
  } = C.useContext(Fa), p = o[o.length - 1];
  return p ? p.params : {};
}
function as(o, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    future: g
  } = C.useContext(ma), {
    matches: y
  } = C.useContext(Fa), {
    pathname: R
  } = Xi(), f = JSON.stringify(Fv(y, g.v7_relativeSplatPath));
  return C.useMemo(() => zv(o, JSON.parse(f), R, v === "path"), [o, f, R, v]);
}
function Vw(o, p) {
  return kw(o, p);
}
function kw(o, p, v, g) {
  ao() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = C.useContext(ma), {
    matches: R
  } = C.useContext(Fa), f = R[R.length - 1], L = f ? f.params : {}, D = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", M = f && f.route;
  {
    let Y = M && M.path || "";
    TE(D, !M || Y.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + D + '" (under <Route path="' + Y + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + Y + '"> to <Route ') + ('path="' + (Y === "/" ? "*" : Y + "/*") + '">.'));
  }
  let E = Xi(), j;
  if (p) {
    var k;
    let Y = typeof p == "string" ? no(p) : p;
    T === "/" || (k = Y.pathname) != null && k.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + Y.pathname + '" was given in the `location` prop.')), j = Y;
  } else
    j = E;
  let Q = j.pathname || "/", pe = Q;
  if (T !== "/") {
    let Y = T.replace(/^\//, "").split("/");
    pe = "/" + Q.replace(/^\//, "").split("/").slice(Y.length).join("/");
  }
  let ne = sw(o, {
    pathname: pe
  });
  ka(M || ne != null, 'No routes matched location "' + j.pathname + j.search + j.hash + '" '), ka(ne == null || ne[ne.length - 1].route.element !== void 0 || ne[ne.length - 1].route.Component !== void 0 || ne[ne.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + j.pathname + j.search + j.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ve = Pw(ne && ne.map((Y) => Object.assign({}, Y, {
    params: Object.assign({}, L, Y.params),
    pathname: _r([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(Y.pathname).pathname : Y.pathname
    ]),
    pathnameBase: Y.pathnameBase === "/" ? T : _r([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(Y.pathnameBase).pathname : Y.pathnameBase
    ])
  })), R, v, g);
  return p && ve ? /* @__PURE__ */ C.createElement(ns.Provider, {
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
function Uw() {
  let o = qw(), p = ww(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), v = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
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
const Fw = /* @__PURE__ */ C.createElement(Uw, null);
class zw extends C.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ C.createElement(Fa.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ C.createElement(Pv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Hw(o) {
  let {
    routeContext: p,
    match: v,
    children: g
  } = o, y = C.useContext(ts);
  return y && y.static && y.staticContext && (v.route.errorElement || v.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = v.route.id), /* @__PURE__ */ C.createElement(Fa.Provider, {
    value: p
  }, g);
}
function Pw(o, p, v, g) {
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
  let f = o, L = (y = v) == null ? void 0 : y.errors;
  if (L != null) {
    let M = f.findIndex((E) => E.route.id && (L == null ? void 0 : L[E.route.id]) !== void 0);
    M >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(L).join(",")), f = f.slice(0, Math.min(f.length, M + 1));
  }
  let D = !1, T = -1;
  if (v && g && g.v7_partialHydration)
    for (let M = 0; M < f.length; M++) {
      let E = f[M];
      if ((E.route.HydrateFallback || E.route.hydrateFallbackElement) && (T = M), E.route.id) {
        let {
          loaderData: j,
          errors: k
        } = v, Q = E.route.loader && j[E.route.id] === void 0 && (!k || k[E.route.id] === void 0);
        if (E.route.lazy || Q) {
          D = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((M, E, j) => {
    let k, Q = !1, pe = null, ne = null;
    v && (k = L && E.route.id ? L[E.route.id] : void 0, pe = E.route.errorElement || Fw, D && (T < 0 && j === 0 ? (TE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), Q = !0, ne = null) : T === j && (Q = !0, ne = E.route.hydrateFallbackElement || null)));
    let ve = p.concat(f.slice(0, j + 1)), Y = () => {
      let $;
      return k ? $ = pe : Q ? $ = ne : E.route.Component ? $ = /* @__PURE__ */ C.createElement(E.route.Component, null) : E.route.element ? $ = E.route.element : $ = M, /* @__PURE__ */ C.createElement(Hw, {
        match: E,
        routeContext: {
          outlet: M,
          matches: ve,
          isDataRoute: v != null
        },
        children: $
      });
    };
    return v && (E.route.ErrorBoundary || E.route.errorElement || j === 0) ? /* @__PURE__ */ C.createElement(zw, {
      location: v.location,
      revalidation: v.revalidation,
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
var DE = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(DE || {}), es = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(es || {});
function $v(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Bw(o) {
  let p = C.useContext(ts);
  return p || ht(!1, $v(o)), p;
}
function $w(o) {
  let p = C.useContext(Hv);
  return p || ht(!1, $v(o)), p;
}
function Yw(o) {
  let p = C.useContext(Fa);
  return p || ht(!1, $v(o)), p;
}
function Yv(o) {
  let p = Yw(o), v = p.matches[p.matches.length - 1];
  return v.route.id || ht(!1, o + ' can only be used on routes that contain a unique "id"'), v.route.id;
}
function Iw() {
  return Yv(es.UseRouteId);
}
function qw() {
  var o;
  let p = C.useContext(Pv), v = $w(es.UseRouteError), g = Yv(es.UseRouteError);
  return p !== void 0 ? p : (o = v.errors) == null ? void 0 : o[g];
}
function Gw() {
  let {
    router: o
  } = Bw(DE.UseNavigateStable), p = Yv(es.UseNavigateStable), v = C.useRef(!1);
  return CE(() => {
    v.current = !0;
  }), C.useCallback(function(y, R) {
    R === void 0 && (R = {}), ka(v.current, RE), v.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, Zu({
      fromRouteId: p
    }, R)));
  }, [o, p]);
}
const lE = {};
function TE(o, p, v) {
  !p && !lE[o] && (lE[o] = !0, ka(!1, v));
}
const oE = {};
function Ww(o, p) {
  oE[p] || (oE[p] = !0, console.warn(p));
}
const uE = (o, p, v) => Ww(o, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + v + "."));
function Qw(o, p) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && uE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && uE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Kw(o) {
  let {
    to: p,
    replace: v,
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
    future: R,
    static: f
  } = C.useContext(ma);
  ka(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: L
  } = C.useContext(Fa), {
    pathname: D
  } = Xi(), T = Bv(), M = zv(p, Fv(L, R.v7_relativeSplatPath), D, y === "path"), E = JSON.stringify(M);
  return C.useEffect(() => T(JSON.parse(E), {
    replace: v,
    state: g,
    relative: y
  }), [T, E, y, v, g]), null;
}
function wr(o) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Xw(o) {
  let {
    basename: p = "/",
    children: v = null,
    location: g,
    navigationType: y = ui.Pop,
    navigator: R,
    static: f = !1,
    future: L
  } = o;
  ao() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let D = p.replace(/^\/*/, "/"), T = C.useMemo(() => ({
    basename: D,
    navigator: R,
    static: f,
    future: Zu({
      v7_relativeSplatPath: !1
    }, L)
  }), [D, L, R, f]);
  typeof g == "string" && (g = no(g));
  let {
    pathname: M = "/",
    search: E = "",
    hash: j = "",
    state: k = null,
    key: Q = "default"
  } = g, pe = C.useMemo(() => {
    let ne = ci(M, D);
    return ne == null ? null : {
      location: {
        pathname: ne,
        search: E,
        hash: j,
        state: k,
        key: Q
      },
      navigationType: y
    };
  }, [D, M, E, j, k, Q, y]);
  return ka(pe != null, '<Router basename="' + D + '"> is not able to match the URL ' + ('"' + M + E + j + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ C.createElement(ma.Provider, {
    value: T
  }, /* @__PURE__ */ C.createElement(ns.Provider, {
    children: v,
    value: pe
  }));
}
function Jw(o) {
  let {
    children: p,
    location: v
  } = o;
  return Vw(Vv(p), v);
}
new Promise(() => {
});
function Vv(o, p) {
  p === void 0 && (p = []);
  let v = [];
  return C.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ C.isValidElement(g))
      return;
    let R = [...p, y];
    if (g.type === C.Fragment) {
      v.push.apply(v, Vv(g.props.children, R));
      return;
    }
    g.type !== wr && ht(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || ht(!1, "An index route cannot have child routes.");
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
    g.props.children && (f.children = Vv(g.props.children, R)), v.push(f);
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
function to() {
  return to = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var v = arguments[p];
      for (var g in v)
        Object.prototype.hasOwnProperty.call(v, g) && (o[g] = v[g]);
    }
    return o;
  }, to.apply(this, arguments);
}
function Iv(o, p) {
  if (o == null) return {};
  var v = {}, g = Object.keys(o), y, R;
  for (R = 0; R < g.length; R++)
    y = g[R], !(p.indexOf(y) >= 0) && (v[y] = o[y]);
  return v;
}
const hf = "get", gf = "application/x-www-form-urlencoded";
function Ef(o) {
  return o != null && typeof o.tagName == "string";
}
function Zw(o) {
  return Ef(o) && o.tagName.toLowerCase() === "button";
}
function e_(o) {
  return Ef(o) && o.tagName.toLowerCase() === "form";
}
function t_(o) {
  return Ef(o) && o.tagName.toLowerCase() === "input";
}
function n_(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function a_(o, p) {
  return o.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !n_(o);
}
let vf = null;
function r_() {
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
const i_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Ov(o) {
  return o != null && !i_.has(o) ? (ka(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + gf + '"')), null) : o;
}
function l_(o, p) {
  let v, g, y, R, f;
  if (e_(o)) {
    let L = o.getAttribute("action");
    g = L ? ci(L, p) : null, v = o.getAttribute("method") || hf, y = Ov(o.getAttribute("enctype")) || gf, R = new FormData(o);
  } else if (Zw(o) || t_(o) && (o.type === "submit" || o.type === "image")) {
    let L = o.form;
    if (L == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let D = o.getAttribute("formaction") || L.getAttribute("action");
    if (g = D ? ci(D, p) : null, v = o.getAttribute("formmethod") || L.getAttribute("method") || hf, y = Ov(o.getAttribute("formenctype")) || Ov(L.getAttribute("enctype")) || gf, R = new FormData(L, o), !r_()) {
      let {
        name: T,
        type: M,
        value: E
      } = o;
      if (M === "image") {
        let j = T ? T + "." : "";
        R.append(j + "x", "0"), R.append(j + "y", "0");
      } else T && R.append(T, E);
    }
  } else {
    if (Ef(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    v = hf, g = null, y = gf, f = o;
  }
  return R && y === "text/plain" && (f = R, R = void 0), {
    action: g,
    method: v.toLowerCase(),
    encType: y,
    formData: R,
    body: f
  };
}
const o_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], u_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], s_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], c_ = "6";
try {
  window.__reactRouterVersion = c_;
} catch {
}
const jE = /* @__PURE__ */ C.createContext({
  isTransitioning: !1
});
jE.displayName = "ViewTransition";
const f_ = /* @__PURE__ */ C.createContext(/* @__PURE__ */ new Map());
f_.displayName = "Fetchers";
const d_ = "startTransition", sE = aw[d_];
function p_(o) {
  let {
    basename: p,
    children: v,
    future: g,
    window: y
  } = o, R = C.useRef();
  R.current == null && (R.current = lw({
    window: y,
    v5Compat: !0
  }));
  let f = R.current, [L, D] = C.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, M = C.useCallback((E) => {
    T && sE ? sE(() => D(E)) : D(E);
  }, [D, T]);
  return C.useLayoutEffect(() => f.listen(M), [f, M]), C.useEffect(() => Qw(g), [g]), /* @__PURE__ */ C.createElement(Xw, {
    basename: p,
    children: v,
    location: L.location,
    navigationType: L.action,
    navigator: f,
    future: g
  });
}
const m_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", v_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, oi = /* @__PURE__ */ C.forwardRef(function(p, v) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: R,
    replace: f,
    state: L,
    target: D,
    to: T,
    preventScrollReset: M,
    viewTransition: E
  } = p, j = Iv(p, o_), {
    basename: k
  } = C.useContext(ma), Q, pe = !1;
  if (typeof T == "string" && v_.test(T) && (Q = T, m_))
    try {
      let $ = new URL(window.location.href), q = T.startsWith("//") ? new URL($.protocol + T) : new URL(T), P = ci(q.pathname, k);
      q.origin === $.origin && P != null ? T = P + q.search + q.hash : pe = !0;
    } catch {
      ka(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ne = Lw(T, {
    relative: y
  }), ve = b_(T, {
    replace: f,
    state: L,
    target: D,
    preventScrollReset: M,
    relative: y,
    viewTransition: E
  });
  function Y($) {
    g && g($), $.defaultPrevented || ve($);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ C.createElement("a", to({}, j, {
      href: Q || ne,
      onClick: pe || R ? g : Y,
      ref: v,
      target: D
    }))
  );
});
oi.displayName = "Link";
const h_ = /* @__PURE__ */ C.forwardRef(function(p, v) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: R = "",
    end: f = !1,
    style: L,
    to: D,
    viewTransition: T,
    children: M
  } = p, E = Iv(p, u_), j = as(D, {
    relative: E.relative
  }), k = Xi(), Q = C.useContext(Hv), {
    navigator: pe,
    basename: ne
  } = C.useContext(ma), ve = Q != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  C_(j) && T === !0, Y = pe.encodeLocation ? pe.encodeLocation(j).pathname : j.pathname, $ = k.pathname, q = Q && Q.navigation && Q.navigation.location ? Q.navigation.location.pathname : null;
  y || ($ = $.toLowerCase(), q = q ? q.toLowerCase() : null, Y = Y.toLowerCase()), q && ne && (q = ci(q, ne) || q);
  const P = Y !== "/" && Y.endsWith("/") ? Y.length - 1 : Y.length;
  let ge = $ === Y || !f && $.startsWith(Y) && $.charAt(P) === "/", ue = q != null && (q === Y || !f && q.startsWith(Y) && q.charAt(Y.length) === "/"), X = {
    isActive: ge,
    isPending: ue,
    isTransitioning: ve
  }, Z = ge ? g : void 0, K;
  typeof R == "function" ? K = R(X) : K = [R, ge ? "active" : null, ue ? "pending" : null, ve ? "transitioning" : null].filter(Boolean).join(" ");
  let U = typeof L == "function" ? L(X) : L;
  return /* @__PURE__ */ C.createElement(oi, to({}, E, {
    "aria-current": Z,
    className: K,
    ref: v,
    style: U,
    to: D,
    viewTransition: T
  }), typeof M == "function" ? M(X) : M);
});
h_.displayName = "NavLink";
const g_ = /* @__PURE__ */ C.forwardRef((o, p) => {
  let {
    fetcherKey: v,
    navigate: g,
    reloadDocument: y,
    replace: R,
    state: f,
    method: L = hf,
    action: D,
    onSubmit: T,
    relative: M,
    preventScrollReset: E,
    viewTransition: j
  } = o, k = Iv(o, s_), Q = S_(), pe = R_(D, {
    relative: M
  }), ne = L.toLowerCase() === "get" ? "get" : "post", ve = (Y) => {
    if (T && T(Y), Y.defaultPrevented) return;
    Y.preventDefault();
    let $ = Y.nativeEvent.submitter, q = ($ == null ? void 0 : $.getAttribute("formmethod")) || L;
    Q($ || Y.currentTarget, {
      fetcherKey: v,
      method: q,
      navigate: g,
      replace: R,
      state: f,
      relative: M,
      preventScrollReset: E,
      viewTransition: j
    });
  };
  return /* @__PURE__ */ C.createElement("form", to({
    ref: p,
    method: ne,
    action: pe,
    onSubmit: y ? T : ve
  }, k));
});
g_.displayName = "Form";
var bf;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(bf || (bf = {}));
var cE;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(cE || (cE = {}));
function y_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function wE(o) {
  let p = C.useContext(ts);
  return p || ht(!1, y_(o)), p;
}
function b_(o, p) {
  let {
    target: v,
    replace: g,
    state: y,
    preventScrollReset: R,
    relative: f,
    viewTransition: L
  } = p === void 0 ? {} : p, D = Bv(), T = Xi(), M = as(o, {
    relative: f
  });
  return C.useCallback((E) => {
    if (a_(E, v)) {
      E.preventDefault();
      let j = g !== void 0 ? g : Ju(T) === Ju(M);
      D(o, {
        replace: j,
        state: y,
        preventScrollReset: R,
        relative: f,
        viewTransition: L
      });
    }
  }, [T, D, M, g, y, v, o, R, f, L]);
}
function N_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let E_ = 0, x_ = () => "__" + String(++E_) + "__";
function S_() {
  let {
    router: o
  } = wE(bf.UseSubmit), {
    basename: p
  } = C.useContext(ma), v = Iw();
  return C.useCallback(function(g, y) {
    y === void 0 && (y = {}), N_();
    let {
      action: R,
      method: f,
      encType: L,
      formData: D,
      body: T
    } = l_(g, p);
    if (y.navigate === !1) {
      let M = y.fetcherKey || x_();
      o.fetch(M, v, y.action || R, {
        preventScrollReset: y.preventScrollReset,
        formData: D,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || L,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || R, {
        preventScrollReset: y.preventScrollReset,
        formData: D,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || L,
        replace: y.replace,
        state: y.state,
        fromRouteId: v,
        flushSync: y.flushSync,
        viewTransition: y.viewTransition
      });
  }, [o, p, v]);
}
function R_(o, p) {
  let {
    relative: v
  } = p === void 0 ? {} : p, {
    basename: g
  } = C.useContext(ma), y = C.useContext(Fa);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [R] = y.matches.slice(-1), f = to({}, as(o || ".", {
    relative: v
  })), L = Xi();
  if (o == null) {
    f.search = L.search;
    let D = new URLSearchParams(f.search), T = D.getAll("index");
    if (T.some((E) => E === "")) {
      D.delete("index"), T.filter((j) => j).forEach((j) => D.append("index", j));
      let E = D.toString();
      f.search = E ? "?" + E : "";
    }
  }
  return (!o || o === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : _r([g, f.pathname])), Ju(f);
}
function C_(o, p) {
  p === void 0 && (p = {});
  let v = C.useContext(jE);
  v == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = wE(bf.useViewTransitionState), y = as(o, {
    relative: p.relative
  });
  if (!v.isTransitioning)
    return !1;
  let R = ci(v.currentLocation.pathname, g) || v.currentLocation.pathname, f = ci(v.nextLocation.pathname, g) || v.nextLocation.pathname;
  return Av(y.pathname, f) != null || Av(y.pathname, R) != null;
}
function D_() {
  const [o, p] = C.useState(null), [v, g] = C.useState(""), [y, R] = C.useState(""), [f, L] = C.useState(!0), [D, T] = C.useState(""), [M, E] = C.useState(""), [j, k] = C.useState(!1), [Q, pe] = C.useState(!1);
  C.useEffect(() => {
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
    $.preventDefault(), T(""), E(""), k(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), P = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: ge, setPersistence: ue, browserLocalPersistence: X, browserSessionPersistence: Z, signInWithEmailAndPassword: K } = P, U = ge();
      await ue(U, f ? X : Z);
      const ee = await (await K(U, v.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: ee }) })).ok) throw new Error("Session creation failed");
      E("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (q) {
      T(ne(q));
    } finally {
      k(!1);
    }
  }
  async function Y() {
    T(""), E("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: q, sendPasswordResetEmail: P } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ge = q();
      await P(ge, v.trim()), E("If an account exists for that email, a reset link has been sent.");
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
      D && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: D }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      M && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: M }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: ve, children: [
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
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: f, onChange: ($) => L($.target.checked) }, void 0, !1, {
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
function T_() {
  const [o, p] = C.useState(null), [v, g] = C.useState(""), [y, R] = C.useState(""), [f, L] = C.useState(""), [D, T] = C.useState(""), [M, E] = C.useState(""), [j, k] = C.useState(""), [Q, pe] = C.useState(""), [ne, ve] = C.useState(!1), [Y, $] = C.useState(!1), [q, P] = C.useState(!1), [ge, ue] = C.useState(!1);
  C.useEffect(() => {
    const K = typeof window < "u" ? window : void 0, U = K && K.__FIREBASE__ ? K.__FIREBASE__ : null;
    p({
      apiKey: U && U.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: U && U.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: U && U.projectId || void 0 || "fresh-basket-a8933",
      appId: U && U.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: U && U.messagingSenderId || void 0 || "163656027399",
      measurementId: U && U.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function X(K) {
    const U = (K == null ? void 0 : K.code) || "";
    return U.includes("email-already-in-use") ? "An account with this email already exists." : U.includes("weak-password") ? "Password should be at least 6 characters." : U.includes("invalid-email") ? "Please enter a valid email address." : U.includes("network-request-failed") ? "Network error. Check your connection and try again." : (K == null ? void 0 : K.message) || "Something went wrong.";
  }
  async function Z(K) {
    K.preventDefault(), k(""), pe(""), ve(!0);
    try {
      const U = String(v).trim(), fe = String(y).trim(), ee = fe.replace(/\D+/g, ""), Te = { fn: !U, cn: !fe };
      if (P(Te.fn), ue(Te.cn || ee.length < 7), Te.fn || Te.cn) {
        k("Please fill in required fields");
        return;
      }
      if (ee.length < 7) {
        k("Please enter a valid mobile number");
        return;
      }
      if (D !== M) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const je = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Le, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Je = Le(), Kt = await (await ye(Je, f.trim(), D)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Kt, profile: { fullName: U, contactNumber: fe } }) })).ok) throw new Error("Session creation failed");
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
    Q && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: Q }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: Z, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (q && !String(v).trim() ? " input-error" : ""), value: v, onChange: (K) => {
          g(K.target.value), q && P(!String(K.target.value).trim());
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input" + (ge ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (K) => {
          if (R(K.target.value), ge) {
            const U = String(K.target.value).trim().replace(/\D+/g, "");
            ue(!(U.length >= 7));
          }
        }, onBlur: () => {
          const K = String(y).trim().replace(/\D+/g, "");
          ue(!(K.length >= 7));
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (K) => L(K.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: Y ? "text" : "password", value: D, onChange: (K) => T(K.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": Y ? "Hide password" : "Show password", onClick: () => $((K) => !K), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: M, onChange: (K) => E(K.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
function j_() {
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
      return p((L) => [f, ...L]), R;
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
function si({ children: o }) {
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
  const p = Bv();
  return C.useEffect(() => {
    const v = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(E, j, k) {
      E && (E.classList.toggle("hidden", !k), E.setAttribute("aria-hidden", k ? "false" : "true"), j && j.setAttribute("aria-expanded", k ? "true" : "false"));
    }
    function L() {
      f(g, v, !1), f(R, y, !1);
    }
    function D(E) {
      const j = (k) => k && (k === E.target || k.contains(E.target));
      !j(g) && !j(v) && !j(R) && !j(y) && L();
    }
    function T(E) {
      E.key === "Escape" && L();
    }
    function M(E) {
      E && E.querySelectorAll(".dropdown-item").forEach((j) => {
        j.addEventListener("click", () => L());
      });
    }
    return v && g && (v.addEventListener("click", (E) => {
      E.stopPropagation(), f(R, y, !1), f(g, v, g.classList.contains("hidden"));
    }), M(g)), y && R && (y.addEventListener("click", (E) => {
      E.stopPropagation(), f(g, v, !1), f(R, y, R.classList.contains("hidden"));
    }), M(R)), document.addEventListener("click", D), document.addEventListener("keydown", T), () => {
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
        /* @__PURE__ */ d.jsxDEV(oi, { to: "/dashboard", onClick: (v) => {
          v.preventDefault(), p("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(oi, { to: "/orders", onClick: (v) => {
          v.preventDefault(), p("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(oi, { to: "/riders", onClick: (v) => {
          v.preventDefault(), p("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(oi, { to: "/reports", onClick: (v) => {
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
            /* @__PURE__ */ d.jsxDEV(oi, { className: "dropdown-item", to: "/riders", onClick: (v) => {
              v.preventDefault(), p("/riders");
            }, children: "Riders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(oi, { className: "dropdown-item", to: "/orders", onClick: (v) => {
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
    /* @__PURE__ */ d.jsxDEV(j_, {}, void 0, !1, {
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
function w_({ onClose: o, onCreated: p }) {
  const [v, g] = C.useState(""), [y, R] = C.useState(""), [f, L] = C.useState(""), [D, T] = C.useState(""), [M, E] = C.useState(!1), [j, k] = C.useState(""), [Q, pe] = C.useState(""), [ne, ve] = C.useState(!1), [Y, $] = C.useState(!1), [q, P] = C.useState(!1), [ge, ue] = C.useState(!1);
  async function X() {
    k(""), pe(""), ue(!0);
    const Z = String(v).trim(), K = String(y), U = String(f).trim(), fe = String(D).trim(), ee = fe.replace(/\D+/g, ""), Te = { fn: !U, cn: !fe, pw: !K };
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
    if (K.length < 6) {
      P(!0), k("Password must be at least 6 characters");
      return;
    }
    E(!0);
    try {
      const je = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Z, password: K, fullName: U, contactNumber: fe })
      }), Le = await je.json().catch(() => null);
      if (!je.ok) {
        const ye = String(Le && (Le.error || Le.message) || ""), Je = ye.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ye) || /MISSING\s*EMAIL\/PASSWORD/i.test(ye))
          k("Full name, mobile and password are required"), ve(!U), $(!fe || ee.length < 7), P(!K);
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && !String(f).trim() ? " input-error" : ""), value: f, onChange: (Z) => {
          L(Z.target.value), ge && ve(!String(Z.target.value).trim());
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "email", value: v, onChange: (Z) => {
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
          R(Z.target.value), ge && P(!String(Z.target.value));
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input" + (ge && String(D).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: D, onChange: (Z) => {
          if (T(Z.target.value), ge) {
            const K = String(Z.target.value).trim().replace(/\D+/g, "");
            $(!(K.length >= 7));
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
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: M, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: M, children: M ? "Creating…" : "Create" }, void 0, !1, {
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
function __() {
  const [o, p] = C.useState([]), [v, g] = C.useState(""), [y, R] = C.useState("all"), [f, L] = C.useState("all"), [D, T] = C.useState("all"), [M, E] = C.useState(!0), [j, k] = C.useState(""), [Q, pe] = C.useState(1), [ne, ve] = C.useState(20), [Y, $] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [q, P] = C.useState(!1);
  C.useEffect(() => {
    let X = !0;
    return (async () => {
      var Z, K, U, fe;
      E(!0), k("");
      try {
        const ee = new URLSearchParams();
        v && ee.set("q", v), D !== "all" && ee.set("status", D), y !== "all" && ee.set("lastDays", y), ee.set("page", String(Q)), ee.set("limit", String(ne));
        const Te = await fetch(`/api/riders?${ee.toString()}`, { credentials: "include" });
        if (Te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Te.ok) throw new Error("Failed to load riders");
        const je = await Te.json();
        X && (p(Array.isArray(je.riders) ? je.riders : []), $({ total: ((Z = je.meta) == null ? void 0 : Z.total) || 0, page: ((K = je.meta) == null ? void 0 : K.page) || 1, limit: ((U = je.meta) == null ? void 0 : U.limit) || ne, pages: ((fe = je.meta) == null ? void 0 : fe.pages) || 1 }));
      } catch (ee) {
        X && k(ee.message || "Failed to load riders");
      } finally {
        X && E(!1);
      }
    })(), () => {
      X = !1;
    };
  }, [v, D, y, Q, ne]);
  const ge = C.useMemo(() => o.filter((X) => {
    if (v && !X.name.toLowerCase().includes(v.toLowerCase().trim()) || D !== "all" && X.status !== D || f !== "all" && String(X.id) !== String(f)) return !1;
    if (y !== "all") {
      const Z = parseInt(X.lastActiveDays, 10) || 9999, K = parseInt(y, 10);
      if (!(Z <= K)) return !1;
    }
    return !0;
  }), [o, v, D, f, y]), ue = C.useMemo(() => {
    const X = /* @__PURE__ */ new Date(), Z = [], K = [];
    for (let U = 2; U >= 0; U--) {
      const fe = new Date(X.getFullYear(), X.getMonth() - U, 1), ee = `${fe.getFullYear()}-${String(fe.getMonth() + 1).padStart(2, "0")}`, Te = fe.toLocaleString(void 0, { month: "short", year: "numeric" });
      Z.push(ee), K.push(Te);
    }
    return { keys: Z, labels: K };
  }, []);
  return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-management", children: [
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
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: f, onChange: (X) => L(X.target.value), children: [
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
      q && /* @__PURE__ */ d.jsxDEV(w_, { onClose: () => P(!1), onCreated: () => {
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
            const X = ue.keys[ue.keys.length - 2], Z = String(X).split("-"), K = parseInt(Z[0], 10), U = parseInt(Z[1], 10);
            return `Earnings (${new Date(Number.isFinite(K) ? K : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(U) ? U - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
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
          M && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 129,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 129,
            columnNumber: 17
          }, this),
          !M && j && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: j }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 132,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 132,
            columnNumber: 17
          }, this),
          !M && !j && ge.map((X) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": X.id, "data-status": X.status, "data-last-days": X.lastActiveDays, children: [
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
              var K;
              return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((K = X.monthlyCounts) == null ? void 0 : K[Z]) || 0).toFixed(2),
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
              const Z = Array.isArray(X.orders) ? X.orders : [], K = Z.length;
              if (!K) return /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-performance", children: "0%" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 141,
                columnNumber: 128
              }, this);
              let U = 0;
              for (const ee of Z)
                ee && typeof ee == "object" && (ee.onTime === !0 || ee.on_time === !0 || ee.metrics && ee.metrics.onTime === !0) && (U += 1);
              const fe = Math.round(U / K * 100);
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
          !M && !j && ge.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: Y.page <= 1 || M, onClick: () => pe((X) => Math.max(1, X - 1)), children: "Prev" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: Y.page >= Y.pages || M, onClick: () => pe((X) => Math.min(Y.pages, X + 1)), children: "Next" }, void 0, !1, {
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
const kv = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, fE = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
function Ua(o) {
  return o !== null && typeof o == "object";
}
function Or(o) {
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
    const p = o.trim();
    if (!p) return null;
    const v = Date.parse(p);
    if (Number.isFinite(v)) return new Date(v);
  }
  if (Ua(o)) {
    if (o.at) return Or(o.at);
    if (o.value && o.value !== o) return Or(o.value);
    if (o.expectedAt) return Or(o.expectedAt);
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
    if (kv.test(p)) return parseFloat(p.replace(kv, "$1"));
    if (fE.test(p)) return parseFloat(p.replace(fE, "$1")) / 60;
    const v = Number(p);
    return Number.isFinite(v) ? v : null;
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
function _E(o) {
  var v, g, y, R, f, L;
  if (!Ua(o)) return null;
  const p = [
    o.durationMins,
    o.duration_minutes,
    o.deliveryDuration,
    o.delivery_duration,
    o.actualDuration,
    o.actual_duration,
    o.actualDurationMinutes,
    (v = o.orders) == null ? void 0 : v.deliveryDuration,
    (g = o.orders) == null ? void 0 : g.delivery_duration,
    (y = o.orders) == null ? void 0 : y.durationMins,
    (R = o.orders) == null ? void 0 : R.duration_minutes,
    (f = o.orders) == null ? void 0 : f.actualDuration,
    (L = o.orders) == null ? void 0 : L.actualDurationMinutes
  ];
  for (const D of p) {
    const T = Nf(D);
    if (T !== null) return T;
  }
  return null;
}
function OE(o) {
  var v, g, y, R;
  if (!Ua(o)) return null;
  const p = [
    o.deliveredAt,
    o.actual_delivery_time,
    o.actualDeliveryTime,
    o.deliveryEndTime,
    o.delivery_end_time,
    (v = o.orders) == null ? void 0 : v.deliveredAt,
    (g = o.orders) == null ? void 0 : g.actual_delivery_time,
    (y = o.orders) == null ? void 0 : y.actualDeliveryTime,
    (R = o.orders) == null ? void 0 : R.deliveryEndTime
  ];
  for (const f of p)
    if (f != null) return f;
  return null;
}
function LE(o) {
  var v, g, y, R, f, L;
  if (!Ua(o)) return null;
  const p = [
    o.deliveryStartTime,
    o.delivery_start_time,
    o.start_time,
    o.startTime,
    o.started_at,
    o.startedAt,
    (v = o.orders) == null ? void 0 : v.deliveryStartTime,
    (g = o.orders) == null ? void 0 : g.delivery_start_time,
    (y = o.orders) == null ? void 0 : y.start_time,
    (R = o.orders) == null ? void 0 : R.startTime,
    (f = o.orders) == null ? void 0 : f.started_at,
    (L = o.orders) == null ? void 0 : L.startedAt
  ];
  for (const D of p)
    if (D != null) return D;
  return null;
}
function O_(o) {
  var R, f;
  if (!Ua(o)) return null;
  const p = LE(o);
  if (p != null) return p;
  const v = OE(o), g = _E(o);
  if (v != null && Number.isFinite(g)) {
    const L = Or(v);
    if (L instanceof Date)
      return new Date(L.getTime() - g * 6e4);
  }
  const y = [
    o.created_at,
    o.createdAt,
    o.created,
    (R = o.orders) == null ? void 0 : R.created_at,
    (f = o.orders) == null ? void 0 : f.createdAt
  ];
  for (const L of y)
    if (L != null) return L;
  return null;
}
function ME(o) {
  if (!Ua(o)) return null;
  const p = _E(o);
  if (Number.isFinite(p)) return p;
  const v = Or(OE(o)), g = Or(LE(o));
  if (v instanceof Date && g instanceof Date) {
    const y = v.getTime() - g.getTime();
    if (y >= 0)
      return Math.round(y / 6e4);
  }
  return null;
}
function AE(o) {
  const p = Or(o);
  if (!(p instanceof Date) || Number.isNaN(p.getTime())) return "-";
  try {
    return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function VE(o) {
  if (o == null) return "-";
  if (Ua(o) && o.minutes !== void 0) {
    const v = Number(o.minutes);
    if (Number.isFinite(v)) return `${v} min`;
  }
  const p = Or(o);
  if (p instanceof Date && !Number.isNaN(p.getTime()))
    try {
      return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "-";
    }
  if (typeof o == "number")
    return Number.isFinite(o) ? `${Math.round(o)} min` : "-";
  if (typeof o == "string") {
    const v = o.trim();
    if (!v) return "-";
    const g = v.match(kv);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : v;
  }
  if (Ua(o) && o.expectedMinutes !== void 0) {
    const v = Number(o.expectedMinutes);
    if (Number.isFinite(v)) return `${v} min`;
  }
  return String(o);
}
function kE(o) {
  var g, y, R, f, L, D, T, M;
  if (!Ua(o)) return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (R = o.orders) == null ? void 0 : R.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (L = o.delivery) == null ? void 0 : L.expected_delivery_time,
    (D = o.delivery) == null ? void 0 : D.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (M = o.expected_delivery) == null ? void 0 : M.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const E of p)
    if (E != null && !(typeof E == "string" && !E.trim()))
      return E;
  const v = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(v))
    for (let E = v.length - 1; E >= 0; E -= 1) {
      const j = v[E];
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
function UE(o) {
  const p = Nf(o);
  if (p === null || !Number.isFinite(p)) return "-";
  const v = Math.round(p);
  if (v < 60) return `${v} min`;
  const g = Math.floor(v / 60), y = v % 60;
  return `${g}h ${y}m`;
}
function L_() {
  var M;
  const { id: o } = Aw(), [p, v] = C.useState(null), [g, y] = C.useState(!0), [R, f] = C.useState("");
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
        const k = await j.json();
        E && v(k);
      } catch (j) {
        E && f(j.message || "Failed to load rider");
      } finally {
        E && y(!1);
      }
    })(), () => {
      E = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
  if (R)
    return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
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
    return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
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
  const { rider: L, metrics: D, history: T } = p;
  return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
        /* @__PURE__ */ d.jsxDEV("h3", { className: "rp-name", children: L.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          L.id
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
        /* @__PURE__ */ d.jsxDEV("strong", { children: Array.isArray(L.orders) ? L.orders.length : 0 }, void 0, !1, {
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
          Number(L.totalKm || 0),
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
        (p.riderOrders || []).map((E, j) => {
          const k = E.name || E.orderId, Q = Or(E.created_at), pe = Q instanceof Date && !Number.isNaN(Q.getTime()) ? Q.toISOString().slice(0, 10) : "-", ne = AE(E.deliveryStartTime), ve = kE(E), Y = VE(ve), $ = ME(E), q = UE($), P = Number(E.distance_km), ge = Number.isFinite(P) ? `${P.toFixed(2)} km` : typeof E.distance_km == "string" && E.distance_km.trim() ? E.distance_km : "-";
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
          ] }, E.orderId || j, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 93,
            columnNumber: 19
          }, this);
        }),
        !((M = p.riderOrders) != null && M.length) && (T || []).map((E, j) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name order-cell", children: E.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 105,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km date-cell", children: E.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 106,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 107,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-expected expected-cell", children: E.avgTime ? `${E.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 108,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 109,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(E.distanceKm)) ? `${Number(E.distanceKm).toFixed(2)} km` : E.distanceKm || "-" }, void 0, !1, {
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
function FE({ orderId: o, onClose: p, onAssigned: v }) {
  const [g, y] = C.useState([]), [R, f] = C.useState(!0), [L, D] = C.useState(""), [T, M] = C.useState(null);
  C.useEffect(() => {
    let j = !0;
    return (async () => {
      f(!0), D("");
      try {
        const k = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!k.ok) throw new Error("Failed to load riders");
        const Q = await k.json();
        j && y(Array.isArray(Q.riders) ? Q.riders : Q.riders || []);
      } catch (k) {
        j && D(k.message || "Failed to load riders");
      } finally {
        j && f(!1);
      }
    })(), () => {
      j = !1;
    };
  }, []);
  async function E(j) {
    if (!(!o || !j)) {
      M(j);
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
        const Q = await k.json().catch(() => null);
        if (!k.ok) throw new Error(Q && Q.error ? Q.error : "Assign failed");
        v && v({ orderId: o, riderId: j }), p();
      } catch (k) {
        alert(k.message || "Failed to assign rider");
      } finally {
        M(null);
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
      L && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: L }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 53,
        columnNumber: 21
      }, this),
      !R && !L && /* @__PURE__ */ d.jsxDEV("table", { className: "assign-table", children: [
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
function Uv(o) {
  if (typeof o != "string") return "";
  const p = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return p === "in_transit" ? "in_progress" : p;
}
function zE(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function dE(o) {
  return Uv(zE(o));
}
const M_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], pE = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function A_() {
  const [o, p] = C.useState([]), [v, g] = C.useState(""), [y, R] = C.useState("all"), [f, L] = C.useState(1), [D, T] = C.useState(20), [M, E] = C.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [j, k] = C.useState(!0), [Q, pe] = C.useState(""), [ne, ve] = C.useState(""), [Y, $] = C.useState(!0), [q, P] = C.useState(!1), [ge, ue] = C.useState(null);
  C.useEffect(() => {
    let U = !0;
    return (async () => {
      var fe, ee, Te, je;
      k(!0), pe(""), ve("");
      try {
        const Le = new URLSearchParams();
        if (v && Le.set("q", v), y && y !== "all") {
          const pn = pE[y] || y;
          Le.set("status", Uv(pn));
        }
        Le.set("page", String(f)), Le.set("limit", String(D));
        const ye = await fetch(`/api/orders?${Le.toString()}`, { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load orders");
        const Je = await ye.json();
        U && (p(Array.isArray(Je.orders) ? Je.orders : []), ve(Je.shopifyError || ""), $(!!Je.shopifyConfigured), E({ total: ((fe = Je.meta) == null ? void 0 : fe.total) || 0, page: ((ee = Je.meta) == null ? void 0 : ee.page) || 1, limit: ((Te = Je.meta) == null ? void 0 : Te.limit) || D, pages: ((je = Je.meta) == null ? void 0 : je.pages) || 1 }));
      } catch (Le) {
        U && pe(Le.message || "Failed to load orders");
      } finally {
        U && k(!1);
      }
    })(), () => {
      U = !1;
    };
  }, [v, y, f, D]), C.useMemo(() => o, [o]);
  const X = C.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const U = Uv(pE[y] || y);
    return o.filter((fe) => dE(fe) === U);
  }, [o, y]);
  function Z() {
    ue(null), P(!1);
  }
  function K(U) {
    try {
      const { orderId: fe } = U || {};
      if (!fe) return;
      const ee = String(fe).replace(/^#+/, "");
      L(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${fe}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: v, onChange: (U) => {
          g(U.target.value), L(1);
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
          R(U), L(1);
        }, "data-filter": U, children: fe }, U, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: D, onChange: (U) => {
          T(parseInt(U.target.value, 10)), L(1);
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
        !j && Q && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "auth-error", children: Q }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 17
        }, this),
        !j && !Q && X.map((U, fe) => {
          var Dt;
          const ee = zE(U), Te = dE(U), je = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let Le = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? Le = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? Le = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? Le = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (Le = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = U.name || U.order_number || U.id, pn = (ye != null ? String(ye).replace(/^#+/, "").trim() : "") || "-", Kt = O_(U), Sn = AE(Kt), Ct = kE(U), In = VE(Ct), Xt = ME(U), va = UE(Xt), na = U.rider ? String(U.rider) : (Dt = U.assignment) != null && Dt.riderId ? String(U.assignment.riderId) : "Unassigned";
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
        !j && !Q && X.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      q && ge && /* @__PURE__ */ d.jsxDEV(FE, { orderId: ge, onClose: Z, onAssigned: K }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || j, onClick: () => L((U) => Math.max(1, U - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 202,
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
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || j, onClick: () => L((U) => Math.min(M.pages, U + 1)), children: "Next" }, void 0, !1, {
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
function V_() {
  const [o, p] = C.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [v, g] = C.useState([]), [y, R] = C.useState(!1), [f, L] = C.useState(!0), [D, T] = C.useState("");
  return C.useEffect(() => {
    let M = !0;
    return (async () => {
      L(!0), T("");
      try {
        const E = await fetch("/api/reports", { credentials: "include" });
        if (E.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!E.ok) throw new Error("Failed to load reports");
        const j = await E.json();
        M && (p(j.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(j.deliveries) ? j.deliveries : []));
      } catch (E) {
        M && T(E.message || "Failed to load reports");
      } finally {
        M && L(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []), /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
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
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: y, onChange: (M) => R(M.target.checked) }, void 0, !1, {
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
          !f && !D && v.map((M, E) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
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
          ] }, M.orderId || E, !0, {
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
function k_() {
  const [o, p] = C.useState([]), [v, g] = C.useState(!0), [y, R] = C.useState(""), [f, L] = C.useState(1), [D, T] = C.useState(25), [M, E] = C.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  C.useEffect(() => {
    let q = !0;
    return (async () => {
      var P, ge, ue, X;
      g(!0), R("");
      try {
        const Z = new URLSearchParams();
        Z.set("limit", String(D)), Z.set("page", String(f));
        const K = await fetch(`/api/orders?${Z.toString()}`, { credentials: "include" });
        if (K.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!K.ok) throw new Error("Failed to load orders");
        const U = await K.json();
        q && (p(Array.isArray(U.orders) ? U.orders : []), E({ total: ((P = U.meta) == null ? void 0 : P.total) || 0, page: ((ge = U.meta) == null ? void 0 : ge.page) || f, limit: ((ue = U.meta) == null ? void 0 : ue.limit) || D, pages: ((X = U.meta) == null ? void 0 : X.pages) || 1 }));
      } catch (Z) {
        q && R(Z.message || "Failed to load orders");
      } finally {
        q && g(!1);
      }
    })(), () => {
      q = !1;
    };
  }, [f]);
  function j(q) {
    return !q || typeof q != "object" ? "new" : typeof q.current_status == "string" && String(q.current_status).trim() ? String(q.current_status).toLowerCase().trim() : "new";
  }
  const [k, Q] = C.useState(!1), [pe, ne] = C.useState(null);
  function ve(q) {
    ne(q), Q(!0);
  }
  function Y() {
    ne(null), Q(!1);
  }
  function $(q) {
    try {
      const { orderId: P } = q || {};
      if (!P) return;
      const ge = String(P).replace(/^#+/, "");
      p((ue) => ue.filter((X, Z) => {
        const K = String(X.id || X.name || X.order_number || Z).replace(/^#+/, "");
        return String(K) !== String(ge);
      })), E((ue) => ({ ...ue || {}, total: Math.max(0, ((ue == null ? void 0 : ue.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${P}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(si, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "dashboard-orders", children: [
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
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: v ? "…" : M.total || o.length }, void 0, !1, {
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
          const ue = j(P), X = P.full_name || (P.customer && P.customer.full_name ? P.customer.full_name : "");
          let Z = "-";
          typeof P.shipping_address == "string" && String(P.shipping_address).trim() ? Z = String(P.shipping_address).trim() : P.shipping_address && typeof P.shipping_address == "object" ? Z = [P.shipping_address.address1 || "", P.shipping_address.city || "", P.shipping_address.province || "", P.shipping_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-" : typeof P.billing_address == "string" && String(P.billing_address).trim() ? Z = String(P.billing_address).trim() : P.billing_address && typeof P.billing_address == "object" && (Z = [P.billing_address.address1 || "", P.billing_address.city || "", P.billing_address.province || "", P.billing_address.country || ""].map((je) => String(je || "").trim()).filter(Boolean).join(", ") || "-");
          const K = P.name || P.order_number || P.id || ge, U = String(P.id || P.name || P.order_number || ge).replace(/^#+/, ""), fe = P.created_at ? new Date(P.created_at) : null, ee = fe ? fe.toLocaleDateString() : "-", Te = fe ? fe.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": ue, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: K }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || v, onClick: () => L((q) => Math.max(1, q - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
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
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 141,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || v, onClick: () => L((q) => Math.min(M.pages, q + 1)), children: "Next" }, void 0, !1, {
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
    k && pe && /* @__PURE__ */ d.jsxDEV(FE, { orderId: pe, onClose: Y, onAssigned: $ }, void 0, !1, {
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
function U_() {
  return /* @__PURE__ */ d.jsxDEV(p_, { children: /* @__PURE__ */ d.jsxDEV(Jw, { children: [
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(D_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(T_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(L_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(A_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(V_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(k_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(wr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(Kw, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function mE() {
  const o = document.getElementById("react-root");
  if (!o) return;
  NE(o).render(/* @__PURE__ */ d.jsxDEV(U_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", mE) : mE();
