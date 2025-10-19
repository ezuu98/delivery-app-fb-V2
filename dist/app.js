function aw(o, p) {
  for (var m = 0; m < p.length; m++) {
    const g = p[m];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const y in g)
        if (y !== "default" && !(y in o)) {
          const E = Object.getOwnPropertyDescriptor(g, y);
          E && Object.defineProperty(o, y, E.get ? E : {
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
var gE = { exports: {} }, Lv = {}, yE = { exports: {} }, bf = { exports: {} };
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
    var m = "18.3.1", g = Symbol.for("react.element"), y = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), T = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), oe = Symbol.for("react.offscreen"), ee = Symbol.iterator, pe = "@@iterator";
    function K(d) {
      if (d === null || typeof d != "object")
        return null;
      var b = ee && d[ee] || d[pe];
      return typeof b == "function" ? b : null;
    }
    var q = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, G = {
      transition: null
    }, F = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, I = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, B = {}, te = null;
    function J(d) {
      te = d;
    }
    B.setExtraStackFrame = function(d) {
      te = d;
    }, B.getCurrentStack = null, B.getStackAddendum = function() {
      var d = "";
      te && (d += te);
      var b = B.getCurrentStack;
      return b && (d += b() || ""), d;
    };
    var ne = !1, k = !1, he = !1, fe = !1, Le = !1, Ue = {
      ReactCurrentDispatcher: q,
      ReactCurrentBatchConfig: G,
      ReactCurrentOwner: I
    };
    Ue.ReactDebugCurrentFrame = B, Ue.ReactCurrentActQueue = F;
    function _e(d) {
      {
        for (var b = arguments.length, M = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          M[z - 1] = arguments[z];
        Je("warn", d, M);
      }
    }
    function ye(d) {
      {
        for (var b = arguments.length, M = new Array(b > 1 ? b - 1 : 0), z = 1; z < b; z++)
          M[z - 1] = arguments[z];
        Je("error", d, M);
      }
    }
    function Je(d, b, M) {
      {
        var z = Ue.ReactDebugCurrentFrame, Z = z.getStackAddendum();
        Z !== "" && (b += "%s", M = M.concat([Z]));
        var Re = M.map(function(ve) {
          return String(ve);
        });
        Re.unshift("Warning: " + b), Function.prototype.apply.call(console[d], console, Re);
      }
    }
    var pn = {};
    function Qt(d, b) {
      {
        var M = d.constructor, z = M && (M.displayName || M.name) || "ReactClass", Z = z + "." + b;
        if (pn[Z])
          return;
        ye("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", b, z), pn[Z] = !0;
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
      enqueueForceUpdate: function(d, b, M) {
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
      enqueueReplaceState: function(d, b, M, z) {
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
      enqueueSetState: function(d, b, M, z) {
        Qt(d, "setState");
      }
    }, Ct = Object.assign, In = {};
    Object.freeze(In);
    function Xt(d, b, M) {
      this.props = d, this.context = b, this.refs = In, this.updater = M || xn;
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
            _e("%s(...) is deprecated in plain JavaScript React classes. %s", b[0], b[1]);
          }
        });
      };
      for (var Dt in ha)
        ha.hasOwnProperty(Dt) && na(Dt, ha[Dt]);
    }
    function Jt() {
    }
    Jt.prototype = Xt.prototype;
    function Zt(d, b, M) {
      this.props = d, this.context = b, this.refs = In, this.updater = M || xn;
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
        var b = typeof Symbol == "function" && Symbol.toStringTag, M = b && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return M;
      }
    }
    function $t(d) {
      try {
        return Yt(d), !1;
      } catch {
        return !0;
      }
    }
    function Yt(d) {
      return "" + d;
    }
    function aa(d) {
      if ($t(d))
        return ye("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(d)), Yt(d);
    }
    function rr(d, b, M) {
      var z = d.displayName;
      if (z)
        return z;
      var Z = b.displayName || b.name || "";
      return Z !== "" ? M + "(" + Z + ")" : M;
    }
    function ga(d) {
      return d.displayName || "Context";
    }
    function Un(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && ye("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case E:
          return "Fragment";
        case y:
          return "Portal";
        case A:
          return "Profiler";
        case f:
          return "StrictMode";
        case D:
          return "Suspense";
        case V:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case T:
            var b = d;
            return ga(b) + ".Consumer";
          case C:
            var M = d;
            return ga(M._context) + ".Provider";
          case O:
            return rr(d, d.render, "ForwardRef");
          case U:
            var z = d.displayName || null;
            return z !== null ? z : Un(d.type) || "Memo";
          case Y: {
            var Z = d, Re = Z._payload, ve = Z._init;
            try {
              return Un(ve(Re));
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
    }, Cn, Ha, Ot;
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
      var M = function() {
        Cn || (Cn = !0, ye("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      M.isReactWarning = !0, Object.defineProperty(d, "key", {
        get: M,
        configurable: !0
      });
    }
    function ir(d, b) {
      var M = function() {
        Ha || (Ha = !0, ye("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", b));
      };
      M.isReactWarning = !0, Object.defineProperty(d, "ref", {
        get: M,
        configurable: !0
      });
    }
    function re(d) {
      if (typeof d.ref == "string" && I.current && d.__self && I.current.stateNode !== d.__self) {
        var b = Un(I.current.type);
        Ot[b] || (ye('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b, d.ref), Ot[b] = !0);
      }
    }
    var be = function(d, b, M, z, Z, Re, ve) {
      var Oe = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: d,
        key: b,
        ref: M,
        props: ve,
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
        value: Z
      }), Object.freeze && (Object.freeze(Oe.props), Object.freeze(Oe)), Oe;
    };
    function Fe(d, b, M) {
      var z, Z = {}, Re = null, ve = null, Oe = null, $e = null;
      if (b != null) {
        Dn(b) && (ve = b.ref, re(b)), Fn(b) && (aa(b.key), Re = "" + b.key), Oe = b.__self === void 0 ? null : b.__self, $e = b.__source === void 0 ? null : b.__source;
        for (z in b)
          mn.call(b, z) && !nn.hasOwnProperty(z) && (Z[z] = b[z]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        Z.children = M;
      else if (tt > 1) {
        for (var ot = Array(tt), st = 0; st < tt; st++)
          ot[st] = arguments[st + 2];
        Object.freeze && Object.freeze(ot), Z.children = ot;
      }
      if (d && d.defaultProps) {
        var He = d.defaultProps;
        for (z in He)
          Z[z] === void 0 && (Z[z] = He[z]);
      }
      if (Re || ve) {
        var vt = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
        Re && Mr(Z, vt), ve && ir(Z, vt);
      }
      return be(d, Re, ve, Oe, $e, I.current, Z);
    }
    function et(d, b) {
      var M = be(d.type, b, d.ref, d._self, d._source, d._owner, d.props);
      return M;
    }
    function ct(d, b, M) {
      if (d == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + d + ".");
      var z, Z = Ct({}, d.props), Re = d.key, ve = d.ref, Oe = d._self, $e = d._source, tt = d._owner;
      if (b != null) {
        Dn(b) && (ve = b.ref, tt = I.current), Fn(b) && (aa(b.key), Re = "" + b.key);
        var ot;
        d.type && d.type.defaultProps && (ot = d.type.defaultProps);
        for (z in b)
          mn.call(b, z) && !nn.hasOwnProperty(z) && (b[z] === void 0 && ot !== void 0 ? Z[z] = ot[z] : Z[z] = b[z]);
      }
      var st = arguments.length - 2;
      if (st === 1)
        Z.children = M;
      else if (st > 1) {
        for (var He = Array(st), vt = 0; vt < st; vt++)
          He[vt] = arguments[vt + 2];
        Z.children = He;
      }
      return be(d.type, Re, ve, Oe, $e, tt, Z);
    }
    function gt(d) {
      return typeof d == "object" && d !== null && d.$$typeof === g;
    }
    var yt = ".", vn = ":";
    function Nt(d) {
      var b = /[=:]/g, M = {
        "=": "=0",
        ":": "=2"
      }, z = d.replace(b, function(Z) {
        return M[Z];
      });
      return "$" + z;
    }
    var it = !1, Et = /\/+/g;
    function ya(d) {
      return d.replace(Et, "$&/");
    }
    function ba(d, b) {
      return typeof d == "object" && d !== null && d.key != null ? (aa(d.key), Nt("" + d.key)) : b.toString(36);
    }
    function ra(d, b, M, z, Z) {
      var Re = typeof d;
      (Re === "undefined" || Re === "boolean") && (d = null);
      var ve = !1;
      if (d === null)
        ve = !0;
      else
        switch (Re) {
          case "string":
          case "number":
            ve = !0;
            break;
          case "object":
            switch (d.$$typeof) {
              case g:
              case y:
                ve = !0;
            }
        }
      if (ve) {
        var Oe = d, $e = Z(Oe), tt = z === "" ? yt + ba(Oe, 0) : z;
        if (Bt($e)) {
          var ot = "";
          tt != null && (ot = ya(tt) + "/"), ra($e, b, ot, "", function(_f) {
            return _f;
          });
        } else $e != null && (gt($e) && ($e.key && (!Oe || Oe.key !== $e.key) && aa($e.key), $e = et(
          $e,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          M + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          ($e.key && (!Oe || Oe.key !== $e.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            ya("" + $e.key) + "/"
          ) : "") + tt
        )), b.push($e));
        return 1;
      }
      var st, He, vt = 0, Tt = z === "" ? yt : z + vn;
      if (Bt(d))
        for (var Ei = 0; Ei < d.length; Ei++)
          st = d[Ei], He = Tt + ba(st, Ei), vt += ra(st, b, M, He, Z);
      else {
        var Eo = K(d);
        if (typeof Eo == "function") {
          var ur = d;
          Eo === ur.entries && (it || _e("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), it = !0);
          for (var So = Eo.call(ur), xo, wf = 0; !(xo = So.next()).done; )
            st = xo.value, He = Tt + ba(st, wf++), vt += ra(st, b, M, He, Z);
        } else if (Re === "object") {
          var hu = String(d);
          throw new Error("Objects are not valid as a React child (found: " + (hu === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : hu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return vt;
    }
    function lr(d, b, M) {
      if (d == null)
        return d;
      var z = [], Z = 0;
      return ra(d, z, "", "", function(Re) {
        return b.call(M, Re, Z++);
      }), z;
    }
    function io(d) {
      var b = 0;
      return lr(d, function() {
        b++;
      }), b;
    }
    function fi(d, b, M) {
      lr(d, function() {
        b.apply(this, arguments);
      }, M);
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
        $$typeof: C,
        _context: b
      };
      var M = !1, z = !1, Z = !1;
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
            set: function(ve) {
              b.Provider = ve;
            }
          },
          _currentValue: {
            get: function() {
              return b._currentValue;
            },
            set: function(ve) {
              b._currentValue = ve;
            }
          },
          _currentValue2: {
            get: function() {
              return b._currentValue2;
            },
            set: function(ve) {
              b._currentValue2 = ve;
            }
          },
          _threadCount: {
            get: function() {
              return b._threadCount;
            },
            set: function(ve) {
              b._threadCount = ve;
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
            set: function(ve) {
              Z || (_e("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ve), Z = !0);
            }
          }
        }), b.Consumer = Re;
      }
      return b._currentRenderer = null, b._currentRenderer2 = null, b;
    }
    var Na = -1, ia = 0, qn = 1, Pa = 2;
    function pi(d) {
      if (d._status === Na) {
        var b = d._result, M = b();
        if (M.then(function(Re) {
          if (d._status === ia || d._status === Na) {
            var ve = d;
            ve._status = qn, ve._result = Re;
          }
        }, function(Re) {
          if (d._status === ia || d._status === Na) {
            var ve = d;
            ve._status = Pa, ve._result = Re;
          }
        }), d._status === Na) {
          var z = d;
          z._status = ia, z._result = M;
        }
      }
      if (d._status === qn) {
        var Z = d._result;
        return Z === void 0 && ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Z), "default" in Z || ye(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Z), Z.default;
      } else
        throw d._result;
    }
    function N(d) {
      var b = {
        // We use these fields to store the result.
        _status: Na,
        _result: d
      }, M = {
        $$typeof: Y,
        _payload: b,
        _init: pi
      };
      {
        var z, Z;
        Object.defineProperties(M, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return z;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), z = Re, Object.defineProperty(M, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return Z;
            },
            set: function(Re) {
              ye("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Z = Re, Object.defineProperty(M, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return M;
    }
    function Q(d) {
      d != null && d.$$typeof === U ? ye("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof d != "function" ? ye("forwardRef requires a render function but was given %s.", d === null ? "null" : typeof d) : d.length !== 0 && d.length !== 2 && ye("forwardRef render functions accept exactly two parameters: props and ref. %s", d.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), d != null && (d.defaultProps != null || d.propTypes != null) && ye("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var b = {
        $$typeof: O,
        render: d
      };
      {
        var M;
        Object.defineProperty(b, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return M;
          },
          set: function(z) {
            M = z, !d.name && !d.displayName && (d.displayName = z);
          }
        });
      }
      return b;
    }
    var ie;
    ie = Symbol.for("react.module.reference");
    function Ne(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === E || d === A || Le || d === f || d === D || d === V || fe || d === oe || ne || k || he || typeof d == "object" && d !== null && (d.$$typeof === Y || d.$$typeof === U || d.$$typeof === C || d.$$typeof === T || d.$$typeof === O || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === ie || d.getModuleId !== void 0));
    }
    function Be(d, b) {
      Ne(d) || ye("memo: The first argument must be a component. Instead received: %s", d === null ? "null" : typeof d);
      var M = {
        $$typeof: U,
        type: d,
        compare: b === void 0 ? null : b
      };
      {
        var z;
        Object.defineProperty(M, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return z;
          },
          set: function(Z) {
            z = Z, !d.name && !d.displayName && (d.displayName = Z);
          }
        });
      }
      return M;
    }
    function Te() {
      var d = q.current;
      return d === null && ye(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), d;
    }
    function Ve(d) {
      var b = Te();
      if (d._context !== void 0) {
        var M = d._context;
        M.Consumer === d ? ye("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : M.Provider === d && ye("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return b.useContext(d);
    }
    function Se(d) {
      var b = Te();
      return b.useState(d);
    }
    function At(d, b, M) {
      var z = Te();
      return z.useReducer(d, b, M);
    }
    function ft(d) {
      var b = Te();
      return b.useRef(d);
    }
    function dt(d, b) {
      var M = Te();
      return M.useEffect(d, b);
    }
    function hn(d, b) {
      var M = Te();
      return M.useInsertionEffect(d, b);
    }
    function Ba(d, b) {
      var M = Te();
      return M.useLayoutEffect(d, b);
    }
    function Ea(d, b) {
      var M = Te();
      return M.useCallback(d, b);
    }
    function Mt(d, b) {
      var M = Te();
      return M.useMemo(d, b);
    }
    function mi(d, b, M) {
      var z = Te();
      return z.useImperativeHandle(d, b, M);
    }
    function Sa(d, b) {
      {
        var M = Te();
        return M.useDebugValue(d, b);
      }
    }
    function ze() {
      var d = Te();
      return d.useTransition();
    }
    function vi(d) {
      var b = Te();
      return b.useDeferredValue(d);
    }
    function iu() {
      var d = Te();
      return d.useId();
    }
    function lu(d, b, M) {
      var z = Te();
      return z.useSyncExternalStore(d, b, M);
    }
    var Lr = 0, lo, oo, so, uo, co, ou, su;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function fo() {
      {
        if (Lr === 0) {
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
        Lr++;
      }
    }
    function $a() {
      {
        if (Lr--, Lr === 0) {
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
        Lr < 0 && ye("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var hi = Ue.ReactCurrentDispatcher, Vr;
    function tl(d, b, M) {
      {
        if (Vr === void 0)
          try {
            throw Error();
          } catch (Z) {
            var z = Z.stack.trim().match(/\n( *(at )?)/);
            Vr = z && z[1] || "";
          }
        return `
` + Vr + d;
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
        var M = nl.get(d);
        if (M !== void 0)
          return M;
      }
      var z;
      gi = !0;
      var Z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Re;
      Re = hi.current, hi.current = null, fo();
      try {
        if (b) {
          var ve = function() {
            throw Error();
          };
          if (Object.defineProperty(ve.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ve, []);
            } catch (Tt) {
              z = Tt;
            }
            Reflect.construct(d, [], ve);
          } else {
            try {
              ve.call();
            } catch (Tt) {
              z = Tt;
            }
            d.call(ve.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Tt) {
            z = Tt;
          }
          d();
        }
      } catch (Tt) {
        if (Tt && z && typeof Tt.stack == "string") {
          for (var Oe = Tt.stack.split(`
`), $e = z.stack.split(`
`), tt = Oe.length - 1, ot = $e.length - 1; tt >= 1 && ot >= 0 && Oe[tt] !== $e[ot]; )
            ot--;
          for (; tt >= 1 && ot >= 0; tt--, ot--)
            if (Oe[tt] !== $e[ot]) {
              if (tt !== 1 || ot !== 1)
                do
                  if (tt--, ot--, ot < 0 || Oe[tt] !== $e[ot]) {
                    var st = `
` + Oe[tt].replace(" at new ", " at ");
                    return d.displayName && st.includes("<anonymous>") && (st = st.replace("<anonymous>", d.displayName)), typeof d == "function" && nl.set(d, st), st;
                  }
                while (tt >= 1 && ot >= 0);
              break;
            }
        }
      } finally {
        gi = !1, hi.current = Re, $a(), Error.prepareStackTrace = Z;
      }
      var He = d ? d.displayName || d.name : "", vt = He ? tl(He) : "";
      return typeof d == "function" && nl.set(d, vt), vt;
    }
    function mo(d, b, M) {
      return uu(d, !1);
    }
    function Rf(d) {
      var b = d.prototype;
      return !!(b && b.isReactComponent);
    }
    function yi(d, b, M) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return uu(d, Rf(d));
      if (typeof d == "string")
        return tl(d);
      switch (d) {
        case D:
          return tl("Suspense");
        case V:
          return tl("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case O:
            return mo(d.render);
          case U:
            return yi(d.type, b, M);
          case Y: {
            var z = d, Z = z._payload, Re = z._init;
            try {
              return yi(Re(Z), b, M);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, vo = Ue.ReactDebugCurrentFrame;
    function Ke(d) {
      if (d) {
        var b = d._owner, M = yi(d.type, d._source, b ? b.type : null);
        vo.setExtraStackFrame(M);
      } else
        vo.setExtraStackFrame(null);
    }
    function Cf(d, b, M, z, Z) {
      {
        var Re = Function.call.bind(mn);
        for (var ve in d)
          if (Re(d, ve)) {
            var Oe = void 0;
            try {
              if (typeof d[ve] != "function") {
                var $e = Error((z || "React class") + ": " + M + " type `" + ve + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[ve] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $e.name = "Invariant Violation", $e;
              }
              Oe = d[ve](b, ve, z, M, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (tt) {
              Oe = tt;
            }
            Oe && !(Oe instanceof Error) && (Ke(Z), ye("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", M, ve, typeof Oe), Ke(null)), Oe instanceof Error && !(Oe.message in cu) && (cu[Oe.message] = !0, Ke(Z), ye("Failed %s type: %s", M, Oe.message), Ke(null));
          }
      }
    }
    function or(d) {
      if (d) {
        var b = d._owner, M = yi(d.type, d._source, b ? b.type : null);
        J(M);
      } else
        J(null);
    }
    var Me;
    Me = !1;
    function ho() {
      if (I.current) {
        var d = Un(I.current.type);
        if (d)
          return `

Check the render method of \`` + d + "`.";
      }
      return "";
    }
    function Tn(d) {
      if (d !== void 0) {
        var b = d.fileName.replace(/^.*[\\\/]/, ""), M = d.lineNumber;
        return `

Check your code at ` + b + ":" + M + ".";
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
        var M = typeof d == "string" ? d : d.displayName || d.name;
        M && (b = `

Check the top-level render call using <` + M + ">.");
      }
      return b;
    }
    function It(d, b) {
      if (!(!d._store || d._store.validated || d.key != null)) {
        d._store.validated = !0;
        var M = Df(b);
        if (!kr[M]) {
          kr[M] = !0;
          var z = "";
          d && d._owner && d._owner !== I.current && (z = " It was passed a child from " + Un(d._owner.type) + "."), or(d), ye('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', M, z), or(null);
        }
      }
    }
    function mt(d, b) {
      if (typeof d == "object") {
        if (Bt(d))
          for (var M = 0; M < d.length; M++) {
            var z = d[M];
            gt(z) && It(z, b);
          }
        else if (gt(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var Z = K(d);
          if (typeof Z == "function" && Z !== d.entries)
            for (var Re = Z.call(d), ve; !(ve = Re.next()).done; )
              gt(ve.value) && It(ve.value, b);
        }
      }
    }
    function fu(d) {
      {
        var b = d.type;
        if (b == null || typeof b == "string")
          return;
        var M;
        if (typeof b == "function")
          M = b.propTypes;
        else if (typeof b == "object" && (b.$$typeof === O || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        b.$$typeof === U))
          M = b.propTypes;
        else
          return;
        if (M) {
          var z = Un(b);
          Cf(M, d.props, "prop", z, d);
        } else if (b.PropTypes !== void 0 && !Me) {
          Me = !0;
          var Z = Un(b);
          ye("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Z || "Unknown");
        }
        typeof b.getDefaultProps == "function" && !b.getDefaultProps.isReactClassApproved && ye("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function la(d) {
      {
        for (var b = Object.keys(d.props), M = 0; M < b.length; M++) {
          var z = b[M];
          if (z !== "children" && z !== "key") {
            or(d), ye("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), or(null);
            break;
          }
        }
        d.ref !== null && (or(d), ye("Invalid attribute `ref` supplied to `React.Fragment`."), or(null));
      }
    }
    function jn(d, b, M) {
      var z = Ne(d);
      if (!z) {
        var Z = "";
        (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (Z += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Re = bi(b);
        Re ? Z += Re : Z += ho();
        var ve;
        d === null ? ve = "null" : Bt(d) ? ve = "array" : d !== void 0 && d.$$typeof === g ? (ve = "<" + (Un(d.type) || "Unknown") + " />", Z = " Did you accidentally export a JSX literal instead of a component?") : ve = typeof d, ye("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ve, Z);
      }
      var Oe = Fe.apply(this, arguments);
      if (Oe == null)
        return Oe;
      if (z)
        for (var $e = 2; $e < arguments.length; $e++)
          mt(arguments[$e], d);
      return d === E ? la(Oe) : fu(Oe), Oe;
    }
    var xa = !1;
    function Tf(d) {
      var b = jn.bind(null, d);
      return b.type = d, xa || (xa = !0, _e("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(b, "type", {
        enumerable: !1,
        get: function() {
          return _e("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: d
          }), d;
        }
      }), b;
    }
    function go(d, b, M) {
      for (var z = ct.apply(this, arguments), Z = 2; Z < arguments.length; Z++)
        mt(arguments[Z], z.type);
      return fu(z), z;
    }
    function du(d, b) {
      var M = G.transition;
      G.transition = {};
      var z = G.transition;
      G.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        d();
      } finally {
        if (G.transition = M, M === null && z._updatedFibers) {
          var Z = z._updatedFibers.size;
          Z > 10 && _e("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), z._updatedFibers.clear();
        }
      }
    }
    var yo = !1, al = null;
    function jf(d) {
      if (al === null)
        try {
          var b = ("require" + Math.random()).slice(0, 7), M = o && o[b];
          al = M.call(o, "timers").setImmediate;
        } catch {
          al = function(Z) {
            yo === !1 && (yo = !0, typeof MessageChannel > "u" && ye("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Re = new MessageChannel();
            Re.port1.onmessage = Z, Re.port2.postMessage(void 0);
          };
        }
      return al(d);
    }
    var Ur = 0, Ni = !1;
    function bo(d) {
      {
        var b = Ur;
        Ur++, F.current === null && (F.current = []);
        var M = F.isBatchingLegacy, z;
        try {
          if (F.isBatchingLegacy = !0, z = d(), !M && F.didScheduleLegacyUpdate) {
            var Z = F.current;
            Z !== null && (F.didScheduleLegacyUpdate = !1, ll(Z));
          }
        } catch (He) {
          throw sr(b), He;
        } finally {
          F.isBatchingLegacy = M;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var Re = z, ve = !1, Oe = {
            then: function(He, vt) {
              ve = !0, Re.then(function(Tt) {
                sr(b), Ur === 0 ? rl(Tt, He, vt) : He(Tt);
              }, function(Tt) {
                sr(b), vt(Tt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ve || (Ni = !0, ye("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Oe;
        } else {
          var $e = z;
          if (sr(b), Ur === 0) {
            var tt = F.current;
            tt !== null && (ll(tt), F.current = null);
            var ot = {
              then: function(He, vt) {
                F.current === null ? (F.current = [], rl($e, He, vt)) : He($e);
              }
            };
            return ot;
          } else {
            var st = {
              then: function(He, vt) {
                He($e);
              }
            };
            return st;
          }
        }
      }
    }
    function sr(d) {
      d !== Ur - 1 && ye("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = d;
    }
    function rl(d, b, M) {
      {
        var z = F.current;
        if (z !== null)
          try {
            ll(z), jf(function() {
              z.length === 0 ? (F.current = null, b(d)) : rl(d, b, M);
            });
          } catch (Z) {
            M(Z);
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
            var M = d[b];
            do
              M = M(!0);
            while (M !== null);
          }
          d.length = 0;
        } catch (z) {
          throw d = d.slice(b + 1), z;
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
    p.Children = vu, p.Component = Xt, p.Fragment = E, p.Profiler = A, p.PureComponent = Zt, p.StrictMode = f, p.Suspense = D, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ue, p.act = bo, p.cloneElement = mu, p.createContext = di, p.createElement = pu, p.createFactory = No, p.createRef = tn, p.forwardRef = Q, p.isValidElement = gt, p.lazy = N, p.memo = Be, p.startTransition = du, p.unstable_act = bo, p.useCallback = Ea, p.useContext = Ve, p.useDebugValue = Sa, p.useDeferredValue = vi, p.useEffect = dt, p.useId = iu, p.useImperativeHandle = mi, p.useInsertionEffect = hn, p.useLayoutEffect = Ba, p.useMemo = Mt, p.useReducer = At, p.useRef = ft, p.useState = Se, p.useSyncExternalStore = lu, p.useTransition = ze, p.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bf, bf.exports);
var iw = bf.exports;
yE.exports = iw;
var R = yE.exports;
const lw = /* @__PURE__ */ rw(R), ow = /* @__PURE__ */ aw({
  __proto__: null,
  default: lw
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
  var o = R, p = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), A = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), U = Symbol.for("react.offscreen"), Y = Symbol.iterator, oe = "@@iterator";
  function ee(N) {
    if (N === null || typeof N != "object")
      return null;
    var Q = Y && N[Y] || N[oe];
    return typeof Q == "function" ? Q : null;
  }
  var pe = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function K(N) {
    {
      for (var Q = arguments.length, ie = new Array(Q > 1 ? Q - 1 : 0), Ne = 1; Ne < Q; Ne++)
        ie[Ne - 1] = arguments[Ne];
      q("error", N, ie);
    }
  }
  function q(N, Q, ie) {
    {
      var Ne = pe.ReactDebugCurrentFrame, Be = Ne.getStackAddendum();
      Be !== "" && (Q += "%s", ie = ie.concat([Be]));
      var Te = ie.map(function(Ve) {
        return String(Ve);
      });
      Te.unshift("Warning: " + Q), Function.prototype.apply.call(console[N], console, Te);
    }
  }
  var G = !1, F = !1, I = !1, B = !1, te = !1, J;
  J = Symbol.for("react.module.reference");
  function ne(N) {
    return !!(typeof N == "string" || typeof N == "function" || N === g || N === E || te || N === y || N === T || N === O || B || N === U || G || F || I || typeof N == "object" && N !== null && (N.$$typeof === V || N.$$typeof === D || N.$$typeof === f || N.$$typeof === A || N.$$typeof === C || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    N.$$typeof === J || N.getModuleId !== void 0));
  }
  function k(N, Q, ie) {
    var Ne = N.displayName;
    if (Ne)
      return Ne;
    var Be = Q.displayName || Q.name || "";
    return Be !== "" ? ie + "(" + Be + ")" : ie;
  }
  function he(N) {
    return N.displayName || "Context";
  }
  function fe(N) {
    if (N == null)
      return null;
    if (typeof N.tag == "number" && K("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
      return N.displayName || N.name || null;
    if (typeof N == "string")
      return N;
    switch (N) {
      case g:
        return "Fragment";
      case m:
        return "Portal";
      case E:
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
        case A:
          var Q = N;
          return he(Q) + ".Consumer";
        case f:
          var ie = N;
          return he(ie._context) + ".Provider";
        case C:
          return k(N, N.render, "ForwardRef");
        case D:
          var Ne = N.displayName || null;
          return Ne !== null ? Ne : fe(N.type) || "Memo";
        case V: {
          var Be = N, Te = Be._payload, Ve = Be._init;
          try {
            return fe(Ve(Te));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Le = Object.assign, Ue = 0, _e, ye, Je, pn, Qt, xn, Ct;
  function In() {
  }
  In.__reactDisabledLog = !0;
  function Xt() {
    {
      if (Ue === 0) {
        _e = console.log, ye = console.info, Je = console.warn, pn = console.error, Qt = console.group, xn = console.groupCollapsed, Ct = console.groupEnd;
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
      Ue++;
    }
  }
  function ha() {
    {
      if (Ue--, Ue === 0) {
        var N = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Le({}, N, {
            value: _e
          }),
          info: Le({}, N, {
            value: ye
          }),
          warn: Le({}, N, {
            value: Je
          }),
          error: Le({}, N, {
            value: pn
          }),
          group: Le({}, N, {
            value: Qt
          }),
          groupCollapsed: Le({}, N, {
            value: xn
          }),
          groupEnd: Le({}, N, {
            value: Ct
          })
        });
      }
      Ue < 0 && K("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var na = pe.ReactCurrentDispatcher, Dt;
  function Jt(N, Q, ie) {
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
  function kn(N, Q) {
    if (!N || Zt)
      return "";
    {
      var ie = en.get(N);
      if (ie !== void 0)
        return ie;
    }
    var Ne;
    Zt = !0;
    var Be = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Te;
    Te = na.current, na.current = null, Xt();
    try {
      if (Q) {
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
          } catch (Mt) {
            Ne = Mt;
          }
          Reflect.construct(N, [], Ve);
        } else {
          try {
            Ve.call();
          } catch (Mt) {
            Ne = Mt;
          }
          N.call(Ve.prototype);
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
`), At = Ne.stack.split(`
`), ft = Se.length - 1, dt = At.length - 1; ft >= 1 && dt >= 0 && Se[ft] !== At[dt]; )
          dt--;
        for (; ft >= 1 && dt >= 0; ft--, dt--)
          if (Se[ft] !== At[dt]) {
            if (ft !== 1 || dt !== 1)
              do
                if (ft--, dt--, dt < 0 || Se[ft] !== At[dt]) {
                  var hn = `
` + Se[ft].replace(" at new ", " at ");
                  return N.displayName && hn.includes("<anonymous>") && (hn = hn.replace("<anonymous>", N.displayName)), typeof N == "function" && en.set(N, hn), hn;
                }
              while (ft >= 1 && dt >= 0);
            break;
          }
      }
    } finally {
      Zt = !1, na.current = Te, ha(), Error.prepareStackTrace = Be;
    }
    var Ba = N ? N.displayName || N.name : "", Ea = Ba ? Jt(Ba) : "";
    return typeof N == "function" && en.set(N, Ea), Ea;
  }
  function Bt(N, Q, ie) {
    return kn(N, !1);
  }
  function Rn(N) {
    var Q = N.prototype;
    return !!(Q && Q.isReactComponent);
  }
  function $t(N, Q, ie) {
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
        case C:
          return Bt(N.render);
        case D:
          return $t(N.type, Q, ie);
        case V: {
          var Ne = N, Be = Ne._payload, Te = Ne._init;
          try {
            return $t(Te(Be), Q, ie);
          } catch {
          }
        }
      }
    return "";
  }
  var Yt = Object.prototype.hasOwnProperty, aa = {}, rr = pe.ReactDebugCurrentFrame;
  function ga(N) {
    if (N) {
      var Q = N._owner, ie = $t(N.type, N._source, Q ? Q.type : null);
      rr.setExtraStackFrame(ie);
    } else
      rr.setExtraStackFrame(null);
  }
  function Un(N, Q, ie, Ne, Be) {
    {
      var Te = Function.call.bind(Yt);
      for (var Ve in N)
        if (Te(N, Ve)) {
          var Se = void 0;
          try {
            if (typeof N[Ve] != "function") {
              var At = Error((Ne || "React class") + ": " + ie + " type `" + Ve + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[Ve] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw At.name = "Invariant Violation", At;
            }
            Se = N[Ve](Q, Ve, Ne, ie, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ft) {
            Se = ft;
          }
          Se && !(Se instanceof Error) && (ga(Be), K("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ne || "React class", ie, Ve, typeof Se), ga(null)), Se instanceof Error && !(Se.message in aa) && (aa[Se.message] = !0, ga(Be), K("Failed %s type: %s", ie, Se.message), ga(null));
        }
    }
  }
  var mn = Array.isArray;
  function nn(N) {
    return mn(N);
  }
  function Cn(N) {
    {
      var Q = typeof Symbol == "function" && Symbol.toStringTag, ie = Q && N[Symbol.toStringTag] || N.constructor.name || "Object";
      return ie;
    }
  }
  function Ha(N) {
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
    if (Ha(N))
      return K("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(N)), Ot(N);
  }
  var Fn = pe.ReactCurrentOwner, Mr = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ir, re, be;
  be = {};
  function Fe(N) {
    if (Yt.call(N, "ref")) {
      var Q = Object.getOwnPropertyDescriptor(N, "ref").get;
      if (Q && Q.isReactWarning)
        return !1;
    }
    return N.ref !== void 0;
  }
  function et(N) {
    if (Yt.call(N, "key")) {
      var Q = Object.getOwnPropertyDescriptor(N, "key").get;
      if (Q && Q.isReactWarning)
        return !1;
    }
    return N.key !== void 0;
  }
  function ct(N, Q) {
    if (typeof N.ref == "string" && Fn.current && Q && Fn.current.stateNode !== Q) {
      var ie = fe(Fn.current.type);
      be[ie] || (K('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', fe(Fn.current.type), N.ref), be[ie] = !0);
    }
  }
  function gt(N, Q) {
    {
      var ie = function() {
        ir || (ir = !0, K("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Q));
      };
      ie.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: ie,
        configurable: !0
      });
    }
  }
  function yt(N, Q) {
    {
      var ie = function() {
        re || (re = !0, K("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Q));
      };
      ie.isReactWarning = !0, Object.defineProperty(N, "ref", {
        get: ie,
        configurable: !0
      });
    }
  }
  var vn = function(N, Q, ie, Ne, Be, Te, Ve) {
    var Se = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: p,
      // Built-in properties that belong on the element
      type: N,
      key: Q,
      ref: ie,
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
      value: Be
    }), Object.freeze && (Object.freeze(Se.props), Object.freeze(Se)), Se;
  };
  function Nt(N, Q, ie, Ne, Be) {
    {
      var Te, Ve = {}, Se = null, At = null;
      ie !== void 0 && (Dn(ie), Se = "" + ie), et(Q) && (Dn(Q.key), Se = "" + Q.key), Fe(Q) && (At = Q.ref, ct(Q, Be));
      for (Te in Q)
        Yt.call(Q, Te) && !Mr.hasOwnProperty(Te) && (Ve[Te] = Q[Te]);
      if (N && N.defaultProps) {
        var ft = N.defaultProps;
        for (Te in ft)
          Ve[Te] === void 0 && (Ve[Te] = ft[Te]);
      }
      if (Se || At) {
        var dt = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
        Se && gt(Ve, dt), At && yt(Ve, dt);
      }
      return vn(N, Se, At, Be, Ne, Fn.current, Ve);
    }
  }
  var it = pe.ReactCurrentOwner, Et = pe.ReactDebugCurrentFrame;
  function ya(N) {
    if (N) {
      var Q = N._owner, ie = $t(N.type, N._source, Q ? Q.type : null);
      Et.setExtraStackFrame(ie);
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
        var N = fe(it.current.type);
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
        var Q = N.fileName.replace(/^.*[\\\/]/, ""), ie = N.lineNumber;
        return `

Check your code at ` + Q + ":" + ie + ".";
      }
      return "";
    }
  }
  var fi = {};
  function Ji(N) {
    {
      var Q = lr();
      if (!Q) {
        var ie = typeof N == "string" ? N : N.displayName || N.name;
        ie && (Q = `

Check the top-level render call using <` + ie + ">.");
      }
      return Q;
    }
  }
  function Zi(N, Q) {
    {
      if (!N._store || N._store.validated || N.key != null)
        return;
      N._store.validated = !0;
      var ie = Ji(Q);
      if (fi[ie])
        return;
      fi[ie] = !0;
      var Ne = "";
      N && N._owner && N._owner !== it.current && (Ne = " It was passed a child from " + fe(N._owner.type) + "."), ya(N), K('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ie, Ne), ya(null);
    }
  }
  function di(N, Q) {
    {
      if (typeof N != "object")
        return;
      if (nn(N))
        for (var ie = 0; ie < N.length; ie++) {
          var Ne = N[ie];
          ra(Ne) && Zi(Ne, Q);
        }
      else if (ra(N))
        N._store && (N._store.validated = !0);
      else if (N) {
        var Be = ee(N);
        if (typeof Be == "function" && Be !== N.entries)
          for (var Te = Be.call(N), Ve; !(Ve = Te.next()).done; )
            ra(Ve.value) && Zi(Ve.value, Q);
      }
    }
  }
  function Na(N) {
    {
      var Q = N.type;
      if (Q == null || typeof Q == "string")
        return;
      var ie;
      if (typeof Q == "function")
        ie = Q.propTypes;
      else if (typeof Q == "object" && (Q.$$typeof === C || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      Q.$$typeof === D))
        ie = Q.propTypes;
      else
        return;
      if (ie) {
        var Ne = fe(Q);
        Un(ie, N.props, "prop", Ne, N);
      } else if (Q.PropTypes !== void 0 && !ba) {
        ba = !0;
        var Be = fe(Q);
        K("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Be || "Unknown");
      }
      typeof Q.getDefaultProps == "function" && !Q.getDefaultProps.isReactClassApproved && K("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ia(N) {
    {
      for (var Q = Object.keys(N.props), ie = 0; ie < Q.length; ie++) {
        var Ne = Q[ie];
        if (Ne !== "children" && Ne !== "key") {
          ya(N), K("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ne), ya(null);
          break;
        }
      }
      N.ref !== null && (ya(N), K("Invalid attribute `ref` supplied to `React.Fragment`."), ya(null));
    }
  }
  var qn = {};
  function Pa(N, Q, ie, Ne, Be, Te) {
    {
      var Ve = ne(N);
      if (!Ve) {
        var Se = "";
        (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var At = io(Be);
        At ? Se += At : Se += lr();
        var ft;
        N === null ? ft = "null" : nn(N) ? ft = "array" : N !== void 0 && N.$$typeof === p ? (ft = "<" + (fe(N.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : ft = typeof N, K("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ft, Se);
      }
      var dt = Nt(N, Q, ie, Be, Te);
      if (dt == null)
        return dt;
      if (Ve) {
        var hn = Q.children;
        if (hn !== void 0)
          if (Ne)
            if (nn(hn)) {
              for (var Ba = 0; Ba < hn.length; Ba++)
                di(hn[Ba], N);
              Object.freeze && Object.freeze(hn);
            } else
              K("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            di(hn, N);
      }
      if (Yt.call(Q, "key")) {
        var Ea = fe(N), Mt = Object.keys(Q).filter(function(ze) {
          return ze !== "key";
        }), mi = Mt.length > 0 ? "{key: someKey, " + Mt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!qn[Ea + mi]) {
          var Sa = Mt.length > 0 ? "{" + Mt.join(": ..., ") + ": ...}" : "{}";
          K(`A props object containing a "key" prop is being spread into JSX:
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
  var pi = Pa;
  Lv.Fragment = g, Lv.jsxDEV = pi;
})();
gE.exports = Lv;
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
    function g(re, be) {
      var Fe = re.length;
      re.push(be), f(re, be, Fe);
    }
    function y(re) {
      return re.length === 0 ? null : re[0];
    }
    function E(re) {
      if (re.length === 0)
        return null;
      var be = re[0], Fe = re.pop();
      return Fe !== be && (re[0] = Fe, A(re, Fe, 0)), be;
    }
    function f(re, be, Fe) {
      for (var et = Fe; et > 0; ) {
        var ct = et - 1 >>> 1, gt = re[ct];
        if (C(gt, be) > 0)
          re[ct] = be, re[et] = gt, et = ct;
        else
          return;
      }
    }
    function A(re, be, Fe) {
      for (var et = Fe, ct = re.length, gt = ct >>> 1; et < gt; ) {
        var yt = (et + 1) * 2 - 1, vn = re[yt], Nt = yt + 1, it = re[Nt];
        if (C(vn, be) < 0)
          Nt < ct && C(it, vn) < 0 ? (re[et] = it, re[Nt] = be, et = Nt) : (re[et] = vn, re[yt] = be, et = yt);
        else if (Nt < ct && C(it, be) < 0)
          re[et] = it, re[Nt] = be, et = Nt;
        else
          return;
      }
    }
    function C(re, be) {
      var Fe = re.sortIndex - be.sortIndex;
      return Fe !== 0 ? Fe : re.id - be.id;
    }
    var T = 1, O = 2, D = 3, V = 4, U = 5;
    function Y(re, be) {
    }
    var oe = typeof performance == "object" && typeof performance.now == "function";
    if (oe) {
      var ee = performance;
      o.unstable_now = function() {
        return ee.now();
      };
    } else {
      var pe = Date, K = pe.now();
      o.unstable_now = function() {
        return pe.now() - K;
      };
    }
    var q = 1073741823, G = -1, F = 250, I = 5e3, B = 1e4, te = q, J = [], ne = [], k = 1, he = null, fe = D, Le = !1, Ue = !1, _e = !1, ye = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, pn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Qt(re) {
      for (var be = y(ne); be !== null; ) {
        if (be.callback === null)
          E(ne);
        else if (be.startTime <= re)
          E(ne), be.sortIndex = be.expirationTime, g(J, be);
        else
          return;
        be = y(ne);
      }
    }
    function xn(re) {
      if (_e = !1, Qt(re), !Ue)
        if (y(J) !== null)
          Ue = !0, Ot(Ct);
        else {
          var be = y(ne);
          be !== null && Dn(xn, be.startTime - re);
        }
    }
    function Ct(re, be) {
      Ue = !1, _e && (_e = !1, Fn()), Le = !0;
      var Fe = fe;
      try {
        var et;
        if (!p) return In(re, be);
      } finally {
        he = null, fe = Fe, Le = !1;
      }
    }
    function In(re, be) {
      var Fe = be;
      for (Qt(Fe), he = y(J); he !== null && !(he.expirationTime > Fe && (!re || rr())); ) {
        var et = he.callback;
        if (typeof et == "function") {
          he.callback = null, fe = he.priorityLevel;
          var ct = he.expirationTime <= Fe, gt = et(ct);
          Fe = o.unstable_now(), typeof gt == "function" ? he.callback = gt : he === y(J) && E(J), Qt(Fe);
        } else
          E(J);
        he = y(J);
      }
      if (he !== null)
        return !0;
      var yt = y(ne);
      return yt !== null && Dn(xn, yt.startTime - Fe), !1;
    }
    function Xt(re, be) {
      switch (re) {
        case T:
        case O:
        case D:
        case V:
        case U:
          break;
        default:
          re = D;
      }
      var Fe = fe;
      fe = re;
      try {
        return be();
      } finally {
        fe = Fe;
      }
    }
    function ha(re) {
      var be;
      switch (fe) {
        case T:
        case O:
        case D:
          be = D;
          break;
        default:
          be = fe;
          break;
      }
      var Fe = fe;
      fe = be;
      try {
        return re();
      } finally {
        fe = Fe;
      }
    }
    function na(re) {
      var be = fe;
      return function() {
        var Fe = fe;
        fe = be;
        try {
          return re.apply(this, arguments);
        } finally {
          fe = Fe;
        }
      };
    }
    function Dt(re, be, Fe) {
      var et = o.unstable_now(), ct;
      if (typeof Fe == "object" && Fe !== null) {
        var gt = Fe.delay;
        typeof gt == "number" && gt > 0 ? ct = et + gt : ct = et;
      } else
        ct = et;
      var yt;
      switch (re) {
        case T:
          yt = G;
          break;
        case O:
          yt = F;
          break;
        case U:
          yt = te;
          break;
        case V:
          yt = B;
          break;
        case D:
        default:
          yt = I;
          break;
      }
      var vn = ct + yt, Nt = {
        id: k++,
        callback: be,
        priorityLevel: re,
        startTime: ct,
        expirationTime: vn,
        sortIndex: -1
      };
      return ct > et ? (Nt.sortIndex = ct, g(ne, Nt), y(J) === null && Nt === y(ne) && (_e ? Fn() : _e = !0, Dn(xn, ct - et))) : (Nt.sortIndex = vn, g(J, Nt), !Ue && !Le && (Ue = !0, Ot(Ct))), Nt;
    }
    function Jt() {
    }
    function Zt() {
      !Ue && !Le && (Ue = !0, Ot(Ct));
    }
    function en() {
      return y(J);
    }
    function tn(re) {
      re.callback = null;
    }
    function kn() {
      return fe;
    }
    var Bt = !1, Rn = null, $t = -1, Yt = m, aa = -1;
    function rr() {
      var re = o.unstable_now() - aa;
      return !(re < Yt);
    }
    function ga() {
    }
    function Un(re) {
      if (re < 0 || re > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      re > 0 ? Yt = Math.floor(1e3 / re) : Yt = m;
    }
    var mn = function() {
      if (Rn !== null) {
        var re = o.unstable_now();
        aa = re;
        var be = !0, Fe = !0;
        try {
          Fe = Rn(be, re);
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
      var Cn = new MessageChannel(), Ha = Cn.port2;
      Cn.port1.onmessage = mn, nn = function() {
        Ha.postMessage(null);
      };
    } else
      nn = function() {
        ye(mn, 0);
      };
    function Ot(re) {
      Rn = re, Bt || (Bt = !0, nn());
    }
    function Dn(re, be) {
      $t = ye(function() {
        re(o.unstable_now());
      }, be);
    }
    function Fn() {
      Je($t), $t = -1;
    }
    var Mr = ga, ir = null;
    o.unstable_IdlePriority = U, o.unstable_ImmediatePriority = T, o.unstable_LowPriority = V, o.unstable_NormalPriority = D, o.unstable_Profiling = ir, o.unstable_UserBlockingPriority = O, o.unstable_cancelCallback = tn, o.unstable_continueExecution = Zt, o.unstable_forceFrameRate = Un, o.unstable_getCurrentPriorityLevel = kn, o.unstable_getFirstCallbackNode = en, o.unstable_next = ha, o.unstable_pauseExecution = Jt, o.unstable_requestPaint = Mr, o.unstable_runWithPriority = Xt, o.unstable_scheduleCallback = Dt, o.unstable_shouldYield = rr, o.unstable_wrapCallback = na, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var o = R, p = sw, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function y(e) {
    g = e;
  }
  function E(e) {
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
      var a = m.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var C = 0, T = 1, O = 2, D = 3, V = 4, U = 5, Y = 6, oe = 7, ee = 8, pe = 9, K = 10, q = 11, G = 12, F = 13, I = 14, B = 15, te = 16, J = 17, ne = 18, k = 19, he = 21, fe = 22, Le = 23, Ue = 24, _e = 25, ye = !0, Je = !1, pn = !1, Qt = !1, xn = !1, Ct = !0, In = !0, Xt = !0, ha = !0, na = /* @__PURE__ */ new Set(), Dt = {}, Jt = {};
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
  var nn = 0, Cn = 1, Ha = 2, Ot = 3, Dn = 4, Fn = 5, Mr = 6, ir = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", re = ir + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", be = new RegExp("^[" + ir + "][" + re + "]*$"), Fe = {}, et = {};
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
        case Mr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Nt(e) {
    return Et.hasOwnProperty(e) ? Et[e] : null;
  }
  function it(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Ha || t === Ot || t === Dn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
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
      Ha,
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
      Ha,
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
      Yt(n, t), a.sanitizeURL && Ji("" + n);
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
      return Yt(n, t), r === "" + n ? n : r;
    }
  }
  function Na(e, t, n, a) {
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
        var x = r.type, S;
        x === Ot || x === Dn && n === !0 ? S = "" : (Yt(n, v), S = "" + n, r.sanitizeURL && Ji(S.toString())), h ? e.setAttributeNS(h, v, S) : e.setAttribute(v, S);
      }
    }
  }
  var ia = Symbol.for("react.element"), qn = Symbol.for("react.portal"), Pa = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), Q = Symbol.for("react.provider"), ie = Symbol.for("react.context"), Ne = Symbol.for("react.forward_ref"), Be = Symbol.for("react.suspense"), Te = Symbol.for("react.suspense_list"), Ve = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), At = Symbol.for("react.scope"), ft = Symbol.for("react.debug_trace_mode"), dt = Symbol.for("react.offscreen"), hn = Symbol.for("react.legacy_hidden"), Ba = Symbol.for("react.cache"), Ea = Symbol.for("react.tracing_marker"), Mt = Symbol.iterator, mi = "@@iterator";
  function Sa(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Mt && e[Mt] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var ze = Object.assign, vi = 0, iu, lu, Lr, lo, oo, so, uo;
  function co() {
  }
  co.__reactDisabledLog = !0;
  function ou() {
    {
      if (vi === 0) {
        iu = console.log, lu = console.info, Lr = console.warn, lo = console.error, oo = console.group, so = console.groupCollapsed, uo = console.groupEnd;
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
            value: Lr
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
  var hi = !1, Vr;
  {
    var tl = typeof WeakMap == "function" ? WeakMap : Map;
    Vr = new tl();
  }
  function gi(e, t) {
    if (!e || hi)
      return "";
    {
      var n = Vr.get(e);
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
          } catch (L) {
            a = L;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (L) {
            a = L;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (L) {
          a = L;
        }
        e();
      }
    } catch (L) {
      if (L && a && typeof L.stack == "string") {
        for (var s = L.stack.split(`
`), u = a.stack.split(`
`), v = s.length - 1, h = u.length - 1; v >= 1 && h >= 0 && s[v] !== u[h]; )
          h--;
        for (; v >= 1 && h >= 0; v--, h--)
          if (s[v] !== u[h]) {
            if (v !== 1 || h !== 1)
              do
                if (v--, h--, h < 0 || s[v] !== u[h]) {
                  var x = `
` + s[v].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Vr.set(e, x), x;
                }
              while (v >= 1 && h >= 0);
            break;
          }
      }
    } finally {
      hi = !1, el.current = i, su(), Error.prepareStackTrace = r;
    }
    var S = e ? e.displayName || e.name : "", _ = S ? $a(S) : "";
    return typeof e == "function" && Vr.set(e, _), _;
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
      case Te:
        return $a("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ne:
          return po(e.render);
        case Ve:
          return mo(e.type, t, n);
        case Se: {
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
      case U:
        return $a(e.type);
      case te:
        return $a("Lazy");
      case F:
        return $a("Suspense");
      case k:
        return $a("SuspenseList");
      case C:
      case O:
      case B:
        return po(e.type);
      case q:
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
  function Ke(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Pa:
        return "Fragment";
      case qn:
        return "Portal";
      case N:
        return "Profiler";
      case pi:
        return "StrictMode";
      case Be:
        return "Suspense";
      case Te:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ie:
          var t = e;
          return vo(t) + ".Consumer";
        case Q:
          var n = e;
          return vo(n._context) + ".Provider";
        case Ne:
          return cu(e, e.render, "ForwardRef");
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
  function Cf(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function or(e) {
    return e.displayName || "Context";
  }
  function Me(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Ue:
        return "Cache";
      case pe:
        var a = n;
        return or(a) + ".Consumer";
      case K:
        var r = n;
        return or(r._context) + ".Provider";
      case ne:
        return "DehydratedFragment";
      case q:
        return Cf(n, n.render, "ForwardRef");
      case oe:
        return "Fragment";
      case U:
        return n;
      case V:
        return "Portal";
      case D:
        return "Root";
      case Y:
        return "Text";
      case te:
        return Ke(n);
      case ee:
        return n === pi ? "StrictMode" : "Mode";
      case fe:
        return "Offscreen";
      case G:
        return "Profiler";
      case he:
        return "Scope";
      case F:
        return "Suspense";
      case k:
        return "SuspenseList";
      case _e:
        return "TracingMarker";
      case T:
      case C:
      case J:
      case O:
      case I:
      case B:
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
        return Me(e);
    }
    return null;
  }
  function Df() {
    return Tn === null ? "" : yi(Tn);
  }
  function It() {
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
    t.hasOwnProperty("value") ? Re(n, t.type, r) : t.hasOwnProperty("defaultValue") && Re(n, t.type, xa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
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
    var s = a.name;
    s !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, s !== "" && (a.name = s);
  }
  function z(e, t) {
    var n = e;
    b(n, t), Z(n, t);
  }
  function Z(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Yt(n, "name");
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
  function Re(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || sr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = jn(e._wrapperState.initialValue) : e.defaultValue !== jn(n) && (e.defaultValue = jn(n)));
  }
  var ve = !1, Oe = !1, $e = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Oe || (Oe = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && ($e || ($e = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ve && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ve = !0);
  }
  function ot(e, t) {
    t.value != null && e.setAttribute("value", jn(xa(t.value)));
  }
  var st = Array.isArray;
  function He(e) {
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
          var a = He(e[n]);
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
      for (var h = jn(xa(n)), x = null, S = 0; S < r.length; S++) {
        if (r[S].value === h) {
          r[S].selected = !0, a && (r[S].defaultSelected = !0);
          return;
        }
        x === null && !r[S].disabled && (x = r[S]);
      }
      x !== null && (x.selected = !0);
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
  function YE(e, t) {
    Qv(e, t);
  }
  var cr = "http://www.w3.org/1999/xhtml", IE = "http://www.w3.org/1998/Math/MathML", Af = "http://www.w3.org/2000/svg";
  function Mf(e) {
    switch (e) {
      case "svg":
        return Af;
      case "math":
        return IE;
      default:
        return cr;
    }
  }
  function Lf(e, t) {
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
  }), zn = 1, fr = 3, jt = 8, dr = 9, Vf = 11, yu = function(e, t) {
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
  }, sl = {}, vS = new RegExp("^(aria)-[" + re + "]*$"), hS = new RegExp("^(aria)[A-Z][" + re + "]*$");
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
    var wn = {}, sh = /^on./, ES = /^on[^A-Z]/, SS = new RegExp("^(aria)-[" + re + "]*$"), xS = new RegExp("^(aria)[A-Z][" + re + "]*$");
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
  function Hf(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === fr ? t.parentNode : t;
  }
  var Pf = null, ul = null, cl = null;
  function ch(e) {
    var t = qr(e);
    if (t) {
      if (typeof Pf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = tc(n);
        Pf(t.stateNode, t.type, a);
      }
    }
  }
  function _S(e) {
    Pf = e;
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
  function LS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function VS(e, t, n) {
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
        return !!(n.disabled && LS(t));
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
    if (VS(t, e.type, a))
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
    var Yf = document.createElement("react");
    gh = function(t, n, a, r, i, l, s, u, v) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var h = document.createEvent("Event"), x = !1, S = !0, _ = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
      function H() {
        Yf.removeEventListener(P, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = _);
      }
      var le = Array.prototype.slice.call(arguments, 3);
      function Ee() {
        x = !0, H(), n.apply(a, le), S = !1;
      }
      var ge, qe = !1, Pe = !1;
      function j(w) {
        if (ge = w.error, qe = !0, ge === null && w.colno === 0 && w.lineno === 0 && (Pe = !0), w.defaultPrevented && ge != null && typeof ge == "object")
          try {
            ge._suppressLogging = !0;
          } catch {
          }
      }
      var P = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), Yf.addEventListener(P, Ee, !1), h.initEvent(P, !1, !1), Yf.dispatchEvent(h), L && Object.defineProperty(window, "event", L), x && S && (qe ? Pe && (ge = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : ge = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(ge)), window.removeEventListener("error", j), !x)
        return H(), hh.apply(this, arguments);
    };
  }
  var kS = gh, fl = !1, Nu = null, Eu = !1, If = null, US = {
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
      Eu || (Eu = !0, If = v);
    }
  }
  function zS() {
    if (Eu) {
      var e = If;
      throw Eu = !1, If = null, e;
    }
  }
  function HS() {
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
  function PS(e) {
    return e._reactInternals !== void 0;
  }
  function BS(e, t) {
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
  ), xi = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), yh = (
    /*                     */
    64
  ), Xe = (
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
    Qe | ml | 0
  ), ed = wt | Qe | xi | wo | Ri | mr | Ci, _o = Qe | yh | Ri | Ci, vl = Fr | xi, vr = Di | Xf | Qf, YS = m.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (wt | mr)) !== Ce && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === D ? n : null;
  }
  function Nh(e) {
    if (e.tag === F) {
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
  function IS(e) {
    return Ti(e) === e;
  }
  function qS(e) {
    {
      var t = YS.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Me(n) || "A component"), a._warnedAboutRefsInRender = !0;
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
    if (e.tag === U || e.tag === Y)
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
    if (e.tag === U || e.tag === Y)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== V) {
        var n = Dh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Th = p.unstable_scheduleCallback, WS = p.unstable_cancelCallback, KS = p.unstable_shouldYield, QS = p.unstable_requestPaint, qt = p.unstable_now, XS = p.unstable_getCurrentPriorityLevel, xu = p.unstable_ImmediatePriority, td = p.unstable_UserBlockingPriority, ji = p.unstable_NormalPriority, JS = p.unstable_LowPriority, nd = p.unstable_IdlePriority, ZS = p.unstable_yieldValue, ex = p.unstable_setDisableYieldValue, hl = null, gn = null, ue = null, Ya = !1, Ra = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      In && (e = ze({}, e, {
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
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function ax(e, t) {
    if (gn && typeof gn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Xe) === Xe;
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
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function rx(e) {
    if (gn && typeof gn.onPostCommitFiberRoot == "function")
      try {
        gn.onPostCommitFiberRoot(hl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function ix(e) {
    if (gn && typeof gn.onCommitFiberUnmount == "function")
      try {
        gn.onCommitFiberUnmount(hl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Gt(e) {
    if (typeof ZS == "function" && (ex(e), y(e)), gn && typeof gn.setStrictMode == "function")
      try {
        gn.setStrictMode(hl, e);
      } catch (t) {
        Ya || (Ya = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function lx(e) {
    ue = e;
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
    ue !== null && typeof ue.markCommitStarted == "function" && ue.markCommitStarted(e);
  }
  function jh() {
    ue !== null && typeof ue.markCommitStopped == "function" && ue.markCommitStopped();
  }
  function Oo(e) {
    ue !== null && typeof ue.markComponentRenderStarted == "function" && ue.markComponentRenderStarted(e);
  }
  function gl() {
    ue !== null && typeof ue.markComponentRenderStopped == "function" && ue.markComponentRenderStopped();
  }
  function ux(e) {
    ue !== null && typeof ue.markComponentPassiveEffectMountStarted == "function" && ue.markComponentPassiveEffectMountStarted(e);
  }
  function cx() {
    ue !== null && typeof ue.markComponentPassiveEffectMountStopped == "function" && ue.markComponentPassiveEffectMountStopped();
  }
  function fx(e) {
    ue !== null && typeof ue.markComponentPassiveEffectUnmountStarted == "function" && ue.markComponentPassiveEffectUnmountStarted(e);
  }
  function dx() {
    ue !== null && typeof ue.markComponentPassiveEffectUnmountStopped == "function" && ue.markComponentPassiveEffectUnmountStopped();
  }
  function px(e) {
    ue !== null && typeof ue.markComponentLayoutEffectMountStarted == "function" && ue.markComponentLayoutEffectMountStarted(e);
  }
  function mx() {
    ue !== null && typeof ue.markComponentLayoutEffectMountStopped == "function" && ue.markComponentLayoutEffectMountStopped();
  }
  function wh(e) {
    ue !== null && typeof ue.markComponentLayoutEffectUnmountStarted == "function" && ue.markComponentLayoutEffectUnmountStarted(e);
  }
  function _h() {
    ue !== null && typeof ue.markComponentLayoutEffectUnmountStopped == "function" && ue.markComponentLayoutEffectUnmountStopped();
  }
  function vx(e, t, n) {
    ue !== null && typeof ue.markComponentErrored == "function" && ue.markComponentErrored(e, t, n);
  }
  function hx(e, t, n) {
    ue !== null && typeof ue.markComponentSuspended == "function" && ue.markComponentSuspended(e, t, n);
  }
  function gx(e) {
    ue !== null && typeof ue.markLayoutEffectsStarted == "function" && ue.markLayoutEffectsStarted(e);
  }
  function yx() {
    ue !== null && typeof ue.markLayoutEffectsStopped == "function" && ue.markLayoutEffectsStopped();
  }
  function bx(e) {
    ue !== null && typeof ue.markPassiveEffectsStarted == "function" && ue.markPassiveEffectsStarted(e);
  }
  function Nx() {
    ue !== null && typeof ue.markPassiveEffectsStopped == "function" && ue.markPassiveEffectsStopped();
  }
  function Oh(e) {
    ue !== null && typeof ue.markRenderStarted == "function" && ue.markRenderStarted(e);
  }
  function Ex() {
    ue !== null && typeof ue.markRenderYielded == "function" && ue.markRenderYielded();
  }
  function Ah() {
    ue !== null && typeof ue.markRenderStopped == "function" && ue.markRenderStopped();
  }
  function Sx(e) {
    ue !== null && typeof ue.markRenderScheduled == "function" && ue.markRenderScheduled(e);
  }
  function xx(e, t) {
    ue !== null && typeof ue.markForceUpdateScheduled == "function" && ue.markForceUpdateScheduled(e, t);
  }
  function ad(e, t) {
    ue !== null && typeof ue.markStateUpdateScheduled == "function" && ue.markStateUpdateScheduled(e, t);
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
  ), Ia = (
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
  ), je = (
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
  ), Lh = Nl, Lo = (
    /*          */
    134217728
  ), Vh = (
    /*                          */
    268435455
  ), Vo = (
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
      if (e & je)
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
      if (e & Lo)
        return "SelectiveHydration";
      if (e & Vo)
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
      case je:
        return je;
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
      case Lo:
        return Lo;
      case Vo:
        return Vo;
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
    var a = W, r = e.suspendedLanes, i = e.pingedLanes, l = n & Vh;
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
      var h = Oi(a), x = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        h >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        h === qa && (x & bl) !== W
      )
        return t;
    }
    (a & hr) !== W && (a |= n & qa);
    var S = e.entangledLanes;
    if (S !== W)
      for (var _ = e.entanglements, L = a & S; L > 0; ) {
        var H = Ai(L), le = 1 << H;
        a |= _[H], L &= ~le;
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
      case je:
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
      case Lo:
      case Vo:
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
    return (e & je) !== W;
  }
  function Cd(e) {
    return (e & Vh) !== W;
  }
  function kh(e) {
    return (e & Ru) === e;
  }
  function Mx(e) {
    var t = je | hr | qa;
    return (e & t) === W;
  }
  function Lx(e) {
    return (e & bl) === e;
  }
  function ju(e, t) {
    var n = yl | hr | wi | qa;
    return (t & n) !== W;
  }
  function Vx(e, t) {
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
  function ke(e, t) {
    return e | t;
  }
  function wu(e, t) {
    return e & ~t;
  }
  function zh(e, t) {
    return e & t;
  }
  function J_(e) {
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
  function Hh(e, t, n) {
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
  function Hx(e, t) {
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
        a = Vo;
        break;
      default:
        a = Wt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Wt ? Wt : a;
  }
  function Ph(e, t, n) {
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
  var Kn = je, gr = hr, yr = qa, _u = _i, zo = Wt;
  function Ca() {
    return zo;
  }
  function Kt(e) {
    zo = e;
  }
  function Px(e, t) {
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
  function Yh(e) {
    var t = Oi(e);
    return wd(Kn, t) ? wd(gr, t) ? Cd(t) ? yr : _u : gr : Kn;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Ih;
  function Yx(e) {
    Ih = e;
  }
  function Ix(e) {
    Ih(e);
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
  var Od = !1, Au = [], Hr = null, Pr = null, Br = null, Ho = /* @__PURE__ */ new Map(), Po = /* @__PURE__ */ new Map(), $r = [], Qx = [
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
        Ho.delete(n);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var a = t.pointerId;
        Po.delete(a);
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
        return Hr = Bo(Hr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Pr = Bo(Pr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var s = r;
        return Br = Bo(Br, e, t, n, a, s), !0;
      }
      case "pointerover": {
        var u = r, v = u.pointerId;
        return Ho.set(v, Bo(Ho.get(v) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var h = r, x = h.pointerId;
        return Po.set(x, Bo(Po.get(x) || null, e, t, n, a, h)), !0;
      }
    }
    return !1;
  }
  function Qh(e) {
    var t = Vi(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === F) {
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
  function eR(e) {
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
      var n = t[0], a = Ld(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
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
  function tR() {
    Od = !1, Hr !== null && Mu(Hr) && (Hr = null), Pr !== null && Mu(Pr) && (Pr = null), Br !== null && Mu(Br) && (Br = null), Ho.forEach(Xh), Po.forEach(Xh);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, tR)));
  }
  function Yo(e) {
    if (Au.length > 0) {
      $o(Au[0], e);
      for (var t = 1; t < Au.length; t++) {
        var n = Au[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Hr !== null && $o(Hr, e), Pr !== null && $o(Pr, e), Br !== null && $o(Br, e);
    var a = function(s) {
      return $o(s, e);
    };
    Ho.forEach(a), Po.forEach(a);
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
  function nR() {
    return Ad;
  }
  function aR(e, t, n) {
    var a = Zh(t), r;
    switch (a) {
      case Kn:
        r = rR;
        break;
      case gr:
        r = iR;
        break;
      case yr:
      default:
        r = Md;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function rR(e, t, n, a) {
    var r = Ca(), i = Sl.transition;
    Sl.transition = null;
    try {
      Kt(Kn), Md(e, t, n, a);
    } finally {
      Kt(r), Sl.transition = i;
    }
  }
  function iR(e, t, n, a) {
    var r = Ca(), i = Sl.transition;
    Sl.transition = null;
    try {
      Kt(gr), Md(e, t, n, a);
    } finally {
      Kt(r), Sl.transition = i;
    }
  }
  function Md(e, t, n, a) {
    Ad && lR(e, t, n, a);
  }
  function lR(e, t, n, a) {
    var r = Ld(e, t, n, a);
    if (r === null) {
      Wd(e, t, a, Lu, n), Kh(e, a);
      return;
    }
    if (Zx(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Kh(e, a), t & Co && Xx(e)) {
      for (; r !== null; ) {
        var i = qr(r);
        i !== null && Ix(i);
        var l = Ld(e, t, n, a);
        if (l === null && Wd(e, t, a, Lu, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Wd(e, t, a, null, n);
  }
  var Lu = null;
  function Ld(e, t, n, a) {
    Lu = null;
    var r = Hf(a), i = Vi(r);
    if (i !== null) {
      var l = Ti(i);
      if (l === null)
        i = null;
      else {
        var s = l.tag;
        if (s === F) {
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
    return Lu = i, null;
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
  function oR(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function sR(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function uR(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function cR(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Io = null, Vd = null, qo = null;
  function fR(e) {
    return Io = e, Vd = tg(), !0;
  }
  function dR() {
    Io = null, Vd = null, qo = null;
  }
  function eg() {
    if (qo)
      return qo;
    var e, t = Vd, n = t.length, a, r = tg(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var s = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, s), qo;
  }
  function tg() {
    return "value" in Io ? Io.value : Io.textContent;
  }
  function Vu(e) {
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
  }), pR = Qn(Go), Ud, Fd, Wo;
  function mR(e) {
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
    getModifierState: Hd,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (mR(e), Ud);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Fd;
    }
  }), ag = Qn(Uu), vR = ze({}, Uu, {
    dataTransfer: 0
  }), hR = Qn(vR), gR = ze({}, Go, {
    relatedTarget: 0
  }), zd = Qn(gR), yR = ze({}, xl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bR = Qn(yR), NR = ze({}, xl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ER = Qn(NR), SR = ze({}, xl, {
    data: 0
  }), rg = Qn(SR), xR = rg, RR = {
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
  }, CR = {
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
  function DR(e) {
    if (e.key) {
      var t = RR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Vu(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? CR[e.keyCode] || "Unidentified" : "";
  }
  var TR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function jR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = TR[e];
    return a ? !!n[a] : !1;
  }
  function Hd(e) {
    return jR;
  }
  var wR = ze({}, Go, {
    key: DR,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Hd,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Vu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Vu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _R = Qn(wR), OR = ze({}, Uu, {
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
  }), ig = Qn(OR), AR = ze({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Hd
  }), MR = Qn(AR), LR = ze({}, xl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), VR = Qn(LR), kR = ze({}, Uu, {
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
  }), UR = Qn(kR), FR = [9, 13, 27, 32], lg = 229, Pd = tn && "CompositionEvent" in window, Ko = null;
  tn && "documentMode" in document && (Ko = document.documentMode);
  var zR = tn && "TextEvent" in window && !Ko, og = tn && (!Pd || Ko && Ko > 8 && Ko <= 11), sg = 32, ug = String.fromCharCode(sg);
  function HR() {
    Zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Zt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var cg = !1;
  function PR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function BR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function $R(e, t) {
    return e === "keydown" && t.keyCode === lg;
  }
  function fg(e, t) {
    switch (e) {
      case "keyup":
        return FR.indexOf(t.keyCode) !== -1;
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
  function YR(e, t, n, a, r) {
    var i, l;
    if (Pd ? i = BR(t) : Rl ? fg(t, a) && (i = "onCompositionEnd") : $R(t, a) && (i = "onCompositionStart"), !i)
      return null;
    og && !pg(a) && (!Rl && i === "onCompositionStart" ? Rl = fR(r) : i === "onCompositionEnd" && Rl && (l = eg()));
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
  function IR(e, t) {
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
  function qR(e, t) {
    if (Rl) {
      if (e === "compositionend" || !Pd && fg(e, t)) {
        var n = eg();
        return dR(), Rl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!PR(t)) {
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
  function GR(e, t, n, a, r) {
    var i;
    if (zR ? i = IR(t, a) : i = qR(t, a), !i)
      return null;
    var l = Bu(n, "onBeforeInput");
    if (l.length > 0) {
      var s = new xR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: s,
        listeners: l
      }), s.data = i;
    }
  }
  function WR(e, t, n, a, r, i, l) {
    YR(e, t, n, a, r), GR(e, t, n, a, r);
  }
  var KR = {
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
    return t === "input" ? !!KR[e.type] : t === "textarea";
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
  function QR(e) {
    if (!tn)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function XR() {
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
  function JR(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function ZR(e) {
    var t = [];
    vg(t, Xo, e, Hf(e)), vh(e0, t);
  }
  function e0(e) {
    Mg(e, 0);
  }
  function Fu(e) {
    var t = _l(e);
    if (bo(t))
      return e;
  }
  function t0(e, t) {
    if (e === "change")
      return t;
  }
  var hg = !1;
  tn && (hg = QR("input") && (!document.documentMode || document.documentMode > 9));
  function n0(e, t) {
    Qo = e, Xo = t, Qo.attachEvent("onpropertychange", yg);
  }
  function gg() {
    Qo && (Qo.detachEvent("onpropertychange", yg), Qo = null, Xo = null);
  }
  function yg(e) {
    e.propertyName === "value" && Fu(Xo) && ZR(e);
  }
  function a0(e, t, n) {
    e === "focusin" ? (gg(), n0(t, n)) : e === "focusout" && gg();
  }
  function r0(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fu(Xo);
  }
  function i0(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function l0(e, t) {
    if (e === "click")
      return Fu(t);
  }
  function o0(e, t) {
    if (e === "input" || e === "change")
      return Fu(t);
  }
  function s0(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Re(e, "number", e.value);
  }
  function u0(e, t, n, a, r, i, l) {
    var s = n ? _l(n) : window, u, v;
    if (JR(s) ? u = t0 : mg(s) ? hg ? u = o0 : (u = r0, v = a0) : i0(s) && (u = l0), u) {
      var h = u(t, n);
      if (h) {
        vg(e, h, a, r);
        return;
      }
    }
    v && v(t, s, n), t === "focusout" && s0(s);
  }
  function c0() {
    en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function f0(e, t, n, a, r, i, l) {
    var s = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (s && !wS(a)) {
      var v = a.relatedTarget || a.fromElement;
      if (v && (Vi(v) || ds(v)))
        return;
    }
    if (!(!u && !s)) {
      var h;
      if (r.window === r)
        h = r;
      else {
        var x = r.ownerDocument;
        x ? h = x.defaultView || x.parentWindow : h = window;
      }
      var S, _;
      if (u) {
        var L = a.relatedTarget || a.toElement;
        if (S = n, _ = L ? Vi(L) : null, _ !== null) {
          var H = Ti(_);
          (_ !== H || _.tag !== U && _.tag !== Y) && (_ = null);
        }
      } else
        S = null, _ = n;
      if (S !== _) {
        var le = ag, Ee = "onMouseLeave", ge = "onMouseEnter", qe = "mouse";
        (t === "pointerout" || t === "pointerover") && (le = ig, Ee = "onPointerLeave", ge = "onPointerEnter", qe = "pointer");
        var Pe = S == null ? h : _l(S), j = _ == null ? h : _l(_), P = new le(Ee, qe + "leave", S, a, r);
        P.target = Pe, P.relatedTarget = j;
        var w = null, X = Vi(r);
        if (X === n) {
          var de = new le(ge, qe + "enter", _, a, r);
          de.target = j, de.relatedTarget = Pe, w = de;
        }
        V0(e, P, w, S, _);
      }
    }
  }
  function d0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Xn = typeof Object.is == "function" ? Object.is : d0;
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
  function p0(e) {
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
      n = bg(p0(n));
    }
  }
  function m0(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, s = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return v0(e, r, i, l, s);
  }
  function v0(e, t, n, a, r) {
    var i = 0, l = -1, s = -1, u = 0, v = 0, h = e, x = null;
    e: for (; ; ) {
      for (var S = null; h === t && (n === 0 || h.nodeType === fr) && (l = i + n), h === a && (r === 0 || h.nodeType === fr) && (s = i + r), h.nodeType === fr && (i += h.nodeValue.length), (S = h.firstChild) !== null; )
        x = h, h = S;
      for (; ; ) {
        if (h === e)
          break e;
        if (x === t && ++u === n && (l = i), x === a && ++v === r && (s = i), (S = h.nextSibling) !== null)
          break;
        h = x, x = h.parentNode;
      }
      h = S;
    }
    return l === -1 || s === -1 ? null : {
      start: l,
      end: s
    };
  }
  function h0(e, t) {
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
        var x = n.createRange();
        x.setStart(v.node, v.offset), r.removeAllRanges(), l > s ? (r.addRange(x), r.extend(h.node, h.offset)) : (x.setEnd(h.node, h.offset), r.addRange(x));
      }
    }
  }
  function Eg(e) {
    return e && e.nodeType === fr;
  }
  function Sg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Eg(e) ? !1 : Eg(t) ? Sg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function g0(e) {
    return e && e.ownerDocument && Sg(e.ownerDocument.documentElement, e);
  }
  function y0(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function xg() {
    for (var e = window, t = sr(); t instanceof e.HTMLIFrameElement; ) {
      if (y0(t))
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
  function b0() {
    var e = xg();
    return {
      focusedElem: e,
      selectionRange: Bd(e) ? E0(e) : null
    };
  }
  function N0(e) {
    var t = xg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && g0(n)) {
      a !== null && Bd(n) && S0(n, a);
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
  function E0(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = m0(e), t || {
      start: 0,
      end: 0
    };
  }
  function S0(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : h0(e, t);
  }
  var x0 = tn && "documentMode" in document && document.documentMode <= 11;
  function R0() {
    Zt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Cl = null, $d = null, Zo = null, Yd = !1;
  function C0(e) {
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
  function D0(e) {
    return e.window === e ? e.document : e.nodeType === dr ? e : e.ownerDocument;
  }
  function Rg(e, t, n) {
    var a = D0(n);
    if (!(Yd || Cl == null || Cl !== sr(a))) {
      var r = C0(Cl);
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
  function T0(e, t, n, a, r, i, l) {
    var s = n ? _l(n) : window;
    switch (t) {
      case "focusin":
        (mg(s) || s.contentEditable === "true") && (Cl = s, $d = n, Zo = null);
        break;
      case "focusout":
        Cl = null, $d = null, Zo = null;
        break;
      case "mousedown":
        Yd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Yd = !1, Rg(e, a, r);
        break;
      case "selectionchange":
        if (x0)
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
  }, Id = {}, Cg = {};
  tn && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete Dl.animationend.animation, delete Dl.animationiteration.animation, delete Dl.animationstart.animation), "TransitionEvent" in window || delete Dl.transitionend.transition);
  function Hu(e) {
    if (Id[e])
      return Id[e];
    if (!Dl[e])
      return e;
    var t = Dl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Cg)
        return Id[e] = t[n];
    return e;
  }
  var Dg = Hu("animationend"), Tg = Hu("animationiteration"), jg = Hu("animationstart"), wg = Hu("transitionend"), _g = /* @__PURE__ */ new Map(), Og = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Yr(e, t) {
    _g.set(e, t), Zt(t, [e]);
  }
  function j0() {
    for (var e = 0; e < Og.length; e++) {
      var t = Og[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Yr(n, "on" + a);
    }
    Yr(Dg, "onAnimationEnd"), Yr(Tg, "onAnimationIteration"), Yr(jg, "onAnimationStart"), Yr("dblclick", "onDoubleClick"), Yr("focusin", "onFocus"), Yr("focusout", "onBlur"), Yr(wg, "onTransitionEnd");
  }
  function w0(e, t, n, a, r, i, l) {
    var s = _g.get(t);
    if (s !== void 0) {
      var u = kd, v = t;
      switch (t) {
        case "keypress":
          if (Vu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = _R;
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
          u = hR;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = MR;
          break;
        case Dg:
        case Tg:
        case jg:
          u = bR;
          break;
        case wg:
          u = VR;
          break;
        case "scroll":
          u = pR;
          break;
        case "wheel":
          u = UR;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = ER;
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
        var x = !h && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", S = M0(n, s, a.type, h, x);
        if (S.length > 0) {
          var _ = new u(s, v, null, a, r);
          e.push({
            event: _,
            listeners: S
          });
        }
      }
    }
  }
  j0(), c0(), XR(), R0(), HR();
  function _0(e, t, n, a, r, i, l) {
    w0(e, t, n, a, r, i);
    var s = (i & DS) === 0;
    s && (f0(e, t, n, a, r), u0(e, t, n, a, r), T0(e, t, n, a, r), WR(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Ag(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, FS(a, t, void 0, e), e.currentTarget = null;
  }
  function O0(e, t, n) {
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
        var h = t[v], x = h.instance, S = h.currentTarget, _ = h.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        Ag(e, _, S), a = x;
      }
  }
  function Mg(e, t) {
    for (var n = (t & Co) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      O0(i, l, n);
    }
    zS();
  }
  function A0(e, t, n, a, r) {
    var i = Hf(n), l = [];
    _0(l, e, a, n, i, t), Mg(l, t);
  }
  function pt(e, t) {
    qd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sD(t), r = k0(e);
    a.has(r) || (Lg(t, e, zf, n), a.add(r));
  }
  function Gd(e, t, n) {
    qd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Co), Lg(n, e, a, t);
  }
  var Pu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Pu]) {
      e[Pu] = !0, na.forEach(function(n) {
        n !== "selectionchange" && (qd.has(n) || Gd(n, !1, e), Gd(n, !0, e));
      });
      var t = e.nodeType === dr ? e : e.ownerDocument;
      t !== null && (t[Pu] || (t[Pu] = !0, Gd("selectionchange", !1, t)));
    }
  }
  function Lg(e, t, n, a, r) {
    var i = aR(e, t, n), l = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? uR(e, t, i, l) : sR(e, t, i) : l !== void 0 ? cR(e, t, i, l) : oR(e, t, i);
  }
  function Vg(e, t) {
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
          if (u === D || u === V) {
            var v = s.stateNode.containerInfo;
            if (Vg(v, l))
              break;
            if (u === V)
              for (var h = s.return; h !== null; ) {
                var x = h.tag;
                if (x === D || x === V) {
                  var S = h.stateNode.containerInfo;
                  if (Vg(S, l))
                    return;
                }
                h = h.return;
              }
            for (; v !== null; ) {
              var _ = Vi(v);
              if (_ === null)
                return;
              var L = _.tag;
              if (L === U || L === Y) {
                s = i = _;
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
      return A0(e, t, n, i);
    });
  }
  function ns(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function M0(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, s = a ? l : t, u = [], v = e, h = null; v !== null; ) {
      var x = v, S = x.stateNode, _ = x.tag;
      if (_ === U && S !== null && (h = S, s !== null)) {
        var L = To(v, s);
        L != null && u.push(ns(v, L, h));
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
      if (s === U && l !== null) {
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
    while (e && e.tag !== U);
    return e || null;
  }
  function L0(e, t) {
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
      var u = s, v = u.alternate, h = u.stateNode, x = u.tag;
      if (v !== null && v === a)
        break;
      if (x === U && h !== null) {
        var S = h;
        if (r) {
          var _ = To(s, i);
          _ != null && l.unshift(ns(s, _, S));
        } else if (!r) {
          var L = To(s, i);
          L != null && l.push(ns(s, L, S));
        }
      }
      s = s.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function V0(e, t, n, a, r) {
    var i = a && r ? L0(a, r) : null;
    a !== null && kg(e, t, a, i, !1), r !== null && n !== null && kg(e, n, r, i, !0);
  }
  function k0(e, t) {
    return e + "__bubble";
  }
  var Hn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Ir = "suppressHydrationWarning", Ug = "autoFocus", Mi = "children", Li = "style", Yu = "__html", Kd, Iu, rs, Fg, qu, zg, Hg;
  Kd = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Iu = function(e, t) {
    bS(e, t), NS(e, t), CS(e, t, {
      registrationNameDependencies: Dt,
      possibleRegistrationNames: Jt
    });
  }, zg = tn && !document.documentMode, rs = function(e, t, n) {
    if (!Hn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (Hn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Fg = function(e) {
    if (!Hn) {
      Hn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, qu = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Hg = function(e, t) {
    var n = e.namespaceURI === cr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var U0 = /\r\n?/g, F0 = /\u0000|\uFFFD/g;
  function Gu(e) {
    Un(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(U0, `
`).replace(F0, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (Hn || (Hn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ye))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Pg(e) {
    return e.nodeType === dr ? e : e.ownerDocument;
  }
  function z0() {
  }
  function Ku(e) {
    e.onclick = z0;
  }
  function H0(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Li)
          l && Object.freeze(l), ah(t, l);
        else if (i === as) {
          var s = l ? l[Yu] : void 0;
          s != null && Jv(t, s);
        } else if (i === Mi)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && yu(t, l);
          } else typeof l == "number" && yu(t, "" + l);
        else i === $u || i === Ir || i === Ug || (Dt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && pt("scroll", t)) : l != null && Na(t, i, l, r));
      }
  }
  function P0(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? ah(e, l) : i === as ? Jv(e, l) : i === Mi ? yu(e, l) : Na(e, i, l, a);
    }
  }
  function B0(e, t, n, a) {
    var r, i = Pg(n), l, s = a;
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
  function $0(e, t) {
    return Pg(t).createTextNode(e);
  }
  function Y0(e, t, n, a) {
    var r = Si(t, n);
    Iu(t, n);
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
    switch (Ff(t, i), H0(t, e, a, i, r), t) {
      case "input":
        Ni(e), M(e, n, !1);
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
  function I0(e, t, n, a, r) {
    Iu(t, a);
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
        if (u === Li) {
          var x = l[u];
          for (v in x)
            x.hasOwnProperty(v) && (h || (h = {}), h[v] = "");
        } else u === as || u === Mi || u === $u || u === Ir || u === Ug || (Dt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in s) {
      var S = s[u], _ = l != null ? l[u] : void 0;
      if (!(!s.hasOwnProperty(u) || S === _ || S == null && _ == null))
        if (u === Li)
          if (S && Object.freeze(S), _) {
            for (v in _)
              _.hasOwnProperty(v) && (!S || !S.hasOwnProperty(v)) && (h || (h = {}), h[v] = "");
            for (v in S)
              S.hasOwnProperty(v) && _[v] !== S[v] && (h || (h = {}), h[v] = S[v]);
          } else
            h || (i || (i = []), i.push(u, h)), h = S;
        else if (u === as) {
          var L = S ? S[Yu] : void 0, H = _ ? _[Yu] : void 0;
          L != null && H !== L && (i = i || []).push(u, L);
        } else u === Mi ? (typeof S == "string" || typeof S == "number") && (i = i || []).push(u, "" + S) : u === $u || u === Ir || (Dt.hasOwnProperty(u) ? (S != null && (typeof S != "function" && qu(u, S), u === "onScroll" && pt("scroll", e)), !i && _ !== S && (i = [])) : (i = i || []).push(u, S));
    }
    return h && (fS(h, s[Li]), (i = i || []).push(Li, h)), i;
  }
  function q0(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && d(e, r);
    var i = Si(n, a), l = Si(n, r);
    switch (P0(e, t, i, l), n) {
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
  function G0(e) {
    {
      var t = e.toLowerCase();
      return bu.hasOwnProperty(t) && bu[t] || null;
    }
  }
  function W0(e, t, n, a, r, i, l) {
    var s, u;
    switch (s = Si(t, n), Iu(t, n), t) {
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
            u.add(h[x].name);
        }
      }
    }
    var _ = null;
    for (var L in n)
      if (n.hasOwnProperty(L)) {
        var H = n[L];
        if (L === Mi)
          typeof H == "string" ? e.textContent !== H && (n[Ir] !== !0 && Wu(e.textContent, H, i, l), _ = [Mi, H]) : typeof H == "number" && e.textContent !== "" + H && (n[Ir] !== !0 && Wu(e.textContent, H, i, l), _ = [Mi, "" + H]);
        else if (Dt.hasOwnProperty(L))
          H != null && (typeof H != "function" && qu(L, H), L === "onScroll" && pt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof s == "boolean") {
          var le = void 0, Ee = Nt(L);
          if (n[Ir] !== !0) {
            if (!(L === $u || L === Ir || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            L === "value" || L === "checked" || L === "selected")) {
              if (L === as) {
                var ge = e.innerHTML, qe = H ? H[Yu] : void 0;
                if (qe != null) {
                  var Pe = Hg(e, qe);
                  Pe !== ge && rs(L, ge, Pe);
                }
              } else if (L === Li) {
                if (u.delete(L), zg) {
                  var j = uS(H);
                  le = e.getAttribute("style"), j !== le && rs(L, le, j);
                }
              } else if (s && !xn)
                u.delete(L.toLowerCase()), le = di(e, L, H), H !== le && rs(L, le, H);
              else if (!gt(L, Ee, s) && !vn(L, H, Ee, s)) {
                var P = !1;
                if (Ee !== null)
                  u.delete(Ee.attributeName), le = Zi(e, L, H, Ee);
                else {
                  var w = a;
                  if (w === cr && (w = Mf(t)), w === cr)
                    u.delete(L.toLowerCase());
                  else {
                    var X = G0(L);
                    X !== null && X !== L && (P = !0, u.delete(X)), u.delete(L);
                  }
                  le = di(e, L, H);
                }
                var de = xn;
                !de && H !== le && !P && rs(L, le, H);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Ir] !== !0 && Fg(u), t) {
      case "input":
        Ni(e), M(e, n, !0);
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
    return _;
  }
  function K0(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Qd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t) {
    {
      if (Hn)
        return;
      Hn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Jd(e, t, n) {
    {
      if (Hn)
        return;
      Hn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Zd(e, t) {
    {
      if (t === "" || Hn)
        return;
      Hn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function Q0(e, t, n) {
    switch (t) {
      case "input":
        z(e, n);
        return;
      case "textarea":
        YE(e, n);
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
    var X0 = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Bg = [
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
    ], J0 = Bg.concat(["button"]), Z0 = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], $g = {
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
      return Bg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), J0.indexOf(t) !== -1 && (n.pTagInButtonScope = null), X0.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
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
          return Z0.indexOf(t) === -1;
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
    }, Yg = {};
    is = function(e, t, n) {
      n = n || $g;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = eC(e, r) ? null : a, l = i ? null : tC(e, n), s = i || l;
      if (s) {
        var u = s.tag, v = !!i + "|" + e + "|" + u;
        if (!Yg[v]) {
          Yg[v] = !0;
          var h = e, x = "";
          if (e === "#text" ? /\S/.test(t) ? h = "Text nodes" : (h = "Whitespace text nodes", x = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : h = "<" + e + ">", i) {
            var S = "";
            u === "table" && e === "tr" && (S += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", h, u, x, S);
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
      case Vf: {
        t = a === dr ? "#document" : "#fragment";
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
      var s = t.toLowerCase(), u = ls(null, s);
      return {
        namespace: n,
        ancestorInfo: u
      };
    }
  }
  function rC(e, t, n) {
    {
      var a = e, r = Lf(a.namespace, t), i = ls(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function Z_(e) {
    return e;
  }
  function iC(e) {
    ep = nR(), tp = b0();
    var t = null;
    return Jh(!1), t;
  }
  function lC(e) {
    N0(tp), Jh(ep), ep = null, tp = null;
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
    var v = B0(e, t, n, i);
    return fs(r, v), up(v, t), v;
  }
  function sC(e, t) {
    e.appendChild(t);
  }
  function uC(e, t, n, a, r) {
    switch (Y0(e, t, n, a), t) {
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
    return I0(e, t, n, a);
  }
  function np(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function fC(e, t, n, a) {
    {
      var r = n;
      is(null, e, r.ancestorInfo);
    }
    var i = $0(e, t);
    return fs(a, i), i;
  }
  function dC() {
    var e = window.event;
    return e === void 0 ? yr : Zh(e.type);
  }
  var ap = typeof setTimeout == "function" ? setTimeout : void 0, pC = typeof clearTimeout == "function" ? clearTimeout : void 0, rp = -1, Ig = typeof Promise == "function" ? Promise : void 0, mC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ig < "u" ? function(e) {
    return Ig.resolve(null).then(e).catch(vC);
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
    q0(e, t, n, a, r), up(e, r);
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
            e.removeChild(r), Yo(t);
            return;
          } else
            a--;
        else (i === Xu || i === os || i === ss) && a++;
      }
      n = r;
    } while (n);
    Yo(t);
  }
  function CC(e, t) {
    e.nodeType === jt ? ip(e.parentNode, t) : e.nodeType === zn && ip(e, t), Yo(e);
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
  function LC(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function VC(e, t) {
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
    var v = (i.mode & Ye) !== xe;
    return W0(e, t, n, s, a, v, l);
  }
  function HC(e, t, n, a) {
    return fs(n, e), n.mode & Ye, K0(e, t);
  }
  function PC(e, t) {
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
    Yo(e);
  }
  function YC(e) {
    Yo(e);
  }
  function IC(e) {
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
  function Vi(e) {
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
    return t && (t.tag === U || t.tag === Y || t.tag === F || t.tag === D) ? t : null;
  }
  function _l(e) {
    if (e.tag === U || e.tag === Y)
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
        var s = Me(e) || "Unknown";
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
          var i = Me(e) || "Unknown";
          fp[i] || (fp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var s in l)
        if (!(s in r))
          throw new Error((Me(e) || "Unknown") + '.getChildContext(): key "' + s + '" is not defined in childContextTypes.');
      {
        var u = Me(e) || "Unknown";
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
      if (!IS(e) || e.tag !== T)
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
  var Ml = [], Ll = 0, sc = null, uc = 0, oa = [], sa = 0, ki = null, Sr = 1, xr = "";
  function fD(e) {
    return Fi(), (e.flags & bh) !== Ce;
  }
  function dD(e) {
    return Fi(), uc;
  }
  function pD() {
    var e = xr, t = Sr, n = t & ~mD(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Ml[Ll++] = uc, Ml[Ll++] = sc, sc = e, uc = t;
  }
  function ry(e, t, n) {
    Fi(), oa[sa++] = Sr, oa[sa++] = xr, oa[sa++] = ki, ki = e;
    var a = Sr, r = xr, i = cc(a) - 1, l = a & ~(1 << i), s = n + 1, u = cc(t) + i;
    if (u > 30) {
      var v = i - i % 5, h = (1 << v) - 1, x = (l & h).toString(32), S = l >> v, _ = i - v, L = cc(t) + _, H = s << _, le = H | S, Ee = x + r;
      Sr = 1 << L | le, xr = Ee;
    } else {
      var ge = s << i, qe = ge | l, Pe = r;
      Sr = 1 << u | qe, xr = Pe;
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
      sc = Ml[--Ll], Ml[Ll] = null, uc = Ml[--Ll], Ml[Ll] = null;
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
      case U: {
        var n = (e.mode & Ye) !== xe;
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
      case F: {
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
            case U:
              var a = t.type;
              t.pendingProps, XC(n, a);
              break;
            case Y:
              var r = t.pendingProps;
              JC(n, r);
              break;
          }
          break;
        }
        case U: {
          var i = e.type, l = e.memoizedProps, s = e.stateNode;
          switch (t.tag) {
            case U: {
              var u = t.type, v = t.pendingProps, h = (e.mode & Ye) !== xe;
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
            case Y: {
              var x = t.pendingProps, S = (e.mode & Ye) !== xe;
              nD(
                i,
                l,
                s,
                x,
                // TODO: Delete this argument when we remove the legacy root API.
                S
              );
              break;
            }
          }
          break;
        }
        case F: {
          var _ = e.memoizedState, L = _.dehydrated;
          if (L !== null) switch (t.tag) {
            case U:
              var H = t.type;
              t.pendingProps, ZC(L, H);
              break;
            case Y:
              var le = t.pendingProps;
              eD(L, le);
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
      case U: {
        var n = e.type;
        e.pendingProps;
        var a = OC(t, n);
        return a !== null ? (e.stateNode = a, an = e, ua = kC(a), !0) : !1;
      }
      case Y: {
        var r = e.pendingProps, i = AC(t, r);
        return i !== null ? (e.stateNode = i, an = e, ua = null, !0) : !1;
      }
      case F: {
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
    return (e.mode & Ye) !== xe && (e.flags & Xe) === Ce;
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
    var t = e.stateNode, n = e.memoizedProps, a = HC(t, n, e);
    if (a) {
      var r = an;
      if (r !== null)
        switch (r.tag) {
          case D: {
            var i = r.stateNode.containerInfo, l = (r.mode & Ye) !== xe;
            qC(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case U: {
            var s = r.type, u = r.memoizedProps, v = r.stateNode, h = (r.mode & Ye) !== xe;
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
    PC(n, e);
  }
  function RD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return BC(n);
  }
  function cy(e) {
    for (var t = e.return; t !== null && t.tag !== U && t.tag !== D && t.tag !== F; )
      t = t.return;
    an = t;
  }
  function fc(e) {
    if (e !== an)
      return !1;
    if (!Ta)
      return cy(e), Ta = !0, !1;
    if (e.tag !== D && (e.tag !== U || IC(e.type) && !np(e.type, e.memoizedProps))) {
      var t = ua;
      if (t)
        if (bp(e))
          fy(e), Np();
        else
          for (; t; )
            oy(e, t), t = us(t);
    }
    return cy(e), e.tag === F ? ua = RD(e) : ua = an ? us(e.stateNode) : null, !0;
  }
  function CD() {
    return Ta && ua !== null;
  }
  function fy(e) {
    for (var t = ua; t; )
      ly(e, t), t = us(t);
  }
  function Vl() {
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
    }, Hi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ps = [], ms = [], vs = [], hs = [], gs = [], ys = [], Pi = /* @__PURE__ */ new Set();
    ja.recordUnsafeLifecycleWarnings = function(e, t) {
      Pi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & St && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && vs.push(e), e.mode & St && typeof t.UNSAFE_componentWillReceiveProps == "function" && hs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & St && typeof t.UNSAFE_componentWillUpdate == "function" && ys.push(e));
    }, ja.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(S) {
        e.add(Me(S) || "Component"), Pi.add(S.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(S) {
        t.add(Me(S) || "Component"), Pi.add(S.type);
      }), ms = []);
      var n = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(S) {
        n.add(Me(S) || "Component"), Pi.add(S.type);
      }), vs = []);
      var a = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(S) {
        a.add(Me(S) || "Component"), Pi.add(S.type);
      }), hs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(S) {
        r.add(Me(S) || "Component"), Pi.add(S.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (ys.length > 0 && (ys.forEach(function(S) {
        i.add(Me(S) || "Component"), Pi.add(S.type);
      }), ys = []), t.size > 0) {
        var l = Hi(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var s = Hi(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, s);
      }
      if (i.size > 0) {
        var u = Hi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, u);
      }
      if (e.size > 0) {
        var v = Hi(e);
        E(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (n.size > 0) {
        var h = Hi(n);
        E(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (r.size > 0) {
        var x = Hi(r);
        E(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
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
            a.add(Me(i) || "Component"), py.add(i.type);
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
      var n = Me(t) || "Component";
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
        var r = Me(e) || "Component";
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
        var h = function(x) {
          var S = u.refs;
          x === null ? delete S[v] : S[v] = x;
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
      var t = Me(e) || "Component";
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
    function t(j, P) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [P], j.flags |= xi) : w.push(P);
      }
    }
    function n(j, P) {
      if (!e)
        return null;
      for (var w = P; w !== null; )
        t(j, w), w = w.sibling;
      return null;
    }
    function a(j, P) {
      for (var w = /* @__PURE__ */ new Map(), X = P; X !== null; )
        X.key !== null ? w.set(X.key, X) : w.set(X.index, X), X = X.sibling;
      return w;
    }
    function r(j, P) {
      var w = Qi(j, P);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, P, w) {
      if (j.index = w, !e)
        return j.flags |= bh, P;
      var X = j.alternate;
      if (X !== null) {
        var de = X.index;
        return de < P ? (j.flags |= wt, P) : de;
      } else
        return j.flags |= wt, P;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= wt), j;
    }
    function s(j, P, w, X) {
      if (P === null || P.tag !== Y) {
        var de = Sv(w, j.mode, X);
        return de.return = j, de;
      } else {
        var se = r(P, w);
        return se.return = j, se;
      }
    }
    function u(j, P, w, X) {
      var de = w.type;
      if (de === Pa)
        return h(j, P, w.props.children, X, w.key);
      if (P !== null && (P.elementType === de || // Keep this check inline so it only runs on the false path:
      EN(P, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof de == "object" && de !== null && de.$$typeof === Se && vy(de) === P.type)) {
        var se = r(P, w.props);
        return se.ref = bs(j, P, w), se.return = j, se._debugSource = w._source, se._debugOwner = w._owner, se;
      }
      var De = Ev(w, j.mode, X);
      return De.ref = bs(j, P, w), De.return = j, De;
    }
    function v(j, P, w, X) {
      if (P === null || P.tag !== V || P.stateNode.containerInfo !== w.containerInfo || P.stateNode.implementation !== w.implementation) {
        var de = xv(w, j.mode, X);
        return de.return = j, de;
      } else {
        var se = r(P, w.children || []);
        return se.return = j, se;
      }
    }
    function h(j, P, w, X, de) {
      if (P === null || P.tag !== oe) {
        var se = oi(w, j.mode, X, de);
        return se.return = j, se;
      } else {
        var De = r(P, w);
        return De.return = j, De;
      }
    }
    function x(j, P, w) {
      if (typeof P == "string" && P !== "" || typeof P == "number") {
        var X = Sv("" + P, j.mode, w);
        return X.return = j, X;
      }
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case ia: {
            var de = Ev(P, j.mode, w);
            return de.ref = bs(j, null, P), de.return = j, de;
          }
          case qn: {
            var se = xv(P, j.mode, w);
            return se.return = j, se;
          }
          case Se: {
            var De = P._payload, Ae = P._init;
            return x(j, Ae(De), w);
          }
        }
        if (He(P) || Sa(P)) {
          var rt = oi(P, j.mode, w, null);
          return rt.return = j, rt;
        }
        pc(j, P);
      }
      return typeof P == "function" && mc(j), null;
    }
    function S(j, P, w, X) {
      var de = P !== null ? P.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return de !== null ? null : s(j, P, "" + w, X);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return w.key === de ? u(j, P, w, X) : null;
          case qn:
            return w.key === de ? v(j, P, w, X) : null;
          case Se: {
            var se = w._payload, De = w._init;
            return S(j, P, De(se), X);
          }
        }
        if (He(w) || Sa(w))
          return de !== null ? null : h(j, P, w, X, null);
        pc(j, w);
      }
      return typeof w == "function" && mc(j), null;
    }
    function _(j, P, w, X, de) {
      if (typeof X == "string" && X !== "" || typeof X == "number") {
        var se = j.get(w) || null;
        return s(P, se, "" + X, de);
      }
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case ia: {
            var De = j.get(X.key === null ? w : X.key) || null;
            return u(P, De, X, de);
          }
          case qn: {
            var Ae = j.get(X.key === null ? w : X.key) || null;
            return v(P, Ae, X, de);
          }
          case Se:
            var rt = X._payload, Ge = X._init;
            return _(j, P, w, Ge(rt), de);
        }
        if (He(X) || Sa(X)) {
          var Rt = j.get(w) || null;
          return h(P, Rt, X, de, null);
        }
        pc(P, X);
      }
      return typeof X == "function" && mc(P), null;
    }
    function L(j, P, w) {
      {
        if (typeof j != "object" || j === null)
          return P;
        switch (j.$$typeof) {
          case ia:
          case qn:
            my(j, w);
            var X = j.key;
            if (typeof X != "string")
              break;
            if (P === null) {
              P = /* @__PURE__ */ new Set(), P.add(X);
              break;
            }
            if (!P.has(X)) {
              P.add(X);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", X);
            break;
          case Se:
            var de = j._payload, se = j._init;
            L(se(de), P, w);
            break;
        }
      }
      return P;
    }
    function H(j, P, w, X) {
      for (var de = null, se = 0; se < w.length; se++) {
        var De = w[se];
        de = L(De, de, j);
      }
      for (var Ae = null, rt = null, Ge = P, Rt = 0, We = 0, xt = null; Ge !== null && We < w.length; We++) {
        Ge.index > We ? (xt = Ge, Ge = null) : xt = Ge.sibling;
        var En = S(j, Ge, w[We], X);
        if (En === null) {
          Ge === null && (Ge = xt);
          break;
        }
        e && Ge && En.alternate === null && t(j, Ge), Rt = i(En, Rt, We), rt === null ? Ae = En : rt.sibling = En, rt = En, Ge = xt;
      }
      if (We === w.length) {
        if (n(j, Ge), rn()) {
          var dn = We;
          Ui(j, dn);
        }
        return Ae;
      }
      if (Ge === null) {
        for (; We < w.length; We++) {
          var ea = x(j, w[We], X);
          ea !== null && (Rt = i(ea, Rt, We), rt === null ? Ae = ea : rt.sibling = ea, rt = ea);
        }
        if (rn()) {
          var Ln = We;
          Ui(j, Ln);
        }
        return Ae;
      }
      for (var Vn = a(j, Ge); We < w.length; We++) {
        var Sn = _(Vn, j, We, w[We], X);
        Sn !== null && (e && Sn.alternate !== null && Vn.delete(Sn.key === null ? We : Sn.key), Rt = i(Sn, Rt, We), rt === null ? Ae = Sn : rt.sibling = Sn, rt = Sn);
      }
      if (e && Vn.forEach(function(eo) {
        return t(j, eo);
      }), rn()) {
        var _r = We;
        Ui(j, _r);
      }
      return Ae;
    }
    function le(j, P, w, X) {
      var de = Sa(w);
      if (typeof de != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (Rp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), w.entries === de && (xp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), xp = !0);
        var se = de.call(w);
        if (se)
          for (var De = null, Ae = se.next(); !Ae.done; Ae = se.next()) {
            var rt = Ae.value;
            De = L(rt, De, j);
          }
      }
      var Ge = de.call(w);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Rt = null, We = null, xt = P, En = 0, dn = 0, ea = null, Ln = Ge.next(); xt !== null && !Ln.done; dn++, Ln = Ge.next()) {
        xt.index > dn ? (ea = xt, xt = null) : ea = xt.sibling;
        var Vn = S(j, xt, Ln.value, X);
        if (Vn === null) {
          xt === null && (xt = ea);
          break;
        }
        e && xt && Vn.alternate === null && t(j, xt), En = i(Vn, En, dn), We === null ? Rt = Vn : We.sibling = Vn, We = Vn, xt = ea;
      }
      if (Ln.done) {
        if (n(j, xt), rn()) {
          var Sn = dn;
          Ui(j, Sn);
        }
        return Rt;
      }
      if (xt === null) {
        for (; !Ln.done; dn++, Ln = Ge.next()) {
          var _r = x(j, Ln.value, X);
          _r !== null && (En = i(_r, En, dn), We === null ? Rt = _r : We.sibling = _r, We = _r);
        }
        if (rn()) {
          var eo = dn;
          Ui(j, eo);
        }
        return Rt;
      }
      for (var Xs = a(j, xt); !Ln.done; dn++, Ln = Ge.next()) {
        var nr = _(Xs, j, dn, Ln.value, X);
        nr !== null && (e && nr.alternate !== null && Xs.delete(nr.key === null ? dn : nr.key), En = i(nr, En, dn), We === null ? Rt = nr : We.sibling = nr, We = nr);
      }
      if (e && Xs.forEach(function(nw) {
        return t(j, nw);
      }), rn()) {
        var tw = dn;
        Ui(j, tw);
      }
      return Rt;
    }
    function Ee(j, P, w, X) {
      if (P !== null && P.tag === Y) {
        n(j, P.sibling);
        var de = r(P, w);
        return de.return = j, de;
      }
      n(j, P);
      var se = Sv(w, j.mode, X);
      return se.return = j, se;
    }
    function ge(j, P, w, X) {
      for (var de = w.key, se = P; se !== null; ) {
        if (se.key === de) {
          var De = w.type;
          if (De === Pa) {
            if (se.tag === oe) {
              n(j, se.sibling);
              var Ae = r(se, w.props.children);
              return Ae.return = j, Ae._debugSource = w._source, Ae._debugOwner = w._owner, Ae;
            }
          } else if (se.elementType === De || // Keep this check inline so it only runs on the false path:
          EN(se, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof De == "object" && De !== null && De.$$typeof === Se && vy(De) === se.type) {
            n(j, se.sibling);
            var rt = r(se, w.props);
            return rt.ref = bs(j, se, w), rt.return = j, rt._debugSource = w._source, rt._debugOwner = w._owner, rt;
          }
          n(j, se);
          break;
        } else
          t(j, se);
        se = se.sibling;
      }
      if (w.type === Pa) {
        var Ge = oi(w.props.children, j.mode, X, w.key);
        return Ge.return = j, Ge;
      } else {
        var Rt = Ev(w, j.mode, X);
        return Rt.ref = bs(j, P, w), Rt.return = j, Rt;
      }
    }
    function qe(j, P, w, X) {
      for (var de = w.key, se = P; se !== null; ) {
        if (se.key === de)
          if (se.tag === V && se.stateNode.containerInfo === w.containerInfo && se.stateNode.implementation === w.implementation) {
            n(j, se.sibling);
            var De = r(se, w.children || []);
            return De.return = j, De;
          } else {
            n(j, se);
            break;
          }
        else
          t(j, se);
        se = se.sibling;
      }
      var Ae = xv(w, j.mode, X);
      return Ae.return = j, Ae;
    }
    function Pe(j, P, w, X) {
      var de = typeof w == "object" && w !== null && w.type === Pa && w.key === null;
      if (de && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case ia:
            return l(ge(j, P, w, X));
          case qn:
            return l(qe(j, P, w, X));
          case Se:
            var se = w._payload, De = w._init;
            return Pe(j, P, De(se), X);
        }
        if (He(w))
          return H(j, P, w, X);
        if (Sa(w))
          return le(j, P, w, X);
        pc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(Ee(j, P, "" + w, X)) : (typeof w == "function" && mc(j), n(j, P));
    }
    return Pe;
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
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = ke(r.childLanes, t)) : (a.childLanes = ke(a.childLanes, t), r !== null && (r.childLanes = ke(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function MD(e, t, n) {
    LD(e, t, n);
  }
  function LD(e, t, n) {
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
                var h = v.shared, x = h.pending;
                x === null ? u.next = u : (u.next = x.next, x.next = u), h.pending = u;
              }
            }
            a.lanes = ke(a.lanes, n);
            var S = a.alternate;
            S !== null && (S.lanes = ke(S.lanes, n)), Ap(a.return, n, e), i.lanes = ke(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === K)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === ne) {
        var _ = a.return;
        if (_ === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        _.lanes = ke(_.lanes, n);
        var L = _.alternate;
        L !== null && (L.lanes = ke(L.lanes, n)), Ap(_, n, e), r = a.sibling;
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
      a !== null && (Wn(n.lanes, t) && Ls(), n.firstContext = null);
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
  function VD() {
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
  function Pn(e, t) {
    return yc(e, t);
  }
  var FD = yc;
  function yc(e, t) {
    e.lanes = ke(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = ke(n.lanes, t)), n === null && (e.flags & (wt | mr)) !== Ce && gN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = ke(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = ke(n.childLanes, t) : (r.flags & (wt | mr)) !== Ce && gN(e), a = r, r = r.return;
    if (a.tag === D) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Sy = 0, xy = 1, bc = 2, Lp = 3, Nc = !1, Vp, Ec;
  Vp = !1, Ec = null;
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
    if (Ec === r && !Vp && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Vp = !0), kj()) {
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
        var l = ke(i, n);
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
      case Lp:
        e.flags = e.flags & ~_n | Xe;
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
        var x = h.updateQueue, S = x.lastBaseUpdate;
        S !== l && (S === null ? x.firstBaseUpdate = v : S.next = v, x.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var _ = r.baseState, L = W, H = null, le = null, Ee = null, ge = i;
      do {
        var qe = ge.lane, Pe = ge.eventTime;
        if (El(a, qe)) {
          if (Ee !== null) {
            var P = {
              eventTime: Pe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              tag: ge.tag,
              payload: ge.payload,
              callback: ge.callback,
              next: null
            };
            Ee = Ee.next = P;
          }
          _ = zD(e, r, ge, _, t, n);
          var w = ge.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          ge.lane !== Wt) {
            e.flags |= yh;
            var X = r.effects;
            X === null ? r.effects = [ge] : X.push(ge);
          }
        } else {
          var j = {
            eventTime: Pe,
            lane: qe,
            tag: ge.tag,
            payload: ge.payload,
            callback: ge.callback,
            next: null
          };
          Ee === null ? (le = Ee = j, H = _) : Ee = Ee.next = j, L = ke(L, qe);
        }
        if (ge = ge.next, ge === null) {
          if (s = r.shared.pending, s === null)
            break;
          var de = s, se = de.next;
          de.next = null, ge = se, r.lastBaseUpdate = de, r.shared.pending = null;
        }
      } while (!0);
      Ee === null && (H = _), r.baseState = H, r.firstBaseUpdate = le, r.lastBaseUpdate = Ee;
      var De = r.shared.interleaved;
      if (De !== null) {
        var Ae = De;
        do
          L = ke(L, Ae.lane), Ae = Ae.next;
        while (Ae !== De);
      } else i === null && (r.shared.lanes = W);
      qs(L), e.lanes = L, e.memoizedState = _;
    }
    Ec = null;
  }
  function HD(e, t) {
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
        l !== null && (i.callback = null, HD(l, n));
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
  function Hp(e) {
    Es.current === e && (yn(Jr, e), yn(Es, e));
  }
  var PD = 0, wy = 1, _y = 1, Ss = 2, wa = Gr(PD);
  function Pp(e, t) {
    return (e & t) !== 0;
  }
  function Hl(e) {
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
  function Pl(e) {
    yn(wa, e);
  }
  function $D(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Tc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === F) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Gg(a) || lp(a))
            return t;
        }
      } else if (t.tag === k && // revealOrder undefined can't be trusted because it don't
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
  ), Lt = (
    /* */
    1
  ), Ka = (
    /*  */
    2
  ), Vt = (
    /*    */
    4
  ), ln = (
    /*   */
    8
  ), $p = [];
  function Yp() {
    for (var e = 0; e < $p.length; e++) {
      var t = $p[e];
      t._workInProgressVersionPrimary = null;
    }
    $p.length = 0;
  }
  function YD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ce = m.ReactCurrentDispatcher, xs = m.ReactCurrentBatchConfig, Ip, Bl;
  Ip = /* @__PURE__ */ new Set();
  var $i = W, at = null, kt = null, Ut = null, jc = !1, Rs = !1, Cs = 0, ID = 0, qD = 25, $ = null, ca = null, ei = -1, qp = !1;
  function Ze() {
    {
      var e = $;
      ca === null ? ca = [e] : ca.push(e);
    }
  }
  function ae() {
    {
      var e = $;
      ca !== null && (ei++, ca[ei] !== e && GD(e));
    }
  }
  function $l(e) {
    e != null && !He(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", $, typeof e);
  }
  function GD(e) {
    {
      var t = Me(at);
      if (!Ip.has(t) && (Ip.add(t), ca !== null)) {
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
  function Yl(e, t, n, a, r, i) {
    $i = i, at = t, ca = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = W, e !== null && e.memoizedState !== null ? ce.current = Jy : ca !== null ? ce.current = Xy : ce.current = Qy;
    var l = n(a, r);
    if (Rs) {
      var s = 0;
      do {
        if (Rs = !1, Cs = 0, s >= qD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        s += 1, qp = !1, kt = null, Ut = null, t.updateQueue = null, ei = -1, ce.current = Zy, l = n(a, r);
      } while (Rs);
    }
    ce.current = Pc, t._debugHookTypes = ca;
    var u = kt !== null && kt.next !== null;
    if ($i = W, at = null, kt = null, Ut = null, $ = null, ca = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ye) !== xe && f("Internal React error: Expected static flag was missing. Please notify the React team."), jc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Il() {
    var e = Cs !== 0;
    return Cs = 0, e;
  }
  function Oy(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ia) !== xe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function Ay() {
    if (ce.current = Pc, jc) {
      for (var e = at.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      jc = !1;
    }
    $i = W, at = null, kt = null, Ut = null, ca = null, ei = -1, $ = null, Iy = !1, Rs = !1, Cs = 0;
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
      var h = l.next, x = i.baseState, S = null, _ = null, L = null, H = h;
      do {
        var le = H.lane;
        if (El($i, le)) {
          if (L !== null) {
            var ge = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Wt,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            };
            L = L.next = ge;
          }
          if (H.hasEagerState)
            x = H.eagerState;
          else {
            var qe = H.action;
            x = e(x, qe);
          }
        } else {
          var Ee = {
            lane: le,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          L === null ? (_ = L = Ee, S = x) : L = L.next = Ee, at.lanes = ke(at.lanes, le), qs(le);
        }
        H = H.next;
      } while (H !== null && H !== h);
      L === null ? S = x : L.next = _, Xn(x, a.memoizedState) || Ls(), a.memoizedState = x, a.baseState = S, a.baseQueue = L, r.lastRenderedState = x;
    }
    var Pe = r.interleaved;
    if (Pe !== null) {
      var j = Pe;
      do {
        var P = j.lane;
        at.lanes = ke(at.lanes, P), qs(P), j = j.next;
      } while (j !== Pe);
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
      Xn(s, a.memoizedState) || Ls(), a.memoizedState = s, a.baseQueue === null && (a.baseState = s), r.lastRenderedState = s;
    }
    return [s, i];
  }
  function eO(e, t, n) {
  }
  function tO(e, t, n) {
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
      ju(u, $i) || Ly(a, t, i);
    }
    r.memoizedState = i;
    var v = {
      value: i,
      getSnapshot: t
    };
    return r.queue = v, Mc(ky.bind(null, a, v, e), [e]), a.flags |= Fr, Ds(Lt | ln, Vy.bind(null, a, v, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = at, r = fa(), i = t();
    if (!Bl) {
      var l = t();
      Xn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var s = r.memoizedState, u = !Xn(s, i);
    u && (r.memoizedState = i, Ls());
    var v = r.queue;
    if (js(ky.bind(null, a, v, e), [e]), v.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & Lt) {
      a.flags |= Fr, Ds(Lt | ln, Vy.bind(null, a, v, i, t), void 0, null);
      var h = of();
      if (h === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      ju(h, $i) || Ly(a, t, i);
    }
    return i;
  }
  function Ly(e, t, n) {
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
  function Vy(e, t, n, a) {
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
    var t = Pn(e, je);
    t !== null && Pt(t, e, je, ut);
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
    at.flags |= e, r.memoizedState = Ds(Lt | t, n, void 0, i);
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
    at.flags |= e, r.memoizedState = Ds(Lt | t, n, l, i);
  }
  function Mc(e, t) {
    return (at.mode & Ia) !== xe ? Ts(Jf | Fr | Xf, ln, e, t) : Ts(Fr | Xf, ln, e, t);
  }
  function js(e, t) {
    return Ac(Fr, ln, e, t);
  }
  function nm(e, t) {
    return Ts(Qe, Ka, e, t);
  }
  function Lc(e, t) {
    return Ac(Qe, Ka, e, t);
  }
  function am(e, t) {
    var n = Qe;
    return n |= Di, (at.mode & Ia) !== xe && (n |= zr), Ts(n, Vt, e, t);
  }
  function Vc(e, t) {
    return Ac(Qe, Vt, e, t);
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
    var a = n != null ? n.concat([e]) : null, r = Qe;
    return r |= Di, (at.mode & Ia) !== xe && (r |= zr), Ts(r, Vt, zy.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Ac(Qe, Vt, zy.bind(null, t, e), a);
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
  function Hy(e) {
    var t = fa(), n = kt, a = n.memoizedState;
    return By(t, a, e);
  }
  function Py(e) {
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
        at.lanes = ke(at.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ls()), e.memoizedState = n, n;
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
        l > 10 && E("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
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
  function Yy() {
    var e = em(), t = e[0], n = fa(), a = n.memoizedState;
    return [t, a];
  }
  var Iy = !1;
  function QD() {
    return Iy;
  }
  function um() {
    var e = Qa(), t = of(), n = t.identifierPrefix, a;
    if (rn()) {
      var r = pD();
      a = ":" + n + "R" + r;
      var i = Cs++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = ID++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Hc() {
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
        Pt(i, e, a, l), Wy(i, t, a);
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
          s = ce.current, ce.current = _a;
          try {
            var u = t.lastRenderedState, v = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = v, Xn(v, u)) {
              kD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ce.current = s;
          }
        }
      }
      var h = Ey(e, t, r, a);
      if (h !== null) {
        var x = Mn();
        Pt(h, e, a, x), Wy(h, t, a);
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
      var r = ke(a, n);
      t.lanes = r, jd(e, r);
    }
  }
  function Ky(e, t, n) {
    ad(e, t);
  }
  var Pc = {
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
  }, Qy = null, Xy = null, Jy = null, Zy = null, Xa = null, _a = null, Bc = null;
  {
    var cm = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, we = function() {
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
        var n = ce.current;
        ce.current = Xa;
        try {
          return lm(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", Ze();
        var a = ce.current;
        ce.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", Ze(), tm(e);
      },
      useState: function(e) {
        $ = "useState", Ze();
        var t = ce.current;
        ce.current = Xa;
        try {
          return _c(e);
        } finally {
          ce.current = t;
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
      unstable_isNewReconciler: Je
    }, Xy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", ae(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", ae(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", ae(), Mc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", ae(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", ae(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", ae(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", ae();
        var n = ce.current;
        ce.current = Xa;
        try {
          return lm(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", ae();
        var a = ce.current;
        ce.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", ae(), tm(e);
      },
      useState: function(e) {
        $ = "useState", ae();
        var t = ce.current;
        ce.current = Xa;
        try {
          return _c(e);
        } finally {
          ce.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", ae(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", ae(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", ae(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", ae(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", ae(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", ae(), um();
      },
      unstable_isNewReconciler: Je
    }, Jy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", ae(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", ae(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", ae(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", ae(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", ae(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", ae(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", ae();
        var n = ce.current;
        ce.current = _a;
        try {
          return zc(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", ae();
        var a = ce.current;
        ce.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", ae(), Oc();
      },
      useState: function(e) {
        $ = "useState", ae();
        var t = ce.current;
        ce.current = _a;
        try {
          return Zp(e);
        } finally {
          ce.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", ae(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", ae(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", ae(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", ae(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", ae(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", ae(), Hc();
      },
      unstable_isNewReconciler: Je
    }, Zy = {
      readContext: function(e) {
        return _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", ae(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", ae(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", ae(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", ae(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", ae(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", ae(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", ae();
        var n = ce.current;
        ce.current = Bc;
        try {
          return zc(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", ae();
        var a = ce.current;
        ce.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", ae(), Oc();
      },
      useState: function(e) {
        $ = "useState", ae();
        var t = ce.current;
        ce.current = Bc;
        try {
          return em(e);
        } finally {
          ce.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", ae(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", ae(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", ae(), Yy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", ae(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", ae(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", ae(), Hc();
      },
      unstable_isNewReconciler: Je
    }, Xa = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", we(), Ze(), im(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", we(), Ze(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", we(), Ze(), Mc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", we(), Ze(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", we(), Ze(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", we(), Ze(), am(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", we(), Ze();
        var n = ce.current;
        ce.current = Xa;
        try {
          return lm(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", we(), Ze();
        var a = ce.current;
        ce.current = Xa;
        try {
          return Kp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", we(), Ze(), tm(e);
      },
      useState: function(e) {
        $ = "useState", we(), Ze();
        var t = ce.current;
        ce.current = Xa;
        try {
          return _c(e);
        } finally {
          ce.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", we(), Ze(), void 0;
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", we(), Ze(), om(e);
      },
      useTransition: function() {
        return $ = "useTransition", we(), Ze(), sm();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", we(), Ze(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", we(), Ze(), Jp(e, t, n);
      },
      useId: function() {
        return $ = "useId", we(), Ze(), um();
      },
      unstable_isNewReconciler: Je
    }, _a = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", we(), ae(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", we(), ae(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", we(), ae(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", we(), ae(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", we(), ae(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", we(), ae(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", we(), ae();
        var n = ce.current;
        ce.current = _a;
        try {
          return zc(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", we(), ae();
        var a = ce.current;
        ce.current = _a;
        try {
          return Qp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", we(), ae(), Oc();
      },
      useState: function(e) {
        $ = "useState", we(), ae();
        var t = ce.current;
        ce.current = _a;
        try {
          return Zp(e);
        } finally {
          ce.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", we(), ae(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", we(), ae(), Hy(e);
      },
      useTransition: function() {
        return $ = "useTransition", we(), ae(), $y();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", we(), ae(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", we(), ae(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", we(), ae(), Hc();
      },
      unstable_isNewReconciler: Je
    }, Bc = {
      readContext: function(e) {
        return cm(), _t(e);
      },
      useCallback: function(e, t) {
        return $ = "useCallback", we(), ae(), Fc(e, t);
      },
      useContext: function(e) {
        return $ = "useContext", we(), ae(), _t(e);
      },
      useEffect: function(e, t) {
        return $ = "useEffect", we(), ae(), js(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return $ = "useImperativeHandle", we(), ae(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return $ = "useInsertionEffect", we(), ae(), Lc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return $ = "useLayoutEffect", we(), ae(), Vc(e, t);
      },
      useMemo: function(e, t) {
        $ = "useMemo", we(), ae();
        var n = ce.current;
        ce.current = _a;
        try {
          return zc(e, t);
        } finally {
          ce.current = n;
        }
      },
      useReducer: function(e, t, n) {
        $ = "useReducer", we(), ae();
        var a = ce.current;
        ce.current = _a;
        try {
          return Xp(e, t, n);
        } finally {
          ce.current = a;
        }
      },
      useRef: function(e) {
        return $ = "useRef", we(), ae(), Oc();
      },
      useState: function(e) {
        $ = "useState", we(), ae();
        var t = ce.current;
        ce.current = _a;
        try {
          return em(e);
        } finally {
          ce.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return $ = "useDebugValue", we(), ae(), Uc();
      },
      useDeferredValue: function(e) {
        return $ = "useDeferredValue", we(), ae(), Py(e);
      },
      useTransition: function() {
        return $ = "useTransition", we(), ae(), Yy();
      },
      useMutableSource: function(e, t, n) {
        return $ = "useMutableSource", we(), ae(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return $ = "useSyncExternalStore", we(), ae(), wc(e, t);
      },
      useId: function() {
        return $ = "useId", we(), ae(), Hc();
      },
      unstable_isNewReconciler: Je
    };
  }
  var ti = p.unstable_now, eb = 0, $c = -1, ws = -1, Yc = -1, fm = !1, Ic = !1;
  function tb() {
    return fm;
  }
  function ZD() {
    Ic = !0;
  }
  function eT() {
    fm = !1, Ic = !1;
  }
  function tT() {
    fm = Ic, Ic = !1;
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
          case G:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function pm(e) {
    if (Yc >= 0) {
      var t = ti() - Yc;
      Yc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case D:
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
  function Za() {
    $c = ti();
  }
  function mm() {
    Yc = ti();
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
        var n = Ke(e) || "Component";
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
      s !== null && (Pt(s, a, i, r), Sc(s, a, i)), ad(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = dl(e), r = Mn(), i = ii(a), l = Rr(r, i);
      l.tag = xy, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var s = Xr(a, l, i);
      s !== null && (Pt(s, a, i, r), Sc(s, a, i)), ad(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = dl(e), a = Mn(), r = ii(n), i = Rr(a, r);
      i.tag = bc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (Pt(l, n, r, a), Sc(l, n, r)), xx(n, r);
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
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ke(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function nT(e, t, n) {
    var a = e.stateNode;
    {
      var r = Ke(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (_s.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & St) === xe && (_s.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !xm.has(t) && (xm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ke(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !bm.has(t) && (bm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ke(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var s = a.state;
      s && (typeof s != "object" || He(s)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
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
        l === null || l !== void 0 && l.$$typeof === ie && l._context === void 0
      );
      if (!s && !Rm.has(t)) {
        Rm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === Q ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ke(t) || "Component", u);
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
    var x = e.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null;
    sb(e, h);
    {
      if (typeof t.getDerivedStateFromProps == "function" && x === null) {
        var S = Ke(t) || "Component";
        ym.has(S) || (ym.add(S), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", S, h.state === null ? "null" : "undefined", S));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function") {
        var _ = null, L = null, H = null;
        if (typeof h.componentWillMount == "function" && h.componentWillMount.__suppressDeprecationWarning !== !0 ? _ = "componentWillMount" : typeof h.UNSAFE_componentWillMount == "function" && (_ = "UNSAFE_componentWillMount"), typeof h.componentWillReceiveProps == "function" && h.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof h.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof h.componentWillUpdate == "function" && h.componentWillUpdate.__suppressDeprecationWarning !== !0 ? H = "componentWillUpdate" : typeof h.UNSAFE_componentWillUpdate == "function" && (H = "UNSAFE_componentWillUpdate"), _ !== null || L !== null || H !== null) {
          var le = Ke(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(le) || (Nm.add(le), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, le, Ee, _ !== null ? `
  ` + _ : "", L !== null ? `
  ` + L : "", H !== null ? `
  ` + H : ""));
        }
      }
    }
    return a && Jg(e, r, i), h;
  }
  function aT(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Me(e) || "Component"), Dm.enqueueReplaceState(t, t.state, null));
  }
  function cb(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Me(e) || "Component";
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
        var s = Ke(t) || "Component";
        Sm.has(s) || (Sm.add(s), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", s));
      }
      e.mode & St && ja.recordLegacyContextWarning(e, r), ja.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Cm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (aT(e, r), xc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var v = Qe;
      v |= Di, (e.mode & Ia) !== xe && (v |= zr), e.flags |= v;
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
    var h = t.getDerivedStateFromProps, x = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !x && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && cb(e, r, n, u), Cy();
    var S = e.memoizedState, _ = r.state = S;
    if (xc(e, n, r, a), _ = e.memoizedState, i === n && S === _ && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var L = Qe;
        L |= Di, (e.mode & Ia) !== xe && (L |= zr), e.flags |= L;
      }
      return !1;
    }
    typeof h == "function" && (Cm(e, t, h, n), _ = e.memoizedState);
    var H = Rc() || ob(e, t, i, n, S, _, u);
    if (H) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var le = Qe;
        le |= Di, (e.mode & Ia) !== xe && (le |= zr), e.flags |= le;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ee = Qe;
        Ee |= Di, (e.mode & Ia) !== xe && (Ee |= zr), e.flags |= Ee;
      }
      e.memoizedProps = n, e.memoizedState = _;
    }
    return r.props = n, r.state = _, r.context = u, H;
  }
  function iT(e, t, n, a, r) {
    var i = t.stateNode;
    Ry(e, t);
    var l = t.memoizedProps, s = t.type === t.elementType ? l : Oa(t.type, l);
    i.props = s;
    var u = t.pendingProps, v = i.context, h = n.contextType, x = Jn;
    if (typeof h == "object" && h !== null)
      x = _t(h);
    else {
      var S = Ol(t, n, !0);
      x = Al(t, S);
    }
    var _ = n.getDerivedStateFromProps, L = typeof _ == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !L && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || v !== x) && cb(t, i, a, x), Cy();
    var H = t.memoizedState, le = i.state = H;
    if (xc(t, a, i, r), le = t.memoizedState, l === u && H === le && !rc() && !Rc() && !pn)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), !1;
    typeof _ == "function" && (Cm(t, n, _, a), le = t.memoizedState);
    var Ee = Rc() || ob(t, n, s, a, H, le, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    pn;
    return Ee ? (!L && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, le, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, le, x)), typeof i.componentDidUpdate == "function" && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= Qe), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = le), i.props = a, i.state = le, i.context = x, Ee;
  }
  function Yi(e, t) {
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
      var s = r ? Me(r) : null, u = s ? "The above error occurred in the <" + s + "> component:" : "The above error occurred in one of your React components:", v;
      if (e.tag === D)
        v = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var h = Me(e) || "Anonymous";
        v = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + h + ".");
      }
      var x = u + `
` + l + `

` + ("" + v);
      console.error(x);
    } catch (S) {
      setTimeout(function() {
        throw S;
      });
    }
  }
  var oT = typeof WeakMap == "function" ? WeakMap : Map;
  function fb(e, t, n) {
    var a = Rr(ut, n);
    a.tag = Lp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Rr(ut, n);
    a.tag = Lp;
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
      }), typeof r != "function" && (Wn(e.lanes, je) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Me(e) || "Unknown"));
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
    if ((e.mode & Ye) === xe && (n === C || n === q || n === B)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function pb(e) {
    var t = e;
    do {
      if (t.tag === F && $D(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function mb(e, t, n, a, r) {
    if ((e.mode & Ye) === xe) {
      if (e === t)
        e.flags |= _n;
      else {
        if (e.flags |= Xe, n.flags |= Kf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = J;
          else {
            var l = Rr(ut, je);
            l.tag = bc, Xr(n, l, je);
          }
        }
        n.lanes = ke(n.lanes, je);
      }
      return e;
    }
    return e.flags |= _n, e.lanes = r, e;
  }
  function cT(e, t, n, a, r) {
    if (n.flags |= Su, Ra && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      uT(n), rn() && n.mode & Ye && iy();
      var l = pb(t);
      if (l !== null) {
        l.flags &= ~pr, mb(l, t, n, e, r), l.mode & Ye && db(e, i, r), sT(l, e, i);
        return;
      } else {
        if (!Ax(r)) {
          db(e, i, r), uv();
          return;
        }
        var s = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = s;
      }
    } else if (rn() && n.mode & Ye) {
      iy();
      var u = pb(t);
      if (u !== null) {
        (u.flags & _n) === Ce && (u.flags |= pr), mb(u, t, n, e, r), Sp(Yi(a, n));
        return;
      }
    }
    a = Yi(a, n), $j(a);
    var v = t;
    do {
      switch (v.tag) {
        case D: {
          var h = a;
          v.flags |= _n;
          var x = Uo(r);
          v.lanes = ke(v.lanes, x);
          var S = fb(v, h, x);
          Up(v, S);
          return;
        }
        case T:
          var _ = a, L = v.type, H = v.stateNode;
          if ((v.flags & Xe) === Ce && (typeof L.getDerivedStateFromError == "function" || H !== null && typeof H.componentDidCatch == "function" && !pN(H))) {
            v.flags |= _n;
            var le = Uo(r);
            v.lanes = ke(v.lanes, le);
            var Ee = _m(v, _, le);
            Up(v, Ee);
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
  var Os = m.ReactCurrentOwner, Aa = !1, Om, As, Am, Mm, Lm, Ii, Vm, Wc, Ms;
  Om = {}, As = {}, Am = {}, Mm = {}, Lm = {}, Ii = !1, Vm = {}, Wc = {}, Ms = {};
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
        Ke(n)
      );
    }
    var l = n.render, s = t.ref, u, v;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, la(!0), u = Yl(e, t, l, a, s, r), v = Il(), t.mode & St) {
        Gt(!0);
        try {
          u = Yl(e, t, l, a, s, r), v = Il();
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
        return l = Zl(i), t.tag = B, t.type = l, Fm(t, i), gb(e, t, l, a, r);
      }
      {
        var s = i.propTypes;
        if (s && Da(
          s,
          a,
          // Resolved props
          "prop",
          Ke(i)
        ), n.defaultProps !== void 0) {
          var u = Ke(i) || "Unknown";
          Ms[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), Ms[u] = !0);
        }
      }
      var v = Nv(n.type, null, a, t, t.mode, r);
      return v.ref = t.ref, v.return = t, t.child = v, v;
    }
    {
      var h = n.type, x = h.propTypes;
      x && Da(
        x,
        a,
        // Resolved props
        "prop",
        Ke(h)
      );
    }
    var S = e.child, _ = Ym(e, r);
    if (!_) {
      var L = S.memoizedProps, H = n.compare;
      if (H = H !== null ? H : Jo, H(L, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var le = Qi(S, a);
    return le.ref = t.ref, le.return = t, t.child = le, le;
  }
  function gb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Se) {
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
          Ke(i)
        );
      }
    }
    if (e !== null) {
      var h = e.memoizedProps;
      if (Jo(h, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (Aa = !1, t.pendingProps = a = h, Ym(e, r))
          (e.flags & Kf) !== Ce && (Aa = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function yb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Qt)
      if ((t.mode & Ye) === xe) {
        var l = {
          baseLanes: W,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, sf(t, n);
      } else if (Wn(n, Gn)) {
        var x = {
          baseLanes: W,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = x;
        var S = i !== null ? i.baseLanes : n;
        sf(t, S);
      } else {
        var s = null, u;
        if (i !== null) {
          var v = i.baseLanes;
          u = ke(v, n);
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
      var _;
      i !== null ? (_ = ke(i.baseLanes, n), t.memoizedState = null) : _ = n, sf(t, _);
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
      t.flags |= Qe;
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
        Ke(n)
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
      if (Os.current = t, la(!0), u = Yl(e, t, n, a, l, r), v = Il(), t.mode & St) {
        Gt(!0);
        try {
          u = Yl(e, t, n, a, l, r), v = Il();
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
          t.flags |= Xe, t.flags |= _n;
          var v = new Error("Simulated error coming from DevTools"), h = Uo(r);
          t.lanes = ke(t.lanes, h);
          var x = _m(t, Yi(v, t), h);
          Up(t, x);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var S = n.propTypes;
        S && Da(
          S,
          a,
          // Resolved props
          "prop",
          Ke(n)
        );
      }
    }
    var _;
    Wa(n) ? (_ = !0, lc(t)) : _ = !1, Fl(t, r);
    var L = t.stateNode, H;
    L === null ? (Qc(e, t), ub(t, n, a), Tm(t, n, a, r), H = !0) : e === null ? H = rT(t, n, a, r) : H = iT(e, t, n, a, r);
    var le = Um(e, t, n, H, _, r);
    {
      var Ee = t.stateNode;
      H && Ee.props !== a && (Ii || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Me(t) || "a component"), Ii = !0);
    }
    return le;
  }
  function Um(e, t, n, a, r, i) {
    bb(e, t);
    var l = (t.flags & Xe) !== Ce;
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
        var h = Yi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Sb(e, t, s, n, h);
      } else if (s !== i) {
        var x = Yi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Sb(e, t, s, n, x);
      } else {
        bD(t);
        var S = gy(t, null, s, n);
        t.child = S;
        for (var _ = S; _; )
          _.flags = _.flags & ~wt | mr, _ = _.sibling;
      }
    } else {
      if (Vl(), s === i)
        return Cr(e, t, n);
      On(e, t, s, n);
    }
    return t.child;
  }
  function Sb(e, t, n, a, r) {
    return Vl(), Sp(r), t.flags |= pr, On(e, t, n, a), t.child;
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
    var v = t.tag = y1(u), h = Oa(u, r), x;
    switch (v) {
      case C:
        return Fm(t, u), t.type = u = Zl(u), x = km(null, t, u, h, a), x;
      case T:
        return t.type = u = mv(u), x = Nb(null, t, u, h, a), x;
      case q:
        return t.type = u = vv(u), x = vb(null, t, u, h, a), x;
      case I: {
        if (t.type !== t.elementType) {
          var S = u.propTypes;
          S && Da(
            S,
            h,
            // Resolved for outer only
            "prop",
            Ke(u)
          );
        }
        return x = hb(
          null,
          t,
          u,
          Oa(u.type, h),
          // The inner type can have defaults too
          a
        ), x;
      }
    }
    var _ = "";
    throw u !== null && typeof u == "object" && u.$$typeof === Se && (_ = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + _));
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
        var v = Ke(n) || "Unknown";
        Om[v] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", v, v), Om[v] = !0);
      }
      t.mode & St && ja.recordLegacyContextWarning(t, null), la(!0), Os.current = t, s = Yl(null, t, n, r, i, a), u = Il(), la(!1);
    }
    if (gl(), t.flags |= pl, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0) {
      var h = Ke(n) || "Unknown";
      As[h] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", h, h, h), As[h] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0
    ) {
      {
        var x = Ke(n) || "Unknown";
        As[x] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), As[x] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var S = !1;
      return Wa(n) ? (S = !0, lc(t)) : S = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, kp(t), sb(t, s), Tm(t, n, r, a), Um(null, t, n, !0, S, a);
    } else {
      if (t.tag = C, t.mode & St) {
        Gt(!0);
        try {
          s = Yl(null, t, n, r, i, a), u = Il();
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
        i && (r = i.fileName + ":" + i.lineNumber), Lm[r] || (Lm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Ke(t) || "Unknown";
        Ms[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Ms[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var s = Ke(t) || "Unknown";
        Mm[s] || (f("%s: Function components do not support getDerivedStateFromProps.", s), Mm[s] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Ke(t) || "Unknown";
        Am[u] || (f("%s: Function components do not support contextType.", u), Am[u] = !0);
      }
    }
  }
  var zm = {
    dehydrated: null,
    treeContext: null,
    retryLane: Wt
  };
  function Hm(e) {
    return {
      baseLanes: e,
      cachePool: fT(),
      transitions: null
    };
  }
  function ST(e, t) {
    var n = null;
    return {
      baseLanes: ke(e.baseLanes, t),
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
    return Pp(e, Ss);
  }
  function RT(e, t) {
    return wu(e.childLanes, t);
  }
  function xb(e, t, n) {
    var a = t.pendingProps;
    M1(t) && (t.flags |= Xe);
    var r = wa.current, i = !1, l = (t.flags & Xe) !== Ce;
    if (l || xT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = BD(r, _y)), r = Hl(r), Zr(t, r), e === null) {
      Ep(t);
      var s = t.memoizedState;
      if (s !== null) {
        var u = s.dehydrated;
        if (u !== null)
          return wT(t, u);
      }
      var v = a.children, h = a.fallback;
      if (i) {
        var x = CT(t, v, h, n), S = t.child;
        return S.memoizedState = Hm(n), t.memoizedState = zm, x;
      } else
        return Pm(t, v);
    } else {
      var _ = e.memoizedState;
      if (_ !== null) {
        var L = _.dehydrated;
        if (L !== null)
          return _T(e, t, l, a, L, _, n);
      }
      if (i) {
        var H = a.fallback, le = a.children, Ee = TT(e, t, le, H, n), ge = t.child, qe = e.child.memoizedState;
        return ge.memoizedState = qe === null ? Hm(n) : ST(qe, n), ge.childLanes = RT(e, n), t.memoizedState = zm, Ee;
      } else {
        var Pe = a.children, j = DT(e, t, Pe, n);
        return t.memoizedState = null, j;
      }
    }
  }
  function Pm(e, t, n) {
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
    return (r & Ye) === xe && i !== null ? (s = i, s.childLanes = W, s.pendingProps = l, e.mode & nt && (s.actualDuration = 0, s.actualStartTime = -1, s.selfBaseDuration = 0, s.treeBaseDuration = 0), u = oi(n, r, a, null)) : (s = Bm(l, r), u = oi(n, r, a, null)), s.return = e, u.return = e, s.sibling = u, e.child = s, u;
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
    if ((t.mode & Ye) === xe && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
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
      (i & Ye) === xe && // Make sure we're on the second pass, i.e. the primary child fragment was
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
    var x;
    return s !== null ? x = Qi(s, a) : (x = oi(a, i, r, null), x.flags |= wt), x.return = t, v.return = t, v.sibling = x, t.child = v, x;
  }
  function Kc(e, t, n, a) {
    a !== null && Sp(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Pm(t, i);
    return l.flags |= wt, t.memoizedState = null, l;
  }
  function jT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, s = Bm(l, i), u = oi(a, i, r, null);
    return u.flags |= wt, s.return = t, u.return = t, s.sibling = u, t.child = s, (t.mode & Ye) !== xe && kl(t, e.child, null, r), u;
  }
  function wT(e, t, n) {
    return (e.mode & Ye) === xe ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = je) : lp(t) ? e.lanes = wi : e.lanes = Gn, null;
  }
  function _T(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & pr) {
        t.flags &= ~pr;
        var j = jm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Xe, null;
        var P = a.children, w = a.fallback, X = jT(e, t, P, w, l), de = t.child;
        return de.memoizedState = Hm(l), t.memoizedState = zm, X;
      }
    else {
      if (gD(), (t.mode & Ye) === xe)
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
          var h = LC(r);
          s = h.digest, u = h.message, v = h.stack;
        }
        var x;
        u ? x = new Error(u) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var S = jm(x, s, v);
        return Kc(e, t, l, S);
      }
      var _ = Wn(l, e.childLanes);
      if (Aa || _) {
        var L = of();
        if (L !== null) {
          var H = Hx(L, l);
          if (H !== Wt && H !== i.retryLane) {
            i.retryLane = H;
            var le = ut;
            Pn(e, H), Pt(L, e, H, le);
          }
        }
        uv();
        var Ee = jm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Ee);
      } else if (Gg(r)) {
        t.flags |= Xe, t.child = e.child;
        var ge = t1.bind(null, e);
        return VC(r, ge), null;
      } else {
        ND(t, r, i.treeContext);
        var qe = a.children, Pe = Pm(t, qe);
        return Pe.flags |= mr, Pe;
      }
    }
  }
  function Cb(e, t, n) {
    e.lanes = ke(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = ke(a.lanes, t)), Ap(e.return, t, n);
  }
  function OT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === F) {
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
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Vm[e])
      if (Vm[e] = !0, typeof e == "string")
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
  function LT(e, t) {
    e !== void 0 && !Wc[e] && (e !== "collapsed" && e !== "hidden" ? (Wc[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wc[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Db(e, t) {
    {
      var n = He(e), a = !n && typeof Sa(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function VT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (He(e)) {
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
    MT(r), LT(i, r), VT(l, r), On(e, t, l, n);
    var s = wa.current, u = Pp(s, Ss);
    if (u)
      s = Bp(s, Ss), t.flags |= Xe;
    else {
      var v = e !== null && (e.flags & Xe) !== Ce;
      v && OT(t, t.child, n), s = Hl(s);
    }
    if (Zr(t, s), (t.mode & Ye) === xe)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var h = AT(t.child), x;
          h === null ? (x = t.child, t.child = null) : (x = h.sibling, h.sibling = null), $m(
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
          var S = null, _ = t.child;
          for (t.child = null; _ !== null; ) {
            var L = _.alternate;
            if (L !== null && Tc(L) === null) {
              t.child = _;
              break;
            }
            var H = _.sibling;
            _.sibling = S, S = _, _ = H;
          }
          $m(
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
  function Ls() {
    Aa = !0;
  }
  function Qc(e, t) {
    (t.mode & Ye) === xe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= wt);
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
  function Ym(e, t) {
    var n = e.lanes;
    return !!Wn(n, t);
  }
  function HT(e, t, n) {
    switch (t.tag) {
      case D:
        Eb(t), t.stateNode, Vl();
        break;
      case U:
        jy(t);
        break;
      case T: {
        var a = t.type;
        Wa(a) && lc(t);
        break;
      }
      case V:
        Fp(t, t.stateNode.containerInfo);
        break;
      case K: {
        var r = t.memoizedProps.value, i = t.type._context;
        Ny(t, i, r);
        break;
      }
      case G:
        {
          var l = Wn(n, t.childLanes);
          l && (t.flags |= Qe);
          {
            var s = t.stateNode;
            s.effectDuration = 0, s.passiveEffectDuration = 0;
          }
        }
        break;
      case F: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Zr(t, Hl(wa.current)), t.flags |= Xe, null;
          var v = t.child, h = v.childLanes;
          if (Wn(n, h))
            return xb(e, t, n);
          Zr(t, Hl(wa.current));
          var x = Cr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Zr(t, Hl(wa.current));
        break;
      }
      case k: {
        var S = (e.flags & Xe) !== Ce, _ = Wn(n, t.childLanes);
        if (S) {
          if (_)
            return Tb(e, t, n);
          t.flags |= Xe;
        }
        var L = t.memoizedState;
        if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), Zr(t, wa.current), _)
          break;
        return null;
      }
      case fe:
      case Le:
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
        var i = Ym(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Xe) === Ce)
          return Aa = !1, HT(e, t, n);
        (e.flags & Kf) !== Ce ? Aa = !0 : Aa = !1;
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
      case C: {
        var v = t.type, h = t.pendingProps, x = t.elementType === v ? h : Oa(v, h);
        return km(e, t, v, x, n);
      }
      case T: {
        var S = t.type, _ = t.pendingProps, L = t.elementType === S ? _ : Oa(S, _);
        return Nb(e, t, S, L, n);
      }
      case D:
        return hT(e, t, n);
      case U:
        return gT(e, t, n);
      case Y:
        return yT(e, t);
      case F:
        return xb(e, t, n);
      case V:
        return kT(e, t, n);
      case q: {
        var H = t.type, le = t.pendingProps, Ee = t.elementType === H ? le : Oa(H, le);
        return vb(e, t, H, Ee, n);
      }
      case oe:
        return pT(e, t, n);
      case ee:
        return mT(e, t, n);
      case G:
        return vT(e, t, n);
      case K:
        return UT(e, t, n);
      case pe:
        return FT(e, t, n);
      case I: {
        var ge = t.type, qe = t.pendingProps, Pe = Oa(ge, qe);
        if (t.type !== t.elementType) {
          var j = ge.propTypes;
          j && Da(
            j,
            Pe,
            // Resolved for outer only
            "prop",
            Ke(ge)
          );
        }
        return Pe = Oa(ge.type, Pe), hb(e, t, ge, Pe, n);
      }
      case B:
        return gb(e, t, t.type, t.pendingProps, n);
      case J: {
        var P = t.type, w = t.pendingProps, X = t.elementType === P ? w : Oa(P, w);
        return NT(e, t, P, X, n);
      }
      case k:
        return Tb(e, t, n);
      case he:
        break;
      case fe:
        return yb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= Qe;
  }
  function Ob(e) {
    e.flags |= Ri, e.flags |= Qf;
  }
  var Ab, Im, Mb, Lb;
  Ab = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === U || r.tag === Y)
        sC(e, r.stateNode);
      else if (r.tag !== V) {
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
  }, Im = function(e, t) {
  }, Mb = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, s = zp(), u = cC(l, n, i, a, r, s);
      t.updateQueue = u, u && ql(t);
    }
  }, Lb = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Vs(e, t) {
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = W, a = Ce;
    if (t) {
      if ((e.mode & nt) !== xe) {
        for (var u = e.selfBaseDuration, v = e.child; v !== null; )
          n = ke(n, ke(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, u += v.treeBaseDuration, v = v.sibling;
        e.treeBaseDuration = u;
      } else
        for (var h = e.child; h !== null; )
          n = ke(n, ke(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, h.return = e, h = h.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & nt) !== xe) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = ke(n, ke(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var s = e.child; s !== null; )
          n = ke(n, ke(s.lanes, s.childLanes)), a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function PT(e, t, n) {
    if (CD() && (t.mode & Ye) !== xe && (t.flags & Xe) === Ce)
      return fy(t), Vl(), t.flags |= pr | Su | _n, !1;
    var a = fc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (xD(t), on(t), (t.mode & nt) !== xe) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Xe) === Ce && (t.memoizedState = null), t.flags |= Qe, on(t), (t.mode & nt) !== xe) {
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
  function Vb(e, t, n) {
    var a = t.pendingProps;
    switch (gp(t), t.tag) {
      case O:
      case te:
      case B:
      case C:
      case q:
      case oe:
      case ee:
      case G:
      case pe:
      case I:
        return on(t), null;
      case T: {
        var r = t.type;
        return Wa(r) && ic(t), on(t), null;
      }
      case D: {
        var i = t.stateNode;
        if (zl(t), pp(t), Yp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = fc(t);
          if (l)
            ql(t);
          else if (e !== null) {
            var s = e.memoizedState;
            // Check if this is a client root
            (!s.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & pr) !== Ce) && (t.flags |= ml, dy());
          }
        }
        return Im(e, t), on(t), null;
      }
      case U: {
        Hp(t);
        var u = Ty(), v = t.type;
        if (e !== null && t.stateNode != null)
          Mb(e, t, v, a, u), e.ref !== t.ref && Ob(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return on(t), null;
          }
          var h = zp(), x = fc(t);
          if (x)
            ED(t, u, h) && ql(t);
          else {
            var S = oC(v, a, u, h, t);
            Ab(S, t, !1, !1), t.stateNode = S, uC(S, v, a, u) && ql(t);
          }
          t.ref !== null && Ob(t);
        }
        return on(t), null;
      }
      case Y: {
        var _ = a;
        if (e && t.stateNode != null) {
          var L = e.memoizedProps;
          Lb(e, t, L, _);
        } else {
          if (typeof _ != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var H = Ty(), le = zp(), Ee = fc(t);
          Ee ? SD(t) && ql(t) : t.stateNode = fC(_, H, le, t);
        }
        return on(t), null;
      }
      case F: {
        Pl(t);
        var ge = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var qe = PT(e, t, ge);
          if (!qe)
            return t.flags & _n ? t : null;
        }
        if ((t.flags & Xe) !== Ce)
          return t.lanes = n, (t.mode & nt) !== xe && vm(t), t;
        var Pe = ge !== null, j = e !== null && e.memoizedState !== null;
        if (Pe !== j && Pe) {
          var P = t.child;
          if (P.flags |= Ci, (t.mode & Ye) !== xe) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || Pp(wa.current, _y) ? Bj() : uv();
          }
        }
        var X = t.updateQueue;
        if (X !== null && (t.flags |= Qe), on(t), (t.mode & nt) !== xe && Pe) {
          var de = t.child;
          de !== null && (t.treeBaseDuration -= de.treeBaseDuration);
        }
        return null;
      }
      case V:
        return zl(t), Im(e, t), e === null && rD(t.stateNode.containerInfo), on(t), null;
      case K:
        var se = t.type._context;
        return Op(se, t), on(t), null;
      case J: {
        var De = t.type;
        return Wa(De) && ic(t), on(t), null;
      }
      case k: {
        Pl(t);
        var Ae = t.memoizedState;
        if (Ae === null)
          return on(t), null;
        var rt = (t.flags & Xe) !== Ce, Ge = Ae.rendering;
        if (Ge === null)
          if (rt)
            Vs(Ae, !1);
          else {
            var Rt = Yj() && (e === null || (e.flags & Xe) === Ce);
            if (!Rt)
              for (var We = t.child; We !== null; ) {
                var xt = Tc(We);
                if (xt !== null) {
                  rt = !0, t.flags |= Xe, Vs(Ae, !1);
                  var En = xt.updateQueue;
                  return En !== null && (t.updateQueue = En, t.flags |= Qe), t.subtreeFlags = Ce, AD(t, n), Zr(t, Bp(wa.current, Ss)), t.child;
                }
                We = We.sibling;
              }
            Ae.tail !== null && qt() > nN() && (t.flags |= Xe, rt = !0, Vs(Ae, !1), t.lanes = Lh);
          }
        else {
          if (!rt) {
            var dn = Tc(Ge);
            if (dn !== null) {
              t.flags |= Xe, rt = !0;
              var ea = dn.updateQueue;
              if (ea !== null && (t.updateQueue = ea, t.flags |= Qe), Vs(Ae, !0), Ae.tail === null && Ae.tailMode === "hidden" && !Ge.alternate && !rn())
                return on(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            qt() * 2 - Ae.renderingStartTime > nN() && n !== Gn && (t.flags |= Xe, rt = !0, Vs(Ae, !1), t.lanes = Lh);
          }
          if (Ae.isBackwards)
            Ge.sibling = t.child, t.child = Ge;
          else {
            var Ln = Ae.last;
            Ln !== null ? Ln.sibling = Ge : t.child = Ge, Ae.last = Ge;
          }
        }
        if (Ae.tail !== null) {
          var Vn = Ae.tail;
          Ae.rendering = Vn, Ae.tail = Vn.sibling, Ae.renderingStartTime = qt(), Vn.sibling = null;
          var Sn = wa.current;
          return rt ? Sn = Bp(Sn, Ss) : Sn = Hl(Sn), Zr(t, Sn), Vn;
        }
        return on(t), null;
      }
      case he:
        break;
      case fe:
      case Le: {
        sv(t);
        var _r = t.memoizedState, eo = _r !== null;
        if (e !== null) {
          var Xs = e.memoizedState, nr = Xs !== null;
          nr !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Qt && (t.flags |= Ci);
        }
        return !eo || (t.mode & Ye) === xe ? on(t) : Wn(tr, Gn) && (on(t), t.subtreeFlags & (wt | Qe) && (t.flags |= Ci)), null;
      }
      case Ue:
        return null;
      case _e:
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
        return r & _n ? (t.flags = r & ~_n | Xe, (t.mode & nt) !== xe && vm(t), t) : null;
      }
      case D: {
        t.stateNode, zl(t), pp(t), Yp();
        var i = t.flags;
        return (i & _n) !== Ce && (i & Xe) === Ce ? (t.flags = i & ~_n | Xe, t) : null;
      }
      case U:
        return Hp(t), null;
      case F: {
        Pl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var s = t.flags;
        return s & _n ? (t.flags = s & ~_n | Xe, (t.mode & nt) !== xe && vm(t), t) : null;
      }
      case k:
        return Pl(t), null;
      case V:
        return zl(t), null;
      case K:
        var u = t.type._context;
        return Op(u, t), null;
      case fe:
      case Le:
        return sv(t), null;
      case Ue:
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
        t.stateNode, zl(t), pp(t), Yp();
        break;
      }
      case U: {
        Hp(t);
        break;
      }
      case V:
        zl(t);
        break;
      case F:
        Pl(t);
        break;
      case k:
        Pl(t);
        break;
      case K:
        var r = t.type._context;
        Op(r, t);
        break;
      case fe:
      case Le:
        sv(t);
        break;
    }
  }
  var Ub = null;
  Ub = /* @__PURE__ */ new Set();
  var Xc = !1, sn = !1, $T = typeof WeakSet == "function" ? WeakSet : Set, me = null, Gl = null, Wl = null;
  function YT(e) {
    qf(null, function() {
      throw e;
    }), Gf();
  }
  var IT = function(e, t) {
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
      ni(Vt, e);
    } catch (n) {
      lt(e, t, n);
    }
  }
  function qm(e, t, n) {
    try {
      IT(e, n);
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
      Pb(e);
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
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
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
  var Hb = !1;
  function GT(e, t) {
    iC(e.containerInfo), me = t, WT();
    var n = Hb;
    return Hb = !1, n;
  }
  function WT() {
    for (; me !== null; ) {
      var e = me, t = e.child;
      (e.subtreeFlags & Zf) !== Ce && t !== null ? (t.return = e, me = t) : KT();
    }
  }
  function KT() {
    for (; me !== null; ) {
      var e = me;
      mt(e);
      try {
        QT(e);
      } catch (n) {
        lt(e, e.return, n);
      }
      It();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, me = t;
        return;
      }
      me = e.return;
    }
  }
  function QT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== Ce) {
      switch (mt(e), e.tag) {
        case C:
        case q:
        case B:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Ii && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Oa(e.type, a), r);
            {
              var s = Ub;
              l === void 0 && !s.has(e.type) && (s.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Me(e)));
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
        case U:
        case Y:
        case V:
        case J:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      It();
    }
  }
  function Ma(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var s = l.destroy;
          l.destroy = void 0, s !== void 0 && ((e & ln) !== Bn ? fx(t) : (e & Vt) !== Bn && wh(t), (e & Ka) !== Bn && Ws(!0), Jc(t, n, s), (e & Ka) !== Bn && Ws(!1), (e & ln) !== Bn ? dx() : (e & Vt) !== Bn && _h());
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
          (e & ln) !== Bn ? ux(t) : (e & Vt) !== Bn && px(t);
          var l = i.create;
          (e & Ka) !== Bn && Ws(!0), i.destroy = l(), (e & Ka) !== Bn && Ws(!1), (e & ln) !== Bn ? cx() : (e & Vt) !== Bn && mx();
          {
            var s = i.destroy;
            if (s !== void 0 && typeof s != "function") {
              var u = void 0;
              (i.tag & Vt) !== Ce ? u = "useLayoutEffect" : (i.tag & Ka) !== Ce ? u = "useInsertionEffect" : u = "useEffect";
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
    if ((t.flags & Qe) !== Ce)
      switch (t.tag) {
        case G: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = nb(), s = t.alternate === null ? "mount" : "update";
          tb() && (s = "nested-update"), typeof i == "function" && i(r, s, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case D:
                var v = u.stateNode;
                v.passiveEffectDuration += n;
                break e;
              case G:
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
    if ((n.flags & _o) !== Ce)
      switch (n.tag) {
        case C:
        case q:
        case B: {
          if (!sn)
            if (n.mode & nt)
              try {
                Za(), ni(Vt | Lt, n);
              } finally {
                Ja(n);
              }
            else
              ni(Vt | Lt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Qe && !sn)
            if (t === null)
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), n.mode & nt)
                try {
                  Za(), r.componentDidMount();
                } finally {
                  Ja(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Oa(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), n.mode & nt)
                try {
                  Za(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Ja(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var s = n.updateQueue;
          s !== null && (n.type === n.elementType && !Ii && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(n) || "instance")), Dy(n, s, r));
          break;
        }
        case D: {
          var u = n.updateQueue;
          if (u !== null) {
            var v = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case U:
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
        case U: {
          var h = n.stateNode;
          if (t === null && n.flags & Qe) {
            var x = n.type, S = n.memoizedProps;
            hC(h, x, S);
          }
          break;
        }
        case Y:
          break;
        case V:
          break;
        case G: {
          {
            var _ = n.memoizedProps, L = _.onCommit, H = _.onRender, le = n.stateNode.effectDuration, Ee = nb(), ge = t === null ? "mount" : "update";
            tb() && (ge = "nested-update"), typeof H == "function" && H(n.memoizedProps.id, ge, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ee);
            {
              typeof L == "function" && L(n.memoizedProps.id, ge, le, Ee), Kj(n);
              var qe = n.return;
              e: for (; qe !== null; ) {
                switch (qe.tag) {
                  case D:
                    var Pe = qe.stateNode;
                    Pe.effectDuration += le;
                    break e;
                  case G:
                    var j = qe.stateNode;
                    j.effectDuration += le;
                    break e;
                }
                qe = qe.return;
              }
            }
          }
          break;
        }
        case F: {
          lj(e, n);
          break;
        }
        case k:
        case J:
        case he:
        case fe:
        case Le:
        case _e:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    sn || n.flags & Ri && Pb(n);
  }
  function ZT(e) {
    switch (e.tag) {
      case C:
      case q:
      case B: {
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
      case U: {
        zb(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === U) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? DC(r) : jC(a.stateNode, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
        }
      } else if (a.tag === Y) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TC(i) : wC(i, a.memoizedProps);
          } catch (l) {
            lt(e, e.return, l);
          }
      } else if (!((a.tag === fe || a.tag === Le) && a.memoizedState !== null && a !== e)) {
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
  function Pb(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case U:
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
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Me(e)), t.current = a;
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === U) {
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
    return e.tag === U || e.tag === D || e.tag === V;
  }
  function Yb(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $b(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== U && t.tag !== Y && t.tag !== ne; ) {
        if (t.flags & wt || t.child === null || t.tag === V)
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
      case U: {
        var n = t.stateNode;
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Yb(e);
        Wm(e, a, n);
        break;
      }
      case D:
      case V: {
        var r = t.stateNode.containerInfo, i = Yb(e);
        Gm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gm(e, t, n) {
    var a = e.tag, r = a === U || a === Y;
    if (r) {
      var i = e.stateNode;
      t ? SC(n, i, t) : NC(n, i);
    } else if (a !== V) {
      var l = e.child;
      if (l !== null) {
        Gm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Gm(s, t, n), s = s.sibling;
      }
    }
  }
  function Wm(e, t, n) {
    var a = e.tag, r = a === U || a === Y;
    if (r) {
      var i = e.stateNode;
      t ? EC(n, i, t) : bC(n, i);
    } else if (a !== V) {
      var l = e.child;
      if (l !== null) {
        Wm(l, t, n);
        for (var s = l.sibling; s !== null; )
          Wm(s, t, n), s = s.sibling;
      }
    }
  }
  var un = null, La = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case U: {
            un = a.stateNode, La = !1;
            break e;
          }
          case D: {
            un = a.stateNode.containerInfo, La = !0;
            break e;
          }
          case V: {
            un = a.stateNode.containerInfo, La = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (un === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Ib(e, t, n), un = null, La = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Ib(e, t, a), a = a.sibling;
  }
  function Ib(e, t, n) {
    switch (ix(n), n.tag) {
      case U:
        sn || Kl(n, t);
      case Y: {
        {
          var a = un, r = La;
          un = null, ai(e, t, n), un = a, La = r, un !== null && (La ? RC(un, n.stateNode) : xC(un, n.stateNode));
        }
        return;
      }
      case ne: {
        un !== null && (La ? CC(un, n.stateNode) : ip(un, n.stateNode));
        return;
      }
      case V: {
        {
          var i = un, l = La;
          un = n.stateNode.containerInfo, La = !0, ai(e, t, n), un = i, La = l;
        }
        return;
      }
      case C:
      case q:
      case I:
      case B: {
        if (!sn) {
          var s = n.updateQueue;
          if (s !== null) {
            var u = s.lastEffect;
            if (u !== null) {
              var v = u.next, h = v;
              do {
                var x = h, S = x.destroy, _ = x.tag;
                S !== void 0 && ((_ & Ka) !== Bn ? Jc(n, t, S) : (_ & Vt) !== Bn && (wh(n), n.mode & nt ? (Za(), Jc(n, t, S), Ja(n)) : Jc(n, t, S), _h())), h = h.next;
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
          var L = n.stateNode;
          typeof L.componentWillUnmount == "function" && qm(n, t, L);
        }
        ai(e, t, n);
        return;
      }
      case he: {
        ai(e, t, n);
        return;
      }
      case fe: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ye
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
          i !== null && YC(i);
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
  function Va(e, t, n) {
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
      case C:
      case q:
      case I:
      case B: {
        if (Va(t, e), er(e), r & Qe) {
          try {
            Ma(Ka | Lt, e, e.return), ni(Ka | Lt, e);
          } catch (De) {
            lt(e, e.return, De);
          }
          if (e.mode & nt) {
            try {
              Za(), Ma(Vt | Lt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
            Ja(e);
          } else
            try {
              Ma(Vt | Lt, e, e.return);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case T: {
        Va(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        return;
      }
      case U: {
        Va(t, e), er(e), r & Ri && a !== null && Kl(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              qg(i);
            } catch (De) {
              lt(e, e.return, De);
            }
          }
          if (r & Qe) {
            var l = e.stateNode;
            if (l != null) {
              var s = e.memoizedProps, u = a !== null ? a.memoizedProps : s, v = e.type, h = e.updateQueue;
              if (e.updateQueue = null, h !== null)
                try {
                  gC(l, h, v, u, s, e);
                } catch (De) {
                  lt(e, e.return, De);
                }
            }
          }
        }
        return;
      }
      case Y: {
        if (Va(t, e), er(e), r & Qe) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, S = e.memoizedProps, _ = a !== null ? a.memoizedProps : S;
          try {
            yC(x, _, S);
          } catch (De) {
            lt(e, e.return, De);
          }
        }
        return;
      }
      case D: {
        if (Va(t, e), er(e), r & Qe && a !== null) {
          var L = a.memoizedState;
          if (L.isDehydrated)
            try {
              $C(t.containerInfo);
            } catch (De) {
              lt(e, e.return, De);
            }
        }
        return;
      }
      case V: {
        Va(t, e), er(e);
        return;
      }
      case F: {
        Va(t, e), er(e);
        var H = e.child;
        if (H.flags & Ci) {
          var le = H.stateNode, Ee = H.memoizedState, ge = Ee !== null;
          if (le.isHidden = ge, ge) {
            var qe = H.alternate !== null && H.alternate.memoizedState !== null;
            qe || Pj();
          }
        }
        if (r & Qe) {
          try {
            ij(e);
          } catch (De) {
            lt(e, e.return, De);
          }
          qb(e);
        }
        return;
      }
      case fe: {
        var Pe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ye
        ) {
          var j = sn;
          sn = j || Pe, Va(t, e), sn = j;
        } else
          Va(t, e);
        if (er(e), r & Ci) {
          var P = e.stateNode, w = e.memoizedState, X = w !== null, de = e;
          if (P.isHidden = X, X && !Pe && (de.mode & Ye) !== xe) {
            me = de;
            for (var se = de.child; se !== null; )
              me = se, uj(se), se = se.sibling;
          }
          ej(de, X);
        }
        return;
      }
      case k: {
        Va(t, e), er(e), r & Qe && qb(e);
        return;
      }
      case he:
        return;
      default: {
        Va(t, e), er(e);
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
    Gl = n, Wl = t, me = e, Wb(e, t, n), Gl = null, Wl = null;
  }
  function Wb(e, t, n) {
    for (var a = (e.mode & Ye) !== xe; me !== null; ) {
      var r = me, i = r.child;
      if (r.tag === fe && a) {
        var l = r.memoizedState !== null, s = l || Xc;
        if (s) {
          Km(e, t, n);
          continue;
        } else {
          var u = r.alternate, v = u !== null && u.memoizedState !== null, h = v || sn, x = Xc, S = sn;
          Xc = s, sn = h, sn && !S && (me = r, cj(r));
          for (var _ = i; _ !== null; )
            me = _, Wb(
              _,
              // New root; bubble back up to here and stop.
              t,
              n
            ), _ = _.sibling;
          me = r, Xc = x, sn = S, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== Ce && i !== null ? (i.return = r, me = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; me !== null; ) {
      var a = me;
      if ((a.flags & _o) !== Ce) {
        var r = a.alternate;
        mt(a);
        try {
          JT(t, r, a, n);
        } catch (l) {
          lt(a, a.return, l);
        }
        It();
      }
      if (a === e) {
        me = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, me = i;
        return;
      }
      me = a.return;
    }
  }
  function uj(e) {
    for (; me !== null; ) {
      var t = me, n = t.child;
      switch (t.tag) {
        case C:
        case q:
        case I:
        case B: {
          if (t.mode & nt)
            try {
              Za(), Ma(Vt, t, t.return);
            } finally {
              Ja(t);
            }
          else
            Ma(Vt, t, t.return);
          break;
        }
        case T: {
          Kl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && qm(t, t.return, a);
          break;
        }
        case U: {
          Kl(t, t.return);
          break;
        }
        case fe: {
          var r = t.memoizedState !== null;
          if (r) {
            Kb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, me = n) : Kb(e);
    }
  }
  function Kb(e) {
    for (; me !== null; ) {
      var t = me;
      if (t === e) {
        me = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, me = n;
        return;
      }
      me = t.return;
    }
  }
  function cj(e) {
    for (; me !== null; ) {
      var t = me, n = t.child;
      if (t.tag === fe) {
        var a = t.memoizedState !== null;
        if (a) {
          Qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, me = n) : Qb(e);
    }
  }
  function Qb(e) {
    for (; me !== null; ) {
      var t = me;
      mt(t);
      try {
        ZT(t);
      } catch (a) {
        lt(t, t.return, a);
      }
      if (It(), t === e) {
        me = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, me = n;
        return;
      }
      me = t.return;
    }
  }
  function fj(e, t, n, a) {
    me = t, dj(t, e, n, a);
  }
  function dj(e, t, n, a) {
    for (; me !== null; ) {
      var r = me, i = r.child;
      (r.subtreeFlags & vl) !== Ce && i !== null ? (i.return = r, me = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; me !== null; ) {
      var r = me;
      if ((r.flags & Fr) !== Ce) {
        mt(r);
        try {
          mj(t, r, n, a);
        } catch (l) {
          lt(r, r.return, l);
        }
        It();
      }
      if (r === e) {
        me = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, me = i;
        return;
      }
      me = r.return;
    }
  }
  function mj(e, t, n, a) {
    switch (t.tag) {
      case C:
      case q:
      case B: {
        if (t.mode & nt) {
          mm();
          try {
            ni(ln | Lt, t);
          } finally {
            pm(t);
          }
        } else
          ni(ln | Lt, t);
        break;
      }
    }
  }
  function vj(e) {
    me = e, hj();
  }
  function hj() {
    for (; me !== null; ) {
      var e = me, t = e.child;
      if ((me.flags & xi) !== Ce) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            me = r, bj(r, e);
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
          me = e;
        }
      }
      (e.subtreeFlags & vl) !== Ce && t !== null ? (t.return = e, me = t) : gj();
    }
  }
  function gj() {
    for (; me !== null; ) {
      var e = me;
      (e.flags & Fr) !== Ce && (mt(e), yj(e), It());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, me = t;
        return;
      }
      me = e.return;
    }
  }
  function yj(e) {
    switch (e.tag) {
      case C:
      case q:
      case B: {
        e.mode & nt ? (mm(), Ma(ln | Lt, e, e.return), pm(e)) : Ma(ln | Lt, e, e.return);
        break;
      }
    }
  }
  function bj(e, t) {
    for (; me !== null; ) {
      var n = me;
      mt(n), Ej(n, t), It();
      var a = n.child;
      a !== null ? (a.return = n, me = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; me !== null; ) {
      var t = me, n = t.sibling, a = t.return;
      if (Bb(t), t === e) {
        me = null;
        return;
      }
      if (n !== null) {
        n.return = a, me = n;
        return;
      }
      me = a;
    }
  }
  function Ej(e, t) {
    switch (e.tag) {
      case C:
      case q:
      case B: {
        e.mode & nt ? (mm(), Ma(ln, e, t), pm(e)) : Ma(ln, e, t);
        break;
      }
    }
  }
  function Sj(e) {
    switch (e.tag) {
      case C:
      case q:
      case B: {
        try {
          ni(Vt | Lt, e);
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
      case C:
      case q:
      case B: {
        try {
          ni(ln | Lt, e);
        } catch (t) {
          lt(e, e.return, t);
        }
        break;
      }
    }
  }
  function Rj(e) {
    switch (e.tag) {
      case C:
      case q:
      case B: {
        try {
          Ma(Vt | Lt, e, e.return);
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
      case C:
      case q:
      case B:
        try {
          Ma(ln | Lt, e, e.return);
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
  ), Dr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, Zb = 5, Jm = 6, Ie = Ft, An = null, bt = null, zt = W, tr = W, Zm = Gr(W), Ht = Dr, zs = null, ef = W, Hs = W, tf = W, Ps = null, $n = null, ev = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    tN = qt() + Oj;
  }
  function nN() {
    return tN;
  }
  var nf = !1, tv = null, Ql = null, Gi = !1, ri = null, $s = W, nv = [], av = null, Aj = 50, Ys = 0, rv = null, iv = !1, af = !1, Mj = 50, Xl = 0, rf = null, Is = ut, lf = W, aN = !1;
  function of() {
    return An;
  }
  function Mn() {
    return (Ie & (fn | da)) !== Ft ? qt() : (Is !== ut || (Is = qt()), Is);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Ye) === xe)
      return je;
    if ((Ie & fn) !== Ft && zt !== W)
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
  function Lj(e) {
    var t = e.mode;
    return (t & Ye) === xe ? je : kx();
  }
  function Pt(e, t, n, a) {
    r1(), aN && f("useInsertionEffect must not schedule updates."), iv && (af = !0), Fo(e, n, a), (Ie & fn) !== W && e === An ? o1(t) : (Ra && Ph(e, t, n), s1(t), e === An && ((Ie & fn) === Ft && (Hs = ke(Hs, n)), Ht === Fs && li(e, zt)), Yn(e, a), n === je && Ie === Ft && (t.mode & Ye) === xe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !ka.isBatchingLegacy && (Bs(), ay()));
  }
  function Vj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Yn(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ie & fn) !== Ft
    );
  }
  function Yn(e, t) {
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
      n == null && i !== je && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && bN(n);
    var l;
    if (r === je)
      e.tag === Wr ? (ka.isBatchingLegacy !== null && (ka.didScheduleLegacyUpdate = !0), cD(lN.bind(null, e))) : ny(lN.bind(null, e)), ka.current !== null ? ka.current.push(Kr) : mC(function() {
        (Ie & (fn | da)) === Ft && Kr();
      }), l = null;
    else {
      var s;
      switch (Yh(a)) {
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
    if (eT(), Is = ut, lf = W, (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = wr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Tu(e, e === An ? zt : W);
    if (r === W)
      return null;
    var i = !ju(e, r) && !Vx(e, r) && !t, l = i ? qj(e, r) : uf(e, r);
    if (l !== Dr) {
      if (l === qi) {
        var s = Rd(e);
        s !== W && (r = s, l = lv(e, s));
      }
      if (l === Us) {
        var u = zs;
        throw Wi(e, W), li(e, r), Yn(e, qt()), u;
      }
      if (l === Jm)
        li(e, r);
      else {
        var v = !ju(e, r), h = e.current.alternate;
        if (v && !Fj(h)) {
          if (l = uf(e, r), l === qi) {
            var x = Rd(e);
            x !== W && (r = x, l = lv(e, x));
          }
          if (l === Us) {
            var S = zs;
            throw Wi(e, W), li(e, r), Yn(e, qt()), S;
          }
        }
        e.finishedWork = h, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Yn(e, qt()), e.callbackNode === n ? rN.bind(null, e) : null;
  }
  function lv(e, t) {
    var n = Ps;
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
              Mn(), Hh(e, i);
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
        if (li(e, n), Lx(n))
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
    t = wu(t, tf), t = wu(t, Hs), Fx(e, t);
  }
  function lN(e) {
    if (tT(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    wr();
    var t = Tu(e, W);
    if (!Wn(t, je))
      return Yn(e, qt()), null;
    var n = uf(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rd(e);
      a !== W && (t = a, n = lv(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, W), li(e, t), Yn(e, qt()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, $n, Tr), Yn(e, qt()), null;
  }
  function zj(e, t) {
    t !== W && (jd(e, ke(t, je)), Yn(e, qt()), (Ie & (fn | da)) === Ft && (Bs(), Kr()));
  }
  function ov(e, t) {
    var n = Ie;
    Ie |= Jb;
    try {
      return e(t);
    } finally {
      Ie = n, Ie === Ft && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ka.isBatchingLegacy && (Bs(), ay());
    }
  }
  function Hj(e, t, n, a, r) {
    var i = Ca(), l = cn.transition;
    try {
      return cn.transition = null, Kt(Kn), e(t, n, a, r);
    } finally {
      Kt(i), cn.transition = l, Ie === Ft && Bs();
    }
  }
  function jr(e) {
    ri !== null && ri.tag === Wr && (Ie & (fn | da)) === Ft && wr();
    var t = Ie;
    Ie |= Jb;
    var n = cn.transition, a = Ca();
    try {
      return cn.transition = null, Kt(Kn), e ? e() : void 0;
    } finally {
      Kt(a), cn.transition = n, Ie = t, (Ie & (fn | da)) === Ft && Kr();
    }
  }
  function oN() {
    return (Ie & (fn | da)) !== Ft;
  }
  function sf(e, t) {
    bn(Zm, tr, e), tr = ke(tr, t);
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
    return bt = i, zt = tr = t, Ht = Dr, zs = null, ef = W, Hs = W, tf = W, Ps = null, $n = null, VD(), ja.discardPendingWarnings(), i;
  }
  function sN(e, t) {
    do {
      var n = bt;
      try {
        if (gc(), Ay(), It(), Xm.current = null, n === null || n.return === null) {
          Ht = Us, zs = t, bt = null;
          return;
        }
        if (Xt && n.mode & nt && qc(n, !0), In)
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
    return Qm.current = Pc, e === null ? Pc : e;
  }
  function cN(e) {
    Qm.current = e;
  }
  function Pj() {
    ev = qt();
  }
  function qs(e) {
    ef = ke(e, ef);
  }
  function Bj() {
    Ht === Dr && (Ht = Zc);
  }
  function uv() {
    (Ht === Dr || Ht === Zc || Ht === qi) && (Ht = Fs), An !== null && (Cd(ef) || Cd(Hs)) && li(An, zt);
  }
  function $j(e) {
    Ht !== Fs && (Ht = qi), Ps === null ? Ps = [e] : Ps.push(e);
  }
  function Yj() {
    return Ht === Dr;
  }
  function uf(e, t) {
    var n = Ie;
    Ie |= fn;
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
        Ij();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    if (gc(), Ie = n, cN(a), bt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Ah(), An = null, zt = W, Ht;
  }
  function Ij() {
    for (; bt !== null; )
      fN(bt);
  }
  function qj(e, t) {
    var n = Ie;
    Ie |= fn;
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
    return gc(), cN(a), Ie = n, bt !== null ? (Ex(), Dr) : (Ah(), An = null, zt = W, Ht);
  }
  function Gj() {
    for (; bt !== null && !KS(); )
      fN(bt);
  }
  function fN(e) {
    var t = e.alternate;
    mt(e);
    var n;
    (e.mode & nt) !== xe ? (dm(e), n = cv(t, e, tr), qc(e, !0)) : n = cv(t, e, tr), It(), e.memoizedProps = e.pendingProps, n === null ? dN(e) : bt = n, Xm.current = null;
  }
  function dN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Su) === Ce) {
        mt(t);
        var r = void 0;
        if ((t.mode & nt) === xe ? r = Vb(n, t, tr) : (dm(t), r = Vb(n, t, tr), qc(t, !1)), It(), r !== null) {
          bt = r;
          return;
        }
      } else {
        var i = BT(n, t);
        if (i !== null) {
          i.flags &= $S, bt = i;
          return;
        }
        if ((t.mode & nt) !== xe) {
          qc(t, !1);
          for (var l = t.actualDuration, s = t.child; s !== null; )
            l += s.actualDuration, s = s.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Su, a.subtreeFlags = Ce, a.deletions = null;
        else {
          Ht = Jm, bt = null;
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
    Ht === Dr && (Ht = Zb);
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
    if (i1(), (Ie & (fn | da)) !== Ft)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sx(i), r === null)
      return jh(), null;
    if (i === W && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = W, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Wt;
    var l = ke(r.lanes, r.childLanes);
    zx(e, l), e === An && (An = null, bt = null, zt = W), ((r.subtreeFlags & vl) !== Ce || (r.flags & vl) !== Ce) && (Gi || (Gi = !0, av = n, pv(ji, function() {
      return wr(), null;
    })));
    var s = (r.subtreeFlags & (Zf | ed | _o | vl)) !== Ce, u = (r.flags & (Zf | ed | _o | vl)) !== Ce;
    if (s || u) {
      var v = cn.transition;
      cn.transition = null;
      var h = Ca();
      Kt(Kn);
      var x = Ie;
      Ie |= da, Xm.current = null, GT(e, r), ab(), oj(e, r, i), lC(e.containerInfo), e.current = r, gx(i), sj(r, e, i), yx(), QS(), Ie = x, Kt(h), cn.transition = v;
    } else
      e.current = r, ab();
    var S = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Xl = 0, rf = null), l = e.pendingLanes, l === W && (Ql = null), S || hN(e.current, !1), ax(r.stateNode, a), Ra && e.memoizedUpdaters.clear(), Tj(), Yn(e, qt()), t !== null)
      for (var _ = e.onRecoverableError, L = 0; L < t.length; L++) {
        var H = t[L], le = H.stack, Ee = H.digest;
        _(H.value, {
          componentStack: le,
          digest: Ee
        });
      }
    if (nf) {
      nf = !1;
      var ge = tv;
      throw tv = null, ge;
    }
    return Wn($s, je) && e.tag !== Wr && wr(), l = e.pendingLanes, Wn(l, je) ? (ZD(), e === rv ? Ys++ : (Ys = 0, rv = e)) : Ys = 0, Kr(), jh(), null;
  }
  function wr() {
    if (ri !== null) {
      var e = Yh($s), t = $x(yr, e), n = cn.transition, a = Ca();
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
    if (ri = null, $s = W, (Ie & (fn | da)) !== Ft)
      throw new Error("Cannot flush passive effects while already rendering.");
    iv = !0, af = !1, bx(n);
    var a = Ie;
    Ie |= da, vj(t.current), fj(t, t.current, n, e);
    {
      var r = nv;
      nv = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        XT(t, l);
      }
    }
    Nx(), hN(t.current, !0), Ie = a, Kr(), af ? t === rf ? Xl++ : (Xl = 0, rf = t) : Xl = 0, iv = !1, af = !1, rx(t);
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
    var a = Yi(n, t), r = fb(e, a, je), i = Xr(e, r, je), l = Mn();
    i !== null && (Fo(i, je, l), Yn(i, l));
  }
  function lt(e, t, n) {
    if (YT(n), Ws(!1), e.tag === D) {
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
          var l = Yi(n, e), s = _m(a, l, je), u = Xr(a, s, je), v = Mn();
          u !== null && (Fo(u, je, v), Yn(u, v));
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
    Hh(e, n), u1(e), An === e && El(zt, n) && (Ht === Fs || Ht === Zc && kh(zt) && qt() - ev < eN ? Wi(e, W) : tf = ke(tf, n)), Yn(e, r);
  }
  function vN(e, t) {
    t === Wt && (t = Lj(e));
    var n = Mn(), a = Pn(e, t);
    a !== null && (Fo(a, t, n), Yn(a, n));
  }
  function t1(e) {
    var t = e.memoizedState, n = Wt;
    t !== null && (n = t.retryLane), vN(e, n);
  }
  function n1(e, t) {
    var n = Wt, a;
    switch (e.tag) {
      case F:
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
    if (Ys > Aj)
      throw Ys = 0, rv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > Mj && (Xl = 0, rf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function i1() {
    ja.flushLegacyContextWarning(), ja.flushPendingUnsafeLifecycleWarnings();
  }
  function hN(e, t) {
    mt(e), cf(e, zr, Rj), t && cf(e, Jf, Cj), cf(e, zr, Sj), t && cf(e, Jf, xj), It();
  }
  function cf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ce ? a = a.child : ((a.flags & t) !== Ce && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var ff = null;
  function gN(e) {
    {
      if ((Ie & fn) !== Ft || !(e.mode & Ye))
        return;
      var t = e.tag;
      if (t !== O && t !== D && t !== T && t !== C && t !== q && t !== I && t !== B)
        return;
      var n = Me(e) || "ReactComponent";
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
        a ? mt(e) : It();
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
        if (gc(), Ay(), kb(e, t), CN(t, a), t.mode & nt && dm(t), qf(null, _b, null, e, t, n), HS()) {
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
        case C:
        case q:
        case B: {
          var t = bt && Me(bt) || "Unknown", n = t;
          if (!fv.has(n)) {
            fv.add(n);
            var a = Me(e) || "Unknown";
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
        Ph(e, a, t);
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
      if (e.mode & Ye) {
        if (!Xb())
          return;
      } else if (!wj() || Ie !== Ft || e.tag !== C && e.tag !== q && e.tag !== B)
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

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Me(e));
        } finally {
          t ? mt(e) : It();
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
        case C: {
          (typeof a == "function" || i === Se) && (r = !0);
          break;
        }
        case q: {
          (i === Ne || i === Se) && (r = !0);
          break;
        }
        case I:
        case B: {
          (i === Ve || i === Se) && (r = !0);
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
        case C:
        case B:
        case T:
          u = s;
          break;
        case q:
          u = s.render;
          break;
      }
      if (pa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var v = !1, h = !1;
      if (u !== null) {
        var x = pa(u);
        x !== void 0 && (n.has(x) ? h = !0 : t.has(x) && (l === T ? h = !0 : v = !0));
      }
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (h = !0), h && (e._debugNeedsRemount = !0), h || v) {
        var S = Pn(e, je);
        S !== null && Pt(S, e, je, ut);
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
        case C:
        case B:
        case T:
          s = l;
          break;
        case q:
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
          case U:
            t.add(a.stateNode);
            return;
          case V:
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
      if (n.tag === U)
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
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ce, this.subtreeFlags = Ce, this.deletions = null, this.lanes = W, this.childLanes = W, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !yv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
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
      return bv(e) ? T : C;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ne)
        return q;
      if (t === Ve)
        return I;
    }
    return O;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = Zn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ce, n.subtreeFlags = Ce, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case O:
      case C:
      case B:
        n.type = Zl(e.type);
        break;
      case T:
        n.type = mv(e.type);
        break;
      case q:
        n.type = vv(e.type);
        break;
    }
    return n;
  }
  function b1(e, t) {
    e.flags &= vr | wt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = W, e.lanes = t, e.child = null, e.subtreeFlags = Ce, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
  function N1(e, t, n) {
    var a;
    return e === oc ? (a = Ye, t === !0 && (a |= St, a |= Ia)) : a = xe, Ra && (a |= nt), Zn(D, null, null, a);
  }
  function Nv(e, t, n, a, r, i) {
    var l = O, s = e;
    if (typeof e == "function")
      bv(e) ? (l = T, s = mv(s)) : s = Zl(s);
    else if (typeof e == "string")
      l = U;
    else
      e: switch (e) {
        case Pa:
          return oi(n.children, r, i, t);
        case pi:
          l = ee, r |= St, (r & Ye) !== xe && (r |= Ia);
          break;
        case N:
          return E1(n, r, i, t);
        case Be:
          return S1(n, r, i, t);
        case Te:
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
              case Q:
                l = K;
                break e;
              case ie:
                l = pe;
                break e;
              case Ne:
                l = q, s = vv(s);
                break e;
              case Ve:
                l = I;
                break e;
              case Se:
                l = te, s = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var v = a ? Me(a) : null;
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
    var r = Zn(oe, e, a, t);
    return r.lanes = n, r;
  }
  function E1(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Zn(G, e, a, t | nt);
    return r.elementType = N, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function S1(e, t, n, a) {
    var r = Zn(F, e, a, t);
    return r.elementType = Be, r.lanes = n, r;
  }
  function x1(e, t, n, a) {
    var r = Zn(k, e, a, t);
    return r.elementType = Te, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = Zn(fe, e, a, t);
    r.elementType = dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Sv(e, t, n) {
    var a = Zn(Y, e, null, t);
    return a.lanes = n, a;
  }
  function R1() {
    var e = Zn(U, null, null, xe);
    return e.elementType = "DELETED", e;
  }
  function C1(e) {
    var t = Zn(ne, null, null, xe);
    return t.stateNode = e, t;
  }
  function xv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Zn(V, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = Zn(O, null, null, xe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
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
    var h = new D1(e, t, n, s, u), x = N1(t, i);
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
    return kp(x), h;
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
        var i = Me(n) || "Component";
        if (!Dv[i]) {
          Dv[i] = !0;
          var l = Tn;
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
  function jN(e, t, n, a, r, i, l, s) {
    var u = !1, v = null;
    return DN(e, t, u, v, n, a, r, i, l);
  }
  function wN(e, t, n, a, r, i, l, s, u, v) {
    var h = !0, x = DN(n, a, h, e, r, i, l, s, u);
    x.context = TN(null);
    var S = x.current, _ = Mn(), L = ii(S), H = Rr(_, L);
    return H.callback = t ?? null, Xr(S, H, L), Vj(x, L, _), x;
  }
  function Ks(e, t, n, a) {
    nx(t, e);
    var r = t.current, i = Mn(), l = ii(r);
    Sx(l);
    var s = TN(n);
    t.context === null ? t.context = s : t.pendingContext = s, bi && Tn !== null && !Cv && (Cv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Me(Tn) || "Unknown"));
    var u = Rr(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var v = Xr(r, u, l);
    return v !== null && (Pt(v, r, l, i), Sc(v, r, l)), l;
  }
  function df(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case U:
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
      case F: {
        jr(function() {
          var r = Pn(e, je);
          if (r !== null) {
            var i = Mn();
            Pt(r, e, je, i);
          }
        });
        var a = je;
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
    if (e.tag === F) {
      var t = Lo, n = Pn(e, t);
      if (n !== null) {
        var a = Mn();
        Pt(n, e, t, a);
      }
      Tv(e, t);
    }
  }
  function O1(e) {
    if (e.tag === F) {
      var t = ii(e), n = Pn(e, t);
      if (n !== null) {
        var a = Mn();
        Pt(n, e, t, a);
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
  var LN = null, VN = null, kN = null, UN = null, FN = null, zN = null, HN = null, PN = null, BN = null;
  {
    var $N = function(e, t, n) {
      var a = t[n], r = He(e) ? e.slice() : ze({}, e);
      return n + 1 === t.length ? (He(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = $N(e[a], t, n + 1), r);
    }, YN = function(e, t) {
      return $N(e, t, 0);
    }, IN = function(e, t, n, a) {
      var r = t[a], i = He(e) ? e.slice() : ze({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], He(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = IN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, qN = function(e, t, n) {
      if (t.length !== n.length) {
        E("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            E("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return IN(e, t, n, 0);
    }, GN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = He(e) ? e.slice() : ze({}, e);
      return i[r] = GN(e[r], t, n + 1, a), i;
    }, WN = function(e, t, n) {
      return GN(e, t, 0, n);
    }, jv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    LN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = WN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, je);
        l !== null && Pt(l, e, je, ut);
      }
    }, VN = function(e, t, n) {
      var a = jv(e, t);
      if (a !== null) {
        var r = YN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = ze({}, e.memoizedProps);
        var i = Pn(e, je);
        i !== null && Pt(i, e, je, ut);
      }
    }, kN = function(e, t, n, a) {
      var r = jv(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = ze({}, e.memoizedProps);
        var l = Pn(e, je);
        l !== null && Pt(l, e, je, ut);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, je);
      a !== null && Pt(a, e, je, ut);
    }, FN = function(e, t) {
      e.pendingProps = YN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Pn(e, je);
      n !== null && Pt(n, e, je, ut);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Pn(e, je);
      a !== null && Pt(a, e, je, ut);
    }, HN = function(e) {
      var t = Pn(e, je);
      t !== null && Pt(t, e, je, ut);
    }, PN = function(e) {
      AN = e;
    }, BN = function(e) {
      MN = e;
    };
  }
  function L1(e) {
    var t = Rh(e);
    return t === null ? null : t.stateNode;
  }
  function V1(e) {
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
      overrideHookState: LN,
      overrideHookStateDeletePath: VN,
      overrideHookStateRenamePath: kN,
      overrideProps: UN,
      overridePropsDeletePath: FN,
      overridePropsRenamePath: zN,
      setErrorHandler: PN,
      setSuspenseHandler: BN,
      scheduleUpdate: HN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: L1,
      findFiberByHostInstance: t || V1,
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
    t != null && (t.hydrate ? E("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ia && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

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
    e && eR(e);
  }
  pf.prototype.unstable_scheduleHydration = z1;
  function H1(e, t, n) {
    if (!mf(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    QN(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, s = "", u = KN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var v = wN(t, null, e, oc, a, i, l, s, u);
    if (ec(v.current, e), ts(e), r)
      for (var h = 0; h < r.length; h++) {
        var x = r[h];
        YD(v, x);
      }
    return new pf(v);
  }
  function mf(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Vf));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === zn || e.nodeType === dr || e.nodeType === Vf || e.nodeType === jt && e.nodeValue === " react-mount-point-unstable "));
  }
  function QN(e) {
    e.nodeType === zn && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ds(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var P1 = m.ReactCurrentOwner, XN;
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
          var S = df(l);
          i.call(S);
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
          var S = df(h);
          v.call(S);
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
      var x = e.nodeType === jt ? e.parentNode : e;
      return ts(x), jr(function() {
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
  function Y1(e) {
    {
      ZN || (ZN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = P1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ke(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === zn ? e : j1(e, "findDOMNode");
  }
  function I1(e, t, n) {
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
    if (e == null || !PS(e))
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
  Yx(w1), qx(_1), Gx(O1), Wx(Ca), Kx(Px), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _S(Q0), MS(ov, Hj, jr);
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
    return Ov.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), H1(e, t, n);
  }
  function Z1(e) {
    return oN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), jr(e);
  }
  var ew = U1({
    findFiberByHostInstance: Vi,
    bundleType: 1,
    version: Rv,
    rendererPackageName: "react-dom"
  });
  if (!ew && tn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var tE = window.location.protocol;
    /^(https?|file):$/.test(tE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ov, ta.createPortal = K1, ta.createRoot = X1, ta.findDOMNode = Y1, ta.flushSync = Z1, ta.hydrate = I1, ta.hydrateRoot = J1, ta.render = q1, ta.unmountComponentAtNode = W1, ta.unstable_batchedUpdates = ov, ta.unstable_renderSubtreeIntoContainer = Q1, ta.version = Rv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
      pathname: E,
      search: f,
      hash: A
    } = g.location;
    return Vv(
      "",
      {
        pathname: E,
        search: f,
        hash: A
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
function Vv(o, p, m, g) {
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
    v5Compat: E = !1
  } = g, f = y.history, A = si.Pop, C = null, T = O();
  T == null && (T = 0, f.replaceState(Js({}, f.state, {
    idx: T
  }), ""));
  function O() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function D() {
    A = si.Pop;
    let ee = O(), pe = ee == null ? null : ee - T;
    T = ee, C && C({
      action: A,
      location: oe.location,
      delta: pe
    });
  }
  function V(ee, pe) {
    A = si.Push;
    let K = Vv(oe.location, ee, pe);
    T = O() + 1;
    let q = iE(K, T), G = oe.createHref(K);
    try {
      f.pushState(q, "", G);
    } catch (F) {
      if (F instanceof DOMException && F.name === "DataCloneError")
        throw F;
      y.location.assign(G);
    }
    E && C && C({
      action: A,
      location: oe.location,
      delta: 1
    });
  }
  function U(ee, pe) {
    A = si.Replace;
    let K = Vv(oe.location, ee, pe);
    T = O();
    let q = iE(K, T), G = oe.createHref(K);
    f.replaceState(q, "", G), E && C && C({
      action: A,
      location: oe.location,
      delta: 0
    });
  }
  function Y(ee) {
    let pe = y.location.origin !== "null" ? y.location.origin : y.location.href, K = typeof ee == "string" ? ee : Zs(ee);
    return K = K.replace(/ $/, "%20"), ht(pe, "No window.location.(origin|href) available to create URL for href: " + K), new URL(K, pe);
  }
  let oe = {
    get action() {
      return A;
    },
    get location() {
      return o(y, f);
    },
    listen(ee) {
      if (C)
        throw new Error("A history only accepts one active listener");
      return y.addEventListener(rE, D), C = ee, () => {
        y.removeEventListener(rE, D), C = null;
      };
    },
    createHref(ee) {
      return p(y, ee);
    },
    createURL: Y,
    encodeLocation(ee) {
      let pe = Y(ee);
      return {
        pathname: pe.pathname,
        search: pe.search,
        hash: pe.hash
      };
    },
    push: V,
    replace: U,
    go(ee) {
      return f.go(ee);
    }
  };
  return oe;
}
var lE;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(lE || (lE = {}));
function pw(o, p, m) {
  return m === void 0 && (m = "/"), mw(o, p, m);
}
function mw(o, p, m, g) {
  let y = typeof p == "string" ? ao(p) : p, E = ci(y.pathname || "/", m);
  if (E == null)
    return null;
  let f = xE(o);
  vw(f);
  let A = null;
  for (let C = 0; A == null && C < f.length; ++C) {
    let T = Dw(E);
    A = Rw(f[C], T);
  }
  return A;
}
function xE(o, p, m, g) {
  p === void 0 && (p = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let y = (E, f, A) => {
    let C = {
      relativePath: A === void 0 ? E.path || "" : A,
      caseSensitive: E.caseSensitive === !0,
      childrenIndex: f,
      route: E
    };
    C.relativePath.startsWith("/") && (ht(C.relativePath.startsWith(g), 'Absolute route path "' + C.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), C.relativePath = C.relativePath.slice(g.length));
    let T = Ar([g, C.relativePath]), O = m.concat(C);
    E.children && E.children.length > 0 && (ht(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      E.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), xE(E.children, p, O, T)), !(E.path == null && !E.index) && p.push({
      path: T,
      score: Sw(T, E.index),
      routesMeta: O
    });
  };
  return o.forEach((E, f) => {
    var A;
    if (E.path === "" || !((A = E.path) != null && A.includes("?")))
      y(E, f);
    else
      for (let C of RE(E.path))
        y(E, f, C);
  }), p;
}
function RE(o) {
  let p = o.split("/");
  if (p.length === 0) return [];
  let [m, ...g] = p, y = m.endsWith("?"), E = m.replace(/\?$/, "");
  if (g.length === 0)
    return y ? [E, ""] : [E];
  let f = RE(g.join("/")), A = [];
  return A.push(...f.map((C) => C === "" ? E : [E, C].join("/"))), y && A.push(...f), A.map((C) => o.startsWith("/") && C === "" ? "/" : C);
}
function vw(o) {
  o.sort((p, m) => p.score !== m.score ? m.score - p.score : xw(p.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const hw = /^:[\w-]+$/, gw = 3, yw = 2, bw = 1, Nw = 10, Ew = -2, oE = (o) => o === "*";
function Sw(o, p) {
  let m = o.split("/"), g = m.length;
  return m.some(oE) && (g += Ew), p && (g += yw), m.filter((y) => !oE(y)).reduce((y, E) => y + (hw.test(E) ? gw : E === "" ? bw : Nw), g);
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
  } = o, y = {}, E = "/", f = [];
  for (let A = 0; A < g.length; ++A) {
    let C = g[A], T = A === g.length - 1, O = E === "/" ? p : p.slice(E.length) || "/", D = kv({
      path: C.relativePath,
      caseSensitive: C.caseSensitive,
      end: T
    }, O), V = C.route;
    if (!D)
      return null;
    Object.assign(y, D.params), f.push({
      // TODO: Can this as be avoided?
      params: y,
      pathname: Ar([E, D.pathname]),
      pathnameBase: _w(Ar([E, D.pathnameBase])),
      route: V
    }), D.pathnameBase !== "/" && (E = Ar([E, D.pathnameBase]));
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
  let E = y[0], f = E.replace(/(.)\/+$/, "$1"), A = y.slice(1);
  return {
    params: g.reduce((T, O, D) => {
      let {
        paramName: V,
        isOptional: U
      } = O;
      if (V === "*") {
        let oe = A[D] || "";
        f = E.slice(0, E.length - oe.length).replace(/(.)\/+$/, "$1");
      }
      const Y = A[D];
      return U && !Y ? T[V] = void 0 : T[V] = (Y || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: E,
    pathnameBase: f,
    pattern: o
  };
}
function Cw(o, p, m) {
  p === void 0 && (p = !1), m === void 0 && (m = !0), Ua(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], y = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, A, C) => (g.push({
    paramName: A,
    isOptional: C != null
  }), C ? "/?([^\\/]+)?" : "/([^\\/]+)"));
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
function Hv(o, p) {
  let m = ww(o);
  return p ? m.map((g, y) => y === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Pv(o, p, m, g) {
  g === void 0 && (g = !1);
  let y;
  typeof o == "string" ? y = ao(o) : (y = Js({}, o), ht(!y.pathname || !y.pathname.includes("?"), Av("?", "pathname", "search", y)), ht(!y.pathname || !y.pathname.includes("#"), Av("#", "pathname", "hash", y)), ht(!y.search || !y.search.includes("#"), Av("#", "search", "hash", y)));
  let E = o === "" || y.pathname === "", f = E ? "/" : y.pathname, A;
  if (f == null)
    A = m;
  else {
    let D = p.length - 1;
    if (!g && f.startsWith("..")) {
      let V = f.split("/");
      for (; V[0] === ".."; )
        V.shift(), D -= 1;
      y.pathname = V.join("/");
    }
    A = D >= 0 ? p[D] : "/";
  }
  let C = Tw(y, A), T = f && f !== "/" && f.endsWith("/"), O = (E || f === ".") && m.endsWith("/");
  return !C.pathname.endsWith("/") && (T || O) && (C.pathname += "/"), C;
}
const Ar = (o) => o.join("/").replace(/\/\/+/g, "/"), _w = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Ow = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Aw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Mw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const CE = ["post", "put", "patch", "delete"];
new Set(CE);
const Lw = ["get", ...CE];
new Set(Lw);
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
const nu = /* @__PURE__ */ R.createContext(null);
nu.displayName = "DataRouter";
const Bv = /* @__PURE__ */ R.createContext(null);
Bv.displayName = "DataRouterState";
const Vw = /* @__PURE__ */ R.createContext(null);
Vw.displayName = "Await";
const va = /* @__PURE__ */ R.createContext(null);
va.displayName = "Navigation";
const au = /* @__PURE__ */ R.createContext(null);
au.displayName = "Location";
const za = /* @__PURE__ */ R.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
za.displayName = "Route";
const $v = /* @__PURE__ */ R.createContext(null);
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
  } = R.useContext(va), {
    hash: E,
    pathname: f,
    search: A
  } = ru(o, {
    relative: m
  }), C = f;
  return g !== "/" && (C = f === "/" ? g : Ar([g, f])), y.createHref({
    pathname: C,
    search: A,
    hash: E
  });
}
function ro() {
  return R.useContext(au) != null;
}
function Xi() {
  return ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), R.useContext(au).location;
}
const DE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function TE(o) {
  R.useContext(va).static || R.useLayoutEffect(o);
}
function Yv() {
  let {
    isDataRoute: o
  } = R.useContext(za);
  return o ? Xw() : Uw();
}
function Uw() {
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = R.useContext(nu), {
    basename: p,
    future: m,
    navigator: g
  } = R.useContext(va), {
    matches: y
  } = R.useContext(za), {
    pathname: E
  } = Xi(), f = JSON.stringify(Hv(y, m.v7_relativeSplatPath)), A = R.useRef(!1);
  return TE(() => {
    A.current = !0;
  }), R.useCallback(function(T, O) {
    if (O === void 0 && (O = {}), Ua(A.current, DE), !A.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let D = Pv(T, JSON.parse(f), E, O.relative === "path");
    o == null && p !== "/" && (D.pathname = D.pathname === "/" ? p : Ar([p, D.pathname])), (O.replace ? g.replace : g.push)(D, O.state, O);
  }, [p, g, f, E, o]);
}
function Fw() {
  let {
    matches: o
  } = R.useContext(za), p = o[o.length - 1];
  return p ? p.params : {};
}
function ru(o, p) {
  let {
    relative: m
  } = p === void 0 ? {} : p, {
    future: g
  } = R.useContext(va), {
    matches: y
  } = R.useContext(za), {
    pathname: E
  } = Xi(), f = JSON.stringify(Hv(y, g.v7_relativeSplatPath));
  return R.useMemo(() => Pv(o, JSON.parse(f), E, m === "path"), [o, f, E, m]);
}
function zw(o, p) {
  return Hw(o, p);
}
function Hw(o, p, m, g) {
  ro() || ht(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: y
  } = R.useContext(va), {
    matches: E
  } = R.useContext(za), f = E[E.length - 1], A = f ? f.params : {}, C = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", O = f && f.route;
  {
    let K = O && O.path || "";
    wE(C, !O || K.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + C + '" (under <Route path="' + K + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + K + '"> to <Route ') + ('path="' + (K === "/" ? "*" : K + "/*") + '">.'));
  }
  let D = Xi(), V;
  if (p) {
    var U;
    let K = typeof p == "string" ? ao(p) : p;
    T === "/" || (U = K.pathname) != null && U.startsWith(T) || ht(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + K.pathname + '" was given in the `location` prop.')), V = K;
  } else
    V = D;
  let Y = V.pathname || "/", oe = Y;
  if (T !== "/") {
    let K = T.replace(/^\//, "").split("/");
    oe = "/" + Y.replace(/^\//, "").split("/").slice(K.length).join("/");
  }
  let ee = pw(o, {
    pathname: oe
  });
  Ua(O || ee != null, 'No routes matched location "' + V.pathname + V.search + V.hash + '" '), Ua(ee == null || ee[ee.length - 1].route.element !== void 0 || ee[ee.length - 1].route.Component !== void 0 || ee[ee.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + V.pathname + V.search + V.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let pe = Iw(ee && ee.map((K) => Object.assign({}, K, {
    params: Object.assign({}, A, K.params),
    pathname: Ar([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(K.pathname).pathname : K.pathname
    ]),
    pathnameBase: K.pathnameBase === "/" ? T : Ar([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      y.encodeLocation ? y.encodeLocation(K.pathnameBase).pathname : K.pathnameBase
    ])
  })), E, m, g);
  return p && pe ? /* @__PURE__ */ R.createElement(au.Provider, {
    value: {
      location: eu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, V),
      navigationType: si.Pop
    }
  }, pe) : pe;
}
function Pw() {
  let o = Qw(), p = Mw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", y = {
    padding: "0.5rem",
    backgroundColor: g
  }, E = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), f = /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ R.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ R.createElement("code", {
    style: E
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ R.createElement("code", {
    style: E
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ R.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, p), m ? /* @__PURE__ */ R.createElement("pre", {
    style: y
  }, m) : null, f);
}
const Bw = /* @__PURE__ */ R.createElement(Pw, null);
class $w extends R.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ R.createElement(za.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ R.createElement($v.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Yw(o) {
  let {
    routeContext: p,
    match: m,
    children: g
  } = o, y = R.useContext(nu);
  return y && y.static && y.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (y.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ R.createElement(za.Provider, {
    value: p
  }, g);
}
function Iw(o, p, m, g) {
  var y;
  if (p === void 0 && (p = []), m === void 0 && (m = null), g === void 0 && (g = null), o == null) {
    var E;
    if (!m)
      return null;
    if (m.errors)
      o = m.matches;
    else if ((E = g) != null && E.v7_partialHydration && p.length === 0 && !m.initialized && m.matches.length > 0)
      o = m.matches;
    else
      return null;
  }
  let f = o, A = (y = m) == null ? void 0 : y.errors;
  if (A != null) {
    let O = f.findIndex((D) => D.route.id && (A == null ? void 0 : A[D.route.id]) !== void 0);
    O >= 0 || ht(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(A).join(",")), f = f.slice(0, Math.min(f.length, O + 1));
  }
  let C = !1, T = -1;
  if (m && g && g.v7_partialHydration)
    for (let O = 0; O < f.length; O++) {
      let D = f[O];
      if ((D.route.HydrateFallback || D.route.hydrateFallbackElement) && (T = O), D.route.id) {
        let {
          loaderData: V,
          errors: U
        } = m, Y = D.route.loader && V[D.route.id] === void 0 && (!U || U[D.route.id] === void 0);
        if (D.route.lazy || Y) {
          C = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((O, D, V) => {
    let U, Y = !1, oe = null, ee = null;
    m && (U = A && D.route.id ? A[D.route.id] : void 0, oe = D.route.errorElement || Bw, C && (T < 0 && V === 0 ? (wE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), Y = !0, ee = null) : T === V && (Y = !0, ee = D.route.hydrateFallbackElement || null)));
    let pe = p.concat(f.slice(0, V + 1)), K = () => {
      let q;
      return U ? q = oe : Y ? q = ee : D.route.Component ? q = /* @__PURE__ */ R.createElement(D.route.Component, null) : D.route.element ? q = D.route.element : q = O, /* @__PURE__ */ R.createElement(Yw, {
        match: D,
        routeContext: {
          outlet: O,
          matches: pe,
          isDataRoute: m != null
        },
        children: q
      });
    };
    return m && (D.route.ErrorBoundary || D.route.errorElement || V === 0) ? /* @__PURE__ */ R.createElement($w, {
      location: m.location,
      revalidation: m.revalidation,
      component: oe,
      error: U,
      children: K(),
      routeContext: {
        outlet: null,
        matches: pe,
        isDataRoute: !0
      }
    }) : K();
  }, null);
}
var jE = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(jE || {}), tu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(tu || {});
function Iv(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qw(o) {
  let p = R.useContext(nu);
  return p || ht(!1, Iv(o)), p;
}
function Gw(o) {
  let p = R.useContext(Bv);
  return p || ht(!1, Iv(o)), p;
}
function Ww(o) {
  let p = R.useContext(za);
  return p || ht(!1, Iv(o)), p;
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
  let p = R.useContext($v), m = Gw(tu.UseRouteError), g = qv(tu.UseRouteError);
  return p !== void 0 ? p : (o = m.errors) == null ? void 0 : o[g];
}
function Xw() {
  let {
    router: o
  } = qw(jE.UseNavigateStable), p = qv(tu.UseNavigateStable), m = R.useRef(!1);
  return TE(() => {
    m.current = !0;
  }), R.useCallback(function(y, E) {
    E === void 0 && (E = {}), Ua(m.current, DE), m.current && (typeof y == "number" ? o.navigate(y) : o.navigate(y, eu({
      fromRouteId: p
    }, E)));
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
    future: E,
    static: f
  } = R.useContext(va);
  Ua(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: A
  } = R.useContext(za), {
    pathname: C
  } = Xi(), T = Yv(), O = Pv(p, Hv(A, E.v7_relativeSplatPath), C, y === "path"), D = JSON.stringify(O);
  return R.useEffect(() => T(JSON.parse(D), {
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
    navigator: E,
    static: f = !1,
    future: A
  } = o;
  ro() && ht(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let C = p.replace(/^\/*/, "/"), T = R.useMemo(() => ({
    basename: C,
    navigator: E,
    static: f,
    future: eu({
      v7_relativeSplatPath: !1
    }, A)
  }), [C, A, E, f]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: O = "/",
    search: D = "",
    hash: V = "",
    state: U = null,
    key: Y = "default"
  } = g, oe = R.useMemo(() => {
    let ee = ci(O, C);
    return ee == null ? null : {
      location: {
        pathname: ee,
        search: D,
        hash: V,
        state: U,
        key: Y
      },
      navigationType: y
    };
  }, [C, O, D, V, U, Y, y]);
  return Ua(oe != null, '<Router basename="' + C + '"> is not able to match the URL ' + ('"' + O + D + V + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), oe == null ? null : /* @__PURE__ */ R.createElement(va.Provider, {
    value: T
  }, /* @__PURE__ */ R.createElement(au.Provider, {
    children: m,
    value: oe
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
  return R.Children.forEach(o, (g, y) => {
    if (!/* @__PURE__ */ R.isValidElement(g))
      return;
    let E = [...p, y];
    if (g.type === R.Fragment) {
      m.push.apply(m, Uv(g.props.children, E));
      return;
    }
    g.type !== ar && ht(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || ht(!1, "An index route cannot have child routes.");
    let f = {
      id: g.props.id || E.join("-"),
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
    g.props.children && (f.children = Uv(g.props.children, E)), m.push(f);
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
  var m = {}, g = Object.keys(o), y, E;
  for (E = 0; E < g.length; E++)
    y = g[E], !(p.indexOf(y) >= 0) && (m[y] = o[y]);
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
  let m, g, y, E, f;
  if (r_(o)) {
    let A = o.getAttribute("action");
    g = A ? ci(A, p) : null, m = o.getAttribute("method") || gf, y = Mv(o.getAttribute("enctype")) || yf, E = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let A = o.form;
    if (A == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let C = o.getAttribute("formaction") || A.getAttribute("action");
    if (g = C ? ci(C, p) : null, m = o.getAttribute("formmethod") || A.getAttribute("method") || gf, y = Mv(o.getAttribute("formenctype")) || Mv(A.getAttribute("enctype")) || yf, E = new FormData(A, o), !s_()) {
      let {
        name: T,
        type: O,
        value: D
      } = o;
      if (O === "image") {
        let V = T ? T + "." : "";
        E.append(V + "x", "0"), E.append(V + "y", "0");
      } else T && E.append(T, D);
    }
  } else {
    if (xf(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    m = gf, g = null, y = yf, f = o;
  }
  return E && y === "text/plain" && (f = E, E = void 0), {
    action: g,
    method: m.toLowerCase(),
    encType: y,
    formData: E,
    body: f
  };
}
const f_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], d_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], p_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], m_ = "6";
try {
  window.__reactRouterVersion = m_;
} catch {
}
const _E = /* @__PURE__ */ R.createContext({
  isTransitioning: !1
});
_E.displayName = "ViewTransition";
const v_ = /* @__PURE__ */ R.createContext(/* @__PURE__ */ new Map());
v_.displayName = "Fetchers";
const h_ = "startTransition", fE = ow[h_];
function g_(o) {
  let {
    basename: p,
    children: m,
    future: g,
    window: y
  } = o, E = R.useRef();
  E.current == null && (E.current = cw({
    window: y,
    v5Compat: !0
  }));
  let f = E.current, [A, C] = R.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, O = R.useCallback((D) => {
    T && fE ? fE(() => C(D)) : C(D);
  }, [C, T]);
  return R.useLayoutEffect(() => f.listen(O), [f, O]), R.useEffect(() => Zw(g), [g]), /* @__PURE__ */ R.createElement(t_, {
    basename: p,
    children: m,
    location: A.location,
    navigationType: A.action,
    navigator: f,
    future: g
  });
}
const y_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, to = /* @__PURE__ */ R.forwardRef(function(p, m) {
  let {
    onClick: g,
    relative: y,
    reloadDocument: E,
    replace: f,
    state: A,
    target: C,
    to: T,
    preventScrollReset: O,
    viewTransition: D
  } = p, V = Gv(p, f_), {
    basename: U
  } = R.useContext(va), Y, oe = !1;
  if (typeof T == "string" && b_.test(T) && (Y = T, y_))
    try {
      let q = new URL(window.location.href), G = T.startsWith("//") ? new URL(q.protocol + T) : new URL(T), F = ci(G.pathname, U);
      G.origin === q.origin && F != null ? T = F + G.search + G.hash : oe = !0;
    } catch {
      Ua(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ee = kw(T, {
    relative: y
  }), pe = x_(T, {
    replace: f,
    state: A,
    target: C,
    preventScrollReset: O,
    relative: y,
    viewTransition: D
  });
  function K(q) {
    g && g(q), q.defaultPrevented || pe(q);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ R.createElement("a", no({}, V, {
      href: Y || ee,
      onClick: oe || E ? g : K,
      ref: m,
      target: C
    }))
  );
});
to.displayName = "Link";
const N_ = /* @__PURE__ */ R.forwardRef(function(p, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: y = !1,
    className: E = "",
    end: f = !1,
    style: A,
    to: C,
    viewTransition: T,
    children: O
  } = p, D = Gv(p, d_), V = ru(C, {
    relative: D.relative
  }), U = Xi(), Y = R.useContext(Bv), {
    navigator: oe,
    basename: ee
  } = R.useContext(va), pe = Y != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(V) && T === !0, K = oe.encodeLocation ? oe.encodeLocation(V).pathname : V.pathname, q = U.pathname, G = Y && Y.navigation && Y.navigation.location ? Y.navigation.location.pathname : null;
  y || (q = q.toLowerCase(), G = G ? G.toLowerCase() : null, K = K.toLowerCase()), G && ee && (G = ci(G, ee) || G);
  const F = K !== "/" && K.endsWith("/") ? K.length - 1 : K.length;
  let I = q === K || !f && q.startsWith(K) && q.charAt(F) === "/", B = G != null && (G === K || !f && G.startsWith(K) && G.charAt(K.length) === "/"), te = {
    isActive: I,
    isPending: B,
    isTransitioning: pe
  }, J = I ? g : void 0, ne;
  typeof E == "function" ? ne = E(te) : ne = [E, I ? "active" : null, B ? "pending" : null, pe ? "transitioning" : null].filter(Boolean).join(" ");
  let k = typeof A == "function" ? A(te) : A;
  return /* @__PURE__ */ R.createElement(to, no({}, D, {
    "aria-current": J,
    className: ne,
    ref: m,
    style: k,
    to: C,
    viewTransition: T
  }), typeof O == "function" ? O(te) : O);
});
N_.displayName = "NavLink";
const E_ = /* @__PURE__ */ R.forwardRef((o, p) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: y,
    replace: E,
    state: f,
    method: A = gf,
    action: C,
    onSubmit: T,
    relative: O,
    preventScrollReset: D,
    viewTransition: V
  } = o, U = Gv(o, p_), Y = T_(), oe = j_(C, {
    relative: O
  }), ee = A.toLowerCase() === "get" ? "get" : "post", pe = (K) => {
    if (T && T(K), K.defaultPrevented) return;
    K.preventDefault();
    let q = K.nativeEvent.submitter, G = (q == null ? void 0 : q.getAttribute("formmethod")) || A;
    Y(q || K.currentTarget, {
      fetcherKey: m,
      method: G,
      navigate: g,
      replace: E,
      state: f,
      relative: O,
      preventScrollReset: D,
      viewTransition: V
    });
  };
  return /* @__PURE__ */ R.createElement("form", no({
    ref: p,
    method: ee,
    action: oe,
    onSubmit: y ? T : pe
  }, U));
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
  let p = R.useContext(nu);
  return p || ht(!1, S_(o)), p;
}
function x_(o, p) {
  let {
    target: m,
    replace: g,
    state: y,
    preventScrollReset: E,
    relative: f,
    viewTransition: A
  } = p === void 0 ? {} : p, C = Yv(), T = Xi(), O = ru(o, {
    relative: f
  });
  return R.useCallback((D) => {
    if (o_(D, m)) {
      D.preventDefault();
      let V = g !== void 0 ? g : Zs(T) === Zs(O);
      C(o, {
        replace: V,
        state: y,
        preventScrollReset: E,
        relative: f,
        viewTransition: A
      });
    }
  }, [T, C, O, g, y, m, o, E, f, A]);
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
  } = R.useContext(va), m = Kw();
  return R.useCallback(function(g, y) {
    y === void 0 && (y = {}), R_();
    let {
      action: E,
      method: f,
      encType: A,
      formData: C,
      body: T
    } = c_(g, p);
    if (y.navigate === !1) {
      let O = y.fetcherKey || D_();
      o.fetch(O, m, y.action || E, {
        preventScrollReset: y.preventScrollReset,
        formData: C,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || A,
        flushSync: y.flushSync
      });
    } else
      o.navigate(y.action || E, {
        preventScrollReset: y.preventScrollReset,
        formData: C,
        body: T,
        formMethod: y.method || f,
        formEncType: y.encType || A,
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
  } = R.useContext(va), y = R.useContext(za);
  y || ht(!1, "useFormAction must be used inside a RouteContext");
  let [E] = y.matches.slice(-1), f = no({}, ru(o || ".", {
    relative: m
  })), A = Xi();
  if (o == null) {
    f.search = A.search;
    let C = new URLSearchParams(f.search), T = C.getAll("index");
    if (T.some((D) => D === "")) {
      C.delete("index"), T.filter((V) => V).forEach((V) => C.append("index", V));
      let D = C.toString();
      f.search = D ? "?" + D : "";
    }
  }
  return (!o || o === ".") && E.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Ar([g, f.pathname])), Zs(f);
}
function w_(o, p) {
  p === void 0 && (p = {});
  let m = R.useContext(_E);
  m == null && ht(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = OE(Nf.useViewTransitionState), y = ru(o, {
    relative: p.relative
  });
  if (!m.isTransitioning)
    return !1;
  let E = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, f = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return kv(y.pathname, f) != null || kv(y.pathname, E) != null;
}
function __() {
  const [o, p] = R.useState(null), [m, g] = R.useState(""), [y, E] = R.useState(""), [f, A] = R.useState(!0), [C, T] = R.useState(""), [O, D] = R.useState(""), [V, U] = R.useState(!1), [Y, oe] = R.useState(!1);
  R.useEffect(() => {
    const q = typeof window < "u" ? window : void 0, G = q && q.__FIREBASE__ ? q.__FIREBASE__ : null;
    p({
      apiKey: G && G.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: G && G.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: G && G.projectId || void 0 || "fresh-basket-a8933",
      appId: G && G.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: G && G.messagingSenderId || void 0 || "163656027399",
      measurementId: G && G.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ee(q) {
    const G = (q == null ? void 0 : q.code) || "", F = (q == null ? void 0 : q.message) || "";
    return G.includes("invalid-email") ? "Please enter a valid email address." : G.includes("user-not-found") ? "No account found with that email." : G.includes("wrong-password") || G.includes("invalid-credential") || F.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : G.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : G.includes("network-request-failed") ? "Network error. Check your connection and try again." : F || "Something went wrong.";
  }
  async function pe(q) {
    q.preventDefault(), T(""), D(""), U(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), F = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: I, setPersistence: B, browserLocalPersistence: te, browserSessionPersistence: J, signInWithEmailAndPassword: ne } = F, k = I();
      await B(k, f ? te : J);
      const fe = await (await ne(k, m.trim(), y)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: fe }) })).ok) throw new Error("Session creation failed");
      D("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (G) {
      T(ee(G));
    } finally {
      U(!1);
    }
  }
  async function K() {
    T(""), D("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const q = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: G, sendPasswordResetEmail: F } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), I = G();
      await F(I, m.trim()), D("If an account exists for that email, a reset link has been sent.");
    } catch (q) {
      T(ee(q));
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
      C && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: C }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: (q) => g(q.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: Y ? "text" : "password", value: y, onChange: (q) => E(q.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ c.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": Y ? "Hide password" : "Show password", onClick: () => oe((q) => !q), children: "👁️" }, void 0, !1, {
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
            /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: f, onChange: (q) => A(q.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("button", { className: "link-button", type: "button", onClick: K, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: V, type: "submit", children: V ? "Signing in…" : "Sign in" }, void 0, !1, {
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
  const [o, p] = R.useState(null), [m, g] = R.useState(""), [y, E] = R.useState(""), [f, A] = R.useState(""), [C, T] = R.useState(""), [O, D] = R.useState(""), [V, U] = R.useState(""), [Y, oe] = R.useState(""), [ee, pe] = R.useState(!1), [K, q] = R.useState(!1), [G, F] = R.useState(!1), [I, B] = R.useState(!1);
  R.useEffect(() => {
    const ne = typeof window < "u" ? window : void 0, k = ne && ne.__FIREBASE__ ? ne.__FIREBASE__ : null;
    p({
      apiKey: k && k.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: k && k.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: k && k.projectId || void 0 || "fresh-basket-a8933",
      appId: k && k.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: k && k.messagingSenderId || void 0 || "163656027399",
      measurementId: k && k.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function te(ne) {
    const k = (ne == null ? void 0 : ne.code) || "";
    return k.includes("email-already-in-use") ? "An account with this email already exists." : k.includes("weak-password") ? "Password should be at least 6 characters." : k.includes("invalid-email") ? "Please enter a valid email address." : k.includes("network-request-failed") ? "Network error. Check your connection and try again." : (ne == null ? void 0 : ne.message) || "Something went wrong.";
  }
  async function J(ne) {
    ne.preventDefault(), U(""), oe(""), pe(!0);
    try {
      const k = String(m).trim(), he = String(y).trim(), fe = he.replace(/\D+/g, ""), Le = { fn: !k, cn: !he };
      if (F(Le.fn), B(Le.cn || fe.length < 7), Le.fn || Le.cn) {
        U("Please fill in required fields");
        return;
      }
      if (fe.length < 7) {
        U("Please enter a valid mobile number");
        return;
      }
      if (C !== O) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Ue = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: _e, createUserWithEmailAndPassword: ye } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Je = _e(), Qt = await (await ye(Je, f.trim(), C)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Qt, profile: { fullName: k, contactNumber: he } }) })).ok) throw new Error("Session creation failed");
      oe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (k) {
      U(te(k));
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
    V && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: V }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    Y && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: Y }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ c.jsxDEV("form", { className: "auth-form", onSubmit: J, children: [
      /* @__PURE__ */ c.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (G && !String(m).trim() ? " input-error" : ""), value: m, onChange: (ne) => {
          g(ne.target.value), G && F(!String(ne.target.value).trim());
        }, onBlur: () => F(!String(m).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input" + (I ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: y, onChange: (ne) => {
          if (E(ne.target.value), I) {
            const k = String(ne.target.value).trim().replace(/\D+/g, "");
            B(!(k.length >= 7));
          }
        }, onBlur: () => {
          const ne = String(y).trim().replace(/\D+/g, "");
          B(!(ne.length >= 7));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (ne) => A(ne.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: K ? "text" : "password", value: C, onChange: (ne) => T(ne.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ c.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": K ? "Hide password" : "Show password", onClick: () => q((ne) => !ne), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "auth-input", type: "password", value: O, onChange: (ne) => D(ne.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "auth-button", disabled: ee, type: "submit", children: ee ? "Creating account…" : "Create account" }, void 0, !1, {
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
  const [o, p] = R.useState([]);
  return R.useEffect(() => {
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
      const E = String(Date.now()) + Math.random().toString(36).slice(2, 8), f = { id: E, message: String(g || ""), type: y.type || "success", ttl: typeof y.ttl == "number" ? y.ttl : 4e3 };
      return p((A) => [f, ...A]), E;
    }, window.hideToast = function(g) {
      p((y) => y.filter((E) => E.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), R.useEffect(() => {
    if (!o.length) return;
    const m = o.map((g) => setTimeout(() => {
      p((y) => y.filter((E) => E.id !== g.id));
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
  R.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(m, g) {
      return window.__pendingToasts.push({ message: m, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(m) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== m));
      } catch {
      }
    }));
  }, []);
  const p = Yv();
  return R.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), y = document.getElementById("profileBtn"), E = document.getElementById("profileMenu");
    function f(D, V, U) {
      D && (D.classList.toggle("hidden", !U), D.setAttribute("aria-hidden", U ? "false" : "true"), V && V.setAttribute("aria-expanded", U ? "true" : "false"));
    }
    function A() {
      f(g, m, !1), f(E, y, !1);
    }
    function C(D) {
      const V = (U) => U && (U === D.target || U.contains(D.target));
      !V(g) && !V(m) && !V(E) && !V(y) && A();
    }
    function T(D) {
      D.key === "Escape" && A();
    }
    function O(D) {
      D && D.querySelectorAll(".dropdown-item").forEach((V) => {
        V.addEventListener("click", () => A());
      });
    }
    return m && g && (m.addEventListener("click", (D) => {
      D.stopPropagation(), f(E, y, !1), f(g, m, g.classList.contains("hidden"));
    }), O(g)), y && E && (y.addEventListener("click", (D) => {
      D.stopPropagation(), f(g, m, !1), f(E, y, E.classList.contains("hidden"));
    }), O(E)), document.addEventListener("click", C), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", C), document.removeEventListener("keydown", T);
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
  const [m, g] = R.useState(""), [y, E] = R.useState(""), [f, A] = R.useState(""), [C, T] = R.useState(""), [O, D] = R.useState(!1), [V, U] = R.useState(""), [Y, oe] = R.useState(""), [ee, pe] = R.useState(!1), [K, q] = R.useState(!1), [G, F] = R.useState(!1), [I, B] = R.useState(!1);
  async function te() {
    U(""), oe(""), B(!0);
    const J = String(m).trim(), ne = String(y), k = String(f).trim(), he = String(C).trim(), fe = he.replace(/\D+/g, ""), Le = { fn: !k, cn: !he, pw: !ne };
    if (pe(Le.fn), q(Le.cn || fe.length < 7), F(Le.pw), Le.fn || Le.cn || Le.pw) {
      U("Full name, mobile and password are required");
      return;
    }
    if (fe.length < 7) {
      U("Please enter a valid mobile number"), q(!0);
      return;
    }
    if (J && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(J)) {
      U("Please enter a valid email");
      return;
    }
    if (ne.length < 6) {
      F(!0), U("Password must be at least 6 characters");
      return;
    }
    D(!0);
    try {
      const Ue = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: J, password: ne, fullName: k, contactNumber: he })
      }), _e = await Ue.json().catch(() => null);
      if (!Ue.ok) {
        const ye = String(_e && (_e.error || _e.message) || ""), Je = ye.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(ye) || /MISSING\s*EMAIL\/PASSWORD/i.test(ye))
          U("Full name, mobile and password are required"), pe(!k), q(!he || fe.length < 7), F(!ne);
        else if (Je.includes("EMAIL_EXISTS"))
          U("An account with this email already exists. Use a different email or leave email blank.");
        else if (Je.includes("INVALID_EMAIL"))
          U("Please enter a valid email");
        else if (Je.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(ye))
          F(!0), U("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(ye))
          q(!0), U("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(ye))
          U("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(ye || "Failed to create rider");
        return;
      }
      oe("Rider created successfully"), p && p(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (Ue) {
      const _e = String((Ue == null ? void 0 : Ue.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(_e) ? U("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(_e) ? U("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(_e) ? U("Please enter a valid email") : /WEAK_PASSWORD/i.test(_e) || /AT LEAST 6 CHARACTERS/i.test(_e) ? (F(!0), U("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(_e) ? (q(!0), U("Please enter a valid mobile number")) : U(_e || "Failed to create rider");
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
      Y && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-success", children: Y }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 97,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ c.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (I && !String(f).trim() ? " input-error" : ""), value: f, onChange: (J) => {
          A(J.target.value), I && pe(!String(J.target.value).trim());
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input", type: "email", value: m, onChange: (J) => {
          g(J.target.value);
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (I && !String(y) ? " input-error" : ""), type: "password", value: y, onChange: (J) => {
          E(J.target.value), I && F(!String(J.target.value));
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "field-input" + (I && String(C).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: C, onChange: (J) => {
          if (T(J.target.value), I) {
            const ne = String(J.target.value).trim().replace(/\D+/g, "");
            q(!(ne.length >= 7));
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
      V && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: V }, void 0, !1, {
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
function LE() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function VE() {
  const o = LE();
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
function L_(o) {
  if (o == null) return;
  const p = VE(), m = String(o);
  return p[m];
}
function V_(o) {
  if (!o || typeof o != "object") return;
  const p = LE();
  if (!p) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = VE();
  let y = !1;
  const E = { ...g };
  for (const [f, A] of m) {
    const C = String(f);
    let T;
    if (typeof A == "number")
      T = A;
    else if (typeof A == "string")
      T = Number(A);
    else
      continue;
    Number.isFinite(T) && E[C] !== T && (E[C] = T, y = !0);
  }
  if (y)
    try {
      p.setItem(ME, JSON.stringify(E));
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
function H_(o, p) {
  if (!Array.isArray(o) || !p) return 0;
  let m = 0;
  for (const g of o)
    z_(g) === p && (m += 1);
  return m;
}
function P_() {
  const [o, p] = R.useState([]), [m, g] = R.useState(""), [y, E] = R.useState(!0), [f, A] = R.useState(""), [C, T] = R.useState(1), [O, D] = R.useState(20), [V, U] = R.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [Y, oe] = R.useState(!1), [ee, pe] = R.useState(ma);
  R.useEffect(() => {
    function I() {
      pe(AE());
    }
    I();
    function B(te) {
      te.key === Ef && I();
    }
    return typeof window < "u" && (window.addEventListener("storage", B), window.addEventListener("fare-settings-changed", I)), () => {
      typeof window < "u" && (window.removeEventListener("storage", B), window.removeEventListener("fare-settings-changed", I));
    };
  }, []), R.useEffect(() => {
    let I = !0;
    return (async () => {
      var B, te, J, ne;
      E(!0), A("");
      try {
        const k = new URLSearchParams();
        m && k.set("q", m), k.set("page", String(C)), k.set("limit", String(O));
        const he = await fetch(`/api/riders?${k.toString()}`, { credentials: "include" });
        if (he.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!he.ok) throw new Error("Failed to load riders");
        const fe = await he.json();
        I && (p(Array.isArray(fe.riders) ? fe.riders : []), U({ total: ((B = fe.meta) == null ? void 0 : B.total) || 0, page: ((te = fe.meta) == null ? void 0 : te.page) || 1, limit: ((J = fe.meta) == null ? void 0 : J.limit) || O, pages: ((ne = fe.meta) == null ? void 0 : ne.pages) || 1 }));
      } catch (k) {
        I && A(k.message || "Failed to load riders");
      } finally {
        I && E(!1);
      }
    })(), () => {
      I = !1;
    };
  }, [m, C, O]);
  const K = R.useMemo(() => o.filter((I) => !(m && !String(I.name || "").toLowerCase().includes(m.toLowerCase().trim()))), [o, m]), q = R.useMemo(() => {
    const I = Number(ee.farePerKm);
    return Number.isFinite(I) ? I : ma.farePerKm;
  }, [ee]), G = R.useMemo(() => {
    const I = Number(ee.baseFare);
    return Number.isFinite(I) ? I : ma.baseFare;
  }, [ee]);
  R.useEffect(() => {
    if (!Array.isArray(o) || o.length === 0) return;
    const I = {};
    for (const B of o) {
      if (!B || B.id === void 0 || B.id === null) continue;
      const te = Number(B.performancePct);
      Number.isFinite(te) && (I[B.id] = Math.round(te));
    }
    Object.keys(I).length !== 0 && V_(I);
  }, [o]);
  const F = R.useMemo(() => {
    const I = /* @__PURE__ */ new Date(), B = [], te = [];
    for (let J = 2; J >= 0; J--) {
      const ne = new Date(I.getFullYear(), I.getMonth() - J, 1), k = `${ne.getFullYear()}-${String(ne.getMonth() + 1).padStart(2, "0")}`, he = ne.toLocaleString(void 0, { month: "short", year: "numeric" });
      B.push(k), te.push(he);
    }
    return { keys: B, labels: te };
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => oe(!0), children: "Create Rider" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (I) => {
          g(I.target.value), T(1);
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
      /* @__PURE__ */ c.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: O, onChange: (I) => {
        D(parseInt(I.target.value, 10)), T(1);
      }, children: [10, 20, 50, 100].map((I) => /* @__PURE__ */ c.jsxDEV("option", { value: I, children: [
        I,
        "/page"
      ] }, I, !0, {
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
      Y && /* @__PURE__ */ c.jsxDEV(M_, { onClose: () => oe(!1), onCreated: () => {
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
          F.labels.map((I, B) => /* @__PURE__ */ c.jsxDEV("th", { className: "col-month", children: I }, F.keys[B], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 199,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ c.jsxDEV("th", { className: "col-earnings", children: (() => {
            const I = F.keys[F.keys.length - 2], B = String(I).split("-"), te = parseInt(B[0], 10), J = parseInt(B[1], 10);
            return `Earnings (${new Date(Number.isFinite(te) ? te : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(J) ? J - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
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
          !y && !f && K.map((I) => /* @__PURE__ */ c.jsxDEV("tr", { "data-rider-id": I.id, "data-status": I.status, "data-last-days": I.lastActiveDays, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ c.jsxDEV("a", { className: "rider-name-link", href: `/riders/${I.id}`, children: I.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 215,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 215,
              columnNumber: 19
            }, this),
            F.keys.map((B) => {
              var te;
              return /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-month", children: [
                Number(((te = I.monthlyCounts) == null ? void 0 : te[B]) || 0).toFixed(2),
                " km"
              ] }, B, !0, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 217,
                columnNumber: 21
              }, this);
            }),
            (() => {
              var he, fe;
              const B = F.keys[F.keys.length - 2], te = Number(((he = I.monthlyCounts) == null ? void 0 : he[B]) || 0), J = Array.isArray(I.orders) ? I.orders : [], ne = Number(((fe = I.monthlyRideCounts) == null ? void 0 : fe[B]) ?? H_(J, B) ?? 0), k = te * q + ne * G;
              return /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(k) ? `${k.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 225,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-performance", children: Number.isFinite(Number(I.performancePct)) ? `${Math.round(Number(I.performancePct))}%` : "0%" }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 227,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-total", children: [
              Number(I.totalKm || 0).toFixed(2),
              " km"
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 228,
              columnNumber: 19
            }, this)
          ] }, I.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 214,
            columnNumber: 17
          }, this)),
          !y && !f && K.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: V.page <= 1 || y, onClick: () => T((I) => Math.max(1, I - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 240,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        V.page,
        " of ",
        V.pages,
        " • ",
        V.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 241,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: V.page >= V.pages || y, onClick: () => T((I) => Math.min(V.pages, I + 1)), children: "Next" }, void 0, !1, {
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
  var m, g, y, E, f, A;
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
    (E = o.orders) == null ? void 0 : E.duration_minutes,
    (f = o.orders) == null ? void 0 : f.actualDuration,
    (A = o.orders) == null ? void 0 : A.actualDurationMinutes
  ];
  for (const C of p) {
    const T = Sf(C);
    if (T !== null) return T;
  }
  return null;
}
function $_(o) {
  var m, g, y, E;
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
    (E = o.orders) == null ? void 0 : E.deliveryEndTime
  ];
  for (const f of p)
    if (f != null) return f;
  return null;
}
function kE(o) {
  var m, g, y, E, f, A;
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
    (E = o.orders) == null ? void 0 : E.startTime,
    (f = o.orders) == null ? void 0 : f.started_at,
    (A = o.orders) == null ? void 0 : A.startedAt
  ];
  for (const C of p)
    if (C != null) return C;
  return null;
}
function Y_(o) {
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
function HE(o) {
  var g, y, E, f, A, C, T, O;
  if (!Fa(o)) return null;
  const p = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (y = o.order) == null ? void 0 : y.expectedDeliveryTime,
    (E = o.orders) == null ? void 0 : E.expected_delivery_time,
    (f = o.orders) == null ? void 0 : f.expectedDeliveryTime,
    (A = o.delivery) == null ? void 0 : A.expected_delivery_time,
    (C = o.delivery) == null ? void 0 : C.expectedDeliveryTime,
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
      const V = m[D];
      if (!V) continue;
      const U = typeof V.type == "string" ? V.type.toLowerCase().trim() : "";
      if (!(U !== "eta" && U !== "expected")) {
        if (V.expectedMinutes !== void 0 && V.expectedMinutes !== null) return { minutes: V.expectedMinutes };
        if (V.minutes !== void 0 && V.minutes !== null) return { minutes: V.minutes };
        if (V.expectedAt) return V.expectedAt;
      }
    }
  return null;
}
function PE(o) {
  const p = Sf(o);
  if (p === null || !Number.isFinite(p)) return "-";
  const m = Math.round(p);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), y = m % 60;
  return `${g}h ${y}m`;
}
function I_() {
  var U;
  const { id: o } = Fw(), [p, m] = R.useState(null), [g, y] = R.useState(!0), [E, f] = R.useState(""), [A, C] = R.useState(null);
  if (R.useEffect(() => {
    const Y = L_(o);
    if (typeof Y == "number" && Number.isFinite(Y))
      C(Y);
    else if (typeof Y == "string") {
      const oe = Number(Y);
      Number.isFinite(oe) ? C(oe) : C(null);
    } else
      C(null);
  }, [o]), R.useEffect(() => {
    let Y = !0;
    return (async () => {
      y(!0), f("");
      try {
        const oe = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (oe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!oe.ok) throw new Error("Failed to load rider");
        const ee = await oe.json();
        Y && m(ee);
      } catch (oe) {
        Y && f(oe.message || "Failed to load rider");
      } finally {
        Y && y(!1);
      }
    })(), () => {
      Y = !1;
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
  if (E)
    return /* @__PURE__ */ c.jsxDEV(Or, { children: /* @__PURE__ */ c.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: E }, void 0, !1, {
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
  const { rider: T, metrics: O, history: D } = p, V = A ?? (Number.isFinite(Number(O == null ? void 0 : O.onTimeRate)) ? Math.round(Number(O.onTimeRate)) : 0);
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
          V,
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
        (p.riderOrders || []).map((Y, oe) => {
          const ee = Y.name || Y.orderId, pe = ui(Y.created_at), K = pe instanceof Date && !Number.isNaN(pe.getTime()) ? pe.toISOString().slice(0, 10) : "-", q = FE(Y.deliveryStartTime), G = HE(Y), F = zE(G), I = UE(Y), B = PE(I), te = Number(Y.distance_km), J = Number.isFinite(te) ? `${te.toFixed(2)} km` : typeof Y.distance_km == "string" && Y.distance_km.trim() ? Y.distance_km : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 113,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: K }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: q }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: F }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: B }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: J }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this)
          ] }, Y.orderId || oe, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 112,
            columnNumber: 19
          }, this);
        }),
        !((U = p.riderOrders) != null && U.length) && (D || []).map((Y, oe) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-cell", children: Y.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km date-cell", children: Y.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Y.avgTime ? `${Y.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(Y.distanceKm)) ? `${Number(Y.distanceKm).toFixed(2)} km` : Y.distanceKm || "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this)
        ] }, `h-${oe}`, !0, {
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
  const [g, y] = R.useState([]), [E, f] = R.useState(!0), [A, C] = R.useState(""), [T, O] = R.useState(null), [D, V] = R.useState("rider"), [U, Y] = R.useState([]), [oe, ee] = R.useState(!1), [pe, K] = R.useState(""), [q, G] = R.useState(null);
  R.useEffect(() => {
    let B = !0;
    return (async () => {
      f(!0), C("");
      try {
        const te = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!te.ok) throw new Error("Failed to load riders");
        const J = await te.json();
        B && y(Array.isArray(J.riders) ? J.riders : J.riders || []);
      } catch (te) {
        B && C(te.message || "Failed to load riders");
      } finally {
        B && f(!1);
      }
    })(), () => {
      B = !1;
    };
  }, []), R.useEffect(() => {
    if (D !== "packer") return;
    let B = !0;
    return (async () => {
      ee(!0), K("");
      try {
        const te = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!te.ok) throw new Error("Failed to load packers");
        const J = await te.json();
        B && Y(Array.isArray(J.packers) ? J.packers : J.packers || []);
      } catch (te) {
        B && K(te.message || "Failed to load packers");
      } finally {
        B && ee(!1);
      }
    })(), () => {
      B = !1;
    };
  }, [D]);
  async function F(B) {
    if (!(!o || !B)) {
      O(B);
      try {
        const te = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: B })
        });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const J = await te.json().catch(() => null);
        if (!te.ok) throw new Error(J && J.error ? J.error : "Assign failed");
        m && m({ orderId: o, riderId: B }), V("packer");
      } catch (te) {
        alert(te.message || "Failed to assign rider");
      } finally {
        O(null);
      }
    }
  }
  async function I(B) {
    if (!(!o || !B)) {
      G(B);
      try {
        const te = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packerId: B })
        });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const J = await te.json().catch(() => null);
        if (!te.ok) throw new Error(J && J.error ? J.error : "Assign failed");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Packer assigned: ${B}`, { type: "success" });
        } catch {
        }
        p();
      } catch (te) {
        alert(te.message || "Failed to assign packer");
      } finally {
        G(null);
      }
    }
  }
  return /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ c.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ c.jsxDEV("h3", { className: "assign-modal-title", children: D === "packer" ? "Assign Packers" : "Assign Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "assign-modal-close", onClick: p, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 90,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 88,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV("div", { className: "assign-modal-body", children: D !== "packer" ? /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      E && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 95,
        columnNumber: 27
      }, this),
      A && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: A }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 96,
        columnNumber: 25
      }, this),
      !E && !A && /* @__PURE__ */ c.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 100,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 100,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 100,
            columnNumber: 65
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 100,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 99,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          g.map((B) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { children: B.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 105,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: B.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 106,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-assign", onClick: () => F(B.id), disabled: T && T !== B.id, children: T === B.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 108,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 107,
              columnNumber: 25
            }, this)
          ] }, B.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 104,
            columnNumber: 23
          }, this)),
          g.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 114,
            columnNumber: 50
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 114,
            columnNumber: 46
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 102,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 98,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 94,
      columnNumber: 13
    }, this) : /* @__PURE__ */ c.jsxDEV(c.Fragment, { children: [
      oe && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Loading packers…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 121,
        columnNumber: 34
      }, this),
      pe && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: pe }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 122,
        columnNumber: 32
      }, this),
      !oe && !pe && /* @__PURE__ */ c.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
          /* @__PURE__ */ c.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 126,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 126,
            columnNumber: 38
          }, this),
          /* @__PURE__ */ c.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 126,
            columnNumber: 65
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 126,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 125,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ c.jsxDEV("tbody", { children: [
          U.map((B) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
            /* @__PURE__ */ c.jsxDEV("td", { children: B.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 131,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: B.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 132,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { children: /* @__PURE__ */ c.jsxDEV("button", { className: "btn-assign", onClick: () => I(B.id), disabled: q && q !== B.id, children: q === B.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 134,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 133,
              columnNumber: 25
            }, this)
          ] }, B.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 130,
            columnNumber: 23
          }, this)),
          U.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No packers found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 140,
            columnNumber: 51
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 140,
            columnNumber: 47
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 128,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 124,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 120,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 92,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 87,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 86,
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
  const [o, p] = R.useState([]), [m, g] = R.useState(""), [y, E] = R.useState("all"), [f, A] = R.useState(1), [C, T] = R.useState(20), [O, D] = R.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [V, U] = R.useState(!0), [Y, oe] = R.useState(""), [ee, pe] = R.useState(""), [K, q] = R.useState(!0), [G, F] = R.useState(!1), [I, B] = R.useState(null);
  R.useEffect(() => {
    let k = !0;
    return (async () => {
      var he, fe, Le, Ue;
      U(!0), oe(""), pe("");
      try {
        const _e = new URLSearchParams();
        if (m && _e.set("q", m), y && y !== "all") {
          const pn = vE[y] || y;
          _e.set("status", zv(pn));
        }
        _e.set("page", String(f)), _e.set("limit", String(C));
        const ye = await fetch(`/api/orders?${_e.toString()}`, { credentials: "include" });
        if (ye.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ye.ok) throw new Error("Failed to load orders");
        const Je = await ye.json();
        k && (p(Array.isArray(Je.orders) ? Je.orders : []), pe(Je.shopifyError || ""), q(!!Je.shopifyConfigured), D({ total: ((he = Je.meta) == null ? void 0 : he.total) || 0, page: ((fe = Je.meta) == null ? void 0 : fe.page) || 1, limit: ((Le = Je.meta) == null ? void 0 : Le.limit) || C, pages: ((Ue = Je.meta) == null ? void 0 : Ue.pages) || 1 }));
      } catch (_e) {
        k && oe(_e.message || "Failed to load orders");
      } finally {
        k && U(!1);
      }
    })(), () => {
      k = !1;
    };
  }, [m, y, f, C]), R.useMemo(() => o, [o]);
  const te = R.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (y === "all") return o.slice();
    const k = zv(vE[y] || y);
    return o.filter((he) => mE(he) === k);
  }, [o, y]);
  function J() {
    B(null), F(!1);
  }
  function ne(k) {
    try {
      const { orderId: he } = k || {};
      if (!he) return;
      const fe = String(he).replace(/^#+/, "");
      A(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${he}`, { type: "success" });
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
          g(k.target.value), A(1);
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
        q_.map(({ key: k, label: he }) => /* @__PURE__ */ c.jsxDEV("button", { className: `rc-select rc-chip${y === k ? " active" : ""}`, onClick: () => {
          E(k), A(1);
        }, "data-filter": k, children: he }, k, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 114,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ c.jsxDEV("select", { className: "rc-select rc-select-arrow rc-chip", value: C, onChange: (k) => {
          T(parseInt(k.target.value, 10)), A(1);
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
    !K && /* @__PURE__ */ c.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 125,
      columnNumber: 11
    }, this),
    ee && /* @__PURE__ */ c.jsxDEV("div", { className: "auth-error", children: ee }, void 0, !1, {
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
        V && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 145,
          columnNumber: 17
        }, this),
        !V && Y && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "auth-error", children: Y }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 148,
          columnNumber: 17
        }, this),
        !V && !Y && te.map((k, he) => {
          var Dt;
          const fe = $E(k), Le = mE(k), Ue = k.full_name || (k.customer && k.customer.full_name ? k.customer.full_name : "");
          let _e = "-";
          typeof k.shipping_address == "string" && String(k.shipping_address).trim() ? _e = String(k.shipping_address).trim() : k.shipping_address && typeof k.shipping_address == "object" ? _e = [k.shipping_address.address1 || "", k.shipping_address.city || "", k.shipping_address.province || "", k.shipping_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-" : typeof k.billing_address == "string" && String(k.billing_address).trim() ? _e = String(k.billing_address).trim() : k.billing_address && typeof k.billing_address == "object" && (_e = [k.billing_address.address1 || "", k.billing_address.city || "", k.billing_address.province || "", k.billing_address.country || ""].map((Jt) => String(Jt || "").trim()).filter(Boolean).join(", ") || "-");
          const ye = k.name || k.order_number || k.id, pn = (ye != null ? String(ye).replace(/^#+/, "").trim() : "") || "-", Qt = Y_(k), xn = FE(Qt), Ct = HE(k), In = zE(Ct), Xt = UE(k), ha = PE(Xt), na = k.rider ? String(k.rider) : (Dt = k.assignment) != null && Dt.riderId ? String(k.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": Le, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-name order-id-cell", children: pn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 179,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-km customer-cell", children: Ue || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 180,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-perf address-cell", children: _e }, void 0, !1, {
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
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-expected expected-cell", children: In }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 184,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: ha }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 185,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${Le}`, children: fe }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 63
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 186,
              columnNumber: 21
            }, this)
          ] }, ye || he, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 178,
            columnNumber: 19
          }, this);
        }),
        !V && !Y && te.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 8, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      G && I && /* @__PURE__ */ c.jsxDEV(BE, { orderId: I, onClose: J, onAssigned: ne }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || V, onClick: () => A((k) => Math.max(1, k - 1)), children: "Prev" }, void 0, !1, {
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
        /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || V, onClick: () => A((k) => Math.min(O.pages, k + 1)), children: "Next" }, void 0, !1, {
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
  const [o, p] = R.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = R.useState([]), [y, E] = R.useState(!1), [f, A] = R.useState(!0), [C, T] = R.useState("");
  return R.useEffect(() => {
    let O = !0;
    return (async () => {
      A(!0), T("");
      try {
        const D = await fetch("/api/reports", { credentials: "include" });
        if (D.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!D.ok) throw new Error("Failed to load reports");
        const V = await D.json();
        O && (p(V.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(V.deliveries) ? V.deliveries : []));
      } catch (D) {
        O && T(D.message || "Failed to load reports");
      } finally {
        O && A(!1);
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
          /* @__PURE__ */ c.jsxDEV("input", { type: "checkbox", checked: y, onChange: (O) => E(O.target.checked) }, void 0, !1, {
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
          !f && !C && m.map((O, D) => /* @__PURE__ */ c.jsxDEV("tr", { children: [
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
          !f && !C && m.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
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
          C && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 6, className: "auth-error", children: C }, void 0, !1, {
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
function K_() {
  const [o, p] = R.useState([]), [m, g] = R.useState(!0), [y, E] = R.useState(""), [f, A] = R.useState(1), [C, T] = R.useState(25), [O, D] = R.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  R.useEffect(() => {
    let G = !0;
    return (async () => {
      var F, I, B, te;
      g(!0), E("");
      try {
        const J = new URLSearchParams();
        J.set("limit", String(C)), J.set("page", String(f));
        const ne = await fetch(`/api/orders?${J.toString()}`, { credentials: "include" });
        if (ne.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ne.ok) throw new Error("Failed to load orders");
        const k = await ne.json();
        G && (p(Array.isArray(k.orders) ? k.orders : []), D({ total: ((F = k.meta) == null ? void 0 : F.total) || 0, page: ((I = k.meta) == null ? void 0 : I.page) || f, limit: ((B = k.meta) == null ? void 0 : B.limit) || C, pages: ((te = k.meta) == null ? void 0 : te.pages) || 1 }));
      } catch (J) {
        G && E(J.message || "Failed to load orders");
      } finally {
        G && g(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [f]);
  function V(G) {
    return !G || typeof G != "object" ? "new" : typeof G.current_status == "string" && String(G.current_status).trim() ? String(G.current_status).toLowerCase().trim() : "new";
  }
  const [U, Y] = R.useState(!1), [oe, ee] = R.useState(null);
  function pe(G) {
    ee(G), Y(!0);
  }
  function K() {
    ee(null), Y(!1);
  }
  function q(G) {
    try {
      const { orderId: F } = G || {};
      if (!F) return;
      const I = String(F).replace(/^#+/, "");
      p((B) => B.filter((te, J) => {
        const ne = String(te.id || te.name || te.order_number || J).replace(/^#+/, "");
        return String(ne) !== String(I);
      })), D((B) => ({ ...B || {}, total: Math.max(0, ((B == null ? void 0 : B.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${F}`, { type: "success" });
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
          lineNumber: 70,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 71,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ c.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ c.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ c.jsxDEV("div", { className: "stat-value", children: m ? "…" : O.total || o.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ c.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 76,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ c.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ c.jsxDEV("thead", { children: /* @__PURE__ */ c.jsxDEV("tr", { children: [
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 87,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 88,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ c.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
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
      /* @__PURE__ */ c.jsxDEV("tbody", { children: [
        m && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 28
        }, this),
        !m && y && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "auth-error", children: y }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 97,
          columnNumber: 28
        }, this),
        !m && !y && (Array.isArray(o) ? o.filter((F) => V(F) === "new") : []).map((F, I) => {
          const B = V(F), te = F.full_name || (F.customer && F.customer.full_name ? F.customer.full_name : "");
          let J = "-";
          typeof F.shipping_address == "string" && String(F.shipping_address).trim() ? J = String(F.shipping_address).trim() : F.shipping_address && typeof F.shipping_address == "object" ? J = [F.shipping_address.address1 || "", F.shipping_address.city || "", F.shipping_address.province || "", F.shipping_address.country || ""].map((Ue) => String(Ue || "").trim()).filter(Boolean).join(", ") || "-" : typeof F.billing_address == "string" && String(F.billing_address).trim() ? J = String(F.billing_address).trim() : F.billing_address && typeof F.billing_address == "object" && (J = [F.billing_address.address1 || "", F.billing_address.city || "", F.billing_address.province || "", F.billing_address.country || ""].map((Ue) => String(Ue || "").trim()).filter(Boolean).join(", ") || "-");
          const ne = F.name || F.order_number || F.id || I, k = String(F.id || F.name || F.order_number || I).replace(/^#+/, ""), he = F.created_at ? new Date(F.created_at) : null, fe = he ? he.toLocaleDateString() : "-", Le = he ? he.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ c.jsxDEV("tr", { "data-status": B, children: [
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-order", children: ne }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 122,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-customer", children: te || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 123,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-address", children: J }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 124,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ c.jsxDEV("span", { className: `status-chip status-${B}`, children: B.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 125,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-date", children: fe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-time", children: Le }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ c.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ c.jsxDEV("button", { className: "order-action btn-manage", onClick: () => pe(String(F.id || F.name || F.order_number || I)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this)
          ] }, k, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 121,
            columnNumber: 21
          }, this);
        }),
        !m && !y && o.length === 0 && /* @__PURE__ */ c.jsxDEV("tr", { children: /* @__PURE__ */ c.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ c.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page <= 1 || m, onClick: () => A((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 140,
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
        lineNumber: 141,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ c.jsxDEV("button", { className: "rc-select rc-chip", disabled: O.page >= O.pages || m, onClick: () => A((G) => Math.min(O.pages, G + 1)), children: "Next" }, void 0, !1, {
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
    U && oe && /* @__PURE__ */ c.jsxDEV(BE, { orderId: oe, onClose: K, onAssigned: q }, void 0, !1, {
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
function Q_() {
  const [o, p] = R.useState(ma.baseFare), [m, g] = R.useState(ma.farePerKm), [y, E] = R.useState(!1);
  R.useEffect(() => {
    const C = AE();
    p(C.baseFare), g(C.farePerKm);
  }, []);
  function f() {
    E(!0);
    try {
      const C = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.setItem(Ef, JSON.stringify(C));
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
      E(!1);
    }
  }
  function A() {
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
      /* @__PURE__ */ c.jsxDEV("div", { className: "fare-actions", children: [
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-primary", onClick: f, disabled: y, children: "Save" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ c.jsxDEV("button", { className: "btn-secondary", onClick: A, disabled: y, children: "Reset" }, void 0, !1, {
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
function X_() {
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
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/riders", element: /* @__PURE__ */ c.jsxDEV(P_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/riders/:id", element: /* @__PURE__ */ c.jsxDEV(I_, {}, void 0, !1, {
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
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/dashboard", element: /* @__PURE__ */ c.jsxDEV(K_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ c.jsxDEV(ar, { path: "/settings", element: /* @__PURE__ */ c.jsxDEV(Q_, {}, void 0, !1, {
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
  SE(o).render(/* @__PURE__ */ c.jsxDEV(X_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", hE) : hE();
