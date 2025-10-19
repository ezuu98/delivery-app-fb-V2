function aw(o, p) {
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
function rw(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var gE = { exports: {} }, Vv = {}, yE = { exports: {} }, bf = { exports: {} };
bf.exports;
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), V = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), T = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), ie = Symbol.for("react.offscreen"), ne = Symbol.iterator, pe = "@@iterator";
    function G(d) {
      if (d === null || typeof d != "object")
        return null;
      var b = ne && d[ne] || d[pe];
      return typeof b == "function" ? b : null;
    }
    var Y = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, Z = {
      transition: null
    }, X = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, z = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, _ = {}, te = null;
    function q(d) {
      te = d;
    }
    _.setExtraStackFrame = function(d) {
      te = d;
    }, _.getCurrentStack = null, _.getStackAddendum = function() {
      var d = "";
      te && (d += te);
      var b = _.getCurrentStack;
      return b && (d += b() || ""), d;
    };
    var J = !1, k = !1, ce = !1, ae = !1, Ce = !1, Ve = {
      ReactCurrentDispatcher: Y,
      ReactCurrentBatchConfig: Z,
      ReactCurrentOwner: z
    };
    Ve.ReactDebugCurrentFrame = _, Ve.ReactCurrentActQueue = X;
    function ye(d) {
      {
        for (var b = arguments.length, U = new Array(b > 1 ? b - 1 : 0), P = 1; P < b; P++)
          U[P - 1] = arguments[P];
        Ge("warn", d, U);
      }
    }
    function me(d) {
      {
        for (var b = arguments.length, U = new Array(b > 1 ? b - 1 : 0), P = 1; P < b; P++)
          U[P - 1] = arguments[P];
        Ge("error", d, U);
      }
    }
    function Ge(d, b, U) {
      {
        var P = Ve.ReactDebugCurrentFrame, ee = P.getStackAddendum();
        ee !== "" && (b += "%s", U = U.concat([ee]));
        var De = U.map(function(ge) {
          return String(ge);
        });
        De.unshift("Warning: " + b), Function.prototype.apply.call(console[d], console, De);
      }
    }
    var pn = {};
    function Qt(d, b) {
      {
        var U = d.constructor, P = U && (U.displayName || U.name) || "ReactClass", ee = P + "." + b;
        if (pn[ee])
          return;
        me("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, P), pn[ee] = !0;
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
      isMounted: function(d) {
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
      enqueueForceUpdate: function(d, b, U) {
        Qt(d, "forceUpdate");
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
      enqueueReplaceState: function(d, b, U, P) {
        Qt(d, "replaceState");
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
      enqueueSetState: function(d, b, U, P) {
        Qt(d, "setState");
      }
    }, Ct = Object.assign, Yn = {};
    Object.freeze(Yn);
    function Xt(d, b, U) {
      this.props = d, this.context = b, this.refs = Yn, this.updater = U || xn;
    }
    Xt.prototype.isReactComponent = {}, Xt.prototype.setState = function(d, b) {
      if (typeof d != "object" && typeof d != "function" && d != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, d, b, "setState");
    }, Xt.prototype.forceUpdate = function(d) {
      this.updater.enqueueForceUpdate(this, d, "forceUpdate");
    };
    {
      var ha = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, na = function(d, b) {
        Object.defineProperty(Xt.prototype, d, {
          get: function() {
            ye("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Dt in ha)
        ha.hasOwnProperty(Dt) && na(Dt, ha[Dt]);
    }
    function Jt() {
    }
    Jt.prototype = Xt.prototype;
    function Zt(d, b, U) {
      this.props = d, this.context = b, this.refs = Yn, this.updater = U || xn;
    }
    var en = Zt.prototype = new Jt();
    en.constructor = Zt, Ct(en, Xt.prototype), en.isPureReactComponent = !0;
    function tn() {
      var d = {
        current: null
      };
      return Object.seal(d), d;
    }
    var kn = Array.isArray;
    function Bt(d) {
      return kn(d);
    }
    function Rn(d) {
      {
        var b = typeof Symbol == "function" && Symbol.toStringTag, U = b && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return U;
      }
    }
    function $t(d) {
      try {
        return It(d), !1;
      } catch {
        return !0;
      }
    }
    function It(d) {
      return "" + d;
    }
    function aa(d) {
      if ($t(d))
        return me("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(d)), It(d);
    }
    function rr(d, b, U) {
      var P = d.displayName;
      if (P)
        return P;
      var ee = b.displayName || b.name || "";
      return ee !== "" ? U + "(" + ee + ")" : U;
    }
    function ga(d) {
      return d.displayName || "Context";
    }
    function Un(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && me("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case S:
          return "Fragment";
        case y:
          return "Portal";
        case V:
          return "Profiler";
        case f:
          return "StrictMode";
        case D:
          return "Suspense";
        case L:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case T:
            var b = d;
            return ga(b) + ".Consumer";
          case R:
            var U = d;
            return ga(U._context) + ".Provider";
          case O:
            return rr(d, d.render, "ForwardRef");
          case A:
            var P = d.displayName || null;
            return P !== null ? P : Un(d.type) || "Memo";
          case I: {
            var ee = d, De = ee._payload, ge = ee._init;
            try {
              return Un(ge(De));
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
    }, Cn, Pa, Ot;
    Ot = {};
    function Dn(d) {
      if (mn.call(d, "ref")) {
        var b = Object.getOwnPropertyDescriptor(d, "ref").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return d.ref !== void 0;
    }
    function Fn(d) {
      if (mn.call(d, "key")) {
        var b = Object.getOwnPropertyDescriptor(d, "key").get;
        if (b && b.isReactWarning)
          return !1;
      }
      return d.key !== void 0;
    }
    function Mr(d, b) {
      var U = function() {
        Cn || (Cn = !0, me("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      U.isReactWarning = !0, Object.defineProperty(d, "key", {
        get: U,
        configurable: !0
      });
    }
    function ir(d, b) {
      var U = function() {
        Pa || (Pa = !0, me("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      U.isReactWarning = !0, Object.defineProperty(d, "ref", {
        get: U,
        configurable: !0
      });
    }
    function le(d) {
      if (typeof d.ref == "string" && z.current && d.__self && z.current.stateNode !== d.__self) {
        var b = Un(z.current.type);
        Ot[b] || (me('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, d.ref), Ot[b] = !0);
      }
    }
    var Ne = function(d, b, U, P, ee, De, ge) {
      var Ae = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: d,
        key: b,
        ref: U,
        props: ge,
        // Record the component responsible for creating this element.
        _owner: De
      };
      return Ae._store = {}, Object.defineProperty(Ae._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Ae, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.defineProperty(Ae, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ee
      }), Object.freeze && (Object.freeze(Ae.props), Object.freeze(Ae)), Ae;
    };
    function Fe(d, b, U) {
      var P, ee = {}, De = null, ge = null, Ae = null, $e = null;
      if (b != null) {
        Dn(b) && (ge = b.ref, le(b)), Fn(b) && (aa(b.key), De = "" + b.key), Ae = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (P in b)
          mn.call(b, P) && !nn.hasOwnProperty(P) && (ee[P] = b[P]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        ee.children = U;
      else if (tt > 1) {
        for (var ot = Array(tt), st = 0; st < tt; st++)
          ot[st] = arguments[st + 2];
        Object.freeze && Object.freeze(ot), ee.children = ot;
      }
      if (d && d.defaultProps) {
        var Pe = d.defaultProps;
        for (P in Pe)
          ee[P] === void 0 && (ee[P] = Pe[P]);
      }
      if (De || ge) {
        var vt = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
        De && Mr(ee, vt), ge && ir(ee, vt);
      }
      return Ne(d, De, ge, Ae, $e, z.current, ee);
    }
    function et(d, b) {
      var U = Ne(d.type, b, d.ref, d._self, d._source, d._owner, d.props);
      return U;
    }
    function ct(d, b, U) {
      if (d == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + d + ".");
      var P, ee = Ct({}, d.props), De = d.key, ge = d.ref, Ae = d._self, $e = d._source, tt = d._owner;
      if (b != null) {
        Dn(b) && (ge = b.ref, tt = z.current), Fn(b) && (aa(b.key), De = "" + b.key);
        var ot;
        d.type && d.type.defaultProps && (ot = d.type.defaultProps);
        for (P in b)
          mn.call(b, P) && !nn.hasOwnProperty(P) && (b[P] === void 0 && ot !== void 0 ? ee[P] = ot[P] : ee[P] = b[P]);
      }
      var st = arguments.length - 2;
      if (st === 1)
        ee.children = U;
      else if (st > 1) {
        for (var Pe = Array(st), vt = 0; vt < st; vt++)
          Pe[vt] = arguments[vt + 2];
        ee.children = Pe;
      }
      return Ne(d.type, De, ge, Ae, $e, tt, ee);
    }
    function gt(d) {
      return typeof d == "object" && d !== null && d.$$typeof === g;
    }
    var yt = ".", vn = ":";
    function Nt(d) {
      var b = /[=:]/g, U = {
        "=": "=0",
        ":": "=2"
      }, P = d.replace(b, function(ee) {
        return U[ee];
      });
      return "$" + P;
    }
    var it = !1, Et = /\/+/g;
    function ya(d) {
      return d.replace(Et, "$&/");
    }
    function ba(d, b) {
      return typeof d == "object" && d !== null && d.key != null ? (aa(d.key), Nt("" + d.key)) : b.toString(36);
    }
    function ra(d, b, U, P, ee) {
      var De = typeof d;
      (De === "undefined" || De === "boolean") && (d = null);
      var ge = !1;
      if (d === null)
        ge = !0;
      else
        switch (De) {
          case "string":
          case "number":
            ge = !0;
            break;
          case "object":
            switch (d.$$typeof) {
              case g:
              case y:
                ge = !0;
            }
        }
      if (ge) {
        var Ae = d, $e = ee(Ae), tt = P === "" ? yt + ba(Ae, 0) : P;
        if (Bt($e)) {
          var ot = "";
          tt != null && (ot = ya(tt) + "/"), ra($e, b, ot, "", function(_f) {
            return _f;
          });
        } else $e != null && (gt($e) && ($e.key && (!Ae || Ae.key !== $e.key) && aa($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          U + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Ae || Ae.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ya("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var st, Pe, vt = 0, Tt = P === "" ? yt : P + vn;
      if (Bt(d))
        for (var Ei = 0; Ei < d.length; Ei++)
          st = d[Ei], Pe = Tt + ba(st, Ei), vt += ra(st, b, U, Pe, ee);
      else {
        var Eo = G(d);
        if (typeof Eo == "function") {
          var ur = d;
          Eo === ur.entries && (it || ye("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var So = Eo.call(ur), xo, wf = 0; !(xo = So.next()).done; )
            st = xo.value, Pe = Tt + ba(st, wf++), vt += ra(st, b, U, Pe, ee);
        } else if (De === "object") {
          var hu = String(d);
          throw new Error("Objects are not valid as a React child (found: " + (hu === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : hu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function lr(d, b, U) {
      if (d == null)
        return d;
      var P = [], ee = 0;
      return ra(d, P, "", "", function(De) {
        return b.call(U, De, ee++);
      }), P;
    }
    function io(d) {
      var b = 0;
      return lr(d, function() {
        b++;
      }), b;
    }
    function fi(d, b, U) {
      lr(d, function() {
        b.apply(this, arguments);
      }, U);
    }
    function Ji(d) {
      return lr(d, function(b) {
        return b;
      }) || [];
    }
    function Zi(d) {
      if (!gt(d))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return d;
    }
    function di(d) {
      var b = {
        $$typeof: T,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: d,
        _currentValue2: d,
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
        $$typeof: R,
        _context: b
      };
      var U = !1, P = !1, ee = !1;
      {
        var De = {
          $$typeof: T,
          _context: b
        };
        Object.defineProperties(De, {
          Provider: {
            get: function() {
              return P || (P = !0, me("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), b.Provider;
            },
            set: function(ge) {
              b.Provider = ge;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(ge) {
              b._currentValue = ge;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(ge) {
              b._currentValue2 = ge;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(ge) {
              b._threadCount = ge;
            }
          },
          Consumer: {
            get: function() {
              return U || (U = !0, me("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), b.Consumer;
            }
          },
          displayName: {
            get: function() {
              return b.displayName;
            },
            set: function(ge) {
              ee || (ye("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ge), ee = !0);
            }
          }
        }), b.Consumer = De;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var Na = -1, ia = 0, qn = 1, Ha = 2;
    function pi(d) {
      if (d._status === Na) {
        var b = d._result, U = b();
        if (U.then(function(De) {
          if (d._status === ia || d._status === Na) {
            var ge = d;
            ge._status = qn, ge._result = De;
          }
        }, function(De) {
          if (d._status === ia || d._status === Na) {
            var ge = d;
            ge._status = Ha, ge._result = De;
          }
        }), d._status === Na) {
          var P = d;
          P._status = ia, P._result = U;
        }
      }
      if (d._status === qn) {
        var ee = d._result;
        return ee === void 0 && me(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ee), "default" in ee || me(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ee), ee.default;
      } else
        throw d._result;
    }
    function N(d) {
      var b = {
        // We use these fields to store the result.
        _status: Na,
        _result: d
      }, U = {
        $$typeof: I,
        _payload: b,
        _init: pi
      };
      {
        var P, ee;
        Object.defineProperties(U, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return P;
            },
            set: function(De) {
              me("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), P = De, Object.defineProperty(U, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return ee;
            },
            set: function(De) {
              me("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ee = De, Object.defineProperty(U, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return U;
    }
    function K(d) {
      d != null && d.$$typeof === A ? me("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof d != "function" ? me("forwardRef requires a render function but was given %s.", d === null ? "null" : typeof d) : d.length !== 0 && d.length !== 2 && me("forwardRef render functions accept exactly two parameters: props and ref. %s", d.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), d != null && (d.defaultProps != null || d.propTypes != null) && me("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: O,
        render: d
      };
      {
        var U;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return U;
          },
          set: function(P) {
            U = P, !d.name && !d.displayName && (d.displayName = P);
          }
        });
      }
      return b;
    }
    var oe;
    oe = Symbol.for("react.module.reference");
    function Ee(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === S || d === V || Ce || d === f || d === D || d === L || ae || d === ie || J || k || ce || typeof d == "object" && d !== null && (d.$$typeof === I || d.$$typeof === A || d.$$typeof === R || d.$$typeof === T || d.$$typeof === O || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === oe || d.getModuleId !== void 0));
    }
    function Be(d, b) {
      Ee(d) || me("memo: The first argument must be a component. Instead received: %s", d === null ? "null" : typeof d);
      var U = {
        $$typeof: A,
        type: d,
        compare: b === void 0 ? null : b
      };
      {
        var P;
        Object.defineProperty(U, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return P;
          },
          set: function(ee) {
            P = ee, !d.name && !d.displayName && (d.displayName = ee);
          }
        });
      }
      return U;
    }
    function we() {
      var d = Y.current;
      return d === null && me(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), d;
    }
    function ke(d) {
      var b = we();
      if (d._context !== void 0) {
        var U = d._context;
        U.Consumer === d ? me("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : U.Provider === d && me("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(d);
    }
    function xe(d) {
      var b = we();
      return b.useState(d);
    }
    function At(d, b, U) {
      var P = we();
      return P.useReducer(d, b, U);
    }
    function ft(d) {
      var b = we();
      return b.useRef(d);
    }
    function dt(d, b) {
      var U = we();
      return U.useEffect(d, b);
    }
    function hn(d, b) {
      var U = we();
      return U.useInsertionEffect(d, b);
    }
    function Ba(d, b) {
      var U = we();
      return U.useLayoutEffect(d, b);
    }
    function Ea(d, b) {
      var U = we();
      return U.useCallback(d, b);
    }
    function Mt(d, b) {
      var U = we();
      return U.useMemo(d, b);
    }
    function mi(d, b, U) {
      var P = we();
      return P.useImperativeHandle(d, b, U);
    }
    function Sa(d, b) {
      {
        var U = we();
        return U.useDebugValue(d, b);
      }
    }
    function ze() {
      var d = we();
      return d.useTransition();
    }
    function vi(d) {
      var b = we();
      return b.useDeferredValue(d);
    }
    function iu() {
      var d = we();
      return d.useId();
    }
    function lu(d, b, U) {
      var P = we();
      return P.useSyncExternalStore(d, b, U);
    }
    var Vr = 0, lo, oo, so, uo, co, ou, su;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function fo() {
      {
        if (Vr === 0) {
          lo = console.log, oo = console.info, so = console.warn, uo = console.error, co = console.group, ou = console.groupCollapsed, su = console.groupEnd;
          var d = {
            configurable: !0,
            enumerable: !0,
            value: el,
            writable: !0
          };
          Object.defineProperties(console, {
            info: d,
            log: d,
            warn: d,
            error: d,
            group: d,
            groupCollapsed: d,
            groupEnd: d
          });
        }
        Vr++;
      }
    }
    function $a() {
      {
        if (Vr--, Vr === 0) {
          var d = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ct({}, d, {
              value: lo
            }),
            info: Ct({}, d, {
              value: oo
            }),
            warn: Ct({}, d, {
              value: so
            }),
            error: Ct({}, d, {
              value: uo
            }),
            group: Ct({}, d, {
              value: co
            }),
            groupCollapsed: Ct({}, d, {
              value: ou
            }),
            groupEnd: Ct({}, d, {
              value: su
            })
          });
        }
        Vr < 0 && me("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var hi = Ve.ReactCurrentDispatcher, Lr;
    function tl(d, b, U) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (ee) {
            var P = ee.stack.trim().match(/\n( *(at )?)/);
            Lr = P && P[1] || "";
          }
        return `
` + Lr + d;
      }
    }
    var gi = !1, nl;
    {
      var po = typeof WeakMap == "function" ? WeakMap : Map;
      nl = new po();
    }
    function uu(d, b) {
      if (!d || gi)
        return "";
      {
        var U = nl.get(d);
        if (U !== void 0)
          return U;
      }
      var P;
      gi = !0;
      var ee = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var De;
      De = hi.current, hi.current = null, fo();
      try {
        if (b) {
          var ge = function() {
            throw Error();
          };
          if (Object.defineProperty(ge.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ge, []);
            } catch (Tt) {
              P = Tt;
            }
            Reflect.construct(d, [], ge);
          } else {
            try {
              ge.call();
            } catch (Tt) {
              P = Tt;
            }
            d.call(ge.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Tt) {
            P = Tt;
          }
          d();
        }
      } catch (Tt) {
        if (Tt && P && typeof Tt.stack == "string") {
          for (var Ae = Tt.stack.split(`
`), $e = P.stack.split(`
`), tt = Ae.length - 1, ot = $e.length - 1; tt >= 1 && ot >= 0 && Ae[tt] !== $e[ot]; )
            ot--;
          for (; tt >= 1 && ot >= 0; tt--, ot--)
            if (Ae[tt] !== $e[ot]) {
              if (tt !== 1 || ot !== 1)
                do
                  if (tt--, ot--, ot < 0 || Ae[tt] !== $e[ot]) {
                    var st = `
` + Ae[tt].replace(" at new ", " at ");
                    return d.displayName && st.includes("<anonymous>") && (st = st.replace("<anonymous>", d.displayName)), typeof d == "function" && nl.set(d, st), st;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        gi = !1, hi.current = De, $a(), Error.prepareStackTrace = ee;
      }
      var Pe = d ? d.displayName || d.name : "", vt = Pe ? tl(Pe) : "";
      return typeof d == "function" && nl.set(d, vt), vt;
    }
    function mo(d, b, U) {
      return uu(d, !1);
    }
    function Rf(d) {
      var b = d.prototype;
      return !!(b && b.isReactComponent);
    }
    function yi(d, b, U) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return uu(d, Rf(d));
      if (typeof d == "string")
        return tl(d);
      switch (d) {
        case D:
          return tl("Suspense");
        case L:
          return tl("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case O:
            return mo(d.render);
          case A:
            return yi(d.type, b, U);
          case I: {
            var P = d, ee = P._payload, De = P._init;
            try {
              return yi(De(ee), b, U);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, vo = Ve.ReactDebugCurrentFrame;
    function Qe(d) {
      if (d) {
        var b = d._owner, U = yi(d.type, d._source, b ? b.type : null);
        vo.setExtraStackFrame(U);
      } else
        vo.setExtraStackFrame(null);
    }
    function Cf(d, b, U, P, ee) {
      {
        var De = Function.call.bind(mn);
        for (var ge in d)
          if (De(d, ge)) {
            var Ae = void 0;
            try {
              if (typeof d[ge] != "function") {
                var $e = Error((P || "React class") + ": " + U + " type `" + ge + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[ge] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Ae = d[ge](b, ge, P, U, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Ae = tt;
            }
            Ae && !(Ae instanceof Error) && (Qe(ee), me("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", U, ge, typeof Ae), Qe(null)), Ae instanceof Error && !(Ae.message in cu) && (cu[Ae.message] = !0, Qe(ee), me("Failed %s type: %s", U, Ae.message), Qe(null));
          }
      }
    }
    function or(d) {
      if (d) {
        var b = d._owner, U = yi(d.type, d._source, b ? b.type : null);
        q(U);
      } else
        q(null);
    }
    var Le;
    Le = !1;
    function ho() {
      if (z.current) {
        var d = Un(z.current.type);
        if (d)
          return `

Check the render method of \`` + d + "`.";
      }
      return "";
    }
    function Tn(d) {
      if (d !== void 0) {
        var b = d.fileName.replace(/^.*[\\\/]/, ""), U = d.lineNumber;
        return `

Check your code at ` + b + ":" + U + ".";
      }
      return "";
    }
    function bi(d) {
      return d != null ? Tn(d.__source) : "";
    }
    var kr = {};
    function Df(d) {
      var b = ho();
      if (!b) {
        var U = typeof d == "string" ? d : d.displayName || d.name;
        U && (b = `

Check the top-level render call using <` + U + ">.");
      }
      return b;
    }
    function Yt(d, b) {
      if (!(!d._store || d._store.validated || d.key != null)) {
        d._store.validated = !0;
        var U = Df(b);
        if (!kr[U]) {
          kr[U] = !0;
          var P = "";
          d && d._owner && d._owner !== z.current && (P = " It was passed a child from " + Un(d._owner.type) + "."), or(d), me('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', U, P), or(null);
        }
      }
    }
    function mt(d, b) {
      if (typeof d == "object") {
        if (Bt(d))
          for (var U = 0; U < d.length; U++) {
            var P = d[U];
            gt(P) && Yt(P, b);
          }
        else if (gt(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var ee = G(d);
          if (typeof ee == "function" && ee !== d.entries)
            for (var De = ee.call(d), ge; !(ge = De.next()).done; )
              gt(ge.value) && Yt(ge.value, b);
        }
      }
    }
    function fu(d) {
      {
        var b = d.type;
        if (b == null || typeof b == "string")
          return;
        var U;
        if (typeof b == "function")
          U = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === O || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === A))
          U = b.propTypes;
        else
          return;
        if (U) {
          var P = Un(b);
          Cf(U, d.props, "prop", P, d);
        } else if (b.PropTypes !== void 0 && !Le) {
          Le = !0;
          var ee = Un(b);
          me("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ee || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && me("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(d) {
      {
        for (var b = Object.keys(d.props), U = 0; U < b.length; U++) {
          var P = b[U];
          if (P !== "children" && P !== "key") {
            or(d), me("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), or(null);
            break;
          }
        }
        d.ref !== null && (or(d), me("Invalid attribute `ref` supplied to `React.Fragment`."), or(null));
      }
    }
    function jn(d, b, U) {
      var P = Ee(d);
      if (!P) {
        var ee = "";
        (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (ee += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var De = bi(b);
        De ? ee += De : ee += ho();
        var ge;
        d === null ? ge = "null" : Bt(d) ? ge = "array" : d !== void 0 && d.$$typeof === g ? (ge = "<" + (Un(d.type) || "Unknown") + " />", ee = " Did you accidentally export a JSX literal instead of a component?") : ge = typeof d, me("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ge, ee);
      }
      var Ae = Fe.apply(this, arguments);
      if (Ae == null)
        return Ae;
      if (P)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], d);
      return d === S ? la(Ae) : fu(Ae), Ae;
    }
    var xa = !1;
    function Tf(d) {
      var b = jn.bind(null, d);
      return b.type = d, xa || (xa = !0, ye("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return ye("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: d
          }), d;
        }
      }), b;
    }
    function go(d, b, U) {
      for (var P = ct.apply(this, arguments), ee = 2; ee < arguments.length; ee++)
        mt(arguments[ee], P.type);
      return fu(P), P;
    }
    function du(d, b) {
      var U = Z.transition;
      Z.transition = {};
      var P = Z.transition;
      Z.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        d();
      } finally {
        if (Z.transition = U, U === null && P._updatedFibers) {
          var ee = P._updatedFibers.size;
          ee > 10 && ye("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), P._updatedFibers.clear();
        }
      }
    }
    var yo = !1, al = null;
    function jf(d) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), U = o && o[b];
          al = U.call(o, "timers").setImmediate;
        } catch {
          al = function(ee) {
            yo === !1 && (yo = !0, typeof MessageChannel > "u" && me("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var De = new MessageChannel();
            De.port1.onmessage = ee, De.port2.postMessage(void 0);
          };
        }
      return al(d);
    }
    var Ur = 0, Ni = !1;
    function bo(d) {
      {
        var b = Ur;
        Ur++, X.current === null && (X.current = []);
        var U = X.isBatchingLegacy, P;
        try {
          if (X.isBatchingLegacy = !0, P = d(), !U && X.didScheduleLegacyUpdate) {
            var ee = X.current;
            ee !== null && (X.didScheduleLegacyUpdate = !1, ll(ee));
          }
        } catch (Pe) {
          throw sr(b), Pe;
        } finally {
          X.isBatchingLegacy = U;
        }
        if (P !== null && typeof P == "object" && typeof P.then == "function") {
          var De = P, ge = !1, Ae = {
            then: function(Pe, vt) {
              ge = !0, De.then(function(Tt) {
                sr(b), Ur === 0 ? rl(Tt, Pe, vt) : Pe(Tt);
              }, function(Tt) {
                sr(b), vt(Tt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ge || (Ni = !0, me("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ae;
        } else {
          var $e = P;
          if (sr(b), Ur === 0) {
            var tt = X.current;
            tt !== null && (ll(tt), X.current = null);
            var ot = {
              then: function(Pe, vt) {
                X.current === null ? (X.current = [], rl($e, Pe, vt)) : Pe($e);
              }
            };
            return ot;
          } else {
            var st = {
              then: function(Pe, vt) {
                Pe($e);
              }
            };
            return st;
          }
        }
      }
    }
    function sr(d) {
      d !== Ur - 1 && me("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = d;
    }
    function rl(d, b, U) {
      {
        var P = X.current;
        if (P !== null)
          try {
            ll(P), jf(function() {
              P.length === 0 ? (X.current = null, b(d)) : rl(d, b, U);
            });
          } catch (ee) {
            U(ee);
          }
        else
          b(d);
      }
    }
    var il = !1;
    function ll(d) {
      if (!il) {
        il = !0;
        var b = 0;
        try {
          for (; b < d.length; b++) {
            var U = d[b];
            do
              U = U(!0);
            while (U !== null);
          }
          d.length = 0;
        } catch (P) {
          throw d = d.slice(b + 1), P;
        } finally {
          il = !1;
        }
      }
    }
    var pu = jn, mu = go, No = Tf, vu = {
      map: lr,
      forEach: fi,
      count: io,
      toArray: Ji,
      only: Zi
    };
    p.Children = vu, p.Component = Xt, p.Fragment = S, p.Profiler = V, p.PureComponent = Zt, p.StrictMode = f, p.Suspense = D, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ve, p.act = bo, p.cloneElement = mu, p.createContext = di, p.createElement = pu, p.createFactory = No, p.createRef = tn, p.forwardRef = K, p.isValidElement = gt, p.lazy = N, p.memo = Be, p.startTransition = du, p.unstable_act = bo, p.useCallback = Ea, p.useContext = ke, p.useDebugValue = Sa, p.useDeferredValue = vi, p.useEffect = dt, p.useId = iu, p.useImperativeHandle = mi, p.useInsertionEffect = hn, p.useLayoutEffect = Ba, p.useMemo = Mt, p.useReducer = At, p.useRef = ft, p.useState = xe, p.useSyncExternalStore = lu, p.useTransition = ze, p.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bf, bf.exports);
var iw = bf.exports;
yE.exports = iw;
var E = yE.exports;
const lw = /* @__PURE__ */ rw(E), ow = /* @__PURE__ */ aw({
  __proto__: null,
  default: lw
}, [E]);
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
  var o = E, p = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), V = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), I = Symbol.iterator, ie = "@@iterator";
  function ne(N) {
    if (N === null || typeof N != "object")
      return null;
    var K = I && N[I] || N[ie];
    return typeof K == "function" ? K : null;
  }
  var pe = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function G(N) {
    {
      for (var K = arguments.length, oe = new Array(K > 1 ? K - 1 : 0), Ee = 1; Ee < K; Ee++)
        oe[Ee - 1] = arguments[Ee];
      Y("error", N, oe);
    }
  }
  function Y(N, K, oe) {
    {
      var Ee = pe.ReactDebugCurrentFrame, Be = Ee.getStackAddendum();
      Be !== "" && (K += "%s", oe = oe.concat([Be]));
      var we = oe.map(function(ke) {
        return String(ke);
      });
      we.unshift("Warning: " + K), Function.prototype.apply.call(console[N], console, we);
    }
  }
  var Z = !1, X = !1, z = !1, _ = !1, te = !1, q;
  q = Symbol.for("react.module.reference");
  function J(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === S || te || N === y || N === T || N === O || _ || N === A || Z || X || z || typeof N == "object" && N !== null && (N.$$typeof === L || N.$$typeof === D || N.$$typeof === f || N.$$typeof === V || N.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === q || N.getModuleId !== void 0));
  }
  function k(N, K, oe) {
    var Ee = N.displayName;
    if (Ee)
      return Ee;
    var Be = K.displayName || K.name || "";
    return Be !== "" ? oe + "(" + Be + ")" : oe;
  }
  function ce(N) {
    return N.displayName || "Context";
  }
  function ae(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && G("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
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
      case O:
        return "SuspenseList";
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case V:
          var K = N;
          return ce(K) + ".Consumer";
        case f:
          var oe = N;
          return ce(oe._context) + ".Provider";
        case R:
          return k(N, N.render, "ForwardRef");
        case D:
          var Ee = N.displayName || null;
          return Ee !== null ? Ee : ae(N.type) || "Memo";
        case L: {
          var Be = N, we = Be._payload, ke = Be._init;
          try {
            return ae(ke(we));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Ce = Object.assign, Ve = 0, ye, me, Ge, pn, Qt, xn, Ct;
  function Yn() {
  }
  Yn.__reactDisabledLog = !0;
  function Xt() {
    {
      if (Ve === 0) {
        ye = console.log, me = console.info, Ge = console.warn, pn = console.error, Qt = console.group, xn = console.groupCollapsed, Ct = console.groupEnd;
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
      Ve++;
    }
  }
  function ha() {
    {
      if (Ve--, Ve === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ce({}, N, {
            value: ye
          }),
          info: Ce({}, N, {
            value: me
          }),
          warn: Ce({}, N, {
            value: Ge
          }),
          error: Ce({}, N, {
            value: pn
          }),
          group: Ce({}, N, {
            value: Qt
          }),
          groupCollapsed: Ce({}, N, {
            value: xn
          }),
          groupEnd: Ce({}, N, {
            value: Ct
          })
        });
      }
      Ve < 0 && G("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = pe.ReactCurrentDispatcher, Dt;
  function Jt(N, K, oe) {
    {
      if (Dt === void 0)
        try {
          throw Error();
        } catch (Be) {
          var Ee = Be.stack.trim().match(/\n( *(at )?)/);
          Dt = Ee && Ee[1] || "";
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
  function kn(N, K) {
    if (!N || Zt)
      return "";
    {
      var oe = en.get(N);
      if (oe !== void 0)
        return oe;
    }
    var Ee;
    Zt = !0;
    var Be = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var we;
    we = na.current, na.current = null, Xt();
    try {
      if (K) {
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
            Ee = Mt;
          }
          Reflect.construct(N, [], ke);
        } else {
          try {
            ke.call();
          } catch (Mt) {
            Ee = Mt;
          }
          N.call(ke.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Mt) {
          Ee = Mt;
        }
        N();
      }
    } catch (Mt) {
      if (Mt && Ee && typeof Mt.stack == "string") {
        for (var xe = Mt.stack.split(`
`), At = Ee.stack.split(`
`), ft = xe.length - 1, dt = At.length - 1; ft >= 1 && dt >= 0 && xe[ft] !== At[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (xe[ft] !== At[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || xe[ft] !== At[dt]) {
                  var hn = `
` + xe[ft].replace(" at new ", " at ");
                  return N.displayName && hn.includes("<anonymous>") && (hn = hn.replace("<anonymous>", N.displayName)), typeof N == "function" && en.set(N, hn), hn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Zt = !1, na.current = we, ha(), Error.prepareStackTrace = Be;
    }
    var Ba = N ? N.displayName || N.name : "", Ea = Ba ? Jt(Ba) : "";
    return typeof N == "function" && en.set(N, Ea), Ea;
  }
  function Bt(N, K, oe) {
    return kn(N, !1);
  }
  function Rn(N) {
    var K = N.prototype;
    return !!(K && K.isReactComponent);
  }
  function $t(N, K, oe) {
    if (N == null)
      return "";
    if (typeof N == "function")
      return kn(N, Rn(N));
    if (typeof N == "string")
      return Jt(N);
    switch (N) {
      case T:
        return Jt("Suspense");
      case O:
        return Jt("SuspenseList");
    }
    if (typeof N == "object")
      switch (N.$$typeof) {
        case R:
          return Bt(N.render);
        case D:
          return $t(N.type, K, oe);
        case L: {
          var Ee = N, Be = Ee._payload, we = Ee._init;
          try {
            return $t(we(Be), K, oe);
          } catch {
          }
        }
      }
    return "";
  }
  var It = Object.prototype.hasOwnProperty, aa = {}, rr = pe.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var K = N._owner, oe = $t(N.type, N._source, K ? K.type : null);
      rr.setExtraStackFrame(oe);
    } else
      rr.setExtraStackFrame(null);
  }
  function Un(N, K, oe, Ee, Be) {
    {
      var we = Function.call.bind(It);
      for (var ke in N)
        if (we(N, ke)) {
          var xe = void 0;
          try {
            if (typeof N[ke] != "function") {
              var At = Error((Ee || "React class") + ": " + oe + " type `" + ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw At.name = "Invariant Violation", At;
            }
            xe = N[ke](K, ke, Ee, oe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            xe = ft;
          }
          xe && !(xe instanceof Error) && (ga(Be), G("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ee || "React class", oe, ke, typeof xe), ga(null)), xe instanceof Error && !(xe.message in aa) && (aa[xe.message] = !0, ga(Be), G("Failed %s type: %s", oe, xe.message), ga(null));
        }
    }
  }
  var mn = Array.isArray;
  function nn(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var K = typeof Symbol == "function" && Symbol.toStringTag, oe = K && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return oe;
    }
  }
  function Pa(N) {
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
    if (Pa(N))
      return G("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Ot(N);
  }
  var Fn = pe.ReactCurrentOwner, Mr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ir, le, Ne;
  Ne = {};
  function Fe(N) {
    if (It.call(N, "ref")) {
      var K = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (K && K.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if (It.call(N, "key")) {
      var K = Object.getOwnPropertyDescriptor(N, "key").get;
      if (K && K.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, K) {
    if (typeof N.ref == "string" && Fn.current && K && Fn.current.stateNode !== K) {
      var oe = ae(Fn.current.type);
      Ne[oe] || (G('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ae(Fn.current.type), N.ref), Ne[oe] = !0);
    }
  }
  function gt(N, K) {
    {
      var oe = function() {
        ir || (ir = !0, G("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
      };
      oe.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: oe,
        configurable: !0
      });
    }
  }
  function yt(N, K) {
    {
      var oe = function() {
        le || (le = !0, G("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
      };
      oe.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: oe,
        configurable: !0
      });
    }
  }
  var vn = function(N, K, oe, Ee, Be, we, ke) {
    var xe = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: N,
      key: K,
      ref: oe,
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
      value: Ee
    }), Object.defineProperty(xe, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Be
    }), Object.freeze && (Object.freeze(xe.props), Object.freeze(xe)), xe;
  };
  function Nt(N, K, oe, Ee, Be) {
    {
      var we, ke = {}, xe = null, At = null;
      oe !== void 0 && (Dn(oe), xe = "" + oe), et(K) && (Dn(K.key), xe = "" + K.key), Fe(K) && (At = K.ref, ct(K, Be));
      for (we in K)
        It.call(K, we) && !Mr.hasOwnProperty(we) && (ke[we] = K[we]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (we in ft)
          ke[we] === void 0 && (ke[we] = ft[we]);
      }
      if (xe || At) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        xe && gt(ke, dt), At && yt(ke, dt);
      }
      return vn(N, xe, At, Be, Ee, Fn.current, ke);
    }
  }
  var it = pe.ReactCurrentOwner, Et = pe.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var K = N._owner, oe = $t(N.type, N._source, K ? K.type : null);
      Et.setExtraStackFrame(oe);
    } else
      Et.setExtraStackFrame(null);
  }
  var ba;
  ba = !1;
  function ra(N) {
    return typeof N == "object" && N !== null && N.$$typeof === p;
  }
  function lr() {
    {
      if (it.current) {
        var N = ae(it.current.type);
        if (N)
          return `

Check the render method of \`` + N + "`.";
      }
      return "";
    }
  }
  function io(N) {
    {
      if (N !== void 0) {
        var K = N.fileName.replace(/^.*[\\\/]/, ""), oe = N.lineNumber;
        return `

Check your code at ` + K + ":" + oe + ".";
      }
      return "";
    }
  }
  var fi = {};
  function Ji(N) {
    {
      var K = lr();
      if (!K) {
        var oe = typeof N == "string" ? N : N.displayName || N.name;
        oe && (K = `

Check the top-level render call using <` + oe + ">.");
      }
      return K;
    }
  }
  function Zi(N, K) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var oe = Ji(K);
      if (fi[oe])
        return;
      fi[oe] = !0;
      var Ee = "";
      N && N._owner && N._owner !== it.current && (Ee = " It was passed a child from " + ae(N._owner.type) + "."), ya(N), G('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', oe, Ee), ya(null);
    }
  }
  function di(N, K) {
    {
      if (typeof N != "object")
        return;
      if (nn(N))
        for (var oe = 0; oe < N.length; oe++) {
          var Ee = N[oe];
          ra(Ee) && Zi(Ee, K);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Be = ne(N);
        if (typeof Be == "function" && Be !== N.entries)
          for (var we = Be.call(N), ke; !(ke = we.next()).done; )
            ra(ke.value) && Zi(ke.value, K);
      }
    }
  }
  function Na(N) {
    {
      var K = N.type;
      if (K == null || typeof K == "string")
        return;
      var oe;
      if (typeof K == "function")
        oe = K.propTypes;
      else if (typeof K == "object" && (K.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      K.$$typeof === D))
        oe = K.propTypes;
      else
        return;
      if (oe) {
        var Ee = ae(K);
        Un(oe, N.props, "prop", Ee, N);
      } else if (K.PropTypes !== void 0 && !ba) {
        ba = !0;
        var Be = ae(K);
        G("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Be || "Unknown");
      }
      typeof K.getDefaultProps == "function" && !K.getDefaultProps.isReactClassApproved && G("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var K = Object.keys(N.props), oe = 0; oe < K.length; oe++) {
        var Ee = K[oe];
        if (Ee !== "children" && Ee !== "key") {
          ya(N), G("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ee), ya(null);
          break;
        }
      }
      N.ref !== null && (ya(N), G("Invalid attribute `ref` supplied to `React.Fragment`."), ya(null));
    }
  }
  var qn = {};
  function Ha(N, K, oe, Ee, Be, we) {
    {
      var ke = J(N);
      if (!ke) {
        var xe = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (xe += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var At = io(Be);
        At ? xe += At : xe += lr();
        var ft;
        N === null ? ft = "null" : nn(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (ae(N.type) || "Unknown") + " />", xe = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, G("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, xe);
      }
      var dt = Nt(N, K, oe, Be, we);
      if (dt == null)
        return dt;
      if (ke) {
        var hn = K.children;
        if (hn !== void 0)
          if (Ee)
            if (nn(hn)) {
              for (var Ba = 0; Ba < hn.length; Ba++)
                di(hn[Ba], N);
              Object.freeze && Object.freeze(hn);
            } else
              G("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            di(hn, N);
      }
      if (It.call(K, "key")) {
        var Ea = ae(N), Mt = Object.keys(K).filter(function(ze) {
          return ze !== "key";
        }), mi = Mt.length > 0 ? "{key: someKey, " + Mt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Ea + mi]) {
          var Sa = Mt.length > 0 ? "{" + Mt.join(": ..., ") + ": ...}" : "{}";
          G(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, Ea, Sa, Ea), qn[Ea + mi] = !0;
        }
      }
      return N === g ? ia(dt) : Na(dt), dt;
    }
  }
  var pi = Ha;
  Vv.Fragment = g, Vv.jsxDEV = pi;
})();
gE.exports = Vv;
var c = gE.exports, bE = { exports: {} }, ta = {}, NE = { exports: {} }, EE = {};
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
    function g(le, Ne) {
      var Fe = le.length;
      le.push(Ne), f(le, Ne, Fe);
    }
    function y(le) {
      return le.length === 0 ? null : le[0];
    }
    function S(le) {
      if (le.length === 0)
        return null;
      var Ne = le[0], Fe = le.pop();
      return Fe !== Ne && (le[0] = Fe, V(le, Fe, 0)), Ne;
    }
    function f(le, Ne, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, gt = le[ct];
        if (R(gt, Ne) > 0)
          le[ct] = Ne, le[et] = gt, et = ct;
        else
          return;
      }
    }
    function V(le, Ne, Fe) {
      for (var et = Fe, ct = le.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, vn = le[yt], Nt = yt + 1, it = le[Nt];
        if (R(vn, Ne) < 0)
          Nt < ct && R(it, vn) < 0 ? (le[et] = it, le[Nt] = Ne, et = Nt) : (le[et] = vn, le[yt] = Ne, et = yt);
        else if (Nt < ct && R(it, Ne) < 0)
          le[et] = it, le[Nt] = Ne, et = Nt;
        else
          return;
      }
    }
    function R(le, Ne) {
      var Fe = le.sortIndex - Ne.sortIndex;
      return Fe !== 0 ? Fe : le.id - Ne.id;
    }
    var T = 1, O = 2, D = 3, L = 4, A = 5;
    function I(le, Ne) {
    }
    var ie = typeof performance == "object" && typeof performance.now == "function";
    if (ie) {
      var ne = performance;
      o.unstable_now = function() {
        return ne.now();
      };
    } else {
      var pe = Date, G = pe.now();
      o.unstable_now = function() {
        return pe.now() - G;
      };
    }
    var Y = 1073741823, Z = -1, X = 250, z = 5e3, _ = 1e4, te = Y, q = [], J = [], k = 1, ce = null, ae = D, Ce = !1, Ve = !1, ye = !1, me = typeof setTimeout == "function" ? setTimeout : null, Ge = typeof clearTimeout == "function" ? clearTimeout : null, pn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Qt(le) {
      for (var Ne = y(J); Ne !== null; ) {
        if (Ne.callback === null)
          S(J);
        else if (Ne.startTime <= le)
          S(J), Ne.sortIndex = Ne.expirationTime, g(q, Ne);
        else
          return;
        Ne = y(J);
      }
    }
    function xn(le) {
      if (ye = !1, Qt(le), !Ve)
        if (y(q) !== null)
          Ve = !0, Ot(Ct);
        else {
          var Ne = y(J);
          Ne !== null && Dn(xn, Ne.startTime - le);
        }
    }
    function Ct(le, Ne) {
      Ve = !1, ye && (ye = !1, Fn()), Ce = !0;
      var Fe = ae;
      try {
        var et;
        if (!p) return Yn(le, Ne);
      } finally {
        ce = null, ae = Fe, Ce = !1;
      }
    }
    function Yn(le, Ne) {
      var Fe = Ne;
      for (Qt(Fe), ce = y(q); ce !== null && !(ce.expirationTime > Fe && (!le || rr())); ) {
        var et = ce.callback;
        if (typeof et == "function") {
          ce.callback = null, ae = ce.priorityLevel;
          var ct = ce.expirationTime <= Fe, gt = et(ct);
          Fe = o.unstable_now(), typeof gt == "function" ? ce.callback = gt : ce === y(q) && S(q), Qt(Fe);
        } else
          S(q);
        ce = y(q);
      }
      if (ce !== null)
        return !0;
      var yt = y(J);
      return yt !== null && Dn(xn, yt.startTime - Fe), !1;
    }
    function Xt(le, Ne) {
      switch (le) {
        case T:
        case O:
        case D:
        case L:
        case A:
          break;
        default:
          le = D;
      }
      var Fe = ae;
      ae = le;
      try {
        return Ne();
      } finally {
        ae = Fe;
      }
    }
    function ha(le) {
      var Ne;
      switch (ae) {
        case T:
        case O:
        case D:
          Ne = D;
          break;
        default:
          Ne = ae;
          break;
      }
      var Fe = ae;
      ae = Ne;
      try {
        return le();
      } finally {
        ae = Fe;
      }
    }
    function na(le) {
      var Ne = ae;
      return function() {
        var Fe = ae;
        ae = Ne;
        try {
          return le.apply(this, arguments);
        } finally {
          ae = Fe;
        }
      };
    }
    function Dt(le, Ne, Fe) {
      var et = o.unstable_now(), ct;
      if (typeof Fe == "object" && Fe !== null) {
        var gt = Fe.delay;
        typeof gt == "number" && gt > 0 ? ct = et + gt : ct = et;
      } else
        ct = et;
      var yt;
      switch (le) {
        case T:
          yt = Z;
          break;
        case O:
          yt = X;
          break;
        case A:
          yt = te;
          break;
        case L:
          yt = _;
          break;
        case D:
        default:
          yt = z;
          break;
      }
      var vn = ct + yt, Nt = {
        id: k++,
        callback: Ne,
        priorityLevel: le,
        startTime: ct,
        expirationTime: vn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, g(J, Nt), y(q) === null && Nt === y(J) && (ye ? Fn() : ye = !0, Dn(xn, ct - et))) : (Nt.sortIndex = vn, g(q, Nt), !Ve && !Ce && (Ve = !0, Ot(Ct))), Nt;
    }
    function Jt() {
    }
    function Zt() {
      !Ve && !Ce && (Ve = !0, Ot(Ct));
    }
    function en() {
      return y(q);
    }
    function tn(le) {
      le.callback = null;
    }
    function kn() {
      return ae;
    }
    var Bt = !1, Rn = null, $t = -1, It = m, aa = -1;
    function rr() {
      var le = o.unstable_now() - aa;
      return !(le < It);
    }
    function ga() {
    }
    function Un(le) {
      if (le < 0 || le > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      le > 0 ? It = Math.floor(1e3 / le) : It = m;
    }
    var mn = function() {
      if (Rn !== null) {
        var le = o.unstable_now();
        aa = le;
        var Ne = !0, Fe = !0;
        try {
          Fe = Rn(Ne, le);
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
      var Cn = new MessageChannel(), Pa = Cn.port2;
      Cn.port1.onmessage = mn, nn = function() {
        Pa.postMessage(null);
      };
    } else
      nn = function() {
        me(mn, 0);
      };
    function Ot(le) {
      Rn = le, Bt || (Bt = !0, nn());
    }
    function Dn(le, Ne) {
      $t = me(function() {
        le(o.unstable_now());
      }, Ne);
    }
    function Fn() {
      Ge($t), $t = -1;
    }
    var Mr = ga, ir = null;
    o.unstable_IdlePriority = A, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = L, o.unstable_NormalPriority = D, o.unstable_Profiling = ir, o.unstable_UserBlockingPriority = O, o.unstable_cancelCallback = tn, o.unstable_continueExecution = Zt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = en, o.unstable_next = ha, o.unstable_pauseExecution = Jt, o.unstable_requestPaint = Mr, o.unstable_runWithPriority = Xt, o.unstable_scheduleCallback = Dt, o.unstable_shouldYield = rr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(EE);
NE.exports = EE;
var sw = NE.exports;
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
  var o = E, p = sw, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function S(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      V("warn", e, n);
    }
  }
  function f(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      V("error", e, n);
    }
  }
  function V(e, t, n) {
    {
      var a = m.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var R = 0, T = 1, O = 2, D = 3, L = 4, A = 5, I = 6, ie = 7, ne = 8, pe = 9, G = 10, Y = 11, Z = 12, X = 13, z = 14, _ = 15, te = 16, q = 17, J = 18, k = 19, ce = 21, ae = 22, Ce = 23, Ve = 24, ye = 25, me = !0, Ge = !1, pn = !1, Qt = !1, xn = !1, Ct = !0, Yn = !0, Xt = !0, ha = !0, na = /* @__PURE__ */ new Set(), Dt = {}, Jt = {};
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
  function It(e, t) {
    if (Rn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function aa(e) {
    if (Rn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), $t(e);
  }
  function rr(e, t) {
    if (Rn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), $t(e);
  }
  function ga(e, t) {
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
  var nn = 0, Cn = 1, Pa = 2, Ot = 3, Dn = 4, Fn = 5, Mr = 6, ir = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", le = ir + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ne = new RegExp("^[" + ir + "][" + le + "]*$"), Fe = {}, et = {};
  function ct(e) {
    return kn.call(et, e) ? !0 : kn.call(Fe, e) ? !1 : Ne.test(e) ? (et[e] = !0, !0) : (Fe[e] = !0, f("Invalid attribute name: `%s`", e), !1);
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
        case Mr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Nt(e) {
    return Et.hasOwnProperty(e) ? Et[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Pa || t === Ot || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
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
      Pa,
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
      Pa,
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
      Mr,
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
  var ba = /[\-\:]([a-z])/g, ra = function(e) {
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
    var t = e.replace(ba, ra);
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
    var t = e.replace(ba, ra);
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
    var t = e.replace(ba, ra);
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
  var lr = "xlinkHref";
  Et[lr] = new it(
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
  var io = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, fi = !1;
  function Ji(e) {
    !fi && io.test(e) && (fi = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function Zi(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      It(n, t), a.sanitizeURL && Ji("" + n);
      var i = a.attributeName, l = null;
      if (a.type === Dn) {
        if (e.hasAttribute(i)) {
          var s = e.getAttribute(i);
          return s === "" ? !0 : vn(t, n, a, !1) ? s : s === "" + n ? n : s;
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
      return It(n, t), r === "" + n ? n : r;
    }
  }
  function Na(e, t, n, a) {
    var r = Nt(t);
    if (!gt(t, r, a)) {
      if (vn(t, n, r, a) && (n = null), a || r === null) {
        if (ct(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (It(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var s = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[s] = u === Ot ? !1 : "";
        } else
          e[s] = n;
        return;
      }
      var v = r.attributeName, h = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(v);
      else {
        var C = r.type, x;
        C === Ot || C === Dn && n === !0 ? x = "" : (It(n, v), x = "" + n, r.sanitizeURL && Ji(x.toString())), h ? e.setAttributeNS(h, v, x) : e.setAttribute(v, x);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Ha = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), K = Symbol.for("react.provider"), oe = Symbol.for("react.context"), Ee = Symbol.for("react.forward_ref"), Be = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), xe = Symbol.for("react.lazy"), At = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Ba = Symbol.for("react.cache"), Ea = Symbol.for("react.tracing_marker"), Mt = Symbol.iterator, mi = "@@iterator";
  function Sa(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Mt && e[Mt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, vi = 0, iu, lu, Vr, lo, oo, so, uo;
  function co() {
  }
  co.__reactDisabledLog = !0;
  function ou() {
    {
      if (vi === 0) {
        iu = console.log, lu = console.info, Vr = console.warn, lo = console.error, oo = console.group, so = console.groupCollapsed, uo = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: co,
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
  function su() {
    {
      if (vi--, vi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ze({}, e, {
            value: iu
          }),
          info: ze({}, e, {
            value: lu
          }),
          warn: ze({}, e, {
            value: Vr
          }),
          error: ze({}, e, {
            value: lo
          }),
          group: ze({}, e, {
            value: oo
          }),
          groupCollapsed: ze({}, e, {
            value: so
          }),
          groupEnd: ze({}, e, {
            value: uo
          })
        });
      }
      vi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var el = m.ReactCurrentDispatcher, fo;
  function $a(e, t, n) {
    {
      if (fo === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          fo = a && a[1] || "";
        }
      return `
` + fo + e;
    }
  }
  var hi = !1, Lr;
  {
    var tl = typeof WeakMap == "function" ? WeakMap : Map;
    Lr = new tl();
  }
  function gi(e, t) {
    if (!e || hi)
      return "";
    {
      var n = Lr.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    hi = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = el.current, el.current = null, ou();
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
          } catch (F) {
            a = F;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (F) {
            a = F;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (F) {
          a = F;
        }
        e();
      }
    } catch (F) {
      if (F && a && typeof F.stack == "string") {
        for (var s = F.stack.split(`
`), u = a.stack.split(`
`), v = s.length - 1, h = u.length - 1; v >= 1 && h >= 0 && s[v] !== u[h]; )
          h--;
        for (; v >= 1 && h >= 0; v--, h--)
          if (s[v] !== u[h]) {
            if (v !== 1 || h !== 1)
              do
                if (v--, h--, h < 0 || s[v] !== u[h]) {
                  var C = `
` + s[v].replace(" at new ", " at ");
                  return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, C), C;
                }
              while (v >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      hi = !1, el.current = i, su(), Error.prepareStackTrace = r;
    }
    var x = e ? e.displayName || e.name : "", M = x ? $a(x) : "";
    return typeof e == "function" && Lr.set(e, M), M;
  }
  function nl(e, t, n) {
    return gi(e, !0);
  }
  function po(e, t, n) {
    return gi(e, !1);
  }
  function uu(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function mo(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return gi(e, uu(e));
    if (typeof e == "string")
      return $a(e);
    switch (e) {
      case Be:
        return $a("Suspense");
      case we:
        return $a("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ee:
          return po(e.render);
        case ke:
          return mo(e.type, t, n);
        case xe: {
          var a = e, r = a._payload, i = a._init;
          try {
            return mo(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function Rf(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case A:
        return $a(e.type);
      case te:
        return $a("Lazy");
      case X:
        return $a("Suspense");
      case k:
        return $a("SuspenseList");
      case R:
      case O:
      case _:
        return po(e.type);
      case Y:
        return po(e.type.render);
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
        t += Rf(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function cu(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function vo(e) {
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
        case oe:
          var t = e;
          return vo(t) + ".Consumer";
        case K:
          var n = e;
          return vo(n._context) + ".Provider";
        case Ee:
          return cu(e, e.render, "ForwardRef");
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
  function Cf(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function or(e) {
    return e.displayName || "Context";
  }
  function Le(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Ve:
        return "Cache";
      case pe:
        var a = n;
        return or(a) + ".Consumer";
      case G:
        var r = n;
        return or(r._context) + ".Provider";
      case J:
        return "DehydratedFragment";
      case Y:
        return Cf(n, n.render, "ForwardRef");
      case ie:
        return "Fragment";
      case A:
        return n;
      case L:
        return "Portal";
      case D:
        return "Root";
      case I:
        return "Text";
      case te:
        return Qe(n);
      case ne:
        return n === pi ? "StrictMode" : "Mode";
      case ae:
        return "Offscreen";
      case Z:
        return "Profiler";
      case ce:
        return "Scope";
      case X:
        return "Suspense";
      case k:
        return "SuspenseList";
      case ye:
        return "TracingMarker";
      case T:
      case R:
      case q:
      case O:
      case z:
      case _:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var ho = m.ReactDebugCurrentFrame, Tn = null, bi = !1;
  function kr() {
    {
      if (Tn === null)
        return null;
      var e = Tn._debugOwner;
      if (e !== null && typeof e < "u")
        return Le(e);
    }
    return null;
  }
  function Df() {
    return Tn === null ? "" : yi(Tn);
  }
  function Yt() {
    ho.getCurrentStack = null, Tn = null, bi = !1;
  }
  function mt(e) {
    ho.getCurrentStack = e === null ? null : Df, Tn = e, bi = !1;
  }
  function fu() {
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
  var Tf = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function go(e, t) {
    Tf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function du(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function yo(e) {
    return e._valueTracker;
  }
  function al(e) {
    e._valueTracker = null;
  }
  function jf(e) {
    var t = "";
    return e && (du(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ur(e) {
    var t = du(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    mn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(s) {
          mn(s), a = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(s) {
          mn(s), a = "" + s;
        },
        stopTracking: function() {
          al(e), delete e[t];
        }
      };
      return l;
    }
  }
  function Ni(e) {
    yo(e) || (e._valueTracker = Ur(e));
  }
  function bo(e) {
    if (!e)
      return !1;
    var t = yo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = jf(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function sr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var rl = !1, il = !1, ll = !1, pu = !1;
  function mu(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function No(e, t) {
    var n = e, a = t.checked, r = ze({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function vu(e, t) {
    go("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !il && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), il = !0), t.value !== void 0 && t.defaultValue !== void 0 && !rl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), rl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: xa(t.value != null ? t.value : a),
      controlled: mu(t)
    };
  }
  function d(e, t) {
    var n = e, a = t.checked;
    a != null && Na(n, "checked", a, !1);
  }
  function b(e, t) {
    var n = e;
    {
      var a = mu(t);
      !n._wrapperState.controlled && a && !pu && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), pu = !0), n._wrapperState.controlled && !a && !ll && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ll = !0);
    }
    d(e, t);
    var r = xa(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = jn(r)) : n.value !== jn(r) && (n.value = jn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? De(n, t.type, r) : t.hasOwnProperty("defaultValue") && De(n, t.type, xa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function U(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = jn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var s = a.name;
    s !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, s !== "" && (a.name = s);
  }
  function P(e, t) {
    var n = e;
    b(n, t), ee(n, t);
  }
  function ee(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      It(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var s = tc(l);
          if (!s)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          bo(l), b(l, s);
        }
      }
    }
  }
  function De(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || sr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var ge = !1, Ae = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ae || (Ae = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ge && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ge = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", jn(xa(t.value)));
  }
  var st = Array.isArray;
  function Pe(e) {
    return st(e);
  }
  var vt;
  vt = !1;
  function Tt() {
    var e = kr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var Ei = ["value", "defaultValue"];
  function Eo(e) {
    {
      go("select", e);
      for (var t = 0; t < Ei.length; t++) {
        var n = Ei[t];
        if (e[n] != null) {
          var a = Pe(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Tt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Tt());
        }
      }
    }
  }
  function ur(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, s = 0; s < i.length; s++)
        l["$" + i[s]] = !0;
      for (var u = 0; u < r.length; u++) {
        var v = l.hasOwnProperty("$" + r[u].value);
        r[u].selected !== v && (r[u].selected = v), v && a && (r[u].defaultSelected = !0);
      }
    } else {
      for (var h = jn(xa(n)), C = null, x = 0; x < r.length; x++) {
        if (r[x].value === h) {
          r[x].selected = !0, a && (r[x].defaultSelected = !0);
          return;
        }
        C === null && !r[x].disabled && (C = r[x]);
      }
      C !== null && (C.selected = !0);
    }
  }
  function So(e, t) {
    return ze({}, t, {
      value: void 0
    });
  }
  function xo(e, t) {
    var n = e;
    Eo(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !vt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), vt = !0);
  }
  function wf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? ur(n, !!t.multiple, a, !1) : t.defaultValue != null && ur(n, !!t.multiple, t.defaultValue, !0);
  }
  function hu(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? ur(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? ur(n, !!t.multiple, t.defaultValue, !0) : ur(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function _f(e, t) {
    var n = e, a = t.value;
    a != null && ur(n, !!t.multiple, a, !1);
  }
  var Wv = !1;
  function Of(e, t) {
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
  function Kv(e, t) {
    var n = e;
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Wv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), Wv = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Pe(r)) {
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
  function Qv(e, t) {
    var n = e, a = xa(t.value), r = xa(t.defaultValue);
    if (a != null) {
      var i = jn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = jn(r));
  }
  function Xv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function IE(e, t) {
    Qv(e, t);
  }
  var cr = "http://www.w3.org/1999/xhtml", YE = "http://www.w3.org/1998/Math/MathML", Af = "http://www.w3.org/2000/svg";
  function Mf(e) {
    switch (e) {
      case "svg":
        return Af;
      case "math":
        return YE;
      default:
        return cr;
    }
  }
  function Vf(e, t) {
    return e == null || e === cr ? Mf(t) : e === Af && t === "foreignObject" ? cr : e;
  }
  var qE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, Jv = qE(function(e, t) {
    if (e.namespaceURI === Af && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), zn = 1, fr = 3, jt = 8, dr = 9, Lf = 11, yu = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === fr) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, GE = {
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
  }, Ro = {
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
  function WE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var KE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ro).forEach(function(e) {
    KE.forEach(function(t) {
      Ro[WE(t, e)] = Ro[e];
    });
  });
  function kf(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ro.hasOwnProperty(e) && Ro[e]) ? t + "px" : (ga(t, e), ("" + t).trim());
  }
  var QE = /([A-Z])/g, XE = /^ms-/;
  function JE(e) {
    return e.replace(QE, "-$1").toLowerCase().replace(XE, "-ms-");
  }
  var Zv = function() {
  };
  {
    var ZE = /^(?:webkit|moz|o)[A-Z]/, eS = /^-ms-/, tS = /-(.)/g, eh = /;\s*$/, ol = {}, Uf = {}, th = !1, nh = !1, nS = function(e) {
      return e.replace(tS, function(t, n) {
        return n.toUpperCase();
      });
    }, aS = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        nS(e.replace(eS, "ms-"))
      ));
    }, rS = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, iS = function(e, t) {
      Uf.hasOwnProperty(t) && Uf[t] || (Uf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(eh, "")));
    }, lS = function(e, t) {
      th || (th = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, oS = function(e, t) {
      nh || (nh = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Zv = function(e, t) {
      e.indexOf("-") > -1 ? aS(e) : ZE.test(e) ? rS(e) : eh.test(t) && iS(e, t), typeof t == "number" && (isNaN(t) ? lS(e, t) : isFinite(t) || oS(e, t));
    };
  }
  var sS = Zv;
  function uS(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : JE(a)) + ":", t += kf(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function ah(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || sS(a, t[a]);
        var i = kf(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function cS(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function rh(e) {
    var t = {};
    for (var n in e)
      for (var a = GE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function fS(e, t) {
    {
      if (!t)
        return;
      var n = rh(e), a = rh(t), r = {};
      for (var i in n) {
        var l = n[i], s = a[i];
        if (s && l !== s) {
          var u = l + "," + s;
          if (r[u])
            continue;
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", cS(e[l]) ? "Removing" : "Updating", l, s);
        }
      }
    }
  }
  var dS = {
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
  }, pS = ze({
    menuitem: !0
  }, dS), mS = "__html";
  function Ff(e, t) {
    if (t) {
      if (pS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(mS in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function Si(e, t) {
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
  var bu = {
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
  }, ih = {
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
  }, sl = {}, vS = new RegExp("^(aria)-[" + le + "]*$"), hS = new RegExp("^(aria)[A-Z][" + le + "]*$");
  function gS(e, t) {
    {
      if (kn.call(sl, t) && sl[t])
        return !0;
      if (hS.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = ih.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), sl[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), sl[t] = !0, !0;
      }
      if (vS.test(t)) {
        var r = t.toLowerCase(), i = ih.hasOwnProperty(r) ? r : null;
        if (i == null)
          return sl[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), sl[t] = !0, !0;
      }
    }
    return !0;
  }
  function yS(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = gS(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function bS(e, t) {
    Si(e, t) || yS(e, t);
  }
  var lh = !1;
  function NS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !lh && (lh = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var oh = function() {
  };
  {
    var wn = {}, sh = /^on./, ES = /^on[^A-Z]/, SS = new RegExp("^(aria)-[" + le + "]*$"), xS = new RegExp("^(aria)[A-Z][" + le + "]*$");
    oh = function(e, t, n, a) {
      if (kn.call(wn, t) && wn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), wn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var s = l.hasOwnProperty(r) ? l[r] : null;
        if (s != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, s), wn[t] = !0, !0;
        if (sh.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), wn[t] = !0, !0;
      } else if (sh.test(t))
        return ES.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), wn[t] = !0, !0;
      if (SS.test(t) || xS.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), wn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), wn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), wn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), wn[t] = !0, !0;
      var u = Nt(t), v = u !== null && u.type === nn;
      if (bu.hasOwnProperty(r)) {
        var h = bu[r];
        if (h !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, h), wn[t] = !0, !0;
      } else if (!v && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), wn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), wn[t] = !0, !0) : v ? !0 : yt(t, n, u, !1) ? (wn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === Ot && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), wn[t] = !0), !0);
    };
  }
  var RS = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = oh(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(s) {
        return "`" + s + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function CS(e, t, n) {
    Si(e, t) || RS(e, t, n);
  }
  var uh = 1, zf = 2, Co = 4, DS = uh | zf | Co, Do = null;
  function TS(e) {
    Do !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Do = e;
  }
  function jS() {
    Do === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Do = null;
  }
  function wS(e) {
    return e === Do;
  }
  function Pf(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === fr ? t.parentNode : t;
  }
  var Hf = null, ul = null, cl = null;
  function ch(e) {
    var t = qr(e);
    if (t) {
      if (typeof Hf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = tc(n);
        Hf(t.stateNode, t.type, a);
      }
    }
  }
  function _S(e) {
    Hf = e;
  }
  function fh(e) {
    ul ? cl ? cl.push(e) : cl = [e] : ul = e;
  }
  function OS() {
    return ul !== null || cl !== null;
  }
  function dh() {
    if (ul) {
      var e = ul, t = cl;
      if (ul = null, cl = null, ch(e), t)
        for (var n = 0; n < t.length; n++)
          ch(t[n]);
    }
  }
  var ph = function(e, t) {
    return e(t);
  }, mh = function() {
  }, Bf = !1;
  function AS() {
    var e = OS();
    e && (mh(), dh());
  }
  function vh(e, t, n) {
    if (Bf)
      return e(t, n);
    Bf = !0;
    try {
      return ph(e, t, n);
    } finally {
      Bf = !1, AS();
    }
  }
  function MS(e, t, n) {
    ph = e, mh = n;
  }
  function VS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function LS(e, t, n) {
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
        return !!(n.disabled && VS(t));
      default:
        return !1;
    }
  }
  function To(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = tc(n);
    if (a === null)
      return null;
    var r = a[t];
    if (LS(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var $f = !1;
  if (tn)
    try {
      var jo = {};
      Object.defineProperty(jo, "passive", {
        get: function() {
          $f = !0;
        }
      }), window.addEventListener("test", jo, jo), window.removeEventListener("test", jo, jo);
    } catch {
      $f = !1;
    }
  function hh(e, t, n, a, r, i, l, s, u) {
    var v = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, v);
    } catch (h) {
      this.onError(h);
    }
  }
  var gh = hh;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var If = document.createElement("react");
    gh = function(t, n, a, r, i, l, s, u, v) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), C = !1, x = !0, M = window.event, F = Object.getOwnPropertyDescriptor(window, "event");
      function H() {
        If.removeEventListener(B, Se, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
      }
      var se = Array.prototype.slice.call(arguments, 3);
      function Se() {
        C = !0, H(), n.apply(a, se), x = !1;
      }
      var be, qe = !1, He = !1;
      function j(w) {
        if (be = w.error, qe = !0, be === null && w.colno === 0 && w.lineno === 0 && (He = !0), w.defaultPrevented && be != null && typeof be == "object")
          try {
            be._suppressLogging = !0;
          } catch {
          }
      }
      var B = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), If.addEventListener(B, Se, !1), h.initEvent(B, !1, !1), If.dispatchEvent(h), F && Object.defineProperty(window, "event", F), C && x && (qe ? He && (be = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : be = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(be)), window.removeEventListener("error", j), !C)
        return H(), hh.apply(this, arguments);
    };
  }
  var kS = gh, fl = !1, Nu = null, Eu = !1, Yf = null, US = {
    onError: function(e) {
      fl = !0, Nu = e;
    }
  };
  function qf(e, t, n, a, r, i, l, s, u) {
    fl = !1, Nu = null, kS.apply(US, arguments);
  }
  function FS(e, t, n, a, r, i, l, s, u) {
    if (qf.apply(this, arguments), fl) {
      var v = Gf();
      Eu || (Eu = !0, Yf = v);
    }
  }
  function zS() {
    if (Eu) {
      var e = Yf;
      throw Eu = !1, Yf = null, e;
    }
  }
  function PS() {
    return fl;
  }
  function Gf() {
    if (fl) {
      var e = Nu;
      return fl = !1, Nu = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function dl(e) {
    return e._reactInternals;
  }
  function HS(e) {
    return e._reactInternals !== void 0;
  }
  function BS(e, t) {
    e._reactInternals = t;
  }
  var Te = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), wt = (
    /*                    */
    2
  ), Xe = (
    /*                       */
    4
  ), xi = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), yh = (
    /*                     */
    64
  ), Je = (
    /*                   */
    128
  ), pr = (
    /*            */
    256
  ), Ri = (
    /*                          */
    512
  ), ml = (
    /*                     */
    1024
  ), Fr = (
    /*                      */
    2048
  ), mr = (
    /*                    */
    4096
  ), Ci = (
    /*                   */
    8192
  ), Wf = (
    /*             */
    16384
  ), $S = (
    /*               */
    32767
  ), Su = (
    /*                   */
    32768
  ), _n = (
    /*                */
    65536
  ), Kf = (
    /* */
    131072
  ), bh = (
    /*                       */
    1048576
  ), Qf = (
    /*                    */
    2097152
  ), Di = (
    /*                 */
    4194304
  ), Xf = (
    /*                */
    8388608
  ), zr = (
    /*               */
    16777216
  ), Jf = (
    /*              */
    33554432
  ), Zf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    Xe | ml | 0
  ), ed = wt | Xe | xi | wo | Ri | mr | Ci, _o = Xe | yh | Ri | Ci, vl = Fr | xi, vr = Di | Xf | Qf, IS = m.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (wt | mr)) !== Te && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === D ? n : null;
  }
  function Nh(e) {
    if (e.tag === X) {
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
  function Eh(e) {
    return e.tag === D ? e.stateNode.containerInfo : null;
  }
  function YS(e) {
    return Ti(e) === e;
  }
  function qS(e) {
    {
      var t = IS.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Le(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = dl(e);
    return r ? Ti(r) === r : !1;
  }
  function Sh(e) {
    if (Ti(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function xh(e) {
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
        var s = i.return;
        if (s !== null) {
          a = r = s;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (var u = i.child; u; ) {
          if (u === a)
            return Sh(i), e;
          if (u === r)
            return Sh(i), t;
          u = u.sibling;
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
    if (a.tag !== D)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function Rh(e) {
    var t = xh(e);
    return t !== null ? Ch(t) : null;
  }
  function Ch(e) {
    if (e.tag === A || e.tag === I)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Ch(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function GS(e) {
    var t = xh(e);
    return t !== null ? Dh(t) : null;
  }
  function Dh(e) {
    if (e.tag === A || e.tag === I)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== L) {
        var n = Dh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Th = p.unstable_scheduleCallback, WS = p.unstable_cancelCallback, KS = p.unstable_shouldYield, QS = p.unstable_requestPaint, qt = p.unstable_now, XS = p.unstable_getCurrentPriorityLevel, xu = p.unstable_ImmediatePriority, td = p.unstable_UserBlockingPriority, ji = p.unstable_NormalPriority, JS = p.unstable_LowPriority, nd = p.unstable_IdlePriority, ZS = p.unstable_yieldValue, ex = p.unstable_setDisableYieldValue, hl = null, gn = null, fe = null, Ia = !1, Ra = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Yn && (e = ze({}, e, {
        getLaneLabelMap: ox,
        injectProfilingHooks: lx
      })), hl = t.inject(e), gn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function nx(e, t) {
    if (gn && typeof gn.onScheduleFiberRoot == "function")
      try {
        gn.onScheduleFiberRoot(hl, e, t);
      } catch (n) {
        Ia || (Ia = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function ax(e, t) {
    if (gn && typeof gn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Je) === Je;
        if (Xt) {
          var a;
          switch (t) {
            case Kn:
              a = xu;
              break;
            case gr:
              a = td;
              break;
            case yr:
              a = ji;
              break;
            case _u:
              a = nd;
              break;
            default:
              a = ji;
              break;
          }
          gn.onCommitFiberRoot(hl, e, a, n);
        }
      } catch (r) {
        Ia || (Ia = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function rx(e) {
    if (gn && typeof gn.onPostCommitFiberRoot == "function")
      try {
        gn.onPostCommitFiberRoot(hl, e);
      } catch (t) {
        Ia || (Ia = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function ix(e) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(hl, e);
      } catch (t) {
        Ia || (Ia = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof ZS == "function" && (ex(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        Ia || (Ia = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function lx(e) {
    fe = e;
  }
  function ox() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < rd; n++) {
        var a = Tx(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function sx(e) {
    fe !== null && typeof fe.markCommitStarted == "function" && fe.markCommitStarted(e);
  }
  function jh() {
    fe !== null && typeof fe.markCommitStopped == "function" && fe.markCommitStopped();
  }
  function Oo(e) {
    fe !== null && typeof fe.markComponentRenderStarted == "function" && fe.markComponentRenderStarted(e);
  }
  function gl() {
    fe !== null && typeof fe.markComponentRenderStopped == "function" && fe.markComponentRenderStopped();
  }
  function ux(e) {
    fe !== null && typeof fe.markComponentPassiveEffectMountStarted == "function" && fe.markComponentPassiveEffectMountStarted(e);
  }
  function cx() {
    fe !== null && typeof fe.markComponentPassiveEffectMountStopped == "function" && fe.markComponentPassiveEffectMountStopped();
  }
  function fx(e) {
    fe !== null && typeof fe.markComponentPassiveEffectUnmountStarted == "function" && fe.markComponentPassiveEffectUnmountStarted(e);
  }
  function dx() {
    fe !== null && typeof fe.markComponentPassiveEffectUnmountStopped == "function" && fe.markComponentPassiveEffectUnmountStopped();
  }
  function px(e) {
    fe !== null && typeof fe.markComponentLayoutEffectMountStarted == "function" && fe.markComponentLayoutEffectMountStarted(e);
  }
  function mx() {
    fe !== null && typeof fe.markComponentLayoutEffectMountStopped == "function" && fe.markComponentLayoutEffectMountStopped();
  }
  function wh(e) {
    fe !== null && typeof fe.markComponentLayoutEffectUnmountStarted == "function" && fe.markComponentLayoutEffectUnmountStarted(e);
  }
  function _h() {
    fe !== null && typeof fe.markComponentLayoutEffectUnmountStopped == "function" && fe.markComponentLayoutEffectUnmountStopped();
  }
  function vx(e, t, n) {
    fe !== null && typeof fe.markComponentErrored == "function" && fe.markComponentErrored(e, t, n);
  }
  function hx(e, t, n) {
    fe !== null && typeof fe.markComponentSuspended == "function" && fe.markComponentSuspended(e, t, n);
  }
  function gx(e) {
    fe !== null && typeof fe.markLayoutEffectsStarted == "function" && fe.markLayoutEffectsStarted(e);
  }
  function yx() {
    fe !== null && typeof fe.markLayoutEffectsStopped == "function" && fe.markLayoutEffectsStopped();
  }
  function bx(e) {
    fe !== null && typeof fe.markPassiveEffectsStarted == "function" && fe.markPassiveEffectsStarted(e);
  }
  function Nx() {
    fe !== null && typeof fe.markPassiveEffectsStopped == "function" && fe.markPassiveEffectsStopped();
  }
  function Oh(e) {
    fe !== null && typeof fe.markRenderStarted == "function" && fe.markRenderStarted(e);
  }
  function Ex() {
    fe !== null && typeof fe.markRenderYielded == "function" && fe.markRenderYielded();
  }
  function Ah() {
    fe !== null && typeof fe.markRenderStopped == "function" && fe.markRenderStopped();
  }
  function Sx(e) {
    fe !== null && typeof fe.markRenderScheduled == "function" && fe.markRenderScheduled(e);
  }
  function xx(e, t) {
    fe !== null && typeof fe.markForceUpdateScheduled == "function" && fe.markForceUpdateScheduled(e, t);
  }
  function ad(e, t) {
    fe !== null && typeof fe.markStateUpdateScheduled == "function" && fe.markStateUpdateScheduled(e, t);
  }
  var Re = (
    /*                         */
    0
  ), Ie = (
    /*                 */
    1
  ), nt = (
    /*                    */
    2
  ), St = (
    /*               */
    8
  ), Ya = (
    /*              */
    16
  ), Mh = Math.clz32 ? Math.clz32 : Dx, Rx = Math.log, Cx = Math.LN2;
  function Dx(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (Rx(t) / Cx | 0) | 0;
  }
  var rd = 31, W = (
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
  ), hr = (
    /*             */
    4
  ), wi = (
    /*            */
    8
  ), qa = (
    /*                     */
    16
  ), Ao = (
    /*                */
    32
  ), bl = (
    /*                       */
    4194240
  ), Mo = (
    /*                        */
    64
  ), id = (
    /*                        */
    128
  ), ld = (
    /*                        */
    256
  ), od = (
    /*                        */
    512
  ), sd = (
    /*                        */
    1024
  ), ud = (
    /*                        */
    2048
  ), cd = (
    /*                        */
    4096
  ), fd = (
    /*                        */
    8192
  ), dd = (
    /*                        */
    16384
  ), pd = (
    /*                       */
    32768
  ), md = (
    /*                       */
    65536
  ), vd = (
    /*                       */
    131072
  ), hd = (
    /*                       */
    262144
  ), gd = (
    /*                       */
    524288
  ), yd = (
    /*                       */
    1048576
  ), bd = (
    /*                       */
    2097152
  ), Ru = (
    /*                            */
    130023424
  ), Nl = (
    /*                             */
    4194304
  ), Nd = (
    /*                             */
    8388608
  ), Ed = (
    /*                             */
    16777216
  ), Sd = (
    /*                             */
    33554432
  ), xd = (
    /*                             */
    67108864
  ), Vh = Nl, Vo = (
    /*          */
    134217728
  ), Lh = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), Gn = (
    /*                   */
    1073741824
  );
  function Tx(e) {
    {
      if (e & _e)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & hr)
        return "InputContinuous";
      if (e & wi)
        return "DefaultHydration";
      if (e & qa)
        return "Default";
      if (e & Ao)
        return "TransitionHydration";
      if (e & bl)
        return "Transition";
      if (e & Ru)
        return "Retry";
      if (e & Vo)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & Gn)
        return "Offscreen";
    }
  }
  var ut = -1, Cu = Mo, Du = Nl;
  function ko(e) {
    switch (Oi(e)) {
      case _e:
        return _e;
      case yl:
        return yl;
      case hr:
        return hr;
      case wi:
        return wi;
      case qa:
        return qa;
      case Ao:
        return Ao;
      case Mo:
      case id:
      case ld:
      case od:
      case sd:
      case ud:
      case cd:
      case fd:
      case dd:
      case pd:
      case md:
      case vd:
      case hd:
      case gd:
      case yd:
      case bd:
        return e & bl;
      case Nl:
      case Nd:
      case Ed:
      case Sd:
      case xd:
        return e & Ru;
      case Vo:
        return Vo;
      case Lo:
        return Lo;
      case _i:
        return _i;
      case Gn:
        return Gn;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Tu(e, t) {
    var n = e.pendingLanes;
    if (n === W)
      return W;
    var a = W, r = e.suspendedLanes, i = e.pingedLanes, l = n & Lh;
    if (l !== W) {
      var s = l & ~r;
      if (s !== W)
        a = ko(s);
      else {
        var u = l & i;
        u !== W && (a = ko(u));
      }
    } else {
      var v = n & ~r;
      v !== W ? a = ko(v) : i !== W && (a = ko(i));
    }
    if (a === W)
      return W;
    if (t !== W && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === W) {
      var h = Oi(a), C = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= C || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === qa && (C & bl) !== W
      )
        return t;
    }
    (a & hr) !== W && (a |= n & qa);
    var x = e.entangledLanes;
    if (x !== W)
      for (var M = e.entanglements, F = a & x; F > 0; ) {
        var H = Ai(F), se = 1 << H;
        a |= M[H], F &= ~se;
      }
    return a;
  }
  function jx(e, t) {
    for (var n = e.eventTimes, a = ut; t > 0; ) {
      var r = Ai(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function wx(e, t) {
    switch (e) {
      case _e:
      case yl:
      case hr:
        return t + 250;
      case wi:
      case qa:
      case Ao:
      case Mo:
      case id:
      case ld:
      case od:
      case sd:
      case ud:
      case cd:
      case fd:
      case dd:
      case pd:
      case md:
      case vd:
      case hd:
      case gd:
      case yd:
      case bd:
        return t + 5e3;
      case Nl:
      case Nd:
      case Ed:
      case Sd:
      case xd:
        return ut;
      case Vo:
      case Lo:
      case _i:
      case Gn:
        return ut;
      default:
        return f("Should have found matching lanes. This is a bug in React."), ut;
    }
  }
  function _x(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Ai(l), u = 1 << s, v = i[s];
      v === ut ? ((u & a) === W || (u & r) !== W) && (i[s] = wx(u, t)) : v <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function Ox(e) {
    return ko(e.pendingLanes);
  }
  function Rd(e) {
    var t = e.pendingLanes & ~Gn;
    return t !== W ? t : t & Gn ? Gn : W;
  }
  function Ax(e) {
    return (e & _e) !== W;
  }
  function Cd(e) {
    return (e & Lh) !== W;
  }
  function kh(e) {
    return (e & Ru) === e;
  }
  function Mx(e) {
    var t = _e | hr | qa;
    return (e & t) === W;
  }
  function Vx(e) {
    return (e & bl) === e;
  }
  function ju(e, t) {
    var n = yl | hr | wi | qa;
    return (t & n) !== W;
  }
  function Lx(e, t) {
    return (t & e.expiredLanes) !== W;
  }
  function Uh(e) {
    return (e & bl) !== W;
  }
  function Fh() {
    var e = Cu;
    return Cu <<= 1, (Cu & bl) === W && (Cu = Mo), e;
  }
  function kx() {
    var e = Du;
    return Du <<= 1, (Du & Ru) === W && (Du = Nl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Ai(e) {
    return 31 - Mh(e);
  }
  function Dd(e) {
    return Ai(e);
  }
  function Wn(e, t) {
    return (e & t) !== W;
  }
  function El(e, t) {
    return (e & t) === t;
  }
  function Ue(e, t) {
    return e | t;
  }
  function wu(e, t) {
    return e & ~t;
  }
  function zh(e, t) {
    return e & t;
  }
  function Z_(e) {
    return e;
  }
  function Ux(e, t) {
    return e !== Wt && e < t ? e : t;
  }
  function Td(e) {
    for (var t = [], n = 0; n < rd; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = W, e.pingedLanes = W);
    var a = e.eventTimes, r = Dd(t);
    a[r] = n;
  }
  function Fx(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Ai(a), i = 1 << r;
      n[r] = ut, a &= ~i;
    }
  }
  function Ph(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function zx(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = W, e.pingedLanes = W, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var s = Ai(l), u = 1 << s;
      a[s] = W, r[s] = ut, i[s] = ut, l &= ~u;
    }
  }
  function jd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Ai(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function Px(e, t) {
    var n = Oi(t), a;
    switch (n) {
      case hr:
        a = yl;
        break;
      case qa:
        a = wi;
        break;
      case Mo:
      case id:
      case ld:
      case od:
      case sd:
      case ud:
      case cd:
      case fd:
      case dd:
      case pd:
      case md:
      case vd:
      case hd:
      case gd:
      case yd:
      case bd:
      case Nl:
      case Nd:
      case Ed:
      case Sd:
      case xd:
        a = Ao;
        break;
      case _i:
        a = Lo;
        break;
      default:
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
  }
  function Hh(e, t, n) {
    if (Ra)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Dd(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Bh(e, t) {
    if (Ra)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Dd(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(s) {
          var u = s.alternate;
          (u === null || !a.has(u)) && a.add(s);
        }), l.clear()), t &= ~i;
      }
  }
  function $h(e, t) {
    return null;
  }
  var Kn = _e, gr = hr, yr = qa, _u = _i, zo = Wt;
  function Ca() {
    return zo;
  }
  function Kt(e) {
    zo = e;
  }
  function Hx(e, t) {
    var n = zo;
    try {
      return zo = e, t();
    } finally {
      zo = n;
    }
  }
  function Bx(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function $x(e, t) {
    return e > t ? e : t;
  }
  function wd(e, t) {
    return e !== 0 && e < t;
  }
  function Ih(e) {
    var t = Oi(e);
    return wd(Kn, t) ? wd(gr, t) ? Cd(t) ? yr : _u : gr : Kn;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Yh;
  function Ix(e) {
    Yh = e;
  }
  function Yx(e) {
    Yh(e);
  }
  var _d;
  function qx(e) {
    _d = e;
  }
  var qh;
  function Gx(e) {
    qh = e;
  }
  var Gh;
  function Wx(e) {
    Gh = e;
  }
  var Wh;
  function Kx(e) {
    Wh = e;
  }
  var Od = !1, Au = [], Pr = null, Hr = null, Br = null, Po = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), $r = [], Qx = [
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
  function Xx(e) {
    return Qx.indexOf(e) > -1;
  }
  function Jx(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Kh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pr = null;
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
        Po.delete(n);
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
  function Bo(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = Jx(t, n, a, r, i);
      if (t !== null) {
        var s = qr(t);
        s !== null && _d(s);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var u = e.targetContainers;
    return r !== null && u.indexOf(r) === -1 && u.push(r), e;
  }
  function Zx(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Pr = Bo(Pr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Hr = Bo(Hr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var s = r;
        return Br = Bo(Br, e, t, n, a, s), !0;
      }
      case "pointerover": {
        var u = r, v = u.pointerId;
        return Po.set(v, Bo(Po.get(v) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var h = r, C = h.pointerId;
        return Ho.set(C, Bo(Ho.get(C) || null, e, t, n, a, h)), !0;
      }
    }
    return !1;
  }
  function Qh(e) {
    var t = Li(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === X) {
          var r = Nh(n);
          if (r !== null) {
            e.blockedOn = r, Wh(e.priority, function() {
              qh(n);
            });
            return;
          }
        } else if (a === D) {
          var i = n.stateNode;
          if (Ou(i)) {
            e.blockedOn = Eh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function e0(e) {
    for (var t = Gh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < $r.length && wd(t, $r[a].priority); a++)
      ;
    $r.splice(a, 0, n), a === 0 && Qh(n);
  }
  function Mu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Vd(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        TS(i), r.target.dispatchEvent(i), jS();
      } else {
        var l = qr(a);
        return l !== null && _d(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Xh(e, t, n) {
    Mu(e) && n.delete(t);
  }
  function t0() {
    Od = !1, Pr !== null && Mu(Pr) && (Pr = null), Hr !== null && Mu(Hr) && (Hr = null), Br !== null && Mu(Br) && (Br = null), Po.forEach(Xh), Ho.forEach(Xh);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, t0)));
  }
  function Io(e) {
    if (Au.length > 0) {
      $o(Au[0], e);
      for (var t = 1; t < Au.length; t++) {
        var n = Au[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Pr !== null && $o(Pr, e), Hr !== null && $o(Hr, e), Br !== null && $o(Br, e);
    var a = function(s) {
      return $o(s, e);
    };
    Po.forEach(a), Ho.forEach(a);
    for (var r = 0; r < $r.length; r++) {
      var i = $r[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; $r.length > 0; ) {
      var l = $r[0];
      if (l.blockedOn !== null)
        break;
      Qh(l), l.blockedOn === null && $r.shift();
    }
  }
  var Sl = m.ReactCurrentBatchConfig, Ad = !0;
  function Jh(e) {
    Ad = !!e;
  }
  function n0() {
    return Ad;
  }
  function a0(e, t, n) {
    var a = Zh(t), r;
    switch (a) {
      case Kn:
        r = r0;
        break;
      case gr:
        r = i0;
        break;
      case yr:
      default:
        r = Md;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function r0(e, t, n, a) {
    var r = Ca(), i = Sl.transition;
    Sl.transition = null;
    try {
      Kt(Kn), Md(e, t, n, a);
    } finally {
      Kt(r), Sl.transition = i;
    }
  }
  function i0(e, t, n, a) {
    var r = Ca(), i = Sl.transition;
    Sl.transition = null;
    try {
      Kt(gr), Md(e, t, n, a);
    } finally {
      Kt(r), Sl.transition = i;
    }
  }
  function Md(e, t, n, a) {
    Ad && l0(e, t, n, a);
  }
  function l0(e, t, n, a) {
    var r = Vd(e, t, n, a);
    if (r === null) {
      Wd(e, t, a, Vu, n), Kh(e, a);
      return;
    }
    if (Zx(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Kh(e, a), t & Co && Xx(e)) {
      for (; r !== null; ) {
        var i = qr(r);
        i !== null && Yx(i);
        var l = Vd(e, t, n, a);
        if (l === null && Wd(e, t, a, Vu, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Wd(e, t, a, null, n);
  }
  var Vu = null;
  function Vd(e, t, n, a) {
    Vu = null;
    var r = Pf(a), i = Li(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var s = l.tag;
        if (s === X) {
          var u = Nh(l);
          if (u !== null)
            return u;
          i = null;
        } else if (s === D) {
          var v = l.stateNode;
          if (Ou(v))
            return Eh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Vu = i, null;
  }
  function Zh(e) {
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
        return gr;
      case "message": {
        var t = XS();
        switch (t) {
          case xu:
            return Kn;
          case td:
            return gr;
          case ji:
          case JS:
            return yr;
          case nd:
            return _u;
          default:
            return yr;
        }
      }
      default:
        return yr;
    }
  }
  function o0(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function s0(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function u0(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function c0(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Yo = null, Ld = null, qo = null;
  function f0(e) {
    return Yo = e, Ld = tg(), !0;
  }
  function d0() {
    Yo = null, Ld = null, qo = null;
  }
  function eg() {
    if (qo)
      return qo;
    var e, t = Ld, n = t.length, a, r = tg(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var s = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, s), qo;
  }
  function tg() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function Lu(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function ku() {
    return !0;
  }
  function ng() {
    return !1;
  }
  function Qn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var s in e)
        if (e.hasOwnProperty(s)) {
          var u = e[s];
          u ? this[s] = u(i) : this[s] = i[s];
        }
      var v = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return v ? this.isDefaultPrevented = ku : this.isDefaultPrevented = ng, this.isPropagationStopped = ng, this;
    }
    return ze(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ku);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ku);
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
      isPersistent: ku
    }), t;
  }
  var xl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kd = Qn(xl), Go = ze({}, xl, {
    view: 0,
    detail: 0
  }), p0 = Qn(Go), Ud, Fd, Wo;
  function m0(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (Ud = e.screenX - Wo.screenX, Fd = e.screenY - Wo.screenY) : (Ud = 0, Fd = 0), Wo = e);
  }
  var Uu = ze({}, Go, {
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
    getModifierState: Pd,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (m0(e), Ud);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Fd;
    }
  }), ag = Qn(Uu), v0 = ze({}, Uu, {
    dataTransfer: 0
  }), h0 = Qn(v0), g0 = ze({}, Go, {
    relatedTarget: 0
  }), zd = Qn(g0), y0 = ze({}, xl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), b0 = Qn(y0), N0 = ze({}, xl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), E0 = Qn(N0), S0 = ze({}, xl, {
    data: 0
  }), rg = Qn(S0), x0 = rg, R0 = {
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
  }, C0 = {
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
  function D0(e) {
    if (e.key) {
      var t = R0[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Lu(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? C0[e.keyCode] || "Unidentified" : "";
  }
  var T0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function j0(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = T0[e];
    return a ? !!n[a] : !1;
  }
  function Pd(e) {
    return j0;
  }
  var w0 = ze({}, Go, {
    key: D0,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Pd,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Lu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Lu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _0 = Qn(w0), O0 = ze({}, Uu, {
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
  }), ig = Qn(O0), A0 = ze({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pd
  }), M0 = Qn(A0), V0 = ze({}, xl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), L0 = Qn(V0), k0 = ze({}, Uu, {
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
  }), U0 = Qn(k0), F0 = [9, 13, 27, 32], lg = 229, Hd = tn && "CompositionEvent" in window, Ko = null;
  tn && "documentMode" in document && (Ko = document.documentMode);
  var z0 = tn && "TextEvent" in window && !Ko, og = tn && (!Hd || Ko && Ko > 8 && Ko <= 11), sg = 32, ug = String.fromCharCode(sg);
  function P0() {
    Zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Zt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var cg = !1;
  function H0(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function B0(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function $0(e, t) {
    return e === "keydown" && t.keyCode === lg;
  }
  function fg(e, t) {
    switch (e) {
      case "keyup":
        return F0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== lg;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function dg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function pg(e) {
    return e.locale === "ko";
  }
  var Rl = !1;
  function I0(e, t, n, a, r) {
    var i, l;
    if (Hd ? i = B0(t) : Rl ? fg(t, a) && (i = "onCompositionEnd") : $0(t, a) && (i = "onCompositionStart"), !i)
      return null;
    og && !pg(a) && (!Rl && i === "onCompositionStart" ? Rl = f0(r) : i === "onCompositionEnd" && Rl && (l = eg()));
    var s = Bu(n, i);
    if (s.length > 0) {
      var u = new rg(i, t, null, a, r);
      if (e.push({
        event: u,
        listeners: s
      }), l)
        u.data = l;
      else {
        var v = dg(a);
        v !== null && (u.data = v);
      }
    }
  }
  function Y0(e, t) {
    switch (e) {
      case "compositionend":
        return dg(t);
      case "keypress":
        var n = t.which;
        return n !== sg ? null : (cg = !0, ug);
      case "textInput":
        var a = t.data;
        return a === ug && cg ? null : a;
      default:
        return null;
    }
  }
  function q0(e, t) {
    if (Rl) {
      if (e === "compositionend" || !Hd && fg(e, t)) {
        var n = eg();
        return d0(), Rl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!H0(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return og && !pg(t) ? null : t.data;
      default:
        return null;
    }
  }
  function G0(e, t, n, a, r) {
    var i;
    if (z0 ? i = Y0(t, a) : i = q0(t, a), !i)
      return null;
    var l = Bu(n, "onBeforeInput");
    if (l.length > 0) {
      var s = new x0("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: s,
        listeners: l
      }), s.data = i;
    }
  }
  function W0(e, t, n, a, r, i, l) {
    I0(e, t, n, a, r), G0(e, t, n, a, r);
  }
  var K0 = {
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
  function mg(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!K0[e.type] : t === "textarea";
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
  function Q0(e) {
    if (!tn)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function X0() {
    Zt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function vg(e, t, n, a) {
    fh(a);
    var r = Bu(t, "onChange");
    if (r.length > 0) {
      var i = new kd("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Qo = null, Xo = null;
  function J0(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function Z0(e) {
    var t = [];
    vg(t, Xo, e, Pf(e)), vh(eR, t);
  }
  function eR(e) {
    Mg(e, 0);
  }
  function Fu(e) {
    var t = _l(e);
    if (bo(t))
      return e;
  }
  function tR(e, t) {
    if (e === "change")
      return t;
  }
  var hg = !1;
  tn && (hg = Q0("input") && (!document.documentMode || document.documentMode > 9));
  function nR(e, t) {
    Qo = e, Xo = t, Qo.attachEvent("onpropertychange", yg);
  }
  function gg() {
    Qo && (Qo.detachEvent("onpropertychange", yg), Qo = null, Xo = null);
  }
  function yg(e) {
    e.propertyName === "value" && Fu(Xo) && Z0(e);
  }
  function aR(e, t, n) {
    e === "focusin" ? (gg(), nR(t, n)) : e === "focusout" && gg();
  }
  function rR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fu(Xo);
  }
  function iR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function lR(e, t) {
    if (e === "click")
      return Fu(t);
  }
  function oR(e, t) {
    if (e === "input" || e === "change")
      return Fu(t);
  }
  function sR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || De(e, "number", e.value);
  }
  function uR(e, t, n, a, r, i, l) {
    var s = n ? _l(n) : window, u, v;
    if (J0(s) ? u = tR : mg(s) ? hg ? u = oR : (u = rR, v = aR) : iR(s) && (u = lR), u) {
      var h = u(t, n);
      if (h) {
        vg(e, h, a, r);
        return;
      }
    }
    v && v(t, s, n), t === "focusout" && sR(s);
  }
  function cR() {
    en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function fR(e, t, n, a, r, i, l) {
    var s = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (s && !wS(a)) {
      var v = a.relatedTarget || a.fromElement;
      if (v && (Li(v) || ds(v)))
        return;
    }
    if (!(!u && !s)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var C = r.ownerDocument;
        C ? h = C.defaultView || C.parentWindow : h = window;
      }
      var x, M;
      if (u) {
        var F = a.relatedTarget || a.toElement;
        if (x = n, M = F ? Li(F) : null, M !== null) {
          var H = Ti(M);
          (M !== H || M.tag !== A && M.tag !== I) && (M = null);
        }
      } else
        x = null, M = n;
      if (x !== M) {
        var se = ag, Se = "onMouseLeave", be = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (se = ig, Se = "onPointerLeave", be = "onPointerEnter", qe = "pointer");
        var He = x == null ? h : _l(x), j = M == null ? h : _l(M), B = new se(Se, qe + "leave", x, a, r);
        B.target = He, B.relatedTarget = j;
        var w = null, Q = Li(r);
        if (Q === n) {
          var ve = new se(be, qe + "enter", M, a, r);
          ve.target = j, ve.relatedTarget = He, w = ve;
        }
        LR(e, B, w, x, M);
      }
    }
  }
  function dR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Xn = typeof Object.is == "function" ? Object.is : dR;
  function Jo(e, t) {
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
  function bg(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function pR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function Ng(e, t) {
    for (var n = bg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === fr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = bg(pR(n));
    }
  }
  function mR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, s = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return vR(e, r, i, l, s);
  }
  function vR(e, t, n, a, r) {
    var i = 0, l = -1, s = -1, u = 0, v = 0, h = e, C = null;
    e: for (; ; ) {
      for (var x = null; h === t && (n === 0 || h.nodeType === fr) && (l = i + n), h === a && (r === 0 || h.nodeType === fr) && (s = i + r), h.nodeType === fr && (i += h.nodeValue.length), (x = h.firstChild) !== null; )
        C = h, h = x;
      for (; ; ) {
        if (h === e)
          break e;
        if (C === t && ++u === n && (l = i), C === a && ++v === r && (s = i), (x = h.nextSibling) !== null)
          break;
        h = C, C = h.parentNode;
      }
      h = x;
    }
    return l === -1 || s === -1 ? null : {
      start: l,
      end: s
    };
  }
  function hR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), s = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > s) {
        var u = s;
        s = l, l = u;
      }
      var v = Ng(e, l), h = Ng(e, s);
      if (v && h) {
        if (r.rangeCount === 1 && r.anchorNode === v.node && r.anchorOffset === v.offset && r.focusNode === h.node && r.focusOffset === h.offset)
          return;
        var C = n.createRange();
        C.setStart(v.node, v.offset), r.removeAllRanges(), l > s ? (r.addRange(C), r.extend(h.node, h.offset)) : (C.setEnd(h.node, h.offset), r.addRange(C));
      }
    }
  }
  function Eg(e) {
    return e && e.nodeType === fr;
  }
  function Sg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Eg(e) ? !1 : Eg(t) ? Sg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function gR(e) {
    return e && e.ownerDocument && Sg(e.ownerDocument.documentElement, e);
  }
  function yR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function xg() {
    for (var e = window, t = sr(); t instanceof e.HTMLIFrameElement; ) {
      if (yR(t))
        e = t.contentWindow;
      else
        return t;
      t = sr(e.document);
    }
    return t;
  }
  function Bd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function bR() {
    var e = xg();
    return {
      focusedElem: e,
      selectionRange: Bd(e) ? ER(e) : null
    };
  }
  function NR(e) {
    var t = xg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && gR(n)) {
      a !== null && Bd(n) && SR(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === zn && r.push({
          element: i,
          left: i.scrollLeft,
          top: i.scrollTop
        });
      typeof n.focus == "function" && n.focus();
      for (var l = 0; l < r.length; l++) {
        var s = r[l];
        s.element.scrollLeft = s.left, s.element.scrollTop = s.top;
      }
    }
  }
  function ER(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = mR(e), t || {
      start: 0,
      end: 0
    };
  }
  function SR(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : hR(e, t);
  }
  var xR = tn && "documentMode" in document && document.documentMode <= 11;
  function RR() {
    Zt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Cl = null, $d = null, Zo = null, Id = !1;
  function CR(e) {
    if ("selectionStart" in e && Bd(e))
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
  function DR(e) {
    return e.window === e ? e.document : e.nodeType === dr ? e : e.ownerDocument;
  }
  function Rg(e, t, n) {
    var a = DR(n);
    if (!(Id || Cl == null || Cl !== sr(a))) {
      var r = CR(Cl);
      if (!Zo || !Jo(Zo, r)) {
        Zo = r;
        var i = Bu($d, "onSelect");
        if (i.length > 0) {
          var l = new kd("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Cl;
        }
      }
    }
  }
  function TR(e, t, n, a, r, i, l) {
    var s = n ? _l(n) : window;
    switch (t) {
      case "focusin":
        (mg(s) || s.contentEditable === "true") && (Cl = s, $d = n, Zo = null);
        break;
      case "focusout":
        Cl = null, $d = null, Zo = null;
        break;
      case "mousedown":
        Id = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Id = !1, Rg(e, a, r);
        break;
      case "selectionchange":
        if (xR)
          break;
      case "keydown":
      case "keyup":
        Rg(e, a, r);
    }
  }
  function zu(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Dl = {
    animationend: zu("Animation", "AnimationEnd"),
    animationiteration: zu("Animation", "AnimationIteration"),
    animationstart: zu("Animation", "AnimationStart"),
    transitionend: zu("Transition", "TransitionEnd")
  }, Yd = {}, Cg = {};
  tn && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
  function Pu(e) {
    if (Yd[e])
      return Yd[e];
    if (!Dl[e])
      return e;
    var t = Dl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Cg)
        return Yd[e] = t[n];
    return e;
  }
  var Dg = Pu("animationend"), Tg = Pu("animationiteration"), jg = Pu("animationstart"), wg = Pu("transitionend"), _g = /* @__PURE__ */ new Map(), Og = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Ir(e, t) {
    _g.set(e, t), Zt(t, [e]);
  }
  function jR() {
    for (var e = 0; e < Og.length; e++) {
      var t = Og[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Ir(n, "on" + a);
    }
    Ir(Dg, "onAnimationEnd"), Ir(Tg, "onAnimationIteration"), Ir(jg, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(wg, "onTransitionEnd");
  }
  function wR(e, t, n, a, r, i, l) {
    var s = _g.get(t);
    if (s !== void 0) {
      var u = kd, v = t;
      switch (t) {
        case "keypress":
          if (Lu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = _0;
          break;
        case "focusin":
          v = "focus", u = zd;
          break;
        case "focusout":
          v = "blur", u = zd;
          break;
        case "beforeblur":
        case "afterblur":
          u = zd;
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
          u = ag;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          u = h0;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = M0;
          break;
        case Dg:
        case Tg:
        case jg:
          u = b0;
          break;
        case wg:
          u = L0;
          break;
        case "scroll":
          u = p0;
          break;
        case "wheel":
          u = U0;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = E0;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          u = ig;
          break;
      }
      var h = (i & Co) !== 0;
      {
        var C = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", x = MR(n, s, a.type, h, C);
        if (x.length > 0) {
          var M = new u(s, v, null, a, r);
          e.push({
            event: M,
            listeners: x
          });
        }
      }
    }
  }
  jR(), cR(), X0(), RR(), P0();
  function _R(e, t, n, a, r, i, l) {
    wR(e, t, n, a, r, i);
    var s = (i & DS) === 0;
    s && (fR(e, t, n, a, r), uR(e, t, n, a, r), TR(e, t, n, a, r), W0(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Ag(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, FS(a, t, void 0, e), e.currentTarget = null;
  }
  function OR(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, s = i.currentTarget, u = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Ag(e, u, s), a = l;
      }
    else
      for (var v = 0; v < t.length; v++) {
        var h = t[v], C = h.instance, x = h.currentTarget, M = h.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        Ag(e, M, x), a = C;
      }
  }
  function Mg(e, t) {
    for (var n = (t & Co) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      OR(i, l, n);
    }
    zS();
  }
  function AR(e, t, n, a, r) {
    var i = Pf(n), l = [];
    _R(l, e, a, n, i, t), Mg(l, t);
  }
  function pt(e, t) {
    qd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sD(t), r = kR(e);
    a.has(r) || (Vg(t, e, zf, n), a.add(r));
  }
  function Gd(e, t, n) {
    qd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Co), Vg(n, e, a, t);
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Hu]) {
      e[Hu] = !0, na.forEach(function(n) {
        n !== "selectionchange" && (qd.has(n) || Gd(n, !1, e), Gd(n, !0, e));
      });
      var t = e.nodeType === dr ? e : e.ownerDocument;
      t !== null && (t[Hu] || (t[Hu] = !0, Gd("selectionchange", !1, t)));
    }
  }
  function Vg(e, t, n, a, r) {
    var i = a0(e, t, n), l = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? u0(e, t, i, l) : s0(e, t, i) : l !== void 0 ? c0(e, t, i, l) : o0(e, t, i);
  }
  function Lg(e, t) {
    return e === t || e.nodeType === jt && e.parentNode === t;
  }
  function Wd(e, t, n, a, r) {
    var i = a;
    if (!(t & uh) && !(t & zf)) {
      var l = r;
      if (a !== null) {
        var s = a;
        e: for (; ; ) {
          if (s === null)
            return;
          var u = s.tag;
          if (u === D || u === L) {
            var v = s.stateNode.containerInfo;
            if (Lg(v, l))
              break;
            if (u === L)
              for (var h = s.return; h !== null; ) {
                var C = h.tag;
                if (C === D || C === L) {
                  var x = h.stateNode.containerInfo;
                  if (Lg(x, l))
                    return;
                }
                h = h.return;
              }
            for (; v !== null; ) {
              var M = Li(v);
              if (M === null)
                return;
              var F = M.tag;
              if (F === A || F === I) {
                s = i = M;
                continue e;
              }
              v = v.parentNode;
            }
          }
          s = s.return;
        }
      }
    }
    vh(function() {
      return AR(e, t, n, i);
    });
  }
  function ns(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function MR(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, s = a ? l : t, u = [], v = e, h = null; v !== null; ) {
      var C = v, x = C.stateNode, M = C.tag;
      if (M === A && x !== null && (h = x, s !== null)) {
        var F = To(v, s);
        F != null && u.push(ns(v, F, h));
      }
      if (r)
        break;
      v = v.return;
    }
    return u;
  }
  function Bu(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, s = i.tag;
      if (s === A && l !== null) {
        var u = l, v = To(r, n);
        v != null && a.unshift(ns(r, v, u));
        var h = To(r, t);
        h != null && a.push(ns(r, h, u));
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
    while (e && e.tag !== A);
    return e || null;
  }
  function VR(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Tl(i))
      r++;
    for (var l = 0, s = a; s; s = Tl(s))
      l++;
    for (; r - l > 0; )
      n = Tl(n), r--;
    for (; l - r > 0; )
      a = Tl(a), l--;
    for (var u = r; u--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Tl(n), a = Tl(a);
    }
    return null;
  }
  function kg(e, t, n, a, r) {
    for (var i = t._reactName, l = [], s = n; s !== null && s !== a; ) {
      var u = s, v = u.alternate, h = u.stateNode, C = u.tag;
      if (v !== null && v === a)
        break;
      if (C === A && h !== null) {
        var x = h;
        if (r) {
          var M = To(s, i);
          M != null && l.unshift(ns(s, M, x));
        } else if (!r) {
          var F = To(s, i);
          F != null && l.push(ns(s, F, x));
        }
      }
      s = s.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function LR(e, t, n, a, r) {
    var i = a && r ? VR(a, r) : null;
    a !== null && kg(e, t, a, i, !1), r !== null && n !== null && kg(e, n, r, i, !0);
  }
  function kR(e, t) {
    return e + "__bubble";
  }
  var Pn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", Ug = "autoFocus", Mi = "children", Vi = "style", Iu = "__html", Kd, Yu, rs, Fg, qu, zg, Pg;
  Kd = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Yu = function(e, t) {
    bS(e, t), NS(e, t), CS(e, t, {
      registrationNameDependencies: Dt,
      possibleRegistrationNames: Jt
    });
  }, zg = tn && !document.documentMode, rs = function(e, t, n) {
    if (!Pn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (Pn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Fg = function(e) {
    if (!Pn) {
      Pn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, qu = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Pg = function(e, t) {
    var n = e.namespaceURI === cr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var UR = /\r\n?/g, FR = /\u0000|\uFFFD/g;
  function Gu(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(UR, `
`).replace(FR, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (Pn || (Pn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && me))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Hg(e) {
    return e.nodeType === dr ? e : e.ownerDocument;
  }
  function zR() {
  }
  function Ku(e) {
    e.onclick = zR;
  }
  function PR(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Vi)
          l && Object.freeze(l), ah(t, l);
        else if (i === as) {
          var s = l ? l[Iu] : void 0;
          s != null && Jv(t, s);
        } else if (i === Mi)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && yu(t, l);
          } else typeof l == "number" && yu(t, "" + l);
        else i === $u || i === Yr || i === Ug || (Dt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && pt("scroll", t)) : l != null && Na(t, i, l, r));
      }
  }
  function HR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Vi ? ah(e, l) : i === as ? Jv(e, l) : i === Mi ? yu(e, l) : Na(e, i, l, a);
    }
  }
  function BR(e, t, n, a) {
    var r, i = Hg(n), l, s = a;
    if (s === cr && (s = Mf(e)), s === cr) {
      if (r = Si(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var u = i.createElement("div");
        u.innerHTML = "<script><\/script>";
        var v = u.firstChild;
        l = u.removeChild(v);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var h = l;
        t.multiple ? h.multiple = !0 : t.size && (h.size = t.size);
      }
    } else
      l = i.createElementNS(s, e);
    return s === cr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !kn.call(Kd, e) && (Kd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function $R(e, t) {
    return Hg(t).createTextNode(e);
  }
  function IR(e, t, n, a) {
    var r = Si(t, n);
    Yu(t, n);
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
        for (var l = 0; l < es.length; l++)
          pt(es[l], e);
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
        vu(e, n), i = No(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n), i = n;
        break;
      case "select":
        xo(e, n), i = So(e, n), pt("invalid", e);
        break;
      case "textarea":
        Kv(e, n), i = Of(e, n), pt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Ff(t, i), PR(t, e, a, i, r), t) {
      case "input":
        Ni(e), U(e, n, !1);
        break;
      case "textarea":
        Ni(e), Xv(e);
        break;
      case "option":
        ot(e, n);
        break;
      case "select":
        wf(e, n);
        break;
      default:
        typeof i.onClick == "function" && Ku(e);
        break;
    }
  }
  function YR(e, t, n, a, r) {
    Yu(t, a);
    var i = null, l, s;
    switch (t) {
      case "input":
        l = No(e, n), s = No(e, a), i = [];
        break;
      case "select":
        l = So(e, n), s = So(e, a), i = [];
        break;
      case "textarea":
        l = Of(e, n), s = Of(e, a), i = [];
        break;
      default:
        l = n, s = a, typeof l.onClick != "function" && typeof s.onClick == "function" && Ku(e);
        break;
    }
    Ff(t, s);
    var u, v, h = null;
    for (u in l)
      if (!(s.hasOwnProperty(u) || !l.hasOwnProperty(u) || l[u] == null))
        if (u === Vi) {
          var C = l[u];
          for (v in C)
            C.hasOwnProperty(v) && (h || (h = {}), h[v] = "");
        } else u === as || u === Mi || u === $u || u === Yr || u === Ug || (Dt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in s) {
      var x = s[u], M = l != null ? l[u] : void 0;
      if (!(!s.hasOwnProperty(u) || x === M || x == null && M == null))
        if (u === Vi)
          if (x && Object.freeze(x), M) {
            for (v in M)
              M.hasOwnProperty(v) && (!x || !x.hasOwnProperty(v)) && (h || (h = {}), h[v] = "");
            for (v in x)
              x.hasOwnProperty(v) && M[v] !== x[v] && (h || (h = {}), h[v] = x[v]);
          } else
            h || (i || (i = []), i.push(u, h)), h = x;
        else if (u === as) {
          var F = x ? x[Iu] : void 0, H = M ? M[Iu] : void 0;
          F != null && H !== F && (i = i || []).push(u, F);
        } else u === Mi ? (typeof x == "string" || typeof x == "number") && (i = i || []).push(u, "" + x) : u === $u || u === Yr || (Dt.hasOwnProperty(u) ? (x != null && (typeof x != "function" && qu(u, x), u === "onScroll" && pt("scroll", e)), !i && M !== x && (i = [])) : (i = i || []).push(u, x));
    }
    return h && (fS(h, s[Vi]), (i = i || []).push(Vi, h)), i;
  }
  function qR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && d(e, r);
    var i = Si(n, a), l = Si(n, r);
    switch (HR(e, t, i, l), n) {
      case "input":
        b(e, r);
        break;
      case "textarea":
        Qv(e, r);
        break;
      case "select":
        hu(e, r);
        break;
    }
  }
  function GR(e) {
    {
      var t = e.toLowerCase();
      return bu.hasOwnProperty(t) && bu[t] || null;
    }
  }
  function WR(e, t, n, a, r, i, l) {
    var s, u;
    switch (s = Si(t, n), Yu(t, n), t) {
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
        for (var v = 0; v < es.length; v++)
          pt(es[v], e);
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
        vu(e, n), pt("invalid", e);
        break;
      case "option":
        tt(e, n);
        break;
      case "select":
        xo(e, n), pt("invalid", e);
        break;
      case "textarea":
        Kv(e, n), pt("invalid", e);
        break;
    }
    Ff(t, n);
    {
      u = /* @__PURE__ */ new Set();
      for (var h = e.attributes, C = 0; C < h.length; C++) {
        var x = h[C].name.toLowerCase();
        switch (x) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            u.add(h[C].name);
        }
      }
    }
    var M = null;
    for (var F in n)
      if (n.hasOwnProperty(F)) {
        var H = n[F];
        if (F === Mi)
          typeof H == "string" ? e.textContent !== H && (n[Yr] !== !0 && Wu(e.textContent, H, i, l), M = [Mi, H]) : typeof H == "number" && e.textContent !== "" + H && (n[Yr] !== !0 && Wu(e.textContent, H, i, l), M = [Mi, "" + H]);
        else if (Dt.hasOwnProperty(F))
          H != null && (typeof H != "function" && qu(F, H), F === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof s == "boolean") {
          var se = void 0, Se = Nt(F);
          if (n[Yr] !== !0) {
            if (!(F === $u || F === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            F === "value" || F === "checked" || F === "selected")) {
              if (F === as) {
                var be = e.innerHTML, qe = H ? H[Iu] : void 0;
                if (qe != null) {
                  var He = Pg(e, qe);
                  He !== be && rs(F, be, He);
                }
              } else if (F === Vi) {
                if (u.delete(F), zg) {
                  var j = uS(H);
                  se = e.getAttribute("style"), j !== se && rs(F, se, j);
                }
              } else if (s && !xn)
                u.delete(F.toLowerCase()), se = di(e, F, H), H !== se && rs(F, se, H);
              else if (!gt(F, Se, s) && !vn(F, H, Se, s)) {
                var B = !1;
                if (Se !== null)
                  u.delete(Se.attributeName), se = Zi(e, F, H, Se);
                else {
                  var w = a;
                  if (w === cr && (w = Mf(t)), w === cr)
                    u.delete(F.toLowerCase());
                  else {
                    var Q = GR(F);
                    Q !== null && Q !== F && (B = !0, u.delete(Q)), u.delete(F);
                  }
                  se = di(e, F, H);
                }
                var ve = xn;
                !ve && H !== se && !B && rs(F, se, H);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Yr] !== !0 && Fg(u), t) {
      case "input":
        Ni(e), U(e, n, !0);
        break;
      case "textarea":
        Ni(e), Xv(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Ku(e);
        break;
    }
    return M;
  }
  function KR(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Qd(e, t) {
    {
      if (Pn)
        return;
      Pn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t) {
    {
      if (Pn)
        return;
      Pn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Jd(e, t, n) {
    {
      if (Pn)
        return;
      Pn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Zd(e, t) {
    {
      if (t === "" || Pn)
        return;
      Pn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function QR(e, t, n) {
    switch (t) {
      case "input":
        P(e, n);
        return;
      case "textarea":
        IE(e, n);
        return;
      case "select":
        _f(e, n);
        return;
    }
  }
  var is = function() {
  }, ls = function() {
  };
  {
    var XR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Bg = [
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
    ], JR = Bg.concat(["button"]), ZR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], $g = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    ls = function(e, t) {
      var n = ze({}, e || $g), a = {
        tag: t
      };
      return Bg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), JR.indexOf(t) !== -1 && (n.pTagInButtonScope = null), XR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var eC = function(e, t) {
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
          return ZR.indexOf(t) === -1;
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
    }, tC = function(e, t) {
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
    }, Ig = {};
    is = function(e, t, n) {
      n = n || $g;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = eC(e, r) ? null : a, l = i ? null : tC(e, n), s = i || l;
      if (s) {
        var u = s.tag, v = !!i + "|" + e + "|" + u;
        if (!Ig[v]) {
          Ig[v] = !0;
          var h = e, C = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", C = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var x = "";
            u === "table" && e === "tr" && (x += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, u, C, x);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", h, u);
        }
      }
    };
  }
  var Qu = "suppressHydrationWarning", Xu = "$", Ju = "/$", os = "$?", ss = "$!", nC = "style", ep = null, tp = null;
  function aC(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case dr:
      case Lf: {
        t = a === dr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Vf(null, "");
        break;
      }
      default: {
        var i = a === jt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Vf(l, t);
        break;
      }
    }
    {
      var s = t.toLowerCase(), u = ls(null, s);
      return {
        namespace: n,
        ancestorInfo: u
      };
    }
  }
  function rC(e, t, n) {
    {
      var a = e, r = Vf(a.namespace, t), i = ls(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function eO(e) {
    return e;
  }
  function iC(e) {
    ep = n0(), tp = bR();
    var t = null;
    return Jh(!1), t;
  }
  function lC(e) {
    NR(tp), Jh(ep), ep = null, tp = null;
  }
  function oC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (is(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var s = "" + t.children, u = ls(l.ancestorInfo, e);
        is(null, s, u);
      }
      i = l.namespace;
    }
    var v = BR(e, t, n, i);
    return fs(r, v), up(v, t), v;
  }
  function sC(e, t) {
    e.appendChild(t);
  }
  function uC(e, t, n, a, r) {
    switch (IR(e, t, n, a), t) {
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
  function cC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var s = "" + a.children, u = ls(l.ancestorInfo, t);
        is(null, s, u);
      }
    }
    return YR(e, t, n, a);
  }
  function np(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function fC(e, t, n, a) {
    {
      var r = n;
      is(null, e, r.ancestorInfo);
    }
    var i = $R(e, t);
    return fs(a, i), i;
  }
  function dC() {
    var e = window.event;
    return e === void 0 ? yr : Zh(e.type);
  }
  var ap = typeof setTimeout == "function" ? setTimeout : void 0, pC = typeof clearTimeout == "function" ? clearTimeout : void 0, rp = -1, Yg = typeof Promise == "function" ? Promise : void 0, mC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yg < "u" ? function(e) {
    return Yg.resolve(null).then(e).catch(vC);
  } : ap;
  function vC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function hC(e, t, n, a) {
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
  function gC(e, t, n, a, r, i) {
    qR(e, t, n, a, r), up(e, r);
  }
  function qg(e) {
    yu(e, "");
  }
  function yC(e, t, n) {
    e.nodeValue = n;
  }
  function bC(e, t) {
    e.appendChild(t);
  }
  function NC(e, t) {
    var n;
    e.nodeType === jt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function EC(e, t, n) {
    e.insertBefore(t, n);
  }
  function SC(e, t, n) {
    e.nodeType === jt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function xC(e, t) {
    e.removeChild(t);
  }
  function RC(e, t) {
    e.nodeType === jt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ip(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === jt) {
        var i = r.data;
        if (i === Ju)
          if (a === 0) {
            e.removeChild(r), Io(t);
            return;
          } else
            a--;
        else (i === Xu || i === os || i === ss) && a++;
      }
      n = r;
    } while (n);
    Io(t);
  }
  function CC(e, t) {
    e.nodeType === jt ? ip(e.parentNode, t) : e.nodeType === zn && ip(e, t), Io(e);
  }
  function DC(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function TC(e) {
    e.nodeValue = "";
  }
  function jC(e, t) {
    e = e;
    var n = t[nC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = kf("display", a);
  }
  function wC(e, t) {
    e.nodeValue = t;
  }
  function _C(e) {
    e.nodeType === zn ? e.textContent = "" : e.nodeType === dr && e.documentElement && e.removeChild(e.documentElement);
  }
  function OC(e, t, n) {
    return e.nodeType !== zn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function AC(e, t) {
    return t === "" || e.nodeType !== fr ? null : e;
  }
  function MC(e) {
    return e.nodeType !== jt ? null : e;
  }
  function Gg(e) {
    return e.data === os;
  }
  function lp(e) {
    return e.data === ss;
  }
  function VC(e) {
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
  function Zu(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === zn || t === fr)
        break;
      if (t === jt) {
        var n = e.data;
        if (n === Xu || n === ss || n === os)
          break;
        if (n === Ju)
          return null;
      }
    }
    return e;
  }
  function us(e) {
    return Zu(e.nextSibling);
  }
  function kC(e) {
    return Zu(e.firstChild);
  }
  function UC(e) {
    return Zu(e.firstChild);
  }
  function FC(e) {
    return Zu(e.nextSibling);
  }
  function zC(e, t, n, a, r, i, l) {
    fs(i, e), up(e, n);
    var s;
    {
      var u = r;
      s = u.namespace;
    }
    var v = (i.mode & Ie) !== Re;
    return WR(e, t, n, s, a, v, l);
  }
  function PC(e, t, n, a) {
    return fs(n, e), n.mode & Ie, KR(e, t);
  }
  function HC(e, t) {
    fs(t, e);
  }
  function BC(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Ju) {
          if (n === 0)
            return us(t);
          n--;
        } else (a === Xu || a === ss || a === os) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Wg(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === jt) {
        var a = t.data;
        if (a === Xu || a === ss || a === os) {
          if (n === 0)
            return t;
          n--;
        } else a === Ju && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function $C(e) {
    Io(e);
  }
  function IC(e) {
    Io(e);
  }
  function YC(e) {
    return e !== "head" && e !== "body";
  }
  function qC(e, t, n, a) {
    var r = !0;
    Wu(t.nodeValue, n, a, r);
  }
  function GC(e, t, n, a, r, i) {
    if (t[Qu] !== !0) {
      var l = !0;
      Wu(a.nodeValue, r, i, l);
    }
  }
  function WC(e, t) {
    t.nodeType === zn ? Qd(e, t) : t.nodeType === jt || Xd(e, t);
  }
  function KC(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === zn ? Qd(n, t) : t.nodeType === jt || Xd(n, t));
    }
  }
  function QC(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === zn ? Qd(n, a) : a.nodeType === jt || Xd(n, a));
  }
  function XC(e, t, n) {
    Jd(e, t);
  }
  function JC(e, t) {
    Zd(e, t);
  }
  function ZC(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Jd(a, t);
    }
  }
  function eD(e, t) {
    {
      var n = e.parentNode;
      n !== null && Zd(n, t);
    }
  }
  function tD(e, t, n, a, r, i) {
    (i || t[Qu] !== !0) && Jd(n, a);
  }
  function nD(e, t, n, a, r) {
    (r || t[Qu] !== !0) && Zd(n, a);
  }
  function aD(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function rD(e) {
    ts(e);
  }
  var jl = Math.random().toString(36).slice(2), wl = "__reactFiber$" + jl, op = "__reactProps$" + jl, cs = "__reactContainer$" + jl, sp = "__reactEvents$" + jl, iD = "__reactListeners$" + jl, lD = "__reactHandles$" + jl;
  function oD(e) {
    delete e[wl], delete e[op], delete e[sp], delete e[iD], delete e[lD];
  }
  function fs(e, t) {
    t[wl] = e;
  }
  function ec(e, t) {
    t[cs] = e;
  }
  function Kg(e) {
    e[cs] = null;
  }
  function ds(e) {
    return !!e[cs];
  }
  function Li(e) {
    var t = e[wl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[cs] || n[wl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = Wg(e); r !== null; ) {
            var i = r[wl];
            if (i)
              return i;
            r = Wg(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function qr(e) {
    var t = e[wl] || e[cs];
    return t && (t.tag === A || t.tag === I || t.tag === X || t.tag === D) ? t : null;
  }
  function _l(e) {
    if (e.tag === A || e.tag === I)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function tc(e) {
    return e[op] || null;
  }
  function up(e, t) {
    e[op] = t;
  }
  function sD(e) {
    var t = e[sp];
    return t === void 0 && (t = e[sp] = /* @__PURE__ */ new Set()), t;
  }
  var Qg = {}, Xg = m.ReactDebugCurrentFrame;
  function nc(e) {
    if (e) {
      var t = e._owner, n = mo(e.type, e._source, t ? t.type : null);
      Xg.setExtraStackFrame(n);
    } else
      Xg.setExtraStackFrame(null);
  }
  function Da(e, t, n, a, r) {
    {
      var i = Function.call.bind(kn);
      for (var l in e)
        if (i(e, l)) {
          var s = void 0;
          try {
            if (typeof e[l] != "function") {
              var u = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw u.name = "Invariant Violation", u;
            }
            s = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (v) {
            s = v;
          }
          s && !(s instanceof Error) && (nc(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof s), nc(null)), s instanceof Error && !(s.message in Qg) && (Qg[s.message] = !0, nc(r), f("Failed %s type: %s", n, s.message), nc(null));
        }
    }
  }
  var cp = [], ac;
  ac = [];
  var br = -1;
  function Gr(e) {
    return {
      current: e
    };
  }
  function yn(e, t) {
    if (br < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ac[br] && f("Unexpected Fiber popped."), e.current = cp[br], cp[br] = null, ac[br] = null, br--;
  }
  function bn(e, t, n) {
    br++, cp[br] = e.current, ac[br] = n, e.current = t;
  }
  var fp;
  fp = {};
  var Jn = {};
  Object.freeze(Jn);
  var Nr = Gr(Jn), Ga = Gr(!1), dp = Jn;
  function Ol(e, t, n) {
    return n && Wa(t) ? dp : Nr.current;
  }
  function Jg(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Al(e, t) {
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
        var s = Le(e) || "Unknown";
        Da(a, i, "context", s);
      }
      return r && Jg(e, t, i), i;
    }
  }
  function rc() {
    return Ga.current;
  }
  function Wa(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function ic(e) {
    yn(Ga, e), yn(Nr, e);
  }
  function pp(e) {
    yn(Ga, e), yn(Nr, e);
  }
  function Zg(e, t, n) {
    {
      if (Nr.current !== Jn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      bn(Nr, t, e), bn(Ga, n, e);
    }
  }
  function ey(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Le(e) || "Unknown";
          fp[i] || (fp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var s in l)
        if (!(s in r))
          throw new Error((Le(e) || "Unknown") + '.getChildContext(): key "' + s + '" is not defined in childContextTypes.');
      {
        var u = Le(e) || "Unknown";
        Da(r, l, "child context", u);
      }
      return ze({}, n, l);
    }
  }
  function lc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Jn;
      return dp = Nr.current, bn(Nr, n, e), bn(Ga, Ga.current, e), !0;
    }
  }
  function ty(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = ey(e, t, dp);
        a.__reactInternalMemoizedMergedChildContext = r, yn(Ga, e), yn(Nr, e), bn(Nr, r, e), bn(Ga, n, e);
      } else
        yn(Ga, e), bn(Ga, n, e);
    }
  }
  function uD(e) {
    {
      if (!YS(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case D:
            return t.stateNode.context;
          case T: {
            var n = t.type;
            if (Wa(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Wr = 0, oc = 1, Er = null, mp = !1, vp = !1;
  function ny(e) {
    Er === null ? Er = [e] : Er.push(e);
  }
  function cD(e) {
    mp = !0, ny(e);
  }
  function ay() {
    mp && Kr();
  }
  function Kr() {
    if (!vp && Er !== null) {
      vp = !0;
      var e = 0, t = Ca();
      try {
        var n = !0, a = Er;
        for (Kt(Kn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, mp = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), Th(xu, Kr), i;
      } finally {
        Kt(t), vp = !1;
      }
    }
    return null;
  }
  var Ml = [], Vl = 0, sc = null, uc = 0, oa = [], sa = 0, ki = null, Sr = 1, xr = "";
  function fD(e) {
    return Fi(), (e.flags & bh) !== Te;
  }
  function dD(e) {
    return Fi(), uc;
  }
  function pD() {
    var e = xr, t = Sr, n = t & ~mD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Ml[Vl++] = uc, Ml[Vl++] = sc, sc = e, uc = t;
  }
  function ry(e, t, n) {
    Fi(), oa[sa++] = Sr, oa[sa++] = xr, oa[sa++] = ki, ki = e;
    var a = Sr, r = xr, i = cc(a) - 1, l = a & ~(1 << i), s = n + 1, u = cc(t) + i;
    if (u > 30) {
      var v = i - i % 5, h = (1 << v) - 1, C = (l & h).toString(32), x = l >> v, M = i - v, F = cc(t) + M, H = s << M, se = H | x, Se = C + r;
      Sr = 1 << F | se, xr = Se;
    } else {
      var be = s << i, qe = be | l, He = r;
      Sr = 1 << u | qe, xr = He;
    }
  }
  function hp(e) {
    Fi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ui(e, n), ry(e, n, a);
    }
  }
  function cc(e) {
    return 32 - Mh(e);
  }
  function mD(e) {
    return 1 << cc(e) - 1;
  }
  function gp(e) {
    for (; e === sc; )
      sc = Ml[--Vl], Ml[Vl] = null, uc = Ml[--Vl], Ml[Vl] = null;
    for (; e === ki; )
      ki = oa[--sa], oa[sa] = null, xr = oa[--sa], oa[sa] = null, Sr = oa[--sa], oa[sa] = null;
  }
  function vD() {
    return Fi(), ki !== null ? {
      id: Sr,
      overflow: xr
    } : null;
  }
  function hD(e, t) {
    Fi(), oa[sa++] = Sr, oa[sa++] = xr, oa[sa++] = ki, Sr = t.id, xr = t.overflow, ki = e;
  }
  function Fi() {
    rn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var an = null, ua = null, Ta = !1, zi = !1, Qr = null;
  function gD() {
    Ta && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function iy() {
    zi = !0;
  }
  function yD() {
    return zi;
  }
  function bD(e) {
    var t = e.stateNode.containerInfo;
    return ua = UC(t), an = e, Ta = !0, Qr = null, zi = !1, !0;
  }
  function ND(e, t, n) {
    return ua = FC(t), an = e, Ta = !0, Qr = null, zi = !1, n !== null && hD(e, n), !0;
  }
  function ly(e, t) {
    switch (e.tag) {
      case D: {
        WC(e.stateNode.containerInfo, t);
        break;
      }
      case A: {
        var n = (e.mode & Ie) !== Re;
        QC(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case X: {
        var a = e.memoizedState;
        a.dehydrated !== null && KC(a.dehydrated, t);
        break;
      }
    }
  }
  function oy(e, t) {
    ly(e, t);
    var n = R1();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= xi) : a.push(n);
  }
  function yp(e, t) {
    {
      if (zi)
        return;
      switch (e.tag) {
        case D: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case A:
              var a = t.type;
              t.pendingProps, XC(n, a);
              break;
            case I:
              var r = t.pendingProps;
              JC(n, r);
              break;
          }
          break;
        }
        case A: {
          var i = e.type, l = e.memoizedProps, s = e.stateNode;
          switch (t.tag) {
            case A: {
              var u = t.type, v = t.pendingProps, h = (e.mode & Ie) !== Re;
              tD(
                i,
                l,
                s,
                u,
                v,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case I: {
              var C = t.pendingProps, x = (e.mode & Ie) !== Re;
              nD(
                i,
                l,
                s,
                C,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
          }
          break;
        }
        case X: {
          var M = e.memoizedState, F = M.dehydrated;
          if (F !== null) switch (t.tag) {
            case A:
              var H = t.type;
              t.pendingProps, ZC(F, H);
              break;
            case I:
              var se = t.pendingProps;
              eD(F, se);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function sy(e, t) {
    t.flags = t.flags & ~mr | wt, yp(e, t);
  }
  function uy(e, t) {
    switch (e.tag) {
      case A: {
        var n = e.type;
        e.pendingProps;
        var a = OC(t, n);
        return a !== null ? (e.stateNode = a, an = e, ua = kC(a), !0) : !1;
      }
      case I: {
        var r = e.pendingProps, i = AC(t, r);
        return i !== null ? (e.stateNode = i, an = e, ua = null, !0) : !1;
      }
      case X: {
        var l = MC(t);
        if (l !== null) {
          var s = {
            dehydrated: l,
            treeContext: vD(),
            retryLane: Gn
          };
          e.memoizedState = s;
          var u = C1(l);
          return u.return = e, e.child = u, an = e, ua = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function bp(e) {
    return (e.mode & Ie) !== Re && (e.flags & Je) === Te;
  }
  function Np(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Ep(e) {
    if (Ta) {
      var t = ua;
      if (!t) {
        bp(e) && (yp(an, e), Np()), sy(an, e), Ta = !1, an = e;
        return;
      }
      var n = t;
      if (!uy(e, t)) {
        bp(e) && (yp(an, e), Np()), t = us(n);
        var a = an;
        if (!t || !uy(e, t)) {
          sy(an, e), Ta = !1, an = e;
          return;
        }
        oy(a, n);
      }
    }
  }
  function ED(e, t, n) {
    var a = e.stateNode, r = !zi, i = zC(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function SD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = PC(t, n, e);
    if (a) {
      var r = an;
      if (r !== null)
        switch (r.tag) {
          case D: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ie) !== Re;
            qC(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case A: {
            var s = r.type, u = r.memoizedProps, v = r.stateNode, h = (r.mode & Ie) !== Re;
            GC(
              s,
              u,
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
  function xD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    HC(n, e);
  }
  function RD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return BC(n);
  }
  function cy(e) {
    for (var t = e.return; t !== null && t.tag !== A && t.tag !== D && t.tag !== X; )
      t = t.return;
    an = t;
  }
  function fc(e) {
    if (e !== an)
      return !1;
    if (!Ta)
      return cy(e), Ta = !0, !1;
    if (e.tag !== D && (e.tag !== A || YC(e.type) && !np(e.type, e.memoizedProps))) {
      var t = ua;
      if (t)
        if (bp(e))
          fy(e), Np();
        else
          for (; t; )
            oy(e, t), t = us(t);
    }
    return cy(e), e.tag === X ? ua = RD(e) : ua = an ? us(e.stateNode) : null, !0;
  }
  function CD() {
    return Ta && ua !== null;
  }
  function fy(e) {
    for (var t = ua; t; )
      ly(e, t), t = us(t);
  }
  function Ll() {
    an = null, ua = null, Ta = !1, zi = !1;
  }
  function dy() {
    Qr !== null && (iN(Qr), Qr = null);
  }
  function rn() {
    return Ta;
  }
  function Sp(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var DD = m.ReactCurrentBatchConfig, TD = null;
  function jD() {
    return DD.transition;
  }
  var ja = {
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
    var wD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & St && (t = n), n = n.return;
      return t;
    }, Pi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ps = [], ms = [], vs = [], hs = [], gs = [], ys = [], Hi = /* @__PURE__ */ new Set();
    ja.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & St && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && vs.push(e), e.mode & St && typeof t.UNSAFE_componentWillReceiveProps == "function" && hs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & St && typeof t.UNSAFE_componentWillUpdate == "function" && ys.push(e));
    }, ja.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(x) {
        e.add(Le(x) || "Component"), Hi.add(x.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(x) {
        t.add(Le(x) || "Component"), Hi.add(x.type);
      }), ms = []);
      var n = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(x) {
        n.add(Le(x) || "Component"), Hi.add(x.type);
      }), vs = []);
      var a = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(x) {
        a.add(Le(x) || "Component"), Hi.add(x.type);
      }), hs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(x) {
        r.add(Le(x) || "Component"), Hi.add(x.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (ys.length > 0 && (ys.forEach(function(x) {
        i.add(Le(x) || "Component"), Hi.add(x.type);
      }), ys = []), t.size > 0) {
        var l = Pi(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var s = Pi(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, s);
      }
      if (i.size > 0) {
        var u = Pi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, u);
      }
      if (e.size > 0) {
        var v = Pi(e);
        S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (n.size > 0) {
        var h = Pi(n);
        S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var C = Pi(r);
        S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, C);
      }
    };
    var dc = /* @__PURE__ */ new Map(), py = /* @__PURE__ */ new Set();
    ja.recordLegacyContextWarning = function(e, t) {
      var n = wD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!py.has(e.type)) {
        var a = dc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], dc.set(n, a)), a.push(e));
      }
    }, ja.flushLegacyContextWarning = function() {
      dc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Le(i) || "Component"), py.add(i.type);
          });
          var r = Pi(a);
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
    }, ja.discardPendingWarnings = function() {
      ps = [], ms = [], vs = [], hs = [], gs = [], ys = [], dc = /* @__PURE__ */ new Map();
    };
  }
  var xp, Rp, Cp, Dp, Tp, my = function(e, t) {
  };
  xp = !1, Rp = !1, Cp = {}, Dp = {}, Tp = {}, my = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Le(t) || "Component";
      Dp[n] || (Dp[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function _D(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function bs(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & St || Ct) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !_D(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Le(e) || "Component";
        Cp[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Cp[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var s = i;
          if (s.tag !== T)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = s.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var u = l;
        rr(a, "ref");
        var v = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === v)
          return t.ref;
        var h = function(C) {
          var x = u.refs;
          C === null ? delete x[v] : x[v] = C;
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
  function pc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function mc(e) {
    {
      var t = Le(e) || "Component";
      if (Tp[t])
        return;
      Tp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function vy(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function hy(e) {
    function t(j, B) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [B], j.flags |= xi) : w.push(B);
      }
    }
    function n(j, B) {
      if (!e)
        return null;
      for (var w = B; w !== null; )
        t(j, w), w = w.sibling;
      return null;
    }
    function a(j, B) {
      for (var w = /* @__PURE__ */ new Map(), Q = B; Q !== null; )
        Q.key !== null ? w.set(Q.key, Q) : w.set(Q.index, Q), Q = Q.sibling;
      return w;
    }
    function r(j, B) {
      var w = Qi(j, B);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, B, w) {
      if (j.index = w, !e)
        return j.flags |= bh, B;
      var Q = j.alternate;
      if (Q !== null) {
        var ve = Q.index;
        return ve < B ? (j.flags |= wt, B) : ve;
      } else
        return j.flags |= wt, B;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= wt), j;
    }
    function s(j, B, w, Q) {
      if (B === null || B.tag !== I) {
        var ve = Sv(w, j.mode, Q);
        return ve.return = j, ve;
      } else {
        var ue = r(B, w);
        return ue.return = j, ue;
      }
    }
    function u(j, B, w, Q) {
      var ve = w.type;
      if (ve === Ha)
        return h(j, B, w.props.children, Q, w.key);
      if (B !== null && (B.elementType === ve || // Keep this check inline so it only runs on the false path:
      EN(B, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ve == "object" && ve !== null && ve.$$typeof === xe && vy(ve) === B.type)) {
        var ue = r(B, w.props);
        return ue.ref = bs(j, B, w), ue.return = j, ue._debugSource = w._source, ue._debugOwner = w._owner, ue;
      }
      var je = Ev(w, j.mode, Q);
      return je.ref = bs(j, B, w), je.return = j, je;
    }
    function v(j, B, w, Q) {
      if (B === null || B.tag !== L || B.stateNode.containerInfo !== w.containerInfo || B.stateNode.implementation !== w.implementation) {
        var ve = xv(w, j.mode, Q);
        return ve.return = j, ve;
      } else {
        var ue = r(B, w.children || []);
        return ue.return = j, ue;
      }
    }
    function h(j, B, w, Q, ve) {
      if (B === null || B.tag !== ie) {
        var ue = oi(w, j.mode, Q, ve);
        return ue.return = j, ue;
      } else {
        var je = r(B, w);
        return je.return = j, je;
      }
    }
    function C(j, B, w) {
      if (typeof B == "string" && B !== "" || typeof B == "number") {
        var Q = Sv("" + B, j.mode, w);
        return Q.return = j, Q;
      }
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case ia: {
            var ve = Ev(B, j.mode, w);
            return ve.ref = bs(j, null, B), ve.return = j, ve;
          }
          case qn: {
            var ue = xv(B, j.mode, w);
            return ue.return = j, ue;
          }
          case xe: {
            var je = B._payload, Me = B._init;
            return C(j, Me(je), w);
          }
        }
        if (Pe(B) || Sa(B)) {
          var rt = oi(B, j.mode, w, null);
          return rt.return = j, rt;
        }
        pc(j, B);
      }
      return typeof B == "function" && mc(j), null;
    }
    function x(j, B, w, Q) {
      var ve = B !== null ? B.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return ve !== null ? null : s(j, B, "" + w, Q);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return w.key === ve ? u(j, B, w, Q) : null;
          case qn:
            return w.key === ve ? v(j, B, w, Q) : null;
          case xe: {
            var ue = w._payload, je = w._init;
            return x(j, B, je(ue), Q);
          }
        }
        if (Pe(w) || Sa(w))
          return ve !== null ? null : h(j, B, w, Q, null);
        pc(j, w);
      }
      return typeof w == "function" && mc(j), null;
    }
    function M(j, B, w, Q, ve) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") {
        var ue = j.get(w) || null;
        return s(B, ue, "" + Q, ve);
      }
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case ia: {
            var je = j.get(Q.key === null ? w : Q.key) || null;
            return u(B, je, Q, ve);
          }
          case qn: {
            var Me = j.get(Q.key === null ? w : Q.key) || null;
            return v(B, Me, Q, ve);
          }
          case xe:
            var rt = Q._payload, We = Q._init;
            return M(j, B, w, We(rt), ve);
        }
        if (Pe(Q) || Sa(Q)) {
          var Rt = j.get(w) || null;
          return h(B, Rt, Q, ve, null);
        }
        pc(B, Q);
      }
      return typeof Q == "function" && mc(B), null;
    }
    function F(j, B, w) {
      {
        if (typeof j != "object" || j === null)
          return B;
        switch (j.$$typeof) {
          case ia:
          case qn:
            my(j, w);
            var Q = j.key;
            if (typeof Q != "string")
              break;
            if (B === null) {
              B = /* @__PURE__ */ new Set(), B.add(Q);
              break;
            }
            if (!B.has(Q)) {
              B.add(Q);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Q);
            break;
          case xe:
            var ve = j._payload, ue = j._init;
            F(ue(ve), B, w);
            break;
        }
      }
      return B;
    }
    function H(j, B, w, Q) {
      for (var ve = null, ue = 0; ue < w.length; ue++) {
        var je = w[ue];
        ve = F(je, ve, j);
      }
      for (var Me = null, rt = null, We = B, Rt = 0, Ke = 0, xt = null; We !== null && Ke < w.length; Ke++) {
        We.index > Ke ? (xt = We, We = null) : xt = We.sibling;
        var En = x(j, We, w[Ke], Q);
        if (En === null) {
          We === null && (We = xt);
          break;
        }
        e && We && En.alternate === null && t(j, We), Rt = i(En, Rt, Ke), rt === null ? Me = En : rt.sibling = En, rt = En, We = xt;
      }
      if (Ke === w.length) {
        if (n(j, We), rn()) {
          var dn = Ke;
          Ui(j, dn);
        }
        return Me;
      }
      if (We === null) {
        for (; Ke < w.length; Ke++) {
          var ea = C(j, w[Ke], Q);
          ea !== null && (Rt = i(ea, Rt, Ke), rt === null ? Me = ea : rt.sibling = ea, rt = ea);
        }
        if (rn()) {
          var Vn = Ke;
          Ui(j, Vn);
        }
        return Me;
      }
      for (var Ln = a(j, We); Ke < w.length; Ke++) {
        var Sn = M(Ln, j, Ke, w[Ke], Q);
        Sn !== null && (e && Sn.alternate !== null && Ln.delete(Sn.key === null ? Ke : Sn.key), Rt = i(Sn, Rt, Ke), rt === null ? Me = Sn : rt.sibling = Sn, rt = Sn);
      }
      if (e && Ln.forEach(function(eo) {
        return t(j, eo);
      }), rn()) {
        var _r = Ke;
        Ui(j, _r);
      }
      return Me;
    }
    function se(j, B, w, Q) {
      var ve = Sa(w);
      if (typeof ve != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (Rp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), w.entries === ve && (xp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), xp = !0);
        var ue = ve.call(w);
        if (ue)
          for (var je = null, Me = ue.next(); !Me.done; Me = ue.next()) {
            var rt = Me.value;
            je = F(rt, je, j);
          }
      }
      var We = ve.call(w);
      if (We == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, Ke = null, xt = B, En = 0, dn = 0, ea = null, Vn = We.next(); xt !== null && !Vn.done; dn++, Vn = We.next()) {
        xt.index > dn ? (ea = xt, xt = null) : ea = xt.sibling;
        var Ln = x(j, xt, Vn.value, Q);
        if (Ln === null) {
          xt === null && (xt = ea);
          break;
        }
        e && xt && Ln.alternate === null && t(j, xt), En = i(Ln, En, dn), Ke === null ? Rt = Ln : Ke.sibling = Ln, Ke = Ln, xt = ea;
      }
      if (Vn.done) {
        if (n(j, xt), rn()) {
          var Sn = dn;
          Ui(j, Sn);
        }
        return Rt;
      }
      if (xt === null) {
        for (; !Vn.done; dn++, Vn = We.next()) {
          var _r = C(j, Vn.value, Q);
          _r !== null && (En = i(_r, En, dn), Ke === null ? Rt = _r : Ke.sibling = _r, Ke = _r);
        }
        if (rn()) {
          var eo = dn;
          Ui(j, eo);
        }
        return Rt;
      }
      for (var Xs = a(j, xt); !Vn.done; dn++, Vn = We.next()) {
        var nr = M(Xs, j, dn, Vn.value, Q);
        nr !== null && (e && nr.alternate !== null && Xs.delete(nr.key === null ? dn : nr.key), En = i(nr, En, dn), Ke === null ? Rt = nr : Ke.sibling = nr, Ke = nr);
      }
      if (e && Xs.forEach(function(nw) {
        return t(j, nw);
      }), rn()) {
        var tw = dn;
        Ui(j, tw);
      }
      return Rt;
    }
    function Se(j, B, w, Q) {
      if (B !== null && B.tag === I) {
        n(j, B.sibling);
        var ve = r(B, w);
        return ve.return = j, ve;
      }
      n(j, B);
      var ue = Sv(w, j.mode, Q);
      return ue.return = j, ue;
    }
    function be(j, B, w, Q) {
      for (var ve = w.key, ue = B; ue !== null; ) {
        if (ue.key === ve) {
          var je = w.type;
          if (je === Ha) {
            if (ue.tag === ie) {
              n(j, ue.sibling);
              var Me = r(ue, w.props.children);
              return Me.return = j, Me._debugSource = w._source, Me._debugOwner = w._owner, Me;
            }
          } else if (ue.elementType === je || // Keep this check inline so it only runs on the false path:
          EN(ue, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof je == "object" && je !== null && je.$$typeof === xe && vy(je) === ue.type) {
            n(j, ue.sibling);
            var rt = r(ue, w.props);
            return rt.ref = bs(j, ue, w), rt.return = j, rt._debugSource = w._source, rt._debugOwner = w._owner, rt;
          }
          n(j, ue);
          break;
        } else
          t(j, ue);
        ue = ue.sibling;
      }
      if (w.type === Ha) {
        var We = oi(w.props.children, j.mode, Q, w.key);
        return We.return = j, We;
      } else {
        var Rt = Ev(w, j.mode, Q);
        return Rt.ref = bs(j, B, w), Rt.return = j, Rt;
      }
    }
    function qe(j, B, w, Q) {
      for (var ve = w.key, ue = B; ue !== null; ) {
        if (ue.key === ve)
          if (ue.tag === L && ue.stateNode.containerInfo === w.containerInfo && ue.stateNode.implementation === w.implementation) {
            n(j, ue.sibling);
            var je = r(ue, w.children || []);
            return je.return = j, je;
          } else {
            n(j, ue);
            break;
          }
        else
          t(j, ue);
        ue = ue.sibling;
      }
      var Me = xv(w, j.mode, Q);
      return Me.return = j, Me;
    }
    function He(j, B, w, Q) {
      var ve = typeof w == "object" && w !== null && w.type === Ha && w.key === null;
      if (ve && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return l(be(j, B, w, Q));
          case qn:
            return l(qe(j, B, w, Q));
          case xe:
            var ue = w._payload, je = w._init;
            return He(j, B, je(ue), Q);
        }
        if (Pe(w))
          return H(j, B, w, Q);
        if (Sa(w))
          return se(j, B, w, Q);
        pc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Se(j, B, "" + w, Q)) : (typeof w == "function" && mc(j), n(j, B));
    }
    return He;
  }
  var kl = hy(!0), gy = hy(!1);
  function OD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Qi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Qi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function AD(e, t) {
    for (var n = e.child; n !== null; )
      b1(n, t), n = n.sibling;
  }
  var jp = Gr(null), wp;
  wp = {};
  var vc = null, Ul = null, _p = null, hc = !1;
  function gc() {
    vc = null, Ul = null, _p = null, hc = !1;
  }
  function yy() {
    hc = !0;
  }
  function by() {
    hc = !1;
  }
  function Ny(e, t, n) {
    bn(jp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== wp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = wp;
  }
  function Op(e, t) {
    var n = jp.current;
    yn(jp, t), e._currentValue = n;
  }
  function Ap(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = Ue(r.childLanes, t)) : (a.childLanes = Ue(a.childLanes, t), r !== null && (r.childLanes = Ue(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function MD(e, t, n) {
    VD(e, t, n);
  }
  function VD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var s = Uo(n), u = Rr(ut, s);
              u.tag = bc;
              var v = a.updateQueue;
              if (v !== null) {
                var h = v.shared, C = h.pending;
                C === null ? u.next = u : (u.next = C.next, C.next = u), h.pending = u;
              }
            }
            a.lanes = Ue(a.lanes, n);
            var x = a.alternate;
            x !== null && (x.lanes = Ue(x.lanes, n)), Ap(a.return, n, e), i.lanes = Ue(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === G)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === J) {
        var M = a.return;
        if (M === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        M.lanes = Ue(M.lanes, n);
        var F = M.alternate;
        F !== null && (F.lanes = Ue(F.lanes, n)), Ap(M, n, e), r = a.sibling;
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
          var H = r.sibling;
          if (H !== null) {
            H.return = r.return, r = H;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function Fl(e, t) {
    vc = e, Ul = null, _p = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Wn(n.lanes, t) && Vs(), n.firstContext = null);
    }
  }
  function _t(e) {
    hc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (_p !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Ul === null) {
        if (vc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Ul = n, vc.dependencies = {
          lanes: W,
          firstContext: n
        };
      } else
        Ul = Ul.next = n;
    }
    return t;
  }
  var Bi = null;
  function Mp(e) {
    Bi === null ? Bi = [e] : Bi.push(e);
  }
  function LD() {
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
  function Ey(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Mp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, yc(e, a);
  }
  function kD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Mp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function UD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Mp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, yc(e, a);
  }
  function Hn(e, t) {
    return yc(e, t);
  }
  var FD = yc;
  function yc(e, t) {
    e.lanes = Ue(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ue(n.lanes, t)), n === null && (e.flags & (wt | mr)) !== Te && gN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ue(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ue(n.childLanes, t) : (r.flags & (wt | mr)) !== Te && gN(e), a = r, r = r.return;
    if (a.tag === D) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Sy = 0, xy = 1, bc = 2, Vp = 3, Nc = !1, Lp, Ec;
  Lp = !1, Ec = null;
  function kp(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: W
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function Ry(e, t) {
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
  function Rr(e, t) {
    var n = {
      eventTime: e,
      lane: t,
      tag: Sy,
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
    if (Ec === r && !Lp && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Lp = !0), kj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, FD(e, n);
    } else
      return UD(e, r, t, n);
  }
  function Sc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Uh(n)) {
        var i = r.lanes;
        i = zh(i, e.pendingLanes);
        var l = Ue(i, n);
        r.lanes = l, jd(e, l);
      }
    }
  }
  function Up(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, s = n.firstBaseUpdate;
        if (s !== null) {
          var u = s;
          do {
            var v = {
              eventTime: u.eventTime,
              lane: u.lane,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null
            };
            l === null ? i = l = v : (l.next = v, l = v), u = u.next;
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
    var h = n.lastBaseUpdate;
    h === null ? n.firstBaseUpdate = t : h.next = t, n.lastBaseUpdate = t;
  }
  function zD(e, t, n, a, r, i) {
    switch (n.tag) {
      case xy: {
        var l = n.payload;
        if (typeof l == "function") {
          yy();
          var s = l.call(i, a, r);
          {
            if (e.mode & St) {
              Gt(!0);
              try {
                l.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            by();
          }
          return s;
        }
        return l;
      }
      case Vp:
        e.flags = e.flags & ~_n | Je;
      case Sy: {
        var u = n.payload, v;
        if (typeof u == "function") {
          yy(), v = u.call(i, a, r);
          {
            if (e.mode & St) {
              Gt(!0);
              try {
                u.call(i, a, r);
              } finally {
                Gt(!1);
              }
            }
            by();
          }
        } else
          v = u;
        return v == null ? a : ze({}, a, v);
      }
      case bc:
        return Nc = !0, a;
    }
    return a;
  }
  function xc(e, t, n, a) {
    var r = e.updateQueue;
    Nc = !1, Ec = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, s = r.shared.pending;
    if (s !== null) {
      r.shared.pending = null;
      var u = s, v = u.next;
      u.next = null, l === null ? i = v : l.next = v, l = u;
      var h = e.alternate;
      if (h !== null) {
        var C = h.updateQueue, x = C.lastBaseUpdate;
        x !== l && (x === null ? C.firstBaseUpdate = v : x.next = v, C.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var M = r.baseState, F = W, H = null, se = null, Se = null, be = i;
      do {
        var qe = be.lane, He = be.eventTime;
        if (El(a, qe)) {
          if (Se !== null) {
            var B = {
              eventTime: He,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              tag: be.tag,
              payload: be.payload,
              callback: be.callback,
              next: null
            };
            Se = Se.next = B;
          }
          M = zD(e, r, be, M, t, n);
          var w = be.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          be.lane !== Wt) {
            e.flags |= yh;
            var Q = r.effects;
            Q === null ? r.effects = [be] : Q.push(be);
          }
        } else {
          var j = {
            eventTime: He,
            lane: qe,
            tag: be.tag,
            payload: be.payload,
            callback: be.callback,
            next: null
          };
          Se === null ? (se = Se = j, H = M) : Se = Se.next = j, F = Ue(F, qe);
        }
        if (be = be.next, be === null) {
          if (s = r.shared.pending, s === null)
            break;
          var ve = s, ue = ve.next;
          ve.next = null, be = ue, r.lastBaseUpdate = ve, r.shared.pending = null;
        }
      } while (!0);
      Se === null && (H = M), r.baseState = H, r.firstBaseUpdate = se, r.lastBaseUpdate = Se;
      var je = r.shared.interleaved;
      if (je !== null) {
        var Me = je;
        do
          F = Ue(F, Me.lane), Me = Me.next;
        while (Me !== je);
      } else i === null && (r.shared.lanes = W);
      qs(F), e.lanes = F, e.memoizedState = M;
    }
    Ec = null;
  }
  function PD(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Cy() {
    Nc = !1;
  }
  function Rc() {
    return Nc;
  }
  function Dy(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, PD(l, n));
      }
  }
  var Ns = {}, Jr = Gr(Ns), Es = Gr(Ns), Cc = Gr(Ns);
  function Dc(e) {
    if (e === Ns)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Ty() {
    var e = Dc(Cc.current);
    return e;
  }
  function Fp(e, t) {
    bn(Cc, t, e), bn(Es, e, e), bn(Jr, Ns, e);
    var n = aC(t);
    yn(Jr, e), bn(Jr, n, e);
  }
  function zl(e) {
    yn(Jr, e), yn(Es, e), yn(Cc, e);
  }
  function zp() {
    var e = Dc(Jr.current);
    return e;
  }
  function jy(e) {
    Dc(Cc.current);
    var t = Dc(Jr.current), n = rC(t, e.type);
    t !== n && (bn(Es, e, e), bn(Jr, n, e));
  }
  function Pp(e) {
    Es.current === e && (yn(Jr, e), yn(Es, e));
  }
  var HD = 0, wy = 1, _y = 1, Ss = 2, wa = Gr(HD);
  function Hp(e, t) {
    return (e & t) !== 0;
  }
  function Pl(e) {
    return e & wy;
  }
  function Bp(e, t) {
    return e & wy | t;
  }
  function BD(e, t) {
    return e | t;
  }
  function Zr(e, t) {
    bn(wa, t, e);
  }
  function Hl(e) {
    yn(wa, e);
  }
  function $D(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Tc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === X) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Gg(a) || lp(a))
            return t;
        }
      } else if (t.tag === k && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Je) !== Te;
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
  ), Ka = (
    /*  */
    2
  ), Lt = (
    /*    */
    4
  ), ln = (
    /*   */
    8
  ), $p = [];
  function Ip() {
    for (var e = 0; e < $p.length; e++) {
      var t = $p[e];
      t._workInProgressVersionPrimary = null;
    }
    $p.length = 0;
  }
  function ID(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var de = m.ReactCurrentDispatcher, xs = m.ReactCurrentBatchConfig, Yp, Bl;
  Yp = /* @__PURE__ */ new Set();
  var $i = W, at = null, kt = null, Ut = null, jc = !1, Rs = !1, Cs = 0, YD = 0, qD = 25, $ = null, ca = null, ei = -1, qp = !1;
  function Ze() {
    {
      var e = $;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function re() {
    {
      var e = $;
      ca !== null && (ei++, ca[ei] !== e && GD(e));
    }
  }
  function $l(e) {
    e != null && !Pe(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", $, typeof e);
  }
  function GD(e) {
    {
      var t = Le(at);
      if (!Yp.has(t) && (Yp.add(t), ca !== null)) {
        for (var n = "", a = 30, r = 0; r <= ei; r++) {
          for (var i = ca[r], l = r === ei ? e : i, s = r + 1 + ". " + i; s.length < a; )
            s += " ";
          s += l + `
`, n += s;
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
  function Gp(e, t) {
    if (qp)
      return !1;
    if (t === null)
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", $), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, $, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Il(e, t, n, a, r, i) {
    $i = i, at = t, ca = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = W, e !== null && e.memoizedState !== null ? de.current = Jy : ca !== null ? de.current = Xy : de.current = Qy;
    var l = n(a, r);
    if (Rs) {
      var s = 0;
      do {
        if (Rs = !1, Cs = 0, s >= qD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        s += 1, qp = !1, kt = null, Ut = null, t.updateQueue = null, ei = -1, de.current = Zy, l = n(a, r);
      } while (Rs);
    }
    de.current = Hc, t._debugHookTypes = ca;
    var u = kt !== null && kt.next !== null;
    if ($i = W, at = null, kt = null, Ut = null, $ = null, ca = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ie) !== Re && f("Internal React error: Expected static flag was missing. Please notify the React team."), jc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Yl() {
    var e = Cs !== 0;
    return Cs = 0, e;
  }
  function Oy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ya) !== Re ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function Ay() {
    if (de.current = Hc, jc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      jc = !1;
    }
    $i = W, at = null, kt = null, Ut = null, ca = null, ei = -1, $ = null, Yy = !1, Rs = !1, Cs = 0;
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
  function My() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Wp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Kp(e, t, n) {
    var a = Qa(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: W,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = XD.bind(null, at, i);
    return [a.memoizedState, l];
  }
  function Qp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = kt, l = i.baseQueue, s = r.pending;
    if (s !== null) {
      if (l !== null) {
        var u = l.next, v = s.next;
        l.next = v, s.next = u;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = s, r.pending = null;
    }
    if (l !== null) {
      var h = l.next, C = i.baseState, x = null, M = null, F = null, H = h;
      do {
        var se = H.lane;
        if (El($i, se)) {
          if (F !== null) {
            var be = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            };
            F = F.next = be;
          }
          if (H.hasEagerState)
            C = H.eagerState;
          else {
            var qe = H.action;
            C = e(C, qe);
          }
        } else {
          var Se = {
            lane: se,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          F === null ? (M = F = Se, x = C) : F = F.next = Se, at.lanes = Ue(at.lanes, se), qs(se);
        }
        H = H.next;
      } while (H !== null && H !== h);
      F === null ? x = C : F.next = M, Xn(C, a.memoizedState) || Vs(), a.memoizedState = C, a.baseState = x, a.baseQueue = F, r.lastRenderedState = C;
    }
    var He = r.interleaved;
    if (He !== null) {
      var j = He;
      do {
        var B = j.lane;
        at.lanes = Ue(at.lanes, B), qs(B), j = j.next;
      } while (j !== He);
    } else l === null && (r.lanes = W);
    var w = r.dispatch;
    return [a.memoizedState, w];
  }
  function Xp(e, t, n) {
    var a = fa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, s = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var u = l.next, v = u;
      do {
        var h = v.action;
        s = e(s, h), v = v.next;
      } while (v !== u);
      Xn(s, a.memoizedState) || Vs(), a.memoizedState = s, a.baseQueue === null && (a.baseState = s), r.lastRenderedState = s;
    }
    return [s, i];
  }
  function tO(e, t, n) {
  }
  function nO(e, t, n) {
  }
  function Jp(e, t, n) {
    var a = at, r = Qa(), i, l = rn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Bl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    } else {
      if (i = t(), !Bl) {
        var s = t();
        Xn(i, s) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
      }
      var u = of();
      if (u === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      ju(u, $i) || Vy(a, t, i);
    }
    r.memoizedState = i;
    var v = {
      value: i,
      getSnapshot: t
    };
    return r.queue = v, Mc(ky.bind(null, a, v, e), [e]), a.flags |= Fr, Ds(Vt | ln, Ly.bind(null, a, v, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var s = r.memoizedState, u = !Xn(s, i);
    u && (r.memoizedState = i, Vs());
    var v = r.queue;
    if (js(ky.bind(null, a, v, e), [e]), v.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & Vt) {
      a.flags |= Fr, Ds(Vt | ln, Ly.bind(null, a, v, i, t), void 0, null);
      var h = of();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      ju(h, $i) || Vy(a, t, i);
    }
    return i;
  }
  function Vy(e, t, n) {
    e.flags |= Wf;
    var a = {
      getSnapshot: t,
      value: n
    }, r = at.updateQueue;
    if (r === null)
      r = My(), at.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function Ly(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Uy(t) && Fy(e);
  }
  function ky(e, t, n) {
    var a = function() {
      Uy(t) && Fy(e);
    };
    return n(a);
  }
  function Uy(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Xn(n, a);
    } catch {
      return !0;
    }
  }
  function Fy(e) {
    var t = Hn(e, _e);
    t !== null && Ht(t, e, _e, ut);
  }
  function _c(e) {
    var t = Qa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: W,
      dispatch: null,
      lastRenderedReducer: Wp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = JD.bind(null, at, n);
    return [t.memoizedState, a];
  }
  function Zp(e) {
    return Qp(Wp);
  }
  function em(e) {
    return Xp(Wp);
  }
  function Ds(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = at.updateQueue;
    if (i === null)
      i = My(), at.updateQueue = i, i.lastEffect = r.next = r;
    else {
      var l = i.lastEffect;
      if (l === null)
        i.lastEffect = r.next = r;
      else {
        var s = l.next;
        l.next = r, r.next = s, i.lastEffect = r;
      }
    }
    return r;
  }
  function tm(e) {
    var t = Qa();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Oc(e) {
    var t = fa();
    return t.memoizedState;
  }
  function Ts(e, t, n, a) {
    var r = Qa(), i = a === void 0 ? null : a;
    at.flags |= e, r.memoizedState = Ds(Vt | t, n, void 0, i);
  }
  function Ac(e, t, n, a) {
    var r = fa(), i = a === void 0 ? null : a, l = void 0;
    if (kt !== null) {
      var s = kt.memoizedState;
      if (l = s.destroy, i !== null) {
        var u = s.deps;
        if (Gp(i, u)) {
          r.memoizedState = Ds(t, n, l, i);
          return;
        }
      }
    }
    at.flags |= e, r.memoizedState = Ds(Vt | t, n, l, i);
  }
  function Mc(e, t) {
    return (at.mode & Ya) !== Re ? Ts(Jf | Fr | Xf, ln, e, t) : Ts(Fr | Xf, ln, e, t);
  }
  function js(e, t) {
    return Ac(Fr, ln, e, t);
  }
  function nm(e, t) {
    return Ts(Xe, Ka, e, t);
  }
  function Vc(e, t) {
    return Ac(Xe, Ka, e, t);
  }
  function am(e, t) {
    var n = Xe;
    return n |= Di, (at.mode & Ya) !== Re && (n |= zr), Ts(n, Lt, e, t);
  }
  function Lc(e, t) {
    return Ac(Xe, Lt, e, t);
  }
  function zy(e, t) {
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
  function rm(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Xe;
    return r |= Di, (at.mode & Ya) !== Re && (r |= zr), Ts(r, Lt, zy.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Ac(Xe, Lt, zy.bind(null, t, e), a);
  }
  function WD(e, t) {
  }
  var Uc = WD;
  function im(e, t) {
    var n = Qa(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function lm(e, t) {
    var n = Qa(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function zc(e, t) {
    var n = fa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function om(e) {
    var t = Qa();
    return t.memoizedState = e, e;
  }
  function Py(e) {
    var t = fa(), n = kt, a = n.memoizedState;
    return By(t, a, e);
  }
  function Hy(e) {
    var t = fa();
    if (kt === null)
      return t.memoizedState = e, e;
    var n = kt.memoizedState;
    return By(t, n, e);
  }
  function By(e, t, n) {
    var a = !Mx($i);
    if (a) {
      if (!Xn(n, t)) {
        var r = Fh();
        at.lanes = Ue(at.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Vs()), e.memoizedState = n, n;
  }
  function KD(e, t, n) {
    var a = Ca();
    Kt(Bx(a, gr)), e(!0);
    var r = xs.transition;
    xs.transition = {};
    var i = xs.transition;
    xs.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Kt(a), xs.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function sm() {
    var e = _c(!1), t = e[0], n = e[1], a = KD.bind(null, n), r = Qa();
    return r.memoizedState = a, [t, a];
  }
  function $y() {
    var e = Zp(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  function Iy() {
    var e = em(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  var Yy = !1;
  function QD() {
    return Yy;
  }
  function um() {
    var e = Qa(), t = of(), n = t.identifierPrefix, a;
    if (rn()) {
      var r = pD();
      a = ":" + n + "R" + r;
      var i = Cs++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = YD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Pc() {
    var e = fa(), t = e.memoizedState;
    return t;
  }
  function XD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (qy(e))
      Gy(t, r);
    else {
      var i = Ey(e, t, r, a);
      if (i !== null) {
        var l = Mn();
        Ht(i, e, a, l), Wy(i, t, a);
      }
    }
    Ky(e, a);
  }
  function JD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (qy(e))
      Gy(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === W && (i === null || i.lanes === W)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var s;
          s = de.current, de.current = _a;
          try {
            var u = t.lastRenderedState, v = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = v, Xn(v, u)) {
              kD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            de.current = s;
          }
        }
      }
      var h = Ey(e, t, r, a);
      if (h !== null) {
        var C = Mn();
        Ht(h, e, a, C), Wy(h, t, a);
      }
    }
    Ky(e, a);
  }
  function qy(e) {
    var t = e.alternate;
    return e === at || t !== null && t === at;
  }
  function Gy(e, t) {
    Rs = jc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Wy(e, t, n) {
    if (Uh(n)) {
      var a = t.lanes;
      a = zh(a, e.pendingLanes);
      var r = Ue(a, n);
      t.lanes = r, jd(e, r);
    }
  }
  function Ky(e, t, n) {
    ad(e, t);
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
    unstable_isNewReconciler: Ge
  }, Qy = null, Xy = null, Jy = null, Zy = null, Xa = null, _a = null, Bc = null;
  {
    var cm = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Oe = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Qy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Ze(), $l(t), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Ze(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Ze(), $l(t), Mc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Ze(), $l(n), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Ze(), $l(t), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Ze(), $l(t), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Ze(), $l(t);
        var n = de.current;
        de.current = Xa;
        try {
          return lm(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Ze();
        var a = de.current;
        de.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Ze(), tm(e);
      },
      useState: function(e) {
        $ = "useState", Ze();
        var t = de.current;
        de.current = Xa;
        try {
          return _c(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Ze(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", Ze(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Ze(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", Ze(), um();
      },
      unstable_isNewReconciler: Ge
    }, Xy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", re(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", re(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", re(), Mc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", re(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", re(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", re(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", re();
        var n = de.current;
        de.current = Xa;
        try {
          return lm(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", re();
        var a = de.current;
        de.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", re(), tm(e);
      },
      useState: function(e) {
        $ = "useState", re();
        var t = de.current;
        de.current = Xa;
        try {
          return _c(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", re(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", re(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", re(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", re(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", re(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", re(), um();
      },
      unstable_isNewReconciler: Ge
    }, Jy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", re(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", re(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", re(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", re(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", re(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", re(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", re();
        var n = de.current;
        de.current = _a;
        try {
          return zc(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", re();
        var a = de.current;
        de.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", re(), Oc();
      },
      useState: function(e) {
        $ = "useState", re();
        var t = de.current;
        de.current = _a;
        try {
          return Zp(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", re(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", re(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", re(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", re(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", re(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", re(), Pc();
      },
      unstable_isNewReconciler: Ge
    }, Zy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", re(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", re(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", re(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", re(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", re(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", re(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", re();
        var n = de.current;
        de.current = Bc;
        try {
          return zc(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", re();
        var a = de.current;
        de.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", re(), Oc();
      },
      useState: function(e) {
        $ = "useState", re();
        var t = de.current;
        de.current = Bc;
        try {
          return em(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", re(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", re(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", re(), Iy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", re(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", re(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", re(), Pc();
      },
      unstable_isNewReconciler: Ge
    }, Xa = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Oe(), Ze(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Oe(), Ze(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Oe(), Ze(), Mc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Oe(), Ze(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Oe(), Ze(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Oe(), Ze(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Oe(), Ze();
        var n = de.current;
        de.current = Xa;
        try {
          return lm(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Oe(), Ze();
        var a = de.current;
        de.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Oe(), Ze(), tm(e);
      },
      useState: function(e) {
        $ = "useState", Oe(), Ze();
        var t = de.current;
        de.current = Xa;
        try {
          return _c(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Oe(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Oe(), Ze(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", Oe(), Ze(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Oe(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Oe(), Ze(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", Oe(), Ze(), um();
      },
      unstable_isNewReconciler: Ge
    }, _a = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Oe(), re(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Oe(), re(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Oe(), re(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Oe(), re(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Oe(), re(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Oe(), re(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Oe(), re();
        var n = de.current;
        de.current = _a;
        try {
          return zc(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Oe(), re();
        var a = de.current;
        de.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Oe(), re(), Oc();
      },
      useState: function(e) {
        $ = "useState", Oe(), re();
        var t = de.current;
        de.current = _a;
        try {
          return Zp(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Oe(), re(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Oe(), re(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", Oe(), re(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Oe(), re(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Oe(), re(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", Oe(), re(), Pc();
      },
      unstable_isNewReconciler: Ge
    }, Bc = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", Oe(), re(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", Oe(), re(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", Oe(), re(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", Oe(), re(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", Oe(), re(), Vc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", Oe(), re(), Lc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", Oe(), re();
        var n = de.current;
        de.current = _a;
        try {
          return zc(e, t);
        } finally {
          de.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Oe(), re();
        var a = de.current;
        de.current = _a;
        try {
          return Xp(e, t, n);
        } finally {
          de.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Oe(), re(), Oc();
      },
      useState: function(e) {
        $ = "useState", Oe(), re();
        var t = de.current;
        de.current = _a;
        try {
          return em(e);
        } finally {
          de.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", Oe(), re(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", Oe(), re(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", Oe(), re(), Iy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", Oe(), re(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", Oe(), re(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", Oe(), re(), Pc();
      },
      unstable_isNewReconciler: Ge
    };
  }
  var ti = p.unstable_now, eb = 0, $c = -1, ws = -1, Ic = -1, fm = !1, Yc = !1;
  function tb() {
    return fm;
  }
  function ZD() {
    Yc = !0;
  }
  function eT() {
    fm = !1, Yc = !1;
  }
  function tT() {
    fm = Yc, Yc = !1;
  }
  function nb() {
    return eb;
  }
  function ab() {
    eb = ti();
  }
  function dm(e) {
    ws = ti(), e.actualStartTime < 0 && (e.actualStartTime = ti());
  }
  function rb(e) {
    ws = -1;
  }
  function qc(e, t) {
    if (ws >= 0) {
      var n = ti() - ws;
      e.actualDuration += n, t && (e.selfBaseDuration = n), ws = -1;
    }
  }
  function Ja(e) {
    if ($c >= 0) {
      var t = ti() - $c;
      $c = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case D:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case Z:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function pm(e) {
    if (Ic >= 0) {
      var t = ti() - Ic;
      Ic = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case D:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case Z:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function Za() {
    $c = ti();
  }
  function mm() {
    Ic = ti();
  }
  function vm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function Oa(e, t) {
    if (e && e.defaultProps) {
      var n = ze({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var hm = {}, gm, ym, bm, Nm, Em, ib, Gc, Sm, xm, Rm, _s;
  {
    gm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var lb = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        lb.has(n) || (lb.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, ib = function(e, t) {
      if (t === void 0) {
        var n = Qe(e) || "Component";
        Em.has(n) || (Em.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(hm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(hm);
  }
  function Cm(e, t, n, a) {
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
      ib(t, i);
    }
    var l = i == null ? r : ze({}, r, i);
    if (e.memoizedState = l, e.lanes === W) {
      var s = e.updateQueue;
      s.baseState = l;
    }
  }
  var Dm = {
    isMounted: qS,
    enqueueSetState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ii(a), l = Rr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Ht(s, a, i, r), Sc(s, a, i)), ad(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ii(a), l = Rr(r, i);
      l.tag = xy, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Ht(s, a, i, r), Sc(s, a, i)), ad(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = Mn(), r = ii(n), i = Rr(a, r);
      i.tag = bc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (Ht(l, n, r, a), Sc(l, n, r)), xx(n, r);
    }
  };
  function ob(e, t, n, a, r, i, l) {
    var s = e.stateNode;
    if (typeof s.shouldComponentUpdate == "function") {
      var u = s.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & St) {
          Gt(!0);
          try {
            u = s.shouldComponentUpdate(a, i, l);
          } finally {
            Gt(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Qe(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function nT(e, t, n) {
    var a = e.stateNode;
    {
      var r = Qe(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === Re && (_s.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === Re && (_s.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !xm.has(t) && (xm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Qe(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !bm.has(t) && (bm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Qe(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var s = a.state;
      s && (typeof s != "object" || Pe(s)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function sb(e, t) {
    t.updater = Dm, e.stateNode = t, BS(t, e), t._reactInternalInstance = hm;
  }
  function ub(e, t, n) {
    var a = !1, r = Jn, i = Jn, l = t.contextType;
    if ("contextType" in t) {
      var s = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === oe && l._context === void 0
      );
      if (!s && !Rm.has(t)) {
        Rm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === K ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Qe(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = _t(l);
    else {
      r = Ol(e, t, !0);
      var v = t.contextTypes;
      a = v != null, i = a ? Al(e, r) : Jn;
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
    var C = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    sb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var x = Qe(t) || "Component";
        ym.has(x) || (ym.add(x), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", x, h.state === null ? "null" : "undefined", x));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var M = null, F = null, H = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? F = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (F = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? H = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (H = "UNSAFE_componentWillUpdate"), M !== null || F !== null || H !== null) {
          var se = Qe(t) || "Component", Se = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(se) || (Nm.add(se), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, se, Se, M !== null ? `
  ` + M : "", F !== null ? `
  ` + F : "", H !== null ? `
  ` + H : ""));
        }
      }
    }
    return a && Jg(e, r, i), h;
  }
  function aT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Le(e) || "Component"), Dm.enqueueReplaceState(t, t.state, null));
  }
  function cb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Le(e) || "Component";
        gm.has(i) || (gm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Dm.enqueueReplaceState(t, t.state, null);
    }
  }
  function Tm(e, t, n, a) {
    nT(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, kp(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = _t(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Al(e, l);
    }
    {
      if (r.state === n) {
        var s = Qe(t) || "Component";
        Sm.has(s) || (Sm.add(s), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s));
      }
      e.mode & St && ja.recordLegacyContextWarning(e, r), ja.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Cm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (aT(e, r), xc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var v = Xe;
      v |= Di, (e.mode & Ya) !== Re && (v |= zr), e.flags |= v;
    }
  }
  function rT(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, s = t.contextType, u = Jn;
    if (typeof s == "object" && s !== null)
      u = _t(s);
    else {
      var v = Ol(e, t, !0);
      u = Al(e, v);
    }
    var h = t.getDerivedStateFromProps, C = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && cb(e, r, n, u), Cy();
    var x = e.memoizedState, M = r.state = x;
    if (xc(e, n, r, a), M = e.memoizedState, i === n && x === M && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var F = Xe;
        F |= Di, (e.mode & Ya) !== Re && (F |= zr), e.flags |= F;
      }
      return !1;
    }
    typeof h == "function" && (Cm(e, t, h, n), M = e.memoizedState);
    var H = Rc() || ob(e, t, i, n, x, M, u);
    if (H) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var se = Xe;
        se |= Di, (e.mode & Ya) !== Re && (se |= zr), e.flags |= se;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Se = Xe;
        Se |= Di, (e.mode & Ya) !== Re && (Se |= zr), e.flags |= Se;
      }
      e.memoizedProps = n, e.memoizedState = M;
    }
    return r.props = n, r.state = M, r.context = u, H;
  }
  function iT(e, t, n, a, r) {
    var i = t.stateNode;
    Ry(e, t);
    var l = t.memoizedProps, s = t.type === t.elementType ? l : Oa(t.type, l);
    i.props = s;
    var u = t.pendingProps, v = i.context, h = n.contextType, C = Jn;
    if (typeof h == "object" && h !== null)
      C = _t(h);
    else {
      var x = Ol(t, n, !0);
      C = Al(t, x);
    }
    var M = n.getDerivedStateFromProps, F = typeof M == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !F && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || v !== C) && cb(t, i, a, C), Cy();
    var H = t.memoizedState, se = i.state = H;
    if (xc(t, a, i, r), se = t.memoizedState, l === u && H === se && !rc() && !Rc() && !pn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), !1;
    typeof M == "function" && (Cm(t, n, M, a), se = t.memoizedState);
    var Se = Rc() || ob(t, n, s, a, H, se, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    pn;
    return Se ? (!F && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, se, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, se, C)), typeof i.componentDidUpdate == "function" && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= Xe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = se), i.props = a, i.state = se, i.context = C, Se;
  }
  function Ii(e, t) {
    return {
      value: e,
      source: t,
      stack: yi(t),
      digest: null
    };
  }
  function jm(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function lT(e, t) {
    return !0;
  }
  function wm(e, t) {
    try {
      var n = lT(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var s = r ? Le(r) : null, u = s ? "The above error occurred in the <" + s + "> component:" : "The above error occurred in one of your React components:", v;
      if (e.tag === D)
        v = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Le(e) || "Anonymous";
        v = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var C = u + `
` + l + `

` + ("" + v);
      console.error(C);
    } catch (x) {
      setTimeout(function() {
        throw x;
      });
    }
  }
  var oT = typeof WeakMap == "function" ? WeakMap : Map;
  function fb(e, t, n) {
    var a = Rr(ut, n);
    a.tag = Vp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Rr(ut, n);
    a.tag = Vp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        SN(e), wm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      SN(e), wm(e, t), typeof r != "function" && Xj(this);
      var u = t.value, v = t.stack;
      this.componentDidCatch(u, {
        componentStack: v !== null ? v : ""
      }), typeof r != "function" && (Wn(e.lanes, _e) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Le(e) || "Unknown"));
    }), a;
  }
  function db(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new oT(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = e1.bind(null, e, t, n);
      Ra && Gs(e, n), t.then(i, i);
    }
  }
  function sT(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function uT(e, t) {
    var n = e.tag;
    if ((e.mode & Ie) === Re && (n === R || n === Y || n === _)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function pb(e) {
    var t = e;
    do {
      if (t.tag === X && $D(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function mb(e, t, n, a, r) {
    if ((e.mode & Ie) === Re) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Je, n.flags |= Kf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = q;
          else {
            var l = Rr(ut, _e);
            l.tag = bc, Xr(n, l, _e);
          }
        }
        n.lanes = Ue(n.lanes, _e);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function cT(e, t, n, a, r) {
    if (n.flags |= Su, Ra && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      uT(n), rn() && n.mode & Ie && iy();
      var l = pb(t);
      if (l !== null) {
        l.flags &= ~pr, mb(l, t, n, e, r), l.mode & Ie && db(e, i, r), sT(l, e, i);
        return;
      } else {
        if (!Ax(r)) {
          db(e, i, r), uv();
          return;
        }
        var s = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = s;
      }
    } else if (rn() && n.mode & Ie) {
      iy();
      var u = pb(t);
      if (u !== null) {
        (u.flags & _n) === Te && (u.flags |= pr), mb(u, t, n, e, r), Sp(Ii(a, n));
        return;
      }
    }
    a = Ii(a, n), $j(a);
    var v = t;
    do {
      switch (v.tag) {
        case D: {
          var h = a;
          v.flags |= _n;
          var C = Uo(r);
          v.lanes = Ue(v.lanes, C);
          var x = fb(v, h, C);
          Up(v, x);
          return;
        }
        case T:
          var M = a, F = v.type, H = v.stateNode;
          if ((v.flags & Je) === Te && (typeof F.getDerivedStateFromError == "function" || H !== null && typeof H.componentDidCatch == "function" && !pN(H))) {
            v.flags |= _n;
            var se = Uo(r);
            v.lanes = Ue(v.lanes, se);
            var Se = _m(v, M, se);
            Up(v, Se);
            return;
          }
          break;
      }
      v = v.return;
    } while (v !== null);
  }
  function fT() {
    return null;
  }
  var Os = m.ReactCurrentOwner, Aa = !1, Om, As, Am, Mm, Vm, Yi, Lm, Wc, Ms;
  Om = {}, As = {}, Am = {}, Mm = {}, Vm = {}, Yi = !1, Lm = {}, Wc = {}, Ms = {};
  function On(e, t, n, a) {
    e === null ? t.child = gy(t, null, n, a) : t.child = kl(t, e.child, n, a);
  }
  function dT(e, t, n, a) {
    t.child = kl(t, e.child, null, a), t.child = kl(t, null, n, a);
  }
  function vb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Da(
        i,
        a,
        // Resolved props
        "prop",
        Qe(n)
      );
    }
    var l = n.render, s = t.ref, u, v;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, la(!0), u = Il(e, t, l, a, s, r), v = Yl(), t.mode & St) {
        Gt(!0);
        try {
          u = Il(e, t, l, a, s, r), v = Yl();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Aa ? (Oy(e, t, r), Cr(e, t, r)) : (rn() && v && hp(t), t.flags |= pl, On(e, t, u, r), t.child);
  }
  function hb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (g1(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = _, t.type = l, Fm(t, i), gb(e, t, l, a, r);
      }
      {
        var s = i.propTypes;
        if (s && Da(
          s,
          a,
          // Resolved props
          "prop",
          Qe(i)
        ), n.defaultProps !== void 0) {
          var u = Qe(i) || "Unknown";
          Ms[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), Ms[u] = !0);
        }
      }
      var v = Nv(n.type, null, a, t, t.mode, r);
      return v.ref = t.ref, v.return = t, t.child = v, v;
    }
    {
      var h = n.type, C = h.propTypes;
      C && Da(
        C,
        a,
        // Resolved props
        "prop",
        Qe(h)
      );
    }
    var x = e.child, M = Im(e, r);
    if (!M) {
      var F = x.memoizedProps, H = n.compare;
      if (H = H !== null ? H : Jo, H(F, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var se = Qi(x, a);
    return se.ref = t.ref, se.return = t, t.child = se, se;
  }
  function gb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === xe) {
        var l = i, s = l._payload, u = l._init;
        try {
          i = u(s);
        } catch {
          i = null;
        }
        var v = i && i.propTypes;
        v && Da(
          v,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Qe(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Jo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Aa = !1, t.pendingProps = a = h, Im(e, r))
          (e.flags & Kf) !== Te && (Aa = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function yb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Qt)
      if ((t.mode & Ie) === Re) {
        var l = {
          baseLanes: W,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, sf(t, n);
      } else if (Wn(n, Gn)) {
        var C = {
          baseLanes: W,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = C;
        var x = i !== null ? i.baseLanes : n;
        sf(t, x);
      } else {
        var s = null, u;
        if (i !== null) {
          var v = i.baseLanes;
          u = Ue(v, n);
        } else
          u = n;
        t.lanes = t.childLanes = Gn;
        var h = {
          baseLanes: u,
          cachePool: s,
          transitions: null
        };
        return t.memoizedState = h, t.updateQueue = null, sf(t, u), null;
      }
    else {
      var M;
      i !== null ? (M = Ue(i.baseLanes, n), t.memoizedState = null) : M = n, sf(t, M);
    }
    return On(e, t, r, n), t.child;
  }
  function pT(e, t, n) {
    var a = t.pendingProps;
    return On(e, t, a, n), t.child;
  }
  function mT(e, t, n) {
    var a = t.pendingProps.children;
    return On(e, t, a, n), t.child;
  }
  function vT(e, t, n) {
    {
      t.flags |= Xe;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return On(e, t, i, n), t.child;
  }
  function bb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ri, t.flags |= Qf);
  }
  function km(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Da(
        i,
        a,
        // Resolved props
        "prop",
        Qe(n)
      );
    }
    var l;
    {
      var s = Ol(t, n, !0);
      l = Al(t, s);
    }
    var u, v;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, la(!0), u = Il(e, t, n, a, l, r), v = Yl(), t.mode & St) {
        Gt(!0);
        try {
          u = Il(e, t, n, a, l, r), v = Yl();
        } finally {
          Gt(!1);
        }
      }
      la(!1);
    }
    return gl(), e !== null && !Aa ? (Oy(e, t, r), Cr(e, t, r)) : (rn() && v && hp(t), t.flags |= pl, On(e, t, u, r), t.child);
  }
  function Nb(e, t, n, a, r) {
    {
      switch (A1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, s = new l(t.memoizedProps, i.context), u = s.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= Je, t.flags |= _n;
          var v = new Error("Simulated error coming from DevTools"), h = Uo(r);
          t.lanes = Ue(t.lanes, h);
          var C = _m(t, Ii(v, t), h);
          Up(t, C);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var x = n.propTypes;
        x && Da(
          x,
          a,
          // Resolved props
          "prop",
          Qe(n)
        );
      }
    }
    var M;
    Wa(n) ? (M = !0, lc(t)) : M = !1, Fl(t, r);
    var F = t.stateNode, H;
    F === null ? (Qc(e, t), ub(t, n, a), Tm(t, n, a, r), H = !0) : e === null ? H = rT(t, n, a, r) : H = iT(e, t, n, a, r);
    var se = Um(e, t, n, H, M, r);
    {
      var Se = t.stateNode;
      H && Se.props !== a && (Yi || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Le(t) || "a component"), Yi = !0);
    }
    return se;
  }
  function Um(e, t, n, a, r, i) {
    bb(e, t);
    var l = (t.flags & Je) !== Te;
    if (!a && !l)
      return r && ty(t, n, !1), Cr(e, t, i);
    var s = t.stateNode;
    Os.current = t;
    var u;
    if (l && typeof n.getDerivedStateFromError != "function")
      u = null, rb();
    else {
      Oo(t);
      {
        if (la(!0), u = s.render(), t.mode & St) {
          Gt(!0);
          try {
            s.render();
          } finally {
            Gt(!1);
          }
        }
        la(!1);
      }
      gl();
    }
    return t.flags |= pl, e !== null && l ? dT(e, t, u, i) : On(e, t, u, i), t.memoizedState = s.state, r && ty(t, n, !0), t.child;
  }
  function Eb(e) {
    var t = e.stateNode;
    t.pendingContext ? Zg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zg(e, t.context, !1), Fp(e, t.containerInfo);
  }
  function hT(e, t, n) {
    if (Eb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Ry(e, t), xc(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var s = l.element;
    if (r.isDehydrated) {
      var u = {
        element: s,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, v = t.updateQueue;
      if (v.baseState = u, t.memoizedState = u, t.flags & pr) {
        var h = Ii(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Sb(e, t, s, n, h);
      } else if (s !== i) {
        var C = Ii(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Sb(e, t, s, n, C);
      } else {
        bD(t);
        var x = gy(t, null, s, n);
        t.child = x;
        for (var M = x; M; )
          M.flags = M.flags & ~wt | mr, M = M.sibling;
      }
    } else {
      if (Ll(), s === i)
        return Cr(e, t, n);
      On(e, t, s, n);
    }
    return t.child;
  }
  function Sb(e, t, n, a, r) {
    return Ll(), Sp(r), t.flags |= pr, On(e, t, n, a), t.child;
  }
  function gT(e, t, n) {
    jy(t), e === null && Ep(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, s = np(a, r);
    return s ? l = null : i !== null && np(a, i) && (t.flags |= wo), bb(e, t), On(e, t, l, n), t.child;
  }
  function yT(e, t) {
    return e === null && Ep(t), null;
  }
  function bT(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, s = i._init, u = s(l);
    t.type = u;
    var v = t.tag = y1(u), h = Oa(u, r), C;
    switch (v) {
      case R:
        return Fm(t, u), t.type = u = Zl(u), C = km(null, t, u, h, a), C;
      case T:
        return t.type = u = mv(u), C = Nb(null, t, u, h, a), C;
      case Y:
        return t.type = u = vv(u), C = vb(null, t, u, h, a), C;
      case z: {
        if (t.type !== t.elementType) {
          var x = u.propTypes;
          x && Da(
            x,
            h,
            // Resolved for outer only
            "prop",
            Qe(u)
          );
        }
        return C = hb(
          null,
          t,
          u,
          Oa(u.type, h),
          // The inner type can have defaults too
          a
        ), C;
      }
    }
    var M = "";
    throw u !== null && typeof u == "object" && u.$$typeof === xe && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + M));
  }
  function NT(e, t, n, a, r) {
    Qc(e, t), t.tag = T;
    var i;
    return Wa(n) ? (i = !0, lc(t)) : i = !1, Fl(t, r), ub(t, n, a), Tm(t, n, a, r), Um(null, t, n, !0, i, r);
  }
  function ET(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ol(t, n, !1);
      i = Al(t, l);
    }
    Fl(t, a);
    var s, u;
    Oo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var v = Qe(n) || "Unknown";
        Om[v] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", v, v), Om[v] = !0);
      }
      t.mode & St && ja.recordLegacyContextWarning(t, null), la(!0), Os.current = t, s = Il(null, t, n, r, i, a), u = Yl(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0) {
      var h = Qe(n) || "Unknown";
      As[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), As[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0
    ) {
      {
        var C = Qe(n) || "Unknown";
        As[C] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), As[C] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var x = !1;
      return Wa(n) ? (x = !0, lc(t)) : x = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, kp(t), sb(t, s), Tm(t, n, r, a), Um(null, t, n, !0, x, a);
    } else {
      if (t.tag = R, t.mode & St) {
        Gt(!0);
        try {
          s = Il(null, t, n, r, i, a), u = Yl();
        } finally {
          Gt(!1);
        }
      }
      return rn() && u && hp(t), On(null, t, s, a), Fm(t, n), t.child;
    }
  }
  function Fm(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Vm[r] || (Vm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Qe(t) || "Unknown";
        Ms[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Ms[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var s = Qe(t) || "Unknown";
        Mm[s] || (f("%s: Function components do not support getDerivedStateFromProps.", s), Mm[s] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Qe(t) || "Unknown";
        Am[u] || (f("%s: Function components do not support contextType.", u), Am[u] = !0);
      }
    }
  }
  var zm = {
    dehydrated: null,
    treeContext: null,
    retryLane: Wt
  };
  function Pm(e) {
    return {
      baseLanes: e,
      cachePool: fT(),
      transitions: null
    };
  }
  function ST(e, t) {
    var n = null;
    return {
      baseLanes: Ue(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function xT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Hp(e, Ss);
  }
  function RT(e, t) {
    return wu(e.childLanes, t);
  }
  function xb(e, t, n) {
    var a = t.pendingProps;
    M1(t) && (t.flags |= Je);
    var r = wa.current, i = !1, l = (t.flags & Je) !== Te;
    if (l || xT(r, e) ? (i = !0, t.flags &= ~Je) : (e === null || e.memoizedState !== null) && (r = BD(r, _y)), r = Pl(r), Zr(t, r), e === null) {
      Ep(t);
      var s = t.memoizedState;
      if (s !== null) {
        var u = s.dehydrated;
        if (u !== null)
          return wT(t, u);
      }
      var v = a.children, h = a.fallback;
      if (i) {
        var C = CT(t, v, h, n), x = t.child;
        return x.memoizedState = Pm(n), t.memoizedState = zm, C;
      } else
        return Hm(t, v);
    } else {
      var M = e.memoizedState;
      if (M !== null) {
        var F = M.dehydrated;
        if (F !== null)
          return _T(e, t, l, a, F, M, n);
      }
      if (i) {
        var H = a.fallback, se = a.children, Se = TT(e, t, se, H, n), be = t.child, qe = e.child.memoizedState;
        return be.memoizedState = qe === null ? Pm(n) : ST(qe, n), be.childLanes = RT(e, n), t.memoizedState = zm, Se;
      } else {
        var He = a.children, j = DT(e, t, He, n);
        return t.memoizedState = null, j;
      }
    }
  }
  function Hm(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Bm(r, a);
    return i.return = e, e.child = i, i;
  }
  function CT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, s, u;
    return (r & Ie) === Re && i !== null ? (s = i, s.childLanes = W, s.pendingProps = l, e.mode & nt && (s.actualDuration = 0, s.actualStartTime = -1, s.selfBaseDuration = 0, s.treeBaseDuration = 0), u = oi(n, r, a, null)) : (s = Bm(l, r), u = oi(n, r, a, null)), s.return = e, u.return = e, s.sibling = u, e.child = s, u;
  }
  function Bm(e, t, n) {
    return RN(e, t, W, null);
  }
  function Rb(e, t) {
    return Qi(e, t);
  }
  function DT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Rb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ie) === Re && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var s = t.deletions;
      s === null ? (t.deletions = [i], t.flags |= xi) : s.push(i);
    }
    return t.child = l, l;
  }
  function TT(e, t, n, a, r) {
    var i = t.mode, l = e.child, s = l.sibling, u = {
      mode: "hidden",
      children: n
    }, v;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Ie) === Re && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var h = t.child;
      v = h, v.childLanes = W, v.pendingProps = u, t.mode & nt && (v.actualDuration = 0, v.actualStartTime = -1, v.selfBaseDuration = l.selfBaseDuration, v.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      v = Rb(l, u), v.subtreeFlags = l.subtreeFlags & vr;
    var C;
    return s !== null ? C = Qi(s, a) : (C = oi(a, i, r, null), C.flags |= wt), C.return = t, v.return = t, v.sibling = C, t.child = v, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Sp(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hm(t, i);
    return l.flags |= wt, t.memoizedState = null, l;
  }
  function jT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, s = Bm(l, i), u = oi(a, i, r, null);
    return u.flags |= wt, s.return = t, u.return = t, s.sibling = u, t.child = s, (t.mode & Ie) !== Re && kl(t, e.child, null, r), u;
  }
  function wT(e, t, n) {
    return (e.mode & Ie) === Re ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = _e) : lp(t) ? e.lanes = wi : e.lanes = Gn, null;
  }
  function _T(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & pr) {
        t.flags &= ~pr;
        var j = jm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Je, null;
        var B = a.children, w = a.fallback, Q = jT(e, t, B, w, l), ve = t.child;
        return ve.memoizedState = Pm(l), t.memoizedState = zm, Q;
      }
    else {
      if (gD(), (t.mode & Ie) === Re)
        return Kc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (lp(r)) {
        var s, u, v;
        {
          var h = VC(r);
          s = h.digest, u = h.message, v = h.stack;
        }
        var C;
        u ? C = new Error(u) : C = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var x = jm(C, s, v);
        return Kc(e, t, l, x);
      }
      var M = Wn(l, e.childLanes);
      if (Aa || M) {
        var F = of();
        if (F !== null) {
          var H = Px(F, l);
          if (H !== Wt && H !== i.retryLane) {
            i.retryLane = H;
            var se = ut;
            Hn(e, H), Ht(F, e, H, se);
          }
        }
        uv();
        var Se = jm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Se);
      } else if (Gg(r)) {
        t.flags |= Je, t.child = e.child;
        var be = t1.bind(null, e);
        return LC(r, be), null;
      } else {
        ND(t, r, i.treeContext);
        var qe = a.children, He = Hm(t, qe);
        return He.flags |= mr, He;
      }
    }
  }
  function Cb(e, t, n) {
    e.lanes = Ue(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ue(a.lanes, t)), Ap(e.return, t, n);
  }
  function OT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === X) {
        var r = a.memoizedState;
        r !== null && Cb(a, n, e);
      } else if (a.tag === k)
        Cb(a, n, e);
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
  function AT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Tc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function MT(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Lm[e])
      if (Lm[e] = !0, typeof e == "string")
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
  function VT(e, t) {
    e !== void 0 && !Wc[e] && (e !== "collapsed" && e !== "hidden" ? (Wc[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wc[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Db(e, t) {
    {
      var n = Pe(e), a = !n && typeof Sa(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function LT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Pe(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Db(e[n], n))
            return;
      } else {
        var a = Sa(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Db(i.value, l))
                return;
              l++;
            }
        } else
          f('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function $m(e, t, n, a, r) {
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
  function Tb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    MT(r), VT(i, r), LT(l, r), On(e, t, l, n);
    var s = wa.current, u = Hp(s, Ss);
    if (u)
      s = Bp(s, Ss), t.flags |= Je;
    else {
      var v = e !== null && (e.flags & Je) !== Te;
      v && OT(t, t.child, n), s = Pl(s);
    }
    if (Zr(t, s), (t.mode & Ie) === Re)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = AT(t.child), C;
          h === null ? (C = t.child, t.child = null) : (C = h.sibling, h.sibling = null), $m(
            t,
            !1,
            // isBackwards
            C,
            h,
            i
          );
          break;
        }
        case "backwards": {
          var x = null, M = t.child;
          for (t.child = null; M !== null; ) {
            var F = M.alternate;
            if (F !== null && Tc(F) === null) {
              t.child = M;
              break;
            }
            var H = M.sibling;
            M.sibling = x, x = M, M = H;
          }
          $m(
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
          $m(
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
  function kT(e, t, n) {
    Fp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = kl(t, null, a, n) : On(e, t, a, n), t.child;
  }
  var jb = !1;
  function UT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, s = i.value;
    {
      "value" in i || jb || (jb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && Da(u, i, "prop", "Context.Provider");
    }
    if (Ny(t, r, s), l !== null) {
      var v = l.value;
      if (Xn(v, s)) {
        if (l.children === i.children && !rc())
          return Cr(e, t, n);
      } else
        MD(t, r, n);
    }
    var h = i.children;
    return On(e, t, h, n), t.child;
  }
  var wb = !1;
  function FT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (wb || (wb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fl(t, n);
    var l = _t(a);
    Oo(t);
    var s;
    return Os.current = t, la(!0), s = i(l), la(!1), gl(), t.flags |= pl, On(e, t, s, n), t.child;
  }
  function Vs() {
    Aa = !0;
  }
  function Qc(e, t) {
    (t.mode & Ie) === Re && e !== null && (e.alternate = null, t.alternate = null, t.flags |= wt);
  }
  function Cr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), rb(), qs(t.lanes), Wn(n, t.childLanes) ? (OD(e, t), t.child) : null;
  }
  function zT(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= xi) : i.push(e), n.flags |= wt, n;
    }
  }
  function Im(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function PT(e, t, n) {
    switch (t.tag) {
      case D:
        Eb(t), t.stateNode, Ll();
        break;
      case A:
        jy(t);
        break;
      case T: {
        var a = t.type;
        Wa(a) && lc(t);
        break;
      }
      case L:
        Fp(t, t.stateNode.containerInfo);
        break;
      case G: {
        var r = t.memoizedProps.value, i = t.type._context;
        Ny(t, i, r);
        break;
      }
      case Z:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= Xe);
          {
            var s = t.stateNode;
            s.effectDuration = 0, s.passiveEffectDuration = 0;
          }
        }
        break;
      case X: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Zr(t, Pl(wa.current)), t.flags |= Je, null;
          var v = t.child, h = v.childLanes;
          if (Wn(n, h))
            return xb(e, t, n);
          Zr(t, Pl(wa.current));
          var C = Cr(e, t, n);
          return C !== null ? C.sibling : null;
        } else
          Zr(t, Pl(wa.current));
        break;
      }
      case k: {
        var x = (e.flags & Je) !== Te, M = Wn(n, t.childLanes);
        if (x) {
          if (M)
            return Tb(e, t, n);
          t.flags |= Je;
        }
        var F = t.memoizedState;
        if (F !== null && (F.rendering = null, F.tail = null, F.lastEffect = null), Zr(t, wa.current), M)
          break;
        return null;
      }
      case ae:
      case Ce:
        return t.lanes = W, yb(e, t, n);
    }
    return Cr(e, t, n);
  }
  function _b(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return zT(e, t, Nv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || rc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        Aa = !0;
      else {
        var i = Im(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Je) === Te)
          return Aa = !1, PT(e, t, n);
        (e.flags & Kf) !== Te ? Aa = !0 : Aa = !1;
      }
    } else if (Aa = !1, rn() && fD(t)) {
      var l = t.index, s = dD();
      ry(t, s, l);
    }
    switch (t.lanes = W, t.tag) {
      case O:
        return ET(e, t, t.type, n);
      case te: {
        var u = t.elementType;
        return bT(e, t, u, n);
      }
      case R: {
        var v = t.type, h = t.pendingProps, C = t.elementType === v ? h : Oa(v, h);
        return km(e, t, v, C, n);
      }
      case T: {
        var x = t.type, M = t.pendingProps, F = t.elementType === x ? M : Oa(x, M);
        return Nb(e, t, x, F, n);
      }
      case D:
        return hT(e, t, n);
      case A:
        return gT(e, t, n);
      case I:
        return yT(e, t);
      case X:
        return xb(e, t, n);
      case L:
        return kT(e, t, n);
      case Y: {
        var H = t.type, se = t.pendingProps, Se = t.elementType === H ? se : Oa(H, se);
        return vb(e, t, H, Se, n);
      }
      case ie:
        return pT(e, t, n);
      case ne:
        return mT(e, t, n);
      case Z:
        return vT(e, t, n);
      case G:
        return UT(e, t, n);
      case pe:
        return FT(e, t, n);
      case z: {
        var be = t.type, qe = t.pendingProps, He = Oa(be, qe);
        if (t.type !== t.elementType) {
          var j = be.propTypes;
          j && Da(
            j,
            He,
            // Resolved for outer only
            "prop",
            Qe(be)
          );
        }
        return He = Oa(be.type, He), hb(e, t, be, He, n);
      }
      case _:
        return gb(e, t, t.type, t.pendingProps, n);
      case q: {
        var B = t.type, w = t.pendingProps, Q = t.elementType === B ? w : Oa(B, w);
        return NT(e, t, B, Q, n);
      }
      case k:
        return Tb(e, t, n);
      case ce:
        break;
      case ae:
        return yb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= Xe;
  }
  function Ob(e) {
    e.flags |= Ri, e.flags |= Qf;
  }
  var Ab, Ym, Mb, Vb;
  Ab = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === A || r.tag === I)
        sC(e, r.stateNode);
      else if (r.tag !== L) {
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
  }, Ym = function(e, t) {
  }, Mb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, s = zp(), u = cC(l, n, i, a, r, s);
      t.updateQueue = u, u && ql(t);
    }
  }, Vb = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Ls(e, t) {
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = W, a = Te;
    if (t) {
      if ((e.mode & nt) !== Re) {
        for (var u = e.selfBaseDuration, v = e.child; v !== null; )
          n = Ue(n, Ue(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, u += v.treeBaseDuration, v = v.sibling;
        e.treeBaseDuration = u;
      } else
        for (var h = e.child; h !== null; )
          n = Ue(n, Ue(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, h.return = e, h = h.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & nt) !== Re) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Ue(n, Ue(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var s = e.child; s !== null; )
          n = Ue(n, Ue(s.lanes, s.childLanes)), a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function HT(e, t, n) {
    if (CD() && (t.mode & Ie) !== Re && (t.flags & Je) === Te)
      return fy(t), Ll(), t.flags |= pr | Su | _n, !1;
    var a = fc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (xD(t), on(t), (t.mode & nt) !== Re) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ll(), (t.flags & Je) === Te && (t.memoizedState = null), t.flags |= Xe, on(t), (t.mode & nt) !== Re) {
          var l = n !== null;
          if (l) {
            var s = t.child;
            s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return dy(), !0;
  }
  function Lb(e, t, n) {
    var a = t.pendingProps;
    switch (gp(t), t.tag) {
      case O:
      case te:
      case _:
      case R:
      case Y:
      case ie:
      case ne:
      case Z:
      case pe:
      case z:
        return on(t), null;
      case T: {
        var r = t.type;
        return Wa(r) && ic(t), on(t), null;
      }
      case D: {
        var i = t.stateNode;
        if (zl(t), pp(t), Ip(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = fc(t);
          if (l)
            ql(t);
          else if (e !== null) {
            var s = e.memoizedState;
            // Check if this is a client root
            (!s.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & pr) !== Te) && (t.flags |= ml, dy());
          }
        }
        return Ym(e, t), on(t), null;
      }
      case A: {
        Pp(t);
        var u = Ty(), v = t.type;
        if (e !== null && t.stateNode != null)
          Mb(e, t, v, a, u), e.ref !== t.ref && Ob(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return on(t), null;
          }
          var h = zp(), C = fc(t);
          if (C)
            ED(t, u, h) && ql(t);
          else {
            var x = oC(v, a, u, h, t);
            Ab(x, t, !1, !1), t.stateNode = x, uC(x, v, a, u) && ql(t);
          }
          t.ref !== null && Ob(t);
        }
        return on(t), null;
      }
      case I: {
        var M = a;
        if (e && t.stateNode != null) {
          var F = e.memoizedProps;
          Vb(e, t, F, M);
        } else {
          if (typeof M != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var H = Ty(), se = zp(), Se = fc(t);
          Se ? SD(t) && ql(t) : t.stateNode = fC(M, H, se, t);
        }
        return on(t), null;
      }
      case X: {
        Hl(t);
        var be = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = HT(e, t, be);
          if (!qe)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Je) !== Te)
          return t.lanes = n, (t.mode & nt) !== Re && vm(t), t;
        var He = be !== null, j = e !== null && e.memoizedState !== null;
        if (He !== j && He) {
          var B = t.child;
          if (B.flags |= Ci, (t.mode & Ie) !== Re) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || Hp(wa.current, _y) ? Bj() : uv();
          }
        }
        var Q = t.updateQueue;
        if (Q !== null && (t.flags |= Xe), on(t), (t.mode & nt) !== Re && He) {
          var ve = t.child;
          ve !== null && (t.treeBaseDuration -= ve.treeBaseDuration);
        }
        return null;
      }
      case L:
        return zl(t), Ym(e, t), e === null && rD(t.stateNode.containerInfo), on(t), null;
      case G:
        var ue = t.type._context;
        return Op(ue, t), on(t), null;
      case q: {
        var je = t.type;
        return Wa(je) && ic(t), on(t), null;
      }
      case k: {
        Hl(t);
        var Me = t.memoizedState;
        if (Me === null)
          return on(t), null;
        var rt = (t.flags & Je) !== Te, We = Me.rendering;
        if (We === null)
          if (rt)
            Ls(Me, !1);
          else {
            var Rt = Ij() && (e === null || (e.flags & Je) === Te);
            if (!Rt)
              for (var Ke = t.child; Ke !== null; ) {
                var xt = Tc(Ke);
                if (xt !== null) {
                  rt = !0, t.flags |= Je, Ls(Me, !1);
                  var En = xt.updateQueue;
                  return En !== null && (t.updateQueue = En, t.flags |= Xe), t.subtreeFlags = Te, AD(t, n), Zr(t, Bp(wa.current, Ss)), t.child;
                }
                Ke = Ke.sibling;
              }
            Me.tail !== null && qt() > nN() && (t.flags |= Je, rt = !0, Ls(Me, !1), t.lanes = Vh);
          }
        else {
          if (!rt) {
            var dn = Tc(We);
            if (dn !== null) {
              t.flags |= Je, rt = !0;
              var ea = dn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Xe), Ls(Me, !0), Me.tail === null && Me.tailMode === "hidden" && !We.alternate && !rn())
                return on(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Me.renderingStartTime > nN() && n !== Gn && (t.flags |= Je, rt = !0, Ls(Me, !1), t.lanes = Vh);
          }
          if (Me.isBackwards)
            We.sibling = t.child, t.child = We;
          else {
            var Vn = Me.last;
            Vn !== null ? Vn.sibling = We : t.child = We, Me.last = We;
          }
        }
        if (Me.tail !== null) {
          var Ln = Me.tail;
          Me.rendering = Ln, Me.tail = Ln.sibling, Me.renderingStartTime = qt(), Ln.sibling = null;
          var Sn = wa.current;
          return rt ? Sn = Bp(Sn, Ss) : Sn = Pl(Sn), Zr(t, Sn), Ln;
        }
        return on(t), null;
      }
      case ce:
        break;
      case ae:
      case Ce: {
        sv(t);
        var _r = t.memoizedState, eo = _r !== null;
        if (e !== null) {
          var Xs = e.memoizedState, nr = Xs !== null;
          nr !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Qt && (t.flags |= Ci);
        }
        return !eo || (t.mode & Ie) === Re ? on(t) : Wn(tr, Gn) && (on(t), t.subtreeFlags & (wt | Xe) && (t.flags |= Ci)), null;
      }
      case Ve:
        return null;
      case ye:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function BT(e, t, n) {
    switch (gp(t), t.tag) {
      case T: {
        var a = t.type;
        Wa(a) && ic(t);
        var r = t.flags;
        return r & _n ? (t.flags = r & ~_n | Je, (t.mode & nt) !== Re && vm(t), t) : null;
      }
      case D: {
        t.stateNode, zl(t), pp(t), Ip();
        var i = t.flags;
        return (i & _n) !== Te && (i & Je) === Te ? (t.flags = i & ~_n | Je, t) : null;
      }
      case A:
        return Pp(t), null;
      case X: {
        Hl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ll();
        }
        var s = t.flags;
        return s & _n ? (t.flags = s & ~_n | Je, (t.mode & nt) !== Re && vm(t), t) : null;
      }
      case k:
        return Hl(t), null;
      case L:
        return zl(t), null;
      case G:
        var u = t.type._context;
        return Op(u, t), null;
      case ae:
      case Ce:
        return sv(t), null;
      case Ve:
        return null;
      default:
        return null;
    }
  }
  function kb(e, t, n) {
    switch (gp(t), t.tag) {
      case T: {
        var a = t.type.childContextTypes;
        a != null && ic(t);
        break;
      }
      case D: {
        t.stateNode, zl(t), pp(t), Ip();
        break;
      }
      case A: {
        Pp(t);
        break;
      }
      case L:
        zl(t);
        break;
      case X:
        Hl(t);
        break;
      case k:
        Hl(t);
        break;
      case G:
        var r = t.type._context;
        Op(r, t);
        break;
      case ae:
      case Ce:
        sv(t);
        break;
    }
  }
  var Ub = null;
  Ub = /* @__PURE__ */ new Set();
  var Xc = !1, sn = !1, $T = typeof WeakSet == "function" ? WeakSet : Set, he = null, Gl = null, Wl = null;
  function IT(e) {
    qf(null, function() {
      throw e;
    }), Gf();
  }
  var YT = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & nt)
      try {
        Za(), t.componentWillUnmount();
      } finally {
        Ja(e);
      }
    else
      t.componentWillUnmount();
  };
  function Fb(e, t) {
    try {
      ni(Lt, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function qm(e, t, n) {
    try {
      YT(e, n);
    } catch (a) {
      lt(e, t, a);
    }
  }
  function qT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      lt(e, t, a);
    }
  }
  function zb(e, t) {
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
          if (Xt && ha && e.mode & nt)
            try {
              Za(), a = n(null);
            } finally {
              Ja(e);
            }
          else
            a = n(null);
        } catch (r) {
          lt(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Le(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      lt(e, t, a);
    }
  }
  var Pb = !1;
  function GT(e, t) {
    iC(e.containerInfo), he = t, WT();
    var n = Pb;
    return Pb = !1, n;
  }
  function WT() {
    for (; he !== null; ) {
      var e = he, t = e.child;
      (e.subtreeFlags & Zf) !== Te && t !== null ? (t.return = e, he = t) : KT();
    }
  }
  function KT() {
    for (; he !== null; ) {
      var e = he;
      mt(e);
      try {
        QT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      Yt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, he = t;
        return;
      }
      he = e.return;
    }
  }
  function QT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== Te) {
      switch (mt(e), e.tag) {
        case R:
        case Y:
        case _:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Yi && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Oa(e.type, a), r);
            {
              var s = Ub;
              l === void 0 && !s.has(e.type) && (s.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Le(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case D: {
          {
            var u = e.stateNode;
            _C(u.containerInfo);
          }
          break;
        }
        case A:
        case I:
        case L:
        case q:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      Yt();
    }
  }
  function Ma(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var s = l.destroy;
          l.destroy = void 0, s !== void 0 && ((e & ln) !== Bn ? fx(t) : (e & Lt) !== Bn && wh(t), (e & Ka) !== Bn && Ws(!0), Jc(t, n, s), (e & Ka) !== Bn && Ws(!1), (e & ln) !== Bn ? dx() : (e & Lt) !== Bn && _h());
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
          (e & ln) !== Bn ? ux(t) : (e & Lt) !== Bn && px(t);
          var l = i.create;
          (e & Ka) !== Bn && Ws(!0), i.destroy = l(), (e & Ka) !== Bn && Ws(!1), (e & ln) !== Bn ? cx() : (e & Lt) !== Bn && mx();
          {
            var s = i.destroy;
            if (s !== void 0 && typeof s != "function") {
              var u = void 0;
              (i.tag & Lt) !== Te ? u = "useLayoutEffect" : (i.tag & Ka) !== Te ? u = "useInsertionEffect" : u = "useEffect";
              var v = void 0;
              s === null ? v = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof s.then == "function" ? v = `

It looks like you wrote ` + u + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + u + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : v = " You returned: " + s, f("%s must not return anything besides a function, which is used for clean-up.%s", u, v);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function XT(e, t) {
    if ((t.flags & Xe) !== Te)
      switch (t.tag) {
        case Z: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = nb(), s = t.alternate === null ? "mount" : "update";
          tb() && (s = "nested-update"), typeof i == "function" && i(r, s, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case D:
                var v = u.stateNode;
                v.passiveEffectDuration += n;
                break e;
              case Z:
                var h = u.stateNode;
                h.passiveEffectDuration += n;
                break e;
            }
            u = u.return;
          }
          break;
        }
      }
  }
  function JT(e, t, n, a) {
    if ((n.flags & _o) !== Te)
      switch (n.tag) {
        case R:
        case Y:
        case _: {
          if (!sn)
            if (n.mode & nt)
              try {
                Za(), ni(Lt | Vt, n);
              } finally {
                Ja(n);
              }
            else
              ni(Lt | Vt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Xe && !sn)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), n.mode & nt)
                try {
                  Za(), r.componentDidMount();
                } finally {
                  Ja(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Oa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), n.mode & nt)
                try {
                  Za(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ja(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var s = n.updateQueue;
          s !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), Dy(n, s, r));
          break;
        }
        case D: {
          var u = n.updateQueue;
          if (u !== null) {
            var v = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case A:
                  v = n.child.stateNode;
                  break;
                case T:
                  v = n.child.stateNode;
                  break;
              }
            Dy(n, u, v);
          }
          break;
        }
        case A: {
          var h = n.stateNode;
          if (t === null && n.flags & Xe) {
            var C = n.type, x = n.memoizedProps;
            hC(h, C, x);
          }
          break;
        }
        case I:
          break;
        case L:
          break;
        case Z: {
          {
            var M = n.memoizedProps, F = M.onCommit, H = M.onRender, se = n.stateNode.effectDuration, Se = nb(), be = t === null ? "mount" : "update";
            tb() && (be = "nested-update"), typeof H == "function" && H(n.memoizedProps.id, be, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Se);
            {
              typeof F == "function" && F(n.memoizedProps.id, be, se, Se), Kj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case D:
                    var He = qe.stateNode;
                    He.effectDuration += se;
                    break e;
                  case Z:
                    var j = qe.stateNode;
                    j.effectDuration += se;
                    break e;
                }
                qe = qe.return;
              }
            }
          }
          break;
        }
        case X: {
          lj(e, n);
          break;
        }
        case k:
        case q:
        case ce:
        case ae:
        case Ce:
        case ye:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    sn || n.flags & Ri && Hb(n);
  }
  function ZT(e) {
    switch (e.tag) {
      case R:
      case Y:
      case _: {
        if (e.mode & nt)
          try {
            Za(), Fb(e, e.return);
          } finally {
            Ja(e);
          }
        else
          Fb(e, e.return);
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && qT(e, e.return, t), zb(e, e.return);
        break;
      }
      case A: {
        zb(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === A) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? DC(r) : jC(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === I) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TC(i) : wC(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === ae || a.tag === Ce) && a.memoizedState !== null && a !== e)) {
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
        case A:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & nt)
          try {
            Za(), r = t(a);
          } finally {
            Ja(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Le(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Le(e)), t.current = a;
    }
  }
  function tj(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Bb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Bb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === A) {
        var n = e.stateNode;
        n !== null && oD(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function nj(e) {
    for (var t = e.return; t !== null; ) {
      if ($b(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function $b(e) {
    return e.tag === A || e.tag === D || e.tag === L;
  }
  function Ib(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $b(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== A && t.tag !== I && t.tag !== J; ) {
        if (t.flags & wt || t.child === null || t.tag === L)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & wt))
        return t.stateNode;
    }
  }
  function aj(e) {
    var t = nj(e);
    switch (t.tag) {
      case A: {
        var n = t.stateNode;
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Ib(e);
        Wm(e, a, n);
        break;
      }
      case D:
      case L: {
        var r = t.stateNode.containerInfo, i = Ib(e);
        Gm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gm(e, t, n) {
    var a = e.tag, r = a === A || a === I;
    if (r) {
      var i = e.stateNode;
      t ? SC(n, i, t) : NC(n, i);
    } else if (a !== L) {
      var l = e.child;
      if (l !== null) {
        Gm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Gm(s, t, n), s = s.sibling;
      }
    }
  }
  function Wm(e, t, n) {
    var a = e.tag, r = a === A || a === I;
    if (r) {
      var i = e.stateNode;
      t ? EC(n, i, t) : bC(n, i);
    } else if (a !== L) {
      var l = e.child;
      if (l !== null) {
        Wm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Wm(s, t, n), s = s.sibling;
      }
    }
  }
  var un = null, Va = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case A: {
            un = a.stateNode, Va = !1;
            break e;
          }
          case D: {
            un = a.stateNode.containerInfo, Va = !0;
            break e;
          }
          case L: {
            un = a.stateNode.containerInfo, Va = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (un === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Yb(e, t, n), un = null, Va = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Yb(e, t, a), a = a.sibling;
  }
  function Yb(e, t, n) {
    switch (ix(n), n.tag) {
      case A:
        sn || Kl(n, t);
      case I: {
        {
          var a = un, r = Va;
          un = null, ai(e, t, n), un = a, Va = r, un !== null && (Va ? RC(un, n.stateNode) : xC(un, n.stateNode));
        }
        return;
      }
      case J: {
        un !== null && (Va ? CC(un, n.stateNode) : ip(un, n.stateNode));
        return;
      }
      case L: {
        {
          var i = un, l = Va;
          un = n.stateNode.containerInfo, Va = !0, ai(e, t, n), un = i, Va = l;
        }
        return;
      }
      case R:
      case Y:
      case z:
      case _: {
        if (!sn) {
          var s = n.updateQueue;
          if (s !== null) {
            var u = s.lastEffect;
            if (u !== null) {
              var v = u.next, h = v;
              do {
                var C = h, x = C.destroy, M = C.tag;
                x !== void 0 && ((M & Ka) !== Bn ? Jc(n, t, x) : (M & Lt) !== Bn && (wh(n), n.mode & nt ? (Za(), Jc(n, t, x), Ja(n)) : Jc(n, t, x), _h())), h = h.next;
              } while (h !== v);
            }
          }
        }
        ai(e, t, n);
        return;
      }
      case T: {
        if (!sn) {
          Kl(n, t);
          var F = n.stateNode;
          typeof F.componentWillUnmount == "function" && qm(n, t, F);
        }
        ai(e, t, n);
        return;
      }
      case ce: {
        ai(e, t, n);
        return;
      }
      case ae: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ie
        ) {
          var H = sn;
          sn = H || n.memoizedState !== null, ai(e, t, n), sn = H;
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
  function ij(e) {
    e.memoizedState;
  }
  function lj(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && IC(i);
        }
      }
    }
  }
  function qb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new $T()), t.forEach(function(a) {
        var r = n1.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), Ra)
            if (Gl !== null && Wl !== null)
              Gs(Wl, Gl);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function oj(e, t, n) {
    Gl = n, Wl = e, mt(t), Gb(t, e), mt(t), Gl = null, Wl = null;
  }
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          rj(e, t, i);
        } catch (u) {
          lt(i, t, u);
        }
      }
    var l = fu();
    if (t.subtreeFlags & ed)
      for (var s = t.child; s !== null; )
        mt(s), Gb(s, e), s = s.sibling;
    mt(l);
  }
  function Gb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case Y:
      case z:
      case _: {
        if (La(t, e), er(e), r & Xe) {
          try {
            Ma(Ka | Vt, e, e.return), ni(Ka | Vt, e);
          } catch (je) {
            lt(e, e.return, je);
          }
          if (e.mode & nt) {
            try {
              Za(), Ma(Lt | Vt, e, e.return);
            } catch (je) {
              lt(e, e.return, je);
            }
            Ja(e);
          } else
            try {
              Ma(Lt | Vt, e, e.return);
            } catch (je) {
              lt(e, e.return, je);
            }
        }
        return;
      }
      case T: {
        La(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        return;
      }
      case A: {
        La(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              qg(i);
            } catch (je) {
              lt(e, e.return, je);
            }
          }
          if (r & Xe) {
            var l = e.stateNode;
            if (l != null) {
              var s = e.memoizedProps, u = a !== null ? a.memoizedProps : s, v = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  gC(l, h, v, u, s, e);
                } catch (je) {
                  lt(e, e.return, je);
                }
            }
          }
        }
        return;
      }
      case I: {
        if (La(t, e), er(e), r & Xe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, x = e.memoizedProps, M = a !== null ? a.memoizedProps : x;
          try {
            yC(C, M, x);
          } catch (je) {
            lt(e, e.return, je);
          }
        }
        return;
      }
      case D: {
        if (La(t, e), er(e), r & Xe && a !== null) {
          var F = a.memoizedState;
          if (F.isDehydrated)
            try {
              $C(t.containerInfo);
            } catch (je) {
              lt(e, e.return, je);
            }
        }
        return;
      }
      case L: {
        La(t, e), er(e);
        return;
      }
      case X: {
        La(t, e), er(e);
        var H = e.child;
        if (H.flags & Ci) {
          var se = H.stateNode, Se = H.memoizedState, be = Se !== null;
          if (se.isHidden = be, be) {
            var qe = H.alternate !== null && H.alternate.memoizedState !== null;
            qe || Hj();
          }
        }
        if (r & Xe) {
          try {
            ij(e);
          } catch (je) {
            lt(e, e.return, je);
          }
          qb(e);
        }
        return;
      }
      case ae: {
        var He = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ie
        ) {
          var j = sn;
          sn = j || He, La(t, e), sn = j;
        } else
          La(t, e);
        if (er(e), r & Ci) {
          var B = e.stateNode, w = e.memoizedState, Q = w !== null, ve = e;
          if (B.isHidden = Q, Q && !He && (ve.mode & Ie) !== Re) {
            he = ve;
            for (var ue = ve.child; ue !== null; )
              he = ue, uj(ue), ue = ue.sibling;
          }
          ej(ve, Q);
        }
        return;
      }
      case k: {
        La(t, e), er(e), r & Xe && qb(e);
        return;
      }
      case ce:
        return;
      default: {
        La(t, e), er(e);
        return;
      }
    }
  }
  function er(e) {
    var t = e.flags;
    if (t & wt) {
      try {
        aj(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      e.flags &= ~wt;
    }
    t & mr && (e.flags &= ~mr);
  }
  function sj(e, t, n) {
    Gl = n, Wl = t, he = e, Wb(e, t, n), Gl = null, Wl = null;
  }
  function Wb(e, t, n) {
    for (var a = (e.mode & Ie) !== Re; he !== null; ) {
      var r = he, i = r.child;
      if (r.tag === ae && a) {
        var l = r.memoizedState !== null, s = l || Xc;
        if (s) {
          Km(e, t, n);
          continue;
        } else {
          var u = r.alternate, v = u !== null && u.memoizedState !== null, h = v || sn, C = Xc, x = sn;
          Xc = s, sn = h, sn && !x && (he = r, cj(r));
          for (var M = i; M !== null; )
            he = M, Wb(
              M,
              // New root; bubble back up to here and stop.
              t,
              n
            ), M = M.sibling;
          he = r, Xc = C, sn = x, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== Te && i !== null ? (i.return = r, he = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; he !== null; ) {
      var a = he;
      if ((a.flags & _o) !== Te) {
        var r = a.alternate;
        mt(a);
        try {
          JT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
        }
        Yt();
      }
      if (a === e) {
        he = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, he = i;
        return;
      }
      he = a.return;
    }
  }
  function uj(e) {
    for (; he !== null; ) {
      var t = he, n = t.child;
      switch (t.tag) {
        case R:
        case Y:
        case z:
        case _: {
          if (t.mode & nt)
            try {
              Za(), Ma(Lt, t, t.return);
            } finally {
              Ja(t);
            }
          else
            Ma(Lt, t, t.return);
          break;
        }
        case T: {
          Kl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && qm(t, t.return, a);
          break;
        }
        case A: {
          Kl(t, t.return);
          break;
        }
        case ae: {
          var r = t.memoizedState !== null;
          if (r) {
            Kb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, he = n) : Kb(e);
    }
  }
  function Kb(e) {
    for (; he !== null; ) {
      var t = he;
      if (t === e) {
        he = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, he = n;
        return;
      }
      he = t.return;
    }
  }
  function cj(e) {
    for (; he !== null; ) {
      var t = he, n = t.child;
      if (t.tag === ae) {
        var a = t.memoizedState !== null;
        if (a) {
          Qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, he = n) : Qb(e);
    }
  }
  function Qb(e) {
    for (; he !== null; ) {
      var t = he;
      mt(t);
      try {
        ZT(t);
      } catch (a) {
        lt(t, t.return, a);
      }
      if (Yt(), t === e) {
        he = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, he = n;
        return;
      }
      he = t.return;
    }
  }
  function fj(e, t, n, a) {
    he = t, dj(t, e, n, a);
  }
  function dj(e, t, n, a) {
    for (; he !== null; ) {
      var r = he, i = r.child;
      (r.subtreeFlags & vl) !== Te && i !== null ? (i.return = r, he = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; he !== null; ) {
      var r = he;
      if ((r.flags & Fr) !== Te) {
        mt(r);
        try {
          mj(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
        }
        Yt();
      }
      if (r === e) {
        he = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, he = i;
        return;
      }
      he = r.return;
    }
  }
  function mj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case Y:
      case _: {
        if (t.mode & nt) {
          mm();
          try {
            ni(ln | Vt, t);
          } finally {
            pm(t);
          }
        } else
          ni(ln | Vt, t);
        break;
      }
    }
  }
  function vj(e) {
    he = e, hj();
  }
  function hj() {
    for (; he !== null; ) {
      var e = he, t = e.child;
      if ((he.flags & xi) !== Te) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            he = r, bj(r, e);
          }
          {
            var i = e.alternate;
            if (i !== null) {
              var l = i.child;
              if (l !== null) {
                i.child = null;
                do {
                  var s = l.sibling;
                  l.sibling = null, l = s;
                } while (l !== null);
              }
            }
          }
          he = e;
        }
      }
      (e.subtreeFlags & vl) !== Te && t !== null ? (t.return = e, he = t) : gj();
    }
  }
  function gj() {
    for (; he !== null; ) {
      var e = he;
      (e.flags & Fr) !== Te && (mt(e), yj(e), Yt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, he = t;
        return;
      }
      he = e.return;
    }
  }
  function yj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case _: {
        e.mode & nt ? (mm(), Ma(ln | Vt, e, e.return), pm(e)) : Ma(ln | Vt, e, e.return);
        break;
      }
    }
  }
  function bj(e, t) {
    for (; he !== null; ) {
      var n = he;
      mt(n), Ej(n, t), Yt();
      var a = n.child;
      a !== null ? (a.return = n, he = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; he !== null; ) {
      var t = he, n = t.sibling, a = t.return;
      if (Bb(t), t === e) {
        he = null;
        return;
      }
      if (n !== null) {
        n.return = a, he = n;
        return;
      }
      he = a;
    }
  }
  function Ej(e, t) {
    switch (e.tag) {
      case R:
      case Y:
      case _: {
        e.mode & nt ? (mm(), Ma(ln, e, t), pm(e)) : Ma(ln, e, t);
        break;
      }
    }
  }
  function Sj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case _: {
        try {
          ni(Lt | Vt, e);
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
  function xj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case _: {
        try {
          ni(ln | Vt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function Rj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case _: {
        try {
          Ma(Lt | Vt, e, e.return);
        } catch (n) {
          lt(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && qm(e, e.return, t);
        break;
      }
    }
  }
  function Cj(e) {
    switch (e.tag) {
      case R:
      case Y:
      case _:
        try {
          Ma(ln | Vt, e, e.return);
        } catch (t) {
          lt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var ks = Symbol.for;
    ks("selector.component"), ks("selector.has_pseudo_class"), ks("selector.role"), ks("selector.test_id"), ks("selector.text");
  }
  var Dj = [];
  function Tj() {
    Dj.forEach(function(e) {
      return e();
    });
  }
  var jj = m.ReactCurrentActQueue;
  function wj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Xb() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && jj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var _j = Math.ceil, Qm = m.ReactCurrentDispatcher, Xm = m.ReactCurrentOwner, cn = m.ReactCurrentBatchConfig, ka = m.ReactCurrentActQueue, Ft = (
    /*             */
    0
  ), Jb = (
    /*               */
    1
  ), fn = (
    /*                */
    2
  ), da = (
    /*                */
    4
  ), Dr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, Zb = 5, Jm = 6, Ye = Ft, An = null, bt = null, zt = W, tr = W, Zm = Gr(W), Pt = Dr, zs = null, ef = W, Ps = W, tf = W, Hs = null, $n = null, ev = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    tN = qt() + Oj;
  }
  function nN() {
    return tN;
  }
  var nf = !1, tv = null, Ql = null, Gi = !1, ri = null, $s = W, nv = [], av = null, Aj = 50, Is = 0, rv = null, iv = !1, af = !1, Mj = 50, Xl = 0, rf = null, Ys = ut, lf = W, aN = !1;
  function of() {
    return An;
  }
  function Mn() {
    return (Ye & (fn | da)) !== Ft ? qt() : (Ys !== ut || (Ys = qt()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ie) === Re)
      return _e;
    if ((Ye & fn) !== Ft && zt !== W)
      return Uo(zt);
    var n = jD() !== TD;
    if (n) {
      if (cn.transition !== null) {
        var a = cn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return lf === Wt && (lf = Fh()), lf;
    }
    var r = Ca();
    if (r !== Wt)
      return r;
    var i = dC();
    return i;
  }
  function Vj(e) {
    var t = e.mode;
    return (t & Ie) === Re ? _e : kx();
  }
  function Ht(e, t, n, a) {
    r1(), aN && f("useInsertionEffect must not schedule updates."), iv && (af = !0), Fo(e, n, a), (Ye & fn) !== W && e === An ? o1(t) : (Ra && Hh(e, t, n), s1(t), e === An && ((Ye & fn) === Ft && (Ps = Ue(Ps, n)), Pt === Fs && li(e, zt)), In(e, a), n === _e && Ye === Ft && (t.mode & Ie) === Re && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !ka.isBatchingLegacy && (Bs(), ay()));
  }
  function Lj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), In(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ye & fn) !== Ft
    );
  }
  function In(e, t) {
    var n = e.callbackNode;
    _x(e, t);
    var a = Tu(e, e === An ? zt : W);
    if (a === W) {
      n !== null && bN(n), e.callbackNode = null, e.callbackPriority = Wt;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(ka.current !== null && n !== dv)) {
      n == null && i !== _e && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && bN(n);
    var l;
    if (r === _e)
      e.tag === Wr ? (ka.isBatchingLegacy !== null && (ka.didScheduleLegacyUpdate = !0), cD(lN.bind(null, e))) : ny(lN.bind(null, e)), ka.current !== null ? ka.current.push(Kr) : mC(function() {
        (Ye & (fn | da)) === Ft && Kr();
      }), l = null;
    else {
      var s;
      switch (Ih(a)) {
        case Kn:
          s = xu;
          break;
        case gr:
          s = td;
          break;
        case yr:
          s = ji;
          break;
        case _u:
          s = nd;
          break;
        default:
          s = ji;
          break;
      }
      l = pv(s, rN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function rN(e, t) {
    if (eT(), Ys = ut, lf = W, (Ye & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = wr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Tu(e, e === An ? zt : W);
    if (r === W)
      return null;
    var i = !ju(e, r) && !Lx(e, r) && !t, l = i ? qj(e, r) : uf(e, r);
    if (l !== Dr) {
      if (l === qi) {
        var s = Rd(e);
        s !== W && (r = s, l = lv(e, s));
      }
      if (l === Us) {
        var u = zs;
        throw Wi(e, W), li(e, r), In(e, qt()), u;
      }
      if (l === Jm)
        li(e, r);
      else {
        var v = !ju(e, r), h = e.current.alternate;
        if (v && !Fj(h)) {
          if (l = uf(e, r), l === qi) {
            var C = Rd(e);
            C !== W && (r = C, l = lv(e, C));
          }
          if (l === Us) {
            var x = zs;
            throw Wi(e, W), li(e, r), In(e, qt()), x;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return In(e, qt()), e.callbackNode === n ? rN.bind(null, e) : null;
  }
  function lv(e, t) {
    var n = Hs;
    if (Ou(e)) {
      var a = Wi(e, t);
      a.flags |= pr, aD(e.containerInfo);
    }
    var r = uf(e, t);
    if (r !== qi) {
      var i = $n;
      $n = n, i !== null && iN(i);
    }
    return r;
  }
  function iN(e) {
    $n === null ? $n = e : $n.push.apply($n, e);
  }
  function Uj(e, t, n) {
    switch (t) {
      case Dr:
      case Us:
        throw new Error("Root did not complete. This is a bug in React.");
      case qi: {
        Ki(e, $n, Tr);
        break;
      }
      case Zc: {
        if (li(e, n), kh(n) && // do not delay if we're inside an act() scope
        !NN()) {
          var a = ev + eN - qt();
          if (a > 10) {
            var r = Tu(e, W);
            if (r !== W)
              break;
            var i = e.suspendedLanes;
            if (!El(i, n)) {
              Mn(), Ph(e, i);
              break;
            }
            e.timeoutHandle = ap(Ki.bind(null, e, $n, Tr), a);
            break;
          }
        }
        Ki(e, $n, Tr);
        break;
      }
      case Fs: {
        if (li(e, n), Vx(n))
          break;
        if (!NN()) {
          var l = jx(e, n), s = l, u = qt() - s, v = a1(u) - u;
          if (v > 10) {
            e.timeoutHandle = ap(Ki.bind(null, e, $n, Tr), v);
            break;
          }
        }
        Ki(e, $n, Tr);
        break;
      }
      case Zb: {
        Ki(e, $n, Tr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function Fj(e) {
    for (var t = e; ; ) {
      if (t.flags & Wf) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, s = i.value;
              try {
                if (!Xn(l(), s))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var u = t.child;
      if (t.subtreeFlags & Wf && u !== null) {
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
  function li(e, t) {
    t = wu(t, tf), t = wu(t, Ps), Fx(e, t);
  }
  function lN(e) {
    if (tT(), (Ye & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    wr();
    var t = Tu(e, W);
    if (!Wn(t, _e))
      return In(e, qt()), null;
    var n = uf(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rd(e);
      a !== W && (t = a, n = lv(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, W), li(e, t), In(e, qt()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, $n, Tr), In(e, qt()), null;
  }
  function zj(e, t) {
    t !== W && (jd(e, Ue(t, _e)), In(e, qt()), (Ye & (fn | da)) === Ft && (Bs(), Kr()));
  }
  function ov(e, t) {
    var n = Ye;
    Ye |= Jb;
    try {
      return e(t);
    } finally {
      Ye = n, Ye === Ft && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ka.isBatchingLegacy && (Bs(), ay());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = Ca(), l = cn.transition;
    try {
      return cn.transition = null, Kt(Kn), e(t, n, a, r);
    } finally {
      Kt(i), cn.transition = l, Ye === Ft && Bs();
    }
  }
  function jr(e) {
    ri !== null && ri.tag === Wr && (Ye & (fn | da)) === Ft && wr();
    var t = Ye;
    Ye |= Jb;
    var n = cn.transition, a = Ca();
    try {
      return cn.transition = null, Kt(Kn), e ? e() : void 0;
    } finally {
      Kt(a), cn.transition = n, Ye = t, (Ye & (fn | da)) === Ft && Kr();
    }
  }
  function oN() {
    return (Ye & (fn | da)) !== Ft;
  }
  function sf(e, t) {
    bn(Zm, tr, e), tr = Ue(tr, t);
  }
  function sv(e) {
    tr = Zm.current, yn(Zm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = W;
    var n = e.timeoutHandle;
    if (n !== rp && (e.timeoutHandle = rp, pC(n)), bt !== null)
      for (var a = bt.return; a !== null; ) {
        var r = a.alternate;
        kb(r, a), a = a.return;
      }
    An = e;
    var i = Qi(e.current, null);
    return bt = i, zt = tr = t, Pt = Dr, zs = null, ef = W, Ps = W, tf = W, Hs = null, $n = null, LD(), ja.discardPendingWarnings(), i;
  }
  function sN(e, t) {
    do {
      var n = bt;
      try {
        if (gc(), Ay(), Yt(), Xm.current = null, n === null || n.return === null) {
          Pt = Us, zs = t, bt = null;
          return;
        }
        if (Xt && n.mode & nt && qc(n, !0), Yn)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            hx(n, a, zt);
          } else
            vx(n, t, zt);
        cT(e, n.return, n, t, zt), dN(n);
      } catch (r) {
        t = r, bt === n && n !== null ? (n = n.return, bt = n) : n = bt;
        continue;
      }
      return;
    } while (!0);
  }
  function uN() {
    var e = Qm.current;
    return Qm.current = Hc, e === null ? Hc : e;
  }
  function cN(e) {
    Qm.current = e;
  }
  function Hj() {
    ev = qt();
  }
  function qs(e) {
    ef = Ue(e, ef);
  }
  function Bj() {
    Pt === Dr && (Pt = Zc);
  }
  function uv() {
    (Pt === Dr || Pt === Zc || Pt === qi) && (Pt = Fs), An !== null && (Cd(ef) || Cd(Ps)) && li(An, zt);
  }
  function $j(e) {
    Pt !== Fs && (Pt = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Ij() {
    return Pt === Dr;
  }
  function uf(e, t) {
    var n = Ye;
    Ye |= fn;
    var a = uN();
    if (An !== e || zt !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, zt), r.clear()), Bh(e, t);
      }
      Tr = $h(), Wi(e, t);
    }
    Oh(t);
    do
      try {
        Yj();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    if (gc(), Ye = n, cN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Ah(), An = null, zt = W, Pt;
  }
  function Yj() {
    for (; bt !== null; )
      fN(bt);
  }
  function qj(e, t) {
    var n = Ye;
    Ye |= fn;
    var a = uN();
    if (An !== e || zt !== t) {
      if (Ra) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, zt), r.clear()), Bh(e, t);
      }
      Tr = $h(), Bs(), Wi(e, t);
    }
    Oh(t);
    do
      try {
        Gj();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    return gc(), cN(a), Ye = n, bt !== null ? (Ex(), Dr) : (Ah(), An = null, zt = W, Pt);
  }
  function Gj() {
    for (; bt !== null && !KS(); )
      fN(bt);
  }
  function fN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== Re ? (dm(e), n = cv(t, e, tr), qc(e, !0)) : n = cv(t, e, tr), Yt(), e.memoizedProps = e.pendingProps, n === null ? dN(e) : bt = n, Xm.current = null;
  }
  function dN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Su) === Te) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === Re ? r = Lb(n, t, tr) : (dm(t), r = Lb(n, t, tr), qc(t, !1)), Yt(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = BT(n, t);
        if (i !== null) {
          i.flags &= $S, bt = i;
          return;
        }
        if ((t.mode & nt) !== Re) {
          qc(t, !1);
          for (var l = t.actualDuration, s = t.child; s !== null; )
            l += s.actualDuration, s = s.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Su, a.subtreeFlags = Te, a.deletions = null;
        else {
          Pt = Jm, bt = null;
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
    Pt === Dr && (Pt = Zb);
  }
  function Ki(e, t, n) {
    var a = Ca(), r = cn.transition;
    try {
      cn.transition = null, Kt(Kn), Wj(e, t, n, a);
    } finally {
      cn.transition = r, Kt(a);
    }
    return null;
  }
  function Wj(e, t, n, a) {
    do
      wr();
    while (ri !== null);
    if (i1(), (Ye & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sx(i), r === null)
      return jh(), null;
    if (i === W && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = W, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = Ue(r.lanes, r.childLanes);
    zx(e, l), e === An && (An = null, bt = null, zt = W), ((r.subtreeFlags & vl) !== Te || (r.flags & vl) !== Te) && (Gi || (Gi = !0, av = n, pv(ji, function() {
      return wr(), null;
    })));
    var s = (r.subtreeFlags & (Zf | ed | _o | vl)) !== Te, u = (r.flags & (Zf | ed | _o | vl)) !== Te;
    if (s || u) {
      var v = cn.transition;
      cn.transition = null;
      var h = Ca();
      Kt(Kn);
      var C = Ye;
      Ye |= da, Xm.current = null, GT(e, r), ab(), oj(e, r, i), lC(e.containerInfo), e.current = r, gx(i), sj(r, e, i), yx(), QS(), Ye = C, Kt(h), cn.transition = v;
    } else
      e.current = r, ab();
    var x = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Xl = 0, rf = null), l = e.pendingLanes, l === W && (Ql = null), x || hN(e.current, !1), ax(r.stateNode, a), Ra && e.memoizedUpdaters.clear(), Tj(), In(e, qt()), t !== null)
      for (var M = e.onRecoverableError, F = 0; F < t.length; F++) {
        var H = t[F], se = H.stack, Se = H.digest;
        M(H.value, {
          componentStack: se,
          digest: Se
        });
      }
    if (nf) {
      nf = !1;
      var be = tv;
      throw tv = null, be;
    }
    return Wn($s, _e) && e.tag !== Wr && wr(), l = e.pendingLanes, Wn(l, _e) ? (ZD(), e === rv ? Is++ : (Is = 0, rv = e)) : Is = 0, Kr(), jh(), null;
  }
  function wr() {
    if (ri !== null) {
      var e = Ih($s), t = $x(yr, e), n = cn.transition, a = Ca();
      try {
        return cn.transition = null, Kt(t), Qj();
      } finally {
        Kt(a), cn.transition = n;
      }
    }
    return !1;
  }
  function Kj(e) {
    nv.push(e), Gi || (Gi = !0, pv(ji, function() {
      return wr(), null;
    }));
  }
  function Qj() {
    if (ri === null)
      return !1;
    var e = av;
    av = null;
    var t = ri, n = $s;
    if (ri = null, $s = W, (Ye & (fn | da)) !== Ft)
      throw new Error("Cannot flush passive effects while already rendering.");
    iv = !0, af = !1, bx(n);
    var a = Ye;
    Ye |= da, vj(t.current), fj(t, t.current, n, e);
    {
      var r = nv;
      nv = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        XT(t, l);
      }
    }
    Nx(), hN(t.current, !0), Ye = a, Kr(), af ? t === rf ? Xl++ : (Xl = 0, rf = t) : Xl = 0, iv = !1, af = !1, rx(t);
    {
      var s = t.current.stateNode;
      s.effectDuration = 0, s.passiveEffectDuration = 0;
    }
    return !0;
  }
  function pN(e) {
    return Ql !== null && Ql.has(e);
  }
  function Xj(e) {
    Ql === null ? Ql = /* @__PURE__ */ new Set([e]) : Ql.add(e);
  }
  function Jj(e) {
    nf || (nf = !0, tv = e);
  }
  var Zj = Jj;
  function mN(e, t, n) {
    var a = Ii(n, t), r = fb(e, a, _e), i = Xr(e, r, _e), l = Mn();
    i !== null && (Fo(i, _e, l), In(i, l));
  }
  function lt(e, t, n) {
    if (IT(n), Ws(!1), e.tag === D) {
      mN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === D) {
        mN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !pN(i)) {
          var l = Ii(n, e), s = _m(a, l, _e), u = Xr(a, s, _e), v = Mn();
          u !== null && (Fo(u, _e, v), In(u, v));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function e1(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Mn();
    Ph(e, n), u1(e), An === e && El(zt, n) && (Pt === Fs || Pt === Zc && kh(zt) && qt() - ev < eN ? Wi(e, W) : tf = Ue(tf, n)), In(e, r);
  }
  function vN(e, t) {
    t === Wt && (t = Vj(e));
    var n = Mn(), a = Hn(e, t);
    a !== null && (Fo(a, t, n), In(a, n));
  }
  function t1(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), vN(e, n);
  }
  function n1(e, t) {
    var n = Wt, a;
    switch (e.tag) {
      case X:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case k:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), vN(e, n);
  }
  function a1(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : _j(e / 1960) * 1960;
  }
  function r1() {
    if (Is > Aj)
      throw Is = 0, rv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > Mj && (Xl = 0, rf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function i1() {
    ja.flushLegacyContextWarning(), ja.flushPendingUnsafeLifecycleWarnings();
  }
  function hN(e, t) {
    mt(e), cf(e, zr, Rj), t && cf(e, Jf, Cj), cf(e, zr, Sj), t && cf(e, Jf, xj), Yt();
  }
  function cf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Te ? a = a.child : ((a.flags & t) !== Te && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var ff = null;
  function gN(e) {
    {
      if ((Ye & fn) !== Ft || !(e.mode & Ie))
        return;
      var t = e.tag;
      if (t !== O && t !== D && t !== T && t !== R && t !== Y && t !== z && t !== _)
        return;
      var n = Le(e) || "ReactComponent";
      if (ff !== null) {
        if (ff.has(n))
          return;
        ff.add(n);
      } else
        ff = /* @__PURE__ */ new Set([n]);
      var a = Tn;
      try {
        mt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? mt(e) : Yt();
      }
    }
  }
  var cv;
  {
    var l1 = null;
    cv = function(e, t, n) {
      var a = CN(l1, t);
      try {
        return _b(e, t, n);
      } catch (i) {
        if (yD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), Ay(), kb(e, t), CN(t, a), t.mode & nt && dm(t), qf(null, _b, null, e, t, n), PS()) {
          var r = Gf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var yN = !1, fv;
  fv = /* @__PURE__ */ new Set();
  function o1(e) {
    if (bi && !QD())
      switch (e.tag) {
        case R:
        case Y:
        case _: {
          var t = bt && Le(bt) || "Unknown", n = t;
          if (!fv.has(n)) {
            fv.add(n);
            var a = Le(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          yN || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), yN = !0);
          break;
        }
      }
  }
  function Gs(e, t) {
    if (Ra) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Hh(e, a, t);
      });
    }
  }
  var dv = {};
  function pv(e, t) {
    {
      var n = ka.current;
      return n !== null ? (n.push(t), dv) : Th(e, t);
    }
  }
  function bN(e) {
    if (e !== dv)
      return WS(e);
  }
  function NN() {
    return ka.current !== null;
  }
  function s1(e) {
    {
      if (e.mode & Ie) {
        if (!Xb())
          return;
      } else if (!wj() || Ye !== Ft || e.tag !== R && e.tag !== Y && e.tag !== _)
        return;
      if (ka.current === null) {
        var t = Tn;
        try {
          mt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Le(e));
        } finally {
          t ? mt(e) : Yt();
        }
      }
    }
  }
  function u1(e) {
    e.tag !== Wr && Xb() && ka.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Ws(e) {
    aN = e;
  }
  var pa = null, Jl = null, c1 = function(e) {
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
  function mv(e) {
    return Zl(e);
  }
  function vv(e) {
    {
      if (pa === null)
        return e;
      var t = pa(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Zl(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: Ee,
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
  function EN(e, t) {
    {
      if (pa === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case T: {
          typeof a == "function" && (r = !0);
          break;
        }
        case R: {
          (typeof a == "function" || i === xe) && (r = !0);
          break;
        }
        case Y: {
          (i === Ee || i === xe) && (r = !0);
          break;
        }
        case z:
        case _: {
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
  function SN(e) {
    {
      if (pa === null || typeof WeakSet != "function")
        return;
      Jl === null && (Jl = /* @__PURE__ */ new WeakSet()), Jl.add(e);
    }
  }
  var f1 = function(e, t) {
    {
      if (pa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      wr(), jr(function() {
        hv(e.current, a, n);
      });
    }
  }, d1 = function(e, t) {
    {
      if (e.context !== Jn)
        return;
      wr(), jr(function() {
        Ks(t, e, null, null);
      });
    }
  };
  function hv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, s = e.type, u = null;
      switch (l) {
        case R:
        case _:
        case T:
          u = s;
          break;
        case Y:
          u = s.render;
          break;
      }
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var v = !1, h = !1;
      if (u !== null) {
        var C = pa(u);
        C !== void 0 && (n.has(C) ? h = !0 : t.has(C) && (l === T ? h = !0 : v = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || v) {
        var x = Hn(e, _e);
        x !== null && Ht(x, e, _e, ut);
      }
      r !== null && !h && hv(r, t, n), i !== null && hv(i, t, n);
    }
  }
  var p1 = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return gv(e.current, a, n), n;
    }
  };
  function gv(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, s = null;
      switch (i) {
        case R:
        case _:
        case T:
          s = l;
          break;
        case Y:
          s = l.render;
          break;
      }
      var u = !1;
      s !== null && t.has(s) && (u = !0), u ? m1(e, n) : a !== null && gv(a, t, n), r !== null && gv(r, t, n);
    }
  }
  function m1(e, t) {
    {
      var n = v1(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case A:
            t.add(a.stateNode);
            return;
          case L:
            t.add(a.stateNode.containerInfo);
            return;
          case D:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function v1(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === A)
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
  var yv;
  {
    yv = !1;
    try {
      var xN = Object.preventExtensions({});
    } catch {
      yv = !0;
    }
  }
  function h1(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Te, this.subtreeFlags = Te, this.deletions = null, this.lanes = W, this.childLanes = W, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !yv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Zn = function(e, t, n, a) {
    return new h1(e, t, n, a);
  };
  function bv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function g1(e) {
    return typeof e == "function" && !bv(e) && e.defaultProps === void 0;
  }
  function y1(e) {
    if (typeof e == "function")
      return bv(e) ? T : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ee)
        return Y;
      if (t === ke)
        return z;
    }
    return O;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Te, n.subtreeFlags = Te, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case O:
      case R:
      case _:
        n.type = Zl(e.type);
        break;
      case T:
        n.type = mv(e.type);
        break;
      case Y:
        n.type = vv(e.type);
        break;
    }
    return n;
  }
  function b1(e, t) {
    e.flags &= vr | wt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = W, e.lanes = t, e.child = null, e.subtreeFlags = Te, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = Te, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function N1(e, t, n) {
    var a;
    return e === oc ? (a = Ie, t === !0 && (a |= St, a |= Ya)) : a = Re, Ra && (a |= nt), Zn(D, null, null, a);
  }
  function Nv(e, t, n, a, r, i) {
    var l = O, s = e;
    if (typeof e == "function")
      bv(e) ? (l = T, s = mv(s)) : s = Zl(s);
    else if (typeof e == "string")
      l = A;
    else
      e: switch (e) {
        case Ha:
          return oi(n.children, r, i, t);
        case pi:
          l = ne, r |= St, (r & Ie) !== Re && (r |= Ya);
          break;
        case N:
          return E1(n, r, i, t);
        case Be:
          return S1(n, r, i, t);
        case we:
          return x1(n, r, i, t);
        case dt:
          return RN(n, r, i, t);
        case hn:
        case At:
        case Ba:
        case Ea:
        case ft:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case K:
                l = G;
                break e;
              case oe:
                l = pe;
                break e;
              case Ee:
                l = Y, s = vv(s);
                break e;
              case ke:
                l = z;
                break e;
              case xe:
                l = te, s = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var v = a ? Le(a) : null;
            v && (u += `

Check the render method of \`` + v + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
        }
      }
    var h = Zn(l, n, t, r);
    return h.elementType = e, h.type = s, h.lanes = i, h._debugOwner = a, h;
  }
  function Ev(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, s = Nv(r, i, l, a, t, n);
    return s._debugSource = e._source, s._debugOwner = e._owner, s;
  }
  function oi(e, t, n, a) {
    var r = Zn(ie, e, a, t);
    return r.lanes = n, r;
  }
  function E1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(Z, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function S1(e, t, n, a) {
    var r = Zn(X, e, a, t);
    return r.elementType = Be, r.lanes = n, r;
  }
  function x1(e, t, n, a) {
    var r = Zn(k, e, a, t);
    return r.elementType = we, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = Zn(ae, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Sv(e, t, n) {
    var a = Zn(I, e, null, t);
    return a.lanes = n, a;
  }
  function R1() {
    var e = Zn(A, null, null, Re);
    return e.elementType = "DELETED", e;
  }
  function C1(e) {
    var t = Zn(J, null, null, Re);
    return t.stateNode = e, t;
  }
  function xv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(L, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = Zn(O, null, null, Re)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function D1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Wt, this.eventTimes = Td(W), this.expirationTimes = Td(ut), this.pendingLanes = W, this.suspendedLanes = W, this.pingedLanes = W, this.expiredLanes = W, this.mutableReadLanes = W, this.finishedLanes = W, this.entangledLanes = W, this.entanglements = Td(W), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < rd; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case oc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Wr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function DN(e, t, n, a, r, i, l, s, u, v) {
    var h = new D1(e, t, n, s, u), C = N1(t, i);
    h.current = C, C.stateNode = h;
    {
      var x = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      C.memoizedState = x;
    }
    return kp(C), h;
  }
  var Rv = "18.3.1";
  function T1(e, t, n) {
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
  var Cv, Dv;
  Cv = !1, Dv = {};
  function TN(e) {
    if (!e)
      return Jn;
    var t = dl(e), n = uD(t);
    if (t.tag === T) {
      var a = t.type;
      if (Wa(a))
        return ey(t, a, n);
    }
    return n;
  }
  function j1(e, t) {
    {
      var n = dl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Rh(n);
      if (r === null)
        return null;
      if (r.mode & St) {
        var i = Le(n) || "Component";
        if (!Dv[i]) {
          Dv[i] = !0;
          var l = Tn;
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
  function jN(e, t, n, a, r, i, l, s) {
    var u = !1, v = null;
    return DN(e, t, u, v, n, a, r, i, l);
  }
  function wN(e, t, n, a, r, i, l, s, u, v) {
    var h = !0, C = DN(n, a, h, e, r, i, l, s, u);
    C.context = TN(null);
    var x = C.current, M = Mn(), F = ii(x), H = Rr(M, F);
    return H.callback = t ?? null, Xr(x, H, F), Lj(C, F, M), C;
  }
  function Ks(e, t, n, a) {
    nx(t, e);
    var r = t.current, i = Mn(), l = ii(r);
    Sx(l);
    var s = TN(n);
    t.context === null ? t.context = s : t.pendingContext = s, bi && Tn !== null && !Cv && (Cv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Le(Tn) || "Unknown"));
    var u = Rr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var v = Xr(r, u, l);
    return v !== null && (Ht(v, r, l, i), Sc(v, r, l)), l;
  }
  function df(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case A:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function w1(e) {
    switch (e.tag) {
      case D: {
        var t = e.stateNode;
        if (Ou(t)) {
          var n = Ox(t);
          zj(t, n);
        }
        break;
      }
      case X: {
        jr(function() {
          var r = Hn(e, _e);
          if (r !== null) {
            var i = Mn();
            Ht(r, e, _e, i);
          }
        });
        var a = _e;
        Tv(e, a);
        break;
      }
    }
  }
  function _N(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = Ux(n.retryLane, t));
  }
  function Tv(e, t) {
    _N(e, t);
    var n = e.alternate;
    n && _N(n, t);
  }
  function _1(e) {
    if (e.tag === X) {
      var t = Vo, n = Hn(e, t);
      if (n !== null) {
        var a = Mn();
        Ht(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function O1(e) {
    if (e.tag === X) {
      var t = ii(e), n = Hn(e, t);
      if (n !== null) {
        var a = Mn();
        Ht(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function ON(e) {
    var t = GS(e);
    return t === null ? null : t.stateNode;
  }
  var AN = function(e) {
    return null;
  };
  function A1(e) {
    return AN(e);
  }
  var MN = function(e) {
    return !1;
  };
  function M1(e) {
    return MN(e);
  }
  var VN = null, LN = null, kN = null, UN = null, FN = null, zN = null, PN = null, HN = null, BN = null;
  {
    var $N = function(e, t, n) {
      var a = t[n], r = Pe(e) ? e.slice() : ze({}, e);
      return n + 1 === t.length ? (Pe(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = $N(e[a], t, n + 1), r);
    }, IN = function(e, t) {
      return $N(e, t, 0);
    }, YN = function(e, t, n, a) {
      var r = t[a], i = Pe(e) ? e.slice() : ze({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Pe(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = YN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, qN = function(e, t, n) {
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
    }, GN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Pe(e) ? e.slice() : ze({}, e);
      return i[r] = GN(e[r], t, n + 1, a), i;
    }, WN = function(e, t, n) {
      return GN(e, t, 0, n);
    }, jv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    VN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = WN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Hn(e, _e);
        l !== null && Ht(l, e, _e, ut);
      }
    }, LN = function(e, t, n) {
      var a = jv(e, t);
      if (a !== null) {
        var r = IN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Hn(e, _e);
        i !== null && Ht(i, e, _e, ut);
      }
    }, kN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Hn(e, _e);
        l !== null && Ht(l, e, _e, ut);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, _e);
      a !== null && Ht(a, e, _e, ut);
    }, FN = function(e, t) {
      e.pendingProps = IN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Hn(e, _e);
      n !== null && Ht(n, e, _e, ut);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Hn(e, _e);
      a !== null && Ht(a, e, _e, ut);
    }, PN = function(e) {
      var t = Hn(e, _e);
      t !== null && Ht(t, e, _e, ut);
    }, HN = function(e) {
      AN = e;
    }, BN = function(e) {
      MN = e;
    };
  }
  function V1(e) {
    var t = Rh(e);
    return t === null ? null : t.stateNode;
  }
  function L1(e) {
    return null;
  }
  function k1() {
    return Tn;
  }
  function U1(e) {
    var t = e.findFiberByHostInstance, n = m.ReactCurrentDispatcher;
    return tx({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: VN,
      overrideHookStateDeletePath: LN,
      overrideHookStateRenamePath: kN,
      overrideProps: UN,
      overridePropsDeletePath: FN,
      overridePropsRenamePath: zN,
      setErrorHandler: HN,
      setSuspenseHandler: BN,
      scheduleUpdate: PN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: V1,
      findFiberByHostInstance: t || L1,
      // React Refresh
      findHostInstancesForRefresh: p1,
      scheduleRefresh: f1,
      scheduleRoot: d1,
      setRefreshHandler: c1,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: k1,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: Rv
    });
  }
  var KN = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function wv(e) {
    this._internalRoot = e;
  }
  pf.prototype.render = wv.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : mf(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== jt) {
        var a = ON(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Ks(e, t, null, null);
  }, pf.prototype.unmount = wv.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      oN() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), jr(function() {
        Ks(null, e, null, null);
      }), Kg(t);
    }
  };
  function F1(e, t) {
    if (!mf(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    QN(e);
    var n = !1, a = !1, r = "", i = KN;
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = jN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var s = e.nodeType === jt ? e.parentNode : e;
    return ts(s), new wv(l);
  }
  function pf(e) {
    this._internalRoot = e;
  }
  function z1(e) {
    e && e0(e);
  }
  pf.prototype.unstable_scheduleHydration = z1;
  function P1(e, t, n) {
    if (!mf(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    QN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, s = "", u = KN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var v = wN(t, null, e, oc, a, i, l, s, u);
    if (ec(v.current, e), ts(e), r)
      for (var h = 0; h < r.length; h++) {
        var C = r[h];
        ID(v, C);
      }
    return new pf(v);
  }
  function mf(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Lf));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Lf || e.nodeType === jt && e.nodeValue === " react-mount-point-unstable "));
  }
  function QN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ds(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var H1 = m.ReactCurrentOwner, XN;
  XN = function(e) {
    if (e._reactRootContainer && e.nodeType !== jt) {
      var t = ON(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = _v(e), r = !!(a && qr(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function _v(e) {
    return e ? e.nodeType === dr ? e.documentElement : e.firstChild : null;
  }
  function JN() {
  }
  function B1(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var x = df(l);
          i.call(x);
        };
      }
      var l = wN(
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
        JN
      );
      e._reactRootContainer = l, ec(l.current, e);
      var s = e.nodeType === jt ? e.parentNode : e;
      return ts(s), jr(), l;
    } else {
      for (var u; u = e.lastChild; )
        e.removeChild(u);
      if (typeof a == "function") {
        var v = a;
        a = function() {
          var x = df(h);
          v.call(x);
        };
      }
      var h = jN(
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
        JN
      );
      e._reactRootContainer = h, ec(h.current, e);
      var C = e.nodeType === jt ? e.parentNode : e;
      return ts(C), jr(function() {
        Ks(t, h, n, a);
      }), h;
    }
  }
  function $1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function vf(e, t, n, a, r) {
    XN(n), $1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = B1(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var s = r;
        r = function() {
          var u = df(l);
          s.call(u);
        };
      }
      Ks(t, l, e, r);
    }
    return df(l);
  }
  var ZN = !1;
  function I1(e) {
    {
      ZN || (ZN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = H1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Qe(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : j1(e, "findDOMNode");
  }
  function Y1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ds(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return vf(null, e, t, !0, n);
  }
  function q1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ds(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return vf(null, e, t, !1, n);
  }
  function G1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !HS(e))
      throw new Error("parentComponent must be a valid React Component");
    return vf(e, t, n, !1, a);
  }
  var eE = !1;
  function W1(e) {
    if (eE || (eE = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qs(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = ds(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = _v(e), a = n && !qr(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return jr(function() {
        vf(null, null, e, !1, function() {
          e._reactRootContainer = null, Kg(e);
        });
      }), !0;
    } else {
      {
        var r = _v(e), i = !!(r && qr(r)), l = e.nodeType === zn && Qs(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  Ix(w1), qx(_1), Gx(O1), Wx(Ca), Kx(Hx), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _S(QR), MS(ov, Pj, jr);
  function K1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!mf(t))
      throw new Error("Target container is not a DOM element.");
    return T1(e, t, null, n);
  }
  function Q1(e, t, n, a) {
    return G1(e, t, n, a);
  }
  var Ov = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [qr, _l, tc, fh, dh, ov]
  };
  function X1(e, t) {
    return Ov.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), F1(e, t);
  }
  function J1(e, t, n) {
    return Ov.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), P1(e, t, n);
  }
  function Z1(e) {
    return oN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), jr(e);
  }
  var ew = U1({
    findFiberByHostInstance: Li,
    bundleType: 1,
    version: Rv,
    rendererPackageName: "react-dom"
  });
  if (!ew && tn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var tE = window.location.protocol;
    /^(https?|file):$/.test(tE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ov, ta.createPortal = K1, ta.createRoot = X1, ta.findDOMNode = I1, ta.flushSync = Z1, ta.hydrate = Y1, ta.hydrateRoot = J1, ta.render = q1, ta.unmountComponentAtNode = W1, ta.unstable_batchedUpdates = ov, ta.unstable_renderSubtreeIntoContainer = Q1, ta.version = Rv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
bE.exports = ta;
var uw = bE.exports, SE, nE = uw;
{
  var aE = nE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  SE = function(o, p) {
    aE.usingClientEntryPoint = !0;
    try {
      return nE.createRoot(o, p);
    } finally {
      aE.usingClientEntryPoint = !1;
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
function Js() {
  return Js = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var m = arguments[p];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, Js.apply(this, arguments);
}
var si;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(si || (si = {}));
const rE = "popstate";
function cw(o) {
  o === void 0 && (o = {});
  function p(g, y) {
    let {
      pathname: S,
      search: f,
      hash: V
    } = g.location;
    return Lv(
      "",
      {
        pathname: S,
        search: f,
        hash: V
      },
      // state defaults to `null` because `window.history.state` does
      y.state && y.state.usr || null,
      y.state && y.state.key || "default"
    );
  }
  function m(g, y) {
    return typeof y == "string" ? y : Zs(y);
  }
  return dw(p, m, null, o);
}
function ht(o, p) {
  if (o === !1 || o === null || typeof o > "u")
    throw new Error(p);
}
function Ua(o, p) {
  if (!o) {
    typeof console < "u" && console.warn(p);
    try {
      throw new Error(p);
    } catch {
    }
  }
}
function fw() {
  return Math.random().toString(36).substr(2, 8);
}
function iE(o, p) {
  return {
    usr: o.state,
    key: o.key,
    idx: p
  };
}
function Lv(o, p, m, g) {
  return m === void 0 && (m = null), Js({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof p == "string" ? ao(p) : p, {
    state: m,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: p && p.key || g || fw()
  });
}
function Zs(o) {
  let {
    pathname: p = "/",
    search: m = "",
    hash: g = ""
  } = o;
  return m && m !== "?" && (p += m.charAt(0) === "?" ? m : "?" + m), g && g !== "#" && (p += g.charAt(0) === "#" ? g : "#" + g), p;
}
function ao(o) {
  let p = {};
  if (o) {
    let m = o.indexOf("#");
    m >= 0 && (p.hash = o.substr(m), o = o.substr(0, m));
    let g = o.indexOf("?");
    g >= 0 && (p.search = o.substr(g), o = o.substr(0, g)), o && (p.pathname = o);
  }
  return p;
}
function dw(o, p, m, g) {
  g === void 0 && (g = {});
  let {
    window: y = document.defaultView,
    v5Compat: S = !1
  } = g, f = y.history, V = si.Pop, R = null, T = O();
  T == null && (T = 0, f.replaceState(Js({}, f.state, {
    idx: T
  }), ""));
  function O() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function D() {
    V = si.Pop;
    let ne = O(), pe = ne == null ? null : ne - T;
    T = ne, R && R({
      action: V,
      location: ie.location,
      delta: pe
    });
  }
  function L(ne, pe) {
    V = si.Push;
    let G = Lv(ie.location, ne, pe);
    T = O() + 1;
    let Y = iE(G, T), Z = ie.createHref(G);
    try {
      f.pushState(Y, "", Z);
    } catch (X) {
      if (X instanceof DOMException && X.name === "DataCloneError")
        throw X;
      y.location.assign(Z);
    }
    S && R && R({
      action: V,
      location: ie.location,
      delta: 1
    });
  }
  function A(ne, pe) {
    V = si.Replace;
    let G = Lv(ie.location, ne, pe);
    T = O();
    let Y = iE(G, T), Z = ie.createHref(G);
    f.replaceState(Y, "", Z), S && R && R({
      action: V,
      location: ie.location,
      delta: 0
    });
  }
  function I(ne) {
    let pe = y.location.origin !== "null" ? y.location.origin : y.location.href, G = typeof ne == "string" ? ne : Zs(ne);
    return G = G.replace(/ $/, "%20"), ht(pe, "No window.location.(origin|href) available to create URL for href: " + G), new URL(G, pe);
  }
  let ie = {
    get action() {
      return V;
    },
    get location() {
      return o(y, f);
    },
    listen(ne) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(rE, D), R = ne, () => {
        y.removeEventListener(rE, D), R = null;
      };
    },
    createHref(ne) {
      return p(y, ne);
    },
    createURL: I,
    encodeLocation(ne) {
      let pe = I(ne);
      return {
        pathname: pe.pathname,
        search: pe.search,
        hash: pe.hash
      };
    },
    push: L,
    replace: A,
    go(ne) {
      return f.go(ne);
    }
  };
  return ie;
}
var lE;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(lE || (lE = {}));
function pw(o, p, m) {
  return m === void 0 && (m = "/"), mw(o, p, m);
}
function mw(o, p, m, g) {
  let y = typeof p == "string" ? ao(p) : p, S = ci(y.pathname || "/", m);
  if (S == null)
    return null;
  let f = xE(o);
  vw(f);
  let V = null;
  for (let R = 0; V == null && R < f.length; ++R) {
    let T = Dw(S);
    V = Rw(f[R], T);
  }
  return V;
}
function xE(o, p, m, g) {
  p === void 0 && (p = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (S, f, V) => {
    let R = {
      relativePath: V === void 0 ? S.path || "" : V,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: f,
      route: S
    };
    R.relativePath.startsWith("/") && (ht(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let T = Ar([g, R.relativePath]), O = m.concat(R);
    S.children && S.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), xE(S.children, p, O, T)), !(S.path == null && !S.index) && p.push({
      path: T,
      score: Sw(T, S.index),
      routesMeta: O
    });
  };
  return o.forEach((S, f) => {
    var V;
    if (S.path === "" || !((V = S.path) != null && V.includes("?")))
      y(S, f);
    else
      for (let R of RE(S.path))
        y(S, f, R);
  }), p;
}
function RE(o) {
  let p = o.split("/");
  if (p.length === 0) return [];
  let [m, ...g] = p, y = m.endsWith("?"), S = m.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [S, ""] : [S];
  let f = RE(g.join("/")), V = [];
  return V.push(...f.map((R) => R === "" ? S : [S, R].join("/"))), y && V.push(...f), V.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function vw(o) {
  o.sort((p, m) => p.score !== m.score ? m.score - p.score : xw(p.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const hw = /^:[\w-]+$/, gw = 3, yw = 2, bw = 1, Nw = 10, Ew = -2, oE = (o) => o === "*";
function Sw(o, p) {
  let m = o.split("/"), g = m.length;
  return m.some(oE) && (g += Ew), p && (g += yw), m.filter((y) => !oE(y)).reduce((y, S) => y + (hw.test(S) ? gw : S === "" ? bw : Nw), g);
}
function xw(o, p) {
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
function Rw(o, p, m) {
  let {
    routesMeta: g
  } = o, y = {}, S = "/", f = [];
  for (let V = 0; V < g.length; ++V) {
    let R = g[V], T = V === g.length - 1, O = S === "/" ? p : p.slice(S.length) || "/", D = kv({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: T
    }, O), L = R.route;
    if (!D)
      return null;
    Object.assign(y, D.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Ar([S, D.pathname]),
      pathnameBase: _w(Ar([S, D.pathnameBase])),
      route: L
    }), D.pathnameBase !== "/" && (S = Ar([S, D.pathnameBase]));
  }
  return f;
}
function kv(o, p) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [m, g] = Cw(o.path, o.caseSensitive, o.end), y = p.match(m);
  if (!y) return null;
  let S = y[0], f = S.replace(/(.)\/+$/, "$1"), V = y.slice(1);
  return {
    params: g.reduce((T, O, D) => {
      let {
        paramName: L,
        isOptional: A
      } = O;
      if (L === "*") {
        let ie = V[D] || "";
        f = S.slice(0, S.length - ie.length).replace(/(.)\/+$/, "$1");
      }
      const I = V[D];
      return A && !I ? T[L] = void 0 : T[L] = (I || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: S,
    pathnameBase: f,
    pattern: o
  };
}
function Cw(o, p, m) {
  p === void 0 && (p = !1), m === void 0 && (m = !0), Ua(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, V, R) => (g.push({
    paramName: V,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), y += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : m ? y += "\\/*$" : o !== "" && o !== "/" && (y += "(?:(?=\\/|$))"), [new RegExp(y, p ? void 0 : "i"), g];
}
function Dw(o) {
  try {
    return o.split("/").map((p) => decodeURIComponent(p).replace(/\//g, "%2F")).join("/");
  } catch (p) {
    return Ua(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + p + ").")), o;
  }
}
function ci(o, p) {
  if (p === "/") return o;
  if (!o.toLowerCase().startsWith(p.toLowerCase()))
    return null;
  let m = p.endsWith("/") ? p.length - 1 : p.length, g = o.charAt(m);
  return g && g !== "/" ? null : o.slice(m) || "/";
}
function Tw(o, p) {
  p === void 0 && (p = "/");
  let {
    pathname: m,
    search: g = "",
    hash: y = ""
  } = typeof o == "string" ? ao(o) : o;
  return {
    pathname: m ? m.startsWith("/") ? m : jw(m, p) : p,
    search: Ow(g),
    hash: Aw(y)
  };
}
function jw(o, p) {
  let m = p.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((y) => {
    y === ".." ? m.length > 1 && m.pop() : y !== "." && m.push(y);
  }), m.length > 1 ? m.join("/") : "/";
}
function Av(o, p, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + p + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ww(o) {
  return o.filter((p, m) => m === 0 || p.route.path && p.route.path.length > 0);
}
function Pv(o, p) {
  let m = ww(o);
  return p ? m.map((g, y) => y === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Hv(o, p, m, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = ao(o) : (y = Js({}, o), ht(!y.pathname || !y.pathname.includes("?"), Av("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), Av("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), Av("#", "search", "hash", y)));
  let S = o === "" || y.pathname === "", f = S ? "/" : y.pathname, V;
  if (f == null)
    V = m;
  else {
    let D = p.length - 1;
    if (!g && f.startsWith("..")) {
      let L = f.split("/");
      for (; L[0] === ".."; )
        L.shift(), D -= 1;
      y.pathname = L.join("/");
    }
    V = D >= 0 ? p[D] : "/";
  }
  let R = Tw(y, V), T = f && f !== "/" && f.endsWith("/"), O = (S || f === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (T || O) && (R.pathname += "/"), R;
}
const Ar = (o) => o.join("/").replace(/\/\/+/g, "/"), _w = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Ow = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Aw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Mw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const CE = ["post", "put", "patch", "delete"];
new Set(CE);
const Vw = ["get", ...CE];
new Set(Vw);
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
function eu() {
  return eu = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var m = arguments[p];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, eu.apply(this, arguments);
}
const nu = /* @__PURE__ */ E.createContext(null);
nu.displayName = "DataRouter";
const Bv = /* @__PURE__ */ E.createContext(null);
Bv.displayName = "DataRouterState";
const Lw = /* @__PURE__ */ E.createContext(null);
Lw.displayName = "Await";
const va = /* @__PURE__ */ E.createContext(null);
va.displayName = "Navigation";
const au = /* @__PURE__ */ E.createContext(null);
au.displayName = "Location";
const za = /* @__PURE__ */ E.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
za.displayName = "Route";
const $v = /* @__PURE__ */ E.createContext(null);
$v.displayName = "RouteError";
function kw(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p;
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: y
  } = E.useContext(va), {
    hash: S,
    pathname: f,
    search: V
  } = ru(o, {
    relative: m
  }), R = f;
  return g !== "/" && (R = f === "/" ? g : Ar([g, f])), y.createHref({
    pathname: R,
    search: V,
    hash: S
  });
}
function ro() {
  return E.useContext(au) != null;
}
function Xi() {
  return ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), E.useContext(au).location;
}
const DE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function TE(o) {
  E.useContext(va).static || E.useLayoutEffect(o);
}
function Iv() {
  let {
    isDataRoute: o
  } = E.useContext(za);
  return o ? Xw() : Uw();
}
function Uw() {
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = E.useContext(nu), {
    basename: p,
    future: m,
    navigator: g
  } = E.useContext(va), {
    matches: y
  } = E.useContext(za), {
    pathname: S
  } = Xi(), f = JSON.stringify(Pv(y, m.v7_relativeSplatPath)), V = E.useRef(!1);
  return TE(() => {
    V.current = !0;
  }), E.useCallback(function(T, O) {
    if (O === void 0 && (O = {}), Ua(V.current, DE), !V.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let D = Hv(T, JSON.parse(f), S, O.relative === "path");
    o == null && p !== "/" && (D.pathname = D.pathname === "/" ? p : Ar([p, D.pathname])), (O.replace ? g.replace : g.push)(D, O.state, O);
  }, [p, g, f, S, o]);
}
function Fw() {
  let {
    matches: o
  } = E.useContext(za), p = o[o.length - 1];
  return p ? p.params : {};
}
function ru(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p, {
    future: g
  } = E.useContext(va), {
    matches: y
  } = E.useContext(za), {
    pathname: S
  } = Xi(), f = JSON.stringify(Pv(y, g.v7_relativeSplatPath));
  return E.useMemo(() => Hv(o, JSON.parse(f), S, m === "path"), [o, f, S, m]);
}
function zw(o, p) {
  return Pw(o, p);
}
function Pw(o, p, m, g) {
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = E.useContext(va), {
    matches: S
  } = E.useContext(za), f = S[S.length - 1], V = f ? f.params : {}, R = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", O = f && f.route;
  {
    let G = O && O.path || "";
    wE(R, !O || G.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + G + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + G + '"> to <Route ') + ('path="' + (G === "/" ? "*" : G + "/*") + '">.'));
  }
  let D = Xi(), L;
  if (p) {
    var A;
    let G = typeof p == "string" ? ao(p) : p;
    T === "/" || (A = G.pathname) != null && A.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + G.pathname + '" was given in the `location` prop.')), L = G;
  } else
    L = D;
  let I = L.pathname || "/", ie = I;
  if (T !== "/") {
    let G = T.replace(/^\//, "").split("/");
    ie = "/" + I.replace(/^\//, "").split("/").slice(G.length).join("/");
  }
  let ne = pw(o, {
    pathname: ie
  });
  Ua(O || ne != null, 'No routes matched location "' + L.pathname + L.search + L.hash + '" '), Ua(ne == null || ne[ne.length - 1].route.element !== void 0 || ne[ne.length - 1].route.Component !== void 0 || ne[ne.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + L.pathname + L.search + L.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let pe = Yw(ne && ne.map((G) => Object.assign({}, G, {
    params: Object.assign({}, V, G.params),
    pathname: Ar([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(G.pathname).pathname : G.pathname
    ]),
    pathnameBase: G.pathnameBase === "/" ? T : Ar([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(G.pathnameBase).pathname : G.pathnameBase
    ])
  })), S, m, g);
  return p && pe ? /* @__PURE__ */ E.createElement(au.Provider, {
    value: {
      location: eu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, L),
      navigationType: si.Pop
    }
  }, pe) : pe;
}
function Hw() {
  let o = Qw(), p = Mw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, S = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), f = /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ E.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ E.createElement("code", {
    style: S
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ E.createElement("code", {
    style: S
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ E.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), m ? /* @__PURE__ */ E.createElement("pre", {
    style: y
  }, m) : null, f);
}
const Bw = /* @__PURE__ */ E.createElement(Hw, null);
class $w extends E.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ E.createElement(za.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ E.createElement($v.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Iw(o) {
  let {
    routeContext: p,
    match: m,
    children: g
  } = o, y = E.useContext(nu);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ E.createElement(za.Provider, {
    value: p
  }, g);
}
function Yw(o, p, m, g) {
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
  let f = o, V = (y = m) == null ? void 0 : y.errors;
  if (V != null) {
    let O = f.findIndex((D) => D.route.id && (V == null ? void 0 : V[D.route.id]) !== void 0);
    O >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(V).join(",")), f = f.slice(0, Math.min(f.length, O + 1));
  }
  let R = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let O = 0; O < f.length; O++) {
      let D = f[O];
      if ((D.route.HydrateFallback || D.route.hydrateFallbackElement) && (T = O), D.route.id) {
        let {
          loaderData: L,
          errors: A
        } = m, I = D.route.loader && L[D.route.id] === void 0 && (!A || A[D.route.id] === void 0);
        if (D.route.lazy || I) {
          R = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((O, D, L) => {
    let A, I = !1, ie = null, ne = null;
    m && (A = V && D.route.id ? V[D.route.id] : void 0, ie = D.route.errorElement || Bw, R && (T < 0 && L === 0 ? (wE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), I = !0, ne = null) : T === L && (I = !0, ne = D.route.hydrateFallbackElement || null)));
    let pe = p.concat(f.slice(0, L + 1)), G = () => {
      let Y;
      return A ? Y = ie : I ? Y = ne : D.route.Component ? Y = /* @__PURE__ */ E.createElement(D.route.Component, null) : D.route.element ? Y = D.route.element : Y = O, /* @__PURE__ */ E.createElement(Iw, {
        match: D,
        routeContext: {
          outlet: O,
          matches: pe,
          isDataRoute: m != null
        },
        children: Y
      });
    };
    return m && (D.route.ErrorBoundary || D.route.errorElement || L === 0) ? /* @__PURE__ */ E.createElement($w, {
      location: m.location,
      revalidation: m.revalidation,
      component: ie,
      error: A,
      children: G(),
      routeContext: {
        outlet: null,
        matches: pe,
        isDataRoute: !0
      }
    }) : G();
  }, null);
}
var jE = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(jE || {}), tu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(tu || {});
function Yv(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qw(o) {
  let p = E.useContext(nu);
  return p || ht(!1, Yv(o)), p;
}
function Gw(o) {
  let p = E.useContext(Bv);
  return p || ht(!1, Yv(o)), p;
}
function Ww(o) {
  let p = E.useContext(za);
  return p || ht(!1, Yv(o)), p;
}
function qv(o) {
  let p = Ww(o), m = p.matches[p.matches.length - 1];
  return m.route.id || ht(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function Kw() {
  return qv(tu.UseRouteId);
}
function Qw() {
  var o;
  let p = E.useContext($v), m = Gw(tu.UseRouteError), g = qv(tu.UseRouteError);
  return p !== void 0 ? p : (o = m.errors) == null ? void 0 : o[g];
}
function Xw() {
  let {
    router: o
  } = qw(jE.UseNavigateStable), p = qv(tu.UseNavigateStable), m = E.useRef(!1);
  return TE(() => {
    m.current = !0;
  }), E.useCallback(function(y, S) {
    S === void 0 && (S = {}), Ua(m.current, DE), m.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, eu({
      fromRouteId: p
    }, S)));
  }, [o, p]);
}
const sE = {};
function wE(o, p, m) {
  !p && !sE[o] && (sE[o] = !0, Ua(!1, m));
}
const uE = {};
function Jw(o, p) {
  uE[p] || (uE[p] = !0, console.warn(p));
}
const cE = (o, p, m) => Jw(o, "⚠️ React Router Future Flag Warning: " + p + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Zw(o, p) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && cE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && cE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function e_(o) {
  let {
    to: p,
    replace: m,
    state: g,
    relative: y
  } = o;
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: S,
    static: f
  } = E.useContext(va);
  Ua(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: V
  } = E.useContext(za), {
    pathname: R
  } = Xi(), T = Iv(), O = Hv(p, Pv(V, S.v7_relativeSplatPath), R, y === "path"), D = JSON.stringify(O);
  return E.useEffect(() => T(JSON.parse(D), {
    replace: m,
    state: g,
    relative: y
  }), [T, D, y, m, g]), null;
}
function ar(o) {
  ht(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function t_(o) {
  let {
    basename: p = "/",
    children: m = null,
    location: g,
    navigationType: y = si.Pop,
    navigator: S,
    static: f = !1,
    future: V
  } = o;
  ro() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = p.replace(/^\/*/, "/"), T = E.useMemo(() => ({
    basename: R,
    navigator: S,
    static: f,
    future: eu({
      v7_relativeSplatPath: !1
    }, V)
  }), [R, V, S, f]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: O = "/",
    search: D = "",
    hash: L = "",
    state: A = null,
    key: I = "default"
  } = g, ie = E.useMemo(() => {
    let ne = ci(O, R);
    return ne == null ? null : {
      location: {
        pathname: ne,
        search: D,
        hash: L,
        state: A,
        key: I
      },
      navigationType: y
    };
  }, [R, O, D, L, A, I, y]);
  return Ua(ie != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + O + D + L + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), ie == null ? null : /* @__PURE__ */ E.createElement(va.Provider, {
    value: T
  }, /* @__PURE__ */ E.createElement(au.Provider, {
    children: m,
    value: ie
  }));
}
function n_(o) {
  let {
    children: p,
    location: m
  } = o;
  return zw(Uv(p), m);
}
new Promise(() => {
});
function Uv(o, p) {
  p === void 0 && (p = []);
  let m = [];
  return E.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ E.isValidElement(g))
      return;
    let S = [...p, y];
    if (g.type === E.Fragment) {
      m.push.apply(m, Uv(g.props.children, S));
      return;
    }
    g.type !== ar && ht(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || ht(!1, "An index route cannot have child routes.");
    let f = {
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
    g.props.children && (f.children = Uv(g.props.children, S)), m.push(f);
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
function no() {
  return no = Object.assign ? Object.assign.bind() : function(o) {
    for (var p = 1; p < arguments.length; p++) {
      var m = arguments[p];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, no.apply(this, arguments);
}
function Gv(o, p) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), y, S;
  for (S = 0; S < g.length; S++)
    y = g[S], !(p.indexOf(y) >= 0) && (m[y] = o[y]);
  return m;
}
const gf = "get", yf = "application/x-www-form-urlencoded";
function xf(o) {
  return o != null && typeof o.tagName == "string";
}
function a_(o) {
  return xf(o) && o.tagName.toLowerCase() === "button";
}
function r_(o) {
  return xf(o) && o.tagName.toLowerCase() === "form";
}
function i_(o) {
  return xf(o) && o.tagName.toLowerCase() === "input";
}
function l_(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function o_(o, p) {
  return o.button === 0 && // Ignore everything but left clicks
  (!p || p === "_self") && // Let browser handle "target=_blank" etc.
  !l_(o);
}
let hf = null;
function s_() {
  if (hf === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), hf = !1;
    } catch {
      hf = !0;
    }
  return hf;
}
const u_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Mv(o) {
  return o != null && !u_.has(o) ? (Ua(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + yf + '"')), null) : o;
}
function c_(o, p) {
  let m, g, y, S, f;
  if (r_(o)) {
    let V = o.getAttribute("action");
    g = V ? ci(V, p) : null, m = o.getAttribute("method") || gf, y = Mv(o.getAttribute("enctype")) || yf, S = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let V = o.form;
    if (V == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || V.getAttribute("action");
    if (g = R ? ci(R, p) : null, m = o.getAttribute("formmethod") || V.getAttribute("method") || gf, y = Mv(o.getAttribute("formenctype")) || Mv(V.getAttribute("enctype")) || yf, S = new FormData(V, o), !s_()) {
      let {
        name: T,
        type: O,
        value: D
      } = o;
      if (O === "image") {
        let L = T ? T + "." : "";
        S.append(L + "x", "0"), S.append(L + "y", "0");
      } else T && S.append(T, D);
    }
  } else {
    if (xf(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    m = gf, g = null, y = yf, f = o;
  }
  return S && y === "text/plain" && (f = S, S = void 0), {
    action: g,
    method: m.toLowerCase(),
    encType: y,
    formData: S,
    body: f
  };
}
const f_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], d_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], p_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], m_ = "6";
try {
  window.__reactRouterVersion = m_;
} catch {
}
const _E = /* @__PURE__ */ E.createContext({
  isTransitioning: !1
});
_E.displayName = "ViewTransition";
const v_ = /* @__PURE__ */ E.createContext(/* @__PURE__ */ new Map());
v_.displayName = "Fetchers";
const h_ = "startTransition", fE = ow[h_];
function g_(o) {
  let {
    basename: p,
    children: m,
    future: g,
    window: y
  } = o, S = E.useRef();
  S.current == null && (S.current = cw({
    window: y,
    v5Compat: !0
  }));
  let f = S.current, [V, R] = E.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, O = E.useCallback((D) => {
    T && fE ? fE(() => R(D)) : R(D);
  }, [R, T]);
  return E.useLayoutEffect(() => f.listen(O), [f, O]), E.useEffect(() => Zw(g), [g]), /* @__PURE__ */ E.createElement(t_, {
    basename: p,
    children: m,
    location: V.location,
    navigationType: V.action,
    navigator: f,
    future: g
  });
}
const y_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, to = /* @__PURE__ */ E.forwardRef(function(p, m) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: S,
    replace: f,
    state: V,
    target: R,
    to: T,
    preventScrollReset: O,
    viewTransition: D
  } = p, L = Gv(p, f_), {
    basename: A
  } = E.useContext(va), I, ie = !1;
  if (typeof T == "string" && b_.test(T) && (I = T, y_))
    try {
      let Y = new URL(window.location.href), Z = T.startsWith("//") ? new URL(Y.protocol + T) : new URL(T), X = ci(Z.pathname, A);
      Z.origin === Y.origin && X != null ? T = X + Z.search + Z.hash : ie = !0;
    } catch {
      Ua(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ne = kw(T, {
    relative: y
  }), pe = x_(T, {
    replace: f,
    state: V,
    target: R,
    preventScrollReset: O,
    relative: y,
    viewTransition: D
  });
  function G(Y) {
    g && g(Y), Y.defaultPrevented || pe(Y);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ E.createElement("a", no({}, L, {
      href: I || ne,
      onClick: ie || S ? g : G,
      ref: m,
      target: R
    }))
  );
});
to.displayName = "Link";
const N_ = /* @__PURE__ */ E.forwardRef(function(p, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: S = "",
    end: f = !1,
    style: V,
    to: R,
    viewTransition: T,
    children: O
  } = p, D = Gv(p, d_), L = ru(R, {
    relative: D.relative
  }), A = Xi(), I = E.useContext(Bv), {
    navigator: ie,
    basename: ne
  } = E.useContext(va), pe = I != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(L) && T === !0, G = ie.encodeLocation ? ie.encodeLocation(L).pathname : L.pathname, Y = A.pathname, Z = I && I.navigation && I.navigation.location ? I.navigation.location.pathname : null;
  y || (Y = Y.toLowerCase(), Z = Z ? Z.toLowerCase() : null, G = G.toLowerCase()), Z && ne && (Z = ci(Z, ne) || Z);
  const X = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let z = Y === G || !f && Y.startsWith(G) && Y.charAt(X) === "/", _ = Z != null && (Z === G || !f && Z.startsWith(G) && Z.charAt(G.length) === "/"), te = {
    isActive: z,
    isPending: _,
    isTransitioning: pe
  }, q = z ? g : void 0, J;
  typeof S == "function" ? J = S(te) : J = [S, z ? "active" : null, _ ? "pending" : null, pe ? "transitioning" : null].filter(Boolean).join(" ");
  let k = typeof V == "function" ? V(te) : V;
  return /* @__PURE__ */ E.createElement(to, no({}, D, {
    "aria-current": q,
    className: J,
    ref: m,
    style: k,
    to: R,
    viewTransition: T
  }), typeof O == "function" ? O(te) : O);
});
N_.displayName = "NavLink";
const E_ = /* @__PURE__ */ E.forwardRef((o, p) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: S,
    state: f,
    method: V = gf,
    action: R,
    onSubmit: T,
    relative: O,
    preventScrollReset: D,
    viewTransition: L
  } = o, A = Gv(o, p_), I = T_(), ie = j_(R, {
    relative: O
  }), ne = V.toLowerCase() === "get" ? "get" : "post", pe = (G) => {
    if (T && T(G), G.defaultPrevented) return;
    G.preventDefault();
    let Y = G.nativeEvent.submitter, Z = (Y == null ? void 0 : Y.getAttribute("formmethod")) || V;
    I(Y || G.currentTarget, {
      fetcherKey: m,
      method: Z,
      navigate: g,
      replace: S,
      state: f,
      relative: O,
      preventScrollReset: D,
      viewTransition: L
    });
  };
  return /* @__PURE__ */ E.createElement("form", no({
    ref: p,
    method: ne,
    action: ie,
    onSubmit: y ? T : pe
  }, A));
});
E_.displayName = "Form";
var Nf;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(Nf || (Nf = {}));
var dE;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(dE || (dE = {}));
function S_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function OE(o) {
  let p = E.useContext(nu);
  return p || ht(!1, S_(o)), p;
}
function x_(o, p) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: S,
    relative: f,
    viewTransition: V
  } = p === void 0 ? {} : p, R = Iv(), T = Xi(), O = ru(o, {
    relative: f
  });
  return E.useCallback((D) => {
    if (o_(D, m)) {
      D.preventDefault();
      let L = g !== void 0 ? g : Zs(T) === Zs(O);
      R(o, {
        replace: L,
        state: y,
        preventScrollReset: S,
        relative: f,
        viewTransition: V
      });
    }
  }, [T, R, O, g, y, m, o, S, f, V]);
}
function R_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let C_ = 0, D_ = () => "__" + String(++C_) + "__";
function T_() {
  let {
    router: o
  } = OE(Nf.UseSubmit), {
    basename: p
  } = E.useContext(va), m = Kw();
  return E.useCallback(function(g, y) {
    y === void 0 && (y = {}), R_();
    let {
      action: S,
      method: f,
      encType: V,
      formData: R,
      body: T
    } = c_(g, p);
    if (y.navigate === !1) {
      let O = y.fetcherKey || D_();
      o.fetch(O, m, y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || V,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || S, {
        preventScrollReset: y.preventScrollReset,
        formData: R,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || V,
        replace: y.replace,
        state: y.state,
        fromRouteId: m,
        flushSync: y.flushSync,
        viewTransition: y.viewTransition
      });
  }, [o, p, m]);
}
function j_(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p, {
    basename: g
  } = E.useContext(va), y = E.useContext(za);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [S] = y.matches.slice(-1), f = no({}, ru(o || ".", {
    relative: m
  })), V = Xi();
  if (o == null) {
    f.search = V.search;
    let R = new URLSearchParams(f.search), T = R.getAll("index");
    if (T.some((D) => D === "")) {
      R.delete("index"), T.filter((L) => L).forEach((L) => R.append("index", L));
      let D = R.toString();
      f.search = D ? "?" + D : "";
    }
  }
  return (!o || o === ".") && S.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Ar([g, f.pathname])), Zs(f);
}
function w_(o, p) {
  p === void 0 && (p = {});
  let m = E.useContext(_E);
  m == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = OE(Nf.useViewTransitionState), y = ru(o, {
    relative: p.relative
  });
  if (!m.isTransitioning)
    return !1;
  let S = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, f = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return kv(y.pathname, f) != null || kv(y.pathname, S) != null;
}
function __() {
  const [o, p] = E.useState(null), [m, g] = E.useState(""), [y, S] = E.useState(""), [f, V] = E.useState(!0), [R, T] = E.useState(""), [O, D] = E.useState(""), [L, A] = E.useState(!1), [I, ie] = E.useState(!1);
  E.useEffect(() => {
    const Y = typeof window < "u" ? window : void 0, Z = Y && Y.__FIREBASE__ ? Y.__FIREBASE__ : null;
    p({
      apiKey: Z && Z.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: Z && Z.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: Z && Z.projectId || void 0 || "fresh-basket-a8933",
      appId: Z && Z.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: Z && Z.messagingSenderId || void 0 || "163656027399",
      measurementId: Z && Z.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ne(Y) {
    const Z = (Y == null ? void 0 : Y.code) || "", X = (Y == null ? void 0 : Y.message) || "";
    return Z.includes("invalid-email") ? "Please enter a valid email address." : Z.includes("user-not-found") ? "No account found with that email." : Z.includes("wrong-password") || Z.includes("invalid-credential") || X.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : Z.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : Z.includes("network-request-failed") ? "Network error. Check your connection and try again." : X || "Something went wrong.";
  }
  async function pe(Y) {
    Y.preventDefault(), T(""), D(""), A(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Z = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), X = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: z, setPersistence: _, browserLocalPersistence: te, browserSessionPersistence: q, signInWithEmailAndPassword: J } = X, k = z();
      await _(k, f ? te : q);
      const ae = await (await J(k, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: ae }) })).ok) throw new Error("Session creation failed");
      D("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (Z) {
      T(ne(Z));
    } finally {
      A(!1);
    }
  }
  async function G() {
    T(""), D("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Y = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Z, sendPasswordResetEmail: X } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), z = Z();
      await X(z, m.trim()), D("If an account exists for that email, a reset link has been sent.");
    } catch (Y) {
      T(ne(Y));
    }
  }
  return /* @__PURE__ */ c.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ c.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ c.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ c.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ c.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ c.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ c.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      R && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      O && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: O }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: pe, children: [
        /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: (Y) => g(Y.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 85,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ c.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: I ? "text" : "password", value: y, onChange: (Y) => S(Y.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": I ? "Hide password" : "Show password", onClick: () => ie((Y) => !Y), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ c.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: f, onChange: (Y) => V(Y.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("button", { className: "link-button", type: "button", onClick: G, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: L, type: "submit", children: L ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ c.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
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
function O_() {
  const [o, p] = E.useState(null), [m, g] = E.useState(""), [y, S] = E.useState(""), [f, V] = E.useState(""), [R, T] = E.useState(""), [O, D] = E.useState(""), [L, A] = E.useState(""), [I, ie] = E.useState(""), [ne, pe] = E.useState(!1), [G, Y] = E.useState(!1), [Z, X] = E.useState(!1), [z, _] = E.useState(!1);
  E.useEffect(() => {
    const J = typeof window < "u" ? window : void 0, k = J && J.__FIREBASE__ ? J.__FIREBASE__ : null;
    p({
      apiKey: k && k.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: k && k.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: k && k.projectId || void 0 || "fresh-basket-a8933",
      appId: k && k.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: k && k.messagingSenderId || void 0 || "163656027399",
      measurementId: k && k.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function te(J) {
    const k = (J == null ? void 0 : J.code) || "";
    return k.includes("email-already-in-use") ? "An account with this email already exists." : k.includes("weak-password") ? "Password should be at least 6 characters." : k.includes("invalid-email") ? "Please enter a valid email address." : k.includes("network-request-failed") ? "Network error. Check your connection and try again." : (J == null ? void 0 : J.message) || "Something went wrong.";
  }
  async function q(J) {
    J.preventDefault(), A(""), ie(""), pe(!0);
    try {
      const k = String(m).trim(), ce = String(y).trim(), ae = ce.replace(/\D+/g, ""), Ce = { fn: !k, cn: !ce };
      if (X(Ce.fn), _(Ce.cn || ae.length < 7), Ce.fn || Ce.cn) {
        A("Please fill in required fields");
        return;
      }
      if (ae.length < 7) {
        A("Please enter a valid mobile number");
        return;
      }
      if (R !== O) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Ve = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: ye, createUserWithEmailAndPassword: me } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ge = ye(), Qt = await (await me(Ge, f.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Qt, profile: { fullName: k, contactNumber: ce } }) })).ok) throw new Error("Session creation failed");
      ie("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (k) {
      A(te(k));
    } finally {
      pe(!1);
    }
  }
  return /* @__PURE__ */ c.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ c.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    L && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: L }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    I && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: I }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: q, children: [
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (Z && !String(m).trim() ? " input-error" : ""), value: m, onChange: (J) => {
          g(J.target.value), Z && X(!String(J.target.value).trim());
        }, onBlur: () => X(!String(m).trim()), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 72,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (z ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (J) => {
          if (S(J.target.value), z) {
            const k = String(J.target.value).trim().replace(/\D+/g, "");
            _(!(k.length >= 7));
          }
        }, onBlur: () => {
          const J = String(y).trim().replace(/\D+/g, "");
          _(!(J.length >= 7));
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
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (J) => V(J.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ c.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: G ? "text" : "password", value: R, onChange: (J) => T(J.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": G ? "Hide password" : "Show password", onClick: () => Y((J) => !J), children: "👁️" }, void 0, !1, {
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
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "password", value: O, onChange: (J) => D(J.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button", disabled: ne, type: "submit", children: ne ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ c.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
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
function A_() {
  const [o, p] = E.useState([]);
  return E.useEffect(() => {
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
      const S = String(Date.now()) + Math.random().toString(36).slice(2, 8), f = { id: S, message: String(g || ""), type: y.type || "success", ttl: typeof y.ttl == "number" ? y.ttl : 4e3 };
      return p((V) => [f, ...V]), S;
    }, window.hideToast = function(g) {
      p((y) => y.filter((S) => S.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), E.useEffect(() => {
    if (!o.length) return;
    const m = o.map((g) => setTimeout(() => {
      p((y) => y.filter((S) => S.id !== g.id));
    }, g.ttl));
    return () => {
      m.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ c.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((m) => /* @__PURE__ */ c.jsxDEV("div", { className: `toast ${m.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ c.jsxDEV("div", { className: "toast-message", children: m.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ c.jsxDEV("button", { className: "toast-close", onClick: () => p((g) => g.filter((y) => y.id !== m.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
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
function Or({ children: o }) {
  E.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(m, g) {
      return window.__pendingToasts.push({ message: m, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(m) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== m));
      } catch {
      }
    }));
  }, []);
  const p = Iv();
  return E.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), S = document.getElementById("profileMenu");
    function f(D, L, A) {
      D && (D.classList.toggle("hidden", !A), D.setAttribute("aria-hidden", A ? "false" : "true"), L && L.setAttribute("aria-expanded", A ? "true" : "false"));
    }
    function V() {
      f(g, m, !1), f(S, y, !1);
    }
    function R(D) {
      const L = (A) => A && (A === D.target || A.contains(D.target));
      !L(g) && !L(m) && !L(S) && !L(y) && V();
    }
    function T(D) {
      D.key === "Escape" && V();
    }
    function O(D) {
      D && D.querySelectorAll(".dropdown-item").forEach((L) => {
        L.addEventListener("click", () => V());
      });
    }
    return m && g && (m.addEventListener("click", (D) => {
      D.stopPropagation(), f(S, y, !1), f(g, m, g.classList.contains("hidden"));
    }), O(g)), y && S && (y.addEventListener("click", (D) => {
      D.stopPropagation(), f(g, m, !1), f(S, y, S.classList.contains("hidden"));
    }), O(S)), document.addEventListener("click", R), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", R), document.removeEventListener("keydown", T);
    };
  }, []), /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ c.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ c.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ c.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 75,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
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
      /* @__PURE__ */ c.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ c.jsxDEV(to, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), p("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV(to, { to: "/orders", onClick: (m) => {
          m.preventDefault(), p("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV(to, { to: "/riders", onClick: (m) => {
          m.preventDefault(), p("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ c.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ c.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ c.jsxDEV("defs", { children: /* @__PURE__ */ c.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ c.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 86,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ c.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ c.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 88,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 85,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 84,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ c.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 91,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 83,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ c.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 96,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 94,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ c.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ c.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ c.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 102,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ c.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 102,
              columnNumber: 203
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 102,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ c.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 105,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV(to, { className: "dropdown-item", to: "/settings", onClick: (m) => {
              m.preventDefault(), p("/settings");
            }, children: "Settings" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ c.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 104,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 100,
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
    /* @__PURE__ */ c.jsxDEV("main", { className: "content", children: o }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ c.jsxDEV(A_, {}, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
function M_({ onClose: o, onCreated: p }) {
  const [m, g] = E.useState(""), [y, S] = E.useState(""), [f, V] = E.useState(""), [R, T] = E.useState(""), [O, D] = E.useState(!1), [L, A] = E.useState(""), [I, ie] = E.useState(""), [ne, pe] = E.useState(!1), [G, Y] = E.useState(!1), [Z, X] = E.useState(!1), [z, _] = E.useState(!1);
  async function te() {
    A(""), ie(""), _(!0);
    const q = String(m).trim(), J = String(y), k = String(f).trim(), ce = String(R).trim(), ae = ce.replace(/\D+/g, ""), Ce = { fn: !k, cn: !ce, pw: !J };
    if (pe(Ce.fn), Y(Ce.cn || ae.length < 7), X(Ce.pw), Ce.fn || Ce.cn || Ce.pw) {
      A("Full name, mobile and password are required");
      return;
    }
    if (ae.length < 7) {
      A("Please enter a valid mobile number"), Y(!0);
      return;
    }
    if (q && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q)) {
      A("Please enter a valid email");
      return;
    }
    if (J.length < 6) {
      X(!0), A("Password must be at least 6 characters");
      return;
    }
    D(!0);
    try {
      const Ve = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: q, password: J, fullName: k, contactNumber: ce })
      }), ye = await Ve.json().catch(() => null);
      if (!Ve.ok) {
        const me = String(ye && (ye.error || ye.message) || ""), Ge = me.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(me) || /MISSING\s*EMAIL\/PASSWORD/i.test(me))
          A("Full name, mobile and password are required"), pe(!k), Y(!ce || ae.length < 7), X(!J);
        else if (Ge.includes("EMAIL_EXISTS"))
          A("An account with this email already exists. Use a different email or leave email blank.");
        else if (Ge.includes("INVALID_EMAIL"))
          A("Please enter a valid email");
        else if (Ge.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(me))
          X(!0), A("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(me))
          Y(!0), A("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(me))
          A("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(me || "Failed to create rider");
        return;
      }
      ie("Rider created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (Ve) {
      const ye = String((Ve == null ? void 0 : Ve.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(ye) ? A("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(ye) ? A("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(ye) ? A("Please enter a valid email") : /WEAK_PASSWORD/i.test(ye) || /AT LEAST 6 CHARACTERS/i.test(ye) ? (X(!0), A("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(ye) ? (Y(!0), A("Please enter a valid mobile number")) : A(ye || "Failed to create rider");
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ c.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 94,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 92,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-body", children: [
      I && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: I }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (z && !String(f).trim() ? " input-error" : ""), value: f, onChange: (q) => {
          V(q.target.value), z && pe(!String(q.target.value).trim());
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
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Email",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (q) => {
          g(q.target.value);
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
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (z && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (q) => {
          S(q.target.value), z && X(!String(q.target.value));
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
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (z && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (q) => {
          if (T(q.target.value), z) {
            const J = String(q.target.value).trim().replace(/\D+/g, "");
            Y(!(J.length >= 7));
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
      L && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: L }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 110,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: O, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: te, disabled: O, children: O ? "Creating…" : "Create" }, void 0, !1, {
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
const Ef = "app.settings.fares", ma = {
  baseFare: 0,
  farePerKm: 2
};
function AE() {
  if (typeof window > "u" || !window.localStorage)
    return { ...ma };
  try {
    const o = window.localStorage.getItem(Ef);
    if (!o)
      return { ...ma };
    const p = JSON.parse(o), m = Number(p == null ? void 0 : p.baseFare), g = Number(p == null ? void 0 : p.farePerKm);
    return {
      baseFare: Number.isFinite(m) ? m : ma.baseFare,
      farePerKm: Number.isFinite(g) ? g : ma.farePerKm
    };
  } catch {
    return { ...ma };
  }
}
const ME = "riderPerformancePct";
function VE() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function LE() {
  const o = VE();
  if (!o) return {};
  try {
    const p = o.getItem(ME);
    if (!p) return {};
    const m = JSON.parse(p);
    if (m && typeof m == "object" && !Array.isArray(m))
      return m;
  } catch {
  }
  return {};
}
function V_(o) {
  if (o == null) return;
  const p = LE(), m = String(o);
  return p[m];
}
function L_(o) {
  if (!o || typeof o != "object") return;
  const p = VE();
  if (!p) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = LE();
  let y = !1;
  const S = { ...g };
  for (const [f, V] of m) {
    const R = String(f);
    let T;
    if (typeof V == "number")
      T = V;
    else if (typeof V == "string")
      T = Number(V);
    else
      continue;
    Number.isFinite(T) && S[R] !== T && (S[R] = T, y = !0);
  }
  if (y)
    try {
      p.setItem(ME, JSON.stringify(S));
    } catch {
    }
}
function k_(o) {
  if (!o) return null;
  if (o instanceof Date)
    return Number.isFinite(o.getTime()) ? o : null;
  if (typeof o == "string") {
    const p = Date.parse(o);
    return Number.isFinite(p) ? new Date(p) : null;
  }
  if (typeof o == "number") {
    const p = new Date(o);
    return Number.isFinite(p.getTime()) ? p : null;
  }
  if (typeof o == "object") {
    if (typeof o.toDate == "function")
      try {
        const p = o.toDate();
        if (p instanceof Date && Number.isFinite(p.getTime())) return p;
      } catch {
      }
    if (typeof o.seconds == "number") {
      const p = o.seconds * 1e3 + (typeof o.nanoseconds == "number" ? Math.floor(o.nanoseconds / 1e6) : 0), m = new Date(p);
      if (Number.isFinite(m.getTime())) return m;
    }
  }
  return null;
}
function U_(o) {
  return !(o instanceof Date) || !Number.isFinite(o.getTime()) ? "" : `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, "0")}`;
}
const F_ = [
  "completedAt",
  "completed_at",
  "deliveredAt",
  "delivered_at",
  "createdAt",
  "created_at",
  "created",
  "assignedAt",
  "assigned_at",
  "timestamp",
  "orderedAt",
  "ordered_at",
  "updatedAt",
  "updated_at"
];
function z_(o) {
  if (!o || typeof o != "object") return "";
  for (const p of F_) {
    const m = o[p], g = k_(m);
    if (g) return U_(g);
  }
  return "";
}
function P_(o, p) {
  if (!Array.isArray(o) || !p) return 0;
  let m = 0;
  for (const g of o)
    z_(g) === p && (m += 1);
  return m;
}
function H_() {
  const [o, p] = E.useState([]), [m, g] = E.useState(""), [y, S] = E.useState(!0), [f, V] = E.useState(""), [R, T] = E.useState(1), [O, D] = E.useState(20), [L, A] = E.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [I, ie] = E.useState(!1), [ne, pe] = E.useState(ma);
  E.useEffect(() => {
    function z() {
      pe(AE());
    }
    z();
    function _(te) {
      te.key === Ef && z();
    }
    return typeof window < "u" && (window.addEventListener("storage", _), window.addEventListener("fare-settings-changed", z)), () => {
      typeof window < "u" && (window.removeEventListener("storage", _), window.removeEventListener("fare-settings-changed", z));
    };
  }, []), E.useEffect(() => {
    let z = !0;
    return (async () => {
      var _, te, q, J;
      S(!0), V("");
      try {
        const k = new URLSearchParams();
        m && k.set("q", m), k.set("page", String(R)), k.set("limit", String(O));
        const ce = await fetch(`/api/riders?${k.toString()}`, { credentials: "include" });
        if (ce.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ce.ok) throw new Error("Failed to load riders");
        const ae = await ce.json();
        z && (p(Array.isArray(ae.riders) ? ae.riders : []), A({ total: ((_ = ae.meta) == null ? void 0 : _.total) || 0, page: ((te = ae.meta) == null ? void 0 : te.page) || 1, limit: ((q = ae.meta) == null ? void 0 : q.limit) || O, pages: ((J = ae.meta) == null ? void 0 : J.pages) || 1 }));
      } catch (k) {
        z && V(k.message || "Failed to load riders");
      } finally {
        z && S(!1);
      }
    })(), () => {
      z = !1;
    };
  }, [m, R, O]);
  const G = E.useMemo(() => o.filter((z) => !(m && !String(z.name || "").toLowerCase().includes(m.toLowerCase().trim()))), [o, m]), Y = E.useMemo(() => {
    const z = Number(ne.farePerKm);
    return Number.isFinite(z) ? z : ma.farePerKm;
  }, [ne]), Z = E.useMemo(() => {
    const z = Number(ne.baseFare);
    return Number.isFinite(z) ? z : ma.baseFare;
  }, [ne]);
  E.useEffect(() => {
    if (!Array.isArray(o) || o.length === 0) return;
    const z = {};
    for (const _ of o) {
      if (!_ || _.id === void 0 || _.id === null) continue;
      const te = Number(_.performancePct);
      Number.isFinite(te) && (z[_.id] = Math.round(te));
    }
    Object.keys(z).length !== 0 && L_(z);
  }, [o]);
  const X = E.useMemo(() => {
    const z = /* @__PURE__ */ new Date(), _ = [], te = [];
    for (let q = 2; q >= 0; q--) {
      const J = new Date(z.getFullYear(), z.getMonth() - q, 1), k = `${J.getFullYear()}-${String(J.getMonth() + 1).padStart(2, "0")}`, ce = J.toLocaleString(void 0, { month: "short", year: "numeric" });
      _.push(k), te.push(ce);
    }
    return { keys: _, labels: te };
  }, []);
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 171,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 172,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => ie(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 175,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 174,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 169,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ c.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 181,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (z) => {
          g(z.target.value), T(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 182,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 180,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 184,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: O, onChange: (z) => {
        D(parseInt(z.target.value, 10)), T(1);
      }, children: [10, 20, 50, 100].map((z) => /* @__PURE__ */ c.jsxDEV("option", { value: z, children: [
        z,
        "/page"
      ] }, z, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 186,
        columnNumber: 39
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 185,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 179,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: [
      I && /* @__PURE__ */ c.jsxDEV(M_, { onClose: () => ie(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 192,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 197,
            columnNumber: 17
          }, this),
          X.labels.map((z, _) => /* @__PURE__ */ c.jsxDEV("th", { className: "col-month", children: z }, X.keys[_], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 199,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-earnings", children: (() => {
            const z = X.keys[X.keys.length - 2], _ = String(z).split("-"), te = parseInt(_[0], 10), q = parseInt(_[1], 10);
            return `Earnings (${new Date(Number.isFinite(te) ? te : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(q) ? q - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 201,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 202,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 203,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 196,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 195,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          y && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 208,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 208,
            columnNumber: 17
          }, this),
          !y && f && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "auth-error", children: f }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 211,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 211,
            columnNumber: 17
          }, this),
          !y && !f && G.map((z) => /* @__PURE__ */ c.jsxDEV("tr", { "data-rider-id": z.id, "data-status": z.status, "data-last-days": z.lastActiveDays, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ c.jsxDEV("a", { className: "rider-name-link", href: `/riders/${z.id}`, children: z.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 215,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 215,
              columnNumber: 19
            }, this),
            X.keys.map((_) => {
              var te;
              return /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((te = z.monthlyCounts) == null ? void 0 : te[_]) || 0).toFixed(2),
                " km"
              ] }, _, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 217,
                columnNumber: 21
              }, this);
            }),
            (() => {
              var ce, ae;
              const _ = X.keys[X.keys.length - 2], te = Number(((ce = z.monthlyCounts) == null ? void 0 : ce[_]) || 0), q = Array.isArray(z.orders) ? z.orders : [], J = Number(((ae = z.monthlyRideCounts) == null ? void 0 : ae[_]) ?? P_(q, _) ?? 0), k = te * Y + J * Z;
              return /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(k) ? `${k.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 225,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-performance", children: Number.isFinite(Number(z.performancePct)) ? `${Math.round(Number(z.performancePct))}%` : "0%" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 227,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-total", children: [
              Number(z.totalKm || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 228,
              columnNumber: 19
            }, this)
          ] }, z.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 214,
            columnNumber: 17
          }, this)),
          !y && !f && G.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 232,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 232,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 206,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 194,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 190,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page <= 1 || y, onClick: () => T((z) => Math.max(1, z - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 240,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        L.page,
        " of ",
        L.pages,
        " • ",
        L.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 241,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: L.page >= L.pages || y, onClick: () => T((z) => Math.min(L.pages, z + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 242,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 239,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 238,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 168,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 167,
    columnNumber: 5
  }, this);
}
const Fv = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, pE = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
function Fa(o) {
  return o !== null && typeof o == "object";
}
function ui(o) {
  if (o == null) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      const p = o.toDate();
      if (p instanceof Date && !Number.isNaN(p.getTime())) return p;
    } catch {
      return null;
    }
  if (Fa(o) && o.seconds !== void 0) {
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
  if (Fa(o)) {
    if (o.at) return ui(o.at);
    if (o.value && o.value !== o) return ui(o.value);
    if (o.expectedAt) return ui(o.expectedAt);
  }
  return null;
}
function Sf(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const p = o.trim();
    if (!p) return null;
    if (Fv.test(p)) return parseFloat(p.replace(Fv, "$1"));
    if (pE.test(p)) return parseFloat(p.replace(pE, "$1")) / 60;
    const m = Number(p);
    return Number.isFinite(m) ? m : null;
  }
  if (Fa(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const p = Sf(o.duration);
      if (p !== null) return p;
    }
    if (o.value !== void 0 && o.value !== o) {
      const p = Sf(o.value);
      if (p !== null) return p;
    }
  }
  return null;
}
function B_(o) {
  var m, g, y, S, f, V;
  if (!Fa(o)) return null;
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
    (f = o.orders) == null ? void 0 : f.actualDuration,
    (V = o.orders) == null ? void 0 : V.actualDurationMinutes
  ];
  for (const R of p) {
    const T = Sf(R);
    if (T !== null) return T;
  }
  return null;
}
function $_(o) {
  var m, g, y, S;
  if (!Fa(o)) return null;
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
  for (const f of p)
    if (f != null) return f;
  return null;
}
function kE(o) {
  var m, g, y, S, f, V;
  if (!Fa(o)) return null;
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
    (f = o.orders) == null ? void 0 : f.started_at,
    (V = o.orders) == null ? void 0 : V.startedAt
  ];
  for (const R of p)
    if (R != null) return R;
  return null;
}
function I_(o) {
  if (!Fa(o)) return null;
  const p = kE(o);
  return p ?? null;
}
function UE(o) {
  if (!Fa(o)) return null;
  const p = B_(o);
  if (Number.isFinite(p)) return p;
  const m = ui($_(o)), g = ui(kE(o));
  if (m instanceof Date && g instanceof Date) {
    const y = m.getTime() - g.getTime();
    if (y >= 0)
      return Math.round(y / 6e4);
  }
  return null;
}
function FE(o) {
  const p = ui(o);
  if (!(p instanceof Date) || Number.isNaN(p.getTime())) return "-";
  try {
    return p.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function zE(o) {
  if (o == null) return "-";
  if (Fa(o) && o.minutes !== void 0) {
    const m = Number(o.minutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  const p = ui(o);
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
    const g = m.match(Fv);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : m;
  }
  if (Fa(o) && o.expectedMinutes !== void 0) {
    const m = Number(o.expectedMinutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  return String(o);
}
function PE(o) {
  var g, y, S, f, V, R, T, O;
  if (!Fa(o)) return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (S = o.orders) == null ? void 0 : S.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (V = o.delivery) == null ? void 0 : V.expected_delivery_time,
    (R = o.delivery) == null ? void 0 : R.expectedDeliveryTime,
    (T = o.expected_delivery) == null ? void 0 : T.time,
    (O = o.expected_delivery) == null ? void 0 : O.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const D of p)
    if (D != null && !(typeof D == "string" && !D.trim()))
      return D;
  const m = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(m))
    for (let D = m.length - 1; D >= 0; D -= 1) {
      const L = m[D];
      if (!L) continue;
      const A = typeof L.type == "string" ? L.type.toLowerCase().trim() : "";
      if (!(A !== "eta" && A !== "expected")) {
        if (L.expectedMinutes !== void 0 && L.expectedMinutes !== null) return { minutes: L.expectedMinutes };
        if (L.minutes !== void 0 && L.minutes !== null) return { minutes: L.minutes };
        if (L.expectedAt) return L.expectedAt;
      }
    }
  return null;
}
function HE(o) {
  const p = Sf(o);
  if (p === null || !Number.isFinite(p)) return "-";
  const m = Math.round(p);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), y = m % 60;
  return `${g}h ${y}m`;
}
function Y_() {
  var A;
  const { id: o } = Fw(), [p, m] = E.useState(null), [g, y] = E.useState(!0), [S, f] = E.useState(""), [V, R] = E.useState(null);
  if (E.useEffect(() => {
    const I = V_(o);
    if (typeof I == "number" && Number.isFinite(I))
      R(I);
    else if (typeof I == "string") {
      const ie = Number(I);
      Number.isFinite(ie) ? R(ie) : R(null);
    } else
      R(null);
  }, [o]), E.useEffect(() => {
    let I = !0;
    return (async () => {
      y(!0), f("");
      try {
        const ie = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (ie.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ie.ok) throw new Error("Failed to load rider");
        const ne = await ie.json();
        I && m(ne);
      } catch (ie) {
        I && f(ie.message || "Failed to load rider");
      } finally {
        I && y(!1);
      }
    })(), () => {
      I = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 47,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 47,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 47,
      columnNumber: 12
    }, this);
  if (S)
    return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: S }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 50,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 50,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 50,
      columnNumber: 12
    }, this);
  if (!p)
    return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 53,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 53,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 53,
      columnNumber: 12
    }, this);
  const { rider: T, metrics: O, history: D } = p, L = V ?? (Number.isFinite(Number(O == null ? void 0 : O.onTimeRate)) ? Math.round(Number(O.onTimeRate)) : 0);
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 62,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ c.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { children: [
        /* @__PURE__ */ c.jsxDEV("h3", { className: "rp-name", children: T.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          T.id
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 72,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 70,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 68,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 67,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ c.jsxDEV("strong", { children: Array.isArray(T.orders) ? T.orders.length : 0 }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ c.jsxDEV("strong", { children: [
          L,
          "%"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 80,
          columnNumber: 66
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 80,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ c.jsxDEV("strong", { children: [
          Number(T.totalKm || 0),
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 81,
          columnNumber: 71
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 81,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 78,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 77,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-name order-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-km date-heading", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-comm distance-heading", children: "Distance (KM)" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 88,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 87,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("tbody", { children: [
        (p.riderOrders || []).map((I, ie) => {
          const ne = I.name || I.orderId, pe = ui(I.created_at), G = pe instanceof Date && !Number.isNaN(pe.getTime()) ? pe.toISOString().slice(0, 10) : "-", Y = FE(I.deliveryStartTime), Z = PE(I), X = zE(Z), z = UE(I), _ = HE(z), te = Number(I.distance_km), q = Number.isFinite(te) ? `${te.toFixed(2)} km` : typeof I.distance_km == "string" && I.distance_km.trim() ? I.distance_km : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: ne }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: G }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: X }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: _ }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: q }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, I.orderId || ie, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 112,
            columnNumber: 19
          }, this);
        }),
        !((A = p.riderOrders) != null && A.length) && (D || []).map((I, ie) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: I.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: I.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: I.avgTime ? `${I.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(I.distanceKm)) ? `${Number(I.distanceKm).toFixed(2)} km` : I.distanceKm || "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this)
        ] }, `h-${ie}`, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 123,
          columnNumber: 17
        }, this))
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 97,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 86,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 85,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 61,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 60,
    columnNumber: 5
  }, this);
}
function BE({ orderId: o, onClose: p, onAssigned: m }) {
  const [g, y] = E.useState([]), [S, f] = E.useState(!0), [V, R] = E.useState(""), [T, O] = E.useState(null), [D, L] = E.useState("rider"), [A, I] = E.useState([]), [ie, ne] = E.useState(!1), [pe, G] = E.useState(""), [Y, Z] = E.useState(null);
  E.useEffect(() => {
    let _ = !0;
    return (async () => {
      f(!0), R("");
      try {
        const te = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!te.ok) throw new Error("Failed to load riders");
        const q = await te.json();
        _ && y(Array.isArray(q.riders) ? q.riders : q.riders || []);
      } catch (te) {
        _ && R(te.message || "Failed to load riders");
      } finally {
        _ && f(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, []), E.useEffect(() => {
    if (D !== "packer") return;
    let _ = !0;
    return (async () => {
      ne(!0), G("");
      try {
        const te = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!te.ok) throw new Error("Failed to load packers");
        const q = await te.json();
        _ && I(Array.isArray(q.packers) ? q.packers : q.packers || []);
      } catch (te) {
        _ && G(te.message || "Failed to load packers");
      } finally {
        _ && ne(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, [D]);
  async function X(_) {
    if (!(!o || !_)) {
      O(_);
      try {
        const te = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: _ })
        });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const q = await te.json().catch(() => null);
        if (!te.ok) throw new Error(q && q.error ? q.error : "Assign failed");
        m && m({ orderId: o, riderId: _ }), L("packer");
      } catch (te) {
        alert(te.message || "Failed to assign rider");
      } finally {
        O(null);
      }
    }
  }
  async function z(_) {
    if (!(!o || !_)) {
      Z(_);
      try {
        const te = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packerId: _ })
        });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const q = await te.json().catch(() => null);
        if (!te.ok) throw new Error(q && q.error ? q.error : "Assign failed");
        const J = A.find((ce) => ce.id === _), k = J ? J.name : _;
        try {
          window && typeof window.showToast == "function" && window.showToast(`Packer assigned: ${k}`, { type: "success" });
        } catch {
        }
        p();
      } catch (te) {
        alert(te.message || "Failed to assign packer");
      } finally {
        Z(null);
      }
    }
  }
  return /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ c.jsxDEV("h3", { className: "assign-modal-title", children: D === "packer" ? "Assign Packers" : "Assign Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 91,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "assign-modal-close", onClick: p, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 92,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 90,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-body", children: D !== "packer" ? /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      S && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 97,
        columnNumber: 27
      }, this),
      V && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: V }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 98,
        columnNumber: 25
      }, this),
      !S && !V && /* @__PURE__ */ c.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 102,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 102,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 102,
            columnNumber: 65
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 102,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 101,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          g.map((_) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { children: _.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 107,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: _.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 108,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-assign", onClick: () => X(_.id), disabled: T && T !== _.id, children: T === _.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 110,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 109,
              columnNumber: 25
            }, this)
          ] }, _.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 106,
            columnNumber: 23
          }, this)),
          g.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 116,
            columnNumber: 50
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 116,
            columnNumber: 46
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 104,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 100,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 96,
      columnNumber: 13
    }, this) : /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      ie && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading packers…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 123,
        columnNumber: 34
      }, this),
      pe && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: pe }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 124,
        columnNumber: 32
      }, this),
      !ie && !pe && /* @__PURE__ */ c.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 128,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 128,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 128,
            columnNumber: 65
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 128,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 127,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          A.map((_) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { children: _.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 133,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: _.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 134,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-assign", onClick: () => z(_.id), disabled: Y && Y !== _.id, children: Y === _.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 136,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 135,
              columnNumber: 25
            }, this)
          ] }, _.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 132,
            columnNumber: 23
          }, this)),
          A.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No packers found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 51
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 47
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 130,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 126,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 122,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 94,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 89,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}
function zv(o) {
  if (typeof o != "string") return "";
  const p = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return p === "in_transit" ? "in_progress" : p;
}
function $E(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function mE(o) {
  return zv($E(o));
}
const q_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], vE = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function G_() {
  const [o, p] = E.useState([]), [m, g] = E.useState(""), [y, S] = E.useState("all"), [f, V] = E.useState(1), [R, T] = E.useState(20), [O, D] = E.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [L, A] = E.useState(!0), [I, ie] = E.useState(""), [ne, pe] = E.useState(""), [G, Y] = E.useState(!0), [Z, X] = E.useState(!1), [z, _] = E.useState(null);
  E.useEffect(() => {
    let k = !0;
    return (async () => {
      var ce, ae, Ce, Ve;
      A(!0), ie(""), pe("");
      try {
        const ye = new URLSearchParams();
        if (m && ye.set("q", m), y && y !== "all") {
          const pn = vE[y] || y;
          ye.set("status", zv(pn));
        }
        ye.set("page", String(f)), ye.set("limit", String(R));
        const me = await fetch(`/api/orders?${ye.toString()}`, { credentials: "include" });
        if (me.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!me.ok) throw new Error("Failed to load orders");
        const Ge = await me.json();
        k && (p(Array.isArray(Ge.orders) ? Ge.orders : []), pe(Ge.shopifyError || ""), Y(!!Ge.shopifyConfigured), D({ total: ((ce = Ge.meta) == null ? void 0 : ce.total) || 0, page: ((ae = Ge.meta) == null ? void 0 : ae.page) || 1, limit: ((Ce = Ge.meta) == null ? void 0 : Ce.limit) || R, pages: ((Ve = Ge.meta) == null ? void 0 : Ve.pages) || 1 }));
      } catch (ye) {
        k && ie(ye.message || "Failed to load orders");
      } finally {
        k && A(!1);
      }
    })(), () => {
      k = !1;
    };
  }, [m, y, f, R]), E.useMemo(() => o, [o]);
  const te = E.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const k = zv(vE[y] || y);
    return o.filter((ce) => mE(ce) === k);
  }, [o, y]);
  function q() {
    _(null), X(!1);
  }
  function J(k) {
    try {
      const { orderId: ce } = k || {};
      if (!ce) return;
      const ae = String(ce).replace(/^#+/, "");
      V(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${ce}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 104,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 102,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ c.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (k) => {
          g(k.target.value), V(1);
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
        q_.map(({ key: k, label: ce }) => /* @__PURE__ */ c.jsxDEV("button", { className: `rc-select rc-chip${y === k ? " active" : ""}`, onClick: () => {
          S(k), V(1);
        }, "data-filter": k, children: ce }, k, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ c.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: R, onChange: (k) => {
          T(parseInt(k.target.value, 10)), V(1);
        }, children: [10, 20, 50, 100].map((k) => /* @__PURE__ */ c.jsxDEV("option", { value: k, children: [
          k,
          "/page"
        ] }, k, !0, {
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
    !G && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 125,
      columnNumber: 11
    }, this),
    ne && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: ne }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 127,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 133,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 134,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 135,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 136,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 137,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 139,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
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
      /* @__PURE__ */ c.jsxDEV("tbody", { children: [
        L && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 17
        }, this),
        !L && I && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "auth-error", children: I }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 17
        }, this),
        !L && !I && te.map((k, ce) => {
          var Dt;
          const ae = $E(k), Ce = mE(k), Ve = k.full_name || (k.customer && k.customer.full_name ? k.customer.full_name : "");
          let ye = "-";
          typeof k.shipping_address == "string" && String(k.shipping_address).trim() ? ye = String(k.shipping_address).trim() : k.shipping_address && typeof k.shipping_address == "object" ? ye = [k.shipping_address.address1 || "", k.shipping_address.city || "", k.shipping_address.province || "", k.shipping_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof k.billing_address == "string" && String(k.billing_address).trim() ? ye = String(k.billing_address).trim() : k.billing_address && typeof k.billing_address == "object" && (ye = [k.billing_address.address1 || "", k.billing_address.city || "", k.billing_address.province || "", k.billing_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-");
          const me = k.name || k.order_number || k.id, pn = (me != null ? String(me).replace(/^#+/, "").trim() : "") || "-", Qt = I_(k), xn = FE(Qt), Ct = PE(k), Yn = zE(Ct), Xt = UE(k), ha = HE(Xt), na = k.rider ? String(k.rider) : (Dt = k.assignment) != null && Dt.riderId ? String(k.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": Ce, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-id-cell", children: pn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 179,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km customer-cell", children: Ve || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 180,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf address-cell", children: ye }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 181,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-rider rider-cell", children: na }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 182,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: xn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 183,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Yn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 184,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: ha }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 185,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${Ce}`, children: ae }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 63
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 21
            }, this)
          ] }, me || ce, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 178,
            columnNumber: 19
          }, this);
        }),
        !L && !I && te.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      Z && z && /* @__PURE__ */ c.jsxDEV(BE, { orderId: z, onClose: q, onAssigned: J }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || L, onClick: () => V((k) => Math.max(1, k - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          O.page,
          " of ",
          O.pages,
          " • ",
          O.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || L, onClick: () => V((k) => Math.min(O.pages, k + 1)), children: "Next" }, void 0, !1, {
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
function W_() {
  const [o, p] = E.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = E.useState([]), [y, S] = E.useState(!1), [f, V] = E.useState(!0), [R, T] = E.useState("");
  return E.useEffect(() => {
    let O = !0;
    return (async () => {
      V(!0), T("");
      try {
        const D = await fetch("/api/reports", { credentials: "include" });
        if (D.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!D.ok) throw new Error("Failed to load reports");
        const L = await D.json();
        O && (p(L.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(L.deliveries) ? L.deliveries : []));
      } catch (D) {
        O && T(D.message || "Failed to load reports");
      } finally {
        O && V(!1);
      }
    })(), () => {
      O = !1;
    };
  }, []), /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ c.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ c.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c.jsxDEV("div", { className: "reports-stat-value", children: o.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ c.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c.jsxDEV("div", { className: "reports-stat-value", children: [
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ c.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: y, onChange: (O) => S(O.target.checked) }, void 0, !1, {
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
      y && /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          !f && !R && m.map((O, D) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              O.orderNumber || O.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km", children: O.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: O.expectedMinutes != null ? `${O.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: O.durationMins != null ? `${O.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission", children: O.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, O.orderId || D, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !f && !R && m.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          f && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          R && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 6, className: "auth-error", children: R }, void 0, !1, {
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
function K_({ onClose: o, onCreated: p }) {
  const [m, g] = E.useState(""), [y, S] = E.useState(""), [f, V] = E.useState(""), [R, T] = E.useState(""), [O, D] = E.useState(!1), [L, A] = E.useState(""), [I, ie] = E.useState(""), [ne, pe] = E.useState(!1), [G, Y] = E.useState(!1), [Z, X] = E.useState(!1), [z, _] = E.useState(!1);
  async function te() {
    A(""), ie(""), _(!0);
    const q = String(m).trim(), J = String(y), k = String(f).trim(), ce = String(R).trim(), ae = ce.replace(/\D+/g, ""), Ce = { fn: !k, cn: !ce, pw: !J };
    if (pe(Ce.fn), Y(Ce.cn || ae.length < 7), X(Ce.pw), Ce.fn || Ce.cn || Ce.pw) {
      A("Full name, mobile and password are required");
      return;
    }
    if (ae.length < 7) {
      A("Please enter a valid mobile number"), Y(!0);
      return;
    }
    if (q && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q)) {
      A("Please enter a valid email");
      return;
    }
    if (J.length < 6) {
      X(!0), A("Password must be at least 6 characters");
      return;
    }
    D(!0);
    try {
      const Ve = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: q, password: J, fullName: k, contactNumber: ce })
      }), ye = await Ve.json().catch(() => null);
      if (!Ve.ok) {
        const me = String(ye && (ye.error || ye.message) || ""), Ge = me.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(me) || /MISSING\s*EMAIL\/PASSWORD/i.test(me))
          A("Full name, mobile and password are required"), pe(!k), Y(!ce || ae.length < 7), X(!J);
        else if (Ge.includes("EMAIL_EXISTS"))
          A("An account with this email already exists. Use a different email or leave email blank.");
        else if (Ge.includes("INVALID_EMAIL"))
          A("Please enter a valid email");
        else if (Ge.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(me))
          X(!0), A("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(me))
          Y(!0), A("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(me))
          A("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(me || "Failed to create packer");
        return;
      }
      ie("Packer created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (Ve) {
      const ye = String((Ve == null ? void 0 : Ve.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(ye) ? A("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(ye) ? A("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(ye) ? A("Please enter a valid email") : /WEAK_PASSWORD/i.test(ye) || /AT LEAST 6 CHARACTERS/i.test(ye) ? (X(!0), A("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(ye) ? (Y(!0), A("Please enter a valid mobile number")) : A(ye || "Failed to create packer");
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ c.jsxDEV("h3", { className: "create-rider-title", children: "Create Packer" }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreatePackerModal.jsx",
      lineNumber: 93,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-body", children: [
      I && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: I }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 98,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (z && !String(f).trim() ? " input-error" : ""), value: f, onChange: (q) => {
          V(q.target.value), z && pe(!String(q.target.value).trim());
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 100,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 99,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Email",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (q) => {
          g(q.target.value);
        } }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 103,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (z && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (q) => {
          S(q.target.value), z && X(!String(q.target.value));
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 106,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (z && String(R).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: R, onChange: (q) => {
          if (T(q.target.value), z) {
            const J = String(q.target.value).trim().replace(/\D+/g, "");
            Y(!(J.length >= 7));
          }
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      L && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: L }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 111,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: O, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 113,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: te, disabled: O, children: O ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 114,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 112,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreatePackerModal.jsx",
      lineNumber: 97,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreatePackerModal.jsx",
    lineNumber: 92,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreatePackerModal.jsx",
    lineNumber: 91,
    columnNumber: 5
  }, this);
}
function Q_() {
  const [o, p] = E.useState([]), [m, g] = E.useState(!0), [y, S] = E.useState(""), [f, V] = E.useState(1), [R, T] = E.useState(25), [O, D] = E.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  E.useEffect(() => {
    let z = !0;
    return (async () => {
      var _, te, q, J;
      g(!0), S("");
      try {
        const k = new URLSearchParams();
        k.set("limit", String(R)), k.set("page", String(f)), k.set("status", "new");
        const ce = await fetch(`/api/orders?${k.toString()}`, { credentials: "include" });
        if (ce.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ce.ok) throw new Error("Failed to load orders");
        const ae = await ce.json();
        z && (p(Array.isArray(ae.orders) ? ae.orders : []), D({ total: ((_ = ae.meta) == null ? void 0 : _.total) || 0, page: ((te = ae.meta) == null ? void 0 : te.page) || f, limit: ((q = ae.meta) == null ? void 0 : q.limit) || R, pages: ((J = ae.meta) == null ? void 0 : J.pages) || 1 }));
      } catch (k) {
        z && S(k.message || "Failed to load orders");
      } finally {
        z && g(!1);
      }
    })(), () => {
      z = !1;
    };
  }, [f]);
  function L(z) {
    return !z || typeof z != "object" ? "new" : typeof z.current_status == "string" && String(z.current_status).trim() ? String(z.current_status).toLowerCase().trim() : "new";
  }
  const [A, I] = E.useState(!1), [ie, ne] = E.useState(null), [pe, G] = E.useState(!1);
  function Y(z) {
    ne(z), I(!0);
  }
  function Z() {
    ne(null), I(!1);
  }
  function X(z) {
    try {
      const { orderId: _ } = z || {};
      if (!_) return;
      const te = String(_).replace(/^#+/, "");
      p((q) => q.filter((J, k) => {
        const ce = String(J.id || J.name || J.order_number || k).replace(/^#+/, "");
        return String(ce) !== String(te);
      })), D((q) => ({ ...q || {}, total: Math.max(0, ((q == null ? void 0 : q.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${_}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 73,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ c.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ c.jsxDEV("div", { className: "stat-value", children: m ? "…" : O.total || o.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => G(!0), children: "Create Packer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 71,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
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
      /* @__PURE__ */ c.jsxDEV("tbody", { children: [
        m && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 28
        }, this),
        !m && y && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "auth-error", children: y }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 28
        }, this),
        !m && !y && (Array.isArray(o) ? o.filter((_) => L(_) === "new") : []).map((_, te) => {
          const q = L(_), J = _.full_name || (_.customer && _.customer.full_name ? _.customer.full_name : "");
          let k = "-";
          typeof _.shipping_address == "string" && String(_.shipping_address).trim() ? k = String(_.shipping_address).trim() : _.shipping_address && typeof _.shipping_address == "object" ? k = [_.shipping_address.address1 || "", _.shipping_address.city || "", _.shipping_address.province || "", _.shipping_address.country || ""].map((me) => String(me || "").trim()).filter(Boolean).join(", ") || "-" : typeof _.billing_address == "string" && String(_.billing_address).trim() ? k = String(_.billing_address).trim() : _.billing_address && typeof _.billing_address == "object" && (k = [_.billing_address.address1 || "", _.billing_address.city || "", _.billing_address.province || "", _.billing_address.country || ""].map((me) => String(me || "").trim()).filter(Boolean).join(", ") || "-");
          const ce = _.name || _.order_number || _.id || te, ae = String(_.id || _.name || _.order_number || te).replace(/^#+/, ""), Ce = _.created_at ? new Date(_.created_at) : null, Ve = Ce ? Ce.toLocaleDateString() : "-", ye = Ce ? Ce.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": q, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-order", children: ce }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-customer", children: J || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-address", children: k }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${q}`, children: q.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-date", children: Ve }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-time", children: ye }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ c.jsxDEV("button", { className: "order-action btn-manage", onClick: () => Y(String(_.id || _.name || _.order_number || te)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, ae, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 125,
            columnNumber: 21
          }, this);
        }),
        !m && !y && o.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || m, onClick: () => V((z) => Math.max(1, z - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        O.page,
        " of ",
        O.pages,
        " • ",
        O.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || m, onClick: () => V((z) => Math.min(O.pages, z + 1)), children: "Next" }, void 0, !1, {
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
    A && ie && /* @__PURE__ */ c.jsxDEV(BE, { orderId: ie, onClose: Z, onAssigned: X }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    pe && /* @__PURE__ */ c.jsxDEV(K_, { onClose: () => G(!1), onCreated: () => {
      try {
        window && typeof window.showToast == "function" && window.showToast("Packer created", { type: "success" });
      } catch {
      }
    } }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 154,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 70,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}
function X_() {
  const [o, p] = E.useState(ma.baseFare), [m, g] = E.useState(ma.farePerKm), [y, S] = E.useState(!1);
  E.useEffect(() => {
    const R = AE();
    p(R.baseFare), g(R.farePerKm);
  }, []);
  function f() {
    S(!0);
    try {
      const R = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.setItem(Ef, JSON.stringify(R));
        try {
          window.dispatchEvent(new Event("fare-settings-changed"));
        } catch {
        }
      }
      try {
        typeof window < "u" && typeof window.showToast == "function" && window.showToast("Settings saved", { type: "success" });
      } catch {
      }
    } finally {
      S(!1);
    }
  }
  function V() {
    p(ma.baseFare), g(ma.farePerKm);
    try {
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.removeItem(Ef);
        try {
          window.dispatchEvent(new Event("fare-settings-changed"));
        } catch {
        }
      }
    } catch {
    }
  }
  return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ c.jsxDEV("h2", { className: "rc-title", children: "Settings" }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "Manage fares for earnings calculations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "fare-settings-card", children: [
      /* @__PURE__ */ c.jsxDEV("div", { className: "fare-fields", children: [
        /* @__PURE__ */ c.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ c.jsxDEV("span", { className: "fare-field-label", children: "Base Fare" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c.jsxDEV(
            "input",
            {
              type: "number",
              className: "fare-field-input",
              value: Number.isFinite(o) ? String(o) : "",
              min: "0",
              step: "0.01",
              onChange: (R) => p(R.target.value === "" ? 0 : Number(R.target.value)),
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
        /* @__PURE__ */ c.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ c.jsxDEV("span", { className: "fare-field-label", children: "Fare per Km" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c.jsxDEV(
            "input",
            {
              type: "number",
              className: "fare-field-input",
              value: Number.isFinite(m) ? String(m) : "",
              min: "0",
              step: "0.01",
              onChange: (R) => g(R.target.value === "" ? 0 : Number(R.target.value)),
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "fare-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: f, disabled: y, children: "Save" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: V, disabled: y, children: "Reset" }, void 0, !1, {
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
function J_() {
  return /* @__PURE__ */ c.jsxDEV(g_, { children: /* @__PURE__ */ c.jsxDEV(n_, { children: [
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/auth/login", element: /* @__PURE__ */ c.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/auth/register", element: /* @__PURE__ */ c.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/riders", element: /* @__PURE__ */ c.jsxDEV(H_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/riders/:id", element: /* @__PURE__ */ c.jsxDEV(Y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/orders", element: /* @__PURE__ */ c.jsxDEV(G_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/reports", element: /* @__PURE__ */ c.jsxDEV(W_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/dashboard", element: /* @__PURE__ */ c.jsxDEV(Q_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/settings", element: /* @__PURE__ */ c.jsxDEV(X_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 42
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "*", element: /* @__PURE__ */ c.jsxDEV(e_, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function hE() {
  const o = document.getElementById("react-root");
  if (!o) return;
  SE(o).render(/* @__PURE__ */ c.jsxDEV(J_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", hE) : hE();
